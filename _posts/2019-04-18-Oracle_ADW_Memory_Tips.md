---
layout: post
title: "Oracle ADW Memory Tips"
category: Oracle
tags: Oracle ADW Tips
---

* content
{:toc}

Oracle ADW Memory Tips

Oracle ADW 内存相关的 Tips










### ADW 内存相关

ADW内存大小与ocpu个数相关，成比例

	`ADW: sga_target=3.4GB pga_aggregate_target=5.1GB / 1ocpu`
	
	SQL> !date
	Thu Apr 18 03:45:27 GMT 2019
	SQL>
	SQL> show parameter cpu_count
	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	cpu_count                            integer     1
	SQL> show parameter sga_target
	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	sga_target                           big integer 3400M
	SQL> show parameter pga_aggregate_target
	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	pga_aggregate_target                 big integer 5100M
	SQL>


能手动刷新flushcache吗？

	SQL> show user;
	USER is "ADMIN"
	SQL> alter system flush buffer_cache;
	alter system flush buffer_cache
	*
	ERROR at line 1:
	ORA-01031: insufficient privileges
	SQL>

要刷新cache的话，可以通过重启instance就行刷cache

另外ADW默认result_cache是开启的,在测试评估中可以通过  /*+ NO_RESULT_CACHE */  的hint方式执行sql对比有无result_cache的执行结果。ATP则没有设置



	SQL> show parameter result_cache

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	client_result_cache_lag              big integer 3000
	client_result_cache_size             big integer 0
	result_cache_max_result              integer     1
	result_cache_max_size                big integer 10M
	result_cache_mode                    string      FORCE
	result_cache_remote_expiration       integer     0
	SQL>

ADW可以使用 In-Memory Columnar Caching(DBIM)

从18c开始，只要设置inmemory_size参数大小即可是存储服务器上的In-Memory Columnar Caching

注意是在Storage Server上，并不是DB Server!参考如下文档

[7.9 Enabling or Disabling In-Memory Columnar Caching on Storage Servers ](https://docs.oracle.com/en/engineered-systems/exadata-database-machine/sagug/exadata-storage-server-monitoring.html#GUID-76E92D13-C65B-4B74-B92D-2AA01D923902)
	
Have a good work&life! 2019/03 via LinHong



