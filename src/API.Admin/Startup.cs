using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApi.Infrastructure.StartupExtensions;
using WebApi.Infrastructure.StartupExtensions.Admin;

namespace API.Admin
{
    public class Startup
    {
        private IConfiguration _config { get; }
        public Startup(IConfiguration configuration)
        {
            _config = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ///<todo>add dashboard</todo>
            //services.AddControllersWithViews(config =>
            //{
            //    var policy = new AuthorizationPolicyBuilder()
            //                     .RequireAuthenticatedUser()
            //                     .Build();
            //    config.Filters.Add(new AuthorizeFilter(policy));
            //});

            services.AddControllersExtension();
            services.AddCommonIdentity(_config);
            // Add assembly handlers
            services.AddMediatR(typeof(Startup));
            services.AddAutoMapper(typeof(Helpers.MappingProfiles));

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
            app.UseStaticFiles();

            app.UserAllCorsConfiguration();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
