-- =========================================================================
--
--      File: Franchise_Data_Lab1.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/18/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Create franchise-specific data for Workshop Lab 1.
--
-- Description:
--   Create franchise-specific products and orders for Workshop Lab 1.
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
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

define Max_Num_Orders = 500
define Max_Items      = 5
define Max_Qty        = 4

define Franchise = Tulsa
connect wmStore_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for franchise &Franchise
prompt
insert into wm_Products (Name) values ('Amariller Chiller');
insert into wm_Products (Name) values ('Wichita Witchcraft');
insert into wm_Products (Name) values ('St Louis Blueberry');
insert into wm_Products (Name) values ('Arkansas Riviera');
commit;

@wm_Order_Data

define Franchise = California
connect wmStore_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for franchise &Franchise
prompt
insert into wm_Products (Name) values ('Surf Sup');
insert into wm_Products (Name) values ('Golden State of Mind');
insert into wm_Products (Name) values ('Fog City Mister');
insert into wm_Products (Name) values ('Fresno Fro-Yo');
commit;

@wm_Order_Data

define Franchise = Tahoe
connect wmStore_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for franchise &Franchise
prompt
insert into wm_Products (Name) values ('Emerald Baydream');
insert into wm_Products (Name) values ('Keep Tahoe Blueberry');
insert into wm_Products (Name) values ('Ski Bum');
insert into wm_Products (Name) values ('Fresh Pow Wow');
commit;

@wm_Order_Data

define Franchise = NYC
connect wmStore_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for franchise &Franchise
prompt
insert into wm_Products (Name) values ('Manhattan Madness');
insert into wm_Products (Name) values ('Lady Liberty Lemonade');
insert into wm_Products (Name) values ('Empire Statemint');
insert into wm_Products (Name) values ('Big Apple Pie');
commit;

@wm_Order_Data

