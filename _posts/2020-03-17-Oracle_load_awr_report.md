---
layout: post
title: "Oracle 19c load awr report"
category: Oracle
tags: Oracle awr Tips 
---

* content
{:toc}

Oracle 19c load awr report

Tips: 

Load data from datapump file created by awrload.sql. 

Use awrextr.sql extract data from AWR into a datapump file.

Use same db version is good choise(the awr format are different from db versions.)

Need to check tablespace's size while load awr data due to the limit of tablespace.














### Ensure SYSAUX tablespace's size and create directory for awrdat.

```shell
SYS@orcl> SELECT * FROM dba_tablespace_usage_metrics;

TABLESPACE_NAME                USED_SPACE TABLESPACE_SIZE USED_PERCENT
------------------------------ ---------- --------------- ------------
AWR_STAGE                             128         3166497   .004042322
AWR_TBS                               128         3166497   .004042322
SYSAUX                              74760         3166497    2.3609686
SYSTEM                             113968         3166497   3.59918231
TEMP                                  128         3166492   .004042328
USERS                                 344         3166497    .01086374

6 rows selected.

SYS@orcl> !ls -tlr
total 873120
-rwxrwxr-x. 1 oracle oinstall     16152 Dec  3 13:48 awrdat_50790_50958.log
-rwxrwxr-x. 1 oracle oinstall 892444672 Dec  3 13:48 awrdat_50790_50958.dmp
drwxr-xr-x. 2 oracle oinstall      4096 Feb 26 05:14 log

SYS@orcl> !pwd
/home/oracle/1203

SYS@orcl> create or replace directory awr_dir as '/home/oracle/1203';

Directory created.

SYS@orcl> grant read,write,execute on directory awr_dir to public;

Grant succeeded.

SYS@orcl>

```


### awrload the dump data.

```shell
SYS@orcl> @?/rdbms/admin/awrload.sql
~~~~~~~~~~
AWR LOAD
~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~  This script will load the AWR data from a dump file. The   ~
~  script will prompt users for the following information:    ~
~     (1) name of directory object                            ~
~     (2) name of dump file                                   ~
~     (3) staging schema name to load AWR data into           ~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Specify the Directory Name
~~~~~~~~~~~~~~~~~~~~~~~~~~

Directory Name                 Directory Path
------------------------------ -------------------------------------------------
AWR_DIR                        /home/oracle/1203
DATA_PUMP_DIR                  /u01/app/oracle/admin/orcl/dpdump/
JAVA$JOX$CUJS$DIRECTORY$       /u01/app/oracle/product/19.0.0/dbhome_1/javavm/ad
                               min/

OPATCH_INST_DIR                /u01/app/oracle/product/19.0.0/dbhome_1/OPatch
OPATCH_LOG_DIR                 /u01/app/oracle/product/19.0.0/dbhome_1/rdbms/log
OPATCH_SCRIPT_DIR              /u01/app/oracle/product/19.0.0/dbhome_1/QOpatch
ORACLE_BASE                    /u01/app/oracle
ORACLE_HOME                    /u01/app/oracle/product/19.0.0/dbhome_1
ORACLE_OCM_CONFIG_DIR          /u01/app/oracle/product/19.0.0/dbhome_1/ccr/state
ORACLE_OCM_CONFIG_DIR2         /u01/app/oracle/product/19.0.0/dbhome_1/ccr/state
SDO_DIR_ADMIN                  /u01/app/oracle/product/19.0.0/dbhome_1/md/admin
SDO_DIR_WORK
XMLDIR                         /u01/app/oracle/product/19.0.0/dbhome_1/rdbms/xml
XSDDIR                         /u01/app/oracle/product/19.0.0/dbhome_1/rdbms/xml
                               /schema


Choose a Directory Name from the list above (case-sensitive).

Enter value for directory_name: AWR_DIR									####--- Input directory name.

Using the dump directory: AWR_DIR

Specify the Name of the Dump File to Load
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Please specify the prefix of the dump file (.dmp) to load:

Enter value for file_name: awrdat_50790_50958						####--- Input dump name(.dmp is no need.)

Loading from the file name: awrdat_50790_50958.dmp

Staging Schema to Load AWR Snapshot Data
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The next step is to create the staging schema
where the AWR snapshot data will be loaded.
After loading the data into the staging schema,
the data will be transferred into the AWR tables
in the SYS schema.


The default staging schema name is C##AWR_STAGE.
To use this name, press <return> to continue, otherwise enter
an alternative.

Enter value for schema_name:										####--- Default user.

Using the staging schema name: C##AWR_STAGE

Choose the Default tablespace for the C##AWR_STAGE user
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Choose the C##AWR_STAGE users's default tablespace.  This is the
tablespace in which the AWR data will be staged.

TABLESPACE_NAME                CONTENTS              DEFAULT TABLESPACE
------------------------------ --------------------- ------------------
AWR_STAGE                      PERMANENT
AWR_TBS                        PERMANENT
SYSAUX                         PERMANENT             *
USERS                          PERMANENT

Pressing <return> will result in the recommended default
tablespace (identified by *) being used.

Enter value for default_tablespace:									####--- Default tablespace.

Using tablespace SYSAUX as the default tablespace for the C##AWR_STAGE


Choose the Temporary tablespace for the C##AWR_STAGE user
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Choose the C##AWR_STAGE user's temporary tablespace.

TABLESPACE_NAME                CONTENTS              DEFAULT TEMP TABLESPACE
------------------------------ --------------------- -----------------------
TEMP                           TEMPORARY             *

Pressing <return> will result in the database's default temporary
tablespace (identified by *) being used.

Enter value for temporary_tablespace:								####--- Default temporary tablespace.

Using tablespace TEMP as the temporary tablespace for C##AWR_STAGE




... Creating C##AWR_STAGE user

|
| ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
|  Loading the AWR data from the following
|  directory/file:
|   /home/oracle/1203
|   awrdat_50790_50958.dmp
| ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
|
|  *** AWR Load Started ...
|
|  This operation will take a few moments. The
|  progress of the AWR load operation can be
|  monitored in the following directory/file:
|   /home/oracle/1203
|   awrdat_50790_50958.log
|
... Dropping C##AWR_STAGE user

End of AWR Load
SYS@orcl>

```

