# install packages in src\API.Web\ClientApp
npm install
npm i -g @angular/cli@14.2.10
#check angular build
ng build
# make sure server is installed
SQLCMD -S localhost\SQLEXPRESS
select @@version
go

# Execute migrations
migrations.*.bat
# if error ng.ps1 appears 
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# docker
Move all the files from the docker folder to the folder where the *.sln file is located.
# use $nvm to manage dove versions https://github.com/coreybutler/nvm-windows#readme
currend node version  is 16.0.10
