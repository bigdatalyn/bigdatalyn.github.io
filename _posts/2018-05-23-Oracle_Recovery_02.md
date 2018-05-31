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

Confirm with the archive mode
	
	Check whether there is archivelog files in archivelog directory.


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

If there are a lot of archive log file, we can use rman to register the  archive log files.

	# Example:
	rman target /
	catalog start with '/u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_05_23/*.arc';


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

Prepare the test env again.
Remove the all redolog files and controlfiles.

Check the files.

	SYS@orcl11g> col  name for a60
	SYS@orcl11g> select status,name from v$controlfile;

	STATUS  NAME
	------- ------------------------------------------------------------
			/u01/app/oracle/oradata/orcl11g/control01.ctl
			/u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl

	SYS@orcl11g> select file#,name from v$datafile;

		FILE# NAME
	---------- ------------------------------------------------------------
			1 /u01/app/oracle/oradata/orcl11g/system01.dbf
			2 /u01/app/oracle/oradata/orcl11g/sysaux01.dbf
			3 /u01/app/oracle/oradata/orcl11g/undotbs01.dbf
			4 /u01/app/oracle/oradata/orcl11g/users01.dbf
			5 /u01/app/oracle/oradata/orcl11g/data01.dbf

	SYS@orcl11g> col member for a50
	SYS@orcl11g> select group#,status,member from v$logfile;

		GROUP# STATUS  MEMBER
	---------- ------- --------------------------------------------------
			1 STALE   /u01/app/oracle/oradata/orcl11g/redo01.log
			3         /u01/app/oracle/oradata/orcl11g/redo03.log
			2         /u01/app/oracle/oradata/orcl11g/redo02.log

	SYS@orcl11g> 

Shutdown database normally and remove all of the controlfiles and redologfiles.

	SYS@orcl11g> shu immediate
	Database closed.
	Database dismounted.
	ORACLE instance shut down.
	SYS@orcl11g> host rm /u01/app/oracle/oradata/orcl11g/redo*.log

	SYS@orcl11g> host rm /u01/app/oracle/oradata/orcl11g/control01.ctl

	SYS@orcl11g> host rm /u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl

	SYS@orcl11g> 

We need to resetlog while re-creating controlfile if the REDO log file have been missed.

	STARTUP NOMOUNT
	CREATE CONTROLFILE REUSE DATABASE "orcl11g" RESETLOGS  ARCHIVELOG
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

The database have changed to MOUNTED after re-creating the controlfile.

	SYS@orcl11g> select open_mode from v$database;

	OPEN_MODE
	--------------------
	MOUNTED

	SYS@orcl11g> 

We will meet the ORA-00283&ORA-01610 while recovering database.

	SYS@orcl11g> recover database;
	ORA-00283: recovery session canceled due to errors
	ORA-01610: recovery using the BACKUP CONTROLFILE option must be done
	SYS@orcl11g> 

Accourding to the tips from the error message, recover database again.

	SYS@orcl11g> recover database using backup controlfile until cancel;
	ORA-00279: change 1406291 generated at 05/31/2018 04:26:49 needed for thread 1
	ORA-00289: suggestion : /u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_05_31/o1_mf_1_63_%u_.arc
	ORA-00280: change 1406291 for thread 1 is in sequence #63


	Specify log: {<RET>=suggested | filename | AUTO | CANCEL}
	cancel	-----------------------------------> Input the word: "cancel"
	Media recovery cancelled.
	SYS@orcl11g> 

After that, open database via resetlogs.

	SYS@orcl11g> alter database open resetlogs;

	Database altered.

	SYS@orcl11g> 

In the ending of recovering, we need to re-create temp tablespace.

	SYS@orcl11g> ALTER TABLESPACE TEMP ADD TEMPFILE '/u01/app/oracle/oradata/orcl11g/temp01.dbf' SIZE 500m  REUSE AUTOEXTEND ON NEXT 50m  MAXSIZE 32767M;

	Tablespace altered.

	SYS@orcl11g> 

Attendation:
When to use "alter database open resetlogs" to open database?

    1.在不完全恢复（介质恢复）时 / Incompleted recover mode.
    2.使用备份的控制文件进行数据库恢复时 / Use the backup controlfile to recover database.
    3.丢失redo log，并使用RESETLOGS方式手工创建控制文件进行数据库恢复时 / Missed redo logs and use resetlogs to re-create controlfile.

	If you lose all redo log files for the database. It can be deleted by mistake or disk corruption.
	If you database recovery needed by redo log group corruption
	If you don’t have archive log backups to finish the incomplete recovery of the database.
	If your ‘open resetlogs command’ fails with error ORA-01194: file 1 needs more recovery to be consistent

