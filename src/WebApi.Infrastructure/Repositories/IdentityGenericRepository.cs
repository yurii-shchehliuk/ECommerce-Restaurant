using Microsoft.EntityFrameworkCore;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Db.Identity;
using WebApi.Domain.Interfaces.Repositories;
using WebApi.Domain.Specifications;

namespace WebApi.Infrastructure.Repositories
{
    public class IdentityGenericRepository<T> : IIdentityGenericRepository<T> where T : class
    {
        private readonly AppIdentityDbContext _context;
        public IdentityGenericRepository(AppIdentityDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(GenericExtensions.RemoveId<T>(entity));
        }
        public async Task DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await Task.CompletedTask.WaitAsync(CancellationToken.None);
        }
        public async Task DeleteAsync(string id)
        {
            await DeleteAsync(await FindByIdAsync(id));
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }
        public async Task<T> FindByIdAsync(string id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return _context.Set<T>().Where(predicate);
        }
        public IQueryable<T> FindBy(Expression<Func<T, bool>> predicate, string include)
        {
            return FindBy(predicate).Include(include);

        }
        public async Task Update(T entity)
        {
            try
            {
                _context.Set<T>().Attach(entity);
                _context.Entry(entity).State = EntityState.Modified;
                await Task.CompletedTask.WaitAsync(CancellationToken.None);
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Updating error");
                throw;
            }
        }

        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        public void Dispose()
        {
        }
    }
}