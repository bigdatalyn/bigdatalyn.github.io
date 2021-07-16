HONG@pdb1> create table employee(gender varchar2(1),employee_id number);

Table created.

HONG@pdb1> insert into employee values('M','100');

1 row created.

HONG@pdb1> insert into employee values('M','101');

1 row created.

HONG@pdb1> insert into employee values('M','102');

1 row created.

HONG@pdb1> insert into employee values('F','99');

1 row created.

HONG@pdb1> insert into employee values('F','103');

1 row created.

HONG@pdb1> insert into employee values('F','104');

1 row created.

HONG@pdb1> commit;

Commit complete.

HONG@pdb1>








HONG@pdb1> create index idx_employee_id on employee(employee_id);

Index created.

HONG@pdb1>


HONG@pdb1> alter session set statistics_level=all;

Session altered.

HONG@pdb1>
HONG@pdb1> select gender,employee_id,rowid from employee where employee_id=99;

G EMPLOYEE_ID ROWID
- ----------- ------------------
F	   99 AAAR/VAAMAAAFnVAAD

HONG@pdb1>
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION -bytes iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	2ab58p8nc4pm9, child number 1
-------------------------------------
select gender,employee_id,rowid from employee where employee_id=99

Plan hash value: 2119105728

----------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name     | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |	     |	    1 |        |     3 (100)|	       |      1 |00:00:00.01 |	     8 |
|*  1 |  TABLE ACCESS FULL| EMPLOYEE |	    1 |      1 |     3	 (0)| 00:00:01 |      1 |00:00:00.01 |	     8 |
----------------------------------------------------------------------------------------------------------------\

HONG@pdb1> select gender,employee_id,rowid from employee where rowid='AAAR/VAAMAAAFnVAAD';

G EMPLOYEE_ID ROWID
- ----------- ------------------
F	   99 AAAR/VAAMAAAFnVAAD

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION -bytes iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	5w6x7w9uhf9dn, child number 0
-------------------------------------
select gender,employee_id,rowid from employee where
rowid='AAAR/VAAMAAAFnVAAD'

Plan hash value: 3863273034

-------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		   | Name     | Starts | E-Rows | Cost (%CPU)| E-Time	| A-Rows |   A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	   |	      |      1 |	|     1 (100)|		|      1 |00:00:00.01 |       1 |
|   1 |  TABLE ACCESS BY USER ROWID| EMPLOYEE |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       1 |
-------------------------------------------------------------------------------------------------------------------------


HONG@pdb1> create index idx_employee_id on employee(employee_id);

Index created.

HONG@pdb1> select gender,employee_id,rowid from employee where employee_id=99;

G EMPLOYEE_ID ROWID
- ----------- ------------------
F	   99 AAAR/VAAMAAAFnVAAD

HONG@pdb1>
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION -bytes iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	2ab58p8nc4pm9, child number 1
-------------------------------------
select gender,employee_id,rowid from employee where employee_id=99

Plan hash value: 1143169257

-----------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			    | Name	      | Starts | E-Rows | Cost (%CPU)| E-Time	| A-Rows |   A-Time   | Buffers |
-----------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		    |		      |      1 |	|     2 (100)|		|      1 |00:00:00.01 |       3 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| EMPLOYEE	      |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |
|*  2 |   INDEX RANGE SCAN		    | IDX_EMPLOYEE_ID |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
-----------------------------------------------------------------------------------------------------------------------------------------


TABLE ACCESS FULL
TABLE ACCESS BY USER ROWID
TABLE ACCESS BY INDEX ROWID BATCHED
