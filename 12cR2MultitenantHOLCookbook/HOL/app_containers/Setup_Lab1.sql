-- =========================================================================
--
--      File: Setup_Lab1.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/19/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 1.
--
-- Description:
--   1. Setup Application Root - wmStore_Master
--   2. Install v1 of Application wmStore in Application Root.
--   3. Create and sync Application Seed and provision Application PDBs for
--      four franchises:
--      - Tulsa
--      - California
--      - Tahoe
--      - NYC
--   4. Populate Application Tenant PDBs with demo data. 
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

-- Phase 0: Setup and Cleanup
@Cleanup

-- Phase 1. Create and Open master Application Root.
connect c##system/secret@//localhost/cdb1

create pluggable database wmStore_Master as application container
admin user wm_admin identified by secret;

alter pluggable database wmStore_Master open;

-- Phase 2. Install v1 of Application wmStore.
connect c##system/secret@//localhost/wmStore_Master

alter pluggable database application wmStore begin install '1.0';
@wm_Install_v1
alter pluggable database application wmStore end install '1.0';

-- Phase 3: Create Application Seed and Provision Application PDBs.
@wm_PDBs_Lab1

-- Phase 4: Populate Application Tenant PDBs with demo data.
@Franchise_Data_Lab1

-- Phase 5: Queries
prompt Now run @Lab1_PDBs_Users
prompt Now run @Lab1_Queries
