using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Entities.Store;

namespace WebApi.Db.Identity.Configuration
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            //builder.ToTable("AspNetUsers");
            builder.Property(p => p.Id).IsRequired();
        }
    }
}