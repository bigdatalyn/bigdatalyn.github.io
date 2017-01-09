---
layout: post
title: "[原创]Chef Cookbook 03. chef receipe 学习用例"
date:   2016-05-22 11:35:00
category: Chef
tags: Chef Cookbook receipe
---

* content
{:toc}


chef-client的入门测试用例





### Chef-client学习用例

#### 01.Configure a resource 

##### 新建一个文件

	[root@chefclient ~]# mkdir ~/chef-repo
	[root@chefclient ~]# cd ~/chef-repo
	[root@chefclient chef-repo]# ls -ltr
	total 0
	[root@chefclient chef-repo]# vi hello.rb
	[root@chefclient chef-repo]# ls -ltt
	total 4
	-rw-r--r--. 1 root root 48 May 24 00:23 hello.rb
	[root@chefclient chef-repo]# cat hello.rb 
	file '/tmp/motd' do
	  content 'hello world'
	end
	[root@chefclient chef-repo]# 
	[root@chefclient chef-repo]# chef-client --local-mode hello.rb
	[2016-05-24T00:23:23-04:00] WARN: No config file found or specified on command line, using command line options.
	[2016-05-24T00:23:23-04:00] WARN: No cookbooks directory found at or above current directory.  Assuming /root/chef-repo.
	Starting Chef Client, version 12.9.41
	resolving cookbooks for run list: []
	Synchronizing Cookbooks:
	Installing Cookbook Gems:
	Compiling Cookbooks...
	[2016-05-24T00:23:26-04:00] WARN: Node chefclient has an empty run list.
	Converging 1 resources
	Recipe: @recipe_files::/root/chef-repo/hello.rb
	  * file[/tmp/motd] action create
	    - create new file /tmp/motd
	    - update content in file /tmp/motd from none to b94d27
	    --- /tmp/motd	2016-05-24 00:23:26.795000000 -0400
	    +++ /tmp/.chef-motd20160524-2236-jjus4c	2016-05-24 00:23:26.795000000 -0400
	    @@ -1 +1,2 @@
	    +hello world
	    - restore selinux security context

	Running handlers:
	Running handlers complete
	Chef Client finished, 1/1 resources updated in 02 seconds
	[root@chefclient chef-repo]# ls -ltr /tmp/motd
	-rw-r--r--. 1 root root 11 May 24 00:23 /tmp/motd
	[root@chefclient chef-repo]# cat /tmp/motd
	hello world[root@chefclient chef-repo]# 
	[root@chefclient chef-repo]# 


##### 更新后再chef-client执行的结果


	[root@chefclient chef-repo]# cat hello.rb 
	file '/tmp/motd' do
	  content 'hello world'
	end
	[root@chefclient chef-repo]# vi hello.rb 
	[root@chefclient chef-repo]# cat hello.rb 
	file '/tmp/motd' do
	  content 'hello world!welcome to chef!'
	end
	[root@chefclient chef-repo]# 
	[root@chefclient chef-repo]# chef-client --local-mode hello.rb
	[2016-05-24T00:27:00-04:00] WARN: No config file found or specified on command line, using command line options.
	[2016-05-24T00:27:00-04:00] WARN: No cookbooks directory found at or above current directory.  Assuming /root/chef-repo.
	Starting Chef Client, version 12.9.41
	resolving cookbooks for run list: []
	Synchronizing Cookbooks:
	Installing Cookbook Gems:
	Compiling Cookbooks...
	[2016-05-24T00:27:01-04:00] WARN: Node chefclient has an empty run list.
	Converging 1 resources
	Recipe: @recipe_files::/root/chef-repo/hello.rb
	  * file[/tmp/motd] action create
	    - update content in file /tmp/motd from b94d27 to 7c63b3
	    --- /tmp/motd	2016-05-24 00:23:26.795000000 -0400
	    +++ /tmp/.chef-motd20160524-2442-193dazd	2016-05-24 00:27:01.839000000 -0400
	    @@ -1,2 +1,2 @@
	    -hello world
	    +hello world!welcome to chef!
	    - restore selinux security context

	Running handlers:
	Running handlers complete
	Chef Client finished, 1/1 resources updated in 01 seconds
	[root@chefclient chef-repo]# cat /tmp/motd
	hello world!welcome to chef![root@chefclient chef-repo]#


