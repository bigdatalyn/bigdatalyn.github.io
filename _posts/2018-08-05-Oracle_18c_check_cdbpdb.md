---
layout: post
title: "Oracle 18c check cdb/pdb Tips"
category: Oracle
tags: Oracle 18c
---

* content
{:toc}



Oracle 18c check cdb/pdb Tips










Some sql for checking cdb/pdbs are the following.


	[oracle@database18c ~]$ . oraenv
	ORACLE_SID = [PRODCDB] ? PRODCDB
	The Oracle base remains unchanged with value /u01/app/oracle
	[oracle@database18c ~]$ sqlplus / as sysdba

	SQL*Plus: Release 18.0.0.0.0 - Production on Tue Aug 5 05:50:38 2018
	Version 18.3.0.0.0

	Copyright (c) 1982, 2018, Oracle.  All rights reserved.


	Connected to:
	Oracle Database 18c Enterprise Edition Release 18.0.0.0.0 - Production
	Version 18.3.0.0.0

	SQL> select name,cdb,con_id from v$database;

	NAME      CDB     CON_ID
	--------- --- ----------
	PRODCDB   YES          0

	SQL> select instance_name, status, con_id from v$instance;

	INSTANCE_NAME    STATUS           CON_ID
	---------------- ------------ ----------
	PRODCDB          OPEN                  0

	SQL> 
	SQL> !lsnrctl status

	LSNRCTL for Linux: Version 18.0.0.0.0 - Production on 07-AUG-2018 05:54:56

	Copyright (c) 1991, 2018, Oracle.  All rights reserved.

	Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=database18c)(PORT=1521)))
	STATUS of the LISTENER
	------------------------
	Alias                     LISTENER
	Version                   TNSLSNR for Linux: Version 18.0.0.0.0 - Production
	Start Date                07-AUG-2018 05:52:42
	Uptime                    0 days 0 hr. 2 min. 14 sec
	Trace Level               off
	Security                  ON: Local OS Authentication
	SNMP                      OFF
	Listener Parameter File   /u01/app/oracle/product/18.3.0/dbhome_1/network/admin/listener.ora
	Listener Log File         /u01/app/oracle/diag/tnslsnr/database18c/listener/alert/log.xml
	Listening Endpoints Summary...
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=database18c)(PORT=1521)))
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1521)))
	Services Summary...
	Service "72c5e38ff8194667e0530100007ff4b4" has 1 instance(s).
	  Instance "PRODCDB", status READY, has 1 handler(s) for this service...
	Service "PRODCDB" has 1 instance(s).
	  Instance "PRODCDB", status READY, has 1 handler(s) for this service...
	Service "PRODCDBXDB" has 1 instance(s).
	  Instance "PRODCDB", status READY, has 1 handler(s) for this service...
	Service "pdb1" has 1 instance(s).
	  Instance "PRODCDB", status READY, has 1 handler(s) for this service...
	The command completed successfully

	SQL> !lsnrctl services

	LSNRCTL for Linux: Version 18.0.0.0.0 - Production on 07-AUG-2018 05:54:59

	Copyright (c) 1991, 2018, Oracle.  All rights reserved.

	Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=database18c)(PORT=1521)))
	Services Summary...
	Service "72c5e38ff8194667e0530100007ff4b4" has 1 instance(s).
	  Instance "PRODCDB", status READY, has 1 handler(s) for this service...
		Handler(s):
		  "DEDICATED" established:0 refused:0 state:ready
			 LOCAL SERVER
	Service "PRODCDB" has 1 instance(s).
	  Instance "PRODCDB", status READY, has 1 handler(s) for this service...
		Handler(s):
		  "DEDICATED" established:0 refused:0 state:ready
			 LOCAL SERVER
	Service "PRODCDBXDB" has 1 instance(s).
	  Instance "PRODCDB", status READY, has 1 handler(s) for this service...
		Handler(s):
		  "D000" established:0 refused:0 current:0 max:1022 state:ready
			 DISPATCHER <machine: database18c, pid: 12792>
			 (ADDRESS=(PROTOCOL=tcp)(HOST=database18c)(PORT=11127))
	Service "pdb1" has 1 instance(s).
	  Instance "PRODCDB", status READY, has 1 handler(s) for this service...
		Handler(s):
		  "DEDICATED" established:0 refused:0 state:ready
			 LOCAL SERVER
	The command completed successfully

	SQL> 
	SQL> select name,con_id from v$services;

	NAME                                                                 CON_ID
	---------------------------------------------------------------- ----------
	PRODCDB                                                                   1
	SYS$BACKGROUND                                                            1
	SYS$USERS                                                                 1
	pdb1                                                                      3
	PRODCDBXDB                                                                1

	SQL> show pdbs;

		CON_ID CON_NAME                       OPEN MODE  RESTRICTED
	---------- ------------------------------ ---------- ----------
			 2 PDB$SEED                       READ ONLY  NO
			 3 PDB1                           MOUNTED
	SQL> show con_name

	CON_NAME
	------------------------------
	CDB$ROOT
	SQL> show con_id

	CON_ID
	------------------------------
	1
	SQL> 

