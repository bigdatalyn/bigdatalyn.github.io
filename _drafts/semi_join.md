


create table a as select * from dba_objects;
insert into a select * from dba_objects;
insert into a select * from dba_objects;
insert into a select * from dba_objects;
insert into a select * from dba_objects;
commit;
create table b as select * from dba_objects where rownum < 101;

HONG@pdb1> select count(*) from a;

  COUNT(*)
----------
    365204

HONG@pdb1>
HONG@pdb1> select count(*) from b;

  COUNT(*)
----------
       100

HONG@pdb1>

select * from a where exists (select null from b where a.object_id = b.object_id);
select * from a where a.object_id in (select object_id from b);
Elapsed: 00:00:00.30
7162  consistent gets


HONG@pdb1> select * from a where a.object_id in (select object_id from b);

500 rows selected.

Elapsed: 00:00:00.30

Execution Plan
----------------------------------------------------------
Plan hash value: 2016728674

-----------------------------------------------------------------------------
| Id  | Operation	     | Name | Rows  | Bytes | Cost (%CPU)| Time     |
-----------------------------------------------------------------------------
|   0 | SELECT STATEMENT     |	    |	100 | 13600 |	399   (1)| 00:00:01 |
|*  1 |  HASH JOIN RIGHT SEMI|	    |	100 | 13600 |	399   (1)| 00:00:01 |
|   2 |   TABLE ACCESS FULL  | B    |	100 |	400 |	  3   (0)| 00:00:01 |
|   3 |   TABLE ACCESS FULL  | A    | 73040 |  9415K|	396   (1)| 00:00:01 |
-----------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - access("A"."OBJECT_ID"="OBJECT_ID")


Statistics
----------------------------------------------------------
	  0  recursive calls
	  0  db block gets
       7162  consistent gets
	  0  physical reads
	  0  redo size
      29716  bytes sent via SQL*Net to client
	787  bytes received via SQL*Net from client
	 35  SQL*Net roundtrips to/from client
	  0  sorts (memory)
	  0  sorts (disk)
	500  rows processed

HONG@pdb1>





alter index IDX_A_OBJECT_ID invisible;
alter index IDX_B_OBJECT_ID visible;

----------------------------------------------------------------------------------------
| Id  | Operation	     | Name	       | Rows  | Bytes | Cost (%CPU)| Time     |
----------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT     |		       |   100 | 13600 |   397	 (1)| 00:00:01 |
|*  1 |  HASH JOIN RIGHT SEMI|		       |   100 | 13600 |   397	 (1)| 00:00:01 |
|   2 |   INDEX FULL SCAN    | IDX_B_OBJECT_ID |   100 |   400 |     1	 (0)| 00:00:01 |
|   3 |   TABLE ACCESS FULL  | A	       | 73040 |  9415K|   396	 (1)| 00:00:01 |
----------------------------------------------------------------------------------------

alter index IDX_A_OBJECT_ID visible;
alter index IDX_B_OBJECT_ID visible;

------------------------------------------------------------------------------------------------
| Id  | Operation		     | Name	       | Rows  | Bytes | Cost (%CPU)| Time     |
------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	     |		       |   100 | 13600 |   353	 (1)| 00:00:01 |
|   1 |  NESTED LOOPS		     |		       |   100 | 13600 |   353	 (1)| 00:00:01 |
|   2 |   NESTED LOOPS		     |		       |   250 | 13600 |   353	 (1)| 00:00:01 |
|   3 |    SORT UNIQUE		     |		       |   100 |   400 |     1	 (0)| 00:00:01 |
|   4 |     INDEX FULL SCAN	     | IDX_B_OBJECT_ID |   100 |   400 |     1	 (0)| 00:00:01 |
|*  5 |    INDEX RANGE SCAN	     | IDX_A_OBJECT_ID |     5 |       |     2	 (0)| 00:00:01 |
|   6 |   TABLE ACCESS BY INDEX ROWID| A	       |     1 |   132 |     8	 (0)| 00:00:01 |
------------------------------------------------------------------------------------------------


HONG@pdb1> select * from a where a.object_id in (select object_id from b);

500 rows selected.

Elapsed: 00:00:00.33

Execution Plan
----------------------------------------------------------
Plan hash value: 2039975856

----------------------------------------------------------------------------------------
| Id  | Operation	     | Name	       | Rows  | Bytes | Cost (%CPU)| Time     |
----------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT     |		       |   100 | 13600 |   397	 (1)| 00:00:01 |
|*  1 |  HASH JOIN RIGHT SEMI|		       |   100 | 13600 |   397	 (1)| 00:00:01 |
|   2 |   INDEX FULL SCAN    | IDX_B_OBJECT_ID |   100 |   400 |     1	 (0)| 00:00:01 |
|   3 |   TABLE ACCESS FULL  | A	       | 73040 |  9415K|   396	 (1)| 00:00:01 |
----------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - access("A"."OBJECT_ID"="OBJECT_ID")


