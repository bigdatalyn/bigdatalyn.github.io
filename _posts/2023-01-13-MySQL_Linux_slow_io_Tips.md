---
layout: post
title: "MySQL Linux Slow Io Simulate Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL Linux Slow Io Simulate Tips










### Linux Disk Slow IO

create 100m file via `dd` command.
```
dd if=/dev/zero of=/tmp/100m bs=1024 count=100
```
change to block device via `losetup` command.
```
losetup --show --find /tmp/100m
```
create /dev/loop0 device
```
echo "0 `blockdev --getsz /dev/loop0` delay /dev/loop0 0 100" | dmsetup create dm-slow
ll /dev/mapper/dm-slow
```

```
[root@ol8mysql01 ~]# dd if=/dev/zero of=/tmp/100m bs=1024 count=100000
100000+0 records in
100000+0 records out
102400000 bytes (102 MB, 98 MiB) copied, 0.313417 s, 327 MB/s
[root@ol8mysql01 ~]# du -sm /tmp/100m 
98	/tmp/100m
[root@ol8mysql01 ~]# ll /tmp/100m 
-rw-r--r-- 1 root root 102400000 Jan 13 07:49 /tmp/100m
[root@ol8mysql01 ~]# 
[root@ol8mysql01 ~]# losetup --show --find /tmp/100m
/dev/loop1
[root@ol8mysql01 ~]#
[root@ol8mysql01 ~]# 
[root@ol8mysql01 ~]# echo "0 `blockdev --getsz /dev/loop1` delay /dev/loop1 0 100" | dmsetup create dm-slow1
[root@ol8mysql01 ~]# 
[root@ol8mysql01 ~]# ll /dev/mapper/dm-slow1
lrwxrwxrwx 1 root root 7 Jan 13 07:51 /dev/mapper/dm-slow1 -> ../dm-3
[root@ol8mysql01 ~]# 
```

### MySQL test use this device

Format Disk and mount the filesystem `/mnt/slow`

```
mkfs.ext4 /dev/mapper/dm-slow1
mkdir -p /mnt/slow
mount /dev/mapper/dm-slow1 /mnt/slow
```
Logs:
```
[root@ol8mysql01 ~]# mkfs.ext4 /dev/mapper/dm-slow1
mke2fs 1.45.6 (20-Mar-2020)
Discarding device blocks: done                            
Creating filesystem with 100000 1k blocks and 25064 inodes
Filesystem UUID: 45933a8a-e283-4aa1-aec1-c5bee9e0ee40
Superblock backups stored on blocks: 
	8193, 24577, 40961, 57345, 73729

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (4096 blocks): done
Writing superblocks and filesystem accounting information: done 

[root@ol8mysql01 ~]# mkdir -p /mnt/slow
[root@ol8mysql01 ~]# mount /dev/mapper/dm-slow1 /mnt/slow
[root@ol8mysql01 ~]# df -h /mnt/slow/
Filesystem            Size  Used Avail Use% Mounted on
/dev/mapper/dm-slow1   90M   14K   83M   1% /mnt/slow
[root@ol8mysql01 ~]# 
```

dbdelpoyer deploy mysql 5.7 and use the binlog directory `/mnt/slow`
double 1 flush data into disk.
```
dbdeployer deploy single 5.7 \
-c log-bin=/mnt/slow/binlog \
-c sync_binlog=1 \
-c innodb_flush_log_at_trx_commit=1 \
--gtid \
--sandbox-directory=test-slow-binlog
```

```
[root@ol8mysql01 ~]# dbdeployer deploy single 5.7 \
> -c log-bin=/mnt/slow/binlog \
> -c sync_binlog=1 \
> -c innodb_flush_log_at_trx_commit=1 \
> --gtid \
> --sandbox-directory=test-slow-binlog
# 5.7 => 5.7.26
Database installed in $HOME/sandboxes/test-slow-binlog
run 'dbdeployer usage single' for basic instructions'
... sandbox server started
[root@ol8mysql01 ~]# cd sandboxes/test-slow-binlog/
[root@ol8mysql01 test-slow-binlog]# ./use -e "select @@version";
+------------+
| @@version  |
+------------+
| 5.7.26-log |
+------------+
[root@ol8mysql01 test-slow-binlog]# 
```

