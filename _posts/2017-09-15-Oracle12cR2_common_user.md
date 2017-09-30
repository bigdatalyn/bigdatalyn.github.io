---
layout: post
title: "[原创]Oracle12cR2_创建公用用户"
category: Oracle
tags: Oracle 12c CDB common_user
---

* content
{:toc}


[原创]Oracle12cR2_创建公用用户

在CDB模式下，公用用户（Common User）和本地用户（Local User）两个概念被引入进来，

公用用户可以在CDB和PDB中同时存在，能够连接ROOT和PDB进行操作；而本地用户则只在特定的PDB中存在，也只能在特定的PDB中执行操作；

在PDB中不能创建公用用户，而在CDB中（CDB$ROOT中）同样不能创建本地用户。







创建公有用户，公有用户名必须是以C##或者c##(大小写C和两个#)开头的用户名，但这前缀是可以更改的，通过 common_user_prefix 参数控制。

默认的前缀名称如下所示，默认CDB中，common_user_prefix 的值是 C##。

	SQL> show con_name

	CON_NAME
	------------------------------
	CDB$ROOT
	SQL> show parameter COMMON_USER_PREFIX

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	common_user_prefix                   string      C##
	SQL>



演示创建一个 c##lyn 的用户，之后需要赋予相应的权限，另外需要注意使用grant语句中的container指定容器。


	SQL> show user;
	USER is "SYS"
	SQL> create user c##lyn identified by oracle;

	User created.

	SQL> show pdbs

		CON_ID CON_NAME                       OPEN MODE  RESTRICTED
	---------- ------------------------------ ---------- ----------
			 2 PDB$SEED                       READ ONLY  NO
			 3 PDB1                           READ WRITE NO
			 4 PDB3                           READ WRITE NO
			 5 PDB2                           READ ONLY  NO
	SQL> 
	SQL> grant connect,resource to c##lyn;

	Grant succeeded.

	SQL> conn c##lyn/oracle@pdb1;
	ERROR:
	ORA-01045: user C##LYN lacks CREATE SESSION privilege; logon denied

	Warning: You are no longer connected to ORACLE.
	SQL> conn / as sysdba
	Connected.
	SQL> grant connect,resource to c##lyn container=all;

	Grant succeeded.

	SQL> conn c##lyn/oracle@pdb1;
	Connected.        
	SQL>    


当创建公用用户时，Oracle会向每个PDB中同时创建该用户，如果PDB未打开，则创建工作会以任务的方式延后。

如下所示，pdb2是read only状态，所以创建c##lyn用户时候，对pdb2是没有创建成功的。

	SQL> show con_name

	CON_NAME
	------------------------------
	CDB$ROOT
	SQL> show pdbs;

		CON_ID CON_NAME                       OPEN MODE  RESTRICTED
	---------- ------------------------------ ---------- ----------
			 2 PDB$SEED                       READ ONLY  NO
			 3 PDB1                           READ WRITE NO
			 4 PDB3                           READ WRITE NO
			 5 PDB2                           READ ONLY  NO
	SQL>
	SQL> conn c##lyn/oracle@pdb1;
	Connected.
	SQL> conn c##lyn/oracle@pdb3;
	Connected.
	SQL> conn c##lyn/oracle@pdb2;
	ERROR:            
	ORA-01017: invalid username/password; logon denied

	Warning: You are no longer connected to ORACLE.
	SQL>

通过重启pdb2，之后可以用c##lyn的公共用户连接了。

	SQL> conn / as sysdba
	Connected.
	SQL> 
	SQL> alter pluggable database pdb2 close immediate;

	Pluggable database altered.

	SQL> alter pluggable database pdb2 open;

	Pluggable database altered.

	SQL> 
	SQL> conn c##lyn/oracle@pdb2;
	Connected.        
	SQL> 
		

从 [[原创]Oracle12cR2_通过控制文件查看cdb的结构](http://www.bigdatalyn.com/2017/09/15/Oracle12cR2_CDB_Controlfile/) 文中,

cdb/pdb数据文件的路径清晰可见。如果要创建的公有用户指定表空间的话，需要每个容器都事前存在，不然会报错。参考如下实验：

	SQL> show con_name

	CON_NAME
	------------------------------
	CDB$ROOT
	SQL> select file_name from dba_data_files;             

	FILE_NAME
	------------------------------------------------------------
	/opt/oracle/oradata/PRODCDB/system01.dbf
	/opt/oracle/oradata/PRODCDB/sysaux01.dbf
	/opt/oracle/oradata/PRODCDB/undotbs01.dbf
	/opt/oracle/oradata/PRODCDB/deftbs01.dbf

	SQL> create tablespace users datafile '/opt/oracle/oradata/PRODCDB/user01.dbf' size 100m autoextend on uniform size 1m;          

	Tablespace created.

	SQL> select file_name from dba_data_files;             

	FILE_NAME
	------------------------------------------------------------
	/opt/oracle/oradata/PRODCDB/system01.dbf
	/opt/oracle/oradata/PRODCDB/sysaux01.dbf
	/opt/oracle/oradata/PRODCDB/undotbs01.dbf
	/opt/oracle/oradata/PRODCDB/deftbs01.dbf
	/opt/oracle/oradata/PRODCDB/user01.dbf

	SQL>              
	SQL> create user c##test01 identified by oracle default tablespace users temporary tablespace temp01;                            
	create user c##test01 identified by oracle default tablespace users temporary tablespace temp01
	*
	ERROR at line 1:
	ORA-00959: tablespace 'TEMP01' does not exist


	SQL> create user c##test01 identified by oracle default tablespace users temporary tablespace TEMPTS1;                           
	create user c##test01 identified by oracle default tablespace users temporary tablespace TEMPTS1                                 
	*
	ERROR at line 1:
	ORA-65048: error encountered when processing the current DDL statement in pluggable database PDB1
	ORA-00959: tablespace 'USERS' does not exist


	SQL> 	
	SQL> create user c##user01 identified by oracle default tablespace deftbs temporary tablespace TEMPTS1;                          
	
	User created.

	SQL> 
	
> 不仅临时表空间名要注意，指定的表空间需要各个容器都需要存在，不然报: ORA-65048 的错误。

测试链接：

	SQL> grant connect,resource to c##user01;              

	Grant succeeded.

	SQL>  
	
上面赋予语句只能练剑PRODCDB，而不能链接pdb,所以赋予公有用户时候，需要注意container参数。参考如下：(container=all 赋予全部pdb相同权限)
	
	[oracle@databasevm ~]$ sqlplus  c##user01/oracle@127.0.0.1:1521/prodcdb;                                                         

	SQL*Plus: Release 12.2.0.1.0 Production on Fri Sep 29 17:56:51 2017

	Copyright (c) 1982, 2016, Oracle.  All rights reserved.


	Connected to:
	Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production

	SQL> conn c##user01/oracle@pdb1;
	ERROR:            
	ORA-01045: user C##USER01 lacks CREATE SESSION privilege; logon denied


	Warning: You are no longer connected to ORACLE.
	SQL> conn / as sysdba           
	Connected.
	SQL> grant connect,resource to c##user01 container=all;

	Grant succeeded.

	SQL> conn c##user01/oracle@pdb1;
	Connected.        
	SQL>            

	
~~~ LinHong 2017/09/15 ~~~~
