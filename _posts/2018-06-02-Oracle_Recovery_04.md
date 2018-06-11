---
layout: post
title: "Oracle Recovery 04 - How to dump the control file"
category: Oracle
tags: Oracle dump controlfile 
---

* content
{:toc}


Oracle Recovery 04 - How to dump the control file?



### Database env

Linux: OEL7.3 x86-64

	[oracle@databasevm001 ~]$ cat /etc/redhat-release 
	Red Hat Enterprise Linux Server release 7.3 (Maipo)
	[oracle@databasevm001 ~]$ uname -a
	Linux databasevm001 4.1.12-61.1.28.el7uek.x86_64 #2 SMP Thu Feb 23 19:55:12 PST 2017 x86_64 x86_64 x86_64 GNU/Linux
	[oracle@databasevm001 ~]$ 

	SYS@orcl11g> select * from v$version;

Database: 11.2.0.4

	BANNER
	--------------------------------------------------------------------------------
	Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	PL/SQL Release 11.2.0.4.0 - Production
	CORE    11.2.0.4.0      Production
	TNS for Linux: Version 11.2.0.4.0 - Production
	NLSRTL Version 11.2.0.4.0 - Production

	SYS@orcl11g> 

### Oracle Control file:dump

Use the following command to dumpe controlfile

	alter session set events 'immediate trace name controlf level <n>';

Regarding the level:

	level : level 1: Generic File Header 
	Level 2: Level 1 + database information + database entry + check point progress records + Extended database entry 
	level 3 or Higher< 9: level 2 + reuse record section 
	level 10: Memory dump of all the control file logical blocks

Use the following command to find the path of trace file.

	select * from v$diag_info where NAME='Default Trace File'; 

Example:

	SYS@orcl11g> alter session set events 'immediate trace name controlf level 1';
	Session altered.
	SYS@orcl11g> select * from v$diag_info where NAME='Default Trace File'; 
	INST_ID NAME                 VALUE
	---------- -------------------- ----------------------------------------------------------------------
			1 Default Trace File   /u01/app/oracle/diag/rdbms/orcl11g/orcl11g/trace/orcl11g_ora_1310.trc
	SYS@orcl11g> 

Output of dump controlfile

	[oracle@databasevm001 ~]$ cat /u01/app/oracle/diag/rdbms/orcl11g/orcl11g/trace/orcl11g_ora_1310.trc
	Trace file /u01/app/oracle/diag/rdbms/orcl11g/orcl11g/trace/orcl11g_ora_1310.trc
	Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options
	ORACLE_HOME = /u01/app/oracle/product/11.2.0.4/dbhome_1
	System name:    Linux
	Node name:      databasevm001
	Release:        4.1.12-61.1.28.el7uek.x86_64
	Version:        #2 SMP Thu Feb 23 19:55:12 PST 2017
	Machine:        x86_64
	Instance name: orcl11g
	Redo thread mounted by this instance: 1
	Oracle process number: 31
	Unix process pid: 1310, image: oracle@databasevm001 (TNS V1-V3)

	*** 2018-06-02 05:54:27.099
	*** SESSION ID:(202.13) 2018-06-02 05:54:27.099
	*** CLIENT ID:() 2018-06-02 05:54:27.099
	*** SERVICE NAME:(SYS$USERS) 2018-06-02 05:54:27.099
	*** MODULE NAME:(sqlplus@databasevm001 (TNS V1-V3)) 2018-06-02 05:54:27.099
	*** ACTION NAME:() 2018-06-02 05:54:27.099
	
	DUMP OF CONTROL FILES, Seq # 695 = 0x2b7
	V10 STYLE FILE HEADER:
			Compatibility Vsn = 186647552=0xb200400
			Db ID=1068485233=0x3fafca71, Db Name='ORCL11G'
			Activation ID=0=0x0
			Control Seq=695=0x2b7, File size=614=0x266
			File Number=0, Blksiz=16384, File Type=1 CONTROL
	*** END OF DUMP ***
	[oracle@databasevm001 ~]$ 

#### Oracle Control file: file header

Fine some information with dump file.

	DUMP OF CONTROL FILES, Seq # 695 = 0x2b7
	V10 STYLE FILE HEADER:
			Compatibility Vsn = 186647552=0xb200400 #------------------------> the database version is 11.2.0.4
			Db ID=1068485233=0x3fafca71, Db Name='ORCL11G'
			Activation ID=0=0x0
			Control Seq=730=0x2da, File size=614=0x266 #-------------------> control file size
			File Number=0, Blksiz=16384, File Type=1 CONTROL

