-- =========================================================================
--
--      File: wm_PDBs_Lab1.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/20/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Create the first batch of Application PDBs, for franchises: 
--   - Tulsa
--   - California
--   - Tahoe
--   - NYC
--
-- Description:
-- Phase 3.1. Create and Open Application Seed.
-- Phase 3.2. Sync Application Seed with Application wmStore.
-- Phase 3.3. Provision the App PDBs for four franchises.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Two pre-created CDBs with OMF: CDB1 & CDB2.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

@Profile

-- Phase 3.1. Create and open the Master Application Seed PDB.

connect c##system/secret@//localhost/wmStore_Master

create pluggable database as seed
admin user wm_admin identified by secret;

-- Hack - should be able to do this as c##system!
connect c##SysDBA/secret@//localhost/wmStore_Master as SysDBA

alter pluggable database wmStore_Master$Seed open;

-- Phase 3.2. Sync the Application Seed with Application wmStore.
connect c##system/secret@//localhost/wmStore_Master$Seed

alter pluggable database application wmStore sync;

-- Phase 3.3. Provision the App PDBs for each Franchise.
connect wmStore_Admin/secret@//localhost/wmStore_Master

create pluggable database Tulsa
admin user wm_admin identified by secret;

create pluggable database California
admin user wm_admin identified by secret;

create pluggable database Tahoe
admin user wm_admin identified by secret;

create pluggable database NYC
admin user wm_admin identified by secret;

-- Phase 3.3. Open all new franchise PDBs.
connect c##system/secret@//localhost/wmStore_Master
alter pluggable database all open;