##### 其他进程替换文件内容后，需要重新执行chef-client的结果

	[root@chefclient chef-repo]# echo 'hello robots' > /tmp/motd
	[root@chefclient chef-repo]# cat /tmp/motd
	hello robots
	[root@chefclient chef-repo]# chef-client --local-mode hello.rb
	[2016-05-24T00:30:31-04:00] WARN: No config file found or specified on command line, using command line options.
	[2016-05-24T00:30:31-04:00] WARN: No cookbooks directory found at or above current directory.  Assuming /root/chef-repo.
	Starting Chef Client, version 12.9.41
	resolving cookbooks for run list: []
	Synchronizing Cookbooks:
	Installing Cookbook Gems:
	Compiling Cookbooks...
	[2016-05-24T00:30:33-04:00] WARN: Node chefclient has an empty run list.
	Converging 1 resources
	Recipe: @recipe_files::/root/chef-repo/hello.rb
	  * file[/tmp/motd] action create
	    - update content in file /tmp/motd from 548078 to 7c63b3
	    --- /tmp/motd	2016-05-24 00:30:11.026000000 -0400
	    +++ /tmp/.chef-motd20160524-2652-1mxhqti	2016-05-24 00:30:33.963000000 -0400
	    @@ -1,2 +1,2 @@
	    -hello robots
	    +hello world!welcome to chef!
	    - restore selinux security context

	Running handlers:
	Running handlers complete
	Chef Client finished, 1/1 resources updated in 02 seconds
	[root@chefclient chef-repo]# cat /tmp/motd
	hello world!welcome to chef![root@chefclient chef-repo]# 



##### 删除文件操作

	[root@chefclient chef-repo]# pwd
	/root/chef-repo
	[root@chefclient chef-repo]# vi goodby.rb
	[root@chefclient chef-repo]# cat goodby.rb
	file '/tmp/motd' do
	   action :delete
	end
	[root@chefclient chef-repo]# chef-client --local-mode goodby.rb 
	[2016-05-24T00:32:56-04:00] WARN: No config file found or specified on command line, using command line options.
	[2016-05-24T00:32:56-04:00] WARN: No cookbooks directory found at or above current directory.  Assuming /root/chef-repo.
	Starting Chef Client, version 12.9.41
	resolving cookbooks for run list: []
	Synchronizing Cookbooks:
	Installing Cookbook Gems:
	Compiling Cookbooks...
	[2016-05-24T00:32:57-04:00] WARN: Node chefclient has an empty run list.
	Converging 1 resources
	Recipe: @recipe_files::/root/chef-repo/goodby.rb
	  * file[/tmp/motd] action delete
	    - delete file /tmp/motd

	Running handlers:
	Running handlers complete
	Chef Client finished, 1/1 resources updated in 01 seconds
	[root@chefclient chef-repo]# ls -ltr /tmp/motd
	ls: cannot access /tmp/motd: No such file or directory
	[root@chefclient chef-repo]# 




[Get started with Chef](https://learn.chef.io/tutorials/)

#### 02.Configure a package and service 

##### package的安装

	[chef@chefclient ~]$ cd chef-repo/
	[chef@chefclient chef-repo]$ ls -ltr
	total 4
	drwxr-xr-x. 2 root root 28 May 24 01:44 nodes
	-rw-rw-r--. 1 chef chef 67 May 24 01:46 filecreate.rb
	[chef@chefclient chef-repo]$ vi webservice.rb
	[chef@chefclient chef-repo]$ cat webservice.rb 
	package 'httpd'
	[chef@chefclient chef-repo]$ sudo chef-client --local-mode webservice.rb 
	[sudo] password for chef: 
	[2016-05-24T02:54:36-04:00] WARN: No config file found or specified on command line, using command line options.
	[2016-05-24T02:54:36-04:00] WARN: No cookbooks directory found at or above current directory.  Assuming /home/chef/chef-repo.
	Starting Chef Client, version 12.9.41
	resolving cookbooks for run list: []
	Synchronizing Cookbooks:
	Installing Cookbook Gems:
	Compiling Cookbooks...
	[2016-05-24T02:54:37-04:00] WARN: Node chefclient has an empty run list.
	Converging 1 resources
	Recipe: @recipe_files::/home/chef/chef-repo/webservice.rb
	  * yum_package[httpd] action install
	 (up to date)

	Running handlers:
	Running handlers complete
	Chef Client finished, 0/1 resources updated in 45 seconds
	[chef@chefclient chef-repo]$ 

client没有安装httpd的package的话，就yum下载安装，没有的话就想上例子一样（up to date）

备注：

sudo is required because this command installs a package and therefore must be run with root privileges. If you're running as root on your own machine, you can omit sudo from the command.

	
---

