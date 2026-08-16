using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Threading.Tasks;
using WebApi.Db.Store;
using WebApi.Infrastructure.StartupExtensions;

namespace API.Basket
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
                var context = services.GetRequiredService<StoreContext>();

                try
                {
                    // API.Basket owns appdb's schema. API.Admin reads it and waits.
                    await DatabaseInitializer.MigrateWithRetryAsync(
                        context,
                        logger,
                        afterMigrate: () => StoreContextSeed.SeedAsync(context, loggerFactory));
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred migrating or seeding appdb");
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
                        .Enrich.WithProperty("Service", "API.Basket")
                        .WriteTo.Console()
                        .WriteTo.Seq(ctx.Configuration["Seq:ServerUrl"] ?? "http://owletseq");
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
