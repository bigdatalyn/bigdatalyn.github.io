




/////////////////////////////////////////////////////////

NL嵌套循环

驱动表返回一行，
通过连接列传值传给被驱动表，
驱动表返回多少行，被驱动表就要扫描多少次

嵌套循环驱动表应该返回少量数据。
如果返回太多结果集，被驱动表就会扫描很多次，被驱动表会被误认为热点表，
被驱动表的连接列被误认为热点索引。

被驱动表必须走索引。连接列没包含在索引中，被驱动表就走全表扫。
被驱动表不能走TABLE ACCESS FULL，不能走INDEX FULL SCAN，不能走INDEX SKIP SCAN，也不能走INDEX FAST FULL SCAN
只能走INDEX RANGE SCAN或者INDEX UNIQUE SCAN

被驱动表的连接列基数应该很高。不然很低的话，走全表扫。

嵌套循环可以快速返回两表关联后前几条数据。通过HINT：FIRST_ROWS 让优化器倾向用NL

use_nl(a,b) leading(a) ab表走NL，驱动表是a



SCOTT@pdb1> select * from dept;

 DEPTNO DNAME	       LOC
------- -------------- -------------
     10 ACCOUNTING     NEW YORK
     20 RESEARCH       DALLAS
     30 SALES	       CHICAGO
     40 OPERATIONS     BOSTON

SCOTT@pdb1> select * from emp;

 EMPNO ENAME  JOB	  MGR HIREDATE	  SAL  COMM  DEPTNO
------ ------ --------- ----- --------- ----- ----- -------
  7369 SMITH  CLERK	 7902 17-DEC-80   800		 20
  7499 ALLEN  SALESMAN	 7698 20-FEB-81  1600	300	 30
  7521 WARD   SALESMAN	 7698 22-FEB-81  1250	500	 30
  7566 JONES  MANAGER	 7839 02-APR-81  2975		 20
  7654 MARTIN SALESMAN	 7698 28-SEP-81  1250  1400	 30
  7698 BLAKE  MANAGER	 7839 01-MAY-81  2850		 30
  7782 CLARK  MANAGER	 7839 09-JUN-81  2450		 10
  7788 SCOTT  ANALYST	 7566 19-APR-87  3000		 20
  7839 KING   PRESIDENT       17-NOV-81  5000		 10
  7844 TURNER SALESMAN	 7698 08-SEP-81  1500	  0	 30
  7876 ADAMS  CLERK	 7788 23-MAY-87  1100		 20
  7900 JAMES  CLERK	 7698 03-DEC-81   950		 30
  7902 FORD   ANALYST	 7566 03-DEC-81  3000		 20
  7934 MILLER CLERK	 7782 23-JAN-82  1300		 10

14 rows selected.

SCOTT@pdb1> select /*+ use_nl(d,e) leading(e) */ * from dept d left join emp e on d.deptno=e.deptno;

 DEPTNO DNAME	       LOC	      EMPNO ENAME  JOB	       MGR HIREDATE    SAL  COMM  DEPTNO
------- -------------- ------------- ------ ------ --------- ----- --------- ----- ----- -------
     10 ACCOUNTING     NEW YORK        7782 CLARK  MANAGER    7839 09-JUN-81  2450	      10
     10 ACCOUNTING     NEW YORK        7839 KING   PRESIDENT	   17-NOV-81  5000	      10
     10 ACCOUNTING     NEW YORK        7934 MILLER CLERK      7782 23-JAN-82  1300	      10
     20 RESEARCH       DALLAS	       7369 SMITH  CLERK      7902 17-DEC-80   800	      20
     20 RESEARCH       DALLAS	       7566 JONES  MANAGER    7839 02-APR-81  2975	      20
     20 RESEARCH       DALLAS	       7788 SCOTT  ANALYST    7566 19-APR-87  3000	      20
     20 RESEARCH       DALLAS	       7876 ADAMS  CLERK      7788 23-MAY-87  1100	      20
     20 RESEARCH       DALLAS	       7902 FORD   ANALYST    7566 03-DEC-81  3000	      20
     30 SALES	       CHICAGO	       7499 ALLEN  SALESMAN   7698 20-FEB-81  1600   300      30
     30 SALES	       CHICAGO	       7521 WARD   SALESMAN   7698 22-FEB-81  1250   500      30
     30 SALES	       CHICAGO	       7654 MARTIN SALESMAN   7698 28-SEP-81  1250  1400      30
     30 SALES	       CHICAGO	       7698 BLAKE  MANAGER    7839 01-MAY-81  2850	      30
     30 SALES	       CHICAGO	       7844 TURNER SALESMAN   7698 08-SEP-81  1500     0      30
     30 SALES	       CHICAGO	       7900 JAMES  CLERK      7698 03-DEC-81   950	      30
     40 OPERATIONS     BOSTON

