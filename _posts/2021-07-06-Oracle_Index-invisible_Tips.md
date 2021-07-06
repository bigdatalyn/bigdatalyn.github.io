---
layout: post
title: "Oracle Index - invisible Tips"
category: Oracle
tags: Oracle Index Tips
---

* content
{:toc}

Oracle Index - invisible Tips



### T1 full table scan

T1: `create table t1 as select * from dba_objects;`

```sql
SQL> select object_name from t1 where object_name = 'T1';

OBJECT_NAME
--------------------------------------------------------------------------------------------------------------------------------
T1
T1

SQL> @xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  579pzfyuc582x, child number 0
-------------------------------------
select object_name from t1 where object_name = 'T1'

Plan hash value: 3617692013

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |   429 (100)|          |      2 |00:00:00.04 |    1546 |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |      2 |   429   (1)| 00:00:01 |      2 |00:00:00.04 |    1546 |
------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('12.1.0.1')
      DB_VERSION('12.1.0.1')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_NAME"='T1')


37 rows selected.

```

### Index info(not included object_name column)

The index info are as the following.

```sql
INDEX_NAME                     UNI VI     T_ROWS     I_ROWS DISTINCT_KEYS  BLV LEAF_BLOCKS COLUMN_NAME          POS D N NUM_DISTINCT  NUM_NULLS
------------------------------ --- -- ---------- ---------- ------------- ---- ----------- -------------------- --- - - ------------ ----------
T1_CREATED                     N   Y       91747      91747          1049    1         244 CREATED                1   Y         1049          0

ora params invisible

NAME                                               VALUE                DESCRIPTION
-------------------------------------------------- -------------------- ----------------------------------------------------------------------
optimizer_use_invisible_indexes                    FALSE                Usage of invisible indexes (TRUE/FALSE)
```

### create invisible index

create test and select object name

```sql
SQL> create index t1_object_name on t1(object_name) invisible;

Index created.

SQL> select object_name from t1 where object_name = 'T1';

OBJECT_NAME
--------------------------------------------------------------------------------------------------------------------------------
T1
T1

SQL> @xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  579pzfyuc582x, child number 0
-------------------------------------
select object_name from t1 where object_name = 'T1'

Plan hash value: 3617692013

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |   429 (100)|          |      2 |00:00:00.01 |    1546 |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |      2 |   429   (1)| 00:00:01 |      2 |00:00:00.01 |    1546 |
------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('12.1.0.1')
      DB_VERSION('12.1.0.1')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_NAME"='T1')


37 rows selected.

```
### optimizer_use_invisible_indexes parameter setting and test

optimizer_use_invisible_indexes default value: faluse

```
NAME                                               VALUE                DESCRIPTION
-------------------------------------------------- -------------------- ----------------------------------------------------------------------
optimizer_use_invisible_indexes                    FALSE                Usage of invisible indexes (TRUE/FALSE)
```

set session to true and test

```
SQL> alter session set optimizer_use_invisible_indexes=true;

Session altered.

SQL> select object_name from t1 where object_name = 'T1';

OBJECT_NAME
--------------------------------------------------------------------------------------------------------------------------------
T1
T1

SQL> @xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  579pzfyuc582x, child number 1
-------------------------------------
select object_name from t1 where object_name = 'T1'

Plan hash value: 515139557

------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation        | Name           | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads  |
------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT |                |      1 |        |     3 (100)|          |      2 |00:00:00.01 |       4 |      2 |
|*  1 |  INDEX RANGE SCAN| T1_OBJECT_NAME |      1 |      2 |     3   (0)| 00:00:01 |      2 |00:00:00.01 |       4 |      2 |
------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('12.1.0.1')
      DB_VERSION('12.1.0.1')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX(@"SEL$1" "T1"@"SEL$1" ("T1"."OBJECT_NAME"))
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - access("OBJECT_NAME"='T1')


37 rows selected.

SQL> 
```
It can use the invisible index in sql now while optimizer_use_invisible_indexes is true.




