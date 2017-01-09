---
layout: post
title: "DB2 数据架构的一些连接和InfoSphere Data Architect的安装及资料"
date:   2016-09-01 11:42:00
category: DB2
tags: DB2 
---

* content
{:toc}

想了解DB2数据架构的一些知识及一些工具，有关资料文档汇总下




![News]({{ "/files/Images/Others/News.jpg"}})

数据架构的一些最佳实践资料及InfoSphere Data Architect的初接触

---

### DB2最佳实践


DB2官方公布了不少最佳实践的系列文章，对于数据架构师来说是个很好的资料来源。

[DB2 最佳实践](http://www.ibm.com/developerworks/cn/data/bestpractices/)

### IAD相关资料文档

[启动并运行 InfoSphere Data Architect](http://www.ibm.com/developerworks/cn/data/library/techarticle/dm-1510-infosphere-data-architect-resources-trs/)

视频学习资源（导入现有数据模型，生成ddl，比较ddl等功能）

[Demo](http://public.dhe.ibm.com/software/dw/demos/ida/IDADemoFeb27.html)



另外安装IAD之后尝试建立现有DB连接，test新建连接碰到：SQL4499N问题问题，描述如下：

	Try the following suggestions to help solve the problem:
	Ensure that the data server has been started.
	Check that the database name used is the actual database name and not an alias name.
	Check that the host is a valid name or IP address, and that the port number is valid for communication with the data server.
	To further diagnose the problem, return to the Properties section and use the Tracing page to enable tracing. Contact the database administrator and provide the trace and other support information available.
	Full message content: [jcc][t4][2043][11550][4.18.60] Exception java.net.ConnectException: Error opening socket to server bigdatalyn.myhost.com/192.168.0.11 on port 60,026 with message: Connection refused: connect.


> 连接问题比较好处理
> 通过：防火墙ping/telnet，端口/etc/services，server名/ip是否正确，DBM中SVCNAME设置,db2set DB2COMM=TCPIP注册变量 等即可排除

另外相关入门文档：

[FREE ebook - Getting Started with InfoSphere Data Architect](https://www.ibm.com/developerworks/community/wikis/home?lang=en#!/wiki/Big%20Data%20University/page/FREE%20ebook%20-%20Getting%20Started%20with%20InfoSphere%20Data%20Architect)


[中文 Inforsphere data architect 快速入门]({{ "/files/IBM_Internal/IAD/InfoSphere_Data_Architect_ZH.pdf"}})

尝试导入现有的DB数据后可以查看数据模型

![ImportDB]({{ "/files/Images/IAD/ImportDB.png"}})

背后有两个连接进来

![ListApplications]({{ "/files/Images/IAD/listapplications.png"}})





