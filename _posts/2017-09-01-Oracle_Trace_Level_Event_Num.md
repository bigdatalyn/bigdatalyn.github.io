---
layout: post
title: "[转]Oracle Trace Level Event Numbers"
category: Oracle
tags: Oracle Trace Number 
---

* content
{:toc}

Oracle Trace Level Event Numbers 

Oracle 诊断事件编码及内容列表：







如下：

	10000 control file debug event
	10001 control file crash event1
	10002 control file crash event2
	10003 control file crash event3
	10004 control file crash event4
	10005 trace latch operations for debugging
	10006 testing – block recovery forced
	10007 log switch debug crash after new log select, thread %s
	10008 log switch debug crash after new log header write, thread %s
	10009 log switch debug crash after old log header write, thread %s
	10010 Begin Transaction
	10011 End Transaction
	10012 Abort Transaction
	10013 Instance Recovery
	10014 Roll Back to Save Point
	10015 Undo Segment Recovery
	10016 Undo Segment extend
	10017 Undo Segment Wrap
	10018 Data Segment Create
	10019 Data Segment Recovery
	10020 partial link restored to linked list (KSG)
	10021 latch cleanup for state objects (KSS)
	10022 trace ktsgsp
	10023 Create Save Undo Segment
	10024 Write to Save Undo
	10025 Extend Save Undo Segment
	10026 Apply Save Undo
	10027 latch cleanup for enqueue locks (KSQ)
	10028 latch cleanup for enqueue resources (KSQ)
	10029 session logon (KSU)
	10030 session logoff (KSU)
	10031 row source debug event (R*)
	10032 sort end (SOR*)
	10035 parse SQL statement (OPIPRS)
	10036 create remote row source (QKANET)
	10037 allocate remote row source (QKARWS)
	10038 dump row source tree (QBADRV)
	10039 type checking (OPITCA)
	10040 dirty cache list
	10041 dump undo records skipped
	10042 trap error during undo application
	10044 free list undo operations
	10045 “free list update operations – ktsrsp, ktsunl”
	10046 enable SQL statement timing
	10047 trace switching of sessions
	10048 Undo segment shrink
	10049 protect library cache memory heaps
	10050 sniper trace
	10051 trace OPI calls
	10052 don’t clean up obj$
	10053 CBO Enable optimizer trace
	10054 trace UNDO handling in MLS
	10055 trace UNDO handing
	10056 dump analyze stats (kdg)
	10057 suppress file names in error messages
	10058 use table scan cost in tab$.spare1
	10060 CBO Enable predicate dump
	10061 disable SMON from cleaning temp segment
	10062 disable usage of OS Roles in osds
	10063 disable usage of DBA and OPER privileges in osds
	10064 “thread enable debug crash level %s, thread %s”
	10065 limit library cache dump information for state object dump
	10066 simulate failure to verify file
	10067 force redo log checksum errors – block number
	10068 force redo log checksum errors – file number
	10069 Trusted Oracle test event
	10070 force datafile checksum errors – block number
	10071 force datafile checksum errors – file number
	10072 protect latch recovery memory
	10073 have PMON dump info before latch cleanup
	10074 default trace function mask for kst
	10075 CBO Disable outer-join to regular join conversion
	10076 CBO Enable cartesian product join costing
	10077 CBO Disable view-merging optimization for outer-joins
	10078 CBO Disable constant predicate elimination optimization
	10080 dump a block on a segment list which cannot be exchanged
	10081 segment High Water Mark has been advanced
	10082 free list head block is the same as the last block
	10083 a brand new block has been requested from space management
	10084 free list becomes empty
	10085 free lists have been merged
	10086 CBO Enable error if kko and qka disagree on oby sort
	10087 disable repair of media corrupt data blocks
	10088 CBO Disable new NOT IN optimization
	10089 CBO Disable index sorting
	10090 invoke other events before crash recovery
	10091 CBO Disable constant predicate merging
	10092 CBO Disable hash join
	10093 CBO Enable force hash joins
	10094 before resizing a data file
	10095 dump debugger commands to trace file
	10096 after the cross instance call when resizing a data file
	10097 after generating redo when resizing a data file
	10098 after the OS has increased the size of a data file
	10099 after updating the file header with the new file size
	10100 after the OS has decreased the size of a data file
	10101 atomic redo write recovery
	10102 switch off anti-joins
	10103 CBO Disable hash join swapping
	10104 dump hash join statistics to trace file
	10105 CBO Enable constant pred trans and MPs w WHERE-clause
	10106 CBO Disable evaluating correlation pred last for NOT IN
	10107 CBO Always use bitmap index
	10108 CBO Don’t use bitmap index
	10109 CBO Disable move of negated predicates
	10110 CBO Try index rowid range scans
	10111 Bitmap index creation switch
	10112 Bitmap index creation switch
	10113 Bitmap index creation switch
	10114 Bitmap index creation switch
	10115 CBO Bitmap optimization use maximal expression
	10116 CBO Bitmap optimization switch
	10117 CBO Disable new parallel cost model
	10118 CBO Enable hash join costing
	10119 QKA Disable GBY sort elimination
	10120 CBO Disable index fast full scan
	10121 CBO Don’t sort bitmap chains
	10122 CBO disable count(col) => count(*) transformation
	10123 QKA Disable Bitmap And-EQuals
	10145 test auditing network errors
	10146 enable Oracle TRACE collection
	10200 block cleanout
	10201 consistent read undo application
	10202 consistent read block header
	10203 consistent read buffer status
	10204 signal recursive extend
	10205 row cache debugging
	10206 transaction table consistent read
	10207 consistent read transactions’ status report
	10208 consistent read loop check
	10209 enable simulated error on control file
	10210 check data block integrity
	10211 check index block integrity
	10212 check cluster integrity
	10213 crash after control file write
	10214 simulate write errors on control file
	10215 simulate read errors on control file
	10216 dump control file header
	10217 debug sequence numbers
	10218 dump uba of applied undo
	10219 monitor multi-pass row locking
	10220 show updates to the transaction table
	10221 show changes done with undo
	10222 row cache
	10223 transaction layer – turn on verification codes
	10226 trace CR applications of undo for data operations
	10227 verify (multi-piece) row structure
	10228 trace application of redo by kcocbk
	10230 check redo generation by copying before applying
	10231 skip corrupted blocks on _table_scans_
	10232 dump corrupted blocks symbolically when kcbgotten
	10233 skip corrupted blocks on index operations
	10234 trigger event after calling kcrapc to do redo N times
	10235 check memory manager internal structures
	10236 library cache manager
	10237 simulate ^C (for testing purposes)
	10238 instantiation manager
	10239 multi-instance library cache manager
	10240 dump dba’s of blocks that we wait for
	10241 dump SQL generated for remote execution (OPIX)
	10243 simulated error for test %s of K2GTAB latch cleanup
	10244 make tranids in error msgs print as 0.0.0 (for testing)
	10245 simulate lock conflict error for testing PMON
	10246 print trace of PMON actions to trace file
	10247 Turn on scgcmn tracing. (VMS ONLY)
	10248 turn on tracing for dispatchers
	10249 turn on tracing for multi-stated servers
	10250 Trace all allocate and free calls to the topmost SGA heap
	10251 check consistency of transaction table and undo block
	10252 simulate write error to data file header
	10253 simulate write error to redo log
	10254 trace cross-instance calls
	10256 turn off multi-threaded server load balancing
	10257 trace multi-threaded server load balancing
	10258 force shared servers to be chosen round-robin
	10259 get error message text from remote using explicit call
	10260 Trace calls to SMPRSET (VMS ONLY)
	10261 Limit the size of the PGA heap
	10262 Don’t check for memory leaks
	10263 Don’t free empty PGA heap extents
	10264 Collect statistics on context area usage (x$ksmcx)
	10265 Keep random system generated output out of error messages
	10266 Trace OSD stack usage
	10267 Inhibit KSEDMP for testing
	10268 Don’t do forward coalesce when deleting extents
	10269 Don’t do coalesces of free space in SMON
	10270 Debug shared cursors
	10271 distributed transaction after COLLECT
	10272 distributed transaction before PREPARE
	10273 distributed transaction after PREPARE
	10274 distributed transaction before COMMIT
	10275 distributed transaction after COMMIT
	10276 distributed transaction before FORGET
	10277 Cursor sharing (or not) related event (used for testing)
	10281 maximum time to wait for process creation
	10282 Inhibit signalling of other backgrounds when one dies
	10286 Simulate control file open error
	10287 Simulate archiver error
	10288 Do not check block type in ktrget
	10289 Do block dumps to trace file in hex rather than fromatted
	10290 kdnchk – checkvalid event – not for general purpose use.
	10291 die in dtsdrv to test controlfile undo”
	10292 dump uet entries on a 1561 from dtsdrv”
	10293 dump debugging information when doing block recovery”
	10294 enable PERSISTENT DLM operations on non-compliant systems”
	10300 disable undo compatibility check at database open
	10301 Enable LCK timeout table consistency check”
	10320 Enable data layer (kdtgrs) tracing of space management calls”
	10352 report direct path statistics
	10353 number of slots
	10354 turn on direct read path for parallel query
	10355 turn on direct read path for scans
	10356 turn on hint usage for direct read
	10357 turn on debug information for direct path
	10374 parallel query server interrupt (validate lock value)
	10375 turn on checks for statistics rollups
	10376 turn on table queue statistics
	10377 turn off load balancing
	10379 direct read for rowid range scans (unimplemented)
	10380 kxfp latch cleanup testing event
	10381 kxfp latch cleanup testing event
	10382 parallel query server interrupt (reset)
	10383 auto parallelization testing event
	10384 parallel dataflow scheduler tracing
	10385 parallel table scan range sampling method
	10386 parallel SQL hash and range statistics
	10387 parallel query server interrupt (normal)
	10388 parallel query server interrupt (failure)
	10389 parallel query server interrupt (cleanup)
	10390 Trace parallel query slave execution
	10391 trace rowid range partitioning
	10392 parallel query debugging bits
	10393 print parallel query statistics
	10394 allow parallelization of small tables
	10395 adjust sample size for range table queues
	10396 circumvent range table queues for queries
	10397 suppress verbose parallel coordinator error reporting
	10398 enable timeouts in parallel query threads
	10399 use different internal maximum buffer size
	10400 turn on system state dumps for shutdown debugging
	10500 turn on traces for SMON
	10510 turn off SMON check to offline pending offline rollbacksegment
	10511 turn off SMON check to cleanup undo dictionary
	10512 turn off SMON check to shrink rollback segments
	10513 Disable SMON transaction cleanup
	10600 check cursor frame allocation
	10602 cause an access violation (for testing purposes)
	10603 cause an error to occur during truncate (for testing purposes)
	10604 trace parallel create index
	10605 enable parallel create index by default
	10606 trace parallel create index
	10607 trace index rowid partition scan
	10608 trace create bitmap index
	10610 trace create index pseudo optimizer
	10666 Do not get database enqueue name
	10667 Cause sppst to check for valid process ids
	10690 Set shadow process core file dump type (Unix only)
	10691 Set background process core file type (Unix only)
	10700 Alter access violation exception handler
	10701 Dump direct loader index keys
	10702 Enable histogram data generation
	10703 Simulate process death during enqueue get
	10704 Print out information about what enqueues are being obtained
	10706 Print out information about instance lock manipulation
	10707 Simulate process death for instance registration
	10708 Print out Tracing information for skxf multi instance comms
	10709 enable parallel instances in create index by default
	10710 trace bitmap index access
	10711 trace bitmap index merge
	10712 trace bitmap index or
	10713 trace bitmap index and
	10714 trace bitmap index minus
	10715 trace bitmap index conversion to rowids
	10800 disable Smart Disk scan
	10801 enable Smart Disk trace
	10802 reserved for Smart Disk
	10803 write timing statistics on OPS recovery scan
	10804 reserved for ksxb
	10805 reserved for row source sort
	10900 extent manager fault insertion event #%s
	10924 import storage parse error ignore event
	10925 trace name context forever
	10926 trace name context forever
	10927 trace name context forever
	10928 trace name context forever
	10999 do not get database enqueue name