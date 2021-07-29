---
layout: post
title: "Oracle 19c use_concat Hint Tips"
category: Oracle
tags: Oracle hint Tips
---

* content
{:toc}

Oracle 19c use_concat Hint Tips







### Hint use_concat

The USE_CONCAT hint instructs the optimizer to transform combined OR-conditions in the WHERE clause of a query into a compound query using the UNION ALL set operator.

```sql
-- sql01
SELECT *
  FROM employees e
  WHERE manager_id = 108
     OR department_id = 110;
-- sql02
SELECT /*+ USE_CONCAT */ *
  FROM employees e
  WHERE manager_id = 108
     OR department_id = 110;
```

Output

Sql 01:  Full table scan and user filter to output results.

```
SQL_ID	ay0rk51xmqta7, child number 1
-------------------------------------
SELECT *   FROM employees e   WHERE manager_id = 108	  OR
department_id = 110

Plan hash value: 1445457117

-----------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name      | Starts | E-Rows | Cost (%CPU)| E-Time	| A-Rows |   A-Time   | Buffers |
-----------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |	      |      1 |	|     3 (100)|		|      7 |00:00:00.01 |       7 |
|*  1 |  TABLE ACCESS FULL| EMPLOYEES |      1 |      6 |     3   (0)| 00:00:01 |      7 |00:00:00.01 |       7 |
-----------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / E@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "E"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(("MANAGER_ID"=108 OR "DEPARTMENT_ID"=110))

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[E]]></t><s><![CDATA[SEL$1]]></s></h></f></q>

```

Sql 02: hint use_concat use the index instead full table scan. or -> union all

```
SQL_ID	bskydj5s0wx5g, child number 1
-------------------------------------
SELECT /*+ USE_CONCAT */ *   FROM employees e	WHERE manager_id = 108
    OR department_id = 110

Plan hash value: 2470958560

--------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			     | Name		 | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		     |			 |	1 |	   |	 4 (100)|	   |	  7 |00:00:00.01 |	 6 |
|   1 |  CONCATENATION			     |			 |	1 |	   |		|	   |	  7 |00:00:00.01 |	 6 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	 |	1 |	 2 |	 2   (0)| 00:00:01 |	  2 |00:00:00.01 |	 4 |
|*  3 |    INDEX RANGE SCAN		     | EMP_DEPARTMENT_IX |	1 |	 2 |	 1   (0)| 00:00:01 |	  2 |00:00:00.01 |	 2 |
|*  4 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	 |	1 |	 5 |	 2   (0)| 00:00:01 |	  5 |00:00:00.01 |	 2 |
|*  5 |    INDEX RANGE SCAN		     | EMP_MANAGER_IX	 |	1 |	 5 |	 1   (0)| 00:00:01 |	  5 |00:00:00.01 |	 1 |
--------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$1_1 / E@SEL$1
   3 - SEL$1_1 / E@SEL$1
   4 - SEL$1_2 / E@SEL$1_2
   5 - SEL$1_2 / E@SEL$1_2

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      OUTLINE_LEAF(@"SEL$1_1")
      USE_CONCAT(@"SEL$1" 8 OR_PREDICATES(1))
      OUTLINE_LEAF(@"SEL$1_2")
      INDEX_RS_ASC(@"SEL$1_1" "E"@"SEL$1" ("EMPLOYEES"."DEPARTMENT_ID"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1_1" "E"@"SEL$1")
      INDEX_RS_ASC(@"SEL$1_2" "E"@"SEL$1_2" ("EMPLOYEES"."MANAGER_ID"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1_2" "E"@"SEL$1_2")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   3 - access("DEPARTMENT_ID"=110)
   4 - filter(LNNVL("DEPARTMENT_ID"=110))
   5 - access("MANAGER_ID"=108)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1
---------------------------------------------------------------------------

   1 -	SEL$1
	   -  USE_CONCAT

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[E]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="11" f="y"><n><![CDATA[SEL$1_2]]></n><p><![CDATA[SEL$1]]></p><i><o><t>BN</t><v><![CDATA[2]]></v></o></i><f><h><t><![CDATA[E]]><
	/t><s><![CDATA[SEL$1_2]]></s></h></f></q>
  <q o="11" f="y" h="y"><n><![CDATA[SEL$1_1]]></n><p><![CDATA[SEL$1]]></p><i><o><t>BN</t><v><![CDATA[1]]></v></o></i><f><h><t><![CDATA
	[E]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
```

Same with the following execute plan - union all

```
SELECT *
  FROM employees e
  WHERE manager_id = 108
UNION ALL
SELECT *
  FROM employees e
  WHERE department_id = 110;
```


```
SQL_ID	8u83rqkzp7c0y, child number 0
-------------------------------------
SELECT *   FROM employees e   WHERE manager_id = 108 UNION ALL SELECT *
  FROM employees e   WHERE department_id = 110

Plan hash value: 1543942963

--------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			     | Name		 | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		     |			 |	1 |	   |	 4 (100)|	   |	  7 |00:00:00.01 |	 6 |
|   1 |  UNION-ALL			     |			 |	1 |	   |		|	   |	  7 |00:00:00.01 |	 6 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	 |	1 |	 5 |	 2   (0)| 00:00:01 |	  5 |00:00:00.01 |	 4 |
|*  3 |    INDEX RANGE SCAN		     | EMP_MANAGER_IX	 |	1 |	 5 |	 1   (0)| 00:00:01 |	  5 |00:00:00.01 |	 2 |
|   4 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	 |	1 |	 2 |	 2   (0)| 00:00:01 |	  2 |00:00:00.01 |	 2 |
|*  5 |    INDEX RANGE SCAN		     | EMP_DEPARTMENT_IX |	1 |	 2 |	 1   (0)| 00:00:01 |	  2 |00:00:00.01 |	 1 |
--------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SET$1
   2 - SEL$1 / E@SEL$1
   3 - SEL$1 / E@SEL$1
   4 - SEL$2 / E@SEL$2
   5 - SEL$2 / E@SEL$2

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      OUTLINE_LEAF(@"SEL$2")
      OUTLINE_LEAF(@"SET$1")
      INDEX_RS_ASC(@"SEL$2" "E"@"SEL$2" ("EMPLOYEES"."DEPARTMENT_ID"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$2" "E"@"SEL$2")
      INDEX_RS_ASC(@"SEL$1" "E"@"SEL$1" ("EMPLOYEES"."MANAGER_ID"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "E"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   3 - access("MANAGER_ID"=108)
   5 - access("DEPARTMENT_ID"=110)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SET$1]]></n><f><h><t><![CDATA[NULL_HALIAS]]></t><s><![CDATA[SET$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[E]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[E]]></t><s><![CDATA[SEL$2]]></s></h></f></q>
```

### Reference

[USE_CONCAT Hint](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Comments.html#GUID-5A12BDC8-4CD1-448F-80BF-9F02653A3F94)

Have a good work&life! 2021/07 via LinHong
