using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace WebApi.Db.Store
{
    /// <summary>
    /// Lets <c>dotnet ef</c> build a <see cref="StoreContext"/> without booting an
    /// ASP.NET host.
    ///
    /// The old <c>build/migrations.store.bat</c> passed <c>--startup-project API.Identity</c>,
    /// which meant regenerating migrations required the whole web host — its
    /// configuration, its connection string, and the ASP.NET Core runtime — to be
    /// resolvable on the machine doing it. Migrations are a design-time concern of this
    /// project alone, so the factory lives here and the connection string is a
    /// placeholder: EF only needs the provider to work out what SQL to emit, and never
    /// opens this connection for `migrations add` or `migrations script`.
    /// </summary>
    public class StoreContextDesignTimeFactory : IDesignTimeDbContextFactory<StoreContext>
    {
        public StoreContext CreateDbContext(string[] args)
        {
            var options = new DbContextOptionsBuilder<StoreContext>()
                .UseSqlServer("Server=design-time;Database=appdb;Trusted_Connection=True;TrustServerCertificate=True")
                .Options;

            return new StoreContext(options);
        }
    }
}
