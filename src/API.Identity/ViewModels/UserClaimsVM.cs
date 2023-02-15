using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using WebApi.Domain.Constants;

namespace API.Identity.ViewModels
{
    public class UserClaimsVM
    {
        public string UserEmail { get; set; }
        public List<string> Claims2 { get; set; } = ClasimStore.claimList.Select(c=>c.Value).ToList();
    }

}
