-- =========================================================================
--
--      File: 01.Instant_SaaS.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/12/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Application Container Lab 1.
--   Instant SaaS Architecture.
--
-- Description:
--   1. Setup Application Root - wmStore_Master
--   2. Install v1 of Application wmStore in Application Root.
--   3. Create and sync Application Seed and provision Application PDBs for
--      four franchises:
--      - Tulsa
--      - California
--      - Tahoe
--      - NYC
--   4. Populate Application Tenant PDBs with demo data. 
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- This is the first hands-on lab for Application Container functionality.
prompt SQL> -- These labs are in the "EasyLab" format, simulating what you might type
prompt SQL> -- in SQLPlus or SQLcl, but saving you the effort and distraction of 
prompt SQL> -- transcribing from a workbook, so you can focus on what is happening.
prompt SQL> -- With EasyLab scripts, simply start the script, read what's happening
prompt SQL> -- and press [Enter] when ready to execute the next batch of commands.
prompt SQL> -- Ample explanation accompanies these commands to explain what we're doing.
prompt SQL>
prompt SQL> -- For this series of labs, we will follow the story of Walt's Malts
prompt SQL> -- "From startup to starship!"
prompt SQL>
prompt SQL> -- An established security best practice is to use a surrogate for SYSTEM.
prompt SQL> -- In these labs, the surrogate user is c##System, with privileges
prompt SQL> -- dba, sysoper, create session, set container.
prompt SQL>
prompt SQL> -- Let's get started!
prompt SQL>
prompt SQL> -- ===========================================================================

-- While they're reading that, we'll silently clean up the environment
-- so we can start with a clean slate. 
set termout off
set echo off
set verify off
connect c##sysdba/secret@//localhost/cdb1 as sysdba
set termout off
set echo off
set verify off

@Drop_DB_Links
@Drop_PDBs

connect c##sysdba/secret@//localhost/cdb2 as sysdba
set termout off
set echo off
set verify off

@Drop_DB_Links
@Drop_PDBs

@Profile

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1.1. Create and Open master Application Root.
prompt SQL>
prompt SQL> connect c##system/secret@//localhost/cdb1
connect c##system/secret@//localhost/cdb1

prompt
prompt SQL> create pluggable database wmStore_Master as application container
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database wmStore_Master as application container
admin user wm_admin identified by secret;

