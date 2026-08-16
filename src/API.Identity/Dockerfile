# API.Identity — registration, sign-in, JWT issuance. Owns identitydb's schema.
# Build context is the repository root.

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/API.Identity/API.Identity.csproj", "src/API.Identity/"]
COPY ["src/EventBus.Messages/EventBus.Messages.csproj", "src/EventBus.Messages/"]
COPY ["src/WebApi.Db.Identity/WebApi.Db.Identity.csproj", "src/WebApi.Db.Identity/"]
COPY ["src/WebApi.Domain/WebApi.Domain.csproj", "src/WebApi.Domain/"]
COPY ["src/WebApi.Infrastructure/WebApi.Infrastructure.csproj", "src/WebApi.Infrastructure/"]
COPY ["src/WebApi.Db.Store/WebApi.Db.Store.csproj", "src/WebApi.Db.Store/"]
RUN dotnet restore "src/API.Identity/API.Identity.csproj"
COPY . .
WORKDIR "/src/src/API.Identity"
RUN dotnet build "API.Identity.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.Identity.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "API.Identity.dll"]
