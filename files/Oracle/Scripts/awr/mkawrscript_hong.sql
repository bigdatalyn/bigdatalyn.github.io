-- ============================================================================
-- mkawrscript.sql
--
-- Build a temporary script to collect multiple consecutive Oracle AWR reports.
-- It will create an output SQL script which, when run, will generate all AWR
-- reports between the specificed start and end snapshot IDs for all instances.
--
-- Revised By:
--   - Brian Jin (brian.jin@oracle.com)/Systems - SE Hub
--   - Kevin Xin (kevin.xin@oracle.com)/Systems - SE Hub
--   - Hong Lin (hong.lin@oracle.com)/Systems - SE Hub
--
-- Forked from:
--   https://github.com/flashdba/scripts/blob/master/awr-generator.sql
--
-- Version 1.4
--
-- Usage:
--  SQL> @mkawrscript
--
-- User Requiring Accessing AWR/ADDM:
--  SQL> create user <awr_admin> identified by <password>;
--  SQL> grant select any dictionary to <awr_admin>;
--  SQL> grant create session to <awr_admin>;
--  SQL> grant execute on dbms_workload_repository to <awr_admin>;
-- ============================================================================
--  ###########################################################################
--  #                                                                         #
--  # Copyright (C) {2019}  Author: Kevin Xin (kevin.xin@oracle.com)          #
--  #                                                                         #
--  # This program is free software; you can redistribute it and/or           #
--  # modify it under the terms of the GNU General Public License             #
--  # as published by the Free Software Foundation; either version 2          #
--  # of the License, or (at your option) any later version.                  #
--  #                                                                         #
--  # This program is distributed in the hope that it will be useful,         #
--  # but WITHOUT ANY WARRANTY; without even the implied warranty of          #
--  # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the           #
--  # GNU General Public License for more details.                            #
--  #                                                                         #
--  # You should have received a copy of the GNU General Public License       #
--  # along with this program.  If not, see <https://www.gnu.org/licenses/>.  #
--  #                                                                         #
--  ###########################################################################
set feedback off
set echo off
set verify off
set timing off

-- Set AWR_FORMAT to "html"
define AWR_FORMAT              = 'html'
define DEFAULT_OUTPUT_FILENAME = 'getawr.sql'

set echo off heading on
column inst_num  heading "Inst Num"  new_value inst_num  format 99999;
column inst_name heading "Instance"  new_value inst_name format a12;
column db_name   heading "DB Name"   new_value db_name   format a12;
column dbid      heading "DB ID"     new_value dbid      format 9999999999 just c;

-- Comment out this section to support PDB-leve AWR collection
-- prompt Current Instance
-- prompt ============================================================================
--
-- select d.dbid            dbid
--      , d.name            db_name
--      , i.instance_number inst_num
--      , i.instance_name   inst_name
-- from v$database d,
--      v$instance i;

-- Get values for dbid and inst_num before calling awrinput.sql
-- Call the Oracle common input script to setup start and end snap ids
@@?/rdbms/admin/awrinput.sql


prompt
prompt Specify the interval minutes of snapshots
prompt ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
prompt Entering the number of minutes will result in choose 
prompt interval minutes between snapshots(like 30/60...)
prompt Pressing <return> without
prompt specifying a number uses default interval minutes.
prompt

set heading off;
set serveroutput on;
set verify off;

column interval_mins new_value interval_mins noprint;
select    'Setting '
       || decode( nvl('&&interval_mins', 3.14)
                , 0    , 'the default interval minutes'
                , 3.14 , 'the default interval minutes'
                , 'the interval minutes: &interval_mins')
     , nvl('&&interval_mins', 3.14)  interval_mins
  from sys.dual;

-- exec dbms_output.put_line('Test is value:'|| &interval_mins);


-- column current_db_id new_value current_db_id noprint;
-- select DBID as current_db_id from v$containers where CON_ID like (select sys_context('USERENV', 'CON_ID') from dual);

set heading off
column outfile_name new_value outfile_name noprint;
select 'Building the SQL script of ' || nvl('&DEFAULT_OUTPUT_FILENAME','getawr.sql'), nvl('&DEFAULT_OUTPUT_FILENAME','getawr.sql') outfile_name from dual;

