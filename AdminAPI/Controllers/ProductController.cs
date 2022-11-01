using AdminAPI.Functions.ProductFunc.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AdminAPI.Controllers
{
    public class ProductController : BaseApiController
    {
        public ProductController()
        {
        }

        [HttpGet("id")]
        public async Task<IActionResult> Details(int id)
        {
            return Ok(await Mediator.Send(new GetProductByIdQuery { Id = id }));
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await Mediator.Send(new GetAllProductsQuery()));
        }

        [HttpPost]
        public ActionResult Create(IFormCollection collection)
        {
            return RedirectToAction(nameof(Index));
        }

        [HttpPut("id")]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            return null;
        }
        [HttpDelete("id")]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            return null;

        }
    }
}
