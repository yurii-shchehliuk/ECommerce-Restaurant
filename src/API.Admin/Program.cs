using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Threading.Tasks;
using WebApi.Db.Store;
using WebApi.Infrastructure.StartupExtensions;

namespace API.Admin
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILoggerFactory>().CreateLogger<Program>();
                var context = services.GetRequiredService<StoreContext>();

                try
                {
                    // Admin reads appdb but does not own it — API.Basket applies the
                    // migrations. Two services racing to migrate the same database is
                    // how you get a half-created schema, so this only waits.
                    await DatabaseInitializer.WaitForAsync(context, logger);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "An error occurred waiting for appdb");
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
                        .Enrich.WithProperty("Service", "API.Admin")
                        .WriteTo.Console()
                        .WriteTo.Seq(ctx.Configuration["Seq:ServerUrl"] ?? "http://owletseq");
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
