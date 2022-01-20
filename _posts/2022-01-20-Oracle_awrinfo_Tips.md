---
layout: post
title: "Oracle awrinfo sql Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle awrinfo sql Tips


This script will output general Automatic Workload Repository(AWR) information such as the size, data distribution, etc. in AWR and SYSAUX. The intended use of this script is for diagnosing abnormalities in AWR and not for diagnosing issues in the database instance. Please look at addmrpt.sql and awrrpt.sql for diagnosing database issues.








### awrinfo.sql script


awrinfo.sql
```
@?/rdbms/admin/awrinfo.sql
```

AWR reports
```
AWR report
@$ORACLE_HOME/rdbms/admin/awrrpt.sql
@$ORACLE_HOME/rdbms/admin/awrrpti.sql
AWR SQL report
@$ORACLE_HOME/rdbms/admin/awrsqrpt.sql
@$ORACLE_HOME/rdbms/admin/awrsqrpi.sql
RAC AWR report
@$ORACLE_HOME/rdbms/admin/awrgrpt.sql
@$ORACLE_HOME/rdbms/admin/awrgrpti.sql
AWR compare report
@$ORACLE_HOME/rdbms/admin/awrddrpt.sql
@$ORACLE_HOME/rdbms/admin/awrddrpi.sql
RAC AWR compare report
@$ORACLE_HOME/rdbms/admin/awrgdrpt.sql
@$ORACLE_HOME/rdbms/admin/awrgdrpi.sql
```

AWR extract/load
```
@$ORACLE_HOME/rdbms/admin/awrextr.sql
@$ORACLE_HOME/rdbms/admin/awrload.sql
```
awrinfo.sql sample output

