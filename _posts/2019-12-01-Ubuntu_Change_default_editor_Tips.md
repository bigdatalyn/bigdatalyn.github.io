---
layout: post
title: "Ubuntu Change default editor Tips"
category: Unix
tags: Unix Tips 
---

* content
{:toc}


Ubuntu Change default editor Tips


#### 1. Modify .bashrc

```shell
$ echo export EDITOR=/usr/bin/vim >> ~/.bashrc 
```

#### 2. Modify OS config editor 

```
$ update-alternatives --config editor 
-> 3 (vim.basic)
```

```shell
root@inst-hk01:~# update-alternatives --config editor 
There are 4 choices for the alternative editor (providing /usr/bin/editor).

  Selection    Path                Priority   Status
------------------------------------------------------------
  0            /bin/nano            40        auto mode
  1            /bin/ed             -100       manual mode
  2            /bin/nano            40        manual mode
* 3            /usr/bin/vim.basic   30        manual mode
  4            /usr/bin/vim.tiny    10        manual mode

Press <enter> to keep the current choice[*], or type selection number: 3
root@inst-hk01:~# 
```

#### 3.remove other editors

```shell
$ sudo apt-get remove nano 
```

test 
```shell
$crontab -e
```

