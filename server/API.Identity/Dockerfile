#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 5030

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["API.Identity/API.Identity.csproj", "API.Identity/"]
COPY ["WebApi.Db.Identity/WebApi.Db.Identity.csproj", "WebApi.Db.Identity/"]
COPY ["WebApi.Domain/WebApi.Domain.csproj", "WebApi.Domain/"]
COPY ["WebApi.Infrastructure/WebApi.Infrastructure.csproj", "WebApi.Infrastructure/"]
COPY ["WebApi.Db.Store/WebApi.Db.Store.csproj", "WebApi.Db.Store/"]
RUN dotnet restore "API.Identity/API.Identity.csproj"
COPY . .
WORKDIR "/src/API.Identity"
RUN dotnet build "API.Identity.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.Identity.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.Identity.dll"]