---
layout: post
title: "MySQL Study 008 - user() and current_user() Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL Study 008 - user() and current_user() Tips

- user()
- current_user
  





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

### user and current_user

```
mysql> select user();
+----------------------+
| user()               |
+----------------------+
| test@192.168.56.22 |
+----------------------+
1 row in set (0.00 sec)

mysql> select current_user();
+------------------+
| current_user()   |
+------------------+
| test@192.168.%.% |
+------------------+
1 row in set (0.00 sec)
```

user()是用来显示当前登陆的用户名与它对应的host.
```
Returns the current MySQL user name and host name as a string in the utf8 character set.
```
currrent_user()是用来显示当前登陆用户对应在user表中的哪一个.
```
Returns the user name and host name combination for the MySQL account that the server used to authenticate the current client. 
This account determines your access privileges. The return value is a string in the utf8 character set.
```

### Reference

[MySQL](https://www.mysql.com/)



Have a good work&life! 2022/03 via LinHong

