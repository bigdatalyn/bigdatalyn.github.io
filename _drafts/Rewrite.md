1.小结果集，尽量使用索引，多表关联用NL
2.大结果集，避免使用索引，多变关联用HJ

避免大结果集排序
合并相同逻辑查询，避免重复执行： case when / with as
重复利用数据库提供的函数和功能： 分析函数/pivot/unpivot/model

CTE
a.物化
b.递归查询
c.可读性增强

insert append: 问题：pga/表锁

where条件：等值条件 先后顺序无所谓 （RBO可能需要关注：选择性条件好的放到后面）

控制表访问的先后顺序 hint ： 之前版本 8i/9i使用 ordered 10g及以上用 leading / leading 可以控制很多表，不止2个表
控制谓词条件的先后顺序： hint ： ordered_predicates

ordered_predicates 应用： where 条件中有函数 getname(object_id) = 'T1' 类似这种，优化器识别不了，所以可以通过 ordered_predicates

http://www.dba-oracle.com/hint_ordered_predicates.htm
https://blog.csdn.net/qq_29331365/article/details/102623115

create table test as select * from dba_objects;
create index idx_test_object_id on test(object_id);
exec dbms_stats.gather_table_stats('hong','test',cascade=>true,no_invalidate=>false);

create or replace function getname(in_id in number) return varchar2
as 
   rtn_object_name varchar2(128);
begin 
    select object_name into rtn_object_name from test where object_id = in_id;
    return rtn_object_name;
end;
/

查看function创建的错误：

show errors function 

HONG@pdb1> show errors
Errors for FUNCTION GETNAME:

LINE/COL ERROR
-------- -----------------------------------------------------------------
4/3	 PL/SQL: SQL Statement ignored
4/48	 PL/SQL: ORA-00942: table or view does not exist
HONG@pdb1>


HONG@pdb1> select distinct owner from t1;

OWNER
------
SYS
SYSTEM
PUBLIC
OUTLN

HONG@pdb1>

select count(*) from t1 where getname(object_id)='DBA_OBJECTS' or owner <> 'SYSTEM';
select /*+ ordered_predicates */ count(*) from t1 where getname(object_id)='DBA_OBJECTS' or owner <> 'SYSTEM';

HONG@pdb1> select count(*) from t1 where getname(object_id)='DBA_OBJECTS' or owner <> 'SYSTEM';

  COUNT(*)
----------
      4913

Elapsed: 00:00:00.02
HONG@pdb1> select /*+ ordered_predicates */ count(*) from t1 where getname(object_id)='DBA_OBJECTS' or owner <> 'SYSTEM';

  COUNT(*)
----------
      4913

Elapsed: 00:00:00.27
HONG@pdb1>


SQL_ID	8fx180h1wnyb6, child number 0
-------------------------------------
select count(*) from t1 where getname(object_id)='DBA_OBJECTS' or owner
<> 'SYSTEM'

Plan hash value: 3724264953

---------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
---------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |	 1 |	    |	    |	 27 (100)|	    |	   1 |00:00:00.01 |	351 |
|   1 |  SORT AGGREGATE    |	  |	 1 |	  1 |	 10 |		 |	    |	   1 |00:00:00.01 |	351 |
|*  2 |   TABLE ACCESS FULL| T1   |	 1 |   3763 | 37630 |	 27   (0)| 00:00:01 |	4913 |00:00:00.01 |	351 |
---------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - filter(("OWNER"<>'SYSTEM' OR "GETNAME"("OBJECT_ID")='DBA_OBJECTS'))

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



select /*+ ordered_predicates */ count(*) from t1 where
getname(object_id)='DBA_OBJECTS' or owner <> 'SYSTEM'

Plan hash value: 3724264953

---------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
---------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |	 1 |	    |	    |	 28 (100)|	    |	   1 |00:00:00.34 |   15099 |
|   1 |  SORT AGGREGATE    |	  |	 1 |	  1 |	 10 |		 |	    |	   1 |00:00:00.34 |   15099 |
|*  2 |   TABLE ACCESS FULL| T1   |	 1 |   3763 | 37630 |	 28   (4)| 00:00:01 |	4913 |00:00:00.34 |   15099 |
---------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - filter(("GETNAME"("OBJECT_ID")='DBA_OBJECTS' OR "OWNER"<>'SYSTEM'))

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1
---------------------------------------------------------------------------

   1 -	SEL$1
	   -  ordered_predicates

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>


Predicate evaluation order
https://asktom.oracle.com/pls/apex/asktom.search?tag=predicate-evaluation-order
Note: ordered_predicates is undocumented, so use with caution!




### basic

合理使用绑定变量，特别是 OLTP
-》唯一值很多的，共享池，建议绑定变量
-》唯一值很少的字段，分布不均，不建议使用绑定变量

避免字段上使用函数和运算

避免隐式转换（3种）
a. varchar2 vs number(变脸/绑定变量) 谓词过滤中有 to_number(varchar2字段) 不使用索引 ： 可以通过 to_number 函数索引弥补
b. date vs timestamp  -> internal_function ：日期类型转换才是隐式转换，其他字符的就不是，没办法弥补，只能改字段和改写sql
c. varchar2 vs nvarchar2 (char vs nchar) -> SYS_OP_C2C ： 可以建 to_nchar 函数弥补

- 避免 select *， 内层如果指定了多个字段列表了，外层*简写没有问题
- 多表关联使用别名，别名不能太长，避免重复别名或者漏写别名（可读性问题）
- 不建议中文做对象名，字段，索引（可读性问题）
- 避免不加where条件的delete和update，避免单个sql做大批量的update/delete
- 高并发环境，dml操作需要尽快commit，避免锁等待
- 能用in就不要用 != 和 not in (val1,val2,val3)
- 批量处理，commit的频率要适中
- 业务上避免使用 like '%ABC%' (如果需要，建议使用全文检索工具)
- 不需要去重或者结果集不存在重复值的话，使用 union all/不要用 union
- group by SQL，能放到 where 部分条件，不要放到 having部分
- 反关联建议使用 not exists，不建议使用 not in （in和exists基本上是等价的）


HONG@pdb1> insert into t1 select * from dba_objects where to_char(created,'yyyy-mm-dd') = '2021-08-20';

7 rows created.

HONG@pdb1> commit;

Commit complete.

HONG@pdb1> select count(*) from t1;

  COUNT(*)
----------
      5007

HONG@pdb1>

### 1. 懒人写法：
to_char(created,'yyyy-mm-dd') = '2021-08-20';

create table t1 as select * from dba_objects;
---- insert into t1 select * from dba_objects where to_char(created,'yyyy-mm-dd') = '2021-08-20';
---- commit;
create index idx_t1_created on t1(created);


HONG@pdb1> create index idx_t1_created on t1(created);

Index created.

HONG@pdb1> select owner,object_name from t1 where to_char(created,'yyyy-mm-dd') = '2021-08-20';

OWNER OBJECT_NAME
----- -----------------------------
HONG  GETNAME
HONG  TEST
HONG  IDX_TEST_OBJECT_ID
SYS   WRI$_OPTSTAT_HISTHEAD_HISTORY
SYS   SYS_IL0000014863C00016$$
SYS   SYS_LOB0000014863C00016$$
HONG  T1

7 rows selected.

HONG@pdb1>
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	8d7wxr4z7qtt9, child number 1
-------------------------------------
select owner,object_name from t1 where to_char(created,'yyyy-mm-dd') =
'2021-08-20'

Plan hash value: 3617692013

--------------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
--------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |	 |	1 |	   |	   |   398 (100)|	   |	  6 |00:00:00.06 |    1428 |
|*  1 |  TABLE ACCESS FULL| T1	 |	1 |	 6 |   288 |   398   (1)| 00:00:01 |	  6 |00:00:00.06 |    1428 |
--------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(TO_CHAR(INTERNAL_FUNCTION("CREATED"),'yyyy-mm-dd')='2021-08-20')

Note
-----
   - statistics feedback used for this statement

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



48 rows selected.

HONG@pdb1>

HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	53c8hx6r6hsda, child number 0
-------------------------------------
select owner,object_name from t1 where created >=
to_date('2021-08-20','yyyy-mm-dd') and created <
to_date('2021-08-20','yyyy-mm-dd') + 1

Plan hash value: 181160299

