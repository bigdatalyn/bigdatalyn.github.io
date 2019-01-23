-- =========================================================================
--
--      File: 08.Patch_301.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/22/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 7.
--   Patch application wmStore and apply patch to three franchises.
--
-- Description:
--   1. Define patch 301 for application wmStore.
--      - Add column for financial quarter to wm_Orders.
--      - Create a new index on wm_Orders.
--      - Add more seed data to wm_List_of_Values.
--      - Update data in wm_Orders to set the appropriate value for the newly added
--        denormalized column.
--   2. Propagate the Upgrade to three franchises (but not to all).
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
--   - Script Setup_Lab4 run successfully
--   - Script Setup_Lab5 run successfully
--   - Script Setup_Lab6 run successfully
--   - Script Setup_Lab7 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In Lab8 we define an application patch.
prompt SQL>
prompt SQL> -- Patches are comparable to the application upgrades that we've seen in   
prompt SQL> -- previous labs, but there are three important differences.
prompt SQL> -- 1. The types of operation that are allowed in a patch are more limited.  
prompt SQL> --    Essentially operations which are destructive are not allowed, including:
prompt SQL> --    - Drop a table, column, index, trigger...
prompt SQL> --    - create *or replace* view, package, procedure...
prompt SQL> -- 2. Patches do not involve creation of Application Root Clones.
prompt SQL> -- 3. Patches are not version-specific. This means that a single patch may 
prompt SQL> --    be applied to multiple application versions.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1: Declare beginning of application patch.
prompt SQL>
prompt SQL> connect c##system/secret@//localhost/wmStore_Master
connect c##system/secret@//localhost/wmStore_Master

prompt 
prompt SQL> alter pluggable database application wmStore begin patch 301
prompt SQL> /
alter pluggable database application wmStore begin patch 301;

prompt SQL> -- Connect to Master Application Root

prompt SQL> connect wmStore_Admin/secret@//localhost/wmStore_Master
connect wmStore_Admin/secret@//localhost/wmStore_Master

prompt
prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Notice that patches are positive integers.
prompt SQL> -- (Compare this with upgrades, which are character strings.)
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> 
prompt SQL> -- Phase 2. Upgrade the application schema.
prompt SQL> 

prompt SQL> alter table wm_Orders add
prompt SQL> (Financial_Quarter_Code varchar2(30) default 'Q4,FY2017' not null
prompt SQL> )
prompt SQL> /
alter table wm_Orders add
(Financial_Quarter_Code varchar2(30) default 'Q4,FY2017' not null
)
;

prompt SQL> create index wm_Orders_M1 on wm_Orders(Order_Date)
prompt SQL> /
create index wm_Orders_M1 on wm_Orders(Order_Date);

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 3. Add more seed data to wm_List_of_Values.
prompt SQL>

prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Financial Quarter')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Financial Quarter');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q1,FY2016')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q1,FY2016');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q2,FY2016')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q2,FY2016');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q3,FY2016')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q3,FY2016');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q4,FY2016')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q4,FY2016');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q1,FY2017')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q1,FY2017');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q2,FY2017')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q2,FY2017');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q3,FY2017')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q3,FY2017');
prompt SQL> insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q4,FY2017')
prompt SQL> /
insert into wm_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q4,FY2017');

prompt SQL> commit
prompt SQL> /
commit;

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 4. Update orders to specify the appropriate financial quarter.
prompt SQL>

