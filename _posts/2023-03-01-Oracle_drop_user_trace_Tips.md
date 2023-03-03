---
layout: post
title: "Oracle drop user trace Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle drop user trace Tips

```
SYS@cdb1> drop user C##_U1;
drop user C##_U1
*
ERROR at line 1:
ORA-01922: CASCADE must be specified to drop 'C##_U1'


SYS@cdb1>
```








### Trace 10046

`C##_U1` user have the following objects.

```
SYS@cdb1> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 PDB1 			  READ WRITE NO
	 4 SSB				  READ WRITE NO
SYS@cdb1> 
SYS@cdb1> select owner,object_name,status,con_id from cdb_objects where owner like 'C##_U1%';

OWNER  OBJECT_NAME STATUS  CON_ID
------ ----------- ------ -------
C##_U1 U1_PDB1_T1  VALID	3
C##_U1 U1_CDB_T1   VALID	1

SYS@cdb1> 
```

Trace `drop user`

```
SYS@cdb1> alter session set tracefile_identifier='drop_user';

Session altered.

SYS@cdb1>
SYS@cdb1> alter session set events '10046 trace name context forever,level 12';

Session altered.

SYS@cdb1> drop user C##_U1;
drop user C##_U1
*
ERROR at line 1:
ORA-01922: CASCADE must be specified to drop 'C##_U1'


SYS@cdb1> alter session set events '10046 trace name context off';

Session altered.

SYS@cdb1> 
SYS@cdb1> col name for a25
SYS@cdb1> col value for a75
SYS@cdb1> set linesize 300 pagesize 100
SYS@cdb1> select name,value from v$diag_info;

NAME			  VALUE
------------------------- ---------------------------------------------------------------------------
Diag Enabled		  TRUE
ADR Base		  /u01/app/oracle
ADR Home		  /u01/app/oracle/diag/rdbms/cdb1/cdb1
Diag Trace		  /u01/app/oracle/diag/rdbms/cdb1/cdb1/trace
Diag Alert		  /u01/app/oracle/diag/rdbms/cdb1/cdb1/alert
Diag Incident		  /u01/app/oracle/diag/rdbms/cdb1/cdb1/incident
Diag Cdump		  /u01/app/oracle/diag/rdbms/cdb1/cdb1/cdump
Health Monitor		  /u01/app/oracle/diag/rdbms/cdb1/cdb1/hm
Default Trace File	  /u01/app/oracle/diag/rdbms/cdb1/cdb1/trace/cdb1_ora_68420_drop_user.trc
Active Problem Count	  0
Active Incident Count	  0
ORACLE_HOME		  /u01/app/oracle/product/23.0.0/dbhome_1
Attention Log		  /u01/app/oracle/diag/rdbms/cdb1/cdb1/trace/attention_cdb1.log

13 rows selected.

SYS@cdb1> 


[oracle@ol8-23c ~]$ tkprof /u01/app/oracle/diag/rdbms/cdb1/cdb1/trace/cdb1_ora_68420_drop_user.trc drop_user.out

TKPROF: Release 23.0.0.0.0 - Development on Fri Mar 3 17:30:29 2023

Copyright (c) 1982, 2022, Oracle and/or its affiliates.  All rights reserved.

[oracle@ol8-23c ~]$ 
```

`drop user` contents
```
~
SQL ID: 50vxqdkj4zu1w Plan Hash: 1457651150

select user#,password,datats#,tempts#,type#,defrole,resource$,ptime,
  decode(defschclass,NULL,'DEFAULT_CONSUMER_GROUP',defschclass),spare1,spare4,
  ext_username,spare2,nvl(spare3,16382),spare9,spare10 
from
 user$ where name=:1

call     count       cpu    elapsed       disk      query    current        rows
------- ------  -------- ---------- ---------- ---------- ----------  ----------
Parse        1      0.01       0.00          0          0          0           0
Execute      1      0.00       0.00          0          0          0           0
Fetch        1      0.00       0.00          0          2          0           1
------- ------  -------- ---------- ---------- ---------- ----------  ----------
total        3      0.01       0.01          0          2          0           1
~

SQL ID: a9n505fuctymc Plan Hash: 3384591757

select null 
from
 obj$ where owner#=:1 and type#!=10 union all select null from link$ where 
  owner#=:1 union all select null from streams$_capture_process where 
  capture_userid=:1 union all select null from streams$_apply_process where 
  apply_userid=:1 union all select null from wri$_sqlset_definitions s,user$ 
  u where s.owner = u.name   and u.user#=:1 union all select null from 
  wri$_adv_tasks where owner#=:1 union all select null from xs$obj o, user$ u 
  where o.owner = u.name and u.user#=:1   union all select null from xs$ace a,
   user$ u where a.prin# = u.user# and u.type# = 1   and prin# = :1


call     count       cpu    elapsed       disk      query    current        rows
------- ------  -------- ---------- ---------- ---------- ----------  ----------
Parse        1      0.00       0.00          0          0          0           0
Execute      1      0.00       0.00          0          0          0           0
Fetch        1      0.00       0.00          0          3          0           1
------- ------  -------- ---------- ---------- ---------- ----------  ----------
total        3      0.00       0.00          0          3          0           1

```

```
select user#,name from user$ where name like 'C##_U1%';

select null 
from
 obj$ where owner#=:1 and type#!=10 union all select null from link$ where 
  owner#=:1 union all select null from streams$_capture_process where 
  capture_userid=:1 union all select null from streams$_apply_process where 
  apply_userid=:1 union all select null from wri$_sqlset_definitions s,user$ 
  u where s.owner = u.name   and u.user#=:1 union all select null from 
  wri$_adv_tasks where owner#=:1 union all select null from xs$obj o, user$ u 
  where o.owner = u.name and u.user#=:1   union all select null from xs$ace a,
   user$ u where a.prin# = u.user# and u.type# = 1   and prin# = :1
```

```
SELECT
    user#,
    name
FROM
    user$
WHERE
    name LIKE 'C##_U1%';

SELECT
    NULL
FROM
    obj$
WHERE
        owner# = &userid
    AND type# != 10
UNION ALL
SELECT
    NULL
FROM
    link$
WHERE
    owner# = &userid
UNION ALL
SELECT
    NULL
FROM
    streams$_capture_process
WHERE
    capture_userid = &userid
UNION ALL
SELECT
    NULL
FROM
    streams$_apply_process
WHERE
    apply_userid = &userid
UNION ALL
SELECT
    NULL
FROM
    wri$_sqlset_definitions s,
    user$                   u
WHERE
        s.owner = u.name
    AND u.user# = &userid
UNION ALL
SELECT
    NULL
FROM
    wri$_adv_tasks
WHERE
    owner# = &userid
UNION ALL
SELECT
    NULL
FROM
    xs$obj o,
    user$  u
WHERE
        o.owner = u.name
    AND u.user# = &userid
UNION ALL
SELECT
    NULL
FROM
    xs$ace a,
    user$  u
WHERE
        a.prin# = u.user#
    AND u.type# = 1
    AND prin# = &userid
;
```


### Reference

[参考](https://cloud.tencent.com/developer/article/1059628)

Have a good work&life! 2023/03 via LinHong