---------------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			    | Name	     | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads	|
---------------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		    |		     |	    1 |        |       |     5 (100)|	       |      6 |00:00:00.01 |	     5 |      1 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1	     |	    1 |    117 |  5616 |     5	 (0)| 00:00:01 |      6 |00:00:00.01 |	     5 |      1 |
|*  2 |   INDEX RANGE SCAN		    | IDX_T1_CREATED |	    1 |    117 |       |     2	 (0)| 00:00:01 |      6 |00:00:00.01 |	     3 |      1 |
---------------------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX_RS_ASC(@"SEL$1" "T1"@"SEL$1" ("T1"."CREATED"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("CREATED">=TO_DATE(' 2021-08-20 00:00:00', 'syyyy-mm-dd hh24:mi:ss') AND "CREATED"<TO_DATE(' 2021-08-21 00:00:00', 'syyyy-mm-dd
	      hh24:mi:ss'))

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



49 rows selected.

HONG@pdb1>

select owner,object_name from t1 where to_char(created,'yyyy-mm-dd') = '2021-08-20';
建议改写成：
select owner,object_name from t1 where created >= to_date('2021-08-20','yyyy-mm-dd') and created < to_date('2021-08-20','yyyy-mm-dd') + 1;

buffer：1428 -> 5
INDEX RANGE SCAN 索引，回表


### 2.懒人写法 trunc(business_date)=trunc(sysdate)
建议改写：business_date >=trunc(sysdate) and business_date < trunc(sysdate) + 1
不能为了方便将日期类型定义成varchar2或者number

trunc : 用于截取时间或者数值，返回指定的值


select trunc(to_date(sysdate,'YYYY-MM-DD HH:MI:SS'),'yyyy') from dual; 


select  trunc(to_date('2021-08-20 1:00:00','YYYY-MM-DD HH:MI:SS'),'yyyy') from   dual ;--返回当年第一天
select  trunc(to_date('2021-08-20 1:00:00','YYYY-MM-DD HH:MI:SS'),'mm') from   dual ; --返回当月第一天
select  trunc(to_date('2021-08-20 1:00:00','YYYY-MM-DD HH:MI:SS'),'dd') from   dual ;--返回当前年月
select  trunc(to_date('2021-08-20 1:00:00','YYYY-MM-DD HH:MI:SS'),'d') from   dual ; --返回当前星期的第一天(星期日) 
select  trunc(to_date('2021-08-20 1:12:12','YYYY-MM-DD HH:MI:SS'),'hh') from   dual ;--返回当前日期截取到小时,分秒补0
select  trunc(to_date('2021-08-20 1:12:12','YYYY-MM-DD HH:MI:SS'),'mi') from   dual ;--返回当前日期截取到分,秒补0

select trunc(1234.567) from dual;
select trunc(1234.567,2) from dual;
select trunc(1234.567,-2) from dual;


HONG@pdb1> select trunc(1234.567) from dual;

TRUNC(1234.567)
---------------
	   1234

HONG@pdb1> select trunc(1234.567,2) from dual;

TRUNC(1234.567,2)
-----------------
	  1234.56

HONG@pdb1> select trunc(1234.567,-2) from dual;

TRUNC(1234.567,-2)
------------------
	      1200

HONG@pdb1>

### 3.substr(name,1,5) = 'ABCD'
建议改写成 name like 'ABCD%';

select owner,object_name,object_type from t1 where substr(object_name,1,4)='TEST'; -- 全表扫，走不了索引，字段有函数运算
select owner,object_name,object_type from t1 where object_name like 'TEST%';  -- 能走索引



HONG@pdb1> create index idx_t1_object_name on t1(object_name);

Index created.

HONG@pdb1> select owner,object_name,object_type from t1 where substr(object_name,1,4)='TEST';

OWNER OBJECT_NAME		    OBJECT_TYPE
----- ----------------------------- -----------------------
TEST  TEST			    TABLE
SCOTT TEST			    TABLE
HONG  TEST_INDEX		    TABLE
SYS   TEST01			    TABLE
SYS   TEST02			    TABLE
HONG  TEST			    TABLE

6 rows selected.

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	fb6bz34hb08zs, child number 2
-------------------------------------
select owner,object_name,object_type from t1 where
substr(object_name,1,4)='TEST'

Plan hash value: 3617692013

--------------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
--------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |	 |	1 |	   |	   |   398 (100)|	   |	  6 |00:00:00.01 |    1428 |
|*  1 |  TABLE ACCESS FULL| T1	 |	1 |    733 | 36650 |   398   (1)| 00:00:01 |	  6 |00:00:00.01 |    1428 |
--------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(SUBSTR("OBJECT_NAME",1,4)='TEST')

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



44 rows selected.

HONG@pdb1> select owner,object_name,object_type from t1 where object_name like 'TEST%';

OWNER OBJECT_NAME		    OBJECT_TYPE
----- ----------------------------- -----------------------
TEST  TEST			    TABLE
SCOTT TEST			    TABLE
HONG  TEST			    TABLE
SYS   TEST01			    TABLE
SYS   TEST02			    TABLE
HONG  TEST_INDEX		    TABLE

6 rows selected.

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	9gm4kxn9mck43, child number 0
-------------------------------------
select owner,object_name,object_type from t1 where object_name like
'TEST%'

Plan hash value: 4199710978

-------------------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			    | Name		 | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers | Reads  |
-------------------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		    |			 |	1 |	   |	   |	 4 (100)|	   |	  6 |00:00:00.01 |	 9 |	  2 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1		 |	1 |	 1 |	50 |	 4   (0)| 00:00:01 |	  6 |00:00:00.01 |	 9 |	  2 |
|*  2 |   INDEX RANGE SCAN		    | IDX_T1_OBJECT_NAME |	1 |	 1 |	   |	 3   (0)| 00:00:01 |	  6 |00:00:00.01 |	 4 |	  2 |
-------------------------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX_RS_ASC(@"SEL$1" "T1"@"SEL$1" ("T1"."OBJECT_NAME"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("OBJECT_NAME" LIKE 'TEST%')
       filter("OBJECT_NAME" LIKE 'TEST%')

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



48 rows selected.

HONG@pdb1>

### 4. salary*1.5 <=9999
建议改写成 salary<= 9999/1.5

### col1 ||'0' = :str1
col1 = substr(:str1,1,length(:str1)-1) and substr(:str1,-1)='0'

select owner,object_name,object_type from t1 where object_name||'1' = 'TEST1';

var str1 varchar2(20);
exec :str1 := 'TEST1';
select owner,object_name,object_type from t1 where object_name = substr(:str1,1,length(:str1)-1) and substr(:str1,-1)='1';

HONG@pdb1> select owner,object_name,object_type from t1 where object_name||'1' = 'TEST1';

OWNER OBJECT_NAME		    OBJECT_TYPE
----- ----------------------------- -----------------------
TEST  TEST			    TABLE
SCOTT TEST			    TABLE
HONG  TEST			    TABLE

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	3g7fncc6tgy4b, child number 1
-------------------------------------
select owner,object_name,object_type from t1 where object_name||'1' =
'TEST1'

Plan hash value: 3617692013

--------------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
--------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |	 |	1 |	   |	   |   397 (100)|	   |	  3 |00:00:00.01 |    1428 |
|*  1 |  TABLE ACCESS FULL| T1	 |	1 |	 3 |   150 |   397   (1)| 00:00:01 |	  3 |00:00:00.01 |    1428 |
--------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter("OBJECT_NAME"||'1'='TEST1')

Note
-----
   - statistics feedback used for this statement

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



48 rows selected.

HONG@pdb1>


HONG@pdb1> select owner,object_name,object_type from t1 where object_name = substr(:str1,1,length(:str1)-1) and substr(:str1,-1)='1';

OWNER OBJECT_NAME OBJECT_TYPE
----- ----------- -----------
TEST  TEST	  TABLE
SCOTT TEST	  TABLE
HONG  TEST	  TABLE

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	4wtpkn6tg9gpd, child number 0
-------------------------------------
select owner,object_name,object_type from t1 where object_name =
substr(:str1,1,length(:str1)-1) and substr(:str1,-1)='1'

Plan hash value: 4261818678

-----------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			     | Name		  | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
-----------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		     |			  |	 1 |	    |	    |	  4 (100)|	    |	   3 |00:00:00.01 |	  7 |
|*  1 |  FILTER 			     |			  |	 1 |	    |	    |		 |	    |	   3 |00:00:00.01 |	  7 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| T1		  |	 1 |	  1 |	 50 |	  4   (0)| 00:00:01 |	   3 |00:00:00.01 |	  7 |
|*  3 |    INDEX RANGE SCAN		     | IDX_T1_OBJECT_NAME |	 1 |	  1 |	    |	  3   (0)| 00:00:01 |	   3 |00:00:00.01 |	  4 |
-----------------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$1 / T1@SEL$1
   3 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX_RS_ASC(@"SEL$1" "T1"@"SEL$1" ("T1"."OBJECT_NAME"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Peeked Binds (identified by position):
--------------------------------------

   1 - :1 (VARCHAR2(30), CSID=873): 'TEST1'
   2 - :1 (VARCHAR2(30), CSID=873, Primary=1)

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(SUBSTR(:STR1,(-1))='1')
   3 - access("OBJECT_NAME"=SUBSTR(:STR1,1,LENGTH(:STR1)-1))

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



56 rows selected.

HONG@pdb1>


### 6.特殊情况

!= 
<>
not in (val1,val2,val3)
like '%ABCD';
like '%ABCD%;

### 7.group by 位置

利用索引比表小的特点可能使用索引，用索引覆盖

select object_type,count(1) type_count from t1 group by object_type,status having status ='VALID' and object_type='TABLE';

select object_type,count(1) type_count from t1 where status ='VALID' and object_type='TABLE' group by object_type;
select object_type,count(1) type_count from t1 where status ='VALID' and object_type='TABLE' group by object_type,status;


HONG@pdb1> create index idx_object_type_status on t1(object_type,status);

Index created.

HONG@pdb1> select object_type,count(1) type_count from t1 group by object_type,status having status ='VALID' and object_type='TABLE';

OBJECT_TYPE	      TYPE_COUNT
-------------------- -----------
TABLE			    2320

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	brrafsjb2r590, child number 1
-------------------------------------
select object_type,count(1) type_count from t1 group by
object_type,status having status ='VALID' and object_type='TABLE'

Plan hash value: 2966258745

----------------------------------------------------------------------------------------------------------------------
| Id  | Operation	    | Name | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT    |	   |	  1 |	     |	     |	 400 (100)|	     |	    1 |00:00:00.06 |	1427 |
|*  1 |  FILTER 	    |	   |	  1 |	     |	     |		  |	     |	    1 |00:00:00.06 |	1427 |
|   2 |   HASH GROUP BY     |	   |	  1 |	   1 |	  17 |	 400   (1)| 00:00:01 |	   49 |00:00:00.06 |	1427 |
|   3 |    TABLE ACCESS FULL| T1   |	  1 |  73328 |	1217K|	 397   (1)| 00:00:01 |	73328 |00:00:00.01 |	1427 |
----------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   3 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      USE_HASH_AGGREGATION(@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(("STATUS"='VALID' AND "OBJECT_TYPE"='TABLE'))

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



48 rows selected.

HONG@pdb1>

HONG@pdb1> select object_type,count(1) type_count from t1 where status ='VALID' and object_type='TABLE' group by object_type;

OBJECT_TYPE	      TYPE_COUNT
-------------------- -----------
TABLE			    2320

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	cs03c7sq85bbh, child number 0
-------------------------------------
select object_type,count(1) type_count from t1 where status ='VALID'
and object_type='TABLE' group by object_type

Plan hash value: 2239127963

-----------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	     | Name		      | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time	| A-Rows |   A-Time   | Buffers |
-----------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT     |			      |      1 |	|	|     6 (100)|		|      1 |00:00:00.01 |       9 |
|   1 |  SORT GROUP BY NOSORT|			      |      1 |   1496 | 25432 |     6   (0)| 00:00:01 |      1 |00:00:00.01 |       9 |
|*  2 |   INDEX RANGE SCAN   | IDX_OBJECT_TYPE_STATUS |      1 |   1496 | 25432 |     6   (0)| 00:00:01 |   2320 |00:00:00.01 |       9 |
-----------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX(@"SEL$1" "T1"@"SEL$1" ("T1"."OBJECT_TYPE" "T1"."STATUS"))
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("OBJECT_TYPE"='TABLE' AND "STATUS"='VALID')

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



46 rows selected.

HONG@pdb1>

### 8.同时 min/max

select min(object_id),max(object_id) from t1;

create index idx_object_id_0 on t1(object_id,0); -- object_id 含有null字段，所以创建联合索引
select (select min(object_id) from t1) as min_id,(select max(object_id) from t1) as max_id from dual;


HONG@pdb1> select min(object_id),max(object_id) from t1;

MIN(OBJECT_ID) MAX(OBJECT_ID)
-------------- --------------
	     2		74464

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	8tn0kb95vxmj0, child number 0
-------------------------------------
select min(object_id),max(object_id) from t1

Plan hash value: 3724264953

---------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
---------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |	 1 |	    |	    |	397 (100)|	    |	   1 |00:00:00.04 |    1427 |
|   1 |  SORT AGGREGATE    |	  |	 1 |	  1 |	  5 |		 |	    |	   1 |00:00:00.04 |    1427 |
|   2 |   TABLE ACCESS FULL| T1   |	 1 |  73328 |	358K|	397   (1)| 00:00:01 |  73328 |00:00:00.04 |    1427 |
---------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



40 rows selected.

HONG@pdb1> select (select min(object_id) from t1) as min_id,(select max(object_id) from t1) as max_id from dual;

    MIN_ID     MAX_ID
---------- ----------
	 2	74464

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	c4qgsts888vag, child number 0
-------------------------------------
select (select min(object_id) from t1) as min_id,(select max(object_id)
from t1) as max_id from dual

Plan hash value: 1239795185

---------------------------------------------------------------------------------------------------------------------
| Id  | Operation	   | Name | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers |
---------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |	  |	 1 |	    |	    |	796 (100)|	    |	   1 |00:00:00.01 |	  0 |
|   1 |  SORT AGGREGATE    |	  |	 1 |	  1 |	  5 |		 |	    |	   1 |00:00:00.01 |    1427 |
|   2 |   TABLE ACCESS FULL| T1   |	 1 |  73328 |	358K|	397   (1)| 00:00:01 |  73328 |00:00:00.01 |    1427 |
|   3 |  SORT AGGREGATE    |	  |	 1 |	  1 |	  5 |		 |	    |	   1 |00:00:00.04 |    1427 |
|   4 |   TABLE ACCESS FULL| T1   |	 1 |  73328 |	358K|	397   (1)| 00:00:01 |  73328 |00:00:00.01 |    1427 |
|   5 |  FAST DUAL	   |	  |	 1 |	  1 |	    |	  2   (0)| 00:00:01 |	   1 |00:00:00.01 |	  0 |
---------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$2
   2 - SEL$2 / T1@SEL$2
   3 - SEL$3
   4 - SEL$3 / T1@SEL$3
   5 - SEL$1 / DUAL@SEL$1

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
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$3" "T1"@"SEL$3")
      FULL(@"SEL$2" "T1"@"SEL$2")
      END_OUTLINE_DATA
  */

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[DUAL]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$3]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$3]]></s></h></f></q>



52 rows selected.

HONG@pdb1> select count(*) from t1 where object_id is null;

  COUNT(*)
----------
	 1

HONG@pdb1> create index idx_object_id_0 on t1(object_id,0);

Index created.

HONG@pdb1> select (select min(object_id) from t1) as min_id,(select max(object_id) from t1) as max_id from dual;

    MIN_ID     MAX_ID
---------- ----------
	 2	74464

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	c4qgsts888vag, child number 0
-------------------------------------
select (select min(object_id) from t1) as min_id,(select max(object_id)
from t1) as max_id from dual

Plan hash value: 183815803

-------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		   | Name	     | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads	|
-------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	   |		     |	    1 |        |       |     6 (100)|	       |      1 |00:00:00.01 |	     0 |      0 |
|   1 |  SORT AGGREGATE 	   |		     |	    1 |      1 |     5 |	    |	       |      1 |00:00:00.01 |	     2 |      1 |
|   2 |   INDEX FULL SCAN (MIN/MAX)| IDX_OBJECT_ID_0 |	    1 |      1 |     5 |     2	 (0)| 00:00:01 |      1 |00:00:00.01 |	     2 |      1 |
|   3 |  SORT AGGREGATE 	   |		     |	    1 |      1 |     5 |	    |	       |      1 |00:00:00.01 |	     2 |      1 |
|   4 |   INDEX FULL SCAN (MIN/MAX)| IDX_OBJECT_ID_0 |	    1 |      1 |     5 |     2	 (0)| 00:00:01 |      1 |00:00:00.01 |	     2 |      1 |
|   5 |  FAST DUAL		   |		     |	    1 |      1 |       |     2	 (0)| 00:00:01 |      1 |00:00:00.01 |	     0 |      0 |
-------------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$2
   2 - SEL$2 / T1@SEL$2
   3 - SEL$3
   4 - SEL$3 / T1@SEL$3
   5 - SEL$1 / DUAL@SEL$1

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
      OUTLINE_LEAF(@"SEL$1")
      INDEX(@"SEL$3" "T1"@"SEL$3" "IDX_OBJECT_ID_0")
      INDEX(@"SEL$2" "T1"@"SEL$2" "IDX_OBJECT_ID_0")
      END_OUTLINE_DATA
  */

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[DUAL]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$3]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$3]]></s></h></f></q>



52 rows selected.

HONG@pdb1>


### 9. like '%ABCD'百分号在前

-- TABLE ACCESS FULL
select owner,object_name,object_type from t1 where object_name like '%ST1';

create index idx_t1_object_name_reverse on t1(reverse(object_name));
-- TABLE ACCESS FULL
select owner,object_name,object_type from t1 where object_name like '%ST1';

-- INDEX RANGE SCAN (除了创建反转索引之后，sql写法也需要转化)
select owner,object_name,object_type from t1 where reverse(object_name) like reverse('%ST1');



HONG@pdb1> select owner,object_name,object_type from t1 where object_name like '%ST1';

OWNER  OBJECT_NAME		      OBJECT_TYPE
------ ------------------------------ ---------------
SYS    I_UNDOHIST1		      INDEX

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	08gj131krc68u, child number 1
-------------------------------------
select owner,object_name,object_type from t1 where object_name like
'%ST1'

Plan hash value: 3617692013

--------------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
--------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |	 |	1 |	   |	   |   397 (100)|	   |	  1 |00:00:00.01 |    1428 |
|*  1 |  TABLE ACCESS FULL| T1	 |	1 |	 1 |	50 |   397   (1)| 00:00:01 |	  1 |00:00:00.01 |    1428 |
--------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(("OBJECT_NAME" LIKE '%ST1' AND "OBJECT_NAME" IS NOT NULL))

Note
-----
   - statistics feedback used for this statement

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



48 rows selected.

HONG@pdb1>



HONG@pdb1> select owner,object_name,object_type from t1 where reverse(object_name) like reverse('%ST1');

OWNER  OBJECT_NAME		      OBJECT_TYPE
------ ------------------------------ ---------------
SYS    I_UNDOHIST1		      INDEX

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	2h2zbr6xfz19h, child number 0
-------------------------------------
select owner,object_name,object_type from t1 where reverse(object_name)
like reverse('%ST1')

Plan hash value: 709381702

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			    | Name			 | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers | Reads  |
---------------------------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		    |				 |	1 |	   |	   |   395 (100)|	   |	  1 |00:00:00.01 |	 5 |	  1 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1			 |	1 |   3666 |   415K|   395   (0)| 00:00:01 |	  1 |00:00:00.01 |	 5 |	  1 |
|*  2 |   INDEX RANGE SCAN		    | IDX_T1_OBJECT_NAME_REVERSE |	1 |    660 |	   |	 7   (0)| 00:00:01 |	  1 |00:00:00.01 |	 4 |	  1 |
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX_RS_ASC(@"SEL$1" "T1"@"SEL$1" "IDX_T1_OBJECT_NAME_REVERSE")
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("T1"."SYS_NC00028$" LIKE '1TS%')
       filter("T1"."SYS_NC00028$" LIKE '1TS%')

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



48 rows selected.

HONG@pdb1>


### 10. like '%ABCD%'  两个百分号

-- TABLE ACCESS FULL
select owner,object_name,object_type from t1 where object_name like '%HIST_SQLS%';

-- INDEX FULL SCAN 单块读，低效
select /*+ index(t1,idx_t1_object_name) */ owner,object_name,object_type from t1 where object_name like '%HIST_SQLS%';


-- index fast full scan : 利用索引一般比表小，用索引全扫描来代替额表的全扫描
select owner,object_name,object_type from t1 where object_name in
(select /*+ cardinality(t1 5) */ object_name from t1 where object_name like '%HIST_SQLS%');


HONG@pdb1> select owner,object_name,object_type from t1 where object_name like '%HIST_SQLS%';

OWNER  OBJECT_NAME		      OBJECT_TYPE
------ ------------------------------ ---------------
SYS    DBA_HIST_SQLSTAT 	      VIEW
PUBLIC DBA_HIST_SQLSTAT 	      SYNONYM
SYS    CDB_HIST_SQLSTAT 	      VIEW
PUBLIC CDB_HIST_SQLSTAT 	      SYNONYM

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	d8k2075skvafu, child number 0
-------------------------------------
select owner,object_name,object_type from t1 where object_name like
'%HIST_SQLS%'

Plan hash value: 3617692013

--------------------------------------------------------------------------------------------------------------------
| Id  | Operation	  | Name | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
--------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |	 |	1 |	   |	   |   397 (100)|	   |	  4 |00:00:00.10 |    1428 |
|*  1 |  TABLE ACCESS FULL| T1	 |	1 |   3666 |   179K|   397   (1)| 00:00:01 |	  4 |00:00:00.10 |    1428 |
--------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      FULL(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(("OBJECT_NAME" LIKE '%HIST_SQLS%' AND "OBJECT_NAME" IS NOT NULL))

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



44 rows selected.

HONG@pdb1>
HONG@pdb1>
HONG@pdb1> select /*+ index(t1,idx_t1_object_name) */ owner,object_name,object_type from t1 where object_name like '%HIST_SQLS%';

OWNER  OBJECT_NAME		      OBJECT_TYPE
------ ------------------------------ ---------------
SYS    CDB_HIST_SQLSTAT 	      VIEW
PUBLIC CDB_HIST_SQLSTAT 	      SYNONYM
SYS    DBA_HIST_SQLSTAT 	      VIEW
PUBLIC DBA_HIST_SQLSTAT 	      SYNONYM

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	d3au6mna19yuc, child number 0
-------------------------------------
select /*+ index(t1,idx_t1_object_name) */
owner,object_name,object_type from t1 where object_name like
'%HIST_SQLS%'

Plan hash value: 4235033835

----------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation			    | Name		 | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	A-Time	 | Buffers |
----------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT		    |			 |	1 |	   |	   |  2296 (100)|	   |	  4 |00:00:00.10 |     468 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1		 |	1 |   3666 |   179K|  2296   (1)| 00:00:01 |	  4 |00:00:00.10 |     468 |
|*  2 |   INDEX FULL SCAN		    | IDX_T1_OBJECT_NAME |	1 |   3666 |	   |   466   (1)| 00:00:01 |	  4 |00:00:00.10 |     466 |
----------------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1 / T1@SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX(@"SEL$1" "T1"@"SEL$1" ("T1"."OBJECT_NAME"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - filter(("OBJECT_NAME" LIKE '%HIST_SQLS%' AND "OBJECT_NAME" IS NOT NULL))

Hint Report (identified by operation id / Query Block Name / Object Alias):
Total hints for statement: 1
---------------------------------------------------------------------------

   1 -	SEL$1 / T1@SEL$1
	   -  index(t1,idx_t1_object_name)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



55 rows selected.

HONG@pdb1>

HONG@pdb1> select owner,object_name,object_type from t1 where object_name in
  2  (select /*+ cardinality(t1 5) */ object_name from t1 where object_name like '%HIST_SQLS%');

OWNER  OBJECT_NAME		      OBJECT_TYPE
------ ------------------------------ ---------------
SYS    CDB_HIST_SQLSTAT 	      VIEW
PUBLIC CDB_HIST_SQLSTAT 	      SYNONYM
SYS    DBA_HIST_SQLSTAT 	      VIEW
PUBLIC DBA_HIST_SQLSTAT 	      SYNONYM

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	2mfwxbrwwms6p, child number 0
-------------------------------------
select owner,object_name,object_type from t1 where object_name in
(select /*+ cardinality(t1 5) */ object_name from t1 where object_name
like '%HIST_SQLS%')

Plan hash value: 2120890569

------------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		     | Name		  | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |	 A-Time   | Buffers | Reads  |
------------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	     |			  |	 1 |	    |	    |	136 (100)|	    |	   4 |00:00:00.15 |	483 |	   2 |
|   1 |  NESTED LOOPS		     |			  |	 1 |	  1 |	 85 |	136   (2)| 00:00:01 |	   4 |00:00:00.15 |	483 |	   2 |
|   2 |   NESTED LOOPS		     |			  |	 1 |	  3 |	 85 |	136   (2)| 00:00:01 |	   4 |00:00:00.15 |	481 |	   2 |
|   3 |    SORT UNIQUE		     |			  |	 1 |	  5 |	175 |	128   (1)| 00:00:01 |	   2 |00:00:00.15 |	474 |	   2 |
|*  4 |     INDEX FAST FULL SCAN     | IDX_T1_OBJECT_NAME |	 1 |	  5 |	175 |	128   (1)| 00:00:01 |	   4 |00:00:00.15 |	474 |	   2 |
|*  5 |    INDEX RANGE SCAN	     | IDX_T1_OBJECT_NAME |	 2 |	  1 |	    |	  2   (0)| 00:00:01 |	   4 |00:00:00.01 |	  7 |	   0 |
|   6 |   TABLE ACCESS BY INDEX ROWID| T1		  |	 4 |	  1 |	 50 |	  3   (0)| 00:00:01 |	   4 |00:00:00.01 |	  2 |	   0 |
------------------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$5DA710D3
   4 - SEL$5DA710D3 / T1@SEL$2
   5 - SEL$5DA710D3 / T1@SEL$1
   6 - SEL$5DA710D3 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$5DA710D3")
      UNNEST(@"SEL$2")
      OUTLINE(@"SEL$1")
      OUTLINE(@"SEL$2")
      INDEX_FFS(@"SEL$5DA710D3" "T1"@"SEL$2" ("T1"."OBJECT_NAME"))
      INDEX(@"SEL$5DA710D3" "T1"@"SEL$1" ("T1"."OBJECT_NAME"))
      LEADING(@"SEL$5DA710D3" "T1"@"SEL$2" "T1"@"SEL$1")
      USE_NL(@"SEL$5DA710D3" "T1"@"SEL$1")
      NLJ_BATCHING(@"SEL$5DA710D3" "T1"@"SEL$1")
      SEMI_TO_INNER(@"SEL$5DA710D3" "T1"@"SEL$2")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   4 - filter(("OBJECT_NAME" LIKE '%HIST_SQLS%' AND "OBJECT_NAME" IS NOT NULL))
   5 - access("OBJECT_NAME"="OBJECT_NAME")
       filter(("OBJECT_NAME" LIKE '%HIST_SQLS%' AND "OBJECT_NAME" IS NOT NULL))

Query Block Registry:
---------------------

  <q o="2"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>
  <q o="19" f="y" h="y"><n><![CDATA[SEL$5DA710D3]]></n><p><![CDATA[SEL$1]]></p><i><o><t>SQ</t><v><![CDATA[SEL$2]]></v></o></i><f><h><t><![CDATA[
	T1]]></t><s><![CDATA[SEL$1]]></s></h><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>



66 rows selected.

HONG@pdb1>


### 11. 输入不确定的低效sql写法

where (:b1 is null or object_id = :b1) and (:b2 is null or data_object_id = :b2)
建议使用动态，不同条件去执行：全表扫，有条件可以走索引


var b1 number;
exec :b1 := null;
select count(*) from t1 where (:b1 is null or object_id = :b1);

exec :b1 := 99;
select count(*) from t1 where (:b1 is null or object_id = :b1);

select object_name from t1 where :b1 is null 
union all
select object_name from t1 where object_id = :b1;

select count(*) from (
select object_name from t1 where :b1 is null 
union all
select object_name from t1 where object_id = :b1 
);

HONG@pdb1> var b1 number;
HONG@pdb1> exec :b1 := null;
select count(*) from t1 where (:b1 is null or object_id = :b1);

PL/SQL procedure successfully completed.

HONG@pdb1>
  COUNT(*)
----------
     73328

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	dykbrrbbdydu7, child number 0
-------------------------------------
select count(*) from t1 where (:b1 is null or object_id = :b1)

Plan hash value: 2931918674

--------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	      | Name		| Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time	| Buffers | Reads  |
--------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT      | 		|      1 |	  |	  |    52 (100)|	  |	 1 |00:00:00.05 |     191 |    181 |
|   1 |  SORT AGGREGATE       | 		|      1 |	1 |	5 |	       |	  |	 1 |00:00:00.05 |     191 |    181 |
|*  2 |   INDEX FAST FULL SCAN| IDX_OBJECT_ID_0 |      1 |   3666 | 18330 |    52   (2)| 00:00:01 |  73328 |00:00:00.05 |     191 |    181 |
--------------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX_FFS(@"SEL$1" "T1"@"SEL$1" "IDX_OBJECT_ID_0")
      END_OUTLINE_DATA
  */

Peeked Binds (identified by position):
--------------------------------------

   2 - :1 (NUMBER, Primary=1)

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - filter((:B1 IS NULL OR "OBJECT_ID"=:B1))

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



50 rows selected.

HONG@pdb1> exec :b1 := 99;
select count(*) from t1 where (:b1 is null or object_id = :b1);

PL/SQL procedure successfully completed.

HONG@pdb1>
  COUNT(*)
----------
	 1

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	dykbrrbbdydu7, child number 0
-------------------------------------
select count(*) from t1 where (:b1 is null or object_id = :b1)

Plan hash value: 2931918674

-----------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation	      | Name		| Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time	| Buffers |
-----------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT      | 		|      1 |	  |	  |    52 (100)|	  |	 1 |00:00:00.01 |     191 |
|   1 |  SORT AGGREGATE       | 		|      1 |	1 |	5 |	       |	  |	 1 |00:00:00.01 |     191 |
|*  2 |   INDEX FAST FULL SCAN| IDX_OBJECT_ID_0 |      1 |   3666 | 18330 |    52   (2)| 00:00:01 |	 1 |00:00:00.01 |     191 |
-----------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SEL$1 / T1@SEL$1

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SEL$1")
      INDEX_FFS(@"SEL$1" "T1"@"SEL$1" "IDX_OBJECT_ID_0")
      END_OUTLINE_DATA
  */

Peeked Binds (identified by position):
--------------------------------------

   2 - :1 (NUMBER, Primary=1)

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - filter((:B1 IS NULL OR "OBJECT_ID"=:B1))

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$1]]></s></h></f></q>



50 rows selected.

HONG@pdb1>

HONG@pdb1> select count(*) from (
  2  select object_name from t1 where :b1 is null
  3  union all
  4  select object_name from t1 where object_id = :b1
  5  );

  COUNT(*)
----------
	 1

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	4bct3j03p87hj, child number 0
-------------------------------------
select count(*) from ( select object_name from t1 where :b1 is null
union all select object_name from t1 where object_id = :b1 )

Plan hash value: 1049947379

--------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		 | Name 	   | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	 |		   |	  1 |	     |	     |	  53 (100)|	     |	    1 |00:00:00.01 |	   2 |
|   1 |  SORT AGGREGATE 	 |		   |	  1 |	   1 |	     |		  |	     |	    1 |00:00:00.01 |	   2 |
|   2 |   VIEW			 |		   |	  1 |  73329 |	     |	  53   (0)| 00:00:01 |	    1 |00:00:00.01 |	   2 |
|   3 |    UNION-ALL		 |		   |	  1 |	     |	     |		  |	     |	    1 |00:00:00.01 |	   2 |
|*  4 |     FILTER		 |		   |	  1 |	     |	     |		  |	     |	    0 |00:00:00.01 |	   0 |
|   5 |      INDEX FAST FULL SCAN| IDX_OBJECT_ID_0 |	  0 |  73328 |	     |	  51   (0)| 00:00:01 |	    0 |00:00:00.01 |	   0 |
|*  6 |     INDEX RANGE SCAN	 | IDX_OBJECT_ID_0 |	  1 |	   1 |	   5 |	   2   (0)| 00:00:01 |	    1 |00:00:00.01 |	   2 |
--------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SET$1 / from$_subquery$_001@SEL$1
   3 - SET$1
   4 - SEL$2
   5 - SEL$2 / T1@SEL$2
   6 - SEL$3 / T1@SEL$3

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
      OUTLINE_LEAF(@"SET$1")
      OUTLINE_LEAF(@"SEL$1")
      NO_ACCESS(@"SEL$1" "from$_subquery$_001"@"SEL$1")
      INDEX(@"SEL$3" "T1"@"SEL$3" "IDX_OBJECT_ID_0")
      INDEX_FFS(@"SEL$2" "T1"@"SEL$2" "IDX_OBJECT_ID_0")
      END_OUTLINE_DATA
  */

Peeked Binds (identified by position):
--------------------------------------

   2 - :1 (NUMBER, Primary=1)

Predicate Information (identified by operation id):
---------------------------------------------------

   4 - filter(:B1 IS NULL)
   6 - access("OBJECT_ID"=:B1)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SET$1]]></n><f><h><t><![CDATA[NULL_HALIAS]]></t><s><![CDATA[SET$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[from$_subquery$_001]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$3]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$3]]></s></h></f></q>



68 rows selected.

HONG@pdb1> exec :b1 := null;

PL/SQL procedure successfully completed.

HONG@pdb1> select object_name from t1 where :b1 is null
  2  union all
  3  select object_name from t1 where object_id = :b1
  4  );
)
*
ERROR at line 4:
ORA-00933: SQL command not properly ended


