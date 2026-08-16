using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace WebApi.Infrastructure.StartupExtensions
{
    /// <summary>
    /// Applies migrations at start-up, with retries.
    ///
    /// Two problems this solves, both of which used to bite on every cold
    /// <c>docker compose up</c>:
    ///
    /// 1. The services used to call <c>EnsureCreatedAsync()</c> *and*
    ///    <c>MigrateAsync()</c>. Those are mutually exclusive strategies —
    ///    <c>EnsureCreated</c> builds the schema from the model and writes no
    ///    <c>__EFMigrationsHistory</c>, so the subsequent <c>Migrate</c> then tries to
    ///    create tables that already exist. With migrations now committed, migrating is
    ///    the only strategy, and an existing database has an upgrade path.
    ///
    /// 2. <c>depends_on</c> in Compose orders container *start*, not readiness. SQL
    ///    Server takes tens of seconds to accept connections on a cold volume, so the
    ///    first migration attempt lost the race and the service came up with no schema.
    ///    Compose health checks fix most of it; this retry loop covers the rest, and
    ///    covers the non-Docker path where there is no health check at all.
    /// </summary>
    public static class DatabaseInitializer
    {
        public static async Task MigrateWithRetryAsync<TContext>(
            TContext context,
            ILogger logger,
            int attempts = 12,
            TimeSpan? delay = null,
            Func<Task> afterMigrate = null)
            where TContext : DbContext
        {
            var wait = delay ?? TimeSpan.FromSeconds(5);

            for (var attempt = 1; attempt <= attempts; attempt++)
            {
                try
                {
                    await context.Database.MigrateAsync();

                    logger.LogInformation("{Context} migrated on attempt {Attempt}", typeof(TContext).Name, attempt);

                    if (afterMigrate != null) await afterMigrate();

                    return;
                }
                catch (Exception ex) when (attempt < attempts)
                {
                    logger.LogWarning(
                        "{Context} not ready on attempt {Attempt}/{Attempts}: {Message}. Retrying in {Delay}s.",
                        typeof(TContext).Name, attempt, attempts, ex.Message, wait.TotalSeconds);

                    await Task.Delay(wait);
                }
            }

            // Last attempt outside the catch, so a genuine failure throws with its own
            // stack rather than being reported as a timeout.
            await context.Database.MigrateAsync();
            if (afterMigrate != null) await afterMigrate();
        }

        /// <summary>
        /// Waits for a database another service owns. API.Admin reads and writes
        /// <c>appdb</c> but API.Basket migrates it; two services racing to apply the
        /// same migrations is how you get a half-created schema.
        /// </summary>
        public static async Task WaitForAsync<TContext>(
            TContext context,
            ILogger logger,
            int attempts = 24,
            TimeSpan? delay = null)
            where TContext : DbContext
        {
            var wait = delay ?? TimeSpan.FromSeconds(5);

            for (var attempt = 1; attempt <= attempts; attempt++)
            {
                try
                {
                    if (await context.Database.CanConnectAsync())
                    {
                        logger.LogInformation("{Context} reachable on attempt {Attempt}", typeof(TContext).Name, attempt);
                        return;
                    }
                }
                catch (Exception ex)
                {
                    logger.LogDebug("{Context} not reachable yet: {Message}", typeof(TContext).Name, ex.Message);
                }

                await Task.Delay(wait);
            }

            logger.LogWarning(
                "{Context} was still unreachable after {Attempts} attempts; starting anyway. " +
                "Messages will be retried by the bus until it appears.",
                typeof(TContext).Name, attempts);
        }
    }
}
