---
layout: post
title: "[原创]Linux Red-hat/CentOS下的xMind安装"
date:   2016-06-01 11:15:00
category: Unix
tags: Unix xMind 
---

* content
{:toc}

XMind作为国内使用最广泛的思维导图软件，拥有强大的功能、优秀的用户体验和操作简单的特点，正在为200万用户提供更高的生产力及创造力。

XMind 思维导图软件在Redhat下的安装步骤。





### [原创]Linux Red-hat/CentOS下的xMind安装

平台：

	$ cat /etc/redhat-release 
	Red Hat Enterprise Linux Workstation release 6.6 (Santiago)
	$ 


#### 1.下载并把安装包mv到一个文件夹（如:/tmp/xMind），通过下面命令解压

	ar -x xmind7-linux-3.6.0.R-201511090408_amd64.deb

	ar -x xmind-7-update1-linux_amd64.deb

得到如下文件

	[root@bigdata01 xMind]# ll
	total 243884
	-r-x--x--x. 1 lyn lyn 121522170 Jun  6 22:34 xmind7-linux-3.6.0.R-201511090408_amd64.deb
	-rwxrwxr-x. 1 lyn lyn 128204036 Jun  6 21:39 xmind-7-update1-linux_amd64.deb
	[root@bigdata01 xMind]# ar -x xmind7-linux-3.6.0.R-201511090408_amd64.deb 
	[root@bigdata01 xMind]# ar -x xmind-7-update1-linux_amd64.deb
	[root@bigdata01 xMind]# ll
	total 362568
	-rw-r--r--. 1 root    root        74554 Jun  6 23:06 control.tar.gz
	-rw-r--r--. 1 root    root    121447424 Jun  6 23:06 data.tar.gz
	-rw-r--r--. 1 root    root            4 Jun  6 23:06 debian-binary
	-r-x--x--x. 1 lyn lyn 121522170 Jun  6 22:34 xmind7-linux-3.6.0.R-201511090408_amd64.deb
	-rwxrwxr-x. 1 lyn lyn 128204036 Jun  6 21:39 xmind-7-update1-linux_amd64.deb
	[root@bigdata01 xMind]# 



#### 2.解压拷贝对应的文件到/usr和/opt目录

解压：

	[root@bigdata01 xMind]# tar -xf data.tar.gz 
	[root@bigdata01 xMind]# ll
	total 362576
	-rw-r--r--. 1 root    root        74554 Jun  6 23:06 control.tar.gz
	-rw-r--r--. 1 root    root    121447424 Jun  6 23:06 data.tar.gz
	-rw-r--r--. 1 root    root            4 Jun  6 23:06 debian-binary
	drwxr-xr-x. 2 root    root         4096 Nov  9  2015 etc
	drwxr-xr-x. 5 root    root         4096 Nov  9  2015 usr
	-r-x--x--x. 1 lyn lyn 121522170 Jun  6 22:34 xmind7-linux-3.6.0.R-201511090408_amd64.deb
	-rwxrwxr-x. 1 lyn lyn 128204036 Jun  6 21:39 xmind-7-update1-linux_amd64.deb
	[root@bigdata01 xMind]# 

