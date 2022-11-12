using System;
using System.Threading.Tasks;
using WebApi.Domain.Entities;

namespace WebApi.Domain.Interfaces.Repositories
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
        Task<int> Complete();
    }
}