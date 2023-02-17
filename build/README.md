# install packages in src\API.Web\ClientApp
npm install
npm i -g @angular/cli@15.1.6
## check angular build
ng build

## make sure server is installed
SQLCMD -S localhost\SQLEXPRESS
select @@version
go

# Launching API
Set either docker-compose or all API.\* projects as startup. 
## Execute migrations
migrations.*.bat

# Lunch Client
ng serve

## redis
https://chocolatey.org/install
cmd: redis-server
	 redis-cli

# Trubleshooting
## if error ng.ps1 appears 
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
## use $nvm to manage dove versions https://github.com/coreybutler/nvm-windows#readme
install node version  16.13.0  https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3

## docker
Move all the files from the docker folder to the folder where the *.sln file is located.

## nginx docker container 
https://gist.github.com/dahlsailrunner/679e6dec5fd769f30bce90447ae80081
