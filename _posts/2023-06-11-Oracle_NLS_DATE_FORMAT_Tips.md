---
layout: post
title: "Oracle NLS_DATE_FORMAT Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle NLS_DATE_FORMAT Tips

Setting NLS_DATE_FORMAT in the shell environment variable using setenv or export command is not effective. 
When querying dates from SQL*Plus, it does not reflect the NLS_DATE_FORMAT.

```sql
% setenv NLS_DATE_FORMAT 'YYYYMMDD'
% sqlplus / as sysdba

SQL> select sysdate from dual;

SYSDATE
---------
17-SEP-18
```








### SOLUTION

Configured NLS_DATE_FORMAT environment variable.

Environment variable NLS_LANG needs to be set as well.


Set both NLS_LANG and NLS_DATE_FORMAT environment variables.

Examples:
```
% setenv NLS_LANG American_America.AL32UTF8
% setenv NLS_DATE_FORMAT "DD-MON-YYYY.HH24:MI:SS"
% sqlplus / as sysdba
SQL> select sysdate from dual;

SYSDATE
-----------------------------
17-SEP-2018.21:56:57


% setenv NLS_LANG American_America.AL32UTF8
% setenv NLS_DATE_FORMAT "YYYYMMDD"
% sqlplus / as sysdba
SQL> select sysdate from dual;

SYSDATE
--------
20180917
```

### Referece

参考:

NLS_DATE_FORMAT Configured By Environment Variable Is Ignored (Doc ID 2448279.1)	


Have a good work&life! 2023/06 via LinHong


