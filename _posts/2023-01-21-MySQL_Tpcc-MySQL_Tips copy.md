---
layout: post
title: "MySQL 8.0 Study 001 Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL 8.0 Study 001 Tips

学习系列

- 01. 死锁案例
- 02. 存量直方图导入功能(MySQL 8.0.31 最新小版本)
- 03. 数据库时间与系统时间不一致
- 04. show engine innodb status 查看







### 01. 死锁案例

测试环境:
- Linux 8/64_x86
- MySQL 8.0.32 社区版

隔离级别:默认RR
```
[root@ol8mysql ~]# mysql -ulin -h192.168.56.130 -P8032 -pmysql -e"show global variables like 'transaction_isolation'";
mysql: [Warning] Using a password on the command line interface can be insecure.
+-----------------------+-----------------+
| Variable_name         | Value           |
+-----------------------+-----------------+
| transaction_isolation | REPEATABLE-READ |
+-----------------------+-----------------+
[root@ol8mysql ~]#
```
死锁日志记录
```
mysql> show global variables like 'innodb_print_%';
mysql> set global innodb_print_all_deadlocks=1;
mysql> show global variables like 'innodb_print_%';

+----------------------------+-------+
| Variable_name              | Value |
+----------------------------+-------+
| innodb_print_all_deadlocks | ON    |
| innodb_print_ddl_logs      | OFF   |
+----------------------------+-------+

mysql> show engine innodb status\G
```
测试表:
表 t1 有自增主键id 和 idx_t1_c1 索引
```
# mysql -ulin -h192.168.56.130 -P8032 -pmysql -e"show global variables like 'transaction_isolation'";
+-----------------------+-----------------+
| Variable_name         | Value           |
+-----------------------+-----------------+
| transaction_isolation | REPEATABLE-READ |
+-----------------------+-----------------+
# mysql -ulin -h192.168.56.130 -P8032 -pmysql -D test
mysql> drop table if exists t1;
mysql> create table t1(id int auto_increment primary key,c1 int not null,c2 int not null, key idx_t1_c1(c1));
mysql> insert into t1(c1,c2) values(1,1),(2,2),(3,3),(4,4),(5,5),(6,6);
mysql> select * from t1;
+----+------+------+
| id | c1   | c2   |
+----+------+------+
|  1 |    1 |    1 |
|  2 |    2 |    2 |
|  3 |    3 |    3 |
|  4 |    4 |    4 |
|  5 |    5 |    5 |
|  6 |    6 |    6 |
+----+------+------+
6 rows in set (0.01 sec)

mysql> 
```

Session01:
```
mysql> start transaction;
mysql> select * from t1 where id=1 for update;
--> 执行 Session02:
mysql> delete from t1 where id=1;
```
Session02:
```
mysql> update t1 set c2=1111 where c1=1;
ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
mysql> 
```
Error日志内容记录:
```
TRANSACTION 198858, ACTIVE 8 sec starting index read
mysql tables in use 1, locked 1
LOCK WAIT 3 lock struct(s), heap size 1128, 2 row lock(s)
MySQL thread id 44, OS thread handle 139682026309376, query id 1220707 192.168.56.130 lin updating
update t1 set c2=1111 where c1=1
RECORD LOCKS space id 24 page no 5 n bits 80 index idx_t1_c1 of table `test`.`t1` trx id 198858 lock_mode X
Record lock, heap no 2 PHYSICAL RECORD: n_fields 2; compact format; info bits 0
 0: len 4; hex 80000001; asc     ;;
 1: len 4; hex 80000001; asc     ;;

RECORD LOCKS space id 24 page no 4 n bits 80 index PRIMARY of table `test`.`t1` trx id 198858 lock_mode X locks rec but not gap waiting
Record lock, heap no 2 PHYSICAL RECORD: n_fields 5; compact format; info bits 32
 0: len 4; hex 80000001; asc     ;;
 1: len 6; hex 0000000308c9; asc       ;;
 2: len 7; hex 01000001bc19b7; asc        ;;
 3: len 4; hex 80000001; asc     ;;
 4: len 4; hex 80000001; asc     ;;

TRANSACTION 198857, ACTIVE 21 sec updating or deleting
mysql tables in use 1, locked 1
LOCK WAIT 3 lock struct(s), heap size 1128, 2 row lock(s), undo log entries 1
MySQL thread id 46, OS thread handle 139682407982848, query id 1220708 192.168.56.120 lin updating
delete from t1 where id=1
RECORD LOCKS space id 24 page no 4 n bits 80 index PRIMARY of table `test`.`t1` trx id 198857 lock_mode X locks rec but not gap
Record lock, heap no 2 PHYSICAL RECORD: n_fields 5; compact format; info bits 32
 0: len 4; hex 80000001; asc     ;;
 1: len 6; hex 0000000308c9; asc       ;;
 2: len 7; hex 01000001bc19b7; asc        ;;
 3: len 4; hex 80000001; asc     ;;
 4: len 4; hex 80000001; asc     ;;

RECORD LOCKS space id 24 page no 5 n bits 80 index idx_t1_c1 of table `test`.`t1` trx id 198857 lock_mode X locks rec but not gap waiting
Record lock, heap no 2 PHYSICAL RECORD: n_fields 2; compact format; info bits 0
 0: len 4; hex 80000001; asc     ;;
 1: len 4; hex 80000001; asc     ;;
```

