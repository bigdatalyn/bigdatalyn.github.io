---
layout: post
title: "Oracle 19c Exadata Statistic Tips"
category: Oracle
tags: Oracle hint Tips
---

* content
{:toc}

Oracle 19c Exadata Statistic Tip

List some tips of statistical information collection in the Exadata.







### Exadata 统计信息


```sql
SQL> select pname, PVAL1 from aux_stats$ where pname='MBRC';

SQL> execute dbms_stats.gather_system_stats('EXADATA');
```

如果下面结果PAVL1是NULL的话，说明Exadata环境没有收集Exadata统计信息

```sql
SYS@cdb1> select pname, PVAL1 from aux_stats$ where pname='MBRC';

PNAME				    PVAL1
------------------------------ ----------
MBRC

SYS@cdb1>
```

### 统计信息收集策略：数据字典统计

Oracle database 固定表统计信息收集

Oracle内部表 x$...表的统计信息

```sql
SQL> execute dbms_stats.gather_fixed_objects_stats();
```

```
SQL> execute dbms_stats.set_gobal_prefs('AUTOSTATS_TARGET', 'ORACLE');
```

```sql
Automatic Optimizer Statistics Collection—用于收集各种数据库对象的统计信息。这里又有三种模式：
‘ALL’ – Statistics are collected for all objects in the system
‘ORACLE’ – Statistics are collected for all Oracle owned objects
‘AUTO’ – Oracle decides for which objects to collect statistics
可以通过以下API进行设置
      DBMS_STATS.SET_GLOBAL_PREFS (
        pname VARCHAR2,
        pval VARCHAR2);
  pname为”AUTOSTATS_TARGET”，pval为以上三个值之一。
```

一些查看属性的常用脚本：

```sql
-- -----------------------------------------------------------------------------------
-- File Name    : https://oracle-base.com/dba/monitoring/statistics_prefs.sql
-- Author       : Tim Hall
-- Description  : Displays current statistics preferences.
-- Requirements : Access to the DBMS_STATS package.
-- Call Syntax  : @statistics_prefs
-- Last Modified: 06-DEC-2013
-- -----------------------------------------------------------------------------------

SET LINESIZE 250

COLUMN autostats_target FORMAT A20
COLUMN cascade FORMAT A25
COLUMN degree FORMAT A10
COLUMN estimate_percent FORMAT A30
COLUMN method_opt FORMAT A25
COLUMN no_invalidate FORMAT A30
COLUMN granularity FORMAT A15
COLUMN publish FORMAT A10
COLUMN incremental FORMAT A15
COLUMN stale_percent FORMAT A15

SELECT DBMS_STATS.GET_PREFS('AUTOSTATS_TARGET') AS autostats_target,
       DBMS_STATS.GET_PREFS('CASCADE') AS cascade,
       DBMS_STATS.GET_PREFS('DEGREE') AS degree,
       DBMS_STATS.GET_PREFS('ESTIMATE_PERCENT') AS estimate_percent,
       DBMS_STATS.GET_PREFS('METHOD_OPT') AS method_opt,
       DBMS_STATS.GET_PREFS('NO_INVALIDATE') AS no_invalidate,
       DBMS_STATS.GET_PREFS('GRANULARITY') AS granularity,
       DBMS_STATS.GET_PREFS('PUBLISH') AS publish,
       DBMS_STATS.GET_PREFS('INCREMENTAL') AS incremental,
       DBMS_STATS.GET_PREFS('STALE_PERCENT') AS stale_percent
FROM   dual;
```
```
AUTOSTATS_TARGET CASCADE		 DEGREE ESTIMATE_PERCENT	    METHOD_OPT		      NO_INVALIDATE		 GRANULARITY PUBLISH INCREMENTAL STALE_PERCENT
---------------- ----------------------- ------ --------------------------- ------------------------- -------------------------- ----------- ------- ----------- -------------
AUTO		 DBMS_STATS.AUTO_CASCADE NULL	DBMS_STATS.AUTO_SAMPLE_SIZE FOR ALL COLUMNS SIZE AUTO DBMS_STATS.AUTO_INVALIDATE AUTO	     TRUE    FALSE	 10

SYS@cdb1>

```


