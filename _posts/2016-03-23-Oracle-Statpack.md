---
layout: post
title: "Oracle性能调优工具-Statpack"
date:   2016-03-23 10:36:00
category: Oracle
excerpt: "Oracle性能调优工具-Statpack:什么是statpack？怎么使用？怎么查看？" 
code: true
tags: Oracle,statpack,性能调优 
---

* content
{:toc}



---

### 1. Statspack的介绍:

##### 1.1 8i以后出现的一个免费的性能调优的工具;

	Statspack与AWR不兼容,一般不常用,最多还是使用AWR;
	
	Statspack is a set of scripts that capture and report on performance data from within the Oracle database;

##### 1.2 Statspack脚本的作用:

	Capture instance data by taking a "snapshot";
	Store snapshot data in the database in a separate schema;
	Create reports between two snapshots;
	Mark snapshots as baseline information;
	Use the reports as part of a performance tuning method;
	
##### 1.3 Statspack脚本介绍:

	spcreate.sql:安装Statspack;
	statspack.snap:收集统计信息;
	spauto.sql:自动收集统计信息,需要设置alter system set job_queue_processes = 5参数;
	spreport.sql/sprepsql.sql:生成一个报告;
	statspack.purge/sppurge.sql:清除统计信息;
	sptrunc.sql:删除所有的Statspack表的数据;
	spdrop.sql:删除Statspack资源库;
	spexp.par:导出Statspack资源库;


### 2. 安装Statspack:

##### 2.1 创建一个表空间,用来存放statspack的数据:

	CREATE TABLESPACE statspack01 DATAFILE '+DATA' SIZE 500M AUTOEXTEND ON EXTENT MANAGEMENT LOCAL;

##### 2.2 以sysdba用户登录:
	
	sqlplus / as sysdba;

##### 2.3 定义PERFSTAT用户的密码:

	define perfstat_password='oracle';

##### 2.4 定义PERFSTAT用户的默认表空间:

	define default_tablespace='statspack01';

##### 2.5 定义PERFSTAT的临时表空间:

	define temporary_tablespace='temp';

##### 2.6 安装Statspack:

	@?/rdbms/admin/spcreate.sql;

##### 2.7 安装完成之后可以查看安装信息:

host ls *.lis;如果发生错误可以通过spdrop.sql脚本删除这些对象,然后重新安装;

这个过程创建了PERFSTAT用户,Statspack资源库和一些包;(上面定义的部分也可以不定义,但是在安装的时候会提示输入相应的值)

### 3. 获得Statspack快照: 	

##### 3.1 创建一个快照:

	conn perfstat/oracle;
	
	execute statspack.snap;

##### 3.2 查看产生快照的数量:
	
	variable snap_number;
	
	begin :snap := statspack.snap;end;
	/
	
	print snap;

##### 3.3 自动收集快照,通过源码查看是每隔一个小时做一次快照的收集:    

	conn perfstat/oracle
	
	@?/rdbms/admin/spauto.sql
	
### 4. 配置快照数据的抓取:

##### 4.1 统计信息抓取的级别:

	0:General Performance;

	5:SQL statments;

	6:SQL plans and SQL plan usage;

	7:Segment-level statistics,会收集v$segment_statistics视图的信息,通过此视图可以查看热点对象:
	
	SELECT owner, object_name FROM v$segment_statistics WHERE statistic_name = 'buffer busy waits' ORDER BY VALUE DESC;

	10:Parent and child latches,所有的信息;

##### 4.2 可以通过视图查看到:

	SELECT snap_level FROM perfstat.stats$statspack_parameter;

##### 4.3 临时改变抓取的级别:

	execute statspack.snap(i_snap_level=>6);

##### 4.4 修改默认的值,然后抓取一次快照:

	execute statspack.snap(i_snap_level=>10, i_modify_parameter=>'true');

##### 4.5 只修改某一个/几个参数(以抓取级别为例):

	execute statspack.modify_statspack_parameter(i_snap_level=>7);

