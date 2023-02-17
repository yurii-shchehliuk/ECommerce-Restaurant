using Microsoft.AspNetCore.Mvc;
using WebApi.Domain.Core;
using WebApi.Infrastructure.Controllers;

namespace API.Web.Controllers
{
    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseApiController
    {
        public IActionResult Error(int code)
        {
            return new ObjectResult(Result<object>.Fail(code));
        }
    }
}