dba_objects 的 object_id 字段容许为NULL

对象内容如下：
```
HONG@pdb1> select owner,object_name,object_type from dba_objects where object_id is null;

OWNER OBJECT_NAME OBJECT_TYPE
----- ----------- -------------
SYS   SYS_HUB     DATABASE LINK

HONG@pdb1> 
```
这个对象是 12.2.0.1 之后有的


How to Drop and Create SYS_HUB (Database Link) ? (Doc ID 2442938.1)

```
SYS@cdb1> select owner,object_name,object_type from dba_objects where object_id is null;

OWNER OBJECT_NAME      OBJECT_TYPE
----- ---------------- ------------
SYS   SYS_HUB          DATABASE LINK

SYS@cdb1> drop database link sys_hub ;

Database link dropped.

SYS@cdb1> select owner,object_name,object_type from dba_objects where object_id is null;

no rows selected

SYS@cdb1> 

```
重新创建：

```
SYS@cdb1>  select owner, object_name, object_type, status, created, last_ddl_time from dba_objects where object_name = 'DBMS_PQ_INTERNAL' and object_type in ('PACKAGE', 'PACKAGE BODY');

OWNER OBJECT_NAME      OBJECT_TYPE  STATUS CREATED   LAST_DDL_TIME
----- ---------------- ------------ ------ --------- -------------
SYS   DBMS_PQ_INTERNAL PACKAGE      VALID  17-APR-19 17-APR-19
SYS   DBMS_PQ_INTERNAL PACKAGE BODY VALID  17-APR-19 17-APR-19

SYS@cdb1> execute dbms_pq_internal.create_db_link_for_hub ;

PL/SQL procedure successfully completed.

SYS@cdb1> select owner,object_name,object_type from dba_objects where object_id is null;

OWNER OBJECT_NAME      OBJECT_TYPE
----- ---------------- ------------
SYS   SYS_HUB          DATABASE LINK

SYS@cdb1> 

```


