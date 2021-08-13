


我们常规会去GV$SESSION查询blocking_session，再看这个blocking_session有没有又被其他会话阻塞，直到找到根源。

--blocking
set lines 180
col program for a30
col machine for a20
select inst_id,
       SID,
       SERIAL#,
	   event,
	   machine,
       sql_id,
       blocking_session,
       blocking_instance
  from gv$session
 where blocking_session is not null;

改进方法：立即找出最终阻塞会话

--cascade blocking
set lines 200 pages 100
col tree for a30
col event for a40
select *
  from (select a.sid, a.serial#,
               a.sql_id,
               a.event,
               a.status,
               connect_by_isleaf as isleaf,
               sys_connect_by_path(SID, '<-') tree,
               level as tree_level
          from v$session a
         start with a.blocking_session is not null
        connect by nocycle a.sid = prior a.blocking_session)
 where isleaf = 1
 order by tree_level asc;

--cascade blocking@gv$session
select *
  from (select a.inst_id, a.sid, a.serial#,
               a.sql_id,
               a.event,
               a.status,
               connect_by_isleaf as isleaf,
               sys_connect_by_path(a.SID||'@'||a.inst_id, ' <- ') tree,
               level as tree_level
          from gv$session a
         start with a.blocking_session is not null
        connect by (a.sid||'@'||a.inst_id) = prior (a.blocking_session||'@'||a.blocking_instance))
 where isleaf = 1
 order by tree_level asc;




-- terminal 1:

 HONG@pdb1> select * from v$mystat where rownum = 1;

       SID STATISTIC#      VALUE     CON_ID
---------- ---------- ---------- ----------
       101          0          0          3

HONG@pdb1> update a set object_name='a' where object_id=9999;

1 row updated.

HONG@pdb1> 

-- terminal 2:

HONG@pdb1> select * from v$mystat where rownum = 1;

       SID STATISTIC#      VALUE     CON_ID
---------- ---------- ---------- ----------
         8          0          0          3

HONG@pdb1> delete from a  where object_id=9998;

1 row deleted.

HONG@pdb1> update a set object_type='TABLE' where object_id=9999;

waiting.....


-- terminal 3:

SYS@cdb1> @scripts/colfmt
COL "INST_ID"                        FOR 9999999
COL "SID"                            FOR 999
COL "SERIAL#"                        FOR 9999999
COL "EVENT"                          FOR A29
COL "MACHINE"                        FOR A7
COL "SQL_ID"                         FOR A13
COL "BLOCKING_SESSION"               FOR 9999999999999999
COL "BLOCKING_INSTANCE"              FOR 99999999999999999
SYS@cdb1> set lines 180
col program for a30
SYS@cdb1> col machine for a20
SYS@cdb1> select inst_id,
  2         SID,
  3         SERIAL#,
  4     event,
  5     machine,
  6         sql_id,
  7         blocking_session,
  8         blocking_instance
  from gv$session
 10   where blocking_session is not null;

 INST_ID  SID  SERIAL# EVENT                         MACHINE              SQL_ID         BLOCKING_SESSION  BLOCKING_INSTANCE
-------- ---- -------- ----------------------------- -------------------- ------------- ----------------- ------------------
       1    8    49933 enq: TX - row lock contention ol8-19c              4w4wjvxhgukfk               101                  1

SYS@cdb1> 
SYS@cdb1> set lines 200 pages 100
SYS@cdb1> col tree for a30
col event for a40
SYS@cdb1> select *
  2    from (select a.sid, a.serial#,
  3                 a.sql_id,
               a.event,
  5                 a.status,
  6                 connect_by_isleaf as isleaf,
  7                 sys_connect_by_path(SID, '<-') tree,
  8                 level as tree_level
  9            from v$session a
 10           start with a.blocking_session is not null
        connect by nocycle a.sid = prior a.blocking_session)
 12   where isleaf = 1
 13   order by tree_level asc;

 SID  SERIAL# SQL_ID        EVENT                                    STATUS    ISLEAF TREE                            TREE_LEVEL
---- -------- ------------- ---------------------------------------- -------- ------- ------------------------------ -----------
 101    58549               SQL*Net message from client              INACTIVE       1 <-8<-101                                 2

SYS@cdb1> 
SYS@cdb1> select *
  from (select a.inst_id, a.sid, a.serial#,
  3                 a.sql_id,
               a.event,
  5                 a.status,
  6                 connect_by_isleaf as isleaf,
  7                 sys_connect_by_path(a.SID||'@'||a.inst_id, ' <- ') tree,
               level as tree_level
  9            from gv$session a
 10           start with a.blocking_session is not null
        connect by (a.sid||'@'||a.inst_id) = prior (a.blocking_session||'@'||a.blocking_instance))
 12   where isleaf = 1
 13   order by tree_level asc;

 INST_ID  SID  SERIAL# SQL_ID        EVENT                                    STATUS    ISLEAF TREE                            TREE_LEVEL
-------- ---- -------- ------------- ---------------------------------------- -------- ------- ------------------------------ -----------
       1  101    58549               SQL*Net message from client              INACTIVE       1  <- 8@1 <- 101@1                         2

SYS@cdb1> 
SYS@cdb1> alter system kill session '101,58549' immediate;

System altered.

SYS@cdb1> 