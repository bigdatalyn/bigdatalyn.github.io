-- =========================================================================
--
--      File: wm_Patch_301.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/22/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Patch wmStore Application.
--
-- Description:
-- 1. Add column for financial quarter to wm_Orders.
-- 2. Add index to wm_Orders.
-- 3. Update wm_Orders data with value for new column.
-- 4. (Cannot update views because create or replace cannot work in a patch.)
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Application Container installed with applicable PDBs.
--   - Application Root wmStore_Master
--   - Application PDBs for franchises
--     - 
--   - Application wmStore v1 Installed.
--   - Application wmStore upgraded to v2.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

prompt
prompt Phase 1. Connect to Master Application Root.
prompt

connect wmStore_Admin/secret@//localhost/wmStore_Master

prompt
prompt Phase 2. Upgrade the application schema.
prompt

alter table wm_Orders add
(Financial_Quarter_Code varchar2(30) default 'Q4,FY2017' not null
)
;

create index wm_Orders_M1 on wm_Orders(Order_Date);

prompt
prompt Phase 3. Add more seed data to wm_List_of_Values.
prompt

insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Financial Quarter');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q1,FY2016');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q2,FY2016');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q3,FY2016');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q4,FY2016');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q1,FY2017');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q2,FY2017');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q3,FY2017');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q4,FY2017');

commit;

prompt
prompt Phase 4. Update orders to specify the appropriate financial quarter.
prompt

update wm_Orders
set Financial_Quarter_Code = 'Q1,FY2016'
where Order_Date >= '01-JAN-16'
and   Order_Date <  '01-APR-16'
;
update wm_Orders
set Financial_Quarter_Code = 'Q2,FY2016'
where Order_Date >= '01-APR-16'
and   Order_Date <  '01-JUL-16'
;
update wm_Orders
set Financial_Quarter_Code = 'Q3,FY2016'
where Order_Date >= '01-JUL-16'
and   Order_Date <  '01-OCT-16'
;
update wm_Orders
set Financial_Quarter_Code = 'Q4,FY2016'
where Order_Date >= '01-OCT-16'
and   Order_Date <  '01-JAN-17'
;
update wm_Orders
set Financial_Quarter_Code = 'Q1,FY2017'
where Order_Date >= '01-JAN-17'
and   Order_Date <  '01-APR-17'
;
update wm_Orders
set Financial_Quarter_Code = 'Q2,FY2017'
where Order_Date >= '01-APR-17'
and   Order_Date <  '01-JUL-17'
;
update wm_Orders
set Financial_Quarter_Code = 'Q3,FY2017'
where Order_Date >= '01-JUL-17'
and   Order_Date <  '01-OCT-17'
;
update wm_Orders
set Financial_Quarter_Code = 'Q4,FY2017'
where Order_Date >= '01-OCT-17'
and   Order_Date <  '01-JAN-18'
;

commit;

