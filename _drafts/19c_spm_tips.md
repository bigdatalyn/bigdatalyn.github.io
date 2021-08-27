
手动创建task 加载新执行计划到baseline里面

HONG@pdb1> create table t2(id number,text varchar2(50));

Table created.

HONG@pdb1> insert into t2 select level,'Description for'||level from dual connect by level <=10000;

10000 rows created.

HONG@pdb1> commit;

Commit complete.

HONG@pdb1> select text from t2 where id=1024;

TEXT
--------------------------------------------------
Description for1024

HONG@pdb1> @scripts/xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  cykufzjtx0kjf, child number 0
-------------------------------------
select text from t2 where id=1024

Plan hash value: 1513984157

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |    13 (100)|          |      1 |00:00:00.01 |      47 |
|*  1 |  TABLE ACCESS FULL| T2   |      1 |      1 |    13   (0)| 00:00:01 |      1 |00:00:00.01 |      47 |
------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T2@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T2"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("ID"=1024)

Note
-----
   - dynamic statistics used: dynamic sampling (level=2)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T2]]></t><s><![CDATA[SEL$1]]></s></h></f></
        q>



48 rows selected.

HONG@pdb1> 
HONG@pdb1> var temp number;
HONG@pdb1> exec :temp := dbms_spm.load_plans_from_cursor_cache(sql_id=>'cykufzjtx0kjf');

PL/SQL procedure successfully completed.

HONG@pdb1> 

HONG@pdb1> select SQL_TEXT,sql_handle,plan_name,enabled,accepted from dba_sql_plan_baselines;

SQL_TEXT                                                                                            SQL_HANDLE           PLAN_NAME                      ENABLED ACCEPTED
--------------------------------------------------------------------------------------------------- -------------------- ------------------------------ ------- --------
INSERT /*+  LEADING(@"SEL$F5BB74E1" "H"@"SEL$2" "A"@"SEL$1")  USE_NL(@"SEL$F5BB7                    SQL_04a6e12b6bba24a5 SQL_PLAN_099r15dpvn95593fd5df7 YES     NO
INSERT /*+  LEADING(@"SEL$F5BB74E1" "H"@"SEL$2" "A"@"SEL$1")  USE_NL(@"SEL$F5BB7                    SQL_04a6e12b6bba24a5 SQL_PLAN_099r15dpvn955bd025b6c YES     NO
select count(*) from stats_advisor_filter_obj$ where rule_id = :rule_id and type                    SQL_bcaef6d55ad6cc8f SQL_PLAN_btbrqupdddm4g08070376 YES     NO
select count(*) from stats_advisor_filter_obj$ where rule_id = :rule_id and type                    SQL_bcaef6d55ad6cc8f SQL_PLAN_btbrqupdddm4g86e9a946 YES     NO
insert into  wrh$_latch_misses_summary  (dbid, per_pdb, con_dbid, snap_id, insta                    SQL_61ab47edc9d62e99 SQL_PLAN_63au7xr4xcbnt61cb5f1a YES     YES
insert into  wrh$_latch_misses_summary  (dbid, per_pdb, con_dbid, snap_id, insta                    SQL_61ab47edc9d62e99 SQL_PLAN_63au7xr4xcbntb74fc450 YES     NO
insert into  wrh$_mvparameter  (dbid, per_pdb, con_dbid, snap_id, instance_numbe                    SQL_86a9f7ca198b38e2 SQL_PLAN_8dagrt8csqf72d9fbe2a8 YES     NO
insert into  wrh$_mvparameter  (dbid, per_pdb, con_dbid, snap_id, instance_numbe                    SQL_86a9f7ca198b38e2 SQL_PLAN_8dagrt8csqf72ebe41abc YES     NO
SELECT COUNT(*) FROM (SELECT FILETYPE_ID, FILETYPE_NAME FROM V$IOSTAT_FILE NT MI                    SQL_fd4c777b47f0f2d5 SQL_PLAN_gum3rgd3z1wqpbd1fd99d YES     NO
SELECT COUNT(*) FROM (SELECT FILETYPE_ID, FILETYPE_NAME FROM V$IOSTAT_FILE NT MI                    SQL_fd4c777b47f0f2d5 SQL_PLAN_gum3rgd3z1wqpd406f762 YES     NO
insert into  WRH$_IOSTAT_FILETYPE  (dbid, per_pdb, con_dbid, snap_id, instance_n                    SQL_7e37c4850d7cee6a SQL_PLAN_7wdy4hn6rtvma94f2914b YES     YES
insert into  wrh$_sgastat  (dbid, per_pdb, con_dbid, snap_id, instance_number, p                    SQL_f7529b1f640223f6 SQL_PLAN_gfnnv3xk048zq42ce8ce5 YES     NO
INSERT INTO  wrh$_datafile  (dbid, per_pdb, con_dbid, snap_id, file#, creation_c                    SQL_969b7b1a074e7a8f SQL_PLAN_9d6vv383nwyng3fb6a31a YES     NO
INSERT INTO  wrh$_datafile  (dbid, per_pdb, con_dbid, snap_id, file#, creation_c                    SQL_969b7b1a074e7a8f SQL_PLAN_9d6vv383nwyngc7b182f7 YES     NO
  UPDATE  wrh$_seg_stat_obj  ob      SET (snap_id, owner, object_name, subobject                    SQL_f2cf00eb94d9220e SQL_PLAN_g5ms0xfadk8hf7e350c7c YES     NO
  UPDATE  wrh$_seg_stat_obj  ob      SET (snap_id, owner, object_name, subobject                    SQL_f2cf00eb94d9220e SQL_PLAN_g5ms0xfadk8hfeaa38fc7 YES     NO
SELECT COUNT(*) FROM (SELECT EVENT_ID, NAME, PARAMETER1, PARAMETER2, PARAMETER3,                    SQL_a36b1b74cbe94488 SQL_PLAN_a6usvfm5ykj4848a0efaa YES     NO
SELECT COUNT(*) FROM (SELECT EVENT_ID, NAME, PARAMETER1, PARAMETER2, PARAMETER3,                    SQL_a36b1b74cbe94488 SQL_PLAN_a6usvfm5ykj48e00fe98c YES     NO
select t.ts#,t.file#,t.block#,nvl(t.bobj#,0),nvl(t.tab#,0),t.intcols,nvl(t.cluco                    SQL_97a49aa816262b55 SQL_PLAN_9g94up0b2caup40fa4f6f YES     NO
insert into  WRH$_REPLICATION_TBL_STATS  (dbid, per_pdb, con_dbid, snap_id, inst                    SQL_588350585cd2283e SQL_PLAN_5j0uhb1fd4a1yac84fabd YES     NO
insert into  WRH$_REPLICATION_TBL_STATS  (dbid, per_pdb, con_dbid, snap_id, inst                    SQL_588350585cd2283e SQL_PLAN_5j0uhb1fd4a1yfe1d6ee8 YES     NO
SELECT /*+ OPT_PARAM('_parallel_syspls_obey_force' 'false') */ SU.NAME, SO.NAME,                    SQL_ac27d842e218083f SQL_PLAN_as9ys8bj1h21z36269ea3 YES     NO
SELECT /*+ NO_STATEMENT_QUEUING RESULT_CACHE (SYSOBJ=TRUE) */ "OBJ#","CLASS_OID"                    SQL_1e65b6616abf13e1 SQL_PLAN_1wtdqc5pby4z111765b56 YES     NO
SELECT /*+ NO_STATEMENT_QUEUING RESULT_CACHE (SYSOBJ=TRUE) */ "OBJ#","CLASS_OID"                    SQL_1e65b6616abf13e1 SQL_PLAN_1wtdqc5pby4z1eee54341 YES     NO
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1                     SQL_bd65d03b62fa2838 SQL_PLAN_butfh7djgna1sb299e8c2 YES     YES
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1                     SQL_bd65d03b62fa2838 SQL_PLAN_butfh7djgna1sdbd90e8e YES     NO
select text from t2 where id=1024                                                                   SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89b860bcf2 YES     YES

