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
prompt *         Exercise: Examine the lockdown profiles for network access                  *  
prompt *         ===================================================================         *
prompt *  Outline of this lab:                                                               *
prompt *  - Create a lockdown profile in the root                                            *
prompt *  - Alter lockdown profile to disable 'NETWORK_ACCESS'                               *
prompt *  - Connect to the PDB and set the 'pdb_lockdown' parameter                          *
prompt *  - Try to send an email from the PDB via the 'send_mail' procedure                  *
prompt *                                                                                     *
prompt ***************************************************************************************

pause Press [Enter] to continue

connect sys/oracle12@//localhost/cdb1  as sysdba
-- Need to do this after every connect.
set feedback 6

prompt -- 3.0 Create a PDB
prompt
prompt We will create a PDB first.
prompt

prompt SQL> create pluggable database ORDERS admin user admin identified by oracle12
create pluggable database ORDERS admin user admin identified by oracle12;

prompt SQL> alter pluggable database ORDERS open
alter pluggable database ORDERS open;

pause Press [Enter] to continue

prompt -- 3.1 Display the current lockdown profiles
prompt SQL> select * from DBA_LOCKDOWN_PROFILES
select * from DBA_LOCKDOWN_PROFILES;

pause Press [Enter] to continue

prompt -- 3.2 Create a lockdown profile named p3 to disable
prompt -- network access
prompt SQL> create lockdown profile p3
create lockdown profile p3;

pause Press [Enter] to continue

prompt SQL> alter lockdown profile p3 disable feature=('NETWORK_ACCESS')
alter lockdown profile p3 disable feature=('NETWORK_ACCESS');

pause Press [Enter] to continue

prompt -- 3.3 Display the current lockdown profiles
prompt SQL> select * from DBA_LOCKDOWN_PROFILES
select * from DBA_LOCKDOWN_PROFILES;

pause Press [Enter] to continue

prompt -- 3.4 Display the current list of PDBs and connect
prompt -- to ORDERS pdb
prompt SQL> show pdbs
show pdbs

pause Press [Enter] to continue

prompt SQL> alter session set container = ORDERS
alter session set container = ORDERS;

pause Press [Enter] to continue

prompt -- 3.5 Create and execute a procedure to send email
prompt -- via 'UTL_SMTP' which is part of 'NETWORK_ACCESS'
prompt -- Remember lockdown profile p3 is not set yet!
prompt SQL> @sendmail.sql
@sendmail.sql

prompt SQL> execute send_mail('scott.tiger@oracle.com', 'Lockdown Lab 3', 'Testing network access.')
execute send_mail('scott.tiger@oracle.com', 'Lockdown Lab 3', 'Testing network access.');

pause Press [Enter] to continue

prompt -- 3.6 Set the lockdown profile p3
prompt SQL> alter system set pdb_lockdown = p3
alter system set pdb_lockdown = p3;

pause Press [Enter] to continue

prompt -- 3.7 Try to send an email again.
prompt -- We should see an error message complaining about 
prompt -- insufficient privileges 
prompt SQL> execute send_mail('scott.tiger@oracle.com', 'Lockdown Lab 3', 'Testing network access.')
execute send_mail('scott.tiger@oracle.com', 'Lockdown Lab 3', 'Testing network access.');

pause Press [Enter] to continue

prompt -- 3.8 Connect to root, drop p3, and bounce the database
prompt SQL> alter session set container = cdb$root
alter session set container = cdb$root;

prompt SQL> drop lockdown profile p3
drop lockdown profile p3;

prompt -- 3.9 Connect to ORDERS, and try to send an email.
prompt -- This time, we should be able to create it since p3 was dropped.
prompt SQL> alter session set container = ORDERS
alter session set container = ORDERS;

prompt SQL> execute send_mail('scott.tiger@oracle.com', 'Lockdown Lab 3', 'Testing network access.')
execute send_mail('scott.tiger@oracle.com', 'Lockdown Lab 3', 'Testing network access.');

pause Press [Enter] to continue

prompt We will close our PDB as the last step.
prompt

prompt SQL> alter pluggable database close
alter pluggable database close;

prompt SQL> alter session set container = cdb$root
alter session set container = cdb$root;

prompt Now we are going to cleanup the environment
prompt

prompt SQL> @cleanup.sql
@cleanup.sql

--
exit;
