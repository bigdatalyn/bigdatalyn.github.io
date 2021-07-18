

检查oracle 表统计信息是否过期

--刷新数据库监控信息：
exec dbms_stats.flush_database_monitoring_info;

--过期状态查看：stale_stats 状态是否为“YES”
select owner,table_name,object_type,stale_stats,last_analyzed 
from dba_tab_statistics
where owner=''
and table_name='';

--过期原因
select table_owner,table_name,inserts,updates,deletes,timestamp 
from all_tab_modifications
where table_owner=''
and table_name='';


查询上次收集表的统计信息收集时间：

Catalog view DBA_OPTSTAT_OPERATIONS contain history of statistics operations performed at schema and database level using DBMS_STATS.

The views *_TAB_STATS_HISTORY views (ALL, DBA, or USER) contain a history of table statistics modifications.

==========
oracle默认保留31天的统计信息：
The database purges old statistics automatically at regular intervals based on the statistics history retention setting and the time of the recent analysis of the system. You can configure retention using the ALTER_STATS_HISTORY_RETENTION procedure of DBMS_STATS. The default value is 31 days, which means that you would be able to restore the optimizer statistics to any time in last 31 days.

select DBMS_STATS.GET_STATS_HISTORY_AVAILABILITY from dual;


一个表中被修改的行数超过stale_percent(缺省值10%)时就会认为这个表的统计数据过时了.oracle会监控所有表的DML活动并在SGA中进行记录.监控的信息会定时的刷新到磁盘且可以通过*_tab_modifications视图来查看.
也可以调用dbms_stats.flush_database_monitoring_info过程来手动刷新这些数据.如果想在查询时得到最新信息(在所有统计数据收集之前内部监控数据会被刷新).可以通过查询user_tab_statistics视图中的stale_stats列来查看哪个表的统计数据过时了.

表的stale_stats被设置为NO,统计数据是最新的.
表的stale_stats被设置为YES,统计数据是过时的.
表的stale_stats没有被设置说明丢失统计数据.



