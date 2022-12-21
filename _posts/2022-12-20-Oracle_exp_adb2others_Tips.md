---
layout: post
title: "Oracle ADB export data to Other Database Tips"
category: Oracle
tags: Oracle 23c Tips
---

* content
{:toc}

Oracle ADB export data to Other Database Tips











### Export data to csv via sql


[The simplest guide to exporting data from Autonomous Database directly to Object Storage](https://blogs.oracle.com/datawarehousing/the-simplest-guide-to-exporting-data-from-autonomous-database-directly-to-object-storage)

Other data moving option

[Moving Data from Autonomous Database to Other Oracle Databases](https://docs.oracle.com/en/cloud/paas/autonomous-database/adbsa/export-data-other-database.html#GUID-529CD03E-7983-423B-A5FD-34D8B36831EC)

Steps:

```
1. Copy the object using put_object
2. Confirm with list_objects in OSS
```
[Using Oracle Autonomous Database on Shared Exadata Infrastructure](https://docs.oracle.com/en/cloud/paas/autonomous-database/adbsa/dbms-cloud.html#GUID-716F0DE7-C669-477E-8AB8-EA42E41ACB12)

```
PUT_OBJECT Procedure
This procedure is overloaded. In one form the procedure copies a file from Autonomous Database to the Cloud Object Storage. In another form the procedure copies a BLOB from Autonomous Database to the Cloud Object Storage.
```

Example:
```
BEGIN
DBMS_CLOUD.PUT_OBJECT(
credential_name => 'OBJ_STORE_CRED',
object_uri => 'https://xxxxxxxxxxxxxxxxxxxxx/ADB_ExpData.dmp',
directory_name => 'DATA_PUMP_DIR',
file_name => 'ADB_ExpData.dmp');
END;
/
```

- list objects in OSS
```
select object_name, bytes from dbms_cloud.list_objects('OBJ_STORE_CRED','https://xxxxxxx/Bucket/') where object_name like '%ADB_ExpData%';
```

- list objects in ATP datapump dir
```
SELECT * FROM table(dbms_cloud.list_files('DATA_PUMP_DIR')) WHERE object_name LIKE '%ADB_ExpData%';
```

### Reference 

Refer:

[The simplest guide to exporting data from Autonomous Database directly to Object Storage](https://blogs.oracle.com/datawarehousing/the-simplest-guide-to-exporting-data-from-autonomous-database-directly-to-object-storage)

Other data moving option

[Moving Data from Autonomous Database to Other Oracle Databases](https://docs.oracle.com/en/cloud/paas/autonomous-database/adbsa/export-data-other-database.html#GUID-529CD03E-7983-423B-A5FD-34D8B36831EC)

[Using Oracle Autonomous Database on Shared Exadata Infrastructure](https://docs.oracle.com/en/cloud/paas/autonomous-database/adbsa/dbms-cloud.html#GUID-716F0DE7-C669-477E-8AB8-EA42E41ACB12)

Have a good work&life! 2022/12 via LinHong


