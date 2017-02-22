---
layout: post
title: "Oracle Redo概念"
category: Oracle
tags: Oracle Redo
---

* content
{:toc}

Oracle 的Redo 机制DB的一个重要机制，理解这个机制对DBA来说也是非常重要。

Oracle 的Online redo log 是为确保已经提交的事务不会丢失而建立的一个机制。 

因为这种健全的机制，才能让我们在数据库crash时，恢复数据，保证数据不丢失。





### Crash Recovery 过程

	当数据库突然崩溃，而还没有来得及将buffer cache里的脏数据块刷新到数据文件里，同时在实例崩溃时正在运行着的事务被突然中断，则事务为中间状态，也就是既没有提交也没有回滚。这时数据文件里的内容不能体现实例崩溃时的状态。这样关闭的数据库是不一致的。

	下次启动实例时，Oracle会由SMON进程自动进行实例恢复。实例启动时，SMON进程会去检查控制文件中所记录的、每个在线的、可读写的数据文件的END SCN号。

	数据库正常运行过程中，该END SCN号始终为NULL，而当数据库正常关闭时，会进行完全检查点，并将检查点SCN号更新该字段。

	而崩溃时，Oracle还来不及更新该字段，则该字段仍然为NULL。当SMON进程发现该字段为空时，就知道实例在上次没有正常关闭，于是由SMON进程就开始进行实例恢复了。

#### 前滚

SMON进程进行实例恢复时，会从控制文件中获得检查点位置。于是，SMON进程到联机日志文件中，找到该检查点位置，然后从该检查点位置开始往下，应用所有的重做条目，从而在buffer cache里又恢复了实例崩溃那个时间点的状态。这个过程叫做前滚，前滚完毕以后，buffer cache里既有崩溃时已经提交还没有写入数据文件的脏数据块，也还有事务被突然终止，而导致的既没有提交又没有回滚的事务所弄脏的数据块。

#### 回滚

前滚一旦完毕，SMON进程立即打开数据库。但是，这时的数据库中还含有那些中间状态的、既没有提交又没有回滚的脏块，这种脏块是不能存在于数据库中的，因为它们并没有被提交，必须被回滚。打开数据库以后，SMON进程会在后台进行回滚。

有时，数据库打开以后，SMON进程还没来得及回滚这些中间状态的数据块时，就有用户进程发出读取这些数据块的请求。这时，服务器进程在将这些块返回给用户之前，由服务器进程负责进行回滚，回滚完毕后，将数据块的内容返回给用户。

总之，Crash Recovery时，数据库打开会占用比正常关闭更长的时间。

#### 必须先前滚，再回滚

回滚段实际上也是以回滚表空间的形式存在的，既然是表空间，那么肯定就有对应的数据文件，同时在buffer cache 中就会存在映像块，这一点和其他表空间的数据文件相同。

当发生DML操作时，既要生成REDO（针对DML操作本身的REDO Entry）也要生成UNDO（用于回滚该DML操作，记录在UNDO表空间中），但是既然UNDO信息也是使用回滚表空间来存放的，那么该DML操作对应的UNDO信息（在BUFFER CACHE生成对应中的UNDO BLOCK）就会首先生成其对应的REDO信息（UNDO BLOCK's REDO Entry）并写入Log Buffer中。

这样做的原因是因为Buffer Cache中的有关UNDO表空间的块也可能因为数据库故障而丢失，为了保障在下一次启动时能够顺利进行回滚，首先就必须使用REDO日志来恢复UNDO段（实际上是先恢复Buffer Cache中的脏数据块，然后由Checkpoint写入UNDO段中），在数据库OPEN以后再使用UNDO信息来进行回滚，达到一致性的目的。

生成完UNDO BLOCK's REDO Entry后才轮到该DML语句对应的REDO Entry，最后再修改Buffer Cache中的Block，该Block同时变为脏数据块。

实际上，简单点说REDO的作用就是记录所有的数据库更改，包括UNDO表空间在内。

####  Crash Recovery 再细分

Crash Recovery 可以在细分成两种：

	（1）实例恢复(InstanceRecovery)

	（2）崩溃恢复(CrashRecovery)

Instance Recovery与Crash Recovery是存在区别的：
针对单实例(singleinstance)或者RAC中所有节点全部崩溃后的恢复，我们称之为Crash Recovery。    
而对于RAC中的某一个节点失败，存活节点(surviving instance)试图对失败节点线程上redo做应用的情况，我们称之为Instance Recovery。

不管是Instance Recovery还是Crash Recovery，都由2个部分组成：
cache recovery和transaction recovery。

