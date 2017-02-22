---
layout: post
title: "Oracle Hint中qb_name使用"
category: Oracle
tags: Oracle hint qb_name
---

* content
{:toc}


有时候使用hint时候，发现sql并没有按照自己指定执行计划执行，这个时候可以通过qb_name来巩固指定，特别是在复杂的sql执行中。






#### 测试用例：

	HR> create table test01( id1 int,id2 int);

	Table created.

	HR> create table test02( id1 int,id2 int);

	Table created.

	HR> select * from test02 where test02.id2 = 1 and exists (select null from test01 where test01.id1 = test02.id1);

	no rows selected

	HR> 

通过hint来指定嵌套循环，但并没有按照我想要的hint执行计划执行

`select /*+leading(test02) nl_sj(test01)*/* from test02 where test02.id2 = 1 and exists (select null from test01 where test01.id1 = test02.id1);  `

测试：

	HR> select /*+leading(test02) nl_sj(test01)*/* from test02 where test02.id2 = 1 and exists (selec
	t null from test01 where test01.id1 = test02.id1);  

	no rows selected

	HR> select sql_id, child_number, sql_text from v$sql where sql_text like '%test%';

	SQL_ID        CHILD_NUMBER
	------------- ------------
	SQL_TEXT
	--------------------------------------------------------------------------------
	6qamvs8qwptdv            0
	select sql_id, child_number, sql_text from v$sql where sql_text like '%test%'

	3ga6w5gsyr4xz            0
	select /*+leading(test02) nl_sj(test01)*/* from test02 where test02.id2 = 1 and
	exists (select null from test01 where test01.id1 = test02.id1)


	HR> select * from table(dbms_xplan.display_cursor('3ga6w5gsyr4xz',0,'allstats last'));

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	SQL_ID  3ga6w5gsyr4xz, child number 0
	-------------------------------------
	select /*+leading(test02) nl_sj(test01)*/* from test02 where test02.id2
	= 1 and exists (select null from test01 where test01.id1 = test02.id1)

	Plan hash value: 2192055320

	-------------------------------------------------------------------------
	| Id  | Operation          | Name   | E-Rows |  OMem |  1Mem | Used-Mem |
	-------------------------------------------------------------------------
	|   0 | SELECT STATEMENT   |        |        |       |       |          |

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	|*  1 |  HASH JOIN SEMI    |        |      1 |   783K|   783K|  169K (0)|
	|*  2 |   TABLE ACCESS FULL| TEST02 |      1 |       |       |          |
	|   3 |   TABLE ACCESS FULL| TEST01 |      1 |       |       |          |
	-------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   1 - access("TEST01"."ID1"="TEST02"."ID1")
	   2 - filter("TEST02"."ID2"=1)


	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	Note
	-----
	   - dynamic sampling used for this statement (level=2)
	   - Warning: basic plan statistics not available. These are only collected when
	:

	       * hint 'gather_plan_statistics' is used for the statement or
	       * parameter 'statistics_level' is set to 'ALL', at session or system leve
	l



	29 rows selected.

	HR> 

#### qb_name的使用

可以看到这种hint并没有起作用，这里test01,test02通过hash半连接。实际上是test02表为主表，test01表只是过滤条件。这个时候 我们通过使用qb_name即可。定义了qb_name之后最大的好处就是再设定其他hint时，可以指定qb_name:

也就是/*+ qb_name (queryblock ) */qb_name是定义一个查询模块的别名的意思

`select /*+qb_name(main)*/ * from test02 where test02.id2 = 1 and exists (select /*+qb_name(subq) nl_sj*/null from test01 where test01.id1 = test02.id1);  `

`select * from table(dbms_xplan.display_cursor('4h38q1b9j6hpb',0,'allstats last'));`


