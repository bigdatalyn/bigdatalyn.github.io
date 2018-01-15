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

	  
	  
### Reference documents

	Database Administrator's Guide / 42 Administering PDBs with SQL*Plus 

	
++++++++++++++++ EOF LinHong ++++++++++++++++	





