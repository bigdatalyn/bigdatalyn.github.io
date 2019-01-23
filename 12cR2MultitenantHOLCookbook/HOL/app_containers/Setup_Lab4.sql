-- =========================================================================
--
--      File: Setup_Lab4.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/18/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Show Application Root Clones and Demonstrate Compatibility.
--
-- Description:
--   1. Show Application Root Clone, created during upgrade.
--   2. Attempt to set Application wmStore Compatibility to v2.0.
--      (This will fail because NYC and App Seed are still at v1.0.)
--   3. Upgrade remaining PDBs to v2.0.
--   4. Succeed in setting Application Compatibility to v2.0.
--   5. Confirm that Application Root Clone has now gone.
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

host clear

prompt
prompt Phase 1. Show containers in CDB1.
prompt Notice the Two Proxy ARRs and one Application Root Clone.
prompt

connect c##System/secret@//localhost/cdb1
column con_id format 99
column name format a30 
column open_mode format a12
column restricted format a12
select con_id, name, open_mode, restricted from v$pdbs;

prompt
prompt Phase 2. Connect to Master Application Root and attempt to
prompt set application compatibility to version 2.0.
prompt

connect c##System/secret@//localhost/wmStore_Master
alter pluggable database application wmStore set compatibility version '2.0';

prompt
prompt Phase 3. Upgrade remaining PDBs to v2.0.
prompt

connect c##System/secret@//localhost/NYC
alter pluggable database application wmStore sync;

connect c##System/secret@//localhost/wmStore_Master$Seed
alter pluggable database application wmStore sync;

prompt
prompt Phase 4. Retry setting application compatibility to version 2.0.
prompt

connect c##System/secret@//localhost/wmStore_Master
alter pluggable database application wmStore set compatibility version '2.0';

prompt
prompt Phase 5. Confirm that Application Root Replicas have been removed.
prompt

connect c##System/secret@//localhost/cdb1
column con_id format 99
column name format a30 
column open_mode format a12
column restricted format a12
select con_id, name, open_mode, restricted from v$pdbs; 

