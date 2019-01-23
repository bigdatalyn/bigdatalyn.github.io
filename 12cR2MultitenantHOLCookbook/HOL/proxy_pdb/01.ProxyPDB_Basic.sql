!clear
set echo off
set termout on
set serveroutput on
set feedback on
set verify off
-- Basic proxy PDB functionality
--
prompt ***************************************************************************************
prompt *  Outline of this lab:                                                               *
prompt *  - Connect to CDB$Root of CDB1                                                      *
prompt *  - create a PDB - snowsports                                                        *  
prompt *  - begin to install an application schema in this PDB                               *
prompt *  - create a Proxy PDB of snowsports in CDB2                                         *    
prompt *  - connect to that Proxy PDB and continue the installation of the application       *
prompt *  Note that the behavior is identical, whether connected directly to PDB snowsports, *
prompt *  or to the Proxy PDB in a remote CDB.                                               *
prompt ***************************************************************************************

pause Press [Enter] to continue

prompt -- Connect to CDB$Root of CDB1
prompt idle> connect sys/oracle12@//localhost/cdb1 as sysdba
connect sys/oracle12@//localhost/cdb1 as sysdba

@@whoami

-- Now create the PDB and begin to create the application schema

-- 1.0 Create PDB snowsports
prompt sys@CDB1> define PDB_Name = "snowsports"
define PDB_Name = "snowsports"

prompt sys@CDB1> create pluggable database &PDB_Name admin user app_owner identified by app_owner roles=(dba);
create pluggable database &PDB_Name admin user app_owner identified by app_owner roles=(dba);

prompt sys@CDB1> alter pluggable database &PDB_Name open;
alter pluggable database &PDB_Name open;

prompt sys@CDB1> alter session set container = &PDB_Name;
alter session set container = &PDB_Name;

pause Press [Enter] to continue

-- 1.1 Begin to create the application schema
prompt sys@CDB1> alter user app_owner quota unlimited on system;
alter user app_owner quota unlimited on system;
--
prompt sys@CDB1> create table app_owner.sales_data(year number(4), region varchar2(10), quarter varchar2(4), revenue number);
create table app_owner.sales_data
(year       number(4),
 region     varchar2(10),
 quarter    varchar2(4),
 revenue    number); 
--
prompt sys@CDB1> @populate1
@populate1

pause Press [Enter] to continue

-- 1.2 Review the progress so far
prompt sys@CDB1> desc app_owner.sales_data
desc app_owner.sales_data

prompt sys@CDB1> select * from app_owner.sales_data; 
select *
from app_owner.sales_data
;
pause Press [Enter] to continue
--
-- 1.3 Now switch to CDB2 and create a Proxy PDB of snowsports
prompt sys@CDB1> connect sys/oracle12@//localhost/cdb2 as sysdba
connect sys/oracle12@//localhost/cdb2 as sysdba

@@whoami

pause Press [Enter] to continue

-- 1.4 Create and open a Proxy PDB in this CDB (CDB2) of PDB snowsports (in CDB1)
prompt sys@CDB2> create pluggable database snowsports_proxy as proxy from snowsports@proxy_pdb_link;
create pluggable database snowsports_proxy as proxy from snowsports@proxy_pdb_link;

prompt sys@CDB2> alter pluggable database snowsports_proxy open;
alter pluggable database snowsports_proxy open;

-- 1.5 Switch to the proxy PDB
prompt sys@CDB2> connect app_owner/app_owner@//localhost/snowsports_proxy
connect app_owner/app_owner@//localhost/snowsports_proxy 

pause Press [Enter] to continue

-- 1.6 Show tables in the schema
prompt app_owner@SNOWSPORTS> select table_name from all_tables where owner = 'APP_OWNER';
select table_name
from all_tables
where owner = 'APP_OWNER'
;

-- Show the data in this table
prompt app_owner@SNOWSPORTS> select * from app_owner.sales_data;
select *
from app_owner.sales_data
;

pause Press [Enter] to continue

-- 1.7 Continue creating the application schema
prompt app_owner@SNOWSPORTS> create table app_owner.country(country_id number, country_name varchar2(20));
create table app_owner.country 
(country_id   number,
 country_name varchar2(20));
