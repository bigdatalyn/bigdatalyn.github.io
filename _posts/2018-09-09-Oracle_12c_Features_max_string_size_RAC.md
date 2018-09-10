---
layout: post
title: "Oracle Setting max_string_size in RAC Tips"
category: Oracle
tags: Oracle ADWC
---

* content
{:toc}



Oracle Setting max_string_size in 18c RAC Tips
	
要使用扩展字符类型，单实例如下需要执行以下过程： 

	1.关闭数据库 
	2.以升级模式重启数据库
	3.更改参数: ALTER SYSTEM SET MAX_STRING_SIZE=EXTENDED;
	4.执行 utl32k.sql as sysdba :SQL> @?/rdbms/admin/utl32k.sql 
	5.关闭数据库 
	6.以读写模式重启数据库
	
	
	
	
	
	
	
	
	

How about setting max_string_size in RAC env?

#### Step01. Modify the cluster_database = false

	$ sqlplus / as sysdba

	SQL*Plus: Release 18.0.0.0.0 - Production on Mon Sep 09 17:30:02 2018
	Version 18.3.0.0.0

	Copyright (c) 1982, 2018, Oracle.  All rights reserved.


	Connected to:
	Oracle Database 18c Enterprise Edition Release 18.0.0.0.0 - Production
	Version 18.3.0.0.0

	SQL> alter system set cluster_database = false scope = spfile;

	System altered.

	SQL> 

#### Step02. Stop all instance/database

	$ srvctl stop database -d dbm01


#### Step03. Startup upgrade in one instance.

	$ sqlplus / as sysdba

	SQL*Plus: Release 18.0.0.0.0 - Production on Mon Sep 09 17:32:17 2018
	Version 18.3.0.0.0

	Copyright (c) 1982, 2018, Oracle.  All rights reserved.

	Connected to an idle instance.

	SQL> startup upgrade
	ORACLE instance started.

	Total System Global Area 1.7167E+10 bytes
	Fixed Size		   19295080 bytes
	Variable Size		 2550136832 bytes
	Database Buffers	 1.4563E+10 bytes
	Redo Buffers		   34705408 bytes
	Database mounted.
	Database opened.
	SQL> 

Also execute the following sql.

	alter system set MAX_STRING_SIZE=EXTENDED;
	@?/rdbms/admin/utl32k.sql
	alter system set cluster_database = true scope = spfile;
	SHUTDOWN IMMEDIATE;

#### Step04. Start all instance/database.

	$ srvctl start database -d dbm01          


#### Step05. Test

	SQL> create table t1(a nvarchar2(4001));

	Table created.

	SQL> drop table t1;

	Table dropped.

	SQL> 


To be continue....

Have a good life! 2018/09 via LinHong