```sql
-- https://chandlerdba.com/tag/dbms_stats-get_prefs/
-- select * from user_tab_stat_prefs where table_name = '&&TABLE';
undefine TABLE
prompt Enter Table Name 
prompt &&TABLE

select rpad('ANDV_ALGO_INTERNAL_OBSERVE : ',42)||dbms_stats.get_prefs(pname=>'ANDV_ALGO_INTERNAL_OBSERVE', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('APPROXIMATE_NDV : ',42)||dbms_stats.get_prefs(pname=>'APPROXIMATE_NDV', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('APPROXIMATE_NDV_ALGORITHM : ',42)||dbms_stats.get_prefs(pname=>'APPROXIMATE_NDV_ALGORITHM', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('AUTO_STAT_EXTENSIONS : ',42)||dbms_stats.get_prefs(pname=>'AUTO_STAT_EXTENSIONS', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('AUTOSTATS_TARGET : ',42)||dbms_stats.get_prefs(pname=>'AUTOSTATS_TARGET', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('AUTO_TASK_INTERVAL : ',42)||dbms_stats.get_prefs(pname=>'AUTO_TASK_INTERVAL', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('AUTO_TASK_MAX_RUN_TIME : ',42)||dbms_stats.get_prefs(pname=>'AUTO_TASK_MAX_RUN_TIME', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('AUTO_TASK_STATUS : ',42)||dbms_stats.get_prefs(pname=>'AUTO_TASK_STATUS', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('CASCADE : ',42)||dbms_stats.get_prefs(pname=>'CASCADE', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('CONCURRENT : ',42)||dbms_stats.get_prefs(pname=>'CONCURRENT', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('COORDINATOR_TRIGGER_SHARD : ',42)||dbms_stats.get_prefs(pname=>'COORDINATOR_TRIGGER_SHARD', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('DEBUG : ',42)||dbms_stats.get_prefs(pname=>'DEBUG', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('DEGREE : ',42)||dbms_stats.get_prefs(pname=>'DEGREE', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('ENABLE_HYBRID_HISTOGRAMS : ',42)||dbms_stats.get_prefs(pname=>'ENABLE_HYBRID_HISTOGRAMS', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('ENABLE_TOP_FREQ_HISTOGRAMS : ',42)||dbms_stats.get_prefs(pname=>'ENABLE_TOP_FREQ_HISTOGRAMS', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('ESTIMATE_PERCENT : ',42)||dbms_stats.get_prefs(pname=>'ESTIMATE_PERCENT', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('GATHER_AUTO : ',42)||dbms_stats.get_prefs(pname=>'GATHER_AUTO', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('GATHER_SCAN_RATE : ',42)||dbms_stats.get_prefs(pname=>'GATHER_SCAN_RATE', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('GLOBAL_TEMP_TABLE_STATS : ',42)||dbms_stats.get_prefs(pname=>'GLOBAL_TEMP_TABLE_STATS', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('GRANULARITY : ',42)||dbms_stats.get_prefs(pname=>'GRANULARITY', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('INCREMENTAL : ',42)||dbms_stats.get_prefs(pname=>'INCREMENTAL', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('INCREMENTAL_INTERNAL_CONTROL : ',42)||dbms_stats.get_prefs(pname=>'INCREMENTAL_INTERNAL_CONTROL', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('INCREMENTAL_LEVEL : ',42)||dbms_stats.get_prefs(pname=>'INCREMENTAL_LEVEL', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('INCREMENTAL_STALENESS : ',42)||dbms_stats.get_prefs(pname=>'INCREMENTAL_STALENESS', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('JOB_OVERHEAD : ',42)||dbms_stats.get_prefs(pname=>'JOB_OVERHEAD', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('JOB_OVERHEAD_PERC : ',42)||dbms_stats.get_prefs(pname=>'JOB_OVERHEAD_PERC', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('MAINTAIN_STATISTICS_STATUS : ',42)||dbms_stats.get_prefs(pname=>'MAINTAIN_STATISTICS_STATUS', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('METHOD_OPT : ',42)||dbms_stats.get_prefs(pname=>'METHOD_OPT', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('NO_INVALIDATE : ',42)||dbms_stats.get_prefs(pname=>'NO_INVALIDATE', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('OPTIONS : ',42)||dbms_stats.get_prefs(pname=>'OPTIONS', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('PREFERENCE_OVERRIDES_PARAMETER : ',42)||dbms_stats.get_prefs(pname=>'PREFERENCE_OVERRIDES_PARAMETER', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('PUBLISH : ',42)||dbms_stats.get_prefs(pname=>'PUBLISH', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('ROOT_TRIGGER_PDB : ',42)||dbms_stats.get_prefs(pname=>'ROOT_TRIGGER_PDB', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('SCAN_RATE : ',42)||dbms_stats.get_prefs(pname=>'SCAN_RATE', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('STALE_PERCENT : ',42)||dbms_stats.get_prefs(pname=>'STALE_PERCENT', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('STAT_CATEGORY : ',42)||dbms_stats.get_prefs(pname=>'STAT_CATEGORY', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('SYS_FLAGS : ',42)||dbms_stats.get_prefs(pname=>'SYS_FLAGS', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('TABLE_CACHED_BLOCKS : ',42)||dbms_stats.get_prefs(pname=>'TABLE_CACHED_BLOCKS', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('TRACE : ',42)||dbms_stats.get_prefs(pname=>'TRACE', tabname=>'&&TABLE') prefs_for__&&TABLE FROM dual UNION ALL
select rpad('WAIT_TIME_TO_UPDATE_STATS : ',42)||dbms_stats.get_prefs(pname=>'WAIT_TIME_TO_UPDATE_STATS', tabname=>'&&TABLE') prefs_for__&&TABLE
FROM dual;
```

Sample:

