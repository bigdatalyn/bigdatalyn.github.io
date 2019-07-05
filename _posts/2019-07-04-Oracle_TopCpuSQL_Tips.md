---
layout: post
title: "Oracle Top CPU Sql Tips"
category: Oracle
tags: Oracle scripts Tips
---

* content
{:toc}

Oracle Top CPU Sql Tips

Find Top CPU SQL in Oracle.

Env Linux 7 + Oracle DB 19c










### Scripts Tips
	
	Linux:
	
	!ps -e -o pcpu -o pid -o user -o args | sort -k 1 | tail -10

	SQL plus:
	
	col username for a10
	col osuser for a10
	col spid for a10
	set linesize 300
	SELECT a.username,
		   a.osuser,
		   a.program,
		   spid,
		   sid,
		   a.serial#
	FROM   v$session a,
		   v$process b
	WHERE  a.paddr = b.addr
	AND    spid = '&pid';


	col Process for a10
	col SchemaName for a10
	col OsUser for a10
	col SqlText for a50

	SELECT s.sid, s.status "Status", p.spid "Process", s.schemaname "SchemaName", s.osuser "OsUser", Substr(a.sql_text,1,120) "SqlText", s.program "Program" FROM v$session s, v$sqlarea a, v$process p WHERE s.sql_hash_value = a.hash_value (+) AND s.sql_address = a.address (+) AND s.paddr = p.addr AND p.spid = '&spid' AND s.sid='&sid'; 


### Sample

Session01: Exec the following test SQL

	declare
	num int:=0;
	begin
	loop
	num:=num+1;
	end loop;
	end;
	/

Session02: Check Top 10 CPU 

SYS@orcl> !ps -e -o pcpu -o pid -o user -o args | sort -k 1 | tail -10
 0.0     9 root     [rcu_bh]
 0.1  6776 oracle   ora_mmon_orcl
 0.1  6791 oracle   ora_m000_orcl
 0.1  7135 oracle   ora_m002_orcl
 0.1  8096 oracle   /bin/rlwrap -i -b ()=!<>&+-*|:;, /u01/app/oracle/product/19.0.0/dbhome_1/bin/sqlplus / as sysdba
 0.1  8282 oracle   ora_m004_orcl
 0.3  7137 oracle   ora_m003_orcl
 1.1  6721 oracle   ora_vktm_orcl
16.3  8098 oracle   oracleorcl (DESCRIPTION=(LOCAL=YES)(ADDRESS=(PROTOCOL=beq)))
%CPU   PID USER     COMMAND


Session02: Check the Program via spid in sqlplus 

	SYS@orcl> 
	col username for a10
	col osuser for a10
	col spid for a10
	set linesize 300
	SELECT a.username,
		   a.osuser,
		   a.program,
		   spid,
		   sid,
		   a.serial#
	FROM   v$session a,
		   v$process b
	WHERE  a.paddr = b.addr
	 10  AND    spid = '&pid';
	Enter value for pid: 8098
	old  10: AND    spid = '&pid'
	new  10: AND    spid = '8098'

	USERNAME   OSUSER     PROGRAM                                          SPID              SID    SERIAL#
	---------- ---------- ------------------------------------------------ ---------- ---------- ----------
	SYS        oracle     sqlplus@localhost.localdomain (TNS V1-V3)        8098              294      39083

	SYS@orcl>

Session02: Check the detail Program / SQL via spid and sid in sqlplus 

	SYS@orcl> col Process for a10
	SYS@orcl> col SchemaName for a10
	SYS@orcl> col OsUser for a10
	SYS@orcl> col SqlText for a50
	SYS@orcl> SELECT s.sid, s.status "Status", p.spid "Process", s.schemaname "SchemaName", s.osuser "OsUser", Substr(a.sql_text,1,120) "SqlText", s.program "Program" FROM v$session s, v$sqlarea a, v$process p WHERE s.sql_hash_value = a.hash_value (+) AND s.sql_address = a.address (+) AND s.paddr = p.addr AND p.spid = '&spid' AND s.sid='&sid';
	Enter value for spid: 8098
	Enter value for sid: 294
	old   1: SELECT s.sid, s.status "Status", p.spid "Process", s.schemaname "SchemaName", s.osuser "OsUser", Substr(a.sql_text,1,120) "SqlText", s.program "Program" FROM v$session s, v$sqlarea a, v$process p WHERE s.sql_hash_value = a.hash_value (+) AND s.sql_address = a.address (+) AND s.paddr = p.addr AND p.spid = '&spid' AND s.sid='&sid'
	new   1: SELECT s.sid, s.status "Status", p.spid "Process", s.schemaname "SchemaName", s.osuser "OsUser", Substr(a.sql_text,1,120) "SqlText", s.program "Program" FROM v$session s, v$sqlarea a, v$process p WHERE s.sql_hash_value = a.hash_value (+) AND s.sql_address = a.address (+) AND s.paddr = p.addr AND p.spid = '8098' AND s.sid='294'

		   SID Status   Process    SchemaName OsUser     SqlText                                            Program
	---------- -------- ---------- ---------- ---------- -------------------------------------------------- ------------------------------------------------
		   294 ACTIVE   8098       SYS        oracle     declare num int:=0; begin loop num:=num+1; end loo sqlplus@localhost.localdomain (TNS V1-V3)
														 p; end;


	SYS@orcl>

	
Have a good work&life! 2019/07 via LinHong



