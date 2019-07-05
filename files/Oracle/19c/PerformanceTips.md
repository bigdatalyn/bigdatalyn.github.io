
### Oracle慢了怎么办？
　千万不要张口就是建索引，建索引就能快吗？
　慢是一种状态的形容，我们需要仔细问：具体是怎么慢？
　突然慢还是一直慢？整个数据库慢还是某个功能慢？是否时快时慢？具体有多慢？期望是多快？
　如果是突然慢，那么，问下开发/DBA/应用管理员/业务人员，做过什么变更？如果安装了OMS，看下当前的顶级活动，或是生成最近的一次AWR，查明数据库在执行什么sql。有必要看下服务器的负载，IO、CPU、内存的使用率都要查一下。如果光纤链路使用了HA，假如坏了一条，而恰好当前使用了它，那么慢是肯定的。良好的习惯是查看下alert日志，确定是否有报错。总而言之，要快速定位到问题sql，对症下药，方见疗效。
　如果是一直慢，这属于慢性病，需要仔细收集各个时间段服务器、数据库的负载信息，OSWatcher或许有帮助，找出top sql，依据二八原则，分清主次，迭代调优。
　如果整个数据库都慢，做什么都慢，登录sql*plus也慢，select * from emp也慢，那么，先看下CPU是不是到了100%。
　如果是某个功能慢，找出慢的sql，然后，确认，应该多快？努力优化之。
　如果是有时快有时慢，或是生产慢测试快，还是要先定位到sql，然后，检查表、索引是否结构相同大小相当，对比执行计划，找出具体的慢的步骤。
 检查下同一个sql是不是有多个执行计划，或许，固定下执行计划就OK了。偶尔，表数据量一样，执行计划相同，但是测试的执行效率是生产的数倍，怎么办？又或者同样的查询语句，表500w时查询速度是1s，而表数据300w时查询速度是1.5s，怎么办？友情提示：rows processed一样吗？高水位线是否有故事？
　慢的场景总是不能尽述，一般而言，统计信息不准确、执行计划发生改变是较常见的原因，但具体问题仍需具体分析。总之，慢有不同，处理方法自然也不同。经过系统性分析，并大胆假设、小心求证，最终找到问题SQL和性能瓶颈并解决之，也可以说是“柳暗花明又一村”了！


-- 查询会话的等待事件
	select *
	  from (select sid, event, p1, p2, p3, p1text, WAIT_TIME, SECONDS_IN_WAIT
			  from v$session_wait
			 where wait_class# <> 6
			 order by wait_time desc)
	 where rownum <= 10;



-- 查询所有等待事件占db time的比值
	set line 200 pages 999
	col EVENT for a30
	col WAIT_CLASS for a20
	col TIME_WAITED_MICRO for 999999999999999
	col PCT_DB_TIME for 9999
	SELECT EVENT,
		   e.WAIT_CLASS,
		   TIME_WAITED_MICRO,
		   ROUND(TIME_WAITED_MICRO * 100 / S.DBTIME, 1) PCT_DB_TIME
	  FROM V$SYSTEM_EVENT E,
		   V$EVENT_NAME N,
		   (SELECT VALUE DBTIME
			  FROM V$SYS_TIME_MODEL
			 WHERE STAT_NAME = 'DB time') S
	 WHERE E.EVENT_ID = N.EVENT_ID
	   AND N.WAIT_CLASS NOT IN ('Idle', 'System I/O')
	 ORDER BY PCT_DB_TIME ASC;
 
 
### log file sync 一般的检查思路

    优化了redo日志的I/O性能，尽量使用快速磁盘，不要把redo log file存放在raid 5的磁盘上。
    加大日志缓冲区(log buffer)。
    使用批量提交，减少提交的次数。
    部分经常提交的事务设置为异步提交。
    适当使用NOLOGGING/UNRECOVERABLE等选项。
    采用专用网络，正确设置网络UDP buffer参数。
    安装最新版本数据库避免bug，具体bug修复的版本参考文档。
    log file parallel write IO争用：建议更换IO性能高的磁盘，此系统为在线生产系统目前先不做更换，做好更换的规划。
    log switches (derived)：添加日志组的大小。
    COMMIT频繁：
        把一些可以批量提交的事务批量处理。
        一些sql可以commit nowait。
        适量的使用nologging。
    Troubleshooting: "log file sync" Waits (文档 ID 1376916.1)

-- 查询redo相关事件
	col name for a15
	col class_name for a30
	select s.name,
		   decode(s.CLASS,
				  2,
				  'Redo',
				  4,
				  'Enqueue',
				  8,
				  'Cache',
				  16,
				  'OS',
				  32,
				  'Real Application Clusters',
				  64,
				  'SQL',
				  128,
				  'Debug') class_name,
		   s.VALUE
	  from v$sysstat s
	 where s.name like 'redo%'
	 order by value desc;
 
 
### buffer buzy waits

    buffer busy waits等待事件的原因：hot block
    Buffer Pin锁的相关等待事件：buffer busy waits
    造成buffer busy waits的元凶只能是DML语句！
    例子：大批量并发插入导致buffer busy waits
    当一个会话需要访问一个数据块，而这个数据块正在被另外一个用户从磁盘读取至内存中或者这个数据块正在被另一个会话修改，当前的会话就需要等待，
    此时会产生buffer busy waits。

### Latch

Latch 是一种轻量级的锁，不会造成阻塞，会导致等待。
阻塞，是系统设计的问题，等待，是资源争用问题。

	Check the following V$SESSION_WAIT parameter columns:

	•P1 - Address of the latch
	•P2 - Latch number
	•P3 - Number of times process has already slept, waiting for the latch


-- 查询最近等待的latch
	SELECT EVENT, SUM(P3) SLEEPS, SUM(SECONDS_IN_WAIT) SECONDS_IN_WAIT
	  FROM V$SESSION_WAIT
	 WHERE EVENT LIKE 'latch%'
	  GROUP BY EVENT;


-- 查询latch引起的等待事件占db time的比值
	SELECT EVENT, TIME_WAITED_MICRO, 
		   ROUND(TIME_WAITED_MICRO*100/S.DBTIME,1) PCT_DB_TIME 
	  FROM V$SYSTEM_EVENT, 
	   (SELECT VALUE DBTIME FROM V$SYS_TIME_MODEL WHERE STAT_NAME = 'DB time') S
	 WHERE EVENT LIKE 'latch%'
	 ORDER BY PCT_DB_TIME ASC;

### cache buffers chains

cache buffers chains等待事件处理思路：

    查找热块（表、索引）。
    改造性能低的sql，减少不必要的访问。
    若是小表，可以将表中数据分散到尽量多的块，或是将表缓存到keep池中。
    若是大表，可考虑hash分区，通过hash算法将不同的数据插入到不同的分区。
    若是索引，可改为反向键索引，注意，反向键索引不能使用index range scan。
    若是索引根块，将索引分区。

