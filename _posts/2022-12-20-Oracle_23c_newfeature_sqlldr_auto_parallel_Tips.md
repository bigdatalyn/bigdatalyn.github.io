---
layout: post
title: "Oracle 23c New features - Automatic Parallel Direct Path Load Using SQL*Loader
 Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - Automatic Parallel Direct Path Load Using SQL*Loader Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	

The SQL*Loader client can automatically start a parallel direct path load for data without dividing the data into separate files and starting multiple SQL*Loader clients. This feature prevents fragmentation into many small data extents. The data doesn't need to be resident on the database server. Cloud users can employ this feature to load data in parallel without having to move data on to the cloud system if there is sufficient network bandwidth.

SQL*Loader can load data faster and easier into Oracle Database with automatic parallelism and more efficient data storage.









Starting with Oracle Database 23c, you no longer need to divide data files into multiple smaller files for SQL*Loader direct path or conventional parallel loading. The SQL*Loader client can perform parallel loading automatically.

Loading data from large tables in parallel can save you time and effort. Depending on the distance from your source and target databases, and the system resources you are able to leverage with parallel threads, the load times for tables can be significantly improved with parallel loads.

In releases before Oracle Database 23c, enabling parallel loads with SQL*Loader (sqlldr) of large tables to reduce load times required you to break up a large table into separate parts, and then run SQL*Loader multiple times for each section of the table you wanted to load, using the PARALLEL=TRUE command option each time. In addition to requiring manual effort, each command had to be run correctly. Starting with Oracle Database 23c, you can perform the same task automatically by running SQL*Loader with just one command, setting the degree of parallelism with the DEGREE_OF_PARALLELISM parameter. The PARALLEL=TRUE option indicates that loading on the server should be done so multiple processes can load the same segments in parallel. The DEGREE_OF_PARALLELISM parameter sets the number of sqlldr client loader threads. Also, you can use this same capability with the SQL*Loader Instant Client for Oracle Database 23c to perform the same automatic parallel loads to earlier releases of Oracle Database. Automatic parallel loading is supported for a single table only. Multiple INTO clauses are not supported.


### Sample

Example 11-3 Automatic Parallel Loading of a Single Table
```
 sqlldr scott/tiger t.dat direct=true degree_of_parallelism=5
```

Assuming the number of shards is 10, the following command results in SQL*Loader using 2 threads for each shard’s table:
```
sqlldr scott/tiger t.dat degree_of_parallelism=20 parallel=true skip_index_maintenance=true
```

### Reference 


[Automatic Parallel Load of Table Data with SQL*Loader](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/sutil/oracle-sql-loader-conventional-and-direct-loads.html#GUID-7487384F-4561-4E2E-9851-E8699978F57D)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


