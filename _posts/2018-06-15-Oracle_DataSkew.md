---
layout: post
title: "Oracle Data Skew Basic knowledge"
category: Oracle
tags: Oracle DataSkew
---

* content
{:toc}

Oracle Data Skew Basic knowledge

The test cases for data skew.

> Not use Bind Variable
> Use Bind Variable
> Other cases







### Test Env

OS and Database version: OEL7.3 64bit/Database 11.2.0.4

	[oracle@databasevm001 ~]$ cat /etc/redhat-release 
	Red Hat Enterprise Linux Server release 7.3 (Maipo)
	[oracle@databasevm001 ~]$ uname -a
	Linux databasevm001 4.1.12-61.1.28.el7uek.x86_64 #2 SMP Thu Feb 23 19:55:12 PST 2017 x86_64 x86_64 x86_64 GNU/Linux
	[oracle@databasevm001 ~]$ sqlplus / as sysdba
	SQL*Plus: Release 11.2.0.4.0 Production on Fri Jun 15 05:34:19 2018
	Copyright (c) 1982, 2013, Oracle.  All rights reserved.
	Connected to:
	Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options
	SYS@orcl11g> select * from v$version;
	BANNER
	--------------------------------------------------------------------------------
	Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	PL/SQL Release 11.2.0.4.0 - Production
	CORE    11.2.0.4.0      Production
	TNS for Linux: Version 11.2.0.4.0 - Production
	NLSRTL Version 11.2.0.4.0 - Production
	SYS@orcl11g> 

Test table:

Create scott.test table and update the data while the object_id are above 10.

	SYS@orcl11g> create table scott.test as select * from dba_objects;
	SYS@orcl11g> create index scott.indx_test on scott.test(object_id);
	SYS@orcl11g> update scott.test set  object_id=10 where object_id>10;

The data skew is the following.

	SYS@orcl11g> select object_id,count(1) from scott.test group by object_id;
	OBJECT_ID   COUNT(1)
	---------- ----------
			6          1
			2          1
			5          1
			4          1
			8          1
			3          1
			7          1
			10      86593
			9          1
	9 rows selected.
	SYS@orcl11g> 


### Not use Bind Variable

There are three cases in the following which would not affect the execute of sql.

> 1.The columns: whether it is as the filter or the join condition.

> 2.The columns: whether it is collected by histogram.

> 3.Whether the parameter: cursor_sharing is "exact". If "force", it will use Bind Variable


#### Don't collect the hitogram statistical information

In this test case, we collect the Statistical information but don't collect the histogram infor.

	SYS@orcl11g> exec dbms_stats.gather_table_stats('SCOTT','TEST',method_opt=>'for columns object_id size 1', cascade=>true);

Confirm the table's column whether it is collected via histogram using the following sql.

	SYS@orcl11g> select table_name,column_name,histogram from dba_tab_col_statistics where table_name='TEST' and column_name='OBJECT_ID';
	TABLE_NAME                     COLUMN_NAME                    HISTOGRAM
	------------------------------ ------------------------------ ---------------
	TEST                           OBJECT_ID                      NONE
	SYS@orcl11g> 

"NONE" means the column was NOT collected the histogram statistics infor.

The only one record are returned from scott.test and the many records return are from scott.table. 

	SYS@orcl11g> select * from scott.test where object_id = 2;
	SYS@orcl11g> select * from scott.test where object_id = 10;

Check the above sql's hashvalue after there are executed.

	SYS@orcl11g>  select sql_id,sql_text,plan_hash_value from v$sql where upper(sql_text) like '%SCOTT.TEST%';

Found that there are the same hashvalue(2982644947),so these are used the same execute plan.

	dd4tm9x82jsxf select * from scott.test where object_id = 2      2982644947
	4x4r899sf34cs select * from scott.test where object_id = 10     2982644947

Check the execute plan:

	[oracle@databasevm001 ~]$ ora -u system/oracle plan dd4tm9x82jsxf
	[oracle@databasevm001 ~]$ ora -u system/oracle plan 4x4r899sf34cs

Or use the sql to check:

	col OPERATION for a40
	col OBJECT_NAME for a20

	select sql_id,plan_hash_value,
		LPAD('',4*DEPTH) || OPERATION || OPTIONS OPERATION,
		OBJECT_NAME,
		CARDINALITY,
		BYTES,
		COST,
		TIME
	from v$sql_plan where sql_id = 'dd4tm9x82jsxf' or sql_id = '4x4r899sf34cs';

