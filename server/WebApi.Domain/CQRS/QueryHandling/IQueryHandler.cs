using MediatR;

namespace WebApi.Domain.CQRS.QueryHandling
{

    public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, TResponse>
        where TQuery : IQuery<TResponse>
    { }
}