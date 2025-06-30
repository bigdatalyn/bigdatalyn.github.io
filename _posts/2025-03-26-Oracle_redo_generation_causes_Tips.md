---
layout: post
title: "Oracle redo generation's causes Tips"
category: Oracle
tags: Oracle redo Tips
---

* content
{:toc}

Oracle redo generation's causes Tips

 Purpose of this document is to show how to identify the causes of excessive redo generation and what we can do to mitigate the problem








### Purpose

```
 Purpose of this document is to show how to identify the causes of excessive redo generation and what we can do to mitigate the problem
```

### Troubleshooting Steps

First of all, we need to remark that high redo generation is always a consequence of certain activity in the database and it is expected behavior, oracle is optimized for redo generation and there are no bugs regarding the issue.

The main cause of high redo generation is usually a high DML activity during a certain period of time and it’s a good practice to first examine modifications on either database level (parameters, any maintenance operations,…) and application level (deployment of new application, modification in the code, increase in the users,..).

What we need to examine:

```
1. Is supplemental logging enabled? The amount of redo generated when supplemental logging is enabled is quite high when compared to when supplemental logging is disabled. 

What Causes High Redo When Supplemental Logging is Enabled (Doc ID 1349037.1)

2. Are a lot of indexes being used?, reducing the number of indexes or using the attribute NOLOGGING will reduce the redo considerably

3. Are all the operation really in need of the use of LOGGING? From application we can reduce redo by making use of the clause NOLOGGING. Note that only the following operations can make use of NOLOGGING mode:

- direct load (SQL*Loader)
- direct-load INSERT
- CREATE TABLE ... AS SELECT
- CREATE INDEX
- ALTER TABLE ... MOVE PARTITION
- ALTER TABLE ... SPLIT PARTITION
- ALTER INDEX ... SPLIT PARTITION
- ALTER INDEX ... REBUILD
- ALTER INDEX ... REBUILD PARTITION
- INSERT, UPDATE, and DELETE on LOBs in NOCACHE NOLOGGING mode stored out of line

To confirm if the table or index has "NOLOGGING" set.

Issue the following statement.

select table_name,logging from all_tables where table_name = <table name>;
-or-
select table_name,logging from all_indexes where index_name = <index name>;

4. Do tables have triggers that might cause some indirect DML on other tables?

5. Is Auditing enabled the contributor for this excessive redo generation?

6. Are tablespaces in hot backup mode?

7. Examine the log switches:

select lg.group#,lg.bytes/1024/1024 mb, lg.status, lg.archived,lf.member
from v$logfile lf, v$log lg where lg.group# = lf.group# order by 1, 2;

select to_char(first_time,'YYYY-MON-DD') "Date", to_char(first_time,'DY') day,
to_char(sum(decode(to_char(first_time,'HH24'),'00',1,0)),'999') "00",
to_char(sum(decode(to_char(first_time,'HH24'),'01',1,0)),'999') "01",
to_char(sum(decode(to_char(first_time,'HH24'),'02',1,0)),'999') "02",
to_char(sum(decode(to_char(first_time,'HH24'),'03',1,0)),'999') "03",
to_char(sum(decode(to_char(first_time,'HH24'),'04',1,0)),'999') "04",
to_char(sum(decode(to_char(first_time,'HH24'),'05',1,0)),'999') "05",
to_char(sum(decode(to_char(first_time,'HH24'),'06',1,0)),'999') "06",
to_char(sum(decode(to_char(first_time,'HH24'),'07',1,0)),'999') "07",
to_char(sum(decode(to_char(first_time,'HH24'),'08',1,0)),'999') "08",
to_char(sum(decode(to_char(first_time,'HH24'),'09',1,0)),'999') "09",
to_char(sum(decode(to_char(first_time,'HH24'),'10',1,0)),'999') "10",
to_char(sum(decode(to_char(first_time,'HH24'),'11',1,0)),'999') "11",
to_char(sum(decode(to_char(first_time,'HH24'),'12',1,0)),'999') "12",
to_char(sum(decode(to_char(first_time,'HH24'),'13',1,0)),'999') "13",
to_char(sum(decode(to_char(first_time,'HH24'),'14',1,0)),'999') "14",
to_char(sum(decode(to_char(first_time,'HH24'),'15',1,0)),'999') "15",
to_char(sum(decode(to_char(first_time,'HH24'),'16',1,0)),'999') "16",
to_char(sum(decode(to_char(first_time,'HH24'),'17',1,0)),'999') "17",
to_char(sum(decode(to_char(first_time,'HH24'),'18',1,0)),'999') "18",
to_char(sum(decode(to_char(first_time,'HH24'),'19',1,0)),'999') "19",
to_char(sum(decode(to_char(first_time,'HH24'),'20',1,0)),'999') "20",
to_char(sum(decode(to_char(first_time,'HH24'),'21',1,0)),'999') "21",
to_char(sum(decode(to_char(first_time,'HH24'),'22',1,0)),'999') "22",
to_char(sum(decode(to_char(first_time,'HH24'),'23',1,0)),'999') "23" ,
count(*) Total from v$log_history group by to_char(first_time,'YYYY-MON-DD'), to_char(first_time,'DY')
order by to_date(to_char(first_time,'YYYY-MON-DD'),'YYYY-MON-DD')

This will give us an idea of the times when the high peaks of redo are happening

8. Examine AWR report:

Next step will be examining the AWR from the hour where we have had the highest number of log switches, and confirm with the redo size that these log switches are actually caused by a lot of redo generation.
In the AWR we can also see the sql with most of the gets/executions to have an idea of the activity that is happening in the database and generating redo and we can also see the segments with the biggest number of block changes and the sessions performing these changes.
Another way to find these sessions is described in SQL: How to Find Sessions Generating Lots of Redo or Archive logs (Doc ID 167492.1)

To find these segments we can also use queries:

SELECT to_char(begin_interval_time,'YY-MM-DD HH24') snap_time,
dhso.object_name,
sum(db_block_changes_delta) BLOCK_CHANGED
FROM dba_hist_seg_stat dhss,
dba_hist_seg_stat_obj dhso,
dba_hist_snapshot dhs
WHERE dhs.snap_id = dhss.snap_id
AND dhs.instance_number = dhss.instance_number
AND dhss.obj# = dhso.obj#
AND dhss.dataobj# = dhso.dataobj#
AND begin_interval_time BETWEEN to_date('11-01-28 13:00','YY-MM-DD HH24:MI') <<<<<<<<<<<< Need to modify the time as per the above query where more redo log switch happened (keep it for 1 hour)
AND to_date('11-01-28 14:00','YY-MM-DD HH24:MI') <<<<<<<<<<<< Need to modify the time as per the above query where more redo log switch happened (interval shld be only 1 hour)
GROUP BY to_char(begin_interval_time,'YY-MM-DD HH24'),
dhso.object_name
HAVING sum(db_block_changes_delta) > 0
ORDER BY sum(db_block_changes_delta) desc ;

-- Then : What SQL was causing redo log generation :

SELECT to_char(begin_interval_time,'YYYY_MM_DD HH24') WHEN,
dbms_lob.substr(sql_text,4000,1) SQL,
dhss.instance_number INST_ID,
dhss.sql_id,
executions_delta exec_delta,
rows_processed_delta rows_proc_delta
FROM dba_hist_sqlstat dhss,
dba_hist_snapshot dhs,
dba_hist_sqltext dhst
WHERE upper(dhst.sql_text) LIKE '%<segment_name>%' >>>>>>>>>>>>>>>>>> Update the segment name as per the result of previous query result
AND ltrim(upper(dhst.sql_text)) NOT LIKE 'SELECT%'
AND dhss.snap_id=dhs.snap_id
AND dhss.instance_number=dhs.instance_number
AND dhss.sql_id=dhst.sql_id
AND begin_interval_time BETWEEN to_date('11-01-28 13:00','YY-MM-DD HH24:MI') >>>>>>>>>>>> Update time frame as required
AND to_date('11-01-28 14:00','YY-MM-DD HH24:MI') >>>>>>>>>>>> Update time frame as required

9. Finally, to troubleshoot further the issue and know the exact commands are being recorded at that particular time frame we can use log miner and mine the archivelog from the concerned time frame. We can look on v$archived_log and find the archived log generated at that particular time frame.
How To Determine The Cause Of Lots Of Redo Generation Using LogMiner (Doc ID 300395.1)
```

