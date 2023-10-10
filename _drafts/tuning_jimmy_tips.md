https://oracleblog.org/study-note/study-note-of-tuning/

1.内存调优
注：SGA中的shared pool中，系统自动优先缓存datadictionary cache，对系统性能影响较大的是library cache。
1.1 library cache 调优（v$librarycache/v$sql/v$sqlarea/v$sqltext/v$db_object_cache）
判断：要不要调整library cache？判断条件：v$librarycache.pinhitratio|gethitratio尽量接近100%
    1.1.1 存储对象所消耗的内存预估：
    select sum(SHARABLE_MEM) from  v$db_object_cache;
    1.1.2 经常执行的sql消耗的内存预估：
    select sum(SHARABLE_MEM) from v$sqlarea where EXECUTIONS>100;
    1.1.3 每个用户打开游标，需要250个字节：
    select sum(250*USERS_OPENING) from v$sqlarea;
    1.1.4 keep在shared pool中：
    先创建dbms_shared_pool：
    @?/rdbms/admin/dbmspool.sql
    创建后：
    execute dbms_shared_pool.keep('package_name');----------------------将package keep
    execute dbms_shared_pool.keep('address,hash_value');----------------将匿名的块 keep
 
1.2 data dictionary cache 调优（v$rowcache）
判断：要不要调整data dictionary cache？
判断标准：v$rowcache.(gets-getmisses)/gets尽量接近100%
    1.2.1 由于没有单独调整数据字典高速缓冲的参数，但是系统又优先缓存data dictionary cache，只能调整shared pool的总体大小。
    
1.3 UGA
    1.3.1 使用共享服务器模式的时候，如没有配置large pool，用户会话数据（排序等等）和游标状态（共享sql）会在SGA。
          因此如果发现一个报表系统shared pool特别大，有没有配置large pool，请检查是否使用了共享服务器模式。
    1.3.2 UGA预估：
          SELECT 'current session uga memory',SUM(VALUE)/1024 size_kb FROM v$mystat a,v$statname b                                    
          WHERE a.STATISTIC#=b.STATISTIC#                                                                                                          
          AND b.NAME IN ('session uga memory')                                                                                        
          GROUP BY NAME                                                                                                               
          UNION ALL                                                                                                                   
          SELECT decode(name,'session uga memory','all session uga memory',name),SUM(VALUE)/1024 size_kb FROM v$sesstat a,v$statname b
          WHERE a.STATISTIC#=b.STATISTIC#                                                                                             
          AND b.NAME IN ('session uga memory','session uga memory max')                                                               
          GROUP BY NAME;
 
1.4 db buffer cache（V$sysstat/v$buffer_pool_statistics/v$buffer_pool/v$sysstat/v$sess_io/v$wait_stat）  
    1.4.1 db buffer caceh和datafile之间的交互：
    
                    ------DBWn-------->     
        buffer cache                   datafile
                    <---服务器进程-----
                
    1.4.2 db buffer cache和LRU列表：                 
    传入的块从LRU的冷端复制到缓冲区中，然后该缓冲区的数据会放到LRU列表的中部，在根据情况上下浮动。
    
    1.4.3 DB_CACHE_ADVICE off-ready-on
    
    1.4.4 dbwr什么时候将dirty buffer写出：A.checkpoint 队列到达阈值；B.LRU中显示没有空余的buffer；C.logwr指示已经发出checkpoint信号；D.表空间变化；E.Drop object;F.clean shutdown
    
判断：要不要调整db cache size：命中率小于90%
判断标准：SQL> SELECT 1 - (phy.value – lob.value – dir.value)
          / ses.value "CACHE HIT RATIO"                        
          2 FROM v$sysstat ses, v$sysstat lob,                                                                                                                      
          3 v$sysstat dir, v$sysstat phy                       
          3 WHERE ses.name = 'session logical reads'           
          4 AND dir.name = ‘physical reads direct'            
          5 AND lob.name = 'physical reads direct (lob)'       
          6 AND phy.name = 'physical reads'; 
       注：因为直接读和lob的读取不经过buffer pool缓存，因此整个physical read要减去这2项。
           启动开始有较多的物理读，会影响buffer caceh命中率的统计
           
   1.4.5 影响buffer cache的因素：全表扫描、程序、命中率分布不均、可随机访问的大表（其实也是全表扫描）  
   1.4.6 keep一般为default的10%，recycle一般是default的2倍
   1.4.7 空闲列表 ：A.单cpu增加空闲列表不会增加性能 B.
   
   1.4.8  相关视图： v$sess_io:预估recycle
   
