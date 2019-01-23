-- =========================================================================
--
--      File: Setup_Lab5.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/19/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 5.
--   Expand into second CDB.
--
-- Description:
--   Invoke script to create Application Root Replica and PDBs
--   in a second CDB.
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

-- Phase 1: Expand deployment into second CDB.
@wm_PDBs_Lab5

-- Phase 2. Add franchise-specific products for new franchises.
@Franchise_Data_Lab5

