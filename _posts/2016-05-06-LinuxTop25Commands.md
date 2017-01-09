---
layout: post
title: "[原创]25个酷酷的Linux Shell命令"
date:   2016-05-06 13:36:00
category: Unix
tags: Unix Shell
---

* content
{:toc}

这个专门收集Shell命令的网站http://www.shell-fu.org，这个页面还列出了由网友评出的25条最热的命令。闲来无事，把它们译成了中文，供参考。其实，这些命令中有些看来已经失效，有些仅仅是好玩，还有些颇有危害，使用者务必慎重哦。





#### 25个酷酷的Linux Shell命令

这个专门收集Shell命令的网站http://www.shell-fu.org，这个页面还列出了由网友评出的25条最热的命令。闲来无事，把它们译成了中文，供参考。其实，这些命令中有些看来已经失效，有些仅仅是好玩，还有些颇有危害，使用者务必慎重哦。

 

##### No.1 [得票497]（第54号技巧）通过WEB共享当前的目录

	alias webshare='python -c "import SimpleHTTPServer;SimpleHTTPServer.test()"'

怎么才能把你电脑里的东西通过WEB分享给别人看呢？无须复制或上传，只要运行"webshare"这个命令，当前目录及其下面所有的东西都会通过8000端口的WEB服务器对外发布；按下control-c即可停止共享。

 

##### No.2 [得票390]（第46号技巧）使用展开表达式减少输入量

当你想复制一份文件的备份时，用下面的命令可以避免重复输入文件的名字。

	cp ReallyLongFileNameYouDontWantToTypeTwice{,.orig}

 

##### No.3 [得票290]（第26号技巧）使用 '!' 指代符

当你需要输入之前命令所采用的参数时，请用 '!*' 即可代表上一个命令所用的全部参数；如果你只想要第2个参数，可以用'!:2'；或者你想要最后一个参数，则可用'!$'。下面给的例子能直观地说明 '!' 指代符的用法。

	$ cd /home/user/foo

	cd: /home/user/foo: No such file or directory

	$ mkdir !*

	mkdir /home/user/foo


##### No.4 [得票244]（第107号技巧）还是关于’!’指代符

当你在尝试需要sudo才能执行的命令失败之后，是不是需要在sudo之后重新敲一遍原来的命令呢？答案是“否”，请使用'sudo !!'，参见下面的例子。

	> command_with_insufficient_permissions 
	Permission denied 
	> sudo !!

 

N##### No.5 [得票210]（第77号技巧）Bash fork炸弹

这个命令很危险，列在这里仅仅是让你了解一下它，请勿轻易尝试，后果自负哦～～

	$ :(){ :|:& };:

 

解释：

:()

定义一个名为 : 的函数 (无参数) 

{ :|:& };

这是一个函数：它调用自己并将结果传给相同的在后台运行的":"函数。 (递归调用) 以; 结束函数的定义。

:

调用上面的函数，开始毁灭世界吧。

##### No.6 [得票187]（第24号技巧）快速搜索历史命令

如果你想找到之前敲过的命令，还在用” grep ~/.bash_history”吗？或者不断按向上键(Up)翻找？用CTRL+r (或者在vi模式下按 '/' )，并输入你要查找的字串，是不是很快就能找到你要的命令？而且按下回车键（Enter）就能立即运行找到的命令。



##### No.7 [得票167]（第21号技巧）grep命令中将文件名前置

将文件名放在命令行的最前面，将搜索的内容放在行尾，这样可以更方便地编辑修改后者。

	$ </var/log/messages grep foo


	$ </var/log/messages grep bar


	$ </var/log/messages grep user1

 

##### 	No.8 [得票144]（第185号技巧）CDPATH

这是一个少有人知道并且常被忽视的变量。它提供给cd命令用以定位其执行的路径。合理地设置该变量，可以大大减少每天要敲入的字符数。
下面是一个例子。

	$ export CDPATH='.:~:/usr/local/apache/htdocs:/disk/backups'

现在，任何时候输入cd 命令，系统总是会查找定义并匹配在$CDPATH变量中的全部路径。
 


##### No.9 [得票104]（第275号技巧）将子目录按大小排序列出

