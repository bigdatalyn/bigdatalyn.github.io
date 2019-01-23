-- =========================================================================
--
--      File: 06.Durable_Location_Transparency.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Demo environment for Walts Malts.
--   Master script for Workshop Lab 6.
--   Durable Location Transparency.
--
-- Description:
--   Query order count per franchise for specified campaign.
--   Relocate a franchise's PDB.
--   Requery to ensure same answer.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
--   - Script Setup_Lab4 run successfully
--   - Script Setup_Lab5 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Lab6 demonstrates "durable location transparency".
prompt SQL> -- In Lab5 we saw how Proxy PDBs can provide location transparency.
prompt SQL> -- The Proxy PDBs for the Application Root Replicas (ARRs) provided local 
prompt SQL> -- context (in the master Application Root) for the ARRs, which are 
prompt SQL> -- physically located in a different CDB. This is a good example of location 
prompt SQL> -- transparency. 
prompt SQL>
prompt SQL> -- In this lab, we see how these ARR Proxies can provide "durable location
prompt SQL> -- transparency". That is, location transparency that survives the physical
prompt SQL> -- reconfiguration of the Application Estate - specifically by relocating
prompt SQL> -- an Application PDB for a particular franchise from one CDB to another.
prompt SQL>
prompt SQL> -- Let's get started!
prompt SQL>
prompt SQL> -- ===========================================================================

-- <Hack> ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
-- Hack to work around the problems here.
-- Run the query first silently. The first time around, it does not return enough rows.
set termout off
set echo off
set verify off
@Lab6_Campaign_Performance
-- </Hack> +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

@Profile

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1: Run application query:
prompt SQL> -- Order volume by franchise.
prompt SQL>
prompt SQL> -- Lab6_Campaign_Performance.sql runs a query to retrieve order volume by
prompt SQL> -- franchise for a specified campaign.
prompt SQL> -- Let's print it out.
prompt SQL> -- Notice that this is a containers() query, aggregating order volume across
prompt SQL> -- all franchises. Of course, Walt's Malts has now expanded beyond a single
prompt SQL> -- CDB! 
prompt SQL> -- Notice also the use of the pseudo-column CDB$Name. 
prompt SQL> -- This shows from which CDB the data is retrieved. 
prompt SQL>
host more Lab6_Campaign_Performance.sql

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Run the script to execute the query.
prompt SQL>
prompt SQL> @Lab6_Campaign_Performance
@Lab6_Campaign_Performance

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Now we're going to do some load balancing.
prompt SQL> -- We're going to relocate franchise Tahoe from CDB1 to CDB2. 
prompt SQL> -- Specifically we're going to relocate it to ARR wmStore_West.
prompt SQL> -- (Perhaps we could also think of this operation in terms of moving the 
prompt SQL> -- Application PDB to the physically nearest CDB to minimize latency.) 
prompt SQL>
prompt SQL> -- Here we'll use the PDB relocate capability, demonstrated in other Labs.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 2. Relocate PDB Tahoe from wmStore_Master to wmStore_West
prompt SQL> -- Remember that PDB relocate is a "pull" operation.
prompt SQL> -- Therefore we need to connect to the target ARR.
prompt SQL>
prompt SQL> connect c##system/secret@//localhost/wmStore_West
connect c##system/secret@//localhost/wmStore_West

prompt
prompt SQL>
prompt SQL> -- Initiate the online relocation of franchise Tahoe.
prompt SQL>
prompt SQL> create pluggable database Tahoe from Tahoe@CDB1_DBLink relocate
prompt SQL> /
create pluggable database Tahoe from Tahoe@CDB1_DBLink relocate;

-- Hack - should be able to do this as c##system!
prompt SQL>
prompt SQL> -- Complete the online relocation by opening the PDB in its new location.
prompt SQL>
prompt SQL> connect c##SysDBA/secret@//localhost/cdb2 as SysDBA
connect c##SysDBA/secret@//localhost/cdb2 as SysDBA
prompt SQL> alter pluggable database Tahoe open
prompt SQL> /
alter pluggable database Tahoe open;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Now, having relocated franchise Tahoe to CDB2, we're going to re-execute 
prompt SQL> -- our application query. 
prompt SQL>
prompt SQL> -- Pay close attention to the results of this query and compare them to the 
prompt SQL> -- results from the first time it was run. 
prompt SQL> -- They should be identical, with the sole exception that data for franchise  
prompt SQL> -- Tahoe is now retrieved from CDB2. 
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 3: Re-run application query:
prompt SQL>
prompt SQL> @Lab6_Campaign_Performance
@Lab6_Campaign_Performance

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Review of Application Container Lab6:
prompt SQL> -- In this lab, we have demonstrated "Durable Location Transparency".
prompt SQL> -- 1. We executed some application code - in this case aggregating order
prompt SQL> --    volume per campaign across all franchises.
prompt SQL> -- 2. Then we relocated one of the franchises to another CDB (without 
prompt SQL> --    incurring any application outage - the PDB remained open read/write  
prompt SQL> --    during this operation.
prompt SQL> -- 3. We re-executed the same application code. It continued to work, 
prompt SQL> --    despite the relocation of one of the Application PDBs.
prompt SQL>
prompt SQL> -- In a SaaS business we typically operate with large number of Application
prompt SQL> -- PDBs. On-going operations - load balancing, hardware refreshes, migrations
prompt SQL> -- to the Cloud - are going to involve relocation of PDBs.
prompt SQL> -- With this in mind, durable location transparency becomes an important 
prompt SQL> -- capability from the perspective of high availability.
prompt SQL> -- Even if a database were technically available, if you can't find it  
prompt SQL> -- (because it's moved), it might as well be offline.
prompt SQL>
prompt SQL> -- Durable location transparency, enabled via Proxy PDBs of Application 
prompt SQL> -- Root Replicas (ARRs), is a very important High Availability feature. 
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************
