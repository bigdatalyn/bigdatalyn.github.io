---
layout: post
title: "Oracle 23c ock-free reservation Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 23c ock-free reservation Tips

Lock-Free Reservation这项特性可用于实现更细粒度的并发控制。
它的本质是相对于传统的行锁，能以更细的粒度（即列值级别）进行锁定，从而减少锁争用，提高并发性能。






### Lock-free reservation


[Lock-free reservation in 23c: how to start with](https://blogs.oracle.com/coretec/post/lock-free-reservation-in-23c)



例如，当库存充足时，数据仅在提交时锁定，并有可能改善最终用户体验以及事务的吞吐量。

  关于Lock-Free Reservation的目前使用限制：
  该特性仅限于特定场景，主要是经常需要更新特定列而非整行的场景。
  更新特定列也不能随便，只能使用原值增加或减少的方式。
  支持的数据类型有限：仅支持数值型数据列，不适用于所有数据类型。
  只在23ai数据库版本中提供支持。


### Referece




Have a good work&life! 2024/06 via LinHong


