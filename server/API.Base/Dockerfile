#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["API.Base/API.Base.csproj", "API.Base/"]
COPY ["WebApi.Db.Identity/WebApi.Db.Identity.csproj", "WebApi.Db.Identity/"]
COPY ["WebApi.Domain/WebApi.Domain.csproj", "WebApi.Domain/"]
COPY ["WebApi.Db.Store/WebApi.Db.Store.csproj", "WebApi.Db.Store/"]
COPY ["WebApi.Infrastructure/WebApi.Infrastructure.csproj", "WebApi.Infrastructure/"]
RUN dotnet restore "API.Base/API.Base.csproj"
COPY . .
WORKDIR "/src/API.Base"
RUN dotnet build "API.Base.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "API.Base.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.Base.dll"]