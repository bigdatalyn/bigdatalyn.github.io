---
layout: post
title: "MasOS SSH UTF8 Error Tips"
category: OS
tags: OS Tips
---

* content
{:toc}

MasOS SSH UTF8 Error Tips

### Error

There is LC_CTYPE error while connect to VM via ssh.
```
YourMacBook-Pro ~ % ssh root@127.0.0.1 -p2223
root@127.0.0.1's password:
Last login: Wed Mar  2 11:00:35 2022 from gateway
-bash: warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory
[root@centos7 ~]#
```

### Fix

Edit `/etc/ssh/ssh_config` and comment out `SendEnv LANG LC_*`.
```
YourMacBook-Pro:~ you$ sudo vi /etc/ssh/ssh_config
##   SendEnv LANG LC_*
```

### Reference

[warning: setlocale: LC_CTYPE: cannot change locale (UTF-8): No such file or directory](https://ma.ttias.be/warning-setlocale-lc_ctype-cannot-change-locale-utf-8-no-such-file-or-directory/)

Have a good work&life! 2022/03 via LinHong

