
### dbdeployer 

```
# wget https://github.com/datacharmer/dbdeployer/releases/download/v1.71.0/dbdeployer-1.71.0.linux.tar.gz
# tar xzvf dbdeployer-1.71.0.linux.tar.gz 
# chmod +x dbdeployer-1.71.0.linux
# mv dbdeployer-1.71.0.linux /usr/local/bin/dbdeployer
# mkdir -p ~/sandboxes/{mysql_package,mysql_base}
# dbdeployer defaults update sandbox-binary $HOME/sandboxes/mysql_base
# dbdeployer defaults show

# scp mysql-commercial-8.0.32-linux-glibc2.12-x86_64.tar.xz ol8mysql:/root

# mkdir /opt/mysql/mysql_ee -p
# dbdeployer --sandbox-binary=/opt/mysql/mysql_ee unpack mysql-commercial-8.0.32-linux-glibc2.12-x86_64.tar.xz
# dbdeployer deploy single 8.0.32 --sandbox-binary=/opt/mysql/mysql_ee  --sandbox-directory=ee_8_0_32 --bind-address=0.0.0.0 --port=8032 --remote-access='%' --native-auth-plugin --gtid --my-cnf-options="skip_name_resolve" --pre-grants-sql="create user lin@'%' identified with mysql_native_password by 'mysql';grant all on *.* to lin@'%' with grant option;flush privileges;"


# mysql -ulin -P8032 -pmysql

Client:

# mysql -ulin -pmysql -hol8mysql01 -P8032 -e "select version()";
```


```
/opt/mysql/mysql_ee/8.0.32/bin/mysql -ulin -P8032 -p

[root@ol8mysql ~]# hostname
ol8mysql
[root@ol8mysql ~]# cat /proc/cpuinfo | grep -i process
processor	: 0
processor	: 1
[root@ol8mysql ~]# free -m
              total        used        free      shared  buff/cache   available
Mem:           1972         663         521          16         787        1145
Swap:          4095           0        4095
[root@ol8mysql ~]# mysql -ulin -hol8mysql -P8032 -pmysql -e "select version();"
mysql: [Warning] Using a password on the command line interface can be insecure.
+-------------------+
| version()         |
+-------------------+
| 8.0.32-commercial |
+-------------------+
[root@ol8mysql ~]# 
```

### sysbench

Create test database:

```
mysql -ulin -pmysql -hol8mysql -P8032 -e "create database if not exists mstest";
```

script:

```
#!/bin/bash
# Ref:https://gitee.com/mo-shan/script/blob/master/sysbench.sh
mysql_conne_route_info=(lin mysql ol8mysql 8032)
threads_num=4
db_name="mstest"
table_num=10
table_size=100000
export PATH="/root/sysbench-master/src:${PATH}"
case ${1} in 
    "--prepare" | "-p")
        sysbench /root/sysbench-master/src/lua/oltp_read_only.lua --mysql-host=${mysql_conne_route_info[2]} \
            --mysql-port=${mysql_conne_route_info[3]} --mysql-db=${db_name} --mysql-user=${mysql_conne_route_info[0]} \
            --mysql-password=${mysql_conne_route_info[1]} --table_size=${table_size} --tables=${table_num} \
            --threads=${threads_num} --events=500000 --report-interval=10 --time=60 prepare
        ;;
    "--cleanup" | "-c")
        sysbench /root/sysbench-master/src/lua/oltp_read_only.lua --mysql-host=${mysql_conne_route_info[2]} \
            --mysql-port=${mysql_conne_route_info[3]} --mysql-db=${db_name} --mysql-user=${mysql_conne_route_info[0]} \
            --mysql-password=${mysql_conne_route_info[1]} --table_size=${table_size} --tables=${table_num} \
            --threads=${threads_num} --events=500000 --report-interval=10 --time=60 cleanup
        ;;
    "--run" | "-r")
        sysbench /root/sysbench-master/src/lua/oltp_update_non_index.lua --mysql-host=${mysql_conne_route_info[2]} \
            --mysql-port=${mysql_conne_route_info[3]} --mysql-db=${db_name} --mysql-user=${mysql_conne_route_info[0]} \
            --mysql-password=${mysql_conne_route_info[1]} --table_size=${table_size} --tables=${table_num} \
            --threads=${threads_num} --events=500000 --report-interval=10 --time=60 run
        ;;
    "--help" | "-h" | *)
        echo -e "\n\t\033[33mUsage: bash ${0} [--prepare|-p|--run|-r|--cleanup|-c|--help|-h]\033[0m\n"
        echo -e "\t\t\033[34m[--prepare|-p] \t\tPrepare test data to MySQL.\033[0m"
        echo -e "\t\t\033[34m[--run|-r]     \t\tStart stress test to MySQL.\033[0m"
        echo -e "\t\t\033[34m[--cleanup|-c] \t\tCleaning up test data from MySQL.\033[0m\n"
        exit 1
        ;;
esac
```

### Test

