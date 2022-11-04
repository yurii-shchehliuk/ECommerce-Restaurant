using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using WebApi.Domain.Entities.OrderAggregate;

namespace WebApi.DB.Store.Configuration
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.Property(s => s.Status).HasConversion(o => o.ToString(),o => (OrderStatus)Enum.Parse(typeof(OrderStatus), o));
            builder.Property(o=>o.Subtotal).HasColumnType("decimal(18,2)");
            builder.OwnsOne(o => o.ShipToAddress, a =>
            {
                a.WithOwner();
            });
            builder.HasMany(o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);


        }
    }
}