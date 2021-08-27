

### 19c information regarding awr setting


```
SYS@cdb1> show pdbs

    CON_ID CON_NAME                       OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
         2 PDB$SEED                       READ ONLY  NO
         3 PDB1                           READ WRITE NO
         4 PDB2                           MOUNTED
SYS@cdb1> select * from cdb_hist_wr_control;

       DBID SNAP_INTERVAL     RETENTION         TOPNSQL  CON_ID    SRC_DBID SRC_DBNAME
----------- ----------------- ----------------- ------- ------- ----------- ----------
 1051107858 +00000 01:00:00.0 +00008 00:00:00.0 DEFAULT       0  1051107858 CDB$ROOT
 2506121268 +40150 00:01:00.0 +00008 00:00:00.0 DEFAULT       3  2506121268 PDB1

SYS@cdb1> show parameter awr

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
awr_pdb_autoflush_enabled            boolean     FALSE
awr_pdb_max_parallel_slaves          integer     10
awr_snapshot_time_offset             integer     0
SYS@cdb1> show parameter statistics_level

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
client_statistics_level              string      TYPICAL
statistics_level                     string      TYPICAL
SYS@cdb1> 
```




### cdb$root change the following parameters

```sql
alter system set awr_pdb_autoflush_enabled=TRUE sid='*' scope=BOTH;
alter system set awr_snapshot_time_offset=1000000 sid='*' scope=BOTH;
```

log:
```sql
SYS@cdb1> alter system set awr_pdb_autoflush_enabled=TRUE sid='*' scope=BOTH;

System altered.

SYS@cdb1> alter system set awr_snapshot_time_offset=1000000 sid='*' scope=BOTH;

System altered.

SYS@cdb1> show parameter awr

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
awr_pdb_autoflush_enabled            boolean     TRUE
awr_pdb_max_parallel_slaves          integer     10
awr_snapshot_time_offset             integer     1000000
SYS@cdb1> 
```


### pdb interval set into 30 minuties


```
SYS@cdb1> select * from cdb_hist_wr_control;

       DBID SNAP_INTERVAL     RETENTION         TOPNSQL  CON_ID    SRC_DBID SRC_DBNAME
----------- ----------------- ----------------- ------- ------- ----------- ----------
 1051107858 +00000 01:00:00.0 +00008 00:00:00.0 DEFAULT       0  1051107858 CDB$ROOT
 2506121268 +40150 00:01:00.0 +00008 00:00:00.0 DEFAULT       3  2506121268 PDB1

SYS@cdb1>

SYS@cdb1> conn sys/SysPassword1@pdb1 as sysdba
Connected.
SYS@pdb1> show pdbs

    CON_ID CON_NAME                       OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
         3 PDB1                           READ WRITE NO
SYS@pdb1> show parameter awr

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
awr_pdb_autoflush_enabled            boolean     TRUE
awr_pdb_max_parallel_slaves          integer     10
awr_snapshot_time_offset             integer     1000000
SYS@pdb1> select * from pdb_hist_wr_control;

SYS@pdb1> select * from cdb_hist_wr_control;

       DBID SNAP_INTERVAL     RETENTION         TOPNSQL  CON_ID    SRC_DBID SRC_DBNAME
----------- ----------------- ----------------- ------- ------- ----------- ----------
 2506121268 +40150 00:01:00.0 +00008 00:00:00.0 DEFAULT       3  2506121268 PDB1

SYS@pdb1> exec dbms_workload_repository.modify_snapshot_settings(interval=> 30);

PL/SQL procedure successfully completed.

SYS@pdb1> select * from cdb_hist_wr_control;

       DBID SNAP_INTERVAL     RETENTION         TOPNSQL  CON_ID    SRC_DBID SRC_DBNAME
----------- ----------------- ----------------- ------- ------- ----------- ----------
 2506121268 +00000 00:30:00.0 +00008 00:00:00.0 DEFAULT       3  2506121268 PDB1

SYS@pdb1>
```


### get pdb awr reports

```sql
[oracle@ol8-19c ~]$ sqlplus sys/SysPassword1@pdb1 as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on Mon Aug 16 12:53:18 2021
Version 19.10.0.0.0

Copyright (c) 1982, 2020, Oracle.  All rights reserved.


Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0

SYS@pdb1> @mkawrscript.sql


Specify the location of AWR Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
AWR_ROOT - Use AWR data from root (default)
AWR_PDB - Use AWR data from PDB
Enter value for awr_location: AWR_PDB

Location of AWR Data Specified: AWR_PDB


Instances in this Workload Repository schema
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  DB Id      Inst Num   DB Name      Instance     Host
------------ ---------- ---------    ----------   ------
  2506121268     1      CDB1         cdb1         ol8-19c

Enter value for dbid: 2506121268
Using 2506121268 for database Id
Enter value for inst_num: 1
Using 1 for instance number


Specify the number of days of snapshots to choose from
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Entering the number of days (n) will result in the most recent
(n) days of snapshots being listed.  Pressing <return> without
specifying a number lists all completed snapshots.


Enter value for num_days: 

Listing all Completed Snapshots
Instance     DB Name      Snap Id       Snap Started    Snap Level
------------ ------------ ---------- ------------------ ----------

cdb1         CDB1                 1  16 Aug 2021 12:28    1
                                  2  16 Aug 2021 12:52    1
                                  3  16 Aug 2021 12:52    1


Specify the Begin and End Snapshot Ids
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Enter value for begin_snap: 1
Begin Snapshot Id specified: 1

Enter value for end_snap: 3
End   Snapshot Id specified: 3



Building the SQL script of getawr.sql
Done with getawr.sql
============================================================================
Next, check and launch:

@getawr.sql

to generate AWR reports in the current folder.
============================================================================

SYS@pdb1> @getawr.sql
Beginning AWR generation...
Creating AWR report awrrpt_20210816_1228-20210816_1252_INST_1_1-2.html for INST#1 from snapshot 1 to 2...
Creating AWR report awrrpt_20210816_1252-20210816_1253_INST_1_2-3.html for INST#1 from snapshot 2 to 3...
AWR generation completed with 2 reports.
Disconnected from Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0
[oracle@ol8-19c ~]$
```