-- 查询latch的命中率
	select name,
		   gets,
		   spin_gets,
		   misses,
		   misses / gets,
		   sleeps,
		   immediate_gets,
		   immediate_misses,
		   wait_time
	  from v$latch
	 where name = 'cache buffers chains';

name: latch名称
immediate_gets: 以immediate模式latch请求数
immediate_misses: 请求失败数
gets: 以willing to wait请求模式latch的请求数
misses: 初次尝试请求不成功次数
spin_gets: 第一次尝试失败，但在以后的轮次中成功
sleep[x]:  成功获取前sleeping次数
wait_time: 花费在等待latch的时间 

如果MISSES/GETS在达10%左右，则说明有比较严重的latch争用 
 
	SELECT *
	  FROM (SELECT addr,
				   child#,
				   gets,
				   misses,
				   sleeps,
				   immediate_gets   igets,
				   immediate_misses imiss,
				   spin_gets        sgets
			  FROM v$latch_children
			 WHERE NAME = 'cache buffers chains'
			 ORDER BY sleeps DESC)
	 WHERE ROWNUM < 11;


-- 查找热点块
	set line 200 pages 999
	col owner for a20
	col object_name for a30
	col object_type for a20
	SELECT *
	  FROM (SELECT O.OWNER, O.OBJECT_NAME, O.OBJECT_TYPE, SUM(TCH) TOUCHTIME
			  FROM X$BH B, DBA_OBJECTS O
			 WHERE B.OBJ = O.DATA_OBJECT_ID
			   AND B.TS# > 0
			 GROUP BY O.OWNER, O.OBJECT_NAME, O.OBJECT_TYPE
			 ORDER BY SUM(TCH) DESC)
	 WHERE ROWNUM <= 10;


-- 查看引起latch: cache buffers chains的sql
	select a.*,b.SQL_TEXT
	  from (select count(*) cnt,
				   sql_id,
				   nvl(o.object_name, ash.current_obj#) objn,
				   substr(o.object_type, 0, 10) otype,
				   CURRENT_FILE# fn,
				   CURRENT_BLOCK# blockn
			  from v$active_session_history ash, all_objects o
			 where event like 'latch: cache buffers chains'
			   and o.object_id(+) = ash.CURRENT_OBJ#
			 group by sql_id,
					  current_obj#,
					  current_file#,
					  current_block#,
					  o.object_name,
					  o.object_type
			 order by count(*) desc)a,v$sql b
	 where rownum <= 10
	 and a.sql_id=b.sql_id;


-- 建反向键索引
	create index ind_t1_id on t1(id) reverse;


-- 对表进行minimise操作
	alter table SYS_ORG_INFO  minimize records_per_block; 

-- 查询表的数据分布在多少个块上
	select count(distinct dbms_rowid.rowid_block_number(rowid)) block_cnts
	  from SYS_ORG_INFO;


-- 查询每个块上有多少行数据
	select dbms_rowid.rowid_block_number(rowid)block_num , count(*) rows_per_block
	  from sys_org_info
	 group by dbms_rowid.rowid_block_number(rowid)
	 order by rows_per_block desc;

-- 将小表放入keep池
	exec DBMS_SHARED_POOL.KEEP ('CFIM.SYS_ORG_INFO');

### 逻辑读 

搜索buffer的过程：
	1.进程根据要访问的文件号、块号，计算hash值。
	2.根据hash值找到hash bucket。
	3.搜索bucket后的链表，查找哪个BH是目标BH（buffer header）。
	4.找到目标BH，从中取出buffer的BA（buffer address）。
	5.按BA访问buffer。

CBC Latch：保护链表
	修改完BH中Buffer Pin锁的状态后，CBC Latch将释放，之后，进程在Buffer Pin锁的保护下访问Buffer。
	在获得CBC Latch后，进程要完成两个工作：
	1.搜索链表，查找目标BH。
	2.修改BH中Buffer Pin锁的状态，加Buffer Pin锁，保护BH。

Buffer Pin锁的状态：
	共享：S
	独占：X
	没加锁：0

逻辑读为什么会消耗cpu？因为逻辑读通过hash算法判断块是否在buffer中，hash算法消耗cpu。

### 执行计划

一、表的连接顺序
	嵌套循环（Nested Loops Join)
	哈希连接（Hash Join）
	排序合并（Merge Sort Join）

二、若干hint

-- 全表扫描
	select /*+ full(s) */ * from emp s where empno=7788;
 
-- 使用索引全扫描
	/*+index(t)*/

	/*+index(table_name,index_name)*/

-- 嵌套循环
	/*+ leading(t1) use_nl(t2)*/
	t1:驱动表

-- 哈希连接
	/*+ leading(t1) use_hash(t2)*/

-- 排序合并
	/*+ ordered use_merge(t2)*/

-- 前20行
	/*+ first_rows(20) */

-- 所有行
	/*+ all_rows */

三、sql trace

	alter session set tracefile_identifier='mytest';
	alter session set sql_trace=true;
	select * from t.....
	alter session set sql_trace=false;
	tkprof wlsm_ora_6602_mytest.trc out.txt sys=no
	cat out.txt

四、sql tuning advisor

	var tuning_task varchar2(100);  
	 DECLARE  
	  l_sql_id v$session.prev_sql_id%TYPE;  
	  l_tuning_task VARCHAR2(30);  
	BEGIN  
	   l_sql_id:='9dn3p7y4fahz5';  
	   l_tuning_task := dbms_sqltune.create_tuning_task(sql_id => l_sql_id);  
	   :tuning_task:=l_tuning_task;  
	   dbms_sqltune.execute_tuning_task(l_tuning_task);  
	   dbms_output.put_line(l_tuning_task);  
	 END;  
	 /  
	 
	print tuning_task;  
	  
	SELECT dbms_sqltune.report_tuning_task(:tuning_task) FROM dual; 

五、10046事件

	sqlplus / as sysdba
	alter session set events '10046 trace name context forever,level 12';
	select * from scott.emp a,scott.dept b where a.deptno=b.deptno;
	select count(*) from scott.t1;
	select * from scott.t1;
	alter session set events '10046 trace name context off';

	cd /oracle/admin/PLMS/udump
	tkprof plms_ora_15236.trc 10046.txt sys=no sort=prsela,exeela,fchela

六、查看执行计划

正确解读执行计划的方式：构造执行计划树形图-->后续遍历
对于鹤立鸡群的sql，跑个@?/rdbms/admin/awrsqrpt

1.explain plan for sql...
	  @?/rdbms/admin/utlxpls

	  不实际执行sql，执行计划未必真实
	  必须要有plan_table

2.sqlplus  autotrace
	  除set autot traceonly explain外均执行sql，但未必真实
	  必须要有plan_table

3.sql trace 
	  需要启用10046事件或sql_trace
	  一般使用tkprof查看

