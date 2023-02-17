using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Interfaces.Repositories;

namespace WebApi.Infrastructure.Controllers
{
    [ControllersNameConvention]
    public abstract class GenericController<T> : BaseApiController where T : class
    {
        protected IGenericRepository<T> _context;

        public GenericController(IGenericRepository<T> context)
        {
            _context = context;
        }

        [HttpGet]
        public virtual async Task<IEnumerable<T>> GetAll()
        {
            return await _context.ListAllAsync();
        }

        [HttpGet("{id}")]
        public virtual async Task<T> Get([FromQuery] int id)
        {
            return await _context.FindByIdAsync(id);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Post([FromBody] T record)
        {
            await _context.AddAsync(record);
            return Ok();
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Update(string id, [FromBody] T record)
        {
            await _context.Update(record);
            return Ok();
        }

        [HttpDelete("{id}")]
        public virtual async Task<IActionResult> Delete(int id)
        {
            await _context.DeleteAsync(id);
            return Ok();
        }
    }
}