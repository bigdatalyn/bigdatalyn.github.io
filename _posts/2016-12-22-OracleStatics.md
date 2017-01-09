---
layout: post
title: "Oracle SQL优化： 01.统计信息"
date:   2016-12-12 11:30:00
category: Oracle
tags: Oracle 
---

* content
{:toc}


---

关于Oracle统计信息收集




### 怎么查看统计信息是否过旧？

大批量的DML操作之后立即收集统计信息，如果不收集，肯定要动态采样，默认LEVEL是2（不是很好，建议设置高点:LEVEL 6）

如果这DML是偶尔性质的，那么就要注意统计信息收集策略，当发生变化了就立即收集; 如果这DML是经常性质的，那么就在SQL里面加上动态采样的HINT。

收集统计信息采样率：最佳实践30


测试用例：

	LYN@PROD1> CREATE TABLE TEST AS SELECT * FROM DBA_OBJECTS;

	Table created.

	LYN@PROD1> BEGIN
	  DBMS_STATS.GATHER_TABLE_STATS(ownname          => 'LYN',
		                        tabname          => 'TEST',
		                        estimate_percent => 100,
		                        method_opt       => 'for all columns size auto',
		                        no_invalidate    => FALSE,
		                        degree           => 1,
		                        cascade          => TRUE);
	END;
	/   2    3    4    5    6    7    8    9   10  

	PL/SQL procedure successfully completed.

	LYN@PROD1> set linesize 1000
	LYN@PROD1> set pagesize 1000
	LYN@PROD1> exec dbms_stats.flush_database_monitoring_info;

	PL/SQL procedure successfully completed.

	LYN@PROD1> select owner, table_name name, object_type, stale_stats, last_analyzed
	  from dba_tab_statistics
	 where table_name in (table_name)
	   and owner = 'LYN'
	   and (stale_stats = 'YES' or last_analyzed is null);  2    3    4    5  

	no rows selected

	LYN@PROD1> 
	LYN@PROD1> select count(1) from test;

	  COUNT(1)
	----------
	     75242

	LYN@PROD1> delete from test where rownum < 75242*0.2;

	15048 rows deleted.

	LYN@PROD1> commit;

	Commit complete.

	LYN@PROD1> select owner, table_name name, object_type, stale_stats, last_analyzed
	  from dba_tab_statistics
	 where table_name in (table_name)
	   and owner = 'LYN'
	   and (stale_stats = 'YES' or last_analyzed is null);   2    3    4    5  

	no rows selected

	LYN@PROD1>  exec dbms_stats.flush_database_monitoring_info;

	PL/SQL procedure successfully completed.

	LYN@PROD1> select owner, table_name name, object_type, stale_stats, last_analyzed
	  from dba_tab_statistics
	 where table_name in (table_name)
	   and owner = 'LYN'
	   and (stale_stats = 'YES' or last_analyzed is null);   2    3    4    5  

	OWNER                          NAME                           OBJECT_TYPE  STA LAST_ANAL
	------------------------------ ------------------------------ ------------ --- ---------
	LYN                            TEST                           TABLE        YES 23-DEC-16

	LYN@PROD1> 