```
mysql -ulin -pmysql -hol8mysql -P8032 
flush binary logs;
show binary logs;

mysql> show binary logs;
+------------------+-----------+-----------+
| Log_name         | File_size | Encrypted |
+------------------+-----------+-----------+
| mysql-bin.000001 |      8748 | No        |
| mysql-bin.000002 |       220 | No        |
| mysql-bin.000003 | 190916435 | No        |
| mysql-bin.000004 |       197 | No        |
+------------------+-----------+-----------+
4 rows in set (0.01 sec)

mysql>
```

压力测试:

```
[root@ol8mysql01 ~]# bash sysbench.sh -r
sysbench 1.1.0 (using bundled LuaJIT 2.1.0-beta3)

Running the test with following options:
Number of threads: 4
Report intermediate results every 10 second(s)
Initializing random number generator from current time

Initializing worker threads...

Threads started!

[ 10s ] thds: 4 tps: 458.71 qps: 458.71 (r/w/o: 0.00/458.71/0.00) lat (ms,95%): 15.00 err/s: 0.00 reconn/s: 0.00
[ 20s ] thds: 4 tps: 422.69 qps: 422.69 (r/w/o: 0.00/422.69/0.00) lat (ms,95%): 15.83 err/s: 0.00 reconn/s: 0.00
[ 30s ] thds: 4 tps: 402.63 qps: 402.63 (r/w/o: 0.00/402.63/0.00) lat (ms,95%): 16.12 err/s: 0.00 reconn/s: 0.00
[ 40s ] thds: 4 tps: 416.88 qps: 416.88 (r/w/o: 0.00/416.88/0.00) lat (ms,95%): 16.12 err/s: 0.00 reconn/s: 0.00
[ 50s ] thds: 4 tps: 397.71 qps: 397.71 (r/w/o: 0.00/397.71/0.00) lat (ms,95%): 17.01 err/s: 0.00 reconn/s: 0.00
[ 60s ] thds: 4 tps: 423.54 qps: 423.54 (r/w/o: 0.00/423.54/0.00) lat (ms,95%): 15.55 err/s: 0.00 reconn/s: 0.00
SQL statistics:
    queries performed:
        read:                            0
        write:                           25227
        other:                           0
        total:                           25227
    transactions:                        25227  (420.37 per sec.)
    queries:                             25227  (420.37 per sec.)
    ignored errors:                      0      (0.00 per sec.)
    reconnects:                          0      (0.00 per sec.)

Throughput:
    events/s (eps):                      420.3673
    time elapsed:                        60.0118s
    total number of events:              25227

Latency (ms):
         min:                                    3.05
         avg:                                    9.51
         max:                                   32.61
         95th percentile:                       16.12
         sum:                               239892.24

Threads fairness:
    events (avg/stddev):           6306.7500/20.63
    execution time (avg/stddev):   59.9731/0.00

[root@ol8mysql01 ~]# 
```

### analysis_binlog