### Check AWR Load log file.

```
Starting "SYS"."SYS_IMPORT_FULL_02":
W-1 Processing object type TABLE_EXPORT/TABLE/TABLE
W-1 Table "C##AWR_STAGE"."WRM$_WR_CONTROL" exists. Data will be appended to existing table but all dependent metadata will be skipped due to table_exists_action of append
W-1      Completed 133 TABLE objects in 12 seconds
W-1 Processing object type TABLE_EXPORT/TABLE/TABLE_DATA
W-1 . . imported "C##AWR_STAGE"."WRH$_ACTIVE_SESSION_HISTORY":"WRH$_ACTIVE_3935825519_0"  332.8 MB 1165722 rows in 21 seconds using direct_path
W-1 . . imported "C##AWR_STAGE"."WRH$_EVENT_HISTOGRAM":"WRH$_EVENT__3935825519_0"  22.79 MB  716477 rows in 3 seconds using direct_path
W-1 . . imported "C##AWR_STAGE"."WRH$_SQLSTAT":"WRH$_SQLSTA_3935825519_0"  14.85 MB   38677 rows in 0 seconds using direct_path
W-1 . . imported "C##AWR_STAGE"."WRH$_LATCH_MISSES_SUMMARY":"WRH$_LATCH__3935825519_0"  11.27 MB  180813 rows in 0 seconds using direct_path
W-1 . . imported "C##AWR_STAGE"."WRH$_LATCH":"WRH$_LATCH_3935825519_0"  10.32 MB  196716 rows in 2 seconds using direct_path
W-1 . . imported "C##AWR_STAGE"."WRH$_SQL_PLAN"              179.5 MB  489870 rows in 12 seconds using direct_path
~~
W-1 . . imported "C##AWR_STAGE"."WRH$_FILESTATXS":"WRH$_FILEST_3935825519_50984"  10.60 KB       0 rows in 0 seconds using direct_path
W-1      Completed 160 TABLE_EXPORT/TABLE/TABLE_DATA objects in 63 seconds
Job "SYS"."SYS_IMPORT_FULL_02" successfully completed at Thu Mar 17 02:12:42 2020 elapsed 0 00:01:19
```

### Check the awr report in local db.


```shell
SYS@orcl> select DBID, name from v$database;

       DBID NAME
----------- ---------
 1542511712 ORCL

SYS@orcl> col DBID for 9999999999;
SYS@orcl> select DBID, INSTANCE_NUMBER, count(SNAP_ID), min(SNAP_ID), max(SNAP_ID) from DBA_HIST_SNAPSHOT group by DBID, INSTANCE_NUMBER order by INSTANCE_NUMBER, DBID;

       DBID INSTANCE_NUMBER COUNT(SNAP_ID) MIN(SNAP_ID) MAX(SNAP_ID)
----------- --------------- -------------- ------------ ------------
 1542511712               1              4           26           29
 1935825619               1            169        50790        50958
 1935825619               2            169        50790        50958

SYS@orcl>
```



Have a good work&life! 2020/03 via LinHong


