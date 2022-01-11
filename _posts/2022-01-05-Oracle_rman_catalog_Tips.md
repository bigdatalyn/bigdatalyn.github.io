---
layout: post
title: "Oracle rman catalog Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle rman catalog Tips


Error:
```sql
Oracle error from recovery catalog database: ORA-00955: name is already used by an existing object

Oracle error from recovery catalog database: ORA-00942: table or view does not exist
```

Fix:

drop catalog and recreate catalog.



Test:

```sql
HONG@pdb1> create tablespace cattbs datafile '/u02/oradata/CDB1/CE0E59659334162FE0530F02000AEA8D/datafile/catalog01.dbf' size 100m;

Tablespace created.

HONG@pdb1> create user rman identified by rman default tablespace cattbs;

User created.

HONG@pdb1>

HONG@pdb1> grant connect,resource,recovery_catalog_owner to rman;

Grant succeeded.

HONG@pdb1>


[oracle@ol8-19c tmp]$ rman catalog rman/rman@pdb1

Recovery Manager: Release 19.0.0.0.0 - Production on Thu Jan 6 20:54:14 2022
Version 19.10.0.0.0

Copyright (c) 1982, 2019, Oracle and/or its affiliates.  All rights reserved.

connected to recovery catalog database

RMAN> create catalog;

error creating config_update
Oracle error from recovery catalog database: ORA-01950: no privileges on tablespace 'CATTBS'

Oracle error from recovery catalog database: ORA-00942: table or view does not exist

RMAN-00571: ===========================================================
RMAN-00569: =============== ERROR MESSAGE STACK FOLLOWS ===============
RMAN-00571: ===========================================================
RMAN-06433: error installing recovery catalog

RMAN> exit

HONG@pdb1> grant dba to rman
  2  ;

Grant succeeded.

HONG@pdb1> exit
Disconnected from Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0
[oracle@ol8-19c tmp]$ rman catalog rman/rman@pdb1

Recovery Manager: Release 19.0.0.0.0 - Production on Thu Jan 6 20:54:51 2022
Version 19.10.0.0.0

Copyright (c) 1982, 2019, Oracle and/or its affiliates.  All rights reserved.

connected to recovery catalog database
recovery catalog is not installed

RMAN> create catalog;

error creating rcver
Oracle error from recovery catalog database: ORA-00955: name is already used by an existing object

Oracle error from recovery catalog database: ORA-00942: table or view does not exist

RMAN-00571: ===========================================================
RMAN-00569: =============== ERROR MESSAGE STACK FOLLOWS ===============
RMAN-00571: ===========================================================
RMAN-06433: error installing recovery catalog

RMAN> 

RMAN> drop catalog;

recovery catalog owner is RMAN
enter DROP CATALOG command again to confirm catalog removal

RMAN> drop catalog;

recovery catalog dropped

RMAN> create catalog tablespace cattbs;

recovery catalog created

RMAN>


```

RMAN register:

```sql
[oracle@ol8-19c tmp]$ rman target / catalog rman/rman@pdb1

Recovery Manager: Release 19.0.0.0.0 - Production on Thu Jan 6 21:07:28 2022
Version 19.10.0.0.0

Copyright (c) 1982, 2019, Oracle and/or its affiliates.  All rights reserved.

PL/SQL package SYS.DBMS_BACKUP_RESTORE version 19.03.00.00 in TARGET database is not current
PL/SQL package SYS.DBMS_RCVMAN version 19.03.00.00 in TARGET database is not current
connected to target database: CDB1 (DBID=1051107858)
connected to recovery catalog database

RMAN> register database;

database registered in recovery catalog
starting full resync of recovery catalog
full resync complete

RMAN> show all;

RMAN configuration parameters for database with db_unique_name CDB1 are:
CONFIGURE RETENTION POLICY TO REDUNDANCY 1; # default
CONFIGURE BACKUP OPTIMIZATION OFF; # default
CONFIGURE DEFAULT DEVICE TYPE TO DISK; # default
CONFIGURE CONTROLFILE AUTOBACKUP ON; # default
CONFIGURE CONTROLFILE AUTOBACKUP FORMAT FOR DEVICE TYPE DISK TO '%F'; # default
CONFIGURE DEVICE TYPE DISK PARALLELISM 2 BACKUP TYPE TO BACKUPSET;
CONFIGURE DATAFILE BACKUP COPIES FOR DEVICE TYPE DISK TO 1; # default
CONFIGURE ARCHIVELOG BACKUP COPIES FOR DEVICE TYPE DISK TO 1; # default
CONFIGURE MAXSETSIZE TO UNLIMITED; # default
CONFIGURE ENCRYPTION FOR DATABASE OFF; # default
CONFIGURE ENCRYPTION ALGORITHM 'AES128'; # default
CONFIGURE COMPRESSION ALGORITHM 'BASIC' AS OF RELEASE 'DEFAULT' OPTIMIZE FOR LOAD TRUE ; # default
CONFIGURE RMAN OUTPUT TO KEEP FOR 7 DAYS; # default
CONFIGURE ARCHIVELOG DELETION POLICY TO NONE; # default
CONFIGURE SNAPSHOT CONTROLFILE NAME TO '/u01/app/oracle/product/19.0.0/dbhome_1/dbs/snapcf_cdb1.f'; # default

RMAN>
```


Test zdlra scripts:

```sql
[oracle@ol8-19c tmp]$ sqlplus rman/rman@pdb1

SQL*Plus: Release 19.0.0.0.0 - Production on Thu Jan 6 21:24:53 2022
Version 19.10.0.0.0

Copyright (c) 1982, 2020, Oracle.  All rights reserved.

Last Successful login time: Thu Jan 06 2022 21:24:47 +08:00

Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0

RMAN@pdb1> @zdlra-client-metrics-catalog-3.0.sql
********* Start of ZDLRA Client Sizing Metrics - Catalog (3.x) ****************
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|Include|DBID		|DBKey		|DBName  |DBUnqName			|DBRole | DB Size GB|	 Full GB|Method   |Incr GB/Day|Incr Pct/Day|Redo GB/Day|Redo Pct/Day|Rcvry Window|  Last Full|	Last Incr|  Last Arch|Incr Days|Arch Days|
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|YES	|1051107858	|1		|CDB1	 |CDB1				|PRIMARY|      3.926|	    .768|BDF	  |	  .039|        5.11|	   .039|	5.11|		*|06-JAN-2022|		*|06-JAN-2022|	      *|	1|
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
********* End of ZDLRA Client Sizing Metrics ****************
Catalog schema	      : RMAN
Catalog database      : PDB1
Catalog host	      : ol8-19c
Catalog version       : 19.10.00.00.00
Begin time	      : 06-JAN-2022 21:24:58
End time	      : 06-JAN-2022 21:24:58
Databases incldued    : 1
Databases excluded    : 0 (No backups in past 30 days.)
Script version	      : 3.0 - 01-MAY-2017
Elapsed: 00:00:00.20
Disconnected from Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0
[oracle@ol8-19c tmp]$
```

### Reference



Have a good work&life! 2022/01 via LinHong

