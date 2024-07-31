---
layout: post
title: "Oracle 23ai Linux 9 Install Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 23ai Linux 9 Install Tips

Some tips for oracle 23ai install.

[1 Oracle Database Installation Checklist](https://docs.oracle.com/en/database/oracle/oracle-database/23/ladbi/oracle-database-installation-checklist.html)

[Oracle Database 19c Installation On Oracle Linux 7 (OL7)](https://oracle-base.com/articles/19c/oracle-db-19c-installation-on-oracle-linux-7)







### Oracle 23ai Install 

Commands tips:
```

# Install Oracle Linux Developer yum repository configuration
dnf -y install oraclelinux-developer-release-el9

# Install rlwrap and set alias
dnf -y install oracle-epel-release-el9

# If you plan to use the "oracle-database-preinstall-19c" package to perform all your prerequisite setup, issue the following command.
# dnf -y install oracle-database-preinstall-19c
# https://docs.oracle.com/en/database/oracle/oracle-database/23/ladbi/supported-oracle-linux-9-distributions-for-x86-64.html

dnf -y install oracle-database-preinstall-23ai

## The following packages are listed as required. Many of the packages should be installed already.
dnf -y install bc
dnf -y install binutils
dnf -y install compat-openssl11
dnf -y install elfutils-libelf
dnf -y install fontconfig
dnf -y install glibc
dnf -y install glibc-devel
dnf -y install glibc-headers
dnf -y install ksh
dnf -y install libaio
dnf -y install libasan
dnf -y install liblsan
dnf -y install libX11
dnf -y install libXau
dnf -y install libXi
dnf -y install libXrender
dnf -y install libXtst
dnf -y install libxcrypt-compat
dnf -y install libgcc
dnf -y install libibverbs
dnf -y install libnsl
dnf -y install librdmacm
dnf -y install libstdc++
dnf -y install libxcb
dnf -y install libvirt-libs
dnf -y install make
dnf -y install policycoreutils
dnf -y install policycoreutils-python-utils
dnf -y install smartmontools
dnf -y install sysstat
## Add Hong
dnf -y install gcc
dnf -y install unixODBC

# Set oracle password
echo oracle:"oracle" | sudo chpasswd

### /etc/sysconfig/selinux
### /etc/selinux/config
vi /etc/selinux/config
SELINUX=permissive
## 
sed -i 's/SELINUX=enforcing/SELINUX=permissive/g' /etc/selinux/config
setenforce Permissive


## Disable Linux firewall 
systemctl stop firewalld
systemctl disable firewalld


dnf -y --enablerepo=ol9_developer_EPEL install rlwrap
cat <<EOT >>/home/oracle/.bashrc
alias sqlplus='rlwrap sqlplus'
EOT

### 

ORACLE_BASE=/u01/app/oracle
ORACLE_CHARACTERSET=AL32UTF8
ORACLE_HOME=/u01/app/oracle/product/23.0.0.0/dbhome_1

# Create directories
sudo mkdir -p "$ORACLE_HOME"
sudo chown -R oracle:oinstall "$ORACLE_BASE"/..
sudo chmod -R 775 "$ORACLE_BASE"/..

# Set environment variables
sudo tee -a /home/oracle/.bash_profile <<EOT
export ORACLE_BASE=$ORACLE_BASE
export ORACLE_HOME=$ORACLE_HOME
export ORACLE_SID=ORCLCDB
export PATH=\$PATH:\$ORACLE_HOME/bin:\$ORACLE_HOME/jdk/bin
EOT

su - oracle

# Unzip software.
cd $ORACLE_HOME
unzip -oq /mnt/XXXX.zip

[oracle@db23ai RDBMS_MAIN_LINUX.X64_XXXXX]$ ls -tlr
total 3959204
-r--r--r--. 1 oracle oinstall  775195664 Jul 31 13:41 client231000.zip
-r--r--r--. 1 oracle oinstall 1039991367 Jul 31 13:42 grid_home.zip
-r--r--r--. 1 oracle oinstall 2239018898 Jul 31 13:43 db_home.zip
[oracle@db23ai RDBMS_MAIN_LINUX.X64_XXXXX]$ cd $ORACLE_HOME
[oracle@db23ai dbhome_1]$ unzip -oq /home/oracle/RDBMS_MAIN_LINUX.X64_XXXXX/db_home.zip 
[oracle@db23ai dbhome_1]$ ls -tlr
total 272
-rw-r--r--.  1 oracle oinstall   852 Aug 18  2015 env.ora
-rw-r--r--.  1 oracle oinstall  2927 Jul 20  2020 schagent.conf
-rwxr-x---.  1 oracle oinstall  2867 Mar 27 09:25 runInstaller

# Interactive mode.
./runInstaller

# Silent mode.
./runInstaller -ignorePrereq -waitforcompletion -silent                        \
    -responseFile ${ORACLE_HOME}/install/response/db_install.rsp               \
    oracle.install.option=INSTALL_DB_SWONLY                                    \
    ORACLE_HOSTNAME=db23ai                                                     \
    UNIX_GROUP_NAME=oinstall                                                   \
    INVENTORY_LOCATION=/u01/app/oracle                                         \
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



# Start the listener.
lsnrctl start


listener.ora
LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
      (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))
    )
  )

lsnrctl Slow tips:
$ vi /etc/resolv.conf
# Generated by NetworkManager
# nameserver 119.29.29.29

or use the following method.
$ su - root
$ vi /etc/ssh/sshd_config
UseDNS no

mkdir -p /u01/app/oradata
# Silent mode.
dbca -silent -createDatabase                                                   \
     -templateName General_Purpose.dbc                                         \
     -gdbname ORCLCDB -sid  ORCLCDB -responseFile NO_VALUE                     \
     -characterSet AL32UTF8                                                    \
     -sysPassword SysPassword1                                                 \
     -systemPassword SysPassword1                                              \
     -createAsContainerDatabase true                                           \
     -numberOfPDBs 1                                                           \
     -pdbName PDB1                                                      \
     -pdbAdminPassword PdbPassword1                                            \
     -databaseType MULTIPURPOSE                                                \
     -memoryMgmtType auto_sga                                                  \
     -totalMemory 2000                                                         \
     -storageType FS                                                           \
     -datafileDestination "/u01/app/oradata"                                        \
     -redoLogFileSize 60                                                       \
     -emConfiguration NONE                                                     \
     -ignorePreReqs

[oracle@db23ai ~]$ mkdir -p /u01/app/oradata
[oracle@db23ai ~]$ dbca -silent -createDatabase                                                   \
     -templateName General_Purpose.dbc                                         \
     -gdbname ORCLCDB -sid  ORCLCDB -responseFile NO_VALUE                     \
     -characterSet AL32UTF8                                                    \
     -sysPassword SysPassword1                                                 \
     -systemPassword SysPassword1                                              \
     -createAsContainerDatabase true                                           \
     -numberOfPDBs 1                                                           \
     -pdbName PDB1                                                      \
     -pdbAdminPassword PdbPassword1                                            \
     -databaseType MULTIPURPOSE                                                \
     -memoryMgmtType auto_sga                                                  \
     -totalMemory 2000                                                         \
     -storageType FS                                                           \
     -datafileDestination "/u01/app/oradata"                                        \
     -redoLogFileSize 60                                                       \
     -emConfiguration NONE                                                     \
     -ignorePreReqs
Prepare for db operation
8% complete
Copying database files
31% complete
Creating and starting Oracle instance
32% complete
36% complete
39% complete
42% complete
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
 /u01/app/oracle/cfgtoollogs/dbca/ORCLCDB.
Database Information:
Global Database Name:ORCLCDB
System Identifier(SID):ORCLCDB
Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/ORCLCDB/ORCLCDB.log" for further details.
[oracle@db23ai ~]$ 


sqlplus system/SysPassword1@localhost/pdb1

curl -L# https://github.com/oracle-samples/db-sample-schemas/archive/refs/tags/v23.3.tar.gz | tar xzf - -C "/home/oracle"

wget https://github.com/oracle-samples/db-sample-schemas/archive/refs/tags/v23.3.tar.gz

https://github.com/oracle-samples/db-sample-schemas/releases
The new and improved Oracle Database 23c Sample Schemas contain several improvements:

All active data sets have been refreshed
Order Entry (OE) has been archived
Product Media (PM) has been archived
Schemas are installed independently from each other
SYS/SYSTEM user account access is no longer required
SQL*Loader is no longer required

tar -zxvf db-sample-schemas-23.3.tar.gz
cd /home/oracle/db-sample-schemas-23.3

cd $ORACLE_HOME/demo/schema
perl -p -i.bak -e 's#__SUB__CWD__#'$(pwd)'#g' */*.sql */*.dat

[oracle@db23ai ~]$ cp -R db-sample-schemas-23.3/* $ORACLE_HOME/demo/schema/
[oracle@db23ai ~]$ cd $ORACLE_HOME/demo/schema
[oracle@db23ai schema]$ perl -p -i.bak -e 's#__SUB__CWD__#'$(pwd)'#g' */*.sql */*.dat
[oracle@db23ai schema]$ ls -tlr
total 40
drwxr-xr-x. 2 oracle oinstall 4096 May 27 20:15 log
-rw-r--r--. 1 oracle oinstall 1094 Jul 31 16:44 LICENSE.txt
-rw-r--r--. 1 oracle oinstall 3613 Jul 31 16:44 README.txt
-rw-r--r--. 1 oracle oinstall 3784 Jul 31 16:44 README.md
-rw-r--r--. 1 oracle oinstall 1737 Jul 31 16:44 SECURITY.md
drwxr-xr-x. 2 oracle oinstall 4096 Jul 31 16:44 customer_orders
drwxr-xr-x. 2 oracle oinstall 4096 Jul 31 16:44 human_resources
drwxr-xr-x. 2 oracle oinstall 4096 Jul 31 16:44 sales_history
drwxr-xr-x. 2 oracle oinstall 4096 Jul 31 16:44 product_media
drwxr-xr-x. 3 oracle oinstall 4096 Jul 31 16:44 order_entry
[oracle@db23ai schema]$ 


cd $ORACLE_HOME/demo/schema/customer_orders
sqlplus system/SysPassword1@//localhost:1521/pdb1
@co_install.sql

cd $ORACLE_HOME/demo/schema/human_resources
sqlplus system/SysPassword1@//localhost:1521/pdb1
@hr_install.sql

cd $ORACLE_HOME/demo/schema/sales_history
sqlplus system/SysPassword1@//localhost:1521/pdb1
@sh_install.sql

The order entry installation is already silent. It requires several arguments to be specified, as shown here.
cd $ORACLE_HOME/demo/schema/order_entry
sqlplus system/SysPassword1@//localhost:1521/pdb1
@oe_main.sql oe users temp hr_password SysPassword1 $ORACLE_HOME/demo/schema/order_entry/ /tmp/ v3 localhost:1521/pdb1

cd $ORACLE_HOME/demo/schema/product_media
sqlplus system/SysPassword1@//localhost:1521/pdb1
@pm_main.sql pm users temp oe SysPassword1 $ORACLE_HOME/demo/schema/product_media/ /tmp/ $ORACLE_HOME/demo/schema/product_media/ localhost:1521/pdb1

select owner,object_type,count(1) from dba_objects where owner in ('CO','HR','SH','OE','PM') group by owner,object_type order by 1;
```

sample schema:
```
SQL> show pdbs

   CON_ID CON_NAME    OPENMODE      RESTRICTED    
_________ ___________ _____________ _____________ 
        2 PDB$SEED    READ ONLY     NO            
        3 PDB1        READ WRITE    NO            
SQL> alter session set container=pdb1;

Session altered.

SQL> select owner,object_type,count(1) from dba_objects where owner in ('CO','HR','SH','OE','PM') group by owner,object_type order by 1,2;

OWNER    OBJECT_TYPE             COUNT(1) 
________ ____________________ ___________ 
CO       INDEX                         21 
CO       LOB                            3 
CO       SEQUENCE                       6 
CO       TABLE                          7 
CO       VIEW                           4 
HR       INDEX                         19 
HR       PROCEDURE                      2 
HR       SEQUENCE                       3 
HR       TABLE                          7 
HR       TRIGGER                        2 
HR       VIEW                           1 
OE       FUNCTION                       1 
OE       INDEX                         48 
OE       LOB                           15 
OE       SEQUENCE                       1 
OE       SYNONYM                        6 
OE       TABLE                         14 
OE       TRIGGER                        4 
OE       TYPE                          37 
OE       TYPE BODY                      3 
OE       VIEW                          11 
PM       INDEX                         10 
PM       LOB                            7 
PM       TABLE                          2 
PM       TYPE                           3 
SH       DIMENSION                      5 
SH       INDEX                         33 
SH       INDEX PARTITION              115 
SH       LOB                            1 
SH       MATERIALIZED VIEW              2 
SH       TABLE                         18 
SH       TABLE PARTITION               35 
SH       VIEW                           1 

33 rows selected. 

SQL> 
```

### Referece

[1 Oracle Database Installation Checklist](https://docs.oracle.com/en/database/oracle/oracle-database/23/ladbi/oracle-database-installation-checklist.html)

[Oracle Database 19c Installation On Oracle Linux 7 (OL7)](https://oracle-base.com/articles/19c/oracle-db-19c-installation-on-oracle-linux-7)


Have a good work&life! 2024/07 via LinHong


