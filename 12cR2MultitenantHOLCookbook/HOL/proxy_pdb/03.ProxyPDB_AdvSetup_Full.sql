!clear
set echo off
set termout on
set serveroutput on
set feedback on
set verify off

column Pluggable_Database format A18
----------------------------

prompt **************************************************************
prompt * Overview of this lab:                                      *
prompt *   - In CDB1:                                               *
prompt *     a. Create application container wintersports           *
prompt *     b. Create tenant PDBs skis and boards in winter sports *
prompt *     c. Write application code in wintersports              *
prompt *        (aggregates sales across all PDBs in container)     *
prompt *     d. Unplug PDB boards                                   *
prompt *   - In CDB2:                                               *
prompt *     a. Create application container snowsports_abroad      *
prompt *     b. Plug in PDB boards as boards_abroad                 *
prompt *   - In CDB1:                                               *
prompt *     a. Create Proxy PDB boards from boards_abroad@CDB2     *
prompt *     b. Execute application code                            *  
prompt *     c. Note that this runs unchanged.                      *
prompt *        This is an example of location transparency         *
prompt **************************************************************

pause Press [Enter] to continue

prompt -- Connect to CDB$Root of CDB1
prompt idle> connect sys/oracle12@//localhost/cdb1 as sysdba
connect sys/oracle12@//localhost/cdb1 as sysdba

@@whoami

prompt sys@CDB1> show pdbs
show pdbs

pause Press [Enter] to continue

-- Easiest thing is to clone the AppContainers PDB
-- Try running ProxyPDB_AdvSetup Easy
-- That is simply a clone of app_root:
-- create pluggable database wintersports from app_root;
-- If that doesn't work we have to do all this. 

prompt sys@CDB1>create pluggable database wintersports as application container admin user admin identified by manager;
create pluggable database wintersports as application container
admin user admin identified by manager; 

prompt sys@CDB1> alter pluggable database wintersports open;
alter pluggable database wintersports open;
prompt sys@CDB1> alter session set container = wintersports;
alter session set container = wintersports;

prompt
prompt SQL> conn system/oracle12@//localhost/wintersports 
conn system/oracle12@//localhost/wintersports

pause Press [Enter] to continue

-- Now check the properties in dba_pdbs
prompt sys@CDB1> @pdb_details.sql
@pdb_details.sql

pause Press [Enter] to continue

prompt -- Now install the application master
prompt sys@CDB1> alter pluggable database application snowsports begin install '1.0';
alter pluggable database application snowsports begin install '1.0';

prompt sys@CDB1> create tablespace app_tbs datafile size 100M autoextend on next 10M maxsize 200M;
create tablespace app_tbs datafile size 100M autoextend on next 10M maxsize 200M;

prompt sys@CDB1> create user app_owner identified by app_owner container=all; 
create user app_owner identified by app_owner container=all;
prompt sys@CDB1> grant create session, dba to app_owner;
grant create session, dba to app_owner;
prompt sys@CDB1> alter user app_owner default tablespace app_tbs;
alter user app_owner default tablespace app_tbs;

prompt -- Now connect as the app_owner and create a table

pause Press [Enter] to continue

prompt sys@CDB1> connect app_owner/app_owner@//localhost/wintersports;
connect app_owner/app_owner@//localhost/wintersports;
--
prompt app_owner@WINTERSPORTS> create table app_owner.sales_data sharing=Metadata
prompt   2  (year       number(4), 
prompt   3   region     varchar2(10), 
prompt   4   quarter    varchar2(4),
prompt   5   revenue    number);
create table app_owner.sales_data sharing=Metadata 
(year       number(4),
 region     varchar2(10),
 quarter    varchar2(4),
 revenue    number);

prompt app_owner@WINTERSPORTS> create table app_owner.country sharing=Data
prompt   2  (country_id   number,
prompt   3   country_name varchar2(20));
create table app_owner.country sharing=Data
(country_id   number,
 country_name varchar2(20));

pause Press [Enter] to continue

