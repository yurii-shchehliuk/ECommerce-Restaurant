#wsl --shutdown
echo extract docker folder into folder where .sln is located
cd ..
docker ps
docker-compose down
docker-compose build && docker-compose up -d
docker-compose logs

:: to stop all images
:: docker stop $(docker ps -aq)