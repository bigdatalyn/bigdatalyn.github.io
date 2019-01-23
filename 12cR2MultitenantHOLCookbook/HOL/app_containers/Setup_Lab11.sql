-- =========================================================================
--
--      File: Setup_Lab11.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/20/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Terminally Chill.
--   Master script for Workshop Lab 11.
--
-- Description:
--   Explore Container Map.
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

-- Phase 1. Setup Application Root and Application PDBs for new Airport franchises.
@tc_PDBs_Lab11

-- Phase 2. Install v1 of Application "Terminal".
connect c##system/secret@//localhost/Terminal_Master

-- Phase 2a. Declare the start of the application installation.
alter pluggable database application Terminal begin install '1.0';

-- Phase 2b. Setup Container Map.
-- 2b1. Setup Container Map Table.
create table Kiosk_Map
(Kiosk varchar2(30) not null
)
partition by list (Kiosk)
(partition LHR values ('LHR T1','LHR T4','LHR T5')
,partition SFO values ('SFO INTL','SFO T2')
,partition JFK values ('JFK T1','JFK T2','JFK T3')
,partition LAX values ('LAX INTL','LAX 7/8')
)
; 

-- 2b2. Define Container Map property.
alter database set Container_Map = 'C##SYSTEM.KIOSK_MAP';

-- Phase 2c. Proceed with rest of application installation (typical operations).
@Terminal_Install

-- Phase 2d. Define tc_Orders as containers default and enable for Container Map.
alter table tc_Orders enable containers_default;
alter table tc_Orders enable container_map;

-- Phase 2e. Declare the end of the application installation.
alter pluggable database application Terminal end install '1.0';

-- Phase 3. Sync Application PDBs.
connect c##System/secret@//localhost/LHR
alter pluggable database application Terminal sync;

connect c##System/secret@//localhost/SFO
alter pluggable database application Terminal sync;

connect c##System/secret@//localhost/JFK
alter pluggable database application Terminal sync;

connect c##System/secret@//localhost/LAX
alter pluggable database application Terminal sync;

-- Phase 4: Create franchise-specific products
@Terminal_Data_Lab11

-- Phase 5. Use Container Map
prompt Now run @Lab11_Container_Map

