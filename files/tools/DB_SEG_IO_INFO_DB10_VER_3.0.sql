/*                                               
################################################################################
#
# DB_SEG_IO_INFO_10_V3.sql
#
#===============================================================================
# Author        : Juriy Matey - Oracle Corporation
# Last modified : Aug 21, 2014
# Version       : 3.0
# Purpose       : Script to check the database segments IO
#===============================================================================
#
#  Disclaimer:
#  -----------
#     Although this program has been tested and used successfully, it is not 
#  supported by Oracle Support Services.
#     It has been tested internally, and works as documented, however, we do not 
#  guarantee that it will work for you, so be sure to test it in your test 
#  environment before relying on it.  
#     We do not claim any responsibility for any problems and/or damage caused 
#  by this program. This program comes "as is", please use it at your own risk.
#     Due to the differences in the way text editors, e-mail programs and 
#  operating systems handle text formatting (spaces, tabs and carriage returns),
#  proofread this script before execution.
#
#
#  Usage:
#  ---------------
#  To execute this script, please follow the steps below:
#     1) Copy this script to the desired location.
#
#     2) Execute the script in SQL*Plus as a privileged user (SYS or SYSTEM). 
#        Important: DO NOT copy-paste the content of the script into SQL*Plus
#                   prompt. Simply type "@DB_SEG_IO_INFO_10_V3.sql" (exluding 
#                   quotes) in the SQL*Plus prompt and hit Enter to execute.
#
#     3) The script will generate an output file named "db_seg_io_<your DB NAME>_out.txt".
#
#     4) Locate the output file in the current directory, and send it to your 
#        Oracle representative.
#
*/

--
-- To reduce the size of the report, as well as the number of lines in it to
-- analyze, only the segments responsible for the specified percentage of the
-- total physical IOs (reads and writes, combined) will be spooled. 
--
-- The default percentage is 90. To change that - modify the line below.
--

define v_top_pio_perc = 90

--
-- This is the list of schemas to exclude from IO analysis. If necessary, modify the list below
--
define schema_exclusion_list = "'SYS','SYSTEM','SYSMAN','OUTLN','DBSNMP','DIP','EXFSYS','MDSYS','ORACLE_OCM','ORDPLUGINS','ORDSYS','WMSYS','XDB'"

-------------------------------------------------

set lines 2000 pages 50000
set trimspool on
set head on 
set verify off
set define on
set feedback off
set head on
set numwidth 12
set numformat ""
set sqlbl on

undef total_db_pr
undef total_db_pw
undef segs_with_IO_rep_size_gb
undef segs_with_IO_size_gb
undef total_db_size_gb
undef disk_space_alloc
undef temp_space_alloc
undef db_name
undef inst_cnt
undef report_time
undef startup_time
undef uptime_sec

col owner format a15           hea "Owner"
col object_name format a30     hea "Object name"
col object_type format a20     hea "Object Type"
col subobject_name format a30  hea "Partition name" nul N/A
col part_sz_gb noprint
col part_size_gb format 999999999.99  hea "Partition|segment size, GB"
col seg_size_gb  format 999999999.99  hea "Object|segment size, GB"
col tablespace_name format a30 hea "Tablespace name"
col pr print  hea "Physical Reads|"
col prd print hea "Physical Reads|Direct"
col pw print  hea "Physical Writes|"
col pwd print hea "Physical Writes|Direct"
col pr_2_pw_seg_ratio format 999.99  hea "Ratio of Reads in| total Segment IO, %"
col sum_physical_IO_seg  hea "Total physical IOs| (R+W) per segment"
col seg_pr_2_db_pr_ratio format 999.00  hea " Ratio of Segment Reads|in Total DB Reads, %"
col seg_pw_2_db_pw_ratio format 999.00  hea " Ratio of Segment Writes|in Total DB Writes, %"
col pio_perc_running format 999.99 hea " Ratio of Segment IOs(r+w) in| DB IOs(r+w), cumulative, %"
col total_pr new_value total_db_pr noprint
col total_pw new_value total_db_pw noprint
col segs_with_IO_size_gb new_value segs_with_IO_size_gb noprint
col segs_with_IO_rep_size_gb new_value segs_with_IO_rep_size_gb noprint
col total_db_size_gb new_value total_db_size_gb noprint
col disk_space_alloc new_value disk_space_alloc noprint
col temp_space_alloc new_value temp_space_alloc noprint
col db_name new_value db_name noprint
col inst_cnt new_value inst_cnt noprint
col report_time new_value report_time noprint
col startup_time new_value startup_time noprint
col uptime_sec new_value uptime_sec noprint

select name as db_name from v$database;

spool db_seg_io_&db_name._out.txt