### Backup controlfile and restore controlfile via RMAN

	[oracle@databasevm001 ~]$ rman target /

	Recovery Manager: Release 11.2.0.4.0 - Production on Thu May 31 04:40:30 2018

	Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.

	connected to target database: ORCL11G (DBID=1068485233)

	RMAN> show all;

	using target database control file instead of recovery catalog
	RMAN configuration parameters for database with db_unique_name ORCL11G are:
	CONFIGURE RETENTION POLICY TO REDUNDANCY 1; # default
	CONFIGURE BACKUP OPTIMIZATION OFF; # default
	CONFIGURE DEFAULT DEVICE TYPE TO DISK; # default
	CONFIGURE CONTROLFILE AUTOBACKUP OFF; # default
	CONFIGURE CONTROLFILE AUTOBACKUP FORMAT FOR DEVICE TYPE DISK TO '%F'; # default
	CONFIGURE DEVICE TYPE DISK PARALLELISM 1 BACKUP TYPE TO BACKUPSET; # default
	CONFIGURE DATAFILE BACKUP COPIES FOR DEVICE TYPE DISK TO 1; # default
	CONFIGURE ARCHIVELOG BACKUP COPIES FOR DEVICE TYPE DISK TO 1; # default
	CONFIGURE MAXSETSIZE TO UNLIMITED; # default
	CONFIGURE ENCRYPTION FOR DATABASE OFF; # default
	CONFIGURE ENCRYPTION ALGORITHM 'AES128'; # default
	CONFIGURE COMPRESSION ALGORITHM 'BASIC' AS OF RELEASE 'DEFAULT' OPTIMIZE FOR LOAD TRUE ; # default
	CONFIGURE ARCHIVELOG DELETION POLICY TO NONE; # default
	CONFIGURE SNAPSHOT CONTROLFILE NAME TO '/u01/app/oracle/product/11.2.0.4/dbhome_1/dbs/snapcf_orcl11g.f'; # default

	RMAN> 
	RMAN> CONFIGURE CONTROLFILE AUTOBACKUP ON;

	new RMAN configuration parameters:
	CONFIGURE CONTROLFILE AUTOBACKUP ON;
	new RMAN configuration parameters are successfully stored

	RMAN> 
	RMAN> CONFIGURE CONTROLFILE AUTOBACKUP FORMAT FOR DEVICE TYPE DISK TO '/home/oracle/backup/control_file_bak_%F';

	new RMAN configuration parameters:
	CONFIGURE CONTROLFILE AUTOBACKUP FORMAT FOR DEVICE TYPE DISK TO '/home/oracle/backup/control_file_bak_%F';
	new RMAN configuration parameters are successfully stored

	RMAN> 
	RMAN> backup database format '/home/oracle/backup/full_bak_%d_%T_%s_%U.bak';

	After backup database, it will backup controlfile automatically.

	[oracle@databasevm001 backup]$ ls -ltr
	total 9751456
	-rw-r-----. 1 oracle oinstall 9975332864 May 31 04:50 full_bak_ORCL11G_20180531_1_01t48bav_1_1.bak
	-rw-r-----. 1 oracle oinstall   10158080 May 31 04:50 control_file_bak_c-1068485233-20180531-00
	[oracle@databasevm001 backup]$ 


	RMAN> list incarnation;


	List of Database Incarnations
	DB Key  Inc Key DB Name  DB ID            STATUS  Reset SCN  Reset Time
	------- ------- -------- ---------------- --- ---------- ----------
	1       1       ORCL11G  1068485233       PARENT  635002     01-DEC-17
	2       2       ORCL11G  1068485233       CURRENT 1406292    31-MAY-18

	RMAN> 

	Or

	SYS@orcl11g> select * from v$database_incarnation;

