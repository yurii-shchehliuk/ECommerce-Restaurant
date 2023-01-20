docker run -d -p 6379:6379 --name aspnetrun-redis redis
:: troubleshooting
docker logs -f aspnetrun-redis
:: redis terminal
docker exec -it aspnetrun-redis /bit/bash
:: redis cli 
redis-cli
ping
set {key} {value}

