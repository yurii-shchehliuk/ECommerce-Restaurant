using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi.Domain.Entities.Identity;

namespace WebApi.Db.Identity.Configuration
{
    public class AppRoleConfiguration : IEntityTypeConfiguration<AppRole>
    {
        public void Configure(EntityTypeBuilder<AppRole> builder)
        {
            builder.ToTable("AspNetRoles");
            builder.HasKey(p=>p.Id);// Property(p => p.Id).HasKe();
        }
    }
}