---
layout: post
title: "Oracle 修改sys密码和登录 tips"
category: Oracle
tags: Oracle sqlplus
---

* content
{:toc}




Oracle 修改sys密码和登录 tips


Tips:
	
	注意：12c的密码规则有些严格参考其他文档进行密码文件的版本升级可以无视严格的密码规则要求
	
	orapwd file='$ORACLE_HOME/dbs/orapworcl' password=zaq12wsx@#
	
	修改为特殊密码： zaq12wsx@#
	
	Linux上sqlplus登录可以使用： 
	''单引号将账号密码放置在内，""双引号放置密码，然后再在单引号外面输入服务名称
	如：
	sqlplus 'sys/"zaq12wsx@#"' as sysdba
	


To be continue....

Have a good life! 2018/07 via LinHong


