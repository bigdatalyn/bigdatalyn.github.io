


### Running a SQL ID using SPA

File : RUN_STMT_SQLPA.sql

(Usage : e.g.  @RUN_STMT_SQLPA PRC fj7aqxmgrhc6f FA1910.sql)

-- Usage
--   sqlplus user/pswd @ run_stmt_sqlpa sql_id sql_file
--   example:
--     sqlplus fusion/fusion @ run_stmt_sqlpa sql_id sql_file
--     Afterwards grab the info from the log that comes out
--       egrep 'Elapsed Time|CPU Time|Buffer Gets|Rows Processed|Plan hash' DEBUG*.log
-- Assumption
--     only one STS maps to provided sql_id
--     there's a sql_file.sql file to run
--     create sequence debugseq;
 
set serveroutput on
whenever sqlerror exit
 
define sqlsetname=&1
define sql_id=&2
define sql_file=&3
-- get a uniq number
 
column seqnum NEW_VALUE seqnum
select to_char(debugseq.nextval) seqnum from dual;
 
--  select SQLSET_NAME sqlsetname
--  from   DBA_SQLSET_STATEMENTS
--  where  sql_id= '&sql_id'
--    and  SQLSET_NAME not like 'AUTO%';
--    and  (SQLSET_NAME like 'REL%' or SQLSET_NAME like 'NS%');
 
-- column sqlsetname NEW_VALUE sqlsetname
-- select SQLSET_NAME sqlsetname
--  from   DBA_SQLSET_STATEMENTS
--  where  sql_id= '&sql_id'
--    and  SQLSET_NAME not like 'AUTO%';
--    and  rownum = 1;
--    and  (SQLSET_NAME like 'REL%' or SQLSET_NAME like 'NS%');
 
spool DEBUG_&sqlsetname._&sql_id._&seqnum._&sql_file..log
 
@ vpd_&sqlsetname.
-- exec nl_user_pckg.set_nl_user_info('MSTRWLF',-5,3);
set echo on feedback on verify off
@ &sql_file
set echo off feedback off
 
VAR TASK_NAME      VARCHAR2(128)
VAR EXECUTION_NAME VARCHAR2(128)
exec :TASK_NAME      := 'DEBUG_&sqlsetname._&sql_id.';
exec :EXECUTION_NAME := '&sql_file.:&sqlsetname.:D&seqnum.';
 
declare
  SQLSET_OWNER   VARCHAR2(128);
  SQLSET_NAME    VARCHAR2(128);
  TASK_NAME      VARCHAR2(128) := :TASK_NAME ;
  EXECUTION_NAME VARCHAR2(128) := :EXECUTION_NAME ;
  BASIC_FILTER   VARCHAR2(128) := q'#sql_id = '&sql_id.' #';
  task_name_out  VARCHAR2(128);
  analysis_task_exists exception;
  PRAGMA EXCEPTION_INIT(analysis_task_exists, -13607);
 
begin
  select SQLSET_OWNER,SQLSET_NAME
    into SQLSET_OWNER,SQLSET_NAME
  from   DBA_SQLSET_STATEMENTS
  where  sql_id= '&sql_id'
    and  SQLSET_NAME = '&sqlsetname.'
    and  rownum=1;
 
  BEGIN
  task_name_out := dbms_sqlpa.create_analysis_task(TASK_NAME    => TASK_NAME,
                                  BASIC_FILTER => BASIC_FILTER,
                                  SQLSET_OWNER => SQLSET_OWNER,
                                  SQLSET_NAME  => SQLSET_NAME );
  EXCEPTION
   when analysis_task_exists then
     DBMS_OUTPUT.PUT_LINE('task already exisits, continuing');
  /*
  dbms_sqlpa.drop_analysis_task(TASK_NAME);
  task_name_out := dbms_sqlpa.create_analysis_task(TASK_NAME    => TASK_NAME,
                                  BASIC_FILTER => BASIC_FILTER,
                                  SQLSET_OWNER => SQLSET_OWNER,
                                  SQLSET_NAME  => SQLSET_NAME );
  */
   when others then
     RAISE;
  END;
 
end;
/
 
set echo on
--exec  dbms_sqlpa.set_analysis_task_parameter(:TASK_NAME,'NUM_ROWS_TO_FETCH',10);
exec dbms_sqlpa.set_analysis_task_parameter(:TASK_NAME,'REPLACE_SYSDATE_WITH','SQLSET_SYSDATE');
exec dbms_sqlpa.set_analysis_task_parameter(:TASK_NAME,'LOCAL_TIME_LIMIT',3600);
exec dbms_sqlpa.set_analysis_task_parameter(:TASK_NAME,'TIME_LIMIT',200000000000);
exec dbms_sqlpa.set_analysis_task_parameter(:TASK_NAME,'EXECUTE_FULLDML','FALSE');
exec dbms_sqlpa.set_analysis_task_parameter(:TASK_NAME,'DISABLE_MULTI_EXEC','FALSE');
set echo off
 
exec dbms_lock.sleep(1);
 
REM DEBUG:  ALTER SESSION SET TRACEFILE_IDENTIFIER = "&sql_id._&seqnum._&sql_file._ESTACK";
REM DEBUG:  ALTER SESSION SET EVENTS '##### trace name errorstack level 3';
 
REM DEBUG:  ALTER SESSION SET TRACEFILE_IDENTIFIER = "&sql_id._&seqnum._&sql_file._SQLTRC";
REM DEBUG:  ALTER SESSION SET EVENTS '10046 trace name context forever, level 12';
 
REM DEBUG:  ALTER SESSION SET TRACEFILE_IDENTIFIER = "&sql_id._&seqnum._&sql_file._OPTTRC";
REM DEBUG:  ALTER SESSION SET EVENTS '10053 trace name context forever, level 1';
REM DEBUG:  for recursive sql 10054
REM DEBUG:  ALTER SESSION SET EVENTS='10054 trace name context forever, level 1';
 
