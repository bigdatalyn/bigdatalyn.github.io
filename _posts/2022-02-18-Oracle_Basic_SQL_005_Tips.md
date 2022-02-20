---
layout: post
title: "Oracle Basic SQL 005 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 005 Study Tips

- LEFT OUNT with WHERE








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

create table L_T01 as 
select 'left01' as text,'1' as val from dual union all
select 'left02' as text,'2' as val from dual union all
select 'left03' as text,'3' as val from dual union all
select 'left04' as text,'4' as val from dual;

create table R_T01 as 
select 'right03' as text,'3' as val,1 as status from dual union all
select 'right04' as text,'4' as val,0 as status from dual union all
select 'right05' as text,'5' as val,0 as status from dual union all
select 'right06' as text,'6' as val,0 as status from dual;

SQL> select * from l_t01;

TEXT   V
------ -
left01 1
left02 2
left03 3
left04 4

SQL> select * from r_t01;

TEXT	V     STATUS
------- - ----------
right03 3	   1
right04 4	   0
right05 5	   0
right06 6	   0

SQL>

```

### LEFT OUNT with WHERE

Pay attention to the result set as belowing. 

No.02/No.04 is the right sql.

```
01. select l.text,r.text,r.status from l_t01 l left join r_t01 r on l.val=r.val order by 1,2;
02. select l.text,r.text,r.status from l_t01 l left join r_t01 r on (l.val=r.val and r.status=1) order by 1,2;

03. select l.text,r.text,r.status from l_t01 l,r_t01 r where l.val = r.val(+) and r.status=1 order by 1,2;
04. select l.text,r.text,r.status from l_t01 l,r_t01 r where l.val = r.val(+) and r.status(+)=1 order by 1,2;
```

```sql

SQL> select l.text,r.text,r.status from l_t01 l left join r_t01 r on l.val=r.val order by 1,2;

TEXT   TEXT	   STATUS
------ ------- ----------
left01
left02
left03 right03		1
left04 right04		0

SQL>

SQL> select l.text,r.text,r.status from l_t01 l left join r_t01 r on l.val=r.val where status=1 order by 1,2;

TEXT   TEXT	   STATUS
------ ------- ----------
left03 right03		1

SQL>

SQL> select l.text,r.text,r.status from l_t01 l left join r_t01 r on (l.val=r.val and r.status=1) order by 1,2;

TEXT   TEXT	   STATUS
------ ------- ----------
left01
left02
left03 right03		1
left04

SQL>

SQL> select l.text,r.text,r.status from l_t01 l,r_t01 r where l.val = r.val(+) and r.status=1 order by 1,2;

TEXT   TEXT	   STATUS
------ ------- ----------
left03 right03		1

SQL> select l.text,r.text,r.status from l_t01 l,r_t01 r where l.val = r.val(+) and r.status(+)=1 order by 1,2;

TEXT   TEXT	   STATUS
------ ------- ----------
left01
left02
left03 right03		1
left04

SQL>

```
Usually, use the following No.05 sql, it will be clearer and easier to read.
```
No.05 select l.text,r.text,r.status from l_t01 l left join (select text,val,status from r_t01 where status=1) r on l.val=r.val order by 1,2;
```

```sql
SQL> select l.text,r.text,r.status from l_t01 l left join (select text,val,status from r_t01 where status=1) r on l.val=r.val order by 1,2;

TEXT   TEXT	   STATUS
------ ------- ----------
left01
left02
left03 right03		1
left04

SQL>
```
### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

