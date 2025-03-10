---
layout: post
title: "Unix Shell Tips"
category: Oracle
tags: Unix Shell Tips
---

* content
{:toc}

Unix Shell Tips







### 查看系统当中合法的shell

	cat /etc/shells

	[root@localhost ~]# cat /etc/shells
	/bin/sh
	/bin/bash
	/usr/bin/sh
	/usr/bin/bash
	/bin/ksh
	/bin/rksh
	[root@localhost ~]#

### 修改用户登录时使用的shell程序

	useradd lin
	chsh -s /bin/sh lin
	grep lin /etc/passwd
	
测试：

	[root@localhost ~]# useradd lin
	[root@localhost ~]# chsh -s /bin/sh lin
	Changing shell for lin.
	Shell changed.
	[root@localhost ~]# grep lin /etc/passwd
	lin:x:54322:54331::/home/lin:/bin/sh
	[root@localhost ~]#


### 用户的登录流程

所有用户：

	/etc/profile
	/etc/profile.d/*

当前用户的
	~/.bash_profile
	~/.bashrc
	/etc/bashrc （所有用户）

流程如下：

	/etc/profile start
	/etc/profile end

	~/.bash_profile start
	~/.bashrc start
	/etc/bashrc start

	/etc/bashrc end
	~/.bashrc end
	~/.bash_profile end

变量的设置、查看和取消 echo unset

	[lin@localhost ~]$ echo $test01

	[lin@localhost ~]$ test01=echotest
	[lin@localhost ~]$ echo $test01
	echotest
	[lin@localhost ~]$ unset test01
	[lin@localhost ~]$ echo $test01

	[lin@localhost ~]$

### 变量设定方式

变量设定方式	|	说明
${变量#关键词}	|	若变量内容从头开始的数据符合『关键词』,则将符合的最短数据删除
${变量##关键词} 	|	若变量内容从头开始的数据符合『关键词』,则将符合的最长数据删除
${变量%关键词} 	|	若变量内容从尾向前的数据符合『关键词』,则将符合的最短数据删除
${变量%%关键词}	|	若变量内容从尾向前的数据符合『关键词』,则将符合的最长数据删除
${变量/旧字符串/新字符串} 	|	若变量内容符合『旧字符串』则『第一个旧字符串会被新字符串替换』
${变量//旧字符串/新字符串}	|	若变量内容符合『旧字符串』则『全部的旧字符串会被新字符串替换』

	[lin@localhost ~]$ path=${PATH}
	[lin@localhost ~]$ echo $path
	/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/lin/.local/bin:/home/lin/bin
	[lin@localhost ~]$ path=/first/bin:${path}:/last/bin
	[lin@localhost ~]$ echo $path
	/first/bin:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/lin/.local/bin:/home/lin/bin:/last/bin
	[lin@localhost ~]$
	[lin@localhost ~]$ echo ${path#/first/bin:}
	/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/lin/.local/bin:/home/lin/bin:/last/bin
	[lin@localhost ~]$ echo ${path#/*/bin:}
	/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/lin/.local/bin:/home/lin/bin:/last/bin
	[lin@localhost ~]$ echo ${path##/*/bin:}
	/last/bin
	[lin@localhost ~]$
	[lin@localhost ~]$ echo ${path%:/last/bin}
	/first/bin:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/lin/.local/bin:/home/lin/bin
	[lin@localhost ~]$ echo ${path%%:/*/bin}
	/first/bin
	[lin@localhost ~]$
	[lin@localhost ~]$ echo ${path/bin/BIN}
	/first/BIN:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/home/lin/.local/bin:/home/lin/bin:/last/bin
	[lin@localhost ~]$ echo ${path//bin/BIN}
	/first/BIN:/usr/local/BIN:/BIN:/usr/BIN:/usr/local/sBIN:/usr/sBIN:/home/lin/.local/BIN:/home/lin/BIN:/last/BIN
	[lin@localhost ~]$

### 变量

env | 列出目前shell环境下的所有全局变量
set | 查看所有变量，包括环境变量和局部变量


read	从键盘读取数据存入变量

	read -p "plz input yourname:" -t 30 name 按下回车输入变量name的值，会等待30s结束

### 数组
	
array

数组的设定	

	A[0]=1;A[1]=2;A[2]=3
	A=(1 2 3)
	A=(1 2 3 [50]=4)
	A=(1 2 3 [50]=4 5)
	
数组的读取	

	echo ${A[0]}
	echo ${A[@]}
	echo ${A[*]}
	
* 代表的是一次取出所有的值 ,@ 代表依次取值

	for i in "${A[@]}";do echo $i;done
	for i in "${A[*]}";do echo $i;done

测试:

	[lin@localhost ~]$ A[0]=1;A[1]=2;A[2]=3
	[lin@localhost ~]$ echo ${A[0]}
	1
	[lin@localhost ~]$ echo ${A[4]}

	[lin@localhost ~]$ echo ${A[@]}
	1 2 3
	[lin@localhost ~]$ echo ${A[*]}
	1 2 3
	[lin@localhost ~]$
	[lin@localhost ~]$ for i in "${A[@]}";do echo $i;done
	1
	2
	3
	[lin@localhost ~]$ for i in "${A[*]}";do echo $i;done
	1 2 3
	[lin@localhost ~]$



declare
	declare 参数
	-a 将变量看成数组
	-i 将变量看成整数
	-r 使变量只读
	x=1
	y=2
	sum=$(($x+$y))

### 重定向

用法总结			

	1> :以覆盖的方法将『正确的数据』输出到指定的文件中；
	1>>:以追加的方法将『正确的数据』输出到指定的文件中；
	2> :以覆盖的方法将『错误的数据』输出到指定的文件中；
	2>>:以追加的方法将『错误的数据』输出到指定的文件中；

cat	从键盘读取数据存入文件

	cat > /tmp/catfile 以ctrl+d结束
	cat > /tmp/catfile < /tmp/passwd
	cat > /tmp/catfile	<< ENDF
	standard in
	ENDF===>结束提示符

### 命令执行的判断依据

CMD1 && CMD2 	如果前一个命令 (CMD1) 能够正确被执行 , 则执行后一个命令 (CMD2)
CMD1 || CMD2 	如果前一个命令 (CMD1) 被正确执行 , 则不执行后一个命令 (CMD2), 如果前一个命令(CMD1) 执行错误 , 则执行后一个命令 (CMD2).
CMD1 ; CMD2	命令之间没有关系，从第一个开始执行，不管是否正确执行都会去执行第二个命令

### 管道

#截取 grep cut

	[lin@localhost ~]$ head /etc/passwd
	root:x:0:0:root:/root:/bin/bash
	bin:x:1:1:bin:/bin:/sbin/nologin
	daemon:x:2:2:daemon:/sbin:/sbin/nologin
	adm:x:3:4:adm:/var/adm:/sbin/nologin
	lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
	sync:x:5:0:sync:/sbin:/bin/sync
	shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
	halt:x:7:0:halt:/sbin:/sbin/halt
	mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
	operator:x:11:0:operator:/root:/sbin/nologin
	[lin@localhost ~]$ head /etc/passwd | cut -d : -f 3
	0
	1
	2
	3
	4
	5
	6
	7
	8
	11
	[lin@localhost ~]$ head /etc/passwd | grep bash$
	root:x:0:0:root:/root:/bin/bash
	[lin@localhost ~]$

#排序 sort uniq

	[lin@localhost ~]$ head /etc/passwd
	root:x:0:0:root:/root:/bin/bash
	bin:x:1:1:bin:/bin:/sbin/nologin
	daemon:x:2:2:daemon:/sbin:/sbin/nologin
	adm:x:3:4:adm:/var/adm:/sbin/nologin
	lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
	sync:x:5:0:sync:/sbin:/bin/sync
	shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
	halt:x:7:0:halt:/sbin:/sbin/halt
	mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
	operator:x:11:0:operator:/root:/sbin/nologin
	[lin@localhost ~]$ head /etc/passwd | sort -t: -k3 -n
	root:x:0:0:root:/root:/bin/bash
	bin:x:1:1:bin:/bin:/sbin/nologin
	daemon:x:2:2:daemon:/sbin:/sbin/nologin
	adm:x:3:4:adm:/var/adm:/sbin/nologin
	lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
	sync:x:5:0:sync:/sbin:/bin/sync
	shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
	halt:x:7:0:halt:/sbin:/sbin/halt
	mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
	operator:x:11:0:operator:/root:/sbin/nologin
	[lin@localhost ~]$ head /etc/passwd | sort -t: -k4 -n
	halt:x:7:0:halt:/sbin:/sbin/halt
	operator:x:11:0:operator:/root:/sbin/nologin
	root:x:0:0:root:/root:/bin/bash
	shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
	sync:x:5:0:sync:/sbin:/bin/sync
	bin:x:1:1:bin:/bin:/sbin/nologin
	daemon:x:2:2:daemon:/sbin:/sbin/nologin
	adm:x:3:4:adm:/var/adm:/sbin/nologin
	lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
	mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
	[lin@localhost ~]$

#统计 wc

	[lin@localhost ~]$ wc -l /etc/passwd
	25 /etc/passwd
	[lin@localhost ~]$

### shell 脚本

	1> 魔法字符 “ #! ”: 出现在脚本第一行 , 用于定义命令解释器。
	2> “ # ” 号开头的行 : 除了第一行的魔法字符以外 , 其他以 ” # “ 号开头 的行是注示。这些行不会被运行 , 只是给人阅读使用。
	3> 系统命令 :shell 脚本中运行解释的系统命令。
	4> 变量 : 脚本运行过程中某些反复调用的值的暂存地。
	5> 流程控制语句 : 判断 , 循环 , 跳转等流程控制。
	6> bash 脚本名称 bash -x 以调试模式来运行脚本
	7> ./ 脚本名称 --> 需要对脚本有可执行的权限

#### 判断条件

test 判断 man test 查看的相关的判断指令

  	数字的判断 	
	-gt 大于 	
	-ge 大于等于 	
	-lt 小于 	
	-le 小于等于 	
	-ne 不等于 	
	-eq 等于 	
	
	字符的判断 	
	-z 空 		
	=  字符相等 	
	!= 字符不相等 
	-n 非空 	
	-a 逻辑与
	-o 逻辑或
	
	文件的判断
	-d 文件是不是一个目录
	-f 是不是一个普通文件
		-e 文件是不是存在
		
注意 ：
* [ ] 括号两边有空格
* 判断符号两边有空格

	[lin@localhost ~]$ test 6 -gt 9
	[lin@localhost ~]$ echo $?
	1
	[lin@localhost ~]$ test 6 -gt 5
	[lin@localhost ~]$ echo $?
	0
	[lin@localhost ~]$

#### if 语法格式

	if condition	-->condition 指的是判断的条件
	then		
		CMD1	--> CMD1 指的是满足判断条件后执行的语句
	else
		CMD2	--> CMD2 指的是不满足判断条件执行的语句 then
	fi

	if condition
	then
		CMD1
	elif condition
		CMD2
	else
		CMD3
	fi

#### for 语法格式

	for 变量 in 取值范围
	do
		CMD
	done
	
	for i in {1..4}
	do
	  n=0
	  while [ "$n" -lt "$i" ]
	  do
	   echo -n " "
	   n=`expr $n + 1`
	  done
	  echo *
	done

	count=10
	for i in `seq 1 $count`
	do
	  for j in `seq 1 $(($i-1))`
	  do
		echo -n ' '
	  done
	  echo  '*'
	done

	[lin@localhost ~]$ count=10
	[lin@localhost ~]$ for i in `seq 1 $count`
	> do
	>   for j in `seq 1 $(($i-1))`
	>   do
	>     echo -n ' '
	>   done
	>   echo  '*'
	> done
	*
	 *
	  *
	   *
		*
		 *
		  *
		   *
			*
			 *
	[lin@localhost ~]$

	for i in `seq 1 9`
	do
	  for j in `seq 1 $i`
	  do
		echo -n "$i*$j=$(($i*$j)) "
	  done
	  echo
	done

	[lin@localhost ~]$ for i in `seq 1 9`
	> do
	>   for j in `seq 1 $i`
	>   do
	>     echo -n "$i*$j=$(($i*$j)) "
	>   done
	>   echo
	> done
	1*1=1
	2*1=2 2*2=4
	3*1=3 3*2=6 3*3=9
	4*1=4 4*2=8 4*3=12 4*4=16
	5*1=5 5*2=10 5*3=15 5*4=20 5*5=25
	6*1=6 6*2=12 6*3=18 6*4=24 6*5=30 6*6=36
	7*1=7 7*2=14 7*3=21 7*4=28 7*5=35 7*6=42 7*7=49
	8*1=8 8*2=16 8*3=24 8*4=32 8*5=40 8*6=48 8*7=56 8*8=64
	9*1=9 9*2=18 9*3=27 9*4=36 9*5=45 9*6=54 9*7=63 9*8=72 9*9=81
	[lin@localhost ~]$

#### while 语法格式

	while condition 指的是判断的条件
	do
		CMD
	done
	
数字的判断 	   
	-gt 大于 	
	-ge 大于等于
	-lt 小于 	
	-le 小于等于 	
	-ne 不等于 	
	-eq 等于 

字符的判断 
	-z 空 		
	=  字符相等 
	!= 字符不相等
	-n 非空 	
	-a 逻辑与
	-o 逻辑或

文件的判断
	-d 文件是不是一个目录
	-f 是不是一个普通文件
	-e 文件是不是存在

#### until 语法格式

until condition --> 不满足 condition, 则执行 cmd

	do
		CMD
	done

####

	[lin@localhost ~]$ cat cmd.sh
	#!/bin/bash

	SLEEP()
	{
	  sleep $1
	}

	DIR()
	{
	  ls -ld $1
	  ls -l $1
	}

	RM()
	{
	  rm -rf $1
	}

	case $1 in
	-t)
	  SLEEP $2;;
	-l)
	  DIR $2;;
	-r)
	  RM $2;;
	--help)
	  echo "Usage: ls [-t|-l|-r] name";;
	*)
	  echo "Usage: ls [-t|-l|-r] name";;
	esac


	[lin@localhost ~]$

### 正则表达式

特殊字符 	代表意义

	[:alnum:] | 代表英文大小写字符及数字 ,0-9, A-Z, a-z
	[:alpha:] | 代表任何英文大小写字符 , A-Z, a-z
	[:lower:] | 代表小写字符 , a-z
	[:upper:] | 代表大写字符 ,A-Z
	[:digit:] | 代表数字而已 , 0-9
	[:xdigit:] | 代表 16 进制数字 , 因此包括 : 0-9, A-F, a-f
	[:blank:] | 代表空格键和 [Tab] 按键
	[:space:] | 任何会产生空白的字符,包括空格键 , [Tab], CR 等等
	[:graph:] | 除了空格键 ( 空格键和 [Tab] ) 外的其他所有按键
	[:cntrl:] | 代表键盘上面的控制按键 , 包括 CR, LF, Tab, Del.. 等等
	[:print:] | 代表任何可以被打印出来的字符
	[:punct:] | 代表标点符号 (punctuation symbol) :" ' ? ! ; : # $...

非打印字符
非打印字符也可以是正则表达式的组成部分。下表列出了表示非打印字符的转义序列：

	字符 	描述
	\cx 	匹配由x指明的控制字符。例如， \cM 匹配一个 Control-M 或回车符。x 的值必须为 A-Z 或 a-z 之一。否则，将 c 视为一个原义的 'c' 字符。
	\f 	匹配一个换页符。等价于 \x0c 和 \cL。
	\n 	匹配一个换行符。等价于 \x0a 和 \cJ。
	\r 	匹配一个回车符。等价于 \x0d 和 \cM。
	\s 	匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。
	\S 	匹配任何非空白字符。等价于 [^ \f\n\r\t\v]。
	\t 	匹配一个制表符。等价于 \x09 和 \cI。
	\v 	匹配一个垂直制表符。等价于 \x0b 和 \cK

常见的正则表达式

	^ 	行首定位符
	$ 	行尾定位符
	. 	匹配除换行符之外的单个字符
	* 	匹配 0 个或多个前一字符
	? 	匹配 0 个或1个前一字符
	+	匹配 1 个或多个前一个字符
	[ ] 	匹配指定字符组内的任一字符
	[^] 	匹配不在指定字符组内的任一字符
	\< 	单词起始边界匹配符
	\> 	单词结束边界匹配符
	x\{m\}	连续 M 个字符 X
	x\{m,\} 至少 M 个字符 X
	x\{m,n\}至少 M 个最多 N 个字符 X

a开头字符串

	[lin@localhost ~]$ cat co.sh
	#!/bin/bash

	if [[ $1 =~ ^a  ]]
	then
	  echo OK
	else
	  echo NG
	fi
	[lin@localhost ~]$ ./co.sh aa
	OK
	[lin@localhost ~]$ ./co.sh ab
	OK
	[lin@localhost ~]$ ./co.sh ba
	NG
	[lin@localhost ~]$

if判断匹配ip地址

	#!/bin/bash
	if [[ $1 =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]
	then
		IP=(${1//\./ })
		[ ${IP[0]} -gt 0 -a ${IP[0]} -lt 255 ] && [ ${IP[1]} -ge 0 -a ${IP[1]} -lt 255 ] && [ ${IP[2]} -ge 0 -a ${IP[2]} -lt 255 ] && [ ${IP[3]} -gt 0 -a ${IP[3]} -lt 255 ] && echo ok || echo no
	else
			echo "this is not IPADDR!"
	fi

### sed/awk 

#### sed命令的原理

	读文件---一行一行读
	存入缓存空间
	匹配行---是---动作--继续读取
		 ---不是------ 继续读取    
	读到最后一行为止
	输出

#### sed命令的用法

	sed [-options] '[cmd]' filename
	sed [-options] '[哪些行][干什么]' filename


下载mysqlbinlog.row文件

	*打印第三行
	*打印1到5行
	*打印最后一行
	*打印30到最后一行
	*打印包含“BEGIN”的行
	*打印包含“COMMIT”的行
	*打印以“###”开头的行
	*删除每一行的“### ”
	*删除所有“/到/”
	*将“DELETE FROM”替换为“insert into”
	*将“INSERT INTO”替换为“delete from”
	*将“SET”替换为“where”
	*将“WHERE”替换为“set”
	*将“@1”替换为“id”
	*将“@2”替换为“name”


	[root@mysqlhost ~]# sed '3p' mysqlbinlog.row
	[root@mysqlhost ~]# sed -n '3p' mysqlbinlog.row
	[root@mysqlhost ~]# sed -n '1,5p' mysqlbinlog.row
	[root@mysqlhost ~]# sed -n '$p' mysqlbinlog.row
	[root@mysqlhost ~]# sed -n '30,$p' mysqlbinlog.row
	[root@mysqlhost ~]# sed -n '/BEGIN/p' mysqlbinlog.row
	[root@mysqlhost ~]# sed -n '/COMMIT/p' mysqlbinlog.row
	[root@mysqlhost ~]# sed '{s/### //;s@\/\*.*\*\/@@;s/DELETE FROM/insert into/;s/INSERT INTO/delete from/;s/SET/where/;s/WHERE/set/;s/@1/id/;s/@2/name/}' mysqlbinlog.row

#### 调用awk

有三种方式调用awk

* 命令行方式 awk [-F field-separator] 'commands' input-file(s)

其中，commands 是真正awk命令，[-F域分隔符]是可选的。 input-file(s) 是待处理的文件。

在awk中，文件的每一行中，由域分隔符分开的每一项称为一个域。通常，在不指名-F域分隔符的情况下，默认的域分隔符是空格。

* shell脚本方式

将所有的awk命令插入一个文件，并使awk程序可执行，然后awk命令解释器作为脚本的首行，一遍通过键入脚本名称来调用。

相当于shell脚本首行的：#!/bin/sh

可以换成：#!/bin/awk

* 将所有的awk命令插入一个单独文件，然后调用： awk -f awk-script-file input-file(s)

其中，-f选项加载awk-script-file中的awk脚本，input-file(s)跟上面的是一样的。

显示最近登录的5个帐号

	[lin@localhost ~]$ last -n 5 | awk '{print $1}'
	root
	reboot
	root
	root
	root

	wtmp
	[lin@localhost ~]$

显示账户和账户对应的shell,而账户与shell之间以tab键分割

	[lin@localhost ~]$ head /etc/passwd | awk -F ':' '{print $1"\t"$7}'
	root    /bin/bash
	bin     /sbin/nologin
	daemon  /sbin/nologin
	adm     /sbin/nologin
	lp      /sbin/nologin
	sync    /bin/sync
	shutdown        /sbin/shutdown
	halt    /sbin/halt
	mail    /sbin/nologin
	operator        /sbin/nologin
	[lin@localhost ~]$
	
awk工作流程是这样的：

先执行BEGING，然后读取文件，读入有/n换行符分割的一条记录，然后将记录按指定的域分隔符划分域，填充域，$0则表示所有域,$1表示第一个域,$n表示第n个域,随后开始执行模式所对应的动作action。接着开始读入第二条记录······直到所有的记录都读完，最后执行END操作。

	[lin@localhost ~]$ head /etc/passwd |awk  -F ':'  'BEGIN {print "name,shell"}  {print $1","$7} END {print "last,/bin/nosh"}'
	name,shell
	root,/bin/bash
	bin,/sbin/nologin
	daemon,/sbin/nologin
	adm,/sbin/nologin
	lp,/sbin/nologin
	sync,/bin/sync
	shutdown,/sbin/shutdown
	halt,/sbin/halt
	mail,/sbin/nologin
	operator,/sbin/nologin
	last,/bin/nosh
	[lin@localhost ~]$

awk内置变量

	ARGC               命令行参数个数
	ARGV               命令行参数排列
	ENVIRON            支持队列中系统环境变量的使用
	FILENAME           awk浏览的文件名
	FNR                浏览文件的记录数
	FS                 设置输入域分隔符，等价于命令行 -F选项
	NF                 浏览记录的域的个数
	NR                 已读的记录数
	OFS                输出域分隔符
	ORS                输出记录分隔符
	RS                 控制记录分隔符

	[lin@localhost ~]$  awk  -F ':'  '{print "filename:" FILENAME ",linenumber:" NR ",columns:" NF ",linecontent:"$0}' /etc/passwd | head
	filename:/etc/passwd,linenumber:1,columns:7,linecontent:root:x:0:0:root:/root:/bin/bash
	filename:/etc/passwd,linenumber:2,columns:7,linecontent:bin:x:1:1:bin:/bin:/sbin/nologin
	filename:/etc/passwd,linenumber:3,columns:7,linecontent:daemon:x:2:2:daemon:/sbin:/sbin/nologin
	filename:/etc/passwd,linenumber:4,columns:7,linecontent:adm:x:3:4:adm:/var/adm:/sbin/nologin
	filename:/etc/passwd,linenumber:5,columns:7,linecontent:lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
	filename:/etc/passwd,linenumber:6,columns:7,linecontent:sync:x:5:0:sync:/sbin:/bin/sync
	filename:/etc/passwd,linenumber:7,columns:7,linecontent:shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
	filename:/etc/passwd,linenumber:8,columns:7,linecontent:halt:x:7:0:halt:/sbin:/sbin/halt
	filename:/etc/passwd,linenumber:9,columns:7,linecontent:mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
	filename:/etc/passwd,linenumber:10,columns:7,linecontent:operator:x:11:0:operator:/root:/sbin/nologin
	[lin@localhost ~]$

下面统计/etc/passwd的账户人数

	awk '{count++;print $0;} END{print "user count is ", count}' /etc/passwd
	awk 'BEGIN {count=0;print "[start]user count is ", count} {count=count+1;print $0;} END{print "[end]user count is ", count}' /etc/passwd

统计某个文件夹下的文件占用的字节数

	ls -l |awk 'BEGIN {size=0;} {size=size+$5;} END{print "[end]size is ", size}'
	ls -l |awk 'BEGIN {size=0;} {size=size+$5;} END{print "[end]size is ", size/1024/1024,"M"}'

[The GNU Awk User’s Guide](http://www.gnu.org/software/gawk/manual/gawk.html)






	





	
Have a good work&life! 2019/07 via LinHong