There are used by the same execute plan.

	SQL_ID        PLAN_HASH_VALUE OPERATION                                OBJECT_NAME          CARDINALITY      BYTES       COST       TIME
	------------- --------------- ---------------------------------------- -------------------- ----------- ---------- ---------- ----------
	dd4tm9x82jsxf      2982644947 SELECT STATEMENT                                                                            172
	dd4tm9x82jsxf      2982644947 TABLE ACCESSBY INDEX ROWID               TEST                        9622     923712        172          3
	dd4tm9x82jsxf      2982644947 INDEXRANGE SCAN                          INDX_TEST                   9622                    34          1
	4x4r899sf34cs      2982644947 SELECT STATEMENT                                                                            172
	4x4r899sf34cs      2982644947 TABLE ACCESSBY INDEX ROWID               TEST                        9622     923712        172          3
	4x4r899sf34cs      2982644947 INDEXRANGE SCAN                          INDX_TEST                   9622                    34          1

#### Collect the hitogram statistical information

In this test case, we collect the Statistical information also collect the histogram infor.

	SYS@orcl11g> exec dbms_stats.gather_table_stats('SCOTT','TEST',method_opt=>'for columns object_id size auto', cascade=>true);
	SYS@orcl11g> select table_name,column_name,histogram from dba_tab_col_statistics where table_name='TEST' and column_name='OBJECT_ID';

	TABLE_NAME                     COLUMN_NAME                    HISTOGRAM
	------------------------------ ------------------------------ ---------------
	TEST                           OBJECT_ID                      FREQUENCY

	SYS@orcl11g> 
	SYS@orcl11g> select * from dba_tab_histograms where table_name='TEST' and column_name = 'OBJECT_ID';
	~
	SCOTT TEST OBJECT_ID               1              2
	SCOTT TEST OBJECT_ID            5380             10
	~

The column "object_id" was collected by FREQUENCY HISTOGRAM.

Re-execte the following sql

	SYS@orcl11g> select * from scott.test where object_id = 2;
	SYS@orcl11g> select * from scott.test where object_id = 10;


and check the execute sql's information via the sqls.

	SYS@orcl11g> select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';

	dd4tm9x82jsxf select * from scott.test where object_id = 2 		2982644947 7B57E160 1344857006
	4x4r899sf34cs select * from scott.test where object_id = 10		2982644947 7B5DCEC0 1893831064

However, these two sql were used the same execute plan. Why?

The reason is that we didn't use "no_invalidate=>false" while collecting statistics information and the cursor of these two sql are still efficient.

Solution: Use dbms_shared_pool.purge('#### ADDRESS,#### HASH_VALUE','C');

	SYS@orcl11g> exec dbms_shared_pool.purge('7B57E160,1344857006','C');
	SYS@orcl11g> exec dbms_shared_pool.purge('7B5DCEC0,1893831064','C');

Example:

	SYS@orcl11g> select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';
	SQL_ID        SQL_TEXT
	------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	PLAN_HASH_VALUE ADDRESS  HASH_VALUE
	--------------- -------- ----------
	4p5f2903cwsa2 select * from scott.test where object_id = 2
		2982644947 7B247950  114188610
	dd4tm9x82jsxf select * from scott.test where object_id = 2
		2982644947 7B57E160 1344857006
	4x4r899sf34cs select * from scott.test where object_id = 10
		2982644947 7B5DCEC0 1893831064
	SYS@orcl11g> 
	SYS@orcl11g> exec dbms_shared_pool.purge('7B57E160,1344857006','C');
	PL/SQL procedure successfully completed.
	SYS@orcl11g> exec dbms_shared_pool.purge('7B5DCEC0,1893831064','C');
	PL/SQL procedure successfully completed.
	SYS@orcl11g> select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';
	SQL_ID        SQL_TEXT
	------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	PLAN_HASH_VALUE ADDRESS  HASH_VALUE
	--------------- -------- ----------
	4p5f2903cwsa2 select * from scott.test where object_id = 2
		2982644947 7B247950  114188610
	SYS@orcl11g> 

Continue to test the two sql.

	SYS@orcl11g> select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';
	no rows selected
	SYS@orcl11g>
	SYS@orcl11g> select * from scott.test where object_id = 2;
	SYS@orcl11g> select * from scott.test where object_id = 10;	 
	SYS@orcl11g> select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';
	SQL_ID        SQL_TEXT
	------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	PLAN_HASH_VALUE ADDRESS  HASH_VALUE
	--------------- -------- ----------
	dd4tm9x82jsxf select * from scott.test where object_id = 2
		2982644947 7B57E160 1344857006
	4x4r899sf34cs select * from scott.test where object_id = 10
		1357081020 7B5DCEC0 1893831064
	SYS@orcl11g> 

