

### 1. smart scan

通过：cell_offload_processing 来限制(一般通过 session级别)

alter session set cell_offload_processing=false;

Tips： cell_offload_processing 其实是用来控制 offloading功能的一个参数，exadata的offloading除了smart scan还有下面内容

Offloading 包含:
- SQL Optimizations(smart scans)
- RMAN Backup and restore
- File Creation (Smart/Fast File Creation)

只这个参数设置为false外，在测试可能发现： "cell physical IO bytes eligible for predicate offload." 依旧有值，表示offloading依旧发挥作用，可能是在测试sql时候有File Creation的步骤，如Insert大量数据，需要额外空间，格式化文件格式动作会offload到存储服务器上进行。对于File Creation (Smart/Fast File Creation) 可以通过 _cell_fast_file_create 来控制。

alter system set _cell_fast_file_create = FALSE;


NAME						   VALUE		DESCRIPTION
-------------------------- ----------- ---------------------------------------------------------
cell_offload_processing 	   TRUE 		enable SQL processing offload to cells
_cell_fast_file_create		   TRUE 		Allow optimized file creation path for Cells


4 Administering Oracle Database on Exadata 
https://docs.oracle.com/en/engineered-systems/exadata-database-machine/sagug/exadata-administering-db.html#GUID-4D6BBD8E-E35B-43B9-A042-14F2E3DFC42C
Note:
The CELL_OFFLOAD_PROCESSING initialization parameter cannot be used to compare the performance of Oracle Exadata Storage Server with conventional storage. Even when CELL_OFFLOAD_PROCESSING is set to FALSE, Oracle Exadata Storage Server has many advantages over conventional storage. Oracle Exadata Storage Server is highly optimized for fast processing of large queries. It has no bottlenecks at the controller or other levels inside the cell. Oracle Exadata System Software uses a modern scale-out architecture and a state-of-the-art InfiniBand network that has much higher throughput than conventional storage networks. Oracle Exadata System Software is tightly integrated with the Oracle Database, and has unique capabilities for setup, execution, monitoring, diagnostics, resource management, and corruption prevention. 


https://blogs.oracle.com/otnjp/tsushima-hakushi-69

https://cloud.tencent.com/developer/article/1190837

哪些sql用了smart scan：
SELECT SQL_ID,SUBSTR(SQL_TEXT,0,150), IO_CELL_OFFLOAD_ELIGIBLE_BYTES/1024/1024/1024 G FROM V$SQL WHERE IO_CELL_OFFLOAD_ELIGIBLE_BYTES<>0;

查看某条sql的smart scan效率：

select 
sql_id ,
child_number,
decode(io_cell_offload_eligible_bytes,0,'No','Yes') OFFLOAD,
decode(io_cell_offload_eligible_bytes,0,0,100*(io_cell_offload_eligible_bytes-IO_interconnect_bytes))/decode(io_cell_offload_eligible_bytes,0,1,io_cell_offload_eligible_bytes) "IO_saved%",
(ELAPSED_TIME/1000000/DECODE(NVL(EXECUTIONS,0),0,1,EXECUTIONS)) avg_time
from gv$sql s where sql_id in ('&sqlid') order by 1,2,3;


col NAME for a60
col INSTANCE for a12
set pages 9999
set lines 200
set echo off
set trims on

SELECT
        s.NAME
       ,m.VALUE
  FROM v$mystat m, v$statname s
 WHERE m.STATISTIC# = s.STATISTIC#
   AND s.NAME IN (
	 'physical read total bytes'
	,'physical write total bytes'
	,'cell physical IO bytes eligible for predicate offload'
	,'cell physical IO interconnect bytes'
	,'physical read total IO requests'
	,'cell flash cache read hits'
	,'cell IO uncompressed bytes'
	,'cell physical IO interconnect bytes returned by smart scan'
	,'cell physical IO bytes saved by storage index'
	,'cell physical IO bytes sent directly to DB node to balanceCPU'
)
;



