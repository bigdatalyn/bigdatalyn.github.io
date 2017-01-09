---
layout: post
title: "ssh免密码资料汇总"
date:   2016-06-01 09:15:00
category: Unix
tags: Unix 
---

* content
{:toc}

ssh命令, 没有指定密码的参数. 以至于在脚本中使用ssh命令的时候, 必须手动输入密码, 才能继续执行. 这样使得脚本的自动化执行变得很差, 尤其当ssh对应的机器数很多的时候, 会令人抓狂.本文讲解了两种方式, 一种借助expect脚本, 一种借助sshpass来实现.





资料来源于互联网

---

个人测试：

# Creates a new ssh key, using the provided "my_scp_passwordless" as a label

Generating public/private rsa key pair.

	ssh-keygen -t rsa -b 4096 -C "my_scp_passwordless" -P "" -f ~/.ssh/id_rsa && ssh-copy-id -i -o StrictHostKeyChecking=no james@chefclient

*-t : 算法（也有dsa）

*-b : 位数

*-c : 标签 (常用邮箱或者其他id信息来做标签)

*-P : 密码 (空密码)

*-f : 密码文件保存到哪里 (默认也是这个目录：~/.ssh/id_rsa)

*StrictHostKeyChecking=no 不加这个第一次登录需要输入yes

	The authenticity of host 'chefclient (192.168.122.136)' can't be established.
	ECDSA key fingerprint is dc:0b:32:14:93:5b:f7:cd:3f:26:01:c5:49:59:d1:c5.
	Are you sure you want to continue connecting (yes/no)? yes


示例：

	[james@chef ~]$ rm -Rf /home/james/.ssh/
	[james@chef ~]$ ssh-keygen -t rsa -b 4096 -C "my_scp_passwordless" -P "" -f ~/.ssh/id_rsa && ssh-copy-id -i james@chefclient
	Generating public/private rsa key pair.
	Created directory '/home/james/.ssh'.
	Your identification has been saved in /home/james/.ssh/id_rsa.
	Your public key has been saved in /home/james/.ssh/id_rsa.pub.
	The key fingerprint is:
	eb:e0:d9:4f:31:a0:a7:7a:75:0c:03:03:09:78:80:df my_scp_passwordless
	The key's randomart image is:
	+--[ RSA 4096]----+
	|oo...o           |
	|o . . o          |
	| o .   o.        |
	|  . E  .o.       |
	|      . S+o      |
	|       o..oo     |
	|      o....      |
	|     o.= .       |
	|    ..o o..      |
	+-----------------+
	/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
	/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
	james@chefclient's password: 

	Number of key(s) added: 1

	Now try logging into the machine, with:   "ssh 'james@chefclient'"
	and check to make sure that only the key(s) you wanted were added.

	[james@chef ~]$ ssh james@chefclient
	Last failed login: Tue May  31 22:23:40 EDT 2016 from chef on ssh:notty
	There were 2 failed login attempts since the last successful login.
	Last login: Tue May  31 22:22:35 2016 from chef
	helloworld
	my name is abc.
	nice to meet you
	[james@chefclient ~]$ 



---

ssh免密码输入执行命令 

前言:

ssh命令, 没有指定密码的参数. 以至于在脚本中使用ssh命令的时候, 必须手动输入密码, 才能继续执行. 这样使得脚本的自动化执行变得很差, 尤其当ssh对应的机器数很多的时候, 会令人抓狂.本文讲解了两种方式, 一种借助expect脚本, 一种借助sshpass来实现.

*) 借助expect脚本来实现
1. expect不是系统自带的工具, 需要安装
	yum install expect -y

2. expect脚本的编写规则

	1. ［#!/usr/bin/expect]
	告知系统脚本里的代码使用那一个shell来执行。 
	注意：这一行需要在脚本的第一行。 
	2. ［set timeout <timeout>］ 
	基本上认识英文的都知道这是设置超时时间的，现在你只要记住他的计时单位是:秒. timeout -1 为永不超时
	3. ［spawn <command>］ 
	spawn是进入expect环境后才可以执行的expect内部命令, 主要给后续的命令加个壳, 用来传递交互指令.
	4. ［expect "<match_string>"］ 
	这里的expect也是expect的一个内部命令，请不要惊讶.
	5. ［send "<response_string>\r"］ 
	这里就是执行交互动作，与手工输入内容的动作等效。 
	温馨提示： 命令字符串结尾别忘记加上“\r”，如果出现异常等待的状态可以核查一下.
	6. ［interact］ 
	执行完成后保持交互状态，把控制权交给控制台, 若要退出,使用expect eof代替
	7. $argv 参数数组
	expect脚本可以接受从bash传递过来的参数.可以使用[lindex $argv n]获得，n从0开始，分别表示第一个,第二个,第三个....参数

