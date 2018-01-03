---
layout: post
title: "[Original]Oracle 11g Output the result to Excel file via SQL"
category: Oracle
tags: Oracle Excel SQL
---

* content
{:toc}


### [Original]Oracle 11g Output the result to Excel file via SQL

How to export the sql result to excel file?









### Execute SQL file


Use the following sql to output the result to excel file


	[oracle@host01 ~]$ cd .lin
	[oracle@host01 .lin]$ export ORACLE_SID=DB11G;sqlplus / as sysdba
	SQL*Plus: Release 11.2.0.4.0 Production on Wed Jan 2 23:20:22 2018
	Copyright (c) 1982, 2013, Oracle.  All rights reserved.
	Connected to:
	Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - 64bit Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options

	SQL> !cat test_csv.sql
	set linesize 1000 pagesize 1000
	set term off verify off feedback off
	set markup html on entmap on spool on preformat off
	alter session set NLS_DATE_FORMAT='YYYY-MM-DD HH24:MI:SS';
	spool /home/oracle/hr_employee.xls
	select * from hr.employees;
	spool off
	exit

	SQL> @test_csv
	Disconnected from Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - 64bit Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options
	[oracle@host01 .lin]$ 

The following sample result

![SampleExcel]({{ "/files/Oracle/SQL/SampleExcel.png"}})


	
++++++++++++++++ EOF LinHong ++++++++++++++++	





