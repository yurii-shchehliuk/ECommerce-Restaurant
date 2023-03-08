using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System;
using System.IO;

namespace WebApi.Infrastructure.StartupExtensions.ApiWeb
{
    public static class ApiWebExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration _config)
        {
            services.AddHttpContextAccessor();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot/dist";
            });

            return services;
        }

        public static void UseAngular(this IApplicationBuilder app, bool isDev, bool spa = true)
        {
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")
                ),
                RequestPath = "/wwwroot"
            });

            if (spa)
            {
                // var virtualPath = "/api";
                // app.Map(virtualPath, builder => { });
                // app.MapWhen(x => !x.Request.Path.Value.StartsWith(virtualPath), builder => { });

                app.UseSpa(spa =>
                {
                    //path to the angular application
                    spa.Options.SourcePath = "ClientApp";
                    if (isDev)
                    {
                        spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                    }
                    else
                    {
                        spa.Options.StartupTimeout = new TimeSpan(0, 0, 20);
                        spa.UseAngularCliServer(npmScript: "start");
                    }

                });
            }

        }
    }
}