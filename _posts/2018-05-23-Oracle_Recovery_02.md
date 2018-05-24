---
layout: post
title: "Oracle Recovery 02 - Controlfile"
category: Oracle
tags: Oracle BBED controlfile
---

* content
{:toc}


Oracle - Recovery 02 - Controlfile

All of controlfiles are removed. ----> How to recovery?









### Prepare Test Case 

Archive log mode/db is read write/backup create controlfile sql.

	SYS@orcl11g> archive log list;
	Database log mode              Archive Mode
	Automatic archival             Enabled
	Archive destination            USE_DB_RECOVERY_FILE_DEST
	Oldest online log sequence     56
	Next log sequence to archive   58
	Current log sequence           58
	SYS@orcl11g> 
	SYS@orcl11g> select open_mode from v$database;

	OPEN_MODE
	--------------------
	READ WRITE

	SYS@orcl11g> set line 150 pagesize 9999
	SYS@orcl11g> col name for a60
	SYS@orcl11g> select * from v$controlfile;

	STATUS  NAME                                                         IS_ BLOCK_SIZE FILE_SIZE_BLKS
	------- ------------------------------------------------------------ --- ---------- --------------
			/u01/app/oracle/oradata/orcl11g/control01.ctl                NO       16384            594
			/u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl     NO       16384            594

	SYS@orcl11g> 

Also backup the controlfile sql;

	SYS@orcl11g> alter database backup controlfile to trace as '/home/oracle/orcl11g.control.bak.sql';

	Database altered.

	SYS@orcl11g> 

### Simulate to remove all controlfiles

Use OS command - rm to remove controlfiles

	[oracle@databasevm001 ~]$ rm /u01/app/oracle/oradata/orcl11g/control01.ctl
	[oracle@databasevm001 ~]$ rm /u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl

Switch logfile in instance, also the checkpoint.

	SYS@orcl11g> alter system switch logfile;

	System altered.

	SYS@orcl11g> /

	System altered.

	SYS@orcl11g> /

	System altered.

	SYS@orcl11g> alter system checkpoint;

	System altered.

	SYS@orcl11g> /

	System altered.

	SYS@orcl11g> /

	System altered.

	SYS@orcl11g> 

### Shutdown / Open Database

There was an error while shutdown the instance.

	SYS@orcl11g> shu immediate
	Database closed.
	ORA-00210: cannot open the specified control file
	ORA-00202: control file: '/u01/app/oracle/oradata/orcl11g/control01.ctl'
	ORA-27041: unable to open file
	Linux Error: 2: No such file or directory
	Additional information: 3

	SYS@orcl11g> !ps -ef | grep smon
	oracle    2074     1  0 15:25 ?        00:00:00 ora_smon_orcl11g
	oracle    2291  2044  0 15:53 pts/3    00:00:00 /bin/bash -c ps -ef | grep smon
	oracle    2293  2291  0 15:53 pts/3    00:00:00 grep smon

	SYS@orcl11g> shu abort
	ORACLE instance shut down.
	SYS@orcl11g> 

There also was an error while startup instance.

	SYS@orcl11g> startup
	ORACLE instance started.

	Total System Global Area 1556787200 bytes
	Fixed Size                  1364844 bytes
	Variable Size             889195668 bytes
	Database Buffers          654311424 bytes
	Redo Buffers               11915264 bytes
	ORA-00205: error in identifying control file, check alert log for more info


	SYS@orcl11g> 

The alert log: ORA-27037


	MMNL started with pid=16, OS id=2330 
	starting up 1 dispatcher(s) for network address '(ADDRESS=(PARTIAL=YES)(PROTOCOL=TCP))'...
	starting up 1 shared server(s) ...
	ORACLE_BASE from environment = /u01/app/oracle
	Wed May 23 15:54:45 2018
	ALTER DATABASE   MOUNT
	ORA-00210: cannot open the specified control file
	ORA-00202: control file: '/u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl'
	ORA-27037: unable to obtain file status
	Linux Error: 2: No such file or directory
	Additional information: 3
	ORA-00210: cannot open the specified control file
	ORA-00202: control file: '/u01/app/oracle/oradata/orcl11g/control01.ctl'
	ORA-27037: unable to obtain file status
	Linux Error: 2: No such file or directory
	Additional information: 3
	ORA-205 signalled during: ALTER DATABASE   MOUNT...
	Wed May 23 15:54:45 2018
	Checker run found 2 new persistent data failures

+++++++++++++++++++++++++++++++++++++++++

