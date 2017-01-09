---
layout: post
title: "[原创]db2pd中lockname对应的详细信息"
date:   2016-05-20 13:35:00
category: DB2
tags: DB2 Lockname db2pd 
---

* content
{:toc}

调查锁的过程中，需要确认锁的对象表和锁的范围信息，可以用什么方法简单去查看锁的过程中锁的对象和那些记录被锁了？





### 问题 


调查锁的过程中，需要确认锁的对象表和锁的范围信息，可以用什么方法简单去查看锁的过程中锁的对象和那些记录被锁了？


刚好同事问起在调查锁的过程中，怎么查看锁中锁的对象表和具体的行信息呢？下面通过简单例子去确认。


特别是：MON_FORMAT_LOCK_NAME()函数的使用。

### 测试&总结



#### 使用的os平台和数据库：

	[db2inst1@oc6748481478 ~]$ cat /etc/redhat-release 
	Red Hat Enterprise Linux Workstation release 6.6 (Santiago)
	[db2inst1@oc6748481478 ~]$ db2level
	DB21085I  This instance or install (instance name, where applicable: 
	"db2inst1") uses "64" bits and DB2 code release "SQL10055" with level 
	identifier "0606010E".
	Informational tokens are "DB2 v10.5.0.5", "s141128", "IP23633", and Fix Pack 
	"5".
	Product is installed at "/opt/ibm/db2/V10.5".

	[db2inst1@oc6748481478 ~]$ 


#### 测试步骤：

session1和session2 为两个终端连接到sample

#### step1：创建表

session1:

	创建测试表t1：
	另外自动提交设置为off

	[db2inst1@oc6748481478 ~]$ db2 drop table t1
	DB20000I  The SQL command completed successfully.
	[db2inst1@oc6748481478 ~]$ 
	[db2inst1@oc6748481478 ~]$ db2 "create table t1 (col1 char(20))"
	DB20000I  The SQL command completed successfully.
	[db2inst1@oc6748481478 ~]$ db2
	(c) Copyright IBM Corporation 1993,2007
	Command Line Processor for DB2 Client 10.5.5

	You can issue database manager commands and SQL statements from the command 
	prompt. For example:
	    db2 => connect to sample
	    db2 => bind sample.bnd

	For general help, type: ?.
	For command help, type: ? command, where command can be
	the first few keywords of a database manager command. For example:
	 ? CATALOG DATABASE for help on the CATALOG DATABASE command
	 ? CATALOG          for help on all of the CATALOG commands.

	To exit db2 interactive mode, type QUIT at the command prompt. Outside 
	interactive mode, all commands must be prefixed with 'db2'.
	To list the current command option settings, type LIST COMMAND OPTIONS.

	For more detailed help, refer to the Online Reference Manual.

	db2 => list command options

	     Command Line Processor Option Settings

	 Backend process wait time (seconds)        (DB2BQTIME) = 1
	 No. of retries to connect to backend        (DB2BQTRY) = 60
	 Request queue wait time (seconds)          (DB2RQTIME) = 5
	 Input queue wait time (seconds)            (DB2IQTIME) = 5
	 Command options                           (DB2OPTIONS) = 

	 Option  Description                               Current Setting
	 ------  ----------------------------------------  ---------------
	   -a    Display SQLCA                             OFF
	   -b    Auto-Bind                                 ON
	   -c    Auto-Commit                               ON
	   -d    Retrieve and display XML declarations     OFF
	   -e    Display SQLCODE/SQLSTATE                  OFF
	   -f    Read from input file                      OFF
	   -i    Display XML data with indentation         OFF
	   -j    Return code for system calls              OFF
	   -l    Log commands in history file              OFF
	   -m    Display the number of rows affected       OFF
	   -n    Remove new line character                 OFF
	   -o    Display output                            ON
	   -p    Display interactive input prompt          ON
	   -q    Preserve whitespaces & linefeeds          OFF
	   -r    Save output to report file                OFF
	   -s    Stop execution on command error           OFF
	   -t    Set statement termination character       OFF
	   -v    Echo current command                      OFF
	   -w    Display FETCH/SELECT warning messages     ON
	   -x    Suppress printing of column headings      OFF
	   -z    Save all output to output file            OFF

	db2 => update command options using c off
	DB20000I  The UPDATE COMMAND OPTIONS command completed successfully.
	db2 => 


