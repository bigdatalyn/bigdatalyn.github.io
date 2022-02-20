---
layout: post
title: "Oracle Basic SQL 007 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 007 Study Tips

List department name with only department name and no employees in it.

eg. department_id: 170 (Manufacturing) there is NOT employees in this department.

- NOT IN
- NOT EXISTS
- LEFT JOIN







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


### Test Data

List department name with only department name and no employees in it.

eg. department_id: 170 (Manufacturing) there is NOT employees in this department.



```
SQL> select distinct department_id from employees order by 1 nulls first;

DEPARTMENT_ID
-------------

	   10
	   20
	   30
	   40
	   50
	   60
	   70
	   80
	   90
	  100
	  110

12 rows selected.

SQL> select * from departments;

DEPARTMENT_ID DEPARTMENT_NAME		     MANAGER_ID LOCATION_ID
------------- ------------------------------ ---------- -----------
	   10 Administration			    200        1700
	   20 Marketing 			    201        1800
	   30 Purchasing			    114        1700
	   40 Human Resources			    203        2400
	   50 Shipping				    121        1500
	   60 IT				    103        1400
	   70 Public Relations			    204        2700
	   80 Sales				    145        2500
	   90 Executive 			    100        1700
	  100 Finance				    108        1700
	  110 Accounting			    205        1700
	  120 Treasury					       1700
	  130 Corporate Tax				       1700
	  140 Control And Credit			       1700
	  150 Shareholder Services			       1700
	  160 Benefits					       1700
	  170 Manufacturing				       1700
	  180 Construction				       1700
	  190 Contracting				       1700
	  200 Operations				       1700
	  210 IT Support				       1700
	  220 NOC					       1700
	  230 IT Helpdesk				       1700
	  240 Government Sales				       1700
	  250 Retail Sales				       1700
	  260 Recruiting				       1700
	  270 Payroll					       1700

27 rows selected.

SQL>

```


### NOT IN

Use not in.

Result in `NOT IN` that needs to pay attention to `NULL` value!

```
No.01 select * from departments where department_id not in (select emp.department_id from employees emp);
No.02 select * from departments where department_id not in (select emp.department_id from employees emp where emp.department_id is NOT NULL);
```

```sql
SQL> select * from departments where department_id not in (select emp.department_id from employees emp);

no rows selected

SQL> select * from departments where department_id not in (select emp.department_id from employees emp where emp.department_id is NOT NULL);

DEPARTMENT_ID DEPARTMENT_NAME		     MANAGER_ID LOCATION_ID
------------- ------------------------------ ---------- -----------
	  120 Treasury					       1700
	  130 Corporate Tax				       1700
	  140 Control And Credit			       1700
	  150 Shareholder Services			       1700
	  160 Benefits					       1700
	  170 Manufacturing				       1700
	  180 Construction				       1700
	  190 Contracting				       1700
	  200 Operations				       1700
	  210 IT Support				       1700
	  220 NOC					       1700
	  230 IT Helpdesk				       1700
	  240 Government Sales				       1700
	  250 Retail Sales				       1700
	  260 Recruiting				       1700
	  270 Payroll					       1700

16 rows selected.

SQL>

```

```
SQL_ID	fpf5j3uj222y3, child number 0
-------------------------------------
select * from departments where department_id not in (select
emp.department_id from employees emp where emp.department_id is NOT
NULL)

Plan hash value: 3082375452

--------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name	       | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |		       |      1 |	 |     3 (100)| 	 |     16 |00:00:00.01 |      11 |
|   1 |  NESTED LOOPS ANTI |		       |      1 |     17 |     3   (0)| 00:00:01 |     16 |00:00:00.01 |      11 |
|   2 |   TABLE ACCESS FULL| DEPARTMENTS       |      1 |     27 |     3   (0)| 00:00:01 |     27 |00:00:00.01 |       7 |
|*  3 |   INDEX RANGE SCAN | EMP_DEPARTMENT_IX |     27 |     41 |     0   (0)| 	 |     11 |00:00:00.01 |       4 |
--------------------------------------------------------------------------------------------------------------------------
```

### NOT EXISTS

Use not exists.

```sql
SQL> select * from departments d where not exists (select null from employees e where e.department_id=d.department_id);

DEPARTMENT_ID DEPARTMENT_NAME		     MANAGER_ID LOCATION_ID
------------- ------------------------------ ---------- -----------
	  120 Treasury					       1700
	  130 Corporate Tax				       1700
	  140 Control And Credit			       1700
	  150 Shareholder Services			       1700
	  160 Benefits					       1700
	  170 Manufacturing				       1700
	  180 Construction				       1700
	  190 Contracting				       1700
	  200 Operations				       1700
	  210 IT Support				       1700
	  220 NOC					       1700
	  230 IT Helpdesk				       1700
	  240 Government Sales				       1700
	  250 Retail Sales				       1700
	  260 Recruiting				       1700
	  270 Payroll					       1700

16 rows selected.

SQL>
```


```
SQL_ID	0882d160dmx5g, child number 0
-------------------------------------
select * from departments d where not exists  (select null from
employees e where e.department_id=d.department_id)

Plan hash value: 3082375452

--------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name	       | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |		       |      1 |	 |     3 (100)| 	 |     16 |00:00:00.01 |      11 |
|   1 |  NESTED LOOPS ANTI |		       |      1 |     17 |     3   (0)| 00:00:01 |     16 |00:00:00.01 |      11 |
|   2 |   TABLE ACCESS FULL| DEPARTMENTS       |      1 |     27 |     3   (0)| 00:00:01 |     27 |00:00:00.01 |       7 |
|*  3 |   INDEX RANGE SCAN | EMP_DEPARTMENT_IX |     27 |     41 |     0   (0)| 	 |     11 |00:00:00.01 |       4 |
--------------------------------------------------------------------------------------------------------------------------
```

### LEFT JOIN


```sql
SQL> select d.* from departments d left join employees e on d.department_id = e.department_id where e.department_id is null;

DEPARTMENT_ID DEPARTMENT_NAME		     MANAGER_ID LOCATION_ID
------------- ------------------------------ ---------- -----------
	  120 Treasury					       1700
	  130 Corporate Tax				       1700
	  140 Control And Credit			       1700
	  150 Shareholder Services			       1700
	  160 Benefits					       1700
	  170 Manufacturing				       1700
	  180 Construction				       1700
	  190 Contracting				       1700
	  200 Operations				       1700
	  210 IT Support				       1700
	  220 NOC					       1700
	  230 IT Helpdesk				       1700
	  240 Government Sales				       1700
	  250 Retail Sales				       1700
	  260 Recruiting				       1700
	  270 Payroll					       1700

16 rows selected.

SQL>
```

```
SQL_ID	af09hu0xgyyyv, child number 0
-------------------------------------
select d.* from departments d left join employees e on d.department_id
= e.department_id where e.department_id is null

Plan hash value: 3082375452

--------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name	       | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |		       |      1 |	 |     3 (100)| 	 |     16 |00:00:00.01 |      11 |
|   1 |  NESTED LOOPS ANTI |		       |      1 |     17 |     3   (0)| 00:00:01 |     16 |00:00:00.01 |      11 |
|   2 |   TABLE ACCESS FULL| DEPARTMENTS       |      1 |     27 |     3   (0)| 00:00:01 |     27 |00:00:00.01 |       7 |
|*  3 |   INDEX RANGE SCAN | EMP_DEPARTMENT_IX |     27 |     41 |     0   (0)| 	 |     11 |00:00:00.01 |       4 |
--------------------------------------------------------------------------------------------------------------------------
```

### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

