-- =========================================================================
--
--      File: 11.Container_Map.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/27/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 11.
--
-- Description:
--   Explore Container Map.
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--     (Although sequenced after Labs 1-10, there are no dependencies on other labs.)
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In Lab11 we explore another location transparency technology: 
prompt SQL> -- Container Map.
prompt SQL>
prompt SQL> -- Here we follow the expansion of Walt's Malts through the acquisition of  
prompt SQL> -- a formerly independent distributor of Walt's Malts products. This company
prompt SQL> -- is named Terminally Chill, and their niche was selling Walt's Malts produce
prompt SQL> -- through a number of small kiosks in various airports globally.
prompt SQL>
prompt SQL> -- The Terminally Chill application has a different design from the original
prompt SQL> -- wmStore application. Whereas wmStore was originally designed for 
prompt SQL> -- standalone deployment, Terminally Chill used a single database to manage 
prompt SQL> -- data for all kiosks in all airports. The application server tiers are 
prompt SQL> -- designed to connect directly to a single database, with query predicates 
prompt SQL> -- to retrieve data for the right airport and kiosk. 
prompt SQL>
prompt SQL> -- In this lab, we'll see how Container Map can help accommodate applications 
prompt SQL> -- of this design.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1: Setup Application Root and Application PDBs for new Airport
prompt SQL> --          franchises.
prompt SQL>
prompt SQL> @tc_PDBs_Lab11
@tc_PDBs_Lab11

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- The key step in this lab immediately follows the declaration of the 
prompt SQL> -- application installation. 
prompt SQL> -- Here we set up the Container Map, in terms of a Map table and the 
prompt SQL> -- Container_Map database property.
prompt SQL>
prompt SQL> -- The container map is a table definiton where each partition name 
prompt SQL> -- corresponds to a PDB name. You only need one column in this table that
prompt SQL> -- you have decided to use to partition the data.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 2. Install v1 of Application "Terminal".
prompt SQL>

prompt SQL> connect c##system/secret@//localhost/Terminal_Master
connect c##system/secret@//localhost/Terminal_Master

prompt
prompt SQL>
prompt SQL> -- Phase 2a. Declare the start of the application installation.
prompt SQL>
prompt SQL> alter pluggable database application Terminal begin install '1.0'
prompt SQL> / 
alter pluggable database application Terminal begin install '1.0';

prompt SQL> -- Phase 2b. Setup Container Map.
prompt SQL> -- 2b1. Create Container Map Table.
prompt SQL>
prompt SQL> connect c##System/secret@//localhost/Terminal_Master
connect c##System/secret@//localhost/Terminal_Master

prompt
prompt SQL> create table Kiosk_Map
prompt SQL> (Kiosk varchar2(30) not null
prompt SQL> )
prompt SQL> partition by list (Kiosk)
prompt SQL> (partition LHR values ('LHR T1','LHR T4','LHR T5')
prompt SQL> ,partition SFO values ('SFO INTL','SFO T2')
prompt SQL> ,partition JFK values ('JFK T1','JFK T2','JFK T3')
prompt SQL> ,partition LAX values ('LAX INTL','LAX 7/8')
prompt SQL> )
prompt SQL> / 
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

prompt SQL>
prompt SQL> -- 2b2. Define Container Map property for the database.
prompt SQL>
prompt SQL> alter database set Container_Map = 'c##System.Kiosk_Map';
prompt SQL> / 
alter database set Container_Map = 'c##System.Kiosk_Map';

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Notice that the Container Map is defined with Partitioning syntax.
prompt SQL> -- In our example, Terminally Chill, each partition listed in the Container   
prompt SQL> -- Map is the name of an Application PDB - for a tenant / franchise.
prompt SQL> -- For each Partition / Application PDB / tenant / franchise
prompt SQL> -- there is a list of kiosks associated with that Application PDB.
prompt SQL> -- In the query section of this lab, we'll use these kiosk codes as query
prompt SQL> -- predicates. Container Map uses the mapping defined above to route these
prompt SQL> -- queries to the appropriate PDB.
prompt SQL>
prompt SQL> -- So this was a two-step process:
prompt SQL> -- 1. Create the Map table.
prompt SQL> -- 2. Set the Container Map property for the database.
prompt SQL> -- Notice that it is not necessary to populate the Container Map table with 
prompt SQL> -- any data.
prompt SQL>
prompt SQL> -- Now we proceed to execute the standard installation script for the
prompt SQL> -- Terminally Chill application.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 2c. Install v1 of Application "Terminal".
prompt SQL> -- Basic Application Installation.
prompt SQL>

