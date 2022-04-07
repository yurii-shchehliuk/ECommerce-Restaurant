using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace Domain.IRepositories
{


    public interface ICategoriesRepository //: IGenericRepository<Category>

    {
        Task<ActionResult> GetCategories();
        Task<ActionResult> GetItem(int id);
        Task<ActionResult> CreateItem(Category category);
        Task<ActionResult> Put(int id, Category category);
        Task<ActionResult> Delete(int id);
    }
}