the control seq is the following, and it is same with the dump file above "Control Seq=730=0x2da".

	SYS@orcl11g> select CONTROLFILE_SEQUENCE# from v$database;
	CONTROLFILE_SEQUENCE#
	---------------------
					730
	SYS@orcl11g> 

#### Oracle Control file: database entry

Use level 2 to dump controlfile and get the dumpfile.

	alter session set events 'immediate trace name controlf level 2';
	select * from v$diag_info where NAME='Default Trace File'; 

Example:

	***************************************************************************
	DATABASE ENTRY
	***************************************************************************
	(size = 316, compat size = 316, section max = 1, section in-use = 1,
	last-recid= 0, old-recno = 0, last-recno = 0)
	(extent = 1, blkno = 1, numrecs = 1)
	05/31/2018 11:08:47
	DB Name "ORCL11G"
	Database flags = 0x00404001 0x00001200    -------------------------> the Database flags is here.
	Controlfile Creation Timestamp  05/31/2018 11:08:47
	Incmplt recovery scn: 0x0000.00000000
	Resetlogs scn: 0x0000.00158c21 Resetlogs Timestamp  05/31/2018 10:58:25
	Prior resetlogs scn: 0x0000.00157e15 Prior resetlogs Timestamp  05/31/2018 07:48:51
	Redo Version: compatible=0xb200400
	#Data files = 8, #Online files = 8
	Database checkpoint: Thread=1 scn: 0x0000.00176c36
	Threads: #Enabled=1, #Open=1, Head=1, Tail=1
	enabled  threads:  01000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000
	Max log members = 3, Max data members = 1
	Arch list: Head=3, Tail=3, Force scn: 0x0000.00165899scn: 0x0000.00000000
	Activation ID: 1084451317
	SCN compatibility 1
	Auto-rollover enabled
	Controlfile Checkpointed at scn:  0x0000.00176c77 06/02/2018 06:29:14
	thread:0 rba:(0x0.0.0)
	enabled  threads:  00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000 00000000 00000000
	00000000 00000000 00000000 00000000 00000000 00000000

The Database flag meaning are the following list.

    KCCDIMRE 0x00000001 whether media recovery enabled(that is: ARCHIVELOG mode)  #------------------->
    KCCDICKD 0x00000002 if dictionary must be checked with control file
    KCCDIRLR 0x00000004 DB OPEN RESETLOGS required
    KCCDIJNK 0x00000008 (junk value from beta)
    KCCDIMRC 0x00000010 was/is last mounted READ_COMPATIBLE
    KCCDICNV 0x00000020 controlfile was just created by convert from v6
    KCCDIIRA 0x00000040 Incomplete Recovery Allowed when resetting logs
    KCCDICCF 0x00000100 Controlfile was created with CREATE CONTROLFILE
    KCCDIINV 0x00000200 Invalid control file or database; still creating
    KCCDISBD 0x00000400 StandBy Database; control file for hot standby
    KCCDIORL 0x00000800 Opened ResetLogs; set until dictionary check
    KCCDICFC 0x00001000 valid ControlFile Checkpoint in backup cf
    KCCDISSN 0x00002000 SnapShot controlfile fileName pointer valid
    KCCDIUCD 0x00004000 lazy file header Update Checkpoint cycle Done  #------------------->
    KCCDICLO 0x00008000 clone database
    KCCDINDL 0x00010000 standby database No Data Loss
    KCCDISPK 0x00020000 Supplemental log primary keys
    KCCDISUI 0x00040000 Supplemental log unique indexes
    KCCDISFK 0x00080000 Supplemental log foreign keys
    KCCDIGDA 0x00100000 Database guard all
    KCCDIGDS 0x00200000 Database guard standby data
    KCCDIIMR 0x00400000 Group Membership Recovery is supported   #------------------->
    KCCDIEAR 0x00800000 End-of-redo Archival Received
    KCCDISTR 0x01000000 Standby Terminal Recovery
    KCCDILSB 0x02000000 Logical StandBy database

So the example"0x00404001 0x00001200": KCCDIIMR + KCCDIUCD + KCCDIMRE

Another porint: Usually,the control file's sequence is bigger than the database's sequence.

	SYS@orcl11g> select CONTROLFILE_CHANGE#, CHECKPOINT_CHANGE# from v$database;
	CONTROLFILE_CHANGE# CHECKPOINT_CHANGE#
	------------------- ------------------
				1535095            1535030
	SYS@orcl11g> 