27 rows selected.

HONG@pdb1> 

HONG@pdb1> create index idx_t2_id on t2(id);

Index created.

HONG@pdb1> exec dbms_stats.gather_table_stats('hong','t2');

PL/SQL procedure successfully completed.

HONG@pdb1> select text from t2 where id=1024;

TEXT
--------------------------------------------------
Description for1024

HONG@pdb1> @scripts/xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  cykufzjtx0kjf, child number 1
-------------------------------------
select text from t2 where id=1024

Plan hash value: 1513984157

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |    13 (100)|          |      1 |00:00:00.01 |      46 |
|*  1 |  TABLE ACCESS FULL| T2   |      1 |      1 |    13   (0)| 00:00:01 |      1 |00:00:00.01 |      46 |
------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T2@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T2"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("ID"=1024)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 5
---------------------------------------------------------------------------

   0 -  STATEMENT
           -  ALL_ROWS
           -  DB_VERSION('19.1.0')
           -  IGNORE_OPTIM_EMBEDDED_HINTS
           -  OPTIMIZER_FEATURES_ENABLE('19.1.0')

   1 -  SEL$1 / T2@SEL$1
           -  FULL(@"SEL$1" "T2"@"SEL$1")

Note
-----
   - SQL plan baseline SQL_PLAN_99u4vdz7j3p89b860bcf2 used for this statement

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T2]]></t><s><![CDATA[SEL$1]]></s></h></f></
        q>



61 rows selected.

HONG@pdb1> 

-- 现在执行计划基线中已经有了一条未被accepted的计划，我们可以查看一下执行计划的内容：

HONG@pdb1> select SQL_TEXT,sql_handle,plan_name,enabled,accepted from dba_sql_plan_baselines;

