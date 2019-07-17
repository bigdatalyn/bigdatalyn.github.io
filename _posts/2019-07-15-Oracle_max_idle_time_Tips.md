---
layout: post
title: "Oracle 12c MAX_IDLE_TIME Tips"
category: Oracle
tags: Oracle MAX_IDLE_TIME Tips
---

* content
{:toc}

Oracle 12c MAX_IDLE_TIME Tips










### MAX_IDLE_TIME

We can set idle time to control the idle sessions from Oracle Database 12.2.

	1. Max_idle_time is new parameter from 12.2.
	2. alter system .... to set the idle time for whole DB(cdb/pdb), NOT for special session. (Can NOT use alter session ...).
	3. max_idle_time's valule is NOT second, it is minuties. So the time is NOT accurate.


### Test

There will be ORA-03113 error while the session has MAX_IDLE_TIME minuties.

	# [ oracle@localhost:/home/oracle [02:49:37] [19.3.0.0.0 [DBMS EE] SID=orcl] 0 ] #
	# sqlplus sys/oracle@localhost:1521/pdb1 as sysdba

	SQL*Plus: Release 19.0.0.0.0 - Production on Wed Jul 17 02:49:51 2019
	Version 19.3.0.0.0

	Copyright (c) 1982, 2019, Oracle.  All rights reserved.


	Connected to:
	Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
	Version 19.3.0.0.0

	SYS@localhost:1521/pdb1> show parameter max_idle_time

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	max_idle_time                        integer     0
	SYS@localhost:1521/pdb1> alter system set max_idle_time=1;

	System altered.

	SYS@localhost:1521/pdb1> show parameter max_idle_time

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	max_idle_time                        integer     1
	SYS@localhost:1521/pdb1> exit
	Disconnected from Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
	Version 19.3.0.0.0

	# [ oracle@localhost:/home/oracle [02:50:36] [19.3.0.0.0 [DBMS EE] SID=orcl] 0 ] #
	# sqlplus soe/Welcome#2019@localhost:1521/PDB1

	SQL*Plus: Release 19.0.0.0.0 - Production on Wed Jul 17 02:50:57 2019
	Version 19.3.0.0.0

	Copyright (c) 1982, 2019, Oracle.  All rights reserved.

	Last Successful login time: Wed Jul 17 2019 02:49:13 +00:00

	Connected to:
	Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
	Version 19.3.0.0.0

	SOE@localhost:1521/PDB1> select * from dual;

	D
	-
	X

	SOE@localhost:1521/PDB1> set time on
	02:51:16 SOE@localhost:1521/PDB1> select * from dual;

	D
	-
	X

	02:51:21 SOE@localhost:1521/PDB1>
	02:51:21 SOE@localhost:1521/PDB1> select * from dual;
	select * from dual
	*
	ERROR at line 1:
	ORA-03113: end-of-file on communication channel
	Process ID: 6417
	Session ID: 237 Serial number: 46791


	02:53:18 SOE@localhost:1521/PDB1>


	
Have a good work&life! 2019/07 via LinHong



