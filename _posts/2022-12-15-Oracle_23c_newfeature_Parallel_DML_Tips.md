---
layout: post
title: "Oracle 23c New features - Parallel DML Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - Parallel DML Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	

Oracle Database allows DML statements (INSERT, UPDATE, DELETE, and MERGE) to be executed in parallel by breaking the DML statements into mutually exclusive smaller tasks. Executing DML statements in parallel can make DSS queries, batched OLTP jobs, or any larger DML operations faster. However, parallel DML operations had a few transactional limitations. This included the touch-once restriction of a parallel DML statement, which meant that once an object is modified by a parallel DML statement, that object cannot be read or modified by subsequent statements within the same transaction.

This feature removes the touch-once restriction, you can now run parallel DMLs and any combination of statements such as queries, serial DML, and parallel DML on the same object, within the same transaction. This enhancement helps provide flexibility in ETL application development using parallel DMLs, and enables data transformation and cleansing tasks before the commit of the transaction.

You can now accelerate critical business processes using parallel DML without previous transactional constraints.









### Parallel DML

8.5.3.5 Transaction Restrictions for Parallel DML
```
To execute a DML operation in parallel, the parallel execution coordinator acquires parallel execution servers, and each parallel execution server executes a portion of the work under its own parallel process transaction.

Note the following conditions:

Each parallel execution server creates a different parallel process transaction.

If you use rollback segments instead of Automatic Undo Management, you may want to reduce contention on the rollback segments by limiting the number of parallel process transactions residing in the same rollback segment. Refer to Oracle Database SQL Language Reference for more information.

The coordinator also has its own coordinator transaction, which can have its own rollback segment. To ensure user-level transactional atomicity, the coordinator uses a two-phase commit protocol to commit the changes performed by the parallel process transactions.

If a PL/SQL procedure or block is executed in a parallel DML-enabled session, then this rule applies to statements in the procedure or block.
```

#### Test

Session 01:
```
alter session enable parallel dml;
alter session force parallel query;
alter session force parallel ddl;
create table t1 as select * from dba_objects;
select object_id,object_name,status from t1 where object_id < 5;
update t1 set status='INVALID' where object_id < 5;
update t1 set status='INVALID' where object_id < 10;
delete t1 where object_id=5;
select object_id,object_name,status from t1 where object_id < 10;

-- Before 23c, should exec commit after parallel DML statement!!! 

SYS@cdb1> select object_id,object_name,status from t1 where object_id < 10;

 OBJECT_ID OBJECT_NAME	  STATUS
---------- -------------- -------
	 9 I_FILE#_BLOCK# INVALID
	 6 C_TS#	  INVALID
	 7 I_TS#	  INVALID
	 3 I_OBJ#	  INVALID
	 2 C_OBJ#	  INVALID
	 8 C_FILE#_BLOCK# INVALID
	 4 TAB$ 	  INVALID

7 rows selected.

SYS@cdb1> 
```
Session 02:
```
select object_id,object_name,status from t1 where object_id < 10;

SYS@cdb1> select object_id,object_name,status from t1 where object_id < 10;

 OBJECT_ID OBJECT_NAME	  STATUS
---------- -------------- ------
	 8 C_FILE#_BLOCK# VALID
	 3 I_OBJ#	  VALID
	 6 C_TS#	  VALID
	 4 TAB$ 	  VALID
	 2 C_OBJ#	  VALID
	 5 CLU$ 	  VALID
	 9 I_FILE#_BLOCK# VALID
	 7 I_TS#	  VALID

8 rows selected.

SYS@cdb1> 
```

### Reference 

[8.5.3.5 Transaction Restrictions for Parallel DML](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/nfcoa/application_development.html#GUID-5252FE91-5ECB-40DD-B29F-1A05BA4BFFA9)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


