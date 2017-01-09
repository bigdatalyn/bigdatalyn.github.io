---
layout: post
title: "[原创]Centos7 下的ifconfig和netstat命令"
date:   2016-05-24 10:12:00
category: Unix
tags: Unix ifconfig netstat Centos 
---

* content
{:toc}

扩表空大小，需要考虑系统文件大小的限制吗？




### Centos7 下的ifconfig和netstat命令

Centos6换过来后感觉到不少细微的变化,CentOS 7默认没有ifconfig和netstat两个命令.

ifconfig其实使用ip addr命令可以代替，在cenots6下的ss命令可以代替netstat，但是现在的ss和以前的完全是两样 ，还是得装上才行方便查看端口占用和tcp链接攻击等等。

把net-tools包装上就好了

    yum install net-tools

如下：

	[root@chefclient ~]# yum install net-tools
	Loaded plugins: fastestmirror
	Loading mirror speeds from cached hostfile
	 * base: mirrors.tuna.tsinghua.edu.cn
	 * extras: mirrors.tuna.tsinghua.edu.cn
	 * updates: centos.ustc.edu.cn
	Resolving Dependencies
	--> Running transaction check
	---> Package net-tools.x86_64 0:2.0-0.17.20131004git.el7 will be installed
	--> Finished Dependency Resolution

	Dependencies Resolved

	=============================================================================================================================================================
	 Package                            Arch                            Version                                              Repository                     Size
	=============================================================================================================================================================
	Installing:
	 net-tools                          x86_64                          2.0-0.17.20131004git.el7                             base                          304 k

	Transaction Summary
	=============================================================================================================================================================
	Install  1 Package

	Total download size: 304 k
	Installed size: 917 k
	Is this ok [y/d/N]: Y
	Downloading packages:
	net-tools-2.0-0.17.20131004git.el7.x86_64.rpm                                                                                         | 304 kB  00:00:00     
	Running transaction check
	Running transaction test
	Transaction test succeeded
	Running transaction
	  Installing : net-tools-2.0-0.17.20131004git.el7.x86_64                                                                                                 1/1 
	  Verifying  : net-tools-2.0-0.17.20131004git.el7.x86_64                                                                                                 1/1 

	Installed:
	  net-tools.x86_64 0:2.0-0.17.20131004git.el7                                                                                                                

	Complete!
	[root@chefclient ~]# 
	[root@chefclient ~]# netstat -antp
	Active Internet connections (servers and established)
	Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
	tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      831/sshd            
	tcp        0      0 127.0.0.1:25            0.0.0.0:*               LISTEN      1948/master         
	tcp        0      0 192.168.122.136:47321   166.111.206.63:80       TIME_WAIT   -                   
	tcp        0      0 192.168.122.136:55083   202.118.1.64:80         TIME_WAIT   -                   
	tcp        0      0 192.168.122.136:22      192.168.122.1:45917     ESTABLISHED 8798/sshd: root@pts 
	tcp6       0      0 :::80                   :::*                    LISTEN      832/httpd           
	tcp6       0      0 :::22                   :::*                    LISTEN      831/sshd            
	tcp6       0      0 ::1:25                  :::*                    LISTEN      1948/master         
	[root@chefclient ~]# 




---

