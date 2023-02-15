using System.Collections.Generic;

namespace API.Identity.ViewModels
{
    public class UserClaimsVM
    {
        public UserClaimsVM()
        {
            Claims = new List<UserClaims>();
        }
        public int Id { get; set; }
        public List<UserClaims> Claims { get; set; }
    }

    public class UserClaims 
    {
        public string ClaimType { get; set; }
        public bool IsSelected { get; set; }
    }
}
