---
layout: post
title: "[原创]Oracle连接方式02-哈希连接"
category: Oracle
tags: Tuning Oracle NL 
---

* content
{:toc}

哈希连接接的概念介绍和实验总结

此文介绍下HJ的概念和调优时候的方向





#### Oracle 表连接方式

Oracle的SQL优化器（Optimizer）在执行多表连接查询时，通常采用的连接算法有以下几种方式

	1、嵌套循环连接（NESTED LOOPS JOIN）
	2、群集连接     (CLUSTER JOIN)
	3、排序合并连接（SORT MERGE JOIN）
	4、笛卡尔连接   (CARTESIAN JOIN)
	5、哈希连接(HASH JOIN)
	6、索引连接(INDEX JOIN)


#### 哈希连接（HASH JOIN）

哈希连接（HASH JOIN）是一种两个表在做表连接时主要依靠哈希运算来得到连接结果集的表连接方法。

对于排序合并连接，如果两个表在施加了目标SQL中指定的谓词条件后得到的结果集很大而且需要排序，则排序合并连接的执行效率一定不高；
而对于嵌套循环连接，如果驱动表所对应的驱动结果集的记录数很大，即便在被驱动表的连接列上存在索引，此时使用嵌套循环连接的执行效率也会同样不高。
为了解决这个问题，于是Oracle引进了哈希连接。
在ORACLE 10g及其以后的版本中，优化器 （实际上是CBO，因为哈希连接仅适用于CBO）在解析目标SQL的时候是否考虑哈希连接受限于隐含参数_HASH_JOIN_ENABLED,默认值是TRUE.

#### 哈希连接（HASH JOIN）优缺点

对于哈希连接的优缺点及适用场景如下：

	1,哈希连接不一定会排序，或者说大多数情况下都不需要排序

	2,哈希连接的驱动表所对应的连接列的选择性尽可能好。

	3,哈希只能用于CBO，而且只能用于等值连接的条件。（即使是哈希反连接，ORACLE实际上也是将其换成等值连接）。

	4,哈希连接很适用小表和大表之间做连接且连接结果集的记录数较多的情形，特别是小表的选择性非常好的情况下，这个时候哈希连接的执行时间就可以近似看做和全表扫描个个大表的费用时间相当。

	5,当两个哈希连接的时候，如果在施加了目标SQL中指定的谓词条件后得到的数据量较小的那个结果集所对应的HASH TABLE能够完全被容纳在内存中（PGA的工作区），此时的哈希连接的执行效率非常高。

 

#### 哈希连接(Hash Join)特点如下：

	1，驱动表和被驱动表都是最多只被访问一次。

	2，哈希连接的表有驱动顺序。

	3，哈希表连接的表无需要排序，但是他在做连接之前做哈希运算的时候，会用到HASH_AREA_SIZE来创建哈希表。

	4，哈希连接不适用于的连接条件是：不等于<>，大于>，小于<，小于等于<=，大于等于>=，like。

	5，哈希连接索引列在表连接中无特殊要求，与单表情况无异。



测试：

```sql

alter system flush shared_pool;

set linesize 1000;

alter session set statistics_level=all;

col SQL_TEXT format a100

select /*+ leading(tab01) use_hash(tab02)*/ * from tab01,tab02 where tab01.col1=tab02.col2;

select sql_id, child_number, sql_text from v$sql where sql_text like '%leading(tab%';

```

	SH@PROD1> select sql_id, child_number, sql_text from v$sql where sql_text like '%leading(tab%';

	SQL_ID        CHILD_NUMBER SQL_TEXT
	------------- ------------ ----------------------------------------------------------------------------------------------------
	99rwct57sysh2            0 select sql_id, child_number, sql_text from v$sql where sql_text like '%leading(tab%'
	4hac6vuc2kz75            0 select /*+ leading(tab01) use_hash(tab02)*/ * from tab01,tab02 where tab01.col1=tab02.col2

	SH@PROD1> 


```sql
select * from table(dbms_xplan.display_cursor('4hac6vuc2kz75',0,'allstats last'));
```
执行计划如下：

	SH@PROD1> select * from table(dbms_xplan.display_cursor('4hac6vuc2kz75',0,'allstats last'));

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SQL_ID  4hac6vuc2kz75, child number 0
	-------------------------------------
	select /*+ leading(tab01) use_hash(tab02)*/ * from tab01,tab02 where
	tab01.col1=tab02.col2

	Plan hash value: 2225763386

	-----------------------------------------------------------------------------------------------------------------
	| Id  | Operation          | Name  | Starts | E-Rows | A-Rows |   A-Time   | Buffers |  OMem |  1Mem | Used-Mem |
	-----------------------------------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT   |       |      1 |        |    100 |00:00:00.15 |    1763 |       |       |          |

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	|*  1 |  HASH JOIN         |       |      1 |    100 |    100 |00:00:00.15 |    1763 |   713K|   713K| 1216K (0)|
	|   2 |   TABLE ACCESS FULL| TAB01 |      1 |    100 |    100 |00:00:00.01 |       7 |       |       |          |
	|   3 |   TABLE ACCESS FULL| TAB02 |      1 |  83619 |    100K|00:00:00.05 |    1756 |       |       |          |
	-----------------------------------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   1 - access("TAB01"."COL1"="TAB02"."COL2")

	Note

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	-----
	   - dynamic sampling used for this statement (level=2)


	25 rows selected.

	SH@PROD1> 



>> HASH连接中，驱动表和被驱动表都只会被访问1次。哈希连接中驱动表的顺序跟NL一样，非常重要的，顺序不一样性能差别也大。

>> 另外：哈希连接不支持不等值连接不等于<>，大于>，小于<，小于等于<=，大于等于>=，like。

