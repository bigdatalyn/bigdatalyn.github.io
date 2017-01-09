---
layout: post
title: "[原创]Oracle控制文件"
date:   2016-12-09 11:30:00
category: Oracle
tags: Oracle 
---

* content
{:toc}


Oracle控制文件恢复相关笔记





### 1.控制文件丢失

ORA-00205错误：在alert中有详细的信息描述是那个控制文件丢失问题

cp多路复用的控制文件

### 2.控制文件中某些block损坏情况

如果是后面的block，库还是可以mount的

如果是前几个block，os block/head block的问题，则库是起不了

cp多路复用的控制文件或者dd if=control02.ctl of control01.ctl bs=16384 count=2 conv=notrunc 来复制对应的block内容

### 3.恢复controlfile

restore controlfile from "绝对路径";

#### 3.1 如果控制文件是自动备份的设置，alert日志有记录控制文件备份路径
 
#### 3.2 如果控制文件不是自动备份，但有snapshot controlfile，可以从快照控制文件中获取

### 4.恢复完contolfile之后，控制文件比较旧，重建控制文件即可，怎么重建控制文件？


有两种方式，resetlogs/noresetlogs


重建控制文件

#### step1：获取重建控制文件脚本

	SYS@PROD1> oradebug setmypid
	Statement processed.
	SYS@PROD1> alter database backup controlfile to trace;

	Database altered.

	SYS@PROD1> oradebug tracefile_name;
	/u01/app/oracle/diag/rdbms/prod1/PROD1/trace/PROD1_ora_10964.trc
	SYS@PROD1> 

