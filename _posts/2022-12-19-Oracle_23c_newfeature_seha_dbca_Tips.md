---
layout: post
title: "Oracle 23c New features - DBCA Support for Standard Edition High Availability Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - sql_transpiler Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	

Oracle DBCA Support for Standard Edition High Availability

Using the Oracle Database Configuration Assistant (Oracle DBCA) and facilitating Oracle’s Automatic Storage Management or Oracle’s Advanced Cluster File System, you can now quickly create a Standard Edition High Availability Oracle Database fully configured for automatic failover.

Oracle Standard Edition High Availability Database can now be created very easily with more automation, eliminating manual steps and the associated complexity.










### DBCA for SEHA

Starting with Oracle Database 23c, you can use Oracle DBCA to create a Standard Edition High Availability database.

After you complete installing Standard Edition High Availability database software you can use Oracle DBCA, in either interactive or silent mode, to create a single-instance Oracle Database.

1. Start Oracle Database Configuration Assistant (Oracle DBCA).
```
$ cd $ORACLE_HOME/bin
$ ./dbca
```
2. In the Select Database Operation screen, select Create a database and click Next.
3. In the Select Database Creation Mode screen, select Advanced configuration and click Next.
4. In the Select Database Deployment type screen, select Oracle Standard Edition HA database, as the Database type. Select Automatic as the Database Management policy, and select an appropriate template for your database. Click Next.
5. In the Select List of Nodes screen, select all the nodes on which you want to create the Standard Edition High Availability database. Click Next to continue.
6. Respond to the configuration screens and prompts as needed to complete the database creation process. Configuration screens vary depending on the configuration option that you select.

![23c-dbca]({{ "/files/Oracle/23c/23c_dbca.png"}})

![23c-dbca-adv-config]({{ "/files/Oracle/23c/dbca_advanced_configuration.png"}})

![23c-dbca-seha]({{ "/files/Oracle/23c/dbca_seha_options.png"}})




### Reference 

[Creating a Standard Edition High Availability Database Using Oracle DBCA](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/ladbi/dbca-seha.html#GUID-DB338534-832E-47B7-8829-0D1F1574F552)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


