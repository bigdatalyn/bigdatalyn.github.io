---
layout: post
title: "Oracle 19c Hint list Tips"
category: Oracle
tags: Oracle hint Tips
---

* content
{:toc}

Oracle 19c Hint list Tips

List hint in 19c from V$SQL_HINT.







### Hint list

Total hint: 373 

```sql
SYSTEM@pdb1> select substr(version,1,2),count(*) from v$sql_hint group by substr(version,1,2);

SUBSTR(V   COUNT(*)
-------- ----------
9.               39
8.               85
12               78
18               15
10               80
11               70
19                6

7 rows selected.

SYSTEM@pdb1> 
```


```sql
SYSTEM@pdb1> select BANNER from v$version;
BANNER
--------------------------------------------------------------------------------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
SYSTEM@pdb1> 
SYSTEM@pdb1> set pagesize 500 linesize 300
SYSTEM@pdb1> @colfmt
COL "VERSION"                        FOR A8
COL "HINT_NAME"                      FOR A30
COL "INVERSE"                        FOR A30
COL "CLASS"                          FOR A27
COL "SQL_FEATURE"                    FOR A30
SELECT VERSION,NAME HINT_NAME,INVERSE,CLASS,SQL_FEATURE
FROM V$SQL_HINT
ORDER BY
TO_NUMBER(REGEXP_REPLACE(REGEXP_REPLACE(VERSION,'\.','',1,2),'\.','',1,2),99.999) DESC
,CLASS,NAME;

VERSION  HINT_NAME                      INVERSE                        CLASS                       SQL_FEATURE
-------- ------------------------------ ------------------------------ --------------------------- ------------------------------
19.1.0   JSON_LENGTH                                                   JSON_LENGTH                 QKSFM_EXECUTION
19.1.0   NO_PQ_EXPAND_TABLE             PQ_EXPAND_TABLE                PQ_EXPAND_TABLE             QKSFM_TABLE_EXPANSION
19.1.0   PQ_EXPAND_TABLE                NO_PQ_EXPAND_TABLE             PQ_EXPAND_TABLE             QKSFM_TABLE_EXPANSION
19.1.0   QUARANTINE                                                    QUARANTINE                  QKSFM_EXECUTION
19.1.0   NO_USE_SCALABLE_GBY_INVDIST    USE_SCALABLE_GBY_INVDIST       USE_SCALABLE_GBY_INVDIST    QKSFM_PQ
19.1.0   USE_SCALABLE_GBY_INVDIST       NO_USE_SCALABLE_GBY_INVDIST    USE_SCALABLE_GBY_INVDIST    QKSFM_PQ
18.1.0   ANSWER_QUERY_USING_STATS       NO_ANSWER_QUERY_USING_STATS    ANSWER_QUERY_USING_STATS    QKSFM_ANSWER_QUERY_USING_STATS
18.1.0   NO_ANSWER_QUERY_USING_STATS    ANSWER_QUERY_USING_STATS       ANSWER_QUERY_USING_STATS    QKSFM_ANSWER_QUERY_USING_STATS
18.1.0   AV_CACHE                                                      AV_CACHE                    QKSFM_EXECUTION
18.1.0   CURRENT_INSTANCE                                              CURRENT_INSTANCE            QKSFM_ALL
18.1.0   MEMOPTIMIZE_WRITE                                             MEMOPTIMIZE_WRITE           QKSFM_EXECUTION
18.1.0   PDB_LOCAL_ONLY                                                PDB_LOCAL_ONLY              QKSFM_DML
18.1.0   NO_PUSH_HAVING_TO_GBY          PUSH_HAVING_TO_GBY             PUSH_HAVING_TO_GBY          QKSFM_EXECUTION
18.1.0   PUSH_HAVING_TO_GBY             NO_PUSH_HAVING_TO_GBY          PUSH_HAVING_TO_GBY          QKSFM_EXECUTION
18.1.0   NO_REORDER_WIF                 REORDER_WIF                    REORDER_WIF                 QKSFM_PARTITION
18.1.0   REORDER_WIF                    NO_REORDER_WIF                 REORDER_WIF                 QKSFM_PARTITION
18.1.0   SKIP_PROXY                                                    SKIP_PROXY                  QKSFM_ALL
18.1.0   SUPPRESS_LOAD                                                 SUPPRESS_LOAD               QKSFM_DDL
18.1.0   SYSTEM_STATS                                                  SYSTEM_STATS                QKSFM_ALL
18.1.0   NO_USE_PARTITION_WISE_WIF      USE_PARTITION_WISE_WIF         USE_PARTITION_WISE_WIF      QKSFM_PARTITION
18.1.0   USE_PARTITION_WISE_WIF         NO_USE_PARTITION_WISE_WIF      USE_PARTITION_WISE_WIF      QKSFM_PARTITION
12.2.0.1 BUSHY_JOIN                     NO_BUSHY_JOIN                  BUSHY_JOIN                  QKSFM_BUSHY_JOIN
12.2.0.1 NO_BUSHY_JOIN                  BUSHY_JOIN                     BUSHY_JOIN                  QKSFM_BUSHY_JOIN
12.2.0.1 CONTAINERS                                                    CONTAINERS                  QKSFM_ALL
12.2.0.1 DATA_VALIDATE                                                 DATA_VALIDATE               QKSFM_EXECUTION
12.2.0.1 DIST_AGG_PROLLUP_PUSHDOWN      NO_DIST_AGG_PROLLUP_PUSHDOWN   DIST_AGG_PROLLUP_PUSHDOWN   QKSFM_PQ
12.2.0.1 NO_DIST_AGG_PROLLUP_PUSHDOWN   DIST_AGG_PROLLUP_PUSHDOWN      DIST_AGG_PROLLUP_PUSHDOWN   QKSFM_PQ
12.2.0.1 ELIMINATE_SQ                   NO_ELIMINATE_SQ                ELIMINATE_SQ                QKSFM_ELIMINATE_SQ
12.2.0.1 NO_ELIMINATE_SQ                ELIMINATE_SQ                   ELIMINATE_SQ                QKSFM_ELIMINATE_SQ
12.2.0.1 FRESH_MV                                                      FRESH_MV                    QKSFM_MVIEWS
12.2.0.1 ORDER_SUBQ                                                    ORDER_SUBQ                  QKSFM_TRANSFORMATION
12.2.0.1 NO_OR_EXPAND                   OR_EXPAND                      OR_EXPAND                   QKSFM_CBQT_OR_EXPANSION
12.2.0.1 OR_EXPAND                      NO_OR_EXPAND                   OR_EXPAND                   QKSFM_CBQT_OR_EXPANSION
12.2.0.1 SQL_SCOPE                                                     SQL_SCOPE                   QKSFM_COMPILATION
12.2.0.1 NO_USE_DAGG_UNION_ALL_GSETS    USE_DAGG_UNION_ALL_GSETS       USE_DAGG_UNION_ALL_GSETS    QKSFM_GROUPING_SET_XFORM
12.2.0.1 USE_DAGG_UNION_ALL_GSETS       NO_USE_DAGG_UNION_ALL_GSETS    USE_DAGG_UNION_ALL_GSETS    QKSFM_GROUPING_SET_XFORM
12.2.0.1 NO_USE_HASH_GBY_FOR_DAGGPSHD   USE_HASH_GBY_FOR_DAGGPSHD      USE_HASH_GBY_FOR_DAGGPSHD   QKSFM_ALL
12.2.0.1 USE_HASH_GBY_FOR_DAGGPSHD      NO_USE_HASH_GBY_FOR_DAGGPSHD   USE_HASH_GBY_FOR_DAGGPSHD   QKSFM_ALL
12.2.0.1 NO_USE_PARTITION_WISE_DISTINCT USE_PARTITION_WISE_DISTINCT    USE_PARTITION_WISE_DISTINCT QKSFM_PARTITION
12.2.0.1 USE_PARTITION_WISE_DISTINCT    NO_USE_PARTITION_WISE_DISTINCT USE_PARTITION_WISE_DISTINCT QKSFM_PARTITION
12.2.0.1 NO_USE_PARTITION_WISE_GBY      USE_PARTITION_WISE_GBY         USE_PARTITION_WISE_GBY      QKSFM_PARTITION
12.2.0.1 USE_PARTITION_WISE_GBY         NO_USE_PARTITION_WISE_GBY      USE_PARTITION_WISE_GBY      QKSFM_PARTITION
12.2.0.1 XMLTSET_DML_ENABLE                                            XMLTSET_DML_ENABLE          QKSFM_ALL
12.1.0.2 ADAPTIVE_PLAN                  NO_ADAPTIVE_PLAN               ADAPTIVE_PLAN               QKSFM_ADAPTIVE_PLAN
12.1.0.2 NO_ADAPTIVE_PLAN               ADAPTIVE_PLAN                  ADAPTIVE_PLAN               QKSFM_ADAPTIVE_PLAN
12.1.0.2 ANSI_REARCH                    NO_ANSI_REARCH                 ANSI_REARCH                 QKSFM_ANSI_REARCH
12.1.0.2 NO_ANSI_REARCH                 ANSI_REARCH                    ANSI_REARCH                 QKSFM_ANSI_REARCH
12.1.0.2 ELIM_GROUPBY                   NO_ELIM_GROUPBY                ELIM_GROUPBY                QKSFM_TRANSFORMATION
12.1.0.2 NO_ELIM_GROUPBY                ELIM_GROUPBY                   ELIM_GROUPBY                QKSFM_TRANSFORMATION
12.1.0.2 INMEMORY                       NO_INMEMORY                    INMEMORY                    QKSFM_EXECUTION
12.1.0.2 NO_INMEMORY                    INMEMORY                       INMEMORY                    QKSFM_EXECUTION
12.1.0.2 INMEMORY_PRUNING               NO_INMEMORY_PRUNING            INMEMORY_PRUNING            QKSFM_EXECUTION
12.1.0.2 NO_INMEMORY_PRUNING            INMEMORY_PRUNING               INMEMORY_PRUNING            QKSFM_EXECUTION
12.1.0.2 RESERVOIR_SAMPLING                                            RESERVOIR_SAMPLING          QKSFM_EXECUTION
12.1.0.2 NO_USE_VECTOR_AGGREGATION      USE_VECTOR_AGGREGATION         USE_VECTOR_AGGREGATION      QKSFM_VECTOR_AGG
12.1.0.2 USE_VECTOR_AGGREGATION         NO_USE_VECTOR_AGGREGATION      USE_VECTOR_AGGREGATION      QKSFM_VECTOR_AGG
12.1.0.2 NO_VECTOR_TRANSFORM            VECTOR_TRANSFORM               VECTOR_TRANSFORM            QKSFM_VECTOR_AGG
12.1.0.2 VECTOR_TRANSFORM               NO_VECTOR_TRANSFORM            VECTOR_TRANSFORM            QKSFM_VECTOR_AGG
12.1.0.2 NO_VECTOR_TRANSFORM_DIMS       VECTOR_TRANSFORM_DIMS          VECTOR_TRANSFORM_DIMS       QKSFM_VECTOR_AGG
12.1.0.2 VECTOR_TRANSFORM_DIMS          NO_VECTOR_TRANSFORM_DIMS       VECTOR_TRANSFORM_DIMS       QKSFM_VECTOR_AGG
12.1.0.2 NO_VECTOR_TRANSFORM_FACT       VECTOR_TRANSFORM_FACT          VECTOR_TRANSFORM_FACT       QKSFM_VECTOR_AGG
12.1.0.2 VECTOR_TRANSFORM_FACT          NO_VECTOR_TRANSFORM_FACT       VECTOR_TRANSFORM_FACT       QKSFM_VECTOR_AGG
12.1.0.1 CUBE_AJ                                                       ANTIJOIN                    QKSFM_JOIN_METHOD
12.1.0.1 AUTO_REOPTIMIZE                NO_AUTO_REOPTIMIZE             AUTO_REOPTIMIZE             QKSFM_AUTO_REOPT
12.1.0.1 NO_AUTO_REOPTIMIZE             AUTO_REOPTIMIZE                AUTO_REOPTIMIZE             QKSFM_AUTO_REOPT
12.1.0.1 BATCH_TABLE_ACCESS_BY_ROWID    NO_BATCH_TABLE_ACCESS_BY_ROWID BATCH_TABLE_ACCESS_BY_ROWID QKSFM_EXECUTION
12.1.0.1 NO_BATCH_TABLE_ACCESS_BY_ROWID BATCH_TABLE_ACCESS_BY_ROWID    BATCH_TABLE_ACCESS_BY_ROWID QKSFM_EXECUTION
12.1.0.1 BITMAP_AND                                                    BITMAP_AND                  QKSFM_BITMAP_TREE
12.1.0.1 CLUSTERING                     NO_CLUSTERING                  CLUSTERING                  QKSFM_CLUSTERING
12.1.0.1 NO_CLUSTERING                  CLUSTERING                     CLUSTERING                  QKSFM_CLUSTERING
12.1.0.1 CLUSTER_BY_ROWID               NO_CLUSTER_BY_ROWID            CLUSTER_BY_ROWID            QKSFM_CBO
12.1.0.1 NO_CLUSTER_BY_ROWID            CLUSTER_BY_ROWID               CLUSTER_BY_ROWID            QKSFM_CBO
12.1.0.1 DATA_SECURITY_REWRITE_LIMIT    NO_DATA_SECURITY_REWRITE       DATA_SECURITY_REWRITE_LIMIT QKSFM_DATA_SECURITY_REWRITE
12.1.0.1 NO_DATA_SECURITY_REWRITE       DATA_SECURITY_REWRITE_LIMIT    DATA_SECURITY_REWRITE_LIMIT QKSFM_DATA_SECURITY_REWRITE
12.1.0.1 DECORRELATE                    NO_DECORRELATE                 DECORRELATE                 QKSFM_DECORRELATE
12.1.0.1 NO_DECORRELATE                 DECORRELATE                    DECORRELATE                 QKSFM_DECORRELATE
12.1.0.1 GATHER_OPTIMIZER_STATISTICS    NO_GATHER_OPTIMIZER_STATISTICS GATHER_OPTIMIZER_STATISTICS QKSFM_DBMS_STATS
12.1.0.1 NO_GATHER_OPTIMIZER_STATISTICS GATHER_OPTIMIZER_STATISTICS    GATHER_OPTIMIZER_STATISTICS QKSFM_DBMS_STATS
12.1.0.1 NO_USE_CUBE                    USE_CUBE                       JOIN                        QKSFM_USE_CUBE
12.1.0.1 USE_CUBE                       NO_USE_CUBE                    JOIN                        QKSFM_USE_CUBE
12.1.0.1 NO_PARTIAL_JOIN                PARTIAL_JOIN                   PARTIAL_JOIN                QKSFM_PARTIAL_JOIN
12.1.0.1 PARTIAL_JOIN                   NO_PARTIAL_JOIN                PARTIAL_JOIN                QKSFM_PARTIAL_JOIN
12.1.0.1 NO_PARTIAL_ROLLUP_PUSHDOWN     PARTIAL_ROLLUP_PUSHDOWN        PARTIAL_ROLLUP_PUSHDOWN     QKSFM_PQ
12.1.0.1 PARTIAL_ROLLUP_PUSHDOWN        NO_PARTIAL_ROLLUP_PUSHDOWN     PARTIAL_ROLLUP_PUSHDOWN     QKSFM_PQ
12.1.0.1 NO_PQ_CONCURRENT_UNION         PQ_CONCURRENT_UNION            PQ_CONCURRENT_UNION         QKSFM_PQ
12.1.0.1 PQ_CONCURRENT_UNION            NO_PQ_CONCURRENT_UNION         PQ_CONCURRENT_UNION         QKSFM_PQ
12.1.0.1 PQ_DISTRIBUTE_WINDOW                                          PQ_DISTRIBUTE_WINDOW        QKSFM_PQ
12.1.0.1 PQ_FILTER                                                     PQ_FILTER                   QKSFM_PQ
12.1.0.1 NO_PQ_REPLICATE                PQ_REPLICATE                   PQ_REPLICATE                QKSFM_PQ_REPLICATE
12.1.0.1 PQ_REPLICATE                   NO_PQ_REPLICATE                PQ_REPLICATE                QKSFM_PQ_REPLICATE
12.1.0.1 NO_PQ_SKEW                     PQ_SKEW                        PQ_SKEW                     QKSFM_PQ
12.1.0.1 PQ_SKEW                        NO_PQ_SKEW                     PQ_SKEW                     QKSFM_PQ
12.1.0.1 NO_PX_FAULT_TOLERANCE          PX_FAULT_TOLERANCE             PX_FAULT_TOLERANCE          QKSFM_PQ
12.1.0.1 PX_FAULT_TOLERANCE             NO_PX_FAULT_TOLERANCE          PX_FAULT_TOLERANCE          QKSFM_PQ
12.1.0.1 CUBE_SJ                                                       SEMIJOIN                    QKSFM_JOIN_METHOD
12.1.0.1 USE_HIDDEN_PARTITIONS                                         USE_HIDDEN_PARTITIONS       QKSFM_PARTITION
12.1.0.1 WITH_PLSQL                                                    WITH_PLSQL                  QKSFM_ALL
12.1.0.1 NO_ZONEMAP                     ZONEMAP                        ZONEMAP                     QKSFM_ZONEMAP
12.1.0.1 ZONEMAP                        NO_ZONEMAP                     ZONEMAP                     QKSFM_ZONEMAP
11.2.0.4 DISABLE_PARALLEL_DML           ENABLE_PARALLEL_DML            ENABLE_PARALLEL_DML         QKSFM_DML
11.2.0.4 ENABLE_PARALLEL_DML            DISABLE_PARALLEL_DML           ENABLE_PARALLEL_DML         QKSFM_DML
11.2.0.3 FULL_OUTER_JOIN_TO_OUTER       NO_FULL_OUTER_JOIN_TO_OUTER    FULL_OUTER_JOIN_TO_OUTER    QKSFM_CBO
11.2.0.3 NO_FULL_OUTER_JOIN_TO_OUTER    FULL_OUTER_JOIN_TO_OUTER       FULL_OUTER_JOIN_TO_OUTER    QKSFM_CBO
11.2.0.3 NO_SEMI_TO_INNER               SEMI_TO_INNER                  NO_SEMI_TO_INNER            QKSFM_CBO
11.2.0.3 NO_OUTER_JOIN_TO_ANTI          OUTER_JOIN_TO_ANTI             OUTER_JOIN_TO_ANTI          QKSFM_CBO
11.2.0.3 OUTER_JOIN_TO_ANTI             NO_OUTER_JOIN_TO_ANTI          OUTER_JOIN_TO_ANTI          QKSFM_CBO
11.2.0.3 SEMI_TO_INNER                  NO_SEMI_TO_INNER               SEMI_TO_INNER               QKSFM_CBO
11.2.0.2 NO_TABLE_LOOKUP_BY_NL          TABLE_LOOKUP_BY_NL             TABLE_LOOKUP_BY_NL          QKSFM_TABLE_LOOKUP_BY_NL
11.2.0.2 TABLE_LOOKUP_BY_NL             NO_TABLE_LOOKUP_BY_NL          TABLE_LOOKUP_BY_NL          QKSFM_TABLE_LOOKUP_BY_NL
11.2.0.2 NO_USE_HASH_GBY_FOR_PUSHDOWN   USE_HASH_GBY_FOR_PUSHDOWN      USE_HASH_GBY_FOR_PUSHDOWN   QKSFM_ALL
11.2.0.2 USE_HASH_GBY_FOR_PUSHDOWN      NO_USE_HASH_GBY_FOR_PUSHDOWN   USE_HASH_GBY_FOR_PUSHDOWN   QKSFM_ALL
11.2.0.2 NO_XDB_FASTPATH_INSERT         XDB_FASTPATH_INSERT            XDB_FASTPATH_INSERT         QKSFM_ALL
11.2.0.2 XDB_FASTPATH_INSERT            NO_XDB_FASTPATH_INSERT         XDB_FASTPATH_INSERT         QKSFM_ALL
11.2.0.1 APPEND_VALUES                  NOAPPEND                       APPEND_VALUES               QKSFM_CBO
11.2.0.1 COALESCE_SQ                    NO_COALESCE_SQ                 COALESCE_SQ                 QKSFM_COALESCE_SQ
11.2.0.1 NO_COALESCE_SQ                 COALESCE_SQ                    COALESCE_SQ                 QKSFM_COALESCE_SQ
11.2.0.1 CONNECT_BY_ELIM_DUPS           NO_CONNECT_BY_ELIM_DUPS        CONNECT_BY_ELIM_DUPS        QKSFM_ALL
11.2.0.1 NO_CONNECT_BY_ELIM_DUPS        CONNECT_BY_ELIM_DUPS           CONNECT_BY_ELIM_DUPS        QKSFM_ALL
11.2.0.1 DST_UPGRADE_INSERT_CONV        NO_DST_UPGRADE_INSERT_CONV     DST_UPGRADE_INSERT_CONV     QKSFM_ALL
11.2.0.1 NO_DST_UPGRADE_INSERT_CONV     DST_UPGRADE_INSERT_CONV        DST_UPGRADE_INSERT_CONV     QKSFM_ALL
11.2.0.1 EXPAND_TABLE                   NO_EXPAND_TABLE                EXPAND_TABLE                QKSFM_TABLE_EXPANSION
11.2.0.1 NO_EXPAND_TABLE                EXPAND_TABLE                   EXPAND_TABLE                QKSFM_TABLE_EXPANSION
11.2.0.1 FACTORIZE_JOIN                 NO_FACTORIZE_JOIN              FACTORIZE_JOIN              QKSFM_JOINFAC
11.2.0.1 NO_FACTORIZE_JOIN              FACTORIZE_JOIN                 FACTORIZE_JOIN              QKSFM_JOINFAC
11.2.0.1 NO_SUBSTRB_PAD                                                NO_SUBSTRB_PAD              QKSFM_EXECUTION
11.2.0.1 NO_PLACE_DISTINCT              PLACE_DISTINCT                 PLACE_DISTINCT              QKSFM_DIST_PLCMT
11.2.0.1 PLACE_DISTINCT                 NO_PLACE_DISTINCT              PLACE_DISTINCT              QKSFM_DIST_PLCMT
11.2.0.1 NO_STATEMENT_QUEUING           STATEMENT_QUEUING              STATEMENT_QUEUING           QKSFM_PARALLEL
11.2.0.1 STATEMENT_QUEUING              NO_STATEMENT_QUEUING           STATEMENT_QUEUING           QKSFM_PARALLEL
11.2.0.1 NO_TRANSFORM_DISTINCT_AGG      TRANSFORM_DISTINCT_AGG         TRANSFORM_DISTINCT_AGG      QKSFM_TRANSFORMATION
11.2.0.1 TRANSFORM_DISTINCT_AGG         NO_TRANSFORM_DISTINCT_AGG      TRANSFORM_DISTINCT_AGG      QKSFM_TRANSFORMATION
11.2.0.1 XMLINDEX_SEL_IDX_TBL                                          XMLINDEX_SEL_IDX_TBL        QKSFM_ALL
11.1.0.7 BIND_AWARE                     NO_BIND_AWARE                  BIND_AWARE                  QKSFM_CURSOR_SHARING
11.1.0.7 NO_BIND_AWARE                  BIND_AWARE                     BIND_AWARE                  QKSFM_CURSOR_SHARING
11.1.0.7 CHANGE_DUPKEY_ERROR_INDEX                                     CHANGE_DUPKEY_ERROR_INDEX   QKSFM_DML
11.1.0.7 IGNORE_ROW_ON_DUPKEY_INDEX                                    IGNORE_ROW_ON_DUPKEY_INDEX  QKSFM_DML
11.1.0.7 RETRY_ON_ROW_CHANGE                                           RETRY_ON_ROW_CHANGE         QKSFM_DML
11.1.0.6 INDEX_RS_ASC                                                  ACCESS                      QKSFM_INDEX_RS_ASC
11.1.0.6 INDEX_RS_DESC                                                 ACCESS                      QKSFM_INDEX_RS_DESC
11.1.0.6 NLJ_BATCHING                   NO_NLJ_BATCHING                ACCESS                      QKSFM_EXECUTION
11.1.0.6 NLJ_PREFETCH                   NO_NLJ_PREFETCH                ACCESS                      QKSFM_EXECUTION
11.1.0.6 NO_NLJ_BATCHING                NLJ_BATCHING                   ACCESS                      QKSFM_EXECUTION
11.1.0.6 NO_NLJ_PREFETCH                NLJ_PREFETCH                   ACCESS                      QKSFM_EXECUTION
11.1.0.6 CHECK_ACL_REWRITE              NO_CHECK_ACL_REWRITE           CHECK_ACL_REWRITE           QKSFM_CHECK_ACL_REWRITE
11.1.0.6 COST_XML_QUERY_REWRITE         NO_COST_XML_QUERY_REWRITE      COST_XML_QUERY_REWRITE      QKSFM_COST_XML_QUERY_REWRITE
11.1.0.6 DB_VERSION                                                    DB_VERSION                  QKSFM_ALL
11.1.0.6 DOMAIN_INDEX_FILTER            NO_DOMAIN_INDEX_FILTER         DOMAIN_INDEX_FILTER         QKSFM_CBO
11.1.0.6 USE_MERGE_CARTESIAN                                           JOIN                        QKSFM_USE_MERGE_CARTESIAN
11.1.0.6 MONITOR                        NO_MONITOR                     MONITOR                     QKSFM_ALL
11.1.0.6 NO_MONITOR                     MONITOR                        MONITOR                     QKSFM_ALL
11.1.0.6 NO_CHECK_ACL_REWRITE           CHECK_ACL_REWRITE              NO_CHECK_ACL_REWRITE        QKSFM_CHECK_ACL_REWRITE
11.1.0.6 NO_COST_XML_QUERY_REWRITE      COST_XML_QUERY_REWRITE         NO_COST_XML_QUERY_REWRITE   QKSFM_COST_XML_QUERY_REWRITE
11.1.0.6 NO_DOMAIN_INDEX_FILTER         DOMAIN_INDEX_FILTER            NO_DOMAIN_INDEX_FILTER      QKSFM_CBO
11.1.0.6 NO_LOAD                                                       NO_LOAD                     QKSFM_EXECUTION
11.1.0.6 NO_OUTER_JOIN_TO_INNER         OUTER_JOIN_TO_INNER            OUTER_JOIN_TO_INNER         QKSFM_OUTER_JOIN_TO_INNER
11.1.0.6 OUTER_JOIN_TO_INNER            NO_OUTER_JOIN_TO_INNER         OUTER_JOIN_TO_INNER         QKSFM_OUTER_JOIN_TO_INNER
11.1.0.6 NO_PLACE_GROUP_BY              PLACE_GROUP_BY                 PLACE_GROUP_BY              QKSFM_PLACE_GROUP_BY
11.1.0.6 PLACE_GROUP_BY                 NO_PLACE_GROUP_BY              PLACE_GROUP_BY              QKSFM_PLACE_GROUP_BY
11.1.0.6 NO_RESULT_CACHE                RESULT_CACHE                   RESULT_CACHE                QKSFM_EXECUTION
11.1.0.6 RESULT_CACHE                   NO_RESULT_CACHE                RESULT_CACHE                QKSFM_EXECUTION
11.1.0.6 NO_SUBQUERY_PRUNING            SUBQUERY_PRUNING               SUBQUERY_PRUNING            QKSFM_CBO
11.1.0.6 SUBQUERY_PRUNING               NO_SUBQUERY_PRUNING            SUBQUERY_PRUNING            QKSFM_CBO
11.1.0.6 NO_USE_INVISIBLE_INDEXES       USE_INVISIBLE_INDEXES          USE_INVISIBLE_INDEXES       QKSFM_INDEX
11.1.0.6 USE_INVISIBLE_INDEXES          NO_USE_INVISIBLE_INDEXES       USE_INVISIBLE_INDEXES       QKSFM_INDEX
11.1.0.6 NO_XMLINDEX_REWRITE            XMLINDEX_REWRITE               XMLINDEX_REWRITE            QKSFM_XMLINDEX_REWRITE
11.1.0.6 NO_XMLINDEX_REWRITE_IN_SELECT  XMLINDEX_REWRITE_IN_SELECT     XMLINDEX_REWRITE            QKSFM_XMLINDEX_REWRITE
11.1.0.6 XMLINDEX_REWRITE               NO_XMLINDEX_REWRITE            XMLINDEX_REWRITE            QKSFM_XMLINDEX_REWRITE
11.1.0.6 XMLINDEX_REWRITE_IN_SELECT     NO_XMLINDEX_REWRITE_IN_SELECT  XMLINDEX_REWRITE            QKSFM_XMLINDEX_REWRITE
11.1.0.6 XML_DML_RWT_STMT                                              XML_DML_RWT_STMT            QKSFM_XML_REWRITE
10.2.0.5 CONNECT_BY_CB_WHR_ONLY         NO_CONNECT_BY_CB_WHR_ONLY      CONNECT_BY_CB_WHR_ONLY      QKSFM_TRANSFORMATION
10.2.0.5 NO_CONNECT_BY_CB_WHR_ONLY      CONNECT_BY_CB_WHR_ONLY         CONNECT_BY_CB_WHR_ONLY      QKSFM_TRANSFORMATION
10.2.0.5 GBY_PUSHDOWN                   NO_GBY_PUSHDOWN                GBY_PUSHDOWN                QKSFM_ALL
10.2.0.5 NO_GBY_PUSHDOWN                GBY_PUSHDOWN                   GBY_PUSHDOWN                QKSFM_ALL
10.2.0.4 CONNECT_BY_COMBINE_SW          NO_CONNECT_BY_COMBINE_SW       CONNECT_BY_COMBINE_SW       QKSFM_ALL
10.2.0.4 NO_CONNECT_BY_COMBINE_SW       CONNECT_BY_COMBINE_SW          CONNECT_BY_COMBINE_SW       QKSFM_ALL
10.2.0.3 NUM_INDEX_KEYS                                                ACCESS                      QKSFM_CBO
10.2.0.3 NATIVE_FULL_OUTER_JOIN         NO_NATIVE_FULL_OUTER_JOIN      NATIVE_FULL_OUTER_JOIN      QKSFM_ALL
10.2.0.3 NO_NATIVE_FULL_OUTER_JOIN      NATIVE_FULL_OUTER_JOIN         NATIVE_FULL_OUTER_JOIN      QKSFM_ALL
10.2.0.2 CONNECT_BY_COST_BASED          NO_CONNECT_BY_COST_BASED       CONNECT_BY_COST_BASED       QKSFM_TRANSFORMATION
10.2.0.2 NO_CONNECT_BY_COST_BASED       CONNECT_BY_COST_BASED          CONNECT_BY_COST_BASED       QKSFM_TRANSFORMATION
10.2.0.2 CONNECT_BY_FILTERING           NO_CONNECT_BY_FILTERING        CONNECT_BY_FILTERING        QKSFM_ALL
10.2.0.2 NO_CONNECT_BY_FILTERING        CONNECT_BY_FILTERING           CONNECT_BY_FILTERING        QKSFM_ALL
10.2.0.1 BITMAP_TREE                                                   ACCESS                      QKSFM_BITMAP_TREE
10.2.0.1 DBMS_STATS                                                    DBMS_STATS                  QKSFM_DBMS_STATS
10.2.0.1 ELIMINATE_JOIN                 NO_ELIMINATE_JOIN              ELIMINATE_JOIN              QKSFM_TABLE_ELIM
10.2.0.1 NO_ELIMINATE_JOIN              ELIMINATE_JOIN                 ELIMINATE_JOIN              QKSFM_TABLE_ELIM
10.2.0.1 ELIMINATE_OBY                  NO_ELIMINATE_OBY               ELIMINATE_OBY               QKSFM_OBYE
10.2.0.1 NO_ELIMINATE_OBY               ELIMINATE_OBY                  ELIMINATE_OBY               QKSFM_OBYE
10.2.0.1 INLINE_XMLTYPE_NT                                             INLINE_XMLTYPE_NT           QKSFM_ALL
10.2.0.1 MODEL_COMPILE_SUBQUERY                                        MODEL_COMPILE_SUBQUERY      QKSFM_TRANSFORMATION
10.2.0.1 MODEL_DYNAMIC_SUBQUERY                                        MODEL_DYNAMIC_SUBQUERY      QKSFM_TRANSFORMATION
10.2.0.1 NO_CARTESIAN                                                  NO_CARTESIAN                QKSFM_ALL
10.2.0.1 NO_SQL_TUNE                                                   NO_SQL_TUNE                 QKSFM_ALL
10.2.0.1 NO_XML_DML_REWRITE                                            NO_XML_DML_REWRITE          QKSFM_XML_REWRITE
10.2.0.1 OLD_PUSH_PRED                                                 OLD_PUSH_PRED               QKSFM_OLD_PUSH_PRED
10.2.0.1 OPT_PARAM                                                     OPT_PARAM                   QKSFM_ALL
10.2.0.1 OUTLINE                                                       OUTLINE                     QKSFM_ALL
10.2.0.1 OUTLINE_LEAF                                                  OUTLINE_LEAF                QKSFM_ALL
10.2.0.1 PRECOMPUTE_SUBQUERY                                           PRECOMPUTE_SUBQUERY         QKSFM_TRANSFORMATION
10.2.0.1 PRESERVE_OID                                                  PRESERVE_OID                QKSFM_ALL
10.2.0.1 NO_PULL_PRED                   PULL_PRED                      PULL_PRED                   QKSFM_PULL_PRED
10.2.0.1 PULL_PRED                      NO_PULL_PRED                   PULL_PRED                   QKSFM_PULL_PRED
10.2.0.1 NO_PX_JOIN_FILTER              PX_JOIN_FILTER                 PX_JOIN_FILTER              QKSFM_PX_JOIN_FILTER
10.2.0.1 PX_JOIN_FILTER                 NO_PX_JOIN_FILTER              PX_JOIN_FILTER              QKSFM_PX_JOIN_FILTER
10.2.0.1 RBO_OUTLINE                                                   RBO_OUTLINE                 QKSFM_RBO
10.2.0.1 NO_USE_HASH_AGGREGATION        USE_HASH_AGGREGATION           USE_HASH_AGGREGATION        QKSFM_ALL
10.2.0.1 USE_HASH_AGGREGATION           NO_USE_HASH_AGGREGATION        USE_HASH_AGGREGATION        QKSFM_ALL
10.1.0.3 FBTSCAN                                                       FBTSCAN                     QKSFM_CBO
10.1.0.3 GATHER_PLAN_STATISTICS                                        GATHER_PLAN_STATISTICS      QKSFM_GATHER_PLAN_STATISTICS
10.1.0.3 IGNORE_OPTIM_EMBEDDED_HINTS                                   IGNORE_OPTIM_EMBEDDED_HINTS QKSFM_ALL
10.1.0.3 INCLUDE_VERSION                                               INCLUDE_VERSION             QKSFM_ALL
10.1.0.3 MODEL_DONTVERIFY_UNIQUENESS                                   MODEL_DONTVERIFY_UNIQUENESS QKSFM_TRANSFORMATION
10.1.0.3 MODEL_MIN_ANALYSIS                                            MODEL_MIN_ANALYSIS          QKSFM_TRANSFORMATION
10.1.0.3 MODEL_NO_ANALYSIS                                             MODEL_MIN_ANALYSIS          QKSFM_ALL
10.1.0.3 MODEL_PUSH_REF                 NO_MODEL_PUSH_REF              MODEL_PUSH_REF              QKSFM_TRANSFORMATION
10.1.0.3 NO_MODEL_PUSH_REF              MODEL_PUSH_REF                 MODEL_PUSH_REF              QKSFM_ALL
10.1.0.3 NESTED_TABLE_FAST_INSERT                                      NESTED_TABLE_FAST_INSERT    QKSFM_ALL
10.1.0.3 NO_INDEX_FFS                   INDEX_FFS                      NO_INDEX_FFS                QKSFM_INDEX_FFS
10.1.0.3 NO_INDEX_SS                    INDEX_SS                       NO_INDEX_SS                 QKSFM_INDEX_SS
10.1.0.3 NO_PARTIAL_COMMIT                                             NO_PARTIAL_COMMIT           QKSFM_CBO
10.1.0.3 NO_QUERY_TRANSFORMATION                                       NO_QUERY_TRANSFORMATION     QKSFM_TRANSFORMATION
10.1.0.3 NO_USE_HASH                    USE_HASH                       NO_USE_HASH                 QKSFM_USE_HASH
10.1.0.3 NO_USE_MERGE                   USE_MERGE                      NO_USE_MERGE                QKSFM_USE_MERGE
10.1.0.3 NO_USE_NL                      USE_NL                         NO_USE_NL                   QKSFM_USE_NL
10.1.0.3 OPAQUE_TRANSFORM                                              OPAQUE_TRANSFORM            QKSFM_TRANSFORMATION
10.1.0.3 OPAQUE_XCANONICAL                                             OPAQUE_XCANONICAL           QKSFM_TRANSFORMATION
10.1.0.3 OPTIMIZER_FEATURES_ENABLE                                     OPTIMIZER_FEATURES_ENABLE   QKSFM_ALL
10.1.0.3 OPT_ESTIMATE                                                  OPT_ESTIMATE                QKSFM_OPT_ESTIMATE
10.1.0.3 QB_NAME                                                       QB_NAME                     QKSFM_ALL
10.1.0.3 RESTRICT_ALL_REF_CONS                                         RESTRICT_ALL_REF_CONS       QKSFM_ALL
10.1.0.3 NO_BASETABLE_MULTIMV_REWRITE   REWRITE                        REWRITE                     QKSFM_ALL
10.1.0.3 NO_MULTIMV_REWRITE             REWRITE                        REWRITE                     QKSFM_ALL
10.1.0.3 REWRITE_OR_ERROR                                              REWRITE                     QKSFM_TRANSFORMATION
10.1.0.3 NO_SET_TO_JOIN                 SET_TO_JOIN                    SET_TO_JOIN                 QKSFM_SET_TO_JOIN
10.1.0.3 SET_TO_JOIN                    NO_SET_TO_JOIN                 SET_TO_JOIN                 QKSFM_SET_TO_JOIN
10.1.0.3 NO_PARALLEL                    SHARED                         SHARED                      QKSFM_CBO
10.1.0.3 SKIP_UNQ_UNUSABLE_IDX                                         SKIP_UNQ_UNUSABLE_IDX       QKSFM_CBO
10.1.0.3 NO_STAR_TRANSFORMATION         STAR_TRANSFORMATION            STAR_TRANSFORMATION         QKSFM_STAR_TRANS
10.1.0.3 STREAMS                                                       STREAMS                     QKSFM_CBO
10.1.0.3 NO_SWAP_JOIN_INPUTS            SWAP_JOIN_INPUTS               SWAP_JOIN_INPUTS            QKSFM_CBO
10.1.0.3 COLUMN_STATS                                                  TABLE_STATS                 QKSFM_STATS
10.1.0.3 INDEX_STATS                                                   TABLE_STATS                 QKSFM_STATS
10.1.0.3 TABLE_STATS                                                   TABLE_STATS                 QKSFM_STATS
10.1.0.3 TRACING                                                       TRACING                     QKSFM_EXECUTION
10.1.0.3 USE_NL_WITH_INDEX              NO_USE_NL                      USE_NL_WITH_INDEX           QKSFM_USE_NL_WITH_INDEX
10.1.0.3 USE_WEAK_NAME_RESL                                            USE_WEAK_NAME_RESL          QKSFM_ALL
10.1.0.3 VECTOR_READ                                                   VECTOR_READ                 QKSFM_CBO
10.1.0.3 VECTOR_READ_TRACE                                             VECTOR_READ_TRACE           QKSFM_CBO
10.1.0.3 X_DYN_PRUNE                                                   X_DYN_PRUNE                 QKSFM_CBO
9.2.0    DYNAMIC_SAMPLING                                              DYNAMIC_SAMPLING            QKSFM_DYNAMIC_SAMPLING
9.2.0    DYNAMIC_SAMPLING_EST_CDN                                      DYNAMIC_SAMPLING_EST_CDN    QKSFM_DYNAMIC_SAMPLING_EST_CDN
9.2.0    EXPAND_GSET_TO_UNION           NO_EXPAND_GSET_TO_UNION        EXPAND_GSET_TO_UNION        QKSFM_TRANSFORMATION
9.2.0    NO_EXPAND_GSET_TO_UNION        EXPAND_GSET_TO_UNION           EXPAND_GSET_TO_UNION        QKSFM_TRANSFORMATION
9.2.0    FORCE_XML_QUERY_REWRITE        NO_XML_QUERY_REWRITE           FORCE_XML_QUERY_REWRITE     QKSFM_XML_REWRITE
9.2.0    NO_XML_QUERY_REWRITE           FORCE_XML_QUERY_REWRITE        FORCE_XML_QUERY_REWRITE     QKSFM_XML_REWRITE
9.2.0    IGNORE_WHERE_CLAUSE                                           IGNORE_WHERE_CLAUSE         QKSFM_ALL
9.2.0    NO_QKN_BUFF                                                   NO_QKN_BUFF                 QKSFM_CBO
9.2.0    NO_PUSH_SUBQ                   PUSH_SUBQ                      PUSH_SUBQ                   QKSFM_TRANSFORMATION
9.2.0    NO_REF_CASCADE                 REF_CASCADE_CURSOR             REF_CASCADE_CURSOR          QKSFM_CBO
9.2.0    REF_CASCADE_CURSOR             NO_REF_CASCADE                 REF_CASCADE_CURSOR          QKSFM_CBO
9.2.0    SYS_DL_CURSOR                                                 SYS_DL_CURSOR               QKSFM_CBO
9.2.0    SYS_RID_ORDER                                                 SYS_RID_ORDER               QKSFM_ALL
9.0.0    INDEX_RRS                                                     ACCESS                      QKSFM_CBO
9.0.0    INDEX_SS                       NO_INDEX_SS                    ACCESS                      QKSFM_INDEX_SS
9.0.0    INDEX_SS_ASC                   NO_INDEX_SS                    ACCESS                      QKSFM_INDEX_SS_ASC
9.0.0    INDEX_SS_DESC                  NO_INDEX_SS                    ACCESS                      QKSFM_INDEX_SS_DESC
9.0.0    ANTIJOIN                                                      ANTIJOIN                    QKSFM_TRANSFORMATION
9.0.0    BYPASS_RECURSIVE_CHECK                                        BYPASS_RECURSIVE_CHECK      QKSFM_ALL
9.0.0    CARDINALITY                                                   CARDINALITY                 QKSFM_STATS
9.0.0    CPU_COSTING                    NO_CPU_COSTING                 CPU_COSTING                 QKSFM_CPU_COSTING
9.0.0    NO_CPU_COSTING                 CPU_COSTING                    CPU_COSTING                 QKSFM_CPU_COSTING
9.0.0    CURSOR_SHARING_EXACT                                          CURSOR_SHARING_EXACT        QKSFM_CBO
9.0.0    DML_UPDATE                                                    DML_UPDATE                  QKSFM_CBO
9.0.0    GBY_CONC_ROLLUP                                               GBY_CONC_ROLLUP             QKSFM_TRANSFORMATION
9.0.0    HWM_BROKERED                                                  HWM_BROKERED                QKSFM_CBO
9.0.0    INLINE                         MATERIALIZE                    INLINE                      QKSFM_TRANSFORMATION
9.0.0    MATERIALIZE                    INLINE                         INLINE                      QKSFM_TRANSFORMATION
9.0.0    LOCAL_INDEXES                                                 LOCAL_INDEXES               QKSFM_CBO
9.0.0    MV_MERGE                                                      MV_MERGE                    QKSFM_TRANSFORMATION
9.0.0    NO_PRUNE_GSETS                                                NO_PRUNE_GSETS              QKSFM_TRANSFORMATION
9.0.0    OVERFLOW_NOMOVE                                               OVERFLOW_NOMOVE             QKSFM_CBO
9.0.0    PQ_MAP                         PQ_NOMAP                       PQ_MAP                      QKSFM_PQ_MAP
9.0.0    PQ_NOMAP                       PQ_MAP                         PQ_MAP                      QKSFM_PQ_MAP
9.0.0    NO_SEMIJOIN                    SEMIJOIN                       SEMIJOIN                    QKSFM_TRANSFORMATION
9.0.0    SEMIJOIN                       NO_SEMIJOIN                    SEMIJOIN                    QKSFM_TRANSFORMATION
9.0.0    SKIP_EXT_OPTIMIZER                                            SKIP_EXT_OPTIMIZER          QKSFM_CBO
9.0.0    SQLLDR                                                        SQLLDR                      QKSFM_CBO
9.0.0    USE_TTT_FOR_GSETS                                             USE_TTT_FOR_GSETS           QKSFM_TRANSFORMATION
8.1.6    LEADING                                                       LEADING                     QKSFM_JOIN_ORDER
8.1.6    SYS_PARALLEL_TXN                                              SYS_PARALLEL_TXN            QKSFM_CBO
8.1.6    NO_UNNEST                      UNNEST                         UNNEST                      QKSFM_UNNEST
8.1.6    UNNEST                         NO_UNNEST                      UNNEST                      QKSFM_UNNEST
8.1.5    INDEX_JOIN                                                    ACCESS                      QKSFM_INDEX_JOIN
8.1.5    BUFFER                         NO_BUFFER                      BUFFER                      QKSFM_CBO
8.1.5    NO_BUFFER                      BUFFER                         BUFFER                      QKSFM_CBO
8.1.5    BYPASS_UJVC                                                   BYPASS_UJVC                 QKSFM_CBO
8.1.5    CACHE_CB                       NOCACHE                        CACHE_CB                    QKSFM_CBO
8.1.5    CUBE_GB                                                       CUBE_GB                     QKSFM_CBO
8.1.5    DOMAIN_INDEX_NO_SORT           DOMAIN_INDEX_SORT              DOMAIN_INDEX_SORT           QKSFM_CBO
8.1.5    DOMAIN_INDEX_SORT              DOMAIN_INDEX_NO_SORT           DOMAIN_INDEX_SORT           QKSFM_CBO
8.1.5    NESTED_TABLE_SET_SETID                                        NESTED_TABLE_SET_SETID      QKSFM_ALL
8.1.5    NO_ACCESS                                                     NO_ACCESS                   QKSFM_ALL
8.1.5    NO_INDEX                       INDEX                          NO_INDEX                    QKSFM_INDEX
8.1.5    PQ_DISTRIBUTE                                                 PQ_DISTRIBUTE               QKSFM_PQ_DISTRIBUTE
8.1.5    RESTORE_AS_INTERVALS                                          RESTORE_AS_INTERVALS        QKSFM_CBO
8.1.5    NO_REWRITE                     REWRITE                        REWRITE                     QKSFM_TRANSFORMATION
8.1.5    REWRITE                        NO_REWRITE                     REWRITE                     QKSFM_TRANSFORMATION
8.1.5    SAVE_AS_INTERVALS                                             SAVE_AS_INTERVALS           QKSFM_CBO
8.1.5    SCN_ASCENDING                                                 SCN_ASCENDING               QKSFM_ALL
8.1.0    AND_EQUAL                                                     ACCESS                      QKSFM_AND_EQUAL
8.1.0    FULL                                                          ACCESS                      QKSFM_FULL
8.1.0    HASH                                                          ACCESS                      QKSFM_ALL
8.1.0    INDEX_ASC                      NO_INDEX                       ACCESS                      QKSFM_INDEX_ASC
8.1.0    INDEX_COMBINE                                                 ACCESS                      QKSFM_INDEX_COMBINE
8.1.0    INDEX_DESC                     NO_INDEX                       ACCESS                      QKSFM_INDEX_DESC
8.1.0    INDEX_FFS                                                     ACCESS                      QKSFM_INDEX_FFS
8.1.0    HASH_AJ                                                       ANTIJOIN                    QKSFM_JOIN_METHOD
8.1.0    MERGE_AJ                                                      ANTIJOIN                    QKSFM_JOIN_METHOD
8.1.0    APPEND                         NOAPPEND                       APPEND                      QKSFM_CBO
8.1.0    NOAPPEND                       APPEND                         APPEND                      QKSFM_CBO
8.1.0    BITMAP                                                        BITMAP                      QKSFM_CBO
8.1.0    CACHE                          NOCACHE                        CACHE                       QKSFM_EXECUTION
8.1.0    NOCACHE                        CACHE                          CACHE                       QKSFM_EXECUTION
8.1.0    DEREF_NO_REWRITE                                              DEREF_NO_REWRITE            QKSFM_ALL
8.1.0    DRIVING_SITE                                                  DRIVING_SITE                QKSFM_ALL
8.1.0    FACT                           NO_FACT                        FACT                        QKSFM_STAR_TRANS
8.1.0    NO_FACT                        FACT                           FACT                        QKSFM_STAR_TRANS
8.1.0    USE_HASH                       NO_USE_HASH                    JOIN                        QKSFM_USE_HASH
8.1.0    USE_MERGE                      NO_USE_MERGE                   JOIN                        QKSFM_USE_MERGE
8.1.0    USE_NL                         NO_USE_NL                      JOIN                        QKSFM_USE_NL
8.1.0    MERGE                          NO_MERGE                       MERGE                       QKSFM_CVM
8.1.0    ALL_ROWS                                                      MODE                        QKSFM_ALL_ROWS
8.1.0    CHOOSE                                                        MODE                        QKSFM_CHOOSE
8.1.0    FIRST_ROWS                                                    MODE                        QKSFM_FIRST_ROWS
8.1.0    RULE                                                          MODE                        QKSFM_RBO
8.1.0    NESTED_TABLE_GET_REFS                                         NESTED_TABLE_GET_REFS       QKSFM_ALL
8.1.0    ORDERED                                                       ORDERED                     QKSFM_CBO
8.1.0    NO_EXPAND                      USE_CONCAT                     OR_EXPAND                   QKSFM_USE_CONCAT
8.1.0    USE_CONCAT                     NO_EXPAND                      OR_EXPAND                   QKSFM_USE_CONCAT
8.1.0    NO_PARALLEL_INDEX              PARALLEL_INDEX                 PARALLEL_INDEX              QKSFM_PQ
8.1.0    PARALLEL_INDEX                 NO_PARALLEL_INDEX              PARALLEL_INDEX              QKSFM_PQ
8.1.0    PIV_GB                                                        PIV_GB                      QKSFM_ALL
8.1.0    TIV_GB                                                        PIV_GB                      QKSFM_ALL
8.1.0    PIV_SSF                                                       PIV_SSF                     QKSFM_ALL
8.1.0    TIV_SSF                                                       PIV_SSF                     QKSFM_ALL
8.1.0    NO_PUSH_PRED                   PUSH_PRED                      PUSH_PRED                   QKSFM_FILTER_PUSH_PRED
8.1.0    PUSH_PRED                      NO_PUSH_PRED                   PUSH_PRED                   QKSFM_FILTER_PUSH_PRED
8.1.0    PUSH_SUBQ                      NO_PUSH_SUBQ                   PUSH_SUBQ                   QKSFM_TRANSFORMATION
8.1.0    REMOTE_MAPPED                                                 REMOTE_MAPPED               QKSFM_ALL
8.1.0    HASH_SJ                                                       SEMIJOIN                    QKSFM_JOIN_METHOD
8.1.0    MERGE_SJ                                                      SEMIJOIN                    QKSFM_JOIN_METHOD
8.1.0    SEMIJOIN_DRIVER                                               SEMIJOIN_DRIVER             QKSFM_CBO
8.1.0    NOPARALLEL                     SHARED                         SHARED                      QKSFM_PARALLEL
8.1.0    SHARED                         NO_PARALLEL                    SHARED                      QKSFM_PARALLEL
8.1.0    STAR                                                          STAR                        QKSFM_STAR_TRANS
8.1.0    STAR_TRANSFORMATION            NO_STAR_TRANSFORMATION         STAR_TRANSFORMATION         QKSFM_STAR_TRANS
8.1.0    SWAP_JOIN_INPUTS               NO_SWAP_JOIN_INPUTS            SWAP_JOIN_INPUTS            QKSFM_CBO
8.1.0    USE_ANTI                                                      USE_ANTI                    QKSFM_CBO
8.1.0    USE_SEMI                                                      USE_SEMI                    QKSFM_CBO
8.0.0    CLUSTER                                                       ACCESS                      QKSFM_CBO
8.0.0    INDEX                          NO_INDEX                       ACCESS                      QKSFM_INDEX
8.0.0    QUEUE_CURR                                                    ACCESS                      QKSFM_CBO
8.0.0    QUEUE_ROWP                                                    ACCESS                      QKSFM_CBO
8.0.0    ROWID                                                         ACCESS                      QKSFM_CBO
8.0.0    NL_AJ                                                         ANTIJOIN                    QKSFM_JOIN_METHOD
8.0.0    EXPR_CORR_CHECK                                               EXPR_CORR_CHECK             QKSFM_CBO
8.0.0    NO_MERGE                       MERGE                          MERGE                       QKSFM_CVM
8.0.0    MERGE_CONST_ON                                                MERGE_CONST_ON              QKSFM_CBO
8.0.0    NO_MONITORING                                                 NO_MONITORING               QKSFM_ALL
8.0.0    NO_ORDER_ROLLUPS                                              NO_ORDER_ROLLUPS            QKSFM_TRANSFORMATION
8.0.0    NO_STATS_GSETS                                                NO_STATS_GSETS              QKSFM_ALL
8.0.0    ORDERED_PREDICATES                                            ORDERED_PREDICATES          QKSFM_CBO
8.0.0    NL_SJ                                                         SEMIJOIN                    QKSFM_JOIN_METHOD

373 rows selected.

SYSTEM@pdb1> 
```

### Reference

[Best Practices for Gathering Optimizer Statistics with Oracle Database 12c Release 2](https://www.oracle.com/technetwork/database/bi-datawarehousing/twp-bp-for-stats-gather-12c-1967354.pdf)

Have a good work&life! 2021/07 via LinHong
