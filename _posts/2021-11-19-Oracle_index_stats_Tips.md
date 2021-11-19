---
layout: post
title: "Oracle 19c index stats[ORA-20005] Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle 19c index stats[ORA-20005] Tips

Need to pay attention to the lock status of table statistics.

Better to use `create index ... online compute statistics` to gather index statistics.


### Test senarios.

```sql
-- Create test table t2021
SYS@pdb1> create table t2021 as select * from dba_objects;

Table created.

SYS@pdb1>
-- The statistics is NOT updated.
SYS@pdb1> col owner for a15
SYS@pdb1> col table_name for a20
SYS@pdb1> col partition_name for a25
SYS@pdb1> set linesize 300
SYS@pdb1> select owner,table_name,partition_name,num_rows,blocks,stale_stats,stattype_locked,last_analyzed from dba_tab_statistics where table_name = upper('t2021');

OWNER		TABLE_NAME	     PARTITION_NAME		 NUM_ROWS     BLOCKS STALE_S STATT LAST_ANAL
--------------- -------------------- ------------------------- ---------- ---------- ------- ----- ---------
SYS		T2021

SYS@pdb1>
-- Gather table stats
SYS@pdb1> exec dbms_stats.gather_table_stats(NULL,'T2021');

PL/SQL procedure successfully completed.

SYS@pdb1> alter session set nls_date_format='yyyy/mm/dd hh24:mi:ss';

Session altered.

SYS@pdb1> select owner,table_name,partition_name,num_rows,blocks,stale_stats,stattype_locked,last_analyzed from dba_tab_statistics where table_name = upper('t2021');

OWNER		TABLE_NAME	     PARTITION_NAME		 NUM_ROWS     BLOCKS STALE_S STATT LAST_ANALYZED
--------------- -------------------- ------------------------- ---------- ---------- ------- ----- -------------------
SYS		T2021						    73500	1425 NO 	   2021/11/19 09:42:44

SYS@pdb1>
-- Lock table's stats
SYS@pdb1> exec dbms_stats.lock_table_stats(NULL, 'T2021');

PL/SQL procedure successfully completed.

SYS@pdb1> select owner,table_name,partition_name,num_rows,blocks,stale_stats,stattype_locked,last_analyzed from dba_tab_statistics where table_name = upper('t2021');

OWNER		TABLE_NAME	     PARTITION_NAME		 NUM_ROWS     BLOCKS STALE_S STATT LAST_ANALYZED
--------------- -------------------- ------------------------- ---------- ---------- ------- ----- -------------------
SYS		T2021						    73500	1425 NO      ALL   2021/11/19 09:42:44

SYS@pdb1>
-- Test create index on t2021 table and the index stats will not gathered auto.
SYS@pdb1> create index idx_t2021_object_id on t2021(object_id,0) online;

Index created.

SYS@pdb1>

SYS@pdb1> col index_name for a20
SYS@pdb1> select owner,index_name,table_name,partition_name,num_rows,blevel,leaf_blocks,clustering_factor,stale_stats,stattype_locked,last_analyzed from dba_ind_statistics where table_name= upper('t2021');

OWNER		INDEX_NAME	     TABLE_NAME 	  PARTITION_NAME	      NUM_ROWS	   BLEVEL LEAF_BLOCKS CLUSTERING_FACTOR STA STATT LAST_ANALYZED
--------------- -------------------- -------------------- ------------------------- ---------- ---------- ----------- ----------------- --- ----- -------------------
SYS		IDX_T2021_OBJECT_ID  T2021												    ALL

SYS@pdb1>

SYS@pdb1> exec dbms_stats.gather_index_stats(NULL,'IDX_T2021_OBJECT_ID');
BEGIN dbms_stats.gather_index_stats(NULL,'IDX_T2021_OBJECT_ID'); END;

*
ERROR at line 1:
ORA-20005: object statistics are locked (stattype = ALL)
ORA-06512: at "SYS.DBMS_STATS", line 30110
ORA-06512: at "SYS.DBMS_STATS", line 30024
ORA-06512: at "SYS.DBMS_STATS", line 30001
ORA-06512: at "SYS.DBMS_STATS", line 9393
ORA-06512: at "SYS.DBMS_STATS", line 10317
ORA-06512: at "SYS.DBMS_STATS", line 29312
ORA-06512: at "SYS.DBMS_STATS", line 30097
ORA-06512: at line 1


SYS@pdb1>

-- if the table stats is locked, create index with online will not show error msg.
-- if the table stats is locked, create index with online and compute statistics will show error msg. 
SYS@pdb1> create index idx_t2021_object_name on t2021(object_name) online compute statistics;
create index idx_t2021_object_name on t2021(object_name) online compute statistics
                                      *
ERROR at line 1:
ORA-38029: object statistics are locked


SYS@pdb1>
```


### Reference

[PL/SQL Packages and Types Reference / 170 DBMS_STATS](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/DBMS_STATS.html)

Have a good work&life! 2021/11 via LinHong

