using Microsoft.AspNetCore.Identity;

namespace WebApi.Domain.Entities.Identity
{
    public class AppUser : IdentityUser
    {
        //public int Id { get ; set ; }
        public string DisplayName { get; set; }
        public bool IsAdmin { get; set; }
        public Address Address { get; set; }
    }
}