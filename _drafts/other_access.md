//////////////////////////////////////////////////////////////////////////////

SORT:

SORT AGGREGATE
SORT UNIQUE  -->既要排序，又要去重（order by + distinct）
SORT JOIN    -->use_merge排序合并中出现 一般跟 merge join一起
SORT GROUP BY -->既要排序，又要分组，既要order by，又要 group by时候出现
SORT ORDER BY -->通常有order by语句
BUFFER SORT   -->这个比较特殊，关键字有sort ，但并不一定会排序，需要event 10053去获取更多信息来判断

注意点：有关键字SORT不一定就需要排序
SORT AGGREGATE/BUFFER SORT就不一定排序

一般通过set autot traceonly后面有 sorts(memory/disk) 是否有数字来判断
而 BUFFER SORT比较特殊，不能用traceonly来判断，需要event 10032来获取详细排序信息

//////////////////////////////////////////////////////////////////////////////


HONG@pdb1> set autot traceonly
HONG@pdb1> select sum(sal) from emp where job='MANAGER';


Execution Plan
----------------------------------------------------------
Plan hash value: 2083865914

---------------------------------------------------------------------------
| Id  | Operation	   | Name | Rows  | Bytes | Cost (%CPU)| Time	  |
---------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |	1 |    19 |	3   (0)| 00:00:01 |
|   1 |  SORT AGGREGATE    |	  |	1 |    19 |	       |	  |
|*  2 |   TABLE ACCESS FULL| EMP  |	2 |    38 |	3   (0)| 00:00:01 |
---------------------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - filter("JOB"='MANAGER')

Note
-----
   - dynamic statistics used: dynamic sampling (level=2)


Statistics
----------------------------------------------------------
	  5  recursive calls
	  0  db block gets
	 15  consistent gets
	  0  physical reads
	  0  redo size
	551  bytes sent via SQL*Net to client
	406  bytes received via SQL*Net from client
	  2  SQL*Net roundtrips to/from client
	  0  sorts (memory)          //////////// 执行计划虽然有sort aggregate 但实际上并没有sort排序
	  0  sorts (disk)          ////////////
	  1  rows processed
HONG@pdb1>



HONG@pdb1> select distinct ename from emp where job='MANAGER' order by ename;

ENAME
----------
BLAKE
JONES

HONG@pdb1> @xp

PLAN_TABLE_OUTPUT

SQL_ID	8n73dt7f334ta, child number 0
-------------------------------------
select distinct ename from emp where job='MANAGER' order by ename

Plan hash value: 596748738

--------------------------------------------------------------------
| Id  | Operation	   | Name | E-Rows | Cost (%CPU)| E-Time   |
--------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |	   |	 5 (100)|	   |
|   1 |  SORT UNIQUE	   |	  |	 2 |	 4  (25)| 00:00:01 |              ////////////既要排序，又要去重（order by + distinct）
|*  2 |   TABLE ACCESS FULL| EMP  |	 2 |	 3   (0)| 00:00:01 |
--------------------------------------------------------------------



HONG@pdb1> create table emp_temp as select * from emp where rownum < 10;
HONG@pdb1> select /*+ use_merge(t1 t2) */ t1.empno,t1.ename,t2.sal from emp t1, emp_temp t2 where t1.empno = t2.empno;

     EMPNO ENAME	     SAL
---------- ---------- ----------
	 1 dog		    5000
      7369 SMITH	     800
      7499 ALLEN	    1600
      7521 WARD 	    1250
      7566 JONES	    2975
      7654 MARTIN	    1250
      7698 BLAKE	    2850
      7788 SCOTT	    3000
      7839 KING 	    5000

9 rows selected.

HONG@pdb1> @xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	4ux9kh2na3g0c, child number 0
-------------------------------------
select /*+ use_merge(t1 t2) */ t1.empno,t1.ename,t2.sal from emp t1,
emp_temp t2 where t1.empno = t2.empno

Plan hash value: 2340368533

-------------------------------------------------------------------------
| Id  | Operation	    | Name     | E-Rows | Cost (%CPU)| E-Time	|
-------------------------------------------------------------------------
|   0 | SELECT STATEMENT    |	       |	|     8 (100)|		|
|   1 |  MERGE JOIN	    |	       |      9 |     8  (25)| 00:00:01 |
|   2 |   SORT JOIN	    |	       |      9 |     4  (25)| 00:00:01 |
|   3 |    TABLE ACCESS FULL| EMP_TEMP |      9 |     3   (0)| 00:00:01 |
|*  4 |   SORT JOIN	    |	       |     14 |     4  (25)| 00:00:01 |
|   5 |    TABLE ACCESS FULL| EMP      |     14 |     3   (0)| 00:00:01 |
-------------------------------------------------------------------------
//////////// 排序合并中一起结合出现








HONG@pdb1> set autot traceonly
HONG@pdb1> select * from emp order by ename;

14 rows selected.


