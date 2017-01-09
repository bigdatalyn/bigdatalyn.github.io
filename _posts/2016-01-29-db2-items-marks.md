---
layout: post
title:  "[原创]DB2 重要概念点(陆续更新) in 2016/1/30"
date:   2016-01-29 09:06:05
description: "关于DB2数据库的概念解释，会陆续追加和更新"
categories: DB2
excerpt: DB2的重要概念点
tags: DB2概念 原创
---

* content
{:toc}

## DB2的重要概念点 





### Knowledge Points:
About DB2's concept,process,parameter,config,tuning, command etc.

---

#### 1. DB2's process and edu.

After db2 instance is up, following EDUs will be up:

db2sysc, db2alarm, db2wdog, db2ipccm, db2tcpcm, db2licc...

<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2pd -edus                             

Database Partition 0 -- Active -- Up 4 days 10:59:15 -- Date 2012-12-20-10.44.50.637159

List of all EDUs for database partition 0

db2sysc PID: 5242900
db2wdog PID: 6619334
db2acd  PID: 16384242

EDU ID    TID            Kernel TID     EDU Name                               USR (s)         SYS (s) 
========================================================================================================================================
10947     10947          37290119       db2agent (idle) 0                    133.876608    20.059654
2571      2571           22675473       db2spmlw 0                             0.000068     0.000111
2314      2314           68616367       db2spmrsy 0                            0.014467     0.019799
2057      2057           48955533       db2resync 0                            0.007510     0.024142
1800      1800           24379505       db2tcpcm 0                             0.031785     0.028314
1543      1543           64946231       db2tcpcm 0                             0.056026     0.048991
1286      1286           57147449       db2tcpcm 0                             0.054552     0.047121
1029      1029           41222207       db2ipccm 0                             0.419167     0.318089
772       772            57999433       db2licc 0                              0.000431     0.003533
515       515            66060291       db2thcln 0                             0.262786     0.098254
2         2              19791925       db2alarm 0                             1.906310     1.444061
258       258            30081197       db2sysc 0                             40.960888    47.469924

root@b20acirdb002st:/#ps -ef | grep -i db2inst1 | grep -v grep
db2inst1  4128828  5242900   0   Dec 15      -  0:00 db2vend (PD Vendor Process - 258) 
db2inst1  5242900  6619334   0   Dec 15      - 19:59 db2sysc 0 
db2inst1 16384242  6619334   0   Dec 15      -  0:45 db2acd 0

db2inst1:/dbhome/db2inst1$ ps -ef | grep -i 6619334
db2inst1  5242900  6619334   0   Dec 15      - 19:59 db2sysc 0 
root  6619334        1   0   Dec 15      -  0:00 db2wdog 0 
dbv95f08  9895996  6619334   0   Dec 16      -  0:00 db2fmp (C) 0 
db2inst1 16384242  6619334   0   Dec 15      -  0:45 db2acd 0 
dbv95f08 18677894  6619334   0   Dec 16      -  0:00 db2fmp (idle) 0 

After DB2 V9.5， four main process ：db2sysc， db2wdog， db2acd， db2fmp. 

db2sysc: main system controller EDU, handles critical DB2 database server events, basically the figure after the proc name indicate the node number (eg. db2sysc 0, Node No. = 0)
db2alarm: 在EDU请求的计时器到期时通知EDU(仅适用于UNIX)
db2wdog: 是所有db2进程的父进程。
db2ipccm：IPC通信管理器。
db2tcpcm：TCP通信管理器
db2licc：管理已安装的db2许可证

After db2 database is activated, following EDUs will be up :
db2agent, db2pfchr, db2pclnr, db2dlock, db2stmm, db2wlmd

db2inst1:/dbhome/db2inst1$ db2pd -edus

Database Partition 0 -- Active -- Up 4 days 10:53:25 -- Date 2012-12-20-10.39.00.360185

List of all EDUs for database partition 0

db2sysc PID: 5242900
db2wdog PID: 6619334
db2acd  PID: 16384242

EDU ID    TID            Kernel TID     EDU Name                               USR (s)         SYS (s) 
========================================================================================================================================
10096     10096          56426511       db2evmgi (DB2DETAILDEADLOCK) 0         0.000580     0.000584
9839      9839           46268515       db2fw7 (SAMPLE) 0                      0.000496     0.000488
9582      9582           44302417       db2fw6 (SAMPLE) 0                      0.000436     0.000480
9325      9325           11534385       db2fw5 (SAMPLE) 0                      0.000451     0.000487
9068      9068           68550903       db2fw4 (SAMPLE) 0                      0.000435     0.000478
8811      8811           36307065       db2fw3 (SAMPLE) 0                      0.000432     0.000479
8554      8554           40304669       db2fw2 (SAMPLE) 0                      0.000443     0.000485
8297      8297           66584623       db2fw1 (SAMPLE) 0                      0.000421     0.000478
8040      8040           58785925       db2fw0 (SAMPLE) 0                      0.000434     0.000477
7783      7783           32374805       db2lused (SAMPLE) 0                    0.000940     0.000888
7526      7526           64618643       db2wlmd (SAMPLE) 0                     0.000441     0.000487
7269      7269           58130603       db2taskd (SAMPLE) 0                    0.001035     0.001299
7012      7012           61800461       db2stmm (SAMPLE) 0                     0.001629     0.001834
6755      6755           25493505       db2pfchr (SAMPLE) 0                    0.000033     0.000002
6498      6498           41287771       db2pfchr (SAMPLE) 0                    0.000034     0.000002
6241      6241           40108093       db2pfchr (SAMPLE) 0                    0.000045     0.000004
5984      5984           41549843       db2pclnr (SAMPLE) 0                    0.000038     0.000004
5727      5727           41681119       db2pclnr (SAMPLE) 0                    0.000023     0.000004
5470      5470           64422075       db2pclnr (SAMPLE) 0                    0.000024     0.000004
5213      5213           10551347       db2pclnr (SAMPLE) 0                    0.000023     0.000004
4956      4956           35127535       db2pclnr (SAMPLE) 0                    0.000024     0.000004
4699      4699           61079651       db2pclnr (SAMPLE) 0                    0.000025     0.000004
4442      4442           35913979       db2pclnr (SAMPLE) 0                    0.000043     0.000009
4185      4185           66388169       db2dlock (SAMPLE) 0                    0.000053     0.000017
3928      3928           53739609       db2lfr (SAMPLE) 0                      0.000018     0.000001
3671      3671           30277665       db2loggw (SAMPLE) 0                    0.000109     0.000103
3414      3414           42926113       db2loggr (SAMPLE) 0                    0.000852     0.002610
3157      3157           32440405       db2logmgr (SAMPLE) 0                   0.000105     0.000057
2900      2900           60817611       db2logts (SAMPLE) 0                    0.000052     0.000002
10947     10947          37290119       db2agent (idle) 0                    133.495272    19.999893
2571      2571           22675473       db2spmlw 0                             0.000068     0.000111
2314      2314           68616367       db2spmrsy 0                            0.014455     0.019776
2057      2057           48955533       db2resync 0                            0.007504     0.024115
1800      1800           24379505       db2tcpcm 0                             0.031784     0.028312
1543      1543           64946231       db2tcpcm 0                             0.055960     0.048942
1286      1286           57147449       db2tcpcm 0                             0.054551     0.047119
1029      1029           41222207       db2ipccm 0                             0.418461     0.317578
772       772            57999433       db2licc 0                              0.000431     0.003533
515       515            66060291       db2thcln 0                             0.262610     0.098197
2         2              19791925       db2alarm 0                             1.904517     1.442584
258       258            30081197       db2sysc 0                             40.923428    47.426223

