---
layout: post
title: "Oracle Install language package for APEX 24.2 Tips"
category: Oracle
tags: Oracle APEX Tips
---

* content
{:toc}

Oracle Install language package for APEX 24.2 Tips


[Oracle APEX 24.2 is now available!](https://apex.oracle.com/)

![apex_laguage]({{ "/files/Oracle/23ai/apex_laguage.png"}})	







### APEX 24.2 Language Install

Laguage sql is in `/home/oracle/apex/builder` folder.

```
bash-4.4$ cd /home/oracle/apex/builder      
bash-4.4$ ls -l
total 42296
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 ar
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 cs
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 da
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 de
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 el
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 es
-rw-r--r-- 1 oracle oinstall 20294595 Jan 10 23:22 f4000.sql
-rw-r--r-- 1 oracle oinstall  1517773 Jan 10 23:22 f4020.sql
-rw-r--r-- 1 oracle oinstall  3857708 Jan 10 23:22 f4050.sql
-rw-r--r-- 1 oracle oinstall   274212 Jan 10 23:22 f4100.sql
-rw-r--r-- 1 oracle oinstall   143550 Jan 10 23:22 f4155.sql
-rw-r--r-- 1 oracle oinstall   515045 Jan 10 23:22 f4300.sql
-rw-r--r-- 1 oracle oinstall  2355426 Jan 10 23:22 f4350.sql
-rw-r--r-- 1 oracle oinstall  5489010 Jan 10 23:22 f4411.sql
-rw-r--r-- 1 oracle oinstall   701766 Jan 10 23:22 f4470.sql
-rw-r--r-- 1 oracle oinstall  4079098 Jan 10 23:22 f4500.sql
-rw-r--r-- 1 oracle oinstall   226994 Jan 10 23:22 f4550.sql
-rw-r--r-- 1 oracle oinstall  1270395 Jan 10 23:22 f4600.sql
-rw-r--r-- 1 oracle oinstall   703864 Jan 10 23:22 f4650.sql
-rw-r--r-- 1 oracle oinstall   382813 Jan 10 23:22 f4700.sql
-rw-r--r-- 1 oracle oinstall   433387 Jan 10 23:22 f4750.sql
-rw-r--r-- 1 oracle oinstall   896838 Jan 10 23:22 f4850.sql
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 fi
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 fr
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 fr-ca
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 he
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 hr
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 hu
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 is
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 it
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 ja
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 ko
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 nl
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 no
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 pl
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 pt
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 pt-br
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 ro
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 ru
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 sk
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 sl
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 sr
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 sr-latn
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 sv
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 th
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 tr
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 uk
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 vi
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 zh-cn
drwxr-xr-x 2 oracle oinstall     4096 Jan 11 09:51 zh-tw
bash-4.4$ cd zh-cn/
bash-4.4$ pwd
/home/oracle/apex/builder/zh-cn
bash-4.4$ 
```

```
docker exec -it ora23ai /bin/bash

export NLS_LANG=American_America.AL32UTF8
cd /home/oracle/apex/builder/zh-cn

sqlplus / as sysdba
SQL> alter session set container=freepdb1;
SQL> select username from dba_users where username like 'APEX%';
SQL> alter session set current_schema=APEX_240200;
SQL> @load_zh-cn.sql

Use the following SQL to uninstall 
@unload_zh-cn.sql 
```

### Referece

[Oracle APEX 24.2 is now available!](https://apex.oracle.com/)

Have a good work&life! 2025/01 via LinHong
