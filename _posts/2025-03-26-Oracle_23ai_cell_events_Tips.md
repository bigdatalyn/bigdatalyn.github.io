---
layout: post
title: "Oracle 23ai Cell events Tips"
category: 23ai
tags: Oracle 23ai Tips
---

* content
{:toc}

Oracle 23ai Cell events Tips

List the oracle 23ai cell events 

```sql
select name from v$statname where name like 'cell%';
```

### oracle 23ai cell events

```
SQL> select name from v$statname where name like 'cell%';

NAME
----------------------------------------------------------------
cell writes to flash cache
cell overwrites in flash cache
cell partial writes in flash cache
cell writes to flash cache for temp IO
cell physical IO interconnect bytes
cell RDMA reads
cell xrmem cache read hits
cell scans
cell blocks processed by cache layer
cell blocks processed by txn layer
cell blocks processed by data layer
cell blocks processed by index layer
cell filtered blocks failed block check
cell commit cache queries
cell transactions found in commit cache
cell blocks helped by commit cache
cell blocks helped by minscn optimization
cell chained rows skipped
cell chained rows processed
cell chained row pieces fetched
cell chained rows rejected
cell blocks sent
cell blocks pivoted
cell blocks returned by data layer
cell blocks returned by index layer
cell index blocks sent
cell blocks returned by external tables
cell spare1
cell spare2
cell IO uncompressed bytes
cell scan CUs pcode aggregation pushdown
cell scan rows pcode aggregated
cell scan CUs pcode selective done
cell scan CUs pcode pred evaled
cell scan CUs pcode pred evaled using rowsets
cell simulated physical IO bytes eligible for predicate offload
cell simulated physical IO bytes returned by predicate offload
cell index scans
cellmemory IM scan CUs processed for query
cellmemory IM scan CUs processed for capacity
cellmemory IM scan CUs processed no memcompress
cellmemory IM load CUs for query
cellmemory IM load CUs for capacity
cellmemory IM load CUs no memcompress
cellmemory IM scan CUs rejected for query
cellmemory IM scan CUs rejected for capacity
cellmemory IM scan CUs rejected no memcompress
cellmemory IM scan stat 1
cellmemory IM scan stat 2
cellmemory IM scan stat 3
cellmemory IM scan stat 4
cellmemory IM scan stat 5
cell flash cache read hits
cell flash cache read hits for controlfile reads
cell flash cache read hits for smart IO
cell flash cache read hits for temp IO
cell ram cache read hits
cell persistent memory IO read requests - local
cell persistent memory IO read requests - remote
cell persistent memory IO read requests - smart IO
cell physical write IO bytes eligible for offload
cell physical write IO host network bytes written during offloa
cell logical write IO requests
cell logical write IO requests eligible for offload
cell physical IO bytes saved during optimized file creation
cell physical IO bytes saved during optimized RMAN file restore
cell physical IO bytes eligible for predicate offload
cell physical IO bytes eligible for smart IOs
cell physical IO bytes saved by columnar cache
cell physical IO bytes saved by storage index
cell physical IO bytes added to storage index
cell physical IO bytes sent directly to DB node to balance CPU
cell physical IO bytes processed for IM capacity
cell physical IO bytes processed for IM query
cell physical IO bytes processed for no memcompress
cell num bytes in passthru due to quarantine
cell smart IO session cache lookups
cell smart IO session cache hits
cell smart IO session cache soft misses
cell smart IO session cache hard misses
cell smart IO session cache hwm
cell num smart IO sessions in rdbms block IO due to user
cell num smart IO sessions in rdbms block IO due to open fail
cell num smart IO sessions in rdbms block IO due to no cell mem
cell num smart IO sessions in rdbms block IO due to big payload
cell num smart IO sessions using passthru mode due to user
cell num smart IO sessions using passthru mode due to cellsrv
cell num smart IO sessions using passthru mode due to timezone
cell num smart file creation sessions using rdbms block IO mode
cell num block IOs due to a file instant restore in progress
cell physical IO interconnect bytes returned by smart scan
cell num bytes in passthru during predicate offload
cell num bytes in block IO during predicate offload
cell num fast response sessions
cell num fast response sessions continuing to smart scan
cell num smartio automem buffer allocation attempts
cell num smartio automem buffer allocation failures
cell num smartio transient cell failures
cell num smartio permanent cell failures
cell num bytes of IO reissued due to relocation
cell physical write bytes saved by smart file initialization
cell bytes saved by metadata compression
cell XT granules requested for predicate offload
cell XT granule bytes requested for predicate offload
cell interconnect bytes returned by XT smart scan
cell XT granule predicate offload retries
cell XT granule IO bytes saved by storage index
cell num map elem cancellation
cell statistics spare1
cell XT granule IO bytes saved by HDFS tbs extent map scan
cell RDMA writes
cell xrmem cache writes
cell physical read IO requests for temp IO
cell temp IO flash cache read latency (ms)
cell temp IO flash cache read queue time (ms)
cell physical write IO requests for temp IO
cell temp IO flash cache write latency (ms)
cell temp IO flash cache write queue time (ms)
cell xrmem log writes
cell IOT leaf blocks filtered
cell IOT leaf blocks not filtered: nonkey where
cell IOT rows returned
cell IOT compressed leaf blocks filtered
cell index leaf blocks filtered
cell index compressed leaf blocks filtered
cell index rows returned
cell IO bytes returned by external table
cell scan CUs pcode gby abort card
cell scan CUs pcode vector project rowsets
cell IOT scans
cellmemory IM scan column CUs format dict
cellmemory IM scan column CUs format rle dict
cellmemory IM scan column CUs format non-dict
cellmemory IM scan column CUs format null
cellmemory IM scan column CUs format constant
cellmemory IM scan column path value index
cellmemory IM hpk bloom filter nrows
cellmemory IM bloom filter returned nrows
cellmemory IM bloom filter total calls
cellmemory IM simd bloom filter calls
cellmemory HCC simd compare calls
cellmemory HCC simd decode calls
cellmemory HCC simd rle burst calls
cellmemory HCC simd set membership calls
cellmemory HCC simd xlate filter calls
cellmemory HCC simd decode unpack calls
cellmemory HCC simd decode symbol calls
cell connects
cell RDMA reads eligible
cell RDMA read hash table probes
cell RDMA reads issued
cell RDMA probe failures - hash table buffer allocation failed
cell RDMA probe failures - IPCDAT metadata allocation failed
cell RDMA probe failures - IPCDAT errors
cell RDMA read failures - lease expired
cell RDMA reads - Exascale RPM incarnation matched
cell RDMA read failures - invalid Exascale RPM ID or GUID
cell RDMA reads rejected - ineligible
cell RDMA read failures - client registration errors
cell physical IO bytes saved during smart incremental backup
cell IO retries due to buffer allocation failures
cell num bytes in filter passthru due to low mem
cell num bytes in filter passthru due to subheap size limit exc
cell IMC population jobs submitted
cell IMC population jobs succeeded
cell IMC population jobs failed
cell physical IO bytes processed for XrCC
cell smart IO foreground CPU time (msec)
cell smart IO background CPU time (msec)
cell num smart IO sessions using IVF scan optimization
cell num smart IO sessions in rdbms block IO due to online encr
cell bytes rejected by fplib
cell bytes rejected by fplib due to transaction layer checks
cell bytes rejected by fplib due to HCC being disabled
cell bytes rejected by fplib due to unknown crypto mode
cell bytes rejected by fplib due to unsuccessful decryption
cell bytes rejected by fplib due to unsuccessful block check
cell bytes rejected by fplib due to byte order conversion
cell bytes rejected by fplib due to presence of chained rows
cell bytes rejected by fplib due to blocks being quarantined
cell bytes rejected by fplib due to processing timeout
cell bytes rejected by fplib due to other reasons

182 rows selected.

SQL> 

```

### Ref


Have a good work&life! 2025/03 via LinHong