</font></code></pre>

db2pfchr: for bufferpool prefetches

db2pclnr: for bufferpool page cleaners

db2loggr: for manipulating log files to handle transaction processing and recovery.

db2loggw: for writing log records to the log files.

db2logts: tracks which table spaces have log records in whihc log files. This information is recorded in the DB2TSCHG.HIS file in the database directory. It is used to speed up the forward phase of table space rollforward recovery.

db2dlock: for deadlock detection

db2stmm: for the self-tuning memory feature

db2lfr: for log file readers that processes individual log files

db2logmgr: for the log manager. Manages log files for a recoverable database

db2wlmd: for automatic collection of workload management statistics

db2fmp: the fenced mode process

db2vend: this is a process to execute vendor code on behalf of an EDU, eg. execute the user-exit program for log archiving.

#### 2. db2pfchr edu

The number of processes db2pfchr can be specified by parameter NUM_IOSERVERS, the number of processes db2pclnr can be specified by parameter NUM_IOCLEANERS

<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 get db cfg for sample | grep -i NUM_IO
Number of asynchronous page cleaners   (NUM_IOCLEANERS) = AUTOMATIC(7)
Number of I/O servers                   (NUM_IOSERVERS) = AUTOMATIC(3)
db2inst1:/dbhome/db2inst1$ db2pd -edus

Database Partition 0 -- Active -- Up 17 days 08:37:44 -- Date 2012-12-03-23.01.51.139440

List of all EDUs for database partition 0

db2sysc PID: 11468850
db2wdog PID: 5570774
db2acd  PID: 18415786

EDU ID    TID            Kernel TID     EDU Name                               USR (s)         SYS (s) 
========================================================================================================================================
6688      6688           40370401       db2pfchr (sample) 0                     0.000233     0.000306
6431      6431           67960899       db2pfchr (sample) 0                     0.004260     0.001813
6174      6174           39059663       db2pfchr (sample) 0                     0.003841     0.002970
5917      5917           65011885       db2pclnr (sample) 0                     0.000638     0.001491
5660      5660           48365723       db2pclnr (sample) 0                     0.000565     0.001267
5403      5403           62521451       db2pclnr (sample) 0                     0.000538     0.000979
5146      5146           37421255       db2pclnr (sample) 0                     0.000600     0.001360
4889      4889           68616237       db2pclnr (sample) 0                     0.000526     0.000828
4632      4632           47120489       db2pclnr (sample) 0                     0.000583     0.001356
4375      4375           54067345       db2pclnr (sample) 0                     0.000646     0.001160
</font></code></pre>

#### 3. Self-tuning memory manager(STMM) 
Self-tuning memory manager(STMM) simplifies the task of memory configuration by automatically setting values for memory configuration parameters and sizing buffer pools,. The memory tuner dynamically distributes available memory resources among several memory consumers including sort memory, package cache,lock list memory, and buffer pools.
<pre><code class="markdown"><font size="2">Package cache(pckcachesz), 
Sort Memory(sheapthres_shr and sortheap), 
Locklist(locklist and maxlocks), 
Bufferpools
DB Heap, Catalog cache, Utility heap(no)
</font></code></pre>

#### 4. To enable STMM automatic
To enable STMM, the DBM cfg SELF_TUNING_MEM should be turned on; to make a specific buffer pool take part in STMM, the buffer pool size should be AUTOMATIC

<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2 get db cfg for sample | grep -i self
Self tuning memory                    (SELF_TUNING_MEM) = OFF  					//in this case, even the heap is set to automatic, STMM is off	

db2 update db cfg for sample using self_tuning_mem on

db2inst1:/dbhome/db2inst1$ db2 get db cfg for sample | egrep "DATABASE_MEMORY|DBHEAP|BUFFPAGE|STMTHEAP|APPL_MEMORY|APPLHEAPSZ|STAT_HEAP_SZ"
Size of database shared memory (4KB)  (DATABASE_MEMORY) = AUTOMATIC(28272)
Database heap (4KB)                            (DBHEAP) = AUTOMATIC(1200)
Buffer pool size (pages)                     (BUFFPAGE) = 1000
SQL statement heap (4KB)                     (STMTHEAP) = AUTOMATIC(8192)
Default application heap (4KB)             (APPLHEAPSZ) = AUTOMATIC(256)
Application Memory Size (4KB)             (APPL_MEMORY) = AUTOMATIC(40000)
Statistics heap size (4KB)               (STAT_HEAP_SZ) = AUTOMATIC(4384)
</font></code></pre>

#### 5. Database global memory
When explicitly activate database or first connection connects to database, db2 allocate database global memory, eg. buffer pool, locklist, catalog cache, package cache, database heap etc.

<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2mtrk -d           
Tracking Memory on: 2012/12/03 at 23:19:44

No active databases
db2inst1:/dbhome/db2inst1$ db2mtrk -d            
Tracking Memory on: 2012/12/03 at 23:20:06

Memory for database: sample   

   utilh       pckcacheh   other       catcacheh   bph (1)     bph (S32K)  
   64.0K       192.0K      192.0K      128.0K      4.4M        832.0K      

   bph (S16K)  bph (S8K)   bph (S4K)   shsorth     lockh       dbh         
   576.0K      448.0K      384.0K      0           640.0K      33.4M       

   apph (62376)apph (62374)apph (62375)apph (62373)apph (62372)apph (62370)
   64.0K       64.0K       64.0K       64.0K       64.0K       64.0K       

   apph (62371)apph (62368)apph (62369)apph (62364)apph (62367)apph (62363)
   64.0K       64.0K       64.0K       192.0K      64.0K       64.0K       

   apph (62365)appshrh     
   64.0K       448.0K      
</font></code></pre>

#### 6. Default tablespaces
After a new empty database is created, db2 will create following default buffer pools:
System 4k BP, System 8k BP, System 16k BP, System 32k BP, IBMDEFAULTBP
  
<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2 "select bpname, bufferpoolid, dbpgname, npages, pagesize from syscat.bufferpools" | tr -s " "

BPNAME BUFFERPOOLID DBPGNAME NPAGES PAGESIZE 
-------------------------------------------------------------------------------------------------------------------------------- ------------ -------------------------------------------------------------------------------------------------------------------------------- ----------- -----------
IBMDEFAULTBP 1 - 1000 4096

1 record(s) selected.

db2inst1:/dbhome/db2inst1$ db2 alter bufferpool ibmdefaultbp size automatic
db2inst1:/dbhome/db2inst1$ db2 "select bpname, bufferpoolid, dbpgname, npages, pagesize from syscat.bufferpools" | tr -s " "

BPNAME BUFFERPOOLID DBPGNAME NPAGES PAGESIZE 
-------------------------------------------------------------------------------------------------------------------------------- ------------ -------------------------------------------------------------------------------------------------------------------------------- ----------- -----------
IBMDEFAULTBP 1 - -2 8192

 1 record(s) selected.

