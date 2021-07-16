
ORACLE 19C NEW FEATURE COMPARE EXECUTION PLANS WITH DBMS_XPLAN.COMPARE_PLANS

HONG@pdb1> select gender,count(*) from employee group by gender;

G   COUNT(*)
- ----------
M        100
F      99900

HONG@pdb1> create index idx_employee_gender on employee(gender);

Index created.

HONG@pdb1>




HONG@pdb1> select count(*) from employee where gender='M';

  COUNT(*)
----------
       100

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION -bytes iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  6m6nnv2m3g12f, child number 1
-------------------------------------
select count(*) from employee where gender='M'

Plan hash value: 585425276

---------------------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name                | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
---------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |                     |      1 |        |     1 (100)|          |      1 |00:00:00.01 |       3 |
|   1 |  SORT AGGREGATE   |                     |      1 |      1 |            |          |      1 |00:00:00.01 |       3 |
|*  2 |   INDEX RANGE SCAN| IDX_EMPLOYEE_GENDER |      1 |    100 |     1   (0)| 00:00:01 |    100 |00:00:00.01 |       3 |
---------------------------------------------------------------------------------------------------------------------------



HONG@pdb1> select count(*) from employee where gender='F';

  COUNT(*)
----------
     99900

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION -bytes iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  an1jndkv6azuz, child number 1
-------------------------------------
select count(*) from employee where gender='F'

Plan hash value: 3033581726

-------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation             | Name                | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT      |                     |      1 |        |    52 (100)|          |      1 |00:00:00.01 |     190 |
|   1 |  SORT AGGREGATE       |                     |      1 |      1 |            |          |      1 |00:00:00.01 |     190 |
|*  2 |   INDEX FAST FULL SCAN| IDX_EMPLOYEE_GENDER |      1 |  99900 |    52   (2)| 00:00:01 |  99900 |00:00:00.01 |     190 |
-------------------------------------------------------------------------------------------------------------------------------


//////////////////////////////////////////////////////////////////////////////
SYS@pdb1> BEGIN
  2  :v_rep := DBMS_XPLAN.COMPARE_PLANS(
reference_plan => cursor_cache_object('6m6nnv2m3g12f', null),
  4  compare_plan_list =>
plan_object_list(cursor_cache_object('an1jndkv6azuz', null)),
  6  type => 'TEXT',
  7  level => 'TYPICAL',
  8  section => 'ALL');
  9  END;
 10  /
BEGIN
*
ERROR at line 1:
ORA-56952: reference plan resolves to 2 plans
ORA-06512: at "SYS.DBMS_SYS_ERROR", line 86
ORA-06512: at "SYS.DBMS_XPLAN", line 13152
ORA-06512: at "SYS.DBMS_XPLAN", line 13200
ORA-06512: at line 2

SYS@pdb1> select sql_id,plan_hash_value,child_number from v$sql where sql_id='an1jndkv6azuz';

SQL_ID        PLAN_HASH_VALUE CHILD_NUMBER
------------- --------------- ------------
an1jndkv6azuz      3033581726            0
an1jndkv6azuz      3033581726            1

SYS@pdb1> select sql_id,plan_hash_value,child_number from v$sql where sql_id='6m6nnv2m3g12f';

SQL_ID        PLAN_HASH_VALUE CHILD_NUMBER
------------- --------------- ------------
6m6nnv2m3g12f      3033581726            0
6m6nnv2m3g12f       585425276            1

SYS@pdb1> 


BEGIN
:v_rep := DBMS_XPLAN.COMPARE_PLANS(
reference_plan => cursor_cache_object('6m6nnv2m3g12f', 1),
compare_plan_list =>
plan_object_list(cursor_cache_object('an1jndkv6azuz', 1)),
type => 'TEXT',
level => 'TYPICAL',
section => 'ALL');
END;
/


//////////////////////////////////////////////////////////////////////////////


VARIABLE v_rep CLOB

