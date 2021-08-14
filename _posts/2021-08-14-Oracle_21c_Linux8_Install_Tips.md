---
layout: post
title: "Oracle 21c Linux 8 Install Tips"
category: Oracle
tags: Oracle 21c Tips
---

* content
{:toc}

Oracle 21c Linux 8 Install Tips

Oracle database 21c release - only linux at 8/13/2021

The latest Innovation release of the world's most popular database, Oracle Database 21c, is now generally available "cloud first" in the Oracle Cloud Database Service Virtual Machine (for RAC and single instance) and Bare Metal Service (single instance). It's also available in the Autonomous Database Free Tier Service in Ashburn (IAD), Phoenix (PHX), Frankfurt (FRA) and London (LHR) regions. General availability of Oracle Database 21c for on-prem platforms (including Exadata, Linux and Windows) will follow along in 2021.

[Introducing Oracle Database 21c](https://blogs.oracle.com/database/post/introducing-oracle-database-21c)









### Download

[virtualbox 6.1](https://www.virtualbox.org/wiki/Downloads)

[Oracle Linux 8.4](https://www.oracle.com/linux/technologies/oracle-linux-downloads.html)

[Oracle database 21c](https://www.oracle.com/database/technologies/oracle-database-software-downloads.html)

Ref:

[Oracle Database 19c Installation On Oracle Linux 8 (OL8)](https://oracle-base.com/articles/19c/oracle-db-19c-installation-on-oracle-linux-8)


### Linux 8.4 install tips

```
hostonly -> network

NAT -> network

hostnamectl set-hostname ol8-21c

timedatectl set-timezone Asia/Shanghai
```

selinux:
```
[root@ol8-21c ~]# grep SELINUX /etc/selinux/config 
# SELINUX= can take one of these three values:
# SELINUX=enforcing
SELINUX=permissive
# SELINUXTYPE= can take one of these three values:
SELINUXTYPE=targeted
[root@ol8-21c ~]# 
```

firewall
```
[root@ol8-21c ~]# systemctl stop firewalld
[root@ol8-21c ~]# systemctl status firewalld
● firewalld.service - firewalld - dynamic firewall daemon
   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)
   Active: inactive (dead) since Sat 2021-08-14 14:15:47 CST; 6s ago
     Docs: man:firewalld(1)
  Process: 816 ExecStart=/usr/sbin/firewalld --nofork --nopid $FIREWALLD_ARGS (code=exited, status=0/SUCCESS)
 Main PID: 816 (code=exited, status=0/SUCCESS)

Aug 14 14:03:42 localhost.localdomain systemd[1]: Starting firewalld - dynamic firewall daemon...
Aug 14 14:03:44 localhost.localdomain systemd[1]: Started firewalld - dynamic firewall daemon.
Aug 14 14:03:45 localhost.localdomain firewalld[816]: WARNING: AllowZoneDrifting is enabled. This is considered an insecure c>
Aug 14 14:15:47 ol8-21c systemd[1]: Stopping firewalld - dynamic firewall daemon...
Aug 14 14:15:47 ol8-21c systemd[1]: firewalld.service: Succeeded.
Aug 14 14:15:47 ol8-21c systemd[1]: Stopped firewalld - dynamic firewall daemon.
[root@ol8-21c ~]# 
[root@ol8-21c ~]# 
[root@ol8-21c ~]# systemctl disable firewalld
Removed /etc/systemd/system/multi-user.target.wants/firewalld.service.
Removed /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service.
[root@ol8-21c ~]# 
```

ssh service:
```
[root@ol8-21c ~]# systemctl status sshd.service
● sshd.service - OpenSSH server daemon
   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled; vendor preset: enabled)
   Active: active (running) since Sat 2021-08-14 14:03:45 CST; 13min ago
     Docs: man:sshd(8)
           man:sshd_config(5)
 Main PID: 892 (sshd)
    Tasks: 1 (limit: 22961)
   Memory: 4.0M
   CGroup: /system.slice/sshd.service
           └─892 /usr/sbin/sshd -D -oCiphers=aes256-gcm@openssh.com,chacha20-poly1305@openssh.com,aes256-ctr,aes256-cbc,aes12>

Aug 14 14:03:44 localhost.localdomain systemd[1]: Starting OpenSSH server daemon...
Aug 14 14:03:45 localhost.localdomain sshd[892]: Server listening on 0.0.0.0 port 22.
Aug 14 14:03:45 localhost.localdomain systemd[1]: Started OpenSSH server daemon.
Aug 14 14:03:45 localhost.localdomain sshd[892]: Server listening on :: port 22.
Aug 14 14:09:01 localhost.localdomain sshd[3169]: Accepted password for root from 10.0.2.2 port 63820 ssh2
Aug 14 14:09:01 localhost.localdomain sshd[3169]: pam_unix(sshd:session): session opened for user root by (uid=0)
[root@ol8-21c ~]# 
[root@ol8-21c ~]# systemctl enable sshd.service
[root@ol8-21c ~]# 
```

/etc/hosts and hostname
```
[root@ol8-21c ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
192.168.56.101 ol8-21c
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
[root@ol8-21c ~]# cat /etc/hostname
ol8-21c
[root@ol8-21c ~]#
```

Oracle Installation Prerequisites:

oracle-database-preinstall-21c is still NOT provided at 2021/08/14.

```
The following rpm are provided.
https://yum.oracle.com/repo/OracleLinux/OL8/appstream/x86_64/
	oracle-database-preinstall-19c-1.0-1.el8.x86_64.rpm
    oracle-database-preinstall-19c-1.0-2.el8.x86_64.rpm
```

```
[root@ol8-21c ~]# dnf install -y oracle-database-preinstall-21c
Oracle Linux 8 BaseOS Latest (x86_64)                                                         6.7 MB/s |  39 MB     00:05    
Oracle Linux 8 Application Stream (x86_64)                                                    4.3 MB/s |  27 MB     00:06    
Latest Unbreakable Enterprise Kernel Release 6 for Oracle Linux 8 (x86_64)                    5.7 MB/s |  25 MB     00:04    
Last metadata expiration check: 0:00:03 ago on Sat 14 Aug 2021 02:49:12 PM CST.
No match for argument: oracle-database-preinstall-21c
Error: Unable to find a match: oracle-database-preinstall-21c
[root@ol8-21c ~]# dnf install -y oracle-database-preinstall-19c
Last metadata expiration check: 0:00:35 ago on Sat 14 Aug 2021 02:49:12 PM CST.
Dependencies resolved.
==============================================================================================================================
 Package                               Architecture  Version                                   Repository                Size
==============================================================================================================================
Installing:
 oracle-database-preinstall-19c        x86_64        1.0-2.el8                                 ol8_appstream             31 k
Installing dependencies:
 glibc-devel                           x86_64        2.28-151.0.1.el8                          ol8_baseos_latest        1.0 M
 ksh                                   x86_64        20120801-254.0.1.el8                      ol8_appstream            927 k
 libaio-devel                          x86_64        0.3.112-1.el8                             ol8_baseos_latest         19 k
 libnsl                                x86_64        2.28-151.0.1.el8                          ol8_baseos_latest        102 k
 libstdc++-devel                       x86_64        8.4.1-1.0.1.el8                           ol8_appstream            2.1 M
 libxcrypt-devel                       x86_64        4.1.1-4.el8                               ol8_baseos_latest         25 k
 lm_sensors-libs                       x86_64        3.4.0-22.20180522git70f7e08.el8           ol8_baseos_latest         59 k
 make                                  x86_64        1:4.2.1-10.el8                            ol8_baseos_latest        498 k
 sysstat                               x86_64        11.7.3-5.0.1.el8                          ol8_appstream            425 k

Transaction Summary
==============================================================================================================================
Install  10 Packages

Total download size: 5.1 M
Installed size: 19 M
Downloading Packages:
(1/10): libaio-devel-0.3.112-1.el8.x86_64.rpm                                                  33 kB/s |  19 kB     00:00    
(2/10): libnsl-2.28-151.0.1.el8.x86_64.rpm                                                    139 kB/s | 102 kB     00:00    
(3/10): libxcrypt-devel-4.1.1-4.el8.x86_64.rpm                                                139 kB/s |  25 kB     00:00    
(4/10): lm_sensors-libs-3.4.0-22.20180522git70f7e08.el8.x86_64.rpm                            333 kB/s |  59 kB     00:00    
(5/10): glibc-devel-2.28-151.0.1.el8.x86_64.rpm                                               816 kB/s | 1.0 MB     00:01    
(6/10): make-4.2.1-10.el8.x86_64.rpm                                                          695 kB/s | 498 kB     00:00    
(7/10): ksh-20120801-254.0.1.el8.x86_64.rpm                                                   1.4 MB/s | 927 kB     00:00    
(8/10): oracle-database-preinstall-19c-1.0-2.el8.x86_64.rpm                                   225 kB/s |  31 kB     00:00    
(9/10): sysstat-11.7.3-5.0.1.el8.x86_64.rpm                                                   1.5 MB/s | 425 kB     00:00    
(10/10): libstdc++-devel-8.4.1-1.0.1.el8.x86_64.rpm                                           3.4 MB/s | 2.1 MB     00:00    
------------------------------------------------------------------------------------------------------------------------------
Total                                                                                         2.7 MB/s | 5.1 MB     00:01     
warning: /var/cache/dnf/ol8_baseos_latest-e4c6155830ad002c/packages/glibc-devel-2.28-151.0.1.el8.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID ad986da3: NOKEY
Oracle Linux 8 BaseOS Latest (x86_64)                                                         3.0 MB/s | 3.1 kB     00:00    
Importing GPG key 0xAD986DA3:
 Userid     : "Oracle OSS group (Open Source Software group) <build@oss.oracle.com>"
 Fingerprint: 76FD 3DB1 3AB6 7410 B89D B10E 8256 2EA9 AD98 6DA3
 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-oracle
Key imported successfully
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                      1/1 
  Installing       : libxcrypt-devel-4.1.1-4.el8.x86_64                                                                  1/10 
  Installing       : glibc-devel-2.28-151.0.1.el8.x86_64                                                                 2/10 
  Running scriptlet: glibc-devel-2.28-151.0.1.el8.x86_64                                                                 2/10 
  Installing       : libstdc++-devel-8.4.1-1.0.1.el8.x86_64                                                              3/10 
  Installing       : ksh-20120801-254.0.1.el8.x86_64                                                                     4/10 
  Running scriptlet: ksh-20120801-254.0.1.el8.x86_64                                                                     4/10 
  Installing       : make-1:4.2.1-10.el8.x86_64                                                                          5/10 
  Running scriptlet: make-1:4.2.1-10.el8.x86_64                                                                          5/10 
  Installing       : lm_sensors-libs-3.4.0-22.20180522git70f7e08.el8.x86_64                                              6/10 
  Running scriptlet: lm_sensors-libs-3.4.0-22.20180522git70f7e08.el8.x86_64                                              6/10 
/sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored

  Installing       : sysstat-11.7.3-5.0.1.el8.x86_64                                                                     7/10 
  Running scriptlet: sysstat-11.7.3-5.0.1.el8.x86_64                                                                     7/10 
  Installing       : libnsl-2.28-151.0.1.el8.x86_64                                                                      8/10 
  Installing       : libaio-devel-0.3.112-1.el8.x86_64                                                                   9/10 
  Running scriptlet: oracle-database-preinstall-19c-1.0-2.el8.x86_64                                                    10/10 
  Installing       : oracle-database-preinstall-19c-1.0-2.el8.x86_64                                                    10/10 
  Running scriptlet: oracle-database-preinstall-19c-1.0-2.el8.x86_64                                                    10/10 
/sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored

  Verifying        : glibc-devel-2.28-151.0.1.el8.x86_64                                                                 1/10 
  Verifying        : libaio-devel-0.3.112-1.el8.x86_64                                                                   2/10 
  Verifying        : libnsl-2.28-151.0.1.el8.x86_64                                                                      3/10 
  Verifying        : libxcrypt-devel-4.1.1-4.el8.x86_64                                                                  4/10 
  Verifying        : lm_sensors-libs-3.4.0-22.20180522git70f7e08.el8.x86_64                                              5/10 
  Verifying        : make-1:4.2.1-10.el8.x86_64                                                                          6/10 
  Verifying        : ksh-20120801-254.0.1.el8.x86_64                                                                     7/10 
  Verifying        : libstdc++-devel-8.4.1-1.0.1.el8.x86_64                                                              8/10 
  Verifying        : oracle-database-preinstall-19c-1.0-2.el8.x86_64                                                     9/10 
  Verifying        : sysstat-11.7.3-5.0.1.el8.x86_64                                                                    10/10 

Installed:
  glibc-devel-2.28-151.0.1.el8.x86_64                                     ksh-20120801-254.0.1.el8.x86_64                    
  libaio-devel-0.3.112-1.el8.x86_64                                       libnsl-2.28-151.0.1.el8.x86_64                     
  libstdc++-devel-8.4.1-1.0.1.el8.x86_64                                  libxcrypt-devel-4.1.1-4.el8.x86_64                 
  lm_sensors-libs-3.4.0-22.20180522git70f7e08.el8.x86_64                  make-1:4.2.1-10.el8.x86_64                         
  oracle-database-preinstall-19c-1.0-2.el8.x86_64                         sysstat-11.7.3-5.0.1.el8.x86_64                    

Complete!
[root@ol8-21c ~]# 
```

Update kernel and mount share folder

```
VirtualBox Oracle VM VirtualBox Extension Pack - 6.1.26 

[root@ol8-21c VBox_GAs_6.1.26]# pwd
/run/media/root/VBox_GAs_6.1.26
[root@ol8-21c VBox_GAs_6.1.26]# sh VBoxLinuxAdditions.run
Verifying archive integrity... All good.
Uncompressing VirtualBox 6.1.26 Guest Additions for Linux........
VirtualBox Guest Additions installer
Copying additional installer modules ...
Installing additional modules ...
VirtualBox Guest Additions: Starting.
VirtualBox Guest Additions: Building the VirtualBox Guest Additions kernel 
modules.  This may take a while.
VirtualBox Guest Additions: To build modules for other installed kernels, run
VirtualBox Guest Additions:   /sbin/rcvboxadd quicksetup <version>
VirtualBox Guest Additions: or
VirtualBox Guest Additions:   /sbin/rcvboxadd quicksetup all
VirtualBox Guest Additions: Kernel headers not found for target kernel 
5.4.17-2102.201.3.el8uek.x86_64. Please install them and execute
  /sbin/rcvboxadd setup
modprobe vboxguest failed
The log file /var/log/vboxadd-setup.log may contain further information.
[root@ol8-21c VBox_GAs_6.1.26]# 
```

```
[root@ol8-21c ~]# yum update -y
Last metadata expiration check: 0:02:20 ago on Sat 14 Aug 2021 02:49:12 PM CST.
Dependencies resolved.

[root@ol8-21c VBox_GAs_6.1.26]# uname -r
5.4.17-2102.201.3.el8uek.x86_64
[root@ol8-21c VBox_GAs_6.1.26]# yum install kernel-devel
```

VirtualBox Guest Additions: Kernel headers not found for target kernel 
Solution:
```
yum clean all
yum update -y
yum install kernel -y
yum install kernel-devel -y
yum install kernel-headers -y
yum install gcc -y
yum install make -y
yum install kernel-headers kernel-devel gcc make elfutils-libelf-devel -y
yum install kernel-uek-devel-`uname -r` -y
reboot
```

Ref:

[/sbin/mount.vboxsf: mounting failed with the error: No such device](https://www.cnblogs.com/teacat/p/11589516.html)

[Guest additionals: Kernel headers not found for target kernel](https://superuser.com/questions/1532590/guest-additionals-kernel-headers-not-found-for-target-kernel)

Log:
```
[root@ol8-21c VBox_GAs_6.1.26]# sh VBoxLinuxAdditions.run
Verifying archive integrity... All good.
Uncompressing VirtualBox 6.1.26 Guest Additions for Linux........
VirtualBox Guest Additions installer
Removing installed version 6.1.26 of VirtualBox Guest Additions...
Copying additional installer modules ...
Installing additional modules ...
VirtualBox Guest Additions: Starting.
VirtualBox Guest Additions: Building the VirtualBox Guest Additions kernel 
modules.  This may take a while.
VirtualBox Guest Additions: To build modules for other installed kernels, run
VirtualBox Guest Additions:   /sbin/rcvboxadd quicksetup <version>
VirtualBox Guest Additions: or
VirtualBox Guest Additions:   /sbin/rcvboxadd quicksetup all
VirtualBox Guest Additions: Building the modules for kernel 
5.4.17-2102.204.4.2.el8uek.x86_64.
ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
ValueError: File context for /opt/VBoxGuestAdditions-6.1.26/other/mount.vboxsf already defined
[root@ol8-21c VBox_GAs_6.1.26]# mount -t vboxsf vm_folder /mnt
[root@ol8-21c VBox_GAs_6.1.26]# df -h
Filesystem           Size  Used Avail Use% Mounted on
devtmpfs             1.8G     0  1.8G   0% /dev
tmpfs                1.8G     0  1.8G   0% /dev/shm
tmpfs                1.8G  9.3M  1.8G   1% /run
tmpfs                1.8G     0  1.8G   0% /sys/fs/cgroup
/dev/mapper/ol-root   28G  6.2G   22G  23% /
/dev/sda1           1014M  448M  567M  45% /boot
tmpfs                365M  3.5M  362M   1% /run/user/0
/dev/sr0              59M   59M     0 100% /run/media/root/VBox_GAs_6.1.26
vm_folder            425G   43G  383G  11% /mnt
[root@ol8-21c VBox_GAs_6.1.26]# cd /mnt
[root@ol8-21c mnt]# ls -tlr
total 0
-rwxrwxrwx. 1 root root 0 Aug 14 14:41 1.txt
[root@ol8-21c mnt]# 
```

file: /etc/sysctl.conf
```
fs.file-max = 6815744
kernel.sem = 250 32000 100 128
kernel.shmmni = 4096
kernel.shmall = 1073741824
kernel.shmmax = 4398046511104
kernel.panic_on_oops = 1
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048576
net.ipv4.conf.all.rp_filter = 2
net.ipv4.conf.default.rp_filter = 2
fs.aio-max-nr = 1048576
net.ipv4.ip_local_port_range = 9000 65500
```

```
[root@ol8-21c ~]# /sbin/sysctl -p
fs.file-max = 6815744
kernel.sem = 250 32000 100 128
kernel.shmmni = 4096
kernel.shmall = 1073741824
kernel.shmmax = 4398046511104
kernel.panic_on_oops = 1
net.core.rmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_default = 262144
net.core.wmem_max = 1048576
net.ipv4.conf.all.rp_filter = 2
net.ipv4.conf.default.rp_filter = 2
fs.aio-max-nr = 1048576
net.ipv4.ip_local_port_range = 9000 65500
[root@ol8-21c ~]# 
```

for 21c conf
```
cp /etc/security/limits.d/oracle-database-preinstall-19c.conf /etc/security/limits.d/oracle-database-preinstall-21c.conf
```

```
dnf install -y bc    
dnf install -y binutils
#dnf install -y compat-libcap1
dnf install -y compat-libstdc++-33
#dnf install -y dtrace-modules
#dnf install -y dtrace-modules-headers
#dnf install -y dtrace-modules-provider-headers
#dnf install -y dtrace-utils
dnf install -y elfutils-libelf
dnf install -y elfutils-libelf-devel
dnf install -y fontconfig-devel
dnf install -y glibc
dnf install -y glibc-devel
dnf install -y ksh
dnf install -y libaio
dnf install -y libaio-devel
#dnf install -y libdtrace-ctf-devel
dnf install -y libXrender
dnf install -y libXrender-devel
dnf install -y libX11
dnf install -y libXau
dnf install -y libXi
dnf install -y libXtst
dnf install -y libgcc
dnf install -y librdmacm-devel
dnf install -y libstdc++
dnf install -y libstdc++-devel
dnf install -y libxcb
dnf install -y make
dnf install -y net-tools # Clusterware
dnf install -y nfs-utils # ACFS
dnf install -y python # ACFS
dnf install -y python-configshell # ACFS
dnf install -y python-rtslib # ACFS
dnf install -y python-six # ACFS
dnf install -y targetcli # ACFS
dnf install -y smartmontools
dnf install -y sysstat

# Added by me.
dnf install -y unixODBC

# New for OL8
dnf install -y libnsl
dnf install -y libnsl.i686
dnf install -y libnsl2
dnf install -y libnsl2.i686
```

Oracle password:
```
passwd oracle
=>oracle
```

Oracle directories
```
mkdir -p /u01/app/oracle/product/21.0.0/dbhome_1
mkdir -p /u02/oradata
chown -R oracle:oinstall /u01 /u02
chmod -R 775 /u01 /u02
```

Oracle profile and scripts
```
mkdir /home/oracle/scripts

cat > /home/oracle/scripts/setEnv.sh <<EOF
# Oracle Settings
export TMP=/tmp
export TMPDIR=\$TMP

export ORACLE_HOSTNAME=ol8-21c
export ORACLE_UNQNAME=cdb1
export ORACLE_BASE=/u01/app/oracle
export ORACLE_HOME=\$ORACLE_BASE/product/21.0.0/dbhome_1
export ORA_INVENTORY=/u01/app/oraInventory
export ORACLE_SID=cdb1
export PDB_NAME=pdb1
export DATA_DIR=/u02/oradata

export PATH=/usr/sbin:/usr/local/bin:\$PATH
export PATH=\$ORACLE_HOME/bin:\$PATH

export LD_LIBRARY_PATH=\$ORACLE_HOME/lib:/lib:/usr/lib
export CLASSPATH=\$ORACLE_HOME/jlib:\$ORACLE_HOME/rdbms/jlib
EOF

echo ". /home/oracle/scripts/setEnv.sh" >> /home/oracle/.bash_profile


cat > /home/oracle/scripts/start_all.sh <<EOF
#!/bin/bash
. /home/oracle/scripts/setEnv.sh

export ORAENV_ASK=NO
. oraenv
export ORAENV_ASK=YES

dbstart \$ORACLE_HOME
EOF


cat > /home/oracle/scripts/stop_all.sh <<EOF
#!/bin/bash
. /home/oracle/scripts/setEnv.sh

export ORAENV_ASK=NO
. oraenv
export ORAENV_ASK=YES

dbshut \$ORACLE_HOME
EOF

chown -R oracle:oinstall /home/oracle/scripts
chmod u+x /home/oracle/scripts/*.sh
```

Oracle sudo pri
```
[root@ol8-21c ~]# visudo
[root@ol8-21c ~]# 

oracle  ALL=(ALL)       ALL

[root@ol8-21c ~]# su - oracle
[oracle@ol8-21c ~]$ sudo usermod -aG vboxsf $(whoami)
[sudo] password for oracle: 
[oracle@ol8-21c ~]$ 
```

### Oracle Database 21c Install

Oracle dbhome 21c install file unzip and install

```
# Unzip software.
cd $ORACLE_HOME
pwd
unzip -oq /mnt/LINUX.X64_213000_db_home.zip

# Fake Oracle Linux 7.
export CV_ASSUME_DISTID=OEL8.4

```

log
```
[root@ol8-21c ~]# su - oracle
[oracle@ol8-21c ~]$ cd $ORACLE_HOME
[oracle@ol8-21c dbhome_1]$ pwd
/u01/app/oracle/product/21.0.0/dbhome_1
[oracle@ol8-21c dbhome_1]$ unzip -oq /mnt/LINUX.X64_213000_db_home.zip
[oracle@ol8-21c dbhome_1]$ du -sm /u01/app/oracle/product/21.0.0/dbhome_1
6772    /u01/app/oracle/product/21.0.0/dbhome_1
[oracle@ol8-21c dbhome_1]$ 
```

Install 21c database product.
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

install log file
```
/u01/app/oracle/product/21.0.0/dbhome_1/install/response/db_2021-08-14_04-06-18PM.rsp
/tmp/InstallActions2021-08-14_04-06-18PM/installActions2021-08-14_04-06-18PM.log
```

```
[oracle@ol8-21c dbhome_1]$ ./runInstaller -ignorePrereq -waitforcompletion -silent                        \
>     -responseFile ${ORACLE_HOME}/install/response/db_install.rsp               \
>     oracle.install.option=INSTALL_DB_SWONLY                                    \
>     ORACLE_HOSTNAME=${ORACLE_HOSTNAME}                                         \
>     UNIX_GROUP_NAME=oinstall                                                   \
>     INVENTORY_LOCATION=${ORA_INVENTORY}                                        \
>     SELECTED_LANGUAGES=en,en_GB                                                \
>     ORACLE_HOME=${ORACLE_HOME}                                                 \
>     ORACLE_BASE=${ORACLE_BASE}                                                 \
>     oracle.install.db.InstallEdition=EE                                        \
>     oracle.install.db.OSDBA_GROUP=dba                                          \
>     oracle.install.db.OSBACKUPDBA_GROUP=dba                                    \
>     oracle.install.db.OSDGDBA_GROUP=dba                                        \
>     oracle.install.db.OSKMDBA_GROUP=dba                                        \
>     oracle.install.db.OSRACDBA_GROUP=dba                                       \
>     SECURITY_UPDATES_VIA_MYORACLESUPPORT=false                                 \
>     DECLINE_SECURITY_UPDATES=true
Launching Oracle Database Setup Wizard...

[WARNING] [INS-13014] Target environment does not meet some optional requirements.
   CAUSE: Some of the optional prerequisites are not met. See logs for details. installActions2021-08-14_04-06-18PM.log
   ACTION: Identify the list of failed prerequisite checks from the log: installActions2021-08-14_04-06-18PM.log. Then either from the log file or from installation manual find the appropriate configuration to meet the prerequisites and fix it manually.
The response file for this session can be found at:
 /u01/app/oracle/product/21.0.0/dbhome_1/install/response/db_2021-08-14_04-06-18PM.rsp

You can find the log of this install session at:
 /tmp/InstallActions2021-08-14_04-06-18PM/installActions2021-08-14_04-06-18PM.log

As a root user, execute the following script(s):
        1. /u01/app/oraInventory/orainstRoot.sh
        2. /u01/app/oracle/product/21.0.0/dbhome_1/root.sh

Execute /u01/app/oraInventory/orainstRoot.sh on the following nodes: 
[ol8-21c]
Execute /u01/app/oracle/product/21.0.0/dbhome_1/root.sh on the following nodes: 
[ol8-21c]


Successfully Setup Software with warning(s).
Moved the install session logs to:
 /u01/app/oraInventory/logs/InstallActions2021-08-14_04-06-18PM
[oracle@ol8-21c dbhome_1]$ 
```

root user execute script
```
As a root user, execute the following script(s):
1. /u01/app/oraInventory/orainstRoot.sh
2. /u01/app/oracle/product/21.0.0/dbhome_1/root.sh
```

log
```
[root@ol8-21c ~]# /u01/app/oraInventory/orainstRoot.sh
Changing permissions of /u01/app/oraInventory.
Adding read,write permissions for group.
Removing read,write,execute permissions for world.

Changing groupname of /u01/app/oraInventory to oinstall.
The execution of the script is complete.
[root@ol8-21c ~]# /u01/app/oracle/product/21.0.0/dbhome_1/root.sh
Check /u01/app/oracle/product/21.0.0/dbhome_1/install/root_ol8-21c_2021-08-14_16-13-00-919126811.log for the output of root script
[root@ol8-21c ~]# 
```

Test sqlplus
```
[oracle@ol8-21c ~]$ sqlplus / as sysdba

SQL*Plus: Release 21.0.0.0.0 - Production on Sat Aug 14 16:13:53 2021
Version 21.3.0.0.0

Copyright (c) 1982, 2021, Oracle.  All rights reserved.

Connected to an idle instance.

SQL> 
```

### Oracle Database 21c Database Creation

Start the listener.
```
lsnrctl start


[oracle@ol8-21c ~]$ lsnrctl start

LSNRCTL for Linux: Version 21.0.0.0.0 - Production on 14-AUG-2021 16:14:25

Copyright (c) 1991, 2021, Oracle.  All rights reserved.

Starting /u01/app/oracle/product/21.0.0/dbhome_1/bin/tnslsnr: please wait...

TNSLSNR for Linux: Version 21.0.0.0.0 - Production
Log messages written to /u01/app/oracle/diag/tnslsnr/ol8-21c/listener/alert/log.xml
Listening on: (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=ol8-21c)(PORT=1521)))

Connecting to (ADDRESS=(PROTOCOL=tcp)(HOST=)(PORT=1521))
STATUS of the LISTENER
------------------------
Alias                     LISTENER
Version                   TNSLSNR for Linux: Version 21.0.0.0.0 - Production
Start Date                14-AUG-2021 16:14:25
Uptime                    0 days 0 hr. 0 min. 0 sec
Trace Level               off
Security                  ON: Local OS Authentication
SNMP                      OFF
Listener Log File         /u01/app/oracle/diag/tnslsnr/ol8-21c/listener/alert/log.xml
Listening Endpoints Summary...
  (DESCRIPTION=(ADDRESS=(PROTOCOL=tcp)(HOST=ol8-21c)(PORT=1521)))
The listener supports no services
The command completed successfully
[oracle@ol8-21c ~]$ 
```

Silent mode create

```
dbca -silent -createDatabase                                                   \
     -templateName General_Purpose.dbc                                         \
     -gdbname ${ORACLE_SID} -sid  ${ORACLE_SID} -responseFile NO_VALUE         \
     -characterSet AL32UTF8                                                    \
     -sysPassword SysPassword1                                                 \
     -systemPassword SysPassword1                                              \
     -createAsContainerDatabase true                                           \
     -numberOfPDBs 1                                                           \
     -pdbName ${PDB_NAME}                                                      \
     -pdbAdminPassword PdbPassword1                                            \
     -databaseType MULTIPURPOSE                                                \
     -memoryMgmtType auto_sga                                                  \
     -totalMemory 2000                                                         \
     -storageType FS                                                           \
     -datafileDestination "${DATA_DIR}"                                        \
     -redoLogFileSize 50                                                       \
     -emConfiguration NONE                                                     \
     -ignorePreReqs
```
create database log:
```
[oracle@ol8-21c ~]$ dbca -silent -createDatabase                                                   \
>      -templateName General_Purpose.dbc                                         \
>      -gdbname ${ORACLE_SID} -sid  ${ORACLE_SID} -responseFile NO_VALUE         \
>      -characterSet AL32UTF8                                                    \
>      -sysPassword SysPassword1                                                 \
>      -systemPassword SysPassword1                                              \
>      -createAsContainerDatabase true                                           \
>      -numberOfPDBs 1                                                           \
>      -pdbName ${PDB_NAME}                                                      \
>      -pdbAdminPassword PdbPassword1                                            \
>      -databaseType MULTIPURPOSE                                                \
>      -memoryMgmtType auto_sga                                                  \
>      -totalMemory 2000                                                         \
>      -storageType FS                                                           \
>      -datafileDestination "${DATA_DIR}"                                        \
>      -redoLogFileSize 50                                                       \
>      -emConfiguration NONE                                                     \
>      -ignorePreReqs
Prepare for db operation
8% complete
Copying database files
31% complete
Creating and starting Oracle instance
32% complete
36% complete
40% complete
43% complete
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
 /u01/app/oracle/cfgtoollogs/dbca/cdb1.
Database Information:
Global Database Name:cdb1
System Identifier(SID):cdb1
Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/cdb1/cdb1.log" for further details.
[oracle@ol8-21c ~]$  
```

![database21c]({{ "/files/Oracle/21c/21c.png"}})


### Auto start in Linux 8

Ref 
[Linux 7 enable Autostarting of Oracle Database 19c Tips](http://www.bigdatalyn.com/2019/08/20/Oracle_Enable_AutoStart_Tips/)

Step tips:

```
[root@ol8-21c ~]# vi /etc/init.d/dbora
[root@ol8-21c ~]# cat /etc/init.d/dbora

[root@ol8-21c ~]# chmod 750 /etc/init.d/dbora
[root@ol8-21c ~]# systemctl enable dbora
dbora.service is not a native service, redirecting to systemd-sysv-install.
Executing: /usr/lib/systemd/systemd-sysv-install enable dbora
[root@ol8-21c ~]# /sbin/chkconfig dbora on
[root@ol8-21c ~]# cat /etc/init.d/dbora
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
# ORACLE_HOME=/u01/app/oracle/product/19.0.0/dbhome_1
ORACLE_HOME=/u01/app/oracle/product/21.0.0/dbhome_1

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
[root@ol8-21c ~]# 
[root@ol8-21c ~]# vi /etc/oratab
[root@ol8-21c ~]# cat /etc/oratab

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
# cdb1:/u01/app/oracle/product/21.0.0/dbhome_1:N
cdb1:/u01/app/oracle/product/21.0.0/dbhome_1:Y
[root@ol8-21c ~]# 
```

Have a good work&life! 2021/08 via LinHong
