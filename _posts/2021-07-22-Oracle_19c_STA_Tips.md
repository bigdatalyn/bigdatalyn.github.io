---
layout: post
title: "Oracle 19c SQL Tuning Advisor Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 19c SQL Tuning Advisor Tips







### SQL Tuning Advisor SQL

Run SQL Tuning Advisor for the bad performing query - to see if there is any observation / recommendation 

(this way we can see the actual execution plan)

-- creating the tuning task

```sql
set serveroutput on
declare
l_sql_tune_task_id varchar2(100);
begin
l_sql_tune_task_id := dbms_sqltune.create_tuning_task (
sql_id => 'sql_idxxxxxxxxxx',
scope => dbms_sqltune.scope_comprehensive,
time_limit => 1800,
task_name => 't1',
description => 'tuning task for statement your_sql_id.');
dbms_output.put_line('l_sql_tune_task_id: ' || l_sql_tune_task_id);
end;
/

```

-- Executing the tuning task

```sql
exec dbms_sqltune.execute_tuning_task(task_name => 't1');
```


-- Displaying the recommendations
```sql
set long 100000;
set longchunksize 1000
set pagesize 10000
set linesize 100
select dbms_sqltune.report_tuning_task('t1') as recommendations from dual;
```


### Reference

How to Estimate the Size of Tables and Indexes Before Being Created and Populated in the Database? (Doc ID 1585326.1)	


Have a good work&life! 2021/07 via LinHong
