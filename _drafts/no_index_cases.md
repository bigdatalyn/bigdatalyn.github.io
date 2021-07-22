

### index column has null

Test sql:
```
create table t1 as select * from dba_objects;
create index index idx_t1_object_id on t1(object_id);
```
Index info: idx_t1_object_id
```
INDEX_NAME		       UNI VI	  T_ROWS     I_ROWS DISTINCT_KEYS  BLV LEAF_BLOCKS COLUMN_NAME		POS D N NUM_DISTINCT  NUM_NULLS
------------------------------ --- -- ---------- ---------- ------------- ---- ----------- -------------------- --- - - ------------ ----------
IDX_T1_OBJECT_ID	       N   Y	   73048     146094	    73047    1	       323 OBJECT_ID		  1   Y        73047	      1
```

object_id column is NULL(desc t1)
Hint index(t1 IDX_T1_OBJECT_ID) is also NOT useful.

```
HONG@pdb1> desc t1
 Name					   Null?    Type
 ----------------------------------------- -------- ----------------------------
 OWNER						    VARCHAR2(128)
 OBJECT_NAME					    VARCHAR2(128)
 SUBOBJECT_NAME 				    VARCHAR2(128)
 OBJECT_ID					    NUMBER
 DATA_OBJECT_ID 				    NUMBER
 OBJECT_TYPE					    VARCHAR2(23)
 CREATED					    DATE
 LAST_DDL_TIME					    DATE
 TIMESTAMP					    VARCHAR2(19)
 STATUS 					    VARCHAR2(7)
 TEMPORARY					    VARCHAR2(1)
 GENERATED					    VARCHAR2(1)
 SECONDARY					    VARCHAR2(1)
 NAMESPACE					    NUMBER
 EDITION_NAME					    VARCHAR2(128)
 SHARING					    VARCHAR2(18)
 EDITIONABLE					    VARCHAR2(1)
 ORACLE_MAINTAINED				    VARCHAR2(1)
 APPLICATION					    VARCHAR2(1)
 DEFAULT_COLLATION				    VARCHAR2(100)
 DUPLICATED					    VARCHAR2(1)
 SHARDED					    VARCHAR2(1)
 CREATED_APPID					    NUMBER
 CREATED_VSNID					    NUMBER
 MODIFIED_APPID 				    NUMBER
 MODIFIED_VSNID 				    NUMBER

HONG@pdb1>
```
Test SQL:
```
select count(*) from t1;
```

Full table scan.
```
SQL_ID	5bc0v4my7dvr5, child number 0
-------------------------------------
select count(*) from t1

Plan hash value: 3724264953

-------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |	 1 |	    |	395 (100)|	    |	   1 |00:00:00.05 |    2867 |
|   1 |  SORT AGGREGATE    |	  |	 1 |	  1 |		 |	    |	   1 |00:00:00.05 |    2867 |
|   2 |   TABLE ACCESS FULL| T1   |	 1 |  73048 |	395   (1)| 00:00:01 |	 146K|00:00:00.05 |    2867 |
-------------------------------------------------------------------------------------------------------------
```

Solution:

- alter table t1 modify(object_id not null);
if there is NULL value in this columns, it will be happened with the following error.
```
ERROR at line 1:
ORA-02296: cannot enable (HONG.) - null values found
```
and we create the following index can fix it.
- create index idx_t1_object_id0 on t1(object_id,0);

```
SQL_ID	5bc0v4my7dvr5, child number 0
-------------------------------------
select count(*) from t1

Plan hash value: 2962383769

-----------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	      | Name		  | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
-----------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT      | 		  |	 1 |	    |	101 (100)|	    |	   1 |00:00:00.09 |	372 |
|   1 |  SORT AGGREGATE       | 		  |	 1 |	  1 |		 |	    |	   1 |00:00:00.09 |	372 |
|   2 |   INDEX FAST FULL SCAN| IDX_T1_OBJECT_ID0 |	 1 |  73048 |	101   (1)| 00:00:01 |	 146K|00:00:00.05 |	372 |
-----------------------------------------------------------------------------------------------------------------------------
```

BTW, the following sql also can use index range scan while the `object_id is null`.

```
SQL_ID	7mgwd23dbyx85, child number 0
-------------------------------------
select * from t1 where object_id is null

Plan hash value: 3740611932

-------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			    | Name		| Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time	| Buffers |
-------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		    |			|      1 |	  |	4 (100)|	  |	 2 |00:00:00.01 |	5 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1		|      1 |	1 |	4   (0)| 00:00:01 |	 2 |00:00:00.01 |	5 |
|*  2 |   INDEX RANGE SCAN		    | IDX_T1_OBJECT_ID0 |      1 |	1 |	2   (0)| 00:00:01 |	 2 |00:00:00.01 |	3 |
-------------------------------------------------------------------------------------------------------------------------------------------
```

### varchar2_column=:number_var

Test sql:

```
create table test (object_id number,data_object_id varchar2(30));
insert into test select object_id,data_object_id from dba_objects;
-- 73052 rows created.
commit;
create index idx_test_data_object_id on test(data_object_id);
```

data_object_id -> varchar2(30)

```
var b1 number;
exec :b1 := 24;
select * from test where data_object_id = :b1;

 OBJECT_ID DATA_OBJECT_ID
---------- ------------------------------
	24 24

------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |	 |	1 |	   |	35 (100)|	   |	  1 |00:00:00.01 |     123 |
|*  1 |  TABLE ACCESS FULL| TEST |	1 |	 1 |	35   (3)| 00:00:01 |	  1 |00:00:00.01 |     123 |
------------------------------------------------------------------------------------------------------------

Peeked Binds (identified by position):
--------------------------------------

   1 - :1 (NUMBER): 24

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(TO_NUMBER("DATA_OBJECT_ID")=:B1)
```

Check the filter:
```
filter(TO_NUMBER("DATA_OBJECT_ID")=:B1)
```

Solution:
```
create index idx_test_data_object_id_fun on test(TO_NUMBER(data_object_id));
```

```
SQL_ID	3ka4wwp34hcp4, child number 0
-------------------------------------
select * from test where data_object_id = :b1

Plan hash value: 2595772723

-----------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			    | Name			  | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
-----------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		    |				  |	 1 |	    |	  2 (100)|	    |	   1 |00:00:00.01 |	  4 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| TEST			  |	 1 |	  1 |	  2   (0)| 00:00:01 |	   1 |00:00:00.01 |	  4 |
|*  2 |   INDEX RANGE SCAN		    | IDX_TEST_DATA_OBJECT_ID_FUN |	 1 |	  1 |	  1   (0)| 00:00:01 |	   1 |00:00:00.01 |	  3 |
-----------------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / TEST@SEL$1
   2 - SEL$1 / TEST@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX_RS_ASC(@"SEL$1" "TEST"@"SEL$1" "IDX_TEST_DATA_OBJECT_ID_FUN")
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "TEST"@"SEL$1")
      END_OUTLINE_DATA
  */

Peeked Binds (identified by position):
--------------------------------------

   1 - :1 (NUMBER): 24

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("TEST"."SYS_NC00003$"=:B1)
```