#### CHECKPOINT PROGRESS RECORDS

Example:PROGRESS RECORDS

	***************************************************************************
	CHECKPOINT PROGRESS RECORDS
	***************************************************************************
	(size = 8180, compat size = 8180, section max = 11, section in-use = 0,
	last-recid= 0, old-recno = 0, last-recno = 0)
	(extent = 1, blkno = 2, numrecs = 11)
	THREAD #1 - status:0x2 flags:0x0 dirty:93
	low cache rba:(0xf.3.0) on disk rba:(0xf.1a9.0)   #---------------------> 
	on disk scn: 0x0000.00176e06 06/02/2018 06:31:28
	resetlogs scn: 0x0000.00158c21 05/31/2018 10:58:25
	heartbeat: 978332391 mount id: 1085236076
	THREAD #2 - status:0x0 flags:0x0 dirty:0
	low cache rba:(0x0.0.0) on disk rba:(0x0.0.0)
	on disk scn: 0x0000.00000000 01/01/1988 00:00:00
	resetlogs scn: 0x0000.00000000 01/01/1988 00:00:00
	heartbeat: 0 mount id: 0
	THREAD #3 - status:0x0 flags:0x0 dirty:0
	low cache rba:(0x0.0.0) on disk rba:(0x0.0.0)
	on disk scn: 0x0000.00000000 01/01/1988 00:00:00
	resetlogs scn: 0x0000.00000000 01/01/1988 00:00:00
	heartbeat: 0 mount id: 0
	THREAD #4 - status:0x0 flags:0x0 dirty:0
	low cache rba:(0x0.0.0) on disk rba:(0x0.0.0)
	on disk scn: 0x0000.00000000 01/01/1988 00:00:00
	resetlogs scn: 0x0000.00000000 01/01/1988 00:00:00
	heartbeat: 0 mount id: 0

The instance recovery will start from low cache rba to on disk rba when the database is starting.

What is the RBA?

	A"Redo Block Address" (RBA) describes a physical location within aredo log file. 
	Ref: Question About RBA (Redo Block Address) [ID 759966.1]

	There are three parts in RBA.
	（1）the log file sequence number (4 bytes)
	（2）the log file block number (4 bytes)
	（3）the byte offset into the block at which the redo record starts (2bytes)
	
	rba:(0xf.3.0) : the log sequence is "f"->15, Block number is 3, byte offset is 0.

#### EXTENDED DATABASE ENTRY

	***************************************************************************
	EXTENDED DATABASE ENTRY
	***************************************************************************
	(size = 900, compat size = 900, section max = 1, section in-use = 1,
	last-recid= 0, old-recno = 0, last-recno = 0)
	(extent = 1, blkno = 150, numrecs = 1)
	Control AutoBackup date(dd/mm/yyyy)=31/ 5/2018
	Next AutoBackup sequence= 0
	Database recovery target inc#:1, Last open inc#:1
	flg:0x0, flag:0x0
	Change tracking state=0, file index=0, checkpoint count=0scn: 0x0000.00000000
	Flashback log count=0, block count=0
	Desired flashback log size=0 blocks
	Oldest guarantee restore point=0
	Highest thread enable/disable scn: 0x0000.00158c21
	Number of Open thread with finite next SCN in last log: 0
	Number of half-enabled redo threads: 0
	Sum of absolute file numbers for files currently being moved online: 0

### The example of the instance recovery from low cache rba to on disk rba

the Steps are the following.

Shutdown abort the instance and check the low cache rba and on disk rba.

	SYS@orcl11g> shu abort;
	ORACLE instance shut down.
	SYS@orcl11g> startup mount;
	ORACLE instance started.
	Total System Global Area 1556787200 bytes
	Fixed Size                  1364844 bytes
	Variable Size             889195668 bytes
	Database Buffers          654311424 bytes
	Redo Buffers               11915264 bytes
	Database mounted.
	SYS@orcl11g> 
	SYS@orcl11g> alter session set events 'immediate trace name controlf level 2';
	Session altered.
	SYS@orcl11g> col value for a80
	SYS@orcl11g> col name for a20
	SYS@orcl11g> select * from v$diag_info where NAME='Default Trace File'; 
	INST_ID NAME                 VALUE
	---------- -------------------- --------------------------------------------------------------------------------
			1 Default Trace File   /u01/app/oracle/diag/rdbms/orcl11g/orcl11g/trace/orcl11g_ora_1748.trc
	SYS@orcl11g> 

