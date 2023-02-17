cd ../src/WebApi.Db.Store
 @RD /S /Q .\Migrations
dotnet ef migrations add init --verbose --project .\WebApi.Db.Store.csproj --startup-project ..\API.Identity\API.Identity.csproj --context StoreContext
dotnet ef database update --verbose --project .\WebApi.Db.Store.csproj --startup-project ..\API.Identity\API.Identity.csproj --context StoreContext
cd ..\..\build