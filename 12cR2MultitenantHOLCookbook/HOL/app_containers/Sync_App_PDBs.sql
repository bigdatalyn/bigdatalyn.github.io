-- =========================================================================
--
--      File: Sync_App_PDBs.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/31/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Synchronize application PDBs.
--
-- Description:
--   Sync Application Seeds and Application PDBs for various franchises.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Two pre-created CDBs with OMF: CDB1 & CDB2.
--   - Application Roots, Seeds and Proxies created as appropriate.
-- 
-- This script will be invoked from within SQL Plus. 
--
-- ========================================================================

--
-- Sync Application Definitions to Agency PDBs.
--

-- First connect to CDB of Master Application Container to sync the ARRs via their proxies. 
connect c##System/secret@//localhost/cdb1
prompt
@Dyn_Sync_App_PDBs

-- Next connect to CDB of the ARRs and sync all their PDBs.
connect c##System/secret@//localhost/cdb2
prompt
@Dyn_Sync_App_PDBs
