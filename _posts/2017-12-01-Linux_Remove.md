---
layout: post
title: "[原创]Linux 删除大量文件报错-[Argument list too long] "
category: Unix
tags: Linux Python
---

* content
{:toc}


[原创]Linux 删除大量文件报错-[Argument list too long]

#### 背景

一个目录下面有上千上万个日志文件，通过通配符*匹配删除，碰到-[Argument list too long]错误。

如下

	$ls -lrt| wc -l
	 250,213
	$

大概有250k的文件个数，这个时候通过rm删除，报错

	$ rm *.env
	 ksh: rm: /bin/rm: cannot execute [Argument list too long]
	$ 

#### 解决

	通过变通方法删除,如下
		
	$find ./ -name "*.log" -delete



++++++++++++++++ EOF LinHong ++++++++++++++++	