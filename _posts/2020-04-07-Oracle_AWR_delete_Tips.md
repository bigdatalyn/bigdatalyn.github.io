---
layout: post
title: "Oracle AWR delete Tips"
category: Git
tags: Oracle AWR Tips 
---

* content
{:toc}

Oracle AWR delete Tips

+ Check SYSAUX's contents.

+ How to clear history AWR reports in sysaux tablespace?

Use the following enviroments.

```
[oracle@ora7 ~]$ sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on Tue Apr 7 16:20:24 2020
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SYS@orcl> !cat /etc/redhat-release
Red Hat Enterprise Linux Server release 7.6 (Maipo)

SYS@orcl>
```








#### SYSAUX space is large for awr report

This V$SYSAUX_OCCUPANTS view lists the following information about the occupants of the SYSAUX tablespace:
```
Name of the occupant
Occupant description
Schema name
Move procedure
Current space usage
```

SYSAUX tablespace is large for awr report just like the following sql(2.3 GB used).

```sql
SYS@orcl> !cat tbs_size.sql
SELECT F.TABLESPACE_NAME,
(T.TOTAL_SPACE - F.FREE_SPACE) / 1024 "USED (GB)",
F.FREE_SPACE / 1024 "FREE (GB)",
T.TOTAL_SPACE / 1024 "TOTAL(GB)",
(ROUND((F.FREE_SPACE / T.TOTAL_SPACE) * 100)) || '% ' PER_FREE
FROM (SELECT TABLESPACE_NAME,
ROUND(SUM(BLOCKS *
(SELECT VALUE / 1024
FROM V$PARAMETER
WHERE NAME = 'db_block_size') / 1024)) FREE_SPACE
FROM CDB_FREE_SPACE
GROUP BY TABLESPACE_NAME) F,
(SELECT TABLESPACE_NAME, ROUND(SUM(BYTES / 1048576)) TOTAL_SPACE
FROM CDB_DATA_FILES
GROUP BY TABLESPACE_NAME) T
WHERE F.TABLESPACE_NAME = T.TABLESPACE_NAME
/

SYS@orcl> @tbs_size.sql

TABLESPACE_NAME                 USED (GB)  FREE (GB)  TOTAL(GB) PER_FREE
------------------------------ ---------- ---------- ---------- ------------------------------------------
SYSTEM                          1.1640625   .0078125   1.171875 1%
SYSAUX                         2.29296875 .978515625 3.27148438 30%
UNDOTBS1                       .077148438 .762695313  .83984375 91%
USERS                          .043945313 .004882813 .048828125 10%
AWR_TBS                        .000976563 .999023438          1 100%
AWR_STAGE                      .000976563 2.99902344          3 100%

6 rows selected.

SYS@orcl>
```

Check the items(occupant) in sysaux tablespace and confirmed that `SM/AWR` is the largest itmes(1466MB).

```sql
SYS@orcl> !cat sysaux_list_check.sql
set pages 1000
set lines 1000
col SCHEMA_NAME for a20
col OCCUPANT_NAME for a30
select SCHEMA_NAME,OCCUPANT_NAME,trunc(SPACE_USAGE_KBYTES/1024,1)"SPACE_USAGE_MBYTES" from v$sysaux_occupants order by 3 desc;

SYS@orcl> @sysaux_list_check.sql

SCHEMA_NAME          OCCUPANT_NAME                  SPACE_USAGE_MBYTES
-------------------- ------------------------------ ------------------
SYS                  SM/AWR                                     1467.3
MDSYS                SDO                                         201.1
XDB                  XDB                                          68.4
SYS                  SM/OTHER                                     50.8
SYS                  AO                                           45.8
SYS                  SM/OPTSTAT                                   31.3
SYSTEM               LOGMNR                                       10.8
SYS                  SM/ADVISOR                                    9.8
WMSYS                WM                                            6.5
SYS                  PL/SCOPE                                      2.8
CTXSYS               TEXT                                          2.8
AUDSYS               AUDSYS                                        2.6
SYS                  SQL_MANAGEMENT_BASE                           2.6
SYS                  SMON_SCN_TIME                                 2.2
SYS                  JOB_SCHEDULER                                 1.9
SYS                  STREAMS                                       1.6
SYSTEM               LOGSTDBY                                      1.5
SYS                  AUTO_TASK                                      .5
DBSNMP               EM_MONITORING_USER                             .5
ORDDATA              ORDIM/ORDDATA                                   0
ORDPLUGINS           ORDIM/ORDPLUGINS                                0
SI_INFORMTN_SCHEMA   ORDIM/SI_INFORMTN_SCHEMA                        0
SYSMAN               EM                                              0
SYS                  XSOQHIST                                        0
WKSYS                ULTRASEARCH                                     0
PERFSTAT             STATSPACK                                       0
EXFSYS               EXPRESSION_FILTER                               0
SYS                  AUDIT_TABLES                                    0
TSMSYS               TSM                                             0
OLAPSYS              XSAMD                                           0
ORDSYS               ORDIM                                           0
WK_TEST              ULTRASEARCH_DEMO_USER                           0

32 rows selected.

SYS@orcl>
```
The No.1 size is `SM/AWR` and size is `1466 MB` .

