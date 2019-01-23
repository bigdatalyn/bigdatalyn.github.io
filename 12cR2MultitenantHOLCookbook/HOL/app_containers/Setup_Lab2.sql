-- =========================================================================
--
--      File: Setup_Lab2.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 2.
--
-- Description:
--   1. Upgrade application wmStore to v2. 
--   2. Synchronize three of four Application Tenant PDBs with v2.
--      NYC will not be upgraded at this stage.
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

-- Phase 1: Upgrade Application.
-- Connect to Master Application Root and upgrade Application.

connect c##system/secret@//localhost/wmStore_Master

alter pluggable database application wmStore begin upgrade '1.0' to '2.0';
@wm_Upgrade_v1_v2
alter pluggable database application wmStore end upgrade;

-- Phase 2. Sync Three of Four Application PDBs (excluding NYC).
connect c##System/secret@//localhost/Tulsa
alter pluggable database application wmStore sync;

connect c##System/secret@//localhost/California
alter pluggable database application wmStore sync;

connect c##System/secret@//localhost/Tahoe
alter pluggable database application wmStore sync;

-- Phase 3: Queries
prompt Now run @Lab2_Products_Tulsa_NYC
prompt Now run @Lab2_Locals_vs_Yokels
