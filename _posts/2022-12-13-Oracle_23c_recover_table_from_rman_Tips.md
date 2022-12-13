---
layout: post
title: "Oracle 23c recover table from rman Tips"
category: Oracle
tags: Oracle 23c Tips
---

* content
{:toc}

Oracle 23c recover table from rman Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	









### Recover table from rman


Prerequisites for Recovering Tables and Table Partitions from RMAN Backups

```
Certain prerequisites must be met before you recover tables or table partitions from RMAN backups.

They include the following:

The target database must be in read-write mode.

The target database must be in ARCHIVELOG mode.

You must have RMAN backups of the tables or table partitions as they existed at the point in time to which you want recover these objects.

To recover single table partitions, the COMPATIBLE initialization parameter for target database must be set to 11.1.0 or higher.
```



#### <1> Test User: lin 
```
SYS@cdb1> alter session set nls_date_format = 'YYYY-MM-DD HH24:MI:SS';

Session altered.

SYS@cdb1> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 PDB1 			  READ WRITE NO
SYS@cdb1> alter session set container=pdb1;

Session altered.

SYS@cdb1> create user lin identified by oracle default tablespace users temporary tablespace temp profile default account unlock;

User created.

SYS@cdb1> grant create session,create table to lin;

Grant succeeded.

SYS@cdb1> alter user lin quota 100m on users;

User altered.

SYS@cdb1> 
```


#### <2> Table: t1
```
[oracle@ol8-23c ~]$ sqlplus lin/oracle@pdb1

SQL*Plus: Release 23.0.0.0.0 - Beta on Tue Dec 13 22:02:27 2022
Version 23.1.0.0.0

Copyright (c) 1982, 2022, Oracle.  All rights reserved.

Last Successful login time: Tue Dec 13 2022 21:46:26 +08:00

Connected to:
Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Beta
Version 23.1.0.0.0

LIN@pdb1> alter session set nls_date_format = 'YYYY-MM-DD HH24:MI:SS';

Session altered.

LIN@pdb1> create table t1(id int);

Table created.

LIN@pdb1> insert into t1 values(1);

1 row created.

LIN@pdb1> insert into t1 values(2);

1 row created.

LIN@pdb1> insert into t1 values(3);

1 row created.

LIN@pdb1> commit;

Commit complete.

LIN@pdb1> select to_char(sysdate,'YYYY-MM-DD HH24:MI:SS') now from dual;

NOW
-------------------
2022-12-13 22:03:19

LIN@pdb1> exit
Disconnected from Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Beta
Version 23.1.0.0.0
[oracle@ol8-23c ~]$ 
```

#### <3> Archive log : enabled
```
[oracle@ol8-23c ~]$ sqlplus / as sysdba

SQL*Plus: Release 23.0.0.0.0 - Beta on Tue Dec 13 21:42:56 2022
Version 23.1.0.0.0

Copyright (c) 1982, 2022, Oracle.  All rights reserved.

Connected to:
Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Beta
Version 23.1.0.0.0

SYS@cdb1> alter session set nls_date_format = 'YYYY-MM-DD HH24:MI:SS';

Session altered.

SYS@cdb1> archive log list;
Database log mode	       Archive Mode
Automatic archival	       Enabled
Archive destination	       /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch
Oldest online log sequence     89
Next log sequence to archive   91
Current log sequence	       91
SYS@cdb1> 
```

#### <4> Full backup database
```
[oracle@ol8-23c ~]$ rman target /

Recovery Manager: Release 23.0.0.0.0 - Beta on Tue Dec 13 22:04:50 2022
Version 23.1.0.0.0

Copyright (c) 1982, 2022, Oracle and/or its affiliates.  All rights reserved.

RMAN Command Id : 2022-12-13T22:04:50
connected to target database: CDB1 (DBID=1093239018)

RMAN> backup database plus archivelog tag='backup_cdb_recover_pdb_table';


Starting backup at 13-DEC-22
current log archived
using target database control file instead of recovery catalog
allocated channel: ORA_DISK_1
channel ORA_DISK_1: SID=36 device type=DISK
allocated channel: ORA_DISK_2
~
channel ORA_DISK_1: backup set complete, elapsed time: 00:00:01
Finished backup at 13-DEC-22

Starting Control File and SPFILE Autobackup at 13-DEC-22
piece handle=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/c-1093239018-20221213-01 comment=NONE
Finished Control File and SPFILE Autobackup at 13-DEC-22

RMAN> 
```

