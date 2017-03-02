---
layout: post
title: "[原创]AIX-临时文件的移动注意点"
category: Unix
tags: AIX Move
---

* content
{:toc}

今天同事问到，在删除某个实例时候提示/tmp文件不够，需要清理下/tmp目录,而不太清楚和确信那些文件可以删除？






生产环境，对于清理文件一般是mv文件或者tar压缩文件，不做rm操作，除非是可以完全确认文件可以删除的情况下才用rm。

那我们想移动文件到其他目录需要确认的事情有哪些事项？

#### 1.查看tmp目录下那几个文件占用空间比较大？（如前10的文件名和大小）

	ls -sR | sort -nr | head -10

	find . -name XXXXX ### 查找文件所在位置


#### 2.想移动的对象文件的owner，大小，什么时候修改的，现在有那些进程在访问使用

	lsuser 文件 ### 查看文件的owner详细信息

	history/last/who 等确认下当前登录用户信息和之前历史操作命令等
	
	root@dbvg001:/tmp#istat  db2p44564578t1_1438712069499141.msg
	Inode 255 on device 10/13       File
	Protection: rw-------   
	Owner: 210820(db2inst7)          Group: 210800(i210800)
	Link count:   1         Length 223904545 bytes

	Last updated:   Wed Aug  5 15:05:48 JST 2015
	Last modified:  Wed Aug  5 15:05:48 JST 2015
	Last accessed:  Sat Feb 25 05:15:17 JST 2017    ## 上面显示上一次修改时间是什么时候

	root@dbvg001:/tmp#du -sm  db2p44564578t1_1438712069499141.msg 
	213.54  db2p44564578t1_1438712069499141.msg     ## 查看文件容量
	root@dbvg001:/tmp#fuser  db2p44564578t1_1438712069499141.msg
	db2p44564578t1_1438712069499141.msg: 
	root@dbvg001:/tmp#fuser  db2p44564578t1_1438712069499141.msg
	db2p44564578t1_1438712069499141.msg:    ## 当前没有进程在访问（执行多次）
	root@dbvg001:/tmp#fuser  db2p44564578t1_1438712069499141.msg
	db2p44564578t1_1438712069499141.msg: 
	root@dbvg001:/tmp#fuser regex1.cache
	regex1.cache:  6160528 8257646    ## 而regex1.cache文件有两个进程在使用访问
	root@dbvg001:/tmp#ps -ef | grep 6160528
	    root  6160528  8257646   0   Dec 23      -  0:00 errpt -c -s1223202516
	    root 35258602 47251578   1 11:16:36  pts/0  0:00 grep 6160528
	root@dbvg001:/tmp# 

综合评估和确认后才能进行mv或者打包压缩操作等

#### 3.进行mv或者tar/ gunzip压缩等







