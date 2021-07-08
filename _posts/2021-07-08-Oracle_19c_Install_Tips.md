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

### Reference

[Oracle Linux 8 (OL8) Installation](https://oracle-base.com/articles/linux/oracle-linux-8-installation)

[Oracle Database 19c Installation On Oracle Linux 8 (OL8)](https://oracle-base.com/articles/19c/oracle-db-19c-installation-on-oracle-linux-8)


Have a good work&life! 2021/07 via LinHong
