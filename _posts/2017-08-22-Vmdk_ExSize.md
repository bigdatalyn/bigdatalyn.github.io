---
layout: post
title: "[原创]VirtualBox的VMDK进行扩容碰到的问题解决"
category: Linux
tags: VirtualBox Linux 
---

* content
{:toc}


[原创]VirtualBox的VMDK进行扩容碰到的问题解决

对Vagrant创建的box，进行HDD的扩容碰到的问题





### 原理

原理是通过vboxmanage命令对vmdk进行转换为vdi之后扩容，再转回vmdk格式文件

	"C:\Program Files\Oracle\VirtualBox\VBoxManage"  clonehd "box-disk002.vmdk" "cloned.vdi" --format vdi

	"C:\Program Files\Oracle\VirtualBox\VBoxManage" modifyhd "cloned.vdi" --resize 51200

	"C:\Program Files\Oracle\VirtualBox\VBoxManage"  clonehd "cloned.vdi" "box-disk002.vmdk" --format vmdk

	
### 问题和解决
	
第三步时候报如下错误

	F:\02_VMs\Docker_default_1503391732690_93590>"C:\Program Files\Oracle\VirtualBox\VBoxManage"  clonehd "cloned.vdi" "box-disk002.vmdk" --format vmdk
	0%...10%...20%...30%...40%...50%...60%...70%...80%...90%...
	Progress state: E_INVALIDARG
	VBoxManage.exe: error: Failed to clone medium
	VBoxManage.exe: error: Cannot register the hard disk 'F:\02_VMs\Docker_default_1503391732690_93590\box-disk002.vmdk' {a8b0015a-4209-45b3-9cdd-007c2a5d80c6} because a hard disk 'F:\02_VMs\Docker_default_1503391732690_93590\box-disk002.vmdk' with UUID {a9adbb09-a0a8-40fb-8831-0c56a38695a3} already exists
	VBoxManage.exe: error: Details: code E_INVALIDARG (0x80070057), component VirtualBoxWrap, interface IVirtualBox
	VBoxManage.exe: error: Context: "enum RTEXITCODE __cdecl handleCloneMedium(struct HandlerArg *)" at line 954 of file VBoxManageDisk.cpp

出错处理：

#### 查看磁盘格式内容：-->SATA (0, 0)

	F:\02_VMs\Docker_default_1503391732690_93590>"C:\Program Files\Oracle\VirtualBox\VBoxManage"  showvminfo Docker_default_1503391732690_93590

	......
	Storage Controller Name (0):            IDE
	Storage Controller Type (0):            PIIX4
	Storage Controller Instance Number (0): 0
	Storage Controller Max Port Count (0):  2
	Storage Controller Port Count (0):      2
	Storage Controller Bootable (0):        on
	Storage Controller Name (1):            SATA
	Storage Controller Type (1):            IntelAhci
	Storage Controller Instance Number (1): 0
	Storage Controller Max Port Count (1):  30
	Storage Controller Port Count (1):      1
	Storage Controller Bootable (1):        on
	IDE (1, 0): Empty
	SATA (0, 0): F:\02_VMs\Docker_default_1503391732690_93590\box-disk002.vmdk (UUID: a9adbb09-a0a8-40fb-8831-0c56a38695a3)
	NIC 1:           MAC: 0800270336F0, Attachment: NAT, Cable connected: on, Trace: off (file: none), Type: 82540EM, Reported speed: 0 Mbps, Boot priority: 0, Promisc Policy: deny, Bandwidth group: none
	NIC 1 Settings:  MTU: 0, Socket (send: 64, receive: 64), TCP Window (send:64, receive: 64)
	NIC 1 Rule(0):   name = ssh, protocol = tcp, host ip = 127.0.0.1, host port = 2222, guest ip = , guest port = 22
	NIC 1 Rule(1):   name = tcp1521, protocol = tcp, host ip = , host port = 1521, guest ip = , guest port = 1521
	NIC 2:           disabled
	......


#### 进行detach( 传递 none 参数)

命令如下：

	F:\02_VMs\Docker_default_1503391732690_93590>"C:\Program Files\Oracle\VirtualBox\VBoxManage"  storageattach Docker_default_1503391732690_93590 --storagectl "SATA" --port 0 --device 0  --medium none

	F:\02_VMs\Docker_default_1503391732690_93590>


#### 删除之前的vmdk

