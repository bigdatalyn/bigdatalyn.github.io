---
layout: post
title: "Oracle ADW Connect Tips"
category: Oracle
tags: Oracle ADW Tips
---

* content
{:toc}


Oracle ADW Connect Tips

Use SQLcl to connect ADW in OCI Linux 7.










### Download JDK8 and SQLcl

Download the following packages.

[Java SE Development Kit 8 Downloads / X86-64bit](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
jdk-8u201-linux-x64.rpm

[Oracle SQLcl](https://www.oracle.com/technetwork/developer-tools/sqlcl/downloads/index.html)
sqlcl-18.4.0.007.1818.zip

### Install JDK and unzip SQLcl

Install jdk via root user

	-rw-rw-r--. 1 opc opc 176209195 Mar 18 09:20 jdk-8u201-linux-x64.rpm
	-rw-rw-r--. 1 opc opc  21601462 Mar 18 09:20 sqlcl-18.4.0.007.1818.zip
	[root@inst01 opc]# rpm -ivh jdk-8u201-linux-x64.rpm
	Preparing...                          ################################# [100%]
	Updating / installing...
	   1:jdk1.8-2000:1.8.0_201-fcs        ################################# [100%]
	Unpacking JAR files...
			tools.jar...
			plugin.jar...
			javaws.jar...
			deploy.jar...
			rt.jar...
			jsse.jar...
			charsets.jar...
			localedata.jar...
	[root@inst01 opc]#

Unzip sqlcl package to the directory(oracle)

	[opc@inst01 ~]$ mkdir oracle
	[opc@inst01 ~]$ mv sqlcl-18.4.0.007.1818.zip oracle
	[opc@inst01 ~]$ cd oracle
	[opc@inst01 oracle]$ unzip sqlcl-18.4.0.007.1818.zip
	Archive:  sqlcl-18.4.0.007.1818.zip
	   creating: sqlcl/
	   creating: sqlcl/bin/
	   creating: sqlcl/lib/
	  inflating: sqlcl/bin/sql
	  inflating: sqlcl/lib/orai18n.jar
	  inflating: sqlcl/bin/sql.exe
	  inflating: sqlcl/lib/xmlparserv2-sans-jaxp-services.jar
	  inflating: sqlcl/lib/low-level-api.jar
	  inflating: sqlcl/bin/README.md
	  inflating: sqlcl/lib/orai18n-utility.jar
	  inflating: sqlcl/lib/commons-logging.jar
	  inflating: sqlcl/lib/dbtools-net.jar
	  inflating: sqlcl/lib/jzlib.jar
	  inflating: sqlcl/lib/jdbcrest.jar
	  inflating: sqlcl/lib/pom.xml
	  inflating: sqlcl/lib/stringtemplate.jar
	  inflating: sqlcl/lib/antlr-runtime.jar
	  inflating: sqlcl/lib/jackson-databind.jar
	  inflating: sqlcl/lib/osdt_core.jar
	  inflating: sqlcl/lib/javax.json.jar
	  inflating: sqlcl/lib/xdb6.jar
	  inflating: sqlcl/lib/jackson-annotations.jar
	  inflating: sqlcl/lib/jackson-core.jar
	  inflating: sqlcl/lib/jaxb-api.jar
	  inflating: sqlcl/lib/dbtools-http.jar
	  inflating: sqlcl/lib/httpmime.jar
	  inflating: sqlcl/lib/httpclient.jar
	  inflating: sqlcl/lib/osdt_cert.jar
	  inflating: sqlcl/lib/oraclepki.jar
	  inflating: sqlcl/lib/orai18n-mapping.jar
	  inflating: sqlcl/lib/dbtools-sqlcl.jar
	  inflating: sqlcl/lib/dbtools-common.jar
	  inflating: sqlcl/lib/ojdbc8.jar
	  inflating: sqlcl/lib/jansi.jar
	  inflating: sqlcl/lib/httpcore.jar
	  inflating: sqlcl/lib/commons-codec.jar
	  inflating: sqlcl/lib/jsch.jar
	  inflating: sqlcl/lib/jline.jar
	  inflating: sqlcl/lib/orajsoda.jar
	[opc@inst01 oracle]$

Setting env and can use sql command.

Setting PATH with SQLcl/bin

	[opc@inst01 bin]$ pwd
	/home/opc/oracle/sqlcl/bin
	[opc@inst01 bin]$ cd
	[opc@inst01 ~]$
	[opc@inst01 ~]$ pwd
	/home/opc
	[opc@inst01 ~]$ vi .bash_profile
	[opc@inst01 ~]$ source .bash_profile
	[opc@inst01 ~]$ cat .bash_profile
	# .bash_profile

	# Get the aliases and functions
	if [ -f ~/.bashrc ]; then
			. ~/.bashrc
	fi

	# User specific environment and startup programs

	PATH=$PATH:$HOME/.local/bin:$HOME/bin

	export PATH

	export PATH=/home/opc/oracle/sqlcl/bin:$PATH  ######## add this line
	[opc@inst01 ~]$


### Test the connection to ADW

The wallet_ADWDEMO01.zip is from ADW env.

	[opc@inst01 ~]$ pwd
	/home/opc
	[opc@inst01 ~]$ ls -ltr wallet_ADWDEMO01.zip
	-rw-rw-r--. 1 opc opc 19774 Mar 18 07:37 wallet_ADWDEMO01.zip
	[opc@inst01 ~]$ sql /nolog

	SQLcl: Release 18.4 Production on Mon Mar 18 09:24:45 2019

	Copyright (c) 1982, 2019, Oracle.  All rights reserved.

	SQL> help set cloudconfig
	SET CLOUDCONFIG
	  set cloudconfig [ -proxy=<proxyhost>:<port> ] <wallet.zip location>
	SQL>
	SQL> set cloudconfig /home/opc/wallet_ADWDEMO01.zip
	Operation is successfully completed.
	Operation is successfully completed.
	Using temp directory:/tmp/oracle_cloud_config4226554975966412020
	SQL>
	SQL> conn admin@adwdemo01_high
	Password? (**********?) ****************
	Connected.
	SQL> set timing on
	SQL> select count(*) from ssb.customer;

	  COUNT(*)
	----------
	  30000000

	Elapsed: 00:00:01.758
	SQL> select BANNER_FULL from v$version;

	BANNER_FULL
	----------------------------------------------------------------------------------------------------------------------------------------------------------------
	Oracle Database 18c Enterprise Edition Release 18.0.0.0.0 - Production
	Version 18.4.0.0.0


	Elapsed: 00:00:00.043
	SQL>

### Other connect way by SQLdeveloper

Download the latest sqldeveloper tool & use sqldeveloper to connect to ADW via CloudPDB.



	
Have a good work&life! 2019/03 via LinHong



