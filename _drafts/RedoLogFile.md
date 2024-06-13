### Checkpoint Activity Stats
Checkpoint Tuning and Troubleshooting Guide (Doc ID 147468.1)

Checkpoint Performance
Frequent checkpoints will enable faster recovery, but can cause performance degradation. A Checkpoint might be a costly operation when the number of files are huge since it has to freeze the datafile headers during the process. There is a performance trade-off regarding frequency of checkpoints.
More frequent checkpoints enable faster database recovery after a crash. This is why some customer sites which have a very low tolerance for unscheduled system downtime will often choose this option. However, the performance degradation of frequent checkpoints may not justify this philosophy in many cases. Let's assume the database is up and running 95% of the time, and unavailable 5% of the time from frequent instance crashes or hardware failures requiring database recovery. For most customer sites, it makes more sense to tune for the 95% case rather than the rare 5% downtime.
Checkpoint occurs at every log switch. Hence frequent log switches will start the checkpoints and may degrade the performance. If a previous checkpoint is already in progress, the checkpoint forced by the log switch will override the current checkpoint. This necessitates well-sized redo logs to avoid unnecessary checkpoints as a result of frequent log switches. A good rule of thumb is to switch logs at most every twenty minutes. Having your log files too small can increase checkpoint activity and reduce performance. Oracle recommends the user to set all online log files to be the same size, and have at least two log groups per thread.
Set the value of FAST_START_MTTR_TARGET to 3600. This enables Fast-Start checkpointing and the Fast-Start Fault Recovery feature, but minimizes its effect on run-time performance while avoiding the need for performance tuning of FAST_START_MTTR_TARGET.
ref:Primary Note: Overview of Database Checkpoints (Doc ID 1490838.1)

```
ttitle lef 'Checkpoint Activity ' -
'DB/Inst: ' db_name '/' inst_name ' '-
'Snaps: ' format 99999999 begin_snap '-' format 99999999 end_snap -
skip 1 -
'-> Total Physical Writes: ' format 999,999,999,999 nphyw -
skip 2;

column wmttr format 99,999,999 heading 'MTTR|Writes' just c
column wlgsz format 99,999,999 heading 'Log Size|Writes' just c
column wlcs format 99,999,999 heading 'Log Ckpt|Writes' just c
column wos format 99,999,999 heading 'Other|Settings|Writes' just c
column wat format 99,999,999 heading 'Autotune|Ckpt|Writes' just c
column wftc format 99,999,999 heading 'Thread|Ckpt|Writes' just c


select e.writes_mttr - b.writes_mttr wmttr
, e.writes_logfile_size - b.writes_logfile_size wlgsz
, e.writes_log_checkpoint_settings - b.writes_log_checkpoint_settings wlcs
, e.writes_other_settings - b.writes_other_settings wos
, e.writes_autotune - b.writes_autotune wat
, e.writes_full_thread_ckpt - b.writes_full_thread_ckpt wftc
from dba_hist_instance_recovery b
, dba_hist_instance_recovery e
where b.snap_id = :bid
and e.snap_id = :eid
and e.instance_number = :inst_num
and e.dbid = :dbid
and b.instance_number = e.instance_number
and b.dbid = e.dbid;

```
### REDO LOG FILE

Redo log file is undersized, and log switches happens too frequently. When wrapping cannot be performed due to the checkpoint for that log has not completed, 'log file switch (checkpoint incomplete)' waiting happens, which caused remote instance sessions hang on 'row cache lock' and gc waiting.

NOTE:602066.1 - How To Maintain and/or Add Redo Logs
NOTE:1035935.6 - Example of How To Resize the Online Redo Logfiles
NOTE:1376916.1 - Troubleshooting: 'Log file sync' Waits

++ General Guideline For Sizing The Online Redo Log Files (Doc ID 781999.1)
++ 10g New Feature: REDO LOGS SIZING ADVISORY (Doc ID 274264.1)
++ https://docs.oracle.com/en/database/oracle/oracle-database/19/tgdba/database-performance-tuning-guide.pdf


The size of the redo log files can influence performance, because the behaviors of the database writer and archiver processes depend on the redo log sizes. Generally, larger redo log files provide better performance. Undersized log files increase checkpoint activity and reduce performance. However, small log files and frequent checkpoints reduce recovery time. So, if daily operational efficiency is more important than minimizing recovery time, then set online redo log files to a relatively large value.

How to calculate the Online Redo Log File Size (Doc ID 3001376.1)

Peak redo rate according
to EM or AWR reports 	     Recommended redo log group size
<1 MB/sec                      1 GB
<=3 MB/sec                     3 GB
<= 5 MB/sec                    4 GB
<= 25 MB/sec                  16 GB
<= 50 MB/sec                  32 GB
> 50 MB/sec                   64 GB


