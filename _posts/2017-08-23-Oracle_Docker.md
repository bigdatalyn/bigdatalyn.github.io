---
layout: post
title: "[原创]创建Oracle Database Imange in Docker"
category: Oracle
tags: Oracle Docker 
---

* content
{:toc}

[原创]创建Oracle Database Imange in Docker

在Oracle Linux x86-64的虚拟机上安装docker + DB12cR2的步骤









### vagrant安装OL7.3

参考之前文档并扩容50G空间

类似：

	F:\02_VMs\Docker>vagrant up
	Bringing machine 'default' up with 'virtualbox' provider...
	==> default: Importing base box 'OL7.3_Docker'...
	==> default: Matching MAC address for NAT networking...
	==> default: Setting the name of the VM: Docker_default_1503391732690_93590
	==> default: Clearing any previously set network interfaces...
	==> default: Preparing network interfaces based on configuration...
		default: Adapter 1: nat
	==> default: Forwarding ports...
		default: 1521 (guest) => 1521 (host) (adapter 1)
		default: 22 (guest) => 2222 (host) (adapter 1)
	==> default: Running 'pre-boot' VM customizations...
	==> default: Booting VM...
	==> default: Waiting for machine to boot. This may take a few minutes...
		default: SSH address: 127.0.0.1:2222
		default: SSH username: vagrant
		default: SSH auth method: private key
		default: Warning: Connection aborted. Retrying...
		default:
		default: Vagrant insecure key detected. Vagrant will automatically replace
		default: this with a newly generated keypair for better security.
		default:
		default: Inserting generated public key within guest...
		default: Removing insecure key from the guest if it's present...
		default: Key inserted! Disconnecting and reconnecting using new SSH key...
	==> default: Machine booted and ready!
	==> default: Checking for guest additions in VM...
	==> default: Mounting shared folders...
		default: /vagrant => F:/02_VMs/Docker
	==> default: Running provisioner: shell...
		default: Running: C:/Users/honglin/AppData/Local/Temp/vagrant-shell20170822-8728-1wgp647.sh

	F:\02_VMs\Docker>


### 安装docker

参考文档如下：(备注代理设置自行biadu/google解决，大概需要设置/etc/yum.conf,/etc/resolv.conf, .bashrc代理变量设置等)

	Install Docker in this VM 

	https://docs.oracle.com/cd/E52668_01/E87205/html/docker_install_upgrade_yum_uek.html

参考命令：
	
	# yum-config-manager --disable ol7_UEKR3
	# yum-config-manager --enable ol7_UEKR4

	# yum update
	# systemctl reboot

	# yum-config-manager --enable ol7_addons
	# yum install docker-engine

![yum_update]({{ "/files/Images/Oracle/Docker/yum_update.png"}})

### 下载git包

https://github.com/oracle/docker-images/tree/master/OracleDatabase

命令：

	yum install wget
	yum install git
	git clone https://github.com/oracle/docker-images.git

Log步骤：

	root@oraclelinux7:~# uname -a
	Linux oraclelinux7.vagrant.vm 4.1.12-94.3.9.el7uek.x86_64 #2 SMP Fri Jul 14 20:09:40 PDT 2017 x86_64 x86_64 x86_64 GNU/Linux
	root@oraclelinux7:~# which wget
	/usr/bin/wget
	root@oraclelinux7:~# which git
	/usr/bin/git
	root@oraclelinux7:~# git clone https://github.com/oracle/docker-images.git                                                                                 
	Cloning into 'docker-images'...
	remote: Counting objects: 6473, done.                                                                                                                      
	remote: Compressing objects: 100% (46/46), done.                                                                                                           
	remote: Total 6473 (delta 17), reused 27 (delta 8), pack-reused 6419                                                                                       
	Receiving objects: 100% (6473/6473), 4.85 MiB | 321.00 KiB/s, done.
	Resolving deltas: 100% (3624/3624), done.
	root@oraclelinux7:~# 
	root@oraclelinux7:~# ls -ltr docker-images/
	total 16
	-rw-r----- 1 root root 4435 Aug 22 12:07 CONTRIBUTING.md
	-rw-r----- 1 root root  430 Aug 22 12:07 CODEOWNERS
	drwxr-x--- 4 root root   65 Aug 22 12:07 ContainerCloud
	drwxr-x--- 3 root root   41 Aug 22 12:07 GraalVM
	drwxr-x--- 8 root root   94 Aug 22 12:07 GlassFish
	drwxr-x--- 2 root root    6 Aug 22 12:07 MySQL
	drwxr-x--- 8 root root  134 Aug 22 12:07 NoSQL
	drwxr-x--- 3 root root   70 Aug 22 12:07 OracleBI
	drwxr-x--- 5 root root  127 Aug 22 12:07 OpenJDK
	drwxr-x--- 4 root root   81 Aug 22 12:07 OracleCoherence
	drwxr-x--- 3 root root   54 Aug 22 12:07 OracleDataIntegrator
	drwxr-x--- 5 root root  113 Aug 22 12:07 OracleDatabase
	drwxr-x--- 3 root root   54 Aug 22 12:07 OracleFMWInfrastructure
	drwxr-x--- 3 root root   70 Aug 22 12:07 OracleHTTPServer
	drwxr-x--- 4 root root   56 Aug 22 12:07 OracleJava
	drwxr-x--- 3 root root   40 Aug 22 12:07 OracleInstantClient
	drwxr-x--- 4 root root  100 Aug 22 12:07 OracleSOASuite
	drwxr-x--- 4 root root   74 Aug 22 12:07 OracleTuxedo
	drwxr-x--- 5 root root  100 Aug 22 12:07 OracleWebLogic
	-rw-r----- 1 root root 1671 Aug 22 12:07 README.md
	root@oraclelinux7:~# 
	
	
