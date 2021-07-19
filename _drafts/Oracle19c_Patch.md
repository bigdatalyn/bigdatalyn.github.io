Oracle Database 19c Release Update & Release Update Revision January 2021 Critical Issues (Doc ID 2725758.1)


- Opatch : 12.2.0.1.25    -> p6880880_210000_Linux-x86-64.zip
- 19c Patch:p32218454     -> p32218454_190000_Linux-x86-64.zip  -> Patch 32218454 requires OPatch version 12.2.0.1.23.

DATABASE RELEASE UPDATE 19.10.0.0.0 (Patch)
p32218454_190000_Linux-x86-64.zip

[oracle@ol8-19c patch]$ unzip p32218454_190000_Linux-x86-64.zip
[oracle@ol8-19c patch]$ cd 32218454
[oracle@ol8-19c 32218454]$ export PATH=/u01/app/oracle/product/19.0.0/dbhome_1/OPatch:$PATH
[oracle@ol8-19c 32218454]$ which opatch
/u01/app/oracle/product/19.0.0/dbhome_1/OPatch/opatch
[oracle@ol8-19c 32218454]$

[oracle@ol8-19c 32218454]$ sqlplus / as sysdba
SYS@cdb1> shu immediate;


[oracle@ol8-19c 32218454]$ opatch prereq CheckConflictAgainstOHWithDetail -ph ./
Oracle Interim Patch Installer version 12.2.0.1.17
Copyright (c) 2021, Oracle Corporation.  All rights reserved.

PREREQ session

Oracle Home       : /u01/app/oracle/product/19.0.0/dbhome_1
Central Inventory : /u01/app/oraInventory
   from           : /u01/app/oracle/product/19.0.0/dbhome_1/oraInst.loc
OPatch version    : 12.2.0.1.17
OUI version       : 12.2.0.7.0
Log file location : /u01/app/oracle/product/19.0.0/dbhome_1/cfgtoollogs/opatch/opatch2021-07-19_14-11-59PM_1.log

Invoking prereq "checkconflictagainstohwithdetail"

Prereq "checkConflictAgainstOHWithDetail" passed.

OPatch succeeded.
[oracle@ol8-19c 32218454]$

[oracle@ol8-19c 32218454]$ pwd
/home/oracle/patch/32218454
[oracle@ol8-19c 32218454]$ opatch apply
Oracle Interim Patch Installer version 12.2.0.1.17
Copyright (c) 2021, Oracle Corporation.  All rights reserved.


Oracle Home       : /u01/app/oracle/product/19.0.0/dbhome_1
Central Inventory : /u01/app/oraInventory
   from           : /u01/app/oracle/product/19.0.0/dbhome_1/oraInst.loc
OPatch version    : 12.2.0.1.17
OUI version       : 12.2.0.7.0
Log file location : /u01/app/oracle/product/19.0.0/dbhome_1/cfgtoollogs/opatch/opatch2021-07-19_14-09-17PM_1.log

Verifying environment and performing prerequisite checks...


```
[Jul 19, 2021 2:09:42 PM] [INFO]    Prerequisite check "CheckMinimumOPatchVersion" failed.
                                    The details are:


                                    The OPatch being used has version 12.2.0.1.17 while the following patch(es) require higher versions:
                                    Patch 32218454 requires OPatch version 12.2.0.1.23.
                                    Please download latest OPatch from My Oracle Support.
[Jul 19, 2021 2:09:42 PM] [SEVERE]  OUI-67073:UtilSession failed: Prerequisite check "CheckMinimumOPatchVersion" failed.
[Jul 19, 2021 2:09:42 PM] [INFO]    Finishing UtilSession at Mon Jul 19 14:09:42 CST 2021
[Jul 19, 2021 2:09:42 PM] [INFO]    Log file location: /u01/app/oracle/product/19.0.0/dbhome_1/cfgtoollogs/opatch/opatch2021-07-19_14-09-17PM_1.log
[Jul 19, 2021 2:09:42 PM] [INFO]    Stack Description: java.lang.RuntimeException: Prerequisite check "CheckMinimumOPatchVersion" failed.
```

