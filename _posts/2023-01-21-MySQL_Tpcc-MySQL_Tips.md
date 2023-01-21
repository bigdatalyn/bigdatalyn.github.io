---
layout: post
title: "MySQL 8.0 Tpcc-mysql Test Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL 8.0 Tpcc-mysql Test Tips

2022年最后一个工作日，学习下MySQL8.0

用Tpcc-mysql测试下最新版本MySQL8.0.32









### TPCC 指标

对用户，性能是数据库选型时最重要的指标之一。
TPC-C 作为权威的测试基准，是一个能够直观反映软硬件性能的方式。

TPC（事务处理性能协会：Tracsaction Processing Performance Council），是一个大型非盈利的组织。
TPC 主要制定了商务应用标准程序（Benchmark）的标准规范，性能和价格度量，并管理测试结果的发布。
任何厂家或测试者都可以根据规范，执行标准性能测试。

TPC 委员会制定 TPC-C 时，重点考量的是 数据库对新订单的处理能力，以揭示该数据库的商业成本。
```
数据库整体报价 / TPM = 每个订单的数据库成本。
```
这个指标对衡量一款数据库的性价比，具有非常实际的指导作用。

[全球数据库TPCC排名](https://www.tpc.org/tpcc/results/tpcc_results5.asp?print=false&orderby=tpm&sortby=desc)

### Test 

测试环境: 
- Oralce Linux 8.6 / 64bit x86
- Mysql 5.7/MySQL 8.0.32

安装
```
[root@ol8mysql01 tpcc]# cat /etc/redhat-release 
Red Hat Enterprise Linux release 8.6 (Ootpa)
[root@ol8mysql01 tpcc]# uname -a
Linux ol8mysql01 5.4.17-2136.309.4.el8uek.x86_64 #2 SMP Tue Jun 28 17:33:01 PDT 2022 x86_64 x86_64 x86_64 GNU/Linux
[root@ol8mysql01 tpcc]# 
```
一些package的安装:
```
# dnf install git -y
# dnf install gcc -y
# dnf install mysql-devel -y
```

git下载Percona tpcc-mysql 
```
$ git clone https://github.com/Percona-Lab/tpcc-mysql.git

[root@ol8mysql01 tpcc-mysql]# ls -tlr
total 40
-rw-r--r-- 1 root root  317 Jan 20 05:56 count.sql
-rw-r--r-- 1 root root 1621 Jan 20 05:56 add_fkey_idx.sql
-rw-r--r-- 1 root root  573 Jan 20 05:56 load.sh
-rw-r--r-- 1 root root  194 Jan 20 05:56 Dockerfile
-rw-r--r-- 1 root root 1079 Jan 20 05:56 load_multi_schema.sh
-rw-r--r-- 1 root root 2302 Jan 20 05:56 README.md
-rw-r--r-- 1 root root 3105 Jan 20 05:56 create_table.sql
drwxr-xr-x 5 root root 4096 Jan 20 05:56 scripts
-rw-r--r-- 1 root root  763 Jan 20 05:56 drop_cons.sql
drwxr-xr-x 2 root root   92 Jan 20 05:56 schema2
drwxr-xr-x 2 root root 4096 Jan 20 05:56 src
[root@ol8mysql01 tpcc-mysql]# 

查看README.md
cd src ; make
```
dbdeployer -> mysql 8.0.32
手动下载 8.0.32 的tar包，并用 dbdeployer 安装 
```
https://dev.mysql.com/downloads/
mysql-8.0.32-linux-glibc2.17-x86_64-minimal.tar.xz

# ls -tlr mysql-8.0.32-linux-glibc2.17-x86_64-minimal.tar.xz 
# mkdir -p /opt/mysql
# dbdeployer --sandbox-binary=/opt/mysql/ unpack mysql-8.0.32-linux-glibc2.17-x86_64-minimal.tar.xz 
# dbdeployer --sandbox-binary=/opt/mysql/ deploy single 8.0.32
# cd sandboxes/
# cd msb_8_0_32/
# ./use

dbdeployer delete rsandbox_8_0_32 --sandbox-home=/home/data -- sandbox-binary=/opt/mysql/;
另外创建示例:(注意端口不要冲突 netstat -atp查看)
# dbdeployer deploy single 8.0.32 --sandbox-binary=/opt/mysql/ --bind-address=0.0.0.0 --port=8032 --remote-access='%' --native-auth-plugin --gtid --my-cnf-options="skip_name_resolve" --pre-grants-sql="create user root@'%' identified with mysql_native_password by 'mysql';grant all on *.* to root@'%' with grant option;flush privileges;"


说明:
 --sandbox-home 数据文件的安装目录
 --sandbox-binary 是安装MySQL的二进制文件程序目录
 --bind-address 4个0代表全部 
 --port 代表MySQL的端口
 --remote-access="%"  账户远程访问的IP，% 为全部
 --db-user 新数据库账户 
 --db-password 数据库密码
 --post-grants-sql  后面执行的数据库授权Sql
 --native-auth-plugin  客户端如SQLLog可以访问MySQL，是在MySQL 8.0.4+ 有效

其他:
--mysql 8.0 创建用户  ./use 进去 修改密码和权限，否则不能修改Authentication plugin 'caching_sha2_password' cannot be loaded:
ALTER user'root'@'localhost' IDENTIFIED  WITH mysql_native_password BY 'msandbox';
create USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'msandbox';

FLUSH PRIVILEGES; 

--再授权
mysql -u root -p -S /tmp/mysql_sandbox8032.sock -- 进入
grant all on *.* to 'root'@'%' WITH GRANT OPTION; 

FLUSH PRIVILEGES; 
如果想在安装的时候就赋予权限，直接使用参数：
--post-grants-sql="grant all on *.* to 'root'@'%' WITH GRANT OPTION "

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

本地root用户登陆
mysql -uroot -pmsandbox -S /tmp/mysql_sandbox8032.sock

dnf instal telnet -y
dnf instal net-tools -y

[root@ol8mysql01 data]# netstat -apn | grep mysql
tcp        0      0 127.0.0.1:8032          0.0.0.0:*               LISTEN      10833/mysqld        
tcp6       0      0 :::18032                :::*                    LISTEN      10833/mysqld        
unix  2      [ ACC ]     STREAM     LISTENING     67539    10833/mysqld         /tmp/mysqlx-18032.sock
unix  2      [ ACC ]     STREAM     LISTENING     67541    10833/mysqld         /tmp/mysql_sandbox8032.sock
[root@ol8mysql01 data]# 

指定host和port链接
远程登录:
# mysql -uroot -h192.168.56.130 -P8032 -p
```

默认权限:

|user name	|password	| privileges|
|:----|:----|:----|
|root@localhost	|msandbox |all on *.* with grant option|
|msandbox@localhost	|msandbox	|all on *.*|
|rsandbox@127.%	|rsandbox	|REPLICATION SLAVE|


创建TPCC测试用户
```
mysql -uroot -S /tmp/mysql_sandbox8032.sock -p

mysql> create user lin@'%' identified with mysql_native_password by 'mysql';
-- mysql> grant all privileges on *.* to 'lin'@'%'identified by 'mysql' with grant option;
mysql> grant all on *.* to 'lin'@'%' with grant option;
mysql> flush privileges;

测试新用户链接:
# mysql -ulin -pmysql -h127.0.0.1 -P8032
-> password: mysql

另外一台链接测试:
# mysql -ulin -pmysql -h192.168.56.130 -P8032
-->OK
```

用 mysqladmin 创建tpcc测试库
```
# find /opt/mysql -name mysqladmin
# /opt/mysql/8.0.32/bin/mysqladmin create tpcc4 -h127.0.0.1 -P8032 -ulin -pmysql

-- 删除是:
/opt/mysql/8.0.32/bin/mysqladmin -h127.0.0.1 -P8032 -ulin -pmysql drop tpcc4

[root@ol8mysql01 msb_8_0_32]# /opt/mysql/8.0.32/bin/mysqladmin create tpcc4 -h127.0.0.1 -P8032 -ulin -pmysql
mysqladmin: [Warning] Using a password on the command line interface can be insecure.
[root@ol8mysql01 msb_8_0_32]# 
```

解决`mysqladmin: [Warning] Using a password on the command...`问题

明文密码文件，生产环境谨慎使用

```
# touch /etc/tpcc.password

[client]
user=lin
password=mysql
port=8032
host=127.0.0.1

# mysql --defaults-extra-file=/etc/tpcc.password
# mysql --defaults-extra-file=/etc/tpcc.password -e"show databases"
# mysql --defaults-extra-file=/etc/tpcc.password -D tpcc4 -e"show tables"
```

对 tpcc 库导入测试表和索引ddl文件
```
# cd tpcc-mysql/
# mysql --defaults-extra-file=/etc/tpcc.password -D tpcc4 < create_table.sql
# mysql --defaults-extra-file=/etc/tpcc.password -D tpcc4 < add_fkey_idx.sql
# mysql --defaults-extra-file=/etc/tpcc.password -D tpcc4 -e"show tables"
```
参考日志:
```
[root@ol8mysql01 tpcc-mysql]# ls -tlr
total 40
-rw-r--r-- 1 root root  317 Jan 20 11:42 count.sql
-rw-r--r-- 1 root root 1621 Jan 20 11:42 add_fkey_idx.sql
-rw-r--r-- 1 root root  573 Jan 20 11:42 load.sh
-rw-r--r-- 1 root root  194 Jan 20 11:42 Dockerfile
-rw-r--r-- 1 root root 1079 Jan 20 11:42 load_multi_schema.sh
-rw-r--r-- 1 root root 2302 Jan 20 11:42 README.md
-rw-r--r-- 1 root root 3105 Jan 20 11:42 create_table.sql
drwxr-xr-x 5 root root 4096 Jan 20 11:42 scripts
-rw-r--r-- 1 root root  763 Jan 20 11:42 drop_cons.sql
drwxr-xr-x 2 root root   92 Jan 20 11:42 schema2
drwxr-xr-x 2 root root 4096 Jan 20 11:42 src
[root@ol8mysql01 tpcc-mysql]# 
[root@ol8mysql01 tpcc-mysql]# 
[root@ol8mysql01 tpcc-mysql]# mysql --defaults-extra-file=/etc/tpcc.password -D tpcc4 < create_table.sql
[root@ol8mysql01 tpcc-mysql]# mysql --defaults-extra-file=/etc/tpcc.password -D tpcc4 < add_fkey_idx.sql
[root@ol8mysql01 tpcc-mysql]# mysql --defaults-extra-file=/etc/tpcc.password -D tpcc4 -e"show tables"
+----------------+
| Tables_in_tpcc |
+----------------+
| customer       |
| district       |
| history        |
| item           |
| new_orders     |
| order_line     |
| orders         |
| stock          |
| warehouse      |
+----------------+
[root@ol8mysql01 tpcc-mysql]# 
```

使用 tpcc_load 工具，为tpcc数据库添加数据(创建4个仓库)
```
./tpcc_load -h127.0.0.1 -dtpcc4 -ulin -pmysql -P8032 -w 4

4个w 不到380MB
[root@ol8mysql01 msb_8_0_32]# ./use < ~/db_size.sql | grep tpcc4
tpcc4	379.74263287
[root@ol8mysql01 msb_8_0_32]# 

测试之前习惯采集下统计信息:

analyze table customer  ;
analyze table district  ;
analyze table history   ;
analyze table item      ;
analyze table new_orders;
analyze table order_line;
analyze table orders    ;
analyze table stock     ;
analyze table warehouse ;

查看下数量:
select (select count(*) from customer) as customer_cnt,
       (select count(*) from district) as district_cnt,
       (select count(*) from history) as history_cnt,
       (select count(*) from item) as item_cnt,
       (select count(*) from new_orders) as new_orders_cnt,
       (select count(*) from orders) as orders_cnt,
       (select count(*) from stock) as stock_cnt,
       (select count(*) from warehouse) as warehouse_cnt;

+--------------+--------------+-------------+----------+----------------+------------+-----------+---------------+
| customer_cnt | district_cnt | history_cnt | item_cnt | new_orders_cnt | orders_cnt | stock_cnt | warehouse_cnt |
+--------------+--------------+-------------+----------+----------------+------------+-----------+---------------+
|       120000 |           40 |      135757 |   100000 |          35913 |     135612 |    400000 |             4 |
+--------------+--------------+-------------+----------+----------------+------------+-----------+---------------+
```

使用 tpcc_start 工具开启一个测试案例
```
./tpcc_start -h127.0.0.1 -dtpcc4 -ulin -pmysql -P8032 -w4 -c8 -r60 -l300 -f tpcc4_c8_r60_l300.log

nohup /root/tpcc-mysql/tpcc_start -h127.0.0.1 -dtpcc4 -ulin -pmysql -P8032 -w4 -c8 -r60 -l300 -f /tmp/tpcc4_c8_r60_l300.log >> /tmp/tpcc4_c8_r60_l300_exec.log &
```

|参数|说明|
|:---:|:---|
|-w | 指定仓库数量。|
|-c | 指定并发连接数。|
|-r | 指定开始测试前进行 warmup 的时间，进行预热后，测试效果更好。|
|-l | 指定测试持续时间。|
|-i | 指定生成报告间隔时长。| 
|-f | 指定生成的报告文件名。|

测试完成后会输出这五类事务的吞吐量和延迟，而业内关注的 TPC-C 核心性能指标只有两个：

- New-Order 事务的吞吐量（TPM）
- 延迟 
  
```
Throughput，简称 tpmC。
按照 TPC 的定义，流量指标描述了系统在执行 Payment、Order-status、Delivery、Stock-Level 这四种交易时，每分钟处理 New-Order 交易的数量。所有交易的响应时间必须满足 TPC-C 测试规范的要求。
值越大越好！

性价比 Price/Performance，简称 Price/tpmC。即测试系统价格（指在美国的报价）与流量指标的比值。
```

测试过程示例:
```
[root@ol8mysql01 tpcc-mysql]# ./tpcc_start -h127.0.0.1 -dtpcc4 -ulin -pmysql -P8032 -w4 -c8 -r60 -l300 -f tpcc4_c8_r60_l300.log
***************************************
*** ###easy### TPC-C Load Generator ***
***************************************
option h with value '127.0.0.1'
option d with value 'tpcc4'
option u with value 'lin'
option p with value 'mysql'
option P with value '8032'
option w with value '4'
option c with value '8'
option r with value '60'
option l with value '300'
option f with value 'tpcc4_c8_r60_l300.log'
<Parameters>
     [server]: 127.0.0.1
     [port]: 8032
     [DBname]: tpcc4
       [user]: lin
       [pass]: mysql
  [warehouse]: 4
 [connection]: 8
     [rampup]: 60 (sec.)
    [measure]: 300 (sec.)

RAMP-UP TIME.(60 sec.)

MEASURING START.

  10, trx: 380, 95%: 326.659, 99%: 447.298, max_rt: 912.983, 378|431.474, 38|136.792, 37|893.441, 38|898.846
  20, trx: 367, 95%: 359.928, 99%: 452.144, max_rt: 663.462, 367|631.537, 37|95.632, 37|585.436, 37|619.558
  30, trx: 401, 95%: 315.039, 99%: 469.523, max_rt: 538.214, 401|323.949, 39|57.150, 40|644.186, 40|589.552
  40, trx: 459, 95%: 277.904, 99%: 359.067, max_rt: 419.921, 461|253.450, 47|74.056, 47|582.528, 46|573.247
  50, trx: 446, 95%: 292.850, 99%: 378.491, max_rt: 412.226, 441|348.841, 44|52.956, 44|550.907, 44|673.822
  60, trx: 449, 95%: 275.419, 99%: 363.392, max_rt: 391.689, 455|200.588, 45|176.597, 45|484.952, 46|626.965
  70, trx: 445, 95%: 282.602, 99%: 372.869, max_rt: 459.669, 444|226.580, 44|79.902, 45|526.857, 44|664.918
  80, trx: 408, 95%: 338.100, 99%: 451.468, max_rt: 519.288, 409|234.596, 41|116.054, 40|627.100, 41|615.836
  90, trx: 443, 95%: 305.749, 99%: 395.755, max_rt: 496.293, 444|344.455, 45|117.455, 44|549.155, 44|600.967
 100, trx: 463, 95%: 289.884, 99%: 349.732, max_rt: 410.466, 461|346.043, 46|35.758, 47|571.214, 47|587.430
 110, trx: 449, 95%: 291.974, 99%: 378.151, max_rt: 467.001, 447|245.339, 44|32.924, 45|568.107, 44|561.120
 120, trx: 479, 95%: 273.202, 99%: 379.853, max_rt: 396.721, 480|227.518, 49|76.205, 47|519.374, 48|629.895
 130, trx: 440, 95%: 302.381, 99%: 373.762, max_rt: 405.496, 443|315.652, 44|46.614, 45|584.394, 45|625.620
 140, trx: 469, 95%: 290.840, 99%: 371.754, max_rt: 432.064, 465|173.082, 46|102.076, 46|617.744, 46|556.688
 150, trx: 458, 95%: 297.088, 99%: 356.710, max_rt: 490.434, 461|341.967, 46|38.368, 46|523.821, 47|524.152
 160, trx: 472, 95%: 260.816, 99%: 365.355, max_rt: 429.693, 467|204.282, 47|89.075, 48|532.817, 46|595.776
 170, trx: 472, 95%: 268.098, 99%: 364.263, max_rt: 395.831, 478|382.126, 47|28.100, 46|546.224, 47|504.664
 180, trx: 461, 95%: 286.091, 99%: 412.569, max_rt: 456.713, 460|320.891, 47|50.124, 47|491.095, 47|623.057
 190, trx: 463, 95%: 279.238, 99%: 353.733, max_rt: 435.633, 459|295.724, 46|31.351, 45|562.387, 46|660.818
 200, trx: 457, 95%: 271.003, 99%: 341.252, max_rt: 414.914, 459|322.760, 45|70.698, 46|585.597, 45|649.812
 210, trx: 462, 95%: 284.043, 99%: 366.890, max_rt: 408.252, 459|369.474, 47|118.770, 46|534.552, 47|620.982
 220, trx: 465, 95%: 282.432, 99%: 350.361, max_rt: 518.752, 465|253.393, 46|39.653, 47|554.809, 47|610.235
 230, trx: 468, 95%: 286.177, 99%: 377.586, max_rt: 520.092, 471|333.626, 48|85.384, 47|561.873, 45|659.959
 240, trx: 452, 95%: 280.663, 99%: 358.423, max_rt: 415.683, 452|447.194, 44|40.662, 46|570.925, 46|633.693
 250, trx: 455, 95%: 273.612, 99%: 371.198, max_rt: 527.456, 453|251.841, 46|64.352, 45|548.680, 45|671.446
 260, trx: 410, 95%: 345.466, 99%: 455.949, max_rt: 691.646, 414|430.797, 41|110.623, 41|726.265, 41|634.562
 270, trx: 389, 95%: 323.642, 99%: 465.186, max_rt: 498.583, 386|337.233, 38|104.495, 39|675.705, 40|625.207
 280, trx: 425, 95%: 298.782, 99%: 431.645, max_rt: 544.427, 424|326.079, 43|79.650, 42|623.872, 42|662.904
 290, trx: 416, 95%: 329.606, 99%: 464.629, max_rt: 552.265, 420|291.760, 42|72.420, 42|625.446, 42|669.188
 300, trx: 419, 95%: 298.961, 99%: 406.927, max_rt: 519.476, 415|407.417, 42|42.067, 41|607.281, 42|627.464

STOPPING THREADS........

<Raw Results>
  [0] sc:0 lt:13242  rt:0  fl:0 avg_rt: 121.1 (5)
  [1] sc:291 lt:12948  rt:0  fl:0 avg_rt: 33.4 (5)
  [2] sc:911 lt:413  rt:0  fl:0 avg_rt: 8.9 (5)
  [3] sc:0 lt:1323  rt:0  fl:0 avg_rt: 306.3 (80)
  [4] sc:0 lt:1325  rt:0  fl:0 avg_rt: 315.8 (20)
 in 300 sec.

<Raw Results2(sum ver.)>
  [0] sc:0  lt:13242  rt:0  fl:0 
  [1] sc:291  lt:12948  rt:0  fl:0 
  [2] sc:911  lt:413  rt:0  fl:0 
  [3] sc:0  lt:1323  rt:0  fl:0 
  [4] sc:0  lt:1325  rt:0  fl:0 

<Constraint Check> (all must be [OK])
 [transaction percentage]
        Payment: 43.47% (>=43.0%) [OK]
   Order-Status: 4.35% (>= 4.0%) [OK]
       Delivery: 4.34% (>= 4.0%) [OK]
    Stock-Level: 4.35% (>= 4.0%) [OK]
 [response time (at least 90% passed)]
      New-Order: 0.00%  [NG] *
        Payment: 2.20%  [NG] *
   Order-Status: 68.81%  [NG] *
       Delivery: 0.00%  [NG] *
    Stock-Level: 0.00%  [NG] *

<TpmC>
                 2648.400 TpmC
[root@ol8mysql01 tpcc-mysql]# 


2648.400 TpmC --每分钟 除60就是tps 
```
观察执行sql:
```
mysql [localhost:8032] {msandbox} ((none)) > show processlist;
+----+-----------------+-----------------+-------+---------+------+----------------------------+------------------------------------------------------------------------------------------------------+
| Id | User            | Host            | db    | Command | Time | State                      | Info                                                                                                 |
+----+-----------------+-----------------+-------+---------+------+----------------------------+------------------------------------------------------------------------------------------------------+
|  5 | event_scheduler | localhost       | NULL  | Daemon  | 7313 | Waiting on empty queue     | NULL                                                                                                 |
| 65 | lin             | 127.0.0.1:48570 | tpcc4 | Execute |    0 | Sending to client          | SELECT s_quantity, s_data, s_dist_01, s_dist_02, s_dist_03, s_dist_04, s_dist_05, s_dist_06, s_dist_ |
| 66 | lin             | 127.0.0.1:48572 | tpcc4 | Query   |    0 | waiting for handler commit | commit                                                                                               |
| 67 | lin             | 127.0.0.1:48574 | tpcc4 | Query   |    0 | waiting for handler commit | commit                                                                                               |
| 68 | lin             | 127.0.0.1:48576 | tpcc4 | Execute |    0 | Sending to client          | INSERT INTO order_line (ol_o_id, ol_d_id, ol_w_id, ol_number, ol_i_id, ol_supply_w_id, ol_quantity,  |
| 69 | lin             | 127.0.0.1:48578 | tpcc4 | Execute |    0 | Sending to client          | SELECT count(*) FROM stock WHERE s_w_id = 2 AND s_i_id = 53250 AND s_quantity < 19                   |
| 70 | lin             | 127.0.0.1:48580 | tpcc4 | Execute |    0 | Sending to client          | INSERT INTO order_line (ol_o_id, ol_d_id, ol_w_id, ol_number, ol_i_id, ol_supply_w_id, ol_quantity,  |
| 71 | lin             | 127.0.0.1:48582 | tpcc4 | Execute |    0 | updating                   | UPDATE district SET d_ytd = d_ytd + 4966 WHERE d_w_id = 3 AND d_id = 5                               |
| 72 | lin             | 127.0.0.1:48584 | tpcc4 | Execute |    0 | Sending to client          | UPDATE stock SET s_quantity = 52 WHERE s_i_id = 40707 AND s_w_id = 3                                 |
| 73 | msandbox        | localhost       | NULL  | Query   |    0 | init                       | show processlist                                                                                     |
+----+-----------------+-----------------+-------+---------+------+----------------------------+------------------------------------------------------------------------------------------------------+
10 rows in set (0.00 sec)

mysql [localhost:8032] {msandbox} ((none)) > 
```
测试过程日志说明:
```
With the defined interval (-i option), the tool will produce the following output:

  10, trx: 12920, 95%: 9.483, 99%: 18.738, max_rt: 213.169, 12919|98.778, 1292|101.096, 1293|443.955, 1293|670.842
  20, trx: 12666, 95%: 7.074, 99%: 15.578, max_rt: 53.733, 12668|50.420, 1267|35.846, 1266|58.292, 1267|37.421
  30, trx: 13269, 95%: 6.806, 99%: 13.126, max_rt: 41.425, 13267|27.968, 1327|32.242, 1327|40.529, 1327|29.580
  40, trx: 12721, 95%: 7.265, 99%: 15.223, max_rt: 60.368, 12721|42.837, 1271|34.567, 1272|64.284, 1272|22.947
  50, trx: 12573, 95%: 7.185, 99%: 14.624, max_rt: 48.607, 12573|45.345, 1258|41.104, 1258|54.022, 1257|26.626

Where: 
* 10 - the seconds from the start of the benchmark
* trx: 12920 - New Order transactions executed during the gived interval (in this case, for the previous 10 sec). Basically this is the throughput per interval. The more the better
* 95%: 9.483: - The 95% Response time of New Order transactions per given interval. In this case it is 9.483 sec
* 99%: 18.738: - The 99% Response time of New Order transactions per given interval. In this case it is 18.738 sec
* max_rt: 213.169: - The Max Response time of New Order transactions per given interval. In this case it is 213.169 sec
* the rest: `12919|98.778, 1292|101.096, 1293|443.955, 1293|670.842` is throughput and max response time for the other kind of transactions and can be ignored

10, trx: 12920, 95%: 9.483, 99%: 18.738, max_rt: 213.169, 12919|98.778, 1292|101.096, 1293|443.955, 1293|670.842
10 - 从基准测试开始到现在的秒数
trx: 12920 - 在给定的间隔内（在这种情况下,在过去的10秒）内执行的新订单交易. 基本上这是每个间隔的吞吐量. 越多越好
95％：9.483： - 每次给定间隔的新订单交易的95％响应时间. 在这种情况下是9.483秒
99％：18.738： - 每次给定间隔的新订单交易的99％响应时间. 在这种情况下是18.738秒
max_rt：213.169： - 每个给定间隔的新订单交易的最大响应时间. 在这种情况下是213.169秒
其余的：12919 | 98.778,1292 | 101.096,1293 | 443.955,1293 | 670.842是其他类型的事务的吞吐量和最大响应时间,可以忽略
```

用 gnuplot工具对 tpcc4_c8_r60_l300.log 日志文件就行绘图处理，或者导入excel进行统计分析

tpcc-mysql/scripts 目录下有一个`analyze.sh`, 参考写法，输出时间和trx两列

tpcc-mysql/scripts脚本测试
```
[root@ol8mysql01 scripts]# cat ../tpcc-output.log
***************************************
*** ###easy### TPC-C Load Generator ***
***************************************
option h with value '127.0.0.1'
option d with value 'tpcc4'
option u with value 'lin'
option p with value 'mysql'
option P with value '8032'
option w with value '4'
option c with value '8'
option r with value '60'
option l with value '300'
option f with value 'tpcc4_c8_r60_l300.log'
<Parameters>
     [server]: 127.0.0.1
     [port]: 8032
     [DBname]: tpcc4
       [user]: lin
       [pass]: mysql
  [warehouse]: 4
 [connection]: 8
     [rampup]: 60 (sec.)
    [measure]: 300 (sec.)

RAMP-UP TIME.(60 sec.)

MEASURING START.

  10, trx: 380, 95%: 326.659, 99%: 447.298, max_rt: 912.983, 378|431.474, 38|136.792, 37|893.441, 38|898.846
  20, trx: 367, 95%: 359.928, 99%: 452.144, max_rt: 663.462, 367|631.537, 37|95.632, 37|585.436, 37|619.558
  30, trx: 401, 95%: 315.039, 99%: 469.523, max_rt: 538.214, 401|323.949, 39|57.150, 40|644.186, 40|589.552
  40, trx: 459, 95%: 277.904, 99%: 359.067, max_rt: 419.921, 461|253.450, 47|74.056, 47|582.528, 46|573.247
  50, trx: 446, 95%: 292.850, 99%: 378.491, max_rt: 412.226, 441|348.841, 44|52.956, 44|550.907, 44|673.822
  60, trx: 449, 95%: 275.419, 99%: 363.392, max_rt: 391.689, 455|200.588, 45|176.597, 45|484.952, 46|626.965
  70, trx: 445, 95%: 282.602, 99%: 372.869, max_rt: 459.669, 444|226.580, 44|79.902, 45|526.857, 44|664.918
  80, trx: 408, 95%: 338.100, 99%: 451.468, max_rt: 519.288, 409|234.596, 41|116.054, 40|627.100, 41|615.836
  90, trx: 443, 95%: 305.749, 99%: 395.755, max_rt: 496.293, 444|344.455, 45|117.455, 44|549.155, 44|600.967
 100, trx: 463, 95%: 289.884, 99%: 349.732, max_rt: 410.466, 461|346.043, 46|35.758, 47|571.214, 47|587.430
 110, trx: 449, 95%: 291.974, 99%: 378.151, max_rt: 467.001, 447|245.339, 44|32.924, 45|568.107, 44|561.120
 120, trx: 479, 95%: 273.202, 99%: 379.853, max_rt: 396.721, 480|227.518, 49|76.205, 47|519.374, 48|629.895
 130, trx: 440, 95%: 302.381, 99%: 373.762, max_rt: 405.496, 443|315.652, 44|46.614, 45|584.394, 45|625.620
 140, trx: 469, 95%: 290.840, 99%: 371.754, max_rt: 432.064, 465|173.082, 46|102.076, 46|617.744, 46|556.688
 150, trx: 458, 95%: 297.088, 99%: 356.710, max_rt: 490.434, 461|341.967, 46|38.368, 46|523.821, 47|524.152
 160, trx: 472, 95%: 260.816, 99%: 365.355, max_rt: 429.693, 467|204.282, 47|89.075, 48|532.817, 46|595.776
 170, trx: 472, 95%: 268.098, 99%: 364.263, max_rt: 395.831, 478|382.126, 47|28.100, 46|546.224, 47|504.664
 180, trx: 461, 95%: 286.091, 99%: 412.569, max_rt: 456.713, 460|320.891, 47|50.124, 47|491.095, 47|623.057
 190, trx: 463, 95%: 279.238, 99%: 353.733, max_rt: 435.633, 459|295.724, 46|31.351, 45|562.387, 46|660.818
 200, trx: 457, 95%: 271.003, 99%: 341.252, max_rt: 414.914, 459|322.760, 45|70.698, 46|585.597, 45|649.812
 210, trx: 462, 95%: 284.043, 99%: 366.890, max_rt: 408.252, 459|369.474, 47|118.770, 46|534.552, 47|620.982
 220, trx: 465, 95%: 282.432, 99%: 350.361, max_rt: 518.752, 465|253.393, 46|39.653, 47|554.809, 47|610.235
 230, trx: 468, 95%: 286.177, 99%: 377.586, max_rt: 520.092, 471|333.626, 48|85.384, 47|561.873, 45|659.959
 240, trx: 452, 95%: 280.663, 99%: 358.423, max_rt: 415.683, 452|447.194, 44|40.662, 46|570.925, 46|633.693
 250, trx: 455, 95%: 273.612, 99%: 371.198, max_rt: 527.456, 453|251.841, 46|64.352, 45|548.680, 45|671.446
 260, trx: 410, 95%: 345.466, 99%: 455.949, max_rt: 691.646, 414|430.797, 41|110.623, 41|726.265, 41|634.562
 270, trx: 389, 95%: 323.642, 99%: 465.186, max_rt: 498.583, 386|337.233, 38|104.495, 39|675.705, 40|625.207
 280, trx: 425, 95%: 298.782, 99%: 431.645, max_rt: 544.427, 424|326.079, 43|79.650, 42|623.872, 42|662.904
 290, trx: 416, 95%: 329.606, 99%: 464.629, max_rt: 552.265, 420|291.760, 42|72.420, 42|625.446, 42|669.188
 300, trx: 419, 95%: 298.961, 99%: 406.927, max_rt: 519.476, 415|407.417, 42|42.067, 41|607.281, 42|627.464

STOPPING THREADS........

<Raw Results>
  [0] sc:0 lt:13242  rt:0  fl:0 avg_rt: 121.1 (5)
  [1] sc:291 lt:12948  rt:0  fl:0 avg_rt: 33.4 (5)
  [2] sc:911 lt:413  rt:0  fl:0 avg_rt: 8.9 (5)
  [3] sc:0 lt:1323  rt:0  fl:0 avg_rt: 306.3 (80)
  [4] sc:0 lt:1325  rt:0  fl:0 avg_rt: 315.8 (20)
 in 300 sec.

<Raw Results2(sum ver.)>
  [0] sc:0  lt:13242  rt:0  fl:0 
  [1] sc:291  lt:12948  rt:0  fl:0 
  [2] sc:911  lt:413  rt:0  fl:0 
  [3] sc:0  lt:1323  rt:0  fl:0 
  [4] sc:0  lt:1325  rt:0  fl:0 

<Constraint Check> (all must be [OK])
 [transaction percentage]
        Payment: 43.47% (>=43.0%) [OK]
   Order-Status: 4.35% (>= 4.0%) [OK]
       Delivery: 4.34% (>= 4.0%) [OK]
    Stock-Level: 4.35% (>= 4.0%) [OK]
 [response time (at least 90% passed)]
      New-Order: 0.00%  [NG] *
        Payment: 2.20%  [NG] *
   Order-Status: 68.81%  [NG] *
       Delivery: 0.00%  [NG] *
    Stock-Level: 0.00%  [NG] *

<TpmC>
                 2648.400 TpmC
[root@ol8mysql01 scripts]# sh analyze.sh ../tpcc-output.log
0 326.659000
0 359.928000
0 315.039000
0 277.904000
0 292.850000
0 275.419000
0 282.602000
0 338.100000
0 305.749000
0 289.884000
0 291.974000
0 273.202000
0 302.381000
0 290.840000
0 297.088000
0 260.816000
0 268.098000
0 286.091000
0 279.238000
0 271.003000
0 284.043000
0 282.432000
0 286.177000
0 280.663000
0 273.612000
0 345.466000
0 323.642000
0 298.782000
0 329.606000
0 298.961000
[root@ol8mysql01 scripts]# 
[root@ol8mysql01 scripts]# cat analyze.sh
TIMESLOT=1

if [ -n "$2" ]
then
TIMESLOT=$2
echo "Defined $2"
fi

cat $1 | grep -v HY000 | grep -v payment | grep -v neword | awk -v timeslot=$TIMESLOT ' BEGIN { FS="[,():]"; s=0; cntr=0; aggr=0 } /MEASURING START/ { s=1} /STOPPING THREADS/ {s=0} /0/ { if (s==1) { cntr++; aggr+=$2; } if ( cntr==timeslot ) { printf ("%d %3f\n",aggr,$5) ; cntr=0; aggr=0  }  } '

[root@ol8mysql01 scripts]# pwd
/root/tpcc-mysql/scripts
[root@ol8mysql01 scripts]# 
```

改进:
```
cat tpcc-output.log | grep -v HY000 | grep -v payment | grep -v neword | awk -v timeslot=1 ' BEGIN { FS="[,():]"; s=0; cntr=0 } /MEASURING START/ { s=1} /STOPPING THREADS/ {s=0} /0/ { if (s==1) {
 cntr++; } if ( cntr==timeslot ) { printf ("%d %d\n",$1,$3) ; cntr=0;}}' >> tpcc-graphic-data.txt
```

```
# dnf install -y gnuplot
gnuplot

# vi log.conf
# cat log.conf
set terminal gif small size 800,600 #指定输出成gif图片，且图片大小为600×800
set output "tpcc.gif"   #指定输出gif图片的文件名
set title "MySQL Performance"   #图片标题
set style data lines    #显示网格
set xlabel "Time/s" #X轴标题
set ylabel "Transactions"   #Y轴标题
set grid    #显示网格
plot \
"tpcc-graphic-data.txt" using 1:2 title "Total throughput" with lines #从tpcc-graphic-data.txt文件中读取第一列和第二列作为X轴和Y轴数据，示例名"Total throughput"

# cat log.conf | gnuplot
```

![MySQL_Performance_tpcc4_c8_r60_l300]({{ "/files/MySQL/tpcc-mysql/tpcc4_c8_r60_l300.gif"}})	


修改analyze.sh
```
cat tpcc-output.log | grep -v HY000 | grep -v payment | grep -v neword | awk -v timeslot=1 ' BEGIN { FS="[,():]"; s=0; cntr=0 } /MEASURING START/ { s=1} /STOPPING THREADS/ {s=0} /0/ { if (s==1) {
 cntr++; } if ( cntr==timeslot ) { printf ("'{\'time\':'%d',\'trx\':'%d}\n",$1,$3) ; cntr=0;}}'

{'time':10,'trx':380}
{'time':20,'trx':367}
{'time':30,'trx':401}
{'time':40,'trx':459}
{'time':50,'trx':446}
{'time':60,'trx':449}
{'time':70,'trx':445}
{'time':80,'trx':408}
```


### Referece

Error01:(没有对应的库文件)
```
[root@ol8mysql01 ~]# dbdeployer deploy single 8.0
# 8.0 => 8.0.31
--------------------------------------------------------------------------------
Looking for *linux* binaries
At least one of the following was needed
	lib/libmariadbclient.so (mariadb)
	lib/libperconaserverclient.so (percona)
	lib/libmysqlclient.a (mysql)
	lib/libmysqlclient.so (mysql)
	lib/libmariadbclient.dylib (mariadb)
--------------------------------------------------------------------------------
incorrect tarball detected
[root@ol8mysql01 ~]# 
```
Fix:(手动下载最新tar包)
Ref
```
https://www.percona.com/blog/2018/05/24/using-dbdeployer-to-manage-mysql-percona-server-and-mariadb-sandboxes/

shell> wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz
shell> dbdeployer --sandbox-binary=/opt/mysql/ unpack mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz

This command will extract and move the files to the appropriate directory, which in this case is under /opt/mysql/ as overridden with the --sandbox-binary argument, so we can use them with the deploy command.

dbdeployer --sandbox-binary=/opt/mysql/ deploy single 8.0.11
```

Error02:tpcc-mysql
```
[root@ol8mysql tpcc-mysql]# cd src
[root@ol8mysql src]# make
cc -w -O3 -g -I. `mysql_config --include`  -c load.c
/bin/sh: mysql_config: command not found
load.c:19:10: fatal error: mysql.h: No such file or directory
 #include <mysql.h>
          ^~~~~~~~~
compilation terminated.
make: *** [Makefile:22: load.o] Error 1
[root@ol8mysql src]# 
```

Fix:
```
# dnf install mysql-devel
```

测试过程中通过mysqladmin可以查看TPS等各种执行情况
```
mysqladmin -uroot -h127.0.0.1 -P8032 -p'mysql' extended-status -i1|awk 'BEGIN{local_switch=0}
     $2 ~ /Queries$/            {q=$4-lq;lq=$4;}
     $2 ~ /com_commit$/         {c=$4-lc;lc=$4;}
     $2 ~ /Com_rollback$/       {r=$4-lr;lr=$4;}
     $2 ~ /Com_select$/       {s=$4-ls;ls=$4;}
     $2 ~ /Com_update$/       {u=$4-lu;lu=$4;}
     $2 ~ /Com_insert$/       {i=$4-li;li=$4;}
     $2 ~ /Com_delete$/       {d=$4-ld;ld=$4;}
     $2 ~ /Innodb_rows_read$/       {irr=$4-lirr;lirr=$4;}
     $2 ~ /Innodb_rows_deleted$/       {ird=$4-lird;lird=$4;}
     $2 ~ /Innodb_rows_inserted$/       {iri=$4-liri;liri=$4;}
     $2 ~ /Innodb_rows_updated$/       {iru=$4-liru;liru=$4;}
     $2 ~ /Innodb_buffer_pool_read_requests$/       {ibprr=$4-libprr;libprr=$4;}
     $2 ~ /Innodb_buffer_pool_reads$/       {ibpr=$4-libpr;libpr=$4;}
     $2 ~ /Threads_connected$/  {tc=$4;}
     $2 ~ /Threads_running$/    {tr=$4;
        if(local_switch==0)
                {local_switch=1; count=16}
        else {
                if(count>15) {
                    count=0;
                    print "----------------------------------------------------------------------------------------------------------------------------------------------- ";
                    print "-------- Time -------|  QPS | Commit Rollback TPS | select insert update delete |  read inserted updated deleted | logical physical | Tcon Trun";
                    print "----------------------------------------------------------------------------------------------------------------------------------------------- ";
                }else{
                    count+=1;
                    printf "%s | %-5d| %-6d %-7d %-5d| %-7d %-7d %-5d %-6d| %-7d %-7d %-7d %-7d| %-6d  %-9d| %-4d %-2d \n", strftime("%Y/%m/%d/ %H:%M:%S"),q,c,r,c+r,s,u,i,d,irr,ird,iri,iru,ibprr,ibpr,tc,tr;
                }
        }
}'
```
参考日志:
```
----------------------------------------------------------------------------------------------------------------------------------------------- 
-------- Time -------|  QPS | Commit Rollback TPS | select insert update delete |  read inserted updated deleted | logical physical | Tcon Trun
----------------------------------------------------------------------------------------------------------------------------------------------- 
2023/01/21/ 10:23:00 | 3867 | 0      2       2    | 2354    751     569   46    | 5314    46      569     1176   | 32840   567      | 10   10 
2023/01/21/ 10:23:00 | 3604 | 0      0       0    | 2145    726     551   42    | 4822    42      551     1120   | 29346   502      | 10   10 
2023/01/21/ 10:23:01 | 3957 | 0      0       0    | 2297    827     624   52    | 5020    52      624     1261   | 31946   525      | 10   10 
2023/01/21/ 10:23:03 | 3943 | 0      0       0    | 2361    785     600   46    | 5221    46      599     1182   | 30726   432      | 10   10 
2023/01/21/ 10:23:03 | 3133 | 0      0       0    | 1837    639     504   35    | 3976    35      503     962    | 25953   379      | 10   9  
2023/01/21/ 10:23:04 | 3839 | 0      2       2    | 2350    740     553   43    | 5248    43      555     1111   | 29554   484      | 10   10 
2023/01/21/ 10:23:05 | 2861 | 0      0       0    | 1596    627     493   37    | 3367    36      492     929    | 24766   402      | 10   9  
2023/01/21/ 10:23:06 | 3845 | 0      1       1    | 2301    768     586   44    | 5100    45      587     1178   | 30675   412      | 10   10 
2023/01/21/ 10:23:07 | 3200 | 0      0       0    | 1902    647     476   46    | 4246    36      476     937    | 25403   401      | 10   10 
2023/01/21/ 10:23:08 | 3202 | 0      1       1    | 1919    635     489   35    | 4162    35      489     945    | 25244   523      | 10   10 
2023/01/21/ 10:23:10 | 2792 | 0      0       0    | 1619    580     457   29    | 3588    29      457     806    | 21653   317      | 10   10 
2023/01/21/ 10:23:10 | 2243 | 0      1       1    | 1367    437     328   27    | 2894    26      328     657    | 19043   333      | 10   10 
2023/01/21/ 10:23:11 | 2704 | 0      1       1    | 1533    580     451   33    | 3396    34      451     868    | 22371   299      | 10   10 
2023/01/21/ 10:23:13 | 4060 | 0      1       1    | 2450    799     618   46    | 5352    46      617     1217   | 32240   537      | 10   9  
2023/01/21/ 10:23:13 | 2549 | 0      0       0    | 1441    553     421   30    | 3106    30      422     824    | 20841   301      | 10   10 
2023/01/21/ 10:23:14 | 3313 | 0      0       0    | 2037    632     480   40    | 4616    40      480     1012   | 26784   532      | 10   10 
----------------------------------------------------------------------------------------------------------------------------------------------- 
```

参考:

[TPCC-MySQL](https://github.com/Percona-Lab/tpcc-mysql)

[gnuplot](http://www.gnuplot.info)

[gnuplot画图](https://www.cnblogs.com/xiaocai-ios/p/7779804.html)

[使用gnuplot对tpcc-mysql压测结果生成图表](https://www.cnblogs.com/lizhi221/p/6814025.html)

Have a good work&life! 2023/01 via LinHong


