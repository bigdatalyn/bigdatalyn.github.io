---
layout: post
title: "Unix中并发进程的控制"
date:   2016-05-27 11:35:00
category: Unix
tags: Unix Commands flock
---

* content
{:toc}

使用linux flock 文件锁实现任务锁定，解决冲突




### 如何限制同一时刻只允许一个脚本实例运行

#### 1.简单的方法：判断进程

用ps一类命令找出已经运行脚本的数量，如果大于等于2（自己本身进程），就退出当前脚本，等于1,则运行。

此方法的话，会有些问题：ps取脚本文件进程名称和数量会有误差，如有时无法ps到脚本文件的名称，或者ps到脚本名后，由于子shell的原因，在大多数平台下会得到奇怪的结果，有时得到数字a，有时又得到数字b等；

#### 2.常用方法：加锁文件

就是脚本在执行开始先试图得到一个“锁”，得到则继续执行，反之就退出。

通常，这样的进程会使用一个「锁文件」，也就是建立一个文件来告诉别的进程自己在运行，如果检测到那个文件存在则认为有操作同样数据的进程在工作。

这样的问题是，进程不小心意外死亡了，没有清理掉那个锁文件，那么只能由用户手动来清理了。

可能的一些加锁的“原子”操作有：

 * 1.创建目录(当一个进程创建成功后其它进程都会失败)

 * 2.符号链接(一个链接创建后其它进程的ln -s命令会出错)

 * 3.文件的写入(如首行的竞争，多个进程以append的方式同时写到文件，同一时间只能有一个进程写到了文件的第一行，因为不可能有两个第一行。)

 * 4.crontab的定时任务等其他

使用命令是 flock

格式：

	flock [-sxun][-w #] fd#

	flock [-sxon][-w #] file [-c] command

选项

	-s, --shared:    获得一个共享锁  
	-x, --exclusive: 获得一个独占锁  
	-u, --unlock:    移除一个锁，通常是不需要的，脚本执行完会自动丢弃锁  
	-n, --nonblock:  如果没有立即获得锁，直接失败而不是等待  
	-w, --timeout:   如果没有立即获得锁，等待指定时间  
	-o, --close:     在运行命令前关闭文件的描述符号。用于如果命令产生子进程时会不受锁的管控  
	-c, --command:   在shell中运行一个单独的命令  
	-h, --help       显示帮助  
	-V, --version:   显示版本  

flock 属于linux的util-linux包，不能使用flock，可以安装这package之后可以使用

[util-linux is a standard package of the Linux operating system.](https://en.wikipedia.org/wiki/Util-linux)


而最近研究chef中fackbook chef cookbook的fb_cron片段脚本：

/usr/local/bin/exclusive_crond.sh


	[root@chefclient ~]# cat /usr/local/bin/exclusive_cron.sh 
	#!/bin/bash

	if [ $# -lt 1 ] || [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
	  echo "Uses file locking to runs a single instance of a command "
	  echo "on a host at a time. Intended to stop cron job stampedes"
	  echo ""
	  echo "Usage: exclusive_cron.sh <lockfile path> <command to run>"
	  echo ""
	  echo "NOTE: Uses flock, so lockfiles must be on local storage" 
	  exit 1;
	fi

	LOCKFILE="${1}"
	shift 1
	COMMAND="$*"

	if [ -e "${LOCKFILE}" ] && [ ! -f "${LOCKFILE}" ]; then
	  echo "Lockfile ${LOCKFILE} exists, but is not a file"
	  exit 1;
	fi

	function on_exit() {
	  rm -f "${LOCKFILE}";
	}

	# FD200 is completely arbitrary
	(
	  if ! flock -x -w 0 200; then 
	    echo "Comand '${COMMAND}' with lockfile '${LOCKFILE}' is already running"
	    exit 1
	  fi
	  trap 'on_exit' EXIT
	  eval "${COMMAND}"
	) 200>"${LOCKFILE}"
	[root@chefclient ~]# 


使用示例：


	# do_chef_cron01
	* * * * * chef /usr/local/bin/exclusive_cron.sh /tmp/cron-do_chef_cron01.lock echo\ cron_chef_test01\ \>\>\ /tmp/test.chef.cron


	[root@chefclient ~]# cat /usr/local/bin/osx_make_crond.sh 
	#!/bin/bash
	# OS X doesn't support cron.d directories. It also doesn't have a stock
	# /etc/crontab -- so we fake it here.

	set -e

	# OS X also doesn't have a "tempfile" command...
	tempfile="/tmp/cron.d.$$"

	cat /etc/cron.d/* > "$tempfile"

	if ! diff "$tempfile" "/etc/crontab" > /dev/null 2> /dev/null
	then
	  echo "Installing new /etc/crontab"
	  mv -f "$tempfile" /etc/crontab
	else
	  rm -f "$tempfile"
	fi

	[root@chefclient ~]# 

技术点：

trap是一个shell内建命令，它用来在脚本中指定信号如何处理。比如，按Ctrl+C会使脚本终止执行，实际上系统发送了SIGINT信号给脚本进程，SIGINT信号的默认处理方式就是退出程序。如果要在Ctrl+C不退出程序，那么就得使用trap命令来指定一下SIGINT的处理方式了。trap命令不仅仅处理Linux信号，还能对脚本退出（EXIT）、调试（DEBUG）、错误（ERR）、返回（RETURN）等情况指定处理方式。

格式：trap "commands" EXIT

脚本退出时执行commands指定的命令。（If a sigspec is EXIT (0) the command arg is executed on exit from the shell.）

#### 参考资料

[trap 捉到某個signal時shell做的對應](http://www.study-area.org/programing/progfr1.htm)


[我使用过的Linux命令之trap - 在脚本中处理信号](http://codingstandards.iteye.com/blog/836588)


[通过文件锁 Lockfile/flock 让脚本单实例运行](http://my.oschina.net/leejun2005/blog/108656)


---