7d2w26790ufu7

1juuwsjz2vvsy

### 2.bloom filter

布隆过滤

1970年就提出此理论
Oracle 10g R2的时候第一次引入布隆过滤，是在优化并行操作时候使用，目的是为了减少并行进程之间通信时候的数据传输。
到Oracle 11gR1布隆过滤特性开始支持多表关联时候的裁剪。

Exadata的布隆过滤是值把布隆过滤器offload到存储服务器进行操作，把只满足条件的数据传回计算节点，间接提升SQL的查询性能。

布隆过滤只在hast连接时候才起作用。

Exadata布隆过滤相关参数

NAME						   VALUE		DESCRIPTION
-------------------------------------------------- -------------------- ----------------------------------------------------------------------
_bloom_filter_debug				   0			debug level for bloom filtering
_bloom_filter_enabled				   TRUE 		enables or disables bloom filter
_bloom_filter_size				   0			bloom filter vector size (in KB)
_bloom_folding_density				   16			bloom filter folding density lower bound
_bloom_folding_enabled				   TRUE 		Enable folding of bloom filter
_bloom_folding_min				   128			bloom filter folding size lower bound (in KB)
_bloom_max_size 				   262144		maximum bloom filter size (in KB)
_bloom_minmax_enabled				   TRUE 		enable or disable bloom min max filtering
_bloom_predicate_enabled			   TRUE 		enables or disables bloom filter predicate pushdown
_bloom_predicate_offload			   TRUE 		enables or disables bloom filter predicate offload to cells
_bloom_pruning_enabled				   TRUE 		Enable partition pruning using bloom filtering
_bloom_pushing_max				   512			bloom filter pushing size upper bound (in KB)
_bloom_pushing_total_max			   262144		bloom filter combined pushing size upper bound (in KB)
_bloom_rm_filter				   FALSE		remove bloom predicate in favor of zonemap join pruning predicate
_bloom_serial_filter				   ON			enable serial bloom filter on exadata
_bloom_sm_enabled				   TRUE 		enable bloom filter optimization using slave mapping
_bug27333536_bloom_max_wait_time		   5000 		bloom filter RAC message wait time upper bound (in ms)
_optimizer_inmemory_bloom_filter		   TRUE 		controls serial bloom filter for in-memory tables


 通过 session 级别来 _bloom_filter_enabled 设置False来禁止不隆过滤特性，而_bloom_pruning_enabled只能部分关闭（分区表）

 ### 函数OFFLOAD

 v$sqlfn_metadata 视图中offloadable列表明哪些内置函数是允许智能扫描

SQL> select name,disp_type,descr from v$sqlfn_metadata where offloadable ='YES';

SQL> select count(1) from v$sqlfn_metadata where offloadable ='YES';

  COUNT(1)
----------
       418
SQL> 

12.1 -》 418 rows


### Smart Scan发生条件

1.全扫描（full table scan/index fast full scan）
2.直接路径加载
3.数据存放在存储服务器上
4.asm的cell.smart_scan_capable属性是true

通常用下面参数来控制测试smart scan
session级别_very_large_object_threshold 设置为1 ，容易把sql对象识别为大表
把_serial_direct_read 设置为 always，全部sql都是直接路径加载(never表示从不)

NAME						   VALUE		DESCRIPTION
----------------------------- ------------ -------------------------------------------------------------
_very_large_object_threshold       500			upper threshold level of object size for direct reads
_serial_direct_read				   auto 		enable direct read in serial

其他相关参数：_direct_read_decision_statistics_driven
_direct_read_decision_statistics_driven 	   TRUE 		enable direct read decision based on optimizer statistics

Optimizer statistics-driven direct path read decision for full table scans (_direct_read_decision_statistics_driven)
https://tanelpoder.com/2012/09/03/optimizer-statistics-driven-direct-path-read-decision-for-full-table-scans-_direct_read_decision_statistics_driven/