If NPAGES is -1, pls refer to the buffpage db parameter.
If NPAGES is -2, indicates that the buffer pools user automatic sizing.

db2 "alter bufferpool ibmdefaultbp size manual" (remain at its current size and STMM tuning should stop)
db2 "alter bufferpool ibmdefaultbp size 1000"

We can relate bufferpool with tablespace by 
db2 "create tablespace sms8k pagesize 8192 managed by system using ('FSMS_8K_1') bufferpool bufferpool8k"</font></code></pre>

#### 7. Types of tablespaces
There are two types of tablespace, both of which can be used in a single database:

a) System managed space, in which the operating systems file manager controls the storage space
<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2 "create tablespace ts1 managed by system using('/dbhome/db2inst1/ts')" 
</font></code></pre>

b) Database managed space, in which the database manager controls the storage space
<pre><code class="markdown"><font size="2">bb2inst1:/dbhome/db2inst1$ db2 "create tablespace ts2 managed by database using (file '/dbhome/db2inst1/ts2/ts2.01' 10M, file '/dbhome/db2inst1/ts2/ts2.02' 10M)"</font></code></pre>

#### 8. Create tablespaces 
A database must contain at least three types table spaces: one catalog table space, one or more user table spaces, and one or more temporary tablespaces,. The catalog tablespace can not be dropped

<pre><code class="markdown"><font size="2">
db2 "create database mydb dft_extent_sz 4 
catalog tablespace managed by database using(file '/db/db2inst1/catalog.dat1' 20000, file '/db/db2inst1/catalog.dat2' 20000) extentsize 8 prefetchsize 16 
temporary tablespace managed by system using('/db/db2inst1/tempts') 
user tablespace managed by database using(file '/dbhome/db2inst1/ts3/ts3.01' 1000, file '/dbhome/db2inst1/ts3/ts3.02' 1000) extentsize 24 prefetchsize 48"
</font></code></pre>

We can specify the character of catalog tablespace, user tablespace and temporary tablespace when creating an empty database.
In addition, we can create more than one user tablespace, system temporary tablespace and user temporary tablespace.
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 "create system temporary tablespace tmp_tbsp managed by system using('/dbhome/db2inst1/tmp_tbsp')"
db2inst1:/dbhome/db2inst1$ db2 "create user temporary tablespace usr_tbsp managed by database using(file '/dbhome/db2inst1/usr_tbsp/ts.01' 1000, file '/dbhome/db2inst1/usr_tbsp/ts.02' 1000)"
</font></code></pre>

#### 9. Tablespace container
A DMS tablespace container can be a file or raw device, A SMS tablespace container should be a directory.
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 "create tablespace ts1 managed by database using (device '/dev/rdblv6' 10000) overhead 7.5 transferrate 0.06"</font></code></pre>

#### 10. Alter tablespace
DMS container definitions can be modified by ALTER TABLESPACE:
i) Add new containers, extend containers, add new stripe set
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 "alter tablespace usr_tbsp add(file '/dbhome/db2inst1/usr_tbsp/ts.03' 1000)"
db2inst1:/dbhome/db2inst1$ db2 "alter tablespace usr_tbsp extend(all 20)"
db2inst1:/dbhome/db2inst1$ db2 "alter tablespace usr_tbsp extend(file '/dbhome/db2inst1/usr_tbsp/ts.03' 30)"
db2inst1:/dbhome/db2inst1$ db2 "alter tablespace usr_tbsp resize(all 500)" 
db2inst1:/dbhome/db2inst1$ db2 "alter tablespace usr_tbsp resize(file '/dbhome/db2inst1/usr_tbsp/ts.03' 600)"

db2inst1:/dbhome/db2inst1$ db2 get snapshot for tablespaces on mydb
...
Table space map:

Range  Stripe Stripe  Max         Max  Start  End    Adj.   Containers
Number Set    Offset  Extent      Page Stripe Stripe
[   0] [   0]      0     371      1487      0    123   0    3 (0,1,2)
...
db2inst1:/dbhome/db2inst1$ db2 "alter tablespace usr_tbsp begin new stripe set (file '/dbhome/db2inst1/usr_tbsp/ts.04' 500)"
db2inst1:/dbhome/db2inst1$ db2 get snapshot for tablespaces on mydb
...
Table space map:

Range  Stripe Stripe  Max         Max  Start  End    Adj.   Containers
Number Set    Offset  Extent      Page Stripe Stripe
[   0] [   0]      0     371      1487      0    123   0    3 (0,1,2)
[   1] [   1]    124     495      1983    124    247   0    1 (3)

ii) Reduce or delete containers
db2inst1:/dbhome/db2inst1$ db2 "alter tablespace usr_tbsp drop (file '/dbhome/db2inst1/usr_tbsp/ts.04', file '/dbhome/db2inst1/usr_tbsp/ts.03')"
db2inst1:/dbhome/db2inst1$ db2 "alter tablespace usr_tbsp reduce(file '/dbhome/db2inst1/usr_tbsp/ts.03' 30)"
db2inst1:/dbhome/db2inst1$ db2 "alter tablespace usr_tbsp reduce(all 20)"
</font></code></pre>

#### 11. DMS tablespace
Following is the DMS tablespace limitions

<pre><code class="markdown"><font size="2">Description									4K page size limit			8K page size limit		16K page size limit 		32K page size limit
Maximum size of a regular DMS tablespace	64GB						128GB					256GB						512GB
Maximum size of a large DMS tablespace		2048GB						4096GB					8192GB						16384GB

V9.5 default is large tablespace. 
db2inst1:/dbhome/db2inst1$ db2 "create regular tablespace usr_ts2 managed by database using(file '/dbhome/db2inst1/usr_ts2/ts2.01' 1000)"	
</font></code></pre>

#### 12. Regular DMS tablespaces 
When a regular DMS tablespace reach its limition, the tablespace can be converted to LARGE tablespace to extend the limition

#### 13. Reorg tablespace
After a tablespace is converted to LARGE tablespace, it needs to do reorgnization for the tables/indexes in the tablespace

#### 14. Page in tablespace
Pages of table objects in a tablespace will be loaded into buffer pool, LOB/LF objects does not use bufferpool to cache data.

#### 15. Autoresize for tablespace
AUTORESIZE can be used to extend DMS tablespace DMS containers on demand, SMS tablespace does not support AUTORESIZE.
Database level Automatic storage,  tablespace level automatic storage, autoresize

A. 数据库级别的automatic storage是总开关，它要是设为NO，那tablespace就没有办法使用自动存储
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 "create database mydb automatic storage no on /db/db2inst1"
db2inst1:/dbhome/db2inst1$ db2 "create tablespace test managed by automatic storage"
DB21034E  The command was processed as an SQL statement because it was not a 
valid Command Line Processor command.  During SQL processing it returned:
SQL20317N  Automatic storage has not been defined for the database.  
SQLSTATE=55060
</font></code></pre>

B. 如果数据库级别的automatic storage设为yes,那么我们在tablespace级，可以打开autoresize也可以关闭
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 "create tablespace test1 managed by automatic storage autoresize no initialsize 300M" 
db2inst1:/dbhome/db2inst1$ db2 "create tablespace test managed by automatic storage autoresize yes initialsize 300M increasesize 75M maxsize none"
</font></code></pre>

