---
layout: post
title: "Oracle Basic SQL 010 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}




Oracle Basic SQL 010 Study Tips

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


### TEST Data

```
create table emp as select employee_id,last_name,department_id from employees where department_id in (100,110);
alter table emp add department_name varchar2(30) default 'default_name';

-- all data has update via the following update sql.
update emp e set e.department_name =
(select d.department_name
from departments d
where d.department_id = e.department_id
and d.department_name in ('Finance')
);

-- update the limit where condition(exists).
-- need to access deparments twice like plan execution.

update emp e set e.department_name =
(select d.department_name
from departments d
where d.department_id = e.department_id
and d.department_name in ('Finance'))
where exists (
select d.department_name
from departments d
where d.department_id = e.department_id
and d.department_name in ('Finance')
);

-- use view to update with where condition.

update (
select e.employee_id,e.department_name,d.department_name as new_department_name
from emp e inner join departments d on e.department_id = d.department_id 
where d.department_name in ('Finance')
)
set department_name = new_department_name;

-- merge into to update
-- need to access deparments only once like plan execution.

merge into emp e
using (select department_name,department_id from departments d where d.department_name in ('Finance')) dept 
on (dept.department_id = e.department_id)
when matched then
update set e.department_name = dept.department_name;

```

### Update and Update with EXISTS

```sql
SQL> select * from departments where department_id in (100,110);

DEPARTMENT_ID DEPARTMENT_NAME		     MANAGER_ID LOCATION_ID
------------- ------------------------------ ---------- -----------
	  100 Finance				    108        1700
	  110 Accounting			    205        1700

SQL>
SQL> select * from employees where department_id in (100,110);

EMPLOYEE_ID FIRST_NAME		 LAST_NAME		   EMAIL		     PHONE_NUMBER	  HIRE_DATE JOB_ID	   SALARY COMMISSION_PCT MANAGER_ID DEPARTMENT_ID
----------- -------------------- ------------------------- ------------------------- -------------------- --------- ---------- ---------- -------------- ---------- -------------
	108 Nancy		 Greenberg		   NGREENBE		     515.124.4569	  17-AUG-02 FI_MGR	    12008			101	      100
	109 Daniel		 Faviet 		   DFAVIET		     515.124.4169	  16-AUG-02 FI_ACCOUNT	     9000			108	      100
	110 John		 Chen			   JCHEN		     515.124.4269	  28-SEP-05 FI_ACCOUNT	     8200			108	      100
	111 Ismael		 Sciarra		   ISCIARRA		     515.124.4369	  30-SEP-05 FI_ACCOUNT	     7700			108	      100
	112 Jose Manuel 	 Urman			   JMURMAN		     515.124.4469	  07-MAR-06 FI_ACCOUNT	     7800			108	      100
	113 Luis		 Popp			   LPOPP		     515.124.4567	  07-DEC-07 FI_ACCOUNT	     6900			108	      100
	205 Shelley		 Higgins		   SHIGGINS		     515.123.8080	  07-JUN-02 AC_MGR	    12008			101	      110
	206 William		 Gietz			   WGIETZ		     515.123.8181	  07-JUN-02 AC_ACCOUNT	     8300			205	      110

8 rows selected.

SQL> create table emp as select employee_id,last_name,department_id from employees where department_id in (100,110);

Table created.

SQL> alter table emp add department_name varchar2(30) default 'default_name';

Table altered.

SQL> select * from emp;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID DEPARTMENT_NAME
----------- ------------------------- ------------- ------------------------------
	108 Greenberg				100 default_name
	109 Faviet				100 default_name
	110 Chen				100 default_name
	111 Sciarra				100 default_name
	112 Urman				100 default_name
	113 Popp				100 default_name
	205 Higgins				110 default_name
	206 Gietz				110 default_name

8 rows selected.

update emp e set e.department_name =
  2  (select d.department_name
  3  from departments d
  4  where d.department_id = e.department_id
and d.department_name in ('Finance')
  6  );

8 rows updated.

SQL> select * from emp;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID DEPARTMENT_NAME
----------- ------------------------- ------------- ------------------------------
	108 Greenberg				100 Finance
	109 Faviet				100 Finance
	110 Chen				100 Finance
	111 Sciarra				100 Finance
	112 Urman				100 Finance
	113 Popp				100 Finance
	205 Higgins				110
	206 Gietz				110

8 rows selected.

SQL> rollback;

Rollback complete.

SQL> select * from emp;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID DEPARTMENT_NAME
----------- ------------------------- ------------- ------------------------------
	108 Greenberg				100 default_name
	109 Faviet				100 default_name
	110 Chen				100 default_name
	111 Sciarra				100 default_name
	112 Urman				100 default_name
	113 Popp				100 default_name
	205 Higgins				110 default_name
	206 Gietz				110 default_name

8 rows selected.

SQL>

update emp e set e.department_name =
  2  (select d.department_name
  3  from departments d
  4  where d.department_id = e.department_id
and d.department_name in ('Finance'))
  6  where exists (
  7  select d.department_name
  8  from departments d
  9  where d.department_id = e.department_id
and d.department_name in ('Finance')
 11  );

6 rows updated.

SQL>
SQL> select * from emp;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID DEPARTMENT_NAME
----------- ------------------------- ------------- ------------------------------
	108 Greenberg				100 Finance
	109 Faviet				100 Finance
	110 Chen				100 Finance
	111 Sciarra				100 Finance
	112 Urman				100 Finance
	113 Popp				100 Finance
	205 Higgins				110 default_name
	206 Gietz				110 default_name

8 rows selected.

SQL>

```