Test via mysqlslap
```
mysqlslap --delimiter=";" \
--create="CREATE TABLE a(b int primary key AUTO_INCREMENT)" \
--query="insert into a values()" \
--concurrency=10 \
--iterations=100 \
--host=127.0.0.1 \
--port=5726 \
--user=msandbox \
--password=msandbox
```
Logs:
```
[root@ol8mysql01 sandboxes]# mysqlslap --delimiter=";" \
> --create="CREATE TABLE a(b int primary key AUTO_INCREMENT)" \
> --query="insert into a values()" \
> --concurrency=20 \
> --iterations=100 \
> --host=127.0.0.1 \
> --port=5726 \
> --user=msandbox \
> --password=msandbox
mysqlslap: [Warning] unknown variable 'loose-default-character-set=utf8'
mysqlslap: [Warning] Using a password on the command line interface can be insecure.

```

Install `iostat` in Linux 8
```
[root@ol8mysql01 ~]# iostat
-bash: iostat: command not found
[root@ol8mysql01 ~]# yum install sysstat -y
```
Install pt tool
```
# wget -c install https://www.percona.com/downloads/percona-toolkit/3.5.0/binary/redhat/8/percona-toolkit-3.5.0-5.el8.x86_64.rpm
# yum localinstall percona-toolkit-3.5.0-5.el8.x86_64.rpm
# yum install strace -y


[root@ol8mysql01 ~]# pt-ioprofile --profile-pid 1171 --run-time 10
strace is not in PATH
[root@ol8mysql01 ~]# yum install strace -y

[root@ol8mysql01 vagrant]# pt
pt-align                  pt-deadlock-logger        pt-fk-error-logger        pt-mext                   pt-pg-summary             pt-slave-delay            pt-table-sync
ptar                      pt-diskstats              pt-heartbeat              pt-mongodb-index-check    pt-pmp                    pt-slave-find             pt-table-usage
pt-archiver               pt-duplicate-key-checker  pt-index-usage            pt-mongodb-query-digest   pt-query-digest           pt-slave-restart          pt-upgrade
ptardiff                  pt-fifo-split             pt-ioprofile              pt-mongodb-summary        pt-secure-collect         pt-stalk                  pt-variable-advisor
ptargrep                  pt-find                   pt-k8s-debug-collector    pt-mysql-summary          pt-show-grants            pt-summary                pt-visual-explain
pt-config-diff            pt-fingerprint            pt-kill                   pt-online-schema-change   pt-sift                   pt-table-checksum         ptx
[root@ol8mysql01 vagrant]# 
```


pt-ioprofile 查看io情况: bilog目录的花费时间远大于其他消耗。fdatasync:9.356581
```
[root@ol8mysql01 data]# pwd
/root/sandboxes/test-slow-binlog/data
[root@ol8mysql01 data]# cat mysql_sandbox5726.pid 
27046
[root@ol8mysql01 data]# pt-ioprofile --profile-pid 27046 --run-time 10
Fri Jan 13 07:57:21 UTC 2023
Tracing process ID 27046
     total   pwrite64      write  fdatasync      fsync      close      lseek filename
  9.362831   0.000000   0.006250   9.356581   0.000000   0.000000   0.000000 /mnt/slow/binlog.000001
  0.141690   0.006847   0.000000   0.000000   0.134843   0.000000   0.000000 /root/sandboxes/test-slow-binlog/data/ib_logfile0
  0.000467   0.000000   0.000000   0.000000   0.000000   0.000000   0.000467 /root/sandboxes/test-slow-binlog/data/mysql/event.MYD
  0.000022   0.000000   0.000000   0.000000   0.000000   0.000022   0.000000 /root/sandboxes/test-slow-binlog/data/mysqlslap/a.ibd
[root@ol8mysql01 data]# 
```

