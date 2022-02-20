---
layout: post
title: "Oracle Basic SQL 009 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 009 Study Tips

1. MULTI-TABLE INSERT with no where
2. MULTI-TABLE INSERT with where
3. INSERT FIRST
4. INSERT ALL(row-column conversion)






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


### MULTI-TABLE INSERT with no where

```sql
create table emp01 as select employee_id,last_name,salary from employees where 1=2;
create table emp02 as select employee_id,last_name,department_id from employees where 1=2;

SQL> create table emp01 as select employee_id,last_name,salary from employees where 1=2;

Table created.

SQL> create table emp02 as select employee_id,last_name,department_id from employees where 1=2;

Table created.

SQL>

SQL> select * from employees where department_id in (100,110);

EMPLOYEE_ID FIRST_NAME		 LAST_NAME		   EMAIL		     PHONE_NUMBER	  HIRE_DATE	      JOB_ID	     SALARY COMMISSION_PCT MANAGER_ID DEPARTMENT_ID
----------- -------------------- ------------------------- ------------------------- -------------------- ------------------- ---------- ---------- -------------- ---------- -------------
	108 Nancy		 Greenberg		   NGREENBE		     515.124.4569	  2002/08/17 00:00:00 FI_MGR	      12008			  101		100
	109 Daniel		 Faviet 		   DFAVIET		     515.124.4169	  2002/08/16 00:00:00 FI_ACCOUNT       9000			  108		100
	110 John		 Chen			   JCHEN		     515.124.4269	  2005/09/28 00:00:00 FI_ACCOUNT       8200			  108		100
	111 Ismael		 Sciarra		   ISCIARRA		     515.124.4369	  2005/09/30 00:00:00 FI_ACCOUNT       7700			  108		100
	112 Jose Manuel 	 Urman			   JMURMAN		     515.124.4469	  2006/03/07 00:00:00 FI_ACCOUNT       7800			  108		100
	113 Luis		 Popp			   LPOPP		     515.124.4567	  2007/12/07 00:00:00 FI_ACCOUNT       6900			  108		100
	205 Shelley		 Higgins		   SHIGGINS		     515.123.8080	  2002/06/07 00:00:00 AC_MGR	      12008			  101		110
	206 William		 Gietz			   WGIETZ		     515.123.8181	  2002/06/07 00:00:00 AC_ACCOUNT       8300			  205		110

8 rows selected.

SQL>
```


```
SQL> insert all
into emp01(employee_id,last_name,salary) values (employee_id,last_name,salary)
into emp02(employee_id,last_name,department_id) values (employee_id,last_name,department_id)
select employee_id,last_name,salary,department_id from employees where department_id in (100,110);
```

```sql
insert all
into emp01(employee_id,last_name,salary) values (employee_id,last_name,salary)
into emp02(employee_id,last_name,department_id) values (employee_id,last_name,department_id)
  4  select employee_id,last_name,salary,department_id from employees where department_id in (100,110);

16 rows created.

SQL> select * from emp01;

EMPLOYEE_ID LAST_NAME			  SALARY
----------- ------------------------- ----------
	108 Greenberg			   12008
	109 Faviet			    9000
	110 Chen			    8200
	111 Sciarra			    7700
	112 Urman			    7800
	113 Popp			    6900
	205 Higgins			   12008
	206 Gietz			    8300

8 rows selected.

SQL> select * from emp02;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID
----------- ------------------------- -------------
	108 Greenberg				100
	109 Faviet				100
	110 Chen				100
	111 Sciarra				100
	112 Urman				100
	113 Popp				100
	205 Higgins				110
	206 Gietz				110

8 rows selected.

SQL>
```

```
SQL_ID	b8ymkbq93p4p0, child number 0
-------------------------------------
insert all into emp01(employee_id,last_name,salary) values
(employee_id,last_name,salary) into
emp02(employee_id,last_name,department_id) values
(employee_id,last_name,department_id) select
employee_id,last_name,salary,department_id from employees where
department_id in (100,110)

Plan hash value: 2084016119

------------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			      | Name		  | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers | Reads  |
------------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | INSERT STATEMENT		      | 		  |	 1 |	    |	  2 (100)|	    |	   0 |00:00:00.01 |	 80 |	   4 |
|   1 |  MULTI-TABLE INSERT		      | 		  |	 1 |	    |		 |	    |	   0 |00:00:00.01 |	 80 |	   4 |
|   2 |   INLIST ITERATOR		      | 		  |	 1 |	    |		 |	    |	   8 |00:00:00.01 |	  4 |	   0 |
|   3 |    TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES	  |	 2 |	  7 |	  2   (0)| 00:00:01 |	   8 |00:00:00.01 |	  4 |	   0 |
|*  4 |     INDEX RANGE SCAN		      | EMP_DEPARTMENT_IX |	 2 |	  8 |	  1   (0)| 00:00:01 |	   8 |00:00:00.01 |	  2 |	   0 |
|   5 |   INTO				      | EMP01		  |	 0 |	    |		 |	    |	   0 |00:00:00.01 |	  0 |	   0 |
|   6 |   INTO				      | EMP02		  |	 0 |	    |		 |	    |	   0 |00:00:00.01 |	  0 |	   0 |
------------------------------------------------------------------------------------------------------------------------------------------------------
```

### MULTI-TABLE INSERT with where

