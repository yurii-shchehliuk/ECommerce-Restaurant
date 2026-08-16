using EventBus.Messages.Abstractions;
using EventBus.Messages.Consumers;
using EventBus.Messages.Contracts;
using MassTransit;
using MassTransit.Testing;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace WebApi.Test
{
    /// <summary>
    /// The test whose absence is the whole reason this repository's message bus was
    /// broken for three years.
    ///
    /// Everything about the old asynchronous path looked right from a distance: there
    /// was a contracts project, a publisher, two consumers, RabbitMQ in
    /// docker-compose.yml, and a RabbitMqHost setting in configuration. What there was
    /// not, anywhere, was a single assertion that a published message reaches a
    /// consumer. So nobody noticed that <c>OrderReceivedConsumer</c> extended
    /// RabbitMQ.Client's <c>DefaultBasicConsumer</c> while exposing a MassTransit-shaped
    /// <c>Consume(ConsumeContext&lt;T&gt;)</c> without implementing
    /// <see cref="IConsumer{T}"/> - a class neither library would ever have called.
    ///
    /// These tests run on MassTransit's in-memory transport, so they need no broker,
    /// no Docker and no network. That matters: a test that needs infrastructure is a
    /// test that gets skipped, and a skipped test is how this happened.
    /// </summary>
    public class OrderPlacedContractTest
    {
        private sealed class RecordingSink : IOrderEventSink
        {
            private readonly object _gate = new();
            private readonly HashSet<Guid> _seen = new();
            private readonly List<OrderPlaced> _recorded = new();
            private int _callCount;

            // Consumers run on the bus's threads, the assertions on the test's, so
            // everything crosses a lock rather than relying on a lucky read.
            public IReadOnlyList<OrderPlaced> Recorded { get { lock (_gate) return _recorded.ToList(); } }
            public int CallCount => Volatile.Read(ref _callCount);

            public Task<bool> RecordAsync(OrderPlaced message, CancellationToken cancellationToken = default)
            {
                Interlocked.Increment(ref _callCount);

                lock (_gate)
                {
                    // Mirrors OrderEventSink's real behaviour: the unique index on
                    // EventId is what makes a redelivery a no-op, not a second row.
                    if (!_seen.Add(message.EventId)) return Task.FromResult(false);

                    _recorded.Add(message);
                }

                return Task.FromResult(true);
            }
        }

        private static ServiceProvider BuildHarness(RecordingSink sink) =>
            new ServiceCollection()
                .AddSingleton<IOrderEventSink>(sink)
                .AddLogging()
                .AddMassTransitTestHarness(cfg => cfg.AddConsumer<OrderPlacedConsumer>())
                .BuildServiceProvider(true);

        private static OrderPlaced SampleEvent(Guid? eventId = null) => new()
        {
            EventId = eventId ?? Guid.NewGuid(),
            OccurredAtUtc = DateTime.UtcNow,
            OrderId = 42,
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
        public async Task PublishedOrderPlaced_ReachesTheConsumer()
        {
            var sink = new RecordingSink();
            await using var provider = BuildHarness(sink);

            var harness = provider.GetRequiredService<ITestHarness>();
            await harness.Start();

            var sent = SampleEvent();
            await harness.Bus.Publish(sent);

            // Two distinct assertions on purpose. The first says the message was
            // published and routed; the second says a consumer was actually invoked.
            // The old code would have passed neither, but it is the second that
            // catches the IConsumer<T> mistake specifically.
            Assert.True(await harness.Published.Any<OrderPlaced>());
            Assert.True(await harness.Consumed.Any<OrderPlaced>());

            var consumer = harness.GetConsumerHarness<OrderPlacedConsumer>();
            Assert.True(await consumer.Consumed.Any<OrderPlaced>());

            var received = Assert.Single(sink.Recorded);
            Assert.Equal(sent.EventId, received.EventId);
            Assert.Equal(42, received.OrderId);
            Assert.Equal("bob@example.com", received.BuyerEmail);
            Assert.Equal(29.50m, received.Total);
            Assert.Equal("Owlet Burger", Assert.Single(received.Items).ProductName);
        }

        [Fact]
        public async Task Redelivery_IsRecordedOnce()
        {
            // RabbitMQ guarantees at-least-once delivery, so the same event arriving
            // twice is normal operation, not an error. The consumer must be idempotent
            // or a broker retry silently doubles the admin-side record.
            var sink = new RecordingSink();
            await using var provider = BuildHarness(sink);

            var harness = provider.GetRequiredService<ITestHarness>();
            await harness.Start();

            var eventId = Guid.NewGuid();
            await harness.Bus.Publish(SampleEvent(eventId));
            await harness.Bus.Publish(SampleEvent(eventId));

            await WaitFor(() => sink.CallCount == 2);

            // The consumer ran twice - it must, because the broker delivered twice -
            // but only the first delivery produced a record.
            Assert.Equal(2, sink.CallCount);
            Assert.Single(sink.Recorded);
        }

        [Fact]
        public async Task ConsumerFailure_IsSurfacedNotSwallowed()
        {
            // If the sink throws, the consumer must fault so MassTransit retries and
            // ultimately dead-letters. A consumer that swallows its own exception
            // acknowledges a message it never handled, which loses the order silently.
            await using var provider = new ServiceCollection()
                .AddSingleton<IOrderEventSink>(new ThrowingSink())
                .AddLogging()
                .AddMassTransitTestHarness(cfg => cfg.AddConsumer<OrderPlacedConsumer>())
                .BuildServiceProvider(true);

            var harness = provider.GetRequiredService<ITestHarness>();
            await harness.Start();

            await harness.Bus.Publish(SampleEvent());

            var consumer = harness.GetConsumerHarness<OrderPlacedConsumer>();
            Assert.True(await consumer.Consumed.Any<OrderPlaced>(x => x.Exception is InvalidOperationException));

            // And MassTransit publishes a Fault<OrderPlaced>, which is what a
            // dead-letter or alerting consumer would subscribe to.
            Assert.True(await harness.Published.Any<Fault<OrderPlaced>>());
        }

        private static async Task WaitFor(Func<bool> condition, int timeoutMs = 5000)
        {
            var deadline = DateTime.UtcNow.AddMilliseconds(timeoutMs);
            while (DateTime.UtcNow < deadline)
            {
                if (condition()) return;
                await Task.Delay(25);
            }

            Assert.True(condition(), "Timed out waiting for the consumer.");
        }

        private sealed class ThrowingSink : IOrderEventSink
        {
            public Task<bool> RecordAsync(OrderPlaced message, CancellationToken cancellationToken = default)
                => throw new InvalidOperationException("appdb is unreachable");
        }
    }
}
