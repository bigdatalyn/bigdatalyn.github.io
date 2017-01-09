---
layout: post
title: "[原创]Oracle数据仓库"
date:   2016-10-02 19:30:00
description: "

"
category: Oracle
excerpt: Oracle
code: Oracle
tags: Oracle 
---

* content
{:toc}


Oracle数据仓库设计涉及到的概念





### Oracle数据仓库汇总



![思维导图-Warehouse]({{ "/files/Oracle/warehouse.png"}})


[思维导图-Download]({{ "/files/Oracle/Warehouse.pdf"}})


### FGA 细粒度审计

数据仓库中，海量数据量中，如何对表中某列数据就行审计管理？


可通过如下sample例子了解FGA的功能


#### 追加一个policy

对HR.EMPLOYEES表中SALARY列进行查询，并且salary有数据的话，就行审计记录


	SYS@BIGDATA> @1

	PL/SQL procedure successfully completed.

	SYS@BIGDATA> 
	SYS@BIGDATA> get1
	  1  BEGIN
	  2  DBMS_FGA.ADD_POLICY (
	  3     object_schema      =>  'HR',
	  4     object_name        =>  'EMPLOYEES',
	  5     policy_name        =>  'mypolicy1',
	  6     audit_condition    =>  'SALARY IS NOT NULL',
	  7     audit_column       =>  'SALARY',
	  8     handler_schema     =>   NULL,
	  9     handler_module     =>   NULL,
	 10     enable             =>   TRUE,
	 11     statement_types    =>  'SELECT',
	 12     audit_trail        =>   DBMS_FGA.DB + DBMS_FGA.EXTENDED,
	 13     audit_column_opts  =>   DBMS_FGA.ANY_COLUMNS);
	 14* END;
	SYS@BIGDATA> 

#### 测试用户创建


	SYS@BIGDATA> create user lyn identified by oracle account unlock;

	User created.

	SYS@BIGDATA> grant dba to lyn;

	Grant succeeded.

	SYS@BIGDATA>  

#### 测试并验证

	SYS@BIGDATA> conn lyn/oracle
	Connected.
	LYN@BIGDATA> select * from hr.employees where employee_id=146;

	EMPLOYEE_ID FIRST_NAME           LAST_NAME                 EMAIL                     PHONE_NUMBER         HIRE_DATE JOB_ID         SALARY COMMISSION_PCT MANAGER_ID DEPARTMENT_ID
	----------- -------------------- ------------------------- ------------------------- -------------------- --------- ---------- ---------- -------------- ---------- -------------
		146 Karen                Partners                  KPARTNER                  011.44.1344.467268   08-JAN-94 SA_MAN          13500             .3        100            80

	LYN@BIGDATA> 
	LYN@BIGDATA> conn / as sysdba
	Connected.
	SYS@BIGDATA>
	SYS@BIGDATA> select POLICYNAME,lSQLTEXT,SESSIONID,TIMESTAMP#, USER$GUID from fga_log$ where POLICYNAME='MYPOLICY1';

	POLICYNAME                     LSQLTEXT                                                                          SESSIONID TIMESTAMP USER$GUID
	------------------------------ -------------------------------------------------------------------------------- ---------- --------- --------------------------------
	MYPOLICY1                      select * from hr.employees where employee_id=146                                     340237

	SYS@BIGDATA> 


#### DBMS_FGA的内容

	SYS@BIGDATA> desc hr.employees
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 EMPLOYEE_ID                               NOT NULL NUMBER(6)
	 FIRST_NAME                                         VARCHAR2(20)
	 LAST_NAME                                 NOT NULL VARCHAR2(25)
	 EMAIL                                     NOT NULL VARCHAR2(25)
	 PHONE_NUMBER                                       VARCHAR2(20)
	 HIRE_DATE                                 NOT NULL DATE
	 JOB_ID                                    NOT NULL VARCHAR2(10)
	 SALARY                                             NUMBER(8,2)
	 COMMISSION_PCT                                     NUMBER(2,2)
	 MANAGER_ID                                         NUMBER(6)
	 DEPARTMENT_ID                                      NUMBER(4)

	SYS@BIGDATA> desc dbms_fga
	PROCEDURE ADD_POLICY
	 Argument Name                  Type                    In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 OBJECT_SCHEMA                  VARCHAR2                IN     DEFAULT
	 OBJECT_NAME                    VARCHAR2                IN
	 POLICY_NAME                    VARCHAR2                IN
	 AUDIT_CONDITION                VARCHAR2                IN     DEFAULT
	 AUDIT_COLUMN                   VARCHAR2                IN     DEFAULT
	 HANDLER_SCHEMA                 VARCHAR2                IN     DEFAULT
	 HANDLER_MODULE                 VARCHAR2                IN     DEFAULT
	 ENABLE                         BOOLEAN                 IN     DEFAULT
	 STATEMENT_TYPES                VARCHAR2                IN     DEFAULT
	 AUDIT_TRAIL                    BINARY_INTEGER          IN     DEFAULT
	 AUDIT_COLUMN_OPTS              BINARY_INTEGER          IN     DEFAULT
	 POLICY_OWNER                   VARCHAR2                IN     DEFAULT
	PROCEDURE DISABLE_POLICY
	 Argument Name                  Type                    In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 OBJECT_SCHEMA                  VARCHAR2                IN     DEFAULT
	 OBJECT_NAME                    VARCHAR2                IN
	 POLICY_NAME                    VARCHAR2                IN
	PROCEDURE DROP_POLICY
	 Argument Name                  Type                    In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 OBJECT_SCHEMA                  VARCHAR2                IN     DEFAULT
	 OBJECT_NAME                    VARCHAR2                IN
	 POLICY_NAME                    VARCHAR2                IN
	PROCEDURE ENABLE_POLICY
	 Argument Name                  Type                    In/Out Default?
	 ------------------------------ ----------------------- ------ --------
	 OBJECT_SCHEMA                  VARCHAR2                IN     DEFAULT
	 OBJECT_NAME                    VARCHAR2                IN
	 POLICY_NAME                    VARCHAR2                IN
	 ENABLE                         BOOLEAN                 IN     DEFAULT

	SYS@BIGDATA> 

dbms_fga的参考说明：

![DBMS_FGA]({{ "/files/Oracle/dbms_fga_add_policy.png"}})



