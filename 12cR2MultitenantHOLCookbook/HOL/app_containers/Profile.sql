-- =========================================================================
--
--      File: Profile.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 4/8/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Set up SQL Plus or SQL cl.
--   Use this until I can figure out how to get login.sql working again.
--
-- Description:
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--
-- ========================================================================

-- host clear

clear columns
clear breaks
clear computes

ttitle off

set termout on
set lines 132
set pages 56
set feedback 1
set echo off
set verify off
set serveroutput on

-- define Utils   = "/Users/Patrick/OraDocs/OracleDocs/Utils"

--define PDB_Dir = "/media/sf_PDBs"
define PDB_Dir = "/u01/app/oracle/oradata"

define hostname = "localhost"
-- define hostname = "10.146.52.20"

define User_Pass_Lsnr = "c##System/secret@//localhost"


