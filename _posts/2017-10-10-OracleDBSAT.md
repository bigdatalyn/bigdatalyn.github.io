---
layout: post
title: "[原创]Oracle DBSAT 简单介绍"
category: Oracle
tags: Oracle security Tools
---

* content
{:toc}


[原创]Oracle DBSAT简单介绍

### 什么DBSAT

The Oracle Database Security Assessment Tool (DBSAT) is a command line tool focused on detecting areas of potential security vulnerabilities or misconfigurations and providing recommendations on how to mitigate those potential vulnerabilities. The DBSAT focuses on the database but also examines surrounding database related system components including OS and network (listener). The tool provides a view into the current status, users, roles and policies in place, with the goal of promoting successful approaches to mitigate potential security risks.

The DBSAT has two components: the Collector and the Reporter. The Collector is responsible to collect raw data from the target database by executing SQL queries and OS commands. The Reporter will read the collected data, analyze it and produce reports with the findings. The Reporter outputs three reports in Text, HTML, and XLS formats.


### 怎么使用以及有什么版本限制


参考下面

![DBSAT]({{ "/files/Oracle/DBSTAT/DBSTAT.png"}})


参考文档

[Oracle Database Security Assessment Tool Documentation Release 1.0](http://docs.oracle.com/cd/E76178_01/)



~~~ LinHong 2017/10/10 ~~~~
