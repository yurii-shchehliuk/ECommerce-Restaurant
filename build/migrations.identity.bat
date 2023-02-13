cd ../src/WebApi.Db.Identity
@RD /S /Q .\Migrations
dotnet ef migrations add init --verbose --project .\WebApi.Db.Identity.csproj --startup-project ..\API.Identity\API.Identity.csproj --context AppIdentityDbContext
dotnet ef database update --verbose --project .\WebApi.Db.Identity.csproj --startup-project ..\API.Identity\API.Identity.csproj --context AppIdentityDbContext
cd ..\..\build