There are two DBID in the dba_hist_wr_control beacuse of loading the awr reports from other database just like the following tips.

[`Oracle 19c load awr report`](http://www.bigdatalyn.com/2020/03/17/Oracle_load_awr_report/)

```
SYS@orcl> !cat hist_wr_check.sql
col SNAP_INTERVAL for a20
col RETENTION for a20
col SRC_DBNAME for a20
select * from dba_hist_wr_control;
select DBID,count(*) from dba_hist_snapshot group by DBID;

SYS@orcl> @hist_wr_check.sql

      DBID SNAP_INTERVAL        RETENTION            TOPNSQL        CON_ID   SRC_DBID SRC_DBNAME
---------- -------------------- -------------------- ---------- ---------- ---------- --------------------
1542511712 +00000 01:00:00.0    +00008 00:00:00.0    DEFAULT             0 1542511712 CDB$ROOT
3935825519 +00000 01:00:00.0    +00008 00:00:00.0    DEFAULT               3935825519


      DBID   COUNT(*)
---------- ----------
3935825519        338
1542511712          6

SYS@orcl>
```

#### How to clear history AWR reports in sysaux tablespace

How to clear history AWR reports in sysaux tablespace?

+ Use `dbms_swrf_internal` package to cleanup the different DBID's awr reports.

+ Use  `DBMS_WORKLOAD_REPOSITORY.DROP_SNAPSHOT_RANGE` package to Clean up local DB's awr reports.


##### `dbms_swrf_internal` package

```
SYS@orcl> conn / as sysdba
Connected.
SYS@orcl> exec dbms_swrf_internal.cleanup_database;
PL/SQL procedure successfully completed.
SYS@orcl> 
SYS@orcl> @hist_wr_check.sql

      DBID SNAP_INTERVAL        RETENTION            TOPNSQL        CON_ID   SRC_DBID SRC_DBNAME
---------- -------------------- -------------------- ---------- ---------- ---------- --------------------
1542511712 +00000 01:00:00.0    +00008 00:00:00.0    DEFAULT             0 1542511712 CDB$ROOT


      DBID   COUNT(*)
---------- ----------
1542511712          6

SYS@orcl> @sysaux_list_check.sql

SCHEMA_NAME          OCCUPANT_NAME                  SPACE_USAGE_MBYTES
-------------------- ------------------------------ ------------------
SYS                  SM/AWR                                      685.3
MDSYS                SDO                                         201.1
XDB                  XDB                                          68.4
SYS                  SM/OTHER                                     50.8
SYS                  AO                                           45.8
SYS                  SM/OPTSTAT                                   31.3
SYSTEM               LOGMNR                                       10.8
SYS                  SM/ADVISOR                                    9.8
WMSYS                WM                                            6.5
SYS                  PL/SCOPE                                      2.8
CTXSYS               TEXT                                          2.8
AUDSYS               AUDSYS                                        2.6
SYS                  SQL_MANAGEMENT_BASE                           2.6
SYS                  SMON_SCN_TIME                                 2.2
SYS                  JOB_SCHEDULER                                 1.9
SYS                  STREAMS                                       1.6
SYSTEM               LOGSTDBY                                      1.5
SYS                  AUTO_TASK                                      .5
DBSNMP               EM_MONITORING_USER                             .5
ORDDATA              ORDIM/ORDDATA                                   0
ORDPLUGINS           ORDIM/ORDPLUGINS                                0
SI_INFORMTN_SCHEMA   ORDIM/SI_INFORMTN_SCHEMA                        0
SYSMAN               EM                                              0
SYS                  XSOQHIST                                        0
WKSYS                ULTRASEARCH                                     0
PERFSTAT             STATSPACK                                       0
EXFSYS               EXPRESSION_FILTER                               0
SYS                  AUDIT_TABLES                                    0
TSMSYS               TSM                                             0
OLAPSYS              XSAMD                                           0
ORDSYS               ORDIM                                           0
WK_TEST              ULTRASEARCH_DEMO_USER                           0

32 rows selected.

SYS@orcl> @tbs_size.sql

TABLESPACE_NAME                 USED (GB)  FREE (GB)  TOTAL(GB) PER_FREE
------------------------------ ---------- ---------- ---------- ------------------------------------------
SYSTEM                          1.1640625   .0078125   1.171875 1%
SYSAUX                         1.53027344 1.74121094 3.27148438 53%
UNDOTBS1                         .4296875  .41015625  .83984375 49%
USERS                          .043945313 .004882813 .048828125 10%
AWR_TBS                        .000976563 .999023438          1 100%
AWR_STAGE                      .000976563 2.99902344          3 100%

6 rows selected.

SYS@orcl>

```

The  `SM/AWR` and size is `50.8` now before size was `1466 MB`.

The SYSAUX tablespace is `1.5 GB` now before size was `2.3 GB`.

##### Use  `DBMS_WORKLOAD_REPOSITORY.DROP_SNAPSHOT_RANGE` package

Check the range with snap id.

```
SYS@orcl> select dbid from v$database;

      DBID
----------
1542511712

SYS@orcl>
SYS@orcl> select DBID,snap_id from dba_hist_snapshot order by 1,2;

      DBID    SNAP_ID
---------- ----------
1542511712         99
1542511712        100
1542511712        101
1542511712        102
1542511712        103
1542511712        104
1542511712        105

7 rows selected.

SYS@orcl> !cat check_snap_low_high_id.sql
select DBID,min(SNAP_ID),max(SNAP_ID) from dba_hist_snapshot group by DBID;


SYS@orcl> @check_snap_low_high_id.sql

      DBID MIN(SNAP_ID) MAX(SNAP_ID)
---------- ------------ ------------
1542511712           99          105

SYS@orcl>
```

Use DBMS_WORKLOAD_REPOSITORY to clean up awr report via snap id's range.

```
SYS@orcl>
    BEGIN
    DBMS_WORKLOAD_REPOSITORY.DROP_SNAPSHOT_RANGE(
    low_snap_id => 99,
    high_snap_id => 104,
    dbid => 1542511712);
    END;
  7      /
PL/SQL procedure successfully completed.
SYS@orcl>
SYS@orcl> @check_snap_low_high_id.sql

      DBID MIN(SNAP_ID) MAX(SNAP_ID)
---------- ------------ ------------
1542511712          105          105

SYS@orcl>
```

 
#### Reference

Oracle Database Documentation 
[Database Administrator's Guide](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/index.html)
[13.12 Managing the SYSAUX Tablespace](https://docs.oracle.com/en/database/oracle/oracle-database/19/admin/managing-tablespaces.html#GUID-30942290-88DD-4D62-816F-F7EDCE661710)

PL/SQL Packages and Types Reference / 185 DBMS_WORKLOAD_REPOSITORY 
[Table 185-31 DROP_SNAPSHOT_RANGE Procedure Parameters](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/DBMS_WORKLOAD_REPOSITORY.html#GUID-EB512614-FD4D-4DBF-A984-E17E1FFE6271)

Using DBMS_SWRF_INTERNAL.UNREGISTER_DATABASE to Unregister a Cloned DBID Raises "ORA-13553: operation failed - missing parameter [SRCDBID]" (Doc ID 2039369.1)


Have a good work&life! 2020/04 via LinHong


