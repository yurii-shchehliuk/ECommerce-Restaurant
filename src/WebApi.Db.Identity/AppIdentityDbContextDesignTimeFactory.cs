using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace WebApi.Db.Identity
{
    /// <summary>
    /// Design-time factory for <see cref="AppIdentityDbContext"/>. See the equivalent
    /// in WebApi.Db.Store for why migrations are generated from the data project rather
    /// than through a web host.
    /// </summary>
    public class AppIdentityDbContextDesignTimeFactory : IDesignTimeDbContextFactory<AppIdentityDbContext>
    {
        public AppIdentityDbContext CreateDbContext(string[] args)
        {
            var options = new DbContextOptionsBuilder<AppIdentityDbContext>()
                .UseSqlServer("Server=design-time;Database=identitydb;Trusted_Connection=True;TrustServerCertificate=True")
                .Options;

            return new AppIdentityDbContext(options);
        }
    }
}
