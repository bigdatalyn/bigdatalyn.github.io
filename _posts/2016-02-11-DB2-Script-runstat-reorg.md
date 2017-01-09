---
layout: post
title: "[原创]DB2 Reorg/Runstat简单脚本"
date:   2016-02-11 11:06:05
description: "对整个数据库的表进行重组和收集最新统计信息的脚本如何编写？可以参考本文提供思路进行修改和应用"
category: DB2
excerpt: DB2 Study
tags: DB2脚本 原创 reorg runstat
---

* content
{:toc}

#### 脚本介绍

对整个数据库的表进行重组和收集最新统计信息的脚本


#### Reorg脚本的生成

	db2 -x "SELECT 'REORG TABLE ' || TRIM(TABSCHEMA) ||'.' || TRIM(TABNAME)||';' FROM SYSCAT.TABLES WHERE TYPE = 'T' AND TABSCHEMA NOT LIKE 'SYS%' ORDER BY TABSCHEMA, TABNAME" > db2_reorg.sql


#### Runstat脚本的生成


	db2 -x "SELECT 'RUNSTATS ON TABLE ' || TRIM(TABSCHEMA) || '.' || TRIM(TABNAME) || ' WITH DISTRIBUTION AND DETAILED INDEXES ALL;' FROM SYSCAT.TABLES WHERE TYPE = 'T' AND TABSCHEMA NOT LIKE 'SYS%' ORDER BY TABSCHEMA, TABNAME" > db2_runstats.sql
	
#### 脚本的执行

	db2 -tvf db2_reorg.sql > db2_reorg.sql.out
	db2 -tvf db2_runstats.sql > db2_runstats.sql.out

#### 脚本的解释

sql语句的执行无非是生成对全部表的reorg 和runstat

	db2inst1:/dbhome/db2inst1$ db2 -x "SELECT 'REORG TABLE ' || TRIM(TABSCHEMA) ||'.' || TRIM(TABNAME)||';' FROM SYSCAT.TABLES > 
	REORG TABLE DB2INST1.ACT; 
	REORG TABLE DB2INST1.ADVISE_INDEX; 
	REORG TABLE DB2INST1.ADVISE_INSTANCE; 
	REORG TABLE DB2INST1.ADVISE_MQT; 
	REORG TABLE DB2INST1.ADVISE_PARTITION; 
	REORG TABLE DB2INST1.ADVISE_TABLE; 
	REORG TABLE DB2INST1.ADVISE_WORKLOAD; 
	REORG TABLE DB2INST1.CL_SCHED; 
	REORG TABLE DB2INST1.DEPARTMENT; 
	REORG TABLE DB2INST1.EMPLOYEE; 
	REORG TABLE DB2INST1.EMPMDC; 
	REORG TABLE DB2INST1.EMPPROJACT; 
	REORG TABLE DB2INST1.EMP_PHOTO; 
	REORG TABLE DB2INST1.EMP_RESUME; 
	REORG TABLE DB2INST1.EXPLAIN_ACTUALS; 
	REORG TABLE DB2INST1.EXPLAIN_ARGUMENT; 
	REORG TABLE DB2INST1.EXPLAIN_DIAGNOSTIC; 
	REORG TABLE DB2INST1.EXPLAIN_DIAGNOSTIC_DATA; 
	REORG TABLE DB2INST1.EXPLAIN_INSTANCE; 
	REORG TABLE DB2INST1.EXPLAIN_OBJECT; 
	REORG TABLE DB2INST1.EXPLAIN_OPERATOR; 
	REORG TABLE DB2INST1.EXPLAIN_PREDICATE; 
	REORG TABLE DB2INST1.EXPLAIN_STATEMENT; 
	REORG TABLE DB2INST1.EXPLAIN_STREAM; 
	REORG TABLE DB2INST1.IN_TRAY; 
	REORG TABLE DB2INST1.OBJECT_METRICS; 
	REORG TABLE DB2INST1.ORG; 
	REORG TABLE DB2INST1.PROJACT; 
	REORG TABLE DB2INST1.PROJECT; 
	REORG TABLE DB2INST1.SALES; 
	REORG TABLE DB2INST1.STAFF; 
	REORG TABLE DB2INST1.STAFFG; 
	db2inst1:/dbhome/db2inst1$ 

	
	
#### 追记

怎样看统计信息相关的信息呢？其实，和统计信息相关的系统表有好几个。简单方法是通过syscat.tables来查看。用以下语句可以看到这张表上一次更新统计信息的时间和上次更新统计信息时，这张表中数据的行数：

	db2 "select substr(tabname,1,50), stats_time, card from siesta.tables where tabname='<tabname>' with ur"

更新统计信息的方法也有很多讲究，上面的方法是比较常用的：
	
	db2 "runstats on table <tabschema>.<tabname> WITH DISTRIBUTION AND DETAILED INDEXES ALL"

如果表的数据很多，则需要通过采样的方法：（如下）
	
	db2 "runstats on table <tabschema>.<tabname> with distribution and detailed indexes all table sample system(<per>)"

	
---



