---
layout: post
title: "Oracle 19c estimate index size Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 19c estimate index size Tips







### estimate index size simple way

Using the following method. (11g new feature)

```sql
explain plan for create index ...
set linesize 300
select * from table(dbms_xplan.display);
```

Sample
```sql
HONG@pdb1> create table test_index as select * from dba_objects;

Table created.

HONG@pdb1> desc test_index
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 OWNER                                              VARCHAR2(128)
 OBJECT_NAME                                        VARCHAR2(128)
 SUBOBJECT_NAME                                     VARCHAR2(128)
 OBJECT_ID                                          NUMBER
 DATA_OBJECT_ID                                     NUMBER
 OBJECT_TYPE                                        VARCHAR2(23)
 CREATED                                            DATE
 LAST_DDL_TIME                                      DATE
 TIMESTAMP                                          VARCHAR2(19)
 STATUS                                             VARCHAR2(7)
 TEMPORARY                                          VARCHAR2(1)
 GENERATED                                          VARCHAR2(1)
 SECONDARY                                          VARCHAR2(1)
 NAMESPACE                                          NUMBER
 EDITION_NAME                                       VARCHAR2(128)
 SHARING                                            VARCHAR2(18)
 EDITIONABLE                                        VARCHAR2(1)
 ORACLE_MAINTAINED                                  VARCHAR2(1)
 APPLICATION                                        VARCHAR2(1)
 DEFAULT_COLLATION                                  VARCHAR2(100)
 DUPLICATED                                         VARCHAR2(1)
 SHARDED                                            VARCHAR2(1)
 CREATED_APPID                                      NUMBER
 CREATED_VSNID                                      NUMBER
 MODIFIED_APPID                                     NUMBER
 MODIFIED_VSNID                                     NUMBER

HONG@pdb1> explain plan for create index idx_test_index_mul on test_index(owner,object_name,object_type,created,status);

Explained.

HONG@pdb1> set linesize 300
HONG@pdb1> select * from table(dbms_xplan.display);

PLAN_TABLE_OUTPUT
---------------------------------------------------------------------------------------------
Plan hash value: 1182439314

---------------------------------------------------------------------------------------------
| Id  | Operation              | Name               | Rows  | Bytes | Cost (%CPU)| Time     |
---------------------------------------------------------------------------------------------
|   0 | CREATE INDEX STATEMENT |                    | 73054 |  4637K|   528   (1)| 00:00:01 |
|   1 |  INDEX BUILD NON UNIQUE| IDX_TEST_INDEX_MUL |       |       |            |          |
|   2 |   SORT CREATE INDEX    |                    | 73054 |  4637K|            |          |
|   3 |    TABLE ACCESS FULL   | TEST_INDEX         | 73054 |  4637K|   395   (1)| 00:00:01 |
---------------------------------------------------------------------------------------------


PLAN_TABLE_OUTPUT
---------------------------------------------------------------------------------------------
Note
-----
   - estimated index size: 7340K bytes

14 rows selected.

HONG@pdb1> 
```

-> estimated index size: 7340K bytes

### dbms_space.create_index_cost

Prepare test table
```sql
HONG@pdb1> create table test (a NUMBER (10) , b VARCHAR2 (30) ,c VARCHAR2 (30), d date ) tablespace USERS pctfree 10;

Table created.

HONG@pdb1> 
BEGIN
  2    FOR i IN 1..100000 LOOP
  3    INSERT INTO test VALUES (9999999999,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' ,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',sysdate);
  4    END LOOP;
  5   END;
  6  /

PL/SQL procedure successfully completed.

HONG@pdb1>
HONG@pdb1>  exec DBMS_STATS.GATHER_TABLE_STATS (ownname=>'hong',tabname=>'test',estimate_percent=>100,block_sample=>true,method_opt=>'FOR ALL COLUMNS size 254');

PL/SQL procedure successfully completed.

HONG@pdb1> 
```

- create index test_indx on test (a,b) tablespace users

The estimated index size is the following output.

```sql
HONG@pdb1> set serveroutput on
HONG@pdb1> 
declare
  2     l_used_bytes number;
  3     l_alloc_bytes number;
  4  begin
  5     dbms_space.create_index_cost (
  6        ddl => 'create index test_indx on test (a,b) tablespace users',
  7        used_bytes => l_used_bytes,
  8        alloc_bytes => l_alloc_bytes
  9     );
 10     dbms_output.put_line ('Used Bytes      = '||l_used_bytes);
 11     dbms_output.put_line ('Allocated Bytes = '||l_alloc_bytes);
 12  end;
 13  / 
Used Bytes      = 3800000
Allocated Bytes = 6291456

PL/SQL procedure successfully completed.

HONG@pdb1> 

HONG@pdb1> explain plan for create index test_indx on test (a,b) tablespace users;

Explained.

HONG@pdb1> set linesize 300
HONG@pdb1> select * from table(dbms_xplan.display);

PLAN_TABLE_OUTPUT

Plan hash value: 776902868

------------------------------------------------------------------------------------
| Id  | Operation              | Name      | Rows  | Bytes | Cost (%CPU)| Time     |
------------------------------------------------------------------------------------
|   0 | CREATE INDEX STATEMENT |           |   100K|  3710K|   459   (1)| 00:00:01 |
|   1 |  INDEX BUILD NON UNIQUE| TEST_INDX |       |       |            |          |
|   2 |   SORT CREATE INDEX    |           |   100K|  3710K|            |          |
|   3 |    TABLE ACCESS FULL   | TEST      |   100K|  3710K|   342   (1)| 00:00:01 |
------------------------------------------------------------------------------------


PLAN_TABLE_OUTPUT

Note
-----
   - estimated index size: 6291K bytes

14 rows selected.

HONG@pdb1>

HONG@pdb1> create index test_indx on test (a,b) tablespace users
  2  ;

Index created.

HONG@pdb1> select BYTES,SEGMENT_TYPE from user_segments where SEGMENT_NAME='TEST_INDX';

     BYTES SEGMENT_TYPE
---------- ------------------
   6291456 INDEX

HONG@pdb1> 

```

Index size is around 6 MB.


### Reference

How to Estimate the Size of Tables and Indexes Before Being Created and Populated in the Database? (Doc ID 1585326.1)	


Have a good work&life! 2021/07 via LinHong
