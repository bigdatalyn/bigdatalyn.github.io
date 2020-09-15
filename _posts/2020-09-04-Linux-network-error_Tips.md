---
layout: post
title: "Linux network issue Tips"
category: Oracle
tags: Linux Network Tips 
---

* content
{:toc}

Linux network issue Tips


Problems:

Restart Linux 6 in vmware and met "Device eth0 does not seem to be present" for network service.

(All were good for using in another PC, just move to new PC and can NOT use the vm's network service.)
```shell
service network restart
Shutting down loopback insterface:                          [  OK  ]
Bringing up loopback insterface:                            [  OK  ]
Bringing up interface eth0:  Device eth0 does not seem to be present,delaying initialization.    [FAILED]
```



Solution:(All are done by root user.)
`Just for your reference and do NOT execute these in Prod env!`


#### 1. Delete 70-persistent-net.rules file

Delete 70-persistent-net.rule which included mac's addr etc.

```scripts
rm -f /etc/udev/rules.d/70-persistent-net.rule
```

#### 2. Edit ifcfg-eth0 file

Change network name in ifcfg-eth0

```scripts
vi /etc/sysconfig/network-scripts/ifcfg-eth0

rename eth0 to eth1
```

#### 3. Restart network service

Restart service and ping test etc.

```scripts
service network restart

ifconfig

ping ....
```



Have a good work&life! 2020/09 via LinHong


