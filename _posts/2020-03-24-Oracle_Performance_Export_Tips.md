---
layout: post
title: "Oracle 19c Poor Performance With DataPump Export"
category: Oracle
tags: Oracle DataPump Tips 
---

* content
{:toc}

Oracle 19c Poor Performance With DataPump Tips


#### Reference


Poor Performance With DataPump Export On Large Databases (Doc ID 473423.1)

Data Pump Export Hanging In RAC At ESTIMATE Phase And Slow Performance (Doc ID 1948926.1)











#### Gather the statistics for Dictionary and Fixed Objects as follows


Check if Dictionary and Fixed Objects statistics have been gathered previously to start the DataPump job or not. The DBA_OPTSTAT_OPERATIONS view is useful in determining the time stamp of statistics modifications :

	SQL> alter session set nls_date_format='dd-mon-yyyy hh24:mi';
	SQL> select operation, START_TIME, END_TIME from DBA_OPTSTAT_OPERATIONS;

In case no statistics are found in DBA_OPTSTAT_OPERATIONS, the DataPump performance issue is caused by missing statistics created on dictionary and fixed tables.


	SQL> connect / as sysdba
	SQL> exec dbms_stats.gather_dictionary_stats;
	SQL> exec dbms_stats.lock_table_stats (null,'X$KCCLH');
	SQL> exec dbms_stats.gather_fixed_objects_stats;

``` shell


SYS@orcl> alter session set nls_date_format='dd-mon-yyyy hh24:mi';

Session altered.

SYS@orcl> select operation, START_TIME, END_TIME from DBA_OPTSTAT_OPERATIONS;

OPERATION
----------------------------------------------------------------
START_TIME
---------------------------------------------------------------------------
END_TIME
---------------------------------------------------------------------------
gather_database_stats (auto)
19-MAR-20 01.03.45.206602 AM +00:00
19-MAR-20 01.04.22.644553 AM +00:00

restore_table_stats
19-MAR-20 01.04.19.318398 AM +00:00
19-MAR-20 01.04.22.073222 AM +00:00

OPERATION
----------------------------------------------------------------
START_TIME
---------------------------------------------------------------------------
END_TIME
---------------------------------------------------------------------------

gather_database_stats (auto)
23-MAR-20 01.14.23.732900 AM +00:00
23-MAR-20 01.17.56.378800 AM +00:00

purge_stats
23-MAR-20 01.17.56.379015 AM +00:00

OPERATION
----------------------------------------------------------------
START_TIME
---------------------------------------------------------------------------
END_TIME
---------------------------------------------------------------------------
23-MAR-20 01.17.56.644984 AM +00:00

purge_stats
23-MAR-20 01.17.56.645139 AM +00:00
23-MAR-20 01.17.57.004481 AM +00:00


SYS@orcl>
SYS@orcl> exec dbms_stats.gather_dictionary_stats;

PL/SQL procedure successfully completed.

SYS@orcl>
SYS@orcl> exec dbms_stats.lock_table_stats (null,'X$KCCLH');

PL/SQL procedure successfully completed.

SYS@orcl> exec dbms_stats.gather_fixed_objects_stats;

PL/SQL procedure successfully completed.

SYS@orcl> select operation, START_TIME, END_TIME from DBA_OPTSTAT_OPERATIONS;

OPERATION
----------------------------------------------------------------
START_TIME
---------------------------------------------------------------------------
END_TIME
---------------------------------------------------------------------------
gather_database_stats (auto)
19-MAR-20 01.03.45.206602 AM +00:00
19-MAR-20 01.04.22.644553 AM +00:00

restore_table_stats
19-MAR-20 01.04.19.318398 AM +00:00
19-MAR-20 01.04.22.073222 AM +00:00

OPERATION
----------------------------------------------------------------
START_TIME
---------------------------------------------------------------------------
END_TIME
---------------------------------------------------------------------------

gather_dictionary_stats
24-MAR-20 02.11.34.638976 AM +00:00
24-MAR-20 02.11.51.548110 AM +00:00

lock_table_stats
24-MAR-20 02.15.12.751499 AM +00:00

OPERATION
----------------------------------------------------------------
START_TIME
---------------------------------------------------------------------------
END_TIME
---------------------------------------------------------------------------
24-MAR-20 02.15.12.757577 AM +00:00

gather_fixed_objects_stats
24-MAR-20 02.15.19.273867 AM +00:00
24-MAR-20 02.16.20.936065 AM +00:00

gather_database_stats (auto)

OPERATION
----------------------------------------------------------------
START_TIME
---------------------------------------------------------------------------
END_TIME
---------------------------------------------------------------------------
23-MAR-20 01.14.23.732900 AM +00:00
23-MAR-20 01.17.56.378800 AM +00:00

purge_stats
23-MAR-20 01.17.56.379015 AM +00:00
23-MAR-20 01.17.56.644984 AM +00:00


OPERATION
----------------------------------------------------------------
START_TIME
---------------------------------------------------------------------------
END_TIME
---------------------------------------------------------------------------
purge_stats
23-MAR-20 01.17.56.645139 AM +00:00
23-MAR-20 01.17.57.004481 AM +00:00


8 rows selected.

SYS@orcl>

```



