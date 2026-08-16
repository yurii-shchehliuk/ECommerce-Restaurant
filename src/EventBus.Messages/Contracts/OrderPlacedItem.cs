namespace EventBus.Messages.Contracts
{
    /// <summary>
    /// One line of an <see cref="OrderPlaced"/>. Prices are the ones the order was
    /// actually committed at, not the ones the client sent.
    /// </summary>
    public class OrderPlacedItem
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }
    }
}