确认：

	[root@bigdata01 xMind]# ll usr/bin/XMind
	-rwxr-xr-x. 1 root root 156 Dec 24 17:13 usr/bin/XMind
	[root@bigdata01 xMind]# ll usr/lib/xmind
	total 696
	-rw-r--r--.  1 root root 383025 Dec 24 17:13 artifacts.xml
	drwxr-xr-x.  4 root root   4096 Dec 24 17:13 configuration
	-rw-r--r--.  1 root root  16560 Nov  2  2015 epl-v10.html
	drwxr-xr-x. 23 root root   4096 Dec 24 17:13 features
	-rw-r--r--.  1 root root   8492 Nov  2  2015 lgpl-3.0.html
	drwxr-xr-x.  4 root root   4096 Dec 24 17:12 p2
	drwxr-xr-x. 21 root root 159744 Dec 24 17:13 plugins
	-rw-r--r--.  1 root root  30782 Dec 24 15:40 readme.txt
	-rwxr-xr-x.  1 root root  79058 Dec 24 17:11 XMind
	lrwxrwxrwx.  1 root root     14 Jun  6 21:58 XMind.ini -> /etc/XMind.ini
	-rw-r--r--.  1 root root   3211 Nov  2  2015 xpla.txt
	[root@bigdata01 xMind]# ll usr/share/
	total 28
	drwxr-xr-x. 2 root root 4096 Dec 24 17:13 applications
	drwxr-xr-x. 3 root root 4096 Dec 24 17:13 doc
	drwxr-xr-x. 3 root root 4096 Dec 24 17:13 fonts
	drwxr-xr-x. 3 root root 4096 Dec 24 17:13 lintian
	drwxr-xr-x. 3 root root 4096 Dec 24 17:13 man
	drwxr-xr-x. 3 root root 4096 Dec 24 17:13 mime
	drwxr-xr-x. 2 root root 4096 Dec 24 17:13 pixmaps
	[root@bigdata01 xMind]# 

拷贝：

	[root@bigdata01 xMind]# cp -r usr/bin/XMind   /opt/
	[root@bigdata01 xMind]# cp -r usr/lib/xmind   /usr/lib/
	[root@bigdata01 xMind]# cp -r usr/share/   /usr/
	[root@bigdata01 xMind]#

#### 3.解压control.tar.gz文件

解压：

	[root@bigdata01 xMind]# tar -xzf control.tar.gz
	[root@bigdata01 xMind]# ll
	total 362924
	-rw-r--r--. 1 root    root           15 Nov  9  2015 conffiles
	-rw-r--r--. 1 root    root         1090 Nov  9  2015 control
	-rw-r--r--. 1 root    root        74554 Jun  6 23:06 control.tar.gz
	-rw-r--r--. 1 root    root    121447424 Jun  6 23:06 data.tar.gz
	-rw-r--r--. 1 root    root            4 Jun  6 23:06 debian-binary
	drwxr-xr-x. 2 root    root         4096 Nov  9  2015 etc
	-rw-r--r--. 1 root    root       336635 Nov  9  2015 md5sums
	-rwxr-xr-x. 1 root    root          272 Nov  9  2015 postinst
	-rwxr-xr-x. 1 root    root          272 Nov  9  2015 postrm
	drwxr-xr-x. 5 root    root         4096 Nov  9  2015 usr
	-r-x--x--x. 1 lyn lyn 121522170 Jun  6 22:34 xmind7-linux-3.6.0.R-201511090408_amd64.deb
	-rwxrwxr-x. 1 lyn lyn 128204036 Jun  6 21:39 xmind-7-update1-linux_amd64.deb
	[root@bigdata01 xMind]#

执行postinst:

	[root@bigdata01 xMind]# sh postinst 
	[root@bigdata01 xMind]# 

#### 4.编辑 /usr/share/applications/xmind.desktop 文件

	[root@bigdata01 xMind]# vim /usr/share/applications/xmind.desktop
	[root@bigdata01 xMind]# 

icon和exec内容：

* Icon=/usr/share/pixmaps/XMind.png
* Exec=/opt/XMind

#### 5.启动&使用

启动


![xMind-Start]({{ "/files/Images/Others/xmind-start.png"}})


画面

![xMind-Menu]({{ "/files/Images/Others/xmind-menu.png"}})


#### 6.学习使用



[XMind新手入门完整攻略](http://www.xmindchina.net/xinshou/xmind-xinshourumen.html)


[XMind十大最有用的功能](http://www.xmindchina.net/xinwen/xmind-shidagongneng.html)

#### 参考资料


[xMind's Download site](http://www.xmind.net/download/linux/)


Install ways:

[linux安装Xmind的经验](http://www.linuxdiyf.com/linux/15084.html)


[在CentOS7中安装思维导图软件XMind](http://www.linuxidc.com/Linux/2015-10/124155.htm)

[linux红旗红帽怎样安装deb文件 ZT](http://yuanmuqiuyu2000.blog.sohu.com/300964909.html)


END






