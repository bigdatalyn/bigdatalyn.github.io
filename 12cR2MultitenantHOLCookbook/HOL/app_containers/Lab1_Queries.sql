-- =========================================================================
--
--      File: Lab1_Queries.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/20/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Sample queries for lab1.
--
-- Description:
--   Execute queries from various containers to retrieve data.
--   Intention is to demonstrate that we have independent tenants with the same
--   application definition.
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
--

host clear
@Profile

column c1 format a30       heading "Franchise"
column c2 format 9999999   heading "Order #"
column c3 format a30       heading "Campaign"
column c4 format 999999    heading "Item #"
column c5 format a30       heading "Product"
column c6 format 9,999     heading "Qty"
column c7 format 9,999,999 heading "Num Orders"

column c4 noprint

prompt
prompt Perform queries against various franchises.
prompt ===================================================================================
prompt
prompt Franchise names are:
prompt Tulsa
prompt California
prompt Tahoe
prompt NYC
prompt

accept Franchise prompt "Enter name of Franchise from this list: "

connect wmStore_Admin/secret@//localhost/&Franchise

prompt
prompt Queries against franchise &Franchise.
prompt ===================================================================================
prompt

ttitle "Campaigns in &Franchise"

set echo on

select Name c3
from wm_Campaigns
order by 1
;

set echo off
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

ttitle "Products in &Franchise"

set echo on

select Name c5
from wm_Products
order by 1
;

set echo off
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

ttitle "Sample of 20 Orders in &Franchise"

column c4 noprint

break on c1 on c2 on c3

-- Hint, you may be interested to try different sort orders of these rows.

set echo on

select *
from (select o.Order_Number c2
     ,       c.Name         c3
     ,       i.Item_Num     c4
     ,       p.Name         c5
     ,       i.Order_Qty    c6
     from wm_Orders o
     left outer join wm_Campaigns c
     on  o.Campaign_ID = c.Row_GUID
     left outer join wm_Order_Items i
     on  i.Order_ID = o.Row_GUID
     join wm_Products p
     on   i.Product_ID = p.Row_GUID
     order by 1, 2, 3, 4
     -- order by 2, 3, 4
     -- order by 3, 4
)
where rownum <=20
;

set echo off
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

ttitle "Order Counts Per Campaign in &Franchise"

set echo on

select Campaign_Name c3
,      count(*)      c7
from wm_Order_Details
group by Campaign_Name
order by 2 desc
;

set echo off
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

ttitle "Product Order Volume in &Franchise"

set echo on

select Product_Name   c5
,      sum(Order_Qty) c6
from wm_Order_Details
group by Product_Name
order by 2 desc
;

set echo off
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

column c10 format a13     heading "Recipe Origin'
column c11 format 999,999 heading "Order Qty"

ttitle "Scoreboard for Locals vs. Yokels in &Franchise"

set echo on

select decode(Product_Name
             ,'Tornado Twisted','Yokels'
             ,'Muskogee Magic','Yokels'
             ,'Root 66 Beer Float','Yokels'
             ,'Yokie Dokie Okie Eggnog','Yokels'
             ,'Locals'
             )                                        c10
,      sum(Order_Qty)                                 c11
from wm_Order_Details
group by decode(Product_Name
               ,'Tornado Twisted','Yokels'
               ,'Muskogee Magic','Yokels'
               ,'Root 66 Beer Float','Yokels'
               ,'Yokie Dokie Okie Eggnog','Yokels'
               ,'Locals'
               )
order by 2 desc
;

set echo off

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- You can re-run these queries against a different franchise by typing:
prompt SQL> -- @Lab1_Queries.sql
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************



