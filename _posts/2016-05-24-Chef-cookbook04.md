---
layout: post
title: "[原创]Chef Cookbook 04.cron 任务"
date:   2016-05-24 17:35:00
category: Chef
tags: Chef Cookbook 
---

* content
{:toc}

chef官网提供了很多常用cookbook，下面cron任务的cookbook为例简单的学习和使用





#### 下载chef-cron的cookbook

提供git和https的方式下载cron-master，

在[chef-cookbooks](https://github.com/chef-cookbooks)中找到git的cron，点击https下载

![chef-cookbook-cron]({{ "/files/Images/Chef/chef-cookbook-cron.png"}}) 


![Download]({{ "/files/Images/Chef/chef-cookbook-cron-download.png"}}) 


上传到workstation

解压后并注意cron的cookbook文件的权限，

如果是数字的话修改期限，如：chown -R root.root /root/chef-repo/cookbooks/cron

cron-cookbook的内容如下：

	[root@workstation cron]# pwd
	/root/chef-repo/cookbooks/cron
	[root@workstation cron]# ls -ltr
	total 56
	-rw-r--r--. 1 root root   939 May 25 04:29 Rakefile
	drwxr-xr-x. 2 root root    23 May 25 04:29 attributes
	-rw-r--r--. 1 root root   356 May 25 04:29 Gemfile
	-rw-r--r--. 1 root root   111 May 25 04:29 CONTRIBUTING.md
	drwxr-xr-x. 2 root root    17 May 25 04:29 resources
	-rw-r--r--. 1 root root 11358 May 25 04:29 LICENSE
	drwxr-xr-x. 2 root root    22 May 25 04:29 definitions
	-rw-r--r--. 1 root root  4060 May 25 04:29 CHANGELOG.md
	-rw-r--r--. 1 root root   106 May 25 04:29 TESTING.md
	drwxr-xr-x. 3 root root    20 May 25 04:29 templates
	drwxr-xr-x. 2 root root    27 May 25 04:29 tasks
	-rw-r--r--. 1 root root   609 May 25 04:29 metadata.rb
	drwxr-xr-x. 2 root root    24 May 25 04:29 libraries
	-rw-r--r--. 1 root root  1067 May 25 04:29 chefignore
	drwxr-xr-x. 3 root root    38 May 25 04:29 spec
	-rw-r--r--. 1 root root   882 May 25 04:29 MAINTAINERS.md
	-rw-r--r--. 1 root root   198 May 25 04:29 Berksfile
	drwxr-xr-x. 4 root root    39 May 25 04:29 test
	drwxr-xr-x. 2 root root    17 May 25 04:29 providers
	-rw-r--r--. 1 root root  3640 May 25 04:29 README.md
	-rw-r--r--. 1 root root  1220 May 25 04:29 MAINTAINERS.toml
	drwxr-xr-x. 2 root root    74 May 25 05:17 recipes
	[root@workstation cron]#

#### 测试使用例

workstation下在cron的recipes下编辑追加多cron_writedate.rb的菜单

	[root@workstation recipes]# pwd
	/root/chef-repo/cookbooks/cron/recipes
	[root@workstation recipes]# vi
	[root@workstation recipes]# cat cron_writedate.rb 
	cron 'date_write_log' do
	    command "echo `date` >> /tmp/date.log"
	    only_if do File.exist?('/tmp/date.log') end 
	end

	cron 'noop' do
	  minute 1 
	  command "echo `date` >> chef.log"
	  user    'chef'
	end

	[root@workstation recipes]# 


语法参考[chef-cookbooks](https://github.com/chef-cookbooks)

把cron的cookbook上传到server

	[root@workstation chef-repo]# knife node list
	chefclient
	workstation
	[root@workstation chef-repo]# knife cookbook upload cron
	Uploading cron           [1.7.6]
	Uploaded 1 cookbook.
	[root@workstation chef-repo]# 

把recipe追加到run_list里

	[root@workstation chef-repo]# knife node list chefclient
	chefclient
	workstation
	[root@workstation chef-repo]# knife node show chefclient
	Node Name:   chefclient
	Environment: _default
	FQDN:        chefclient
	IP:          192.168.122.136
	Run List:    
	Roles:       
	Recipes:     
	Platform:    centos 7.2.1511
	Tags:        
	[root@workstation chef-repo]# 
	[root@workstation chef-repo]# knife node run_list add chefclient recipe[cron::cron_writedate]
	chefclient:
	  run_list: recipe[cron::cron_writedate]
	[root@workstation chef-repo]# knife node show chefclient
	Node Name:   chefclient
	Environment: _default
	FQDN:        chefclient
	IP:          192.168.122.136
	Run List:    recipe[cron::cron_writedate]
	Roles:       
	Recipes:     
	Platform:    centos 7.2.1511
	Tags:        
	[root@workstation chef-repo]# 

也可以登录server的web页面查看或者拖拉方式追加client的 run_list里

![Add_runlist]({{ "/files/Images/Chef/chef-cookbook-recipe-cron.png"}}) 

然后，client应用这个recipe

	[root@chefclient ~]# uname -n
	chefclient
	[root@chefclient ~]# chef-client
	Starting Chef Client, version 12.10.24
	resolving cookbooks for run list: ["cron::cron_writedate"]
	Synchronizing Cookbooks:
	  - cron (1.7.6)
	Installing Cookbook Gems:
	Compiling Cookbooks...
	Converging 2 resources
	Recipe: cron::cron_writedate
	  * cron[date_write_log] action create
	    - add crontab entry for cron[date_write_log]
	  * cron[noop] action create
	    - add crontab entry for cron[noop]

	Running handlers:
	Running handlers complete
	Chef Client finished, 2/2 resources updated in 03 seconds
	[root@chefclient ~]# 

最后确认下：


	[root@chefclient ~]# whoami
	root
	[root@chefclient ~]# crontab -l
	# Chef Name: date_write_log
	* * * * * echo `date` >> /tmp/date.log
	[root@chefclient ~]# su - chef
	Last login: Wed May 25 05:20:34 EDT 2016 on pts/0
	[chef@chefclient ~]$ crontab -l
	# Chef Name: noop
	1 * * * * echo `date` >> chef.log
	[chef@chefclient ~]$ 

完工！～喝口茶～


#### 参考资料

[chef-Docs](https://docs.chef.io)

[chef-cookbooks](https://github.com/chef-cookbooks)



---

