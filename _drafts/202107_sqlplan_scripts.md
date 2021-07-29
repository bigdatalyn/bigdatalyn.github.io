[oracle@ol8-19c ~]$ cat $ORACLE_HOME/rdbms/admin/utlsampl.sql
Rem Copyright (c) 1990, 2017, Oracle and/or its affiliates.
Rem All rights reserved.
Rem NAME
REM    UTLSAMPL.SQL
Rem  FUNCTION
Rem  NOTES
Rem    BEGIN SQL_FILE_METADATA
Rem    SQL_SOURCE_FILE: rdbms/admin/utlsampl.sql
Rem    SQL_SHIPPED_FILE: rdbms/admin/utlsampl.sql
Rem    SQL_PHASE: UTILITY
Rem    SQL_STARTUP_MODE: NORMAL
Rem    SQL_IGNORABLE_ERRORS: NONE
Rem    END SQL_FILE_METADATA
Rem
Rem  MODIFIED
Rem     lburgess   04/02/06  - lowercase passwords
Rem     menash     02/21/01 -  remove unnecessary users for security reasons
Rem     gwood      03/23/99 -  make all dates Y2K compliant
Rem     jbellemo   02/27/97 -  dont connect as system
Rem     akolk      08/06/96 -  bug 368261: Adding date formats
Rem     glumpkin   10/21/92 -  Renamed from SQLBLD.SQL
Rem     blinden   07/27/92 -  Added primary and foreign keys to EMP and DEPT
Rem     rlim       04/29/91 -         change char to varchar2
Rem     mmoore     04/08/91 -         use unlimited tablespace priv
Rem     pritto     04/04/91 -         change SYSDATE to 13-JUL-87
Rem   Mendels    12/07/90 - bug 30123;add to_date calls so language independent
Rem
rem
rem $Header: rdbms/admin/utlsampl.sql /main/6 2017/05/28 22:46:13 stanaya Exp $ sqlbld.sql
rem
SET TERMOUT OFF
SET ECHO OFF

rem CONGDON    Invoked in RDBMS at build time.   29-DEC-1988
rem OATES:     Created: 16-Feb-83

DROP USER SCOTT CASCADE;
DROP USER ADAMS CASCADE;
DROP USER JONES CASCADE;
DROP USER CLARK CASCADE;
DROP USER BLAKE CASCADE;
GRANT CONNECT,RESOURCE,UNLIMITED TABLESPACE TO SCOTT IDENTIFIED BY tiger;
DROP PUBLIC SYNONYM PARTS;

--CONNECT SCOTT/tiger
CONNECT SCOTT/tiger@pdb1
CREATE TABLE DEPT
       (DEPTNO NUMBER(2) CONSTRAINT PK_DEPT PRIMARY KEY,
	DNAME VARCHAR2(14) ,
	LOC VARCHAR2(13) ) ;
CREATE TABLE EMP
       (EMPNO NUMBER(4) CONSTRAINT PK_EMP PRIMARY KEY,
	ENAME VARCHAR2(10),
	JOB VARCHAR2(9),
	MGR NUMBER(4),
	HIREDATE DATE,
	SAL NUMBER(7,2),
	COMM NUMBER(7,2),
	DEPTNO NUMBER(2) CONSTRAINT FK_DEPTNO REFERENCES DEPT);
INSERT INTO DEPT VALUES
	(10,'ACCOUNTING','NEW YORK');
INSERT INTO DEPT VALUES (20,'RESEARCH','DALLAS');
INSERT INTO DEPT VALUES
	(30,'SALES','CHICAGO');
INSERT INTO DEPT VALUES
	(40,'OPERATIONS','BOSTON');
