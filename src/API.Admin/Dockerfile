# API.Admin — product administration (MediatR/CQRS) and consumer of OrderPlaced.
# Build context is the repository root.

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/API.Admin/API.Admin.csproj", "src/API.Admin/"]
COPY ["src/EventBus.Messages/EventBus.Messages.csproj", "src/EventBus.Messages/"]
COPY ["src/WebApi.Db.Identity/WebApi.Db.Identity.csproj", "src/WebApi.Db.Identity/"]
COPY ["src/WebApi.Domain/WebApi.Domain.csproj", "src/WebApi.Domain/"]
COPY ["src/WebApi.Db.Store/WebApi.Db.Store.csproj", "src/WebApi.Db.Store/"]
COPY ["src/WebApi.Infrastructure/WebApi.Infrastructure.csproj", "src/WebApi.Infrastructure/"]
RUN dotnet restore "src/API.Admin/API.Admin.csproj"
COPY . .
WORKDIR "/src/src/API.Admin"
RUN dotnet build "API.Admin.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.Admin.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "API.Admin.dll"]
