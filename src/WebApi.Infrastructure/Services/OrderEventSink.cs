using EventBus.Messages.Abstractions;
using EventBus.Messages.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Db.Store;
using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.Infrastructure.Services
{
    /// <summary>
    /// Consumer-side side effect: records a consumed <see cref="OrderPlaced"/> in
    /// <c>appdb</c>, once.
    /// </summary>
    public class OrderEventSink : IOrderEventSink
    {
        private readonly StoreContext _context;

        public OrderEventSink(StoreContext context)
        {
            _context = context;
        }

        public async Task<bool> RecordAsync(OrderPlaced message, CancellationToken cancellationToken = default)
        {
            // RabbitMQ delivers at least once. Checking first keeps the common case
            // cheap; the unique index on EventId is what actually guarantees it.
            var alreadySeen = await _context.ReceivedOrderEvents
                .AsNoTracking()
                .AnyAsync(e => e.EventId == message.EventId, cancellationToken);

            if (alreadySeen) return false;

            _context.ReceivedOrderEvents.Add(new ReceivedOrderEvent
            {
                EventId = message.EventId,
                OrderId = message.OrderId,
                BuyerEmail = message.BuyerEmail,
                PaymentIntentId = message.PaymentIntentId,
                Status = message.Status,
                Total = message.Total,
                ItemCount = message.Items?.Count ?? 0,
                OccurredAtUtc = message.OccurredAtUtc,
                ReceivedAtUtc = System.DateTime.UtcNow
            });

            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
