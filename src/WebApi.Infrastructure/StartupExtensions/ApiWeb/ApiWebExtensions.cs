using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;

namespace WebApi.Infrastructure.StartupExtensions.ApiWeb
{
    public static class ApiWebExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration _config)
        {
            services.AddHttpContextAccessor();

            // Where the built Angular bundle lives, relative to the content root.
            // src/API.Web/Dockerfile's node stage writes `ng build` output here, so the
            // container serves a real bundle instead of needing the Angular CLI.
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot/dist";
            });

            return services;
        }

        /// <summary>
        /// Two modes, and the distinction is the fix for "the container never serves the SPA":
        ///
        /// - <b>Development</b>: proxy to the Angular CLI dev server, so you get
        ///   hot reload. This is what the project always did.
        /// - <b>Anything else</b>: serve the pre-built bundle from
        ///   <c>wwwroot/dist</c>. Previously this branch did not exist —
        ///   <c>UseSpaStaticFiles()</c> was never called, <c>wwwroot/dist</c> was never
        ///   produced, and the container answered every SPA route by trying to launch
        ///   `npm start` inside an image with no Node.js in it.
        /// </summary>
        public static void UseAngular(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Product images, served from wwwroot/images/products.
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(env.ContentRootPath, "wwwroot")
                ),
                RequestPath = "/wwwroot"
            });

            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = TimeSpan.FromSeconds(120);
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
