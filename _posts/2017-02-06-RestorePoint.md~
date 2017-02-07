---
layout: post
title: "Oracle 11g - Guaranteed Restore Points测试"
category: Oracle
tags: Restore points 
---

* content
{:toc}


一般来说，Flashback Database 和 restore points 都可以提供一个基于时间点的回滚。 

对于flashback database我们比较熟悉，restore point基于时间点的回滚主要用于升级过程中，出现问题了，需要回滚到升级前的状态





### Restore Points

Restore Point 同Flashback Database 一样，也会产生image 文件，在没有启用Flashback Database的情况下，只在开始时创建一次image，并保存在FRA中。 

Restore points又分为Normal Restore Points（普通的）和Guaranteed Restore Points（受保护的）

`区别在于受保护的restore point需要手动清理point信息`

在不启用FlashbackDatabase 的情况下， Guaranteed restore point 只能restore到我们创建的点对应的SCN.

当我们创建了一个Guaranteed Restore Points，并且我们没有启动Flashback Database，那么在这种情况下，DB 会也会创建一个block 的镜像，并存在FRA空间里，这个和Flashback Database 的一致，那么不同的时，Flashback Database 会每隔一段时间创建一个block的image，而Restore Points 只在开始时创建一次，那么恢复的时候也就只能恢复到这个时间点。

### 测试

没有开启 flashback database的测试Guaranteed Restore Points：

	SYS@PROD1> show parameter db_recovery

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	db_recovery_file_dest                string      /u01/app/oracle/fast_recovery_
													 area
	db_recovery_file_dest_size           big integer 4G
	SYS@PROD1> show parameter db_flashback

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	db_flashback_retention_target        integer     1440
	SYS@PROD1> select flashback_on from v$database;

	FLASHBACK_ON
	------------------
	NO

	SYS@PROD1> shutdown immediate;
	Database closed.
	Database dismounted.
	ORACLE instance shut down.
	SYS@PROD1> 

---- 不能shutdown abort（下次启动会进行recover操作，需要清除关闭），否则不能创建point

需要在mount模式下创建point：

	SYS@PROD1> startup mount;
	ORACLE instance started.

	Total System Global Area  418484224 bytes
	Fixed Size                  1345352 bytes
	Variable Size             285214904 bytes
	Database Buffers          125829120 bytes
	Redo Buffers                6094848 bytes
	Database mounted.
	SYS@PROD1> 

	SYS@PROD1> create restore point mypoint_01 guarantee flashback database;

	Restore point created.

	SYS@PROD1> 

通过RMAN可以查看

	[oracle@tc_hong01 ~]$ rman target /

	Recovery Manager: Release 11.2.0.3.0 - Production on Mon Feb 6 15:55:07 2017

	Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.

	connected to target database: PROD1 (DBID=2082231315, not open)

	RMAN> list restore point all; ------------- 创建之前没有

	using target database control file instead of recovery catalog
	SCN              RSP Time  Type       Time      Name
	---------------- --------- ---------- --------- ----

	RMAN> list restore point all; ------------- 创建之后有:MYPOINT_01

	SCN              RSP Time  Type       Time      Name
	---------------- --------- ---------- --------- ----
	1710286                    GUARANTEED 06-FEB-17 MYPOINT_01

	RMAN> 


