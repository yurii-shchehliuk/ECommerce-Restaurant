#install packages in src\API.Web\wwwroot
npm install
#check angular build
ng build
#make sure server is installed
SQLCMD -S localhost\SQLEXPRESS
select @@version
go

#if error ng.ps1 appears 
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

#docker
Move all the files from the docker folder to the folder where the *.sln file is located.