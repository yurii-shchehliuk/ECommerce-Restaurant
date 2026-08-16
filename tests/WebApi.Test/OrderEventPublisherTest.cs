using System.Reflection;
using System.Text.Json;
using EventBus.Messages;
using EventBus.Messages.Contracts;
using Microsoft.Extensions.Configuration;
using WebApi.Domain.Entities.OrderAggregate;
using WebApi.Infrastructure.Services;
using Xunit;

namespace WebApi.Test
{
    /// <summary>
    /// The producer side that can be wrong without a broker being involved: the
    /// domain-to-contract mapping, the shape of the contract on the wire, and the
    /// broker address parsing.
    /// </summary>
    public class OrderEventPublisherTest
    {
        private static Order SampleOrder() => new(
            orderItems: new List<OrderItem>
            {
                new(new ProductItemOrdered(7, "Owlet Burger", "burger.jpg"), 12.25m, 2),
                new(new ProductItemOrdered(9, "Fries", "fries.jpg"), 3.00m, 1)
            },
            buyerEmail: "bob@example.com",
            shipToAddress: new Address("Bob", "Smith", "1 Main St", "St. Paul", "MN", "55101"),
            deliveryMethod: new DeliveryMethod { Id = 1, ShortName = "Bike", Price = 5.00m },
            subtotal: 27.50m,
            paymentIntentId: "pi_test_123")
        { Id = 101 };

        [Fact]
        public void ToContract_FlattensTheAggregate()
        {
            var contract = OrderEventPublisher.ToContract(SampleOrder(), "bob@example.com", "pi_test_123");

            Assert.Equal(101, contract.OrderId);
            Assert.Equal("bob@example.com", contract.BuyerEmail);
            Assert.Equal("pi_test_123", contract.PaymentIntentId);
            Assert.Equal("Pending", contract.Status);
            Assert.Equal(27.50m, contract.Subtotal);
            Assert.Equal(5.00m, contract.DeliveryPrice);
            // Delivery is folded in, so a consumer never has to know the pricing rule.
            Assert.Equal(32.50m, contract.Total);

            Assert.Collection(contract.Items,
                first =>
                {
                    Assert.Equal(7, first.ProductId);
                    Assert.Equal("Owlet Burger", first.ProductName);
                    Assert.Equal(12.25m, first.Price);
                    Assert.Equal(2, first.Quantity);
                },
                second => Assert.Equal("Fries", second.ProductName));
        }

        [Fact]
        public void ToContract_SurvivesAnOrderWithNoDeliveryMethodOrItems()
        {
            // An Order built by EF without its navigations loaded has both null. The
            // mapping runs on the checkout path, so a NullReferenceException here
            // would fail the whole request after the order was already committed.
            var bare = new Order { Id = 5, BuyerEmail = "x@example.com", Subtotal = 10m };

            var contract = OrderEventPublisher.ToContract(bare, null, null);

            Assert.Equal(5, contract.OrderId);
            Assert.Equal("x@example.com", contract.BuyerEmail);
            Assert.Equal(0m, contract.DeliveryPrice);
            Assert.Equal(10m, contract.Total);
            Assert.Empty(contract.Items);
        }

        [Fact]
        public void OrderPlaced_RoundTripsThroughSystemTextJson()
        {
            // MassTransit 8 serialises with System.Text.Json. A property that has no
            // setter, or a type STJ cannot construct, would be silently dropped on the
            // consumer side rather than failing loudly.
            var original = OrderEventPublisher.ToContract(SampleOrder(), "bob@example.com", "pi_test_123");

            var round = JsonSerializer.Deserialize<OrderPlaced>(JsonSerializer.Serialize(original))!;

            Assert.Equal(original.EventId, round.EventId);
            Assert.Equal(original.OrderId, round.OrderId);
            Assert.Equal(original.BuyerEmail, round.BuyerEmail);
            Assert.Equal(original.Total, round.Total);
            Assert.Equal(original.Items.Count, round.Items.Count);
            Assert.Equal(original.Items[0].ProductName, round.Items[0].ProductName);
        }

        [Fact]
        public void TheContractsAssembly_DependsOnNoDomainProject()
        {
            // This is the property that stops the wire format drifting by accident. The
            // old contract, OrderMessageDTO, lived in WebApi.Domain and embedded the
            // Order entity, so changing a persistence model changed what went on the
            // queue. If someone adds a ProjectReference back to EventBus.Messages, this
            // fails and they have to argue for it.
            var referenced = typeof(OrderPlaced).Assembly
                .GetReferencedAssemblies()
                .Select(a => a.Name)
                .ToArray();

            Assert.DoesNotContain("WebApi.Domain", referenced);
            Assert.DoesNotContain("WebApi.Db.Store", referenced);
            Assert.DoesNotContain("WebApi.Infrastructure", referenced);
        }

        [Theory]
        [InlineData("amqp://guest:guest@localhost:5672", "amqp://guest:guest@localhost:5672/")]
        [InlineData("amqp://user:pw@rabbitowlet:5672", "amqp://user:pw@rabbitowlet:5672/")]
        // The bare host name is not hypothetical: appsettings.Development.json shipped
        // "rabbitowlet" while appsettings.json shipped a full URI, and MassTransit's
        // Host(Uri) overload would have thrown on the first of those.
        [InlineData("rabbitowlet", "amqp://guest:guest@rabbitowlet:5672/")]
        [InlineData("  localhost  ", "amqp://guest:guest@localhost:5672/")]
        public void ResolveBrokerUri_AcceptsUrisAndBareHostNames(string configured, string expected)
        {
            Assert.Equal(expected, EventBusExtensions.ResolveBrokerUri(configured).ToString());
        }

        [Fact]
        public void ResolveBrokerUri_FailsLoudlyWhenUnset()
        {
            var empty = new ConfigurationBuilder().Build();

            var ex = Assert.Throws<InvalidOperationException>(() => EventBusExtensions.ResolveBrokerUri(empty));

            Assert.Contains("RabbitMqHost", ex.Message);
        }
    }
}
