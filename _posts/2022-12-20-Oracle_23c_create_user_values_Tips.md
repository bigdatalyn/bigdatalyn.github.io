---
layout: post
title: "Oracle 23c create user values Tips"
category: Oracle
tags: Oracle 23c Tips
---

* content
{:toc}

Oracle 23c create user values Tips










### create user via same password

```
SYS@cdb1> alter session set container=pdb1;

Session altered.

SYS@cdb1> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 3 PDB1 			  READ WRITE NO
SYS@cdb1> create user lin1 identified by oracle123;

User created.

SYS@cdb1> grant create session,connect,resource to lin1;

Grant succeeded.

SYS@cdb1> select name,password,spare4 from user$ where name='LIN1';

NAME				PASSWORD SPARE4
------------------------------- -------- ----------------------------------------------------------------------------------------------------
LIN1					 S:5C99D4EC0ECB789E3F6C20FD6540CBEC53E0D6F1DD9B549183E0F76FD6E8;T:8B2315DEEE500DB9A233B8CC58B25EC9E17
					 F1A59D8DEEF0D4CA7D6B3479B3C4818E3A1C19245B93A1104146CB5F4CD76A45F29398E1488A4FFC1135327F7BEA7A7C896C
					 413897D77E4C682713370E2D3


SYS@cdb1> create user lin2 identified by values 'S:5C99D4EC0ECB789E3F6C20FD6540CBEC53E0D6F1DD9B549183E0F76FD6E8;T:8B2315DEEE500DB9A233B8CC58B25EC9E17F1A59D8DEEF0D4CA7D6B3479B3C4818E3A1C19245B93A1104146CB5F4CD76A45F29398E1488A4FFC1135327F7BEA7A7C896C413897D77E4C682713370E2D3';

User created.

SYS@cdb1> grant create session,connect,resource to lin2;

Grant succeeded.

SYS@cdb1>  conn lin1/oracle123@pdb1
Connected.
LIN1@pdb1> conn lin2/oracle123@pdb1
Connected.
LIN2@pdb1> 

```



### Reference 

[Oracle Database 19c / SQL Language Reference/ CREATE USER](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CREATE-USER.html)


Have a good work&life! 2022/12 via LinHong


