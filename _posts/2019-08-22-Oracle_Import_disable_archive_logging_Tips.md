---
layout: post
title: "Oracle 19c Import with disable_archive_logging Tips"
category: Linux
tags: Oracle Import disable_archive_logging Tips
---

* content
{:toc}

Oracle 19c Import with disable_archive_logging Tips

Oracle12c feature is the ability to run in nologging mode in import execution, disabling archive logging during a large import. Only for table and index Not for tablespace.

```
    transform=disable_archive_logging:Y
    transform=disable_archive_logging:Y:tablename
    transform=disable_archive_logging:Y:indexname
```







### Test 

Create directory and user;

```
SYS@orcl> create directory imp_home as '/home/oracle';

Directory created.

SYS@orcl> 
SYS@orcl> show parameter user_pre

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
common_user_prefix                   string      C##
SYS@orcl> create user c##lin identified by oracle;

User created.

SYS@orcl> grant dba to c##lin;

Grant succeeded.

SYS@orcl>

```

Generate data

```
SYS@orcl> conn c##lin/oracle
Connected.
C##LIN@orcl>
C##LIN@orcl> select count(*) from dba_objects;

  COUNT(*)
----------
     72549

C##LIN@orcl> select count(*) from cdb_objects;

  COUNT(*)
----------
     72549

C##LIN@orcl> create table imp_test as select * from dba_objects;

Table created.

C##LIN@orcl> insert into imp_test (select * from imp_test);

72549 rows created.

C##LIN@orcl> /

145098 rows created.

C##LIN@orcl> /

290196 rows created.

C##LIN@orcl> /

580392 rows created.

C##LIN@orcl> /

1160784 rows created.

C##LIN@orcl> commit;

Commit complete.

C##LIN@orcl>

C##LIN@orcl> col segment_name for a20
C##LIN@orcl> select bytes/1024/1024  mb, segment_name, segment_type from user_segments;

        MB SEGMENT_NAME         SEGMENT_TYPE
---------- -------------------- ------------------
       360 IMP_TEST             TABLE

C##LIN@orcl>

```

Export the test data;

```

C##LIN@orcl> !expdp \"/as sysdba\" directory=imp_home dumpfile=imp_test.dmp logfile=imp_test.log schemas="C##LIN"

Export: Release 19.0.0.0.0 - Production on Thu Aug 22 14:03:58 2019
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle and/or its affiliates.  All rights reserved.
Password:

Connected to: Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production


Warning: Oracle Data Pump operations are not typically needed when connected to the root or seed of a container database.

Starting "SYS"."SYS_EXPORT_SCHEMA_01":  "/******** AS SYSDBA" directory=imp_home dumpfile=imp_test.dmp logfile=imp_test.log schemas=C##LIN
Processing object type SCHEMA_EXPORT/TABLE/TABLE_DATA
Processing object type SCHEMA_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
Processing object type SCHEMA_EXPORT/STATISTICS/MARKER
Processing object type SCHEMA_EXPORT/SYSTEM_GRANT
Processing object type SCHEMA_EXPORT/ROLE_GRANT
Processing object type SCHEMA_EXPORT/DEFAULT_ROLE
Processing object type SCHEMA_EXPORT/PRE_SCHEMA/PROCACT_SCHEMA
Processing object type SCHEMA_EXPORT/TABLE/TABLE
. . exported "C##LIN"."IMP_TEST"                         305.8 MB 2321568 rows
Master table "SYS"."SYS_EXPORT_SCHEMA_01" successfully loaded/unloaded
******************************************************************************
Dump file set for SYS.SYS_EXPORT_SCHEMA_01 is:
  /home/oracle/imp_test.dmp
Job "SYS"."SYS_EXPORT_SCHEMA_01" successfully completed at Thu Aug 22 14:07:32 2019 elapsed 0 00:03:10


C##LIN@orcl> 
C##LIN@orcl> !ls -ltr /home/oracle/imp_test.dmp
-rw-r-----. 1 oracle oinstall 321089536 Aug 22 14:07 /home/oracle/imp_test.dmp

C##LIN@orcl> !du -sm /home/oracle/imp_test.dmp
307     /home/oracle/imp_test.dmp

C##LIN@orcl>

```

Test import transform_enable mode: redo log from 724mb to 1081mb / elapsed 0 00:02:20

