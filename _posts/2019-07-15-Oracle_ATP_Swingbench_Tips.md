---
layout: post
title: "Oracle ATP Swingbench Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle ATP Swingbench Tips




ATP Swingbench

### Reference documents

[Setting up Swingbench for Oracle Autonomous Transaction Processing (ATP)](http://www.dominicgiles.com/blog/files/c84a63640d52961fc28f750570888cdc-169.html)

[Autonmous Transaction Processing](https://oracle.github.io/learning-library/oci-library/L100-LAB/ATP_Lab/ATP_HOL.html)

[Connect with Oracle SQLcl Cloud Connection](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/connect-sqlcl.html#GUID-AC24404D-8D0B-4716-83F6-F0F501318011)

### Command Tips

	./oewizard -cf ~/Wallet_ATPDEMO.zip \
			   -cs ATPDEMO_MEDIUM \
			   -ts DATA \
			   -dbap Welcome#2019 \
			   -dba admin \
			   -u soe \
			   -p Welcome#2019 \
			   -async_off \
			   -scale 5 \
			   -hashpart -create -cl -v

	./sbutil -soe -cf ~/Wallet_ATPDEMO.zip -cs ATPDEMO_MEDIUM -u soe -p Welcome#2019 -tables

Sample:

It took 1:33 hours (Total Run Time) to complete...

	[oracle@inst_demo bin]$ ./oewizard -cf ~/Wallet_ATPDEMO.zip \
	>            -cs ATPDEMO_MEDIUM \
	>            -ts DATA \
	>            -dbap Welcome#2019 \
	>            -dba admin \
	>            -u soe \
	>            -p Welcome#2019 \
	>            -async_off \
	>            -scale 5 \
	>            -hashpart -create -cl -v
	SwingBench Wizard
	Author  :        Dominic Giles
	Version :        2.6.0.1082

	Running in Lights Out Mode using config file : ../wizardconfigs/oewizard.xml
	Connecting to : jdbc:oracle:thin:@ATPDEMO_MEDIUM
	Connected
	Running script ../sql/soedgcreateuser.sql
	The following statement failed : GRANT MANAGE SCHEDULER to soe : Due to : ORA-01031: insufficient privileges
	The following statement failed : BEGIN
	  $IF DBMS_DB_VERSION.VER_LE_11_2
	  $THEN
		null;
	  $ELSE
					-- The Following enables concurrent stats collection on Oracle Database 12c and Oracle Database 18c
					EXECUTE IMMEDIATE 'GRANT ALTER SYSTEM TO soe';
					DBMS_RESOURCE_MANAGER_PRIVS.GRANT_SYSTEM_PRIVILEGE(
							GRANTEE_NAME   => 'soe',
							PRIVILEGE_NAME => 'ADMINISTER_RESOURCE_MANAGER',
							ADMIN_OPTION   => FALSE);
			$END
	END; : Due to : ORA-06550: line 8, column 3:
	PLS-00201: identifier 'DBMS_RESOURCE_MANAGER_PRIVS' must be declared
	ORA-06550: line 8, column 3:
	PL/SQL: Statement ignored
	Script completed in 0 hour(s) 0 minute(s) 0 second(s) 974 millisecond(s)
	Starting run
	Starting script ../sql/soedgdrop2.sql
	Script completed in 0 hour(s) 0 minute(s) 0 second(s) 65 millisecond(s)
	Starting script ../sql/soedgcreatetableshash2.sql
	Script completed in 0 hour(s) 0 minute(s) 0 second(s) 762 millisecond(s)
	Starting script ../sql/soedgviews.sql
	Script completed in 0 hour(s) 0 minute(s) 0 second(s) 23 millisecond(s)
	Starting script ../sql/soedgsqlset.sql
	Script completed in 0 hour(s) 0 minute(s) 0 second(s) 716 millisecond(s)
	Inserting data into table ADDRESSES_3750001
	Inserting data into table ADDRESSES_2
	Inserting data into table CUSTOMERS_2500001
	Inserting data into table CUSTOMERS_2
	Completed processing table CUSTOMERS_2 in 0:05:04
	Inserting data into table ORDER_ITEMS_3574475
	Inserting data into table ORDERS_3574476
	Completed processing table CUSTOMERS_2500001 in 0:05:14
	Completed processing table ADDRESSES_3750001 in 0:06:32
	Inserting data into table ORDER_ITEMS_1
	Inserting data into table ORDERS_2
	Completed processing table ADDRESSES_2 in 0:06:44
	Run time 0:12:18 : Running threads (4/4) : Percentage completed : 35.06
	Completed processing table ORDERS_3574476 in 0:18:19
	Inserting data into table CARD_DETAILS_3750001
	Completed processing table ORDER_ITEMS_3574475 in 0:18:22
	Inserting data into table CARD_DETAILS_2
	Completed processing table ORDERS_2 in 0:17:08
	Inserting data into table LOGON_5957461
	Completed processing table ORDER_ITEMS_1 in 0:17:08
	Inserting data into table LOGON_2
	Inserting data into table PRODUCT_INFORMATION
	Completed processing table CARD_DETAILS_3750001 in 0:06:00
	Inserting data into table INVENTORIES
	Completed processing table PRODUCT_INFORMATION in 0:00:00
	Completed processing table CARD_DETAILS_2 in 0:05:59
	Inserting data into table PRODUCT_DESCRIPTIONS
	Completed processing table PRODUCT_DESCRIPTIONS in 0:00:00
	Inserting data into table WAREHOUSES
	Completed processing table WAREHOUSES in 0:00:00
	Completed processing table INVENTORIES in 0:00:08
	Completed processing table LOGON_2 in 0:07:21
	Connection cache closed
	Starting script ../sql/soedganalyzeschema2.sql
	The following statement failed : begin
		declare
			   jobs_count number := 0;
		begin
			select value into jobs_count from v$parameter
			jobs_count where name='job_queue_processes';
			$IF DBMS_DB_VERSION.VER_LE_10_2
			$THEN
			-- Use the default stats collection approach
				dbms_stats.gather_schema_stats(
					OWNNAME=> 'SOE'
					,ESTIMATE_PERCENT=>DBMS_STATS.AUTO_SAMPLE_SIZE
					,BLOCK_SAMPLE=>TRUE
					,METHOD_OPT=>'FOR ALL COLUMNS SIZE SKEWONLY'
					,DEGREE=> 16
					,GRANULARITY=>'ALL'
					,CASCADE=>TRUE);
			$ELSIF DBMS_DB_VERSION.VER_LE_11_2
			$THEN
				 -- Oracle Database 11g release 2. Enable concurrent stats collection
				 dbms_output.put_line('database version is less than or equal to 11.2');
				 DBMS_STATS.SET_GLOBAL_PREFS('CONCURRENT','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','WAREHOUSES','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','INVENTORIES','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','PRODUCT_INFORMATION','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','PRODUCT_DESCRIPTIONS','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','ORDERENTRY_METADATA','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','CUSTOMERS','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','ADDRESSES','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','ORDER_ITEMS','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','ORDERS','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','LOGON','INCREMENTAL','TRUE');
				 DBMS_STATS.GATHER_SCHEMA_STATS('SOE');
			$ELSE
				 -- Oracle Database 12c and Oracle Database 18c. Concurrent Stats collection work slightly different in this release
				 execute immediate q'[ALTER SYSTEM SET RESOURCE_MANAGER_PLAN = 'DEFAULT_PLAN']';
				 if jobs_count < 16 then
					execute immediate q'[ALTER SYSTEM SET JOB_QUEUE_PROCESSES = 16 ]';
				 end if;
				 execute immediate q'[ALTER SYSTEM SET JOB_QUEUE_PROCESSES = 16 ]';
				 DBMS_STATS.SET_GLOBAL_PREFS('CONCURRENT','MANUAL');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','WAREHOUSES','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','INVENTORIES','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','PRODUCT_INFORMATION','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','PRODUCT_DESCRIPTIONS','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','ORDERENTRY_METADATA','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','CUSTOMERS','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','ADDRESSES','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','ORDER_ITEMS','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','ORDERS','INCREMENTAL','TRUE');
				 DBMS_STATS.SET_TABLE_PREFS('SOE','LOGON','INCREMENTAL','TRUE');
				 DBMS_STATS.GATHER_SCHEMA_STATS('SOE');
			$END
		end;
	end; : Due to : ORA-01031: insufficient privileges
	ORA-06512: at line 36
	Script completed in 0 hour(s) 0 minute(s) 0 second(s) 74 millisecond(s)
	Starting script ../sql/soedgconstraints2.sql
	Script completed in 0 hour(s) 20 minute(s) 31 second(s) 879 millisecond(s)
	Starting script ../sql/soedgindexes2.sql
	Script completed in 0 hour(s) 41 minute(s) 21 second(s) 639 millisecond(s)
	Starting script ../sql/soedgsequences2.sql
	Script completed in 0 hour(s) 0 minute(s) 20 second(s) 343 millisecond(s)
	Starting script ../sql/soedgpackage2_header.sql
	Script completed in 0 hour(s) 0 minute(s) 0 second(s) 419 millisecond(s)
	Starting script ../sql/soedgpackage2_body.sql
	Script completed in 0 hour(s) 0 minute(s) 0 second(s) 325 millisecond(s)
	Starting script ../sql/soedgsetupmetadata.sql
	Script completed in 0 hour(s) 0 minute(s) 2 second(s) 830 millisecond(s)

	============================================
	|           Datagenerator Run Stats        |
	============================================
	Connection Time                        0:00:00.002
	Data Generation Time                   0:31:04.614
	DDL Creation Time                      1:02:19.205
	Total Run Time                         1:33:23.825
	Rows Inserted per sec                       32,454
	Data Generated (MB) per sec                    2.6
	Actual Rows Generated                   61,228,985
	Commits Completed                            3,082
	Batch Updates Completed                    306,168

	Connecting to : jdbc:oracle:thin:@ATPDEMO_MEDIUM
	Connected

	Post Creation Validation Report
	===============================
	The schema appears to have been created successfully.

	Valid Objects
	=============
	Valid Tables : 'ORDERS','ORDER_ITEMS','CUSTOMERS','WAREHOUSES','ORDERENTRY_METADATA','INVENTORIES','PRODUCT_INFORMATION','PRODUCT_DESCRIPTIONS','ADDRESSES','CARD_DETAILS'
	Valid Indexes : 'PRD_DESC_PK','PROD_NAME_IX','PRODUCT_INFORMATION_PK','PROD_SUPPLIER_IX','PROD_CATEGORY_IX','INVENTORY_PK','INV_PRODUCT_IX','INV_WAREHOUSE_IX','ORDER_PK','ORD_SALES_REP_IX','ORD_CUSTOMER_IX','ORD_ORDER_DATE_IX','ORD_WAREHOUSE_IX','ORDER_ITEMS_PK','ITEM_ORDER_IX','ITEM_PRODUCT_IX','WAREHOUSES_PK','WHS_LOCATION_IX','CUSTOMERS_PK','CUST_EMAIL_IX','CUST_ACCOUNT_MANAGER_IX','CUST_FUNC_LOWER_NAME_IX','ADDRESS_PK','ADDRESS_CUST_IX','CARD_DETAILS_PK','CARDDETAILS_CUST_IX'
	Valid Views : 'PRODUCTS','PRODUCT_PRICES'
	Valid Sequences : 'CUSTOMER_SEQ','ORDERS_SEQ','ADDRESS_SEQ','LOGON_SEQ','CARD_DETAILS_SEQ'
	Valid Code : 'ORDERENTRY'
	Schema Created
	[oracle@inst_demo bin]$

	


###  Other tips: sqlcl
	
sql connect atp

	[opc@inst_demo ~]$ which sql
	~/sqlcl/bin/sql
	[opc@inst_demo ~]$ sql /nolog

	SQLcl: Release 19.1 Production on Mon Jul 15 07:32:41 2019

	Copyright (c) 1982, 2019, Oracle.  All rights reserved.


	SQL> !ls -tlr
	total 48336
	drwxr-xr-x.  4 opc opc       28 Apr  4 16:18 sqlcl
	drwx------. 12 opc opc     4096 Jun  7 17:39 swingbench
	-rw-rw-r--.  1 opc opc 27573881 Jul 10 05:10 swingbench.zip
	drwxrwxr-x.  3 opc opc       18 Jul 10 08:13 oradiag_opc
	drwxrwxr-x.  3 opc opc     4096 Jul 10 08:47 instance_client
	-rw-rw-r--.  1 opc opc       13 Jul 10 08:54 password.txt
	-rw-rw-r--.  1 opc opc    20033 Jul 10 09:00 Wallet_ATPDEMO.zip
	-rw-rw-r--.  1 opc opc 21886970 Jul 15 07:31 sqlcl-19.1.0.094.1619.zip

	SQL> set cloudconfig Wallet_ATPDEMO.zip
	Operation is successfully completed.
	Operation is successfully completed.
	Using temp directory:/tmp/oracle_cloud_config6220806518546255371
	SQL> connect admin/Welcome#2019@atpdemo_tp
	Connected.
	SQL>

About the size of soe tables/indexes

	[opc@inst_demo bin]$ ora segsize soe

	TABLESPACE_NAME                SEGMENT_NAME                                SIZE_MB
	------------------------------ ---------------------------------------- ----------
	DATA                           PROD_CATEGORY_IX[Idx]                             0
	DATA                           WHS_LOCATION_IX[Idx]                              0
	DATA                           PROD_SUPPLIER_IX[Idx]                             0
	DATA                           WAREHOUSES[Tab]                                   0
	DATA                           WAREHOUSES_PK[Idx]                                0
	DATA                           PRODUCT_INFORMATION_PK[Idx]                       0
	DATA                           ORDERENTRY_METADATA[Tab]                          0
	DATA                           PRD_DESC_PK[Idx]                                  0
	DATA                           PROD_NAME_IX[Idx]                                 0
	DATA                           PRODUCT_INFORMATION[Tab]                          0
	DATA                           PRODUCT_DESCRIPTIONS[Tab]                         0
	DATA                           INV_WAREHOUSE_IX[Idx]                            15
	DATA                           INV_PRODUCT_IX[Idx]                              15
	DATA                           INVENTORY_PK[Idx]                                18
	DATA                           INVENTORIES[Tab]                                 19
	DATA                           CUST_ACCOUNT_MANAGER_IX[Idx]                    106
	DATA                           CUSTOMERS_PK[Idx]                               112
	DATA                           CUST_DOB_IX[Idx]                                128
	DATA                           ORD_SALES_REP_IX[Idx]                           151
	DATA                           CUST_FUNC_LOWER_NAME_IX[Idx]                    159
	DATA                           ORDER_PK[Idx]                                   160
	DATA                           ORD_CUSTOMER_IX[Idx]                            165
	DATA                           ADDRESS_PK[Idx]                                 168
	DATA                           CARD_DETAILS_PK[Idx]                            168
	DATA                           CARDDETAILS_CUST_IX[Idx]                        173
	DATA                           ADDRESS_CUST_IX[Idx]                            173
	DATA                           ORD_WAREHOUSE_IX[Idx]                           173
	DATA                           ORD_ORDER_DATE_IX[Idx]                          182
	DATA                           CUST_EMAIL_IX[Idx]                              218
	DATA                           ITEM_PRODUCT_IX[Idx]                            445
	DATA                           ITEM_ORDER_IX[Idx]                              488
	DATA                           LOGON                                           512
	DATA                           CARD_DETAILS                                    512
	DATA                           ORDER_ITEMS_PK[Idx]                             536
	DATA                           ADDRESSES                                       768
	DATA                           CUSTOMERS                                       768
	DATA                           ORDERS                                          976
	DATA                           ORDER_ITEMS                                    1536
	[opc@inst_demo bin]$
	[opc@inst_demo bin]$ ./sbutil -soe -cf ~/Wallet_ATPDEMO.zip -cs ATPDEMO_MEDIUM -u soe -p Welcome#2019 -val
	Operation is successfully completed.
	Operation is successfully completed.
	The Order Entry Schema appears to be valid.
	--------------------------------------------------
	|Object Type    |     Valid|   Invalid|   Missing|
	--------------------------------------------------
	|Table          |        10|         0|         0|
	|Index          |        26|         0|         0|
	|Sequence       |         5|         0|         0|
	|View           |         2|         0|         0|
	|Code           |         1|         0|         0|
	--------------------------------------------------

	[opc@inst_demo bin]$
	[opc@inst_demo bin]$ ./sbutil -soe -cf ~/Wallet_ATPDEMO.zip -cs ATPDEMO_MEDIUM -u soe -p Welcome#2019 -tables
	Operation is successfully completed.
	Operation is successfully completed.
	Order Entry Schemas Tables
	----------------------------------------------------------------------------------------------------------------------
	|Table Name                  |                Rows|              Blocks|           Size|   Compressed?|  Partitioned?|
	----------------------------------------------------------------------------------------------------------------------
	|ORDER_ITEMS                 |                   0|                   0|          1.5GB|              |           Yes|
	|ORDERS                      |                   0|                   0|        976.0MB|              |           Yes|
	|CUSTOMERS                   |                   0|                   0|        768.0MB|              |           Yes|
	|ADDRESSES                   |                   0|                   0|        768.0MB|              |           Yes|
	|LOGON                       |                   0|                   0|        512.0MB|              |           Yes|
	|CARD_DETAILS                |                   0|                   0|        512.0MB|              |           Yes|
	|INVENTORIES                 |                   0|                   0|         19.0MB|      Disabled|            No|
	|PRODUCT_DESCRIPTIONS        |                   0|                   0|          320KB|      Disabled|            No|
	|PRODUCT_INFORMATION         |                   0|                   0|          256KB|      Disabled|            No|
	|WAREHOUSES                  |                   0|                   0|           64KB|      Disabled|            No|
	|ORDERENTRY_METADATA         |                   0|                   0|           64KB|      Disabled|            No|
	----------------------------------------------------------------------------------------------------------------------
																Total Space           5.0GB
	[opc@inst_demo bin]$


### parameters in SwingBench

    -cf tells oewizard the location of the credentials file
    -cs is the connecting for the service of the ATP instance. It is based on the name of the instance and is of the form followed by one of the following _low, _medium,_high,_parallel
    -ts is the name of the table space to install swingbench into. It is currently always “data”
    -dba is the admin user, currently this is always admin
    -dbap is the password you specified at the creation of the ATP instance
    -u is the name you want to give to the user you are installing swingbench into (I’d recommend soe)
    -p is the password for the user. It needs to follow the password complexity rules of ATP
    -async_off you need to disable the wizards default behavior of using async commits. This is currently prohibited on ATP
    -scale indicates the size of the schema you want to create where a scale of 1 will generate 1GB of data. The indexes will take an additional amount of space roughly half the size of the data. A scale of 10 will generate a 10GB of data and roughly of 5GB of indexes
    -hashpart tells the wizard to use hash partitioning
    -create tells swingbench to create the schema (-drop will delete the schema)
    -cl tells swingbech to run in character mode
    -v tells swingbench to output whats going on (verbose mode)

### Test ScaleUp cpu cores

Test command:

	./charbench -c ../configs/SOE_Server_Side_V2.xml \
	-v users,tpm,tps \
	-intermin 0 \
	-intermax 0 \
	-min 0 \
	-max 0 \
	-uc 32 \
	-di SQ,WQ,WA \
	-cf ~/Wallet_ATPDEMO.zip \
	-cs atpdemo_tp \
	-u soe \
	-p Welcome#2019 \
	-v user,tpm,tps \
	-intermin 0 \
	-intermax 0 \
	-uc 32 \
	-di SQ,WQ,WA \
	-rt 0:10.30

Scale Up/Down: set CPU core count from 2 to 4.


![ATP]({{ "/files/Oracle/ADB/charbench_scaleup.png"}})


	
Have a good work&life! 2019/07 via LinHong



