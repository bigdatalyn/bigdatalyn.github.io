---
layout: post
title: "[原创] Oracle Autonomous Databas "
category: Oracle
tags: Oracle Autonomous Databas
---

* content
{:toc}


[原创]Oracle Autonomous Databas 简单介绍

### Oracle Autonomous Database 

今年oow2017 - Announcing the First Autonomous Database

Autonomous Database 只有在云上才能使用自治数据库功能

可以做到：

* 自动驾驶(User defines policies, database makes them happen)

* 自动保护(Always encrypted, always current on security updates)

* 自动修复(Automatically protects from all failures)

#### 自治数据库库有哪些技术构成

Oracle Autonomous Database 需要如下三个技术组件构成

1. Oracle Database 18c

2. Oracle Cloud infrastructure

3. Oracle Autonomous Database Cloud tooling

所以不是说oracle 18c数据库就是自治数据库。

#### 自治数据库功能有哪些

就像自动驾驶的汽车一样，有下列的自动化功能：

![18c]({{ "/files/Oracle/18c/18c_autonomous_db.png"}})	


另外oow也提到了自治数据仓库云(基于Exadata云)，不需要调优(索引新建，分区表做成)，不需要DBA...

#### 跟AWS Redshift的比较

最大卖点是:oracle的自治数据库不需要调优，不需要管理作业...

如果真是这样，未来DBA何去何从？

~~~ LinHong 2017/10/11 ~~~~
