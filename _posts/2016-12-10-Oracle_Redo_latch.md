---
layout: post
title: "[原创]Oracle Redo Latch相关测试"
date:   2016-12-09 11:30:00
category: Oracle
tags: Oracle 
---

* content
{:toc}


Oracle Redo latch相关测试





### 测试持有redo copy和allocation latch后的场景：

----session 1

	SYS@PROD1> col name format a30
	SYS@PROD1> select addr,latch#,name,level# from v$latch where name like '%redo%';

	ADDR         LATCH# NAME                               LEVEL#
	-------- ---------- ------------------------------ ----------
	2000DF34        146 redo on-disk SCN                        8
	2000DF98        147 ping redo on-disk SCN                   8
	2001252C        185 redo writing                            1
	20012594        186 redo copy                               4
	200125FC        187 redo allocation                         5
	20012664        188 real redo SCN                           8
	20012CD0        189 readredo stats and histogram            8
	200149F0        209 readable standby metadata redo          0
		             cache

	200264C0        515 KFR redo allocation latch               6

	9 rows selected.

	SYS@PROD1> select to_number('20012594','XXXXXXXXXX') from dual;

	TO_NUMBER('20012594','XXXXXXXXXX')
	----------------------------------
		                 536946068

	SYS@PROD1> 
	SYS@PROD1> 
	SYS@PROD1> 
	SYS@PROD1> oradebug setmypid
	Statement processed.
	SYS@PROD1> oradebug call kslgetl 536946068 1
	Function returned 1
	SYS@PROD1> oradebug call kslgetl 536946172 1
	Function returned 1
	SYS@PROD1> 

----session 2

	SYS@PROD1> delete from test01 where rownum < 10;

	9 rows deleted.

	SYS@PROD1> commit;

	Commit complete.

	SYS@PROD1> select to_number('200125FC','XXXXXXXXXX') from dual;

	TO_NUMBER('200125FC','XXXXXXXXXX')
	----------------------------------
		                 536946172

	SYS@PROD1> delete from test01 where rownum < 10;

	9 rows deleted.

	SYS@PROD1> commit;

	Commit complete.

	SYS@PROD1> 

	SYS@PROD1> select count(*) from v$latch;            ---------------------> hang住
	 
	select count(*) from v$latch
	*
	ERROR at line 1:
	ORA-12152: TNS:unable to send break message

	SYS@PROD1>



alert报警日志：

	Tue Dec 13 15:21:48 2016
	Exception [type: SIGSEGV, Address not mapped to object] [ADDR:0xC7] [PC:0xDFDCCB7, kcrfw_copy_latch_cleanup()+235] [flags: 0x0, count: 1]
	Errors in file /u01/app/oracle/diag/rdbms/prod1/PROD1/trace/PROD1_ora_14934.trc  (incident=26591):
	ORA-07445: exception encountered: core dump [kcrfw_copy_latch_cleanup()+235] [SIGSEGV] [ADDR:0xC7] [PC:0xDFDCCB7] [Address not mapped to object] []
	ORA-07443: function kslfree not found
	Incident details in: /u01/app/oracle/diag/rdbms/prod1/PROD1/incident/incdir_26591/PROD1_ora_14934_i26591.trc
	Use ADRCI or Support Workbench to package the incident.
	See Note 411.1 at My Oracle Support for error and packaging details.
	Tue Dec 13 15:21:51 2016
	Dumping diagnostic data in directory=[cdmp_20161213152151], requested by (instance=1, osid=14934), summary=[incident=26591].
	Tue Dec 13 15:21:52 2016

#### 1）oracle里面是不允许同时去持有父latch和子latch的，如果你时去持有子latch，我们会发现实例会down掉。

#### 2）redo allocation latch 这个latch的获取是在server process将redo entry copy到redo buffer（shared private strands）中之前，需要获得该latch，以便于分配空间，用于存放redo entry.

