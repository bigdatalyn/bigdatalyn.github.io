---
layout: post
title: "Oracle Basic SQL 014 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 014 Study Tips

Sub-queries in select can be converted to left join (use_hj/use_nl)

Tips: The execution plan has the `OUTER` keyword

标量子查询可以转left join外连接（use_hj/use_nl)

Tips:
- 执行计划有`OUTER`关键字
- 如果有group by,先汇总，后关联
- MySQL slave 状态说明
- MySQL mysqldump导出 timestamp 和 datetime 列的一些tips
- MySQL从5.6到8.0并行复制的演进







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


### 


```
No1.
select employee_id,first_name,job_id,salary,department_id,
(select d.department_name from departments d where d.department_id = e.department_id) as dept_name 
from employees e 
where department_id in (100,110);

No2.
select e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name 
from employees e left join departments d on (e.department_id = d.department_id) 
where e.department_id in (100,110);

No3.

select /*+ use_hj(e,d) */ e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name 
from employees e left join departments d on (e.department_id = d.department_id) 
where e.department_id in (100,110);

select /*+ use_nl(e,d) */ e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name 
from employees e left join departments d on (e.department_id = d.department_id) 
where e.department_id in (100,110);
```


```sql
No1.
SQL>
select employee_id,first_name,job_id,salary,department_id,
(select d.department_name from departments d where d.department_id = e.department_id) as dept_name
  3  from employees e
  4  where department_id in (100,110);

 EMPLOYEE_ID FIRST_NAME  JOB_ID      SALARY  DEPARTMENT_ID DEPT_NAME
------------ ----------- ---------- ------- -------------- ----------
	 108 Nancy	 FI_MGR       12008	       100 Finance
	 109 Daniel	 FI_ACCOUNT    9000	       100 Finance
	 110 John	 FI_ACCOUNT    8200	       100 Finance
	 111 Ismael	 FI_ACCOUNT    7700	       100 Finance
	 112 Jose Manuel FI_ACCOUNT    7800	       100 Finance
	 113 Luis	 FI_ACCOUNT    6900	       100 Finance
	 205 Shelley	 AC_MGR       12008	       110 Accounting
	 206 William	 AC_ACCOUNT    8300	       110 Accounting

8 rows selected.

SQL>


SQL_ID	a46hz73nz73nz, child number 0
-------------------------------------
select employee_id,first_name,job_id,salary,department_id, (select
d.department_name from departments d where d.department_id =
e.department_id) as dept_name from employees e where department_id in
(100,110)

Plan hash value: 1690697063

--------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			     | Name		 | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		     |			 |	1 |	   |	 4 (100)|	   |	  8 |00:00:00.01 |	 6 |
|   1 |  TABLE ACCESS BY INDEX ROWID	     | DEPARTMENTS	 |	2 |	 1 |	 1   (0)| 00:00:01 |	  2 |00:00:00.01 |	 4 |
|*  2 |   INDEX UNIQUE SCAN		     | DEPT_ID_PK	 |	2 |	 1 |	 0   (0)|	   |	  2 |00:00:00.01 |	 2 |
|   3 |  INLIST ITERATOR		     |			 |	1 |	   |		|	   |	  8 |00:00:00.01 |	 6 |
|   4 |   TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	 |	2 |	 7 |	 2   (0)| 00:00:01 |	  8 |00:00:00.01 |	 6 |
|*  5 |    INDEX RANGE SCAN		     | EMP_DEPARTMENT_IX |	2 |	 8 |	 1   (0)| 00:00:01 |	  8 |00:00:00.01 |	 3 |
--------------------------------------------------------------------------------------------------------------------------------------------


No2.

SQL>
select e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name
from employees e left join departments d on (e.department_id = d.department_id)
  3  where e.department_id in (100,110);

 EMPLOYEE_ID FIRST_NAME  JOB_ID      SALARY  DEPARTMENT_ID DEPARTMENT_NAME
------------ ----------- ---------- ------- -------------- ------------------------------
	 108 Nancy	 FI_MGR       12008	       100 Finance
	 109 Daniel	 FI_ACCOUNT    9000	       100 Finance
	 110 John	 FI_ACCOUNT    8200	       100 Finance
	 111 Ismael	 FI_ACCOUNT    7700	       100 Finance
	 112 Jose Manuel FI_ACCOUNT    7800	       100 Finance
	 113 Luis	 FI_ACCOUNT    6900	       100 Finance
	 205 Shelley	 AC_MGR       12008	       110 Accounting
	 206 William	 AC_ACCOUNT    8300	       110 Accounting

8 rows selected.

SQL>

SQL_ID	5m1bkyzzfp7uf, child number 0
-------------------------------------
select e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.de
partment_name from employees e left join departments d on
(e.department_id = d.department_id) where e.department_id in (100,110)

Plan hash value: 1425487419

---------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			      | Name		  | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
---------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		      | 		  |	 1 |	    |	  4 (100)|	    |	   8 |00:00:00.01 |	  8 |
|*  1 |  HASH JOIN OUTER		      | 		  |	 1 |	  7 |	  4   (0)| 00:00:01 |	   8 |00:00:00.01 |	  8 |
|   2 |   INLIST ITERATOR		      | 		  |	 1 |	    |		 |	    |	   8 |00:00:00.01 |	  4 |
|   3 |    TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	  |	 2 |	  7 |	  2   (0)| 00:00:01 |	   8 |00:00:00.01 |	  4 |
|*  4 |     INDEX RANGE SCAN		      | EMP_DEPARTMENT_IX |	 2 |	  8 |	  1   (0)| 00:00:01 |	   8 |00:00:00.01 |	  2 |
|   5 |   INLIST ITERATOR		      | 		  |	 1 |	    |		 |	    |	   2 |00:00:00.01 |	  4 |
|   6 |    TABLE ACCESS BY INDEX ROWID	      | DEPARTMENTS	  |	 2 |	  2 |	  2   (0)| 00:00:01 |	   2 |00:00:00.01 |	  4 |
|*  7 |     INDEX UNIQUE SCAN		      | DEPT_ID_PK	  |	 2 |	  2 |	  1   (0)| 00:00:01 |	   2 |00:00:00.01 |	  2 |
---------------------------------------------------------------------------------------------------------------------------------------------

No3.

SQL>
select /*+ use_hj(e,d) */ e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name
from employees e left join departments d on (e.department_id = d.department_id)
  3  where e.department_id in (100,110);

 EMPLOYEE_ID FIRST_NAME  JOB_ID      SALARY  DEPARTMENT_ID DEPARTMENT_NAME
------------ ----------- ---------- ------- -------------- ------------------------------
	 108 Nancy	 FI_MGR       12008	       100 Finance
	 109 Daniel	 FI_ACCOUNT    9000	       100 Finance
	 110 John	 FI_ACCOUNT    8200	       100 Finance
	 111 Ismael	 FI_ACCOUNT    7700	       100 Finance
	 112 Jose Manuel FI_ACCOUNT    7800	       100 Finance
	 113 Luis	 FI_ACCOUNT    6900	       100 Finance
	 205 Shelley	 AC_MGR       12008	       110 Accounting
	 206 William	 AC_ACCOUNT    8300	       110 Accounting

8 rows selected.

SQL>
select /*+ use_nl(e,d) */ e.employee_id,e.first_name,e.job_id,e.salary,e.department_id,d.department_name
from employees e left join departments d on (e.department_id = d.department_id)
  3  where e.department_id in (100,110);

 EMPLOYEE_ID FIRST_NAME  JOB_ID      SALARY  DEPARTMENT_ID DEPARTMENT_NAME
------------ ----------- ---------- ------- -------------- ------------------------------
	 108 Nancy	 FI_MGR       12008	       100 Finance
	 109 Daniel	 FI_ACCOUNT    9000	       100 Finance
	 110 John	 FI_ACCOUNT    8200	       100 Finance
	 111 Ismael	 FI_ACCOUNT    7700	       100 Finance
	 112 Jose Manuel FI_ACCOUNT    7800	       100 Finance
	 113 Luis	 FI_ACCOUNT    6900	       100 Finance
	 205 Shelley	 AC_MGR       12008	       110 Accounting
	 206 William	 AC_ACCOUNT    8300	       110 Accounting

8 rows selected.

SQL>

SQL_ID	7v6m33dkx4n75, child number 0
-------------------------------------
select /*+ use_nl(e,d) */ e.employee_id,e.first_name,e.job_id,e.salary,e
.department_id,d.department_name from employees e left join departments
d on (e.department_id = d.department_id) where e.department_id in
(100,110)

Plan hash value: 970600241

---------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			      | Name		  | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
---------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		      | 		  |	 1 |	    |	  9 (100)|	    |	   8 |00:00:00.01 |	 18 |
|   1 |  NESTED LOOPS OUTER		      | 		  |	 1 |	  7 |	  9   (0)| 00:00:01 |	   8 |00:00:00.01 |	 18 |
|   2 |   INLIST ITERATOR		      | 		  |	 1 |	    |		 |	    |	   8 |00:00:00.01 |	  6 |
|   3 |    TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	  |	 2 |	  7 |	  2   (0)| 00:00:01 |	   8 |00:00:00.01 |	  6 |
|*  4 |     INDEX RANGE SCAN		      | EMP_DEPARTMENT_IX |	 2 |	  8 |	  1   (0)| 00:00:01 |	   8 |00:00:00.01 |	  3 |
|   5 |   TABLE ACCESS BY INDEX ROWID	      | DEPARTMENTS	  |	 8 |	  1 |	  1   (0)| 00:00:01 |	   8 |00:00:00.01 |	 12 |
|*  6 |    INDEX UNIQUE SCAN		      | DEPT_ID_PK	  |	 8 |	  1 |	  0   (0)|	    |	   8 |00:00:00.01 |	  4 |
---------------------------------------------------------------------------------------------------------------------------------------------

```


### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