INSERT INTO EMP VALUES
(7369,'SMITH','CLERK',7902,to_date('17-12-1980','dd-mm-yyyy'),800,NULL,20);
INSERT INTO EMP VALUES
(7499,'ALLEN','SALESMAN',7698,to_date('20-2-1981','dd-mm-yyyy'),1600,300,30);
INSERT INTO EMP VALUES
(7521,'WARD','SALESMAN',7698,to_date('22-2-1981','dd-mm-yyyy'),1250,500,30);
INSERT INTO EMP VALUES
(7566,'JONES','MANAGER',7839,to_date('2-4-1981','dd-mm-yyyy'),2975,NULL,20);
INSERT INTO EMP VALUES
(7654,'MARTIN','SALESMAN',7698,to_date('28-9-1981','dd-mm-yyyy'),1250,1400,30);
INSERT INTO EMP VALUES
(7698,'BLAKE','MANAGER',7839,to_date('1-5-1981','dd-mm-yyyy'),2850,NULL,30);
INSERT INTO EMP VALUES
(7782,'CLARK','MANAGER',7839,to_date('9-6-1981','dd-mm-yyyy'),2450,NULL,10);
INSERT INTO EMP VALUES
(7788,'SCOTT','ANALYST',7566,to_date('13-JUL-87','dd-mm-rr')-85,3000,NULL,20);
INSERT INTO EMP VALUES
(7839,'KING','PRESIDENT',NULL,to_date('17-11-1981','dd-mm-yyyy'),5000,NULL,10);
INSERT INTO EMP VALUES
(7844,'TURNER','SALESMAN',7698,to_date('8-9-1981','dd-mm-yyyy'),1500,0,30);
INSERT INTO EMP VALUES
(7876,'ADAMS','CLERK',7788,to_date('13-JUL-87', 'dd-mm-rr')-51,1100,NULL,20);
INSERT INTO EMP VALUES
(7900,'JAMES','CLERK',7698,to_date('3-12-1981','dd-mm-yyyy'),950,NULL,30);
INSERT INTO EMP VALUES
(7902,'FORD','ANALYST',7566,to_date('3-12-1981','dd-mm-yyyy'),3000,NULL,20);
INSERT INTO EMP VALUES
(7934,'MILLER','CLERK',7782,to_date('23-1-1982','dd-mm-yyyy'),1300,NULL,10);
CREATE TABLE BONUS
	(
	ENAME VARCHAR2(10)	,
	JOB VARCHAR2(9)  ,
	SAL NUMBER,
	COMM NUMBER
	) ;
CREATE TABLE SALGRADE
      ( GRADE NUMBER,
	LOSAL NUMBER,
	HISAL NUMBER );
INSERT INTO SALGRADE VALUES (1,700,1200);
INSERT INTO SALGRADE VALUES (2,1201,1400);
INSERT INTO SALGRADE VALUES (3,1401,2000);
INSERT INTO SALGRADE VALUES (4,2001,3000);
INSERT INTO SALGRADE VALUES (5,3001,9999);
COMMIT;
EXIT
[oracle@ol8-19c ~]$





定制执行计划：可以看

<1>
set linesize 300 pagesize 300
COL "ID"                             FOR A2
COL "Operation"                      FOR A29
COL "Name"                           FOR A4
COL "Rows(cardinality)"              FOR 99999999999999999
COL "Filter"                         FOR A6
COL "Access"                         FOR A26

select case 
    when( filter_predicates is not null) or
        access_predicates is not null then
    '*'
    else
    ' '
    end || id as "ID",
    lpad(' ', level)||operation || ' ' || options "Operation",
    object_name "Name",
    cardinality as "Rows(cardinality)",
    filter_predicates "Filter",
    access_predicates "Access"
from plan_table
start with id = 0
connect by prior id = parent_id;


HONG@pdb1> explain plan for select object_name from ss1 where rowid < 'AAASAwAAMAAAGFDAAI';
HONG@pdb1> set linesize 300 pagesize 300
select case
    when( filter_predicates is not null) or
  3          access_predicates is not null then
  4      '*'
  5      else
  6      ' '
  7      end || id as "ID",
    lpad(' ', level)||operation || ' ' || options "Operation",
  9      object_name "Name",
    cardinality as "Rows(cardinality)",
 11      filter_predicates "Filter",
 12      access_predicates "Access"
 13  from plan_table
 14  start with id = 0
 15  connect by prior id = parent_id;