### 02. 存量直方图导入功能(MySQL 8.0.31 最新小版本)

存量直方图数据导入的新语法为：
```
analyze table 表名 update histogram on 列名1（，列名N） using data ‘存量数据’。
```
MySQL把直方图元数据保存在表 information_schema.column_statistics 中：这张表的 histogram 列值即为直方图的详细元数据。
Test:
```
mysql> select count(*) from orders;
+----------+
| count(*) |
+----------+
|   149892 |
+----------+
1 row in set (0.20 sec)

mysql> desc orders;
+--------------+----------+------+-----+---------+-------+
| Field        | Type     | Null | Key | Default | Extra |
+--------------+----------+------+-----+---------+-------+
| o_id         | int      | NO   | PRI | NULL    |       |
| o_d_id       | tinyint  | NO   | PRI | NULL    |       |
| o_w_id       | smallint | NO   | PRI | NULL    |       |
| o_c_id       | int      | YES  |     | NULL    |       |
| o_entry_d    | datetime | YES  |     | NULL    |       |
| o_carrier_id | tinyint  | YES  |     | NULL    |       |
| o_ol_cnt     | tinyint  | YES  |     | NULL    |       |
| o_all_local  | tinyint  | YES  |     | NULL    |       |
+--------------+----------+------+-----+---------+-------+
8 rows in set (0.01 sec)

mysql> select count(distinct o_d_id) from orders;
+------------------------+
| count(distinct o_d_id) |
+------------------------+
|                     10 |
+------------------------+
1 row in set (0.06 sec)

mysql> analyze table orders update histogram on o_d_id with 10 buckets;
+--------------+-----------+----------+---------------------------------------------------+
| Table        | Op        | Msg_type | Msg_text                                          |
+--------------+-----------+----------+---------------------------------------------------+
| tpcc4.orders | histogram | status   | Histogram statistics created for column 'o_d_id'. |
+--------------+-----------+----------+---------------------------------------------------+
1 row in set (0.80 sec)

mysql> select * from information_schema.column_statistics\G
*************************** 1. row ***************************
SCHEMA_NAME: tpcc4
 TABLE_NAME: orders
COLUMN_NAME: o_d_id
  HISTOGRAM: {"buckets": [[1, 0.09951164838683853], [2, 0.19948362821231286], [3, 0.29940223627678597], [4, 0.39954767432551436], [5, 0.49923945240573214], [6, 0.5992381181117071], [7, 0.6993435273396845], [8, 0.7997758386037948], [9, 0.9001614495770288], [10, 1.0]], "data-type": "int", "null-values": 0.0, "collation-id": 8, "last-updated": "2023-01-21 04:58:21.502667", "sampling-rate": 1.0, "histogram-type": "singleton", "number-of-buckets-specified": 10}
1 row in set (0.00 sec)

mysql> 
```

MySQL 8.0.31 最新小版本带来的存量直方图数据导入功能