C. 默认automatic storage和autoresize(对于managed by automatic storage)都是打开的
	
D. 如果在创建表空间时没有指定managed by automatic storage, 而是用managed by database,那么就是的DMS表空间。那不管数据库级别设置了什么，automatic storage和autoresize都是没有打开的。

E. 如果数据库没有设置automatic storage, 那么在tablespace级也可以使用autoresize选项（但是不能使用managed by automatic storage)
<pre><code class="markdown"><font size="2">db2 "create tablespace ts1 managed by database using (file '/dbhome/db2inst1/ts2/ts2.01' 1000) autoresize yes"</font></code></pre>
   
总结一句话：automatic storage用于指定是否自动分配存储路径，而automatic resize指的是当容器满时是否自动增长，两者不是一回事。

#### 16. Redirected restore
A redirected RESTORE with DMS tablespace must allocate containers with space equal to or greater than the HWM at the time of the BACKUP
Reorg can be used to lower HWM.

#### 17. Balance for tablespaces
When adding containers to a tablespace or dropping from it, it will trigger DB2 to balance data between the containers.
<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2 "alter tablespace TSASNCA add (file '/db/db2inst1/db2inst1/NODE0000/SQL00001/TSASNCA02' 2560)"; db2 get snapshot for tablespaces on sample
Rebalancer Mode                          = Forward
Start Time                           = 12/04/2012 16:45:04.000000
Restart Time                         = 12/04/2012 16:45:04.000000
Number of extents processed          = 7
Number of extents remaining          = 39
Last extent moved                    = 7
Current priority                     = 0
</font></code></pre>

#### 18. Allocating spaces
When allocating space for a DMS tablespace, it will allocate consecutive pages based on extend size, eg. if the extend size equals 8 and it needs 1 page, db2 will allocate 8 pgaes, not just a page.
<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2 list tablespaces show detail
Tablespace ID                        = 7
Name                                 = SYSTOOLSPACE
Type                                 = Database managed space
Contents                             = All permanent data. Large table space.
State                                = 0x0000
Detailed explanation:
 Normal
Total pages                          = 8192
Useable pages                        = 8188
Used pages                           = 152
Free pages                           = 8036
High water mark (pages)              = 152
Page size (bytes)                    = 4096
Extent size (pages)                  = 4		(here 4 pages)
Prefetch size (pages)                = 4
Number of containers                 = 1
Minimum recovery time                = 2012-11-15-08.16.03.000000
</font></code></pre>

#### 19. Isolation level
An isolation level determines how data is locked or isolated from other processes while the data is being accessed.

#### 20. DB2 isolation levels
DB2 supports the following isolation levels:
Repeatable Read(RR), Read Stability(RS), Cursor Stability(CS), Uncommitted Read(UR)

#### 21. RR/RS/CS/UR

Repeatable Read(RR) locks all the rows that an application references within a unit of work.

Read Stability(RS) locks only those rows that an application retrieves within a unit of work.

Cursor Stability(CS) locks any row accessed by a transaction of an application while a cursor is positioned on a row(default level).

Uncommitted Read(UR) allows an application to access uncommitted changes of other transaction.

#### 22. Summarizes for isolation levels
The following table summarizes the different isolation levels in terms of their undesirable effects
<pre><code class="markdown"><font size="2">Isolation levele		Access to uncommitted data		Nonrepeatable reads		Phantom read phenomenon
RR						Not possible					Not possible			Not possible
RS						Not possible					Not possible			Possible
CS 						Not possible					Possible				Possible
UR 						Possible						Possible				Posssible
</font></code></pre>

Three types error on concurrent application access

Phantom read phenomenon: read more

Nonrepeatable reads:  read less

Access to uncommitted data: read data which are changed but not committed by other application

#### 23. Change isolation level

Following ways can be used to change the isolation level
<pre><code class="markdown"><font size="2">
a) CHANGE ISOLATION TO UR/CS/RS/RR
b) Bind static application packages with specific isolation level
c) SET ISOLATION UR/CS/RS/RR
d) SELECT/DELETE/UPDATE using clause "WITH UR/CS/RS/RR"

a)db2 chanage isolation to ur
b)db2 bind static.bnd isolation rr
c)db2 +c "select count(*) from d312300.employee with rr"
d)db2inst1:/dbhome/db2inst1$ db2 "set current isolation=UR"
DB20000I  The SQL command completed successfully.
db2inst1:/dbhome/db2inst1$ db2 "values current isolation"
</font></code></pre>
 
#### 24. Lock in DB2

On LUW platform, possible lock object are as follows: Row, Table, Tablespace

*How to lock a tablespace

#### 25. Lock for table
SQL statement "LOCK TABLE" can lock the whole table and reduce the lock amount
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 +c "lock table d312300.employee in share mode"    
db2inst1:/dbhome/db2inst1$ db2 +c "lock table d312300.employee in exclusive mode"
db2inst1:/dbhome/db2inst1$ db2pd -db sample -locks                               

Database Partition 0 -- Database SAMPLE -- Active -- Up 0 days 00:59:08 -- Date 2012-12-18-16.59.00.140589

Locks:
Address            TranHdl    Lockname                   Type       Mode Sts Owner      Dur HoldCount  Att        ReleaseFlg rrIID
0x0700000080601580 16         4141414141424263C34A726E41 Internal P ..S  G   16         1   0          0x00000000 0x40000000 0     
0x0700000080601400 16         0000000500001B0F83E5E22043 CatCache   ..S  G   16         1   0          0x00000000 0x40000000 0     
0x0700000080601100 16         00040004000000000000000054 Table      ..X  G   16         255 0          0x00003000 0x40000000 0   
</font></code></pre>

#### 26. Event monitor for deadlock.
To Capture deadlock event, you can create event monitor to record deadlock information

<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$  db2 "create event monitor dlmon for deadlocks with details write to file '/dbhome/db2inst1/evmon' buffersize 8 nonblocked maxfiles 5 maxfilesize 32 manualstart"
</font></code></pre>

#### 27. Lock escalation
When the lock escalation frequently happens, LOCKLIST/MAXLOCKS needs to be optimized
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 get db cfg for sample show detail| egrep -i "locklist|maxlocks"
 Max storage for lock list (4KB)              (LOCKLIST) = 1024                       1024                      
 Percent. of lock lists per application       (MAXLOCKS) = 20                         20   
</font></code></pre>
它的意思是：分配给锁列表的存储容量为1024*4K

当一个application持有的锁超过20%时，就会缩升级。

我们来计算一下，大概第一个锁为112字节（64bit),其他缩要求56字节, 所以大概更新15000行左右的时候，行数就会升级为表锁。

<pre><code class="markdown"><font size="2">db2 get snapshot for db on sample
...
Number of Threshold Violations             = 0
Locks held currently                       = 0
Lock waits                                 = 0
Time database waited on locks (ms)         = 0
Lock list memory in use (Bytes)            = 5888
Deadlocks detected                         = 0
Lock escalations                           = 0
Exclusive lock escalations                 = 0
Agents currently waiting on locks          = 0
Lock Timeouts                              = 0
Number of indoubt transactions             = 0
...
db2inst1:/dbhome/db2inst1$ db2 +c "update d312300.employee set edlevel=13 where salary > 4200"
db2 get snapshot for db on sample
...
Number of Threshold Violations             = 0
Locks held currently                       = 2
Lock waits                                 = 0
Time database waited on locks (ms)         = 0
Lock list memory in use (Bytes)            = 6528
Deadlocks detected                         = 0
Lock escalations                           = 1			//lock escalations
Exclusive lock escalations                 = 1
Agents currently waiting on locks          = 0
Lock Timeouts                              = 0</font></code></pre>


