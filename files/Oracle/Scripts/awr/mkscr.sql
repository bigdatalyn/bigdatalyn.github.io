-- usage: SQL> @mksrc <number of days>
-- sampl: SQL> @mkscr.sql 5
set echo off
set feedback off
set verify off
set trimspool on
set serveroutput on
spool getawrr.sql replace
DECLARE
  num_day NUMBER := &1;
  CURSOR sid_cur IS
    select
     es.DBID
    ,es.INSTANCE_NUMBER
    ,to_char(round(bs.END_INTERVAL_TIME,'mi'),'yyyy/mm/dd hh24') BEGIN_HOUR
    ,bs.SNAP_ID BEGIN_SNAP
    ,es.SNAP_ID END_SNAP
    from
     DBA_HIST_SNAPSHOT bs
    ,DBA_HIST_SNAPSHOT es
    where 1=1
    and bs.END_INTERVAL_TIME >= trunc(sysdate-num_day)
    and bs.END_INTERVAL_TIME <  trunc(sysdate)
    and abs(round(es.END_INTERVAL_TIME,'mi') - round(bs.END_INTERVAL_TIME,'mi')) < (1/24)*1.1
    and bs.SNAP_ID < es.SNAP_ID
    and bs.DBID = es.DBID
    and bs.INSTANCE_NUMBER = es.INSTANCE_NUMBER
    and bs.SNAP_FLAG = 0
    and es.SNAP_FLAG = 0
    order by
     bs.END_INTERVAL_TIME;
BEGIN
  FOR sid_rec IN sid_cur LOOP
    dbms_output.put_line('-- '||sid_rec.BEGIN_HOUR);
    dbms_output.put_line('define report_type=html');
    dbms_output.put_line('define dbid='||sid_rec.DBID);
    dbms_output.put_line('define inst_num='||sid_rec.INSTANCE_NUMBER);
    dbms_output.put_line('define num_days='||num_day);
    dbms_output.put_line('define begin_snap='||sid_rec.BEGIN_SNAP);
    dbms_output.put_line('define end_snap='||sid_rec.END_SNAP);
    dbms_output.put_line('define report_name=awrrpt_'||sid_rec.INSTANCE_NUMBER||'_'||sid_rec.BEGIN_SNAP||'_'||sid_rec.END_SNAP||'.html');
    dbms_output.put_line('@?/rdbms/admin/awrrpti.sql');
  END LOOP;
END;
/
spool off
set echo on
set feedback on
set verify on