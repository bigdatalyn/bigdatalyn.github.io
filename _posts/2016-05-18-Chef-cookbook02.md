---
layout: post
title: "[原创]Chef Cookbook 02.创建文件"
date:   2016-05-18 11:35:00
category: Chef
tags: Chef Cookbook 
---

* content
{:toc}

Chef 的环境搭建不难，现在开始学习怎么写cookbook，比较常见的怎么让我们管理的node自动创建一个文件呢？




### workstation上创建:

	[root@workstation chef-repo]# pwd
	/root/chef-repo

#### 创建cookbook:

	[root@workstation chef-repo]# knife cookbook create file_create
	** Creating cookbook file_create in /root/chef-repo/cookbooks
	** Creating README for cookbook: file_create
	** Creating CHANGELOG for cookbook: file_create
	** Creating metadata for cookbook: file_create
	[root@workstation chef-repo]#

#### 添加recipe：

	[root@workstation chef-repo]# cd cookbooks
	[root@workstation cookbooks]# ll
	total 12
	drwxr-xr-x. 10 root root 4096 May 18 23:01 file_create
	drwxr-xr-x. 10 root root 4096 May 18 04:55 my-test-02
	-rw-r--r--.  1 root root 3064 May 13 05:30 README.md
	[root@workstation cookbooks]# cd file_create/recipes/
	[root@workstation recipes]# ls -ltr
	total 4
	-rw-r--r--. 1 root root 137 May 18 23:01 default.rb
	[root@workstation recipes]# cat default.rb 
	#
	# Cookbook Name:: file_create
	# Recipe:: default
	#
	# Copyright 2016, YOUR_COMPANY_NAME
	#
	# All rights reserved - Do Not Redistribute
	#
	[root@workstation recipes]# vi default.rb 
	[root@workstation recipes]# cat default.rb 
	#
	# Cookbook Name:: file_create
	# Recipe:: default
	#
	# Copyright 2016, YOUR_COMPANY_NAME
	#
	# All rights reserved - Do Not Redistribute
	# recipes/default.rb
	template "#{ENV['HOME']}/file-create-test01.txt" do
	  source 'file-create-test01.txt.erb' 
	  mode '0755'
	  owner 'root'
	  group 'root'
	end#
	[root@workstation recipes]

#### 添加模板：

	[root@workstation recipes]# cd ..
	[root@workstation file_create]# cd templates/
	[root@workstation templates]# ls -ltr
	total 0
	drwxr-xr-x. 2 root root 6 May 18 23:01 default
	[root@workstation templates]# vi file-create-test01.txt.erb
	[root@workstation templates]# ls -ltr
	total 4
	drwxr-xr-x. 2 root root   6 May 18 23:01 default
	-rw-r--r--. 1 root root 193 May 18 23:05 file-create-test01.txt.erb
	[root@workstation templates]# cat file-create-test01.txt.erb 
	<% # templates/default/hello-world.txt.erb %>
	Hello World!


	Chef Version: <%= node[:chef_packages][:chef][:version] %>
	Platform: <%= node[:platform] %>
	Version: <%= node[:platform_version] %>
	[root@workstation templates]# chmod 755 file-create-test01.txt.erb
	[root@workstation templates]# ll
	total 4
	drwxr-xr-x. 2 root root   6 May 18 23:01 default
	-rwxr-xr-x. 1 root root 193 May 18 23:05 file-create-test01.txt.erb
	[root@workstation templates]# 

#### 上传cookbook到chef server：

	[root@workstation templates]# knife cookbook upload 'file_create'
	Uploading file_create    [0.1.0]
	Uploaded 1 cookbook.
	[root@workstation templates]# 
	[root@workstation templates]# knife client list
	1stchef-validator
	chefclient.com
	workstation
	[root@workstation templates]# knife node list
	chefclient.com
	workstation
	[root@workstation templates]# knife node show chefclient.com
	Node Name:   chefclient.com
	Environment: _default
	FQDN:        chefclient
	IP:          192.168.122.136
	Run List:    recipe[my-test-02::test]
	Roles:       
	Recipes:     my-test-02::test
	Platform:    centos 7.2.1511
	Tags:        tags01

