using EventBus.Messages.Contracts;

namespace EventBus.Messages.Abstractions
{
    /// <summary>
    /// Where a consumed <see cref="OrderPlaced"/> is durably recorded.
    ///
    /// The consumer lives in the contracts assembly (so it cannot drift from the
    /// message it handles) but must not know about EF Core or the store schema, so the
    /// side effect is behind this interface. <c>WebApi.Infrastructure</c> supplies the
    /// implementation that writes to <c>StoreContext</c>.
    /// </summary>
    public interface IOrderEventSink
    {
        /// <summary>
        /// Records the event. Implementations must be idempotent on
        /// <see cref="OrderPlaced.EventId"/>: RabbitMQ guarantees at-least-once
        /// delivery, so this will be called more than once for the same event
        /// whenever a consumer fails after doing its work but before acknowledging.
        /// </summary>
        /// <returns><c>true</c> if the event was recorded, <c>false</c> if it had already been recorded.</returns>
        Task<bool> RecordAsync(OrderPlaced message, CancellationToken cancellationToken = default);
    }
}
