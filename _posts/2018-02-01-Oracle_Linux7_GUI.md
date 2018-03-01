---
layout: post
title: "How to install GUI in Oracle Linux 7?"
category: Unix
tags: Oracle Linux7 GUI yum 
---

* content
{:toc}

How to install GUI in Oracle Linux 7?










	root@oraclelinux7:/# yum grouplist
	Loaded plugins: ulninfo
	There is no installed groups file.
	Maybe run: yum groups mark convert (see man yum)
	Available Environment Groups:
	   Minimal Install
	   Infrastructure Server
	   File and Print Server
	   Cinnamon Desktop
	   MATE Desktop
	   Basic Web Server
	   Virtualization Host
	   Server with GUI
	Available Groups:
	   Additional Development
	   Backup Client
	   Backup Server
	   Base
	   CIFS file server
	   Compatibility libraries
	   Console internet tools
	   Debugging Tools
	   Desktop
	   Desktop Debugging and Performance Tools
	   Desktop Platform
	   Desktop Platform Development
	   Development tools
	   Dial-up Networking Support
	   Directory Client
	   Directory Server
	   E-mail server
	   Eclipse
	   Educational Software
	   Electronic Lab
	   Emacs
	   FCoE Storage Client
	   FTP server
	   Fedora Packager
	   Fonts
	   General Purpose Desktop
	   Graphical Administration Tools
	   Graphics Creation Tools
	   Hardware monitoring utilities
	   Haskell
	   Infiniband Support
	   Input Methods
	   Internet Applications
	   Internet Browser
	   Java Platform
	   KDE Desktop
	   Large Systems Performance
	   Legacy UNIX compatibility
	   Legacy X Window System compatibility
	   Mainframe Access
	   Messaging Client Support
	   Messaging Server Support
	   Milkymist
	   MySQL Database client
	   MySQL Database server
	   NFS file server
	   Network Infrastructure Server
	   Network Storage Server
	   Network file system client
	   Networking Tools
	   Office Suite and Productivity
	   PHP Support
	   Performance Tools
	   Perl Support
	   PostgreSQL Database client
	   PostgreSQL Database server
	   Print Server
	   Printing client
	   Remote Desktop Clients
	   SNMP Support
	   Scientific support
	   Security Tools
	   Server Platform
	   Server Platform Development
	   Smart card support
	   Storage Availability Tools
	   System Management
	   System administration tools
	   TeX support
	   Technical Writing
	   TurboGears application framework
	   Virtualization
	   Virtualization Client
	   Virtualization Platform
	   Virtualization Tools
	   Web Server
	   Web Servlet Engine
	   Web-Based Enterprise Management
	   X Window System
	   Xfce
	   iSCSI Storage Client
	Done
	root@oraclelinux7:/ yum grouplist | grep GUI
	There is no installed groups file.
	Maybe run: yum groups mark convert (see man yum)
	   Server with GUI
	root@oraclelinux7:/ yum groupinstall "Server with GUI"
	
	
~~~~~

root@oraclelinux7:/ 

--> Reboot and set the language/keyboard etc via GUI guild.


	root@oraclelinux7:~# runlevel
	N 3
	root@oraclelinux7:~# ll  /etc/systemd/system/
	total 20
	drwxr-xr-x. 17 root root 4096 Feb  7 20:10 ./
	drwxr-xr-x.  4 root root 4096 Feb  7 20:04 ../
	drwxr-xr-x.  2 root root   30 Jul 24  2014 basic.target.wants/
	drwxr-xr-x   2 root root   30 Feb  7 20:05 bluetooth.target.wants/
	lrwxrwxrwx   1 root root   41 Feb  7 20:05 dbus-org.bluez.service -> /usr/lib/systemd/system/bluetooth.service
	lrwxrwxrwx.  1 root root   44 Jul 24  2014 dbus-org.freedesktop.Avahi.service -> /usr/lib/systemd/system/avahi-daemon.service
	lrwxrwxrwx   1 root root   44 Feb  7 20:10 dbus-org.freedesktop.ModemManager1.service -> /usr/lib/systemd/system/ModemManager.service
	lrwxrwxrwx.  1 root root   46 Jul 24  2014 dbus-org.freedesktop.NetworkManager.service -> /usr/lib/systemd/system/NetworkManager.service
	lrwxrwxrwx.  1 root root   57 Jul 24  2014 dbus-org.freedesktop.nm-dispatcher.service -> /usr/lib/systemd/system/NetworkManager-dispatcher.service
	lrwxrwxrwx.  1 root root   37 Jul 24  2014 default.target -> /lib/systemd/system/multi-user.target
	drwxr-xr-x.  2 root root   85 Jul 24  2014 default.target.wants/
	drwxr-xr-x   2 root root   37 Feb  7 20:10 dev-virtio\x2dports-org.qemu.guest_agent.0.device.wants/
	lrwxrwxrwx   1 root root   35 Feb  7 20:08 display-manager.service -> /usr/lib/systemd/system/gdm.service
	drwxr-xr-x.  2 root root   31 Jul 24  2014 getty.target.wants/
	drwxr-xr-x   2 root root  107 Feb  7 20:08 graphical.target.wants/
	drwxr-xr-x.  2 root root 4096 Feb  7 20:10 multi-user.target.wants/
	drwxr-xr-x   2 root root   25 Feb  7 20:08 printer.target.wants/
	drwxr-xr-x   2 root root   30 Jul 18  2017 remote-fs.target.wants/
	drwxr-xr-x.  2 root root 4096 Feb  7 20:08 sockets.target.wants/
	drwxr-xr-x   2 root root   35 Feb  7 20:10 spice-vdagentd.target.wants/
	drwxr-xr-x.  2 root root 4096 Feb  7 20:06 sysinit.target.wants/
	drwxr-xr-x.  2 root root   43 Jul 24  2014 system-update.target.wants/
	drwxr-xr-x   2 root root   33 Feb  7 20:06 timers.target.wants/
	drwxr-xr-x   2 root root   28 Feb  7 20:08 vmtoolsd.service.requires/
	root@oraclelinux7:~# 
	root@oraclelinux7:~# ls -ltr /lib/systemd/system/graphical.target
	-rw-r--r-- 1 root root 558 Feb  1 07:33 /lib/systemd/system/graphical.target
	root@oraclelinux7:~# 
	root@oraclelinux7:~# rm /etc/systemd/system/default.target
	root@oraclelinux7:~# ln -n /lib/systemd/system/graphical.target /etc/systemd/system/default.target
	root@oraclelinux7:~# reboot


	
++++++++++++++++ EOF LinHong ++++++++++++++++	





