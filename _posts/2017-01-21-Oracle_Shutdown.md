---
layout: post
title: "Oracle - How to shutdown database"
categories: Oracle
tags: Oracle shutdown
---

* content
{:toc}

Oracle 关库步骤

shutdown abort 命令不会导致数据库损坏，只是会丢失一些当前没有存盘的数据。 





当实例再次启动的时候，oracle 会根据redo 日志中的数据重新修改并恢复丢失的数据。但还有一些特殊操作，比如数据文件扩展，位图维护，如果在shutdown abort的时候，可能就会出现不一致，还有可能触发一下bug等。 

#### 1，执行多次checkpoint，触发DBWR刷buffer数据到磁盘，进行数据持久化

	alter system checkpoint;
	alter system checkpoint;
	alter system checkpoint;
	alter system checkpoint;

#### 2，Kill掉远程连接进程(LOCAL=NO)和退出当前多余连接和事务

	oracle    5278  5083  0 07:30 ?        00:00:06 oraclePROD1 (DESCRIPTION=(LOCAL=NO)


`kill 5278` or `kill -9 5278` （kill PID）

#### 3，关库：shu immediate 如果还hang住，则采用shu abort