#### 这张表做了什么操作导致统计信息过旧？


	LYN@PROD1> select * from
	(
	select * from 
	(
	select * from
	(
	select u.name owner, o.name table_name, null partition_name, null subpartition_name,
	       m.inserts, m.updates, m.deletes, m.timestamp,
	       decode(bitand(m.flags,1),1,'YES','NO') truncated,
	       m.drop_segments
	from sys.mon_mods_all$ m, sys.obj$ o, sys.tab$ t, sys.user$ u
	where o.obj# = m.obj# and o.obj# = t.obj# and o.owner# = u.user#
	union all
	select u.name, o.name, o.subname, null,
	       m.inserts, m.updates, m.deletes, m.timestamp,
	       decode(bitand(m.flags,1),1,'YES','NO'),
	       m.drop_segments
	from sys.mon_mods_all$ m, sys.obj$ o, sys.user$ u
	where o.owner# = u.user# and o.obj# = m.obj# and o.type#=19
	union all
	select u.name, o.name, o2.subname, o.subname,
	       m.inserts, m.updates, m.deletes, m.timestamp,
	       decode(bitand(m.flags,1),1,'YES','NO'),
	       m.drop_segments
	from sys.mon_mods_all$ m, sys.obj$ o, sys.tabsubpart$ tsp, sys.obj$ o2,
	     sys.user$ u
	where o.obj# = m.obj# and o.owner# = u.user# and
	      o.obj# = tsp.obj# and o2.obj# = tsp.pobj#
	) where owner not like '%SYS%' and owner not like 'XDB'     
	union all 
	select * from
	(    
	select u.name owner, o.name table_name, null partition_name, null subpartition_name,
	       m.inserts, m.updates, m.deletes, m.timestamp,
	       decode(bitand(m.flags,1),1,'YES','NO') truncated,
	       m.drop_segments
	from sys.mon_mods$ m, sys.obj$ o, sys.tab$ t, sys.user$ u
	where o.obj# = m.obj# and o.obj# = t.obj# and o.owner# = u.user#
	union all
	select u.name, o.name, o.subname, null,
	       m.inserts, m.updates, m.deletes, m.timestamp,
	       decode(bitand(m.flags,1),1,'YES','NO'),
	       m.drop_segments
	from sys.mon_mods$ m, sys.obj$ o, sys.user$ u
	where o.owner# = u.user# and o.obj# = m.obj# and o.type#=19
	union all
	select u.name, o.name, o2.subname, o.subname,
	       m.inserts, m.updates, m.deletes, m.timestamp,
	       decode(bitand(m.flags,1),1,'YES','NO'),
	       m.drop_segments
	from sys.mon_mods$ m, sys.obj$ o, sys.tabsubpart$ tsp, sys.obj$ o2,
	     sys.user$ u
	where o.obj# = m.obj# and o.owner# = u.user# and
	      o.obj# = tsp.obj# and o2.obj# = tsp.pobj#
	) where owner not like '%SYS%' and owner not like '%XDB%'
	) order by inserts desc 
	) where rownum<=50;  2    3    4    5    6    7    8    9   10   11   12   13   14   15   16   17   18   19   20   21   22   23   24   25   26   27   28   29   30   31   32   33   34   35   36   37   38   39   40   41   42   43   44   45   46   47   48   49   50   51   52   53   54   55   56   57  

	OWNER                          TABLE_NAME                     PARTITION_NAME                 SUBPARTITION_NAME                 INSERTS    UPDATES    DELETES TIMESTAMP TRU DROP_SEGMENTS
	------------------------------ ------------------------------ ------------------------------ ------------------------------ ---------- ---------- ---------- --------- --- -------------
	OE                             LINEITEM_TABLE                                                                                     2232          0          0 13-OCT-14 NO              0
	OE                             PRODUCT_REF_LIST_NESTEDTAB                                                                          288          0          0 13-OCT-14 NO              0
	PM                             PRINT_MEDIA                                                                                           0          8          0 13-OCT-14 NO              0
	LYN                            TEST                                                                                                  0          0      15048 23-DEC-16 NO              0

	4 rows selected.

	LYN@PROD1> 



### 查看当前表统计信息的采样率是多少？

刚才是100的采样率

	LYN@PROD1> SELECT owner,
	       table_name,
	       num_rows,
	       sample_size,
	       trunc(sample_size / num_rows * 100) estimate_percent 
	  FROM DBA_TAB_STATISTICS
	 WHERE owner='LYN' AND table_name='TEST';  2    3    4    5    6    7  

	OWNER                          TABLE_NAME                       NUM_ROWS SAMPLE_SIZE ESTIMATE_PERCENT
	------------------------------ ------------------------------ ---------- ----------- ----------------
	LYN                            TEST                                75242       75242              100

	LYN@PROD1> 


测试30%采样率：

	LYN@PROD1> BEGIN
	  DBMS_STATS.GATHER_TABLE_STATS(ownname          => 'LYN',
		                        tabname          => 'TEST',
		                        estimate_percent => 30,
		                        method_opt       => 'for all columns size auto',
		                        no_invalidate    => FALSE,
		                        degree           => 1,
		                        cascade          => TRUE);
	END;
	/  2    3    4    5    6    7    8    9   10  

	PL/SQL procedure successfully completed.

	LYN@PROD1> 
	LYN@PROD1> 
	LYN@PROD1> 
	LYN@PROD1>  SELECT owner,
	       table_name,
	       num_rows,
	       sample_size,
	       trunc(sample_size / num_rows * 100) estimate_percent 
	  FROM DBA_TAB_STATISTICS
	 WHERE owner='LYN' AND table_name='TEST';  2    3    4    5    6    7  

	OWNER                          TABLE_NAME                       NUM_ROWS SAMPLE_SIZE ESTIMATE_PERCENT
	------------------------------ ------------------------------ ---------- ----------- ----------------
	LYN                            TEST                                45370       13611               30

	LYN@PROD1> 


