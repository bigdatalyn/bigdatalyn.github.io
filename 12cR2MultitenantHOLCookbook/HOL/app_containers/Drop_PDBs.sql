-- =========================================================================
--
--      File: Drop_PDBs.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/4/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Drop all PDBs.
--
-- Description:
--   Generates and runs a script to drop all PDBs.
-- 
-- This script will be invoked from within SQL Plus, connected to CDB$Root as SysDBA. 
--
-- ========================================================================

alter pluggable database all close immediate;

declare
cursor PDB_Curs is
  select PDB_Name
  from DBA_PDBs
  where PDB_Name <> 'PDB$SEED'
  and   Application_Clone = 'NO'
  order by Application_Root
  ,        PDB_Name
;
PDB_Name varchar2(50);
begin
  for PDB_Rec in PDB_Curs
  loop
    PDB_Name := PDB_Rec.PDB_Name;
    -- dbms_output.put_line('drop pluggable database '||PDB_Name||' including datafiles;');
    execute immediate('drop pluggable database '||PDB_Name||' including datafiles');
  end loop;
end;
/
