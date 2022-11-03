
----------------------------------------------------------------------------
--- DB USER CREATION
----------------------------------------------------------------------------
USE master;
GO
CREATE LOGIN [owlet_dbuser] WITH PASSWORD=N'P@ssw0rd', CHECK_EXPIRATION=OFF, CHECK_POLICY=ON;
GO
USE owletDB;
GO
CREATE USER [owlet_dbuser] FOR LOGIN [owlet_dbuser];
GO
EXEC sp_addrolemember N'db_owner', [owlet_dbuser];
GO
