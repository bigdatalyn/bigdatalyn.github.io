---
layout: post
title: "Oracle 19c SQL - Real-time SQL Monitoring for Developers Tips"
category: Oracle
tags: Oracle 19c Tips
---

* content
{:toc}


Oracle 19c SQL - Real-time SQL Monitoring for Developers Tips

The real-time SQL monitoring is a 11g new feature that enables DBAs to monitor the performance of SQL statements while they are executing.

Starting in Oracle Database 19c,Oracle allow database user to view their own Real Time SQL Monitoring reports without requiring DBA privileges or SELECT_CATALOG_ROLE.







Test:

	Connected to:
	Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
	Version 19.2.0.0.0

	SYSTEM@pdb1> create user bigdatalyn identified by oracle;

	User created.

	SYSTEM@pdb1> alter user bigdatalyn quota unlimited on users;

	User altered.

	SYSTEM@pdb1> grant connect,resource to bigdatalyn;

	Grant succeeded.

	SYSTEM@pdb1>
	SYSTEM@pdb1> conn bigdatalyn/oracle@pdb1
	Connected.
	BIGDATALYN@pdb1> create table test01(c1 number, c2 char(100));

	Table created.

	BIGDATALYN@pdb1> create table test02(c1 number, c2 char(100));

	Table created.

	BIGDATALYN@pdb1>
	begin
	  for i in 1 .. 200 loop
	for j in 1 .. 100 loop
	  insert into test01 values(i,'A');
	  commit;
	end loop;
	  end loop;
	end;
	9  /

	PL/SQL procedure successfully completed.

	BIGDATALYN@pdb1> BIGDATALYN@pdb1>
	begin
	  for i in 1 .. 200 loop
	for j in 1 .. 100 loop
	  insert into test02 values(i,'A');
	  commit;
	end loop;
	  end loop;
	end;
	9  /

	PL/SQL procedure successfully completed.

	BIGDATALYN@pdb1>
	BIGDATALYN@pdb1> select /*+ use_nl(a b) */ count(*) from test01 a, test02 b where a.c1=b.c1;


	  COUNT(*)
	----------
	   2000000

	BIGDATALYN@pdb1> 

Generate and view SQL Monitor List and Active Report
--should be able to view SQL monitor report of the SQL statements issued by user-self, without granting any additional privileges.
--should not be able to view SQL monitor report of SQL statements issued by other users.

    --REPORT_SQL_MONITOR_LIST
    SET LONG 1000000
    SET LONGCHUNKSIZE 1000000
    SET LINESIZE 1000
    SET PAGESIZE 0
    SET TRIM ON
    SET TRIMSPOOL ON
    SET ECHO OFF
    SET FEEDBACK OFF
    spool monitor_list_sql_test_active.html
    SELECT DBMS_SQLTUNE.report_sql_monitor_list(type =>'ACTIVE',report_level => 'ALL') AS report FROM dual;
    spool off


    --REPORT_SQL_MONITOR
    set trimspool on
    set trim on
    set pages 0
    set linesize 1000
    set long 1000000
    set longchunksize 1000000
    spool monitor_sql_test.html
    select dbms_sqltune.report_sql_monitor(type=>'active') from dual;
    spool off


![sql_monitor]({{ "/files/Oracle/19c/sql_monitor.png"}})
	
Have a good work&life! 2019/03 via LinHong



