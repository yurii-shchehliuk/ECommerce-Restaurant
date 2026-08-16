using Microsoft.EntityFrameworkCore;
using System.Reflection;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Domain.Entities.Store;

namespace WebApi.Db.Store
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductBrand> ProductBrands { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }
        public DbSet<Comment> Comments { get; set; }

        /// <summary>
        /// Written by API.Admin's <c>OrderPlacedConsumer</c>, not by the storefront.
        /// It is the durable record that the bus actually delivered something.
        /// </summary>
        public DbSet<ReceivedOrderEvent> ReceivedOrderEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}