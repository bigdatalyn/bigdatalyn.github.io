---
layout: post
title: "[原创]DB2 参数：DB2_OVERRIDE_BPF"
date:   2016-04-05 16:36:00
category: DB2
tags: DB2 参数 DB2_OVERRIDE_BPF
---

* content
{:toc}


最近碰到比较棘手的app，上次实例不正常停止后，db2start启动不了，临时扩大了实例内存（系统有多余内存，扩大一倍40g后，运行一段时间db2 force application后实例直接停止了，需要重新启动实例。）
DB2 db2set参数：DB2_OVERRIDE_BPF介绍和使用场景





### DB2 db2set参数：DB2_OVERRIDE_BPF

#### 故事背景：

最近碰到比较棘手的app，上次实例不正常停止后，db2start启动不了，临时扩大了实例内存（系统有多余内存，扩大一倍40g后，运行一段时间db2 force application后实例直接停止了，需要重新启动实例。

#### 调查分析测试：

重现抓取tracelog：

1.　db2trc ON

2.　「DB2 force applications」　执行

3.　db2trc off(实例没有自动停止、手动设置OFF。)



10701093        data DB2 UDB buffer pool services                       
sqlbScaleAutoBPsByFactor fnc (3.3.2.855.0.12236)                        
        pid 17432802 tid 24418 cpid 24641686 node 0 probe 12236         
        bytes 575                                                       
                                                                        
        Data1   (PD_TYPE_DIAG_LOG_REC,567) Diagnostic log record:       
                                                                        
        2016-04-02-09.53.49.485025+540 I489956A566          LEVEL: Info 
        PID     : 17432802             TID : 24418          PROC :      
db2sysc 0                                                               
        INSTANCE: db2inst1              NODE : 000           DB   :      
APPTDB                                                                  
        APPHDL  : 0-537                APPID:                           
*LOCAL.db2inst1.160402005347                                             
        AUTHID  : DB2INST1              HOSTNAME: bb1ineprod01           
        EDUID   : 24418                EDUNAME: db2agent (APPTDB) 0     
        FUNCTION: DB2 UDB, buffer pool services,                        
sqlbScaleAutoBPsByFactor, probe:12236                                   
        DATA #1 : <preformatted>                                        
        Defer writing on-disk changes for BP ID=3;old size=4294967295;  
new size=4262869781   


由于实例内存固定大小后STMM，在第三个Bufferpool调整内存时候（4294967295），超过了buffer的最大限制值。

通过：

	db2set DB2_OVERRIDE_BPF=3,1000   
	db2stop/db2start

设置后不会再重现了，接下来是调整bufferpool大小...

#### DB2_OVERRIDE_BPF的介绍


现罗列汇总下关于DB2_OVERRIDE_BPF的说明和使用：

该变量可以被设置为整数个4k页，它指定将被创建在数据库被激活时或首次建立一个连接时的缓冲池的大小（在页面里）。当由于内存限制的发生导致出现故障时，db2_override_bpf这个参数是非常有用的。这样内存限制可能出现在由于真正的内存不足（很少发生）或由于尝试用db2数据库管理器对缓冲池分配过大或者使用不恰当的配置的时候。缺省值是空。


Performance variables（DB2_OVERRIDE_BPF）

http://www.ibm.com/support/knowledgecenter/SSEPGG_10.5.0/com.ibm.db2.luw.admin.regvars.doc/doc/r0005665.html

例）

    db2set DB2_OVERRIDE_BPF=5000
    db2stop
    db2start
    db2 connect to elite
    db2 "select * from syscat.bufferpools"


	
DB2_OVERRIDE_BPF

        Operating system: All
        Default=Not set, Values: a positive numeric number of pages OR <entry>[;<entry>] where <entry> =<buffer pool ID>,<number of pages>
        This variable specifies the size of the buffer pool, in pages, to be created at database activation, rollforward recovery, or crash recovery. It is useful when memory constraints cause failures to occur during database activation, rollforward recovery, or crash recovery. The memory constraint could arise either in the rare case of a real memory shortage or, because of the attempt by the database manager to allocate a large buffer pool, in the case where there were inaccurately configured buffer pools. For example, when even a minimal buffer pool of 16 pages is not brought up by the database manager, try specifying a smaller number of pages using this environment variable. The value given to this variable overrides the current buffer pool size.

        You can also use <entry>[;<entry>...] where <entry> =<buffer pool ID>,<number of pages> to temporarily change the size of all or a subset of the buffer pools so that they can start up.


#### 使用的其他场景：

当数据库Prod环境-A恢复到Test环境-B时，如果A的bufferpool较大，当B机在进行Restore或者rollforwar前滚就会失败，

db2diag.log会提示"noavailable bufferpool pages"，

> 此时需要将db2_override_bfp进行临时修改，再进行前滚操作。

	db2set DB2_OVERRIDE_BFP=1000
	db2stop force
	db2start
	前滚
	db2 connect to <DBNAME> user <USERNAME> using <PASSWORD>
	db2 alter bufferpool <BUFFERPOOLNAME> size 20000
	db2set DB2_OVERRIDE_BFP
	db2stop force
	db2 start	

#### 相关命令

> 查看Buffer情况：

	db2pd -d sample -buff
	
> 多个Buffer情况：

	db2set db2_override_bpf='1,3000;2,3000;3,3000'


参考资料：

	http://www.ibm.com/support/docview.wss?uid=swg21594745



---

