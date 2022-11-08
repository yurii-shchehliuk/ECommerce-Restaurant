using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.Domain.Integration.MessageDTOs
{
    public class OrderMessage
    {
        public Order Order { get; set; }
        public string CustomerEmail { get; set; }
        public string PaymentIntentId { get; set; }
    }
}
