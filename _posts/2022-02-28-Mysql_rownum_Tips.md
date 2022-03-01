---
layout: post
title: "MySQL Study 002 - ROWNUM Tips"
category: MySQL
tags: MySQL Tips SQL
---

* content
{:toc}

MySQL Study 002 - ROWNUM Tips

There is NOT row_num function in MySQL. 

How to achieve this function in MySQL?






### Env

```
[root@centos7 ~]# cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
[root@centos7 ~]# uname -a
Linux centos7 3.10.0-1160.el7.x86_64 #1 SMP Mon Oct 19 16:18:59 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
[root@centos7 ~]#
[root@centos7 ~]# mysql -S/tmp/mysql.sock80
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 17
Server version: 8.0.28 MySQL Community Server - GPL

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

(root@localhost) [(none)]>\_>
```

### Test Data

```
(root@localhost) [test]>\_> drop table t1;
Query OK, 0 rows affected (0.05 sec)

(root@localhost) [test]>\_> create table t1 as select * from information_schema.tables;
Query OK, 343 rows affected (0.75 sec)
Records: 343  Duplicates: 0  Warnings: 0

(root@localhost) [test]>\_>

(root@localhost) [test]>\_> desc t1;
+-----------------+--------------------------------------------------------------------+------+-----+---------+-------+
| Field           | Type                                                               | Null | Key | Default | Extra |
+-----------------+--------------------------------------------------------------------+------+-----+---------+-------+
| TABLE_CATALOG   | varchar(64)                                                        | NO   |     | NULL    |       |
| TABLE_SCHEMA    | varchar(64)                                                        | NO   |     | NULL    |       |
| TABLE_NAME      | varchar(64)                                                        | NO   |     | NULL    |       |
| TABLE_TYPE      | enum('BASE TABLE','VIEW','SYSTEM VIEW')                            | NO   |     | NULL    |       |
| ENGINE          | varchar(64)                                                        | YES  |     | NULL    |       |
| VERSION         | int                                                                | YES  |     | NULL    |       |
| ROW_FORMAT      | enum('Fixed','Dynamic','Compressed','Redundant','Compact','Paged') | YES  |     | NULL    |       |
| TABLE_ROWS      | bigint unsigned                                                    | YES  |     | NULL    |       |
| AVG_ROW_LENGTH  | bigint unsigned                                                    | YES  |     | NULL    |       |
| DATA_LENGTH     | bigint unsigned                                                    | YES  |     | NULL    |       |
| MAX_DATA_LENGTH | bigint unsigned                                                    | YES  |     | NULL    |       |
| INDEX_LENGTH    | bigint unsigned                                                    | YES  |     | NULL    |       |
| DATA_FREE       | bigint unsigned                                                    | YES  |     | NULL    |       |
| AUTO_INCREMENT  | bigint unsigned                                                    | YES  |     | NULL    |       |
| CREATE_TIME     | timestamp                                                          | NO   |     | NULL    |       |
| UPDATE_TIME     | datetime                                                           | YES  |     | NULL    |       |
| CHECK_TIME      | datetime                                                           | YES  |     | NULL    |       |
| TABLE_COLLATION | varchar(64)                                                        | YES  |     | NULL    |       |
| CHECKSUM        | bigint                                                             | YES  |     | NULL    |       |
| CREATE_OPTIONS  | varchar(256)                                                       | YES  |     | NULL    |       |
| TABLE_COMMENT   | text                                                               | YES  |     | NULL    |       |
+-----------------+--------------------------------------------------------------------+------+-----+---------+-------+
21 rows in set (0.00 sec)

(root@localhost) [test]>\_>
```

### variable @

Sample as following via @a.

