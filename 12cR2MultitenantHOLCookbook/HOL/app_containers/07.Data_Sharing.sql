-- =========================================================================
--
--      File: 07.Data_Sharing.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/20/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 7.
--   Demonstrate the advanced concept of data sharing.
--
-- Description:
--   Demonstrate the advanced concept of data sharing.
--   1. Upgrade Application wmStore to v3.0.
--      - Add a new table to the application, defined as sharing = data.
--      - Change table wm_Campaigns to be sharing = data (Centrally-defined data only).
--      - Change table wm_Products to be sharing = extended data 
--        (Both centrally-defined and locally-defined data).
--      - This upgrade requires careful timing of redefinition of seed data in these 
--        two tables. (The seed data needs to be removed from the Application PDBs
--        and re-created in the Application Root.
--      - Update data in wm_Orders to set the appropriate value for the newly added
--        denormalized column.
--   2. Propagate the Upgrade to all franchises.
--   3. Query the wm_Products table in a franchise PDB to see the sources of data.
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
--   - Script Setup_Lab4 run successfully
--   - Script Setup_Lab5 run successfully
--   - Script Setup_Lab6 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In Lab7 we introduce the advanced concept of data sharing.
prompt SQL> -- We have already seen how Multitenant, with Application Containers, can  
prompt SQL> -- provide an instant SaaS architecture for an application previously
prompt SQL> -- architected for standalone deployment.  
prompt SQL> -- Technically this is done by installing a master application definition in
prompt SQL> -- an Application Root. Application PDBs for each tenant / franchise are
prompt SQL> -- plugged into this Application Root and the metadata for the database
prompt SQL> -- components of the Application definition is served from the Application
prompt SQL> -- root. 
prompt SQL> -- However, so far all data, including data which may be considered part of 
prompt SQL> -- the application definition ("seed data") has been local. In other words, 
prompt SQL> -- there's a replica of this seed data in every Application PDB. 
prompt SQL>
prompt SQL> -- In this lab we'll see how, in addition to metadata, common data may also 
prompt SQL> -- be shared from Application Root. To do this we'll upgrade application
prompt SQL> -- wmStore to v3.0 and introduce various powerful data sharing capabilities.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1: Upgrade wmStore application to v3.
prompt SQL>
prompt SQL> connect c##system/secret@//localhost/wmStore_Master
connect c##system/secret@//localhost/wmStore_Master

prompt 
prompt SQL> alter pluggable database application wmStore begin upgrade '2.0' to '3.0'
prompt SQL> /
alter pluggable database application wmStore begin upgrade '2.0' to '3.0';

prompt SQL> -- Connect to wmStore_Admin

prompt SQL> connect wmStore_Admin/secret@//localhost/wmStore_Master
connect wmStore_Admin/secret@//localhost/wmStore_Master

prompt
prompt SQL> 
prompt SQL> -- Phase 2. Upgrade the application schema.
prompt SQL> 

prompt SQL> -- Create a new List of Values table.
prompt SQL> -- For the purposes of this demo, these values will be centrally defined only.
prompt SQL> -- (That is, they may be thought of as "seed data" that is part of the 
prompt SQL> -- application definition.) 
prompt SQL> 

prompt SQL> create table wm_List_Of_Values
prompt SQL> -- sharing = metadata -- the default
prompt SQL> sharing = data
prompt SQL> -- sharing = extended data
prompt SQL> (Row_GUID    raw(16)        default Sys_GUID() primary key 
prompt SQL> ,Type_Code   varchar2(30)   not null
prompt SQL> ,Value_Code  varchar2(30)   not null
prompt SQL> )
prompt SQL> /
create table wm_List_Of_Values
-- sharing = metadata -- the default
sharing = data
-- sharing = extended data
(Row_GUID    raw(16)        default Sys_GUID() primary key 
,Type_Code   varchar2(30)   not null
,Value_Code  varchar2(30)   not null
)
;
prompt SQL> alter table wm_List_Of_Values  add constraint wm_List_Of_Values_U1
prompt SQL> unique (Type_Code, Value_Code)
prompt SQL> /
alter table wm_List_Of_Values  add constraint wm_List_Of_Values_U1
unique (Type_Code, Value_Code)
;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Here we have created a new table, and specified that its data is 
prompt SQL> -- to be centrally defined and shared from Application Root to all 
prompt SQL> -- application PDBs.  
prompt SQL>
prompt SQL> -- In the next step we go through the routine exercise of adding data to this
prompt SQL> -- new table.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 3. Add corresponding new common seed data.
prompt SQL>

prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Currency')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Currency');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'USD')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'USD');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'GBP')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'GBP');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'DKK')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'DKK');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'EUR')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'EUR');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'JPY')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Currency', 'JPY');

prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Country')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Country');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Country', 'USA')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Country', 'USA');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Country', 'UK')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Country', 'UK');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Country', 'Denmark')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Country', 'Denmark');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Country', 'France')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Country', 'France');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Country', 'Japan')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Country', 'Japan');

prompt SQL> commit
prompt SQL> /
commit;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Now, things get interesting!
prompt SQL>
prompt SQL> -- In the next section, we convert the sharing mode of two existing tables:
prompt SQL> -- - wm_Campaigns: Centrally defined (sharing = data)
prompt SQL> -- - wm_Products:  Centrally and locally defined (sharing = extended data)
prompt SQL> -- Notice how we handle the seed data.
prompt SQL> -- In each case, we must disable any constraints that reference data which is 
prompt SQL> -- about to be "moved" from the application PDB to the Root. 
prompt SQL> -- (Technically this is a delete from the application PDB, 
prompt SQL> -- followed by an insert into Application Root. We need the delete to work.)
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 4. Convert sharing mode of tables:
prompt SQL> -- - Campaigns are centrally defined
prompt SQL> -- - Products are both centrally and locally defined

prompt SQL>
prompt SQL> -- Phase 4a. Disable constraints.
prompt SQL> -- This is required because in these steps we will be deleting data from
prompt SQL> -- the Application PDBs and re-creating it in Application Root.
prompt SQL> -- We don't want the delete statements to fail because of these constraints.
prompt SQL>
prompt SQL> -- Constraint wm_Orders_F1 references wm_Campaigns(Row_GUID).
prompt SQL> alter table wm_Orders disable constraint wm_Orders_F1
prompt SQL> /
alter table wm_Orders disable constraint wm_Orders_F1;
prompt SQL> -- Constraint wm_Order_Items_F2 references wm_Products(Row_GUID)
prompt SQL> alter table wm_Order_Items disable constraint wm_Order_Items_F2
prompt SQL> /
alter table wm_Order_Items disable constraint wm_Order_Items_F2;

prompt SQL>
prompt SQL> -- Phase 4b. Delete the seed data from these tables. 
prompt SQL> -- These statements will execute in the Application PDBs because the sharing  
prompt SQL> -- mode of the tables is currently sharing=metadata.
prompt SQL>
prompt SQL> delete from wm_Campaigns where Row_GUID in ('01','02','03')
prompt SQL> /
delete from wm_Campaigns where Row_GUID in ('01','02','03');
prompt SQL> delete from wm_Products  where Row_GUID in ('01','02','03','04')
prompt SQL> /
delete from wm_Products  where Row_GUID in ('01','02','03','04');

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 4c. Change the sharing mode of these tables.
prompt SQL>
prompt SQL> execute DBMS_PDB.set_data_linked(Schema_name => 'WMSTORE_ADMIN', Object_Name => 'WM_CAMPAIGNS', NameSpace => 1)
prompt SQL> /
execute DBMS_PDB.set_data_linked(Schema_name => 'WMSTORE_ADMIN', Object_Name => 'WM_CAMPAIGNS', NameSpace => 1);

prompt SQL> execute DBMS_PDB.set_ext_data_linked(Schema_name => 'WMSTORE_ADMIN', Object_Name => 'WM_PRODUCTS', NameSpace => 1)
prompt SQL> /
execute DBMS_PDB.set_ext_data_linked(Schema_name => 'WMSTORE_ADMIN', Object_Name => 'WM_PRODUCTS', NameSpace => 1);

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 4d. Re-insert the seed data. These statements will now execute in 
prompt SQL> -- Application Root. 
prompt SQL>

prompt SQL> -- Campaigns (Central only)
prompt SQL> insert into wm_Campaigns (Row_GUID, Name) values ('01', 'Locals vs Yokels');
prompt SQL> /
insert into wm_Campaigns (Row_GUID, Name) values ('01', 'Locals vs Yokels');

prompt SQL> insert into wm_Campaigns (Row_GUID, Name) values ('02', 'Black Friday 2016');
prompt SQL> /
insert into wm_Campaigns (Row_GUID, Name) values ('02', 'Black Friday 2016');

prompt SQL> insert into wm_Campaigns (Row_GUID, Name) values ('03', 'Christmas 2016');
prompt SQL> /
insert into wm_Campaigns (Row_GUID, Name) values ('03', 'Christmas 2016');

