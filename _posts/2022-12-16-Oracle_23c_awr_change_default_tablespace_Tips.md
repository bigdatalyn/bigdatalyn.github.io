---
layout: post
title: "Oracle 23c Store AWR Snapshots In User Defined Tablespace Tips"
category: Oracle
tags: Oracle 23c awr Tips
---

* content
{:toc}

Oracle 23c Store AWR Snapshots In User Defined Tablespace Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	

The AWR warehouse is built in the SYS schema, using the SYSAUX tablespace by default. Oracle Database, by default captures snapshots once every hour; the snapshot size varies depending on the database load. These snapshots will be stored in SYSAUX tablespace.

Starting with Oracle Database 19.1c, the user can specify a user defined tablespace for AWR data/snapshots by using the 'dbms_workload_repository.modify_snapshot_settings' procedure, using 'tablespace_name' parameter.









### DBMS_WORKLOAD_REPOSITORY

The below procedure can be used to change the AWR snapshot storage from SYSAUX to user defined tablespace.
```
The following statement can be used to set the user defined tablespace. 
SQL> dbms_workload_repository.modify_snapshot_settings(dbid => <DB ID>, tablespace_name=> '<tablespace name>');
```

Test 
```
SYS@cdb1> alter session set container=pdb1;

Session altered.

SYS@cdb1> SELECT DBID,SNAP_INTERVAL,RETENTION,TOPNSQL,CON_ID,TABLESPACE_NAME FROM DBA_HIST_WR_CONTROL;

       DBID SNAP_INTERVAL     RETENTION 	TOPNSQL  CON_ID TABLESPACE_NAME
----------- ----------------- ----------------- ------- ------- ---------------
 1093239018 +00000 01:00:00.0 +00008 00:00:00.0 DEFAULT       0 SYSAUX
 2616168235 +00000 01:00:00.0 +00008 00:00:00.0 DEFAULT       3 SYSAUX

SYS@cdb1> create tablespace pdb1_awr datafile '/u01/oradata/CDB1/pdb1/pdb1_awr01.dbf' size 100m autoextend on maxsize 1g;

Tablespace created.

SYS@cdb1> exec dbms_workload_repository.modify_snapshot_settings(dbid=>2616168235, tablespace_name=>'pdb1_awr');
BEGIN dbms_workload_repository.modify_snapshot_settings(dbid=>2616168235, tablespace_name=>'pdb1_awr'); END;
*
ERROR at line 1:
ORA-13562: AWR operation failed because tablespace (pdb1_awr) is invalid.
ORA-06512: at "SYS.DBMS_WORKLOAD_REPOSITORY", line 235
ORA-06512: at "SYS.DBMS_WORKLOAD_REPOSITORY", line 295
ORA-06512: at line 1

SYS@cdb1> exec dbms_workload_repository.modify_snapshot_settings(dbid=>2616168235, tablespace_name=>'PDB1_AWR');

PL/SQL procedure successfully completed.

SYS@cdb1> SELECT DBID,SNAP_INTERVAL,RETENTION,TOPNSQL,CON_ID,TABLESPACE_NAME FROM DBA_HIST_WR_CONTROL;

       DBID SNAP_INTERVAL     RETENTION 	TOPNSQL  CON_ID TABLESPACE_NAME
----------- ----------------- ----------------- ------- ------- ---------------
 1093239018 +00000 01:00:00.0 +00008 00:00:00.0 DEFAULT       0 SYSAUX
 2616168235 +00000 01:00:00.0 +00008 00:00:00.0 DEFAULT       3 PDB1_AWR

SYS@cdb1> 
```

### AWR's segments

