---
layout: post
title: "[原创]Oracle12cR2_创建公用用户"
category: Oracle
tags: Oracle 12c CDB user
---

* content
{:toc}


[原创]Oracle12cR2_创建公用用户

在CDB模式下，公用用户（Common User）和本地用户（Local User）两个概念被引入进来，

公用用户可以在CDB和PDB中同时存在，能够连接ROOT和PDB进行操作；而本地用户则只在特定的PDB中存在，也只能在特定的PDB中执行操作；

在PDB中不能创建公用用户，而在CDB中（CDB$ROOT中）同样不能创建本地用户。







### 





	
~~~ LinHong 2017/09/15 ~~~~