测试：

	HR> select /*+qb_name(main)*/ * from test02 where test02.id2 = 1 and exists (select /*+qb_name(subq) nl_sj*/null from test01 where test01.id1 = test02.id1);  

	no rows selected

	HR> select sql_id, child_number, sql_text from v$sql where sql_text like '%test%';

	SQL_ID        CHILD_NUMBER
	------------- ------------
	SQL_TEXT
	--------------------------------------------------------------------------------
	5ms1dhxbadq64            0
	update wrm$_snapshot set status = 0,      flush_elapsed =         greatest((cast
	(SYSDATE as TIMESTAMP) - end_interval_time),                 interval '00.10' se
	cond)  where snap_id = :snap_id and dbid = :dbid and      instance_number = :ins
	tance_number

	6qamvs8qwptdv            0
	select sql_id, child_number, sql_text from v$sql where sql_text like '%test%'


	SQL_ID        CHILD_NUMBER
	------------- ------------
	SQL_TEXT
	--------------------------------------------------------------------------------
	4h38q1b9j6hpb            0
	select /*+qb_name(main)*/ * from test02 where test02.id2 = 1 and exists (select
	/*+qb_name(subq) nl_sj*/null from test01 where test01.id1 = test02.id1)

	3ga6w5gsyr4xz            0
	select /*+leading(test02) nl_sj(test01)*/* from test02 where test02.id2 = 1 and
	exists (select null from test01 where test01.id1 = test02.id1)


	HR> select * from table(dbms_xplan.display_cursor('4h38q1b9j6hpb',0,'allstats last'));

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	SQL_ID  4h38q1b9j6hpb, child number 0
	-------------------------------------
	select /*+qb_name(main)*/ * from test02 where test02.id2 = 1 and exists
	(select /*+qb_name(subq) nl_sj*/null from test01 where test01.id1 =
	test02.id1)

	Plan hash value: 3019674466

	----------------------------------------------
	| Id  | Operation          | Name   | E-Rows |
	----------------------------------------------

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT   |        |        |
	|   1 |  NESTED LOOPS SEMI |        |      1 |
	|*  2 |   TABLE ACCESS FULL| TEST02 |      1 |
	|*  3 |   TABLE ACCESS FULL| TEST01 |      1 |
	----------------------------------------------

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   2 - filter("TEST02"."ID2"=1)
	   3 - filter("TEST01"."ID1"="TEST02"."ID1")

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------

	Note
	-----
	   - dynamic sampling used for this statement (level=2)
	   - Warning: basic plan statistics not available. These are only collected when
	:

	       * hint 'gather_plan_statistics' is used for the statement or
	       * parameter 'statistics_level' is set to 'ALL', at session or system leve
	l


	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------


	30 rows selected.

	HR> 


#### qb_name的说明

其实就是模块名的意思，自己指定模块名

	HR> explain plan for select /*+qb_name(my_qb_name)*/ * from test01;

	Explained.

	HR> select * from table(dbms_xplan.display(null,null,'ALL'));

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	Plan hash value: 262542483

	----------------------------------------------------------------------------
	| Id  | Operation         | Name   | Rows  | Bytes | Cost (%CPU)| Time     |
	----------------------------------------------------------------------------
	|   0 | SELECT STATEMENT  |        |     1 |    26 |     2   (0)| 00:00:01 |
	|   1 |  TABLE ACCESS FULL| TEST01 |     1 |    26 |     2   (0)| 00:00:01 |
	----------------------------------------------------------------------------

	Query Block Name / Object Alias (identified by operation id):
	-------------------------------------------------------------

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------

	   1 - MY_QB_NAME / TEST01@MY_QB_NAME `--这里的模块名是MY_QB_NAME`

	Column Projection Information (identified by operation id):
	-----------------------------------------------------------

	   1 - "TEST01"."ID1"[NUMBER,22], "TEST01"."ID2"[NUMBER,22]

	Note
	-----
	   - dynamic sampling used for this statement (level=2)

	22 rows selected.

	HR> 


如果是没指定，oracle会自动起个模块名

	HR> explain plan for select * from test01;

	Explained.

	HR> select * from table(dbms_xplan.display(null,null,'ALL'));

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	Plan hash value: 262542483

	----------------------------------------------------------------------------
	| Id  | Operation         | Name   | Rows  | Bytes | Cost (%CPU)| Time     |
	----------------------------------------------------------------------------
	|   0 | SELECT STATEMENT  |        |     1 |    26 |     2   (0)| 00:00:01 |
	|   1 |  TABLE ACCESS FULL| TEST01 |     1 |    26 |     2   (0)| 00:00:01 |
	----------------------------------------------------------------------------

	Query Block Name / Object Alias (identified by operation id):
	-------------------------------------------------------------

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------

	   1 - SEL$1 / TEST01@SEL$1 `--这里的模块名是SEL$1`

	Column Projection Information (identified by operation id):
	-----------------------------------------------------------

	   1 - "TEST01"."ID1"[NUMBER,22], "TEST01"."ID2"[NUMBER,22]

	Note
	-----
	   - dynamic sampling used for this statement (level=2)

	22 rows selected.

	HR> 


