---
layout: post
title: "Oracle 19c OPT_PARAM Hint Tips"
category: Oracle
tags: Oracle sqldeveloper Tips
---

* content
{:toc}

Oracle 19c OPT_PARAM Hint Tips







### OPT_PARAM

"OPT_PARAM" is a new optimizer hint introduced in 10g Release 2. 

This hint behaves the same way as setting a parameter (e.g, using alter session) except that the effect is for the statement only. 

```sql
SELECT /*+ OPT_PARAM('star_transformation_enabled' 'true') */ *  FROM ... ;
```

The hint only works for optimizer parameters. 

Global parameters such as optimizer_features_enable are not covered but optimizer_features_enable specifically has its own hint:

```
/*+ optimizer_features_enable('9.2.0') */
```

The OPT_PARAM hint lets you set an initialization parameter for the duration of the current query only. 

This hint is valid only for the following parameters: ----> initialization parameter

```sql
APPROX_FOR_AGGREGATION,
APPROX_FOR_COUNT_DISTINCT, 
APPROX_FOR_PERCENTILE, 
OPTIMIZER_DYNAMIC_SAMPLING, 
OPTIMIZER_INDEX_CACHING, 
OPTIMIZER_INDEX_COST_ADJ, 
OPTIMIZER_SECURE_VIEW_MERGING,
STAR_TRANSFORMATION_ENABLED.
```

Other Hintable:
```sql
_b_tree_bitmap_plans
_complex_view_merging
_disable_function_based_index
_fix_control
_gby_hash_aggregation_enabled
_hash_join_enabled
_index_join_enabled
_optimizer_cost_based_transformation
_optimizer_cost_model
_optimizer_enhanced_filter_push
_optimizer_join_sel_sanity_check
_optimizer_max_permutations
_optimizer_push_pred_cost_based
_optimizer_skip_scan_enabled
_optimizer_sortmerge_join_enabled
_optim_peek_user_binds
_simple_view_merging
query_rewrite_enabled
_full_pwise_join_enabled
```

sample:
```
select empno from emp e, dept d where e.ename=d.dname;
select /*+ opt_param('hash_join_enabled','false') */ empno from emp e, dept d where e.ename=d.dname;
```

```sql
SQL_ID  c3hdhj262k79g, child number 0
-------------------------------------
select empno from emp e, dept d where e.ename=d.dname

Plan hash value: 615168685

-------------------------------------------------------------------------------------------------------------
| Id  | Operation          | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
-------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT   |      |      1 |        |     6 (100)|          |      0 |00:00:00.01 |      12 |
|*  1 |  HASH JOIN         |      |      1 |      4 |     6   (0)| 00:00:01 |      0 |00:00:00.01 |      12 |
|   2 |   TABLE ACCESS FULL| DEPT |      1 |      4 |     3   (0)| 00:00:01 |      4 |00:00:00.01 |       6 |
|   3 |   TABLE ACCESS FULL| EMP  |      1 |     14 |     3   (0)| 00:00:01 |     14 |00:00:00.01 |       6 |
-------------------------------------------------------------------------------------------------------------

SQL_ID  7kvdbcprm2g3k, child number 0
-------------------------------------
select /*+ opt_param('hash_join_enabled','false') */ empno from emp e,
dept d where e.ename=d.dname

Plan hash value: 1407029907

--------------------------------------------------------------------------------------------------------------
| Id  | Operation           | Name | Starts | E-Rows | Cost (%CPU)| E-Time   | A-Rows |   A-Time   | Buffers |
--------------------------------------------------------------------------------------------------------------
|   0 | SELECT STATEMENT    |      |      1 |        |     8 (100)|          |      0 |00:00:00.01 |      12 |
|   1 |  MERGE JOIN         |      |      1 |      4 |     8  (25)| 00:00:01 |      0 |00:00:00.01 |      12 |
|   2 |   SORT JOIN         |      |      1 |      4 |     4  (25)| 00:00:01 |      4 |00:00:00.01 |       6 |
|   3 |    TABLE ACCESS FULL| DEPT |      1 |      4 |     3   (0)| 00:00:01 |      4 |00:00:00.01 |       6 |
|*  4 |   SORT JOIN         |      |      4 |     14 |     4  (25)| 00:00:01 |      0 |00:00:00.01 |       6 |
|   5 |    TABLE ACCESS FULL| EMP  |      1 |     14 |     3   (0)| 00:00:01 |     14 |00:00:00.01 |       6 |
--------------------------------------------------------------------------------------------------------------
```


The OPT_PARAM hint can be specified multiple times in the same hint in order to adjust more than one parameter at once as follows:




### Reference



[OPT_PARAM Hint](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Comments.html#GUID-DAC6E490-19FB-4140-A0A3-6CC60DD3D3A9)

Have a good work&life! 2021/07 via LinHong
