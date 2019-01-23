-- =========================================================================
--
--      File: Setup_Lab7.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/9/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 7.
--
-- Description:
--   Demonstrate the advanced concept of data sharing.
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
--   - Script Setup_Lab4 run successfully
--   - Script Setup_Lab5 run successfully
--   - Script Setup_Lab6 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

-- Phase 1: Upgrade wmStore application to v3.
connect c##system/secret@//localhost/wmStore_Master

alter pluggable database application wmStore begin upgrade '2.0' to '3.0';
@wm_Upgrade_v2_v3
alter pluggable database application wmStore end upgrade;

-- Phase 2. Sync all the PDBs
define Sync_App = wmStore
@Sync_App_PDBs

-- Phase 3: Query products and campaigns prior to upgrade.
prompt Now run @Lab7_Data_Source


