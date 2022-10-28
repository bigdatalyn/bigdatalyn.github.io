---
layout: post
title: "Oracle 23c Beta Install Tips"
category: Oracle
tags: Oracle 23c Tips
---

* content
{:toc}

Oracle 23c Beta Install Tips

### Env

Prepare 23c env file(Ref 21c)

[Oracle 21c Linux 8 Install Tips](https://www.bigdatalyn.com/2021/08/14/Oracle_21c_Linux8_Install_Tips/)

```
[oracle@ol8-21c ~]$ cat /home/oracle/scripts/setEnv_23c.sh
# Oracle Settings
export TMP=/tmp
export TMPDIR=$TMP

export ORACLE_HOSTNAME=ol8-21c
export ORACLE_UNQNAME=cdb2
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=$ORACLE_BASE/product/23.0.0/dbhome_1
export ORA_INVENTORY=/u01/app/oraInventory
export ORACLE_SID=cdb2
export PDB_NAME=pdb1
export DATA_DIR=/u02/oradata

export PATH=/usr/sbin:/usr/local/bin:$PATH
export PATH=$ORACLE_HOME/bin:$PATH

export LD_LIBRARY_PATH=$ORACLE_HOME/lib:/lib:/usr/lib
export CLASSPATH=$ORACLE_HOME/jlib:$ORACLE_HOME/rdbms/jlib
[oracle@ol8-21c ~]$ mkdir -p $ORACLE_BASE/product/23.0.0/dbhome_1
[oracle@ol8-21c ~]$ 
```

### Install 23c via Silent

unzip db_home.zip

```
[oracle@ol8-21c dbhome_1]$ pwd
/u01/app/oracle/product/23.0.0/dbhome_1
[oracle@ol8-21c dbhome_1]$ ls -ltr 
total 0
[oracle@ol8-21c dbhome_1]$ ls -tlr /mnt/db_home.zip 
-rwxrwx---. 1 root vboxsf 3977269804 Oct 28 21:16 /mnt/db_home.zip
[oracle@ol8-21c dbhome_1]$ unzip /mnt/db_home.zip -d /u01/app/oracle/product/23.0.0/dbhome_1
Archive:  /mnt/db_home.zip
  inflating: /u01/app/oracle/product/23.0.0/dbhome_1/oracore/zoneinfo/little/timezlrg_13.dat  
  inflating: /u01/app/oracle/product/23.0.0/dbhome_1/slax/mesg/pxi.msb  

~

  /u01/app/oracle/product/23.0.0/dbhome_1/python/lib/libz.so -> libz.so.1.2.11
  /u01/app/oracle/product/23.0.0/dbhome_1/python/lib/libffi.so.6 -> libffi.so.6.0.4
  /u01/app/oracle/product/23.0.0/dbhome_1/python/lib/pkgconfig/python3-embed.pc -> python-3.10-embed.pc
[oracle@ol8-21c dbhome_1]$ 
[oracle@ol8-21c dbhome_1]$ du -sm ./
8623	./
[oracle@ol8-21c dbhome_1]$

```

```
# Silent mode.
./runInstaller -ignorePrereq -waitforcompletion -silent                        \
    -responseFile ${ORACLE_HOME}/install/response/db_install.rsp               \
    oracle.install.option=INSTALL_DB_SWONLY                                    \
    ORACLE_HOSTNAME=${ORACLE_HOSTNAME}                                         \
    UNIX_GROUP_NAME=oinstall                                                   \
    INVENTORY_LOCATION=${ORA_INVENTORY}                                        \
    SELECTED_LANGUAGES=en,en_GB                                                \
    ORACLE_HOME=${ORACLE_HOME}                                                 \
    ORACLE_BASE=${ORACLE_BASE}                                                 \
    oracle.install.db.InstallEdition=EE                                        \
    oracle.install.db.OSDBA_GROUP=dba                                          \
    oracle.install.db.OSBACKUPDBA_GROUP=dba                                    \
    oracle.install.db.OSDGDBA_GROUP=dba                                        \
    oracle.install.db.OSKMDBA_GROUP=dba                                        \
    oracle.install.db.OSRACDBA_GROUP=dba                                       \
    SECURITY_UPDATES_VIA_MYORACLESUPPORT=false                                 \
    DECLINE_SECURITY_UPDATES=true

```



### fdisk new disk

```
[root@ol8-21c ~]# fdisk /dev/sdb

Welcome to fdisk (util-linux 2.32.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x9b108eb3.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1): 
First sector (2048-31457279, default 2048): 
Last sector, +sectors or +size{K,M,G,T,P} (2048-31457279, default 31457279): 

Created a new partition 1 of type 'Linux' and of size 15 GiB.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.

[root@ol8-21c ~]# fdisk -l
Disk /dev/sda: 40 GiB, 42949672960 bytes, 83886080 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x70f9ec89

Device     Boot   Start      End  Sectors Size Id Type
/dev/sda1  *       2048  2099199  2097152   1G 83 Linux
/dev/sda2       2099200 67108863 65009664  31G 8e Linux LVM


Disk /dev/sdb: 15 GiB, 16106127360 bytes, 31457280 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x9b108eb3

Device     Boot Start      End  Sectors Size Id Type
/dev/sdb1        2048 31457279 31455232  15G 83 Linux


Disk /dev/mapper/ol-root: 27.8 GiB, 29842472960 bytes, 58286080 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/ol-swap: 3.2 GiB, 3439329280 bytes, 6717440 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
[root@ol8-21c ~]# mkfs.xfs /dev/sdb1
meta-data=/dev/sdb1              isize=512    agcount=4, agsize=982976 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1
data     =                       bsize=4096   blocks=3931904, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
[root@ol8-21c ~]# ls -l /u02
total 0
drwxrwxr-x. 3 oracle oinstall 18 Aug 14  2021 oradata
[root@ol8-21c ~]# mkdir /u23
[root@ol8-21c ~]# mount /dev/sdb1 /u23
[root@ol8-21c ~]# vim /etc/fstab 
[root@ol8-21c ~]# cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Sat Aug 14 04:01:03 2021
#
# Accessible filesystems, by reference, are maintained under '/dev/disk/'.
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info.
#
# After editing this file, run 'systemctl daemon-reload' to update systemd
# units generated from this file.
#
/dev/mapper/ol-root     /                       xfs     defaults        0 0
UUID=fe41be81-2263-468c-856e-14007d659855 /boot                   xfs     defaults        0 0
/dev/mapper/ol-swap     none                    swap    defaults        0 0
/dev/sdb1 		/u23			xfs	defaults	0 0
[root@ol8-21c ~]# 
[root@ol8-21c ~]# df -h
Filesystem           Size  Used Avail Use% Mounted on
devtmpfs             1.8G     0  1.8G   0% /dev
tmpfs                1.8G     0  1.8G   0% /dev/shm
tmpfs                1.8G  9.3M  1.8G   1% /run
tmpfs                1.8G     0  1.8G   0% /sys/fs/cgroup
/dev/mapper/ol-root   28G   26G  2.0G  93% /
/dev/sda1           1014M  448M  567M  45% /boot
tmpfs                365M  4.6M  361M   2% /run/user/54321
vm_folder            425G  251G  175G  59% /mnt
/dev/sr0              59M   59M     0 100% /run/media/oracle/VBox_GAs_6.1.26
/dev/sdb1             15G  140M   15G   1% /u23
[root@ol8-21c ~]# 
```

### Reference

[Oracle Beta Programs](https://tinyurl.com/OracleBeta)

[Oracle Database 23c Beta Program](https://blogs.oracle.com/database/post/oracle-database-23c-beta-program)

Have a good work&life! 2022/10 via LinHong

