---
layout: post
title: "Oracle 19c AutoIndex Tips"
category: Oracle
tags: Oracle 19c AutoIndex Tips
---

* content
{:toc}

Oracle 19c AutoIndex Tips

Env:

Exa/EE 19c











### Prepare

[Oracle 19c Automatic Indexing](http://www.bigdatalyn.com/2019/02/19/Oracle_19c_AutomaticIndexing_Tips/)

auto index只有云产品和ExadataEE才能使用，测试各种命令可以使用模拟exadata环境去实践这些相关命令

	alter system set "_exadata_feature_on"=true scope=spfile;
	shutdown immediate;
	startup;

auto_index的相关parameter

	[oracle@db1 ~](KKB)$ ora params auto_index

	NAME					      VALUE		   DESCRIPTION
	--------------------------------------------- -------------------- ----------------------------------------------------------------------
	_optimizer_auto_index_allow		      AUTO		   Controls Auto Index
	_optimizer_use_auto_indexes		      AUTO		   Use Auto Index

	[oracle@db1 ~](KKB)$ 

	SYS@KKB> 
	col parameter_name for a40
	col PARAMETER_VALUE for 999999
	col LAST_UPDATED for a30
	col UPDATED_BY for a10
	col PARAMETER_DATA for a30
	set lines 200 pagesize 1000
	SYS@KKB> select * from SMB$CONFIG;

	PARAMETER_NAME				 PARAMETER_VALUE LAST_UPDATED			UPDATED_BY PARAMETER_DATA
	---------------------------------------- --------------- ------------------------------ ---------- ------------------------------
	SPACE_BUDGET_PERCENT				      10
	PLAN_RETENTION_WEEKS				      53
	SPM_TRACING					       0
	AUTO_CAPTURE_PARSING_SCHEMA_NAME		       0					   <filters></filters>
	AUTO_CAPTURE_MODULE				       0					   <filters></filters>
	AUTO_CAPTURE_ACTION				       0					   <filters></filters>
	AUTO_CAPTURE_SQL_TEXT				       0					   <filters></filters>
	AUTO_INDEX_SCHEMA				       0					   <filters></filters>
	AUTO_INDEX_DEFAULT_TABLESPACE			       0
	AUTO_INDEX_SPACE_BUDGET 			      50
	AUTO_INDEX_REPORT_RETENTION			      31
	AUTO_INDEX_RETENTION_FOR_AUTO			       0					   373
	AUTO_INDEX_RETENTION_FOR_MANUAL 		       0
	AUTO_INDEX_MODE 				       0 19-06-18 14:22:40.000000	SYS	   OFF
	_AUTO_INDEX_TRACE				       0
	_AUTO_INDEX_TASK_INTERVAL			     900
	_AUTO_INDEX_TASK_MAX_RUNTIME			    3600
	_AUTO_INDEX_IMPROVEMENT_THRESHOLD		      20
	_AUTO_INDEX_REGRESSION_THRESHOLD		      10
	_AUTO_INDEX_ABSDIFF_THRESHOLD			     100
	_AUTO_INDEX_STS_CAPTURE_TASK			       0 19-06-18 13:29:46.000000	LIN	   ON
	_AUTO_INDEX_CONTROL				       0
	_AUTO_INDEX_DERIVE_STATISTICS			       0					   ON
	_AUTO_INDEX_CONCURRENCY 			       1
	_AUTO_INDEX_SPA_CONCURRENCY			       1
	_AUTO_INDEX_REBUILD_TIME_LIMIT			      30
	_AUTO_INDEX_REBUILD_COUNT_LIMIT 		       5
	_AUTO_INDEX_REVERIFY_TIME			      30
	AUTO_INDEX_COMPRESSION				       0					   OFF
	AUTO_SPM_EVOLVE_TASK				       0					   OFF
	AUTO_SPM_EVOLVE_TASK_INTERVAL			    3600
	AUTO_SPM_EVOLVE_TASK_MAX_RUNTIME		    1800

	32 rows selected.

	SYS@KKB> 
    可以看到 _AUTO_INDEX_TASK_INTERVAL = 900 是15分钟捕获auto index
	
auto index的缺省设置： 根据名称即可大概了解参数的功能,这些参数都需要通过DBMS_AUTO_INDEX去修改

	SYS@KKB> select * from dba_auto_index_config;

	PARAMETER_NAME				 PARAMETER_VALUE      LAST_MODIFIED	   MODIFIED_BY
	---------------------------------------- -------------------- -------------------- --------------------
	AUTO_INDEX_COMPRESSION			 OFF
	AUTO_INDEX_DEFAULT_TABLESPACE
	AUTO_INDEX_MODE 			 OFF
	AUTO_INDEX_REPORT_RETENTION		 31
	AUTO_INDEX_RETENTION_FOR_AUTO		 373
	AUTO_INDEX_RETENTION_FOR_MANUAL
	AUTO_INDEX_SCHEMA
	AUTO_INDEX_SPACE_BUDGET 		 50

	8 rows selected.

	SYS@KKB> 

### Intro

[设置为ON]

	EXEC DBMS_AUTO_INDEX.CONFIGURE('AUTO_INDEX_MODE','IMPLEMENT');

[设置为OFF]

	EXEC DBMS_AUTO_INDEX.CONFIGURE('AUTO_INDEX_MODE','OFF');

[仅生成报告]

	EXEC DBMS_AUTO_INDEX.CONFIGURE('AUTO_INDEX_MODE','REPORT ONLY');


另外需要注意的是通过Automatic Indexing生成的索引，通过命令drop文是删除不了，这就是为什么有上面auto_index的配置参数去删除，如保留多少天（默认 AUTO_INDEX_RETENTION_FOR_AUTO 是373天） 

如下： Can not Drop index sys_ai_xxxxxxxx

	LIN@KKB> select index_name from user_indexes;

	INDEX_NAME
	--------------------------------------------------------------------------------
	SYS_AI_djph6g9pxbyxf
	SYS_AI_829s8wj1jb4y4

	LIN@KKB> drop index SYS_AI_829s8wj1jb4y4;
	drop index SYS_AI_829s8wj1jb4y4
			   *
	ERROR at line 1:
	ORA-01418: specified index does not exist

	LIN@KKB> 

从官方宣传Oracle Auto Index 达到自治功能，也是可以了解到为什么不能手动drop了

	The new Automatic Indexing feature in Oracle Database 19c detects the need for indexes, creates them, and drops them automatically—without DBA intervention.

为什么是373天？ 不清楚......

wiki 解释如下： （这个跟Oracle有啥关系？不懂...😜）

https://en.wikipedia.org/wiki/300_(number)

	373
	373, prime number, balanced prime,[42] sum of five consecutive primes (67 + 71 + 73 + 79 + 83), permutable prime with 337 and 733, palindromic prime in 3 consecutive bases: 5658 = 4549 = 37310 and also in base 4: 113114, two-sided primes. 

而自动索引可以通过使用索引的invisible和unusable去控制和参数去控制保留时间

### Practise

实验：(数据量可以根据个人测试环境调整)

	SYS@KKB> create user lin identified by oracle;

	User created.

	SYS@KKB> grant dba to lin;

	Grant succeeded.

	SYS@KKB> conn lin/oracle
	Connected.

	LIN@KKB> create table test_ai as select * from dba_objects;

	Table created.

	LIN@KKB> insert into test_ai select * from test_ai;

	23243 rows created.

	LIN@KKB> insert into test_ai select * from test_ai;

	46486 rows created.

	LIN@KKB> 
	~重复插入N次~
	
	LIN@KKB> select count(*) from test_ai;

	  COUNT(*)
	----------
	  47601664

	LIN@KKB> 
	
	LIN@KKB> update test_ai set object_id=rownum;

	47601664 rows updated.

	LIN@KKB> commit;

	Commit complete.

	LIN@KKB> 
	上面dml可以开并行，速度比较快...
	

大概有6Gd多的数据

	[oracle](KKB)$ ora segsize lin

	TABLESPACE_NAME 	       SEGMENT_NAME				   SIZE_MB
	------------------------------ ---------------------------------------- ----------
	USERS			       TEST_AI[Tab]				      6229

	[oracle](KKB)$ 

查看和设置

	LIN@KKB> select * from dba_auto_index_config;

	PARAMETER_NAME				 PARAMETER_VALUE      LAST_MODIFIED	   MODIFIED_BY
	---------------------------------------- -------------------- -------------------- --------------------
	AUTO_INDEX_COMPRESSION			 OFF
	AUTO_INDEX_DEFAULT_TABLESPACE
	AUTO_INDEX_MODE 			 OFF					########## 默认参数是没有打开，这个也可以设置成schema级别的开关
	AUTO_INDEX_REPORT_RETENTION		 31
	AUTO_INDEX_RETENTION_FOR_AUTO		 373
	AUTO_INDEX_RETENTION_FOR_MANUAL
	AUTO_INDEX_SCHEMA
	AUTO_INDEX_SPACE_BUDGET 		 50

	8 rows selected.

	LIN@KKB> EXEC DBMS_AUTO_INDEX.CONFIGURE('AUTO_INDEX_MODE','IMPLEMENT');

	PL/SQL procedure successfully completed.

	LIN@KKB> select * from dba_auto_index_config;

	PARAMETER_NAME				 PARAMETER_VALUE      LAST_MODIFIED	   MODIFIED_BY
	---------------------------------------- -------------------- -------------------- --------------------
	AUTO_INDEX_COMPRESSION			 OFF
	AUTO_INDEX_DEFAULT_TABLESPACE
	AUTO_INDEX_MODE 			 IMPLEMENT	      19-06-18 12:50:25.00 LIN
									  0000

	AUTO_INDEX_REPORT_RETENTION		 31
	AUTO_INDEX_RETENTION_FOR_AUTO		 373
	AUTO_INDEX_RETENTION_FOR_MANUAL
	AUTO_INDEX_SCHEMA
	AUTO_INDEX_SPACE_BUDGET 		 50

	8 rows selected.
	
	LIN@KKB> exec dbms_auto_index.configure('auto_index_mode','report only');

	PL/SQL procedure successfully completed.

	LIN@KKB> select * from dba_auto_index_config;

	PARAMETER_NAME				 PARAMETER_VALUE      LAST_MODIFIED	   MODIFIED_BY
	---------------------------------------- -------------------- -------------------- --------------------
	AUTO_INDEX_COMPRESSION			 OFF
	AUTO_INDEX_DEFAULT_TABLESPACE
	AUTO_INDEX_MODE 			 REPORT ONLY	      19-06-18 12:52:19.00 LIN
									  0000

	AUTO_INDEX_REPORT_RETENTION		 31
	AUTO_INDEX_RETENTION_FOR_AUTO		 373
	AUTO_INDEX_RETENTION_FOR_MANUAL
	AUTO_INDEX_SCHEMA
	AUTO_INDEX_SPACE_BUDGET 		 50

	8 rows selected.

	LIN@KKB> 
	
	上面设置为Report Only,表示只是生成自动索引创建的日志报告，并不自动生成自动索引，可以通过 dba_auto_index_statistics 视图查看自动索引日志报告中自动索引是否创建了
	
	关于DBMS_AUTO_INDEX的使用可以通过下面参考传入需要哪些变量
	
	LIN@KKB> desc DBMS_AUTO_INDEX
	PROCEDURE CONFIGURE
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 PARAMETER_NAME 		VARCHAR2		IN
	 PARAMETER_VALUE		VARCHAR2		IN
	 ALLOW				BOOLEAN 		IN     DEFAULT
	PROCEDURE DROP_SECONDARY_INDEXES
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 OWNNAME			VARCHAR2		IN     DEFAULT
	 TABNAME			VARCHAR2		IN     DEFAULT
	FUNCTION REPORT_ACTIVITY RETURNS CLOB
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 ACTIVITY_START 		TIMESTAMP WITH TIME ZONE IN	DEFAULT
	 ACTIVITY_END			TIMESTAMP WITH TIME ZONE IN	DEFAULT
	 TYPE				VARCHAR2		IN     DEFAULT
	 SECTION			VARCHAR2		IN     DEFAULT
	 LEVEL				VARCHAR2		IN     DEFAULT
	FUNCTION REPORT_LAST_ACTIVITY RETURNS CLOB
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 TYPE				VARCHAR2		IN     DEFAULT
	 SECTION			VARCHAR2		IN     DEFAULT
	 LEVEL				VARCHAR2		IN     DEFAULT

	LIN@KKB> 

	LIN@KKB> select object_name from test_ai where object_id=10000;
	LIN@KKB> select object_name from test_ai where object_id=100000;
	LIN@KKB> select object_id,object_name,object_type from test_ai where object_id = '9527';

	LIN@KKB> select * from dba_auto_index_executions;

	no rows selected

	LIN@KKB> 
	
	一开始上面是没有结果的，经过几分钟之后就有如下结果（15分钟）
	
	LIN@KKB> col EXECUTION_NAME for a35
	LIN@KKB> col EXECUTION_START for a10
	LIN@KKB> col EXECUTION_END for a10
	LIN@KKB> col ERROR_MESSAGE for a20
	LIN@KKB> col STATUS for a10
	LIN@KKB> select * from dba_auto_index_executions;

	EXECUTION_NAME				 EXECUTION_ EXECUTION_ ERROR_MESSAGE	    STATUS
	---------------------------------------- ---------- ---------- -------------------- ----------
	SYS_AI_2019-06-18/13:05:26		 19-06-18   19-06-18			    COMPLETED

	LIN@KKB>
	LIN@KKB> col STAT_NAME for a30
	LIN@KKB> select * from dba_auto_index_statistics where execution_name='SYS_AI_2019-06-18/13:05:26';

	EXECUTION_NAME				 STAT_NAME			     VALUE
	---------------------------------------- ------------------------------ ----------
	SYS_AI_2019-06-18/13:05:26		 Index candidates			 0
	SYS_AI_2019-06-18/13:05:26		 Indexes created (visible)		 0
	SYS_AI_2019-06-18/13:05:26		 Indexes created (invisible)		 0
	SYS_AI_2019-06-18/13:05:26		 Indexes dropped			 0
	SYS_AI_2019-06-18/13:05:26		 Space used in bytes			 0
	SYS_AI_2019-06-18/13:05:26		 Space reclaimed in bytes		 0
	SYS_AI_2019-06-18/13:05:26		 SQL statements verified		 0
	SYS_AI_2019-06-18/13:05:26		 SQL statements improved		 0
	SYS_AI_2019-06-18/13:05:26		 SQL statements managed by SPM		 0
	SYS_AI_2019-06-18/13:05:26		 SQL plan baselines created		 0
	SYS_AI_2019-06-18/13:05:26		 Improvement percentage 		 0

	11 rows selected.

	LIN@KKB> 
	LIN@KKB> select * from dba_auto_index_ind_actions;

	no rows selected

	LIN@KKB> select * from dba_indexes where table_name = 'TEST_AI';

	no rows selected

	LIN@KKB> 
	
	并没有创建auto_index，因为开始我们只是设置为report only
	
	select * from dba_advisor_tasks where owner='LIN' order by task_id;
	
	declare
	  report clob := null;
	begin
	  report := DBMS_AUTO_INDEX.REPORT_ACTIVITY (
				  activity_start => TO_TIMESTAMP('2019-06-18 13:00:00', 'YYYY-MM-DD hh24:mi:ss'),
				  activity_end   => TO_TIMESTAMP('2019-06-18 14:00:00', 'YYYY-MM-DD hh24:mi:ss'),
				  type           => 'TEXT',
				  section        => 'SUMMARY',
				  level          => 'BASIC');
	  dbms_output.put_line(report);
	end;
	/
	
	LIN@KKB> select * from dba_auto_index_config;

	PARAMETER_NAME				 PARAMETER_VALUE      LAST_MODIFIED	   MODIFIED_BY
	---------------------------------------- -------------------- -------------------- --------------------
	AUTO_INDEX_COMPRESSION			 OFF
	AUTO_INDEX_DEFAULT_TABLESPACE
	AUTO_INDEX_MODE 			 REPORT ONLY	      19-06-18 12:52:19.00 LIN
									  0000

	AUTO_INDEX_REPORT_RETENTION		 31
	AUTO_INDEX_RETENTION_FOR_AUTO		 373
	AUTO_INDEX_RETENTION_FOR_MANUAL
	AUTO_INDEX_SCHEMA
	AUTO_INDEX_SPACE_BUDGET 		 50

	8 rows selected.

	LIN@KKB> EXEC DBMS_AUTO_INDEX.CONFIGURE('AUTO_INDEX_MODE','IMPLEMENT');

	PL/SQL procedure successfully completed.

	LIN@KKB> 
	
	执行完IMPLEMENT之后查看 dba_auto_index_ind_actions
	
	LIN@KKB> select * from DBA_AUTO_INDEX_EXECUTIONS order by 1 desc;

	EXECUTION_NAME				 EXECUTION_ EXECUTION_ ERROR_MESSAGE	    STATUS
	---------------------------------------- ---------- ---------- -------------------- ----------
	SYS_AI_2019-06-18/13:20:37		 19-06-18   19-06-18			    COMPLETED
	SYS_AI_2019-06-18/13:05:26		 19-06-18   19-06-18			    COMPLETED

	LIN@KKB> 
	LIN@KKB> select * from dba_auto_index_statistics where execution_name='SYS_AI_2019-06-18/13:05:26';

	EXECUTION_NAME				 STAT_NAME			     VALUE
	---------------------------------------- ------------------------------ ----------
	SYS_AI_2019-06-18/13:05:26		 Index candidates			 0
	SYS_AI_2019-06-18/13:05:26		 Indexes created (visible)		 0
	SYS_AI_2019-06-18/13:05:26		 Indexes created (invisible)		 0
	SYS_AI_2019-06-18/13:05:26		 Indexes dropped			 0
	SYS_AI_2019-06-18/13:05:26		 Space used in bytes			 0
	SYS_AI_2019-06-18/13:05:26		 Space reclaimed in bytes		 0
	SYS_AI_2019-06-18/13:05:26		 SQL statements verified		 0
	SYS_AI_2019-06-18/13:05:26		 SQL statements improved		 0
	SYS_AI_2019-06-18/13:05:26		 SQL statements managed by SPM		 0
	SYS_AI_2019-06-18/13:05:26		 SQL plan baselines created		 0
	SYS_AI_2019-06-18/13:05:26		 Improvement percentage 		 0

	11 rows selected.

	之前创建自动索引日志报告中的，value都是0，而第二次由于设置模式为：IMPLEMENT 结果如下：
	
	LIN@KKB> select * from dba_auto_index_statistics where execution_name='SYS_AI_2019-06-18/13:20:37';

	EXECUTION_NAME				 STAT_NAME			     VALUE
	---------------------------------------- ------------------------------ ----------
	SYS_AI_2019-06-18/13:20:37		 Index candidates			 7
	SYS_AI_2019-06-18/13:20:37		 Indexes created (visible)		 1
	SYS_AI_2019-06-18/13:20:37		 Indexes created (invisible)		 0
	SYS_AI_2019-06-18/13:20:37		 Indexes dropped			 0
	SYS_AI_2019-06-18/13:20:37		 Space used in bytes		 934281216
	SYS_AI_2019-06-18/13:20:37		 Space reclaimed in bytes		 0
	SYS_AI_2019-06-18/13:20:37		 SQL statements verified		 3
	SYS_AI_2019-06-18/13:20:37		 SQL statements improved		 3
	SYS_AI_2019-06-18/13:20:37		 SQL statements managed by SPM		 0
	SYS_AI_2019-06-18/13:20:37		 SQL plan baselines created		 0
	SYS_AI_2019-06-18/13:20:37		 Improvement percentage 	       100

	11 rows selected.

	LIN@KKB> 
	
	上面最近一次自动创建了index 的结果：index是valid和visible的
	
	LIN@KKB> select table_owner,table_name,index_name,status,visibility,auto from dba_indexes where table_name = 'TEST_AI';

	TABLE_OWNE TABLE_NAME INDEX_NAME			       STATUS	  VISIBILITY		      AUTO
	---------- ---------- ---------------------------------------- ---------- --------------------------- ---------
	LIN	   TEST_AI    SYS_AI_djph6g9pxbyxf		       VALID	  VISIBLE		      YES

	LIN@KKB> 
	SELECT table_name,table_owner,index_name,command,statement FROM dba_auto_index_ind_actions ORDER BY  end_time;
	TABLE_NAME TABLE_OWNE INDEX_NAME			       COMMAND	  STATEMENT	       END_TIME
	---------- ---------- ---------------------------------------- ---------- -------------------- ----------
	TEST_AI    LIN	      SYS_AI_djph6g9pxbyxf		       CREATE IND CREATE INDEX "LIN"." 19-06-18
									   EX	  SYS_AI_djph6g9pxbyxf
										  "   ON "LIN"."TEST_A
										  I"("OBJECT_ID") TABL

	TEST_AI    LIN	      SYS_AI_djph6g9pxbyxf		       REBUILD IN ALTER INDEX "LIN"."S 19-06-18
									   DEX	  YS_AI_djph6g9pxbyxf"
											 REBUILD  ONLINE

	TEST_AI    LIN	      SYS_AI_djph6g9pxbyxf		       ALTER INDE ALTER INDEX "LIN"."S 19-06-18
									   X VISIBLE  YS_AI_djph6g9pxbyxf"
											 VISIBLE

	3 rows selected.

	LIN@KKB> 
	
	创建过程如上，说明已经自动创建和rebuild并让index可见(visible)了
	
	LIN@KKB> set autot on exp
	LIN@KKB> select object_id,object_name,object_type from test_ai where object_id = '9527';

	 OBJECT_ID OBJECT_NAME																						    OBJECT_TYPE
	---------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ ---------------------------------------------------------------------
		  9527 LOGMNR_TABPART$																					    TABLE


	Execution Plan
	----------------------------------------------------------
	Plan hash value: 677603199

	------------------------------------------------------------------------------------------------------------
	| Id  | Operation			    | Name		   | Rows  | Bytes | Cost (%CPU)| Time	   |
	------------------------------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT		    |			   |  2048 |   184K|	41   (0)| 00:00:01 |
	|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| TEST_AI		   |  2048 |   184K|	41   (0)| 00:00:01 |
	|*  2 |   INDEX RANGE SCAN		    | SYS_AI_djph6g9pxbyxf |  2048 |	   |	 7   (0)| 00:00:01 |
	------------------------------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   2 - access("OBJECT_ID"=9527)

	Note
	-----
	   - dynamic statistics used: statistics for conventional DML

	LIN@KKB> 

	LIN@KKB> select DBMS_AUTO_INDEX.REPORT_LAST_ACTIVITY('TEXT','ALL','ALL') from dual;

	DBMS_AUTO_INDEX.REPORT_LAST_ACTIVITY('TEXT','ALL','ALL')
	--------------------------------------------------------------------------------
	GENERAL INFORMATION
	----------------------------------------
	--------------------

	LIN@KKB>
	
	最后想看auto index报告，既然没有output...原因是output内容需要格式化下
	
	参考如下命令：
	
	set linesize 300 trims on pagesize 1000 long 100000
	col report for a300
	SELECT dbms_auto_index.report_activity(sysdate-30, -- 开始时间（过去30天）
												null,       -- 结束时间
												'text',     -- 报告种类 (TEXT,HTML,XML)
												'all',      -- 出力报告内容 (ALL,SUMMARY,INDEX_DETAILS,VERIFICATION_DETAILS,ERRORS)
												'all')     -- Level (BASIC,TYPICAL,ALL)
												report FROM dual;
											
											
	示例：
	LIN@KKB> set linesize 300 trims on pagesize 1000 long 100000
	LIN@KKB> col report for a300
	SELECT dbms_auto_index.report_activity(sysdate-30, -- 开始时间
												null,       -- 结束时间
												'text',     -- 报告种类 (TEXT,HTML,XML)
												'all',      -- 出力报告内容 (ALL,SUMMARY,INDEX_DETAILS,VERIFICATION_DETAILS,ERRORS)
												'all')     -- Level (BASIC,TYPICAL,ALL)
	  6                                              report FROM dual;

	REPORT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	GENERAL INFORMATION
	-------------------------------------------------------------------------------
	 Activity start 	      : 19-MAY-2019 15:12:26
	 Activity end		      : 18-JUN-2019 15:12:26
	 Executions completed	      : 5
	 Executions interrupted       : 0
	 Executions with fatal error  : 0
	-------------------------------------------------------------------------------

	SUMMARY (AUTO INDEXES)
	-------------------------------------------------------------------------------
	 Index candidates			       : 7
	 Indexes created (visible / invisible)	       : 1 (1 / 0)
	 Space used (visible / invisible)	       : 934.28 MB (934.28 MB / 0 B)
	 Indexes dropped			       : 0
	 SQL statements verified		       : 3
	 SQL statements improved (improvement factor)  : 3 (788478x)
	 SQL plan baselines created		       : 0
	 Overall improvement factor		       : 788478x
	-------------------------------------------------------------------------------

	SUMMARY (MANUAL INDEXES)
	-------------------------------------------------------------------------------
	 Unused indexes    : 0
	 Space used	   : 0 B
	 Unusable indexes  : 0
	-------------------------------------------------------------------------------

	INDEX DETAILS
	-------------------------------------------------------------------------------
	1. The following indexes were created:
	*: invisible
	-------------------------------------------------------------------------------
	----------------------------------------------------------------------------
	| Owner | Table   | Index		 | Key	     | Type   | Properties |
	----------------------------------------------------------------------------
	| LIN	| TEST_AI | SYS_AI_djph6g9pxbyxf | OBJECT_ID | B-TREE | NONE	   |
	----------------------------------------------------------------------------
	-------------------------------------------------------------------------------

	VERIFICATION DETAILS
	-------------------------------------------------------------------------------
	1. The performance of the following statements improved:
	-------------------------------------------------------------------------------
	 Parsing Schema Name  : LIN
	 SQL ID 	      : 19sjp5qzdh3kw
	 SQL Text	      : select object_name from test_ai where object_id=100000
	 Improvement Factor   : 788478x

	Execution Statistics:
	-----------------------------
				Original Plan		  Auto Index Plan
				----------------------------  ----------------------------
	 Elapsed Time (s):  2177643			  5130
	 CPU Time (s):	    2170198			  906
	 Buffer Gets:	    788478			  4
	 Optimizer Cost:    9888			  41
	 Disk Reads:	    0				  2
	 Direct Writes:     0				  0
	 Rows Processed:    1				  1
	 Executions:	    1				  1


	PLANS SECTION
	---------------------------------------------------------------------------------------------

	- Original
	-----------------------------
	 Plan Hash Value  : 2605930645

	--------------------------------------------------------------------------------
	| Id | Operation		   | Name    | Rows | Bytes  | Cost | Time     |
	--------------------------------------------------------------------------------
	|  0 | SELECT STATEMENT 	   |	     |	    |	     | 9888 |	       |
	|  1 |	 TABLE ACCESS STORAGE FULL | TEST_AI | 2048 | 161792 | 9888 | 00:00:01 |
	--------------------------------------------------------------------------------

	Notes
	-----
	- optimizer_use_stats_on_conventional_dml = yes


	- With Auto Indexes
	-----------------------------
	 Plan Hash Value  : 677603199

	-------------------------------------------------------------------------------------------------------
	| Id  | Operation			      | Name		     | Rows | Bytes | Cost | Time     |
	-------------------------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT		      | 		     |	  8 |	632 |	41 | 00:00:01 |
	|   1 |   TABLE ACCESS BY INDEX ROWID BATCHED | TEST_AI 	     |	  8 |	632 |	41 | 00:00:01 |
	| * 2 |    INDEX RANGE SCAN		      | SYS_AI_djph6g9pxbyxf | 2048 |	    |	 7 | 00:00:01 |
	-------------------------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	------------------------------------------
	* 2 - access("OBJECT_ID"=100000)


	Notes
	-----
	- optimizer_use_stats_on_conventional_dml = yes
	- Dynamic sampling used for this statement ( level = 11 )


	-------------------------------------------------------------------------------
	 Parsing Schema Name  : LIN
	 SQL ID 	      : 1g75s9x02awtw
	 SQL Text	      : select object_id,object_name,object_type from test_ai
				  where object_id = '9527'
	 Improvement Factor   : 788478x

	Execution Statistics:
	-----------------------------
				Original Plan		  Auto Index Plan
				----------------------------  ----------------------------
	 Elapsed Time (s):  2026089			  760
	 CPU Time (s):	    2020001			  760
	 Buffer Gets:	    788478			  4
	 Optimizer Cost:    9888			  41
	 Disk Reads:	    0				  1
	 Direct Writes:     0				  0
	 Rows Processed:    1				  1
	 Executions:	    1				  1


	PLANS SECTION
	---------------------------------------------------------------------------------------------

	- Original
	-----------------------------
	 Plan Hash Value  : 2605930645

	--------------------------------------------------------------------------------
	| Id | Operation		   | Name    | Rows | Bytes  | Cost | Time     |
	--------------------------------------------------------------------------------
	|  0 | SELECT STATEMENT 	   |	     |	    |	     | 9888 |	       |
	|  1 |	 TABLE ACCESS STORAGE FULL | TEST_AI | 2048 | 188416 | 9888 | 00:00:01 |
	--------------------------------------------------------------------------------

	Notes
	-----
	- optimizer_use_stats_on_conventional_dml = yes


	- With Auto Indexes
	-----------------------------
	 Plan Hash Value  : 677603199

	--------------------------------------------------------------------------------------------------------
	| Id  | Operation			      | Name		     | Rows | Bytes  | Cost | Time     |
	--------------------------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT		      | 		     | 2048 | 188416 |	 41 | 00:00:01 |
	|   1 |   TABLE ACCESS BY INDEX ROWID BATCHED | TEST_AI 	     | 2048 | 188416 |	 41 | 00:00:01 |
	| * 2 |    INDEX RANGE SCAN		      | SYS_AI_djph6g9pxbyxf | 2048 |	     |	  7 | 00:00:01 |
	--------------------------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	------------------------------------------
	* 2 - access("OBJECT_ID"=9527)


	Notes
	-----
	- optimizer_use_stats_on_conventional_dml = yes
	- Dynamic sampling used for this statement ( level = 11 )


	-------------------------------------------------------------------------------
	 Parsing Schema Name  : LIN
	 SQL ID 	      : 9tw2443v2ud2t
	 SQL Text	      : select object_name from test_ai where object_id=10000
	 Improvement Factor   : 788478x

	Execution Statistics:
	-----------------------------
				Original Plan		  Auto Index Plan
				----------------------------  ----------------------------
	 Elapsed Time (s):  3608067			  996
	 CPU Time (s):	    3072693			  256
	 Buffer Gets:	    788478			  4
	 Optimizer Cost:    9888			  41
	 Disk Reads:	    42388			  7
	 Direct Writes:     0				  0
	 Rows Processed:    1				  1
	 Executions:	    1				  1


	PLANS SECTION
	---------------------------------------------------------------------------------------------

	- Original
	-----------------------------
	 Plan Hash Value  : 2605930645

	--------------------------------------------------------------------------------
	| Id | Operation		   | Name    | Rows | Bytes  | Cost | Time     |
	--------------------------------------------------------------------------------
	|  0 | SELECT STATEMENT 	   |	     |	    |	     | 9888 |	       |
	|  1 |	 TABLE ACCESS STORAGE FULL | TEST_AI | 2048 | 161792 | 9888 | 00:00:01 |
	--------------------------------------------------------------------------------

	Notes
	-----
	- optimizer_use_stats_on_conventional_dml = yes


	- With Auto Indexes
	-----------------------------
	 Plan Hash Value  : 677603199

	-------------------------------------------------------------------------------------------------------
	| Id  | Operation			      | Name		     | Rows | Bytes | Cost | Time     |
	-------------------------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT		      | 		     |	  4 |	316 |	41 | 00:00:01 |
	|   1 |   TABLE ACCESS BY INDEX ROWID BATCHED | TEST_AI 	     |	  4 |	316 |	41 | 00:00:01 |
	| * 2 |    INDEX RANGE SCAN		      | SYS_AI_djph6g9pxbyxf | 2048 |	    |	 7 | 00:00:01 |
	-------------------------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	------------------------------------------
	* 2 - access("OBJECT_ID"=10000)


	Notes
	-----
	- optimizer_use_stats_on_conventional_dml = yes
	- Dynamic sampling used for this statement ( level = 11 )


	-------------------------------------------------------------------------------
	-------------------------------------------------------------------------------

	ERRORS
	---------------------------------------------------------------------------------------------
	No errors found.
	---------------------------------------------------------------------------------------------


	LIN@KKB> 
     
	可以很清楚看到性能提升部分说明：1. The performance of the following statements improved: 
	Original Plan	到 Auto Index Plan的变化带来有哪些变化，执行计划有哪些变化等

	LIN@KKB> exec dbms_auto_index.drop_secondary_indexes('LIN','TEST_AI');

	PL/SQL procedure successfully completed.

	LIN@KKB> 

### Test trace Auto Index

通过设置SMB$CONFIG一些参数可以trace 创建auto index的一些过程(后台j000进程继续捕获和创建.)

	SYS@KKB> select * from SMB$CONFIG;

	PARAMETER_NAME				 PARAMETER_VALUE LAST_UPDATED			UPDATED_BY PARAMETER_DATA
	---------------------------------------- --------------- ------------------------------ ---------- ------------------------------
	SPACE_BUDGET_PERCENT				      10
	PLAN_RETENTION_WEEKS				      53
	SPM_TRACING					       0
	AUTO_CAPTURE_PARSING_SCHEMA_NAME		       0					   <filters></filters>
	AUTO_CAPTURE_MODULE				       0					   <filters></filters>
	AUTO_CAPTURE_ACTION				       0					   <filters></filters>
	AUTO_CAPTURE_SQL_TEXT				       0					   <filters></filters>
	AUTO_INDEX_SCHEMA				       0					   <filters></filters>
	AUTO_INDEX_DEFAULT_TABLESPACE			       0
	AUTO_INDEX_SPACE_BUDGET 			      50
	AUTO_INDEX_REPORT_RETENTION			      31
	AUTO_INDEX_RETENTION_FOR_AUTO			       0					   373
	AUTO_INDEX_RETENTION_FOR_MANUAL 		       0
	AUTO_INDEX_MODE 				       0 19-06-18 14:22:40.000000	SYS	   OFF
	_AUTO_INDEX_TRACE				       0
	_AUTO_INDEX_TASK_INTERVAL			     900
	_AUTO_INDEX_TASK_MAX_RUNTIME			    3600
	_AUTO_INDEX_IMPROVEMENT_THRESHOLD		      20
	_AUTO_INDEX_REGRESSION_THRESHOLD		      10
	_AUTO_INDEX_ABSDIFF_THRESHOLD			     100
	_AUTO_INDEX_STS_CAPTURE_TASK			       0 19-06-18 13:29:46.000000	LIN	   ON
	_AUTO_INDEX_CONTROL				       0
	_AUTO_INDEX_DERIVE_STATISTICS			       0					   ON
	_AUTO_INDEX_CONCURRENCY 			       1
	_AUTO_INDEX_SPA_CONCURRENCY			       1
	_AUTO_INDEX_REBUILD_TIME_LIMIT			      30
	_AUTO_INDEX_REBUILD_COUNT_LIMIT 		       5
	_AUTO_INDEX_REVERIFY_TIME			      30
	AUTO_INDEX_COMPRESSION				       0					   OFF
	AUTO_SPM_EVOLVE_TASK				       0					   OFF
	AUTO_SPM_EVOLVE_TASK_INTERVAL			    3600
	AUTO_SPM_EVOLVE_TASK_MAX_RUNTIME		    1800

	32 rows selected.

	SYS@KKB>
	SYS@KKB> update SMB$CONFIG set PARAMETER_VALUE=2 where PARAMETER_NAME='_AUTO_INDEX_TRACE';

	1 row updated.

	SYS@KKB> commit;
	Commit complete.

	为什么设置成2？ 我觉得应该是跟 SQL Plan Management Tracing 的级别一样，参考如下：
	
	DEBUG_TRC_OFF = 0
	DEBUG_TRC_FILE = 1
	DEBUG_TRC_ALERT_LOG = 2
	DEBUG_TRC_ALERT_TIMESTAMP = 4
	DEBUG_TRC_ERROR_STACK = 8
	DEBUG_TRC_TERM_OUTPUT = 16
	DEBUG_TRC_V2PHV CONSTANT = 32
	

	SYS@KKB> select * from SMB$CONFIG;

	PARAMETER_NAME				 PARAMETER_VALUE LAST_UPDATED			UPDATED_BY PARAMETER_DATA
	---------------------------------------- --------------- ------------------------------ ---------- ------------------------------
	SPACE_BUDGET_PERCENT				      10
	PLAN_RETENTION_WEEKS				      53
	SPM_TRACING					       0
	AUTO_CAPTURE_PARSING_SCHEMA_NAME		       0					   <filters></filters>
	AUTO_CAPTURE_MODULE				       0					   <filters></filters>
	AUTO_CAPTURE_ACTION				       0					   <filters></filters>
	AUTO_CAPTURE_SQL_TEXT				       0					   <filters></filters>
	AUTO_INDEX_SCHEMA				       0					   <filters></filters>
	AUTO_INDEX_DEFAULT_TABLESPACE			       0
	AUTO_INDEX_SPACE_BUDGET 			      50
	AUTO_INDEX_REPORT_RETENTION			      31
	AUTO_INDEX_RETENTION_FOR_AUTO			       0					   373
	AUTO_INDEX_RETENTION_FOR_MANUAL 		       0
	AUTO_INDEX_MODE 				       0 19-06-18 14:22:40.000000	SYS	   OFF
	_AUTO_INDEX_TRACE				       2
	_AUTO_INDEX_TASK_INTERVAL			     900
	_AUTO_INDEX_TASK_MAX_RUNTIME			    3600
	_AUTO_INDEX_IMPROVEMENT_THRESHOLD		      20
	_AUTO_INDEX_REGRESSION_THRESHOLD		      10
	_AUTO_INDEX_ABSDIFF_THRESHOLD			     100
	_AUTO_INDEX_STS_CAPTURE_TASK			       0 19-06-18 13:29:46.000000	LIN	   ON
	_AUTO_INDEX_CONTROL				       0
	_AUTO_INDEX_DERIVE_STATISTICS			       0					   ON
	_AUTO_INDEX_CONCURRENCY 			       1
	_AUTO_INDEX_SPA_CONCURRENCY			       1
	_AUTO_INDEX_REBUILD_TIME_LIMIT			      30
	_AUTO_INDEX_REBUILD_COUNT_LIMIT 		       5
	_AUTO_INDEX_REVERIFY_TIME			      30
	AUTO_INDEX_COMPRESSION				       0					   OFF
	AUTO_SPM_EVOLVE_TASK				       0					   OFF
	AUTO_SPM_EVOLVE_TASK_INTERVAL			    3600
	AUTO_SPM_EVOLVE_TASK_MAX_RUNTIME		    1800

	32 rows selected.

	SYS@KKB> 

	SYS@KKB> conn lin/oracle

	LIN@KKB> create table test_obj_ai as select * from dba_objects;

	Table created.

	LIN@KKB> insert into test_obj_ai select * from dba_objects;

	23266 rows created.

	LIN@KKB> insert into test_obj_ai select * from dba_objects;

	23266 rows created.

	LIN@KKB> insert into test_obj_ai select * from dba_objects;

	23266 rows created.

	LIN@KKB> insert into test_obj_ai select * from dba_objects;

	23266 rows created.

	LIN@KKB> insert into test_obj_ai select * from dba_objects;

	23266 rows created.

	LIN@KKB> commit;

	Commit complete.

	LIN@KKB> 

	LIN@KKB> update test_obj_ai set object_id=rownum;

	139595 rows updated.

	LIN@KKB> commit;

	Commit complete.

	LIN@KKB> select table_owner,table_name,index_name,status,visibility,auto from dba_indexes where table_name = 'TEST_OBJ_AI';

	no rows selected

	LIN@KKB> 

	LIN@KKB> col PARAMETER_NAME for a40
	LIN@KKB> col PARAMETER_VALUE for a10
	LIN@KKB> col LAST_MODIFIED for a50
	LIN@KKB> col MODIFIED_BY for a10
	LIN@KKB> col AUTO_INDEX_COMPRESSION for a10
	LIN@KKB> select * from dba_auto_index_config;

	PARAMETER_NAME				 PARAMETER_ LAST_MODIFIED				       MODIFIED_B
	---------------------------------------- ---------- -------------------------------------------------- ----------
	AUTO_INDEX_COMPRESSION			 OFF
	AUTO_INDEX_DEFAULT_TABLESPACE
	AUTO_INDEX_MODE 			 OFF	    19-06-18 14:22:40.000000			       SYS
	AUTO_INDEX_REPORT_RETENTION		 31
	AUTO_INDEX_RETENTION_FOR_AUTO		 373
	AUTO_INDEX_RETENTION_FOR_MANUAL
	AUTO_INDEX_SCHEMA
	AUTO_INDEX_SPACE_BUDGET 		 50

	8 rows selected.

	LIN@KKB> 
	LIN@KKB> EXEC DBMS_AUTO_INDEX.CONFIGURE('AUTO_INDEX_MODE','IMPLEMENT');

	PL/SQL procedure successfully completed.

	LIN@KKB> select * from dba_auto_index_config;

	PARAMETER_NAME				 PARAMETER_ LAST_MODIFIED				       MODIFIED_B
	---------------------------------------- ---------- -------------------------------------------------- ----------
	AUTO_INDEX_COMPRESSION			 OFF
	AUTO_INDEX_DEFAULT_TABLESPACE
	AUTO_INDEX_MODE 			 IMPLEMENT  19-06-18 16:15:55.000000			       LIN
	AUTO_INDEX_REPORT_RETENTION		 31
	AUTO_INDEX_RETENTION_FOR_AUTO		 373
	AUTO_INDEX_RETENTION_FOR_MANUAL
	AUTO_INDEX_SCHEMA
	AUTO_INDEX_SPACE_BUDGET 		 50

	8 rows selected.

	LIN@KKB> 
	LIN@KKB> col object_name for a50
	LIN@KKB> select object_name from test_obj_ai where object_id='999';

	OBJECT_NAME
	--------------------------------------------------
	APPLY$_BATCH_SQL_STATS_I

	LIN@KKB> 

	LIN@KKB> select * from DBA_AUTO_INDEX_EXECUTIONS;

	通过DBA_AUTO_INDEX_EXECUTIONS视图查看是否创建完了，从 EXECUTING 变为 COMPLETED

	LIN@KKB> col table_owner for a50
	LIN@KKB> col table_owner for a10
	LIN@KKB> col table_name for a20
	LIN@KKB> col index_name for a50
	LIN@KKB> col status for a10
	LIN@KKB> col visibility for a10
	LIN@KKB> col auto for a5
	LIN@KKB> select table_owner,table_name,index_name,status,visibility,auto from dba_indexes where table_name = 'TEST_OBJ_AI';

	TABLE_OWNE TABLE_NAME		INDEX_NAME					   STATUS     VISIBILITY AUTO
	---------- -------------------- -------------------------------------------------- ---------- ---------- -----
	LIN	   TEST_OBJ_AI		SYS_AI_829s8wj1jb4y4				   UNUSABLE   INVISIBLE  YES

	LIN@KKB> 
	LIN@KKB> set autot on exp 
	LIN@KKB> select object_name from test_obj_ai where object_id=100;

	OBJECT_NAME
	--------------------------------------------------
	I_VIEW1


	Execution Plan
	----------------------------------------------------------
	Plan hash value: 1599946467

	-----------------------------------------------------------------------------------------
	| Id  | Operation		  | Name	| Rows	| Bytes | Cost (%CPU)| Time	|
	-----------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT	  |		|     6 |   474 |    32   (7)| 00:00:01 |
	|*  1 |  TABLE ACCESS STORAGE FULL| TEST_OBJ_AI |     6 |   474 |    32   (7)| 00:00:01 |
	-----------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   1 - storage("OBJECT_ID"=100)
		   filter("OBJECT_ID"=100)

	Note
	-----
	   - dynamic statistics used: statistics for conventional DML

	LIN@KKB> 

日志文件内容：

	[oracle@db1 trace](KKB)$ grep SYS_AI_ *.trc
	KKB_j000_79469.trc:AI: Auto index task initialized:  task_id: 5 task_owner: SYS task_name: SYS_AUTO_INDEX_TASK exec_name: SYS_AI_2019-06-18/14:07:18
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:16:41.378820+09:00
	KKB_j000_79469.trc:AI: recover_crash(), exec_name: SYS_AI_2019-06-18/14:07:18, exec_status: 3
	KKB_j000_79469.trc:AI: Starting AI execute task at 18-JUN-19 04.16.41.378856000 PM +09:00 execution name: SYS_AI_2019-06-18/16:16:41 execution status: 3
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:16:41.399491+09:00
	KKB_j000_79469.trc:AI: Auto index task initialized:  task_id: 5 task_owner: SYS task_name: SYS_AUTO_INDEX_TASK exec_name: SYS_AI_2019-06-18/16:16:41
	KKB_j000_79469.trc:AI: log_finding():  p_obj_id:  finding_code: 47 finding_name: Auto index execution start vc_arg1: SYS_AI_2019-06-18/16:16:41 vc_arg2: 2019-06-18/16:16:41 vc_arg3:  n_arg1:  n_arg2:  obj_id: 
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:16:41.626680+09:00
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:16:41.638323+09:00
	KKB_j000_79469.trc:AI: log_finding():  p_obj_id:  finding_code: 46 finding_name: Statements in STS vc_arg1: SYS_AI_2019-06-18/16:16:41 vc_arg2: 2019-06-18/16:16:41 vc_arg3:  n_arg1: 855 n_arg2:  obj_id: 
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:16:41.638544+09:00
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:16:43.397471+09:00
	KKB_j000_79469.trc:AI: Creating advisor object for index "LIN"."SYS_AI_829s8wj1jb4y4" on "LIN"."TEST_OBJ_AI"("OBJECT_ID")
	KKB_j000_79469.trc:AI: log_action():  p_obj_id: 89 p_command: 2 p_stmt: CREATE INDEX "LIN"."SYS_AI_829s8wj1jb4y4"   ON "LIN"."TEST_OBJ_AI"("OBJECT_ID") TABLESPACE "USERS" UNUSABLE INVISIBLE AUTO  ONLINE time: 2019-06-18/16:16:43
	KKB_j000_79469.trc:AI: Starting verification at 18-JUN-19 04.16.43.600467000 PM +09:00, exec_name: SYS_AI_2019-06-18/16:16:41_C, basic_filter:: (sql_id, plan_hash_value) in 
	KKB_j000_79469.trc:                       from sys.wri$_adv_objects os where task_id = 5 and type =  7 and exec_name = 'SYS_AI_2019-06-18/16:16:41' and bitand(attr7, 535) = 0 and bitand(attr7, 64) > 0)
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:16:43.600549+09:00
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:18:08.786622+09:00
	KKB_j000_79469.trc:AI: log_finding():  p_obj_id:  finding_code: 40 finding_name: Auto index compilation verification done vc_arg1: SYS_AI_2019-06-18/16:16:41_C vc_arg2:  vc_arg3:  n_arg1:  n_arg2:  obj_id: 
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:18:08.953104+09:00
	KKB_j000_79469.trc:AI: Starting verification at 18-JUN-19 04.18.08.953251000 PM +09:00, exec_name: SYS_AI_2019-06-18/16:16:41_E1, basic_filter:: (sql_id, plan_hash_value) in 
	KKB_j000_79469.trc:                       from sys.wri$_adv_objects os where task_id = 5 and type =  7 and exec_name = 'SYS_AI_2019-06-18/16:16:41' and bitand(attr7, 535) = 0 and bitand(attr7, 128) > 0)
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:18:08.953317+09:00
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:19:25.213447+09:00
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:19:25.546336+09:00
	KKB_j000_79469.trc:AI: log_finding():  p_obj_id:  finding_code: 50 finding_name: Auto index execution end vc_arg1: SYS_AI_2019-06-18/16:16:41 vc_arg2: 2019-06-18/16:19:25 vc_arg3:  n_arg1:  n_arg2:  obj_id: 
	KKB_j000_79469.trc:*** MODULE NAME:(SYS_AI_MODULE) 2019-06-18T16:19:25.550229+09:00
	KKB_ora_59415.trc:AI: Auto index task initialized:  task_id: 5 task_owner: SYS task_name: SYS_AUTO_INDEX_TASK exec_name: SYS_AI_2019-06-18/14:07:18
	[oracle@db1 trace](KKB)$ 

	[oracle@db1 trace](KKB)$ grep SYS_AI_829s8wj1jb4y4 *.trc
	KKB_j000_79469.trc:AI: Creating advisor object for index "LIN"."SYS_AI_829s8wj1jb4y4" on "LIN"."TEST_OBJ_AI"("OBJECT_ID")
	KKB_j000_79469.trc:AI: log_action():  p_obj_id: 89 p_command: 2 p_stmt: CREATE INDEX "LIN"."SYS_AI_829s8wj1jb4y4"   ON "LIN"."TEST_OBJ_AI"("OBJECT_ID") TABLESPACE "USERS" UNUSABLE INVISIBLE AUTO  ONLINE time: 2019-06-18/16:16:43
	[oracle@db1 trace](KKB)$ 

	LIN@KKB> select table_owner,table_name,index_name,status,visibility,auto from dba_indexes where table_name = 'TEST_OBJ_AI';

	TABLE_OWNE TABLE_NAME		INDEX_NAME					   STATUS     VISIBILITY AUTO
	---------- -------------------- -------------------------------------------------- ---------- ---------- -----
	LIN	   TEST_OBJ_AI		SYS_AI_829s8wj1jb4y4				   UNUSABLE   INVISIBLE  YES

	LIN@KKB> 

