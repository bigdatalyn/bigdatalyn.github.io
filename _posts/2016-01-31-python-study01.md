---
layout: post
title:  "[原创]Python学习-01"
date:   2016-01-31 10:06:05
description: "自学Python的一些lab学习例子"
categories: Python
excerpt: Python Study
tags: python学习 原创
---

* content
{:toc}

## 序



[Python学习资料](http://www.cnblogs.com/wupeiqi/category/675825.html)

---

#### 例子01.helloworld_01.py

代码：`helloworld_01.py`
	
	#!/usr/bin/env python
	# -*- coding: utf-8 -*-

	print "你好，世界"
	
结果：

	[lyn@myhost python]$ python helloworld_01.py 
	你好，世界
	[lyn@myhost python]$ 


"python解释器在加载 .py 文件中的代码时，会对内容进行编码（默认ascill），所以如上应该显示的告诉python解释器，用什么编码来执行源代码"

---
	
#### 例子02.InputArgs_02.py

代码：`InputArgs_02.py`
	
	#!/usr/bin/env python
	# -*- coding: utf-8 -*-
	
	import sys
	
	print sys.argv
	
结果：

	[lyn@myhost python]$ python InputArgs_02.py
	['InputArgs_02.py']
	[lyn@myhost python]$ python InputArgs_02.py a1 
	['InputArgs_02.py', 'a1']
	[lyn@myhost python]$ python InputArgs_02.py a1 a2
	['InputArgs_02.py', 'a1', 'a2']
	[lyn@myhost python]$ 


---
	
#### 例子03.InputPassword_03.py

代码：`InputPassword_03.py`
	
	#!/usr/bin/env python
	# -*- coding: utf-8 -*-
	
	import getpass
	 
	# 将用户输入的内容赋值给 name 变量
	pwd = getpass.getpass("请输入密码：")

	
结果：

	[lyn@myhost python]$ python InputPassword_03.py 
	请输入密码：
	mypassword
	[lyn@myhost python]$ 

---

#### 例子04.InputIfElse_04.py

代码：`InputIfElse_04.py`
	
	#!/usr/bin/env python
	# -*- coding: utf-8 -*-
	 
	import getpass
	 
	name = raw_input('请输入用户名：')
	pwd = getpass.getpass('请输入密码：')
	 
	if name == "bigdatalyn" and pwd == "mypassword":
		print "欢迎，bigdatalyn！"
	else:
		print "用户名和密码错误"
	
结果：

	[lyn@myhost python]$ python InputIfElse_04.py 
	请输入用户名：bigdatalyn
	请输入密码：
	欢迎，bigdatalyn！
	[lyn@myhost python]$ python InputIfElse_04.py 
	请输入用户名：bigdatalyn
	请输入密码：
	用户名和密码错误
	[lyn@myhost python]$ 
	
代码：`InputIfElse_04_01.py`
	
	#!/usr/bin/env python
	# -*- coding: utf-8 -*-
	 
	name = raw_input('请输入用户名：')
		 
	if name == "bigdatalyn":
		print "超级管理员"
	elif name == "alex":
		print "普通管理员"
	elif name == "tony":
		print "业务主管"
	else:
		print "普通用户"

结果：

	[lyn@myhost python]$ python InputIfElse_04_01.py 
	请输入用户名：bigdatalyn
	超级管理员
	[lyn@myhost python]$ python InputIfElse_04_01.py 
	请输入用户名：alex
	普通管理员
	[lyn@myhost python]$ python InputIfElse_04_01.py 
	请输入用户名：tony
	业务主管
	[lyn@myhost python]$ python InputIfElse_04_01.py 
	请输入用户名：whoami
	普通用户
	[lyn@myhost python]$ 


---

#### 例子03.InputPassword_03.py

代码：`InputPassword_03.py`
	
	#!/usr/bin/env python
	# -*- coding: utf-8 -*-

	print "你好，世界"
	
结果：

	[lyn@myhost python]$ python InputPassword_03.py 
	请输入密码：
	mypassword
	[lyn@myhost python]$ 

---

---

#### 例子03.InputPassword_03.py

代码：`InputPassword_03.py`
	
	#!/usr/bin/env python
	# -*- coding: utf-8 -*-

	print "你好，世界"
	
结果：

	[lyn@myhost python]$ python InputPassword_03.py 
	请输入密码：
	mypassword
	[lyn@myhost python]$ 

---




1.

当行注视：# 被注释内容

多行注释：""" 被注释内容 """

2.

执行Python代码时，如果导入了其他的 .py 文件，那么，执行过程中会自动生成一个与其同名的 .pyc 文件，该文件就是Python解释器编译之后产生的字节码。

ps：代码经过编译可以产生字节码；字节码通过反编译也可以得到代码。

3.

变量定义的规则：

    变量名只能是 字母、数字或下划线的任意组合
    变量名的第一个字符不能是数字
    以下关键字不能声明为变量名
    ['and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'exec', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'not', 'or', 'pass', 'print', 'raise', 'return', 'try', 'while', 'with', 'yield']

4.

print "i am %s " % name 

字符串是 %s;整数 %d;浮点数%f
	
----------------------------------------

Sat Jan 31 10:30:06 CST 2016

----------------- EOF ------------------