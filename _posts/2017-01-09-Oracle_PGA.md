---
layout: post
title: "Oracle 体系结构-PGA概念"
categories: Oracle
tags: Oracle PGA
---

* content
{:toc}

Oracle 体系结构-PGA概念

### 什么是PGA


PGA程序全局区(Program Glogal Area)

> 服务进程（server process）存储数据及控制信息的内存区域

大家熟知的SGA是共享的，而PGA是私有的。另外：只要有一个服务进程，就会有一个PGA与之想对应服务





### PGA管理方式

10g以后，PGA可以自动管理，也可以手动管理。默认是自动管理，可以通过如下参数控制

> WORKAREA_SIZE_POLICY= MANUAL

	SYS@PROD1> show parameter workarea

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	workarea_size_policy                 string      AUTO
	SYS@PROD1> show parameter pga

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	pga_aggregate_target                 big integer 0
	SYS@PROD1> 

pga_aggregate_target 是上限目标，实际上是可以超过的。

### PGA内容

PGA包含的是有关进程正在使用的操作系统资源信息以及进程的状态信息

作用：一般在建立大表的索引时候，或者hashjoin等时候使用到PGA，通过设置大的PGA，进行调优

#### PGA模式

PGA：专有模式，共享模式

现在都是专有模式居多，上面就是专有模式下PGA内容

#### PGA分四块内容（专有模式）

##### 1.会话内存（session memory）

如：登陆信息的用户和密码，开着的没有超时的会话信息，不需要每次都需要使用

##### 2.私有 SQL 区(private SQL area)

*共享模式，这块不是在PGA中

	两部分：
	1） 固定部分（persistent area）
	绑定信息（bind information）之类的数据，打开游标
	
	2）运行部分（run-time area）
	INSERT，UPDATE DELETE(sql执行完了就释放掉)

*INSERT，UPDATE DELETE -->执行结束后就能释放运行部分。不像select要显示完所有的信息之后，才能释放运行时区

##### 3.游标及共享 SQL 区

cursor 句柄,handle：--PL/SQL的游标，类似指针一样的东西（一个共享sql区可以对应多个私有SQL区）

	私有CURSOR只有句柄，没有执行计划（纯粹只有一个指针） 软软解析放到PGA中

	共享CURSOR,有句柄,还有执行计划（指针+执行计划）

话外话：

	解析分硬解析，软解析，软软解析

	某个会话执行：select * from a;

	第一次执行：
	硬解析->放到SGA

	再执行一次：
	软解析->SGA

	再执行一次：
	把执行计划copy放到PGA里面
	（Library cache：需要排队获取 latch / pid 效率慢了，所以引出软软解析直接从PGA中获取）

	第四次：软软解析

	通过视图可以查看到是否软软解析

	软软解析：
	SESSION_CACHED_CURSORS

	SYS@PROD1> show parameter session_cached

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	session_cached_cursors               integer     50
	SYS@PROD1> 


	PGA 有多少个cache
	CACHE共享游标中的一些信息,比如执行计划,句柄,SQL文本等

	select * from emp;
	执行四次，执行第三次时候开始放进PGA


##### 4.SQL 工作区

PGA重点部分：SQL工作区

包含了

	1）SORT_AREA_SIZE
	排序
	2）SORT_AREA_RETAINED_SIZE
	排序保留区
	3）  HASH_AREA_SIZE
	哈希连接（hash-join）
	4）bitmap_merge_area_size
	位图merge（bitmap merge）
	5)  create_bitmap_area_size
	位图创建（bitmap create） 



排序区：

	SYS@PROD1> show parameter sort_area

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	sort_area_retained_size              integer     0        排序保留区
	sort_area_size                       integer     65536    排序区
	SYS@PROD1> 

如果排序保留区是0的话，排序保留区=排序区

	如果SORT_AREA_RETAINED_SIZE=0, 
	那么SORT_AREA_RETAINED_SIZE = SORT_AREA_SIZE;

如执行：`select * from a order by col1;`

显示结果，排完序结果放到PGA中，排序保留区，两个都要用,直到显示完成之后，才释放排序保留区

如执行：`INSERT INTO a SELECT * FROM b ORDER BY col1;`

这个时候：排序区需要用，排序保留区不需要使用（因为不需要显示给用户看）

如果排序区太小了，放不下那么多排序数据，这个时候会放到临时表空间，临时表空间和内存进行交换（大的排序，性能较差的原因）

大表建索引，需要排序。这个时候可以考虑把PGA设置为手动管理如下方式调优：

	WORKAREA_SIZE_POLICY = MANUAL
	sort_area_size 加大
	db_file_multiblock_read_count
	开并行，不写日志(nologging)

如果有hash join，调整HASH_AREA_SIZE大小：

	hash join：通常一个小表，一个大表
	把小表放进内存作为驱动表


#### 后续





-------- EOF Lyn 2017/01/09/ --------


