using MediatR;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Domain.Interfaces;
using WebApi.Infrastructure.Repositories;

namespace WebApi.Infrastructure.Integration.Admin
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

            return services;
        }
    }
}