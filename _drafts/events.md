
================================================================================================
spool run_trace.log -------------->>> upload

set echo on
alter session set tracefile_identifier='10046_<sql_id>';
alter session set timed_statistics = true;
alter session set statistics_level=all;
alter session set max_dump_file_size = unlimited;
alter session set events '10046 trace name context forever, level 8';
-- exec SQL statement <sql_id> which is not getting monitored

SELECT 'outcome' FROM dual;
alter session set events '10046 trace name context off';
SELECT name, value
FROM v$diag_info
WHERE name='Default Trace File'; ---> Upload this trace file.
exit;

spool off;

in the same session -

set trimspool on
set trim on
set pages 0
set linesize 1000
set long 1000000
set longchunksize 1000000
set echo on
spool sqlmon_active_run.html --------------------------->>>> upload
select dbms_sqltune.report_sql_monitor(sql_id=>'&sqlid',type=>'active', report_level=>'ALL') from dual;
spool off

================================================================================================

HONG@pdb1> 
spool event_10032_run_trace.log
HONG@pdb1> 
HONG@pdb1> set echo on
HONG@pdb1> alter session set tracefile_identifier='10032_aa4x3rfrugzxd';

Session altered.

HONG@pdb1> alter session set timed_statistics = true;

Session altered.

alter session set statistics_level=all;

Session altered.

HONG@pdb1> alter session set max_dump_file_size = unlimited;

Session altered.

HONG@pdb1> alter session set events '10032 trace name context forever, level 8';

Session altered.

HONG@pdb1> -- sql
HONG@pdb1> select * from emp order by ename;

SELECT 'outcome' FROM dual;
alter session set events '10032 trace name context off';

     EMPNO ENAME      JOB              MGR HIREDATE         SAL       COMM     DEPTNO
---------- ---------- --------- ---------- --------- ---------- ---------- ----------
      7876 ADAMS      CLERK           7788 23-MAY-87       1100                    20
      7499 ALLEN      SALESMAN        7698 20-FEB-81       1600        300         30
      7698 BLAKE      MANAGER         7839 01-MAY-81       2850                    30
      7902 FORD       ANALYST         7566 03-DEC-81       3000                    20
      7900 JAMES      CLERK           7698 03-DEC-81        950                    30
      7566 JONES      MANAGER         7839 02-APR-81       2975                    20
      7839 KING       PRESIDENT            17-NOV-81       5000                    10
      7654 MARTIN     SALESMAN        7698 28-SEP-81       1250       1400         30
      7934 MILLER     CLERK           7782 23-JAN-82       1300                    10
      7788 SCOTT      ANALYST         7566 19-APR-87       3000                    20
      7369 SMITH      CLERK           7902 17-DEC-80        800                    20
      7844 TURNER     SALESMAN        7698 08-SEP-81       1500          0         30
      7521 WARD       SALESMAN        7698 22-FEB-81       1250        500         30
         1 dog        code            7369 05-JUN-18       5000       5000         10

14 rows selected.

HONG@pdb1> HONG@pdb1> 
'OUTCOM
-------
outcome

HONG@pdb1> 
Session altered.

HONG@pdb1> SELECT name, value
  2  FROM v$diag_info
WHERE name='Default Trace File'; 
exit;


NAME
----------------------------------------------------------------
VALUE

Default Trace File
/u01/app/oracle/diag/rdbms/cdb1/cdb1/trace/cdb1_ora_52490_10032_aa4x3rfrugzxd.trc


HONG@pdb1> Disconnected from Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0
spool off;[oracle@ol8-19c scripts]$ 
[oracle@ol8-19c scripts]$ 
[oracle@ol8-19c scripts]$ 


================================================================================================







In the session where the script xxxx.sql will be run, do the following:

alter session set max_dump_file_size = unlimited;
alter session set tracefile_identifier='&name_for_the_output';
alter session set events '10046 trace name context forever, level 8';
Run the script xxxx.sql

Get the trace from user_dump_dest. The file will have 'name_for_the_output' provided in its name.






How to Set Multiple Events in INIT.ORA (Doc ID 1051056.6)

The syntax to specify multiple events in the init.ora is:

    event="event 1:event 2: event 3: event n"

you can also split the events on multiple lines by using the continuation
"\" backslash character at the end of each event and continue the next
event on the next line.

Such As:
 
    event="event 1:\
    event 2:\
    event 3: \
    event n"

For Example:

    event="\
    10210 trace name context forever, level 10:\
    10211 trace name context forever, level 10:\
    10231 trace name context forever, level 10:\
    10232 trace name context forever, level 10"



How To Set EVENTS In The SPFILE (Doc ID 160178.1)

1)  An example of the text based parameter file syntax is:

      event="10325 trace name context forever, level 10"
      event="10015 trace name context forever, level 1"


    Inserting other parameters between these lines will cause the last
    event only to be included.

2a) One method to set the event in the SPFILE is to use the SQL syntax:

SQL> ALTER SYSTEM SET
           EVENT='10325 trace name context forever, level 10',
           '10015 trace name context forever, level 1'
           COMMENT='Debug tracing of control and rollback' SCOPE=SPFILE;  

System altered.

SQL> alter system set event='10325 trace name context forever, level 10:10015 trace name context forever, level 1' scope=spfile;


2b) The instance must have been started with an SPFILE.  Otherwise this ALTER command will fail as follows:

SQL> ALTER SYSTEM SET
           EVENT='10325 trace name context forever, level 10',
           '10015 trace name context forever, level 1'
           COMMENT='Debug tracing of control and rollback' SCOPE=SPFILE;

 

      ALTER SYSTEM SET
      *
      ERROR at line 1:
      ORA-32001: write to SPFILE requested but no SPFILE specified at startup
2c) You cannot set the event during the instance life:

  SQL> ALTER SYSTEM SET
           EVENT='10325 trace name context forever, level 10',
           '10015 trace name context forever, level 1'
           COMMENT='Debug tracing of control and rollback' SCOPE=BOTH;
      EVENT='10325 trace name context forever,
      *
      ERROR at line 2:
      ORA-02095: specified initialization parameter cannot be modified
If you get an error like this, it is necessary to use SCOPE=SPFILE and restart the database.

2d) The command can be performed with the instance in NOMOUNT state.
    You can set events without having to open or mount the database.

 3) If you need to alter, add or remove an event, you have to enter the whole new list in the ALTER SYSTEM command and restart.

 4) To remove all events, use:
 5) 
SQL> ALTER SYSTEM RESET EVENT SCOPE=SPFILE SID='*' ;

System altered.


 5) To have events set up immediately, typically for dumping or tracing, use:

SQL> ALTER SESSION SET EVENTS 'immediate trace name controlf level 2' ;

System altered.

 6) To configure a system-wide "triggered" event, use something like

SQL> alter system set events '942 trace name ERRORSTACK level 3';

System altered.

 7) To turn off non-immediate system or session events interactively, you can use a syntax like the following:      

SQL> alter system set events '942 trace name ERRORSTACK off';     

System altered.     

SQL> alter system set events='10325 trace name context off';     

System altered.