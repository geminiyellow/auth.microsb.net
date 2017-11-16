using System.Collections.Generic;
using IdentityServer4.Models;

namespace Microsb.IdentityServer.Configuration
{
    static class Configs
    {
        public static IEnumerable<IdentityResource> GetIdentityResources() => new List<IdentityResource>{
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiResource> GetApiResource() => new List<ApiResource>
        {
        };

        public static IEnumerable<Client> GetClients() => new List<Client>
        {
        };
    }
}
