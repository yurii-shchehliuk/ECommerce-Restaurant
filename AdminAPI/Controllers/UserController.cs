using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AdminAPI.Controllers
{
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