Execution Plan
----------------------------------------------------------
Plan hash value: 150391907

---------------------------------------------------------------------------
| Id  | Operation          | Name | Rows  | Bytes | Cost (%CPU)| Time     |
---------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |      |    14 |  1218 |     4  (25)| 00:00:01 |
|   1 |  SORT ORDER BY     |      |    14 |  1218 |     4  (25)| 00:00:01 |
|   2 |   TABLE ACCESS FULL| EMP  |    14 |  1218 |     3   (0)| 00:00:01 |
---------------------------------------------------------------------------

Note
-----
   - dynamic statistics used: dynamic sampling (level=2)


Statistics
----------------------------------------------------------
          4  recursive calls
          0  db block gets
          8  consistent gets
          0  physical reads
          0  redo size
       1661  bytes sent via SQL*Net to client
        394  bytes received via SQL*Net from client
          2  SQL*Net roundtrips to/from client
          1  sorts (memory)     //////////// sort数量少
          0  sorts (disk)       ////////////
         14  rows processed

HONG@pdb1> 

通过event 10032获取的sort信息中

Total number of comparisons performed     43
  Comparisons performed by in-memory sort 43
可以看到排序

常用脚本：

```sql
spool event_10032_run_trace.log

set echo on
alter session set tracefile_identifier='10032_aa4x3rfrugzxd';
alter session set timed_statistics = true;
alter session set statistics_level=all;
alter session set max_dump_file_size = unlimited;
alter session set events '10032 trace name context forever, level 8';
-- sql
select * from emp order by ename;

SELECT 'outcome' FROM dual;
alter session set events '10032 trace name context off';
SELECT name, value
FROM v$diag_info
WHERE name='Default Trace File'; 
exit;

spool off;

```

```sql
[oracle@ol8-19c scripts]$ cat /u01/app/oracle/diag/rdbms/cdb1/cdb1/trace/cdb1_ora_52490_10032_aa4x3rfrugzxd.trc
Trace file /u01/app/oracle/diag/rdbms/cdb1/cdb1/trace/cdb1_ora_52490_10032_aa4x3rfrugzxd.trc
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0
Build label:    RDBMS_19.3.0.0.0DBRU_LINUX.X64_190417
ORACLE_HOME:    /u01/app/oracle/product/19.0.0/dbhome_1
System name:    Linux
Node name:      ol8-19c
Release:        5.4.17-2102.201.3.el8uek.x86_64
Version:        #2 SMP Fri Apr 23 09:05:57 PDT 2021
Machine:        x86_64
Instance name: cdb1
Redo thread mounted by this instance: 1
Oracle process number: 38
Unix process pid: 52490, image: oracle@ol8-19c


*** 2021-07-16T18:39:23.044531+08:00 (PDB1(3))
*** SESSION ID:(69.46228) 2021-07-16T18:39:23.044553+08:00
*** CLIENT ID:() 2021-07-16T18:39:23.044557+08:00
*** SERVICE NAME:(pdb1) 2021-07-16T18:39:23.044560+08:00
*** MODULE NAME:(SQL*Plus) 2021-07-16T18:39:23.044563+08:00
*** ACTION NAME:() 2021-07-16T18:39:23.044566+08:00
*** CLIENT DRIVER:(SQL*PLUS) 2021-07-16T18:39:23.044569+08:00
*** CONTAINER ID:(3) 2021-07-16T18:39:23.044572+08:00
 
soropn: opened (new) sort, sordef 0x7f7f33fe4d08, flags 0x802
        maxkey 13, nflds 8, nkflds 1
----- Current SQL Statement for this session (sql_id=aa4x3rfrugzxd) -----
select * from emp order by ename
        Abridged call stack trace:
----- Abridged Call Stack Trace -----
ksedsts<-soropn<-qersoProcessULS<-qersoFetchSimple<-qersoFetch<-qerstFetch<-opifch2<-kpoal8<-opiodr<-ttcpip<-opitsk<-opiino<-opiodr<-opidrv<-sou2o<-opimai_real<-ssthrdmain<-main<-__libc_start_main<-0x5541F689495641D7 
----- End of Abridged Call Stack Trace -----
Partial short call stack signature: 0x4ea07eba7194cf28
        End of abridged call stack trace.

*** 2021-07-16T18:39:23.143806+08:00 (PDB1(3))
soreod: sorp 0x7f7f33fe4d08
---- Sort Parameters ------------------------------
sort_area_size                    65536
sort_area_retained_size           65536
sort_multiblock_read_count        1
max intermediate merge width      3

*** 2021-07-16T18:39:23.144198+08:00 (PDB1(3))
sorcls: sorp 0x7f7f33fe4d08
---- Sort Statistics ------------------------------
Input records                             14
Output records                            14
Total number of comparisons performed     43
  Comparisons performed by in-memory sort 43
Total amount of memory used (in KB)       2
Uses version 2 sort
---- End of Sort Statistics -----------------------
[oracle@ol8-19c scripts]$ 

```



