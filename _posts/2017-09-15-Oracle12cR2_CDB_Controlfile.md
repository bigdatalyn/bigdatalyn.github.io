---
layout: post
title: "[原创]Oracle12cR2_通过控制文件查看cdb的结构"
category: Oracle
tags: Oracle 12c CDB controlfile
---

* content
{:toc}


[原创]Oracle12cR2_通过控制文件查看cdb的结构

通过trace控制文件可以清楚了解CDB的结构











### 生成controlfile控制文件的trace文件


> alter database backup controlfile to trace;  

参考如下：

	[oracle@databasevm ~]$ ps -ef | grep smon                                                                                        
	oracle    8840     1  0 10:20 ?        00:00:00 ora_smon_PRODCDB                                                                 
	oracle   14087 12387  0 13:45 pts/0    00:00:00 grep --color=auto smon                                                           
	[oracle@databasevm ~]$ export ORACLE_SID=PRODCDB;sqlplus / as sysdba                                                             

	SQL*Plus: Release 12.2.0.1.0 Production on Fri Sep 22 13:46:01 2017

	Copyright (c) 1982, 2016, Oracle.  All rights reserved.

	Connected to:
	Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production

	SQL> show con_name                                                                                                               

	CON_NAME
	------------------------------
	CDB$ROOT
	SQL> alter database backup controlfile to trace;                                                                                 

	Database altered.

	SQL> desc v$diag_info                                                                                                            
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 INST_ID                                            NUMBER
	 NAME                                               VARCHAR2(64)
	 VALUE                                              VARCHAR2(512)
	 CON_ID                                             NUMBER

	SQL> col name for a30    
	SQL> col value format a70  	
	SQL> set linesize 1000 pagesize 1000
	SQL> select inst_id,name,value from v$diag_info;                                                                                 

	   INST_ID NAME                           VALUE
	---------- ------------------------------ ----------------------------------------------------------------------
			 1 Diag Enabled                   TRUE
			 1 ADR Base                       /opt/oracle
			 1 ADR Home                       /opt/oracle/diag/rdbms/prodcdb/PRODCDB
			 1 Diag Trace                     /opt/oracle/diag/rdbms/prodcdb/PRODCDB/trace
			 1 Diag Alert                     /opt/oracle/diag/rdbms/prodcdb/PRODCDB/alert
			 1 Diag Incident                  /opt/oracle/diag/rdbms/prodcdb/PRODCDB/incident
			 1 Diag Cdump                     /opt/oracle/diag/rdbms/prodcdb/PRODCDB/cdump
			 1 Health Monitor                 /opt/oracle/diag/rdbms/prodcdb/PRODCDB/hm
			 1 Default Trace File             /opt/oracle/diag/rdbms/prodcdb/PRODCDB/trace/PRODCDB_ora_14090.trc
			 1 Active Problem Count           0
			 1 Active Incident Count          0

	11 rows selected.

	SQL>     
	
其中Default Trace File的为地址是：Default Trace File
	
	
### 查看Trace文件 