4.v$sql、v$sql_plan
	select operation, options, object_name, cost
	  from v$sql a, v$sql_plan b
	 where a.sql_id = '3phfrgrq2d81d'
	   and a.address = b.address
	   and a.hash_value = b.hash_value;

5.dbms_xplan包
	  display:explain plan，来自plan table
	  display_cursor:Real plan，来自shared pool中的游标缓存
	  display_awr:history，awr仓库基表wrh$_sql_plan
	  display_sqlset:sql tuning set，sql set视图
	  
-- 最后一条sql的执行计划
	set serveroutput off
	alter session set statistics_level=all;      --不设置无法获得A-ROWS等信息
	select * from table(dbms_xplan.display_cursor(null,null,'ADVANCED ALLSTATS LAST PEEKED_BINDS'));  --sql_id为空的话默认执行最后一条sql

-- 历史执行计划
	select  * from table(dbms_xplan.display_awr('5sqz3mcggz1p6',null,null,'ADVANCED'));

-- 当前执行计划
	select * from table(dbms_xplan.display_cursor('4vak44m1h6f9t',null,'ADVANCED ALLSTATS LAST PEEKED_BINDS')); 

七、其它

-- 查询sql历史执行信息
	select s.snap_id,
		   to_char(t.begin_interval_time, 'yyyy-mm-dd hh24:mi:ss') begin_time,
		   to_char(t.end_interval_time, 'yyyy-mm-dd hh24:mi:ss') end_time,
		   s.sql_id,
		   s.plan_hash_value,
		   round(s.elapsed_time_delta / s.executions_delta)/1000000 elapsed_time_per
	  from dba_hist_sqlstat s, dba_hist_snapshot t
	 where s.sql_id = '5sqz3mcggz1p6'
	   and s.executions_delta > 0
	   and s.snap_id = t.snap_id
	 order by s.snap_id desc;

-- 查询缓存的sql执行计划是否有变化
	select s.SQL_ID, s.PLAN_HASH_VALUE
	  from v$sql s
	 where s.SQL_ID = '2amt4cr6d0hk0';


### 硬解析和绑定变量

一、是否要绑定变量
	1、不使用绑定变量，会导致硬解析高、CPU高，而且在AWR的top sql里不容易体现。同时，频繁解析sql，可能会过渡申请shared pool使得内存碎片化，进而导致ora-4031。
	2、使用绑定变量，如果发生绑定变量窥视，而且数据倾斜，将导致执行计划改变，也可能出现性能问题。有些情况不适合使用绑定变量，如t表中有status字段，99%是1,1%是0，此时若用绑定变量可能会出现错误的执行计划。

二、绑定变量处理
	1、应用级bind化处理：
	pl/sql中使用using短语。
	jdbc中通过PrepareStatement、SetXXX()的调用，为sql语句的？变量赋值。
	2、系统级bind化处理
	修改参数cursor_sharing为force

三、相关查询sql

-- 查询未绑定变量的sql
	spool unsharing_sqls.txt 
	SET pages 10000 
	SET linesize 250 
	column FORCE_MATCHING_SIGNATURE format 99999999999999999999999 
	WITH c AS
	 (SELECT FORCE_MATCHING_SIGNATURE, COUNT(*) cnt
		FROM v$sqlarea
	   WHERE FORCE_MATCHING_SIGNATURE != 0
	   GROUP BY FORCE_MATCHING_SIGNATURE
	  HAVING COUNT(*) > 20),
	sq AS
	 (SELECT sql_text,
			 FORCE_MATCHING_SIGNATURE,
			 row_number() over(partition BY FORCE_MATCHING_SIGNATURE ORDER BY sql_id DESC) p
		FROM v$sqlarea s
	   WHERE FORCE_MATCHING_SIGNATURE IN
			 (SELECT FORCE_MATCHING_SIGNATURE FROM c))
	SELECT sq.sql_text, sq.FORCE_MATCHING_SIGNATURE, c.cnt "unshared count"
	  FROM c, sq
	 WHERE sq.FORCE_MATCHING_SIGNATURE = c.FORCE_MATCHING_SIGNATURE
	   AND sq.p = 1
	 ORDER BY c.cnt DESC;
	spool off 

-- 查询不同的sql版本
	v$sql_shared_cursor

-- 查询适合绑定变量的sql
	select substr(sql_text, 1, 40) sql, count(*), sum(executions) total_execs
	  from v$sqlarea
	 where executions < 5
	 group by substr(sql_text, 1, 40)
	having count(*) > 30
	 order by 2;

-- 查询sql的绑定变量值
	col VALUE_STRING for a20
	col DATATYPE_STRING for a20
	col name for a10
	select name, datatype_string, VALUE_STRING
	  from dba_hist_sqlbind s
	 where sql_id = '833vu2ypt2hmk'
	 order by name;

	alter session set nls_date_format = 'yyyy-mm-dd,hh24:mi:ss';
	set linesize 400 pages 999
	col sql_Id format a20
	col name format a20
	col datatype_string format a14
	col value_string format a20
	
-- 根据缓存查询绑定变量
	select sql_id,hash_value,name,datatype_string,value_string,last_captured
	  from v$sql_bind_capture
	 where sql_id = '31w43w3ty7zrd'
	 order by last_captured, position;
 
-- 根据awr查询绑定变量
	select snap_id, sql_id, name, datatype_string, value_string, last_captured
	  from dba_hist_sqlbind
	 where sql_id = '31w43w3ty7zrd'
	 order by snap_id desc, name asc;

四、绑定变量窥视

-- 查看隐含参数
	set line 200 pages 999
	col name for a40
	col value for a15
	col DESCRIPTION for a50
	select a.ksppinm name, b.ksppstvl value, a.ksppdesc description
	  from x$ksppi a, x$ksppcv b
	 where a.indx = b.indx
	   and a.ksppinm like '_optim_peek_user_binds';

-- 修改隐含参数
	alter system set "_optim_peek_user_binds"=false scope=spfile;

### 降低高水位线 

alter table shrink space可以收缩段，用来消除部分行迁移，消除空间碎片，使数据更紧密。

Shrink space语法:

	alter table shrink space compcat;
	收缩表，但会保持 high water mark;

	alter table shrink space;
	收缩表，降低 high water mark;

	alter table shrink space cascade;
	收缩表，降低 high water mark，并且相关索引也要收缩

用shrink有两个前提条件:

1、表必须启用row movement，如：
	alter table nonsrt.TAB_EZG_BIZ_UNCONTRACTED enable row movement;
	alter table nonsrt.TAB_EZG_BIZ_UNCONTRACTED shrink space;
	alter table nonsrt.TAB_EZG_BIZ_UNCONTRACTED disable row movement;
	
2、表段所在表空间的段空间管理(segment space management)必须为auto。

### 表分析 

	set line 200 pages 999
	col segment_name for a30
	col partitioned for a15
	col owner for a10
	col table_owner for a10
	col TABLE_NAME for a30
	col COLUMN_NAME for a30
	col index_name for a30
	alter session set nls_date_format='yyyy-mm-dd hh24:mi:ss';

