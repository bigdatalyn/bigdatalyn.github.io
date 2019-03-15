---
layout: post
title: "Oracle 19c SQL - COMPARE_PLANS Tips"
category: Oracle
tags: Oracle 19c Tips
---

* content
{:toc}


Oracle 19c SQL - Compare Plan Tips



DBMS_XPLAN.COMPARE_PLANS - SQL Plan Comparison

By the new DBMS_XPLAN.COMPARE_PLANS package, we can compare a 'reference' SQL execution plan with multiple plans from a variety of different sources using a single API call.







### Prepare 19c env and sample schemas

[Oracle Database 19c Installation On Oracle Linux 7 ](https://oracle-base.com/articles/19c/oracle-db-19c-installation-on-oracle-linux-7)

[Sample Schema](https://github.com/oracle/db-sample-schemas/releases)

[Install Sample Schemas](https://oracle-base.com/articles/misc/install-sample-schemas)


[206.5.1 COMPARE_PLANS Function ](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/DBMS_XPLAN.html#GUID-5A80E12C-F126-413D-8FF7-FC04B382FA92)

### DBMS_XPLAN.COMPARE_PLANS test

Two sql:

	SQL> conn sh/shPassword1@pdb1
	Connected.
	SQL>
	select count(*) from products p, sales s
	where  p.prod_id = s.prod_id
	  3  and    p.prod_min_price > 100;

	  COUNT(*)
	----------
		123623

	SQL>
	SQL>
	select count(*) from products p, sales s
	where  p.prod_id = s.prod_id
	  3  and    s.quantity_sold = 20;

	  COUNT(*)
	----------
			 0

	SQL>

Find the sqlID

	SQL> SET LINESIZE 1000 pages 1000
	SQL> COL SQL_ID FORMAT a20
	SQL> COL SQL_TEXT FORMAT a60
	SQL>
	SELECT SQL_ID, SQL_TEXT FROM   V$SQL
	WHERE  SQL_TEXT LIKE '%products%'
	AND    SQL_TEXT NOT LIKE '%SQL_TEXT%'
	  4  ORDER BY SQL_ID;

	SQL_ID               SQL_TEXT
	-------------------- ------------------------------------------------------------
	10z134y2v2k12        select count(*) from products p, sales s where  p.prod_id =
						 s.prod_id and    s.quantity_sold = 20

	37qs04s54p0pf        select count(*) from products p, sales s where  p.prod_id =
						 s.prod_id and    p.prod_min_price > 100

	SQL>

Or find the sql_id via feedback on sql_id

	SQL> set feedback on sql_id
	select count(*) from products p, sales s
	where  p.prod_id = s.prod_id
	  3  and    p.prod_min_price > 100;

	  COUNT(*)
	----------
		123623

	1 row selected.

	SQL_ID: 37qs04s54p0pf
	SQL>
	select count(*) from products p, sales s
	where  p.prod_id = s.prod_id
	  3  and    s.quantity_sold = 20;

	  COUNT(*)
	----------
			 0

	1 row selected.

	SQL_ID: 10z134y2v2k12
	SQL>

Compare the sql via two sql_id

	VARIABLE v_rep CLOB

	BEGIN
	  :v_rep := DBMS_XPLAN.COMPARE_PLANS( 
		reference_plan    => cursor_cache_object('10z134y2v2k12', NULL),
		compare_plan_list => plan_object_list(cursor_cache_object('37qs04s54p0pf', NULL)),
		type              => 'TEXT',
		level             => 'TYPICAL', 
		section           => 'ALL');
	END;
	/

	SET PAGESIZE 50000
	SET LONG 100000 tab off
	SET LINESIZE 210
	COLUMN report FORMAT a200

	SELECT :v_rep REPORT FROM DUAL;

Sample results

	REPORT
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	COMPARE PLANS REPORT
	---------------------------------------------------------------------------------------------
	  Current user           : SH
	  Total number of plans  : 2
	  Number of findings     : 1
	---------------------------------------------------------------------------------------------

	COMPARISON DETAILS
	---------------------------------------------------------------------------------------------
	 Plan Number            : 1 (Reference Plan)
	 Plan Found             : Yes
	 Plan Source            : Cursor Cache
	 SQL ID                 : 10z134y2v2k12
	 Child Number           : 0
	 Plan Database Version  : 19.0.0.0
	 Parsing Schema         : "SH"
	 SQL Text               : select count(*) from products p, sales s where
							p.prod_id = s.prod_id and s.quantity_sold = 20

	Plan
	-----------------------------

	 Plan Hash Value  : 4261227730

	--------------------------------------------------------------------------------
	| Id  | Operation               | Name        | Rows | Bytes | Cost | Time     |
	--------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT        |             |      |       |  518 |          |
	|   1 |   SORT AGGREGATE        |             |    1 |    11 |      |          |
	|   2 |    NESTED LOOPS         |             |    1 |    11 |  518 | 00:00:01 |
	|   3 |     PARTITION RANGE ALL |             |    1 |     7 |  518 | 00:00:01 |
	| * 4 |      TABLE ACCESS FULL  | SALES       |    1 |     7 |  518 | 00:00:01 |
	| * 5 |     INDEX UNIQUE SCAN   | PRODUCTS_PK |    1 |     4 |    0 |          |
	--------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	------------------------------------------
	* 4 - filter("S"."QUANTITY_SOLD"=20)
	* 5 - access("P"."PROD_ID"="S"."PROD_ID")

	---------------------------------------------------------------------------------------------
	 Plan Number            : 2
	 Plan Found             : Yes
	 Plan Source            : Cursor Cache
	 SQL ID                 : 37qs04s54p0pf
	 Child Number           : 0
	 Plan Database Version  : 19.0.0.0
	 Parsing Schema         : "SH"
	 SQL Text               : select count(*) from products p, sales s where
							p.prod_id = s.prod_id and p.prod_min_price > 100

	Plan
	-----------------------------

	 Plan Hash Value  : 3037679890

	--------------------------------------------------------------------------------------------------
	| Id  | Operation                         | Name           | Rows   | Bytes    | Cost | Time     |
	--------------------------------------------------------------------------------------------------
	|   0 | SELECT STATEMENT                  |                |        |          |   34 |          |
	|   1 |   SORT AGGREGATE                  |                |      1 |       13 |      |          |
	| * 2 |    HASH JOIN                      |                | 852747 | 11085711 |   34 | 00:00:01 |
	| * 3 |     TABLE ACCESS FULL             | PRODUCTS       |     67 |      603 |    3 | 00:00:01 |
	|   4 |     PARTITION RANGE ALL           |                | 918843 |  3675372 |   29 | 00:00:01 |
	|   5 |      BITMAP CONVERSION TO ROWIDS  |                | 918843 |  3675372 |   29 | 00:00:01 |
	|   6 |       BITMAP INDEX FAST FULL SCAN | SALES_PROD_BIX |        |          |      |          |
	--------------------------------------------------------------------------------------------------

	Predicate Information (identified by operation id):
	------------------------------------------
	* 2 - access("P"."PROD_ID"="S"."PROD_ID")
	* 3 - filter("P"."PROD_MIN_PRICE">100)


	Notes
	-----
	- This is an adaptive plan


	Comparison Results (1):
	-----------------------------
	 1. Query block SEL$1: Join order is different at position 1 (reference plan:
		"S"@"SEL$1", current plan: "P"@"SEL$1").


	---------------------------------------------------------------------------------------------

	1 row selected.

The result:

	Comparison Results (1):
	-----------------------------
	 1. Query block SEL$1: Join order is different at position 1 (reference plan:
		"S"@"SEL$1", current plan: "P"@"SEL$1").


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