很明显，trace模式下自动索引只是到了 UNUSABLE INVISIBLE状态，还不能使用

把trace模式设置回去，并把间隔时间从15分钟更新为5分钟（300秒），重新执行sql

	SYS@KKB> update SMB$CONFIG set PARAMETER_VALUE=0 where PARAMETER_NAME='_AUTO_INDEX_TRACE';

	1 row updated.

	SYS@KKB> commit;

	Commit complete.

	SYS@KKB> 

	SYS@KKB> update SMB$CONFIG set PARAMETER_VALUE=300 where PARAMETER_NAME='_AUTO_INDEX_TASK_INTERVAL';

	1 row updated.

	SYS@KKB> commit;

执行sql之后自动索引自动创建

	LIN@KKB> select * from dba_auto_index_statistics where execution_name='SYS_AI_2019-06-18/16:47:47';

	EXECUTION_NAME					   STAT_NAME						 VALUE
	-------------------------------------------------- ---------------------------------------- ------------------
	SYS_AI_2019-06-18/16:47:47			   Index candidates					     0
	SYS_AI_2019-06-18/16:47:47			   Indexes created (visible)				     1
	SYS_AI_2019-06-18/16:47:47			   Indexes created (invisible)				     0
	SYS_AI_2019-06-18/16:47:47			   Indexes dropped					     0
	SYS_AI_2019-06-18/16:47:47			   Space used in bytes				       3145728
	SYS_AI_2019-06-18/16:47:47			   Space reclaimed in bytes				     0
	SYS_AI_2019-06-18/16:47:47			   SQL statements verified				    10
	SYS_AI_2019-06-18/16:47:47			   SQL statements improved				    10
	SYS_AI_2019-06-18/16:47:47			   SQL statements managed by SPM			     0
	SYS_AI_2019-06-18/16:47:47			   SQL plan baselines created				     0
	SYS_AI_2019-06-18/16:47:47			   Improvement percentage				   100

	11 rows selected.

	LIN@KKB> 
	LIN@KKB> select index_name,status,visibility from dba_indexes where owner= 'LIN' and table_name='TEST_OBJ_AI';

	INDEX_NAME					   STATUS     VISIBILITY
	-------------------------------------------------- ---------- ----------
	SYS_AI_829s8wj1jb4y4				   VALID      VISIBLE

	LIN@KKB> 
	
