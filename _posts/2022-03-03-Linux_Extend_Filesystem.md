---
layout: post
title: "Linux extend filesystem Tips"
category: Linux
tags: Linux Tips
---

* content
{:toc}

Linux extend filesystem Tips

How to extend filesystem in virtualbox Linux?
- /root filesystem free size is NOT enough.







### Env

Host
```
macOS Big Sur Version 11.6
```

Virtualbox version
```
VirtualBox Graphical User Interface
Version 6.1.22 r144080 (Qt5.6.3)
```

VM: centos 7
```
[root@centos7 ~]# cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
[root@centos7 ~]# uname -a
Linux centos7 3.10.0-1160.59.1.el7.x86_64 #1 SMP Wed Feb 23 16:47:03 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux
[root@centos7 ~]#
```

### VBoxManage modifymedium in host(mas-os)

Extend the vdi size in host.
- From 20480 MB to 30720 MB

```
my-macos-mac ~ % VBoxManage list hdds

UUID:           d43a74a4-d0de-49c2-8552-21a98dcd768b
Parent UUID:    base
State:          locked write
Type:           normal (base)
Location:       /Users/honglin/VirtualBox VMs/centos7/centos7.vdi
Storage format: VDI
Capacity:       20480 MBytes
Encryption:     disabled

my-macos-mac ~ % VBoxManage modifymedium /Users/honglin/VirtualBox\ VMs/centos7/centos7.vdi --resize 30720
0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...100%
my-macos-mac ~ %

my-macos-mac ~ % VBoxManage list hdds

UUID:           d43a74a4-d0de-49c2-8552-21a98dcd768b
Parent UUID:    base
State:          created
Type:           normal (base)
Location:       /Users/honglin/VirtualBox VMs/centos7/centos7.vdi
Storage format: VDI
Capacity:       30720 MBytes
Encryption:     disabled

[root@centos7 ~]# df -h
[root@centos7 ~]# fdisk -l /dev/sda

Disk /dev/sda: 32.2 GB, 32212254720 bytes, 62914560 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000beddc

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     2099199     1048576   83  Linux
/dev/sda2         2099200    41943039    19921920   8e  Linux LVM
[root@centos7 ~]#

```

### fdisk -l /dev/sda

Format the /dev/sda(root vg) via following commands.
- m / n / p / w


```
Command (m for help): m
Command action
   a   toggle a bootable flag
   b   edit bsd disklabel
   c   toggle the dos compatibility flag
   d   delete a partition
   g   create a new empty GPT partition table
   G   create an IRIX (SGI) partition table
   l   list known partition types
   m   print this menu
   n   add a new partition
   o   create a new empty DOS partition table
   p   print the partition table
   q   quit without saving changes
   s   create a new empty Sun disklabel
   t   change a partition's system id
   u   change display/entry units
   v   verify the partition table
   w   write table to disk and exit
   x   extra functionality (experts only)

Command (m for help): n
Partition type:
   p   primary (2 primary, 0 extended, 2 free)
   e   extended
Select (default p): p
Partition number (3,4, default 3):
First sector (41943040-62914559, default 41943040):
Using default value 41943040
Last sector, +sectors or +size{K,M,G} (41943040-62914559, default 62914559):
Using default value 62914559
Partition 3 of type Linux and of size 10 GiB is set

Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.

WARNING: Re-reading the partition table failed with error 16: Device or resource busy.
The kernel still uses the old table. The new table will be used at
the next reboot or after you run partprobe(8) or kpartx(8)
Syncing disks.
[root@centos7 ~]# fdisk -l

Disk /dev/sda: 32.2 GB, 32212254720 bytes, 62914560 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000beddc

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     2099199     1048576   83  Linux
/dev/sda2         2099200    41943039    19921920   8e  Linux LVM
/dev/sda3        41943040    62914559    10485760   83  Linux

Disk /dev/mapper/centos-root: 18.2 GB, 18249416704 bytes, 35643392 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/mapper/centos-swap: 2147 MB, 2147483648 bytes, 4194304 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

[root@centos7 ~]#
```

`/dev/sda3        41943040    62914559    10485760   83  Linux` can be used after reboot virtualbox os.


### format disk

