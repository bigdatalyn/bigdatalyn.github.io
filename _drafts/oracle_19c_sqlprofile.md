
HONG@pdb1> drop table t1 purge;

Table dropped.

HONG@pdb1> create table t1 as select * from dba_objects;

Table created.

HONG@pdb1> desc t1;
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 OWNER                                              VARCHAR2(128)
 OBJECT_NAME                                        VARCHAR2(128)
 SUBOBJECT_NAME                                     VARCHAR2(128)
 OBJECT_ID                                          NUMBER
 DATA_OBJECT_ID                                     NUMBER
 OBJECT_TYPE                                        VARCHAR2(23)
 CREATED                                            DATE
 LAST_DDL_TIME                                      DATE
 TIMESTAMP                                          VARCHAR2(19)
 STATUS                                             VARCHAR2(7)
 TEMPORARY                                          VARCHAR2(1)
 GENERATED                                          VARCHAR2(1)
 SECONDARY                                          VARCHAR2(1)
 NAMESPACE                                          NUMBER
 EDITION_NAME                                       VARCHAR2(128)
 SHARING                                            VARCHAR2(18)
 EDITIONABLE                                        VARCHAR2(1)
 ORACLE_MAINTAINED                                  VARCHAR2(1)
 APPLICATION                                        VARCHAR2(1)
 DEFAULT_COLLATION                                  VARCHAR2(100)
 DUPLICATED                                         VARCHAR2(1)
 SHARDED                                            VARCHAR2(1)
 CREATED_APPID                                      NUMBER
 CREATED_VSNID                                      NUMBER
 MODIFIED_APPID                                     NUMBER
 MODIFIED_VSNID                                     NUMBER

HONG@pdb1> select count(*) from t1 where object_id is null;

  COUNT(*)
----------
         1

HONG@pdb1> create index idx_t1_object_id on t1(object_id,0);

Index created.

HONG@pdb1> exec dbms_stats.gather_table_stats('hong','t1');

PL/SQL procedure successfully completed.

HONG@pdb1> 

HONG@pdb1> 
COL "OWNER"                          FOR A5
COL "OBJECT_NAME"                    FOR A11
COL "OBJECT_ID"                      FOR 999999999
HONG@pdb1> select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=73685;

OWNER OBJECT_NAME  OBJECT_ID
----- ----------- ----------
HONG  EMPLOYEE         73685

HONG@pdb1> 

-- do NOT use index - idx_t1_object_id
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION -bytes iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  cgqcj291xwxaq, child number 0
-------------------------------------
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id
from t1 where object_id=73685

Plan hash value: 3617692013

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |   396 (100)|          |      1 |00:00:00.01 |    1426 |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |      1 |   396   (1)| 00:00:01 |      1 |00:00:00.01 |    1426 |
------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_ID"=73685)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1
---------------------------------------------------------------------------

   1 -  SEL$1 / T1@SEL$1
           -  no_index(t1 idx_t1_object_id)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></
        q>



52 rows selected.

HONG@pdb1> 


-- create sql tuning 

declare
   my_task_name varchar2(30);
   sql_text clob;
begin
   sql_text :='select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=73685';
   my_task_name := dbms_sqltune.create_tuning_task(
                   sql_text =>sql_text,
                   user_name =>'HONG',
                   scope => 'COMPREHENSIVE',
                   time_limit =>60,
                   task_name =>'my_sql_tunning001',
                   description=>'task to tune a query on table t1');
end;
/

-- execute sql tuning

begin
dbms_sqltune.execute_tuning_task(task_name=>'my_sql_tunning001');
end;
/

-- check tuning result

set long 9999;
set longchunksize 1000;
set linesize 900;
select dbms_sqltune.report_tuning_task('my_sql_tunning001') from dual;

-- accept tuning advisory

execute dbms_sqltune.accept_sql_profile(task_name=>'my_sql_tunning001',task_owner=>'HONG',replace=>TRUE);
-- force_match: true
-- SQL> SQL> execute dbms_sqltune.accept_sql_profile(task_name =>'my_sql_tunning001', task_owner=>'HONG', replace => TRUE, force_match=>true);


-- check sql profile

COL "NAME"                           FOR A28
COL "SQL_TEXT"                       FOR A100
COL "CATEGORY"                       FOR A8
COL "STATUS"                         FOR A7
SELECT NAME, SQL_TEXT, CATEGORY, STATUS FROM DBA_SQL_PROFILES;


