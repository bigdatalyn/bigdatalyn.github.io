-- =========================================================================
--
--      File: 10.Diagnose_Restart.sql
--    Author: Patrick G. Wheeler
-- $Revision: 1 $
--     $Date: 5/21/17 7:53p $
--   $Author: PWheeler $ of last update
--
-- Copyright (C) 2017 Oracle Corporation, All rights reserved.
--
-- Purpose: 
--   Diagnose a problem in applying a patch.
--   Demonstrate restartablility of patch.
--
-- Description:
--   1. Deliberately make a manual change to NYC that will conflict with applying patch.
--   2. Attempt to sync NYC to apply the patch - anticipating a failure.
--   3. Query relevant DBA views to identify the problem.
--   4. Resolve the problem and re-start the sync, which should now succeed.
-- 
-- Dependencies: 
--   - Oracle Database 12c Release 12.2 with Multitenant Option.
--   - Script Setup_Lab1 run successfully
--   - Script Setup_Lab2 run successfully
--   - Script Setup_Lab4 run successfully
--   - Script Setup_Lab5 run successfully
--   - Script Setup_Lab6 run successfully
--   - Script Setup_Lab7 run successfully
--   - Script Setup_Lab8 run successfully
-- 
-- This script will be invoked from within SQL Plus or SQLcl. 
--
-- ========================================================================

host clear
@Profile

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- In Lab10 we explore the restartability of the patching process.
prompt SQL> -- To demonstrate this, we do the following:
prompt SQL> -- 1. Deliberately make a manual change to NYC that will conflict with 
prompt SQL> --    applying patch 301.
prompt SQL> -- 2. Attempt to sync NYC to apply the patch - anticipating a failure.
prompt SQL> -- 3. Query relevant DBA views to identify the problem.
prompt SQL> -- 4. Resolve the problem and re-start the sync, which should now succeed.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 1. Manual change in NYC.
prompt SQL>

prompt SQL> connect wmStore_Admin/secret@//localhost/NYC
connect wmStore_Admin/secret@//localhost/NYC

prompt
prompt SQL> create index wm_Orders_M1 on wm_Orders(Order_Date)
prompt SQL> /
create index wm_Orders_M1 on wm_Orders(Order_Date);

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Here, we have deliberately added an index in NYC that we know will clash
prompt SQL> -- with patch 301.
prompt SQL>
prompt SQL> -- In the next step we're going to apply that patch, to observe the conflict.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 2. Sync Application PDB for franchise / tenant NYC to apply patch.
prompt SQL> --          This should fail because the index already exists
prompt SQL>

prompt SQL> connect c##System/secret@//localhost/NYC
connect c##System/secret@//localhost/NYC

prompt
prompt alter pluggable database application wmStore sync;
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- The patch application failed, with error message
prompt SQL> -- ORA-00955: name is already used by an existing object
prompt SQL>
prompt SQL> -- In the previous lab we learned about some of the DBA views that are 
prompt SQL> -- relevant to Application Container. Let's use that knowledge to pinpoint
prompt SQL> -- the specific problem encountered here.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 3. Diagnose the problem.
prompt SQL>

prompt SQL> set linesize 180

prompt SQL> column APP_NAME              heading "Application Name" format a20          truncate
prompt SQL> column APP_STATEMENT         heading "SQL Statement"    format a50          truncate    
prompt SQL> column ERRORNUM              heading "Error #"          format 999999         
prompt SQL> column ERRORMSG              heading "Error Message"    format a50          truncate
prompt SQL> column SYNC_TIME             heading "Sync TS"          format a9

set linesize 180

column APP_NAME              heading "Application Name" format a20          truncate
column APP_STATEMENT         heading "SQL Statement"    format a50          truncate    
column ERRORNUM              heading "Error #"          format 999999         
column ERRORMSG              heading "Error Message"    format a50          truncate
column SYNC_TIME             heading "Sync TS"          format a9

prompt SQL> select * from DBA_App_Errors
prompt SQL> /
select * from DBA_App_Errors;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- So the failure was in step 2 - adding the index.
prompt SQL> -- As expected, this failed, because the index already exists in this PDB.
prompt SQL> -- We have to fix this problem before we can proceed.
prompt SQL> -- The appropriate fix in this case is to drop the locally-created index.
prompt SQL>
prompt SQL> -- We'll do that, and then attempt to re-apply the patch.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL>
prompt SQL> -- Phase 4. Fix the problem and restart the patch application.
prompt SQL>

prompt SQL> connect wmStore_Admin/secret@//localhost/NYC
connect wmStore_Admin/secret@//localhost/NYC

prompt 
prompt SQL> drop index wm_Orders_M1
prompt SQL> /
drop index wm_Orders_M1;

prompt SQL> connect c##System/secret@//localhost/NYC
connect c##System/secret@//localhost/NYC

prompt
prompt alter pluggable database application wmStore sync;
prompt SQL> /
alter pluggable database application wmStore sync;

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- This time, the patch applied successfully.
prompt SQL> -- Recall again, however, the sequence of operations in Patch 301. 
prompt SQL> -- 1. Add column wm_Orders.Financial_Quarter_Code.
prompt SQL> -- 2. Create index wm_Orders_M1 on wm_Orders.
prompt SQL> -- 3. Add rows to wm_List_of_Values
prompt SQL> -- 4. Update orders to specify the appropriate financial quarter.
prompt SQL> -- It's important to note that it was the second step that failed. The first
prompt SQL> -- had already succeeded. All we did was to restart the patch application.
prompt SQL> -- However, the previous failed partial patch application was recorded with 
prompt SQL> -- enough information to know at which point to resume. This is why the second 
prompt SQL> -- attempt to apply the patch succeeded (and did not fail at step 1 because
prompt SQL> -- the column created in that step already exists).
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************

prompt SQL> -- ===========================================================================
prompt SQL>
prompt SQL> -- Review of Application Container Lab10:
prompt SQL> -- In this lab, we diagnosed a problem in applying a patch, resolved it, and 
prompt SQL> -- successfully restarted the patch application process. The detailed steps
prompt SQL> -- were:
prompt SQL> --   1. Deliberately make a manual change to NYC that will conflict with 
prompt SQL> --      applying the patch.
prompt SQL> --   2. Attempt to sync NYC to apply the patch - anticipating a failure.
prompt SQL> --   3. Query relevant DBA views to identify the problem.
prompt SQL> --   4. Resolve the problem and re-start the sync, which succeeded this time.
prompt SQL>
prompt SQL> -- ===========================================================================

prompt
prompt ***********************************************************************************
pause Press [Enter] to continue...
-- ***************************************************************************************
