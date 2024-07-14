using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Tesis.Controllers
{
    public class CasasController : Controller
    {
        // GET: Casas
        public ActionResult Index()
        {
            string url = "~/Views/Casas/Default.cshtml";
            return View(url);
        }
    }
}