### Index Fragmentation
Oracle Hyperion Financial Management applications usually create hundreds or even thousands of indexes. As application data changes over time, indexes could become fragmented. Regular monitoring and defragmentation of these indexes can improve performance. However, index rebuild is a time-consuming and resource-intensive operation. Oracle does not recommend any index rebuild while applications are in operation. Oracle Enterprise Manager provides user-friendly interfaces to monitor the statistics of indexes. For more details about how to monitor and defragment indexes through Enterprise Manager, refer to Oracle database documentation.

### Tablespaces and Segments Fragmentations
Over time, updates and deletes on objects within a tablespace can create pockets of empty space that individually are not large enough to be reused for new data. This type of empty space is referred to as fragmented free space. Objects with fragmented free space can result in much wasted space, and can impact database performance. Oracle Hyperion Financial Management consolidation performs extensive updates, inserts, and deletes, so it is very important to monitor the fragmentation of tablespaces and defragment them regularly. The preferred way to defragment and reclaim this space is to perform an online segment shrink. For more information about how to use online segments, please refer to the Oracle Database Administrator’s Guide or consult Oracle database support services

### Disable the feature DEFERRED_SEGMENT_CREATION
Oracle introduced the DEFERRED_SEGMENT_CREATION feature in Release 11.2. The default setting is On in all installations. The feature ensures that a TABLE create statement does not actually create a table. The table is only created after a row of data is inserted.

### Disable the feature DEFERRED_SEGMENT_CREATION
Oracle introduced the DEFERRED_SEGMENT_CREATION feature in Release 11.2. The default settings is On in all installations. With this feature, a TABLE create statement does not actually create a table. The table is only created after a row of data is inserted. This feature can cause issues when exporting and importing Oracle Hyperion Financial Management schemas, as some tables may not be created during the import. It is recommended that this feature be disabled; tables must then created automatically. To disable this feature, log in to your instance using SYSTEM or SYS and issue the command:

alter system set deferred_segment_creation=false; 

Any table created after issuing this statement is created automatically. If you already have an instance with empty tables and want to export the application, you can alter each table individually to force creation and allow the table to be used by the EXP (export) command.

To determine if a schema has empty tables, run either of the two following commands:

select segment_name, segment_type, extents from dba_segments where extents < 1 and segment_type='TABLE' and owner='<hfm db schema>'

select table_name from all_tables where owner='<hfm db schema>' and table_name not in (select segment_name from dba_segments where owner='<hfm db schema>' and segment_type='TABLE' and extents>0)
Issue the following command for each empty table:

alter table <table_name> allocate extent

### Regular Maintenance and Tuning Plans
The preceding sections outline the typical process to correctly size the Oracle memory parameters. Performance tuning, by its nature, is iterative. Removing one performance block might not lead to immediate performance improvement because another block might be revealed. Therefore, this process should be repeated until the performance is acceptable. Because Oracle Hyperion Financial Management application data changes constantly from period to period, regular database maintenance and tuning plans will help users proactively monitor and tune Oracle database performance, and prevent potential performance issues in the future. For more information and additional tuning options, consult Oracle database support.

### How to Calculate the Number of Processes for Oracle Database Release 11g

The number of user processes that can simultaneously connect to the Oracle database is limited by the PROCESSES initialization parameter of the Oracle database instance. By default, each Oracle Hyperion Financial Management application process requires a minimum of 200 database connections for a single server environment. When more than one Financial Management server has been configured for an environment, an additional pool is required for Cluster Controller connections to ensure application integrity. The Cluster Controller Pool is equal to the Application pool, therefore 400 connections per application process must be accounted for by the DBA.

Note:The total number of servers in a cluster, and the total number of applications, affect the number of required database connections.
This example illustrates how to calculate the number of processes that connect to the Oracle database. Suppose a single Financial Management application server has two applications. The default Financial Management database connection pool setting is 200. The minimum number of Oracle database connections required for just Financial Management is 400. For additional safety, multiply this number by a factor of 1.1 to allow for ancillary connections and general usage of the database. Considering that the Oracle database also has some background processes, add 20 to the number to arrive at the value of PROCESSES. So, in this case, PROCESSES should be set to 460.

For single HFM applications server:

PROCESSES = (Financial Management connection pool setting) * (Number of Financial Management applications) *1.1 + 20.

Suppose a cluster of two Financial Management application servers has two applications on each server. The Financial Management database connection pool setting is 200 and the Cluster Controller pool would also be 200. The minimum number of Oracle database connections required for just Financial Management is now 1,600: (200+200)*2*2=1600.

For Multi-Server environment:

PROCESSES = (Financial Management connection pool setting + Financial Management Cluster Controller connection pool setting) * (Number of Financial Management applications) * (Number of Financial Management servers) *1.1 + 20.

### Init

https://docs.oracle.com/en/applications/enterprise-performance-management/11.2/hfmam/tuning_guidelines_for_oracle_11g_databases.html