#### 下载DB12cR2

下载：

	http://www.oracle.com/technetwork/database/enterprise-edition/downloads/oracle12c-linux-12201-3608234.html

#### git 下载docker-images

下载：(备注代理设置自行biadu/google解决，大概需要设置/etc/yum.conf,/etc/resolv.conf, .bashrc代理变量设置等)

	root@oraclelinux7:/vagrant/workspaces/docker-images# cd OracleDatabase/
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase# ls 
	COPYRIGHT  dockerfiles  LICENSE  README.md  samples  tests
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase# cd dockerfiles/
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# pwd
	/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# ls 
	11.2.0.2  12.1.0.2  12.2.0.1  buildDockerImage.sh
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# 

拷贝安装文件linuxx64_12201_database.zip 到dockerfiles目录下
	
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles/12.2.0.1# ls 
	checkDBStatus.sh  Checksum.ee   createDB.sh    db_inst.rsp    Dockerfile.se2        linuxx64_12201_database.zip  runUserScripts.sh  setupLinuxEnv.sh
	checkSpace.sh     Checksum.se2  dbca.rsp.tmpl  Dockerfile.ee  installDBBinaries.sh  runOracle.sh                 setPassword.sh     startDB.sh
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles/12.2.0.1# 
	
Docker 代理设置：

