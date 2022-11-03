using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using WebApi.Domain.CQRS.CommandHandling;
using WebApi.Domain.CQRS.QueryHandling;

namespace API.Admin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        public IMediator Mediator;

        public BaseApiController() { }

        protected BaseApiController(IMediator mediator)
        {
            Mediator = mediator;
        }

        protected async new Task<IActionResult> Response<TResult>(IQuery<TResult> query)
        {
            TResult result = default!;

            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                result = await Mediator.Send(query);
            }
            catch (Exception e)
            {
                return BadRequestActionResult(e.Message);
            }

            return Ok(new
            {
                data = result,
                success = true
            });
        }

        protected async new Task<IActionResult> Response(ICommand command, object data = null)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                await Mediator.Send(command);
            }
            catch (Exception e)
            {
                return BadRequestActionResult(e.Message);
            }

            return Ok(new
            {
                data = data,
                success = true
            });
        }

        private IActionResult BadRequestActionResult(dynamic resultErrors)
        {
            return BadRequest(new
            {
                success = false,
                message = resultErrors
            });
        }
    }
}