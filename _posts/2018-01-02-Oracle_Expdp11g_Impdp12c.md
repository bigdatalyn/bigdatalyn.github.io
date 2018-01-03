---
layout: post
title: "[Original]Impdp/Expdp Oracle 11g Schema's data to Oracle 12c"
category: Oracle
tags: Oracle 12c impdp expdp
---

* content
{:toc}


### [Original]Impdp/Expdp Oracle 11g Schema's data to Oracle 12c

How to Impdp/Expdp Oracle 11g Schema's data to Oracle 12c?

Sample steps are the following.










### Expdp the data in 11g database

	[oracle@host01 ~]$ expdp \' / as sysdba\' dumpfile=db11g_sh.dump logfile=db11g_sh.log schemas=sh

	Export: Release 11.2.0.4.0 - Production on Wed Jan 2 23:30:32 2018

	Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.

	Connected to: Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - 64bit Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options
	Starting "SYS"."SYS_EXPORT_SCHEMA_01":  "/******** AS SYSDBA" dumpfile=db11g_sh.dump logfile=db11g_sh.log schemas=sh 
	Estimate in progress using BLOCKS method...
	Processing object type SCHEMA_EXPORT/TABLE/TABLE_DATA
	Total estimation using BLOCKS method: 273.8 MB
	Processing object type SCHEMA_EXPORT/USER
	Processing object type SCHEMA_EXPORT/SYSTEM_GRANT
	Processing object type SCHEMA_EXPORT/ROLE_GRANT
	Processing object type SCHEMA_EXPORT/DEFAULT_ROLE
	Processing object type SCHEMA_EXPORT/PRE_SCHEMA/PROCACT_SCHEMA
	Processing object type SCHEMA_EXPORT/TABLE/TABLE
	Processing object type SCHEMA_EXPORT/TABLE/GRANT/OWNER_GRANT/OBJECT_GRANT
	Processing object type SCHEMA_EXPORT/TABLE/COMMENT
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/INDEX
	Processing object type SCHEMA_EXPORT/TABLE/CONSTRAINT/CONSTRAINT
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/STATISTICS/INDEX_STATISTICS
	Processing object type SCHEMA_EXPORT/VIEW/VIEW
	Processing object type SCHEMA_EXPORT/TABLE/CONSTRAINT/REF_CONSTRAINT
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/BITMAP_INDEX/INDEX
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/STATISTICS/BITMAP_INDEX/INDEX_STATISTICS
	Processing object type SCHEMA_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/DOMAIN_INDEX/INDEX
	Processing object type SCHEMA_EXPORT/MATERIALIZED_VIEW
	Processing object type SCHEMA_EXPORT/DIMENSION
	. . exported "SH"."CUSTOMERS"                            9.853 MB   55500 rows
	. . exported "SH"."COSTS":"COSTS_Q1_1998"                139.5 KB    4411 rows
	. . exported "SH"."COSTS":"COSTS_Q1_1999"                183.5 KB    5884 rows
	. . exported "SH"."COSTS":"COSTS_Q1_2000"                120.6 KB    3772 rows
	. . exported "SH"."COSTS":"COSTS_Q1_2001"                227.8 KB    7328 rows
	. . exported "SH"."COSTS":"COSTS_Q2_1998"                79.52 KB    2397 rows
	. . exported "SH"."COSTS":"COSTS_Q2_1999"                132.5 KB    4179 rows
	. . exported "SH"."COSTS":"COSTS_Q2_2000"                119.0 KB    3715 rows
	. . exported "SH"."COSTS":"COSTS_Q2_2001"                184.5 KB    5882 rows
	. . exported "SH"."COSTS":"COSTS_Q3_1998"                131.1 KB    4129 rows
	. . exported "SH"."COSTS":"COSTS_Q3_1999"                137.3 KB    4336 rows
	. . exported "SH"."COSTS":"COSTS_Q3_2000"                151.4 KB    4798 rows
	. . exported "SH"."COSTS":"COSTS_Q3_2001"                234.4 KB    7545 rows
	. . exported "SH"."COSTS":"COSTS_Q4_1998"                144.7 KB    4577 rows
	. . exported "SH"."COSTS":"COSTS_Q4_1999"                159.0 KB    5060 rows
	. . exported "SH"."COSTS":"COSTS_Q4_2000"                160.2 KB    5088 rows
	. . exported "SH"."COSTS":"COSTS_Q4_2001"                278.4 KB    9011 rows
	. . exported "SH"."SALES":"SALES_Q1_1998"                1.412 MB   43687 rows
	. . exported "SH"."SALES":"SALES_Q1_1999"                2.071 MB   64186 rows
	. . exported "SH"."SALES":"SALES_Q1_2000"                2.012 MB   62197 rows
	. . exported "SH"."SALES":"SALES_Q1_2001"                1.965 MB   60608 rows
	. . exported "SH"."SALES":"SALES_Q2_1998"                1.160 MB   35758 rows
	. . exported "SH"."SALES":"SALES_Q2_1999"                1.754 MB   54233 rows
	. . exported "SH"."SALES":"SALES_Q2_2000"                1.802 MB   55515 rows
	. . exported "SH"."SALES":"SALES_Q2_2001"                2.051 MB   63292 rows
	. . exported "SH"."SALES":"SALES_Q3_1998"                1.633 MB   50515 rows
	. . exported "SH"."SALES":"SALES_Q3_1999"                2.166 MB   67138 rows
	. . exported "SH"."SALES":"SALES_Q3_2000"                1.909 MB   58950 rows
	. . exported "SH"."SALES":"SALES_Q3_2001"                2.130 MB   65769 rows
	. . exported "SH"."SALES":"SALES_Q4_1998"                1.581 MB   48874 rows
	. . exported "SH"."SALES":"SALES_Q4_1999"                2.014 MB   62388 rows
	. . exported "SH"."SALES":"SALES_Q4_2000"                1.814 MB   55984 rows
	. . exported "SH"."SALES":"SALES_Q4_2001"                2.257 MB   69749 rows
	. . exported "SH"."SUPPLEMENTARY_DEMOGRAPHICS"           697.3 KB    4500 rows
	. . exported "SH"."FWEEK_PSCAT_SALES_MV"                 419.8 KB   11266 rows
	. . exported "SH"."PROMOTIONS"                           58.89 KB     503 rows
	. . exported "SH"."TIMES"                                380.8 KB    1826 rows
	. . exported "SH"."CAL_MONTH_SALES_MV"                   6.312 KB      48 rows
	. . exported "SH"."CHANNELS"                              7.25 KB       5 rows
	. . exported "SH"."COUNTRIES"                            10.20 KB      23 rows
	. . exported "SH"."PRODUCTS"                             26.17 KB      72 rows
	. . exported "SH"."COSTS":"COSTS_1995"                       0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_1996"                       0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_H1_1997"                    0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_H2_1997"                    0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_Q1_2002"                    0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_Q1_2003"                    0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_Q2_2002"                    0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_Q2_2003"                    0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_Q3_2002"                    0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_Q3_2003"                    0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_Q4_2002"                    0 KB       0 rows
	. . exported "SH"."COSTS":"COSTS_Q4_2003"                    0 KB       0 rows
	. . exported "SH"."DIMENSION_EXCEPTIONS"                     0 KB       0 rows
	. . exported "SH"."SALES":"SALES_1995"                       0 KB       0 rows
	. . exported "SH"."SALES":"SALES_1996"                       0 KB       0 rows
	. . exported "SH"."SALES":"SALES_H1_1997"                    0 KB       0 rows
	. . exported "SH"."SALES":"SALES_H2_1997"                    0 KB       0 rows
	. . exported "SH"."SALES":"SALES_Q1_2002"                    0 KB       0 rows
	. . exported "SH"."SALES":"SALES_Q1_2003"                    0 KB       0 rows
	. . exported "SH"."SALES":"SALES_Q2_2002"                    0 KB       0 rows
	. . exported "SH"."SALES":"SALES_Q2_2003"                    0 KB       0 rows
	. . exported "SH"."SALES":"SALES_Q3_2002"                    0 KB       0 rows
	. . exported "SH"."SALES":"SALES_Q3_2003"                    0 KB       0 rows
	. . exported "SH"."SALES":"SALES_Q4_2002"                    0 KB       0 rows
	. . exported "SH"."SALES":"SALES_Q4_2003"                    0 KB       0 rows
	Master table "SYS"."SYS_EXPORT_SCHEMA_01" successfully loaded/unloaded
	******************************************************************************
	Dump file set for SYS.SYS_EXPORT_SCHEMA_01 is:
	  /u01/app/oracle/admin/DB11G/dpdump/db11g_sh.dump
	Job "SYS"."SYS_EXPORT_SCHEMA_01" successfully completed at Wed Jan 2 23:31:32 2018 elapsed 0 00:00:57

	[oracle@host01 ~]$

