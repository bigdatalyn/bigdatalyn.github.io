-- =========================================================================
--
--      File: wm_PDBs_Lab5.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/20/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Create PDBs required in Lab 5. 
--
-- Description:
-- Phase 1. Create and Open Application Root Replicas (ARRs):
--          - wmStore_International
--          - wmStore_West
-- Phase 2. Create Proxy PDBs for the ARRs.
-- Phase 3. Synchronize the ARRs via their proxies.
-- Phase 4. Create App Seeds for the ARRs.
-- Phase 5. Provision the App PDBs for five new franchises.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Two pre-created CDBs with OMF: CDB1 & CDB2.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

@Profile

prompt
prompt Phase 1. Create and Open Application Root Replicas in CDB2
prompt

-- Connect to CDB2's Root. 
-- Create the CDB$Root-level DB Link.
-- Create and open the Application Root Replicas (ARRs).

connect c##system/secret@//localhost/cdb2

create public database link CDB1_DBLink 
connect to c##System identified by secret using 'cdb1';

create pluggable database wmStore_International as application container
admin user wm_admin identified by secret;

create pluggable database wmStore_West as application container
admin user wm_admin identified by secret;

alter pluggable database all open;

prompt
prompt Phase 2. Create DB Link and Proxy PDBs for Application Root Replicas in CDB1
prompt

-- Connect to CDB1's Root.
-- Create the CDB$Root-level DB Link to CDB2.

connect c##system/secret@//localhost/cdb1

create public database link CDB2_DBLink 
connect to c##System identified by secret using 'cdb2';

-- Connect to wmStore_Master as C##System.
-- Create the Application-Root-level DB Link to CDB2.
-- Create and open the Master Application Seed PDB.
-- Create and open Proxy PDBs for the Application Root Replicas.

connect c##system/secret@//localhost/wmStore_Master

create public database link CDB2_DBLink 
connect to c##System identified by secret using 'cdb2';

create pluggable database wmStore_International_Proxy
as proxy from wmStore_International@CDB2_DBLink;

create pluggable database wmStore_West_Proxy
as proxy from wmStore_West@CDB2_DBLink;

alter pluggable database all open;

prompt
prompt Phase 3. Synchronize the ARRs via their proxies.
prompt

connect c##system/secret@//localhost/wmStore_International_Proxy
alter pluggable database application wmStore sync;

connect c##system/secret@//localhost/wmStore_West_Proxy
alter pluggable database application wmStore sync;

prompt
prompt Phase 4. Create and open the Application Seed PDBs.
prompt

-- Phase 4a. ARR: wmStore_International

connect c##system/secret@//localhost/wmStore_International

create pluggable database as seed
admin user wm_admin identified by secret;

-- Hack - should be able to do this as c##system!
connect c##SysDBA/secret@//localhost/wmStore_International as SysDBA
alter pluggable database wmStore_International$Seed open;

connect c##system/secret@//localhost/wmStore_International$Seed
alter pluggable database application wmStore sync;

-- Phase 4b. ARR: wmStore_West

connect c##system/secret@//localhost/wmStore_West

create pluggable database as seed
admin user wm_admin identified by secret;

-- Hack - should be able to do this as c##system!
connect c##SysDBA/secret@//localhost/wmStore_West as SysDBA
alter pluggable database wmStore_West$Seed open;

connect c##system/secret@//localhost/wmStore_West$Seed
alter pluggable database application wmStore sync;

prompt
prompt Phase 5. Provision the App PDBs for each new Franchise.
prompt

connect c##system/secret@//localhost/wmStore_International

create public database link CDB1_DBLink 
connect to c##System identified by secret using 'cdb1';

create pluggable database UK
admin user wm_admin identified by secret;

create pluggable database Denmark
admin user wm_admin identified by secret;

create pluggable database France
admin user wm_admin identified by secret;

connect c##system/secret@//localhost/wmStore_West

create public database link CDB1_DBLink 
connect to c##System identified by secret using 'cdb1';

create pluggable database Santa_Monica
admin user wm_admin identified by secret;

create pluggable database Japan
admin user wm_admin identified by secret;

alter session set container=CDB$Root;
alter pluggable database all open;