alter session set events '28112 trace name errorstack forever';
alter session set tracefile_identifier=DEBUG;
 
set time on timing on verify off
prompt EXECUTING TASK ....
BEGIN
  dbms_sqlpa.execute_analysis_task(task_name      => :TASK_NAME ,
                                   execution_name => :EXECUTION_NAME ,
                                   execution_type => 'test execute');
END;
/
 
alter session set events '28112 trace name errorstack off';
 
REM DEBUG:  ALTER SESSION SET EVENTS '##### trace name errorstack level 3';
 
REM DEBUG:  ALTER SESSION SET EVENTS '10046 trace name context off';
 
REM DEBUG:  ALTER SESSION SET EVENTS '10053 trace name context off';
 
REM DEBUG:  ALTER SESSION SET events '10054 trace name context off';
 
set time off timing off echo off feedback off
 
SET lines 256 trimspool on
 
-- adding commit to see if it fixes reporting cursor problem
commit;
exec dbms_lock.sleep(10);
 
 
prompt Show Advisor OBJID
-- show not errors
col task_name format a30
col execution_name format a30
col OBJID new_value OBJID format 999999999
col sql_id format a13
select  a1.object_id OBJID, a1.ATTR1 sql_id
  from dba_advisor_objects a1
  where
  a1.execution_name= :EXECUTION_NAME and a1.ATTR1='&sql_id' ;
-- and b1.type ='ERROR';
 
VAR text_rep CLOB;
begin
 :text_rep := DBMS_SQLPA.REPORT_ANALYSIS_TASK(task_name => :TASK_NAME ,
                                         execution_name => :EXECUTION_NAME ,
                                         type=>'text', level=>'ALL' , section=>'ALL', object_id => &OBJID
                                         );
end;
/
 
SET LONG 100000 LONGCHUNKSIZE 100000 LINESIZE 256  pages 1000 trimspool on
PRINT :text_rep
 
 
-- show basic results
select '  task_name      => '''|| :TASK_NAME ||''',' ||chr(10) ||
       '  execution_name => '''|| :EXECUTION_NAME ||''','||chr(10) ||
       '  object_id      => '' '|| a1.object_id ||'''' mesg
  from dba_advisor_objects a1
  where
  a1.execution_name= :EXECUTION_NAME and a1.ATTR1='&sql_id' ;
 
 
select 'METRIC: ' metric, SQL_ID,PLAN_HASH_VALUE,ROWS_PROCESSED,PLAN_HASH_VALUE,
       PARSE_TIME/1000000 PARSE_SEC,ELAPSED_TIME/1000000 ELAPSE_SEC,CPU_TIME/1000000 CPU_SEC,BUFFER_GETS,
       TESTEXEC_TOTAL_EXECS, TESTEXEC_FIRST_EXEC_IGNORED
from   dba_advisor_sqlstats
where  EXECUTION_NAME= :EXECUTION_NAME;
 
prompt
prompt Show Errors
set feedback on
-- show errros (if any)
select a1.object_id, a1.ATTR1 sql_id , b1.message message
  from dba_advisor_objects a1,
       dba_advisor_findings b1
  where
  a1.task_name=b1.task_name and
  a1.execution_name=b1.execution_name and
  a1.object_id=b1.object_id and
  a1.execution_name= :EXECUTION_NAME and
  b1.type ='ERROR';
spool off
 
VAR html_rep CLOB;
begin
 :html_rep := DBMS_SQLPA.REPORT_ANALYSIS_TASK(task_name      => :TASK_NAME ,
                                         execution_name => :EXECUTION_NAME ,
                                         type=>'html', level=>'ALL' , section=>'ALL', object_id => &OBJID
                                         );
end;
/
SET verify off TERMOUT OFF PAGESIZE 0 HEADING OFF LINESIZE 1000 TRIMSPOOL ON TRIMOUT ON TAB OFF feedback off
spool DEBUG_&sqlsetname._&sql_id._&seqnum._&sql_file..html
PRINT :html_rep
spool off
exit




### Generating and running a SQL ID via SQLPlus

Generating and running a SQL ID via SQLPlus

File : gen_repro_lob.sql

Usage : (@gen_repro_lob.sql PRC fj7aqxmgrhc6f)

Output file generated : repro_PRC_fj7aqxmgrhc6f.sql


define sts_name=&1
define sql_id=&2
whenever sqlerror exit failure
 
set heading off
set lines 256 pages 1000 trimspool on
set long 1000000000 LONGCHUNKSIZE 100000
 
set serveroutput on
set verify off
 
col stmt format a100 word_wrapped
set feedback off
 
 
spool repro_&sts_name._&sql_id..sql
 
select '@ vpd_&sts_name.' from dual;
 
PROMPT column SID new_value SID
PROMPT column SERIAL new_value SERIAL
PROMPT column SQLPLUS_CLIENT_PID new_value SQLPLUS_CLIENT_PID
PROMPT column SERVER_PID new_value SERVER_PID
PROMPT column SERVER_TID new_value SERVER_TID
 
