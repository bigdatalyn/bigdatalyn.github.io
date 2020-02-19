---
layout: post
title: "Oracle 19c Online statistics gathering between sqlloader and insert append Tips"
category: Oracle
tags: Oracle SQLloader Tips 
---

* content
{:toc}

Oracle 19c online statistics gathering Tips


This is test with sqlloader/insert append sql.







### Test env

Oracle Linux 7 and oracle database 19c

```shell
[oracle@ora7 ~]$ uname -a
Linux ora7 4.14.35-1844.0.7.el7uek.x86_64 #2 SMP Wed Dec 12 19:48:02 PST 2018 x86_64 x86_64 x86_64 GNU/Linux
[oracle@ora7 ~]$
[oracle@ora7 ~]$ cat /etc/redhat-release
Red Hat Enterprise Linux Server release 7.6 (Maipo)
[oracle@ora7 ~]$ sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on Wed Feb 11 07:09:59 2020
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SYS@orcl> exit;
Disconnected from Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0
[oracle@ora7 ~]$
```


### Test Steps

Table: sqlloader_tab for sqlloader

Table: insertappend_tab for insert append sql

Data file: sqlloader_tab.dat for sqlloader

```
SYSTEM@pdb1> conn lin/oracle@pdb1
Connected.
LIN@pdb1>
LIN@pdb1> create table sqlloader_tab (col1 number, col2 varchar(20));
LIN@pdb1> create table insertappend_tab(col1 number, col2 varchar(20));
LIN@pdb1> !vi sqlloader_tab

LIN@pdb1> !cat sqlloader_tab
1,'aaaaaaaaaa'
2,'bbbbbbbbbb'
3,'cccccccccc'

LIN@pdb1> !mv sqlloader_tab sqlloader_tab.dat

LIN@pdb1> !sqlldr lin/oracle@pdb1 table=sqlloader_tab direct=y

SQL*Loader: Release 19.0.0.0.0 - Production on Wed Feb 11 07:54:53 2020
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle and/or its affiliates.  All rights reserved.

Express Mode Load, Table: SQLLOADER_TAB
Path used:      Direct

Load completed - logical record count 3.

Table SQLLOADER_TAB:
  3 Rows successfully loaded.

Check the log file:
  sqlloader_tab.log
for more information about the load.

LIN@pdb1> select * from sqlloader_tab;
         1 'aaaaaaaaaa'
         2 'bbbbbbbbbb'
         3 'cccccccccc'
LIN@pdb1> insert /*+APPEND*/ into insertappend_tab select * from sqlloader_tab;
LIN@pdb1> commit;
LIN@pdb1>
LIN@pdb1> col owner format a10
LIN@pdb1> col table_name format a20
LIN@pdb1> select owner,table_name,num_rows,blocks,last_analyzed from dba_tab_statistics where table_name in ('SQLLOADER_TAB','INSERTAPPEND_TAB');

OWNER      TABLE_NAME             NUM_ROWS     BLOCKS LAST_ANAL
---------- -------------------- ---------- ---------- ---------
LIN        SQLLOADER_TAB
LIN        INSERTAPPEND_TAB              3          4 11-FEB-20

LIN@pdb1>

```

### Result Tips

The table SQLLOADER_TAB has NOT statistics infor but table INSERTAPPEND_TAB has statistics infor which are gathered by the execution of insert append sql.

It means that online statistics gathering is used in insert append sql.

How can we check whether the table/columns have gather online statistics in insert sql?

	If online statistics gathering is used, then the "NOTE" column in the view "user_tab_col_statistics" will contain STATS_ON_LOAD to indicate that online statistics gathering has occurred.
eg.