```
ANDV_ALGO_INTERNAL_OBSERVE :		  FALSE
APPROXIMATE_NDV :			  TRUE
APPROXIMATE_NDV_ALGORITHM :		  REPEAT OR HYPERLOGLOG
AUTO_STAT_EXTENSIONS :			  OFF
AUTOSTATS_TARGET :			  AUTO
AUTO_TASK_INTERVAL :			  900
AUTO_TASK_MAX_RUN_TIME :		  3600
AUTO_TASK_STATUS :			  OFF
CASCADE :				  DBMS_STATS.AUTO_CASCADE
CONCURRENT :				  OFF
COORDINATOR_TRIGGER_SHARD :		  FALSE
DEBUG : 				  0
DEGREE :				  NULL
ENABLE_HYBRID_HISTOGRAMS :		  3
ENABLE_TOP_FREQ_HISTOGRAMS :		  3
ESTIMATE_PERCENT :			  DBMS_STATS.AUTO_SAMPLE_SIZE
GATHER_AUTO :				  AFTER_LOAD
GATHER_SCAN_RATE :			  HADOOP_ONLY
GLOBAL_TEMP_TABLE_STATS :		  SESSION
GRANULARITY :				  AUTO
INCREMENTAL :				  FALSE
INCREMENTAL_INTERNAL_CONTROL :		  TRUE
INCREMENTAL_LEVEL :			  PARTITION
INCREMENTAL_STALENESS : 		  ALLOW_MIXED_FORMAT
JOB_OVERHEAD :				  -1
JOB_OVERHEAD_PERC :			  1
MAINTAIN_STATISTICS_STATUS :		  FALSE
METHOD_OPT :				  FOR ALL COLUMNS SIZE AUTO
NO_INVALIDATE : 			  DBMS_STATS.AUTO_INVALIDATE
OPTIONS :				  GATHER
PREFERENCE_OVERRIDES_PARAMETER :	  FALSE
PUBLISH :				  TRUE
ROOT_TRIGGER_PDB :			  FALSE
SCAN_RATE :				  0
STALE_PERCENT : 			  10
STAT_CATEGORY : 			  OBJECT_STATS, REALTIME_STATS
SYS_FLAGS :				  1
TABLE_CACHED_BLOCKS :			  1
TRACE : 				  0
WAIT_TIME_TO_UPDATE_STATS :		  15

40 rows selected.
```


### 外部表

外部表统计信息可以固定

```sql
SQL> exec dbms_stats.gather_table_stats('SCOTT', 'EXT_TBL', estimate_percent=>100);
SQL> exec dbms_stats.lock_table_stats('SCOTT', 'EXT_TBL');
```
如果外部表太多数据，可以假想多点数据
```sql
SQL> exec dbms_stats.set_table_stats('SCOTT', 'EXT_TBL', numrows=>100000000);
```

另外比较常见碰到自动收集统计信息job失败的错误
```sql
gather_external_table_stats returns an error from dbms_stats:
ORA-20000: Unable to analyze TABLE "XXXX"."XXXX", insufficient privileges or does not exist
```

针对 INSERT,UPDATE,DELETE,MERGE 更新量超过10%的对象，会作为统计信息收集对象

另外有时候expdp/impdp时候有一些外部表 没有清理干净导致自动收集统计信息失败

类似这种表：`ET$***` 临时表

这种没有清理干净，一般是bug的问题： `Bug#9466433` 等

如果打Patch困难的话，可以考虑锁住这些对象表统计信息，可以接触自动收集统计信息失败的问题

```sql
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
```

可以查看path路径在哪？

```sql
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
```

如果确认当前没在执行datapump情况下，可以手动删除。

```sql
-- locate Data Pump master tables:
COL owner.object FORMAT a50

SELECT o.status, o.object_id, o.object_type, 
       o.owner||'.'||object_name "OWNER.OBJECT"
  FROM dba_objects o, dba_datapump_jobs j
 WHERE o.owner=j.owner_name AND o.object_name=j.job_name
   AND j.job_name NOT LIKE 'BIN$%' ORDER BY 4,2;

select table_name, owner from dba_external_tables;

```
确认后删除：

```sql
SQL> drop table system.&1 purge;
```
生成构造语句：

```sql
SELECT 'DROP TABLE '||o.owner||'.'||object_name||' PURGE;'
FROM dba_objects o, dba_datapump_jobs j
WHERE o.owner=j.owner_name AND o.object_name=j.job_name
AND j.job_name NOT LIKE 'BIN$%';
```
不确定情况下，推荐是lock下这些外部表统计信息
```sql
SQL> EXECUTE DBMS_STATS.LOCK_TABLE_STATS(ownname=>'TESTDEV', tabname=>'ET$004B00010001');
```

### 快速获取统计信息方式

可以参考如下：注意速度越快消耗越多系统资源
```
https://blogs.oracle.com/optimizer/how-to-gather-optimizer-statistics-fast
```

### Reference

[Best Practices for Gathering Optimizer Statistics with Oracle Database 12c Release 2](https://www.oracle.com/technetwork/database/bi-datawarehousing/twp-bp-for-stats-gather-12c-1967354.pdf)

Have a good work&life! 2021/07 via LinHong