### Check the schema's tablespace and create the same tablespace in DB12c

11G：

	SQL> select distinct tablespace_name from dba_segments where owner in ('SH');
	TABLESPACE_NAME
	------------------------------
	EXAMPLE
	SQL> 
	SQL> select count(*) from dba_segments where owner in ('SH');
	  COUNT(*)
	----------
		180
	SQL> 

	
12c:

	SYS@pdbprod3> select con_id,open_mode,name from v$containers;
		CON_ID OPEN_MODE  NAME
	---------- ---------- ------------------------------
		 5 READ WRITE PDBPROD3

	SYS@pdbprod3> select tablespace_name from dba_tablespaces;
	TABLESPACE_NAME
	------------------------------
	SYSTEM
	SYSAUX
	TEMP
	USERS

	SYS@pdbprod3> create tablespace example datafile '/u01/app/oracle/oradata/PRODCDB/PDBPROD3/example001.dbf' size 100m autoextend on;
	Tablespace created.
	SYS@pdbprod3> 
	SYS@pdbprod3> select tablespace_name from dba_tablespaces;
	TABLESPACE_NAME
	------------------------------
	SYSTEM
	SYSAUX
	TEMP
	USERS
	EXAMPLE
	SYS@pdbprod3>

### Prepare the directory and move the dumpfile to the directory	
	
	[oracle@host01 ~]$ mv /u01/app/oracle/admin/DB11G/dpdump/db11g_sh.dump  /home/oracle/
	[oracle@host01 ~]$ 
	
	SYS@pdbprod3> 
	SYS@pdbprod3> create directory dump_dir_11g as '/home/oracle';

	Directory created.

	SYS@pdbprod3> grant read,write,execute on directory dump_dir_11g to public;

	Grant succeeded.

	SYS@pdbprod3> exit