手动计算编辑直方图数据
前:
```
{"buckets": [[1, 0.09951164838683853], [2, 0.19948362821231286], [3, 0.29940223627678597], [4, 0.39954767432551436], [5, 0.49923945240573214], [6, 0.5992381181117071], [7, 0.6993435273396845], [8, 0.7997758386037948], [9, 0.9001614495770288], [10, 1.0]], "data-type": "int", "null-values": 0.0, "collation-id": 8, "last-updated": "2023-01-21 04:58:21.502667", "sampling-rate": 1.0, "histogram-type": "singleton", "number-of-buckets-specified": 10}
```
后:(修改1的数据)
```
1, 0.09951164838683853
1, 0.01111111111111111
```
```
{"buckets": [[1, 0.01111111111111111], [2, 0.19948362821231286], [3, 0.29940223627678597], [4, 0.39954767432551436], [5, 0.49923945240573214], [6, 0.5992381181117071], [7, 0.6993435273396845], [8, 0.7997758386037948], [9, 0.9001614495770288], [10, 1.0]], "data-type": "int", "null-values": 0.0, "collation-id": 8, "last-updated": "2023-01-21 04:58:21.502667", "sampling-rate": 1.0, "histogram-type": "singleton", "number-of-buckets-specified": 10}
```
修改后直方图数据导入:
```
[root@ol8mysql ~]# cat order_hist_new.txt 
{"buckets": [[1, 0.01111111111111111], [2, 0.19948362821231286], [3, 0.29940223627678597], [4, 0.39954767432551436], [5, 0.49923945240573214], [6, 0.5992381181117071], [7, 0.6993435273396845], [8, 0.7997758386037948], [9, 0.9001614495770288], [10, 1.0]], "data-type": "int", "null-values": 0.0, "collation-id": 8, "last-updated": "2023-01-21 04:58:21.502667", "sampling-rate": 1.0, "histogram-type": "singleton", "number-of-buckets-specified": 10}
[root@ol8mysql ~]# mysql -ulin -h192.168.56.130 -P8032 -pmysql -D tpcc4 -e"analyze table orders update histogram on o_d_id using data '`cat order_hist_new.txt`'";
mysql: [Warning] Using a password on the command line interface can be insecure.
+--------------+-----------+----------+---------------------------------------------------+
| Table        | Op        | Msg_type | Msg_text                                          |
+--------------+-----------+----------+---------------------------------------------------+
| tpcc4.orders | histogram | status   | Histogram statistics created for column 'o_d_id'. |
+--------------+-----------+----------+---------------------------------------------------+
[root@ol8mysql ~]# mysql -ulin -h192.168.56.130 -P8032 -pmysql -D tpcc4 -e"select * from information_schema.column_statistics\G"
mysql: [Warning] Using a password on the command line interface can be insecure.
*************************** 1. row ***************************
SCHEMA_NAME: tpcc4
 TABLE_NAME: orders
COLUMN_NAME: o_d_id
  HISTOGRAM: {"buckets": [[1, 0.01111111111111111], [2, 0.19948362821231289], [3, 0.29940223627678597], [4, 0.3995476743255144], [5, 0.49923945240573214], [6, 0.5992381181117071], [7, 0.6993435273396845], [8, 0.7997758386037948], [9, 0.9001614495770288], [10, 1.0]], "data-type": "int", "null-values": 0.0, "collation-id": 8, "last-updated": "2023-01-21 05:06:51.449067", "sampling-rate": 1.0, "histogram-type": "singleton", "number-of-buckets-specified": 10}
[root@ol8mysql ~]# 
```

### 03. 数据库时间与系统时间不一致

