---
layout: post
title: "Oracle Monitor wrong password user Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Monitor wrong password user









### Trigger to get ORA-1017 error and write messages to alert log

```sql
CREATE OR REPLACE TRIGGER logon_denied_write_alertlog AFTER SERVERERROR ON DATABASE
DECLARE
l_message varchar2(2000);
BEGIN
-- ORA-1017: invalid username/password; logon denied
IF (IS_SERVERERROR(1017)) THEN
select 'Failed login attempt to the "'|| sys_context('USERENV' ,'AUTHENTICATED_IDENTITY') ||'" schema'
|| ' using ' || sys_context ('USERENV', 'AUTHENTICATION_METHOD') ||' authentication'
|| ' at ' || to_char(logon_time,'yyyy/mm/dd hh24:mi:ss' )
|| ' from ' || osuser ||'@'||machine ||' ['||nvl(sys_context ('USERENV', 'IP_ADDRESS'),'Unknown IP')||']'
|| ' via the "' ||process||'" process.'
into l_message
from sys.v_$session
where sid = to_number(substr(dbms_session.unique_session_id,1 ,4), 'xxxx')
and serial# = to_number(substr(dbms_session.unique_session_id,5 ,4), 'xxxx');

-- write to alert log
sys.dbms_system .ksdwrt( 2,l_message );
END IF;
END;
/
```

### Test Case

User wrong password to connect.

```sql
[oracle@ol8-21c ~]$ sqlplus lin/oracle111

SQL*Plus: Release 21.0.0.0.0 - Production on Fri Sep 24 11:44:19 2021
Version 21.3.0.0.0

Copyright (c) 1982, 2021, Oracle.  All rights reserved.

ERROR:
ORA-01017: invalid username/password; logon denied


Enter user-name: 
```

The message has been writen the following messages.
```sql
[oracle@ol8-21c ~]$ tail -2 /u01/app/oracle/diag/rdbms/cdb1/cdb1/trace/alert_cdb1.log 
 : 
Failed login attempt to the "LIN" schema using PASSWORD authentication at 2021/09/24 11:44:21 from oracle@ol8-21c [Unknown IP] via the "282220" process.
[oracle@ol8-21c ~]$ 
```


Have a good work&life! 2021/09 via LinHong

