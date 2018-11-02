---
layout: post
title: "Oracle 12c Dataguard Error RMAN-05609 Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle 12c Dataguard Error RMAN-05609 Tips









#### Error

	[oracle@host01 ~]$ export ORACLE_SID=PRODEM
	[oracle@host01 ~]$ rman target / auxiliary sys/oracle@PRODEMSB

	Recovery Manager: Release 12.1.0.2.0 - Production on Fri Nov 2 16:58:31 2018

	Copyright (c) 1982, 2014, Oracle and/or its affiliates.  All rights reserved.

	connected to target database: PRODEM (DBID=1606298904)
	connected to auxiliary database: PRODEM (not mounted)

	RMAN> duplicate database for standby from active database;

	Starting Duplicate Db at 02-NOV-18
	RMAN-00571: ===========================================================
	RMAN-00569: =============== ERROR MESSAGE STACK FOLLOWS ===============
	RMAN-00571: ===========================================================
	RMAN-03002: failure of Duplicate Db command at 11/02/2018 16:58:49
	RMAN-05501: aborting duplication of target database
	RMAN-05609: Must specify a username for target connection when using active duplicate

	RMAN> 

#### Solution

	[oracle@host01 ~]$ rman target sys/oracle@PRODEMPR auxiliary sys/oracle@PRODEMSB

	Recovery Manager: Release 12.1.0.2.0 - Production on Fri Nov 2 17:15:08 2018

	Copyright (c) 1982, 2014, Oracle and/or its affiliates.  All rights reserved.

	connected to target database: PRODEM (DBID=1606298904)
	connected to auxiliary database: PRODEM (not mounted)

	RMAN> duplicate database for standby from active database;

	Starting Duplicate Db at 02-NOV-18
	using target database control file instead of recovery catalog
	......
	
#### Reference

Active Duplicate Using Wallet in 12c fails with Error RMAN-05609 (Doc ID 2125325.1)	

	This issue seen in 12c is a Bug :

	Unpublished Bug 20617383: IN 12C ACTIVE DUPLICATE WITH WALLET AUTHENTICATION FAILS WITH RMAN-05609

#### Other Error:RMAN-05501

	sql statement: alter database mount standby database
	RMAN-00571: ===========================================================
	RMAN-00569: =============== ERROR MESSAGE STACK FOLLOWS ===============
	RMAN-00571: ===========================================================
	RMAN-03002: failure of Duplicate Db command at 11/02/2018 17:15:37
	RMAN-05501: aborting duplication of target database
	RMAN-05001: auxiliary file name /u01/app/oracle/oradata/PRODEM/users01.dbf conflicts with a file used by the target database
	RMAN-05001: auxiliary file name /u01/app/oracle/oradata/PRODEM/example01.dbf conflicts with a file used by the target database
	RMAN-05001: auxiliary file name /u01/app/oracle/oradata/PRODEM/undotbs01.dbf conflicts with a file used by the target database
	RMAN-05001: auxiliary file name /u01/app/oracle/oradata/PRODEM/sysaux01.dbf conflicts with a file used by the target database
	RMAN-05001: auxiliary file name /u01/app/oracle/oradata/PRODEM/system01.dbf conflicts with a file used by the target database

If you want to use the same directory for primary and standby database, you need to use 'nofilenamecheck' in duplicate database command.

	RMAN> DUPLICATE TARGET DATABASE FOR STANDBY  FROM ACTIVE DATABASE NOFILENAMECHECK;

	
	
Have a good work&life! 2018/11 via LinHong



