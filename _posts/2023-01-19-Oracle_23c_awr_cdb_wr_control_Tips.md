---
layout: post
title: "Oracle 23c awr_cdb_wr_control Tips"
category: Oracle
tags: Oracle 23c Tips
---

* content
{:toc}

Oracle 23c awr_cdb_wr_control Tips



### awr_cdb_wr_control

Oracle 19.17
```
Oracle Database 19c EE Extreme Perf Release 19.0.0.0.0 - Production
Version 19.17.0.0.0

SQL> desc awr_cdb_wr_control
 Name					   Null?    Type
 ----------------------------------------- -------- ----------------------------
 DBID					   NOT NULL NUMBER
 SNAP_INTERVAL				   NOT NULL INTERVAL DAY(5) TO SECOND(1)
 RETENTION				   NOT NULL INTERVAL DAY(5) TO SECOND(1)
 TOPNSQL					    VARCHAR2(10)
 CON_ID 					    NUMBER
 SRC_DBID					    NUMBER
 SRC_DBNAME					    VARCHAR2(128)

SQL> 
SQL> alter session set container=pdb1;

Session altered.

SQL> select * from awr_cdb_wr_control;

       DBID SNAP_INTERVAL     RETENTION 	TOPNSQL  CON_ID    SRC_DBID SRC_DBNAME
----------- ----------------- ----------------- ------- ------- ----------- ----------
 3121331511 +00000 00:15:00.0 +00008 00:00:00.0 DEFAULT       0  3121331511 CDB$ROOT
  666465291 +00000 00:30:00.0 +00008 00:00:00.0 DEFAULT       3   666465291 PDB1

SQL> 
```

Oracle 23c:
```
Copyright (c) 1982, 2022, Oracle.  All rights reserved.

Connected to:
Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Beta
Version 23.1.0.0.0

SYS@cdb1>
SYS@cdb1> desc awr_cdb_wr_control
 Name					   Null?    Type
 ----------------------------------------- -------- ----------------------------
 DBID					   NOT NULL NUMBER
 SNAP_INTERVAL				   NOT NULL INTERVAL DAY(5) TO SECOND(1)
 RETENTION				   NOT NULL INTERVAL DAY(5) TO SECOND(1)
 TOPNSQL					    VARCHAR2(10)
 CON_ID 					    NUMBER
 SRC_DBID					    NUMBER
 SRC_DBNAME					    VARCHAR2(128)
 TABLESPACE_NAME				    VARCHAR2(128)
 MOST_RECENT_SNAP_TIME				    TIMESTAMP(3)
 MOST_RECENT_PURGE_TIME 			    TIMESTAMP(3)
 MOST_RECENT_SPLIT_ID				    NUMBER
 MOST_RECENT_SPLIT_TIME 			    NUMBER
 STATUS_FLAG					    NUMBER
 REGISTRATION_STATUS				    VARCHAR2(5)
 AUTO_SNAP_SETTING				    VARCHAR2(8)
 EMERGENCY_SNAP_SETTING 			    VARCHAR2(8)

SYS@cdb1> 
SYS@cdb1> alter session set container=pdb1;

Session altered.

SYS@cdb1> 
SYS@cdb1> select * from awr_cdb_wr_control;

       DBID SNAP_INTERVAL     RETENTION 	TOPNSQL  CON_ID    SRC_DBID SRC_DBNAME TABLESPACE_NAME MOST_RECENT_SNAP_TIME	 MOST_RECENT_PURGE_TIME     MOST_RECENT_SPLIT_ID  MOST_RECENT_SPLIT_TIME  STATUS_FLAG REGISTRATION_STATUS AUTO_SNAP_SETTING EMERGENCY_SNAP_SETTING
----------- ----------------- ----------------- ------- ------- ----------- ---------- --------------- ------------------------- ------------------------- --------------------- ----------------------- ------------ ------------------- ----------------- ----------------------
 2616168235 +00000 00:30:00.0 +00008 00:00:00.0 DEFAULT       3  2616168235 PDB1       PDB1_AWR        19-JAN-23 06.29.23.255 PM 18-JAN-23 11.31.55.245 AM		     601	      1674092000	    2 OK		  ENABLED	    DISABLED
 1093239018 +00000 00:15:00.0 +00008 00:00:00.0 DEFAULT       0  1093239018 CDB$ROOT   SYSAUX	       19-JAN-23 06.45.27.315 PM 19-JAN-23 04.18.01.022 PM		     600	      1674093047	    2 OK		  ENABLED	    DISABLED

SYS@cdb1> 
```



### Reference 

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


