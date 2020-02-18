---
layout: post
title: "Oracle SQL loader Tips"
category: Oracle
tags: Oracle SQLloader Tips scripts
---

* content
{:toc}

Oracle SQL loader Tips



### Execution


Execution Environment: SQL*Plus

Access Privileges: SELECT privileges on the table

Usage: sqlplus / @control.sql 

Eg.

	SQL> start control.sql emp

	LOAD DATA
	INFILE 'EMP.dat'
	INTO TABLE EMP
	FIELDS TERMINATED BY ','
	(
		EMPNO
	  , ENAME
	  , JOB
	  , MGR
	  , HIREDATE DATE "MM/DD/YY"
	  , SAL
	  , COMM
	  , DEPTNO
	)

### Scripts

control.sql:

```scripts

	set echo off
	set heading off
	set verify off
	set feedback off
	set show off
	set trim off
	set pages 0
	set concat on
	set lines 300
	set trimspool on
	set trimout on

	spool &1..ctl

	select 'LOAD DATA'||chr (10)||
		   'INFILE '''||lower (table_name)||'.dat'''||chr (10)||
		   'INTO TABLE '||table_name||chr (10)||
		   'FIELDS TERMINATED BY '','''||chr (10)||
		   'TRAILING NULLCOLS'||chr (10)||'('
	from   all_tables
	where  table_name = upper ('&1');

	select decode (rownum, 1, ' ', ' , ')||
		   rpad (column_name, 33, ' ')||
		   decode (data_type, 'VARCHAR2', 'CHAR NULLIF ('||column_name||'=BLANKS)',
							  'FLOAT', 'DECIMAL EXTERNAL NULLIF('||column_name||'=BLANKS)',
							  'NUMBER', decode (data_precision, 0, 'INTEGER EXTERNAL NULLIF ('||column_name||'=BLANKS)',
										decode (data_scale, 0, 'INTEGER EXTERNAL NULLIF ('||column_name||'=BLANKS)',
							   'DECIMAL EXTERNAL NULLIF ('||column_name||'=BLANKS)')),
							   'DATE', 'DATE "MM/DD/YY" NULLIF ('||column_name||'=BLANKS)', null)
	from   user_tab_columns
	where  table_name = upper ('&1')
	order  by column_id;

	select ')'
	from   sys.dual;
	spool  off

```

### Reference

MOS

	Script To Generate SQL*Loader Control File (Doc ID 1019523.6)


Have a good work&life! 2020/02 via LinHong


