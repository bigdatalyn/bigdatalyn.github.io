---
layout: post
title: "Oracle get explain plan Tips"
category: Oracle
tags: Oracle explain Tips
---

* content
{:toc}

Oracle get explain plan Tips






### Method of getting explain plan with SQL

- 1.explain plan command

- 2.DBMS_XPLAN package

- 3.SQL/Plus autotrace

- 4.SQL Monitor

- 5.Event 10046

- 6.Event 10053

- 7.AWR/ASH report

- 8.Other scripts(sqlhc etc)

#### 1.explain plan command

The output is same with SQL/Develop F5.

```sql
explain plan for SQL_TEXT;
select * from table(dbms_xplan.display);
```
Tips: save the result in sys.plan_table$ 

#### 2.DBMS_XPLAN package

Using the following ways.


```sql
-- After execute with explain plan
select * from table(dbms_xplan.display);

-- After execute the sql.(the sql has beed executed and sql plan is in library/cursor->did not age out from memory.)
-- advanced -> all (advanced has more messages than all)
select * from table(dbms_xplan.display_cursor(null,null,'advanced'));

-- If the executed sql's cursor did NOT age out, use the following sql via sql_id/child_cursor_number.
select * from table(dbms_xplan.display_cursor('sql_id/hash_value','child_cursor_number,'advanced'));

-- Find history sqlid's explain plan.(did NOT include Predicate Information).
select * from table(dbms_xplan.display_awr('sql_id');
```

My recommand method is the following.

```sql
alter session set statistics_level=all;
-- executing sql_text
set linesize 200 pagesize 999
select * from table(dbms_xplan.display_cursor(null,null,'allstats last'));
or
select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));
```

#### 3.SQL/Plus autotrace

```sql
Usage: SET AUTOT[RACE] {OFF | ON | TRACE[ONLY]} [EXP[LAIN]] [STAT[ISTICS]]

SET AUTOTRACE OFF ---------------- Default mode: no report
SET AUTOTRACE ON EXPLAIN ------ only show explain plan - access plan
SET AUTOTRACE ON STATISTICS --  only show explain plan - statistics
SET AUTOTRACE ON ----------------- show explain access plan and statistics
SET AUTOTRACE TRACEONLY ------ same with set autotrace on, do NOT show output of sql
```

Error:
```sql
SQL > set autotrace on;  
SP2-0613: Unable to verify PLAN_TABLE format or existence  
SP2-0611: Error enabling EXPLAIN report  
SP2-0618: Cannot find the Session Identifier. Check PLUSTRACE role is enabled  
SP2-0611: Error enabling STATISTICS report  
```
Fix:(sample:hr user)
```sql
1.connect by sys user

cd $ORACLE_HOME/sqlplus/admin    
oracle$sqlplus / as sysdba  
SQL>@plustrce.sql
SQL>grant plustrace to hr;  

2.connect by hr user.

cd $ORACLE_HOME/sqlplus/admin  
oracle$sqlplus hr/hr;  
SQL>@utlxplan.sql   

```

Some tips:
```
db block gets 从buffer cache中读取的block的数量   
consistent gets 从buffer cache中读取的undo数据的block的数量   
physical reads 从磁盘读取的block的数量   
redo size DML生成的redo的大小   
sorts (memory) 在内存执行的排序量   
sorts (disk) 在磁盘上执行的排序量
```




Have a good work&life! 2021/07 via LinHong
