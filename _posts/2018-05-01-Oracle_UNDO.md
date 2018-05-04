---
layout: post
title: "Oracle UNDO"
category: Oracle
tags: Oracle UNDO
---

* content
{:toc}


Oracle - Study UNDO


### UNDO回滚段的作用

undo回滚段作用:

	事务回滚
	实例恢复(利用回滚段来恢复未提交的数据)
	构造CR块，读一致性
	数据库闪回查询
	数据库闪回恢复逻辑错误









### ORA-01555快照过旧的分析

测试工作：

创建另外一个不能自动扩展的UNDO表空间

	SQL> show parameter undo

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	undo_management                      string      AUTO
	undo_retention                       integer     900
	undo_tablespace                      string      UNDOTBS1
	SQL> select name from v$datafile;

	NAME
	--------------------------------------------------------------------------------
	/etc/oracle/oradata/orcl/system01.dbf
	/etc/oracle/oradata/orcl/sysaux01.dbf
	/etc/oracle/oradata/orcl/undotbs01.dbf
	/etc/oracle/oradata/orcl/users01.dbf
	/etc/oracle/oradata/orcl/example01.dbf

	SQL> create undo tablespace undotbs2 datafile '/etc/oracle/oradata/orcl/undotbs02.dbf' size 5m;

	Tablespace created.

	SQL> alter system set undo_tablespace=undotbs2;

	System altered.

	SQL> show parameter undo

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	undo_management                      string      AUTO
	undo_retention                       integer     900
	undo_tablespace                      string      UNDOTBS2
	SQL> 


	SQL> col tablespace_name for a20
	SQL> col file_name for a60
	SQL> set linesize 1000
	SQL> select file_id,file_name,tablespace_name,bytes/1024/1024 MB from dba_data_files where file_name like '%undotbs02%';

	FILE_ID FILE_NAME                                          TABLESPACE         MB
	---------- -------------------------------------------------- ---------- ----------
			6 /etc/oracle/oradata/orcl/undotbs02.dbf             UNDOTBS2            5

	SQL> 
	SQL> create user lyn identified by oracle;

	User created.

	SQL> grant connect,resource,dba to lyn;

	Grant succeeded.

	SQL> set sqlp "_USER'@'_CONNECT_IDENTIFIER> "



测试过程：打开两个会话过程


+++++++++++++++++++++++++

set time on
var r1 refcursor
begin 
open :r1 for select * from t1;
end;
/

+++++++++++++++++++++++++

set time on
begin
for i in 1..10 loop
update t1 set object_id=i where object_id < 10000;
commit;
end loop;
end;
/
+++++++++++++++++++++++++

Session1:

	set sqlp "_USER'@'SESSION01> "

	LYN@SESSION01> 

Session2:

	set sqlp "_USER'@'SESSION02> "
	LYN@SESSION02> 

Session1: 定义一个游标获取t1测试表的全部结果集

	LYN@SESSION01> create table t1 as select * from dba_objects;

	Table created.

	LYN@SESSION01> 

	LYN@SESSION01> set time on
	var r1 refcursor
	begin 
	open :r1 for select * from t1;
	end;
	/00:45:01 LYN@SESSION01> 00:45:01 LYN@SESSION01> 00:45:01   2  00:45:01   3  00:45:01   4  

	PL/SQL procedure successfully completed.

	00:45:02 LYN@SESSION01> 

Session 2: 大量更新操作（目的是清理掉有限表空间内容）

	00:43:37 LYN@SESSION02> set time on
	begin
	for i in 1..10 loop
	update t1 set object_id=i where object_id < 10000;
	commit;
	end loop;
	end;
	/00:45:27 LYN@SESSION02> 00:45:27   2  00:45:27   3  00:45:27   4  00:45:27   5  00:45:27   6  00:45:27   7  

	PL/SQL procedure successfully completed.

	00:45:30 LYN@SESSION02> 

Session 1: 打开刚才定义的游标r1,出现ORA-01555错误

	00:45:02 LYN@SESSION01> print :r1 
	ERROR:
	ORA-01555: snapshot too old: rollback segment number 12 with name "_SYSSMU12_637614006$" too small

	no rows selected

	00:45:40 LYN@SESSION01> 

在diag日志中也可以找到ORA-01555

	Fri May 01 00:45:40 2018
	ORA-01555 caused by SQL statement below (SQL ID: 0jjc60pmrntdv, Query Duration=38 sec, SCN: 0x0000.001016a1):
	SELECT * FROM T1


分析:

ORA-01555错误：

	[oracle@database ~]$ oerr ora 01555
	01555, 00000, "snapshot too old: rollback segment number %s with name \"%s\" too small"
	// *Cause: rollback records needed by a reader for consistent read are
	//         overwritten by other writers
	// *Action: If in Automatic Undo Management mode, increase undo_retention
	//          setting. Otherwise, use larger rollback segments
	[oracle@database ~]$ 

 ORACLE一致性读，查询的结果是发起时间(SCN)那一刻的结果集。当大查询没有结束，但其中内容已被更改时，ORACLE会从UNDO里根据发起时间SCN的值找到相应的修改前的值。但如果这时UNDO里的值已经被覆盖，找到不修改前的值了，就会报ORA-01555错误。

对策一般有下面方法：

	加大UNDO表空间大小：undo datafile设置成自动扩展（单个文件最大32G），增加undo datafile的个数
	加大undo_retention，使undo可以保留更长时间不被覆盖
	优化SQL，使用SQL可以在较短的时间完成



Have a good day! 2018/05 via LinHong
	