```
SYS@cdb1> select segment_name,tablespace_name from dba_segments where tablespace_name='PDB1_AWR';

SEGMENT_NAME		    TABLESPACE_NAME
--------------------------- ---------------
WRH$_DATAFILE		    PDB1_AWR
WRH$_SQLSTAT		    PDB1_AWR
WRH$_SQLTEXT		    PDB1_AWR
WRH$_SQL_SUMMARY	    PDB1_AWR
WRH$_SQL_PLAN		    PDB1_AWR
WRH$_SYSTEM_EVENT	    PDB1_AWR
WRH$_CON_SYSTEM_EVENT	    PDB1_AWR
WRH$_BG_EVENT_SUMMARY	    PDB1_AWR
WRH$_WAITSTAT		    PDB1_AWR
WRH$_ENQUEUE_STAT	    PDB1_AWR
WRH$_LATCH		    PDB1_AWR
WRH$_LATCH_MISSES_SUMMARY   PDB1_AWR
WRH$_LIBRARYCACHE	    PDB1_AWR
WRH$_DB_CACHE_ADVICE	    PDB1_AWR
WRH$_BUFFER_POOL_STATISTICS PDB1_AWR
WRH$_ROWCACHE_SUMMARY	    PDB1_AWR
WRH$_SGA		    PDB1_AWR
WRH$_SGASTAT		    PDB1_AWR
WRH$_PGASTAT		    PDB1_AWR
WRH$_PROCESS_MEMORY_SUMMARY PDB1_AWR
WRH$_SHARED_POOL_ADVICE     PDB1_AWR
WRH$_SQL_WORKAREA_HISTOGRAM PDB1_AWR
WRH$_PGA_TARGET_ADVICE	    PDB1_AWR
WRH$_INSTANCE_RECOVERY	    PDB1_AWR
WRH$_SYSSTAT		    PDB1_AWR
WRH$_CON_SYSSTAT	    PDB1_AWR
WRH$_PARAMETER		    PDB1_AWR
WRH$_MVPARAMETER	    PDB1_AWR
WRH$_UNDOSTAT		    PDB1_AWR
WRH$_SEG_STAT		    PDB1_AWR
WRH$_SEG_STAT_OBJ	    PDB1_AWR
WRH$_SERVICE_NAME	    PDB1_AWR
WRH$_SERVICE_STAT	    PDB1_AWR
WRH$_TABLESPACE_STAT	    PDB1_AWR
WRH$_LOG		    PDB1_AWR
WRH$_TABLESPACE 	    PDB1_AWR
WRH$_TABLESPACE_SPACE_USAGE PDB1_AWR
WRH$_CON_SYSMETRIC_SUMMARY  PDB1_AWR
WRH$_SQL_BIND_METADATA	    PDB1_AWR
WRH$_THREAD		    PDB1_AWR
WRH$_OSSTAT		    PDB1_AWR
WRH$_SYS_TIME_MODEL	    PDB1_AWR
WRH$_CON_SYS_TIME_MODEL     PDB1_AWR
WRH$_OPTIMIZER_ENV	    PDB1_AWR
WRH$_SERVICE_WAIT_CLASS     PDB1_AWR
WRH$_STREAMS_POOL_ADVICE    PDB1_AWR
WRH$_SGA_TARGET_ADVICE	    PDB1_AWR
WRH$_EVENT_HISTOGRAM	    PDB1_AWR
WRH$_MUTEX_SLEEP	    PDB1_AWR
WRH$_MEMORY_RESIZE_OPS	    PDB1_AWR
WRH$_PERSISTENT_QUEUES	    PDB1_AWR
WRH$_PERSISTENT_SUBSCRIBERS PDB1_AWR
WRH$_IOSTAT_FUNCTION	    PDB1_AWR
WRH$_IOSTAT_FILETYPE	    PDB1_AWR
WRH$_IOSTAT_DETAIL	    PDB1_AWR
WRH$_RSRC_CONSUMER_GROUP    PDB1_AWR
WRH$_RSRC_PLAN		    PDB1_AWR
WRH$_RSRC_METRIC	    PDB1_AWR
WRH$_RSRC_PDB_METRIC	    PDB1_AWR
WRH$_MEM_DYNAMIC_COMP	    PDB1_AWR
WRH$_DISPATCHER 	    PDB1_AWR
WRH$_SHARED_SERVER_SUMMARY  PDB1_AWR
WRH$_PERSISTENT_QMN_CACHE   PDB1_AWR
WRH$_CELL_CONFIG	    PDB1_AWR
WRH$_CHANNEL_WAITS	    PDB1_AWR
WRH$_REDO_TRANSPORT_ISSUES  PDB1_AWR
WRH$_ACTIVE_SESSION_HISTORY PDB1_AWR

67 rows selected.

SYS@cdb1> 

```

### Reference 

[DB 19c: How To Store AWR Snapshots In User Defined Tablespace (Doc ID 2871566.1)](https://mosemp.us.oracle.com/epmos/faces/DocContentDisplay?id=2871566.1)

[19c help docs](https://docs.oracle.com/cd/F19136_01/arpls/DBMS_WORKLOAD_REPOSITORY.html#GUID-E2B46878-1BDB-4789-8A21-016A625530F1)


[21c help docs](https://docs.oracle.com/en/database/oracle/oracle-database/21/arpls/DBMS_WORKLOAD_REPOSITORY.html)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


