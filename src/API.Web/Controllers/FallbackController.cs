using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace API.Web.Controllers
{
    public class FallbackController : Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/dist", "index.html"), "text/HTML");
        }
    }
}