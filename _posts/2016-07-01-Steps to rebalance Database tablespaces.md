---
layout: post
title: "[原创]Steps to rebalance Database tablespaces"
date:   2016-07-01 13:42:00
category: Shell
tags: DB2 Unix Shell
---

* content
{:toc}

An unbalanced use of filesystems where the tablespaces reside, may cause problems if the filesystem reaches 100% utilization. 






### Steps to rebalance Database tablespaces

[Steps to rebalance Database tablespaces](http://www-01.ibm.com/support/docview.wss?uid=swg21611157)

### Problem(Abstract)

An unbalanced use of filesystems where the tablespaces reside, may cause problems if the filesystem reaches 100% utilization. 

### Cause

Working as designed.
Environment

1: Tivoli Storage Manager server created with V6.2 or above or a Database created via a DB2 V9.7 or above. The following commands can be used to verify if this technote applies.

Login as instance owner:

	db2 connect to tsmdb1
	db2 "select reclaimable_space_enabled from table(mon_get_tablespace('',-1)) where tbsp_id in (2,4,5,6)"

-if the select returns 1, then this technote applies
for example:

RECLAIMABLE_SPACE_ENABLED
-------------------------
1
1
1
1

If the select returns 0, then this technote does not apply, and indicates that the database was initially created with DB2 V9.5.

2: Starting with Tivoli Storage Manager Server V7, the "extend dbs" command was updated to allow automatic space redistribution with the "reclaimspace=Yes" parameter. This technote will still apply if "reclaimspace=no" is used or if redistribution extend fails for any reason.

Diagnosing the problem

When the Tivoli Storage Manager server database (TSMDB1) is created using dbdirs on multiple file systems, for example " /fs/db1, /fs/db2", the database will use all file systems equally. For example :


	/dev/tsmdblv021 10412032 10411804 228 100% /fs/db1
	/dev/tsmdblv022 10412032 10411812 220 100% /fs/db2

When additional file systems need to be added to the database space with the "extend dbs" server administrative command, the newly added tablespaces will not be used equally. For example :

EXTEND DBS /fs/db3

After adding the /fs/db3 file system to the database space, DB2 will not rebalance the file systems utilization equally. For example :

	df -k
	/dev/tsmdblv021 10412032 10411804 228 100% /fs/db1
	/dev/tsmdblv022 10412032 10411812 220 100% /fs/db2
	/dev/tsmdblv033 10403840 1333136 9070704 13% /fs/db3

The 100% full /fs/db1 and /fs/db2 will stay 100% full and may cause the Tivoli Storage Manager to stop because of a DISK FULL condition.

Resolving the problem

Prepare a filesystem the same size as the initial filesystem. For example : /fs/db4 size : 10403840
Add the filesystem, /fs/db4 in this case, as additional space to database using the following Tivoli Storage Manager server administrative command :
Extend DBs /fs/db4
Obtain the tablespace list.

Logon as the server instance owner and execute the DB2 commands below:

	db2 connect to tsmdb1
	db2 list tablespaces

Note :
For Windows server only, you need to run these commands from a DB2 Command Window and run the "set db2instance=server1 command first.

For example, below are the list of tablespaces returned from a V6.2 Server :
	SYSCATSPACE
	USERSPACE1
	LARGESPACE1
	LARGEIDXSPACE1
	IDXSPACE1
	SYSTOOLSPACE

Note: different Tivoli Storage Manager Server Version may have different tablespaces, execute below steps for each of the tablespaces returned from "db2 list tablespace" command
For each tablespace returned from step 3, run the "db2 alter tablespace <name> rebalance" command. For example, using the tablespace names from step 3, login as the instance owner and run the following commands :

	db2 set schema tsmdb1
	db2 alter tablespace SYSCATSPACE rebalance
	db2 alter tablespace USERSPACE1 rebalance
	db2 alter tablespace LARGESPACE1 rebalance
	db2 alter tablespace LARGEIDXSPACE1 rebalance
	db2 alter tablespace IDXSPACE1 rebalance
	db2 alter tablespace SYSTOOLSPACE rebalance

Monitor the rebalance process.

Depending on the size of the tablespace, the rebalance can take some time to finish. For a large tablespace, the rebalance can take about 30 minutes. Run the following steps to monitor the rebalance progress:

-For V6

	db2 "select * from SYSIBMADM.TBSP_UTILIZATION " |grep -i progress

Note:
Above command will show if a table spaces rebalance is in progress.

-For V7
Issue the MON_GET_REBALANCE_STATUS table function with the tbsp_name and dbpartitionnum parameters:

	select
	varchar(tbsp_name, 30) as tbsp_name,
	dbpartitionnum,
	member,
	rebalancer_mode,
	rebalancer_status,
	rebalancer_extents_remaining,
	rebalancer_extents_processed,
	rebalancer_start_time
	from table(mon_get_rebalance_status(NULL,-2)) as t

Results:
Below is a typical output when monitoring the progress of a table space rebalance operation:

	TBSP_NAME DBPARTITIONNUM MEMBER REBALANCER_MODE
	------------------------------ -------------- ------ ------------------------------
	SYSCATSPACE 0 0 REV_REBAL

	REBALANCER_STATUS REBALANCER_EXTENTS_REMAINING REBALANCER_EXTENTS_PROCESSED REBALANCER_START_TIME
	----------------- ---------------------------- ---------------------------- --------------------------
	ACTIVE 6517 4 2011-12-01-12.08.16.000000

Reduce the tablespaces

Wait until all tablespaces have completed the rebalance and execute the following commands to reduce the tablespaces :

	db2 alter tablespace SYSCATSPACE reduce max
	db2 alter tablespace USERSPACE1 reduce max
	db2 alter tablespace LARGESPACE1 reduce max
	db2 alter tablespace LARGEIDXSPACE1 reduce max
	db2 alter tablespace IDXSPACE1 reduce max
	db2 alter tablespace SYSTOOLSPACE reduce max

After the rebalance/reduce, the file systems should be equally utilized and there should be no more file systems 100% Full condition.


