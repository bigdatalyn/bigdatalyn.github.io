---
layout: post
title: "[原创]Exadata虚拟机测试SMART SCAN"
category: Oracle
tags: Exadata Oracle SmartScan
---

* content
{:toc}

[原创]Exadata虚拟机测试SMART SCAN









### 安装参考

如何一步步搭建Exadata虚拟机——Cell节点

http://blog.csdn.net/lixora/article/details/8937586

【Oracle】Exadata虚拟机配置（一） 

http://blog.csdn.net/badly9/article/details/39677815

搭建测试环境exadata一体机 （vm虚拟机redhat上配置）
 
http://blog.itpub.net/29500582/viewspace-1410794/

参考:

https://docs.oracle.com/cd/E50790_01/doc/doc.121/e50471/administer.htm#SAGUG20530

### 测试安装使用

#### 创建ASM表空间及用户test01

	SQL> select group_number,name,block_size from v$asm_diskgroup;

	GROUP_NUMBER NAME                           BLOCK_SIZE
	------------ ------------------------------ ----------
			   1 DATA                                 4096
			   2 FRA                                  4096

	SQL> create tablespace my_tbs datafile '+DATA';

	Tablespace created.

	SQL> SELECT tablespace_name, predicate_evaluation FROM dba_tablespaces;

	TABLESPACE_NAME                PREDICA
	------------------------------ -------
	SYSTEM                         HOST
	SYSAUX                         HOST
	UNDOTBS1                       HOST
	TEMP                           HOST
	USERS                          HOST
	EXAMPLE                        HOST
	MY_TBS                         STORAGE

	7 rows selected.

	SQL>

	SQL> create user test01 identified by test01 default tablespace my_tbs;

	User created.

	SQL> grant connect,resource to test01;

	Grant succeeded.

	SQL> grant dba to test01;

	Grant succeeded.

	SQL> 



#### 创建测试表

测试表sales 大小171M左右

	***drop table sales;

	create table sales as select 'Oracle Enterprise Edition' as product, mod(rownum,5) as channel_id,  mod(rownum,1000) as cust_id , 5000 as amount_sold, to_date('01.' || lpad(to_char(mod(rownum,12)+1),2,'0') || '.2017' ,'dd.mm.yyyy') as time_id from dual connect by level<=2e5; 

	select count(*) from sales;

	select bytes/1024/1024/1024 as gb from user_segments;


	alter table sales nologging;

	insert /*+ append */ into sales select * from sales;

	commit;

	insert /*+ append */ into sales select * from sales;

	commit;

	insert /*+ append */ into sales select * from sales;

	commit;

	insert /*+ append */ into sales select * from sales;

	commit;

	select bytes/1024/1024/1024 as gb from user_segments;

	exec dbms_stats.gather_table_stats('TEST01','sales');

大小
	
	SQL> select bytes/1024/1024/1024 as gb from user_segments;

		GB
	----------
	.171875

	SQL> 


#### 测试没有开启和开启SMART SCAN之后执行时间的比较

测试结果如下：8秒 vs 0.73秒 10倍左右

	SQL> alter session set cell_offload_processing=false;

	Session altered.

	SQL> set timing on
	SQL> select /* NO_SMART_SCAN */ count(*) from sales where channel_id=1;

	  COUNT(*)
	----------
		640000

	Elapsed: 00:00:07.56
	SQL> select /* NO_SMART_SCAN */ count(*) from sales where channel_id=1;

	  COUNT(*)
	----------
		640000

	Elapsed: 00:00:08.19
	SQL> set timing off
	SQL> 
	SQL> 
	SQL> alter session set cell_offload_processing=true;

	Session altered.

	SQL> set timing on
	SQL> select /* WITH_SMART_SCAN */ count(*) from sales where channel_id=1;

	  COUNT(*)
	----------
		640000

	Elapsed: 00:00:00.75
	SQL> select /* WITH_SMART_SCAN */ count(*) from sales where channel_id=1;

	  COUNT(*)
	----------
		640000

	Elapsed: 00:00:00.73
	SQL> set timing off
	SQL> 

执行过程使用cell使用情况
		
	SQL> select a.name,b.value/1024/1024 MB
	from v$sysstat a , v$mystat b
	where
	a.statistic#=b.statistic#
	and (a.name in ('physical read total bytes','physical write total bytes',
	'cell IO uncompressed bytes') or a.name like 'cell phy%');  2    3    4    5    6  

	NAME                                                                     MB
	---------------------------------------------------------------- ----------
	physical read total bytes                                        1621.14844
	physical write total bytes                                          168.625
	cell physical IO interconnect bytes                              1306.22004
	cell physical IO bytes saved during optimized file creation               0
	cell physical IO bytes saved during optimized RMAN file restore           0
	cell physical IO bytes eligible for predicate offload               505.875
	cell physical IO bytes saved by storage index                             0
	cell physical IO interconnect bytes returned by smart scan       22.3216019
	cell IO uncompressed bytes                                       506.007813

	9 rows selected.

	SQL> 

另外执行计划结果比较如下：

