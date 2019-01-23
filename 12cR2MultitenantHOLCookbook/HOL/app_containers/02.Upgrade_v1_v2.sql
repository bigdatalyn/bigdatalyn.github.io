-- =========================================================================
--
--      File: 02.Upgrade_v1_v2.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 2.
--
-- Description:
--   1. Upgrade application wmStore to v2. 
--   2. Synchronize three of four Application Tenant PDBs with v2.
--      NYC will not be upgraded at this stage.
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In this lab we upgrade Application wmStore from v1 to v2.
prompt SQL> -- Despite each franchise having a separate tenant PDB, there is only one
prompt SQL> -- master application definition to be upgraded - in Application Root. 
prompt SQL> -- We run the upgrade script only once, against the Application Root.
prompt SQL> -- It is then simply a matter of synchronizing the tenant PDBs for each 
prompt SQL> -- franchise for them to be upgraded to the new version.
prompt SQL> -- Note that this model allows for granular (per tenant/franchise) upgrade
prompt SQL> -- schedules.
prompt SQL>
prompt SQL> -- Let's get started!
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1: Upgrade Application.
prompt SQL>
prompt SQL> -- Connect to c##System (SYSTEM's surrogate).
prompt SQL> connect c##system/secret@//localhost/wmStore_Master
connect c##system/secret@//localhost/wmStore_Master

prompt
prompt SQL>
prompt SQL> -- Phase 1a: -- Begin the master application upgrade.
prompt SQL>
prompt SQL> alter pluggable database application wmStore begin upgrade '1.0' to '2.0'
prompt SQL> /
alter pluggable database application wmStore begin upgrade '1.0' to '2.0';

prompt SQL> -- Connect to the common user / application schema owner - wmStore_Admin

prompt SQL> connect wmStore_Admin/secret@//localhost/wmStore_Master
connect wmStore_Admin/secret@//localhost/wmStore_Master

prompt
prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Notice that the version is expressed as a character string.
prompt SQL>
prompt SQL> -- What now follows is the standard upgrade script for the application.
prompt SQL> -- Note that this is basically unchanged from the application upgrade
prompt SQL> -- script that would have been run for a standalone installation in a non-CDB.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1b: Upgrade Schema.
prompt SQL>
prompt SQL> alter table wm_Products add
prompt SQL> (Local_Product_YN char(1)           default 'Y'                   not null
prompt SQL> )
prompt SQL> /
alter table wm_Products add
(Local_Product_YN char(1)           default 'Y'                   not null
)
;
prompt SQL> alter table wm_Products add constraint Local_Product_Bool
prompt SQL> check (Local_Product_YN in ('Y','N'))
prompt SQL> /
alter table wm_Products add constraint Local_Product_Bool
check (Local_Product_YN in ('Y','N'))
;

prompt SQL> create or replace view wm_Order_Details
prompt SQL> -- sharing = metadata
prompt SQL> (Order_Number
prompt SQL> ,Campaign_Name
prompt SQL> ,Item_Num
prompt SQL> ,Product_Name
prompt SQL> ,Local_Product_YN
prompt SQL> ,Order_Qty
prompt SQL> ) as
prompt SQL> select o.Order_Number
prompt SQL> ,      c.Name
prompt SQL> ,      i.Item_Num
prompt SQL> ,      p.Name
prompt SQL> ,      p.Local_Product_YN
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
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1c: Upgrade Seed Data.
prompt SQL>

prompt SQL> update wm_Products
prompt SQL> set Local_Product_YN = 'N'
prompt SQL> where Name in
prompt SQL> ('Tornado Twisted'
prompt SQL> ,'Muskogee Magic'
prompt SQL> ,'Root 66 Beer Float'
prompt SQL> ,'Yokie Dokie Okie Eggnog'
prompt SQL> )
prompt SQL> /
update wm_Products
set Local_Product_YN = 'N'
where Name in
('Tornado Twisted'
,'Muskogee Magic'
,'Root 66 Beer Float'
,'Yokie Dokie Okie Eggnog'
)
;

