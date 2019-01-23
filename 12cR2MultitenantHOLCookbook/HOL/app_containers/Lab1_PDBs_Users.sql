-- =========================================================================
--
--      File: Lab1_PDBs_Users.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/20/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Show PDBs and Common and Local Users.
--
-- Description:
-- 1. Show PDBs created so far, including the name of the Application Seed.
-- 2. Show various users, including Application Common Users and Local Users.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Application Container installed with applicable PDBs.
--   - Application Root wmStore_Master
--   - Application PDBs for franchises
--     - Tulsa
--     - California
--     - Tahoe
--     - NYC
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================
--

host clear
@Profile

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Phase 1. Show PDBs created so far.
prompt SQL>
prompt SQL> -- ===========================================================================
prompt

set echo on
connect c##System/secret@//localhost/cdb1

show pdbs 

set echo off

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Notice the name of the Application Seed database.
prompt SQL> -- Recall from the lab that there was no opportunity to specify the name of
prompt SQL> -- Application Seed.
prompt SQL> -- The name is always that of the Application Root with a suffix of $SEED.
prompt SQL>
prompt SQL> -- ===========================================================================
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt
prompt Phase 2. Application Users
prompt ===================================================================================
prompt

@whereami

set echo on

show user

alter session set container=wmStore_Master;

set echo off
prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- The previous statement succeeded because c##System is a CDB Common User
prompt SQL> -- with Set Container privilege in all containers.
prompt SQL>
prompt SQL> -- Now Let's connect to wmStore_Admin in the Application Root.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

set echo on

connect wmStore_Admin/secret@//localhost/wmStore_Master

alter session set container = Tulsa;

set echo off
prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- The previous statements succeeded because wmStore_Admin is an Application
prompt SQL> -- Common user. In fact all users created within an Application Root are by
prompt SQL> -- definition Application Common users.
prompt SQL> -- Application Common users may connect to an Application PDB in the same
prompt SQL> -- Application Container.
prompt SQL> -- However, they may not connect to any containers outside the Application
prompt SQL> -- Container.
prompt SQL>
prompt SQL> -- The following statement should therefore fail.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

set echo on

alter session set container = CDB$Root;

set echo off
prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Now let's experiment with the Admin Users in the Application PDBs.
prompt SQL> -- Recall that an Admin User is specified along with the creation of every new
prompt SQL> -- PDB, including Application PDBs. In these labs, Application PDBs are 
prompt SQL> -- provisioned with statements similar to this (which we'll comment out here):
prompt
prompt SQL> -- create pluggable database Tulsa
prompt SQL> -- admin user wm_admin identified by secret
prompt SQL> -- /
prompt
prompt SQL>
prompt SQL> -- Let's experiment with these users a little.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

set echo on

connect wm_admin/secret@//localhost/Tulsa

connect wm_admin/secret@//localhost/California

alter session set container = Tulsa;

set echo off
prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Notice that the direct connections were successful.
prompt SQL> -- We used the same username and password in each case.
prompt SQL> -- However, these are local users and technically it's purely coincidental 
prompt SQL> -- that they have the same username and password.
prompt SQL>
prompt SQL> -- The alter session set container statement failed because they are not 
prompt SQL> -- common users.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************




