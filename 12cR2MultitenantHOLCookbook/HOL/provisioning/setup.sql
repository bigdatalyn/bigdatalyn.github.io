conn sys/oracle12@//localhost/cdb2 as sysdba
--
create database link cdb1_link connect to system identified by oracle12 using '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED) (SERVICE_NAME = cdb1)))';
--
grant sysoper to system container=all;
--
conn sys/oracle12@//localhost/cdb1 as sysdba
--
create database link cdb2_link connect to system identified by oracle12 using '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED) (SERVICE_NAME = cdb2)))';
--
grant sysoper to system container=all;


-- create public database link cdb1_link connect to c##admin identified by oracle using '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED) (SERVICE_NAME = cdb1)))';
-- create public database link cdb2_link connect to c##admin identified by oracle using '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED) (SERVICE_NAME = cdb2)))';