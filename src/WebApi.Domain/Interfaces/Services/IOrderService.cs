using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.Domain.Interfaces.Services
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethod, string basketId, Address shippingAddress);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
        Task<IReadOnlyList<Order>> GetOrders();
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}