Execute plan Tips:

`No4` and `No8` access table: `departments` twice.

```
SQL_ID	9pcuvbgsrpmy3, child number 0
-------------------------------------
update emp e set e.department_name = (select d.department_name from
departments d where d.department_id = e.department_id and
d.department_name in ('Finance')) where exists ( select
d.department_name from departments d where d.department_id =
e.department_id and d.department_name in ('Finance') )

Plan hash value: 1124430447

-------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		      | Name	    | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------------------------
|   0 | UPDATE STATEMENT	      | 	    |	   1 |	      |    14 (100)|	      |      0 |00:00:00.01 |	   20 |
|   1 |  UPDATE 		      | EMP	    |	   1 |	      | 	   |	      |      0 |00:00:00.01 |	   20 |
|   2 |   MERGE JOIN		      | 	    |	   1 |	    4 |     6  (17)| 00:00:01 |      6 |00:00:00.01 |	    4 |
|*  3 |    TABLE ACCESS BY INDEX ROWID| DEPARTMENTS |	   1 |	    1 |     2	(0)| 00:00:01 |      1 |00:00:00.01 |	    2 |
|   4 |     INDEX FULL SCAN	      | DEPT_ID_PK  |	   1 |	   27 |     1	(0)| 00:00:01 |     27 |00:00:00.01 |	    1 |
|*  5 |    SORT JOIN		      | 	    |	   1 |	    8 |     4  (25)| 00:00:01 |      6 |00:00:00.01 |	    2 |
|   6 |     TABLE ACCESS FULL	      | EMP	    |	   1 |	    8 |     3	(0)| 00:00:01 |      8 |00:00:00.01 |	    2 |
|*  7 |   TABLE ACCESS BY INDEX ROWID | DEPARTMENTS |	   1 |	    1 |     1	(0)| 00:00:01 |      1 |00:00:00.01 |	    2 |
|*  8 |    INDEX UNIQUE SCAN	      | DEPT_ID_PK  |	   1 |	    1 |     0	(0)|	      |      1 |00:00:00.01 |	    1 |
-------------------------------------------------------------------------------------------------------------------------------
```

### Update via VIEW

departments has primary key (department_id).

```sql
SQL> rollback;

Rollback complete.

SQL> select * from emp;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID DEPARTMENT_NAME
----------- ------------------------- ------------- ------------------------------
	108 Greenberg				100 default_name
	109 Faviet				100 default_name
	110 Chen				100 default_name
	111 Sciarra				100 default_name
	112 Urman				100 default_name
	113 Popp				100 default_name
	205 Higgins				110 default_name
	206 Gietz				110 default_name

8 rows selected.

select e.employee_id,e.department_name,d.department_name as new_department_name
  2  from emp e inner join departments d on e.department_id = d.department_id
  3  where d.department_name in ('Finance');

EMPLOYEE_ID DEPARTMENT_NAME		   NEW_DEPARTMENT_NAME
----------- ------------------------------ ------------------------------
	108 default_name		   Finance
	109 default_name		   Finance
	110 default_name		   Finance
	111 default_name		   Finance
	113 default_name		   Finance
	112 default_name		   Finance

6 rows selected.

update (
  2  select e.employee_id,e.department_name,d.department_name as new_department_name
  3  from emp e inner join departments d on e.department_id = d.department_id
where d.department_name in ('Finance')
)
  6  set department_name = new_department_name;

6 rows updated.

SQL>
```

Execute plan Tips:

`No3` access table: `departments` once.

