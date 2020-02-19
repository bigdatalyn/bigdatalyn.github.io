---
layout: post
title: "Oracle 19c Analysis SQL in AWR report Tips"
category: Oracle
tags: Oracle SQLloader Tips 
---

* content
{:toc}

Oracle 19c Analysis SQL in AWR report


There are some sql in SQL ordered by CPU Time AWR report. 

These sql were using so many cpu time...

![AnalysisSQL]({{ "/files/oracle/19c/AnalysisSQL.png"}})

```
/* SQL Analyze(0) */ select /*+ full(t) parallel(t, 6) parallel_index(t, 6) dbms_stats cursor_sharing_exact use_weak_name_resl dynamic_sampling(0) no_monitoring xmlindex_sel_idx_tbl no_substrb_pad */to_char...
 
```

What are these sqls? what are they doing? 










#### Simulate test



```shell
LIN@pdb1> drop table lin.test_tab purge;

Table dropped.

LIN@pdb1> create table lin.test_tab(col1 number, col2 varchar(20));

Table created.

LIN@pdb1>
begin
 for i in 1..10000 loop
 insert into lin.test_tab values (i, i||'aaaabbbb');
 end loop;
 commit;
end;
  7  /

PL/SQL procedure successfully completed.

LIN@pdb1> select count(*) from lin.test_tab;

  COUNT(*)
----------
     10000

LIN@pdb1>
LIN@pdb1> conn sys/oracle@pdb1 as sysdba
Connected.
SYS@pdb1> alter session set max_dump_file_size = UNLIMITED;

Session altered.

SYS@pdb1> alter session set events '10046 trace name context forever, level 12';

Session altered.

SYS@pdb1> exec DBMS_STATS.GATHER_TABLE_STATS('LIN','TEST_TAB');

PL/SQL procedure successfully completed.

SYS@pdb1> alter session set events '10046 trace name context off';

Session altered.

SYS@pdb1>
SYS@pdb1> select tracefile from v$process where addr in (select paddr from v$session where sid in (select sid from v$mystat));

TRACEFILE
--------------------------------------------------------------------------------
/u01/app/oracle/diag/rdbms/orcl/orcl/trace/orcl_ora_17733.trc

SYS@pdb1> !ls -ltr /u01/app/oracle/diag/rdbms/orcl/orcl/trace/orcl_ora_17733.trc
-rw-r-----. 1 oracle oinstall 520812 Feb 19 09:12 /u01/app/oracle/diag/rdbms/orcl/orcl/trace/orcl_ora_17733.trc

SYS@pdb1> 

```

the /* SQL Analyze(0) */ sql can be found in the trace file 

```
PARSING IN CURSOR #139867558904224 len=513 dep=1 uid=126 oct=3 lid=0 tim=16068278669 hv=2609264150 ad='71e71608' sqlid='1391vrydscdhq'
/* SQL Analyze(0) */ select /*+  full(t)    no_parallel(t) no_parallel_index(t) dbms_stats cursor_sharing_exact use_weak_name_resl dynamic_sampling(0) no_monitoring xmlindex_sel_idx_tbl opt_param('optimizer_inmemory_aware' 'false') no_substrb_pad  */to_char(count("COL1")),substrb(dump(min("COL1"),16,0,64),1,240),substrb(dump(max("COL1"),16,0,64),1,240),to_char(count("COL2")),substrb(dump(min("COL2"),16,0,64),1,240),substrb(dump(max("COL2"),16,0,64),1,240) from "LIN"."TEST_TAB" t  /* NDV,NIL,NIL,NDV,NIL,NIL*/
```


### Result

the sql - /* SQL Analyze(0) */ is similare with the internal sql which are from using DBMS_STATS package to gather statistics with objects

Maybe happened in mid-night, there are some batch job doing insert append sql and gather statistics with objects online.

[Oracle 19c online statistics gathering Tips](http://www.bigdatalyn.com/2020/02/11/Oracle_Online_statistics_gathering/)




### Reference

[Oracle 19c online statistics gathering Tips](http://www.bigdatalyn.com/2020/02/11/Oracle_Online_statistics_gathering/)



Have a good work&life! 2020/02 via LinHong