注意使用smart scan的执行计划filter部分有 “2 - storage("CHANNEL_ID"=1)” 

	SQL> select sql_id from v$sql where sql_text like '%NO_SMART_SCAN%' and sql_text not like '%like%';

	SQL_ID
	-------------
	81vy8y7fkvzta

	SQL>

	SQL> select plan_table_output from table (dbms_xplan.display_cursor('81vy8y7fkvzta'));

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	SQL_ID  81vy8y7fkvzta, child number 0
	-------------------------------------
	select /* NO_SMART_SCAN */ count(*) from sales where channel_id=1

	Plan hash value: 1047182207

	--------------------------------------------------------------------------------
	----

	| Id  | Operation                  | Name  | Rows  | Bytes | Cost (%CPU)| Time
	   |

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------

	--------------------------------------------------------------------------------
	----

	|   0 | SELECT STATEMENT           |       |       |       |  2982 (100)|
	   |

	|   1 |  SORT AGGREGATE            |       |     1 |     3 |            |
	   |

	|*  2 |   TABLE ACCESS STORAGE FULL| SALES |   320K|   937K|  2982   (1)| 00:00:

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	36 |

	--------------------------------------------------------------------------------
	----


	Predicate Information (identified by operation id):
	---------------------------------------------------

	   2 - filter("CHANNEL_ID"=1)


	19 rows selected.

	SQL> 

	SQL> select sql_id from v$sql where sql_text like '%WITH_SMART_SCAN%' and sql_text not like '%like%';

	SQL_ID
	-------------
	09w5f5hxqar4p

	SQL> select plan_table_output from table (dbms_xplan.display_cursor('09w5f5hxqar4p'));

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	SQL_ID  09w5f5hxqar4p, child number 0
	-------------------------------------
	select /* WITH_SMART_SCAN */ count(*) from sales where channel_id=1

	Plan hash value: 1047182207

	--------------------------------------------------------------------------------
	----

	| Id  | Operation                  | Name  | Rows  | Bytes | Cost (%CPU)| Time
	   |

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------

	--------------------------------------------------------------------------------
	----

	|   0 | SELECT STATEMENT           |       |       |       |  5935 (100)|
	   |

	|   1 |  SORT AGGREGATE            |       |     1 |     3 |            |
	   |

	|*  2 |   TABLE ACCESS STORAGE FULL| SALES |   653K|  1915K|  5935   (1)| 00:01:

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------
	12 |

	--------------------------------------------------------------------------------
	----


	Predicate Information (identified by operation id):
	---------------------------------------------------

	   2 - storage("CHANNEL_ID"=1)
		   filter("CHANNEL_ID"=1)

	PLAN_TABLE_OUTPUT
	--------------------------------------------------------------------------------


	20 rows selected.

	SQL> 

### HCC压缩测试

测试脚本如下：

	create tablespace host_tbs datafile '/etc/oracle/oradata/orcl/host_tbs01.dbf' size 800m;

	create bigfile tablespace cell_hcc_tbs datafile '+DATA' size 1g autoextend on maxsize unlimited default COMPRESS FOR QUERY HIGH extent management local uniform size 4m segment space management auto;

	create table tab01 tablespace host_tbs as select 'Oracle Enterprise Edition' as product, mod(rownum,5) as channel_id,  mod(rownum,1000) as cust_id , 1000 as amount_sold, to_date('01.' || lpad(to_char(mod(rownum,12)+1),2,'0') || '.2017' ,'dd.mm.yyyy') as time_id from dual connect by level<=2e5 ; 

	insert /*+ append */ into tab01 select * from tab01;

	commit;

	insert /*+ append */ into tab01 select * from tab01;

	commit;

	insert /*+ append */ into tab01 select * from tab01;

	commit;

	insert /*+ append */ into tab01 select * from tab01;

	commit;

	insert /*+ append */ into tab01 select * from tab01;

	commit;

	exec dbms_stats.gather_table_stats('USER01','TAB01');

	create table TAB01_HCC_QH tablespace cell_hcc_tbs as select * from tab01;

	exec dbms_stats.gather_table_stats('USER01','TAB01_HCC_QH');

	col segment_name format a20

	select segment_name, bytes/1024/1024 as MB from dba_segments where segment_name = 'TAB01' or segment_name = 'TAB01_HCC_QH';

	select segment_name, bytes from dba_segments where segment_name = 'TAB01' or segment_name = 'TAB01_HCC_QH';


测试结果如下：

	USER01@orcl> select segment_name, bytes/1024/1024 as MB from dba_segments where segment_name = 'TAB01' or segment_name = 'TAB01_HCC_QH';

	SEGMENT_NAME                 MB
	-------------------- ----------
	TAB01                       792
	TAB01_HCC_QH                  4

	USER01@orcl>

	USER01@orcl> select segment_name, bytes from dba_segments where segment_name = 'TAB01' or segment_name = 'TAB01_HCC_QH';

	SEGMENT_NAME              BYTES
	-------------------- ----------
	TAB01                 830472192
	TAB01_HCC_QH            4194304

	USER01@orcl> select 830472192/4194304 from dual;

	830472192/4194304
	-----------------
				  198

	USER01@orcl>

792M的大小压缩到4M大小，压缩比有198倍！！！！

** 由于表的内容相同内容太多的缘故，之后再找不同测试样例

	
### 后期待续


~ 后期待续 ~





