-- =========================================================================
--
--      File: 05.Expansion_ARRs.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/20/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 5.
--
-- Description:
-- Phase 1. Create and Open Application Root Replicas (ARRs):
--          - wmStore_International
--          - wmStore_West
-- Phase 2. Create Proxy PDBs for the ARRs.
-- Phase 3. Synchronize the ARRs via their proxies.
-- Phase 4. Create App Seeds for the ARRs.
-- Phase 5. Provision the App PDBs for five new franchises.
-- Phase 6. Add franchise-specific products for new franchises.
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
--   - Script Setup_Lab4 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In this lab we follow the global expansion of Walt's Malts.
prompt SQL> -- In order to comply with requirements of data sovereignty and latency
prompt SQL> -- Walt's Malts has had to expand into a second CDB, CDB2. 
prompt SQL> -- (In reality this would be in a separate server.)
prompt SQL>
prompt SQL> -- Let's get started!
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1. Create and Open Application Root Replicas in CDB2
prompt SQL>

prompt SQL> -- Connect to CDB2's Root. 
prompt SQL> -- Create the CDB$Root-level DB Link.
prompt SQL> -- Create and open the Application Root Replicas (ARRs).
prompt SQL>

prompt connect c##system/secret@//localhost/cdb2
connect c##system/secret@//localhost/cdb2

prompt
prompt SQL> create public database link CDB1_DBLink 
prompt SQL> connect to c##System identified by secret using 'cdb1';
prompt SQL> /
create public database link CDB1_DBLink 
connect to c##System identified by secret using 'cdb1';

prompt SQL> create pluggable database wmStore_International as application container
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database wmStore_International as application container
admin user wm_admin identified by secret;

prompt SQL> create pluggable database wmStore_West as application container
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database wmStore_West as application container
admin user wm_admin identified by secret;

prompt SQL> alter pluggable database all open;
prompt SQL> /
alter pluggable database all open;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In the previous section we have done the following:
prompt SQL> -- 1. Connected to CDB2's Root. 
prompt SQL> -- 2. Created the CDB$Root-level DB Link.
prompt SQL> -- 3. Created and opened the Application Root Replicas (ARRs).
prompt SQL>
prompt SQL> -- Application Root Replicas are required to serve metadata for Application
prompt SQL> -- Tenant (Franchise) PDBs in remote CDBs.
prompt SQL> -- This is because it is not realistic to assume continuous very low latency 
prompt SQL> -- access across the internet to a remote Application Root.  
prompt SQL>
prompt SQL> -- Next, we create Proxy PDBs for these Application Root Replicas in the 
prompt SQL> -- Master Application Root.
prompt SQL>
prompt SQL> -- Let's proceed...
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 2. Create DB Link and Proxy PDBs for Application Root Replicas in 
prompt SQL> --          CDB1
prompt SQL>

prompt SQL> -- Connect to CDB1's Root.
prompt SQL> -- Create the CDB$Root-level DB Link to CDB2.

prompt SQL> connect c##system/secret@//localhost/cdb1
connect c##system/secret@//localhost/cdb1

prompt
prompt SQL> create public database link CDB2_DBLink 
prompt SQL> connect to c##System identified by secret using 'cdb2';
prompt SQL> /
create public database link CDB2_DBLink 
connect to c##System identified by secret using 'cdb2';

prompt SQL> -- Connect to wmStore_Master as C##System.
prompt SQL> -- Create the Application-Root-level DB Links to CDB2.
prompt SQL> -- Create and open Proxy PDBs for the Application Root Replicas.

prompt
prompt SQL> connect c##system/secret@//localhost/wmStore_Master
connect c##system/secret@//localhost/wmStore_Master

prompt
prompt SQL> create public database link CDB2_DBLink 
prompt SQL> connect to c##System identified by secret using 'cdb2'
prompt SQL> /
create public database link CDB2_DBLink 
connect to c##System identified by secret using 'cdb2';

prompt SQL> create pluggable database wmStore_International_Proxy
prompt SQL> as proxy from wmStore_International@CDB2_DBLink
prompt SQL> /
create pluggable database wmStore_International_Proxy
as proxy from wmStore_International@CDB2_DBLink;

prompt SQL> create pluggable database wmStore_West_Proxy
prompt SQL> as proxy from wmStore_West@CDB2_DBLink
prompt SQL> /
create pluggable database wmStore_West_Proxy
as proxy from wmStore_West@CDB2_DBLink;

prompt SQL> alter pluggable database all open;
prompt SQL> /
alter pluggable database all open;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In the previous section we have done the following:
prompt SQL> -- 1. Connected to wmStore_Master as C##System.
prompt SQL> -- 2. Created the Application-Root-level DB Links to CDB2.
prompt SQL> -- 3. Created and opened Proxy PDBs for the Application Root Replicas.
prompt SQL> -- Notice the syntax for creating the proxy PDBs, using the phrase "as proxy".
prompt SQL>
prompt SQL> -- Next, we sync the ARRs via their Proxies.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> 
prompt SQL> -- Phase 3. Synchronize the ARRs via their proxies.
prompt SQL> 

prompt SQL> connect c##system/secret@//localhost/wmStore_International_Proxy
connect c##system/secret@//localhost/wmStore_International_Proxy

prompt
prompt SQL> alter pluggable database application wmStore sync
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> connect c##system/secret@//localhost/wmStore_West_Proxy
connect c##system/secret@//localhost/wmStore_West_Proxy
prompt
prompt SQL> alter pluggable database application wmStore sync
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- The Application Root Replicas are now synchronized with the master.
prompt SQL> -- Now we can create Seeds for each ARR.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 4. Create and open the Application Seed PDBs,
prompt SQL> --          and sync them with Application wmStore.
prompt SQL>

