-- =========================================================================
--
--      File: Lab9_DBA_Views.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Show DBA Views.
--
-- Description:
-- Show some important DBA Views, which can be used in problem diagnosis.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================
--

host clear
@Profile
set linesize 180

column c1  heading "Con ID"             format 9999
column c2  heading "PDB Name"           format a30
column c3  heading "PDB ID"             format a10
column c3  noprint
column c4  heading "Con UID"            format a12
column c5  heading "Status"             format a10
column c6  heading "Root?"              format a5
column c7  heading "App PDB?"           format a8
column c8  heading "Seed?"              format a5
column c9  heading "Root Clone?"        format a11
column c10 heading "Proxy?"             format a6
column c11 heading "App Container Name" format a30

set echo on

connect c##System/secret@//localhost/CDB1

desc DBA_PDBs

select P.Con_ID             c1
,      P.PDB_Name           c2
,      P.PDB_ID             c3
,      P.CON_UID            c4
,      P.Status             c5
,      P.Application_Root   c6
,      P.Application_PDB    c7
,      P.Application_Seed   c8
,      P.Application_Clone  c9
,      P.Is_Proxy_PDB       c10
,      AC.PDB_Name          c11
from DBA_PDBs P
left outer join DBA_PDBs AC
on AC.Con_ID = P.Application_Root_Con_ID
order by 6 desc
,        9
,        8 desc
,        10 desc
,        7 desc
,        2
,        8
;

set echo off

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- There are lots of columns in DBA_PDBs, but those shown are among the most
prompt SQL> -- relevant to work with Application Containers.
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
column APP_VERSION_COMMENT   heading "Comment"          format a50
column APP_STATUS            heading "Status"           format a12  
column APP_IMPLICIT          heading "Implicit"         format a8
column APP_CAPTURE_SERVICE   heading "Capture Svc"      format a30
column APP_CAPTURE_MODULE    heading "Capture Mod"      format a15
column PATCH_NUMBER          heading "Patch #"          format 999999
column PATCH_MIN_VERSION     heading "Min Vers"         format a8
column PATCH_STATUS          heading "Status"           format a10  
column PATCH_COMMENT         heading "Comment"          format a50
column ORIGIN_CON_ID         heading "Origin_Con_ID"    format 999999999999        
column STATEMENT_ID          heading "Stmt ID"          format 999999
column CAPTURE_TIME          heading "Capture TS"       format a9          
column APP_STATEMENT         heading "SQL Statement"    format a50          truncate    
column ERRORNUM              heading "Error #"          format 999999         
column ERRORMSG              heading "Error Message"    format a50          truncate
column SYNC_TIME             heading "Sync TS"          format a9

set echo on
connect c##System/secret@//localhost/wmStore_Master
-- connect c##System/secret@//localhost/Terminal


desc DBA_Applications

select * from DBA_Applications;

set echo off

-- desc DBA_Application_Roles

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- wmStore is defined here of course.
prompt SQL> -- The more cryptically-named application is the "default application".
prompt SQL> -- Any "application action" - essentially DDL or DML - in Application Root 
prompt SQL> -- is associated with an Application. If one is not explicitly specified  
prompt SQL> -- in a "begin / end" block, then these application actions are associated  
prompt SQL> -- with the default Application. 
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

set echo on

desc DBA_App_Versions

select * from DBA_App_Versions;

set echo off

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Besides the default application, described above, we see three rows for
prompt SQL> -- application wmStore here - one each for versions 1.0, 2.0 and 3.0.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

set echo on

desc DBA_App_Patches

select * from DBA_App_Patches;

set echo off

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Similarly, we see the definition of Patch 301. 
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

set echo on

desc DBA_App_PDB_Status

select * from DBA_App_PDB_Status;

set echo off

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- DBA_App_PDB_Status shows us which versions and patches have been applied to
prompt SQL> -- which PDBs, with the status in each case.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

set echo on

desc DBA_App_Statements

select * from DBA_App_Statements;

set echo off

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- DBA_App_Statements shows the various SQL statements that have been 
prompt SQL> -- "captured" in Application Root, in various Application Actions.
prompt SQL> -- These can then be replayed to sync the various Application PDBs.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

set echo on

desc DBA_App_Errors

select * from DBA_App_Errors;

set echo off

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- DBA_App_Errors will record which statements have failed during a sync.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

