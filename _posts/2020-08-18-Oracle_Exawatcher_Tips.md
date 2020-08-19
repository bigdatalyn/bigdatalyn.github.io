---
layout: post
title: "Oracle Exawatcher Tips"
category: Oracle
tags: Oracle Exadata Tips 
---

* content
{:toc}

Oracle Exawatcher Tips


![exawatcher_iosummary1]({{ "/files/Oracle/Exadata/exawatcher_iosummary1.png"}})







### ExaWatcher

Exadata monitor/diag tools



ExaWatcher is a utility that collects performance data on the storage servers and database servers of an Exadata system. The data collected includes operating system statistics, such as iostat, cell statistics (cellsrvstat), and network statistics.

ExaWatcher collects and presents performance data on the storage servers and database servers of Oracle Exadata Database Machine for a specified period of time. 
```
Requirements for Using ExaWatcher Charts
To view the HTML pages, the generated archive file must be moved to a machine with a local browser that has access to the internet.

IO Charts
IO charts show IO performance for an entire server or for individual disks in the storage server.

CPU Charts
The CPU charts show CPU utilization for the server. These statistics are from iostat (avg-cpu: %user, %system, %iowait).

CPU Detail
The CPU detail charts show detailed information for CPU usage, including the average CPU utilization per CPU ID. These statistics are from mpstat.

Cell Server Charts
Cell server statistics are useful for tracking features that are specific to Exadata storage servers. This page displays statistics related to Smart Flash Cache and Smart IOs. 
```

The directory of exadata(db/cell):

```
/opt/oracle.ExaWatcher/
```

Get Exawatcher sample use GetExaWatcherResults.sh(root)

```
./GetExaWatcherResults.sh --from 08/17/2020_09:00:00 --to 08/17/2020_10:00:00; 
```
The output is the following directory.
```
/opt/oracle.ExaWatcher/archive/ExtractedResults
```

#### Start/Stop


- Exadata System Softwre 19.x

```shell
systemctl status exawatcher 
systemctl start exawatcher 
systemctl stop exawatcher 

Cron job:
/etc/cron.daily/exawatcher

```

- Exadata System Softwre 11.x, 12.x , 18.x

```
Start:
/opt/oracle.cellos/vldrun -script oswatcher
Stop:
./StopExaWatcher.sh
Check:
ps -ef | grep -i ExaWatcher

```

#### ExaWatcher log save time

DB server: 40 days/6GB

Cell server: 4 days/600MB

Use the following scripts to clearup older logs.

```shell
/opt/oracle.ExaWatcher/ExaWatcherCleanup.sh


Configure files:
/opt/oracle.ExaWatcher/ExaWatcher.conf
<SpaceLimit> [sizeInMB]


```


### Reference


Oracle® Exadata Database Machine System Overview Release 20.1.0 F29255-01 June 2020
[15.1.15 New Charts in ExaWatcher](https://docs.oracle.com/en/engineered-systems/exadata-database-machine/dbmso/new-features-exadata-system-software-release-12.html#GUID-ACC952D7-6C6B-43EC-9E6C-85E36405E2F2)











Have a good work&life! 2020/08 via LinHong


