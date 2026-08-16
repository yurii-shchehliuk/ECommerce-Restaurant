using System;

namespace WebApi.Domain.Entities.OrderAggregate
{
    /// <summary>
    /// An <c>OrderPlaced</c> message that API.Admin has consumed off the bus.
    ///
    /// This exists so the asynchronous path has an observable, durable effect: after a
    /// checkout you can query <c>GET /api/orderevents</c> on Admin and see the row that
    /// only exists because the message actually travelled. A log line would have been
    /// cheaper and would have proved less.
    /// </summary>
    public class ReceivedOrderEvent : BaseEntity
    {
        /// <summary>
        /// The publisher's event id. Unique-indexed, which is what makes the consumer
        /// idempotent under RabbitMQ's at-least-once delivery.
        /// </summary>
        public Guid EventId { get; set; }

        public int OrderId { get; set; }

        public string BuyerEmail { get; set; }

        public string PaymentIntentId { get; set; }

        public string Status { get; set; }

        public decimal Total { get; set; }

        public int ItemCount { get; set; }

        /// <summary>When API.Basket published it.</summary>
        public DateTime OccurredAtUtc { get; set; }

        /// <summary>When API.Admin consumed it. The gap between the two is the bus latency.</summary>
        public DateTime ReceivedAtUtc { get; set; } = DateTime.UtcNow;
    }
}
