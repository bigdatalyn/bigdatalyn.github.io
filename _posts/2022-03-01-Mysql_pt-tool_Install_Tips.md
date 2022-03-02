---
layout: post
title: "MySQL Study 003 - PT Tool Install Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL Study 003 - PT Tool Install Tips

- percona-toolkit Install 
- yun / make install





### Env

```
[root@ol8-19c ~]# cat /etc/redhat-release
Red Hat Enterprise Linux release 8.4 (Ootpa)
[root@ol8-19c ~]#
```

### percona-toolkit Install Tips

Use `yum` install or tar file to `make` install as belowing methods.


#### YUM

yum install 
```
[root@centos7 tmp]# yum install https://downloads.percona.com/downloads/percona-toolkit/3.3.1/binary/redhat/7/x86_64/percona-toolkit-3.3.1-1.el7.x86_64.rpm -y
```
```
[root@centos7 ~]# yum list | grep percona-toolkit
percona-toolkit.x86_64                      3.3.1-1.el7                @/percona-toolkit-3.3.1-1.el7.x86_64
[root@centos7 ~]#
```



#### TAR

[Download Percona Toolkit](https://downloads.percona.com/downloads/percona-toolkit/3.3.1/binary/tarball/percona-toolkit-3.3.1_x86_64.tar.gz)

```
tar -zxvf percona-toolkit-3.3.1_x86_64.tar.gz
mv percona-toolkit-3.3.1 /usr/local/
cd /usr/loca
ln -s percona-toolkit-3.3.1 percona-toolkit
cd percona-toolkit
cat README.md

yum install perl-ExtUtils-CBuilder perl-ExtUtils-MakeMaker -y
yum install perl-DBI -y

perl Makefile.PL
make
make test
make install

vi /etc/profile

export PATH=/usr/local/percona-toolkit/bin:$PATH

```

README.md

```
~

## Installing

To install all tools, run:


perl Makefile.PL
make
make test
make install


You probably need to be root to `make install`.  On most systems, the tools
are installed in /usr/local/bin.  See the INSTALL file for more information.


Example:

mkdir ${HOME}/go
export GOPATH=${HOME}/go
mkdir -p ${HOME}/go/src/github.com/percona
cd ${HOME}/go/src/github.com/percona
git clone https://github.com/percona/percona-toolkit.git
cd percona-toolkit/src/go
make
~

[root@centos7 percona-toolkit-3.3.1]#

```

Use the follwing command to test the tools is OK.
```
# pt-query-digest --help
# pt-table-checksum --help
```

#### Error Tips

Conflicts error:
```
Transaction check error:
  file /usr/share/mysql/charsets/README from install of mariadb-libs-1:5.5.68-1.el7.x86_64 conflicts with file from package MySQL-server-5.6.51-1.el7.x86_64
  file /usr/share/mysql/charsets/Index.xml from install of mariadb-libs-1:5.5.68-1.el7.x86_64 conflicts with file from package MySQL-server-5.6.51-1.el7.x86_64
...
```
Fix: Remove the rpm
```
[root@centos7 tmp]# rpm -qa|grep -i MySQL-server
MySQL-server-5.6.51-1.el7.x86_64
[root@centos7 tmp]#
[root@centos7 tmp]# yum remove MySQL-server-5.6.51-1.el7.x86_64 -y
```

`Can't locate Digest/MD5.pm` errors:

```
yum install perl-DBI
yum install perl-DBD-MySQL
yum install perl-Time-HiRes
yum install perl-IO-Socket-SSL
```

```
[root@centos7 ~]# pt-online-schema-change --help
Can't locate Digest/MD5.pm in @INC (@INC contains: /usr/local/lib64/perl5 /usr/local/share/perl5 /usr/lib64/perl5/vendor_perl /usr/share/perl5/vendor_perl /usr/lib64/perl5 /usr/share/perl5 .) at /usr/local/percona-toolkit/bin/pt-online-schema-change line 6340.
BEGIN failed--compilation aborted at /usr/local/percona-toolkit/bin/pt-online-schema-change line 6340.
[root@centos7 ~]# yum -y install perl-Digest-MD5

[root@centos7 ~]# pt-online-schema-change --user=root --password=12345678 --socket=/tmp/mysql.sock80 --alter "add column pk int auto_increment primary key" D=t1,t=new_t1 --print --dry-run
Cannot connect to MySQL: Cannot connect to MySQL because the Perl DBI module is not installed or not found.  Run 'perl -MDBI' to see the directories that Perl searches for DBI.  If DBI is not installed, try:
  Debian/Ubuntu  apt-get install libdbi-perl
  RHEL/CentOS    yum install perl-DBI
  OpenSolaris    pkg install pkg:/SUNWpmdbi
[root@centos7 ~]# yum install perl-DBI -y

```


#### Test

```
[root@centos7 ~]# which pt-summary
/usr/local/percona-toolkit/bin/pt-summary
[root@centos7 ~]# /usr/local/percona-toolkit/bin/pt-summary
# Percona Toolkit System Summary Report ######################
        Date | 2022-03-01 11:57:22 UTC (local TZ: CST +0800)
    Hostname | centos7
      Uptime |  3:20,  5 users,  load average: 0.08, 0.08, 0.07
      System | innotek GmbH; VirtualBox; v1.2 (Other)
 Service Tag | 0
    Platform | Linux
     Release | CentOS Linux release 7.9.2009 (Core)
      Kernel | 3.10.0-1160.el7.x86_64
Architecture | CPU = 64-bit, OS = 64-bit
   Threading | NPTL 2.17
    Compiler | GNU CC version 4.8.5 20150623 (Red Hat 4.8.5-44).
     SELinux | Disabled
 Virtualized | KVM
# Processor ##################################################
  Processors | physical = 1, cores = 2, virtual = 2, hyperthreading = no
      Speeds | 2x2304.000
      Models | 2xIntel(R) Core(TM) i7-1068NG7 CPU @ 2.30GHz
      Caches | 2x8192 KB
# Memory #####################################################
       Total | 1.8G
        Free | 71.8M
        Used | physical = 1.5G, swap allocated = 2.0G, swap used = 6.5M, virtual = 1.5G
      Shared | 5.4M
     Buffers | 0.0
      Caches | 243.0M
       Dirty | 68 kB
     UsedRSS | 1.7G
  Swappiness | 30
 DirtyPolicy | 30, 10
 DirtyStatus | 0, 0
  Locator   Size     Speed             Form Factor   Type          Type Detail
  ========= ======== ================= ============= ============= ===========
# Mounted Filesystems ########################################
  Filesystem               Size Used Type     Opts                                                             Mountpoint
  /dev/mapper/centos-root   17G  76% xfs      rw,relatime,attr2,inode64,noquota                                /
  /dev/sda1               1014M  19% xfs      rw,relatime,attr2,inode64,noquota                                /boot
  devtmpfs                 903M   0% devtmpfs rw,nosuid,size=923908k,nr_inodes=230977,mode=755                 /dev
  tmpfs                    184M   0% tmpfs    rw,nosuid,nodev                                                  /run/user/0
  tmpfs                    184M   0% tmpfs    rw,nosuid,nodev,mode=755                                         /run/user/0
  tmpfs                    184M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700                   /run/user/0
  tmpfs                    184M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=1000,gid=1000 /run/user/0
  tmpfs                    184M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=42,gid=42     /run/user/0
  tmpfs                    184M   0% tmpfs    ro,nosuid,nodev,noexec,mode=755                                  /run/user/0
  tmpfs                    184M   0% tmpfs    rw,nosuid,nodev                                                  /run/user/1000
  tmpfs                    184M   0% tmpfs    rw,nosuid,nodev,mode=755                                         /run/user/1000
  tmpfs                    184M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700                   /run/user/1000
  tmpfs                    184M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=1000,gid=1000 /run/user/1000
  tmpfs                    184M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=42,gid=42     /run/user/1000
  tmpfs                    184M   0% tmpfs    ro,nosuid,nodev,noexec,mode=755                                  /run/user/1000
  tmpfs                    184M   1% tmpfs    rw,nosuid,nodev                                                  /run/user/42
  tmpfs                    184M   1% tmpfs    rw,nosuid,nodev,mode=755                                         /run/user/42
  tmpfs                    184M   1% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700                   /run/user/42
  tmpfs                    184M   1% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=1000,gid=1000 /run/user/42
  tmpfs                    184M   1% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=42,gid=42     /run/user/42
  tmpfs                    184M   1% tmpfs    ro,nosuid,nodev,noexec,mode=755                                  /run/user/42
  tmpfs                    919M   0% tmpfs    rw,nosuid,nodev                                                  /dev/shm
  tmpfs                    919M   0% tmpfs    rw,nosuid,nodev,mode=755                                         /dev/shm
  tmpfs                    919M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700                   /dev/shm
  tmpfs                    919M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=1000,gid=1000 /dev/shm
  tmpfs                    919M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=42,gid=42     /dev/shm
  tmpfs                    919M   0% tmpfs    ro,nosuid,nodev,noexec,mode=755                                  /dev/shm
  tmpfs                    919M   0% tmpfs    rw,nosuid,nodev                                                  /sys/fs/cgroup
  tmpfs                    919M   0% tmpfs    rw,nosuid,nodev,mode=755                                         /sys/fs/cgroup
  tmpfs                    919M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700                   /sys/fs/cgroup
  tmpfs                    919M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=1000,gid=1000 /sys/fs/cgroup
  tmpfs                    919M   0% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=42,gid=42     /sys/fs/cgroup
  tmpfs                    919M   0% tmpfs    ro,nosuid,nodev,noexec,mode=755                                  /sys/fs/cgroup
  tmpfs                    919M   2% tmpfs    rw,nosuid,nodev                                                  /run
  tmpfs                    919M   2% tmpfs    rw,nosuid,nodev,mode=755                                         /run
  tmpfs                    919M   2% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700                   /run
  tmpfs                    919M   2% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=1000,gid=1000 /run
  tmpfs                    919M   2% tmpfs    rw,nosuid,nodev,relatime,size=188196k,mode=700,uid=42,gid=42     /run
  tmpfs                    919M   2% tmpfs    ro,nosuid,nodev,noexec,mode=755                                  /run
# Disk Schedulers And Queue Size #############################
        dm-0 | 128
        dm-1 | 128
         sda | [deadline] 128
         sr0 | [deadline] 128
# Disk Partioning ############################################
Device       Type      Start        End               Size
============ ==== ========== ========== ==================
/dev/dm-0    Disk                              18249416704
/dev/dm-1    Disk                               2147483648
/dev/sda     Disk                              21474836480
/dev/sda1    Part       2048    2099199         1073741312
/dev/sda2    Part    2099200   41943039        20400045568
# Kernel Inode State #########################################
dentry-state | 23888    10139   45  0   270 0
     file-nr | 6208 0   175808
    inode-nr | 25317    1983
# LVM Volumes ################################################
  LV   VG     Attr       LSize   Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  root centos -wi-ao---- <17.00g
  swap centos -wi-ao----   2.00g
# LVM Volume Groups ##########################################
  VG     VSize   VFree
  centos <19.00g    0
# RAID Controller ############################################
  Controller | No RAID controller detected
# Network Config #############################################
  Controller | Intel Corporation 82540EM Gigabit Ethernet Controller (rev 02)
  Controller | Intel Corporation 82540EM Gigabit Ethernet Controller (rev 02)
 FIN Timeout | 60
  Port Range | 60999
# Interface Statistics #######################################
  interface  rx_bytes rx_packets  rx_errors   tx_bytes tx_packets  tx_errors
  ========= ========= ========== ========== ========== ========== ==========
  lo                0          0          0          0          0          0
  enp0s3     50000000      60000          0   17500000      17500          0
  enp0s8        30000        125          0       4500         30          0
  virbr0            0          0          0          0          0          0
  virbr0-nic          0          0          0          0          0          0
# Network Devices ############################################
  Device    Speed     Duplex
  ========= ========= =========
  virbr0-nic 10Mb/s     Full
  enp0s3     1000Mb/s   Full
  virbr0
  enp0s8     1000Mb/s   Full
# Network Connections ########################################
  Connections from remote IP addresses
    10.0.2.2            6
  Connections to local IP addresses
    10.0.2.15           6
  Connections to top 10 local ports
    22                  6
  States of connections
    ESTABLISHED         6
    LISTEN             10
# Top Processes ##############################################
  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
 3010 mysql     20   0 1331856 443104   4580 S   4.2 23.5   0:14.01 mysqld
13242 root      20   0  162104   2188   1536 R   4.2  0.1   0:00.01 top
    1 root      20   0  191260   3804   2212 S   0.0  0.2   0:01.39 systemd
    2 root      20   0       0      0      0 S   0.0  0.0   0:00.00 kthreadd
    4 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 kworker/0:+
    6 root      20   0       0      0      0 S   0.0  0.0   0:00.41 ksoftirqd/0
    7 root      rt   0       0      0      0 S   0.0  0.0   0:00.06 migration/0
    8 root      20   0       0      0      0 S   0.0  0.0   0:00.00 rcu_bh
    9 root      20   0       0      0      0 S   0.0  0.0   0:01.09 rcu_sched
# Notable Processes ##########################################
  PID    OOM    COMMAND
 1081    -17    sshd
# Memory mamagement ##########################################
Transparent huge pages are enabled.
# The End ####################################################
[root@centos7 ~]#
```

```
[root@centos7 ~]# pt-mysql-summary --socket=/tmp/mysql.sock80
# Percona Toolkit MySQL Summary Report #######################
              System time | 2022-03-01 13:56:57 UTC (local TZ: CST +0800)
# Instances ##################################################
  Port  Data Directory             Nice OOM Socket
  ===== ========================== ==== === ======
   3307 /mdata/data1               0    0   /tmp/mysql.sock1
   3308 /mdata/data2               0    0   /tmp/mysql.sock2
   3380 /mdata/data80              0    0   /tmp/mysql.sock80
   3310 /mdata/data_mysql56        0    0   /tmp/mysql.sock10
# MySQL Executable ###########################################
       Path to executable | /usr/local/mysql56/bin/mysqld
              Has symbols | Yes
       Path to executable | /usr/local/mysql80/bin/mysqld
              Has symbols | Yes
       Path to executable | /usr/local/mysql/bin/mysqld
              Has symbols | Yes
# Slave Hosts ################################################
No slaves found
# Report On Port 3380 ########################################
                     User | root@localhost
                     Time | 2022-03-01 21:56:57 (CST)
                 Hostname | centos7
                  Version | 8.0.28 MySQL Community Server - GPL
                 Built On | Linux x86_64
                  Started | 2022-03-01 21:21 (up 0+00:34:58)
                Databases | 7
                  Datadir | /mdata/data80/
                Processes | 1 connected, 2 running
              Replication | Is not a slave, has 0 slaves connected
                  Pidfile | centos7.pid (does not exist)
# Processlist ################################################

  Command                        COUNT(*) Working SUM(Time) MAX(Time)
  ------------------------------ -------- ------- --------- ---------
  Daemon                                1       1      2000      2000
  Query                                 1       1         0         0

  User                           COUNT(*) Working SUM(Time) MAX(Time)
  ------------------------------ -------- ------- --------- ---------
  event_scheduler                       1       1      2000      2000
  root                                  1       1         0         0

  Host                           COUNT(*) Working SUM(Time) MAX(Time)
  ------------------------------ -------- ------- --------- ---------
  localhost                             2       2      2000      2000

  db                             COUNT(*) Working SUM(Time) MAX(Time)
  ------------------------------ -------- ------- --------- ---------
  NULL                                  2       2      2000      2000

  State                          COUNT(*) Working SUM(Time) MAX(Time)
  ------------------------------ -------- ------- --------- ---------
  init                                  1       1         0         0
  Waiting on empty queue                1       1      2000      2000

# Status Counters (Wait 10 Seconds) ##########################
Variable                                Per day  Per second     11 secs
Bytes_received                           350000           3         500
Bytes_sent                             10000000         125        3000
Com_admin_commands                           40
Com_change_db                               175
Com_create_db                                40
Com_create_table                           1500
Com_flush                                    40
Com_select                                  450                       2
Com_set_option                              250
Com_show_databases                          125
Com_show_fields                            9000
Com_show_status                              80
Com_show_tables                             250
Com_show_variables                          300
Connections                                 500                       1
Created_tmp_disk_tables                     250
Created_tmp_files                           200
Created_tmp_tables                         2500
Error_log_buffered_bytes                7000000          80        2000
Error_log_buffered_events                 45000                      15
Error_log_latest_write              70000000000000000 800000000000     1000000
Flush_commands                              125
Handler_commit                            50000
Handler_external_lock                    600000           6          20
Handler_read_first                         2250
Handler_read_key                         175000           1           6
Handler_read_next                        300000           3          20
Handler_read_rnd_next                    250000           3          90
Handler_update                            12500
Handler_write                             50000                      50
Innodb_buffer_pool_bytes_data         700000000        8000       -2978
Innodb_buffer_pool_pages_flushed           7000
Innodb_buffer_pool_read_requests        1250000          15          40
Innodb_buffer_pool_reads                  40000
Innodb_buffer_pool_write_requests         70000                       4
Innodb_data_fsyncs                         2000
Innodb_data_read                      600000000        7000
Innodb_data_reads                         40000
Innodb_data_writes                        10000
Innodb_data_written                   125000000        1500        1500
Innodb_dblwr_pages_written                 1000
Innodb_dblwr_writes                         350
Innodb_log_write_requests                 25000
Innodb_log_writes                           900
Innodb_os_log_fsyncs                        700
Innodb_os_log_written                   1500000          15
Innodb_pages_created                       6000
Innodb_pages_read                         40000
Innodb_pages_written                       7000
Innodb_system_rows_read                  350000           4          20
Innodb_system_rows_updated                12500
Innodb_num_open_files                       700
Innodb_undo_tablespaces_total                80
Innodb_undo_tablespaces_implicit             80
Innodb_undo_tablespaces_active               80
Mysqlx_port                             1250000          15
Mysqlx_ssl_ctx_verify_mode                  200
Mysqlx_worker_threads                        80
Open_table_definitions                    10000
Opened_files                                450                       1
Opened_table_definitions                  10000
Opened_tables                             12500                       5
Performance_schema_session_connect_attrs_longest_seen        5000
Queries                                   10000                       4
Questions                                 10000                       4
Select_full_join                            125
Select_scan                                1250
Sort_rows                                 17500
Sort_scan                                   350
Table_locks_immediate                      9000                       6
Table_open_cache_hits                    300000           3           5
Table_open_cache_misses                   12500                       5
Threads_created                              40
Uptime                                    90000           1           1
# Table cache ################################################
                     Size | 4000
                    Usage | 5%
# Key Percona Server features ################################
      Table & Index Stats | Not Supported
     Multiple I/O Threads | Enabled
     Corruption Resilient | Not Supported
      Durable Replication | Not Supported
     Import InnoDB Tables | Not Supported
     Fast Server Restarts | Not Supported
         Enhanced Logging | Not Supported
     Replica Perf Logging | Disabled
      Response Time Hist. | Not Supported
          Smooth Flushing | Not Supported
      HandlerSocket NoSQL | Not Supported
           Fast Hash UDFs | Unknown
# Percona XtraDB Cluster #####################################
# Plugins ####################################################
       InnoDB compression | ACTIVE
# Schema #####################################################
Specify --databases or --all-databases to dump and summarize schemas
# Noteworthy Technologies ####################################
                      SSL | No
     Explicit LOCK TABLES | No
           Delayed Insert | No
          XA Transactions | No
              NDB Cluster | No
      Prepared Statements | No
 Prepared statement count | 0
# InnoDB #####################################################
                  Version | 8.0.28
         Buffer Pool Size | 32.0M
         Buffer Pool Fill | 50%
        Buffer Pool Dirty | 0%
           File Per Table | ON
                Page Size | 16k
            Log File Size | 2 * 48.0M = 96.0M
          Log Buffer Size | 16M
             Flush Method | fsync
      Flush Log At Commit | 1
               XA Support |
                Checksums |
              Doublewrite | ON
          R/W I/O Threads | 4 4
             I/O Capacity | 200
       Thread Concurrency | 0
      Concurrency Tickets | 5000
       Commit Concurrency | 0
      Txn Isolation Level |
        Adaptive Flushing | ON
      Adaptive Checkpoint |
           Checkpoint Age | 0
             InnoDB Queue | 0 queries inside InnoDB, 0 queries in queue
       Oldest Transaction | 0 Seconds
         History List Len | 0
               Read Views | 0
         Undo Log Entries | 0 transactions, 0 total undo, 0 max undo
        Pending I/O Reads | 0 buf pool reads, 0 normal AIO, 0 ibuf AIO, 0 preads
       Pending I/O Writes | 0 buf pool (0 LRU, 0 flush list, 0 page); 0 AIO, 0 sync, 0 log IO (0 log, 0 chkp); 0 pwrites
      Pending I/O Flushes | 0 buf pool, 0 log
       Transaction States | 3xnot started
# MyISAM #####################################################
                Key Cache | 8.0M
                 Pct Used | 20%
                Unflushed | 0%
# Security ###################################################
                    Users | 2 users, 0 anon, 0 w/o pw, 1 old pw
            Old Passwords |
# Roles ######################################################
*************************** 1. row ***************************
Role Name: app_dev
   Active: 1
*************************** 2. row ***************************
Role Name: senior_dba
   Active: 0
# Encryption #################################################
No keyring plugins found
# Binary Logging #############################################
                  Binlogs | 19
               Zero-Sized | 0
               Total Size | 63.4M
            binlog_format | ROW
         expire_logs_days | 0
              sync_binlog | 1
                server_id | 8
             binlog_do_db |
         binlog_ignore_db |
# Noteworthy Variables #######################################
     Auto-Inc Incr/Offset | 1/1
   default_storage_engine | InnoDB
               flush_time | 0
             init_connect |
                init_file |
                 sql_mode | ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
         join_buffer_size | 256k
         sort_buffer_size | 256k
         read_buffer_size | 128k
     read_rnd_buffer_size | 256k
       bulk_insert_buffer | 0.00
      max_heap_table_size | 16M
           tmp_table_size | 16M
       max_allowed_packet | 64M
             thread_stack | 1M
                      log |
                log_error | ./mysql_error.log
             log_warnings |
         log_slow_queries |
log_queries_not_using_indexes | OFF
        log_slave_updates | ON
# Configuration File #########################################
              Config File | /etc/my.cnf

[client]
user                                = root
password                            = 12345678

[mysql]
prompt                              = (\\u@\\h) [\\d\]>\\_

[mysqld]
user                                = mysql
port                                = 3306
datadir                             = /mdata/data80
log_error                           = mysql_error.log

[mysqld1]
server-id                           = 1
innodb_buffer_pool_size             = 32M
port                                = 3307
datadir                             = /mdata/data1
socket                              = /tmp/mysql.sock1

[mysqld2]
server-id                           = 2
innodb_buffer_pool_size             = 32M
port                                = 3308
datadir                             = /mdata/data2
socket                              = /tmp/mysql.sock2

[mysqld4]
server-id                           = 4
innodb_buffer_pool_size             = 32M
port                                = 3310
datadir                             = /mdata/data_mysql56
basedir                             = /usr/local/mysql56
socket                              = /tmp/mysql.sock10

[mysqld8]
server-id                           = 8
innodb_buffer_pool_size             = 32M
port                                = 3380
basedir                             = /usr/local/mysql80
datadir                             = /mdata/data80
socket                              = /tmp/mysql.sock80
slow_query_log                      = 1
slow_query_log_file                 = /mdata/data80/slow_result.log
long_query_time                     = 2

[mysqld_multi]
mysqld                              = /usr/local/mysql/bin/mysqld_safe
mysqladmin                          = /usr/local/mysql/bin/mysqladmin
log                                 = /usr/local/mysql/mysqld_multi.log
# Memory management library ##################################
jemalloc is not enabled in mysql config for process with id 8873
jemalloc is not enabled in mysql config for process with id 8824
jemalloc is not enabled in mysql config for process with id 8762
jemalloc is not enabled in mysql config for process with id 8689
# The End ####################################################
[root@centos7 ~]#
```

#### Tools

Tools commands:
```
pt-align
pt-archiver
pt-config-diff
pt-deadlock-logger
pt-diskstats
pt-duplicate-key-checker
pt-fifo-split
pt-find
pt-fingerprint
pt-fk-error-logger
pt-heartbeat
pt-index-usage
pt-ioprofile
pt-k8s-debug-collector
pt-kill
pt-mext
pt-mongodb-query-digest
pt-mongodb-summary
pt-mysql-summary
pt-online-schema-change
pt-pg-summary
pt-pmp
pt-query-digest
pt-secure-collect
pt-show-grants
pt-sift
pt-slave-delay
pt-slave-find
pt-slave-restart
pt-stalk
pt-summary
pt-table-checksum
pt-table-sync
pt-table-usage
pt-upgrade
pt-variable-advisor
pt-visual-explain
```

### Reference

percona-toolkit-3.3.1 2022/02

[Download Percona Toolkit](https://downloads.percona.com/downloads/percona-toolkit/3.3.1/binary/tarball/percona-toolkit-3.3.1_x86_64.tar.gz)


[Percona Toolkit Documentation](https://www.percona.com/doc/percona-toolkit/LATEST/index.html)



Have a good work&life! 2022/03 via LinHong

