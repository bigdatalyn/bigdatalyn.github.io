---
layout: post
title: "[原创]Oracle Linux in Docker 测试"
category: Oracle
tags: Oracle Docker Linux
---

* content
{:toc}

[原创]Oracle Linux in Docker 测试






#### 参考资料

[5.2 Using the Docker Store](https://docs.oracle.com/cd/E52668_01/E87205/html/docker-store.html)

#### 拉取Oracle Linux的docker试一试

登陆oracle store之后pull images

	root@oraclelinux7:~# docker login container-registry.oracle.com
	Username: xxxxx@yyyyyy.com
	Password: 
	Login Succeeded
	root@oraclelinux7:~# docker pull container-registry.oracle.com/os/oraclelinux:6                                                  
	6: Pulling from os/oraclelinux
	88710002ea6c: Downloading [=>    ] 1.592 MB/68.76 MB    

	~~省略 进行中~~
	
	root@oraclelinux7:~# docker pull container-registry.oracle.com/os/oraclelinux:6                                                  
	6: Pulling from os/oraclelinux
	88710002ea6c: Pull complete                                                                                                      
	Digest: sha256:9ee6b162062040c59f6bdc7fd47a9c55f08695c898d517b99bb6d48a0ed9ccf2
	Status: Downloaded newer image for container-registry.oracle.com/os/oraclelinux:6
	root@oraclelinux7:~# docker images
	REPOSITORY                                     TAG                 IMAGE ID            CREATED             SIZE
	oracle/database                                12.2.0.1-ee         ffd588858327        26 hours ago        13.2 GB
	oraclelinux                                    7-slim              c0feb50f7527        2 weeks ago         118 MB
	container-registry.oracle.com/os/oraclelinux   6                   7a4a8c404142        2 months ago        171 MB
	root@oraclelinux7:~# docker pull container-registry.oracle.com/os/oraclelinux:7                                                  
	7: Pulling from os/oraclelinux
	e57cd89aabf1: Pull complete                                                                                                      
	Digest: sha256:5e4d0f40f00ee2e62c78bd0ccb6bdbfdc166023b9b2da9a7ea58b2cb142e4633
	Status: Downloaded newer image for container-registry.oracle.com/os/oraclelinux:7
	root@oraclelinux7:~# 

运行&测试：
	
	root@oraclelinux7:~# docker images
	REPOSITORY                                     TAG                 IMAGE ID            CREATED             SIZE
	oracle/database                                12.2.0.1-ee         ffd588858327        26 hours ago        13.2 GB
	oraclelinux                                    7-slim              c0feb50f7527        2 weeks ago         118 MB
	container-registry.oracle.com/os/oraclelinux   6                   7a4a8c404142        2 months ago        171 MB
	container-registry.oracle.com/os/oraclelinux   7                   25e592d7eec7        2 months ago        225 MB
	container-registry.oracle.com/os/oraclelinux   latest              25e592d7eec7        2 months ago        225 MB
	root@oraclelinux7:~# docker run -it --name oraLinux7 -d container-registry.oracle.com/os/oraclelinux:7
	0f038ec88708cd67857f7984947c780629e4afba16768866ff74bd13490c2c12
	root@oraclelinux7:~# docker ps 
	CONTAINER ID        IMAGE                                            COMMAND             CREATED             STATUS              PORTS               NAMES
	0f038ec88708        container-registry.oracle.com/os/oraclelinux:7   "/bin/bash"         6 seconds ago       Up 2 seconds                            oraLinux7
	root@oraclelinux7:~# 
	root@oraclelinux7:~# docker exec -it oraLinux7 /bin/bash
	[root@0f038ec88708 /]# uname -a
	Linux 0f038ec88708 4.1.12-94.5.9.el7uek.x86_64 #2 SMP Tue Aug 15 13:56:37 PDT 2017 x86_64 x86_64 x86_64 GNU/Linux
	[root@0f038ec88708 /]# 

安装服务

> yum clean all
> yum install -y curl which tar sudo openssh-server openssh-clients net-tools rsync	
> yum install openssh-server net-tools -y
	
报错：
	
	[root@0f038ec88708 ~]# service sshd start
	Redirecting to /bin/systemctl start  sshd.service
	Failed to get D-Bus connection: Operation not permitted
	[root@0f038ec88708 ~]# 
	[root@0f038ec88708 ~]# systemctl status sshd.service
	Failed to get D-Bus connection: Operation not permitted
	[root@0f038ec88708 ~]# 

参考

> [docker Failed to get D-Bus connection 报错 ](http://welcomeweb.blog.51cto.com/10487763/1735251)	

> [Failed to get D-Bus connection: Operation not permitted ， docker安装centos7之坑 ](https://my.oschina.net/u/876354/blog/914320)

解决操作如下：

> docker run --privileged -d -p 80:80 --name oraLinux7 container-registry.oracle.com/os/oraclelinux:7 /sbin/init

通过特权模式启动： --privileged

container启动方式：/sbin/init

	root@oraclelinux7:~# docker images
	REPOSITORY                                     TAG                 IMAGE ID            CREATED             SIZE
	oracle/database                                12.2.0.1-ee         ffd588858327        28 hours ago        13.2 GB
	oraclelinux                                    7-slim              c0feb50f7527        2 weeks ago         118 MB
	container-registry.oracle.com/os/oraclelinux   6                   7a4a8c404142        2 months ago        171 MB
	container-registry.oracle.com/os/oraclelinux   7                   25e592d7eec7        2 months ago        225 MB
	container-registry.oracle.com/os/oraclelinux   latest              25e592d7eec7        2 months ago        225 MB
	root@oraclelinux7:~# docker run --privileged -d -p 80:80 --name oraLinux7 container-registry.oracle.com/os/oraclelinux:7 /sbin/init
	417d85369dacc8738390380c9222822ee49e7faa44ff5d10d6cf77b5bf388468
	root@oraclelinux7:~# docker ps 
	CONTAINER ID        IMAGE                                            COMMAND             CREATED             STATUS              PORTS                NAMES
	417d85369dac        container-registry.oracle.com/os/oraclelinux:7   "/sbin/init"        7 seconds ago       Up 2 seconds        0.0.0.0:80->80/tcp   oraLinux7
	root@oraclelinux7:~# docker exec -it oraLinux7 /bin/bash                                                                         
	[root@417d85369dac /]# 
	[root@417d85369dac /]# vi /etc/yum.conf   ### 有代理地址的话，设置代理
	[root@417d85369dac /]# yum install -y curl which tar sudo openssh-server openssh-clients net-tools rsync
	Loaded plugins: ovl, ulninfo
	ol7_UEKR4                                                                                                 | 1.2 kB  00:00:00     
	ol7_latest                                                                                                | 1.4 kB  00:00:00     
	(1/5): ol7_UEKR4/x86_64/updateinfo                                                                        | 117 kB  00:00:00     

	~~~ 省略 ~~~
	
	  libcurl.x86_64 0:7.29.0-42.el7          openssh.x86_64 0:7.4p1-11.el7          openssl-libs.x86_64 1:1.0.2k-8.0.1.el7         

	Complete!
	[root@417d85369dac /]# 
	[root@417d85369dac /]# systemctl start sshd      ### 启动ssh服务
	[root@417d85369dac /]# ps -ef | grep ssh
	root       291     1  0 08:50 ?        00:00:00 /usr/sbin/sshd -D                                                                
	root       299   211  0 08:52 ?        00:00:00 grep --color=auto ssh                                                            
	[root@417d85369dac /]# 
	[root@417d85369dac /]# ifconfig          ### 查看IP地址
	eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
			inet 172.17.0.2  netmask 255.255.0.0  broadcast 0.0.0.0
			inet6 fe80::42:acff:fe11:2  prefixlen 64  scopeid 0x20<link>
			ether 02:42:ac:11:00:02  txqueuelen 0  (Ethernet)
			RX packets 24122  bytes 60465611 (57.6 MiB)
			RX errors 0  dropped 0  overruns 0  frame 0
			TX packets 11049  bytes 601201 (587.1 KiB)
			TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

	lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
			inet 127.0.0.1  netmask 255.0.0.0
			inet6 ::1  prefixlen 128  scopeid 0x10<host>
			loop  txqueuelen 0  (Local Loopback)
			RX packets 0  bytes 0 (0.0 B)
			RX errors 0  dropped 0  overruns 0  frame 0
			TX packets 0  bytes 0 (0.0 B)
			TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

	[root@417d85369dac /]# 
	
	[root@417d85369dac /]# passwd          ### 修改密码
	Changing password for user root.
	New password: 
	BAD PASSWORD: The password fails the dictionary check - it is based on a dictionary word
	Retype new password: 
	passwd: all authentication tokens updated successfully.
	[root@417d85369dac /]# 
	
结果从host通过ssh连接container：

	root@oraclelinux7:~# ssh 172.17.0.2
	The authenticity of host '172.17.0.2 (172.17.0.2)' can't be established.
	ECDSA key fingerprint is SHA256:l5b8xnanoY8N+6na/9sHRSaqGeYWPAY6UoBWiUGdpH4.
	ECDSA key fingerprint is MD5:09:7f:b2:fd:c8:29:d2:f2:88:2d:c0:22:d2:8f:e1:c6.
	Are you sure you want to continue connecting (yes/no)? yes
	Warning: Permanently added '172.17.0.2' (ECDSA) to the list of known hosts.
	root@172.17.0.2's password: 
	[root@417d85369dac ~]#

最后自己打包一个：

** 可以看见images变更934M了

	root@oraclelinux7:~# docker commit oraLinux7 my_oralinux7:7
	sha256:8b7adc197f8d71e3f743ee3735025d26802097d5ba1727fbd8b9f7fa48b97d9e
	root@oraclelinux7:~# 
	root@oraclelinux7:~# docker images
	REPOSITORY                                     TAG                 IMAGE ID            CREATED             SIZE
	my_oralinux7                                   7                   8b7adc197f8d        28 seconds ago      934 MB
	oracle/database                                12.2.0.1-ee         ffd588858327        28 hours ago        13.2 GB
	oraclelinux                                    7-slim              c0feb50f7527        2 weeks ago         118 MB
	container-registry.oracle.com/os/oraclelinux   6                   7a4a8c404142        2 months ago        171 MB
	container-registry.oracle.com/os/oraclelinux   7                   25e592d7eec7        2 months ago        225 MB
	container-registry.oracle.com/os/oraclelinux   latest              25e592d7eec7        2 months ago        225 MB
	root@oraclelinux7:~# 
	
	
	