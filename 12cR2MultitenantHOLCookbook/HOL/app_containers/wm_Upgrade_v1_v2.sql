-- =========================================================================
--
--      File: wm_Upgrade_v1_v2.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/22/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Upgrade wmStore Application from v1 to v2.
--
-- Description:
--   Add column wm_Products.Local_Product_YN.
--   Add column wm_Product_Orders.Local_Product_YN.
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
--   - Application wmStore v1 Installed.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

-- Connected to wmStore_Admin

connect wmStore_Admin/secret@//&hostname/wmStore_Master

prompt
prompt Define the application schema
prompt

alter table wm_Products add
(Local_Product_YN char(1)           default 'Y'                   not null
)
;
alter table wm_Products add constraint Local_Product_Bool
check (Local_Product_YN in ('Y','N'))
;

create or replace view wm_Order_Details
-- sharing = metadata
(Order_Number
,Campaign_Name
,Item_Num
,Product_Name
,Local_Product_YN
,Order_Qty
) as
select o.Order_Number
,      c.Name
,      i.Item_Num
,      p.Name
,      p.Local_Product_YN
,      i.Order_Qty
from wm_Orders o
join wm_Order_Items i
on  i.Order_ID = o.Row_GUID
join wm_Products p
on   i.Product_ID = p.Row_GUID
left outer join wm_Campaigns c
on  o.Campaign_ID = c.Row_GUID
;

prompt
prompt Update seed data.
prompt

update wm_Products
set Local_Product_YN = 'N'
where Name in
('Tornado Twisted'
,'Muskogee Magic'
,'Root 66 Beer Float'
,'Yokie Dokie Okie Eggnog'
)
;

commit;

