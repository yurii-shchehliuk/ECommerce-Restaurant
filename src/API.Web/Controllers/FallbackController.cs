using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Text.RegularExpressions;

namespace API.Web.Controllers
{
    /// <summary>
    /// "Fallback"
    /// </summary>
    public class FallbackController : Controller
    {
        private readonly IWebHostEnvironment env;

        public FallbackController()
        {

        }
        public FallbackController(IWebHostEnvironment env)
        {
            this.env = env;
        }
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/dist", "index.html"), "text/HTML");
        }

        [Authorize]
        public IActionResult SpaFallback()
        {
            var fileInfo = env.ContentRootFileProvider.GetFileInfo("ClientApp/dist/index.html");
            using (var reader = new StreamReader(fileInfo.CreateReadStream()))
            {
                var fileContent = reader.ReadToEnd();
                var basePath = !string.IsNullOrWhiteSpace(Url.Content("~")) ? Url.Content("~") + "/" : "/";

                //Note: basePath needs to match request path, because cookie.path is case sensitive
                fileContent = Regex.Replace(fileContent, "<base.*", $"<base href=\"{basePath}\">");
                return Content(fileContent, "text/html");
            }
        }
    }
}