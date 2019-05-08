---
layout: post
title: "Oracle ADW Swingbench Tips"
category: Oracle
tags: Oracle ADW Tips
---

* content
{:toc}

Oracle ADW Swingbench Tips

Oracle ADW Swingbench Tips










### Swingbench Install

参考文档：

[Setting up Swingbench for Oracle Autonomous Data Warehousing (ADW)](http://www.dominicgiles.com/blog/files/7fd178b363b32b85ab889edfca6cadb2-170.html)



Log:

	[oracle@inst01 bin]$ ./tpcdswizard -cf ../wallet_ADWDEMO01.zip \
	>               -cs adwdemo01_high \
	>               -ts DATA \
	>               -its DATA \
	>               -dbap "XXXXXXXXXXXX" \
	>               -dba admin \
	>               -u tpcds \
	>               -p "XXXXXXXXXXXX" \
	>               -async_off \
	>               -scale 10 \
	>               -create \
	>               -cl \
	> -v
	Operation is successfully completed.
	Operation is successfully completed.
	SwingBench Wizard
	Author  :        Dominic Giles
	Version :        2.6.0.1117

	Running in Lights Out Mode using config file : ../wizardconfigs/tpcdswizard.xml
	Connecting to : jdbc:oracle:thin:@adwdemo01_high
	Connected
	Starting run
	Starting script ../sql/tpcds_droptables.sql
	Script completed in 0 hour(s) 0 minute(s) 0 second(s) 135 millisecond(s)
	Starting script ../sql/tpcds_createtables.sql
	Script completed in 0 hour(s) 0 minute(s) 0 second(s) 774 millisecond(s)
	Inserting data into table STORE_SALES_14402021
	Inserting data into table STORE_SALES_2
	Inserting data into table CATALOG_SALES_7207741
	Inserting data into table CATALOG_SALES_2
	Run time 0:03:51 : Running threads (4/4) : Percentage completed : 4.03
	Run time 0:05:59 : Running threads (4/4) : Percentage completed : 6.24
	Completed processing table CATALOG_SALES_2 in 0:09:31
	Inserting data into table WEB_SALES_3596921
	Completed processing table CATALOG_SALES_7207741 in 0:10:23
	Inserting data into table WEB_SALES_2
	Run time 0:11:28 : Running threads (4/4) : Percentage completed : 12.94
	Completed processing table STORE_SALES_2 in 0:13:09
	Inserting data into table INVENTORY_2450815
	Completed processing table WEB_SALES_3596921 in 0:04:59
	Inserting data into table INVENTORY_2451725
	Completed processing table STORE_SALES_14402021 in 0:14:40
	Inserting data into table STORE_RETURNS_120001
	Completed processing table WEB_SALES_2 in 0:05:01
	Inserting data into table CATALOG_RETURNS_720338
	Completed processing table CATALOG_RETURNS_720338 in 0:00:44
	Inserting data into table CATALOG_RETURNS_4
	Completed processing table STORE_RETURNS_120001 in 0:02:07
	Inserting data into table WEB_RETURNS_30000
	Completed processing table CATALOG_RETURNS_4 in 0:00:47
	Inserting data into table CUSTOMER_50001
	Completed processing table CUSTOMER_50001 in 0:00:12
	Inserting data into table CUSTOMER_DEMOGRAPHICS_960401
	Completed processing table WEB_RETURNS_30000 in 0:00:37
	Inserting data into table CUSTOMER_DEMOGRAPHICS_2
	Completed processing table CUSTOMER_DEMOGRAPHICS_960401 in 0:00:24
	Inserting data into table CUSTOMER_ADDRESS
	Completed processing table CUSTOMER_ADDRESS in 0:00:05
	Inserting data into table STORE_RETURNS_2
	Completed processing table STORE_RETURNS_2 in 0:00:05
	Inserting data into table CUSTOMER_2
	Completed processing table CUSTOMER_2 in 0:00:02
	Inserting data into table ITEM
	Completed processing table ITEM in 0:00:02
	Inserting data into table DATE_DIM
	Completed processing table CUSTOMER_DEMOGRAPHICS_2 in 0:00:24
	Inserting data into table WEB_RETURNS_2
	Completed processing table WEB_RETURNS_2 in 0:00:02
	Inserting data into table CATALOG_PAGE
	Completed processing table CATALOG_PAGE in 0:00:00
	Inserting data into table TIME_DIM
	Inserting data into table HOUSEHOLD_DEMOGRAPHICS
	Completed processing table TIME_DIM in 0:00:07centage completed : 68.42
	Completed processing table DATE_DIM in 0:00:11
	Inserting data into table PROMOTION
	Completed processing table PROMOTION in 0:00:00
	Inserting data into table WEB_PAGE (4/4) : Percentage completed : 73.97
	Completed processing table WEB_PAGE in 0:00:00
	Inserting data into table STORE
	Completed processing table HOUSEHOLD_DEMOGRAPHICS in 0:00:00
	Inserting data into table WEB_SITE
	Completed processing table STORE in 0:00:00
	Inserting data into table CALL_CENTER
	Completed processing table WEB_SITE in 0:00:00
	Inserting data into table WAREHOUSE
	Completed processing table WAREHOUSE in 0:00:00
	Inserting data into table REASON
	Completed processing table CALL_CENTER in 0:00:00
	Inserting data into table INCOME_BAND
	Completed processing table REASON in 0:00:00
	Inserting data into table SHIP_MODE
	Completed processing table INCOME_BAND in 0:00:00
	Completed processing table SHIP_MODE in 0:00:00
	Completed processing table INVENTORY_2450815 in 0:07:25
	Connection cache closed
	Starting script ../sql/tpcds_analyzeschema.sql

	Script completed in 0 hour(s) 11 minute(s) 16 second(s) 371 millisecond(s)
	Starting script ../sql/tpcds_constraints.sql


创建约束索引比较慢:

![SwingbenchSQL01]({{ "/files/Oracle/ADWC/swingbench_sql01.png"}})

	
Have a good work&life! 2019/05 via LinHong



