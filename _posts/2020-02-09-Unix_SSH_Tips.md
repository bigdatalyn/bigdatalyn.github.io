---
layout: post
title: "Unix SSH Timeout Tips"
category: Unix
tags: Unix SSH Tips 
---

* content
{:toc}

Unix SSH Timeout Tips



### Setting in Server

Modify the following file with ClientAliveInterval and ClientAliveCountMax.

	/etc/ssh/sshd_config

Edit:

	ClientAliveInterval [Seconds]
	ClientAliveCountMax [Counts]

Restart sshd service in Server host.

	Eg.CentOS7

	$ systemctl restart sshd

### Setting in Client

Modify the following file with ServerAliveInterval and ServerAliveCountMax.

	/etc/ssh/ssh_config or ~/.ssh/config

Edit:
	
	ServerAliveInterval [Seconds]
	ServerAliveCountMax [Counts]

Or use options `-o` in ssh command 

	ssh -o "ServerAliveInterval 60" -o "ServerAliveCountMax 120" <SERVER_ADDRESS>

Tips:

	ServerAliveInterval 60
	ServerAliveCountMax 120

Total time: 60sec * 120 = 2 hours.





Have a good work&life! 2020/02 via LinHong


