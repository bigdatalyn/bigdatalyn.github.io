---
layout: post
title: "[原创]IBM UCD连接DB2时候碰到的问题"
date:   2016-06-01 11:15:00
description: "

"
category: DB2
excerpt: DB2
code: true
tags: Unix DB2 
---

* content
{:toc}


IBM UCD连接DB2时候碰到的问题




### UCD 通过jdbc连接DB2的问题

#### 1.No route to host.ERRORCODE=-4499, SQLSTATE=08001错误

防火墙问题,service iptables stop（测试环境，所以直接关闭）

#### 2.数据库不是UTF-8

重新创建，并赋予连接id有dbadm权限

http://www.ibm.com/support/knowledgecenter/zh/SS4GSP_6.2.1/com.ibm.udeploy.install.doc/topics/dbinstall_db2.html

db2 grant dbadm on database to user XXXXX

#### 3.db2jcc.jar包连接的话，需要更改为com.ibm.db2.jcc.DB2Jcc
>> 提供 IBM UrbanCode Deploy 用来连接至数据库的 JDBC 驱动程序类。缺省值为 com.ibm.db2.jcc.DB2Driver。
	[root@st ext]# ll
	total 3592
	-rw-------. 1 root root 3670707 Jun 15 16:54 db2jcc.jar
	-rw-------. 1 root root    1015 Jun 15 16:54 db2jcc_license_cu.jar
	[root@st ext]# 

另外测试jar包是否正确，从client段测试连接

	[root@st ext]# /opt/ibm/java-x86_64-71/jre/bin/java -classpath /opt/ibm-ucd-6.2/server/lib/ext/db2jcc.jar com.ibm.db2.jcc.DB2Jcc -url jdbc:db2://XXXXXXXXXXst:50000/UCD -user ucdadmin -password xxxxxxxx


	[jcc][10521][13706]Command : java com.ibm.db2.jcc.DB2Jcc -url jdbc:db2://XXXXXXXXXXst:50000/UCD -user ucdadmin -password ********


	[jcc][10516][13709]Test Connection Successful.

	DB product version = SQL10053
	DB product name = DB2/LINUXX8664
	DB URL = jdbc:db2://XXXXXXXXXXst:50000/UCD
	DB Drivername = IBM DB2 JDBC Universal Driver Architecture
	DB OS Name = Linux
	[root@st ext]#  

	指定数据库所在server XXXXXXXXXXst
	端口号 50000
	连接id ucdadmin
	连接id的密码 xxxxxxxx
	
	classpath jar包所在的绝对路径





[DB2 JDBC Driver Versions and Downloads](http://www-01.ibm.com/support/docview.wss?uid=swg21363866）


[Difference between IBM DB2 JDBC driver files - db2jcc.jar and db2jcc4.jar](http://www-01.ibm.com/support/docview.wss?uid=swg21665324)


	Both of them are DB2 JDBC driver jar files and are Type 4 drivers.
	db2jcc.jar includes functions in the JDBC 3.0 and earlier specifications. If you plan to use those functions, include the db2jcc.jar in the application CLASSPATH.

	db2jcc4.jar includes functions in JDBC 4.0 and later, as well as JDBC 3.0 and earlier specifications. If you plan to use those functions, include the db2jcc4.jar in the application CLASSPATH.



[Starting urbanCode Deploy server results in "java.lang.StackOverflowError"](http://www-01.ibm.com/support/docview.wss?uid=swg21966624)