#### <5> Drop table: t1
```
LIN@pdb1> select * from t1;

	ID
----------
	 1
	 2
	 3

LIN@pdb1> drop table t1;

Table dropped.

LIN@pdb1> select * from t1;
select * from t1
              *
ERROR at line 1:
ORA-00942: table or view does not exist

LIN@pdb1> 
```

#### <6> recover table
```
recover table lin.t1 until time "to_date('2022-12-13 22:03:19','YYYY-MM-DD HH24:MI:SS')" auxiliary destination '/u01/oradata';

-> lin.t1 table is in the pluggable database pdb1.
```
Error:
```
Automatic instance removed
auxiliary instance file /u01/oradata/CDB1/datafile/o1_mf_sysaux_ksk0rvrt_.dbf deleted
auxiliary instance file /u01/oradata/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_undotbs1_ksk0sc9y_.dbf deleted
auxiliary instance file /u01/oradata/CDB1/datafile/o1_mf_undotbs1_ksk0rvs9_.dbf deleted
auxiliary instance file /u01/oradata/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_system_ksk0sc8q_.dbf deleted
auxiliary instance file /u01/oradata/CDB1/datafile/o1_mf_system_ksk0rvsb_.dbf deleted
auxiliary instance file /u01/oradata/CDB1/datafile/o1_mf_sysaux_ksk0rvrt_.dbf deleted
auxiliary instance file /u01/oradata/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_undotbs1_ksk0sc9y_.dbf deleted
auxiliary instance file /u01/oradata/CDB1/datafile/o1_mf_undotbs1_ksk0rvs9_.dbf deleted
auxiliary instance file /u01/oradata/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_system_ksk0sc8q_.dbf deleted
auxiliary instance file /u01/oradata/CDB1/datafile/o1_mf_system_ksk0rvsb_.dbf deleted
auxiliary instance file /u01/oradata/CDB1/controlfile/o1_mf_ksk0rq7n_.ctl deleted
RMAN-00571: ===========================================================
RMAN-00569: =============== ERROR MESSAGE STACK FOLLOWS ===============
RMAN-00571: ===========================================================
RMAN-03002: failure of recover command at 12/13/2022 21:51:58
RMAN-05063: Cannot recover specified tables
RMAN-05057: Table LIN.T1 not found

RMAN> 
```

```
recover table lin.t1 of pluggable database pdb1 until time "to_date('2022-12-13 22:03:19','YYYY-MM-DD HH24:MI:SS')" auxiliary destination '/u01/oradata/ARCH_BAK';
```

