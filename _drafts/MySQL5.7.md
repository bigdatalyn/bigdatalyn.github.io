

dbdeployer deploy single 5.7
cd sandboxes/msb_5_7_26


/etc/my.cnf
->skip-grant-tables

update mysql.user set authentication_string=password('mysql') where user='root';
flush privileges;

grant all privileges on *.* to 'root'@'%' identified by 'mysql' with grant option;
flush privileges;


ps -ef | grep mysql
mysql -uroot -S/tmp/mysql_sandbox5726.sock -p

firewall-cmd --zone=public --add-port=5727/tcp --permanent
firewall-cmd --reload


[root@ol8mysql01 msb_5_7_26]# cat my.sandbox.cnf  | grep -v ^$ | grep -v ^#
[mysql]
prompt='mysql [\h:5727] {\u} (\d) > '
[client]
user = root
password = mysql 
port               = 5727
socket             = /tmp/mysql_sandbox5727.sock
[mysqld]
user               = root
port               = 5727
socket             = /tmp/mysql_sandbox5727.sock
basedir            = /root/sandboxes/mysql_base/5.7.26
datadir            = /root/sandboxes/msb_5_7_26/data
tmpdir             = /root/sandboxes/msb_5_7_26/tmp
pid-file           = /root/sandboxes/msb_5_7_26/data/mysql_sandbox5727.pid
bind-address       = 127.0.0.1
report-host=single-5727
report-port=5727
log-error=/root/sandboxes/msb_5_7_26/data/msandbox.err
[root@ol8mysql01 msb_5_7_26]# 

bind-address       = 127.0.0.1

[MySQL远程连接ERROR 2003 (HY000):Can't connect to MySQL server on'XXXXX'(111) 的问题](https://blog.csdn.net/sqlquan/article/details/99844820)

```
2，排查可能由于85上my.cnf里配置了skip_networking或者bind_address，只允许本地socket连接
2.1 在[mysqld]下设置skip_networking,
知识说明： 这使用MySQL只能通过本机Socket连接(socket连接也是本地连接的默认方式），放弃对TCP/IP的监听
当然也不让本地java程序连接MySQL(Connector/J只能通过TCP/IP来连接）。
2.2 可能使用了bind_address=127.0.0.1(当然也可以是其他ip)
[mysqld]
bind_address=127.0.0.1
知识说明：这种情况可以TCP/IP连接
通过查看了my.cnf文件，以上两个都是没设置的，排除掉这两种情况
```

把bind-address注释掉，重启mysql
telnet和远程连接都OK

```
[root@ol8mysql01 ~]# telnet 192.168.56.130 5727
Trying 192.168.56.130...
telnet: connect to address 192.168.56.130: Connection refused
[root@ol8mysql01 ~]# mysql -uroot -pmysql -h192.168.56.130 -P5727
mysql: [Warning] Using a password on the command line interface can be insecure.
ERROR 2003 (HY000): Can't connect to MySQL server on '192.168.56.130:5727' (111)
[root@ol8mysql01 ~]# 
[root@ol8mysql01 ~]# 
[root@ol8mysql01 ~]# 
[root@ol8mysql01 ~]# mysql -uroot -pmysql -h192.168.56.130 -P5727
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.26 MySQL Community Server (GPL)

Copyright (c) 2000, 2023, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> exit
Bye
[root@ol8mysql01 ~]# 
[root@ol8mysql01 ~]# 
[root@ol8mysql01 ~]# telnet 192.168.56.130 5727
Trying 192.168.56.130...
Connected to 192.168.56.130.
Escape character is '^]'.
J
kAm` 1S?mysql_native_password^CConnection closed by foreign host.
[root@ol8mysql01 ~]# 
```



### 索引组织表

Index Organized Table 

- 索引组织起来的表
- 根据主键顺序组织存放的

主键:
- Innodb 每张表都哟一个主键
- 表中有一个 非空唯一索引，即为主键
- 多个非空唯一索引，选第一个定义的索引为主键
- 若没有非空唯一索引，自动创建一个6字节为主键


```
mysql [localhost:8032] {msandbox} (test) > create table z(a int not null, b int null, c int not null,d int not null, unique key(b),unique key(d),unique key(c));
Query OK, 0 rows affected (0.05 sec)

mysql [localhost:8032] {msandbox} (test) > show create table z\G
*************************** 1. row ***************************
       Table: z
Create Table: CREATE TABLE `z` (
  `a` int NOT NULL,
  `b` int DEFAULT NULL,
  `c` int NOT NULL,
  `d` int NOT NULL,
  UNIQUE KEY `d` (`d`),
  UNIQUE KEY `c` (`c`),
  UNIQUE KEY `b` (`b`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
1 row in set (0.00 sec)

mysql [localhost:8032] {msandbox} (test) > desc z
    -> ;
+-------+------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+-------+------+------+-----+---------+-------+
| a     | int  | NO   |     | NULL    |       |
| b     | int  | YES  | UNI | NULL    |       |
| c     | int  | NO   | UNI | NULL    |       |
| d     | int  | NO   | PRI | NULL    |       |
+-------+------+------+-----+---------+-------+
4 rows in set (0.01 sec)

mysql [localhost:8032] {msandbox} (test) > 
```

### B+树

索引组织表的算法