```sql
(root@localhost) [test]>\_> set @a:=0;
Query OK, 0 rows affected (0.00 sec)

(root@localhost) [test]>\_> select @a:=@a+1,TABLE_NAME,TABLE_TYPE,TABLE_ROWS from t1 order by table_name limit 10;
+----------+---------------------------------------+-------------+------------+
| @a:=@a+1 | TABLE_NAME                            | TABLE_TYPE  | TABLE_ROWS |
+----------+---------------------------------------+-------------+------------+
|        1 | ADMINISTRABLE_ROLE_AUTHORIZATIONS     | SYSTEM VIEW |          0 |
|        2 | APPLICABLE_ROLES                      | SYSTEM VIEW |          0 |
|        3 | CHARACTER_SETS                        | SYSTEM VIEW |          0 |
|        4 | CHECK_CONSTRAINTS                     | SYSTEM VIEW |          0 |
|        5 | COLLATIONS                            | SYSTEM VIEW |          0 |
|        6 | COLLATION_CHARACTER_SET_APPLICABILITY | SYSTEM VIEW |          0 |
|        7 | COLUMNS                               | SYSTEM VIEW |          0 |
|        8 | COLUMNS_EXTENSIONS                    | SYSTEM VIEW |          0 |
|        9 | COLUMN_PRIVILEGES                     | SYSTEM VIEW |          0 |
|       10 | COLUMN_STATISTICS                     | SYSTEM VIEW |          0 |
+----------+---------------------------------------+-------------+------------+
10 rows in set, 1 warning (0.00 sec)

(root@localhost) [test]>\_> select @a:=@a+1,TABLE_NAME,TABLE_TYPE,TABLE_ROWS from t1,(select @a:=10) a order by table_name limit 10;
+----------+---------------------------------------+-------------+------------+
| @a:=@a+1 | TABLE_NAME                            | TABLE_TYPE  | TABLE_ROWS |
+----------+---------------------------------------+-------------+------------+
|       11 | ADMINISTRABLE_ROLE_AUTHORIZATIONS     | SYSTEM VIEW |          0 |
|       12 | APPLICABLE_ROLES                      | SYSTEM VIEW |          0 |
|       13 | CHARACTER_SETS                        | SYSTEM VIEW |          0 |
|       14 | CHECK_CONSTRAINTS                     | SYSTEM VIEW |          0 |
|       15 | COLLATIONS                            | SYSTEM VIEW |          0 |
|       16 | COLLATION_CHARACTER_SET_APPLICABILITY | SYSTEM VIEW |          0 |
|       17 | COLUMNS                               | SYSTEM VIEW |          0 |
|       18 | COLUMNS_EXTENSIONS                    | SYSTEM VIEW |          0 |
|       19 | COLUMN_PRIVILEGES                     | SYSTEM VIEW |          0 |
|       20 | COLUMN_STATISTICS                     | SYSTEM VIEW |          0 |
+----------+---------------------------------------+-------------+------------+
10 rows in set, 2 warnings (0.00 sec)

(root@localhost) [test]>\_> select @a:=@a+1,TABLE_NAME,TABLE_TYPE,TABLE_ROWS from t1,(select @a:=0) a order by table_name limit 10;
+----------+---------------------------------------+-------------+------------+
| @a:=@a+1 | TABLE_NAME                            | TABLE_TYPE  | TABLE_ROWS |
+----------+---------------------------------------+-------------+------------+
|        1 | ADMINISTRABLE_ROLE_AUTHORIZATIONS     | SYSTEM VIEW |          0 |
|        2 | APPLICABLE_ROLES                      | SYSTEM VIEW |          0 |
|        3 | CHARACTER_SETS                        | SYSTEM VIEW |          0 |
|        4 | CHECK_CONSTRAINTS                     | SYSTEM VIEW |          0 |
|        5 | COLLATIONS                            | SYSTEM VIEW |          0 |
|        6 | COLLATION_CHARACTER_SET_APPLICABILITY | SYSTEM VIEW |          0 |
|        7 | COLUMNS                               | SYSTEM VIEW |          0 |
|        8 | COLUMNS_EXTENSIONS                    | SYSTEM VIEW |          0 |
|        9 | COLUMN_PRIVILEGES                     | SYSTEM VIEW |          0 |
|       10 | COLUMN_STATISTICS                     | SYSTEM VIEW |          0 |
+----------+---------------------------------------+-------------+------------+
10 rows in set, 2 warnings (0.00 sec)

(root@localhost) [test]>\_>
```

### MAX()

Sample as belowing via sub-query.
- Note the use of `order by` and `limit`
- The efficiency is a bit inefficient, each row needs to be calculated once

```sql
(root@localhost) [test]>\_> select (select count(1) from t1 b where b.table_name <= a.table_name ) as row_num, TABLE_NAME,TABLE_TYPE,TABLE_ROWS from t1 a order by table_name limit 10;
+---------+---------------------------------------+-------------+------------+
| row_num | TABLE_NAME                            | TABLE_TYPE  | TABLE_ROWS |
+---------+---------------------------------------+-------------+------------+
|       1 | ADMINISTRABLE_ROLE_AUTHORIZATIONS     | SYSTEM VIEW |          0 |
|       2 | APPLICABLE_ROLES                      | SYSTEM VIEW |          0 |
|       3 | CHARACTER_SETS                        | SYSTEM VIEW |          0 |
|       4 | CHECK_CONSTRAINTS                     | SYSTEM VIEW |          0 |
|       5 | COLLATIONS                            | SYSTEM VIEW |          0 |
|       6 | COLLATION_CHARACTER_SET_APPLICABILITY | SYSTEM VIEW |          0 |
|       7 | COLUMNS                               | SYSTEM VIEW |          0 |
|       8 | COLUMNS_EXTENSIONS                    | SYSTEM VIEW |          0 |
|       9 | COLUMN_PRIVILEGES                     | SYSTEM VIEW |          0 |
|      10 | COLUMN_STATISTICS                     | SYSTEM VIEW |          0 |
+---------+---------------------------------------+-------------+------------+
10 rows in set (0.01 sec)

(root@localhost) [test]>\_> select (select count(1) from t1 b where b.table_name <= a.table_name ) as row_num, TABLE_NAME,TABLE_TYPE,TABLE_ROWS from t1 a order by table_name limit 9,10;
+---------+--------------------------+-------------+------------+
| row_num | TABLE_NAME               | TABLE_TYPE  | TABLE_ROWS |
+---------+--------------------------+-------------+------------+
|      10 | COLUMN_STATISTICS        | SYSTEM VIEW |          0 |
|      11 | ENABLED_ROLES            | SYSTEM VIEW |          0 |
|      12 | ENGINES                  | SYSTEM VIEW |          0 |
|      13 | EVENTS                   | SYSTEM VIEW |          0 |
|      14 | FILES                    | SYSTEM VIEW |          0 |
|      15 | INNODB_BUFFER_PAGE       | SYSTEM VIEW |          0 |
|      16 | INNODB_BUFFER_PAGE_LRU   | SYSTEM VIEW |          0 |
|      17 | INNODB_BUFFER_POOL_STATS | SYSTEM VIEW |          0 |
|      18 | INNODB_CACHED_INDEXES    | SYSTEM VIEW |          0 |
|      19 | INNODB_CMP               | SYSTEM VIEW |          0 |
+---------+--------------------------+-------------+------------+
10 rows in set (0.01 sec)

(root@localhost) [test]>\_>
```


### Reference

[MySQL](https://www.mysql.com/)

Have a good work&life! 2022/02 via LinHong