```

C##LIN@orcl> drop table c##lin.imp_test purge;

Table dropped.

C##LIN@orcl> select name, value/1024/1024 mb from v$sysstat where name ='redo size' ;

NAME                                                                     MB
---------------------------------------------------------------- ----------
redo size                                                        724.179874

C##LIN@orcl> !impdp \"/as sysdba\" directory=imp_home dumpfile=imp_test.dmp logfile=transform_disable.log schemas="C##LIN"

Import: Release 19.0.0.0.0 - Production on Thu Aug 22 14:22:11 2019
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle and/or its affiliates.  All rights reserved.
Password:

Connected to: Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production

Warning: Oracle Data Pump operations are not typically needed when connected to the root or seed of a container database.

Master table "SYS"."SYS_IMPORT_SCHEMA_01" successfully loaded/unloaded
Starting "SYS"."SYS_IMPORT_SCHEMA_01":  "/******** AS SYSDBA" directory=imp_home dumpfile=imp_test.dmp logfile=transform_disable.log schemas=C##LIN
Processing object type SCHEMA_EXPORT/SYSTEM_GRANT
Processing object type SCHEMA_EXPORT/ROLE_GRANT
Processing object type SCHEMA_EXPORT/DEFAULT_ROLE
Processing object type SCHEMA_EXPORT/PRE_SCHEMA/PROCACT_SCHEMA
Processing object type SCHEMA_EXPORT/TABLE/TABLE
Processing object type SCHEMA_EXPORT/TABLE/TABLE_DATA
. . imported "C##LIN"."IMP_TEST"                         305.8 MB 2321568 rows
Processing object type SCHEMA_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
Processing object type SCHEMA_EXPORT/STATISTICS/MARKER
Job "SYS"."SYS_IMPORT_SCHEMA_01" successfully completed at Thu Aug 22 14:24:39 2019 elapsed 0 00:02:20


C##LIN@orcl> select name, value/1024/1024 mb from v$sysstat where name ='redo size' ;

NAME                                                                     MB
---------------------------------------------------------------- ----------
redo size                                                        1081.06575

C##LIN@orcl>



```

Test import transform_disable mode: redo log from 1081mb to 1084mb / elapsed 0 00:01:28

```

C##LIN@orcl> drop table c##lin.imp_test purge;

Table dropped.

C##LIN@orcl> select name, value/1024/1024 mb from v$sysstat where name ='redo size' ;

NAME                                                                     MB
---------------------------------------------------------------- ----------
redo size                                                        1081.18863

C##LIN@orcl>
C##LIN@orcl> !impdp \"/as sysdba\" directory=imp_home dumpfile=imp_test.dmp logfile=transform_disable.log schemas="C##LIN" transform=disable_archive_logging:Y

Import: Release 19.0.0.0.0 - Production on Thu Aug 22 14:28:48 2019
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle and/or its affiliates.  All rights reserved.
Password:

Connected to: Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production

Warning: Oracle Data Pump operations are not typically needed when connected to the root or seed of a container database.

Master table "SYS"."SYS_IMPORT_SCHEMA_01" successfully loaded/unloaded
Starting "SYS"."SYS_IMPORT_SCHEMA_01":  "/******** AS SYSDBA" directory=imp_home dumpfile=imp_test.dmp logfile=transform_disable.log schemas=C##LIN transform=disable_archive_logging:Y
Processing object type SCHEMA_EXPORT/SYSTEM_GRANT
Processing object type SCHEMA_EXPORT/ROLE_GRANT
Processing object type SCHEMA_EXPORT/DEFAULT_ROLE
Processing object type SCHEMA_EXPORT/PRE_SCHEMA/PROCACT_SCHEMA
Processing object type SCHEMA_EXPORT/TABLE/TABLE
Processing object type SCHEMA_EXPORT/TABLE/TABLE_DATA
. . imported "C##LIN"."IMP_TEST"                         305.8 MB 2321568 rows
Processing object type SCHEMA_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
Processing object type SCHEMA_EXPORT/STATISTICS/MARKER

Job "SYS"."SYS_IMPORT_SCHEMA_01" successfully completed at Thu Aug 22 14:30:23 2019 elapsed 0 00:01:28


C##LIN@orcl> select name, value/1024/1024 mb from v$sysstat where name ='redo size' ;

NAME                                                                     MB
---------------------------------------------------------------- ----------
redo size                                                        1084.21175

C##LIN@orcl>


```

The Result of importing with transform/disable_archive_logging

