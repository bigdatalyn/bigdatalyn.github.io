---
layout: post
title: "[原创]Centos7-64bit安装"
category: Unix
tags: Linux Centos Installation
---

* content
{:toc}

Centos7-64bit安装






### 下载

地址：http://www.centos.org/download/

本例为 Minimal ISO 版本：http://isoredirect.centos.org/centos/7/isos/x86_64/

CentOS-7-x86_64-DVD-1611.iso

CentOS 与 RHEL 是同源，所以，在 CentOS 文档不足时，可以参考 RHEL 的文档。https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Installation_Guide/index.html


### 安装系统

从光盘启动，安装系统。安装中，会提示选择

    默认选择 “Test this media & Install CentOS 7” -> 不选 -> 直接安装
    设置时区:Asia/Hong Kong
	键盘: English(US) 默认
	选择语言: English 设置默认英文
	
	安装源: 默认之前选择光盘启动源
	软件类型: GNONE Desktop 高级使用者可以选mini版

    设置系统安装位置。 选择默认的“自动分配分区”
    设置主机名称和IP
	
    设置 root 密码、创建新用户

参考如下图片

安装配置进行中

![001.InstallCentos7Configuration]({{ "/files/Linux/Centos7/001.InstallCentos7Configuration.png"}})

安装完后需要重启

![002.InstallCentos7Reboot.png]({{ "/files/Linux/Centos7/002.InstallCentos7Reboot.png"}})

重启后需要确认License

![003.InstallCentos7LicenseAccept.png]({{ "/files/Linux/Centos7/003.InstallCentos7LicenseAccept.png"}})

最后画面是

![004.InstallCentos7Desktop.png]({{ "/files/Linux/Centos7/004.InstallCentos7Desktop.png"}})


### NAT网络中，Host和CentOS7的ssh连接

查看 inet addr : 10.0.2.15

然后到 HostOS 的控制面板，看网络和共享中心的VirtualBox Host-Only Network 的 ipv4 属性ip 地址：192.168.56.1

![005.InstallCentos7NAT_SSH.png]({{ "/files/Linux/Centos7/005.InstallCentos7NAT_SSH.png"}})


打开virtualbox 的Settings

-> Network

-> Adapter1 启用 

-> Attached to：NAT

-> Advanced

Port Forwarding 

![006.InstallCentos7NAT_SSH_PortForwarding.png]({{ "/files/Linux/Centos7/006.InstallCentos7NAT_SSH_PortForwarding.png"}})

测试连接：

![007.InstallCentos7NAT_SSH_Test.png]({{ "/files/Linux/Centos7/007.InstallCentos7NAT_SSH_Test.png"}})




