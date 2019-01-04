---
layout: post
title: "Oracle 18c enable dbhome readonly Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle 18c enable dbhome readonly Tips




Enable a Read-Only Oracle Home: Enable a Read-Only Oracle Home


In a read-only Oracle home, all the configuration data and log files reside outside of the read-only Oracle home. This feature allows you to use the read-only Oracle home as a software image that can be distributed across multiple servers.

Apart from the traditional ORACLE_BASE and ORACLE_HOME directories, the following directories contain files that used to be in ORACLE_HOME:

    ORACLE_BASE_HOME

    This directory contains user-specific files, instance-specific files, and log files. In a read/write ORACLE_HOME, the ORACLE_BASE_HOME path is the same as the ORACLE_HOME directory. However, in a read-only ORACLE_HOME, the ORACLE_BASE_HOME directory is located at ORACLE_BASE/homes/HOME_NAME. HOME_NAME is the internal name for ORACLE_HOME.
    
	ORACLE_BASE_CONFIG

    This directory contains configuration files. In a read/write ORACLE_HOME, the ORACLE_BASE_CONFIG path is the same as the ORACLE_HOME. However, in a read-only ORACLE_HOME, the ORACLE_BASE_CONFIG path is the same as ORACLE_BASE.

	
#### Go to the bin directory.

	$ cd $ORACLE_HOME/bin

where ORACLE_HOME is the path to the Oracle home directory. For example:

	/u01/app/oracle/product/18.0.0/dbhome_1

#### Run the roohctl script.

	$ ./roohctl -enable 

The following message is displayed:
Description of the Enabling Read-Only Oracle Home Script Ouput

![dbhome_enable_display_log]({{ "/files/Oracle/18c/dbhome_enable_display_log.png"}})




Have a good work&life! 2019/01 via LinHong



