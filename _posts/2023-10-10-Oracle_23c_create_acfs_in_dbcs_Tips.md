---
layout: post
title: "Oracle 23c create acfs in dbcs Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 23c create acfs in dbcs Tips

Create ACFS for oracle user.










```
[root@hong23c ~]# su - grid
Last login: Tue Oct 10 13:50:55 CST 2023
[grid@hong23c ~]$ asmcmd
ASMCMD> lsdg
State    Type    Rebal  Sector  Logical_Sector  Block       AU  Total_MB  Free_MB  Req_mir_free_MB  Usable_file_MB  Offline_disks  Voting_files  Name
MOUNTED  EXTERN  N         512             512   4096  4194304    262144   252912                0          252912              0             Y  DATA/
MOUNTED  EXTERN  N         512             512   4096  4194304    262144   258832                0          258832              0             N  RECO/
ASMCMD> volinfo -G DATA -a
Diskgroup Name: DATA

	 Volume Name: COMMONSTORE
	 Volume Device: /dev/asm/commonstore-395
	 State: ENABLED
	 Size (MB): 5120
	 Resize Unit (MB): 64
	 Redundancy: UNPROT
	 Stripe Columns: 8
	 Stripe Width (K): 1024
	 Usage: ACFS
	 Mountpath: /opt/oracle/dcs/commonstore 
 
ASMCMD> volcreate -G DATA -s 100G acfs01
ASMCMD> volenable -G DATA acfs01
ASMCMD> volinfo -G DATA -a
Diskgroup Name: DATA

	 Volume Name: ACFS01
	 Volume Device: /dev/asm/acfs01-395
	 State: ENABLED
	 Size (MB): 102400
	 Resize Unit (MB): 64
	 Redundancy: UNPROT
	 Stripe Columns: 8
	 Stripe Width (K): 1024
	 Usage: 
	 Mountpath: 
 
	 Volume Name: COMMONSTORE
	 Volume Device: /dev/asm/commonstore-395
	 State: ENABLED
	 Size (MB): 5120
	 Resize Unit (MB): 64
	 Redundancy: UNPROT
	 Stripe Columns: 8
	 Stripe Width (K): 1024
	 Usage: ACFS
	 Mountpath: /opt/oracle/dcs/commonstore 
 
ASMCMD> exit
[grid@hong23c ~]$ exit
logout
[root@hong23c ~]# su - grid
Last login: Tue Oct 10 14:10:47 CST 2023 on pts/0
[grid@hong23c ~]$ mkfs -t acfs /dev/asm/acfs01-395
mkfs.acfs: version                   = 23.0.0.0.0
mkfs.acfs: on-disk version           = 53.0
mkfs.acfs: volume                    = /dev/asm/acfs01-395
mkfs.acfs: volume size               = 107374182400  ( 100.00 GB )
mkfs.acfs: file system size          = 107374182400  ( 100.00 GB )
mkfs.acfs: Format complete.
[grid@hong23c ~]$ acfsutil registry -a -f /dev/asm/acfs01-395 /acfs01
PRCN-2018 : Current user grid is not a privileged user
acfsutil registry: ACFS-09173: The srvctl command line "/u01/app/23.0.0.0/grid/bin/srvctl add filesystem -device /dev/asm/acfs01-395 -path /acfs01" failed to execute. (0)
acfsutil registry: ACFS-03111: unable to add ACFS mount /acfs01 within Oracle Registry
[grid@hong23c ~]$ exit
logout
[root@hong23c ~]# acfsutil registry -a -f /dev/asm/acfs01-395 /acfs01
acfsutil registry: mount point /acfs01 successfully added to Oracle Registry
[root@hong23c ~]# mount -t acfs /dev/asm/acfs01-395 /acfs01
[root@hong23c ~]# df -h
Filesystem                      Size  Used Avail Use% Mounted on
devtmpfs                         32G     0   32G   0% /dev
tmpfs                            32G  1.7G   30G   6% /dev/shm
tmpfs                            32G  916K   32G   1% /run
tmpfs                            32G     0   32G   0% /sys/fs/cgroup
/dev/mapper/vg00-root           9.6G  3.3G  5.8G  37% /
tmpfs                            32G  248K   32G   1% /tmp
/dev/mapper/vg00-home           958M  176K  891M   1% /home
/dev/mapper/vg00-var            9.6G  525M  8.7G   6% /var
/dev/mapper/vg00-opt             33G  4.2G   28G  14% /opt
tmpfs                            32G   24K   32G   1% /var/tmp
/dev/mapper/vg00-var_log        3.8G   93M  3.5G   3% /var/log
/dev/sda2                       974M  496M  411M  55% /boot
/dev/mapper/vg00-var_log_audit  1.9G   25M  1.8G   2% /var/log/audit
/dev/sda1                       128M  5.1M  123M   4% /boot/efi
/dev/sdj                        196G   11G  175G   6% /u01
oracle_clusterware              128M   16M  113M  12% /u01/app/grid/crsdata/hong23c/shm
/dev/asm/commonstore-395        5.0G  319M  4.7G   7% /opt/oracle/dcs/commonstore
tmpfs                           6.3G     0  6.3G   0% /run/user/102
tmpfs                           6.3G     0  6.3G   0% /run/user/1000
/dev/asm/acfs01-395             100G  576M  100G   1% /acfs01
[root@hong23c ~]# chown oracle.oinstall /acfs01/
[root@hong23c ~]# su - oracle
Last login: Tue Oct 10 14:00:04 CST 2023
[oracle@hong23c ~]$ cd /acfs01/
[oracle@hong23c acfs01]$ touch test01.txt
[oracle@hong23c acfs01]$ 


[root@hong23c ~]# /sbin/acfsutil info storage
Diskgroup      Consumer      Space     Size With Mirroring  Usable Free  %Free   Path
DATA                        256.00             256.00         146.98       57%
                 ACFS01     100.00             100.00          99.44       99%   /acfs01
            COMMONSTORE       5.00               5.00           4.69       93%   /opt/oracle/dcs/commonstore
RECO                        256.00             256.00         252.77       98%
----
unit of measurement: GB
[root@hong23c ~]# 
```

### Referece

[Exadata Cloud Service : ASM Cluster File System (ACFS)設定してみてみた](https://qiita.com/shirok/items/0f6d4d34a56418c42391)


Have a good work&life! 2023/10 via LinHong


