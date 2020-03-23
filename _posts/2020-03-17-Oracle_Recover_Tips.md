---
layout: post
title: "Oracle Recover Tips"
category: Oracle
tags: Oracle Recover Tips 
---

* content
{:toc}

Oracle Recover Tips

Tips: 

### 1.Recover oracle password file 

Wrong msg:

	ERROR:
	ORA-01017: invalid username/password; logon denied

Solution:

Use orapwd command to recover the password file.

	orapwd file=$ORACLE_HOME/dbs/orapwORCL password=Welcome1 force=y  // force=y (if the password file is existed, will replace the password file instead by force)









### 2. Recover oracle spfile file.

Wrong msg:

	SQL> alter system set xxxx=yyyy;
	alter system set xxxx=yyyy
	*
	ERROR at line 1:
	ORA-01565: error in identifying file
	'/u01/app/oracle/product/11.2.0/db_1/dbs/spfileORCL.ora'
	ORA-27046: file size is not a multiple of logical block size
	Additional information: 1

Solution:

Use rman to recover the spfile.

	RMAN> list backup of spfile;
	RMAN> restore spfile to '/home/oracle/spfileORCL.ora' from '/backup/c-xxxxxxxxxx';
	
	SQL> shutdown immediate
	SQL> startup 
	
Other msg:
	
	ORA-32011: cannot restore SPFILE to location already being used by the instance

Fix:
	
	recover spfile in other target path and copy the new one to the path.
	
Another Solution:

	create spfile='/home/oracle/spfileORCL.ora' from memory;
	
### 3.Recover the control file.

Wrong msg:

	Simulation:

	SQL> show parameter control_files
	SQL> !echo '' > /u01/app/oracle/oradata/ORCL/control01.ctl

If we want to switch logfile, there will be the following msg.

	SQL> alter system switch logfile;
	alter system switch logfile
	*
	ERROR at line 1:
	ORA-03113: end-of-file on communication channel
	Process ID: 3433
	Session ID: 1 Serial number: 5
	
	Alert log:
	
	Errors in file /u01/app/oracle/diag/rdbms/ORCL/ORCL/trace/ORCL_ckpt_3415.trc:
	ORA-00202: control file: '/u01/app/oracle/oradata/ORCL/control01.ctl'
	ORA-27072: File I/O error
	...
	LGWR (ospid: 3887): terminating the instance due to error 227

	System state dump requested by (instance=1, osid=3887 (LGWR)), summary=[abnormal instance termination].
	System State dumped to trace file /u01/app/oracle/diag/rdbms/ORCL/ORCL/trace/ORCL_diag_3413_20200318114037.trc
	Dumping diagnostic data in directory=[], requested by (instance=1, osid=3887 (LGWR)), summary=[abnormal instance termination].
	Instance terminated by LGWR, pid = 3887
	
	
Solution:

Use rman to recover the control file

	rman target /
	RMAN> startup nomount
	RMAN> restore controlfile from '/backup/c-xxxxxxxxx-00';
	RMAN> alter database mount; 
	RMAN> recover database;  // Use archive log and redo log to recover control file.
	RMAN> alter database open resetlogs;
	
We use resetlogs mode, so the full backup must be done again due to the before backup's novaild.

If we use mutil control files, we can copy the another controlfile to recover the wrong control file and restart db.

### 4. Recover the datafile 

#### 4.1 Recovery the user datafile

