-- =========================================================================
--
--      File: Lab2_Products_Tulsa_NYC.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/20/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Show definition of table wm_Products in PDBs Tulsa and NYC.
--
-- Description:
-- Show definition of table wm_Products in PDBs Tulsa and NYC.
-- This will demonstrate that the upgrade has been propagated (via sync) with the 
-- Tulsa franchise but not with the NYC franchise.
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
--

host clear
@Profile

column Row_GUID noprint
column Name             format a30 heading "Product Name"
column Local_Product_YN format a14 heading "Local Product?"

define Franchise = "Tulsa"

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Phase 1. Show definition of table wm_Products in &Franchise.
prompt SQL>
prompt SQL> -- ===================================================================================
prompt

ttitle "Products in Franchise &Franchise"
set echo on
connect wmStore_Admin/secret@//localhost/&Franchise

desc wm_Products

select *
from wm_Products
; 

set echo off

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Notice that Tulsa has the new column Local_Product_YN, added during the
prompt SQL> -- upgrade to v2.0.
prompt SQL>
prompt SQL> -- Now let's switch to NYC, and look at the definition of wm_Products there.
prompt SQL>
prompt SQL> -- ===================================================================================
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

define Franchise = "NYC"

ttitle "Products in Franchise &Franchise"
set echo on
connect wmStore_Admin/secret@//localhost/&Franchise

desc wm_Products

select *
from wm_Products
; 

set echo off

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Notice that NYC does not have the new column Local_Product_YN, because
prompt SQL> -- this franchise / tenant has not yet upgraded to v2.0.
prompt SQL>
prompt SQL> -- This is an important advantage of Multitenancy with Application Container.
prompt SQL> -- It is not necessary to enforce a simultaneous business-wide application 
prompt SQL> -- upgrade. Tenants / franchises can upgrade on an individual schedule if 
prompt SQL> -- necessary. 
prompt SQL>
prompt SQL> -- ===================================================================================
prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************