#### 28. Lock wait
If application connection stay on LOCK-WAIT state, LOCKTIMEOUT needs to be optimized
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 list applications show detail | tr -s " "

CONNECT Auth Id Application Name Appl. Application Id Seq# Number of Coordinating DB Coordinator Status Status Change Time DB Name DB Path
 Handle Agents partition number pid/thread
-------------------------------------------------------------------------------------------------------------------------------- -------------------- ---------- -------------------------------------------------------------- ----- ---------- ---------------- --------------- ------------------------------ -------------------------- -------- --------------------
...
db2inst1 db2bp 43086 *LOCAL.db2inst1.121218083621 00001 1 0 9815 Lock-wait 12/18/2012 17:36:35.261233 SAMPLE /db/db2inst1/db2inst1/NODE0000/SQL00002/

db2inst1:/dbhome/db2inst1$ db2 get db cfg for sample | grep -wi locktimeout
Lock timeout (sec)                        (LOCKTIMEOUT) = 1200
</font></code></pre>

#### 29. Logprimary and logsecond

LOGPRIMARY and LOGSECOND indicates the number of log files used by the database, the number of primary and secondary log files must comply with the following:

If logsecond has a value of -1, logprimary <=256

If logsecond does not have a value of -1, (logprimary + logsecond) <= 256

#### 30. Log's utilization in current
The formula to calculate log utilization of the database is as below:
<pre><code class="markdown"><font size="2">
(current active log - first active log) / (logprimary + logsecond) * 100%
</font></code></pre>

#### 31. Chngpgs_thresh
Asynchronous page cleaners can be used to write out changed pages to disk, parameter chngpgs_thresh will decide when pages need to write out.
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 get db cfg for sample | grep -i chngpgs_thresh
 Changed pages threshold                (CHNGPGS_THRESH) = 60</font></code></pre>

#### 32. Snapshot for database
The database manager maintains (among others) information at the following levels:

 Database manager	Database	Application		Table	Lock	Tablespace	Buffer pool		Transaction	Statement	Subsection	Dynamic SQL package

<pre><code class="markdown"><font size="2">
 db2inst1:/dbhome/db2inst1$ db2 get snapshot for dbm
 db2inst1:/dbhome/db2inst1$ db2 get snapshot for database on sample
 db2inst1:/dbhome/db2inst1$ db2 get snapshot for tablespaces on sample
 db2inst1:/dbhome/db2inst1$ db2 get snapshot for bufferpools on sample
 db2inst1:/dbhome/db2inst1$ db2 get snapshot for tables on sample
 db2inst1:/dbhome/db2inst1$ db2 get snapshot for locks on sample
 db2inst1:/dbhome/db2inst1$ db2 get snapshot for applications on  sample
 db2inst1:/dbhome/db2inst1$ db2 get snapshot for dynamic sql on  sample
</font></code></pre>
 
#### 33. DFT_MON_*** in DBM
Update dbm configuration with DFT_MON_*** will keep the switch value and take effect to new sessions.
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 get dbm cfg | grep -i dft_mon
   Buffer pool                         (DFT_MON_BUFPOOL) = ON
   Lock                                   (DFT_MON_LOCK) = ON
   Sort                                   (DFT_MON_SORT) = ON
   Statement                              (DFT_MON_STMT) = ON
   Table                                 (DFT_MON_TABLE) = ON
   Timestamp                         (DFT_MON_TIMESTAMP) = ON
   Unit of work                            (DFT_MON_UOW) = ON
</font></code></pre>

#### 34. db2look
db2look can extract the Data Definition Lanaguage(DDL) statements of a database, and can retrieve statistics information of objects.

It can extracts DDL statements for the following database objects:

Tables	Triggers	Views	Indexes	Materialized query tables(MQTs)	Stored procedures	Roles	Sequences	Check constraints	Primary key constraints	Referential integrity constraints

Note: db2look just extract the DDL(Definition) of tables, but it does not dump data from tabels.

<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2look -d sample -e -t employee</font></code></pre>

#### 35. privilege for extract object DDL.

To extract the object DDL, it requires SELECT privilege on the system catalog tables.

#### 36. db2look command
Following are some important options of db2look command;

-m	Generates the UPDATE statements that are required to replicate the statistics on tables, statistical views, columns, and indexes

-l  Generates DDL statements for the following database objects: tablespaces/database partition groups/buffer pools

-x  Generates authorization DDL statements such as GRANT statements

<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2look -d sample -m -t employee
db2inst1:/dbhome/db2inst1$ db2look -d sample -l
db2inst1:/dbhome/db2inst1$ db2look -d sample -x  (-t employee)
</font></code></pre>

#### 37. db2mtrk tool
db2mtrk provides complete report of memory status, for instances, databases, agents, and appl

Followings are important options of the command:

-i Show instance level memory, eg. monitor heap/audit buffer

-d Show database level memory, eg. buffer pool/lock list/db heap etc.

-a Show application memory usag

-p Deprecated. Show private memory, it is replaced with -a parameter

<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2mtrk -i
Tracking Memory on: 2012/12/19 at 16:00:07

Memory for instance

   other       fcmbp       monh        
   14.6M       832.0K      384.0K  
db2inst1:/dbhome/db2inst1$ db2mtrk -d
Tracking Memory on: 2012/12/19 at 16:00:39

Memory for database: SAMPLE  

   utilh       pckcacheh   other       catcacheh   bph (1)     bph (S32K)  
   64.0K       1.3M        192.0K      384.0K      6.6M        832.0K      

   bph (S16K)  bph (S8K)   bph (S4K)   shsorth     lockh       dbh         
   576.0K      448.0K      384.0K      192.0K      4.4M        35.4M       

   apph (56830)apph (56829)apph (56828)apph (56827)apph (56826)apph (56825)
   64.0K       64.0K       64.0K       64.0K       64.0K       64.0K       

   apph (56824)apph (56823)apph (56822)apph (56821)apph (56820)apph (56819)
   64.0K       64.0K       64.0K       192.0K      64.0K       64.0K       

   apph (56818)apph (56817)appshrh     
   64.0K       64.0K       704.0K      
   
 db2inst1:/dbhome/db2inst1$ db2mtrk -a
Tracking Memory on: 2012/12/19 at 16:01:36

Application Memory for database: SAMPLE  

   appshrh     
   704.0K      

  Memory for application 56822

   apph        other       
   64.0K       192.0K      

  Memory for application 56828

   apph        other       
   64.0K       192.0K      
</font></code></pre>

#### 38. db2support tool
db2support collects environment data for problem analysis. It includes : DBM/DB configuration, OS snapshot, DB2 snapshot and diag information
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2support /dbhome/db2inst1 -s -d sample -c -f > db2support.log 2>&1
</font></code></pre>

#### 39. db2chbkp
db2chbkp can be used to test the integrity of a backup image and to determine whether or not the image can be restored. It can also display the metadata stored in the backup header,

