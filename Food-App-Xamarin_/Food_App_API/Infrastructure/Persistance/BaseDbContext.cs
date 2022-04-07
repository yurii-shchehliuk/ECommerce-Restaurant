using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistance
{
    public abstract class BaseDbContext
    {
        protected readonly FoodDbContext _context;

        public BaseDbContext(FoodDbContext context)
        {
            _context = context;
        }
    }
}
