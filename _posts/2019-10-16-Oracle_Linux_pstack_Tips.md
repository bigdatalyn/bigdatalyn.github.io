---
layout: post
title: "Oracle Linux pstack Tips"
category: Oracle
tags: Oracle Tips 12c pstack trace
---

* content
{:toc}


Oracle Linux pstack Tips


### Install pstack in Oracle Linux 7.

Install gdb by yum and there are pstack and gstack in gdb.










```
[root@orl7 ~]# yum install gdb
Resolving Dependencies
--> Running transaction check
---> Package gdb.x86_64 0:7.6.1-115.el7 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

===================================================================================================================================================
 Package                       Arch                             Version                                 Repository                            Size
===================================================================================================================================================
Installing:
 gdb                           x86_64                           7.6.1-115.el7                           ol7_latest                           2.4 M

Transaction Summary
===================================================================================================================================================
Install  1 Package

Total download size: 2.4 M
Installed size: 7.0 M
Is this ok [y/d/N]: y
Downloading packages:
gdb-7.6.1-115.el7.x86_64.rpm                                                                                                | 2.4 MB  00:00:01
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : gdb-7.6.1-115.el7.x86_64                                                                                                        1/1
  Verifying  : gdb-7.6.1-115.el7.x86_64                                                                                                        1/1

Installed:
  gdb.x86_64 0:7.6.1-115.el7

Complete!
[root@orl7 ~]#
[root@orl7 ~]# rpm -ql gdb-7.6.1-115.el7.x86_64 | egrep "pstack|gstack"
/usr/bin/gstack
/usr/bin/pstack
/usr/share/man/man1/gstack.1.gz
/usr/share/man/man1/pstack.1.gz
[root@orl7 ~]#

```


Pstack output sample: select * from t1;

pstack sh_scirpts_pid with root user.

```
#0  0x00007fc2d2b66afc in waitpid () from /lib64/libc.so.6
#1  0x0000000000440a74 in waitchld.isra.10 ()
#2  0x0000000000441d2c in wait_for ()
#3  0x00000000004339fe in execute_command_internal ()
#4  0x0000000000435441 in execute_pipeline ()
#5  0x00000000004331ff in execute_command_internal ()
#6  0x0000000000433c1e in execute_command ()
#7  0x000000000041e255 in reader_loop ()
#8  0x000000000041c8be in main ()
```

### oradebug trace

With pstatck output, we also need the oradebug trace for the sql in RDBMS just like the following steps.

```sql

SYS@orcl> set linesize 300 pagesize 1000
SYS@orcl> col username for a20
SYS@orcl> select pid,sid,s.username,s.program from v$session s,v$process p where s.paddr = p.addr and s.username='LYN';

       PID        SID USERNAME             PROGRAM
---------- ---------- -------------------- ------------------------------------------------
        51        270 LYN                  sqlplus@orl7 (TNS V1-V3)

SYS@orcl> oradebug setorapid 51
Oracle pid: 51, Unix process pid: 14388, image: oracle@orl7
SYS@orcl> oradebug unlimit
Statement processed.
SYS@orcl> oradebug event 10046 trace name context forever, level 12
Statement processed.
SYS@orcl> !date
Thu Oct 15 15:06:18 CST 2019

SYS@orcl> !date
Thu Oct 15 15:08:18 CST 2019

SYS@orcl> !date
Thu Oct 15 15:08:19 CST 2019

SYS@orcl> oradebug event 10046 trace name context off
Statement processed.
SYS@orcl> oradebug tracefile_name
/u01/app/oracle/diag/rdbms/orcl/orcl/trace/orcl_ora_14388.trc
SYS@orcl> !du -sm /u01/app/oracle/diag/rdbms/orcl/orcl/trace/orcl_ora_14388.trc
2       /u01/app/oracle/diag/rdbms/orcl/orcl/trace/orcl_ora_14388.trc

SYS@orcl>

```
Have a good work&life! 2019/10 via LinHong