根据官方文档的介绍，Cache Recovery也叫Rolling Forward（前滚）；而Transaction Recovery也叫Rolling Back（回滚）。

### Redo log 说明

	REDO LOG 的数据是按照THREAD 来组织的，对于单实例系统来说，只有一个THREAD，对于RAC 系统来说，可能存在多个THREAD，每个数据库实例拥有一组独立的REDO LOG 文件，拥有独立的LOG BUFFER，某个实例的变化会被独立的记录到一个THREAD 的REDO LOG 文件中。

	对于单实例的系统，实例恢复（Instance Recovery）一般是在数据库实例异常故障后数据库重启时进行，当数据库执行了SHUTDOWN ABORT 或者由于操作系统、主机等原因宕机重启后，在ALTER DATABASE OPEN 的时候，就会自动做实例恢复。

	在RAC 环境中，如果某个实例宕了，或者实例将会接管，替宕掉的实例做实例恢复。除非是所有的实例都宕了，这样的话，第一个执行ALTER DATABASE OPEN 的实例将会做实例恢复。这也是REDO LOG 是实例私有的组件，但是REDO LOG 文件必须存放在共享存储上的原因。

	Oracle 数据库的CACHE 机制是以性能为导向的，CACHE 机制应该最大限度的提高数据库的性能，因此CACHE 被写入数据文件总是尽可能的推迟。这种机制大大提高了数据库的性能，但是当实例出现故障时，可能出现一些问题。 

	首先是在实例故障时，可能某些事物对数据文件的修改并没有完全写入磁盘，可能磁盘文件中丢失了某些已经提交事务对数据文件的修改信息。

	其次是可能某些还没有提交的事务对数据文件的修改已经被写入磁盘文件了。也有可能某个原子变更的部分数据已经被写入文件，而部分数据还没有被写入磁盘文件。

	实例恢复就是要通过ONLINE REDO LOG 文件中记录的信息，自动的完成上述数据的修复工作。这个过程是完全自动的，不需要人工干预。
 
#### 如何确保已经提交的事务不会丢失？

解决这个问题比较简单，Oracle 有一个机制，叫做Log-Force-at-Commit，就是说，在事务提交的时候，和这个事务相关的REDO LOG 数据，包括COMMIT 记录，都必须从LOG BUFFER 中写入REDO LOG 文件，此时事务提交成功的信号才能发送给用户进程。通过这个机制，可以确保哪怕这个已经提交的事务中的部分BUFFER CACHE 还没有被写入数据文件，就发生了实例故障，在做实例恢复的时候，也可以通过REDO LOG 的信息，将不一致的数据前滚。

#### 如何在数据库性能和实例恢复所需要的时间上做出平衡？

既确保数据库性能不会下降，又保证实例恢复的快速，解决这个问题，oracle是通过checkpoint 机制来实现的。

Oracle 数据库中，对BUFFER CAHCE 的修改操作是前台进程完成的，但是前台进程只负责将数据块从数据文件中读到BUFFERCACHE 中，不负责BUFFERCACHE 写入数据文件。BUFFERCACHE 写入数据文件的操作是由后台进程DBWR 来完成的。DBWR 可以根据系统的负载情况以及数据块是否被其他进程使用来将一部分数据块回写到数据文件中。这种机制下，某个数据块被写回文件的时间可能具有一定的随机性的，有些先修改的数据块可能比较晚才被写入数据文件。

而CHECKPOINT 机制就是对这个机制的一个有效的补充，CHECKPOINT 发生的时候，CKPT 进程会要求DBWR 进程将某个SCN 以前的所有被修改的块都被写回数据文件。这样一旦这次CHECKPOINT 完成后，这个SCN 前的所有数据变更都已经存盘，如果之后发生了实例故障，那么做实例恢复的时候，只需要冲这次CHECKPOINT 已经完成后的变化量开始就行了，CHECKPOINT 之前的变化就不需要再去考虑了。

#### 有没有可能数据文件中的变化已经写盘，但是REDO LOG 信息还在LOG BUFFER 中，没有写入REDO LOG 呢?

这里引入一个名词：Write-Ahead-Log，就是日志写入优先。日志写入优先包含两方面的算法:

第一个方面是，当某个BUFFER CACHE 的修改的变化矢量还没有写入REDO LOG 文件之前，这个修改后的BUFFER CACHE 的数据不允许被写入数据文件，这样就确保了再数据文件中不可能包含未在REDO LOG 文件中记录的变化；

第二个方面是，当对某个数据的UNDO 信息的变化矢量没有被写入REDOLOG 之前，这个BUFFERCACHE的修改不能被写入数据文件。






