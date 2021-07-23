

自动统计信息失败出现错误的问题

gather_external_table_stats returns an error from dbms_stats:
ORA-20000: Unable to analyze TABLE "XXXX"."XXXX", insufficient privileges or does not exist

查看自动统计信息收集的状态
- 针对 INSERT,UPDATE,DELETE,MERGE 更新量超过10%的对象，会作为统计信息收集对象

另外有时候expdp/impdp时候有一些外部表 没有清理干净导致自动收集统计信息失败
类似这种表：ET$*** 临时表
这种没有清理干净，一般是bug的问题： Bug#9466433 等

如果打Patch困难的话，可以考虑锁住这些对象表统计信息，可以接触自动收集统计信息失败的问题

SQL> select o.owner, object_name, created, last_ddl_time
2 from dba_objects o,
3 dba_external_tables et
4 where o.owner=et.owner
5 and o.object_name=et.table_name
6 order by 1,2
7 /

OWNER OBJECT_NAME CREATED LAST_DDL_TIME
------------------------------ ------------------------------ ------------------------- -------------------------
TESTDEV ET$004B00010001 12-04-19 12-04-19
TESTDEV ET$004E00040001 12-04-19 12-04-19

SQL>

可以查看path路径在哪？

SQL> set linesize 200 trimspool on
SQL> set pagesize 2000
SQL> col owner form a30
SQL> col created form a25
SQL> col last_ddl_time form a25
SQL> col object_name form a30
SQL> col object_type form a25
SQL> set longchunksize 3000
SQL> set long 2000000000
SQL> select OWNER,OBJECT_NAME,OBJECT_TYPE, status,to_char(CREATED,'dd-mon-yyyy hh24:mi:ss') created,to_char(LAST_DDL_TIME , 'dd-mon-yyyy hh24:mi:ss') last_ddl_time from dba_objects where object_name='ET$004B00010001';

SQL> select owner, TABLE_NAME, DEFAULT_DIRECTORY_NAME, ACCESS_TYPE from dba_external_tables order by 1,2;

SQL> select el.table_name, el.owner, dir.directory_path||'/'||dir.directory_name "path" from dba_external_locations el , dba_directories dir -
where el.table_name='ET$004B00010001' and el.owner='TESTDEV' and el.directory_owner = dir.owner and el.directory_name = dir.directory_name order by 1, 2;

SQL> select dbms_metadata.get_ddl('TABLE','ET$004B00010001','TESTDEV') from dual;


如果确认当前没在执行datapump情况下，可以手动删除。

-- locate Data Pump master tables:
COL owner.object FORMAT a50

SELECT o.status, o.object_id, o.object_type, 
       o.owner||'.'||object_name "OWNER.OBJECT"
  FROM dba_objects o, dba_datapump_jobs j
 WHERE o.owner=j.owner_name AND o.object_name=j.job_name
   AND j.job_name NOT LIKE 'BIN$%' ORDER BY 4,2;

select table_name, owner from dba_external_tables;

确认后删除：

SQL> drop table system.&1 purge;

生成构造语句：

SELECT 'DROP TABLE '||o.owner||'.'||object_name||' PURGE;'
FROM dba_objects o, dba_datapump_jobs j
WHERE o.owner=j.owner_name AND o.object_name=j.job_name
AND j.job_name NOT LIKE 'BIN$%';


SQL> EXECUTE DBMS_STATS.LOCK_TABLE_STATS(ownname=>'TESTDEV', tabname=>'ET$004B00010001');

统计信息收集窗口情况：

SELECT window_name, repeat_interval, duration
FROM dba_scheduler_windows
WHERE window_name in ('MONDAY_WINDOW','TUESDAY_WINDOW','WEDNESDAY_WINDOW','THURSDAY_WINDOW',
'FRIDAY_WINDOW','SATURDAY_WINDOW','SUNDAY_WINDOW');




set linesize 200 trimspool on
set pagesize 2000
col owner form a30
col created form a25
col last_ddl_time form a25
col object_name form a30
col object_type form a25

select OWNER,OBJECT_NAME,OBJECT_TYPE, status,
to_char(CREATED,'dd-mon-yyyy hh24:mi:ss') created ,to_char(LAST_DDL_TIME , 'dd-mon-yyyy hh24:mi:ss') last_ddl_time
from dba_objects
where object_name like 'ET$%'

