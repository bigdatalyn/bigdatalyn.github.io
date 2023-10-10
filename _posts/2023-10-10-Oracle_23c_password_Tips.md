---
layout: post
title: "Oracle 23c set user password limit Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 23c set user password limit Tips

There is below errors while set simple password for test user.
```
ORA-28003: The password chosen did not meet the required complexity rules set
by your organization.
ORA-20000: password length less than 9 characters
```








Set `PASSWORD_VERIFY_FUNCTION` profile value to null.(Disable PASSWORD_VERIFY_FUNCTION)

```
[oracle@hong23c ~]$ sqlplus / as sysdba

SQL*Plus: Release 23.0.0.0.0 - Production on Tue Oct 10 13:58:06 2023
Version 23.3.0.23.09

Copyright (c) 1982, 2023, Oracle.  All rights reserved.


Connected to:
Oracle Database 23c EE High Perf Release 23.0.0.0.0 - Production
Version 23.3.0.23.09

SQL> alter user system identified by oracle container=all;
alter user system identified by oracle container=all
*
ERROR at line 1:
ORA-28003: The password chosen did not meet the required complexity rules set
by your organization.
ORA-20000: password length less than 9 characters
Help: https://docs.oracle.com/error-help/db/ora-28003/


SQL> alter profile default limit PASSWORD_VERIFY_FUNCTION null;

Profile altered.

SQL> alter user system identified by oracle container=all;

User altered.

SQL> 
```

Check dba_profiles with the following sql.
```
SQL> select * from dba_profiles d WHERE d.profile='DEFAULT';

PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
FAILED_LOGIN_ATTEMPTS		 PASSWORD
3
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
PASSWORD_REUSE_MAX		 PASSWORD
5
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
COMPOSITE_LIMIT 		 KERNEL
UNLIMITED
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
SESSIONS_PER_USER		 KERNEL
UNLIMITED
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
CPU_PER_SESSION 		 KERNEL
UNLIMITED
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
CPU_PER_CALL			 KERNEL
UNLIMITED
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
LOGICAL_READS_PER_SESSION	 KERNEL
UNLIMITED
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
LOGICAL_READS_PER_CALL		 KERNEL
UNLIMITED
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
IDLE_TIME			 KERNEL
UNLIMITED
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
CONNECT_TIME			 KERNEL
UNLIMITED
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
PRIVATE_SGA			 KERNEL
UNLIMITED
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
PASSWORD_LIFE_TIME		 PASSWORD
60
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
PASSWORD_REUSE_TIME		 PASSWORD
365
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
PASSWORD_VERIFY_FUNCTION	 PASSWORD
NULL
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
PASSWORD_LOCK_TIME		 PASSWORD
1
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
PASSWORD_GRACE_TIME		 PASSWORD
7
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
INACTIVE_ACCOUNT_TIME		 PASSWORD
UNLIMITED
NO  NO	NO  YES NO


PROFILE
--------------------------------------------------------------------------------
RESOURCE_NAME			 RESOURCE
-------------------------------- --------
LIMIT
--------------------------------------------------------------------------------
COM INH IMP ORA MAN
--- --- --- --- ---
DEFAULT
PASSWORD_ROLLOVER_TIME		 PASSWORD
0
NO  NO	NO  YES NO


18 rows selected.

SQL> 
```


Have a good work&life! 2023/10 via LinHong


