---
layout: post
title: "Oracle dbca create database in DB18c Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle dbca create database in DB18c Tips


sample commond line:

	dbca -silent \
	-createDatabase \
	-templateName General_Purpose.dbc \
	-gdbName ORCLCDB.us.oracle.com \
	-sid ORCLCDB \
	-createAsContainerDatabase true \
	-numberOfPdbs 1 \
	-pdbName pdb1 \
	-pdbadminUsername pdba \
	-pdbadminPassword welcome \
	-SysPassword welcome \
	-SystemPassword welcome \
	-emConfiguration NONE \
	-databaseType MULTIPURPOSE \
	-characterSet "JA16SJISTILDE" \
	-nationalCharacterSet "AL16UTF16" \
	-enableArchive false \
	-recoveryAreaDestination "NONE" \
	-redoLogFileSize 300

also use dbca createdatabase -help to confirm with the options...









Test log:

	[oracle@emccsvr scripts]$ dbca -silent \
	> -createDatabase \
	> -templateName General_Purpose.dbc \
	> -gdbName ORCLCDB.us.oracle.com \
	> -sid ORCLCDB \
	> -createAsContainerDatabase true \
	> -numberOfPdbs 1 \
	> -pdbName pdb1 \
	> -pdbadminUsername pdba \
	> -pdbadminPassword welcome \
	> -SysPassword welcome \
	> -SystemPassword welcome \
	> -emConfiguration NONE \
	> -databaseType MULTIPURPOSE \
	> -characterSet "JA16SJISTILDE" \
	> -nationalCharacterSet "AL16UTF16" \
	> -enableArchive false \
	> -recoveryAreaDestination "NONE" \
	> -redoLogFileSize 300
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
	 /u01/app/oracle/cfgtoollogs/dbca/ORCLCDB.
	Database Information:
	Global Database Name:ORCLCDB.us.oracle.com
	System Identifier(SID):ORCLCDB
	Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/ORCLCDB/ORCLCDB.log" for further details.
	[oracle@emccsvr scripts]$


	
Have a good life! 2018/09 via LinHong



