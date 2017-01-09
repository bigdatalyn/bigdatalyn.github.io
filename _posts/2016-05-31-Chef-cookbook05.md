---
layout: post
title: "[原创]Chef Cookbook 05.Facebook cookbook之fb_motd学习"
date:   2016-05-31 10:35:00
category: Chef
tags: Chef Cookbook 
---

* content
{:toc}


学习Facebook的cookbook是一个学习chef的途径之一。
Chef is being used very widely. One of chef’s biggest customers is Facebook. Many
Internet companies and enterprises use chef today to automate their infrastructure
environments. 






### fb_motd如下结构

	[root@workstation fb_motd]# pwd
	/root/chef-cookbooks-master/cookbooks/fb_motd
	[root@workstation fb_motd]# ls -ltr
	total 8
	drwxrwxr-x. 3 root root  20 May 20 19:53 templates
	-rw-rw-r--. 1 root root 305 May 20 19:53 README.md
	-rw-rw-r--. 1 root root 342 May 20 19:53 metadata.rb
	drwxrwxr-x. 2 root root  23 May 31 12:08 attributes
	drwxrwxr-x. 2 root root  23 May 31 12:10 recipes
	[root@workstation fb_motd]# tree
	.
	|-- attributes
	|   `-- default.rb
	|-- metadata.rb
	|-- README.md
	|-- recipes
	|   `-- default.rb
	`-- templates
	    `-- default
		`-- motd.erb

	4 directories, 5 files
	[root@workstation fb_motd]# 

#### attributes属性文件default追加了extra_lines的value内容和新加了my_lines的Key-Value内容

	[root@workstation fb_motd]# cat attributes/default.rb 
	# vim: syntax=ruby:expandtab:shiftwidth=2:softtabstop=2:tabstop=2
	# Copyright (c) 2016-present, Facebook, Inc.
	# All rights reserved.
	#
	# This source code is licensed under the BSD-style license found in the
	# LICENSE file in the root directory of this source tree. An additional grant
	# of patent rights can be found in the PATENTS file in the same directory.
	#
	default['fb_motd'] = {
	#  'extra_lines' => [],
	  'extra_lines' => ['helloworld'],
	  'my_lines' => ['my name is abc.','nice to meet you'],
	}
	[root@workstation fb_motd]# 

#### template追加my_lines属性内容显示

	[root@workstation fb_motd]# cat templates/default/motd.erb 
	<% node['fb_motd']['extra_lines'].each do |line| -%>
	<%=  line %>
	<% end -%>
	<% node['fb_motd']['my_lines'].each do |line| -%>
	<%=  line %>
	<% end -%>
	[root@workstation fb_motd]# 


#### 菜单不修改

	[root@workstation fb_motd]# cat recipes/default.rb  | grep -v ^# | grep -v ^$
	template '/etc/motd' do
	  not_if { node['motd_exempt'] }
	  group 'root'
	  mode '0644'
	  owner 'root'
	  source 'motd.erb'
	end
	[root@workstation fb_motd]# 

### 应用菜单

上传测试

#### 上传更新后的 cookbook

	[root@workstation fb_motd]# knife cookbook upload fb_motd
	Uploading fb_motd        [0.0.1]
	Uploaded 1 cookbook.
	[root@workstation fb_motd]# 


#### 为chefclient节点run_list追加菜单

	[root@workstation fb_motd]# knife node show chefclient
	Node Name:   chefclient
	Environment: _default
	FQDN:        chefclient
	IP:          192.168.122.136
	Run List:    
	Roles:       
	Recipes:     fb_motd, fb_motd::default
	Platform:    centos 7.2.1511
	Tags:        
	[root@workstation fb_motd]# 
	[root@workstation fb_motd]# knife node run_list add chefclient fb_motd
	chefclient:
	  run_list: recipe[fb_motd]
	[root@workstation fb_motd]# 

#### 查看确认chefclient节点信息

	[root@workstation fb_motd]# knife node show chefclient
	Node Name:   chefclient
	Environment: _default
	FQDN:        chefclient
	IP:          192.168.122.136
	Run List:    recipe[fb_motd]
	Roles:       
	Recipes:     fb_motd, fb_motd::default
	Platform:    centos 7.2.1511
	Tags:        
	[root@workstation fb_motd]# 


#### 节点获取菜单点菜

	[root@chefclient ~]# ls -ltr /etc/motd
	ls: cannot access /etc/motd: No such file or directory
	[root@chefclient ~]# chef-client
	Starting Chef Client, version 12.10.24
	resolving cookbooks for run list: ["fb_motd"]
	Synchronizing Cookbooks:
	  - fb_motd (0.0.1)
	Installing Cookbook Gems:
	Compiling Cookbooks...
	Converging 1 resources
	Recipe: fb_motd::default
	  * template[/etc/motd] action create
	    - create new file /etc/motd
	    - update content in file /etc/motd from none to 49567c
	    --- /etc/motd	2016-05-31 12:08:47.776000000 -0400
	    +++ /etc/.chef-motd20160531-18528-15sl3da	2016-05-31 12:08:47.775000000 -0400
	    @@ -1 +1,4 @@
	    +helloworld
	    +my name is abc.
	    +nice to meet you
	    - change mode from '' to '0644'
	    - change owner from '' to 'root'
	    - change group from '' to 'root'

	Running handlers:
	Running handlers complete
	Chef Client finished, 1/1 resources updated in 02 seconds
	[root@chefclient ~]# ls -ltr /etc/motd
	-rw-r--r-- 1 root root 44 May 31 12:08 /etc/motd
	[root@chefclient ~]# cat /etc/motd
	helloworld
	my name is abc.
	nice to meet you
	[root@chefclient ~]# 

#### 完工！




---

