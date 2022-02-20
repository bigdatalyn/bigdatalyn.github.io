---
layout: post
title: "Oracle Basic SQL 008 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}




Oracle Basic SQL 008 Study Tips

INSERT default value.

Use view to protect default value.






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


### INSERT default values

INSERT


```sql
SQL> create table insert_t01(
  2  col1 varchar2(10) default 'def01',
  3  col2 varchar2(10) default 'def02',
  4  col3 varchar2(10) default 'def03',
  5  col4 date default sysdate
  6  );

Table created.

SQL>

SQL> insert into insert_t01(col1,col2,col3) values(default,null,'maninput');

1 row created.

SQL> commit;

Commit complete.

SQL>
SQL> alter session set nls_date_format = 'yyyy/mm/dd hh24:mi:ss';

Session altered.

SQL> select * from insert_t01;

COL1	   COL2       COL3	 COL4
---------- ---------- ---------- -------------------
def01		      maninput	 2022/02/19 10:01:35

SQL>

```

1. col4 no value will insert default value.

2. use `default` to insert default value.

3. col2/col3 insert manual value and null value.

### Use view to protect default value.

Use view to protect default value.

```sql

create or replace view v_insert_t01 as select col1,col2,col3 from insert_t01;
insert into v_insert_t01(col1,col2,col3) values ('maninput1',null,'maninput3');

SQL> create or replace view v_insert_t01 as select col1,col2,col3 from insert_t01;

View created.

SQL> insert into v_insert_t01(col1,col2,col3) values ('maninput1',null,'maninput3');

1 row created.

SQL> commit;

Commit complete.

SQL> select * from insert_t01;

COL1	   COL2       COL3	 COL4
---------- ---------- ---------- -------------------
def01		      maninput	 2022/02/19 10:01:35
maninput1	      maninput3  2022/02/19 10:20:29

SQL>
```

However, can NOT use `default` to insert default value in view.

```sql
SQL> insert into v_insert_t01(col1,col2,col3) values (default,null,'maninput3');
insert into v_insert_t01(col1,col2,col3) values (default,null,'maninput3')
                                                 *
ERROR at line 1:
ORA-32575: Explicit column default is not supported for modifying views


SQL>
```


### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

