---
layout: post
title: "MySQL Functional Index Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL Functional Index Tips

Database indexes are used to help query performance. Database indexes typically contain information about data in a specific column of the database table. With the introduction of functional indexes in MySQL 8.0.13, we can now create indexes based on the result of an expression or function.

[Functional Indexes in MySQL](https://blogs.oracle.com/mysql/post/functional-indexes-in-mysql)

The Rules
Functional indexes can increase query performance without having to rewrite the query to address any bottlenecks. However, there are some rules that we need to follow.
```
Expressions MUST be contained in parentheses to differentiate them from columns.
    INDEX((col1 + col2)) vs INDEX( col1, col2)
    We can create an index that has functional and non-functional definitions.
        INDEX((col1 + col2), col1)
Functional index definitions cannot contain only column names.
    INDEX ((col1), (col2)) will throw an error.
Functional index definitions are not allowed in foreign key columns.
The index will only be used when a query uses the same expression.
    select count(*) from test_data where col1 - col2 = 0 will NOT use the index we created.
        We would need to create a new index using the expression (col1-col2).
```







### Test Logs

```
mysql [localhost:8020] {msandbox} (test) > select count(*) from test_data;
+----------+
| count(*) |
+----------+
|     2000 |
+----------+
1 row in set (0.05 sec)

mysql [localhost:8020] {msandbox} (test) > select count(*) from test_data where col1 + col2 = 10;
+----------+
| count(*) |
+----------+
|      177 |
+----------+
1 row in set (0.00 sec)

mysql [localhost:8020] {msandbox} (test) > 
mysql [localhost:8020] {msandbox} (test) > desc test_data;
+-------+------+------+-----+---------+----------------+
| Field | Type | Null | Key | Default | Extra          |
+-------+------+------+-----+---------+----------------+
| id    | int  | NO   | PRI | NULL    | auto_increment |
| col1  | int  | YES  |     | NULL    |                |
| col2  | int  | YES  |     | NULL    |                |
+-------+------+------+-----+---------+----------------+
3 rows in set (0.00 sec)

mysql [localhost:8020] {msandbox} (test) > 
mysql [localhost:8020] {msandbox} (test) > 
mysql [localhost:8020] {msandbox} (test) > explain select count(*) from test_data where col1 + col2 = 10\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: test_data
   partitions: NULL
         type: ALL
possible_keys: NULL
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 2000
     filtered: 100.00
        Extra: Using where
1 row in set, 1 warning (0.00 sec)

mysql [localhost:8020] {msandbox} (test) > 
mysql [localhost:8020] {msandbox} (test) > alter table test_data
    ->     add index col_sum((col1 + col2));
Query OK, 0 rows affected (0.05 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql [localhost:8020] {msandbox} (test) > explain select count(*) from test_data where col1 + col2 = 10\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: test_data
   partitions: NULL
         type: ref
possible_keys: col_sum
          key: col_sum
      key_len: 9
          ref: const
         rows: 177
     filtered: 100.00
        Extra: NULL
1 row in set, 1 warning (0.00 sec)

mysql [localhost:8020] {msandbox} (test) > 

```

### Reference 

[Functional Indexes in MySQL](https://blogs.oracle.com/mysql/post/functional-indexes-in-mysql)


Have a good work&life! 2023/01 via LinHong


