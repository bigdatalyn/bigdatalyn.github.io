---
layout: post
title: "Exadata CoD Tips"
category: Exadata
tags: Exadata Tips
---

* content
{:toc}

Capacity-On-Demand
You can reduce the number of active cores on your Exadata database servers to lower the initial software licensing cost, but this does not change the hardware cost.






### Exadata CoD

Capacity-on-demand (CoD) refers to an Exadata database server that is installed with a subset of its cores disabled so that the database software license cost can be reduced. The reduction is implemented during software installation using Oracle Exadata Deployment Assistant (OEDA). The number of active cores can be increased at a later time, when more capacity is needed. Capacity-on-demand does not apply to Oracle Exadata storage server cores.

Capacity-on-demand may only be used to decrease the number of active cores during initial installation. After initial installation, the active core count may be increased, but not decreased. The only exception is when you are adding database servers to an Exadata configuration, and you are redistributing the active cores in order to maintain a balanced cluster configuration. In that case the total number of active cores across all database servers cannot decrease and the end state must comply with the capacity-on-demand restrictions.

For example, if you have an X8M-2 system with 96 active cores on two database servers and you add a third database server with only 24 active cores (for a new total of 120 cores), then you can distribute the 120 active cores across all three database servers (40 active cores on each database server). This requires reducing the active cores from 48 to 40 on each of the first two database servers, and installing the new database server with 40 active cores. The same number of active cores is recommended for all database servers in a cluster.


![ExadataCoD]({{ "/files/Oracle/Exadata/CoD.png"}})


Note the following restrictions regarding capacity-on-demand:

For X5-2, X6-2, X7-2, X8-2, X8M-2, and X9M-2 systems, the minimum number of cores that must be enabled is 14 per database server. Note that for Eighth Rack configurations the minimum is 8 cores per database server.
For X4-2 systems, the minimum number of cores that must be enabled is 12 per database server. The X4-2 Eighth Rack configuration cannot use capacity-on-demand.



### Referece

参考:


[Licensing Information User's Guide / 2 Restricted Licensing](https://docs.oracle.com/en/engineered-systems/exadata-database-machine/dbmli/restricted-licensing1.html#GUID-EB1E9A0D-2BFF-42BF-865F-8AFCA7207525)

[2.8 Increasing the Number of Active Cores on Database Servers](https://docs.oracle.com/en/engineered-systems/exadata-database-machine/dbmmn/maintaining-exadata-database-servers.html)



Have a good work&life! 2023/01 via LinHong


