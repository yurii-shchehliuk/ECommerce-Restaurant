using EventBus.Messages.Contracts;
using MassTransit;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Interfaces.Integration;

namespace WebApi.Infrastructure.Services
{
    /// <summary>
    /// Producer-side implementation of <see cref="IOrderProcessingNotification"/>:
    /// maps the committed <see cref="Order"/> aggregate onto the flat
    /// <see cref="OrderPlaced"/> contract and publishes it through MassTransit.
    ///
    /// The mapping lives here rather than in <c>EventBus.Messages</c> on purpose — it
    /// is the only place that knows about both the domain and the wire format, and
    /// keeping it here is what allows the contracts assembly to reference no domain
    /// project at all.
    /// </summary>
    public class OrderEventPublisher : IOrderProcessingNotification
    {
        private readonly IPublishEndpoint _publishEndpoint;

        public OrderEventPublisher(IPublishEndpoint publishEndpoint)
        {
            _publishEndpoint = publishEndpoint;
        }

        public Task OrderPlacedAsync(Order order, string buyerEmail, string paymentIntentId, CancellationToken cancellationToken = default)
        {
            if (order == null) throw new ArgumentNullException(nameof(order));

            return _publishEndpoint.Publish(ToContract(order, buyerEmail, paymentIntentId), cancellationToken);
        }

        /// <summary>
        /// Exposed for testing: the mapping is the part of this class that can be wrong
        /// without a broker being involved.
        /// </summary>
        public static OrderPlaced ToContract(Order order, string buyerEmail, string paymentIntentId)
        {
            var deliveryPrice = order.DeliveryMethod?.Price ?? 0m;

            return new OrderPlaced
            {
                EventId = Guid.NewGuid(),
                OccurredAtUtc = DateTime.UtcNow,
                OrderId = order.Id,
                BuyerEmail = buyerEmail ?? order.BuyerEmail,
                PaymentIntentId = paymentIntentId ?? order.PaymentIntentId,
                Status = order.Status.ToString(),
                Subtotal = order.Subtotal,
                DeliveryPrice = deliveryPrice,
                Total = order.Subtotal + deliveryPrice,
                Items = (order.OrderItems ?? Array.Empty<OrderItem>())
                    .Select(i => new OrderPlacedItem
                    {
                        ProductId = i.ItemOrdered?.ProductItemId ?? 0,
                        ProductName = i.ItemOrdered?.ProductName,
                        Price = i.Price,
                        Quantity = i.Quantity
                    })
                    .ToList()
            };
        }
    }
}
