---
layout: post
title: "Oracle Flash Cache Hit Tips"
category: Oracle
tags: Oracle Flash Tips 
---

* content
{:toc}

Oracle Flash Cache Hit Tips


#### Database Smart Flash Cache

Ref:

Oracle Database 11g Release 2に関する10の重要なこと – askTom Live -

[Point8：　Flash Cache 【Database Smart Flash Cache】](https://www.oracle.com/technetwork/jp/articles/point8-154962-ja.html)

	現在のところフラッシュキャッシュはOracle Enterprise LinuxとSolaris版(SPARC/x64)のOracle Database Enterprise Editionのみで使える機能です。

	また、Oracle Exadataに実装されているExadata Smart Flash Cacheと混同してしまう方がいるかもしれません。
	ここで説明したフラッシュキャッシュ（Database Smart Flash Cache）は、Oracle Exadataのそれとはまったく別の、独立した機能です。データベース・サーバー上でバッファキャッシュとともに利用するもので、ストレージレベルの機能ではありません。



![Flash_cache_hit]({{ "/files/Oracle/19c/AWR_Flash_cache_hit.png"}})




#### Exadata Smart Flash Cache

Ref:

[Exadata Smart Flash Cache](http://www.oracle.com/us/solutions/exadata-smart-flash-cache-366203.pdf)

	Oracle's Exadata Smart Flash Cache features areunique. Exadata Flash storageis not a disk replacement–Exadata software intelligence determines how and when to use the Flash storage, and how best to incorporate Flash into the database as part of a coordinated data caching strategy. Scale out Exadata storage enables the benefits of flash performance to be delivered all the way to the application. Traditionalstorage arrays have many internal and network bottlenecks that prevent realizing the benefits of flash. Flash can be added to storage arrays, but they cannotdeliver much of the potential performance to applications.

[6.2.4 Monitoring Flash Cache Metrics](https://docs.oracle.com/en/engineered-systems/exadata-database-machine/sagug/exadata-storage-server-monitoring.html#GUID-CF5EFCD7-FEA2-4DF8-AA19-1DDF5E5543CF)

	Flash cache metrics provide information about the utilization of flash cache, such as the number of megabytes read per second from flash cache.



#### Some Calculations

Some SQL tips:

	select * from DBA_HIST_SYSSTAT where STAT_NAME like '%cell flash cache read hits%';
	select * from DBA_HIST_SYSSTAT where STAT_NAME like '%physical read IO requests%';
	select * from DBA_HIST_SYSSTAT where STAT_NAME like '%temp file%';

Flash Cache Hit %

In Oracle 12.1

	================================================================================================
	cell flash cache read hits' / ('physical read IO requests' - direct reads from temp files)
	================================================================================================

Some issue:  

	Bug 22152474 - AWR REPORT: FLASH CACHE HIT% > 100
	
	Did not use (cell flash cache read hits for controlfilereads), will lead the result wrong.
	
In Oracle 12.2

	================================================================================================
	('cell flash cache read hits' - 'cell flash cache read hits for controlfile reads') / ('physical read IO requests' - direct reads from temp files)
	================================================================================================

Some issue:

	Bug 26986779 - NEGATIVE VALUE FLASH CACHE HIT% IN AWR







Have a good work&life! 2020/03 via LinHong