HONG@pdb1> select count(*) from (
  2  select object_name from t1 where :b1 is null
  3  union all
  4  select object_name from t1 where object_id = :b1
  5  );

  COUNT(*)
----------
     73328

HONG@pdb1> @xp
HONG@pdb1> set linesize 200 pagesize 999
HONG@pdb1> select * from table(dbms_xplan.display_cursor(null,null,'advanced -PROJECTION iostats,last'));

PLAN_TABLE_OUTPUT
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
SQL_ID	4bct3j03p87hj, child number 0
-------------------------------------
select count(*) from ( select object_name from t1 where :b1 is null
union all select object_name from t1 where object_id = :b1 )

Plan hash value: 1049947379

--------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation		 | Name 	   | Starts | E-Rows |E-Bytes| Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT	 |		   |	  1 |	     |	     |	  53 (100)|	     |	    1 |00:00:00.16 |	 191 |
|   1 |  SORT AGGREGATE 	 |		   |	  1 |	   1 |	     |		  |	     |	    1 |00:00:00.16 |	 191 |
|   2 |   VIEW			 |		   |	  1 |  73329 |	     |	  53   (0)| 00:00:01 |	73328 |00:00:00.15 |	 191 |
|   3 |    UNION-ALL		 |		   |	  1 |	     |	     |		  |	     |	73328 |00:00:00.11 |	 191 |
|*  4 |     FILTER		 |		   |	  1 |	     |	     |		  |	     |	73328 |00:00:00.05 |	 191 |
|   5 |      INDEX FAST FULL SCAN| IDX_OBJECT_ID_0 |	  1 |  73328 |	     |	  51   (0)| 00:00:01 |	73328 |00:00:00.04 |	 191 |
|*  6 |     INDEX RANGE SCAN	 | IDX_OBJECT_ID_0 |	  1 |	   1 |	   5 |	   2   (0)| 00:00:01 |	    0 |00:00:00.01 |	   0 |
--------------------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$1
   2 - SET$1 / from$_subquery$_001@SEL$1
   3 - SET$1
   4 - SEL$2
   5 - SEL$2 / T1@SEL$2
   6 - SEL$3 / T1@SEL$3

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
      OUTLINE_LEAF(@"SET$1")
      OUTLINE_LEAF(@"SEL$1")
      NO_ACCESS(@"SEL$1" "from$_subquery$_001"@"SEL$1")
      INDEX(@"SEL$3" "T1"@"SEL$3" "IDX_OBJECT_ID_0")
      INDEX_FFS(@"SEL$2" "T1"@"SEL$2" "IDX_OBJECT_ID_0")
      END_OUTLINE_DATA
  */