模拟升级操作：

	SYS@PROD1> !ls -ltr $ORACLE_HOME/rdbms/admin/catupgrd.sql
	-rw-r--r-- 1 oracle oinstall 4517 May 18  2011 /u01/app/oracle/product/11.2.0/dbhome_1/rdbms/admin/catupgrd.sql

	SYS@PROD1> @?/rdbms/admin/catupgrd.sql
	DOC>#######################################################################
	DOC>#######################################################################
	DOC>
	DOC>   The first time this script is run, there should be no error messages
	DOC>   generated; all normal upgrade error messages are suppressed.
	DOC>
	DOC>   If this script is being re-run after correcting some problem, then
	DOC>   expect the following error which is not automatically suppressed:
	DOC>
	DOC>   ORA-00001: unique constraint (<constraint_name>) violated
	DOC>              possibly in conjunction with
	DOC>   ORA-06512: at "<procedure/function name>", line NN
	DOC>
	DOC>   These errors will automatically be suppressed by the Database Upgrade
	DOC>   Assistant (DBUA) when it re-runs an upgrade.
	DOC>
	DOC>#######################################################################
	DOC>#######################################################################
	DOC>#
	DOC>######################################################################
	DOC>######################################################################
	DOC>    The following statement will cause an "ORA-01722: invalid number"
	DOC>    error if the user running this script is not SYS.  Disconnect
	DOC>    and reconnect with AS SYSDBA.
	DOC>######################################################################
	DOC>######################################################################
	DOC>#

	no rows selected

	DOC>######################################################################
	DOC>######################################################################
	DOC>    The following statement will cause an "ORA-01722: invalid number"
	DOC>    error if the database server version is not correct for this script.
	DOC>    Perform "ALTER SYSTEM CHECKPOINT" prior to "SHUTDOWN ABORT", and use
	DOC>    a different script or a different server.
	DOC>######################################################################
	DOC>######################################################################
	DOC>#

	no rows selected

	DOC>#######################################################################
	DOC>#######################################################################
	DOC>   The following statement will cause an "ORA-01722: invalid number"
	DOC>   error if the database has not been opened for UPGRADE.
	DOC>
	DOC>   Perform "ALTER SYSTEM CHECKPOINT" prior to "SHUTDOWN ABORT",  and
	DOC>   restart using UPGRADE.
	DOC>#######################################################################
	DOC>#######################################################################
	DOC>#
	SELECT TO_NUMBER('MUST_BE_OPEN_UPGRADE') FROM v$instance
					 *
	ERROR at line 1:
	ORA-01722: invalid number


	Disconnected from Oracle Database 11g Enterprise Edition Release 11.2.0.3.0 - Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options
	[oracle@tc_hong01 ~]$ 

模拟创建一个过程表：

	SYS@PROD1> alter database open;

	Database altered.

	SYS@PROD1> create table mypoint_tab01 as select * from dba_objects;

	Table created.

	SYS@PROD1> select count(*) from mypoint_tab01;

	  COUNT(*)
	----------
		 75323

	SYS@PROD1> 


模拟回滚到之前 MYPOINT_01 点的数据状态：

需要mount状态下flashback，并且需要resetlogs打开

	SYS@PROD1> shu immediate;
	Database closed.
	Database dismounted.
	ORACLE instance shut down.
	SYS@PROD1> startup mount;
	ORACLE instance started.

	Total System Global Area  418484224 bytes
	Fixed Size                  1345352 bytes
	Variable Size             285214904 bytes
	Database Buffers          125829120 bytes
	Redo Buffers                6094848 bytes
	Database mounted.
	SYS@PROD1> select  flashback_on from v$database;

	FLASHBACK_ON
	------------------
	RESTORE POINT ONLY

	SYS@PROD1> flashback database to restore point MYPOINT_01;

	Flashback complete.

	SYS@PROD1> alter database open; ----------- 直接open打不开库
	alter database open
	*
	ERROR at line 1:
	ORA-01589: must use RESETLOGS or NORESETLOGS option for database open


	SYS@PROD1> alter database open resetlogs;

	Database altered.

	SYS@PROD1> select count(*) from mypoint_tab01;
	select count(*) from mypoint_tab01
						 *
	ERROR at line 1:
	ORA-00942: table or view does not exist


	SYS@PROD1> 