> [2.3 Configuring Proxy Requirements](https://docs.oracle.com/cd/E52668_01/E87205/html/docker_install_upgrade_proxy.html)

### Docker Dtabase 12cR2 Image的安装

#### 启动docker

命令如下

	# systemctl start docker
	# systemctl enable docker

	root@oraclelinux7:~# systemctl start docker
	root@oraclelinux7:~# systemctl enable docker
	Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
	root@oraclelinux7:~# 

	
#### 启动后确认

命令如下
	
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# docker version
	Client:
	 Version:      17.03.1-ce
	 API version:  1.27
	 Go version:   go1.7.5
	 Git commit:   276fd32
	 Built:        Fri Jun 23 20:13:39 2017
	 OS/Arch:      linux/amd64
	Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# systemctl start docker                                                                                                                                       
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# systemctl enable docker
	Created symlink from /etc/systemd/system/multi-user.target.wants/docker.service to /usr/lib/systemd/system/docker.service.
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# docker version
	Client:
	 Version:      17.03.1-ce
	 API version:  1.27
	 Go version:   go1.7.5
	 Git commit:   276fd32
	 Built:        Fri Jun 23 20:13:39 2017
	 OS/Arch:      linux/amd64

	Server:
	 Version:      17.03.1-ce
	 API version:  1.27 (minimum version 1.12)
	 Go version:   go1.7.5
	 Git commit:   276fd32
	 Built:        Fri Jun 23 20:13:39 2017
	 OS/Arch:      linux/amd64
	 Experimental: false
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# 
	
	
#### 脚本安装docker images

最耗费时间的一步，通过脚本构建image

	$ ./buildDockerImage.sh -h

	Usage: buildDockerImage.sh -v [version] [-e | -s | -x] [-i] [-o] [Docker build option]
	Builds a Docker Image for Oracle Database.

	Parameters:
	   -v: version to build
		   Choose one of: 11.2.0.2  12.1.0.2  12.2.0.1
	   -e: creates image based on 'Enterprise Edition'
	   -s: creates image based on 'Standard Edition 2'
	   -x: creates image based on 'Express Edition'
	   -i: ignores the MD5 checksums
	   -o: passes on Docker build option

	* select one edition only: -e, -s, or -x

	LICENSE CDDL 1.0 + GPL 2.0

	Copyright (c) 2014-2017 Oracle and/or its affiliates. All rights reserved.
	$ 

	
##### 构建脚本

	# ./buildDockerImage.sh -v 12.2.0.1 -e

	
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# pwd
	/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# ls 
	11.2.0.2  12.1.0.2  12.2.0.1  buildDockerImage.sh
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# ./buildDockerImage.sh -v 12.2.0.1 -e
	Checking if required packages are present and valid...
	~~~ 省略 ~~~
	

	Checking Temp space: must be greater than 500 MB.   Actual 21595 MB    Passed
	Checking swap space: must be greater than 150 MB.   Actual 2047 MB    Passed
	Preparing to launch Oracle Universal Installer from /tmp/OraInstall2017-08-23_04-01-24AM. Please wait ...[WARNING] [INS-32055] The Central Inventory is located in the Oracle base.
	   ACTION: Oracle recommends placing this Central Inventory in a location outside the Oracle base directory.
	You can find the log of this install session at:
	 /opt/oracle/oraInventory/logs/installActions2017-08-23_04-01-24AM.log

	The installation of Oracle Database 12c was successful.
	Please check '/opt/oracle/oraInventory/logs/silentInstall2017-08-23_04-01-24AM.log' for more details.

	As a root user, execute the following script(s):
			1. /opt/oracle/oraInventory/orainstRoot.sh
			2. /opt/oracle/product/12.2.0.1/dbhome_1/root.sh



	Successfully Setup Software.

	~~~ 省略 ~~~
	
	Changing groupname of /opt/oracle/oraInventory to dba.
	The execution of the script is complete.
	Check /opt/oracle/product/12.2.0.1/dbhome_1/install/root_fd6fa6fd2f2c_2017-08-23_04-28-53-658776916.log for the output of root script
	 ---> 230ba7344d6c
	Removing intermediate container 94a6ddcf3aff
	Step 12/16 : USER oracle
	 ---> Running in a0b8e4160c59
	 ---> 9af4532c49e2
	Removing intermediate container a0b8e4160c59
	Step 13/16 : WORKDIR /home/oracle
	 ---> ef531098bd27
	Removing intermediate container 6cacb5abbd0d
	Step 14/16 : VOLUME $ORACLE_BASE/oradata
	 ---> Running in d96237ff953d
	 ---> c47b4fd44b85
	Removing intermediate container d96237ff953d
	Step 15/16 : EXPOSE 1521 5500
	 ---> Running in 13b230c3e215
	 ---> 8f34299ce96a
	Removing intermediate container 13b230c3e215
	Step 16/16 : CMD exec $ORACLE_BASE/$RUN_FILE
	 ---> Running in 0c933b7d4990
	 ---> ffd588858327
	Removing intermediate container 0c933b7d4990
	Successfully built ffd588858327

	  Oracle Database Docker Image for 'ee' version 12.2.0.1 is ready to be extended: 
		
		--> oracle/database:12.2.0.1-ee

	  Build completed in 3071 seconds.
	  
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles#
	

	时间比较久，我这次花了 3071 秒。
	

#### 查看docker的image

命令如下：

	# docker ps
	# docker images

	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# docker ps
	CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles# docker images
	REPOSITORY          TAG                 IMAGE ID            CREATED              SIZE
	oracle/database     12.2.0.1-ee         ffd588858327        About a minute ago   13.2 GB
	oraclelinux         7-slim              c0feb50f7527        13 days ago          118 MB
	root@oraclelinux7:/vagrant/workspaces/docker-images/OracleDatabase/dockerfiles#	

如上可以看到image是13.2G，构建之前要充足考虑文件系统大小，另外安装过程也提示了swap的空间大小限制

	Checking Temp space: must be greater than 500 MB.
	Checking swap space: must be greater than 150 MB.	

#### 启动docker的DB

命令如下

> docker run -d -it --name dockerDB -p 1528:1521 -p 5508:5500 -e ORACLE_PWD=password oracle/database:12.2.0.1-ee

	root@oraclelinux7:~# docker run -d -it --name dockerDB -p 1528:1521 -p 5508:5500 -e ORACLE_PWD=password oracle/database:12.2.0.1-ee
	f334268950da74247ec21333ff18b93e6e1c7d23d205840a5bd3ce4fabe9cc27
	root@oraclelinux7:~# docker ps
	CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS              PORTS                                            NAMES
	f334268950da        oracle/database:12.2.0.1-ee   "/bin/sh -c 'exec ..."   8 seconds ago       Up 3 seconds        0.0.0.0:1528->1521/tcp, 0.0.0.0:5508->5500/tcp   dockerDB
	root@oraclelinux7:~# 

连接到dockerDB上

	root@oraclelinux7:~# docker exec -it dockerDB /bin/bash
	[oracle@f334268950da ~]$ ps -ef | grep smon
	oracle     485     1  0 04:43 ?        00:00:00 ora_smon_ORCLCDB                                                                                                                             
	oracle     556   533  0 04:44 ?        00:00:00 grep --color=auto smon                                                                                                                       
	[oracle@f334268950da ~]$
	[oracle@f334268950da ~]$ export ORACLE_SID=ORCLCDB
	[oracle@f334268950da ~]$ sqlplus / as sysdba

	SQL*Plus: Release 12.2.0.1.0 Production on Wed Aug 23 04:46:09 2017

	Copyright (c) 1982, 2016, Oracle.  All rights reserved.


	Connected to:
	Oracle Database 12c Enterprise Edition Release 12.2.0.1.0 - 64bit Production

	SQL>

如果ORCLCDB没启动的话通过设置变量之后，启动实例


	export ORACLE_HOME=/opt/oracle/product/12.2.0.1/dbhome_1
	export ORACLE_SID=ORCLCDB
	export PATH=$ORACLE_HOME/bin:$PATH


完工！docker操作命令参考其他文档。
	
~~~~ 2017/08/22 LinHong ~~~~




