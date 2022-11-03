using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Domain.Entities.Identity;

namespace WebApi.Db.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@test.com",
                    UserName = "bob@test.com",
                    IsAdmin = true,
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Bobbity",
                        Street = "10 The Street",
                        City = "New York",
                        State = "NY",
                        Zipcode = "90210"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");

                user = new AppUser
                {
                    DisplayName = "Andrew",
                    Email = "Andrew@test.com",
                    UserName = "Andrew@test.com",
                    IsAdmin = false,
                    Address = new Address
                    {
                        FirstName = "Andrew",
                        LastName = "Andrew",
                        Street = "10 The Street",
                        City = "New York",
                        State = "NY",
                        Zipcode = "90210"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}