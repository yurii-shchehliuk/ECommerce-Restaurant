namespace WebApi.Domain.Core
{
    public interface IDependencyResolver
    {
        T ResolveOrDefault<T>() where T : class;
    }
}
