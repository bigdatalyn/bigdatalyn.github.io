-- =========================================================================
--
--      File: Setup_Lab8.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 8.
--
-- Description:
-- 1. Patch Application
-- 2. Apply Patch to three PDBs
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
--   - Script Setup_Lab4 run successfully
--   - Script Setup_Lab5 run successfully
--   - Script Setup_Lab6 run successfully
--   - Script Setup_Lab7 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

-- Phase 1: Apply patch 301 to application wmStore.
connect c##system/secret@//localhost/wmStore_Master

alter pluggable database application wmStore begin patch 301;
@wm_Patch_301.sql
alter pluggable database application wmStore end patch;

-- Phase 2. Sync Three of Four Application PDBs (excluding NYC) in wmStore_Master.
connect c##System/secret@//localhost/Tulsa
alter pluggable database application wmStore sync;

connect c##System/secret@//localhost/California
alter pluggable database application wmStore sync;

connect c##System/secret@//localhost/Tahoe
alter pluggable database application wmStore sync;


