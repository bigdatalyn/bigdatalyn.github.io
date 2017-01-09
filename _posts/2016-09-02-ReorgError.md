---
layout: post
title: "[原创]DB2 Reorg的SQL2216N问题处理总结"
date:   2016-09-02 11:42:00
category: DB2
tags: DB2 
---

* content
{:toc}

下面前同事碰到reorg的SQL2216N报错，帮忙处理了下，先总结如下

---

### 错误描述


reorg时候:

	$db2 "reorg table db2inst1.BACKUP_LOGS allow noaccess use REORG32K"
	SQL2216N  SQL error "-968" occurred while reorganizing a database tableor its indexes.





	
### 日志描述

db2diag日志中：

	2016-09-01-08.28.10.095410+000 I153304A412        LEVEL: Error
	PID     : 39452672             TID  : 5399        PROC : db2sysc 0
	INSTANCE: db2inst1             NODE : 000         DB   : PRODB
	EDUID   : 5399                 EDUNAME: db2loggr (PRODB) 0
	FUNCTION: DB2 UDB, data protection services, sqlpgifl, probe:50
	RETCODE : ZRC=0x850F000C=-2062614516=SQLO_DISK "Disk full."
		  DIA8312C Disk was full.

	2016-09-01-08.28.10.265725+000 I153717A405        LEVEL: Error
	PID     : 39452672             TID  : 5399        PROC : db2sysc 0
	INSTANCE: db2inst1             NODE : 000         DB   : PRODB
	EDUID   : 5399                 EDUNAME: db2loggr (PRODB) 0
	FUNCTION: DB2 UDB, data protection services, sqlpgCallGIFL, probe:2750
	DATA #1 : <preformatted>
	Error rc -2062614516 when initializing log file 105602

具体错误code：

	$ db2diag -rc -2062614516

	Input ZRC string '-2062614516' parsed as 0x850F000C (-2062614516).

	ZRC value to map: 0x850F000C (-2062614516)
		V7 Equivalent ZRC value: 0xFFFFD60C (-10740)

	ZRC class :
		Resource Capacity Error (Class Index: 5)
	Component:
		SQLO ; oper system services (Component Index: 15)
	Reason Code:
		12 (0x000C)

	Identifer:
		SQLO_DISK
		SQLPG_DISK_FULL
	Identifer (without component):
		SQLZ_RC_DISK

	Description:
		Disk full.

	Associated information:
		Sqlcode -968
	SQL0968C  The file system is full.

		Number of sqlca tokens : 0
		Diaglog message number: 8312

	--------------------------------


### 对策

reorg时候需要记录日志，需要临时表空间，所以reorg为了不影响系统默认临时表空间，会在reorg时候指定临时表空间（为的是不影响其他业务使用默认临时表空间...）

如果临时表空间不够,有可能会报SQL2216N的错误，详细可以查看infro center

对策的话，我总结有下三方法：

1.扩临时表空间（对应os的fs的扩张）

2.如果扩不了临时表空间，是否能否创建新的临时表空间，重新reorg指定新的临时表空间
	
如：（保证新fs目录的大小需要足够大即可,或者多路径-多路复用，bufferpool大小，还要注意表空间的pagesize等问题）

	db2 "create system TEMPORARY tablespace temp_S_CONTACT_16K MANAGED BY SYSTEM USING ('/db2/db2inst1/temp_S_CONTACT_16K') ";
	
	or

	db2 "CREATE SYSTEM TEMPORARY TABLESPACE temp_S_CONTACT_16K PAGESIZE 16K MANAGED BY SYSTEM USING ('/db2inst1/storagepools001/temp/','/db2inst1/storagepools001/temp1/', '/db2inst1/storagepools001/temp2/') BUFFERPOOL LARGEBUFPOOL1 DROPPED TABLE RECOVERY OFF"

	db2 reorg table db2inst1.S_CONTACT allow no access use temp_S_CONTACT_16K;

3.如果不能扩fs，又不能指定新的临时表空间，可以通过db2relocatedb的方式 换表空间 路径等

#### db2relocatedb 参考方法

一般我们用1和2的对策即可解决，db2relocatedb相对用的少

[db2relocatedb - Relocate database command](http://www.ibm.com/support/knowledgecenter/zh/SSEPGG_10.1.0/com.ibm.db2.luw.admin.cmd.doc/doc/r0004500.html)

步骤

1.配置文件relocate.cfg：

	-----------------------
	DB_NAME=TESTDB
	DB_PATH=/db/db2inst1
	INSTANCE=db2inst1
	CONT_PATH=/db/db2inst1/sms1,/db/db2inst1/sms2
	-----------------------

2.以防万一，做一次数据库offline备份

3.停止实例

	db2stop

4.物理拷贝文件到新目录

cp -pr /db/db2inst1/sms1 /db/db2inst1/sms2

5.db2relocatedb 重新配置表空间路径

db2relocatedb -f relocate.cfg

6.启动实例

	db2start


### 延展问题资料


[Collecting Data for Tivoli Storage Manager: Server Database Reorganization](http://www-01.ibm.com/support/docview.wss?uid=swg21590928)


[[DB2 LUW] REORGペンディングの回復方法](http://www-01.ibm.com/support/docview.wss?uid=swg21575039)


[索引的空间需求](http://www.ibm.com/support/knowledgecenter/zh/SSEPGG_10.1.0/com.ibm.db2.luw.admin.dbobj.doc/doc/c0004929.html)

	创建索引时的临时空间需求
	创建索引时，临时空间是必需的。在创建索引期间所需的最大临时空间可以按如下公式估算：

	    (平均索引键大小 + 索引键开销) × 行数 × 3.2

	对于那些每行可以有多个索引键的索引（例如空间索引、基于 XML 列的索引以及内部 XML 区域索引），可以按如下方式来估算所需的临时空间量：

	    (平均索引键大小 + 索引键开销) × 建立索引的节点数 × 3.2

>> 创建索引是临时表空间大小需要索引大小的四倍来估算

[监视索引重组操作](http://www.ibm.com/support/knowledgecenter/zh/SSEPGG_10.1.0/com.ibm.db2.luw.admin.perf.doc/doc/t0060241.html)





