---
layout: post
title: "Oracle 23c Shrink Bigfile tablespace Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 23c Shrink Bigfile tablespace Tips

Oracle database 23ai onward we can use the DBMS_SPACE package to shrink a bigfile tablespace to reclaim unused space.






### Test

Commands tips:
```
$ sqlplus /nolog
SLQ>
connect / as sysdba
create bigfile tablespace TBS01 datafile '+DATA' size 2g ;
create user TRY identified by TRY12345 default tablespace TBS01 ;
alter  user TRY quota unlimited on TBS01 ;
grant CONNECT, RESOURCE to TRY ;

connect TRY/TRY12345
drop table tab001 purge;
create table TAB001 (COL1 number,
                    COL2 date, 
                    COL3 varchar2(100), 
                    COL4 varchar2(100),
                    COL5 varchar2(100)) ;

-- 1,000,000 rows created.
insert /*+append */ into TAB001 select LEVEL
                       , to_date('2024/06/01', 'YYYY/MM/DD') + mod(LEVEL, 12*5)
                       , rpad('hong',                            100, '*')
                       , rpad('hong'||to_char(mod(LEVEL, 1000)), 100, '*')
                       , rpad('hong'||to_char(mod(LEVEL,10000)), 100, '*')
    from DUAL connect by LEVEL <= 1000000 ;
commit ;

drop table TAB002 purge;
create table TAB002 (COL1 number,
                    COL2 date, 
                    COL3 varchar2(100), 
                    COL4 varchar2(100),
                    COL5 varchar2(100)) ;


insert /*+append */ into TAB002 select LEVEL
                       , to_date('2024/06/01', 'YYYY/MM/DD') + mod(LEVEL, 12*5)
                       , rpad('lin',                            100, '*')
                       , rpad('lin'||to_char(mod(LEVEL, 1000)), 100, '*')
                       , rpad('lin'||to_char(mod(LEVEL,10000)), 100, '*')
    from DUAL connect by LEVEL <= 1000000 ;
commit ;

exec dbms_stats.gather_table_stats(null, 'TAB001');
exec dbms_stats.gather_table_stats(null, 'TAB002');

-- Segmeng Size
set linesize 150 pages 5000
col SEGMENT_NAME for a20
col TABLESPACE_NAME for a20
select SEGMENT_NAME, SEGMENT_TYPE, BLOCKS, TABLESPACE_NAME, BYTES/1024/1024
  from USER_SEGMENTS order by 2 DESC, 1 ASC ;

SEGMENT_NAME	     SEGMENT_TYPE	    BLOCKS TABLESPACE_NAME	BYTES/1024/1024
-------------------- ------------------ ---------- -------------------- ---------------
TAB001		     TABLE		     46080 TBS01			    360
TAB002		     TABLE		     46080 TBS01			    360

truncate table TAB001;
exec dbms_stats.gather_table_stats(null, 'TAB001');


set serveroutput on
execute dbms_space.shrink_tablespace('TBS01', shrink_mode => dbms_space.ts_mode_analyze);


SQL> set serveroutput on
SQL> execute dbms_space.shrink_tablespace('TBS01', shrink_mode => dbms_space.ts_mode_analyze);
-------------------ANALYZE RESULT-------------------
Total Movable Objects: 0
Total Movable Size(GB): 0
Original Datafile Size(GB): 2
Suggested Target Size(GB): .77
Process Time: +00 00:00:00.012235

PL/SQL procedure successfully completed.

SQL> 


set serveroutput on
execute dbms_space.shrink_tablespace('TBS01');

SQL> execute dbms_space.shrink_tablespace('TBS01');
-------------------SHRINK RESULT-------------------
Total Moved Objects: 0
Total Moved Size(GB): 0
Original Datafile Size(GB): 2
New Datafile Size(GB): .77
Process Time: +00 00:00:00.984202

PL/SQL procedure successfully completed.

SQL> 


SEGMENT_NAME	     SEGMENT_TYPE	    BLOCKS TABLESPACE_NAME	BYTES/1024/1024
-------------------- ------------------ ---------- -------------------- ---------------
TAB001		     TABLE			 8 TBS01			  .0625
TAB002		     TABLE		     46080 TBS01			    360
```

### Tips

Here is some additional information about shrinking bigfile tablespaces.

- Objects are moved to compact the segments in the datafile, so all unused space is at the end of the datafile. This allows the datafile to be shrunk to reclaim the unused space.
- Online moves are subject to the normal restrictions. The analyze phase will indicate if there are unsupported objects.
- The shrink mode of TS_MODE_SHRINK_FORCE will do an offline move for objects that don't support online moves. Don't use this option if an offline move will cause a problem in your application.
- If the tablespace is not set to autoextend, there will be no room for segments to grow at the end of the operation. You will need to resize the tablespace manually to make room.
- A shrink can fail, but it may still reduce the size of the datafile if any moves completed successfully.
- We can shrink the SYSAUX tablespace.
- There is an overload of the SHRINK_TABLESPACE procedure that includes a SHRINK_RESULT out parameter, so the result of the operation can be returned as a CLOB, rather than being pushed out using DBMS_OUTPUT.


### Referece

[Oracle Setting up the Star Schema Benchmark (SSB) Tips](http://www.bigdatalyn.com/2018/09/28/Oracle_SSB_Tips/)

[Bigfile Tablespace Shrink in Oracle Database 23ai](https://oracle-base.com/articles/23/bigfile-tablespace-shrink-23)

[DBMS_SPACE](https://docs.oracle.com/en/database/oracle/oracle-database/23/arpls/DBMS_SPACE.html)

[Sample Code](https://blogs.oracle.com/otnjp/post/shibacho-042)

Have a good work&life! 2024/06 via LinHong


