---
layout: post
title: "[原创]Oracle12cR2_测试在线移动表"
category: Oracle
tags: Oracle 12c new features tablespace
---

* content
{:toc}


[原创]Oracle12cR2_测试在线移动表

Oracle 12cR2 之后 通过 

	ALTER TABLE...MOVE [PARTITION|SUBPARTITION] 

语句容许移动表，分区到另外物理存储空间，或者更改压缩属性等。

更重要的是支持在线-online ，即容许在操作对象在DML操作下也可以实现, 也可以不需要rebuild index等操作了，方便很多。

详细的细节如下：

	Moving a table changes the rowids of the rows in the table. If you move a table and include the ONLINE keyword and the UPDATE INDEXES clause, then the indexes remain usable during the move operation. If you include the UPDATE INDEXES clause but not the ONLINE keyword, then the indexes are usable immediately after the move operation. The UPDATE INDEXES clause can only change the storage properties for the global indexes on the table or storage properties for the index partitions of any global partitioned index on the table. If you do not include the UPDATE INDEXES clause, then the changes to the rowids cause the indexes on the table to be marked UNUSABLE, and DML accessing the table using these indexes receive an ORA-01502 error. In this case, the indexes on the table must be dropped or rebuilt. 

	


	
	
	

测试：

#### 测试数据如下

1. 创建用户
2. 创建测试表
3. insert数据
4. 创建索引(放在同个表空间)
5. 收集统计信息

过程：

	SQL> create user c##lyn identified by oracle default tablespace deftbs temporary tablespace tempts1;                                                                                                                                         

	User created.

	SQL> grant dba to c##lyn container=all;

	Grant succeeded.

	SQL> conn c##lyn/oracle@pdb1

	Connected.                                                                                                                                                                                                                                   
	SQL>

	SQL> select tablespace_name from user_tablespaces;

	TABLESPACE_NAME
	------------------------------
	SYSTEM
	SYSAUX
	UNDOTBS1
	TEMPTS1
	DEFTBS

	SQL>  

	SQL> create table test01 as select * from dba_objects;

	Table created.

	SQL> commit;

	Commit complete.

	SQL> insert into test01 select * from test01;

	22198 rows created.

	SQL> commit;

	Commit complete.

	SQL> insert into test01 select * from test01;

	44396 rows created.

	SQL> commit;

	Commit complete.

	SQL> insert into test01 select * from test01; 

	88792 rows created.

	SQL> commit;

	Commit complete.

	SQL> insert into test01 select * from test01; 

	177584 rows created.

	SQL> commit;

	Commit complete.

	SQL> insert into test01 select * from test01; 

	355168 rows created.

	SQL> commit;

	SQL> insert into test01 select * from test01;

	710560 rows created.

	SQL>

	SQL> commit;

	Commit complete.

	SQL> 

	SQL> create index test_indx on test01(object_id) tablespace deftbs;

	Index created.

	SQL> show user

	USER is "C##LYN"

	SQL>

	SQL> exec dbms_stats.gather_schema_stats('c##lyn');

	PL/SQL procedure successfully completed.

	SQL>

如果插入大量数据，现有表空间不够的话，会自动扩展，在diag alert日志中有大量下面时间:

	PDB1(3):Resize operation completed for file# 11, old size 496640K, new size 506880K
	

#### 测试步骤

1. 查看表和索引所占空间
2. 计算count(*)表的时间
3. 删除大量数据
4. 测试

