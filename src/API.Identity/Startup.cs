using API.Identity.Functions.CommentFunc.Commands;
using API.Identity.SignalR;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApi.Infrastructure.StartupExtensions;
using WebApi.Infrastructure.StartupExtensions.Identity;

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
            services.AddMediatR(typeof(Startup));
            services.AddAutoMapper(typeof(Helpers.MappingProfiles));
            services.AddValidatorsFromAssemblyContaining<CommentCreate>();

            services.AddControllersExtension();
            //services.AddHttpContextAccessor();

            services.AddApplicationServices(_config);

            services.AddSwaggerDocumentation();
            services.AddCorsConfiguration();
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

            //app.UseHttpsRedirection();

            app.UseRouting();

            app.UserCorsConfiguration();

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
