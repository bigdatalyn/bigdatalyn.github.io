---
layout: post
title: "Oracle 19c 21c parameter different Tips"
category: Oracle
tags: Oracle 21c Tips
---

* content
{:toc}

Oracle 19c 21c parameter different Tips


### 19c and 21c parameters diff


![parameters]({{ "/files/Oracle/21c/19c_21c_parameter_diff.png"}})

<p>parameters<br>
<iframe id="parameters" src="/files/Oracle/21c/19c_21c_parameter_diff.html" width="800" height="200"></iframe></p>
<p>&nbsp;</p>


### hidden parameters between 19c and 21c



<p>hidden parameters<br>
<iframe id="parameters" src="/files/Oracle/21c/19c_21c_hidden_parameter_diff.html" width="800" height="800"></iframe></p>
<p>&nbsp;</p>



The Persistent Memory Database feature includes directly mapped buffer cache and Persistent Memory Filestore (PMEM Filestore).

Persistent Memory Database feature should be very much expected to be applied.

- PMEM_FILESTORE 

[2.289 PMEM_FILESTORE](https://docs.oracle.com/en/database/oracle/oracle-database/21/refrn/PMEM_FILESTORE.html#GUID-9A958EBA-9010-423A-BC73-96A4E6C27E4F)


mount_point: The operating system directory path for the mount point of the PMEM Filestore

backing_file: The operating system file path for the backing file of the PMEM Filestore

[9.125 V$PMEM_FILESTORE](https://docs.oracle.com/en/database/oracle/oracle-database/21/refrn/V-PMEM_FILESTORE.html#GUID-0C6B524A-34B6-4BF2-B874-EDFAFB946F2F)


[16.3 Creating a PMEM Filestore for an Oracle Database](https://docs.oracle.com/en/database/oracle/oracle-database/21/admin/using-PMEM-db-support.html#GUID-E5D17A8C-D508-4A50-8774-9AAA85562621)

Other pmem hidden parameters：
```
__db_pmem_direct_map_size_metadata
_db_cache_pmem_confidence_try
_db_cache_pmem_promotion_touch_rate_reset_interval
_db_cache_pmem_promotion_touch_rate_threshold_time
_db_cache_pmem_touch_rate_compare_per
_db_cache_pmemp_len
_db_pmem_auto_resize_interval
_db_pmem_direct_map_siz
_direct_io_via_mapped_pmem
_enable_pmem_direct_cache
_enable_pmem_exchange
_enable_pmem_prefetch
_exa_pmemlog_threshold_usec
_force_pmem_direct_mapped_cache_scan
_pmem_exchange_cold_victim_threshold
_pmem_small_table_threshold
_pmemfs_alloc_dataptrs
_pmemfs_enable_spacetracking
_pmemfs_shrink_level
_pmemfs_smallfile_threshold

```




Have a good work&life! 2021/08 via LinHong