结果如下：

	LIN@KKB> set autot on exp
	LIN@KKB> select object_name from test_obj_ai where object_id = 9527;

	OBJECT_NAME
	--------------------------------------------------
	LOGMNR_TABPART$


	Execution Plan
	----------------------------------------------------------
	Plan hash value: 3630496781

	------------------------------------------------------------------------------------------------------------
	| Id  | Operation			    | Name		   | Rows  | Bytes | Cost (%CPU)| Time	   |
	------------------------------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT		    |			   |	 6 |   474 |	 2   (0)| 00:00:01 |
	|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| TEST_OBJ_AI	   |	 6 |   474 |	 2   (0)| 00:00:01 |
	|*  2 |   INDEX RANGE SCAN		    | SYS_AI_829s8wj1jb4y4 |	 6 |	   |	 1   (0)| 00:00:01 |
	------------------------------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   2 - access("OBJECT_ID"=9527)

	Note
	-----
	   - dynamic statistics used: statistics for conventional DML

	LIN@KKB> 

### REPORT

![Auto_index_report01]({{ "/files/Oracle/Auto_index/Sample.png"}})

![Auto_index_report02]({{ "/files/Oracle/Auto_index/auto_index_2019-06-18.html"}})

### Appendix

	[Oracle 19c Automatic Indexing](http://www.bigdatalyn.com/2019/02/19/Oracle_19c_AutomaticIndexing_Tips/)
	[21.7 Managing Auto Indexes ](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/managing-indexes.html#GUID-D1285CD5-95C0-4E74-8F26-A02018EA7999)
	[Autonomous Indexing](https://blogs.oracle.com/oraclemagazine/autonomous-indexing)





	
Have a good work&life! 2019/06 via LinHong