BEGIN
  :v_rep := DBMS_XPLAN.COMPARE_PLANS( 
    reference_plan => 
      cursor_cache_object('6m6nnv2m3g12f', NULL),
    compare_plan_list =>
      plan_object_list(
        cursor_cache_object('an1jndkv6azuz', NULL)
      ),
    type              => 'TEXT',
    level             => 'TYPICAL', 
    section           => 'ALL');
END;
/

SET PAGESIZE 50000
SET LONG 100000 LINESIZE 210
COLUMN report FORMAT a200

SELECT :v_rep REPORT FROM DUAL;

====================================================================================

select sql_id,plan_hash_value,child_number from v$sql where sql_id='6m6nnv2m3g12f';
select sql_id,plan_hash_value,child_number from v$sql where sql_id='an1jndkv6azuz';


VARIABLE v_rep CLOB

BEGIN
:v_rep := DBMS_XPLAN.COMPARE_PLANS(
reference_plan => cursor_cache_object('6m6nnv2m3g12f', 1),
compare_plan_list =>
plan_object_list(cursor_cache_object('an1jndkv6azuz', 1)),
type => 'TEXT',
level => 'TYPICAL',
section => 'ALL');
END;
/

SET PAGESIZE 50000
SET LONG 100000 LINESIZE 210
COLUMN report FORMAT a200

SELECT :v_rep REPORT FROM DUAL;


SYS@pdb1> SET LONG 100000 LINESIZE 210
SYS@pdb1> COLUMN report FORMAT a200
SYS@pdb1> 
SYS@pdb1> SELECT :v_rep REPORT FROM DUAL;

REPORT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

COMPARE PLANS REPORT
---------------------------------------------------------------------------------------------
  Current user           : SYS
  Total number of plans  : 2
  Number of findings     : 1
---------------------------------------------------------------------------------------------

COMPARISON DETAILS
---------------------------------------------------------------------------------------------
 Plan Number            : 1 (Reference Plan)
 Plan Found             : Yes
 Plan Source            : Cursor Cache
 SQL ID                 : 6m6nnv2m3g12f
 Child Number           : 1
 Plan Database Version  : 19.0.0.0
 Parsing Schema         : "HONG"
 SQL Text               : select count(*) from employee where gender='M'

Plan
-----------------------------

 Plan Hash Value  : 585425276

------------------------------------------------------------------------------------
| Id  | Operation           | Name                | Rows | Bytes | Cost | Time     |
------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT    |                     |      |       |    1 |          |
|   1 |   SORT AGGREGATE    |                     |    1 |     2 |      |          |
| * 2 |    INDEX RANGE SCAN | IDX_EMPLOYEE_GENDER |  100 |   200 |    1 | 00:00:01 |
------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
------------------------------------------
* 2 - access("GENDER"='M')

---------------------------------------------------------------------------------------------
 Plan Number            : 2
 Plan Found             : Yes
 Plan Source            : Cursor Cache
 SQL ID                 : an1jndkv6azuz
 Child Number           : 1
 Plan Database Version  : 19.0.0.0
 Parsing Schema         : "HONG"
 SQL Text               : select count(*) from employee where gender='F'

Plan
-----------------------------

 Plan Hash Value  : 3033581726

------------------------------------------------------------------------------------------
| Id  | Operation               | Name                | Rows  | Bytes  | Cost | Time     |
------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT        |                     |       |        |   52 |          |
|   1 |   SORT AGGREGATE        |                     |     1 |      2 |      |          |
| * 2 |    INDEX FAST FULL SCAN | IDX_EMPLOYEE_GENDER | 99900 | 199800 |   52 | 00:00:01 |
------------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
------------------------------------------
* 2 - filter("GENDER"='F')


Comparison Results (1):
-----------------------------
 1. Query block SEL$1, Alias "EMPLOYEE"@"SEL$1": Some columns (OPTIONS) do not
    match between the reference plan (id: 2) and the current plan (id: 2).


---------------------------------------------------------------------------------------------


SYS@pdb1> 



How To Use DBMS_XPLAN.COMPARE_PLANS & Hint Usage Report To Troubleshoot Plan Reproducibility Issues (SPM Baselines & SQL Profiles) From 19c (Doc ID 2736319.1)	
