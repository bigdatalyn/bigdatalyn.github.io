---
layout: post
title: "Oracle 23c SQL Diagnostic Report Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 23c SQL Diagnostic Report Tips

SQL Diagnostic Report

DBMS_SQLDIAG has a new function called REPORT_SQL
- Generate an HTML deep-level diagnostic report for a SQL statement
- No requirement to install additional objects/components
- Plan history, non-default database parameters, stats history, indexes, and more






### Test SQL Diagnostic Report

Simple test sql:

```
drop table t1 purge;
create table t1 as select * from dba_objects;
select /*+ test01 */object_id,object_name,object_type from t1 where object_id = 9527;
create index idx_object_id0 on t1(object_id,0);
select /*+ test01 */object_id,object_name,object_type from t1 where object_id = 9527;
create or replace directory mydir as '/home/oracle';
grant read,write on directory mydir to public;
!ora text2sqlid test01
alter index idx_object_id0 invisible;
select /*+ test01 */object_id,object_name,object_type from t1 where object_id = 9527;
exec dbms_stats.gather_table_stats('system','t1',cascade=>true,no_invalidate=>false);
select /*+ test01 */object_id,object_name,object_type from t1 where object_id = 9527;
declare my_report clob; 
begin  
  my_report := dbms_sqldiag.report_sql('ggyuy60qqy2w2',directory=>'MYDIR',level=>'ALL'); 
end;
/
```

![sql_report01]({{ "/files/Oracle/23c/SQLLR/sql_report01.jpg"}})

![sql_report02]({{ "/files/Oracle/23c/SQLLR/sql_report02.jpg"}})

<p>SQLR_ggyuy60qqy2w2_3rd<br>
<iframe id="SQLR_ggyuy60qqy2w2_3rd" src="/files/Oracle/23c/SQLLR/SQLR_ggyuy60qqy2w2_3rd.html" width="400" height="300"></iframe></p>
<p>&nbsp;</p>


### Referece

[DBMS_SQLDIAG has a new function called REPORT_SQL](https://docs.oracle.com/en/database/oracle/oracle-database/23/arpls/DBMS_SQLDIAG.html)



Have a good work&life! 2023/10 via LinHong


