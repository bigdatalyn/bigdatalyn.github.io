---
layout: post
title: "Oracle SYSAUX huge space Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle SYSAUX huge space Tips


If SYS.WRI$_ADV_OBJECTS is one of the largest objects, cancel or delete old segment adviser tasks.

The task 'Get shrink advice based on object growth trend' in particular can use a lot of space.

If there is space pressure, cancel and delete these tasks in Grid/Database Control via Performance> Advisors Home or manually using the DBMS_ADVISOR package.







### Solution

The following sql is useful for fix the space problem.

```sql
-- Expect thousands of rows
select count(*) from DBA_ADVISOR_TASKS;

-- List results in html
set echo on
set markup html on spool on ENTMAP OFF
spool tasks.html

select * from DBA_ADVISOR_TASKS order by CREATED asc;

spool off
set markup html off spool off ENTMAP on


-- To delete a small number of old tasks, you can use syntax like:

DECLARE
task_name VARCHAR2(30);
BEGIN
task_name := '<task name> ';

DBMS_ADVISOR.DELETE_TASK(task_name);
END;
/

DECLARE
task_name VARCHAR2(30);
BEGIN
task_name := '<task name> ';

DBMS_ADVISOR.CANCEL_TASK('My Task');
END;


-- Delete ADDM tasks(Expect thousands of ADDM task rows)
-- create delete sql file

set head off
spool dt.sql
select 'exec DBMS_ADVISOR.DELETE_TASK(~'||task_name||'~);' from DBA_ADVISOR_TASKS where upper(task_name) like 'ADDM%';
spool off

-- then vi dt.sql in a text editor and replace the ~ characters with ' characters.
-- example
------
-- before:
-- exec DBMS_ADVISOR.DELETE_TASK(~ADDM:2591242759_1_26297~);
------
-- after:
------
-- exec DBMS_ADVISOR.DELETE_TASK('ADDM:2591242759_1_26297');

select count(*) from DBA_ADVISOR_TASKS;

--  run dt.sql to delete the tasks.

select count(*) from DBA_ADVISOR_TASKS;

```


#### Others sql tips


```sql
select task_name,status,to_char(created,'yyyy/mm/dd hh24:mi:ss') from dba_advisor_tasks where task_name like '%ADVISOR%';
DECLARE
  v_tname VARCHAR2(32767);
BEGIN
  v_tname := 'AUTO_STATS_ADVISOR_TASK';
  DBMS_STATS.DROP_ADVISOR_TASK(v_tname);
END;
/

EXEC DBMS_STATS.INIT_PACKAGE();
select task_name,status,to_char(created,'yyyy/mm/dd hh24:mi:ss') from dba_advisor_tasks where task_name like '%ADVISOR%';
```


Sample:
```sql
SYS@cdb1> set linesize 300
SYS@cdb1> col TASK_NAME for a50
SYS@cdb1> select task_name,status,to_char(created,'yyyy/mm/dd hh24:mi:ss') from dba_advisor_tasks where task_name like '%ADVISOR%';

TASK_NAME					   STATUS      TO_CHAR(CREATED,'YY
-------------------------------------------------- ----------- -------------------
AUTO_STATS_ADVISOR_TASK 			   COMPLETED   2019/04/17 01:14:34
INDIVIDUAL_STATS_ADVISOR_TASK			   INITIAL     2019/04/17 01:14:34

DECLARE
  v_tname VARCHAR2(32767);
  3  BEGIN
  4    v_tname := 'AUTO_STATS_ADVISOR_TASK';
  DBMS_STATS.DROP_ADVISOR_TASK(v_tname);
  6  END;
  7  /

PL/SQL procedure successfully completed.

SYS@cdb1> select task_name,status,to_char(created,'yyyy/mm/dd hh24:mi:ss') from dba_advisor_tasks where task_name like '%ADVISOR%';

TASK_NAME					   STATUS      TO_CHAR(CREATED,'YY
-------------------------------------------------- ----------- -------------------
INDIVIDUAL_STATS_ADVISOR_TASK			   INITIAL     2019/04/17 01:14:34

SYS@cdb1> EXEC DBMS_STATS.INIT_PACKAGE();

PL/SQL procedure successfully completed.

SYS@cdb1> select task_name,status,to_char(created,'yyyy/mm/dd hh24:mi:ss') from dba_advisor_tasks where task_name like '%ADVISOR%';

TASK_NAME					   STATUS      TO_CHAR(CREATED,'YY
-------------------------------------------------- ----------- -------------------
INDIVIDUAL_STATS_ADVISOR_TASK			   INITIAL     2019/04/17 01:14:34
AUTO_STATS_ADVISOR_TASK 			   INITIAL     2022/01/19 11:46:10

SYS@cdb1>
```


