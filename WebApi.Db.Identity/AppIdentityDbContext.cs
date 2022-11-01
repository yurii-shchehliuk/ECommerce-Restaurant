using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApi.DB.Store.Configuration;
using WebApi.Domain.Entities.Identity;

namespace WebApi.Db.Identity
{
    public class AppIdentityDbContext : IdentityDbContext<AppUser>
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //builder.ApplyConfiguration(new AppUserConfiguration());
        }
        //add-migration add IdentityInitial -p WebApi.Db.Identity -s IdentityAPI -c AppIdentityDbContext -o Identity/Migrations
    }
}