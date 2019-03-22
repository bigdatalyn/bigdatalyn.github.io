---
layout: post
title: "Oracle ADW User Tips"
category: Oracle
tags: Oracle ADW Tips
---

* content
{:toc}

Oracle ADW User Tips

Oracle ADW 用户相关的Tips










### ADW的限制

[Restrictions for Database Features](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/experienced-database-users.html#GUID-B6FB5EFC-4828-43F4-BA63-72DA74FFDB87)


[Restrictions for Database Initialization Parameters](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/experienced-database-users.html#GUID-7CF648C1-0822-4602-8ED1-6F5719D6779E)


[Restrictions for SQL Commands](https://docs-uat.us.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/experienced-database-users.html#GUID-791E7112-07F7-46F0-BD81-777C8FAD83A0)


### ADW User 用户相关的Tips


ADW创建时候时候就有admin用户，这admin用户非常重要。

即使admin密码忘记了或者lock了，可以通过adw的web 管理页面进行reset密码，并且密码强度策列比较高。

追加新的用户的话，通过admin连接之后进行创建并赋予dwrole角色给新用户

	create user adwc_user001 identified by "...密码...";
	grant dwrole to adwc_user001;
	
密码管理策列是360天需要更新，不能使用同一个密码。

dwrole角色有以下权限: 

	参考 -> [Manage User Privileges with Autonomous Data Warehouse](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/manage.html#GUID-50450FAD-9769-4CF7-B0D1-EC14B465B873)

	CREATE ANALYTIC VIEW
	CREATE ATTRIBUTE DIMENSION
	ALTER SESSION
	CREATE HIERARCHY
	CREATE JOB
	CREATE MINING MODEL
	CREATE PROCEDURE
	CREATE SEQUENCE
	CREATE SESSION
	CREATE SYNONYM
	CREATE TABLE
	CREATE TRIGGER
	CREATE TYPE
	CREATE VIEW
	READ,WRITE ON directory DATA_PUMP_DIR
	EXECUTE privilege on the PL/SQL package DBMS_CLOUD

一般赋予新用户可以查看(select)  v$mystat /  v$statname 的权限，这样可以查看sql执行时候详细的统计信息,如下:

	SQL>
	SELECT
			s.NAME
		   ,m.VALUE
	  FROM v$mystat m, v$statname s
	 WHERE m.STATISTIC# = s.STATISTIC#
	   AND s.NAME IN (
			 'physical read total bytes'
			,'physical write total bytes'
			,'cell physical IO bytes eligible for predicate offload'
			,'cell physical IO interconnect bytes'
			,'physical read total IO requests'
			,'cell flash cache read hits'
			,'cell IO uncompressed bytes'
			,'cell physical IO interconnect bytes returned by smart scan'
			,'cell physical IO bytes saved by storage index'
			,'cell physical IO bytes sent directly to DB node to balanceCPU'
	)
	 18  ;

	NAME                                                              VALUE
	------------------------------------------------------------ ----------
	physical read total IO requests                                    1443
	physical read total bytes                                     704368640
	physical write total bytes                                   3.1907E+10
	cell physical IO interconnect bytes                           731907584
	cell physical IO bytes eligible for predicate offload        3.1898E+10
	cell physical IO bytes saved by storage index                         0
	cell physical IO interconnect bytes returned by smart scan            0
	cell IO uncompressed bytes                                            0
	cell flash cache read hits                                         1268

	9 rows selected.

	SQL>

Etc.




	
Have a good work&life! 2019/03 via LinHong



