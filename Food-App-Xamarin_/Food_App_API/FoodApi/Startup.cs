using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Helpers;
using Domain;
using Domain.IRepositories;
using Infrastructure;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace FoodApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(MappingProfiles));

            services.AddCors(opt =>
            {
                opt.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            services.AddControllers();
            services.AddMvc(option => option.EnableEndpointRouting = false)
           .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
           .AddNewtonsoftJson(opt => opt.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidateIssuer = true,
                       ValidateAudience = true,
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = true,
                       ValidIssuer = Configuration["Tokens:Issuer"],
                       ValidAudience = Configuration["Tokens:Issuer"],
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"])),
                       ClockSkew = TimeSpan.Zero,
                   };
               });
            services.AddDbContext<FoodDbContext>(option => option.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddSwaggerGen();

            services.AddHttpClient<IUnitOfWork, UnitOfWork>();
            services.AddHttpClient<ICategoriesRepository, CategoriesRepository>();
            services.AddHttpClient<IAccountsRepository, AccountsRepository>();
            services.AddHttpClient<IOrdersRepository, OrdersRepository>();
            services.AddHttpClient<IProductsRepository, ProductsRepository>();
            services.AddHttpClient<IShoppingCartItemsRepository, ShoppingCartItemsRepository>();
        }

        // This method gets called by the runtime. Use this method to confi gure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, FoodDbContext foodDbContext)
        {
            if (env.IsDevelopment())
            {
            }
            app.UseDeveloperExceptionPage();
            app.UseSwagger(c =>
            {
                c.SerializeAsV2 = true;
            });
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                c.RoutePrefix = string.Empty;
            });
            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();
            foodDbContext.Database.EnsureCreated();



            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
