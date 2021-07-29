/////// 分页语句

单表分页

HONG@pdb1> create table t1 as select * from dba_objects;
HONG@pdb1> insert into t1 select * from t1;
HONG@pdb1> commit;
HONG@pdb1> select count(*) from t1;
146096


1.按照 object_id 的升序排列，带上rownum
2.根据 rownum的第几页逻辑输出结果

select * from 
(select a.*,rownum rn from
(select * from t1 order by object_id) a
) b
where b.rn> 1 and b.rn <=10;


Elapsed: 00:00:00.95
SQL_ID	48kpvqv75jxhc, child number 1
-------------------------------------
select * from (select a.*,rownum rn from (select * from t1 order by
object_id) a ) b where b.rn> 1 and b.rn <=10

Plan hash value: 2211185287

----------------------------------------------------------------------------------------------------------------
| Id  | Operation	      | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT      |      |	    1 |        |  2554 (100)|	       |      9 |00:00:00.70 |	  2868 |
|*  1 |  VIEW		      |      |	    1 |  73048 |  2554	 (1)| 00:00:01 |      9 |00:00:00.70 |	  2868 |
|   2 |   COUNT 	      |      |	    1 |        |	    |	       |    146K|00:00:00.68 |	  2868 |
|   3 |    VIEW 	      |      |	    1 |  73048 |  2554	 (1)| 00:00:01 |    146K|00:00:00.68 |	  2868 |
|   4 |     SORT ORDER BY     |      |	    1 |  73048 |  2554	 (1)| 00:00:01 |    146K|00:00:00.67 |	  2868 |
|   5 |      TABLE ACCESS FULL| T1   |	    1 |  73048 |   396	 (1)| 00:00:01 |    146K|00:00:00.14 |	  2868 |
----------------------------------------------------------------------------------------------------------------

Elapsed: 00:00:00.95
Buffers 2868
这钟情况下，是进行全表扫描，扫描后进行全部排序，所以如果t1表的数量很大，然后排序的话，性能将会很严重

HONG@pdb1> create index idx_t1_object_id on t1(object_id);

创建上面object_id的索引后依旧是全表扫

SQL_ID	bgysv4150ps7m, child number 0
-------------------------------------
select /* index(t1) */ * from (select a.*,rownum rn
from (select * from t1 order by object_id) a ) b where b.rn> 1 and b.rn
<=10

Plan hash value: 2211185287

----------------------------------------------------------------------------------------------------------------
| Id  | Operation	      | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT      |      |	    1 |        |  2554 (100)|	       |      9 |00:00:00.85 |	  2868 |
|*  1 |  VIEW		      |      |	    1 |  73048 |  2554	 (1)| 00:00:01 |      9 |00:00:00.85 |	  2868 |
|   2 |   COUNT 	      |      |	    1 |        |	    |	       |    146K|00:00:00.80 |	  2868 |
|   3 |    VIEW 	      |      |	    1 |  73048 |  2554	 (1)| 00:00:01 |    146K|00:00:00.80 |	  2868 |
|   4 |     SORT ORDER BY     |      |	    1 |  73048 |  2554	 (1)| 00:00:01 |    146K|00:00:00.79 |	  2868 |
|   5 |      TABLE ACCESS FULL| T1   |	    1 |  73048 |   396	 (1)| 00:00:01 |    146K|00:00:00.18 |	  2868 |
----------------------------------------------------------------------------------------------------------------

desc t1 描述：OBJECT_ID NUMBER 不是not null类型

HONG@pdb1> create index idx_t1_object_id0 on t1(object_id,0);

创建带0的联合索引（注意顺序，不能把0放前面，目的是为了可以带NULL值）

select /*+ index(t1) */ * from 
(select a.*,rownum rn from
(select * from t1 order by object_id) a
) b
where b.rn> 1 and b.rn <=10;


select /*+ index(t1@SEL$3) */ * from 
(select a.*,rownum rn from
(select * from t1 order by object_id) a
) b
where b.rn> 1 and b.rn <=10;

