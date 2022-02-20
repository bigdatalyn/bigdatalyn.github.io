---
layout: post
title: "Oracle Basic SQL 002 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 002 Study Tips

01. or union/union all







### Env

```
SQL> select banner from v$version;

BANNER
----------------------------------------------------------------------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production

SQL> select banner_full from v$version;

BANNER_FULL
-----------------------------------------------------------------------------------------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0


SQL> !cat /etc/redhat-release
Red Hat Enterprise Linux release 8.4 (Ootpa)

SQL> !uname -r
5.4.17-2102.201.3.el8uek.x86_64

SQL>
SQL> show user
USER is "HR"
SQL>

grant dba to hr;
```

### 01. OR UNION/UNION ALL

```sql
SQL> select employee_id,last_name from employees where employee_id=145 or last_name='Russell';

EMPLOYEE_ID LAST_NAME
----------- -------------------------
	145 Russell

SQL> select employee_id,last_name from employees where employee_id=145 union all select employee_id,last_name from employees where last_name='Russell';

EMPLOYEE_ID LAST_NAME
----------- -------------------------
	145 Russell
	145 Russell

SQL> select employee_id,last_name from employees where employee_id=145 union select employee_id,last_name from employees where last_name='Russell';

EMPLOYEE_ID LAST_NAME
----------- -------------------------
	145 Russell

SQL>
```
-- union/union all : employee_id and last_name should use index if the recoreds are huge.
-- union : can remove the same records.

The diff plan: SORT UNIQUE

```sql
SQL_ID	d7cjf6ft9rkma, child number 0
-------------------------------------
select employee_id,last_name from employees where employee_id=145 union
all select employee_id,last_name from employees where
last_name='Russell'

Plan hash value: 2121806042

----------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			     | Name	     | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		     |		     |	    1 |        |     3 (100)|	       |      2 |00:00:00.01 |	     4 |
|   1 |  UNION-ALL			     |		     |	    1 |        |	    |	       |      2 |00:00:00.01 |	     4 |
|   2 |   TABLE ACCESS BY INDEX ROWID	     | EMPLOYEES     |	    1 |      1 |     1	 (0)| 00:00:01 |      1 |00:00:00.01 |	     2 |
|*  3 |    INDEX UNIQUE SCAN		     | EMP_EMP_ID_PK |	    1 |      1 |     0	 (0)|	       |      1 |00:00:00.01 |	     1 |
|   4 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES     |	    1 |      1 |     2	 (0)| 00:00:01 |      1 |00:00:00.01 |	     2 |
|*  5 |    INDEX RANGE SCAN		     | EMP_NAME_IX   |	    1 |      1 |     1	 (0)| 00:00:01 |      1 |00:00:00.01 |	     1 |
----------------------------------------------------------------------------------------------------------------------------------------

SQL_ID	b82bt08w1k70s, child number 0
-------------------------------------
select employee_id,last_name from employees where employee_id=145 union
select employee_id,last_name from employees where last_name='Russell'

Plan hash value: 1574180613

-----------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			      | Name	      | Starts | E-Rows | Cost (%CPU)| E-Time	| A-Rows |   A-Time   | Buffers |
-----------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		      | 	      |      1 |	|     3 (100)|		|      1 |00:00:00.01 |       4 |
|   1 |  SORT UNIQUE			      | 	      |      1 |      2 |     3   (0)| 00:00:01 |      1 |00:00:00.01 |       4 |
|   2 |   UNION-ALL			      | 	      |      1 |	|	     |		|      2 |00:00:00.01 |       4 |
|   3 |    TABLE ACCESS BY INDEX ROWID	      | EMPLOYEES     |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
|*  4 |     INDEX UNIQUE SCAN		      | EMP_EMP_ID_PK |      1 |      1 |     0   (0)|		|      1 |00:00:00.01 |       1 |
|   5 |    TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES     |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
|*  6 |     INDEX RANGE SCAN		      | EMP_NAME_IX   |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       1 |
-----------------------------------------------------------------------------------------------------------------------------------------
```

use distinct and union all

```sql
SQL> select distinct * from (select employee_id,last_name from employees where employee_id=145 union all select employee_id,last_name from employees where last_name='Russell');

EMPLOYEE_ID LAST_NAME
----------- -------------------------
	145 Russell

SQL>

SQL_ID	1kkr3ra5z0phm, child number 0
-------------------------------------
select distinct * from (select employee_id,last_name from employees
where employee_id=145 union all select employee_id,last_name from
employees where last_name='Russell')

Plan hash value: 2700715382

------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			       | Name	       | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		       |	       |      1 |	 |     4 (100)| 	 |	1 |00:00:00.01 |       4 |
|   1 |  HASH UNIQUE			       |	       |      1 |      2 |     4  (25)| 00:00:01 |	1 |00:00:00.01 |       4 |
|   2 |   VIEW				       |	       |      1 |      2 |     3   (0)| 00:00:01 |	2 |00:00:00.01 |       4 |
|   3 |    UNION-ALL			       |	       |      1 |	 |	      | 	 |	2 |00:00:00.01 |       4 |
|   4 |     TABLE ACCESS BY INDEX ROWID        | EMPLOYEES     |      1 |      1 |     1   (0)| 00:00:01 |	1 |00:00:00.01 |       2 |
|*  5 |      INDEX UNIQUE SCAN		       | EMP_EMP_ID_PK |      1 |      1 |     0   (0)| 	 |	1 |00:00:00.01 |       1 |
|   6 |     TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES     |      1 |      1 |     2   (0)| 00:00:01 |	1 |00:00:00.01 |       2 |
|*  7 |      INDEX RANGE SCAN		       | EMP_NAME_IX   |      1 |      1 |     1   (0)| 00:00:01 |	1 |00:00:00.01 |       1 |
------------------------------------------------------------------------------------------------------------------------------------------
```


union result is diff with or result as the following test.
so if the or result have same result, can NOT convert to union sql.
- Need to add unique records/column in the sql. 

```sql
SQL> select department_id from employees where manager_id = 102 or job_id = 'SA_MAN';

DEPARTMENT_ID
-------------
	   60
	   80
	   80
	   80
	   80
	   80

6 rows selected.

SQL> select department_id from employees where manager_id = 102 union select department_id from employees where job_id = 'SA_MAN';

DEPARTMENT_ID
-------------
	   60
	   80

SQL>
```
- Need to add unique records/column in the sql. 

```sql

SQL> select employee_id,department_id from employees where manager_id = 102 or job_id = 'SA_MAN';

EMPLOYEE_ID DEPARTMENT_ID
----------- -------------
	103	       60
	145	       80
	146	       80
	147	       80
	148	       80
	149	       80

6 rows selected.

SQL> select employee_id,department_id from employees where manager_id = 102 union select employee_id,department_id from employees where job_id = 'SA_MAN';

EMPLOYEE_ID DEPARTMENT_ID
----------- -------------
	103	       60
	145	       80
	146	       80
	147	       80
	148	       80
	149	       80

6 rows selected.

SQL>
```




### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