FD in os:

	[oracle@databasevm001 ~]$ ps -ef | grep ckpt | grep -v grep
	oracle    2072     1  0 15:25 ?        00:00:00 ora_ckpt_orcl11g
	[oracle@databasevm001 ~]$ cd /proc/2072/fd
	[oracle@databasevm001 fd]$ ls -ltr
	total 0
	lrwx------. 1 oracle oinstall 64 May 23 15:50 9 -> /u01/app/oracle/product/11.2.0.4/dbhome_1/dbs/hc_orcl11g.dat
	lr-x------. 1 oracle oinstall 64 May 23 15:50 8 -> /dev/zero
	lr-x------. 1 oracle oinstall 64 May 23 15:50 7 -> /proc/2072/fd
	lr-x------. 1 oracle oinstall 64 May 23 15:50 6 -> /u01/app/oracle/product/11.2.0.4/dbhome_1/rdbms/mesg/oraus.msb
	lr-x------. 1 oracle oinstall 64 May 23 15:50 5 -> /dev/null
	lr-x------. 1 oracle oinstall 64 May 23 15:50 4 -> /dev/null
	lr-x------. 1 oracle oinstall 64 May 23 15:50 3 -> /dev/null
	lrwx------. 1 oracle oinstall 64 May 23 15:50 262 -> /u01/app/oracle/oradata/orcl11g/data01.dbf
	lrwx------. 1 oracle oinstall 64 May 23 15:50 261 -> /u01/app/oracle/oradata/orcl11g/users01.dbf
	lrwx------. 1 oracle oinstall 64 May 23 15:50 260 -> /u01/app/oracle/oradata/orcl11g/undotbs01.dbf
	lrwx------. 1 oracle oinstall 64 May 23 15:50 259 -> /u01/app/oracle/oradata/orcl11g/sysaux01.dbf
	lrwx------. 1 oracle oinstall 64 May 23 15:50 258 -> /u01/app/oracle/oradata/orcl11g/system01.dbf
	lrwx------. 1 oracle oinstall 64 May 23 15:50 257 -> /u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl (deleted)
	lrwx------. 1 oracle oinstall 64 May 23 15:50 256 -> /u01/app/oracle/oradata/orcl11g/control01.ctl (deleted)
	l-wx------. 1 oracle oinstall 64 May 23 15:50 2 -> /dev/null
	lr-x------. 1 oracle oinstall 64 May 23 15:50 11 -> /u01/app/oracle/product/11.2.0.4/dbhome_1/rdbms/mesg/oraus.msb
	lrwx------. 1 oracle oinstall 64 May 23 15:50 10 -> /u01/app/oracle/product/11.2.0.4/dbhome_1/dbs/lkORCL11G
	l-wx------. 1 oracle oinstall 64 May 23 15:50 1 -> /dev/null
	lr-x------. 1 oracle oinstall 64 May 23 15:50 0 -> /dev/null
	[oracle@databasevm001 fd]$ 

+++++++++++++++++++++++++++++++++++++

### Get the Database informations.

Database Name,Character set etc.

	SYS@orcl11g> select status from v$instance;

	STATUS
	------------
	STARTED

	SYS@orcl11g> show parameter db_name

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	db_name                              string      orcl11g
	SYS@orcl11g> 
	SYS@orcl11g> select * from v$version;

	BANNER
	--------------------------------------------------------------------------------
	Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	PL/SQL Release 11.2.0.4.0 - Production
	CORE    11.2.0.4.0      Production
	TNS for Linux: Version 11.2.0.4.0 - Production
	NLSRTL Version 11.2.0.4.0 - Production

	SYS@orcl11g> 

Use the same version DB to check the following sql and confirm with the block position.

	+++++++++++++++++++++++++++++
	select distinct dbms_rowid.rowid_relative_fno(rowid) file#,
		dbms_rowid.rowid_block_number(rowid) block#
	from props$;

		FILE#     BLOCK#
	---------- ----------
			1        801
	+++++++++++++++++++++++++++++

Check the Character set ---> AL32UTF8

	[oracle@databasevm001 ~]$ ls -l /u01/app/oracle/oradata/orcl11g/system01.dbf
	-rw-r-----. 1 oracle oinstall 796925952 May 23 15:52 /u01/app/oracle/oradata/orcl11g/system01.dbf
	[oracle@databasevm001 ~]$
	[oracle@databasevm001 ~]$ dd if=/u01/app/oracle/oradata/orcl11g/system01.dbf of=/home/oracle/system01_01.tmp bs=8192 skip=801 count=1
	1+0 records in
	1+0 records out
	8192 bytes (8.2 kB) copied, 0.000332498 s, 24.6 MB/s
	[oracle@databasevm001 ~]$ 
	[oracle@databasevm001 ~]$ strings /home/oracle/system01_01.tmp
	~
	NLS_CALENDAR    GREGORIAN
	Calendar system,
	NLS_CHARACTERSET
	AL32UTF8
	Character set,
	NLS_NUMERIC_CHARACTERS
	~
	[oracle@databasevm001 ~]$ 

