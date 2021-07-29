/////////////////////////////////////////////////////////////////////////////

conconvt 就是 IN-List扩展 或者 OR 扩展

关键字： concatenation


Str1 = aBcD
Str2 = Prep

Str1 + Str2 = aBcDPrep

/////////////////////////////////////////////////////////////////////////////

//////// 没有索引走全表扫对谓词条件or过滤

select empno,ename from emp where empno in (1,7369)

Plan hash value: 3956160932

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |     3 (100)|          |      2 |00:00:00.01 |       8 |
|*  1 |  TABLE ACCESS FULL| EMP  |      1 |      2 |     3   (0)| 00:00:01 |      2 |00:00:00.01 |       8 |
------------------------------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(("EMPNO"=1 OR "EMPNO"=7369))

//////// 创建索引 
HONG@pdb1> create index idx_emp_empno on emp(empno);

SQL_ID  akh838xntzcx3, child number 0
-------------------------------------
select empno,ename from emp where empno in (1,7369)

Plan hash value: 2024299211

----------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                            | Name          | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                     |               |      1 |        |     2 (100)|          |      2 |00:00:00.01 |       5 |
|   1 |  INLIST ITERATOR                     |               |      1 |        |            |          |      2 |00:00:00.01 |       5 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMP           |      2 |      2 |     2   (0)| 00:00:01 |      2 |00:00:00.01 |       5 |
|*  3 |    INDEX RANGE SCAN                  | IDX_EMP_EMPNO |      2 |      1 |     1   (0)| 00:00:01 |      2 |00:00:00.01 |       3 |
----------------------------------------------------------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   3 - access(("EMPNO"=1 OR "EMPNO"=7369))

////////走索引范围扫描，回表之后进行  INLIST ITERATOR 


SQL_ID  52qbs8s8bg0gz, child number 0
-------------------------------------
select /*+ user_concat */ empno,ename from emp where empno in (1,7369)

Plan hash value: 2024299211

----------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                            | Name          | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                     |               |      1 |        |     2 (100)|          |      2 |00:00:00.01 |       5 |
|   1 |  INLIST ITERATOR                     |               |      1 |        |            |          |      2 |00:00:00.01 |       5 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMP           |      2 |      2 |     2   (0)| 00:00:01 |      2 |00:00:00.01 |       5 |
|*  3 |    INDEX RANGE SCAN                  | IDX_EMP_EMPNO |      2 |      1 |     1   (0)| 00:00:01 |      2 |00:00:00.01 |       3 |
----------------------------------------------------------------------------------------------------------------------------------------

//////// 通过hint use_convert 强制走 IN-List扩展

select /*+ use_concat */ empno,ename from emp where empno in (1,7369)

----------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                            | Name          | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                     |               |      1 |        |     2 (100)|          |      2 |00:00:00.01 |       5 |
|   1 |  INLIST ITERATOR                     |               |      1 |        |            |          |      2 |00:00:00.01 |       5 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMP           |      2 |      2 |     2   (0)| 00:00:01 |      2 |00:00:00.01 |       5 |
|*  3 |    INDEX RANGE SCAN                  | IDX_EMP_EMPNO |      2 |      1 |     1   (0)| 00:00:01 |      2 |00:00:00.01 |       3 |
----------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$1 / EMP@SEL$1
   3 - SEL$1 / EMP@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX_RS_ASC(@"SEL$1" "EMP"@"SEL$1" ("EMP"."EMPNO"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "EMP"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   3 - access(("EMPNO"=1 OR "EMPNO"=7369))

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1 (U - Unused (1))
---------------------------------------------------------------------------

   1 -  SEL$1
         U -  use_concat

Note
-----
   - dynamic statistics used: dynamic sampling (level=2)


//////// 结果是hint失效  Unused


上面问题通过变通event 10142/10157事件将IN-List的 INLIST ITERATOR 禁用

HONG@pdb1> select /*+ use_concat */ empno,ename from emp where empno in (1,7369)
  2  ；
  3  
HONG@pdb1> select /*+ use_concat */ empno,ename from emp where empno in (1,7369);

     EMPNO ENAME
---------- ----------
         1 dog
      7369 SMITH

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION -bytes iostats,last'));

SQL_ID  fu2k7hb58bkjp, child number 1
-------------------------------------
select /*+ use_concat */ empno,ename from emp where empno in (1,7369)

Plan hash value: 2606263543

----------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                            | Name          | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                     |               |      1 |        |     4 (100)|          |      2 |00:00:00.01 |       5 |
|   1 |  CONCATENATION                       |               |      1 |        |            |          |      2 |00:00:00.01 |       5 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMP           |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |
|*  3 |    INDEX RANGE SCAN                  | IDX_EMP_EMPNO |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
|   4 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMP           |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
|*  5 |    INDEX RANGE SCAN                  | IDX_EMP_EMPNO |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       1 |
----------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$1_1 / EMP@SEL$1
   3 - SEL$1_1 / EMP@SEL$1
   4 - SEL$1_2 / EMP@SEL$1_2
   5 - SEL$1_2 / EMP@SEL$1_2

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
      INDEX_RS_ASC(@"SEL$1_1" "EMP"@"SEL$1" ("EMP"."EMPNO"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1_1" "EMP"@"SEL$1")
      INDEX_RS_ASC(@"SEL$1_2" "EMP"@"SEL$1_2" ("EMP"."EMPNO"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1_2" "EMP"@"SEL$1_2")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   3 - access("EMPNO"=7369)
   5 - access("EMPNO"=1)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1
---------------------------------------------------------------------------

   1 -  SEL$1
           -  use_concat
           -  
通过上面内容可以看到 CONCATENATION 变成了 IN-List 扩展-》相当于 UNION ALL

select empno,ename from emp where empno = 1
union all
select empno,ename from emp where empno = 7369;

SQL_ID  1kx7ph7t8g2cm, child number 0
-------------------------------------
select empno,ename from emp where empno = 1 union all select
empno,ename from emp where empno = 7369

Plan hash value: 3683592870

----------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                            | Name          | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                     |               |      1 |        |     4 (100)|          |      2 |00:00:00.01 |       5 |
|   1 |  UNION-ALL                           |               |      1 |        |            |          |      2 |00:00:00.01 |       5 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMP           |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |
|*  3 |    INDEX RANGE SCAN                  | IDX_EMP_EMPNO |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
|   4 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMP           |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
|*  5 |    INDEX RANGE SCAN                  | IDX_EMP_EMPNO |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       1 |
----------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SET$1
   2 - SEL$1 / EMP@SEL$1
   3 - SEL$1 / EMP@SEL$1
   4 - SEL$2 / EMP@SEL$2
   5 - SEL$2 / EMP@SEL$2

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
      INDEX_RS_ASC(@"SEL$2" "EMP"@"SEL$2" ("EMP"."EMPNO"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$2" "EMP"@"SEL$2")
      INDEX_RS_ASC(@"SEL$1" "EMP"@"SEL$1" ("EMP"."EMPNO"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "EMP"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   3 - access("EMPNO"=1)
   5 - access("EMPNO"=7369)




