using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.Domain.Integration
{
    public class OrderMessageDTO : IntegrationBaseEvent
    {
        public Order Order { get; set; }
        public string CustomerEmail { get; set; }
        public string PaymentIntentId { get; set; }
    }
}
