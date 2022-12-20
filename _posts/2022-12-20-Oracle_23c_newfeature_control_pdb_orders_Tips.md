---
layout: post
title: "Oracle 23c New features - Control PDB Open Order Enhancements Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - Control PDB Open Order Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	

Control PDB Open Order

To Set the Priority of a PDB
```
Use the ALTER PLUGGABLE DATABASE <databasename> Priority <value> set the priority.
```






PDB priority concept is introduced in Oracle Databse 23c for different operations, including open, state restoration and upgrade.

Note: the PRIORITY clause was introduced in Oracle Database12cR2 to enable you to specify a priority for upgrading PDBs (ALTER PLUGGABLE DATABASE xxx UPGRADE PRIORITY n;). This syntax was documented in the Upgrade Guide.


### Control PDB Open Order

Use the following `ALTER` sql to set the Priority of pdbs.

```
ALTER PLUGGABLE DATABASE <PDB name> PRIORITY <value>

PDB name is required
PRIORITY <value> - <value> is an integer between 1 and 4096
```

Test in 23c.
```
SYS@cdb1> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 PDB1 			  READ WRITE NO
SYS@cdb1> 
SYS@cdb1> create pluggable database pdb2 admin user pdbadmin identified by oracle roles=(DBA) file_name_convert=('PDB$SEED','PDB2');
create pluggable database pdb2 admin user pdbadmin identified by oracle roles=(DBA) file_name_convert=('PDB$SEED','PDB2')
*
ERROR at line 1:
ORA-65005: missing or invalid file name pattern for file -
/u01/oradata/CDB1/pdbseed/system01.dbf

SYS@cdb1> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 PDB1 			  READ WRITE NO
	 5 PDB2 			  MOUNTED
SYS@cdb1> alter pluggable database pdb1 priority 6;

Pluggable database altered.

SYS@cdb1> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 PDB1 			  READ WRITE NO
	 5 PDB2 			  MOUNTED
SYS@cdb1> 
SYS@cdb1> desc cdb_pdbs;
 Name					   Null?    Type
 ----------------------------------------- -------- ----------------------------
 PDB_ID 				   NOT NULL NUMBER
 PDB_NAME				   NOT NULL VARCHAR2(128)
 DBID					   NOT NULL NUMBER
 CON_UID				   NOT NULL NUMBER
 GUID						    RAW(16)
 STATUS 					    VARCHAR2(10)
 CREATION_SCN					    NUMBER
 VSN						    NUMBER
 LOGGING					    VARCHAR2(9)
 FORCE_LOGGING					    VARCHAR2(39)
 FORCE_NOLOGGING				    VARCHAR2(3)
 APPLICATION_ROOT				    VARCHAR2(3)
 APPLICATION_PDB				    VARCHAR2(3)
 APPLICATION_SEED				    VARCHAR2(3)
 APPLICATION_ROOT_CON_ID			    NUMBER
 IS_PROXY_PDB					    VARCHAR2(3)
 CON_ID 				   NOT NULL NUMBER
 UPGRADE_PRIORITY				    NUMBER
 APPLICATION_CLONE				    VARCHAR2(3)
 FOREIGN_CDB_DBID				    NUMBER
 UNPLUG_SCN					    NUMBER
 FOREIGN_PDB_ID 				    NUMBER
 CREATION_TIME				   NOT NULL DATE
 REFRESH_MODE					    VARCHAR2(6)
 REFRESH_INTERVAL				    NUMBER
 TEMPLATE					    VARCHAR2(3)
 LAST_REFRESH_SCN				    NUMBER
 TENANT_ID					    VARCHAR2(32767)
 SNAPSHOT_MODE					    VARCHAR2(6)
 SNAPSHOT_INTERVAL				    NUMBER
 CREDENTIAL_NAME				    VARCHAR2(262)
 LAST_REFRESH_TIME				    DATE
 CLOUD_IDENTITY 				    VARCHAR2(32767)
 SOURCE_PDB_NAME				    VARCHAR2(128)
 SOURCE_DB_LINK 				    VARCHAR2(128)
 PRIORITY					    NUMBER

SYS@cdb1>
SYS@cdb1> select pdb_id,pdb_name,dbid,priority from cdb_pdbs;

 PDB_ID PDB_NAME	DBID  PRIORITY
------- -------- ----------- ---------
      2 PDB$SEED  2787626010	     1
      3 PDB1	  2616168235	     6
      5 PDB2	  1131675571

SYS@cdb1> alter pluggable database pdb2 priority 5;

Pluggable database altered.

SYS@cdb1> select pdb_id,pdb_name,dbid,priority from cdb_pdbs order by 4;

 PDB_ID PDB_NAME	DBID  PRIORITY
------- -------- ----------- ---------
      2 PDB$SEED  2787626010	     1
      5 PDB2	  1131675571	     5
      3 PDB1	  2616168235	     6

SYS@cdb1> 
```

### Reference 

[To Set the Priority of a PDB](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/multi/administering-pdbs-with-sql-plus.html#GUID-C68E55D5-52D6-4E64-BF8C-4DE3C8FA5131)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