set linesize 800
set serverout on
set termout off

spool &outfile_name replace

-- write script header comments
select '-- Temporary script created by mkawrscript.sql' from dual;
select '-- Used to create multiple AWR reports between two snapshots' from dual;
select '-- Created by user ' || user || ' on ' || sys_context('userenv', 'host') || ' at ' || to_char(sysdate, 'yyyy/mm/dd hh24:MI') from dual;

set heading on

-- Begin iterating through snapshots and generating reports

variable v_interval_mins number;
begin
  :v_interval_mins  := &interval_mins;
end;
/

-- exec dbms_output.put_line('Test is value:'|| :v_interval_mins);
-- exec dbms_output.put_line('Test is value:'|| &interval_mins);

DECLARE

  s_dynsql         VARCHAR2(4096);
  TYPE cur_row_type IS RECORD
  (
    inst_num number, 
    start_snap_id number, 
    end_snap_id number,
    b_time varchar2(15),
    e_time varchar2(15)
  );
  cur    sys_refcursor;
  cr_snapshot cur_row_type;
  c_dbid           CONSTANT NUMBER := :dbid;
  c_inst_num       CONSTANT NUMBER := :inst_num;
  c_start_snap_id  CONSTANT NUMBER := :bid;
  c_end_snap_id    CONSTANT NUMBER := :eid;
  c_report_type    CONSTANT CHAR(4):= '&&AWR_FORMAT';
  v_report_count   NUMBER          := 0;
  v_awr_reportname VARCHAR2(100);
  v_report_suffix  CHAR(5);

  c_interval_mins  CONSTANT NUMBER := :v_interval_mins;