Restore controlfile via RMAN.

	RMAN> restore controlfile to '/u01/app/oracle/oradata/orcl11g/control01.ctl' from '/home/oracle/backup/control_file_bak_c-1068485233-20180531-00';

	Starting restore at 31-MAY-18
	using target database control file instead of recovery catalog
	allocated channel: ORA_DISK_1
	channel ORA_DISK_1: SID=129 device type=DISK

	channel ORA_DISK_1: restoring control file
	RMAN-00571: ===========================================================
	RMAN-00569: =============== ERROR MESSAGE STACK FOLLOWS ===============
	RMAN-00571: ===========================================================
	RMAN-03002: failure of restore command at 05/31/2018 05:03:20
	ORA-19607: /u01/app/oracle/oradata/orcl11g/control01.ctl is an active control file

	RMAN> 

	*** after that, it should keep all the controlfiles are the same.

	SYS@orcl11g> alter database mount;
	alter database mount
	*
	ERROR at line 1:
	ORA-00214: control file '/u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl' version 2826 inconsistent with file '/u01/app/oracle/oradata/orcl11g/control01.ctl' version 2796


	SYS@orcl11g> host cp /u01/app/oracle/oradata/orcl11g/control01.ctl /u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl

	SYS@orcl11g> alter database mount;

	Database altered.

	SYS@orcl11g> 

The database should be in the nomount mode.

	RMAN> restore controlfile to '/u01/app/oracle/oradata/orcl11g/control01.ctl' from '/home/oracle/backup/control_file_bak_c-1068485233-20180531-00';

	Starting restore at 31-MAY-18
	using target database control file instead of recovery catalog
	allocated channel: ORA_DISK_1
	channel ORA_DISK_1: SID=129 device type=DISK

	channel ORA_DISK_1: restoring control file
	channel ORA_DISK_1: restore complete, elapsed time: 00:00:01
	Finished restore at 31-MAY-18

	RMAN> 

Using the second controlfile is the best/fastest way to recover controlfile.

	cp /u01/app/oracle/oradata/orcl/control01.ctl /u01/app/oracle/fast_recovery_area/orcl/control02.ctl 

	SQL> alter database mount;

	Database altered.

	SQL> alter database open;

	Database altered.

### Oracle Hidden/Undocumented Parameters

