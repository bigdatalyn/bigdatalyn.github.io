---
layout: post
title: "[原创]Chef Cookbook 01.Helloworld"
date:   2016-05-18 09:13:00
category: Chef
tags: Chef Cookbook 
---

* content
{:toc}

Chef cookbook的helloworld的创建，熟悉是怎么样的流程操作来应用node使用cookbook的recipe呢？




#### WorkStation安装chef client命令

knife bootstrap 10.6.1.207 --sudo –x root -P passw0rd -N testcontroller.com

	[root@workstation chef-repo]# knife bootstrap 192.168.122.136 --sudo -x root -P zaq12wsx -N chefclient.com
	Doing old-style registration with the validation key at /root/chef-repo/.chef/1stchef-validator.pem...
	Delete your validation key in order to use your user credentials instead

	Connecting to 192.168.122.136
	192.168.122.136 -----> Existing Chef installation detected
	192.168.122.136 Starting the first Chef Client run...
	192.168.122.136 Starting Chef Client, version 12.9.41
	192.168.122.136 Creating a new client identity for chefclient.com using the validator key.
	192.168.122.136 resolving cookbooks for run list: []
	192.168.122.136 Synchronizing Cookbooks:
	192.168.122.136 Installing Cookbook Gems:
	192.168.122.136 Compiling Cookbooks...
	192.168.122.136 [2016-05-18T04:44:24-04:00] WARN: Node chefclient.com has an empty run list.
	192.168.122.136 Converging 0 resources
	192.168.122.136 
	192.168.122.136 Running handlers:
	192.168.122.136 Running handlers complete
	192.168.122.136 Chef Client finished, 0/0 resources updated in 02 seconds
	[root@workstation chef-repo]# knife node list
	chefclient.com
	workstation
	[root@workstation chef-repo]# knife node show chefclient.com
	Node Name:   chefclient.com
	Environment: _default
	FQDN:        chefclient
	IP:          192.168.122.136
	Run List:    
	Roles:       
	Recipes:     
	Platform:    centos 7.2.1511
	Tags:        tags01
	[root@workstation chef-repo]# pwd
	/root/chef-repo
	[root@workstation chef-repo]#


在目标机器上运行 chef-client命令，验证该命令是否可以识别。

#### 1、创建cookbook

	$ cd ~/chef-repo
	$ knife cookbook create my-test-02

LOG:

	[root@workstation chef-repo]# knife cookbook create my-test-02
	** Creating cookbook my-test-02 in /root/chef-repo/cookbooks
	** Creating README for cookbook: my-test-02
	** Creating CHANGELOG for cookbook: my-test-02
	** Creating metadata for cookbook: my-test-02
	[root@workstation chef-repo]# ls -ltr
	total 20
	drwxr-xr-x. 2 root root    22 May 13 05:30 roles
	-rw-r--r--. 1 root root  1798 May 13 05:30 README.md
	-rw-r--r--. 1 root root 10850 May 13 05:30 LICENSE
	drwxr-xr-x. 2 root root    22 May 13 05:30 environments
	drwxr-xr-x. 2 root root    22 May 13 05:30 data_bags
	-rw-r--r--. 1 root root   156 May 13 05:30 chefignore
	drwxr-xr-x. 3 root root    39 May 18 04:55 cookbooks
	[root@workstation chef-repo]# ls -ltr cookbooks
	total 8
	-rw-r--r--.  1 root root 3064 May 13 05:30 README.md
	drwxr-xr-x. 10 root root 4096 May 18 04:55 my-test-02
	[root@workstation chef-repo]# cd cookbooks/my-test-02/
	[root@workstation my-test-02]# ls -ltr
	total 12
	drwxr-xr-x. 2 root root    6 May 18 04:55 attributes
	drwxr-xr-x. 3 root root   20 May 18 04:55 templates
	drwxr-xr-x. 2 root root    6 May 18 04:55 resources
	drwxr-xr-x. 2 root root   23 May 18 04:55 recipes
	-rw-r--r--. 1 root root 1483 May 18 04:55 README.md
	drwxr-xr-x. 2 root root    6 May 18 04:55 providers
	drwxr-xr-x. 2 root root    6 May 18 04:55 libraries
	drwxr-xr-x. 3 root root   20 May 18 04:55 files
	drwxr-xr-x. 2 root root    6 May 18 04:55 definitions
	-rw-r--r--. 1 root root  445 May 18 04:55 CHANGELOG.md
	-rw-r--r--. 1 root root  284 May 18 04:55 metadata.rb
	[root@workstation my-test-02]# cd recipes/
	[root@workstation recipes]# ls 
	default.rb
	[root@workstation recipes]# vi test.rb


#### 2、编写recipe

	$ vi ~/chef-repo/cookbooks/my-test-02/recipes/test.rb

	puts "hello,world!!!"

#### 3、上传cookbook

	knife cook upload my-test-02

#### 4、配置node的run list

run list定义了recipe的执行顺序。

	# knife  node run_list add testcontroller.com recipe[my-test-02::test]

LOG:

	[root@workstation chef-repo]# knife node run_list add chefclient.com recipe[my-test-02::test]
	chefclient.com:
	  run_list: recipe[my-test-02::test]
	[root@workstation chef-repo]# knife ssh chefclient 'sudo chef-client' -m -x root -P zaq12wsx
	chefclient Starting Chef Client, version 12.9.41
	chefclient resolving cookbooks for run list: ["my-test-02::test"]
	chefclient Synchronizing Cookbooks:
	chefclient   - my-test-02 (0.1.0)
	chefclient Installing Cookbook Gems:
	chefclient Compiling Cookbooks...
	chefclient hello world!
	chefclient Converging 0 resources
	chefclient 
	chefclient Running handlers:
	chefclient Running handlers complete
	chefclient Chef Client finished, 0/0 resources updated in 01 seconds
	[root@workstation chef-repo]# 


#### 5、运行chef-client

##### 5.1）执行chef-client来从chef server上获取最新的cookbook，并且在目标node上执行。

	knife ssh your.host 'sudo chef-client' -m -x root -P Passw0rd

	-x username

##### 5.2）也可以自己登录到node上然后执行如下命令

   	# chef-client

	
---

