using EventBus.Messages.Common;
using EventBus.Messages.Consumers;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventBus.Messages
{
    /// <summary>
    /// The two halves of the bus, registered from one place so the producer and the
    /// consumer cannot be configured against different brokers or different queues.
    /// </summary>
    public static class EventBusExtensions
    {
        /// <summary>
        /// Producer side (API.Basket). Registers the bus so <see cref="IPublishEndpoint"/>
        /// can be injected. MassTransit 8 starts and stops the bus itself through a
        /// hosted service — <c>AddMassTransitHostedService</c> is not needed and is
        /// obsolete.
        /// </summary>
        public static IServiceCollection AddOrderEventPublishing(this IServiceCollection services, IConfiguration config)
        {
            var host = ResolveBrokerUri(config);

            services.AddMassTransit(x =>
            {
                x.SetKebabCaseEndpointNameFormatter();

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(host);

                    // A publish that cannot reach the broker should not fail checkout on
                    // the first blip; it should retry briefly and then surface.
                    cfg.UseMessageRetry(r => r.Interval(3, TimeSpan.FromSeconds(2)));
                });
            });

            return services;
        }

        /// <summary>
        /// Consumer side (API.Admin). Binds <see cref="OrderPlacedConsumer"/> to
        /// <see cref="MessageConstants.OrderPlacedQueue"/>. The queue is durable, so an
        /// order placed while Admin is down waits on the broker instead of being lost.
        /// </summary>
        public static IServiceCollection AddOrderEventConsuming(this IServiceCollection services, IConfiguration config)
        {
            var host = ResolveBrokerUri(config);

            services.AddMassTransit(x =>
            {
                x.SetKebabCaseEndpointNameFormatter();
                x.AddConsumer<OrderPlacedConsumer>();

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(host);

                    cfg.ReceiveEndpoint(MessageConstants.OrderPlacedQueue, e =>
                    {
                        e.UseMessageRetry(r => r.Interval(5, TimeSpan.FromSeconds(5)));
                        e.ConfigureConsumer<OrderPlacedConsumer>(context);
                    });
                });
            });

            return services;
        }

        /// <summary>
        /// Reads <see cref="MessageConstants.RabbitMqHostKey"/> and turns it into an AMQP
        /// URI. Accepts both a full URI and a bare host name, because the committed
        /// configuration has historically contained both (<c>amqp://guest:guest@localhost:5672</c>
        /// in appsettings.json, <c>rabbitowlet</c> in appsettings.Development.json), and a
        /// mismatch there is otherwise a silent connection failure at start-up.
        /// </summary>
        public static Uri ResolveBrokerUri(IConfiguration config)
        {
            var value = config?[MessageConstants.RabbitMqHostKey];

            if (string.IsNullOrWhiteSpace(value))
            {
                throw new InvalidOperationException(
                    $"Configuration key '{MessageConstants.RabbitMqHostKey}' is not set. " +
                    "Set it to an AMQP URI (amqp://user:password@host:5672) or a host name.");
            }

            return ResolveBrokerUri(value);
        }

        /// <inheritdoc cref="ResolveBrokerUri(IConfiguration)"/>
        public static Uri ResolveBrokerUri(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException("A broker address is required.", nameof(value));
            }

            value = value.Trim();

            if (Uri.TryCreate(value, UriKind.Absolute, out var uri)
                && (uri.Scheme == "amqp" || uri.Scheme == "amqps" || uri.Scheme == "rabbitmq"))
            {
                return uri;
            }

            return new Uri($"amqp://guest:guest@{value}:5672");
        }
    }
}