prompt SQL> commit
prompt SQL> /
commit;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In the preceding section we upgraded the master application definition
prompt SQL> -- in our application root, wmStore_Master, from v1 to v2.
prompt SQL>
prompt SQL> -- This process started with the statement:
prompt SQL> -- alter pluggable database application wmStore begin upgrade '1.0' to '2.0'
prompt SQL>
prompt SQL> -- Following this we had a standard application upgrade script.
prompt SQL>
prompt SQL> -- We now have to designate the end of the master application upgrade.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1d: End the master application upgrade.
prompt SQL>

prompt SQL> alter pluggable database application wmStore end upgrade
prompt SQL> /
alter pluggable database application wmStore end upgrade;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- With Application Container, we only need to upgrade the application once.
prompt SQL> -- Tenant (franchise) PDBs are simply "sync'ed" with this master definition.
prompt SQL>
prompt SQL> -- This is simply a matter of connecting to each tenant (franchise) PDB in
prompt SQL> -- turn and issuing the sync command.
prompt SQL>
prompt SQL> -- Let's do that now.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt
prompt SQL>
prompt SQL> -- Phase 2. Sync Application PDBs for three of four franchises.
prompt SQL> --          Do not upgrade NYC yet.
prompt SQL>

prompt SQL> connect c##System/secret@//localhost/Tulsa
connect c##System/secret@//localhost/Tulsa
prompt
prompt SQL> alter pluggable database application wmStore sync
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> connect c##System/secret@//localhost/California
connect c##System/secret@//localhost/California
prompt
prompt SQL> alter pluggable database application wmStore sync
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> connect c##System/secret@//localhost/Tahoe
connect c##System/secret@//localhost/Tahoe
prompt
prompt SQL> alter pluggable database application wmStore sync
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- We have now synchronized the application definition in three of the four
prompt SQL> -- tenant (franchise) PDBs with the master definition.
prompt SQL> -- Franchise NYC has not yet upgraded. Let's confirm that there are now
prompt SQL> -- different application versions in use. 
prompt SQL>
prompt SQL> -- To do this, we'll connect to one franchise that has upgraded, and look at  
prompt SQL> -- definition of a table changed in the upgrade.
prompt SQL> -- Then, we'll connect to the franchise that has not upgraded, and confirm  
prompt SQL> -- that the old table definition is still in effect there.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> -- First, connect to Franchise Tulsa and look at the table definition there.
prompt SQL> connect wmStore_Admin/secret@//localhost/Tulsa
connect wmStore_Admin/secret@//localhost/Tulsa
prompt
prompt SQL> -- Show definition of table wm_Products.
prompt SQL> desc wm_Products
prompt
desc wm_Products

prompt
prompt SQL> -- Now, connect to Franchise NYC and look at the table definition there.
prompt SQL> connect wmStore_Admin/secret@//localhost/NYC
connect wmStore_Admin/secret@//localhost/NYC
prompt
prompt SQL> -- Show definition of table wm_Products.
prompt SQL> desc wm_Products
prompt
desc wm_Products

prompt
prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Review of Application Container Lab 2:
prompt SQL> -- In this lab, we have worked through the following stages:
prompt SQL> --   1. Upgrade application wmStore to v2. 
prompt SQL> --   2. Synchronize three of four Application Tenant PDBs.
prompt SQL> --      An important advantage of Multitenant, with Application Containers
prompt SQL> --      is that, as we've seen, we have the opportunity to upgrade 
prompt SQL> --      individual tenants / franchises on their own schedule if appropriate. 
prompt SQL>
prompt SQL> -- This demonstrates how Multitenant with Application Containers allows an
prompt SQL> -- Application administrator to manage many tenants as one, but retain
prompt SQL> -- granular control when appropriate.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> -- Phase 3: Queries
@Lab2_Products_Tulsa_NYC
-- @Lab2_Locals_vs_Yokels