NAME                         SQL_TEXT                                                                                             CATEGORY STATUS
---------------------------- ---------------------------------------------------------------------------------------------------- -------- -------
SYS_SQLPROF_017b572fd6880000 select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=7368 DEFAULT  ENABLED
                             5

-- drop sql profile
begin
  DBMS_SQLTUNE.DROP_SQL_PROFILE ( 
    name => 'SYS_SQLPROF_017b572fd6880000' 
);
end;
/





HONG@pdb1> 
declare
  2     my_task_name varchar2(30);
  3     sql_text clob;
  4  begin
  5     sql_text :='select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=73685';
  6     my_task_name := dbms_sqltune.create_tuning_task(
  7                     sql_text =>sql_text,
  8                     user_name =>'HONG',
  9                     scope => 'COMPREHENSIVE',
 10                     time_limit =>60,
 11                     task_name =>'my_sql_tunning001',
 12                     description=>'task to tune a query on table t1');
 13  end;
 14  /

PL/SQL procedure successfully completed.

begin
dbms_sqltune.execute_tuning_task(task_name=>'my_sql_tunning001');
  3  end;
  4  /

PL/SQL procedure successfully completed.

set long 9999;
HONG@pdb1> set longchunksize 1000;
HONG@pdb1> set linesize 900;
HONG@pdb1> select dbms_sqltune.report_tuning_task('my_sql_tunning001') from dual;

DBMS_SQLTUNE.REPORT_TUNING_TASK('MY_SQL_TUNNING001')
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
GENERAL INFORMATION SECTION
-------------------------------------------------------------------------------
Tuning Task Name   : my_sql_tunning001
Tuning Task Owner  : HONG
Workload Type      : Single SQL Statement
Scope              : COMPREHENSIVE
Time Limit(seconds): 60
Completion Status  : COMPLETED
Started at         : 08/18/2021 10:53:21
Completed at       : 08/18/2021 10:53:25

-------------------------------------------------------------------------------
Schema Name   : HONG
Container Name: PDB1
SQL ID        : cgqcj291xwxaq
SQL Text      : select /*+ no_index(t1 idx_t1_object_id) */
                owner,object_name,object_id from t1 where object_id=73685

-------------------------------------------------------------------------------
FINDINGS SECTION (1 finding)
-------------------------------------------------------------------------------

1- SQL Profile Finding (see explain plans section below)
--------------------------------------------------------
  A potentially better execution plan was found for this statement.

  Recommendation (estimated benefit: 99.78%)
  ------------------------------------------
  - Consider accepting the recommended SQL profile.
    execute dbms_sqltune.accept_sql_profile(task_name => 'my_sql_tunning001',
            task_owner => 'HONG', replace => TRUE);

  Validation results
  ------------------
  The SQL profile was tested by executing both its plan and the original plan
  and measuring their respective execution statistics. A plan may have been
  only partially executed if the other could be run to completion in less time.

                           Original Plan  With SQL Profile  % Improved
                           -------------  ----------------  ----------
  Completion Status:            COMPLETE          COMPLETE
  Elapsed Time (s):             .014059           .000014       99.9 %
  CPU Time (s):                 .013724           .000014      99.89 %
  User I/O Time (s):                  0                 0
  Buffer Gets:                     1425                 3      99.78 %
  Physical Read Requests:             0                 0
  Physical Write Requests:            0                 0
  Physical Read Bytes:                0                 0
  Physical Write Bytes:               0                 0
  Rows Processed:                     1                 1
  Fetches:                            1                 1
  Executions:                         1                 1

  Notes
  -----
  1. Statistics for the original plan were averaged over 10 executions.
  2. Statistics for the SQL profile plan were averaged over 10 executions.

-------------------------------------------------------------------------------
EXPLAIN PLANS SECTION
-------------------------------------------------------------------------------

1- Original With Adjusted Cost
------------------------------
Plan hash value: 3617692013

--------------------------------------------------------------------------
| Id  | Operation         | Name | Rows  | Bytes | Cost (%CPU)| Time     |
--------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |     1 |    45 |   396   (1)| 00:00:01 |
|*  1 |  TABLE ACCESS FULL| T1   |     1 |    45 |   396   (1)| 00:00:01 |
--------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_ID"=73685)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 3 (U - Unused (3))
---------------------------------------------------------------------------

   0 -  STATEMENT
         U -  IGNORE_OPTIM_EMBEDDED_HINTS / hint overridden by another in parent query block
         U -  OPTIMIZER_FEATURES_ENABLE(default) / hint overridden by another in parent query block

   1 -  SEL$1 / T1@SEL$1
         U -  no_index(t1 idx_t1_object_id) / rejected by IGNORE_OPTIM_EMBEDDED_HINTS

