using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebApi.Domain.Specifications;

namespace WebApi.Domain.Interfaces.Repositories
{
    public interface IIdentityGenericRepository<T> where T : class
    {
        Task<T> FindByIdAsync(string id);

        Task DeleteAsync(string id);

        Task AddAsync(T entity);

        Task DeleteAsync(T entity);

        Task<IReadOnlyList<T>> ListAllAsync();

        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);

        Task SaveChangesAsync();

        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, string include);

        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);

        Task Update(T entity);

        Task<T> GetEntityWithSpec(ISpecification<T> spec);

        Task<int> CountAsync(ISpecification<T> spec);
    }
}