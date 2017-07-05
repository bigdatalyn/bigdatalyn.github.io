---
layout: post
title: "[原创]Centos7-Python安装"
category: Unix
tags: Linux Centos Python
---

* content
{:toc}

Centos7-Python安装






### 默认安装的Python版本Centos7默认安装了python2

Centos7默认安装了python2.7.5 一般yum安装使用的是python2.7.5。

使用python -V命令查看一下是否安装Python：

	[root@bigdatalyn ~]# python -V
	Python 2.7.5
	[root@bigdatalyn ~]# which python
	/usr/bin/python
	[root@bigdatalyn ~]# ls -ltr /usr/bin/python*
	-rwxr-xr-x. 1 root root 7136 Nov  6  2016 /usr/bin/python2.7
	lrwxrwxrwx. 1 root root    9 Jul  3 22:10 /usr/bin/python2 -> python2.7
	lrwxrwxrwx. 1 root root    7 Jul  3 22:10 /usr/bin/python -> python2
	[root@bigdatalyn ~]# 

可以看到可执行文件python指向python2，python2又指向python2.7也就是说Python命令执行的系统预装的Python2.7。


### 安装新版本的Python

下载Python新版本https://www.python.org/downloads/source/

最新是：3.6.1(2017/07)

执行wget命令直接下载到服务器

	wget https://www.python.org/ftp/python/3.6.1/Python-3.6.1.tgz


	[root@bigdatalyn ~]# mkdir python
	[root@bigdatalyn ~]# cd python
	[root@bigdatalyn python]# wget https://www.python.org/ftp/python/3.6.1/Python-3.6.1.tgz
	--2017-07-03 23:16:02--  https://www.python.org/ftp/python/3.6.1/Python-3.6.1.tgz
	Resolving www.python.org (www.python.org)... 151.101.72.223, 2a04:4e42:11::223
	Connecting to www.python.org (www.python.org)|151.101.72.223|:443... connected.
	HTTP request sent, awaiting response... 200 OK
	
解压缩：
	
	tar -zxvf Python-3.6.1.tgz


执行编译安装。

执行 
	
	./configure --prefix=/usr/local/python/python3.6.1 --disable-ipv6


	FAQ:如果缺少--disable-ipv6会有Fatal: You must get working getaddrinfo() function. or you can specify "--disable-ipv6".

#### Tips:

	Configure是一个可执行脚本，它有很多选项，在待安装的源码路径下使用命令./configure –help输出详细的选项列表。
	
	命令./configure命令执行完毕之后创建一个文件creating Makefile，供下面的make命令使用 执行make install之后就会把程序安装到我们指定的目录中去。

	选项--prefix是配置安装的路径，如果不配置该选项，安装后可执行文件默认放在/usr/local/bin，库文件默认放
	在/usr/local/lib，配置文件默认放在/usr/local/etc，其它的资源文件放在/usr/local/share。

	如果配置--prefix，如：
	./configure --prefix=/usr/local/test01
	可以把所有资源文件放在/usr/local/test01的路径中，容易整理。	而且用了—prefix选项的另一个好处是卸载软件或移植软件。不再需要时，简单删除该安装目录即可。移植软件只需拷贝整个目录到另外一个机器即可（相同的OS版本）。


然后执行

	make && make install
	
最后结果是

	~省略~
	Collecting setuptools
	Collecting pip
	Installing collected packages: setuptools, pip
	Successfully installed pip-9.0.1 setuptools-28.8.0


安装成功之后执行下面命令创建软连接。
	
	mv /usr/bin/python /usr/bin/python.back
	ln -s /usr/local/python/python3.6.1/bin/python3  /usr/bin/python
	

最后执行以下命令查看python
	
	python -V


3.修改yum等配置文件

因为yum使用python2，因此替换为python3后可能无法正常工作，继续使用这个python2.7.5

因此修改yum配置文件(vi /usr/bin/yum)。

把文件头部的#!/usr/bin/python改成#!/usr/bin/python2.7保存退出即可。

	[root@bigdatalyn Python-3.6.1]# cat /usr/bin/yum | head -2
	#!/usr/bin/python2.7
	import sys
	[root@bigdatalyn Python-3.6.1]#
	
同样gnome-tweak-tool/urlgrabber-ext-down 一样配置为python2：

	[root@bigdatalyn Python-3.6.1]# cat /usr/bin/gnome-tweak-tool | head -2                                                   
	#!/usr/bin/python2.7

	[root@bigdatalyn Python-3.6.1]#

	[root@bigdatalyn Python-3.6.1]# cat /usr/libexec/urlgrabber-ext-down | head -2
	#! /usr/bin/python2.7
	#  A very simple external downloader
	[root@bigdatalyn Python-3.6.1]# 


#### 其他

错误01：

	configure: error: no acceptable C compiler found in $PATH	
	解决：
	yum -y install gcc

错误02：

	make install时候最后报错：	zipimport.ZipImportError: can't decompress data; zlib not available
	解决：
	yum install zlib zlib-devel -y

安装ftp

	[root@bigdatalyn python]# which vsftpd                                                                               
	/usr/bin/which: no vsftpd in (/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin)
	[root@bigdatalyn python]# yum install vsftpd
	Loaded plugins: fastestmirror, langpacks
	Loading mirror speeds from cached hostfile
	 * base: ftp.sjtu.edu.cn
	 * extras: ftp.sjtu.edu.cn
	 * updates: ftp.sjtu.edu.cn
	Resolving Dependencies
	--> Running transaction check
	---> Package vsftpd.x86_64 0:3.0.2-21.el7 will be installed
	--> Finished Dependency Resolution

	Dependencies Resolved

	=====================================================================================================================
	 Package                   Arch                      Version                           Repository               Size
	=====================================================================================================================
	Installing:
	 vsftpd                    x86_64                    3.0.2-21.el7                      base                    169 k

	Transaction Summary
	=====================================================================================================================
	Install  1 Package

	Total download size: 169 k
	Installed size: 348 k
	Is this ok [y/d/N]: y
	Downloading packages:
	warning: /var/cache/yum/x86_64/7/base/packages/vsftpd-3.0.2-21.el7.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID f4a80eb5: NOKEY
	Public key for vsftpd-3.0.2-21.el7.x86_64.rpm is not installed
	vsftpd-3.0.2-21.el7.x86_64.rpm                                                                | 169 kB  00:00:00     
	Retrieving key from file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
	Importing GPG key 0xF4A80EB5:
	 Userid     : "CentOS-7 Key (CentOS 7 Official Signing Key) <security@centos.org>"
	 Fingerprint: 6341 ab27 53d7 8a78 a7c2 7bb1 24c6 a8a7 f4a8 0eb5
	 Package    : centos-release-7-3.1611.el7.centos.x86_64 (@anaconda)
	 From       : /etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7
	Is this ok [y/N]: y
	Running transaction check
	Running transaction test
	Transaction test succeeded
	Running transaction
	  Installing : vsftpd-3.0.2-21.el7.x86_64                                                                        1/1 
	  Verifying  : vsftpd-3.0.2-21.el7.x86_64                                                                        1/1 

	Installed:
	  vsftpd.x86_64 0:3.0.2-21.el7                                                                                       

	Complete!
	[root@bigdatalyn python]# 
	
	