HONG@pdb1> set autot traceonly
HONG@pdb1> select t1.ename,t2.loc from emp t1,dept t2;

56 rows selected.


Execution Plan
----------------------------------------------------------
Plan hash value: 2034389985

-----------------------------------------------------------------------------
| Id  | Operation            | Name | Rows  | Bytes | Cost (%CPU)| Time     |
-----------------------------------------------------------------------------
|   0 | SELECT STATEMENT     |      |    56 |   840 |    10   (0)| 00:00:01 |
|   1 |  MERGE JOIN CARTESIAN|      |    56 |   840 |    10   (0)| 00:00:01 |
|   2 |   TABLE ACCESS FULL  | DEPT |     4 |    32 |     3   (0)| 00:00:01 |
|   3 |   BUFFER SORT        |      |    14 |    98 |     7   (0)| 00:00:01 |
|   4 |    TABLE ACCESS FULL | EMP  |    14 |    98 |     2   (0)| 00:00:01 |
-----------------------------------------------------------------------------

Note
-----
   - dynamic statistics used: dynamic sampling (level=2)


Statistics
----------------------------------------------------------
          0  recursive calls
          0  db block gets
         16  consistent gets
          0  physical reads
          0  redo size
       1879  bytes sent via SQL*Net to client
        437  bytes received via SQL*Net from client
          5  SQL*Net roundtrips to/from client
          1  sorts (memory)
          0  sorts (disk)
         56  rows processed

HONG@pdb1> set autot off
HONG@pdb1> 

////// 10032 event结果：Total number of comparisons performed 并没有排序

---- Sort Statistics ------------------------------
Input records                             14
Output records                            14
Total number of comparisons performed     0
Total amount of memory used (in KB)       2
Uses version 1 sort
---- End of Sort Statistics -----------------------



```sql
create table DEPT
(
deptno NUMBER(2) not null,
dname VARCHAR2(14),
loc VARCHAR2(13)
)
;
alter table DEPT
add constraint PK_DEPT primary key (DEPTNO);


create table EMP
(
empno NUMBER(4),
ename VARCHAR2(10),
job VARCHAR2(9),
mgr NUMBER(4),
hiredate DATE,
sal NUMBER(7,2),
comm NUMBER(7,2),
deptno NUMBER(2)
)
;


insert into DEPT (deptno, dname, loc)
values (10, 'ACCOUNTING', 'NEW YORK');
insert into DEPT (deptno, dname, loc)
values (20, 'RESEARCH', 'DALLAS');
insert into DEPT (deptno, dname, loc)
values (30, 'SALES', 'CHICAGO');
insert into DEPT (deptno, dname, loc)
values (40, 'OPERATIONS', 'BOSTON');
commit;


insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (1, 'dog', 'code', 7369, to_date('05-06-2018', 'dd-mm-yyyy'), 5000, 5000, 10);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7369, 'SMITH', 'CLERK', 7902, to_date('17-12-1980', 'dd-mm-yyyy'), 800, null, 20);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7499, 'ALLEN', 'SALESMAN', 7698, to_date('20-02-1981', 'dd-mm-yyyy'), 1600, 300, 30);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7521, 'WARD', 'SALESMAN', 7698, to_date('22-02-1981', 'dd-mm-yyyy'), 1250, 500, 30);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7566, 'JONES', 'MANAGER', 7839, to_date('02-04-1981', 'dd-mm-yyyy'), 2975, null, 20);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7654, 'MARTIN', 'SALESMAN', 7698, to_date('28-09-1981', 'dd-mm-yyyy'), 1250, 1400, 30);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7698, 'BLAKE', 'MANAGER', 7839, to_date('01-05-1981', 'dd-mm-yyyy'), 2850, null, 30);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7788, 'SCOTT', 'ANALYST', 7566, to_date('19-04-1987', 'dd-mm-yyyy'), 3000, null, 20);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7839, 'KING', 'PRESIDENT', null, to_date('17-11-1981', 'dd-mm-yyyy'), 5000, null, 10);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7844, 'TURNER', 'SALESMAN', 7698, to_date('08-09-1981', 'dd-mm-yyyy'), 1500, 0, 30);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7876, 'ADAMS', 'CLERK', 7788, to_date('23-05-1987', 'dd-mm-yyyy'), 1100, null, 20);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7900, 'JAMES', 'CLERK', 7698, to_date('03-12-1981', 'dd-mm-yyyy'), 950, null, 30);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7902, 'FORD', 'ANALYST', 7566, to_date('03-12-1981', 'dd-mm-yyyy'), 3000, null, 20);
insert into EMP (empno, ename, job, mgr, hiredate, sal, comm, deptno)
values (7934, 'MILLER', 'CLERK', 7782, to_date('23-01-1982', 'dd-mm-yyyy'), 1300, null, 10);
commit;

```
