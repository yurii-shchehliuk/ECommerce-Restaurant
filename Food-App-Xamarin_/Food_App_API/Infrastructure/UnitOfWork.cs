using Domain;
using Infrastructure.Persistance;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class UnitOfWork : BaseDbContext, IUnitOfWork
    {

        public UnitOfWork(FoodDbContext context) :base(context)
        {
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
        }
    }
}
