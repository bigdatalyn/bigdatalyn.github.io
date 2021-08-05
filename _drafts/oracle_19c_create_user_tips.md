
SQL> create user sehub identified by oracle;
create user sehub identified by oracle
*
ERROR at line 1:
ORA-28003: password verification for the specified password failed
ORA-20001: Password length less than 8


SQL> 


SQL> @colfmt
COL "PROFILE"                        FOR A16
COL "RESOURCE_NAME"                  FOR A24
COL "LIMIT"                          FOR A29
SQL> select profile, resource_name, limit from dba_profiles where RESOURCE_NAME = 'PASSWORD_VERIFY_FUNCTION';

PROFILE 	 RESOURCE_NAME		  LIMIT
---------------- ------------------------ -----------------------------
DEFAULT 	 PASSWORD_VERIFY_FUNCTION VERIFY_FUNCTION_11G
ORA_STIG_PROFILE PASSWORD_VERIFY_FUNCTION ORA12C_STRONG_VERIFY_FUNCTION

SQL> 

<1> change profile
 
SQL> alter profile system limit PASSWORD_VERIFY_FUNCTION null;

<2> sample password

SQL> create user sehub identified by "SysPassword1";

User created.

SQL> grant create session,connect,resource,dba to sehub;

Grant succeeded.

SQL> conn sehub/SysPassword1
Connected.
SQL> show user
USER is "SEHUB"
SQL> 
