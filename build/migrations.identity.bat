@echo off
:: Regenerates the identitydb migration from scratch. Only needed if you want to
:: collapse history; day to day you ADD a migration rather than replace one.
::
:: dotnet-ef is pinned in .config/dotnet-tools.json, so everyone runs the same
:: version. `dotnet tool restore` once per clone.
::
:: DOTNET_ROLL_FORWARD is needed only if you have a newer SDK but not the .NET 6
:: runtime; harmless otherwise.

cd /d "%~dp0.."
call dotnet tool restore || exit /b 1

set DOTNET_ROLL_FORWARD=LatestMajor

rmdir /S /Q "src\WebApi.Db.Identity\Migrations"

dotnet dotnet-ef migrations add InitialCreate ^
  --project src/WebApi.Db.Identity ^
  --startup-project src/WebApi.Db.Identity ^
  --context AppIdentityDbContext ^
  --output-dir Migrations || exit /b 1

:: Preview the SQL without touching a database:
::   dotnet dotnet-ef migrations script --project src/WebApi.Db.Identity --startup-project src/WebApi.Db.Identity --context AppIdentityDbContext --idempotent
::
:: The services apply migrations themselves at start-up (DatabaseInitializer), so
:: `database update` is not part of the normal flow.
