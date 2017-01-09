---
layout: post
title:  "Docker 安装"
date:   2016-01-27 09:06:05

category: Docker
excerpt: Docker Install 
tag: 安装
---

* content
{:toc}

参考书《Docker技术入门与实战》





>windows忽略，小苹果木有，所以咱只看ubuntu和centOS的吧！
参考书《Docker技术入门与实战》

##Ubuntu 14.04安装Docker
Ubuntu 14.04版本官方软件源中已经自带了Docker包，可以直接安装：
	
	$ sudo apt-get update
	$ sudo apt-get install -y docker.io
	$ sudo ln -sf /usr/bin/docker.io /usr/local/bin/docker
	$ sudo sed -i '$acomplete -F _docker docker' /etc/bash_completion.d/docker.io

以上流程使用Ubuntu 14.04系统默认自带docker.io安装包安装Docker，这样安装的Docker版本相对较旧。

读者也可通过下面的方法从Docker官方源安装最新版本。首先需要安装`apt-transport-https`，并添加Docker官方源：

	$ sudo apt-get install apt-transport-https
	$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9
	$ sudo bash -c "echo deb https://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"
	$ sudo apt-get update

之后，可以通过下面的命令来安装最新版本的Docker：

	$ sudo apt-get install -y lxc-docker

在安装了Docker官方软件源后，若需要更新Docker软件版本，只需要执行以下命令即可升级：

	$ sudo apt-get update -y lxc-docker

文中使用`$`作为终端引导符时，表示非root权限用户；#代表是root用户。

##ubuntu 14.04以下的版本
如果使用的是较低版本的Ubuntu系统，则需要先进行内核更新并重启系统后再进行安装：

	$ sudo apt-get update
	$ sudo apt-get install -y linux-image-generic-lts-raring linux-headers-generic-lts-raring
	$ sudo reboot

重启后，重复在Ubuntu 14.04系统的安装步骤即可。

##Docker支持CentOS 6及以后的版本
对于CentOS 6系统可使用EPEL库安装Docker，命令如下：


	$ sudo yum install -y http://mirrors.yun-idc.com/epel/6/i386/epel-release-6-8.noarch.rpm
	$ sudo yum install -y docker-io

##CentOS 7系统安装docker
由于CentOS-Extras源中已内置Docker，读者可以直接使用yum命令进行安装：

	$ sudo yum install -y docker   #**【之后要重启系统，然后再start服务才可以！！！】**

目前在Centos系统中更新Docker软件有两种方法，一是自行通过源码编译安装，二是下载二进制文件进行更新。

