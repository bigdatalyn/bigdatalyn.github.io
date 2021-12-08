---
layout: post
title: "Oracle sqlcl Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle SQLcl Tips

Oracle SQLcl (SQL Developer Command Line), a Java-based command-line interface for Oracle Database.

Using SQLcl, you can execute SQL and PL/SQL statements interactively or as as a batch file. 

SQLcl provides inline editing, statement completion, command recall, and also supports existing SQL*Plus scripts.






### SQLcl 

[SQLcl 21.3.3 Downloads 2021/12/01](https://www.oracle.com/database/technologies/appdev/sqlcl.html)

[Oracle SQL Developer Command Line (SQLcl) 21.2 Release Notes](https://www.oracle.com/tools/sqlcl/sqlcl-relnotes-212.html)

Platform Support

    SQLcl release 21.2 is available for Windows 10 and Windows Server 2008/2012, Linux or Mac OS X. (See full Certification)
    If using a OCI “Thick” connection type, a 21c Oracle Client will be required

It has been installed in `$ORACLE_HOME/bin` by default in 19c.

```sql
[oracle@ol8-19c ~]$ which sql
/u01/app/oracle/product/19.0.0/dbhome_1/bin/sql
[oracle@ol8-19c ~]$
```

Sample sqlcl

- info
- info+
- ddl
- history 
- list 
- tab
- set sqlformat html/csv/json
- ctas

```sql
[oracle@ol8-19c ~]$ sql hong/oracle@pdb1

SQLcl: Release 19.1 Production on Wed Dec 08 09:56:56 2021

Copyright (c) 1982, 2021, Oracle.  All rights reserved.

Last Successful login time: Wed Dec 08 2021 09:56:59 +08:00

Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0

09:57:11 HONG@pdb1> info bonus
TABLE: BONUS
	 LAST ANALYZED:2021-10-12 13:00:15.0
	 ROWS         :0
	 SAMPLE SIZE  :0
	 INMEMORY     :DISABLED
	 COMMENTS     :

Columns
NAME         DATA TYPE           NULL  DEFAULT    COMMENTS
 ENAME       VARCHAR2(10 BYTE)   Yes
 JOB         VARCHAR2(9 BYTE)    Yes
 SAL         NUMBER              Yes
 COMM        NUMBER              Yes


09:57:24 HONG@pdb1> info emp
TABLE: EMP
	 LAST ANALYZED:2021-10-13 13:00:27.0
	 ROWS         :14
	 SAMPLE SIZE  :14
	 INMEMORY     :DISABLED
	 COMMENTS     :

Columns
NAME         DATA TYPE           NULL  DEFAULT    COMMENTS
*EMPNO       NUMBER(4,0)         No
 ENAME       VARCHAR2(10 BYTE)   Yes
 JOB         VARCHAR2(9 BYTE)    Yes
 MGR         NUMBER(4,0)         Yes
 HIREDATE    DATE                Yes
 SAL         NUMBER(7,2)         Yes
 COMM        NUMBER(7,2)         Yes
 DEPTNO      NUMBER(2,0)         Yes

Indexes
INDEX_NAME            UNIQUENESS   STATUS   FUNCIDX_STATUS   COLUMNS
HONG.PK_EMP           UNIQUE       VALID    <n>              EMPNO
HONG.IDX_EMP_SALARY   NONUNIQUE    VALID    <n>              SAL


09:57:33 HONG@pdb1> info+ emp

TABLE: EMP
	 LAST ANALYZED:2021-10-13 13:00:27.0
	 ROWS         :14
	 SAMPLE SIZE  :14
	 INMEMORY     :DISABLED
	 COMMENTS     :

Columns
NAME         DATA TYPE           NULL  DEFAULT    LOW_VALUE             HIGH_VALUE            NUM_DISTINCT   HISTOGRAM
*EMPNO       NUMBER(4,0)         No                   7369                  7934                  14             NONE
 ENAME       VARCHAR2(10 BYTE)   Yes                  ADAMS                 WARD                  14             NONE
 JOB         VARCHAR2(9 BYTE)    Yes                  ANALYST               SALESMAN              5              FREQUENCY
 MGR         NUMBER(4,0)         Yes                  7566                  7902                  6              NONE
 HIREDATE    DATE                Yes                  1980.12.17.00.00.00   1987.05.23.00.00.00   13             FREQUENCY
 SAL         NUMBER(7,2)         Yes                  800                   5000                  12             FREQUENCY
 COMM        NUMBER(7,2)         Yes                  0                     1400                  4              NONE
 DEPTNO      NUMBER(2,0)         Yes                  10                    30                    3              FREQUENCY

Indexes
INDEX_NAME            UNIQUENESS   STATUS   FUNCIDX_STATUS   COLUMNS
HONG.PK_EMP           UNIQUE       VALID    <n>              EMPNO
HONG.IDX_EMP_SALARY   NONUNIQUE    VALID    <n>              SAL

09:58:12 HONG@pdb1> ddl emp

  CREATE TABLE "HONG"."EMP"
   (	"EMPNO" NUMBER(4,0),
	"ENAME" VARCHAR2(10),
	"JOB" VARCHAR2(9),
	"MGR" NUMBER(4,0),
	"HIREDATE" DATE,
	"SAL" NUMBER(7,2),
	"COMM" NUMBER(7,2),
	"DEPTNO" NUMBER(2,0),
	 CONSTRAINT "PK_EMP" PRIMARY KEY ("EMPNO")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 INVISIBLE COMPUTE STATISTICS
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE,
	 CONSTRAINT "FK_DEPTNO" FOREIGN KEY ("DEPTNO")
	  REFERENCES "HONG"."DEPT" ("DEPTNO") ENABLE
   ) SEGMENT CREATION IMMEDIATE
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;

  CREATE INDEX "HONG"."IDX_EMP_SALARY" ON "HONG"."EMP" ("SAL")
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
09:58:20 HONG@pdb1>

09:58:23 HONG@pdb1> set linesize 300 pagesize 200

HONG@pdb1> set sqlformat json
HONG@pdb1> select * from emp;
{"results":[{"columns":[{"name":"EMPNO","type":"NUMBER"},{"name":"ENAME","type":"VARCHAR2"},{"name":"JOB","type":"VARCHAR2"},{"name":"MGR","type":"NUMBER"},{"name":"HIREDATE","type":"DATE"},{"name":"SAL","type":"NUMBER"},{"name":"COMM","type":"NUMBER"},{"name":"DEPTNO","type":"NUMBER"}],"items":
[
{"empno":7839,"ename":"KING","job":"PRESIDENT","mgr":<n>,"hiredate":"17-NOV-81","sal":5000,"comm":<n>,"deptno":10}
,{"empno":7698,"ename":"BLAKE","job":"MANAGER","mgr":7839,"hiredate":"01-MAY-81","sal":2850,"comm":<n>,"deptno":30}
,{"empno":7782,"ename":"CLARK","job":"MANAGER","mgr":7839,"hiredate":"09-JUN-81","sal":2450,"comm":<n>,"deptno":10}
,{"empno":7566,"ename":"JONES","job":"MANAGER","mgr":7839,"hiredate":"02-APR-81","sal":2975,"comm":<n>,"deptno":20}
,{"empno":7788,"ename":"SCOTT","job":"ANALYST","mgr":7566,"hiredate":"19-APR-87","sal":3000,"comm":<n>,"deptno":20}
,{"empno":7902,"ename":"FORD","job":"ANALYST","mgr":7566,"hiredate":"03-DEC-81","sal":3000,"comm":<n>,"deptno":20}
,{"empno":7369,"ename":"SMITH","job":"CLERK","mgr":7902,"hiredate":"17-DEC-80","sal":800,"comm":<n>,"deptno":20}
,{"empno":7499,"ename":"ALLEN","job":"SALESMAN","mgr":7698,"hiredate":"20-FEB-81","sal":1600,"comm":300,"deptno":30}
,{"empno":7521,"ename":"WARD","job":"SALESMAN","mgr":7698,"hiredate":"22-FEB-81","sal":1250,"comm":500,"deptno":30}
,{"empno":7654,"ename":"MARTIN","job":"SALESMAN","mgr":7698,"hiredate":"28-SEP-81","sal":1250,"comm":1400,"deptno":30}
,{"empno":7844,"ename":"TURNER","job":"SALESMAN","mgr":7698,"hiredate":"08-SEP-81","sal":1500,"comm":0,"deptno":30}
,{"empno":7876,"ename":"ADAMS","job":"CLERK","mgr":7788,"hiredate":"23-MAY-87","sal":1100,"comm":<n>,"deptno":20}
,{"empno":7900,"ename":"JAMES","job":"CLERK","mgr":7698,"hiredate":"03-DEC-81","sal":950,"comm":<n>,"deptno":30}
,{"empno":7934,"ename":"MILLER","job":"CLERK","mgr":7782,"hiredate":"23-JAN-82","sal":1300,"comm":<n>,"deptno":10}
]}]}
14 rows selected.

HONG@pdb1> set sqlformat default
SQL Format Cleared

HONG@pdb1> select * from emp;

     EMPNO ENAME      JOB              MGR HIREDATE         SAL       COMM     DEPTNO
---------- ---------- --------- ---------- --------- ---------- ---------- ----------
      7839 KING       PRESIDENT <n>        17-NOV-81       5000 <n>                10
      7698 BLAKE      MANAGER         7839 01-MAY-81       2850 <n>                30
      7782 CLARK      MANAGER         7839 09-JUN-81       2450 <n>                10
      7566 JONES      MANAGER         7839 02-APR-81       2975 <n>                20
      7788 SCOTT      ANALYST         7566 19-APR-87       3000 <n>                20
      7902 FORD       ANALYST         7566 03-DEC-81       3000 <n>                20
      7369 SMITH      CLERK           7902 17-DEC-80        800 <n>                20
      7499 ALLEN      SALESMAN        7698 20-FEB-81       1600        300         30
      7521 WARD       SALESMAN        7698 22-FEB-81       1250        500         30
      7654 MARTIN     SALESMAN        7698 28-SEP-81       1250       1400         30
      7844 TURNER     SALESMAN        7698 08-SEP-81       1500          0         30
      7876 ADAMS      CLERK           7788 23-MAY-87       1100 <n>                20
      7900 JAMES      CLERK           7698 03-DEC-81        950 <n>                30
      7934 MILLER     CLERK           7782 23-JAN-82       1300 <n>                10

14 rows selected.

HONG@pdb1>

HONG@pdb1> ctas
CTAS
 ctas table new_table
Uses DBMS_METADATA to extract the DDL for the existing table
 Then modifies that into a create table as select * from

HONG@pdb1> ctas emp emp1
CREATE TABLE "HONG"."EMP1"
   (	"EMPNO",
	"ENAME",
	"JOB",
	"MGR",
	"HIREDATE",
	"SAL",
	"COMM",
	"DEPTNO",
	 CONSTRAINT "PK_EMP" PRIMARY KEY ("EMPNO")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 INVISIBLE COMPUTE STATISTICS
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE
   ) SEGMENT CREATION IMMEDIATE
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"
 as
select * from EMP
HONG@pdb1>

HONG@pdb1> help
For help on a topic type help <topic>
List of Help topics available:

/
@
@@
ACCEPT
ALIAS*
APEX*
APPEND
ARCHIVE_LOG
BREAK
BRIDGE*
BTITLE
CD*
CHANGE
CLEAR
COLUMN
COMPUTE
CONNECT
COPY
CTAS*
DDL*
DEFINE
DEL
DESCRIBE
DISCONNECT
EDIT
EXECUTE
EXIT
FIND*
FORMAT*
GET
HISTORY*
HOST
INFORMATION*
INPUT
LIQUIBASE*
LIST
LOAD*
NET*
OERR*
PASSWORD
PAUSE
PRINT
PROMPT
QUIT
REMARK
REPEAT*
RESERVED_WORDS
REST*
RUN
SAVE
SCRIPT*
SET
SETERRORL
SHOW
SHUTDOWN
SODA*
SPOOL
SSHTUNNEL*
START
STARTUP
STORE
TIMING
TNSPING*
TTITLE
UNDEFINE
VARIABLE
VAULT*
WHENEVER
WHICH*
XQUERY
HONG@pdb1>
```

### Reference

[SQLcl 21.3.3 Downloads 2021/12/01](https://www.oracle.com/database/technologies/appdev/sqlcl.html)

[Oracle SQL Developer Command Line (SQLcl) 21.2 Release Notes](https://www.oracle.com/tools/sqlcl/sqlcl-relnotes-212.html)


Have a good work&life! 2021/12 via LinHong

