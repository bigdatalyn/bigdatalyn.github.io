---
layout: post
title: "Oracle Exadata Smart Flash Cache Tips"
category: Oracle
tags: Oracle Exadata Flash Tips 
---

* content
{:toc}

Oracle Exadata Smart Flash Cache Tips


#### Flash cache mode WriteThrough and WriteBack

The default flash cache mode is WriteThrough on X4 and earlier systems.

Since April 2017, Oracle Exadata Deployment Assistant (OEDA) enables Write-Back Flash Cache by default if the following conditions are met:
1. GI and DB home must be
    11.2.0.4.1 or higher
    12.1.0.2 or higher
    12.2.0.2 or higher
AND
2. DATA diskgroup has HIGH redundancy

From Exadata Storage Server release 11.2.3.2.0, Exadata Smart Flash Cache can operate either as a Write-through cache or a Write-back cache. 
Write-through mode is best suited for random repeated reads commonly found in OLTP applications. 
Write-back mode is best suited for write-intensive applications.

Write-Through -> first write to physical disks and then to flash cache for faster reads.
Write-Back -> first write to flash cache and then to physical disk for both faster reads and writes. 










#### Examine how the flash cache is being used.

V$SYSSTAT contains some new statistics showing the number of blocks added to the cache and the number of "hits" that were satisfied from cache.

	SELECT name,value
	FROM v$sysstat
	WHERE name IN
	('physical read flash cache hits',
	'physical reads',
	'consistent gets',
	'db block gets',
	'flash cache inserts');

#### Examine the contents of the cache.

V$BH contains some new statistics and view Buffers in the flash cache have STATUS values such as 'flashcur', allowing us to count the buffers from each object in the main buffer cache and in the flash cache.

	SELECT owner || '.' || object_name object,
	SUM (CASE WHEN b.status LIKE 'flash%' THEN 1 END) flash_blocks,
	SUM (CASE WHEN b.status LIKE 'flash%' THEN 0 else 1 END) cache_blocks,
	count(*) total_blocks
	FROM v$bh b JOIN dba_objects
	ON (objd = object_id)
	GROUP BY owner, object_name
	order by 4 desc;


#### Check Smart Flash Cache is configured or run the exachk report

	exadcli -c cell01,cell02,cell03 -l celladministrator list flashcache detail

#### Check Smart Fusion Block Transfer

	Check following parameter is set in DB 

	static parameter "_cache_fusion_pipelined_updates" to TRUE on all Oracle RAC nodes
	"exafusion_enabled" parameter to 1 on all Oracle RAC instances


#### When to Configure the Flash Cache

You can consider adding the flash cache when all of the following are true:

	Your database is running on the Solaris or Oracle Linux operating systems.
	The flash cache is supported on these operating systems only.

	The Buffer Pool Advisory section of your Automatic Workload Repository (AWR) report or STATSPACK report indicates that doubling the size of the buffer cache would be beneficial.

	db file sequential read is a top wait event.

	You have spare CPU.


#### Sizing the Flash Cache

Sizing the Flash Cache

	As a general rule, size the flash cache to be between 2 times and 10 times the size of the buffer cache. Any multiplier less than two would not provide any benefit. If you are using automatic shared memory management, make the flash cache between 2 times and 10 times the size of SGA_TARGET. Using 80% of the size of SGA_TARGET instead of the full size would also suffice for this calculation.


#### Objects in Exadata Smart Flash Cache or Buffer cache.

The following command could be used to direct that pages from the table CUSTOMERS remain in Exadata Smart Flash Cache, once they are there:

	ALTER TABLE customers STORAGE (CELL_FLASH_CACHE KEEP);

It should NOT immediate cached in the flash cache, it should be kept in it once it was there.

If we want the tables to be cached , we can cache them in buffer_cache.

	SQL> ALTER TABLE customers CACHE;

It will be cached in general buffer cache once DB is started.




#### Reference 

How To Identify The Objects That Are Using Exadata Smart Flash Cache In A Query (Doc ID 2179564.1)

exachk Reports Storage Server Flash Memory Is Not Configured As Exadata Smart Flash Cache (Doc ID 1989340.1)

http://www.oracle.com/technetwork/articles/systems-hardware-architecture/oracle-db-smart-flash-cache-175588.pdf

NOTE:1317950.1 - How To Size the Database Smart Flash Cache

http://www.oracle.com/us/solutions/exadata-smart-flash-cache-366203.pdf







Have a good work&life! 2020/03 via LinHong


