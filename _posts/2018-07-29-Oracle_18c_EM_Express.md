---
layout: post
title: "Oracle 12c pdbseed Tips"
category: Oracle
tags: Oracle 12c
---

* content
{:toc}



Oracle 18c EM Express Tips















### Set the port and check the parameter settion.

It shoud be correct for the listener before you set the port.

	SYS@PRODCDB1> select dbms_xdb_config.gethttpport() from dual;

	DBMS_XDB_CONFIG.GETHTTPPORT()
	-----------------------------
								0

	SYS@PRODCDB1> exec DBMS_XDB_CONFIG.SETHTTPPORT(2200);

	PL/SQL procedure successfully completed.

	SYS@PRODCDB1> exec DBMS_XDB_CONFIG.SETHTTPSPORT(5500);

	PL/SQL procedure successfully completed.

	SYS@PRODCDB1> select dbms_xdb_config.gethttpport() from dual;

	DBMS_XDB_CONFIG.GETHTTPPORT()
	-----------------------------
							 2200

	SYS@PRODCDB1> select dbms_xdb_config.gethttpsport() from dual;

	DBMS_XDB_CONFIG.GETHTTPSPORT()
	------------------------------
							  5500

	SYS@PRODCDB1> 
	SYS@PRODCDB1> desc resource_view
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 RES                                                XMLTYPE(XMLSchema "http://xm
														lns.oracle.com/xdb/XDBResour
														ce.xsd" Element "Resource")
	 ANY_PATH                                           VARCHAR2(4000)
	 RESID                                              RAW(16)

	SYS@PRODCDB1> select comp_name, version, status from dba_registry where comp_id = 'XDB';

	COMP_NAME
	--------------------------------------------------------------------------------
	VERSION                        STATUS
	------------------------------ --------------------------------------------
	Oracle XML Database
	18.0.0.0.0                     VALID


	SYS@PRODCDB1> select owner, object_name, object_type, status from dba_objects where status = 'INVALID' and owner in ('SYS', 'XDB');

	no rows selected

	SYS@PRODCDB1> 

	SYS@PRODCDB1> show parameter shared_servers

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	max_shared_servers                   integer
	shared_servers                       integer     1
	SYS@PRODCDB1> show parameter dispatchers

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	dispatchers                          string      (PROTOCOL=TCP) (SERVICE=PRODCD
													 B1XDB)
	max_dispatchers                      integer
	SYS@PRODCDB1> 

	SYS@PRODCDB1> set pagesize 1000
	SYS@PRODCDB1> select USERNAME,NAME,ACCOUNT_STATUS,LOCK_DATE from cdb_users u,v$containers c where u.CON_ID=c.CON_ID and USERNAME ='SYSTEM' ;

	USERNAME
	--------------------------------------------------------------------------------
	NAME
	--------------------------------------------------------------------------------
	ACCOUNT_STATUS                   LOCK_DATE
	-------------------------------- ---------
	SYSTEM
	PDB1
	OPEN

	SYSTEM
	CDB$ROOT
	OPEN


	SYS@PRODCDB1> 

	
	
### Login

Use the following link.

	SYS@PRODCDB1> SELECT 'https://'||SYS_CONTEXT('USERENV','SERVER_HOST')||':'||dbms_xdb_config.gethttpsport()||'/em/' from dual;

	'HTTPS://'||SYS_CONTEXT('USERENV','SERVER_HOST')||':'||DBMS_XDB_CONFIG.GETHTTPSP
	--------------------------------------------------------------------------------
	https://vedb:5500/em/

	SYS@PRODCDB1> 
	SYS@PRODCDB1> !lsnrctl status

	LSNRCTL for Linux: Version 18.0.0.0.0 - Production on 03-AUG-2018 04:32:37

	Copyright (c) 1991, 2018, Oracle.  All rights reserved.

	Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=vedb.localdomain)(PORT=1521)))
	STATUS of the LISTENER
	------------------------
	Alias                     LISTENER
	Version                   TNSLSNR for Linux: Version 18.0.0.0.0 - Production
	Start Date                03-AUG-2018 04:23:15
	Uptime                    0 days 0 hr. 9 min. 22 sec
	Trace Level               off
	Security                  ON: Local OS Authentication
	SNMP                      OFF
	Listener Parameter File   /u02/app/oracle/product/18.0.0/dbhome_1/network/admin/listener.ora
	Listener Log File         /u02/app/oracle/diag/tnslsnr/vedb/listener/alert/log.xml
	Listening Endpoints Summary...
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=vedb.localdomain)(PORT=1521)))
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1521)))
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcps)(HOST=vedb.localdomain)(PORT=5500))(Security=(my_wallet_directory=/u02/app/oracle/admin/PRODCDB1/xdb_wallet))(Presentation=HTTP)(Session=RAW))
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=vedb.localdomain)(PORT=2200))(Presentation=HTTP)(Session=RAW))
	Services Summary...
	Service "71d0d407a00a472ae0536538a8c0bb43" has 1 instance(s).
	  Instance "PRODCDB1", status READY, has 1 handler(s) for this service...
	Service "PRODCDB1" has 1 instance(s).
	  Instance "PRODCDB1", status READY, has 1 handler(s) for this service...
	Service "PRODCDB1XDB" has 1 instance(s).
	  Instance "PRODCDB1", status READY, has 1 handler(s) for this service...
	Service "pdb1" has 1 instance(s).
	  Instance "PRODCDB1", status READY, has 1 handler(s) for this service...
	The command completed successfully

	SYS@PRODCDB1> 
	
Test: https://127.0.0.1:5500/em/login

	Advanced/Add Exception.../Confirm Security Exception


![Step01]({{ "/files/Oracle/18c/EM_Express/001_Express.png"}})		

Tips:

	Do not provide the container name in "Container Name" field while logging in. This would allow you to connect to the EM Express console.
	Otherwise, there will be an error for the logging.
	
![Step02]({{ "/files/Oracle/18c/EM_Express/002_Express.png"}})	
	


![Step03]({{ "/files/Oracle/18c/EM_Express/003_Express.png"}})			
	
Tips:

	Do not provide the container name in "Container Name" field while logging in. This would allow you to connect to the EM Express console.

	
	
	
Useful documents.	
	
	Troubleshooting Why EM Express is not Working (Doc ID 1604062.1)
	https://support.oracle.com/epmos/faces/DocumentDisplay?id=1604062.1



To be continue....

Have a good life! 2018/07 via LinHong


