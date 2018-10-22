---
layout: post
title: "Oracle 18c RPM install Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle 18c RPM install Tips









#### Preinstall 18c

Use the following command to install the prerequistites packages.

	# yum update -y

	# yum install -y oracle-database-preinstall-18c

Database package will be installed in /opt filesystem, so ensure that the size of /opt filesystem is more than 8G.

	Error Summary
	-------------
	Disk Requirements:
	  At least 7543MB more space needed on the / filesystem.

and chown oracle.oinstall /opt 

Restrictions 

    Patching Oracle Database software using RPMs is not supported. Please use the OPatch utility and follow the regular patching process to apply Oracle Database patches.

    An RPM-based Oracle Database installation is not available for Standard Edition 2. Standard Edition 2 support is planned for 19c.

    RPM-based database upgrades using rpm -Uvh is not supported. For Oracle Database upgrades, follow the regular upgrade process.

    An RPM-based installation supports the installation of multiple Oracle Database software versions into different Oracle homes on the same machine.

#### Install 18c ee package

Oracle 18c (18.3) download page

[Oracle Database 18c (18.3)](https://www.oracle.com/technetwork/database/enterprise-edition/downloads/oracle18c-linux-180000-5022980.html)

	# yum -y localinstall oracle-database-ee-18c-1.0-1.x86_64.rpm

Or get from yum and install 
	
	# RHEL7
	curl -o oracle-database-preinstall-18c-1.0-1.el7.x86_64.rpm https://yum.oracle.com/repo/OracleLinux/OL7/latest/x86_64/getPackage/oracle-database-preinstall-18c-1.0-1.el7.x86_64.rpm
	yum -y localinstall oracle-database-preinstall-18c-1.0-1.el7.x86_64.rpm
	rm oracle-database-preinstall-18c-1.0-1.el7.x86_64.rpm

	# RHEL6
	curl -o oracle-database-preinstall-18c-1.0-1.el6.x86_64.rpm https://yum.oracle.com/repo/OracleLinux/OL6/latest/x86_64/getPackage/oracle-database-preinstall-18c-1.0-1.el6.x86_64.rpm
	yum -y localinstall oracle-database-preinstall-18c-1.0-1.el6.x86_64.rpm
	rm oracle-database-preinstall-18c-1.0-1.el6.x86_64.rpm	

#### Create Database

Use oracledb_ORCLCDB-18c to create database just like the following command.

You can modify the configuration parameters by editing the /etc/sysconfig/oracledb_ORCLCDB-18c.conf file. 

	# /etc/init.d/oracledb_ORCLCDB-18c configure
	Configuring Oracle Database ORCLCDB.
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
	54% complete
	Creating Pluggable Databases
	58% complete
	77% complete
	Executing Post Configuration Actions
	100% complete
	Database creation complete. For details check the logfiles at:
	 /opt/oracle/cfgtoollogs/dbca/ORCLCDB.
	Database Information:
	Global Database Name:ORCLCDB
	System Identifier(SID):ORCLCDB
	Look at the log file "/opt/oracle/cfgtoollogs/dbca/ORCLCDB/ORCLCDB.log" for further details.
	 
	Database configuration completed successfully. The passwords were auto generated,
	you must change them by connecting to the database using 'sqlplus / as sysdba' as the oracle user.
	#
	
#### Reference
	
[Oracle Database 18c Installation On Oracle Linux 6 (OL6) and 7 (OL7)](https://oracle-base.com/articles/18c/oracle-db-18c-installation-on-oracle-linux-6-and-7)

[Installing Oracle Database Using RPM Packages](https://docs.oracle.com/en/database/oracle/oracle-database/18/ladbi/installing-oracle-database-using-rpm-packages.html#GUID-5AF74AC1-510E-4EB0-9BCA-B096C42C6A76)


[Running RPM Packages to Install Oracle Database](https://docs.oracle.com/en/database/oracle/oracle-database/18/ladbi/running-rpm-packages-to-install-oracle-database.html#GUID-BB7C11E3-D385-4A2F-9EAF-75F4F0AACF02)




Have a good work&life! 2018/10 via LinHong



