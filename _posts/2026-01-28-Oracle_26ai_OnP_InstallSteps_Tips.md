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

Install Version:

![ords]({{ "/files/Oracle/26ai/oracle_23.26.png"}})	








### Install 26ai Tips

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

unzip -q /tmp/V1054592-01.zip
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

### Oracle AI Database(show parameter)

`show parameter` value as below.
```
SQL> show parameter
NAME  TYPE        VALUE  
--------------------------------------------- ----------- -------------------------------------------------------------------------------------------- 
DBFIPS_140                                    boolean     FALSE  
_instance_recovery_bloom_filter_size          integer     1048576      
adg_account_info_tracking                     string      LOCAL  
adg_redirect_dml                              boolean     FALSE  
alert_log_max_size                            big integer 1000M  
allow_global_dblinks                          boolean     FALSE  
allow_group_access_to_sga                     boolean     FALSE  
allow_legacy_reco_protocol                    boolean     TRUE   
allow_rowid_column_type                       boolean     FALSE  
allow_weak_crypto                             boolean     TRUE   
approx_for_aggregation                        boolean     FALSE  
approx_for_count_distinct                     boolean     FALSE  
approx_for_percentile                         string      NONE   
aq_tm_processes                               integer     1      
archive_lag_target                            integer     0      
asm_diskstring                                string             
asm_preferred_read_failure_groups             string             
audit_file_dest                               string      /u01/app/oracle/product/23.0.0/dbhome_1/rdbms/audit  
audit_sys_operations                          boolean     FALSE  
audit_syslog_level                            string             
audit_trail                                   string      NONE   
auto_start_pdb_services                       boolean     FALSE  
autotask_max_active_pdbs                      integer     2      
awr_pdb_autoflush_enabled                     boolean     TRUE   
awr_pdb_max_parallel_slaves                   integer     10     
awr_snapshot_time_offset                      integer     0      
background_core_dump                          string      partial      
background_dump_dest                          string      /u01/app/oracle/product/23.0.0/dbhome_1/rdbms/log    
backup_tape_io_slaves                         boolean     FALSE  
bitmap_merge_area_size                        integer     1048576      
blank_trimming                                boolean     FALSE  
blockchain_table_max_no_drop                  integer            
blockchain_table_retention_threshold          integer     16     
buffer_pool_keep                              string             
buffer_pool_recycle                           string             
calendar_fiscal_year_start                    string             
cdb_cluster                                   boolean     FALSE  
cdb_cluster_name                              string             
cell_offload_compaction                       string      ADAPTIVE     
cell_offload_decryption                       boolean     TRUE   
cell_offload_parameters                       string             
cell_offload_plan_display                     string      AUTO   
cell_offload_processing                       boolean     TRUE   
cell_offloadgroup_name                        string             
circuits                                      integer            
client_prefetch_rows                          integer     0      
client_result_cache_lag                       big integer 3000   
client_result_cache_size                      big integer 0      
client_statistics_level                       string      TYPICAL      
clonedb                                       boolean     FALSE  
clonedb_dir                                   string             
cloud_table_commit_threshold                  integer     0      
cluster_database                              boolean     FALSE  
cluster_interconnects                         string             
commit_logging                                string             
commit_point_strength                         integer     1      
commit_wait                                   string             
commit_write                                  string             
common_user_prefix                            string      C##    
compatible                                    string      23.6.0       
connection_brokers                            string      ((TYPE=DEDICATED)(BROKERS=2)(CONNECTIONS=2000)), ((TYPE=EMON)(BROKERS=1))                    
container_data                                string      ALL    
containers_parallel_degree                    integer     65535  
control_file_record_keep_time                 integer     7      
control_files                                 string      /u01/app/oracle/oradata/ORCLCDB/control01.ctl, /u01/app/oracle/oradata/ORCLCDB/control02.ctl 
control_management_pack_access                string      DIAGNOSTIC+TUNING
core_dump_dest                                string      /u01/app/oracle/diag/rdbms/orclcdb/orclcdb/cdump     
cpu_count                                     string      4      
cpu_min_count                                 string      4      
create_bitmap_area_size                       integer     8388608      
create_stored_outlines                        string             
cursor_bind_capture_destination               string      memory+disk
cursor_invalidation                           string      IMMEDIATE    
cursor_sharing                                string      EXACT  
cursor_space_for_time                         boolean     FALSE  
data_guard_max_io_time                        integer     240    
data_guard_max_longio_time                    integer     240    
data_guard_sync_latency                       integer     0      
data_transfer_cache_size                      big integer 0      
db_16k_cache_size                             big integer 0      
db_2k_cache_size                              big integer 0      
db_32k_cache_size                             big integer 0      
db_4k_cache_size                              big integer 0      
db_8k_cache_size                              big integer 0      
db_big_table_cache_percent_target             string      0      
db_block_buffers                              integer     0      
db_block_checking                             string      FALSE  
db_block_checksum                             string      TYPICAL      
db_block_size                                 integer     8192   
db_cache_advice                               string      ON     
db_cache_size                                 big integer 0      
db_create_file_dest                           string             
db_create_online_log_dest_1                   string             
db_create_online_log_dest_2                   string             
db_create_online_log_dest_3                   string             
db_create_online_log_dest_4                   string             
db_create_online_log_dest_5                   string             
db_domain                                     string      example.com
db_file_multiblock_read_count                 integer     128    
db_file_name_convert                          string             
db_files                                      integer     200    
db_flash_cache_file                           string             
db_flash_cache_size                           big integer 0      
db_flashback_log_dest                         string             
db_flashback_log_dest_size                    big integer 0      
db_flashback_retention_target                 integer     1440   
db_index_compression_inheritance              string      NONE   
db_keep_cache_size                            big integer 0      
db_lost_write_protect                         string      AUTO   
db_name                                       string      orclcdb      
db_performance_profile                        string             
db_recovery_auto_rekey                        string      ON     
db_recovery_file_dest                         string             
db_recovery_file_dest_size                    big integer 0      
db_recycle_cache_size                         big integer 0      
db_securefile                                 string      PREFERRED    
db_ultra_safe                                 string      OFF    
db_unique_name                                string      orclcdb      
db_unrecoverable_scn_tracking                 boolean     TRUE   
db_writer_processes                           integer     1      
dbnest_enable                                 string      NONE   
dbnest_pdb_fs_conf                            string             
dbwr_io_slaves                                integer     0      
ddl_lock_timeout                              integer     0      
debug_log_max_size                            big integer 1000M  
default_credential                            string             
default_sharing                               string      metadata     
deferred_segment_creation                     boolean     TRUE   
dg_broker_config_file1                        string      /u01/app/oracle/product/23.0.0/dbhome_1/dbs/dr1orclcdb.dat                                   
dg_broker_config_file2                        string      /u01/app/oracle/product/23.0.0/dbhome_1/dbs/dr2orclcdb.dat                                   
dg_broker_start                               boolean     FALSE  
diagnostic_dest                               string      /u01/app/oracle
diagnostics_control                           string      IGNORE       
directory_prefixes_allowed                    string             
disable_pdb_feature                           big integer 0      
disk_asynch_io                                boolean     TRUE   
dispatchers                                   string      (PROTOCOL=TCP) (SERVICE=orclcdbXDB)
distributed_lock_timeout                      integer     60     
dml_locks                                     integer     2216   
dnfs_batch_size                               integer     4096   
drcp_connection_limit                         integer     0      
drcp_dedicated_opt                            string      NO     
dst_upgrade_insert_conv                       boolean     TRUE   
enable_automatic_maintenance_pdb              boolean     TRUE   
enable_ddl_logging                            boolean     FALSE  
enable_dnfs_dispatcher                        boolean     FALSE  
enable_goldengate_replication                 boolean     FALSE  
enable_imc_with_mira                          boolean     FALSE  
enable_per_pdb_drcp                           boolean     FALSE  
enable_pluggable_database                     boolean     TRUE   
enabled_PDBs_on_standby                       string      *      
encrypt_new_tablespaces                       string      CLOUD_ONLY
error_message_details                         string      ON     
event                                         string             
external_keystore_credential_location         string             
fal_client                                    string             
fal_server                                    string             
fast_start_io_target                          integer     0      
fast_start_mttr_target                        integer     0      
fast_start_parallel_rollback                  string      LOW    
file_mapping                                  boolean     FALSE  
fileio_network_adapters                       string             
filesystemio_options                          string      none   
fixed_date                                    string             
forward_listener                              string             
gcs_server_processes                          integer     0      
global_names                                  boolean     FALSE  
global_txn_processes                          integer     1      
group_by_position_enabled                     boolean     FALSE  
hash_area_size                                integer     131072       
heartbeat_batch_size                          integer     5      
heat_map                                      string      OFF    
hi_shared_memory_address                      integer     0      
hs_autoregister                               boolean     TRUE   
http_proxy                                    string             
hybrid_read_only                              boolean     FALSE  
identity_provider_config                      string             
identity_provider_type                        string      NONE   
ifile                                         file               
ignore_session_set_param_errors               string             
inmemory_adg_enabled                          boolean     TRUE   
inmemory_automatic_level                      string      OFF    
inmemory_clause_default                       string             
inmemory_deep_vectorization                   boolean     TRUE   
inmemory_expressions_usage                    string      ENABLE       
inmemory_force                                string      DEFAULT      
inmemory_graph_algorithm_execution            string      DEFAULT      
inmemory_max_populate_servers                 integer     0      
inmemory_optimized_arithmetic                 string      DISABLE      
inmemory_optimized_date                       string      DISABLE      
inmemory_prefer_xmem_memcompress              string             
inmemory_prefer_xmem_priority                 string             
inmemory_query                                string      ENABLE       
inmemory_size                                 big integer 0      
inmemory_trickle_repopulate_servers_percent   integer     1      
inmemory_virtual_columns                      string      MANUAL       
inmemory_xmem_size                            big integer 0      
instance_abort_delay_time                     integer     0      
instance_groups                               string             
instance_mode                                 string      READ-WRITE
instance_name                                 string      orclcdb      
instance_number                               integer     0      
instance_type                                 string      RDBMS  
instant_restore                               boolean     FALSE  
iorm_limit_policy                             string      RM_PLAN      
ipddb_enable                                  boolean     FALSE  
java_jit_enabled                              boolean     TRUE   
java_max_sessionspace_size                    integer     0      
java_pool_size                                big integer 0      
java_restrict                                 string      none   
java_soft_sessionspace_limit                  integer     0      
job_queue_processes                           integer     80     
json_behavior                                 string             
json_expression_check                         string      off    
kafka_config_file                             string             
large_pool_size                               big integer 0      
ldap_directory_access                         string      NONE   
ldap_directory_sysauth                        string      no     
license_max_sessions                          integer     0      
license_max_users                             integer     0      
license_sessions_warning                      integer     0      
listener_networks                             string             
load_without_compile                          string      none   
lob_signature_enable                          boolean     FALSE  
local_listener                                string      LISTENER_ORCLCDB
lock_name_space                               string             
lock_sga                                      boolean     FALSE  
lockdown_errors                               string      RAISE  
lockfree_reservation                          string      ON     
log_archive_config                            string             
log_archive_dest                              string             
log_archive_dest_1                            string             
log_archive_dest_10                           string             
log_archive_dest_11                           string             
log_archive_dest_12                           string             
log_archive_dest_13                           string             
log_archive_dest_14                           string             
log_archive_dest_15                           string             
log_archive_dest_16                           string             
log_archive_dest_17                           string             
log_archive_dest_18                           string             
log_archive_dest_19                           string             
log_archive_dest_2                            string             
log_archive_dest_20                           string             
log_archive_dest_21                           string             
log_archive_dest_22                           string             
log_archive_dest_23                           string             
log_archive_dest_24                           string             
log_archive_dest_25                           string             
log_archive_dest_26                           string             
log_archive_dest_27                           string             
log_archive_dest_28                           string             
log_archive_dest_29                           string             
log_archive_dest_3                            string             
log_archive_dest_30                           string             
log_archive_dest_31                           string             
log_archive_dest_4                            string             
log_archive_dest_5                            string             
log_archive_dest_6                            string             
log_archive_dest_7                            string             
log_archive_dest_8                            string             
log_archive_dest_9                            string             
log_archive_dest_state_1                      string      enable       
log_archive_dest_state_10                     string      enable       
log_archive_dest_state_11                     string      enable       
log_archive_dest_state_12                     string      enable       
log_archive_dest_state_13                     string      enable       
log_archive_dest_state_14                     string      enable       
log_archive_dest_state_15                     string      enable       
log_archive_dest_state_16                     string      enable       
log_archive_dest_state_17                     string      enable       
log_archive_dest_state_18                     string      enable       
log_archive_dest_state_19                     string      enable       
log_archive_dest_state_2                      string      enable       
log_archive_dest_state_20                     string      enable       
log_archive_dest_state_21                     string      enable       
log_archive_dest_state_22                     string      enable       
log_archive_dest_state_23                     string      enable       
log_archive_dest_state_24                     string      enable       
log_archive_dest_state_25                     string      enable       
log_archive_dest_state_26                     string      enable       
log_archive_dest_state_27                     string      enable       
log_archive_dest_state_28                     string      enable       
log_archive_dest_state_29                     string      enable       
log_archive_dest_state_3                      string      enable       
log_archive_dest_state_30                     string      enable       
log_archive_dest_state_31                     string      enable       
log_archive_dest_state_4                      string      enable       
log_archive_dest_state_5                      string      enable       
log_archive_dest_state_6                      string      enable       
log_archive_dest_state_7                      string      enable       
log_archive_dest_state_8                      string      enable       
log_archive_dest_state_9                      string      enable       
log_archive_duplex_dest                       string             
log_archive_format                            string      %t_%s_%r.dbf
log_archive_max_processes                     integer     4      
log_archive_min_succeed_dest                  integer     1      
log_archive_trace                             integer     0      
log_buffer                                    big integer 8288K  
log_checkpoint_interval                       integer     0      
log_checkpoint_timeout                        integer     1800   
log_checkpoints_to_alert                      boolean     FALSE  
log_file_name_convert                         string             
long_module_action                            boolean     TRUE   
main_workload_type                            string      OLTP   
mandatory_user_profile                        string             
max_auth_servers                              integer     25     
max_columns                                   string      STANDARD     
max_datapump_jobs_per_pdb                     string      AUTO   
max_datapump_parallel_per_job                 string      AUTO   
max_dispatchers                               integer            
max_dump_file_size                            string      1G     
max_idle_blocker_time                         integer     0      
max_idle_time                                 integer     0      
max_iops                                      integer     0      
max_mbps                                      integer     0      
max_pdbs                                      integer     254    
max_saga_duration                             integer     86400  
max_shared_servers                            integer            
max_string_size                               string      STANDARD     
memoptimize_pool_size                         big integer 0      
memoptimize_write_area_size                   big integer 0      
memoptimize_writes                            string      HINT   
memory_max_size                               big integer 0      
memory_max_target                             big integer 0      
memory_size                                   big integer 0      
memory_target                                 big integer 0      
mfa_duo_api_host                              string             
mfa_oma_iam_domain_url                        string             
mfa_sender_email_displayname                  string             
mfa_sender_email_id                           string             
mfa_smtp_host                                 string             
mfa_smtp_port                                 integer     587    
min_auth_servers                              integer     1      
mle_prog_languages                            string      all    
multishard_query_data_consistency             string      strong       
multishard_query_partial_results              string      not allowed  
native_blockchain_features                    string             
nls_calendar                                  string      GREGORIAN    
nls_comp                                      string      BINARY       
nls_currency                                  string      $      
nls_date_format                               string      DD-MON-RR    
nls_date_language                             string      AMERICAN     
nls_dual_currency                             string      $      
nls_iso_currency                              string      AMERICA      
nls_language                                  string      AMERICAN     
nls_length_semantics                          string      BYTE   
nls_nchar_conv_excp                           string      FALSE  
nls_numeric_characters                        string      .,     
nls_sort                                      string      BINARY       
nls_territory                                 string      AMERICA      
nls_time_format                               string      HH.MI.SSXFF AM
nls_time_tz_format                            string      HH.MI.SSXFF AM TZR
nls_timestamp_format                          string      DD-MON-RR HH.MI.SSXFF AM
nls_timestamp_tz_format                       string      DD-MON-RR HH.MI.SSXFF AM TZR
noncdb_compatible                             boolean     FALSE  
object_cache_max_size_percent                 integer     10     
object_cache_optimal_size                     integer     51200000     
ofs_threads                                   integer     4      
olap_page_pool_size                           big integer 0      
one_step_plugin_for_pdb_with_tde              boolean     FALSE  
open_cursors                                  integer     300    
open_links                                    integer     4      
open_links_per_instance                       integer     4      
optimizer_adaptive_plans                      boolean     TRUE   
optimizer_adaptive_reporting_only             boolean     FALSE  
optimizer_adaptive_statistics                 boolean     FALSE  
optimizer_capture_sql_plan_baselines          boolean     FALSE  
optimizer_capture_sql_quarantine              boolean     FALSE  
optimizer_cross_shard_resiliency              boolean     FALSE  
optimizer_dynamic_sampling                    integer     2      
optimizer_features_enable                     string      23.1.0       
optimizer_ignore_hints                        boolean     FALSE  
optimizer_ignore_parallel_hints               boolean     FALSE  
optimizer_index_caching                       integer     0      
optimizer_index_cost_adj                      integer     100    
optimizer_inmemory_aware                      boolean     TRUE   
optimizer_mode                                string      ALL_ROWS     
optimizer_real_time_statistics                boolean     FALSE  
optimizer_secure_view_merging                 boolean            
optimizer_session_type                        string      NORMAL       
optimizer_use_invisible_indexes               boolean     FALSE  
optimizer_use_pending_statistics              boolean     FALSE  
optimizer_use_sql_plan_baselines              boolean     TRUE   
optimizer_use_sql_quarantine                  boolean     TRUE   
os_authent_prefix                             string      ops$   
os_roles                                      boolean     FALSE  
outbound_dblink_protocols                     string      ALL    
parallel_adaptive_multi_user                  boolean     FALSE  
parallel_degree_limit                         string      CPU    
parallel_degree_policy                        string      MANUAL       
parallel_execution_message_size               integer     16384  
parallel_force_local                          boolean     FALSE  
parallel_instance_group                       string             
parallel_max_servers                          integer     80     
parallel_min_degree                           string      1      
parallel_min_percent                          integer     0      
parallel_min_servers                          integer     8      
parallel_min_time_threshold                   string      AUTO   
parallel_servers_target                       integer     80     
parallel_threads_per_cpu                      integer     1      
paranoid_concurrency_mode                     boolean     FALSE  
pdb_file_name_convert                         string             
pdb_lockdown                                  string             
pdb_os_credential                             string             
pdb_template                                  string             
pdc_file_size                                 big integer 4100K  
permit_92_wrap_format                         boolean     FALSE  
pga_aggregate_limit                           big integer 2G     
pga_aggregate_target                          big integer 1000M  
pkcs11_library_location                       string             
plscope_settings                              string      IDENTIFIERS:NONE
plsql_ccflags                                 string             
plsql_code_type                               string      INTERPRETED  
plsql_debug                                   boolean     FALSE  
plsql_function_dynamic_stats                  string      PREFERENCE   
plsql_implicit_conversion_bool                boolean     FALSE  
plsql_optimize_level                          integer     2      
plsql_v2_compatibility                        boolean     FALSE  
plsql_warnings                                string      DISABLE:ALL  
pmem_filestore                                string             
pre_page_sga                                  boolean     TRUE   
priority_txns_high_wait_target                integer     2147483647   
priority_txns_medium_wait_target              integer     2147483647   
priority_txns_mode                            string      ROLLBACK     
private_temp_table_prefix                     string      ORA$PTT_     
processes                                     integer     320    
processor_group_name                          string             
query_rewrite_enabled                         string      TRUE   
query_rewrite_integrity                       string      enforced     
rdbms_server_dn                               string             
read_only                                     boolean     FALSE  
read_only_open_delayed                        boolean     FALSE  
recovery_parallelism                          integer     0      
recyclebin                                    string      on     
redo_transport_user                           string             
remote_dependencies_mode                      string      TIMESTAMP    
remote_listener                               string             
remote_login_passwordfile                     string      EXCLUSIVE    
remote_os_roles                               boolean     FALSE  
remote_recovery_file_dest                     string             
replication_dependency_tracking               boolean     TRUE   
resource_limit                                boolean     TRUE   
resource_manage_goldengate                    boolean     FALSE  
resource_manager_cpu_allocation               integer     0      
resource_manager_cpu_scope                    string      INSTANCE_ONLY
resource_manager_plan                         string             
result_cache_auto_blocklist                   string      ON     
result_cache_execution_threshold              integer     2      
result_cache_integrity                        string      TRUSTED      
result_cache_max_result                       integer     5      
result_cache_max_size                         big integer 15872K       
result_cache_max_temp_result                  integer     5      
result_cache_max_temp_size                    big integer 155M   
result_cache_mode                             string      MANUAL       
result_cache_remote_expiration                integer     0      
resumable_timeout                             integer     0      
rman_restore_file_storage_metadata            boolean     FALSE  
rollback_segments                             string             
run_addm_for_awr_report                       string      NONE   
saga_hist_retention                           integer     43200  
saga_msg_framework                            string      classic_queue
scheduler_follow_pdbtz                        boolean     FALSE  
sec_max_failed_login_attempts                 integer     3      
sec_protocol_error_further_action             string      (DROP,3)     
sec_protocol_error_trace_action               string      TRACE  
sec_return_server_release_banner              boolean     FALSE  
serial_reuse                                  string      disable      
service_names                                 string      orclcdb.example.com
session_cached_cursors                        integer     50     
session_exit_on_package_state_error           boolean     FALSE  
session_max_open_files                        integer     10     
sessions                                      integer     504    
sga_max_size                                  big integer 3008M  
sga_min_size                                  big integer 0      
sga_target                                    big integer 3008M  
shadow_core_dump                              string      partial      
shard_apply_max_memory_size                   big integer 0      
shard_enable_raft_follower_read               boolean     FALSE  
shard_queries_restricted_by_key               boolean     FALSE  
shard_raft_logfile_size                       big integer 1G     
shared_memory_address                         integer     0      
shared_pool_reserved_size                     big integer 43452989     
shared_pool_size                              big integer 0      
shared_server_sessions                        integer            
shared_servers                                integer     1      
shrd_dupl_table_refresh_rate                  integer     60     
skip_unusable_indexes                         boolean     TRUE   
smtp_out_server                               string             
soda_behavior                                 string             
sort_area_retained_size                       integer     0      
sort_area_size                                integer     65536  
spatial_vector_acceleration                   boolean     TRUE   
spfile                                        string      /u01/app/oracle/product/23.0.0/dbhome_1/dbs/spfileorclcdb.ora                                
sql92_security                                boolean     TRUE   
sql_error_mitigation                          string      on     
sql_history_enabled                           boolean     FALSE  
sql_trace                                     boolean     FALSE  
sql_transpiler                                string      OFF    
sqltune_category                              string      DEFAULT      
ssl_wallet                                    string             
standby_db_preserve_states                    string      NONE   
standby_file_management                       string      MANUAL       
standby_parse_limit_seconds                   integer     300    
standby_pdb_source_file_dblink                string             
standby_pdb_source_file_directory             string             
star_transformation_enabled                   string      FALSE  
statement_redirect_service                    string             
statistics_level                              string      TYPICAL      
streams_pool_size                             big integer 0      
sysdate_at_dbtimezone                         boolean     FALSE  
tablespace_encryption                         string      MANUAL_ENABLE
tablespace_encryption_default_algorithm       string      AES256       
tablespace_encryption_default_cipher_mode     string      XTS    
tape_asynch_io                                boolean     TRUE   
target_pdbs                                   integer     5      
tde_configuration                             string             
tde_key_cache                                 boolean     FALSE  
temp_undo_enabled                             boolean     FALSE  
thread                                        integer     0      
threaded_execution                            boolean     FALSE  
time_at_dbtimezone                            string      off    
timed_os_statistics                           integer     0      
timed_statistics                              boolean     TRUE   
timezone_version_upgrade_integrity            string      enforced     
timezone_version_upgrade_online               boolean     FALSE  
trace_enabled                                 boolean     TRUE   
tracefile_content_classification              string      DEFAULT      
tracefile_identifier                          string             
transaction_recovery                          string      ENABLED      
transactions                                  integer     554    
transactions_per_rollback_segment             integer     5      
true_cache                                    boolean     FALSE  
true_cache_config                             string             
txn_auto_rollback_high_priority_wait_target   integer     2147483647   
txn_auto_rollback_medium_priority_wait_target integer     2147483647   
txn_auto_rollback_mode                        string      ROLLBACK     
txn_priority                                  string      HIGH   
undo_management                               string      AUTO   
undo_retention                                integer     900    
undo_tablespace                               string      UNDOTBS1     
unified_audit_common_systemlog                string             
unified_audit_systemlog                       string             
unified_audit_trail_exclude_columns           string      NONE   
uniform_log_timestamp_format                  boolean     TRUE   
use_dedicated_broker                          string      NONE   
use_large_pages                               string      TRUE   
user_dump_dest                                string      /u01/app/oracle/product/23.0.0/dbhome_1/rdbms/log    
vector_index_neighbor_graph_reload            string      RESTART      
vector_memory_size                            big integer 0      
vector_query_capture                          string      ON     
wallet_root                                   string             
workarea_size_policy                          string      AUTO   
xml_client_side_decoding                      string      true   
xml_db_events                                 string      enable       
xml_handling_of_invalid_chars                 string      raise_error  
xml_params                                    string             
SQL> 
```

