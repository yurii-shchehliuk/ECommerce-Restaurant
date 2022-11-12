using Autofac;
using WebApi.Domain.Core;
using WebApi.Domain.CQRS.CommandHandling;
using WebApi.Domain.CQRS.QueryHandling;

namespace WebApi.Infrastructure.Core
{
    public static class MediatorConfiguration
    {
        public static void ConfigureMediator(this ContainerBuilder containerBuilder)
        {
            containerBuilder.RegisterType<Mediator>().As<IMediator>().InstancePerLifetimeScope();

            containerBuilder
                .Register(factory =>
                {
                    var lifetimeScope = factory.Resolve<ILifetimeScope>();
                    return new AutofacDependencyResolver(lifetimeScope.BeginLifetimeScope());
                })
                .As<IDependencyResolver>()
                .InstancePerLifetimeScope();

            var handlersAssembly = typeof(ICommandHandler<>).Assembly;

            containerBuilder
                .RegisterAssemblyTypes(handlersAssembly)
                .AsClosedTypesOf(typeof(ICommandHandler<>))
                .InstancePerLifetimeScope();

            containerBuilder
                .RegisterAssemblyTypes(handlersAssembly)
                .AsClosedTypesOf(typeof(IQueryHandler<,>))
                .InstancePerLifetimeScope();
        }
    }
}
