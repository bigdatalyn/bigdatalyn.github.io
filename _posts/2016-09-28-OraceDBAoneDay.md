---
layout: post
title: "[转]DBA的一天"
date:   2016-09-28 11:42:00
category: Oracle
tags: Oracle 
---

* content
{:toc}

Oracle DBA 常用命令汇总




来自于网络文章汇总

[Oracle Life -----DBA的一天](http://blog.itpub.net/28912313/viewspace-1702177/)

---


#### 一、活动状态检查 

通过查询基本视图，确认数据库和实例处于正常运行状态，可以对外提供数据服务。

	1，实例状态：
	SQL> SELECT instance_name,status FROM v$instance;    
	查询返回实例名称、状态，正常状态应为open。
	2，连接用户：
	SQL> SELECT inst_id,username,COUNT(*) FROM gv$session GROUP BY inst_id,username;    
	查询数据库以用户分组连接数。
	3，会话信息：
	SQL> SELECT sessions_current,sessions_highwater FROM v$license;    
	实例当前会话数和启动最高连接会话数量。
	4，参数检查：
	SQL> SELECT value FROM v$parameter WHERE name='open_cursors';    
	查询给定参数的设置值，示例参数缺省值为300，通常中等规模数据库推荐设置为1000。
	5，参数修改：
	SQL> ALTER SYSTEM SET undo_retention=3600 COMMENT='default 900' SID='*' SCOPE=both;   
	修改给定的初始化参数，RAC环境需要注意SID参数
	6，隐含参数：
	SQL> ALTER SYSTEM SET "_optimizer_use_feedback"=FALSE SCOPE=spfile;   
	应对特殊问题，有时需设置以下划线开头的隐含参数。示例关闭了11.2中引入的Cardinality Feedback -基数反馈特性。
	实例异常：（回复“实例异常”）
	当连接数据库实例出现缓慢、挂起等现象，需要进行诊断和分析，甚至可能需要重新启动数据库实例。
	<1>信息采集：
	SQL> sqlplus -prelim / as sysdba
	SQL> oradebug setmypid
	SQL> oradebug unlimit
	SQL> oradebug hanganalyze 3
	SQL> oradebug dump systemstate 266
	<<<<<间隔一定时间，如20秒，执行下一次数据库采样。>>>>>
	SQL> oradebug hanganalyze 3
	SQL> oradebug dump systemstate 266
	示范命令，通过采集系统的Hang信息、系统状态信息等，可以分析系统挂起的原因，间隔采样，可以用于对比变化，辅助分析
	<2>跟踪：
	SQL> alter session set events '10046 trace name context forever,level 12';
	SQL> shutdown immediate;
	SQL> startup mount;

	SQL> alter session set events '10046 trace name context forever,level 12';
	SQL> alter database open;
	如果在数据库关闭、启动时遇到阻塞、挂起等，可以通过示范命令进行跟踪，获取跟踪文件进行分析。
	<3>安全停库：
	SQL> alter system checkpoint;
	SQL> alter system archive log current;
	SQL> shutdown immediate;
	如果数据库出现异常需要重新启动，可以通过示范命令执行检查点、归档命令，然后尝试以立即方式关闭数据库。
	<4>强制停库：
	SQL> shutdown abort;
	SQL> startup nomount;
	SQL> alter database mount;
	SQL> alter database open;
	如果立即方式不能顺利关闭数据库，强制的关闭方式为abort。示范命令可以通过分步骤的方式执行数据库启动。
	连接异常：
	当连接数据库出现异常，需要检测包括网络连通性，监听器状态等信息。
	<1>连通性：
	# tnsping tns_name    
	通过tnsping工具测试配置的服务名称，观察网络是否连通以及响应时间。
	<2>监听器：
	# lsnrctl status LISTENER
	# lsnrctl status LISTENER_SCAN1
	# lsnrctl service
	在数据库服务器上，通过lsnrctl工具检查监听状态和服务信息。
	<3>监听日志检查：
	adrci> show alert
	在服务器上，可以通过adrci工具，显示各类告警文件，检查监听器日志，可以诊断监听问题。


#### 二、日志信息检查

检查数据库各类日志信息，确认数据库实例、集群等是否出现错误、告警，如存在问题，则需要进一步分析和应对。

	1，日志：
	告警日志：
	$ORACLE_BASE/diag/rdbms//$ORACLE_SID/trace/alert_$ORACLE_SID.log
	SQL> show parameter background_dump_dest;
	根据示例找到告警日志，检查实例是否存在ORA-错误提示等。
	集群日志：
	$GRID_HOME/log//alert.log
	$GRID_HOME/log//(crsd、cssd、evmd、ohasd)/
	在相应路径找到RAC集群日志，检查是否存在错误提示信息等。
	ASM日志：
	$GRID_HOME/diag/asm/+asm//trace/alert_.log
	在相应路径找到ASM日志，检查是否存在错误提示信息等。
	2，Trace文件检查：
	SQL> SELECT value FROM v$diag_info WHERE name='Default Trace File';
	SQL> show parameter user_dump_dest;
	获取会话或全局转储位置，诊断时需查相应文件内容。
	3，监听日志检查：（回复“监听”）
	<1>监听器：
	# lsnrctl status LISTENER
	# lsnrctl status LISTENER_SCAN1
	# lsnrctl service
	在数据库服务器上，通过lsnrctl工具检查监听状态和服务信息。
	<2>监听日志检查：
	adrci> show alert
	在服务器上，可以通过adrci工具，显示各类告警文件，检查监听器日志，可以诊断监听问题。
	4，集群状态：
	$crsctl status resource -t     -----确保资源状态显示在线
	errorstack分析（回复“errorstack”）
	当遇到ORA-错误，而数据库的输出信息不足时，可以采用errorstack进行跟踪，采集更详细的转储信息。
	SQL> alter system set events='600 trace name errorstack forever,level 10';
	SQL> alter system set events='600 trace name errorstack off';
	示例显示了对ORA-600错误设置跟踪，并关闭。


#### 三、重做日志维护     

Oracle REDO日志是数据库的核心组件，检查其状态，维护其成员，监控其归档，审核其性能，是DBA的重要工作。

	1，REDO组和成员：
	SQL> SELECT group#,sequence#,archived,status FROM v$log;
	查询日志组号、序号，是否归档完成和状态信息。
	如多组日志显示ACTIVE状态，则可能说明数据库存在IO方面的性能问题。
	SQL> SELECT group#,member FROM v$logfile;
	查看日志组和成员信息。
	2，REDO维护：
	SQL> ALTER DATABASE ADD LOGFILE GROUP 10 ('/oracle/dbs/log1c.rdo') size 500M;
	SQL> ALTER DATABASE ADD LOGFILE MEMBER '/oracle/dbs/log2c.rdo' TO GROUP 10;
	在日志切换频繁时，可能需要增加日志组或者加大日志大小。
	SQL> ALTER DATABASE DROP LOGFILE GROUP 10;
	SQL> ALTER DATABASE DROP LOGFILE MEMBER '/oracle/dbs/redo03.log';
	删除指定日志组或日志成员，注意只能对INACTIVE状态的日志执行删除操作。
	3，切换日志：
	SQL> alter system switch logfile;
	切换日志组，开始写入下一个日志组。
	4，归档维护：
	SQL> archive log list;    -----检查数据库是否处于归档模式。
	SQL> startup mount;
	SQL> alter database archivelog | noarchivelog;
	在MOUNT状态改变归档模式，启动归档模式之后，务必制订备份归档的日常策略，防止磁盘空间被耗尽。
	5，执行归档：
	SQL> alter system archive log current;
	对当前日志组执行归档，切换到下一个日志组，在RAC会对所有实例执行归档，Thread参数指定归档实例。
	6，调整归档路径：
	SQL> alter system set log_archive_dest_2='location=&path '  sid='&sid ';
	如果数据库因归档耗尽空间，可以指定另外的归档路径，以尽快归档日志，恢复数据库运行。


#### 四、空间信息检查   

确保数据存储空间可用，定期检查表空间余量，进行表空间和文件维护。

	1，空间使用：
	SQL> select * from sys.sm$ts_used;
	查看数据库表空间的使用信息。
	SQL> select * from sys.sm$ts_free;
	查看数据库表空间的剩余空间。
	2，文件信息：
	SQL> select tablespace_name,file_name from dba_data_files;
	查看数据库表空间的数据文件信息。
	3，文件维护：
	SQL> alter database datafile '&path' resize 900M;
	SQL> alter tablespace &tbs_name add datafile '&path' size 900M;
	对数据库的表空间进行扩容。


#### 五、锁闩信息检查  

Lock/Latch是数据库控制并发的核心手段，检查相关信息可以监控数据库的事务和运行状况。

	1，锁信息：
	SQL> select sid,type,lmode,ctime,block from v$lock where type not in ('MR','AE');
	查看锁会话ID,类型，持有时间等，注意如果block>1，可能意味着阻塞了其他会话。
	锁故障排查：
	在数据库出现锁竞争和阻塞时，需要排查和处理锁定，必要时通过KILL阻塞进程消除锁定。
	查询阻塞会话：
	SQL> select sid,sql_id,status,blocking_session from v$session where sid in (select session_id from v$locked_object);
	查询当前锁事务中阻塞会话与被阻塞会话的sid,sql_id核状态信息。
	阻塞SQL文本：
	SQL> select sql_id,sql_text from v$sqltext where sql_id='&sql_id' order by piece;
	通过sql_id查询得到SQL文本，例如通过sql_id查询出阻塞的SQL语句。
	锁阻塞对象信息：
	SQL> select owner,object_name,object_type from dba_objects where object_id in (select object_id from v$locked_object);
	通过sid查询阻塞对象的详细信息如对象名称，所属用户等。
	查询阻塞会话：
	SQL> alter system kill session 'sid,serial#';
	在oracle实例内杀死阻塞的会话进程，其中sid,serial#为中止会话对应信息，来自v$session。
	杀系统进程：
	SQL> select pro.spid,pro.program from v$session ses,v$process pro where ses.sid='&sid' and ses.paddr=pro.addr;
	# kill -9 spid
	有时对于活动进程，在系统层面中止更为快速安全，示例找到系统进程号，然后kill中止。
	注意：无论何时，需要认真分析，并且避免误杀重要后台进程。
	2，闩检查：
	SQL> select name,gets,misses,immediate_gets,spin_gets from v$latch order by 2;
	检查数据库闩的使用情况，misses、spin_gets统计高的，需要关注。
	3，闩使用检查：
	SQL> select addr,gets from v$latch_children where name='cache buffers chains';
	SQL> select hladdr,file#,dbablk from x$bh where hladdr in (select addr from v$latch_children where addr='&addr');
	仅供学习：通过获得latch的地址，找到该latch守护的X$BH中相关的Buffer。


#### 六、等待统计数据 

Wait和Statistics数据分别代表了数据库的等待和运行数据，观察这些数据以了解数据库的等待瓶颈和健康程度。

	1，等待时间查询：
	SQL> select sid,event,wait_time_micro from v$session_wait order by 3;
	通过等待事件和等待时间，了解数据库当前连接会话的等待情况。
	注意：如果会话众多，需要限定查询输出的行数。
	2，TOP10等待事件：
	SQL> select * from (select event,total_waits,average_wait,time_waited from v$system_event where wait_class<>'Idle' order by time_waited desc) where rownum<=10;
	查看当前数据中TOP10等待事件信息，需要分析和关注非空闲的显著等待。
	3，会话统计数据：
	SQL> select s.sid,s.statistic#,n.name,s.value from v$sesstat s,v$statname n where s.statistic#=n.statistic# and n.name='redo size' and sid='&sid';
	查询数据库会话的统计信息数据，示例查询了REDO的大小，SID需要提供。
	4，系统级统计数据：
	SQL> select * from v$sysstat where name='redo size';
	查询整个系统的统计数据，示例显示数据库实例启动以来的REDO日志生成量。


#### 七、对象检查

表、索引、分区、约束等是数据库的核心存储对象，其核心信息和对象维护是DBA重要的日常工作。

	1，表：
	表信息数据：
	SQL> SELECT * FROM (SELECT owner,table_name,num_rows FROM dba_tables ORDER BY num_rows desc nulls last) WHERE rownum<11;
	查看表的基本信息数据：属主，表名，记录行数等。
	表统计信息：
	SQL> SELECT owner,table_name,last_analyzed FROM dba_tab_statistics WHERE owner='&owner' and table_name='&table_name';
	查询给定用户，表名称（需大写），查询最后的统计信息分析收集时间。
	索引统计信息：
	SQL> SELECT owner,index_name,last_analyzed FROM dba_ind_statistics WHERE owner='&owner' and table_name='&table_name';
	查询给定用户名，表名称（需大写），查询索引信息，尤其关注最后分析时间。
	统计信息影响执行计划，当SQL执行异常时，需要重点分析统计信息。
	2，索引信息数据：
	SQL> SELECT * FROM (SELECT index_name,table_name,num_rows,leaf_blocks,clustering_factor FROM dba_indexes ORDER BY 5 desc nulls last) WHERE rownum<11;
	索引的基本信息，输出包括叶块数和聚簇因子等，如聚簇因子接近行数可能代表索引效率不高。
	3，分区对象检查：
	SQL> SELECT table_name,partitioning_type,partition_count,status FROM dba_part_tables;
	SQL> SELECT table_name,partition_name,high_value FROM dba_tab_partitions WHERE rownum<11;
	查看分区表的基本信息：分区类型，数量，边界值等。
	4，结构信息：
	SQL> set long 12000
	SQL> SELECT dbms_metadata.get_ddl('&obj_type','&table_name','&user') FROM dual;
	根据提供的对象类型（TABLE,INDEX）和用户（需大写），获取结构信息。
	5，分区定义查询：
	SQL> set long 12000
	SQL> SELECT dbms_metadata.get_ddl('TABLE','&part_table_name','&user') FROM dual;
	查询给定的分区表名，用户（需大写），查询分区表的结构信息（建表语句）。
	6，统计信息收集：
	SQL> exec dbms_stats.gather_table_stats(ownname=>'&owner',tablename=>'&table_name');
	SQL> exec dbms_stats.gather_index_stats(ownname=>'&owner',indexname=>'&index_name');
	收集统计信息是一项复杂任务，需谨慎，示例对给出用户、索引名的对象采集统计信息。
	7，分区统计信息相关：
	SQL> SELECT owner,table_name,partition_name,last_analyzed FROM dba_tab_statistics WHERE owner='&owner' and table_name='&table_name';
	SQL> exec dbms_stats.gather_table_stats(ownname=>'&owner',tablename=>'&table_name');
	查看分区表的统计信息收集时间，以及对分区表进行手工收集统计信息，注意分区表统计信息收集非常复杂，需要深入研究做出正确策略，示例仅提供最简单的采集命令。
	8，约束信息：
	SQL> SELECT constraint_name,constraint_type FROM dba_constraints WHERE table_name='&table_name';
	查询指定数据表的约束信息，包括名称和类型。
	9，失效对象检查：
	SQL> SELECT owner,object_name,object_type,status FROM dba_objects WHERE status<>'VALID' ORDER BY owner,object_name;
	检查数据库中的失效对象信息，通常运行健康的数据库中不应有失效的对象。
	10，闪回查询：（回复“闪回”）
	闪回查询功能对于恢复DML及部分DDL误操作非常便利，DBA必备技能。
	时间闪回：
	SQL> SELECT * FROM &table_name as of timestamp to_timestamp('2015-02-04 00:02:09','yyyy-mm-dd hh24:mi:ss');
	闪回表数据，基于时间点的表数据闪回查询。
	SCN闪回：
	SQL> SELECT * FROM &table_name as of scn&scn;
	闪回表数据，基于SCN的表数据查询，需要提供SCN，如果不明确SCN，可以通过时间点闪回查询。
	闪回DROP：
	SQL> flashback table &old_table to before drop rename to &new_table;
	闪回删除操作，对已经删除的表进行闪回恢复并重命名。


#### 八、AWR报告检查

通过AWR报告了解日常高峰时段数据库各项指标和运行状况，通过对比报告观察和基线的变化，通过趋势分析持续关注数据库日常状态

	1，本地AWR：
	SQL> @?/rdbms/admin/awrrpt
	生成本地AWR报告信息，需要根据提示输入相应的信息。
	2，指定实例AWR：
	SQL> @?/rdbms/admin/awrrpti
	生成指定实例AWR报告。
	3，AWR对比报告：cc@21vianet.com
	SQL> @?/rdbms/admin/awrddrpt
	生成本地AWR时间段对比报告
	4，指定实例对比：
	SQL> @?/rdbms/admin/awrddrpi
	生成指定实例AWR时间段对比报告
	5，AWR信息提取：
	SQL> @?/rdbms/admin/awrextr
	使用awrextr脚本将AWR性能数据导出，可以用以留错或者异地分析
	6，AWR信息加载：
	SQL> @?/rdbms/admin/awrload
	通过awrload，可以将导出的AWR性能数据导入到其他数据库中，便于集中和分析。

#### 九、SQL报告检查      

对Top SQL进行持续关注和分析，通过SQL报告分析SQL的效率、性能，并做出报告和优化建议。

	1，Z3：（回复“Z3”）
	2，Explain SQL执行计划：（回复“SQL 执行”）
	SQL> explain plan for SELECT count(*) FROM user_objects;
	SQL> SELECT * FROM table(dbms_xplan.display);
	示例通过explain plan for 方法获取SQL执行计划。
	3，Autotrace SQL执行计划：
	SQL> set autotrace traceonly explain;
	SQL> SELECT count(*) FROM user_objects;
	SQL> set autotrace off;
	通过SQL*Plus的autotrace功能获取SQL执行计划。
	4，DBMS_XPLAN SQL执行计划：
	SQL> SELECT * FROM table(dbms_xplan.display_cursor('&sql_id',null,'advanced'));
	通过DBMS_XPLAN包获取SQL执行计划，sql_id需要提供。
	5，10053事件跟踪：（回复“10053”）
	SQL> alter session set tracefile_identifier='10053';
	SQL> alter session set events '10053 trace name context forever,level 1';
	SQL> 
	SQL> alter session set events '10053 trace name context off';
	通过10053事件来查看执行计划和详细的SQL解析过程，trace文件提供了Oracle如何选择执行计划的原因。
	6，绑定变量：
	SQL> SELECT dbms_sqltune.extract_bind(bind_data,1).value_string FROM wrh$_sqlstat WHERE sql_id='&sql_id';
	SQL> SELECT snap_id,name,position,value_string FROM dba_hist_sqlbind WHERE sql_id='&sql_id';
	查询SQL语句的绑定变量以及历史绑定变量值信息，需要给定sql_id信息。
	7，SQL报告：
	SQL> @?/rdbms/admin/awrsqrpt
	SQL> @?/rdbms/admin/awrsqrpi
	8，指定SQL的监控报告：
	SQL> SELECT dbms_sqltune.report_sql_monitor(sql_id=>'&sql_id',report_level=>'ALL',TYPE=>'&type') as report FROM dual;
	生成指定sql_id的SQL Monitor Report
	9，当前会话的监控报告：
	SQL> SELECT dbms_sqltune.report_sql_monitor(session_id=>'&sid',report_level=>'ALL',TYPE=>'&type') as report FROM DUAL;
	生成当前会话的SQL Monitor Report


#### 十、定时任务检查     

检查数据库定时任务执行情况，确保后台任务正确执行，尤其应关注统计信息收集等核心任务。

	1，用户定时任务：
	SQL> SELECT job,log_user,last_date,next_date,interval,broken,failures FROM dba_jobs;
	查询用户的定时任务（job）信息，确保任务在期望的时间成功执行，这是DBA的重要工作之一。
	2，系统定时任务：
	SQL> SELECT job_name,start_date,repeat_interval FROM dba_scheduler_jobs;
	查询系统定时调度信息，查询显示了任务名称、初始启动日期以及重复间隔。
	3，系统定时任务--11g+：
	SQL> SELECT client_name,mean_job_duration FROM dba_autotask_client;
	11g之后增加的字典表，记录每个在7天和30天维护任务的统计信息，查询显示名称和平均执行时间。
	4，启停统计信息任务--10g：
	SQL> exec dbms_scheduler.disable('SYS.GATHER_STATS_JOB');
	SQL> exec dbms_scheduler.enable('SYS.GATHER_STATS_JOB');
	关闭和开启Oracle10g统计信息自动采集任务。
	5，启动统计信息任务--11g：
	SQL> exec DBMS_AUTO_TASK_ADMIN.DISABLE(client_name=>'auto optimizer stats collection',operation=>NULL,window_name=>NULL);
	SQL> exec DBMS_AUTO_TASK_ADMIN.ENABLE(client_name=>'auto optimizer stats collection',operation=>NULL,window_name=>NULL);
	关闭和开启Oracle11g统计信息自动采集任务。

#### 十一、备份 

数据备份重于一切，日常应检查备份执行情况，并检查备份的有效性，确保备份能够保障数据安全，备份安全加密也应兼顾。

	1，Oracle ODU：（回复“ODU”）
	云和恩墨专业的数据恢复产品，在各种危急故障下挽救损坏的文件和数据。
	2，全库exp/imp：
	$ exp system/manager file=/full.dmp log=/full.log full=y
	$ imp system/manager file=/full.dmp log=/full.log full=y
	将数据库全库导出导入（示例以及以下示例显示的是非windows环境），通过提供的用户，执行全库导出。需要注意存储位置和空间。
	3，用户模式exp/imp：
	$ exp enmo/enmo file=/enmo.dmp log=/enmo.log owner=enmo
	$ imp enmo/enmo file=/enmo.dmp log=/enmo.log fromuser=enmo touser=enmo
	将数据按指定用户导出。
	4，表模式exp/imp：
	$ exp enmo/enmo file=/tables.dmp log=/tables.log tables=table_name
	$ imp enmo/enmo file=/tables.dmp log=/tables.log tables=table_name
	将数据库按指定表导出。
	5，全库模式expdp/impdp：
	$ expdp system/manager directory=svr_dir dumpfile=full.dmp full=y;
	$ impdp system/manager directory=svr_dir dumpfile=full.dmp full=y;
	将数据库全库导出导入，注意directory是数据库中创建的对象，指定服务器上的存储位置。
	6，用户模式-expdp/impdp：
	$ expdp system/manager directory =svr_dir schemas=scott dumpfile=expdp.dmp;
	$ impdp system/manager directory=svr_dir schemas=scott dumpfile=expdp.dmp remap_schema=scott:enmo remap_tablespace=users:testtbs;
	将数据库进行按用户导出和导入示例，impdp示例中，分别重新映射了导入的Schema和表空间。
	7，表模式-expdp/impdp：
	$ expdp scott/tiger directory=svr_dir tables=emp.dept dumpfile=tables.dmp;
	$ impdp scott/tiger directory=svr_dir dumpfile=tables.dmp tables=emp,dept;
	将数据库进行按表导出和导入。
	8，物理备份检查：
	SQL> SELECT backup_type,start_time,completion_time,block_size FROM v$backp_set;
	检查备份集信息，确保备份有效和及时是DBA的重要工作之一，RMAN的备份信息记录在控制文件中。
	9，自动控制文件备份：
	RMAN> show all;
	RMAN> CONFIGURE CONTROLFILE AUTOBACKUP ON;
	控制文件对数据库十分重要，建议启动控制文件的自动备份，示范显示的是通过RMAN的设置。
	10，手动控制文件备份：
	RMAN> backup current controlfile;
	SQL> alter database backup controlfile to '/tmp/control.bak';
	通过RMAN或者SQL命令手动备份控制文件，备份的是控制文件的二进制拷贝。
	11，转储控制文件：
	SQL> alter session set events 'immediate trace name controlf level 8';
	通过以上命令转储控制文件二进制信息到文本，研究这些信息，可以极大加深对于数据库的了解。
	12，RMAN备份数据库：
	RMAN> backup format '/data/backup/%U' database plus archivelog;
	对于DBA备份是第一重要的工作，在归档模式下，执行全库备份可以简化为示例的下一个命令（需要根据容量进行分片）。


#### 十二、基本信息检查 

基本信息包括版本、组件、补丁集等信息，定期检查数据库信息并登记在案是数据库生命周期管理的重要内容之一。

	1，版本组件：
	SQL> SELECT * FROM v$version;
	查看数据库的版本信息。
	SQL> SELECT * FROM v$option;
	查看数据库的组件信息。
	2，容量检查：
	# asmcmd
	ASMCMD> lsdg
	SQL> SELECT group_number,disk_number,mount_status,total_mb,free_mb FROM v$asm_disk;
	SQL> SELECT group_number,name,state,total_mb,free_mb FROM v$asm_diskgroup;
	如果使用了ASM管理，可以通过示例查看ASM磁盘及磁盘组容量等信息。
	3，PSU检查：
	SQL> SELECT * FROM dba_registry_history;
	查询数据库的版本升级历史信息。
	# $ORACLE_HOME/OPatch/opatchlsinventory
	查询数据库补丁历史信息，是系统级的命令工具。




