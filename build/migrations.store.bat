@echo off
:: Regenerates the appdb migration from scratch. See migrations.identity.bat for
:: the notes that apply to both.

cd /d "%~dp0.."
call dotnet tool restore || exit /b 1

set DOTNET_ROLL_FORWARD=LatestMajor

rmdir /S /Q "src\WebApi.Db.Store\Migrations"

dotnet dotnet-ef migrations add InitialCreate ^
  --project src/WebApi.Db.Store ^
  --startup-project src/WebApi.Db.Store ^
  --context StoreContext ^
  --output-dir Migrations || exit /b 1
