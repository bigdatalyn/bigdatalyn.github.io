---
layout: post
title: "Oracle OCI Resize root volume Tips"
category: Oracle
tags: Oracle OCI Tips
---

* content
{:toc}

Oracle OCI Resize root volume Tips

The Oracle Cloud Infrastructure Block Volume service lets you expand the size of block volumes and boot volumes. You have several options to increase the size of your volumes:

- Expand an existing volume in place with online resizing. See Online Resizing of Block Volumes Using the Console for the steps to do this.

- Restore from a volume backup to a larger volume. See Restoring a Backup to a New Volume and Restoring a Boot Volume.

- Clone an existing volume to a new, larger volume. See Cloning a Volume and Cloning a Boot Volume.

- Expand an existing volume in place with offline resizing. See Offline Resizing of Block Volumes Using the Console for the steps to do this.








### oci-growfs

Extend the partition and grow the file system using the oci-growfs

By default, a boot volume for a compute instance extends only to 50 GB, which is the default minimum size. If a compute instance is created with a boot volume that is greater than or equal to 50 GB, the instance does not automatically use the entire volume. Use the oci-growfs utility to expand the root partition to fully utilize the allocated boot volume size. When the partition already extends to the entire volume, no changes are made to the system when using the utility.

Linux 8 / root vg from 50G to 200G via `oci-growfs`.

```
[root@oci-ash-inst ~]# df -h
Filesystem                  Size  Used Avail Use% Mounted on
devtmpfs                     32G     0   32G   0% /dev
tmpfs                        32G     0   32G   0% /dev/shm
tmpfs                        32G  8.7M   32G   1% /run
tmpfs                        32G     0   32G   0% /sys/fs/cgroup
/dev/mapper/ocivolume-root   36G   12G   24G  33% /
/dev/mapper/ocivolume-oled   10G  105M  9.9G   2% /var/oled
/dev/sda2                  1014M  324M  691M  32% /boot
/dev/sda1                   100M  5.0M   95M   6% /boot/efi
tmpfs                       6.3G     0  6.3G   0% /run/user/0
tmpfs                       6.3G     0  6.3G   0% /run/user/987
tmpfs                       6.3G     0  6.3G   0% /run/user/1000
[root@oci-ash-inst ~]#
[root@oci-ash-inst ~]# /usr/libexec/oci-growfs
Volume Group: ocivolume
Volume Path: /dev/ocivolume/root
Mountpoint Data     
---------------
          mountpoint: /
              source: /dev/mapper/ocivolume-root
     filesystem type: xfs
         source size: 35.5G
                type: lvm
                size: 35.5G
    physical devices: ['/dev/sda3']
    physical volumes: ['/dev/sda', '/dev/sda']
    partition number: ['3']
   volume group name: ocivolume
   volume group path: /dev/ocivolume/root

Partition dry run expansion "/dev/sda3" succeeded.
CHANGE: partition=3 start=2304000 old: size=95371264 end=97675264 new: size=417126367 end=419430367

Expanding partition /dev/sda3: Confirm?   [y/N] y

Partition expand expansion "/dev/sda3" succeeded.
update-partition set to true
resizing 3 on /dev/sda using resize_sfdisk_gpt
419430400 sectors of 512. total size=214748364800 bytes
## sfdisk --unit=S --dump /dev/sda
label: gpt
label-id: 347FC70E-7421-4C2C-82F1-CCEF19B84F66
device: /dev/sda
unit: sectors
first-lba: 34
last-lba: 419430366

/dev/sda1 : start=        2048, size=      204800, type=C12A7328-F81F-11D2-BA4B-00A0C93EC93B, uuid=37CE5210-0BDF-4316-BADB-E1E509715029, name="EFI System Partition"
/dev/sda2 : start=      206848, size=     2097152, type=0FC63DAF-8483-4772-8E79-3D69D8477DE4, uuid=9C504518-052F-4857-B9B9-6958DD401414
/dev/sda3 : start=     2304000, size=    95371264, type=E6D6D379-F507-44C2-A23C-238F2A3DF928, uuid=E25E679A-CF9E-4F43-A85F-7C3C7D16F8FF
padding 33 sectors for gpt secondary header
max_end=419430367 tot=419430400 pt_end=97675264 pt_start=2304000 pt_size=95371264
resize of /dev/sda returned 0.

CHANGED: partition=3 start=2304000 old: size=95371264 end=97675264 new: size=417126367 end=419430367

Extending /dev/sda3 succeeded.
Device /dev/sda3 extended successfully.
Logical volume /dev/ocivolume/root extended successfully.
[root@oci-ash-inst ~]# df -h
Filesystem                  Size  Used Avail Use% Mounted on
devtmpfs                     32G     0   32G   0% /dev
tmpfs                        32G     0   32G   0% /dev/shm
tmpfs                        32G  8.7M   32G   1% /run
tmpfs                        32G     0   32G   0% /sys/fs/cgroup
/dev/mapper/ocivolume-root  189G   13G  177G   7% /
/dev/mapper/ocivolume-oled   10G  105M  9.9G   2% /var/oled
/dev/sda2                  1014M  324M  691M  32% /boot
/dev/sda1                   100M  5.0M   95M   6% /boot/efi
tmpfs                       6.3G     0  6.3G   0% /run/user/0
tmpfs                       6.3G     0  6.3G   0% /run/user/987
tmpfs                       6.3G     0  6.3G   0% /run/user/1000
[root@oci-ash-inst ~]#
[root@oci-ash-inst ~]# df -h
Filesystem                  Size  Used Avail Use% Mounted on
devtmpfs                     32G     0   32G   0% /dev
tmpfs                        32G     0   32G   0% /dev/shm
tmpfs                        32G  8.7M   32G   1% /run
tmpfs                        32G     0   32G   0% /sys/fs/cgroup
/dev/mapper/ocivolume-root  189G   13G  177G   7% /
/dev/mapper/ocivolume-oled   10G  105M  9.9G   2% /var/oled
/dev/sda2                  1014M  324M  691M  32% /boot
/dev/sda1                   100M  5.0M   95M   6% /boot/efi
tmpfs                       6.3G     0  6.3G   0% /run/user/0
tmpfs                       6.3G     0  6.3G   0% /run/user/987
tmpfs                       6.3G     0  6.3G   0% /run/user/1000
[root@oci-ash-inst ~]# 
```


Rescanning the Disk for Volumes Attached to Linux-Based Instances.
```
sudo dd iflag=direct if= /dev/oracleoci/oraclevd<device name> of=/dev/null count=1
echo "1" | sudo tee /sys/class/block/`readlink /dev/oracleoci/oraclevd<device name> | cut -d'/' -f 2`/device/rescan
```

### Reference 

[Resizing a Volume](https://docs.oracle.com/en-us/iaas/Content/Block/Tasks/resizingavolume.htm)


Have a good work&life! 2023/01 via LinHong