The Hidden parameters mentioned for Database restoration are.

	Parameter Name                            Description
	----------------------------------------- --------------------------------------------------------
	_allow_error_simulation                   Allow error simulation for testing
	_allow_read_only_corruption               allow read-only open even if database is corrupt
	_allow_resetlogs_corruption               allow resetlogs even if it will cause corruption
	_allow_terminal_recovery_corruption       Finish terminal recovery even if it may cause corruption
	_corrupted_rollback_segments              corrupted undo segment list



	_ALLOW_RESETLOGS_CORRUPTION=TRUE
	This parameter helps to open the database even the datafile headers are not sync with the SCN details. It will allow you to open the database with resetlogs option even the datafiles needed recovery. As soon as the database opens with resetlogs the next check point SCN will get updated to the datafile headers. This leaves the database to an unknown state as it avoids the rolling forward process.

	_CORRUPTED_ROLLBACK_SEGMENTS=(_SYSSMU10_1912826470$,..)
	This parameter is used to corrupt the active rollback segments and which will not be used in the open database. Using this parameter you can drop the rollback segments as well as the undo tablespaces. 

	_allow_error_simulation=TRUE
	This parameter allows the error simulation for testing purpose. Normally it used for Oracle internal purpose.

	_minimum_giga_scn=<number>
	This parameter is similar to the ADJUST_SCN event to advance the database SCN to higher value (ahead value). The database should be rebuilt after using this parameter and you should get support from Oracle to decide the value. This parameter is useful in some recovery situations where the current SCN needs to be incremented by a large value to ensure it is ahead of the highest SCN in the database. Typically it needed for ORA-600 [2662] errors to be recoverd.


	DB_Parameter _ALLOW_RESETLOGS_CORRUPTION 
	========================================
	
	This documentation has been prepared avoiding the mention of the complex 
	structures from the code and to simply give an insight to the 'damage it could 
	cause'.  The usage of this parameter leads to an in-consistent Database with no 
	other alternative but to rebuild the complete Database.  This parameter could 
	be used when we realize that there are no stardard options available and are 
	convinced that the customer understands the implications of using the Oracle's 
	secret parameter.  The factors to be considered are ;-- 
	
	1. Customer does not have a good backup. 
	2. A lot of time and money has been invested after the last good backup and     
	there is no possibility for reproduction of the lost data. 
	3. The customer has to be ready to export the full database and import it     
	back after creating a new one. 
	4. There is no 100% guarantee that by using this parameter the database would 
	come up. 
	5. Oracle does not support the database after using this parameter for       
	recovery.    
	6. ALL OPTIONS including the ones mentioned in the action part of the error   
	message have been tried. 
	
	
	
	
	By setting _ALLOW_RESETLOGS_CORRUPTION=TRUE, certain consistency checks are 
	SKIPPED during database open stage.  This basically means it does not check 
	the datafile headers as to what the status was before the shutdown and how it 
	was shutdown.  The following cases mention few of the checks that were skipped. 
	
	Case-I 
	------ 
	Verification that the datafile present has not been restored from a BACKUP 
	taken before the database was opened successfully by using RESETLOGS.   
	
	ORA-01190: control file or data file %s is from before the last RESETLOGS
		Cause: Attempting to use a data file when the log reset information in 
			the file does not match the control file.  Either the data file or  
			the control file is a backup that was made before the most recent 
			ALTER DATABASE OPEN RESETLOGS. 
	Action: Restore file from a more recent backup. 
	
	
	Case-II 
	------- 
	Verification that the status bit of the datafile is not in a FUZZY state. 
	The datafile could be in this state due to the database going down when the  
	- Datafile was on-line and open
	- Datafile was not closed cleanly (maybe due to OS). 
	
	ORA-01194: file %s needs more recovery to be consistent 
		Cause: An incomplete recover session was started, but an insufficient 
			number of logs were applied to make the file consistent.  The  
			reported file was not closed cleanly when it was last opened by 
			the database.  It must be recovered to a time when it was not  
			being updated.  The most likely cause of this error is forgetting 
			to restore the file from a backup before doing incomplete  
			recovery. 
	Action: Either apply more logs until the file is consistent or restore the 
			file from an older backup and repeat recovery. 
	
	
	Case-III 
	-------- 
	Verification that the COMPLETE recover strategies have been applied for
	recovering the datafile and not any of the INCOMPLETE recovery options.  
	Basically because the complete recovery is one in which we even apply the 
	ON-LINE redo log files and open the DB without reseting the logs. 
	
	ORA-01113: file '%s' needs media recovery starting at log sequence # %s 
		Cause: An attempt was made to open a database file that is in need of  
			media recovery. 
	Action: First apply media recovery to the file. 
	
	
	Case-IV 
	------- 
	Verification that the datafile has been recovered through an END BACKUP if the 
	control file indicates that it was in backup mode. 
	This is useful when the DB has crashed while in hot backup mode and we lost 
	all log files in DB version's less than V7.2. 
	
	ORA-01195: on-line backup of file %s needs more recovery to be consistent" 
		Cause: An incomplete recovery session was started, but an insufficient  
			number of logs were applied to make the file consistent.  The 
			reported file is an on-line backup which must be recovered to the 
			time the backup ended. 
	Action: Either apply more logs until the file is consistent or resotre 
			the database files from an older backup and repeat recovery. 
	
	In version 7.2, we could simply issue the ALTER DATABASE DATAFILE xxxx END 
	BACKUP statement and proceed with the recovery.  But again to issue this 
	statement, we need to have the ON-LINE redo logs or else we still are forced to
	use this parameter. 
	
	
	Case-V 
	------ 
	Verification that the data file status is not still in (0x10) MEDIA recovery 
	FUZZY. 
	When recovery is started, a flag is set in the datafile header status flag to 
	indicate that the file is presently in media recovery.  This is reset when 
	recovery is completed and at times when it has not been reset we are forced to 
	use this paramter. 
	
	ORA-01196: file %s is inconsistent due to a failed media recovery session 
		Cause: The file was being recovered but the recovery did not terminate 
			normally.  This left the file in an inconsistent state.  No more 
			recovery was successfully completed on this file. 
	Action: Either apply more logs until the file is consistent or restore the 
			backup again and repeat recovery. 
	
	
	Case-VI 
	------- 
	Verification that the datafile has been restored form a proper backup to 
	correspond with the log files.  This situation could happen when we have 
	decided that the data file is invalid since its SCN is ahead of the last 
	applied logs SCN but it has not failed on one of the ABOVE CHECKS. 
	
	ORA-01152: file '%s' was not restored from a sufficientluy old backup" 
		Cause: A manual recovery session was started, but an insufficient number 
			of logs were applied to make the database consistent.  This file is 
			still in the future of the last log applied.  Note that this  
			mistake can not always be caught. 
	Action: Either apply more logs until the database is consistent or 
			restore the database file from an older backup and repeat  
			recovery.

使用_ALLOW_RESETLOGS_CORRUPTION 参数需谨慎,因为该参数可能导致数据库逻辑不一致,甚至可能把本来很简单的一个恢复弄的非常复杂甚至不可恢复的后果,建议在oracle support支持下使用.另外使用该参数resetlogs库之后,强烈建议通过逻辑方式重建库	

Have a good day! 2018/05 via LinHong
	






