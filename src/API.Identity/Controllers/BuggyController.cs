using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Domain.Constants;
using WebApi.Domain.Core;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Entities.Identity.Enums;
using WebApi.Infrastructure.Controllers;

namespace API.Web.Controllers
{
    public class BuggyController : BaseApiController
    {
        #region access tests
        [HttpGet("AllAccess")]
        [AllowAnonymous]
        public ActionResult AllAccess()
        {
            return Ok();
        }

        [HttpGet("AuthorizedAccess")]
        [Authorize]
        public ActionResult AuthorizedAccess()
        {
            return Ok();
        }

        [HttpGet("UserAccess")]
        [Authorize(Roles = UserRole.User)]
        public ActionResult UserAccess()
        {
            return Ok();
        }

        [HttpGet("AdminAccess")]
        [Authorize(Roles = UserRole.Admin)]
        public ActionResult AdminAccess()
        {
            return Ok();
        }

        [HttpGet("User_Admin_Access")]
        [Authorize(Roles = $"{UserRole.User}, {UserRole.Admin}")]
        public ActionResult User_Admin_Access()
        {
            return Ok();
        }

        [HttpGet("PolicyAccess")]
        [Authorize(Policy = Policy.Admin)]
        public ActionResult PolicyAccess()
        {
            return Ok();
        }
        /// Accessible by Admin asuers with a particular claims (defined in policies)
        [HttpGet("Admin_CreateAccess")]
        [Authorize(Policy = Policy.Admin_CreateAccess)]
        public ActionResult Admin_CreateAccess()
        {
            return Ok();
        }

        [HttpGet("Admin_Create_Edit_DeleteAccess")]
        [Authorize(Policy = Policy.Admin_Create_Edit_DeleteAccess)]
        public ActionResult Admin_Create_Edit_DeleteAccess()
        {
            return Ok();
        }

        [HttpGet("Admin_Create_Edit_DeleteAccess_Or_SuperAdmin")]
        [Authorize(Policy = Policy.Admin_Create_Edit_DeleteAccess_Or_SuperAdmin)]
        public ActionResult Admin_Create_Edit_DeleteAccess_Or_SuperAdmin()
        {
            return Ok();
        }

        [HttpGet("OnlySuperAdminChecker")]
        [Authorize(Policy = Policy.OnlySuperAdminChecker)]
        public ActionResult OnlySuperAdminChecker()
        {
            return Ok();
        }
        #endregion

        #region request tests

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            return NotFound(Result<object>.Fail(404));
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(Result<object>.Fail(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
        #endregion
    }
}