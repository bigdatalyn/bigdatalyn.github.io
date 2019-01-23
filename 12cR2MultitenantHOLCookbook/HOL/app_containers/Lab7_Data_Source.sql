-- =========================================================================
--
--      File: Lab7_Data_Source.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/9/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Show data source of tables with different sharing modes.
--
-- Description:
--   Execute queries against various tables to show their sharing modes.
--   Demonstrate use of hidden columns.
--   Run this before and after changing the sharing types.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Application Container installed with applicable Containers.
--   - Application Root wmStore_Master
--   - Application Containers for franchises
--     - 
--   - Application wmStore v1 Installed.
--   - Application wmStore upgraded to v2.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear

-- Retrieve object definitions

define Container = CDB1
connect c##system/secret@//localhost/&Container

prompt
prompt Phase 1. Queries against &Container.
prompt

column c01 format 999999 heading "Con_ID"
column c02 format a30    heading "Container"

ttitle "Containers"

select Con_ID c01
,      Name   c02
from v$containers
order by 1;

define Container = wmStore_Master
connect wmStore_Admin/secret@//localhost/&Container

prompt
prompt Phase 2. Queries against &Container.
prompt

column c03 format a30    heading "Table Name"
column c04 format a20    heading "Sharing Type"

ttitle "Sharing Modes for Campaigns, Products and Orders"

select Object_Name c03
,      Sharing     c04
from DBA_Objects
where Owner = User
and   Object_Name in ('WM_CAMPAIGNS','WM_PRODUCTS','WM_ORDERS')
order by Object_Name
;

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

define Container = Tulsa
connect wmStore_Admin/secret@//localhost/&Container

prompt
prompt Phase 3a. Queries against &Container.
prompt

column c1 format 99999999999999 heading "Origin Con_ID"
column c2 format a30            heading "Product"

ttitle "Products Visible in Franchise &Container"

prompt SQL> select Origin_Con_ID c1
prompt SQL> ,      Name          c2
prompt SQL> from wm_Products
prompt SQL> /
select ROW_GUID c1
,      Name          c2
from wm_Products
;