--
-- Insert and seed records to this table
--
prompt app_owner@WINTERSPORTS> insert into app_owner.country values(1, 'usa');
insert into app_owner.country values(1, 'usa');
prompt app_owner@WINTERSPORTS> insert into app_owner.country values(44, 'uk');
insert into app_owner.country values(44, 'uk');
prompt app_owner@WINTERSPORTS> insert into app_owner.country values(86, 'china');
insert into app_owner.country values(86, 'china');
prompt app_owner@WINTERSPORTS> insert into app_owner.country values(91, 'India');
insert into app_owner.country values(91, 'India');

pause Press [Enter] to continue

--
prompt app_owner@WINTERSPORTS> create table app_owner.zipcodes sharing=Data
prompt   2  (code varchar2(5),
prompt   3   country_id number,
prompt   4   region varchar2(10));
create table app_owner.zipcodes sharing=Data
(code varchar2(5),
 country_id number,
 region varchar2(10));

pause Press [Enter] to continue

--
prompt app_owner@WINTERSPORTS> insert into app_owner.zipcodes values ('08820','1','east');
insert into app_owner.zipcodes values ('08820','1','east');
prompt app_owner@WINTERSPORTS> insert into app_owner.zipcodes values ('10005','1','east');
insert into app_owner.zipcodes values ('10005','1','east');
prompt app_owner@WINTERSPORTS> insert into app_owner.zipcodes values ('44332','1','north');
insert into app_owner.zipcodes values ('44332','1','north');
prompt app_owner@WINTERSPORTS> insert into app_owner.zipcodes values ('94065','1','west');
insert into app_owner.zipcodes values ('94065','1','west');
prompt app_owner@WINTERSPORTS> insert into app_owner.zipcodes values ('73301','1','south');
insert into app_owner.zipcodes values ('73301','1','south');
--
prompt app_owner@WINTERSPORTS> commit;
commit;
--
prompt app_owner@WINTERSPORTS> alter pluggable database application snowsports end install '1.0';
alter pluggable database application snowsports end install '1.0';

prompt -- Now reconnect to the application root as SysDBA

pause Press [Enter] to continue

prompt app_owner@WINTERSPORTS> connect sys/oracle12@//localhost/wintersports as sysdba
connect sys/oracle12@//localhost/wintersports as sysdba
/*
create pluggable database as seed admin user admin identified by admin;
alter pluggable database wintersports$seed open;
*/

-- Now create the two Tenant PDBs, sync with the master application
-- and populate with some data. 
prompt sys@WINTERSPORTS> define PDB_Name = "skis"
define PDB_Name = "skis"
prompt sys@WINTERSPORTS> create pluggable database &PDB_Name admin user admin identified by password; 
create pluggable database &PDB_Name admin user admin identified by password;
prompt sys@WINTERSPORTS> alter pluggable database &PDB_Name open;
alter pluggable database &PDB_Name open;
prompt sys@WINTERSPORTS> alter session set container = &PDB_Name;
alter session set container = &PDB_Name;
prompt sys@WINTERSPORTS> alter pluggable database application snowsports sync;
alter pluggable database application snowsports sync;

prompt -- Now populate the "skis" PDB with some data

pause Press [Enter] to continue

prompt sys@WINTERSPORTS> @populate1
@populate1

pause Press [Enter] to continue

prompt -- Switch back to the application root
prompt sys@WINTERSPORTS> alter session set container = wintersports;
alter session set container = wintersports;

prompt sys@WINTERSPORTS> define PDB_Name = "boards"
define PDB_Name = "boards"
prompt sys@WINTERSPORTS> create pluggable database &PDB_Name admin user admin identified by password;
create pluggable database &PDB_Name admin user admin identified by password;
prompt sys@WINTERSPORTS> alter pluggable database &PDB_Name open;
alter pluggable database &PDB_Name open;
prompt sys@WINTERSPORTS> alter session set container = &PDB_Name;
alter session set container = &PDB_Name;
prompt sys@WINTERSPORTS> alter pluggable database application snowsports sync;
alter pluggable database application snowsports sync;

pause Press [Enter] to continue

prompt -- Now populate the "boards" PDB with some data
prompt sys@WINTERSPORTS> @populate1
@populate1

pause Press [Enter] to continue

prompt -- Switch back to application root and see what we have.

prompt sys@WINTERSPORTS> alter session set container = wintersports;
alter session set container = wintersports;

@@whoami
prompt sys@WINTERSPORTS> show pdbs
show pdbs

