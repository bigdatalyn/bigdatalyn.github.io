---
layout: post
title: "Oracle AWR Exadata Alert Tips"
category: Oracle
tags: Oracle Exadata Tips 
---

* content
{:toc}

Oracle AWR Exadata Alert Tips

There is Critial alert in AWR report like the following.

![CritialAlert]({{ "/files/Oracle/Exadata/ExadataAlertDetail.png"}})









#### Messages

The awr is from the RAC 12.1 and the Exadata is below spec.

	Exadata Storage Server Model/Oracle Corporation ORACLE SERVER X6-2L High Capacity

We found that the following statistics are none in `Instance Activity Stats` section.

```
cell flash cache read hits
cell flash cache read hists for controlfile reads
```
It seems that there is some problem with Flash card in Storage servers.

Usually, we use sundiag tool to confirm the hardware's issues.

#### Sundiag tools

Sample with sundiag's execution.

```shell
[root@exacell01 oracle.SupportTools]# sh sundiag.sh
Oracle Exadata Database Machine - Diagnostics Collection Tool
Gathering Linux information

Skipping ILOM collection. Use the ilom or snapshot options, or login to ILOM
over the network and run Snapshot separately if necessary.

/tmp/sundiag_exacell01_1338NML05G_2020_09_03_16_03
Generating diagnostics tarball and removing temp directory

==============================================================================
Done. The report files are bzip2 compressed in /tmp/sundiag_exacell01_1338NML05G_2020_09_03_16_03.tar.bz2
==============================================================================

```

每个Exadata的数据库服务器和存储服务器节点都安装了sundiag.sh脚本， 在/opt/oracle.SupportTools 路径下；

因为是Exadata初始软件包(image)里所包含的sundiag.sh，所以如果image版本比较旧, 可以到文档 761868.1去下载最新版本的sundiag.sh脚本。


当Exadata 存储服务器 (Exadata Storage Servers) 或数据库节点 (Db nodes)出现磁盘故障或一些其他硬件问题时，我们就使用Sundiag 去收集相关的诊断信息。

执行时请使用root用户:

```
#cd /opt/oracle.SupportTools/
#./sundiag.sh
```

它会自动生成sundiag_<hostname>_<serialnumber>_<timestamp>.tar.bz2 文件并存放在/tmp 文件夹中。

接下来看看disk有问题的几个案例:

alerthistory.out
```
12_1     2016-09-02T00:38:57+08:00     critical     "Data hard disk failed.  Status : NOT PRESENT  Manufacturer : HGST  Model Number : H101212SESUN1.2T  Size : 1.2TB  Serial Number : 1419DLRADF  Firmware : A690  Slot Number : 6  Cell Disk : CD_06_exa02cel02  Grid Disk : DATA1_CD_06_exa02cel02, DBFS_DG_CD_06_exa02cel02, RECO1_CD_06_exa02cel02"

20_1 2016-09-18T02:22:43+00:00 critical "Hard disk status changed to predictive failure. Status : PREDICTIVE FAILURE Manufacturer : SEAGATE Model Number : ST32000SSSUN2.0T Size : 2.0TB Serial Number : L1A2B3 Firmware : 0514 Slot Number : 11 Cell Disk : CD_11_exd1cel01 Grid Disk DATA_EXD1_CD_11_exd1cel01, RECO_EXD1_CD_11_exd1cel01, DBFS_DG_CD_11_exd1cel01"


physicaldisk-fail.out
20:2     L5YH9W     warning  <<<

megacli64-PdList_short_2012_08_23_18_24.out
...
Slot 02 Device 17 (SEAGATE ST32000SSSUN2.0T061A1120L5YH9W  ) status is: Unconfigured(bad)
...
```

还要看一些日志。所以当您发现磁盘有问题时，请及时开SR联系我们售后support，当然现在大部分客户已配置好ASR功能的就可以自动生成SR到我们这里了。

在您提交SR时, 请务必把有问题server的sundiag报告也上传到SR中，这样我们收到SR后就可以尽快分析，并且根据disk是否需要更换来尽快安排工程师去现场。所以只提供disk亮灯的照片对我们support解决问题的帮助是不大的。

Sundiag报告里还有操作系统日志, image的版本, cell的alert日志，ms的日志，系统的一些配置信息等等。因为日志很多，在此就不一一列举了。


### Reference


[Exadata的诊断工具](https://blogs.oracle.com/exadatacn/exadata-v7)





Have a good work&life! 2020/09 via LinHong


