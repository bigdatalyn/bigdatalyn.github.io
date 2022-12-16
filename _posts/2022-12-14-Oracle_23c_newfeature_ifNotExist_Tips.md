---
layout: post
title: "Oracle 23c New features - IF EXISTS Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - IF EXISTS and IF NOT EXISTS with CREATE, ALTER, and DROP commands Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	









### IF EXISTS

Use IF EXISTS and IF NOT EXISTS with CREATE, ALTER, and DROP commands for different object types

To ensure that the DDL statements are idempotent, the CREATE, ALTER, and DROP commands support the IF EXISTS and IF NOT EXISTS clauses. 

We can use these clauses to check if a given object exists or does not exist, and ensure that if the check fails, the command is ignored and does not generate an error. 

#### Drop table with if exists

```
HR@pdb1> select * from t1;
select * from t1
              *
ERROR at line 1:
ORA-00942: table or view does not exist


HR@pdb1> drop table t1;
drop table t1
           *
ERROR at line 1:
ORA-00942: table or view does not exist


HR@pdb1> drop table if exists t1;

Table dropped.

HR@pdb1> 
```

#### Create table with if not exists

```
HR@pdb1> select * from t1;
select * from t1
              *
ERROR at line 1:
ORA-00942: table or view does not exist


HR@pdb1> create table t1(id number);

Table created.

HR@pdb1> select * from t1;

no rows selected

HR@pdb1> create table if not exists t1(id number);

Table created.

HR@pdb1> create table if not exists t1(id varchar2(10));

Table created.

HR@pdb1> 
```

The following object types are supported for CREATE ... IF NOT EXISTS, ALTER ... IF EXISTS, and DROP ... IF EXISTS DDL statements.

[Table 9-8 Object Types Supported for CREATE, ALTER, and DROP Commands](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/adfns/sql-processing-for-application-developers.html#GUID-2B16C03D-D4D5-438B-8CFE-DFE97593C240)



### Reference 

[Oracle Database 23c / SQL Language Reference / Using IF EXISTS and IF NOT EXISTS](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/adfns/sql-processing-for-application-developers.html#GUID-3818B089-D99D-437C-862F-CBD276BDA3F1)

PostgresSQL has the same feature.
[create table](https://www.postgresql.org/docs/current/sql-createtable.html)
```
IF NOT EXISTS
Do not throw an error if a relation with the same name already exists. A notice is issued in this case. Note that there is no guarantee that the existing relation is anything like the one that would have been created.
```

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


