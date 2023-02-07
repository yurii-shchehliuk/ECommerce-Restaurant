using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System.Linq;
using WebApi.Db.Store;
using WebApi.Domain.Errors;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Domain.Interfaces.Services;
using WebApi.Infrastructure.Repositories;
using WebApi.Infrastructure.Services;

namespace WebApi.Infrastructure.StartupExtensions.Basket
{
    public static class BasketExtensions
    {
        #region service
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration _config)
        {
            /// Redis
            services.AddSingleton<IResponseCacheService, ResponseCacheService>();
            services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var configuration = ConfigurationOptions.Parse(_config
                    .GetConnectionString("Redis"), true);
                configuration.AbortOnConnectFail = false;
                return ConnectionMultiplexer.Connect(configuration);
            });
            services.AddScoped<IBasketRepository, BasketContext>();
            // IDistributedCache
            //services.AddStackExchangeRedisCache(o =>
            //    o.Configuration = _config.GetConnectionString("Redis")
            //);
            //services.AddHostedService<RedisSubscriber>();
            
            /// MassTransit-RabbitMQ
            //services.AddMassTransit(config =>
            //{
            //    config.UsingRabbitMq((ctx, cfg) =>
            //    {
            //        cfg.Host(_config.GetValue<string>("RabbitMqHost"));
            //    });
            //});
            // deprecated
            //services.AddMassTransitHostedService();

            //services.AddHostedService<MessageWorker>();
            //services.AddSingleton<IOrderProcessingNotification, MessageNotification>();
            //
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IPaymentService, PaymentService>();
            //
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResponse);
                };
            });

        }
        #endregion
    }
}