2- Using SQL Profile
--------------------
Plan hash value: 3376927295

--------------------------------------------------------------------------------------------------------
| Id  | Operation                           | Name             | Rows  | Bytes | Cost (%CPU)| Time     |
--------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                    |                  |     1 |    45 |     3   (0)| 00:00:01 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1               |     1 |    45 |     3   (0)| 00:00:01 |
|*  2 |   INDEX RANGE SCAN                  | IDX_T1_OBJECT_ID |     1 |       |     2   (0)| 00:00:01 |
--------------------------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("OBJECT_ID"=73685)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1 (U - Unused (1))
---------------------------------------------------------------------------

   1 -  SEL$1 / T1@SEL$1
         U -  no_index(t1 idx_t1_object_id) / rejected by IGNORE_OPTIM_EMBEDDED_HINTS

-------------------------------------------------------------------------------


HONG@pdb1> 

HONG@pdb1> execute dbms_sqltune.accept_sql_profile(task_name=>'my_sql_tunning001',task_owner=>'HONG',replace=>TRUE);

PL/SQL procedure successfully completed.

HONG@pdb1> select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=73685;

OWNER OBJECT_NAME  OBJECT_ID
----- ----------- ----------
HONG  EMPLOYEE         73685

HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION -bytes iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  cgqcj291xwxaq, child number 0
-------------------------------------
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id
from t1 where object_id=73685

Plan hash value: 3376927295

------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                           | Name             | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                    |                  |      1 |        |     3 (100)|          |      1 |00:00:00.01 |       4 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1               |      1 |      1 |     3   (0)| 00:00:01 |      1 |00:00:00.01 |       4 |
|*  2 |   INDEX RANGE SCAN                  | IDX_T1_OBJECT_ID |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |
------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX_RS_ASC(@"SEL$1" "T1"@"SEL$1" "IDX_T1_OBJECT_ID")
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("OBJECT_ID"=73685)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 3 (U - Unused (1))
---------------------------------------------------------------------------

   0 -  STATEMENT
           -  IGNORE_OPTIM_EMBEDDED_HINTS
           -  OPTIMIZER_FEATURES_ENABLE(default)

   1 -  SEL$1 / T1@SEL$1
         U -  no_index(t1 idx_t1_object_id) / rejected by IGNORE_OPTIM_EMBEDDED_HINTS

Note
-----
   - SQL profile SYS_SQLPROF_017b572fd6880000 used for this statement

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



62 rows selected.

HONG@pdb1> 


HONG@pdb1> select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=7368;

OWNER OBJECT_NAME  OBJECT_ID
----- ----------- ----------
SYS   XMLTYPE           7368

HONG@pdb1> @scripts/xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION -bytes iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  bfug258gv9qtc, child number 0
-------------------------------------
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id
from t1 where object_id=7368

Plan hash value: 3617692013

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |   396 (100)|          |      1 |00:00:00.01 |    1426 |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |      1 |   396   (1)| 00:00:01 |      1 |00:00:00.01 |    1426 |
------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_ID"=7368)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1
---------------------------------------------------------------------------

   1 -  SEL$1 / T1@SEL$1
           -  no_index(t1 idx_t1_object_id)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></
        q>



52 rows selected.

HONG@pdb1> 
COL "NAME"                           FOR A28
COL "SQL_TEXT"                       FOR A100
COL "CATEGORY"                       FOR A8
COL "STATUS"                         FOR A7
HONG@pdb1> 
HONG@pdb1> 
HONG@pdb1> SELECT NAME, SQL_TEXT, CATEGORY, STATUS FROM   DBA_SQL_PROFILES;

NAME                         SQL_TEXT                                                                                             CATEGORY STATUS
---------------------------- ---------------------------------------------------------------------------------------------------- -------- -------
SYS_SQLPROF_017b572fd6880000 select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=7368 DEFAULT  ENABLED
                             5

HONG@pdb1> 

HONG@pdb1> begin
  DBMS_SQLTUNE.DROP_SQL_PROFILE ( 
  3      name => 'SYS_SQLPROF_017b572fd6880000' 
  4  );
  5  end;
  6  /

PL/SQL procedure successfully completed.

HONG@pdb1> SELECT NAME, SQL_TEXT, CATEGORY, STATUS FROM DBA_SQL_PROFILES;

no rows selected

HONG@pdb1> 

