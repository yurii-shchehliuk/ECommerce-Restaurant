using MediatR;

namespace WebApi.Domain.CQRS.CommandHandling
{
    public interface ICommandHandler<in T> : IRequestHandler<T>
        where T : ICommand
    { }

}