Peeked Binds (identified by position):
--------------------------------------

   2 - :1 (NUMBER, Primary=1)

Predicate Information (identified by operation id):
---------------------------------------------------

   4 - filter(:B1 IS NULL)
   6 - access("OBJECT_ID"=:B1)

Query Block Registry:
---------------------

  <q o="2" f="y"><n><![CDATA[SET$1]]></n><f><h><t><![CDATA[NULL_HALIAS]]></t><s><![CDATA[SET$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$1]]></n><f><h><t><![CDATA[from$_subquery$_001]]></t><s><![CDATA[SEL$1]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$2]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$2]]></s></h></f></q>
  <q o="2" f="y"><n><![CDATA[SEL$3]]></n><f><h><t><![CDATA[T1]]></t><s><![CDATA[SEL$3]]></s></h></f></q>



68 rows selected.

HONG@pdb1>

### 12. 分区表

分区表一般使用分区表字段上的谓词条件做分区裁剪
如果不加分去字段为条件的话，一般创建global index
- 否则需要访问每个local index，分区数越多，效率越差


### update 改写

union all 
不去重

lnnvl(object_name='AUD$') 就是让里面条件 ，不让object_name不等于 'AUD$'

or的改写：

select owner,object_id,object_name from t1 where object_name='AUD$' or object_id=9578;
全表扫：buffer 1430
create index idx_t1_object_name_object_id on t1(object_name,object_id);
select owner,object_id,object_name from t1 where object_name='AUD$' or object_id=9578;
全表扫：buffer 1430
select owner,object_id,object_name from t1 where object_name='AUD$' 
union all
select owner,object_id,object_name from t1 where lnnvl(object_name='AUD$') and object_id=9578;