总结SQL语句：

	exec dbms_stats.flush_database_monitoring_info; ----刷新信息到磁盘

	--------------EXPLAIN PLAN FOR SQL, 然后执行下面语句得到表名字---------------------------
	select '''' || object_owner || '''', '''' || object_name || ''','
	  from plan_table
	 where object_type = 'TABLE'
	union
	---table in the index---------
	select '''' || table_owner || '''', '''' || table_name || '*'','
	  from dba_indexes
	 where owner in
	       (select distinct object_owner from plan_table where rownum > 0)
	   and index_name in
	       (select distinct object_name from plan_table where rownum > 0)
	order by 2;

	带*的表是根据索引查询出来的

	--------------再把上面的结果贴入下面代码-------------------------------------------------
	select owner, table_name name, object_type, stale_stats, last_analyzed
	  from dba_tab_statistics
	 where table_name in
	(
	table_name
	)
	and owner='owner'
	   and (stale_stats = 'YES' or last_analyzed is null);

	--------------如果 stale_stats=YES，想要知道是怎么过期的，运行下面代码-------------------
	select *
	  from all_tab_modifications
	 where table_owner='&owner'
	   and table_name in
	(
	table_name
	)
	   and (inserts > 0 or updates > 0 or deletes > 0)
	 order by table_name;


	Oracle内部算法：如果DML超过10%，就表示统计信息过期了



### 查看对表是否进行直方图统计信息收集？

	LYN@PROD1> LYN@PROD1> select a.column_name,
		b.num_rows,
		a.num_distinct Cardinality,
		round(a.num_distinct / b.num_rows * 100, 2) selectivity,
		a.histogram,
		a.num_buckets
		from dba_tab_col_statistics a, dba_tables b
	   where a.owner = b.owner
		and a.table_name = b.table_name
		and a.owner = 'LYN'
		and a.table_name = 'TEST';  2    3    4    5    6    7    8    9   10   11  

	COLUMN_NAME                      NUM_ROWS CARDINALITY SELECTIVITY HISTOGRAM       NUM_BUCKETS
	------------------------------ ---------- ----------- ----------- --------------- -----------
	EDITION_NAME                        75167           0           0 NONE                      0
	NAMESPACE                           75167          17         .02 NONE                      1
	SECONDARY                           75167           2           0 NONE                      1
	GENERATED                           75167           2           0 NONE                      1
	TEMPORARY                           75167           2           0 NONE                      1
	STATUS                              75167           1           0 NONE                      1
	TIMESTAMP                           75167         799        1.06 NONE                      1
	LAST_DDL_TIME                       75167         767        1.02 NONE                      1
	CREATED                             75167         754           1 NONE                      1
	OBJECT_TYPE                         75167          39         .05 NONE                      1
	DATA_OBJECT_ID                      75167        9410       12.52 NONE                      1
	OBJECT_ID                           75167       75167         100 NONE                      1
	SUBOBJECT_NAME                      75167         106         .14 NONE                      1
	OBJECT_NAME                         75167       42241        56.2 NONE                      1
	OWNER                               75167          28         .04 NONE                      1

	15 rows selected.

	LYN@PROD1> 


AUTO统计信息收集，有where条件才自动收集直方图信息，如：

	LYN@PROD1> SELECT COUNT(*) FROM TEST WHERE OWNER='LYN';

	  COUNT(*)
	----------
		 2

	LYN@PROD1>  select a.column_name,
		b.num_rows,
		a.num_distinct Cardinality,
		round(a.num_distinct / b.num_rows * 100, 2) selectivity,
		a.histogram,
		a.num_buckets
		from dba_tab_col_statistics a, dba_tables b
	   where a.owner = b.owner
		and a.table_name = b.table_name
		and a.owner = 'LYN'
		and a.table_name = 'TEST';  2    3    4    5    6    7    8    9   10   11  

	COLUMN_NAME                      NUM_ROWS CARDINALITY SELECTIVITY HISTOGRAM       NUM_BUCKETS
	------------------------------ ---------- ----------- ----------- --------------- -----------
	EDITION_NAME                        75167           0           0 NONE                      0
	NAMESPACE                           75167          17         .02 NONE                      1
	SECONDARY                           75167           2           0 NONE                      1
	GENERATED                           75167           2           0 NONE                      1
	TEMPORARY                           75167           2           0 NONE                      1
	STATUS                              75167           1           0 NONE                      1
	TIMESTAMP                           75167         799        1.06 NONE                      1
	LAST_DDL_TIME                       75167         767        1.02 NONE                      1
	CREATED                             75167         754           1 NONE                      1
	OBJECT_TYPE                         75167          39         .05 NONE                      1
	DATA_OBJECT_ID                      75167        9410       12.52 NONE                      1
	OBJECT_ID                           75167       75167         100 NONE                      1
	SUBOBJECT_NAME                      75167         106         .14 NONE                      1
	OBJECT_NAME                         75167       42241        56.2 NONE                      1
	OWNER                               75167          28         .04 NONE                      1

	15 rows selected.

	LYN@PROD1> BEGIN
	  DBMS_STATS.GATHER_TABLE_STATS(ownname          => 'LYN',
		                        tabname          => 'TEST',
		                        estimate_percent => 30,
		                        method_opt       => 'for all columns size auto',
		                        no_invalidate    => FALSE,
		                        degree           => 1,
		                        cascade          => TRUE);
	END;
	/  2    3    4    5    6    7    8    9   10  

	PL/SQL procedure successfully completed.

	LYN@PROD1> select a.column_name,
		b.num_rows,
		a.num_distinct Cardinality,
		round(a.num_distinct / b.num_rows * 100, 2) selectivity,
		a.histogram,
		a.num_buckets
		from dba_tab_col_statistics a, dba_tables b
	   where a.owner = b.owner
		and a.table_name = b.table_name
		and a.owner = 'LYN'
		and a.table_name = 'TEST';   2    3    4    5    6    7    8    9   10   11  

	COLUMN_NAME                      NUM_ROWS CARDINALITY SELECTIVITY HISTOGRAM       NUM_BUCKETS
	------------------------------ ---------- ----------- ----------- --------------- -----------
	EDITION_NAME                        52773           0           0 NONE                      0
	NAMESPACE                           52773          15         .03 NONE                      1
	SECONDARY                           52773           2           0 NONE                      1
	GENERATED                           52773           2           0 NONE                      1
	TEMPORARY                           52773           2           0 NONE                      1
	STATUS                              52773           1           0 NONE                      1
	TIMESTAMP                           52773         505         .96 NONE                      1
	LAST_DDL_TIME                       52773         476          .9 NONE                      1
	CREATED                             52773         484         .92 NONE                      1
	OBJECT_TYPE                         52773          29         .05 NONE                      1
	DATA_OBJECT_ID                      52773        6873       13.02 NONE                      1
	OBJECT_ID                           52773       52773         100 NONE                      1
	SUBOBJECT_NAME                      52773         100         .19 NONE                      1
	OBJECT_NAME                         52773       29098       55.14 NONE                      1
	OWNER                               52773          24         .05 FREQUENCY                24

	15 rows selected.

	LYN@PROD1> 


收集直方图信息：


		LYN@PROD1> 
		LYN@PROD1> BEGIN
		  DBMS_STATS.GATHER_TABLE_STATS(ownname          => 'LYN',
				                tabname          => 'TEST',
				                estimate_percent => 30,
				                method_opt       => 'for all columns size skewonly',
				                no_invalidate    => FALSE,
				                degree           => 1,
				                cascade          => TRUE);
		END;
		/  2    3    4    5    6    7    8    9   10  

		PL/SQL procedure successfully completed.

		LYN@PROD1> 
		LYN@PROD1> select a.column_name,
				b.num_rows,
				a.num_distinct Cardinality,
				round(a.num_distinct / b.num_rows * 100, 2) selectivity,
				a.histogram,
				a.num_buckets
				from dba_tab_col_statistics a, dba_tables b
			   where a.owner = b.owner
				and a.table_name = b.table_name
				and a.owner = 'LYN'
				and a.table_name = 'TEST';  2    3    4    5    6    7    8    9   10   11  

		COLUMN_NAME                      NUM_ROWS CARDINALITY SELECTIVITY HISTOGRAM       NUM_BUCKETS
		------------------------------ ---------- ----------- ----------- --------------- -----------
		EDITION_NAME                        53050           0           0 NONE                      0
		NAMESPACE                           53050          16         .03 FREQUENCY                16
		SECONDARY                           53050           2           0 FREQUENCY                 2
		GENERATED                           53050           2           0 FREQUENCY                 2
		TEMPORARY                           53050           2           0 FREQUENCY                 2
		STATUS                              53050           1           0 FREQUENCY                 1
		TIMESTAMP                           53050         512         .97 HEIGHT BALANCED         254
		LAST_DDL_TIME                       53050         476          .9 HEIGHT BALANCED         254
		CREATED                             53050         484         .91 HEIGHT BALANCED         254
		OBJECT_TYPE                         53050          32         .06 FREQUENCY                32
		DATA_OBJECT_ID                      53050        6733       12.69 NONE                      1
		OBJECT_ID                           53050       52610       99.17 NONE                      1
		SUBOBJECT_NAME                      53050         102         .19 NONE                      1
		OBJECT_NAME                         53050       28833       54.35 HEIGHT BALANCED         254
		OWNER                               53050          24         .05 FREQUENCY                24

		15 rows selected.

		LYN@PROD1> 


	skewonly:让Oracle自己判断是否收集统计信息，只要是列倾斜了，就收集直方图信息，上面例子表示大部分都进行了收集，需要谨慎使用。


	指定某列进行直方图统计信息收集，如 OBJECT_ID


	BEGIN
	  DBMS_STATS.GATHER_TABLE_STATS(ownname          => 'LYN',
		                        tabname          => 'TEST',
		                        estimate_percent => 30,
		                        method_opt       => 'for columns DATA_OBJECT_ID size skewonly',
		                        no_invalidate    => FALSE,
		                        degree           => 1,
		                        cascade          => TRUE);
	END;
	/





	LYN@PROD1> BEGIN
	  DBMS_STATS.GATHER_TABLE_STATS(ownname          => 'LYN',
		                        tabname          => 'TEST',
		                        estimate_percent => 30,
		                        method_opt       => 'for all columns size auto',
		                        no_invalidate    => FALSE,
		                        degree           => 1,
		                        cascade          => TRUE);
	END;
	/

	select a.column_name,
		                b.num_rows,
		                a.num_distinct Cardinality,
		                round(a.num_distinct / b.num_rows * 100, 2) selectivity,
		                a.histogram,
		                a.num_buckets
		                from dba_tab_col_statistics a, dba_tables b
		           where a.owner = b.owner
		                and a.table_name = b.table_name
		                and a.owner = 'LYN'
		                and a.table_name = 'TEST';


	BEGIN
	  DBMS_STATS.GATHER_TABLE_STATS(ownname          => 'LYN',
		                        tabname          => 'TEST',
		                        estimate_percent => 30,
		                        method_opt       => 'for all columns size repeat',
		                        no_invalidate    => FALSE,
		                        degree           => 1,
		                        cascade          => TRUE);
	END;
	/

	select a.column_name,
		                b.num_rows,
		                a.num_distinct Cardinality,
		                round(a.num_distinct / b.num_rows * 100, 2) selectivity,
		                a.histogram,
		                a.num_buckets
		                from dba_tab_col_statistics a, dba_tables b
		           where a.owner = b.owner
		                and a.table_name = b.table_name
		                and a.owner = 'LYN'
		                and a.table_name = 'TEST';  2    3    4    5    6    7    8    9   10  
	PL/SQL procedure successfully completed.

	LYN@PROD1> LYN@PROD1>   2    3    4    5    6    7    8    9   10   11  
	COLUMN_NAME                      NUM_ROWS CARDINALITY SELECTIVITY HISTOGRAM       NUM_BUCKETS
	------------------------------ ---------- ----------- ----------- --------------- -----------
	EDITION_NAME                        52720           0           0 NONE                      0
	NAMESPACE                           52720          15         .03 NONE                      1
	SECONDARY                           52720           2           0 NONE                      1
	GENERATED                           52720           2           0 NONE                      1
	TEMPORARY                           52720           2           0 NONE                      1
	STATUS                              52720           1           0 NONE                      1
	TIMESTAMP                           52720         510         .97 NONE                      1
	LAST_DDL_TIME                       52720         486         .92 NONE                      1
	CREATED                             52720         475          .9 NONE                      1
	OBJECT_TYPE                         52720          30         .06 NONE                      1
	DATA_OBJECT_ID                      52720        6813       12.92 NONE                      1
	OBJECT_ID                           52720       52720         100 NONE                      1
	SUBOBJECT_NAME                      52720         103          .2 NONE                      1
	OBJECT_NAME                         52720       29097       55.19 NONE                      1
	OWNER                               52720          25         .05 FREQUENCY                25

	15 rows selected.

	LYN@PROD1> LYN@PROD1> LYN@PROD1>   2    3    4    5    6    7    8    9   10  
	PL/SQL procedure successfully completed.

	LYN@PROD1> LYN@PROD1>   2    3    4    5    6    7    8    9   10   11  

	COLUMN_NAME                      NUM_ROWS CARDINALITY SELECTIVITY HISTOGRAM       NUM_BUCKETS
	------------------------------ ---------- ----------- ----------- --------------- -----------
	EDITION_NAME                        52760           0           0 NONE                      0
	NAMESPACE                           52760          14         .03 NONE                      1
	SECONDARY                           52760           2           0 NONE                      1
	GENERATED                           52760           2           0 NONE                      1
	TEMPORARY                           52760           2           0 NONE                      1
	STATUS                              52760           1           0 NONE                      1
	TIMESTAMP                           52760         525           1 NONE                      1
	LAST_DDL_TIME                       52760         504         .96 NONE                      1
	CREATED                             52760         485         .92 NONE                      1
	OBJECT_TYPE                         52760          29         .05 NONE                      1
	DATA_OBJECT_ID                      52760        6793       12.88 NONE                      1
	OBJECT_ID                           52760       52760         100 NONE                      1
	SUBOBJECT_NAME                      52760         107          .2 NONE                      1
	OBJECT_NAME                         52760       29351       55.63 NONE                      1
	OWNER                               52760          25         .05 FREQUENCY                25

	15 rows selected.

	LYN@PROD1> 


根据Segment大小来指定收集统计信息策略：

	DECLARE
	  CURSOR STALE_TABLE IS
	    SELECT OWNER,
		   SEGMENT_NAME,
		   CASE
		     WHEN SIZE_GB < 0.5 THEN
		      30
		     WHEN SIZE_GB >= 0.5 AND SIZE_GB < 1 THEN
		      20
		     WHEN SIZE_GB >= 1 AND SIZE_GB < 5 THEN
		      10
		     WHEN SIZE_GB >= 5 AND SIZE_GB < 10 THEN
		      5
		     WHEN SIZE_GB >= 10 THEN
		      1
		   END AS PERCENT,
		   8 AS DEGREE
	      FROM (SELECT OWNER,
		           SEGMENT_NAME,
		           SUM(BYTES / 1024 / 1024 / 1024) SIZE_GB
		      FROM DBA_SEGMENTS
		     WHERE OWNER = 'ADWU_OPTIMA_AP11'
		       AND SEGMENT_NAME IN
		           (SELECT /*+ UNNEST */ DISTINCT TABLE_NAME
		              FROM DBA_TAB_STATISTICS
		             WHERE (LAST_ANALYZED IS NULL OR STALE_STATS = 'YES')
		               AND OWNER = 'ADWU_OPTIMA_AP11')
		     GROUP BY OWNER, SEGMENT_NAME);

	BEGIN
	  DBMS_STATS.FLUSH_DATABASE_MONITORING_INFO;
	  FOR STALE IN STALE_TABLE LOOP
	    DBMS_STATS.GATHER_TABLE_STATS(OWNNAME          => STALE.OWNER,
		                          TABNAME          => STALE.SEGMENT_NAME,
		                          ESTIMATE_PERCENT => STALE.PERCENT,
		                          METHOD_OPT       => 'for all columns size repeat',
		                          DEGREE           => 8,
		                          GRANULARITY      => 'ALL',
		                          CASCADE          => TRUE);
	  END LOOP;
	END;
	/