[oracle@ol8-19c 32218454]$ opatch version
OPatch Version: 12.2.0.1.17

OPatch succeeded.
[oracle@ol8-19c 32218454]$

OPatch 12.2.0.1.25 for DB 12.x, 18.x, 19.x and 21.x releases (May 2021)
Oracle Global Lifecycle Management OPatch
https://updates.oracle.com/download/6880880.html

[oracle@ol8-19c dbhome_1]$ pwd
/u01/app/oracle/product/19.0.0/dbhome_1
[oracle@ol8-19c dbhome_1]$ unzip p6880880_210000_Linux-x86-64.zip
~
[oracle@ol8-19c dbhome_1]$ opatch version
OPatch Version: 12.2.0.1.25

OPatch succeeded.
[oracle@ol8-19c dbhome_1]$


[oracle@ol8-19c 32218454]$ pwd
/home/oracle/patch/32218454
[oracle@ol8-19c 32218454]$ opatch apply


[oracle@ol8-19c 32218454]$ sqlplus / as sysdba
SYS@cdb1> starup;

cd $ORACLE_HOME/OPatch
./datapatch -verbose

-- Check Patches status
SET LINESIZE 500
SET PAGESIZE 1000
SET SERVEROUT ON
SET LONG 2000000
COLUMN action_time FORMAT A12
COLUMN action FORMAT A10
COLUMN comments FORMAT A30
COLUMN description FORMAT A60
COLUMN namespace FORMAT A20
COLUMN status FORMAT A10

SELECT TO_CHAR(action_time, 'YYYY-MM-DD') AS action_time,action,status,description,patch_id
FROM sys.dba_registry_sqlpatch
ORDER by action_time;


col comp_id for a10
col version for a11
col status for a10
col comp_name for a37
select comp_id,comp_name,version,status from dba_registry;

-- Identify Invalid Objects before patching

COLUMN object_name FORMAT A30
SELECT owner,object_type,object_name,status
FROM dba_objects
WHERE status = 'INVALID'
ORDER BY owner, object_type, object_name;


