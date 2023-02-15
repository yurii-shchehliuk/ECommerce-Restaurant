using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Entities.Identity.Enums;

namespace WebApi.Db.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedIdentityAsync(IServiceProvider services)
        {
            await SeedRoles(services.GetRequiredService<RoleManager<AppRole>>());
            await SeedUsersAsync(services.GetRequiredService<UserManager<AppUser>>());
        }

        private static async Task SeedUsersAsync(UserManager<AppUser> userManager)
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
                await userManager.AddToRoleAsync(user, UserRole.Admin);

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
                await userManager.AddToRoleAsync(user, UserRole.User);
            }
        }

        private static async Task SeedRoles(RoleManager<AppRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync(UserRole.Admin))
            {
                await roleManager.CreateAsync(new AppRole(UserRole.Admin));
                await roleManager.CreateAsync(new AppRole(UserRole.User));
                await roleManager.CreateAsync(new AppRole(UserRole.Super));
            }
        }
    }
}