using Newtonsoft.Json;

namespace Microsb.IdentityServer.Helpers
{
    public class WebpackOptions
    {
        [JsonProperty("main.css")]
        public string BundleCss { get; set; }

        [JsonProperty("main.js")]
        public string BundleJs { get; set; }

        [JsonProperty("polyfills.js")]
        public string Polyfills { get; set; }
    }
}