eg. online/offline backup, compress mode, include logs or not etc.

Backup Mode 0 - offline	, 1 - online

Backup Type 0 - full	, 1 - tablespace

Backup Gran. 0 - normal , 16 - incremental 48 - delta

Compression 0 - No, 1 - Yes

Include logs 0 - No, 1 - Yes

<pre><code class="markdown"><font size="2">db2inst1:/dbbackup/db2inst1$ db2ckbkp -h SAMPLE.0.db2inst1.NODE0000.CATN0000.20121219160402.001

=====================
MEDIA HEADER REACHED:
=====================
		Server Database Name           -- SAMPLE
		Server Database Alias          -- SAMPLE
		Client Database Alias          -- SAMPLE
		Timestamp                      -- 20121219160402
		Database Partition Number      -- 0
		Instance                       -- db2inst1
		Sequence Number                -- 1
		Release ID                     -- D00
		Database Seed                  -- 74F893BC
		DB Comment's Codepage (Volume) -- 0
		DB Comment (Volume)            --                               
		DB Comment's Codepage (System) -- 0
		DB Comment (System)            --                               
		Authentication Value           -- 255
		Backup Mode                    -- 0 
		Includes Logs                  -- 0
		Compression                    -- 0
		Backup Type                    -- 0
		Backup Gran.                   -- 0
		Merged Backup Image            -- 0
		Status Flags                   -- 21
		System Cats inc                -- 1
		Catalog Partition Number       -- 0
		DB Codeset                     -- UTF-8
		DB Territory                   -- 
		LogID                          -- 1355210484
		LogPath                        -- /db/db2inst1/db2inst1/NODE0000/SQL00002/SQLOGDIR/
		Backup Buffer Size             -- 4460544
		Number of Sessions             -- 1
		Platform                       -- 14

 The proper image file name would be:
SAMPLE.0.db2inst1.NODE0000.CATN0000.20121219160402.001


[1] Buffers processed:  ###################################################

Image Verification Complete - successful.
</font></code></pre>

#### 40. db2adutl

db2adutl allows users to query, extract, verify, and delete backup images, logs and load copy images that are saved using TSM

#### 41. list history
"List History" command can display backup, reorg, rollforward, load, archive log.

<pre><code class="markdown"><font size="2">
db2 list history backup all for db sample
db2 list history reorg all for db sample
db2 list history rollforward all for db sample
db2 list history load all for db cssmr
db2 list history archive log all for db sample
</font></code></pre>

#### 42. db2expln

db2expln tool describes the access plan selected for SQL and XQuery statements,

For static SQL and XQuery statements, db2expln examines the packages stored in the system catalog tables.

For dynamic SQL and XQuery statements, db2expln examines the query cache sections.

dynamic SQL: db2expln -d sample -q "select a.empno, a.lastname, a.salary, b.deptname, b.location from d312300.employee a, d312300.department b" -g -t

static SQL: db2expln -d sample -g -c db2inst1 -p STATIC -s 0 -t     --STATIC is package name

#### 43. db2pd tool
db2pd retrieves information from the DB2 database system memory sets, used for monitoring and troubleshooting. It can display memory allocated, application running, lock acquired by applications, dbm/db configuration etc.
<pre><code class="markdown"><font size="2">db2pd -db sample
db2pd -version
db2pd -dbmcfg
db2pd -db sample dbcfg
db2pd -osinfo
db2pd -db sample -logs
db2pd -db sample -locks
db2pd -db sample -locks showlocks
db2pd -db sample -wlocks
db2pd -db sample -applications
db2pd -db sample -apinfo
db2pd -db sample -dynamic
db2pd -db sample -transaction
db2pd -db sample -agents
db2pd -db sample -edus
db2pd -db sample -bufferpool
db2pd -db sample -tablespace
db2pd -db sample -tcbstats
*db2pd -db sample -wlocks -applications -transaction -dynamic</font></code></pre>

#### 44. db2diag tool
DB2 diagnostic file name is db2diag.log, which is under path specified in DBM configuration DIAGPATH
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 get dbm cfg | grep -iw DIAGPATH
 Diagnostic data directory path               (DIAGPATH) = /dbhome/db2inst1/sqllib/db2dump

db2diag -H 100
db2diag -time xxxxxxxx -l "Error, Severe"
db2diag -H 100 -l "Error, Severe"

</font></code></pre>


#### 45. db2diag message 
In each entry of db2diag.log, it generally includes following fields: Timestamp, Level(Warning/Error etc). PID, TID, PROC, INSTANCE

<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2diag -time 2012-12-18
2012-12-18-03.32.17.900486+540 E641563A376        LEVEL: Info
PID     : 20185202             TID  : 3343        PROC : db2sysc 0
INSTANCE: db2inst1             NODE : 000
EDUID   : 3343                 EDUNAME: db2logmgr (CSSMR) 0
FUNCTION: DB2 UDB, data protection services, sqlpgArchiveLogFile, probe:3108
DATA #1 : 
Started archive for log file S0000017.LOG.

Timestamp: 2012-12-18-03.32.17.900486+540
Level: Info
PID: 20185202
TID: 3343
PROC: db2sysc
INSTANCE: db2inst1
EDUID: 3343
EDUNAME: db2logmgr
FUNCTION: sqlpgArchiveLogFile
MESSAGE: Started archive for log file S0000017.LOG.
</font></code></pre>

#### 46. db2diag.log
Following fields may be included in the diaglog.log 

entry:EDUID, EDUNAME, FUNCTION, MESSAGE etc.

#### 47. Event monitor
The CREATE EVENT MONITOR statement defines a monitor that will record certain events that occur when using the database. 

The event monitor can record following events: Database, Tables, Deadlocks, Tablespaces, Bufferpools, Connections, Statements, Trans
The event records can write to Database tables, pipe or files.

<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2 "create event monitor dlmon for transactions, tables write to table buffersize 8 nonblocked"             
db2inst1:/dbhome/db2inst1$  db2 "create event monitor dlmon for connections, deadlocks with details write to file '/dbhome/db2inst1/evmon' buffersize 8 nonblocked maxfiles 5 maxfilesize 32 manualstart"
</font></code></pre>

48. event_mon_state()
The function event_mon_state() can be used to check the monitor status, to see if it is active or inactive.

<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$ db2 "select evmonname, event_mon_state(evmonname) from syscat.eventmonitors" | tr -s " "

	EVMONNAME 2 
	-------------------------------------------------------------------------------------------------------------------------------- -----------
	DB2DETAILDEADLOCK 1
	DLMON 0

	1: active
	0: inactive
</font></code></pre>

#### 49. db2advis tool

db2advis can advise users on the creation of materialized query tables(MQTs) and indexes, the repartitioning of tables, the conversion to multidimensional clustering(MDC) tables, and the deletion of unused objects

The following option indicates which type of advices will be included:

-I Index

-M MQT

-C MDC

-P Repartitioning of table

How to use db2advis in current daily work?

#### 50. Runstats 

When doing runstats for a table ,there are two sample methods: Bernoulli and System. Bernoulli Sample is based on rows of the table, System Sample is based on the page level.


#### 51. HADR env
In HADR environment, the OS/Fixpack/DB2 version/level and database name must be the same on primary and standby server, but the instance name can be different.

#### 52. HADR's version up

