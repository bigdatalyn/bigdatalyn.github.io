!clear
set echo off
set termout on
set serveroutput on
set feedback on
set verify off
set lines 200 pages 1000

column PROFILE_NAME FORMAT A15
column RULE_TYPE FORMAT A10
column RULE FORMAT A15
column CLAUSE FORMAT A10
column CLAUSE_OPTION FORMAT A15
column OPTION_VALUE FORMAT A12
column MIN_VALUE FORMAT A3
column MAX_VALUE FORMAT A3
column LIST FORMAT A4
column STATUS FORMAT A7
----------------------------------------------

prompt ***************************************************************************************
prompt *         Exercise: Examine the lockdown profiles for Oracle options                  *
prompt *         ===================================================================         *
prompt *  Outline of this lab:                                                               *
prompt *  - Create a lockdown profile in the root                                            *
prompt *  - Alter lockdown profile to disable 'Partioning'                                   *
prompt *  - Connect to the PDB and set the 'pdb_lockdown' parameter                          *
prompt *  - Try to create a partitioned table                                                *
prompt *                                                                                     *
prompt ***************************************************************************************

pause Press [Enter] to continue

connect sys/oracle12@//localhost/cdb1  as sysdba
-- Need to do this after every connect.
set feedback 6

prompt -- 2.0 Create a PDB
prompt
prompt We will create a PDB first.
prompt

prompt SQL> create pluggable database CUSTOMERS admin user admin identified by oracle12
create pluggable database CUSTOMERS admin user admin identified by oracle12;

prompt SQL> alter pluggable database CUSTOMERS open
alter pluggable database CUSTOMERS open;

pause Press [Enter] to continue

prompt -- 2.1 Display the current lockdown profiles
prompt SQL> select * from DBA_LOCKDOWN_PROFILES
select * from DBA_LOCKDOWN_PROFILES;

pause Press [Enter] to continue

prompt -- 2.2 Create a lockdown profile named p2 to disable
prompt -- 'Partitioning' option
prompt SQL> create lockdown profile p2
create lockdown profile p2;

pause Press [Enter] to continue

prompt SQL> alter lockdown profile p2 disable option=('Partitioning')
alter lockdown profile p2 disable option=('Partitioning');

pause Press [Enter] to continue

prompt -- 2.3 Display the current lockdown profiles
prompt SQL> select * from DBA_LOCKDOWN_PROFILES
select * from DBA_LOCKDOWN_PROFILES;

pause Press [Enter] to continue

prompt -- 2.4 Display the current list of PDBs and connect
prompt -- to CUSTOMERS pdb
prompt SQL> show pdbs
show pdbs

pause Press [Enter] to continue

prompt SQL> alter session set container = CUSTOMERS
alter session set container = CUSTOMERS;

pause Press [Enter] to continue

prompt -- 2.5 Display the current value of 'Partitioning'
prompt SQL> select parameter, value from v$option where parameter = 'Partitioning'
select parameter, value from v$option where parameter = 'Partitioning';

pause Press [Enter] to continue

prompt -- 2.6 Create a partitioned table and drop it. 
prompt -- Remember lockdown profile p2 is not set yet!
prompt SQL> create table t1 (c1 number) partition by hash (c1)
create table t1 (c1 number) partition by hash (c1);

prompt SQL> drop table t1
drop table t1;

pause Press [Enter] to continue

prompt -- 2.7 Set the lockdown profile p2
prompt SQL> alter system set pdb_lockdown = p2
alter system set pdb_lockdown = p2;

pause Press [Enter] to continue

prompt -- 2.8 Try to create a partitioned table
prompt -- We should see an error message complaining about 
prompt -- disabled feature 
prompt SQL> create table t1 (c1 number) partition by hash (c1)
create table t1 (c1 number) partition by hash (c1);

pause Press [Enter] to continue

prompt -- 2.9 Connect to root and drop p2
prompt SQL> alter session set container = cdb$root
alter session set container = cdb$root;

prompt SQL> drop lockdown profile p2
drop lockdown profile p2;

prompt -- 2.10 Connect to CUSTOMERS, and try to create 
prompt -- a partitioned table. This time, we should be able to
prompt -- create it since p2 was dropped.
prompt SQL> alter session set container = CUSTOMERS
alter session set container = CUSTOMERS;

prompt SQL> create table t1 (c1 number) partition by hash (c1)
create table t1 (c1 number) partition by hash (c1);

prompt SQL> drop table t1
drop table t1;

pause Press [Enter] to continue

prompt We will close our PDB as the last step.
prompt

prompt SQL> alter pluggable database close
alter pluggable database close;

prompt SQL> alter session set container = cdb$root
alter session set container = cdb$root;

exit;
