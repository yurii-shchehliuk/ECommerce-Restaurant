using MediatR;
//using WebApi.Domain.Core.EventBus;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace WebApi.Domain.CQRS
{
    public static class ServicesExtensions
    {
        public static void ConfigureCQRS(this IServiceCollection services)
        {
            services.AddMediatR(AppDomain.CurrentDomain.GetAssemblies());
            //services.AddTransient<IDomainEventDispatcher, DomainEventDispatcher>();
        }
    }
}