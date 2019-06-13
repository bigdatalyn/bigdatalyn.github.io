---
layout: post
title: "Linux Python3 Install Tips"
category: Python
tags: Unix Python Tips
---

* content
{:toc}

Linux Python3 Install Tips










###### Packages 

Prepare packages

	yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel 

Some errors in installing python3.7

> no acceptable C compiler found in $PATH

	yum install gcc

> ModuleNotFoundError: No module named '_ctypes'
> make: *** [install] Error 1

	yum install libffi-devel

### Download

[python package](https://www.python.org/downloads/)

	wget https://www.python.org/ftp/python/3.7.3/Python-3.7.3.tgz

### Unzip&make install


	mkdir -p /usr/local/python3

	tar -zxvf Python-3.x.x.tgz

	cd Python-3.6.1

	./configure --prefix=/usr/local/python3

	make && make install

Just like the following output in the end.

	Looking in links: /tmp/tmp__vokf9b
	Collecting setuptools
	Collecting pip
	Installing collected packages: setuptools, pip
	Successfully installed pip-19.0.3 setuptools-40.8.0
	[root@localhost Python-3.7.3]#

	ln -s /usr/local/python3/bin/python3 /usr/bin/python3


	 vi ~/.bash_profile
	 .bash_profile
	#Get the aliases and functions
	if [ -f ~/.bashrc ]; then
	. ~/.bashrc
	fi
	#User specific environment and startup programs
	PATH=$PATH:$HOME/bin:/usr/local/python3/bin
	export PATH

	source ~/.bash_profile
	python3 -V
	pip3 -V
	ln -s /usr/local/python3/bin/pip3 /usr/bin/pip3

	[root@localhost ~]# python3 -V
	Python 3.7.3
	[root@localhost ~]# pip3 -V
	pip 19.0.3 from /usr/local/python3/lib/python3.7/site-packages/pip (python 3.7)
	[root@localhost ~]#

	
	
Create default python link to the version which you want....Python2/Python3 

	[root@localhost ~]# cd /usr/bin
	[root@localhost bin]#
	[root@localhost bin]# rm python
	[root@localhost bin]# ln -s python3 python
	[root@localhost bin]# ls -tlr python*
	-rwxr-xr-x. 2 root root 11392 Aug 31  2018 python3.4m
	-rwxr-xr-x. 2 root root 11392 Aug 31  2018 python3.4
	-rwxr-xr-x. 1 root root  7216 Nov  1  2018 python2.7
	lrwxrwxrwx. 1 root root     9 Dec 31 20:11 python2 -> python2.7
	lrwxrwxrwx. 1 root root     9 Mar 14 03:57 python3.4.9 -> python3.4
	lrwxrwxrwx. 1 root root    30 Jun  5 03:28 python3 -> /usr/local/python3/bin/python3
	lrwxrwxrwx. 1 root root     7 Jun  5 03:31 python -> python3
	[root@localhost bin]#
	
	
### Install pip& setuptools

	wget --no-check-certificate  https://pypi.python.org/packages/source/s/setuptools/setuptools-19.6.tar.gz#md5=c607dd118eae682c44ed146367a17e26
	tar -zxvf setuptools-19.6.tar.gz
	cd setuptools-19.6
	python3 setup.py build
	python3 setup.py install
	
	wget --no-check-certificate  https://pypi.python.org/packages/source/p/pip/pip-8.0.2.tar.gz#md5=3a73c4188f8dbad6a1e6f6d44d117eeb
	tar -zxvf pip-8.0.2.tar.gz
	cd pip-8.0.2
	python3 setup.py build
	python3 setup.py install
	

	
Have a good work&life! 2019/06 via LinHong



