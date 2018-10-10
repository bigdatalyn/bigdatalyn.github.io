---
layout: post
title: "Oracle 12c - How to create new service name for PDB?"
category: Oracle
tags: Oracle 12c Service name
---

* content
{:toc}


Oracle 12c - How to create new service name for PDB?

We can use service_names to name or add service for database.

However we can NOT use service_names to name or add service for PDB container.
So How to create new service name for PDB?

	SYS> show parameter service_name

	NAME				     TYPE	 VALUE
	------------------------------------ ----------- ------------------------------
	service_names			     string	 PROD.example.com
	SYS> 
-










### Showing the Services Associated with PDBs

	SYS@PRODCDB> select service_id,name,pdb,con_id from cdb_services order by con_id;

	SERVICE_ID NAME 		PDB			 CON_ID
	---------- -------------------- -------------------- ----------
		 1 SYS$BACKGROUND	CDB$ROOT		      1
		 4 PRODCDB		CDB$ROOT		      1
		 3 PRODCDBXDB		CDB$ROOT		      1
		 2 SYS$USERS		CDB$ROOT		      1
		 6 pdbprod1.example.com PDBPROD1		      3
		 7 pdbprod2.example.com PDBPROD2		      4
		 8 pdbprod3.example.com PDBPROD3		      5

	7 rows selected.

	SYS@PRODCDB>

### Creating a Service for a PDB

We can use pacakge#dbms_service to create another service for pdb.

	SYS@PRODCDB> desc dbms_service
	PROCEDURE CREATE_SERVICE
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 SERVICE_NAME			VARCHAR2		IN
	 NETWORK_NAME			VARCHAR2		IN
	 PARAMETER_ARRAY		TABLE OF VARCHAR2(100)	IN
	PROCEDURE CREATE_SERVICE
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 SERVICE_NAME			VARCHAR2		IN
	 NETWORK_NAME			VARCHAR2		IN
	 GOAL				NUMBER			IN     DEFAULT
	 DTP				BOOLEAN 		IN     DEFAULT
	 AQ_HA_NOTIFICATIONS		BOOLEAN 		IN     DEFAULT
	 FAILOVER_METHOD		VARCHAR2		IN     DEFAULT
	 FAILOVER_TYPE			VARCHAR2		IN     DEFAULT
	 FAILOVER_RETRIES		NUMBER			IN     DEFAULT
	 FAILOVER_DELAY 		NUMBER			IN     DEFAULT
	 CLB_GOAL			NUMBER			IN     DEFAULT
	 EDITION			VARCHAR2		IN     DEFAULT
	PROCEDURE DELETE_SERVICE
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 SERVICE_NAME			VARCHAR2		IN
	PROCEDURE DISCONNECT_SESSION
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 SERVICE_NAME			VARCHAR2		IN
	 DISCONNECT_OPTION		NUMBER			IN     DEFAULT
	PROCEDURE MODIFY_SERVICE
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 SERVICE_NAME			VARCHAR2		IN
	 PARAMETER_ARRAY		TABLE OF VARCHAR2(100)	IN
	PROCEDURE MODIFY_SERVICE
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 SERVICE_NAME			VARCHAR2		IN
	 GOAL				NUMBER			IN     DEFAULT
	 DTP				BOOLEAN 		IN     DEFAULT
	 AQ_HA_NOTIFICATIONS		BOOLEAN 		IN     DEFAULT
	 FAILOVER_METHOD		VARCHAR2		IN     DEFAULT
	 FAILOVER_TYPE			VARCHAR2		IN     DEFAULT
	 FAILOVER_RETRIES		NUMBER			IN     DEFAULT
	 FAILOVER_DELAY 		NUMBER			IN     DEFAULT
	 CLB_GOAL			NUMBER			IN     DEFAULT
	 EDITION			VARCHAR2		IN     DEFAULT
	 MODIFY_EDITION 		BOOLEAN 		IN     DEFAULT
	PROCEDURE START_SERVICE
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 SERVICE_NAME			VARCHAR2		IN
	 INSTANCE_NAME			VARCHAR2		IN     DEFAULT
	PROCEDURE STOP_SERVICE
	 Argument Name			Type			In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 SERVICE_NAME			VARCHAR2		IN
	 INSTANCE_NAME			VARCHAR2		IN     DEFAULT

	SYS@PRODCDB> 

