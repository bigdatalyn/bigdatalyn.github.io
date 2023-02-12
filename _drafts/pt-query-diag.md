


pt-query-digest

可以用来分析binlog、General log、slowlog，也可以通过show processlist或者通过tcpdump抓取的MySQL协议数据来进行分析



用法：


（1）直接分析slow日志：

 pt-query-digest INDEX01184W-slow.log > slow_report1.log

（2）分析最近12小时内的查询：

pt-query-digest --since=12h INDEX01184W-slow.log > slow_report2.log

（3）分析指定时间范围内的查询：

#pt-query-digest  --since '2017-02-01 09:30:00' --until '2017-03-01 10:00:00' INDEX01184W-slow.log >> slow_report3.log

（4）分析指含有select语句的慢查询

pt-query-digest --filter '$event->{fingerprint} =~ m/^select/i' INDEX01184W-slow.log> slow_report4.log

（5） 针对某个用户的慢查询

pt-query-digest --filter '($event->{user} || "") =~ m/^root/i' INDEX01184W-slow.log> slow_report5.log

（6） 查询所有所有的全表扫描或full join的慢查询

pt-query-digest --filter '(($event->{Full_scan} || "") eq "yes") ||(($event->{Full_join} || "") eq "yes")' INDEX01184W-slow.log> slow_report6.log

（7）把查询保存到query_review表（#默认会创建percona_schema库和query_review表 ）

 pt-query-digest --user=root --password=147258 --review h=localhost INDEX01184W-slow.log 

（8）把查询保存到query_history表

pt-query-digest  --user=root –password=abc123 --review  h=localhost INDEX01184W-slow.log

（9）通过tcpdump抓取mysql的tcp协议数据，然后再分析

tcpdump -s 65535 -x -nn -q -tttt -i any -c 1000 port 3306 > mysql.tcp.txt

pt-query-digest --type tcpdump mysql.tcp.txt> slow_report9.log



(10)分析binlog

mysqlbinlog mysql-bin.000003 > mysql-bin000003.sql

pt-query-digest  --type=binlog  mysql-bin000003.sql > slow_report10.log



(11)分析general log

pt-query-digest  --type=genlog  general.log > slow_report11.log



例：

#查询两条慢SQL:

root@localhost [(none)]>select sleep(3);

+----------+

| sleep(3) |

+----------+

|        0 |

+----------+

1 row in set (3.70 sec)

root@localhost [(none)]>select sleep(4);

+----------+

| sleep(4) |

+----------+

|        0 |

+----------+

1 row in set (4.02 sec)

root@localhost [(none)]>select sleep(8);

+----------+

| sleep(8) |

+----------+

|        0 |

+----------+

1 row in set (8.07 sec)



#查看slow日志，可以发现会记录上面两条SQL:

[root@Darren1 data]# cat slow.log

# Time: 2017-06-02T05:06:04.452125Z

# User@Host: root[root] @ localhost []  Id:  5565

# Query_time: 3.665139  Lock_time: 0.000000 Rows_sent: 1  Rows_examined: 0

SET timestamp=1496379964;

select sleep(3);

# Time: 2017-06-02T05:35:42.145231Z

# User@Host: root[root] @ localhost []  Id:  6454

# Query_time: 4.013508  Lock_time: 0.000000 Rows_sent: 1  Rows_examined: 0

SET timestamp=1496381742;

select sleep(4);

# Time: 2017-06-02T07:29:33.820712Z

# User@Host: root[root] @ localhost []  Id:  9867

# Query_time: 8.032160  Lock_time: 0.000000 Rows_sent: 1  Rows_examined: 0

SET timestamp=1496388573;

select sleep(8);



#使用pt-query-digest分析slow日志文件：

[root@Darren1 data]# pt-query-digest slow.log

# 170ms user time, 70ms system time, 24.36M rss, 204.71M vsz

# Current date: Fri Jun  2 15:30:17 2017

# Hostname: Darren1

# Files: slow.log

# Overall: 3 total, 1 unique, 0.00 QPS, 0.00x concurrency ________________

# Time range: 2017-06-02T05:06:04 to 2017-06-02T07:29:33

# Attribute          total     min     max     avg     95%  stddev  median

# ============     ======= ======= ======= ======= ======= ======= =======

# Exec time            16s      4s      8s      5s      8s      2s      4s

# Lock time              0       0       0       0       0       0       0

# Rows sent              3       1       1       1       1       0       1

# Rows examine           0       0       0       0       0       0       0

# Query size            45      15      15      15      15       0      15



第一部分：

Overall: 总共有多少条查询，上例为总共3个查询

unique: 对SQL进行分类，总的SQL种类,上例为1种

Time range: 查询执行的时间范围

total: 总计   min:最小   max: 最大  avg:平均

95%: 把所有值从小到大排列，位置位于95%的那个数，这个数一般最具有参考价值。

median: 中位数，把所有值从小到大排列，位置位于中间那个数。

# Profile

# Rank Query ID           Response time  Calls R/Call V/M   Item

# ==== ================== ============== ===== ====== ===== ======

#    1 0xF9A57DD5A41825CA 15.7108 100.0%     3 5.2369  0.68 SELECT



第二部分：

对SQL进行分组，然后对各类查询的执行情况进行分析，结果按总执行时长，从大到小排序。

Response: 总的响应时间。

time: 该查询在本次分析中总的时间占比。

calls: 执行次数，即本次分析总共有多少条这种类型的查询语句。

R/Call: 平均每次执行的响应时间。

Item : 查询对象

# Query 1: 0.00 QPS, 0.00x concurrency, ID 0xF9A57DD5A41825CA at byte 409

# This item is included in the report because it matches --limit.

# Scores: V/M = 0.68

# Time range: 2017-06-02T05:06:04 to 2017-06-02T07:29:33

# Attribute    pct   total     min     max     avg     95%  stddev  median

# ============ === ======= ======= ======= ======= ======= ======= =======

# Count        100       3

# Exec time    100     16s      4s      8s      5s      8s      2s      4s

# Lock time      0       0       0       0       0       0       0       0

# Rows sent    100       3       1       1       1       1       0       1

# Rows examine   0       0       0       0       0       0       0       0

# Query size   100      45      15      15      15      15       0      15

# String:

# Hosts        localhost

# Users        root

# Query_time distribution

#   1us

#  10us

# 100us

#   1ms

#  10ms

# 100ms

#    1s  ################################################################

#  10s+

# EXPLAIN /*!50100 PARTITIONS*/

select sleep(8)\G



第三部分：

Databases: 库名

Users: 各个用户执行的次数（占比）

Query_time distribution : 查询时间分布图, 长短体现区间占比，本例中SQL处于1s-10s。

Tables: 查询中涉及到的表

Explain: 示例

#把分析结果记录到表中DSN

[root@Darren1 data]# pt-query-digest --user=root --password=147258 --review h=localhost slow.log 

root@localhost [percona_schema]>select * from percona_schema.query_review\G

......

*************************** 2. row ***************************

   checksum: 17988922643135866314

fingerprint: select sleep(?)

     sample: select sleep(8)

 first_seen: 2017-06-02 05:06:04

  last_seen: 2017-06-02 07:29:33

reviewed_by: NULL

reviewed_on: NULL

   comments: NULL

2 rows in set (0.00 sec)


-----------------------------------
©著作权归作者所有：来自51CTO博客作者Darren_Chen的原创作品，请联系作者获取转载授权，否则将追究法律责任
pt-query-digest
https://blog.51cto.com/darrenmemos/1931782