prompt SQL> alter pluggable database wmStore_Master open
prompt SQL> /
alter pluggable database wmStore_Master open;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Now we have an Application Root.
prompt SQL>
prompt SQL> -- Next, we have to install the master definition of the application
prompt SQL> -- wmStore (Walt's Malts Store).
prompt SQL>
prompt SQL> -- Let's get on with that...
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> -- Connect to c##System (SYSTEM's surrogate).
prompt SQL> connect c##system/secret@//localhost/wmStore_Master
connect c##system/secret@//localhost/wmStore_Master

prompt
prompt SQL>
prompt SQL> -- Phase 2. Define Application Master.
prompt SQL> -- Phase 2a. Begin the master application definition.
prompt SQL>
prompt SQL> alter pluggable database application wmStore begin install '1.0'
prompt SQL> /
alter pluggable database application wmStore begin install '1.0';

prompt SQL>
prompt SQL> -- Phase 2b. Create tablespace and Application Common User.
prompt SQL>
prompt SQL> create tablespace wmStore_TBS datafile size 100M autoextend on next 10M maxsize 200M
prompt SQL> /
create tablespace wmStore_TBS datafile size 100M autoextend on next 10M maxsize 200M;
prompt SQL> create user wmStore_Admin identified by secret container=all
prompt SQL> /
create user wmStore_Admin identified by secret container=all;

prompt SQL> grant create session, dba to wmStore_Admin
prompt SQL> /
grant create session, dba to wmStore_Admin;
prompt SQL> alter user wmStore_Admin default tablespace wmStore_TBS
prompt SQL> /
alter user wmStore_Admin default tablespace wmStore_TBS;

prompt SQL> -- Connect to the common user / application schema owner - wmStore_Admin

prompt SQL> connect wmStore_Admin/secret@//localhost/wmStore_Master
connect wmStore_Admin/secret@//localhost/wmStore_Master

prompt
prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- What now follows is the standard installation script for the application.
prompt SQL> -- Note that this is basically unchanged from the application installation
prompt SQL> -- script that would have been run for a standalone installation in a non-CDB.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 2c. Standard Application Installation.
prompt SQL>
prompt SQL> -- Define the application schema.
prompt SQL>

prompt SQL> create table wm_Campaigns
prompt SQL> -- sharing = data
prompt SQL> (Row_GUID         raw(16)           default Sys_GUID()                      primary key 
prompt SQL> ,Name             varchar2(30)                                    not null  unique
prompt SQL> )
prompt SQL> /
create table wm_Campaigns
-- sharing = data
(Row_GUID         raw(16)           default Sys_GUID()                      primary key 
,Name             varchar2(30)                                    not null  unique
)
;

prompt SQL> create table wm_Products
prompt SQL> -- sharing = extended data
prompt SQL> (Row_GUID         raw(16)           default Sys_GUID()                      primary key 
prompt SQL> ,Name             varchar2(30)                                    not null  unique
prompt SQL> )
prompt SQL> /
create table wm_Products
-- sharing = extended data
(Row_GUID         raw(16)           default Sys_GUID()                      primary key 
,Name             varchar2(30)                                    not null  unique
)
;

prompt SQL> create table wm_Orders
prompt SQL> -- sharing = metadata
prompt SQL> (Row_GUID         raw(16)           default Sys_GUID()                      primary key 
prompt SQL> ,Order_Number     number(16,0)      generated always as identity  not null  unique
prompt SQL> ,Order_Date       date              default   current_date        not null 
prompt SQL> ,Campaign_ID      raw(16)           
prompt SQL> )
prompt SQL> /
create table wm_Orders
-- sharing = metadata
(Row_GUID         raw(16)           default Sys_GUID()                      primary key 
,Order_Number     number(16,0)      generated always as identity  not null  unique
,Order_Date       date              default   current_date        not null 
,Campaign_ID      raw(16)           
)
;
prompt SQL> alter table wm_Orders add constraint wm_Orders_F1 
prompt SQL> foreign key (Campaign_ID)
prompt SQL> references wm_Campaigns(Row_GUID)
prompt SQL> disable
prompt SQL> /
alter table wm_Orders add constraint wm_Orders_F1 
foreign key (Campaign_ID)
references wm_Campaigns(Row_GUID)
disable
;

prompt SQL> create table wm_Order_Items
prompt SQL> -- sharing = metadata
prompt SQL> (Row_GUID         raw(16)                    default Sys_GUID()           primary key 
prompt SQL> ,Order_ID         raw(16)           not null
prompt SQL> ,Item_Num         number(16,0)      not null
prompt SQL> ,Product_ID       raw(16)           not null
prompt SQL> ,Order_Qty        number(16,0)      not null
prompt SQL> )
prompt SQL> /
create table wm_Order_Items
-- sharing = metadata
(Row_GUID         raw(16)                    default Sys_GUID()           primary key 
,Order_ID         raw(16)           not null
,Item_Num         number(16,0)      not null
,Product_ID       raw(16)           not null
,Order_Qty        number(16,0)      not null
)
;
prompt SQL> alter table wm_Order_Items add constraint wm_Order_Items_F1 
prompt SQL> foreign key (Order_ID)
prompt SQL> references wm_Orders(Row_GUID)
prompt SQL> disable
prompt SQL> /
alter table wm_Order_Items add constraint wm_Order_Items_F1 
foreign key (Order_ID)
references wm_Orders(Row_GUID)
disable
;
prompt SQL> alter table wm_Order_Items add constraint wm_Order_Items_F2 
prompt SQL> foreign key (Product_ID)
prompt SQL> references wm_Products(Row_GUID)
prompt SQL> disable
prompt SQL> /
alter table wm_Order_Items add constraint wm_Order_Items_F2 
foreign key (Product_ID)
references wm_Products(Row_GUID)
disable
;

prompt SQL> create or replace view wm_Order_Details
prompt SQL> -- sharing = metadata
prompt SQL> (Order_Number
prompt SQL> ,Campaign_Name
prompt SQL> ,Item_Num
prompt SQL> ,Product_Name
prompt SQL> ,Order_Qty
prompt SQL> ) as
prompt SQL> select o.Order_Number
prompt SQL> ,      c.Name
prompt SQL> ,      i.Item_Num
prompt SQL> ,      p.Name
prompt SQL> ,      i.Order_Qty
prompt SQL> from wm_Orders o
prompt SQL> join wm_Order_Items i
prompt SQL> on  i.Order_ID = o.Row_GUID
prompt SQL> join wm_Products p
prompt SQL> on   i.Product_ID = p.Row_GUID
prompt SQL> left outer join wm_Campaigns c
prompt SQL> on  o.Campaign_ID = c.Row_GUID
prompt SQL> /
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
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Create seed data.
prompt SQL>

-- Campaigns 
prompt SQL> insert into wm_Campaigns (Row_GUID, Name) values ('01', 'Locals vs Yokels')
prompt SQL> /
insert into wm_Campaigns (Row_GUID, Name) values ('01', 'Locals vs Yokels');
prompt SQL> insert into wm_Campaigns (Row_GUID, Name) values ('02', 'Black Friday 2016')
prompt SQL> /
insert into wm_Campaigns (Row_GUID, Name) values ('02', 'Black Friday 2016');
prompt SQL> insert into wm_Campaigns (Row_GUID, Name) values ('03', 'Christmas 2016')
prompt SQL> /
insert into wm_Campaigns (Row_GUID, Name) values ('03', 'Christmas 2016');

-- Products 
prompt SQL> insert into wm_Products (Row_GUID, Name) values ('01', 'Tornado Twisted')
prompt SQL> /
insert into wm_Products (Row_GUID, Name) values ('01', 'Tornado Twisted');
prompt SQL> insert into wm_Products (Row_GUID, Name) values ('02', 'Muskogee Magic')
prompt SQL> /
insert into wm_Products (Row_GUID, Name) values ('02', 'Muskogee Magic');
prompt SQL> insert into wm_Products (Row_GUID, Name) values ('03', 'Root 66 Beer Float')
prompt SQL> /
insert into wm_Products (Row_GUID, Name) values ('03', 'Root 66 Beer Float');
prompt SQL> insert into wm_Products (Row_GUID, Name) values ('04', 'Yokie Dokie Okie Eggnog')
prompt SQL> /
insert into wm_Products (Row_GUID, Name) values ('04', 'Yokie Dokie Okie Eggnog');

prompt SQL> commit
prompt SQL> /
commit;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In the preceding section we installed the master application definition
prompt SQL> -- in our application root, wmStore_Master.
prompt SQL>
prompt SQL> -- This process started with the statement:
prompt SQL> -- alter pluggable database application wmStore begin install '1.0'
prompt SQL>
prompt SQL> -- Following this we had a standard application installation script.
prompt SQL>
prompt SQL> -- We now have to designate the end of the master application definition.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- End the master application definition.
prompt SQL>

prompt SQL> alter pluggable database application wmStore end install '1.0'
prompt SQL> /
alter pluggable database application wmStore end install '1.0';

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- We have now created the Application Root and installed the master
prompt SQL> -- application definition.
prompt SQL>
prompt SQL> -- Next we create the Application Seed and sync it with the application
prompt SQL> -- master.
prompt SQL>
prompt SQL> -- Following that, we can provision Application PDBs for new tenant / 
prompt SQL> -- franchises.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 3: Create Application Seed and Provision Application PDBs.
prompt SQL> -- Phase 3.1. Create and open the Master Application Seed PDB.
prompt SQL>
prompt SQL> connect c##system/secret@//localhost/wmStore_Master
connect c##system/secret@//localhost/wmStore_Master

prompt
prompt SQL> create pluggable database as seed
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database as seed
admin user wm_admin identified by secret;

-- Hack - should be able to do this as c##system!
prompt SQL> connect c##SysDBA/secret@//localhost/wmStore_Master as SysDBA
connect c##SysDBA/secret@//localhost/wmStore_Master as SysDBA

prompt
prompt SQL> alter pluggable database wmStore_Master$Seed open
prompt SQL> /
alter pluggable database wmStore_Master$Seed open;

prompt SQL> -- Phase 3.2. Sync the Application Seed with Application wmStore.
prompt SQL> connect c##system/secret@//localhost/wmStore_Master$Seed
connect c##system/secret@//localhost/wmStore_Master$Seed

prompt
prompt SQL> alter pluggable database application wmStore sync
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Now we have an Application Seed from which to provision new tenants /
prompt SQL> -- franchises.
prompt SQL> -- Notice the syntax for creating the seed PDB, using the phrase "as seed".
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 3.2. Provision the App PDBs for each Franchise.
prompt SQL>

prompt SQL> connect c##system/secret@//localhost/wmStore_Master
connect c##system/secret@//localhost/wmStore_Master

prompt
prompt SQL> create pluggable database Tulsa
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database Tulsa
admin user wm_admin identified by secret;

prompt SQL> create pluggable database California
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database California
admin user wm_admin identified by secret;

prompt SQL> create pluggable database Tahoe
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database Tahoe
admin user wm_admin identified by secret;

prompt SQL> create pluggable database NYC
prompt SQL> admin user wm_admin identified by secret
prompt SQL> /
create pluggable database NYC
admin user wm_admin identified by secret;

prompt SQL> alter pluggable database all open
prompt SQL> /
alter pluggable database all open;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- We have now provisioned an Application PDB for each tenant / franchise
prompt SQL> -- from the Application Seed, all synchronized with the master application
prompt SQL> -- definition.
prompt SQL>
prompt SQL> -- Now we'll go to each tenant PDB in turn and add some franchise-specific
prompt SQL> -- data. This is for demonstration purposes only. This is not part of the 
prompt SQL> -- application definition. It merely simulates the creation of data which 
prompt SQL> -- in the usual course of events would be defined through the application
prompt SQL> -- itself. This demo data will be added by the execution of scripts.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 4: Create franchise-specific data
prompt SQL>

prompt SQL> @Franchise_Data_Lab1
@Franchise_Data_Lab1

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Review of Application Container Lab1:
prompt SQL> -- In this lab, we have worked through the following stages:
prompt SQL> --   1. Setup Application Root - wmStore_Master
prompt SQL> --   2. Install v1 of Application wmStore in Application Root.
prompt SQL> --   3. Create and sync Application Seed and provision Application PDBs for  
prompt SQL> --      four franchises:
prompt SQL> --      - Tulsa
prompt SQL> --      - California
prompt SQL> --      - Tahoe
prompt SQL> --      - NYC
prompt SQL> --   4. Populate Application Tenant PDBs with demo data. 
prompt SQL>
prompt SQL> -- This demonstrates how Multitenant with Application Containers delivers an
prompt SQL> -- "Instant SaaS" architecture, for an application definition previously
prompt SQL> -- architected for standalone deployment.
prompt SQL>
prompt SQL> -- You are now encouraged to execute some queries against the various
prompt SQL> -- franchise PDBs. Sample queries can be found in file Lab1_Queries.sql.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> -- Phase 5: Queries
prompt SQL> @Lab1_PDBs_Users
@Lab1_PDBs_Users

prompt SQL> @Lab1_Queries
@Lab1_Queries

