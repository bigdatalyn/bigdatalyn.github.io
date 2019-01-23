-- =========================================================================
--
--      File: Terminal_Install.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/13/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Install v1 of Terminally Chill Application.
--
-- Description:
--   Install v1 of Terminally Chill Application.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Pre-created CDB with OMF. 
--   - This script will be invoked from within SQL Plus, having connected to 
--     CDB$Root as SysDBA. 
--
-- ========================================================================

-- Connect to Master Application Root and install Application.

create tablespace Terminal_TBS datafile size 100M autoextend on next 10M maxsize 200M;
create user Terminal_Admin identified by secret container=all;
grant create session, dba to Terminal_Admin;
alter user Terminal_Admin default tablespace Terminal_TBS;

-- Connected to Terminal_Admin

connect Terminal_Admin/secret@//localhost/Terminal_Master

prompt
prompt Define the application schema
prompt

create table tc_Products
sharing = extended data
(Row_GUID         raw(16)           default Sys_GUID()                      primary key 
,Name             varchar2(30)                                    not null  unique
,Local_Product_YN char(1)           default 'Y'                   not null
)
;
alter table tc_Products add constraint Local_Product_Bool
check (Local_Product_YN in ('Y','N'))
;

create table tc_Coupons
sharing = data
(Row_GUID         raw(16)           default Sys_GUID()                      primary key 
,Coupon_Number    number(16,0)      generated always as identity  not null  unique
,Campaign_Code    varchar2(30)
,Expiration_Date  date              default current_date+14
)
;

create table tc_Orders
sharing = metadata
(Row_GUID         raw(16)           default Sys_GUID()                      primary key 
,Order_Number     number(16,0)      generated always as identity  not null  unique
,Order_Date       date              default   current_date        not null 
,Kiosk_Code       varchar2(30)      not null
,Coupon_ID        raw(16)
,Campaign_Code    varchar2(30)      null
)
;
alter table tc_Orders add constraint tc_Orders_F1 
foreign key (Coupon_ID)
references tc_Coupons(Row_GUID)
disable
;

create table tc_Order_Items
sharing = metadata
(Row_GUID         raw(16)                    default Sys_GUID()           primary key 
,Order_ID         raw(16)           not null
,Item_Num         number(16,0)      not null
,Product_ID       raw(16)           not null
,Order_Qty        number(16,0)      not null
)
;
alter table tc_Order_Items add constraint tc_Order_Items_F1 
foreign key (Order_ID)
references tc_Orders(Row_GUID)
disable
;
alter table tc_Order_Items add constraint tc_Order_Items_F2 
foreign key (Product_ID)
references tc_Products(Row_GUID)
disable
;

create table tc_List_Of_Values
sharing = data
(Row_GUID    raw(16)        default Sys_GUID() primary key 
,Type_Code   varchar2(30)   not null
,Value_Code  varchar2(30)   not null
)
;
alter table tc_List_Of_Values  add constraint tc_List_Of_Values_U1
unique (Type_Code, Value_Code)
;

--
-- Create Seed Data
--

insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Airport');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Airport','LHR');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Airport','SFO');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Airport','JFK');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Airport','LAX');

insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Kiosk');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Kiosk','LHR T1');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Kiosk','LHR T4');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Kiosk','LHR T5');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Kiosk','SFO INTL');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Kiosk','SFO T2');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Kiosk','JFK T1');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Kiosk','JFK T2');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Kiosk','JFK T3');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Kiosk','LAX INTL');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Kiosk','LAX 7/8');

insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Campaign');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Campaign','Foreign Getaway');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Campaign','Lost Weekend');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Campaign','Road Warrior');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Campaign','World Citizen');

insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Type', 'Financial Quarter');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q1,FY2016');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q2,FY2016');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q3,FY2016');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q4,FY2016');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q1,FY2017');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q2,FY2017');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q3,FY2017');
insert into tc_List_Of_Values (Type_Code, Value_Code) values ('Financial Quarter', 'Q4,FY2017');

commit;

prompt
prompt Create seed data.
prompt

-- Products (Central + local)
insert into tc_Products (Row_GUID, Name, Local_Product_YN) values ('01', 'Tornado Twisted', 'N');
insert into tc_Products (Row_GUID, Name, Local_Product_YN) values ('02', 'Muskogee Magic', 'N');
insert into tc_Products (Row_GUID, Name, Local_Product_YN) values ('03', 'Root 66 Beer Float', 'N');
insert into tc_Products (Row_GUID, Name, Local_Product_YN) values ('04', 'Yokie Dokie Okie Eggnog', 'N');

commit;

