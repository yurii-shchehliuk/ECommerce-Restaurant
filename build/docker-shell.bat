#wsl --shutdown
echo extract all the files from the docker folder to the folder where the *.sln file is located.
cd ..
docker ps
docker-compose down
docker-compose build && docker-compose up -d
docker-compose logs

:: to stop all images
:: docker stop $(docker ps -aq)