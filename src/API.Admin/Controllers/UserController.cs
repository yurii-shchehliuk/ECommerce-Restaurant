using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using WebApi.Domain.Constants;
using WebApi.Infrastructure.Controllers;

namespace API.Admin.Controllers
{
    /// <summary>
    /// admin's user management
    /// </summary>
    [Authorize(Roles = UserRole.Super)]
    public class UserController : BaseApiController
    {
        public UserController()
        {

        }
        [HttpGet("id")]
        public ActionResult Details(int id)
        {
            return null;
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
