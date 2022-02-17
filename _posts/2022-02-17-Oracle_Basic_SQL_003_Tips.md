---
layout: post
title: "Oracle Basic SQL 003 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}




Oracle Basic SQL 003 Study Tips

01. IN/EXISTS/INNER JOIN

HASH JOIN SEMI







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


### IN,EXISTS/INNER JOIN

IN
```sql
SQL> create table emp2 as select first_name,job_id,salary from employees where job_id='SA_MAN';

Table created.

SQL> select count(*) from emp2;

  COUNT(*)
----------
	 5

SQL> select * from emp2;

FIRST_NAME	     JOB_ID	    SALARY
-------------------- ---------- ----------
John		     SA_MAN	     14000
Karen		     SA_MAN	     13500
Alberto 	     SA_MAN	     12000
Gerald		     SA_MAN	     11000
Eleni		     SA_MAN	     10500

SQL>
SQL> select employee_id,first_name,job_id,salary,department_id from employees where (first_name,job_id,salary) in (select first_name,job_id,salary from emp2);

EMPLOYEE_ID FIRST_NAME		 JOB_ID 	SALARY DEPARTMENT_ID
----------- -------------------- ---------- ---------- -------------
	145 John		 SA_MAN 	 14000		  80
	146 Karen		 SA_MAN 	 13500		  80
	147 Alberto		 SA_MAN 	 12000		  80
	148 Gerald		 SA_MAN 	 11000		  80
	149 Eleni		 SA_MAN 	 10500		  80

SQL>

SQL_ID	gjybpzk9npza3, child number 0
-------------------------------------
select employee_id,first_name,job_id,salary,department_id from
employees where (first_name,job_id,salary) in (select
first_name,job_id,salary from emp2)

Plan hash value: 4293706259

------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name      | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	       |      1 |	 |     6 (100)| 	 |	5 |00:00:00.01 |       9 |
|*  1 |  HASH JOIN SEMI    |	       |      1 |      1 |     6   (0)| 00:00:01 |	5 |00:00:00.01 |       9 |
|   2 |   TABLE ACCESS FULL| EMPLOYEES |      1 |    107 |     3   (0)| 00:00:01 |    107 |00:00:00.01 |       6 |
|*  3 |   TABLE ACCESS FULL| EMP2      |      1 |      5 |     3   (0)| 00:00:01 |	5 |00:00:00.01 |       3 |
------------------------------------------------------------------------------------------------------------------
```

EXISTS:

```sql
SQL> select employee_id,first_name,job_id,salary,department_id from employees a where exists (select null from emp2 b where b.first_name = a.first_name and b.job_id = a.job_id and b.salary = a.salary);

EMPLOYEE_ID FIRST_NAME		 JOB_ID 	SALARY DEPARTMENT_ID
----------- -------------------- ---------- ---------- -------------
	145 John		 SA_MAN 	 14000		  80
	146 Karen		 SA_MAN 	 13500		  80
	147 Alberto		 SA_MAN 	 12000		  80
	148 Gerald		 SA_MAN 	 11000		  80
	149 Eleni		 SA_MAN 	 10500		  80

SQL>

SQL_ID	9v48mjztf4xq0, child number 0
-------------------------------------
select employee_id,first_name,job_id,salary,department_id from
employees a where exists (select null from emp2 b where b.first_name =
a.first_name and b.job_id = a.job_id and b.salary = a.salary)

Plan hash value: 4293706259

------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name      | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	       |      1 |	 |     6 (100)| 	 |	5 |00:00:00.01 |       9 |
|*  1 |  HASH JOIN SEMI    |	       |      1 |      1 |     6   (0)| 00:00:01 |	5 |00:00:00.01 |       9 |
|   2 |   TABLE ACCESS FULL| EMPLOYEES |      1 |    107 |     3   (0)| 00:00:01 |    107 |00:00:00.01 |       6 |
|*  3 |   TABLE ACCESS FULL| EMP2      |      1 |      5 |     3   (0)| 00:00:01 |	5 |00:00:00.01 |       3 |
------------------------------------------------------------------------------------------------------------------
```

### INNER JOIN

There is NOT same records in `emp2` results. So the in/exists sql can convert to INNER JOIN.

```sql
SQL> select a.employee_id,a.first_name,a.job_id,a.salary,a.department_id from employees a inner join emp2 b on (a.first_name = b.first_name and a.job_id = b.job_id and a.salary = b.salary);

EMPLOYEE_ID FIRST_NAME		 JOB_ID 	SALARY DEPARTMENT_ID
----------- -------------------- ---------- ---------- -------------
	145 John		 SA_MAN 	 14000		  80
	146 Karen		 SA_MAN 	 13500		  80
	147 Alberto		 SA_MAN 	 12000		  80
	148 Gerald		 SA_MAN 	 11000		  80
	149 Eleni		 SA_MAN 	 10500		  80

SQL>

SQL_ID	g0zxjfc2dnx5h, child number 0
-------------------------------------
select a.employee_id,a.first_name,a.job_id,a.salary,a.department_id
from employees a inner join emp2 b on (a.first_name = b.first_name and
a.job_id = b.job_id and a.salary = b.salary)

Plan hash value: 3249967874

------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name      | Starts | E-Rows | Cost (%CPU)| E-Time	 | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	       |      1 |	 |     6 (100)| 	 |	5 |00:00:00.01 |       9 |
|*  1 |  HASH JOIN	   |	       |      1 |      5 |     6   (0)| 00:00:01 |	5 |00:00:00.01 |       9 |
|*  2 |   TABLE ACCESS FULL| EMP2      |      1 |      5 |     3   (0)| 00:00:01 |	5 |00:00:00.01 |       2 |
|   3 |   TABLE ACCESS FULL| EMPLOYEES |      1 |    107 |     3   (0)| 00:00:01 |    107 |00:00:00.01 |       7 |
------------------------------------------------------------------------------------------------------------------

```


### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