prompt SQL> update wm_Orders
prompt SQL> set Financial_Quarter_Code = 'Q1,FY2016'
prompt SQL> where Order_Date >= '01-JAN-16'
prompt SQL> and   Order_Date <  '01-APR-16'
prompt SQL> /
update wm_Orders
set Financial_Quarter_Code = 'Q1,FY2016'
where Order_Date >= '01-JAN-16'
and   Order_Date <  '01-APR-16'
;
prompt SQL> update wm_Orders
prompt SQL> set Financial_Quarter_Code = 'Q2,FY2016'
prompt SQL> where Order_Date >= '01-APR-16'
prompt SQL> and   Order_Date <  '01-JUL-16'
prompt SQL> /
update wm_Orders
set Financial_Quarter_Code = 'Q2,FY2016'
where Order_Date >= '01-APR-16'
and   Order_Date <  '01-JUL-16'
;
prompt SQL> update wm_Orders
prompt SQL> set Financial_Quarter_Code = 'Q3,FY2016'
prompt SQL> where Order_Date >= '01-JUL-16'
prompt SQL> and   Order_Date <  '01-OCT-16'
prompt SQL> /
update wm_Orders
set Financial_Quarter_Code = 'Q3,FY2016'
where Order_Date >= '01-JUL-16'
and   Order_Date <  '01-OCT-16'
;
prompt SQL> update wm_Orders
prompt SQL> set Financial_Quarter_Code = 'Q4,FY2016'
prompt SQL> where Order_Date >= '01-OCT-16'
prompt SQL> and   Order_Date <  '01-JAN-17'
prompt SQL> /
update wm_Orders
set Financial_Quarter_Code = 'Q4,FY2016'
where Order_Date >= '01-OCT-16'
and   Order_Date <  '01-JAN-17'
;
prompt SQL> update wm_Orders
prompt SQL> set Financial_Quarter_Code = 'Q1,FY2017'
prompt SQL> where Order_Date >= '01-JAN-17'
prompt SQL> and   Order_Date <  '01-APR-17'
prompt SQL> /
update wm_Orders
set Financial_Quarter_Code = 'Q1,FY2017'
where Order_Date >= '01-JAN-17'
and   Order_Date <  '01-APR-17'
;
prompt SQL> update wm_Orders
prompt SQL> set Financial_Quarter_Code = 'Q2,FY2017'
prompt SQL> where Order_Date >= '01-APR-17'
prompt SQL> and   Order_Date <  '01-JUL-17'
prompt SQL> /
update wm_Orders
set Financial_Quarter_Code = 'Q2,FY2017'
where Order_Date >= '01-APR-17'
and   Order_Date <  '01-JUL-17'
;
prompt SQL> update wm_Orders
prompt SQL> set Financial_Quarter_Code = 'Q3,FY2017'
prompt SQL> where Order_Date >= '01-JUL-17'
prompt SQL> and   Order_Date <  '01-OCT-17'
prompt SQL> /
update wm_Orders
set Financial_Quarter_Code = 'Q3,FY2017'
where Order_Date >= '01-JUL-17'
and   Order_Date <  '01-OCT-17'
;
prompt SQL> update wm_Orders
prompt SQL> set Financial_Quarter_Code = 'Q4,FY2017'
prompt SQL> where Order_Date >= '01-OCT-17'
prompt SQL> and   Order_Date <  '01-JAN-18'
prompt SQL> /
update wm_Orders
set Financial_Quarter_Code = 'Q4,FY2017'
where Order_Date >= '01-OCT-17'
and   Order_Date <  '01-JAN-18'
;

prompt SQL> commit
prompt SQL> /
commit;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Remember the sequence of these operations. We shall refer to these in a 
prompt SQL> -- future lab.
prompt SQL> -- 1. Add column wm_Orders.Financial_Quarter_Code.
prompt SQL> -- 2. Create index wm_Orders_M1 on wm_Orders.
prompt SQL> -- 3. Add rows to wm_List_of_Values
prompt SQL> -- 4. Update orders to specify the appropriate financial quarter.
prompt SQL>
prompt SQL> -- The previous section included some standard DML (updates in this case)
prompt SQL> -- to change existing data in the normal course of an upgrade.
prompt SQL> -- One curiosity in this case is that the actual data to be updated is in the 
prompt SQL> -- Application PDBs, not in Application Root. (Notice that no rows were
prompt SQL> -- updated by any of these update statements in Application Root.)
prompt SQL> -- These statements are captured in Application Root, and will be replayed in
prompt SQL> -- the Application PDBs for each tenant / franchise when they synchronize.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 5. Declare the end of the patch definition.
prompt SQL>

prompt SQL> alter pluggable database application wmStore end patch
prompt SQL> /
alter pluggable database application wmStore end patch;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- We have now completed the definition of the application patch.
prompt SQL> -- As with upgrades, patches are defined in a "begin / end" block.
prompt SQL> -- Between the begin and end statements, the patch contains a typical set of
prompt SQL> -- SQL statements (both DDL and DML).
prompt SQL>
prompt SQL> -- We have also seen how the steps in the upgrade script are captured in  
prompt SQL> -- Application Root, to be replayed subsequently in the Application PDBs
prompt SQL> -- as they are sync'ed.
prompt SQL>
prompt SQL> -- The patch is applied to the Application PDBs by synchronizing them.
prompt SQL> -- In this lab, we'll patch three franchises - Tulsa, California and Tahoe.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 6. Sync Application PDBs for three franchises.
prompt SQL> --          Do not patch NYC yet.
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
prompt SQL> -- Review of Application Container Lab8:
prompt SQL> --   1. Define patch 301 for application wmStore.
prompt SQL> --      - Add column for financial quarter to wm_Orders.
prompt SQL> --      - Create a new index on wm_Orders.
prompt SQL> --      - Add more seed data to wm_List_of_Values.
prompt SQL> --      - Update data in wm_Orders to set the appropriate value for the newly added
prompt SQL> --        denormalized column.
prompt SQL> --   2. Propagate the Upgrade to three franchises (but not to all).
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************
