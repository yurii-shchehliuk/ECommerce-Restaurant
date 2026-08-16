namespace EventBus.Messages.Contracts
{
    /// <summary>
    /// Published by API.Basket once an order has been committed to the store database,
    /// consumed by API.Admin.
    ///
    /// This is a wire contract, not a domain object. It is flat, it carries only
    /// primitives, and it lives in an assembly that references no domain project, so a
    /// change to <c>WebApi.Domain.Entities.OrderAggregate.Order</c> cannot silently
    /// change what goes on the queue. MassTransit routes on the type's full name
    /// (<c>urn:message:EventBus.Messages.Contracts:OrderPlaced</c>), so renaming or
    /// moving this type is a breaking change to the exchange topology as well as to
    /// the payload — which is exactly the kind of change that should require a commit
    /// on both sides.
    /// </summary>
    public class OrderPlaced
    {
        /// <summary>Identity of the event itself, used by the consumer to deduplicate.</summary>
        public Guid EventId { get; set; } = Guid.NewGuid();

        public DateTime OccurredAtUtc { get; set; } = DateTime.UtcNow;

        public int OrderId { get; set; }

        public string BuyerEmail { get; set; }

        public string PaymentIntentId { get; set; }

        public string Status { get; set; }

        public decimal Subtotal { get; set; }

        public decimal DeliveryPrice { get; set; }

        public decimal Total { get; set; }

        public List<OrderPlacedItem> Items { get; set; } = new();
    }
}