prompt SQL> @Terminal_Install
@Terminal_Install

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 2d. Prepare tables to take advantage of Container Map capabilities.
prompt SQL> -- Define tc_Orders as containers default and enable for Container Map.
prompt SQL>
prompt SQL> alter table tc_Orders enable containers_default
prompt SQL> / 
alter table tc_Orders enable containers_default;

prompt SQL> alter table tc_Orders enable container_map
prompt SQL> / 
alter table tc_Orders enable container_map;

prompt SQL>
prompt SQL> -- Phase 2e. Declare the end of the application installation.
prompt SQL>
prompt SQL> alter pluggable database application Terminal end install '1.0'
prompt SQL> / 
alter pluggable database application Terminal end install '1.0';

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Notice that following the standard application installation, table
prompt SQL> -- tc_Orders was altered to take advantage of Container Map capabilities.
prompt SQL> -- This is a two-step process.
prompt SQL> -- 1. Define the table as "containers_default".
prompt SQL> --    This means that a "standard" query against this table in Application 
prompt SQL> --    Root will be converted into containers() syntax implicitly.
prompt SQL> -- 2. Enable Container_Map for the table.
prompt SQL> --    This means that queries against this table in Application Root will
prompt SQL> --    be routed to the appropriate PDB. The requirement is that the table
prompt SQL> --    definition include the Container Map column - Kiosk in our example.   
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 3. Sync Application PDBs. 
prompt SQL>
prompt SQL> connect c##System/secret@//localhost/LHR
connect c##System/secret@//localhost/LHR
prompt
prompt SQL> alter pluggable database application Terminal sync
prompt SQL> /
alter pluggable database application Terminal sync;

prompt SQL> connect c##System/secret@//localhost/SFO
connect c##System/secret@//localhost/SFO
prompt
prompt SQL> alter pluggable database application Terminal sync
prompt SQL> /
alter pluggable database application Terminal sync;

prompt SQL> connect c##System/secret@//localhost/JFK
connect c##System/secret@//localhost/JFK
prompt
prompt SQL> alter pluggable database application Terminal sync
prompt SQL> /
alter pluggable database application Terminal sync;

prompt SQL> connect c##System/secret@//localhost/LAX
connect c##System/secret@//localhost/LAX
prompt
prompt SQL> alter pluggable database application Terminal sync
prompt SQL> /
alter pluggable database application Terminal sync;

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 4: Create franchise-specific products
prompt SQL>
prompt SQL> @Terminal_Data_Lab11
@Terminal_Data_Lab11

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

-- Phase 5. Use Container Map
prompt SQL> @Lab11_Container_Map
@Lab11_Container_Map

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Review of Application Container Lab11:
prompt SQL> -- In this lab, we have explored the Container Map feature. 
prompt SQL> -- Container Map may be viewed as another location transparency feature.
prompt SQL> -- We went through several steps during this lab. Many of these are  
prompt SQL> -- familiar, but the new concept introduced is in Phase 2b, when we defined  
prompt SQL> -- the Container Map. The steps are summarized below:
prompt SQL>
prompt SQL> -- Phase 1: Setup Application PDBs for new Airport franchises.
prompt SQL> -- Phase 2. Install v1 of Application "Terminal", in important sub-steps:
prompt SQL> --       2a. Declare the start of the application installation.
prompt SQL> --       2b. Create Container Map Table and set Container_Map property 
prompt SQL> --           for the database. 
prompt SQL> --       2c. Execute standard installation for the application
prompt SQL> --       2d. Prepare tables to be used with Container Map as required.
prompt SQL> --           This includes setting containers_default and enabling 
prompt SQL> --           container_map for the required tables.
prompt SQL> --       2e. Declare the end of the application installation. 
prompt SQL> -- Phase 3. Sync Application PDBs. 
prompt SQL> -- Phase 4: Create franchise-specific demonstration data.
prompt SQL> -- Phase 5: Perform various queries to see how Container Map can deliver
prompt SQL> --          location transparency.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************


