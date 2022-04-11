using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace FoodApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateHostBuilder(string[] args)
        {
            var host = WebHost.CreateDefaultBuilder(args)
                .UseSetting(WebHostDefaults.DetailedErrorsKey, "true")
                .UseStartup<Startup>();

            return host;
        }
    }
}
