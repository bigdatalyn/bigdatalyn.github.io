---
layout: post
title: "Oracle Basic SQL 012 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 012 Study Tips

Generate a continuous number
- rownum
- connect by level   

Query iterate over the string one by one
- connect by level







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


### Generate a continuous number

```
SQL> select rownum as rn from employees where rownum <= 10;

 RN
---
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10

10 rows selected.

SQL> select rownum as rn,e.* from employees e where rownum <= 10;

 RN  EMPLOYEE_ID FIRST_NAME LAST_NAME EMAIL    PHONE_NUMBER HIRE_DATE JOB_ID	  SALARY  COMMISSION_PCT  MANAGER_ID  DEPARTMENT_ID
--- ------------ ---------- --------- -------- ------------ --------- ---------- ------- --------------- ----------- --------------
  1	     198 Donald     OConnell  DOCONNEL 650.507.9833 21-JUN-07 SH_CLERK	    2600			 124		 50
  2	     199 Douglas    Grant     DGRANT   650.507.9844 13-JAN-08 SH_CLERK	    2600			 124		 50
  3	     200 Jennifer   Whalen    JWHALEN  515.123.4444 17-SEP-03 AD_ASST	    4400			 101		 10
  4	     201 Michael    Hartstein MHARTSTE 515.123.5555 17-FEB-04 MK_MAN	   13000			 100		 20
  5	     202 Pat	    Fay       PFAY     603.123.6666 17-AUG-05 MK_REP	    6000			 201		 20
  6	     203 Susan	    Mavris    SMAVRIS  515.123.7777 07-JUN-02 HR_REP	    6500			 101		 40
  7	     204 Hermann    Baer      HBAER    515.123.8888 07-JUN-02 PR_REP	   10000			 101		 70
  8	     205 Shelley    Higgins   SHIGGINS 515.123.8080 07-JUN-02 AC_MGR	   12008			 101		110
  9	     206 William    Gietz     WGIETZ   515.123.8181 07-JUN-02 AC_ACCOUNT    8300			 205		110
 10	     100 Steven     King      SKING    515.123.4567 17-JUN-03 AD_PRES	   24000					 90

10 rows selected.

SQL> select level from dual connect by level <= 10;

     LEVEL
----------
	 1
	 2
	 3
	 4
	 5
	 6
	 7
	 8
	 9
	10

10 rows selected.

SQL>
```

### Query iterate over the string one by one

```
create table tab01 as select 123456 as id,'abcdef' as text from dual;

SQL> create table tab01 as select 123456 as id,'abcdef' as text from dual;

Table created.

SQL> select * from tab01;

	ID TEXT
---------- ------
    123456 abcdef

SQL>

SQL> select id,text,level,substr(id,level,1) as id_iterate,substr(text,level,1) as text_iterate,'substr(''' || id || ''', '|| level || ', 1)' as fun_content from tab01 connect by level < length(text);

     ID TEXT	LEVEL ID_ITERATE TEXT_ITERATE FUN_CONTENT
------- ------ ------ ---------- ------------ ----------------------
 123456 abcdef	    1 1 	 a	      substr('123456', 1, 1)
 123456 abcdef	    2 2 	 b	      substr('123456', 2, 1)
 123456 abcdef	    3 3 	 c	      substr('123456', 3, 1)
 123456 abcdef	    4 4 	 d	      substr('123456', 4, 1)
 123456 abcdef	    5 5 	 e	      substr('123456', 5, 1)

SQL>

SQL> select id,text,level from tab01 connect by level <=length(text);

	ID TEXT        LEVEL
---------- ------ ----------
    123456 abcdef	   1
    123456 abcdef	   2
    123456 abcdef	   3
    123456 abcdef	   4
    123456 abcdef	   5
    123456 abcdef	   6

6 rows selected.

SQL>

```

### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

Have a good work&life! 2022/02 via LinHong

