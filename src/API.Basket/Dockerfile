# API.Basket — basket, payments, order creation, publisher of OrderPlaced.
# Build context is the repository root.
#
# The COPY paths here used to be missing their `src/` prefix, so the restore layer
# never resolved and the whole restore fell back to the `COPY . .` below — slow, and
# silently wrong the moment a csproj changed.

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/API.Basket/API.Basket.csproj", "src/API.Basket/"]
COPY ["src/EventBus.Messages/EventBus.Messages.csproj", "src/EventBus.Messages/"]
COPY ["src/WebApi.Db.Identity/WebApi.Db.Identity.csproj", "src/WebApi.Db.Identity/"]
COPY ["src/WebApi.Domain/WebApi.Domain.csproj", "src/WebApi.Domain/"]
COPY ["src/WebApi.Db.Store/WebApi.Db.Store.csproj", "src/WebApi.Db.Store/"]
COPY ["src/WebApi.Infrastructure/WebApi.Infrastructure.csproj", "src/WebApi.Infrastructure/"]
RUN dotnet restore "src/API.Basket/API.Basket.csproj"
COPY . .
WORKDIR "/src/src/API.Basket"
RUN dotnet build "API.Basket.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.Basket.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80
ENTRYPOINT ["dotnet", "API.Basket.dll"]
