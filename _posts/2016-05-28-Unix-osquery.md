---
layout: post
title: "Osquery 初体验"
date:   2016-05-28 21:35:00

category: Unix
excerpt: Unix
code: true
tags: Unix Osquery
---

* content
{:toc}

osquery是一款面向OSX和Linux的操作系统检测框架。它将操作系统暴露为一个高性能的关系型数据库，允许用户编写SQL查询查看操作系统数据。简单方便～ 有兴趣可以研究下。





### 什么Osquery

osquery是一款面向OSX和Linux的操作系统检测框架。它将操作系统暴露为一个高性能的关系型数据库，允许用户编写SQL查询查看操作系统数据。

在osquery中，SQL表代表像下面这样的抽象概念：

 * 正在运行的进程

 * 已加载的内核模块

 * 打开的网络连接

这些查询可以：

 * 在特定条件下探索操作系统状态

 * 通过执行调度程序来监控操作系统的主机状态

 * 启动使用osquery api的自定义应用程序

### Osquery下载安装及初体验

实验环境是 CentOS 7 64bit 版本。下载对应版本osquery-1.7.4.rpm，然后上传，修改权限，之后rpm...很简单

	[root@chefclient ~]# chmod a+x osquery-1.7.4.rpm 
	[root@chefclient ~]# rpm -ivh osquery-1.7.4.rpm 
	warning: osquery-1.7.4.rpm: Header V4 RSA/SHA1 Signature, key ID c9d8b80b: NOKEY
	Preparing...                          ################################# [100%]
	Updating / installing...
	   1:osquery-1.7.4-1.el7              ################################# [100%]
	[root@chefclient ~]#

以及各个package和使用：

https://osquery.io/docs/packs/#incident-response_open_files

DBA的话，很容易参考使用.

#### 交互登录和帮助文档：

	[root@chefclient ~]# osqueryi
	osquery - being built, with love, at Facebook
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Using a virtual database. Need help, type '.help'
	osquery> .help
	Welcome to the osquery shell. Please explore your OS!
	You are connected to a transient 'in-memory' virtual database.

	.all [TABLE]       Select all from a table
	.bail ON|OFF       Stop after hitting an error; default OFF
	.echo ON|OFF       Turn command echo on or off
	.exit              Exit this program
	.header(s) ON|OFF  Turn display of headers on or off
	.help              Show this message
	.mode MODE         Set output mode where MODE is one of:
		             csv      Comma-separated values
		             column   Left-aligned columns.  (See .width)
		             line     One value per line
		             list     Values delimited by .separator string
		             pretty   Pretty printed SQL results
	.nullvalue STR     Use STRING in place of NULL values
	.print STR...      Print literal STRING
	.quit              Exit this program
	.schema [TABLE]    Show the CREATE statements
	.separator STR     Change separator used by output mode and .import
	.show              Show the current values for various settings
	.tables [TABLE]    List names of tables
	.trace FILE|off    Output each SQL statement as it is run
	.width [NUM1]+     Set column widths for "column" mode
	.timer ON|OFF      Turn the CPU timer measurement on or off

