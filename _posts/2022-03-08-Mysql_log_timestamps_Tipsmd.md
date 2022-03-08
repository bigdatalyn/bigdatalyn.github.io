---
layout: post
title: "MySQL Study 007 - log_timestamps Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL Study 007 - log_timestamps Tips

- Parameter : log_timestamps





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

### log_timestamps


log_timestamps 参数默认使用 UTC 时区，这样会使得日志中记录的时间比中国这边的慢了 8 个小时，导致查看日志不方便。修改为 SYSTEM 就能解决问题。

[log_timestamps](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_log_timestamps)

```
This variable controls the time zone of timestamps in messages written to the error log, and in general query log and slow query log messages written to files. It does not affect the time zone of general query log and slow query log messages written to tables (mysql.general_log, mysql.slow_log). Rows retrieved from those tables can be converted from the local system time zone to any desired time zone with CONVERT_TZ() or by setting the session time_zone system variable.

Permitted log_timestamps values are UTC (the default) and SYSTEM (local system time zone).

Timestamps are written using ISO 8601 / RFC 3339 format: YYYY-MM-DDThh:mm:ss.uuuuuu plus a tail value of Z signifying Zulu time (UTC) or ±hh:mm (an offset from UTC).
```

### Modify

Global variable : log_timestamps

```
mysql> SHOW GLOBAL VARIABLES LIKE 'log_timestamps';
+----------------+--------+
| Variable_name  | Value  |
+----------------+--------+
| log_timestamps | UTC    |
+----------------+--------+

mysql> SET GLOBAL log_timestamps = SYSTEM;
Query OK, 0 rows affected (0.00 sec)

mysql> SHOW GLOBAL VARIABLES LIKE 'log_timestamps';
+----------------+--------+
| Variable_name  | Value  |
+----------------+--------+
| log_timestamps | SYSTEM |
+----------------+--------+
```

or

Edit `/etc/my.cnf` and restart after adding `log_timestamps=SYSTEM`.

```
[root@centos7 ~]# cat /etc/my.cnf | grep log_timestamps
log_timestamps=SYSTEM
[root@centos7 ~]#
```

Log timestamp : `2022-03-08T07:05:05.205060Z` ->`2022-03-08T15:05:15.447018+08:00`

```
2022-03-08T07:05:03.451594Z 0 [Note] InnoDB: Starting shutdown...
2022-03-08T07:05:03.552779Z 0 [Note] InnoDB: Dumping buffer pool(s) to /mdata/data1/ib_buffer_pool
2022-03-08T07:05:03.553204Z 0 [Note] InnoDB: Buffer pool(s) dump completed at 220308 15:05:03
2022-03-08T07:05:05.203097Z 0 [Note] InnoDB: Shutdown completed; log sequence number 2754637
2022-03-08T07:05:05.204662Z 0 [Note] InnoDB: Removed temporary tablespace data file: "ibtmp1"
2022-03-08T07:05:05.204682Z 0 [Note] Shutting down plugin 'CSV'
2022-03-08T07:05:05.204690Z 0 [Note] Shutting down plugin 'MRG_MYISAM'
2022-03-08T07:05:05.204694Z 0 [Note] Shutting down plugin 'sha256_password'
2022-03-08T07:05:05.204697Z 0 [Note] Shutting down plugin 'mysql_native_password'
2022-03-08T07:05:05.204799Z 0 [Note] Shutting down plugin 'binlog'
2022-03-08T07:05:05.205060Z 0 [Note] /usr/local/mysql/bin/mysqld: Shutdown complete

2022-03-08T15:05:15.447018+08:00 0 [Warning] TIMESTAMP with implicit DEFAULT value is deprecated. Please use --explicit_defaults_for_timestamp server option (see documentation for more details).
2022-03-08T15:05:15.447138+08:00 0 [Note] --secure-file-priv is set to NULL. Operations related to importing and exporting data are disabled
2022-03-08T15:05:15.447177+08:00 0 [Note] /usr/local/mysql/bin/mysqld (mysqld 5.7.36) starting as process 8950 ...
2022-03-08T15:05:15.455747+08:00 0 [Note] InnoDB: PUNCH HOLE support available
2022-03-08T15:05:15.455797+08:00 0 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins
2022-03-08T15:05:15.455801+08:00 0 [Note] InnoDB: Uses event mutexes
2022-03-08T15:05:15.455805+08:00 0 [Note] InnoDB: GCC builtin __sync_synchronize() is used for memory barrier
2022-03-08T15:05:15.455808+08:00 0 [Note] InnoDB: Compressed tables use zlib 1.2.11
2022-03-08T15:05:15.455813+08:00 0 [Note] InnoDB: Using Linux native AIO
```


### Reference

[MySQL](https://www.mysql.com/)

[log_timestamps](https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_log_timestamps)


Have a good work&life! 2022/03 via LinHong