Wrong msg:

	Simulation:
	
	echo '' > /u01/app/oracle/oradata/ORCL/user_tbs01.dbf

	SQL> select * from lyn.tab01;  // lyn.tab01 is in the datafile user_tbs01.dbf
	select * from lyn.tab01
						*
	ERROR at line 1:
	ORA-01115: IO error reading block from file  (block # )
	ORA-01110: data file 7: '/u01/app/oracle/oradata/ORCL/user_tbs01.dbf'
	ORA-27072: File I/O error
	Additional information: 4
	Additional information: 130
	
Solution:

	SQL> alter database datafile 7 offline;
	RMAN> restore datafile 7;
	RMAN> recover datafile 7; 
	SQL> alter database datafile 7 online;
	

#### 4.2 Recover the system datafile

Wrong msg:

	Simulation:
	
	echo '' > /u01/app/oracle/oradata/ORCL/system01.dbf
	
	SQL> select * from dba_users;
	select * from dba_users
				  *
	ERROR at line 1:
	ORA-00604: error occurred at recursive SQL level 1
	ORA-01115: IO error reading block from file  (block # )
	ORA-01110: data file 1: '/u01/app/oracle/oradata/ORCL/system01.dbf'
	ORA-27072: File I/O error

Solution：

	SQL> shutdown abort
	SQL> startup mount
	RMAN> restore datafile 1;
	RMAN> recover datafile 1; 
	SQL> alter database open;
	

sysaux datafile's recover is the same with 4.1 user's datafile.

Wrong msg:

	SQL> select * from sys.WRI$_OPTSTAT_HISTHEAD_HISTORY;
	ERROR:
	ORA-01578: ORACLE data block corrupted (file # 2, block # 986)
	ORA-01110: data file 2: '/u01/app/oracle/oradata/ORCL/sysaux01.dbf'

undo datafile's recover is the same with 4.2 system's datafile due to the undo datafile can NOT be offline.

Wrong msg:

	ERROR at line 1:
	ORA-00603: ORACLE server session terminated by fatal error
	ORA-01578: ORACLE data block corrupted (file # 3, block # 144)
	ORA-01110: data file 3: '/u01/app/oracle/oradata/ORCL/undotbs01.dbf'
	ORA-01578: ORACLE data block corrupted (file # 3, block # 144)
	ORA-01110: data file 3: '/u01/app/oracle/oradata/ORCL/undotbs01.dbf'
	Process ID: 2835
	Session ID: 20 Serial number: 85

Other Solution:

	RMAN> list failure;
	starting full resync of recovery catalog
	full resync complete
	Database Role: PRIMARY
	List of Database Failures
	=========================
	Failure ID Priority Status Time Detected Summary
	---------- -------- --------- ------------- -------
	482 CRITICAL OPEN 17-JAN-20 System datafile 1:
	'/u01/app/oracle/oradata/ORCL/system01.dbf' is missing


	RMAN> advise failure;
	RMAN> repair failure;

### 5. Recover redo log.

#### 5.1 Recover INACTIVE redo log.

Wrong msg:

	SQL> select a.group#, a.member, b.status from v$logfile a, v$log b where a.group#=b.group# order by group#;
		GROUP# MEMBER                                             STATUS
	---------- -------------------------------------------------- ------------
			 1 /u01/app/oracle/oradata/ORCL/redo01.log        INACTIVE
			 2 /u01/app/oracle/oradata/ORCL/redo02.log        CURRENT
			 3 /u01/app/oracle/oradata/ORCL/redo03.log        INACTIVE

	SQL> !echo '' > /u01/app/oracle/oradata/ORCL/redo03.log
	
	SQL> INSERT into xxxx select * from yyyy;
	
	Errors in file /u01/app/oracle/diag/rdbms/ORCL/ORCL/trace/ORCL_arc0_9005.trc:
	ORA-00313: open failed for members of log group 3 of thread 1
	ORA-00312: online log 3 thread 1: '/u01/app/oracle/oradata/ORCL/redo03.log'
	ORA-27048: skgfifi: file header information is invalid
	Additional information: 12
	Master archival failure: 313
	SQL> alter system switch logfile;

Solution:

	SQL> alter database clear unarchived logfile group 3;  // use this command, the archive action will not be continual and need to full backup.
	
#### 5.2 Recover CURRENT redo log.

Wrong msg:

	SQL> select a.group#, a.member, b.status from v$logfile a, v$log b where a.group#=b.group# order by group#;
		GROUP# MEMBER                                             STATUS
	---------- -------------------------------------------------- ------------
			 1 /u01/app/oracle/oradata/ORCL/redo01.log        INACTIVE
			 2 /u01/app/oracle/oradata/ORCL/redo02.log        INACTIVE
			 3 /u01/app/oracle/oradata/ORCL/redo03.log        CURRENT

	SQL> !echo '' > /u01/app/oracle/oradata/ORCL/redo03.log
	
	SQL> alter system switch logfile;
	alter system switch logfile
	*
	ERROR at line 1:
	ORA-03113: end-of-file on communication channel
	Process ID: 3758
	Session ID: 1 Serial number: 9
	
	Alert log:
	
	ORA-00316: log 2 of thread 1, type 0 in header is not log file
	ORA-00312: online log 2 thread 1: '/u01/app/oracle/oradata/ORCL/redo02.log'
	LGWR (ospid: 8969): terminating the instance due to error 316
	Instance terminated by LGWR, pid = 3458

Solution:
	
	Unconsistent recover, so there will be loss data for the current log is wrong...(Please be careful!!!)
	
	sqlplus / as sysdba
	SQL> startup mount
	SQL> recover database until cancel; 
	
	After that start database resetlogs mode.
	
	SQL> alter database open resetlogs;  // Can not start database.
	alter database open resetlogs
	*
	ERROR at line 1:
	ORA-01194: file 1 needs more recovery to be consistent
	ORA-01110: data file 1: '/u01/app/oracle/oradata/ORCL/system01.dbf'
	
	SQL> alter system set "_allow_resetlogs_corruption"=true scope=spfile; 
	SQL> shutdown abort
	SQL> startup mount
	SQL> recover database until cancel;  // Unconsistent recover
	Input 'cancel'
	SQL> alter database open resetlogs;
	
	#After the above steps, suggest to do expdb the data and re-create database.
	
### Summary

1. Oracle backup is important! 

2. Oracle backup is important! 

3. Oracle backup is important!

4. Use mul members for Oracle control file and redo log file.


### Reference







Have a good work&life! 2020/03 via LinHong


