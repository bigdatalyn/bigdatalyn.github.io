---
layout: post
title: "Linux Visual-dstat Tips"
category: Linux
tags: Linux dstat Tips
---

* content
{:toc}

Linux Visual-dstat Tips

### Visual-dstat

[bigdatalyn/visual_dstat](https://github.com/bigdatalyn/visual_dstat)

![Visual-dstat]({{ "/files/Linux/Visual-dstat/Visual-dstat.png"}})












### Linux Loading ways

#### CPU

下面命令会创建 CPU 负荷，方法是通过压缩随机数据并将结果发送到 /dev/null

    cat /dev/urandom | gzip -9 > /dev/null

想要更大的负荷，或者系统有多个核，那么只需要对数据进行压缩和解压，如：

    cat /dev/urandom | gzip -9 | gzip -d | gzip -9 | gzip -d > /dev/null

通过 CTRL+C 来终止进程

#### 内存占用

创建一个挂载点，然后将 ramfs 文件系统挂载上去：

    mkdir z

    mount -t ramfs ramfs z/

用 dd 在该目录下创建文件。这里我们创建了一个 512M 的文件：

    dd if=/dev/zero of=z/file bs=1M count=215

bs= 块大小 / count= 要写多少个块

#### 磁盘 I/O

使用命令 dd 创建了一个全是零的 1G 大小的文件

    dd if=/dev/zero of=file0 bs=1M count=1024
	
用 for 循环执行 10 次操作。每次都会拷贝 file0 来覆盖 file1

    for i in {1..10}; do cp file0 file1; done

    while true; do cp file0 file1; done # 无限循环复制文件

#### Others


过 stress 工具和 lookbusy 工具实现，并且更加精准、可控、易用。

以下分别列出几个例子，方便照抄理解。

	stress --cpu 2 # 产生 2 个工作进程对 CPU 施加压力，也就是将会占用两个 CPU 核心
	stress --vm 1 --vm-bytes 128M --vm-hang 0 # 产生 1 个工作进程，占用 128MB 内存并保持
	stress --io 1 # 产生 1 个工作进程对 IO 施加压力

	lookbusy -c 50 # 占用所有 CPU 核心各 50%
	lookbusy -c 50 -n 2 # 占用两个 CPU 核心各 50%
	lookbusy -c 50-80 -r curve # 占用所有 CPU 核心在 50%-80% 左右浮动

	lookbusy -c 0 -m 128MB -M 1000 # 每 1000 毫秒，循环释放并分配 128MB 内存
	lookbusy -c 0 -d 1GB -b 1MB -D 10 # 每 10 毫秒，循环进行 1MB 磁盘写入，临时文件不超过 1GB


#### yum install stress

Yum Update with "Connection Timed out after 30001 milliseconds" Error in Oracle Cloud Infrastructure (Doc ID 2522975.1)

	# nslookup yum.oracle.com
	# ping yum.oracle.com

	# cat /etc/yum.conf |grep -v ^#
	# cat /etc/yum.repos.d/* |grep 'enabled=1' -B 5
	# cat /etc/yum/vars/region

	[root@orl7 ~]# yum install -y stress stress-ng
	ol7_UEKR5                                        | 2.5 kB     00:00
	ol7_addons                                       | 2.5 kB     00:00
	ol7_developer                                    | 2.5 kB     00:00
	ol7_developer_EPEL                               | 2.5 kB     00:00
	ol7_latest                                       | 2.7 kB     00:00
	ol7_optional_latest                              | 2.5 kB     00:00
	(1/10): ol7_developer_EPEL/x86_64/updateinfo       | 4.0 kB   00:00
	(2/10): ol7_addons/x86_64/updateinfo               |  64 kB   00:00
	(3/10): ol7_addons/x86_64/primary_db               | 131 kB   00:01
	(4/10): ol7_latest/x86_64/updateinfo               | 918 kB   00:00
	(5/10): ol7_optional_latest/x86_64/updateinfo      | 696 kB   00:00
	(6/10): ol7_optional_latest/x86_64/primary_db      | 4.8 MB   00:00
	(7/10): ol7_developer_EPEL/x86_64/primary_db       |  14 MB   00:01
	(8/10): ol7_latest/x86_64/primary_db               |  16 MB   00:01
	(9/10): ol7_developer/x86_64/updateinfo            |   86 B   00:03
	(10/10): ol7_developer/x86_64/primary_db           | 501 kB   00:03
	Resolving Dependencies
	--> Running transaction check
	---> Package stress.x86_64 0:1.0.4-16.el7 will be installed
	---> Package stress-ng.x86_64 0:0.07.29-2.el7 will be installed
	--> Processing Dependency: libbsd.so.0(LIBBSD_0.0)(64bit) for package: stress-ng-0.07.29-2.el7.x86_64
	--> Processing Dependency: libbsd.so.0(LIBBSD_0.3)(64bit) for package: stress-ng-0.07.29-2.el7.x86_64
	--> Processing Dependency: libbsd.so.0(LIBBSD_0.5)(64bit) for package: stress-ng-0.07.29-2.el7.x86_64
	--> Processing Dependency: libbsd.so.0()(64bit) for package: stress-ng-0.07.29-2.el7.x86_64
	--> Running transaction check
	---> Package libbsd.x86_64 0:0.8.3-1.el7 will be installed
	--> Finished Dependency Resolution

	Dependencies Resolved

	===============================================================================================
	 Package            Arch            Version                  Repository                   Size
	===============================================================================================
	Installing:
	 stress             x86_64          1.0.4-16.el7             ol7_developer_EPEL           39 k
	 stress-ng          x86_64          0.07.29-2.el7            ol7_developer_EPEL          1.4 M
	Installing for dependencies:
	 libbsd             x86_64          0.8.3-1.el7              ol7_developer_EPEL           84 k

	Transaction Summary
	===============================================================================================
	Install  2 Packages (+1 Dependent package)

	Total download size: 1.5 M
	Installed size: 5.2 M
	Downloading packages:
	(1/3): stress-1.0.4-16.el7.x86_64.rpm                                   |  39 kB  00:00:02
	(2/3): libbsd-0.8.3-1.el7.x86_64.rpm                                    |  84 kB  00:00:02
	(3/3): stress-ng-0.07.29-2.el7.x86_64.rpm                               | 1.4 MB  00:00:02
	-----------------------------------------------------------------------------------------------
	Total                                                          284 kB/s | 1.5 MB  00:00:05
	Running transaction check
	Running transaction test
	Transaction test succeeded
	Running transaction
	  Installing : libbsd-0.8.3-1.el7.x86_64                                                   1/3
	  Installing : stress-ng-0.07.29-2.el7.x86_64                                              2/3
	  Installing : stress-1.0.4-16.el7.x86_64                                                  3/3
	  Verifying  : libbsd-0.8.3-1.el7.x86_64                                                   1/3
	  Verifying  : stress-1.0.4-16.el7.x86_64                                                  2/3
	  Verifying  : stress-ng-0.07.29-2.el7.x86_64                                              3/3

	Installed:
	  stress.x86_64 0:1.0.4-16.el7                 stress-ng.x86_64 0:0.07.29-2.el7

	Dependency Installed:
	  libbsd.x86_64 0:0.8.3-1.el7

	Complete!
	[root@orl7 ~]#



	
Have a good work&life! 2019/08 via LinHong



