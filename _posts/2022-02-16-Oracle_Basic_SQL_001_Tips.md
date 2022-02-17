---
layout: post
title: "Oracle Basic SQL 001 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}




Oracle Basic SQL 001 Study Tips

01. null first/null last

02. case when





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

### 01.null first/null last

```sql
SQL> select first_name,last_name,manager_id from employees where department_id = 90 order by 3 asc;

FIRST_NAME	     LAST_NAME		       MANAGER_ID
-------------------- ------------------------- ----------
Neena		     Kochhar			      100
Lex		     De Haan			      100
Steven		     King

SQL> select first_name,last_name,manager_id from employees where department_id = 90 order by 3 desc;

FIRST_NAME	     LAST_NAME		       MANAGER_ID
-------------------- ------------------------- ----------
Steven		     King
Lex		     De Haan			      100
Neena		     Kochhar			      100

SQL> select first_name,last_name,manager_id from employees where department_id = 90 order by 3 desc nulls first;

FIRST_NAME	     LAST_NAME		       MANAGER_ID
-------------------- ------------------------- ----------
Steven		     King
Lex		     De Haan			      100
Neena		     Kochhar			      100

SQL> select first_name,last_name,manager_id from employees where department_id = 90 order by 3 desc nulls last;

FIRST_NAME	     LAST_NAME		       MANAGER_ID
-------------------- ------------------------- ----------
Neena		     Kochhar			      100
Lex		     De Haan			      100
Steven		     King

SQL>
```

### 02. salary level

case when

```sql
SQL> select employee_id,first_name||' '||last_name as name, case when salary >= 10000 then 1 else 2 end as Range, salary from employees where department_id=80 order by 3 ,4;

EMPLOYEE_ID NAME						RANGE	  SALARY
----------- ---------------------------------------------- ---------- ----------
	156 Janette King					    1	   10000
	150 Peter Tucker					    1	   10000
	169 Harrison Bloom					    1	   10000
	149 Eleni Zlotkey					    1	   10500
	162 Clara Vishney					    1	   10500
	148 Gerald Cambrault					    1	   11000
	174 Ellen Abel						    1	   11000
	168 Lisa Ozer						    1	   11500
	147 Alberto Errazuriz					    1	   12000
	146 Karen Partners					    1	   13500
	145 John Russell					    1	   14000
	173 Sundita Kumar					    2	    6100
	167 Amit Banda						    2	    6200
	179 Charles Johnson					    2	    6200
	166 Sundar Ande 					    2	    6400
	165 David Lee						    2	    6800
	155 Oliver Tuvault					    2	    7000
	161 Sarath Sewall					    2	    7000
	164 Mattea Marvins					    2	    7200
	172 Elizabeth Bates					    2	    7300
	171 William Smith					    2	    7400
	160 Louise Doran					    2	    7500
	154 Nanette Cambrault					    2	    7500
	159 Lindsey Smith					    2	    8000
	153 Christopher Olsen					    2	    8000
	177 Jack Livingston					    2	    8400
	176 Jonathon Taylor					    2	    8600
	175 Alyssa Hutton					    2	    8800
	158 Allan McEwen					    2	    9000
	152 Peter Hall						    2	    9000
	157 Patrick Sully					    2	    9500
	151 David Bernstein					    2	    9500
	163 Danielle Greene					    2	    9500
	170 Tayler Fox						    2	    9600

34 rows selected.

SQL> select employee_id,first_name||' '||last_name as name, salary from employees where department_id=80 order by case when salary >= 10000 then 1 else 2 end, 3;

EMPLOYEE_ID NAME					       SALARY
----------- ---------------------------------------------- ----------
	156 Janette King					10000
	150 Peter Tucker					10000
	169 Harrison Bloom					10000
	149 Eleni Zlotkey					10500
	162 Clara Vishney					10500
	148 Gerald Cambrault					11000
	174 Ellen Abel						11000
	168 Lisa Ozer						11500
	147 Alberto Errazuriz					12000
	146 Karen Partners					13500
	145 John Russell					14000
	173 Sundita Kumar					 6100
	167 Amit Banda						 6200
	179 Charles Johnson					 6200
	166 Sundar Ande 					 6400
	165 David Lee						 6800
	155 Oliver Tuvault					 7000
	161 Sarath Sewall					 7000
	164 Mattea Marvins					 7200
	172 Elizabeth Bates					 7300
	171 William Smith					 7400
	160 Louise Doran					 7500
	154 Nanette Cambrault					 7500
	159 Lindsey Smith					 8000
	153 Christopher Olsen					 8000
	177 Jack Livingston					 8400
	176 Jonathon Taylor					 8600
	175 Alyssa Hutton					 8800
	158 Allan McEwen					 9000
	152 Peter Hall						 9000
	157 Patrick Sully					 9500
	151 David Bernstein					 9500
	163 Danielle Greene					 9500
	170 Tayler Fox						 9600

34 rows selected.

SQL>
```


### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