The plan_hash_vale of these two sql are NOT the same now!

	[oracle@databasevm001 ~]$ ora -u system/oracle plan dd4tm9x82jsxf
	PLAN_TABLE_OUTPUT
	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SQL_ID  dd4tm9x82jsxf, child number 0
	-------------------------------------
	select * from scott.test where object_id = 2
	Plan hash value: 2982644947
	-----------------------------------------------------------------------------------------
	| Id  | Operation                   | Name      | Rows  | Bytes | Cost (%CPU)| Time     |
	-----------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT            |           |       |       |     2 (100)|          |
	|   1 |  TABLE ACCESS BY INDEX ROWID| TEST      |    16 |  1536 |     2   (0)| 00:00:01 |
	|*  2 |   INDEX RANGE SCAN          | INDX_TEST |    16 |       |     1   (0)| 00:00:01 |
	-----------------------------------------------------------------------------------------
	Query Block Name / Object Alias (identified by operation id):
	-------------------------------------------------------------
	1 - SEL$1 / TEST@SEL$1
	2 - SEL$1 / TEST@SEL$1
	Predicate Information (identified by operation id):
	---------------------------------------------------
	2 - access("OBJECT_ID"=2)
	Column Projection Information (identified by operation id):
	-----------------------------------------------------------
	1 - "TEST"."OWNER"[VARCHAR2,30], "TEST"."OBJECT_NAME"[VARCHAR2,128],
		"TEST"."SUBOBJECT_NAME"[VARCHAR2,30], "OBJECT_ID"[NUMBER,22],
		"TEST"."DATA_OBJECT_ID"[NUMBER,22], "TEST"."OBJECT_TYPE"[VARCHAR2,19],
		"TEST"."CREATED"[DATE,7], "TEST"."LAST_DDL_TIME"[DATE,7],
		"TEST"."TIMESTAMP"[VARCHAR2,19], "TEST"."STATUS"[VARCHAR2,7],
		"TEST"."TEMPORARY"[VARCHAR2,1], "TEST"."GENERATED"[VARCHAR2,1],
		"TEST"."SECONDARY"[VARCHAR2,1], "TEST"."NAMESPACE"[NUMBER,22],
		"TEST"."EDITION_NAME"[VARCHAR2,30]
	2 - "TEST".ROWID[ROWID,10], "OBJECT_ID"[NUMBER,22]
	[oracle@databasevm001 ~]$ ora -u system/oracle plan 4x4r899sf34cs
	PLAN_TABLE_OUTPUT
	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SQL_ID  4x4r899sf34cs, child number 0
	-------------------------------------
	select * from scott.test where object_id = 10
	Plan hash value: 1357081020
	--------------------------------------------------------------------------
	| Id  | Operation         | Name | Rows  | Bytes | Cost (%CPU)| Time     |
	--------------------------------------------------------------------------
	|   0 | SELECT STATEMENT  |      |       |       |   346 (100)|          |
	|*  1 |  TABLE ACCESS FULL| TEST | 86577 |  8116K|   346   (1)| 00:00:05 |
	--------------------------------------------------------------------------
	Query Block Name / Object Alias (identified by operation id):
	-------------------------------------------------------------
	1 - SEL$1 / TEST@SEL$1
	Predicate Information (identified by operation id):
	---------------------------------------------------
	1 - filter("OBJECT_ID"=10)
	Column Projection Information (identified by operation id):
	-----------------------------------------------------------
	1 - "TEST"."OWNER"[VARCHAR2,30], "TEST"."OBJECT_NAME"[VARCHAR2,128],
		"TEST"."SUBOBJECT_NAME"[VARCHAR2,30], "OBJECT_ID"[NUMBER,22],
		"TEST"."DATA_OBJECT_ID"[NUMBER,22], "TEST"."OBJECT_TYPE"[VARCHAR2,19],
		"TEST"."CREATED"[DATE,7], "TEST"."LAST_DDL_TIME"[DATE,7],
		"TEST"."TIMESTAMP"[VARCHAR2,19], "TEST"."STATUS"[VARCHAR2,7],
		"TEST"."TEMPORARY"[VARCHAR2,1], "TEST"."GENERATED"[VARCHAR2,1],
		"TEST"."SECONDARY"[VARCHAR2,1], "TEST"."NAMESPACE"[NUMBER,22],
		"TEST"."EDITION_NAME"[VARCHAR2,30]
	[oracle@databasevm001 ~]$ 