### the factors of the frequent Log Switches

These are the most relevant factors:

1. log_buffer size

```
If this is not explicitly set by the DBA then we use a default; at instance startup oracle calculates the number of shared redo strands as ncpus/16, and the size of each strand is 128Kb * ncpus (where ncpus is the number of CPUs in the system). The log buffersize is the number of stands multiplied by the strand size.
```

2. System load

```
Initially only one redo strand is used, ie the number of "active" redo strands is 1, and all the processes copy their redo into that one strand. When/if there is contention for that strand then the number of active redo strands is raised to 2. As contention for the active strands increases, the number of active strands increases. The maxmum possible number of active redo strands is the number of strands initially allocated in the log buffer.
(This feature is called "dynamic strands", and there is a hidden parameter to disable it which then allows processes to use all the strands from the outset).
```

3. Log file size

```
It may not always be possible to provide a specific size recommendation for redo log files, but redo log files in the range of a hundred megabytes to a few gigabytes are considered reasonable. Size your online redo log files according to the amount of redo your system generates. A rough guide is to switch logs at most once every twenty minutes."
```

4. the logfile space reservation algorithm

```
When oracle switches into a new online redo logfile, all the log buffer redo strand memory is "mapped" to the logfile space. If the logfile is larger than the log buffer then each strand will map/reserve its strand size worth of logfile space, and the remaining logfile space (the "log residue") is still available.
If the logfile is smaller than the log buffer, then the whole logfile space is divided/mapped/reserved equally among all the strands, and there is no unreserved space (ie no log residue).
When any process fills a strand such that all the reserved underlying logfile space for that strand is used, AND there is no log residue, then a log switch is scheduled.
```

