namespace EventBus.Messages.Common
{
    public static class MessageConstants
    {
        /// <summary>
        /// The receive endpoint API.Admin binds. MassTransit creates the queue, the
        /// fanout exchange named after the message type, and the binding between them.
        /// </summary>
        public const string OrderPlacedQueue = "owlet-order-placed";

        /// <summary>
        /// Configuration key holding the broker address. Either a full AMQP URI
        /// (<c>amqp://user:pass@host:5672</c>) or a bare host name, which is expanded
        /// to <c>amqp://guest:guest@{host}:5672</c> for local development.
        /// </summary>
        public const string RabbitMqHostKey = "RabbitMqHost";
    }
}