```sql
[oracle@ol8-19c ~]$ sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on Thu Jan 20 16:15:52 2022
Version 19.10.0.0.0

Copyright (c) 1982, 2020, Oracle.  All rights reserved.


Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0

SYS@cdb1> @?/rdbms/admin/awrinfo.sql

This script will report general AWR information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Specify the Report File Name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The default report file name is awrinfo.txt.  To use this name,
press <return> to continue, otherwise enter an alternative.

Enter value for report_name:

Using the report name awrinfo.txt
No errors.
No errors.
~~~~~~~~~~~~~~~
AWR INFO Report
~~~~~~~~~~~~~~~

Report generated at
16:15:55 on Jan 20, 2022 ( Thursday ) in Timezone +08:00


Warning: Non Default AWR Setting!
--------------------------------------------------------------------------------
Snapshot interval is 432000 minutes and Retention is 8 days


       DB_ID DB_NAME   HOST_PLATFORM				 INST STARTUP_TIME	LAST_ASH_SID RAC VERSION
------------ --------- ---------------------------------------- ----- ----------------- ------------ --- -----------------
* 1051107858 CDB1      ol8-19c - Linux x86 64-bit		    1 11:30:50 (01/19)	     3483905 NO  19.0.0.0.0

########################################################
(I) AWR Snapshots Information
########################################################

*****************************************************
(1a) SYSAUX usage - Schema breakdown (dba_segments)
*****************************************************
|
| Total SYSAUX size			 1,034.9 MB ( 3% of 32,768.0 MB MAX with AUTOEXTEND ON )
|
| Schema  SYS	       occupies 	   746.9 MB (  72.2% )
| Schema  MDSYS        occupies 	   185.1 MB (  17.9% )
| Schema  XDB	       occupies 	    68.4 MB (	6.6% )
| Schema  SYSTEM       occupies 	    12.6 MB (	1.2% )
| Schema  WMSYS        occupies 	     6.6 MB (	0.6% )
| Schema  AUDSYS       occupies 	     6.6 MB (	0.6% )
| Schema  DVSYS        occupies 	     4.6 MB (	0.4% )
| Schema  CTXSYS       occupies 	     2.8 MB (	0.3% )
| Schema  GSMADMIN_INT occupies 	     0.9 MB (	0.1% )
| Schema  DBSNMP       occupies 	     0.5 MB (	0.0% )
|
********************************************************
(1b) SYSAUX occupants space usage (v$sysaux_occupants)
********************************************************
|
| Occupant Name        Schema Name		 Space Usage
| -------------------- -------------------- ----------------
| SM/AWR	       SYS			    369.7 MB
| SDO		       MDSYS			    185.1 MB
| SM/ADVISOR	       SYS			    100.3 MB
| XDB		       XDB			     68.4 MB
| SM/OPTSTAT	       SYS			     62.9 MB
| SM/OTHER	       SYS			     50.9 MB
| AO		       SYS			     45.8 MB
| LOGMNR	       SYSTEM			     10.8 MB
| AUDSYS	       AUDSYS			      6.6 MB
| WM		       WMSYS			      6.6 MB
| SMON_SCN_TIME        SYS			      3.4 MB
| PL/SCOPE	       SYS			      2.8 MB
| TEXT		       CTXSYS			      2.8 MB
| SQL_MANAGEMENT_BASE  SYS			      2.7 MB
| JOB_SCHEDULER        SYS			      2.3 MB
| STREAMS	       SYS			      1.7 MB
| LOGSTDBY	       SYSTEM			      1.6 MB
| AUTO_TASK	       SYS			      0.6 MB
| EM_MONITORING_USER   DBSNMP			      0.5 MB
| AUDIT_TABLES	       SYS			      0.0 MB
| EM		       SYSMAN			      0.0 MB
| EXPRESSION_FILTER    EXFSYS			      0.0 MB
| ORDIM 	       ORDSYS			      0.0 MB
| ORDIM/ORDDATA        ORDDATA			      0.0 MB
| ORDIM/ORDPLUGINS     ORDPLUGINS		      0.0 MB
| ORDIM/SI_INFORMTN_SC SI_INFORMTN_SCHEMA	      0.0 MB
| STATSPACK	       PERFSTAT 		      0.0 MB
| TSM		       TSMSYS			      0.0 MB
| ULTRASEARCH	       WKSYS			      0.0 MB
| ULTRASEARCH_DEMO_USE WK_TEST			      0.0 MB
| XSAMD 	       OLAPSYS			      0.0 MB
| XSOQHIST	       SYS			      0.0 MB
|
| Others (Unaccounted space)			    109.6 MB
|

******************************************
(1c) SYSAUX usage - Unregistered Schemas
******************************************

| This section displays schemas that are not registered
| in V$SYSAUX_OCCUPANTS
|
| Schema  DVSYS        occupies 	     4.6 MB
| Schema  GSMADMIN_INT occupies 	     0.9 MB
|
| Total space				     5.4 MB
|

*************************************************************
(1d) SYSAUX usage - Unaccounted space in registered schemas
*************************************************************
|
| This section displays unaccounted space in the registered
| schemas of V$SYSAUX_OCCUPANTS.
|
| Unaccounted space in SYS/SYSTEM	   104.1 MB
|
| Total space				   104.1 MB
|
*************************************
(2) Size estimates for AWR snapshots
*************************************
|
| Estimates based on 432000 mins snapshot INTERVAL:
|    AWR size/day		    MB ( K/snap * 0 snaps/day)
|    AWR size/wk		    MB (size_per_day * 7) per instance
|
| Estimates based on  snaps in past 24 hours:
|    AWR size/day		    MB ( K/snap and  snaps in past  hours)
|    AWR size/wk		    MB (size_per_day * 7) per instance
|

**********************************
(3a) Space usage by AWR components (per database)
**********************************

COMPONENT	 MB  % AWR  KB_PER_SNAP MB_PER_DAY MB_PER_WEEK TABLE% : INDEX%
--------- --------- ------ ------------ ---------- ----------- ----------------
FIXED	      152.0   41.1					  49% : 51%
SQLPLAN        41.0   11.1					  68% : 32%
EVENTS	       40.3   10.9					  41% : 59%
ASH		9.4    2.5					  77% : 23%
SPACE		8.9    2.4					  59% : 41%
SQL		6.8    1.8					  61% : 39%
SQLTEXT 	4.3    1.1					  94% : 6%
SQLBIND 	1.7    0.5					  52% : 48%
RAC		0.6    0.2					  50% : 50%

**********************************
(3b) Space usage within AWR Components (> 500K)
**********************************

COMPONENT	 MB SEGMENT_NAME - % SPACE_USED 					  SEGMENT_TYPE
--------- --------- --------------------------------------------------------------------- ---------------
FIXED	       13.0 WRH$_SYSSTAT_PK.WRH$_SYSSTAT_1051107858_2308		  -  78%  INDEX PARTITION
FIXED		9.0 WRH$_SYSSTAT.WRH$_SYSSTAT_1051107858_2308			  -  86%  TABLE PARTITION
FIXED		8.0 WRH$_SYSMETRIC_SUMMARY					  -   0%  TABLE
FIXED		7.0 WRH$_LATCH_PK.WRH$_LATCH_1051107858_2308			  -  77%  INDEX PARTITION
FIXED		7.0 WRH$_LATCH.WRH$_LATCH_1051107858_2308			  -  96%  TABLE PARTITION
FIXED		6.0 WRH$_CON_SYSMETRIC_SUMMARY					  -   0%  TABLE
FIXED		5.0 WRH$_CON_SYSMET_SUMMARY_INDEX				  -  15%  INDEX
FIXED		4.0 WRM$_SNAPSHOT_DETAILS					  -   5%  TABLE
FIXED		4.0 WRH$_CON_SYSSTAT_PK.WRH$_CON_SYSSTAT_1051107858_2308	  -  73%  INDEX PARTITION
FIXED		4.0 WRH$_SYSMETRIC_SUMMARY_INDEX				  -  14%  INDEX
FIXED		4.0 WRH$_PARAMETER_PK.WRH$_PARAMETER_1051107858_2308		  -  70%  INDEX PARTITION
FIXED		4.0 WRM$_SNAPSHOT_DETAILS_INDEX 				  -  22%  INDEX
FIXED		3.0 WRH$_CON_SYSSTAT.WRH$_CON_SYSSTAT_1051107858_2308		  -  53%  TABLE PARTITION
FIXED		3.0 WRH$_PARAMETER.WRH$_PARAMETER_1051107858_2308		  -  83%  TABLE PARTITION
FIXED		3.0 WRH$_PROCESS_WAITTIME_PK.WRH$_PROCESS_WAITTIME_1051107858_230 -  68%  INDEX PARTITION
FIXED		2.0 WRH$_PERSISTENT_QMN_CACHE					  -   0%  TABLE
FIXED		2.0 WRH$_PERSISTENT_QMN_CACHE_PK				  -  41%  INDEX
FIXED		2.0 WRH$_PROCESS_WAITTIME.WRH$_PROCESS_WAITTIME_1051107858_2308   -  62%  TABLE PARTITION
FIXED		2.0 WRH$_RESOURCE_LIMIT 					  -   0%  TABLE
FIXED		2.0 WRH$_RESOURCE_LIMIT_PK					  -  33%  INDEX
FIXED		2.0 WRH$_SERVICE_STAT_PK.WRH$_SERVICE_STAT_1051107858_2308	  -  70%  INDEX PARTITION
FIXED		2.0 WRH$_SHARED_POOL_ADVICE					  -   0%  TABLE
FIXED		2.0 WRH$_SYSMETRIC_HISTORY.WRH$_SYSMETRIC_HISTORY_1051107858_2308 -  63%  TABLE PARTITION
FIXED		2.0 WRH$_SYSMETRIC_HISTORY_INDEX.WRH$_SYSMETRIC_HISTORY_105110785 -  73%  INDEX PARTITION
FIXED		2.0 WRH$_MEM_DYNAMIC_COMP					  -   0%  TABLE
FIXED		2.0 WRH$_MEM_DYNAMIC_COMP_PK					  -  31%  INDEX
FIXED		1.0 WRH$_PGASTAT_PK						  -  17%  INDEX
FIXED		1.0 WRH$_MUTEX_SLEEP_PK 					  -  17%  INDEX
FIXED		1.0 WRH$_IOSTAT_DETAIL						  -   1%  TABLE
FIXED		0.8 WRH$_ROWCACHE_SUMMARY_PK.WRH$_ROWCACHE_SUMMARY_1051107858_230 -  62%  INDEX PARTITION
SQLPLAN        28.0 WRH$_SQL_PLAN						  -   5%  TABLE
SQLPLAN        13.0 WRH$_SQL_PLAN_PK						  -  21%  INDEX
EVENTS		6.0 WRH$_ENQUEUE_STAT_PK					  -  13%  INDEX
EVENTS		6.0 WRH$_EVENT_HISTOGRAM_PK.WRH$_EVENT_HISTOGRAM_1051107858_2308  -  75%  INDEX PARTITION
EVENTS		5.0 WRH$_BG_EVENT_SUMMARY_PK					  -  16%  INDEX
EVENTS		4.0 WRH$_EVENT_HISTOGRAM.WRH$_EVENT_HISTOGRAM_1051107858_2308	  -  72%  TABLE PARTITION
EVENTS		4.0 WRH$_ENQUEUE_STAT						  -   0%  TABLE
EVENTS		3.0 WRH$_BG_EVENT_SUMMARY					  -   0%  TABLE
EVENTS		2.0 WRH$_LIBRARYCACHE_PK					  -  29%  INDEX
EVENTS		2.0 WRH$_CON_SYSTEM_EVENT.WRH$_CON_SYSTEM_EVENT_1051107858_2308   -  38%  TABLE PARTITION
EVENTS		2.0 WRH$_SYSTEM_EVENT_PK.WRH$_SYSTEM_EVENT_1051107858_2308	  -  43%  INDEX PARTITION
EVENTS		2.0 WRH$_LIBRARYCACHE						  -   0%  TABLE
EVENTS		2.0 WRH$_CON_SYSTEM_EVENT_PK.WRH$_CON_SYSTEM_EVENT_1051107858_230 -  68%  INDEX PARTITION
EVENTS		0.8 WRH$_SYSTEM_EVENT.WRH$_SYSTEM_EVENT_1051107858_2308 	  -  89%  TABLE PARTITION
ASH		7.0 WRH$_ACTIVE_SESSION_HISTORY.WRH$_ACTIVE_SESSION_HISTORY_10511 -  92%  TABLE PARTITION
ASH		2.0 WRH$_ACTIVE_SESSION_HISTORY_PK.WRH$_ACTIVE_SESSION_HISTORY_10 -  66%  INDEX PARTITION
SPACE		2.0 WRH$_SEG_STAT.WRH$_SEG_STAT_1051107858_2308 		  -  46%  TABLE PARTITION

COMPONENT	 MB SEGMENT_NAME - % SPACE_USED 					  SEGMENT_TYPE
--------- --------- --------------------------------------------------------------------- ---------------
SPACE		0.8 WRH$_SEG_STAT_PK.WRH$_SEG_STAT_1051107858_2308		  -  61%  INDEX PARTITION
SPACE		0.8 WRH$_IOSTAT_FILETYPE					  -   1%  TABLE
SPACE		0.8 WRH$_IOSTAT_FILETYPE_PK					  -  18%  INDEX
SPACE		0.6 WRH$_TABLESPACE_SPACE_USAGE 				  -   1%  TABLE
SQL		3.0 WRH$_SQLSTAT.WRH$_SQLSTAT_1051107858_2308			  -  54%  TABLE PARTITION
SQL		0.9 WRH$_SQLSTAT_PK.WRH$_SQLSTAT_1051107858_2308		  -  64%  INDEX PARTITION
SQL		0.6 WRH$_SQLSTAT_INDEX.WRH$_SQLSTAT_1051107858_2308		  -  73%  INDEX PARTITION
SQLTEXT 	4.0 WRH$_SQLTEXT						  -  10%  TABLE
SQLBIND 	0.9 WRH$_SQL_BIND_METADATA					  -  24%  TABLE
SQLBIND 	0.8 WRH$_SQL_BIND_METADATA_PK					  -  33%  INDEX

**********************************
(4) Space usage by non-AWR components (> 500K)
**********************************

COMPONENT	 MB SEGMENT_NAME							  SEGMENT_TYPE
--------- --------- --------------------------------------------------------------------- ---------------
NON_AWR        88.2 SYS.SYS_LOB0000011147C00038$$					  LOBSEGMENT
NON_AWR        72.1 MDSYS.SYS_LOB0000072920C00006$$					  LOBSEGMENT
NON_AWR        56.2 MDSYS.SYS_LOB0000064076C00006$$					  LOBSEGMENT
NON_AWR        40.2 SYS.SYS_LOB0000007422C00004$$					  LOBSEGMENT
NON_AWR        40.2 SYS.SYS_LOB0000008766C00040$$					  LOBSEGMENT
NON_AWR        40.1 SYS.SYS_LOB0000010461C00001$$					  LOBSEGMENT
NON_AWR        29.0 SYS.WRI$_ADV_SQLT_PLANS						  TABLE
NON_AWR        28.0 SYS.I_WRI$_OPTSTAT_H_OBJ#_ICOL#_ST					  INDEX
NON_AWR        24.2 SYS.SYS_LOB0000066421C00004$$					  LOBSEGMENT
NON_AWR        16.2 SYS.SYS_LOB0000011139C00004$$					  LOBSEGMENT
NON_AWR        16.2 MDSYS.SYS_LOB0000067342C00002$$					  LOBSEGMENT
NON_AWR        16.0 SYS.I_WRI$_OPTSTAT_H_ST						  INDEX
NON_AWR 	9.0 MDSYS.SDO_CS_SRS							  TABLE
NON_AWR 	9.0 MDSYS.EXT_TAB_CS_SRS						  TABLE
NON_AWR 	8.0 SYS.HEATMAP 							  SYSTEM STATISTI
											  CS

NON_AWR 	7.2 SYS.SYS_LOB0000066406C00004$$					  LOBSEGMENT
NON_AWR 	5.0 SYS.WRI$_ADV_PARAMETERS_PK						  INDEX
NON_AWR 	5.0 SYS.WRI$_ADV_RATIONALE						  TABLE
NON_AWR 	4.0 SYS.WRI$_ADV_PARAMETERS						  TABLE
NON_AWR 	3.2 SYS.SYS_LOB0000066401C00004$$					  LOBSEGMENT
NON_AWR 	3.2 SYS.SYS_LOB0000066411C00004$$					  LOBSEGMENT
NON_AWR 	3.0 SYS.SMON_SCN_TO_TIME_AUX						  CLUSTER
NON_AWR 	3.0 SYS.WRI$_OPTSTAT_HISTGRM_HISTORY.SYS_P1233				  TABLE PARTITION
NON_AWR 	3.0 SYS.I_WRI$_OPTSTAT_HH_OBJ_ICOL_ST					  INDEX
NON_AWR 	2.2 SYS.SYS_LOB0000066416C00004$$					  LOBSEGMENT
NON_AWR 	2.2 SYS.SYS_LOB0000066426C00004$$					  LOBSEGMENT
NON_AWR 	2.0 SYS.WRI$_OPTSTAT_OPR_TASKS						  TABLE
NON_AWR 	2.0 SYS.WRI$_OPTSTAT_HISTGRM_HISTORY.SYS_P1253				  TABLE PARTITION
NON_AWR 	2.0 MDSYS.EXT_TAB_REF_SYS_1						  TABLE
NON_AWR 	2.0 MDSYS.EXT_TAB_REF_SYS						  TABLE
NON_AWR 	2.0 MDSYS.SDO_COORD_REF_SYS						  TABLE
NON_AWR 	2.0 XDB.XDB$ELEMENT							  TABLE
NON_AWR 	2.0 SYS.I_WRI$_OPTSTAT_HH_ST						  INDEX
NON_AWR 	2.0 SYS.WRI$_ADV_SQLT_PLANS_PK						  INDEX
NON_AWR 	1.2 SYS.SYS_LOB0000007422C00005$$					  LOBSEGMENT
NON_AWR 	1.2 SYS.SYS_LOB0000007451C00009$$.SYS_LOB_P1692 			  LOB PARTITION
NON_AWR 	1.2 SYS.SYS_LOB0000007451C00009$$.SYS_LOB_P1672 			  LOB PARTITION
NON_AWR 	1.2 AUDSYS.SYS_LOB0000018570C00030$$.SYS_LOB_P871			  LOB PARTITION
NON_AWR 	1.2 MDSYS.SYS_LOB0000070589C00003$$					  LOBSEGMENT
NON_AWR 	1.2 MDSYS.SYS_LOB0000064877C00003$$					  LOBSEGMENT
NON_AWR 	1.2 XDB.SYS_LOB0000021776C00025$$					  LOBSEGMENT
NON_AWR 	1.2 XDB.SYS_LOB0000021722C00023$$					  LOBSEGMENT
NON_AWR 	1.2 AUDSYS.SYS_LOB0000018570C00030$$.SYS_LOB_P607			  LOB PARTITION
NON_AWR 	1.2 SYS.SYS_LOB0000007451C00009$$.SYS_LOB_P1652 			  LOB PARTITION
NON_AWR 	1.2 SYS.SYS_LOB0000007451C00009$$.SYS_LOB_P1612 			  LOB PARTITION

COMPONENT	 MB SEGMENT_NAME							  SEGMENT_TYPE
--------- --------- --------------------------------------------------------------------- ---------------
NON_AWR 	1.2 SYS.SYS_LOB0000009069C00005$$					  LOBSEGMENT
NON_AWR 	1.2 SYS.SYS_LOB0000009065C00008$$					  LOBSEGMENT
NON_AWR 	1.1 MDSYS.SYS_LOB0000072925C00002$$					  LOBSEGMENT
NON_AWR 	1.1 SYS.SYS_LOB0000007451C00009$$.SYS_LOB_P1752 			  LOB PARTITION
NON_AWR 	1.1 SYS.SYS_LOB0000007451C00009$$.SYS_LOB_P1732 			  LOB PARTITION
NON_AWR 	1.1 SYS.SYS_LOB0000007451C00009$$.SYS_LOB_P1712 			  LOB PARTITION
NON_AWR 	1.0 SYS.LTXID_TRANS.LTXID_TRANS_1					  TABLE PARTITION
NON_AWR 	1.0 SYS.SYS$SERVICE_METRICS_TAB 					  TABLE
NON_AWR 	0.9 SYS.WRI$_ADV_MSG_GRPS_IDX_01					  INDEX
NON_AWR 	0.8 SYS.I_WRI$_OPTSTAT_OPR_TASKS_TGST					  INDEX
NON_AWR 	0.8 SYS.WRI$_ADV_MESSAGE_GROUPS 					  TABLE
NON_AWR 	0.8 SYS.WRI$_ADV_SQLT_RTN_PLAN_PK					  INDEX
NON_AWR 	0.7 MDSYS.SDO_COORD_OPS 						  TABLE
NON_AWR 	0.7 MDSYS.EXT_TAB_COORD_OPS						  TABLE
NON_AWR 	0.6 SYS.I_PLSCOPE_ACTION$						  INDEX
NON_AWR 	0.6 MDSYS.SDO_COORD_OP_PARAM_VALS_EXT					  TABLE
NON_AWR 	0.6 MDSYS.COORD_OP_PARA_VAL_PRIM					  INDEX
NON_AWR 	0.6 MDSYS.SDO_COORD_OP_PARAM_VALS					  TABLE
NON_AWR 	0.6 XDB.XDB$COMPLEX_TYPE						  TABLE
NON_AWR 	0.6 SYS.WRI$_ADV_RATIONALE_PK						  INDEX
NON_AWR 	0.6 SYS.AW_OBJ$ 							  TABLE
NON_AWR 	0.5 SYS.PLSCOPE_ACTION$ 						  TABLE
NON_AWR 	0.5 SYS.WRI$_ADV_MESSAGE_GROUPS_PK					  INDEX
NON_AWR 	0.5 XDB.XDB$H_INDEX							  TABLE
NON_AWR 	0.5 MDSYS.EXT_TAB_PARAM_VALS						  TABLE
NON_AWR 	0.5 MDSYS.EXT_TAB_PARAM_VALS_1						  TABLE

**********************************
(5a) AWR snapshots - last 50
**********************************

**********************************
(5b) AWR snapshots with errors or invalid
**********************************

no rows selected


**********************************
(5c) AWR snapshots -- OLDEST Non-Baselined snapshots
**********************************

**********************************
(6) AWR Control Settings - interval, retention
**********************************

       DBID  LSNAPID LSPLITID LSNAPTIME      LPURGETIME      FLAG INTERVAL	    RETENTION	      VRSN
----------- -------- -------- -------------- -------------- ----- ----------------- ----------------- ----
 1051107858	2302	 2303 11/03 10:58:34 01/20 10:20:50	2 +00300 00:00:00.0 +00008 00:00:00.0	30

**********************************
(7a) AWR Contents - row counts for each snapshots
**********************************

**********************************
(7b) AWR Contents - average row counts per snapshot
**********************************

**********************************
(7c) AWR total item counts - names, text, plans
**********************************

   SQLTEXT    SQLPLAN	SQLBMETA     SEGOBJ   DATAFILE	 TEMPFILE
---------- ---------- ---------- ---------- ---------- ----------
       692	19004	    2634	389	     6		0


########################################################
(II) Advisor Framework Info
########################################################

**********************************
(1) Advisor Tasks - Last 50
**********************************

OWNER/ADVISOR  TASK_ID/NAME			CREATED 	 EXE_DURATN EXE_CREATN HOW_C STATUS
-------------- -------------------------------- ---------------- ---------- ---------- ----- ------------
SYS/SQL Tuning 1/SYS_AUTO_SQL_TUNING_TASK	01:14:26 (04/17)		       AUTO
SYS/SPM Evolve 2/SYS_AUTO_SPM_EVOLVE_TASK	01:14:26 (04/17)		       AUTO  INITIAL
SYS/SPM Evolve 3/SYS_AI_SPM_EVOLVE_TASK 	01:14:26 (04/17)		       AUTO  INITIAL
SYS/SQL Perfor 4/SYS_AI_VERIFY_TASK		01:14:26 (04/17)		       AUTO  INITIAL
SYS/SQL Access 5/SYS_AUTO_INDEX_TASK		01:14:26 (04/17)		       AUTO  INITIAL
SYS/Statistics 7/INDIVIDUAL_STATS_ADVISOR_TASK	01:14:34 (04/17)		       CMD   INITIAL
SYS/Statistics 2506/AUTO_STATS_ADVISOR_TASK	11:46:10 (01/19)	  1	92,057 CMD   COMPLETED

**********************************
(2) Advisor Task - Oldest 5
**********************************

OWNER/ADVISOR  TASK_ID/NAME			CREATED 	 EXE_DURATN EXE_CREATN HOW_C STATUS
-------------- -------------------------------- ---------------- ---------- ---------- ----- ------------
SYS/SPM Evolve 3/SYS_AI_SPM_EVOLVE_TASK 	01:14:26 (04/17)		       AUTO  INITIAL
SYS/SQL Access 5/SYS_AUTO_INDEX_TASK		01:14:26 (04/17)		       AUTO  INITIAL
SYS/SQL Tuning 1/SYS_AUTO_SQL_TUNING_TASK	01:14:26 (04/17)		       AUTO
SYS/SPM Evolve 2/SYS_AUTO_SPM_EVOLVE_TASK	01:14:26 (04/17)		       AUTO  INITIAL
SYS/SQL Perfor 4/SYS_AI_VERIFY_TASK		01:14:26 (04/17)		       AUTO  INITIAL
SYS/Statistics 7/INDIVIDUAL_STATS_ADVISOR_TASK	01:14:34 (04/17)		       CMD   INITIAL
SYS/Statistics 2506/AUTO_STATS_ADVISOR_TASK	11:46:10 (01/19)	  1	92,057 CMD   COMPLETED

**********************************
(3) Advisor Tasks With Errors - Last 50
**********************************

OWNER/ADVISOR  TASK_ID/NAME			CREATED 	 EXE_DURATN EXE_CREATN HOW_C STATUS
-------------- -------------------------------- ---------------- ---------- ---------- ----- ------------
TASK_DESC
--------------------------------------------------------------------------------------------------------------
ERROR_MSG
--------------------------------------------------------------------------------------------------------------
SYS/SPM Evolve 2/SYS_AUTO_SPM_EVOLVE_TASK	01:14:26 (04/17)		       AUTO  INITIAL
Description: Automatic SPM Evolve Task
Error Msg  :

SYS/SPM Evolve 3/SYS_AI_SPM_EVOLVE_TASK 	01:14:26 (04/17)		       AUTO  INITIAL
Description: Automatic SPM Evolve Task
Error Msg  :

SYS/SQL Perfor 4/SYS_AI_VERIFY_TASK		01:14:26 (04/17)		       AUTO  INITIAL
Description:
Error Msg  :

SYS/SQL Access 5/SYS_AUTO_INDEX_TASK		01:14:26 (04/17)		       AUTO  INITIAL
Description:
Error Msg  :

SYS/Statistics 7/INDIVIDUAL_STATS_ADVISOR_TASK	01:14:34 (04/17)		       CMD   INITIAL
Description:
Error Msg  :




########################################################
(III) ASH Usage Info
########################################################

**********************************
(1a) ASH histogram (past 3 days)
**********************************

**********************************
(1b) ASH histogram (past 1 day)
**********************************

**********************************
(2a) ASH details (past 3 days)
**********************************

**********************************
(2b) ASH details (past 1 day)
**********************************

**********************************
(2c) ASH sessions (Fg Vs Bg) (past 1 day across all instances in RAC)
**********************************

Foreground %
Background %
MMNL %

End of Report
Report written to awrinfo.txt
SYS@cdb1>
```



