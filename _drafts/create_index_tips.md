

### 大表创建索引的一些建议

```
create index idx_tabname_col1col2col3 on tabname(col1,col2,col3) 
tablespace tbs_name -- 指定表空间
online -- 用online是为了不影响其他dml
parallel 16 -- 大表索引创建用parallel 加速，另外注意，创建之后需要把索引并行消除掉 alter index xxx noparallel;
nologging -- 为了减少redo log的生成，但是如果有db恢复，需要重新rebuild下
invisible ;-- 在不知道此索引是否有效情况下，先invisible，减少现在执行事务是否有影响
```

如果online rebuild索引报错： ORA-08104

或者在online rebuild index时候太久了中断了执行过程，这个时候可能会有残留信息

可以用dbms_repair.online_index_clean来清理


```sql
conn / as sysdba 
declare
isClean boolean; 
begin
 isClean := FALSE;
 while isClean=FALSE loop
 isClean := dbms_repair.online_index_clean(&object_id); dbms_lock.sleep(2);
 end loop; 
exception
when others then 
RAISE;
end;
/
```
如果上面方法不行，可以通过手动唤醒smon重新清理下(sys用户登陆)

```
oradebug wakeup 22
```

示例如下：

```sql
SYS@cdb1> select status,instance_name from v$instance;

STATUS       INSTANCE_NAME
------------ ----------------
OPEN         cdb1

SYS@cdb1> select pid,spid from v$process p,v$bgprocess b where b.paddr=p.addr and name='SMON';

       PID SPID
---------- ------------------------
        22 1833

SYS@cdb1> oradebug wakeup 22
Statement processed.
SYS@cdb1> select status,instance_name from v$instance;

STATUS       INSTANCE_NAME
------------ ----------------
OPEN         cdb1

SYS@cdb1> select pid,spid from v$process p,v$bgprocess b where b.paddr=p.addr and name='SMON';

       PID SPID
---------- ------------------------
        22 1833

SYS@cdb1> 
```

smon每隔一段时间会清理一次IND$基本残留记录，而在实例重启时候也会执行这种清理动作。


### nosegment 用法

创建假想index来评估执行计划是否有在使用创建的index

原理跟STA一个道理

参考步骤：

```sql
create index idx_table_col1col2 on table_name(col1,col2) nosegment;
alter session set "_use_nosegment_indexes"=true;
explain plan for select ....
select * from table(dbms_xplan.display(null,null,'advanced -PROJECTION')); 
```

### like语句 like '%text'

`like '%text'` 的语句怎么走索引？

可以通过结合反转函数和改写sql来让这sql走索引

```sql
HONG@pdb1> create table t1 as select * from dba_objects;
Table created.
HONG@pdb1> exec dbms_stats.gather_table_stats('HONG','T1',cascade=>true,no_invalidate=>false);
PL/SQL procedure successfully completed.
HONG@pdb1> @colfmt
COL "OWNER"                          FOR A6
COL "OBJECT_NAME"                    FOR A30
HONG@pdb1> set pagesize 100
HONG@pdb1> set linesize 300
HONG@pdb1> select owner,object_name from t1 where object_name like '%T1';

OWNER  OBJECT_NAME
------ ------------------------------
SYS    I_PDB_ALERT1
SYS    I_UNDOHIST1
SYS    I_PDBSTAT1
SYS    I_ARGUMENT1
SYS    I_STATS_TARGET1
SYS    I_RESULT1
SYS    I_SCHEDULER_JOB_ARGUMENT1
SYS    I_SCHEDULER_PROGRAM_ARGUMENT1
SYS    I_SCHEDULER_CONST_STAT1
SYS    V_$DIAG_V_IPSPRBCNT1
PUBLIC V$DIAG_V_IPSPRBCNT1
SYS    V_$DIAG_VPROBLEM_BUCKET1
PUBLIC V$DIAG_VPROBLEM_BUCKET1
SYS    I_STREAMS_APPLY_SPILL_MSGS_PT1
SYS    I_STREAMS_APPLY_SPILL_MSGS_PT1

15 rows selected.
HONG@pdb1> 
```

这个即使有下面索引,sql 也不会走索引。用hint强制走索引，会IFS，再回表过滤。(因为要回表，所以不能IFFS，不能多块读)
```
create index idx_t1_object_name_01 on t1(object_name);
```

```
SQL_ID  3vgvdawr4g1hh, child number 3
-------------------------------------
select owner,object_name from t1 where object_name like '%T1'

Plan hash value: 3617692013

------------------------------------------------------------------------------------------------------------
| Id  | Operation         | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT  |      |      1 |        |   395 (100)|          |     15 |00:00:00.01 |    1423 |
|*  1 |  TABLE ACCESS FULL| T1   |      1 |   3653 |   395   (1)| 00:00:01 |     15 |00:00:00.01 |    1423 |
------------------------------------------------------------------------------------------------------------

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

   1 - filter(("OBJECT_NAME" LIKE '%T1' AND "OBJECT_NAME" IS NOT NULL))
```

下面反转函数索引加上改写sql写法

```sql
create index idx_t1_object_name02 on t1(reverse(object_name));
var str1 varchar2(30);
exec :str1 := 'T1';
select owner,object_name from t1 where reverse(object_name) like reverse('%'||:str1);
```

这个时候sql会走索引范围扫IRS，也不想之前HINT的IFS的索引全扫描。


