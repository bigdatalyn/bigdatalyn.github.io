---
layout: post
title: "Oracle Linux yum/wget proxy Tips"
category: Oracle
tags: Oracle Linux Tips
---

* content
{:toc}


Oracle Linux yum/wget proxy Tips


Linux Yum/Wget proxy setting




### proxy in yum

Edit /etc/yum.conf, add proxy value.

```shell

vi /etc/yum.conf
proxy=http://proxy.xxx.xxx:pp

```

### proxy in wget

Edit /etc/wgetrc, add proxy server value.

```shell

vi /etc/wgetrc

http_proxy=http://proxy.xxx.xxx:pp/
https_proxy=http://proxy.xxx.xxx:pp/
ftp_proxy=http://proxy.xxx.xxx:pp/

```


Have a good work&life! 2019/09 via LinHong




