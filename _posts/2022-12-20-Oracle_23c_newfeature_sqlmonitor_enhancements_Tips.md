---
layout: post
title: "Oracle 23c New features - Real-Time SQL Monitoring Enhancements Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - Real-Time SQL Monitoring Enhancements Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	


Real-time SQL Monitoring works independently and concurrently across multiple PDB containers in an efficient manner. SQL statements, PL/SQL procedures and functions, and DBOPs (Database Operations) are monitored at PDB and CDB levels. You can efficiently query SQL Monitor reports across ad-hoc time ranges, DBIDs (internal database identifiers), and CON_DBIDs (CDB identifiers). This data is also accessible through SQL History Reporting.

Additionally, SQL Monitoring data can be exported along with the Automatic Workload Repository (AWR) and imported into another database or container for longer term storage and analysis.

Real-time SQL Monitoring is now supported per-PDB and CDB levels efficiently by default. As a PDBA persona, you can get a more accurate view of the monitored SQL for your application.

SQL Monitoring data can be transported through the AWR framework to a different container or database for longer term storage and offline analysis.






### MODIFY_AWREXP_SETTINGS

Enable or disable it on each PDB by locally calling the DBMS_WORKLOAD_REPOSITORY subprogram MODIFY_AWREXP_SETTINGS.

[21.6.1 Enabling or Disabling Real-Time SQL Monitoring on PDBs](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/tgsql/monitoring-database-operations.html#GUID-6B4577C5-BD75-4E80-95B6-917F18C9363A)


Use the procedure MODIFY_AWREXP_SETTINGS on each PDB to enable or disable this feature on each PDB:
```
PROCEDURE modify_awrexp_settings(dbid IN NUMBER DEFAULT NULL, sqlmon_option IN VARCHAR2 DEFAULT 'NO');
```
Specify whether to export SQL Monitor data. If you do not want to export SQL Monitor data, enter NO or press Enter to continue. Enter YES to export SQL Monitor data

Test in 23c.
```
SYS@cdb1> alter session set container=pdb1;

Session altered.

SYS@cdb1> SELECT DBID,SNAP_INTERVAL,RETENTION,TOPNSQL,CON_ID,TABLESPACE_NAME FROM DBA_HIST_WR_CONTROL;

       DBID SNAP_INTERVAL     RETENTION 	TOPNSQL  CON_ID TABLESPACE_NAME
----------- ----------------- ----------------- ------- ------- ---------------
 1093239018 +00000 01:00:00.0 +00008 00:00:00.0 DEFAULT       0 SYSAUX
 2616168235 +00000 01:00:00.0 +00008 00:00:00.0 DEFAULT       3 PDB1_AWR

SYS@cdb1> exec dbms_workload_repository.MODIFY_AWREXP_SETTINGS(2616168235,'YES');
BEGIN dbms_workload_repository.MODIFY_AWREXP_SETTINGS(2616168235,'YES'); END;

*
ERROR at line 1:
ORA-13574: Input parameters to AWR operation are invalid: YES
ORA-06512: at "SYS.DBMS_WORKLOAD_REPOSITORY", line 2922
ORA-06512: at "SYS.DBMS_WORKLOAD_REPOSITORY", line 2956
ORA-06512: at line 1

SYS@cdb1> exec dbms_workload_repository.MODIFY_AWREXP_SETTINGS(INCLUDE_SQLMON_OPTION=>'YES');
BEGIN dbms_workload_repository.MODIFY_AWREXP_SETTINGS(INCLUDE_SQLMON_OPTION=>'YES'); END;
*
ERROR at line 1:
ORA-13574: Input parameters to AWR operation are invalid: YES
ORA-06512: at "SYS.DBMS_WORKLOAD_REPOSITORY", line 2922
ORA-06512: at "SYS.DBMS_WORKLOAD_REPOSITORY", line 2956
ORA-06512: at line 1

SYS@cdb1> 

SYS@cdb1> exec dbms_workload_repository.MODIFY_AWREXP_SETTINGS(1093239018,'YES');
BEGIN dbms_workload_repository.MODIFY_AWREXP_SETTINGS(1093239018,'YES'); END;

*
ERROR at line 1:
ORA-13516: AWR Operation failed: DBID must be local dbid
ORA-06512: at "SYS.DBMS_WORKLOAD_REPOSITORY", line 2922
ORA-06512: at "SYS.DBMS_WORKLOAD_REPOSITORY", line 2956
ORA-06512: at line 1

SYS@cdb1> 
SYS@cdb1> exec dbms_workload_repository.MODIFY_AWREXP_SETTINGS(2616168235,'NO');

PL/SQL procedure successfully completed.

SYS@cdb1> 
SYS@cdb1> exec dbms_workload_repository.MODIFY_AWREXP_SETTINGS(2616168235);

PL/SQL procedure successfully completed.

SYS@cdb1> 
```

Can NOT find the package to check the status of awrexp's setting.????

### Reference 

[21.6 Real-Time SQL Monitoring Across Multiple PDBs](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/tgsql/monitoring-database-operations.html)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