The dump file:

	[oracle@databasevm001 ~]$ cat /u01/app/oracle/diag/rdbms/orcl11g/orcl11g/trace/orcl11g_ora_1748.trc
	Trace file /u01/app/oracle/diag/rdbms/orcl11g/orcl11g/trace/orcl11g_ora_1748.trc
	Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	~~~~~~~~~~~
	***************************************************************************
	CHECKPOINT PROGRESS RECORDS
	***************************************************************************
	(size = 8180, compat size = 8180, section max = 11, section in-use = 0,
	last-recid= 0, old-recno = 0, last-recno = 0)
	(extent = 1, blkno = 2, numrecs = 11)
	THREAD #1 - status:0x2 flags:0x0 dirty:55
	low cache rba:(0xf.18b0.0) on disk rba:(0xf.19da.0)   #---------------------->
	~~~~~~~~~~~

The RBA: low cache rba:(0xf.18b0.0) on disk rba:(0xf.19da.0)

low cache rba:(0xf.18b0.0)

	SYS@orcl11g> select to_number('f','xxxxx') from dual;
	TO_NUMBER('F','XXXXX')
	----------------------
						15
	SYS@orcl11g> select to_number('18b0','xxxxx') from dual;
	TO_NUMBER('18B0','XXXXX')
	-------------------------
						6320
	SYS@orcl11g> 

on disk rba:(0xf.19da.0)

	SYS@orcl11g> select to_number('f','xxxxx') from dual;
	TO_NUMBER('F','XXXXX')
	----------------------
						15
	SYS@orcl11g>
	SYS@orcl11g> select to_number('19da','xxxxx') from dual;
	TO_NUMBER('19DA','XXXXX')
	-------------------------
						6618
	SYS@orcl11g> 

The instance recovery is from the number redo log file#15 offset#6320 to redo log file#15 offset#6618.

When open the database, the alert logs(alert_orcl11g.log ) are the following.

The recovery process can be found in the alert log files.

	SYS@orcl11g> alter database open;

	Database altered.

	SYS@orcl11g> 
	++++++++++++++++++++++++++++++++++++++++++ 
	alter database open
	Beginning crash recovery of 1 threads
	parallel recovery started with 3 processes
	Started redo scan
	Completed redo scan
	read 149 KB redo, 55 data blocks need recovery
	Started redo application at
	Thread 1: logseq 15, block 6320               #--------------------------------------> low cache rba
	Recovery of Online Redo Log: Thread 1 Group 3 Seq 15 Reading mem 0
	Mem# 0: /u01/app/oracle/oradata/orcl11g/redo03.log
	Completed redo application of 0.03MB
	Completed crash recovery at
	Thread 1: logseq 15, block 6618, scn 1559118  #--------------------------------------> on disk rba


'Thread 1: logseq 15, block 6320' and 'Thread 1: logseq 15, block 6618' are the same with the dump control file's low cache rba on disk rba.

### The test of removing control file durning open database status.

