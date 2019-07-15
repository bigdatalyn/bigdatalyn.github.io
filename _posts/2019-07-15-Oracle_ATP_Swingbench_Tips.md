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
	Run time 0:01:44 : Running threads (4/4) : Percentage completed : 7.12
	~....~
	


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


	
Have a good work&life! 2019/07 via LinHong



