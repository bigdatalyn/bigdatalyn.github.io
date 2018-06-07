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

#### N0.1 Use flashback query

Query the data in UNDO tablespace with SCN timestamp.But it is limited the UNDO_RETENTION.
It can't be recovery if the transactions are busy...

#查询undo中此scn或时间点之前的记录并插入到一个表中,再插入回来.此方法依赖于UNDO_RETENTION,如果保留时间太短且事务繁忙,就无法恢复.

	SYS@orcl11g> select count(*) from sh.tab_delete as of scn 1443085;

	COUNT(*)
	----------
		86673

	SYS@orcl11g> create table sh.tab_delete_tmp tablespace rec_tbs as select * from sh.tab_delete as of scn 1443085;

	Table created.

	SYS@orcl11g> select count(1) from sh.tab_delete_tmp;

	COUNT(1)
	----------
		86673

	SYS@orcl11g> select count(1) from sh.tab_delete;

	COUNT(1)
	----------
			0

	SYS@orcl11g> 

#### N0.2 Duplicate database/DataGuard.

Create duplication Database using rman duplicate database.

The steps are like create DG standby database.

> If there is RMAN-06457: UNTIL SCN (xxxxx) is ahead of last SCN in archived logs (xxxxx) when executing duplicate
> please execute /sql 'alter system switch logfile'/ to switch Prod database's redolog.
> Using the /skip readonly,skip tablespace / to skip the unnecessary tablespaces to save time.

Example:

	rman target / auxiliary sys/system@orcl11g_sb

	RMAN> run
	{
	set until scn XXXXXXX;
	duplicate target database
	to orcl11g_sb
	spfile
	parameter_value_convert 'orcl11g','orcl11g_sb'
	set log_file_name_convert 'orcl11g','orcl11g_sb'
	db_file_name_convert 'orcl11g','orcl11g_sb'
	skip readonly
	skip tablespace TBS01;
	}

After completing rman(duplicatie database), we can use dblink/expdp & impdp to recovery the tables.

#### NO.3 Transport tablespace

About TTS:

	迁移或备份数据库可以采用传输表空间技术TTS，
	优点是操作较简便，只需要将元数据进行导出导入，数据文件可以使用FTP方式从源库拷贝至目标库；
	缺点是数据文件传输至目标库之前，需要将源库表空间置为只读，相当于停业务，所以需要根据业务要求来判断是否可以采用这种方式;
	增强版是XTTS

We use the same Database to tts the target tablespace to recovery table.
So they are the same platform and Character set. If not, we should use rman to change the datafile or tablespace to tts.

	SYS@orcl11g> col PLATFORM_NAME for a30
	SYS@orcl11g> SELECT d.PLATFORM_NAME, ENDIAN_FORMAT 	FROM V$TRANSPORTABLE_PLATFORM tp, V$DATABASE d 	WHERE tp.PLATFORM_NAME = d.PLATFORM_NAME;
	PLATFORM_NAME                  ENDIAN_FORMAT
	------------------------------ ------------------------------
	Linux IA (32-bit)              Little

	SYS@orcl11g> 

#### Check tablespace is OK or NOT.

Use the dbms_tts.transport_set_check to check.

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

	SYS@orcl11g>begin
		dbms_tts.transport_set_check('REC_TBS', true,true);
	end;
	/
	PL/SQL procedure successfully completed.
	SYS@orcl11g>
	SYS@orcl11g> select * from transport_set_violations;

	no rows selected

	SYS@orcl11g> 

#### RMAN to transport the target tablespace

