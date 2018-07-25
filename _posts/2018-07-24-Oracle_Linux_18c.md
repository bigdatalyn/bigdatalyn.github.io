---
layout: post
title: "Oracle Linux 18c GA Installation"
category: Oracle
tags: Oracle Linux
---

* content
{:toc}




Oracle Linux 18c GA Installation

Oracle database 18c for Linux can be download from 7/24/2018.

19c also will be coming soon.








### Download

There are two following URLs which are provided to download.

[Oracle Database 18c - 18.3](http://www.oracle.com/technetwork/database/enterprise-edition/downloads/oracle18c-linux-180000-5022980.html)

or

[Oracle Software Delivery Cloud](https://edelivery.oracle.com/osdc/faces/Home.jspx)

### Add Disk

There is NOT enough space to install 18c. 

Add new disk and format it/make file system. Example execution log is the following.

[Add Disk log](/files/Linux/AddDisk/AddDisk_20180725.log)

### Install Database

Use the installation guild to install 18c.

[Installation Guide for Linux](https://docs.oracle.com/en/database/oracle/oracle-database/18/ladbi/index.html)

I have posted the Installation Steps in Mar.2018 with Exadata Package files. I used the no GUI to install Database.

[OracleDatabase18c](/files/Oracle/18c/Oracle18c.pdf)

This time use the Setup Wizard to Install Oracle Database.

the Oracle Preinstallation RPM

	# yum install oracle-database-preinstall-18c

Example Logs:

	/var/log/oracle-database-preinstall-18c/backup/timestamp/orakernel.log

	[root@vedb ~]# cat /var/log/oracle-database-preinstall-18c/backup/Jul-24-2018-23-16-49/orakernel.log 
	Group oinstall - Already exists. Not creating again.
	Group dba - Already exists. Not creating again.
	Adding group oper with gid 54323
	Adding group backupdba with gid 54324
	Adding group dgdba with gid 54325
	Adding group kmdba with gid 54326
	Adding group racdba with gid 54330
	User oracle - Already exists. Not creating or modifying.
	User creation passed 

	Saving a copy of the initial sysctl.conf
	Verifying  kernel parameters as per Oracle recommendations...
	Trying to remove instances of  - setting for fs.file-max is
	fs.file-max is matching with preinstall config.
	fs.file-max = 6815744
	Trying to remove instances of  - setting for kernel.sem is
	kernel.sem is matching preinstall config
	kernel.sem = 250 32000 100 128
	Trying to remove instances of  - setting for kernel.shmmni is
	kernel.shmmni is matching with preinstall config.
	kernel.shmmni = 4096
	Trying to remove instances of  - setting for kernel.shmall is
	kernel.shmall is matching with preinstall config.
	kernel.shmall = 1073741824
	Trying to remove instances of  - setting for kernel.shmmax is
	kernel.shmmax is matching with preinstall config.
	kernel.shmmax = 4398046511104
	Trying to remove instances of  - setting for kernel.panic_on_oops is
	kernel.panic_on_oops is matching with preinstall config.
	kernel.panic_on_oops = 1
	Trying to remove instances of  - setting for net.core.rmem_default is
	net.core.rmem_default is matching with preinstall config.
	net.core.rmem_default = 262144
	Trying to remove instances of  - setting for net.core.rmem_max is
	net.core.rmem_max is matching with preinstall config.
	net.core.rmem_max = 4194304
	Trying to remove instances of  - setting for net.core.wmem_default is
	net.core.wmem_default is matching with preinstall config.
	net.core.wmem_default = 262144
	Trying to remove instances of  - setting for net.core.wmem_max is
	net.core.wmem_max is matching with preinstall config.
	net.core.wmem_max = 1048576
	Trying to remove instances of  - setting for net.ipv4.conf.all.rp_filter is
	net.ipv4.conf.all.rp_filter is matching with preinstall config.
	net.ipv4.conf.all.rp_filter = 2
	Trying to remove instances of  - setting for net.ipv4.conf.default.rp_filter is
	net.ipv4.conf.default.rp_filter is matching with preinstall config.
	net.ipv4.conf.default.rp_filter = 2
	Trying to remove instances of  - setting for fs.aio-max-nr is
	fs.aio-max-nr is matching with preinstall config.
	fs.aio-max-nr = 1048576
	Trying to remove instances of  - setting for net.ipv4.ip_local_port_range is
	net.ipv4.ip_local_port_range is matching preinstall config
	net.ipv4.ip_local_port_range = 9000 65500
	Setting kernel parameters as per oracle recommendations...
	Altered file /etc/sysctl.conf
	Saved a copy of the current file in /etc/sysctl.d/99-oracle-database-preinstall-18c-sysctl.conf
	Check /etc/sysctl.d for backups
	Verification & setting of kernel parameters passed 

	Setting user limits using /etc/security/limits.d/oracle-database-preinstall-18c.conf

	Verifying oracle user OS limits as per Oracle recommendations...
	Adding oracle soft nofile  1024
	Adding oracle hard nofile  65536
	Adding oracle soft nproc  16384
	Adding oracle hard nproc  16384
	Adding oracle soft stack  10240
	Adding oracle hard stack  32768
	Adding oracle hard memlock  134217728
	Adding oracle soft memlock  134217728
	Setting oracle user OS limits as per Oracle recommendations...
	Altered file /etc/security/limits.d/oracle-database-preinstall-18c.conf
	Original file backed up at /var/log/oracle-database-preinstall-18c/backup/Jul-24-2018-23-16-49
	Verification & setting of user limits passed 

	Saving a copy of /etc/default/grub file in /etc/default/grub-initial.orabackup
	Saving a copy of /etc/default/grub in /var/log/oracle-database-preinstall-18c/backup/Jul-24-2018-23-16-49...
	Verifying kernel boot parameters as per Oracle recommendations...
	numa=off already present

	transparent_hugepage=never already present

	Verification & setting of boot parameters passed 

	Trying to add NOZEROCONF parameter...
	Parameter added by previous preinstall rpm
	Parameter already present
	Setting /etc/sysconfig/network parameters passed 

	Disabling Transparent Hugepages. 
	Refer Oracle Note:1557478.1

	Disabling defrag. 
	Refer Oracle Note:1557478.1

	Taking a backup of old config files under /var/log/oracle-database-preinstall-18c/backup/Jul-24-2018-23-16-49 
	[root@vedb ~]# 
	

[Running Oracle Database Setup Wizard to Install Oracle Database](https://docs.oracle.com/en/database/oracle/oracle-database/18/ladbi/running-oracle-universal-installer-to-install-oracle-database.html#GUID-DD4800E9-C651-4B08-A6AC-E5ECCC6512B9)

	Log in as the Oracle installation owner user account (oracle) that you want to own the software binaries.
	
	[oracle@vedb ~]$ cat .bash_profile
	# .bash_profile

	# Get the aliases and functions
	if [ -f ~/.bashrc ]; then
			. ~/.bashrc
	fi

	# User specific environment and startup programs

	PATH=$PATH:$HOME/.local/bin:$HOME/bin

	# Oracle Settings
	export TMP=/tmp
	export TMPDIR=$TMP

	export ORACLE_HOSTNAME=vedb.localdomain
	export ORACLE_UNQNAME=orcl
	#export ORACLE_BASE=/u01/app/oracle
	export ORACLE_BASE=/u02/app/oracle
	#export ORACLE_HOME=$ORACLE_BASE/product/12.1.0.2/db
	export ORACLE_HOME=$ORACLE_BASE/product/18.0.0/dbhome_1
	export ORACLE_SID=orcl

	export PATH=/usr/sbin:$PATH
	export PATH=$ORACLE_HOME/bin:$PATH

	export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib
	export CLASSPATH=$ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib

	alias sqlplus='rlwrap sqlplus'
	[oracle@vedb ~]$ 
	
	[root@vedb ~]# chown -R oracle: /u02/app/oracle
	[root@vedb ~]# chown -R oracle: /u02/app/oracle/product/18.0.0/dbhome_1/
	[root@vedb ~]# su - oracle
	Last login: Tue Jul 24 23:36:54 EDT 2018 on pts/0
	[oracle@vedb ~]$ cd $ORACLE_HOME
	[oracle@vedb dbhome_1]$ touch test
	[oracle@vedb dbhome_1]$ rm test
	[oracle@vedb dbhome_1]$ 

	oracle:
	
	$ mkdir -p /u02/app/oracle/product/18.0.0/dbhome_1
	$ chgrp oinstall /u02/app/oracle/product/18.0.0/dbhome_1
	$ cd /u02/app/oracle/product/18.0.0/dbhome_1
	$ unzip -q /tmp/LINUX.X64_180000_db_home.zip
	
	
The steps are the following.

Step 0.
	
![Step0]({{ "/files/Oracle/18c/GA_Install/Install01.png"}})		

Step 1.
	
![Step1]({{ "/files/Oracle/18c/GA_Install/Install02.png"}})	

Step 2.
	
![Step2]({{ "/files/Oracle/18c/GA_Install/Install03.png"}})	

Step 3.
	
![Step3]({{ "/files/Oracle/18c/GA_Install/Install04.png"}})	

Step 4.
	
![Step4]({{ "/files/Oracle/18c/GA_Install/Install05.png"}})	

Step 5.
	
![Step5]({{ "/files/Oracle/18c/GA_Install/Install06.png"}})	

Step 6.
	
![Step6]({{ "/files/Oracle/18c/GA_Install/Install07.png"}})	

Step 7.
	
![Step7]({{ "/files/Oracle/18c/GA_Install/Install07-01.png"}})	

Step 8.
	
![Step8]({{ "/files/Oracle/18c/GA_Install/Install08.png"}})	

Step 9.
	
![Step9]({{ "/files/Oracle/18c/GA_Install/Install09.png"}})	

Step 10.
	
![Step10]({{ "/files/Oracle/18c/GA_Install/Install10.png"}})	

Step 11.
	
![Step11]({{ "/files/Oracle/18c/GA_Install/Install11.png"}})	

	[root@vedb ~]# /u02/app/oracle/product/18.0.0/dbhome_1/root.sh
	Performing root user operation.

	The following environment variables are set as:
		ORACLE_OWNER= oracle
		ORACLE_HOME=  /u02/app/oracle/product/18.0.0/dbhome_1

	Enter the full pathname of the local bin directory: [/usr/local/bin]: 
	The contents of "dbhome" have not changed. No need to overwrite.
	The file "oraenv" already exists in /usr/local/bin.  Overwrite it? (y/n) 
	[n]: 
	The file "coraenv" already exists in /usr/local/bin.  Overwrite it? (y/n) 
	[n]: 

	Entries will be added to the /etc/oratab file as needed by
	Database Configuration Assistant when a database is created
	Finished running generic part of root script.
	Now product-specific root actions will be performed.
	Do you want to setup Oracle Trace File Analyzer (TFA) now ? yes|[no] : 

	Oracle Trace File Analyzer (TFA - Non Daemon Mode) is available at :
		/u02/app/oracle/product/18.0.0/dbhome_1/suptools/tfa/release/tfa_home/bin/tfactl

	Note :
	1. tfactl will use TFA Daemon Mode if TFA already running in Daemon Mode and user has access to TFA
	2. tfactl will configure TFA Non Daemon Mode only if user has no access to TFA Daemon mode or TFA Daemon mode is not installed

	OR

	Oracle Trace File Analyzer (TFA - Daemon Mode) can be installed by running this script :
		/u02/app/oracle/product/18.0.0/dbhome_1/suptools/tfa/release/tfa_home/install/roottfa.sh

	[root@vedb ~]# 


Step 12.
	
![Step12]({{ "/files/Oracle/18c/GA_Install/Install12.png"}})	

### DBCA create Database	

Creating and Configuring an Oracle Database 

Template: General_Purpose.dbc

	[oracle@vedb ~]$ find /u02 -name General_Purpose.dbc
	/u02/app/oracle/product/18.0.0/dbhome_1/assistants/dbca/templates/General_Purpose.dbc
	[oracle@vedb ~]$ cat /u02/app/oracle/product/18.0.0/dbhome_1/assistants/dbca/templates/General_Purpose.dbc
	<?xml version = '1.0'?>
	<DatabaseTemplate name="General Purpose" description=" " version="18.0.0.0.0">
	   <CommonAttributes>
		  <option name="OMS" value="true" includeInPDBs="true"/>
		  <option name="JSERVER" value="true" includeInPDBs="true"/>
		  <option name="SPATIAL" value="true" includeInPDBs="true"/>
		  <option name="IMEDIA" value="true" includeInPDBs="true"/>
		  <option name="ORACLE_TEXT" value="true" includeInPDBs="true">
			 <tablespace id="SYSAUX"/>
		  </option>
		  <option name="SAMPLE_SCHEMA" value="false" includeInPDBs="false"/>
		  <option name="CWMLITE" value="true" includeInPDBs="true">
			 <tablespace id="SYSAUX"/>
		  </option>
		  <option name="APEX" value="false" includeInPDBs="false"/>
		  <option name="DV" value="true" includeInPDBs="true"/>
	   </CommonAttributes>
	   <Variables/>
	   <CustomScripts Execute="false"/>
	   <InitParamAttributes>
		  <InitParams>
			 <initParam name="db_name" value=""/>
			 <initParam name="dispatchers" value="(PROTOCOL=TCP) (SERVICE={SID}XDB)"/>
			 <initParam name="audit_file_dest" value="{ORACLE_BASE}/admin/{DB_UNIQUE_NAME}/adump"/>
			 <initParam name="compatible" value="18.0.0"/>
			 <initParam name="remote_login_passwordfile" value="EXCLUSIVE"/>
			 <initParam name="undo_tablespace" value="UNDOTBS1"/>
			 <initParam name="control_files" value="(&quot;{ORACLE_BASE}/oradata/{DB_UNIQUE_NAME}/control01.ctl&quot;, &quot;{ORACLE_BASE}/fast_recovery_area/{DB_UNIQUE_NAME}/control02.ctl&quot;)"/>
			 <initParam name="diagnostic_dest" value="{ORACLE_BASE}"/>
			 <initParam name="audit_trail" value="db"/>
			 <initParam name="db_block_size" value="8" unit="KB"/>
			 <initParam name="open_cursors" value="300"/>
		  </InitParams>
		  <MiscParams>
			 <databaseType>MULTIPURPOSE</databaseType>
			 <maxUserConn>20</maxUserConn>
			 <percentageMemTOSGA>40</percentageMemTOSGA>
			 <customSGA>false</customSGA>
			 <dataVaultEnabled>false</dataVaultEnabled>
			 <archiveLogMode>false</archiveLogMode>
			 <initParamFileName>{ORACLE_BASE}/admin/{DB_UNIQUE_NAME}/pfile/init.ora</initParamFileName>
		  </MiscParams>
		  <SPfile useSPFile="true">{ORACLE_HOME}/dbs/spfile{SID}.ora</SPfile>
	   </InitParamAttributes>
	   <StorageAttributes>
		  <DataFiles>
			 <Location>{ORACLE_HOME}/assistants/dbca/templates/Seed_Database.dfb</Location>
			 <SourceDBName cdb="true">seeddata</SourceDBName>
			 <Name id="3" Tablespace="SYSAUX" Contents="PERMANENT" Size="400" autoextend="true" blocksize="8192" con_id="1">{ORACLE_BASE}/oradata/{DB_UNIQUE_NAME}/sysaux01.dbf</Name>
			 <Name id="1" Tablespace="SYSTEM" Contents="PERMANENT" Size="830" autoextend="true" blocksize="8192" con_id="1">{ORACLE_BASE}/oradata/{DB_UNIQUE_NAME}/system01.dbf</Name>
			 <Name id="4" Tablespace="UNDOTBS1" Contents="UNDO" Size="25" autoextend="true" blocksize="8192" con_id="1">{ORACLE_BASE}/oradata/{DB_UNIQUE_NAME}/undotbs01.dbf</Name>
			 <Name id="7" Tablespace="USERS" Contents="PERMANENT" Size="5" autoextend="true" blocksize="8192" con_id="1">{ORACLE_BASE}/oradata/{DB_UNIQUE_NAME}/users01.dbf</Name>
		  </DataFiles>
		  <TempFiles>
			 <Name id="1" Tablespace="TEMP" Contents="TEMPORARY" Size="20" con_id="1">{ORACLE_BASE}/oradata/{DB_UNIQUE_NAME}/temp01.dbf</Name>
		  </TempFiles>
		  <ControlfileAttributes id="Controlfile">
			 <maxDatafiles>100</maxDatafiles>
			 <maxLogfiles>16</maxLogfiles>
			 <maxLogMembers>3</maxLogMembers>
			 <maxLogHistory>1</maxLogHistory>
			 <maxInstances>8</maxInstances>
			 <image name="control01.ctl" filepath="{ORACLE_BASE}/oradata/{DB_UNIQUE_NAME}/"/>
			 <image name="control02.ctl" filepath="{ORACLE_BASE}/fast_recovery_area/{DB_UNIQUE_NAME}/"/>
		  </ControlfileAttributes>
		  <RedoLogGroupAttributes id="1">
			 <reuse>false</reuse>
			 <fileSize unit="KB">204800</fileSize>
			 <Thread>1</Thread>
			 <member ordinal="0" memberName="redo01.log" filepath="{ORACLE_BASE}/oradata/{DB_UNIQUE_NAME}/"/>
		  </RedoLogGroupAttributes>
		  <RedoLogGroupAttributes id="2">
			 <reuse>false</reuse>
			 <fileSize unit="KB">204800</fileSize>
			 <Thread>1</Thread>
			 <member ordinal="0" memberName="redo02.log" filepath="{ORACLE_BASE}/oradata/{DB_UNIQUE_NAME}/"/>
		  </RedoLogGroupAttributes>
		  <RedoLogGroupAttributes id="3">
			 <reuse>false</reuse>
			 <fileSize unit="KB">204800</fileSize>
			 <Thread>1</Thread>
			 <member ordinal="0" memberName="redo03.log" filepath="{ORACLE_BASE}/oradata/{DB_UNIQUE_NAME}/"/>
		  </RedoLogGroupAttributes>
	   </StorageAttributes>
	</DatabaseTemplate>

Use General_Purpose.dbc template to create database.	
	
	dbca -silent -createDatabase -templateName General_Purpose.dbc -gdbname prodcdb.oracle.com -sid PRODCDB -characterSet AL32UTF8 -memoryPercentage 75 -emConfiguration DBEXPRESS

Use the help option to check the details.

	dbca -help

Example logs:	
	
	[oracle@vedb ~]$ dbca -silent -createDatabase -templateName General_Purpose.dbc -gdbname prodcdb.oracle.com -sid PRODCDB -characterSet AL32UTF8 -memoryPercentage 75 -emConfiguration DBEXPRESS
	[WARNING] [DBT-09251] The listener configuration is not selected for the database. EM DB Express URL will not be accessible.
	   CAUSE: The database should be registered with a listener in order to access the EM DB Express URL.
	   ACTION: Select a listener to be registered or created with the database.
	Enter SYS user password: 

	Enter SYSTEM user password: 

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
	Prepare for db operation
	10% complete
	Copying database files
	40% complete
	Creating and starting Oracle instance
	42% complete
	46% complete
	50% complete
	54% complete
	60% complete
	Completing Database Creation
	66% complete
	70% complete
	Executing Post Configuration Actions
	100% complete
	Database creation complete. For details check the logfiles at:
	 /u02/app/oracle/cfgtoollogs/dbca/prodcdb.
	Database Information:
	Global Database Name:prodcdb.oracle.com
	System Identifier(SID):PRODCDB
	Look at the log file "/u02/app/oracle/cfgtoollogs/dbca/prodcdb/prodcdb.log" for further details.
	[oracle@vedb ~]$ 
	[oracle@vedb ~]$ export ORACLE_SID=PRODCDB;sqlplus / as sysdba

	SQL*Plus: Release 18.0.0.0.0 - Production on Wed Jul 25 01:28:02 2018
	Version 18.3.0.0.0

	Copyright (c) 1982, 2018, Oracle.  All rights reserved.


	Connected to:
	Oracle Database 18c Enterprise Edition Release 18.0.0.0.0 - Production
	Version 18.3.0.0.0

	SQL> select name,open_mode from v$database;

	NAME      OPEN_MODE
	--------- --------------------
	PRODCDB   READ WRITE

	SQL> show pdbs;
	SYS@PRODCDB> select name,cdb from v$database;

	NAME                                               CDB
	-------------------------------------------------- ---
	PRODCDB                                            NO

	SYS@PRODCDB> 

To be continue....

Have a good life! 2018/07 via LinHong


