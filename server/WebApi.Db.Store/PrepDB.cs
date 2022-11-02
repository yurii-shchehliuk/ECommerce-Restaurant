using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace WebApi.Db.Store
{
    /// <summary>
    /// prepare database for docker
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public static class PrepDB<T> where T : DbContext
    {
        public static void PrepPopulation(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<T>());
            }
        }

        private static void SeedData(T context)
        {
            Console.WriteLine("Applying migrations");
            try
            {
                context.Database.Migrate();
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("migrations error:" + ex.Message);
                Console.ResetColor();
                throw;
            }
        }
    }
}
