namespace EventBus.Messages.Common
{
    public class MessageConstants
    {
        public const string queueName = "owlet.order.received";
        public const string exchangeName = "owlet.order.exchange";
        public const string basketCheckoutQueue = "basketcheckout-queue";
        public const string RabbitMqHost = "amqp://quest:guest@localhost:5672";
        public const string JsonMimeType = "application/json";
    }
}
