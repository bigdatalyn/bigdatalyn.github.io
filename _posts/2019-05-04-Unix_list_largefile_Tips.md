---
layout: post
title: "Linux/Unix list large file Tips"
category: Unix
tags: Unix ADW Tips
---

* content
{:toc}

Linux/Unix list large file Tips

查找linux环境某目录下大文件相关命令



#### 命令1： 

	ls -lhS XXXX

#### 命令2： 

	ls -l XXX | sort -nr -k5

#### 命令3： 

	ls -la $(find XXXX -type f) | sort -nr -k5

#### 命令4： 

	ls -la $(find XXXX -type f) | sort -nr -k5 | head -10

#### 命令5： 

	ls -la $(find XXXX -type f) | sort -nr -k5 | awk -F' ' '{for(i=9;i<NF;i++){printf("%s%s",$i,OFS=" ")}print $NF}'

#### 命令6： 

	du -ab XXXX | sort -nr



Have a good work&life! 2019/05 via LinHong