1.5 log buffer 
1.5.1 诊断标准：A.v$sysstat中的redo buffer allocation retries/redo entries<10% B.$session_wait中不应出现log buffer space
1.5.2 对策：加大log buffer，或者将relog转移到性能好的磁盘上
1.5.3 深入分析，lgwr变慢的原因：lgwr之前和之后的工作是在logbuffer和redolog中，分析这2者的情况：
1.5.3.1 redolog太小，而logbuffer较大，因此需要频繁的切换redolog，当本次切换还未完成时，又轮到下次切换，出现等待（表现为system_event中的log file switch completion%过多）
1.5.3.2 redolog太大或者redolog组不够，当上次的logbuffer中的内容还没完全写入到redolog中，需要用到这块的logbuffer了，出现等待，即redolog为高active状态(非current和inactive，未完成checkpoint)，需要加多redolog组或者调整调整FAST_START_MTTR_TARGET，加大checkpoint频率（表现为system_event中'log file switch (check%';检查点未完成过多）
1.5.3.3 redolog切换不了，可能是写archlog过慢，或者archlog空间爆满。（表现为system_event中log file switch (arch%';archlog未完成过多）
 
1.6 java pool 的优化
判断：要不要调整java pool：v$sgastat中java pool 的free memory 和memory in use的比例
 
 
2 IO优化
2.1 v$filestat
2.2 条带化：A.raid B.数据文件条带化 C.alter table allocate extent 
2.3 增加db_file_multiblock_read_count，减少IO次数
2.4 减少v$sysstat中的long tables（大于4 blocks的表）
2.5 关于checkpoint：
2.5.1 增量chkpt：
      checkpoint队列：1.dirty buffer：第一次数据块被修改时就写入chkpt队列中。2.RBA：redolog中第一次修改数据块的RBA也被记录在chkpt队列
      每隔3秒做一次增量chkpt，不强制写数据文件，只是将chkpt队列中的第一个（即时间至今最长的一个）RBA写入到控制文件，实例crash的恢复，即redolog中该RBA之后的内容。
      增量chkpt发生条件：1.每隔3秒做增量chkpt，更新控制文件；2.switch logfile，更新控制文件和数据文件头
2.5.2 全chkpt：
      完整检查点：1.dirty buffer写入到datafile ；2.clean shutdown；3.alter system checkpoint
      表空间检查点：表空间变化时（backup、offline）
 
3 排序优化 
3.1 sort_area_size和sort_area_retained_size
3.2 CREATE_BITMAP_AREA_SIZE和BITMAP_MERGE_AREA_SIZE:创建索引速度有关
3.3 需要排序的操作：1.建检索 2.维护索引 3.order by/group by/distinct/union/minus/intersect 4.Sort Merge Join 5.analyze
3.4 避免排序的操作：1.create index nosort（要求事先已经asc排序） 2.union all 3.analyze for column 4.analyze estimate
3.5 判断：要不要调整排序区：(v$sysstat.name='sorts (disk)'/v$sysstat.name='sorts (memory)')<5% 注意：dss中该比例不适用。
3.6 对策：增加sort_area_size和PGA_AGGREGATE_TARGET
                                     
4 latch优化
4.1 重要的latch free
4.1.1 shared pool和library cache的：sql没有绑定变量(检查v$sqlarea.parse_call,v$sqlarea.EXECUTIONS)或者存在热块或者为共享服务器模式但是没有配large pool
4.1.2 db buffer cache的lru：基于db buffer cache大量的排序或者大量的index full scan和full table scan
 
 
5 undo优化
5.1 undo使用：（1）读一致性 （2）dml的事务回退 （3）事务故障恢复，打开数据库时rollback未commit的事务 
5.2 何时需要加回退段（手工管理）：
    SELECT sum(waits)* 100 /sum(gets) "Ratio",                                    
    sum(waits) "Waits", sum(gets) "Gets"                                      
    FROM v$rollstat;
    
    SELECT event, total_waits, total_timeouts                          
    FROM v$system_event                      
    WHERE event LIKE 'undo segment tx slot'; 
                                         
    SELECT class, count FROM v$waitstat      
    WHERE class LIKE '%undo%';
5.3 大事务指定回滚段（提交后结束）：
    sys@ORA11G(192.168.0.11)> set transaction use rollback segment "_SYSSMU1_1193229161$";                   
                                                                                      
    事务处理集。
    
5.4 shared server
题外话：判断是否shared server：
(1).show parameter shared_server 大于0为共享服务器模式
(2).select server from v$session 看到DEDICATED为专用；看到SHARED即为共享，且shared_server_process正在对其其他服务；看到NONE为也为共享，且shared_server_process尚未对其其他服务。
 
5.4.1 监控视图：V$SHARED_SERVER_MONITOR
                V$DISPATCHER繁忙率=busy/(busy+idle) 等待时间=wait/totalq
                V$DISPATCHER_RATE
5.4.2 调整参数：SHARED_SERVERS--共享服务器进程的数量
                DISPATCHERS-----调度进程的数量
                
5.5 sql调优
5.5.1 optimizer_mode:choose(默认，如果涉及的任一表有统计信息，就用CBO的all_rows，否则使用RBO)
5.5.2 执行计划中的信息：行访问方法，连接顺序，连接方法，分布式事务访问（不包含远程节点），子查询
5.5.3 创建存储概要：参数文件 CREATE_STORED_OUTLINES------------------------------------------指定创建存储概要的名称（可取名为OLTP、DSS，或者TRUE、FALSE）。
                    参数文件 USE_STORED_OUTLINES---------------------------------------------指定需要使用的存储概要名称（可取名为OLTP、DSS，或者TRUE、FALSE，在session级或system级指定后select。
                    参数文件 USE_PRIVATE_OUTLINES--------------------------------------------专用概要，仅用于当前会话，如不存在，不使用共用的概要。
                    create or replace outline XXX for catalog OLTP on select ……--------------创建存储概要的名称。
5.5.4 trace:
5.5.4.1 @?/rdbms/admin/utlxplan.sql
        explain plan for
        @?/rdbms/admin/utlxpls.sql or @?/rdbms/admin/utlxplp.sql or select * from table(dbms_xplan.display);
5.5.4.2 alter session set sql_trace=true;
        tkprof
5.5.4.3 exec dbms_session.set_sql_trace=true;
5.5.4.4 exec dbms_system.set_sql_trace_in_session(sid,serial#,true);
5.5.4.5 set autotrace on
 
5.5.5 表的统计信息包含：NUM_ROWS,BLOCKS,EMPTY_BLOCKS,AVG_SPACE,CHAIN_CNT,ROW_MOVEMENT,AVG_ROW_LEN,LAST_ANALYZED (dba_tables)
5.5.6 索引的统计信息包含：DEGREE,LEAF_BLOCKS,DISTINCT_KEYS,AVG_LEAF_BLOCKS_PER_KEY,AVG_DATA_BLOCKS_PER_KEY,NUM_ROWS,CLUSTERING_FACTOR (dba_indexes)
5.5.7 列统计信息包含：NUM_DISTINCT,LOW_VALUE,HIGH_VALUE(DBA_TAB_COL_STATISTICS)
5.5.8 直方图：EXECUTE DBMS_STATS.GATHER_TABLE_STATS(OWNNAME=>'HR',TABNAME=>'EMPLOYEES', METHOD_OPT => 'FOR COLUMNS salary SIZE 10'); 
5.5.9 dbms_stats.gather_system_stats:收集信息
      dbms_stats.get_system_stats:验证统计信息
      dbms_stats.set_system_stats:明确设置系统统计信息
      
5.6 块调优
5.6.1 将extent大小设置为5*DB_FILE_MULTIBLOCK_READ_COUNT的倍数。（原因：一个extent=5×DB_FILE_MULTIBLOCK_READ_COUNT），注：对非全表扫描，该优化无效。
5.6.2 HWM:以5 block递增，
5.6.3 减少行迁移：提高pctfree
 
5.7 索引调优
5.7.1 重建浪费大于20%的索引:
      analyze index index_name validate structure;
      SELECT name, (DEL_LF_ROWS_LEN/LF_ROWS_LEN) * 100  AS wastage FROM index_stats; 
5.7.2 找出未使用的索引
      alter index index_name monitoring usage;
      alter index index_name nomonitoring usage;
      select index_name,used from v$object_usage; 
5.7.3 注函数索引必须在CBO下使用，对RBO无效      
      
6 应用调优
6.1 数据访问类型：
6.1.1 聚簇：使用同一个物理地址存放两个或者多个表。先建簇，再建簇表，再向簇表insert数据。分两类：hash 和 index 
6.1.2 b-tree索引：叶块填满后，将分成两半，50%在旧叶块，50%到新叶块；分支类推，一直到根
6.1.3 位图索引：lock位图段
6.1.4 反向索引：为了避免降低索引高度。
6.1.5 IOT表：注：IOT表上可使用位图索引，但是需要建立map。
6.1.6 分区表：若range 分区中可能含有null，需要设置maxvalue
              若hash，为了数据分布均匀，分区个数需设置为2的n次方。提高单键查找的效率，不提高range scan的效率。
              若list，需提前了解有多少种类
              若复合，支持range-hash和range-list
6.1.7 分区索引：local index：与表分区一一对应关系;可以是list、hash、range、compsite任一种类;bitmap索引必须是local index
                global index：与表分区可以是多对一的关系;只能是range且需设置maxvlaue;表分区变化后需重建。
                另外的分法：
                prefix index：分区的key为组合索引的最左端字段;可以是唯一索引也可以是非唯一索引
                non-prefix index：分区的key不是组合索引的最左端字段;可以是唯一索引也可以是非唯一索引;唯一的non-prefix index条件：分区键是组合索引的子集。
                注：non-prefix的global index不存在。
6.1.8 使用物化视图