using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace AdminAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        public IMediator Mediator { get; set; }
        public BaseApiController()
        {

        }
    }
}