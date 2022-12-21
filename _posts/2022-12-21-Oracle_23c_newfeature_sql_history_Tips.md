---
layout: post
title: "Oracle 23c New features - SQL_HISTORY_ENABLED Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - SQL_HISTORY_ENABLED Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	


Oracle Database 23c introduces MAX_COLUMNS parameter

Use SQL_HISTORY_ENABLED to enable or disable SQL history monitoring.

To enable SQL history monitoring, set this parameter to ON. This feature monitors user-issued SQL statements in each user session on a best effort, depending on memory capacity. DDL, DML, and query statements are monitored; SQL statements issued in the background and recursive SQL statements are excluded. The monitored information is exposed by the V$SQL_HISTORY dynamic performance view.

To disable SQL history monitoring, set this parameter to OFF.








### SQL_HISTORY_ENABLED

![23c-sql_history_enabled]({{ "/files/Oracle/23c/sql_history_enabled.png"}})

Test:
```
SYS@cdb1> show parameter sql_history

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
sql_history_enabled		     boolean	 FALSE
SYS@cdb1> alter system set sql_history_enabled=true;

System altered.

SYS@cdb1> exit
Disconnected from Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Beta
Version 23.1.0.0.0
[oracle@ol8-23c ~]$ sqlplus / as sysdba

SQL*Plus: Release 23.0.0.0.0 - Beta on Wed Dec 21 13:50:22 2022
Version 23.1.0.0.0

Copyright (c) 1982, 2022, Oracle.  All rights reserved.


Connected to:
Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Beta
Version 23.1.0.0.0

SYS@cdb1> alter session set nls_date_format = 'YYYY-MM-DD HH24:MI:SS';

Session altered.

SYS@cdb1> show parameter sql_history

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
sql_history_enabled		     boolean	 TRUE
SYS@cdb1> 
```

```
SET TERMOUT OFF
COL "SQL_ID"                         FOR A13
COL "ELAPSED_TIME"                   FOR 999999999999
COL "CPU_TIME"                       FOR 99999999
COL "PHYSICAL_READ_BYTES"            FOR 9999999999999999999
COL "USER_IO_WAIT_TIME"              FOR 99999999999999999
COL "SQL_TEXT"                       FOR A100
select sql_id,elapsed_time,cpu_time,physical_read_bytes,user_io_wait_time,sql_text from v$sql_history order by 2;
```

[10.55 V$SQL_HISTORY](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/refrn/V-SQL_HISTORY.html)

![23c-view_sql_history]({{ "/files/Oracle/23c/view_sql_history.png"}})

![23c-TestSQL01]({{ "/files/Oracle/23c/TestSQL01.png"}})



### Reference 

[2.205 MAX_COLUMNS](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/refrn/MAX_COLUMNS.html)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