SQL_TEXT                                                                                            SQL_HANDLE           PLAN_NAME                      ENABLED ACCEPTED
--------------------------------------------------------------------------------------------------- -------------------- ------------------------------ ------- --------
INSERT /*+  LEADING(@"SEL$F5BB74E1" "H"@"SEL$2" "A"@"SEL$1")  USE_NL(@"SEL$F5BB7                    SQL_04a6e12b6bba24a5 SQL_PLAN_099r15dpvn95593fd5df7 YES     NO
INSERT /*+  LEADING(@"SEL$F5BB74E1" "H"@"SEL$2" "A"@"SEL$1")  USE_NL(@"SEL$F5BB7                    SQL_04a6e12b6bba24a5 SQL_PLAN_099r15dpvn955bd025b6c YES     NO
select count(*) from stats_advisor_filter_obj$ where rule_id = :rule_id and type                    SQL_bcaef6d55ad6cc8f SQL_PLAN_btbrqupdddm4g08070376 YES     NO
select count(*) from stats_advisor_filter_obj$ where rule_id = :rule_id and type                    SQL_bcaef6d55ad6cc8f SQL_PLAN_btbrqupdddm4g86e9a946 YES     NO
insert into  wrh$_latch_misses_summary  (dbid, per_pdb, con_dbid, snap_id, insta                    SQL_61ab47edc9d62e99 SQL_PLAN_63au7xr4xcbnt61cb5f1a YES     YES
insert into  wrh$_latch_misses_summary  (dbid, per_pdb, con_dbid, snap_id, insta                    SQL_61ab47edc9d62e99 SQL_PLAN_63au7xr4xcbntb74fc450 YES     NO
insert into  wrh$_mvparameter  (dbid, per_pdb, con_dbid, snap_id, instance_numbe                    SQL_86a9f7ca198b38e2 SQL_PLAN_8dagrt8csqf72d9fbe2a8 YES     NO
insert into  wrh$_mvparameter  (dbid, per_pdb, con_dbid, snap_id, instance_numbe                    SQL_86a9f7ca198b38e2 SQL_PLAN_8dagrt8csqf72ebe41abc YES     NO
SELECT COUNT(*) FROM (SELECT FILETYPE_ID, FILETYPE_NAME FROM V$IOSTAT_FILE NT MI                    SQL_fd4c777b47f0f2d5 SQL_PLAN_gum3rgd3z1wqpbd1fd99d YES     NO
SELECT COUNT(*) FROM (SELECT FILETYPE_ID, FILETYPE_NAME FROM V$IOSTAT_FILE NT MI                    SQL_fd4c777b47f0f2d5 SQL_PLAN_gum3rgd3z1wqpd406f762 YES     NO
insert into  WRH$_IOSTAT_FILETYPE  (dbid, per_pdb, con_dbid, snap_id, instance_n                    SQL_7e37c4850d7cee6a SQL_PLAN_7wdy4hn6rtvma94f2914b YES     YES
insert into  wrh$_sgastat  (dbid, per_pdb, con_dbid, snap_id, instance_number, p                    SQL_f7529b1f640223f6 SQL_PLAN_gfnnv3xk048zq42ce8ce5 YES     NO
INSERT INTO  wrh$_datafile  (dbid, per_pdb, con_dbid, snap_id, file#, creation_c                    SQL_969b7b1a074e7a8f SQL_PLAN_9d6vv383nwyng3fb6a31a YES     NO
INSERT INTO  wrh$_datafile  (dbid, per_pdb, con_dbid, snap_id, file#, creation_c                    SQL_969b7b1a074e7a8f SQL_PLAN_9d6vv383nwyngc7b182f7 YES     NO
  UPDATE  wrh$_seg_stat_obj  ob      SET (snap_id, owner, object_name, subobject                    SQL_f2cf00eb94d9220e SQL_PLAN_g5ms0xfadk8hf7e350c7c YES     NO
  UPDATE  wrh$_seg_stat_obj  ob      SET (snap_id, owner, object_name, subobject                    SQL_f2cf00eb94d9220e SQL_PLAN_g5ms0xfadk8hfeaa38fc7 YES     NO
SELECT COUNT(*) FROM (SELECT EVENT_ID, NAME, PARAMETER1, PARAMETER2, PARAMETER3,                    SQL_a36b1b74cbe94488 SQL_PLAN_a6usvfm5ykj4848a0efaa YES     NO
SELECT COUNT(*) FROM (SELECT EVENT_ID, NAME, PARAMETER1, PARAMETER2, PARAMETER3,                    SQL_a36b1b74cbe94488 SQL_PLAN_a6usvfm5ykj48e00fe98c YES     NO
select t.ts#,t.file#,t.block#,nvl(t.bobj#,0),nvl(t.tab#,0),t.intcols,nvl(t.cluco                    SQL_97a49aa816262b55 SQL_PLAN_9g94up0b2caup40fa4f6f YES     NO
insert into  WRH$_REPLICATION_TBL_STATS  (dbid, per_pdb, con_dbid, snap_id, inst                    SQL_588350585cd2283e SQL_PLAN_5j0uhb1fd4a1yac84fabd YES     NO
insert into  WRH$_REPLICATION_TBL_STATS  (dbid, per_pdb, con_dbid, snap_id, inst                    SQL_588350585cd2283e SQL_PLAN_5j0uhb1fd4a1yfe1d6ee8 YES     NO
SELECT /*+ OPT_PARAM('_parallel_syspls_obey_force' 'false') */ SU.NAME, SO.NAME,                    SQL_ac27d842e218083f SQL_PLAN_as9ys8bj1h21z36269ea3 YES     NO
SELECT /*+ NO_STATEMENT_QUEUING RESULT_CACHE (SYSOBJ=TRUE) */ "OBJ#","CLASS_OID"                    SQL_1e65b6616abf13e1 SQL_PLAN_1wtdqc5pby4z111765b56 YES     NO
SELECT /*+ NO_STATEMENT_QUEUING RESULT_CACHE (SYSOBJ=TRUE) */ "OBJ#","CLASS_OID"                    SQL_1e65b6616abf13e1 SQL_PLAN_1wtdqc5pby4z1eee54341 YES     NO
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1                     SQL_bd65d03b62fa2838 SQL_PLAN_butfh7djgna1sb299e8c2 YES     YES
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1                     SQL_bd65d03b62fa2838 SQL_PLAN_butfh7djgna1sdbd90e8e YES     NO
select text from t2 where id=1024                                                                   SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89a76c642c YES     NO
select text from t2 where id=1024                                                                   SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89b860bcf2 YES     YES

