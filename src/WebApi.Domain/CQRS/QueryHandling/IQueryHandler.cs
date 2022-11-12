using MediatR;

namespace WebApi.Domain.CQRS.QueryHandling
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="TQuery">Query class</typeparam>
    /// <typeparam name="TResponse">Return type</typeparam>
    public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, TResponse>
        where TQuery : IQuery<TResponse>
    { }
}