-------------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                            | Name                         | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                     |                              |      1 |        |   401 (100)|          |      2 |00:00:00.01 |    1434 |
|   1 |  UNION-ALL                           |                              |      1 |        |            |          |      2 |00:00:00.01 |    1434 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| T1                           |      1 |      1 |     4   (0)| 00:00:01 |      1 |00:00:00.01 |       5 |
|*  3 |    INDEX RANGE SCAN                  | IDX_T1_OBJECT_NAME_OBJECT_ID |      1 |      1 |     3   (0)| 00:00:01 |      1 |00:00:00.01 |       4 |
|*  4 |   TABLE ACCESS FULL                  | T1                           |      1 |      1 |   397   (1)| 00:00:01 |      1 |00:00:00.01 |    1429 |
-------------------------------------------------------------------------------------------------------------------------------------------------------

create index idx_t1_object_id on t1(object_id);
create index idx_t1_object_name on t1(object_name);
select owner,object_id,object_name from t1 where object_name='AUD$' or object_id=9578;

-----------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                           | Name               | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads  |
-----------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                    |                    |      1 |        |     5 (100)|          |      2 |00:00:00.01 |       7 |      3 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1                 |      1 |      2 |     5   (0)| 00:00:01 |      2 |00:00:00.01 |       7 |      3 |
|   2 |   BITMAP CONVERSION TO ROWIDS       |                    |      1 |        |            |          |      2 |00:00:00.01 |       5 |      3 |
|   3 |    BITMAP OR                        |                    |      1 |        |            |          |      1 |00:00:00.01 |       5 |      3 |
|   4 |     BITMAP CONVERSION FROM ROWIDS   |                    |      1 |        |            |          |      1 |00:00:00.01 |       3 |      2 |
|*  5 |      INDEX RANGE SCAN               | IDX_T1_OBJECT_NAME |      1 |        |     3   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |      2 |
|   6 |     BITMAP CONVERSION FROM ROWIDS   |                    |      1 |        |            |          |      1 |00:00:00.01 |       2 |      1 |
|*  7 |      INDEX RANGE SCAN               | IDX_T1_OBJECT_ID   |      1 |        |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |      1 |
-----------------------------------------------------------------------------------------------------------------------------------------------------

