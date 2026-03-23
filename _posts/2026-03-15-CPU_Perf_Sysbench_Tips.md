---
layout: post
title: "CPU Perf Sysbench Test Tips"
category: Linux
tags: Linux Performance CPU Tips
---

* content
{:toc}

CPU Perf Sysbench Test Tips

### CPU Perf Sysbench Test Tips

Install and Test in OCI env.

```
[root@onpdb ~]# cat /etc/redhat-release 
Red Hat Enterprise Linux release 8.10 (Ootpa)
[root@onpdb ~]# sudo dnf install -y oracle-epel-release-el8
[root@onpdb ~]# sudo dnf makecache
[root@onpdb ~]# sudo dnf install -y sysbench
[root@onpdb ~]# sysbench cpu run --cpu-max-prime=20000 --time=5
sysbench 1.0.20 (using system LuaJIT 2.1.0-beta3)

Running the test with following options:
Number of threads: 1
Initializing random number generator from current time


Prime numbers limit: 20000

Initializing worker threads...

Threads started!

CPU speed:
    events per second:  1634.89

General statistics:
    total time:                          5.0004s
    total number of events:              8176

Latency (ms):
         min:                                    0.60
         avg:                                    0.61
         max:                                    0.68
         95th percentile:                        0.62
         sum:                                 4997.73

Threads fairness:
    events (avg/stddev):           8176.0000/0.00
    execution time (avg/stddev):   4.9977/0.00

[root@onpdb ~]# 
```

### Good Day

Have a good work&life! 2026/03 via LinHong