ID Operation			 Name  Rows(cardinality) Filter Access
-- ----------------------------- ---- ------------------ ------ --------------------------
 0  SELECT STATEMENT				    3651
*1   TABLE ACCESS BY ROWID RANGE SS1		    3651	ROWID<'AAASAwAAMAAAGFDAAI'

HONG@pdb1>

<2>


SCOTT@pdb1> explain plan for select /*+ use_hash(a,dept) */ * from emp a,dept where a.deptno=dept.deptno and a.sal > 3000;


select case 
    when( filter_predicates is not null) or
        access_predicates is not null then
    '*'
    else
    ' '
    end || id as "ID",
    lpad(' ', level)||operation || ' ' || options "Operation",
    object_name "Name",
    cardinality as "Rows(cardinality)",
    b.size_mb "Size_Mb",
    filter_predicates "Filter",
    access_predicates "Access"
from plan_table a,
(select owner,segment_name,sum(bytes/1024/1024) size_mb
 from dba_segments
 group by owner,segment_name
) b
where a.object_owner=b.owner(+)
and a.object_name = b.segment_name(+)
start with id = 0
connect by prior id = parent_id;


HONG@pdb1>
select case
    when( filter_predicates is not null) or
  3          access_predicates is not null then
  4      '*'
  5      else
  6      ' '
  7      end || id as "ID",
    lpad(' ', level)||operation || ' ' || options "Operation",
  9      object_name "Name",
    cardinality as "Rows(cardinality)",
 11      b.size_mb "Size_Mb",
 12      filter_predicates "Filter",
 13      access_predicates "Access"
 14  from plan_table a,
(select owner,segment_name,sum(bytes/1024/1024) size_mb
 16   from dba_segments
 17   group by owner,segment_name
) b
where a.object_owner=b.owner(+)
and a.object_name = b.segment_name(+)
 21  start with id = 0
 22  connect by prior id = parent_id;

ID Operation		Name  Rows(cardinality)    Size_Mb Filter	  Access
-- -------------------- ---- ------------------ ---------- -------------- ----------------------------
 0  SELECT STATEMENT			      1
*1   HASH JOIN				      1 			  "A"."DEPTNO"="DEPT"."DEPTNO"
*2    TABLE ACCESS FULL EMP		      1      .0625 "A"."SAL">3000
 3    TABLE ACCESS FULL DEPT		      4      .0625


HONG@pdb1>

大表才有性能问题，加segment对象的size加到上面语句

<3>

COL "ID"                             FOR A2
COL "Operation"                      FOR A20
COL "Name"                           FOR A4
COL "Rows(cardinality)"              FOR 99999999999999999
COL "Size_Mb"                        FOR 9999999.9999
COL "Column"                         FOR A6
COL "Filter"                         FOR A14
COL "Access"                         FOR A28

select case 
    when( filter_predicates is not null) or
        access_predicates is not null then
    '*'
    else
    ' '
    end || id as "ID",
    lpad(' ', level)||operation || ' ' || options "Operation",
    object_name "Name",
    cardinality as "Rows(cardinality)",
    b.size_mb "Size_Mb",
    case 
       when object_type like '%TABLE%' then
        REGEXP_COUNT(a.projection,']') || '/' || c.column_cnt
    end as "Column",
    filter_predicates "Filter",
    access_predicates "Access"
from plan_table a,
(select owner,segment_name,sum(bytes/1024/1024) size_mb
 from dba_segments
 group by owner,segment_name
) b,
(select owner,table_name,count(*) column_cnt 
from dba_tab_cols
group by owner,table_name
) c
where 
a.object_owner=b.owner(+)
and a.object_name = b.segment_name(+)
and a.object_owner=c.owner(+)
and a.object_name = c.table_name(+)
start with id = 0
connect by prior id = parent_id;

ID Operation		Name  Rows(cardinality)       Size_Mb Column Filter	    Access
-- -------------------- ---- ------------------ ------------- ------ -------------- ----------------------------
 0  SELECT STATEMENT			      1