15 rows selected.

SCOTT@pdb1> @xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	046hjbmk8fyzu, child number 0
-------------------------------------
select /*+ use_nl(d,e) leading(e) */ * from dept d left join emp e on
d.deptno=e.deptno

Plan hash value: 2022884187

-------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |	 1 |	    |	 10 (100)|	    |	  15 |00:00:00.01 |	 37 |
|   1 |  NESTED LOOPS OUTER|	  |	 1 |	 15 |	 10   (0)| 00:00:01 |	  15 |00:00:00.01 |	 37 |
|   2 |   TABLE ACCESS FULL| DEPT |	 1 |	  4 |	  3   (0)| 00:00:01 |	   4 |00:00:00.01 |	  8 |
|*  3 |   TABLE ACCESS FULL| EMP  |	 4 |	  4 |	  2   (0)| 00:00:01 |	  14 |00:00:00.01 |	 29 |
-------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$2BFA4EE4
   2 - SEL$2BFA4EE4 / D@SEL$1
   3 - SEL$2BFA4EE4 / E@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$2BFA4EE4")
      MERGE(@"SEL$8812AA4E" >"SEL$948754D7")
      OUTLINE(@"SEL$948754D7")
      ANSI_REARCH(@"SEL$2")
      OUTLINE(@"SEL$8812AA4E")
      ANSI_REARCH(@"SEL$1")
      OUTLINE(@"SEL$2")
      OUTLINE(@"SEL$1")
      FULL(@"SEL$2BFA4EE4" "D"@"SEL$1")
      FULL(@"SEL$2BFA4EE4" "E"@"SEL$1")
      LEADING(@"SEL$2BFA4EE4" "D"@"SEL$1" "E"@"SEL$1")
      USE_NL(@"SEL$2BFA4EE4" "E"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   3 - filter("D"."DEPTNO"="E"."DEPTNO")

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 3 (U - Unused (2))
---------------------------------------------------------------------------

   1 -	SEL$2BFA4EE4
	 U -  leading(e)

   2 -	SEL$2BFA4EE4 / D@SEL$1
	 U -  use_nl(d,e)

   3 -	SEL$2BFA4EE4 / E@SEL$1
	   -  use_nl(d,e)

Note
-----
   - dynamic statistics used: dynamic sampling (level=2)

Query Block Registry:
---------------------

  <q o="68" h="y"><n><![CDATA[SEL$8812AA4E]]></n><p><![CDATA[SEL$1]]></p><f><h><t><![CDATA[D]]></t><s><
	![CDATA[SEL$1]]></s></h><h><t><![CDATA[E]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[D]]></t><s><![CDATA[SEL$1]]></s></h><h><t><![CDATA
	[E]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[from$_subquery$_003]]></t><s><![CDATA[SEL$2]]></s>
	</h></f></q>
  <q o="18" f="y" h="y"><n><![CDATA[SEL$2BFA4EE4]]></n><p><![CDATA[SEL$948754D7]]></p><i><o><t>VW</t><v
	><![CDATA[SEL$8812AA4E]]></v></o></i><f><h><t><![CDATA[D]]></t><s><![CDATA[SEL$1]]></s></h><h><t><![C
	DATA[E]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="67" h="y"><n><![CDATA[SEL$948754D7]]></n><p><![CDATA[SEL$2]]></p><i><o><t>VW</t><v><![CDATA[SEL
	$8812AA4E]]></v></o></i><f><h><t><![CDATA[from$_subquery$_003]]></t><s><![CDATA[SEL$2]]></s></h></f><
	/q>



86 rows selected.

SCOTT@pdb1>



SCOTT@pdb1> select /*+ use_nl(d,e) leading(e) */ * from dept d left join emp e on d.deptno=e.deptno where e.sal < 3000;

 DEPTNO DNAME	       LOC	      EMPNO ENAME  JOB	       MGR HIREDATE    SAL  COMM  DEPTNO
------- -------------- ------------- ------ ------ --------- ----- --------- ----- ----- -------
     20 RESEARCH       DALLAS	       7369 SMITH  CLERK      7902 17-DEC-80   800	      20
     30 SALES	       CHICAGO	       7499 ALLEN  SALESMAN   7698 20-FEB-81  1600   300      30
     30 SALES	       CHICAGO	       7521 WARD   SALESMAN   7698 22-FEB-81  1250   500      30
     20 RESEARCH       DALLAS	       7566 JONES  MANAGER    7839 02-APR-81  2975	      20
     30 SALES	       CHICAGO	       7654 MARTIN SALESMAN   7698 28-SEP-81  1250  1400      30
     30 SALES	       CHICAGO	       7698 BLAKE  MANAGER    7839 01-MAY-81  2850	      30
     10 ACCOUNTING     NEW YORK        7782 CLARK  MANAGER    7839 09-JUN-81  2450	      10
     30 SALES	       CHICAGO	       7844 TURNER SALESMAN   7698 08-SEP-81  1500     0      30
     20 RESEARCH       DALLAS	       7876 ADAMS  CLERK      7788 23-MAY-87  1100	      20
     30 SALES	       CHICAGO	       7900 JAMES  CLERK      7698 03-DEC-81   950	      30
     10 ACCOUNTING     NEW YORK        7934 MILLER CLERK      7782 23-JAN-82  1300	      10

11 rows selected.

SCOTT@pdb1> @xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	449gw41smaphh, child number 0
-------------------------------------
select /*+ use_nl(d,e) leading(e) */ * from dept d left join emp e on
d.deptno=e.deptno where e.sal < 3000

Plan hash value: 3625962092

--------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		     | Name    | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	     |	       |      1 |	 |    14 (100)| 	 |     11 |00:00:00.01 |      23 |
|   1 |  NESTED LOOPS		     |	       |      1 |     11 |    14   (0)| 00:00:01 |     11 |00:00:00.01 |      23 |
|   2 |   NESTED LOOPS		     |	       |      1 |     11 |    14   (0)| 00:00:01 |     11 |00:00:00.01 |      12 |
|*  3 |    TABLE ACCESS FULL	     | EMP     |      1 |     11 |     3   (0)| 00:00:01 |     11 |00:00:00.01 |       8 |
|*  4 |    INDEX UNIQUE SCAN	     | PK_DEPT |     11 |      1 |     0   (0)| 	 |     11 |00:00:00.01 |       4 |
|   5 |   TABLE ACCESS BY INDEX ROWID| DEPT    |     11 |      1 |     1   (0)| 00:00:01 |     11 |00:00:00.01 |      11 |
--------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$AA565B58
   3 - SEL$AA565B58 / E@SEL$1
   4 - SEL$AA565B58 / D@SEL$1
   5 - SEL$AA565B58 / D@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$AA565B58")
      OUTER_JOIN_TO_INNER(@"SEL$2BFA4EE4" "E"@"SEL$1")
      OUTLINE(@"SEL$2BFA4EE4")
      MERGE(@"SEL$8812AA4E" >"SEL$948754D7")
      OUTLINE(@"SEL$948754D7")
      ANSI_REARCH(@"SEL$2")
      OUTLINE(@"SEL$8812AA4E")
      ANSI_REARCH(@"SEL$1")
      OUTLINE(@"SEL$2")
      OUTLINE(@"SEL$1")
      FULL(@"SEL$AA565B58" "E"@"SEL$1")
      INDEX(@"SEL$AA565B58" "D"@"SEL$1" ("DEPT"."DEPTNO"))
      LEADING(@"SEL$AA565B58" "E"@"SEL$1" "D"@"SEL$1")
      USE_NL(@"SEL$AA565B58" "D"@"SEL$1")
      NLJ_BATCHING(@"SEL$AA565B58" "D"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   3 - filter("E"."SAL"<3000)
   4 - access("D"."DEPTNO"="E"."DEPTNO")

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 3 (U - Unused (1))
---------------------------------------------------------------------------

   1 -	SEL$AA565B58
	   -  leading(e)

   3 -	SEL$AA565B58 / E@SEL$1
	 U -  use_nl(d,e)

   4 -	SEL$AA565B58 / D@SEL$1
	   -  use_nl(d,e)

Note
-----
   - dynamic statistics used: dynamic sampling (level=2)

Query Block Registry:
---------------------

  <q o="68" h="y"><n><![CDATA[SEL$8812AA4E]]></n><p><![CDATA[SEL$1]]></p><f><h><t><![CDATA[D]]></t><s><![CDATA[SEL$1
	]]></s></h><h><t><![CDATA[E]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="35" f="y" h="y"><n><![CDATA[SEL$AA565B58]]></n><p><![CDATA[SEL$2BFA4EE4]]></p><i><o><t>TA</t><v><![CDATA[E@S
	EL$1]]></v></o></i><f><h><t><![CDATA[D]]></t><s><![CDATA[SEL$1]]></s></h><h><t><![CDATA[E]]></t><s><![CDATA[SEL$1]
	]></s></h></f></q>
  <q o="2"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[D]]></t><s><![CDATA[SEL$1]]></s></h><h><t><![CDATA[E]]></t><s><
	![CDATA[SEL$1]]></s></h></f></q>
  <q o="2"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[from$_subquery$_003]]></t><s><![CDATA[SEL$2]]></s></h></f></q>
  <q o="18" h="y"><n><![CDATA[SEL$2BFA4EE4]]></n><p><![CDATA[SEL$948754D7]]></p><i><o><t>VW</t><v><![CDATA[SEL$8812A
	A4E]]></v></o></i><f><h><t><![CDATA[D]]></t><s><![CDATA[SEL$1]]></s></h><h><t><![CDATA[E]]></t><s><![CDATA[SEL$1]]
	></s></h></f></q>
  <q o="67" h="y"><n><![CDATA[SEL$948754D7]]></n><p><![CDATA[SEL$2]]></p><i><o><t>VW</t><v><![CDATA[SEL$8812AA4E]]><
	/v></o></i><f><h><t><![CDATA[from$_subquery$_003]]></t><s><![CDATA[SEL$2]]></s></h></f></q>



94 rows selected.



select * from dept d left join emp e on d.deptno=e.deptno;

-------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |	 1 |	    |	 10 (100)|	    |	  15 |00:00:00.01 |	 37 |
|   1 |  NESTED LOOPS OUTER|	  |	 1 |	 15 |	 10   (0)| 00:00:01 |	  15 |00:00:00.01 |	 37 |
|   2 |   TABLE ACCESS FULL| DEPT |	 1 |	  4 |	  3   (0)| 00:00:01 |	   4 |00:00:00.01 |	  8 |
|*  3 |   TABLE ACCESS FULL| EMP  |	 4 |	  4 |	  2   (0)| 00:00:01 |	  14 |00:00:00.01 |	 29 |
-------------------------------------------------------------------------------------------------------------

dept d 左外连接 emp e
d是left outer边，是驱动表
d管理a，d数据为住，对于e没有的数据 NULL补全

这种两表外连接，走NL时候无法更改驱动表。

select /*+ use_nl(d,e) leading(e) */ * from dept d left join emp e on d.deptno=e.deptno where e.sal < 3000;
--------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		     | Name    | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	     |	       |      1 |	 |    14 (100)| 	 |     11 |00:00:00.01 |      23 |
|   1 |  NESTED LOOPS		     |	       |      1 |     11 |    14   (0)| 00:00:01 |     11 |00:00:00.01 |      23 |
|   2 |   NESTED LOOPS		     |	       |      1 |     11 |    14   (0)| 00:00:01 |     11 |00:00:00.01 |      12 |
|*  3 |    TABLE ACCESS FULL	     | EMP     |      1 |     11 |     3   (0)| 00:00:01 |     11 |00:00:00.01 |       8 |
|*  4 |    INDEX UNIQUE SCAN	     | PK_DEPT |     11 |      1 |     0   (0)| 	 |     11 |00:00:00.01 |       4 |
|   5 |   TABLE ACCESS BY INDEX ROWID| DEPT    |     11 |      1 |     1   (0)| 00:00:01 |     11 |00:00:00.01 |      11 |
--------------------------------------------------------------------------------------------------------------------------

外连接中，被驱动表（从表）带有过滤条件，外连接变为内连接

外连接的从表有过滤条件语句排除了从表与主表没有关联显示为NULL的情况

- 两表关联走不走NL不是看驱动表返回的数据是多少，而是直接查看两表关联之后返回数量，两表关联后返回的数据量少，可以走NL，返回数据量很多，则走HASH连接
- 大表也可以做驱动表，大表过滤之后返回的数据量很少也可以做NL的驱动表



SCOTT@pdb1> select * from hong.ss1, hong.ss2 where ss1.object_id = ss2.object_id;

73023 rows selected.

Elapsed: 00:00:03.65

Execution Plan
----------------------------------------------------------
Plan hash value: 4077001907

-----------------------------------------------------------------------------------
| Id  | Operation	   | Name | Rows  | Bytes |TempSpc| Cost (%CPU)| Time	  |
-----------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  | 73023 |    18M|	  |  1788   (1)| 00:00:01 |
|*  1 |  HASH JOIN	   |	  | 73023 |    18M|    10M|  1788   (1)| 00:00:01 |
|   2 |   TABLE ACCESS FULL| SS2  | 73025 |  9413K|	  |   396   (1)| 00:00:01 |
|   3 |   TABLE ACCESS FULL| SS1  | 73024 |  9413K|	  |   396   (1)| 00:00:01 |
-----------------------------------------------------------------------------------

HONG@pdb1> select 73024*12/1024 Size_Gb from dual;

   SIZE_GB
----------
    855.75

HONG@pdb1>



---------------------------------------------------
HONG@pdb1> select count(*) from ss1;

  COUNT(*)
----------
     73024

HONG@pdb1> select count(*) from ss3;

  COUNT(*)
----------
	99

HONG@pdb1>

小表ss3驱动大表ss1: 04.07
大表ss1驱动大表ss3: 05.77
等值hash连接： 00.21 (优化器默认小表驱动大表)
等值hash连接： 00.56 (HINT大表驱动小表)

HONG@pdb1> select /*+ use_nl(ss1,ss3) */ * from ss1,ss3 where ss1.object_id=ss3.object_id;

99 rows selected.

Elapsed: 00:00:04.07

Execution Plan
----------------------------------------------------------
Plan hash value: 3063018826

---------------------------------------------------------------------------
| Id  | Operation	   | Name | Rows  | Bytes | Cost (%CPU)| Time	  |
---------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |    99 | 22968 | 39061   (1)| 00:00:02 |
|   1 |  NESTED LOOPS	   |	  |    99 | 22968 | 39061   (1)| 00:00:02 |
|   2 |   TABLE ACCESS FULL| SS3  |    99 |  9900 |	3   (0)| 00:00:01 |
|*  3 |   TABLE ACCESS FULL| SS1  |	1 |   132 |   395   (1)| 00:00:01 |
---------------------------------------------------------------------------


HONG@pdb1> select /*+ use_nl(ss1,ss3) leading(ss1) */ * from ss1,ss3 where ss1.object_id=ss3.object_id;

99 rows selected.

Elapsed: 00:00:05.77

Execution Plan
----------------------------------------------------------
Plan hash value: 1947567232

---------------------------------------------------------------------------
| Id  | Operation	   | Name | Rows  | Bytes | Cost (%CPU)| Time	  |
---------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |    99 | 22968 | 99543   (1)| 00:00:04 |
|   1 |  NESTED LOOPS	   |	  |    99 | 22968 | 99543   (1)| 00:00:04 |
|   2 |   TABLE ACCESS FULL| SS1  | 73024 |  9413K|   396   (1)| 00:00:01 |
|*  3 |   TABLE ACCESS FULL| SS3  |	1 |   100 |	1   (0)| 00:00:01 |
---------------------------------------------------------------------------


HONG@pdb1> select  * from ss1,ss3 where ss1.object_id=ss3.object_id;

99 rows selected.

Elapsed: 00:00:00.21

Execution Plan
----------------------------------------------------------
Plan hash value: 3498933046

---------------------------------------------------------------------------
| Id  | Operation	   | Name | Rows  | Bytes | Cost (%CPU)| Time	  |
---------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |    99 | 22968 |   399   (1)| 00:00:01 |
|*  1 |  HASH JOIN	   |	  |    99 | 22968 |   399   (1)| 00:00:01 |
|   2 |   TABLE ACCESS FULL| SS3  |    99 |  9900 |	3   (0)| 00:00:01 |
|   3 |   TABLE ACCESS FULL| SS1  | 73024 |  9413K|   396   (1)| 00:00:01 |
---------------------------------------------------------------------------

HONG@pdb1> select /*+ use_hash(ss1,ss3) leading(ss1) */ * from ss1,ss3 where ss1.object_id=ss3.object_id;

99 rows selected.

Elapsed: 00:00:00.56

Execution Plan
----------------------------------------------------------
Plan hash value: 2344986422

-----------------------------------------------------------------------------------
| Id  | Operation	   | Name | Rows  | Bytes |TempSpc| Cost (%CPU)| Time	  |
-----------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |    99 | 22968 |	  |   898   (1)| 00:00:01 |
|*  1 |  HASH JOIN	   |	  |    99 | 22968 |    10M|   898   (1)| 00:00:01 |
|   2 |   TABLE ACCESS FULL| SS1  | 73024 |  9413K|	  |   396   (1)| 00:00:01 |
|   3 |   TABLE ACCESS FULL| SS3  |    99 |  9900 |	  |	3   (0)| 00:00:01 |
-----------------------------------------------------------------------------------

/////////////////////////////////////////////////////////

没有索引
1.hash join  00.11
2907  consistent gets
2./*+ use_nl(ss1,ss2) leading(ss1) */ 小表驱动大表 NL 23.20
1418288  consistent gets

ss1有索引
3. /*+ use_nl(ss1,ss2) leading(ss1) */ 驱动表走索引过滤 22.08
1416959  consistent gets
ss1/ss2有索引
4. /*+ use_nl(ss1,ss2) leading(ss1) */ 驱动表走索引过滤/被驱动表连接字段走索引 00.05
396  consistent gets

默认hash连接
5. 驱动表走索引过滤/被驱动表连接字段走索引 00.05
178  consistent gets

重点：被驱动表上连接字段一定要有索引

ONG@pdb1> select * from ss1,ss2 where ss1.object_id=ss2.object_id and ss1.object_id < 1000;

997 rows selected.

Elapsed: 00:00:00.11

Execution Plan
----------------------------------------------------------
Plan hash value: 2294874069

---------------------------------------------------------------------------
| Id  | Operation	   | Name | Rows  | Bytes | Cost (%CPU)| Time	  |
---------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |   988 |   254K|   790   (1)| 00:00:01 |
|*  1 |  HASH JOIN	   |	  |   988 |   254K|   790   (1)| 00:00:01 |
|*  2 |   TABLE ACCESS FULL| SS1  |   988 |   127K|   395   (1)| 00:00:01 |
|*  3 |   TABLE ACCESS FULL| SS2  |   988 |   127K|   395   (1)| 00:00:01 |
---------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - access("SS1"."OBJECT_ID"="SS2"."OBJECT_ID")
   2 - filter("SS1"."OBJECT_ID"<1000)
   3 - filter("SS2"."OBJECT_ID"<1000)


Statistics
----------------------------------------------------------
	  5  recursive calls
	  0  db block gets
       2907  consistent gets
	  0  physical reads
	  0  redo size
     111765  bytes sent via SQL*Net to client
       1168  bytes received via SQL*Net from client
	 68  SQL*Net roundtrips to/from client
	  0  sorts (memory)
	  0  sorts (disk)
	997  rows processed

HONG@pdb1> select /*+ use_nl(ss1,ss2) leading(ss1) */ * from ss1,ss2 where ss1.object_id=ss2.object_id and ss1.object_id < 1000;

997 rows selected.

Elapsed: 00:00:23.20

Execution Plan
----------------------------------------------------------
Plan hash value: 2486003820

---------------------------------------------------------------------------
| Id  | Operation	   | Name | Rows  | Bytes | Cost (%CPU)| Time	  |
---------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |   988 |   254K|   389K  (1)| 00:00:16 |
|   1 |  NESTED LOOPS	   |	  |   988 |   254K|   389K  (1)| 00:00:16 |
|*  2 |   TABLE ACCESS FULL| SS1  |   988 |   127K|   395   (1)| 00:00:01 |
|*  3 |   TABLE ACCESS FULL| SS2  |	1 |   132 |   393   (1)| 00:00:01 |
---------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - filter("SS1"."OBJECT_ID"<1000)
   3 - filter("SS1"."OBJECT_ID"="SS2"."OBJECT_ID" AND
	      "SS2"."OBJECT_ID"<1000)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1 (U - Unused (1))
---------------------------------------------------------------------------

   2 -	SEL$1 / SS1@SEL$1
	 U -  use_nl(ss1,ss2)


Statistics
----------------------------------------------------------
	  1  recursive calls
	  0  db block gets
    1418288  consistent gets
	  0  physical reads
	  0  redo size
     111765  bytes sent via SQL*Net to client
       1204  bytes received via SQL*Net from client
	 68  SQL*Net roundtrips to/from client
	  0  sorts (memory)
	  0  sorts (disk)
	997  rows processed

HONG@pdb1> create index idx_ss1_object_id on ss1(object_id);

Index created.

Elapsed: 00:00:00.21
HONG@pdb1> select /*+ use_nl(ss1,ss2) leading(ss1) */ * from ss1,ss2 where ss1.object_id=ss2.object_id and ss1.object_id < 1000;

997 rows selected.

Elapsed: 00:00:22.08

Execution Plan
----------------------------------------------------------
Plan hash value: 2599680990

----------------------------------------------------------------------------------------------------------
| Id  | Operation			     | Name		 | Rows  | Bytes | Cost (%CPU)| Time	 |
----------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		     |			 |   988 |   254K|   388K  (1)| 00:00:16 |
|   1 |  NESTED LOOPS			     |			 |   988 |   254K|   388K  (1)| 00:00:16 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| SS1		 |   988 |   127K|    26   (0)| 00:00:01 |
|*  3 |    INDEX RANGE SCAN		     | IDX_SS1_OBJECT_ID |   988 |	 |     4   (0)| 00:00:01 |
|*  4 |   TABLE ACCESS FULL		     | SS2		 |     1 |   132 |   393   (1)| 00:00:01 |
----------------------------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   3 - access("SS1"."OBJECT_ID"<1000)
   4 - filter("SS1"."OBJECT_ID"="SS2"."OBJECT_ID" AND "SS2"."OBJECT_ID"<1000)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1 (U - Unused (1))
---------------------------------------------------------------------------

   2 -	SEL$1 / SS1@SEL$1
	 U -  use_nl(ss1,ss2)


Statistics
----------------------------------------------------------
	  1  recursive calls
	  0  db block gets
    1416959  consistent gets
	  4  physical reads
	  0  redo size
     110403  bytes sent via SQL*Net to client
       1204  bytes received via SQL*Net from client
	 68  SQL*Net roundtrips to/from client
	  0  sorts (memory)
	  0  sorts (disk)
	997  rows processed

HONG@pdb1> create index idx_ss2_object_id on ss2(object_id);

Index created.

Elapsed: 00:00:00.16
HONG@pdb1> select /*+ use_nl(ss1,ss2) leading(ss1) */ * from ss1,ss2 where ss1.object_id=ss2.object_id and ss1.object_id < 1000;

997 rows selected.

Elapsed: 00:00:00.05

Execution Plan
----------------------------------------------------------
Plan hash value: 4224038322

-----------------------------------------------------------------------------------------------------------
| Id  | Operation			      | Name		  | Rows  | Bytes | Cost (%CPU)| Time	  |
-----------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		      | 		  |   988 |   254K|  2003   (1)| 00:00:01 |
|   1 |  NESTED LOOPS			      | 		  |   988 |   254K|  2003   (1)| 00:00:01 |
|   2 |   NESTED LOOPS			      | 		  |   988 |   254K|  2003   (1)| 00:00:01 |
|   3 |    TABLE ACCESS BY INDEX ROWID BATCHED| SS1		  |   988 |   127K|    26   (0)| 00:00:01 |
|*  4 |     INDEX RANGE SCAN		      | IDX_SS1_OBJECT_ID |   988 |	  |	4   (0)| 00:00:01 |
|*  5 |    INDEX RANGE SCAN		      | IDX_SS2_OBJECT_ID |	1 |	  |	1   (0)| 00:00:01 |
|   6 |   TABLE ACCESS BY INDEX ROWID	      | SS2		  |	1 |   132 |	2   (0)| 00:00:01 |
-----------------------------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   4 - access("SS1"."OBJECT_ID"<1000)
   5 - access("SS1"."OBJECT_ID"="SS2"."OBJECT_ID")
       filter("SS2"."OBJECT_ID"<1000)

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1 (U - Unused (1))
---------------------------------------------------------------------------

   3 -	SEL$1 / SS1@SEL$1
	 U -  use_nl(ss1,ss2)


Statistics
----------------------------------------------------------
	  1  recursive calls
	  0  db block gets
	396  consistent gets
	  4  physical reads
	  0  redo size
     110403  bytes sent via SQL*Net to client
       1204  bytes received via SQL*Net from client
	 68  SQL*Net roundtrips to/from client
	  0  sorts (memory)
	  0  sorts (disk)
	997  rows processed

HONG@pdb1> select * from ss1,ss2 where ss1.object_id=ss2.object_id and ss1.object_id < 1000;

997 rows selected.

Elapsed: 00:00:00.05

Execution Plan
----------------------------------------------------------
Plan hash value: 3988802434

----------------------------------------------------------------------------------------------------------
| Id  | Operation			     | Name		 | Rows  | Bytes | Cost (%CPU)| Time	 |
----------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		     |			 |   988 |   254K|    52   (0)| 00:00:01 |
|*  1 |  HASH JOIN			     |			 |   988 |   254K|    52   (0)| 00:00:01 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| SS1		 |   988 |   127K|    26   (0)| 00:00:01 |
|*  3 |    INDEX RANGE SCAN		     | IDX_SS1_OBJECT_ID |   988 |	 |     4   (0)| 00:00:01 |
|   4 |   TABLE ACCESS BY INDEX ROWID BATCHED| SS2		 |   988 |   127K|    26   (0)| 00:00:01 |
|*  5 |    INDEX RANGE SCAN		     | IDX_SS2_OBJECT_ID |   988 |	 |     4   (0)| 00:00:01 |
----------------------------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - access("SS1"."OBJECT_ID"="SS2"."OBJECT_ID")
   3 - access("SS1"."OBJECT_ID"<1000)
   5 - access("SS2"."OBJECT_ID"<1000)

Note
-----
   - this is an adaptive plan


Statistics
----------------------------------------------------------
	  1  recursive calls
	  0  db block gets
	178  consistent gets
	  0  physical reads
	  0  redo size
     110403  bytes sent via SQL*Net to client
       1168  bytes received via SQL*Net from client
	 68  SQL*Net roundtrips to/from client
	  0  sorts (memory)
	  0  sorts (disk)
	997  rows processed

HONG@pdb1>





/////////////////////////////////////////////////////////


hash 等值关联 小表做为驱动表 
驱动表的select 列 + 连接列 传入PGA中，连接列做 hash运算 形成 hash table
被驱动表 连接列也做hash 运算，之后在hash table进行关联，相关联就出力数据 （被驱动表不传到PGA中）

嵌套循环中被驱动表需要扫描多次，HASH连接的被驱动表只需扫描一次。

UsedMeM 表示Hash连接消耗了多少PGA，如果驱动表太大，PGA不能完全容纳驱动表时候，驱动表就溢出到临时表空间，进而产生磁盘Hash连接，这个时候HASH连接性能就严重下降。
嵌套循环不需要消耗PGA

嵌套循环有传值动作，hash连接没有传值过程。
hash连接列都不需要创建索引。

/*+ swap_join_inputs(ss2) */ 的hint来更改hash join驱动表顺序，不想嵌套循环用leading(table_name)

hash连接优化要点：
驱动表的 select列和连接列都要传到pga中，所以避免select * from...而是把需要的列传到select list中，减少pga的占用，避免溢出到临时表空间
如果无法避免溢出到临时表空间的话，可以将临时表空间创建在SSD上，加速临时数据的交换速度

每个进程work area限制在1gb，驱动表过大，如4gb的话可以开启并行查询 每个查询至少 parallel(4) 将表拆分成4份
如果驱动表非常大，几十GB情况下，应该考虑将表进行拆分，分区表





/////////////////////////////////////////////////////////