---
layout: post
title: "[原创]DB2 V9.7FP11安装错误"
date:   2016-04-20 10:36:00
category: DB2
tags: DB2 Install Issue
---

* content
{:toc}

测试机从DB2 V9.7FP10升级到DB2 V9.7FP11出现语言包问题




### 现象

安装到37步时候出现如下问题

	./installFixPack -b /opt/IBM/db2/V97 -c /mnt/DB2V9.7FP11/nlpack 

	Task #37 start
	Description: Product Messages - Japanese 
	Estimated time 33 second(s) 

	Enter the location of the CD labeled "" or press enter to accept the default path.
	Volume label DB2_NLPACK_9_7_0_11_AIX
	Type 'a' to abort the installation.
	[/mnt/DB2V9.7FP11/universal/db2/aix/install/../../..]:  

	Error: The required data was not found at the specified path.

检查具体的log内容：

	Command to be run: "/bin/gunzip -c /mnt/DB2V9.7FP11/universal/db2/aix/install/../../../db2/aix/FILES/INFORMIX_DATA_SOURCE_SUPPORT_9.7.0.11_aix64_ppc.tar.gz | (cd /opt/IBM/db2/V97; /bin/tar xvf -)". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	A general error occurred. The return value is "0". 
	ERROR: Installation was cancelled by user when installing the file set 
	"DB2_PRODUCT_MESSAGES_JP_9.7.0.11_aix64_ppc". 


### 问题调查

很明显是安装的日语语言包出问题

DB2_PRODUCT_MESSAGES_JP_9.7.0.11_aix64_ppc

原因是使用了旧的语言包

### 对策

通过如下web下载对应平台下载对应的语言包

[语言包](http://www-933.ibm.com/support/fixcentral/)

而这次对应的DB2V9.7FP11的语言包如下link：

[DB2V9.7FP11的语言包](ttp://www-933.ibm.com/support/fixcentral/swg/selectFix?source=dbluesearch&product=ibm%2FInformation+Management%2FDB2&release=9.7.*&platform=AIX+64-bit,+pSeries&searchtype=fix&fixids=*nlpack*FP011&function=fixId&parent=ibm/Information Management) 


下载后重新安装即可



---