#### step2：查看确认控制文件脚本

	[oracle@tc_hong01 trace]$ cat /u01/app/oracle/diag/rdbms/prod1/PROD1/trace/PROD1_ora_10964.trc
	Trace file /u01/app/oracle/diag/rdbms/prod1/PROD1/trace/PROD1_ora_10964.trc
	Oracle Database 11g Enterprise Edition Release 11.2.0.3.0 - Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options
	ORACLE_HOME = /u01/app/oracle/product/11.2.0/dbhome_1
	System name:    Linux
	Node name:      tc_hong01
	Release:        2.6.18-164.el5PAE
	Version:        #1 SMP Thu Sep 3 02:28:20 EDT 2009
	Machine:        i686
	VM name:        VMWare Version: 6
	Instance name: PROD1
	Redo thread mounted by this instance: 1
	Oracle process number: 19
	Unix process pid: 10964, image: oracle@tc_hong01 (TNS V1-V3)


	*** 2016-12-12 13:13:32.297
	*** SESSION ID:(125.7) 2016-12-12 13:13:32.297
	*** CLIENT ID:() 2016-12-12 13:13:32.297
	*** SERVICE NAME:(SYS$USERS) 2016-12-12 13:13:32.297
	*** MODULE NAME:(sqlplus@tc_hong01 (TNS V1-V3)) 2016-12-12 13:13:32.297
	*** ACTION NAME:() 2016-12-12 13:13:32.297
	 
	Processing Oradebug command 'setmypid'

	*** 2016-12-12 13:13:32.297
	Oradebug command 'setmypid' console output: <none>

	*** 2016-12-12 13:13:43.464
	-- The following are current System-scope REDO Log Archival related
	-- parameters and can be included in the database initialization file.
	--
	-- LOG_ARCHIVE_DEST=''
	-- LOG_ARCHIVE_DUPLEX_DEST=''
	--
	-- LOG_ARCHIVE_FORMAT=%t_%s_%r.dbf
	--
	-- DB_UNIQUE_NAME="PROD1"
	--
	-- LOG_ARCHIVE_CONFIG='SEND, RECEIVE, NODG_CONFIG'
	-- LOG_ARCHIVE_MAX_PROCESSES=4
	-- STANDBY_FILE_MANAGEMENT=MANUAL
	-- STANDBY_ARCHIVE_DEST=?/dbs/arch
	-- FAL_CLIENT=''
	-- FAL_SERVER=''
	--
	-- LOG_ARCHIVE_DEST_1='LOCATION=/u01/app/oracle/product/11.2.0/dbhome_1/dbs/arch'
	-- LOG_ARCHIVE_DEST_1='MANDATORY NOREOPEN NODELAY'
	-- LOG_ARCHIVE_DEST_1='ARCH NOAFFIRM EXPEDITE NOVERIFY SYNC'
	-- LOG_ARCHIVE_DEST_1='NOREGISTER NOALTERNATE NODEPENDENCY'
	-- LOG_ARCHIVE_DEST_1='NOMAX_FAILURE NOQUOTA_SIZE NOQUOTA_USED NODB_UNIQUE_NAME'
	-- LOG_ARCHIVE_DEST_1='VALID_FOR=(PRIMARY_ROLE,ONLINE_LOGFILES)'
	-- LOG_ARCHIVE_DEST_STATE_1=ENABLE
	--
	-- Below are two sets of SQL statements, each of which creates a new
	-- control file and uses it to open the database. The first set opens
	-- the database with the NORESETLOGS option and should be used only if
	-- the current versions of all online logs are available. The second
	-- set opens the database with the RESETLOGS option and should be used
	-- if online logs are unavailable.
	-- The appropriate set of statements can be copied from the trace into
	-- a script file, edited as necessary, and executed when there is a
	-- need to re-create the control file.
	--
	--     Set #1. NORESETLOGS case
	--
	-- The following commands will create a new control file and use it
	-- to open the database.
	-- Data used by Recovery Manager will be lost.
	-- Additional logs may be required for media recovery of offline
	-- Use this only if the current versions of all online logs are
	-- available.
	-- After mounting the created controlfile, the following SQL
	-- statement will place the database in the appropriate
	-- protection mode:
	--  ALTER DATABASE SET STANDBY DATABASE TO MAXIMIZE PERFORMANCE
	STARTUP NOMOUNT
	CREATE CONTROLFILE REUSE DATABASE "PROD1" NORESETLOGS  NOARCHIVELOG
	    MAXLOGFILES 16
	    MAXLOGMEMBERS 3
	    MAXDATAFILES 100
	    MAXINSTANCES 8
	    MAXLOGHISTORY 292
	LOGFILE
	  GROUP 1 '/u01/app/oracle/oradata/PROD1/redo01.log'  SIZE 50M BLOCKSIZE 512,
	  GROUP 2 '/u01/app/oracle/oradata/PROD1/redo02.log'  SIZE 50M BLOCKSIZE 512,
	  GROUP 3 '/u01/app/oracle/oradata/PROD1/redo03.log'  SIZE 50M BLOCKSIZE 512
	-- STANDBY LOGFILE
	DATAFILE
	  '/u01/app/oracle/oradata/PROD1/system01.dbf',
	  '/u01/app/oracle/oradata/PROD1/sysaux01.dbf',
	  '/u01/app/oracle/oradata/PROD1/undotbs01.dbf',
	  '/u01/app/oracle/oradata/PROD1/users01.dbf',
	  '/u01/app/oracle/oradata/PROD1/example01.dbf'
	CHARACTER SET AL32UTF8
	;
	-- Commands to re-create incarnation table
	-- Below log names MUST be changed to existing filenames on
	-- disk. Any one log file from each branch can be used to
	-- re-create incarnation records.
	-- ALTER DATABASE REGISTER LOGFILE '/u01/app/oracle/product/11.2.0/dbhome_1/dbs/arch1_1_762197622.dbf';
	-- ALTER DATABASE REGISTER LOGFILE '/u01/app/oracle/product/11.2.0/dbhome_1/dbs/arch1_1_860888149.dbf';
	-- Recovery is required if any of the datafiles are restored backups,
	-- or if the last shutdown was not normal or immediate.
	RECOVER DATABASE
	-- Database can now be opened normally.
	ALTER DATABASE OPEN;
	-- Commands to add tempfiles to temporary tablespaces.
	-- Online tempfiles have complete space information.
	-- Other tempfiles may require adjustment.
	ALTER TABLESPACE TEMP ADD TEMPFILE '/u01/app/oracle/oradata/PROD1/temp01.dbf'
	     SIZE 30408704  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	-- End of tempfile additions.
	--
	--     Set #2. RESETLOGS case
	--
	-- The following commands will create a new control file and use it
	-- to open the database.
	-- Data used by Recovery Manager will be lost.
	-- The contents of online logs will be lost and all backups will
	-- be invalidated. Use this only if online logs are damaged.
	-- After mounting the created controlfile, the following SQL
	-- statement will place the database in the appropriate
	-- protection mode:
	--  ALTER DATABASE SET STANDBY DATABASE TO MAXIMIZE PERFORMANCE
	STARTUP NOMOUNT
	CREATE CONTROLFILE REUSE DATABASE "PROD1" RESETLOGS  NOARCHIVELOG
	    MAXLOGFILES 16
	    MAXLOGMEMBERS 3
	    MAXDATAFILES 100
	    MAXINSTANCES 8
	    MAXLOGHISTORY 292
	LOGFILE
	  GROUP 1 '/u01/app/oracle/oradata/PROD1/redo01.log'  SIZE 50M BLOCKSIZE 512,
	  GROUP 2 '/u01/app/oracle/oradata/PROD1/redo02.log'  SIZE 50M BLOCKSIZE 512,
	  GROUP 3 '/u01/app/oracle/oradata/PROD1/redo03.log'  SIZE 50M BLOCKSIZE 512
	-- STANDBY LOGFILE
	DATAFILE
	  '/u01/app/oracle/oradata/PROD1/system01.dbf',
	  '/u01/app/oracle/oradata/PROD1/sysaux01.dbf',
	  '/u01/app/oracle/oradata/PROD1/undotbs01.dbf',
	  '/u01/app/oracle/oradata/PROD1/users01.dbf',
	  '/u01/app/oracle/oradata/PROD1/example01.dbf'
	CHARACTER SET AL32UTF8
	;
	-- Commands to re-create incarnation table
	-- Below log names MUST be changed to existing filenames on
	-- disk. Any one log file from each branch can be used to
	-- re-create incarnation records.
	-- ALTER DATABASE REGISTER LOGFILE '/u01/app/oracle/product/11.2.0/dbhome_1/dbs/arch1_1_762197622.dbf';
	-- ALTER DATABASE REGISTER LOGFILE '/u01/app/oracle/product/11.2.0/dbhome_1/dbs/arch1_1_860888149.dbf';
	-- Recovery is required if any of the datafiles are restored backups,
	-- or if the last shutdown was not normal or immediate.
	RECOVER DATABASE USING BACKUP CONTROLFILE
	-- Database can now be opened zeroing the online logs.
	ALTER DATABASE OPEN RESETLOGS;
	-- Commands to add tempfiles to temporary tablespaces.
	-- Online tempfiles have complete space information.
	-- Other tempfiles may require adjustment.
	ALTER TABLESPACE TEMP ADD TEMPFILE '/u01/app/oracle/oradata/PROD1/temp01.dbf'
	     SIZE 30408704  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	-- End of tempfile additions.
	--

	*** 2016-12-12 13:13:59.346
	Processing Oradebug command 'tracefile_name'

	*** 2016-12-12 13:13:59.346
	Oradebug command 'tracefile_name' console output: 
	/u01/app/oracle/diag/rdbms/prod1/PROD1/trace/PROD1_ora_10964.trc
	[oracle@tc_hong01 trace]$ 


