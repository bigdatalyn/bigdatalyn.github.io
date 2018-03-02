---
layout: post
title: "Oralce 18c New feature"
category: Oracle
tags: Oracle 18c NewFeatures
---

* content
{:toc}

Oralce 18c New feature - Private Temporary Tables

We use Global Temporary Tables from Oracle 8i and  we can use private temporary tables from 18c.

What is Private Temporary Tables? When to use Private Temporary Table ? How to use this?







[Oracle Database Release 18c New Features](https://docs.oracle.com/en/database/oracle/oracle-database/18/newft/toc.htm)

-- Private Temporary Tables

#### What is the Private Temporary Tables?

Private temporary tables:

	Private temporary tables are temporary database objects that are automatically dropped at the end of a transaction or a session. A private temporary table is stored in memory and is visible only to the session that created it.

	A private temporary table confines the scope of a temporary table to a session or a transaction, thus providing more flexibility in application coding, leading to easier code maintenance and a better ready-to-use functionality.

The differences between global temporary table and private temproray table.

[18c_newfeatures_ptt](/files/Oracle/18c/18c_newfeatures_ptt.png)


#### When we can use The Private Temporary Tables?


Private temporary tables are useful in the following situations:

    When an application stores temporary data in transient tables that are populated once, read few times, and then dropped at the end of a transaction or session

    When a session is maintained indefinitely and must create different temporary tables for different transactions

    When the creation of a temporary table must not start a new transaction or commit an existing transaction

    When different sessions of the same user must use the same name for a temporary table

    When a temporary table is required for a read-only database

	
#### Test

Documents:

[Database Administrator’s Guide/Managing Tables /20.3.2 Creating a Temporary Table ](https://docs.oracle.com/en/database/oracle/oracle-database/18/admin/managing-tables.html#GUID-6EB347F0-64BA-4B15-8182-41BA7D5A876F)


private_temp_table_prefix

	SQL> show parameter prefix

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	common_user_prefix                   string      C##
	os_authent_prefix                    string      ops$
	private_temp_table_prefix            string      ORA$PTT_
	SQL> 

transaction  or session level
	
[18c_newfeatures_ptt](/files/Oracle/18c/18c_newfeatures_ptt.png)	

However I met ORA-14451 error while I execute the create private temporary table in the my test env.

	SQL>  create private temporary table ora$ptt_my_ppt( id number, name varchar2(20)) on commit preserve definition;
	 create private temporary table ora$ptt_my_ppt( id number, name varchar2(20)) on commit preserve definition
	*
	ERROR at line 1:
	ORA-14451: unsupported feature with temporary table

	SQL> 

We can test this in Oracle Live SQL!! Just do it!!
	
[18c private temporary tables](https://livesql.oracle.com/apex/livesql/file/content_GAD3PVUCHINEPIQK4IKDXALT7.html)


[18c_newfeatures_LiveSQL](/files/Oracle/18c/18c_newfeatures_LiveSQL.png)	




	
++++++++++++++++ EOF LinHong ++++++++++++++++	





