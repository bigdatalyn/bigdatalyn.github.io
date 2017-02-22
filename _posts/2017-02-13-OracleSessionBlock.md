---
layout: post
title: "Oracle Session 阻塞处理"
category: Oracle
tags: Oracle Redo
---

* content
{:toc}


Oracle会自行处理死锁的情况，不需要人为的干预，但是ORACLE不能自己处理session阻塞的的情况。

阻塞导致资源的浪费和消耗系统性能，这个时候我们就需要快速的找出导致阻塞的原因，并尽快排除它，好让系统重新正常运行。

下面我将做一个例子来解释如何迅速的处理这种阻塞和处理。






下面的例子是两个session 同时更新HR用户的同一条记录。

测试：

窗口Terminal01窗口:

	
	conn hr/hr
	
	select * from  hr.employees where employee_id=100;

	update hr.employees set last_name='session01' where employee_id=100;

如图：

![Terminal01]({{ "/files/Images/Oracle/session01.jpg"}})

窗口Terminal02:

	conn hr/hr

	select * from  hr.employees where employee_id=100;

	update hr.employees set last_name='session02' where employee_id=100;

如图：

![Terminal02]({{ "/files/Images/Oracle/session02.jpg"}})


窗口2执行完update语句之后，进入等待……hang住不动了

处理：在打开一个窗口，用SYS用户登陆：

	conn / as sysdba	

	---查找阻塞，和被阻塞session id
	select c.terminal||' ('''||a.sid||','||c.serial#||''') is blocking '||b.sid ||','||d.serial# block_msg, a.block  from v$lock a,v$lock b,v$session c,v$session d where a.id1=b.id1  and a.id2=b.id2 and a.block>0  and a.sid <>b.sid  and a.sid=c.sid  and b.sid=d.SID;

	---确认session信息
	select sid,serial#,username from v$session where username is not null;

	---kill掉被阻塞的session
	alter system kill session 'xxx,yy';


如图：

![Terminal03]({{ "/files/Images/Oracle/session03.jpg"}})


结果：

窗口Terminal02:

	HR> update hr.employees set last_name='session02' where employee_id=100;
	update hr.employees set last_name='session02' where employee_id=100
		  *
	ERROR at line 1:
	ORA-00028: your session has been killed
	ORA-00028: your session has been killed


	HR> select * from  hr.employees where employee_id=100;
	ERROR:
	ORA-03114: not connected to ORACLE


	HR> 

提示session已经被killed需要重新连接。

	