--
-- Insert and seed records to this table
--
prompt app_owner@SNOWSPORTS> insert into app_owner.country values(1, 'usa');
insert into app_owner.country values(1, 'usa');
prompt app_owner@SNOWSPORTS> insert into app_owner.country values(44, 'uk');
insert into app_owner.country values(44, 'uk');
prompt app_owner@SNOWSPORTS> insert into app_owner.country values(86, 'china');
insert into app_owner.country values(86, 'china');
prompt app_owner@SNOWSPORTS> insert into app_owner.country values(91, 'India');
insert into app_owner.country values(91, 'India');
--
prompt app_owner@SNOWSPORTS> create table app_owner.zipcodes (code varchar2(5), country_id number, region varchar2(10));
create table app_owner.zipcodes 
(code varchar2(5),
 country_id number,
 region varchar2(10));
--
prompt app_owner@SNOWSPORTS> insert into app_owner.zipcodes values ('08820','1','east');
insert into app_owner.zipcodes values ('08820','1','east');
prompt app_owner@SNOWSPORTS> insert into app_owner.zipcodes values ('10005','1','east');
insert into app_owner.zipcodes values ('10005','1','east');
prompt app_owner@SNOWSPORTS> insert into app_owner.zipcodes values ('44332','1','north');
insert into app_owner.zipcodes values ('44332','1','north');
prompt app_owner@SNOWSPORTS> insert into app_owner.zipcodes values ('94065','1','west');
insert into app_owner.zipcodes values ('94065','1','west');
prompt app_owner@SNOWSPORTS> insert into app_owner.zipcodes values ('73301','1','south');
insert into app_owner.zipcodes values ('73301','1','south');
--
prompt app_owner@SNOWSPORTS> commit;
commit;
--

-- 1.8 Show tables in the schema
-- We should now see the extra two tables

pause Press [Enter] to continue

prompt app_owner@SNOWSPORTS> select table_name from all_tables where owner = 'APP_OWNER';
select table_name
from all_tables
where owner = 'APP_OWNER'
;

-- Show the data in the two new tables
prompt app_owner@SNOWSPORTS> select * from app_owner.country;
select *
from app_owner.country
;
prompt app_owner@SNOWSPORTS> select * from app_owner.zipcodes;
select *
from app_owner.zipcodes
;

-- 1.9 Now connect back to PDB snowsports in CDB1.
-- Review the schema in this PDB

pause Press [Enter] to continue

prompt app_owner@SNOWSPORTS> 
connect app_owner/app_owner@//localhost/snowsports 

@@whoami

-- 1.10 Show tables in the schema
-- We should now see the extra two tables
prompt app_owner@SNOWSPORTS> select table_name from all_tables where owner = 'APP_OWNER';
select table_name
from all_tables
where owner = 'APP_OWNER'
;

-- Show the data in these tables
prompt app_owner@SNOWSPORTS> select * from app_owner.sales_data;
select *
from app_owner.sales_data
;
prompt app_owner@SNOWSPORTS> select * from app_owner.country; 
select *
from app_owner.country
;
prompt app_owner@SNOWSPORTS> select * from app_owner.zipcodes;
select *
from app_owner.zipcodes
;
--
prompt
prompt Now we are going to cleanup the both CDB1 and CDB2 environments
prompt

pause Press [Enter] to continue

prompt app_owner@SNOWSPORTS> @02.ProxyPDB_Cleanup_Basic.sql
@02.ProxyPDB_Cleanup_Basic.sql
--
prompt *************************************************************************************
prompt *  Review of what we have seen:                                                     *
prompt *                                                                                   *
prompt *  In CDB1 we created PDB snowsports. We began to install an application schema.    *
prompt *  We then switched to CDB2.                                                        *
prompt *  There, we created a Proxy PDB of PDB snowsports (in CDB1)                        *
prompt *  We continued to install the application schema.                                  *
prompt *                                                                                   *
prompt *  We have successfully executed DDL, DML and queries both:                         *
prompt *    - *directly* in the "base" PDB; and                                            *
prompt *    - *indirectly* from the Proxy PDB in a remote CDB.                             *
prompt *  This demonstrates how a Proxy PDB can be used to deliver location transparency.  *
prompt *                                                                                   *
prompt *  Suggestions for further experimentation:                                         *
prompt *  1. Close base PDB, and try accessing it through open Proxy PDB.                  *
prompt *  2. Clone Proxy PDB. Can you access the base PDB via the clone?                   *
prompt *  3. Relocate Proxy PDB. Can you access the base PDB still?                        *
prompt *************************************************************************************
exit;