with 
     v_uptime as
       (select count(*) inst_cnt,
               to_char(sysdate, 'yyyy-Mon-dd hh24:mi:ss')             as report_time, 
               to_char(min(i.startup_time), 'yyyy-Mon-dd hh24:mi:ss') as startup_time, 
               trunc(min(sysdate - i.startup_time)*24*60*60)          as uptime_sec 
          from gv$instance i, gv$database d
         where i.inst_id=d.inst_id),
     v_segstats as
       (select vss.*, 
               sum(pr) over () as total_pr,
               sum(pw) over () as total_pw
          from (select owner, object_name, subobject_name, 
                       ss.tablespace_name, object_type, 
                       sum(decode(statistic_name, 'physical reads', value,'0')) PR,
                       sum(decode(statistic_name, 'physical reads direct', value,'0')) PRD,
                       sum(decode(statistic_name, 'physical writes', value,'0')) PW,
                       sum(decode(statistic_name, 'physical writes direct', value,'0')) PWD
                  from gv$segment_statistics ss,
                       dba_tablespaces ts
                 where ss.owner not in (&schema_exclusion_list)
                   and ss.tablespace_name = ts.tablespace_name
                   and ts.contents <> 'TEMPORARY'
                 group by owner, object_name, subobject_name, ss.tablespace_name, object_type  
               ) vss
       ),
     v_dbasegs as
       (select 
               round(bytes/1024/1024/1024, 4)             as part_sz_gb,
               round(sum(bytes/1024/1024/1024) over(partition by owner, segment_type, segment_name), 4) as seg_sz_gb,
--               round(sum(bytes/1024/1024/1024) over(), 4) as total_db_sz_gb,
               s.*
          from dba_segments s
         where s.owner not in (&schema_exclusion_list) -- schema Exclusion List
       ),
     v_dbsize as
       (select round(sum(bytes/1024/1024/1024), 4) as total_db_sz_gb
          from dba_segments
       ),
     v_diskdfalloc as
       (select sum(bytes)/1024/1024/1024 disk_space_alloc
          from dba_data_files
       ),
     v_disktempalloc as
       (select sum(bytes)/1024/1024/1024 temp_space_alloc
          from dba_temp_files
       )
select v.*,
       sum(part_sz_gb) over() as segs_with_IO_rep_size_gb
  from (
        select  /*+ use_hash (a b) */ 
                a.owner,
                object_name,
                object_type, 
                subobject_name, 
                nvl2(partition_name, b.part_sz_gb, null) as part_size_gb,
                b.seg_sz_gb                              as seg_size_gb,
                b.tablespace_name,
                pr, 
                prd, 
                pw, 
                pwd, 
                pr+pw as sum_physical_IO_seg,
                round(pr /nullif(pr+pw,0)*100,2) pr_2_pw_seg_ratio,
                total_pr,
                total_pw,
                pr * 100/total_pr as seg_pr_2_db_pr_ratio,
                pw * 100/total_pw as seg_pw_2_db_pw_ratio,
                sum((pr+pw) * 100 / (total_pr + total_pw)) over (order by pr+pw desc, rownum) as pio_perc_running,
                sum(b.part_sz_gb) over() as segs_with_IO_size_gb,
                b.part_sz_gb,
                total_db_sz_gb         as total_db_size_gb,
		disk_space_alloc,
		temp_space_alloc,
                inst_cnt,
                report_time,
                startup_time,
                uptime_sec,
          count(1) over() tot_rows
          from
                 v_dbasegs b
               , v_segstats a 
               , v_uptime
               , v_dbsize
               , v_diskdfalloc
               , v_disktempalloc
         where a.owner = b.owner
           and a.object_name = b.segment_name
           and a.object_type = b.segment_type
           and (a.subobject_name = b.partition_name or a.subobject_name is null)
           and a.tablespace_name = b.tablespace_name
) v
where rownum<=1 
   or pio_perc_running <= &v_top_pio_perc;

set head off
col rn noprint

select rpad('=',55,'=') from dual union all
select 'Summary Report' from dual union all
select rpad('=',55,'=') from dual union all
select 'Report generated on:           '||'&report_time' from dual union all
select 'Database name:                 '||'&db_name'     from dual union all
select 'Number of instances:         '||to_char(&inst_cnt, '99') from dual union all
select 'Schemas excluded from report:  '||rtrim(xmlagg(xmlelement(e, username||',')).extract('//text()'), ',') 
  from dba_users 
 where username in (&schema_exclusion_list)
union all
select ' ' from dual union all
select 'Total # of segment Reads:    '||to_char( &total_db_pr, '999,999,999,999') from dual union all
select 'Total # of segment Writes:   '||to_char( &total_db_pw, '999,999,999,999') from dual union all
select 'Total # of segment IOs (R+W):'||to_char( &total_db_pr + &total_db_pw, '999,999,999,999') from dual union all
select 'Reads vs Total segment IOs (R+W), %:  '||to_char(round( &total_db_pr * 100 / ( &total_db_pr + &total_db_pw ), 2), '999.00') total_pr_2_pw_ratio from dual union all
select ' ' from dual union all
select 'Segments generating &v_top_pio_perc% of all IOs, GB:'||to_char( &segs_with_IO_rep_size_gb, '9,999,999.00') from dual union all
select 'All segments with IOs. Total size, GB: '||to_char( &segs_with_IO_size_gb, '9,999,999.00') from dual union all
select 'Total DB size, GB:                     '||to_char( &total_db_size_gb, '9,999,999.00') from dual union all
select 'Total disk space allocated, GB:        '||to_char( &disk_space_alloc + &temp_space_alloc, '9,999,999.00')||'    (including'||
                                                  to_char( &temp_space_alloc, '99999.00')||' GB of Temp space)' from dual union all
select ' ' from dual union all
select 'Oldest instance startup time:     '||'&startup_time' from dual union all
select 'Oldest instance uptime (seconds):         '||to_char(&uptime_sec,'999,999,999') from dual union all
select rpad('=',55,'=')	 from dual;

spool off
set numwidth 10
set head on

undef total_db_pr
undef total_db_pw
undef segs_with_IO_size_gb
undef segs_with_IO_rep_size_gb
undef total_db_size_gb
undef total_disk_space_alloc
undef db_name
undef inst_cnt
undef report_time
undef startup_time
undef uptime_sec
undef v_top_pio_perc
undef disk_space_alloc
undef temp_space_alloc
undef schema_exclusion_list