---
layout: post
title: "Oracle 12c - The control file error#ORA-00205#ORA-00202"
category: Oracle
tags: Oracle ORA-00202 ORA-00205 12c
---

* content
{:toc}


### Oracle 12c - The control file error#ORA-00205#ORA-00202

I met the ORA-00205 error while I modified the control_files parameter just like the following steps...

	SYS@PRODCDB> alter system set control_files='/u01/app/oracle/oradata/PRODCDB/control00001.ctl, /u01/app/oracle/fast_recovery_area/PRODCDB/control02.ctl, /u01/app/oracle/oradata/PRODCDB/control00003.ctl' scope=spfile;
	System altered.
	SYS@PRODCDB> shu immediate;
	Database closed.
	Database dismounted.
	ORACLE instance shut down.
	SYS@PRODCDB> !cp /u01/app/oracle/fast_recovery_area/PRODCDB/control02.ctl /u01/app/oracle/oradata/PRODCDB/control00001.ctl 
	SYS@PRODCDB> !cp /u01/app/oracle/fast_recovery_area/PRODCDB/control02.ctl /u01/app/oracle/oradata/PRODCDB/control00003.ctl        
	SYS@PRODCDB> startup
	ORACLE instance started.
	Total System Global Area  838860800 bytes
	Fixed Size		    2929936 bytes
	Variable Size		  608176880 bytes
	Database Buffers	  222298112 bytes
	Redo Buffers		    5455872 bytes
	ORA-00205: error in identifying control file, check alert log for more info
	SYS@PRODCDB>

What is the reason???










We can check the alert log for detail informations.

	ORA-00210: cannot open the specified control file
	ORA-00202: control file: '/u01/app/oracle/oradata/PRODCDB/control01.ctl,/u01
	/app/oracle/fast_recovery_area/PRODCDB/control02.ctl,/u01/app/oracle/oradata/PRO
	DCDB/control03.ctl'
	ORA-27037: unable to obtain file status
	Linux-x86_64 Error: 2: No such file or directory
	Additional information: 3

Do you understand what is the reason???

The comma position!!!! We should be very careful with the parameter.

#### reset the control_files and restartup

Use the following steps, we can starup the database.

	SYS@PRODCDB> startup nomount;
	ORACLE instance started.
	Total System Global Area  838860800 bytes
	Fixed Size		    2929936 bytes
	Variable Size		  608176880 bytes
	Database Buffers	  222298112 bytes
	Redo Buffers		    5455872 bytes
	SYS@PRODCDB> 
	SYS@PRODCDB> alter system set control_files='/u01/app/oracle/oradata/PRODCDB/control00001.ctl','/u01/app/oracle/fast_recovery_area/PRODCDB/control02.ctl','/u01/app/oracle/oradata/PRODCDB/control00003.ctl' scope=spfile;
	System altered.
	SYS@PRODCDB>
	SYS@PRODCDB> shu immediate;
	ORA-01507: database not mounted
	ORACLE instance shut down.
	SYS@PRODCDB> startup
	ORACLE instance started.
	Total System Global Area  838860800 bytes
	Fixed Size		    2929936 bytes
	Variable Size		  608176880 bytes
	Database Buffers	  222298112 bytes
	Redo Buffers		    5455872 bytes
	Database mounted.
	Database opened.
	SYS@PRODCDB> 

#### Other Tips: 

I tried to rebuild the control file to starup database with the sample sql.

Rebuild control file:

** You should know the archivelog mode and know the datafile is NOT damaged.(all datafiles are good, just the control file is uncorrect.)

![CREATE CONTROLFILE ]({{ "https://docs.oracle.com/database/121/SQLRF/img/create_controlfile.gif"}})	

Sample:

	create controlfile reuse database prodcdb noresetlogs noarchivelog
	logfile
	GROUP 1 '/u01/app/oracle/oradata/PRODCDB/redo01.log' size 50m,
	GROUP 2 '/u01/app/oracle/oradata/PRODCDB/redo02.log' size 50m,
	GROUP 3 '/u01/app/oracle/oradata/PRODCDB/redo03.log' size 50m
	datafile
	'/u01/app/oracle/oradata/PRODCDB/system01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/pdbseed/system01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/sysaux01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/pdbseed/sysaux01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/undotbs01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/users01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/PDBPROD1/system01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/PDBPROD1/sysaux01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/PDBPROD1/PDBPROD1_users01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/PDBPROD2/system01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/PDBPROD2/sysaux01.dbf',
	'/u01/app/oracle/oradata/PRODCDB/PDBPROD2/PDBPROD2_users01.dbf';

	Control file created.

	SYS@PRODCDB> 
	SYS@PRODCDB> alter database open;
	Database altered.
	SYS@PRODCDB> 


	
[Database SQL Language Reference/CREATE CONTROLFILE ](https://docs.oracle.com/database/121/SQLRF/statements_5004.htm#SQLRF01203)




	
++++++++++++++++ EOF LinHong ++++++++++++++++	





