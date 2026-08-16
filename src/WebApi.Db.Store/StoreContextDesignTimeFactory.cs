using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace WebApi.Db.Store
{
    /// <summary>
    /// Lets <c>dotnet ef</c> build a <see cref="StoreContext"/> without booting an
    /// ASP.NET host.
    ///
    /// Migrations are a design-time concern of this project alone, so the factory
    /// lives here and regenerating one needs no startup project: no web host
    /// configuration, no real connection string, and no ASP.NET Core runtime to
    /// resolve on the machine doing it. The connection string below is a placeholder,
    /// because EF needs the provider only to work out what SQL to emit and never opens
    /// this connection for <c>migrations add</c> or <c>migrations script</c>.
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
