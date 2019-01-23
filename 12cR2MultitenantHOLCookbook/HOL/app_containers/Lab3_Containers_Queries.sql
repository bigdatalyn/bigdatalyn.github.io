-- =========================================================================
--
--      File: Lab3_Containers_Queries.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/20/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Lab 3: Containers() Queries.
--
-- Description:
--   Execute queries from various containers to retrieve data.
--   Intention is to demonstrate aggregation and use of hidden columns.
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

host clear
@Profile

column c1 format a30       heading "Franchise"
column c2 format 9999999   heading "Order #"
column c3 format a30       heading "Campaign"
column c4 format 999999    heading "Item #"
column c5 format a30       heading "Product"
column c6 format 9,999     heading "Qty"
column c7 format 9,999,999 heading "Num Orders"

-- compute sum of c7 on c1 on c3 on c5
-- compute sum of c7 on c1
break on c1 on c3 on c5

column c4 noprint

prompt connect wmStore_Admin/secret@//localhost/wmStore_Master
connect wmStore_Admin/secret@//localhost/wmStore_Master

prompt
prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Aggregate Queries, Issued from Application Root
prompt SQL>
prompt SQL> -- Notice values in column Franchise come from Con$Name.
prompt SQL> -- Remember that containers() queries are executed in Root
prompt SQL> -- and all containers plugged into it.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

ttitle "Campaigns (Across All Franchises)"

set echo on

select con$name c1
,      Name     c3
from containers(wm_Campaigns)
order by 1
,        2
;

set echo off
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

ttitle "Products (Across All Franchises)"

set echo on

select con$name c1
,      Name     c5
from containers(wm_Products)
order by 1
,        2
;

set echo off
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

ttitle "Products (in Tulsa and NYC)"

set echo on

select con$name c1
,      Name     c5
from containers(wm_Products)
where con$name in ('TULSA','NYC')
order by 1
,        2
;

set echo off
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

ttitle "Order Counts Per Campaign (Across All Franchises)"

set echo on

select con$name      c1
,      Campaign_Name c3
,      count(*)      c7
from containers(wm_Order_Details)
group by con$name
,        Campaign_Name
order by 1
,        3 desc
,        2
;

set echo off
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

ttitle "Order Volume Per Product (Across All Franchises)"

set echo on

select con$name      c1
,      Product_Name  c5
,      count(*)      c7
from containers(wm_Order_Details)
group by con$name
,        Product_Name
order by 1
,        3 desc
,        2
;

set echo off
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

