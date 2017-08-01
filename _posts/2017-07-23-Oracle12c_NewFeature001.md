---
layout: post
title: "[原创]Oracle12c-Study001-Draft"
category: Oracle
tags: Oracle 12c 
---

* content
{:toc}

[原创]	

### Database Release Roadmap

可以看出Oracle12cR2的PremierSupport到2022年3月份

![OracleDatabaseRoadMap]({{ "/files/Oracle/12C/OracleDatabaseReleaseMap.png"}})

### Im Memory

特点如下：

	双格式的数据库

	同一张表可以用行或者列格式

	保证事物一致性，同时一起使用

	分析报表等使用in-memory column format

	OLTP使用 row format

另外12cR2开始，In-Memory可以在ADG的standby使用

### PDB

PDBs从252增长到4096个限制

可以Hot clone方式clone，可以使用PDB refresh增量刷最新数据，也支持relocate方式迁移到不同地方，没有downtime

### Others


待续...





~~ 2017/07/23 bigdata_lyn ~~
