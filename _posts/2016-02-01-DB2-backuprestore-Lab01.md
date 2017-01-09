---
layout: post
title:  "[原创]DB2 数据库的备份和恢复-lab 1"
date:   2016-02-01 10:06:05
description: "DB2 数据库的备份和恢复对于DBA来说是必不可少的技能，下面通过几个实验来总结下DB2 备份和恢复"
categories: Python
excerpt: Python Study
tags: DB2数据库 备份和恢复 原创
---

* content
{:toc}

## 序

DB2 数据库的备份和恢复对于DBA来说是必不可少的技能，下面通过几个实验来总结下DB2 备份和恢复：

###lab 1: Using the basic backup and restore functions

lab 2: Enabling online backups

lab 3: Restoring a database to a specific point in time

lab 4: Restoring a dropped table

lab 5: Restoring a database or table space to a different location

---

#### Step 1: Create an offline backup

1.Create a file system at the path /db/dbms with the ROOT ID. Type the following and press Enter: 

`mkdir -p /db/dbms ; chmod 777 /db/dbms`

---

2.Create a database named TESTDB at the path /db/dbms. Type the following and press Enter: 

`db2 CREATE DATABASE TESTDB ON /db/dbms`

	db2inst1:/dbhome/db2inst1$ db2 list db directory

	 System Database Directory

	 Number of entries in the directory = 1

	Database 1 entry:

	 Database alias                       = TEST
	 Database name                        = TEST
	 Local database directory             = /dbhome/db2inst1
	 Database release level               = d.00
	 Comment                              =
	 Directory entry type                 = Indirect
	 Catalog database partition number    = 0
	 Alternate server hostname            =
	 Alternate server port number         =

	db2inst1:/dbhome/db2inst1$ db2 CREATE DATABASE TESTDB ON /db/dbms
	DB20000I  The CREATE DATABASE command completed successfully.
	db2inst1:/dbhome/db2inst1$ db2 list db directory

	 System Database Directory

	 Number of entries in the directory = 2

	Database 1 entry:

	 Database alias                       = TESTDB
	 Database name                        = TESTDB
	 Local database directory             = /db/dbms
	 Database release level               = d.00
	 Comment                              =
	 Directory entry type                 = Indirect
	 Catalog database partition number    = 0
	 Alternate server hostname            =
	 Alternate server port number         =

	Database 2 entry:

	 Database alias                       = TEST
	 Database name                        = TEST
	 Local database directory             = /dbhome/db2inst1
	 Database release level               = d.00
	 Comment                              =
	 Directory entry type                 = Indirect
	 Catalog database partition number    = 0
	 Alternate server hostname            =
	 Alternate server port number         =

	db2inst1:/dbhome/db2inst1$ 

Create an SMS table space named STSDT4K under directory /db/dbms/sms4k.

Type the following and press Enter: 

`db2 "CREATE TABLESPACE STSDT4K PAGESIZE 4K MANAGED BY SYSTEM USING ('/db/dbms/sms4k')"`


	db2inst1:/dbhome/db2inst1$ db2 connect to testdb

	   Database Connection Information

	 Database server        = DB2/AIX64 9.7.8
	 SQL authorization ID   = db2inst1
	 Local database alias   = TESTDB

	db2inst1:/dbhome/db2inst1$ db2 list tablespaces

			   Tablespaces for Current Database

	 Tablespace ID                        = 0
	 Name                                 = SYSCATSPACE
	 Type                                 = Database managed space
	 Contents                             = All permanent data. Regular table space.
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	 Tablespace ID                        = 1
	 Name                                 = TEMPSPACE1
	 Type                                 = System managed space
	 Contents                             = System Temporary data
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	 Tablespace ID                        = 2
	 Name                                 = USERSPACE1
	 Type                                 = Database managed space
	 Contents                             = All permanent data. Large table space.
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	db2inst1:/dbhome/db2inst1$ db2 "CREATE TABLESPACE STSDT4K PAGESIZE 4K MANAGED BY SYSTEM USING ('/db/dbms/sms4k')"
	DB20000I  The SQL command completed successfully.
	db2inst1:/dbhome/db2inst1$ db2 list tablespaces                                                                  

			   Tablespaces for Current Database

	 Tablespace ID                        = 0
	 Name                                 = SYSCATSPACE
	 Type                                 = Database managed space
	 Contents                             = All permanent data. Regular table space.
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	 Tablespace ID                        = 1
	 Name                                 = TEMPSPACE1
	 Type                                 = System managed space
	 Contents                             = System Temporary data
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	 Tablespace ID                        = 2
	 Name                                 = USERSPACE1
	 Type                                 = Database managed space
	 Contents                             = All permanent data. Large table space.
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	 Tablespace ID                        = 3
	 Name                                 = STSDT4K
	 Type                                 = System managed space
	 Contents                             = All permanent data. Regular table space.
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	db2inst1:/dbhome/db2inst1$                     
	db2inst1:/dbhome/db2inst1$ db2 terminate
	DB20000I  The TERMINATE command completed successfully.
	db2inst1:/dbhome/db2inst1$ 

