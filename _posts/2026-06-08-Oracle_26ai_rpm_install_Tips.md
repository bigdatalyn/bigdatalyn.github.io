---
layout: post
title: "Oracle 26ai RPM Install Tips"
category: Oracle
tags: Oracle 26ai Install Tips
---

* content
{:toc}
Oracle 26ai RPM Install Tips



## ENV

Linux 8 / 4OCPU / 32G / X86_64

### Download

- Use any browser to access the [Oracle AI Database software downloads page](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html)

- [Oracle Database Client on Linux x86-64](https://www.oracle.com/database/technologies/oracle26ai-linux-downloads.html)

### Install with RPM 

Steps:

```shell
# dnf -y install oracle-ai-database-preinstall-26ai
# curl -o oracle-ai-database-preinstall-26ai-1.0-1.el8.x86_64.rpm https://yum.oracle.com/repo/OracleLinux/OL8/appstream/x86_64/getPackage/oracle-ai-database-preinstall-26ai-1.0-1.el8.x86_64.rpm
# yum -y localinstall oracle-ai-database-preinstall-26ai-1.0-1.el8.x86_64.rpm
# /etc/init.d/oracledb_ORCLCDB-26ai configure
```

Logs:

```shell
[root@paf-inst ~]# cat /etc/sysconfig/oracledb_ORCLCDB-26ai.conf
#This is a configuration file to setup the Oracle AI Database. 
#It is used when running '/etc/init.d/oracledb_ORCLCDB configure'.
#Please use this file to modify the default listener port and the
#Oracle data location.

# LISTENER_PORT: Database listener
LISTENER_PORT=1521

# Character set of the database
CHARSET=AL32UTF8

# ORACLE_DATA_LOCATION: Database oradata location
ORACLE_DATA_LOCATION=/opt/oracle/oradata

# Configure TDE
CONFIGURE_TDE=false

# Encrypt Tablespaces list, Leave empty for user tablespace alone or provide ALL for encrypting all tablespaces
# For specific tablespaces use SYSTEM:true,SYSAUX:false
ENCRYPT_TABLESPACES=
[root@paf-inst ~]# vi /etc/sysconfig/oracledb_ORCLCDB-26ai.conf
[root@paf-inst ~]# /etc/init.d/oracledb_ORCLCDB-26ai configure
/opt/oracle/product/26ai/dbhome_1/bin/dbca -silent -createDatabase -gdbName ORCLCDB -templateName General_Purpose.dbc -characterSet AL32UTF8 -createAsContainerDatabase true -numberOfPDBs 1 -pdbName ORCLPDB1 -createListener LISTENER:1522 -datafileDestination /opt/oracle/oradata -sid ORCLCDB -autoGeneratePasswords
Configuring Oracle AI Database ORCLCDB.
Prepare for db operation
8% complete
Copying database files
31% complete
Creating and starting Oracle instance
32% complete
36% complete
39% complete
42% complete
46% complete
Completing Database Creation
51% complete
53% complete
54% complete
Creating Pluggable Databases
58% complete
77% complete
Executing Post Configuration Actions
100% complete
Database creation complete. For details check the logfiles at:
 /opt/oracle/cfgtoollogs/dbca/ORCLCDB.
Database Information:
Global Database Name:ORCLCDB
System Identifier(SID):ORCLCDB
Look at the log file "/opt/oracle/cfgtoollogs/dbca/ORCLCDB/ORCLCDB.log" for further details.

Database configuration completed successfully. The passwords were auto generated, you must change them by connecting to the database using 'sqlplus / as sysdba' as the oracle user.
[root@paf-inst ~]# 
```

Profile: `26ai.env`

```
export ORACLE_SID=ORCLCDB
export ORACLE_BASE=/opt/oracle
export ORACLE_HOME=/opt/oracle/product/26ai/dbhome_1
export PATH=$ORACLE_HOME/bin:$PATH
```

Test:

```sql
[root@paf-inst ~]# su - oracle
Last login: Mon Jun  8 08:05:20 GMT 2026 on pts/0
[oracle@paf-inst ~]$ source 26ai.env 
[oracle@paf-inst ~]$ sql / as sysdba
s
SQLcl: Release 25.4 Production on Mon Jun 08 08:06:23 2026

Copyright (c) 1982, 2026, Oracle.  All rights reserved.

Connected to:
Oracle AI Database 26ai Enterprise Edition Release 23.26.1.0.0 - Production
Version 23.26.1.0.0

SQL> show pdbs

   CON_ID CON_NAME    OPEN MODE     RESTRICTED    
_________ ___________ _____________ _____________ 
        2 PDB$SEED    READ ONLY     NO            
        3 ORCLPDB1    READ WRITE    NO            
SQL> !lsnrctl status

LSNRCTL for Linux: Version 23.26.1.0.0 - Production on 08-JUN-2026 08:06:32

Copyright (c) 1991, 2026, Oracle.  All rights reserved.

Connecting to (DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=XXXX.com)(PORT=1522)))
STATUS of the LISTENER
------------------------
Alias                     LISTENER
Version                   TNSLSNR for Linux: Version 23.26.1.0.0 - Production
Start Date                08-JUN-2026 07:45:58
Uptime                    0 days 0 hr. 20 min. 33 sec
Trace Level               off
Security                  ON: Local OS Authentication
SNMP                      OFF
Listener Parameter File   /opt/oracle/product/26ai/dbhome_1/network/admin/listener.ora
Listener Log File         /opt/oracle/diag/tnslsnr/paf-inst/listener/alert/log.xml
Listening Endpoints Summary...
  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=paf-inst.sub10220934090.ash202510.oraclevcn.com)(PORT=1522)))
  (DESCRIPTION=(ADDRESS=(PROTOCOL=ipc)(KEY=EXTPROC1522)))
Services Summary...
Service "53ba3d746e82dabee0634800000af6b5" has 1 instance(s).
  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
Service "ORCLCDB" has 1 instance(s).
  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
Service "ORCLCDBXDB" has 1 instance(s).
  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
Service "orclpdb1" has 1 instance(s).
  Instance "ORCLCDB", status READY, has 1 handler(s) for this service...
The command completed successfully

SQL> alter user sys identified by welcome1;

User SYS altered.

SQL> alter user system identified by welcome1;

User SYSTEM altered.

SQL> 
```

### Attach Block Device

流程:

Console Attach → 复制弹窗里的 iscsiadm 命令 → 粘贴执行 → `lsblk`确认磁盘 → `parted`分区 → `mkfs.xfs`格式化 → `mount`+ `fstab`

```shell
# 查看挂载block设备
lsblk
fdisk -l

# 分区 → 格式化 → 挂载
## 分区
sudo parted /dev/sdb mklabel gpt
sudo parted -a optimal /dev/sdb mkpart primary ext4 0% 100%
lsblk /dev/sdb
## 格式化
sudo mkfs.xfs /dev/sdb1
## 挂载
sudo mkdir -p /u02
sudo mount /dev/sdb1 /u02
df -h /u02

[root@paf-inst ~]# sudo parted /dev/sdb mklabel gpt
Information: You may need to update /etc/fstab.

[root@paf-inst ~]# sudo parted -a optimal /dev/sdb mkpart primary ext4 0% 100%
Information: You may need to update /etc/fstab.

[root@paf-inst ~]# lsblk /dev/sdb                                         
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sdb      8:16   0    1T  0 disk 
└─sdb1   8:17   0 1024G  0 part 
[root@paf-inst ~]# sudo mkfs.xfs /dev/sdb1
meta-data=/dev/sdb1              isize=512    agcount=4, agsize=67108736 blks
         =                       sectsz=4096  attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1    bigtime=0 inobtcount=0
data     =                       bsize=4096   blocks=268434944, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=131071, version=2
         =                       sectsz=4096  sunit=1 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
Discarding blocks...Done.
[root@paf-inst ~]# sudo mkdir -p /u02
[root@paf-inst ~]# sudo mount /dev/sdb1 /u02
[root@paf-inst ~]# df -h /u02
Filesystem      Size  Used Avail Use% Mounted on
/dev/sdb1       1.0T  7.2G 1017G   1% /u02
[root@paf-inst ~]# df -h
Filesystem                  Size  Used Avail Use% Mounted on
devtmpfs                     24G     0   24G   0% /dev
tmpfs                        24G  1.3M   24G   1% /dev/shm
tmpfs                        24G  8.9M   24G   1% /run
tmpfs                        24G     0   24G   0% /sys/fs/cgroup
/dev/mapper/ocivolume-root  289G   32G  258G  11% /
/dev/sda2                  1014M  405M  610M  40% /boot
/dev/sda1                   100M  6.0M   94M   6% /boot/efi
/dev/mapper/ocivolume-oled   10G  146M  9.9G   2% /var/oled
tmpfs                       4.7G     0  4.7G   0% /run/user/986
tmpfs                       4.7G   12K  4.7G   1% /run/user/1000
/dev/sdb1                   1.0T  7.2G 1017G   1% /u02
[root@paf-inst ~]# 

## 开机自动挂载
sudo blkid /dev/sdb1
sudo vi /etc/fstab
UUID="UUID from blkid"  /mnt/mydata  xfs  defaults,_netdev  0  2

UUID="4d9526b3-46c5-48a6-a7ca-ae0512a53ccd"  /u02  xfs  defaults,_netdev  0  2

## 查看 iscsi
sudo oci-iscsi-config show --details

[root@paf-inst ~]# sudo oci-iscsi-config show --details
Unable to get volume ocid and display name for iqn [iqn.2015-12.com.oracleiaas:0a1a015c-f193-4335-a7d2-c23a584c6666], 
Currently attached iSCSI devices:
              Target              |  Volume Name  |           Volume OCID            |  Persistent Portal   |    Current Portal    | Session State | Attached Device |  Size  |  Mountpoint  |  Filesystem  |
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 iqn.2015-12.com.oracleiaas:0a... |       -       |                -                 |   169.xxx.2.xxx:xxxx   |   169.xxx.2.xxx:xxxx   |   LOGGED_IN   |       sdb       |   1T   |      -       |      -       |


[root@paf-inst ~]
```

### Ref

- [Database Installation Guide for Linux](https://docs.oracle.com/en/database/oracle/oracle-database/26/ladbi/running-rpm-packages-to-install-oracle-database.html)

- [Install Oracle AI Database 26ai on Oracle Linux](https://blogs.oracle.com/scoter/install-oracle-ai-database-26ai-on-oracle-linux-9)

- [Installation Guide for Linux](https://docs.oracle.com/en/database/oracle/oracle-database/26/xeinl/starting-and-stopping-oracle-database.html)

### Good Day

Have a good work&life! 2026/06 via LinHong
