using Microsoft.AspNetCore.Builder;
using WebApi.Domain.Integration;

namespace WebApi.Infrastructure.IntegrationExtentions.Middleware
{
    public static class MiddlewareServices
    {
        public static void ApplicationConfiguration(this IApplicationBuilder app)
        {
            var forwardedHeaderOptions = new ForwardedHeadersOptions
            {
                ForwardedHeaders = Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedFor | Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedProto
            };
            forwardedHeaderOptions.KnownNetworks.Clear();
            forwardedHeaderOptions.KnownProxies.Clear();
            app.UseForwardedHeaders(forwardedHeaderOptions);

            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}