select owner,object_id,object_name from t1 where object_name='AUD$' or object_id in (9578,9579);

--------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                           | Name               | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                    |                    |      1 |        |     6 (100)|          |      3 |00:00:00.01 |      10 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1                 |      1 |      3 |     6   (0)| 00:00:01 |      3 |00:00:00.01 |      10 |
|   2 |   BITMAP CONVERSION TO ROWIDS       |                    |      1 |        |            |          |      3 |00:00:00.01 |       7 |
|   3 |    BITMAP OR                        |                    |      1 |        |            |          |      1 |00:00:00.01 |       7 |
|   4 |     BITMAP CONVERSION FROM ROWIDS   |                    |      1 |        |            |          |      1 |00:00:00.01 |       3 |
|*  5 |      INDEX RANGE SCAN               | IDX_T1_OBJECT_NAME |      1 |        |     3   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |
|   6 |     BITMAP CONVERSION FROM ROWIDS   |                    |      1 |        |            |          |      1 |00:00:00.01 |       2 |
|*  7 |      INDEX RANGE SCAN               | IDX_T1_OBJECT_ID   |      1 |        |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
|   8 |     BITMAP CONVERSION FROM ROWIDS   |                    |      1 |        |            |          |      1 |00:00:00.01 |       2 |
|*  9 |      INDEX RANGE SCAN               | IDX_T1_OBJECT_ID   |      1 |        |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
--------------------------------------------------------------------------------------------------------------------------------------------

or_expand
12.2 开始支持

https://blogs.oracle.com/optimizer/optimizer-transformations:-or-expansion

There are many reasons for performing OR expansion. It can enable more efficient access paths (index accesses, partition pruning), open up alternative join methods (avoid Cartesian product). Below, we will use examples on SH schema (one of oracle demo schemas) to illustrate each of the aforementioned benefits.


不加hint和加 or_expand hint 区别：
优化器选用 BITMAP CONVERSION
而加了hint会 转为 union all

select owner,object_id,object_name from t1 where object_name='AUD$' or
object_id=9578

Plan hash value: 723908386

--------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                           | Name               | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                    |                    |      1 |        |     5 (100)|          |      2 |00:00:00.01 |       7 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1                 |      1 |      2 |     5   (0)| 00:00:01 |      2 |00:00:00.01 |       7 |
|   2 |   BITMAP CONVERSION TO ROWIDS       |                    |      1 |        |            |          |      2 |00:00:00.01 |       5 |
|   3 |    BITMAP OR                        |                    |      1 |        |            |          |      1 |00:00:00.01 |       5 |
|   4 |     BITMAP CONVERSION FROM ROWIDS   |                    |      1 |        |            |          |      1 |00:00:00.01 |       3 |
|*  5 |      INDEX RANGE SCAN               | IDX_T1_OBJECT_NAME |      1 |        |     3   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |
|   6 |     BITMAP CONVERSION FROM ROWIDS   |                    |      1 |        |            |          |      1 |00:00:00.01 |       2 |
|*  7 |      INDEX RANGE SCAN               | IDX_T1_OBJECT_ID   |      1 |        |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
--------------------------------------------------------------------------------------------------------------------------------------------


select /*+ or_expand */ owner,object_id,object_name from t1 where
object_name='AUD$' or object_id=9578

Plan hash value: 3005316697

----------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                             | Name               | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
----------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                      |                    |      1 |        |     6 (100)|          |      2 |00:00:00.01 |       8 |
|   1 |  VIEW                                 | VW_ORE_BA8ECEFB    |      1 |      2 |     6   (0)| 00:00:01 |      2 |00:00:00.01 |       8 |
|   2 |   UNION-ALL                           |                    |      1 |        |            |          |      2 |00:00:00.01 |       8 |
|   3 |    TABLE ACCESS BY INDEX ROWID BATCHED| T1                 |      1 |      1 |     4   (0)| 00:00:01 |      1 |00:00:00.01 |       5 |
|*  4 |     INDEX RANGE SCAN                  | IDX_T1_OBJECT_NAME |      1 |      1 |     3   (0)| 00:00:01 |      1 |00:00:00.01 |       4 |
|*  5 |    TABLE ACCESS BY INDEX ROWID BATCHED| T1                 |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |
|*  6 |     INDEX RANGE SCAN                  | IDX_T1_OBJECT_ID   |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
----------------------------------------------------------------------------------------------------------------------------------------------
Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SET$2A13AF86   / VW_ORE_BA8ECEFB@SEL$BA8ECEFB
   2 - SET$2A13AF86
   3 - SET$2A13AF86_1 / T1@SET$2A13AF86_1
   4 - SET$2A13AF86_1 / T1@SET$2A13AF86_1
   5 - SET$2A13AF86_2 / T1@SET$2A13AF86_2
   6 - SET$2A13AF86_2 / T1@SET$2A13AF86_2