```
[root@ol8mysql01 ~]# mysqlslap --delimiter=";" \
> --create="CREATE TABLE a(b int primary key AUTO_INCREMENT)" \
> --query="insert into a values()" \
> --concurrency=10 \
> --iterations=100 \
> --host=127.0.0.1 \
> --port=5726 \
> --user=msandbox \
> --password=msandbox
mysqlslap: [Warning] unknown variable 'loose-default-character-set=utf8'
mysqlslap: [Warning] Using a password on the command line interface can be insecure.
Benchmark
	Average number of seconds to run all queries: 0.858 seconds
	Minimum number of seconds to run all queries: 0.832 seconds
	Maximum number of seconds to run all queries: 0.968 seconds
	Number of clients running queries: 10
	Average number of queries per client: 1

[root@ol8mysql01 ~]# 
```
 
dm-3(/dev/mapper/dm-slow1) aqu-sz 有数字表示有排队下
loop1 是块设备 IO有充足能力 dm-3有IO延迟
```
[root@ol8mysql01 ~]# ls -l /dev/mapper/dm-slow1
lrwxrwxrwx 1 root root 7 Jan 13 07:52 /dev/mapper/dm-slow1 -> ../dm-3
[root@ol8mysql01 ~]# df -h /mnt/slow
Filesystem            Size  Used Avail Use% Mounted on
/dev/mapper/dm-slow1   90M  525K   82M   1% /mnt/slow
[root@ol8mysql01 ~]# ls -l /dev/mapper/dm-slow1
lrwxrwxrwx 1 root root 7 Jan 13 07:52 /dev/mapper/dm-slow1 -> ../dm-3
[root@ol8mysql01 ~]# 

[root@ol8mysql01 ~]# iostat -x 1 -p dm-3 -p loop1
Linux 5.4.17-2136.309.4.el8uek.x86_64 (ol8mysql01) 	01/13/2023 	_x86_64_	(1 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.03    0.03    1.77    1.15    0.00   97.02

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
dm-3             0.01    0.13      0.20      0.40     0.00     0.00   0.00   0.00  104.05  105.85   0.02    18.01     3.05  72.25   1.04
loop1            0.01    0.13      0.27      0.38     0.00     0.00   0.00   0.70    0.63    2.25   0.00    19.28     2.90   2.15   0.03

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.00    0.00    4.17   95.83    0.00    0.00

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
dm-3             0.00   16.00      0.00     16.00     0.00     0.00   0.00   0.00    0.00  107.00   1.71     0.00     1.00  67.75 108.40
loop1            0.00   16.00      0.00     14.00     0.00     0.00   0.00   0.00    0.00    2.06   0.03     0.00     0.88   2.25   3.60

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.00    0.00    5.10   94.90    0.00    0.00

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
dm-3             0.00   13.00      0.00     15.00     0.00     0.00   0.00   0.00    0.00  105.54   1.37     0.00     1.15  73.85  96.00
loop1            0.00   13.00      0.00     12.00     0.00     0.00   0.00   0.00    0.00    2.15   0.02     0.00     0.92   2.69   3.50

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.00    0.00    4.17   94.79    0.00    1.04

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
dm-3             0.00   12.87      0.00     13.86     0.00     0.00   0.00   0.00    0.00  107.15   1.38     0.00     1.08  74.85  96.34
loop1            0.00   12.87      0.00     11.88     0.00     0.00   0.00   0.00    0.00    3.23   0.04     0.00     0.92   2.92   3.76

^C
[root@ol8mysql01 ~]# 


Device：设备名称
tps：每秒的IO读、写请求数量，多个逻辑请求可以组合成对设备的单个I/O请求。
Blk_read/s (kB_read/s, MB_read/s)：从设备读取的数据量，以每秒若干块(千字节、兆字节)表示。块相当于扇区，因此块大小为512字节。
Blk_wrtn/s (kB_wrtn/s, MB_wrtn/s)：写入设备的数据量，以每秒若干块(千字节、兆字节)表示。块相当于扇区，因此块大小为512字节。
Blk_read (kB_read, MB_read)：读取块的总数(千字节、兆字节)。
Blk_wrtn (kB_wrtn, MB_wrtn)：写入块的总数(千字节，兆字节)。
rrqm/s：每秒合并到设备的读请求数。即delta(rmerge)/s
wrqm/s：每秒合并到设备的写入请求数。即delta(wmerge)/s
r/s：每秒完成的读I/O设备次数。即delta(rio)/s
w/s：每秒完成的写I/0设备次数。即delta(wio)/s rsec/s (rkB/s, 11. rMB/s)：每秒读取设备的扇区数(千字节、兆字节)。每扇区大小为512字节
wsec/s (wkB/s, wMB/s)：每秒写入设备的扇区数(千字节、兆字节)。每扇区大小为512字节
avgrq-sz：平均每次设备I/O操作的数据量(扇区为单位)。即delta(rsec+wsec)/delta(rio+wio)
avgqu-sz：平均每次发送给设备的I/O队列长度。
await：平均每次IO请求等待时间。(包括等待队列时间和处理时间，毫秒为单位)
r_await：平均每次IO读请求等待时间。(包括等待队列时间和处理时间，毫秒为单位)
w_await：平均每次IO写请求等待时间。(包括等待队列时间和处理时间，毫秒为单位)
svctm：平均每次设备I/O操作的处理时间(毫秒)。警告！不要再相信这个字段值，这个字段将在将来的sysstat版本中删除。
%util：一秒中有百分之多少的时间用于I/O操作，或者说一秒中有多少时间I/O队列是非空的。当该值接近100%时，设备饱和发生

```

