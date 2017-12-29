---
layout: post
title: "[Original]Import Oracle Sample schema and create big test table and Test"
category: Oracle
tags: Oracle Schema
---

* content
{:toc}


### [Original]Import Oracle Sample schema and create big test table and Test

How to import the sample schema if you did not install the sample schema while installed the Database product?

How to create big table for test?

How to use STS/SPA/SAA to get the partition advisor and use Online re-defined to change table type(interval partition)?

Simply describe the steps...









### Step 1. Download Sample Schema&Data file and Install

The OS and database are as the following version.

	SYS@orcl11g> !cat /etc/redhat-release
	Red Hat Enterprise Linux Server release 7.3 (Maipo)
	SYS@orcl11g> select * from v$version;
	BANNER
	--------------------------------------------------------------------------------
	Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	PL/SQL Release 11.2.0.4.0 - Production
	CORE    11.2.0.4.0      Production
	TNS for Linux: Version 11.2.0.4.0 - Production
	NLSRTL Version 11.2.0.4.0 - Production
	SYS@orcl11g> !uname -n
	databasevm001                                                                                                                    
	SYS@orcl11g> !uname -a
	Linux databasevm001 4.1.12-61.1.28.el7uek.x86_64 #2 SMP Thu Feb 23 19:55:12 PST 2017 x86_64 x86_64 x86_64 GNU/Linux
	SYS@orcl11g>



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

#### Personal PC's virtual box

Test table sh.sales:

	| USERS | SALES[Tab] | 3980MB

#### Execute Time:

	SH@orcl11g> @query_io.sql                                                                                                        
	no rows selected
	Elapsed: 00:01:08.56
	SH@orcl11g> 
	SH@orcl11g> @query_cpu.sql                                                                                                       
	no rows selected
	Elapsed: 00:01:02.10
	SH@orcl11g> 

	
Use STS/SPA/SAA to advise which type partition to use to improve performance.

Execute the step[Online Redefine DBMS_REDEFINITION change normal table to partition table.] 
	
	SH@orcl11g> alter session force parallel query parallel 8; 
	SH@orcl11g> @query_io.sql                                                                                                        
	no rows selected
	Elapsed: 00:00:00.54
	SH@orcl11g> @query_cpu.sql                                                                                                       
	no rows selected
	Elapsed: 00:00:00.04
	SH@orcl11g> 
	
	
	
	
### User STS/SPA/SAA to advisor partition table

#### Create STS via sql_id and plan_hash_value

The sh user should have the privilege as following.

	grant ADMINISTER SQL TUNING SET to sh; 
	grant advisor to sh;

The Simple Steps are as below.

#### a. Confirm the sql_id, child_number, plan_hash_value from lib cache and check the execute plan in detail. 
	
	SH@orcl11g> SELECT sql_id,child_number,a.plan_hash_value FROM v$sql a WHERE sql_text LIKE 'WITH %' AND a.parsing_schema_name='SH';
	SQL_ID        CHILD_NUMBER PLAN_HASH_VALUE
	------------- ------------ ---------------
	f1f014xz59nu9            0      3264974486
	78z4mjy4xrdvg            0      4097097465
	SH@orcl11g> 

	SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR('f1f014xz59nu9',0,'ALL'));
	
#### b. Create SQL Tuning Set(STS) and load the sql_id into the STS. 
	
	SH@orcl11g> EXEC DBMS_SQLTUNE.CREATE_SQLSET(sqlset_name => 'STS_SALES', description => 'STS for sql_id f1f014xz59nu9');          
	PL/SQL procedure successfully completed.
	SH@orcl11g> 

	SYS@orcl11g>                                                                                        
	DECLARE                                                                                                                          
	  cursor1 DBMS_SQLTUNE.SQLSET_CURSOR;                                                                                            
	BEGIN                                                                                                                            
	  OPEN cursor1 FOR SELECT VALUE(p)                                                                                               
	  FROM TABLE(DBMS_SQLTUNE.SELECT_CURSOR_CACHE('sql_id = ''f1f014xz59nu9'' and plan_hash_value=''3264974486''')) p;                 
	  DBMS_SQLTUNE.LOAD_SQLSET(sqlset_name => 'STS_SALES', populate_cursor => cursor1);                                              
	  CLOSE cursor1;                                                                                                                 
	END;                                                                                                                             
	/          
	
	PL/SQL procedure successfully completed.
	SYS@orcl11g>    
	
	SH@orcl11g> SELECT sql_id, plan_hash_value FROM TABLE(DBMS_SQLTUNE.SELECT_SQLSET('STS_SALES'));                                  
	SQL_ID        PLAN_HASH_VALUE
	------------- ---------------
	f1f014xz59nu9      3264974486
	SH@orcl11g>   
	