Statistics
----------------------------------------------------------
	 77  recursive calls
	  0  db block gets
       7239  consistent gets
	  0  physical reads
	  0  redo size
      29716  bytes sent via SQL*Net to client
	787  bytes received via SQL*Net from client
	 35  SQL*Net roundtrips to/from client
	 12  sorts (memory)
	  0  sorts (disk)
	500  rows processed

HONG@pdb1>










HONG@pdb1> select /*+ use_nl(b,a) leading(b) */ * from a where a.object_id in (select object_id from b);

500 rows selected.

Elapsed: 00:00:09.06

Execution Plan
----------------------------------------------------------
Plan hash value: 3088647497

----------------------------------------------------------------------------
| Id  | Operation	    | Name | Rows  | Bytes | Cost (%CPU)| Time	   |
----------------------------------------------------------------------------
|   0 | SELECT STATEMENT    |	   |   100 | 13600 | 19745   (1)| 00:00:01 |
|   1 |  NESTED LOOPS	    |	   |   100 | 13600 | 19745   (1)| 00:00:01 |
|   2 |   SORT UNIQUE	    |	   |   100 |   400 |	 3   (0)| 00:00:01 |
|   3 |    TABLE ACCESS FULL| B    |   100 |   400 |	 3   (0)| 00:00:01 |
|*  4 |   TABLE ACCESS FULL | A    |	 1 |   132 |   395   (1)| 00:00:01 |
----------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   4 - filter("A"."OBJECT_ID"="OBJECT_ID")

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1 (N - Unresolved (1))
---------------------------------------------------------------------------

   1 -	SEL$5DA710D3
	 N -  use_nl(b,a)


Statistics
----------------------------------------------------------
	  1  recursive calls
	  0  db block gets
     712637  consistent gets
	  0  physical reads
	  0  redo size
      15981  bytes sent via SQL*Net to client
	817  bytes received via SQL*Net from client
	 35  SQL*Net roundtrips to/from client
	  1  sorts (memory)
	  0  sorts (disk)
	500  rows processed

HONG@pdb1>


//////查找query block命名
explain plan for select * from a where a.object_id in (select object_id from b);
select * from table(dbms_xplan.display(null,null,'all'));

HONG@pdb1> explain plan for select * from a where a.object_id in (select object_id from b);

Explained.