#### 将相应的cookbook添加到对应节点run_list

	[root@workstation templates]# knife node run_list add chefclient.com 'file_create'
	chefclient.com:
	  run_list:
	    recipe[my-test-02::test]
	    recipe[file_create]
	[root@workstation templates]# knife node show chefclient.com
	Node Name:   chefclient.com
	Environment: _default
	FQDN:        chefclient
	IP:          192.168.122.136
	Run List:    recipe[my-test-02::test], recipe[file_create]
	Roles:       
	Recipes:     my-test-02::test
	Platform:    centos 7.2.1511
	Tags:        tags01
	[root@workstation templates]# 

#### workstation上执行或者client执行chef-client来从Chef server获取最新的cookbook，并且在目标node上执行。

##### 方法一：

knife ssh chefclient 'sudo chef-client' -m -x root -P zaq12wsx

chefclient：node名

root：用户

zaq12wsx:密码

	[root@workstation chef-repo]# knife ssh chefclient 'sudo chef-client' -m -x root -P zaq12wsx
	chefclient Starting Chef Client, version 12.9.41
	chefclient resolving cookbooks for run list: ["my-test-02::test", "file_create"]
	chefclient Synchronizing Cookbooks:
	chefclient   - my-test-02 (0.1.0)
	chefclient   - file_create (0.1.0)
	chefclient Installing Cookbook Gems:
	chefclient Compiling Cookbooks...
	chefclient hello world!
	chefclient Converging 1 resources
	chefclient Recipe: file_create::default
	chefclient   * template[/root/file-create-test01.txt] action create (up to date)
	chefclient 
	chefclient Running handlers:
	chefclient Running handlers complete
	chefclient Chef Client finished, 0/1 resources updated in 01 seconds
	[root@workstation chef-repo]# 



##### 方法二：

chef-client

	[root@chefclient ~]# chef-client
	Starting Chef Client, version 12.9.41
	resolving cookbooks for run list: ["my-test-02::test", "file_create"]
	Synchronizing Cookbooks:
	  - my-test-02 (0.1.0)
	  - file_create (0.1.0)
	Installing Cookbook Gems:
	Compiling Cookbooks...
	hello world!
	Converging 1 resources
	Recipe: file_create::default
	  * template[/root/file-create-test01.txt] action create
	    - create new file /root/file-create-test01.txt
	    - update content in file /root/file-create-test01.txt from none to ccfe1c
	    --- /root/file-create-test01.txt	2016-05-18 23:16:14.514000000 -0400
	    +++ /root/.chef-file-create-test01.txt20160518-4329-1o2330c	2016-05-18 23:16:14.514000000 -0400
	    @@ -1 +1,7 @@
	    +Hello World!
	    +
	    +
	    +Chef Version: 12.9.41
	    +Platform: centos
	    +Version: 7.2.1511
	    - change mode from '' to '0755'
	    - change owner from '' to 'root'
	    - change group from '' to 'root'
	    - restore selinux security context

	Running handlers:
	Running handlers complete
	Chef Client finished, 1/1 resources updated in 02 seconds
	[root@chefclient ~]# 


#### Node节点上确认新建文件内容

	[root@chefclient ~]# ls -ltr
	total 56952
	-rw-------. 1 root root      951 May 11 04:33 anaconda-ks.cfg
	-rwxr-xr-x. 1 root root 58307543 May 12 01:16 chef-12.9.41-1.el7.x86_64.rpm
	-rwxr-xr-x. 1 root root       72 May 18 23:16 file-create-test01.txt
	[root@chefclient ~]# cat file-create-test01.txt
	Hello World!


	Chef Version: 12.9.41
	Platform: centos
	Version: 7.2.1511
	[root@chefclient ~]# 

	
---