Detail logs:
```
RMAN> recover table lin.t1 of pluggable database pdb1 until time "to_date('2022-12-13 22:03:19','YYYY-MM-DD HH24:MI:SS')" auxiliary destination '/u01/oradata/ARCH_BAK';

Starting recover at 13-DEC-22
using channel ORA_DISK_1
using channel ORA_DISK_2
RMAN-05026: warning: presuming following set of tablespaces applies to specified point-in-time

List of tablespaces expected to have UNDO segments
Tablespace SYSTEM
Tablespace PDB1:SYSTEM
Tablespace UNDOTBS1
Tablespace PDB1:UNDOTBS1

Creating automatic instance, with SID='xlhr'

initialization parameters used for automatic instance:
db_name=CDB1
db_unique_name=xlhr_pitr_pdb1_CDB1
compatible=23.0.0
db_block_size=8192
db_files=200
diagnostic_dest=/u01/app/oracle
_pdb_name_case_sensitive=false
_system_trig_enabled=FALSE
sga_target=1522M
processes=200
db_create_file_dest=/u01/oradata/ARCH_BAK
log_archive_dest_1='location=/u01/oradata/ARCH_BAK'
enable_pluggable_database=true
_clone_one_pdb_recovery=true
#No auxiliary parameter file used


starting up automatic instance CDB1

Oracle instance started

Total System Global Area    1595830352 bytes

Fixed Size                     9916496 bytes
Variable Size                385875968 bytes
Database Buffers            1191182336 bytes
Redo Buffers                   8855552 bytes
Automatic instance created

contents of Memory Script:
{
# set requested point in time
set until  time "to_date('2022-12-13 22:03:19','YYYY-MM-DD HH24:MI:SS')";
# restore the controlfile
restore clone controlfile;
 
# mount the controlfile
sql clone 'alter database mount clone database';
 
# archive current online log 
sql 'alter system archive log current';
}
executing Memory Script

executing command: SET until clause (TIME)

Starting restore at 13-DEC-22
allocated channel: ORA_AUX_DISK_1
channel ORA_AUX_DISK_1: SID=190 device type=DISK
allocated channel: ORA_AUX_DISK_2
channel ORA_AUX_DISK_2: SID=30 device type=DISK

channel ORA_AUX_DISK_1: starting datafile backup set restore
channel ORA_AUX_DISK_1: restoring control file
channel ORA_AUX_DISK_1: reading from backup piece /u01/app/oracle/product/23.0.0/dbhome_1/dbs/c-1093239018-20221213-00
channel ORA_AUX_DISK_1: piece handle=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/c-1093239018-20221213-00 tag=TAG20221213T214540
channel ORA_AUX_DISK_1: restored backup piece 1
channel ORA_AUX_DISK_1: restore complete, elapsed time: 00:00:01
output file name=/u01/oradata/ARCH_BAK/CDB1/controlfile/o1_mf_ksk1rtgo_.ctl
Finished restore at 13-DEC-22

sql statement: alter database mount clone database

sql statement: alter system archive log current

contents of Memory Script:
{
# set requested point in time
set until  time "to_date('2022-12-13 22:03:19','YYYY-MM-DD HH24:MI:SS')";
# set destinations for recovery set and auxiliary set datafiles
set newname for clone datafile  1 to new;
set newname for clone datafile  12 to new;
set newname for clone datafile  11 to new;
set newname for clone datafile  14 to new;
set newname for clone datafile  3 to new;
set newname for clone datafile  13 to new;
set newname for clone tempfile  1 to new;
set newname for clone tempfile  3 to new;
# switch all tempfiles
switch clone tempfile all;
# restore the tablespaces in the recovery set and the auxiliary set
restore clone datafile  1, 12, 11, 14, 3, 13;
 
switch clone datafile all;
}
executing Memory Script

executing command: SET until clause (TIME)

executing command: SET NEWNAME

executing command: SET NEWNAME

executing command: SET NEWNAME

executing command: SET NEWNAME

executing command: SET NEWNAME

executing command: SET NEWNAME

executing command: SET NEWNAME

executing command: SET NEWNAME

renamed tempfile 1 to /u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_temp_%u_.tmp in control file
renamed tempfile 3 to /u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_temp_%u_.tmp in control file

Starting restore at 13-DEC-22
using channel ORA_AUX_DISK_1
using channel ORA_AUX_DISK_2

channel ORA_AUX_DISK_1: starting datafile backup set restore
channel ORA_AUX_DISK_1: specifying datafile(s) to restore from backup set
channel ORA_AUX_DISK_1: restoring datafile 00011 to /u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_undotbs1_%u_.dbf
channel ORA_AUX_DISK_1: restoring datafile 00003 to /u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_sysaux_%u_.dbf
channel ORA_AUX_DISK_1: reading from backup piece /u01/app/oracle/product/23.0.0/dbhome_1/dbs/0d1fabr9_13_1_1
channel ORA_AUX_DISK_2: starting datafile backup set restore
channel ORA_AUX_DISK_2: specifying datafile(s) to restore from backup set
channel ORA_AUX_DISK_2: restoring datafile 00001 to /u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_system_%u_.dbf
channel ORA_AUX_DISK_2: reading from backup piece /u01/app/oracle/product/23.0.0/dbhome_1/dbs/0c1fabr9_12_1_1
channel ORA_AUX_DISK_1: piece handle=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/0d1fabr9_13_1_1 tag=TAG20221213T214511
channel ORA_AUX_DISK_1: restored backup piece 1
channel ORA_AUX_DISK_1: restore complete, elapsed time: 00:00:15
channel ORA_AUX_DISK_1: starting datafile backup set restore
channel ORA_AUX_DISK_1: specifying datafile(s) to restore from backup set
channel ORA_AUX_DISK_1: restoring datafile 00012 to /u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_system_%u_.dbf
channel ORA_AUX_DISK_1: reading from backup piece /u01/app/oracle/product/23.0.0/dbhome_1/dbs/0f1fabro_15_1_1
channel ORA_AUX_DISK_2: piece handle=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/0c1fabr9_12_1_1 tag=TAG20221213T214511
channel ORA_AUX_DISK_2: restored backup piece 1
channel ORA_AUX_DISK_2: restore complete, elapsed time: 00:00:15
channel ORA_AUX_DISK_2: starting datafile backup set restore
channel ORA_AUX_DISK_2: specifying datafile(s) to restore from backup set
channel ORA_AUX_DISK_2: restoring datafile 00014 to /u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_undotbs1_%u_.dbf
channel ORA_AUX_DISK_2: restoring datafile 00013 to /u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_sysaux_%u_.dbf
channel ORA_AUX_DISK_2: reading from backup piece /u01/app/oracle/product/23.0.0/dbhome_1/dbs/0e1fabro_14_1_1
channel ORA_AUX_DISK_1: piece handle=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/0f1fabro_15_1_1 tag=TAG20221213T214511
channel ORA_AUX_DISK_1: restored backup piece 1
channel ORA_AUX_DISK_1: restore complete, elapsed time: 00:00:08
channel ORA_AUX_DISK_2: piece handle=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/0e1fabro_14_1_1 tag=TAG20221213T214511
channel ORA_AUX_DISK_2: restored backup piece 1
channel ORA_AUX_DISK_2: restore complete, elapsed time: 00:00:07
Finished restore at 13-DEC-22

datafile 1 switched to datafile copy
input datafile copy RECID=7 STAMP=1123366070 file name=/u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_system_ksk1rzbz_.dbf
datafile 12 switched to datafile copy
input datafile copy RECID=8 STAMP=1123366070 file name=/u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_system_ksk1sgy1_.dbf
datafile 11 switched to datafile copy
input datafile copy RECID=9 STAMP=1123366070 file name=/u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_undotbs1_ksk1rz9t_.dbf
datafile 14 switched to datafile copy
input datafile copy RECID=10 STAMP=1123366070 file name=/u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_undotbs1_ksk1sh26_.dbf
datafile 3 switched to datafile copy
input datafile copy RECID=11 STAMP=1123366070 file name=/u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_sysaux_ksk1rz9f_.dbf
datafile 13 switched to datafile copy
input datafile copy RECID=12 STAMP=1123366070 file name=/u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_sysaux_ksk1sh1f_.dbf

contents of Memory Script:
{
# set requested point in time
set until  time "to_date('2022-12-13 22:03:19','YYYY-MM-DD HH24:MI:SS')";
# online the datafiles restored or switched
sql clone "alter database datafile  1 online";
sql clone 'PDB1' "alter database datafile 
 12 online";
sql clone "alter database datafile  11 online";
sql clone 'PDB1' "alter database datafile 
 14 online";
sql clone "alter database datafile  3 online";
sql clone 'PDB1' "alter database datafile 
 13 online";
# recover and open database read only
recover clone database tablespace  "SYSTEM", "PDB1":"SYSTEM", "UNDOTBS1", "PDB1":"UNDOTBS1", "SYSAUX", "PDB1":"SYSAUX";
sql clone 'alter database open read only';
}
executing Memory Script

executing command: SET until clause (TIME)

sql statement: alter database datafile  1 online

sql statement: alter database datafile  12 online

sql statement: alter database datafile  11 online

sql statement: alter database datafile  14 online

sql statement: alter database datafile  3 online

sql statement: alter database datafile  13 online

Starting recover at 13-DEC-22
using channel ORA_AUX_DISK_1
using channel ORA_AUX_DISK_2

Executing: alter database datafile 7 offline
Executing: alter database datafile 2, 4, 9 offline
Executing: alter database datafile 15 offline
starting media recovery

archived log for thread 1 with sequence 87 is already on disk as file /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_87_1119521578.dbf
archived log for thread 1 with sequence 88 is already on disk as file /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_88_1119521578.dbf
archived log for thread 1 with sequence 89 is already on disk as file /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_89_1119521578.dbf
archived log for thread 1 with sequence 90 is already on disk as file /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_90_1119521578.dbf
archived log for thread 1 with sequence 91 is already on disk as file /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_91_1119521578.dbf
archived log file name=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_87_1119521578.dbf thread=1 sequence=87
archived log file name=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_88_1119521578.dbf thread=1 sequence=88
archived log file name=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_89_1119521578.dbf thread=1 sequence=89
archived log file name=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_90_1119521578.dbf thread=1 sequence=90
archived log file name=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_91_1119521578.dbf thread=1 sequence=91
media recovery complete, elapsed time: 00:00:03
Finished recover at 13-DEC-22

sql statement: alter database open read only

contents of Memory Script:
{
sql clone 'alter pluggable database  PDB1 open read only';
}
executing Memory Script

sql statement: alter pluggable database  PDB1 open read only

contents of Memory Script:
{
   sql clone "create spfile from memory";
   shutdown clone immediate;
   startup clone nomount;
   sql clone "alter system set  control_files = 
  ''/u01/oradata/ARCH_BAK/CDB1/controlfile/o1_mf_ksk1rtgo_.ctl'' comment=
 ''RMAN set'' scope=spfile";
   shutdown clone immediate;
   startup clone nomount;
# mount database
sql clone 'alter database mount clone database';
}
executing Memory Script

sql statement: create spfile from memory

database closed
database dismounted
Oracle instance shut down

connected to auxiliary database (not started)
Oracle instance started

Total System Global Area    1595830352 bytes

Fixed Size                     9916496 bytes
Variable Size                385875968 bytes
Database Buffers            1191182336 bytes
Redo Buffers                   8855552 bytes

sql statement: alter system set  control_files =   ''/u01/oradata/ARCH_BAK/CDB1/controlfile/o1_mf_ksk1rtgo_.ctl'' comment= ''RMAN set'' scope=spfile

Oracle instance shut down

connected to auxiliary database (not started)
Oracle instance started

Total System Global Area    1595830352 bytes

Fixed Size                     9916496 bytes
Variable Size                385875968 bytes
Database Buffers            1191182336 bytes
Redo Buffers                   8855552 bytes

sql statement: alter database mount clone database

contents of Memory Script:
{
# set requested point in time
set until  time "to_date('2022-12-13 22:03:19','YYYY-MM-DD HH24:MI:SS')";
# set destinations for recovery set and auxiliary set datafiles
set newname for datafile  15 to new;
# restore the tablespaces in the recovery set and the auxiliary set
restore clone datafile  15;
 
switch clone datafile all;
}
executing Memory Script

executing command: SET until clause (TIME)

executing command: SET NEWNAME

Starting restore at 13-DEC-22
allocated channel: ORA_AUX_DISK_1
channel ORA_AUX_DISK_1: SID=27 device type=DISK
allocated channel: ORA_AUX_DISK_2
channel ORA_AUX_DISK_2: SID=190 device type=DISK

channel ORA_AUX_DISK_1: starting datafile backup set restore
channel ORA_AUX_DISK_1: specifying datafile(s) to restore from backup set
channel ORA_AUX_DISK_1: restoring datafile 00015 to /u01/oradata/ARCH_BAK/XLHR_PITR_PDB1_CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_users_%u_.dbf
channel ORA_AUX_DISK_1: reading from backup piece /u01/app/oracle/product/23.0.0/dbhome_1/dbs/0f1fabro_15_1_1
channel ORA_AUX_DISK_1: piece handle=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/0f1fabro_15_1_1 tag=TAG20221213T214511
channel ORA_AUX_DISK_1: restored backup piece 1
channel ORA_AUX_DISK_1: restore complete, elapsed time: 00:00:03
Finished restore at 13-DEC-22

datafile 15 switched to datafile copy
input datafile copy RECID=14 STAMP=1123366123 file name=/u01/oradata/ARCH_BAK/XLHR_PITR_PDB1_CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_users_ksk1v8cr_.dbf

contents of Memory Script:
{
# set requested point in time
set until  time "to_date('2022-12-13 22:03:19','YYYY-MM-DD HH24:MI:SS')";
# online the datafiles restored or switched
sql clone 'PDB1' "alter database datafile 
 15 online";
# recover and open resetlogs
recover clone database tablespace  "PDB1":"USERS", "SYSTEM", "PDB1":"SYSTEM", "UNDOTBS1", "PDB1":"UNDOTBS1", "SYSAUX", "PDB1":"SYSAUX" delete archivelog;
alter clone database open resetlogs;
}
executing Memory Script

executing command: SET until clause (TIME)

sql statement: alter database datafile  15 online

Starting recover at 13-DEC-22
using channel ORA_AUX_DISK_1
using channel ORA_AUX_DISK_2

Executing: alter database datafile 7 offline
Executing: alter database datafile 2, 4, 9 offline
starting media recovery

archived log for thread 1 with sequence 87 is already on disk as file /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_87_1119521578.dbf
archived log for thread 1 with sequence 88 is already on disk as file /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_88_1119521578.dbf
archived log for thread 1 with sequence 89 is already on disk as file /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_89_1119521578.dbf
archived log for thread 1 with sequence 90 is already on disk as file /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_90_1119521578.dbf
archived log for thread 1 with sequence 91 is already on disk as file /u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_91_1119521578.dbf
archived log file name=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_87_1119521578.dbf thread=1 sequence=87
archived log file name=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_88_1119521578.dbf thread=1 sequence=88
archived log file name=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_89_1119521578.dbf thread=1 sequence=89
archived log file name=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_90_1119521578.dbf thread=1 sequence=90
archived log file name=/u01/app/oracle/product/23.0.0/dbhome_1/dbs/arch1_91_1119521578.dbf thread=1 sequence=91
media recovery complete, elapsed time: 00:00:01
Finished recover at 13-DEC-22

database opened

contents of Memory Script:
{
sql clone 'alter pluggable database  PDB1 open';
}
executing Memory Script

sql statement: alter pluggable database  PDB1 open

contents of Memory Script:
{
# create directory for datapump import
sql 'PDB1' "create or replace directory 
TSPITR_DIROBJ_DPDIR as ''
/u01/oradata/ARCH_BAK''";
# create directory for datapump export
sql clone 'PDB1' "create or replace directory 
TSPITR_DIROBJ_DPDIR as ''
/u01/oradata/ARCH_BAK''";
}
executing Memory Script

sql statement: create or replace directory TSPITR_DIROBJ_DPDIR as ''/u01/oradata/ARCH_BAK''

sql statement: create or replace directory TSPITR_DIROBJ_DPDIR as ''/u01/oradata/ARCH_BAK''

Performing export of tables...
   EXPDP> Starting "SYS"."TSPITR_EXP_xlhr_pxln":  
   EXPDP> Processing object type TABLE_EXPORT/TABLE/TABLE_DATA
   EXPDP> Processing object type TABLE_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
   EXPDP> Processing object type TABLE_EXPORT/TABLE/TABLE
   EXPDP> . . exported "LIN"."T1"                                  5.078 KB       3 rows
   EXPDP> Master table "SYS"."TSPITR_EXP_xlhr_pxln" successfully loaded/unloaded
   EXPDP> ******************************************************************************
   EXPDP> Dump file set for SYS.TSPITR_EXP_xlhr_pxln is:
   EXPDP>   /u01/oradata/ARCH_BAK/tspitr_xlhr_72953.dmp
   EXPDP> Job "SYS"."TSPITR_EXP_xlhr_pxln" successfully completed at Tue Dec 13 22:09:47 2022 elapsed 0 00:00:28
Export completed


contents of Memory Script:
{
# shutdown clone before import
shutdown clone abort
}
executing Memory Script

Oracle instance shut down

Performing import of tables...
   IMPDP> Master table "SYS"."TSPITR_IMP_xlhr_cBtA" successfully loaded/unloaded
   IMPDP> Starting "SYS"."TSPITR_IMP_xlhr_cBtA":  
   IMPDP> Processing object type TABLE_EXPORT/TABLE/TABLE
   IMPDP> Processing object type TABLE_EXPORT/TABLE/TABLE_DATA
   IMPDP> . . imported "LIN"."T1"                                  5.078 KB       3 rows
   IMPDP> Processing object type TABLE_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
   IMPDP> Job "SYS"."TSPITR_IMP_xlhr_cBtA" successfully completed at Tue Dec 13 22:10:35 2022 elapsed 0 00:00:16
Import completed

Removing automatic instance
Automatic instance removed
auxiliary instance file /u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_temp_ksk1t4ph_.tmp deleted
auxiliary instance file /u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_temp_ksk1t0ww_.tmp deleted
auxiliary instance file /u01/oradata/ARCH_BAK/XLHR_PITR_PDB1_CDB1/onlinelog/o1_mf_3_ksk1vmj5_.log deleted
auxiliary instance file /u01/oradata/ARCH_BAK/XLHR_PITR_PDB1_CDB1/onlinelog/o1_mf_2_ksk1vm6s_.log deleted
auxiliary instance file /u01/oradata/ARCH_BAK/XLHR_PITR_PDB1_CDB1/onlinelog/o1_mf_1_ksk1vm4p_.log deleted
auxiliary instance file /u01/oradata/ARCH_BAK/XLHR_PITR_PDB1_CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_users_ksk1v8cr_.dbf deleted
auxiliary instance file /u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_sysaux_ksk1sh1f_.dbf deleted
auxiliary instance file /u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_sysaux_ksk1rz9f_.dbf deleted
auxiliary instance file /u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_undotbs1_ksk1sh26_.dbf deleted
auxiliary instance file /u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_undotbs1_ksk1rz9t_.dbf deleted
auxiliary instance file /u01/oradata/ARCH_BAK/CDB1/EC52E514E137198BE0530100007F98C1/datafile/o1_mf_system_ksk1sgy1_.dbf deleted
auxiliary instance file /u01/oradata/ARCH_BAK/CDB1/datafile/o1_mf_system_ksk1rzbz_.dbf deleted
auxiliary instance file /u01/oradata/ARCH_BAK/CDB1/controlfile/o1_mf_ksk1rtgo_.ctl deleted
auxiliary instance file tspitr_xlhr_72953.dmp deleted
Finished recover at 13-DEC-22

RMAN> 
```

#### <7> check lin.t1 records.
```
LIN@pdb1> select * from t1;

	ID
----------
	 1
	 2
	 3

LIN@pdb1> 
```

### Reference 

[Backup and Recovery Reference / RECOVER command](https://docs.oracle.com/en/database/oracle/oracle-database/19/rcmrf/RECOVER.html#GUID-CA98040F-9865-4F4F-BAF2-91C518612E95)

```
OF PLUGGABLE DATABASE pdb_name

In a CDB, the name of a PDB in which the table or table partition that must be recovered resides. To recover tables or table partitions in a PDB, you must connect to the root as described in "Connecting to CDBs and PDBs".
```

[Examples: Recovering Tables and Table Partitions From RMAN Backups](https://docs.oracle.com/en/database/oracle/oracle-database/19/bradv/rman-recovering-tables-partitions.html#GUID-DEE9C16C-C30A-46C6-A0CE-2DE060A8EC10)


[Oracle Beta Programs](https://tinyurl.com/OracleBeta)

[Oracle Database 23c Beta Program](https://blogs.oracle.com/database/post/oracle-database-23c-beta-program)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


