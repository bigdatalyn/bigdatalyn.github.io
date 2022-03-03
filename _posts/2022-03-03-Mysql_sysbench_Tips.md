---
layout: post
title: "MySQL Study 006 - sysbench tool Tips"
category: MySQL
tags: MySQL sysbench tpcc Tips
---

* content
{:toc}

MySQL Study 006 - sysbench tool Tips

- Install and test
- sysbench test mysql 8.0





### Env

Test Env:
- centos 7.9
- x86_64
- MySQL 8.0.28

```
[root@centos7 ~]# cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
[root@centos7 ~]# uname -a
Linux centos7 3.10.0-1160.el7.x86_64 #1 SMP Mon Oct 19 16:18:59 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
[root@centos7 ~]# mysql -S/tmp/mysql.sock80
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 12
Server version: 8.0.28 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

(root@localhost) [(none)]>\_>
```

### sysbench tool

[akopytov / sysbench](https://github.com/akopytov/sysbench)

[Linux 性能测试工具 sysbench 的安装与简单使用](https://cloud.tencent.com/developer/article/1457323)

sysbench 支持以下几种测试模式
```
1、CPU运算性能
2、内存分配及传输速度
3、磁盘IO性能
4、POSIX线程性能
5、互斥性测试
6、数据库性能(OLTP基准测试)。目前sysbench主要支持 MySQL,PostgreSQL 等几种数据库。
```

### Install


Yum install tips:

```
yum -y install make automake libtool pkgconfig libaio-devel
yum -y install mariadb-devel openssl-devel


curl -s https://packagecloud.io/install/repositories/akopytov/sysbench/script.rpm.sh | bash
yum -y install sysbench
```

Steps:
```
[root@centos7 ~]# curl -s https://packagecloud.io/install/repositories/akopytov/sysbench/script.rpm.sh | bash
Detected operating system as centos/7.
Checking for curl...
Detected curl..
~~~
~~~
~~~
The repository is setup! You can now install packages.
[root@centos7 ~]#
[root@centos7 ~]# which sysbench
/usr/bin/sysbench
[root@centos7 ~]#
[root@centos7 ~]# sysbench --help
```

Source make install tips:

```
[root@centos7 ~]# yum install git -y
[root@centos7 ~]# git clone https://github.com/akopytov/sysbench.git

cd sysbench
./autogen.sh
./configure --with-mysql-includes=/usr/local/mysql80/include/ --with-mysql-libs=/usr/local
make -j 2
make install
echo "export LD_LIBRARY_PATH=/usr/local/mysql56/lib/:$LD_LIBRARY_PATH" >> ~/.bashrc # 添加LD_LIBRARY
source ~/.bashrc
sysbench --version
```

### sysbench Options

```
General options:
  --threads=N                     number of threads to use [1] #创建测试线程的数目。默认为1。  
  --events=N                      limit for total number of events [0]
  --time=N                        limit for total execution time in seconds [10]
  --forced-shutdown=STRING        number of seconds to wait after the --time limit before forcing shutdown, or 'off' to disable [off] #超过max-time强制中断。默认是off。  
  --thread-stack-size=SIZE        size of stack per thread [64K] #每个线程的堆栈大小。默认是32K。  
  --rate=N                        average transactions rate. 0 for unlimited rate [0]
  --report-interval=N             periodically report intermediate statistics with a specified interval in seconds. 0 disables intermediate reports [0]
  --report-checkpoints=[LIST,...] dump full statistics and reset all counters at specified points in time. The argument is a list of comma-separated values representing the amount of time in seconds elapsed from start of test when report checkpoint(s) must be performed. Report checkpoints are off by default. []
  --debug[=on|off]                print more debugging info [off]
  --validate[=on|off]             perform validation checks where possible [off]
  --help[=on|off]                 print help and exit [off]
  --version[=on|off]              print version and exit [off]
  --config-file=FILENAME          File containing command line options
  --tx-rate=N                     deprecated alias for --rate [0]
  --max-requests=N                deprecated alias for --events [0] #请求的最大数目。默认为10000，0代表不限制。  
  --max-time=N                    deprecated alias for --time [0] #最大执行时间，单位是s。默认是0,不限制。  
  --num-threads=N                 deprecated alias for --threads [1]
```

### sysbench samples:

```
sysbench --test=cpu help
sysbench --test=cpu --cpu-max-prime=5000 run

sysbench --test=memory help
sysbench --test=memory --memory-block-size=8k --memory-total-size=1G run

sysbench --test=fileio help
sysbench --test=fileio --num-threads=1 --file-total-size=1G --file-test-mode=rndrw prepare

sysbench --test=threads help
ysbench  --test=threads --num-threads=500 --thread-yields=100 --thread-locks=4 run

sysbench --test=mutex help
sysbench --test=mutex --mutex-num=2048 --mutex-locks=20000 --mutex-loops=5000 run
```


```
sysbench --test=fileio --file-num=4 --file-block-size=16k --file-total-size=1g --file-test-mode=rndrd --file-extra-flags=direct --time=300 --max-requests=0 --threads=4 --report-interval=1 prepare

sysbench --test=fileio \ # File IO测 
--file-num=4 \ # 测 文件数是4个
--file-block-size=8K \ # block size是8K
--file-total-size=1G \ # 4个文件的总大小是1G
--file-test-mode=rndrd \ # 测 方法是 机 
--file-extra-flags=direct \ # direct io   缓存
--max-requests=0 \ # 一共发起多少 求 0表示任意
--time=3600 \ # 测 3600s
--threads=4 \ # 使用4个线程
prepare # run or cleanup # prepare 生成文件
# run 开始测 
# cleanup 删除测 文件
```

Sample:
```
[root@centos7 ~]# sysbench --test=fileio --file-num=4 --file-block-size=16k --file-total-size=1g --file-test-mode=rndrd --file-extra-flags=direct --time=300 --max-requests=0 --threads=4 --report-interval=1 prepare
WARNING: the --test option is deprecated. You can pass a script name or path on the command line without any options.
sysbench 1.0.20 (using bundled LuaJIT 2.1.0-beta2)

4 files, 262144Kb each, 1024Mb total
Creating files for the test...
Extra file open flags: directio
Creating file test_file.0
Creating file test_file.1
Creating file test_file.2
Creating file test_file.3
1073741824 bytes written in 27.85 seconds (36.76 MiB/sec).
[root@centos7 ~]#
-- 随机读
[root@centos7 ~]# sysbench --test=fileio --file-num=4 --file-block-size=16k --file-total-size=1g --file-test-mode=rndrd --file-extra-flags=direct --time=10 --max-requests=0 --threads=4 --report-interval=1 run
WARNING: the --test option is deprecated. You can pass a script name or path on the command line without any options.
sysbench 1.0.20 (using bundled LuaJIT 2.1.0-beta2)

Running the test with following options:
Number of threads: 4
Report intermediate results every 1 second(s)
Initializing random number generator from current time


Extra file open flags: directio
4 files, 256MiB each
1GiB total file size
Block size 16KiB
Number of IO requests: 0
Read/Write ratio for combined random IO test: 1.50
Periodic FSYNC enabled, calling fsync() each 100 requests.
Calling fsync() at the end of test, Enabled.
Using synchronous I/O mode
Doing random read test
Initializing worker threads...

Threads started!

[ 1s ] reads: 28.78 MiB/s writes: 0.00 MiB/s fsyncs: 0.00/s latency (ms,95%): 1.319
[ 2s ] reads: 30.44 MiB/s writes: 0.00 MiB/s fsyncs: 0.00/s latency (ms,95%): 1.343
[ 3s ] reads: 31.54 MiB/s writes: 0.00 MiB/s fsyncs: 0.00/s latency (ms,95%): 1.295
[ 4s ] reads: 30.47 MiB/s writes: 0.00 MiB/s fsyncs: 0.00/s latency (ms,95%): 1.496
[ 5s ] reads: 30.61 MiB/s writes: 0.00 MiB/s fsyncs: 0.00/s latency (ms,95%): 1.367
[ 6s ] reads: 28.79 MiB/s writes: 0.00 MiB/s fsyncs: 0.00/s latency (ms,95%): 1.697
[ 7s ] reads: 30.04 MiB/s writes: 0.00 MiB/s fsyncs: 0.00/s latency (ms,95%): 1.250
[ 8s ] reads: 30.79 MiB/s writes: 0.00 MiB/s fsyncs: 0.00/s latency (ms,95%): 1.295
[ 9s ] reads: 26.37 MiB/s writes: 0.00 MiB/s fsyncs: 0.00/s latency (ms,95%): 1.205
[ 10s ] reads: 30.09 MiB/s writes: 0.00 MiB/s fsyncs: 0.00/s latency (ms,95%): 1.250

File operations:
    reads/s:                      1906.50
    writes/s:                     0.00
    fsyncs/s:                     0.00

Throughput:
    read, MiB/s:                  29.79
    written, MiB/s:               0.00

General statistics:
    total time:                          10.0029s
    total number of events:              19074

Latency (ms):
         min:                                    0.03
         avg:                                    2.08
         max:                                  184.93
         95th percentile:                        1.37
         sum:                                39768.03

Threads fairness:
    events (avg/stddev):           4768.5000/16.89
    execution time (avg/stddev):   9.9420/0.05

[root@centos7 ~]#
```

### sysbench test mysql 8.0

- create sbtest01 database and sbtest_user.

```
mysql> create database sbtest01;
mysql> create user sbtest_user identified by '12345678';
mysql> grant all on sbtest01.* to 'sbtest_user'@'%';
mysql> show grants for sbtest_user;
```

- prepare test data in sbtest01 via sysbench and `/usr/share/sysbench/oltp_read_write.lua`.

Note: prepare/run/cleanup option!

```
sysbench \
--db-driver=mysql \
--mysql-user=sbtest_user \
--mysql_password=12345678 \
--mysql-db=sbtest01 \
--mysql-host=192.168.56.21 \
--mysql-port=3380 \
--tables=4 \
--table-size=10000 \
/usr/share/sysbench/oltp_read_write.lua prepare


sysbench \
--db-driver=mysql \
--mysql-user=sbtest_user \
--mysql_password=12345678 \
--mysql-db=sbtest01 \
--mysql-host=192.168.56.21 \
--mysql-port=3380 \
--tables=4 \
--table-size=10000 \
/usr/share/sysbench/oltp_read_write.lua cleanup


sysbench \
--db-driver=mysql \
--mysql-user=sbtest_user \
--mysql_password=12345678 \
--mysql-db=sbtest01 \
--mysql-host=192.168.56.21 \
--mysql-port=3380 \
--tables=4 \
--table-size=10000 \
--events=0 \
--time=60 \
--threads=4 \
--report-interval=5 \
/usr/share/sysbench/oltp_read_write.lua run


--events=N                      limit for total number of events [0]
--time=N                        limit for total execution time in seconds [10]
--rate=N                        average transactions rate. 0 for unlimited rate [0]
```

- sysbench mysql test sample(prepare/cleanup)
  
```
[root@centos7 ~]# sysbench \
> --db-driver=mysql \
> --mysql-user=sbtest_user \
> --mysql_password=12345678 \
> --mysql-db=sbtest01 \
> --mysql-host=192.168.56.21 \
> --mysql-port=3380 \
> --tables=4 \
> --table-size=10000 \
> /usr/share/sysbench/oltp_read_write.lua prepare
sysbench 1.0.20 (using bundled LuaJIT 2.1.0-beta2)

Creating table 'sbtest1'...
Inserting 10000 records into 'sbtest1'
Creating a secondary index on 'sbtest1'...
Creating table 'sbtest2'...
Inserting 10000 records into 'sbtest2'
Creating a secondary index on 'sbtest2'...
Creating table 'sbtest3'...
Inserting 10000 records into 'sbtest3'
Creating a secondary index on 'sbtest3'...
Creating table 'sbtest4'...
Inserting 10000 records into 'sbtest4'
Creating a secondary index on 'sbtest4'...
[root@centos7 ~]#

[root@centos7 ~]# sysbench \
> --db-driver=mysql \
> --mysql-user=sbtest_user \
> --mysql_password=12345678 \
> --mysql-db=sbtest01 \
> --mysql-host=192.168.56.21 \
> --mysql-port=3380 \
> --tables=4 \
> --table-size=10000 \
> /usr/share/sysbench/oltp_read_write.lua cleanup
sysbench 1.0.20 (using bundled LuaJIT 2.1.0-beta2)

Dropping table 'sbtest1'...
Dropping table 'sbtest2'...
Dropping table 'sbtest3'...
Dropping table 'sbtest4'...
[root@centos7 ~]#
```

- sysbench test data sample

```
(root@localhost) [(none)]>\_> use sbtest01;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
(root@localhost) [sbtest01]>\_> show tables;
+--------------------+
| Tables_in_sbtest01 |
+--------------------+
| sbtest1            |
| sbtest2            |
| sbtest3            |
| sbtest4            |
+--------------------+
4 rows in set (0.00 sec)

(root@localhost) [sbtest01]>\_> show create table sbtest1 \G
*************************** 1. row ***************************
       Table: sbtest1
Create Table: CREATE TABLE `sbtest1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `k` int NOT NULL DEFAULT '0',
  `c` char(120) NOT NULL DEFAULT '',
  `pad` char(60) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `k_1` (`k`)
) ENGINE=InnoDB AUTO_INCREMENT=10001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
1 row in set (0.00 sec)

(root@localhost) [sbtest01]>\_>
(root@localhost) [sbtest01]>\_> select * from sbtest1 limit 1 \G
*************************** 1. row ***************************
 id: 1
  k: 4993
  c: 83868641912-28773972837-60736120486-75162659906-27563526494-20381887404-41576422241-93426793964-56405065102-33518432330
pad: 67847967377-48000963322-62604785301-91415491898-96926520291
1 row in set (0.00 sec)

(root@localhost) [sbtest01]>\_>
```

- sysbench mysql test sample(run)

```
[root@centos7 ~]# sysbench \
> --db-driver=mysql \
> --mysql-user=sbtest_user \
> --mysql_password=12345678 \
> --mysql-db=sbtest01 \
> --mysql-host=192.168.56.21 \
> --mysql-port=3380 \
> --tables=4 \
> --table-size=10000 \
> --events=0 \
> --time=60 \
> --threads=4 \
> --report-interval=5 \
> /usr/share/sysbench/oltp_read_write.lua run
sysbench 1.0.20 (using bundled LuaJIT 2.1.0-beta2)

Running the test with following options:
Number of threads: 4
Report intermediate results every 5 second(s)
Initializing random number generator from current time


Initializing worker threads...

Threads started!

[ 5s ] thds: 4 tps: 148.64 qps: 2984.93 (r/w/o: 2089.91/596.95/298.07) lat (ms,95%): 50.11 err/s: 0.00 reconn/s: 0.00
[ 10s ] thds: 4 tps: 150.29 qps: 3006.34 (r/w/o: 2105.22/600.55/300.57) lat (ms,95%): 50.11 err/s: 0.00 reconn/s: 0.00
[ 15s ] thds: 4 tps: 121.02 qps: 2420.32 (r/w/o: 1693.63/484.66/242.03) lat (ms,95%): 89.16 err/s: 0.00 reconn/s: 0.00
[ 20s ] thds: 4 tps: 141.75 qps: 2833.83 (r/w/o: 1984.92/565.41/283.50) lat (ms,95%): 51.02 err/s: 0.00 reconn/s: 0.00
[ 25s ] thds: 4 tps: 146.47 qps: 2929.68 (r/w/o: 2049.23/587.50/292.95) lat (ms,95%): 51.94 err/s: 0.00 reconn/s: 0.00
[ 30s ] thds: 4 tps: 141.59 qps: 2828.13 (r/w/o: 1980.82/564.35/282.97) lat (ms,95%): 51.02 err/s: 0.00 reconn/s: 0.00
[ 35s ] thds: 4 tps: 138.65 qps: 2775.15 (r/w/o: 1941.87/555.79/277.49) lat (ms,95%): 53.85 err/s: 0.00 reconn/s: 0.00
[ 40s ] thds: 4 tps: 143.83 qps: 2876.95 (r/w/o: 2014.19/575.11/287.66) lat (ms,95%): 51.94 err/s: 0.00 reconn/s: 0.00
[ 45s ] thds: 4 tps: 143.12 qps: 2866.02 (r/w/o: 2006.30/573.48/286.24) lat (ms,95%): 49.21 err/s: 0.00 reconn/s: 0.00
[ 50s ] thds: 4 tps: 129.62 qps: 2590.84 (r/w/o: 1813.90/517.69/259.24) lat (ms,95%): 56.84 err/s: 0.00 reconn/s: 0.00
[ 55s ] thds: 4 tps: 126.49 qps: 2526.05 (r/w/o: 1767.89/505.17/252.99) lat (ms,95%): 58.92 err/s: 0.00 reconn/s: 0.00
[ 60s ] thds: 4 tps: 140.42 qps: 2808.90 (r/w/o: 1965.55/562.50/280.85) lat (ms,95%): 52.89 err/s: 0.00 reconn/s: 0.00
SQL statistics:
    queries performed:
        read:                            117096
        write:                           33456
        other:                           16728
        total:                           167280
    transactions:                        8364   (139.27 per sec.)
    queries:                             167280 (2785.42 per sec.)
    ignored errors:                      0      (0.00 per sec.)
    reconnects:                          0      (0.00 per sec.)

General statistics:
    total time:                          60.0539s
    total number of events:              8364

Latency (ms):
         min:                                    4.58
         avg:                                   28.69
         max:                                  149.94
         95th percentile:                       52.89
         sum:                               239940.24

Threads fairness:
    events (avg/stddev):           2091.0000/15.48
    execution time (avg/stddev):   59.9851/0.03

[root@centos7 ~]#
```

### sysbench tpcc mysql8.0

[Percona-Lab / sysbench-tpcc](https://github.com/Percona-Lab/sysbench-tpcc)

cleanup the above test data.
```
sysbench \
--db-driver=mysql \
--mysql-user=sbtest_user \
--mysql_password=12345678 \
--mysql-db=sbtest01 \
--mysql-host=192.168.56.21 \
--mysql-port=3380 \
--tables=4 \
--table-size=10000 \
/usr/share/sysbench/oltp_read_write.lua cleanup
```


Some commands:
```
sysbench \
--db-driver=mysql \
--mysql-user=sbtest_user \
--mysql_password=12345678 \
--mysql-db=sbtest01 \
--mysql-host=192.168.56.21 \
--mysql-port=3380 \
--tables=2 \
--scale=1 \
--threads=2 \
--time=60 \
--report-interval=1 \
/usr/share/sysbench/tpcc.lua prepare

sysbench \
--db-driver=mysql \
--mysql-user=sbtest_user \
--mysql_password=12345678 \
--mysql-db=sbtest01 \
--mysql-host=192.168.56.21 \
--mysql-port=3380 \
--tables=2 \
--scale=1 \
--threads=2 \
--time=60 \
--report-interval=1 \
/usr/share/sysbench/tpcc.lua cleanup
```

sysbench tpcc prepare sample:

```
[root@centos7 ~]# sysbench \
> --db-driver=mysql \
> --mysql-user=sbtest_user \
> --mysql_password=12345678 \
> --mysql-db=sbtest01 \
> --mysql-host=192.168.56.21 \
> --mysql-port=3380 \
> --tables=2 \
> --scale=1 \
> --threads=2 \
> --time=60 \
> --report-interval=1 \
> /usr/share/sysbench/tpcc.lua prepare
sysbench 1.0.20 (using bundled LuaJIT 2.1.0-beta2)

Initializing worker threads...

Creating tables: 2

Creating tables: 1

Adding indexes 2 ...

Adding indexes 1 ...

Adding FK 2 ...

Adding FK 1 ...

Waiting on tables 30 sec

Waiting on tables 30 sec

loading tables: 1 for warehouse: 1

loading tables: 2 for warehouse: 1

[root@centos7 ~]#
```

TPCC tables

```
(root@localhost) [(none)]>\_> use information_schema;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
(root@localhost) [information_schema]>\_> select concat(round(sum(data_length/1024/1024),2),'MB') as data from tables where table_schema='sbtest01';
+----------+
| data     |
+----------+
| 176.00MB |
+----------+
1 row in set (0.06 sec)

(root@localhost) [information_schema]>\_> select table_name,concat(round(data_length/1024/1024,2),' MB') as Data_Size from tables where table_schema='sbtest01';
+-------------+-----------+
| TABLE_NAME  | Data_Size |
+-------------+-----------+
| customer1   | 18.55 MB  |
| customer2   | 18.55 MB  |
| district1   | 0.02 MB   |
| district2   | 0.02 MB   |
| history1    | 2.52 MB   |
| history2    | 2.52 MB   |
| item1       | 10.52 MB  |
| item2       | 10.52 MB  |
| new_orders1 | 0.27 MB   |
| new_orders2 | 0.27 MB   |
| order_line1 | 20.55 MB  |
| order_line2 | 19.55 MB  |
| orders1     | 1.52 MB   |
| orders2     | 1.52 MB   |
| stock1      | 34.56 MB  |
| stock2      | 34.56 MB  |
| warehouse1  | 0.02 MB   |
| warehouse2  | 0.02 MB   |
+-------------+-----------+
18 rows in set (0.00 sec)

(root@localhost) [information_schema]>\_>
```

sysbench tpcc run sample:

```
[root@centos7 ~]# sysbench \
> --db-driver=mysql \
> --mysql-user=sbtest_user \
> --mysql_password=12345678 \
> --mysql-db=sbtest01 \
> --mysql-host=192.168.56.21 \
> --mysql-port=3380 \
> --tables=2 \
> --scale=1 \
> --threads=2 \
> --time=60 \
> --report-interval=1 \
> /usr/share/sysbench/tpcc.lua run
sysbench 1.0.20 (using bundled LuaJIT 2.1.0-beta2)

Running the test with following options:
Number of threads: 2
Report intermediate results every 1 second(s)
Initializing random number generator from current time


Initializing worker threads...

Threads started!

[ 1s ] thds: 2 tps: 20.94 qps: 640.03 (r/w/o: 282.13/308.05/49.85) lat (ms,95%): 193.38 err/s 0.00 reconn/s: 0.00
[ 2s ] thds: 2 tps: 16.97 qps: 509.98 (r/w/o: 231.54/244.51/33.93) lat (ms,95%): 189.93 err/s 0.00 reconn/s: 0.00
[ 3s ] thds: 2 tps: 11.02 qps: 419.67 (r/w/o: 197.31/200.32/22.04) lat (ms,95%): 450.77 err/s 0.00 reconn/s: 0.00
[ 4s ] thds: 2 tps: 22.01 qps: 816.33 (r/w/o: 377.15/396.16/43.02) lat (ms,95%): 248.83 err/s 0.00 reconn/s: 0.00
[ 5s ] thds: 2 tps: 16.01 qps: 369.26 (r/w/o: 168.12/169.12/32.02) lat (ms,95%): 344.08 err/s 0.00 reconn/s: 0.00
[ 6s ] thds: 2 tps: 24.98 qps: 495.60 (r/w/o: 214.83/229.82/50.96) lat (ms,95%): 257.95 err/s 0.00 reconn/s: 0.00
[ 7s ] thds: 2 tps: 17.00 qps: 709.84 (r/w/o: 327.93/347.92/33.99) lat (ms,95%): 244.38 err/s 0.00 reconn/s: 0.00
[ 8s ] thds: 2 tps: 20.02 qps: 502.58 (r/w/o: 229.27/233.27/40.05) lat (ms,95%): 292.60 err/s 0.00 reconn/s: 0.00
[ 9s ] thds: 2 tps: 20.00 qps: 455.90 (r/w/o: 197.96/217.95/39.99) lat (ms,95%): 253.35 err/s 0.00 reconn/s: 0.00
[ 10s ] thds: 2 tps: 20.00 qps: 520.91 (r/w/o: 234.96/245.96/39.99) lat (ms,95%): 200.47 err/s 0.00 reconn/s: 0.00
[ 11s ] thds: 2 tps: 19.99 qps: 672.72 (r/w/o: 312.87/319.87/39.98) lat (ms,95%): 231.53 err/s 0.00 reconn/s: 0.00
[ 12s ] thds: 2 tps: 17.02 qps: 445.41 (r/w/o: 201.18/210.19/34.03) lat (ms,95%): 204.11 err/s 0.00 reconn/s: 0.00
[ 13s ] thds: 2 tps: 23.99 qps: 627.82 (r/w/o: 291.92/287.92/47.99) lat (ms,95%): 196.89 err/s 0.00 reconn/s: 0.00
[ 14s ] thds: 2 tps: 25.00 qps: 570.97 (r/w/o: 264.99/255.99/50.00) lat (ms,95%): 215.44 err/s 0.00 reconn/s: 0.00
[ 15s ] thds: 2 tps: 25.00 qps: 674.03 (r/w/o: 308.02/316.02/50.00) lat (ms,95%): 262.64 err/s 0.00 reconn/s: 0.00
[ 16s ] thds: 2 tps: 21.00 qps: 624.91 (r/w/o: 284.96/297.96/41.99) lat (ms,95%): 244.38 err/s 1.00 reconn/s: 0.00
[ 17s ] thds: 2 tps: 23.00 qps: 507.08 (r/w/o: 225.03/236.04/46.01) lat (ms,95%): 244.38 err/s 0.00 reconn/s: 0.00
[ 18s ] thds: 2 tps: 23.00 qps: 668.05 (r/w/o: 310.03/312.03/46.00) lat (ms,95%): 350.33 err/s 0.00 reconn/s: 0.00
[ 19s ] thds: 2 tps: 28.99 qps: 650.67 (r/w/o: 299.85/292.85/57.97) lat (ms,95%): 248.83 err/s 1.00 reconn/s: 0.00
[ 20s ] thds: 2 tps: 20.00 qps: 666.84 (r/w/o: 302.93/323.92/39.99) lat (ms,95%): 248.83 err/s 0.00 reconn/s: 0.00
[ 21s ] thds: 2 tps: 22.00 qps: 547.01 (r/w/o: 251.00/252.00/44.00) lat (ms,95%): 215.44 err/s 1.00 reconn/s: 0.00
[ 22s ] thds: 2 tps: 25.97 qps: 778.15 (r/w/o: 351.62/374.59/51.94) lat (ms,95%): 211.60 err/s 0.00 reconn/s: 0.00
[ 23s ] thds: 2 tps: 22.04 qps: 506.84 (r/w/o: 231.38/231.38/44.07) lat (ms,95%): 235.74 err/s 0.00 reconn/s: 0.00
[ 24s ] thds: 2 tps: 29.98 qps: 798.38 (r/w/o: 366.71/371.71/59.95) lat (ms,95%): 211.60 err/s 0.00 reconn/s: 0.00
[ 25s ] thds: 2 tps: 24.02 qps: 477.47 (r/w/o: 221.22/208.21/48.05) lat (ms,95%): 344.08 err/s 0.00 reconn/s: 0.00
[ 26s ] thds: 2 tps: 16.99 qps: 637.57 (r/w/o: 295.80/307.79/33.98) lat (ms,95%): 248.83 err/s 0.00 reconn/s: 0.00
[ 27s ] thds: 2 tps: 14.00 qps: 552.99 (r/w/o: 245.99/278.99/28.00) lat (ms,95%): 303.33 err/s 0.00 reconn/s: 0.00
[ 28s ] thds: 2 tps: 14.00 qps: 489.90 (r/w/o: 227.96/233.95/27.99) lat (ms,95%): 287.38 err/s 0.00 reconn/s: 0.00
[ 29s ] thds: 2 tps: 42.02 qps: 1068.53 (r/w/o: 492.24/492.24/84.04) lat (ms,95%): 142.39 err/s 0.00 reconn/s: 0.00
[ 30s ] thds: 2 tps: 24.01 qps: 506.13 (r/w/o: 226.06/232.06/48.01) lat (ms,95%): 200.47 err/s 0.00 reconn/s: 0.00
[ 31s ] thds: 2 tps: 19.99 qps: 514.73 (r/w/o: 229.88/244.87/39.98) lat (ms,95%): 164.45 err/s 0.00 reconn/s: 0.00
[ 32s ] thds: 2 tps: 24.01 qps: 667.17 (r/w/o: 308.08/311.08/48.01) lat (ms,95%): 248.83 err/s 0.00 reconn/s: 0.00
[ 33s ] thds: 2 tps: 19.96 qps: 646.63 (r/w/o: 303.36/303.36/39.92) lat (ms,95%): 207.82 err/s 0.00 reconn/s: 0.00
[ 34s ] thds: 2 tps: 26.07 qps: 854.27 (r/w/o: 391.04/411.09/52.14) lat (ms,95%): 344.08 err/s 0.00 reconn/s: 0.00
[ 35s ] thds: 2 tps: 29.99 qps: 678.77 (r/w/o: 299.90/318.89/59.98) lat (ms,95%): 196.89 err/s 0.00 reconn/s: 0.00
[ 36s ] thds: 2 tps: 15.99 qps: 573.62 (r/w/o: 251.83/289.81/31.98) lat (ms,95%): 390.30 err/s 0.00 reconn/s: 0.00
[ 37s ] thds: 2 tps: 22.02 qps: 673.70 (r/w/o: 311.32/318.33/44.05) lat (ms,95%): 282.25 err/s 0.00 reconn/s: 0.00
[ 38s ] thds: 2 tps: 25.00 qps: 709.08 (r/w/o: 326.04/333.04/50.01) lat (ms,95%): 155.80 err/s 0.00 reconn/s: 0.00
[ 39s ] thds: 2 tps: 21.97 qps: 665.10 (r/w/o: 308.58/312.58/43.94) lat (ms,95%): 158.63 err/s 0.00 reconn/s: 0.00
[ 40s ] thds: 2 tps: 9.99 qps: 425.38 (r/w/o: 190.72/214.68/19.97) lat (ms,95%): 601.29 err/s 0.00 reconn/s: 0.00
[ 41s ] thds: 2 tps: 25.05 qps: 602.09 (r/w/o: 278.50/273.49/50.09) lat (ms,95%): 267.41 err/s 0.00 reconn/s: 0.00
[ 42s ] thds: 2 tps: 29.01 qps: 583.24 (r/w/o: 269.11/256.11/58.02) lat (ms,95%): 189.93 err/s 0.00 reconn/s: 0.00
[ 43s ] thds: 2 tps: 38.01 qps: 1000.35 (r/w/o: 455.16/469.17/76.03) lat (ms,95%): 137.35 err/s 1.00 reconn/s: 0.00
[ 44s ] thds: 2 tps: 21.99 qps: 762.83 (r/w/o: 351.92/366.92/43.99) lat (ms,95%): 204.11 err/s 0.00 reconn/s: 0.00
[ 45s ] thds: 2 tps: 19.00 qps: 457.03 (r/w/o: 209.01/210.01/38.00) lat (ms,95%): 356.70 err/s 0.00 reconn/s: 0.00
[ 46s ] thds: 2 tps: 29.01 qps: 682.21 (r/w/o: 318.10/306.10/58.02) lat (ms,95%): 244.38 err/s 0.00 reconn/s: 0.00
[ 47s ] thds: 2 tps: 8.00 qps: 299.89 (r/w/o: 139.95/143.95/15.99) lat (ms,95%): 434.83 err/s 0.00 reconn/s: 0.00
[ 48s ] thds: 2 tps: 6.99 qps: 275.45 (r/w/o: 121.75/139.72/13.97) lat (ms,95%): 502.20 err/s 0.00 reconn/s: 0.00
[ 49s ] thds: 2 tps: 19.34 qps: 442.87 (r/w/o: 202.56/201.64/38.67) lat (ms,95%): 248.83 err/s 0.92 reconn/s: 0.00
[ 50s ] thds: 2 tps: 5.48 qps: 218.26 (r/w/o: 100.90/106.39/10.97) lat (ms,95%): 646.19 err/s 0.00 reconn/s: 0.00
[ 51s ] thds: 2 tps: 14.96 qps: 344.17 (r/w/o: 156.62/157.62/29.93) lat (ms,95%): 253.35 err/s 0.00 reconn/s: 0.00
[ 52s ] thds: 2 tps: 22.03 qps: 563.66 (r/w/o: 251.29/268.31/44.05) lat (ms,95%): 200.47 err/s 0.00 reconn/s: 0.00
[ 53s ] thds: 2 tps: 15.02 qps: 565.64 (r/w/o: 257.29/278.31/30.03) lat (ms,95%): 344.08 err/s 0.00 reconn/s: 0.00
[ 54s ] thds: 2 tps: 16.00 qps: 523.89 (r/w/o: 244.95/246.95/31.99) lat (ms,95%): 253.35 err/s 0.00 reconn/s: 0.00
[ 55s ] thds: 2 tps: 22.00 qps: 528.92 (r/w/o: 240.96/243.96/43.99) lat (ms,95%): 248.83 err/s 0.00 reconn/s: 0.00
[ 56s ] thds: 2 tps: 19.01 qps: 547.29 (r/w/o: 251.13/258.14/38.02) lat (ms,95%): 337.94 err/s 0.00 reconn/s: 0.00
[ 57s ] thds: 2 tps: 15.97 qps: 668.91 (r/w/o: 307.50/329.46/31.95) lat (ms,95%): 196.89 err/s 0.00 reconn/s: 0.00
[ 58s ] thds: 2 tps: 7.01 qps: 340.53 (r/w/o: 160.25/166.26/14.02) lat (ms,95%): 442.73 err/s 0.00 reconn/s: 0.00
[ 59s ] thds: 2 tps: 15.99 qps: 450.81 (r/w/o: 199.92/218.91/31.99) lat (ms,95%): 493.24 err/s 0.00 reconn/s: 0.00
[ 60s ] thds: 2 tps: 22.99 qps: 617.83 (r/w/o: 280.92/290.92/45.99) lat (ms,95%): 200.47 err/s 0.00 reconn/s: 0.00
SQL statistics:
    queries performed:
        read:                            15903
        write:                           16431
        other:                           2490
        total:                           34824
    transactions:                        1242   (20.67 per sec.)
    queries:                             34824  (579.51 per sec.)
    ignored errors:                      5      (0.08 per sec.)
    reconnects:                          0      (0.00 per sec.)

General statistics:
    total time:                          60.0559s
    total number of events:              1242

Latency (ms):
         min:                                    0.97
         avg:                                   96.69
         max:                                  651.71
         95th percentile:                      282.25
         sum:                               120082.96

Threads fairness:
    events (avg/stddev):           621.0000/9.00
    execution time (avg/stddev):   60.0415/0.01

[root@centos7 ~]#
```


### Reference

[MySQL](https://www.mysql.com/)

[使用sysbench对mysql压力测试](https://developer.aliyun.com/article/47347)

[Percona-Lab/sysbench-tpcc](https://github.com/Percona-Lab/sysbench-tpcc)


Have a good work&life! 2022/03 via LinHong