_direct_read_decision_statistics_driven 表示直接路径读的判断条件的参数是来之于 统计信息 dba_tables.blocks 所以表的数块个书并不是真实的是数据块数目。
true表示从统计信息数据而来（默认方式）
flase表示会从段头信息中获取实际的数据块数量来决定是否DPR


SQL> alter session set "_very_large_object_threshold"=1;

Session altered.

Elapsed: 00:00:00.00
SQL> 
SQL> alter session set "_serial_direct_read"=always;

Session altered.

Elapsed: 00:00:00.00
SQL> select count(*) from t2;

  COUNT(*)
----------
     20446

Elapsed: 00:00:00.03
col NAME for a60
col INSTANCE for a12
set pages 9999
set lines 200
set echo off
set trims on
SQL> 
SELECT
        s.NAME
       ,m.VALUE
  FROM v$mystat m, v$statname s
 WHERE m.STATISTIC# = s.STATISTIC#
   AND s.NAME IN (
 'physical read total bytes'
,'physical write total bytes'
,'cell physical IO bytes eligible for predicate offload'
,'cell physical IO interconnect bytes'
,'physical read total IO requests'
,'cell flash cache read hits'
,'cell IO uncompressed bytes'
,'cell physical IO interconnect bytes returned by smart scan'
,'cell physical IO bytes saved by storage index'
,'cell physical IO bytes sent directly to DB node to balanceCPU'
)
 18  ;

NAME								  VALUE
------------------------------------------------------------ ----------
physical read total IO requests 				     86
physical read total bytes				       12271616
physical write total bytes					4898816
cell physical IO interconnect bytes			       24777976
cell physical IO bytes eligible for predicate offload		2449408
cell physical IO bytes saved by storage index			      0
cell physical IO interconnect bytes returned by smart scan	 259320
cell IO uncompressed bytes					2449408
cell flash cache read hits					     77

9 rows selected.

Elapsed: 00:00:00.00
SQL> 
select 
sql_id ,
child_number,
decode(io_cell_offload_eligible_bytes,0,'No','Yes') OFFLOAD,
decode(io_cell_offload_eligible_bytes,0,0,100*(io_cell_offload_eligible_bytes-IO_interconnect_bytes))/decode(io_cell_offload_eligible_bytes,0,1,io_cell_offload_eligible_bytes) "IO_saved%",
(ELAPSED_TIME/1000000/DECODE(NVL(EXECUTIONS,0),0,1,EXECUTIONS)) avg_time
  7  from gv$sql s where sql_id in ('&sqlid') order by 1,2,3;
Enter value for sqlid: 94dwfa8yd87kw
old   7: from gv$sql s where sql_id in ('&sqlid') order by 1,2,3
new   7: from gv$sql s where sql_id in ('94dwfa8yd87kw') order by 1,2,3

SQL_ID	      CHILD_NUMBER OFF	IO_saved%   AVG_TIME
------------- ------------ --- ---------- ----------
94dwfa8yd87kw		 0 No		0    .001264
94dwfa8yd87kw		 1 Yes	89.412952    .029266

Elapsed: 00:00:00.00
SQL> 


直接路径加载：
11g版本之前，并行查询的子进程默认是直接路径读取机制。目的是为了访问大量数据，避免占用sga的buffer cache。并行服务器将数据加载到PGA，绕开了SGA。
11g之后的串行执行sql也可以采用这个直接路径加载的机制。
在传统的架构中direct path read往往会拖累数据库性能，因为消耗了大量的IO。而在Exadata中则不会有这个情况。
在传统架构中可以通过10949时间来关闭11g的直接路径加载这个新特性

SQL> alter system set event='10949 trace name context forever, level 1' scope=spfile;

参数：_small_table_threshold

