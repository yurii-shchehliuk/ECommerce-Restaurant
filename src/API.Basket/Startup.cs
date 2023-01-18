using API.Basket.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;
using WebApi.Db.Store;using WebApi.Infrastructure.StartupExtensions;
using WebApi.Infrastructure.StartupExtensions.Basket;

namespace API.Basket
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
            services.AddDbContext<StoreContext>(x =>
                x.UseSqlServer(_config.GetConnectionString("DefaultConnection")));

            services.AddAutoMapper(typeof(MappingProfiles));

            services.AddServicesConfiguration();
            services.AddControllers();

            services.AddApplicationServices(_config);
            services.AddSwaggerDocumentation();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //var virtualPath = "/api";
            //app.Map(virtualPath, builder =>
            //{

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwaggerDocumention();
            }

            app.ApplicationConfiguration();
            app.UseStatusCodePagesWithReExecute("/errors/{0}");

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                //endpoints.MapFallbackToController("Index", "Fallback");
            });            //});
        }
    }
}
