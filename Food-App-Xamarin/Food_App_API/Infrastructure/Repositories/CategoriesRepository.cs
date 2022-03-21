using Domain.IRepositories;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        public Task CreateAsync(Category entity)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult> CreateItem(Category category)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<Category> GetAsync(string Id)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult> GetCategories()
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult> GetItem(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Category>> ListAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult> Put(int id, Category category)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(Category entity)
        {
            throw new NotImplementedException();
        }
    }
}
