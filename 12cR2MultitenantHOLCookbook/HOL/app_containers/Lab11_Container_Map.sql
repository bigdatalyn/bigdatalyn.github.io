-- =========================================================================
--
--      File: Lab11_Container_Map.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Lab 11: Container Map.
--
-- Description:
--   Various queries and DMLs to demonstrate use of container maps.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Application Container installed with applicable PDBs.
--   - Application Root wmStore_Master
--   - Application PDBs for franchises
--     - LHR
--     - SFO
--     - JFK
--     - LAX
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear

column c1 format a30     heading "Airport" 
column c2 format a30     heading "Kiosk"
column c3 format 999,999 heading "Num Orders"

prompt SQL>
prompt SQL> -- Connect to Application Root and route query appropriately.
prompt SQL>

prompt SQL> define PDB = Terminal_Master
define PDB = Terminal_Master
prompt SQL> connect Terminal_Admin/secret@//localhost/&PDB
connect Terminal_Admin/secret@//localhost/&PDB

prompt
prompt SQL> 
prompt SQL> Query 1. Queries against &PDB.
prompt SQL> 

define Kiosk = "LAX INTL"
ttitle "Order Count in Kiosk &Kiosk in Past Year"

prompt SQL> select count(*) c3
prompt SQL> from tc_Orders
prompt SQL> where Order_Date > current_date-365
prompt SQL> and   Kiosk_Code = '&Kiosk'
prompt SQL> /
select count(*)
from tc_Orders
where Order_Date > current_date-365
and   Kiosk_Code = '&Kiosk'
;

prompt
prompt Query 2. Implicitly use containers() to aggregate.
prompt

ttitle "Order Count in Subset of Kiosks in Past Year"

prompt SQL> select o.Kiosk_Code c2
prompt SQL> ,      count(*)     c3
prompt SQL> from tc_Orders o
prompt SQL> where o.Kiosk_Code in ('SFO INTL','LHR T5')
prompt SQL> and   o.Campaign_Code = 'Foreign Getaway'
prompt SQL> and   o.Order_Date > current_date-365
prompt SQL> group by o.Kiosk_Code
prompt SQL> /
select o.Kiosk_Code c2
,      count(*)     c3
from tc_Orders o
where o.Kiosk_Code in ('SFO INTL','LHR T5')
and   o.Campaign_Code = 'Foreign Getaway'
and   o.Order_Date > current_date-365
group by o.Kiosk_Code
;

/*
prompt
prompt Phase 8c. DML via Containers()
prompt Need a better example than this.
prompt

prompt SQL> update tc_Coupons
prompt SQL> set status = ‘Expired’
prompt SQL> where Expiration_Date <= current_date;
prompt SQL> and   Kiosk_Code = ‘JFK T2’
prompt SQL> /
update tc_Coupons
set status = ‘Expired’
where Expiration_Date <= current_date;
and   Kiosk_Code = ‘JFK T2’
; 
*/