prompt SQL> -- Phase 4a. ARR: wmStore_International

prompt SQL> connect c##system/secret@//localhost/wmStore_International
connect c##system/secret@//localhost/wmStore_International

prompt
prompt SQL> create pluggable database as seed
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database as seed
admin user wm_admin identified by secret;

-- Hack - should be able to do this as c##system!
prompt SQL> connect c##SysDBA/secret@//localhost/wmStore_International as SysDBA
connect c##SysDBA/secret@//localhost/wmStore_International as SysDBA

prompt
prompt SQL> alter pluggable database wmStore_International$Seed open
prompt SQL> /
alter pluggable database wmStore_International$Seed open;

prompt SQL> connect c##system/secret@//localhost/wmStore_International$Seed
connect c##system/secret@//localhost/wmStore_International$Seed

prompt
prompt SQL> alter pluggable database application wmStore sync
prompt SQL> /
alter pluggable database application wmStore sync;

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> -- Phase 4b. ARR: wmStore_West

prompt SQL> connect c##system/secret@//localhost/wmStore_West
connect c##system/secret@//localhost/wmStore_West

prompt
prompt SQL> create pluggable database as seed
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database as seed
admin user wm_admin identified by secret;

-- Hack - should be able to do this as c##system!
prompt SQL> connect c##SysDBA/secret@//localhost/wmStore_West as SysDBA
connect c##SysDBA/secret@//localhost/wmStore_West as SysDBA

prompt
prompt SQL> alter pluggable database wmStore_West$Seed open
prompt SQL> /
alter pluggable database wmStore_West$Seed open;

prompt SQL> connect c##system/secret@//localhost/wmStore_West$Seed
connect c##system/secret@//localhost/wmStore_West$Seed

prompt
prompt SQL> alter pluggable database application wmStore sync
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Now, with extra capacity (in the right geographic location)
prompt SQL> -- we are ready to create additional Application PDBs for the new tenants / 
prompt SQL> -- franchises added during the international expansion of Walt's Malts.
prompt SQL>
prompt SQL> -- The next several steps accomplish this.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 5. Provision the App PDBs for each new Franchise.
prompt SQL>
prompt SQL> -- In this phase we need to do the following:
prompt SQL> -- 1. Connect to the appropriate Application Root Replica (ARR)
prompt SQL> -- 2. Create a database link from that ARR to the CDB of the Master Root.
prompt SQL> -- 3. Provision Application PDBs for each tenant / franchise as needed.
prompt SQL>

prompt
prompt SQL>
prompt SQL> -- Phase 5a. Application Root Replica - wmStore_International.
prompt SQL>

prompt SQL> connect c##system/secret@//localhost/wmStore_International
connect c##system/secret@//localhost/wmStore_International

prompt
prompt SQL> create public database link CDB1_DBLink 
prompt SQL> connect to c##System identified by secret using 'cdb1';
prompt SQL> /
create public database link CDB1_DBLink 
connect to c##System identified by secret using 'cdb1';

prompt SQL> create pluggable database UK
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database UK
admin user wm_admin identified by secret;

prompt SQL> create pluggable database Denmark
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database Denmark
admin user wm_admin identified by secret;

prompt SQL> create pluggable database France
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database France
admin user wm_admin identified by secret;

prompt SQL>
prompt SQL> -- Phase 5b. Application Root Replica - wmStore_West.
prompt SQL>

prompt SQL> connect c##system/secret@//localhost/wmStore_West
connect c##system/secret@//localhost/wmStore_West

prompt
prompt SQL> create public database link CDB1_DBLink 
prompt SQL> connect to c##System identified by secret using 'cdb1';
prompt SQL> /
create public database link CDB1_DBLink 
connect to c##System identified by secret using 'cdb1';

prompt SQL> create pluggable database Santa_Monica
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database Santa_Monica
admin user wm_admin identified by secret;

prompt SQL> create pluggable database Japan
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database Japan
admin user wm_admin identified by secret;

prompt SQL>
prompt SQL> -- Phase 5c. Switch to the CDB Root and open all new PDBs.
prompt SQL>

prompt SQL> alter session set container=CDB$Root;
prompt SQL> /
alter session set container=CDB$Root;
prompt SQL> alter pluggable database all open;
prompt SQL> /
alter pluggable database all open;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Now we'll go to each tenant PDB in turn and add some franchise-specific
prompt SQL> -- data. This is for demonstration purposes only. This is not part of the 
prompt SQL> -- application definition. It merely simulates the creation of data which 
prompt SQL> -- in the usual course of events would be defined through the application
prompt SQL> -- itself. This demo data will be added by the execution of scripts.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 6: Create franchise-specific data.
prompt SQL>

@Franchise_Data_Lab5

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Review of Application Container Lab5:
prompt SQL> -- In this lab, we have worked through the expansion of the application
prompt SQL> -- beyond a single CDB. This followed the following stages:
prompt SQL> -- 1. Create and Open Application Root Replicas (ARRs):
prompt SQL> --    - wmStore_International
prompt SQL> --    - wmStore_West
prompt SQL> -- 2. Create Proxy PDBs for the ARRs.
prompt SQL> -- 3. Synchronize the ARRs via their proxies.
prompt SQL> -- 4. Create App Seeds for the ARRs.
prompt SQL> -- 5. Provision the App PDBs for five new franchises.
prompt SQL> -- 6. Add franchise-specific products for new franchises.
prompt SQL>
prompt SQL> -- It is very important to note that we still only have a single master
prompt SQL> -- application definition, despite the application now being deployed across
prompt SQL> -- multiple CDBs. 
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************
