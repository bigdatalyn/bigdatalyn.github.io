---
layout: post
title: "Oracle 19c on Linux 8 Installation Tips"
category: Oracle
tags: Oracle Virtualbox Tips
---

* content
{:toc}

Oracle 19c on Linux 8 Installation Tips





### Command

oracle 19c product install

```
# Fake Oracle Linux 7.
export CV_ASSUME_DISTID=OEL7.6

# Interactive mode.
./runInstaller

# Silent mode.
./runInstaller -ignorePrereq -waitforcompletion -silent                        \
    -responseFile ${ORACLE_HOME}/install/response/db_install.rsp               \
    oracle.install.option=INSTALL_DB_SWONLY                                    \
    ORACLE_HOSTNAME=${ORACLE_HOSTNAME}                                         \
    UNIX_GROUP_NAME=oinstall                                                   \
    INVENTORY_LOCATION=${ORA_INVENTORY}                                        \
    SELECTED_LANGUAGES=en,en_GB                                                \
    ORACLE_HOME=${ORACLE_HOME}                                                 \
    ORACLE_BASE=${ORACLE_BASE}                                                 \
    oracle.install.db.InstallEdition=EE                                        \
    oracle.install.db.OSDBA_GROUP=dba                                          \
    oracle.install.db.OSBACKUPDBA_GROUP=dba                                    \
    oracle.install.db.OSDGDBA_GROUP=dba                                        \
    oracle.install.db.OSKMDBA_GROUP=dba                                        \
    oracle.install.db.OSRACDBA_GROUP=dba                                       \
    SECURITY_UPDATES_VIA_MYORACLESUPPORT=false                                 \
    DECLINE_SECURITY_UPDATES=true

As a root user, execute the following script(s):
        1. /u01/app/oraInventory/orainstRoot.sh
        2. /u01/app/oracle/product/19.0.0/dbhome_1/root.sh

```

Sample output:

```
[oracle@ol8-19c dbhome_1]$ ./runInstaller -ignorePrereq -waitforcompletion -silent                        \
>     -responseFile ${ORACLE_HOME}/install/response/db_install.rsp               \
>     oracle.install.option=INSTALL_DB_SWONLY                                    \
>     ORACLE_HOSTNAME=${ORACLE_HOSTNAME}                                         \
>     UNIX_GROUP_NAME=oinstall                                                   \
>     INVENTORY_LOCATION=${ORA_INVENTORY}                                        \
>     SELECTED_LANGUAGES=en,en_GB                                                \
>     ORACLE_HOME=${ORACLE_HOME}                                                 \
>     ORACLE_BASE=${ORACLE_BASE}                                                 \
>     oracle.install.db.InstallEdition=EE                                        \
>     oracle.install.db.OSDBA_GROUP=dba                                          \
>     oracle.install.db.OSBACKUPDBA_GROUP=dba                                    \
>     oracle.install.db.OSDGDBA_GROUP=dba                                        \
>     oracle.install.db.OSKMDBA_GROUP=dba                                        \
>     oracle.install.db.OSRACDBA_GROUP=dba                                       \
>     SECURITY_UPDATES_VIA_MYORACLESUPPORT=false                                 \
>     DECLINE_SECURITY_UPDATES=true
Launching Oracle Database Setup Wizard...

[WARNING] [INS-13014] Target environment does not meet some optional requirements.
   CAUSE: Some of the optional prerequisites are not met. See logs for details. installActions2021-07-08_04-52-15PM.log
   ACTION: Identify the list of failed prerequisite checks from the log: installActions2021-07-08_04-52-15PM.log. Then either from the log file or from installation manual find the appropriate configuration to meet the prerequisites and fix it manually.
The response file for this session can be found at:
 /u01/app/oracle/product/19.0.0/dbhome_1/install/response/db_2021-07-08_04-52-15PM.rsp

You can find the log of this install session at:
 /tmp/InstallActions2021-07-08_04-52-15PM/installActions2021-07-08_04-52-15PM.log

As a root user, execute the following script(s):
        1. /u01/app/oraInventory/orainstRoot.sh
        2. /u01/app/oracle/product/19.0.0/dbhome_1/root.sh

Execute /u01/app/oraInventory/orainstRoot.sh on the following nodes: 
[ol8-19c]
Execute /u01/app/oracle/product/19.0.0/dbhome_1/root.sh on the following nodes: 
[ol8-19c]


Successfully Setup Software with warning(s).
Moved the install session logs to:
 /u01/app/oraInventory/logs/InstallActions2021-07-08_04-52-15PM
[oracle@ol8-19c dbhome_1]$ 
[oracle@ol8-19c dbhome_1]$ /u01/app/oraInventory/orainstRoot.sh
This script must be executed as root
[oracle@ol8-19c dbhome_1]$ su -
Password: 
[root@ol8-19c ~]# /u01/app/oraInventory/orainstRoot.sh
Changing permissions of /u01/app/oraInventory.
Adding read,write permissions for group.
Removing read,write,execute permissions for world.

Changing groupname of /u01/app/oraInventory to oinstall.
The execution of the script is complete.
[root@ol8-19c ~]# /u01/app/oracle/product/19.0.0/dbhome_1/root.sh
Check /u01/app/oracle/product/19.0.0/dbhome_1/install/root_ol8-19c_2021-07-08_16-59-13-357123530.log for the output of root script
[root@ol8-19c ~]# 
```

DB creation:

