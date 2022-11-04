using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;
using System.Linq;
using WebApi.Db.Store;
using WebApi.Domain.Errors;
using WebApi.Domain.Interfaces;
using WebApi.Domain.Interfaces.Integration;
using WebApi.Infrastructure.BackgroundTasks;
using WebApi.Infrastructure.Repositories;
using WebApi.Infrastructure.Repositories.Integration;
using WebApi.Infrastructure.Services;

namespace WebApi.Infrastructure.IntegrationExtentions.Basket
{
    public static class ApplicationServices
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration _config)
        {
            services.AddSingleton<IResponseCacheService, ResponseCacheService>();
            services.AddSingleton<IConnectionMultiplexer>(c =>
            {
                var configuration = ConfigurationOptions.Parse(_config
                    .GetConnectionString("Redis"), true);
                configuration.AbortOnConnectFail = false;
                return ConnectionMultiplexer.Connect(configuration);
            });
            services.AddHostedService<RedisSubscriber>();
            services.AddScoped<IBasketRepository, BasketContext>();

            //
            services.AddScoped<IProductRepository, ProductRepository>();
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

            services.AddScoped<IOrderProcessingNotification, OrderProcessingNotification>();

            services.AddSignalR(hubOptions =>
            {
                hubOptions.EnableDetailedErrors = true;
                hubOptions.KeepAliveInterval = System.TimeSpan.FromMinutes(1);
            });
        }
    }
}