redo allocation latch 相当多

	SYS@PROD1>  select addr,name,latch#,level#,child#,hash from v$latch_children where latch# in (select latch# from v$latch where name like '%redo%'); 

	ADDR     NAME                     LATCH#     LEVEL#     CHILD#       HASH
	-------- -------------------- ---------- ---------- ---------- ----------
	36D1EF44 redo copy                   186          4          4 4092072627
	36D1EEC0 redo copy                   186          4          3 4092072627
	36D1EE3C redo copy                   186          4          2 4092072627
	36D1EDB8 redo copy                   186          4          1 4092072627
	36D218D0 redo allocation             187          5         29  999804931
	36D2186C redo allocation             187          5         28  999804931
	36D21808 redo allocation             187          5         27  999804931
	36D217A4 redo allocation             187          5         26  999804931
	36D21740 redo allocation             187          5         25  999804931
	36D216DC redo allocation             187          5         24  999804931
	36D21678 redo allocation             187          5         23  999804931
	36D21614 redo allocation             187          5         22  999804931
	36D215B0 redo allocation             187          5         21  999804931
	36D2154C redo allocation             187          5         20  999804931
	36D214E8 redo allocation             187          5         19  999804931
	36D21484 redo allocation             187          5         18  999804931
	36D21420 redo allocation             187          5         17  999804931
	36D213BC redo allocation             187          5         16  999804931
	36D21358 redo allocation             187          5         15  999804931
	36D212F4 redo allocation             187          5         14  999804931
	36D21290 redo allocation             187          5         13  999804931
	36D2122C redo allocation             187          5         12  999804931
	36D211C8 redo allocation             187          5         11  999804931
	36D21164 redo allocation             187          5         10  999804931
	36D21100 redo allocation             187          5          9  999804931
	36D2109C redo allocation             187          5          8  999804931
	36D21038 redo allocation             187          5          7  999804931
	36D20FD4 redo allocation             187          5          6  999804931
	36D20F70 redo allocation             187          5          5  999804931
	36D20F0C redo allocation             187          5          4  999804931
	36D20EA8 redo allocation             187          5          3  999804931
	36D20E44 redo allocation             187          5          2  999804931
	36D20DE0 redo allocation             187          5          1  999804931

	33 rows selected.

	SYS@PROD1>

#### 3） redo writing latch

如果该latch会持有，那么必然导致lgwr无法操作，因为当事务commit后，会触发lgwr进程将redo buffer中的脏数据写入到redo logfile中，而lgwr在写之前，必须先获得redo writing latch。

---- session 1

	SYS@PROD1> col name format a30 
	SYS@PROD1> select addr,latch#,name,level# from v$latch where name like '%redo%';

	ADDR         LATCH# NAME                               LEVEL#
	-------- ---------- ------------------------------ ----------
	2000DF34        146 redo on-disk SCN                        8
	2000DF98        147 ping redo on-disk SCN                   8
	2001252C        185 redo writing                            1
	20012594        186 redo copy                               4
	200125FC        187 redo allocation                         5
	20012664        188 real redo SCN                           8
	20012CD0        189 readredo stats and histogram            8
	200149F0        209 readable standby metadata redo          0
		             cache

	200264C0        515 KFR redo allocation latch               6

	9 rows selected.

	SYS@PROD1> oradebug setmypid
	Statement processed.
	SYS@PROD1> select to_number('2001252C','XXXXXXXXXXXX') from dual;

	TO_NUMBER('2001252C','XXXXXXXXXXXX')
	------------------------------------
		                   536945964

	SYS@PROD1> oradebug call kslgetl 536945964 1
	Function returned 1
	SYS@PROD1> 

---- session 2

	SYS@PROD1> delete from test01 where rownum < 2;

	1 row deleted.

	SYS@PROD1> commit;

	----> commit 之后 hang住在这里

---- session 1

	SYS@PROD1> oradebug call kslfre 536945964
	Function returned 0
	SYS@PROD1> 


---- session 2

	SYS@PROD1> commit;

	Commit complete.

	SYS@PROD1> 

释放掉之后redo write latch之后就可以commit了