[26 Managing SQL Profiles](https://docs.oracle.com/en/database/oracle/oracle-database/19/tgsql/managing-sql-profiles.html#GUID-C7FE0936-63B8-46EF-A03E-7E59F704606E)



### coe_profile



HONG@pdb1> select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=73685;

OWNER OBJECT_NAME  OBJECT_ID
----- ----------- ----------
HONG  EMPLOYEE         73685

HONG@pdb1> @scripts/xp

PLAN_TABLE_OUTPUT
SQL_ID  cgqcj291xwxaq, child number 0
-------------------------------------
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id
from t1 where object_id=73685

Plan hash value: 3617692013

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |   396 (100)|          |      1 |00:00:00.01 |    1426 |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |      1 |   396   (1)| 00:00:01 |      1 |00:00:00.01 |    1426 |
------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_ID"=73685)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1
---------------------------------------------------------------------------

   1 -  SEL$1 / T1@SEL$1
           -  no_index(t1 idx_t1_object_id)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></
        q>



52 rows selected.

HONG@pdb1> 

HONG@pdb1> select owner,object_name,object_id from t1 where object_id=73685;

OWNER OBJECT_NAME  OBJECT_ID
----- ----------- ----------
HONG  EMPLOYEE         73685

HONG@pdb1> @scripts/xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  gt8c5nvpfgrjt, child number 0
-------------------------------------
select owner,object_name,object_id from t1 where object_id=73685

Plan hash value: 3376927295

------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                           | Name             | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                    |                  |      1 |        |     3 (100)|          |      1 |00:00:00.01 |       4 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1               |      1 |      1 |     3   (0)| 00:00:01 |      1 |00:00:00.01 |       4 |
|*  2 |   INDEX RANGE SCAN                  | IDX_T1_OBJECT_ID |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |
------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX_RS_ASC(@"SEL$1" "T1"@"SEL$1" "IDX_T1_OBJECT_ID")
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("OBJECT_ID"=73685)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



46 rows selected.

HONG@pdb1> 


sql text:
select owner,object_name,object_id from t1 where object_id=73685;
gt8c5nvpfgrjt
Plan hash value: 3376927295
Plan: INDEX RANGE SCAN


sql text:
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=73685;
sql_id: cgqcj291xwxaq
Plan hash value: 3617692013
Plan: TABLE ACCESS FULL





HONG@pdb1> conn sys/SysPassword1@pdb1 as sysdba
Connected.
SYS@pdb1> @coe_profile

Parameter 1:
ORIGINAL_SQL_ID (required)

Enter value for 1: gt8c5nvpfgrjt

Parameter 2:
MODIFIED_SQL_ID (required)

Enter value for 2: cgqcj291xwxaq


     PLAN_HASH_VALUE          AVG_ET_SECS
-------------------- --------------------
          3617692013                 .026

Parameter 3:
PLAN_HASH_VALUE (required)

Enter value for 3: 3617692013

Values passed to coe_load_sql_profile:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
ORIGINAL_SQL_ID: "gt8c5nvpfgrjt"
MODIFIED_SQL_ID: "cgqcj291xwxaq"
PLAN_HASH_VALUE: "3617692013"

SQL>BEGIN
  2    IF :sql_text IS NULL THEN
  3      RAISE_APPLICATION_ERROR(-20100, 'SQL_TEXT for original SQL_ID &&original_sql_id. was not found in memory (gv$sqltext_with_newlines) or AWR (dba_hist_sqltext).');
  4    END IF;
  5  END;
  6  /
SQL>SET TERM OFF;
SQL>BEGIN
  2    IF :other_xml IS NULL THEN
  3      RAISE_APPLICATION_ERROR(-20101, 'PLAN for modified SQL_ID &&modified_sql_id. and PHV &&plan_hash_value. was not found in memory (gv$sql_plan) or AWR (dba_hist_sql_plan).');
  4    END IF;
  5  END;
  6  /
SQL>
SQL>SET ECHO OFF;
0001 BEGIN_OUTLINE_DATA
0002 IGNORE_OPTIM_EMBEDDED_HINTS
0003 OPTIMIZER_FEATURES_ENABLE('19.1.0')
0004 DB_VERSION('19.1.0')
0005 ALL_ROWS
0006 OUTLINE_LEAF(@"SEL$1")
0007 FULL(@"SEL$1" "T1"@"SEL$1")
0008 END_OUTLINE_DATA

PROFILE_NAME
------------------------------
GT8C5NVPFGRJT_3617692013
SQL>REM
SQL>REM SQL Profile
SQL>REM ~~~~~~~~~~~
SQL>REM
SQL>SELECT signature, name, category, type, status
  2    FROM dba_sql_profiles WHERE name = :name;

           SIGNATURE NAME                                                                                                                             CATEGORY                                                         TYPE    STATUS
-------------------- -------------------------------------------------------------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------- ------- --------
 4833316972023993295 GT8C5NVPFGRJT_3617692013                                                                                                         DEFAULT                                                          MANUAL  ENABLED
SQL>SELECT description
  2    FROM dba_sql_profiles WHERE name = :name;

DESCRIPTION
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
ORIGINAL:GT8C5NVPFGRJT MODIFIED:CGQCJ291XWXAQ PHV:3617692013 SIGNATURE:4833316972023993295 CREATED BY COE_LOAD_SQL_PROFILE.SQL
SQL>SET ECHO OFF;

coe_load_sql_profile completed.
SQL>


HONG@pdb1> select owner,object_name,object_id from t1 where object_id=73685;

OWNER OBJECT_NAME  OBJECT_ID
----- ----------- ----------
HONG  EMPLOYEE         73685

HONG@pdb1> @scripts/xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  gt8c5nvpfgrjt, child number 0
-------------------------------------
select owner,object_name,object_id from t1 where object_id=73685

Plan hash value: 3617692013

-------------------------------------------------------------------
| Id  | Operation         | Name | E-Rows | Cost (%CPU)| E-Time   |
-------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |        |   396 (100)|          |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |   396   (1)| 00:00:01 |
-------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_ID"=73685)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 5
---------------------------------------------------------------------------

   0 -  STATEMENT
           -  ALL_ROWS
           -  DB_VERSION('19.1.0')
           -  IGNORE_OPTIM_EMBEDDED_HINTS
           -  OPTIMIZER_FEATURES_ENABLE('19.1.0')

   1 -  SEL$1 / T1@SEL$1
           -  FULL(@"SEL$1" "T1"@"SEL$1")

Note
-----
   - SQL profile GT8C5NVPFGRJT_3617692013 used for this statement
   - Warning: basic plan statistics not available. These are only collected when:
       * hint 'gather_plan_statistics' is used for the statement or
       * parameter 'statistics_level' is set to 'ALL', at session or system level

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![
        CDATA[SEL$1]]></s></h></f></q>



64 rows selected.

HONG@pdb1> 






sql text:
select /*+ index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=736;
714t68c431a8j
Plan hash value: 3376927295
Plan: INDEX RANGE SCAN


sql text:
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=736;
sql_id: 5x95anwjnn659
Plan hash value: 3617692013
Plan: TABLE ACCESS FULL


select sql_text,sql_id,version_count from v$sqlarea where sql_text like '%owner,object_name,object_id from t1 where object_id=736';
select sql_id,sql_text, plan_hash_value from v$sql where sql_id in ('5x95anwjnn659','714t68c431a8j');

HONG@pdb1> select sql_text,sql_id,version_count from v$sqlarea where sql_text like '%owner,object_name,object_id from t1 where object_id=736';

SQL_TEXT                                                                                             SQL_ID         VERSION_COUNT
---------------------------------------------------------------------------------------------------- ------------- --------------
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=736  5x95anwjnn659              1
select /*+ index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=736     714t68c431a8j              1

HONG@pdb1> select sql_id,sql_text, plan_hash_value from v$sql where sql_id in ('5x95anwjnn659','714t68c431a8j');

SQL_ID        SQL_TEXT                                                                                             PLAN_HASH_VALUE
------------- ---------------------------------------------------------------------------------------------------- ---------------
5x95anwjnn659 select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=736       3617692013
714t68c431a8j select /*+ index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=736          3376927295

HONG@pdb1> 




SYS@pdb1> @coe_xfr_sql_profile

Parameter 1:
SQL_ID (required)

Enter value for 1: 714t68c431a8j


PLAN_HASH_VALUE AVG_ET_SECS
--------------- -----------
     3376927295        .001

Parameter 2:
PLAN_HASH_VALUE (required)

Enter value for 2: 3376927295

Values passed to coe_xfr_sql_profile:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SQL_ID         : "714t68c431a8j"
PLAN_HASH_VALUE: "3376927295"

SQL>BEGIN
  2    IF :sql_text IS NULL THEN
  3      RAISE_APPLICATION_ERROR(-20100, 'SQL_TEXT for SQL_ID &&sql_id. was not found in memory (gv$sqltext_with_newlines) or AWR (dba_hist_sqltext).');
  4    END IF;
  5  END;
  6  /
SQL>SET TERM OFF;
SQL>BEGIN
  2    IF :other_xml IS NULL THEN
  3      RAISE_APPLICATION_ERROR(-20101, 'PLAN for SQL_ID &&sql_id. and PHV &&plan_hash_value. was not found in memory (gv$sql_plan) or AWR (dba_hist_sql_plan).');
  4    END IF;
  5  END;
  6  /
SQL>SET TERM OFF;

Execute coe_xfr_sql_profile_714t68c431a8j_3376927295.sql
on TARGET system in order to create a custom SQL Profile
with plan 3376927295 linked to adjusted sql_text.


COE_XFR_SQL_PROFILE completed.
SQL>



SQL>@coe_xfr_sql_profile

Parameter 1:
SQL_ID (required)

Enter value for 1: 5x95anwjnn659


PLAN_HASH_VALUE AVG_ET_SECS
--------------- -----------
     3617692013        .008

Parameter 2:
PLAN_HASH_VALUE (required)

Enter value for 2: 3617692013

Values passed to coe_xfr_sql_profile:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
SQL_ID         : "5x95anwjnn659"
PLAN_HASH_VALUE: "3617692013"

SQL>BEGIN
  2    IF :sql_text IS NULL THEN
  3      RAISE_APPLICATION_ERROR(-20100, 'SQL_TEXT for SQL_ID &&sql_id. was not found in memory (gv$sqltext_with_newlines) or AWR (dba_hist_sqltext).');
  4    END IF;
  5  END;
  6  /
SQL>SET TERM OFF;
SQL>BEGIN
  2    IF :other_xml IS NULL THEN
  3      RAISE_APPLICATION_ERROR(-20101, 'PLAN for SQL_ID &&sql_id. and PHV &&plan_hash_value. was not found in memory (gv$sql_plan) or AWR (dba_hist_sql_plan).');
  4    END IF;
  5  END;
  6  /
SQL>SET TERM OFF;

Execute coe_xfr_sql_profile_5x95anwjnn659_3617692013.sql
on TARGET system in order to create a custom SQL Profile
with plan 3617692013 linked to adjusted sql_text.


COE_XFR_SQL_PROFILE completed.
SQL>!



coe_xfr_sql_profile_714t68c431a8j_3376927295.sql
coe_xfr_sql_profile_5x95anwjnn659_3617692013.sql



[oracle@ol8-19c ~]$ cp coe_xfr_sql_profile_714t68c431a8j_3376927295.sql coe_xfr_sql_profile_714t68c431a8j_3376927295_test.sql
[oracle@ol8-19c ~]$ vi coe_xfr_sql_profile_714t68c431a8j_3376927295_test.sql
[oracle@ol8-19c ~]$ diff coe_xfr_sql_profile_714t68c431a8j_3376927295_test.sql coe_xfr_sql_profile_714t68c431a8j_3376927295.sql
71c71,72
< q'[FULL(@"SEL$1" "T1"@"SEL$1")]',
---
> q'[INDEX_RS_ASC(@"SEL$1" "T1"@"SEL$1" "IDX_T1_OBJECT_ID")]',
> q'[BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "T1"@"SEL$1")]',
83c84
< force_match => TRUE /* TRUE:FORCE (match even when different literals in SQL). FALSE:EXACT (similar to CURSOR_SHARING) */ );
---
> force_match => FALSE /* TRUE:FORCE (match even when different literals in SQL). FALSE:EXACT (similar to CURSOR_SHARING) */ );
[oracle@ol8-19c ~]$ 

