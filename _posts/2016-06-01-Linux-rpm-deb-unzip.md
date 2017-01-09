---
layout: post
title: "[汇总]Linux环境的解压方法汇总（包括rpm和deb文件）"
date:   2016-06-01 10:35:00
category: Unix
tags: Unix tar 
---

* content
{:toc}


---

Redhat下碰到deb文件的解压缩问题。压缩解压命令有那些常用命令在linux环境下使用呢？





来源于互联网：

### Linux环境的解压方法汇总（包括rpm和deb文件）


#### 1.以.a为扩展名的文件:

	#tar xv file.a

#### 2.以.z为扩展名的文件:

	#uncompress file.Z


#### 3.以.gz为扩展名的文件:

	#gunzip file.gz
 

#### 4.以.bz2为扩展名的文件:

	#bunzip2 file.bz2
 

#### 5.以.tar.Z为扩展名的文件:

	#tar xvZf file.tar.Z

或 
	#compress -dc file.tar.Z | tar xvf

 
#### 6.以.tar.gz/.tgz为扩展名的文件:

	#tar xvzf file.tar.gz

或 
	gzip -dc file.tar.gz | tar xvf -

 

#### 7.以.tar.bz2为扩展名的文件:

	#tar xvIf file.tar.bz2

或 
	bzip2 -dc file.tar.bz2 | xvf –

 

#### 8.以.cpio.gz/.cgz为扩展名的文件:

	#gzip -dc file.cgz | cpio -div

#### 9.以.cpio/cpio为扩展名的文件:

	#cpio -div file.cpio

或
	cpio -divc file.cpio

 
#### 10.以.rpm为扩展名的文件安装:

	#rpm -i file.rpm

 
#### 11.以.rpm为扩展名的文件解压缩：

	#rpm2cpio file.rpm | cpio -div

 

#### 12.以.deb为扩展名的文件安装：

	#dpkg -i file.deb

 

#### 13.以.deb为扩展名的文件解压缩:

	#dpkg-deb --fsys-tarfile file.deb | tar xvf - ar p	

	file.deb data.tar.gz | tar xvzf –

 

#### 14.以.zip为扩展名的文件:

	#unzip file.zip


#### 15.在linux下解压Winzip格式的文件：

要是装了jdk的话，可以用jar命令；还可以使用unzip命令。

 
#### 16.直接解压.tar.gz文件：

xxxx.tar.gz文件使用tar带zxvf参数，可以一次解压开。XXXX为文件名。 

例如：
	$tar zxvf xxxx.tar.gz 各种压缩文件的解压（安装方法）

 

#### 17.文件扩展名解压（安装方法）：

	.a ar xv file.a
	.Z uncompress file.Z
	.gz gunzip file.gz
	.bz2 bunzip2 file.bz2
	.tar.Z tar xvZf file.tar.Z
	compress -dc file.tar.Z | tar xvf -
	.tar.gz/.tgz tar xvzf file.tar.gz
	gzip -dc file.tar.gz | tar xvf -
	.tar.bz2 tar xvIf file.tar.bz2
	bzip2 -dc file.tar.bz2 | xvf -
	.cpio.gz/.cgz gzip -dc file.cgz | cpio -div
	.cpio/cpio cpio -div file.cpio
	cpio -divc file.cpio
	.rpm/install rpm -i file.rpm
	.rpm/extract rpm2cpio file.rpm | cpio -div
	.deb/install dpkg -i file.deb
	.deb/exrtact dpkg-deb --fsys-tarfile file.deb | tar xvf -
	ar p file.deb data.tar.gz | tar xvzf -
	.zip unzip file.zip

	bzip2 -d myfile.tar.bz2 | tar xvf

#### 18.tar xvfz myfile.tar.bz2

	x 是解压
	v 是复杂输出
	f 是指定文件
	z gz格式

#### 19.gzip

gzip[选项]要压缩（或解压缩）的文件名

	-c将输出写到标准输出上，并保留原有文件。
	-d将压缩文件压缩。
	-l对每个压缩文件，显示下列字段：压缩文件的大小，未压缩文件的大小、压缩比、未压缩文件的名字
	-r递归式地查找指定目录并压缩或压缩其中的所有文件。
	-t测试压缩文件是正完整。
	-v对每一个压缩和解压缩的文件，显示其文件名和压缩比。
	-num-用指定的数字调整压缩的速度。

 
#### 20.举例：
	把/usr目录并包括它的子目录在内的全部文件做一备份，备份文件名为usr.tar
	tar cvf usr.tar /home
	把/usr 目录并包括它的子目录在内的全部文件做一备份并进行压缩，备份文件名是usr.tar.gz
	tar czvf usr.tar.gz /usr
	压缩一组文件，文件的后缀为tar.gz
	#tar cvf back.tar /back/
	#gzip -q back.tar
	or
	#tar cvfz back.tar.gz /back/
	释放一个后缀为tar.gz的文件。
	#tar zxvf back.tar.gz
	#gzip back.tar.gz
	#tar xvf back.tar



---