HONG@pdb1> select * from table(dbms_xplan.display(null,null,'all'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------
Plan hash value: 2016728674

-----------------------------------------------------------------------------
| Id  | Operation	     | Name | Rows  | Bytes | Cost (%CPU)| Time     |
-----------------------------------------------------------------------------
|   0 | SELECT STATEMENT     |	    |	100 | 13600 |	399   (1)| 00:00:01 |
|*  1 |  HASH JOIN RIGHT SEMI|	    |	100 | 13600 |	399   (1)| 00:00:01 |
|   2 |   TABLE ACCESS FULL  | B    |	100 |	400 |	  3   (0)| 00:00:01 |
|   3 |   TABLE ACCESS FULL  | A    | 73040 |  9415K|	396   (1)| 00:00:01 |
-----------------------------------------------------------------------------


PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------
Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$5DA710D3
   2 - SEL$5DA710D3 / B@SEL$2
   3 - SEL$5DA710D3 / A@SEL$1

////// 子查询中用query block name

select /*+ use_nl(A,B@SEL$2) leading(B@SEL$2) */ * from a where a.object_id in (select object_id from b);

Elapsed: 00:00:10.14

Execution Plan
----------------------------------------------------------
Plan hash value: 3088647497

----------------------------------------------------------------------------
| Id  | Operation	    | Name | Rows  | Bytes | Cost (%CPU)| Time	   |
----------------------------------------------------------------------------
|   0 | SELECT STATEMENT    |	   |   100 | 13600 | 19745   (1)| 00:00:01 |
|   1 |  NESTED LOOPS	    |	   |   100 | 13600 | 19745   (1)| 00:00:01 |
|   2 |   SORT UNIQUE	    |	   |   100 |   400 |	 3   (0)| 00:00:01 |
|   3 |    TABLE ACCESS FULL| B    |   100 |   400 |	 3   (0)| 00:00:01 |
|*  4 |   TABLE ACCESS FULL | A    |	 1 |   132 |   395   (1)| 00:00:01 |
----------------------------------------------------------------------------

select /*+ use_hash(A,B@SEL$2) leading(B@SEL$2) */ * from a where a.object_id in (select object_id from b);

Elapsed: 00:00:00.35

Execution Plan
----------------------------------------------------------
Plan hash value: 334032274

----------------------------------------------------------------------------
| Id  | Operation	    | Name | Rows  | Bytes | Cost (%CPU)| Time	   |
----------------------------------------------------------------------------
|   0 | SELECT STATEMENT    |	   |   100 | 13600 |   400   (1)| 00:00:01 |
|*  1 |  HASH JOIN	    |	   |   100 | 13600 |   400   (1)| 00:00:01 |
|   2 |   SORT UNIQUE	    |	   |   100 |   400 |	 3   (0)| 00:00:01 |
|   3 |    TABLE ACCESS FULL| B    |   100 |   400 |	 3   (0)| 00:00:01 |
|   4 |   TABLE ACCESS FULL | A    | 73040 |  9415K|   396   (1)| 00:00:01 |
----------------------------------------------------------------------------



alter index IDX_B_OBJECT_ID visible;


HONG@pdb1> select /*+ use_nl(a,b) leading(b@qb_b) */ * from a where a.object_id in (select /*+ qb_name(qb_b)  */object_id from b);

500 rows selected.

Elapsed: 00:00:00.02

Execution Plan
----------------------------------------------------------
Plan hash value: 885089701

------------------------------------------------------------------------------------------------
| Id  | Operation		     | Name	       | Rows  | Bytes | Cost (%CPU)| Time     |
------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	     |		       |   100 | 13600 |   404	 (1)| 00:00:01 |
|   1 |  NESTED LOOPS		     |		       |   100 | 13600 |   404	 (1)| 00:00:01 |
|   2 |   NESTED LOOPS		     |		       |   250 | 13600 |   404	 (1)| 00:00:01 |
|   3 |    SORT UNIQUE		     |		       |   100 |   400 |     3	 (0)| 00:00:01 |
|   4 |     TABLE ACCESS FULL	     | B	       |   100 |   400 |     3	 (0)| 00:00:01 |
|*  5 |    INDEX RANGE SCAN	     | IDX_A_OBJECT_ID |     5 |       |     2	 (0)| 00:00:01 |
|   6 |   TABLE ACCESS BY INDEX ROWID| A	       |     1 |   132 |     8	 (0)| 00:00:01 |
------------------------------------------------------------------------------------------------



select * from b where b.object_id in (select object_id from a);


HONG@pdb1> select * from b where b.object_id in (select object_id from a);

100 rows selected.

Elapsed: 00:00:00.01

Execution Plan
----------------------------------------------------------
Plan hash value: 192581885

--------------------------------------------------------------------------------------
| Id  | Operation	   | Name	     | Rows  | Bytes | Cost (%CPU)| Time     |
--------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |		     |	 100 | 10400 |	 203   (0)| 00:00:01 |
|   1 |  NESTED LOOPS SEMI |		     |	 100 | 10400 |	 203   (0)| 00:00:01 |
|   2 |   TABLE ACCESS FULL| B		     |	 100 |	9900 |	   3   (0)| 00:00:01 |
|*  3 |   INDEX RANGE SCAN | IDX_A_OBJECT_ID | 73040 |	 356K|	   2   (0)| 00:00:01 |
--------------------------------------------------------------------------------------

HONG@pdb1> select /*+ use_hash(b,a@ql_a) leading(b) */ * from b where b.object_id in (select /*+ qb_name(ql_a) */ object_id from a);

100 rows selected.

Elapsed: 00:00:00.01

Execution Plan
----------------------------------------------------------
Plan hash value: 84786044

-----------------------------------------------------------------------------------------
| Id  | Operation	      | Name		| Rows	| Bytes | Cost (%CPU)| Time	|
-----------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT      | 		|   100 | 10400 |   225   (1)| 00:00:01 |
|*  1 |  HASH JOIN SEMI       | 		|   100 | 10400 |   225   (1)| 00:00:01 |
|   2 |   TABLE ACCESS FULL   | B		|   100 |  9900 |     3   (0)| 00:00:01 |
|   3 |   INDEX FAST FULL SCAN| IDX_A_OBJECT_ID | 73040 |   356K|   222   (1)| 00:00:01 |
-----------------------------------------------------------------------------------------


HONG@pdb1> select /*+ use_nl(b,a@qb_a) leading(b) index_ffs(a@qb_a IDX_A_OBJECT_ID) */ * from b where b.object_id in (select /*+ qb_name(qb_a) */ object_id from a);

100 rows selected.

Elapsed: 00:00:00.01

Execution Plan
----------------------------------------------------------
Plan hash value: 1734297940

-----------------------------------------------------------------------------------------
| Id  | Operation	      | Name		| Rows	| Bytes | Cost (%CPU)| Time	|
-----------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT      | 		|   100 | 10400 | 22090   (2)| 00:00:01 |
|   1 |  NESTED LOOPS SEMI    | 		|   100 | 10400 | 22090   (2)| 00:00:01 |
|   2 |   TABLE ACCESS FULL   | B		|   100 |  9900 |     3   (0)| 00:00:01 |
|*  3 |   INDEX FAST FULL SCAN| IDX_A_OBJECT_ID | 73040 |   356K|   221   (1)| 00:00:01 |
-----------------------------------------------------------------------------------------



