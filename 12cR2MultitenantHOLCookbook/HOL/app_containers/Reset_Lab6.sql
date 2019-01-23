-- =========================================================================
--
--      File: Reset_Lab6.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/31/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Reset following Workshop Lab 6.
--
-- Description:
--   Relocate Tahoe back to wmStore_Master.
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

connect c##system/secret@//localhost/wmStore_Master

create pluggable database Tahoe from Tahoe@CDB2_DBLink relocate;

connect c##SysDBA/secret@//localhost/cdb1 as SysDBA
alter pluggable database Tahoe open;

