using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.DB.Store.Configuration
{
    public class ReceivedOrderEventConfiguration : IEntityTypeConfiguration<ReceivedOrderEvent>
    {
        public void Configure(EntityTypeBuilder<ReceivedOrderEvent> builder)
        {
            builder.Property(e => e.EventId).IsRequired();

            // The idempotency guarantee. A redelivered message hits this index and the
            // sink reports the duplicate instead of writing a second row.
            builder.HasIndex(e => e.EventId).IsUnique();

            builder.Property(e => e.BuyerEmail).HasMaxLength(256);
            builder.Property(e => e.PaymentIntentId).HasMaxLength(128);
            builder.Property(e => e.Status).HasMaxLength(32);
            builder.Property(e => e.Total).HasColumnType("decimal(18,2)");
        }
    }
}
