---
layout: post
title: "Oracle SQLT Tips"
category: Oracle
tags: Oracle SQLcl Tips
---

* content
{:toc}

Oracle SQLcl Tips

### Generating Table DDL in Oracle Database


Table DDL (and a lot of other DDL for that matter) can be generated using DBMS_METADATA. 
This package has been part of the Oracle database for a long time now and it is documented in the PL/SQL Packages and Types Guide. 

DBMS_METADTA is very useful, but it requires a bit of code. 
And now SQLcl provides a shortcut to using the DBMS_METADATA invoking the PL/SQL API.

```
help
show ddl
ddl <schema>.<object_name>
set ddl storage off
set ddl emit_schema off
set ddl segment_attributes off
```








Sample:
```sql
[oracle@ol8-19c-ee ~]$ which sql
/u01/app/oracle/product/19.0.0/dbhome_1/bin/sql
[oracle@ol8-19c-ee ~]$ sql -version
SQLcl: Release 19.1.0.0 Production
[oracle@ol8-19c-ee ~]$ sql hong/oracle@orclpdb

SQLcl: Release 19.1 Production on Fri Jun 10 11:15:36 2022

Copyright (c) 1982, 2022, Oracle.  All rights reserved.

Last Successful login time: Fri Jun 10 2022 11:15:40 +08:00

Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

11:16:14 HONG@orclpdb> ddl t1

  CREATE TABLE "HONG"."T1" 
   (	"OWNER" VARCHAR2(128), 
	"OBJECT_NAME" VARCHAR2(128), 
	"SUBOBJECT_NAME" VARCHAR2(128), 
	"OBJECT_ID" NUMBER, 
	"DATA_OBJECT_ID" NUMBER, 
	"OBJECT_TYPE" VARCHAR2(23), 
	"CREATED" DATE, 
	"LAST_DDL_TIME" DATE, 
	"TIMESTAMP" VARCHAR2(19), 
	"STATUS" VARCHAR2(7), 
	"TEMPORARY" VARCHAR2(1), 
	"GENERATED" VARCHAR2(1), 
	"SECONDARY" VARCHAR2(1), 
	"NAMESPACE" NUMBER, 
	"EDITION_NAME" VARCHAR2(128), 
	"SHARING" VARCHAR2(18), 
	"EDITIONABLE" VARCHAR2(1), 
	"ORACLE_MAINTAINED" VARCHAR2(1), 
	"APPLICATION" VARCHAR2(1), 
	"DEFAULT_COLLATION" VARCHAR2(100), 
	"DUPLICATED" VARCHAR2(1), 
	"SHARDED" VARCHAR2(1), 
	"CREATED_APPID" NUMBER, 
	"CREATED_VSNID" NUMBER, 
	"MODIFIED_APPID" NUMBER, 
	"MODIFIED_VSNID" NUMBER
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS NOLOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
11:17:01 HONG@orclpdb> show ddl
STORAGE : ON
INHERIT : ON
EMIT_SCHEMA : ON
SQLTERMINATOR : ON
OID : ON
SPECIFICATION : ON
TABLESPACE : ON
SIZE_BYTE_KEYWORD : ON
PRETTY : ON
REF_CONSTRAINTS : ON
FORCE : ON
PARTITIONING : ON
CONSTRAINTS : ON
INSERT : ON
BODY : ON
CONSTRAINTS_AS_ALTER : ON
SEGMENT_ATTRIBUTES : ON
11:17:24 HONG@orclpdb> set ddl storage off
DDL Option STORAGE off
11:17:32 HONG@orclpdb> set ddl emit_schema off
DDL Option EMIT_SCHEMA off
11:17:43 HONG@orclpdb> set ddl segment_attributes off
DDL Option SEGMENT_ATTRIBUTES off
11:17:51 HONG@orclpdb> ddl hong.t1

  CREATE TABLE "T1" 
   (	"OWNER" VARCHAR2(128), 
	"OBJECT_NAME" VARCHAR2(128), 
	"SUBOBJECT_NAME" VARCHAR2(128), 
	"OBJECT_ID" NUMBER, 
	"DATA_OBJECT_ID" NUMBER, 
	"OBJECT_TYPE" VARCHAR2(23), 
	"CREATED" DATE, 
	"LAST_DDL_TIME" DATE, 
	"TIMESTAMP" VARCHAR2(19), 
	"STATUS" VARCHAR2(7), 
	"TEMPORARY" VARCHAR2(1), 
	"GENERATED" VARCHAR2(1), 
	"SECONDARY" VARCHAR2(1), 
	"NAMESPACE" NUMBER, 
	"EDITION_NAME" VARCHAR2(128), 
	"SHARING" VARCHAR2(18), 
	"EDITIONABLE" VARCHAR2(1), 
	"ORACLE_MAINTAINED" VARCHAR2(1), 
	"APPLICATION" VARCHAR2(1), 
	"DEFAULT_COLLATION" VARCHAR2(100), 
	"DUPLICATED" VARCHAR2(1), 
	"SHARDED" VARCHAR2(1), 
	"CREATED_APPID" NUMBER, 
	"CREATED_VSNID" NUMBER, 
	"MODIFIED_APPID" NUMBER, 
	"MODIFIED_VSNID" NUMBER
   ) ;
11:18:01 HONG@orclpdb> 

```

Indexed tables (including primary keys) would have seen the indexes' DDL printed after the table.


### Reference

[PL/SQL Packages and Types Guide](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/DBMS_METADATA.html)

Have a good work&life! 2022/06 via LinHong