```
SQL_ID	600xcz9myh2z1, child number 0
-------------------------------------
update ( select e.employee_id,e.department_name,d.department_name as
new_department_name from emp e inner join departments d on
e.department_id = d.department_id where d.department_name in
('Finance') ) set department_name = new_department_name

Plan hash value: 2720989409

-------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		      | Name	    | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------------------------
|   0 | UPDATE STATEMENT	      | 	    |	   1 |	      |     6 (100)|	      |      0 |00:00:00.01 |	   12 |
|   1 |  UPDATE 		      | EMP	    |	   1 |	      | 	   |	      |      0 |00:00:00.01 |	   12 |
|   2 |   MERGE JOIN		      | 	    |	   1 |	    4 |     6  (17)| 00:00:01 |      6 |00:00:00.01 |	    4 |
|*  3 |    TABLE ACCESS BY INDEX ROWID| DEPARTMENTS |	   1 |	    1 |     2	(0)| 00:00:01 |      1 |00:00:00.01 |	    2 |
|   4 |     INDEX FULL SCAN	      | DEPT_ID_PK  |	   1 |	   27 |     1	(0)| 00:00:01 |     27 |00:00:00.01 |	    1 |
|*  5 |    SORT JOIN		      | 	    |	   1 |	    8 |     4  (25)| 00:00:01 |      6 |00:00:00.01 |	    2 |
|   6 |     TABLE ACCESS FULL	      | EMP	    |	   1 |	    8 |     3	(0)| 00:00:01 |      8 |00:00:00.01 |	    2 |
-------------------------------------------------------------------------------------------------------------------------------
```


### Update with MERGE

```sql
SQL> select * from emp;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID DEPARTMENT_NAME
----------- ------------------------- ------------- ------------------------------
	108 Greenberg				100 Finance
	109 Faviet				100 Finance
	110 Chen				100 Finance
	111 Sciarra				100 Finance
	112 Urman				100 Finance
	113 Popp				100 Finance
	205 Higgins				110 default_name
	206 Gietz				110 default_name

8 rows selected.

SQL> rollback;

Rollback complete.

SQL> select * from emp;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID DEPARTMENT_NAME
----------- ------------------------- ------------- ------------------------------
	108 Greenberg				100 default_name
	109 Faviet				100 default_name
	110 Chen				100 default_name
	111 Sciarra				100 default_name
	112 Urman				100 default_name
	113 Popp				100 default_name
	205 Higgins				110 default_name
	206 Gietz				110 default_name

8 rows selected.

SQL>
merge into emp e
using (select department_name,department_id from departments d where d.department_name in ('Finance')) dept
on (dept.department_id = e.department_id)
  4  when matched then
  5  update set e.department_name = dept.department_name;

6 rows merged.

SQL> select * from emp;

EMPLOYEE_ID LAST_NAME		      DEPARTMENT_ID DEPARTMENT_NAME
----------- ------------------------- ------------- ------------------------------
	108 Greenberg				100 Finance
	109 Faviet				100 Finance
	110 Chen				100 Finance
	111 Sciarra				100 Finance
	112 Urman				100 Finance
	113 Popp				100 Finance
	205 Higgins				110 default_name
	206 Gietz				110 default_name

8 rows selected.

SQL>

```
Execute plan Tips:

`No3` access table: `departments` once.

Same with Update viwa VIEW.

```
SQL_ID	1cj13awr6bcdh, child number 0
-------------------------------------
merge into emp e using (select department_name,department_id from
departments d where d.department_name in ('Finance')) dept on
(dept.department_id = e.department_id) when matched then update set
e.department_name = dept.department_name

Plan hash value: 657231492

--------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		       | Name	     | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------------
|   0 | MERGE STATEMENT 	       |	     |	    1 |        |     6 (100)|	       |      0 |00:00:00.01 |	    12 |
|   1 |  MERGE			       | EMP	     |	    1 |        |	    |	       |      0 |00:00:00.01 |	    12 |
|   2 |   VIEW			       |	     |	    1 |        |	    |	       |      6 |00:00:00.01 |	     4 |
|   3 |    MERGE JOIN		       |	     |	    1 |      4 |     6	(17)| 00:00:01 |      6 |00:00:00.01 |	     4 |
|*  4 |     TABLE ACCESS BY INDEX ROWID| DEPARTMENTS |	    1 |      1 |     2	 (0)| 00:00:01 |      1 |00:00:00.01 |	     2 |
|   5 |      INDEX FULL SCAN	       | DEPT_ID_PK  |	    1 |     27 |     1	 (0)| 00:00:01 |     27 |00:00:00.01 |	     1 |
|*  6 |     SORT JOIN		       |	     |	    1 |      8 |     4	(25)| 00:00:01 |      6 |00:00:00.01 |	     2 |
|   7 |      TABLE ACCESS FULL	       | EMP	     |	    1 |      8 |     3	 (0)| 00:00:01 |      8 |00:00:00.01 |	     2 |
--------------------------------------------------------------------------------------------------------------------------------
```


### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

