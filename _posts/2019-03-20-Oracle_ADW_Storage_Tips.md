---
layout: post
title: "Oracle ADW Storage Tips"
category: Oracle
tags: Oracle ADW Tips
---

* content
{:toc}

Oracle ADW Storage Tips

Oracle ADW 存储相关的Tips









### ADW的限制

[Restrictions for Database Features](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/experienced-database-users.html#GUID-B6FB5EFC-4828-43F4-BA63-72DA74FFDB87)


[Restrictions for Database Initialization Parameters](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/experienced-database-users.html#GUID-7CF648C1-0822-4602-8ED1-6F5719D6779E)


[Restrictions for SQL Commands](https://docs-uat.us.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/experienced-database-users.html#GUID-791E7112-07F7-46F0-BD81-777C8FAD83A0)


### 存储相关的Tips

创建ADW实例时候指定了Storage容量大小(1TB),使用上限是创建时候设置。如果使用到了上限，并不会自动扩展。

另外表空间和自创表空间的自动扩展是打开的(ON)的,另外也可以是用alter database datafile .... resize修改大小。

	alter database datafile 'xxxx' autoextend on maxsize xxxGB;

如下默认有如下的表空间。

	SQL> col file_name for a90

	SQL> select file_name,tablespace_name,status,bytes/1024/1024/1024 from dba_data_files;

	FILE_NAME                                                                                  TABLESPACE_NAME                STATUS    BYTES/1024/1024/1024
	------------------------------------------------------------------------------------------ ------------------------------ --------- --------------------
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/system.7061.1003215437             SYSTEM                         AVAILABLE           .176757813
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/sysaux.5651.1003215441             SYSAUX                         AVAILABLE           .391235352
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/undotbs1.8063.1003215435           UNDOTBS1                       AVAILABLE            .17578125
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/data.7994.1003215433               DATA                           AVAILABLE           10.0976563
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/dbfs_data.7997.1003215433          DBFS_DATA                      AVAILABLE            .09765625
	+DATA/sampleschema_dbf                                                                     SAMPLESCHEMA                   AVAILABLE                  200
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/undo_8.5653.1003215653             UNDO_8                         AVAILABLE            .17578125

	7 rows selected.

	SQL> 

	SQL> alter database datafile '+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/data.7994.1003215433' resize 20G;

	Database altered.

	SQL>

	SQL> select file_name,tablespace_name,status,bytes/1024/1024/1024 from dba_data_files;

	FILE_NAME                                                                                  TABLESPACE_NAME                STATUS    BYTES/1024/1024/1024
	------------------------------------------------------------------------------------------ ------------------------------ --------- --------------------
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/system.7061.1003215437             SYSTEM                         AVAILABLE           .176757813
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/sysaux.5651.1003215441             SYSAUX                         AVAILABLE           .391235352
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/undotbs1.8063.1003215435           UNDOTBS1                       AVAILABLE            .17578125
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/data.7994.1003215433               DATA                           AVAILABLE                   20
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/dbfs_data.7997.1003215433          DBFS_DATA                      AVAILABLE            .09765625
	+DATA/sampleschema_dbf                                                                     SAMPLESCHEMA                   AVAILABLE                  200
	+DATA/XXXXXXX/84539F43E9836FD8E0530818000AC97E/DATAFILE/undo_8.5653.1003215653             UNDO_8                         AVAILABLE            .17578125

	7 rows selected.

	SQL>

备份：保留60天的备份策列，每天自动备份，另外这备份文件存放之前创建adw实例时候指定的存储大小内部，而是Ojbect Storage(用户是访问不了)







	
Have a good work&life! 2019/03 via LinHong



