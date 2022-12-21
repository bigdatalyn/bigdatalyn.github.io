---
layout: post
title: "Oracle 23c export table data to csv via sql Tips"
category: Oracle
tags: Oracle 23c Tips
---

* content
{:toc}

Oracle 23c export table data to csv via sql Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	







### Export data to csv via sql

[How to unload table data to csv file - fastest way for millions of records](https://asktom.oracle.com/pls/apex/f?p=100:11:0::::P11_QUESTION_ID:9536328100346697722)

```
You can take advantage of the CSV sql format in SQLcl to pump your data out in that format. And use a parallel hint to have many processes running your query. Then you just need to spool the output:
```

```
[oracle@ol8-23c ~]$ source .bash_profile
[oracle@ol8-23c ~]$ echo $ORACLE_HOME
/u01/app/oracle/product/23.0.0/dbhome_1
[oracle@ol8-23c ~]$ cat 1.sql 
set term off
set feed off
set sqlformat csv
spool out.csv
select /*+ parallel(2) */* from t1 where rownum < 100;
spool off
exit
[oracle@ol8-23c ~]$ cat exp01.sh 
#!/bin/bash

CONN_STR="hong/oracle@pdb1"
$ORACLE_HOME/sqldeveloper/sqldeveloper/bin/sql $CONN_STR @/home/oracle/1.sql

exit 0
[oracle@ol8-23c ~]$ nohup sh exp01.sh &
[1] 120207
[oracle@ol8-23c ~]$ nohup: ignoring input and appending output to 'nohup.out'
[oracle@ol8-23c ~]$ 
[1]+  Done                    nohup sh exp01.sh
[oracle@ol8-23c ~]$
```


[Parallel PL/SQL with DBMS_PARALLEL_EXECUTE](https://seanstuber.com/2013/10/17/parallel-plsql-with-dbms_parallel_execute/)


### How to export a table into CSV file (Doc ID 1940784.1)	

To export a table to CSV you will need to use sqldeveloper , OR spool output to csv or use 3rd party like Excel-DB

SQL script example :
```
set colsep ,     -- separate columns with a comma
set pagesize 0   -- No header rows
set trimspool on -- remove trailing blanks
set headsep off  -- this may or may not be useful...depends on your headings.
set linesize X   -- X should be the sum of the column widths
set numw X       -- X should be the length you want for numbers (avoid scientific notation on IDs)

spool myfile.csv

select table_name, tablespace_name
from all_tables
where owner = 'SYS'
 and tablespace_name is not null;
spool Off;
```

### SET MARKUP CSV ON

[7.1.2 Creating CSV Reports](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqpug/generating-HTML-reports-from-SQL-Plus.html)

```
set markup csv on
spool filename.csv
select * from <tablename>
spool off
```

### sqldevelop

[Formatting Query Results to CSV in Oracle SQL Developer](https://www.thatjeffsmith.com/archive/2012/05/formatting-query-results-to-csv-in-oracle-sql-developer/)

```
SELECT /*csv*/ * FROM scott.emp;
SELECT /*xml*/ * FROM scott.emp;
SELECT /*html*/ * FROM scott.emp;
SELECT /*delimited*/ * FROM scott.emp;
SELECT /*insert*/ * FROM scott.emp;
SELECT /*loader*/ * FROM scott.emp;
SELECT /*fixed*/ * FROM scott.emp;
SELECT /*text*/ * FROM scott.emp;
```
sqlci

[Oracle SQLcl Release 22.4](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/22.4/index.html)

```
SET sqlformat csv
 
SELECT * FROM scott.emp;
```

```
[oracle@ol8-23c ~]$ which sql
/u01/app/oracle/product/23.0.0/dbhome_1/bin/sql
[oracle@ol8-23c ~]$ sql hong/oracle@pdb1


SQLcl: Release 21.4 Production on Wed Dec 21 11:46:12 2022

Copyright (c) 1982, 2022, Oracle.  All rights reserved.

Last Successful login time: Wed Dec 21 2022 11:46:13 +08:00

Connected to:
Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Beta
Version 23.1.0.0.0

HONG@pdb1> alter session set nls_date_format = 'YYYY-MM-DD HH24:MI:SS';

Session altered.

HONG@pdb1> SET EDITFILE .sqlplus.buf
HONG@pdb1> SET NULL "<n>"
HONG@pdb1> SET TIMING ON
HONG@pdb1> SET TIME ON
11:46:13 HONG@pdb1> SET TRIMSPOOL ON
11:46:14 HONG@pdb1> SET FEEDBACK 1
11:46:14 HONG@pdb1> SET TAB OFF
11:46:14 HONG@pdb1> select /*csv*/ * from t1 where rownum <10;

"OWNER","OBJECT_NAME","SUBOBJECT_NAME","OBJECT_ID","DATA_OBJECT_ID","OBJECT_TYPE","CREATED","LAST_DDL_TIME","TIMESTAMP","STATUS","TEMPORARY","GENERATED","SECONDARY","NAMESPACE","EDITION_NAME","SHARING","EDITIONABLE","ORACLE_MAINTAINED","APPLICATION","DEFAULT_COLLATION","DUPLICATED","SHARDED","IMPORTED_OBJECT","SYNCHRONOUS_DUPLICATED","CREATED_APPID","CREATED_VSNID","MODIFIED_APPID","MODIFIED_VSNID"
"SYS","I_FILE#_BLOCK#",<n>,9,9,"INDEX",2022-10-07 08:17:38,2022-10-07 08:17:38,"2022-10-07:08:17:38","VALID","N","N","N",4,<n>,"NONE",<n>,"Y","N",<n>,"N","N","N","N",<n>,<n>,<n>,<n>
"SYS","I_OBJ3",<n>,38,38,"INDEX",2022-10-07 08:17:38,2022-10-07 08:17:38,"2022-10-07:08:17:38","VALID","N","N","N",4,<n>,"NONE",<n>,"Y","N",<n>,"N","N","N","N",<n>,<n>,<n>,<n>
"SYS","I_TS1",<n>,45,45,"INDEX",2022-10-07 08:17:38,2022-10-07 08:17:38,"2022-10-07:08:17:38","VALID","N","N","N",4,<n>,"NONE",<n>,"Y","N",<n>,"N","N","N","N",<n>,<n>,<n>,<n>
"SYS","I_CON1",<n>,51,51,"INDEX",2022-10-07 08:17:38,2022-10-07 08:17:38,"2022-10-07:08:17:38","VALID","N","N","N",4,<n>,"NONE",<n>,"Y","N",<n>,"N","N","N","N",<n>,<n>,<n>,<n>
"SYS","IND$",<n>,19,2,"TABLE",2022-10-07 08:17:38,2022-10-07 09:29:31,"2022-10-07:08:17:38","VALID","N","N","N",1,<n>,"METADATA LINK",<n>,"Y","N","USING_NLS_COMP","N","N","N","N",<n>,<n>,<n>,<n>
"SYS","CDEF$",<n>,31,29,"TABLE",2022-10-07 08:17:38,2022-10-07 09:29:31,"2022-10-07:08:17:38","VALID","N","N","N",1,<n>,"METADATA LINK",<n>,"Y","N","USING_NLS_COMP","N","N","N","N",<n>,<n>,<n>,<n>
"SYS","C_TS#",<n>,6,6,"CLUSTER",2022-10-07 08:17:38,2022-10-07 08:17:38,"2022-10-07:08:17:38","VALID","N","N","N",5,<n>,"METADATA LINK",<n>,"Y","N",<n>,"N","N","N","N",<n>,<n>,<n>,<n>
"SYS","I_CCOL2",<n>,58,58,"INDEX",2022-10-07 08:17:38,2022-10-07 08:17:38,"2022-10-07:08:17:38","VALID","N","N","N",4,<n>,"NONE",<n>,"Y","N",<n>,"N","N","N","N",<n>,<n>,<n>,<n>
"SYS","I_PROXY_DATA$",<n>,24,24,"INDEX",2022-10-07 08:17:38,2022-10-07 08:17:38,"2022-10-07:08:17:38","VALID","N","N","N",4,<n>,"NONE",<n>,"Y","N",<n>,"N","N","N","N",<n>,<n>,<n>,<n>

9 rows selected. 

Elapsed: 00:00:00.160
11:46:30 HONG@pdb1> 
```

### Reference 

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