28 rows selected.

HONG@pdb1> 

-- 现在执行计划基线中已经有了一条未被accepted的计划，我们可以查看一下执行计划的内容：

HONG@pdb1> select * from dbms_xplan.display_sql_plan_baseline(sql_handle=>'SQL_94e89b6fcf11d509',plan_name=>'SQL_PLAN_99u4vdz7j3p89a76c642c');

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

--------------------------------------------------------------------------------
SQL handle: SQL_94e89b6fcf11d509
SQL text: select text from t2 where id=1024
--------------------------------------------------------------------------------

--------------------------------------------------------------------------------
Plan name: SQL_PLAN_99u4vdz7j3p89a76c642c         Plan id: 2808898604
Enabled: YES     Fixed: NO      Accepted: NO      Origin: AUTO-CAPTURE
Plan rows: From dictionary
--------------------------------------------------------------------------------

Plan hash value: 4036166097

-------------------------------------------------------------------------------------------------
| Id  | Operation                           | Name      | Rows  | Bytes | Cost (%CPU)| Time     |
-------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                    |           |     1 |    24 |     2   (0)| 00:00:01 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T2        |     1 |    24 |     2   (0)| 00:00:01 |
|*  2 |   INDEX RANGE SCAN                  | IDX_T2_ID |     1 |       |     1   (0)| 00:00:01 |
-------------------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("ID"=1024)

26 rows selected.

HONG@pdb1> 


可见新的plan是走索引的，现在可以等待维护窗口期间由自动维护任务自动evolve，或者手动进行evolve。
关于Oracle 12c的维护窗口：SYS_AUTO_SPM_EVOLVE_TASK
Oracle Database 12c中引入了一个新的自动系统作业，即SYS_AUTO_SPM_EVOLVE_TASK。 该作业将在每天的自动维护作业窗口中自动执行。 
SYS_AUTO_SPM_EVOLVE_TASK负责检索和排序SPM中未被接受的执行计划non-accepted plan以便verification。 当此执行计划经过verified，过该计划满足性能阀值则将被自动接受accepted 。
因此，当优化器将一个non-accepted的执行计划加入到SQL statement plan history中，在很多情况下若该计划确实是更好的，则会在第二天被接受并可以使用。   
注意该自动task存在时间上的限制为一个小时(默认TIME_LIMIT=3600s)，因此可能造成部分计划未被verified。 在此种场景下，下一个维护窗口该task执行时将处理剩余的执行计划。    

https://mikedietrichde.com/2014/08/22/automatic-maintenance-jobs-in-every-pdbnew-spm-evolve-advisor-task-in-oracle-12-1-0-2/

SYS@pdb1> select client_name, status, con_id from cdb_autotask_client;

CLIENT_NAME                                                      STATUS        CON_ID
---------------------------------------------------------------- --------- ----------
sql tuning advisor                                               ENABLED            3
auto optimizer stats collection                                  ENABLED            3
auto space advisor                                               ENABLED            3

SYS@pdb1> conn / as sysdba
Connected.
SYS@cdb1> select client_name, status, con_id from cdb_autotask_client;

CLIENT_NAME                                                      STATUS        CON_ID
---------------------------------------------------------------- --------- ----------
sql tuning advisor                                               ENABLED            1
auto optimizer stats collection                                  ENABLED            1
auto space advisor                                               ENABLED            1
sql tuning advisor                                               ENABLED            3
auto optimizer stats collection                                  ENABLED            3
auto space advisor                                               ENABLED            3

6 rows selected.

SYS@cdb1> 


HONG@pdb1> select client_name,status from dba_autotask_client;

CLIENT_NAME                                                      STATUS
---------------------------------------------------------------- --------
sql tuning advisor                                               ENABLED
auto optimizer stats collection                                  ENABLED
auto space advisor                                               ENABLED

HONG@pdb1> 
HONG@pdb1> select window_name,repeat_interval,duration,enabled from dba_scheduler_windows;

WINDOW_NAME      REPEAT_INTERVAL                                                       DURATION      ENABLED
---------------- --------------------------------------------------------------------- ------------- -------
MONDAY_WINDOW    freq=daily;byday=MON;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
TUESDAY_WINDOW   freq=daily;byday=TUE;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
WEDNESDAY_WINDOW freq=daily;byday=WED;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
THURSDAY_WINDOW  freq=daily;byday=THU;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
FRIDAY_WINDOW    freq=daily;byday=FRI;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
SATURDAY_WINDOW  freq=daily;byday=SAT;byhour=6;byminute=0; bysecond=0                  +000 20:00:00 TRUE
SUNDAY_WINDOW    freq=daily;byday=SUN;byhour=6;byminute=0; bysecond=0                  +000 20:00:00 TRUE
WEEKNIGHT_WINDOW freq=daily;byday=MON,TUE,WED,THU,FRI;byhour=22;byminute=0; bysecond=0 +000 08:00:00 FALSE
WEEKEND_WINDOW   freq=daily;byday=SAT;byhour=0;byminute=0;bysecond=0                   +002 00:00:00 FALSE

9 rows selected.

HONG@pdb1> 

HONG@pdb1> SELECT parameter_name, parameter_value FROM dba_advisor_parameters WHERE  task_name = 'SYS_AUTO_SPM_EVOLVE_TASK';

