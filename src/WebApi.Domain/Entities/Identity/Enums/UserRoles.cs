using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApi.Domain.Entities.Identity.Enums
{
    public enum UserRoles
    {
        Admin,
        User,
        Super
    }

    public static class UserRole
    {
        public const string Admin = nameof(UserRoles.Admin);
        public const string User = nameof(UserRoles.User);
        public const string Super = nameof(UserRoles.Super);
    }
}