Use sys_context to list the env.

	SYS@PRODCDB> select sys_context('userenv','con_name') from dual;

	SYS_CONTEXT('USERENV','CON_NAME')
	--------------------------------------------------------------------------------
	CDB$ROOT

	SYS@PRODCDB> select sys_context('userenv','con_id') from dual;

	SYS_CONTEXT('USERENV','CON_ID')
	--------------------------------------------------------------------------------
	1

	SYS@PRODCDB> 

Others sql.

	SYS@PRODCDB> col pdb_name for a10
	SYS@PRODCDB> select pdb_id,pdb_name,dbid,con_id from cdb_pdbs;

		PDB_ID PDB_NAME         DBID     CON_ID
	---------- ---------- ---------- ----------
			 3 PDB1        276918485          3
			 2 PDB$SEED    821946563          2

	SYS@PRODCDB> 


	SYS@PRODCDB> col member for a50
	SYS@PRODCDB> select group#,con_id,member from v$logfile;

		GROUP#     CON_ID MEMBER
	---------- ---------- --------------------------------------------------
			 3          0 /u01/app/oracle/oradata/PRODCDB/redo03.log
			 2          0 /u01/app/oracle/oradata/PRODCDB/redo02.log
			 1          0 /u01/app/oracle/oradata/PRODCDB/redo01.log

	SYS@PRODCDB> 
	
	SYS@PRODCDB> col name for a50
	SYS@PRODCDB> select name,con_id from v$controlfile;

	NAME                                                   CON_ID
	-------------------------------------------------- ----------
	/u01/app/oracle/oradata/PRODCDB/control01.ctl               0
	/u01/app/oracle/oradata/PRODCDB/control02.ctl               0

	SYS@PRODCDB> 
	
	SYS@PRODCDB> set linesize 1000
	SYS@PRODCDB> set pagesize 1000
	SYS@PRODCDB> col file_name for a50
	SYS@PRODCDB> select file_name,tablespace_name,con_id from cdb_data_files order by con_id;

	FILE_NAME                                          TABLESPACE_NAME                    CON_ID
	-------------------------------------------------- ------------------------------ ----------
	/u01/app/oracle/oradata/PRODCDB/system01.dbf       SYSTEM                                  1
	/u01/app/oracle/oradata/PRODCDB/users01.dbf        USERS                                   1
	/u01/app/oracle/oradata/PRODCDB/undotbs01.dbf      UNDOTBS1                                1
	/u01/app/oracle/oradata/PRODCDB/sysaux01.dbf       SYSAUX                                  1
	/u01/app/oracle/oradata/PRODCDB/PDB1/system01.dbf  SYSTEM                                  3
	/u01/app/oracle/oradata/PRODCDB/PDB1/users01.dbf   USERS                                   3
	/u01/app/oracle/oradata/PRODCDB/PDB1/undotbs01.dbf UNDOTBS1                                3
	/u01/app/oracle/oradata/PRODCDB/PDB1/sysaux01.dbf  SYSAUX                                  3

	8 rows selected.

	SYS@PRODCDB> 
	
	
	SYS@PRODCDB> col con_id for a10
	SYS@PRODCDB> select username,common,con_id from cdb_users where username = 'SYSTEM';

	USERNAME                                                                                          COM      CON_ID
	-------------------------------------------------------------------------------------------------------------------------------- --- ----------
	SYSTEM                                                                                            YES ##########
	SYSTEM                                                                                            YES ##########

	SYS@PRODCDB> 
	
	SYS@PRODCDB> select username,con_id from cdb_users where common='NO';

	USERNAME            CON_ID
	--------------- ----------
	PDBADMIN                 3
	HR                       3

	SYS@PRODCDB> 
	
	SYS@PRODCDB> select cdb from v$database;

	CDB
	---
	YES

	SYS@PRODCDB> 
	SYS@PRODCDB> select name,con_id from v$datafile order by 2;

	NAME                                                             CON_ID
	------------------------------------------------------------ ----------
	/u01/app/oracle/oradata/PRODCDB/system01.dbf                          1
	/u01/app/oracle/oradata/PRODCDB/sysaux01.dbf                          1
	/u01/app/oracle/oradata/PRODCDB/undotbs01.dbf                         1
	/u01/app/oracle/oradata/PRODCDB/users01.dbf                           1
	/u01/app/oracle/oradata/PRODCDB/pdbseed/sysaux01.dbf                  2
	/u01/app/oracle/oradata/PRODCDB/pdbseed/undotbs01.dbf                 2
	/u01/app/oracle/oradata/PRODCDB/pdbseed/system01.dbf                  2
	/u01/app/oracle/oradata/PRODCDB/PDB1/users01.dbf                      3
	/u01/app/oracle/oradata/PRODCDB/PDB1/system01.dbf                     3
	/u01/app/oracle/oradata/PRODCDB/PDB1/sysaux01.dbf                     3
	/u01/app/oracle/oradata/PRODCDB/PDB1/undotbs01.dbf                    3

	11 rows selected.

	SYS@PRODCDB> 
	
	
	
DBCA create Database

![dbca]({{ "/files/Oracle/18c/dbca_createDB.png"}})			
	
	
To be continue....

Have a good life! 2018/08 via LinHong