PARAMETER_NAME            PARAMETER_VALUE
------------------------- ---------------
CON_DBID_MAPPING          UNUSED
DAYS_TO_EXPIRE            UNLIMITED
DEFAULT_EXECUTION_TYPE    SPM EVOLVE
END_SNAPSHOT              UNUSED
END_TIME                  UNUSED
EXECUTION_DAYS_TO_EXPIRE  30
INSTANCE                  UNUSED
JOURNALING                INFORMATION
MODE                      COMPREHENSIVE
ORA_EM_PARAM1             UNUSED
ORA_EM_PARAM10            UNUSED
ORA_EM_PARAM2             UNUSED
ORA_EM_PARAM3             UNUSED
ORA_EM_PARAM4             UNUSED
ORA_EM_PARAM5             UNUSED
ORA_EM_PARAM6             UNUSED
ORA_EM_PARAM7             UNUSED
ORA_EM_PARAM8             UNUSED
ORA_EM_PARAM9             UNUSED
REMOTE_SOURCE             UNUSED
START_SNAPSHOT            UNUSED
START_TIME                UNUSED
TARGET_OBJECTS            1
TIME_LIMIT                3600
ACCEPT_PLANS              TRUE
ALTERNATE_PLAN_BASELINE   AUTO
ALTERNATE_PLAN_LIMIT      UNLIMITED
ALTERNATE_PLAN_SOURCE     AUTO
APPLY_CAPTURED_COMPILENV  UNUSED
LOCAL_TIME_LIMIT          UNUSED
SQLSET_NAME               UNUSED
SQLSET_OWNER              UNUSED

32 rows selected.

HONG@pdb1> 

HONG@pdb1> ALTER SESSION SET NLS_DATE_FORMAT='YYYY-MM-DD HH24:MI:SS';

Session altered.

HONG@pdb1> 
HONG@pdb1> @scripts/colfmt
COL "EXECUTION_NAME"                 FOR A14
COL "STATUS"                         FOR A9
COL "EXECUTION_START"                FOR A19
COL "EXECUTION_END"                  FOR A19
HONG@pdb1> select execution_name,status,execution_start,execution_end from dba_advisor_executions where task_name='SYS_AUTO_SPM_EVOLVE_TASK';

EXECUTION_NAME STATUS    EXECUTION_START     EXECUTION_END
-------------- --------- ------------------- -------------------
EXEC_101       COMPLETED 2021-07-19 09:02:29 2021-07-19 09:02:31
EXEC_11        COMPLETED 2021-07-09 13:36:58 2021-07-09 13:36:59
EXEC_111       COMPLETED 2021-07-20 13:00:02 2021-07-20 13:00:06
EXEC_121       COMPLETED 2021-07-21 13:00:06 2021-07-21 13:00:13
EXEC_131       COMPLETED 2021-07-22 13:00:08 2021-07-22 13:00:15
EXEC_141       COMPLETED 2021-07-23 13:00:04 2021-07-23 13:00:06
EXEC_151       COMPLETED 2021-07-28 15:20:45 2021-07-28 15:20:47
EXEC_154       COMPLETED 2021-07-29 13:00:05 2021-07-29 13:00:11
EXEC_161       COMPLETED 2021-07-30 15:50:11 2021-07-30 15:50:12
EXEC_171       COMPLETED 2021-08-02 15:22:14 2021-08-02 15:22:15
EXEC_174       COMPLETED 2021-08-03 13:00:03 2021-08-03 13:00:06
EXEC_191       COMPLETED 2021-08-13 13:00:04 2021-08-13 13:00:06
EXEC_201       COMPLETED 2021-08-16 12:14:45 2021-08-16 12:14:46
EXEC_215       COMPLETED 2021-08-17 13:00:03 2021-08-17 13:01:15
EXEC_233       COMPLETED 2021-08-18 13:00:05 2021-08-18 13:00:20
EXEC_31        COMPLETED 2021-07-12 11:07:17 2021-07-12 11:07:17
EXEC_41        COMPLETED 2021-07-13 13:31:49 2021-07-13 13:31:51
EXEC_61        COMPLETED 2021-07-14 13:00:02 2021-07-14 13:00:03
EXEC_81        COMPLETED 2021-07-15 13:00:02 2021-07-15 13:00:03
EXEC_91        COMPLETED 2021-07-16 13:00:04 2021-07-16 13:00:06

20 rows selected.

HONG@pdb1> 
HONG@pdb1> SELECT owner, description, advisor_name, created, last_modified, status, recommendation_count rc FROM dba_advisor_tasks WHERE task_name = 'SYS_AUTO_SPM_EVOLVE_TASK';

OWNER DESCRIPTION               ADVISOR_NAME       CREATED             LAST_MODIFIED       STATUS     RC
----- ------------------------- ------------------ ------------------- ------------------- --------- ---
SYS   Automatic SPM Evolve Task SPM Evolve Advisor 2019-04-17 01:32:48 2021-08-18 13:00:20 COMPLETED   0

HONG@pdb1> 
HONG@pdb1> conn / as sysdba
Connected.
SYS@cdb1> SELECT owner, description, advisor_name, created, last_modified, status, recommendation_count rc,con_id from cdb_advisor_tasks WHERE task_name = 'SYS_AUTO_SPM_EVOLVE_TASK';

OWNER DESCRIPTION               ADVISOR_NAME       CREATED             LAST_MODIFIED       STATUS     RC     CON_ID
----- ------------------------- ------------------ ------------------- ------------------- --------- --- ----------
SYS   Automatic SPM Evolve Task SPM Evolve Advisor 17-APR-19           17-APR-19           INITIAL     0          1
SYS   Automatic SPM Evolve Task SPM Evolve Advisor 17-APR-19           18-AUG-21           COMPLETED   0          3