##################  非分区表  ##################
-- 表的分析时间、大小
	select a.owner,
		   a.table_name,
		   a.last_analyzed,
		   a.num_rows,
		   a.partitioned,
		   b.bytes / 1024 / 1024 size_mb
	  from dba_tables a, dba_segments b
	 where a.table_name in ('T_EB_MER_CLR_RESULT')
	   and a.table_name = b.segment_name
	   and a.owner=b.owner
	   order by a.owner;

-- 表上索引的大小
	select a.owner, a.table_name, b.index_name, c.BYTES / 1024 / 1024 size_mb
	  from dba_tables a, dba_indexes b, dba_segments c
	 where a.table_name in ('T01_CUST_INFO')
	   and a.table_name = b.table_name
	   and a.owner = b.table_owner
		and a.OWNER=c.owner
		   and a.owner='ECIFNOR'
	   and b.index_name = c.segment_name;


-- 分区表的信息
	select TABLE_OWNER, TABLE_NAME, PARTITION_NAME, NUM_ROWS, LAST_ANALYZED
	  from dba_tab_partitions
	 where table_name = 'T_PB_LOG'
	   and TABLE_OWNER = 'PBCEBDB'
	   order by table_owner,table_name,PARTITION_NAME;


-- 查询列的distinct
	select owner, table_name, COLUMN_NAME, NUM_DISTINCT
	  from dba_tab_columns
	 where table_name = 'T_PB_LOG'
		and  owner='PBCEBDB'
	order by NUM_DISTINCT desc
	 ;

   
-- 查询表上的索引
	select s.table_name,s.table_owner,s.owner, s.index_name, s.status,s.uniqueness,s.logging
	  from dba_indexes s
	 where s.table_owner in ('AML')
	   and s.table_name in ('AL_DE_JY')
	 order by s.table_owner,s.table_name,s.index_name;

-- 分区索引类型
	select s.owner, s.index_name, s.table_name, s.partitioning_type, s.locality
	  from dba_part_indexes s
	 where s.owner = 'ECIFNOR'
	   and s.table_name in ('T01_CUST_INFO')
	 order by s.owner, s.table_name;

-- 分区表索引类型
	select s.owner, s.index_name, table_name, partitioning_type, s.locality
	  from dba_part_indexes s
	 where owner = 'PBCEBDB'
	   and table_name in ( 'T_PB_LOG',''); 


-- 查询索引建在哪些列上
	select TABLE_OWNER, TABLE_NAME, INDEX_NAME, COLUMN_NAME, COLUMN_POSITION
	  from dba_ind_columns
	 where table_name in ('ECR_TMP_BD')
	   and table_owner in ('CECM')
	 order by table_name, index_name,COLUMN_POSITION asc;




-- 查看索引状态
	set linesize 180 pagesize 1000 long 9999
	col owner for a25
	col index_name for a35
	col partition_name for a40
	col index_owner for a30
	col subpartition_name for a50
	select owner, index_name, status
	  from dba_indexes
	 where status not in ('VALID', 'N/A')
	 order by 1, 2;
	select index_owner, index_name, partition_name, status
	  from dba_ind_partitions
	 where status not in ('USABLE', 'N/A')
	 order by 1, 2, 3;
	select index_owner, index_name, partition_name, subpartition_name, status
	  from dba_ind_subpartitions
	 where status not in ('USABLE')
	 order by 1, 2, 3, 4;

-- 查询列的统计信息
	select column_name,
		   NUM_DISTINCT,
		   utl_raw.cast_to_varchar2(LOW_VALUE) low,
		   low_value,
		   utl_raw.cast_to_varchar2(HIGH_VALUE) high,
		   high_value,
		   DENSITY,
		   NUM_NULLS,
		   LAST_ANALYZED,
		   AVG_COL_LEN,
		   HISTOGRAM
	  from dba_tab_col_statistics
	 where table_name = 'RT_FILESYSTEM';


----收集表的统计信息
	analyze table WF_MAIN_RECORD COMPUTE STATISTICS;
	analyze table WF_MAIN_RECORD ESTIMATE  STATISTICS;



	begin
		dbms_stats.gather_table_stats(
			ownname          => 'CFIM',
			tabname          => 'WF_MAIN_RECORD',
			estimate_percent => 10,
			degree           => 2,
			cascade          => true
		);
	end;
	/


-- 查询表的数据分布在多少个块上
	select count(distinct dbms_rowid.rowid_block_number(rowid)) block_cnts
	  from cebift.PLAT_LIST_FILE_INFO;


-- 查询每个块上有多少行数据
	select dbms_rowid.rowid_block_number(rowid)block_num , count(*) rows_per_block
	  from cebift.PLAT_LIST_FILE_INFO
	 group by dbms_rowid.rowid_block_number(rowid)
	 order by rows_per_block asc;

### 分区表 

一、分区表须知
	1.分区类型：range、list、hash。
	2.数据加载：分区交换。
	3.数据清理：删除分区。
	4.查询性能：如果要查询的数据在一个分区，可以利用分区裁剪加速查询，如果必须全表扫描，那么分区表并不会有优势。
	5.global索引还是local索引：只需知道对分区表的ddl操作将使global索引失效即可。
	6.分区索引还是非分区索引？分区索引可以解决热块问题。
	7.何时需要分区？经验值，表的行数为千万级或是大小超过4g。

二、相关查询

相关视图：
	dba_tab_partitions
	dba_tab_subpartitions
	dba_part_tables
	dba_part_indexes
	dba_part_key_columns

	set line 200 pages 999
	col segment_name for a30
	col partitioned for a15
	col owner for a10
	col table_owner for a10
	col TABLE_NAME for a30
	col COLUMN_NAME for a30
	col index_name for a30
	alter session set nls_date_format='yyyy-mm-dd hh24:mi:ss';

-- 查询数据库有哪些分区索引
	select owner, table_name, index_name
	  from dba_part_indexes s
	 where s.owner not in ('SYSTEM', 'SYS', 'DEMO')
	 order by s.owner;

-- 查询有哪些分区表
	select s.owner,s.table_name,s.def_tablespace_name
	  from dba_part_tables s
	 where s.owner not in ('SYSTEM', 'SYS', 'DEMO')
	 order by s.owner;

-- 查询表的分区名
	select s.table_owner, s.table_name, s.partition_name
	  from dba_tab_partitions s
	 where s.table_name in ('T_PB_LOG','T_EB_CNAPS_TRANDATA');

-- 查询分区表各子分区的大小
	select a.owner,
		   a.segment_name,
		   a.partition_name,
		   a.segment_type,
		   a.BYTES,
		   a.tablespace_name
	  from dba_segments a
	 where a.segment_name='WTCCONN_RT';

