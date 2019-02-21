---
layout: post
title: "Oracle 18c get SQLID Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}




Oracle 18c get SQLID Tips


Use the following Database env.

	Copyright (c) 1982, 2018, Oracle.  All rights reserved.

	Last Successful login time: Thu Feb 20 2019 01:50:10 -05:00

	Connected to:
	Oracle Database 18c Enterprise Edition Release 18.0.0.0.0 - Production
	Version 18.3.0.0.0









How to get the sql_id even if you can not view v$sql_id?

#### Test01

	SQL> create user test01 identified by oracle;

	User created.

	SQL> grant create table,create session to test01;

	Grant succeeded.
	
	SQL> select * from session_privs;

	PRIVILEGE
	----------------------------------------
	CREATE SESSION
	CREATE TABLE
	SQL>
	SQL> conn test01/oracle@pdb1;
	Connected.
	SQL> desc v$sql
	ERROR:
	ORA-04043: object "SYS"."V_$SQL" does not exist


	SQL> create table t1(id int,text char(20));

	Table created.

	SQL> set linesize window
	SQL> set feedback on sql_id
	SQL> select * from t1;

	no rows selected

	SQL_ID: 27uhu2q2xuu7r
	SQL>

#### Test02

	SQL> conn ssb/ssb@pdb1
	Connected.
	SQL> set linesize window
	SQL> set feedback on sql_id
	SQL> select table_name from user_tables;

	TABLE_NAME
	--------------------------------------------------------------------------------------------------------------------------------
	LINEORDER
	PART
	CUSTOMER
	SUPPLIER
	DATE_DIM

	5 rows selected.

	SQL_ID: cpm405mcw3bkj
	SQL> select count(*) from part;

	  COUNT(*)
	----------
		600000

	1 row selected.

	SQL_ID: fak7hbzts4535
	SQL> show feedback
	FEEDBACK ON for 1 or more rows SQL_ID ON
	SQL>

#### Ref

[SQL*Plus Quick Reference](https://docs.oracle.com/en/database/oracle/oracle-database/18/sqpqr/index.html#SQPQR101)

[User's Guide and Reference](https://docs.oracle.com/en/database/oracle/oracle-database/18/sqpug/index.html)


Have a good work&life! 2019/02 via LinHong



