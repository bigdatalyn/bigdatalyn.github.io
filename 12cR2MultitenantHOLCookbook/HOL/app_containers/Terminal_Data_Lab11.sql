-- =========================================================================
--
--      File: Terminal_Data_Lab11.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Create franchise-specific data for Workshop Lab 11.
--
-- Description:
--   Create franchise-specific products and orders for Workshop Lab 11.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Application Container installed with applicable PDBs.
--   - Application Root Terminal_Master
--   - Application definition: Terminal
--   - Application PDBs for franchises
--     - LHR
--     - SFO
--     - JFK
--     - LAX
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

define Max_Num_Orders = 500
define Max_Items      = 3
define Max_Qty        = 2

define Franchise = LHR
connect Terminal_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for Airport &Franchise
prompt
insert into tc_Products (Name) values ('Mist Connection');
insert into tc_Products (Name) values ('First Class Treatmint');
insert into tc_Products (Name) values ('Freak Quaint Flyer');
insert into tc_Products (Name) values ('Holding Pattern');
commit;

@tc_Order_Data

define Franchise = SFO
connect Terminal_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for Airport &Franchise
prompt
insert into tc_Products (Name) values ('Air Traffic Control');
insert into tc_Products (Name) values ('Turbulent Flight');
insert into tc_Products (Name) values ('Lost Baggage');
insert into tc_Products (Name) values ('Enhanced Security');
commit;

@tc_Order_Data

define Franchise = JFK
connect Terminal_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for Airport &Franchise
prompt
insert into tc_Products (Name) values ('Check In');
insert into tc_Products (Name) values ('Carry On');
insert into tc_Products (Name) values ('Middle Seat');
insert into tc_Products (Name) values ('Exit Row');
commit;

@tc_Order_Data

define Franchise = LAX
connect Terminal_Admin/secret@//localhost/&Franchise

prompt
prompt SQL> -- Products for Airport &Franchise
prompt
insert into tc_Products (Name) values ('Turboprop');
insert into tc_Products (Name) values ('Puddle Jumper');
insert into tc_Products (Name) values ('Super Jumbo');
insert into tc_Products (Name) values ('Sit Back and Chill-LAX');
commit;

@tc_Order_Data

