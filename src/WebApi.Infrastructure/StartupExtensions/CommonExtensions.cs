using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using WebApi.Db.Identity;
using WebApi.Db.Store;
using WebApi.Infrastructure.Controllers;
using WebApi.Infrastructure.Helpers;

namespace WebApi.Infrastructure.StartupExtensions
{
    public static class CommonExtensions
    {
        private static readonly string AllCorsPolicy = nameof(AllCorsPolicy);
        private static readonly string CustomCorsPolicy = nameof(CustomCorsPolicy);
        public static IConfiguration SeedConfiguration(Microsoft.AspNetCore.Hosting.IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
               .SetBasePath(env.ContentRootPath)
               .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
               .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
               .AddEnvironmentVariables();
            return builder.Build();
        }

        #region service
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = System.Reflection.Assembly.GetEntryAssembly().GetName().Name, Version = "v1" });

                var securitySchema = new OpenApiSecurityScheme
                {
                    Description = "JWT Auth Bearer Scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };

                c.AddSecurityDefinition("Bearer", securitySchema);
                var securityRequirement = new OpenApiSecurityRequirement { { securitySchema, new[] { "Bearer" } } };
                c.AddSecurityRequirement(securityRequirement);
            });

            return services;
        }


        public static void AddAllCorsConfiguration(this IServiceCollection services)
        {
            services.AddCors(opt =>
            {
                opt.AddPolicy(AllCorsPolicy, policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("*");

                });
            });
        }
        public static void AddCorsConfiguration(this IServiceCollection services)
        {
            services.AddCors(opt =>
            {
                opt.AddPolicy(CustomCorsPolicy, policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:5021", "http://localhost:4200").AllowCredentials();

                });
            });
        }


        public static void AddStoreDb(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<StoreContext>(x =>
               x.UseSqlServer(config.GetConnectionString("DefaultConnection")));
        }
        public static void AddIdentityDb(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<AppIdentityDbContext>(x =>
               x.UseSqlServer(config.GetConnectionString("IdentityConnection")));
        }

        public static void AddControllersExtension(this IServiceCollection services)
        {
            services.AddControllers(o=>o.Conventions.Add(new ControllersNameConvention()));
        }
        #endregion

        #region application
        public static IApplicationBuilder UseSwaggerDocumention(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c
                .SwaggerEndpoint("/swagger/v1/swagger.json", $"{System.Reflection.Assembly.GetEntryAssembly().GetName().Name} v1");
            });

            return app;
        }

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

        public static void UserAllCorsConfiguration(this IApplicationBuilder app) => app.UseCors(AllCorsPolicy);
        public static void UserCorsConfiguration(this IApplicationBuilder app) => app.UseCors(CustomCorsPolicy);
        #endregion
    }
}