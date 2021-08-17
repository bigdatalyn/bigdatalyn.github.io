


```sql
HONG@pdb1> create table t1 as select * from all_objects;

Table created.

HONG@pdb1> alter session set nls_date_format='YYYY/MM/DD HH24:MI:SS';

Session altered.

HONG@pdb1> @st

HONG@pdb1>  select * from (select owner,object_name,created from t1 order by 3 desc ) where rownum < 6;

OWNER OBJECT_NAME                   CREATED
----- ----------------------------- -------------------
SYS   WRH$_CON_SYSMETRIC_HISTORY    2021/08/17 13:08:10
SYS   WRH$_CON_SYS_TIME_MODEL_PK    2021/08/17 13:08:10
SYS   WRH$_CON_SYS_TIME_MODEL_PK    2021/08/17 13:08:10
SYS   WRH$_CON_SYS_TIME_MODEL       2021/08/17 13:08:10
SYS   WRH$_CON_SYSMET_HISTORY_INDEX 2021/08/17 13:08:10

HONG@pdb1> @xp

PLAN_TABLE_OUTPUT

SQL_ID  3aqupu4s8bv25, child number 0
-------------------------------------
 select * from (select owner,object_name,created from t1 order by 3
desc ) where rownum < 6

Plan hash value: 270731910

------------------------------------------------------------------------------------------------------------------
| Id  | Operation               | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT        |      |      1 |        |  1196 (100)|          |      5 |00:00:00.01 |    1334 |
|*  1 |  COUNT STOPKEY          |      |      1 |        |            |          |      5 |00:00:00.01 |    1334 |
|   2 |   VIEW                  |      |      1 |  67828 |  1196   (1)| 00:00:01 |      5 |00:00:00.01 |    1334 |
|*  3 |    SORT ORDER BY STOPKEY|      |      1 |  67828 |  1196   (1)| 00:00:01 |      5 |00:00:00.01 |    1334 |
|   4 |     TABLE ACCESS FULL   | T1   |      1 |  67828 |   371   (1)| 00:00:01 |  67828 |00:00:00.01 |    1334 |
------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$2 / from$_subquery$_001@SEL$1
   3 - SEL$2
   4 - SEL$2 / T1@SEL$2

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$2")
      OUTLINE_LEAF(@"SEL$1")
      NO_ACCESS(@"SEL$1" "from$_subquery$_001"@"SEL$1")
      FULL(@"SEL$2" "T1"@"SEL$2")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(ROWNUM<6)
   3 - filter(ROWNUM<6)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[from$_subquery$_001]]></t><s><![CDATA[SEL$1]]></s
        ></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>



55 rows selected.

HONG@pdb1> create index t1_owner_object_name_created on t1(owner,object_name,created desc);

Index created.

HONG@pdb1>  select * from (select owner,object_name,created from t1 order by 3 desc ) where rownum < 6;

OWNER OBJECT_NAME                   CREATED
----- ----------------------------- -------------------
SYS   WRH$_ASM_DISK_STAT_SUMMARY    2021/08/17 13:08:10
SYS   WRH$_AWR_TEST_1_PK            2021/08/17 13:08:10
SYS   WRH$_AWR_TEST_1_PK            2021/08/17 13:08:10
SYS   WRH$_AWR_TEST_1               2021/08/17 13:08:10
SYS   WRH$_ASM_DISK_STAT_SUMMARY_PK 2021/08/17 13:08:10

HONG@pdb1> @xp

PLAN_TABLE_OUTPUT

SQL_ID  3aqupu4s8bv25, child number 0
-------------------------------------
 select * from (select owner,object_name,created from t1 order by 3
desc ) where rownum < 6

Plan hash value: 3303515005

---------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation               | Name                         | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads  |
---------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT        |                              |      1 |        |   982 (100)|          |      5 |00:00:00.06 |     581 |    574 |
|*  1 |  COUNT STOPKEY          |                              |      1 |        |            |          |      5 |00:00:00.06 |     581 |    574 |
|   2 |   VIEW                  |                              |      1 |  67828 |   982   (1)| 00:00:01 |      5 |00:00:00.06 |     581 |    574 |
|*  3 |    SORT ORDER BY STOPKEY|                              |      1 |  67828 |   982   (1)| 00:00:01 |      5 |00:00:00.06 |     581 |    574 |
|   4 |     INDEX FAST FULL SCAN| T1_OWNER_OBJECT_NAME_CREATED |      1 |  67828 |   156   (0)| 00:00:01 |  67828 |00:00:00.01 |     581 |    574 |
---------------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$2 / from$_subquery$_001@SEL$1
   3 - SEL$2
   4 - SEL$2 / T1@SEL$2

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$2")
      OUTLINE_LEAF(@"SEL$1")
      NO_ACCESS(@"SEL$1" "from$_subquery$_001"@"SEL$1")
      INDEX_FFS(@"SEL$2" "T1"@"SEL$2" "T1_OWNER_OBJECT_NAME_CREATED")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(ROWNUM<6)
   3 - filter(ROWNUM<6)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[from$_subquery$_001]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>



54 rows selected.

HONG@pdb1> create index t1_created on t1(created desc);

Index created.

HONG@pdb1>  select * from (select owner,object_name,created from t1 order by 3 desc ) where rownum < 6;

OWNER OBJECT_NAME                   CREATED
----- ----------------------------- -------------------
SYS   WRH$_CON_SYSMETRIC_HISTORY    2021/08/17 13:08:10
SYS   WRH$_CON_SYSMET_HISTORY_INDEX 2021/08/17 13:08:10
SYS   WRH$_CON_SYSMET_HISTORY_INDEX 2021/08/17 13:08:10
SYS   WRH$_CON_SYS_TIME_MODEL       2021/08/17 13:08:10
SYS   WRH$_CON_SYS_TIME_MODEL_PK    2021/08/17 13:08:10

HONG@pdb1> @xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  3aqupu4s8bv25, child number 0
-------------------------------------
 select * from (select owner,object_name,created from t1 order by 3
desc ) where rownum < 6

Plan hash value: 261293997

---------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                     | Name       | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads  |
---------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT              |            |      1 |        |     3 (100)|          |      5 |00:00:00.01 |       6 |      4 |
|*  1 |  COUNT STOPKEY                |            |      1 |        |            |          |      5 |00:00:00.01 |       6 |      4 |
|   2 |   VIEW                        |            |      1 |      5 |     3   (0)| 00:00:01 |      5 |00:00:00.01 |       6 |      4 |
|   3 |    TABLE ACCESS BY INDEX ROWID| T1         |      1 |  67828 |     3   (0)| 00:00:01 |      5 |00:00:00.01 |       6 |      4 |
|   4 |     INDEX FULL SCAN           | T1_CREATED |      1 |      5 |     2   (0)| 00:00:01 |      5 |00:00:00.01 |       3 |      4 |
---------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$2 / from$_subquery$_001@SEL$1
   3 - SEL$2 / T1@SEL$2
   4 - SEL$2 / T1@SEL$2

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$2")
      OUTLINE_LEAF(@"SEL$1")
      NO_ACCESS(@"SEL$1" "from$_subquery$_001"@"SEL$1")
      INDEX(@"SEL$2" "T1"@"SEL$2" "T1_CREATED")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(ROWNUM<6)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[from$_subquery$_001]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>



53 rows selected.

HONG@pdb1> 
HONG@pdb1> drop index T1_CREATED;

Index dropped.

HONG@pdb1> create index t1_created on t1(created);

Index created.

HONG@pdb1>  select * from (select owner,object_name,created from t1 order by 3 desc ) where rownum < 6;

OWNER OBJECT_NAME                   CREATED
----- ----------------------------- -------------------
SYS   WRH$_SESS_NETWORK_PK          2021/08/17 13:08:10
SYS   WRH$_SESS_NETWORK_PK          2021/08/17 13:08:10
SYS   WRH$_SESS_NETWORK             2021/08/17 13:08:10
SYS   WRH$_AWR_TEST_1_PK            2021/08/17 13:08:10
SYS   WRH$_AWR_TEST_1_PK            2021/08/17 13:08:10

HONG@pdb1> @xp

PLAN_TABLE_OUTPUT

SQL_ID  3aqupu4s8bv25, child number 0
-------------------------------------
 select * from (select owner,object_name,created from t1 order by 3
desc ) where rownum < 6

Plan hash value: 289100438

---------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                     | Name       | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads  |
---------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT              |            |      1 |        |     3 (100)|          |      5 |00:00:00.01 |       5 |      1 |
|*  1 |  COUNT STOPKEY                |            |      1 |        |            |          |      5 |00:00:00.01 |       5 |      1 |
|   2 |   VIEW                        |            |      1 |      5 |     3   (0)| 00:00:01 |      5 |00:00:00.01 |       5 |      1 |
|   3 |    TABLE ACCESS BY INDEX ROWID| T1         |      1 |  67828 |     3   (0)| 00:00:01 |      5 |00:00:00.01 |       5 |      1 |
|   4 |     INDEX FULL SCAN DESCENDING| T1_CREATED |      1 |      5 |     2   (0)| 00:00:01 |      5 |00:00:00.01 |       3 |      1 |
---------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$2 / from$_subquery$_001@SEL$1
   3 - SEL$2 / T1@SEL$2
   4 - SEL$2 / T1@SEL$2

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$2")
      OUTLINE_LEAF(@"SEL$1")
      NO_ACCESS(@"SEL$1" "from$_subquery$_001"@"SEL$1")
      INDEX_DESC(@"SEL$2" "T1"@"SEL$2" ("T1"."CREATED"))
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(ROWNUM<6)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[from$_subquery$_001]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>



53 rows selected.

HONG@pdb1> 

HONG@pdb1> create index t1_created_owner_object_name on t1(created desc,owner,object_name);

Index created.

HONG@pdb1>  select * from (select owner,object_name,created from t1 order by 3 desc ) where rownum < 6;

OWNER OBJECT_NAME                   CREATED
----- ----------------------------- -------------------
SYS   WRH$_ASM_DISK_STAT_SUMMARY    2021/08/17 13:08:10
SYS   WRH$_ASM_DISK_STAT_SUMMARY_PK 2021/08/17 13:08:10
SYS   WRH$_ASM_DISK_STAT_SUMMARY_PK 2021/08/17 13:08:10
SYS   WRH$_AWR_TEST_1               2021/08/17 13:08:10
SYS   WRH$_AWR_TEST_1_PK            2021/08/17 13:08:10

HONG@pdb1> @xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  3aqupu4s8bv25, child number 0
-------------------------------------
 select * from (select owner,object_name,created from t1 order by 3
desc ) where rownum < 6

Plan hash value: 113417972

---------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name                         | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads  |
---------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |                              |      1 |        |     3 (100)|          |      5 |00:00:00.01 |       4 |      5 |
|*  1 |  COUNT STOPKEY    |                              |      1 |        |            |          |      5 |00:00:00.01 |       4 |      5 |
|   2 |   VIEW            |                              |      1 |      5 |     3   (0)| 00:00:01 |      5 |00:00:00.01 |       4 |      5 |
|   3 |    INDEX FULL SCAN| T1_CREATED_OWNER_OBJECT_NAME |      1 |  67828 |     3   (0)| 00:00:01 |      5 |00:00:00.01 |       4 |      5 |
---------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$2 / from$_subquery$_001@SEL$1
   3 - SEL$2 / T1@SEL$2

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$2")
      OUTLINE_LEAF(@"SEL$1")
      NO_ACCESS(@"SEL$1" "from$_subquery$_001"@"SEL$1")
      INDEX(@"SEL$2" "T1"@"SEL$2" "T1_CREATED_OWNER_OBJECT_NAME")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(ROWNUM<6)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[from$_subquery$_001]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>



51 rows selected.

HONG@pdb1> 

```