所以，在Oracle内部这个查询模块叫SEL$1,我们也可以通过qb_name直接指定模块名。

另外，其中sel$表示查询的意思，我们有时候还会看到ins$2, upd$3, del$4,分别表示插入，更新，删除模块。

#### qb_name结合outline的使用

`create table test01 as select* from dba_objects;  

create index idx_test01 on test01(object_id);  

explain plan for select /*+qb_name(mainqb) full(@mainqb t)*/* from test01 t where object_id = 10;   --这里@mainqb t表示的是mainqb模块下表t  

select * from table(dbms_xplan.display(null, null, 'ALL'));  

explain plan for select /*+qb_name(qb) index(@qb t idx_test01)*/* from test01 t where object_id >= 10;  --这里表示qb模块走表t的idx_test01索引  

select * from table(dbms_xplan.display(null, null, 'ALL'));  `


全表扫描和索引扫描：


	HR> drop table test01 purge;

	Table dropped.

	HR> create table test01 as select* from dba_objects;  

	Table created.

	HR> create index idx_test01 on test01(object_id);  

	Index created.

	HR> explain plan for select /*+qb_name(mainqb) full(@mainqb t)*/* from test01 t where object_id = 10; 

	Explained.

	HR> select * from table(dbms_xplan.display(null, null, 'ALL')); 

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	Plan hash value: 262542483

	----------------------------------------------------------------------------
	| Id  | Operation         | Name   | Rows  | Bytes | Cost (%CPU)| Time     |
	----------------------------------------------------------------------------
	|   0 | SELECT STATEMENT  |        |     1 |   207 |   301   (1)| 00:00:04 |
	|*  1 |  TABLE ACCESS FULL| TEST01 |     1 |   207 |   301   (1)| 00:00:04 |
	----------------------------------------------------------------------------

	Query Block Name / Object Alias (identified by operation id):
	-------------------------------------------------------------

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------

	   1 - MAINQB / T@MAINQB

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   1 - filter("OBJECT_ID"=10)

	Column Projection Information (identified by operation id):
	-----------------------------------------------------------


	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	   1 - "T"."OWNER"[VARCHAR2,30], "T"."OBJECT_NAME"[VARCHAR2,128],
	       "T"."SUBOBJECT_NAME"[VARCHAR2,30], "OBJECT_ID"[NUMBER,22],
	       "T"."DATA_OBJECT_ID"[NUMBER,22], "T"."OBJECT_TYPE"[VARCHAR2,19],
	       "T"."CREATED"[DATE,7], "T"."LAST_DDL_TIME"[DATE,7],
	       "T"."TIMESTAMP"[VARCHAR2,19], "T"."STATUS"[VARCHAR2,7],
	       "T"."TEMPORARY"[VARCHAR2,1], "T"."GENERATED"[VARCHAR2,1],
	       "T"."SECONDARY"[VARCHAR2,1], "T"."NAMESPACE"[NUMBER,22],
	       "T"."EDITION_NAME"[VARCHAR2,30]

	Note
	-----

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	   - dynamic sampling used for this statement (level=2)

	34 rows selected.

	HR> 





	HR> explain plan for select /*+qb_name(qb) index(@qb t idx_test01)*/* from test01 t where object_id >= 10;

	Explained.

	HR> select * from table(dbms_xplan.display(null, null, 'ALL')); 

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Plan hash value: 607607746

	------------------------------------------------------------------------------------------
	| Id  | Operation                   | Name       | Rows  | Bytes | Cost (%CPU)| Time     |
	------------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT            |            | 70231 |    13M|  1941   (1)| 00:00:24 |
	|   1 |  TABLE ACCESS BY INDEX ROWID| TEST01     | 70231 |    13M|  1941   (1)| 00:00:24 |
	|*  2 |   INDEX RANGE SCAN          | IDX_TEST01 | 70231 |       |   182   (1)| 00:00:03 |
	------------------------------------------------------------------------------------------

	Query Block Name / Object Alias (identified by operation id):

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	-------------------------------------------------------------

	   1 - QB / T@QB
	   2 - QB / T@QB

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   2 - access("OBJECT_ID">=10)

	Column Projection Information (identified by operation id):

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	-----------------------------------------------------------

	   1 - "T"."OWNER"[VARCHAR2,30], "T"."OBJECT_NAME"[VARCHAR2,128],
	       "T"."SUBOBJECT_NAME"[VARCHAR2,30], "OBJECT_ID"[NUMBER,22],
	       "T"."DATA_OBJECT_ID"[NUMBER,22], "T"."OBJECT_TYPE"[VARCHAR2,19],
	       "T"."CREATED"[DATE,7], "T"."LAST_DDL_TIME"[DATE,7], "T"."TIMESTAMP"[VARCHAR2,19],
	       "T"."STATUS"[VARCHAR2,7], "T"."TEMPORARY"[VARCHAR2,1],
	       "T"."GENERATED"[VARCHAR2,1], "T"."SECONDARY"[VARCHAR2,1],
	       "T"."NAMESPACE"[NUMBER,22], "T"."EDITION_NAME"[VARCHAR2,30]
	   2 - "T".ROWID[ROWID,10], "OBJECT_ID"[NUMBER,22]


	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Note
	-----
	   - dynamic sampling used for this statement (level=2)

	36 rows selected.

	HR> 


