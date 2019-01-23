-- =========================================================================
--
--      File: Drop_Common_Users.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/13/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Drop all CDB common users.
--
-- Description:
--   Drop all CDB common users.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Two CDBs - CDB1 & CDB2. 
-- 
-- This script will be invoked from within SQL Plus of SQLcl. 
--
-- ========================================================================

drop user c##sysdba;
drop user c##system;