#### c. Create SQL Tuning Advisor task for the STS we have just created and then execute the task. 
	(It will take some time.)
		
	SH@orcl11g> 
	DECLARE                                                                                                                          
	  stmt_task VARCHAR2(64);                                                                                                        
	BEGIN                                                                                                                            
	  stmt_task:=dbms_sqltune.create_tuning_task(sqlset_name => 'STS_SALES', time_limit => 3600, task_name => 'STA_SALES', description => 'Task to tune sql_id f1f014xz59nu9');
	END;                                                                                                                        
	/  
	
	PL/SQL procedure successfully completed.
	SH@orcl11g>  
	
	SH@orcl11g> EXECUTE dbms_sqltune.execute_tuning_task('STA_SALES');
	PL/SQL procedure successfully completed.
	SH@orcl11g>
	
#### d. Check the Output result via SQL Tuning Advisor(STA).
	
	SH@orcl11g> SET linesize 150 LONG 999999 pages 1000 longchunksize 999999
	SH@orcl11g> SELECT dbms_sqltune.report_tuning_task('STA_SALES') FROM dual;       
	
	~More Detail~
	
	Or use show_recm procedure to simply show the advisor contents.
	
	[Referent the link for the show_recm procedure](https://docs.oracle.com/cd/B28359_01/server.111/b28274/advisor.htm#PFGRF008)

	SH@orcl11g> EXEC show_recm('STA_SALES');                                                                                         
	=========================================
	Task_name = STA_SALES
	Action ID: 1
	Command : ACCEPT SQL PROFILE
	Attr1 (name)      : STA_SALES
	Attr2 (tablespace): 2
	Attr3             : SQL PROFILE
	Attr4             :
	Attr5             :
	----------------------------------------
	Action ID: 2
	Command : CREATE INDEX
	Attr1 (name)      : SH.IDX$$_005E0001
	Attr2 (tablespace):
	Attr3             : SH.SALES
	Attr4             : BTREE
	Attr5             :
	----------------------------------------
	Action ID: 3
	Command : CREATE SQL PLAN BASELINE
	Attr1 (name)      : STA_SALES
	Attr2 (tablespace): 2
	Attr3             : 15426410
	Attr4             :
	Attr5             :
	----------------------------------------
	=========END RECOMMENDATIONS============

	PL/SQL procedure successfully completed.

	SH@orcl11g> 
	
#### e. Use the DBMS_ADVISOR.QUICK_TUNE procedure to show the SQL Access Advisor (SAA) output.

	SH@orcl11g>
	DECLARE                                                                                                                          
	  task_id NUMBER;                                                                                                                
	  task_name VARCHAR2(30);                                                                                                        
	  sts_name VARCHAR2(30);                                                                                                         
	BEGIN                                                                                                                            
	  task_name := 'SAA_SALES';                                                                                                      
	  sts_name:='STS_SALES';                                                                                                         
	  DBMS_ADVISOR.CREATE_TASK('SQL Access Advisor', task_id, task_name, 'Task for sql_id f1f014xz59nu9');                           
	  DBMS_ADVISOR.ADD_STS_REF(task_name, 'SH', sts_name);                                                                           
	  DBMS_ADVISOR.EXECUTE_TASK(task_name);                                                                                          
	END;                                                                                                                             
	/
	SH@orcl11g>  
	SH@orcl11g> EXEC show_recm('SAA_SALES');                                                                                         
	=========================================
	Task_name = SAA_SALES
	Action ID: 1
	Command : RETAIN INDEX
	Attr1 (name)      : "SH"."PRODUCTS_PK"
	Attr2 (tablespace):
	Attr3             : "SH"."PRODUCTS"
	Attr4             : BTREE
	Attr5             :
	----------------------------------------
	Action ID: 2
	Command : RETAIN INDEX
	Attr1 (name)      : "SH"."CHANNELS_PK"
	Attr2 (tablespace):
	Attr3             : "SH"."CHANNELS"
	Attr4             : BTREE
	Attr5             :
	----------------------------------------
	Action ID: 3
	Command : CREATE INDEX
	Attr1 (name)      : "SH"."SALES_IDX$$_00640000"
	Attr2 (tablespace):
	Attr3             : "SH"."SALES"
	Attr4             : BITMAP
	Attr5             :
	----------------------------------------
	=========END RECOMMENDATIONS============

	PL/SQL procedure successfully completed.

	SH@orcl11g>
	
We can reset the task parameter for index/table/partition/mview etc. and re-execute the task.

	EXEC DBMS_ADVISOR.RESET_TASK('SAA_SALES');
	EXEC DBMS_ADVISOR.SET_TASK_PARAMETER('SAA_SALES','ANALYSIS_SCOPE','TABLE, PARTITION');
	or
	EXEC DBMS_ADVISOR.RESET_TASK('SAA_SALES');
	EXEC DBMS_ADVISOR.SET_TASK_PARAMETER('SAA_SALES','ANALYSIS_SCOPE','INDEX, TABLE, PARTITION');
	EXEC DBMS_ADVISOR.EXECUTE_TASK('SAA_SALES');


	SH@orcl11g> EXEC DBMS_ADVISOR.RESET_TASK('SAA_SALES');                                                                           
	PL/SQL procedure successfully completed.
	SH@orcl11g> EXEC DBMS_ADVISOR.SET_TASK_PARAMETER('SAA_SALES','ANALYSIS_SCOPE','TABLE, PARTITION');                               
	PL/SQL procedure successfully completed.
	SH@orcl11g> 
	
	SH@orcl11g> SET serveroutput ON SIZE 999999                                                                                      
	SH@orcl11g> EXEC show_recm('SAA_SALES');                                                                                         
	=========================================
	Task_name = SAA_SALES
	Action ID: 1
	Command : PARTITION TABLE
	Attr1 (name)      : "SH"."SALES"
	Attr2 (tablespace):
	Attr3             : ("TIME_ID")
	Attr4             : INTERVAL
	Attr5             :
	----------------------------------------
	Action ID: 2
	Command : RETAIN INDEX
	Attr1 (name)      : "SH"."PRODUCTS_PK"
	Attr2 (tablespace):
	Attr3             : "SH"."PRODUCTS"
	Attr4             : BTREE
	Attr5             :
	----------------------------------------
	Action ID: 3
	Command : RETAIN INDEX
	Attr1 (name)      : "SH"."PRODUCTS_PROD_CAT_IX"
	Attr2 (tablespace):
	Attr3             : "SH"."PRODUCTS"
	Attr4             : BTREE
	Attr5             :
	----------------------------------------
	=========END RECOMMENDATIONS============

	PL/SQL procedure successfully completed.

	SH@orcl11g>          
	
#### f. Drop the STS/STA/SAA
	
	EXEC DBMS_SQLTUNE.DROP_TUNING_TASK('STA_SALES');
	EXEC DBMS_ADVISOR.DELETE_TASK('SAA_SALES');
	EXEC DBMS_SQLTUNE.DROP_SQLSET('STS_SALES');

### Online Redefine DBMS_REDEFINITION change normal table to partition table.

#### Check whether the table can be redefined or not.

	SYS@orcl11g> EXEC DBMS_REDEFINITION.CAN_REDEF_TABLE('SH','SALES');                                                               
	BEGIN DBMS_REDEFINITION.CAN_REDEF_TABLE('SH','SALES'); END;
	*
	ERROR at line 1:
	ORA-12089: cannot online redefine table "SH"."SALES" with no primary key
	ORA-06512: at "SYS.DBMS_REDEFINITION", line 143
	ORA-06512: at "SYS.DBMS_REDEFINITION", line 1635
	ORA-06512: at line 1
	SYS@orcl11g> EXEC DBMS_REDEFINITION.CAN_REDEF_TABLE('SH','SALES',2);                                                             
	PL/SQL procedure successfully completed.
	SYS@orcl11g>   

Due to there is NOT primary key in the sales table, the table can onlybe redefined via Rowid 


	SYS@orcl11g> exec DBMS_REDEFINITION.ABORT_REDEF_TABLE ('SH','SALES','SALES_TEMP');
	PL/SQL procedure successfully completed.
	SYS@orcl11g> exec DBMS_REDEFINITION.START_REDEF_TABLE('SH','SALES','SALES_TEMP',null,2);
	PL/SQL procedure successfully completed.
	SYS@orcl11g> SYS@orcl11g> exec DBMS_REDEFINITION.SYNC_INTERIM_TABLE (uname => 'sh',orig_table  => 'sales',int_table  => 'sales_temp');
	PL/SQL procedure successfully completed.
	SYS@orcl11g> EXEC DBMS_STATS.gather_table_stats('sh', 'sales_temp', cascade => TRUE);
	PL/SQL procedure successfully completed.
	SYS@orcl11g> EXEC DBMS_REDEFINITION.FINISH_REDEF_TABLE(uname => 'sh',orig_table => 'sales',int_table => 'sales_temp');
	PL/SQL procedure successfully completed.
	SYS@orcl11g>

Check the results:

	SH@orcl11g> SELECT table_name, partition_name, high_value, num_rows FROM   user_tab_partitions where table_name = 'SALES' ORDER BY table_name, partition_name ; 	
	~~ ....  ~~
		49 rows selected.
	SH@orcl11g>    

	
### Other

#### Check current setting regarding Tuning Advisor

	COLUMN parameter_value FORMAT A30 
	SELECT parameter_name, parameter_value FROM dba_advisor_parameters  WHERE task_name = 'SYS_AUTO_SQL_TUNING_TASK'  AND parameter_name IN ('TIME_LIMIT', 'DEFAULT_EXECUTION_TYPE',  'LOCAL_TIME_LIMIT');

#### Increate the limited time to 7200 seconds.

	BEGIN 
	  DBMS_SQLTUNE.SET_TUNING_TASK_PARAMETER(task_name => 'SYS_AUTO_SQL_TUNING_TASK', parameter => 'TIME_LIMIT', value => 7200); 
	END;
	/

#### Check current setting.

	select client_name,status from DBA_AUTOTASK_CLIENT;

#### Disable Tuning Advisor

	BEGIN 

	dbms_auto_task_admin.disable(
		client_name => 'sql tuning advisor',
		operation   => NULL,
		window_name => NULL);
	END;
	/	
	
#### Enable Tuning Advisor

	BEGIN
	dbms_auto_task_admin.enable(
		client_name => 'sql tuning advisor',
		operation   => NULL,
		window_name => NULL);
	END;
	/

#### Get the Tuning Advisor via sql_id:f1f014xz59nu9

a. Create Tuning Task
	
	DECLARE
	  l_sql_tune_task_id  VARCHAR2(100);
	BEGIN
	  l_sql_tune_task_id := DBMS_SQLTUNE.create_tuning_task (
							  sql_id      => 'f1f014xz59nu9',
							  scope       => DBMS_SQLTUNE.scope_comprehensive,
							  time_limit  => 500,
							  task_name   => 'f1f014xz59nu9_tuning_task11',
							  description => 'Tuning task1 for query io statement f1f014xz59nu9');
	  DBMS_OUTPUT.put_line('l_sql_tune_task_id: ' || l_sql_tune_task_id);
	END;
	/


b. Execute Tuning task:

	EXEC DBMS_SQLTUNE.execute_tuning_task(task_name => 'f1f014xz59nu9_tuning_task11'); 

c. Output the Tuning advisor report.(Maybe it will take some time due to the executed sql)

	set long 60000
	set longchunksize 60000
	set linesize 1000
	select dbms_sqltune.report_tuning_task('f1f014xz59nu9_tuning_task11') from dual;

d. Check list of tuning task present in database:

	SELECT TASK_NAME, STATUS FROM DBA_ADVISOR_LOG WHERE TASK_NAME = 'f1f014xz59nu9_tuning_task11' ;

e. Drop tuning task

	execute dbms_sqltune.drop_tuning_task('f1f014xz59nu9_tuning_task11');

### Error


#### Error: ORA-23539: table "SH"."SALES" currently being redefined

There is ORA-23539 while starting redefine table just like the following error.

	SYS@orcl11g> exec DBMS_REDEFINITION.START_REDEF_TABLE('sh','sales','sales_temp',null,2);                                         
	BEGIN DBMS_REDEFINITION.START_REDEF_TABLE('sh','sales','sales_temp',null,2); END;

	*
	ERROR at line 1:
	ORA-23539: table "SH"."SALES" currently being redefined
	ORA-06512: at "SYS.DBMS_REDEFINITION", line 56
	ORA-06512: at "SYS.DBMS_REDEFINITION", line 1498
	ORA-06512: at line 1

Solution： for test enviroment-----> Do Not use the solution in Production enviroment!

	1. Abort 

		exec DBMS_REDEFINITION.ABORT_REDEF_TABLE ('SH','SALES','SALES_TEMP');

	2. Table Re Org ORA-32422: Commit SCN-based Materialized View Log Cannot Be Created On Table (Doc ID 2300652.1)

		conn as sys as sysdba
		create table sumdelta_backup as select * from sumdelta$;
		select * from sys.sumdelta$ where TABLEOBJ# in (select OBJ# from sys.obj$ where name IN ('SALES' ) );
		delete from sys.sumdelta$ where TABLEOBJ# in (select OBJ# from sys.obj$ where name IN ('SALES' ) )
		make sure that same number of rows deleted as per the query above. If not rollback.
		commit;

		exec DBMS_REDEFINITION.ABORT_REDEF_TABLE ('SH','SALES','SALES_TEMP');
	
Use the reference document.

[Oracle在线重定义DBMS_REDEFINITION 普通表—>分区表](http://www.cnblogs.com/jyzhao/p/3876634.html)	
	
++++++++++++++++ EOF LinHong ++++++++++++++++	





