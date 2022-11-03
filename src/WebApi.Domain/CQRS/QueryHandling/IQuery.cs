using MediatR;

namespace WebApi.Domain.CQRS.QueryHandling
{

    public interface IQuery<out TResponse> : IRequest<TResponse> { }
}