This step will set the target tablespace to read status just like the command executing log.

	rman target /

	RMAN> transport tablespace 'REC_TBS'
	tablespace destination '/home/oracle/backup_tts'
	auxiliary destination '/home/oracle/backup_tts'
	until scn 1443085;

	RMAN> transport tablespace 'REC_TBS'
	tablespace destination '/home/oracle/backup_tts'
	auxiliary destination '/home/oracle/backup_tts'
	until scn 1443085;2> 3> 4> 

	using target database control file instead of recovery catalog
	RMAN-05026: WARNING: presuming following set of tablespaces applies to specified point-in-time

	List of tablespaces expected to have UNDO segments
	Tablespace SYSTEM
	Tablespace UNDOTBS01

	Creating automatic instance, with SID='mmxA'

	initialization parameters used for automatic instance:
	db_name=ORCL11G
	db_unique_name=mmxA_tspitr_ORCL11G
	compatible=11.2.0.4.0
	db_block_size=8192
	db_files=200
	sga_target=1G
	processes=80
	db_create_file_dest=/home/oracle/backup_tts
	log_archive_dest_1='location=/home/oracle/backup_tts'
	#No auxiliary parameter file used


	starting up automatic instance ORCL11G

	Oracle instance started

	Total System Global Area    1071333376 bytes

	Fixed Size                     1369420 bytes
	Variable Size                289409716 bytes
	Database Buffers             775946240 bytes
	Redo Buffers                   4608000 bytes
	Automatic instance created
	Running TRANSPORT_SET_CHECK on recovery set tablespaces
	TRANSPORT_SET_CHECK completed successfully

	contents of Memory Script:
	{
	# set requested point in time
	set until  scn 1443085;
	# restore the controlfile
	restore clone controlfile;
	# mount the controlfile
	sql clone 'alter database mount clone database';
	# archive current online log 
	sql 'alter system archive log current';
	}
	executing Memory Script

	executing command: SET until clause

	Starting restore at 07-JUN-18
	allocated channel: ORA_AUX_DISK_1
	channel ORA_AUX_DISK_1: SID=114 device type=DISK
	allocated channel: ORA_AUX_DISK_2
	channel ORA_AUX_DISK_2: SID=5 device type=DISK

	channel ORA_AUX_DISK_1: starting datafile backup set restore
	channel ORA_AUX_DISK_1: restoring control file
	channel ORA_AUX_DISK_1: reading from backup piece /u01/app/oracle/fast_recovery_area/ORCL11G/backupset/2018_06_05/o1_mf_ncsnf_TAG20180605T164132_fkfhdx61_.bkp
	channel ORA_AUX_DISK_1: piece handle=/u01/app/oracle/fast_recovery_area/ORCL11G/backupset/2018_06_05/o1_mf_ncsnf_TAG20180605T164132_fkfhdx61_.bkp tag=TAG20180605T164132
	channel ORA_AUX_DISK_1: restored backup piece 1
	channel ORA_AUX_DISK_1: restore complete, elapsed time: 00:00:02
	output file name=/home/oracle/backup_tts/ORCL11G/controlfile/o1_mf_fklqoh6p_.ctl
	Finished restore at 07-JUN-18

	sql statement: alter database mount clone database

	sql statement: alter system archive log current

	contents of Memory Script:
	{
	# set requested point in time
	set until  scn 1443085;
	# set destinations for recovery set and auxiliary set datafiles
	set newname for clone datafile  1 to new;
	set newname for clone datafile  3 to new;
	set newname for clone datafile  2 to new;
	set newname for clone tempfile  1 to new;
	set newname for datafile  6 to 
	"/home/oracle/backup_tts/rec_tbs01.dbf";
	# switch all tempfiles
	switch clone tempfile all;
	# restore the tablespaces in the recovery set and the auxiliary set
	restore clone datafile  1, 3, 2, 6;
	switch clone datafile all;
	}
	executing Memory Script

	executing command: SET until clause

	executing command: SET NEWNAME

	executing command: SET NEWNAME

	executing command: SET NEWNAME

	executing command: SET NEWNAME

	executing command: SET NEWNAME

	renamed tempfile 1 to /home/oracle/backup_tts/ORCL11G/datafile/o1_mf_temp_%u_.tmp in control file

	Starting restore at 07-JUN-18
	using channel ORA_AUX_DISK_1
	using channel ORA_AUX_DISK_2

	channel ORA_AUX_DISK_1: starting datafile backup set restore
	channel ORA_AUX_DISK_1: specifying datafile(s) to restore from backup set
	channel ORA_AUX_DISK_1: restoring datafile 00001 to /home/oracle/backup_tts/ORCL11G/datafile/o1_mf_system_%u_.dbf
	channel ORA_AUX_DISK_1: restoring datafile 00003 to /home/oracle/backup_tts/ORCL11G/datafile/o1_mf_undotbs0_%u_.dbf
	channel ORA_AUX_DISK_1: restoring datafile 00002 to /home/oracle/backup_tts/ORCL11G/datafile/o1_mf_sysaux_%u_.dbf
	channel ORA_AUX_DISK_1: restoring datafile 00006 to /home/oracle/backup_tts/rec_tbs01.dbf
	channel ORA_AUX_DISK_1: reading from backup piece /u01/app/oracle/fast_recovery_area/ORCL11G/backupset/2018_06_05/o1_mf_nnndf_TAG20180605T164132_fkfh9wqm_.bkp
	channel ORA_AUX_DISK_1: piece handle=/u01/app/oracle/fast_recovery_area/ORCL11G/backupset/2018_06_05/o1_mf_nnndf_TAG20180605T164132_fkfh9wqm_.bkp tag=TAG20180605T164132
	channel ORA_AUX_DISK_1: restored backup piece 1
	channel ORA_AUX_DISK_1: restore complete, elapsed time: 00:01:05
	Finished restore at 07-JUN-18

	datafile 1 switched to datafile copy
	input datafile copy RECID=5 STAMP=978194167 file name=/home/oracle/backup_tts/ORCL11G/datafile/o1_mf_system_fklqooxw_.dbf
	datafile 3 switched to datafile copy
	input datafile copy RECID=6 STAMP=978194167 file name=/home/oracle/backup_tts/ORCL11G/datafile/o1_mf_undotbs0_fklqooyw_.dbf
	datafile 2 switched to datafile copy
	input datafile copy RECID=7 STAMP=978194167 file name=/home/oracle/backup_tts/ORCL11G/datafile/o1_mf_sysaux_fklqooy4_.dbf
	datafile 6 switched to datafile copy
	input datafile copy RECID=8 STAMP=978194167 file name=/home/oracle/backup_tts/rec_tbs01.dbf

	contents of Memory Script:
	{
	# set requested point in time
	set until  scn 1443085;
	# online the datafiles restored or switched
	sql clone "alter database datafile  1 online";
	sql clone "alter database datafile  3 online";
	sql clone "alter database datafile  2 online";
	sql clone "alter database datafile  6 online";
	# recover and open resetlogs
	recover clone database tablespace  "REC_TBS", "SYSTEM", "UNDOTBS01", "SYSAUX" delete archivelog;
	alter clone database open resetlogs;
	}
	executing Memory Script

	executing command: SET until clause

	sql statement: alter database datafile  1 online

	sql statement: alter database datafile  3 online

	sql statement: alter database datafile  2 online

	sql statement: alter database datafile  6 online

	Starting recover at 07-JUN-18
	using channel ORA_AUX_DISK_1
	using channel ORA_AUX_DISK_2

	starting media recovery

	archived log for thread 1 with sequence 8 is already on disk as file /u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_06_05/o1_mf_1_8_fkfho3jc_.arc
	archived log for thread 1 with sequence 9 is already on disk as file /u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_06_05/o1_mf_1_9_fkfj632d_.arc
	channel ORA_AUX_DISK_1: starting archived log restore to default destination
	channel ORA_AUX_DISK_1: restoring archived log
	archived log thread=1 sequence=7
	channel ORA_AUX_DISK_1: reading from backup piece /home/oracle/backup/db_0lt4mrcu
	channel ORA_AUX_DISK_1: piece handle=/home/oracle/backup/db_0lt4mrcu tag=TAG20180605T164310
	channel ORA_AUX_DISK_1: restored backup piece 1
	channel ORA_AUX_DISK_1: restore complete, elapsed time: 00:00:01
	archived log file name=/home/oracle/backup_tts/1_7_977569105.dbf thread=1 sequence=7
	channel clone_default: deleting archived log(s)
	archived log file name=/home/oracle/backup_tts/1_7_977569105.dbf RECID=39 STAMP=978194168
	archived log file name=/u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_06_05/o1_mf_1_8_fkfho3jc_.arc thread=1 sequence=8
	archived log file name=/u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_06_05/o1_mf_1_9_fkfj632d_.arc thread=1 sequence=9
	media recovery complete, elapsed time: 00:00:02
	Finished recover at 07-JUN-18

	database opened

	contents of Memory Script:
	{
	# make read only the tablespace that will be exported
	sql clone 'alter tablespace  "REC_TBS" read only';
	# create directory for datapump export
	sql clone "create or replace directory STREAMS_DIROBJ_DPDIR as ''
	/home/oracle/backup_tts''";
	}
	executing Memory Script

	sql statement: alter tablespace  "REC_TBS" read only

	sql statement: create or replace directory STREAMS_DIROBJ_DPDIR as ''/home/oracle/backup_tts''

	Performing export of metadata...
	EXPDP> Starting "SYS"."TSPITR_EXP_mmxA":  
	EXPDP> Processing object type TRANSPORTABLE_EXPORT/PLUGTS_BLK
	EXPDP> Processing object type TRANSPORTABLE_EXPORT/TABLE
	EXPDP> Processing object type TRANSPORTABLE_EXPORT/POST_INSTANCE/PLUGTS_BLK
	EXPDP> Master table "SYS"."TSPITR_EXP_mmxA" successfully loaded/unloaded
	EXPDP> ******************************************************************************
	EXPDP> Dump file set for SYS.TSPITR_EXP_mmxA is:
	EXPDP>   /home/oracle/backup_tts/dmpfile.dmp
	EXPDP> ******************************************************************************
	EXPDP> Datafiles required for transportable tablespace REC_TBS:
	EXPDP>   /home/oracle/backup_tts/rec_tbs01.dbf
	EXPDP> Job "SYS"."TSPITR_EXP_mmxA" successfully completed at Thu Jun 7 16:37:22 2018 elapsed 0 00:01:03
	Export completed

	/*
	The following command may be used to import the tablespaces.
	Substitute values for <logon> and <directory>.
	impdp <logon> directory=<directory> dumpfile= 'dmpfile.dmp' transport_datafiles= /home/oracle/backup_tts/rec_tbs01.dbf 
	*/
	--------------------------------------------------------------
	-- Start of sample PL/SQL script for importing the tablespaces
	--------------------------------------------------------------
	-- creating directory objects
	CREATE DIRECTORY STREAMS$DIROBJ$1 AS  '/home/oracle/backup_tts/';
	CREATE DIRECTORY STREAMS$DIROBJ$DPDIR AS  '/home/oracle/backup_tts';
	/* PL/SQL Script to import the exported tablespaces */
	DECLARE
	-- the datafiles
	tbs_files     dbms_streams_tablespace_adm.file_set;
	cvt_files     dbms_streams_tablespace_adm.file_set;
	-- the dumpfile to import
	dump_file     dbms_streams_tablespace_adm.file;
	dp_job_name   VARCHAR2(30) := NULL;
	-- names of tablespaces that were imported
	ts_names       dbms_streams_tablespace_adm.tablespace_set;
	BEGIN
	-- dump file name and location
	dump_file.file_name :=  'dmpfile.dmp';
	dump_file.directory_object := 'STREAMS$DIROBJ$DPDIR';
	-- forming list of datafiles for import
	tbs_files( 1).file_name :=  'rec_tbs01.dbf';
	tbs_files( 1).directory_object :=  'STREAMS$DIROBJ$1';
	-- import tablespaces
	dbms_streams_tablespace_adm.attach_tablespaces(
		datapump_job_name      => dp_job_name,
		dump_file              => dump_file,
		tablespace_files       => tbs_files,
		converted_files        => cvt_files,
		tablespace_names       => ts_names);
	-- output names of imported tablespaces
	IF ts_names IS NOT NULL AND ts_names.first IS NOT NULL THEN
		FOR i IN ts_names.first .. ts_names.last LOOP
		dbms_output.put_line('imported tablespace '|| ts_names(i));
		END LOOP;
	END IF;
	END;
	/
	-- dropping directory objects
	DROP DIRECTORY STREAMS$DIROBJ$1;
	DROP DIRECTORY STREAMS$DIROBJ$DPDIR;
	--------------------------------------------------------------
	-- End of sample PL/SQL script
	--------------------------------------------------------------

	Removing automatic instance
	shutting down automatic instance 

	database closed
	database dismounted
	Oracle instance shut down
	Automatic instance removed
	auxiliary instance file /home/oracle/backup_tts/ORCL11G/datafile/o1_mf_temp_fklqqytq_.tmp deleted
	auxiliary instance file /home/oracle/backup_tts/ORCL11G/onlinelog/o1_mf_3_fklqqxdq_.log deleted
	auxiliary instance file /home/oracle/backup_tts/ORCL11G/onlinelog/o1_mf_2_fklqqwmz_.log deleted
	auxiliary instance file /home/oracle/backup_tts/ORCL11G/onlinelog/o1_mf_1_fklqqvnf_.log deleted
	auxiliary instance file /home/oracle/backup_tts/ORCL11G/datafile/o1_mf_sysaux_fklqooy4_.dbf deleted
	auxiliary instance file /home/oracle/backup_tts/ORCL11G/datafile/o1_mf_undotbs0_fklqooyw_.dbf deleted
	auxiliary instance file /home/oracle/backup_tts/ORCL11G/datafile/o1_mf_system_fklqooxw_.dbf deleted
	auxiliary instance file /home/oracle/backup_tts/ORCL11G/controlfile/o1_mf_fklqoh6p_.ctl deleted
	RMAN> 

