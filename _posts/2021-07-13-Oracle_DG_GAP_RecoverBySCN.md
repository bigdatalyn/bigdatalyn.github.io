---
layout: post
title: "Oracle Dataguard GAP Recovery Tips"
category: Oracle
tags: Oracle Dataguard Tips
---

* content
{:toc}

Oracle Dataguard GAP Recovery Tips


### Problems

DG has GAP between primary and standby, and standby can NOT apply redo log for missing redo log files from primary site.
The primary site have deleted archived log files for some reason.

Usually, we can fix the GAP problem via tramlating the missing redolog file to standby or setting the fal_ parameters where have redo log file and archivelog files.

### Recovery standby via SCN

#### 1. Stop redo apply process - Close MRP process.

```sql
SQL> ALTER DATABASE RECOVER MANAGED STANDBY DATABASE CANCEL;
SQL> select name,instance_name,host_name,DB_UNIQUE_NAME,version,open_mode,to_char(startup_time,'YYYY/MM/DD HH24:MI:SS'),database_role from gv$database, v$instance;
```

#### 2. Confirm SCN in Standby.

The lowest SCN in the following command.
```sql
SQL> SELECT CURRENT_SCN FROM V$DATABASE;
SQL> select min(checkpoint_change#) from v$datafile_header where file# not in (select file# from v$datafile where enabled = 'READ ONLY');
```

#### 3. Backup primary site via incremental backup and scn number

```sql
RMAN> BACKUP INCREMENTAL FROM SCN 12345678 DATABASE FORMAT '/tmp/DB_Inc_ForStandby_%U' tag 'FOR_STANDBY';

SCN 12345678 : the scn number came from step 2.

```

#### 4. SCP or FTP the backup file to standby.
   
#### 5. Register the increment backup file in Standby site.
```sql
RMAN> CATALOG START WITH '/tmp/Standby';
```
#### 6. Recover incremetal backup file in Standby site.
```sql
RMAN> RECOVER DATABASE NOREDO;
```
[NOREDO](https://docs.oracle.com/en/database/oracle/oracle-database/19/rcmrf/RECOVER.html#GUID-CA98040F-9865-4F4F-BAF2-91C518612E95)

```
Suppresses the application of redo logs during recovery. Only incremental backups are applied.

One use of this option is to use incremental backups to update full backups of NOARCHIVELOG databases (see Example 3-6). The NOREDO options is required if redo logs are not available. If you do not specify NOREDO when recovering a NOARCHIVELOG database, then RMAN ends recovery and issues an error.

Note: Incremental backups of NOARCHIVELOG databases can only be taken after a consistent shutdown.
```

#### 7. backup controlfile in primary site and backup list datafile in Standby site.
Primary:
```sql
RMAN> BACKUP CURRENT CONTROLFILE FOR STANDBY FORMAT '/tmp/FOR_STANDBY_CTRL.back';
```

SCP or FTP controlfile to standby.

Standby:
```sql
spool standby_datafiles_list.txt
set pagesize 1000 linesize 300
col name format a60
select file#, name from v$datafile order by file# ;
spool off
```

#### 8. Recovery standby control file in standby.
```sql
RMAN> SHUTDOWN IMMEDIATE ;
RMAN> STARTUP NOMOUNT;
RMAN> RESTORE STANDBY CONTROLFILE FROM '/tmp/FOR_STANDBY_CTRL.back';
RMAN> ALTER DATABASE MOUNT;
```
Note:  We recommend checking the incarnation for primary and standby before completing this step.
Example:  `RMAN> list incarnation; `

Switch copy datafile via Note:1531031.1

```sql
-- Check the datafile which need to restore in primary.
SQL>SELECT FILE#, NAME FROM V$DATAFILE WHERE CREATION_CHANGE# > 12345678;
-- Switch datafile in standby
RMAN> SWITCH DATABASE TO COPY;

datafile 1 switched to datafile copy "+DATA/STBY/datafile/system.xxx.xxxxxxxx"
or 
switch datafile <number> to copy;

```

#### 9. Clear standby redo log groups.

```sql
SQL> select GROUP# from v$logfile where TYPE='STANDBY' group by GROUP#;
SQL> ALTER DATABASE CLEAR LOGFILE GROUP 1;
SQL> ALTER DATABASE CLEAR LOGFILE GROUP 2;
SQL> ALTER DATABASE CLEAR LOGFILE GROUP 3;
SQL> ALTER DATABASE CLEAR LOGFILE GROUP 4;
...
or

SQL> select distinct  'alter database clear logfile group ' || group# || ';' from v$logfile;

```

#### 10.  Restart MRP
  
```sql
SQL> ALTER DATABASE RECOVER MANAGED STANDBY DATABASE DISCONNECT;
```

Others about flashback in DG.
```sql
SQL> ALTER DATABASE FLASHBACK OFF; 
SQL> ALTER DATABASE FLASHBACK ON;
```

```
Rolling Forward a Physical Standby Database Using the RECOVER FROM SERVICE Command

A standby database is a transactionally-consistent copy of the production database. It enables production Oracle database to survive disasters and data corruption. If the production database becomes unavailable because of a planned or an unplanned outage, Data Guard can switch a standby database to the production role, minimizing the downtime associated with the outage. Moreover, performance of production database can be improved by offloading resource-intensive backup and reporting operations to standby systems. As you can see, it’s always desirable to have standby database synchronized with the primary database.

Prior to 12c, in order to roll forward the standby database using incremental backups you would need to:

  Determine the necessary SCN of the standby
  Take an incremental backup on the primary starting from that SCN# of the standby database.
  Copy the incremental backup to the standby host
  Catalog the backups (copied from the primary) into the standby controlfile.
  Cancel managed recovery of the standby database and apply the incremental backup on the standby database. 
  Create a control file for the standby database on the primary database.
  Mount the standby database with newly created standby control file.
  Start managed recovery of standby database.

In 12c, this procedure has been dramatically simplified. In 12c, you can use the RECOVER … FROM SERVICE command to synchronize the physical standby database with the primary database.  This command does the following:

Creates an incremental backup containing the changes to the primary database.   All changes to data files on the primary database, beginning with the SCN in the standby data file header, are included in the incremental backup.
Transfers the incremental backup over the network to the physical standby database.
Applies the incremental backup to the physical standby database.
This results in rolling forward the standby datafiles to the same point-in-time as the primary.   However, since the standby controlfile still contains old SCN values (lower than the SCN values of the standby datafiles) to complete the synchronization of the physical standby database, the standby control file needs to be refreshed.
```

### Reference

MOS：
Steps to perform for Rolling Forward a Physical Standby Database using RMAN Incremental Backup. (Doc ID 836986.1)

[How to Resolve Gaps in Data Guard Apply Using Incremental RMAN Backup](https://ittutorial.org/resolve-gaps-roll-forward-in-data-guard-standby-apply-how-to-using-incremental-rman-backup/)

[Refreshing a Physical Standby Using Recover from Service on 12c](https://www.virtual-dba.com/blog/refreshing-physical-standby-using-recover-from-service-on-12c/)

Have a good work&life! 2021/07 via LinHong