#### step3: 确认内容

	--  ALTER DATABASE SET STANDBY DATABASE TO MAXIMIZE PERFORMANCE
	STARTUP NOMOUNT
	CREATE CONTROLFILE REUSE DATABASE "PROD1" NORESETLOGS  NOARCHIVELOG
	    MAXLOGFILES 16
	    MAXLOGMEMBERS 3
	    MAXDATAFILES 100
	    MAXINSTANCES 8
	    MAXLOGHISTORY 292
	LOGFILE
	  GROUP 1 '/u01/app/oracle/oradata/PROD1/redo01.log'  SIZE 50M BLOCKSIZE 512,
	  GROUP 2 '/u01/app/oracle/oradata/PROD1/redo02.log'  SIZE 50M BLOCKSIZE 512,
	  GROUP 3 '/u01/app/oracle/oradata/PROD1/redo03.log'  SIZE 50M BLOCKSIZE 512
	-- STANDBY LOGFILE
	DATAFILE
	  '/u01/app/oracle/oradata/PROD1/system01.dbf',
	  '/u01/app/oracle/oradata/PROD1/sysaux01.dbf',
	  '/u01/app/oracle/oradata/PROD1/undotbs01.dbf',
	  '/u01/app/oracle/oradata/PROD1/users01.dbf',
	  '/u01/app/oracle/oradata/PROD1/example01.dbf'
	CHARACTER SET AL32UTF8
	;
	-- Commands to re-create incarnation table
	-- Below log names MUST be changed to existing filenames on
	-- disk. Any one log file from each branch can be used to
	-- re-create incarnation records.
	-- ALTER DATABASE REGISTER LOGFILE '/u01/app/oracle/product/11.2.0/dbhome_1/dbs/arch1_1_762197622.dbf';
	-- ALTER DATABASE REGISTER LOGFILE '/u01/app/oracle/product/11.2.0/dbhome_1/dbs/arch1_1_860888149.dbf';
	-- Recovery is required if any of the datafiles are restored backups,
	-- or if the last shutdown was not normal or immediate.
	RECOVER DATABASE
	-- Database can now be opened normally.
	ALTER DATABASE OPEN;
	-- Commands to add tempfiles to temporary tablespaces.
	-- Online tempfiles have complete space information.
	-- Other tempfiles may require adjustment.
	ALTER TABLESPACE TEMP ADD TEMPFILE '/u01/app/oracle/oradata/PROD1/temp01.dbf'
	     SIZE 30408704  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	-- End of tempfile additions.


a.归档还是非归档 有归档的话-->redo信息-->不能resetlogs方式打开

b.字符集 通过以下参照

select * from v$nls_parameters;

NLS_NCHAR_CHARACTERSET                                           AL16UTF16

或者dd方式打开block

10g是在file#1的722块上

11g是在file#1的801块上

	dd if=system01.dbf of=test bs=8192 skip=722 count=1

	strings test

c.数据库名