#### Many reasons could be a Possible cause for the failure during the purging process

```
 Database slowness with the spike in OS resources (CPU/IO Contention)
 Database Hang
 MMON purging itself takes more time to complete and it eventually fails with the Error Message "ORA-12751:  CPU time or run time policy violation"
 MMON suspension and not active
```
#### SQL Tips

- MMON will not Purge any ORPHAN Rows during Future purging Process. It has to be Manually Deleted. Below steps can be used to Manually Purge
- Check the Size of the SM/AWR and its Associated Tables in the section "(3b) Space usage within AWR Components (> 500K)" of the AWRINFO.sql output
- If the Size of the Objects referenced in the above Section are of Huge Size, then try the below Manual Purging Approach
- In this Example we will use the Object Name : WRH$_SYSMETRIC_HISTORY and how to find the existence of ORPHAN Rows and Manual Purging


```sql
SYS@cdb1> SELECT MIN(SNAP_ID), MAX(SNAP_ID), COUNT(*) FROM SYS.WRH$_SYSMETRIC_HISTORY A
  2  WHERE NOT EXISTS
  3  (SELECT *  FROM SYS.DBA_HIST_SNAPSHOT B  WHERE B.SNAP_ID  = A.SNAP_ID  AND A.DBID = B.DBID);

MIN(SNAP_ID) MAX(SNAP_ID)   COUNT(*)
------------ ------------ ----------
	2193	     2301      25898

SYS@cdb1> SELECT MIN(SNAP_ID), MAX(SNAP_ID), COUNT(*) FROM SYS.DBA_HIST_SNAPSHOT;

MIN(SNAP_ID) MAX(SNAP_ID)   COUNT(*)
------------ ------------ ----------
				   0

SYS@cdb1> EXEC DBMS_WORKLOAD_REPOSITORY.MODIFY_SNAPSHOT_SETTINGS(INTERVAL => 0);

PL/SQL procedure successfully completed.

SELECT COUNT(*) FROM SYS.WRH$_SYSMETRIC_HISTORY
  2  WHERE (DBID,SNAP_ID) IN (SELECT DBID,SNAP_ID FROM DBA_HIST_SNAPSHOT);

  COUNT(*)
----------
	 0

CREATE TABLE SYS.WRH$_SYSMETRIC_HISTORY_BACKUP TABLESPACE SYSAUX AS
  2  SELECT * FROM SYS.WRH$_SYSMETRIC_HISTORY WHERE (DBID,SNAP_ID) IN (SELECT DBID,SNAP_ID FROM DBA_HIST_SNAPSHOT);

Table created.

SYS@cdb1> SELECT COUNT(*) FROM SYS.WRH$_SYSMETRIC_HISTORY_BACKUP;

  COUNT(*)
----------
	 0

SYS@cdb1> TRUNCATE TABLE SYS.WRH$_SYSMETRIC_HISTORY;

Table truncated.

SYS@cdb1> INSERT /*+ APPEND */ INTO SYS.WRH$_SYSMETRIC_HISTORY SELECT * FROM SYS.WRH$_SYSMETRIC_HISTORY_BACKUP;

0 rows created.

SYS@cdb1> COMMIT;

Commit complete.

SYS@cdb1> EXEC DBMS_WORKLOAD_REPOSITORY.MODIFY_SNAPSHOT_SETTINGS(INTERVAL => 60);

PL/SQL procedure successfully completed.

SYS@cdb1> DROP TABLE SYS.WRH$_SYSMETRIC_HISTORY_BACKUP;

Table dropped.

SYS@cdb1>
```


### Reference

Troubleshooting Issues with SYSAUX Space Usage(Doc ID 1399365.1)

How to Manually Purge Orphan Rows from AWR Repository Tables In Sysaux Tablespace (Doc ID 2536631.1)	

Have a good work&life! 2022/01 via LinHong

