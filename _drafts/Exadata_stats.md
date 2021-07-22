
### Exadata 统计信息：

SQL> execute dbms_stats.gather_system_stats('EXADATA');


select pname, PVAL1 from aux_stats$ where pname='MBRC';

如果下面结果PAVL1是NULL的话，说明Exadata环境没有收集Exadata统计信息

SYS@cdb1> select pname, PVAL1 from aux_stats$ where pname='MBRC';

PNAME				    PVAL1
------------------------------ ----------
MBRC

SYS@cdb1>

Oracle database 固定表统计信息收集

Oracle内部表 x$...表的统计信息

SQL> execute dbms_stats.gather_fixed_objects_stats();

### 统计信息收集策略：数据字典统计

SQL> execute dbms_stats.set_gobal_prefs('AUTOSTATS_TARGET', 'ORACLE');

https://oracle-base.com/dba/script?category=monitoring&file=statistics_prefs.sql

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


AUTOSTATS_TARGET CASCADE		 DEGREE ESTIMATE_PERCENT	    METHOD_OPT		      NO_INVALIDATE		 GRANULARITY PUBLISH INCREMENTAL STALE_PERCENT
---------------- ----------------------- ------ --------------------------- ------------------------- -------------------------- ----------- ------- ----------- -------------
AUTO		 DBMS_STATS.AUTO_CASCADE NULL	DBMS_STATS.AUTO_SAMPLE_SIZE FOR ALL COLUMNS SIZE AUTO DBMS_STATS.AUTO_INVALIDATE AUTO	     TRUE    FALSE	 10

SYS@cdb1>


### 外部表

外部表统计信息可以固定

SQL> exec dbms_stats.gather_table_stats('SCOTT', 'EXT_TBL', estimate_percent=>100);
SQL> exec dbms_stats.lock_table_stats('SCOTT', 'EXT_TBL');

如果外部表太多数据，可以假想多点数据

SQL> exec dbms_stats.set_table_stats('SCOTT', 'EXT_TBL', numrows=>100000000);





