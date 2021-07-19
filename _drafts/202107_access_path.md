/////////////////////////////////////////////////////////

1.全表扫
多块读： db file scattered read 如果有并行：direct path read

一般操作系统，一次IO大概读取1MB数据-》 1MB = 8Kblock * 128（db_file_multiblock_read_count)

如果表发生了大事物（如：update大量数据）
并发的另外一个session进行全表扫，会发生单块读的等待事件，原因是 这个session需要从 UNDO 读取部分数据。

针对这种大批量更新的大事务，为了减少对UNDO使用，建议使用批量游标处理。

/////////////////////////////////////////////////////////

Table ACCESS by user rowid
直接用rowid获取数据。单块读。

Table ACCESS by rowid range
对ROWID范围扫描。多块读（因为同一个块的rowid是连续的）


HONG@pdb1> set linesize 300 pagesize 300
HONG@pdb1> select object_name from ss1 where rowid < 'AAASAwAAMAAAGFDAAI';

8 rows selected.


Execution Plan
----------------------------------------------------------
Plan hash value: 2163519260

------------------------------------------------------------------------------------
| Id  | Operation		    | Name | Rows  | Bytes | Cost (%CPU)| Time	   |
------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	    |	   |  3651 |   167K|   395   (1)| 00:00:01 |
|*  1 |  TABLE ACCESS BY ROWID RANGE| SS1  |  3651 |   167K|   395   (1)| 00:00:01 |
------------------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - access(ROWID<'AAASAwAAMAAAGFDAAI')


Statistics
----------------------------------------------------------
	  0  recursive calls
	  0  db block gets
	  5  consistent gets
	  1  physical reads
	  0  redo size
	691  bytes sent via SQL*Net to client
	424  bytes received via SQL*Net from client
	  2  SQL*Net roundtrips to/from client
	  0  sorts (memory)
	  0  sorts (disk)
	  8  rows processed

HONG@pdb1>

/////////////////////////////////////////////////////////


INDEX RANGE SCAN
索引的范围扫描。单块读。返回结果集是有序的（默认是升序）

对唯一索引/主键索引进行范围查找
对非唯一索引进行等值查找，范围查找
上面发生INDEX RANGE SCAN

注意点：对非唯一索引进行等值查找并不能确保只返回一行数据，有可能是多行数据，所以会进行范围扫描。
从左到右，当检查到不匹配数据的时候，就停止扫描。

INDEX RANGE SCAN需要注意返回多少行数，如果返回大量的行数同时还需要回表，这个时候我们应该考虑
通过创建组合索引消除回表或者使用全表扫来代替它。


/////////////////////////////////////////////////////////


INDEX SKIP SCAN
索引跳跃扫描，单块读，返回结果集有序（默认升序） INDEX_SS(table_name index_name)

组合索引的引导列（第一个列）没有在where条件中，并且组合索引的引导列/前几列的基数很低（status/sex...)
where 条件中多非引导列进行过滤时候，就发生 索引跳跃扫描

发生在组合索引上，where条件没有前导列
前导列的基数很低

如果有INDEX SKIP SCAN，我们可以考虑直接在过滤列上创建索引，使用INDEX RANGE SCAN代替INDEX SKIP SCAN


/////////////////////////////////////////////////////////


INDEX FULL SCAN
索引全扫描，单块读，返回结果集有序（默认升序）
需要扫描索引中所有叶子块（从左到右），如果索引很大，会产生严重性能，因为是单块读
发生场合：
- 分页语句
- sql语句中有order by，order by的列都包含在索引中，并且order by后列顺序必须和索引列顺序一致。order by第一列不能有过滤条件，如果有过滤条件就会走INDEX RANGE SCAN了。同时表的数量不能太大，太大的话，会走 TABLE ACCESS FULL + SORT ORDER BY


看到INDEX FULL SCAN，检查INDEX FULL SCAN是否有回表。
如果没有回表，检查索引段大小，如果索引段太大（跟表比较，GB级别等）可以考虑使用INDEX FAST FULL SCAN来代替 INDEX FULL SCAN，因为IFFS是多块读，INDEX FULL SCAN是单块读，即使IFFS之后还需要排序，也要用IFFS代替IFS。
如果有回表，大多数情况，执行计划是错误的。INDEX FULL SCAN单块读，回表也是单块读。这个时候应该走全表扫。全表扫是多块读。
如果分页语句的话，INDEX FULL SCAN之后然后回表，应该没有太大问题。

create index idx_test_object_id_owner_0 on test(object_id,owner,0); 索引顺序必须与order by的顺序一致，加0是为了让索引能存NULL。

SCOTT@pdb1> set autot traceonly
SCOTT@pdb1> select * from test order by object_id,owner;

73033 rows selected.


Execution Plan
----------------------------------------------------------
Plan hash value: 2007178810

-----------------------------------------------------------------------------------
| Id  | Operation	   | Name | Rows  | Bytes |TempSpc| Cost (%CPU)| Time	  |
-----------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  | 73033 |  9414K|	  |  2553   (1)| 00:00:01 |
|   1 |  SORT ORDER BY	   |	  | 73033 |  9414K|    13M|  2553   (1)| 00:00:01 |
|   2 |   TABLE ACCESS FULL| TEST | 73033 |  9414K|	  |   396   (1)| 00:00:01 |
-----------------------------------------------------------------------------------


Statistics
----------------------------------------------------------
	  1  recursive calls
	  0  db block gets
       1422  consistent gets
	  0  physical reads
	  0  redo size
    4832026  bytes sent via SQL*Net to client
      53953  bytes received via SQL*Net from client
       4870  SQL*Net roundtrips to/from client
	  1  sorts (memory)
	  0  sorts (disk)
      73033  rows processed

SCOTT@pdb1> create index idx_test_object_id_owner_0 on test(object_id,owner,0);

Index created.

SCOTT@pdb1> select * from test order by object_id,owner;

73033 rows selected.


Execution Plan
----------------------------------------------------------
Plan hash value: 2737802999

----------------------------------------------------------------------------------------------------------
| Id  | Operation		    | Name			 | Rows  | Bytes | Cost (%CPU)| Time	 |
----------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	    |				 | 73033 |  9414K|  1806   (1)| 00:00:01 |
|   1 |  TABLE ACCESS BY INDEX ROWID| TEST			 | 73033 |  9414K|  1806   (1)| 00:00:01 |
|   2 |   INDEX FULL SCAN	    | IDX_TEST_OBJECT_ID_OWNER_0 | 73033 |	 |   233   (1)| 00:00:01 |
----------------------------------------------------------------------------------------------------------


Statistics
----------------------------------------------------------
	  1  recursive calls
	  0  db block gets
      11412  consistent gets
	235  physical reads
	  0  redo size
    4832026  bytes sent via SQL*Net to client
      53953  bytes received via SQL*Net from client
       4870  SQL*Net roundtrips to/from client
	  0  sorts (memory)
	  0  sorts (disk)
      73033  rows processed

SCOTT@pdb1>



/////////////////////////////////////////////////////////










/////////////////////////////////////////////////////////



