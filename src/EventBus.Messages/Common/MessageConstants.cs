namespace EventBus.Messages.Common
{
    public class MessageConstants
    {
        public const string queueName = "owlet.order.received";
        public const string exchangeName = "owlet.order.exchange";
        public const string basketCheckoutQueue = "basketcheckout-queue";
        // Fallback for local development only. Real hosts come from the "RabbitMqHost"
        // configuration key (appsettings / environment / user-secrets), never from here.
        public const string RabbitMqHost = "amqp://guest:guest@localhost:5672";
        public const string JsonMimeType = "application/json";
    }
}
