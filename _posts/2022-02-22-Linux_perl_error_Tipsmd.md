---
layout: post
title: "Linux perl error in bash Tips"
category: Linux
tags: Linux Tips
---

* content
{:toc}

Linux perl error in bash Tips
```
perl: warning: Setting locale failed.
```





### Env

```
[root@centos7 ~]# cat /etc/redhat-release
CentOS Linux release 7.9.2009 (Core)
[root@centos7 ~]# uname -r
3.10.0-1160.el7.x86_64
[root@centos7 ~]# uname -a
Linux centos7 3.10.0-1160.el7.x86_64 #1 SMP Mon Oct 19 16:18:59 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
[root@centos7 ~]#
```

### Error

Error messages:
```
perl: warning: Setting locale failed.
# .bashrc
perl: warning: Please check that your locale settings:
	LANGUAGE = (unset),
	LC_ALL = (unset),
	LC_CTYPE = "UTF-8",
	LANG = "en_US.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
```

Fix:
```
# Setting for the new UTF-8 terminal support in bashrc
export LC_CTYPE=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

### Reference

[How to fix a locale setting warning from Perl](https://stackoverflow.com/questions/2499794/how-to-fix-a-locale-setting-warning-from-perl)

Have a good work&life! 2022/02 via LinHong