_small_table_threshold				   155104		lower threshold level of table size for direct reads

这个参数表示小于这个值（数据块个数），表示小表，没必要直接路径加载

_db_block_buffers				   7755232		Number of database blocks cached in memory: hidden parameter

_small_table_threshold 默认值是 db_block_buffers 的 2%

SQL> select 100*155104/7755232 from dual;

100*155104/7755232
------------------
	1.99999175

SQL> 

所以超过上面 _small_table_threshold 数据块的对象（表或者index）可能会直接路径加载。

参数：_very_large_object_threshold
_very_large_object_threshold			   500			upper threshold level of object size for direct reads

表示特大表，这个指的是超过 _db_block_buffers 500 : 500 是指5倍于 buffer cache大小的对象是 特大表

- 小表的话，直接内存读
- 大于特大表，使用直接路径加载
- 介于小表和大表之间，没有使用压缩，需要判断混存的数据或者脏块比率来决定，缓存比率大于50%，会内存读，缓存比率小于50%，则会直接路径加载
- 介于小表和大表之间，使用了压缩，需要判断混存的数据或者脏块比率来决定，缓存比率大于95%，会内存读，缓存比率小于95%，则会直接路径加载

这些判断小表和大表是来自表的统计信息：dba_tables.blocks
使用下面修改统计信息来测试：
SQL> EXEC DBMS_STATS.SET_TABLE_STATS(user,'T1',numblks=>50000);

https://github.com/tanelpoder/tpt-oracle/blob/master/segcachedx.sql

direct path read深入解析
https://www.cnblogs.com/PiscesCanon/p/12872004.html

trace直接路径加载判断选择可以通过 10358/NSMTIO 事件来查看，11g版本没有问题，19c版本估计会有变化，NSMTIO 事件

SQL> alter session set events '10358 trace name context forever,level 2';
SQL> alter session set events 'trace [NSMTIO] disk highest';
SQL> --- execute sql : ex : select max(object_id),avg(object_id) from t1;

SQL> alter session set events '10358 trace name context off';
SQL> oradebug setmypid
SQL> oradebug tracefile_name
SQL> exit

trace 内容有： qertbFetch[ MTT < OBJECT_SIZE < VLOT ] 类似内容
VLOT：very large object threshold参数的缩写
STT ：smarll table threshold
MTT ：5 * STT 5倍于小表大小

NSMTIO: qertbFetch:[MTT < OBJECT_SIZE < VLOT]: Checking cost to read from caches(local/remote) and checking storage reduction factors (OLTP/EHCC Comp)
NSMTIO: kcbdpc:DirectRead: tsn: 17, objd: 20934101, objn: 3746576

[12.1.0.2]有时候加密对象的sql在smart scan会触发bug，从trace看开始是 cell smart table scan 之后就变为cell single block physical read了
Bug 25409186 - Excessive (Double) IO performed when using tde (Doc ID 25409186.8)	

通过下面语句获取 结合10046 / 10358 / NSMTIO 来判断为什么不走smart scan：

sqlplus / as sysdba
alter session set events 'trace [NSMTIO] disk=high';
alter session set events '10358 trace name context forever, level 2';
alter session set events '10046 trace name context forever, level 12';
-- executing test sql
alter session set events 'trace [NSMTIO] off';
alter session set events '10358 trace name context off';
alter session set events '10046 trace name context off';
select * from v$diag_info where name like 'Default Trace File%';


SQL> select tablespace_name,encrypted from dba_tablespaces where tablespace_name='XXXX';
-> encrypted 为 YES的对象需要注意


asm的cell.smart_scan_capable属性是true

SQL> select a.name diskgroup_name,b.name,b.value from v$asm_diskgroup a,v$asm_attribute b where a.group_number=b.group_number and b.name not like 'template%';