```sql
COL SEGMENT_NAME FORMAT A30
COL OWNER FORMAT A10
COL TABLESPACE_NAME FORMAT A10
COL SEGMENT_TYPE FORMAT A15
SELECT * FROM (SELECT SEGMENT_NAME,OWNER,TABLESPACE_NAME,BYTES/1024/1024 "SIZE(MB)",SEGMENT_TYPE FROM DBA_SEGMENTS WHERE TABLESPACE_NAME='SYSAUX' ORDER BY BYTES DESC) WHERE ROWNUM<=10;
```


#### EXECUTION_DAYS_TO_EXPIRE Tips

Since AUTO_STATS_ADVISOR_TASK records are not purged from WRI$_ADV_OBJECTS, the SYSAUX space usage is growing rapidly.

The EXECUTION_DAYS_TO_EXPIRE parameter is set to 30 (by default) for AUTO_STATS_ADVISOR_TASK.

In Multitenant environment (CDB/PDB), even after applying the aforesaid respective RU patch, the expired AUTO_STATS_ADVISOR_TASK data is NOT purged automatically from PDB despite the default setting of EXECUTION_DAYS_TO_EXPIRE to 30 or to any custom value. In CDB, the expired tasks are purged through Auto-Purge window. In such cases, the expired tasks can be deleted manually using the above command in PDB to clear the SYSAUX space due to AUTO_STATS_ADVISOR_TASK pertaining to the particular PDB. There is an enhancement request raised to implement the Auto-Purge mechanism of expired advisor tasks from PDB as well.

If the default 30 days retention period is not required with the interest of SYSAUX space consumption then EXECUTION_DAYS_TO_EXPIRE parameter value can be adjusted. Following commands can be used to modify the parameter to custom value as per the requirement to purge the statistics advisor data with lesser retention period. In this example, it is set to 10.

```sql
SYS@cdb1> col parameter_name format a35
SYS@cdb1> col parameter_value format a20
SYS@cdb1> set lines 120
SYS@cdb1> select TASK_NAME,parameter_name, parameter_value FROM DBA_ADVISOR_PARAMETERS WHERE task_name='AUTO_STATS_ADVISOR_TASK' and PARAMETER_NAME='EXECUTION_DAYS_TO_EXPIRE';

TASK_NAME		  PARAMETER_NAME		      PARAMETER_VALUE
------------------------- ----------------------------------- --------------------
AUTO_STATS_ADVISOR_TASK   EXECUTION_DAYS_TO_EXPIRE	      30

SYS@cdb1> exec prvt_advisor.delete_expired_tasks;

PL/SQL procedure successfully completed.

SYS@cdb1> EXEC DBMS_ADVISOR.SET_TASK_PARAMETER(task_name=> 'AUTO_STATS_ADVISOR_TASK', parameter=> 'EXECUTION_DAYS_TO_EXPIRE', value => 10);

PL/SQL procedure successfully completed.

SYS@cdb1> select TASK_NAME,parameter_name, parameter_value FROM DBA_ADVISOR_PARAMETERS WHERE task_name='AUTO_STATS_ADVISOR_TASK' and PARAMETER_NAME='EXECUTION_DAYS_TO_EXPIRE';

TASK_NAME		  PARAMETER_NAME		      PARAMETER_VALUE
------------------------- ----------------------------------- --------------------
AUTO_STATS_ADVISOR_TASK   EXECUTION_DAYS_TO_EXPIRE	      10

SYS@cdb1>
```



### Reference

How To Recreate the SYSAUX Tablespace (Doc ID 468116.1)
How to Reduce SYSAUX Tablespace Occupancy Due to Fragmented TABLEs and INDEXes (Doc ID 1563921.1)
How to Address Issues Where AWR Data Uses Significant Space in the SYSAUX Tablespace (Doc ID 287679.1)

12.2.0.1への移行後Statistics Advisor の機能により SYSAUX表領域が大きくなる (Doc ID 2355243.1)
　2. WRI$_ADV_OBJECTS 表の AUTO_STATS_ADVISOR_TASK に関するレコードが非常に多くあり、データ削除に REDO/UNDO が多く使用されそうな場合には、1 のかわりに以下の方法でデータのパージを行うことで、REDO/UNDOの消費を避けることができます。

SYSAUX 表領域が肥大化した場合の対応方法(KROWN:125796) (Doc ID 1740178.1)

How To Purge Optimizer Statistics Advisor Old Records From 12.2 Onwards (Doc ID 2660128.1)


Have a good work&life! 2022/01 via LinHong