The following files can be checked after the above rman commands.

	[oracle@databasevm001 backup_tts]$ pwd
	/home/oracle/backup_tts
	[oracle@databasevm001 backup_tts]$ ls -ltr
	total 102512
	drwxr-x---. 5 oracle oinstall        55 Jun  7 16:35 ORCL11G
	-rw-r-----. 1 oracle oinstall 104865792 Jun  7 16:36 rec_tbs01.dbf
	-rw-r-----. 1 oracle oinstall    102400 Jun  7 16:37 dmpfile.dmp
	-rw-r--r--. 1 oracle oinstall      2080 Jun  7 16:37 impscrpt.sql
	[oracle@databasevm001 backup_tts]$ 

We need to create temporary user to impdp the datas because the same user/tablespace are in the same Database.

	Target table: sh.tab_delete in the rec_tbs tablespace

The default user's tablespace is USERS tablespace, so we should ensure the tablespace's space for the target table's data.

>impdp data,remap user,remap tablespace


Example:

	SYS@orcl11g> create user sh_temp identified by oracle;

	User created.

	SYS@orcl11g> 
	SYS@orcl11g> create directory sh_dir as '/home/oracle/backup_tts';

	Directory created.

	SYS@orcl11g> 
	SYS@orcl11g> grant read,write on directory sh_dir to public;

	Grant succeeded.

	SYS@orcl11g> 

