





set lines 300 pages 1000
col OPERATION for a100 trunc
alter session set nls_date_format='yyyy-mm-dd hh24:mi:ss'; select s.inst_id,
SQL.SQL_TEXT as "OPERATION",
START_TIME,
LAST_UPDATE_TIME,
round(TIME_REMAINING/60,1) as "MINUTES_REMAINING", round((SOFAR/TOTALWORK) * 100,2) as PCT_DONE
from gv$session s, gv$sqlarea sql,
gv$session_longops op where
s.sid=op.sid
and s.sql_id = sql.sql_id
and s.sid = op.sid
and s.status = 'ACTIVE'
and op.totalwork > op.sofar
and upper(sql.sql_text) like 'CREATE%INDEX%'
and s.sid not in (select distinct sid from gv$mystat where rownum < 2) order by 4 desc;