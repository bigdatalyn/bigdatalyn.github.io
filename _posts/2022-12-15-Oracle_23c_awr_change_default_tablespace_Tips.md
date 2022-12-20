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


### Reference 

[DB 19c: How To Store AWR Snapshots In User Defined Tablespace (Doc ID 2871566.1)](https://mosemp.us.oracle.com/epmos/faces/DocContentDisplay?id=2871566.1)

[19c help docs](https://docs.oracle.com/cd/F19136_01/arpls/DBMS_WORKLOAD_REPOSITORY.html#GUID-E2B46878-1BDB-4789-8A21-016A625530F1)


[21c help docs](https://docs.oracle.com/en/database/oracle/oracle-database/21/arpls/DBMS_WORKLOAD_REPOSITORY.html)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


