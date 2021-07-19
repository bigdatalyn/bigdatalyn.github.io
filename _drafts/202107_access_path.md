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