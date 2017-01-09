---
layout: post
title: "[原创]DB2修改数据库名"
date:   2016-06-01 11:15:00
category: DB2
tags: DB2 
---

* content
{:toc}

现已有的数据库，怎样修改另外一个数据库名呢？一个变通方法是创建catalog编目连接到这原有数据库，另外ibm db2也提供了另外一种方法。





### How to change the Database Name using db2relocatedb command?



Technote (troubleshooting)

#### Problem(Abstract)

How to change the database name using db2relocatedb command?

db2relocatedb allows for the renaming of databases and switching the instance that a database belongs to

#### Resolving the problem

##### Steps to rename the database:


    - Move the files from the old database to the new database name(Prerequisite for V10.1 and above versions)
    - Create the configuration file(relocate.cfg) with DB_NAME/DB_PATH/INSTANCE/NODENUM.
    - Alter any automatic storage paths to match the new database name.
    - Run the db2relocatedb command to change the database name. 


##### Procedure:

    db2 list db directory:
     Database 1 entry:
     Database alias                       = PRODDB
     Database name                        = PRODDB
     Local database directory             = /home/db2v10
     Database release level               = f.00
     Comment                              =
     Directory entry type                 = Indirect
     Catalog database partition number    = 0
     Alternate server hostname            =
     Alternate server port number         = 


##### Example:

- Moving the files from the old database to the new database name:


    mv /home/db2v10/db2v10/NODE0000/PRODDB /home/db2v10/db2v10/NODE0000/TESTDB 


Note: This step is not required for DB2 9.7 and lower versions.

- Create the configuration file(in this example relocate.cfg was used but any file name can be used), and log the following entries to change the name of the database. In this example, we are changing the database name from PRODDB to TESTDB


    DB_NAME=PRODDB, TESTDB
    DB_PATH=/home/db2v10
    INSTANCE=db2v10
    NODENUM=0 


- Once the configuration file is created, you must alter any automatic storage paths to match the new database name:


    rename /home/db2v10/db2v10/PRODDB /home/db2v10/db2v10/TESTDB


- Run the following db2relocatedb command to change the database name:

    db2relocatedb -f relocate.cfg
    Files and control structures were changed successfully.
    Database was catalogued successfully.
    DBT1000I  The tool completed successfully.


- Checking the change and connection:

    db2 list db directory:
     Database 1 entry:
     Database alias                       = TESTDB
     Database name                        = TESTDB
     Local database directory             = /home/db2v10
     Database release level               = f.00
     Comment                              =
     Directory entry type                 = Indirect
     Catalog database partition number    = 0
     Alternate server hostname            =
     Alternate server port number         =

    db2 connect to testdb
     Database Connection Information
     Database server        = DB2/LINUXX8664 10.1.2
     SQL authorization ID   = DB2V10
     Local database alias   = TESTDB 

Related information				

[db2relocatedb](http://www-01.ibm.com/support/docview.wss?uid=swg21673630)