SYS@cdb1> 

### How to Disable Enable the Evolve Job SYS_AUTO_SPM_EVOLVE_TASK (Doc ID 2291762.1)	


1. Display the SPM Evolve Task:

sqlplus / as sysdba
SQL> COLUMN client_name FORMAT A35
COLUMN task_name FORMAT a30
SELECT client_name, task_name
FROM dba_autotask_task
where task_name='AUTO_SQL_TUNING_PROG'
2. Display the parameters set for the SPM Evolve Task:

sqlplus / as sysdba
SQL> SELECT parameter_name, parameter_value
FROM dba_advisor_parameters
WHERE task_name = 'SYS_AUTO_SPM_EVOLVE_TASK'
AND parameter_value != 'UNUSED'
ORDER BY parameter_name;
3. Turn off Automatic Evolving of Baselines:

sqlplus / as sysdba
SQL> BEGIN
DBMS_SPM.set_evolve_task_parameter(
task_name => 'SYS_AUTO_SPM_EVOLVE_TASK',
parameter => 'ACCEPT_PLANS',
value => 'FALSE');
END;
/
4. Turn on the Automatic Evolving of Baselines:

sqlplus / as sysdba
SQL> BEGIN
DBMS_SPM.set_evolve_task_parameter(
task_name => 'SYS_AUTO_SPM_EVOLVE_TASK',
parameter => 'ACCEPT_PLANS',
value => 'TRUE');
END;
/

Auto Purging SQL Plan Baselines

The Oracle database includes an automatic mechanism for purging SPM baselines that have not been used for longer than the plan retention period, as identified by the LAST_EXECUTED column in the DBA_SQL_PLAN_BASELINES view (see below). Here's an example of how to set the retention period to 10 weeks:

EXECUTE DBMS_SPM.CONFIGURE('plan_retention_weeks',10);

The default retention period is 53 weeks.



手动执行维护task：SYS_AUTO_SPM_EVOLVE_TASK

-- REPORT_AUTO_EVOLVE_TASK to display information about the the actions taken by the automatic evolve task.
-- With no parameters specified it produces a text report for the latest run of the task.

SET LONG 1000000 PAGESIZE 1000 LONGCHUNKSIZE 200 LINESIZE 300
SELECT DBMS_SPM.report_auto_evolve_task FROM   dual;



Manually Evolving SQL Plan Baselines

-- CREATE_EVOLVE_TASK
-- EXECUTE_EVOLVE_TASK
-- REPORT_EVOLVE_TASK
-- IMPLEMENT_EVOLVE_TASK

Other task :
-- CANCEL_EVOLVE_TASK
-- RESUME_EVOLVE_TASK
-- RESET_EVOLVE_TASK

-- 创建一个task：

HONG@pdb1> select SQL_TEXT,sql_handle,plan_name,enabled,accepted from dba_sql_plan_baselines where sql_text like '%select text from t2 where id=1024';

SQL_TEXT                          SQL_HANDLE           PLAN_NAME                      ENABLED ACCEPTED
--------------------------------- -------------------- ------------------------------ ------- --------
select text from t2 where id=1024 SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89a76c642c YES     NO
select text from t2 where id=1024 SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89b860bcf2 YES     YES


SYS@pdb1> SET SERVEROUTPUT ON
SYS@pdb1> DECLARE
  2    l_return VARCHAR2(32767);
  3  BEGIN
  4    l_return := DBMS_SPM.create_evolve_task(sql_handle => 'SQL_94e89b6fcf11d509');
  5    DBMS_OUTPUT.put_line('Task Name: ' || l_return);
  6  END;
  7  /
Task Name: TASK_85

PL/SQL procedure successfully completed.

SYS@pdb1>

-- 执行envole的task

SYS@pdb1> SET SERVEROUTPUT ON
DECLARE
  l_return VARCHAR2(32767);
  3  BEGIN
  4    l_return := DBMS_SPM.execute_evolve_task(task_name => 'TASK_85');
  5    DBMS_OUTPUT.put_line('Execution Name: ' || l_return);
  6  END;
  7  /
Execution Name: EXEC_244

PL/SQL procedure successfully completed.

SYS@pdb1> 

https://asktom.oracle.com/pls/apex/f?p=100:11:0::::P11_QUESTION_ID:9536386000346947354

If you know that the problematic plan really is a good plan that you want to have accepted, 
you can manually accept the plan without having to run the verification part of the evolve process by using the old DBMS_SPM.EVOLVE_SQL_PLAN_BASELINE function, 
with the VERIFY parameter set to NO. 
This will instantly accepted the new plan and update the LAST_VERIFIED column, which will remove the statement from the evolve task list forever.

variable evol_out clob
execute :evol_out := dbms_spm.evolve_sql_plan_baseline(sql_handle=>'SYS_SQL_edcedb30afeb8caa',
                                                            plan_name=>'SQL_PLAN_fvmqv62ryr35ac47b6be0'
                                                             verify=>’NO’);

select :evol_out from dual;

If you know for sure the problematic plan is a bad plan that you will never want used than you can take a two-step approach:

1. Manually accept the plan without verification using the DBMS_SPM.EVOLVE_SQL_PLAN_BASELINE function as described above
2. Then immediately mark the plan disabled by using the ALTER_SQL_PLAN_BASELINE Function as shown below

variable cnt number

