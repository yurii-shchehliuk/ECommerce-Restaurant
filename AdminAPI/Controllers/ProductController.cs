using AdminAPI.Functions.ProductFunc.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdminAPI.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly IMediator _mediator;
        public ProductController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("id")]
        public async Task<IActionResult> Details(int id)
        {
            return Ok(await _mediator.Send(new GetProductByIdQuery { Id = id }));
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _mediator.Send(new GetAllProductsQuery()));
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