### Test slow and capture SQL 


```
mysql [localhost:5726] {msandbox} (sys) > call sys.ps_setup_reset_to_default(FALSE);
Query OK, 0 rows affected (0.02 sec)

mysql [localhost:5726] {msandbox} (sys) > call sys.ps_setup_enable_consumer('waits');
+---------------------+
| summary             |
+---------------------+
| Enabled 3 consumers |
+---------------------+
1 row in set (0.01 sec)

Query OK, 0 rows affected (0.01 sec)

mysql [localhost:5726] {msandbox} (sys) > call sys.ps_truncate_all_tables(FALSE);
+---------------------+
| summary             |
+---------------------+
| Truncated 44 tables |
+---------------------+
1 row in set (0.01 sec)

Query OK, 0 rows affected (0.01 sec)

mysql [localhost:5726] {msandbox} (sys) >
```

```
[root@ol8mysql01 ~]# mysqlslap --delimiter=";" --create="CREATE TABLE a(b int primary key AUTO_INCREMENT)" --query="insert into a values()" --concurrency=10 --iterations=100 --host=127.0.0.1 --port=5726 --user=msandbox --password=msandbox
mysqlslap: [Warning] unknown variable 'loose-default-character-set=utf8'
mysqlslap: [Warning] Using a password on the command line interface can be insecure.
```

```
select *,latency/1000/1000/1000 as latency_ms from x$latest_file_io order by latency desc limit 20;

select * from performance_schema.threads where processlist_id=2006\G
```

