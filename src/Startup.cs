using System;
using System.IO;
using Microsb.IdentityServer.Configuration;
using Microsb.IdentityServer.Helpers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Microsb.IdentityServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;

            using (var f = File.Open(Path.Combine(env.ContentRootPath, "wwwroot", "dist", "manifest.json"), FileMode.Open))
            using (var reader = new StreamReader(f))
            {
                WebpackConfiguration = JsonConvert.DeserializeObject<WebpackOptions>(reader.ReadToEnd());
                Console.WriteLine(WebpackConfiguration);
            }
        }

        public WebpackOptions WebpackConfiguration { get; }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddMvc();

            // ==== IdentityServer4 ====
            services
                .AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(Configs.GetIdentityResources())
                .AddInMemoryApiResources(Configs.GetApiResource())
                .AddInMemoryClients(Configs.GetClients())
                ;

            // ==== Webpack bundles ====
            services.AddSingleton(WebpackConfiguration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // ==== IdentityServer4 ====
            app.UseIdentityServer();

            app.UseStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute("default", "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