```
SQL_ID  6hgz50k1b4xvb, child number 0
-------------------------------------
select owner,object_name from t1 where reverse(object_name) like
reverse('%'||:str1)

Plan hash value: 670785370

-------------------------------------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                           | Name                 | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers | Reads  |
-------------------------------------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT                    |                      |      1 |        |   393 (100)|          |     15 |00:00:00.01 |      16 |      7 |
|   1 |  TABLE ACCESS BY INDEX ROWID BATCHED| T1                   |      1 |   3653 |   393   (0)| 00:00:01 |     15 |00:00:00.01 |      16 |      7 |
|*  2 |   INDEX RANGE SCAN                  | IDX_T1_OBJECT_NAME02 |      1 |    657 |     7   (0)| 00:00:01 |     15 |00:00:00.01 |       4 |      7 |
-------------------------------------------------------------------------------------------------------------------------------------------------------

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
      INDEX_RS_ASC(@"SEL$1" "T1"@"SEL$1" "IDX_T1_OBJECT_NAME02")
      BATCH_TABLE_ACCESS_BY_ROWID(@"SEL$1" "T1"@"SEL$1")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access("T1"."SYS_NC00027$" LIKE REVERSE('%'||:STR1))
       filter("T1"."SYS_NC00027$" LIKE REVERSE('%'||:STR1))
```

### like语句 like '%text%'

select owner,object_name from t1 where object_name like '%SEQ%';

这种情况，强制用hint让走索引的话，也是Index full scan（单块读），不能Index fast full scan（多块读）

变通方法是空间换效率，并且不要走hash join，走NL

```
create table index_t1 as select object_name,rowid rid from t1;
select /*+ use_nl(index_t1@qb_t1,t1) leading(index_t1@qb_t1) */ owner,object_name from t1 where rowid in (select /*+ qb_name(qb_t1) */ rid from index_t1 where object_name like '%SEQ%');
```
这种走NL
```
SQL_ID  9bqyc5ngzzpqp, child number 1
-------------------------------------
select owner,object_name from t1 where rowid in (select rid from
index_t1 where object_name like '%SEQ%')

Plan hash value: 2682349073

--------------------------------------------------------------------------------------------------------------------------
| Id  | Operation                   | Name     | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT            |          |      1 |        |   308 (100)|          |    323 |00:00:00.05 |     634 |
|   1 |  NESTED LOOPS               |          |      1 |    323 |   308   (1)| 00:00:01 |    323 |00:00:00.05 |     634 |
|   2 |   SORT UNIQUE               |          |      1 |    323 |   145   (1)| 00:00:01 |    323 |00:00:00.02 |     512 |
|*  3 |    TABLE ACCESS FULL        | INDEX_T1 |      1 |    323 |   145   (1)| 00:00:01 |    323 |00:00:00.02 |     512 |
|   4 |   TABLE ACCESS BY USER ROWID| T1       |    323 |      1 |     1   (0)| 00:00:01 |    323 |00:00:00.03 |     122 |
--------------------------------------------------------------------------------------------------------------------------

Query Block Name / Object Alias (identified by operation id):
-------------------------------------------------------------

   1 - SEL$5DA710D3
   3 - SEL$5DA710D3 / INDEX_T1@SEL$2
   4 - SEL$5DA710D3 / T1@SEL$1

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
      FULL(@"SEL$5DA710D3" "INDEX_T1"@"SEL$2")
      ROWID(@"SEL$5DA710D3" "T1"@"SEL$1")
      LEADING(@"SEL$5DA710D3" "INDEX_T1"@"SEL$2" "T1"@"SEL$1")
      USE_NL(@"SEL$5DA710D3" "T1"@"SEL$1")
      SEMI_TO_INNER(@"SEL$5DA710D3" "INDEX_T1"@"SEL$2")
      END_OUTLINE_DATA
  */

Predicate Information (identified by operation id):
---------------------------------------------------

   3 - filter(("OBJECT_NAME" LIKE '%SEQ%' AND "OBJECT_NAME" IS NOT NULL))
```

上面方法改写稍微复杂，如果t1数据变化大，还得构造物化视图on commit来刷新新数据量。

另外一个思路就是把全表扫改为索引全扫描，利用索引大小一般小于表大小的情况

之前我们在 object_name 上已经创建了index: `create index idx_t1_object_name_01 on t1(object_name);`

这种情况，返回的结果集和要少。如果结果集太大，需要rownum<=n来限制过滤

```
select owner,object_name from t1 where object_name like '%SEQ%';
改写成：
select owner,object_name from t1 where object_name in (select /*+ cardinality(t1 10) */ object_name from t1 where object_name like '%SEQ%');
```

### 稀疏索引

update/delete较多，导致稀疏索引

rebuild索引时候会lock table速度较快

rebuild online需要等待（dml完成后才开始），速度较慢

### impdp时候注意点

impdp时候为了提高速度往往通过并行操作
但有些大表需要特殊注意下：最好不要把constrain/indexes一起impdp，加上：constraints=n indexes=n
这是为了避免impdp时候自动变成串行创建主键索引了

导完数据可以：
```
create unique index xxx ... parallel 16 nologging;
alter index xxx noparallel;
alter table tab_name add constraint ... primary key(xxxx) using index xxxx novalidate; -- novalidate需要加上，避免全表串行单块读
```





