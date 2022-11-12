using Microsoft.Extensions.DependencyInjection;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Infrastructure.Repositories;

namespace WebApi.Infrastructure.StartupExtensions.Admin
{
    public static class AdminExtensions
    {
        #region service
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            //services.AddTransient<IProductRepository, ProductRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            return services;
        }
        #endregion
    }
}