BEGIN

  dbms_output.put_line('');
  dbms_output.put_line('prompt Beginning AWR generation...');
  dbms_output.put_line('set heading off feedback off lines 800 pages 5000 trimspool on trimout on');

  -- Determine report type (html or text)
  IF c_report_type = 'html' THEN
    v_report_suffix := '.html';
  ELSE
    v_report_suffix := '.txt';
  END IF;

  -- Iterate through snapshots

    IF (c_interval_mins <> 3.14) THEN
    s_dynsql := 
        'with temp_t as 
        (select inst_num, start_snap_id, end_snap_id,
            to_char(round(begin_timestamp,''mi''),''yyyymmdd_hh24MI'') as b_time,
            to_char(round(end_timestamp,''mi''),''yyyymmdd_hh24MI'') as e_time,
                begin_timestamp,
                end_timestamp
            from (
            select s.instance_number as inst_num,
                    s.snap_id as start_snap_id,
                    lead(s.snap_id,1,null) over (partition by s.instance_number order by s.snap_id) as end_snap_id,
                    end_interval_time begin_timestamp,
                    lead(s.end_interval_time,1,null) over (partition by s.instance_number order by s.end_interval_time) as end_timestamp
            from dba_hist_snapshot s
        where s.dbid            = :dbid
            and s.snap_id        >= :bid
            and s.snap_id        <= :eid
            )
            where end_snap_id is not null
            order by inst_num, start_snap_id, begin_timestamp)
        select inst_num,start_snap_id, end_snap_id, b_time, e_time from
            (
                select ret.inst_num, ret.start_snap_id,
                    lead(ret.start_snap_id,1,null) over(partition by ret.inst_num order by ret.end_snap_id) as end_snap_id,
                    ret.b_time, 
                    lead(ret.b_time,1,null) over(partition by ret.inst_num order by ret.e_time) as e_time
                    from 
                    (
                        select inst_num, start_snap_id, end_snap_id, b_time, e_time from 
                            (select ret1.inst_num, ret1.start_snap_id, ret1.end_snap_id, ret1.b_time, ret1.e_time, ret1.begin_timestamp, ret1.end_timestamp
                            ,round((cast(ret1.begin_timestamp as date)-cast(ret2.begin_timestamp as date))*24*60) as dura_mins
                            ,mod(round((cast(ret1.begin_timestamp as date)-cast(ret2.begin_timestamp as date))*24*60),&interval_mins)
                            from
                            temp_t ret1 left join (select a1.inst_num as inst_num,min(a1.begin_timestamp) as begin_timestamp from temp_t a1 group by a1.inst_num) ret2
                            on ret1.inst_num = ret2.inst_num
                            )
                            where mod(dura_mins,&interval_mins) < 5
                    ) ret
            ) where e_time is not null 
            order by inst_num,start_snap_id
        ';
        -- tolerance minuters: 5 minutes
    ELSE 
    s_dynsql := 
    'select inst_num, start_snap_id, end_snap_id,
            to_char(round(begin_timestamp,''mi''),''yyyymmdd_hh24MI'') as b_time,
            to_char(round(end_timestamp,''mi''),''yyyymmdd_hh24MI'') as e_time
        from (
        select s.instance_number as inst_num,
                s.snap_id as start_snap_id,
                lead(s.snap_id,1,null) over (partition by s.instance_number order by s.snap_id) as end_snap_id,
                end_interval_time begin_timestamp,
                lead(s.end_interval_time,1,null) over (partition by s.instance_number order by s.end_interval_time) as end_timestamp
        from dba_hist_snapshot s
        where s.dbid            = :dbid
            and s.snap_id        >= :bid
            and s.snap_id        <= :eid
        )
        where end_snap_id is not null
        order by inst_num, start_snap_id';
    END IF;

  OPEN cur for s_dynsql using :dbid, :bid, :eid;
   LOOP 
     FETCH cur INTO cr_snapshot;
     exit when cur%notfound;

    -- Construct filename for AWR report
    v_awr_reportname := 'awrrpt_' || cr_snapshot.b_time || '-' || cr_snapshot.e_time
        || '_INST_' ||cr_snapshot.inst_num || '_'
        || cr_snapshot.start_snap_id || '-' || cr_snapshot.end_snap_id || v_report_suffix;

    dbms_output.put_line('-- ' || cr_snapshot.b_time || '-' || cr_snapshot.e_time || '_INST#' || cr_snapshot.inst_num);
    dbms_output.put_line('prompt Creating AWR report '|| v_awr_reportname
        || ' for INST#' || cr_snapshot.inst_num
        || ' from snapshot ' || cr_snapshot.start_snap_id || ' to ' || cr_snapshot.end_snap_id || '...');
    -- dbms_output.put_line('prompt');
    -- Disable terminal output to stop AWR text appearing on screen
    dbms_output.put_line('set termout off');

    -- Set spool to create AWR report file
    dbms_output.put_line('spool ' || v_awr_reportname);

    -- call the table function to generate the report
    IF c_report_type = 'html' THEN
        dbms_output.put_line('select output from table(dbms_workload_repository.awr_report_html('
            || c_dbid || ',' || cr_snapshot.inst_num || ',' || cr_snapshot.start_snap_id || ',' || cr_snapshot.end_snap_id || '));');
    ELSE
        dbms_output.put_line('select output from table(dbms_workload_repository.awr_report_text('
            || c_dbid || ',' || cr_snapshot.inst_num || ',' || cr_snapshot.start_snap_id || ',' || cr_snapshot.end_snap_id || '));');
    END IF;

    dbms_output.put_line('spool off');

    -- Enable terminal output having finished generating AWR report
    dbms_output.put_line('set termout on');
    dbms_output.put_line('--');
    v_report_count := v_report_count + 1;
  END LOOP;
  close cur;  

  dbms_output.put_line('set heading on feedback 6 lines 100 pages 45');
  dbms_output.put_line('prompt AWR generation completed with '|| v_report_count ||' reports.');
  dbms_output.put_line('exit');

END;
/

spool off
set termout on

prompt Done with &outfile_name.
prompt ============================================================================
prompt Next, check and launch:
prompt
prompt @&outfile_name
prompt
prompt to generate AWR reports in the current folder.
prompt ============================================================================
prompt

--clear columns sql
undefine interval_mins
undefine v_interval_mins
undefine outfile_name
undefine AWR_FORMAT
undefine DEFAULT_OUTPUT_FILENAME

set feedback 6 verify on lines 100 pages 45

