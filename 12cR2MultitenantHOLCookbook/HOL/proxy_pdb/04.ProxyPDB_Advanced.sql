!clear
set echo off
set termout on
set serveroutput on
set feedback on
set verify off 

-- 4.0 Connect to the application container winter sports in CDB1
prompt sys@WINTERSPORTS> connect app_owner/app_owner@//localhost/wintersports
connect app_owner/app_owner@//localhost/wintersports

@@whoami

pause Press [Enter] to continue

-- Here is a piece of "application code".
-- It uses the containers() SQL construct to aggregate data in our two PDB
prompt app_owner@WINTERSPORTS> host cat year_wise_sum_new.sql
host cat year_wise_sum_new.sql
-- Step 4.1
prompt -- Run this "application code" to look at the data in our two PDBs
prompt app_owner@WINTERSPORTS> @year_wise_sum_new.sql
@year_wise_sum_new.sql

pause Press [Enter] to continue

-- Now, move one of the PDBs to CDB2

-- This is the ideal way to do this:
-- Requires snowsports_abroad application container in CDB2. (Can we clone that?)
-- Requires DB Link to CDB2
-- create pluggable database snowsports_abroad@cdb2_link from snowsports;

-- Requires a DB Link to the snowsports_abroad  app_container
-- Requires push cloning/relocate to work.
-- create pluggable database boards_abroad@snowsports_abroad_link from boards relocate;

-- Meanwhile we'll move it using unplug/plug

-- Step 4.2
prompt -- Unplug the boards PDB.
prompt -- Note the .pdb file extension creates a PDB archive, which is a self-contained
prompt -- unplugged PDB. (Think of this as a zipped up archive of the XML manifest 
prompt -- and all the datafiles. 
prompt app_owner@WINTERSPORTS> connect sys/oracle12@//localhost/cdb1 as sysdba;
connect sys/oracle12@//localhost/cdb1 as sysdba;

pause Press [Enter] to continue

prompt sys@CDB1> alter pluggable database boards close ;
alter pluggable database boards close ;
prompt sys@CDB1> host rm -rf /tmp/boards.pdb
host rm -rf /tmp/boards.pdb
prompt sys@CDB1> alter pluggable database boards unplug into '/tmp/boards.pdb';
alter pluggable database boards unplug into '/tmp/boards.pdb';
prompt sys@CDB1> drop pluggable database boards including datafiles;
drop pluggable database boards including datafiles;

pause Press [Enter] to continue

-- Step 4.3
prompt -- Switch to CDB$Root in CDB2. 
prompt sys@CDB1> connect sys/oracle12@//localhost/cdb2 as sysdba
connect sys/oracle12@//localhost/cdb2 as sysdba

pause Press [Enter] to continue

-- Step 4.4
prompt -- Create application root wintersports_abroad in CDB2.
prompt sys@CDB2> create pluggable database wintersports_abroad as application container from wintersports@proxy_pdb_link;
create pluggable database wintersports_abroad as application container from wintersports@proxy_pdb_link;
prompt sys@CDB2> alter pluggable database wintersports_abroad open;
alter pluggable database wintersports_abroad open;
prompt sys@CDB2> alter session set container = wintersports_abroad;
alter session set container = wintersports_abroad;

pause Press [Enter] to continue

-- Step 4.5
prompt -- Plug in and open the PDB boards_abroad from the PDB archive.
prompt sys@CDB2> create pluggable database boards_abroad using '/tmp/boards.pdb';
create pluggable database boards_abroad using '/tmp/boards.pdb';
prompt sys@CDB2> alter pluggable database boards_abroad open;
alter pluggable database boards_abroad open;

pause Press [Enter] to continue

-- Step 4.6
prompt -- Switch back to application root wintersports in CDB1
prompt sys@CDB2> connect sys/oracle12@//localhost/wintersports as sysdba
connect sys/oracle12@//localhost/wintersports as sysdba

pause Press [Enter] to continue

-- Step 4.7
prompt -- Create a database link to wintersports_abroad in CDB2
prompt sys@WINTERSPORTS> create database link wintersports_abroad_link connect to system identified by oracle12 using '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED) (SERVICE_NAME = wintersports_abroad)))';
create database link wintersports_abroad_link connect to system identified by oracle12 using '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED) (SERVICE_NAME = wintersports_abroad)))';

pause Press [Enter] to continue

-- Step 4.8
prompt -- Create a Proxy PDB of the boards_abroad PDB
prompt sys@WINTERSPORTS> create pluggable database boards as proxy from boards_abroad@wintersports_abroad_link;
create pluggable database boards as proxy from boards_abroad@wintersports_abroad_link;
prompt sys@WINTERSPORTS> alter pluggable database boards open
alter pluggable database boards open;

pause Press [Enter] to continue

-- Step 4.9
prompt -- Now show PDBs
prompt -- Note that once again we have two PDBs in application container 
prompt -- wintersports in CDB1 - SKIS and BOARDS.
prompt -- However, the base PDB BOARDS, was moved to CDB2 and renamed BOARDS_ABROAD.
prompt -- PDB BOARDS here is a Proxy PDB of that one.
prompt sys@WINTERSPORTS> show pdbs
show pdbs

pause Press [Enter] to continue

-- Step 4.10
prompt -- Now re-execute query to have another look at the data.
prompt -- Here we are executing the same "application code" as before.
prompt -- The use of the PDB allows this application code to run unchanged, even though
prompt -- the base PDB has moved to CDB2. This is an example of location transparency. 
prompt sys@WINTERSPORTS> connect app_owner/app_owner@//localhost/wintersports
connect app_owner/app_owner@//localhost/wintersports
prompt sys@WINTERSPORTS> @year_wise_sum_new.sql
@year_wise_sum_new.sql

prompt -- Note that the query returns the same data, even though one of the PDBs has
prompt -- been moved to CDB2. 
prompt -- The Proxy PDB creates location transparency. 

prompt
prompt Now we are going to cleanup the both CDB1 and CDB2 environments
prompt

pause Press [Enter] to continue

prompt app_owner@WINTERSPORTS> @05.ProxyPDB_Cleanup_Adv.sql
@05.ProxyPDB_Cleanup_Adv.sql

exit
