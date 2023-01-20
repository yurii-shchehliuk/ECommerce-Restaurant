#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
#EXPOSE 80
#EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["API.Basket/API.Basket.csproj", "API.Basket/"]
COPY ["WebApi.Db.Identity/WebApi.Db.Identity.csproj", "WebApi.Db.Identity/"]
COPY ["WebApi.Domain/WebApi.Domain.csproj", "WebApi.Domain/"]
COPY ["WebApi.Db.Store/WebApi.Db.Store.csproj", "WebApi.Db.Store/"]
COPY ["WebApi.Infrastructure/WebApi.Infrastructure.csproj", "WebApi.Infrastructure/"]
COPY ["EventBus.Messages/EventBus.Messages.csproj", "EventBus.Messages/"]
RUN dotnet restore "API.Basket/API.Basket.csproj"
COPY . .
WORKDIR "/src/API.Basket"
RUN dotnet build "API.Basket.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.Basket.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.Basket.dll"]