--------------------- outline replace
--------------------- force_match change to true(default: false)
dbms_sqltune.accept_sql_profile 中force_match的作用
force_match的默认值为force，表示只有在sql文本完全一致的情况下才会应用sql_profile，这种情况下只要目标sql的sql文本发生一点改动，原来的profile将失去作用
force_match的改为true，就相当于目标sql的where条件中的具体的输入值用绑定变量替换了



SYS@pdb1> @coe_xfr_sql_profile_714t68c431a8j_3376927295_test.sql
SYS@pdb1> REM
SYS@pdb1> REM $Header: 215187.1 coe_xfr_sql_profile_714t68c431a8j_3376927295.sql 11.4.4.4 2021/08/18 carlos.sierra $
SYS@pdb1> REM
SYS@pdb1> REM Copyright (c) 2000-2012, Oracle Corporation. All rights reserved.
SYS@pdb1> REM
SYS@pdb1> REM AUTHOR
SYS@pdb1> REM   carlos.sierra@oracle.com
SYS@pdb1> REM
SYS@pdb1> REM SCRIPT
SYS@pdb1> REM   coe_xfr_sql_profile_714t68c431a8j_3376927295.sql
SYS@pdb1> REM
SYS@pdb1> REM DESCRIPTION
SYS@pdb1> REM   This script is generated by coe_xfr_sql_profile.sql
SYS@pdb1> REM   It contains the SQL*Plus commands to create a custom
SYS@pdb1> REM   SQL Profile for SQL_ID 714t68c431a8j based on plan hash
SYS@pdb1> REM   value 3376927295.
SYS@pdb1> REM   The custom SQL Profile to be created by this script
SYS@pdb1> REM   will affect plans for SQL commands with signature
SYS@pdb1> REM   matching the one for SQL Text below.
SYS@pdb1> REM   Review SQL Text and adjust accordingly.
SYS@pdb1> REM
SYS@pdb1> REM PARAMETERS
SYS@pdb1> REM   None.
SYS@pdb1> REM
SYS@pdb1> REM EXAMPLE
SYS@pdb1> REM   SQL> START coe_xfr_sql_profile_714t68c431a8j_3376927295.sql;
SYS@pdb1> REM
SYS@pdb1> REM NOTES
SYS@pdb1> REM   1. Should be run as SYSTEM or SYSDBA.
SYS@pdb1> REM   2. User must have CREATE ANY SQL PROFILE privilege.
SYS@pdb1> REM   3. SOURCE and TARGET systems can be the same or similar.
SYS@pdb1> REM   4. To drop this custom SQL Profile after it has been created:
SYS@pdb1> REM      EXEC DBMS_SQLTUNE.DROP_SQL_PROFILE('coe_714t68c431a8j_3376927295');
SYS@pdb1> REM   5. Be aware that using DBMS_SQLTUNE requires a license
SYS@pdb1> REM      for the Oracle Tuning Pack.
SYS@pdb1> REM   6. If you modified a SQL putting Hints in order to produce a desired
SYS@pdb1> REM      Plan, you can remove the artifical Hints from SQL Text pieces below.
SYS@pdb1> REM      By doing so you can create a custom SQL Profile for the original
SYS@pdb1> REM      SQL but with the Plan captured from the modified SQL (with Hints).
SYS@pdb1> REM
SYS@pdb1> WHENEVER SQLERROR EXIT SQL.SQLCODE;
SYS@pdb1> REM
SYS@pdb1> VAR signature NUMBER;
SYS@pdb1> VAR signaturef NUMBER;
SYS@pdb1> REM
SYS@pdb1> DECLARE
  2  sql_txt CLOB;
  3  h       SYS.SQLPROF_ATTR;
  4  PROCEDURE wa (p_line IN VARCHAR2) IS
  5  BEGIN
  6  DBMS_LOB.WRITEAPPEND(sql_txt, LENGTH(p_line), p_line);
  7  END wa;
  8  BEGIN
  9  DBMS_LOB.CREATETEMPORARY(sql_txt, TRUE);
 10  DBMS_LOB.OPEN(sql_txt, DBMS_LOB.LOB_READWRITE);
 11  -- SQL Text pieces below do not have to be of same length.
 12  -- So if you edit SQL Text (i.e. removing temporary Hints),
 13  -- there is no need to edit or re-align unmodified pieces.
 14  wa(q'[select /*+ index(t1 idx_t1_object_id) */ owner,object_name,objec]');
 15  wa(q'[t_id from t1 where object_id=736]');
 16  DBMS_LOB.CLOSE(sql_txt);
 17  h := SYS.SQLPROF_ATTR(
 18  q'[BEGIN_OUTLINE_DATA]',
 19  q'[IGNORE_OPTIM_EMBEDDED_HINTS]',
 20  q'[OPTIMIZER_FEATURES_ENABLE('19.1.0')]',
 21  q'[DB_VERSION('19.1.0')]',
 22  q'[ALL_ROWS]',
 23  q'[OUTLINE_LEAF(@"SEL$1")]',
 24  q'[FULL(@"SEL$1" "T1"@"SEL$1")]',
 25  q'[END_OUTLINE_DATA]');
 26  :signature := DBMS_SQLTUNE.SQLTEXT_TO_SIGNATURE(sql_txt);
 27  :signaturef := DBMS_SQLTUNE.SQLTEXT_TO_SIGNATURE(sql_txt, TRUE);
 28  DBMS_SQLTUNE.IMPORT_SQL_PROFILE (
 29  sql_text    => sql_txt,
 30  profile     => h,
 31  name        => 'coe_714t68c431a8j_3376927295',
 32  description => 'coe 714t68c431a8j 3376927295 '||:signature||' '||:signaturef||'',
 33  category    => 'DEFAULT',
 34  validate    => TRUE,
 35  replace     => TRUE,
 36  force_match => TRUE /* TRUE:FORCE (match even when different literals in SQL). FALSE:EXACT (similar to CURSOR_SHARING) */ );
 37  DBMS_LOB.FREETEMPORARY(sql_txt);
 38  END;
 39  /

