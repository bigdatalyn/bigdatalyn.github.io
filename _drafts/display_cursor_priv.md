

///////////////////////////////////////////////////////
hr 用户获取cursor执行计划出错问题：

PLAN_TABLE_OUTPUT
-------------------------------------------------------------
User has no SELECT privilege on V$SESSION

V$~的SYNONYM
select synonym_name,table_name from dba_synonyms where synonym_name = 'V$SESSION';
select synonym_name,table_name from dba_synonyms where synonym_name = 'V$_SESSION';
 
dbms_xplan.display_cursor 需要如下权限
sys用户赋予hr用户以下权限即可：

grant select on V_$SESSION to hr;
grant select on V_$SQL_PLAN to hr;
grant select on V_$SQL to hr;
grant select on V_$SQL_PLAN_STATISTICS_ALL to hr;
///////////////////////////////////////////////////////


HR@pdb1> select e.first_name, e.last_name, dept_locs_v.street_address, dept_locs_v.postal_code from employees e,(select d.department_id, d.department_name, l.street_address, l.postal_code from departments d, locations l where d.location_id = l.location_id) dept_locs_v where dept_locs_v.department_id = e.department_id and e.last_name = 'XXXXX';

no rows selected

HR@pdb1> @xp

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID  5gn31qpnjp123, child number 0
-------------------------------------
select e.first_name, e.last_name, dept_locs_v.street_address,
dept_locs_v.postal_code from employees e,(select d.department_id,
d.department_name, l.street_address, l.postal_code from departments d,
locations l where d.location_id = l.location_id) dept_locs_v where
dept_locs_v.department_id = e.department_id and e.last_name = 'XXXXX'

Plan hash value: 257295346

-----------------------------------------------------------------------------------------------
| Id  | Operation                              | Name        | E-Rows | Cost (%CPU)| E-Time   |
-----------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                       |             |        |     4 (100)|          |
|   1 |  NESTED LOOPS                          |             |      1 |     4   (0)| 00:00:01 |
|   2 |   NESTED LOOPS                         |             |      1 |     4   (0)| 00:00:01 |
|   3 |    NESTED LOOPS                        |             |      1 |     3   (0)| 00:00:01 |
|   4 |     TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEES   |      1 |     2   (0)| 00:00:01 |
|*  5 |      INDEX RANGE SCAN                  | EMP_NAME_IX |      1 |     1   (0)| 00:00:01 |
|   6 |     TABLE ACCESS BY INDEX ROWID        | DEPARTMENTS |      1 |     1   (0)| 00:00:01 |
|*  7 |      INDEX UNIQUE SCAN                 | DEPT_ID_PK  |      1 |     0   (0)|          |
|*  8 |    INDEX UNIQUE SCAN                   | LOC_ID_PK   |      1 |     0   (0)|          |
|   9 |   TABLE ACCESS BY INDEX ROWID          | LOCATIONS   |      1 |     1   (0)| 00:00:01 |
-----------------------------------------------------------------------------------------------

