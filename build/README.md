# install packages in src\API.Web\ClientApp
npm install
npm i -g @angular/cli@20
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

# Catalogue art
`generate-catalogue-art.py` draws every image under
`src/API.Web/wwwroot/images/products` with Pillow, one archetype per dish shape,
and `catalogue.py` holds the names, prices and copy the seed file is built from.
Run it with the images directory as its argument:

```bash
python build/generate-catalogue-art.py src/API.Web/wwwroot/images/products
```

# Trubleshooting
## if error ng.ps1 appears 
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
## use $nvm to manage node versions https://github.com/coreybutler/nvm-windows#readme
Angular 20 needs Node 20.19+, 22.12+ or 24.

## docker
Move all the files from the docker folder to the folder where the *.sln file is located.

## nginx docker container 
https://gist.github.com/dahlsailrunner/679e6dec5fd769f30bce90447ae80081
