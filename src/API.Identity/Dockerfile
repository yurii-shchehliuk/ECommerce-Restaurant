#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
#EXPOSE 80
#EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["src/API.Identity/API.Identity.csproj", "src/API.Identity/"]
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

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.Identity.dll"]