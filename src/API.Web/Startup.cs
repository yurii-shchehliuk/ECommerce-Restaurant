using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using System.IO;
using WebApi.Infrastructure.SignalR;
using WebApi.Infrastructure.StartupExtensions;

namespace API.Web
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "wwwroot/dist";
            });

            services.AddSignalR(hubOptions =>
            {

                hubOptions.EnableDetailedErrors = true;
                hubOptions.KeepAliveInterval = System.TimeSpan.FromMinutes(1);
            });

            services.AddSwaggerDocumentation();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwaggerDocumention();
            }

            app.ApplicationConfiguration();

            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            app.UseRouting();

            //app.UseStaticFiles(new StaticFileOptions
            //{
            //    FileProvider = new PhysicalFileProvider(
            //        Path.Combine(Directory.GetCurrentDirectory(), "Content")
            //    ),
            //    RequestPath = "/content"
            //});

            app.UseSpa(spa =>
            {
                //path to the angular application
                spa.Options.SourcePath = "wwwroot";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                    //spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");

                }
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chatsocket");
                //endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
