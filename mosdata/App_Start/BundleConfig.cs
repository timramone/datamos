using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mosdata.App_Start
{
	using System.Web.Optimization;
	using System.Web.Optimization.React;

	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new JsxBundle("~/bundles/main")
				.Include("~/Scripts/JSX/Datasets.jsx"));
		}
	}
}