### Simple Steps to use Log Miner for finding high redo log generation

```
1. Enable SUPPLEMENTAL Log to Database.

SQL> ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
 
2. As sysdba, install the logminer package (if not installed by default installed) from following path

SQL> @ORACLE_HOME/rdbms/admin/dbmslm.sql
NOTE:
You can simply check whether logminer is already available using

SQL> desc dbms_logmnr
 
3 Create a list of logs by specifying the NEW option when executing the  DBMS_LOGMNR.ADD_LOGFILE procedure.

NOTE:
You can query the available archived redo log files from v$archived_log
 
For example, enter the following:

SQL> EXECUTE DBMS_LOGMNR.ADD_LOGFILE( -
     LOGFILENAME => '+FRA/v1120/archivelog/2012_11_09thread_1_seq_563.260.798899749', -
     OPTIONS => DBMS_LOGMNR.NEW);
 
4. If desired, add more logs by specifying the ADDFILE option.

SQL> EXECUTE DBMS_LOGMNR.ADD_LOGFILE( -
     LOGFILENAME => '+FRA/v1120/archivelog/2012_11_09/thread_1_seq_564.261.798899763', -
     OPTIONS => DBMS_LOGMNR.ADDFILE);

5. Start LogMiner.

Start LogMiner and specify the dictionary to use.

SQL> EXECUTE DBMS_LOGMNR.START_LOGMNR( -
     OPTIONS => DBMS_LOGMNR.DICT_FROM_ONLINE_CATALOG);
 

NOTE:
Using DICT_FROM_ONLINE_CATALOG, the database must be open and only redo can be mined of the latest table versions.

For more information, please refer to
  Oracle® Database Utilities
  11g Release 2 (11.2)
  Chapter 19 Using LogMiner to Analyze Redo Log Files
  http://docs.oracle.com/cd/E11882_01/server.112/e22490/logminer.htm#SUTIL019
 
6. Query the V$LOGMNR_CONTENTS view.

SQL> SELECT username AS USR, 
     (XIDUSN || '.' || XIDSLT || '.' || XIDSQN) AS XID, 
     operation, 
     SQL_REDO, 
     SQL_UNDO 
     FROM V$LOGMNR_CONTENTS 
     WHERE username IN ('<Username>');
NOTE:
For other possible columns to query, please issue:

SQL> desc v$logmnr_contents

7. End the LogMiner session.

SQL&gt; EXECUTE DBMS_LOGMNR.END_LOGMNR();
```

### some scripts for redo

