---
layout: post
title: "Oracle 19c SQL - HINT_REPORT Tips"
category: Oracle
tags: Oracle 19c Tips
---

* content
{:toc}


Oracle 19c SQL - HINT_REPORT Tips

Oracle 19c dbms_xplan has an important enhancement as it can report hint usage, at least for optimizer hints.

By default, DBMS_XPLAN in the default TYPICAL format will report only invalid hints









### Prepare 19c env and sample schemas

[Oracle Database 19c Installation On Oracle Linux 7 ](https://oracle-base.com/articles/19c/oracle-db-19c-installation-on-oracle-linux-7)

[Sample Schema](https://github.com/oracle/db-sample-schemas/releases)

[Install Sample Schemas](https://oracle-base.com/articles/misc/install-sample-schemas)

The DBMS_XPLAN formats are:

    +HINT_REPORT_USED to show used hints
    +HINT_REPORT_UNUSED to show unresolved and syntax errors
                        this format flag is included in TYPICAL, the default format
    +HINT_REPORT combines both of them and is the default with ALL

### HINT_REPORT test

sql:

	sqlplus oe/oePassword1@pdb1

	set pages 10000 lines 180
	set trimo on trims on tab off

	SELECT /*+ FIRST_TEST(t1) */ COUNT(*)
	FROM   jobs t1
	WHERE t1.job_id IN (SELECT /*+ FULL(t1) */ job_id FROM employees t1);
	select * from table(dbms_xplan.display_cursor(format => 'HINT_REPORT'));

hint report:


	SQL> select * from table(dbms_xplan.display_cursor(format => 'HINT_REPORT'));

	PLAN_TABLE_OUTPUT
	------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SQL_ID  7sfk4gu3gd6yw, child number 0
	-------------------------------------
	SELECT /*+ FIRST_TEST(t1) */ COUNT(*) FROM   jobs t1 WHERE t1.job_id IN
	(SELECT /*+ FULL(t1) */ job_id FROM employees t1)

	Plan hash value: 3101158531

	----------------------------------------------------------------------------------
	| Id  | Operation            | Name      | Rows  | Bytes | Cost (%CPU)| Time     |
	----------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT     |           |       |       |     4 (100)|          |
	|   1 |  SORT AGGREGATE      |           |     1 |    17 |            |          |
	|   2 |   NESTED LOOPS       |           |    19 |   323 |     4  (25)| 00:00:01 |
	|   3 |    SORT UNIQUE       |           |   107 |   963 |     3   (0)| 00:00:01 |
	|   4 |     TABLE ACCESS FULL| EMPLOYEES |   107 |   963 |     3   (0)| 00:00:01 |
	|*  5 |    INDEX UNIQUE SCAN | JOB_ID_PK |     1 |     8 |     0   (0)|          |
	----------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	---------------------------------------------------

	   5 - access("T1"."JOB_ID"="JOB_ID")

	Hint Report (identified by operation id / Query Block Name / Object Alias):
	Total hints for statement: 2 (E - Syntax error (1))
	---------------------------------------------------------------------------

	   0 -  SEL$1
			 E -  FIRST_TEST(

	   4 -  SEL$5DA710D3 / T1@SEL$2
			   -  FULL(t1)


	33 rows selected.

	SQL>

Some reason:

	U - Unused , N - Unresolved , E - Syntax error 

Just like this SQL's report

	Total hints for statement: 2 (E - Syntax error (1))


	
### Some Issues

Error:

	SQL> select * from table(dbms_xplan.display_cursor(format => 'HINT_REPORT'));

	PLAN_TABLE_OUTPUT
	---------------------------------------------------------------
	User has no SELECT privilege on V$SESSION

	SQL> 

Solution:

Grant the following to privileges the user via sys(sysdba user).

	GRANT SELECT ON v_$session TO hr;
	GRANT SELECT ON v_$sql_plan_statistics_all TO hr;
	GRANT SELECT ON v_$sql_plan TO hr;
	GRANT SELECT ON v_$sql TO hr;
	


Have a good work&life! 2019/03 via LinHong