When upgrading/updating instances in a HADR, fixpack of same release does not need to rebuild/recreate HADR

#### 53. HADR's synch mode
DB2 HADR has 3 synchronization mode : SYNCH, NEARSYNCH, ASYNCH， （SUPERASYNC V97 new）
<pre><code class="markdown"><font size="2">
SYNCH: Logs are written to log files on the primary database and The primary database has received acknowledegment from the standby database that logs are successfully written to log files on the standby database
	也就是说，log成功写入primary database的log文件中，并且收到来自standby的成功写入log文件中的握手信息
NEARYSYNC： Logs records have been written to the log files on the primary database and The primary database has received acknowledgement from the standby database that logs are successfully written to main memroy on the standby database
	也就是说，log成功写入primary database的log文件中，并且收到来自standby的成功写入内存中的握手信息
AYSNC： Log records have been written to the log files on the primary database and Log records have been delivered to the standby database; no acknowledgement is expected.
	也就是说，log成功写入primary database的log文件中，并且已经送递给standby，不管是否成功
</font></code></pre>

#### 54. HADR's status in Primary
Possible states on the primary database are as follows:
Peer, Remote catchup, Remote catchup pending, DisconnectedPeer
See below

#### 55. HADR's status in Standby
Possible states on the Standby database are as follows(five):
<pre><code class="markdown"><font size="2">
Local catchup, Remote catchup pending, Remote catchup, Peer, Disconected Peer
Local Catchup: When the standby database is started, it enters local catchup state and attempts to read the log files in its local log path.
Remote catchup pending: When the end of local log files is reached, the standby database enters remote catchup pending state.
Remote catchup: The standby database remains in remote catchup pending state until a connection to the primary database is established, at which time the standby database enters remote catchup state.
				 During this time, the primary database reads log data from its log path or by way of a log archiving method and sends the log files to the standby database. The standby database receives and replays the log data.
Peer: The primary and standby databases enter peer state when the standby database receives all of the log files that are on the disk of the primary database machine.
	  When in peer state, log pages are shipped to the standby database whenever the primary database flushes a log page to disk. The log pages are written to the local log files on the standby database to ensure that the primary and standby databases have identical log file sequences. The log pages can then be replayed on the standby database. 
Disconnected Peer: If the connection between the primary and standby databases is lost when the databases are in peer state, and if the HADR_PEER_WINDOW database configuration parameter is set to a non-zero value, then the standby database enters disconnected peer state. 
</font></code></pre>

#### 56. Connection's status
Possible connection status of HADR are as follows:
Connected, Disconnected, Congested

In ASYNC mode, the primary database continues to send log pages until the pipeline fills up and it cannot send additional log pages. This condition is called congestion. Congestion is reported by the hadr_connect_status monitor element. For SYNC and NEARSYNC modes, the pipeline can usually absorb a single flush and congestion will not occur. However, the primary database remains blocked waiting for an acknowledgement from the standby database on the flush operation.
Congestion can also occur if the standby database is replaying log records that take a long time to replay, such as database or table reorganization log records. 

#### 57. HADR's commands
Following HADR command will change HADR role : start HADR, stop HADR, takeover HADR
<pre><code class="markdown"><font size="2">
db2 start hadr on db cssmr
db2 stop hadr on db cssmr(db2 deactivate db cssmr)
db2 takeover hadr on DB CSSMR
db2pd -hadr -db cssmr
</font></code></pre>

#### 58. HADR's DBM config
DBM configuration changes will not be replicated between HADR pair.

The following database operations are not replicated by HADR

NOT LOGGED INITIALLY tables

Non-logged Large Objects(LOB)

Data Links

Database configuration changes

Recovery history file

#### 59. ACR in HADR
Automatic Client Reroute(ACR) enables a DB2 client to recover from a loss of connection to the DB2 server by rerouting the connection to an alternate server.
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 list db directory                                                                                        

 System Database Directory

 Number of entries in the directory = 2
...
Database 2 entry:

 Database alias                       = CSSMR
 Database name                        = CSSMR
 Local database directory             = /db/db2inst1
 Database release level               = d.00
 Comment                              =
 Directory entry type                 = Indirect
 Catalog database partition number    = 0
 Alternate server hostname            = b20acirdb001st.nankoh.japan.ibm.com			#here
 Alternate server port number         = 60010										#here
</font></code></pre>

#### 60.HADR's alternate server
 The UPDATE ALTERNATE SERVER FOR DATABASE command is used to define the alternative server location on a particular database.
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 update alternate server for database cssmr using hostname b20acirdb001st.nankoh.japan.ibm.com port 60010
DB20000I  The UPDATE ALTERNATE SERVER FOR DATABASE command completed 
successfully.
DB21056W  Directory changes may not be effective until the directory cache is 
refreshed.

db2inst1:/dbhome/db2inst1$ db2 update alternate server for database cssmr using hostname NULL port NULL
DB20000I  The UPDATE ALTERNATE SERVER FOR DATABASE command completed 
successfully.
DB21056W  Directory changes may not be effective until the directory cache is 
refreshed.
</font></code></pre>

#### 61. ACR's config
ACR can be used within the following configurable data partition & high availability environment:
DFF, SQL/Q Replication, HADR, HACMP, TSA

#### 62. HADR's db config
HADR has following parameters t configure:
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 get db cfg for cssmr 
...
 HADR_DB_ROLE, HADR_LOCAL_HOST, HADR_LOCAL_SVC, HADR_REMOTE_HOST, HADR_REMOTE_INST, HADR_REMOTE_SVC, HADR_SYNCMODE, HADR_TIMEOUT
 HADR database role                                      = STANDBY
 HADR local host name                  (HADR_LOCAL_HOST) = b20acirdb001st.nankoh.japan.ibm.com
 HADR local service name                (HADR_LOCAL_SVC) = DB2_db2inst1_hadr
 HADR remote host name                (HADR_REMOTE_HOST) = b20acirdb002st.nankoh.japan.ibm.com
 HADR remote service name              (HADR_REMOTE_SVC) = DB2_db2inst1_hadr
 HADR instance name of remote server  (HADR_REMOTE_INST) = db2inst1
 HADR timeout value                       (HADR_TIMEOUT) = 120
 HADR log write synchronization mode     (HADR_SYNCMODE) = NEARSYNC
 HADR peer window duration (seconds)  (HADR_PEER_WINDOW) = 60      (what means?)
 </font></code></pre>

 HADR_TIMEOUT: This parameter specifies the time (in seconds) that the high availability disaster recovery (HADR) process waits before considering a communication attempt to have failed.

 HADR_PEER_WINDOW: If you configure the database configuration parameter HADR_PEER_WINDOW to a time value that is greater than zero, then if the primary database loses connection with the standby database, then the primary database will continue to behave as though the primary and standby databases were in peer state for the configured amount of time. When the primary database and standby database are disconnected, but behaving as though in peer state, this state is called disconnected peer. The period of time for which the primary database remains in disconnected peer state after losing connection with the standby database is called the peer window. When the connection to the standby database is restored or the peer window expires, the standby database leaves the disconnected peer state. 

 也就是说，在peer状态时，如果standby不能连接primary(比如将primary stop), 那边standby会在HADR_PEER_WINDOW时间内（60秒内）变成disconnected peer, 如果这段时间过了还没有连接成功，那么standby就变成了RemoteCatchupPending；如果这段时间成功了，则变成peer.
