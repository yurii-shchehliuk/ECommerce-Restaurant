using EventBus.Messages;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System.Linq;
using WebApi.Db.Store;
using WebApi.Domain.Core;
using WebApi.Domain.Interfaces.Integration;
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
            services.AddStoreDb(_config);
            services.AddIdentityDb(_config);

            /// services
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IPaymentService, PaymentService>();

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            /// MassTransit-RabbitMQ, producer side.
            /// Registers the bus (hosted, started by MassTransit itself) and the
            /// adapter OrderService publishes through.
            services.AddOrderEventPublishing(_config);
            services.AddScoped<IOrderProcessingNotification, OrderEventPublisher>();

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

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = Result<string>.Fail("InvalidModelStateResponseFactory", errors);

                    return new BadRequestObjectResult(errorResponse);
                };
            });
        }
        #endregion
    }
}