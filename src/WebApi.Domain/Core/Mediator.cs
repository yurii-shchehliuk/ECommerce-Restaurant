using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Domain.CQRS.CommandHandling;
using WebApi.Domain.CQRS.QueryHandling;

namespace WebApi.Domain.Core
{
    public class Mediator : IMediator
    {
        private readonly IDependencyResolver _dependencyResolver;

        public Mediator(IDependencyResolver dependencyResolver)
        {
            _dependencyResolver = dependencyResolver;
        }

        public Task<Unit> Command<TCommand>(TCommand command) where TCommand : ICommand
        {
            var handler = _dependencyResolver.ResolveOrDefault<ICommandHandler<TCommand>>();
            if (handler == null)
            {
                throw new InvalidOperationException($"Command of type '{command.GetType()}' has not registered handler.");
            }

            return handler.Handle(command, CancellationToken.None);
        }

        public TResponse Query<TResponse>(IQuery<TResponse> query)
        {
            return (TResponse)GetType()
                .GetMethods()
                .First(x => x.Name == "Query" && x.GetGenericArguments().Length == 2)
                .MakeGenericMethod(query.GetType(), typeof(TResponse))
                .Invoke(this, new object[] { query });
        }

        public Task<TResponse> Query<TQuery, TResponse>(TQuery query) where TQuery : IQuery<TResponse>
        {
            var handler = _dependencyResolver.ResolveOrDefault<IQueryHandler<TQuery, TResponse>>();
            if (handler == null)
            {
                throw new InvalidOperationException($"Query of type '{query.GetType()}' has not registered handler.");
            }

            return handler.Handle(query, CancellationToken.None);
        }
    }
}