##### 4.6 在快照中包含session的细节,只收集session_id=3的统计信息:

	execute statspack.snap(i_session_id=>3);

### 5. 创建/清除Statspack Baselines信息: 

##### 5.1 使用快照编号创建基线(默认包含两个快照编号中间所有的快照,如果只想包含指定的两个快照的话指定i_snap_range=false,默认参数为ture):
	
	exec statspack.make_baseline(i_begin_snap=>2, i_end_snap=>5, i_snap_range=>true); 
    
##### 5.2 使用指定的时间内的快照创建基线:

	exec statspack.make_baseline(i_begin_date=>to_date('2015-05-01 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), i_begin_date=>to_date('2015-05-02 12:00:00', 'YYYY-MM-DD HH24:MI:SS'));
	
##### 5.3 清除基线信息,指定快照编号(默认清除指定的快照编号之间所有的快照,如果只要清除指定的编号,指定i_snap_range=false):

	statspack.clear_baseline(i_begin_snap=>2, i_end_snap=>5, i_snap_range=>true);
	
##### 5.4 清除指定的时间内的基线信息:
	
	exec statspack.clear_baseline(i_begin_date=>to_date('2015-05-01 12:00:00', 'YYYY-MM-DD HH24:MI:SS'), i_begin_date=>to_date('2015-05-02 12:00:00', 'YYYY-MM-DD HH24:MI:SS'));
	
##### 5.5 删除快照使用exec statspack.purge();具体参数查文档;

##### 5.6 创建baseline的意义不大,唯一的好处是在purge baseline的时候不会删除baseline里面的snap,需要先clear baseline;

### 6. 创建Statspack报告:

##### 6.1 以perfstat用户进入:

	conn perfstat/oracle;

##### 6.2 定义变量,也可以在创建报告时交互输入:

	定义开始快照编号:define begin_snap=1;

	定义结束快照编号:define end_snap=4;

	报告名称:define report_name=spreport;
		
		
##### 6.3 创建报告:@?/rdbms/admin/spreport.sql; 

##### 6.4 生成的报告会保存在当前的目录下:host ls spreport.lst;

##### 6.5 注意事项

    设置STATISICS_LEVEL=TYPICAL;  
    设置TIMED_STATISTICS=TRUE来收集时间信息; 
    避免Statspack和AWR同时发生,尽量使用AWR;
    选择一个适合的快照间隔,一般选择1个小时,除非变化很快可以设置间隔短一点,特别是当报告中出现######时;
    在PREFSTAT用户下收集优化统计信息;

### 7. 如何阅读Statspack报告:

从最上面的汇总数据开始:

	Load Profile(useful with baseline);
	Instance Efficiency(useful with baseline);
	Top 5 Timed Events;
	Time Model;
	Wait Events and Background Wait Events;
	Wait Event Histogram(only in Statspack);
	
发生以下问题应该查看哪些部分,:

	CONT:Block contention;
	CPU:CPU consumption;
		Host CPU;
		Instance CPU;
		SQL ordered by CPU;
		SQL ordered by Gets;
	LC:Library cache;
		Shared Pool Statistics;
		SQL ordered by Parse Calls;
	MEM:Memory consumption;
		Virtual Memory Paging;
	ENQ:Enqueue;
	IO:I/O consumption;
		SQL ordered by Elapsed;
		SQL ordered by Reads;
	LAT:Latch contention;
	PGAM:PGA memory consumption;
	RBS:Rollback segment;
	UNDO:Automatic undo;
	SP:Shared pool;

-- 1.数据库信息和服务器信息汇总,意义不大;

1.说明了数据库实例,版本;

2.快照的开始时间和结束时间,中间的时间间隔多少分钟;

-- 2.系统负载信息,从每秒钟和每个事务两个维度统计的,单纯的数字也无太大意义,需要跟baseline做比较才有意义;

	1.Redo size:产生的日志大小(单位字节),可反应数据库任务的繁重与否;
	2.Logical reads:逻辑读的数量(单位是block);
	3.block changes:修改block的数量,即数据库事务改变数据块的数量,系统的读写比为1:4(13.51:57.68),非常典型的OLTP系统;
	4.Physical reads:从磁盘读取的block数,即一共有Logica reads大小的读取操作,其中有Physical Reads是从硬盘读取的,剩下从Buffer Cache中读取,应该越小越好;
	5.Physical writes:写磁盘的block数,由于系统没有负载,所以没有数据量;
	6.User calls:用户调用的次数;
	7.Parses:对sql语句解析次数(包括硬解析和软解析),消耗CPU资源;硬解析超过100次/s说明绑定变量的效率不高,软解析超过300次/s说明应用程序的效率不高;
	8.Hard parses:硬解析次数,计算出来软解析的比例为(1 - hard prases/parses)*100%,应该在95%以上,如果太低的话可以尝试调整session_cached_cursors参数;
	9.Sorts:排序次数,意义不大;
	10.Logons:登陆的次数,如果太大的话,说明session管理有问题;
	11.Executes:执行次数,反应负载大小,需要与baseline对比;
	12.Transactions:产生的事务数,反映数据库任务繁重与否;
	13.Blocks changed per Read:反应了系统逻辑读的读写比例为23.42%;
	14.Recursive Call:如果都是通过PL/SQL来执行的话,就会比较低;如果都是用存储过程来执行的话就会比较高;
	15.Rollback per transaction:反应了回滚事务的比例,回滚需要从undo中找到历史数据,很消耗资源,所以这个值一定不能大;


-- 3.实例的命中率,命中率应该越高越好,目标是100%;

	1.Buffer Nowait:不应该低于99%,这是一个对特定缓冲区的请求的命中率;
	2.Buffer Hit:应该不低于99%,对一个对特定缓冲区的请求的命中率,并且缓存区位于内存中,而无需物理磁盘的IO操作;
	3.Library Hit:应该高于95%,较低的库缓冲区的命中率意味着sql语句被过早的推出了缓冲区(可能是缓冲区太小了,当然太大了也不行);
	4.Soft Parse:不应低于95%,如果低于80%意味着sql没有被有效的重用,可以在Load Profile中计算出来;
	5.Latch Hit:低于95%通常意味着非常严重的问题;
	6.Execute to Parse:说明了一个SQL语句执行与解析析的比率,如果一个SQL语句经过一次解析,然后执行,且再也不在同一个session执行的话,则该比率为0.这个比率应该越高越好,代表同一个session中,执行的SQL语句中有多少的SQL语句是已经解析好了的;
	7.Parse CPU to Parse Elapsd:用于每个CPU解析的秒花费了大约100/102.56秒的壁钟时间;如果小于100%,说明CPU在解析一句SQL时,在等待某种资源的释放;如果该值大于等于100%,则说明CPU在解析过程中,没有发生任何等待;
	8.Non-Parse CPU说明花费在做实际工作的时间与花费在查询解析的时间上的比较,计算公式为round(100*(1-parse_cpu/tot_cpu),2).与parse_cpu相比,如果tot_cpu很高,这个比值将接近100%,这是很好的,说明计算机执行的大部分工作是执行查询,而不是解析查询上;
	9.Memory Usage:说明正在使用的共享池的百分比,这个数字应该长时间的稳定在75%～90%;如果这个值太低了,就浪费内存;太高了,则会引起共享池组件的老化,导致SQL硬解析的增加;
	10.Sql with executions > 1:这是在共享池中有多少个执行次数大于1次的SQL语句的度量,如果太低表示应用程序内绑定变量用的不够多;
	11.Memory for SQL w/exec>1:这是与不频繁使用的SQL语句相比,频繁使用的SQL语句消耗内存多少的一个度量,这个数字将在总体上与执行次数多余1次的SQL语句的百分比非常接近,除非某些查询任务消耗的内存没有规律;

-- 4.排名前5的等待事件,最重要的部分;

	1.一般CPU time在等待事件中并不需要关注,更多的需要查看时间模型中的DB CPU;
	2.DB file scatter read:这通常意味着等待与全表扫描有关,该指数的数量过大说明缺少扫描限制或者没有使用索引;这种情况也可能是正常的,因为全表扫描可能比索引扫描效率更高,当看到这些等待的时候,需要通过检查确定全表扫描是否必须的(缓存较小的表);
	3.DB file sequential read:这通常是指单一的数据块读操作(例如,索引的读取);该值过大说明表的连接顺序很糟糕,或者使用了非选择性的索引;DB_CACHE_SIZE也是一个决定性的因素,它将决定这些等待的出现的频率;散列区域的连接引起的问题应当体现在PGA内存中,但它们会贪婪的侵占内存,直至使顺序读操作有大量的等待出现;可以优化表连接的顺序;
	4.Buffer busy wait:当一个缓冲区以一种非共享方式被使用,或者在被读入缓存的时候,就会出现该种等待;不应该高于1％,否则说明出现了热点块;
	5.Latch free:闩锁是底层的队列机制,用于保护系统的全局区(SGA)的内存结构,说明没有使用绑定变量;
	6.Enqueue:入列是保护共享资源的一种锁机制,这种锁保护共享资源;例如一条记录中的数据,以防止两个人同时更新相同的数据,如果有外键,必须要为外键建立索引,以避免常见的锁定的问题;
	7.Logfile Switch:所有的提交操作均要等待日志文件切换(归档所需要的)或者日志文件切换的不完整;
	8.Log buffer space:增加日志缓冲区,为重做日志使用更快的磁盘;
	9.Log file sync:原因是session提交事务时,session的重做信息需要刷新到重做日志文件里,于是触发LGWR进程将redo entry写入redo log file,当redo log file写完以后,通知session,该等待事件就表示正在等10.LGRW写完成;解决办法:一次提交更多的记录,为撤销日志使用更快的磁盘;
	11.Ldle event:忽略;


-- 5.CPU的使用率(是层级递进的关);

	1.服务器上空闲CPU为88.78%,系统使用4.07%,用户使用5.44;
	2.而数据库使用的总CPU为5.44%*4.98%,而忙的CPU为5.44%*4.98%*44.41%;

-- 6.时间模型,可以在v$sys_time_model视图中查看;

-- 7.数据库实例/后台进程的等待事件;

1.时间单位:s-秒;cs-1/100s;ms-1/1000s;us-1/1000000s;

2.任何有关SQL*Net的等待事件都不用过多的关注,它表明客户端连在服务器上,但是没有做任何操作,没有向服务器发出任何数据请求;

-- 8:与sql语句相关的统计;

1.如果一条sql语句执行达到上百万次的话,必须考虑修改应用程序,无论SQL执行多么快,都将消耗大量系统资源;

2.根据出现在共享池中的多少个SQL版本进行排序的SQL语句,相同的SQL语句出现多个版本的原因归纳起来有以下几点:

	1.不同的用户提交相同的SQL语句,但是这些SQL语句访问的表是不一样的,比如schema为user1时发出select * from t;与schema为user2时发出select * from t;这两个SQL完全一样,但是由于在不同的schema下,因此导致版本不同;
	2.在一个根本不同的环境中执行同一个查询,例如优化器目标不同;
	3.客户端对绑定变量使用不同的数据类型或数据长度,例如一句SQL使用的绑定变量的长度是10,而另一句SQL使用的绑定变量的长度是50,这就导致不同版本的SQL出现;
	4.尽量避免出现相同的SQL语句有很多版本的情况出现;

 

-- 9.各种的优化建议,以PGA为例;

	1.从图中可以看到,当pga_aggregate_target=96的时候即可达到100%的命中率;

	2.也可以通过V$PGA_TARGET_ADVICE视图来查看这些信息;


-- 10.查看设置的初始化参数,如果前后有变化的话,会被列出来;


---

