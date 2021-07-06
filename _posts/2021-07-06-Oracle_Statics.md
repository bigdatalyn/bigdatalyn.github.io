---
layout: post
title: "Oracle Index - Statics Tips"
category: Oracle
tags: Oracle Index Tips
---

* content
{:toc}

Oracle Index - Statics Tips



### 统计信息

一般关闭自带JOB收集统计信息，自定义收集统计信息

OLAP一般不用job去收集统计信息（数量太大，消耗大量IO和CPU资源），一般用HINT去固定执行计划

[Part V Optimizer Statistics
](https://docs.oracle.com/en/database/oracle/oracle-database/19/tgsql/optimizer-statistics.html#GUID-0A2F3D52-A135-43E1-9CAB-55BFE068A297)


Optimizer statistics include the following:

- Table statistics
```
Number of rows
Number of blocks
Average row length
```
- Column statistics
```
Number of distinct values (NDV) in a column
Number of nulls in a column
Data distribution (histogram)
Extended statistics
```
- Index statistics
```
Number of leaf blocks
Number of levels
Index clustering factor
```
- System statistics
```
I/O performance and utilization
CPU performance and utilization
```


dbms_stats包可以收集schema/table/index/temporarytable(从12c开始支持)

具体参数说明：
[Table 169-59 GATHER_TABLE_STATS Procedure Parameters](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/DBMS_STATS.html#GUID-CA6A56B9-0540-45E9-B1D7-D78769B7714C)


常用参数:
estimate_percent：采样率百分比 大表可以设置为30%等，系统强悍无所谓，默认值即可（也可以用 dbms_stats.AUTO_SAMPLE_SIZE）

method_opt:收集直方图方法，如果是稳定系统收集统计信息推荐使用repeat方式。
repeat表示以前收集过直方图，现在收集统计信息时候就收集统计信息；如果以前没有收集过直方图信息，现在统计信息收集时候就不收集直方图信息。

auto表示通过谓词过滤条件信息来自动判断是否收集统计信息
```sql
METHOD_OPT => 'FOR ALL COLUMNS SIZE REPEAT'
```

数据倾斜收集直方图信息例子：

```sql
BEGIN
  DBMS_STATS.GATHER_TABLE_STATS( 'sh','customers',
  METHOD_OPT => 'FOR ALL COLUMNS SIZE SKEWONLY ' ||
                'FOR COLUMNS SIZE SKEWONLY (cust_state_province,country_id)' );
END;
/
```

degree: 并行度，根据cpu资源

cascade：表示收集表的统计信息时候同时收集索引信息

no_invalidate: 表示收集统计信息之后共享池中的相关SQL游标是否失效。设置为false表示立即失效。

表信息和列信息：

```sql
Table Statistics history:

TABLE_NAME           OWNER           VERSION SAVTIME              ANALYZETI     ROWCNT SAMPLESIZE       PERC     BLKCNT     AVGRLN                                                                                                                        
-------------------- --------------- ------- -------------------- --------- ---------- ---------- ---------- ---------- ----------                                                                                                                        
SALES                SH              CURRENT                      21-MAY-18     918843     918843        100       1876         29                                              

Table Columns info:

COLUMN_NAME                      NDV NUL  NUM_NULLS DATA_TYPE  LOW_VAL_25                HIGH_VAL_25               LAST_ANALYZED        HISTOGRAM                                   
------------------------- ---------- --- ---------- ---------- ------------------------- ------------------------- -------------------- ---------                                   
AMOUNT_SOLD                     3586 N            0 NUMBER     C10729                    C2125349                  2018-05-21 18:00:55  NONE                                        
CHANNEL_ID                         4 N            0 NUMBER     C103                      C10A                      2018-05-21 18:00:55  NONE                                        
CUST_ID                         7059 N            0 NUMBER     C103                      C30B0B                    2018-05-21 18:00:55  NONE                                        
PROD_ID                           72 N            0 NUMBER     C10E                      C20231                    2018-05-21 18:00:55  FREQUENCY                                   
PROMO_ID                           4 N            0 NUMBER     C122                      C20A64                    2018-05-21 18:00:55  NONE                                        
QUANTITY_SOLD                      1 N            0 NUMBER     C102                      C102                      2018-05-21 18:00:55  NONE                                        
TIME_ID                         1460 N            0 DATE       77C60101010101            78650C1F010101            2018-05-21 18:00:55  NONE    
```

method_opt如果是`FOR COLUMNS SIZE SKEWONLY`不管where条件是否有对应列都收集直方图信息，有点浪费cpu资源，而且也可能导致绑定变量窥探

method_opt如果是`FOR COLUMNS SIZE AUTO`的话，只要执行过sql，出现在where条件的列才收集直方图


[FLUSH_DATABASE_MONITORING_INFO Procedure](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/DBMS_STATS.html#GUID-CA79C291-B7B4-4B35-8507-454366D83A03)

The database immediately updates corresponding entries in the *_TAB_MODIFICATIONS, *_TAB_STATISTICS and *_IND_STATISTICS views.

测试case：
```sql
create table test01 as select * from dba_objects;
column table_name format a20
column index_name format a20
select table_name, num_rows, blocks, avg_row_len, to_char(last_analyzed, 'YYYY/MM/DD HH24:MI:SS'), stattype_locked, stale_stats from dba_tab_statistics where table_name = 'TEST01';


CTAS: 加载数据时候会自动收集统计信息：

TABLE_NAME             NUM_ROWS     BLOCKS AVG_ROW_LEN TO_CHAR(LAST_ANALYZ STATT STA
-------------------- ---------- ---------- ----------- ------------------- ----- ---
TEST01                    91857       1576         115 2021/07/06 22:07:26       NO

exec dbms_stats.flush_database_monitoring_info; -- 保存现有统计信息
select count(*) from test01;
delete from test01 where rownum <= 91857*0.11;


LYN@DB01> select count(*) from test01;

  COUNT(*)
----------
     91857

LYN@DB01> delete from test01 where rownum <= 91857*0.11;

10104 rows deleted.

LYN@DB01> 

删除了11%的数据量，统计信息依旧,但stale_stats是YES表示失效了

select table_name, num_rows, blocks, avg_row_len, to_char(last_analyzed, 'YYYY/MM/DD HH24:MI:SS'), stattype_locked, stale_stats from dba_tab_statistics where table_name = 'TEST01';


TABLE_NAME             NUM_ROWS     BLOCKS AVG_ROW_LEN TO_CHAR(LAST_ANALYZ STATT STA
-------------------- ---------- ---------- ----------- ------------------- ----- ---
TEST01                    91857       1576         115 2021/07/06 22:07:26       YES

```
检查哪些对象是没有收集统计信息或者哪些对象统计信息失效一般通过下面条件来过滤和判断

超过10%以上收据有变更就表示失效

```sql
(stale_stats='YES' or last_analyzed is null)
```

查看全部对象的统计信息情况：

```sql
column table_name format a30
column owner format a20
SELECT OWNER,TABLE_NAME,OBJECT_TYPE,STALE_STATS,LAST_ANALYZED 
FROM DBA_TAB_STATISTICS 
WHERE (STALE_STATS='YES' OR LAST_ANALYZED IS NULL)
AND OWNER NOT IN 
('SYS', 'SYSTEM', 'SYSMAN', 'DMSYS', 'OLAPSYS', 'XDB','EXFSYS', 'CTXSYS','WMSYS', 'DBSNMP', 'ORDSYS', 'OUTLN', 'TSMSYS', 'MDSYS') AND TABLE_NAME NOT LIKE 'BIN%';
```

除了stale_stats和last_analyzed，还需要关注统计信息收集的采样率：ROWCNT/SAMPLESIZE/PERC

另外一个知识点：

stattype_locked ： all表示对象统计信息锁住了。

```sql
select table_name from user_tab_statistics where stattype_locked is not null；
exec dbms_stats.unlock_table_stats('user_name','table_name');
->更新统计信息之后再锁住
exec dbms_stats.lock_table_stats('user_name','table_name');
```

另外一个知识点：

Oracle 11g 增加了系统信息的备份和恢复功能,分别是在系统级别,用户级别,表级别
当我们对oracle 系统对象进行统计信息收集时,为了防止新的统计信息之后的执行计划不如之前的，我们可以利用下面package进行导入导出：
```sql
dbms_stats.export_(database/schema/table)_stats --导出统计信息到创建的表中

dbms_stats.import_(database/schema/table)_stats --导入统计信息到系统中

-- 数据库的统计信息备份恢复（只能是sys用户下）
exec dbms_stats.create_stat_table('sys','stat_sys_tab');
exec dbms_stats.export_database_stats('stat_sys_tab');
exec dbms_stats.import_database_stats('stat_sys_tab');

-- schema的统计信息备份恢复（只能在方案schema的用户下，user01为用户名）
exec dbms_stats.create_stat_table('user01','stat_user01_tab');
exec dbms_stats.export_schema_stats('user01','stat_user01_tab');
exec dbms_stats.import_schema_stats('user01','stat_user01_tab');

-- 表的统计信息备份恢复（只能在表的用户下） TEST1表
exec dbms_stats.create_stat_table('user01','stat_user01_tab');
exec dbms_stats.export_table_stats('user01','TEST1',null,'stat_user01_tab');
exec dbms_stats.import_table_stats('user01','TEST1',null,'stat_user01_tab');

```
网上相关脚本：

[DBA任务---确保统计信息准确性]

[sosi.txt](http://blog.itpub.net/267265/viewspace-2738848/)

脚本：sosi.sql

@sosi schema_name table_name

```sql
set echo off
set scan on
set lines 277
set pages 9999
set verify off
set feedback off
set termout off
column uservar new_value Table_Owner noprint
select user uservar from dual;
set termout on
--column TABLE_NAME heading "Tables owned by &Table_Owner" format a30
--select table_name from dba_tables where owner=upper('&Table_Owner') order by 1;

undefine table_name
undefine owner
--accept owner prompt 'Please enter Name of Table Owner (Null = &Table_Owner): '
--accept table_name  prompt 'Please enter Table Name to show Statistics for: '
set termout off
column uservar1 new_value Owner noprint
column uservar2 new_value Table_name noprint
select '&1' uservar1 , '&2' uservar2 from dual;
set termout on
set newp 0

column TABLE_NAME heading "Table|Name" format a15
column PARTITION_NAME heading "Partition|Name" format a15
column SUBPARTITION_NAME heading "SubPartition|Name" format a15
column NUM_ROWS heading "Number|of Rows" format 9,999,999,990
column BLOCKS heading "Blocks" format 999,999,990
column EMPTY_BLOCKS heading "Empty|Blocks" format 999,999,990

column AVG_SPACE heading "Average|Space" format 999,990
column CHAIN_CNT heading "Chain|Count" format 999,990
column AVG_ROW_LEN heading "Average|Row Len" format 999,990
column COLUMN_NAME  heading "Column|Name" format a25
column NULLABLE heading Null|able format a4
column NUM_DISTINCT heading "Distinct|Values" format 999,999,990
column NUM_NULLS heading "Number|Nulls" format 9,999,990
column NUM_BUCKETS heading "Number|Buckets" format 990
column DENSITY heading "Density" format 0.09999999
column INDEX_NAME heading "Index|Name" format a25
column UNIQUENESS heading "Unique" format a9
column BLEV heading "B|Tree|Level" format 90
column LEAF_BLOCKS heading "Leaf|Blks" format 99000
column DISTINCT_KEYS heading "Distinct|Keys" format 9,999,999,990
column AVG_LEAF_BLOCKS_PER_KEY heading "Average|Leaf Blocks|Per Key" format 99,990
column AVG_DATA_BLOCKS_PER_KEY heading "Average|Data Blocks|Per Key" format 99,990
column CLUSTERING_FACTOR heading "Cluster|Factor" format 999,999,990
column COLUMN_POSITION heading "Col|Pos" format 990
column col heading "Column|Details" format a24
column COLUMN_LENGTH heading "Col|Len" format 9,990
column GLOBAL_STATS heading "Global|Stats" format a6
column USER_STATS heading "User|Stats" format a6
column SAMPLE_SIZE heading "Sample|Size" format 9,999,999,990
--column to_char(t.last_analyzed,'YYYY-MM-DD') heading "Last_Analyzed|MM-DD-YYYY" format a10
--column to_char(t.last_analyzed,'YYYY-MM-DD HH24:MI:SS') heading "Last_Analyzed|YYYY-MM-DD" format a20
--column LAST_ANALYZED heading "Last_Analyzed|YYYY-MM-DD" format a20

prompt
prompt ******************************************
prompt Table Level  Parameter: schema tablename
prompt ******************************************
prompt
select
    TABLE_NAME,
    NUM_ROWS,
    BLOCKS,
    EMPTY_BLOCKS,
    AVG_SPACE,
    CHAIN_CNT,
    AVG_ROW_LEN,
    GLOBAL_STATS,
    USER_STATS,
    SAMPLE_SIZE,
        t.last_analyzed
--    to_char(t.last_analyzed,'YYYY-MM-DD HH24:MI:SS')
from dba_tables t
where
    owner = upper(nvl('&&Owner',user))
and table_name = upper('&&Table_name')
/
prompt
select
    COLUMN_NAME,
    decode(t.DATA_TYPE,
           'NUMBER',t.DATA_TYPE||'('||
           decode(t.DATA_PRECISION,
                  null,t.DATA_LENGTH||')',
                  t.DATA_PRECISION||','||t.DATA_SCALE||')'),
                  'DATE',t.DATA_TYPE,
                  'LONG',t.DATA_TYPE,
                  'LONG RAW',t.DATA_TYPE,
                  'ROWID',t.DATA_TYPE,
                  'MLSLABEL',t.DATA_TYPE,
                  t.DATA_TYPE||'('||t.DATA_LENGTH||')') ||' '||
    decode(t.nullable,
              'N','NOT NULL',
              'n','NOT NULL',
              NULL) col,
    NUM_DISTINCT,
    DENSITY,
    NUM_BUCKETS,
    NUM_NULLS,
    GLOBAL_STATS,
    USER_STATS,
    SAMPLE_SIZE,
        t.last_analyzed,
        HISTOGRAM
--    to_char(t.last_analyzed,'YYYY-MM-DD HH24:MI:SS')
from dba_tab_columns t
where
    table_name = upper('&Table_name')
and owner = upper(nvl('&Owner',user))
/

prompt

select
    INDEX_NAME,
    UNIQUENESS,
    BLEVEL BLev,
    LEAF_BLOCKS,
    DISTINCT_KEYS,
    NUM_ROWS,
    AVG_LEAF_BLOCKS_PER_KEY,
    AVG_DATA_BLOCKS_PER_KEY,
    CLUSTERING_FACTOR,
    GLOBAL_STATS,
    USER_STATS,
    SAMPLE_SIZE,
        t.last_analyzed
    --to_char(t.last_analyzed,'YYYY-MM-DD HH24:MI:SS')
from
    dba_indexes t
where
    table_name = upper('&Table_name')
and table_owner = upper(nvl('&Owner',user))
/
prompt
break on index_name
select
    i.INDEX_NAME,
    i.COLUMN_NAME,
    i.COLUMN_POSITION,
    decode(t.DATA_TYPE,
           'NUMBER',t.DATA_TYPE||'('||
           decode(t.DATA_PRECISION,
                  null,t.DATA_LENGTH||')',
                  t.DATA_PRECISION||','||t.DATA_SCALE||')'),
                  'DATE',t.DATA_TYPE,
                  'LONG',t.DATA_TYPE,
                  'LONG RAW',t.DATA_TYPE,
                  'ROWID',t.DATA_TYPE,
                  'MLSLABEL',t.DATA_TYPE,
                  t.DATA_TYPE||'('||t.DATA_LENGTH||')') ||' '||
           decode(t.nullable,
                  'N','NOT NULL',
                  'n','NOT NULL',
                  NULL) col
from
    dba_ind_columns i,
    dba_tab_columns t
where
    i.table_name = upper('&Table_name')
and owner = upper(nvl('&Owner',user))
and i.table_owner=t.owner
and i.table_name = t.table_name
and i.column_name = t.column_name
order by index_name,column_position
/

prompt
prompt ***************
prompt Partition Level
prompt ***************

select
    PARTITION_NAME,
    NUM_ROWS,
    BLOCKS,
    EMPTY_BLOCKS,
    AVG_SPACE,
    CHAIN_CNT,
    AVG_ROW_LEN,
    GLOBAL_STATS,
    USER_STATS,
    SAMPLE_SIZE,
        t.last_analyzed
    --to_char(t.last_analyzed,'MM-DD-YYYY')
from
    dba_tab_partitions t
where
    table_owner = upper(nvl('&&Owner',user))
and table_name = upper('&&Table_name')
order by partition_position
/


break on partition_name
select
    PARTITION_NAME,
    COLUMN_NAME,
    NUM_DISTINCT,
    DENSITY,
    NUM_BUCKETS,
    NUM_NULLS,
    GLOBAL_STATS,
    USER_STATS,
    SAMPLE_SIZE,
        t.last_analyzed
    --to_char(t.last_analyzed,'MM-DD-YYYY')
from
    dba_PART_COL_STATISTICS t
where
    table_name = upper('&Table_name')
and owner = upper(nvl('&Owner',user))
/

break on partition_name
select
    t.INDEX_NAME,
    t.PARTITION_NAME,
    t.BLEVEL BLev,
    t.LEAF_BLOCKS,
    t.DISTINCT_KEYS,
    t.NUM_ROWS,
    t.AVG_LEAF_BLOCKS_PER_KEY,
    t.AVG_DATA_BLOCKS_PER_KEY,
    t.CLUSTERING_FACTOR,
    t.GLOBAL_STATS,
    t.USER_STATS,
    t.SAMPLE_SIZE,
        t.last_analyzed
    --to_char(t.last_analyzed,'YYYY-MM-DD HH24:MI:SS')
from
    dba_ind_partitions t,
    dba_indexes i
where
    i.table_name = upper('&Table_name')
and i.table_owner = upper(nvl('&Owner',user))
and i.owner = t.index_owner
and i.index_name=t.index_name
/


prompt
prompt ***************
prompt SubPartition Level
prompt ***************

select
    PARTITION_NAME,
    SUBPARTITION_NAME,
    NUM_ROWS,
    BLOCKS,
    EMPTY_BLOCKS,
    AVG_SPACE,
    CHAIN_CNT,
    AVG_ROW_LEN,
    GLOBAL_STATS,
    USER_STATS,
    SAMPLE_SIZE,
        t.last_analyzed
    --to_char(t.last_analyzed,'YYYY-MM-DD HH24:MI:SS')
from
    dba_tab_subpartitions t
where
    table_owner = upper(nvl('&&Owner',user))
and table_name = upper('&&Table_name')
order by SUBPARTITION_POSITION
/
break on partition_name
select
    p.PARTITION_NAME,
    t.SUBPARTITION_NAME,
    t.COLUMN_NAME,
    t.NUM_DISTINCT,
    t.DENSITY,
    t.NUM_BUCKETS,
    t.NUM_NULLS,
    t.GLOBAL_STATS,
    t.USER_STATS,
    t.SAMPLE_SIZE,
        t.last_analyzed
    --to_char(t.last_analyzed,'YYYY-MM-DD HH24:MI:SS')
from
    dba_SUBPART_COL_STATISTICS t,
    dba_tab_subpartitions p
where
    t.table_name = upper('&Table_name')
and t.owner = upper(nvl('&Owner',user))
and t.subpartition_name = p.subpartition_name
and t.owner = p.table_owner
and t.table_name=p.table_name
/

break on partition_name
select
    t.INDEX_NAME,
    t.PARTITION_NAME,
    t.SUBPARTITION_NAME,
    t.BLEVEL BLev,
    t.LEAF_BLOCKS,
    t.DISTINCT_KEYS,
    t.NUM_ROWS,
    t.AVG_LEAF_BLOCKS_PER_KEY,
    t.AVG_DATA_BLOCKS_PER_KEY,
    t.CLUSTERING_FACTOR,
    t.GLOBAL_STATS,
    t.USER_STATS,
    t.SAMPLE_SIZE,
        t.last_analyzed
    --to_char(t.last_analyzed,'YYYY-MM-DD HH24:MI:SS')
from
    dba_ind_subpartitions t,
    dba_indexes i
where
    i.table_name = upper('&Table_name')
and i.table_owner = upper(nvl('&Owner',user))
and i.owner = t.index_owner
and i.index_name=t.index_name
/

prompt
clear breaks
set echo off
```


Have a good work&life! 2021/07 via LinHong
