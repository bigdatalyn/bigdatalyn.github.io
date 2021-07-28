

1.index fast full scan

单表自关联，走hash join anti（hash join反连接）
小表返回11w行数据
大表返回125万行数据
这个时候走NL？
进一步分析小表和大表连接列的数据分布情况，NDV很低，数据也分布不均衡，所以不能走NL，只能走HASH
所以用hint指定走　 /*+ hash_aj */  -- hash anti join

小表和大表都走INDEX RANGE SCAN
如果返回少量数据的话，走INDEX RANGE SCAN是OK的，但是返回125w的数据量显然就不是很适合。
因为INDEX RANGE SCAN是单块读，
看执行计划走了INDEX RANGE SCAN之后也没有回表
所以指定 /*+ hash_aj index_ffs(t2) */
走hash join 和 index fast full scan来改写即可


2.分页语句
分页语句规范，分页有一句只能对一个表进行排序
联合索引常用招：
过滤条件的等值放到前面，排序列放到后面
NL连接，驱动表走了联合索引，被驱动表也不能走全表扫，必须走索引（连接列）

3. order by别名

分页语句中 order by 列名
出现有 sort order by stopkey
select 语句中列结果进行了 to_char 操作，取的别名跟列名一眼 ，最后 order by 也是列名（导致结果集是 to_char 列名进行了排序）
别名跟列名不一致后就没有 sort order by stopkey，而是count stopkey

4.半连接（semi/in）反向驱动主表

xxx from y where t in (xxxxx)
执行计划走了hash join semi
大表y驱动in的结果集（小结果集）

改写为in的结果集驱动大表y，走NL

select /*+ leading(t@a) use_nl(t@a,t) */ ... from y where t in (select /*+ qb_name(a) */ ... t ...);

5.