### New Features in 23.26.1

The New Features Guide summarizes the enhancements in 23.26.1 .

[Release Update 23.26.1](https://docs.oracle.com/en/database/oracle/oracle-database/26/nfcoa/ru23_26_1.html)

- ALTER INDEX Support for JSON Search Index
- Aggregation Filters
- Auto IVF Vector Index Reorganization
- Calendar Functions
- Configuration and Member Tagging for Oracle Data Guard
- DBMS_SECUREFILES Package for SecureFile LOBs
- Database Observability
- Distributed HNSW Indexes with RAC
- Enable Larger ONNX-Format Models
- Included Columns with HNSW Indexes
- JavaScript Web API for In-Database JavaScript
- Kerberos Constrained Delegation for DB Links
- Migrating LOBs Made Easier
- Network Monitor
- Online Index Rebuild
- Partition by Expression
- Post-Quantum Cryptography Support
- Scalar Quantized HNSW Indexes
- Select AI with RAG and Synthetic Data Generation
- Simple Dot-Notation Syntax for JSON Indexes
- Simplifying Data Integrity Using Assertions
- Smart Connection Rebalance Recommendation
- Support for DATEDIFF Function in Oracle
- Support to Create SQL Property Graphs from Database Views
- True Cache Support in OCI Session Pools
- Vector Data Type Support in Precompiler

### Good Day

Have a good work&life! 2026/01 via LinHong
