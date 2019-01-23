-- =========================================================================
--
--      File: wm_Upgrade_v2_v3.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Upgrade wmStore Application from v2 to v3.
--
-- Description:
--   - Add new table wm_List_of_Values and populate with seed data.
--   - Change sharing mode of tables:
--   -   wm_Campaigns sharing = data
--   -   wm_Products  sharing = extended data
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

create table wm_List_Of_Values
-- sharing = metadata -- the default
sharing = data
-- sharing = extended data
(Row_GUID    raw(16)        default Sys_GUID() primary key 
,Type_Code   varchar2(30)   not null
,Value_Code  varchar2(30)   not null
)
;
alter table wm_List_Of_Values  add constraint wm_List_Of_Values_U1
unique (Type_Code, Value_Code)
;

prompt
prompt Phase 3. Add corresponding new common seed data.
prompt

insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Currency');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'USD');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'GBP');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'DKK');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'EUR');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'JPY');

insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Country');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'USA');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'UK');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'Denmark');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'France');
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'Japan');

commit;

prompt
prompt Phase 4. Change the sharing mode of two tables.
prompt

-- Convert sharing mode of tables:
-- wm_Campaigns are centrally defined (sharing = data)
-- wm_Products are both centrally and locally defined
-- Notice how we handle the seed data.
-- In each case, we must disable any constraints that reference data which is about to be 
-- "moved" from the application PDB to the Root. 
-- (Technically this is a delete from the application PDB, 
-- followed by an insert into Application Root. We need the delete to work.)

-- Constraint wm_Orders_F1 references wm_Campaigns(Row_GUID).
alter table wm_Orders disable constraint wm_Orders_F1;
-- Constraint wm_Order_Items_F2 references wm_Products(Row_GUID)
alter table wm_Order_Items disable constraint wm_Order_Items_F2;

-- Delete the seed data from these tables. 
-- These statements will execute in the Application PDBs because the sharing mode of the 
-- tables is currently sharing=metadata.
delete from wm_Campaigns where Row_GUID in ('01','02','03');
delete from wm_Products  where Row_GUID in ('01','02','03','04');

-- Change the sharing mode of these tables.
execute DBMS_PDB.set_data_linked(Schema_name => 'WMSTORE_ADMIN', Object_Name => 'WM_CAMPAIGNS', NameSpace => 1);
execute DBMS_PDB.set_ext_data_linked(Schema_name => 'WMSTORE_ADMIN', Object_Name => 'WM_PRODUCTS', NameSpace => 1);

-- Re-insert the seed data. These statements will now execute in Application Root. 
-- Campaigns (Central only)
insert into wm_Campaigns (Row_GUID, Name) values ('01', 'Locals vs Yokels');
insert into wm_Campaigns (Row_GUID, Name) values ('02', 'Black Friday 2016');
insert into wm_Campaigns (Row_GUID, Name) values ('03', 'Christmas 2016');

-- Products (Central + local)
insert into wm_Products (Row_GUID, Name) values ('01', 'Tornado Twisted');
insert into wm_Products (Row_GUID, Name) values ('02', 'Muskogee Magic');
insert into wm_Products (Row_GUID, Name) values ('03', 'Root 66 Beer Float');
insert into wm_Products (Row_GUID, Name) values ('04', 'Yokie Dokie Okie Eggnog');

commit;