PL/SQL procedure successfully completed.

SYS@pdb1> WHENEVER SQLERROR CONTINUE
SYS@pdb1> SET ECHO OFF;

            SIGNATURE
---------------------
   860145236795356618


           SIGNATUREF
---------------------
  1519726565413271702


... manual custom SQL Profile has been created


COE_XFR_SQL_PROFILE_714t68c431a8j_3376927295 completed
SYS@pdb1> 




HONG@pdb1> select /*+ index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=736;

OWNER OBJECT_NAME  OBJECT_ID
----- ----------- ----------
SYS   I_OID2             736

HONG@pdb1> @scripts/xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  714t68c431a8j, child number 1
-------------------------------------
select /*+ index(t1 idx_t1_object_id) */ owner,object_name,object_id
from t1 where object_id=736

Plan hash value: 3617692013

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |   396 (100)|          |      1 |00:00:00.04 |    1426 |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |      1 |   396   (1)| 00:00:01 |      1 |00:00:00.04 |    1426 |
------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_ID"=736)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 6 (U - Unused (1))
---------------------------------------------------------------------------

   0 -  STATEMENT
           -  ALL_ROWS
           -  DB_VERSION('19.1.0')
           -  IGNORE_OPTIM_EMBEDDED_HINTS
           -  OPTIMIZER_FEATURES_ENABLE('19.1.0')

   1 -  SEL$1 / T1@SEL$1
         U -  index(t1 idx_t1_object_id) / rejected by IGNORE_OPTIM_EMBEDDED_HINTS
           -  FULL(@"SEL$1" "T1"@"SEL$1")

