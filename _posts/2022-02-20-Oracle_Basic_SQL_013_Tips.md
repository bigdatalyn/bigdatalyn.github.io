---
layout: post
title: "Oracle Basic SQL 013 Tips"
category: Oracle
tags: Oracle SQL Tips
---

* content
{:toc}

Oracle Basic SQL 013 Study Tips

Remove characters from a string
- translate
- regexp_replace





### Env

```
SQL> select banner from v$version;

BANNER
----------------------------------------------------------------------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production

SQL> select banner_full from v$version;

BANNER_FULL
-----------------------------------------------------------------------------------------
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0


SQL> !cat /etc/redhat-release
Red Hat Enterprise Linux release 8.4 (Ootpa)

SQL> !uname -r
5.4.17-2102.201.3.el8uek.x86_64

SQL>
SQL> show user
USER is "HR"
SQL>

grant dba to hr;

```


### Remove characters from a string via translate

Remove `bc` characters.

```sql
SQL> select 'abcdef',translate('abcdef','1bc','1') as remove_text from dual;

'ABCDE REMO
------ ----
abcdef adef

SQL>
```

### Remove characters from a string via regexp_replace

Remove `bc` characters.

```sql
SQL> select 'abcdef',regexp_replace('abcdef','[bc]') as remove_text from dual;

'ABCDE REMO
------ ----
abcdef adef

SQL>

```

### Reference

[SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/index.html)

[SQL Language Reference / TRANSLATE](https://docs.oracle.com/en/database/oracle/oracle-database/21/sqlrf/TRANSLATE.html)

```
SQL> SELECT TRANSLATE('SQL*Plus User''s Guide', ' */''', '___') FROM DUAL;

TRANSLATE('SQL*PLUSU
--------------------
SQL_Plus_Users_Guide

SQL>
```

Have a good work&life! 2022/02 via LinHong

