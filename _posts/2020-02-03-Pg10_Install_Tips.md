---
layout: post
title: "Centos 7.6 + Postgresql 10 Install Tips"
category: Postgresql
tags: Centos Postgres Postgresql Tips 
---

* content
{:toc}

Centos 7.6 + Postgresql 10 Install Tips

PostgreSQL安装

1.使用RPM

	一种操作系统自带的RPM安装(版本过于旧)
	一种从官方网站获取的RPM仓库安装

2.采用源码编译安装


### 源码安装

#### 准备工作

操作系统: RHEL7.6

[Centos7.7](http://mirrors.huaweicloud.com/centos/7.7.1908/isos/x86_64/CentOS-7-x86_64-DVD-1908.iso)

建议使用网易,华为，阿里云，清华等国内镜像站点

配置操作系统环境的参考文档

[selinux设置](https://www.cnblogs.com/tdcqma/p/5671299.html)

[hostname更改](https://www.cnblogs.com/zhangjiahao/p/10990093.html)

[PG 安装常见Issue](https://my.oschina.net/tashi/blog/189351)

下载PG 10.11源码 [PG 10](https://ftp.postgresql.org/pub/source/v10.11/)

虚拟环境配置

	网卡:两个
	网卡一:对外提供服务 hostonly
	网卡二:内部使用(NAT)

	CPU:越多越好
	内存:越大越好(禁用大页)
	修改IO调度算法:/etc/grub.conf 
	关闭SWAP交换空间:swapness


配置YUM源

	cd /etc/yum.repos.d/
	vi huawei.repo
	
	[CentOS]
	name=huawei
	baseurl=https://mirrors.huaweicloud.com/centos/7.7.1908/os/x86_64/
	enabled=1
	gpgcheck=0
	
	[epel]
	name=epel
	baseurl=https://mirrors.huaweicloud.com/epel/7Server/x86_64/
	enabled=1
	gpgcheck=0
	
	[Centos-Altarch]
	name=altarch
	baseurl=https://mirrors.huaweicloud.com/centos-altarch/7.7.1908/os/i386/
	enabled=1
	gpgcheck=0
	
	编辑后:
	
	yum clean all
	yum repolist
	

配置内核参数
	
	/etc/sysctl.conf 或者 /usr/lib/sysctl.d/ 编辑一个自定义文件

配置资源限制:软限制和硬限制(最大进程数/内存大小等)

	/etc/security/limits.conf

新建用户postgres

	useradd postgres
	
	另外更改postgres用户的宿主目录，通过下面步骤：
	查看uid
	id postgres，得到uid为2006
    sudo usermod -d /home/postgres -u 10086 postgres

#### pgsql 10 环境要求

	make 版本 3.80以上
	make --version
		
	gcc版本推荐最新
	gcc --version
		
	tar gzip  bzip2
	源代码是使用 tar 和gzip | bzip2 打包压缩的，所以在需要解压的时候用到这些命令

	如果下载的是bz2软件包使用下面命令解压
		tar -jxvf postgresql-10.11.tar.bz2
		
	如果下载的是gz结尾的软件包，使用下面命令
		tar -zxvf postgresql-10.11.tar.bz2

	进入到解压包目录

#### pgsql 10 编译

编译不通过，是因为依赖包不全，需要逐步安装

参考 Centos7.7 postgres10.11源码编译相对于的安装必要依赖包

``` shell	
	yum install -y \
	libicu-devel.x86_64 \
	icu.x86_64 \
	tcl.x86_64 \
	tcl-devel.x86_64 \
	perl-ExtUtils-Embed.noarch \
	readline-devel.x86_64 \
	zlib-devel \
	openssl-devel \
	pam-devel.x86_64 \
	libxml2 \
	libxml2-devel \
	libxslt-devel \
	zlib-devel \
	openldap-devel.x86_64 \
```

		
进入源码目录，进行配置编译		
		
``` shell
		
	./configure \
	--prefix=/data/pgsql10/ \
	--bindir=/data/pgsql10/bin \
	--sysconfdir=/data/pgsql10/etc \
	--libdir=/data/pgsql10/lib \
	--includedir=/data/pgsql10/include \
	--datarootdir=/data/pgsql10/share/ \
	--datadir=/data/pgsql10/share/ \
	--localedir=/data/pgsql10/share/locale \
	--mandir=/data/pgsql10/share/man \
	--docdir=/data/pgsql10/share/doc \
	--htmldir=/data/pgsql10/share/html \
	--enable-nls \
	--with-pgport=5432 \
	--with-perl \
	--with-python \
	--with-tcl \
	--with-icu \
	--with-openssl \
	--with-pam \
	--with-ldap \
	--with-readline \
	--with-libxml \
	--with-libxslt \
	--with-blocksize=8 \
	--with-wal-segsize=16 \
	--with-wal-blocksize=8 \
	--with-zlib \

```

进行最后的make

	export COPT='-Werror'
	make 
	make install-world

#### postgres 用户配置


配置postgres用户环境变量,编辑 .bash_profile , 追加下面变量

	export LD_LIBRARY_PATH=/data/pgsql10/lib
	export PATH=/data/pgsql10/bin:/usr/bin:/usr/sbin:/sbin:$PATH
	export MANPATH=/data/pgsql10/share/man/:$MANPATH
	
创建数据目录

	mkdir /data/pgsql10/pgdata
	
初始化数据目录

	initdb  -D /data/pgsql10/pgdata
	
启动数据库

	pg_ctl start -D /data/pgsql10/pgdata -l /tmp/logfile

启动数据库	
	
	pg_ctl stop -D /data/pgsql10/pgdata

连接数据库
	
	[postgres@pg10 ~]$ psql -U postgres -d postgres -h 10.0.3.13 -p 5432
	psql: could not connect to server: Connection refused
	Is the server running on host "10.0.3.13" and accepting
	TCP/IP connections on port 5432?		

	10.0.3.13 从 ip addr 中获取服务器的ip地址
	
涉及到两个文件
pg_hba.conf(配置允许那些指定的IP连接进来)
postgresql.conf (数据库服务器的参数和监听)
	
给pg_hba.conf 文件中添加：

	 host	all		all		192.168.1.0/24		md5

配置postgresql.conf 文件

	listen_addresses='10.0.3.13'

查看数据库端口是否正常启动

	[postgres@pg10 ~]$ netstat -nalp | grep 5432
	(Not all processes could be identified, non-owned process info
	will not be shown, you would have to be root to see it all.)
	tcp        0      0 127.0.0.1:5432          0.0.0.0:*               LISTEN      57348/postgres      
	tcp6       0      0 ::1:5432                :::*                    LISTEN      57348/postgres      
	unix  2      [ ACC ]     STREAM     LISTENING     93421    57348/postgres       /tmp/.s.PGSQL.5432

	netstat命令可以通过 yum install net-tools -y 来安装
	
#### 参考文档

[PG 10 安装官网](https://www.postgresql.org/docs/10/installation.html)



```
Have a good work&life! 2020/02 via LinHong


