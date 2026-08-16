using EventBus.Messages.Abstractions;
using EventBus.Messages.Contracts;
using MassTransit;
using Microsoft.Extensions.Logging;

namespace EventBus.Messages.Consumers
{
    /// <summary>
    /// The Admin side of the asynchronous order path.
    ///
    /// This implements <see cref="IConsumer{TMessage}"/>, which is what MassTransit
    /// actually dispatches to. The previous version of this class extended
    /// RabbitMQ.Client's <c>DefaultBasicConsumer</c> while exposing a MassTransit-shaped
    /// <c>Consume(ConsumeContext&lt;T&gt;)</c>, so neither library would ever have called
    /// it — it was half-migrated between two APIs and nothing noticed for three years,
    /// because nothing tested it. <c>OrderPlacedConsumerTest</c> now does.
    /// </summary>
    public class OrderPlacedConsumer : IConsumer<OrderPlaced>
    {
        private readonly IOrderEventSink _sink;
        private readonly ILogger<OrderPlacedConsumer> _logger;

        public OrderPlacedConsumer(IOrderEventSink sink, ILogger<OrderPlacedConsumer> logger)
        {
            _sink = sink;
            _logger = logger;
        }

        public async Task Consume(ConsumeContext<OrderPlaced> context)
        {
            var message = context.Message;

            var recorded = await _sink.RecordAsync(message, context.CancellationToken);

            if (recorded)
            {
                _logger.LogInformation(
                    "Consumed OrderPlaced {EventId} for order {OrderId} ({BuyerEmail}, {ItemCount} items, total {Total})",
                    message.EventId, message.OrderId, message.BuyerEmail, message.Items?.Count ?? 0, message.Total);
            }
            else
            {
                // Not an error. At-least-once delivery means duplicates are normal;
                // the point of logging it is that a *flood* of them is not.
                _logger.LogInformation(
                    "Skipped duplicate OrderPlaced {EventId} for order {OrderId}",
                    message.EventId, message.OrderId);
            }
        }
    }
}
