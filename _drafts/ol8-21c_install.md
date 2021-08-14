
virtualbox 6.1
https://www.virtualbox.org/wiki/Downloads

Oracle Linux 8.4
https://www.oracle.com/linux/technologies/oracle-linux-downloads.html

Oracle database 21c
https://www.oracle.com/database/technologies/oracle-database-software-downloads.html

Introducing Oracle Database 21c
https://blogs.oracle.com/database/post/introducing-oracle-database-21c

hostonly -> network
NAT -> network
hostnamectl set-hostname ol8-21c
timedatectl set-timezone Asia/Shanghai

selinux:
[root@ol8-21c ~]# grep SELINUX /etc/selinux/config 
# SELINUX= can take one of these three values:
# SELINUX=enforcing
SELINUX=permissive
# SELINUXTYPE= can take one of these three values:
SELINUXTYPE=targeted
[root@ol8-21c ~]# 

firewall
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


ssh service:
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

/etc/hosts and hostname
[root@ol8-21c ~]# cat /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
192.168.56.101 ol8-21c
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
[root@ol8-21c ~]# cat /etc/hostname
ol8-21c
[root@ol8-21c ~]#


Oracle Installation Prerequisites:

oracle-database-preinstall-21c is still NOT provided at 2021/08/14.

The following rpm are provided.
https://yum.oracle.com/repo/OracleLinux/OL8/appstream/x86_64/
	oracle-database-preinstall-19c-1.0-1.el8.x86_64.rpm
    oracle-database-preinstall-19c-1.0-2.el8.x86_64.rpm

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


Update kernel and mount share folder


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


[root@ol8-21c ~]# yum update -y
Last metadata expiration check: 0:02:20 ago on Sat 14 Aug 2021 02:49:12 PM CST.
Dependencies resolved.

[root@ol8-21c VBox_GAs_6.1.26]# uname -r
5.4.17-2102.201.3.el8uek.x86_64
[root@ol8-21c VBox_GAs_6.1.26]# yum install kernel-devel



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


ref:
[/sbin/mount.vboxsf: mounting failed with the error: No such device](https://www.cnblogs.com/teacat/p/11589516.html)

[Guest additionals: Kernel headers not found for target kernel](https://superuser.com/questions/1532590/guest-additionals-kernel-headers-not-found-for-target-kernel)



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


file: /etc/sysctl.conf

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


cp /etc/security/limits.d/oracle-database-preinstall-19c.conf /etc/security/limits.d/oracle-database-preinstall-21c.conf


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

passwd oracle
=>oracle

mkdir -p /u01/app/oracle/product/21.0.0/dbhome_1
mkdir -p /u02/oradata
chown -R oracle:oinstall /u01 /u02
chmod -R 775 /u01 /u02

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

[root@ol8-21c ~]# visudo
[root@ol8-21c ~]# 

oracle  ALL=(ALL)       ALL

[root@ol8-21c ~]# su - oracle
[oracle@ol8-21c ~]$ sudo usermod -aG vboxsf $(whoami)
[sudo] password for oracle: 
[oracle@ol8-21c ~]$ 



