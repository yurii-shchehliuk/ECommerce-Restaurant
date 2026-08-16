using EventBus.Messages;
using EventBus.Messages.Abstractions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Infrastructure.Repositories;
using WebApi.Infrastructure.Services;

namespace WebApi.Infrastructure.StartupExtensions.Admin
{
    public static class AdminExtensions
    {
        #region service
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration _config)
        {
            services.AddIdentityDb(_config);
            services.AddStoreDb(_config);

            services.AddTransient<IUnitOfWork, UnitOfWork>();

            /// MassTransit-RabbitMQ, consumer side.
            /// AddOrderEventConsuming binds OrderPlacedConsumer to a durable queue;
            /// OrderEventSink is the side effect it performs, scoped so it gets a
            /// StoreContext per message.
            services.AddOrderEventConsuming(_config);
            services.AddScoped<IOrderEventSink, OrderEventSink>();

            return services;
        }
        #endregion
    }
}
