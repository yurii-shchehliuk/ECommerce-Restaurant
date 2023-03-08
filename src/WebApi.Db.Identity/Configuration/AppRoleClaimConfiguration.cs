using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebApi.Domain.Entities.Identity;

namespace WebApi.Db.Identity.Configuration
{
    public class AppRoleClaimConfiguration : IEntityTypeConfiguration<AppRoleClaim>
    {
        public void Configure(EntityTypeBuilder<AppRoleClaim> builder)
        {
            builder.ToTable("AspNetRoleClaims");
            //builder.HasKey(p => p.Id);// Property(p => p.Id).HasKe();
        }
    }
}