DISKGROUP_NAME NAME			  VALUE
-------------- -------------------------- -------------
DATAC1	       idp.type 		  dynamic
DATAC1	       idp.boundary		  auto
DATAC1	       disk_repair_time 	  12.0h
DATAC1	       phys_meta_replicated	  true
DATAC1	       failgroup_repair_time	  24.0h
DATAC1	       thin_provisioned 	  FALSE
DATAC1	       preferred_read.enabled	  FALSE
DATAC1	       ate_conversion_done	  true
DATAC1	       sector_size		  512
DATAC1	       logical_sector_size	  512
DATAC1	       content.type		  data
DATAC1	       content.check		  TRUE
DATAC1	       au_size			  4194304
DATAC1	       appliance.mode		  TRUE
DATAC1	       appliance._partnering_type EXADATA FIXED
DATAC1	       compatible.asm		  19.0.0.0.0
DATAC1	       compatible.rdbms 	  11.2.0.4
DATAC1	       compatible.advm		  19.0.0.0
DATAC1	       cell.smart_scan_capable	  TRUE
DATAC1	       cell.sparse_dg		  allnonsparse
DATAC1	       access_control.enabled	  FALSE
DATAC1	       access_control.umask	  066
DATAC1	       maxdump_content.check	  64
DATAC1	       maxerr_content.check	  1024
DATAC1	       maxblkdump_content.check   3
DATAC1	       content_hardcheck.enabled  FALSE
DATAC1	       scrub_async_limit	  1
DATAC1	       scrub_metadata.enabled	  TRUE
DATAC1	       vam_migration_done	  true
RECOC1	       idp.type 		  dynamic
RECOC1	       idp.boundary		  auto
RECOC1	       disk_repair_time 	  12.0h
RECOC1	       phys_meta_replicated	  true
RECOC1	       failgroup_repair_time	  24.0h
RECOC1	       thin_provisioned 	  FALSE
RECOC1	       preferred_read.enabled	  FALSE
RECOC1	       ate_conversion_done	  true
RECOC1	       sector_size		  512
RECOC1	       logical_sector_size	  512
RECOC1	       content.type		  recovery
RECOC1	       content.check		  TRUE
RECOC1	       au_size			  4194304
RECOC1	       appliance.mode		  TRUE
RECOC1	       appliance._partnering_type EXADATA FIXED
RECOC1	       compatible.asm		  19.0.0.0.0
RECOC1	       compatible.rdbms 	  11.2.0.4.0
RECOC1	       compatible.advm		  19.0.0.0.0
RECOC1	       cell.smart_scan_capable	  TRUE
RECOC1	       cell.sparse_dg		  allnonsparse
RECOC1	       access_control.enabled	  FALSE
RECOC1	       access_control.umask	  066
RECOC1	       maxdump_content.check	  64
RECOC1	       maxerr_content.check	  1024
RECOC1	       maxblkdump_content.check   3
RECOC1	       content_hardcheck.enabled  FALSE
RECOC1	       scrub_async_limit	  1
RECOC1	       scrub_metadata.enabled	  TRUE
RECOC1	       vam_migration_done	  true

58 rows selected.

Elapsed: 00:00:00.30
SQL> 


### 对象属性设置cache会Smart Scan吗

alter table xxx ache;
select owner,table_name,cache from dba_tables where table_name ='XXX';

设置cache 属性,并不是把该对象所涉及的blocks 数据库块keep到内存，而是尽可能延长此对象在内存是驻留时间。

所以答案是：可能依旧用smart scan

### 判断是否发生了Samrt Scan

执行计划中 TABLE ACCESS STORAGE FULL并不代表就一定会Smart Scan，只代表符合了Smart Scan的条件之一。

还需要直接路径加载，而且数据得是在 存储服务器上。

而关于执行计划中是否出现 sotrage关键字可以通过下面参数来控制

cell_offload_plan_display			   AUTO 		Cell offload explain plan display

