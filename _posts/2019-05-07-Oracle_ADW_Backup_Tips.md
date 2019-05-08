---
layout: post
title: "Oracle ADW Backup Tips"
category: Oracle
tags: Oracle ADW Tips
---

* content
{:toc}

Oracle ADW Backup Tips

Oracle ADW 备份相关 Tips










### ADW 备份相关


#### ADW能否在特定时间点进行全备？如周五晚上做个全备.

ADW是通过rman进行自动获取备份集(增量备份 Incremental)，如需全备特定时间点的备份的话，通过控制台手动进行备份是可以达到的。

但手动备份是备份到ObjectStorage，所以需要设置Object Storage bucket，不然手动备份不了。

而ADW有自动备份策列，这个自动备份的设置并不能手动修改，如指定某个时间点进行自动备份。

参考如下：

[Manual Backups on Autonomous Data Warehouse](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/backup-restore.html#GUID-D95E5D6A-C470-4A68-9545-CC99D937E7D1)

![ADWBackup]({{ "/files/Oracle/ADWC/Backups.png"}})

![ManualBackup]({{ "/files/Oracle/ADWC/Backup_ManualBackup.png"}})


手动备份

![BackupProgress01]({{ "/files/Oracle/ADWC/BackupProgress01.png"}})

![BackupProgress02]({{ "/files/Oracle/ADWC/BackupProgress02.png"}})

Tips:

	In the Oracle Cloud Infrastructure Console, create a bucket in your designated Object Storage Swift compartment to hold the backups. The format of the bucket name is backup_databasename, where databasename is lowercase.
	For example, if you provision a database named DATABASE1, the bucket name should be backup_database1. 

	Also, if the Display Name is different with Database Name, you need to use ADW Database Name! ADW Database Name! ADW Database Name!

查看备份进度，可以通过ADW的控制台确认进度 Lifecycle State:  Backup In Progress...
	
#### 备份时间保留多久

无论是自动备份还是手动备份，备份集最多保留60天，经过60天备份文件自动删除

#### 是否能恢复到任意时间点

因为是 Point-in-Time的备份，所以可以恢复到任意时间点


#### 参考文档


[Manual Backups on Autonomous Data Warehouse](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/backup-restore.html#GUID-D95E5D6A-C470-4A68-9545-CC99D937E7D1)

[Setting Up a Bucket to Store Manual Backups](https://docs.cloud.oracle.com/iaas/Content/Database/Tasks/adbbackingup.htm#creatingbucket)


	Note 1:
	Each manual backup creates a full backup on your Oracle Cloud Infrastructure Object Storage bucket and the backup can only be used by the Autonomous Data Warehouse instance when you initiate a point-in-time-recovery.
	Note 2:
	The retention period for manual backups is the same as automatic backups which is 60 days.
	Note 3:
	While backing up a database, the database is fully functional; however during the backup lifecycle management operations are not allowed. For example, stopping the database is not allowed during the backup.


Have a good work&life! 2019/05 via LinHong