session2:

	[db2inst1@oc6748481478 ~]$ db2 "select * from t1"

	COL1                
	--------------------

	  0 record(s) selected.

	[db2inst1@oc6748481478 ~]$




##### step2：对t1表插入6个record

session1:

	db2 => insert into t1 values('a1'),('a2'),('a3'),('a4'),('a5'),('a6')
	DB20000I  The SQL command completed successfully.
	db2 => select * from t1 

	COL1                
	--------------------
	a1                  
	a2                  
	a3                  
	a4                  
	a5                  
	a6                  

	  6 record(s) selected.

	db2 => 


session2:

	[db2inst1@oc6748481478 ~]$ db2 "select * from t1"

	COL1                
	--------------------

	  0 record(s) selected.

	[db2inst1@oc6748481478 ~]$ db2 "select * from t1 with ur"

	COL1                
	--------------------
	a1                  
	a2                  
	a3                  
	a4                  
	a5                  
	a6                  

	  6 record(s) selected.

	[db2inst1@oc6748481478 ~]$ 


	session1:

	db2 => commit
	DB20000I  The SQL command completed successfully.
	db2 => 



session2:

	[db2inst1@oc6748481478 ~]$ db2 "select * from t1"

	COL1                
	--------------------
	a1                  
	a2                  
	a3                  
	a4                  
	a5                  
	a6                  

	  6 record(s) selected.

	[db2inst1@oc6748481478 ~]$ db2 "select * from t1 with ur"

	COL1                
	--------------------
	a1                  
	a2                  
	a3                  
	a4                  
	a5                  
	a6                  

	  6 record(s) selected.

	[db2inst1@oc6748481478 ~]$ 


#### step3：对t1表更新其中的a5

session1:

	db2 => update t1 set col1='a5+update' where col1='a5'
	DB20000I  The SQL command completed successfully.
	db2 => select * from t1

	COL1                
	--------------------
	a1                  
	a2                  
	a3                  
	a4                  
	a5+update           
	a6                  

	  6 record(s) selected.

	db2 =>


session2:

	[db2inst1@oc6748481478 ~]$ db2 "select * from t1"

	COL1                
	--------------------
	a1                  
	a2                  
	a3                  
	a4                  
	a5                  
	a6                  

	  6 record(s) selected.

	[db2inst1@oc6748481478 ~]$ db2 "select * from t1 with ur"

	COL1                
	--------------------
	a1                  
	a2                  
	a3                  
	a4                  
	a5+update           
	a6                  

	  6 record(s) selected.

	[db2inst1@oc6748481478 ~]$ 

#### step4：db2pd -locks的结果

	[db2inst1@oc6748481478 ~]$ db2pd -d sample -locks

	Database Member 0 -- Database SAMPLE -- Active -- Up 0 days 00:28:17 -- Date 2016-05-23-10.57.20.740720

	Locks:
	Address            TranHdl    Lockname                   Type           Mode Sts Owner      Dur HoldCount  Att        ReleaseFlg rrIID 
	0x00007F46BCEDDB80 12         03001000080000000000000052 RowLock        ..X  G   12         1   0          0x00200000 0x40000000 0     
	0x00007F46BCEDCA80 12         4141414141664164FE8BC714C1 PlanLock       ..S  G   12         1   0          0x00000000 0x40000000 0     
	0x00007F46BCEDCC00 12         03001000000000000000000054 TableLock      .IX  G   12         1   0          0x00202000 0x40000000 0     
	[db2inst1@oc6748481478 ~]$ 


#### step5：分析和调查对象lockname的详细信息

