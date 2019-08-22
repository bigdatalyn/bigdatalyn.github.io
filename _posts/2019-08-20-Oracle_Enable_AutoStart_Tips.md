---
layout: post
title: "Linux 7 enable Autostarting of Oracle Database 19c Tips"
category: Linux
tags: Oracle autostart Tips
---

* content
{:toc}

Linux 7 enable Autostarting of Oracle Database 19c Tips






### Reference

[2.2.1 Automating Database Startup and Shutdown ](https://docs.oracle.com/en/database/oracle/oracle-database/19/unxar/stopping-and-starting-oracle-software.html#GUID-CA969105-B62B-4F5B-B35C-8FB64EC93FAA)


### Create the dbora scripts

Add the dbora script

/etc/init.d/dbora

```
#! /bin/sh -x
#
# chkconfig: 2345 80 05
# description: start and stop Oracle Database Enterprise Edition on Oracle Linux 5 and 6
#

# In /etc/oratab, change the autostart field from N to Y for any
# databases that you want autostarted.
#
# Create this file as /etc/init.d/dbora and execute:
#  chmod 750 /etc/init.d/dbora
#  chkconfig --add dbora
#  chkconfig dbora on

# Note: Change the value of ORACLE_HOME to specify the correct Oracle home
# directory for your installation.
# ORACLE_HOME=/u01/app/oracle/product/11.1.0/db_1
ORACLE_HOME=/u01/app/oracle/product/19.0.0/dbhome_1

#
# Note: Change the value of ORACLE to the login name of the oracle owner
ORACLE=oracle

PATH=${PATH}:$ORACLE_HOME/bin
HOST=`hostname`
PLATFORM=`uname`
export ORACLE_HOME PATH

case $1 in
'status')
        echo -n $"Oracle Process: "
        su $ORACLE -c "ps -ef | grep pmon | grep -v grep; ps -ef | grep -i listener | grep -v grep;" &
        ;;
'start')
        echo -n $"Starting Oracle: "
        su $ORACLE -c "$ORACLE_HOME/bin/dbstart $ORACLE_HOME" &
        ;;
'stop')
        echo -n $"Shutting down Oracle: "
        su $ORACLE -c "$ORACLE_HOME/bin/dbshut $ORACLE_HOME" &
        ;;
'restart')
        echo -n $"Shutting down Oracle: "
        su $ORACLE -c "$ORACLE_HOME/bin/dbshut $ORACLE_HOME" &
        sleep 5
        echo -n $"Starting Oracle: "
        su $ORACLE -c "$ORACLE_HOME/bin/dbstart $ORACLE_HOME" &
        ;;
*)
        echo "usage: $0 {start|stop|restart}"
        exit
        ;;
esac

exit

```

	[root@orl7 /]# vi /etc/init.d/dbora
	[root@orl7 /]# ls -l /etc/init.d/dbora
	-rw-r--r--. 1 root root 1345 Aug 20 10:40 /etc/init.d/dbora
	[root@orl7 /]# chmod 750 /etc/init.d/dbora
	[root@orl7 /]#

### Config Linux to autostart/stop the service

Linux 7:

	[root@orl7 /]# systemctl enable dbora
	dbora.service is not a native service, redirecting to /sbin/chkconfig.
	Executing /sbin/chkconfig dbora on
	[root@orl7 /]# /sbin/chkconfig dbora on
	[root@orl7 /]#

Edit /etc/oratab

```
[root@orl7 log]# cat /etc/oratab
#
# This file is used by ORACLE utilities.  It is created by root.sh
# and updated by either Database Configuration Assistant while creating
# a database or ASM Configuration Assistant while creating ASM instance.

# A colon, ':', is used as the field terminator.  A new line terminates
# the entry.  Lines beginning with a pound sign, '#', are comments.
#
# Entries are of the form:
#   $ORACLE_SID:$ORACLE_HOME:<N|Y>:
#
# The first and second fields are the system identifier and home
# directory of the database respectively.  The third field indicates
# to the dbstart utility that the database should , "Y", or should not,
# "N", be brought up at system boot time.
#
# Multiple entries with the same $ORACLE_SID are not allowed.
#
#
#orcl:/u01/app/oracle/product/19.0.0/dbhome_1:N
orcl:/u01/app/oracle/product/19.0.0/dbhome_1:Y
[root@orl7 log]#
```

Test:

```
[root@orl7 ~]# service dbora start
Warning: dbora.service changed on disk. Run 'systemctl daemon-reload' to reload units.
+ ORACLE_HOME=/u01/app/oracle/product/19.0.0/dbhome_1
+ ORACLE=oracle
+ PATH=/sbin:/usr/sbin:/bin:/usr/bin:/u01/app/oracle/product/19.0.0/dbhome_1/bin
++ hostname
+ HOST=orl7
++ uname
+ PLATFORM=Linux
+ export ORACLE_HOME PATH
+ case $1 in
+ echo -n 'Starting Oracle: '
Starting Oracle: + exit
+ su oracle -c '/u01/app/oracle/product/19.0.0/dbhome_1/bin/dbstart /u01/app/oracle/product/19.0.0/dbhome_1'
[root@orl7 ~]# Processing Database instance "orcl": log file /u01/app/oracle/product/19.0.0/dbhome_1/rdbms/log/startup.log

[root@orl7 ~]# 
[root@orl7 ~]# service dbora status
+ ORACLE_HOME=/u01/app/oracle/product/19.0.0/dbhome_1
+ ORACLE=oracle
+ PATH=/sbin:/usr/sbin:/bin:/usr/bin:/u01/app/oracle/product/19.0.0/dbhome_1/bin
++ hostname
+ HOST=orl7
++ uname
+ PLATFORM=Linux
+ export ORACLE_HOME PATH
+ case $1 in
+ echo -n 'Oracle Process: '
Oracle Process: + exit
+ su oracle -c 'ps -ef | grep pmon | grep -v grep; ps -ef | grep -i listener | grep -v grep;'
[root@orl7 ~]# oracle    6160     1  0 11:01 ?        00:00:00 ora_pmon_orcl
oracle    4403     1  0 10:49 ?        00:00:00 /u01/app/oracle/product/19.0.0/dbhome_1/bin/tnslsnr LISTENER -inherit

[root@orl7 ~]#
[root@orl7 ~]# service dbora stop
+ ORACLE_HOME=/u01/app/oracle/product/19.0.0/dbhome_1
+ ORACLE=oracle
+ PATH=/sbin:/usr/sbin:/bin:/usr/bin:/u01/app/oracle/product/19.0.0/dbhome_1/bin
++ hostname
+ HOST=orl7
++ uname
+ PLATFORM=Linux
+ export ORACLE_HOME PATH
+ case $1 in
+ echo -n 'Shutting down Oracle: '
Shutting down Oracle: + exit
[root@orl7 ~]# + su oracle -c '/u01/app/oracle/product/19.0.0/dbhome_1/bin/dbshut /u01/app/oracle/product/19.0.0/dbhome_1'
Processing Database instance "orcl": log file /u01/app/oracle/product/19.0.0/dbhome_1/rdbms/log/shutdown.log

[root@orl7 ~]#

```

### Starting Oracle Database Multitenant PDBs 12c/18c/19c

Run the following pl/sql with SYSDBA
```
create or replace trigger sys.after_startup
   after startup on database
begin
   execute immediate 'alter pluggable database all open';
end after_startup;
/

```

	# sqlplus / as sysdba

	SQL*Plus: Release 19.0.0.0.0 - Production on Tue Aug 20 11:06:45 2019
	Version 19.3.0.0.0

	Copyright (c) 1982, 2019, Oracle.  All rights reserved.


	Connected to:
	Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
	Version 19.3.0.0.0

	create or replace trigger sys.after_startup
	   after startup on database
	begin
	   execute immediate 'alter pluggable database all open';
	end after_startup;
	  6  /

	Trigger created.

	SYS@orcl>







	
Have a good work&life! 2019/08 via LinHong