PROMPT select to_char(vs.SID) SID, to_char(vs.SERIAL#) SERIAL, vs.PROCESS SQLPLUS_CLIENT_PID, vp.SPID SERVER_PID , vp.STID SERVER_TID
PROMPT from   v$session vs, v$process vp
PROMPT where  vs.SID= SYS_CONTEXT('USERENV','SID') and vs.PADDR=vp.ADDR;;
 
set escape \
exec dbms_output.put_line('spool repro_'||'&sql_id._\&SID'||'..log');
set escape off
prompt REM setting up bind variables
prompt
 
VAR bstmt CLOB
VAR sbstmt CLOB
VAR estmt CLOB
VAR stmt CLOB
VAR PARSINGSCHEMANAME VARCHAR2(128)
alter session set nls_date_format = 'MM/DD/YYYY HH24:MI:SS';
alter session set nls_timestamp_format = 'MM/DD/YYYY HH24:MI:SS';
-- set verify off
-- set serveroutput on
declare
  currposition number := 1;
  newposition number := 1;
  bind_position      number := 0;
  sys_bind_position  number := 0;
  bind_count      number := 0;
  sys_bind_count  number := 0;
  replace_str varchar2(1000);
  sqlstmt clob;
  bind_var varchar2(30);
  sys_bind_var varchar2(30);
  cnt number:=0;
  cursor dsb is
  select position ,
  decode(anydata.gettypename(value),
         'SYS.NUMBER',  'NUMBER',
         'SYS.DATE',    'varchar2(100)',
         'SYS.TIMESTAMP',   'varchar2(100)',
         'SYS.VARCHAR2','varchar2(500)',
         'varchar2(100)') type ,
  decode(anydata.gettypename(value),
         'SYS.NUMBER',  'NUMBER',
         'SYS.DATE',    'DATE',
         'SYS.TIMESTAMP','TIMESTAMP',
         'SYS.VARCHAR2','VARCHAR2',
         anydata.gettypename(value)) real_type ,
  decode(anydata.gettypename(value),
         'SYS.NUMBER',to_char(anydata.accessnumber(value)),
         'SYS.DATE',to_char(anydata.accessdate(value)),
         'SYS.VARCHAR2',anydata.accessvarchar2(value),
         'SYS.TIMESTAMP',anydata.accesstimestamp(value),
         null) value
  from dba_sqlset_binds
  where sql_id='&sql_id'
   and  (SQLSET_NAME = '&sts_name.')
  order by 1;
begin
  select sql_text,sql_text||';',sql_text||';',sql_text,sql_text,PARSING_SCHEMA_NAME
  into sqlstmt,:bstmt,:sbstmt,:stmt,:estmt,:PARSINGSCHEMANAME
  from dba_sqlset_statements
  where  sql_id = '&sql_id'
   and  (SQLSET_NAME = '&sts_name.')
   and rownum = 1 ;
  dbms_output.put_line('REM PARSING_SCHEMA_NAME is '|| :PARSINGSCHEMANAME);
  dbms_output.put_line('show user');
 
  for dsbrec in dsb loop
    -- find the position of the bind
    bind_position     := regexp_instr( sqlstmt,'\W:(([a-z]|[A-Z]|[0-9])\w*)'  ,currposition,1,1,'',1 );
    bind_var          := regexp_substr(sqlstmt,'\W:(([a-z]|[A-Z]|[0-9])\w*)'  ,currposition,1,'',1);
    sys_bind_position := regexp_instr( sqlstmt,'\W:"(([a-z]|[A-Z]|[0-9])\w*)"',currposition,1,1,'',1 );
    sys_bind_var      := regexp_substr(sqlstmt,'\W:"(([a-z]|[A-Z]|[0-9])\w*)"',currposition,1,'',1);
 
    if dsbrec.real_type = 'NUMBER' then
       replace_str := dsbrec.value;
    else
       replace_str := ''''|| dsbrec.value || '''';
    end if;
 
    -- find out which one to bind
    if bind_position = 0 and sys_bind_position = 0 then
       dbms_output.put_line('ERROR: could not find bind at 1: '|| dsbrec.position);
    elsif (bind_position > sys_bind_position and sys_bind_position != 0) OR bind_position = 0 then
       -- use the sys_bind first
       sys_bind_count := sys_bind_count + 1;
       -- put back the literal
       :bstmt := regexp_replace(:bstmt ,'(\W):"(([a-z]|[A-Z]|[0-9])\w*)"','\1'||replace_str,1,1,'');
 
      dbms_output.put_line('var   '|| sys_bind_var || ' ' || dsbrec.type);
      dbms_output.put_line('    -- real type is '||dsbrec.real_type);
      if dsbrec.value is not null then
        dbms_output.put_line('exec :'|| sys_bind_var || ' := '|| replace_str ||';');
      else
        dbms_output.put_line('--    '|| sys_bind_var || ' no value ');
      end if;
 
       -- update currposition to the end of the match
       currposition := sys_bind_position;
    elsif (sys_bind_position > bind_position and bind_position != 0) OR sys_bind_position = 0  then
      bind_count := bind_count + 1;
      -- use the bind first
      if regexp_like(bind_var,'^[0-9]') then
        bind_var := 'B'|| bind_var;
        :bstmt := regexp_replace(:bstmt ,'(\W):(([a-z]|[A-Z]|[0-9])\w*)','\1'||':'||bind_var,1,bind_count,'');
        :sbstmt := regexp_replace(:sbstmt ,'(\W):(([a-z]|[A-Z]|[0-9])\w*)','\1'||':'||bind_var,1,bind_count,'');
      end if;
      dbms_output.put_line('var   '|| bind_var || ' ' || dsbrec.type);
      dbms_output.put_line('    -- real type is '||dsbrec.real_type);
      if dsbrec.value is not null then
        dbms_output.put_line('exec :'|| bind_var || ' := '|| replace_str ||';');
      else
        dbms_output.put_line('--    '|| bind_var || ' no value ');
      end if;
       -- update currposition to the end of the match
       currposition := bind_position;
    else
      dbms_output.put_line('ERROR: could not find bind at 2: '|| dsbrec.position);
      dbms_output.put_line('currposition: '|| currposition);
      dbms_output.put_line('bind_position: '|| bind_position);
      dbms_output.put_line('sys_bind_position: '|| sys_bind_position);
    end if;
        
  end loop;
   
  -- comment below , there's problem with eating newlines , proabably better to replace with single space
  -- :bstmt := replace(:bstmt,' '||chr(10),null);
  -- :bstmt := replace(:bstmt,chr(9)||chr(10),null);
 
  if ( bind_count = 0 and sys_bind_count = 0) then
   :bstmt  := :estmt || ';' ;
   :sbstmt := ' -- there are no binds -- ';
   :stmt   := ' -- there are no binds -- ';
  end if;
  dbms_output.put_line('-- there are '||bind_count||' bind variables');
  dbms_output.put_line('-- there are '||sys_bind_count||' sys bind variables');
  dbms_output.put_line('alter session set nls_date_format = ''MM/DD/YYYY HH24:MI:SS'';');
  dbms_output.put_line('alter session set nls_timestamp_format = ''MM/DD/YYYY HH24:MI:SS'';');
 
end;
/
 
 
PROMPT REM DEBUG:  ALTER SESSION SET TRACEFILE_IDENTIFIER = "&sql_id._ERRORSTACK";;
PROMPT REM DEBUG:  ALTER SESSION SET EVENTS '##### trace name errorstack level 3';;
prompt
PROMPT REM DEBUG:  ALTER SESSION SET TRACEFILE_IDENTIFIER = "&sql_id._SQLTRC";;
PROMPT REM DEBUG:  ALTER SESSION SET EVENTS '10046 trace name context forever, level 12';;
prompt
PROMPT REM DEBUG:  ALTER SESSION SET TRACEFILE_IDENTIFIER = "&sql_id._OPTTRC";;
PROMPT REM DEBUG:  ALTER SESSION SET EVENTS '10053 trace name context forever, level 1';;
PROMPT REM DEBUG:  for recursive sql 10054
PROMPT REM DEBUG:  ALTER SESSION SET EVENTS='10054 trace name context forever, level 1';;
prompt
PROMPT REM DEBGU:  to get better plan stat 
PROMPT REM DEBUG:  and force sql monitor, add /*+ GATHER_PLAN_STATISTICS MONITOR */
prompt
PROMPT set timing on echo on
 
prompt REM VERSION 1 : SYS_B_* binds are substitued and :1,:2 replaced with :B1,:B2
REM NOTE: you may need to use PRINT if the text is too long for to_char
REM NOTE: converting CLOB to CHAR let word_wrapped to work properly
col bstmt format a100 word_wrapped
PRINT bstmt
PROMPT rollback;;
 
prompt set timing off echo off
REM col stmt format a100 word_wrapped
REM select to_char(:bstmt) stmt from dual;
 
PROMPT REM DEBUG:  ALTER SESSION SET EVENTS '##### trace name errorstack level 3';;
prompt
PROMPT REM DEBUG:  ALTER SESSION SET EVENTS '10046 trace name context off';;
prompt
PROMPT REM DEBUG:  ALTER SESSION SET EVENTS '10053 trace name context off';;
prompt
PROMPT REM DEBUG:  ALTER SESSION SET events '10054 trace name context off';;
prompt
 
exec dbms_output.put_line('@ getplan');
 
PROMPT REM DEGUG:  select 'TRACE FILE LOCATION : ' || value from V$DIAG_INFO where name like '%Trace File%';;
 
exec dbms_output.put_line('spool off');
 
prompt
prompt exit
prompt
prompt REM expanded SQL TEXT below
prompt
 
prompt REM VERSION 2 : :1,:2 replaced with :B1,:B2
col sbstmt format a100 word_wrapped
PRINT sbstmt
REM select to_char(:sbstmt) stmt from dual;
 
prompt REM VERSION 3 : original statement from dba_sqlset_statements
col bstmt format a100 word_wrapped
PRINT stmt
REM select to_char(:stmt) stmt from dual;
 
VAR expanded_sql_text CLOB
begin
  DBMS_UTILITY.EXPAND_SQL_TEXT( :estmt , :expanded_sql_text );
exception
  when others then
  :expanded_sql_text := 'ORA-24251: This statement is not supported by EXPAND_SQL_TEXT.';
end;
/
prompt REM VERSION 4 : EXPANDED SQL TEXT
col expanded_sql_text format a100 word_wrapped
PRINT expanded_sql_text
REM select to_char(:expanded_sql_text) stmt from dual;
 
 
spool off
 
exit

### Exporting a SPA run from a source env

File : export_spa_run.sql

Usage: Under fusion user, @export_spa_run.sql 1919_C


-- Usage: sysfus @ export_spa_run.sql RU1210
  
define db_username='FUSION'
define db_pass='welcome1'
define db_pdb='R13CSMCF'
  
define notes='FA1919'
define export_directory='/acfsmounts/acfs1/FA13.2304GA_BATS_Captures/SPA'
define run_name=&1 -- 'RU1210'
  
SPOOL SPA_BKP_&run_name._&db_pdb..log
  
SELECT TO_CHAR(SYSDATE, 'dd-mm-yy hh24:mi:ss') from dual;
PROMPT 'Notes: &notes.'
  
PROMPT ===== Export starting... =====
  
  
define table_name=sqlstats;
PROMPT ===== dba_advisor_&table_name. =====
    DROP TABLE dba_advisor_&table_name._&run_name.;
    CREATE TABLE dba_advisor_&table_name._&run_name. AS
    (SELECT *
    FROM dba_advisor_&table_name.
    WHERE (execution_name LIKE '&run_name.:%'));
  
    PROMPT '&table_name. Diff: '
    SELECT execution_name
    FROM  dba_advisor_&table_name.
    WHERE (execution_name LIKE '&run_name.:%')
    MINUS (SELECT execution_name
        FROM dba_advisor_&table_name._&run_name.);
  
  
define table_name=sqlplans;
PROMPT ===== dba_advisor_&table_name. =====
  
    DROP TABLE dba_advisor_&table_name._&run_name.;
    --CREATE TABLE dba_advisor_&table_name._&run_name. AS
    --(SELECT *
    --FROM dba_advisor_&table_name.
    --WHERE (execution_name LIKE '&run_name.:%'));
  
    CREATE TABLE dba_advisor_&table_name._&run_name. (
        TASK_NAME               VARCHAR2(128),
        TASK_ID                 NUMBER(38),
        EXECUTION_NAME          VARCHAR2(128),
        SQL_ID                  VARCHAR2(13),
        OBJECT_ID               NUMBER(38),
        ATTRIBUTE               VARCHAR2(34),
        STATEMENT_ID            VARCHAR2(30),
        PLAN_HASH_VALUE         NUMBER,
        PLAN_ID                 NUMBER,
        TIMESTAMP               DATE,
        REMARKS                 VARCHAR2(4000),
        OPERATION               VARCHAR2(30),
        OPTIONS                 VARCHAR2(255),
        OBJECT_NODE             VARCHAR2(128),
        OBJECT_OWNER            VARCHAR2(128),
        OBJECT_NAME             VARCHAR2(128),
        OBJECT_ALIAS            VARCHAR2(261),
        OBJECT_INSTANCE         NUMBER(38),
        OBJECT_TYPE             VARCHAR2(30),
        OPTIMIZER               VARCHAR2(255),
        SEARCH_COLUMNS          NUMBER,
        ID                      NUMBER(38),
        PARENT_ID               NUMBER(38),
        DEPTH                   NUMBER(38),
        POSITION                NUMBER(38),
        COST                    NUMBER(38),
        CARDINALITY             NUMBER(38),
        BYTES                   NUMBER(38),
        OTHER_TAG               VARCHAR2(255),
        PARTITION_START         VARCHAR2(255),
        PARTITION_STOP          VARCHAR2(255),
        PARTITION_ID            NUMBER(38),
        OTHER                   CLOB,
        DISTRIBUTION            VARCHAR2(30),
        CPU_COST                NUMBER(38),
        IO_COST                 NUMBER(38),
        TEMP_SPACE              NUMBER(38),
        ACCESS_PREDICATES       VARCHAR2(4000),
        FILTER_PREDICATES       VARCHAR2(4000),
        PROJECTION              VARCHAR2(4000),
        TIME                    NUMBER(38),
        QBLOCK_NAME             VARCHAR2(128),
        OTHER_XML               CLOB
    );
  
    INSERT INTO dba_advisor_&table_name._&run_name. (
        TASK_NAME,
        TASK_ID,
        EXECUTION_NAME,
        SQL_ID,
        OBJECT_ID,
        ATTRIBUTE,
        STATEMENT_ID,
        PLAN_HASH_VALUE,
        PLAN_ID,
        TIMESTAMP,
        REMARKS,
        OPERATION,
        OPTIONS,
        OBJECT_NODE,
        OBJECT_OWNER,
        OBJECT_NAME,
        OBJECT_ALIAS,
        OBJECT_INSTANCE,
        OBJECT_TYPE,
        OPTIMIZER,
        SEARCH_COLUMNS,
        ID,
        PARENT_ID,
        DEPTH,
        POSITION,
        COST,
        CARDINALITY,
        BYTES,
        OTHER_TAG,
        PARTITION_START,
        PARTITION_STOP,
        PARTITION_ID,
        OTHER,
        DISTRIBUTION,
        CPU_COST,
        IO_COST,
        TEMP_SPACE,
        ACCESS_PREDICATES,
        FILTER_PREDICATES,
        PROJECTION,
        TIME,
        QBLOCK_NAME,
        OTHER_XML)
        SELECT
            TASK_NAME,
            TASK_ID,
            EXECUTION_NAME,
            SQL_ID,
            OBJECT_ID,
            ATTRIBUTE,
            STATEMENT_ID,
            PLAN_HASH_VALUE,
            PLAN_ID,
            TIMESTAMP,
            REMARKS,
            OPERATION,
            OPTIONS,
            OBJECT_NODE,
            OBJECT_OWNER,
            OBJECT_NAME,
            OBJECT_ALIAS,
            OBJECT_INSTANCE,
            OBJECT_TYPE,
            OPTIMIZER,
            SEARCH_COLUMNS,
            ID,
            PARENT_ID,
            DEPTH,
            POSITION,
            COST,
            CARDINALITY,
            BYTES,
            OTHER_TAG,
            PARTITION_START,
            PARTITION_STOP,
            PARTITION_ID,
            to_lob(OTHER),
            DISTRIBUTION,
            CPU_COST,
            IO_COST,
            TEMP_SPACE,
            ACCESS_PREDICATES,
            FILTER_PREDICATES,
            PROJECTION,
            TIME,
            QBLOCK_NAME,
            OTHER_XML
        FROM dba_advisor_&table_name.
        WHERE (execution_name LIKE '&run_name.:%');
  
  
    PROMPT '&table_name. Diff: '
    SELECT execution_name
    FROM  dba_advisor_&table_name.
    WHERE (execution_name LIKE '&run_name.:%')
    MINUS (SELECT execution_name
        FROM dba_advisor_&table_name._&run_name.);
  
define table_name=objects;
PROMPT ===== dba_advisor_&table_name. =====
    DROP TABLE dba_advisor_&table_name._&run_name.;
    CREATE TABLE dba_advisor_&table_name._&run_name. AS
    (SELECT *
    FROM dba_advisor_&table_name.
    WHERE (execution_name LIKE '&run_name.:%'));
  
    PROMPT '&table_name. Diff: '
    SELECT execution_name
    FROM  dba_advisor_&table_name.
    WHERE (execution_name LIKE '&run_name.:%')
    MINUS (SELECT execution_name
        FROM dba_advisor_&table_name._&run_name.);
  
define table_name=findings;
PROMPT ===== dba_advisor_&table_name. =====
    DROP TABLE dba_advisor_&table_name._&run_name.;
    CREATE TABLE dba_advisor_&table_name._&run_name. AS
    (SELECT *
    FROM dba_advisor_&table_name.
    WHERE (execution_name LIKE '&run_name.:%'));
  
    PROMPT '&table_name. Diff: '
    SELECT execution_name
    FROM  dba_advisor_&table_name.
    WHERE (execution_name LIKE '&run_name.:%')
    MINUS (SELECT execution_name
        FROM dba_advisor_&table_name._&run_name.);
  
  
PROMPT ===== Create Directory for export =====
CREATE OR REPLACE DIRECTORY SPA_BKP_WORK_DIR AS '&export_directory.';
  
HOST expdp &db_username./&db_pass.@&db_pdb. directory=SPA_BKP_WORK_DIR dumpfile=&run_name._&db_pdb..dmp tables='dba_advisor_sqlstats_&run_name.,dba_advisor_sqlplans_&run_name.,dba_advisor_objects_&run_name.,dba_advisor_findings_&run_name.' logfile=&run_name._&db_pdb..log reuse_dumpfiles=Y
  
PROMPT ===== Clear up all temporary tables created =====
  
  
define table_name=sqlstats;
    DROP TABLE dba_advisor_&table_name._&run_name.;
  
  
define table_name=sqlplans;
    DROP TABLE dba_advisor_&table_name._&run_name.;
  
define table_name=objects;
    DROP TABLE dba_advisor_&table_name._&run_name.;
  
define table_name=findings;
    DROP TABLE dba_advisor_&table_name._&run_name.;
  
  
PROMPT ===== Export finished =====

### Importing a SPA run into target env

Importing a SPA run into target env

impdp FUSION/Welcome12345@pdb3 directory=EXPDIR dumpfile=1919_C_R13CSMCF.dmp parallel=16 logfile=1919_C_R13CSMCF.log remap_tablespace=FUSION_TS_TX_DATA:DATA


Import: Release 23.0.0.0.0 - Development on Tue Aug 29 15:31:47 2023
Version 23.1.0.23.02
 
Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
 
Connected to: Oracle Database 23c Enterprise Edition Release 23.0.0.0.0 - Development
Master table "FUSION"."SYS_IMPORT_FULL_03" successfully loaded/unloaded
Starting "FUSION"."SYS_IMPORT_FULL_03":  FUSION/********@pdb3 directory=EXPDIR dumpfile=1919_C_R13CSMCF.dmp parallel=16 logfile=1919_C_R13CSMCF.log remap_tablespace=FUSION_TS_TX_DATA:DATA
Processing object type TABLE_EXPORT/TABLE/TABLE
Processing object type TABLE_EXPORT/TABLE/TABLE_DATA
. . imported "FUSION"."DBA_ADVISOR_OBJECTS_1919_C"       2.171 MB   15943 rows
. . imported "FUSION"."DBA_ADVISOR_SQLSTATS_1919_C"      2.019 MB   15843 rows
. . imported "FUSION"."DBA_ADVISOR_FINDINGS_1919_C"      1.007 MB    7368 rows
. . imported "FUSION"."DBA_ADVISOR_SQLPLANS_1919_C"      273.3 MB  177279 rows
Processing object type TABLE_EXPORT/TABLE/INDEX/STATISTICS/INDEX_STATISTICS
Processing object type TABLE_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
Job "FUSION"."SYS_IMPORT_FULL_03" successfully completed at Tue Aug 29 15:33:15 2023 elapsed 0 00:01:19

### Finding fix control which caused regression

$ cat get_fix_controls.sql
 
 
set head off
set feedback off
set pages 0 lines 10000 trimspool on
 
DROP TABLE fix_controls_current;
CREATE TABLE fix_controls_current AS SELECT BUGNO, VALUE, OPTIMIZER_FEATURE_ENABLE
        FROM V$SESSION_FIX_CONTROL
        WHERE SESSION_ID=SYS_CONTEXT('USERENV','SID');
          
-- ALTER SESSION SET optimizer_features_enable='12.1.0.1';
ALTER SESSION SET optimizer_features_enable='19.1.0';
  
PROMPT =========== Generate fix control table ===========
SPOOL fix_control_diff.sql;
  
  
SELECT 'alter session set "_fix_control"=''' || fix_controls_current.BUGNO || ':off'';'
    FROM (SELECT BUGNO, VALUE
        FROM V$SESSION_FIX_CONTROL
        WHERE SESSION_ID=SYS_CONTEXT('USERENV','SID')) base
    RIGHT OUTER JOIN fix_controls_current
    ON base.BUGNO = fix_controls_current.BUGNO
    WHERE base.VALUE<>fix_controls_current.VALUE
    ORDER BY fix_controls_current.BUGNO;
  
SPOOL OFF;
  
PROMPT =========== Show all fix control diff ===========
  
SELECT fix_controls_current.BUGNO BUG, base.VALUE BASE_VALUE, fix_controls_current.VALUE CURRENT_VALUE, fix_controls_current.OPTIMIZER_FEATURE_ENABLE OPTIMIZER_FEATURE_ENABLE
    FROM (SELECT BUGNO, VALUE
        FROM V$SESSION_FIX_CONTROL
        WHERE SESSION_ID=SYS_CONTEXT('USERENV','SID')) base
    RIGHT OUTER JOIN fix_controls_current
    ON base.BUGNO = fix_controls_current.BUGNO
    WHERE base.VALUE<>fix_controls_current.VALUE
    ORDER BY fix_controls_current.BUGNO;
      
      
PROMPT =========== Show all fix control diff != 0 ===========
  
SELECT fix_controls_current.BUGNO BUG, base.VALUE BASE_VALUE, fix_controls_current.VALUE CURRENT_VALUE, fix_controls_current.OPTIMIZER_FEATURE_ENABLE OPTIMIZER_FEATURE_ENABLE
    FROM (SELECT BUGNO, VALUE
        FROM V$SESSION_FIX_CONTROL
        WHERE SESSION_ID=SYS_CONTEXT('USERENV','SID')) base
    RIGHT OUTER JOIN fix_controls_current
    ON base.BUGNO = fix_controls_current.BUGNO
    WHERE base.VALUE<>fix_controls_current.VALUE
    AND fix_controls_current.VALUE<>1
    ORDER BY fix_controls_current.BUGNO;
      
exit


### ADR purge

#!/bin/ksh
 
# Purge ADR contents (adr_purge.sh)
# 00 05 * * 0 adr_purge.sh
# Add the above line with `crontab -e` to the oracle user's cron
 
ALERT_RET="2880"
INCIDENT_RET="2880"
TRACE_RET="2880"
CDUMP_RET="2880"
HM_RET="2880"
 
echo "INFO: adrci purge started at `date`"
adrci exec="show homes"|grep -v : | while read file_line
do
   echo "INFO: adrci purging diagnostic destination " $file_line
   echo "INFO: purging ALERT older than 2 days"
   adrci exec="set homepath $file_line;purge -age $ALERT_RET -type ALERT"
   echo "INFO: purging INCIDENT older than 2 days"
   adrci exec="set homepath $file_line;purge -age $INCIDENT_RET -type INCIDENT"
   echo "INFO: purging TRACE older than 2 days"
   adrci exec="set homepath $file_line;purge -age $TRACE_RET -type TRACE"
   echo "INFO: purging CDUMP older than 2 days"
   adrci exec="set homepath $file_line;purge -age $CDUMP_RET -type CDUMP"
   echo "INFO: purging HM older than 2 days"
   adrci exec="set homepath $file_line;purge -age $HM_RET -type HM"
   echo ""
   echo ""
done
echo
echo "INFO: adrci purge finished at `date`"


### How to change adrci purge policy?

[oracle@scas17adm01 gesmall_impdp_load]$ adrci
 
ADRCI: Release 18.0.0.0.0 - Production on Fri Feb 22 14:46:53 2019
 
Copyright (c) 1982, 2019, Oracle and/or its affiliates.  All rights reserved.
 
ADR base = "/u01/app/oracle"
adrci> select SHORTP_POLICY,LONGP_POLICY from ADR_CONTROL;
 
ADR Home = /u01/app/oracle/diag/rdbms/em01pod/em01pod1:
*************************************************************************
SHORTP_POLICY        LONGP_POLICY
-------------------- --------------------
24                   168
 
ADR Home = /u01/app/oracle/diag/clients/user_oracle/host_601869207_110:
*************************************************************************
SHORTP_POLICY        LONGP_POLICY
-------------------- --------------------
720                  8760
 
ADR Home = /u01/app/oracle/diag/clients/user_oracle/host_601869207_107:
*************************************************************************
SHORTP_POLICY        LONGP_POLICY
-------------------- --------------------
720                  8760
 
ADR Home = /u01/app/oracle/diag/asmcmd/user_oracle/scas17adm01.us.oracle.com:
*************************************************************************
0 rows fetched
 
 
After changes are done:
 
adrci> set homepath diag/rdbms/em01pod
adrci> set control (SHORTP_POLICY=120);
adrci> select SHORTP_POLICY,LONGP_POLICY from ADR_CONTROL;
 
ADR Home = /u01/app/oracle/diag/rdbms/em01pod/em01pod1:
*************************************************************************
SHORTP_POLICY        LONGP_POLICY
-------------------- --------------------
120                  168
1 row fetched


### Schema setup details

sh cruser.sh <pdb_admin_user> <pdb_admin_password> <connect_str> <user_to_create> <user_password> <log_dir
 
cruser.sh:
#!/bin/ksh
 
if (( $# != 6 )) ; then
    echo "e.g. $PROGNAME: $0: <pdb_admin_user> <pdb_admin_password> <connect_str> <user_to_create> <user_password> <log_dir>"
    echo "Incorrect number of arguments supplied"
    exit
fi
 
UNAME=$1
UPASS=$2
CONN_STR=$3
NEW_USER=$4
NEW_USER_PASS=$5
LOGDIR=$6
 
sqlplus ${UNAME}/${UPASS}@${CONN_STR} <<EOF
 
spool ${LOGDIR}/cruser_${NEW_USER}_${CONN_STR}.log append
set echo on
 
drop user ${NEW_USER} cascade;
CREATE USER ${NEW_USER} IDENTIFIED BY ${NEW_USER_PASS};
 
ALTER USER ${NEW_USER} DEFAULT TABLESPACE DATA QUOTA UNLIMITED ON DATA;
 
ALTER USER ${NEW_USER} QUOTA UNLIMITED ON DATA;
 
ALTER USER ${NEW_USER} TEMPORARY TABLESPACE TEMP;
 
GRANT CREATE SESSION TO ${NEW_USER};
 
GRANT CREATE TABLE to ${NEW_USER};
 
GRANT CREATE SEQUENCE to ${NEW_USER};
 
GRANT CREATE PROCEDURE to ${NEW_USER};
 
GRANT RESOURCE TO ${NEW_USER};
 
GRANT CREATE VIEW to ${NEW_USER};
 
GRANT ALTER SESSION TO ${NEW_USER};
 
GRANT EXECUTE ON dbms_lock TO ${NEW_USER};
 
GRANT CREATE VIEW to ${NEW_USER};
 
GRANT EXECUTE ON dbms_lock TO ${NEW_USER};
 
GRANT ANALYZE ANY DICTIONARY to ${NEW_USER};
 
GRANT ANALYZE ANY to ${NEW_USER};
 
GRANT CREATE JOB to ${NEW_USER};
 
GRANT MANAGE ANY QUEUE to ${NEW_USER};
 
GRANT ALTER SESSION TO ${NEW_USER};
 
grant select on SYS.V_\$PARAMETER to ${NEW_USER};
 
grant pdb_dba to ${NEW_USER};
 
BEGIN
  IF DBMS_DB_VERSION.VER_LE_10_2
  THEN
    null;
  ELSIF DBMS_DB_VERSION.VER_LE_11_2
  THEN
    null;
  ELSIF DBMS_DB_VERSION.VER_LE_12
  THEN
                -- The Following enables concurrent stats collection on Oracle Database 12c
                EXECUTE IMMEDIATE 'GRANT ALTER SYSTEM TO ${NEW_USER}';
                DBMS_RESOURCE_MANAGER_PRIVS.GRANT_SYSTEM_PRIVILEGE(
                        GRANTEE_NAME   => '${NEW_USER}',
                        PRIVILEGE_NAME => 'ADMINISTER_RESOURCE_MANAGER',
                        ADMIN_OPTION   => FALSE);
  END IF;
END;
/
 
spool off;
 
exit
 
EOF



Create credentials:

sh cr_cred.sh:
 
#!/bin/ksh
 
if (( $# != 3 )) ; then
    echo "e.g. $PROGNAME: $0: <user> <password> <connect_str>"
    echo "Incorrect number of arguments supplied"
    exit
fi
 
UNAME=$1
UPASS=$2
CONN_STR=$3
 
sqlplus ${UNAME}/${UPASS}@${CONN_STR} <<EOF
 
spool cr_credentials.log append
set echo on
set serveroutput on size unlimited
 
conn ${UNAME}/${UPASS}@${CONN_STR}
 
set define off
BEGIN
  DBMS_CREDENTIAL.create_credential(
    credential_name => 'BMC_CRED',
    username => '<first.last@oracle.com>',
    password => '<password>'
  );
END;
/
 
spool off;
 
exit
 
EOF
 
 
Example:
  $ sh cr_cred.sh <admin_user> <admin_pass> <conn_str>
  $ sh cr_cred.sh <schema_user> <schema_user_pass> <conn_str>

Setup default credential:

def_cred.sh:
 
#!/bin/ksh
 
if (( $# != 4 )) ; then
    echo "e.g. $PROGNAME: $0: <pdb_admin_user> <pdb_admin_password> <connect_str> <cred_name>"
    echo "Incorrect number of arguments supplied"
    exit
fi
 
UNAME=$1
UPASS=$2
CONN_STR=$3
CRED_NAME=$4
 
UPPER_UNAME=`echo $UNAME | tr '[:lower:]' '[:upper:]'`
 
sqlplus ${UNAME}/${UPASS}@${CONN_STR} <<EOF
 
spool cr_credentials.log append
set echo on
set serveroutput on size unlimited
 
alter database property set default_credential = '${UPPER_UNAME}.${CRED_NAME}';
 
select PROPERTY_VALUE from database_properties where PROPERTY_NAME='DEFAULT_CREDENTIAL';
 
spool off;
 
exit
 
EOF
 
Example:
  $ sh def_cred.sh <admin_user> <admin_pass> <conn_str> <cred_name>




### Check the Auto TASK running schedule
File : check_asts_runs.sh

if [[ -f stopfile ]]; then
   rm -rf stopfile
fi
 
while true; do
 
if [[ -f stopfile ]]; then
   break
fi
 
sqlplus / as sysdba<<EOF
 
alter session set container=mpdb1;
@check_asts_runs.sql
 
exit
EOF
 
sleep 120
done
File : check_asts_runs.sql

SET LINESIZE 300 VERIFY OFF
SET PAGES 300
COLUMN log_date FORMAT A35
COLUMN owner FORMAT A20
COLUMN job_name FORMAT A30
COLUMN error FORMAT A20
COLUMN req_start_date FORMAT A35
COLUMN actual_start_date FORMAT A35
COLUMN run_duration FORMAT A20
COLUMN credential_owner FORMAT A20
COLUMN credential_name FORMAT A20
COLUMN additional_info FORMAT A30
 
SELECT con_id,
       instance_id,
       log_date,
       owner,
       job_name,
       status
       error,
       req_start_date,
       actual_start_date,
       run_duration,
       credential_owner,
       credential_name,
       additional_info
FROM   cdb_scheduler_job_run_details
WHERE  job_name = DECODE(UPPER('ORA$_ATSK_AUTOSTS'), 'ALL', job_name, UPPER('ORA$_ATSK_AUTOSTS'))
ORDER BY log_date;
 
select count(*) from dba_sqlset_statements where sqlset_owner = 'SYS' and sqlset_name = 'SYS_AUTO_STS';

Check all the Auto Tasks details

select to_char(max(last_schedule_time),'DD-MON-YY hh24:mi') LATEST, task_name, status from dba_autotask_schedule_control group by task_name, status ;
 
LATEST                   TASK_NAME                                                        STATUS
------------------------ ---------------------------------------------------------------- ----------
23-FEB-21 14:13          Auto Statistics Management Task                                  SUCCEEDED
22-FEB-21 17:59          Auto SPM Task                                                    TERMINATED
23-FEB-21 14:13          Auto STS Capture Task                                            SUCCEEDED
02-FEB-21 21:53          Auto SPM Task                                                    SUCCEEDED
 
SELECT
Decode(SQLSet_Name,'SYS_AUTO_STS','ASTS','NON-ASTS'), count(*)
FROM DBA_SQLSet_Statements
GROUP BY Decode(SQLSet_Name,'SYS_AUTO_STS','ASTS','NON-ASTS');
 
DECODE(S   COUNT(*)
-------- ----------
ASTS           6703
NON-ASTS        529
 
With dur As
(
Select (To_Date('1','J')+Run_Duration-to_Date('1','J'))* 86400 Duration_Sec,
       (To_Date('1','J')+CPU_Used-to_Date('1','J'))* 86400 CPU_Used_Sec
From DBA_Scheduler_Job_Run_Details
Where job_name = 'ORA$_ATSK_AUTOSTS'
)
Select Min(Duration_Sec) ASTS_Min_Time_Sec,
       Max(Duration_Sec) ASTS_Max_Time_Sec,
       Avg(Duration_Sec) ASTS_Average_Time_Sec,
       Avg(CPU_Used_Sec) ASTS_Average_CPU_Sec
From dur;
 
ASTS_MIN_TIME_SEC ASTS_MAX_TIME_SEC ASTS_AVERAGE_TIME_SEC ASTS_AVERAGE_CPU_SEC
----------------- ----------------- --------------------- --------------------
                1                19            3.54777448           3.00474777