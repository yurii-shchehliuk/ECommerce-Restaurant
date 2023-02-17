using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Infrastructure.Repositories;

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
            //services.AddTransient<IProductRepository, ProductRepository>();

            /// MassTransit-RabbitMQ
            //services.AddMassTransit(config =>
            //{
            //    config.UsingRabbitMq((ctx, cfg) =>
            //    {
            //        cfg.Host(_config.GetValue<string>("RabbitMqHost"));
            //        cfg.ReceiveEndpoint(MessageConstants.basketCheckoutQueue, c =>
            //        {
            //            c.ConfigureConsumer<OrderReceivedConsumer>(ctx);
            //        });

            //    });

            //    config.AddConsumer<OrderReceivedConsumer>();
            //});
            // deprecated
            //services.AddMassTransitHostedService();

            return services;
        }
        #endregion
    }
}