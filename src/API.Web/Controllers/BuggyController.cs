using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Db.Store;
using WebApi.Domain.Core;

namespace API.Web.Controllers
{
    public class BuggyController : BaseApiController
    {
        public BuggyController(StoreContext context)
        {
        }

        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret stuff";
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            return NotFound(Result<object>.Fail("Not found"));
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(Result<object>.Fail("Bad request"));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}