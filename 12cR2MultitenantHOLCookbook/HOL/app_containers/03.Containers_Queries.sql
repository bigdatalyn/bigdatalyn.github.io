-- =========================================================================
--
--      File: 03.Containers_Queries.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Containers() Queries.
--
-- Description:
--   Containers() Queries.
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
prompt SQL> -- In Lab3 we introduce a very powerful cross-container aggregation
prompt SQL> -- capability - containers() queries. 
prompt SQL> 
prompt SQL> -- Containers() queries allow an application administrator to connect to 
prompt SQL> -- Application Root and aggregate data with a single query across multiple
prompt SQL> -- Application Tenants (Franchises) - or across all of them.
prompt SQL>
prompt SQL> -- This is another example of how Multitenant, with Application Containers,
prompt SQL> -- allows you to manage many Application Tenants as one, when needed.
prompt SQL>
prompt SQL> -- You are now encouraged to execute various queries some queries against the 
prompt SQL> -- various franchise PDBs. 
prompt SQL> -- Sample queries can be found in file Lab3_Containers_Queries.sql.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> -- Containers() Queries
@Lab3_Containers_Queries.sql
