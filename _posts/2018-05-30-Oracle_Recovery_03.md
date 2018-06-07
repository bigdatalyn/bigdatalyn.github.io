---
layout: post
title: "Oracle Recover the delete/truncate/drop action"
category: Oracle
tags: Oracle flashback rman tts 
---

* content
{:toc}


Oracle Recover the delete/truncate/drop action

Recovering the database/datafile/block is easy if there was rman backup.
However it is pretty hard when delete/truncate/drop are happened due to human miss or bussiness bug.
There are some ways to recover the delete/truncate/drop action.






### Test env

#### OS/DB level

	[oracle@databasevm001 ~]$ cat /etc/redhat-release 
	Red Hat Enterprise Linux Server release 7.3 (Maipo)
	[oracle@databasevm001 ~]$ uname -r
	4.1.12-61.1.28.el7uek.x86_64
	[oracle@databasevm001 ~]$ 

#### Tablespace and table

Create tablespace rec_tbs and table scott.tab_delete.
Confirm the tablespace and other informations.

	SYS@orcl11g> create tablespace rec_tbs datafile '/u01/app/oracle/oradata/orcl11g/rec_tbs01.dbf' size 100m autoextend on maxsize 1g;

	Tablespace created.

	SYS@orcl11g> 
	SYS@orcl11g> create table sh.tab_delete tablespace rec_tbs as select * from dba_objects;

	Table created.

	SYS@orcl11g> 
	SYS@orcl11g> select tablespace_name,status from dba_tablespaces;

	TABLESPACE_NAME                STATUS
	------------------------------ ---------
	SYSTEM                         ONLINE
	SYSAUX                         ONLINE
	TEMP                           ONLINE
	USERS                          ONLINE
	DATA                           ONLINE
	UNDOTBS01                      ONLINE
	REC_TBS                        ONLINE

	7 rows selected.

	SYS@orcl11g> 
	SYS@orcl11g> col member for a60
	SYS@orcl11g> select group#,member from v$logfile;

		GROUP# MEMBER
	---------- ------------------------------------------------------------
			1 /u01/app/oracle/oradata/orcl11g/redo01.log
			3 /u01/app/oracle/oradata/orcl11g/redo03.log
			2 /u01/app/oracle/oradata/orcl11g/redo02.log

	SYS@orcl11g> 
	SYS@orcl11g> col file_name for a50
	SYS@orcl11g> col tablespace_name for a10
	SYS@orcl11g> select file_id,file_name,tablespace_name,online_status from dba_data_files order by file_id;

	FILE_ID FILE_NAME                                          TABLESPACE ONLINE_
	---------- -------------------------------------------------- ---------- -------
			1 /u01/app/oracle/oradata/orcl11g/system01.dbf       SYSTEM     SYSTEM
			2 /u01/app/oracle/oradata/orcl11g/sysaux01.dbf       SYSAUX     ONLINE
			3 /u01/app/oracle/oradata/orcl11g/undotbs01.dbf      UNDOTBS01  ONLINE
			4 /u01/app/oracle/oradata/orcl11g/users01.dbf        USERS      ONLINE
			5 /u01/app/oracle/oradata/orcl11g/data01.dbf         DATA       ONLINE
			6 /u01/app/oracle/oradata/orcl11g/rec_tbs01.dbf      REC_TBS    ONLINE

	6 rows selected.

	SYS@orcl11g> 

#### RMAN backup database

	[oracle@databasevm001 ~]$ rman target /
	RMAN> backup database plus archivelog format '/home/oracle/backup/db_%u' delete input;
	RMAN> sql 'alter system switch logfile';

	sql statement: alter system switch logfile

	RMAN> 

About delete input/delete all input in rman:

	delete input 只备份一个路径下的archivelog，只删除备份的目标路径下的archivelog;
	delete all input 只备份一个路径下的archivelog,删除所有路径下的archivelog;

#### Current SCN

The current scn and the count of the table;
	
	SYS@orcl11g> select count(1) from sh.tab_delete;

	COUNT(1)
	----------
		86673

	SYS@orcl11g> select current_scn from v$database;

	CURRENT_SCN
	-----------
		1443085

	SYS@orcl11g> 


### the recovery of delete table


nhy6&UJM



To be continue....

Have a good day! 2018/05 via LinHong
	






