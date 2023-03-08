using System.Collections.Generic;
using System.Security.Claims;
using WebApi.Domain.Entities.Identity;

namespace WebApi.Domain.Constants
{
    public static class Policy
    {
        public const string Admin = nameof(Policy.Admin);
        public const string Admin_CreateAccess = nameof(Policy.Admin_CreateAccess);
        public const string Admin_Create_Edit_DeleteAccess = nameof(Policy.Admin_Create_Edit_DeleteAccess);
        public const string Admin_Create_Edit_DeleteAccess_Or_SuperAdmin = nameof(Policy.Admin_Create_Edit_DeleteAccess_Or_SuperAdmin);
        public const string OnlySuperAdminChecker = nameof(Policy.OnlySuperAdminChecker);
    }

    public static class Claims
    {
        public const string Create = nameof(Claims.Create);
        public const string Edit = nameof(Claims.Edit);
        public const string Delete = nameof(Claims.Delete);
        // claim values
        public const string True = nameof(Claims.True);
        public const string False = nameof(Claims.False);
    }

    public static class ClaimsStore
    {
        public static List<Claim> claimList = new List<Claim>
        {
            new Claim(Claims.Create, Claims.True),
            new Claim(Claims.Edit, Claims.True),
            new Claim(Claims.Delete, Claims.True),
        };
    }

    public static class UserRole
    {
        public const string Admin = nameof(UserRoles.Admin);
        public const string User = nameof(UserRoles.User);
        public const string Super = nameof(UserRoles.Super);
    }
}