```shell
LIN@pdb1> col table_name format a20
LIN@pdb1> col column_name format a20
LIN@pdb1> col notes format a20
LIN@pdb1> select table_name,column_name,NOTES from user_tab_col_statistics where table_name in ('SQLLOADER_TAB','INSERTAPPEND_TAB');

TABLE_NAME           COLUMN_NAME          NOTES
-------------------- -------------------- --------------------
INSERTAPPEND_TAB     COL1                 STATS_ON_LOAD
INSERTAPPEND_TAB     COL2                 STATS_ON_LOAD

LIN@pdb1>
```


#### Disabling online statistics gathering

This feature is controlled by the parameter _optimizer_gather_stats_on_load which is true by default.

To disable the feature:

    set _optimizer_gather_stats_on_load=false 
    use the NO_GATHER_OPTIMIZER_STATISTICS hint:  SELECT /*+ NO_GATHER_OPTIMIZER_STATISTICS */ ...

Test steps:

```shell

>>>>>>> /*+ NO_GATHER_OPTIMIZER_STATISTICS */ hint test

LIN@pdb1> create table insertappend_tab_no(col1 number, col2 varchar(20));

Table created.

LIN@pdb1> insert /*+APPEND*/ into insertappend_tab_no select /*+ NO_GATHER_OPTIMIZER_STATISTICS */ * from sqlloader_tab;

3 rows created.

LIN@pdb1> select table_name,column_name,NOTES from user_tab_col_statistics where table_name in ('INSERTAPPEND_TAB','INSERTAPPEND_TAB_NO');

TABLE_NAME           COLUMN_NAME          NOTES
-------------------- -------------------- --------------------
INSERTAPPEND_TAB     COL1                 STATS_ON_LOAD
INSERTAPPEND_TAB     COL2                 STATS_ON_LOAD

LIN@pdb1> 
LIN@pdb1> select owner,table_name,num_rows,blocks,last_analyzed from dba_tab_statistics where table_name in ('SQLLOADER_TAB','INSERTAPPEND_TAB','INSERTAPPEND_TAB_NO');

OWNER      TABLE_NAME             NUM_ROWS     BLOCKS LAST_ANAL
---------- -------------------- ---------- ---------- ---------
LIN        INSERTAPPEND_TAB_NO
LIN        SQLLOADER_TAB
LIN        INSERTAPPEND_TAB              3          4 11-FEB-20

LIN@pdb1>

>>>>>>> session parameter '_optimizer_gather_stats_on_load' test

LIN@pdb1> drop table insertappend_tab_no purge;

Table dropped.

LIN@pdb1> create table insertappend_tab_no(col1 number, col2 varchar(20));

Table created.

LIN@pdb1> 
LIN@pdb1> alter session set _optimizer_gather_stats_on_load=false;
alter session set _optimizer_gather_stats_on_load=false
                  *
ERROR at line 1:
ORA-00911: invalid character


LIN@pdb1> 
LIN@pdb1> alter session set "_optimizer_gather_stats_on_load"=false;

Session altered.

LIN@pdb1>
LIN@pdb1> select owner,table_name,num_rows,blocks,last_analyzed from dba_tab_statistics where table_name in ('SQLLOADER_TAB','INSERTAPPEND_TAB','INSERTAPPEND_TAB_NO');

OWNER      TABLE_NAME             NUM_ROWS     BLOCKS LAST_ANAL
---------- -------------------- ---------- ---------- ---------
LIN        INSERTAPPEND_TAB_NO
LIN        SQLLOADER_TAB
LIN        INSERTAPPEND_TAB              3          4 11-FEB-20

LIN@pdb1> select table_name,column_name,NOTES from user_tab_col_statistics where table_name in ('INSERTAPPEND_TAB','INSERTAPPEND_TAB_NO');

TABLE_NAME           COLUMN_NAME          NOTES
-------------------- -------------------- --------------------
INSERTAPPEND_TAB     COL1                 STATS_ON_LOAD
INSERTAPPEND_TAB     COL2                 STATS_ON_LOAD

LIN@pdb1>


```



### Reference


MOS

	Script To Generate SQL*Loader Control File (Doc ID 1019523.6)


Have a good work&life! 2020/02 via LinHong