#### Set parallel parameter for faster export


Parallel Capabilities of Oracle Data Pump (Doc ID 365459.1)

	Users want to optimize the use of Data Pump's parallel capabilities so that export and import jobs run as efficiently as possible. If the PARALLEL parameter and the wildcard dump file template are used, and the job has a large amount of data (not metadata), then performance over Original Export and Original Import will be much improved.

	Data Pump uses the PARALLEL parameter as the maximum allowed parallelism for the job, with the maximum number of active workers and Parallel Execution Processes at any given time. If a user is monitoring the workers, there will be times when workers will be busy and other times when some workers may be idle. This is expected and means that Data Pump is behaving properly.


Here is a general guideline for what should be considered when using the PARALLEL parameter:

	Set the degree of parallelism to two times the number of CPUs, then tune from there.
	For Data Pump Export, the PARALLEL parameter value should be less than or equal to the number of dump files.
	For Data Pump Import, the PARALLEL parameter value should not be much larger than the number of files in the dump file set.
	A PARALLEL greater than one is only available in Enterprise Edition 
	Starting with 12.2, Data Pump PARALLEL parameter has been extended to include metadata during export and import operations. For parallel>1, for 12.2 export, all metadata and data are unloaded in parallel, with the exception of jobs that use transportable tablespace. For 12.2 import, objects must be created in the correct dependency order. If there are enough objects of the same type to make use of multiple workers, then the objects will be imported by multiple worker processes.
	Starting with 20c, Oracle Data Pump improves Transportable Tablespace metadata operations with parallelism. Parallelism improves TTS export and import performance, especially when there are millions of database objects in the data files, including tables, indexes, partitions, and subpartitions.


#### Run the utlrp.sql multiple times to validate the invalid objects

Run the @?/rdbms/admin/utlrp.sql multiple times to validate the invalid objects


	SYS@orcl> @?/rdbms/admin/utlrp.sql

	Session altered.


	TIMESTAMP
	--------------------------------------------------------------------------------
	COMP_TIMESTAMP UTLRP_BGN              2020-03-24 02:23:22

	DOC>   The following PL/SQL block invokes UTL_RECOMP to recompile invalid
	DOC>   objects in the database. Recompilation time is proportional to the
	DOC>   number of invalid objects in the database, so this command may take
	DOC>   a long time to execute on a database with a large number of invalid
	DOC>   objects.
	DOC>
	DOC>   Use the following queries to track recompilation progress:
	DOC>
	DOC>   1. Query returning the number of invalid objects remaining. This
	DOC>      number should decrease with time.
	DOC>         SELECT COUNT(*) FROM obj$ WHERE status IN (4, 5, 6);
	DOC>
	DOC>   2. Query returning the number of objects compiled so far. This number
	DOC>      should increase with time.
	DOC>         SELECT COUNT(*) FROM UTL_RECOMP_COMPILED;
	DOC>
	DOC>   This script automatically chooses serial or parallel recompilation
	DOC>   based on the number of CPUs available (parameter cpu_count) multiplied
	DOC>   by the number of threads per CPU (parameter parallel_threads_per_cpu).
	DOC>   On RAC, this number is added across all RAC nodes.
	DOC>
	DOC>   UTL_RECOMP uses DBMS_SCHEDULER to create jobs for parallel
	DOC>   recompilation. Jobs are created without instance affinity so that they
	DOC>   can migrate across RAC nodes. Use the following queries to verify
	DOC>   whether UTL_RECOMP jobs are being created and run correctly:
	DOC>
	DOC>   1. Query showing jobs created by UTL_RECOMP
	DOC>         SELECT job_name FROM dba_scheduler_jobs
	DOC>            WHERE job_name like 'UTL_RECOMP_SLAVE_%';
	DOC>
	DOC>   2. Query showing UTL_RECOMP jobs that are running
	DOC>         SELECT job_name FROM dba_scheduler_running_jobs
	DOC>            WHERE job_name like 'UTL_RECOMP_SLAVE_%';
	DOC>#

	PL/SQL procedure successfully completed.


	TIMESTAMP
	--------------------------------------------------------------------------------
	COMP_TIMESTAMP UTLRP_END              2020-03-24 02:23:23

	DOC> The following query reports the number of invalid objects.
	DOC>
	DOC> If the number is higher than expected, please examine the error
	DOC> messages reported with each object (using SHOW ERRORS) to see if they
	DOC> point to system misconfiguration or resource constraints that must be
	DOC> fixed before attempting to recompile these objects.
	DOC>#

	OBJECTS WITH ERRORS
	-------------------
					  0

	DOC> The following query reports the number of exceptions caught during
	DOC> recompilation. If this number is non-zero, please query the error
	DOC> messages in the table UTL_RECOMP_ERRORS to see if any of these errors
	DOC> are due to misconfiguration or resource constraints that must be
	DOC> fixed before objects can compile successfully.
	DOC> Note: Typical compilation errors (due to coding errors) are not
	DOC>       logged into this table: they go into DBA_ERRORS instead.
	DOC>#

	ERRORS DURING RECOMPILATION
	---------------------------
							  0


	Function created.


	PL/SQL procedure successfully completed.


	Function dropped.


	PL/SQL procedure successfully completed.

	SYS@orcl>
	SYS@orcl>

