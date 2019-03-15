---
layout: post
title: "Oracle 19c Schema User Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}



Oracle 19c Schema User Tips


One nice new feature of Oracle Database 18c is that schemas can be created without a password. These are called “Schema Only Accounts“. This new functionality is pretty simple and is a nice step forward that can allow administrators to further secure their databases and protect their applications.



从19c开始，大部分Oracle-provideds chemas，除了SYS，SYSTEM以及Sample Schema User Accounts都是Schema Only Account。

这些帐户都是在没有密码的情况下创建的，好处是管理员无需周期性的维护这些密码，同时也降低了攻击者使用默认密码侵入这些帐户的安全风险。

我们可以通过dba_users数据字典的authentication_type字段来判断，如果是NONE，表示该account是Schema Only的。

当我们确实有需要的时候，可以为这些帐户分配密码，但是为了更好的安全性，Oracle 建议您使用完毕后将它们再设置为Schema Only。

这种用户在云环境下使用的场景特别多。










### Test Case

测试场景： 创建了app_user01，这用户具有创建表的权限，但因为是schema only用户，不能远程连接

	Connected to:
	Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
	Version 19.2.0.0.0

	SYSTEM@pdb1> set timing off
	SYSTEM@pdb1> create user app_user01 no authentication;

	User created.

	SYSTEM@pdb1> col username for a40
	SYSTEM@pdb1> col password for a20
	SYSTEM@pdb1> set linesize 1000
	SYSTEM@pdb1> set pagesize 1000
	SYSTEM@pdb1> SELECT username, password, password_versions, account_status, authentication_type FROM dba_users WHERE username like '%APP_USER%';

	USERNAME                                 PASSWORD             PASSWORD_VERSIONS ACCOUNT_STATUS                   AUTHENTI
	---------------------------------------- -------------------- ----------------- -------------------------------- --------
	APP_USER01                                                                      OPEN                             NONE

	SYSTEM@pdb1>

	SYSTEM@pdb1> grant create session , create table to app_user01;

	Grant succeeded.

	SYSTEM@pdb1>

创建具有create session 的proxy用户:proxy_user01,赋予app_user01用户具有通过proxy_user01进行连接的权限

	SYSTEM@pdb1> create user proxy_user01 identified by oracle;

	User created.

	SYSTEM@pdb1> grant create session to proxy_user01;

	Grant succeeded.

	SYSTEM@pdb1> alter user app_user01 grant connect through proxy_user01;

	User altered.

	SYSTEM@pdb1>

测试连接：


	[oracle@localhost ~]$ sqlplus proxy_user01[app_user01]/oracle@pdb1

	SQL*Plus: Release 19.0.0.0.0 - Production on Fri Mar 13 08:28:30 2019
	Version 19.2.0.0.0
	Copyright (c) 1982, 2018, Oracle.  All rights reserved.
	Connected to:
	Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
	Version 19.2.0.0.0

	APP_USER01@pdb1> show user;
	USER is "APP_USER01"
	APP_USER01@pdb1> create table tab01(id int);

	Table created.

	APP_USER01@pdb1>

	APP_USER01@pdb1> insert into tab01 values(1);
	insert into tab01 values(1)
	*
	ERROR at line 1:
	ORA-01950: no privileges on tablespace 'USERS'

	APP_USER01@pdb1>

### Some Tips

关于Schema Only Account的一些说明：

	1.可以是 administrator 和 non-administratoraccounts / Schema only accounts can be used for both administrator and non-administrator accounts.
    
	2.这种account只能在database instance中创建，不支持 ASM instance / Schema only accounts can be created for database instance only. Same is not valid for ASM environment.
    
	3.可以授予 system privileges (比如CREATE ANY TABLE)和管理员角色（比如DBA） / You can grant system privileges ( create ant table)  and admin roles (like DBA) to schema only accounts.
    tips：18c中Schema Only Account不能拥有SYSDBA,SYSOPER, SYSBACKUP, SYSKM, SYSASM, SYSRAC, SYSDG这些管理权限，19c中取消了这一限制。 /   But in 18c, administrative privileges like sysdba/sysoper/sysasm can’t be granted to schema only accounts.
	
	4.可以创建对象 如tables 、procedures等（根据所授权限决定） / Can create any objects according to the privileges.
    
	5.可以配置通过 single session proxy的方式连接访问 / Can connect by proxy user.
    
	6.不能通过 data base link 使用 / Schema only accounts can’t connect through db links.


Have a good work&life! 2019/03 via LinHong



