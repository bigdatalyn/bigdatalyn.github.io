---
layout: post
title: "[原创]DB whoami 脚本"
category: Oracle
tags: whoami sql
---

* content
{:toc}

[原创]DB whoami 脚本

DB whoami 脚本







### whoami scripts

	SQL> @whoami                                                                                                                           
	USER: SYS
	SESSION ID: 24
	CURRENT_SCHEMA: SYS
	INSTANCE NAME: orcl
	DATABASE ROLE: PRIMARY
	OS USER: oracle
	CLIENT IP ADDRESS:
	SERVER HOSTNAME: database
	CLIENT HOSTNAME: database.example.com

	PL/SQL procedure successfully completed.

	SQL> host cat whoami.sql                                                                                                               
	set serveroutput on
	begin
	dbms_output.put_line('USER: '||sys_context('userenv','session_user'));
	dbms_output.put_line('SESSION ID: '||sys_context('userenv','sid'));
	dbms_output.put_line('CURRENT_SCHEMA: '||sys_context('userenv','current_schema'));
	dbms_output.put_line('INSTANCE NAME: '||sys_context('userenv','instance_name'));
	dbms_output.put_line('DATABASE ROLE: '||sys_context('userenv','database_role'));
	dbms_output.put_line('OS USER: '||sys_context('userenv','os_user'));
	dbms_output.put_line('CLIENT IP ADDRESS: '||sys_context('userenv','ip_address'));
	dbms_output.put_line('SERVER HOSTNAME: '||sys_context('userenv','server_host'));
	dbms_output.put_line('CLIENT HOSTNAME: '||sys_context('userenv','host'));
	end;
	/

	SQL>

	[oracle@database ~]$ sqlplus test01/test01@192.168.56.102:1521/orcl.example.com                                                        

	SQL*Plus: Release 11.2.0.2.0 Production on Mon Jul 31 03:03:23 2017

	Copyright (c) 1982, 2010, Oracle.  All rights reserved.


	Connected to:
	Oracle Database 11g Enterprise Edition Release 11.2.0.2.0 - Production
	With the Partitioning, Automatic Storage Management, OLAP, Data Mining
	and Real Application Testing options

	SQL> @whoami                                                                                                                           
	USER: TEST01
	SESSION ID: 39
	CURRENT_SCHEMA: TEST01
	INSTANCE NAME: orcl
	DATABASE ROLE: PRIMARY
	OS USER: oracle
	CLIENT IP ADDRESS: 192.168.56.102
	SERVER HOSTNAME: database
	CLIENT HOSTNAME: database.example.com

	PL/SQL procedure successfully completed.

	SQL>                    
	
	
	

~~ 2017/07/21 bigdata_lyn ~~
