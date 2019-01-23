-- =========================================================================
--
--      File: whereami.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 2/4/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Provide information about current user context.
--
-- Description:
--   Provides information about current user context.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
-- 
-- This script will be invoked from within SQL Plus. 
--
-- ========================================================================
--

column c1 format a15 heading "DB Name"
column c2 format a8  heading "CDB Name"
column c3 format a15 heading "App Root"
column c4 format a15 heading "PDB Name"
column c5 format a9  heading "App_Root?"
column c6 format a5  heading "Seed?"
column c7 format a6  heading "Proxy?"
column c8 format a15 heading "Auth ID"
column c9 format a15 heading "Sessn-User"

select Sys_Context('Userenv', 'DB_Name')                c1
,      Sys_Context('Userenv', 'CDB_Name')               c2
,      AR.PDB_Name                                      c3
,      My_PDB.PDB_Name                                  c4
,      My_PDB.Application_Root                          c5
,      My_PDB.Application_Seed                          c6
,      My_PDB.Is_Proxy_PDB                              c7
,      Sys_Context('Userenv', 'Authenticated_Identity') c8
,      Sys_Context('Userenv', 'Session_User')           c9
from DBA_PDBs My_PDB
left outer join DBA_PDBs AR
on My_PDB.Application_Root_Con_ID = AR.Con_ID
where My_PDB.PDB_Name = Sys_Context('Userenv', 'Con_Name')
;

