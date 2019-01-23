-- =========================================================================
--
--      File: 04.Root_Clone_Compatibility.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/27/17 7:53p $
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

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In this lab we explore an important implementation detail of upgrades
prompt SQL> -- within Application Container.
prompt SQL> -- Application Root Clones are used to provide continuous availability 
prompt SQL> -- of Application PDBs during the upgrade of the master Application Root.
prompt SQL> -- The Application Root Clones serve metadata and common data. 
prompt SQL> -- There are no Services associated with an Application Root Clone.
prompt SQL> -- Therefore it is not possible to connect to an Application Root Clone.
prompt SQL> -- However, they are visible, as we shall see in this lab.
prompt SQL>
prompt SQL> -- After the upgrade has completed and all Application PDBs have been synced
prompt SQL> -- it is possible to drop these Application Root Clones. 
prompt SQL> -- This is achieved by setting Application Compatibility to a higher level
prompt SQL> -- than the Application version associated with the Clone. When this has 
prompt SQL> -- happened, the Application Root Clone is of no further use and is dropped. 
prompt SQL>
prompt SQL> -- Let's get started!
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1. Show containers in CDB1.
prompt SQL>

prompt SQL> connect c##System/secret@//localhost/cdb1
connect c##System/secret@//localhost/cdb1
prompt
prompt SQL> show pdbs 
column con_id format 99
column name format a30 
column open_mode format a12
column restricted format a12
select con_id, name, open_mode, restricted from v$pdbs;

prompt
prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- The Application Container has a rather cryptic name!
prompt SQL> -- Notice also wmStore_Master$Seed - the application Seed PDB.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 2. Connect to Master Application Root and attempt to
prompt SQL> -- set application compatible to version 2.0.
prompt SQL>

prompt SQL> connect c##System/secret@//localhost/wmStore_Master
connect c##System/secret@//localhost/wmStore_Master
prompt
prompt SQL> alter pluggable database application wmStore set compatibility version '2.0'
prompt SQL> /
alter pluggable database application wmStore set compatibility version '2.0';

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Notice the error message.
prompt SQL> -- v2.0 is an invalid version for Application Compatibility because there 
prompt SQL> -- is still an Application PDB - NYC - which is not yet at this version.
prompt SQL>
prompt SQL> -- The following query can identify which PDBs are yet to be upgraded.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

column CON_UID               heading "Con UID"          format a12
column APP_NAME              heading "Application Name" format a20          truncate
column APP_ID                heading "App ID"           format 99999
column APP_VERSION           heading "Version"          format a7
column APP_STATUS            heading "Status"           format a12  
column APP_ID                noprint

prompt SQL> select * from DBA_App_PDB_Status
prompt SQL> /
select * from DBA_App_PDB_Status;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Here we see that two PDBs - NYC and wmStore_Master$Seed - are still at  
prompt SQL> -- v1.0.
prompt SQL>
prompt SQL> -- We shall explore more DBA Views relevant to Application Containers in 
prompt SQL> -- Lab 9.  
prompt SQL>
prompt SQL> -- Let's sync the remaining Application PDB, so that all franchises are at 
prompt SQL> -- v2.0. We also need to upgrade the Application Seed PDB.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 3. Upgrade remaining PDBs to v2.0.
prompt SQL>

prompt SQL> connect c##System/secret@//localhost/NYC
connect c##System/secret@//localhost/NYC

prompt
prompt SQL> alter pluggable database application wmStore sync
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> connect c##System/secret@//localhost/wmStore_Master$Seed
connect c##System/secret@//localhost/wmStore_Master$Seed

prompt
prompt SQL> alter pluggable database application wmStore sync
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- All Application PDBs are now at v2.0.
prompt SQL>
prompt SQL> -- We should now be able to set Application Compatibility to v2.0 with no
prompt SQL> -- problem.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt
prompt Phase 4. Retry setting application compatibility to version 2.0.
prompt

prompt SQL> connect c##System/secret@//localhost/wmStore_Master
connect c##System/secret@//localhost/wmStore_Master
prompt
prompt SQL> alter pluggable database application wmStore set compatibility version '2.0'
prompt SQL> /
alter pluggable database application wmStore set compatibility version '2.0';

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Now, let's confirm that Application Root Replicas have been removed.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt
prompt Phase 5. Connect to CDB$Root and show PDBs.
prompt

prompt SQL> -- connect c##System/secret@//localhost/cdb1
connect c##System/secret@//localhost/cdb1

prompt
prompt SQL> -- show pdbs 
column con_id format 99
column name format a30 
column open_mode format a12
column restricted format a12
select con_id, name, open_mode, restricted from v$pdbs;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Review of Application Container Lab4:
prompt SQL> -- In this lab, we have seen the Application Root Clone, automatically 
prompt SQL> -- created during the application upgrade.
prompt SQL> -- By setting Application Compatibility to a version greater than that of the 
prompt SQL> -- Application Root Clone, it is no longer required and is automatically
prompt SQL> -- dropped.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************
