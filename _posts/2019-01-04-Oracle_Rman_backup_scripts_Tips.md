---
layout: post
title: "Oracle Rman backup sctips Tips"
category: Oracle
tags: Tips
---

* content
{:toc}




Oracle Rman backup sctips Tips

Backup scripts

RMAN backup sql

Confirm results











### Backup scripts

Backup main scripts

	$ cat main.sh
	#set env
	#########################Change the below parameter for the different server##################
	export host_ip=192.2.10.11
	export instance_name=orcl
	export username=rman_user
	export password=orcacle
	export syspsw=oracle
	export backup_home=/home/oracle/bk
	export ORACLE_HOME=/home/oracle/app/oracle/product/11.2.0/dbhome_1
	export PATH=$PATH:$ORACLE_HOME/db_1/bin:/sbin:/usr/sbin
	#####################################################################################
	export curTime=$(date "+%Y%m%d")
	mkdir $backup_home/ftp/$curTime
	echo "-----------------------------RMAN start-----------------------------";date
	#backup start
	cd $backup_home
	$ORACLE_HOME/bin/rman target sys/$syspsw@$host_ip:1521/$instance_name cmdfile='rman.sql'
	echo "------------------------------RMAN End------------------------------";date
	sleep 10
	echo "------------------------------SQL Start------------------------------";date
	$ORACLE_HOME/bin/sqlplus $username/$password@$host_ip:1521/$instance_name @rman_status.sql
	echo "------------------------------END-----------------------------";date
	$ 
	
### RMAN sql

Backup RMAN sql

	$ cat rman.sql
	run
	{
	ALLOCATE CHANNEL node_c1 DEVICE TYPE DISK MAXPIECESIZE=5G;
	ALLOCATE CHANNEL node_c2 DEVICE TYPE DISK MAXPIECESIZE=5G;
	backup as compressed backupset database format 'PATH....\db_orcl_%U.bak_%T';
	sql 'alter system switch logfile';
	CROSSCHECK ARCHIVELOG ALL;
	backup as compressed backupset archivelog all format 'PATH....' not backed up 2 times;
	backup spfile format 'PATH....\spfile_%U_%T';
	backup current controlfile format 'PATH....\controlfile_%d_%s_%p_%I_%u_%T';
	sql 'alter system switch logfile';
	CROSSCHECK BACKUP;
	CROSSCHECK COPY;
	delete noprompt archivelog all completed before 'sysdate-7';
	release channel node_c1;
	release channel node_c2;
	}
	$ 

### Confirm results

Backup Confirmation

	$ cat rman_status.sql
	---- Check the archivelog every day
	spool $backup_home/redo_switch.log;
	set echo off
	set feedback off
	set colsep ','
	set pagesize 2000
	set term off
	set heading off
	set line 400
	col Count for 9999
	col GB for 99999
	select
	d.dbid,
	to_char(trunc(completion_time),'yyyy-mm-dd') as "Date"
	,count(*) as "Count"
	,substr((sum(blocks*block_size))/1024/1024/1024,0,4) as "GB"
	from v$archived_log,v$database d
	group by trunc(completion_time),d.dbid;
	spool off;
	
	--- Check tablespace usage
	spool $backup_home/tablepace_usage.log;
	set echo off
	set feedback off
	set colsep ','
	set pagesize 2000
	set term off
	set heading off
	set line 400
	col startup_time for a20
	col status for a6
	col tablespace_name for a20
	col total_mb for 99999999
	col used_mb for 99999999
	col used_pct for a10
	select
	d.dbid,
	to_char(b.STARTUP_TIME,'yyyy-mm-dd-hh24-mi-ss') as startup_time,
	b.status,
	total.tablespace_name,
	round(total.MB, 2) as Total_MB,
	round(total.MB - free.MB, 2) as Used_MB,
	round((1 - free.MB / total.MB) * 100, 2) || '%' as Used_Pct
	from (select tablespace_name, sum(bytes) / 1024 / 1024 as MB
	from dba_free_space
	group by tablespace_name) free,
	(select tablespace_name, sum(bytes) / 1024 / 1024 as MB
	from dba_data_files
	group by tablespace_name) total, v$instance b, v$database d
	where free.tablespace_name = total.tablespace_name;
	spool off;
	
	--- Check the backup last seven day
	spool /home/oracle/bk/log/rman.log;
	set echo off
	set feedback off
	set colsep ','
	set pagesize 2000
	set term off
	set heading off
	set line 202000
	col DBID for 9999999999
	col status for a25
	col type for a12
	col  start_time for a22
	col  Finish_time for a22
	col in_sec for a12
	col out_sec for a12
	col command for a8
	col  INPUT_M for 99999
	col  OUTPUT_M for 99999
	col obj_type for a15
	select d.DBID as DBID,
	s.status as status,
	b.INPUT_TYPE as type,
	to_char(b.START_TIME,'yyyy-mm-dd hh24:mi:ss') as start_time,
	to_char(b.end_time, 'yyyy-mm-dd hh24:mi:ss') as  Finish_time,
	b.INPUT_BYTES_PER_SEC_DISPLAY in_sec,
	b.OUTPUT_BYTES_PER_SEC_DISPLAY out_sec,
	s.OPERATION as command,
	trunc(s.INPUT_BYTES/1024/1024,2) as INPUT_M,
	trunc(s.OUTPUT_BYTES/1024/1024,2) as OUTPUT_M,
	s.OBJECT_TYPE as obj_type
	from v$rman_status s,v$rman_backup_job_details b, v$database d
	where to_char(s.START_TIME, 'yyyy-mm-dd hh24:mi:ss') < to_char(sysdate,'yyyy-mm-dd hh24:mi:ss')
	and to_char(s.END_TIME, 'yyyy-mm-dd hh24:mi:ss') > to_char(sysdate-7,'yyyy-mm-dd hh24:mi:ss')
	and s.COMMAND_ID=b.COMMAND_ID
	order by s.START_TIME desc ;
	spool off;
	exit;
	$




Have a good work&life! 2019/01 via LinHong



