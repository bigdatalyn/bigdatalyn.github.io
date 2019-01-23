-- =========================================================================
--
--      File: Drop_DB_Links.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/12/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Drop all DB Links owned by C##System.
--   Drop Public DB Links CDB1_DBLink and CDB2_DBLink.
--
-- Description:
--   Generates and runs a script to drop all DB Links owned by this user.
-- 
-- This script will be invoked from within SQL Plus, connected to CDB$Root as SysOper. 
--
-- ========================================================================

declare
cursor DBLink_Curs is
  select DB_Link
  from DBA_DB_Links
  where Owner = 'C##SYSTEM'
  order by 1
;
cursor Public_DBLink_Curs is
  select DB_Link
  from DBA_DB_Links
  where Owner = 'PUBLIC'
  and   DB_Link in ('CDB1_DBLINK','CDB2_DBLINK')
  order by 1
;
DB_Link_Name varchar2(50);
begin
  for DBLink_Rec in DBLink_Curs
  loop
    DB_Link_Name := DBLink_Rec.DB_Link;
    -- dbms_output.put_line('drop database link '||DB_Link_Name||';');
    execute immediate('drop database link '||DB_Link_Name);
  end loop;
  for Public_DBLink_Rec in Public_DBLink_Curs
  loop
    DB_Link_Name := Public_DBLink_Rec.DB_Link;
    -- dbms_output.put_line('drop public database link '||DB_Link_Name||';');
    execute immediate('drop public database link '||DB_Link_Name);
  end loop;
end;
/