删除之前的vmdk之后再执行，不然报错，而且也要对之前的disk进行close

命令如下：

	F:\02_VMs\Docker_default_1503391732690_93590>"C:\Program Files\Oracle\VirtualBox\VBoxManage"  clonehd "cloned.vdi" "box-disk002.vmdk" --format vmdk
	0%...
	Progress state: VBOX_E_FILE_ERROR
	VBoxManage.exe: error: Failed to clone medium
	VBoxManage.exe: error: Could not create the clone medium 'F:\02_VMs\Docker_default_1503391732690_93590\box-disk002.vmdk'.
	VBoxManage.exe: error: VMDK: could not create new file 'F:\02_VMs\Docker_default_1503391732690_93590\box-disk002.vmdk' (VERR_ALREADY_EXISTS)
	VBoxManage.exe: error: Details: code VBOX_E_FILE_ERROR (0x80bb0004), component MediumWrap, interface IMedium
	VBoxManage.exe: error: Context: "enum RTEXITCODE __cdecl handleCloneMedium(struct HandlerArg *)" at line 954 of file VBoxManageDisk.cpp


	F:\02_VMs\Docker_default_1503391732690_93590>"C:\Program Files\Oracle\VirtualBox\VBoxManage"  closemedium disk a9adbb09-a0a8-40fb-8831-0c56a38695a3

	F:\02_VMs\Docker_default_1503391732690_93590>
	F:\02_VMs\Docker_default_1503391732690_93590> "C:\Program Files\Oracle\VirtualBox\VBoxManage"  clonehd "cloned.vdi" "box-disk002.vmdk" --format vmdk

#### 最后attach回去

最后attach回去( 传递 之前 vmdk的名称 )

命令如下：

	F:\02_VMs\Docker_default_1503391732690_93590>"C:\Program Files\Oracle\VirtualBox\VBoxManage" storageattach Docker_default_1503391732690_93590 --storagectl "SATA" --port 0 --device 0 --type hdd --medium box-disk002.vmdk

	F:\02_VMs\Docker_default_1503391732690_93590>

### Linux下对rootvg的扩容

参考如下：

[Oracle Linux 7 x86_64 Base Box for Vagrant](https://github.com/terrywang/vagrantboxes/blob/master/oraclelinux-7-x86_64.md)

	In case more storage space is needed, create a new hard disk using VBoxManage createhd, attach it using VBoxManage storageattach. Then create a physical volume using the new HDD, add it to existing volume group, either grow existing logical volumes or create new ones, as you wish.
	

[linux硬盘扩容](http://blog.csdn.net/wk022/article/details/48049025)


[扩容XFS磁盘 (Linux)](https://help.aliyun.com/document_detail/35094.html)

结果如下，扩为50G空间

	root@oraclelinux7:~# xfs_growfs /dev/mapper/linux-root                                                                           
	meta-data=/dev/mapper/linux-root isize=256    agcount=4, agsize=1024000 blks
			 =                       sectsz=512   attr=2, projid32bit=1
			 =                       crc=0        finobt=0 spinodes=0
	data     =                       bsize=4096   blocks=4096000, imaxpct=25
			 =                       sunit=0      swidth=0 blks
	naming   =version 2              bsize=4096   ascii-ci=0 ftype=0
	log      =internal               bsize=4096   blocks=2560, version=2
			 =                       sectsz=512   sunit=0 blks, lazy-count=1
	realtime =none                   extsz=4096   blocks=0, rtextents=0
	data blocks changed from 4096000 to 11959296
	root@oraclelinux7:~# df -h
	Filesystem              Size  Used Avail Use% Mounted on
	devtmpfs                1.8G     0  1.8G   0% /dev
	tmpfs                   1.9G     0  1.9G   0% /dev/shm
	tmpfs                   1.9G  8.4M  1.8G   1% /run
	tmpfs                   1.9G     0  1.9G   0% /sys/fs/cgroup
	/dev/mapper/linux-root   46G  1.7G   44G   4% /
	/dev/sda1               477M  101M  373M  22% /boot
	/dev/mapper/linux-home  3.8G  292M  3.5G   8% /home
	tmpfs                   370M     0  370M   0% /run/user/1001
	tmpfs                   370M     0  370M   0% /run/user/0
	root@oraclelinux7:~# 

~~~~~ Lin Hong 2017/08/22 ~~~~~

