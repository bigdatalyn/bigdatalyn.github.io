-- =========================================================================
--
--      File: Setup_Lab6.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/18/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 6.
--   Durable Location Transparency.
--
-- Description:
--   Query order count per franchise for specified campaign.
--   Relocate a franchise's PDB.
--   Requery to ensure same answer.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
--   - Script Setup_Lab4 run successfully
--   - Script Setup_Lab5 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear

-- <Hack> ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
-- Hack to work around the problems here.
-- Run the query first silently. The first time around, it does not return enough rows.
set termout off
set echo off
set verify off
@Lab6_Campaign_Performance
-- </Hack> +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

@Profile

-- Phase 1: Run application query:
-- Order volume by franchise.
@Lab6_Campaign_Performance

-- Phase 2. Relocate PDB Tahoe from wmStore_Master to wmStore_West
connect c##system/secret@//localhost/wmStore_West

create pluggable database Tahoe from Tahoe@CDB1_DBLink relocate;

-- Hack - should be able to do this as c##system!
connect c##SysDBA/secret@//localhost/cdb2 as SysDBA
alter pluggable database Tahoe open;

-- Phase 1: Re-run application query:
-- Order volume by franchise.
@Lab6_Campaign_Performance

