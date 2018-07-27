---
layout: post
title: "Oracle 12c 新特性 max_string_size Tips"
category: Oracle
tags: Oracle 12c
---

* content
{:toc}



Oracle 12c 新特性 max_string_size Tips









	SYS@PRODCDB1> show parameter max_string_size

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	max_string_size                      string      STANDARD
	SYS@PRODCDB1> 

控制扩展数据类型列从4000/2000字节变为32767(32K)字节

sys用户直接可以使用，其他用户需要执行修改此参数为: EXTENDED

需要重启并执行脚本

	SQL> show parameter max_string_size
	SQL> alter system set max_string_size=extended scope=spfile;
	SQL> shu immediate;
	SQL> startup upgrade
	SQL> exit;

	$cd $ORACLE_HOME/rdbms/admin
	$mkdir /tmp/uk132k_output
	$$ORACLE_HOME/perl/bin/perl $ORACLE_HOME/rdbms/admin/catcon.pl -u sys -d $ORACLE_HOME/rdbms/admin -l '/tmp/uk132k_output' -b utl32k_output utl32k.sql

	SQL> shu immediate;
	SQL> startup

	$$ORACLE_HOME/perl/bin/perl $ORACLE_HOME/rdbms/admin/catcon.pl -u sys -d $ORACLE_HOME/rdbms/admin -l '/tmp/uk132k_output' -b utlrp_output utlrp.sql

	SQL> show parameter max_string_size

另外需要考虑字符集: 如果字符集是AL16UTF16，双字节为一个字符（如:中文）的情况下，最大列是:32767/2 = 16383 字节
超过最大长度，创建对象时候： ORA-00910 错误




To be continue....

Have a good life! 2018/07 via LinHong