这段代码会把当前目录下的所有文件和子目录列出，类似于du -sch ./* ，只不过输出是按各自所占磁盘空间由小到大排序的。 它有助于发现磁盘空间都被哪些文件吞掉了。


	du -sk ./* | sort -n | awk 'BEGIN{ pref[1]="K"; pref[2]="M"; pref[3]="G";} \
	{ total = total + $1; x = $1; y = 1; while( x > 1024 ) { x = (x + 1023)/1024; y++; } \
	printf("%g%s\t%s\n",int(x*10)/10,pref[y],$2); } END { y = 1; while( total > 1024 ) \
	{ total = (total + 1023)/1024; y++; } printf("Total: %g%s\n",int(total*10)/10,pref[y]); }'

 



##### No.10 [得票98]（第139号技巧）Bash快捷键

Ctrl-U – 将左边的内容剪切掉(到行首)
Ctrl-W - 将左边的词剪切掉（到空格或行首）
Ctrl-Y – 粘贴剪贴板中的内容
Ctrl-A – 光标移到行首
Ctrl-E – 光标移到行尾
 


##### No.11 [得票96]（第45号技巧）多个命令输出到同一个程序

例如，下面的命令将比较目录dir_1和dir_2中的文件的不同之处。

diff -u <(ls -c1 dir_1) <(ls -c1 dir_2) 
 
 

##### No.12 [得票93]（第4号技巧）创建完整的目录树

在mkdir命令中使用-p选项，可以将所有的父目录都创建出来。

mkdir -p tmp/a/b/c


##### No.13 [得票82]（第375号技巧）可以解压各类压缩文件的命令

	###   Handy Extract Program

	 

	extract () {

	    if [ -f $1 ] ; then

		case $1 in

		    *.tar.bz2)   tar xvjf $1        ;;

		    *.tar.gz)    tar xvzf $1     ;;

		    *.bz2)       bunzip2 $1       ;;

		    *.rar)       unrar x $1     ;;

		    *.gz)        gunzip $1     ;;

		    *.tar)       tar xvf $1        ;;

		    *.tbz2)      tar xvjf $1      ;;

		    *.tgz)       tar xvzf $1       ;;

		    *.zip)       unzip $1     ;;

		    *.Z)         uncompress $1  ;;

		    *.7z)        7z x $1    ;;

		    *)           echo "'$1' cannot be extracted via >extract<" ;;

		esac

	    else

		echo "'$1' is not a valid file"

	    fi

	}

 


##### No.14 [得票79]（第118号技巧）用ALT+.插入最后的参数

在bash （或其它使用 libreadline库的程序，例如mysql）中，按ALT+.将会插入上一行命令最后用到的参数。例如：
 

	 $ vim some/file.c 
	 $ svn commit 
 
（其实，按向上的Up键 也有同样的效果）
 


##### No.15 [得票78]（第267号技巧）远程网络重启

我猜那些需要管理远程机器的人总会遇到这样的糗事：无意或有意用命令关掉了机器的网卡设备，结果是正连着的SSH会话挂了；这才发现自己根本无法走到那台机器跟前操作，无计可施。下面这个例子就是一个典型的错误(以root身份执行) ： 

	ifconfig eth0 down; ifconfig eth0 inet 123.4.5.6; ifconfig eth0 up

第一个命令足以挂断会话，导致后续的命令都无法执行（也即：网卡eth0不会被设置新的IP地址、也不会再次启动）。 其实在这种情况下应该使用BASH自带的"disown" 命令，例如：

	(sleep 5; ifconfig eth0 inet 123.4.5.6; ifconfig eth0 up)& disown -h $! ; ifconfig eth0 down


这个例子中，先起一个与本会话无关的后台进程（即当前SSH会话挂断不会杀掉这个进程），这个任务会先休眠5秒钟（以便让网卡停止的命令先执行完）、再接下来配置网络及重启网卡。这个进程被disown的同时， 立即执行停止网卡设备的命令。 你可以保持新设置的IP地址不变来验证这组命令，大概5秒之后，原来的BASH终端界面会恢复响应，会话也会恢复。
 


##### No.16 [得票76]（第161号技巧）简单的密码生成器

	< /dev/urandom tr -dc A-Za-z0-9_ | head -c8


注意'tr'用来把不符合规则的字符剔除（上面的例子中，规则指定了保留大小写字母、数字及下划线）。后面的'head'命令指定了要生成的密码长度（这个例子中为8）。

 
 

##### No.17 [得票64]（第248号技巧）使用命名管道（FIFO）

如果想看另一个终端上的错误输出，只需把这些输出放到一个命名管道（FIFO）里，命令如下：

	$ mkfifo cmderror



	$ mycommand 2> cmderror

 

在其它终端里用下面的命令查看：

	$ tail -f cmderror

 


##### No.18 [得票54]（第871号技巧）忽略别名

在命令前加上'\'标记，可以使得系统忽略该命令的同名别名。例如，如果有一个'ls'命令的别名如下：

	alias ls='ls --color=auto'


如欲使用不带--color选项的ls命令，则可这样用：

	$ \ls

 


##### No.19 [得票53]（第232号技巧）删除文件名中包含特殊字符的文件

有些文件的名称中包含一些特殊字符(例如：^H^H^H) ，用一般的输入方式很难输入其文件名，要想删除也比较麻烦。这时，可以用"ls -il"命令找到其在文件系统中的inode编号，再用下面例子中的命令删除。

	$ ls –il

	12345 -rw-r--r--  1 user user    6 Jan 26 19:51 difficult.filename

	$ find . -inum 12345 | xargs rm



##### No.20 [得票50]（第33号技巧）wireshark（著名网络协议分析工具）太大，而netcat又太小

	mknod backpipe p; while nc -l -p 80 0<backpipe | tee -a inflow | \

	nc localhost 81 | tee -a outflow 1>backpipe; do echo \"restarting\"; done

在localhost:80上监听，转发给localhost:81，并记录输入输出流的日志，在连接挂掉时自动重启。
 


##### No.21 [得票45]（第5号技巧）&&

当且仅当前一个命令执行成功之后再执行第二个命令：

	cd tmp/a/b/c && tar xvf ~/archive.tar

 


##### No.22 [得票42]（第47号技巧）改变文件的扩展名

文件更名时直接将一组文件的名称中的X字串符替换成Y字串。

	$ rename 's/.html$/.php/' *.html


上面的命令将把当前目录中所有.html文件变成.php文件。
 
 

##### No.23 [得票42]（第78号技巧）使用ssh和tar进行网络远程复制

用ssh加tar命令可以把远端机器上的完整目录打包并复制到本地当前目录中。

	$ ssh <username@sourcehost> tar cf - -C <sourcedir> . | tar xvf -


举个例子，如果你在主机名为"apple"的远程机器上有个帐号名为"bsmith"，并打算把这个帐号目录下的东西全部复制到本地一台机器上，你可以先登录本地机器，然后用下面的命令：

	$ ssh bsmith@apple tar cf - -C /home/bsmith . | tar xvf -


这个技巧有个特别有用场合，就是你的远端机器上没有足够空间用来事先打出一个临时压缩包时。

 
 

##### No.24 [得票37]（第122号技巧）获得随机的《Futurama》对话

实际上这个小窍门已经失效了，不过描述一下它的实现还是很有意思。Futurama是1999年～2003年播出的美剧，一共5季，大概slashdot.org网站的维护者是其忠实的粉丝，它的每个HTTP响应的头部都会带上一段该剧的对话（随机抽取），有人就直接拿来用了。现在slashdot.org网站已经不再这样做了，所以这个有趣但基本没什么用的技巧也就失去其效用。

	curl -Is slashdot.org | egrep '^X-(F|B)' | cut -d \- -f 2

 


##### No.25 [得票30]（第205号技巧）将文件权限信息转换为八进制数字

通常我们用'ls -l'看到文件的权限信息都是如'drwxr-xr--' 这样的符号，下面的命令可以把这种符号转换为八进制数字： 

	$ls -l | sed -e 's/--x/1/g' -e 's/-w-/2/g' -e 's/-wx/3/g' -e 's/r--/4/g' \

	 -e 's/r-x/5/g' -e 's/rw-/6/g' -e 's/rwx/7/g' -e 's/---/0/g'

	 

	-755  1 jrl jrl  111943 2003-10-21 19:57 logscan

	-644  1 jrl jrl   35468 2003-11-23 16:13 htfoo

	-700  1 jrl jrl 3100672 2004-05-15 17:00 mutt

	-777  1 jrl jrl   41079 2005-04-21 13:02 setistats

	d755  2 jrl jrl      47 2007-10-26 14:41 rf

	-700  1 jrl jrl     104 2008-02-05 11:26 getc

 

为了更好地使用这个命令，可以为其生成一个别名（见No.18 -- 第871号技巧：忽略别名）



---

