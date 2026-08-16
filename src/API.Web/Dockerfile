# API.Web — ASP.NET Core host that serves the Angular single-page app.
#
# Three stages: build the SPA with the Angular CLI, publish the .NET host, then
# assemble both into the runtime image, so the runtime image needs no Node.js.
#
# Build context is the repository root.

FROM node:18-alpine AS clientbuild
WORKDIR /client
# package.json and the lock file first, so `npm ci` is cached independently of source.
COPY ["src/API.Web/ClientApp/package.json", "src/API.Web/ClientApp/package-lock.json", "./"]
RUN npm ci --no-audit --no-fund
COPY ["src/API.Web/ClientApp/", "./"]
# The production configuration swaps src/environment.ts for src/environment.prod.ts,
# which points every API call at a gateway-relative path.
RUN npx ng build --configuration production

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/API.Web/API.Web.csproj", "src/API.Web/"]
COPY ["src/EventBus.Messages/EventBus.Messages.csproj", "src/EventBus.Messages/"]
COPY ["src/WebApi.Db.Identity/WebApi.Db.Identity.csproj", "src/WebApi.Db.Identity/"]
COPY ["src/WebApi.Domain/WebApi.Domain.csproj", "src/WebApi.Domain/"]
COPY ["src/WebApi.Db.Store/WebApi.Db.Store.csproj", "src/WebApi.Db.Store/"]
COPY ["src/WebApi.Infrastructure/WebApi.Infrastructure.csproj", "src/WebApi.Infrastructure/"]
RUN dotnet restore "src/API.Web/API.Web.csproj"
COPY . .
WORKDIR "/src/src/API.Web"
RUN dotnet build "API.Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.Web.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
# AddSpaStaticFiles(RootPath = "wwwroot/dist") resolves relative to the content root.
COPY --from=clientbuild /client/dist ./wwwroot/dist
EXPOSE 80
ENTRYPOINT ["dotnet", "API.Web.dll"]