上面两句都使用全表扫


select * from 
(select a.*,rownum rn from
(select /*+ index(t1) */ * from t1 order by object_id) a
) b
where b.rn> 1 and b.rn <=10;


select * from 
(select a.*,rownum rn from
(select /*+ index(t1@SEL$3) */ * from t1 order by object_id) a
) b
where b.rn> 1 and b.rn <=10;

select * from (select a.*,rownum rn from (select /*+ index(t1@SEL$3) */
* from t1 order by object_id) a ) b where b.rn> 1 and b.rn <=10

Plan hash value: 1491058914

-----------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		       | Name		   | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads  |
-----------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	       |		   |	  1 |	     |	 146K(100)|	     |	    9 |00:00:00.81 |	 146K|	  369 |
|*  1 |  VIEW			       |		   |	  1 |  73048 |	 146K  (1)| 00:00:06 |	    9 |00:00:00.81 |	 146K|	  369 |
|   2 |   COUNT 		       |		   |	  1 |	     |		  |	     |	  146K|00:00:00.71 |	 146K|	  369 |
|   3 |    VIEW 		       |		   |	  1 |  73048 |	 146K  (1)| 00:00:06 |	  146K|00:00:00.65 |	 146K|	  369 |
|   4 |     TABLE ACCESS BY INDEX ROWID| T1		   |	  1 |  73048 |	 146K  (1)| 00:00:06 |	  146K|00:00:00.56 |	 146K|	  369 |
|   5 |      INDEX FULL SCAN	       | IDX_T1_OBJECT_ID0 |	  1 |  73048 |	 366   (1)| 00:00:01 |	  146K|00:00:00.10 |	 366 |	  369 |
-----------------------------------------------------------------------------------------------------------------------------------------------

上面最后走了INDEX FULL SCAN（IDX_T1_OBJECT_ID0）


上面的分页语句是错的，正确写法：


select * from 
(select a.*,rownum rn from
(select * from t1 order by object_id) a where rownum <=10
) b
where b.rn> 1;


SQL_ID	28ssnhbbawx0a, child number 0
-------------------------------------
select * from (select a.*,rownum rn from (select * from t1 order by
object_id) a where rownum <=10 ) b where b.rn> 1

Plan hash value: 810922713

--------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		       | Name		   | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	       |		   |	  1 |	     |	  22 (100)|	     |	    9 |00:00:00.01 |	  13 |
|*  1 |  VIEW			       |		   |	  1 |	  10 |	  22   (0)| 00:00:01 |	    9 |00:00:00.01 |	  13 |
|*  2 |   COUNT STOPKEY 	       |		   |	  1 |	     |		  |	     |	   10 |00:00:00.01 |	  13 |
|   3 |    VIEW 		       |		   |	  1 |	  10 |	  22   (0)| 00:00:01 |	   10 |00:00:00.01 |	  13 |
|   4 |     TABLE ACCESS BY INDEX ROWID| T1		   |	  1 |  73048 |	  22   (0)| 00:00:01 |	   10 |00:00:00.01 |	  13 |
|   5 |      INDEX FULL SCAN	       | IDX_T1_OBJECT_ID0 |	  1 |	  10 |	   2   (0)| 00:00:01 |	   10 |00:00:00.01 |	   3 |
--------------------------------------------------------------------------------------------------------------------------------------

INDEX FULL SCAN限制最大值，不需要全部扫描数块。
- 索引本省有序
- 执行计划有关键字：COUNT STOPKEY 

分页语句的关键点是 用rownum来 COUNT STOPKEY
另外创建合适的索引，消灭SORT ORDER BY，另外看字段是否是NOT NULL，可以添加0，让索引包含NULL值
多表连接让走NL，因为NL的驱动表是有顺序，所以不用进行再进行SORT了，Hash Join和Merge Join都是无序的
分区表 range的范围，可以考虑local index，不然 一般创建 global index

