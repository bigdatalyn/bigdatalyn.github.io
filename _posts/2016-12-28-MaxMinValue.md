---
layout: post
title:  "Oracle SQL优化： 最大值和最小值"
categories: Oracle
tags:  Oracle SQL
---

* content
{:toc}


Oracle最大值和最小值的写法





## 看测试用例：



### 比较结果：

一致读：读取块数168和4，差距比较大


select max(object_id),min(object_id) from t;

INDEX FAST FULL SCAN

>>        168  consistent gets


select max(object_id) from t 
union all 
select min(object_id) from t;

INDEX FULL SCAN (MIN/MAX)

>>          4  consistent gets


### 索引高度只有2

	SCOTT@PROD1> ANALYZE INDEX t_id  VALIDATE  STRUCTURE;

	Index analyzed.

	SCOTT@PROD1> select height from index_stats where name='T_ID';

	    HEIGHT
	----------
		 2

	SCOTT@PROD1> 


	
```
	SCOTT@PROD1> drop table t purge;

	Table dropped.

	SCOTT@PROD1> create table t as select * from all_objects;

	Table created.

	SCOTT@PROD1> create index t_id on t(object_id);

	Index created.

	SCOTT@PROD1> exec dbms_stats.gather_table_stats( user, 'T' ); 

	PL/SQL procedure successfully completed.

	Commit complete.
	SCOTT@PROD1> set autot traceonly                              
	SCOTT@PROD1> select max(object_id),min(object_id) from t;


	Execution Plan
	----------------------------------------------------------
	Plan hash value: 3689807224

	------------------------------------------------------------------------------
	| Id  | Operation             | Name | Rows  | Bytes | Cost (%CPU)| Time     |
	------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT      |      |     1 |     5 |    46   (3)| 00:00:01 |
	|   1 |  SORT AGGREGATE       |      |     1 |     5 |            |          |
	|   2 |   INDEX FAST FULL SCAN| T_ID | 72600 |   354K|    46   (3)| 00:00:01 |
	------------------------------------------------------------------------------


	Statistics
	----------------------------------------------------------
		  1  recursive calls
		  0  db block gets
		168  consistent gets
		  0  physical reads
		  0  redo size
		501  bytes sent via SQL*Net to client
		419  bytes received via SQL*Net from client
		  2  SQL*Net roundtrips to/from client
		  0  sorts (memory)
		  0  sorts (disk)
		  1  rows processed

	SCOTT@PROD1> select max(object_id),min(object_id) from t;


	Execution Plan
	----------------------------------------------------------
	Plan hash value: 3689807224

	------------------------------------------------------------------------------
	| Id  | Operation             | Name | Rows  | Bytes | Cost (%CPU)| Time     |
	------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT      |      |     1 |     5 |    46   (3)| 00:00:01 |
	|   1 |  SORT AGGREGATE       |      |     1 |     5 |            |          |
	|   2 |   INDEX FAST FULL SCAN| T_ID | 72600 |   354K|    46   (3)| 00:00:01 |
	------------------------------------------------------------------------------


	Statistics
	----------------------------------------------------------
		  0  recursive calls
		  0  db block gets
		168  consistent gets
		  0  physical reads
		  0  redo size
		501  bytes sent via SQL*Net to client
		419  bytes received via SQL*Net from client
		  2  SQL*Net roundtrips to/from client
		  0  sorts (memory)
		  0  sorts (disk)
		  1  rows processed

	SCOTT@PROD1> select max(object_id) from t 
	union all 
	select min(object_id) from t;
	  2    3  

	Execution Plan
	----------------------------------------------------------
	Plan hash value: 2945550355

	------------------------------------------------------------------------------------
	| Id  | Operation                   | Name | Rows  | Bytes | Cost (%CPU)| Time     |
	------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT            |      |     2 |    10 |     4  (50)| 00:00:01 |
	|   1 |  UNION-ALL                  |      |       |       |            |          |
	|   2 |   SORT AGGREGATE            |      |     1 |     5 |            |          |
	|   3 |    INDEX FULL SCAN (MIN/MAX)| T_ID |     1 |     5 |     2   (0)| 00:00:01 |
	|   4 |   SORT AGGREGATE            |      |     1 |     5 |            |          |
	|   5 |    INDEX FULL SCAN (MIN/MAX)| T_ID |     1 |     5 |     2   (0)| 00:00:01 |
	------------------------------------------------------------------------------------


	Statistics
	----------------------------------------------------------
		  1  recursive calls
		  0  db block gets
		  4  consistent gets
		  0  physical reads
		  0  redo size
		468  bytes sent via SQL*Net to client
		419  bytes received via SQL*Net from client
		  2  SQL*Net roundtrips to/from client
		  0  sorts (memory)
		  0  sorts (disk)
		  2  rows processed

	SCOTT@PROD1> select max(object_id) from t 
	union all 
	select min(object_id) from t;
	  2    3  

	Execution Plan
	----------------------------------------------------------
	Plan hash value: 2945550355

	------------------------------------------------------------------------------------
	| Id  | Operation                   | Name | Rows  | Bytes | Cost (%CPU)| Time     |
	------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT            |      |     2 |    10 |     4  (50)| 00:00:01 |
	|   1 |  UNION-ALL                  |      |       |       |            |          |
	|   2 |   SORT AGGREGATE            |      |     1 |     5 |            |          |
	|   3 |    INDEX FULL SCAN (MIN/MAX)| T_ID |     1 |     5 |     2   (0)| 00:00:01 |
	|   4 |   SORT AGGREGATE            |      |     1 |     5 |            |          |
	|   5 |    INDEX FULL SCAN (MIN/MAX)| T_ID |     1 |     5 |     2   (0)| 00:00:01 |
	------------------------------------------------------------------------------------


	Statistics
	----------------------------------------------------------
		  0  recursive calls
		  0  db block gets
		  4  consistent gets
		  0  physical reads
		  0  redo size
		468  bytes sent via SQL*Net to client
		419  bytes received via SQL*Net from client
		  2  SQL*Net roundtrips to/from client
		  0  sorts (memory)
		  0  sorts (disk)
		  2  rows processed

	SCOTT@PROD1> 

```