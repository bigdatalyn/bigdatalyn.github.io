---
layout: post
title: "Oracle 12c - Resetlogs"
category: Unix
tags: Box
---

* content
{:toc}


Oracle 12c - Study Resetlogs


### When to use resetlogs?

Backup and recover is the important toipc in Database area. the resetlogs knowledge is important in Backup&Recover.

Resetlogs means that reset the online redolog.

We know that the instance need redologs while the instance startup, we can use resetlogs to startup instance while the redolog is deleted or unusable.

Oracle will create the new redologs according to the controlfile's configuration(path/name/size/group etc.) in resetlog mode.

So we usually use resetlogs to incomplete database recovery or some scences like OGG's setup...

The root cause is that the redologs can NOT be used.

### How to use resetlogs?

I use test case to pratise the resetlogs as the following steps. (Please do NOT test these in Production env.)

	1. Stop database
	2. Delete redolog manually
	3. Startup instance in mount mode
	4. Open database in resetlogs

#### 1. Stop database

Confirm with the datafile/controlfiles/logfiles/tempfiles before stop database in normal mode.

	select name from v$datafile union select name from v$controlfile union select member from v$logfile union select name from v$tempfile;
	shu immediate;

Logs:
	
	[oracle@host01 ~]$ export ORACLE_SID=PRODCDB; sqlplus / as sysdba
	SQL*Plus: Release 12.1.0.2.0 Production on Thu Mar 15 12:43:22 2018
	Copyright (c) 1982, 2014, Oracle.  All rights reserved.
	Connected to an idle instance.
	SQL> startup
	ORACLE instance started.
	Total System Global Area  838860800 bytes
	Fixed Size		    2929936 bytes
	Variable Size		  570428144 bytes
	Database Buffers	  260046848 bytes
	Redo Buffers		    5455872 bytes
	Database mounted.
	Database opened.
	SQL>
	SQL> select name from v$datafile union select name from v$controlfile union select member from v$logfile union select name from v$tempfile;
	NAME
	--------------------------------------------------------------------------------
	/u01/app/oracle/fast_recovery_area/PRODCDB/control02.ctl
	/u01/app/oracle/oradata/PRODCDB/PDBPROD1/PDBPROD1_users01.dbf
	/u01/app/oracle/oradata/PRODCDB/PDBPROD1/example01.dbf
	/u01/app/oracle/oradata/PRODCDB/PDBPROD1/sysaux01.dbf
	/u01/app/oracle/oradata/PRODCDB/PDBPROD1/system01.dbf
	/u01/app/oracle/oradata/PRODCDB/PDBPROD1/temp01.dbf
	/u01/app/oracle/oradata/PRODCDB/PDBPROD2/PDBPROD2_users01.dbf
	/u01/app/oracle/oradata/PRODCDB/PDBPROD2/sysaux01.dbf
	/u01/app/oracle/oradata/PRODCDB/PDBPROD2/system01.dbf
	/u01/app/oracle/oradata/PRODCDB/PDBPROD2/temp01.dbf
	/u01/app/oracle/oradata/PRODCDB/control01.ctl
	NAME
	--------------------------------------------------------------------------------
	/u01/app/oracle/oradata/PRODCDB/pdbseed/sysaux01.dbf
	/u01/app/oracle/oradata/PRODCDB/pdbseed/system01.dbf
	/u01/app/oracle/oradata/PRODCDB/pdbseed/temp01.dbf
	/u01/app/oracle/oradata/PRODCDB/redo01.log
	/u01/app/oracle/oradata/PRODCDB/redo02.log
	/u01/app/oracle/oradata/PRODCDB/redo03.log
	/u01/app/oracle/oradata/PRODCDB/sysaux01.dbf
	/u01/app/oracle/oradata/PRODCDB/system01.dbf
	/u01/app/oracle/oradata/PRODCDB/temp01.dbf
	/u01/app/oracle/oradata/PRODCDB/undotbs01.dbf
	/u01/app/oracle/oradata/PRODCDB/users01.dbf
	22 rows selected.
	SQL> 

	SQL> shu immediate;                                   
	Database closed.
	Database dismounted.
	ORACLE instance shut down.
	SQL>
	

#### 2. Delete redolog manually

Remove the redo*.log file in OS level.

	host rm redo*.log

Logs:
	
	SQL> host rm /u01/app/oracle/oradata/PRODCDB/redo*.log
	SQL> host ls /u01/app/oracle/oradata/PRODCDB/redo*.log
	ls: cannot access /u01/app/oracle/oradata/PRODCDB/redo*.log: No such file or directory
	SQL> 

#### 3. Startup instance in mount mode

Startup in mount mode.(just read controlfile and don't open file like redologs.)

	startup mount;

Logs:

	SQL> startup mount;
	ORACLE instance started.

	Total System Global Area  838860800 bytes
	Fixed Size		    2929936 bytes
	Variable Size		  570428144 bytes
	Database Buffers	  260046848 bytes
	Redo Buffers		    5455872 bytes
	Database mounted.
	SQL> 
	
	
#### 4. Open database in resetlogs

Need execute incompleted database recovery before open resetlogs.

	alter database open resetlogs;
	recover database until cancel;
	alter database open resetlogs;

Logs:

	SQL> alter database open resetlogs;
	alter database open resetlogs
	*
	ERROR at line 1:
	ORA-01139: RESETLOGS option only valid after an incomplete database recovery
	SQL> recover database until cancel;
	Media recovery complete.
	SQL> alter database open resetlogs;
	Database altered.
	SQL> host ls /u01/app/oracle/oradata/PRODCDB/redo*.log
	/u01/app/oracle/oradata/PRODCDB/redo01.log
	/u01/app/oracle/oradata/PRODCDB/redo02.log
	/u01/app/oracle/oradata/PRODCDB/redo03.log
	SQL> 


In this test case, we can know the resetlogs's knowledge.

### Other

Regarding the recover commands, please check the following documents.


[oracle备份恢复之recover database的四条语句区别](https://www.cnblogs.com/andy6/p/5925433.html)

	1. recover database using backup controlfile
	如果丢失当前控制文件，用冷备份的控制文件恢复的时候，用来告诉oracle，不要以controlfile中的scn作为恢复的终点；
	 
	2. recover database until cancel
	redo都丢失，会先去自动应用归档日志,可以实现最大的恢复；
	 
	4. recover database until cancel using backup controlfile;
	如果丢失当前controlfile并且current/active redo都丢失，以旧的redo中的scn为恢复终点。因为没有应用归档日志，所有会丢失数据。 
	要理解recover database using backup controlfile，先理解 recover database，也就是说，不加using backup controlfile的情况。
	在普通的recover database 或者 recover tablespace, recover datafile时， Oracle会以当前controlfile所纪录的SCN为准，利用archive log和 redo log的redo entry, 把相关的datafile 的 block恢复到“当前controlfile所纪录的SCN”
	而某些情况下，Oracle需要把数据恢复到比当前controlfile所纪录的SCN还要靠后的位置（比如说，control file是backup controlfile , 或者 controlfile是根据trace create的。）,这时候，就需要用using backup controlfile.   恢复就不会受“当前controlfile所记录的SCN”的限制。这时候的限制就来自于你的语句(until time , until scn)，或者可用的archive log(until cancel)



Have a good day! 2018/03 via LinHong
	






