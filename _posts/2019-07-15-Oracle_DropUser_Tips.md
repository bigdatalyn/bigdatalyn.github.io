---
layout: post
title: "Oracle Drop User Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle Drop User Tips







I met ORA-01940 error when I want to drop user after using swingbench to create data.

Use the following sql to find sid/serial to kill the unused session.

	SQL> drop user soe cascade;
	drop user soe cascade
	*
	ERROR at line 1:
	ORA-01940: cannot drop a user that is currently connected

	SQL>
	SQL> SELECT 'alter system kill session '''||SID||','||SERIAL#||''';' FROM V$SESSION WHERE USERNAME = 'SOE';

	'ALTERSYSTEMKILLSESSION'''||SID||','||SERIAL#||''';'
	--------------------------------------------------------------------------------
	alter system kill session '6570,63232';
	alter system kill session '7276,62262';
	alter system kill session '8777,10276';
	alter system kill session '9433,26026';
	alter system kill session '13380,43404';

	SQL> alter system kill session '6570,63232';
	alter system kill session '7276,62262';
	alter system kill session '8777,10276';
	alter system kill session '9433,26026';
	alter system kill session '13380,43404';

	System altered.

	SQL>
	System altered.

	SQL>
	System altered.

	SQL>
	System altered.

	SQL>
	System altered.

	SQL>
	SQL>
	SQL> drop user soe cascade;

	User dropped.

	SQL>

	
Have a good work&life! 2019/07 via LinHong



