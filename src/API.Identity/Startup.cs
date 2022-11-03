using API.Identity.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApi.Db.Identity;
using WebApi.Infrastructure.IntegrationExtentions;
using WebApi.Infrastructure.IntegrationExtentions.Identity;
using WebApi.Infrastructure.IntegrationExtentions.Middleware;

namespace API.Identity
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
            services.AddDbContext<AppIdentityDbContext>(x =>
            {
                x.UseSqlServer(_config.GetConnectionString("IdentityConnection"));
            });

            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddControllers();
            services.AddHttpContextAccessor();

            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
            services.AddSwaggerDocumentation();

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("*").AllowCredentials();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var virtualPath = "/api";
            app.Map(virtualPath, builder =>
            {
                if (env.IsDevelopment())
                {
                    builder.UseDeveloperExceptionPage();
                    builder.UseSwaggerDocumention();
                }

                builder.ApplicationConfiguration();
                
                builder.UseStatusCodePagesWithReExecute("/errors/{0}");
                
                builder.UseHttpsRedirection();
                
                builder.UseRouting();
                
                builder.UseCors("CorsPolicy");
                
                builder.UseAuthentication();
                builder.UseAuthorization();
                
                builder.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });
            });
        }
    }
}