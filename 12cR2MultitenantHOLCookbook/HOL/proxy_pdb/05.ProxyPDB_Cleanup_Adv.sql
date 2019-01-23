!clear
set echo off
set termout on
set serveroutput on
set feedback on
set verify off 

column Pluggable_Database FORMAT A18
column "Who am I?" FORMAT A120
----------------------------

prompt
prompt Proxy PDBs. Clean up environment.
prompt ================================
prompt 

-- Application cleanup script
--
prompt app_owner@WINTERSPORTS> connect sys/oracle12@//localhost/cdb1 as sysdba
connect sys/oracle12@//localhost/cdb1 as sysdba

@@whoami

prompt sys@CDB1> show pdbs
show pdbs

prompt sys@CDB1> define PDB_Name = "skis"
define PDB_Name = "skis"

prompt Dropping PDB &PDB_Name...

prompt sys@CDB1> alter pluggable database &PDB_Name close;
alter pluggable database &PDB_Name close;
prompt sys@CDB1> drop pluggable database &PDB_Name including datafiles;
drop pluggable database &PDB_Name including datafiles;

prompt sys@CDB1> define PDB_Name = "boards"
define PDB_Name = "boards"

prompt Dropping PDB &PDB_Name...

prompt sys@CDB1> alter pluggable database &PDB_Name close;
alter pluggable database &PDB_Name close;
prompt sys@CDB1> drop pluggable database &PDB_Name including datafiles;
drop pluggable database &PDB_Name including datafiles;

prompt sys@CDB1> define PDB_Name = "wintersports 
define PDB_Name = "wintersports"

prompt Dropping PDB &PDB_Name...

prompt sys@CDB1> alter pluggable database &PDB_Name close ;
alter pluggable database &PDB_Name close ;
prompt sys@CDB1> drop pluggable database &PDB_Name including datafiles;
drop pluggable database &PDB_Name including datafiles;

prompt sys@CDB1> show pdbs
show pdbs
prompt -- Do seed databases get dropped automatically?
prompt -- What happens if you try to drop an app_root if it has tenant PDBs?

prompt sys@CDB1> connect sys/oracle12@//localhost/cdb2 as sysdba
connect sys/oracle12@//localhost/cdb2 as sysdba

@@whoami

prompt sys@CDB2> show pdbs
show pdbs

prompt sys@CDB2> define PDB_Name = "boards_abroad"
define PDB_Name = "boards_abroad"

prompt Dropping PDB &PDB_Name...

prompt sys@CDB2> alter pluggable database &PDB_Name close;
alter pluggable database &PDB_Name close;
prompt sys@CDB2> drop pluggable database &PDB_Name including datafiles;
drop pluggable database &PDB_Name including datafiles;

prompt sys@CDB2> define PDB_Name = "wintersports_abroad"
define PDB_Name = "wintersports_abroad"

prompt Dropping PDB &PDB_Name...

prompt sys@CDB2> alter pluggable database &PDB_Name close ;
alter pluggable database &PDB_Name close ;
prompt sys@CDB2> drop pluggable database &PDB_Name including datafiles;
drop pluggable database &PDB_Name including datafiles;

prompt sys@CDB2> show pdbs
show pdbs

