---
layout: post
title: "Oracle 23c New features - MAX_COLUMNS Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - MAX_COLUMNS Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	


Oracle Database 23c introduces MAX_COLUMNS parameter

Increase Column Limit
The maximum number of columns allowed in a database table or view has been increased to 4096. This feature allows you to build applications that can store attributes in a single table with more than the previous 1000-column limit. Some applications, such as Machine Learning and streaming IoT application workloads, may require the use of de-normalized tables with more than 1000 columns.











### MAX_COLUMNS

![23c-max_columns]({{ "/files/Oracle/23c/max_columns.png"}})

When this parameter is set to STANDARD, the maximum number of columns allowed in a database table or view is 1000.

When this parameter is set to EXTENDED, the maximum number of columns allowed in a database table or view is 4096.

The COMPATIBLE initialization parameter must be set to 23.0.0.0 or higher to set MAX_COLUMNS = EXTENDED.

You can change the value of MAX_COLUMNS from STANDARD to EXTENDED at any time. However, you can change the value of MAX_COLUMNS from EXTENDED to STANDARD only when all tables and views in the database have 1000 or fewer columns.

### Test in 23c

Prepare 1001/4097 columns table sql as following.
```
tab_name="t1000.sql"
echo "create table t1000(" > $tab_name
for i in `seq -w 0999`; do
echo col$i int, >> $tab_name
done
echo "col1000 int" >> $tab_name
echo ");" >> $tab_name
echo "exit" >> $tab_name

tab_name="t1001.sql"
echo "create table t1001(" > $tab_name
for i in `seq -w 1000`; do
echo col$i int, >> $tab_name
done
echo "col1001 int" >> $tab_name
echo ");" >> $tab_name
echo "exit" >> $tab_name


tab_name="t4096.sql"
echo "create table t4096(" > $tab_name
for i in `seq -w 4095`; do
echo col$i int, >> $tab_name
done
echo "col4096 int" >> $tab_name
echo ");" >> $tab_name
echo "exit" >> $tab_name

tab_name="t4097.sql"
echo "create table t4097(" > $tab_name
for i in `seq -w 4096`; do
echo col$i int, >> $tab_name
done
echo "col4097 int" >> $tab_name
echo ");" >> $tab_name
echo "exit" >> $tab_name
```

Default : STANDARD
```
SYS@cdb1> show parameter max_col

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
max_columns			     string	 STANDARD
SYS@cdb1> 
```
![23c-tab_col_1001]({{ "/files/Oracle/23c/tab_col_1001.png"}})

Change to `EXTENDED` and test.
```
SYS@cdb1> show parameter max_col

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
max_columns			     string	 STANDARD
SYS@cdb1> 
SYS@cdb1> alter system set max_columns=ext scope=spfile;
alter system set max_columns=ext scope=spfile
*
ERROR at line 1:
ORA-00096: invalid value EXT for parameter max_columns, must be from among
EXTENDED, STANDARD

SYS@cdb1> alter system set max_columns=EXTENDED scope=both;

System altered.

SYS@cdb1> show parameter max_col

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
max_columns			     string	 EXTENDED
SYS@cdb1> 

[oracle@ol8-23c ~]$ sqlplus hong/oracle@pdb1 @t1001.sql

ERROR at line 1002:
ORA-01792: maximum number of columns in a table or view is 1000
HONG@pdb1>

--> Should restart instance.

SYS@cdb1> shu immediate;
Database closed.
Database dismounted.
ORACLE instance shut down.
SYS@cdb1> startup
ORACLE instance started.

Total System Global Area 1595830552 bytes
Fixed Size		    9916696 bytes
Variable Size		  989855744 bytes
Database Buffers	  587202560 bytes
Redo Buffers		    8855552 bytes
Database mounted.
Database opened.
SYS@cdb1> show parameter max_col

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
max_columns			     string	 EXTENDED
SYS@cdb1> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 PDB1 			  READ WRITE NO
	 5 PDB2 			  READ WRITE NO
SYS@cdb1> alter session set container=pdb1;

Session altered.

SYS@cdb1> show parameter max_col

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
max_columns			     string	 EXTENDED
SYS@cdb1> 


[oracle@ol8-23c ~]$ sqlplus hong/oracle@pdb1 @t1001.sql
~
1000  col0999 int,
1001  col1000 int,
1002  col1001 int
1003  );

Table created.

HONG@pdb1> exit
Disconnected from Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Beta
Version 23.1.0.0.0
[oracle@ol8-23c ~]$ 

[oracle@ol8-23c ~]$ sqlplus hong/oracle@pdb1 @t4096.sql
~
4095  col4094 int,
4096  col4095 int,
4097  col4096 int
4098  );

Table created.

HONG@pdb1> exit
Disconnected from Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Beta
Version 23.1.0.0.0
[oracle@ol8-23c ~]$ 

[oracle@ol8-23c ~]$ sqlplus hong/oracle@pdb1 @t4097.sql
~
4097  col4096 int,
4098  col4097 int
4099  );
create table t4097(
*
ERROR at line 1:
ORA-01792: maximum number of columns in a table or view is 4096

HONG@pdb1> exit
Disconnected from Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Beta
Version 23.1.0.0.0
[oracle@ol8-23c ~]$ 
```
![23c-tab_col_4097]({{ "/files/Oracle/23c/tab_col_4097.png"}})

### PDB level

PDB1:EXTENDED
PDB2:STANDARD
```
SYS@cdb1> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 PDB1 			  READ WRITE NO
	 5 PDB2 			  READ WRITE NO
SYS@cdb1> alter session set container=pdb1;

Session altered.

SYS@cdb1> show parameter max_col

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
max_columns			     string	 EXTENDED
SYS@cdb1> alter session set container=pdb2;

Session altered.

SYS@cdb1> show parameter max_col

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
max_columns			     string	 EXTENDED
SYS@cdb1> alter system set max_columns=STANDARD;

System altered.

SYS@cdb1> show parameter max_col

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
max_columns			     string	 STANDARD

SYS@cdb1> alter session set container=pdb1;

Session altered.

SYS@cdb1> show parameter max_col

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
max_columns			     string	 EXTENDED
SYS@cdb1> 
```

```
SYS@cdb1> create user c##hong identified by oracle container=all;

User created.

SYS@cdb1> grant create session,connect,resource to c##hong container=all;

Grant succeeded.

SYS@cdb1> 

OK:
[oracle@ol8-23c ~]$ sqlplus c##hong/oracle@pdb1 @t1001.sql

NG:
[oracle@ol8-23c ~]$ sqlplus c##hong/oracle@pdb2 @t1001.sql
```

### Reference 

[2.205 MAX_COLUMNS](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/refrn/MAX_COLUMNS.html)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


