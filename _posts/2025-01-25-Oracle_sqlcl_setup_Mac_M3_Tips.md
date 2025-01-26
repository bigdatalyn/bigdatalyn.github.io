---
layout: post
title: "Oracle sqlcl setup on MAC M3 Tips"
category: Oracle
tags: Oracle sqlcl Tips
---

* content
{:toc}

Oracle sqlcl setup on MAC M3 Tips

how to setup Oracle’s new SQL command line tool on a macOS

[Oracle SQLcl](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/)
```
Oracle SQL Developer Command Line (SQLcl) is a free command line interface for Oracle Database. It allows you to interactively or batch execute SQL and PL/SQL. SQLcl provides in-line editing, statement completion, and command recall for a feature-rich experience, all while also supporting your previously written SQL*Plus scripts. 
```






### SQLcl 

[Java Download for MAC ](https://www.java.com/en/download/)

```
Download Java for macOS
Recommended Version 8 Update 441 (filesize: 90.13 MB)
Release date: January 21, 2025
```

If you are running on an M series system (ARM64), download the ARM64 version of the JRE .
```
jre-8u441-macosx-aarch64.dmg
```

Or Use SQL Developer JDK env.

```
echo 'export JAVA_HOME=/Applications/SQLDeveloper.app/Contents/Resources/sqldeveloper/jdk/' > ~/sqlcl_env
echo 'export PATH=/Users/honglin/sqlcl/bin:$PATH' >> ~/sqlcl_env 
```

Test via sqldeveloper JDK
```
(base) honglin@macos ~ % cat sqlcl_env 
export JAVA_HOME=/Applications/SQLDeveloper.app/Contents/Resources/sqldeveloper/jdk/
export PATH=/Users/honglin/sqlcl/bin:$PATH
(base) honglin@macos ~ % sql system/Welcome12345#@localhost:1521/freepdb1
zsh: command not found: sql
(base) honglin@macos ~ % source sqlcl_env
(base) honglin@macos ~ % sql system/Welcome12345#@localhost:1521/freepdb1


SQLcl: Release 24.3 Production on Sun Jan 26 15:37:36 2025

Copyright (c) 1982, 2025, Oracle.  All rights reserved.

Last Successful login time: Sun Jan 26 2025 15:37:37 +08:00

Connected to:
Oracle Database 23ai Free Release 23.0.0.0.0 - Develop, Learn, and Run for Free
Version 23.6.0.24.10

SQL> show pdbs;

   CON_ID CON_NAME    OPENMODE      RESTRICTED    
_________ ___________ _____________ _____________ 
        3 FREEPDB1    READ WRITE    NO            
SQL> 
```

### Referece

[Java Download for MAC ](https://www.java.com/en/download/)

[SQL Developer 24.3.1](https://www.oracle.com/database/sqldeveloper/technologies/download/)

- Version 24.3.1.347.1826 - December 16, 2024

[Oracle SQLcl](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/)
```
Oracle SQL Developer Command Line (SQLcl) is a free command line interface for Oracle Database. It allows you to interactively or batch execute SQL and PL/SQL. SQLcl provides in-line editing, statement completion, and command recall for a feature-rich experience, all while also supporting your previously written SQL*Plus scripts. 
```


Have a good work&life! 2025/01 via LinHong