*1   HASH JOIN				      1 				    "A"."DEPTNO"="DEPT"."DEPTNO"
*2    TABLE ACCESS FULL EMP		      1 	.0625 8/8    "A"."SAL">3000
 3    TABLE ACCESS FULL DEPT		      4 	.0625 3/3

Rows: 基数（返回数）
Size_Mb：涉及对象大小  （这个数大，才有可能性能问题）
Column：表示 访问表多少列/表一共有多少列  
column比率考虑点：
- 建立组合索引避免回表
- 建立合适组合索引减少回表次数
  如果sql只访问某个表极少部分列，那么可以考虑将这些访问的列联合在一起，建立组合索引。


consistent gets：逻辑读
逻辑读远远大于 所有表的段大小之和，表关联方式是 HASH JOIN ，一般该sql有较大的优化空间。
rows process：表示SQL返回的行数
根据SQL返回的行数判断整个SQL是走HASH连接还是走NL嵌套循环连接。如果rows processed很大，一般走hash join。如果很小，一般走NL。


通过执行计划来判断是否创建索引：ESR

TABLE ACCESS FULL 前面没有“*”：
如果表小，不需要理会
如果表很大（10G），是否少了过滤条件？
在看这个表访问了多少列，如果列不多，可以把这些列组合起来，建立组合索引，组合索引空间大大小于表大大小（1GB？），那么可以利用 INDEX FAST FULL SCAN来代替TABLE ACCESS FULL
如果这个表访问的列有点多，创建组合索引，空间太大，就不适合创建组合索引。
可以考虑 开启并行查询 或者 更改表连接方式，让大表作为嵌套循环中的被驱动表，同时大表上的连接列上创建索引。


TABLE ACCESS FULL 前面有“*”：
如果表小，不需要理会
如果表很大，可以使用 select count（*） from 表； 来查看多少行数据。
然后通过 select count（*） from 表 where *过滤条件，查看多少行。
如果返回行数/表总行数的比率在 5% 以下，可以在过滤列上创建索引。
如果已经存在索引，没走索引。这个时候，需要检查统计信息，特别是直方图信息，
如果收集过统计信息了，可以用HINT来强制走索引。
如果有多个过滤条件，需要建立组合索引并且将选择性高的列放到前面。
如果返回行数比例超过5%的话，需要查看下该表访问了多少列，如果列少，可以考虑把这些列组合起来，建立组合索引。谓词过滤列在前面，连接列在中间，select部分列在最后。如果返回的列过多，只能走全表扫描了

TABLE ACCESS BY INDEX ROWID 前面有 “*”

表示回表过滤，说明数据没有在索引中过滤干净，可以把“*”下面的过滤条件包含在索引中，这样减少回表次数，提升查询性能。

SCOTT@pdb1> explain plan for select /*+ index(test) */ * from test where object_name like 'V_$%' and owner = 'SCOTT';

ID Operation				 Name		       Rows(cardinality)  Size_Mb Column Filter 		   Access
-- ------------------------------------- -------------------- ------------------ -------- ------ ------------------------- -------------------------
 0  SELECT STATEMENT							      44
*1   TABLE ACCESS BY INDEX ROWID BATCHED TEST				      44       12 26/26  "OWNER"='SCOTT'
*2    INDEX RANGE SCAN			 IDX_TEST_OBJECT_NAME		    1449	4	 "OBJECT_NAME" LIKE 'V_$%' "OBJECT_NAME" LIKE 'V_$%'

create index idx_test_owner_object_name on test(owner,object_name);

ID Operation				 Name			     Rows(cardinality)	Size_Mb Column Filter			 Access
-- ------------------------------------- -------------------------- ------------------ -------- ------ ------------------------- ---------------------------------------------
 0  SELECT STATEMENT								    44
 1   TABLE ACCESS BY INDEX ROWID BATCHED TEST					    44	     12 26/26
*2    INDEX RANGE SCAN			 IDX_TEST_OWNER_OBJECT_NAME		    44	      5        "OBJECT_NAME" LIKE 'V_$%' "OWNER"='SCOTT' AND "OBJECT_NAME" LIKE 'V_$%'