Outline Data
-------------

  /*+
      BEGIN_OUTLINE_DATA
      IGNORE_OPTIM_EMBEDDED_HINTS
      OPTIMIZER_FEATURES_ENABLE('19.1.0')
      DB_VERSION('19.1.0')
      ALL_ROWS
      OUTLINE_LEAF(@"SET$2A13AF86_2")
      OUTLINE_LEAF(@"SET$2A13AF86_1")
      OUTLINE_LEAF(@"SET$2A13AF86")
      OUTLINE_LEAF(@"SEL$9162BF3C")
      OR_EXPAND(@"SEL$1" (1) (2))
      OUTLINE(@"SEL$1")
      NO_ACCESS(@"SEL$9162BF3C" "VW_ORE_BA8ECEFB"@"SEL$BA8ECEFB")
      INDEX_RS_ASC(@"SET$2A13AF86_1" "T1"@"SET$2A13AF86_1" ("T1"."OBJECT_NAME"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SET$2A13AF86_1" "T1"@"SET$2A13AF86_1")
      INDEX_RS_ASC(@"SET$2A13AF86_2" "T1"@"SET$2A13AF86_2" ("T1"."OBJECT_ID"))
      BATCH_TABLE_ACCESS_BY_ROWID(@"SET$2A13AF86_2" "T1"@"SET$2A13AF86_2")
      END_OUTLINE_DATA
  */


select owner,object_id,object_name,status from t1 where status='INVALID' or object_id=9578;
全表扫 buffer 1430


create index idx_t1_status on t1(status);
create index idx_t1_status_object_id on t1(status,object_id);

select owner,object_id,object_name,status from t1 where status='INVALID' or object_id=9578;
全表扫：（索引信息有了，但因为对表没有收集统计信息，直方图信息也没有）

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |   397 (100)|          |      3 |00:00:00.01 |    1430 |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |      3 |   397   (1)| 00:00:01 |      3 |00:00:00.01 |    1430 |
------------------------------------------------------------------------------------------------------------


select /*+ or_expand */ owner,object_id,object_name,status from t1 where status='INVALID' or object_id=9578;
用hint or展开，但是没有充分利用索引（status索引没用到）-》status 没有直方图统计信息 invalid的数据少，走索引可以减少cost

--------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                             | Name             | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                      |                  |      1 |        |   399 (100)|          |      3 |00:00:00.01 |    1433 |
|   1 |  VIEW                                 | VW_ORE_BA8ECEFB  |      1 |  36698 |   399   (1)| 00:00:01 |      3 |00:00:00.01 |    1433 |
|   2 |   UNION-ALL                           |                  |      1 |        |            |          |      3 |00:00:00.01 |    1433 |
|*  3 |    TABLE ACCESS FULL                  | T1               |      1 |  36697 |   397   (1)| 00:00:01 |      2 |00:00:00.01 |    1430 |
|*  4 |    TABLE ACCESS BY INDEX ROWID BATCHED| T1               |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |
|*  5 |     INDEX RANGE SCAN                  | IDX_T1_OBJECT_ID |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
--------------------------------------------------------------------------------------------------------------------------------------------

强制添加索引和or展开 可以使用到索引
select /*+ index(t1 idx_t1_status) or_expand */ owner,object_id,object_name,status from t1 where status='INVALID' or object_id=9578;

SQL_ID  3ku1k2n33vg5r, child number 0
-------------------------------------
select /*+ index(t1 idx_t1_status) or_expand */
owner,object_id,object_name,status from t1 where status='INVALID' or
object_id=9578

Plan hash value: 4265219706

-----------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                             | Name             | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads  |
-----------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                      |                  |      1 |        |   803 (100)|          |      3 |00:00:00.01 |       8 |      4 |
|   1 |  VIEW                                 | VW_ORE_BA8ECEFB  |      1 |  36698 |   803   (1)| 00:00:01 |      3 |00:00:00.01 |       8 |      4 |
|   2 |   UNION-ALL                           |                  |      1 |        |            |          |      3 |00:00:00.01 |       8 |      4 |
|   3 |    TABLE ACCESS BY INDEX ROWID BATCHED| T1               |      1 |  36697 |   801   (1)| 00:00:01 |      2 |00:00:00.01 |       5 |      4 |
|*  4 |     INDEX RANGE SCAN                  | IDX_T1_STATUS    |      1 |  36697 |    87   (0)| 00:00:01 |      2 |00:00:00.01 |       3 |      4 |
|*  5 |    TABLE ACCESS BY INDEX ROWID BATCHED| T1               |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |      0 |
|*  6 |     INDEX RANGE SCAN                  | IDX_T1_OBJECT_ID |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |      0 |
-----------------------------------------------------------------------------------------------------------------------------------------------------

改写后union all 依旧不走status的索引 因为status索引数据倾斜

select owner,object_id,object_name,status from t1 where status='INVALID'
union all
select owner,object_id,object_name,status from t1 where lnnvl(status='INVALID') and object_id=9578;

SQL_ID  gc2ftjx03jmaf, child number 0
-------------------------------------
select owner,object_id,object_name,status from t1 where
status='INVALID' union all select owner,object_id,object_name,status
from t1 where lnnvl(status='INVALID') and object_id=9578

Plan hash value: 4286410517

-------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                            | Name             | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                     |                  |      1 |        |   399 (100)|          |      3 |00:00:00.01 |    1433 |
|   1 |  UNION-ALL                           |                  |      1 |        |            |          |      3 |00:00:00.01 |    1433 |
|*  2 |   TABLE ACCESS FULL                  | T1               |      1 |  36697 |   397   (1)| 00:00:01 |      2 |00:00:00.01 |    1430 |
|*  3 |   TABLE ACCESS BY INDEX ROWID BATCHED| T1               |      1 |      1 |     2   (0)| 00:00:01 |      1 |00:00:00.01 |       3 |
|*  4 |    INDEX RANGE SCAN                  | IDX_T1_OBJECT_ID |      1 |      1 |     1   (0)| 00:00:01 |      1 |00:00:00.01 |       2 |
-------------------------------------------------------------------------------------------------------------------------------------------


status histogram

Table Columns info:

COLUMN_NAME                      NDV NUL  NUM_NULLS DATA_TYPE  LOW_VAL_25                HIGH_VAL_25               LAST_ANALYZED        HISTOGRAM
------------------------- ---------- --- ---------- ---------- ------------------------- ------------------------- -------------------- ---------
APPLICATION                        1 Y            0 VARCHAR2   4E                        4E                        2021-08-25 11:15:25  NONE
CREATED                          951 Y            0 DATE       7877041101390F            787908190B331A            2021-08-25 11:15:25  NONE
CREATED_APPID                      0 Y        73393 NUMBER                                                         2021-08-25 11:15:25  NONE
CREATED_VSNID                      0 Y        73393 NUMBER                                                         2021-08-25 11:15:25  NONE
DATA_OBJECT_ID                  6656 Y        66700 NUMBER     C103                      C3082F45                  2021-08-25 11:15:25  NONE
DEFAULT_COLLATION                  1 Y        58960 VARCHAR2   5553494E475F4E4C535F434F4 5553494E475F4E4C535F434F4 2021-08-25 11:15:25  NONE
DUPLICATED                         1 Y            0 VARCHAR2   4E                        4E                        2021-08-25 11:15:25  NONE
EDITIONABLE                        2 Y        48132 VARCHAR2   4E                        59                        2021-08-25 11:15:25  NONE
EDITION_NAME                       0 Y        73393 VARCHAR2                                                       2021-08-25 11:15:25  NONE
GENERATED                          2 Y            0 VARCHAR2   4E                        59                        2021-08-25 11:15:25  NONE
LAST_DDL_TIME                   1090 Y            1 DATE       7877041101390F            787908190B331A            2021-08-25 11:15:25  NONE
MODIFIED_APPID                     0 Y        73393 NUMBER                                                         2021-08-25 11:15:25  NONE
MODIFIED_VSNID                     0 Y        73393 NUMBER                                                         2021-08-25 11:15:25  NONE
NAMESPACE                         23 Y            1 NUMBER     C102                      C15E                      2021-08-25 11:15:25  NONE
OBJECT_ID                      73392 Y            1 NUMBER     C103                      C3082F45                  2021-08-25 11:15:25  NONE
OBJECT_NAME                    61240 Y            0 VARCHAR2   41                        73756E2F7574696C2F786D6C2 2021-08-25 11:15:25  NONE
OBJECT_TYPE                       47 Y            0 VARCHAR2   434C5553544552            584D4C20534348454D41      2021-08-25 11:15:25  NONE
ORACLE_MAINTAINED                  2 Y            0 VARCHAR2   4E                        59                        2021-08-25 11:15:25  NONE
OWNER                             33 Y            0 VARCHAR2   415050514F53535953        584442                    2021-08-25 11:15:25  NONE
SECONDARY                          2 Y            0 VARCHAR2   4E                        59                        2021-08-25 11:15:25  NONE
SHARDED                            1 Y            0 VARCHAR2   4E                        4E                        2021-08-25 11:15:25  NONE
SHARING                            4 Y            0 VARCHAR2   44415441204C494E4B        4E4F4E45                  2021-08-25 11:15:25  NONE
STATUS                             2 Y            0 VARCHAR2   494E56414C4944            56414C4944                2021-08-25 11:15:25  NONE
SUBOBJECT_NAME                   472 Y        72192 VARCHAR2   2456534E5F31              5752525F5245504C41595F544 2021-08-25 11:15:25  NONE
TEMPORARY                          2 Y            0 VARCHAR2   4E                        59                        2021-08-25 11:15:25  NONE
TIMESTAMP                       1075 Y            1 VARCHAR2   313939302D30382D32363A313 323032312D30382D32353A313 2021-08-25 11:15:25  NONE