One was used via "INDEX RANGE SCAN" and the other was used "TABLE ACCESS FULL".

Another think: 

<B> With the Data Skew column, we should evaluatue the following viewpoints to descide to use Bind Variable to avoid the hardparse. </B>

> a. the frequency of the sql execution.

> b. the number of NUM_DISTINCT (value) for the column.


#### Methods to invalidate the existing cursor

No1. Use "no_invalidate=>false" while collecting statistics information.

	exec dbms_stats.gather_table_stats('SCOTT','TEST',method_opt=>'for columns object_id size auto',cascade=>true, no_invalidate => false);

No2. Flush the share pool

	alter system flush shared_pool;

No3. Execute DDL with the table or authorized for the object.

No4. Use dbms_shared_pool to purge the cursor.

	It is the least risky method.


### Use Bind Variable

The test cases:

	SYS@orcl11g> alter system flush shared_pool;
	SYS@orcl11g> select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';

Sql01:

	declare
	v_sql varchar(3000);
	begin
		v_sql := 'select * from scott.test where object_id=:1';
		execute immediate v_sql using 1;
	end;
	/

Sql02:

	declare
	v_sql varchar(3000);
	begin
		v_sql := 'select * from scott.test where object_id=:1';
		execute immediate v_sql using 10;
	end;
	/

These two sql used the the same execute plan.

	SYS@orcl11g> select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';
	SQL_ID        SQL_TEXT
	------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	PLAN_HASH_VALUE ADDRESS  HASH_VALUE
	--------------- -------- ----------
	9sv3f636y1cwu select * from scott.test where object_id=:1
		2982644947 7B493D20 3454055322
	SYS@orcl11g> 

Although the object_id are collected the histogram statistics information, the sql execution are used the same sql plan for the two sql use Bind Variable. Also regarding to the "Bind Peek" is referent the following documents