### Recovery controlfile

According to the redo log's status, there are two recovery modes.

	NORESETLOGS: redo log doesn't drop/miss..
	REDO LOG日志没有丢失时使用NORESETLOGS脚本创建控制文件

	RESETLOGS:redo log was missed
	REDO LOG日志丢失

#### noresetlogs mode

Use the following sql to re-create controlfile.

	STARTUP NOMOUNT
	CREATE CONTROLFILE REUSE DATABASE "orcl11g" NORESETLOGS  ARCHIVELOG
		MAXLOGFILES 16
		MAXLOGMEMBERS 3
		MAXDATAFILES 100
		MAXINSTANCES 8
		MAXLOGHISTORY 292
	LOGFILE
	GROUP 1 '/u01/app/oracle/oradata/orcl11g/redo01.log'  SIZE 50M BLOCKSIZE 512,
	GROUP 2 '/u01/app/oracle/oradata/orcl11g/redo02.log'  SIZE 50M BLOCKSIZE 512,
	GROUP 3 '/u01/app/oracle/oradata/orcl11g/redo03.log'  SIZE 50M BLOCKSIZE 512
	-- STANDBY LOGFILE
	DATAFILE
	'/u01/app/oracle/oradata/orcl11g/system01.dbf',
	'/u01/app/oracle/oradata/orcl11g/sysaux01.dbf',
	'/u01/app/oracle/oradata/orcl11g/undotbs01.dbf',
	'/u01/app/oracle/oradata/orcl11g/users01.dbf',
	'/u01/app/oracle/oradata/orcl11g/data01.dbf'
	CHARACTER SET AL32UTF8
	;

After the sql execution, check the controlfiles.

	SYS@orcl11g> select open_mode from v$database;

	OPEN_MODE
	--------------------
	MOUNTED

	SYS@orcl11g> !ls /u01/app/oracle/oradata/orcl11g/control01.ctl
	/u01/app/oracle/oradata/orcl11g/control01.ctl

	SYS@orcl11g> !ls /u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl
	/u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl

	SYS@orcl11g> 

Register the archivelog files.(After remove the controlfiles, we have switched logfile and do the checkporint by some times.)

	SYS@orcl11g> select SEQUENCE#,RESETLOGS_ID from v$archived_log;

	no rows selected

	SYS@orcl11g> 

	[oracle@databasevm001 2018_05_23]$ pwd
	/u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_05_23
	[oracle@databasevm001 2018_05_23]$ ls -ltr
	total 16144
	-rw-r-----. 1 oracle oinstall 16515584 May 23 15:37 o1_mf_1_58_fjc2ojps_.arc
	-rw-r-----. 1 oracle oinstall     1024 May 23 15:37 o1_mf_1_59_fjc2olrx_.arc
	-rw-r-----. 1 oracle oinstall     7168 May 23 15:37 o1_mf_1_60_fjc2ops4_.arc
	[oracle@databasevm001 2018_05_23]$ 


	alter database register physical logfile '/u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_05_23/o1_mf_1_58_fjc2ojps_.arc';
	alter database register physical logfile '/u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_05_23/o1_mf_1_59_fjc2olrx_.arc';
	alter database register physical logfile '/u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_05_23/o1_mf_1_60_fjc2ops4_.arc';

	SYS@orcl11g> select SEQUENCE#,RESETLOGS_ID from v$archived_log;

	SEQUENCE# RESETLOGS_ID
	---------- ------------
			58    961600948
			59    961600948
			60    961600948

	SYS@orcl11g> 

Recover database and create temp tablespace.

	SYS@orcl11g> recover database;
	ORA-00283: recovery session canceled due to errors
	ORA-00264: no recovery required


	SYS@orcl11g> alter system archive log all;

	System altered.

	SYS@orcl11g> alter database open;

	Database altered.

	SYS@orcl11g> ALTER TABLESPACE TEMP ADD TEMPFILE '/u01/app/oracle/oradata/orcl11g/temp01.dbf' SIZE 500m  REUSE AUTOEXTEND ON NEXT 50m  MAXSIZE 32767M;

	Tablespace altered.

	SYS@orcl11g> 



#### resetlogs mode









Have a good day! 2018/05 via LinHong
	






