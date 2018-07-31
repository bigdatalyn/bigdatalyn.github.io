---
layout: post
title: "Oracle Session Tips"
category: Oracle
tags: Oracle SQL
---

* content
{:toc}


Oracle Session Tips


Check the session's information.

	SQL> select  b.MACHINE, b.PROGRAM , count(*) from v$process a, v$session b where a.ADDR = b.PADDR and  b.USERNAME is not null   group by  b.MACHINE  , b.PROGRAM order by count(*) desc;

	MACHINE                                                                                                          PROGRAM                                                                                     COUNT(*)
	-------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------ ----------
	iZwz92mfhsio3n38nswnocZ                                                                                          JDBC Thin Client                                                                                           1
	izwz9fw6w9bctb8caet90bz                                                                                          sqlplus@izwz9fw6w9bctb8caet90bz (TNS V1-V3)                                                                1

	SQL> 
	SQL> select username,count(username) from v$session where username is not null group by username
	  2  ;

	USERNAME                                                     COUNT(USERNAME)
	------------------------------------------------------------ ---------------
	APPS                                                                       1
	SYS                                                                        1

	SQL> 
	
	Session:
	select * from v$session where username is not null;
	
	Process:
	select count(*) from v$process;
	

To be continue....

Have a good life! 2018/07 via LinHong


