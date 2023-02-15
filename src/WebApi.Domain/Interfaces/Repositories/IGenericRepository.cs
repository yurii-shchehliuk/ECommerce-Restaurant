using System.Collections.Generic;
using System.Linq;
using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebApi.Domain.Specifications;

namespace WebApi.Domain.Interfaces.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        Task AddAsync(T entity);

        Task DeleteAsync(T entity);
        Task DeleteAsync(int id);

        Task<IReadOnlyList<T>> ListAllAsync();

        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);

        Task<T?> FindByIdAsync(int id);

        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, string include);

        IQueryable<T> FindBy(Expression<Func<T, bool>> predicate);

        Task UpdateAsync(T entity);

        Task<T> GetEntityWithSpec(ISpecification<T> spec);

        Task<int> CountAsync(ISpecification<T> spec);

    }
}