exec :cnt := dbms_spm.alter_sql_plan_baseline( -
                 sql_handle        => 'SQL_293ebc02a81d5606', -
                 plan_name         => 'SQL_PLAN_2kgpw0an1uph654bc8843', -
                 attribute_name    => 'ENABLED', -
                 attribute_value   => 'NO');

-- 查看task的执行情况,之后可以查看评估报告
SET LONG 1000000 PAGESIZE 1000 LONGCHUNKSIZE 100 LINESIZE 100
SELECT DBMS_SPM.report_evolve_task(task_name => 'TASK_85', execution_name => 'EXEC_244') AS output FROM   dual;

SYS@pdb1> SELECT DBMS_SPM.report_evolve_task(task_name => 'TASK_85', execution_name => 'EXEC_244') AS output FROM   dual;

OUTPUT
----------------------------------------------------------------------------------------------------
GENERAL INFORMATION SECTION
---------------------------------------------------------------------------------------------

 Task Information:
 ---------------------------------------------
 Task Name            : TASK_85
 Task Owner           : SYS
 Execution Name       : EXEC_244
 Execution Type       : SPM EVOLVE
 Scope                : COMPREHENSIVE
 Status               : COMPLETED
 Started              : 08/18/2021 16:37:40
 Finished             : 08/18/2021 16:37:41
 Last Updated         : 08/18/2021 16:37:41
 Global Time Limit    : 2147483646
 Per-Plan Time Limit  : UNUSED
 Number of Errors     : 0
---------------------------------------------------------------------------------------------

SUMMARY SECTION
---------------------------------------------------------------------------------------------
  Number of plans processed  : 1
  Number of findings         : 1
  Number of recommendations  : 1
  Number of errors           : 0
---------------------------------------------------------------------------------------------

DETAILS SECTION
---------------------------------------------------------------------------------------------
 Object ID          : 2
 Test Plan Name     : SQL_PLAN_99u4vdz7j3p89a76c642c
 Base Plan Name     : SQL_PLAN_99u4vdz7j3p89b860bcf2
 SQL Handle         : SQL_94e89b6fcf11d509
 Parsing Schema     : HONG
 Test Plan Creator  : HONG
 SQL Text           : select text from t2 where id=1024

Execution Statistics:
-----------------------------
                    Base Plan                     Test Plan
                    ----------------------------  ----------------------------
 Elapsed Time (s):  .000014                       .000005
 CPU Time (s):      .000016                       .000004
 Buffer Gets:       4                             0
 Optimizer Cost:    13                            2
 Disk Reads:        0                             0
 Direct Writes:     0                             0
 Rows Processed:    0                             0
 Executions:        10                            10


FINDINGS SECTION
---------------------------------------------------------------------------------------------

Findings (1):
-----------------------------
 1. The plan was verified in 0.18400 seconds. It passed the benefit criterion
    because its verified performance was 14.98426 times better than that of the
    baseline plan.

Recommendation:
-----------------------------
 Consider accepting the plan. Execute
 dbms_spm.accept_sql_plan_baseline(task_name => 'TASK_85', object_id => 2,
 task_owner => 'SYS');


EXPLAIN PLANS SECTION
---------------------------------------------------------------------------------------------

Baseline Plan
-----------------------------
 Plan Id          : 133
 Plan Hash Value  : 3093347570

---------------------------------------------------------------------
| Id  | Operation           | Name | Rows | Bytes | Cost | Time     |
---------------------------------------------------------------------
|   0 | SELECT STATEMENT    |      |    1 |    24 |   13 | 00:00:01 |
| * 1 |   TABLE ACCESS FULL | T2   |    1 |    24 |   13 | 00:00:01 |
---------------------------------------------------------------------

Predicate Information (identified by operation id):
------------------------------------------
* 1 - filter("ID"=1024)


Test Plan
-----------------------------
 Plan Id          : 134
 Plan Hash Value  : 2808898604

--------------------------------------------------------------------------------------------
| Id  | Operation                             | Name      | Rows | Bytes | Cost | Time     |
--------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                      |           |    1 |    24 |    2 | 00:00:01 |
|   1 |   TABLE ACCESS BY INDEX ROWID BATCHED | T2        |    1 |    24 |    2 | 00:00:01 |
| * 2 |    INDEX RANGE SCAN                   | IDX_T2_ID |    1 |       |    1 | 00:00:01 |
--------------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
------------------------------------------
* 2 - access("ID"=1024)

---------------------------------------------------------------------------------------------


SYS@pdb1> 


SYS@pdb1> select SQL_TEXT,sql_handle,plan_name,enabled,accepted from dba_sql_plan_baselines where sql_text like '%select text from t2 where id=1024';

SQL_TEXT                          SQL_HANDLE           PLAN_NAME                      ENABLED ACCEPTED
--------------------------------- -------------------- ------------------------------ ------- --------
select text from t2 where id=1024 SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89a76c642c YES     NO
select text from t2 where id=1024 SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89b860bcf2 YES     YES

SYS@pdb1> 


-- 目前并没有accepted，需要执行accept envolve这个task来接受这个新的执行计划：

SYS@pdb1> SET SERVEROUTPUT ON
SYS@pdb1> DECLARE
  2    l_return NUMBER;
  3  BEGIN
  4    l_return := DBMS_SPM.implement_evolve_task(task_name => 'TASK_85');
  DBMS_OUTPUT.put_line('Plans Accepted: ' || l_return);
  6  END;
  7  /

Plans Accepted: 1

PL/SQL procedure successfully completed.