-- 查询SMDBDATA表空间下'%201409'分区的大小
	select sum(a.BYTES)/1024/1024 size_MB
	  from dba_segments a
	 where a.partition_name like '%201409'
	   and a.tablespace_name = 'SMDBDATA';

-- 分区表索引类型 global or local
	select s.owner, s.index_name, table_name, partitioning_type, s.locality
	  from dba_part_indexes s
	 where owner = 'PBCEBDB'
	   and index_name = 'T_PB_LOG_IDX2';

-- 查看分区键
	col owner for a15
	col name for a20
	col object_type for 15
	col column_name for a20
	col column_position for 999 
	select s.owner,s.name,s.column_name,s.column_position
	  from dba_part_key_columns s
	 where object_type = 'TABLE'
	   and name in ('ECAS_TRAN_DATA')
	 order by owner, name;

-- 生成删除分区语句
	select 'alter table ' || s.table_owner || '.' || s.table_name ||
		   ' drop partition ' || s.partition_name || ';' sql
	  from dba_tab_partitions s
	 where table_name = 'T_PB_LOG'
	   and substr(partition_name, 3) < to_char(sysdate - 30, 'yyyymmdd')
	 order by partition_name asc;

-- 检查最大分区
	select table_owner, table_name, max(partition_name)
	  from dba_tab_partitions
	 where table_owner not in ('SYS', 'SYSTEM')
	   and partition_name not like '%MAX%'
	 group by table_owner, table_name
	 order by table_owner;

三、非分区表改为分区表

如何将一个普通的非分区表进行分区 (文档 ID 1985005.1)
	A) 通过 Export/import 方法
	B) 通过 Insert with a subquery 方法
	C) 通过 Partition Exchange 方法
	D) 通过 DBMS_REDEFINITION 方法

A)通过 Export/import 方法
	1.exp usr/pswd tables=numbers file=exp.dmp
	2.drop 表名;
	3.重建分区表
	create table numbers (qty number(3), name varchar2(15)) partition by range (qty)(partition p1 values less than (501),
	partition p2 values less than (maxvalue));
	4.导入数据
	imp usr/pswd file=exp.dmp ignore=y
 
B) 通过 Insert with a subquery 方法
1.创建一个分区表：
	create table partbl (qty number(3), name varchar2(15)) partition by range (qty) (partition p1 values less than (501),partition p2 values less than (maxvalue));

2.将原来非分区表中的数据通过子查询 insert 到新创建的分区表中：
传统的 insert
	SQL> insert into partbl (qty, name) select * from origtbl;
	--------------------------------------------
	| Id  | Operation                | Name    |
	--------------------------------------------
	|   0 | INSERT STATEMENT         |         |
	|   1 |  LOAD TABLE CONVENTIONAL |         |
	|   2 |   TABLE ACCESS FULL      | ORIGTBL |
	--------------------------------------------

Direct load insert 方式
	SQL> insert /*+APPEND*/ into partbl (qty, name) select * from origtbl;
	--------------------------------------
	| Id  | Operation          | Name    |
	--------------------------------------
	|   0 | INSERT STATEMENT   |         |
	|   1 |  LOAD AS SELECT    |         |
	|   2 |   TABLE ACCESS FULL| ORIGTBL |
	--------------------------------------

Direct load insert 并且在查询部分开启并行
	SQL> insert /*+APPEND PARALLEL*/ into partbl (qty, name) select * from origtbl;
	------------------------------------------
	| Id  | Operation             | Name     |
	------------------------------------------
	|   0 | INSERT STATEMENT      |          |
	|   1 |  LOAD AS SELECT       |          |
	|   2 |   PX COORDINATOR      |          |
	|   3 |    PX SEND QC (RANDOM)| :TQ10000 |
	|   4 |     PX BLOCK ITERATOR |          |
	|*  5 |      TABLE ACCESS FULL| ORIGTBL  |
	------------------------------------------
	注意以上执行计划中 LOAD AS SELECT 在 PX COORDINATOR 的上面。

Direct load insert 并且在查询部分和 insert 部分都开启并行
	SQL>alter session enable parallel dml;
	SQL> insert /*+APPEND PARALLEL*/ into partbl (qty, name) select * from origtbl;
	------------------------------------------
	| Id  | Operation             | Name     |
	------------------------------------------
	|   0 | INSERT STATEMENT      |          |
	|   1 |  PX COORDINATOR       |          |
	|   2 |   PX SEND QC (RANDOM) | :TQ10000 |
	|   3 |    LOAD AS SELECT     |          |
	|   4 |     PX BLOCK ITERATOR |          |
	|*  5 |      TABLE ACCESS FULL| ORIGTBL  |
	------------------------------------------
	注意在以上执行计划中 LOAD AS SELECT 在 PX COORDINATOR 的下面。

另外一种可选的方式是直接通过 select 来创建新的分区表：一次性创建新的分区表并且加载数据。
执行计划同时显示 direct path load 并且 dml 以及 select 部分全部并行。

	SQL>alter session enable parallel dml;
	SQL> create table partbl (qty, name) partition by range (qty) (partition p1 values less than (501),partition p2 values less than (maxvalue))
	  2  as select /*+PARALLEL*/ * from origtbl;
	-------------------------------------------
	| Id  | Operation              | Name     |
	-------------------------------------------
	|   0 | CREATE TABLE STATEMENT |          |
	|   1 |  PX COORDINATOR        |          |
	|   2 |   PX SEND QC (RANDOM)  | :TQ10000 |
	|   3 |    LOAD AS SELECT      |          |
	|   4 |     PX BLOCK ITERATOR  |          |
	|*  5 |      TABLE ACCESS FULL | ORIGTBL  |
	-------------------------------------------

3.修改表名
	drop table origtbl;
	alter table partbl rename to origtbl;

C) 通过 Partition Exchange 方法
	ALTER TABLE EXCHANGE PARTITION 可以通过交换数据和索引 segment 来将一个分区（或子分区）转换成一个非分区表，也可以将一个非分区表转换成一个分区表的分区（或子分区）。 除了需要更新索引以外，ALTER TABLE ... EXCHANGE PARTITION 命令是一个字典操作不需要数据移动。更多关于此方法的信息参见 Oracle 联机文档（比如 11.2）和 Note 198120.1。

	此方法简要步骤如下：
	1) 根据所需的分区来创建新的分区表
	2) 保持需要交换的非分区表与分区表的分区有相同的结构，并且确保您需要交换的非分区表具有您想要交换的内容
	3) 执行：Alter table exchange partition partition_name with table exchange table

	注意在交换过程中，所有交换的数据必须满足分区表的分区定义，否则如下错误将抛出：ORA-14099: all rows in table do not qualify for specified partition.

这是因为默认情况下分区交换是有校验的。

