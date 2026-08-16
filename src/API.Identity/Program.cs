using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Threading.Tasks;
using WebApi.Db.Identity;
using WebApi.Infrastructure.StartupExtensions;

namespace API.Identity
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var loggerFactory = services.GetRequiredService<ILoggerFactory>();
                var logger = loggerFactory.CreateLogger<Program>();
                var context = services.GetRequiredService<AppIdentityDbContext>();

                try
                {
                    // API.Identity owns identitydb's schema and nothing else touches it.
                    await DatabaseInitializer.MigrateWithRetryAsync(
                        context,
                        logger,
                        afterMigrate: () => AppIdentityDbContextSeed.SeedIdentityAsync(services));
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred migrating or seeding identitydb");
                }
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseSerilog((ctx, provider, loggerConfig) =>
                {
                    loggerConfig
                        .ReadFrom.Configuration(ctx.Configuration)
                        .Enrich.FromLogContext()
                        .Enrich.WithProperty("Service", "API.Identity")
                        .WriteTo.Console()
                        .WriteTo.Seq(ctx.Configuration["Seq:ServerUrl"] ?? "http://owletseq");
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
