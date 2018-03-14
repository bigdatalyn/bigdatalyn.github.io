---
layout: post
title: "How to install Redis3.0 in Linux 7?"
category: Redis
tags: Redis Unix
---

* content
{:toc}


How to install Redis3.0 in Linux 7?







#### Download&Make&Config

Wget the file and make

	root@oraclelinux7:~# wget http://download.redis.io/releases/redis-3.0.6.tar.gz
	--2018-03-07 14:34:46--  http://download.redis.io/releases/redis-3.0.6.tar.gz
	Proxy request sent, awaiting response... 200 OK
	Length: 1372648 (1.3M) [application/x-gzip]
	Saving to: redis-3.0.6.tar.gz
	100%[=================================================================================================================================>] 1,372,648    799KB/s   in 1.7s   

	2018-03-07 14:34:51 (799 KB/s) - redis-3.0.6.tar.gz saved [1372648/1372648]
	root@oraclelinux7:~# 
	root@oraclelinux7:~# ls -l redis-3.0.6.tar.gz
	-rw-r----- 1 root root 1372648 Dec 19  2015 redis-3.0.6.tar.gz
	root@oraclelinux7:~# chmod a+x redis-3.0.6.tar.gz 
	root@oraclelinux7:~# tar xzf redis-3.0.6.tar.gz 
	root@oraclelinux7:~# cd redis-3.0.6/
	root@oraclelinux7:~/redis-3.0.6# make

#### Systemctl Redis service

Linux7配置服务文件：

Linux7稍微不一样，通过systemctl start redis

编辑systemctl服务文件：

	root@oraclelinux7:/lib/systemd/system# pwd
	/lib/systemd/system
	root@oraclelinux7:/lib/systemd/system# vi redis.service
	root@oraclelinux7:/lib/systemd/system# cat redis.service
	[Unit]
	Description=Redis
	After=network.target

	[Service]
	Type=forking
	ExecStart=/root/redis-3.0.6/src/redis-server /etc/redis/redis.6380.conf
	ExecStop=/root/redis-3.0.6/src/redis-cli -h 127.0.0.1 -p 6380 shutdown
	ExecReload=/root/redis-3.0.6/src/redis-server -s
	PrivateTmp=true

	[Install]
	WantedBy=multi-user.target
	root@oraclelinux7:/lib/systemd/system# 

	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	  ● [Unit] 表示这是基础信息
		  ○ Description 是描述
		  ○ After 是在那个服务后面启动，一般是网络服务启动后启动
	  ● [Service] 表示这里是服务信息
		  ○ ExecStart 是启动服务的命令
		  ○ ExecStop 是停止服务的指令
		  ○ ExecReload 是重启服务的指令
	  ● [Install] 表示这是是安装相关信息
		  ○ WantedBy 是以哪种方式启动：multi-user.target表明当系统以多用户方式（默认的运行级别）启动时，这个服务需要被自动运行。
	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

创建多用户链接：

	root@oraclelinux7:/lib/systemd/system# ln -s /lib/systemd/system/redis.service /etc/systemd/system/multi-user.target.wants/redis.service
	root@oraclelinux7:/lib/systemd/system# 

重新reload下服务：

	root@oraclelinux7:/lib/systemd/system# systemctl daemon-reload
	
启动redis服务：

	root@oraclelinux7:/lib/systemd/system# systemctl start redis
	root@oraclelinux7:/lib/systemd/system# systemctl status redis
	仠 redis.service - Redis
	   Loaded: loaded (/usr/lib/systemd/system/redis.service; enabled; vendor preset: disabled)
	   Active: active (running) since Wed 2018-03-07 15:55:20 AEDT; 2s ago
	  Process: 4853 ExecStart=/root/redis-3.0.6/src/redis-server /etc/redis/redis.6380.conf (code=exited, status=0/SUCCESS)
	 Main PID: 4855 (redis-server)
	   CGroup: /system.slice/redis.service
			   4855 /root/redis-3.0.6/src/redis-server *:6380

	Mar 07 15:55:20 oraclelinux7.vagrant.vm systemd[1]: Starting Redis...
	Mar 07 15:55:20 oraclelinux7.vagrant.vm systemd[1]: Started Redis.
	root@oraclelinux7:/lib/systemd/system# ps -ef | grep redis
	root      4855     1  0 15:55 ?        00:00:00 /root/redis-3.0.6/src/redis-server *:6380
	root      4862  1750  0 15:55 pts/0    00:00:00 grep --color=auto redis
	root@oraclelinux7:/lib/systemd/system# 
	root@oraclelinux7:/lib/systemd/system# systemctl status redis
	仠 redis.service - Redis
	   Loaded: loaded (/usr/lib/systemd/system/redis.service; enabled; vendor preset: disabled)
	   Active: active (running) since Wed 2018-03-07 15:55:20 AEDT; 2s ago
	  Process: 4853 ExecStart=/root/redis-3.0.6/src/redis-server /etc/redis/redis.6380.conf (code=exited, status=0/SUCCESS)
	 Main PID: 4855 (redis-server)
	   CGroup: /system.slice/redis.service
			   4855 /root/redis-3.0.6/src/redis-server *:6380

	Mar 07 15:55:20 oraclelinux7.vagrant.vm systemd[1]: Starting Redis...
	Mar 07 15:55:20 oraclelinux7.vagrant.vm systemd[1]: Started Redis.
	root@oraclelinux7:/lib/systemd/system# ps -ef | grep redis
	root      4855     1  0 15:55 ?        00:00:00 /root/redis-3.0.6/src/redis-server *:6380
	root      4862  1750  0 15:55 pts/0    00:00:00 grep --color=auto redis
	root@oraclelinux7:/lib/systemd/system# 

设置环境变量

	root@oraclelinux7:~# vi .bashrc
	root@oraclelinux7:~# cat .bashrc | grep PATH
		export PATH=$HOME/.linuxbrew/bin:$PATH
		export LD_LIBRARY_PATH=$HOME/.linuxbrew/lib
	export PATH=/root/redis-3.0.6/src:$PATH
	root@oraclelinux7:~# 
	root@oraclelinux7:~# source .bashrcroot@oraclelinux7:~# which redis-cli
	/root/redis-3.0.6/src/redis-cli
	root@oraclelinux7:~# redis-cli -p 6380
	127.0.0.1:6380> 
	127.0.0.1:6380> exit
	root@oraclelinux7:~# 	
	
#### Detail install step
	
Please confirm this pdf file.	
	
[Redis](/files/Redis/Redis3Linux7-64bit安装及启动配置的简单介绍.pdf)
	
++++++++++++++++ EOF LinHong ++++++++++++++++	





