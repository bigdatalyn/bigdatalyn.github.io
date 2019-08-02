---
layout: post
title: "The PLUSTRACE ROLE Tips"
category: Oracle
tags: Oracle Autotrace Tips
---

* content
{:toc}

The PLUSTRACE ROLE Tips

The Tips with seting up the autotrace role-PLUSTRACE.





General user want to use autotrace and there is the following error msg.


	Execution Plan
	----------------------------------------------------------
	ERROR:
	ORA-01039: insufficient privileges on underlying objects of the view

	SP2-0612: Error generating AUTOTRACE EXPLAIN report

or 

	SP2-0618: Cannot find the Session Identifier.  Check PLUSTRACE role is enabled
	
	SP2-0611: Error enabling STATISTICS report

Grant plustrce role to the general user.

	SQL> conn sys/sys as sysdba
	SQL> GRANT PLUSTRACE TO SH;

if the error [ORA-01919: role 'PLUSTRACE' does not exist] has happened,it need to execute the following script.

	@$ORACLE_HOME/sqlplus/admin/plustrce.sql;

if the error [ORA-01039: insufficient privileges on underlying objects of the view] has happened, it need to execute the following script by sysdba users.

	SQL> GRANT SELECT ANY DICTIONARY TO SH;


Sample:

	SH@PDB1> set autot on
	SH@PDB1> select segment_name, bytes/1024/1024 as sizes from user_segments where bytes > 10*1024*1024 order by 2;

	SEGMENT_NAME                                                                                                                          SIZES
	-------------------------------------------------------------------------------------------------------------------------------- ----------
	CUSTOMERS                                                                                                                                13


	Execution Plan
	----------------------------------------------------------
	ERROR:
	ORA-01039: insufficient privileges on underlying objects of the view


	SP2-0612: Error generating AUTOTRACE EXPLAIN report

	Statistics
	----------------------------------------------------------
			  0  recursive calls
			  0  db block gets
		   6137  consistent gets
			 59  physical reads
			  0  redo size
			639  bytes sent via SQL*Net to client
			464  bytes received via SQL*Net from client
			  2  SQL*Net roundtrips to/from client
			  1  sorts (memory)
			  0  sorts (disk)
			  1  rows processed

	SH@PDB1>




	
Have a good work&life! 2019/07 via LinHong



