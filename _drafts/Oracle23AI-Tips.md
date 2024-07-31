

### User Password Error - ORA-28003

```
[oracle@db23ai01 ~]$ sql / as sysdba

SQLcl: Release 24.1 Production on Thu Jul 04 13:31:44 2024

Copyright (c) 1982, 2024, Oracle.  All rights reserved.

Connected to:
Oracle Database 23ai EE High Perf Release 23.0.0.0.0 - for Oracle Cloud
Version 23.4.1.24.06

SQL> create user c##hong identified by oracle account unlock container=all;

Error starting at line : 1 in command -
create user c##hong identified by oracle account unlock container=all
Error report -
ORA-28003: The password chosen did not meet the required complexity rules set by your organization.
ORA-20000: password length less than 9 characters
Help: https://docs.oracle.com/error-help/db/ora-28003/
1.     00000 -  "The password chosen did not meet the required complexity rules set by your organization."
*Cause:    The new password did not meet the complexity rules which may
           include the minimum number of characters, integers, and special
           characters.
*Action:   Enter a different password that meets your organization
           password complexity requirements. If you don't know the password
           requirements, check with your system administrator or help desk.
SQL> select * from dba_profiles where resource_NAME='PASSWORD_VERIFY_FUNCTION';

PROFILE             RESOURCE_NAME               RESOURCE_TYPE    LIMIT                            COMMON    INHERITED    IMPLICIT    ORACLE_MAINTAINED    MANDATORY    
___________________ ___________________________ ________________ ________________________________ _________ ____________ ___________ ____________________ ____________ 
DEFAULT             PASSWORD_VERIFY_FUNCTION    PASSWORD         ORA12C_STRONG_VERIFY_FUNCTION    NO        NO           NO          YES                  NO           
ORA_CIS_PROFILE     PASSWORD_VERIFY_FUNCTION    PASSWORD         ORA12C_VERIFY_FUNCTION           NO        NO           NO          YES                  NO           
ORA_STIG_PROFILE    PASSWORD_VERIFY_FUNCTION    PASSWORD         ORA12C_STIG_VERIFY_FUNCTION      NO        NO           NO          YES                  NO           

SQL> alter profile default limit password_verify_function null;

Profile DEFAULT altered.

SQL> select * from dba_profiles where resource_NAME='PASSWORD_VERIFY_FUNCTION';

PROFILE             RESOURCE_NAME               RESOURCE_TYPE    LIMIT                          COMMON    INHERITED    IMPLICIT    ORACLE_MAINTAINED    MANDATORY    
___________________ ___________________________ ________________ ______________________________ _________ ____________ ___________ ____________________ ____________ 
DEFAULT             PASSWORD_VERIFY_FUNCTION    PASSWORD         NULL                           NO        NO           NO          YES                  NO           
ORA_CIS_PROFILE     PASSWORD_VERIFY_FUNCTION    PASSWORD         ORA12C_VERIFY_FUNCTION         NO        NO           NO          YES                  NO           
ORA_STIG_PROFILE    PASSWORD_VERIFY_FUNCTION    PASSWORD         ORA12C_STIG_VERIFY_FUNCTION    NO        NO           NO          YES                  NO           

SQL> create user c##hong identified by oracle account unlock container=all;

User C##HONG created.

SQL> grant connect,create session,resource,dba to c##hong container=all;

Grant succeeded.

SQL> 
```