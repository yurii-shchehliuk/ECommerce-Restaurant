using EventBus.Messages.Contracts;
using Microsoft.EntityFrameworkCore;
using WebApi.Db.Store;
using WebApi.Infrastructure.Services;
using Xunit;

namespace WebApi.Test
{
    /// <summary>
    /// The consumer's side effect, against a real <see cref="StoreContext"/> on the
    /// EF in-memory provider. It does not enforce the unique index — that is SQL
    /// Server's job and the migration's — so what is asserted here is the sink's own
    /// check, which is the path that runs in the common case.
    /// </summary>
    public class OrderEventSinkTest
    {
        private static StoreContext NewContext() =>
            new(new DbContextOptionsBuilder<StoreContext>()
                .UseInMemoryDatabase($"appdb-{Guid.NewGuid()}")
                .ConfigureWarnings(w => w.Ignore(Microsoft.EntityFrameworkCore.Diagnostics.InMemoryEventId.TransactionIgnoredWarning))
                .Options);

        private static OrderPlaced Event(Guid id) => new()
        {
            EventId = id,
            OccurredAtUtc = new DateTime(2026, 8, 16, 1, 0, 0, DateTimeKind.Utc),
            OrderId = 77,
            BuyerEmail = "bob@example.com",
            PaymentIntentId = "pi_test_123",
            Status = "Pending",
            Subtotal = 24.50m,
            DeliveryPrice = 5.00m,
            Total = 29.50m,
            Items = new List<OrderPlacedItem>
            {
                new() { ProductId = 1, ProductName = "Owlet Burger", Price = 12.25m, Quantity = 2 }
            }
        };

        [Fact]
        public async Task RecordAsync_WritesTheEvent()
        {
            using var context = NewContext();
            var sut = new OrderEventSink(context);
            var id = Guid.NewGuid();

            Assert.True(await sut.RecordAsync(Event(id)));

            var row = Assert.Single(await context.ReceivedOrderEvents.ToListAsync());
            Assert.Equal(id, row.EventId);
            Assert.Equal(77, row.OrderId);
            Assert.Equal("bob@example.com", row.BuyerEmail);
            Assert.Equal(29.50m, row.Total);
            // The item list is not stored, only its size: the admin view needs to know
            // an order had lines, not to become a second copy of the order.
            Assert.Equal(1, row.ItemCount);
            Assert.Equal(new DateTime(2026, 8, 16, 1, 0, 0, DateTimeKind.Utc), row.OccurredAtUtc);
            Assert.True(row.ReceivedAtUtc >= row.OccurredAtUtc);
        }

        [Fact]
        public async Task RecordAsync_IsIdempotentOnEventId()
        {
            using var context = NewContext();
            var sut = new OrderEventSink(context);
            var id = Guid.NewGuid();

            Assert.True(await sut.RecordAsync(Event(id)));
            Assert.False(await sut.RecordAsync(Event(id)));

            Assert.Single(await context.ReceivedOrderEvents.ToListAsync());
        }

        [Fact]
        public async Task RecordAsync_TreatsDistinctEventsAsDistinct()
        {
            // Two events for the same OrderId are not duplicates: a retried checkout
            // legitimately produces a second order event, and collapsing on OrderId
            // would hide it.
            using var context = NewContext();
            var sut = new OrderEventSink(context);

            Assert.True(await sut.RecordAsync(Event(Guid.NewGuid())));
            Assert.True(await sut.RecordAsync(Event(Guid.NewGuid())));

            Assert.Equal(2, await context.ReceivedOrderEvents.CountAsync());
        }
    }
}