---

3.Create a DMS table space named DTSDT4K with an initial size of 1000 pages and with each page size equal to 4 KB.

Type the following and press Enter:

`db2 "CREATE TABLESPACE DTSDT4K PAGESIZE 4K MANAGED BY DATABASE USING (FILE '/db/dbms/DTSDT4K.01' 1000)"`

	db2inst1:/dbhome/db2inst1$ db2 "CREATE TABLESPACE DTSDT4K PAGESIZE 4K MANAGED BY DATABASE USING (FILE '/db/dbms/DTSDT4K.01' 1000)"
	DB20000I  The SQL command completed successfully.
	db2inst1:/dbhome/db2inst1$ db2 list tablespaces

			   Tablespaces for Current Database

	 Tablespace ID                        = 0
	 Name                                 = SYSCATSPACE
	 Type                                 = Database managed space
	 Contents                             = All permanent data. Regular table space.
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	 Tablespace ID                        = 1
	 Name                                 = TEMPSPACE1
	 Type                                 = System managed space
	 Contents                             = System Temporary data
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	 Tablespace ID                        = 2
	 Name                                 = USERSPACE1
	 Type                                 = Database managed space
	 Contents                             = All permanent data. Large table space.
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	 Tablespace ID                        = 3
	 Name                                 = STSDT4K
	 Type                                 = System managed space
	 Contents                             = All permanent data. Regular table space.
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	 Tablespace ID                        = 4
	 Name                                 = DTSDT4K
	 Type                                 = Database managed space
	 Contents                             = All permanent data. Large table space.
	 State                                = 0x0000
	   Detailed explanation:
		 Normal

	db2inst1:/dbhome/db2inst1$ 

---

4.Create a table TAB01 with two NOT-NULL columns. Store the data in table space STSDT4K.

Type the following and press Enter: 

`db2 "CREATE TABLE TAB01 (COL01 INT NOT NULL, COL02 VARCHAR(20)) IN STSDT4K"`

	db2inst1:/dbhome/db2inst1$ db2 "CREATE TABLE TAB01 (COL01 INT NOT NULL, COL02 VARCHAR(20)) IN STSDT4K"
	DB20000I  The SQL command completed successfully.
	db2inst1:/dbhome/db2inst1$ db2 describe table tab01

									Data type                     Column
	Column name                     schema    Data type name      Length     Scale Nulls
	------------------------------- --------- ------------------- ---------- ----- ------
	COL01                           SYSIBM    INTEGER                      4     0 No    
	COL02                           SYSIBM    VARCHAR                     20     0 Yes   

	  2 record(s) selected.

	db2inst1:/dbhome/db2inst1$ 

---

5.Create a table TAB02 with four NOT-NULL columns. Store the data in table space DTSDT4K.

Type the following and press Enter: 

