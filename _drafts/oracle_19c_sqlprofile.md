
HONG@pdb1> drop table t1 purge;

Table dropped.

HONG@pdb1> create table t1 as select * from dba_objects;

Table created.

HONG@pdb1> desc t1;
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

HONG@pdb1> select count(*) from t1 where object_id is null;

  COUNT(*)
----------
         1

HONG@pdb1> create index idx_t1_object_id on t1(object_id,0);

Index created.

HONG@pdb1> exec dbms_stats.gather_table_stats('hong','t1');

PL/SQL procedure successfully completed.

HONG@pdb1> 

HONG@pdb1> @scripts/colfmt
COL "OWNER"                          FOR A5
COL "OBJECT_NAME"                    FOR A11
COL "OBJECT_ID"                      FOR 999999999
HONG@pdb1> select /* no_index(t1 idx_t1_object_id) */ owner,object_name,object_id from t1 where object_id=73685;

OWNER OBJECT_NAME  OBJECT_ID
----- ----------- ----------
HONG  EMPLOYEE         73685

HONG@pdb1> 