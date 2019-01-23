-- =========================================================================
--
--      File: 09.DBA_Views.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Show relevant DBA Views.
--
-- Description:
--   Show relevant DBA Views.
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
--   - Script Setup_Lab4 run successfully
--   - Script Setup_Lab5 run successfully
--   - Script Setup_Lab6 run successfully
--   - Script Setup_Lab7 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In Lab9 we introduce some of the DBA Views which are relevant to 
prompt SQL> -- Application Containers. 
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> -- Queries of DBA Views.
prompt SQL> @Lab9_DBA_Views.sql
@Lab9_DBA_Views.sql
