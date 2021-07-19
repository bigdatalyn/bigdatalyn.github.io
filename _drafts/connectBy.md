
/////////////////////////////////////////////////////////////////////////////

https://blogs.oracle.com/otnjp/oracle-sql-image-006

connect by

/////////////////////////////////////////////////////////////////////////////





HONG@pdb1> select * from emp where mgr is null; //// 只有 7839 没有上司 按照上下级关系分层显示出来

     EMPNO ENAME      JOB              MGR HIREDATE         SAL       COMM     DEPTNO
---------- ---------- --------- ---------- --------- ---------- ---------- ----------
      7839 KING       PRESIDENT            17-NOV-81       5000                    10

HONG@pdb1> select empno,ename,mgr from emp start with empno=7839 connect by prior empno=mgr;

     EMPNO ENAME             MGR
---------- ---------- ----------
      7839 KING
      7566 JONES            7839
      7788 SCOTT            7566
      7876 ADAMS            7788
      7902 FORD             7566
      7369 SMITH            7902
      7698 BLAKE            7839
      7499 ALLEN            7698
      7521 WARD             7698
      7654 MARTIN           7698
      7844 TURNER           7698
      7900 JAMES            7698

12 rows selected.

HONG@pdb1> 


SQL_ID  1b4v6yugaucu0, child number 0
-------------------------------------
select empno,ename,mgr from emp start with empno=7839 connect by prior
empno=mgr

Plan hash value: 763482334

----------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                               | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                        |      |      1 |        |     4 (100)|          |     12 |00:00:00.01 |       6 |
|*  1 |  CONNECT BY NO FILTERING WITH START-WITH|      |      1 |        |            |          |     12 |00:00:00.01 |       6 |
|   2 |   TABLE ACCESS FULL                     | EMP  |      1 |     14 |     3   (0)| 00:00:01 |     13 |00:00:00.01 |       6 |
----------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$2 / EMP@SEL$2

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$2")
      OUTLINE_LEAF(@"SEL$3")
      OUTLINE_LEAF(@"SEL$4")
      OUTLINE_LEAF(@"SET$1")
      OUTLINE_LEAF(@"SEL$1")
      NO_ACCESS(@"SEL$1" "connect$_by$_work$_set$_006"@"SEL$1")
      NO_CONNECT_BY_FILTERING(@"SEL$1")
      CONNECT_BY_COMBINE_SW(@"SEL$1")
      INDEX_RS_ASC(@"SEL$4" "EMP"@"SEL$4" ("EMP"."EMPNO"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$4" "EMP"@"SEL$4")
      FULL(@"SEL$3" "connect$_by$_pump$_002"@"SEL$3")
      FULL(@"SEL$3" "EMP"@"SEL$3")
      LEADING(@"SEL$3" "connect$_by$_pump$_002"@"SEL$3" "EMP"@"SEL$3")
      USE_HASH(@"SEL$3" "EMP"@"SEL$3")
      FULL(@"SEL$2" "EMP"@"SEL$2")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - access("MGR"=PRIOR NULL)
       filter("EMPNO"=7839)





/////////////////////////////////////////////////////////////////////////////


create table BasicSample(ID primary key,OyaID) as
select  1,null from dual union all
select  2,   1 from dual union all
select  3,   1 from dual union all
select  4,   2 from dual union all
select  5,   3 from dual union all
select 10,null from dual union all
select 11,  10 from dual union all
select 12,  10 from dual;

HONG@pdb1> select * from basicsample;

        ID      OYAID
---------- ----------
         1
         2          1
         3          1
         4          2
         5          3
        10
        11         10
        12         10

8 rows selected.

HONG@pdb1> select id,oyaid from basicsample start with oyaid is null connect by prior id=oyaid;

        ID      OYAID
---------- ----------
         1
         2          1
         4          2
         3          1
         5          3
        10
        11         10
        12         10

8 rows selected.

HONG@pdb1> select id,oyaid,level from basicsample start with oyaid is null connect by prior id=oyaid;

        ID      OYAID      LEVEL
---------- ---------- ----------
         1                     1
         2          1          2
         4          2          3
         3          1          2
         5          3          3
        10                     1
        11         10          2
        12         10          2

8 rows selected.

HONG@pdb1> 

/////////// 分层

connect by可以有多个条件

create table ConnBySample(
ID  number,
Seq number,
primary key(ID,Seq));
insert into ConnBySample
select 111,5 from dual union all
select 111,6 from dual union all
select 111,7 from dual union all
select 222,5 from dual union all
select 333,5 from dual union all
select 333,6 from dual union all
select 333,8 from dual;

HONG@pdb1> select * from connbysample;

        ID        SEQ
---------- ----------
       111          5
       111          6
       111          7
       222          5
       333          5
       333          6
       333          8

7 rows selected.

HONG@pdb1> 

select ID,Seq,Level
  from ConnBySample
start with Seq = 5
connect by prior ID  = ID
       and prior Seq = Seq-1;

HONG@pdb1> select ID,Seq,Level
  2    from ConnBySample
  3  start with Seq = 5
  4  connect by prior ID  = ID
  5         and prior Seq = Seq-1;

        ID        SEQ      LEVEL
---------- ---------- ----------
       111          5          1
       111          6          2
       111          7          3
       222          5          1
       333          5          1
       333          6          2

6 rows selected.

HONG@pdb1> ,