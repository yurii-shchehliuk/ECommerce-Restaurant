using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Entities.Store;
using WebApi.Domain.Interfaces.Integration;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Domain.Interfaces.Services;
using WebApi.Domain.Specifications;

namespace WebApi.Infrastructure.Services
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;
        private readonly IOrderProcessingNotification _orderProcessingNotification;

        public OrderService(IBasketRepository basketRepo,
                            IUnitOfWork unitOfWork,
                            IPaymentService paymentService,
                            IOrderProcessingNotification orderProcessingNotification)
        {
            _paymentService = paymentService;
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
            _orderProcessingNotification = orderProcessingNotification;
        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            // get basket from the repo
            var basket = await _basketRepo.GetBasketAsync(basketId);

            // get items from the product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().FindByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(productItem.Id, productItem.Name, productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                items.Add(orderItem);
            }

            // get delivery method from repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().FindByIdAsync(deliveryMethodId);

            // calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            // check to see if order exists
            var spec = new OrderByPaymentIntentIdSpecification(basket.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            if (existingOrder != null)
            {
                await _unitOfWork.Repository<Order>().DeleteAsync(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }

            // create order
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal, basket.PaymentIntentId);
            await _unitOfWork.Repository<Order>().AddAsync(order);

            // save to db
            var result = await _unitOfWork.Complete();

            if (result <= 0) return null;

            // Announce it only once it is durable. Publishing before the commit would
            // let Admin record an order that a failed transaction then rolled back.
            //
            // Known gap, and the reason this is not yet correct rather than merely
            // working: the commit and the publish are two operations with no
            // transaction across them. A crash here loses the event silently. The fix
            // is a transactional outbox — see src/EventBus.Messages/readme.md.
            await _orderProcessingNotification.OrderPlacedAsync(order, buyerEmail, basket.PaymentIntentId);

            // return order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);

            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {

            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);

            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
        public async Task<IReadOnlyList<Order>> GetOrders()
        {
            var spec = new OrdersWithItemsAndOrderingSpecification();
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}