---
layout: post
title: "Oracle crsctl commands Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle crsctl commands Tips

List hint in 19c from V$SQL_HINT.




### Commands 


1.start/stop cluster: (by root user)

```
$GRID_HOME/bin/crsctl stop crs
 
$GRID_HOME/bin/crsctl start crs
```

2.disable/enable autostart cluster

```
$GRID_HOME/bin/crsctl config crs 

$GRID_HOME/bin/crsctl disable crs
 
$GRID_HOME/bin/crsctl enable crs

cat /etc/oracle/scls_scr/racnode1/root/ohasdstr

使用root用户crsctl disable/enable crs时，改变的是这个文件的值：

--11.2.0.4
[root@db01 ~]# /opt/app/11.2.0/grid/bin/crsctl disable crs
CRS-4621: Oracle High Availability Services autostart is disabled.
[root@db01 ~]# more /etc/oracle/scls_scr/db01/root/ohasdstr 
disable
[root@db01 ~]# /opt/app/11.2.0/grid/bin/crsctl enable crs
CRS-4622: Oracle High Availability Services autostart is enabled.
[root@db01 ~]# more /etc/oracle/scls_scr/db01/root/ohasdstr 
enable

--12.1.0.2
[root@oemapp1 ~]# /app/12.1.0.2/grid/bin/crsctl disable crs
CRS-4621: Oracle High Availability Services autostart is disabled.
[root@oemapp1 ~]# more /etc/oracle/scls_scr/oemapp1/root/ohasdstr 
disable
[root@oemapp1 ~]# /app/12.1.0.2/grid/bin/crsctl enable crs
CRS-4622: Oracle High Availability Services autostart is enabled.
[root@oemapp1 ~]# more /etc/oracle/scls_scr/oemapp1/root/ohasdstr 
enable


```

3.check cluster name

```
$GRID_HOME/bin/cemutlo -n
 
or 
 
$GRID_HOME/bin/olsnodes -c
```

4.check cluster version

```
$GRID_HOME/bin/crsctl query crs softwareversion hostname 
```

5.chech status of components

```
$GRID_HOME/bin/crsctl stat res -t
 
$GRID_HOME/bin/crsctl check crs
 
$GRID_HOME/bin/crsctl check cssd
 
$GRID_HOME/bin/crsctl check crsd
 
$GRID_HOME/bin/crsctl check evmd
```

6.check voting disk

```
$GRID_HOME/bin/crsctl query css votedisk
```

7.check OCR
```
$GRID_HOME/bin/ocrcheck
```
8.check priv network of cluster
```
$GRID_HOME/bin/oifcfg getif

app0 192.168.39.128 global public
predbib0 192.168.3.192 global cluster_interconnect
predbib1 192.168.4.0 global cluster_interconnect

select NAME,IP_ADDRESS from v$cluster_interconnects;

```
 
9.check local node crs

```
$GRID_HOME/bin/crsctl check crs
 
CRS-4638: Oracle High Availability Services is online
CRS-4537: Cluster Ready Services is online
CRS-4529: Cluster Synchronization Services is online
CRS-4533: Event Manager is online
```

10.check all node crs

```
$GRID_HOME/bin/crsctl stat res -t
$GRID_HOME/bin/crsctl stat res -t -init
```

11.check cluster active version

```
$GRID_HOME/bin/crsctl query crs activeversion
Oracle Clusterware active version on the cluster is [12.1.0.2.0]
```

12.stop/start HAS
```
$GRID_HOME/bin/crsctl stop has
 
$GRID_HOME/bin/crsctl start has
```
13.check remote node CRS
```
$GRID_HOME/bin/crsctl check cluster
```
14.check voting disk: disktimeout

```
$GRID_HOME/bin/crsctl get css disktimeout
CRS-4678: Successful get disktimeout 200 for Cluster Synchronization Services.
```

15.check Misscount
```
crsctl get css misscount
CRS-4678: Successful get misscount 30 for Cluster Synchronization Services.
```
16.move voting disk to another disk group
```
crsctl replace votedisk +OCRVD
Successful addition of voting disk 2e4ded6cee504fc8bf078b080fb7be6f.
Successful addition of voting disk 8e87826024e24fffbf5add65c011fc66.
Successful addition of voting disk e1ba56dedff84fa8bf5605e0302fc81e.
Successful deletion of voting disk 2b7ce864c44d4fecbf60885a188290af.
Successfully replaced voting disk group with +OCRVD.
CRS-4266: Voting file(s) successfully replaced
```

17.add new votedisk
```
crsctl add css votedisk 
```

18.delete votedisk
```
crsctl delete css votedisk 
```
19.check ocr backup
```
ocrconfig -showbackup
```

20.check cluster standard or flex ASM
```
crsctl get cluster mode status
 
Cluster is running in "standard" mode
```

21 .check crs config
```
crsctl config crs 
```

22.has commands
```
crsctl check has
crsctl config has
crsctl disable has
crsctl enable has
crsctl query has releaseversion
crsctl query has softwareversion
crsctl start has
crsctl stop has
```


Have a good work&life! 2021/08 via LinHong
