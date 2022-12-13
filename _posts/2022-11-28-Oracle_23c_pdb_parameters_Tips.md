---
layout: post
title: "Oracle 23c PDB parameters Tips"
category: Oracle
tags: Oracle 23c Tips
---

* content
{:toc}

Oracle 23c PDB parameters Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	









### 23c PDB ISPDB_MODIFIABLE parameters

```
SYS@cdb1> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 PDB1 			  READ WRITE NO
SYS@cdb1> select name,con_id,ISPDB_MODIFIABLE from v$system_parameter where con_id=3;

NAME				   CON_ID ISPDB_MODIFIABLE
--------------------------------- ------- ----------------
cpu_min_count				3 TRUE
sga_min_size				3 TRUE
shared_pool_size			3 TRUE
resource_manager_plan			3 TRUE
db_performance_profile			3 TRUE
sga_target				3 TRUE
db_cache_size				3 TRUE
txn_high_priority_wait_target		3 TRUE
txn_medium_priority_wait_target 	3 TRUE
undo_tablespace 			3 TRUE
undo_retention				3 TRUE
fast_start_parallel_rollback		3 TRUE
ldap_directory_access			3 TRUE
tde_configuration			3 TRUE
identity_provider_type			3 TRUE
identity_provider_config		3 TRUE
private_temp_table_prefix		3 TRUE
result_cache_max_temp_size		3 TRUE
result_cache_max_temp_result		3 TRUE
unified_audit_systemlog 		3 TRUE
parallel_servers_target 		3 TRUE
spatial_vector_acceleration		3 TRUE
common_user_prefix			3 TRUE
shrd_dupl_table_refresh_rate		3 TRUE
multishard_query_data_consistency	3 TRUE
multishard_query_partial_results	3 TRUE
shard_queries_restricted_by_key 	3 TRUE

27 rows selected.

SYS@cdb1> 

```

### Reference

[Oracle Beta Programs](https://tinyurl.com/OracleBeta)

[Oracle Database 23c Beta Program](https://blogs.oracle.com/database/post/oracle-database-23c-beta-program)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/10 via LinHong


