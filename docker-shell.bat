#wsl --shutdown
cd server
docker ps
docker-compose down
docker-compose build && docker-compose up -d
docker-compose logs
