using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using WebApi.Db.Identity.Configuration;
using WebApi.Domain.Entities.Identity;

namespace WebApi.Db.Identity
{
    public class AppIdentityDbContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
        {
        }
        public DbSet<AppRole> ApplicationRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            builder.ApplyConfiguration(new AppUserConfiguration());
            builder.ApplyConfiguration(new AppRoleConfiguration());
            base.OnModelCreating(builder);
        }
    }
}