我们在通过outline结合起来，有时对于那些自己没把握写hint的sql,但是又希望oracle走自己想走的执行计划。这个时候，让oracle帮自己写:这里我们可以使用oracle的执行计划的outline功能来提示和编写hint：


`explain plan for select /*+qb_name(qb) index(@qb t idx_test01)*/* from test01 t where object_id >= 10;`

`select * from table(dbms_xplan.display(null, null, 'outline')); `



	HR> explain plan for select /*+qb_name(qb) index(@qb t idx_test01)*/* from test01 t where object_id >= 10;

	Explained.

	HR> select * from table(dbms_xplan.display(null, null, 'outline'));

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Plan hash value: 607607746

	------------------------------------------------------------------------------------------
	| Id  | Operation                   | Name       | Rows  | Bytes | Cost (%CPU)| Time     |
	------------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT            |            | 70231 |    13M|  1941   (1)| 00:00:24 |
	|   1 |  TABLE ACCESS BY INDEX ROWID| TEST01     | 70231 |    13M|  1941   (1)| 00:00:24 |
	|*  2 |   INDEX RANGE SCAN          | IDX_TEST01 | 70231 |       |   182   (1)| 00:00:03 |
	------------------------------------------------------------------------------------------

	Outline Data

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	-------------

	  /*+
	      BEGIN_OUTLINE_DATA
	      INDEX_RS_ASC(@"QB" "T"@"QB" ("TEST01"."OBJECT_ID"))
	      OUTLINE(@"QB")
	      OUTLINE_LEAF(@"QB")
	      ALL_ROWS
	      DB_VERSION('11.2.0.3')
	      OPTIMIZER_FEATURES_ENABLE('11.2.0.3')
	      IGNORE_OPTIM_EMBEDDED_HINTS

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	      END_OUTLINE_DATA
	  */

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   2 - access("OBJECT_ID">=10)

	Note
	-----
	   - dynamic sampling used for this statement (level=2)

	33 rows selected.

	HR> 


其中下面一块就是oracle的hint内容，我们可以借鉴和使用改写即可

	  /*+
	      BEGIN_OUTLINE_DATA
	      INDEX_RS_ASC(@"QB" "T"@"QB" ("TEST01"."OBJECT_ID"))
	      OUTLINE(@"QB")
	      OUTLINE_LEAF(@"QB")
	      ALL_ROWS
	      DB_VERSION('11.2.0.3')
	      OPTIMIZER_FEATURES_ENABLE('11.2.0.3')
	      IGNORE_OPTIM_EMBEDDED_HINTS
	      END_OUTLINE_DATA
	  */

碰到复杂的sql也是可以通过这种类似方法来使用。


参考：

[Oracle中Hint深入理解(原创)](http://czmmiao.iteye.com/blog/1478465)