```
# Start the listener.
lsnrctl start

# Interactive mode.
dbca

# Silent mode.
dbca -silent -createDatabase                                                   \
     -templateName General_Purpose.dbc                                         \
     -gdbname ${ORACLE_SID} -sid  ${ORACLE_SID} -responseFile NO_VALUE         \
     -characterSet AL32UTF8                                                    \
     -sysPassword SysPassword1                                                 \
     -systemPassword SysPassword1                                              \
     -createAsContainerDatabase true                                           \
     -numberOfPDBs 1                                                           \
     -pdbName ${PDB_NAME}                                                      \
     -pdbAdminPassword PdbPassword1                                            \
     -databaseType MULTIPURPOSE                                                \
     -memoryMgmtType auto_sga                                                  \
     -totalMemory 2000                                                         \
     -storageType FS                                                           \
     -datafileDestination "${DATA_DIR}"                                        \
     -redoLogFileSize 50                                                       \
     -emConfiguration NONE                                                     \
     -ignorePreReqs

Prepare for db operation
8% complete
Copying database files
31% complete
Creating and starting Oracle instance
32% complete
36% complete
40% complete
43% complete
46% complete
Completing Database Creation
51% complete
53% complete
54% complete
Creating Pluggable Databases
58% complete
77% complete
Executing Post Configuration Actions
100% complete
Database creation complete. For details check the logfiles at:
 /u01/app/oracle/cfgtoollogs/dbca/cdb1.
Database Information:
Global Database Name:cdb1
System Identifier(SID):cdb1
Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/cdb1/cdb11.log" for further details.
[oracle@ol8-19c ~]$ 

```

### sample schema

[Oracle Database Sample Schemas](https://github.com/oracle/db-sample-schemas/releases/tag/v19.2)


```sql
create tablespace sample datafile '/u02/oradata/CDB1/pdb1/sample01.dbf' size 300m;

perl -p -i.bak -e 's#__SUB__CWD__#'$(pwd)'#g' *.sql */*.sql */*.dat

-- @mksample systempw syspw hrpw oepw pmpw ixpw shpw bipw users temp /your/path/to/log/ connect_string
@mksample.sql SysPassword1 SysPassword1 oracle oracle oracle oracle oracle oracle sample temp /home/oracle/ system/SysPassword1@ol8-19c:1521/pdb1
```

output:
```
Table cardinality relational and object tables

OWNER  TABLE_NAME                       NUM_ROWS
------ ------------------------------ ----------
HR     COUNTRIES                              25
HR     DEPARTMENTS                            27
HR     EMPLOYEES                             107
HR     JOBS                                   19
HR     JOB_HISTORY                            10
HR     LOCATIONS                              23
HR     REGIONS                                 4
IX     AQ$_ORDERS_QUEUETABLE_G                 0
IX     AQ$_ORDERS_QUEUETABLE_H                 2
IX     AQ$_ORDERS_QUEUETABLE_I                 2
IX     AQ$_ORDERS_QUEUETABLE_L                 2
IX     AQ$_ORDERS_QUEUETABLE_S                 4
IX     AQ$_ORDERS_QUEUETABLE_T                 0
IX     AQ$_STREAMS_QUEUE_TABLE_C               0
IX     AQ$_STREAMS_QUEUE_TABLE_G               0
IX     AQ$_STREAMS_QUEUE_TABLE_H               0
IX     AQ$_STREAMS_QUEUE_TABLE_I               0
IX     AQ$_STREAMS_QUEUE_TABLE_L               0
IX     AQ$_STREAMS_QUEUE_TABLE_S               1
IX     AQ$_STREAMS_QUEUE_TABLE_T               0
IX     ORDERS_QUEUETABLE
IX     STREAMS_QUEUE_TABLE
IX     SYS_IOT_OVER_73240                      0
IX     SYS_IOT_OVER_73269                      0
OE     ACTION_TABLE                          132
OE     CATEGORIES_TAB                         22
OE     CUSTOMERS                             319
OE     INVENTORIES                          1112
OE     LINEITEM_TABLE                       2232
OE     ORDERS                                105
OE     ORDER_ITEMS                           665
OE     PRODUCT_DESCRIPTIONS                 8640
OE     PRODUCT_INFORMATION                   288
OE     PRODUCT_REF_LIST_NESTEDTAB            288
OE     PROMOTIONS                              2
OE     PURCHASEORDER                         132
OE     SUBCATEGORY_REF_LIST_NESTEDTAB         21
OE     WAREHOUSES                              9
PM     PRINT_MEDIA                             4
PM     TEXTDOCS_NESTEDTAB                     12
SH     CAL_MONTH_SALES_MV                     48
SH     CHANNELS                                5
SH     COSTS                                   0
SH     COUNTRIES                              23
SH     CUSTOMERS                           55500
SH     DR$SUP_TEXT_IDX$I
SH     DR$SUP_TEXT_IDX$K
SH     DR$SUP_TEXT_IDX$N
SH     DR$SUP_TEXT_IDX$U
SH     FWEEK_PSCAT_SALES_MV                11266
SH     PRODUCTS                               72
SH     PROMOTIONS                            503
SH     SALES                              918843
SH     SALES_TRANSACTIONS_EXT
SH     SUPPLEMENTARY_DEMOGRAPHICS           4500
SH     TIMES                                1826

56 rows selected.
```

### Reference

[Oracle Linux 8 (OL8) Installation](https://oracle-base.com/articles/linux/oracle-linux-8-installation)

[Oracle Database 19c Installation On Oracle Linux 8 (OL8)](https://oracle-base.com/articles/19c/oracle-db-19c-installation-on-oracle-linux-8)


Have a good work&life! 2021/07 via LinHong
