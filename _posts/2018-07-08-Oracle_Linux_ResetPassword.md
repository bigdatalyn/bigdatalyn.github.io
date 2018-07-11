---
layout: post
title: "Oracle Linux 7 Reset root password"
category: Oracle
tags: Oracle Linux Password
---

* content
{:toc}




Oracle Linux 7 Reset root password

Some tips ....

1.重启linux系统，在启动界面有3个选项，选择第二个，并敲击字母e键

2.找到linux16开头这一行，将光标移动到该行ro处

3.修改ro为rw init=sysroot/bin/sh，并敲击执行Ctrl+x

4.执行如下命令

	chroot sysroot
	passwd
	newpassword
	re-newpassword
	touch /.autorelabel
	exit
	reboot


![reboot]({{ "/files/Linux/reboot.png"}})

To be continue....

Have a good life! 2018/06 via LinHong


