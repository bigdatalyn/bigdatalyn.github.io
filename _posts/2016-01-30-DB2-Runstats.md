---
layout: post
title:  "[原创]DB2 Runstat 统计信息脚本命令（Linux）"
date:   2016-01-30 10:14:54
description: "DB2 DBA要经常收集统计信息，有自动配置，也有手动配置，下面是涉及手动收集统计信息的方法的脚本。"
categories: DB2
excerpt: DB2工具
tags: DB2工具 原创
---

* content
{:toc}

DB2日常维护 Runstats脚本命令（Linux）

---

####  su - 到实例

<pre><code class="markdown"><font size="2">/opt/sudo/sudo su - $instance</font></code></pre>

####  runstats 的 tablelist 生成

<pre><code class="markdown"><font size="2">LANG=en_US
cd;pwd
db2 connect to $DB
db2 list tables for all show detail| grep -v "Table/View" | grep -v "\-\-" | grep -v "record(s)" | egrep -v '^$' | grep -v " V " | awk '{ print $2"."$1 }' > ./table.txt</font></code></pre>

####  表和索引进行runstats

<pre><code class="markdown"><font size="2">for TABNAME in `cat ./table.txt`;do db2 runstats on table $TABNAME with distribution and detailed indexes all;done</font></code></pre>


----------------------- EOF ----------------------- 