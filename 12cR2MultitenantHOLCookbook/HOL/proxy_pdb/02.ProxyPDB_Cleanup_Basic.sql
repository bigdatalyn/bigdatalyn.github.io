set echo off
set termout on
set serveroutput on
set feedback off
set verify off

clear screen
----------------------------

prompt
prompt Proxy PDBs Basic. Clean up environment.
prompt ======================================
prompt 

-- set echo on

prompt
prompt -- Cleanup script Phase 1.
prompt -- Drop Proxy PDB in CDB2
prompt

connect sys/oracle12@//localhost/cdb2 as sysdba

@@whoami

prompt sys@CDB2> show pdbs
show pdbs

prompt sys@CDB2> alter pluggable database snowsports_proxy close immediate;
alter pluggable database snowsports_proxy close immediate;
prompt sys@CDB2> drop pluggable database snowsports_proxy including datafiles;
drop pluggable database snowsports_proxy including datafiles;

prompt sys@CDB2> show pdbs
show pdbs

prompt
prompt -- Cleanup script Phase 2.
prompt -- Drop PDB in CDB1
prompt

prompt sys@CDB2> connect sys/oracle12@//localhost/cdb1 as sysdba
connect sys/oracle12@//localhost/cdb1 as sysdba

@@whoami

prompt sys@CDB1> show pdbs
show pdbs

prompt sys@CDB1> alter pluggable database snowsports close immediate;
alter pluggable database snowsports close immediate;
prompt sys@CDB1> drop pluggable database snowsports including datafiles;
drop pluggable database snowsports including datafiles;

prompt sys@CDB1> show pdbs
show pdbs
