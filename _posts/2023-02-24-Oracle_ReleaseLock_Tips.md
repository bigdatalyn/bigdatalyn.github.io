---
layout: post
title: "Oracle kill sql lock Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle kill sql lock Tips


```
--Oracle查询被锁对象数目 / Check lock objects
select count(1) from v$locked_object;
--查询被锁对象 / Check which objects
select b.owner,b.object_name,a.session_id,a.locked_mode from v$locked_object a,dba_objects b where b.object_id=a.object_id;
--查询被锁对象的连接 / Check connect infor for lock objects
alter session set nls_date_format = 'YYYY-MM-DD HH24:MI:SS';
select t2.username,t2.sid,t2.serial#,t2.logon_time from v$locked_object t1,v$session t2 where t1.session_id=t2.sid order by t2.logon_time;
--关闭被锁对象连接 / kill session which have lock.
alter system kill session '26,45052';

-- RAC环境下kill 对应的session
COL "SID"                            FOR 999
COL "SERIAL#"                        FOR 9999999
COL "INST_ID"                        FOR 9999999
COL "KILL_SESSION_CMD_TEXT"          FOR A41
COL "SQL_ID"                         FOR A13
COL "PROCESS"                        FOR A7
COL "USERNAME"                       FOR A8
COL "SQL_TEXT"                       FOR A100
select s1.sid,s1.serial#,s1.inst_id,'alter system kill session '''||s1.sid||','||s1.serial#||',@'||s1.inst_id||''';' as kill_session_cmd_text,s1.sql_id,s1.process,s1.username,s2.sql_text from gv$session s1, gv$sql s2 where s1.sql_id=s2.sql_id and s1.inst_id=s2.inst_id and s1.username='SYS';

 SID  SERIAL#  INST_ID KILL_SESSION_CMD_TEXT			 SQL_ID        PROCESS USERNAME SQL_TEXT
---- -------- -------- ----------------------------------------- ------------- ------- -------- ----------------------------------------------------------------------------------------------------
  74	21111	     1 alter system kill session '74,21111,@1';  g4pkmrqrgxg3b 1790    SYS	select count(*) from dba_objects
```








### Test Steps

Test Steps

```
--Oracle查询被锁对象数目 / Check lock objects
select count(1) from v$locked_object;
--查询被锁对象 / Check which objects
select b.owner,b.object_name,a.session_id,a.locked_mode from v$locked_object a,dba_objects b where b.object_id=a.object_id;
--查询被锁对象的连接 / Check connect infor for lock objects
alter session set nls_date_format = 'YYYY-MM-DD HH24:MI:SS';
select t2.username,t2.sid,t2.serial#,t2.logon_time from v$locked_object t1,v$session t2 where t1.session_id=t2.sid order by t2.logon_time;
--关闭被锁对象连接 / kill session which have lock.
alter system kill session '26,45052';
```

select for update in Terminal 1.

```
SSB@ssb> select * from customer where c_custkey=8210 for update;

 C_CUSTKEY C_NAME	      C_ADDRESS 	       C_CITY	  C_NATION	  C_REGION     C_PHONE	       C_MKTSEGMENT
---------- ------------------ ------------------------ ---------- --------------- ------------ --------------- ------------
      8210 Customer#000008210 eOhxE1		       RUSSIA	2 RUSSIA	  EUROPE       32-818-768-1996 MACHINERY

SSB@ssb> 
```

Confirm lock and kill sql in Terminal 2.

```
SYS@cdb1> select count(1) from v$locked_object;

 COUNT(1)
---------
	1

SYS@cdb1> 
SYS@cdb1> select b.owner,b.object_name,a.session_id,a.locked_mode from v$locked_object a,dba_objects b where b.object_id=a.object_id;

OWNER OBJECT_NAME  SESSION_ID  LOCKED_MODE
----- ----------- ----------- ------------
SSB   CUSTOMER		   26		 3

SYS@cdb1> alter session set nls_date_format = 'YYYY-MM-DD HH24:MI:SS';

Session altered.

SYS@cdb1> select t2.username,t2.sid,t2.serial#,t2.logon_time from v$locked_object t1,v$session t2 where t1.session_id=t2.sid order by t2.logon_time;

USERNAME  SID  SERIAL# LOGON_TIME
-------- ---- -------- -------------------
SSB	   26	 45052 2023-02-24 11:21:45

SYS@cdb1> alter system kill session '26,45052';

System altered.

SYS@cdb1> select count(1) from v$locked_object;

 COUNT(1)
---------
	0

SYS@cdb1> 
```

### Reference

Have a good work&life! 2023/02 via LinHong


