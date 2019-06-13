---
layout: post
title: "Oracle Parameter Optimizer Tips"
category: Oracle
tags: Oracle optimizer Tips
---

* content
{:toc}

Oracle Parameter Optimizer Tips



Database 19c



	[oracle@db04 ~](KKB012)$ ora params optimizer

	NAME					      VALUE		   DESCRIPTION
	--------------------------------------------- -------------------- ----------------------------------------------------------------------
	_db_file_optimizer_read_count		      8 		   multiblock read count for regular clients
	_optimizer_adaptive_cursor_sharing	      TRUE		   optimizer adaptive cursor sharing
	_optimizer_adaptive_plan_control	      0 		   internal controls for adaptive plans
	_optimizer_adaptive_plans_continuous	      FALSE		   enable continuously adaptive plans
	_optimizer_adaptive_plans_iterative	      FALSE		   enable iterative adaptive plans
	_optimizer_adaptive_random_seed 	      0 		   random seed for adaptive plans
	_optimizer_adjust_for_nulls		      TRUE		   adjust selectivity for null values
	_optimizer_ads_for_pq			      FALSE		   use ADS for parallel queries
	_optimizer_ads_max_table_count		      0 		   maximum number of tables in a join under ADS
	_optimizer_ads_result_cache_life	      3600		   result cache shelf life for ADS queries
	_optimizer_ads_spd_cache_owner_limit	      64		   Maximum number of directives under an owner in SPD cache
	_optimizer_ads_time_limit		      0 		   maximum time limit (seconds) under ADS
	_optimizer_ads_use_partial_results	      TRUE		   Use partial results of ADS queries
	_optimizer_ads_use_result_cache 	      TRUE		   use result cache for ADS queries
	_optimizer_ads_use_spd_cache		      TRUE		   use Sql Plan Directives for caching ADS queries
	_optimizer_aggr_groupby_elim		      TRUE		   group-by and aggregation elimination
	_optimizer_allow_all_access_paths	      TRUE		   allow all access paths
	_optimizer_ansi_join_lateral_enhance	      TRUE		   optimization of left/full ansi-joins and lateral views
	_optimizer_ansi_rearchitecture		      TRUE		   re-architecture of ANSI left, right, and full outer joins
	_optimizer_answering_query_using_stats	      FALSE		   enable statistics-based query transformation
	_optimizer_auto_index_allow		      AUTO		   Controls Auto Index
	_optimizer_autostats_job		      TRUE		   enable/disable auto stats collection job
	_optimizer_aw_join_push_enabled 	      TRUE		   Enables AW Join Push optimization
	_optimizer_aw_stats_enabled		      TRUE		   Enables statistcs on AW olap_table table function
	_optimizer_band_join_aware		      TRUE		   enable the detection of band join by the optimizer
	_optimizer_batch_table_access_by_rowid	      TRUE		   enable table access by ROWID IO batching
	_optimizer_better_inlist_costing	      ALL		   enable improved costing of index access using in-list(s)
	_optimizer_block_size			      8192		   standard block size used by optimizer
	_optimizer_bushy_cost_factor		      100		   cost factor for bushy join
	_optimizer_bushy_fact_dim_ratio 	      20		   bushy join dimension to fact ratio
	_optimizer_bushy_fact_min_size		      100000		   minimumm fact size for bushy join
	_optimizer_bushy_join			      off		   enables bushy join
	_optimizer_cache_stats			      FALSE		   cost with cache statistics
	_optimizer_cartesian_enabled		      TRUE		   optimizer cartesian join enabled
	_optimizer_cbqt_factor			      50		   cost factor for cost-based query transformation
	_optimizer_cbqt_no_size_restriction	      TRUE		   disable cost based transformation query size restriction
	_optimizer_cbqt_or_expansion		      ON		   enables cost based OR expansion
	_optimizer_ceil_cost			      TRUE		   CEIL cost in CBO
	_optimizer_cluster_by_rowid		      TRUE		   enable/disable the cluster by rowid feature
	_optimizer_cluster_by_rowid_batch_size	      100		   Sorting batch size for cluster by rowid feature
	_optimizer_cluster_by_rowid_batched	      TRUE		   enable/disable the cluster by rowid batching feature
	_optimizer_cluster_by_rowid_control	      129		   internal control for cluster by rowid feature mode
	_optimizer_coalesce_subqueries		      TRUE		   consider coalescing of subqueries optimization
	_optimizer_compare_plans_control	      0 		   compare plans controls for testing
	_optimizer_complex_pred_selectivity	      TRUE		   enable selectivity estimation for builtin functions
	_optimizer_compute_index_stats		      TRUE		   force index stats collection on index creation/rebuild
	_optimizer_connect_by_cb_whr_only	      FALSE		   use cost-based transformation for whr clause in connect by
	_optimizer_connect_by_combine_sw	      TRUE		   combine no filtering connect by and start with
	_optimizer_connect_by_cost_based	      TRUE		   use cost-based transformation for connect by
	_optimizer_connect_by_elim_dups 	      TRUE		   allow connect by to eliminate duplicates from input
	_optimizer_control_shard_qry_processing       65528		   control shard query processing
	_optimizer_correct_sq_selectivity	      TRUE		   force correct computation of subquery selectivity
	_optimizer_cost_based_transformation	      LINEAR		   enables cost-based query transformation
	_optimizer_cost_filter_pred		      FALSE		   enables  costing of filter predicates in IO cost model
	_optimizer_cost_hjsmj_multimatch	      TRUE		   add cost of generating result set when #rows per key > 1
	_optimizer_cost_model			      CHOOSE		   optimizer cost model
	_optimizer_cube_join_enabled		      TRUE		   enable cube join
	_optimizer_db_blocks_buffers		      0 		   optimizer value for _db_blocks_buffers
	_optimizer_degree			      0 		   force the optimizer to use the same degree of parallelism
	_optimizer_dim_subq_join_sel		      TRUE		   use join selectivity in choosing star transformation dimensions
	_optimizer_disable_strans_sanity_checks       0 		   disable star transformation sanity checks
	_optimizer_distinct_agg_transform	      TRUE		   Transforms Distinct Aggregates to non-distinct aggregates
	_optimizer_distinct_elimination 	      TRUE		   Eliminates redundant SELECT DISTNCT's
	_optimizer_distinct_placement		      TRUE		   consider distinct placement optimization
	_optimizer_dsdir_usage_control		      0 		   controls optimizer usage of dynamic sampling directives
	_optimizer_dyn_smp_blks 		      32		   number of blocks for optimizer dynamic sampling
	_optimizer_eliminate_filtering_join	      TRUE		   optimizer filtering join elimination enabled
	_optimizer_eliminate_subquery		      TRUE		   consider elimination of subquery optimization
	_optimizer_enable_density_improvements	      TRUE		   use improved density computation for selectivity estimation
	_optimizer_enable_extended_stats	      TRUE		   use extended statistics for selectivity estimation
	_optimizer_enable_plsql_stats		      TRUE		   Use statistics of plsql functions
	_optimizer_enable_table_lookup_by_nl	      TRUE		   consider table lookup by nl transformation
	_optimizer_enhanced_filter_push 	      TRUE		   push filters before trying cost-based query transformation
	_optimizer_enhanced_join_elimination	      TRUE		   Enhanced(12.2) join elimination
	_optimizer_extend_jppd_view_types	      TRUE		   join pred pushdown on group-by, distinct, semi-/anti-joined view
	_optimizer_extended_cursor_sharing	      UDO		   optimizer extended cursor sharing
	_optimizer_extended_cursor_sharing_rel	      SIMPLE		   optimizer extended cursor sharing for relational operators
	_optimizer_extended_stats_usage_control       192		   controls the optimizer usage of extended stats
	_optimizer_false_filter_pred_pullup	      TRUE		   optimizer false predicate pull up transformation
	_optimizer_fast_access_pred_analysis	      TRUE		   use fast algorithm to traverse predicates for physical optimizer
	_optimizer_fast_pred_transitivity	      TRUE		   use fast algorithm to generate transitive predicates
	_optimizer_feedback_control					   controls the optimizer feedback framework
	_optimizer_filter_pred_pullup		      TRUE		   use cost-based flter predicate pull up transformation
	_optimizer_filter_pushdown		      TRUE		   enable/disable filter predicate pushdown
	_optimizer_fkr_index_cost_bias		      10		   Optimizer index bias over FTS/IFFS under first K rows mode
	_optimizer_force_CBQT						   force CBQT transformation regardless of cost
	_optimizer_free_transformation_heap	      TRUE		   free transformation subheap after each transformation
	_optimizer_full_outer_join_to_outer	      TRUE		   enable/disable full outer to left outer join conversion
	_optimizer_gather_feedback		      TRUE		   optimizer gather feedback
	_optimizer_gather_stats_on_conventional_confi 0 		   settings for optimizer online stats gathering on conventional DML
	g

	_optimizer_gather_stats_on_conventional_dml   TRUE		   optimizer online stats gathering for conventional DML
	_optimizer_gather_stats_on_load 	      TRUE		   enable/disable online statistics gathering
	_optimizer_gather_stats_on_load_all	      FALSE		   enable/disable online statistics gathering for nonempty segments
	_optimizer_gather_stats_on_load_hist	      FALSE		   enable/disable online histogram gathering for loads
	_optimizer_gather_stats_on_load_index	      TRUE		   enable/disable online index stats gathering for loads
	_optimizer_generate_ptf_implied_preds	      TRUE		   Generate implied predicates for PTF
	_optimizer_generate_transitive_pred	      TRUE		   optimizer generate transitive predicates
	_optimizer_group_by_placement		      TRUE		   consider group-by placement optimization
	_optimizer_hll_entry			      4096		   number of entries in hll hash table
	_optimizer_hybrid_fpwj_enabled		      TRUE		   enable hybrid full partition-wise join when TRUE
	_optimizer_improve_selectivity		      TRUE		   improve table and partial overlap join selectivity computation
	_optimizer_inmemory_access_path 	      TRUE		   optimizer access path costing for in-memory
	_optimizer_inmemory_autodop		      TRUE		   optimizer autoDOP costing for in-memory
	_optimizer_inmemory_bloom_filter	      TRUE		   controls serial bloom filter for in-memory tables
	_optimizer_inmemory_capture_stored_stats      TRUE		   optimizer capture and store statistics for in-memory tables
	_optimizer_inmemory_cluster_aware_dop	      TRUE		   Affinitize DOP for inmemory objects
	_optimizer_inmemory_gen_pushable_preds	      TRUE		   optimizer generate pushable predicates for in-memory
	_optimizer_inmemory_minmax_pruning	      TRUE		   controls use of min/max pruning for costing in-memory tables
	_optimizer_inmemory_pruning_ratio_rows	      100		   in-memory pruning ratio for # rows (% of rows remaining after pruning)
	_optimizer_inmemory_quotient		      0 		   in-memory quotient (% of rows in in-memory format)
	_optimizer_inmemory_table_expansion	      TRUE		   optimizer in-memory awareness for table expansion
	_optimizer_inmemory_use_stored_stats	      AUTO		   optimizer use stored statistics for in-memory tables
	_optimizer_instance_count		      0 		   force the optimizer to use the specified number of instances
	_optimizer_interleave_jppd		      TRUE		   interleave join predicate pushdown during CBQT
	_optimizer_interleave_or_expansion	      TRUE		   interleave OR Expansion during CBQT
	_optimizer_invalidation_period		      18000		   time window for invalidation of cursors of analyzed objects
	_optimizer_join_elimination_enabled	      TRUE		   optimizer join elimination enabled
	_optimizer_join_factorization		      TRUE		   use join factorization transformation
	_optimizer_join_order_control		      3 		   controls the optimizer join order search algorithm
	_optimizer_join_sel_sanity_check	      TRUE		   enable/disable sanity check for multi-column join selectivity
	_optimizer_key_vector_aggr_factor	      75		   the required aggregation between IJK and DGK
	_optimizer_key_vector_payload		      TRUE		   enables or disables dimension payloads in vector transform
	_optimizer_key_vector_payload_dim_aggs	      FALSE		   enables or disables dimension payloading of aggregates in VT
	_optimizer_key_vector_pruning_enabled	      TRUE		   enables or disables key vector partition pruning
	_optimizer_key_vector_use_max_size	      1048576		   maximum key vector use size (in KB)
	_optimizer_max_permutations		      2000		   optimizer maximum join permutations per query block
	_optimizer_min_cache_blocks		      10		   set minimum cached blocks
	_optimizer_mjc_enabled			      TRUE		   enable merge join cartesian
	_optimizer_mode_force			      TRUE		   force setting of optimizer mode for user recursive SQL also
	_optimizer_multi_level_push_pred	      TRUE		   consider join-predicate pushdown that requires multi-level pushdown to
										base table

	_optimizer_multi_table_outerjoin	      TRUE		   allows multiple tables on the left of outerjoin
	_optimizer_multicol_join_elimination	      TRUE		   eliminate multi-column key based joins
	_optimizer_multiple_cenv					   generate and run plans using several compilation environments
	_optimizer_multiple_cenv_report 	      result		   control what to report in trace file when run in multi-plan mode
	_optimizer_multiple_cenv_stmt		      query		   control the types of statements that are run in multi-plan mode
	_optimizer_native_full_outer_join	      FORCE		   execute full outer join using native implementaion
	_optimizer_nested_rollup_for_gset	      100		   number of groups above which we use nested rollup exec for gset
	_optimizer_new_join_card_computation	      TRUE		   compute join cardinality using non-rounded input values
	_optimizer_nlj_hj_adaptive_join 	      TRUE		   allow adaptive NL Hash joins
	_optimizer_non_blocking_hard_parse	      TRUE		   enable non-blocking hard parse
	_optimizer_null_accepting_semijoin	      TRUE		   enables null-accepting semijoin
	_optimizer_null_aware_antijoin		      TRUE		   null-aware antijoin parameter
	_optimizer_or_expansion 		      DEPTH		   control or expansion approach used
	_optimizer_or_expansion_subheap 	      TRUE		   Use subheap for optimizer or-expansion
	_optimizer_order_by_elimination_enabled       TRUE		   Eliminates order bys from views before query transformation
	_optimizer_outer_join_to_inner		      TRUE		   enable/disable outer to inner join conversion
	_optimizer_outer_to_anti_enabled	      TRUE		   Enable transformation of outer-join to anti-join if possible
	_optimizer_partial_join_eval		      TRUE		   partial join evaluation parameter
	_optimizer_percent_parallel		      101		   optimizer percent parallel
	_optimizer_performance_feedback 	      OFF		   controls the performance feedback
	_optimizer_proc_rate_level		      BASIC		   control the level of processing rates
	_optimizer_proc_rate_source		      DEFAULT		   control the source of processing rates
	_optimizer_purge_stats_iteration_row_count    10000		   number of rows to be deleted at each iteration of the stats
										   purging process

	_optimizer_push_down_distinct		      0 		   push down distinct from query block to table
	_optimizer_push_pred_cost_based 	      TRUE		   use cost-based query transformation for push pred optimization
	_optimizer_quarantine_sql		      TRUE		   enable use of sql quarantine
	_optimizer_random_plan			      0 		   optimizer seed value for random plans
	_optimizer_reduce_groupby_key		      TRUE		   group-by key reduction
	_optimizer_reuse_cost_annotations	      TRUE		   reuse cost annotations during cost-based query transformation
	_optimizer_rownum_bind_default		      10		   Default value to use for rownum bind
	_optimizer_rownum_pred_based_fkr	      TRUE		   enable the use of first K rows due to rownum predicate
	_optimizer_save_stats			      TRUE		   enable/disable saving old versions of optimizer stats
	_optimizer_search_limit 		      5 		   optimizer search limit
	_optimizer_self_induced_cache_cost	      FALSE		   account for self-induced caching
	_optimizer_skip_scan_enabled		      TRUE		   enable/disable index skip scan
	_optimizer_skip_scan_guess		      FALSE		   consider index skip scan for predicates with guessed selectivity
	_optimizer_sortmerge_join_enabled	      TRUE		   enable/disable sort-merge join method
	_optimizer_sortmerge_join_inequality	      TRUE		   enable/disable sort-merge join using inequality predicates
	_optimizer_squ_bottomup 		      TRUE		   enables unnesting of subquery in a bottom-up manner
	_optimizer_star_tran_in_with_clause	      TRUE		   enable/disable star transformation in with clause queries
	_optimizer_star_trans_min_cost		      0 		   optimizer star transformation minimum cost
	_optimizer_star_trans_min_ratio 	      0 		   optimizer star transformation minimum ratio
	_optimizer_starplan_enabled		      TRUE		   optimizer star plan enabled
	_optimizer_stats_on_conventional_dml_sample_r 100		   sampling rate for online stats gathering on conventional DML
	ate

	_optimizer_strans_adaptive_pruning	      TRUE		   allow adaptive pruning of star transformation bitmap trees
	_optimizer_synopsis_min_size		      2 		   minimal synopsis size (kb)
	_optimizer_system_stats_usage		      TRUE		   system statistics usage
	_optimizer_table_expansion		      TRUE		   consider table expansion transformation
	_optimizer_trace			      none		   optimizer trace parameter
	_optimizer_track_hint_usage		      TRUE		   enable tracking of optimizer hint usage
	_optimizer_transitivity_retain		      TRUE		   retain equi-join pred upon transitive equality pred generation
	_optimizer_try_st_before_jppd		      TRUE		   try Star Transformation before Join Predicate Push Down
	_optimizer_undo_changes 		      FALSE		   undo changes to query optimizer
	_optimizer_undo_cost_change		      19.1.0		   optimizer undo cost change
	_optimizer_union_all_gsets		      TRUE		   Use Union All Optimization for Grouping Sets
	_optimizer_unnest_all_subqueries	      TRUE		   enables unnesting of every type of subquery
	_optimizer_unnest_corr_set_subq 	      TRUE		   Unnesting of correlated set subqueries (TRUE/FALSE)
	_optimizer_unnest_disjunctive_subq	      TRUE		   Unnesting of disjunctive subqueries (TRUE/FALSE)
	_optimizer_unnest_scalar_sq		      TRUE		   enables unnesting of of scalar subquery
	_optimizer_use_auto_indexes		      AUTO		   Use Auto Index
	_optimizer_use_cbqt_star_transformation       TRUE		   use rewritten star transformation using cbqt framework
	_optimizer_use_feedback 		      TRUE		   optimizer use feedback
	_optimizer_use_feedback_for_join	      FALSE		   optimizer use feedback for join
	_optimizer_use_gtt_session_stats	      TRUE		   use GTT session private statistics
	_optimizer_use_histograms		      TRUE		   enable/disable the usage of histograms by the optimizer
	_optimizer_use_stats_on_conventional_config   0 		   settings for optimizer usage of online stats on conventional DML
	_optimizer_use_stats_on_conventional_dml      TRUE		   use optimizer statistics gathered for conventional DML
	_optimizer_use_subheap			      TRUE		   Enables physical optimizer subheap
	_optimizer_use_table_scanrate		      HADOOP_ONLY	   Use Table Specific Scan Rate
	_optimizer_use_xt_rowid 		      TRUE		   Use external table rowid
	_optimizer_vector_base_dim_fact_factor	      200		   cost based vector transform base dimension to base fact ratio
	_optimizer_vector_cost_adj		      100		   cost adjustment for vector aggregation processing estimates
	_optimizer_vector_fact_dim_ratio	      10		   cost based vector transform dimension to fact ratio
	_optimizer_vector_fact_payload_ratio	      20		   cost based vector transform payload dimension to fact ratio
	_optimizer_vector_min_fact_rows 	      10000000		   min number of rows required for vector aggregation transform
	_optimizer_vector_transformation	      TRUE		   perform vector transform
	optimizer_adaptive_plans		      TRUE		   controls all types of adaptive plans
	optimizer_adaptive_reporting_only	      FALSE		   use reporting-only mode for adaptive optimizations
	optimizer_adaptive_statistics		      FALSE		   controls all types of adaptive statistics
	optimizer_capture_sql_plan_baselines	      FALSE		   automatic capture of SQL plan baselines for repeatable statements
	optimizer_dynamic_sampling		      2 		   optimizer dynamic sampling
	optimizer_features_enable		      19.1.0		   optimizer plan compatibility parameter
	optimizer_ignore_hints			      FALSE		   enables the embedded hints to be ignored
	optimizer_ignore_parallel_hints 	      FALSE		   enables embedded parallel hints to be ignored
	optimizer_index_caching 		      0 		   optimizer percent index caching
	optimizer_index_cost_adj		      100		   optimizer index cost adjustment
	optimizer_inmemory_aware		      TRUE		   optimizer in-memory columnar awareness
	optimizer_mode				      ALL_ROWS		   optimizer mode
	optimizer_secure_view_merging		      TRUE		   optimizer secure view merging and predicate pushdown/movearound
	optimizer_use_invisible_indexes 	      FALSE		   Usage of invisible indexes (TRUE/FALSE)
	optimizer_use_pending_statistics	      FALSE		   Control whether to use optimizer pending statistics
	optimizer_use_sql_plan_baselines	      TRUE		   use of SQL plan baselines for captured sql statements


	[oracle@db04 ~](KKB)$ 


	
Have a good work&life! 2019/05 via LinHong