```
truncate table emp01;
truncate table emp02;

insert all
when salary > 10000 then
into emp01(employee_id,last_name,salary) values (employee_id,last_name,salary)
when department_id in(100,110) then
into emp02(employee_id,last_name,department_id) values (employee_id,last_name,department_id)
select employee_id,last_name,salary,department_id from employees; 

```


```sql
SQL>
insert all
  2  when salary > 10000 then
into emp01(employee_id,last_name,salary) values (employee_id,last_name,salary)
when department_id in(100,110) then
into emp02(employee_id,last_name,department_id) values (employee_id,last_name,department_id)
  6  select employee_id,last_name,salary,department_id from employees;

23 rows created.

SQL>

SQL> select * from emp01;

EMPLOYEE_ID LAST_NAME			  SALARY
----------- ------------------------- ----------
	201 Hartstein			   13000
	205 Higgins			   12008
	100 King			   24000
	101 Kochhar			   17000
	102 De Haan			   17000
	108 Greenberg			   12008
	114 Raphaely			   11000
	145 Russell			   14000
	146 Partners			   13500
	147 Errazuriz			   12000
	148 Cambrault			   11000
	149 Zlotkey			   10500
	162 Vishney			   10500
	168 Ozer			   11500
	174 Abel			   11000

15 rows selected.

SQL> select * from emp02;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID
----------- ------------------------- -------------
	205 Higgins				110
	206 Gietz				110
	108 Greenberg				100
	109 Faviet				100
	110 Chen				100
	111 Sciarra				100
	112 Urman				100
	113 Popp				100

8 rows selected.

SQL>
```

The record `205 Higgins`/`108 Greenberg` are in table emp01 and emp02.

```
insert all when salary > 10000 then into
emp01(employee_id,last_name,salary) values
(employee_id,last_name,salary) when department_id in(100,110) then into
emp02(employee_id,last_name,department_id) values
(employee_id,last_name,department_id) select
employee_id,last_name,salary,department_id from employees

Plan hash value: 1448845907

----------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	    | Name	| Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time	| Buffers | Reads  |
----------------------------------------------------------------------------------------------------------------------------
|   0 | INSERT STATEMENT    |		|      1 |	  |	3 (100)|	  |	 0 |00:00:00.01 |      81 |	 4 |
|   1 |  MULTI-TABLE INSERT |		|      1 |	  |	       |	  |	 0 |00:00:00.01 |      81 |	 4 |
|   2 |   TABLE ACCESS FULL | EMPLOYEES |      1 |    107 |	3   (0)| 00:00:01 |    107 |00:00:00.01 |	6 |	 0 |
|   3 |   INTO		    | EMP01	|      0 |	  |	       |	  |	 0 |00:00:00.01 |	0 |	 0 |
|   4 |   INTO		    | EMP02	|      0 |	  |	       |	  |	 0 |00:00:00.01 |	0 |	 0 |
----------------------------------------------------------------------------------------------------------------------------
```

### INSERT FIRST

The record `205 Higgins`/`108 Greenberg` are in table emp01 and emp02.

If make these records insert into table emp01,but NOT in table emp02 using insert first.

```
truncate table emp01;
truncate table emp02;

insert first
when salary > 10000 then
into emp01(employee_id,last_name,salary) values (employee_id,last_name,salary)
when department_id in(100,110) then
into emp02(employee_id,last_name,department_id) values (employee_id,last_name,department_id)
select employee_id,last_name,salary,department_id from employees; 

```

```sql
SQL>
insert first
  2  when salary > 10000 then
into emp01(employee_id,last_name,salary) values (employee_id,last_name,salary)
when department_id in(100,110) then
into emp02(employee_id,last_name,department_id) values (employee_id,last_name,department_id)
  6  select employee_id,last_name,salary,department_id from employees;

21 rows created.

SQL> select * from emp01;

EMPLOYEE_ID LAST_NAME			  SALARY
----------- ------------------------- ----------
	201 Hartstein			   13000
	205 Higgins			   12008
	100 King			   24000
	101 Kochhar			   17000
	102 De Haan			   17000
	108 Greenberg			   12008
	114 Raphaely			   11000
	145 Russell			   14000
	146 Partners			   13500
	147 Errazuriz			   12000
	148 Cambrault			   11000
	149 Zlotkey			   10500
	162 Vishney			   10500
	168 Ozer			   11500
	174 Abel			   11000

15 rows selected.

SQL> select * from emp02;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID
----------- ------------------------- -------------
	206 Gietz				110
	109 Faviet				100
	110 Chen				100
	111 Sciarra				100
	112 Urman				100
	113 Popp				100

6 rows selected.

SQL>
```

### INSERT ALL(row-column conversion)

```
SQL> create table t2(c1 varchar2(10),c2 varchar2(20));

Table created.

SQL> create table t1 as select 'no1' as col1, 'no2' as col2, 'no3' as col3 from dual;

Table created.

SQL>

SQL> select * from t1;

COL COL COL
--- --- ---
no1 no2 no3

SQL> select * from t2;

no rows selected

insert all
into t2(c1,c2) values ('c1',col1)
into t2(c1,c2) values ('c2',col2)
into t2(c1,c2) values ('c3',col3)
  5  select col1,col2,col3 from t1;

3 rows created.

SQL> select * from t2;

C1	   C2
---------- --------------------
c1	   no1
c2	   no2
c3	   no3

SQL>

```

### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

