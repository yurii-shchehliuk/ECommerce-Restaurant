using MediatR;
using System.Threading.Tasks;
using WebApi.Domain.CQRS.CommandHandling;
using WebApi.Domain.CQRS.QueryHandling;

namespace WebApi.Domain.Core
{
    public interface IMediator
    {
        Task<Unit> Command<TCommand>(TCommand command) where TCommand : ICommand;

        TResponse Query<TResponse>(IQuery<TResponse> query);

        Task<TResponse> Query<TQuery, TResponse>(TQuery query) where TQuery : IQuery<TResponse>;
    }
}
