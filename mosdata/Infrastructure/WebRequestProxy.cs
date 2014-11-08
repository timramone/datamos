using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace mosdata.Infrastructure
{
	public class WebRequestProxy
	{
		#region Singleton impl

		public static readonly WebRequestProxy Instance;

		static WebRequestProxy()
		{
			Instance = new WebRequestProxy();
		}

		#endregion

		private const string baseUrlKey = "BaseApiUrl";
		private readonly string baseUrl;

		private WebRequestProxy()
		{
			baseUrl = System.Configuration.ConfigurationManager.AppSettings[baseUrlKey];
		}
		
		public string GetResponse(string path, string query)
		{
			var uriBuilder = new UriBuilder();
			uriBuilder.Host = baseUrl;
			uriBuilder.Path = path;
			uriBuilder.Query = HttpUtility.UrlDecode(query);

			var client = new WebClient();
			client.Encoding = Encoding.UTF8;

			try
			{
				return client.DownloadString(uriBuilder.Uri);
			}
			catch (WebException ex)
			{
				throw new HttpException(404, "Что-то пошло не так");
			}
		}
	}
}