auto: 默认
always:如果sql能smart scan，则在执行计划显示 storage关键字，不管数据是否存放在存储服务器上
never: 不显示 storage

判断是否发生Smart Scan是否工作：
1.10046事件来评估

  
SQL> alter session set events '10046 trace name context forever, level 8';
SQL> -- executing SQL

SQL> alter session set events '10046 trace name context off';
SQL> oradebug setmypid
SQL> oradebug tracefile_name
SQL> exit

tkprof xxxx_trace_file
如果有下面等待事件，就表示用了smart scan
- cell smart table scan
- cell smart index scan

2.用v$sql视图

查看某条sql的smart scan效率：

select 
sql_id ,
child_number,
decode(io_cell_offload_eligible_bytes,0,'No','Yes') OFFLOAD,
decode(io_cell_offload_eligible_bytes,0,0,100*(io_cell_offload_eligible_bytes-IO_interconnect_bytes))/decode(io_cell_offload_eligible_bytes,0,1,io_cell_offload_eligible_bytes) "IO_saved%",
(ELAPSED_TIME/1000000/DECODE(NVL(EXECUTIONS,0),0,1,EXECUTIONS)) avg_time
from gv$sql s where sql_id in ('&sqlid') order by 1,2,3;

参考：
https://blogs.oracle.com/otnjp/tsushima-hakushi-69

3.v$mystat 视图

col NAME for a60
col INSTANCE for a12
set pages 9999
set lines 200
set echo off
set trims on

SELECT
        s.NAME
       ,m.VALUE
  FROM v$mystat m, v$statname s
 WHERE m.STATISTIC# = s.STATISTIC#
   AND s.NAME IN (
	 'physical read total bytes'
	,'physical write total bytes'
	,'cell physical IO bytes eligible for predicate offload'
	,'cell physical IO interconnect bytes'
	,'physical read total IO requests'
	,'cell flash cache read hits'
	,'cell IO uncompressed bytes'
	,'cell physical IO interconnect bytes returned by smart scan'
	,'cell physical IO bytes saved by storage index'
	,'cell physical IO bytes sent directly to DB node to balanceCPU'
)
;

4.SQL Monitor可视化工具

Getting the most out of Oracle SQL Monitor
https://sqlmaria.com/2017/08/01/getting-the-most-out-of-oracle-sql-monitor/

Real-Time SQL Monitoring
https://www.oracle.com/database/technologies/real-time-sql-monitoring.html

评估的sql 加上hint /*+ monitor +/ 默认超过5秒的才会生成monitor报告

SQL> set pages 0 linesize 32767 trimspool on trim on long 1000000 longchunksize 10000000
SQL> spool perfhub_history.html
SQL> select dbms_perf.report_perfhub(is_realtime=>0,type=>'active',selected_start_time=>to_date('10-SEP-18 04:00:00','dd-MON-YY hh24:mi:ss'),selected_end_time=>to_date('10-SEP-18 05:00:00','dd-MON-YY hh24:mi:ss')) from dual;
SQL> spool off


However, It is also possible to force monitoring to occur for any SQL statement by simply adding the MONITOR hint to the statement.
Ex:
SELECT /*+ MONITOR */ col1, col2, col3 from table1 where col1=10;

If however, the SQL statement cannot be added with /*+ MONITOR */ hint since it is coming from a third part application etc. you can still force monitoring to occur by setting the event "sql_monitor" with the SQL_ID for the statement you want to monitor at the system level.

SQL> ALTER SYSTEM SET EVENTS 'sql_monitor [sql:5hc07qvt8v737] force=true';

To disable:
SQL> ALTER SYSTEM SET EVENTS 'sql_monitor [sql:5hc07qvt8v737] off';

对某个sql进行获取html报告

SET trimspool ON
SET TRIM      ON
SET pages    0
SET linesize 32767
SET LONG    1000000
SET longchunksize 1000000
 
spool sqlmon_active.html
 
