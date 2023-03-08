using Microsoft.AspNetCore.Identity;
using System;
using System.Runtime.CompilerServices;

namespace WebApi.Domain.Entities.Identity
{
    public class AppRole : IdentityRole<string>
    {
        public AppRole() : base()
        {
        }
        public AppRole(string roleName) : base(roleName)
        {
            this.Id = Guid.NewGuid().ToString();
        }
    }
}
