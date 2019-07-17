rem take som session id as argument
column mon_sql_id new_value mon_sql_id
select nvl(sql_id,prev_sql_id) mon_sql_id
from v$session where sid=&&1
/
set trimspool on heading off echo off verify off
set longchunksize 5000000 long 5000000 timing on lines 999 pages 0 
set termout off
spool &mon_sql_id..html
select
DBMS_SQLTUNE.REPORT_SQL_MONITOR( sql_id=>'&mon_sql_id', report_level=>'ALL', type=>'active') 
from dual;
spool off
set termout on
