---
layout: post
title: "Oracle 23c New features - Evolution of Oracle Homes Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - Evolution of Oracle Homes Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	


Oracle base home, Oracle base config, and orabasetab.



### Oracle base home, Oracle base config, and orabasetab

```
[oracle@ol8-23c bin]$ cd
[oracle@ol8-23c ~]$ cd $ORACLE_HOME/bin
[oracle@ol8-23c bin]$ ./orabasehome
/u01/app/oracle/product/23.0.0/dbhome_1
[oracle@ol8-23c bin]$ ./orabaseconfig
/u01/app/oracle/product/23.0.0/dbhome_1
[oracle@ol8-23c bin]$ cat $ORACLE_HOME/install/orabasetab 
#orabasetab file is used to track Oracle Home associated with Oracle Base
/u01/app/oracle/product/23.0.0/dbhome_1:/u01/app/oracle:OraDB23Home1:N:
[oracle@ol8-23c bin]$ 
```


About Read-Only Oracle Homes
```
With Oracle Database 23c, an Oracle home is available in read/write mode by default. However, you can choose to configure an Oracle home in read-only mode after you have performed a software-only Oracle Database installation.
```

About Oracle Base Home
```
Both, in a read-only ORACLE_HOME and read/write ORACLE_HOME, the user-specific files, instance-specific files, and log files reside in a location known as the ORACLE_BASE_HOME.
```

About Oracle Base Config
```
Both, in a read-only ORACLE_HOME and read/write ORACLE_HOME, the configuration files reside in a location known as ORACLE_BASE_CONFIG.
```

About orabasetab
```
The orabasetab file is used to define fundamental directories based on $ORACLE_HOME, ORACLE_BASE, ORACLE_BASE_HOME and ORACLE_BASE_CONFIG.
```
`Y` in the orabasetab file at the end of the line indicates you have a read-only Oracle home.


### Enabling a Read-Only Oracle Home

Run the roohctl Script
```
[oracle@ol8-23c ~]$ cd $ORACLE_HOME/bin
[oracle@ol8-23c bin]$ ./roohctl -enable
Enabling Read-Only Oracle home.
Cannot enable Read-Only Oracle home in a configured Oracle home.
The Oracle Home is configured with databases 'cdb1'.
[oracle@ol8-23c bin]$
```

--> should execute before creating database(cdb).

[Enabling a Read-Only Oracle Home](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/ladbi/enabling-read-only-oracle-home.html#GUID-7B2FA40E-8FBA-4494-934A-A284532AF702)

### Read-Only Oracle Home and Read/Write Oracle Home File Path Examples

Table 12-1 Read-Only Oracle Home and Read/Write Oracle Home File Path Examples

![23c-oracle_home_rw]({{ "/files/Oracle/23c/oracle_home_rw.png"}})


### Reference 

[12 Configuring Oracle Homes](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/ladbi/understanding-read-only-oracle-homes.html#GUID-AE1973D7-0325-4AD8-9FC9-D7BA3C3C3F37)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