prompt SQL> -- Products (Central + local)
prompt SQL> insert into wm_Products (Row_GUID, Name) values ('01', 'Tornado Twisted');
prompt SQL> /
insert into wm_Products (Row_GUID, Name) values ('01', 'Tornado Twisted');

prompt SQL> insert into wm_Products (Row_GUID, Name) values ('02', 'Muskogee Magic');
prompt SQL> /
insert into wm_Products (Row_GUID, Name) values ('02', 'Muskogee Magic');

prompt SQL> insert into wm_Products (Row_GUID, Name) values ('03', 'Root 66 Beer Float');
prompt SQL> /
insert into wm_Products (Row_GUID, Name) values ('03', 'Root 66 Beer Float');

prompt SQL> insert into wm_Products (Row_GUID, Name) values ('04', 'Yokie Dokie Okie Eggnog');
prompt SQL> /
insert into wm_Products (Row_GUID, Name) values ('04', 'Yokie Dokie Okie Eggnog');

prompt SQL> commit
prompt SQL> /
commit;

prompt SQL>
prompt SQL> -- Phase 4e. Re-enable constraints.
prompt SQL> -- These steps need to be skipped until cross-container constraints are supported.
prompt SQL> -- alter table wm_Orders enable constraint wm_Orders_F1;
prompt SQL> -- alter table wm_Order_Items enable constraint wm_Order_Items_F2;
prompt SQL>

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In the previous section, we converted the sharing mode of two existing
prompt SQL> -- tables.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 5. Declare the end of the upgrade.
prompt SQL>

prompt SQL> alter pluggable database application wmStore end upgrade
prompt SQL> /
alter pluggable database application wmStore end upgrade;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- We have now completed the definition of the upgrade to v3 of wmStore.
prompt SQL> -- As before, this upgrade script is defined in a "begin / end" block.
prompt SQL> -- Between the begin and end statements, much of the upgrade was a typical
prompt SQL> -- upgrade script.
prompt SQL> -- There was also some special handling to convert the data sharing mode of 
prompt SQL> -- some of the tables.
prompt SQL> -- We have also seen how the steps in the upgrade script are captured in  
prompt SQL> -- Application Root, to be replayed subsequently in the Application PDBs
prompt SQL> -- as they are sync'ed.
prompt SQL>
prompt SQL> -- The next step, therefore is to synchronize the Application PDBs for all
prompt SQL> -- tenants.
prompt SQL> -- In this lab, we'll do this by executing a script to do this in a single
prompt SQL> -- step.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 6. Sync all Application PDBs.
prompt SQL> -- This will be accomplished by executing a script.
prompt SQL>
prompt SQL> define Sync_App = wmStore
define Sync_App = wmStore
prompt SQL> @Sync_App_PDBs
@Sync_App_PDBs

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Application PDBs for all tenants / franchises have now been synchronized
prompt SQL> -- with the latest version of wmStore.
prompt SQL>
prompt SQL> -- In the next step, we'll connect to a particular franchise's Application PDB
prompt SQL> -- and look at the data in table wm_Products. The "sharing mode" of this 
prompt SQL> -- table was changed to "sharing = extended data" in an earlier step of this 
prompt SQL> -- Lab. In the next step we'll see the source of the data for the various
prompt SQL> -- rows in this table.  
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 7: Query products and campaigns prior to upgrade.
prompt SQL>
prompt SQL> @Lab7_Data_Source
@Lab7_Data_Source

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Review of Application Container Lab7:
prompt SQL> -- In this lab, we have explored the advanced concept of data sharing, 
prompt SQL> -- through the following steps: 
prompt SQL> --   1. Upgrade Application wmStore to v3.0.
prompt SQL> --      - Add a new table to the application, defined as sharing = data.
prompt SQL> --      - Populated this table with a common set of data. 
prompt SQL> --      - Change table wm_Campaigns to be sharing = data (centrally-defined 
prompt SQL> --        data only).
prompt SQL> --      - Change table wm_Products to be sharing = extended data 
prompt SQL> --        (both centrally-defined and locally-defined data).
prompt SQL> --      - This upgrade requires careful timing of redefinition of seed data  
prompt SQL> --        in these two tables. (The seed data needs to be removed from the 
prompt SQL> --        Application PDBs and re-created in the Application Root.)
prompt SQL> --      - Update data in wm_Orders to set the appropriate value for the newly 
prompt SQL> --        added denormalized column.
prompt SQL> --   2. Propagate the Upgrade to all franchises.
prompt SQL> --   3. Query the wm_Products table in a franchise PDB to see the sources of 
prompt SQL> --      data.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************