SYS@pdb1>
SYS@pdb1> select SQL_TEXT,sql_handle,plan_name,enabled,accepted from dba_sql_plan_baselines where sql_text like '%select text from t2 where id=1024';

SQL_TEXT                          SQL_HANDLE           PLAN_NAME                      ENABLED ACCEPTED
--------------------------------- -------------------- ------------------------------ ------- --------
select text from t2 where id=1024 SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89a76c642c YES     YES
select text from t2 where id=1024 SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89b860bcf2 YES     YES

SYS@pdb1> 

Sql Plan Managment (SPM) 12c - Evolve Procedure stuck on some SQL's
https://asktom.oracle.com/pls/apex/f?p=100:11:0::::P11_QUESTION_ID:9536386000346947354

If you know that the problematic plan really is a good plan that you want to have accepted, 
you can manually accept the plan without having to run the verification part of the evolve process by using the old DBMS_SPM.EVOLVE_SQL_PLAN_BASELINE function, 
with the VERIFY parameter set to NO. 
This will instantly accepted the new plan and update the LAST_VERIFIED column, which will remove the statement from the evolve task list forever.

variable evol_out clob
execute :evol_out := dbms_spm.evolve_sql_plan_baseline(sql_handle=>'SYS_SQL_edcedb30afeb8caa',
                                                            plan_name=>'SQL_PLAN_fvmqv62ryr35ac47b6be0'
                                                             verify=>’NO’);

select :evol_out from dual;

If you know for sure the problematic plan is a bad plan that you will never want used than you can take a two-step approach:

1. Manually accept the plan without verification using the DBMS_SPM.EVOLVE_SQL_PLAN_BASELINE function as described above
2. Then immediately mark the plan disabled by using the ALTER_SQL_PLAN_BASELINE Function as shown below

variable cnt number

exec :cnt := dbms_spm.alter_sql_plan_baseline( -
                 sql_handle        => 'SQL_293ebc02a81d5606', -
                 plan_name         => 'SQL_PLAN_2kgpw0an1uph654bc8843', -
                 attribute_name    => 'ENABLED', -
                 attribute_value   => 'NO');

-- 删除的可以通过下面命令删除


SET SERVEROUTPUT ON
DECLARE
  l_plans_dropped  PLS_INTEGER;
BEGIN
  l_plans_dropped := DBMS_SPM.drop_sql_plan_baseline (sql_handle => 'SQL_94e89b6fcf11d509');
  DBMS_OUTPUT.put_line('Plans Dropped: ' || l_plans_dropped);
END;
/






select signature, sql_handle, plan_name, enabled, accepted, fixed, sql_text from dba_sql_plan_baselines;
select signature, sql_handle, plan_name, enabled, accepted, fixed, sql_text from dba_sql_plan_baselines where sql_text like '%select text from t2 where id=1024';
select sql_id, exact_matching_signature, sql_text from v$sql where sql_text like '%select text from t2 where id=1024';


HONG@pdb1> @scripts/colfmt
COL "SIGNATURE"                      FOR 99999999999999999999
COL "SQL_HANDLE"                     FOR A20
COL "PLAN_NAME"                      FOR A30
COL "ENABLED"                        FOR A7
COL "ACCEPTED"                       FOR A8
COL "FIXED"                          FOR A5
COL "SQL_TEXT"                       FOR A33
HONG@pdb1> select signature, sql_handle, plan_name, enabled, accepted, fixed, sql_text from dba_sql_plan_baselines where sql_text like '%select text from t2 where id=1024';

            SIGNATURE SQL_HANDLE           PLAN_NAME                      ENABLED ACCEPTED FIXED SQL_TEXT
--------------------- -------------------- ------------------------------ ------- -------- ----- ---------------------------------
 10729997016727934217 SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89a76c642c YES     YES      NO    select text from t2 where id=1024
 10729997016727934217 SQL_94e89b6fcf11d509 SQL_PLAN_99u4vdz7j3p89b860bcf2 YES     YES      NO    select text from t2 where id=1024

HONG@pdb1> select sql_id, exact_matching_signature, sql_text from v$sql where sql_text like '%select text from t2 where id=1024';

SQL_ID         EXACT_MATCHING_SIGNATURE SQL_TEXT
------------- ------------------------- ---------------------------------
cykufzjtx0kjf      10729997016727934217 select text from t2 where id=1024
1hmuwb1wwg1h3      10729997016727934217 /* SQL Analyze(65,0) */ select te
                                        xt from t2 where id=1024

1hmuwb1wwg1h3      10729997016727934217 /* SQL Analyze(65,0) */ select te
                                        xt from t2 where id=1024


HONG@pdb1> @scripts/colfmt
COL "SQL_ID"                         FOR A13
COL "EXACT_MATCHING_SIGNATURE"       FOR 999999999999999999999999
COL "SQL_TEXT"                       FOR A57
HONG@pdb1> select sql_id, exact_matching_signature, sql_text from v$sql where sql_text like '%select text from t2 where id=1024';

SQL_ID         EXACT_MATCHING_SIGNATURE SQL_TEXT
------------- ------------------------- ---------------------------------------------------------
cykufzjtx0kjf      10729997016727934217 select text from t2 where id=1024
1hmuwb1wwg1h3      10729997016727934217 /* SQL Analyze(65,0) */ select text from t2 where id=1024
1hmuwb1wwg1h3      10729997016727934217 /* SQL Analyze(65,0) */ select text from t2 where id=1024

HONG@pdb1> 


