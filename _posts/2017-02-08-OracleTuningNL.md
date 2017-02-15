---
layout: post
title: "[原创]Oracle连接方式01-嵌套循环"
category: Oracle
tags: Tuning Oracle NL 
---

* content
{:toc}

嵌套循环连接的概念介绍和实验总结

此文介绍下NL的概念和调优时候的方向





#### Oracle 表连接方式

Oracle的SQL优化器（Optimizer）在执行多表连接查询时，通常采用的连接算法有以下几种方式

	1、嵌套循环连接（NESTED LOOPS JOIN）
	2、群集连接     (CLUSTER JOIN)
	3、排序合并连接（SORT MERGE JOIN）
	4、笛卡尔连接   (CARTESIAN JOIN)
	5、哈希连接(HASH JOIN)
	6、索引连接(INDEX JOIN)


#### 嵌套循环连接(Nested Loops Join)

嵌套循环连接(Nested Loops Join)是一种两个表在做表连接时依靠两层嵌套循环（分别为外层循环和内层循环）来得到连接结果集的表连接方法。

驱动表扫描一行，就扫描一次被驱动表

更多介绍可以查看：

[图解Oracle表连接优化之嵌套循环连接（Nested loops join）](http://blog.itpub.net/15498/viewspace-1958821/)


#### 对于嵌套循环连接的优缺点及适用场景如下

	1）如果驱动表所对应的驱动结果集的记录数较少，同时在被驱动表的连接列上又存在唯一性索引（或者在被驱动表的连接列上存在选择性好的非唯一性索引），那么使用嵌套循环连接的执行效率就会很高；
	但如果驱动表所对应的驱动结果集的记录数很多，即便在被驱动表的连接列上存在索引，此时使用嵌套循环连接的执行效率也不会很高。（小表当驱动表，大表当被驱动表）

	2）大表也可以作为嵌套循环连接的驱动表，关键是看目标SQL中指定的谓词条件(如果有的话，能否将驱动结果集的记录集数量大幅度的降下来)。

	3）嵌套循环连接有其他连接方法所没有的一个优点：嵌套循环连接可以实现快速响应。因为排序合并连接需要等到排序完后做合并操作时才能开始返回数据，而哈希连接则也等到驱动结果集所对应的HASH TABLE全部构建完后才能开始返回数据。

 

#### Oracle表之间的连接之嵌套循环连接,其特点如下

	a.驱动表返回几条记录，被驱动表就被访问多少次。

	b.嵌套循环表连接的表有驱动顺序。

	c.嵌套循环表连接的表无需要排序。

	d.嵌套循环表连接的表没有任何限制场景，即任何SQL语句都可以用嵌套循环表连接的表都可以用嵌套循环连接进行操作数据库。

	e.其SQL语句的优化原则是：驱动表的限制条件的字段上需要有索引，被驱动表的连接条件的字段上需要有索引。

#### 实验



平台：

	SYS@PROD1> select * from v$version;

	BANNER
	--------------------------------------------------------------------------------
	Oracle Database 11g Enterprise Edition Release 11.2.0.3.0 - Production
	PL/SQL Release 11.2.0.3.0 - Production
	CORE    11.2.0.3.0      Production
	TNS for Linux: Version 11.2.0.3.0 - Production
	NLSRTL Version 11.2.0.3.0 - Production

	SYS@PROD1> 

测试数据：

```sql

drop table TAB01 cascade constraints purge;
CREATE TABLE TAB01(col1 number not null,col2 number,text VARCHAR2(4000));
drop table TAB02 cascade constraints purge;
CREATE TABLE TAB02(col1 number not null,col2 number not null, col3 number,text VARCHAR2(4000));
execute dbms_random.seed(0);
insert into TAB01 select rownum,rownum, dbms_random.string('X',100) from dual connect by level<=100 order by dbms_random.random;
insert into TAB02 select rownum,rownum,rownum, dbms_random.string('Y',100) from dual connect by level<=100000 order by dbms_random.random;
commit;

```

数据量：

	SH@PROD1> select count(*) from tab01;

	  COUNT(*)
	----------
	       100

	SH@PROD1> select count(*) from tab02;

	  COUNT(*)
	----------
	    100000

	SH@PROD1> 

测试步骤：

```sql

set linesize 1000;

alter session set statistics_level=all;

select /*+ leading(TAB01) use_nl(TAB02)*/ * from TAB01,TAB02 where TAB01.col1=TAB02.col1;

col SQL_TEXT format a100

select sql_id, child_number, sql_text from v$sql where sql_text like '%leading(TAB01)%';

```

结果：

	SH@PROD1> col SQL_TEXT format a100
	SH@PROD1> select sql_id, child_number, sql_text from v$sql where sql_text like '%leading(TAB01)%';

	SQL_ID        CHILD_NUMBER SQL_TEXT
	------------- ------------ ----------------------------------------------------------------------------------------------------
	gdzj99r8vn3cp            0 select /*+ leading(TAB01) use_nl(TAB02)*/ * from TAB01,TAB02 where TAB01.col1=TAB02.col1
	gdzj99r8vn3cp            1 select /*+ leading(TAB01) use_nl(TAB02)*/ * from TAB01,TAB02 where TAB01.col1=TAB02.col1
	3wx5ys9dhds6v            0 select sql_id, child_number, sql_text from v$sql where sql_text like '%leading(TAB01)%'
	3wx5ys9dhds6v            1 select sql_id, child_number, sql_text from v$sql where sql_text like '%leading(TAB01)%'

	SH@PROD1> select * from table(dbms_xplan.display_cursor('gdzj99r8vn3cp',1,'allstats last'));

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SQL_ID  gdzj99r8vn3cp, child number 1
	-------------------------------------
	select /*+ leading(TAB01) use_nl(TAB02)*/ * from TAB01,TAB02 where
	TAB01.col1=TAB02.col1

	Plan hash value: 593184529

	--------------------------------------------------------------------------------------
	| Id  | Operation          | Name  | Starts | E-Rows | A-Rows |   A-Time   | Buffers |
	--------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT   |       |      1 |        |    100 |00:00:00.61 |     174K|

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	|   1 |  NESTED LOOPS      |       |      1 |    100 |    100 |00:00:00.61 |     174K|
	|   2 |   TABLE ACCESS FULL| TAB01 |      1 |    100 |    100 |00:00:00.01 |      14 |
	|*  3 |   TABLE ACCESS FULL| TAB02 |    100 |      1 |    100 |00:00:00.61 |     174K|
	--------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   3 - filter("TAB01"."COL1"="TAB02"."COL1")

	Note

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	-----
	   - dynamic sampling used for this statement (level=2)


	25 rows selected.

	SH@PROD1> 


备注:


>>> 句柄1的sql文，0表示另外一个schema下执行国同样的sql文

>>> E-ROWS表示优化器评估的行数(Evaluation Rows)，A-ROWS表示实际的行数(Aactual Rows)。

>>> 从上面的执行计划可以看出，TAB01表被执行了一次(Starts这一列表示表被访问的次数)，TAB02表被访问了100次！ 

>>> `在嵌套循环连接中，驱动表返回多少条记录，被驱动表就被访问多少次`



#### 驱动顺序测试

表不同驱动顺序的测试


```sql

alter system flush shared_pool;

select /*+ leading(TAB01) use_nl(TAB02)*/ * from tab01,tab02 where tab01.col1=tab02.col2 and tab01.col2=20;

select /*+ leading(TAB02) use_nl(TAB01)*/ * from tab01,tab02 where tab01.col1=tab02.col2 and tab01.col2=20;

select sql_id, child_number, sql_text from v$sql where sql_text like '%leading(TAB%';

```

结果：

```javascript

SH@PROD1> 
SQL_ID        CHILD_NUMBER SQL_TEXT
------------- ------------ ----------------------------------------------------------------------------------------------------
9q0r37cyxh486            0 select sql_id, child_number, sql_text from v$sql where sql_text like '%leading(TAB%'
7k04bydzf4vq4            0 select /*+ leading(TAB01) use_nl(TAB02)*/ * from tab01,tab02 where tab01.col1=tab02.col2 and tab01.c
	                   ol2=20

79q7sufcj1rjb            0 select /*+ leading(TAB02) use_nl(TAB01)*/ * from tab01,tab02 where tab01.col1=tab02.col2 and tab01.c
	                   ol2=20


SH@PROD1> 

```

查看下面两条执行计划：


```sql

select * from table(dbms_xplan.display_cursor('7k04bydzf4vq4',0,'allstats last'));

select * from table(dbms_xplan.display_cursor('79q7sufcj1rjb',0,'allstats last'));

```

结果如下：  

	SH@PROD1> select * from table(dbms_xplan.display_cursor('7k04bydzf4vq4',0,'allstats last'));

	select * from table(dbms_xplan.display_cursor('79q7sufcj1rjb',0,'allstats last'));
	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SQL_ID  7k04bydzf4vq4, child number 0
	-------------------------------------
	select /*+ leading(TAB01) use_nl(TAB02)*/ * from tab01,tab02 where
	tab01.col1=tab02.col2 and tab01.col2=20

	Plan hash value: 593184529

	--------------------------------------------------------------------------------------
	| Id  | Operation          | Name  | Starts | E-Rows | A-Rows |   A-Time   | Buffers |
	--------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT   |       |      1 |        |      1 |00:00:00.02 |    1755 |

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	|   1 |  NESTED LOOPS      |       |      1 |      1 |      1 |00:00:00.02 |    1755 |
	|*  2 |   TABLE ACCESS FULL| TAB01 |      1 |      1 |      1 |00:00:00.01 |       8 |
	|*  3 |   TABLE ACCESS FULL| TAB02 |      1 |      1 |      1 |00:00:00.02 |    1747 |
	--------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   2 - filter("TAB01"."COL2"=20)
	   3 - filter("TAB01"."COL1"="TAB02"."COL2")


	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Note
	-----
	   - dynamic sampling used for this statement (level=2)


	26 rows selected.

	SH@PROD1> SH@PROD1> 

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SQL_ID  79q7sufcj1rjb, child number 0
	-------------------------------------
	select /*+ leading(TAB02) use_nl(TAB01)*/ * from tab01,tab02 where
	tab01.col1=tab02.col2 and tab01.col2=20

	Plan hash value: 216146374

	--------------------------------------------------------------------------------------
	| Id  | Operation          | Name  | Starts | E-Rows | A-Rows |   A-Time   | Buffers |
	--------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT   |       |      1 |        |      1 |00:00:00.91 |     701K|

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	|   1 |  NESTED LOOPS      |       |      1 |      1 |      1 |00:00:00.91 |     701K|
	|   2 |   TABLE ACCESS FULL| TAB02 |      1 |  83619 |    100K|00:00:00.04 |    1747 |
	|*  3 |   TABLE ACCESS FULL| TAB01 |    100K|      1 |      1 |00:00:00.78 |     700K|
	--------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   3 - filter(("TAB01"."COL2"=20 AND "TAB01"."COL1"="TAB02"."COL2"))

	Note

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	-----
	   - dynamic sampling used for this statement (level=2)


	25 rows selected.

	SH@PROD1> 


#### NL嵌套循环结论：

>> TAB01表先访问的情况下NESTED LOOPS的BUFFER是1755，而TAB02表先访问的情况下，BUFFER是701K。相差近300倍以上。

>> TAB01小表作为驱动表的情况下，TAB01，TAB02都只被访问了1次，而TAB02大表作为驱动表的时候，TAB01被访问100K，即TAB02 表的记录数次数。

所以,`嵌套循环连接要注意驱动表的顺序，小的结果集先访问做驱动表，大的结果集后访问作为被驱动表，才能保证被驱动表的访问次数降低最低，从而减少IO操作，提升性能`。 












