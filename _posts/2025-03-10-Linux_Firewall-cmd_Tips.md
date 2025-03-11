---
layout: post
title: "Linux firewall-cmd Tips"
category: Linux
tags: Linux firewall-cmd Tips
---

* content
{:toc}

Linux firewall-cmd Tips

Firewalld 是守护进程名，对应命令为firewall-cmd

```
firewall-cmd --help
```





### 常用命令

Firewalld 使用区域（Zone）的概念来划分与系统交互的流量。网络接口被分配给一个或多个区域，每个区域包含允许的端口和服务列表。默认区域也可用于管理与任何区域都不匹配的流量。

```
sudo systemctl enable firewalld
sudo systemctl start firewalld
sudo systemctl stop firewalld
sudo systemctl restart firewalld
sudo systemctl status firewalld
```

查看状态：

```
sudo firewall-cmd --state
```

查看区域和默认区域：

```
sudo firewall-cmd --get-zones
sudo firewall-cmd --get-default-zone
```

当前状态：(修改前可以保存起来)

```
sudo firewall-cmd --list-all
```

允许端口，例如 Oracle 的 `1521` 端口：

```
# 临时添加
sudo firewall-cmd --add-port=1521/tcp
# 永久添加
sudo firewall-cmd --add-port=1521/tcp --permanent
# 使改变生效
sudo firewall-cmd --reload
# 确认生效
sudo firewall-cmd --list-ports

# 删除刚添加1521的端口
sudo firewall-cmd --remove-port=1521/tcp --permanent
-- 此时执行sudo firewall-cmd --list-ports，输出为1521/tcp
# 此时执行sudo firewall-cmd --list-ports，输出为空
sudo firewall-cmd --reload
```

如果系统定义了服务，则可以添加服务，其实和加端口意思一样：

```
$ grep ssh /etc/services
-- sh             22/tcp                          # The Secure Shell (SSH) Protocol
-- ssh             22/udp                          # The Secure Shell (SSH) Protocol
$ sudo firewall-cmd --list-services
$ sudo firewall-cmd --add-service ssh
```

以上端口和服务都是限制目标的，也可以限制源：

```
$ sudo firewall-cmd --zone=internal --add-source=192.168.1.0/24 --permanent
```

### Ref

[Advanced Linux Commands Cheat Sheet](https://developers.redhat.com/cheat-sheets/advanced-linux-commands?intcmp=701f20000012ngPAAQ)



Have a good work&life! 2025/03 via LinHong
