一、只有大表才会产生性能问题
当一列出现再where条件中，并且其选择性大于20%
（选择性就是基数与总行数的比值再乘以100 num_distinct/num_rows*100）
--sql语句全自动化的优化脚本
--刷新数据库监控信息。

begin
dbms_stats.flush_database_monitoring_info;
end;

--然后我们查看 MSG_DETAILS 表有哪些列出现在 where 条件中。

select r.name owner,
 o.name table_name,
 c.name column_name,
 equality_preds, ---等值过滤
 equijoin_preds, ---等值 JOIN 比如 where a.id=b.id
 nonequijoin_preds, ----不等 JOIN
 range_preds, ----范围过滤次数 > >= < <= between and
 like_preds, ----LIKE 过滤
 null_preds, ----NULL 过滤
 timestamp
 from sys.col_usage$ u, sys.obj$ o, sys.col$ c, sys.user$ r
 where o.obj# = u.obj#
 and c.obj# = u.obj#
 and c.col# = u.intcol#
 and r.name = 'YYSMS'
 and o.name = 'MSG_DETAILS';

--接下来我们查询出选择性大于等于 20%的列。
select a.owner,
 a.table_name,
 a.column_name,
 round(a.num_distinct / b.num_rows * 100, 2) selectivity
 from dba_tab_col_statistics a, dba_tables b
 where a.owner = b.owner
 and a.table_name = b.table_name
 and a.owner = 'YYSMS'
 and a.table_name ='MSG_DETAILS'
 and a.num_distinct / b.num_rows >= 0.2;
--最后，确保这些列没有创建索引。
select table_owner, table_name, column_name, index_name
  from dba_ind_columns
  where table_owner = 'YYSMS'
  and table_name = 'MSG_DETAILS';
--把上面的脚本组合起来，我们就可以得到全自动的优化脚本了　　

select owner,
  column_name,
  num_rows,
  Cardinality,
  selectivity,
  'Need index' as notice
  from (select b.owner,
  a.column_name,
  b.num_rows,
  a.num_distinct Cardinality,
  round(a.num_distinct / b.num_rows * 100, 2) selectivity
  from dba_tab_col_statistics a, dba_tables b
  where a.owner = b.owner
  and a.table_name = b.table_name
  and a.owner =  'YYSMS' -----------------------------------
  and a.table_name ='MSG_DETAILS')-----------------------------------
  where selectivity >= 20
  and column_name not in (select column_name
  from dba_ind_columns
 where table_owner =  'YYSMS'
  and table_name ='MSG_DETAILS')
  and column_name in
  (select c.name
 from sys.col_usage$ u, sys.obj$ o, sys.col$ c, sys.user$ r
  where o.obj# = u.obj#
 and c.obj# = u.obj#
 and c.col# = u.intcol#
  and r.name =  'YYSMS' -----------------------------------
 and o.name = 'MSG_DETAILS');-----------------------------------
 
二、如果某个列基数很低，则说明该列的数据分布就非常不均衡，
由于该列分布不均衡，所以可能走索引也可能走全表扫描，这个时候就很容易走错执行计划。
此时应该收集直方图统计信息，否则基于成本的优化器CBO会认为该列数据分布式均衡的。

对某一列收集直方图统计信息
--现在我们对 cc列收集直方图。

BEGIN
  DBMS_STATS.GATHER_TABLE_STATS(ownname => 'YYSMS',
  tabname =>  'MSG_DETAILS',
  estimate_percent => 100,
  method_opt => 'for columns cc size skewonly',
  no_invalidate => FALSE,
  degree => 1,
  cascade => TRUE);
  END;
  /
 
PL/SQL procedure successfully completed.
-- 查看一下 cc 列的直方图信息　　

select a.column_name,
  b.num_rows,
  a.num_distinct Cardinality,
  round(a.num_distinct / b.num_rows * 100, 2) selectivity,
  a.histogram,
  a.num_buckets
  from dba_tab_col_statistics a, dba_tables b
  where a.owner = b.owner
 and a.table_name = b.table_name
 and a.owner =  'YYSMS'
  and a.table_name = 'MSG_DETAILS';
--抓出必须创建直方图的列（大家可以对该脚本进行适当修改，以便用于生产环境）。　　


select a.owner,
a.table_name,
 a.column_name,
 b.num_rows,
a.num_distinct,
 trunc(num_distinct / num_rows * 100,2) selectivity,
 'Need Gather Histogram' notice
 from dba_tab_col_statistics a, dba_tables b
 where a.owner = 'YYSMS'
 and a.table_name = 'MSG_DETAILS'
 and a.owner = b.owner
 and a.table_name = b.table_name
 and num_distinct / num_rows<0.01
 and (a.owner, a.table_name, a.column_name) in
 (select r.name owner, o.name table_name, c.name column_name
 from sys.col_usage$ u, sys.obj$ o, sys.col$ c, sys.user$ r
where o.obj# = u.obj#
 and c.obj# = u.obj#
 and c.col# = u.intcol#
 and r.name =  'YYSMS'
 and o.name =  'MSG_DETAILS')
 and a.histogram ='NONE';