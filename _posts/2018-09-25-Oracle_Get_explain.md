---
layout: post
title: "Oracle Get explain Tips"
category: Oracle
tags: Oracle explain Tips
---

* content
{:toc}




Oracle Get explain Tips










#### 01.Explain plan for ...

	explain plan for select /*+ sample_sql1 */ max(name) from test1 where id=1;
	select plan_table_output from table(dbms_xplan.display('plan_table',null,'serial'));
	(Or @?/rdbms/admin/utlxpls)

#### 02.set auto trace

	Set autot trace
	select /*+ sample_sql1 */ max(name) from test1 where id=1;


#### 03.sql from plan_table

	col op for a50
	col obj for a30
	col part for a10
	col COST for 999,999,999
	col ACCESS_PREDICATES for a30
	col par for 999

	with tmp as (
	select id,parent_id,operation,options,object_name,object_owner,
					optimizer,cost,io_cost,cardinality,bytes,cpu_cost,temp_space
					,partition_start,partition_stop,partition_id,to_char(timestamp,'mmdd hh24:mi:ss') ts,substr(access_predicates,1,60) access_predicates 
					from plan_table order by id
					)
	select  id,  parent_id par, 
			   lpad(' ',(level-1)*2,' ')||operation || ' ' || options op, 
			   decode(object_name,null,null,object_owner || '.' || object_name||decode(optimizer,null,' ','('||optimizer||')')) obj,--access_predicates,
			   cost, io_cost,  cardinality card, bytes,cpu_cost, temp_space,
			   partition_start || '~' || partition_stop part, partition_id partid--,ts
	from tmp 
	connect by prior id=parent_id
	start with id=0
	;

#### 04.Get execution plan from Memory Library Cache

	var myid number;
	exec :myid:=1;
	select max(name) from test1 where id=:myid;

	select /*+ sample_sql1 gather_plan_statistics */ count(*) from test1 t1,test1 t2 where t2.id=:myid;

	select sql_id,sql_fulltext from v$sql s where instr( lower(s.SQL_FULLTEXT) ,lower(' sample_sql1')) > '0';
	select * from table(dbms_xplan.display_cursor('&sqlid', null, 'ADVANCED ALLSTATS LAST'));



#### 05.get sql_id from awr

select dbms_workload_repository.create_snapshot() from dual;
exec :myid:=1001;
Select count(*) from test1 t1,test1 t2 where t2.id=:myid;
select dbms_workload_repository.create_snapshot() from dual;
@?/rdbms/admin/awrrpt
select * from table(dbms_xplan.display_cursor('&sqlid', null, 'ADVANCED ALLSTATS LAST'));
(or: @?/rdbms/admin/awrsqrpt)



#### 06.Get execution plan for monitored SQL

-- SQL elapsed time > 5s (default, specified by parameter _sqlmon_threshold)
-- SQL with hint monitor
-- Parameter statistics_level=ALL (default: TYPICAL)

	var myid number; 
	exec :myid:=1001;
	select /*+ sample_sql1 monitor */ count(*) from test1 t1,test1 t2 where t2.id=:myid;
	select /*+ sample_sql1 */ count(*) from test1 t1,test1 t2,(select * from test1 where rownum<5);
	select sql_id,sql_fulltext from v$sql s where instr( lower(s.SQL_FULLTEXT) ,lower(' sample_sql1')) > '0';
	select DBMS_SQLTUNE.REPORT_SQL_MONITOR('&sqlid',report_level=>'ALL', type=>'text') from dual;


for sql monitor active html

-- Full script to generate html type report:
	set echo off verify off timing off trimsp on feed off pages 0 term off long 9999999 longc 9999999
	
--optional: disable compress in report

	alter session set events 'emx_control compress_xml=none';
	spool sqlmon_active_report.html
	select DBMS_SQLTUNE.REPORT_SQL_MONITOR('&sqlid',report_level=>'ALL',type=>'ACTIVE') rep from dual;
	spool off

#### Get the sequence for execution plan.

--Execution plan with sequence from plan_table:
-- seq limitation: the total lines of execution plan < 1000

	select 
	row_number() over (partition by 1 order by rpad(sys_connect_by_path(nvl2(parent_id,999-position,'999')||'-'||(999-id),'/'),8000,' ') desc) seq,
	id, lpad(' ',(level-1)*2,' ')||operation || ' ' || options operation, 
	decode(object_name,null,null,object_owner || '.' || object_name||decode(optimizer,'ANALYZED','(A)',null,' ','('||optimizer||')')) name, 
	cost, io_cost,  cardinality card, bytes,cpu_cost
	from plan_table
	connect by prior id=parent_id
	start with id=0
	order by id
	;

or:

	with tmp as (select * from v$sql_plan where sql_id='&1')
	select
	row_number() over (partition by 1 order by rpad(sys_connect_by_path(nvl2(parent_id,999-position,'999')||'-'||(999-id),'/'),8000,' ') desc) seq,
	id, lpad(' ',(level-1)*2,' ')||operation || ' ' || options operation,
	decode(object_name,null,null,object_owner || '.' || object_name||decode(optimizer,'ANALYZED','(A)',null,' ','('||optimizer||')')) obj,
	cost, io_cost,  cardinality card, bytes,cpu_cost
	from tmp
	connect by prior id=parent_id
	start with id=0
	order by id
	;




Have a good life! 2018/09 via LinHong



