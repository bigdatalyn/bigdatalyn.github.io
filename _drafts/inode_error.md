### Error
```sql
[oracle@xd00adm07 /]$ export ORACLE_HOME=/u01/app/oracle/product/12.1.0.2/dbhome_1
[oracle@xd00adm07 /]$ export ORACLE_SID=cdbm01
[oracle@xd00adm07 /]$ /u01/app/oracle/product/12.1.0.2/dbhome_1/bin/sqlplus / as sysdba

SQL*Plus: Release 12.1.0.2.0 Production on Mon May 8 05:15:10 2017

Copyright (c) 1982, 2014, Oracle. All rights reserved.

ERROR:
ORA-09925: Unable to create audit trail file
Linux-x86_64 Error: 28: No space left on device
Additional information: 9925
ORA-01075: you are currently logged on
```

### 调查分析

原因是在OS层面inode空间已经使用完了！

```
[oracle@xd00adm07 ~]$ df -hi /u02
Filesystem Inodes IUsed IFree IUse% Mounted on
/dev/mapper/VGExaDb-LVDbOra2
13M 13.0M 0.6M 100% /u02
```
### 解决方案

清理数据库告警日志目录下的跟踪文件.trc和.trm（之前测试残留了非常多.trc/.trm文件）

目录在: `/u02/app/oracle/admin/12.1.0.2/diag/rdbms/<sid>` 这个目录下。（不要ls，会花费很长时间）

注意：删除清理这些文件消耗很多时间，建议使用vnc跑清理文件操作。（用rsync删除海量小文件特性，将空目录到要删除的目录。）

```
/u02/app/oracle/admin/12.1.0.2/diag/rdbms/cdbm01/cdbm011>time rsync -a --delete trace_org/ trace/
real 354m28.833s
user 0m19.448s
sys 6m7.240s
/u02/app/oracle/admin/12.1.0.2/diag/rdbms/cdbm01/cdbm011>
```





