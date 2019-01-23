-- =========================================================================
--
--      File: wm_Install_v1.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/4/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Install v1 of wmStore Application.
--
-- Description:
--   Intall v1 of wmStore Application.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Pre-created CDB with OMF. 
--   - This script will be invoked from within SQL Plus, having connected to 
--     CDB$Root as SysDBA. 
--
-- ========================================================================

create tablespace wmStore_TBS datafile size 100M autoextend on next 10M maxsize 200M;
create user wmStore_Admin identified by secret container=all;
grant create session, dba to wmStore_Admin;
alter user wmStore_Admin default tablespace wmStore_TBS;

-- Connect to Master Application Root and install Application.

connect wmStore_Admin/secret@//localhost/wmStore_Master

prompt
prompt Define the application schema
prompt

create table wm_Campaigns
-- sharing = data
(Row_GUID         raw(16)           default Sys_GUID()                      primary key 
,Name             varchar2(30)                                    not null  unique
)
;

create table wm_Products
-- sharing = extended data
(Row_GUID         raw(16)           default Sys_GUID()                      primary key 
,Name             varchar2(30)                                    not null  unique
)
;

create table wm_Orders
-- sharing = metadata
(Row_GUID         raw(16)           default Sys_GUID()                      primary key 
,Order_Number     number(16,0)      generated always as identity  not null  unique
,Order_Date       date              default   current_date        not null 
,Campaign_ID      raw(16)           
)
;
alter table wm_Orders add constraint wm_Orders_F1 
foreign key (Campaign_ID)
references wm_Campaigns(Row_GUID)
disable
;

create table wm_Order_Items
-- sharing = metadata
(Row_GUID         raw(16)                    default Sys_GUID()           primary key 
,Order_ID         raw(16)           not null
,Item_Num         number(16,0)      not null
,Product_ID       raw(16)           not null
,Order_Qty        number(16,0)      not null
)
;
alter table wm_Order_Items add constraint wm_Order_Items_F1 
foreign key (Order_ID)
references wm_Orders(Row_GUID)
disable
;
alter table wm_Order_Items add constraint wm_Order_Items_F2 
foreign key (Product_ID)
references wm_Products(Row_GUID)
disable
;

create or replace view wm_Order_Details
-- sharing = metadata
(Order_Number
,Campaign_Name
,Item_Num
,Product_Name
,Order_Qty
) as
select o.Order_Number
,      c.Name
,      i.Item_Num
,      p.Name
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
prompt Create seed data.
prompt

-- Campaigns 
insert into wm_Campaigns (Row_GUID, Name) values ('01', 'Locals vs Yokels');
insert into wm_Campaigns (Row_GUID, Name) values ('02', 'Black Friday 2016');
insert into wm_Campaigns (Row_GUID, Name) values ('03', 'Christmas 2016');

-- Products 
insert into wm_Products (Row_GUID, Name) values ('01', 'Tornado Twisted');
insert into wm_Products (Row_GUID, Name) values ('02', 'Muskogee Magic');
insert into wm_Products (Row_GUID, Name) values ('03', 'Root 66 Beer Float');
insert into wm_Products (Row_GUID, Name) values ('04', 'Yokie Dokie Okie Eggnog');

commit;