Step 1. Change to pdb container;

	SYS@PRODCDB> alter session set container=pdbprod1;

	Session altered.

	SYS@PRODCDB>

	SYS@PRODCDB> select con_id,name,open_mode from v$containers;

		CON_ID NAME 		OPEN_MODE
	---------- -------------------- ----------
		 3 PDBPROD1		READ WRITE

	SYS@PRODCDB>

Step 2. Create service for current pdb using name and new network service name.
	
	SYS@PRODCDB> exec dbms_service.CREATE_SERVICE('pdb1','pdbprod1.us.oracle.com');

	PL/SQL procedure successfully completed.

	SYS@PRODCDB> select service_id,name,pdb,con_id from cdb_services order by con_id;

	SERVICE_ID NAME 		PDB			 CON_ID
	---------- -------------------- -------------------- ----------
		 6 pdbprod1.example.com PDBPROD1		      3
		 1 pdb1 		PDBPROD1		      3

	SYS@PRODCDB>

Step 3. start the new service

Do forget thie step!!!
	
	SYS@PRODCDB> exec dbms_service.start_service('pdb1');

	PL/SQL procedure successfully completed.

	SYS@PRODCDB>        

	SYS@PRODCDB> alter system register;

	System altered.

	SYS@PRODCDB>  

Step 4. lsnrclt and connect check

pdbprod1.us.oracle.com is new service name in lsnrctl.

	lsnrctl status 
	
	Service "pdbprod1.us.oracle.com" has 1 instance(s).
	  Instance "PRODCDB", status READY, has 1 handler(s) for this service...


connect test:

	sqlplus system/oracle@host01:1521/pdbprod1.us.oracle.com

	  

Step 5. Save the state for PDB.

	SQL> alter pluggable database save state;

Need save the state for pluggable for the new pdb service.

