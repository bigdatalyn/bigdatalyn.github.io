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
prompt *         Exercise: Examine the lockdown profiles for administrative features         *
prompt *         ===================================================================         *
prompt *  Outline of this lab:                                                               *
prompt *  - Create a lockdown profile in the root                                            *
prompt *  - Alter lockdown profile to disable 'Alter System' statement for 'cursor_sharing'  *
prompt *  - Connect to the PDB and set the 'pdb_lockdown' parameter                          *
prompt *  - Try to change the value of 'cursor_sharing'                                      *
prompt *                                                                                     *
prompt ***************************************************************************************

pause Press [Enter] to continue

connect sys/oracle12@//localhost/cdb1  as sysdba
-- Need to do this after every connect.
set feedback 6

prompt -- 1.0 Create a PDB
prompt
prompt We will create a PDB first.
prompt

prompt SQL> create pluggable database SALES admin user admin identified by oracle12
create pluggable database SALES admin user admin identified by oracle12;

prompt SQL> alter pluggable database SALES open
alter pluggable database SALES open;

pause Press [Enter] to continue

prompt -- 1.1 Display the current lockdown profiles
prompt SQL> select * from DBA_LOCKDOWN_PROFILES
select * from DBA_LOCKDOWN_PROFILES;

pause Press [Enter] to continue

prompt -- 1.2 Create a lockdown profile named p1 to disable
prompt -- any attemps to change the value of cursor_sharing
prompt SQL> create lockdown profile p1
create lockdown profile p1;

pause Press [Enter] to continue

prompt SQL> alter lockdown profile p1 disable statement=('ALTER SYSTEM') clause=('SET') option=('cursor_sharing')
alter lockdown profile p1 disable statement=('ALTER SYSTEM') clause=('SET') option=('cursor_sharing');

pause Press [Enter] to continue

prompt -- 1.3 Display the current lockdown profiles
prompt SQL> select * from DBA_LOCKDOWN_PROFILES
select * from DBA_LOCKDOWN_PROFILES;

pause Press [Enter] to continue

prompt -- 1.4 Display the current list of PDBs and connect
prompt -- to SALES pdb
prompt SQL> show pdbs
show pdbs

pause Press [Enter] to continue

prompt SQL> alter session set container = SALES
alter session set container = SALES;

pause Press [Enter] to continue

prompt -- 1.5 Display the current value of 'cursor_sharing'
prompt SQL> show parameter cursor_sharing
show parameter cursor_sharing

pause Press [Enter] to continue

prompt -- 1.6 Change the value of 'cursor_sharing' 
prompt -- Remember lockdown profile p1 is not set yet!
prompt SQL> alter system set cursor_sharing = FORCE
alter system set cursor_sharing = FORCE;

pause Press [Enter] to continue

prompt -- 1.7 Set the lockdown profile p1
prompt SQL> alter system set pdb_lockdown = p1
alter system set pdb_lockdown = p1;

pause Press [Enter] to continue

prompt -- 1.8 Try to change the value of 'cursor_sharing'
prompt -- We should see an error message complaining about 
prompt -- insufficient privileges 
prompt SQL> alter system set cursor_sharing = EXACT
alter system set cursor_sharing = EXACT;

pause Press [Enter] to continue

prompt -- 1.9 Connect to root and drop p1
prompt SQL> alter session set container = cdb$root
alter session set container = cdb$root;

prompt SQL> drop lockdown profile p1
drop lockdown profile p1;

prompt -- 1.10 Connect to SALES, and try to change the 
prompt -- 'cursor_sharing'. This time, we should be able to
prompt -- change it since p1 was dropped.
prompt SQL> alter session set container = SALES
alter session set container = SALES;

pause Press [Enter] to continue

prompt SQL> show parameter cursor_sharing
show parameter cursor_sharing

pause Press [Enter] to continue

prompt SQL> alter system set cursor_sharing = EXACT
alter system set cursor_sharing = EXACT;

prompt We will close our PDB as the last step.
prompt

prompt SQL> alter pluggable database close
alter pluggable database close;

prompt SQL> alter session set container = cdb$root
alter session set container = cdb$root;

exit;