`db2 "CREATE TABLE TAB02 (COL01 INT NOT NULL, COL02 INT NOT NULL, COL03 CHAR(20), COL04 VARCHAR(20)) IN DTSDT4K"`

	db2inst1:/dbhome/db2inst1$ db2 "CREATE TABLE TAB02 (COL01 INT NOT NULL, COL02 INT NOT NULL, COL03 CHAR(20), COL04 VARCHAR(20)) IN DTSDT4K"
	DB20000I  The SQL command completed successfully.
	db2inst1:/dbhome/db2inst1$ db2 describe table tab02                                                                                       

									Data type                     Column
	Column name                     schema    Data type name      Length     Scale Nulls
	------------------------------- --------- ------------------- ---------- ----- ------
	COL01                           SYSIBM    INTEGER                      4     0 No    
	COL02                           SYSIBM    INTEGER                      4     0 No    
	COL03                           SYSIBM    CHARACTER                   20     0 Yes   
	COL04                           SYSIBM    VARCHAR                     20     0 Yes   

	  4 record(s) selected.

	db2inst1:/dbhome/db2inst1$ 

---

6.Insert data into tables TAB01 and TAB02. Type the following and press Enter after each command:

`db2 "INSERT INTO TAB01 VALUES (1,'Communication')"`

`db2 "INSERT INTO TAB01 VALUES (2,'Computer')"`

`db2 "INSERT INTO TAB01 VALUES (3,'Consumer Electronics')"`

`db2 "INSERT INTO TAB02 VALUES (1,1,'Communication','Telephone')"`

`db2 "INSERT INTO TAB02 VALUES (1,2,'Communication','Mobile Phone')"`

`db2 "INSERT INTO TAB02 VALUES (2,1,'Computer','Personal Computer')"`

`db2 "INSERT INTO TAB02 VALUES (2,2,'Computer','Notebook')"`

`db2 "INSERT INTO TAB02 VALUES (2,3,'Computer','Pad')"`

`db2 "INSERT INTO TAB02 VALUES (3,1,'Consumer Electronics','Camera')"`

`db2 "INSERT INTO TAB02 VALUES (3,2,'Consumer Electronics','TV')"`

`db2 "INSERT INTO TAB02 VALUES (3,3,'Consumer Electronics','Refrigerator')"`



	db2inst1:/dbhome/db2inst1$ db2 "select * from tab01"

	COL01       COL02               
	----------- --------------------
			  1 Communication       
			  2 Computer            
			  3 Consumer Electronics

	  3 record(s) selected.

	db2inst1:/dbhome/db2inst1$ db2 "select * from tab02"

	COL01       COL02       COL03                COL04               
	----------- ----------- -------------------- --------------------
			  1           1 Communication        Telephone           
			  1           2 Communication        Mobile Phone        
			  2           1 Computer             Personal Computer   
			  2           2 Computer             Notebook            
			  2           3 Computer             Pad                 
			  3           1 Consumer Electronics Camera              
			  3           2 Consumer Electronics TV                  
			  3           3 Consumer Electronics Refrigerator        

	  8 record(s) selected.

	db2inst1:/dbhome/db2inst1

	
---
	
#### Step 2: Restore the database
	
1.Restore the database from the backup image created in step 1. 

Type the following and press Enter: 

`db2 "RESTORE DATABASE PARRDB FROM /data TAKEN AT yyyymmddhhMMss"`

The string "yyyymmddhhMMss" indicates the timestamp of the backup, for example, 20121207153813.

Note: You must input the correct timestamp.

---

2.Can you answer the following question ?

How do you list the different timestamps of the database backups?

---

3.The RESTORE command generates the following warning message. 

To proceed, type `Y` and press Enter to continue.

SQL2539W Warning! Restoring to an existing database that is the same as the backup image database. The database files will be deleted.

Do you want to continue ? (y/n) `Y`

DB20000I The RESTORE DATABASE command completed successfully.

---

4.Can you answer the following question ?

If the BACKUP command is issued from a job that runs at night, how can you prevent the warning message and avoid having the system wait for human intervention to start the backup?

---

5.Verify the data in the table TAB01 and note what happened to the changes you made in step 1. 

Type the following and press Enter:

`db2 "SELECT * FROM TAB01"`

Can you answer the following question ?

Were the values in the table updated after the backup? Why or why not?
	
---