Otherwise, you need to manually start the service after you restart the pdb just like the following test.
	
	SQL> !lsnrctl status

	LSNRCTL for Linux: Version 18.0.0.0.0 - Production on 10-OCT-2018 01:32:39

	Copyright (c) 1991, 2018, Oracle.  All rights reserved.

	Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=emccsvr.oracle.com)(PORT=1521)))
	STATUS of the LISTENER
	------------------------
	Alias                     LISTENER
	Version                   TNSLSNR for Linux: Version 18.0.0.0.0 - Production
	Start Date                08-OCT-2018 03:27:11
	Uptime                    1 days 22 hr. 5 min. 28 sec
	Trace Level               off
	Security                  ON: Local OS Authentication
	SNMP                      OFF
	Listener Parameter File   /u01/app/oracle/product/18.0.0/dbhome_1/network/admin/listener.ora
	Listener Log File         /u01/app/oracle/diag/tnslsnr/emccsvr/listener/alert/log.xml
	Listening Endpoints Summary...
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=emccsvr.oracle.com)(PORT=1521)))
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1521)))
	Services Summary...
	Service "77133bc555247726e0530100007fa8fe.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDBXDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "pdb1.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	The command completed successfully

	SQL> select service_id,name,pdb,con_id from cdb_services order by con_id;

	SERVICE_ID NAME       PDB            CON_ID
	---------- ---------- ---------- ----------
			 8 PDB1       PDB1                3

	SQL>
	SQL> exec dbms_service.create_service('prodpdb1','prodpdb1');

	PL/SQL procedure successfully completed.

	SQL>
	SQL> exec dbms_service.start_service('prodpdb1');

	PL/SQL procedure successfully completed.

	SQL> !lsnrctl status

	LSNRCTL for Linux: Version 18.0.0.0.0 - Production on 10-OCT-2018 01:37:01

	Copyright (c) 1991, 2018, Oracle.  All rights reserved.

	Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=emccsvr.oracle.com)(PORT=1521)))
	STATUS of the LISTENER
	------------------------
	Alias                     LISTENER
	Version                   TNSLSNR for Linux: Version 18.0.0.0.0 - Production
	Start Date                08-OCT-2018 03:27:11
	Uptime                    1 days 22 hr. 9 min. 50 sec
	Trace Level               off
	Security                  ON: Local OS Authentication
	SNMP                      OFF
	Listener Parameter File   /u01/app/oracle/product/18.0.0/dbhome_1/network/admin/listener.ora
	Listener Log File         /u01/app/oracle/diag/tnslsnr/emccsvr/listener/alert/log.xml
	Listening Endpoints Summary...
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=emccsvr.oracle.com)(PORT=1521)))
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1521)))
	Services Summary...
	Service "77133bc555247726e0530100007fa8fe.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDBXDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "pdb1.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "prodpdb1.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	The command completed successfully

	SQL>
	SQL> show pdbs;

		CON_ID CON_NAME                       OPEN MODE  RESTRICTED
	---------- ------------------------------ ---------- ----------
			 3 PDB1                           READ WRITE NO
	SQL> alter pluggable database pdb1 close;

	Pluggable database altered.

	SQL> alter pluggable database pdb1 open;

	Pluggable database altered.

	SQL> !lsnrctl status

	LSNRCTL for Linux: Version 18.0.0.0.0 - Production on 10-OCT-2018 01:37:45

	Copyright (c) 1991, 2018, Oracle.  All rights reserved.

	Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=emccsvr.oracle.com)(PORT=1521)))
	STATUS of the LISTENER
	------------------------
	Alias                     LISTENER
	Version                   TNSLSNR for Linux: Version 18.0.0.0.0 - Production
	Start Date                08-OCT-2018 03:27:11
	Uptime                    1 days 22 hr. 10 min. 34 sec
	Trace Level               off
	Security                  ON: Local OS Authentication
	SNMP                      OFF
	Listener Parameter File   /u01/app/oracle/product/18.0.0/dbhome_1/network/admin/listener.ora
	Listener Log File         /u01/app/oracle/diag/tnslsnr/emccsvr/listener/alert/log.xml
	Listening Endpoints Summary...
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=emccsvr.oracle.com)(PORT=1521)))
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1521)))
	Services Summary...
	Service "77133bc555247726e0530100007fa8fe.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDBXDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "pdb1.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	The command completed successfully

	SQL> alter system register;

	System altered.

	SQL> !lsnrctl status

	LSNRCTL for Linux: Version 18.0.0.0.0 - Production on 10-OCT-2018 01:38:01

	Copyright (c) 1991, 2018, Oracle.  All rights reserved.

	Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=emccsvr.oracle.com)(PORT=1521)))
	STATUS of the LISTENER
	------------------------
	Alias                     LISTENER
	Version                   TNSLSNR for Linux: Version 18.0.0.0.0 - Production
	Start Date                08-OCT-2018 03:27:11
	Uptime                    1 days 22 hr. 10 min. 50 sec
	Trace Level               off
	Security                  ON: Local OS Authentication
	SNMP                      OFF
	Listener Parameter File   /u01/app/oracle/product/18.0.0/dbhome_1/network/admin/listener.ora
	Listener Log File         /u01/app/oracle/diag/tnslsnr/emccsvr/listener/alert/log.xml
	Listening Endpoints Summary...
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=emccsvr.oracle.com)(PORT=1521)))
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1521)))
	Services Summary...
	Service "77133bc555247726e0530100007fa8fe.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDBXDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "pdb1.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	The command completed successfully

	SQL>
	SQL> select service_id,name,pdb,con_id from cdb_services order by con_id;

	SERVICE_ID NAME       PDB            CON_ID
	---------- ---------- ---------- ----------
			 8 PDB1       PDB1                3
			 1 prodpdb1   PDB1                3

	SQL> exec dbms_service.start_service('prodpdb1');

	PL/SQL procedure successfully completed.

	SQL> !lsnrctl status;

	LSNRCTL for Linux: Version 18.0.0.0.0 - Production on 10-OCT-2018 01:39:45

	Copyright (c) 1991, 2018, Oracle.  All rights reserved.

	Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=emccsvr.oracle.com)(PORT=1521)))
	STATUS of the LISTENER
	------------------------
	Alias                     LISTENER
	Version                   TNSLSNR for Linux: Version 18.0.0.0.0 - Production
	Start Date                08-OCT-2018 03:27:11
	Uptime                    1 days 22 hr. 12 min. 34 sec
	Trace Level               off
	Security                  ON: Local OS Authentication
	SNMP                      OFF
	Listener Parameter File   /u01/app/oracle/product/18.0.0/dbhome_1/network/admin/listener.ora
	Listener Log File         /u01/app/oracle/diag/tnslsnr/emccsvr/listener/alert/log.xml
	Listening Endpoints Summary...
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=emccsvr.oracle.com)(PORT=1521)))
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1521)))
	Services Summary...
	Service "77133bc555247726e0530100007fa8fe.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDBXDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "pdb1.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "prodpdb1.us.oracle.com" has 1 instance(s).		=================================================> new pdb service.
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	The command completed successfully

	SQL> alter pluggable database save state;

	Pluggable database altered.

	SQL> alter pluggable database close;

	Pluggable database altered.

	SQL> alter pluggable database open;

	Pluggable database altered.

	SQL> !lsnrctl status

	LSNRCTL for Linux: Version 18.0.0.0.0 - Production on 10-OCT-2018 01:40:25

	Copyright (c) 1991, 2018, Oracle.  All rights reserved.

	Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=emccsvr.oracle.com)(PORT=1521)))
	STATUS of the LISTENER
	------------------------
	Alias                     LISTENER
	Version                   TNSLSNR for Linux: Version 18.0.0.0.0 - Production
	Start Date                08-OCT-2018 03:27:11
	Uptime                    1 days 22 hr. 13 min. 14 sec
	Trace Level               off
	Security                  ON: Local OS Authentication
	SNMP                      OFF
	Listener Parameter File   /u01/app/oracle/product/18.0.0/dbhome_1/network/admin/listener.ora
	Listener Log File         /u01/app/oracle/diag/tnslsnr/emccsvr/listener/alert/log.xml
	Listening Endpoints Summary...
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=emccsvr.oracle.com)(PORT=1521)))
	  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1521)))
	Services Summary...
	Service "77133bc555247726e0530100007fa8fe.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "ORCLCDBXDB.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "pdb1.us.oracle.com" has 1 instance(s).
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	Service "prodpdb1.us.oracle.com" has 1 instance(s).		=================================================> new pdb service.
	  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
	The command completed successfully

	SQL> exit
	Disconnected from Oracle Database 18c Enterprise Edition Release 18.0.0.0.0 - Production
	Version 18.3.0.0.0
	[oracle@emccsvr ~]$
	[oracle@emccsvr ~]$ sqlplus system/welcome@127.0.0.1:1521/prodpdb1.us.oracle.com

	SQL*Plus: Release 18.0.0.0.0 - Production on Wed Oct 10 01:45:50 2018
	Version 18.3.0.0.0

	Copyright (c) 1982, 2018, Oracle.  All rights reserved.

	Last Successful login time: Mon Oct 08 2018 05:24:53 -04:00

	Connected to:
	Oracle Database 18c Enterprise Edition Release 18.0.0.0.0 - Production
	Version 18.3.0.0.0

	SQL>

	  
### Reference documents

	Database Administrator's Guide / 42 Administering PDBs with SQL*Plus 

	
++++++++++++++++ EOF LinHong ++++++++++++++++	