简单例子:

	#! /usr/bin/expect

	spawn sudo apt-get install vim
	expect "password"
	send "<password>\r"
	expect eof

这样就可以避免输入sudo密码了

3. 案例编写

	#! /bin/bash

	function auto_ssh() {
	　　username_server="$1"
	　　password="$2"
	　　command="$3"

	　　ssh_warpper=" 
	　　　　spawn ssh -o StrictHostKeyChecking=no $username_server \"$command\"\n
	　　　　expect { 　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n
	　　　　　　-nocase \"password:\" {send \"$password\r\"} 　　　　　　　　　　　\n
	　　　　} 　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　\n
	　　　　expect eof 　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　 \n
	　　"
	　　echo -e $ssh_warpper | /usr/bin/expect
	}

	auto_ssh root@172.16.1.121 123456 "ifconfig eth0"

评注:
	ssh -o StrictHostKeyChecking=no 对首次登录的机器不进行检查, 避免了用户手动输入yes/no

	echo -e $ssh_warpper, -e参数对后续字符串, 打开转义支持开关.

*) sshpass的使用

官网地址: http://sourceforge.net/projects/sshpass/

1. 安装sshpass
	wget http://nchc.dl.sourceforge.net/project/sshpass/sshpass/1.05/sshpass-1.05.tar.gz
	tar zxvf sshpass-1.05.tar.gz
	cd sshpass-1.05
	./configure
	make && make install

2. sshpass命令的详解

3. sshpass简单示例

	sshpass -p <password> ssh <username>@<server_ip> "<command>"

---

Passwordless SSH Login[文章来源](http://www.cnblogs.com/tommyli/p/3770429.html)


Consider two machines A and B. We want to connect machine B from A over SSH. To do so we have to specify password every time we connect. Here, we can create a setup where SSHing can be done without the password prompt.  On connecting machine B from A, ssh won’t ask for password.
Overview of Setup

    Generate public and private encryption keys on machine A.
    Authorize machine A in machine B by appending the public key of A in the file authorized_keysof machine B.

That’s it! You can now access (SSH) machine B from A without specifying the password. B has been now authorized to access A without requiring the password.
Detailed Steps
Method 1

Login to machine A and execute the following command:

	ssh-keygen && ssh-copy-id -i user@B

The first command generates keys. It will ask for path of the keys and passphrase. Hit Enter key repeatedly to choose the default values.
The second command adds generated key to B. It will ask for password of user at machine B. And this would be the last time!

Method 2

Login to machine A.
Generate public and private keys like following:
	
	ssh-keygen -t dsa

It will ask for path of the keys and passphrase. Choose the default path and no password.
This will generate files id_dsa.pub and id_dsa in ~/.ssh
Browse for the above generated keys and copy the public key, that is id_dsa.pub, to the machine B.
Login to machine B.
Append the public key of A to the file authorized_keys:

	cat id_dsa.pub >> .ssh/authorized_keys

Note: Create the directory .ssh in your home if it doesn’t exist.
You can now delete id_dsa.pub from machine B if you want to.
Make sure of the permissions of the directory .ssh and the file authorized_keys are read-write only by the targetted user. Otherwise it might not work.
	
	chmod 700 .ssh
	chmod 600 .ssh/authorized_keys

Now go back to machine A and SSH machine B. It should not ask for the password.


[Use SSHPass to automate inputting password on password authentication. ](http://www.server-world.info/en/note?os=CentOS_7&p=ssh&f=7)

[1] Install SSHPass. 

	# install from EPEL

	[root@dlp ~]# yum --enablerepo=epel -y install sshpass 

[2] How to use SSHPass. 

	 # -p password : from argument

	[cent@dlp ~]$ sshpass -p password ssh 10.0.0.51 hostname

	node01.srv.world
	# -f file : from file

	[cent@dlp ~]$ echo 'password' > sshpass.txt

	[cent@dlp ~]$ chmod 600 sshpass.txt

	[cent@dlp ~]$ sshpass -f sshpass.txt ssh 10.0.0.51 hostname

	node01.srv.world
	# -e : from env variable

	[cent@dlp ~]$ export SSHPASS=password

	[cent@dlp ~]$ sshpass -e ssh 10.0.0.51 hostname

	node01.srv.world 

---

[sshpass-1.05-1.el7.rf.x86_64.rpm](https://pkgs.org/centos-7/repoforge-x86_64/sshpass-1.05-1.el7.rf.x86_64.rpm.html)

[How to configure Passwordless SSH login in Linux](http://www.linuxveda.com/2015/04/21/configure-passwordless-ssh-login-linux/)



---






