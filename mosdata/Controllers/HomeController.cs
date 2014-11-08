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
			var result = WebRequestProxy.Instance.GetResponse("v1/datasets", "$skip=10&$top=5&$inlinecount=allpages");

			return View((object)result);
		}

		public ActionResult Api(string path)
		{
			var result = WebRequestProxy.Instance.GetResponse(path, HttpContext.Request.QueryString.ToString());

			return Content(result);
		}
	}
}