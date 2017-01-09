---
layout: post
title: "[原创]Unix脚本产生随机数"
date:   2016-06-22 13:42:00
category: Shell
tags: DB2 Unix Shell
---

* content
{:toc}

之前写了在数据库中产生随机数目，如下：
insert into tab01(random_record,checkdate) select int(rand()*100)+1,current timestamp from sysibm.sysdummy1

在shell中产生随机数的方法有哪些呢？






### Unix脚本产生随机数

之前写了在数据库中产生随机数目，如下：

	insert into tab01(random_record,checkdate) select int(rand()*100)+1,current timestamp from sysibm.sysdummy1

然后脚本连接数据库读取这一列，其实在Unix Shell脚本产生随机数方法也有几种，如下：（参考资料来自于互联网）


#### 方法1：时间数产生

* 修改前：第二个数字如096148790，首位为0的话，就会转化为其他进制的数字

	[bigdatalyn@ser1 ~]$ cat 1.sh
	#!/bin/sh
	min=1
	max=100
	num=$(date +%s+%N);
	((ret=num%max+min))
	echo $ret
	[bigdatalyn@ser1 ~]$ 
	[bigdatalyn@ser1 ~]$ sh -x 1.sh
	+ min=1
	+ max=100
	++ date +%s+%N
	+ num=1466659819+096148790
	+ (( ret=num%max+min ))
	1.sh: line 5: ((: 1466659819+096148790: value too great for base (error token is "096148790")
	+ echo

	[bigdatalyn@ser1 ~]$ 
* 修改为：
	[bigdatalyn@ser1 ~]$ cat 1.sh
	#!/bin/sh
	min=1
	max=100
	num=$(date +%s+10#%N);
	((ret=num%max+min))
	echo $ret
	[bigdatalyn@ser1 ~]$ 


#### 方法2：随机变量产生

	[bigdatalyn@ser1 ~]$ echo $RANDOM
	21417
	[bigdatalyn@ser1 ~]$ echo $RANDOM
	15283
	[bigdatalyn@ser1 ~]$ 

* 产生20到30的随机数

	[bigdatalyn@ser1 ~]$  echo $(($(($RANDOM%10))+20)) 
	22
	[bigdatalyn@ser1 ~]$  echo $(($(($RANDOM%10))+20)) 
	21
	[bigdatalyn@ser1 ~]$ 

#### 方法3：系统内部/dev/random,urandom取得

	[bigdatalyn@ser1 ~]$ head -200 /dev/urandom | cksum
	780821577 45498
	[bigdatalyn@ser1 ~]$ head -200 /dev/urandom | cksum | cut -f1 -d" "
	811645629
	[bigdatalyn@ser1 ~]$ head -200 /dev/urandom | cksum | cut -f1 -d" "
	524097684
	[bigdatalyn@ser1 ~]$ 


#### 方法4：linux的UUID码取得

UUID码全称是通用唯一识别码 (Universally Unique Identifier, UUID),它 是一个软件建构的标准，亦为自由软件基金会 (Open Software Foundation, OSF) 的组织在分布式计算环境 (Distributed Computing Environment, DCE) 领域的一部份。

	[bigdatalyn@ser1 ~]$ cat /proc/sys/kernel/random/uuid
	6fa009d4-d88b-46b6-8e6b-d333dfa176d1
	[bigdatalyn@ser1 ~]$ cat /proc/sys/kernel/random/uuid| cksum | cut -f1 -d" "
	2956972419
	[bigdatalyn@ser1 ~]$ cat /proc/sys/kernel/random/uuid| cksum | cut -f1 -d" "
	2869415216
	[bigdatalyn@ser1 ~]$ cat /proc/sys/kernel/random/uuid| cksum | cut -f1 -d" "
	3053968409
	[bigdatalyn@ser1 ~]$ 




