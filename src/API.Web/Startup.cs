using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApi.Infrastructure.StartupExtensions;
using WebApi.Infrastructure.StartupExtensions.ApiWeb;

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
            services.AddControllersExtension();

            // API.Web used to call UseAuthentication()/UseAuthorization() without ever
            // registering an authentication scheme, and carried a Token configuration
            // section that nothing read. That is not a vulnerability — with no scheme
            // registered nothing was protected in the first place — but it is dead
            // pipeline that reads like working security. It now registers the same
            // JwtBearer validation as Basket and Admin, against the same key and
            // issuer, so [Authorize] here means what it means everywhere else.
            services.AddCommonIdentity(_config);

            services.AddApplicationServices(_config);
            services.AddSwaggerDocumentation();
            services.AddAllCorsConfiguration();
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

            app.UserAllCorsConfiguration();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                // Unmatched /api/* requests get an explicit 404 from the API rather than
                // the SPA's index.html, which would otherwise be returned with a 200 and
                // look to a client like a successful call returning HTML.
                // (The action this used to point at, SpaFallback, was commented out.)
                endpoints.MapControllerRoute(
                        name: "apiFallback",
                        pattern: "api/{*endpointName}",
                        defaults: new { controller = "Fallback", action = "ApiNotFoundFallback" });
            });

            // Must run after UseEndpoints so that a request which matched a controller
            // is not rewritten to index.html. Everything else falls through to the SPA:
            // the Angular CLI dev server in Development, the built bundle otherwise.
            app.UseAngular(env);
        }
    }
}
