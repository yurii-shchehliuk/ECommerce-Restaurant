using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Infrastructure.Repositories;

namespace WebApi.Infrastructure.StartupExtensions.ApiWeb
{
    public static class ApiWebExtensions
    {
        #region service
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration _config)
        {
            services.AddHttpContextAccessor();
            services.AddFluentValidationAutoValidation();
            services.AddSignalR(hubOptions =>
            {

                hubOptions.EnableDetailedErrors = true;
                hubOptions.KeepAliveInterval = System.TimeSpan.FromMinutes(1);
            });

            return services;
        }
        #endregion
    }
}