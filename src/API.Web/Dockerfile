#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
#COPY nginx/id-local.crt /usr/local/share/ca-certificates/id-local.crt
#COPY nginx/www-local.crt /usr/local/share/ca-certificates/www-local.crt
#RUN update-ca-certificates
#EXPOSE 80
#EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["src/API.Web/API.Web.csproj", "src/API.Web/"]
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

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.Web.dll"]