Example for impdp:

	impdp system dumpfile=dmpfile.dmp directory=sh_dir transport_datafiles=/home/oracle/backup_tts/rec_tbs01.dbf nologfile=y remap_schema=sh:sh_temp remap_tablespace=rec_tbs:rec_tbs_temp01;

	[oracle@databasevm001 backup_tts]$ impdp system dumpfile=dmpfile.dmp directory=sh_dir transport_datafiles=/home/oracle/backup_tts/rec_tbs01.dbf nologfile=y remap_schema=sh:sh_temp remap_tablespace=rec_tbs:rec_tbs_temp01;

	Import: Release 11.2.0.4.0 - Production on Thu Jun 7 16:54:24 2018

	Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.
	Password: -----------------------> Enter the user system's password

	UDI-28002: operation generated ORACLE error 28002
	ORA-28002: the password will expire within 7 days

	Connected to: Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options
	Master table "SYSTEM"."SYS_IMPORT_TRANSPORTABLE_01" successfully loaded/unloaded
	Starting "SYSTEM"."SYS_IMPORT_TRANSPORTABLE_01":  system/******** dumpfile=dmpfile.dmp directory=sh_dir transport_datafiles=/home/oracle/backup_tts/rec_tbs01.dbf nologfile=y remap_schema=sh:sh_temp remap_tablespace=rec_tbs:rec_tbs_temp01 
	Processing object type TRANSPORTABLE_EXPORT/PLUGTS_BLK
	Processing object type TRANSPORTABLE_EXPORT/TABLE
	Processing object type TRANSPORTABLE_EXPORT/POST_INSTANCE/PLUGTS_BLK
	Job "SYSTEM"."SYS_IMPORT_TRANSPORTABLE_01" successfully completed at Thu Jun 7 16:54:29 2018 elapsed 0 00:00:02

	[oracle@databasevm001 backup_tts]$ 

Check the temp table's data:

	SYS@orcl11g> select count(1) from sh_temp.tab_delete;

	COUNT(*)
	----------
		86673

	SYS@orcl11g> 

Clear the temp user and tablespaces..

	SQL> drop user sh_temp cascade;
	SQL> drop tablespace rec_tbs_temp01 including contents and datafiles;
	SQL> drop directory sh_dir;


### RMAN uncomplete recovery new database(only the tablespace)

To be continue...

### Other tools

Like:dul

[OracleODU](http://www.oracleodu.com/cn/)

Like:

[[原创]Oracle BBED测试使用](http://www.bigdatalyn.com/2017/02/27/OracleBBED/)
-- 通过bbed恢复delete的一行数据

Others...

To be continue....

Have a good day! 2018/05 via LinHong
	






