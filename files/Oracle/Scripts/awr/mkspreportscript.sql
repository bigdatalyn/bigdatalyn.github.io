-- Create a temporary SQL script to collect multiple Statspack reports
-- by specified number of days.
-- Usage : SQL> @mkspreportscript <number of days>
-- Sample: SQL> @mkspreportscript 5
set echo off
set feedback off
set verify off
set trimspool on
set serveroutput on
prompt Begin with getspreport.sql.
prompt ============================================================================
spool getspreport.sql replace

DECLARE
  num_day NUMBER := &1;
  has_record BOOLEAN := FALSE;
  cursor cur_instances is select distinct INSTANCE_NUMBER from STATS$SNAPSHOT;
BEGIN
  dbms_output.put_line('-- Temporary script created by mkspreportscript.sql');
  dbms_output.put_line('-- Used to create multiple Statspack reports between two snapshots');
  dbms_output.put_line('-- Usage : SQL> @getspreport');
  dbms_output.put_line('-- ');

  for inst_id in cur_instances LOOP
    dbms_output.put_line('-- INSTANCE: ' || inst_id.INSTANCE_NUMBER);
    for rec in (
      select DBID,
        INSTANCE_NUMBER,
        to_char(round(SNAP_TIME, 'mi'),'yyyymmdd') BEGIN_SNAP_TIME,
        SNAP_ID START_SNAP_ID,
        lead(SNAP_ID) over(order by SNAP_ID) END_SNAP_ID
      from STATS$SNAPSHOT
      where INSTANCE_NUMBER = inst_id.INSTANCE_NUMBER and
        SNAP_TIME > trunc(SYSDATE-num_day) and
        SNAP_TIME <= SYSDATE
      order by START_SNAP_ID
    ) LOOP
      continue when rec.END_SNAP_ID is null;
      has_record := TRUE;
      dbms_output.put_line('define begin_snap=' || rec.START_SNAP_ID);
      dbms_output.put_line('define end_snap=' || rec.END_SNAP_ID);
      dbms_output.put_line('define report_name=sp_'||rec.BEGIN_SNAP_TIME||'_'||rec.INSTANCE_NUMBER||'_'||rec.START_SNAP_ID||'-'||rec.END_SNAP_ID||'.lst');
      dbms_output.put_line('@?/rdbms/admin/spreport.sql');
    END LOOP;
  END LOOP;
  IF (NOT has_record) THEN
    dbms_output.put_line('prompt NO RECORD. ABORT!');
  ELSE
    dbms_output.put_line('undefine begin_snap;');
    dbms_output.put_line('undefine end_snap;');
    dbms_output.put_line('undefine report_name;');
    dbms_output.put_line('prompt DONE!');
  END IF;
END;
/

spool off
-- @getspreport.sql
prompt ============================================================================
prompt Done with getspreport.sql.
prompt Next, continue to launch:
prompt
prompt @getspreport
prompt
prompt to generate Statspack text reports in the current folder.
prompt ============================================================================

set feedback on
set verify on
set echo on