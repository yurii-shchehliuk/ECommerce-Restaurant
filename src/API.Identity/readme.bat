dotnet publish "API.Identity.csproj" -c Release -o /app/publish /p:UseAppHost=false
cd ..
docker build -f API.Identity\Dockerfile --force-rm -t api_identity .
docker run -d -p 8080:80 --name API.Identity api_identity -e "ASPNETCORE_ENVIRONMENT=Development"