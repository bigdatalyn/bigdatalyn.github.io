---
layout: post
title: "Oracle Sample Schema Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle Sample Schema Tips











### Oracle Sample Schema


[Oracle Database sample schemas](https://github.com/oracle/db-sample-schemas/releases/tag/v19c) in Github.

Download and unzip the sample schema file.

```sql
perl -p -i.bak -e 's#__SUB__CWD__#'"$(pwd)"'#g' ./*.sql ./*/*.sql ./*/*.dat
echo "@mksample SysPassword1 SysPassword1 oracle oracle oracle oracle oracle oracle users temp /tmp/ PDB1" \
  | sqlplus system/SysPassword1@PDB1
```

Step by step via mksample.sql.

```sql
SQL> @mksample.sql
 
specify password for SYSTEM as parameter 1:
Enter value for 1: SysPassword1
 
specify password for SYS as parameter 2:
Enter value for 2: SysPassword1
 
specify password for HR as parameter 3:
Enter value for 3: hr
 
specify password for OE as parameter 4:
Enter value for 4: oe
 
specify password for PM as parameter 5:
Enter value for 5: pm
 
specify password for IX as parameter 6:
Enter value for 6: ix
 
specify password for  SH as parameter 7:
Enter value for 7: sh
 
specify password for  BI as parameter 8:
Enter value for 8: bi
 
specify default tablespace as parameter 9:
Enter value for 9: USERS
 
specify temporary tablespace as parameter 10:
Enter value for 10: TEMP
 
specify log file directory (including trailing delimiter) as parameter 11:
Enter value for 11: PDB1

```
or
```sql
SQL> @mksample.sql SysPassword1 SysPassword1 hr oe pm ix sh bi USERS TEMP /tmp/ PDB1
```

Data:

```
HONG@pdb1> set pagesize 300
HONG@pdb1> SELECT    owner, table_name, num_rows
  2   FROM     dba_all_tables
  3   WHERE    owner in ('HR','OE','SH','PM','IX','BI')
  4   ORDER BY 1,2,3;

OWNER TABLE_NAME                      NUM_ROWS
----- ------------------------------ ---------
HR    COUNTRIES                             25
HR    DEPARTMENTS                           27
HR    EMPLOYEES                            107
HR    JOBS                                  19
HR    JOB_HISTORY                           10
HR    LOCATIONS                             23
HR    REGIONS                                4
IX    AQ$_ORDERS_QUEUETABLE_G                0
IX    AQ$_ORDERS_QUEUETABLE_H                2
IX    AQ$_ORDERS_QUEUETABLE_I                2
IX    AQ$_ORDERS_QUEUETABLE_L                2
IX    AQ$_ORDERS_QUEUETABLE_S                4
IX    AQ$_ORDERS_QUEUETABLE_T                0
IX    AQ$_STREAMS_QUEUE_TABLE_C              0
IX    AQ$_STREAMS_QUEUE_TABLE_G              0
IX    AQ$_STREAMS_QUEUE_TABLE_H              0
IX    AQ$_STREAMS_QUEUE_TABLE_I              0
IX    AQ$_STREAMS_QUEUE_TABLE_L              0
IX    AQ$_STREAMS_QUEUE_TABLE_S              1
IX    AQ$_STREAMS_QUEUE_TABLE_T              0
IX    ORDERS_QUEUETABLE
IX    STREAMS_QUEUE_TABLE
IX    SYS_IOT_OVER_74146                     0
IX    SYS_IOT_OVER_74175                     0
OE    ACTION_TABLE                         132
OE    CATEGORIES_TAB                        22
OE    CUSTOMERS                            319
OE    INVENTORIES                         1112
OE    LINEITEM_TABLE                      2232
OE    ORDERS                               105
OE    ORDER_ITEMS                          665
OE    PRODUCT_DESCRIPTIONS                8640
OE    PRODUCT_INFORMATION                  288
OE    PRODUCT_REF_LIST_NESTEDTAB           288
OE    PROMOTIONS                             2
OE    PURCHASEORDER                        132
OE    SUBCATEGORY_REF_LIST_NESTEDTAB        21
OE    WAREHOUSES                             9
PM    ONLINE_MEDIA                           0
PM    PRINT_MEDIA                            4
PM    TEXTDOCS_NESTEDTAB                    12
SH    CAL_MONTH_SALES_MV                    48
SH    CHANNELS                               5
SH    COSTS                              82112
SH    COUNTRIES                             23
SH    CUSTOMERS                          55500
SH    DR$SUP_TEXT_IDX$I
SH    DR$SUP_TEXT_IDX$K
SH    DR$SUP_TEXT_IDX$N
SH    DR$SUP_TEXT_IDX$U
SH    FWEEK_PSCAT_SALES_MV               11266
SH    PRODUCTS                              72
SH    PROMOTIONS                           503
SH    SALES                             918843
SH    SALES_TRANSACTIONS_EXT            916039
SH    SUPPLEMENTARY_DEMOGRAPHICS          4500
SH    TIMES                               1826

57 rows selected.

HONG@pdb1> 
```


### Verify schemas.


```sql
[oracle@ol8-19c db-sample-schemas-12.2.0.1]$ cat /home/oracle/db-sample-schemas-12.2.0.1/mkverify.sql
Rem
Rem $Header: mkverify.sql 2015/03/19 10:23:26 smtaylor Exp $
Rem
Rem mkverify.sql
Rem
Rem Copyright (c) 2002, 2015, Oracle. All rights reserved.  
Rem 
Rem Permission is hereby granted, free of charge, to any person obtaining
Rem a copy of this software and associated documentation files (the
Rem "Software"), to deal in the Software without restriction, including
Rem without limitation the rights to use, copy, modify, merge, publish,
Rem distribute, sublicense, and/or sell copies of the Software, and to
Rem permit persons to whom the Software is furnished to do so, subject to
Rem the following conditions:
Rem 
Rem The above copyright notice and this permission notice shall be
Rem included in all copies or substantial portions of the Software.
Rem 
Rem THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
Rem EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
Rem MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
Rem NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
Rem LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
Rem OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
Rem WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
Rem
Rem    NAME
Rem      mkverify.sql -  Verify the Sample Schema creation
Rem
Rem    DESCRIPTION
Rem      Run various scripts against the dictionary
Rem
Rem    NOTES
Rem      Relies on accurate statistics being collected
Rem
Rem    MODIFIED   (MM/DD/YY)
Rem    smtaylor    03/19/15 - added parameter 3, connect string
Rem    smtaylor    03/19/15 - added @&connect_string to CONNECT
Rem    cbauwens    08/09/04 - sorting of constraints 
Rem    ahunold     02/11/03 - sorting of object privileges
Rem    ahunold     10/25/02 - Dimensions, XML
Rem    ahunold     10/12/02 - DBA_ALL_TABLES, data types
Rem    ahunold     09/25/02 - Created
Rem

PROMPT
PROMPT specify password for SYSTEM as parameter 1:
DEFINE password_system     = &1
PROMPT
PROMPT specify spool filename as parameter 2:
DEFINE spool_file          = &2
PROMPT 
PROMPT specify connect string as parameter 3:
DEFINE connect_string     = &3
PROMPT

CONNECT system/&password_system@&connect_string;

--
-- Workaround until situation with DBA_ALL_TABLES is clear
--

analyze table oe.categories_tab compute statistics;

analyze table oe.product_ref_list_nestedtab compute statistics;

analyze table oe.subcategory_ref_list_nestedtab compute statistics;

analyze table oe.purchaseorder compute statistics;

analyze table pm.textdocs_nestedtab compute statistics;

SET ECHO OFF
SET FEEDBACK 1
SET NUMWIDTH 10
SET LINESIZE 90
SET TRIMSPOOL ON
SET TAB OFF
SET PAGESIZE 999

COLUMN constraint_type  FORMAT A20
COLUMN data_type        FORMAT A35
COLUMN data_type_owner  FORMAT A16
COLUMN dimension_name   FORMAT A20
COLUMN generated        FORMAT A16
COLUMN granted_role     FORMAT A25
COLUMN grantee          FORMAT A7
COLUMN grantor          FORMAT A7
COLUMN index_name       FORMAT A25
COLUMN object_name      FORMAT A30
COLUMN object_type      FORMAT A20
COLUMN owner            FORMAT A6
COLUMN privilege        FORMAT A25
COLUMN schema_owner     FORMAT A16
COLUMN segment_type     FORMAT A20
COLUMN status           FORMAT A8
COLUMN storage_type     FORMAT A20
COLUMN subobject_name   FORMAT A16
COLUMN table_name       FORMAT A30
COLUMN validated        FORMAT A16

SPOOL &spool_file

PROMPT
PROMPT All named objects and stati

SELECT    owner, object_type, object_name, subobject_name, status
 FROM     dba_objects
 WHERE    owner in ('HR','OE','SH','PM','IX','BI')
 AND      object_name NOT LIKE 'SYS%'
 ORDER BY 1,2,3,4;

PROMPT
PROMPT Data types used

SELECT    owner, data_type, data_type_owner, data_type_mod, COUNT(*)
 FROM     dba_tab_columns
 WHERE    owner in ('HR','OE','SH','PM','IX','BI')
 GROUP BY owner, data_type, data_type_owner, data_type_mod
 ORDER BY 2,1,3,4;

PROMPT
PROMPT XML tables

SELECT    owner, table_name, schema_owner, storage_type
 FROM     dba_xml_tables
 WHERE    owner in ('HR','OE','SH','PM','IX','BI')
 ORDER BY 1,2;

PROMPT
PROMPT All objects named 'SYS%' (LOBs etc)

SELECT    owner, object_type, status, COUNT(*)
 FROM     dba_objects
 WHERE    owner in ('HR','OE','SH','PM','IX','BI')
 AND      object_name LIKE 'SYS%'
 GROUP BY owner, object_type, status
 ORDER BY 2,1,3;

PROMPT
PROMPT All constraints

SELECT    owner, 
          DECODE (constraint_type               ,
                'C', 'Check or Not Null'        ,
                'O', 'Read only view'           ,
                'P', 'Primary key'              ,
                'R', 'Foreign key'              ,
                'U', 'Unique key'               ,
                'V', 'With check view'          ) CONSTRAINT_TYPE ,
          status, 
          validated, 
          generated, 
          COUNT(*)
 FROM     dba_constraints
 WHERE    owner in ('HR','OE','SH','PM','IX','BI')
 GROUP BY owner, constraint_type, status, validated, generated
 ORDER BY 2,3,4,5,1;
 
PROMPT
PROMPT All dimensions

SELECT    owner, dimension_name, invalid, compile_state
 FROM     dba_dimensions
 WHERE    owner in ('HR','OE','SH','PM','IX','BI')
 ORDER BY 1,2;
 
PROMPT
PROMPT All granted roles

SELECT    granted_role, grantee
 FROM     dba_role_privs
 WHERE    grantee in ('HR','OE','SH','PM','IX','BI')
 ORDER BY 1,2;

PROMPT
PROMPT All granted system privileges

SELECT    privilege, grantee
 FROM     dba_sys_privs
 WHERE    grantee in ('HR','OE','SH','PM','IX','BI')
 ORDER BY 1,2;

PROMPT
PROMPT All granted object privileges

SELECT    owner, table_name, privilege, grantee
 FROM     dba_tab_privs
 WHERE    grantee in ('HR','OE','SH','PM','IX','BI')
 ORDER BY 1,2,3,4;

PROMPT
PROMPT Space usage

SELECT    owner, segment_type, sum(bytes)
 FROM     dba_segments
 WHERE    owner in ('HR','OE','SH','PM','IX','BI')
 GROUP BY ROLLUP (owner, segment_type);

PROMPT
PROMPT Table cardinality relational and object tables

SELECT    owner, table_name, num_rows
 FROM     dba_all_tables
 WHERE    owner in ('HR','OE','SH','PM','IX','BI')
 ORDER BY 1,2,3;

PROMPT
PROMPT Index cardinality (without  LOB indexes)

SELECT    owner, index_name, distinct_keys, num_rows
 FROM     dba_indexes
 WHERE    owner in ('HR','OE','SH','PM','IX','BI')
 AND      index_name NOT LIKE 'SYS%'
 ORDER BY 1,2,3;        

SPOOL OFF

[oracle@ol8-19c db-sample-schemas-12.2.0.1]$ 
```

### Others

Ref:
[EMP and DEPT](https://livesql.oracle.com/apex/livesql/file/content_O5AEB2HE08PYEPTGCFLZU9YCV.html)


```sql 

DROP TABLE EMP;
DROP TABLE DEPT;
DROP TABLE SALGRADE;

-- dept
create table dept(  
  deptno     number(2,0),  
  dname      varchar2(14),  
  loc        varchar2(13),  
  constraint pk_dept primary key (deptno)  
);

-- emp
create table emp(  
  empno    number(4,0),  
  ename    varchar2(10),  
  job      varchar2(9),  
  mgr      number(4,0),  
  hiredate date,  
  sal      number(7,2),  
  comm     number(7,2),  
  deptno   number(2,0),  
  constraint pk_emp primary key (empno),  
  constraint fk_deptno foreign key (deptno) references dept (deptno)  
);

-- BONUS
CREATE TABLE bonus(
  ename VARCHAR2(10),
  job   VARCHAR2(9),
  sal   NUMBER,
  comm  NUMBER
);

-- SALGRADE
CREATE TABLE salgrade(
  grade NUMBER,
  losal NUMBER,
  hisal NUMBER
);


-- sample data

INSERT INTO dept VALUES(10, 'ACCOUNTING', 'NEW YORK');
INSERT INTO dept VALUES(20, 'RESEARCH', 'DALLAS');
INSERT INTO dept VALUES(30, 'SALES', 'CHICAGO');
INSERT INTO dept VALUES(40, 'OPERATIONS', 'BOSTON');

INSERT INTO emp VALUES(
 7839, 'KING', 'PRESIDENT', null,
 to_date('17-11-1981','dd-mm-yyyy'),
 5000, null, 10 );

INSERT INTO emp VALUES(
 7698, 'BLAKE', 'MANAGER', 7839,
 to_date('1-5-1981','dd-mm-yyyy'),
 2850, null, 30);

INSERT INTO emp VALUES(
 7782, 'CLARK', 'MANAGER', 7839,
 to_date('9-6-1981','dd-mm-yyyy'),
 2450, null, 10);

INSERT INTO emp VALUES(
 7566, 'JONES', 'MANAGER', 7839,
 to_date('2-4-1981','dd-mm-yyyy'),
 2975, null, 20);

INSERT INTO emp VALUES(
 7788, 'SCOTT', 'ANALYST', 7566,
 to_date('13-JUL-87','dd-mm-rr') - 85,
 3000, null, 20);

INSERT INTO emp VALUES(
 7902, 'FORD', 'ANALYST', 7566,
 to_date('3-12-1981','dd-mm-yyyy'),
 3000, null, 20 );

INSERT INTO emp VALUES(
 7369, 'SMITH', 'CLERK', 7902,
 to_date('17-12-1980','dd-mm-yyyy'),
 800, null, 20 );

INSERT INTO emp VALUES(
 7499, 'ALLEN', 'SALESMAN', 7698,
 to_date('20-2-1981','dd-mm-yyyy'),
 1600, 300, 30);

INSERT INTO emp VALUES(
 7521, 'WARD', 'SALESMAN', 7698,
 to_date('22-2-1981','dd-mm-yyyy'),
 1250, 500, 30 );

INSERT INTO emp VALUES(
 7654, 'MARTIN', 'SALESMAN', 7698,
 to_date('28-9-1981','dd-mm-yyyy'),
 1250, 1400, 30 );

INSERT INTO emp VALUES(
 7844, 'TURNER', 'SALESMAN', 7698,
 to_date('8-9-1981','dd-mm-yyyy'),
 1500, 0, 30);

INSERT INTO emp VALUES(
 7876, 'ADAMS', 'CLERK', 7788,
 to_date('13-JUL-87', 'dd-mm-rr') - 51,
 1100, null, 20 );

INSERT INTO emp VALUES(
 7900, 'JAMES', 'CLERK', 7698,
 to_date('3-12-1981','dd-mm-yyyy'),
 950, null, 30 );

INSERT INTO emp VALUES(
 7934, 'MILLER', 'CLERK', 7782,
 to_date('23-1-1982','dd-mm-yyyy'),
 1300, null, 10 );


INSERT INTO salgrade VALUES (1, 700, 1200);
INSERT INTO salgrade VALUES (2, 1201, 1400);
INSERT INTO salgrade VALUES (3, 1401, 2000);
INSERT INTO salgrade VALUES (4, 2001, 3000);
INSERT INTO salgrade VALUES (5, 3001, 9999);

COMMIT;

select dname, count(*) count_of_employees
from dept, emp
where dept.deptno = emp.deptno
group by DNAME
order by 2 desc;


select ename, dname, job, empno, hiredate, loc  
from emp, dept  
where emp.deptno = dept.deptno  
order by ename;

```

```sql
HONG@pdb1> set pagesize 100
HONG@pdb1> select ename, dname, job, empno, hiredate, loc  
  2  from emp, dept  
  3  where emp.deptno = dept.deptno  
  4  order by ename;

ENAME      DNAME          JOB            EMPNO HIREDATE  LOC
---------- -------------- --------- ---------- --------- -------------
ADAMS      RESEARCH       CLERK           7876 23-MAY-87 DALLAS
ALLEN      SALES          SALESMAN        7499 20-FEB-81 CHICAGO
BLAKE      SALES          MANAGER         7698 01-MAY-81 CHICAGO
CLARK      ACCOUNTING     MANAGER         7782 09-JUN-81 NEW YORK
FORD       RESEARCH       ANALYST         7902 03-DEC-81 DALLAS
JAMES      SALES          CLERK           7900 03-DEC-81 CHICAGO
JONES      RESEARCH       MANAGER         7566 02-APR-81 DALLAS
KING       ACCOUNTING     PRESIDENT       7839 17-NOV-81 NEW YORK
MARTIN     SALES          SALESMAN        7654 28-SEP-81 CHICAGO
MILLER     ACCOUNTING     CLERK           7934 23-JAN-82 NEW YORK
SCOTT      RESEARCH       ANALYST         7788 19-APR-87 DALLAS
SMITH      RESEARCH       CLERK           7369 17-DEC-80 DALLAS
TURNER     SALES          SALESMAN        7844 08-SEP-81 CHICAGO
WARD       SALES          SALESMAN        7521 22-FEB-81 CHICAGO

14 rows selected.

HONG@pdb1> 
```

Have a good work&life! 2021/10 via LinHong