#### Use the paramater logtime to get more diag messages

With 12c, a new LOGTIME datapump parameter has been introduced, the msg will be displayed during export and import operations will be timestamped. 

The msg can help us to diagnose performance problems.

Use the paramater logtime=all in th export command which could help us find where the export is taking more time

[2.4.4.1 LOGTIME Parameter for Oracle Data Pump Command](https://docs.oracle.com/database/121/NEWFT/chapter12101.htm#NEWFT253)

	The new LOGTIME command-line parameter available in Oracle Data Pump Export and Import allows you to request that messages displayed during export and import operations be timestamped. The valid values are:

		NONE - no timestamps on status or log file messages (same as the default)

		STATUS - timestamps on status messages only

		LOGFILE - timestamps on log file messages only

		ALL - timestamps on both status and log file messages

	There is also a new option for the DBMS_DATAPUMP.SET_PARAMETER procedure called LOGTIME and the valid values are the same.

	You can use the timestamps to know the elapsed time between different parts of an Oracle Data Pump operation, which can be helpful in diagnosing performance problems and in estimating the timing of similar operations in the future.

#### Some known bugs in 12c for slow export

Checklist For Slow Performance Of DataPump Export (expdp) And Import (impdp) (Doc ID 453895.1)

	12.1.0.1
	- Bug 16396856 - TTS IMPDP SEEMS TO HANG AND CONSUME 100% CPU

	12.1.0.2
	- Bug 24423416 - IMPDP FOR SCHEMA_EXPORT/PACKAGE/PACKAGE_BODY TAKES HOURS
	- Bug 22216154 - TTS IMPORT IS VERY SLOW WHEN THERE ARE A LOT OF OBJECTS INVOLVEDSev 1 SR
	- Bug 25786141 - SLOW IMPDP ON THE SYS.KUPW$WORKER.MAIN EXECUTION
	- Bug 26960528 - SLOW IMPDP ON THE SYS.KUPW$WORKER.MAIN
	- unpublished Bug 20345554 - Slow dbms_stats query aympjz6jjgx39 / Import DataPump on "DATABASE_EXPORT/STATISTICS/MARKER"

	12.2.0.1
	- Bug 25786141 - SLOW IMPDP ON THE SYS.KUPW$WORKER.MAIN EXECUTION

	Note:
	  MLR Patch 29019842 released on top of 12.2.0.1 contains the fixes for the bugs: 28398639, 23103778, 24829009, 25786141, 27277810 and 27499636 

	19.3.0
	- unpublished Bug 28950868 - KN:LNX:IMPORT (IMPDP) DOESNOT COMPLETE SINCE DW00 PROCESS SPINNING ON HIGH CPU USAGE

#### Specify EXCLUDE=STATISTICS as expdp parameter

Specify EXCLUDE=STATISTICS as expdp parameter

#### Clean up orphaned datapump jobs

Clean up any orphaned datapump jobs, please see following document for detailed steps.

Note 336014.1 - How To Cleanup Orphaned DataPump Jobs In DBA_DATAPUMP_JOBS?


#### Set streams_pool_size size

Steam pool is used the following execution.

	Oracle GoldenGate
	XStream
	Oracle Streams
	Oracle Advanced Queuing
	Oracle Data Pump

Depend on the command's parameter:

	MAX_SGA_SIZE -> Oracle GoldenGate/XStream
	dbms_aqadm -> Oracle Advanced Queuing


The streams_pool_size's setting should be careful with the following case.

	SYS@orcl> show parameter stream

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	streams_pool_size                    big integer 0
	select component, current_size/1048576, max_size/1048576 from v$sga_dynamic_components where component='streams pool';

	COMPONENT                                                        CURRENT_SIZE/1048576 MAX_SIZE/1048576
	---------------------------------------------------------------- -------------------- ----------------
	streams pool                                                                       32               32

	SYS@orcl>
	SYS@orcl> show parameter sga_;

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	sga_max_size                         big integer 2288M
	sga_min_size                         big integer 0
	sga_target                           big integer 2288M
	unified_audit_sga_queue_size         integer     1048576
	SYS@orcl>
	SYS@orcl> alter system set streams_pool_size=512M scope=both;

	System altered.

	SYS@orcl> show parameter stream

	NAME                                 TYPE        VALUE
	------------------------------------ ----------- ------------------------------
	streams_pool_size                    big integer 512M
	SYS@orcl> select component, current_size/1048576, max_size/1048576 from v$sga_dynamic_components where component='streams pool';

	COMPONENT                                                        CURRENT_SIZE/1048576 MAX_SIZE/1048576
	---------------------------------------------------------------- -------------------- ----------------
	streams pool                                                                      512              512

	SYS@orcl>
	SYS@orcl> alter system set streams_pool_size=0 scope=both;

	System altered.

	SYS@orcl> 
	SYS@orcl> alter system set streams_pool_size=2g scope=both;
	alter system set streams_pool_size=2g scope=both
	*
	ERROR at line 1:
	ORA-02097: parameter cannot be modified because specified value is invalid
	ORA-04033: Insufficient memory to grow pool


	SYS@orcl>
	SYS@orcl> alter system set streams_pool_size=2G scope=memory;
	alter system set streams_pool_size=2G scope=memory
	*
	ERROR at line 1:
	ORA-02097: parameter cannot be modified because specified value is invalid
	ORA-04033: Insufficient memory to grow pool


	SYS@orcl>

	SYS@orcl> select (max(to_number(trim(c.ksppstvl)))+67108864) from sys.x$ksppi a, sys.x$ksppcv b, sys.x$ksppsv c where a.indx = b.indx and a.indx = c.indx and lower(a.ksppinm) in ('__streams_pool_size','streams_pool_size');

	(MAX(TO_NUMBER(TRIM(C.KSPPSTVL)))+67108864)
	-------------------------------------------
									 1140850688

	select 'ALTER SYSTEM SET STREAMS_POOL_SIZE='||(max(to_number(trim(c.ksppstvl)))+67108864)||' SCOPE=SPFILE;'
	from sys.x$ksppi a, sys.x$ksppcv b, sys.x$ksppsv c
	  3  where a.indx = b.indx and a.indx = c.indx and lower(a.ksppinm) in ('__streams_pool_size','streams_pool_size');

	'ALTERSYSTEMSETSTREAMS_POOL_SIZE='||(MAX(TO_NUMBER(TRIM(C.KSPPSTVL)))+67108864)||'SCOPE=S
	-----------------------------------------------------------------------------------------
	ALTER SYSTEM SET STREAMS_POOL_SIZE=1140850688 SCOPE=SPFILE;

	SYS@orcl>


Can NOT reset/resize the streams_pool_size to lower value for the session is active in db.

NAMeed to shutdown the DB and then resize the streams pool size.

	SYS@orcl> alter system set streams_pool_size=0 scope=both;

	System altered.

	SYS@orcl> select component, current_size/1048576, max_size/1048576 from v$sga_dynamic_components where component='streams pool';

	COMPONENT                                                        CURRENT_SIZE/1048576 MAX_SIZE/1048576
	---------------------------------------------------------------- -------------------- ----------------
	streams pool                                                                     1024             1024

	SYS@orcl>

Some known issue.

	Bug 17365043 - "STREAMS AQ: ENQUEUE BLOCKED ON LOW MEMORY" WHEN REDUCING STREAMS_POOL_SIZE




Have a good work&life! 2020/03 via LinHong