进程和path列表

	osquery> .timer ON
	osquery>  select distinct pid, path from process_open_files where path not like '/private/var/folders%' and path not like '/System/Library/%' and path not in ('/dev/null', '/dev/urandom', '/dev/random');
	+-------+-------------------------------------------------------------------------------------------------------------------------------------+
	| pid   | path                                                                                                                                |
	+-------+-------------------------------------------------------------------------------------------------------------------------------------+
	| 1     | /proc/swaps                                                                                                                         |
	| 1     | /dev/autofs                                                                                                                         |
	| 1     | /run/systemd/initctl/fifo                                                                                                           |
	| 1     | /run/dmeventd-server                                                                                                                |
	| 1     | /run/dmeventd-client                                                                                                                |
	| 1     | /sys/fs/cgroup/systemd                                                                                                              |
	| 1     | /proc/1/mountinfo                                                                                                                   |
	| 11430 | /var/log/httpd/error_log                                                                                                            |
	| 11430 | /var/log/httpd/access_log                                                                                                           |
	| 15069 | /dev/input/event0                                                                                                                   |
	| 15069 | /run/systemd/sessions/1354.ref                                                                                                      |
	| 15069 | /dev/tty6                                                                                                                           |
	| 15069 | /run/systemd/inhibit/1.ref                                                                                                          |
	| 15069 | /sys/devices/virtual/tty/tty0/active                                                                                                |
	| 15083 | /var/spool/postfix/pid/unix.cleanup                                                                                                 |
	| 15086 | /etc/aliases.db                                                                                                                     |
	| 15086 | /var/spool/postfix/pid/unix.local                                                                                                   |
	| 15928 | /dev/ptmx                                                                                                                           |
	| 15928 | /run/systemd/sessions/1354.ref                                                                                                      |
	| 15930 | /dev/pts/0                                                                                                                          |
	| 15943 | /dev/pts/0                                                                                                                          |
	| 15943 | /var/osquery/syslog_pipe                                                                                                            |
	| 15943 | /var/tmp/etilqs_2a76e5f518dbc4f4 (deleted)                                                                                          |
	| 15943 | /var/tmp/etilqs_c1f2161256142d73 (deleted)                                                                                          |
	| 15943 | /proc/15943/fd                                                                                                                      |
	| 15943 | /root/.osquery/shell.db                                                                                                             |
	| 15943 | /root/.osquery/shell.db/LOCK                                                                                                        |
	| 15943 | /root/.osquery/shell.db/MANIFEST-000006                                                                                             |
	| 15943 | /root/.osquery/shell.db/000007.sst                                                                                                  |
	| 15943 | /root/.osquery/shell.db/000008.log                                                                                                  |
	| 1928  | /var/spool/postfix/pid/master.pid                                                                                                   |
	| 1928  | /var/lib/postfix/master.lock                                                                                                        |
	| 1929  | /var/log/httpd/error_log                                                                                                            |
	| 1929  | /var/log/httpd/access_log                                                                                                           |
	| 1930  | /var/log/httpd/error_log                                                                                                            |
	| 1930  | /var/log/httpd/access_log                                                                                                           |
	| 1931  | /var/log/httpd/error_log                                                                                                            |
	| 1931  | /var/log/httpd/access_log                                                                                                           |
	| 1932  | /var/log/httpd/error_log                                                                                                            |
	| 1932  | /var/log/httpd/access_log                                                                                                           |
	| 1933  | /var/log/httpd/error_log                                                                                                            |
	| 1933  | /var/log/httpd/access_log                                                                                                           |
	| 3045  | /proc/sys/kernel/hostname                                                                                                           |
	| 3045  | /run/log/journal/32ecf25fc5bd8c9c3a3e999f6a35998c/system.journal                                                                    |
	| 3045  | /dev/kmsg                                                                                                                           |
	| 481   | /run/lvmetad.pid                                                                                                                    |
	| 492   | /etc/udev/hwdb.bin                                                                                                                  |
	| 562   | /var/log/audit/audit.log                                                                                                            |
	| 581   | /proc/cmdline                                                                                                                       |
	| 582   | /run/systemd/inhibit/1.ref                                                                                                          |
	| 593   | /run/log/journal/32ecf25fc5bd8c9c3a3e999f6a35998c/system@4c7137b059a248e8891f410c691a62d5-0000000000000d9c-0005341c91205416.journal |
	| 593   | /run/log/journal/32ecf25fc5bd8c9c3a3e999f6a35998c/system@4c7137b059a248e8891f410c691a62d5-00000000000019aa-0005341ea5ef5839.journal |
	| 593   | /run/log/journal/32ecf25fc5bd8c9c3a3e999f6a35998c/system.journal                                                                    |
	| 593   | /var/log/messages                                                                                                                   |
	| 593   | /run/log/journal/32ecf25fc5bd8c9c3a3e999f6a35998c/system@00053418fcd757ed-d421a176402dfc0d.journal~                                 |
	| 593   | /var/log/cron                                                                                                                       |
	| 593   | /var/log/secure                                                                                                                     |
	| 593   | /var/log/maillog                                                                                                                    |
	| 593   | /run/log/journal/32ecf25fc5bd8c9c3a3e999f6a35998c/system@4c7137b059a248e8891f410c691a62d5-0000000000000001-00053418fcd75d7e.journal |
	| 596   | /run/crond.pid                                                                                                                      |
	| 600   | /dev/tty1                                                                                                                           |
	| 615   | /var/log/wpa_supplicant.log                                                                                                         |
	| 618   | /var/lib/NetworkManager/dhclient-ba072888-16aa-495c-960e-ec54eb4d9f56-eth0.lease                                                    |
	| 826   | /var/log/httpd/error_log                                                                                                            |
	| 826   | /var/log/httpd/access_log                                                                                                           |
	| 828   | /dev/cpu_dma_latency                                                                                                                |
	| 828   | /var/log/tuned/tuned.log                                                                                                            |
	+-------+-------------------------------------------------------------------------------------------------------------------------------------+
	Run Time: real 0.012 user 0.006023 sys 0.004670
	osquery> 