Recovery the control file from ckpt process's fd.

	SYS@orcl11g> show parameter control_files
	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	control_files                        string      /u01/app/oracle/oradata/orcl11
													g/control01.ctl, /u01/app/orac
													le/fast_recovery_area/orcl11g/
													control02.ctl
	SYS@orcl11g> !cp /u01/app/oracle/oradata/orcl11g/control01.ctl /tmp/control01.ctl
	SYS@orcl11g> !cp /u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl /tmp/control02.ctl
	SYS@orcl11g> 
	SYS@orcl11g> !rm /u01/app/oracle/oradata/orcl11g/control01.ctl  /u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl
	SYS@orcl11g> !ps -ef | grep ckpt | grep -v grep
	oracle    1730     1  0 07:57 ?        00:00:00 ora_ckpt_orcl11g
	SYS@orcl11g> !ls -l /proc/1730/fd
	total 0
	lr-x------. 1 oracle oinstall 64 Jun  9 08:19 0 -> /dev/null
	l-wx------. 1 oracle oinstall 64 Jun  9 08:19 1 -> /dev/null
	lrwx------. 1 oracle oinstall 64 Jun  9 08:19 10 -> /u01/app/oracle/product/11.2.0.4/dbhome_1/dbs/lkORCL11G
	lr-x------. 1 oracle oinstall 64 Jun  9 08:19 11 -> /u01/app/oracle/product/11.2.0.4/dbhome_1/rdbms/mesg/oraus.msb
	l-wx------. 1 oracle oinstall 64 Jun  9 08:19 2 -> /dev/null
	lrwx------. 1 oracle oinstall 64 Jun  9 08:19 256 -> /u01/app/oracle/oradata/orcl11g/control01.ctl (deleted)
	lrwx------. 1 oracle oinstall 64 Jun  9 08:19 257 -> /u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl (deleted)
	lr-x------. 1 oracle oinstall 64 Jun  9 08:19 3 -> /dev/null
	lr-x------. 1 oracle oinstall 64 Jun  9 08:19 4 -> /dev/null
	lr-x------. 1 oracle oinstall 64 Jun  9 08:19 5 -> /dev/null
	lr-x------. 1 oracle oinstall 64 Jun  9 08:19 6 -> /u01/app/oracle/product/11.2.0.4/dbhome_1/rdbms/mesg/oraus.msb
	lr-x------. 1 oracle oinstall 64 Jun  9 08:19 7 -> /proc/1730/fd
	lr-x------. 1 oracle oinstall 64 Jun  9 08:19 8 -> /dev/zero
	lrwx------. 1 oracle oinstall 64 Jun  9 08:19 9 -> /u01/app/oracle/product/11.2.0.4/dbhome_1/dbs/hc_orcl11g.dat
	SYS@orcl11g> 
	SYS@orcl11g> !cp /proc/1730/fd/256 /u01/app/oracle/oradata/orcl11g/control01.ctl
	SYS@orcl11g> !cp /proc/1730/fd/257 /u01/app/oracle/fast_recovery_area/orcl11g/control02.ctl
	SYS@orcl11g> 
	SYS@orcl11g> shu immediate;
	Database closed.
	ORA-03113: end-of-file on communication channel
	Process ID: 1748
	Session ID: 191 Serial number: 3
	SYS@orcl11g> 
	SYS@orcl11g> startup 
	ORA-24324: service handle not initialized
	ORA-01041: internal error. hostdef extension doesn't exist
	SYS@orcl11g> exit
	Disconnected from Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options
	[oracle@databasevm001 ~]$ sqlplus / as sysdba

	SQL*Plus: Release 11.2.0.4.0 Production on Sat Jun 9 08:23:58 2018

	Copyright (c) 1982, 2013, Oracle.  All rights reserved.

	Connected to an idle instance.

	SYS@orcl11g> startup
	ORACLE instance started.

	Total System Global Area 1556787200 bytes
	Fixed Size                  1364844 bytes
	Variable Size             889195668 bytes
	Database Buffers          654311424 bytes
	Redo Buffers               11915264 bytes
	Database mounted.
	Database opened.
	SYS@orcl11g> 

However,there is the attention warning from the alert log and need to re-create the control file.


	********************* ATTENTION: ******************** 
	The controlfile header block returned by the OS
	has a sequence number that is too old. 
	The controlfile might be corrupted.
	PLEASE DO NOT ATTEMPT TO START UP THE INSTANCE 
	without following the steps below.
	RE-STARTING THE INSTANCE CAN CAUSE SERIOUS DAMAGE 
	TO THE DATABASE, if the controlfile is truly corrupted.
	In order to re-start the instance safely, 
	please do the following:
	(1) Save all copies of the controlfile for later 
		analysis and contact your OS vendor and Oracle support.
	(2) Mount the instance and issue: 
		ALTER DATABASE BACKUP CONTROLFILE TO TRACE;
	(3) Unmount the instance. 
	(4) Use the script in the trace file to
		RE-CREATE THE CONTROLFILE and open the database. 
	*****************************************************
	USER (ospid: 1748): terminating the instance
	Sat Jun 09 08:21:47 2018
	System state dump requested by (instance=1, osid=1718 (DIAG)), summary=[abnormal instance termination].
	System State dumped to trace file /u01/app/oracle/diag/rdbms/orcl11g/orcl11g/trace/orcl11g_diag_1718_20180609082147.trc
	Dumping diagnostic data in directory=[cdmp_20180609082147], requested by (instance=1, osid=1718 (DIAG)), summary=[abnormal instance termination].
	Instance terminated by USER, pid = 1748

The best ways to recovery control file can be referenced the other doucments...





To be continue....

Have a good life! 2018/06 via LinHong
	






