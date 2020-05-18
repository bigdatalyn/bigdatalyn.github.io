---
layout: post
title: "Oracle Parallel Tips"
category: Oracle
tags: Oracle Parallel Tips 
---

* content
{:toc}

Oracle Parallel Tips



### Parallel DML 使用注意点

语句:
```sql
ALTER SESSION ENABLE PARALLEL DML;
```

Oracle Parallel DML的限制

- 不支持有trigger的表,在上面做PDML，能成功，但忽略了并发性；
- 不支持某些约束，例如self-referential integrity。原因是PDML分为多个独立的session去修改数据，无法保证某些完整性；容易引起死锁已经其他锁问题；
- 一个session使用了PDML，在commit/rollback之前，另一个session无法再使用PDML；
- Advanced replication不支持（因为使用了trigger）；
- Deferred constraints（约束的deferred模式指修改操作在提交时才去验证是否满足约束条件）不支持；
- 分布式事务不支持；
- Clustered tables不支持；
- 当违反这些限制，PDML要么报错，要么忽略并行度；




Restrictions on Parallel DML

```
There are several restrictions that apply to parallel DM.

The following restrictions apply to parallel DML (including direct-path INSERT):

    Intra-partition parallelism for UPDATE, MERGE, and DELETE operations require that the COMPATIBLE initialization parameter be set to 9.2 or greater.

    The INSERT VALUES statement is never executed in parallel.

    A transaction can contain multiple parallel DML statements that modify different tables, but after a parallel DML statement modifies a table, no subsequent serial or parallel statement (DML or query) can access the same table again in that transaction.

        This restriction also exists after a serial direct-path INSERT statement: no subsequent SQL statement (DML or query) can access the modified table during that transaction.

        Queries that access the same table are allowed before a parallel DML or direct-path INSERT statement, but not after.

        Any serial or parallel statements attempting to access a table that has been modified by a parallel UPDATE, DELETE, or MERGE, or a direct-path INSERT during the same transaction are rejected with an error message.

    Parallel DML operations cannot be done on tables with triggers.

    Replication functionality is not supported for parallel DML.

    Parallel DML cannot occur in the presence of certain constraints: self-referential integrity, delete cascade, and deferred integrity. In addition, for direct-path INSERT, there is no support for any referential integrity.

    Parallel DML can be done on tables with object columns provided the object columns are not accessed.

    Parallel DML can be done on tables with LOB columns provided the table is partitioned. However, intra-partition parallelism is not supported.

    For non-partitioned tables with LOB columns, parallel INSERT operations are supported provided that the LOB columns are declared as SecureFiles LOBs. Parallel UPDATE, DELETE, and MERGE operations on such tables are not supported.

    A DML operation cannot be executed in parallel if it is in a distributed transaction or if the DML or the query operation is on a remote object.

    Clustered tables are not supported.

    Parallel UPDATE, DELETE, and MERGE operations are not supported for temporary tables.

    Parallel DML is not supported on a table with bitmap indexes if the table is not partitioned.

```


### Reference

NOTE:2172287.1 - How to tell if the parallel or single loop purging procedure is running

NOTE:2171891.1 - How to run and interpret Serial Purge debug output in 12c/CS

Parallel Dml On Remote Host Not Working Even Calling A Procedure (Doc ID 1231725.1)	

[VLDB and Partitioning Guide / Types of Parallelism](https://docs.oracle.com/en/database/oracle/oracle-database/19/vldbg/types-parallelism.html)

To be continue...

Have a good work&life! 2020/05 via LinHong