### Impdp the dumpfile to 12c
	
	[oracle@host01 ~]$ which impdp
	/u01/app/oracle/product/12.1.0/dbhome_1/bin/impdp
	[oracle@host01 ~]$ impdp \'sys/oracle@pdbprod3 as sysdba \' directory=dump_dir_11g dumpfile=db11g_sh.dump logfile=db11g_sh_12c_imp.log

	Import: Release 12.1.0.2.0 - Production on Wed Jan 2 23:44:13 2018

	Copyright (c) 1982, 2014, Oracle and/or its affiliates.  All rights reserved.

	Connected to: Oracle Database 12c Enterprise Edition Release 12.1.0.2.0 - 64bit Production
	With the Partitioning, Oracle Label Security, OLAP, Advanced Analytics
	and Real Application Testing options
	Master table "SYS"."SYS_IMPORT_FULL_01" successfully loaded/unloaded
	Starting "SYS"."SYS_IMPORT_FULL_01":  "sys/********@pdbprod3 AS SYSDBA" directory=dump_dir_11g dumpfile=db11g_sh.dump logfile=db11g_sh_12c_imp.log 
	Processing object type SCHEMA_EXPORT/USER
	Processing object type SCHEMA_EXPORT/SYSTEM_GRANT
	Processing object type SCHEMA_EXPORT/ROLE_GRANT
	ORA-39083: Object type ROLE_GRANT failed to create with error:
	ORA-01919: role 'CWM_USER' does not exist
	Failing sql is:
	 GRANT "CWM_USER" TO "SH"
	Processing object type SCHEMA_EXPORT/DEFAULT_ROLE
	Processing object type SCHEMA_EXPORT/PRE_SCHEMA/PROCACT_SCHEMA
	Processing object type SCHEMA_EXPORT/TABLE/TABLE
	ORA-39083: Object type TABLE:"SH"."SALES_TRANSACTIONS_EXT" failed to create with error:
	ORA-06564: object DATA_FILE_DIR does not exist
	Failing sql is:
	CREATE TABLE "SH"."SALES_TRANSACTIONS_EXT" ("PROD_ID" NUMBER, "CUST_ID" NUMBER, "TIME_ID" DATE, "CHANNEL_ID" NUMBER, "PROMO_ID" NUMBER, "QUANTITY_SOLD" NUMBER, "AMOUNT_SOLD" NUMBER(10,2), "UNIT_COST" NUMBER(10,2), "UNIT_PRICE" NUMBER(10,2)) ORGANIZATION EXTERNAL ( TYPE ORACLE_LOADER DEFAULT DIRECTORY "DATA_FILE_DIR" ACCESS PARAMETERS ( RECORDS DELIMITED BY NE
	Processing object type SCHEMA_EXPORT/TABLE/TABLE_DATA
	. . imported "SH"."CUSTOMERS"                            9.853 MB   55500 rows
	. . imported "SH"."COSTS":"COSTS_Q1_1998"                139.5 KB    4411 rows
	. . imported "SH"."COSTS":"COSTS_Q1_1999"                183.5 KB    5884 rows
	. . imported "SH"."COSTS":"COSTS_Q1_2000"                120.6 KB    3772 rows
	. . imported "SH"."COSTS":"COSTS_Q1_2001"                227.8 KB    7328 rows
	. . imported "SH"."COSTS":"COSTS_Q2_1998"                79.52 KB    2397 rows
	. . imported "SH"."COSTS":"COSTS_Q2_1999"                132.5 KB    4179 rows
	. . imported "SH"."COSTS":"COSTS_Q2_2000"                119.0 KB    3715 rows
	. . imported "SH"."COSTS":"COSTS_Q2_2001"                184.5 KB    5882 rows
	. . imported "SH"."COSTS":"COSTS_Q3_1998"                131.1 KB    4129 rows
	. . imported "SH"."COSTS":"COSTS_Q3_1999"                137.3 KB    4336 rows
	. . imported "SH"."COSTS":"COSTS_Q3_2000"                151.4 KB    4798 rows
	. . imported "SH"."COSTS":"COSTS_Q3_2001"                234.4 KB    7545 rows
	. . imported "SH"."COSTS":"COSTS_Q4_1998"                144.7 KB    4577 rows
	. . imported "SH"."COSTS":"COSTS_Q4_1999"                159.0 KB    5060 rows
	. . imported "SH"."COSTS":"COSTS_Q4_2000"                160.2 KB    5088 rows
	. . imported "SH"."COSTS":"COSTS_Q4_2001"                278.4 KB    9011 rows
	. . imported "SH"."SALES":"SALES_Q1_1998"                1.412 MB   43687 rows
	. . imported "SH"."SALES":"SALES_Q1_1999"                2.071 MB   64186 rows
	. . imported "SH"."SALES":"SALES_Q1_2000"                2.012 MB   62197 rows
	. . imported "SH"."SALES":"SALES_Q1_2001"                1.965 MB   60608 rows
	. . imported "SH"."SALES":"SALES_Q2_1998"                1.160 MB   35758 rows
	. . imported "SH"."SALES":"SALES_Q2_1999"                1.754 MB   54233 rows
	. . imported "SH"."SALES":"SALES_Q2_2000"                1.802 MB   55515 rows
	. . imported "SH"."SALES":"SALES_Q2_2001"                2.051 MB   63292 rows
	. . imported "SH"."SALES":"SALES_Q3_1998"                1.633 MB   50515 rows
	. . imported "SH"."SALES":"SALES_Q3_1999"                2.166 MB   67138 rows
	. . imported "SH"."SALES":"SALES_Q3_2000"                1.909 MB   58950 rows
	. . imported "SH"."SALES":"SALES_Q3_2001"                2.130 MB   65769 rows
	. . imported "SH"."SALES":"SALES_Q4_1998"                1.581 MB   48874 rows
	. . imported "SH"."SALES":"SALES_Q4_1999"                2.014 MB   62388 rows
	. . imported "SH"."SALES":"SALES_Q4_2000"                1.814 MB   55984 rows
	. . imported "SH"."SALES":"SALES_Q4_2001"                2.257 MB   69749 rows
	. . imported "SH"."SUPPLEMENTARY_DEMOGRAPHICS"           697.3 KB    4500 rows
	. . imported "SH"."FWEEK_PSCAT_SALES_MV"                 419.8 KB   11266 rows
	. . imported "SH"."PROMOTIONS"                           58.89 KB     503 rows
	. . imported "SH"."TIMES"                                380.8 KB    1826 rows
	. . imported "SH"."CAL_MONTH_SALES_MV"                   6.312 KB      48 rows
	. . imported "SH"."CHANNELS"                              7.25 KB       5 rows
	. . imported "SH"."COUNTRIES"                            10.20 KB      23 rows
	. . imported "SH"."PRODUCTS"                             26.17 KB      72 rows
	. . imported "SH"."COSTS":"COSTS_1995"                       0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_1996"                       0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_H1_1997"                    0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_H2_1997"                    0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_Q1_2002"                    0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_Q1_2003"                    0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_Q2_2002"                    0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_Q2_2003"                    0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_Q3_2002"                    0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_Q3_2003"                    0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_Q4_2002"                    0 KB       0 rows
	. . imported "SH"."COSTS":"COSTS_Q4_2003"                    0 KB       0 rows
	. . imported "SH"."DIMENSION_EXCEPTIONS"                     0 KB       0 rows
	. . imported "SH"."SALES":"SALES_1995"                       0 KB       0 rows
	. . imported "SH"."SALES":"SALES_1996"                       0 KB       0 rows
	. . imported "SH"."SALES":"SALES_H1_1997"                    0 KB       0 rows
	. . imported "SH"."SALES":"SALES_H2_1997"                    0 KB       0 rows
	. . imported "SH"."SALES":"SALES_Q1_2002"                    0 KB       0 rows
	. . imported "SH"."SALES":"SALES_Q1_2003"                    0 KB       0 rows
	. . imported "SH"."SALES":"SALES_Q2_2002"                    0 KB       0 rows
	. . imported "SH"."SALES":"SALES_Q2_2003"                    0 KB       0 rows
	. . imported "SH"."SALES":"SALES_Q3_2002"                    0 KB       0 rows
	. . imported "SH"."SALES":"SALES_Q3_2003"                    0 KB       0 rows
	. . imported "SH"."SALES":"SALES_Q4_2002"                    0 KB       0 rows
	. . imported "SH"."SALES":"SALES_Q4_2003"                    0 KB       0 rows
	Processing object type SCHEMA_EXPORT/TABLE/GRANT/OWNER_GRANT/OBJECT_GRANT
	Processing object type SCHEMA_EXPORT/TABLE/COMMENT
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/INDEX
	Processing object type SCHEMA_EXPORT/TABLE/CONSTRAINT/CONSTRAINT
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/STATISTICS/INDEX_STATISTICS
	Processing object type SCHEMA_EXPORT/VIEW/VIEW
	Processing object type SCHEMA_EXPORT/TABLE/CONSTRAINT/REF_CONSTRAINT
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/BITMAP_INDEX/INDEX
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/STATISTICS/BITMAP_INDEX/INDEX_STATISTICS
	Processing object type SCHEMA_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
	Processing object type SCHEMA_EXPORT/TABLE/INDEX/DOMAIN_INDEX/INDEX
	Processing object type SCHEMA_EXPORT/MATERIALIZED_VIEW
	Processing object type SCHEMA_EXPORT/DIMENSION
	Job "SYS"."SYS_IMPORT_FULL_01" completed with 2 error(s) at Wed Jan 2 23:44:46 2018 elapsed 0 00:00:32

	[oracle@host01 ~]$ 
	
There is no action for the two errors.

	1.There is not Role: CWM_USER

	2.External table :  "SH"."SALES_TRANSACTIONS_EXT"

### Check the result

11g:

	SQL> select count(*) from dba_segments where owner in ('SH');
	  COUNT(*)
	----------
		   180
	SQL> 

12c：

	SYS@pdbprod3> select count(*) from dba_segments where owner in ('SH');
	  COUNT(*)
	----------
		   180
	SYS@pdbprod3> 

	
++++++++++++++++ EOF LinHong ++++++++++++++++	