[analysis_binlog](https://gitee.com/mo-shan/analysis_binlog)

```
git clone https://gitee.com/mo-shan/analysis_binlog.git

bin/analysis_binlog

#将这里的mysqlbinlog_path改成mysqlbinlog工具的绝对路径,否则可能会因版本太低导致错误
(1)更改mysqlbinlog路径
(2)更改analysis_binlog家目录路径

chmod +x bin/analysis_binlog 
echo "export PATH=$(pwd)/bin:${PATH}" >> ${HOME}/.bashrc
```

示例:
```
-bfile: 指定binlog文件, 支持多个文件并行分析, 多个文件用逗号相隔, 需要并行分析时请结合-w参数使用
-w : 指定并行数, 当需要分析多个binlog文件时该参数有效, 默认是1
-t : 指定显示结果的格式/内容, 供选选项有"detail|simple". 当指定detail的时候结果较为详细, 会打印详细的分析过程, 消耗时间也不直观, simple只做了统计工作
-s : 指定排序规则, 供选选项有"insert|update|delete". 默认会把统计结果做一个排序, 按照表的维度统计出insert update delete的次数, 并按照次数大小排序(默认insert)
```



```
[root@ol8mysql01 ~]# mysql -ulin -pmysql -hol8mysql -P8032 -e "show binary logs"
mysql: [Warning] Using a password on the command line interface can be insecure.
+------------------+-----------+-----------+
| Log_name         | File_size | Encrypted |
+------------------+-----------+-----------+
| mysql-bin.000001 |      8748 | No        |
| mysql-bin.000002 |       220 | No        |
| mysql-bin.000003 |         0 | No        |
| mysql-bin.000004 | 190916622 | No        |
| mysql-bin.000004 | 190916622 | No        |
| mysql-bin.000005 |  17275206 | No        |
+------------------+-----------+-----------+

[root@ol8mysql01 ~]# scp ol8mysql:/root/sandboxes/ee_8_0_32/data/mysql-bin.000005 /tmp
root@ol8mysql's password: 
mysql-bin.000005                                                                                                                                                           100%   16MB  64.5MB/s   00:00  
[root@ol8mysql01 ~]# 

analysis_binlog -bfile=/tmp/mysql-bin.000005 -w=2 

# analysis_binlog -bfile=/tmp/mysql-bin.000005 -w=2 

[2023-03-02 14:20:34] [WARN] [192.168.3.110] Version : v_1.3
[2023-03-02 14:20:34] [INFO] [192.168.3.110] THREAD_1:Analysing --> /tmp/mysql-bin.000005
[2023-03-02 14:20:37] [INFO] [192.168.3.110] THREAD_1:Analysis completed --> /tmp/mysql-bin.000005. Analyze the results in this file '/root/analysis_binlog/res/mysql-bin.000005.res'

# # cat /root/analysis_binlog/res/mysql-bin.000005.res 
Table                                             First Time          Last Time           Type      affe(row) Ins(s)    Upd(s)    Del(s)    Total(s)  
mstest.sbtest10                                   230302 13:28:09     230302 13:29:09     DML       0         0         2607      0         2607      
mstest.sbtest4                                    230302 13:28:09     230302 13:29:09     DML       0         0         2589      0         2589      
mstest.sbtest5                                    230302 13:28:09     230302 13:29:09     DML       0         0         2584      0         2584      
mstest.sbtest8                                    230302 13:28:09     230302 13:29:09     DML       0         0         2563      0         2563      
mstest.sbtest1                                    230302 13:28:09     230302 13:29:09     DML       0         0         2539      0         2539      
mstest.sbtest6                                    230302 13:28:09     230302 13:29:09     DML       0         0         2531      0         2531      
mstest.sbtest7                                    230302 13:28:09     230302 13:29:09     DML       0         0         2522      0         2522      
mstest.sbtest2                                    230302 13:28:09     230302 13:29:09     DML       0         0         2512      0         2512      
mstest.sbtest3                                    230302 13:28:09     230302 13:29:09     DML       0         0         2499      0         2499      
mstest.sbtest9                                    230302 13:28:09     230302 13:29:09     DML       0         0         2492      0         2492      

Table                                             First Time          Last Time           Type      affe(row) Ins(s)    Upd(s)    Del(s)    Trans(total)
The total                                         230302 13:28:09     230302 13:29:09     DML       0         0         25438               25438     

Table                                             First Time          Last Time           Type      affe(row) Ins(T)    Upd(T)    Del(T)    Trans(total)
Transaction                                       230302 13:28:09     230302 13:29:09     DML       0         0         25438     0         25438     

# 

#拷贝一份继续解析成sql文件,并行的话 加上-w=2

[root@ol8mysql ~]# analysis_binlog -mpath=/opt/mysql/mysql_ee/8.0.32/bin/mysqlbinlog -bfile=/tmp/mysql-bin.000005 --binlog2sql --save-way=table

[2023-03-02 14:23:53] [WARN] [192.168.3.110] Version : v_1.3
[2023-03-02 14:23:53] [INFO] [192.168.3.110] THREAD_1:Analysing --> /tmp/mysql-bin.000005
[2023-03-02 14:24:01] [INFO] [192.168.3.110] THREAD_1:Analysis completed --> /tmp/mysql-bin.000005

[root@ol8mysql ~]# 
[root@ol8mysql table]# pwd
/root/analysis_binlog/res/table
[root@ol8mysql table]# cd ..
[root@ol8mysql res]# pwd
/root/analysis_binlog/res
[root@ol8mysql res]# ls -tlr
total 16
-rw-r--r-- 1 root root 2408 Mar  2 13:05 mysql-bin.000004.res
-rw-r--r-- 1 root root 2408 Mar  2 13:05 mysql-bin.000003.res
-rw-r--r-- 1 root root 2408 Mar  2 14:20 mysql-bin.000005.res
drwxr-xr-x 3 root root 4096 Mar  2 14:23 table
[root@ol8mysql res]# cd table
[root@ol8mysql table]# ls -tlr
total 13848
drwxr-xr-x 2 root root       6 Mar  2 13:10 big
-rw-r--r-- 1 root root 1386910 Mar  2 14:24 mysql-bin.000005_mstest.sbtest9.log
-rw-r--r-- 1 root root 1426557 Mar  2 14:24 mysql-bin.000005_mstest.sbtest8.log
-rw-r--r-- 1 root root 1403572 Mar  2 14:24 mysql-bin.000005_mstest.sbtest7.log
-rw-r--r-- 1 root root 1408695 Mar  2 14:24 mysql-bin.000005_mstest.sbtest6.log
-rw-r--r-- 1 root root 1438066 Mar  2 14:24 mysql-bin.000005_mstest.sbtest5.log
-rw-r--r-- 1 root root 1440863 Mar  2 14:24 mysql-bin.000005_mstest.sbtest4.log
-rw-r--r-- 1 root root 1390803 Mar  2 14:24 mysql-bin.000005_mstest.sbtest3.log
-rw-r--r-- 1 root root 1397978 Mar  2 14:24 mysql-bin.000005_mstest.sbtest2.log
-rw-r--r-- 1 root root 1413137 Mar  2 14:24 mysql-bin.000005_mstest.sbtest1.log
-rw-r--r-- 1 root root 1453572 Mar  2 14:24 mysql-bin.000005_mstest.sbtest10.log
[root@ol8mysql table]# 

```

