---
layout: post
title: "Virtualbox Upgrade error Tips"
category: Oracle
tags: Oracle Virtualbox Tips
---

* content
{:toc}

Virtualbox Upgrade error Tips


### Error after virtualbox's upgrade

There is the following error after the update virtualbox version and can NOT create network in virutualbox
```
VBoxNetAdpCtl: Error while adding new interface: failed to open /dev/vboxnetctl: No such file or directory.
```

### Fix

Use the following command in command line.

```
sudo "/Library/Application Support/VirtualBox/LaunchDaemons/VirtualBoxStartup.sh" restart

sudo /Library/Application\ Support/VirtualBox/LaunchDaemons/VirtualBoxStartup.sh restart

```

Mac System Preferences/security&Privacy/General -> allow and restart!

Have a good work&life! 2021/07 via LinHong
