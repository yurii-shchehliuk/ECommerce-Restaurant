using MediatR;

namespace WebApi.Domain.CQRS.CommandHandling
{
    /// <summary>
    /// 
    /// </summary>
    /// <typeparam name="T">Command class prop</typeparam>
    public interface ICommandHandler<in T> : IRequestHandler<T>
        where T : ICommand
    { }

}