例子（基于 SCOTT 示例 schema）
---------
本例创建了与分区表 p_emp 的分区相同结构的交换表。
	SQL> CREATE TABLE p_emp
	(sal NUMBER(7,2))
	PARTITION BY RANGE(sal)
	(partition emp_p1 VALUES LESS THAN (2000),
	partition emp_p2 VALUES LESS THAN (4000));

	Table created.

	SQL> SELECT * FROM emp;

		 EMPNO ENAME      JOB              MGR HIREDATE         SAL       COMM     DEPTNO
	---------- ---------- --------- ---------- --------- ---------- ---------- ----------
		  7369 SMITH      CLERK           7902 17-DEC-80        800                    20
		  7499 ALLEN      SALESMAN        7698 20-FEB-81       1600        300         30
		  7521 WARD       SALESMAN        7698 22-FEB-81       1250        500         30
		  7566 JONES      MANAGER         7839 02-APR-81       2975                    20
		  7654 MARTIN     SALESMAN        7698 28-SEP-81       1250       1400         30
		  7698 BLAKE      MANAGER         7839 01-MAY-81       2850                    30
		  7782 CLARK      MANAGER         7839 09-JUN-81       2450                    10
		  7788 SCOTT      ANALYST         7566 19-APR-87       3000                    20
		  7839 KING       PRESIDENT            17-NOV-81       5000                    10
		  7844 TURNER     SALESMAN        7698 08-SEP-81       1500          0         30
		  7876 ADAMS      CLERK           7788 23-MAY-87       1100                    20
		  7900 JAMES      CLERK           7698 03-DEC-81        950                    30
		  7902 FORD       ANALYST         7566 03-DEC-81       3000                    20
		  7934 MILLER     CLERK           7782 23-JAN-82       1300                    10
	14 rows selected.

	SQL> CREATE TABLE exchtab1 as SELECT sal FROM emp WHERE sal<2000;
	Table created.
	SQL> CREATE TABLE exchtab2 as SELECT sal FROM emp WHERE sal BETWEEN 2000 AND 3999;
	Table created.
	SQL> alter table p_emp exchange partition emp_p1 with table exchtab1;
	Table altered.
	SQL> alter table p_emp exchange partition emp_p2 with table exchtab2;
	Table altered

D) 通过 DBMS_REDEFINITION 方法
	详情参见：
			Note 472449.1 How To Partition Existing Table Using DBMS_Redefinition
			Note 1481558.1  DBMS_REDEFINITION: Case Study for a Large Non-Partition Table to a Partition Table with Online Transactions occuring
			Note 177407.1 How to Re-Organize a Table Online



### 索引 

一、建索引时对数据库的影响
	1、建索引会排序，消耗cpu，同时会锁表。
	2、会使用temp表空间。

二、索引对dml的影响
	1.对insert语句负面影响最大，只要有索引，插入就慢，越多越慢
	2.对delete来说，有好有坏，在海量数据库中删除少量记录时，条件列是索引列是必要的，但是过多列有索引还是会有明显影响，
	因为其他列的索引也要被更新。在经常要删除大量记录的时候，危害加剧！
	3.对update语句负面影响最小，快速定位少量记录并更新的场景和delete类似，但是具体修改某列时却有差别，不会触及其他索引列的维护。

三、生成编译无效索引的语句

-- 非分区索引
	select 'alter index ' || s.owner || '.' || s.index_name || ' rebuild;'
	  from dba_indexes s
	 where s.status not in ('VALID', 'N/A')
	   and s.owner not in ('SYS', 'SYSTEM');

-- 分区索引
	select 'alter index ' || index_owner || '.' || index_name || ' rebuild partition ' ||
		   partition_name || ';'
	  from dba_ind_partitions s
	 where status not in ('USABLE', 'N/A')
	   and s.index_owner not in ('SYS', 'SYSTEM');

四、分区索引

-- 建本地分区索引
	create index pbebisdb.ebis_t_pb_log_ind1 on pbebisdb.t_pb_log (trandate,trantime) local tablespace cebip_indx online;


-- 查询分区表的索引是local还是global
	select owner, table_name, index_name, table_name, locality
	  from dba_part_indexes
	 where owner not in ('SYS', 'SYSTEM')
	 order by owner;


-- 查询分区表上索引是否分区
	select s.owner,
		   s.table_name,
		   t.index_name,
		   t.index_type,
		   t.uniqueness,
		   t.partitioned
	  from dba_part_tables s, dba_indexes t
	 where s.owner not in ('SYS', 'SYSTEM')
	   and s.owner = t.table_owner
	   and s.table_name = t.table_name
	 order by s.owner;

五、监控索引

-- 启用索引监控  
	alter index emp_ename_idx monitoring usage;  

-- 查看索引是否使用  
	select index_name,monitoring,used from v$object_usage;

-- 禁用索引监控  
	alter index emp_ename_idx nomonitoring usage; 
	
### 锁 

-- 查询导致死锁的sql
	select sql_id, count(*)
	  from v$active_session_history
	 where event = 'enq: TX - row lock contention'
	   and sample_time > to_date('20150616 18:00', 'yyyymmdd hh24:mi')
	   and sample_time < to_date('20150616 18:40', 'yyyymmdd hh24:mi')
	 group by sql_id
	 order by 2;

-- 查询锁持有时长
	select /*+ rule */
	 'LOCK_SID:' || t1.sid || '  Address of lock:' || t1.KADDR, t1.ctime
	  from v$lock t1, v$session t2, SYS.OBJ$ t3
	 where lmode > 0
	   and (t2.PROGRAM not like '%(DW%)' or t2.PROGRAM is null)
	   and t3.OBJ# = t1.ID1
	   and t1.type = 'TM'
	   and t1.sid = t2.sid;


	select  a.sid "Lock_sid", a.KADDR "Address of lock",a.CTIME
	  from v$lock a, v$session b, dba_objects c
	 where a.type = 'TM'
	   and a.lmode > 0
	   and a.SID=b.SID
	   and a.ID1=c.OBJECT_ID
	   and (b.PROGRAM not like '%(DW%)' or b.PROGRAM is null);

-- 查看锁排队、等待情况
	set pagesize 999 linesize 120
	col lock_info for a60 
	select 'LOCKED_OBJ:' || decode(CHR(bitand(b.p1, -16777216) / 16777215) ||
								   CHR(bitand(b.p1, 16711680) / 65535),
								   'TX',
								   nvl(c.name, 'Not Table'),
								   'TM',
								   c.name,
								   'Not Obj Lock') || ',LOCK_TYPE:' ||
		   CHR(bitand(b.p1, -16777216) / 16777215) ||
		   CHR(bitand(b.p1, 16711680) / 65535) || ',LOCK_TIME:' ||
		   max(b.SECONDS_IN_WAIT) || ',LOCK_CNT:' || count(b.sid) lock_info,
		   count(b.sid) wait_sessions
	  from (select w.p1, w.p2, w.seconds_in_wait, a.sid, a.ROW_WAIT_OBJ#
			  from v$session a, v$session_wait w
			 where a.sid = w.sid
			   and w.event like 'enq%'
			   and w.state = 'WAITING') b,
		   sys.obj$ c
	 where c.obj#(+) = decode(CHR(bitand(b.p1, -16777216) / 16777215) ||
							  CHR(bitand(b.p1, 16711680) / 65535),
							  'TX',
							  b.ROW_WAIT_OBJ#,
							  'TM',
							  b.p2,
							  2)
	 group by b.p1, c.name;