select owner, TABLE_NAME, DEFAULT_DIRECTORY_NAME, ACCESS_TYPE
from dba_external_tables
order by 1,2;


COL owner.object FORMAT a50

SELECT o.status, o.object_id, o.object_type,
o.owner||'.'||object_name "OWNER.OBJECT"
FROM dba_objects o, dba_datapump_jobs j
WHERE o.owner=j.owner_name AND o.object_name=j.job_name
AND j.job_name NOT LIKE 'BIN$%' ORDER BY 4,2;


select table_name, owner from dba_external_tables;






参考文档：
Doc ID 1745851.1

How To Cleanup Orphaned DataPump Jobs In DBA_DATAPUMP_JOBS ? (Doc ID 336014.1)

ORA-20011: Approximate NDV failed: ORA-29913: error in executing ODCIEXTTABLEOPEN calloutv
ORA-20011 ORA-29913 and ORA-29400 with Associated KUP-XXXXX Errors from DBMS_STATS.GATHER_STATS_JOB (Doc ID 1274653.1)



Solution options per document mentioned:

Temporary Datapump External Table

Ensure that there are no DataPump jobs running at the same time as the DBMS_STATS job (this is to avoid any potential complications associated with cleaning up at the same time as something else is running).
Check and clean up orphaned DataPump jobs. The following article addresses a case where DBMS_WORKLOAD_CAPTURE does not drop external tables (causing ORA-20011 from DBMS_STATS):

Document 10327346.8 Bug 10327346 [https://bug.oraclecorp.com/pls/bug/webbug_edit.edit_info_top?rptno=10327346] - DBMS_WORKLOAD_CAPTURE does not drop external tables (causing ORA-20011 from DBMS_STATS)

Both above steps can be done by following Document:

Document 336014.1 How To Cleanup Orphaned DataPump Jobs In DBA_DATAPUMP_JOBS ?
Identify external tables. To do this, Run the following as SYSDBA in SQL*Plus


spool obj.out
set linesize 200 trimspool on
set pagesize 2000
col owner form a30
col created form a25
col last_ddl_time form a25
col object_name form a30
col object_type form a25

select OWNER,OBJECT_NAME,OBJECT_TYPE, status,
to_char(CREATED,'dd-mon-yyyy hh24:mi:ss') created
,to_char(LAST_DDL_TIME , 'dd-mon-yyyy hh24:mi:ss') last_ddl_time
from dba_objects
where object_name like 'ET$%'
/

select owner, TABLE_NAME, DEFAULT_DIRECTORY_NAME, ACCESS_TYPE
from dba_external_tables
order by 1,2
/

spool off


Correlate the information from DBA_OBJECTS and DBA_EXTERNAL TABLES above to identify the temporary external tables that belong to the DataPump.
Drop the temporary external tables that belong to the DataPump. eg:

SQL> drop table system.&1 purge;
Enter value for 1: ET$00654E1E0001
old 1: drop table system.&1 purge
new 1: drop table system.ET$00654E1E0001 purge

Other External Table

With cases where specific External tables (be they Demo Schema tables or other tables) are missing, the process for handling them is much the same and can be resolved by following the procedures below. For example, if the additional error is 'error opening file ../demo/schema/log/ext_1v3.log', then this indicates that there is a problem opening or locating the log file from the demo schema directory. The implication is that the demo tables have not been cleared up correctly:

Try to locate the files for these tables in their directory.

To confirm if a file is present at the expected location for the external file, the following query might be helpful.
undefine owner
undefine table_pattern

select el.table_name, el.owner, dir.directory_path||'/'||dir.directory_name "path"
from dba_external_locations el
, dba_directories dir
where el.table_name like '%&&table_pattern%'
and el.owner like '%&&owner%'
and el.directory_owner = dir.owner
and el.directory_name = dir.directory_name
order by 1, 2;

It may be that the files still exist but they have just been renamed or re-located. If that is the case you can correct the location to avoid the problem. If the file has been removed then follow either the following steps:

Lock the statistics on these tables by using the following command:
DBMS_STATS.LOCK_TABLE_STATS ('ownname','tabname');
(This step prevents DBMS_STATS from gathering against the missing table)

AND/OR

Remove the dictionary object for the external table. For example if the os file for the "SALES_TRANSACTIONS_EXT" Demo table is missing you would use :
DROP TABLE SALES_TRANSACTIONS_EXT;