```
mysql [localhost:5726] {msandbox} ((none)) > use sys
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql [localhost:5726] {msandbox} (sys) > select *,latency/1000/1000/1000 as latency_ms from x$latest_file_io order by latency desc limit 50;
+-------------------------------+-------------------------------------------------------+--------------+-----------+-----------+------------------+
| thread                        | file                                                  | latency      | operation | requested | latency_ms       |
+-------------------------------+-------------------------------------------------------+--------------+-----------+-----------+------------------+
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 433905466988 | sync      |      NULL | 433.905466988000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 431398107504 | sync      |      NULL | 431.398107504000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 430445467088 | sync      |      NULL | 430.445467088000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 429222105284 | sync      |      NULL | 429.222105284000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 429114348292 | sync      |      NULL | 429.114348292000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 428794018968 | sync      |      NULL | 428.794018968000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 428768728920 | sync      |      NULL | 428.768728920000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 428651695612 | sync      |      NULL | 428.651695612000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 428616697852 | sync      |      NULL | 428.616697852000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 427963250092 | sync      |      NULL | 427.963250092000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 427733015696 | sync      |      NULL | 427.733015696000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 427586798492 | sync      |      NULL | 427.586798492000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 427570089492 | sync      |      NULL | 427.570089492000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 427306214888 | sync      |      NULL | 427.306214888000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 426845821612 | sync      |      NULL | 426.845821612000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 426621987848 | sync      |      NULL | 426.621987848000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 426038113760 | sync      |      NULL | 426.038113760000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 425482098132 | sync      |      NULL | 425.482098132000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 423557362816 | sync      |      NULL | 423.557362816000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 423242501892 | sync      |      NULL | 423.242501892000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 422850002708 | sync      |      NULL | 422.850002708000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 422000963300 | sync      |      NULL | 422.000963300000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 421837861760 | sync      |      NULL | 421.837861760000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 421040872840 | sync      |      NULL | 421.040872840000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 419760313308 | sync      |      NULL | 419.760313308000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 418822718804 | sync      |      NULL | 418.822718804000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 416057476520 | sync      |      NULL | 416.057476520000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 414471391404 | sync      |      NULL | 414.471391404000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 411731045096 | sync      |      NULL | 411.731045096000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 409613676276 | sync      |      NULL | 409.613676276000 |
| msandbox@localhost:42070:3008 | /mnt/slow/binlog.000001                               | 409286017560 | sync      |      NULL | 409.286017560000 |
| io_write_thread:3             | /root/sandboxes/test-slow-binlog/data/ibdata1         |  14578598160 | sync      |      NULL |  14.578598160000 |
| page_cleaner_thread:7         | /root/sandboxes/test-slow-binlog/data/ibdata1         |  10095912848 | sync      |      NULL |  10.095912848000 |
| page_cleaner_thread:7         | /root/sandboxes/test-slow-binlog/data/ibdata1         |   9367760668 | sync      |      NULL |   9.367760668000 |
| page_cleaner_thread:7         | /root/sandboxes/test-slow-binlog/data/ibdata1         |   7733800144 | sync      |      NULL |   7.733800144000 |
| srv_master_thread:20          | /root/sandboxes/test-slow-binlog/data/ib_logfile0     |   6922184556 | sync      |      NULL |   6.922184556000 |
| srv_master_thread:20          | /root/sandboxes/test-slow-binlog/data/ib_logfile0     |   6679043868 | sync      |      NULL |   6.679043868000 |
| msandbox@localhost:42070:3008 | /root/sandboxes/test-slow-binlog/data/mysqlslap/a.frm |   6641439504 | sync      |      NULL |   6.641439504000 |
| io_write_thread:5             | /root/sandboxes/test-slow-binlog/data/ibdata1         |   6504587152 | sync      |      NULL |   6.504587152000 |
| page_cleaner_thread:7         | /root/sandboxes/test-slow-binlog/data/ibdata1         |   6385299648 | sync      |      NULL |   6.385299648000 |
| page_cleaner_thread:7         | /root/sandboxes/test-slow-binlog/data/ibdata1         |   6236528788 | sync      |      NULL |   6.236528788000 |
| srv_master_thread:20          | /root/sandboxes/test-slow-binlog/data/ib_logfile0     |   6193787600 | sync      |      NULL |   6.193787600000 |
| srv_master_thread:20          | /root/sandboxes/test-slow-binlog/data/ib_logfile0     |   6162804340 | sync      |      NULL |   6.162804340000 |
| srv_master_thread:20          | /root/sandboxes/test-slow-binlog/data/ib_logfile0     |   6119682968 | sync      |      NULL |   6.119682968000 |
| page_cleaner_thread:7         | /root/sandboxes/test-slow-binlog/data/ibdata1         |   6097788536 | sync      |      NULL |   6.097788536000 |
| srv_master_thread:20          | /root/sandboxes/test-slow-binlog/data/ib_logfile0     |   5946406732 | sync      |      NULL |   5.946406732000 |
| io_write_thread:3             | /root/sandboxes/test-slow-binlog/data/ibdata1         |   5836888568 | sync      |      NULL |   5.836888568000 |
| msandbox@localhost:42070:3008 | /root/sandboxes/test-slow-binlog/data/ib_logfile0     |   5813660020 | sync      |      NULL |   5.813660020000 |
| io_write_thread:3             | /root/sandboxes/test-slow-binlog/data/ibdata1         |   5749690156 | sync      |      NULL |   5.749690156000 |
| page_cleaner_thread:7         | /root/sandboxes/test-slow-binlog/data/ibdata1         |   5734868188 | sync      |      NULL |   5.734868188000 |
+-------------------------------+-------------------------------------------------------+--------------+-----------+-----------+------------------+
50 rows in set (0.03 sec)

mysql [localhost:5726] {msandbox} (sys) > 

mysql [localhost:5726] {msandbox} (sys) > select * from performance_schema.threads where processlist_id=3008\G
*************************** 1. row ***************************
          THREAD_ID: 3034
               NAME: thread/sql/one_connection
               TYPE: FOREGROUND
     PROCESSLIST_ID: 3008
   PROCESSLIST_USER: msandbox
   PROCESSLIST_HOST: localhost
     PROCESSLIST_DB: mysqlslap
PROCESSLIST_COMMAND: Query
   PROCESSLIST_TIME: 0
  PROCESSLIST_STATE: query end
   PROCESSLIST_INFO: CREATE TABLE a(b int primary key AUTO_INCREMENT)
   PARENT_THREAD_ID: NULL
               ROLE: NULL
       INSTRUMENTED: YES
            HISTORY: YES
    CONNECTION_TYPE: TCP/IP
       THREAD_OS_ID: 29750
1 row in set (0.00 sec)

mysql [localhost:5726] {msandbox} (sys) > select * from performance_schema.threads where processlist_id=3008\G
*************************** 1. row ***************************
          THREAD_ID: 3034
               NAME: thread/sql/one_connection
               TYPE: FOREGROUND
     PROCESSLIST_ID: 3008
   PROCESSLIST_USER: msandbox
   PROCESSLIST_HOST: localhost
     PROCESSLIST_DB: mysqlslap
PROCESSLIST_COMMAND: Sleep
   PROCESSLIST_TIME: 1
  PROCESSLIST_STATE: NULL
   PROCESSLIST_INFO: NULL
   PARENT_THREAD_ID: NULL
               ROLE: NULL
       INSTRUMENTED: YES
            HISTORY: YES
    CONNECTION_TYPE: TCP/IP
       THREAD_OS_ID: 29750
1 row in set (0.00 sec)

mysql [localhost:5726] {msandbox} (sys) > select * from performance_schema.threads where processlist_id=3008\G
*************************** 1. row ***************************
          THREAD_ID: 3034
               NAME: thread/sql/one_connection
               TYPE: FOREGROUND
     PROCESSLIST_ID: 3008
   PROCESSLIST_USER: msandbox
   PROCESSLIST_HOST: localhost
     PROCESSLIST_DB: mysqlslap
PROCESSLIST_COMMAND: Query
   PROCESSLIST_TIME: 1
  PROCESSLIST_STATE: query end
   PROCESSLIST_INFO: DROP SCHEMA IF EXISTS `mysqlslap`
   PARENT_THREAD_ID: NULL
               ROLE: NULL
       INSTRUMENTED: YES
            HISTORY: YES
    CONNECTION_TYPE: TCP/IP
       THREAD_OS_ID: 29750
1 row in set (0.00 sec)

mysql [localhost:5726] {msandbox} (sys) > 
```

我们通过 sys.x$latest_file_io，找到最近的 IO 操作的记录，进行了排序。
需注意：

这里不用 sys.latest_file_io 的原因是无法对操作延迟进行排序。
小知识：
以 sys 中, 以 x$ 开头的视图，是原始数据。
不以 x$ 开头的视图，是给人类看的视图（比如时间显示会带单位，显示成 123 ns）。

sys.x$latest_file_io 视图涉及到两张表：
performance_schema. events_waits_history_long 和 performance_schema. threads 
如果某个线程退出，就不会出现在 sys.x$latest_file_io 视图。

所以 sys.x$latest_file_io 不是"最近的 IO 操作记录"，而是"当前活跃线程的最近的 IO 操作记录"。


### Reference 

[Linux丶模仿IO慢](https://www.cnblogs.com/lovezhr/p/13302023.html)

[第02问：怎么模仿磁盘 IO 慢的情况？](https://blog.csdn.net/ActionTech/article/details/104698877)


Have a good work&life! 2023/01 via LinHong


