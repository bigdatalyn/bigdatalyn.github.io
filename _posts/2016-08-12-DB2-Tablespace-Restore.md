---
layout: post
title: "DB2表空间备份，恢复，回滚日志"
date:   2016-08-12 11:42:00
category: DB2
tags: DB2 
---

* content
{:toc}


How do I perform a DB2 tablespace level backup, restore and rollforward ? 






In order to be able to perform a tablespace level backup, you need to enable the database for archival logging.

Example:
	$ db2 update db cfg for sample using LOGARCHMETH1 disk:/home/db2inst1/logs
	DB20000I  The UPDATE DATABASE CONFIGURATION command completed successfully.

Once the database is enabled for log archival, to perform a tablespace level backup, specify the tablespace clause along with the tablespace name in your backup command.

Example:

To take an Offline tablespace level backup of tablespace USERSPACE1:

	$ db2 "backup db sample tablespace (USERSPACE1)"

	Backup successful. The timestamp for this backup image is : 20141013180433

To take an Online tablespace level backup of tablespaces SYSCATSPACE and USERSPACE1:

	$ db2 connect to sample

	   Database Connection Information

	 Database server        = DB2/LINUXX8664 10.1.4
	 SQL authorization ID   = DB2V10
	 Local database alias   = SAMPLE

	$ db2 "backup db sample tablespace (SYSCATSPACE, USERSPACE1) online"

	Backup successful. The timestamp for this backup image is : 20141013180552

Similar to the backup, to perform a restore and rollforward of your tablespace, specify the tablespace clause in your restore, rollforward commands.

Example:

To restore tablespace USERSPACE1 from a backup image (database level or tablespace level):


	$ db2 "restore db sample tablespace (USERSPACE1) taken at 20141013180552"
	DB20000I  The RESTORE DATABASE command completed successfully.

After the restore, the tablespace is now is a rollforward pending status:

	$ db2 rollforward db sample query status

		                         Rollforward Status

	 Input database alias                   = sample
	 Number of nodes have returned status   = 1

	 Node number                            = 0
	 Rollforward status                     = TBS pending
	 Next log file to be read               =
	 Log files processed                    =  -
	 Last committed transaction             = 1970-01-01-00.00.00.000000 UTC

You can get this information from db2pd -db <dbname> -tablespaces as well:

Example:

	$ db2pd -db sample -tablespaces

	Database Partition 0 -- Database SAMPLE -- Active -- Up 0 days 00:00:07 -- Date 2014-10-13-18.14.30.750892

	Tablespace Configuration:
	Address            Id    Type Content PageSz ExtentSz Auto Prefetch BufID BufIDDisk FSC NumCntrs MaxStripe  LastConsecPg Name
	0x00007FFF61CEC860 0     DMS  Regular 8192   4        Yes  4        1     1         Off 1        0          3            SYSCATSPACE
	0x00007FFF61CEDFE0 1     SMS  SysTmp  8192   32       Yes  32       1     1         On  1        0          31           TEMPSPACE1
	0x00007FFF61CF1720 2     DMS  Large   8192   32       Yes  32       1     1         Off 1        0          31           USERSPACE1
	0x00007FFF61CF2EA0 3     DMS  Large   8192   32       Yes  32       1     1         Off 1        0          31           IBMDB2SAMPLEREL
	0x00007FFF61CF4620 4     DMS  Large   8192   32       Yes  32       1     1         Off 1        0          31           IBMDB2SAMPLEXML
	0x00007FFF61CF5DA0 5     DMS  Large   8192   4        Yes  4        1     1         Off 1        0          3            SYSTOOLSPACE
	0x00007FFF61CF7520 6     SMS  UsrTmp  8192   4        Yes  4        1     1         On  1        0          3            SYSTOOLSTMPSPACE

	Tablespace Statistics:
	Address            Id    TotalPgs   UsablePgs  UsedPgs    PndFreePgs FreePgs    HWM        Max HWM    State      MinRecTime NQuiescers PathsDropped
	0x00007FFF61CEC860 0     16384      16380      13264      0          3116       13264      13264      0x00000000 0          0          No
	0x00007FFF61CEDFE0 1     1          1          1          0          0          0          0          0x00000000 0          0          No
	0x00007FFF61CF1720 2     4096       4064       1824       0          2240       1824       1824       0x00000080 0          0          No
	0x00007FFF61CF2EA0 3     4096       4064       736        0          3328       736        736        0x00000000 0          0          No
	0x00007FFF61CF4620 4     4096       4064       1440       0          2624       1440       1440       0x00000000 0          0          No
	0x00007FFF61CF5DA0 5     4096       4092       108        0          3984       108        108        0x00000000 0          0          No
	0x00007FFF61CF7520 6     1          1          1          0          0          0          0          0x00000000 0          0          No


	Tablespace state '0x00000080' corresponds to Roll Forward Pending:

	$ db2tbst 0x00000080
	State = Roll Forward Pending


	A tablespace level rollforward can be performed online, while there are other agents connected to the database using:

	$ db2 "rollforward database sample to end of logs and stop tablespace (USERSPACE1)"

		                         Rollforward Status

	 Input database alias                   = sample
	 Number of nodes have returned status   = 1

	 Node number                            = 0
	 Rollforward status                     = not pending
	 Next log file to be read               =
	 Log files processed                    =  -
	 Last committed transaction             = 1970-01-01-00.00.00.000000 UTC

	DB20000I  The ROLLFORWARD command completed successfully.






