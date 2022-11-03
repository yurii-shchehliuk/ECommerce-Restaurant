using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Domain.Interfaces;
using WebApi.Infrastructure.Services;

namespace WebApi.Infrastructure.IntegrationExtentions.Identity
{
    public static class ApplicationServices
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenService>();
            services.AddTransient<IEmailSender>(s => new EmailSender(config));
        }
    }
}