内容如下：

	SQL> !cat /opt/oracle/diag/rdbms/prodcdb/PRODCDB/trace/PRODCDB_ora_14090.trc                                                     
	Trace file /opt/oracle/diag/rdbms/prodcdb/PRODCDB/trace/PRODCDB_ora_14090.trc
	Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production
	Build label:    RDBMS_12.2.0.1.0_LINUX.X64_170125
	ORACLE_HOME:    /opt/oracle/product/12.2.0.1/db_1
	System name:    Linux
	Node name:      databasevm.localdomain
	Release:        4.1.12-61.1.28.el7uek.x86_64
	Version:        #2 SMP Thu Feb 23 19:55:12 PST 2017
	Machine:        x86_64
	Instance name: PRODCDB
	Redo thread mounted by this instance: 1
	Oracle process number: 28
	Unix process pid: 14090, image: oracle@databasevm.localdomain (TNS V1-V3)


	*** 2017-09-12T13:46:28.922212+08:00 (CDB$ROOT(1))
	*** SESSION ID:(16.52090) 2017-09-12T13:46:28.922289+08:00
	*** CLIENT ID:() 2017-09-12T13:46:28.922299+08:00
	*** SERVICE NAME:(SYS$USERS) 2017-09-12T13:46:28.922304+08:00
	*** MODULE NAME:(sqlplus@databasevm.localdomain (TNS V1-V3)) 2017-09-12T13:46:28.922311+08:00
	*** ACTION NAME:() 2017-09-12T13:46:28.922315+08:00
	*** CLIENT DRIVER:(SQL*PLUS) 2017-09-12T13:46:28.922318+08:00
	*** CONTAINER ID:(1) 2017-09-12T13:46:28.922322+08:00
	 
	-- The following are current System-scope REDO Log Archival related
	-- parameters and can be included in the database initialization file.
	--
	-- LOG_ARCHIVE_DEST=''
	-- LOG_ARCHIVE_DUPLEX_DEST=''
	--
	-- LOG_ARCHIVE_FORMAT=%t_%s_%r.dbf
	--
	-- DB_UNIQUE_NAME="PRODCDB"
	--
	-- LOG_ARCHIVE_CONFIG='SEND, RECEIVE, NODG_CONFIG'
	-- LOG_ARCHIVE_MAX_PROCESSES=4
	-- STANDBY_FILE_MANAGEMENT=MANUAL
	-- STANDBY_ARCHIVE_DEST=?#/dbs/arch
	-- FAL_CLIENT=''
	-- FAL_SERVER=''
	--
	-- LOG_ARCHIVE_DEST_1='LOCATION=USE_DB_RECOVERY_FILE_DEST'
	-- LOG_ARCHIVE_DEST_1='MANDATORY NOREOPEN NODELAY'
	-- LOG_ARCHIVE_DEST_1='ARCH NOAFFIRM NOVERIFY SYNC'
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
	CREATE CONTROLFILE REUSE DATABASE "PRODCDB" NORESETLOGS  NOARCHIVELOG
		MAXLOGFILES 16
		MAXLOGMEMBERS 3
		MAXDATAFILES 1024
		MAXINSTANCES 1
		MAXLOGHISTORY 292
	LOGFILE
	  GROUP 1 (
		'/opt/oracle/oradata/PRODCDB/redo01a.log',
		'/opt/oracle/oradata/PRODCDB/redo01b.log'
	  ) SIZE 100M BLOCKSIZE 512,
	  GROUP 2 (
		'/opt/oracle/oradata/PRODCDB/redo02a.log',
		'/opt/oracle/oradata/PRODCDB/redo02b.log'
	  ) SIZE 100M BLOCKSIZE 512,
	  GROUP 3 (
		'/opt/oracle/oradata/PRODCDB/redo03a.log',
		'/opt/oracle/oradata/PRODCDB/redo03b.log'
	  ) SIZE 100M BLOCKSIZE 512
	-- STANDBY LOGFILE
	DATAFILE
	  '/opt/oracle/oradata/PRODCDB/system01.dbf',
	  '/opt/oracle/oradata/pdbseed/system01.dbf',
	  '/opt/oracle/oradata/PRODCDB/sysaux01.dbf',
	  '/opt/oracle/oradata/pdbseed/sysaux01.dbf',
	  '/opt/oracle/oradata/PRODCDB/undotbs01.dbf',
	  '/opt/oracle/oradata/pdbseed/undotbs01.dbf',
	  '/opt/oracle/oradata/PRODCDB/deftbs01.dbf',
	  '/opt/oracle/oradata/pdbseed/deftbs01.dbf',
	  '/opt/oracle/oradata/pdb1/system01.dbf',
	  '/opt/oracle/oradata/pdb1/sysaux01.dbf',
	  '/opt/oracle/oradata/pdb1/undotbs01.dbf',
	  '/opt/oracle/oradata/pdb1/deftbs01.dbf',
	  '/opt/oracle/oradata/pdb2/system01.dbf',
	  '/opt/oracle/oradata/pdb2/sysaux01.dbf',
	  '/opt/oracle/oradata/pdb2/undotbs01.dbf',
	  '/opt/oracle/oradata/pdb2/deftbs01.dbf',
	  '/opt/oracle/oradata/pdb3/system01.dbf',
	  '/opt/oracle/oradata/pdb3/sysaux01.dbf',
	  '/opt/oracle/oradata/pdb3/undotbs01.dbf',
	  '/opt/oracle/oradata/pdb3/deftbs01.dbf'
	CHARACTER SET AL32UTF8
	;
	-- Commands to re-create incarnation table
	-- Below log names MUST be changed to existing filenames on
	-- disk. Any one log file from each branch can be used to
	-- re-create incarnation records.
	-- ALTER DATABASE REGISTER LOGFILE '/opt/oracle/fast_recovery_area/PRODCDB/archivelog/2017_09_22/o1_mf_1_1_%u_.arc';
	-- Recovery is required if any of the datafiles are restored backups,
	-- or if the last shutdown was not normal or immediate.
	RECOVER DATABASE
	-- Database can now be opened normally.
	ALTER DATABASE OPEN;
	-- Open all the PDBs.
	ALTER PLUGGABLE DATABASE ALL OPEN;
	-- Commands to add tempfiles to temporary tablespaces.
	-- Online tempfiles have complete space information.
	-- Other tempfiles may require adjustment.
	ALTER TABLESPACE TEMPTS1 ADD TEMPFILE '/opt/oracle/oradata/PRODCDB/temp01.dbf'
		 SIZE 20971520  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	ALTER SESSION SET CONTAINER = PDB$SEED;
	ALTER TABLESPACE TEMPTS1 ADD TEMPFILE '/opt/oracle/oradata/pdbseed/temp01.dbf'
		 SIZE 20971520  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	ALTER SESSION SET CONTAINER = PDB1;
	ALTER TABLESPACE TEMPTS1 ADD TEMPFILE '/opt/oracle/oradata/pdb1/temp01.dbf'
		 SIZE 20971520  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	ALTER SESSION SET CONTAINER = PDB2;
	ALTER TABLESPACE TEMPTS1 ADD TEMPFILE '/opt/oracle/oradata/pdb2/temp01.dbf'
		 SIZE 20971520  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	ALTER SESSION SET CONTAINER = PDB3;
	ALTER TABLESPACE TEMPTS1 ADD TEMPFILE '/opt/oracle/oradata/pdb3/temp01.dbf' REUSE;
	ALTER SESSION SET CONTAINER = CDB$ROOT;
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
	CREATE CONTROLFILE REUSE DATABASE "PRODCDB" RESETLOGS  NOARCHIVELOG
		MAXLOGFILES 16
		MAXLOGMEMBERS 3
		MAXDATAFILES 1024
		MAXINSTANCES 1
		MAXLOGHISTORY 292
	LOGFILE
	  GROUP 1 (
		'/opt/oracle/oradata/PRODCDB/redo01a.log',
		'/opt/oracle/oradata/PRODCDB/redo01b.log'
	  ) SIZE 100M BLOCKSIZE 512,
	  GROUP 2 (
		'/opt/oracle/oradata/PRODCDB/redo02a.log',
		'/opt/oracle/oradata/PRODCDB/redo02b.log'
	  ) SIZE 100M BLOCKSIZE 512,
	  GROUP 3 (
		'/opt/oracle/oradata/PRODCDB/redo03a.log',
		'/opt/oracle/oradata/PRODCDB/redo03b.log'
	  ) SIZE 100M BLOCKSIZE 512
	-- STANDBY LOGFILE
	DATAFILE
	  '/opt/oracle/oradata/PRODCDB/system01.dbf',
	  '/opt/oracle/oradata/pdbseed/system01.dbf',
	  '/opt/oracle/oradata/PRODCDB/sysaux01.dbf',
	  '/opt/oracle/oradata/pdbseed/sysaux01.dbf',
	  '/opt/oracle/oradata/PRODCDB/undotbs01.dbf',
	  '/opt/oracle/oradata/pdbseed/undotbs01.dbf',
	  '/opt/oracle/oradata/PRODCDB/deftbs01.dbf',
	  '/opt/oracle/oradata/pdbseed/deftbs01.dbf',
	  '/opt/oracle/oradata/pdb1/system01.dbf',
	  '/opt/oracle/oradata/pdb1/sysaux01.dbf',
	  '/opt/oracle/oradata/pdb1/undotbs01.dbf',
	  '/opt/oracle/oradata/pdb1/deftbs01.dbf',
	  '/opt/oracle/oradata/pdb2/system01.dbf',
	  '/opt/oracle/oradata/pdb2/sysaux01.dbf',
	  '/opt/oracle/oradata/pdb2/undotbs01.dbf',
	  '/opt/oracle/oradata/pdb2/deftbs01.dbf',
	  '/opt/oracle/oradata/pdb3/system01.dbf',
	  '/opt/oracle/oradata/pdb3/sysaux01.dbf',
	  '/opt/oracle/oradata/pdb3/undotbs01.dbf',
	  '/opt/oracle/oradata/pdb3/deftbs01.dbf'
	CHARACTER SET AL32UTF8
	;
	-- Commands to re-create incarnation table
	-- Below log names MUST be changed to existing filenames on
	-- disk. Any one log file from each branch can be used to
	-- re-create incarnation records.
	-- ALTER DATABASE REGISTER LOGFILE '/opt/oracle/fast_recovery_area/PRODCDB/archivelog/2017_09_22/o1_mf_1_1_%u_.arc';
	-- Recovery is required if any of the datafiles are restored backups,
	-- or if the last shutdown was not normal or immediate.
	RECOVER DATABASE USING BACKUP CONTROLFILE
	-- Database can now be opened zeroing the online logs.
	ALTER DATABASE OPEN RESETLOGS;
	-- Open all the PDBs.
	ALTER PLUGGABLE DATABASE ALL OPEN;
	-- Commands to add tempfiles to temporary tablespaces.
	-- Online tempfiles have complete space information.
	-- Other tempfiles may require adjustment.
	ALTER TABLESPACE TEMPTS1 ADD TEMPFILE '/opt/oracle/oradata/PRODCDB/temp01.dbf'
		 SIZE 20971520  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	ALTER SESSION SET CONTAINER = PDB$SEED;
	ALTER TABLESPACE TEMPTS1 ADD TEMPFILE '/opt/oracle/oradata/pdbseed/temp01.dbf'
		 SIZE 20971520  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	ALTER SESSION SET CONTAINER = PDB1;
	ALTER TABLESPACE TEMPTS1 ADD TEMPFILE '/opt/oracle/oradata/pdb1/temp01.dbf'
		 SIZE 20971520  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	ALTER SESSION SET CONTAINER = PDB2;
	ALTER TABLESPACE TEMPTS1 ADD TEMPFILE '/opt/oracle/oradata/pdb2/temp01.dbf'
		 SIZE 20971520  REUSE AUTOEXTEND ON NEXT 655360  MAXSIZE 32767M;
	ALTER SESSION SET CONTAINER = PDB3;
	ALTER TABLESPACE TEMPTS1 ADD TEMPFILE '/opt/oracle/oradata/pdb3/temp01.dbf' REUSE;
	ALTER SESSION SET CONTAINER = CDB$ROOT;
	-- End of tempfile additions.
	--

	SQL> 
	
~~~ LinHong 2017/09/15 ~~~~
