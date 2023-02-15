using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Domain.Entities.Identity
{
    public static class ClasimStore
    {
        public static List<Claim> claimList = new List<Claim>
        {
            new Claim("Create", "Create"),
            new Claim("Edit", "Edit"),
            new Claim("Delete", "Delete"),
        };
    }
}
