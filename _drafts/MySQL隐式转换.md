



###t1###

CREATE TABLE `t1` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `age` int NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `test_json` json NOT NULL,
  `num_dec` decimal(10,0) NOT NULL,
  `num_dou` double NOT NULL,
  `num_flo` float NOT NULL,
  `test_test` text NOT NULL,
  `joinnum` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

###t2###

CREATE TABLE `t2` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `age` int NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `test_json` json NOT NULL,
  `num_dec` decimal(10,0) NOT NULL,
  `num_dou` double NOT NULL,
  `num_flo` float NOT NULL,
  `test_test` text NOT NULL,
  `joinnum` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_joinnum` (`joinnum`)
) ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci






CREATE TABLE `t1` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `age` int NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `test_json` json NOT NULL,
  `num_dec` decimal(10,0) NOT NULL,
  `num_dou` double NOT NULL,
  `num_flo` float NOT NULL,
  `test_test` text NOT NULL,
  `joinnum` bigint NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `t2` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `age` int NOT NULL,
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `test_json` json NOT NULL,
  `num_dec` decimal(10,0) NOT NULL,
  `num_dou` double NOT NULL,
  `num_flo` float NOT NULL,
  `test_test` text NOT NULL,
  `joinnum` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_joinnum` (`joinnum`)
);

#该SQLa.joinnum数据类型为为bigint，b.joinnum数据类型为varchar。存在隐式类型转换，无法使用索引进行关联（因为本文使用8.0，所以走了hash join）。
explain select count(*) from t1 a join t2 b on a.joinnum=b.joinnum;

mysql [localhost:8033] {msandbox} (test) > explain select count(*) from t1 a join t2 b on a.joinnum=b.joinnum;
+----+-------------+-------+------------+-------+---------------+-------------+---------+------+------+----------+---------------------------------------------------------+
| id | select_type | table | partitions | type  | possible_keys | key         | key_len | ref  | rows | filtered | Extra                                                   |
+----+-------------+-------+------------+-------+---------------+-------------+---------+------+------+----------+---------------------------------------------------------+
|  1 | SIMPLE      | a     | NULL       | ALL   | NULL          | NULL        | NULL    | NULL |    1 |   100.00 | NULL                                                    |
|  1 | SIMPLE      | b     | NULL       | index | idx_joinnum   | idx_joinnum | 1022    | NULL |    1 |   100.00 | Using where; Using index; Using join buffer (hash join) |
+----+-------------+-------+------------+-------+---------------+-------------+---------+------+------+----------+---------------------------------------------------------+
2 rows in set, 3 warnings (0.01 sec)

mysql [localhost:8033] {msandbox} (test) > 
mysql [localhost:8033] {msandbox} (test) > show warnings;
+---------+------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Level   | Code | Message                                                                                                                                                                    |
+---------+------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Warning | 1739 | Cannot use ref access on index 'idx_joinnum' due to type or collation conversion on field 'joinnum'                                                                        |
| Warning | 1739 | Cannot use range access on index 'idx_joinnum' due to type or collation conversion on field 'joinnum'                                                                      |
| Note    | 1003 | /* select#1 */ select count(0) AS `count(*)` from `test`.`t1` `a` join `test`.`t2` `b` where (cast(`test`.`a`.`joinnum` as double) = cast(`test`.`b`.`joinnum` as double)) |
+---------+------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
3 rows in set (0.00 sec)

mysql [localhost:8033] {msandbox} (test) > 


# 将a.joinnum使用函数转为char类型，使其走索引。
explain select count(*) from t1 a join t2 b on convert(a.joinnum,char)=b.joinnum;

mysql [localhost:8033] {msandbox} (test) > explain select count(*) from t1 a join t2 b on convert(a.joinnum,char)=b.joinnum;
+----+-------------+-------+------------+------+---------------+-------------+---------+------+------+----------+--------------------------+
| id | select_type | table | partitions | type | possible_keys | key         | key_len | ref  | rows | filtered | Extra                    |
+----+-------------+-------+------------+------+---------------+-------------+---------+------+------+----------+--------------------------+
|  1 | SIMPLE      | a     | NULL       | ALL  | NULL          | NULL        | NULL    | NULL |    1 |   100.00 | NULL                     |
|  1 | SIMPLE      | b     | NULL       | ref  | idx_joinnum   | idx_joinnum | 1022    | func |    1 |   100.00 | Using where; Using index |
+----+-------------+-------+------------+------+---------------+-------------+---------+------+------+----------+--------------------------+
2 rows in set, 1 warning (0.00 sec)

