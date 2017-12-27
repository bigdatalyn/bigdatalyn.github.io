---
layout: post
title: "[Original]Import Oracle Sample schema and create big test table"
category: Oracle
tags: Oracle Schema
---

* content
{:toc}


### [Original]Import Oracle Sample schema and create big test table

How to import the sample schema if you did not install the sample schema while installed the Database product?

How to create big table for test?

Simple to describe the steps...









### Step 1. Download Sample Schema&Data file and Install

If have already installed the example schema, Please skip this step.

[Oracle Database 11g Release 2 Examples ](http://www.oracle.com/technetwork/database/enterprise-edition/downloads/112010-linx8664soft-100572.html)

	ls -ltr $ORACLE_HOME/demo/schema/human_resources

	ls -ltr $ORACLE_HOME/demo/schema/bus_intelligence

	ls -ltr $ORACLE_HOME/demo/schema/shipping

	ls -ltr $ORACLE_HOME/demo/schema/info_exchange

	ls -ltr $ORACLE_HOME/demo/schema/sales_history

	ls -ltr $ORACLE_HOME/demo/schema/product_media

	ls -ltr $ORACLE_HOME/demo/schema/order_entry

#### Install guild

[11g Database Examples Installation Guide](https://docs.oracle.com/cd/E11882_01/server.112/e10831/installation.htm#COMSC001)

[12c Installing Sample Schemas](https://docs.oracle.com/database/121/COMSC/installation.htm#COMSC001)

#### Schema Diagrams 

[Schema Diagrams](http://docs.oracle.com/cd/E82638_01/COMSC/schema-diagrams.htm#COMSC00016)

Figure 3-3 Sample Schema SH

![Sample Schema SH]({{ "https://docs.oracle.com/cd/E82638_01/COMSC/img/GUID-E29B836C-9576-40D4-9F71-1B463E8947D0-default.gif"}})	

#### Simply Install Guild

Use the response file to install sample schema.

#####  a. Edit the response just like as below.

Reference the detail in the response file while you do NOT understand the parameters.

Sample:

	[oracle@databasevm001 response]$ pwd
	/vagrant/linux.x64_11gR2_examples/examples/response
	[oracle@databasevm001 response]$ cat demos_install.rsp | grep -v "^#"
	ORACLE_HOSTNAME=databasevm001
	UNIX_GROUP_NAME=oinstall
	INVENTORY_LOCATION=/u01/app/oracle/product/11.2.0.4/dbhome_1/inventory
	SELECTED_LANGUAGES=en,ja
	ORACLE_HOME=/u01/app/oracle/product/11.2.0.4/dbhome_1
	ORACLE_BASE=/u01/app/oracle
	[oracle@databasevm001 response]$

##### b. Execute the runInstaller

Sample logs:

	[oracle@databasevm001 examples]$ pwd
	/vagrant/linux.x64_11gR2_examples/examples
	[oracle@databasevm001 examples]$ ls -ltr
	total 19
	-rwxrwxrwx. 1 vagrant vagrant 3230 Aug 15  2009 runInstaller
	-rwxrwxrwx. 1 vagrant vagrant 3419 Aug 17  2009 welcome.html
	drwxrwxrwx. 1 vagrant vagrant 4096 Dec 27 02:24 doc
	drwxrwxrwx. 1 vagrant vagrant 4096 Dec 27 02:24 install
	drwxrwxrwx. 1 vagrant vagrant 4096 Dec 27 02:24 stage
	drwxrwxrwx. 1 vagrant vagrant    0 Dec 27 02:31 response
	[oracle@databasevm001 examples]$ ./runInstaller -silent -responseFile /vagrant/linux.x64_11gR2_examples/examples/response/demos_install.rsp
	Starting Oracle Universal Installer...

	Checking Temp space: must be greater than 120 MB.   Actual 24255 MB    Passed
	Checking swap space: must be greater than 150 MB.   Actual 4095 MB    Passed
	Preparing to launch Oracle Universal Installer from /tmp/OraInstall2017-12-27_02-40-17AM. Please wait ...[oracle@databasevm001 examples]$ 
	[oracle@databasevm001 examples]$ [WARNING] [INS-13014] Target environment do not meet some optional requirements.
	   CAUSE: Some of the optional prerequisites are not met. See logs for details. /u01/app/oraInventory/logs/installActions2017-12-27_02-40-17AM.log
	   ACTION: Identify the list of failed prerequisite checks from the log: /u01/app/oraInventory/logs/installActions2017-12-27_02-40-17AM.log. Then either from the log file or from installation manual find the appropriate configuration to meet the prerequisites and fix it manually.
	[WARNING] [INS-13014] Target environment do not meet some optional requirements.
	   CAUSE: Some of the optional prerequisites are not met. See logs for details. /u01/app/oraInventory/logs/installActions2017-12-27_02-40-17AM.log
	   ACTION: Identify the list of failed prerequisite checks from the log: /u01/app/oraInventory/logs/installActions2017-12-27_02-40-17AM.log. Then either from the log file or from installation manual find the appropriate configuration to meet the prerequisites and fix it manually.
	You can find the log of this install session at:
	 /u01/app/oraInventory/logs/installActions2017-12-27_02-40-17AM.log
	[WARNING] [INS-13014] Target environment do not meet some optional requirements.
	   CAUSE: Some of the optional prerequisites are not met. See logs for details. /u01/app/oraInventory/logs/installActions2017-12-27_02-40-17AM.log
	   ACTION: Identify the list of failed prerequisite checks from the log: /u01/app/oraInventory/logs/installActions2017-12-27_02-40-17AM.log. Then either from the log file or from installation manual find the appropriate configuration to meet the prerequisites and fix it manually.
	Successfully Setup Software.
	
	
Or use the option: -ignorePrereq	

	./runInstaller -silent -responseFile /vagrant/linux.x64_11gR2_examples/examples/response/demos_install.rsp -ignorePrereq

##### c. Use the manual install guild to install sample schema
	
[Manual Install Guild](https://docs.oracle.com/cd/E11882_01/server.112/e10831/installation.htm#COMSC001)
	
Sample steps for install sh schema:
	
	[oracle@databasevm001 sales_history]$ sqlplus / as sysdba                                                                        

	SQL*Plus: Release 11.2.0.4.0 Production on Wed Dec 27 03:02:31 2017

	Copyright (c) 1982, 2013, Oracle.  All rights reserved.


	Connected to:
	Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options

	SQL> @sh_main.sql                                                                                                                
	specify password for SH as parameter 1:
	Enter value for 1: sh                                                                                                            
	specify default tablespace for SH as parameter 2:
	Enter value for 2: users                                                                                                         
	specify temporary tablespace for SH as parameter 3:
	Enter value for 3: temp                                                                                                          
	specify password for SYS as parameter 4:
	Enter value for 4: oracle                                                                                                        
	specify directory path for the data files as parameter 5:
	Enter value for 5: $ORACLE_HOME/demo/schema/sales_history/                                                                       
	writeable directory path for the log files as parameter 6:
	Enter value for 6: $ORACLE_HOME/demo/schema/log/                                                                                 
	specify version as parameter 7:
	Enter value for 7: v3                                                                                                            

	Session altered.

	~~~~~~

##### d. Tar packages and copy the file to other server for executing the example schema now.
	
	[oracle@databasevm001 schema]$ tar -zcvf /u01/app/oracle/product/11.2.0.4/dbhome_1/demo/schema/sales_history.tar.gz /u01/app/oracle/product/11.2.0.4/dbhome_1/demo/schema/sales_history/
	[oracle@databasevm001 schema]$ du -sm sales_history.tar.gz                                                                       
	23      sales_history.tar.gz
	[oracle@databasevm001 schema]
	
	
##### e. We can see the sh schema's tables now.

	12:36:13 SH@dbpoc1> set pagesize 1000 linesize 1000
	12:36:24 SH@dbpoc1> col table_name for a40
	12:36:37 SH@dbpoc1> select table_name from user_tables;
	TABLE_NAME
	----------------------------------------
	DIMENSION_EXCEPTIONS
	CAL_MONTH_SALES_MV
	FWEEK_PSCAT_SALES_MV
	TIMES
	PRODUCTS
	CHANNELS
	PROMOTIONS
	CUSTOMERS
	COUNTRIES
	SUPPLEMENTARY_DEMOGRAPHICS
	SALES_TRANSACTIONS_EXT
	COSTS
	SALES
	13 rows selected.
	12:36:39 SH@dbpoc1> 


	
	
### Step 2. Prepare the test datas in sh schema.

#### Confirm the RAC Instance info.

We use the RAC to test.

	[id149398@hotarudb01 ~](dbpoc1)$ srvctl config database -d dbpoc
	Database unique name: dbpoc
	Database name: dbpoc
	Oracle home: /u01/app/oracle/product/11.2.0.4/dbhome_1
	Oracle user: oracle
	Spfile: +DATA/dbpoc/spfiledbpoc.ora
	Domain: 
	Start options: open
	Stop options: immediate
	Database role: PRIMARY
	Management policy: AUTOMATIC
	Server pools: dbpoc
	Database instances: dbpoc1,dbpoc2,dbpoc3
	Disk Groups: DATA
	Mount point paths: 
	Services: 
	Type: RAC
	Database is administrator managed
	[id149398@hotarudb01 ~](dbpoc1)$ 

The Sh schema use the DATA tablespace.
	
	12:42:04 SYS@dbpoc1> select USERNAME,DEFAULT_TABLESPACE from dba_users where username = 'SH';
	USERNAME		       DEFAULT_TABLESPACE
	------------------------------ ------------------------------
	SH			       DATA
	12:42:25 SYS@dbpoc1> 

#### Create the sales table_name

Rename the sales to sales_org and create the new sales table.

	SH@dbpoc1> rename SALES to SALES_ORG;
	Table renamed.
	CREATE TABLE "SH"."SALES"
	   (    "PROD_ID" NUMBER NOT NULL ENABLE,
			"CUST_ID" NUMBER NOT NULL ENABLE,
			"TIME_ID" DATE NOT NULL ENABLE,
			"CHANNEL_ID" NUMBER NOT NULL ENABLE,
			"PROMO_ID" NUMBER NOT NULL ENABLE,
			"QUANTITY_SOLD" NUMBER(10,2) NOT NULL ENABLE,
			"AMOUNT_SOLD" NUMBER(10,2) NOT NULL ENABLE,
			"DUMMY1" CHAR(100),
			"DUMMY2" CHAR(110)
	);

	Table created.

	insert /*+append */ into SH.SALES
	  nologging
		select PROD_ID,
			   CUST_ID,
			   TIME_ID+15*365+3,
			   CHANNEL_ID,
			   PROMO_ID,
			   QUANTITY_SOLD,
			   AMOUNT_SOLD,
			   rpad(to_char(mod(CUST_ID,30)),100,'dummy1'),
			   rpad(to_char(mod(CUST_ID,30)),110,'dummy2')
		  from SH.SALES_ORG;
	commit;
	918843 rows created.
	SH@dbpoc1> 
	Commit complete.
	SH@dbpoc1> col segment_name for a32
	SH@dbpoc1> select SEGMENT_NAME, BYTES/1024/1024 from USER_SEGMENTS where SEGMENT_NAME='SALES' ;
	SEGMENT_NAME			 BYTES/1024/1024
	-------------------------------- ---------------
	SALES					     252
	SH@dbpoc1> 

Insert 32g data via insert append.	
	
	SH@dbpoc1> show parameter cpu_count
	NAME				     TYPE			       VALUE
	------------------------------------ --------------------------------- ------------------------------
	cpu_count			     integer			       28
	SH@dbpoc1> alter session force parallel dml parallel 28 ;
	Session altered.
	SH@dbpoc1> alter session force parallel query parallel 28 ;
	Session altered.
	SH@dbpoc1> insert /*+append */ into SH.SALES nologging select * from SH.SALES;
	918843 rows created.
	SH@dbpoc1> commit;
	Commit complete.
	SH@dbpoc1> insert /*+append */ into SH.SALES nologging select * from SH.SALES;
	1837686 rows created.
	SH@dbpoc1> commit;
	Commit complete.
	SH@dbpoc1> insert /*+append */ into SH.SALES nologging select * from SH.SALES;
	3675372 rows created.
	SH@dbpoc1> commit;
	Commit complete.
	SH@dbpoc1> insert /*+append */ into SH.SALES nologging select * from SH.SALES;
	7350744 rows created.
	SH@dbpoc1> commit;
	Commit complete.
	SH@dbpoc1> insert /*+append */ into SH.SALES nologging select * from SH.SALES;
	14701488 rows created.
	SH@dbpoc1> commit;
	Commit complete.
	SH@dbpoc1> insert /*+append */ into SH.SALES nologging select * from SH.SALES;
	29402976 rows created.
	SH@dbpoc1> commit;
	Commit complete.
	SH@dbpoc1> insert /*+append */ into SH.SALES nologging select * from SH.SALES;
	58805952 rows created.
	SH@dbpoc1> commit;
	Commit complete.
	SH@dbpoc1> 
	SH@dbpoc1> select SEGMENT_NAME, BYTES/1024/1024 from USER_SEGMENTS where SEGMENT_NAME='SALES' ;
	SEGMENT_NAME			 BYTES/1024/1024
	-------------------------------- ---------------
	SALES					   32352
	SH@dbpoc1> 


Execte the test sql:

	SH@dbpoc1> !cat cpu_001.sql
	WITH /*+MONITOR */
	DUMMY_SALES AS
	( select * from (select 0 from CHANNELS ) D1, sales D2),
	SACOMMON1340 AS
	(  select sum(T220.AMOUNT_SOLD) as c1, sum(T220.QUANTITY_SOLD) as c2,
			 T147.CHANNEL_CLASS as c3, T228.CALENDAR_QUARTER_DESC as c4,
			 T228.CALENDAR_YEAR as c5, T185.PROD_CATEGORY as c6
		from CHANNELS T147, PRODUCTS T185,
			 DUMMY_SALES T220, TIMES T228
	   where ( T220.TIME_ID < to_date('2014/01/01','YYYY/MM/DD')
		 and T228.TIME_ID = T220.TIME_ID
		 and T147.CHANNEL_ID = T220.CHANNEL_ID
		 and T185.PROD_ID = T220.PROD_ID)
	   group by T147.CHANNEL_CLASS, 
				T185.PROD_CATEGORY, 
				T228.CALENDAR_QUARTER_DESC, 
				T228.CALENDAR_YEAR),
	SAWITH0 AS
	(  select distinct 0 as c1, D1.c3 as c2, D1.c4 as c3, D1.c5 as c4,
					  D1.c6 as c5, D1.c2 as c6, D1.c1 as c7, cast(NULL as DOUBLE PRECISION ) as c8
	  from SACOMMON1340 D1), 
	SAWITH1 AS
	(  select D1.c1 as c1, D1.c2 as c2, D1.c3 as c3, D1.c4 as c4,
			 D1.c5 as c5, D1.c6 as c6, D1.c7 as c7, D1.c8 as c8, sum(D1.c7) as c9
	  from SAWITH0 D1 
	  group by D1.c1, D1.c2, D1.c3, D1.c4, D1.c5, D1.c6, D1.c7, D1.c8),
	SAWITH2 AS
	(  select distinct 1 as c1, D1.c3 as c2, D1.c4 as c3, D1.c5 as c4,
			 D1.c6 as c5, D1.c2 as c6, D1.c1 as c7
	  from SACOMMON1340 D1),
	SAWITH3 AS
	(  select D1.c1 as c1, D1.c2 as c2, D1.c3 as c3, D1.c4 as c4,
			 D1.c5 as c5, D1.c6 as c6, D1.c7 as c7, sum(D1.c6) as c8, sum(D1.c7) as c9
	  from SAWITH2 D1 
	  group by D1.c1, D1.c2, D1.c3, D1.c4, D1.c5, D1.c6, D1.c7), 
	SAWITH4 AS
	((    select D1.c1 as c1, D1.c2 as c2, D1.c3 as c3, D1.c4 as c4, D1.c5 as c5,
			   D1.c6 as c6, D1.c7 as c7, D1.c8 as c8, 
			   sum(D1.c9) over (partition by D1.c3, D1.c4, D1.c5) as c9
		  from SAWITH1 D1
		union all
		select D1.c1 as c1, D1.c2 as c2, D1.c3 as c3, D1.c4 as c4, D1.c5 as c5,
			   D1.c6 as c6, D1.c7 as c7, 
			   sum(D1.c8) over (partition by D1.c3, D1.c4, D1.c5) as c8,
			   sum(D1.c9) over (partition by D1.c3, D1.c4, D1.c5) as c9
		  from SAWITH3 D1   ))
	select D1.c1 as c1, D1.c2 as c2, D1.c3 as c3, D1.c4 as c4, D1.c5 as c5, 
		   D1.c6 as c6, D1.c7 as c7, D1.c8 as c8, D1.c9 as c9
	from SAWITH4 D1 order by c1, c3, c5, c4;


	SH@dbpoc1> 
		
We can use sql monitor to check the execution for these sql.	
	
Sql monitor:

> a.sql have been executeed by parallel.

> b.the execution time have over 5 seconds.

Usually, we use the following sql to spool the sql monitor html file with sql_id.

Terminal 01: Capture the sql_id.

	select sql_id, username, substr(sql_text,1,50) from v$sql_monitor;

Terminal 02: Spool the output html file sql_id.

	SET LONG 1000000 LONGCHUNKSIZE 1000000 LINESIZE 1000 PAGESIZE 0
	SET TRIM ON TRIMSPOOL ON ECHO OFF FEEDBACK OFF
	SPOOL /home/oracle/f6c3uz1jh2fgg_report_sql_monitor.html
	select dbms_sqltune.report_sql_monitor(sql_id=>'f6c3uz1jh2fgg', type=>'ACTIVE') from dual; 
	SPOOL OFF


### Performance Tuning

To be continue...


++++++++++++++++ EOF LinHong ++++++++++++++++	





