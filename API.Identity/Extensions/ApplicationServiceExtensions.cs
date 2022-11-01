using Microsoft.Extensions.DependencyInjection;
using WebApi.Domain.Interfaces;
using WebApi.Infrastructure.Services;

namespace IdentityAPI.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ITokenService, TokenService>();
        }
    }
}