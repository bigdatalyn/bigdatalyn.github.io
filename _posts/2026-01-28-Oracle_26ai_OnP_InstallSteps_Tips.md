---
layout: post
title: "Oracle 26ai 23.26.1 OnP Install Tips"
category: Oracle
tags: Oracle 26ai Tips
---

* content
{:toc}

Oracle AI Database 26ai

### About Oracle AI Database 26ai

Oracle AI Database 26ai (23.26.1) Enterprise Edition for Linux x86-64 will be officially available at 9am PT today. 

These software download locations will display links for this release at that time:

- [get-started](https://www.oracle.com/database/free/get-started/)

- [edelivery](https://edelivery.oracle.com)

- [oracle-database-software-downloads](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html)

- [oracle26ai-linux-downloads](https://www.oracle.com/database/technologies/oracle26ai-linux-downloads.html)

- [instant-client](https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html)

An announcement blog post GA of Oracle AI Database 26ai for Linux x86-64 on-premises platforms:

- [announcement blog](https://blogs.oracle.com/database/?p=3837)

V1054592-01.zip

![ords]({{ "/files/Oracle/26ai/20260127_download.jpg"}})	

### Install 26ai 

[Database Installation Guide for Linux](https://docs.oracle.com/en/database/oracle/oracle-database/26/ladbi/index.html)

Verify Your System:

```
cat /etc/redhat-release
uname -r

[root@onp26ai ~]# cat /etc/redhat-release
Red Hat Enterprise Linux release 9.6 (Plow)
[root@onp26ai ~]# uname -r
6.12.0-105.51.5.el9uek.x86_64
[root@onp26ai ~]# 
```

Installing Oracle Oracle AI Database Preinstallation RPM Using the Oracle Linux yum Server

```
dnf install oracle-ai-database-preinstall-26ai

[root@onp26ai ~]# id oracle
uid=54321(oracle) gid=54321(oinstall) groups=54321(oinstall),54322(dba),54323(oper),54324(backupdba),54325(dgdba),54326(kmdba),54330(racdba)
[root@onp26ai ~]# 

Group Purposes:

oinstall: Oracle Inventory group (primary)
dba: Database Administrator (SYSDBA)
oper: Database Operator (SYSOPER)
backupdba: Backup and Recovery (SYSBACKUP)
dgdba: Data Guard (SYSDG)
kmdba: Encryption Key Management (SYSKM)
racdba: Real Application Clusters


dnf install -y \
  bc \
  binutils \
  compat-openssl11 \
  elfutils-libelf \
  fontconfig \
  glibc \
  glibc-devel \
  glibc-headers \
  ksh \
  libaio \
  libasan \
  liblsan \
  libX11 \
  libXau \
  libXi \
  libXrender \
  libXtst \
  libxcrypt-compat \
  libgcc \
  libibverbs \
  librdmacm \
  libstdc++ \
  libxcb \
  libvirt-libs \
  make \
  policycoreutils \
  policycoreutils-python-utils \
  smartmontools \
  sysstat
```

Configure kernel resource limits for the oracle user:
```
tee -a /etc/security/limits.conf << 'EOF'
# Oracle Database resource limits
oracle soft nofile 1024
oracle hard nofile 65536
oracle soft nproc 2047
oracle hard nproc 16384
oracle soft stack 10240
oracle hard stack 32768
oracle soft memlock 28835840
oracle hard memlock 28835840
EOF

Limit Explanations:

nofile: Maximum number of open file descriptors
nproc: Maximum number of processes
stack: Maximum stack size (KB)
memlock: Maximum locked memory (KB)
```

Create Directory Structure
```
# Create directories as root
sudo mkdir -p /u01/app/oracle
sudo mkdir -p /u01/app/oraInventory

# Set ownership
sudo chown -R oracle:oinstall /u01/app/oracle
sudo chown -R oracle:oinstall /u01/app/oraInventory

# Set permissions
sudo chmod -R 775 /u01/app

/u01/app/oracle: Oracle Base directory
/u01/app/oraInventory: Oracle Inventory location
/u01/stage: Staging area for installation files
```

Upload and Extract Installation Files

```
# Switch to oracle user
sudo su - oracle

# Create Oracle Home directory
mkdir -p /u01/app/oracle/product/23.0.0/dbhome_1

# Navigate to Oracle Home
cd /u01/app/oracle/product/23.0.0/dbhome_1

unzip -q /tmp/db_home.zip
```

Unzip Install file logs:
```
[root@onp26ai tmp]# su - oracle
[oracle@onp26ai ~]$ cd /u01/app/oracle/product/23.0.0/dbhome_1
[oracle@onp26ai ~]$ mkdir -p /u01/app/oracle/product/23.0.0/dbhome_1
[oracle@onp26ai ~]$ cd /u01/app/oracle/product/23.0.0/dbhome_1
[oracle@onp26ai dbhome_1]$ unzip -q /tmp/V1054592-01.zip 
```

Run Silent Installation(password: welcome1)
Execute the Oracle installer in silent mode to install software and create the database:
```
./runInstaller -silent -createDatabase \
  -OSDBA dba \
  -OSBACKUPDBA backupdba \
  -OSDGDBA dgdba \
  -OSKMDBA kmdba \
  -OSRACDBA racdba \
  -OSOPER oper \
  -installEdition EE \
  -ORACLE_BASE /u01/app/oracle \
  -dataLocation /u01/app/oracle/oradata \
  -gdbName orclcdb.example.com \
  -pdbName pdb1 \
  -dbSID orclcdb \
  -memoryLimit 4000 \
  -INVENTORY_LOCATION /u01/app/oraInventory \
  -useSamePasswordForAllSchemas \
  -ignorePrereq

Installation Parameters:

-createDatabase: Creates database during installation
-installEdition EE: Enterprise Edition
-gdbName: Global database name (CDB)
-pdbName: Pluggable database name
-dbSID: System identifier
-memoryLimit: Memory in MB (4000 = 4 GB)
-useSamePasswordForAllSchemas: Simplifies password management
-ignorePrereq: Bypasses prerequisite checks (use cautiously)
```

Logs:
```
[oracle@onp26ai dbhome_1]$ ./runInstaller -silent -createDatabase \
  -OSDBA dba \
  -OSBACKUPDBA backupdba \
  -OSDGDBA dgdba \
  -OSKMDBA kmdba \
  -OSRACDBA racdba \
  -OSOPER oper \
  -installEdition EE \
  -ORACLE_BASE /u01/app/oracle \
  -dataLocation /u01/app/oracle/oradata \
  -gdbName orclcdb.example.com \
  -pdbName pdb1 \
  -dbSID orclcdb \
  -memoryLimit 4000 \
  -INVENTORY_LOCATION /u01/app/oraInventory \
  -useSamePasswordForAllSchemas \
  -ignorePrereq
Launching Oracle AI Database Setup Wizard...

Enter ALLSCHEMA password: 

Confirm password: 

[WARNING] [INS-30011] The ADMIN password entered does not conform to the Oracle recommended standards.
   CAUSE: Oracle recommends that the password entered should be at least 8 characters in length, contain at least 1 uppercase character, 1 lower case character and 1 digit [0-9].
   ACTION: Provide a password that conforms to the Oracle recommended standards.
[WARNING] [INS-13014] Target environment does not meet some optional requirements.
   CAUSE: Some of the optional prerequisites are not met. See logs for details. installActions2026-01-28_03-09-58AM.log.
   ACTION: Identify the list of failed prerequisite checks from the log: installActions2026-01-28_03-09-58AM.log. Then either from the log file or from installation manual find the appropriate configuration to meet the prerequisites and fix it manually.
The response file for this session can be found at:
 /u01/app/oracle/product/23.0.0/dbhome_1/install/response/db_2026-01-28_03-09-58AM.rsp

You can find the log of this install session at:
 /tmp/InstallActions2026-01-28_03-09-58AM/installActions2026-01-28_03-09-58AM.log

As a root user, run the following script(s):
	1. /u01/app/oraInventory/orainstRoot.sh
	2. /u01/app/oracle/product/23.0.0/dbhome_1/root.sh

Run /u01/app/oraInventory/orainstRoot.sh on the following nodes: 
[onp26ai]
Run /u01/app/oracle/product/23.0.0/dbhome_1/root.sh on the following nodes: 
[onp26ai]


Successfully Setup Software with warning(s).
Run the 'runInstaller -executeConfigTools' command to complete the configuration.


Moved the install session logs to:
 /u01/app/oraInventory/logs/InstallActions2026-01-28_03-09-58AM
[oracle@onp26ai dbhome_1]$ cd /u01/app/oraInventory/logs/InstallActions2026-01-28_03-09-58AM
[oracle@onp26ai InstallActions2026-01-28_03-09-58AM]$ ls -tlr
total 9124
-rw-r-----. 1 oracle oinstall     129 Jan 28 03:11 installerPatchActions_2026-01-28_03-09-58AM.log
-rw-r-----. 1 oracle oinstall 7402703 Jan 28 03:11 installActions2026-01-28_03-09-58AM.log
-rw-r-----. 1 oracle oinstall   68632 Jan 28 03:11 time2026-01-28_03-09-58AM.log
-rw-r-----. 1 oracle oinstall     131 Jan 28 03:11 oraInstall2026-01-28_03-09-58AM.out
-rw-r-----. 1 oracle oinstall       0 Jan 28 03:11 oraInstall2026-01-28_03-09-58AM.err
-rw-r-----. 1 oracle oinstall 1857042 Jan 28 03:11 installActions2026-01-28_03-09-58AM.out
-rw-r-----. 1 oracle oinstall       0 Jan 28 03:11 installActions2026-01-28_03-09-58AM.err
[oracle@onp26ai InstallActions2026-01-28_03-09-58AM]$ 
```


Execute Root Scripts:After installation completes, run the required root scripts as indicated by the installer:
```
# Exit oracle user session
exit

# Run as root
sudo /u01/app/oraInventory/orainstRoot.sh
sudo /u01/app/oracle/product/23.0.0/dbhome_1/root.sh


[root@onp26ai tmp]# sudo /u01/app/oraInventory/orainstRoot.sh
Changing permissions of /u01/app/oraInventory.
Adding read,write permissions for group.
Removing read,write,execute permissions for world.

Changing groupname of /u01/app/oraInventory to oinstall.
The execution of the script is complete.
[root@onp26ai tmp]# sudo /u01/app/oracle/product/23.0.0/dbhome_1/root.sh
Check /u01/app/oracle/product/23.0.0/dbhome_1/install/root_onp26ai_2026-01-28_03-13-38-738909472.log for the output of root script
[root@onp26ai tmp]# 
```

Configure Network and Database(password: welcome1)

It will:
- Run NETCA (Network Configuration Assistant) to create the listener
- Run DBCA (Database Configuration Assistant) to create the database

`executeConfigTools`: Runs NETCA and DBCA automatically (The -executeConfigTools flag can only be used for an Oracle home software that has been already installed using the configure or upgrade options. Ensure that the orainstRoot.sh script, from the inventory location, has been run.)

```
# Switch back to oracle user
sudo su - oracle

# Navigate to Oracle Home
cd /u01/app/oracle/product/23.0.0/dbhome_1

# Run configuration tools
./runInstaller -silent \
  -useSamePasswordForAllSchemas \
  -executeConfigTools

```


```
[oracle@onp26ai dbhome_1]$ ./runInstaller -silent \
  -useSamePasswordForAllSchemas \
  -executeConfigTools
Launching Oracle AI Database Setup Wizard...

Enter ALLSCHEMA password: 

Confirm password: 

[WARNING] [INS-30011] The ADMIN password entered does not conform to the Oracle recommended standards.
   CAUSE: Oracle recommends that the password entered should be at least 8 characters in length, contain at least 1 uppercase character, 1 lower case character and 1 digit [0-9].
   ACTION: Provide a password that conforms to the Oracle recommended standards.
You can find the logs of this session at:
/u01/app/oraInventory/logs/InstallActions2026-01-28_03-14-36AM

[ Start ] NETCA - 2026-01-28 03:14:46.796
Command: /bin/sh -c /u01/app/oracle/product/23.0.0/dbhome_1/bin/netca /orahome /u01/app/oracle/product/23.0.0/dbhome_1 /instype typical /inscomp client,oraclenet,javavm,server,ano /insprtcl tcp /cfg local /authadp NO_VALUE /responseFile /u01/app/oracle/product/23.0.0/dbhome_1/network/install/netca_typ.rsp /silent  /orahnam OraDB23Home1  /ouiinternal

Parsing command line arguments:
    Parameter "orahome" = /u01/app/oracle/product/23.0.0/dbhome_1
    Parameter "instype" = typical
    Parameter "inscomp" = client,oraclenet,javavm,server,ano
    Parameter "insprtcl" = tcp
    Parameter "cfg" = local
    Parameter "authadp" = NO_VALUE
    Parameter "responsefile" = /u01/app/oracle/product/23.0.0/dbhome_1/network/install/netca_typ.rsp
    Parameter "silent" = true
    Parameter "orahnam" = OraDB23Home1
    Parameter "ouiinternal" = true
Done parsing command line arguments.
Oracle Net Services Configuration:
Profile configuration complete.
Oracle Net Listener Startup:
    Running Listener Control: 
      /u01/app/oracle/product/23.0.0/dbhome_1/bin/lsnrctl start LISTENER
    Listener Control complete.
    Listener started successfully.
Listener configuration complete.
Oracle Net Services configuration successful. The exit code is 0
[ Exit Code ] 0
[ End ] NETCA - 2026-01-28 03:14:47.911

[ Start ] DBCA - 2026-01-28 03:14:47.962
Command: /bin/sh -c /u01/app/oracle/product/23.0.0/dbhome_1/bin/dbca -silent -createDatabase -templateName General_Purpose.dbc -createAsContainerDatabase true -pdbName pdb1 -numberOfPDBs 1 -sid orclcdb -gdbName orclcdb.example.com -emConfiguration NONE -storageType FS -datafileDestination /u01/app/oracle/oradata -datafileJarLocation /u01/app/oracle/product/23.0.0/dbhome_1/assistants/dbca/templates -characterset AL32UTF8 -obfuscatedPasswords false -recoveryAreaDestination NONE -automaticMemoryManagement false -totalMemory 4000 -maskPasswords false -ignorePrereqFailure -skipEnforcePasswordComplexityCheck true   -oui_internal
SYS_PASSWORD_PROMPT
SYSTEM_PASSWORD_PROMPT
PDB_ADMIN_PASSWORD_PROMPT
[WARNING] [DBT-06208] The 'SYS' password entered does not conform to the Oracle recommended standards.
   CAUSE: 
a. Oracle recommends that the password entered should be at least 8 characters in length, contain at least 1 uppercase character, 1 lower case character and 1 digit [0-9].
b.The password entered is a keyword that Oracle does not recommend to be used as password
   ACTION: Specify a strong password. If required refer Oracle documentation for guidelines.
[WARNING] [DBT-06208] The 'SYSTEM' password entered does not conform to the Oracle recommended standards.
   CAUSE: 
a. Oracle recommends that the password entered should be at least 8 characters in length, contain at least 1 uppercase character, 1 lower case character and 1 digit [0-9].
b.The password entered is a keyword that Oracle does not recommend to be used as password
   ACTION: Specify a strong password. If required refer Oracle documentation for guidelines.
[WARNING] [DBT-06208] The 'PDBADMIN' password entered does not conform to the Oracle recommended standards.
   CAUSE: 
a. Oracle recommends that the password entered should be at least 8 characters in length, contain at least 1 uppercase character, 1 lower case character and 1 digit [0-9].
b.The password entered is a keyword that Oracle does not recommend to be used as password
   ACTION: Specify a strong password. If required refer Oracle documentation for guidelines.
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
 /u01/app/oracle/cfgtoollogs/dbca/orclcdb.
Database Information:
Global Database Name:orclcdb.example.com
System Identifier(SID):orclcdb
Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/orclcdb/orclcdb.log" for further details.
Successfully Configured Software.
[ Exit Code ] 0
[ End ] DBCA - 2026-01-28 03:18:57.414

[oracle@onp26ai dbhome_1]$ 
```

Set Environment Variables
```
# Switch to oracle user
sudo su - oracle

# Edit .bash_profile
cat >> ~/.bash_profile << 'EOF'

# Oracle Environment
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=/u01/app/oracle/product/23.0.0/dbhome_1
export ORACLE_SID=orclcdb
export PATH=$ORACLE_HOME/bin:$PATH
export LD_LIBRARY_PATH=$ORACLE_HOME/lib:$LD_LIBRARY_PATH
EOF

# Apply changes
source ~/.bash_profile
```

Verify Installation and connection.
```
[oracle@onp26ai ~]$ $ORACLE_HOME/OPatch/opatch lspatches
38743688;OCW RELEASE UPDATE 23.26.1.0.0 (GOLD IMAGE) (38743688) Gold Image
38743669;Database Release Update : 23.26.1.0.0 (38743669) Gold Image

OPatch succeeded.
[oracle@onp26ai ~]$ 
[oracle@onp26ai ~]$ sql system/welcome1@localhost/pdb1.example.com

SQLcl: Release 25.4 Production on Wed Jan 28 03:28:39 2026

Copyright (c) 1982, 2026, Oracle.  All rights reserved.

Last Successful login time: Wed Jan 28 2026 03:28:39 +00:00

Connected to:
Oracle AI Database 26ai Enterprise Edition Release 23.26.1.0.0 - Production
Version 23.26.1.0.0

SQL> select banner from v$version;

BANNER                                                                         
______________________________________________________________________________ 
Oracle AI Database 26ai Enterprise Edition Release 23.26.1.0.0 - Production    

SQL> exit
[oracle@onp26ai ~]$ sqlplus system/welcome1@localhost/pdb1.example.com

SQL*Plus: Release 23.26.1.0.0 - Production on Wed Jan 28 03:29:39 2026
Version 23.26.1.0.0

Copyright (c) 1982, 2025, Oracle.  All rights reserved.

Last Successful login time: Wed Jan 28 2026 03:28:39 +00:00

Connected to:
Oracle AI Database 26ai Enterprise Edition Release 23.26.1.0.0 - Production
Version 23.26.1.0.0

SQL> exit
Disconnected from Oracle AI Database 26ai Enterprise Edition Release 23.26.1.0.0 - Production
Version 23.26.1.0.0
[oracle@onp26ai ~]$ 
```

Automatic Startup Setting(Change the field from `N` to `Y`:)
```
vi /etc/oratab

[root@onp26ai ~]# cat /etc/oratab | tail -1
orclcdb:/u01/app/oracle/product/23.0.0/dbhome_1:Y
[root@onp26ai ~]# 

tee /etc/systemd/system/oracle-database-orclcdb.service << 'EOF'
[Unit]
Description=Oracle Database Service
After=network.target

[Service]
Type=forking
User=oracle
Group=oinstall
Environment="ORACLE_HOME=/u01/app/oracle/product/23.0.0/dbhome_1"
Environment="ORACLE_SID=orclcdb"
Environment="PATH=/u01/app/oracle/product/23.0.0/dbhome_1/bin:/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin"
Environment="LD_LIBRARY_PATH=/u01/app/oracle/product/23.0.0/dbhome_1/lib"
ExecStart=/bin/bash /u01/app/oracle/product/23.0.0/dbhome_1/bin/dbstart /u01/app/oracle/product/23.0.0/dbhome_1
ExecStop=/bin/bash /u01/app/oracle/product/23.0.0/dbhome_1/bin/dbshut /u01/app/oracle/product/23.0.0/dbhome_1
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

# Enable the service
sudo systemctl daemon-reload
sudo systemctl enable oracle-database-orclcdb.service

# Test
systemctl stop oracle-database-orclcdb
systemctl start oracle-database-orclcdb

[root@onp26ai ~]# systemctl stop oracle-database-orclcdb
[root@onp26ai ~]# ps -ef | grep smon
root       68285   10400  0 03:42 pts/0    00:00:00 grep --color=auto smon
[root@onp26ai ~]# systemctl start oracle-database-orclcdb
[root@onp26ai ~]# ps -ef | grep smon
oracle     68459       1  0 03:42 ?        00:00:00 ora_smon_orclcdb
root       68885   10400  0 03:42 pts/0    00:00:00 grep --color=auto smon
[root@onp26ai ~]# 
```



Others Setting:
Setting timezone:
```
timedatectl list-timezones
timedatectl list-timezones | grep -i shang
timedatectl set-timezone Asia/Shanghai
```
Setting firewalld:
```
systemctl stop firewalld
systemctl disable firewalld
```
Setting SELINUX:
```
sed -i -e "s|SELINUX=enforcing|SELINUX=permissive|g" /etc/selinux/config
setenforce permissive
```
Setting oracle user password:
```
echo oracle:"$ORACLE_PASSWORD" | sudo chpasswd

echo oracle:"welcome1" | sudo chpasswd
```
Setting Save PDB state:
```
SQL> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 PDB1 			  MOUNTED
SQL> alter pluggable database all open;

Pluggable database altered.

SQL> alter pluggable database all save state;

Pluggable database altered.

SQL> 
```


### Good Day

Have a good work&life! 2026/01 via LinHong
