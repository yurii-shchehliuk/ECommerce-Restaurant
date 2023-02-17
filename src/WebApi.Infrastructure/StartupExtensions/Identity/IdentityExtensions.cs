using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.Threading.Tasks;
using WebApi.Db.Identity;
using WebApi.Domain.Constants;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Entities.Identity.Enums;
using WebApi.Domain.Interfaces.Services;
using WebApi.Infrastructure.Services;

namespace WebApi.Infrastructure.StartupExtensions.Identity
{
    public static class IdentityExtensions
    {
        #region service
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            ///<todo>separate database for comments</todo>
            services.AddIdentityDb(config);
            services.AddStoreDb(config);

            services.AddScoped<ITokenService, TokenService>();
            services.AddTransient<IEmailSender>(s => new EmailSender(config));

            services.AddSignalR(hubOptions =>
            {
                hubOptions.EnableDetailedErrors = true;
                hubOptions.KeepAliveInterval = System.TimeSpan.FromMinutes(5);
            });
        }

        public static void AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            var builder = services.AddIdentityCore<AppUser>(c =>
            {
                c.SignIn.RequireConfirmedAccount = true;

            })
              .AddRoles<AppRole>()
              .AddEntityFrameworkStores<AppIdentityDbContext>()
              .AddRoleManager<RoleManager<AppRole>>()
              .AddSignInManager<SignInManager<AppUser>>()
              .AddTokenProvider<DataProtectorTokenProvider<AppUser>>(TokenOptions.DefaultProvider);

            //builder = new IdentityBuilder(builder.UserType, builder.Services);
            //builder.AddEntityFrameworkStores<AppIdentityDbContext>();
            //builder.AddSignInManager<SignInManager<AppUser>>();
            //builder.AddRoles<AppRole>();
            //builder.AddRoleManager<RoleManager<AppRole>>();

            services.Configure<IdentityOptions>(o =>
            {
                o.Password = new PasswordOptions { RequireDigit = false, RequiredLength = 8 };
                o.Lockout = new LockoutOptions { DefaultLockoutTimeSpan = TimeSpan.FromSeconds(30), MaxFailedAccessAttempts = 5 };
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
                    ValidIssuer = config["Token:Issuer"],
                    ValidateIssuer = true,
                    ValidateAudience = false
                };

                // authenticating to SignalR
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("chatsocket")))
                        {
                            context.Token = accessToken;
                        }

                        return Task.CompletedTask;
                    }
                };
            }); //.AddFacebook(o=>o{});

            services.AddAuthorization(o =>
            {
                o.AddPolicy(Policy.Admin, policy => policy.RequireRole(UserRole.Admin));
                o.AddPolicy(Policy.Admin_CreateAccess, policy => policy.RequireRole(UserRole.Admin).RequireClaim(Claims.Create, Claims.True));
                o.AddPolicy(Policy.Admin_Create_Edit_DeleteAccess, policy => policy.RequireRole(UserRole.Admin)
                    .RequireClaim(Claims.Create, Claims.True).RequireClaim(Claims.Edit, Claims.True).RequireClaim(Claims.Delete, Claims.True));
                o.AddPolicy(Policy.Admin_Create_Edit_DeleteAccess_Or_SuperAdmin, policy => policy.RequireAssertion(context => (
                    context.User.IsInRole(UserRole.Admin) && context.User.HasClaim(c => c.Type == Claims.Create && c.Value == Claims.True)
                        && context.User.HasClaim(c => c.Type == Claims.Edit && c.Value == Claims.True)
                        && context.User.HasClaim(c => c.Type == Claims.Delete && c.Value == Claims.True)
                    ) || context.User.IsInRole(UserRole.Super)
                ));
                o.AddPolicy(Policy.OnlySuperAdminChecker, policy => policy.Requirements.Add(new OnlySuperAdminChecker()));

            });

            //services.ConfigureApplicationCookie(o =>
            //{
            //    o.AccessDeniedPath= "/";
            //});
        }
        #endregion
    }
}