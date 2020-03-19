---
layout: post
title: "Oracle 19c Wait event 'enq: KO - fast object checkpoint'"
category: Oracle
tags: Oracle Event Tips 
---

* content
{:toc}

Oracle 19c Wait event 'enq: KO - fast object checkpoint'

There were top event - 'enq: KO - fast object checkpoint' while I was doing awr report analysis, and found some test with it and some mos.


### wait event: 'enq: KO - fast object checkpoint'

From mos: Enq: KO - Fast Object Checkpoint Wait Event (Doc ID 2547319.1)

``` 
On reporting queries, there are too many "enq: KO - fast object checkpoint" wait event.

All reporting queries are doing full table scans concurrently. Oracle uses direct path reads instead of db file scattered reads. And direct path reads require a checkpoint

"_serial_direct_read"=NEVER
```









### Test - generate wait event 'enq: KO - fast object checkpoint'

Env: 

```
[oracle@ora7 ~]$ cat /etc/redhat-release
Red Hat Enterprise Linux Server release 7.6 (Maipo)
[oracle@ora7 ~]$ uname -a
Linux ora7 4.14.35-1844.0.7.el7uek.x86_64 #2 SMP Wed Dec 12 19:48:02 PST 2018 x86_64 x86_64 x86_64 GNU/Linux
[oracle@ora7 ~]$
[oracle@ora7 ~]$ sqlplus / as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on Thu Mar 18 01:34:54 2020
Version 19.3.0.0.0

Copyright (c) 1982, 2019, Oracle.  All rights reserved.


Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.3.0.0.0

SYS@orcl>

[oracle@ora7 ~]$ which gdb
/usr/bin/gdb
[oracle@ora7 ~]$ gdb -version
GNU gdb (GDB) Red Hat Enterprise Linux 7.6.1-115.el7
Copyright (C) 2013 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
and "show warranty" for details.
This GDB was configured as "x86_64-redhat-linux-gnu".
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
[oracle@ora7 ~]$

```

We can install gdb via "yum install gdb -y" command

We can generate the wait event with the following steps:



Terminal 01: Create test table and stop the dbwr process via gdb.

```shell

LIN@pdb1> create table test(col1 number,col2 char(2000), col3 varchar2(30));

Table created.

LIN@pdb1>

LIN@pdb1> begin
  2  for i in 1..10000 loop
  3  insert into test values(i,i||'11',i||'aaaa');
  4  if (mod(i,500) = 0) then
  5  commit;
  6  end if;
  7  end loop;
  8  commit;
  9  end;
 10  /

PL/SQL procedure successfully completed.

LIN@pdb1>

LIN@pdb1> !ps -ef | grep oracle | grep dbw | grep -v grep
oracle    4568     1  0 01:03 ?        00:00:00 ora_dbw0_orcl

LIN@pdb1> !which gdb
/usr/bin/gdb

LIN@pdb1> !ls $ORACLE_HOME/bin/oracle
/u01/app/oracle/product/19.0.0/dbhome_1/bin/oracle

LIN@pdb1> !gdb $ORACLE_HOME/bin/oracle 4568
GNU gdb (GDB) Red Hat Enterprise Linux 7.6.1-115.el7
Copyright (C) 2013 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
and "show warranty" for details.
This GDB was configured as "x86_64-redhat-linux-gnu".
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>...
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/bin/oracle...(no debugging symbols found)...done.
Attaching to program: /u01/app/oracle/product/19.0.0/dbhome_1/bin/oracle, process 4568
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libodm19.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libodm19.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libofs.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libofs.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libcell19.so...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libcell19.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libskgxp19.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libskgxp19.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libskjcx19.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libskjcx19.so
Reading symbols from /lib64/librt.so.1...(no debugging symbols found)...done.
Loaded symbols for /lib64/librt.so.1
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libclsra19.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libclsra19.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libdbcfg19.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libdbcfg19.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libhasgen19.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libhasgen19.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libskgxn2.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libskgxn2.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libocr19.so...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libocr19.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libocrb19.so...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libocrb19.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libocrutl19.so...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libocrutl19.so
Reading symbols from /lib64/libaio.so.1...Reading symbols from /lib64/libaio.so.1...(no debugging symbols found)...done.
(no debugging symbols found)...done.
Loaded symbols for /lib64/libaio.so.1
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libons.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libons.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libmql1.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libmql1.so
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libipc1.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libipc1.so
Reading symbols from /lib64/libdl.so.2...(no debugging symbols found)...done.
Loaded symbols for /lib64/libdl.so.2
Reading symbols from /lib64/libm.so.6...(no debugging symbols found)...done.
Loaded symbols for /lib64/libm.so.6
Reading symbols from /lib64/libpthread.so.0...(no debugging symbols found)...done.
[Thread debugging using libthread_db enabled]
Using host libthread_db library "/lib64/libthread_db.so.1".
Loaded symbols for /lib64/libpthread.so.0
Reading symbols from /lib64/libnsl.so.1...(no debugging symbols found)...done.
Loaded symbols for /lib64/libnsl.so.1
Reading symbols from /lib64/libresolv.so.2...(no debugging symbols found)...done.
Loaded symbols for /lib64/libresolv.so.2
Reading symbols from /lib64/libc.so.6...(no debugging symbols found)...done.
Loaded symbols for /lib64/libc.so.6
Reading symbols from /lib64/ld-linux-x86-64.so.2...(no debugging symbols found)...done.
Loaded symbols for /lib64/ld-linux-x86-64.so.2
Reading symbols from /usr/lib64/libnuma.so.1...Reading symbols from /usr/lib64/libnuma.so.1...(no debugging symbols found)...done.
(no debugging symbols found)...done.
Loaded symbols for /usr/lib64/libnuma.so.1
Reading symbols from /lib64/libgcc_s.so.1...(no debugging symbols found)...done.
Loaded symbols for /lib64/libgcc_s.so.1
Reading symbols from /lib64/libnss_files.so.2...(no debugging symbols found)...done.
Loaded symbols for /lib64/libnss_files.so.2
Reading symbols from /u01/app/oracle/product/19.0.0/dbhome_1/lib/libshpkavx219.so...(no debugging symbols found)...done.
Loaded symbols for /u01/app/oracle/product/19.0.0/dbhome_1/lib/libshpkavx219.so
0x00007f10170798ba in semtimedop () from /lib64/libc.so.6
Missing separate debuginfos, use: debuginfo-install glibc-2.17-260.0.17.el7_6.6.x86_64 libaio-0.3.109-13.el7.x86_64 libgcc-4.8.5-36.0.1.el7_6.2.x86_64 numactl-libs-2.0.9-7.el7.x86_64
(gdb)

```