Format disk and extend the filesystem.

```
fdisk -l
ls -l /dev/sda3
pvcreate /dev/sda3
pvdisplay
vgdisplay
vgextend centos /dev/sda3
lvdisplay
lvextend -L +10G /dev/centos/root
df -Th
xfs_growfs /dev/centos/root
```

Sample:
```
my-macos-mac ~ % ssh root@127.0.0.1 -p2223
root@127.0.0.1's password:
Last login: Fri Mar  4 10:29:17 2022 from gateway
[root@centos7 ~]# fdisk -l

Disk /dev/sda: 32.2 GB, 32212254720 bytes, 62914560 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000beddc

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     2099199     1048576   83  Linux
/dev/sda2         2099200    41943039    19921920   8e  Linux LVM
/dev/sda3        41943040    62914559    10485760   83  Linux

Disk /dev/mapper/centos-root: 18.2 GB, 18249416704 bytes, 35643392 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

Disk /dev/mapper/centos-swap: 2147 MB, 2147483648 bytes, 4194304 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

[root@centos7 ~]# ls -l /dev/sda3
brw-rw---- 1 root disk 8, 3 Mar  4 10:38 /dev/sda3
[root@centos7 ~]# mkfs.xfs /dev/sda3
mkfs.xfs: /dev/sda3 appears to contain a partition table (dos).
mkfs.xfs: Use the -f option to force overwrite.
[root@centos7 ~]# fdisk -l

Disk /dev/sda: 32.2 GB, 32212254720 bytes, 62914560 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x000beddc

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1   *        2048     2099199     1048576   83  Linux
/dev/sda2         2099200    41943039    19921920   8e  Linux LVM
/dev/sda3        41943040    62914559    10485760   83  Linux

Disk /dev/mapper/centos-root: 18.2 GB, 18249416704 bytes, 35643392 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

Disk /dev/mapper/centos-swap: 2147 MB, 2147483648 bytes, 4194304 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

[root@centos7 ~]# pvcreate /dev/sda3
WARNING: dos signature detected on /dev/sda3 at offset 510. Wipe it? [y/n]: y
  Wiping dos signature on /dev/sda3.
  Physical volume "/dev/sda3" successfully created.
[root@centos7 ~]# pvdisplay
  --- Physical volume ---
  PV Name               /dev/sda2
  VG Name               centos
  PV Size               <19.00 GiB / not usable 3.00 MiB
  Allocatable           yes (but full)
  PE Size               4.00 MiB
  Total PE              4863
  Free PE               0
  Allocated PE          4863
  PV UUID               a0E967-Ra9B-PvI2-DzIE-IEI1-wWT9-RcqdZF

  "/dev/sda3" is a new physical volume of "10.00 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sda3
  VG Name
  PV Size               10.00 GiB
  Allocatable           NO
  PE Size               0
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               vUFgnU-CnKV-lOxp-1w3y-DaZl-p9g8-dVVJO8

[root@centos7 ~]# vgdisplay
  --- Volume group ---
  VG Name               centos
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  3
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               2
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               <19.00 GiB
  PE Size               4.00 MiB
  Total PE              4863
  Alloc PE / Size       4863 / <19.00 GiB
  Free  PE / Size       0 / 0
  VG UUID               QDzBIM-5pqi-1yTB-2Arv-Dno0-xlws-Tne6zr

[root@centos7 ~]# vgextend centos /dev/sda3
  Volume group "centos" successfully extended
[root@centos7 ~]# vgdisplay
  --- Volume group ---
  VG Name               centos
  System ID
  Format                lvm2
  Metadata Areas        2
  Metadata Sequence No  4
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               2
  Max PV                0
  Cur PV                2
  Act PV                2
  VG Size               28.99 GiB
  PE Size               4.00 MiB
  Total PE              7422
  Alloc PE / Size       4863 / <19.00 GiB
  Free  PE / Size       2559 / <10.00 GiB
  VG UUID               QDzBIM-5pqi-1yTB-2Arv-Dno0-xlws-Tne6zr

[root@centos7 ~]# lvdisplay
  --- Logical volume ---
  LV Path                /dev/centos/swap
  LV Name                swap
  VG Name                centos
  LV UUID                zIjd1N-6fSD-ey2F-LlXh-U9qA-CH9E-8BtyLu
  LV Write Access        read/write
  LV Creation host, time localhost, 2022-01-04 10:08:20 +0800
  LV Status              available
  # open                 2
  LV Size                2.00 GiB
  Current LE             512
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:1

  --- Logical volume ---
  LV Path                /dev/centos/root
  LV Name                root
  VG Name                centos
  LV UUID                YoNZgP-6EVf-Da2M-BXHz-jbkK-PkUJ-1vfqWm
  LV Write Access        read/write
  LV Creation host, time localhost, 2022-01-04 10:08:20 +0800
  LV Status              available
  # open                 1
  LV Size                <17.00 GiB
  Current LE             4351
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:0

[root@centos7 ~]# lvextend -L +10G /dev/centos/root
  Insufficient free space: 2560 extents needed, but only 2559 available
[root@centos7 ~]# lvextend -L +9.5G /dev/centos/root
  Size of logical volume centos/root changed from <17.00 GiB (4351 extents) to <26.50 GiB (6783 extents).
  Logical volume centos/root successfully resized.
[root@centos7 ~]# lvdisplay
  --- Logical volume ---
  LV Path                /dev/centos/swap
  LV Name                swap
  VG Name                centos
  LV UUID                zIjd1N-6fSD-ey2F-LlXh-U9qA-CH9E-8BtyLu
  LV Write Access        read/write
  LV Creation host, time localhost, 2022-01-04 10:08:20 +0800
  LV Status              available
  # open                 2
  LV Size                2.00 GiB
  Current LE             512
  Segments               1
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:1

  --- Logical volume ---
  LV Path                /dev/centos/root
  LV Name                root
  VG Name                centos
  LV UUID                YoNZgP-6EVf-Da2M-BXHz-jbkK-PkUJ-1vfqWm
  LV Write Access        read/write
  LV Creation host, time localhost, 2022-01-04 10:08:20 +0800
  LV Status              available
  # open                 1
  LV Size                <26.50 GiB
  Current LE             6783
  Segments               2
  Allocation             inherit
  Read ahead sectors     auto
  - currently set to     8192
  Block device           253:0

[root@centos7 ~]# df -Th
Filesystem              Type      Size  Used Avail Use% Mounted on
devtmpfs                devtmpfs  903M     0  903M   0% /dev
tmpfs                   tmpfs     919M     0  919M   0% /dev/shm
tmpfs                   tmpfs     919M  9.3M  910M   2% /run
tmpfs                   tmpfs     919M     0  919M   0% /sys/fs/cgroup
/dev/mapper/centos-root xfs        17G   13G  5.0G  72% /
/dev/sda1               xfs      1014M  185M  830M  19% /boot
Downloads               vboxsf    466G  408G   59G  88% /media
tmpfs                   tmpfs     184M  8.0K  184M   1% /run/user/42
tmpfs                   tmpfs     184M     0  184M   0% /run/user/0
[root@centos7 ~]# xfs_growfs /dev/centos/root
meta-data=/dev/mapper/centos-root isize=512    agcount=4, agsize=1113856 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=0 spinodes=0
data     =                       bsize=4096   blocks=4455424, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
log      =internal               bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
data blocks changed from 4455424 to 6945792
[root@centos7 ~]# df -Th
Filesystem              Type      Size  Used Avail Use% Mounted on
devtmpfs                devtmpfs  903M     0  903M   0% /dev
tmpfs                   tmpfs     919M     0  919M   0% /dev/shm
tmpfs                   tmpfs     919M  9.3M  910M   2% /run
tmpfs                   tmpfs     919M     0  919M   0% /sys/fs/cgroup
/dev/mapper/centos-root xfs        27G   13G   15G  46% /
/dev/sda1               xfs      1014M  185M  830M  19% /boot
Downloads               vboxsf    466G  408G   59G  88% /media
tmpfs                   tmpfs     184M  8.0K  184M   1% /run/user/42
tmpfs                   tmpfs     184M     0  184M   0% /run/user/0
[root@centos7 ~]#
```

root filesystem had extended to 27G from 17G.


	
Have a good work&life! 2022/03 via LinHong