其中osquery进程打开的的相关文件：

	| 15943 | /root/.osquery/shell.db                                                                                                             |
	| 15943 | /root/.osquery/shell.db/LOCK                                                                                                        |
	| 15943 | /root/.osquery/shell.db/MANIFEST-000006                                                                                             |
	| 15943 | /root/.osquery/shell.db/000007.sst                                                                                                  |
	| 15943 | /root/.osquery/shell.db/000008.log                                                                                                  |

osquery监控的范围有那些事件？

	osquery> select name, publisher, type, subscriptions, events, active from osquery_events; 
	+---------------------+-----------+------------+---------------+--------+--------+
	| name                | publisher | type       | subscriptions | events | active |
	+---------------------+-----------+------------+---------------+--------+--------+
	| audit               | audit     | publisher  | 2             | 0      | 1      |
	| inotify             | inotify   | publisher  | 0             | 0      | 1      |
	| kernel              | kernel    | publisher  | 0             | 0      | 0      |
	| syslog              | syslog    | publisher  | 1             | 0      | 1      |
	| udev                | udev      | publisher  | 1             | 0      | 1      |
	| file_events         | inotify   | subscriber | 0             | 0      | 1      |
	| hardware_events     | udev      | subscriber | 1             | 0      | 1      |
	| process_events      | audit     | subscriber | 1             | 0      | 1      |
	| process_file_events | kernel    | subscriber | 0             | 0      | 0      |
	| socket_events       | audit     | subscriber | 0             | 0      | 0      |
	| syslog              | syslog    | subscriber | 1             | 0      | 1      |
	| user_events         | audit     | subscriber | 1             | 0      | 1      |
	| yara_events         | inotify   | subscriber | 0             | 0      | 1      |
	+---------------------+-----------+------------+---------------+--------+--------+
	osquery> 


#### Shell模式

如：

	[root@chefclient ~]# osqueryi
	osquery - being built, with love, at Facebook
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	Using a virtual database. Need help, type '.help'
	osquery> SELECT DISTINCT process.name,listening.port,process.pid FROM processes AS process JOIN listening_ports AS listening  ON process.pid = listening.pid WHERE listening.address = '0.0.0.0';
	+----------+-------+-------+
	| name     | port  | pid   |
	+----------+-------+-------+
	| local    | 58671 | 15086 |
	| dhclient | 68    | 618   |
	| dhclient | 58446 | 618   |
	| sshd     | 22    | 829   |
	+----------+-------+-------+
	osquery> 

脚本模式如下：

 * osqueryi --json "sql ...."

 * echo "" | osqueryi --json


Json格式结果：

	[root@chefclient ~]# echo "SELECT DISTINCT process.name,listening.port,process.pid FROM processes AS process JOIN listening_ports AS listening  ON process.pid = listening.pid WHERE listening.address = '0.0.0.0';" | osqueryi --json
	[
	  {"name":"local","pid":"15086","port":"58671"},
	  {"name":"dhclient","pid":"618","port":"68"},
	  {"name":"dhclient","pid":"618","port":"58446"},
	  {"name":"sshd","pid":"829","port":"22"}
	]
	[root@chefclient ~]#

csv格式结果：

	[root@chefclient ~]# echo "SELECT DISTINCT process.name,listening.port,process.pid FROM processes AS process JOIN listening_ports AS listening  ON process.pid = listening.pid WHERE listening.address = '0.0.0.0';" | osqueryi --csv
	name|port|pid
	local|58671|15086
	dhclient|68|618
	dhclient|58446|618
	sshd|22|829
	[root@chefclient ~]# 



### 参考资料

[osquery：Facebook开源的一款基于SQL的操作系统检测和监控框架](http://www.infoq.com/cn/news/2014/10/osquery-facebook-sql)

[Install Linux Osquery](https://osquery.readthedocs.io/en/latest/installation/install-linux/)

[Download](https://osquery.io/downloads/)

---
