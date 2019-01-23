-- =========================================================================
--
--      File: tc_PDBs_Lab11.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/26/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Terminally Chill.
--   Create PDBs required in Lab 11. 
--
-- Description:
--   Provision the Application Root and Application PDBs for four franchises.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

@Profile

prompt
prompt Phase 1a. Provision the Application Root.
prompt

connect c##system/secret@//localhost/cdb1

create pluggable database Terminal_Master as application container
admin user tc_admin identified by secret
create_file_dest='&PDB_Dir';

alter pluggable database Terminal_Master open;

prompt
prompt Phase 1b. Provision the App PDBs for each new Franchise.
prompt

connect c##system/secret@//localhost/Terminal_Master

create pluggable database LHR
admin user tc_admin identified by secret
create_file_dest='&PDB_Dir';

create pluggable database SFO
admin user tc_admin identified by secret
create_file_dest='&PDB_Dir';

create pluggable database JFK
admin user tc_admin identified by secret
create_file_dest='&PDB_Dir';

create pluggable database LAX
admin user tc_admin identified by secret
create_file_dest='&PDB_Dir';

alter session set container=CDB$Root;
alter pluggable database all open;



