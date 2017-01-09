---
layout: post
title: "[原创]Oracle id和密码忽略大小写连接参数"
date:   2016-12-08 07:30:00
category: Oracle
tags: Oracle 
---

* content
{:toc}


Oracle 隐含参数：_case_sensitive_logon 的事例





### 隐含参数：_case_sensitive_logon

开关： True/False 默认是True

状态： Spfile

如下：


	SYS@PROD1> conn lyn/Oracle
	ERROR:
	ORA-01017: invalid username/password; logon denied


	Warning: You are no longer connected to ORACLE.
	@> conn / as sysdba
	Connected.
	SYS@PROD1> alter system set _case_sensitive_logon=false;
	alter system set _case_sensitive_logon=false
					 *
	ERROR at line 1:
	ORA-00911: invalid character


	SYS@PROD1> alter system set "_case_sensitive_logon"=false;
	alter system set "_case_sensitive_logon"=false
					 *
	ERROR at line 1:
	ORA-02095: specified initialization parameter cannot be modified


	SYS@PROD1>  alter system set "_case_sensitive_logon"=false scope=spfile;

	System altered.

	SYS@PROD1> startup force;
	ORACLE instance started.

	Total System Global Area  418484224 bytes
	Fixed Size                  1345352 bytes
	Variable Size             281020600 bytes
	Database Buffers          130023424 bytes
	Redo Buffers                6094848 bytes
	Database mounted.
	Database opened.
	SYS@PROD1> conn lyn/OraclE
	Connected.
	LYN@PROD1> 


#### 注意点

1，默认值是True

2，修改时要加双引号

3，修改状态范围是Spfile，需要重启生效



