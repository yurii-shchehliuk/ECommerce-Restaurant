using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebApi.Domain.Specifications;

namespace WebApi.Domain.Interfaces.Repositories
{
    public interface IIdentityGenericRepository<T> : IGenericRepository<T> where T : class
    {
        Task<T> FindByIdAsync(string id);
        Task DeleteAsync(string id);
    }
}