```
[oracle@ol8-19c 32218454]$ opatch apply
Oracle Interim Patch Installer version 12.2.0.1.25
Copyright (c) 2021, Oracle Corporation.  All rights reserved.

Oracle Home       : /u01/app/oracle/product/19.0.0/dbhome_1
Central Inventory : /u01/app/oraInventory
   from           : /u01/app/oracle/product/19.0.0/dbhome_1/oraInst.loc
OPatch version    : 12.2.0.1.25
OUI version       : 12.2.0.7.0
Log file location : /u01/app/oracle/product/19.0.0/dbhome_1/cfgtoollogs/opatch/opatch2021-07-19_14-29-46PM_1.log

Verifying environment and performing prerequisite checks...
--------------------------------------------------------------------------------
Start OOP by Prereq process.
Launch OOP...

Oracle Interim Patch Installer version 12.2.0.1.25
Copyright (c) 2021, Oracle Corporation.  All rights reserved.

Oracle Home       : /u01/app/oracle/product/19.0.0/dbhome_1
Central Inventory : /u01/app/oraInventory
   from           : /u01/app/oracle/product/19.0.0/dbhome_1/oraInst.loc
OPatch version    : 12.2.0.1.25
OUI version       : 12.2.0.7.0
Log file location : /u01/app/oracle/product/19.0.0/dbhome_1/cfgtoollogs/opatch/opatch2021-07-19_14-30-26PM_1.log

Verifying environment and performing prerequisite checks...
OPatch continues with these patches:   32218454

Do you want to proceed? [y|n]
y
User Responded with: Y
All checks passed.

Please shutdown Oracle instances running out of this ORACLE_HOME on the local system.
(Oracle Home = '/u01/app/oracle/product/19.0.0/dbhome_1')

Is the local system ready for patching? [y|n]
y
User Responded with: Y
Backing up files...
Applying interim patch '32218454' to OH '/u01/app/oracle/product/19.0.0/dbhome_1'
ApplySession: Optional component(s) [ oracle.network.gsm, 19.0.0.0.0 ] , [ oracle.rdbms.ic, 19.0.0.0.0 ] , [ oracle.rdbms.tg4db2, 19.0.0.0.0 ] , [ oracle.tfa, 19.0.0.0.0 ] , [ oracle.net.cman, 19.0.0.0.0 ] , [ oracle.network.cman, 19.0.0.0.0 ] , [ oracle.oid.client, 19.0.0.0.0 ] , [ oracle.options.olap.api, 19.0.0.0.0 ] , [ oracle.options.olap, 19.0.0.0.0 ] , [ oracle.xdk.companion, 19.0.0.0.0 ] , [ oracle.jdk, 1.8.0.191.0 ]  not present in the Oracle Home or a higher version is found.


Patching component oracle.rdbms, 19.0.0.0.0...
Patching component oracle.rdbms.rsf, 19.0.0.0.0...
Patching component oracle.rdbms.util, 19.0.0.0.0...
Patching component oracle.assistants.acf, 19.0.0.0.0...
Patching component oracle.assistants.deconfig, 19.0.0.0.0...
Patching component oracle.assistants.server, 19.0.0.0.0...
Patching component oracle.buildtools.rsf, 19.0.0.0.0...
Patching component oracle.ctx, 19.0.0.0.0...
Patching component oracle.dbjava.ic, 19.0.0.0.0...
Patching component oracle.dbjava.jdbc, 19.0.0.0.0...
Patching component oracle.dbjava.ucp, 19.0.0.0.0...
Patching component oracle.dbtoolslistener, 19.0.0.0.0...
Patching component oracle.ldap.owm, 19.0.0.0.0...
Patching component oracle.ldap.rsf, 19.0.0.0.0...
Patching component oracle.network.rsf, 19.0.0.0.0...
Patching component oracle.oracore.rsf, 19.0.0.0.0...
Patching component oracle.rdbms.dbscripts, 19.0.0.0.0...
Patching component oracle.rdbms.deconfig, 19.0.0.0.0...
Patching component oracle.sdo, 19.0.0.0.0...
Patching component oracle.sdo.locator.jrf, 19.0.0.0.0...
Patching component oracle.sqlplus, 19.0.0.0.0...
Patching component oracle.xdk, 19.0.0.0.0...
Patching component oracle.marvel, 19.0.0.0.0...
Patching component oracle.xdk.rsf, 19.0.0.0.0...
Patching component oracle.ctx.atg, 19.0.0.0.0...
Patching component oracle.rdbms.scheduler, 19.0.0.0.0...
Patching component oracle.rdbms.lbac, 19.0.0.0.0...
Patching component oracle.duma, 19.0.0.0.0...
Patching component oracle.ldap.rsf.ic, 19.0.0.0.0...
Patching component oracle.odbc, 19.0.0.0.0...
Patching component oracle.ctx.rsf, 19.0.0.0.0...
Patching component oracle.oraolap.api, 19.0.0.0.0...
Patching component oracle.xdk.parser.java, 19.0.0.0.0...
Patching component oracle.oraolap, 19.0.0.0.0...
Patching component oracle.sdo.locator, 19.0.0.0.0...
Patching component oracle.sqlplus.ic, 19.0.0.0.0...
Patching component oracle.mgw.common, 19.0.0.0.0...
Patching component oracle.ons, 19.0.0.0.0...
Patching component oracle.dbdev, 19.0.0.0.0...
Patching component oracle.network.listener, 19.0.0.0.0...
Patching component oracle.nlsrtl.rsf, 19.0.0.0.0...
Patching component oracle.ovm, 19.0.0.0.0...
Patching component oracle.oraolap.dbscripts, 19.0.0.0.0...
Patching component oracle.xdk.xquery, 19.0.0.0.0...
Patching component oracle.precomp.rsf, 19.0.0.0.0...
Patching component oracle.javavm.client, 19.0.0.0.0...
Patching component oracle.precomp.common.core, 19.0.0.0.0...
Patching component oracle.ldap.security.osdt, 19.0.0.0.0...
Patching component oracle.rdbms.oci, 19.0.0.0.0...
Patching component oracle.rdbms.rman, 19.0.0.0.0...
Patching component oracle.rdbms.crs, 19.0.0.0.0...
Patching component oracle.rdbms.install.common, 19.0.0.0.0...
Patching component oracle.javavm.server, 19.0.0.0.0...
Patching component oracle.rdbms.drdaas, 19.0.0.0.0...
Patching component oracle.rdbms.install.plugins, 19.0.0.0.0...
Patching component oracle.rdbms.dv, 19.0.0.0.0...
Patching component oracle.ldap.client, 19.0.0.0.0...
Patching component oracle.network.client, 19.0.0.0.0...
Patching component oracle.rdbms.rsf.ic, 19.0.0.0.0...
Patching component oracle.precomp.common, 19.0.0.0.0...
Patching component oracle.precomp.lang, 19.0.0.0.0...
Patching component oracle.jdk, 1.8.0.201.0...
Patch 32218454 successfully applied.
Sub-set patch [29517242] has become inactive due to the application of a super-set patch [32218454].
Please refer to Doc ID 2161861.1 for any possible further required actions.
Log file location: /u01/app/oracle/product/19.0.0/dbhome_1/cfgtoollogs/opatch/opatch2021-07-19_14-30-26PM_1.log

OPatch succeeded.
[oracle@ol8-19c 32218454]$

```


