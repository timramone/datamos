using mosdata.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace mosdata.Controllers
{
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
		}

		public ActionResult Api(string path)
		{
			var result = WebRequestProxy.Instance.GetResponse(path, HttpContext.Request.QueryString.ToString());

			return Content(result);
		}
	}
}