SELECT dbms_sqltune.Report_sql_monitor(SQL_ID='&sql_id', TYPE='HTML',report_leve=>'all')
FROM   dual;
 
spool OFF



### 相关脚本

查看具体sqlid的offload的比率

select 
sql_id ,
child_number,
decode(io_cell_offload_eligible_bytes,0,'No','Yes') OFFLOAD,
decode(io_cell_offload_eligible_bytes,0,0,100*(io_cell_offload_eligible_bytes-IO_interconnect_bytes))/decode(io_cell_offload_eligible_bytes,0,1,io_cell_offload_eligible_bytes) "IO_saved%",
(ELAPSED_TIME/1000000/DECODE(NVL(EXECUTIONS,0),0,1,EXECUTIONS)) avg_time
from gv$sql s where sql_id in ('&sqlid') order by 1,2,3;

查看对象在cache的比率

set linesize 300 pagesize 300
COL "OBJECT_NAME"                    FOR A11
COL "PARTITION_NAME"                 FOR A14
COL "CACHEDBLOCKS"                   FOR 999999999999
COL "CACHEPCT"                       FOR 99999999.999

select co.object_name object_name,
            nvl(co.subobject_name,'N/A') partition_name,
            co.cachedblocks, 
            100*(co.cachedblocks/seg.blocks) cachepct
    from (
     select owner, 
            object_name,
            subobject_name, 
            object_type, 
            sum(num_buf) cachedblocks
     from dba_objects, x$kcboqh
     where obj# = data_object_id
        and   upper(object_name) =upper('&&object_name')
        and   upper(owner)=upper('&&owner')
        group by owner, object_name, subobject_name, object_type) co,
        (select owner,segment_name,partition_name,blocks
        from dba_segments
        where upper(owner)=upper('&&owner') and upper(segment_name)=upper('&&object_name')) seg
        where co.owner=seg.owner and co.object_name=seg.segment_name
       and nvl(co.subobject_name,'ZZZ')=nvl(seg.partition_name,'ZZZ');


SQL> 
select co.object_name object_name,
            nvl(co.subobject_name,'N/A') partition_name,
            co.cachedblocks, 
            100*(co.cachedblocks/seg.blocks) cachepct
    from (
     select owner, 
            object_name,
            subobject_name, 
            object_type, 
            sum(num_buf) cachedblocks
     from dba_objects, x$kcboqh
     where obj# = data_object_id
        and   upper(object_name) =upper('&&object_name')
        and   upper(owner)=upper('&&owner')
        group by owner, object_name, subobject_name, object_type) co,
        (select owner,segment_name,partition_name,blocks
        from dba_segments
        where upper(owner)=upper('&&owner') and upper(segment_name)=upper('&&object_name')) seg
        where co.owner=seg.owner and co.object_name=seg.segment_name
 20         and nvl(co.subobject_name,'ZZZ')=nvl(seg.partition_name,'ZZZ');
old  13:	 and   upper(object_name) =upper('&&object_name')
new  13:	 and   upper(object_name) =upper('T1')
old  14:	 and   upper(owner)=upper('&&owner')
new  14:	 and   upper(owner)=upper('SEHUB')
old  18:	 where upper(owner)=upper('&&owner') and upper(segment_name)=upper('&&object_name')) seg
new  18:	 where upper(owner)=upper('SEHUB') and upper(segment_name)=upper('T1')) seg

OBJECT_NAME PARTITION_NAME  CACHEDBLOCKS      CACHEPCT
----------- -------------- ------------- -------------
T1	         N/A 		   313	         81.510

SQL> 

查看某个对象脏块的比率