```sql
ACTION_TIME  ACTION	STATUS	   DESCRIPTION							  PATCH_ID
------------ ---------- ---------- ------------------------------------------------------------ ----------
2021-07-08   APPLY	SUCCESS    Database Release Update : 19.3.0.0.190416 (29517242) 	  29517242

COMP_ID    COMP_NAME				 VERSION     STATUS
---------- ------------------------------------- ----------- ----------
CATALOG    Oracle Database Catalog Views	 19.0.0.0.0  VALID
CATPROC    Oracle Database Packages and Types	 19.0.0.0.0  VALID
RAC	   Oracle Real Application Clusters	 19.0.0.0.0  OPTION OFF
JAVAVM	   JServer JAVA Virtual Machine 	 19.0.0.0.0  VALID
XML	   Oracle XDK				 19.0.0.0.0  VALID
CATJAVA    Oracle Database Java Packages	 19.0.0.0.0  VALID
APS	   OLAP Analytic Workspace		 19.0.0.0.0  VALID
XDB	   Oracle XML Database			 19.0.0.0.0  VALID
OWM	   Oracle Workspace Manager		 19.0.0.0.0  VALID
CONTEXT    Oracle Text				 19.0.0.0.0  VALID
ORDIM	   Oracle Multimedia			 19.0.0.0.0  VALID
SDO	   Spatial				 19.0.0.0.0  VALID
XOQ	   Oracle OLAP API			 19.0.0.0.0  VALID
OLS	   Oracle Label Security		 19.0.0.0.0  VALID
DV	   Oracle Database Vault		 19.0.0.0.0  VALID

15 rows selected.

SYS@cdb1> SELECT owner,object_type,object_name,status
  2  FROM dba_objects
  3  WHERE status = 'INVALID'
  4  ORDER BY owner, object_type, object_name;

no rows selected

SYS@cdb1>
-- @?/rdbms/admin/utlrp.sql
```