| Data   | transform(archive_logging)      | Generated Redo log size |  Import elapsed    |
| :----- | :-----------------------------: | ----------------------: |  ----------------: |
| 360MB  | enable(default)| 357 MB                  |  02:20             |
| 360MB  | disable        | 3.1 MB                  |  01:28             |

### Reference and Other Tips

DISABLE_ARCHIVE_LOGGING

[Oracle Data Pump Import ](https://docs.oracle.com/en/database/oracle/oracle-database/19/sutil/datapump-import-utility.html#GUID-D11E340E-14C6-43B8-AB09-6335F0C1F71B)

```
DISABLE_ARCHIVE_LOGGING:[Y | N]

This transform is valid for the following object types: INDEX and TABLE.

If set to Y, then the logging attributes for the specified object types (TABLE and/or INDEX) are disabled before the data is imported. If set to N (the default), then archive logging is not disabled during import. After the data has been loaded, the logging attributes for the objects are restored to their original settings. If no object type is specified, then the DISABLE_ARCHIVE_LOGGING behavior is applied to both TABLE and INDEX object types. This transform works for both file mode imports and network mode imports. It does not apply to transportable tablespace imports. 

If the database is in FORCE LOGGING mode, then the DISABLE_ARCHIVE_LOGGING option does not disable logging when indexes and tables are created. 

```

Other Tips: Disable Archive Log Not Working During IMPDP (Doc ID 2223043.1)

```
In no-archive log mode, Disable_archive_logging does not affect import session with content=data_only because it does not execute any CREATE TABLE/INDEX DDLs. 
```


[Speed up Import with TRANSFORM=DISABLE_ARCHIVE_LOGGING in #Oracle 12c](https://uhesse.com/2014/01/20/speed-up-import-with-transformdisable_archive_logging-in-oracle-12c/)




#### Prepare archivelog mode

```

SYS@orcl> select log_mode from v$database;

LOG_MODE
------------
NOARCHIVELOG
SYS@orcl> archive log list;
Database log mode              No Archive Mode
Automatic archival             Disabled
Archive destination            /u01/app/oracle/product/19.0.0/dbhome_1/dbs/arch
Oldest online log sequence     37
Current log sequence           39
SYS@orcl>

```

Configuring the database for ARCHIVELOG Mode

- db_recovery_file_dest - ORACLE_BASE/flash_recovery_area - This is the location of the flash recovery area.

- db_recovery_file_dest_size - 2g - This is the maximum size that can be used by the flash recovery area.  If this size limit is exceeded, you must clear out space or database operations will eventually stall.


```
SYS@orcl> shu immediate;
Database closed.
Database dismounted.
ORACLE instance shut down.
SYS@orcl> startup mount;
ORACLE instance started.

Total System Global Area  725611352 bytes
Fixed Size                  9139032 bytes
Variable Size             574619648 bytes
Database Buffers          134217728 bytes
Redo Buffers                7634944 bytes
Database mounted.
SYS@orcl> alter database archivelog;
SYS@orcl> alter database open;
SYS@orcl> archive log list;
Database log mode              Archive Mode
Automatic archival             Enabled
Archive destination            /u01/app/oracle/product/19.0.0/dbhome_1/dbs/arch
Oldest online log sequence     37
Next log sequence to archive   39
Current log sequence           39
SYS@orcl>
SYS@orcl> show parameter recovery

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
db_recovery_file_dest                string
db_recovery_file_dest_size           big integer 0
recovery_parallelism                 integer     0
remote_recovery_file_dest            string
SYS@orcl> alter system set db_recovery_file_dest_size=1g;
SYS@orcl> alter system set db_recovery_file_dest='/u01/app/oracle/oradata';
SYS@orcl> !ls -ltr /u01/app/oracle/oradata
total 4
drwxr-x---. 4 oracle oinstall 4096 Jul 16 10:31 ORCL

SYS@orcl> show parameter recovery

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
db_recovery_file_dest                string      /u01/app/oracle/oradata
db_recovery_file_dest_size           big integer 1G
recovery_parallelism                 integer     0
remote_recovery_file_dest            string
SYS@orcl>
SYS@orcl> archive log list;
Database log mode              Archive Mode
Automatic archival             Enabled
Archive destination            USE_DB_RECOVERY_FILE_DEST
Oldest online log sequence     41
Next log sequence to archive   43
Current log sequence           43
SYS@orcl>

```



	
Have a good work&life! 2019/08 via LinHong



