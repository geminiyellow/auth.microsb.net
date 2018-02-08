using Microsoft.AspNetCore.Mvc;

namespace Microsb.IdentityServer.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