exec dbms_stats.gather_table_stats('hong','t1',cascade=>true,no_invalidate=>false);

收集统计信息：
Table Columns info:

COLUMN_NAME                      NDV NUL  NUM_NULLS DATA_TYPE  LOW_VAL_25                HIGH_VAL_25               LAST_ANALYZED        HISTOGRAM
------------------------- ---------- --- ---------- ---------- ------------------------- ------------------------- -------------------- ---------
APPLICATION                        1 Y            0 VARCHAR2   4E                        4E                        2021-08-25 11:56:13  NONE
CREATED                          951 Y            0 DATE       7877041101390F            787908190B331A            2021-08-25 11:56:13  NONE
CREATED_APPID                      0 Y        73393 NUMBER                                                         2021-08-25 11:56:13  NONE
CREATED_VSNID                      0 Y        73393 NUMBER                                                         2021-08-25 11:56:13  NONE
DATA_OBJECT_ID                  6656 Y        66700 NUMBER     C103                      C3082F45                  2021-08-25 11:56:13  NONE
DEFAULT_COLLATION                  1 Y        58960 VARCHAR2   5553494E475F4E4C535F434F4 5553494E475F4E4C535F434F4 2021-08-25 11:56:13  NONE
DUPLICATED                         1 Y            0 VARCHAR2   4E                        4E                        2021-08-25 11:56:13  NONE
EDITIONABLE                        2 Y        48132 VARCHAR2   4E                        59                        2021-08-25 11:56:13  NONE
EDITION_NAME                       0 Y        73393 VARCHAR2                                                       2021-08-25 11:56:13  NONE
GENERATED                          2 Y            0 VARCHAR2   4E                        59                        2021-08-25 11:56:13  NONE
LAST_DDL_TIME                   1090 Y            1 DATE       7877041101390F            787908190B331A            2021-08-25 11:56:13  NONE
MODIFIED_APPID                     0 Y        73393 NUMBER                                                         2021-08-25 11:56:13  NONE
MODIFIED_VSNID                     0 Y        73393 NUMBER                                                         2021-08-25 11:56:13  NONE
NAMESPACE                         23 Y            1 NUMBER     C102                      C15E                      2021-08-25 11:56:13  NONE
OBJECT_ID                      73392 Y            1 NUMBER     C103                      C3082F45                  2021-08-25 11:56:13  NONE
OBJECT_NAME                    61240 Y            0 VARCHAR2   41                        73756E2F7574696C2F786D6C2 2021-08-25 11:56:13  NONE
OBJECT_TYPE                       47 Y            0 VARCHAR2   434C5553544552            584D4C20534348454D41      2021-08-25 11:56:13  NONE
ORACLE_MAINTAINED                  2 Y            0 VARCHAR2   4E                        59                        2021-08-25 11:56:13  NONE
OWNER                             33 Y            0 VARCHAR2   415050514F53535953        584442                    2021-08-25 11:56:13  NONE
SECONDARY                          2 Y            0 VARCHAR2   4E                        59                        2021-08-25 11:56:13  NONE
SHARDED                            1 Y            0 VARCHAR2   4E                        4E                        2021-08-25 11:56:13  NONE
SHARING                            4 Y            0 VARCHAR2   44415441204C494E4B        4E4F4E45                  2021-08-25 11:56:13  NONE
STATUS                             2 Y            0 VARCHAR2   494E56414C4944            56414C4944                2021-08-25 11:56:13  FREQUENCY
SUBOBJECT_NAME                   472 Y        72192 VARCHAR2   2456534E5F31              5752525F5245504C41595F544 2021-08-25 11:56:13  NONE
TEMPORARY                          2 Y            0 VARCHAR2   4E                        59                        2021-08-25 11:56:13  NONE
TIMESTAMP                       1075 Y            1 VARCHAR2   313939302D30382D32363A313 323032312D30382D32353A313 2021-08-25 11:56:13  NONE

STATUS 有FREQUENCY 直方图信息




INDEX_NAME                     STATUS   VISIBLE  UNI INDEX_TYPE     BLEVEL DEGREE  TEMP TABLESPACE_NAME      INDEX_PART
------------------------------ -------- -------- --- ---------- ---------- ------- ---- -------------------- ----------
IDX_T1_OBJECT_NAME_OBJECT_ID   VALID    YES      NO  NORMAL              2 1       N    USERS                NO
IDX_T1_OBJECT_ID               VALID    YES      NO  NORMAL              1 1       N    USERS                NO
IDX_T1_OBJECT_NAME             VALID    YES      NO  NORMAL              2 1       N    USERS                NO
IDX_T1_STATUS                  VALID    YES      NO  NORMAL              1 1       N    USERS                NO
IDX_T1_STATUS_OBJECT_ID        VALID    YES      NO  NORMAL              1 1       N    USERS                NO


alter index IDX_T1_OBJECT_ID invisible;

select owner,object_id,object_name,status from t1 where
status='INVALID' union all select owner,object_id,object_name,status
from t1 where lnnvl(status='INVALID') and object_id=9578;

--------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                            | Name                    | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                     |                         |      1 |        |     6 (100)|          |      3 |00:00:00.01 |      10 |
|   1 |  UNION-ALL                           |                         |      1 |        |            |          |      3 |00:00:00.01 |      10 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| T1                      |      1 |      2 |     2   (0)| 00:00:01 |      2 |00:00:00.01 |       5 |
|*  3 |    INDEX RANGE SCAN                  | IDX_T1_STATUS           |      1 |      2 |     1   (0)| 00:00:01 |      2 |00:00:00.01 |       3 |
|   4 |   TABLE ACCESS BY INDEX ROWID BATCHED| T1                      |      1 |      1 |     4   (0)| 00:00:01 |      1 |00:00:00.01 |       5 |
|*  5 |    INDEX SKIP SCAN                   | IDX_T1_STATUS_OBJECT_ID |      1 |      1 |     3   (0)| 00:00:01 |      1 |00:00:00.01 |       4 |
--------------------------------------------------------------------------------------------------------------------------------------------------


alter index IDX_T1_STATUS invisible;

select owner,object_id,object_name,status from t1 where
status='INVALID' union all select owner,object_id,object_name,status
from t1 where lnnvl(status='INVALID') and object_id=9578

Plan hash value: 3571077251

--------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                            | Name                    | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                     |                         |      1 |        |     7 (100)|          |      3 |00:00:00.01 |      10 |
|   1 |  UNION-ALL                           |                         |      1 |        |            |          |      3 |00:00:00.01 |      10 |
|   2 |   TABLE ACCESS BY INDEX ROWID BATCHED| T1                      |      1 |      2 |     3   (0)| 00:00:01 |      2 |00:00:00.01 |       5 |
|*  3 |    INDEX RANGE SCAN                  | IDX_T1_STATUS_OBJECT_ID |      1 |      2 |     2   (0)| 00:00:01 |      2 |00:00:00.01 |       3 |
|   4 |   TABLE ACCESS BY INDEX ROWID BATCHED| T1                      |      1 |      1 |     4   (0)| 00:00:01 |      1 |00:00:00.01 |       5 |
|*  5 |    INDEX SKIP SCAN                   | IDX_T1_STATUS_OBJECT_ID |      1 |      1 |     3   (0)| 00:00:01 |      1 |00:00:00.01 |       4 |
--------------------------------------------------------------------------------------------------------------------------------------------------

status的ndv少，都可以使用 IDX_T1_STATUS_OBJECT_ID 的组合索引





