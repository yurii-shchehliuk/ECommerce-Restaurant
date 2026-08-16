using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.Domain.Interfaces.Integration
{
    /// <summary>
    /// The producer seam. <c>OrderService</c> depends on this and not on MassTransit,
    /// so the checkout path can be unit tested without a broker and the transport can
    /// be swapped without touching the service.
    /// </summary>
    public interface IOrderProcessingNotification
    {
        /// <summary>
        /// Announces that an order has been committed. Called only after the order is
        /// durable — publishing before the commit would let a consumer act on an order
        /// that a failed transaction then rolled back.
        /// </summary>
        Task OrderPlacedAsync(Order order, string buyerEmail, string paymentIntentId, CancellationToken cancellationToken = default);
    }
}
