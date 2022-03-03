---
layout: post
title: "MySQL Study 005 - Query unused Index Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL Study 005 - Query unused Index Tips

- List unused indexes






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

### Query unused Index

SQL
```sql
-- 没有被使用的索引
-- list of unused index
select * from schema_unused_indexes where object_schema not in (
'information_schema',
'performance_schema',
'mysql',
'sys'
);

```
Sample:
```

(root@localhost) [(none)]>\_> use sys
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
(root@localhost) [sys]>\_> desc schema_unused_indexes;
+---------------+-------------+------+-----+---------+-------+
| Field         | Type        | Null | Key | Default | Extra |
+---------------+-------------+------+-----+---------+-------+
| object_schema | varchar(64) | YES  |     | NULL    |       |
| object_name   | varchar(64) | YES  |     | NULL    |       |
| index_name    | varchar(64) | YES  |     | NULL    |       |
+---------------+-------------+------+-----+---------+-------+
3 rows in set (0.00 sec)

(root@localhost) [sys]>\_>
(root@localhost) [sys]>\_> select * from schema_unused_indexes where object_schema not in (
    -> 'information_schema',
    -> 'performance_schema',
    -> 'mysql',
    -> 'sys'
    -> );
+---------------+--------------+------------+
| object_schema | object_name  | index_name |
+---------------+--------------+------------+
| employees     | dept_emp     | emp_no     |
| employees     | dept_emp     | dept_no    |
| employees     | dept_manager | emp_no     |
| employees     | dept_manager | dept_no    |
| employees     | salaries     | emp_no     |
| employees     | titles       | emp_no     |
+---------------+--------------+------------+
6 rows in set (0.00 sec)

(root@localhost) [sys]>\_>
```

### Reference

[MySQL](https://www.mysql.com/)


Have a good work&life! 2022/03 via LinHong

