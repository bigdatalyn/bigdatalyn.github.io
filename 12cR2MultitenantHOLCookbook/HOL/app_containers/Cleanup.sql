-- =========================================================================
--
--      File: Cleanup.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/13/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Drop all PDBs & Database Links in CDBs CDB1 & CDB2
--   created in Application Container Labs.
--
-- Description:
--   Drop all PDBs & Database Links created in Application Container Labs.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Two CDBs - CDB1 & CDB2. 
-- 
-- This script will be invoked from within SQL Plus of SQLcl. 
--
-- ========================================================================

@Profile

connect sys/oracle12@//localhost/cdb1 as sysdba

@Drop_DB_Links
@Drop_PDBs
@Drop_Common_Users

connect sys/oracle12@//localhost/cdb2 as sysdba

@Drop_DB_Links
@Drop_PDBs
@Drop_Common_Users

