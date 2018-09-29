---
layout: post
title: "Linux SSH Tips"
category: Unix
tags: SSH Tips
---

* content
{:toc}




Linux SSH Tips 防止连接掉线




有些时候隧道会因为一些原因通信不畅而卡死.

例如：由于传输数据量太大，被路由器带入stalled状态。这种时候，往往SSH客户端并不退出，而是卡死在那里。

一种应对方法是，使用SSH客户端的ServerAliveInterval和ServerAliveCountMax选项。 

ServerAliveInterval会在隧道无通信后的一段设置好的时间后发送一个请求给服务器要求服务器响应。

如果服务器在 ServerAliveCountMax次请求后都没能响应，那么SSH客户端就自动断开连接并退出，将控制权交给你的监控程序。

这两个选项的设置方法分别是在ssh时加入-o ServerAliveInterval=n和-o ServerAliveCountMax=m。其中n, m可以自行定义。


StrictHostKeyChecking=no

"StrictHostKeyChecking"如果设为"yes"，ssh将不会自动把计算机的密匙加入"$HOME/.ssh/known_hosts"文件，且一旦计算机的密匙发生了变化，就拒绝连接。



Have a good life! 2018/09 via LinHong



