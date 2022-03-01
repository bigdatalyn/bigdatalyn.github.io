---
layout: post
title: "MySQL Study 001 - Install Tips"
category: MySQL
tags: MySQL Tips
---

* content
{:toc}

MySQL Study 001 - Install Tips

- MySQL 5.6/5.7 Install Tips





### Env

```
[root@ol8-19c ~]# cat /etc/redhat-release
Red Hat Enterprise Linux release 8.4 (Ootpa)
[root@ol8-19c ~]#
```

### MySQL 5.6/5.7 Install Tips

Intall log Tips:
```
[root@ol8-19c ~]# groupadd mysql
[root@ol8-19c ~]# useradd -r -g mysql -s /bin/false mysql
[root@ol8-19c ~]# cd /usr/local
[root@ol8-19c local]# tar zxvf /root/mysql-5.6.51-linux-glibc2.12-x86_64.tar.gz

[root@ol8-19c local]# ln -s mysql-5.6.51-linux-glibc2.12-x86_64 mysql
[root@ol8-19c local]# cd mysql
[root@ol8-19c mysql]# vim /etc/my.cnf
[root@ol8-19c mysql]#
[root@ol8-19c mysql]# cat /etc/my.cnf
[mysql]
prompt=(\\u@\\h) [\\d\]>\\_

[mysqld]
user=mysql
port=3307
datadir=/mdata/mysql_test_data
log_error=mysql_5.6_error.log
[root@ol8-19c mysql]# mkdir -p /mdata/mysql_test_data
[root@ol8-19c mysql]# chown mysql:mysql -R /mdata
[root@ol8-19c mysql]# chmod 750 -R /mdata/
[root@ol8-19c mysql]#
[root@ol8-19c mysql]# scripts/mysql_install_db --user=mysql

To start mysqld at boot time you have to copy
support-files/mysql.server to the right place for your system

PLEASE REMEMBER TO SET A PASSWORD FOR THE MySQL root USER !
To do so, start the server, then issue the following commands:

  ./bin/mysqladmin -u root password 'new-password'
  ./bin/mysqladmin -u root -h ol8-19c password 'new-password'

Alternatively you can run:

  ./bin/mysql_secure_installation

which will also give you the option of removing the test
databases and anonymous user created by default.  This is
strongly recommended for production servers.

See the manual for more instructions.

You can start the MySQL daemon with:

  cd . ; ./bin/mysqld_safe &

You can test the MySQL daemon with mysql-test-run.pl

  cd mysql-test ; perl mysql-test-run.pl

Please report any problems at http://bugs.mysql.com/


[root@ol8-19c mysql]# bin/mysqld_safe --user=mysql &
[1] 3651
[root@ol8-19c mysql]# 220223 15:33:21 mysqld_safe Logging to '/mdata/mysql_test_data/mysql_5.6_error.log'.
220223 15:33:21 mysqld_safe Starting mysqld daemon with databases from /mdata/mysql_test_data

[root@ol8-19c mysql]# netstat -anltp | grep mysql
tcp6       0      0 :::3307                 :::*                    LISTEN      3798/mysqld
[root@ol8-19c mysql]#cd
[root@ol8-19c ~]# vi .bashrc
[root@ol8-19c ~]#
[root@ol8-19c ~]# cat .bashrc
# .bashrc

# User specific aliases and functions

alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

export PATH=/usr/local/mysql/bin:$PATH

[root@ol8-19c ~]# source .bashrc
[root@ol8-19c ~]#
[root@ol8-19c ~]# mysql -uroot
mysql: error while loading shared libraries: libncurses.so.5: cannot open shared object file: No such file or directory
[root@ol8-19c ~]# yum install libncurses* -y
~
[root@ol8-19c ~]# mysql -uroot
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 1
Server version: 5.6.51 MySQL Community Server (GPL)

Copyright (c) 2000, 2021, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

(root@localhost) [(none)]>\_>
```

Start mysql after OS start.
```
[root@ol8-19c init.d]# chkconfig --add mysql.server
[root@ol8-19c init.d]# chkconfig --list

Note: This output shows SysV services only and does not include native
      systemd services. SysV configuration data might be overridden by native
      systemd configuration.

      If you want to list systemd services use 'systemctl list-unit-files'.
      To see services enabled on particular target use
      'systemctl list-dependencies [target]'.

dbora          	0:off	1:off	2:on	3:on	4:on	5:on	6:off
mysql.server   	0:off	1:off	2:on	3:on	4:on	5:on	6:off
[root@ol8-19c init.d]#
```

Start/Stop/Status mysql.

```
[root@ol8-19c ~]# /etc/init.d/mysql.server status
 SUCCESS! MySQL running (3798)
[root@ol8-19c ~]# /etc/init.d/mysql.server restart
Shutting down MySQL..220223 15:46:47 mysqld_safe mysqld from pid file /mdata/mysql_test_data/ol8-19c.pid ended
 SUCCESS!
Starting MySQL. SUCCESS!
[1]+  Done                    bin/mysqld_safe --user=mysql  (wd: /usr/local/mysql)
(wd now: ~)
[root@ol8-19c ~]# /etc/init.d/mysql.server status
 SUCCESS! MySQL running (52493)
[root@ol8-19c ~]#
[root@ol8-19c ~]# ps -ef | grep mysql
root       52333       1  0 15:46 pts/0    00:00:00 /bin/sh /usr/local/mysql/bin/mysqld_safe --datadir=/mdata/mysql_test_data --pid-file=/mdata/mysql_test_data/ol8-19c.pid
mysql      52493   52333  1 15:46 pts/0    00:00:00 /usr/local/mysql/bin/mysqld --basedir=/usr/local/mysql --datadir=/mdata/mysql_test_data --plugin-dir=/usr/local/mysql/lib/plugin --user=mysql --log-error=mysql_5.6_error.log --pid-file=/mdata/mysql_test_data/ol8-19c.pid --port=3307
root       52525    2920  0 15:47 pts/0    00:00:00 grep --color=auto mysql
[root@ol8-19c ~]#
```

### Reference

[2.2 Installing MySQL on Unix/Linux Using Generic Binaries](https://dev.mysql.com/doc/refman/5.6/en/binary-installation.html)


Have a good work&life! 2022/02 via LinHong