过程：

	SQL> col SEGMENT_NAME for a30
	SQL> select SEGMENT_NAME,TABLESPACE_NAME,BYTES/1024/1024 SIZE_M from user_segments;

	SEGMENT_NAME                   TABLESPACE_NAME                    SIZE_M
	------------------------------ ------------------------------ ----------
	TEST01                         DEFTBS                                200
	TEST_INDX                      DEFTBS                                 25

	SQL>  

	SQL> set timing on                                                                                                               
	SQL> select count(*) from test01;

	  COUNT(*)
	----------
	   1421120

	Elapsed: 00:00:00.06                            ## 时间为0.06秒
	SQL>    

	SQL> delete from test01 where object_id <> 1;

	1421056 rows deleted.

	Elapsed: 00:01:00.98
	SQL> 
	SQL> select count(*) from test01;

	  COUNT(*)
	----------
			64

	Elapsed: 00:00:01.26                            ## 删除大量数据后，时间为1.26秒
	SQL> 
	SQL> exec dbms_stats.gather_schema_stats('c##lyn');

	PL/SQL procedure successfully completed.

	Elapsed: 00:00:01.86
	SQL> select count(*) from test01;                                                                                                

	  COUNT(*)
	----------
			64

	Elapsed: 00:00:00.04                            ## 删除大量数据之后，收集统计信息，时间为0.04秒 
	SQL>
	SQL> select SEGMENT_NAME,TABLESPACE_NAME,BYTES/1024/1024 SIZE_M from user_segments;

	SEGMENT_NAME                   TABLESPACE_NAME                    SIZE_M
	------------------------------ ------------------------------ ----------
	TEST01                         DEFTBS                                200
	TEST_INDX                      DEFTBS                                 25

	Elapsed: 00:00:00.01
	SQL> set timing off

	SQL> alter table test01 move online;                             ##在线移动表

	Table altered.

	SQL> select SEGMENT_NAME,TABLESPACE_NAME,BYTES/1024/1024 SIZE_M from user_segments;

	SEGMENT_NAME                   TABLESPACE_NAME                    SIZE_M
	------------------------------ ------------------------------ ----------
	TEST01                         DEFTBS                              .0625
	TEST_INDX                      DEFTBS                              .0625

	SQL> set timing on
	SQL> select count(*) from test01;

	  COUNT(*)
	----------
			64

	Elapsed: 00:00:00.00                            ## 在线移动表之后，时间约为0 少许看的出来时间减少了点点....

	SQL>

数据量不大200m左右，下面是440m的测试


	SQL> select SEGMENT_NAME,TABLESPACE_NAME,BYTES/1024/1024 SIZE_M from user_segments;                                              
																																	 
	SEGMENT_NAME                   TABLESPACE_NAME                    SIZE_M
	------------------------------ ------------------------------ ----------
	TEST01                         DEFTBS                              .0625
	TEST02                         DEFTBS                                445
	TEST02_INDX                    DEFTBS                                 56
	TEST_INDX                      DEFTBS                              .0625

	SQL> set timing on                                                                                                               
	SQL> select count(*) from test02;

	  COUNT(*)
	----------
	   3199984

	Elapsed: 00:00:00.20
	SQL>  
	SQL> delete test02 where object_id <> 1;

	3197792 rows deleted.

	Elapsed: 00:03:06.22
	SQL> select count(*) from test02;

	  COUNT(*)
	----------
		  2192

	Elapsed: 00:00:00.42
	SQL>      
																														   
	SQL> select SEGMENT_NAME,TABLESPACE_NAME,BYTES/1024/1024 SIZE_M from user_segments;                                              

	SEGMENT_NAME                   TABLESPACE_NAME                    SIZE_M
	------------------------------ ------------------------------ ----------
	TEST01                         DEFTBS                              .0625
	TEST02                         DEFTBS                                445
	TEST_INDX                      DEFTBS                              .0625
	TEST02_INDX                    DEFTBS                                 56

	Elapsed: 00:00:00.22
	SQL> 
	SQL> alter table test02 move online;                                                                                             

	Table altered.

	Elapsed: 00:00:01.60
	SQL> select SEGMENT_NAME,TABLESPACE_NAME,BYTES/1024/1024 SIZE_M from user_segments;

	SEGMENT_NAME                   TABLESPACE_NAME                    SIZE_M
	------------------------------ ------------------------------ ----------
	TEST01                         DEFTBS                              .0625
	TEST02                         DEFTBS                                .25
	TEST_INDX                      DEFTBS                              .0625
	TEST02_INDX                    DEFTBS                              .0625

	Elapsed: 00:00:00.11
	SQL> 
	SQL> select count(*) from test02;                                                                                                

	  COUNT(*)
	----------
		  2192

	Elapsed: 00:00:00.00
	SQL>  

#### 结论	
	
> 结论：大量删除数据更新数据之后，需要收集统计信息，而12cR2之后 alter table ... move online. 在线移动表，可以不影响业务。如果不加online的话，move之后，如下index状态是 unusable，需要rebuild index。12cR2之后添加 online之后是不需要rebuild index,方便很多。

	SQL> select status,index_name from user_indexes;                                                                                                                                                                                             

	STATUS                         INDEX_NAME
	------------------------------ ------------------------------
	VALID                          TEST_INDX
	VALID                          TEST02_INDX
	UNUSABLE                       TEST03_INDX

	SQL>    

#### 参考
	
参考：


[Moving a Table to a New Segment or Tablespace ](https://docs.oracle.com/en/cloud/paas/exadata-express-cloud/csdbf/about-moving-a-table.html#GUID-013A9AB0-2111-41A5-8C91-905B56D8B836)

删除表空间命令

	> drop tablespace XXXX including contents and datafiles cascade constraints
	
	


~~~ LinHong 2017/09/15 ~~~~
