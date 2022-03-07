
[CentOS]CentOS安装Percona Server
https://segmentfault.com/a/1190000021951782

[root@centos7 local]# wget https://downloads.percona.com/downloads/Percona-Server-LATEST/Percona-Server-8.0.27-18/binary/redhat/7/x86_64/Percona-Server-8.0.27-18-r24801e21b45-el7-x86_64-bundle.tar
[root@centos7 local]# mkdir Percona-Server
[root@centos7 local]# tar -xvf Percona-Server-8.0.27-18-r24801e21b45-el7-x86_64-bundle.tar -C Percona-Server
[root@centos7 local]# cd Percona-Server
[root@centos7 Percona-Server]# ll
total 1262380
-rw-rw-r-- 1 root root   4770296 Mar  1 22:35 percona-mysql-router-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root  14579096 Mar  1 22:35 percona-server-client-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root 721960200 Mar  1 22:35 percona-server-debuginfo-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root   1915884 Mar  1 22:35 percona-server-devel-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root  13725168 Mar  1 22:35 percona-server-rocksdb-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root  68627940 Mar  1 22:35 percona-server-server-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root   1552364 Mar  1 22:35 percona-server-shared-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root   1296460 Mar  1 22:35 percona-server-shared-compat-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root 462176712 Mar  1 22:35 percona-server-test-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root   2059208 Mar  1 22:35 percona-server-tokudb-8.0.27-18.1.el7.x86_64.rpm
[root@centos7 Percona-Server]#

[root@centos7 Percona-Server]# rpm -qa | grep MySQL-client-5.6.51-1.el7.x86_64
MySQL-client-5.6.51-1.el7.x86_64
[root@centos7 Percona-Server]#
[root@centos7 Percona-Server]# yum remove MySQL-client-5.6.51-1.el7.x86_64 -y

[root@centos7 Percona-Server]# wget https://cbs.centos.org/kojifiles/packages/jemalloc/3.6.0/8.el7.centos/x86_64/jemalloc-3.6.0-8.el7.centos.x86_64.rpm --no-check-certificate

[root@centos7 Percona-Server]# ls -tlr
total 1262608
-rw-r--r-- 1 root root     23556 Sep 14  2014 jemalloc-devel-3.6.0-8.el7.centos.x86_64.rpm
-rw-r--r-- 1 root root    112360 Sep 14  2014 jemalloc-3.6.0-8.el7.centos.x86_64.rpm
-rw-r--r-- 1 root root     90540 Jan 23  2020 jemalloc-devel-5.2.1-2.el8.x86_64.rpm
-rw-rw-r-- 1 root root   4770296 Mar  1 22:35 percona-mysql-router-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root  14579096 Mar  1 22:35 percona-server-client-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root 721960200 Mar  1 22:35 percona-server-debuginfo-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root   1915884 Mar  1 22:35 percona-server-devel-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root  13725168 Mar  1 22:35 percona-server-rocksdb-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root  68627940 Mar  1 22:35 percona-server-server-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root   1552364 Mar  1 22:35 percona-server-shared-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root   1296460 Mar  1 22:35 percona-server-shared-compat-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root 462176712 Mar  1 22:35 percona-server-test-8.0.27-18.1.el7.x86_64.rpm
-rw-rw-r-- 1 root root   2059208 Mar  1 22:35 percona-server-tokudb-8.0.27-18.1.el7.x86_64.rpm
[root@centos7 Percona-Server]# rpm -ivh jemalloc-3.6.0-8.el7.centos.x86_64.rpm
Preparing...                          ################################# [100%]
Updating / installing...
   1:jemalloc-3.6.0-8.el7.centos      ################################# [100%]
[root@centos7 Percona-Server]#

[root@centos7 Percona-Server]# yum localinstall -y percona-*