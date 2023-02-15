using API.Admin.Functions.ProductFunc.Commands;
using API.Admin.Functions.ProductFunc.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.DTOs;
using WebApi.Domain.Entities.Identity.Enums;
using WebApi.Domain.Entities.Store;
using WebApi.Infrastructure.Controllers;

namespace API.Admin.Controllers
{
    /// <summary>
    /// user's products management
    /// </summary>
    [Authorize(Roles = UserRole.User)]
    public class ProductController : BaseApiController
    {
        [HttpGet("id")]
        public async Task<ActionResult<Product>> Details(int id)
        {
            return await Mediator.Send(new GetProductByIdQuery { Id = id });
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetAll()
        {
            return await Mediator.Send(new GetAllProductsQuery());
        }

        [HttpPost]
        public async Task<IActionResult> Create(ProductCreateDto product)
        {
            return Ok(await Mediator.Send(new CreateProductCommand { Product = product }));
        }

        [HttpPut("id")]
        public async Task<IActionResult> Edit(int id, Product product)
        {
            product.Id = id;
            return Ok(await Mediator.Send(new UpdateProductCommand { Product = product }));
        }
        [HttpDelete("id")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteProductCommand { Id = id }));
        }
    }
}
