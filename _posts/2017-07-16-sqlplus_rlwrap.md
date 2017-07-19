---
layout: post
title: "[原创]sqlplus之rlwrap插件"
category: Oracle
tags: rlwrap
---

* content
{:toc}



[原创]sqlplus之rlwrap插件

sqlplus中不能上下翻，打错字等需要编辑等都比较麻烦，虽然现在12c也支持history的命令了。







### 下载

[tar.gz](https://fossies.org/linux/privat/rlwrap-0.42.tar.gz)

### 安装&配置

tar -zxvf XXXXX.tar.gz

./configure -q 

** 选项q: 表示静默不打印

make && make install


	[root@databasevm oracle]# chmod a+x rlwrap-0.42.tar.gz 
	[root@databasevm oracle]# tar -zxvf rlwrap-0.42.tar.gz 
	rlwrap-0.42/
	rlwrap-0.42/PLEA
	rlwrap-0.42/tools/
	~省略~
	rlwrap-0.42/filters/template
	rlwrap-0.42/filters/paint_prompt
	rlwrap-0.42/Makefile.in
	rlwrap-0.42/AUTHORS
	[root@databasevm oracle]# cd rlwrap-0.42/                                                                         
	[root@databasevm rlwrap-0.42]# ls -ltr
	total 428
	-rw-r--r--. 1 1001 users    310 Sep 11  2014 TODO
	-rw-r--r--. 1 1001 users   1394 Sep 11  2014 PLEA
	-rw-r--r--. 1 1001 users   1272 Sep 11  2014 Makefile.am
	-rw-r--r--. 1 1001 users  17992 Sep 11  2014 COPYING
	-rw-r--r--. 1 1001 users    105 Sep 11  2014 ChangeLog
	-rw-r--r--. 1 1001 users   2965 Sep 11  2014 BUGS
	-rw-r--r--. 1 1001 users    642 Sep 18  2014 AUTHORS
	-rw-r--r--. 1 1001 users   4083 Nov 13  2014 INSTALL
	-rw-r--r--. 1 1001 users  19465 Nov 13  2014 NEWS
	-rw-r--r--. 1 1001 users  14334 Nov 14  2014 configure.ac
	-rw-r--r--. 1 1001 users  41927 Nov 14  2014 aclocal.m4
	-rwxr-xr-x. 1 1001 users 237531 Nov 14  2014 configure
	-rw-r--r--. 1 1001 users  40976 Nov 14  2014 Makefile.in
	-rw-r--r--. 1 1001 users   7411 Nov 14  2014 config.h.in
	-rw-r--r--. 1 1001 users   3113 Nov 14  2014 README
	drwxr-xr-x. 2 1001 users   4096 Nov 14  2014 tools
	drwxr-xr-x. 2 1001 users     36 Nov 14  2014 test
	drwxr-xr-x. 2 1001 users   4096 Nov 14  2014 src
	drwxr-xr-x. 2 1001 users   4096 Nov 14  2014 filters
	drwxr-xr-x. 2 1001 users     62 Nov 14  2014 doc
	drwxr-xr-x. 2 1001 users     36 Nov 14  2014 completions
	[root@databasevm rlwrap-0.42]# ./configure -q
	configure: WARNING: No termcap nor curses library found
	configure: error: 
	You need the GNU readline library(ftp://ftp.gnu.org/gnu/readline/ ) to build
	this program!

	[root@databasevm rlwrap-0.42]# 


报错：You need the GNU readline library(ftp://ftp.gnu.org/gnu/readline/ ) to build 	this program!

通过 yum -y install readline-devel 解决。(如下)

	[root@databasevm rlwrap-0.42]#  yum -y install readline-devel
	Loaded plugins: langpacks, ulninfo
	adobe-linux-x86_64                                                                         | 2.9 kB  00:00:00     
	~省略~
	Dependency Installed:
	  ncurses-devel.x86_64 0:5.9-13.20130511.el7                                                                      

	Complete!
	[root@databasevm rlwrap-0.42]#

重新安装

	[root@databasevm rlwrap-0.42]# ./configure -q
	Will rlwrap find command's working directory under /proc/<commands pid>/cwd? let's see...



	Now do:
		make (or gmake)  to build rlwrap
		make check       for instructions how to test it
		make install     to install it

	[root@databasevm rlwrap-0.42]#
	[root@databasevm rlwrap-0.42]# make && make install                                                               
	make  all-recursive
	make[1]: Entering directory `/home/oracle/rlwrap-0.42'
	Making all in doc
	~省略~
	chmod a+x /usr/local/share/rlwrap/filters/* 
	make[3]: Leaving directory `/home/oracle/rlwrap-0.42'
	make[2]: Leaving directory `/home/oracle/rlwrap-0.42'
	make[1]: Leaving directory `/home/oracle/rlwrap-0.42'
	[root@databasevm rlwrap-0.42]#
	
没有报错：

	[root@databasevm rlwrap-0.42]# which rlwrap
	/usr/local/bin/rlwrap
	[root@databasevm rlwrap-0.42]#

配置
	
	[oracle@databasevm ~]$ cat .bashrc | tail -1                                                                      
	alias sqlplus='rlwrap sqlplus'
	[oracle@databasevm ~]$ source .bashrc                                                                             
	[oracle@databasevm ~]$ which sqlplus
	alias sqlplus='rlwrap sqlplus'
			/usr/local/bin/rlwrap
	[oracle@databasevm ~]$ 

### 测试

	[oracle@databasevm ~]$ sqlplus / as sysdba

	SQL*Plus: Release 12.2.0.1.0 Production on Wed Jul 16 22:26:15 2017

	Copyright (c) 1982, 2016, Oracle.  All rights reserved.

																													  
	Connected to:
	Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production

	SQL> show pdbs;                                                                                                   

		CON_ID CON_NAME                       OPEN MODE  RESTRICTED
	---------- ------------------------------ ---------- ----------
			 2 PDB$SEED                       READ ONLY  NO
			 3 ORCLPDB1                       READ WRITE NO
	SQL>   
	SQL> set hist on                                                                                                  
	SQL> hist                                                                                                         
	SP2-1651: History list is empty.
	SQL> show pdbs                                                                                                    

		CON_ID CON_NAME                       OPEN MODE  RESTRICTED
	---------- ------------------------------ ---------- ----------
			 2 PDB$SEED                       READ ONLY  NO
			 3 ORCLPDB1                       READ WRITE NO
	SQL> hist                                                                                                         
	  1  show pdbs

	SQL> hist 1 run                                                                                                   

		CON_ID CON_NAME                       OPEN MODE  RESTRICTED
	---------- ------------------------------ ---------- ----------
			 2 PDB$SEED                       READ ONLY  NO
			 3 ORCLPDB1                       READ WRITE NO
	SQL>                                                  

	可以跟hist命令结合起来使用

~完工~	