```
sqlplus / as sysdba
set markup html on spool on
SPOOL logswitch.HTML
set echo on
set pagesize 30;
select systimestamp from dual;
select * from v$version;
select name,LOG_MODE from v$database;
select * from v$instance_recovery;
select OPTIMAL_LOGFILE_SIZE from v$instance_recovery;
show parameter log_buffer;
show parameter log_checkpoint_interval;
show parameter log_checkpoint_timeout;
show parameter fast_start_mttr_target;
show parameter archive_lag_target;
show parameter filesystem
show parameter disk
select name,value from v$parameter where name like '%log_archive%' and value <> 'enable';
select name from v$controlfile;
select lg.group#,lg.bytes/1024/1024 mb, lg.status, lg.archived,lf.member
from v$logfile lf, v$log lg
where lg.group# = lf.group#
order by 1, 2;
select lg.group#,lg.bytes/1024/1024 mb, lg.status, lg.archived,lf.member
from v$logfile lf, v$log lg where lg.group# = lf.group# order by 1, 2;
PROMPT top_redo.sql
col machine for a15
col username for a10
col redo_MB for 999G990 heading "Redo |Size MB"
column sid_serial for a13;
select b.inst_id,
lpad((b.SID || ',' || lpad(b.serial#,5)),11) sid_serial,
b.username,
machine,
b.osuser,
b.status,
a.redo_mb
from (select n.inst_id, sid,
round(value/1024/1024) redo_mb
from gv$statname n, gv$sesstat s
where n.inst_id=s.inst_id
and n.name = 'redo size'
and s.statistic# = n.statistic#
order by value desc
) a,
gv$session b
where b.inst_id=a.inst_id
and a.sid = b.sid
and rownum <= 30;
select to_char(first_time,'YYYY-MON-DD') "Date", to_char(first_time,'DY') day,
to_char(sum(decode(to_char(first_time,'HH24'),'00',1,0)),'999') "00",
to_char(sum(decode(to_char(first_time,'HH24'),'01',1,0)),'999') "01",
to_char(sum(decode(to_char(first_time,'HH24'),'02',1,0)),'999') "02",
to_char(sum(decode(to_char(first_time,'HH24'),'03',1,0)),'999') "03",
to_char(sum(decode(to_char(first_time,'HH24'),'04',1,0)),'999') "04",
to_char(sum(decode(to_char(first_time,'HH24'),'05',1,0)),'999') "05",
to_char(sum(decode(to_char(first_time,'HH24'),'06',1,0)),'999') "06",
to_char(sum(decode(to_char(first_time,'HH24'),'07',1,0)),'999') "07",
to_char(sum(decode(to_char(first_time,'HH24'),'08',1,0)),'999') "08",
to_char(sum(decode(to_char(first_time,'HH24'),'09',1,0)),'999') "09",
to_char(sum(decode(to_char(first_time,'HH24'),'10',1,0)),'999') "10",
to_char(sum(decode(to_char(first_time,'HH24'),'11',1,0)),'999') "11",
to_char(sum(decode(to_char(first_time,'HH24'),'12',1,0)),'999') "12",
to_char(sum(decode(to_char(first_time,'HH24'),'13',1,0)),'999') "13",
to_char(sum(decode(to_char(first_time,'HH24'),'14',1,0)),'999') "14",
to_char(sum(decode(to_char(first_time,'HH24'),'15',1,0)),'999') "15",
to_char(sum(decode(to_char(first_time,'HH24'),'16',1,0)),'999') "16",
to_char(sum(decode(to_char(first_time,'HH24'),'17',1,0)),'999') "17",
to_char(sum(decode(to_char(first_time,'HH24'),'18',1,0)),'999') "18",
to_char(sum(decode(to_char(first_time,'HH24'),'19',1,0)),'999') "19",
to_char(sum(decode(to_char(first_time,'HH24'),'20',1,0)),'999') "20",
to_char(sum(decode(to_char(first_time,'HH24'),'21',1,0)),'999') "21",
to_char(sum(decode(to_char(first_time,'HH24'),'22',1,0)),'999') "22",
to_char(sum(decode(to_char(first_time,'HH24'),'23',1,0)),'999') "23" ,
count(*) Total
from v$log_history
group by to_char(first_time,'YYYY-MON-DD'), to_char(first_time,'DY')
order by to_date(to_char(first_time,'YYYY-MON-DD'),'YYYY-MON-DD')
/
select to_char(COMPLETION_TIME,'DD/MON/YYYY') Day,
trunc(sum(blocks*block_size)/1048576/1024,2) "Size(GB)",count(sequence#) "Total Archives"
from
(select distinct sequence#,thread#,COMPLETION_TIME,blocks,block_size from v$archived_log)
group by to_char(COMPLETION_TIME,'DD/MON/YYYY')
order by to_date(to_char(COMPLETION_TIME,'DD/MON/YYYY'),'DD/MON/YYYY')
;
spool off
set markup html off spool off

-- the trend of log switches below queries can be used.
alter session set NLS_DATE_FORMAT='DD-MON-YYYY HH24:MI:SS';

select trunc(first_time, 'HH') , count(*) from v$loghist group by trunc(first_time, 'HH') order by trunc(first_time, 'HH');

```

### Ref

Doc ID 2265722.1 How to identify the causes of High Redo Generation

Doc ID 2583742.1 Huge Redo Generation by Alter Index Coalesce Cleanup

Doc ID 1969765.1 Huge Redo Generation by Compression Advisor

Doc ID 2461550.1 Materialized View Generating Huge Amount Of Redo And Archived Logs During Complete Refresh

Doc ID 2746072.1 SQL TUNING ADVISORY JOB CAUSING HIGH REDO GENERATION OR Select .. for update statement

Doc ID 2768913.1 Huge Arch Generation Causing Database Hang

Doc ID 1504755.1 Simple Steps to use Log Miner for finding high redo log generation

Doc ID 832504.1  Excessive Archives / Redo Logs Generation due to AWR / ASH - Troubleshooting

Doc ID 167492.1  How to Find Sessions Generating Lots of Redo

Doc ID 300395.1  How To Determine The Cause Of Lots Of Redo Generation Using LogMiner

Doc ID 199298.1  Diagnosing excessive redo generation

Doc ID 69739.1 - How to Turn Archiving ON and OFF in Oracle RDBMS

### 

Have a good work&life! 2025/03 via LinHong
