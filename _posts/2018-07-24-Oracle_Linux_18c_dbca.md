---
layout: post
title: "Oracle Linux 18c GA DBCA create database"
category: Oracle
tags: Oracle Linux
---

* content
{:toc}




Oracle Linux 18c GA DBCA create database

Steps create cdb/pdb database via DBCA.




### DBCA create CDB/PDB



Step 1.
	
![Step01]({{ "/files/Oracle/18c/GA_Install/createdb/dbca_01.png"}})	

Step 2.
	
![Step02]({{ "/files/Oracle/18c/GA_Install/createdb/dbca_001.png"}})	

Step 3.
	
![Step03]({{ "/files/Oracle/18c/GA_Install/createdb/dbca_002.png"}})	

Step 4.
	
![Step04]({{ "/files/Oracle/18c/GA_Install/createdb/dbca_003.png"}})	

Step 5.
	
![Step05]({{ "/files/Oracle/18c/GA_Install/createdb/dbca_004.png"}})	

Step 6.
	
![Step06]({{ "/files/Oracle/18c/GA_Install/createdb/dbca_005.png"}})	

Step 7.
	
![Step07]({{ "/files/Oracle/18c/GA_Install/createdb/dbca_006.png"}})	

Step 8.
	
![Step08]({{ "/files/Oracle/18c/GA_Install/createdb/dbca_007.png"}})	

Step 9.
	
![Step09]({{ "/files/Oracle/18c/GA_Install/createdb/dbca_008.png"}})	


### How to install HR schema in 18c

Download sample schema or example install filess.

[Oracle Database 12.2.0.1 Sample Schemas](https://github.com/oracle/db-sample-schemas/releases/tag/v12.2.0.1)

Or

Install example via runInstaller.

	[oracle@vedb ~]$ cd /tmp/example/examples/
	[oracle@vedb examples]$ ls -ltr
	total 24
	-rwxrwxr-x.  1 oracle oinstall  500 Feb  6  2013 welcome.html
	-rwxr-xr-x.  1 oracle oinstall 8854 Jul  2 20:37 runInstaller
	drwxr-xr-x.  4 oracle oinstall 4096 Jul  2 20:37 install
	drwxrwxr-x.  2 oracle oinstall   30 Jul  2 22:38 response
	drwxr-xr-x. 13 oracle oinstall 4096 Jul  2 22:39 stage
	[oracle@vedb examples]$ 

The HR demo schema sqls are the following.

	[oracle@vedb schema]$ pwd
	/u02/app/oracle/product/18.0.0/dbhome_1/demo/schema
	[oracle@vedb schema]$ ls -l
	total 64
	-rw-r--r--. 1 oracle oinstall  2322 Apr  3  2009 drop_sch.sql
	drwxr-xr-x. 2 oracle oinstall  4096 Feb  7 17:12 human_resources
	drwxr-xr-x. 2 oracle oinstall     6 Feb  7 17:14 log
	-rw-r-----. 1 oracle oinstall  1842 Jul 25 04:02 mk_dir.sql
	-rw-r--r--. 1 oracle oinstall  1842 Jul 25 00:38 mk_dir.sql.ouibak
	-rw-r--r--. 1 oracle oinstall 27570 Jun 30  2014 mkplug.sql
	-rw-r--r--. 1 oracle oinstall 16894 Jun 30  2014 sted_mkplug.sql.dbl
	[oracle@vedb schema]$ 	
	
	SYS@PRODCDB1> show pdbs;
	SYS@PRODCDB1> alter session set container=pdb1;
	SYS@PRODCDB1> @$ORACLE_HOME/demo/schema/human_resources/hr_main.sql
	specify password for HR as parameter 1:
	Enter value for 1: oracle

	specify default tablespeace for HR as parameter 2:
	Enter value for 2: users

	specify temporary tablespace for HR as parameter 3:
	Enter value for 3: temp

	specify log path as parameter 4:
	Enter value for 4: /tmp
	......
	PL/SQL procedure successfully completed.	
	SYS@PRODCDB1>
	
	[oracle@vedb admin]$ pwd
	/u02/app/oracle/product/18.0.0/dbhome_1/network/admin
	[oracle@vedb admin]$ cat tnsnames.ora 
	PDB1=
		(DESCRIPTION=
			(ADDRESS_LIST=
				(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=1521))
			)
			(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=PDB1)
			)
		)
	[oracle@vedb admin]$ 
	
	
	[oracle@vedb admin]$ sqlplus hr/oracle@pdb1

	SQL*Plus: Release 18.0.0.0.0 - Production on Wed Jul 25 06:40:07 2018
	Version 18.3.0.0.0

	Copyright (c) 1982, 2018, Oracle.  All rights reserved.

	Last Successful login time: Wed Jul 25 2018 06:39:50 -04:00

	Connected to:
	Oracle Database 18c Enterprise Edition Release 18.0.0.0.0 - Production
	Version 18.3.0.0.0

	HR@pdb1> 
	
	HR@pdb1> select employee_id,first_name,salary from employees order by salary desc fetch first 5 rows only;

	EMPLOYEE_ID FIRST_NAME               SALARY
	----------- -------------------- ----------
			100 Steven                    24000
			101 Neena                     17000
			102 Lex                       17000
			145 John                      14000
			146 Karen                     13500

	HR@pdb1> 

To be continue....

Have a good life! 2018/07 via LinHong


