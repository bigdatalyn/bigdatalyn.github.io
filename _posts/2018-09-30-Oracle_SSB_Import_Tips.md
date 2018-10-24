---
layout: post
title: "Oracle Setting up the Star Schema Benchmark (SSB) with Import Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}


Oracle Setting up the Star Schema Benchmark (SSB) with Import Tips








#### Step1: Create Table spaces for loading the data (Star schema)

	[oracle@emccsvr scripts]$ cat 01_create_ssb.txt
	#!/bin/bash

	sqlplus system/welcome@PDB1 << EOF
	drop tablespace ts_temp;
	create temporary tablespace ts_temp tempfile '/u01/app/oracle/oradata/ORCLCDB/pdb1/ts_temp01.dbf' size 1G reuse autoextend on;
	drop tablespace ts_data including contents and datafiles;
	create tablespace ts_data datafile '/u01/app/oracle/oradata/ORCLCDB/pdb1/ts_data01.dbf' size 2G autoextend on;
	EOF
	[oracle@emccsvr scripts]$ cat 01_create_ssb.txt |sh


#### STEP 2: Download Data to be loaded and unzip

	wget -O /u01/app/oracle/oradata/ssb/star-schema-benchmark-ssb.zip https://www.dropbox.com/s/vfea4snh8my3ngx/ssb.zip?dl=0
	
	unzip star-schema-benchmark-ssb.zip
	
#### STEP 3 Create ssb user

	[oracle@emccsvr scripts]$ cat 02_create_ssb.txt
	#!/bin/bash

	sqlplus system/welcome@PDB1 << EOF
	drop user ssb cascade;
	create user ssb identified by ssb default tablespace ts_data temporary tablespace ts_temp;
	grant dba to ssb;
	connect ssb/ssb@PDB1
	create or replace directory expdumpdir1 as '/u01/app/oracle/oradata/ssb';
	EOF

	[oracle@emccsvr scripts]$ cat 02_create_ssb.txt | sh
	

#### STEP 4 Import Schema
	
	[oracle@emccsvr scripts]$ cat 03_create_ssb.txt
	#!/bin/bash

	impdp ssb/ssb@PDB1 parallel=4 directory=expdumpdir1 schemas=ssb dumpfile=ssb%u.dmp;
	[oracle@emccsvr scripts]$
	[oracle@emccsvr scripts]$ cat 03_create_ssb.txt |sh

	Import: Release 18.0.0.0.0 - Production on Sun Sep 30 05:11:46 2018
	Version 18.3.0.0.0

	Copyright (c) 1982, 2018, Oracle and/or its affiliates.  All rights reserved.

	Connected to: Oracle Database 18c Enterprise Edition Release 18.0.0.0.0 - Production
	Master table "SSB"."SYS_IMPORT_SCHEMA_01" successfully loaded/unloaded
	import done in JA16SJISTILDE character set and AL16UTF16 NCHAR character set
	export done in AL32UTF8 character set and AL16UTF16 NCHAR character set
	Warning: possible data loss in character set conversions
	Starting "SSB"."SYS_IMPORT_SCHEMA_01":  ssb/********@PDB1 parallel=4 directory=expdumpdir1 schemas=ssb dumpfile=ssb%u.dmp
	Processing object type SCHEMA_EXPORT/USER
	ORA-31684: Object type USER:"SSB" already exists

	Processing object type SCHEMA_EXPORT/SYSTEM_GRANT
	Processing object type SCHEMA_EXPORT/ROLE_GRANT
	Processing object type SCHEMA_EXPORT/DEFAULT_ROLE
	Processing object type SCHEMA_EXPORT/PRE_SCHEMA/PROCACT_SCHEMA
	Processing object type SCHEMA_EXPORT/TYPE/TYPE_SPEC
	Processing object type SCHEMA_EXPORT/TABLE/TABLE
	Processing object type SCHEMA_EXPORT/TABLE/TABLE_DATA
	. . imported "SSB"."LINEORDER"                           2.217 GB 23996604 rows
	. . imported "SSB"."DATE_DIM"                            270.8 KB    2556 rows
	. . imported "SSB"."SUPPLIER"                            835.6 KB    8000 rows
	. . imported "SSB"."CUSTOMER"                            12.70 MB  120000 rows
	. . imported "SSB"."PART"                                51.53 MB  600000 rows
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/INDEX
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/STATISTICS/INDEX_STATISTICS
	Processing object type SCHEMA_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
	Processing object type SCHEMA_EXPORT/STATISTICS/MARKER
	Job "SSB"."SYS_IMPORT_SCHEMA_01" completed with 1 error(s) at Sun Sep 30 05:13:49 2018 elapsed 0 00:02:02

	[oracle@emccsvr scripts]$

#### The count of ssb tables	

	SQL> select table_name from user_tables;

	TABLE_NAME
	--------------------------------------------------------------------------------
	LINEORDER
	PART
	CUSTOMER
	SUPPLIER
	DATE_DIM

	SQL> select count(*) from lineorder;

	  COUNT(*)
	----------
	  23996604

	SQL> select count(*) from part;

	  COUNT(*)
	----------
		600000

	SQL> select count(*) from customer;

	  COUNT(*)
	----------
		120000

	SQL> select count(*) from supplier;

	  COUNT(*)
	----------
		  8000

	SQL> select count(*) from date_dim;

	  COUNT(*)
	----------
		  2556

	SQL>

#### Reference
	
[LabGuide900_inmemory.md](https://github.com/oracle/learning-library/blob/master/workshops/journey2-new-data-lake/LabGuide900_inmemory.md)


Have a good life! 2018/09 via LinHong