升级回滚之后，一般执行无效对象的删除

	SYS@PROD1> @?/rdbms/admin/utlrp.sql

	TIMESTAMP
	--------------------------------------------------------------------------------
	COMP_TIMESTAMP UTLRP_BGN  2017-02-06 16:05:15

	DOC>   The following PL/SQL block invokes UTL_RECOMP to recompile invalid
	DOC>   objects in the database. Recompilation time is proportional to the
	DOC>   number of invalid objects in the database, so this command may take
	DOC>   a long time to execute on a database with a large number of invalid
	DOC>   objects.
	DOC>
	DOC>   Use the following queries to track recompilation progress:
	DOC>
	DOC>   1. Query returning the number of invalid objects remaining. This
	DOC>      number should decrease with time.
	DOC>         SELECT COUNT(*) FROM obj$ WHERE status IN (4, 5, 6);
	DOC>
	DOC>   2. Query returning the number of objects compiled so far. This number
	DOC>      should increase with time.
	DOC>         SELECT COUNT(*) FROM UTL_RECOMP_COMPILED;
	DOC>
	DOC>   This script automatically chooses serial or parallel recompilation
	DOC>   based on the number of CPUs available (parameter cpu_count) multiplied
	DOC>   by the number of threads per CPU (parameter parallel_threads_per_cpu).
	DOC>   On RAC, this number is added across all RAC nodes.
	DOC>
	DOC>   UTL_RECOMP uses DBMS_SCHEDULER to create jobs for parallel
	DOC>   recompilation. Jobs are created without instance affinity so that they
	DOC>   can migrate across RAC nodes. Use the following queries to verify
	DOC>   whether UTL_RECOMP jobs are being created and run correctly:
	DOC>
	DOC>   1. Query showing jobs created by UTL_RECOMP
	DOC>         SELECT job_name FROM dba_scheduler_jobs
	DOC>            WHERE job_name like 'UTL_RECOMP_SLAVE_%';
	DOC>
	DOC>   2. Query showing UTL_RECOMP jobs that are running
	DOC>         SELECT job_name FROM dba_scheduler_running_jobs
	DOC>            WHERE job_name like 'UTL_RECOMP_SLAVE_%';
	DOC>#

	PL/SQL procedure successfully completed.


	TIMESTAMP
	--------------------------------------------------------------------------------
	COMP_TIMESTAMP UTLRP_END  2017-02-06 16:05:19

	DOC> The following query reports the number of objects that have compiled
	DOC> with errors (objects that compile with errors have status set to 3 in
	DOC> obj$). If the number is higher than expected, please examine the error
	DOC> messages reported with each object (using SHOW ERRORS) to see if they
	DOC> point to system misconfiguration or resource constraints that must be
	DOC> fixed before attempting to recompile these objects.
	DOC>#

	OBJECTS WITH ERRORS
	-------------------
					  0

	DOC> The following query reports the number of errors caught during
	DOC> recompilation. If this number is non-zero, please query the error
	DOC> messages in the table UTL_RECOMP_ERRORS to see if any of these errors
	DOC> are due to misconfiguration or resource constraints that must be
	DOC> fixed before objects can compile successfully.
	DOC>#

	ERRORS DURING RECOMPILATION
	---------------------------
							  0


	Function created.


	PL/SQL procedure successfully completed.


	Function dropped.


	PL/SQL procedure successfully completed.

	SYS@PROD1> 

因为是受保护模式的point，最后需要手动清除restore point


	SYS@PROD1> select flashback_on from v$database;

	FLASHBACK_ON
	------------------
	RESTORE POINT ONLY

	SYS@PROD1>  drop restore point MYPOINT_01;

	Restore point dropped.

	SYS@PROD1> select flashback_on from v$database;

	FLASHBACK_ON
	------------------
	NO

	SYS@PROD1> 


	RMAN> list restore point all;

	using target database control file instead of recovery catalog
	SCN              RSP Time  Type       Time      Name
	---------------- --------- ---------- --------- ----

	RMAN> 

另外，在DG过程中，切换snapshot standby时候：

	SQL> alter database convert to snapshot standby;
 
我们查看日志可以发现里面有创建一个restore point:

	Created guaranteed restore point SNAPSHOT_STANDBY_REQUIRED_xxx 


---- 完工







