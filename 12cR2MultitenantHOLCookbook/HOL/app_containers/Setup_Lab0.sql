-- =========================================================================
--
--      File: Setup_Lab0.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/11/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Set up CDB2 in preparation for labs.
--
-- Description:
--   Set up users, etc..
--   This only needs to be run once for each VM (or perhaps in the master VM).
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================
--

host clear

@Demo_Users.sql
