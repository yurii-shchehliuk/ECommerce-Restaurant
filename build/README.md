# install packages in src\API.Web\ClientApp
npm install
npm i -g @angular/cli@14.2.10
#check angular build
ng build

# make sure server is installed
SQLCMD -S localhost\SQLEXPRESS
select @@version
go

## Launching API
Set either docker-compose or all API.\* projects as startup. 
# Lunch Client
ng serve

### redis
https://chocolatey.org/install
cmd: redis-server
	 redis-cli

# Execute migrations
migrations.*.bat
# if error ng.ps1 appears 
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# docker
Move all the files from the docker folder to the folder where the *.sln file is located.
# use $nvm to manage dove versions https://github.com/coreybutler/nvm-windows#readme
install node version  16.10.0  https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3
