---
layout: post
title: "Oracle 23c New features - sql_transpiler Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - sql_transpiler Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	

Automatic PL/SQL to SQL Transpiler
PL/SQL functions within SQL statements are automatically converted (transpiled) into SQL expressions whenever possible.

Transpiling PL/SQL functions into SQL statements can speed up overall execution time.









### sql_transpiler

[1.5.2.1.7 Automatic SQL Transpiler](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/tgsql/introduction-to-sql-tuning.html#GUID-C25CC846-7515-4527-8345-DAE2896EDAC8)

As of Oracle Database 23c, the Automatic SQL Transpiler automatically and wherever possible converts (transpiles) PL/SQL functions within SQL into SQL expressions, without  user intervention. 

Expressions in Oracle SQL statements are allowed to call PL/SQL functions. But these call incur overhead because the external PL/SQL runtime has to be invoked. The SQL compiler automatically attempts to convert any PL/SQL function called from a SQL statement into a semantically equivalent SQL expression. Transpiling PL/SQL functions into SQL increases the performance of PL/SQL for new and existing PL/SQL programs and functions.  When a transpiled PL/SQL function is invoked, the per row cost of executing the transpiled code within SQL is much lower than switching from the SQL runtime to the PL/SQL runtime in order to execute the original PL/SQL code. 

If the transpiler cannot convert a PL/SQL function to SQL, execution of the function falls back to the PL/SQL runtime. Not all PL/SQL constructs are supported by the transpiler.

The entire operation is transparent to users, except that notes indicating that transpilation occurred are now included in the Notes section of the explain plan.


The Automatic SQL Transpiler is enabled by default.

This feature disabled or enabled by the boolean Oracle database initialization parameter SQL TRANSPILER in theinit.ora file.
```
SQL TRANSPILER = [True | False] 
```

The parameter can be modified either at the system or session level.


-> Test: seems same between ON and OFF with sql_transpiler.

```
create or replace function get_domain(url varchar2)
   return varchar2
is  
  PREFIX constant char (4) := 'www.';
  pos number;   
  len number;
begin
  pos := instr(url , PREFIX);
  len := instr(substr(url , pos + 4), '.') - 1;
  return substr(url , pos + 4, len);
end;
 /

create table customer(url varchar2(20));
insert into customer values('www.oracle.com');
insert into customer values('www.google.com');
commit;

alter session set sql_transpiler=ON;
select get_domain(url) from customer;
select * from table(dbms_xplan.display_cursor(format=>'ALL ALLSTATS LAST'));
select substr(url ,
   instr(url , 'www.')+4,
   instr(substr(url , instr(url , 'www.')+4),'.') -1)
from customer;
select * from table(dbms_xplan.display_cursor(format=>'ALL ALLSTATS LAST'));

alter session set sql_transpiler=OFF;
select get_domain(url) from customer;
select * from table(dbms_xplan.display_cursor(format=>'ALL ALLSTATS LAST'));

select substr(url ,
   instr(url , 'www.')+4,
   instr(substr(url , instr(url , 'www.')+4),'.') -1)
from customer;
select * from table(dbms_xplan.display_cursor(format=>'ALL ALLSTATS LAST'));


SYS@cdb1> select get_domain(url) from customer;

GET_DOMAIN(URL)
--------------------------------------------------------------------------------
oracle
google

SYS@cdb1> 
```

```

SQL_ID	d4gz0muhkgk8b, child number 0
-------------------------------------
select get_domain(url) from customer

Plan hash value: 2844954298

------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name     | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |	     |	    1 |        |       |     2 (100)|	       |      2 |00:00:00.01 |	     4 |
|   1 |  TABLE ACCESS FULL| CUSTOMER |	    1 |      2 |    24 |     2	 (0)| 00:00:01 |      2 |00:00:00.01 |	     4 |
------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / "CUSTOMER"@"SEL$1"

Column Projection Information (identified by operation id):
-----------------------------------------------------------

   1 - "URL"[VARCHAR2,20]

Note
-----
   - dynamic statistics used: dynamic sampling (level=2)
```

```
SQL_ID	9srxuxn1c9761, child number 0
-------------------------------------
select substr(url ,    instr(url , 'www.')+4,	 instr(substr(url ,
instr(url , 'www.')+4),'.') -1) from customer

Plan hash value: 2844954298

------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name     | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |	     |	    1 |        |       |     2 (100)|	       |      2 |00:00:00.01 |	     4 |
|   1 |  TABLE ACCESS FULL| CUSTOMER |	    1 |      2 |    24 |     2	 (0)| 00:00:01 |      2 |00:00:00.01 |	     4 |
------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / "CUSTOMER"@"SEL$1"

Column Projection Information (identified by operation id):
-----------------------------------------------------------

   1 - "URL"[VARCHAR2,20]

Note
-----
   - dynamic statistics used: dynamic sampling (level=2)
```

### Not all PL/SQL constructs can be transpiled to SQL.

PL/SQL Constructs Eligble for Transpilation

In Oracle Database 23c, the following PL/SQL language elements are supported by the Automatic SQL Transpiler:
```
Basic SQL scalar types: CHARACTER, DATE-TIME, and NUMBER
String types (CHAR, VARCHAR, VARCHAR2, NCHAR, etc.)
Numeric types (NUMBER, BINARY DOUBLE, etc.)
Date types (DATE, TIME, INTERVAL, and TIMESTAMP)
Local variables (with optional initialization at declaration) and constants
Parameters with optional (simple) default values
Variable assignment statements
Expressions which can be translated into equivalent SQL expressions
IF-THEN-ELSE statements
RETURN statements
Expressions and local variables of BOOLEAN type
```

### Reference 

[1.5.2.1.7 Automatic SQL Transpiler](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/tgsql/introduction-to-sql-tuning.html#GUID-C25CC846-7515-4527-8345-DAE2896EDAC8)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