[MySQL时区问题](https://www.jianshu.com/p/3fd13f53238a)
```
mysql时间和本地时间相差13个小时

修改linux的时间 执行tzselect 命令

date命令查看时区什么都是对的但是mysql的时间就是不对

折腾了一个多小时

set global time_zone = '+08:00'; set time_zone = '+08:00'; 这些命令都测试了还是不行

后台打印本地new Date()没有问题是北京时间，肯定问题出在mysql时区设置上。后台进到mysql命令行模式，查看数据库时区：show variables like '%time_zone%';

发现果然是时区问题，设置成了美国那里的时区，OK问题发现。

后来直接修改的/etc/my.cnf的

直接添加重启mysql就可以了

default-time-zone='+08:00'
```
示例步骤
```
首先查看数据库的时间是多少
select now();
select sysdate();

执行上面的两个sql语句，看数据库的时间与电脑的系统时间是否一致
不一致的话，在mysql安装的路径下查找文件【my.cnf】在此文件的末尾加上下面的语句
default-time_zone = '+8:00'    北京时间
default-time_zone = '+9:00'    东京时间

其中的时区与电脑的时区保持一致即可。
在Linux下文件的路径
vi /etc/mysql/my.cnf
操作同样的之后要重启mysql。
```

[技术分享 | MySQL:一文弄懂时区&time_zone](https://www.modb.pro/db/190614)

- 1. NOW() 和 CURTIME() 系统函数的返回值受当前 session 的时区影响
- 2. timestamp 数据类型字段存储的数据受时区影响

```
mysql [localhost:8032] {msandbox} (test) > set time_zone='+08:00';
Query OK, 0 rows affected (0.00 sec)

mysql [localhost:8032] {msandbox} (test) > create table t(ts timestamp, dt datetime);
Query OK, 0 rows affected (0.04 sec)

mysql [localhost:8032] {msandbox} (test) > insert into t values('2023-01-02 16:45:39','2023-01-02 16:45:39');
Query OK, 1 row affected (0.01 sec)

mysql [localhost:8032] {msandbox} (test) > select * from t;
+---------------------+---------------------+
| ts                  | dt                  |
+---------------------+---------------------+
| 2023-01-02 16:45:39 | 2023-01-02 16:45:39 |
+---------------------+---------------------+
1 row in set (0.00 sec)

mysql [localhost:8032] {msandbox} (test) > set time_zone='+00:00';
Query OK, 0 rows affected (0.00 sec)

mysql [localhost:8032] {msandbox} (test) > select * from t;
+---------------------+---------------------+
| ts                  | dt                  |
+---------------------+---------------------+
| 2023-01-02 08:45:39 | 2023-01-02 16:45:39 |
+---------------------+---------------------+
1 row in set (0.00 sec)

mysql [localhost:8032] {msandbox} (test) > 
```
结论:
```
1. MySQL的安装规范中应该设置什么时区？
对于国内的业务了，在 my.cnf 写入 default-time-zone='+08:00'
，其他地区和开发确认取对应时区即可。

为什么不设置为 system
呢？使用系统时间看起来也是个不错的选择，比较省事。不建议的原因有两点：

操作系统的设置可能不归DBA管，万一别人没有设置正确的系统时区呢？把后背交给别人可能会有点发凉；
多了一层系统调用，性能有损耗。

2. JAVA应用读取到的时间和北京时间差了14个小时，为什么？怎么解决？
这通常是 JDBC 参数中没有为连接设置时区属性（用serverTimezone
参数指定），并且MySQL中没有设置全局时区，这样MySQL默认使用的是系统时区，即 CST。这样一来应用与MySQL 建立的连接的session time_zone为CST，前面我们提到 CST 在 RedHat 上是 +08:00 时区，但其实它一共能代表4个时区：
Central Standard Time (USA) UT-6:00 美国标准时间
Central Standard Time (Australia) UT+9:30 澳大利亚标准时间
China Standard Time UT+8:00 中国标准时间
Cuba Standard Time UT-4:00 古巴标准时间

JDBC 在解析 CST 时使用了美国标准时间，这就会导致时区错误。
要解决也简单：一是遵守上面刚说到的规范，对 MySQL 显示地设置'+08:00'时区；二是 JDBC 设置正确的 serverTimezone 。

3. 已经运行一段时间的业务，修改MySQL的时区会影响已经存储的时间类型数据吗？
完全不会，只会影响对 timestamp 数据类型的读取。
这里不得不提一句，为啥要用 timestamp？用 datetime 不香吗，范围更大，存储空间其实差别很小，赶紧加到开发规范中吧。

4. 迁移数据时会有导致时间类型数据时区错误的可能吗？
这个还真有，还是针对 timestamp 数据类型，
比如使用 mysqldump 导出 csv 格式的数据，默认这种导出方式会使用 UTC 时区读取 timestamp 类型数据，
这意味导入时必须手工设置 session.time_zone='+00:00'才能保证时间准确：

--将 test.t 导出成 csv
mysqldump -S /data/mysql/data/3306/mysqld.sock --single-transaction \
--master-data=2 -t -T /data/backup/test3 --fields-terminated-by=',' test t

--查看导出数据
cat /data/backup/test3/t.txt
2021-12-02 08:45:39,2021-12-02 16:45:39

如何避免？mysqldump 也提供了一个参数 --skip-tz-utc，
意思就是导出数据的那个连接不设置 UTC 时区，使用 MySQL 的 global time_zone 系统变量值。

其实 mysqldump 导出 sql 文件时默认也是使用 UTC 时区，并且会在导出的 sql 文件头部带有 session time_zone 信息，
这样可以保证导 SQL 文件导入和导出时使用相同的时区，
从而保证数据的时区正确（而导出的 csv 文件显然不可以携带此信息）。

需要注意的是 --compact参数会去掉 sql 文件的所有头信息，所以一定要记得：
--compact 参数得和 --skip-tz-utc 一起使用。
-- MySQL dump 10.13  Distrib 8.0.18, for linux-glibc2.12 (x86_64)
--
-- Host: 10.186.17.104    Database: sbtest
-- ------------------------------------------------------
...
/*!40103 SET TIME_ZONE='+00:00' */;
...

针对 --where="date(create_time) < date(now())" 这样的归档需求。
mysqldump 如果使用上述条件导出数据，则 date(now()) 结果会 UTC 时区影响，导致导出的数据不满足要求。
也应该使用 --skip-tz-utc 规避。
```

### 04. show engine innodb status 的查看

命令：`show engine innodb status`

条命令非常简单，但是其结果的可读性却比较差。

MySQL 本身有一张表，在元数据字典库里，表名为`innodb_metrics`。

这张表用来记录 InnoDB 表内部的计数器。

MySQL 8.0.32:
```
mysql>  select count(*) as metrics_module_total from information_schema.innodb_metrics;
+----------------------+
| metrics_module_total |
+----------------------+
|                  314 |
+----------------------+

----------------------
BUFFER POOL AND MEMORY
----------------------
Total large memory allocated 0
Dictionary memory allocated 593103
Buffer pool size   8192 -- InnoDB Buffer Pool 大小，以PAGE为单位，一个PAGE默认16KB。
Free buffers       1024 -- FREE 链表的总页数。
Database pages     6830 -- LRU 链表的总页数。

Buffer pool size ：8192是以PAGE为单位的统计，经过换算后 8192*16/1024 刚好是128MB
通过innodb_metrics字典表获取buffer pool size

mysql> select name,concat(truncate(max_count/1024/1024,2),' MB') innodb_buffer_pool_size from information_schema.innodb_metrics where name ='buffer_pool_size';
+------------------+-------------------------+
| name             | innodb_buffer_pool_size |
+------------------+-------------------------+
| buffer_pool_size | 128.00 MB               |
+------------------+-------------------------+

mysql> select name,concat(truncate(max_count/1024/1024,2),' MB') 'databases_pages_size' from information_schema.innodb_metrics where name  = 'buffer_pool_bytes_data';
+------------------------+----------------------+
| name                   | databases_pages_size |
+------------------------+----------------------+
| buffer_pool_bytes_data | 106.71 MB            |
+------------------------+----------------------+

mysql> select name,concat(truncate(max_count*16/1024,2),' MB') 'free buffers size' from information_schema.innodb_metrics where name  ='buffer_pool_pages_free';

+------------------------+-------------------+
| name                   | free buffers size |
+------------------------+-------------------+
| buffer_pool_pages_free | 16.00 MB          |
+------------------------+-------------------+
```

Show engine innodb status 结果相关计数器在表innodb_metrics里默认开启，也即字段status的值为enabled。(74个开启)
```
mysql> select count(*) from information_schema.innodb_metrics where status='enabled';
```
cpu的计数默认没开启
开启这些计数器：通过变量 innodb_monitor_enable 来依次开启。
```
mysql> select name,comment,count,status from information_schema.innodb_metrics where name like 'cpu_%';
+---------------+--------------------------------+-------+----------+
| name          | comment                        | count | status   |
+---------------+--------------------------------+-------+----------+
| cpu_utime_abs | Total CPU user time spent      |     0 | disabled |
| cpu_stime_abs | Total CPU system time spent    |     0 | disabled |
| cpu_utime_pct | Relative CPU user time spent   |     0 | disabled |
| cpu_stime_pct | Relative CPU system time spent |     0 | disabled |
| cpu_n         | Number of cpus                 |     0 | disabled |
+---------------+--------------------------------+-------+----------+


set global innodb_monitor_enable='cpu_n'; -- 总CPU核数。
set global innodb_monitor_enable='cpu_utime_abs'; -- 用户态CPU 总花费时间。
set global innodb_monitor_enable='cpu_stime_abs'; -- 内核态CPU 总花费时间。

select name,max_count,comment, status from information_schema.innodb_metrics where name in ('cpu_n','cpu_utime_abs','cpu_stime_abs');
+---------------+-----------+-----------------------------+---------+
| name          | max_count | comment                     | status  |
+---------------+-----------+-----------------------------+---------+
| cpu_utime_abs |         1 | Total CPU user time spent   | enabled |
| cpu_stime_abs |         1 | Total CPU system time spent | enabled |
| cpu_n         |         1 | Number of cpus              | enabled |
+---------------+-----------+-----------------------------+---------+
```
等需求实现后，就可以随时关闭这些计数器：
```
set global innodb_monitor_disable='cpu_stime_abs';
set global innodb_monitor_disable='cpu_utime_abs';
set global innodb_monitor_disable='cpu_n';
select name,comment,count,status from information_schema.innodb_metrics where name like 'cpu_%';
```

### Referece

参考:

[TPCC-MySQL](https://github.com/Percona-Lab/tpcc-mysql)

[技术分享 | 使用 SQL 语句来简化 show engine innodb status 的结果解读](https://opensource.actionsky.com/20221208-sql/)

Have a good work&life! 2023/01 via LinHong