mysql [localhost:8033] {msandbox} (test) > show warnings;
+-------+------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Level | Code | Message                                                                                                                                                                  |
+-------+------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Note  | 1003 | /* select#1 */ select count(0) AS `count(*)` from `test`.`t1` `a` join `test`.`t2` `b` where (cast(`test`.`a`.`joinnum` as char charset utf8mb4) = `test`.`b`.`joinnum`) |
+-------+------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
1 row in set (0.00 sec)

mysql [localhost:8033] {msandbox} (test) > 

转换后结果集不一样

理论依据
https://dev.mysql.com/doc/refman/5.7/en/type-conversion.html

https://dev.mysql.com/doc/refman/8.0/en/type-conversion.html


以下规则描述了比较操作如何发生转换：
```
If one or both arguments are NULL, the result of the comparison is NULL, except for the NULL-safe <=> equality comparison operator. For NULL <=> NULL, the result is true. No conversion is needed.
如果一个或两个参数均为NULL，则比较的结果为NULL，除了NULL-safe <=> 相等比较运算符外。对于NULL <=> NULL，结果为true。无需转换。
If both arguments in a comparison operation are strings, they are compared as strings.
如果比较操作中的两个参数都是字符串，则将它们作为字符串进行比较。
If both arguments are integers, they are compared as integers.
如果两个参数都是整数，则将它们作为整数进行比较。
Hexadecimal values are treated as binary strings if not compared to a number.
如果不与数字比较，则将十六进制值视为二进制字符串。
If one of the arguments is a TIMESTAMP or DATETIME column and the other argument is a constant, the constant is converted to a timestamp before the comparison is performed. This is done to be more ODBC-friendly. This is not done for the arguments to IN(). To be safe, always use complete datetime, date, or time strings when doing comparisons. For example, to achieve best results when using BETWEEN with date or time values, use CAST() to explicitly convert the values to the desired data type.
如果参数之一是a TIMESTAMP或 DATETIMEcolumn，而另一个参数是常量，则在执行比较之前，该常量将转换为时间戳。这样做是为了使ODBC更友好。对于的参数，此操作未完成 IN()。为了安全起见，在进行比较时，请始终使用完整的日期时间，日期或时间字符串。例如，为了在BETWEEN与日期或时间值一起使用时获得最佳结果 ，可使用CAST()将值显式转换为所需的数据类型。
A single-row subquery from a table or tables is not considered a constant. For example, if a subquery returns an integer to be compared to a DATETIME value, the comparison is done as two integers. The integer is not converted to a temporal value. To compare the operands as DATETIME values, use CAST() to explicitly convert the subquery value to DATETIME.
一个或多个表中的单行子查询不视为常量。例如，如果子查询返回要与DATETIME 值进行比较的整数，则比较将作为两个整数完成。整数不转换为时间值。要将操作数作为DATETIME值进行比较 ，请使用 CAST()将子查询值显式转换为DATETIME。
If one of the arguments is a decimal value, comparison depends on the other argument. The arguments are compared as decimal values if the other argument is a decimal or integer value, or as floating-point values if the other argument is a floating-point value.
如果参数之一是十进制值，则比较取决于另一个参数。如果另一个参数是十进制或整数值，则将参数作为十进制值进行比较；如果另一个参数是浮点值，则将参数作为浮点值进行比较。
In all other cases, the arguments are compared as floating-point (real) numbers. For example, a comparison of string and numeric operands takes place as a comparison of floating-point numbers.
在所有其他情况下，将参数作为浮点数（实数）进行比较。例如，将字符串和数字操作数进行比较，将其作为浮点数的比较。
```


避免发生隐式类型转换，隐式转换的类型主要有字段类型不一致、in参数包含多个类型、字符集类型或校对规则不一致等
隐式类型转换可能导致无法使用索引、查询结果不准确等，因此在使用时必须注意
数字类型的建议在字段定义时就定义为int或者bigint，表关联时关联字段必须保持类型、字符集、校对规则都一致
当字符串转换为浮点数时，数字位数至少在17位就会出现问题。
  使用浮点数有时会引起混淆，因为它们是近似值而不是作为精确值存储的。SQL语句中编写的浮点值可能与内部表示的值不同。尝试在比较中将浮点值视为精确值可能会导致问题。它们还受平台或实现依赖性的约束。该 FLOAT和 DOUBLE数据类型都受到这些问题。对于DECIMAL列，MySQL执行的精度为65个十进制数字，这应该可以解决最常见的不准确性问题。
————————————————
版权声明：本文为CSDN博主「_雪辉_」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_42979842/article/details/106458480