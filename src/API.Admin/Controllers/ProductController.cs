using API.Admin.Functions.ProductFunc.Commands;
using API.Admin.Functions.ProductFunc.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.Constants;
using WebApi.Domain.DTOs;
using WebApi.Domain.Entities.Store;
using WebApi.Infrastructure.Controllers;

namespace API.Admin.Controllers
{
    /// <summary>
    /// Catalogue administration over MediatR/CQRS.
    ///
    /// Reads need a validated token; the three writes need the Admin role, because they
    /// change what every buyer sees and there is no per-user catalogue.
    /// </summary>
    [Authorize]
    public class ProductController : BaseApiControllerV1
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
        [Authorize(Roles = UserRole.Admin)]
        public async Task<IActionResult> Create(ProductCreateDto product)
        {
            return Ok(await Mediator.Send(new CreateProductCommand { Product = product }));
        }

        [HttpPut("id")]
        [Authorize(Roles = UserRole.Admin)]
        public async Task<IActionResult> Edit(int id, Product product)
        {
            product.Id = id;
            return Ok(await Mediator.Send(new UpdateProductCommand { Product = product }));
        }
        [HttpDelete("id")]
        [Authorize(Roles = UserRole.Admin)]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await Mediator.Send(new DeleteProductCommand { Id = id }));
        }
    }
}
