-- =========================================================================
--
--      File: Lab6_Campaign_Performance.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/18/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Query to retrieve a business-wide count of Orders for a specific campaign.
--
-- Description:
--   Query to retrieve a business-wide count of Orders for a specific campaign.
--   Demonstrate "durable location transparency".
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
--   - Script Setup_Lab4 run successfully
--   - Script Setup_Lab5 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

set verify off

define Campaign = "Locals vs Yokels"

column c1 format a30       heading "Franchise"
column c2 format a10       heading "CDB"
column c3 format 9,999,999 heading "Num Orders"

connect wmStore_Admin/secret@//localhost/wmStore_Master

ttitle "Business-Wide Count of Orders for Campaign &Campaign"

select con$name c1
,      cdb$name c2
,      count(*) c3
from containers(wm_Orders) o
,    wm_Campaigns c
where o.Campaign_id = c.row_guid
and   c.Name = '&Campaign'
group by con$name
,        cdb$name
order by 3 desc
,        1
;
