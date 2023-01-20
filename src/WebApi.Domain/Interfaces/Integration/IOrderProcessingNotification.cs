using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.Domain.Interfaces.Integration
{
    /// <summary>
    /// Message sender
    /// </summary>
    public interface IOrderProcessingNotification
    {
        void OrderReceived(Order order, string buyerEmail, string paymentIntentId);
    }
}
