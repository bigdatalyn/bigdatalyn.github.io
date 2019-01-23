-- =========================================================================
--
--      File: Demo_Users.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/31/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Create Oracle users required for Workshop Application.
--
-- Description:
--   Create Oracle users required for Workshop Application.
--   Following Oracle best practices, these will be surrogates for Sys and System.
--
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
-- 
-- This script will be invoked from within SQL Plus. 
--
-- ========================================================================

host clear

--
-- Create the Users required for this demo.
--

connect sys/oracle12@//localhost/cdb1 as sysdba

create user c##sysdba identified by secret container=all;
create user c##system identified by secret container=all;

grant sysdba, create session, set container to c##sysdba container=all;
grant dba, sysoper, create session, set container to c##system container=all;
alter user c##system set container_data=ALL container=current;
grant select on cdb_pdbs to c##system;

--
-- Hack system's password
--

alter profile DEFAULT limit password_life_time unlimited;
alter user system identified by secret;
alter user system identified by oracle12;

connect sys/oracle12@//localhost/cdb2 as sysdba

create user c##sysdba identified by secret container=all;
create user c##system identified by secret container=all;

grant sysdba, create session, set container to c##sysdba container=all;
grant dba, sysoper, create session, set container to c##system container=all;
alter user c##system set container_data=ALL container=current;
grant select on cdb_pdbs to c##system;

--
-- Hack system's password
--

alter profile DEFAULT limit password_life_time unlimited;
alter user system identified by secret;
alter user system identified by oracle12;