[Oracle 11g新特性学习之---Oracle 11g bind peek](https://blog.csdn.net/lqx0405/article/details/44776967)

Solution for it:

> No1. In application code level using different sql with hint

Eg.
	if variable = 10 then
		exec 'select /*+ full(TEST) */' * from scott.test where object_id=:1 using variable;
	else
		exec 'select /*+ index(TEST INDX_TEST) */' * from scott.test where object_id=:1 using variable;

> No.2 Use HINT Bindaware

	Oracle 9i就开始引入的BIND PEEK不能解决这个问题，因为只会在第一次硬解析的时候去窥视绑定变量的值。
	
	从ORACLE11G开始引入了ACS的特性，即AdaptiveCursor Sharing自适应游标，它可以共享监视候选查询的执行统计信息，并使相同的查询能够生成和使用不同的绑定值集合的不同执行计划。

AdaptiveCursor Sharing自适应游标01:

	AdaptiveCursor Sharing 特性允许一个使用绑定变量的SQL语句使用多个执行计划。
	对于同一个SQL, 为了得到合适的查询，oracle 会监控使用不同绑定变量的情况，已确保对不同绑定变量值的cursor（执行计划）都是最优的。比如因为数据倾斜的原因对绑定变量值A 使用执行计划A，对绑定变量值B 使用执行计划B。 虽然他们的SQL 是相同的，但执行计划不同。
	AdaptiveCursor Sharing 默认启动的。 不过要注意的是，该特性只有在绑定变量的参数个数不超过14个的情况才有效。

AdaptiveCursor Sharing自适应游标02:
	大概的作用就是在数据库第一次执行一条SQL语句时，做一次硬解析，优化器发现使用绑定变量并在过滤条件上有直方图，它将存储游标的执行统计信息。在下一次使用不同绑定值执行相同SQL进行软解析时，把执行统计信息和存储在游标中的执行统计信息进行比较，来决定是否产生新的执行计划。这些执行统计信息可以在V$SQL_CS_*相关的视图查看。 V$SQL_CS_HISTOGRAM：在执行历史直方图上显示执行统计的分布。 V$SQL_CS_SELECTIVITY：对带绑定变量的过滤条件显示存储在游标中的选择性区域或范围。 V$SQL_CS_STATISTICS：包含数据库收集的执行信息，用来确定是否应该使用BIND_AWARE的游标共享。 另外在V$SQL中增加了IS_BIND_SENSITIVE和IS_BIND_AWARE列，来标识一个游标是否为绑定敏感和是否感知游标共享。

默认自适应游标特性是开启的，参数为：

	_optim_peek_user_binds=TRUE
	_optimizer_adaptive_cursor_sharing=TRUE
	_optimizer_extended_cursor_sharing=UDO
	_optimizer_extended_cursor_sharing_rel=SIMPLE

通过下面SQL查看自适应游标和bind peek参数:

	col name for a50
	col value for a20
	select name,value
	from (select nam.ksppinm name,
	val.KSPPSTVL value,
	val.ksppstdf isdefault
	from sys.x$ksppi nam, sys.x$ksppcv val
	where nam.inst_id = val.inst_id
	and nam.indx = val.indx)
	where name in('_optimizer_adaptive_cursor_sharing',
	'_optimizer_extended_cursor_sharing_rel',
	'_optimizer_extended_cursor_sharing',
	'_optim_peek_user_binds');


防止大量SQL执行计划的可变性引起的不稳定和新特性带来的BUG，一般不建议开启，通常针对指定的SQL语句使用。

Use the following test case using HINT bind_aware to fix the data skew.

	SYS@orcl11g> select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';
	SQL_ID        SQL_TEXT
	------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	PLAN_HASH_VALUE ADDRESS  HASH_VALUE
	--------------- -------- ----------
	9sv3f636y1cwu select * from scott.test where object_id=:1
		2982644947 7B493D20 3454055322
	SYS@orcl11g> 
	SYS@orcl11g> select * from dba_sql_patches;
	no rows selected
	SYS@orcl11g> select sql_fulltext from v$sql where sql_id = '9sv3f636y1cwu' and rownum=1;
	SQL_FULLTEXT
	--------------------------------------------------------------------------------
	select * from scott.test where object_id=:1
	SYS@orcl11g> 

Use sql_patch add BIND_AWARE hint.

Eg.

	+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	declare
		v_sql clob;
	begin
		-- get the sql text
		select sql_fulltext into v_sql from v$sql where sql_id='9sv3f636y1cwu' and rownum=1;
		-- add HINT
		sys.dbms_sqldiag_internal.i_create_patch(sql_text => v_sql,
			hint_text => 'BIND_AWARE',
			name => 'sql_9sv3f636y1cwu');
	end;
	/
	+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Check the sql_batch

	SYS@orcl11g> select * from dba_sql_patches where name = 'sql_9sv3f636y1cwu';
	NAME                           CATEGORY                        SIGNATURE SQL_TEXT                                                                         CREATED               LAST_MODIFIED                                                                DESCRIPTION                                                                                    STATUS    FOR    TASK_ID TASK_EXEC_NAME                 TASK_OBJ_ID TASK_FND_ID TASK_REC_ID
	------------------------------ ------------------------------ ---------- -------------------------------------------------------------------------------- --------------------------------------------------------------------------- --------------------------------------------------------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- -------- --- ---------- ------------------------------ ----------- ----------- -----------
	sql_9sv3f636y1cwu              DEFAULT                        1.1672E+19 select * from scott.test where object_id=:1                                      15-JUN-18 08.08.16.000000 AM                                                   15-JUN-18 08.08.16.000000 AM                                                                                       ENABLED   NO
	SYS@orcl11g> 

After adding sql_patch,test again.

	SYS@orcl11g> alter system flush shared_pool;
	SYS@orcl11g> 
	declare
	v_sql varchar(3000);
	begin
	v_sql := 'select * from scott.test where object_id=:1';
	execute immediate v_sql using 1;
	end;
	7  /

	PL/SQL procedure successfully completed.

	SYS@orcl11g> 
	declare
	v_sql varchar(3000);
	begin
	v_sql := 'select * from scott.test where object_id=:1';
	execute immediate v_sql using 10;
	end;
	7  /

	PL/SQL procedure successfully completed.

	SYS@orcl11g> 
	SYS@orcl11g> select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';
	SQL_ID        SQL_TEXT
	------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	PLAN_HASH_VALUE ADDRESS  HASH_VALUE
	--------------- -------- ----------
	9sv3f636y1cwu select * from scott.test where object_id=:1
		2982644947 7B80D994 3454055322
	9sv3f636y1cwu select * from scott.test where object_id=:1
		1357081020 7B80D994 3454055322
	SYS@orcl11g> 

Eventhough we set the following parameter to NONE/FALSE and test again , the sql_patch is also usefull for the test case.

	alter session set "_OPTIMIZER_EXTENDED_CURSOR_SHARING"=NONE;
	alter session set "_OPTIMIZER_ADAPTIVE_CURSOR_SHARING"=FALSE;
	alter session set "_OPTIMIZER_EXTENDED_CURSOR_SHARING_REL"=NONE;
	alter system flush shared_pool;
	declare
	v_sql varchar(3000);
	begin
		v_sql := 'select * from scott.test where object_id=:1';
		execute immediate v_sql using 1;
	end;
	/

	declare
	v_sql varchar(3000);
	begin
		v_sql := 'select * from scott.test where object_id=:1';
		execute immediate v_sql using 10;
	end;
	/
	select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';
	col name for a50
	col value for a20
	select name,value
	from (select nam.ksppinm name,
	val.KSPPSTVL value,
	val.ksppstdf isdefault
	from sys.x$ksppi nam, sys.x$ksppcv val
	where nam.inst_id = val.inst_id
	and nam.indx = val.indx)
	where name in('_optimizer_adaptive_cursor_sharing',
	'_optimizer_extended_cursor_sharing_rel',
	'_optimizer_extended_cursor_sharing',
	'_optim_peek_user_binds');

If we set _optim_peek_user_binds to false and test again.

	SYS@orcl11g> alter session set "_OPTIM_PEEK_USER_BINDS"=FALSE;
	SYS@orcl11g> 
	col name for a50
	col value for a20
	select name,value
	from (select nam.ksppinm name,
	val.KSPPSTVL value,
	val.ksppstdf isdefault
	from sys.x$ksppi nam, sys.x$ksppcv val
	where nam.inst_id = val.inst_id
	and nam.indx = val.indx)
	where name in('_optimizer_adaptive_cursor_sharing',
	'_optimizer_extended_cursor_sharing_rel',
	'_optimizer_extended_cursor_sharing',
	11  '_optim_peek_user_binds');
	NAME                                               VALUE
	-------------------------------------------------- --------------------
	_optimizer_extended_cursor_sharing                 NONE
	_optimizer_extended_cursor_sharing_rel             NONE
	_optimizer_adaptive_cursor_sharing                 FALSE
	_optim_peek_user_binds                             FALSE
	SYS@orcl11g> 
	SYS@orcl11g> 
	alter system flush shared_pool;
	declare
	v_sql varchar(3000);
	begin
	v_sql := 'select * from scott.test where object_id=:1';
	execute immediate v_sql using 1;
	end;
	/
	declare
	v_sql varchar(3000);
	begin
	v_sql := 'select * from scott.test where object_id=:1';
	System altered.
	execute immediate v_sql using 10;
	PL/SQL procedure successfully completed.
	SYS@orcl11g> SYS@orcl11g>   2    3    4    5    6  end;
	/
	PL/SQL procedure successfully completed.
	SYS@orcl11g> select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';
	SQL_ID        SQL_TEXT
	------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	PLAN_HASH_VALUE ADDRESS  HASH_VALUE
	--------------- -------- ----------
	9sv3f636y1cwu select * from scott.test where object_id=:1
		2982644947 7B80D994 3454055322
	SYS@orcl11g> 

For _optim_peek_user_binds is false, we need to use the following hint_text to ensure the peek bind is OK.

		'OPT_PARAM(''_optim_peek_user_binds'' ''true'') BIND_AWARE'

Re-create sql_patch and test again.

	SYS@orcl11g> exec dbms_sqldiag.drop_sql_patch(name => 'sql_9sv3f636y1cwu');
	PL/SQL procedure successfully completed.
	SYS@orcl11g> 
	SYS@orcl11g> exec dbms_sqldiag.drop_sql_patch(name => 'sql_9sv3f636y1cwu');
	PL/SQL procedure successfully completed.
	declare
	v_sql clob;
	begin
	-- get the sql text
	select sql_fulltext into v_sql from v$sql where sql_id='9sv3f636y1cwu' and rownum=1;
	-- add HINT
	sys.dbms_sqldiag_internal.i_create_patch(sql_text => v_sql,
	hint_text => 'OPT_PARAM(''_optim_peek_user_binds'' ''true'') BIND_AWARE',
	name => 'sql_9sv3f636y1cwu');
	end;
	11  /
	PL/SQL procedure successfully completed.
	SYS@orcl11g> 

Eg sql.

	+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	declare
		v_sql clob;
	begin
		-- get the sql text
		select sql_fulltext into v_sql from v$sql where sql_id='9sv3f636y1cwu' and rownum=1;
		-- add HINT
		sys.dbms_sqldiag_internal.i_create_patch(sql_text => v_sql,
			hint_text => 'OPT_PARAM(''_optim_peek_user_binds'' ''true'') BIND_AWARE',
			name => 'sql_9sv3f636y1cwu');
	end;
	/
	+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Test again:

	alter system flush shared_pool;
	declare
	v_sql varchar(3000);
	begin
		v_sql := 'select * from scott.test where object_id=:1';
		execute immediate v_sql using 1;
	end;
	/

	declare
	v_sql varchar(3000);
	begin
		v_sql := 'select * from scott.test where object_id=:1';
		execute immediate v_sql using 10;
	end;
	/
	select sql_id,sql_text,plan_hash_value,address,hash_value from v$sql where sql_text like 'select * from scott.test where object_id%';
	col name for a50
	col value for a20
	select name,value
	from (select nam.ksppinm name,
	val.KSPPSTVL value,
	val.ksppstdf isdefault
	from sys.x$ksppi nam, sys.x$ksppcv val
	where nam.inst_id = val.inst_id
	and nam.indx = val.indx)
	where name in('_optimizer_adaptive_cursor_sharing',
	'_optimizer_extended_cursor_sharing_rel',
	'_optimizer_extended_cursor_sharing',
	'_optim_peek_user_binds');

The result are the following.

	SQL_ID        SQL_TEXT
	------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	PLAN_HASH_VALUE ADDRESS  HASH_VALUE
	--------------- -------- ----------
	9sv3f636y1cwu select * from scott.test where object_id=:1
		2982644947 7B80D994 3454055322
	9sv3f636y1cwu select * from scott.test where object_id=:1
		1357081020 7B80D994 3454055322

	col value for a20
	select name,value
	from (select nam.ksppinm name,
	val.KSPPSTVL value,
	val.ksppstdf isdefault
	from sys.x$ksppi nam, sys.x$ksppcv val
	where nam.inst_id = val.inst_id
	and nam.indx = val.indx)
	where name in('_optimizer_adaptive_cursor_sharing',
	'_optimizer_extended_cursor_sharing_rel',
	'_optimizer_extended_cursor_sharing',
	11  '_optim_peek_user_binds');

	NAME                                               VALUE
	-------------------------------------------------- --------------------
	_optimizer_extended_cursor_sharing                 NONE
	_optimizer_extended_cursor_sharing_rel             NONE
	_optimizer_adaptive_cursor_sharing                 FALSE
	_optim_peek_user_binds                             FALSE
	SYS@orcl11g> 

> No.3 Use SPM

Use DBMS_SPM.evolve_sql_plan_baseline to envole the baseline.
Use EMCC to do it.

### Others

Case 01. One column is data skew but multiple columns are avg.

Suggestion/eg:

	select * from t1 where a=:1 and b=:2
	CREATE INDEX indx_t1  ON t1 (a, b);

Case 02. Get null result from one column.

Suggestion/eg:
	select * from t1 where a is null;
	The table t1 have a lot of records in column a and have less NULL, if we filter via "where a is null" , we can NOT use the index if the column is null.
	We usually create the index like Case 1. create (a,1) index to enable to use index via 'a is null'.

Case 03. Get != result from one column.
	select * from t1 where a != 1;
	The table t1 have a lot of records(=1) in column a and have less other recoreds.
	If create index on a, it will be executed via Full tablescan.
	If use index hint to execute via hint, it will be executed via index full scan.

eg.

	[oracle@databasevm001 ~]$ ora -u system/oracle plan dxc3ca7rrax8c 
	PLAN_TABLE_OUTPUT
	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SQL_ID  dxc3ca7rrax8c, child number 0
	-------------------------------------
	select /*+ index(t ind01_t1) */ * from scott.t1 t where t.a != 1
	Plan hash value: 2419286119
	----------------------------------------------------------------------------------------
	| Id  | Operation                   | Name     | Rows  | Bytes | Cost (%CPU)| Time     |
	----------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT            |          |       |       |     2 (100)|          |
	|   1 |  TABLE ACCESS BY INDEX ROWID| T1       |     2 |    50 |     2   (0)| 00:00:01 |
	|*  2 |   INDEX FULL SCAN           | IND01_T1 |     1 |       |     1   (0)| 00:00:01 |
	----------------------------------------------------------------------------------------
	Query Block Name / Object Alias (identified by operation id):
	-------------------------------------------------------------
	1 - SEL$1 / T@SEL$1
	2 - SEL$1 / T@SEL$1
	Predicate Information (identified by operation id):
	---------------------------------------------------
	2 - filter("T"."A"<>1)
	Column Projection Information (identified by operation id):
	-----------------------------------------------------------
	1 - "T"."A"[NUMBER,22], "T"."B"[CHARACTER,10]
	2 - "T".ROWID[ROWID,10], "T"."A"[NUMBER,22]
	Note
	-----
	- dynamic sampling used for this statement (level=2)

	[oracle@databasevm001 ~]$ ora -u system/oracle plan ct8wptrnp0nhd
	PLAN_TABLE_OUTPUT
	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SQL_ID  ct8wptrnp0nhd, child number 0
	-------------------------------------
	select * from scott.t1 t where t.a != 1
	Plan hash value: 3617692013
	--------------------------------------------------------------------------
	| Id  | Operation         | Name | Rows  | Bytes | Cost (%CPU)| Time     |
	--------------------------------------------------------------------------
	|   0 | SELECT STATEMENT  |      |       |       |     3 (100)|          |
	|*  1 |  TABLE ACCESS FULL| T1   |     2 |    50 |     3   (0)| 00:00:01 |
	--------------------------------------------------------------------------
	Query Block Name / Object Alias (identified by operation id):
	-------------------------------------------------------------
	1 - SEL$1 / T@SEL$1
	Predicate Information (identified by operation id):
	---------------------------------------------------
	1 - filter("T"."A"<>1)
	Column Projection Information (identified by operation id):
	-----------------------------------------------------------
	1 - "T"."A"[NUMBER,22], "T"."B"[CHARACTER,10]
	Note
	-----
	- dynamic sampling used for this statement (level=2)
	[oracle@databasevm001 ~]$ 	

Suggestion 01:  change the filter to IN(x,y,z) and the sql will use INDEX Range SCAN

	SYS@orcl11g> select * from scott.t1 t where t.a in (2,3);
			A B
	---------- ----------
			2 hhhh
			3 hhhh
	SYS@orcl11g> 
	-----------------------------------------------------------------------------------------
	| Id  | Operation                    | Name     | Rows  | Bytes | Cost (%CPU)| Time     |
	-----------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT             |          |       |       |     2 (100)|          |
	|   1 |  INLIST ITERATOR             |          |       |       |            |          |
	|   2 |   TABLE ACCESS BY INDEX ROWID| T1       |     2 |    50 |     2   (0)| 00:00:01 |
	|*  3 |    INDEX RANGE SCAN          | IND01_T1 |     1 |       |     1   (0)| 00:00:01 |
	-----------------------------------------------------------------------------------------

Suggestioin 02:	Create funcation index for sql.

Eg.

	SYS@orcl11g> create index scott.ind02_t2 on scott.t1(decode(a,1,null,'2'));

	Index created.

	SYS@orcl11g> select * from scott.t1 where decode(a,1,null,'2') = '2';

			A B
	---------- ----------
			2 hhhh
			3 hhhh

	SYS@orcl11g> 
	[oracle@databasevm001 ~]$ ora -u system/oracle plan d2m92c50dybu0
	PLAN_TABLE_OUTPUT
	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SQL_ID  d2m92c50dybu0, child number 0
	-------------------------------------
	select * from scott.t1 where decode(a,1,null,'2') = '2'
	Plan hash value: 2881651339
	----------------------------------------------------------------------------------------
	| Id  | Operation                   | Name     | Rows  | Bytes | Cost (%CPU)| Time     |
	----------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT            |          |       |       |     2 (100)|          |
	|   1 |  TABLE ACCESS BY INDEX ROWID| T1       |     2 |    54 |     2   (0)| 00:00:01 |
	|*  2 |   INDEX RANGE SCAN          | IND02_T2 |     2 |       |     1   (0)| 00:00:01 |
	----------------------------------------------------------------------------------------
	Query Block Name / Object Alias (identified by operation id):
	-------------------------------------------------------------
	1 - SEL$1 / T1@SEL$1
	2 - SEL$1 / T1@SEL$1
	Predicate Information (identified by operation id):
	---------------------------------------------------
	2 - access("T1"."SYS_NC00003$"='2')
	Column Projection Information (identified by operation id):
	-----------------------------------------------------------
	1 - "T1"."A"[NUMBER,22], "T1"."B"[CHARACTER,10]
	2 - "T1".ROWID[ROWID,10], "T1"."SYS_NC00003$"[VARCHAR2,1]
	Note
	-----
	- dynamic sampling used for this statement (level=2)
	[oracle@databasevm001 ~]$ 


### To be continue....


Have a good life! 2018/06 via LinHong
	