select object.object_name, object.partition_name,object.dirty dirty,
     100*(object.dirty/seg.blocks) dirtypct
    from
    (select owner,object_name,subobject_name partition_name,count(1) dirty
         from dba_objects obj, v$bh bh
         where obj.data_object_id=bh.objd
         and upper(obj.object_name)=upper('&&object_name')
         and upper(obj.owner)=upper('&&owner')
         and bh.dirty='Y'
        group by owner,object_name,subobject_name) object,
     (select owner,segment_name,partition_name,blocks
     from dba_segments
     where upper(owner)=upper('&&owner') and upper(segment_name)=upper('&&object_name')) seg
where object.owner=seg.owner and object.object_name=seg.segment_name;


SQL> update sehub.t1 set object_name = 'aaaaa' where rownum < 100;

99 rows updated.

SQL> commit;

Commit complete.

select object.object_name, object.partition_name,object.dirty dirty,
     100*(object.dirty/seg.blocks) dirtypct
    from
    (select owner,object_name,subobject_name partition_name,count(1) dirty
         from dba_objects obj, v$bh bh
         where obj.data_object_id=bh.objd
         and upper(obj.object_name)=upper('&&object_name')
         and upper(obj.owner)=upper('&&owner')
         and bh.dirty='Y'
        group by owner,object_name,subobject_name) object,
     (select owner,segment_name,partition_name,blocks
     from dba_segments
     where upper(owner)=upper('&&owner') and upper(segment_name)=upper('&&object_name')) seg
 14  where object.owner=seg.owner and object.object_name=seg.segment_name;
old   7:	  and upper(obj.object_name)=upper('&&object_name')
new   7:	  and upper(obj.object_name)=upper('T1')
old   8:	  and upper(obj.owner)=upper('&&owner')
new   8:	  and upper(obj.owner)=upper('SEHUB')
old  13:      where upper(owner)=upper('&&owner') and upper(segment_name)=upper('&&object_name')) seg
new  13:      where upper(owner)=upper('SEHUB') and upper(segment_name)=upper('T1')) seg

OBJECT_NAME PARTITION_NAME	DIRTY	DIRTYPCT
----------- -------------- ---------- ----------
T1				    2 .520833333

SQL> 


查看哪些sql是smart scan的

COL "SQL_ID"                         FOR A13
COL "QUALIFYING"                     FOR 9999999999
COL "ACTUAL"                         FOR 999999
COL "IO_SAVED_PCT"                   FOR 999999999999.99
COL "SQL_TEXT"                       FOR A23

select sql_id,
io_cell_offload_eligible_bytes qualifying,
io_cell_offload_returned_bytes actual,
round(((io_cell_offload_eligible_bytes - io_cell_offload_returned_bytes)/io_cell_offload_eligible_bytes)*100, 2) io_saved_pct,
sql_text
from gv$sql
where io_cell_offload_returned_bytes > 0 and io_cell_offload_eligible_bytes > 0;

io_saved_pct 越大说明smart scan利用更充分


### 引导SQL执行Smart Scan

1.使用parallel hint
使用并行查询时候，并行子进程默认选直接路径加载的读取方式获取数据块，同时，使用并行的sql，一般情况也会选择全表扫描

2.使用full hint /*+ full(table_name) */ 来强制使用全表扫

3.将索引变为 invisible

4.忽略hint，有些sql加了很多hint，不修改sql的话，
可以在session级别设置： alter session set "_optimizer_ignore_hints" = true;
来忽略hint作用

5.减少 db_cache_size 大小，其实就是间接调整了小表阈值的大小（_small_table_threshold）

6.调整特大表小表的参数值
- _small_table_threshold
- _very_large_object_threshold
  
7.调整统计信息的数据块个数
如表：（索引类似）
- EXEC DBMS_STATS.SET_TABLE_STATS(user,'T1',numblks=>50);

但必须跟 _direct_read_decision_statistics_driven 结合使用（true值）

8.调整 _serial_direct_read 参数
auto：默认，优化器选择
always：全部直接路径加载
never：从来不直接路径加载

SQL> alter session set "_serial_direct_read" = always;
此参数不建议设置为system级别





