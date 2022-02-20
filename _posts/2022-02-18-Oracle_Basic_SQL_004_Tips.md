---
layout: post
title: "Oracle Basic SQL 004 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 004 Study Tips

01. INNER JOIN
02. LEFT JOIN
03. RIGHT JOIN
04. FULL JOIN










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

```sql
create table L_T as 
select 'left01' as text,'1' as val from dual union all
select 'left02' as text,'2' as val from dual union all
select 'left03' as text,'3' as val from dual union all
select 'left04' as text,'4' as val from dual;

create table R_T as 
select 'right03' as text,'3' as val from dual union all
select 'right04' as text,'4' as val from dual union all
select 'right05' as text,'5' as val from dual union all
select 'right06' as text,'6' as val from dual;


SQL> select * from L_T;

TEXT   V
------ -
left01 1
left02 2
left03 3
left04 4

SQL> select * from R_T;

TEXT	V
------- -
right03 3
right04 4
right05 5
right06 6

SQL>
```

### INNER JOIN

- inner join
- where

```sql
SQL> select l.text,r.text from l_t l inner join r_t r on (l.val = r.val);

TEXT   TEXT
------ -------
left03 right03
left04 right04

SQL>
SQL> select l.text,r.text from l_t l,r_t r where l.val=r.val;

TEXT   TEXT
------ -------
left03 right03
left04 right04

SQL>


SQL_ID	gakhk7px83qnz, child number 0
-------------------------------------
select l.text,r.text from l_t l inner join r_t r on (l.val = r.val)

Plan hash value: 3346071298

-------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |	 1 |	    |	  6 (100)|	    |	   2 |00:00:00.01 |	  5 |
|*  1 |  HASH JOIN	   |	  |	 1 |	  4 |	  6   (0)| 00:00:01 |	   2 |00:00:00.01 |	  5 |
|   2 |   TABLE ACCESS FULL| L_T  |	 1 |	  4 |	  3   (0)| 00:00:01 |	   4 |00:00:00.01 |	  2 |
|   3 |   TABLE ACCESS FULL| R_T  |	 1 |	  4 |	  3   (0)| 00:00:01 |	   4 |00:00:00.01 |	  3 |
-------------------------------------------------------------------------------------------------------------

```

### LEFT JOIN

```sql
SQL> select l.text,r.text from l_t l left join r_t r on l.val=r.val order by 1,2;

TEXT   TEXT
------ -------
left01
left02
left03 right03
left04 right04

SQL>

SQL> select l.text,r.text from l_t l,r_t r where l.val=r.val(+) order by 1,2;

TEXT   TEXT
------ -------
left01
left02
left03 right03
left04 right04

SQL>

SQL_ID	f0f2sbvrp9r9g, child number 0
-------------------------------------
select l.text,r.text from l_t l left join r_t r on l.val=r.val order by
1,2

Plan hash value: 307359924

--------------------------------------------------------------------------------------------------------------
| Id  | Operation	    | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT    |	   |	  1 |	     |	   7 (100)|	     |	    4 |00:00:00.01 |	   4 |
|   1 |  SORT ORDER BY	    |	   |	  1 |	   4 |	   7  (15)| 00:00:01 |	    4 |00:00:00.01 |	   4 |
|*  2 |   HASH JOIN OUTER   |	   |	  1 |	   4 |	   6   (0)| 00:00:01 |	    4 |00:00:00.01 |	   4 |
|   3 |    TABLE ACCESS FULL| L_T  |	  1 |	   4 |	   3   (0)| 00:00:01 |	    4 |00:00:00.01 |	   2 |
|   4 |    TABLE ACCESS FULL| R_T  |	  1 |	   4 |	   3   (0)| 00:00:01 |	    4 |00:00:00.01 |	   2 |
--------------------------------------------------------------------------------------------------------------

```

### RIGHT JOIN

```sql
SQL> select l.text,r.text from l_t l right join r_t r on l.val=r.val order by 1,2;

TEXT   TEXT
------ -------
left03 right03
left04 right04
       right05
       right06

SQL> select l.text,r.text from l_t l,r_t r where l.val(+)=r.val order by 1,2;

TEXT   TEXT
------ -------
left03 right03
left04 right04
       right05
       right06

SQL>

SQL_ID	d8sjj91vpsvd3, child number 0
-------------------------------------
select l.text,r.text from l_t l right join r_t r on l.val=r.val order
by 1,2

Plan hash value: 779217567

--------------------------------------------------------------------------------------------------------------
| Id  | Operation	    | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT    |	   |	  1 |	     |	   7 (100)|	     |	    4 |00:00:00.01 |	   4 |
|   1 |  SORT ORDER BY	    |	   |	  1 |	   4 |	   7  (15)| 00:00:01 |	    4 |00:00:00.01 |	   4 |
|*  2 |   HASH JOIN OUTER   |	   |	  1 |	   4 |	   6   (0)| 00:00:01 |	    4 |00:00:00.01 |	   4 |
|   3 |    TABLE ACCESS FULL| R_T  |	  1 |	   4 |	   3   (0)| 00:00:01 |	    4 |00:00:00.01 |	   2 |
|   4 |    TABLE ACCESS FULL| L_T  |	  1 |	   4 |	   3   (0)| 00:00:01 |	    4 |00:00:00.01 |	   2 |
--------------------------------------------------------------------------------------------------------------
```

### FULL JOIN

There is NOT `(+)` method in FULL JOIN.

```sql
SQL> select l.text,r.text from l_t l full join r_t r on l.val=r.val order by 1,2;

TEXT   TEXT
------ -------
left01
left02
left03 right03
left04 right04
       right05
       right06

6 rows selected.

SQL>
SQL_ID	0z1vv1xz3kfad, child number 0
-------------------------------------
select l.text,r.text from l_t l full join r_t r on l.val=r.val order by
1,2

Plan hash value: 3621242069

---------------------------------------------------------------------------------------------------------------------
| Id  | Operation	       | Name	  | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
---------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT       |	  |	 1 |	    |	  7 (100)|	    |	   6 |00:00:00.01 |	  4 |
|   1 |  SORT ORDER BY	       |	  |	 1 |	  4 |	  7  (15)| 00:00:01 |	   6 |00:00:00.01 |	  4 |
|   2 |   VIEW		       | VW_FOJ_0 |	 1 |	  4 |	  6   (0)| 00:00:01 |	   6 |00:00:00.01 |	  4 |
|*  3 |    HASH JOIN FULL OUTER|	  |	 1 |	  4 |	  6   (0)| 00:00:01 |	   6 |00:00:00.01 |	  4 |
|   4 |     TABLE ACCESS FULL  | L_T	  |	 1 |	  4 |	  3   (0)| 00:00:01 |	   4 |00:00:00.01 |	  2 |
|   5 |     TABLE ACCESS FULL  | R_T	  |	 1 |	  4 |	  3   (0)| 00:00:01 |	   4 |00:00:00.01 |	  2 |
---------------------------------------------------------------------------------------------------------------------
```

### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

