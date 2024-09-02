---
layout: post
title: "Oracle 19c Linux 8 Install Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 19c Linux 8 Install Tips

Some tips for oracle 19c in Linux 8 install.


### Some MOS for oracle 19c in Linux 8 install


PRVF-5311 When “cluvfy comp healthcheck” Or “cluvfy comp olr -allnodes” (Doc ID 2882152.1)
```
GI home needs to be patched with latest GI RU or scp tool needs a modification to workaround the issue.

Follow the below workaround in note: INS-06006 GI RunInstaller Fails If OpenSSH Is Upgraded to 8.x(Doc ID 2555697.1):

(if your unix administrator allows it)

Before installation, as root user: (please change the path if the location of your "scp" is not the same with below)
# Rename the original scp.
mv /usr/bin/scp /usr/bin/scp.orig

# Create a new file </usr/bin/scp>.
vi /usr/bin/scp

# Add the below line to the new created file </usr/bin/scp>.
/usr/bin/scp.orig -T $*

# Change the file permission.
chmod 555 /usr/bin/scp

After installation:
mv /usr/bin/scp.orig /usr/bin/scp
```
DBCA reported PRVG-11368 for SCAN verification (Doc ID 2898418.1)
```
srvctl conig scan 
srvctl config scan_listener
host scan-ip-hostname
```
Bug 29529394 - DBCA/NETCA FAIL TO VERIFY SSH CONNECTIVITY [INS-06005] UNABLE TO GET SSH CONNECTIVITY DETAILS (Doc ID 29529394.8)
```
Issue occurred due to new OS version of OL8/RHEL8
```
The fix for 29529394 is first included in:
```
20.1.0
19.7.0.0.200414 (Apr 2020) OCW Release Update Revision(OCW RU)
```
RHEL8- DBCA fails with "[INS-06005] Unable to get SSH connectivity details" (Doc ID 3017836.1)
```
Set the environment variable as CV_ASSUME_DISTID=OEL7.9 and then launch DBCA again to create the database it will now be able to find the OS release version .
```

ORA-27106: System Pages Not Available To Allocate Memory (Doc ID 2254167.1)
```
[root@x10m01 ~]# cp /etc/sysctl.conf /etc/sysctl.conf_20240902
[root@x10m01 ~]# vi /etc/sysctl.conf
[root@x10m01 ~]# sysctl -p
vm.nr_hugepages = 156000
[root@x10m01 ~]# ssh x10m02
[root@x10m02 ~]# cp /etc/sysctl.conf /etc/sysctl.conf_20240902
[root@x10m02 ~]# vi /etc/sysctl.conf
[root@x10m02 ~]# sysctl -p
vm.nr_hugepages = 156000
[root@x10m02 ~]#

========================================
309 (GB) * 1024 / 2 (MB) ≒ 158720 (310)
     309 : Total (GB)
      2  :  PageSize => 2048(KB)
========================================
```


### Referece


[Oracle Database 19c Installation On Oracle Linux 8 (OL8)](https://oracle-base.com/articles/19c/oracle-db-19c-installation-on-oracle-linux-8)


Have a good work&life! 2024/07 via LinHong


