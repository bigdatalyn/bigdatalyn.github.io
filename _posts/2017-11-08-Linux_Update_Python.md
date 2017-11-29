---
layout: post
title: "[原创]Linux更新python版本 "
category: Unix
tags: Linux Python
---

* content
{:toc}


[原创]Linux更新python版本 

Linux默认版本2.6，更新2.7版本的简单汇总











#### Step 1 – 安装 GCC

	# yum install gcc opensll-devel bzip2-devel

#### Step 2 – 下载

	# cd /usr/src

	# wget https://www.python.org/ftp/python/2.7.14/Python-2.7.14.tgz

#### Step 3 – 解压编译

	# chmod a+x Python-2.7.14.tgz

	# tar xzf Python-2.7.14.tgz

	# cd Python-2.7.14

	# ./configure --enable-optimizations

	# make altinstall

#### Step 4 – 检查版本

	# /usr/local/bin/python2.7 -V
										 
	# python -V

#### Step 5 – 安装pip

	# curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"

	# python2.7 get-pip.py





#### 默认python版本的指定：

	# cd /usr/bin

	# ls -l python*

	# mv python python.2.6.6                                                                           

	# ls -ltr /usr/local/bin/python2.7                                                                 

	# ln -s /usr/local/bin/python2.7 /usr/bin/python       
	
·	

#### 错误处理

描述：执行yum出错(更新python版本和yum冲突)

	There was a problem importing one of the Python modules
	required to run yum. The error leading to this problem was:

	   No module named yum

	Please install a package which provides this module, or
	verify that the module is installed correctly.

	It's possible that the above module doesn't match the
	current version of Python, which is:
	2.7.14 (default, Nov 27 2017, 21:30:20) 
	[GCC 4.4.7 20120313 (Red Hat 4.4.7-18)]

	If you cannot solve this problem yourself, please go to 
	the yum faq at:
	  http://yum.baseurl.org/wiki/Faq
	  


原因: 之前yum是用python2.6版本的，所以yum的命令脚本里面指定回2.6版本的python即可

解决如下:(声明指定：/usr/bin/python.2.6.6)


	# which yum
	/usr/bin/yum
	# cat /usr/bin/yum | head -5
	#!/usr/bin/python.2.6.6
	import sys
	try:
		import yum
	except ImportError:
	# 

++++++++++++++++ EOF LinHong ++++++++++++++++	