v$lock视图：

	set line 200 pages 999
	col session_id for 9999
	col owner for a10
	col object_name for a20
	col object_type for a15
	col blocked_sid for 9999
	col blocking_sid for 9999
	col session_status for a17
	col sql_id for a15
	col sql_text for a20
	col last_call_et for 999999999
	col event for a20
	col program for a20
	col lock_type for a10

-- 查询被阻塞的信息
	select b.sid              blocked_sid,
		   b.blocking_session blocking_sid,
		   b.status           session_status,
		   a.sql_id,
		   a.sql_text,
		   b.last_call_et,
		   b.event,
		   b.program,
		   c.type             lock_type
	  from v$sqlarea a, v$session b, v$lock c
	 where a.sql_id = b.sql_id
	   and b.sid = c.sid
	   and c.request > 1;

-- 查询阻塞/被阻塞的对象
	select a.session_id, owner, object_name, object_type
	  from v$locked_object a, dba_objects b
	 where a.object_id = b.object_id
	 order by session_id;

-- kill阻塞者会话
	select 'alter system kill session ' || '''' || a.blocking_session || ',' ||
		   b.serial# || '''' || ';' kill_sql
	  from v$session a, v$session b
	 where a.blocking_session is not null
	   and a.blocking_session = b.sid;

### 统计信息 

统计信息是打开oracle优化大门的金钥匙！

一、收集统计信息

1、收集统计信息
	begin
		dbms_stats.gather_table_stats(
			ownname          => 'CASH',
			tabname          => 'GLSINACCTLIST',
			estimate_percent => 20,
			method_opt       => 'FOR ALL',
			degree           => 2,
			cascade          => true
		);
	end;
	/

2、检查统计信息收集后的sql执行计划
	explain plan for ...
	select * from table(dbms_xplan.display);

3.查询回退时间
	select to_char(stats_update_time,'yyyymmdd hh24:mi:ss') from dba_tab_stats_history where table_name='GLSINACCTLIST';
 
4.回退
	$>sqlplus /nolog
	SQL>conn / as sysdba
	SQL>begin
		DBMS_STATS.RESTORE_TABLE_STATS(
			ownname				   => 'CASH',
			tabname				   => 'GLSINACCTLIST',
			as_of_timestamp        =>  to_timestamp('yyyymmdd hh24:mi:ss','20141230 22:27:54')
		);
	end;
	/

