---
layout: post
title: "MySQL Study 004 - Query table without primary key Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL Study 004 - Query table without primary key Tips

- Query table without primary key 
- The found non-primary key table splices out the SQL of the new primary key





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

### Query mysql table without primary key

```
-- 查询mysql没有主键的表
-- Query mysql table without primary key
select table_schema, table_name
  from information_schema.tables
 where table_name not in (select distinct table_name
                            from information_schema.columns
                           where column_key = "PRI")
   AND table_schema not in
       ('mysql', 'information_schema', 'sys', 'performance_schema');


-- 查找某个库中无主键的表（有唯一键无主键的表也会被查出）
-- Query mysql table without primary key

SELECT
    t1.table_schema,
    t1.table_name
FROM
    information_schema.TABLES t1
LEFT OUTER JOIN information_schema.TABLE_CONSTRAINTS t2 ON t1.table_schema = t2.TABLE_SCHEMA
AND t1.table_name = t2.TABLE_NAME
AND t2.CONSTRAINT_NAME IN ('PRIMARY')
WHERE
    t2.table_name IS NULL
AND t1.table_type = 'BASE TABLE'
AND t1.TABLE_SCHEMA = 'test';

SELECT
    t1.table_schema,
    t1.table_name
FROM
    information_schema.TABLES t1
LEFT OUTER JOIN information_schema.TABLE_CONSTRAINTS t2 ON t1.table_schema = t2.TABLE_SCHEMA
AND t1.table_name = t2.TABLE_NAME
AND t2.CONSTRAINT_NAME IN ('PRIMARY')
WHERE
    t2.table_name IS NULL
AND t1.table_type = 'BASE TABLE'
AND t1.TABLE_SCHEMA NOT IN (
    'information_schema',
    'performance_schema',
    'mysql',
    'sys'
);

```

### Add primary key for tables

```
-- 为表 tb1 新增自增ID字段作为主键
ALTER TABLE tb1 ADD COLUMN inc_id INT UNSIGNED NOT NULL auto_increment COMMENT 'auto increment primmary key' PRIMARY KEY FIRST;

-- 查找到的无主键表 拼接出新增主键的SQL
-- The found non-primary key table splices out the SQL of the new primary key
SELECT
CONCAT('ALTER TABLE ',t1.table_schema,'.',t1.table_name,' ADD COLUMN inc_id INT UNSIGNED NOT NULL auto_increment COMMENT \'auto increment primmary key\' PRIMARY KEY FIRST;')
FROM
    information_schema.TABLES t1
LEFT OUTER JOIN information_schema.TABLE_CONSTRAINTS t2 ON t1.table_schema = t2.TABLE_SCHEMA
AND t1.table_name = t2.TABLE_NAME
AND t2.CONSTRAINT_NAME IN ('PRIMARY')
WHERE
    t2.table_name IS NULL
AND t1.table_type = 'BASE TABLE'
AND t1.TABLE_SCHEMA NOT IN (
    'information_schema',
    'performance_schema',
    'mysql',
    'sys'
) ;

```

### Reference

[MySQL](https://www.mysql.com/)


Have a good work&life! 2022/03 via LinHong