Note
-----
   - SQL profile coe_714t68c431a8j_3376927295 used for this statement

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></
        q>



63 rows selected.

HONG@pdb1> select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=736;

OWNER OBJECT_NAME  OBJECT_ID
----- ----------- ----------
SYS   I_OID2             736

HONG@pdb1> @scripts/xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  5x95anwjnn659, child number 1
-------------------------------------
select /*+ no_index(t1 idx_t1_object_id) */ owner,object_name,object_id
from t1 where object_id=736

Plan hash value: 3617692013

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |   396 (100)|          |      1 |00:00:00.01 |    1426 |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |      1 |   396   (1)| 00:00:01 |      1 |00:00:00.01 |    1426 |
------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_ID"=736)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1
---------------------------------------------------------------------------

   1 -  SEL$1 / T1@SEL$1
           -  no_index(t1 idx_t1_object_id)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></
        q>



52 rows selected.

HONG@pdb1> 





HONG@pdb1> select /*+ index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=7311;

OWNER OBJECT_NAME  OBJECT_ID
----- ----------- ----------
SYS   USER_TS           7311

HONG@pdb1> @scripts/xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  ds36d39zkwxwj, child number 0
-------------------------------------
select /*+ index(t1 idx_t1_object_id) */ owner,object_name,object_id
from t1 where object_id=7311

Plan hash value: 3617692013

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |   396 (100)|          |      1 |00:00:00.01 |    1426 |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |      1 |   396   (1)| 00:00:01 |      1 |00:00:00.01 |    1426 |
------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_ID"=7311)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 6 (U - Unused (1))
---------------------------------------------------------------------------

   0 -  STATEMENT
           -  ALL_ROWS
           -  DB_VERSION('19.1.0')
           -  IGNORE_OPTIM_EMBEDDED_HINTS
           -  OPTIMIZER_FEATURES_ENABLE('19.1.0')

   1 -  SEL$1 / T1@SEL$1
         U -  index(t1 idx_t1_object_id) / rejected by IGNORE_OPTIM_EMBEDDED_HINTS
           -  FULL(@"SEL$1" "T1"@"SEL$1")

Note
-----
   - SQL profile coe_714t68c431a8j_3376927295 used for this statement

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></
        q>



63 rows selected.

HONG@pdb1> 




### spm


