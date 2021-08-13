---
layout: post
title: "Oracle 19c scheduler task Tips"
category: Oracle
tags: Oracle 19c Tips
---

* content
{:toc}

Oracle 19c scheduler task Tips






### Some test sql 



```sql
-- check auto optimizer stats collection info
SYS@cdb1> select client_name,status from dba_autotask_client;

CLIENT_NAME                                                      STATUS
---------------------------------------------------------------- --------
sql tuning advisor                                               ENABLED
auto optimizer stats collection                                  ENABLED
auto space advisor                                               ENABLED

SYS@cdb1>

-- disable auto optimizer stats collection
SYS@cdb1>

BEGIN
  2    DBMS_AUTO_TASK_ADMIN.disable(
  3      client_name => 'auto optimizer stats collection',
  4      operation => NULL,
  5      window_name => NULL);
  6  END;
  7  /

PL/SQL procedure successfully completed.

SYS@cdb1> select client_name,status from dba_autotask_client;

CLIENT_NAME                                                      STATUS
---------------------------------------------------------------- --------
sql tuning advisor                                               ENABLED
auto optimizer stats collection                                  DISABLED
auto space advisor                                               ENABLED

SYS@cdb1> 

-- enable auto optimizer stats collection

SYS@cdb1> BEGIN
  2    DBMS_AUTO_TASK_ADMIN.enable(
  3      client_name => 'auto optimizer stats collection',
  4      operation => NULL,
  5      window_name => NULL);
  6  END;
  7  /

PL/SQL procedure successfully completed.

SYS@cdb1> select client_name,status from dba_autotask_client;

CLIENT_NAME                                                      STATUS
---------------------------------------------------------------- --------
sql tuning advisor                                               ENABLED
auto optimizer stats collection                                  ENABLED
auto space advisor                                               ENABLED

SYS@cdb1> 



-- windows time and auto task 19c 
SYS@cdb1> select owner, job_name, status, ACTUAL_START_DATE, RUN_DURATION from dba_scheduler_job_run_details where job_name like 'ORA$AT_OS_OPT_S%' order by 4;

OWNER JOB_NAME            STATUS    ACTUAL_START_DATE                RUN_DURATION
----- ------------------- --------- -------------------------------- -------------
SYS   ORA$AT_OS_OPT_SY_4  SUCCEEDED 09-JUL-21 10.00.02.665015 PM PRC +000 00:09:21
SYS   ORA$AT_OS_OPT_SY_24 SUCCEEDED 19-JUL-21 10.00.02.612382 PM PRC +000 00:05:39
SYS   ORA$AT_OS_OPT_SY_44 SUCCEEDED 30-JUL-21 10.00.02.611737 PM PRC +000 00:03:52
SYS   ORA$AT_OS_OPT_SY_64 SUCCEEDED 02-AUG-21 10.00.02.439158 PM PRC +000 00:03:47

SYS@cdb1> select window_name,repeat_interval,duration,enabled from dba_scheduler_windows;

WINDOW_NAME      REPEAT_INTERVAL                                                       DURATION      ENABLED
---------------- --------------------------------------------------------------------- ------------- -------
MONDAY_WINDOW    freq=daily;byday=MON;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
TUESDAY_WINDOW   freq=daily;byday=TUE;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
WEDNESDAY_WINDOW freq=daily;byday=WED;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
THURSDAY_WINDOW  freq=daily;byday=THU;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
FRIDAY_WINDOW    freq=daily;byday=FRI;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
SATURDAY_WINDOW  freq=daily;byday=SAT;byhour=6;byminute=0; bysecond=0                  +000 20:00:00 TRUE
SUNDAY_WINDOW    freq=daily;byday=SUN;byhour=6;byminute=0; bysecond=0                  +000 20:00:00 TRUE
WEEKNIGHT_WINDOW freq=daily;byday=MON,TUE,WED,THU,FRI;byhour=22;byminute=0; bysecond=0 +000 08:00:00 FALSE
WEEKEND_WINDOW   freq=daily;byday=SAT;byhour=0;byminute=0;bysecond=0                   +002 00:00:00 FALSE

9 rows selected.

SYS@cdb1> 

-- modify auto task schedule 

-- eg: modify start timestamp:

EXEC DBMS_SCHEDULER.SET_ATTRIBUTE('FRIDAY_WINDOW','repeat_interval','freq=daily;byday=MON;byhour=6;byminute=0;bysecond=0');


SYS@cdb1> EXEC DBMS_SCHEDULER.SET_ATTRIBUTE('FRIDAY_WINDOW','repeat_interval','freq=daily;byday=MON;byhour=6;byminute=0;bysecond=0');

PL/SQL procedure successfully completed.

SYS@cdb1> select window_name,repeat_interval,duration,enabled from dba_scheduler_windows;

WINDOW_NAME      REPEAT_INTERVAL                                                       DURATION      ENABLED
---------------- --------------------------------------------------------------------- ------------- -------
MONDAY_WINDOW    freq=daily;byday=MON;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
TUESDAY_WINDOW   freq=daily;byday=TUE;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
WEDNESDAY_WINDOW freq=daily;byday=WED;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
THURSDAY_WINDOW  freq=daily;byday=THU;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
FRIDAY_WINDOW    freq=daily;byday=MON;byhour=6;byminute=0;bysecond=0                   +000 04:00:00 TRUE
SATURDAY_WINDOW  freq=daily;byday=SAT;byhour=6;byminute=0; bysecond=0                  +000 20:00:00 TRUE
SUNDAY_WINDOW    freq=daily;byday=SUN;byhour=6;byminute=0; bysecond=0                  +000 20:00:00 TRUE
WEEKNIGHT_WINDOW freq=daily;byday=MON,TUE,WED,THU,FRI;byhour=22;byminute=0; bysecond=0 +000 08:00:00 FALSE
WEEKEND_WINDOW   freq=daily;byday=SAT;byhour=0;byminute=0;bysecond=0                   +002 00:00:00 FALSE

9 rows selected.

SYS@cdb1> 


before:
FRIDAY_WINDOW    freq=daily;byday=FRI;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
after:
FRIDAY_WINDOW    freq=daily;byday=MON;byhour=6;byminute=0;bysecond=0                   +000 04:00:00 TRUE

-- eg: modify duration:

exec dbms_scheduler.set_attribute('FRIDAY_WINDOW','duration',numtodsinterval(240,'minute'));


SYS@cdb1> select window_name,repeat_interval,duration,enabled from dba_scheduler_windows;

WINDOW_NAME      REPEAT_INTERVAL                                                       DURATION      ENABLED
---------------- --------------------------------------------------------------------- ------------- -------
MONDAY_WINDOW    freq=daily;byday=MON;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
TUESDAY_WINDOW   freq=daily;byday=TUE;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
WEDNESDAY_WINDOW freq=daily;byday=WED;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
THURSDAY_WINDOW  freq=daily;byday=THU;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
FRIDAY_WINDOW    freq=daily;byday=MON;byhour=6;byminute=0;bysecond=0                   +000 04:00:00 TRUE
SATURDAY_WINDOW  freq=daily;byday=SAT;byhour=6;byminute=0; bysecond=0                  +000 20:00:00 TRUE
SUNDAY_WINDOW    freq=daily;byday=SUN;byhour=6;byminute=0; bysecond=0                  +000 20:00:00 TRUE
WEEKNIGHT_WINDOW freq=daily;byday=MON,TUE,WED,THU,FRI;byhour=22;byminute=0; bysecond=0 +000 08:00:00 FALSE
WEEKEND_WINDOW   freq=daily;byday=SAT;byhour=0;byminute=0;bysecond=0                   +002 00:00:00 FALSE

9 rows selected.

SYS@cdb1> exec dbms_scheduler.set_attribute('FRIDAY_WINDOW','duration',numtodsinterval(300,'minute'));

PL/SQL procedure successfully completed.

SYS@cdb1> select window_name,repeat_interval,duration,enabled from dba_scheduler_windows;

WINDOW_NAME      REPEAT_INTERVAL                                                       DURATION      ENABLED
---------------- --------------------------------------------------------------------- ------------- -------
MONDAY_WINDOW    freq=daily;byday=MON;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
TUESDAY_WINDOW   freq=daily;byday=TUE;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
WEDNESDAY_WINDOW freq=daily;byday=WED;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
THURSDAY_WINDOW  freq=daily;byday=THU;byhour=22;byminute=0; bysecond=0                 +000 04:00:00 TRUE
FRIDAY_WINDOW    freq=daily;byday=MON;byhour=6;byminute=0;bysecond=0                   +000 05:00:00 TRUE
SATURDAY_WINDOW  freq=daily;byday=SAT;byhour=6;byminute=0; bysecond=0                  +000 20:00:00 TRUE
SUNDAY_WINDOW    freq=daily;byday=SUN;byhour=6;byminute=0; bysecond=0                  +000 20:00:00 TRUE
WEEKNIGHT_WINDOW freq=daily;byday=MON,TUE,WED,THU,FRI;byhour=22;byminute=0; bysecond=0 +000 08:00:00 FALSE
WEEKEND_WINDOW   freq=daily;byday=SAT;byhour=0;byminute=0;bysecond=0                   +002 00:00:00 FALSE

9 rows selected.

SYS@cdb1> 


before:
FRIDAY_WINDOW    freq=daily;byday=MON;byhour=6;byminute=0;bysecond=0                   +000 04:00:00 TRUE
after:
FRIDAY_WINDOW    freq=daily;byday=MON;byhour=6;byminute=0;bysecond=0                   +000 05:00:00 TRUE

```

Have a good work&life! 2021/08 via LinHong