Terminal 02: Update the table and generated dirty block;

```shell

LIN@pdb1> desc test;
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 COL1                                               NUMBER
 COL2                                               CHAR(2000)
 COL3                                               VARCHAR2(30)

LIN@pdb1> select count(*) from test;

  COUNT(*)
----------
     10000

LIN@pdb1> update test set col1=2020;

10000 rows updated.

LIN@pdb1>

```

Terminal 03: Query the test table via "direct path read".

```shell

LIN@pdb1> desc test;
 Name                                      Null?    Type
 ----------------------------------------- -------- ----------------------------
 COL1                                               NUMBER
 COL2                                               CHAR(2000)
 COL3                                               VARCHAR2(30)

LIN@pdb1> alter session set "_serial_direct_read"=always;

Session altered.

LIN@pdb1> select col1 from test;

....there will be hang in this step.

```

Terminal 04: Check the wait event.

```shell

LIN@pdb1> select sid, seq#, event, p1text, p1, p2text, p2, p3text, p3 from v$session_wait w, v$event_name n where w.event=n.name and n.wait_class!='Idle' and w.event!='SQL*Net message to client';

       SID       SEQ#
---------- ----------
EVENT
----------------------------------------------------------------
P1TEXT                                                                   P1
---------------------------------------------------------------- ----------
P2TEXT                                                                   P2
---------------------------------------------------------------- ----------
P3TEXT                                                                   P3
---------------------------------------------------------------- ----------
        88         39
enq: KO - fast object checkpoint
name|mode                                                        1263468550

       SID       SEQ#
---------- ----------
EVENT
----------------------------------------------------------------
P1TEXT                                                                   P1
---------------------------------------------------------------- ----------
P2TEXT                                                                   P2
---------------------------------------------------------------- ----------
P3TEXT                                                                   P3
---------------------------------------------------------------- ----------
2                                                                     65586
0                                                                         1


       SID       SEQ#
---------- ----------
EVENT
----------------------------------------------------------------
P1TEXT                                                                   P1
---------------------------------------------------------------- ----------
P2TEXT                                                                   P2
---------------------------------------------------------------- ----------
P3TEXT                                                                   P3
---------------------------------------------------------------- ----------
        94         58
PGA memory operation
                                                                     131072

       SID       SEQ#
---------- ----------
EVENT
----------------------------------------------------------------
P1TEXT                                                                   P1
---------------------------------------------------------------- ----------
P2TEXT                                                                   P2
---------------------------------------------------------------- ----------
P3TEXT                                                                   P3
---------------------------------------------------------------- ----------
                                                                          1
                                                                          0


LIN@pdb1>

```

Terminal 01: Quit gdb.

```shell

Missing separate debuginfos, use: debuginfo-install glibc-2.17-260.0.17.el7_6.6.x86_64 libaio-0.3.109-13.el7.x86_64 libgcc-4.8.5-36.0.1.el7_6.2.x86_64 numactl-libs-2.0.9-7.el7.x86_64
(gdb)

(gdb) quit
A debugging session is active.

        Inferior 1 [process 4568] will be detached.

Quit anyway? (y or n) y
Detaching from program: /u01/app/oracle/product/19.0.0/dbhome_1/bin/oracle, process 4568

LIN@pdb1>

```


### Reference

Enq: KO - Fast Object Checkpoint Wait Event (Doc ID 2547319.1)



Have a good work&life! 2020/03 via LinHong