查看lock：

	Lockname                   Type 
	03001000080000000000000052 RowLock
	4141414141664164FE8BC714C1 PlanLock
	03001000000000000000000054 TableLock

通过lock name来查看详细锁的对象信息：

	[db2inst1@oc6748481478 ~]$ db2 "SELECT SUBSTR(NAME,1,20) AS NAME,SUBSTR(VALUE,1,50) AS VALUE FROM TABLE( MON_FORMAT_LOCK_NAME('03001000080000000000000052')) as LOCKS"

	NAME                 VALUE                                             
	-------------------- --------------------------------------------------
	LOCK_OBJECT_TYPE     ROW                                               
	ROWID                8                                                 
	DATA_PARTITION_ID    0                                                 
	PAGEID               0                                                 
	TBSP_NAME            IBMDB2SAMPLEREL                                   
	TABSCHEMA            DB2INST1                                          
	TABNAME              T1                                                

	  7 record(s) selected.

	[db2inst1@oc6748481478 ~]$ db2 "SELECT SUBSTR(NAME,1,20) AS NAME,SUBSTR(VALUE,1,50) AS VALUE FROM TABLE( MON_FORMAT_LOCK_NAME('4141414141664164FE8BC714C1')) as LOCKS"

	NAME                 VALUE                                             
	-------------------- --------------------------------------------------
	LOCK_OBJECT_TYPE     PLAN                                              
	PACKAGE_TOKEN        AAAAAfAd                                          
	INTERNAL             HashPkgID:14c78bfe,LoadingBit:0                   

	  3 record(s) selected.

	[db2inst1@oc6748481478 ~]$ db2 "SELECT SUBSTR(NAME,1,20) AS NAME,SUBSTR(VALUE,1,50) AS VALUE FROM TABLE( MON_FORMAT_LOCK_NAME('03001000000000000000000054')) as LOCKS"

	NAME                 VALUE                                             
	-------------------- --------------------------------------------------
	LOCK_OBJECT_TYPE     TABLE                                             
	TBSP_NAME            IBMDB2SAMPLEREL                                   
	TABSCHEMA            DB2INST1                                          
	TABNAME              T1                                                

	  4 record(s) selected.

	[db2inst1@oc6748481478 ~]$

#### 关于Lockname的总结


例如：

十六进制：

03001000080000000000000052


0300 1000 080000000000 0000 52

两个字节是表空间ID，03

两个字节是表ID，10

8个字节：表分区2字节，数据页4字节，SLOT 2字节，

两个字节是锁ID，00

最后一个字节是锁类型 52

表空间ID：0003，表ID：0010，表分区0000，数据页00000000，SLOT:0008, 锁类型：52

化成10进制，你的表空间ID是3，表ID是16，ROWID是0000 0000 0000 00008=8。


用下面的方法看看是哪张表：

	[db2inst1@oc6748481478 ~]$ db2 "select substr(TABSCHEMA,1,20) as tabschema,substr(TABNAME,1,20) as tabname,tbspaceid,tableid from syscat.tables where tabname='T1'"

	TABSCHEMA            TABNAME              TBSPACEID TABLEID
	-------------------- -------------------- --------- -------
	DB2INST1             T1                           3      16

	  1 record(s) selected.

	[db2inst1@oc6748481478 ~]$ 
	[db2inst1@oc6748481478 ~]$ db2 "select col1,rid() as rid  from t1 where rid()>0"

	COL1                 RID                 
	-------------------- --------------------
	a1                                      4
	a2                                      5
	a3                                      6
	a4                                      7
	a5                                      8
	a6                                      9

	  6 record(s) selected.

	[db2inst1@oc6748481478 ~]$ 




#### 参考资料


[MON_FORMAT_LOCK_NAME table function - Format the internal lock name and return details](http://www.ibm.com/support/knowledgecenter/SSEPGG_10.5.0/com.ibm.db2.luw.sql.rtn.doc/doc/r0056427.html?cp=SSEPGG_10.5.0%2F3-6-1-3-10-5&lang=en)

	
---

