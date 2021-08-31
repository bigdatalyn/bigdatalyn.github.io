---
layout: post
title: "Oracle nslookup Linux 8 Install Tips"
category: Oracle
tags: Oracle linux Tips
---

* content
{:toc}

Oracle nslookup Linux 8 Install Tips









### nslookup in Linux 8

Use dnf install bind-utils to Fix it.

```
[root@localhost ~]# yum install dnsutils
Last metadata expiration check: 1:03:06 ago on Fri 27 Aug 2021 09:42:18 AM UTC.
No match for argument: dnsutils
Error: Unable to find a match: dnsutils
[root@localhost ~]# dnf install bind-utils -y
Last metadata expiration check: 1:03:58 ago on Fri 27 Aug 2021 09:42:18 AM UTC.
Dependencies resolved.
========================================================================================================================================
 Package                          Architecture             Version                                Repository                       Size
========================================================================================================================================
Installing:
 bind-utils                       x86_64                   32:9.11.26-4.el8_4                     ol8_appstream                   451 k
Installing dependencies:
 bind-libs                        x86_64                   32:9.11.26-4.el8_4                     ol8_appstream                   174 k
 bind-libs-lite                   x86_64                   32:9.11.26-4.el8_4                     ol8_appstream                   1.2 M
 bind-license                     noarch                   32:9.11.26-4.el8_4                     ol8_appstream                   102 k
 fstrm                            x86_64                   0.6.0-3.el8.1                          ol8_appstream                    29 k
 protobuf-c                       x86_64                   1.3.0-6.el8                            ol8_appstream                    37 k
 python3-bind                     noarch                   32:9.11.26-4.el8_4                     ol8_appstream                   149 k

Transaction Summary
========================================================================================================================================
Install  7 Packages

Total download size: 2.1 M
Installed size: 4.9 M
Downloading Packages:
(1/7): bind-license-9.11.26-4.el8_4.noarch.rpm                                                           39 kB/s | 102 kB     00:02    
(2/7): bind-libs-9.11.26-4.el8_4.x86_64.rpm                                                              61 kB/s | 174 kB     00:02    
(3/7): fstrm-0.6.0-3.el8.1.x86_64.rpm                                                                   292 kB/s |  29 kB     00:00    
(4/7): protobuf-c-1.3.0-6.el8.x86_64.rpm                                                                316 kB/s |  37 kB     00:00    
(5/7): bind-utils-9.11.26-4.el8_4.x86_64.rpm                                                            950 kB/s | 451 kB     00:00    
(6/7): python3-bind-9.11.26-4.el8_4.noarch.rpm                                                          677 kB/s | 149 kB     00:00    
(7/7): bind-libs-lite-9.11.26-4.el8_4.x86_64.rpm                                                        363 kB/s | 1.2 MB     00:03    
----------------------------------------------------------------------------------------------------------------------------------------
Total                                                                                                   644 kB/s | 2.1 MB     00:03     
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                                                1/1 
  Installing       : protobuf-c-1.3.0-6.el8.x86_64                                                                                  1/7 
  Installing       : fstrm-0.6.0-3.el8.1.x86_64                                                                                     2/7 
  Installing       : bind-license-32:9.11.26-4.el8_4.noarch                                                                         3/7 
  Installing       : bind-libs-lite-32:9.11.26-4.el8_4.x86_64                                                                       4/7 
  Installing       : bind-libs-32:9.11.26-4.el8_4.x86_64                                                                            5/7 
  Installing       : python3-bind-32:9.11.26-4.el8_4.noarch                                                                         6/7 
  Installing       : bind-utils-32:9.11.26-4.el8_4.x86_64                                                                           7/7 
  Running scriptlet: bind-utils-32:9.11.26-4.el8_4.x86_64                                                                           7/7 
/sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored

  Verifying        : bind-libs-32:9.11.26-4.el8_4.x86_64                                                                            1/7 
  Verifying        : bind-libs-lite-32:9.11.26-4.el8_4.x86_64                                                                       2/7 
  Verifying        : bind-license-32:9.11.26-4.el8_4.noarch                                                                         3/7 
  Verifying        : bind-utils-32:9.11.26-4.el8_4.x86_64                                                                           4/7 
  Verifying        : fstrm-0.6.0-3.el8.1.x86_64                                                                                     5/7 
  Verifying        : protobuf-c-1.3.0-6.el8.x86_64                                                                                  6/7 
  Verifying        : python3-bind-32:9.11.26-4.el8_4.noarch                                                                         7/7 

Installed:
  bind-libs-32:9.11.26-4.el8_4.x86_64         bind-libs-lite-32:9.11.26-4.el8_4.x86_64      bind-license-32:9.11.26-4.el8_4.noarch     
  bind-utils-32:9.11.26-4.el8_4.x86_64        fstrm-0.6.0-3.el8.1.x86_64                    protobuf-c-1.3.0-6.el8.x86_64              
  python3-bind-32:9.11.26-4.el8_4.noarch     

Complete!
[root@localhost ~]# 
```

Have a good work&life! 2021/08 via LinHong