反过来好像不行哦，一旦standby stop, 那primary就处于disconnected状态了。

The advantage of configuring a peer window is a lower risk of transaction loss during multiple or cascading failures. Without the peer window, when the primary database loses connection with the standby database, the primary database moves out of peer state. When the primary database is disconnected, it processes transactions independent of the standby database. If a failure occurs on the primary database while it is not in peer state like this, then transactions could be lost because they have not been replicated on the standby database. With the peer window configured, the primary database will not consider a transaction committed until the primary database has received acknowledgement from the standby database that the logs have been written to main memory on the standby system, or that the logs have been written to log files on the standby database (depending on the HADR synchronization mode.)
The disadvantage of configuring a peer window is that transactions on the primary database will take longer or even time out while the primary database is in the peer window waiting for the connection with the standby database to be restored or for the peer window to expire. 

*It seems there is no HADR_DB_ROLE parameter in V9.7.

#### 63. lssam
Command lssam can be used to check TSA resource groups status.

#### 64. db2haicu
Command db2haicu can be used to configure TSA environment.

#### 65. Buffer pool hit ratio
Buffer pool hit ratio = 1 - (( data physical reads + index physical reads) /(data logical reads + index logical reads))

In fact, I think the Bufferpool hit ratio =
1 - (( data physical reads + index physical reads ) - (Asynchronous pool data page reads  + Asynchronous pool index page reads)) / (data logical reads + index logical reads)

#### 66. Memory's config
When database is using the private memory for sort, the max concurrency sort operation equals the value SHEAPTHRES divide SORTHEAP
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 get dbm cfg | grep -i sheapthres
 Sort heap threshold (4KB)                  (SHEAPTHRES) = 0
db2inst1:/dbhome/db2inst1$ db2 get db cfg for sample | egrep -i "sortheap|sheapthres_shr"
 Sort heap thres for shared sorts (4KB) (SHEAPTHRES_SHR) = AUTOMATIC(6599)
 Sort list heap (4KB)                         (SORTHEAP) = AUTOMATIC(1319)
</font></code></pre>

When SHEAPTHRES = 0, database use the share memory for sort, SHEAPTHRES_SHR is soft limit.

When database is using the private memory for sort, SHEAPTHRES is soft limit.

*when does database use share memory or private memory?

#### 67. Sort opertation

There are many operation will cause db2 to sort, eg. SELECT DISTINCT, ORDER BY, GROUP BY, UNION, MERGE JOIN...

#### 68. Overflow with sort operation
During db2 sort operation, if the sorted data cannot fit entirely into the sort heap, it will overflows into temporary database tables.

#### 69. Optimization access plan
To choose optimization access plan, optimizer will consider following factors: Buffer pools, CPU/IO, Network communication etc.

#### 70. SQL compilation's phases
SQL compilation has following phases:

Parse query, check semantics, rewrite query, Pushdown Analysis (Federated Databases), optimize access plan, Remote SQL Generation(Federated Databases), Generate Executable Code

#### 71. Semantics's phase
During the semantics checking phase of compliation, db2 will

a) Validate SQL statement

b) Account for integrity constraints: Referential Integrity, Check, Triggers

c) View analysis: Merging, Materializing

#### 72. Query rewriting

During the query rewriting phase of compliation, db2 will merge operation, move operation, translate predicate

#### 73. Optimization's level
The valid optimization classes are as following : 0, 1, 2, 3, 4, 5, 7, 9

Optimization level 0 - Use a minimal amount of optimization, only Nested Loop Join(NLJOIN), is used

Optimization level 9 - Use all available optimization techniques

#### 74. Dft_queryopt

The optimization classes is configured by parameter dft_queryopt 
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2 get db cfg for sample | grep -i dft_queryopt
 Default query optimization class         (DFT_QUERYOPT) = 5
</font></code></pre>

#### 75. Join's types
There are three types of join for two tables:

Nested Loop Join(NLJOIN), Merge Scan Join(MSJOIN), Hash Join(HSJOIN)

#### 76. Table scan
When DB2 uses a Table Scan:

.The range of values scanned occurs frequently(that is, most of the table must be accessed)

.The table is small

.Index clustering is low

.An index does not exist

#### 77. Index scan
Create indexes can

.Avoid unnecessary table scans

.Ensure uniqueness

.Provide cluster order

.Avoid sorts

.Speed up frequently executed queries

.Speed up join predicateds and support referential integrity

.Reduce deadlock situations
<pre><code class="markdown"><font size="2">
db2 "create unique index empnoin on mytest(empno)"
db2 "create unique index empnoin on mytest(empno) cluster"
db2 "create unique index empnoin on mytest(empno, salary)"
db2 "create unique index empnoin on mytest(empno) include(salary)"
db2 "create index d312300.emp_asc_empno on d312300.employee(empno asc) minpctused 10 allow reverse scans"
</font></code></pre>

#### 78. TBSCAN
The operator TBSCAN in the access plan means a tab scan, the operator IXSCAN means index scan, this indicates indexes are used by db2
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$ db2expln -d sample -q  "select d.deptno, count(*) persons from employee e, department d where e.workdept=d.deptno group by d.deptno" -g -t
</font></code></pre>

#### 79. Set integrity
If a table is restricted to access(-688 error), then it needs to run "set integrity" command to immediately check the constraint
<pre><code class="markdown"><font size="2">db2inst1:/dbhome/db2inst1$db2 "create table emp_summary as (select e.empno, e.firstnme, e.lastname, e.phoneno, d.deptno, substr(d.deptname, 1, 12) as department, d.mgrno from employee e, department d where e.workdept=d.deptno) data initially deferred refresh immediate"

db2inst1:/dbhome/db2inst1$ db2 "select * from emp_summary"

EMPNO  FIRSTNME     LASTNAME        PHONENO DEPTNO DEPARTMENT   MGRNO 
------ ------------ --------------- ------- ------ ------------ ------
SQL0668N  Operation not allowed for reason code "1" on table 
"db2inst1.EMP_SUMMARY".  SQLSTATE=57016
db2inst1:/dbhome/db2inst1$ db2 load query table emp_summary
Tablestate:
  Set Integrity Pending		(also called check pending)

db2inst1:/dbhome/db2inst1$ db2 "set integrity for emp_summary immediate checked not incremental"

OR: db2 set integrity for d312300.staff check immediate unchecked
</font></code></pre>

#### 80. MQT table
To a MQT table, you can specify the data refresh approach: REFRESH DEFERRED, REFRESH IMMEDIATE. If the clause "REFRESH DEFERRED" is used, then the data needs to be synchronized by command "Refresh Table"
<pre><code class="markdown"><font size="2">
db2inst1:/dbhome/db2inst1$db2 "create table emp_summary as (select e.empno, e.firstnme, e.lastname, e.phoneno, d.deptno, substr(d.deptname, 1, 12) as department, d.mgrno from employee e, department d where e.workdept=d.deptno) data initially deferred refresh immediate"
db2inst1:/dbhome/db2inst1$ db2 "set integrity for emp_summary immediate checked not incremental"
</font></code></pre>


----------------------------------------

Sat Jan 30 20:30:06 CST 2016

----------------- EOF ------------------