二、查询需要收集统计信息的表

	exec dbms_stats.FLUSH_DATABASE_MONITORING_INFO();
	select to_char(sysdate,'yyyymmdd'),
			 'common',
			 a.table_name,
			 owner,
			 'dbms_stats.gather_table_stats(ownname=>''' || owner ||
			 ''', tabname=>''' || a.table_name || ''');',
			 'common',
			 null
		from dba_tables a,
			 CEBDBA_STATS_SPECIAL_PARA b,
			 (select table_owner,
					 table_name,
					 sum(inserts) sum_i,
					 sum(updates) sum_u,
					 sum(deletes) sum_d
				from sys.dba_tab_modifications
			   group by table_owner, table_name) c
	   where a.table_name = upper(b.table_name(+))
		 and a.owner = upper(b.table_owner(+))
		 and b.table_name is null
		 and a.table_name = c.table_name
		 and a.owner = c.table_owner
		 and a.owner in ('&username')
		 and ((c.sum_i + c.sum_u + c.sum_d) /
			 decode(a.num_rows, null, 1, 0, 1, a.num_rows) >= 0.1);

三、查询数据库自动收集任务

	select CLIENT_NAME,status from dba_autotask_client;

	select job_name, enabled, state
	  from dba_scheduler_jobs s
	 where s.job_name = 'BSLN_MAINTAIN_STATS_JOB';

四、查询window信息

	select window_name,active,ENABLED from ALL_SCHEDULER_WINDOWS;
	exec dbms_scheduler.disable('CEBDBA_STATS_COMMON_WINDOW'); 
	exec dbms_scheduler.close_window('CEBDBA_STATS_COMMON_WINDOW'); 

	
### AWR 

查询AWR保留策略：
	set line 200 pages 999
	col DBID for 999999999999999
	col SNAP_INTERVAL for a20
	col RETENTION for a20
	col TOPNSQL for a20
	select * from dba_hist_wr_control;

查询快照：
	col snap_id for 99999
	col STARTUP_TIME for a30
	col BEGIN_INTERVAL_TIME for a30
	col END_INTERVAL_TIME for a30
	select snap_id, startup_time, begin_interval_time, end_interval_time
	  from dba_hist_snapshot
	 order by begin_interval_time asc;

设置AWR保留策略（sys用户执行）：每半小时生成一次，保留40天
	exec dbms_workload_repository.modify_snapshot_settings(interval=>30, retention=>40*24*60);

生成快照：
	exec dbms_workload_repository.create_snapshot();

生成AWR报告：
	@?/rdbms/admin/awrrpt

查询基线大小：
	SELECT dbid, baseline_name, baseline_type, moving_window_size from dba_hist_baseline;

生成AWR时间段比较报告：
	@ORACLE_HOME/rdbms/admin/awrddrpt

	
### redo与归档

一、查询日志切换信息

查询日志切换频率（每小时）:
	select to_char(first_time,'yyyymmdd hh24')||floor(to_char(first_time,'mi')/30) log_date,count(*) 
	from v$archived_log 
	group by to_char(first_time,'yyyymmdd hh24')||floor(to_char(first_time,'mi')/30) order by 1;


	set pagesize 4000
	select to_char(FIRST_TIME,'yyyymmdd hh24')||floor(to_char(FIRST_TIME,'mi')/30)  log_date,count(*) 
	from v$log_history 
	group by   to_char(FIRST_TIME,'yyyymmdd hh24')||floor(to_char(FIRST_TIME,'mi')/30) 
	order by 1;


	set pagesize 4000
	select to_char(FIRST_TIME,'yyyymmdd hh24'),count(*) 
	from v$log_history 
	group by   to_char(FIRST_TIME,'yyyymmdd hh24') 
	order by 1;


	set pagesize 4000
	select to_char(FIRST_TIME,'yyyymmdd'),count(*) 
	from v$log_history 
	group by to_char(FIRST_TIME,'yyyymmdd')
	order by 1;


-- 查询每天生成的日志数量
	select to_char(FIRST_TIME, 'yyyymmdd') log_date,
		   count(*) cnt
	  from v$log_history
	 group by to_char(FIRST_TIME, 'yyyymmdd')  
	 order by 1;

	select to_char(FIRST_TIME, 'yyyymmdd') log_date,
		   count(*) cnt
	  from v$archived_log
	 group by to_char(FIRST_TIME, 'yyyymmdd')  
	 order by 1;

-- 一天前每小时产生的日志
	select to_char(first_time, 'yyyymmdd hh24') log_date, count(*)
	  from v$archived_log
	 where to_char(first_time, 'yyyymmdd') >= to_char(sysdate - 1, 'yyyymmdd')
	   --and to_char(first_time, 'hh24') between '02' and '10'
	 group by to_char(first_time, 'yyyymmdd hh24')
	 order by 1;

-- 每小时归档的日志量
	select to_char(first_time, 'yyyy-mm-dd hh24'), count(*)
	  from v$log_history
	 where thread# = 1
	 group by to_char(first_time, 'yyyy-mm-dd hh24')
	 order by to_char(first_time, 'yyyy-mm-dd hh24');

二、查询归档信息

-- 查看最后一次归档时间
	set pagesize 999 linesize 120
	col last_arch_time for a20 
	select thread# instance_id,
		   to_char(max(completion_time), 'yyyymmdd hh24:mi:ss') last_arch_time
	  from v$archived_log
	 group by thread#
	 order by instance_id;

 
-- 查看无法归档时长
	set pagesize 999 linesize 120
	col log_seq for a12 
	select p.thread# || '.' || p.group# || '.' || p.sequence# log_seq,
		   round(86400 * (sysdate - n.first_time)) noarch_seconds
	  from v$log p, v$log n
	 where p.sequence# = n.sequence# - 1
	   and p.archived = 'NO'
	   and p.thread# = n.thread#;

-- 查询每天的归档数量
	select to_char(s.FIRST_TIME, 'yyyyMMdd') arch_date, count(*)
	  from v$archived_log s
	 group by to_char(s.FIRST_TIME, 'yyyyMMdd')
	 order by to_char(s.FIRST_TIME, 'yyyyMMdd');


-- 检查spfile中是否存在sid不同的重复参数
	col sid for a10
	col name for a40
	col value for a20
	select s.sid,s.name,s.value from v$spparameter s;

### v$session

-- 查询当前连接数据库的应用用户
	set line 200 pages 999
	col program for a40
	set line 200 pages 999
	col username for a20
	col wait_class for a20
	select sid, serial#, username, status, program, sql_id, wait_class
	  from v$session a
	 where type = 'USER'
	   and status = 'ACTIVE'
	 order by wait_class;

-- 查询当前session正在执行的sql
	set line 200 pages 999
	col sid for 99999
	col sql_id for a15
	col sql_hash_value for 999999999999999
	col sql_text for a30
	col LAST_CALL_ET for a15
	select sid,s.sql_id,s.sql_hash_value,t.sql_text,s.LAST_CALL_ET seconds,event
	  from v$session s, v$sqlstats t
	 where s.type = 'USER'
	   and s.sql_id is not null
	   and s.sql_id = t.sql_id(+)
	   and s.status = 'ACTIVE';

-- 查询os进程正在执行的sql
	set line 200 pages 999
	col sql_id for a20
	col sql_text for a100
	select c.sql_id,c.plan_hash_value,to_char(substr(sql_fulltext,1,4000))
	  from v$process a, v$session b, v$sql c
	 where a.ADDR = b.PADDR
	   and b.SQL_ID = c.SQL_ID
	   and a.spid = '17194';

-- 查询开销较大的sql
	select l.sid ssid,
		   substr(opname, 1, 15) opanme,
		   target,
		   trunc((sofar / totalwork) * 100) pct,
		   to_char(60 * l.sofar * 8192 /
				   (24 * 60 * (l.last_update_time - l.start_time)) / 1024 / 1024 / 60,
				   '0000.0') rate,
		   l.elapsed_seconds / 60 es,
		   l.time_remaining / 60 tr,
		   s.program,
		   s.machine
	  from v$session_longops l, v$session s
	 where l.time_remaining > 0
	   and l.sid = s.sid
	 order by start_time;

-- 查询当前已连接数据库的用户
	set line 200
	col sid for 99999
	col serial# for 999999
	col username for a10
	col status for a10
	col machine for a10
	col program for a15
	col type for a8
	col sql_id for a15
	col event for a20
	col state for a20
	select s.SID,
		   s.SERIAL#,
		   s.USERNAME,
		   s.STATUS,
		   s.MACHINE,
		   s.PROGRAM,
		   s.TYPE,
		   s.SQL_ID,
		   s.LOGON_TIME,
		   s.EVENT,
		   s.STATE
	  from v$session s
	 where s.USERNAME is not null;

### v$transaction


-- 查询undo段信息：大小及状态
	select tablespace_name, status, sum(bytes) / 1024 / 1024
	  from dba_undo_extents
	 group by tablespace_name, status;

-- 查询回滚完成时间
	select usn,
		   state,
		   undoblockstotal "Total",
		   undoblocksdone "Done",
		   undoblockstotal - undoblocksdone "ToDo",
		   decode(cputime,
				  0,
				  'unknown',
				  sysdate + (((undoblockstotal - undoblocksdone) /
				  (undoblocksdone / cputime)) / 86400)) "Estimated time to complete"
	  from v$fast_start_transactions;

	col program for a15
	col machine for a15
	select distinct s.sid,
					t.xidusn,
					t.xidslot,
					t.xidsqn,
					round(t.used_ublk * 8 / 1024, 2) undo_MB,
					used_urec undo_records,
					s.machine,
					s.program,
					s.status,
					l.sql_text,
					s.logon_time
	  from v$transaction t, v$session s, v$sqlarea l
	 where t.ses_addr = s.saddr
	   and decode(s.sql_hash_value, 0, s.prev_hash_value, s.sql_hash_value) = l.hash_value(+)
	 order by undo_MB;

### PGA 

-- 查询会话使用的pga情况
	select sum(value)/1024/1024 size_mb
	  from v$sesstat s,v$statname n
	where n.statistic#=s.statistic#
	  and name = 'session pga memory';

-- 查询消耗PGA的操作
	col name for a30
	select sid,name,value
	  from v$statname n,v$sesstat s
	 where n.statistic#=s.statistic#
	   and name like 'session%memory%'
	 order by 3 asc; 

-- PGA分配情况
	col c1 heading 'Program|Name'         format a30
	col c2 heading 'PGA|Used|Memory'      format 999,999,999
	col c3 heading 'PGA|Allocated|Memory' format 999,999,999
	col c4 heading 'PGA|Maximum|Memory'   format 999,999,999
	col username forma a10
	select a.program       c1,
		   a.username,
		   b.pga_used_mem  c2,
		   b.pga_alloc_mem c3,
		   b.pga_max_mem   c4
	  from v$session a, v$process b
	 where a.paddr = b.addr
	 order by c4 desc;

-- 查询pga组件大小
	select * from v$pgastat;







