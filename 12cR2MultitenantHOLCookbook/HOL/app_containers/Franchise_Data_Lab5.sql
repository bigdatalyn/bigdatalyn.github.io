-- =========================================================================
--
--      File: Franchise_Data_Lab5.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/18/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Create franchise-specific data for Workshop Lab 5.
--
-- Description:
--   Create franchise-specific products and orders for Workshop Lab 5.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Application Container installed with applicable PDBs.
--   - Application Root wmStore_Master
--   - Application PDBs for franchises
--     - UK
--     - Denmark
--     - France
--     - Santa Monica
--     - Japan
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

define Max_Num_Orders = 500
define Max_Items      = 5
define Max_Qty        = 4

define Franchise = UK
connect wmStore_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for franchise &Franchise
prompt
insert into wm_Products (Name) values ('The Stiff Upper Lip');
insert into wm_Products (Name) values ('Mighty Blighty');
insert into wm_Products (Name) values ('British Understatemint');
insert into wm_Products (Name) values ('Pax Britannica');
commit;

@wm_Order_Data

define Franchise = Denmark
connect wmStore_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for franchise &Franchise
prompt
insert into wm_Products (Name) values ('Viking Virility');
insert into wm_Products (Name) values ('Tivolity Frivolity');
insert into wm_Products (Name) values ('Smorgasberried');
insert into wm_Products (Name) values ('Danish Pastries');
commit;

@wm_Order_Data

define Franchise = France
connect wmStore_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for franchise &Franchise
prompt
insert into wm_Products (Name) values ('Gallic Flair');
insert into wm_Products (Name) values ('La Mer de Glace');
insert into wm_Products (Name) values ('Le Coke Sportif');
insert into wm_Products (Name) values ('Insanity on the Seine');
commit;

@wm_Order_Data

define Franchise = Japan
connect wmStore_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for franchise &Franchise
prompt
insert into wm_Products (Name) values ('Shogun Shake');
insert into wm_Products (Name) values ('Mount Fuji Snowcone');
insert into wm_Products (Name) values ('Cherry Blossom Cherish');
insert into wm_Products (Name) values ('Shinkansen Strawberry');
commit;

@wm_Order_Data

define Franchise = Santa_Monica
connect wmStore_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for franchise &Franchise
prompt
insert into wm_Products (Name) values ('Sunset Surfrider');
insert into wm_Products (Name) values ('Beverly Chills');
insert into wm_Products (Name) values ('Redcurrant Carpet');
insert into wm_Products (Name) values ('End-of-Trail Pale Ale');
commit;

@wm_Order_Data

