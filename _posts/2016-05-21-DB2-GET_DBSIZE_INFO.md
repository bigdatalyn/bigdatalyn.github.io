---
layout: post
title: "[原创]关于GET_DBSIZE_INFO的一些事"
date:   2016-05-21 09:35:00
category: DB2
tags: DB2 GET_DBSIZE_INFO
---

* content
{:toc}

关于GET_DBSIZE_INFO的一些事：除了查看数据库大小外，还有那些事？





### 关于GET_DBSIZE_INFO的一些事

检查DB2 Healthy Check中的public权限，其中public对 SYSTOOLS 系统schema有 CREATEINAUTH 权限，引发了对这 SYSTOOLS 表的查看。


	[db2inst1@oc6748481478 ~]$ db2 "select * from syscat.schemaauth where grantee='PUBLIC'" | tr -s " " 

	GRANTOR GRANTORTYPE GRANTEE GRANTEETYPE SCHEMANAME ALTERINAUTH CREATEINAUTH DROPINAUTH
	-------------------------------------------------------------------------------------------------------------------------------- ----------- -------------------------------------------------------------------------------------------------------------------------------- ----------- -------------------------------------------------------------------------------------------------------------------------------- ----------- ------------ ----------
	SYSIBM S PUBLIC G SYSPUBLIC N Y Y 
	SYSIBM S PUBLIC G NULLID N Y N 
	SYSIBM S PUBLIC G SQLJ N Y N 
	SYSIBM S PUBLIC G DB2INST1 N Y N 
	SYSIBM S PUBLIC G SYSTOOLS N Y N 

	 5 record(s) selected.

	[db2inst1@oc6748481478 ~]$ 

对于 systools模式下有那些表呢？

	[db2inst1@oc6748481478 ~]$ db2 list tables for schema systools

	Table/View                      Schema          Type  Creation time             
	------------------------------- --------------- ----- --------------------------
	STMG_DBSIZE_INFO                SYSTOOLS        T     2016-05-20-12.34.55.922334

	  1 record(s) selected.

	[db2inst1@oc6748481478 ~]$ 

对于这 STMG_DBSIZE_INFO表描述，在inforcenter没找到相关的表信息，但通过select可以很容易的想象到这表对象保存的内容是什么。

另外关于对于这systools的public权限剥夺可以通过如下语句来完成：

db2 revoke CREATEIN on SCHEMA SYSTOOLS from public   

	[db2inst1@oc6748481478 ~]$ db2 revoke CREATEIN on SCHEMA SYSTOOLS from public   
	DB20000I  The SQL command completed successfully.
	[db2inst1@oc6748481478 ~]$ db2 "select * from syscat.schemaauth where grantee='PUBLIC'" | tr -s " " 

	GRANTOR GRANTORTYPE GRANTEE GRANTEETYPE SCHEMANAME ALTERINAUTH CREATEINAUTH DROPINAUTH
	-------------------------------------------------------------------------------------------------------------------------------- ----------- -------------------------------------------------------------------------------------------------------------------------------- ----------- -------------------------------------------------------------------------------------------------------------------------------- ----------- ------------ ----------
	SYSIBM S PUBLIC G SYSPUBLIC N Y Y 
	SYSIBM S PUBLIC G NULLID N Y N 
	SYSIBM S PUBLIC G SQLJ N Y N 
	SYSIBM S PUBLIC G DB2INST1 N Y N 

	 4 record(s) selected.

	[db2inst1@oc6748481478 ~]$ 


#### 查看数据库大小的方法

可以通过 db2 "call GET_DBSIZE_INFO (?,?,?,0)"  查看数据库大小，另外每次执行一次 call GET_DBSIZE_INFO (?,?,?,0) 都会刷新数据到 systools.STMG_DBSIZE_INFO。参考如下：


	[db2inst1@oc6748481478 ~]$ db2 "call GET_DBSIZE_INFO (?,?,?,0)"

	  Value of output parameters
	  --------------------------
	  Parameter Name  : SNAPSHOTTIMESTAMP
	  Parameter Value : 2016-05-20-11.20.00.763848

	  Parameter Name  : DATABASESIZE
	  Parameter Value : 182951936

	  Parameter Name  : DATABASECAPACITY
	  Parameter Value : 41582854144

	  Return Status = 0
	[db2inst1@oc6748481478 ~]$ db2 "select * from systools.STMG_DBSIZE_INFO"

	SNAPSHOT_TIMESTAMP         DB_SIZE              DB_CAPACITY         
	-------------------------- -------------------- --------------------
	2016-05-20-11.20.00.763848            182951936          41582854144

	  1 record(s) selected.

	[db2inst1@oc6748481478 ~]$ db2 "call GET_DBSIZE_INFO (?,?,?,0)"

	  Value of output parameters
	  --------------------------
	  Parameter Name  : SNAPSHOTTIMESTAMP
	  Parameter Value : 2016-05-20-11.20.19.931889

	  Parameter Name  : DATABASESIZE
	  Parameter Value : 182951936

	  Parameter Name  : DATABASECAPACITY
	  Parameter Value : 41582694400

	  Return Status = 0
	[db2inst1@oc6748481478 ~]$ db2 "select * from systools.STMG_DBSIZE_INFO"

	SNAPSHOT_TIMESTAMP         DB_SIZE              DB_CAPACITY         
	-------------------------- -------------------- --------------------
	2016-05-20-11.20.19.931889            182951936          41582694400

	  1 record(s) selected.

	[db2inst1@oc6748481478 ~]$ 


可见 systools.STMG_DBSIZE_INFO 表是缓存上次执行call 函数的结果

#### 关于迁移中systools的 STMG_DBSIZE_INFO 

关于systools模式的表，在用db2look+db2move迁移数据时候，需要注意的是 db2look 并不能抽取出 systools 的 STMG_DBSIZE_INFO 的表结构。

其实在数据迁移过程中，并不需要导入导出 STMG_DBSIZE_INFO 的数据，重新在目标段执行下 call GET_DBSIZE_INFO (?,?,?,0) 会自动生成 STMG_DBSIZE_INFO 表和数据


#### 参考资料

[SYSTOOLSPACE and SYSTOOLSTMPSPACE table spaces](https://www.ibm.com/support/knowledgecenter/SSEPGG_10.5.0/com.ibm.db2.luw.admin.gui.doc/doc/c0023713.html?lang=en)

	The SYSTOOLSPACE table space is a user data table space used by the DB2® administration tools and some SQL administrative routines for storing historical data and configuration information. 

	The SYSTOOLSPACE table space is created the first time any of the above are used. 

	The db2look command, administrative task scheduler, ALTOBJ,ADMIN_COPY_SCHEMA, and ADMIN_DROP_SCHEMA procedures are exceptions; 

	the SYSTOOLSPACE table space must be created before you can use them.

	The SYSTOOLSTMPSPACE table space is a user temporary table space used by the REORGCHK_TB_STATS, REORGCHK_IX_STATS and the ADMIN_CMD procedures for storing temporary data. The SYSTOOLSTMPSPACE table space will be created the first time any of these procedures is invoked (except for ADMIN_CMD). 


[GET_DBSIZE_INFO procedure](https://www.ibm.com/support/knowledgecenter/SSEPGG_10.5.0/com.ibm.db2.luw.sql.rtn.doc/doc/r0011863.html?cp=SSEPGG_10.5.0%2F3-6-1-3-19-6&lang=en)

[How to calculate the size of a DB2 database](http://g01zciwas018.ahe.pok.ibm.com/support/dcf/preview.wss?host=g01zcidbs003.ahe.pok.ibm.com&db=support/swg/dmgtech.nsf&unid=C0B8A6A7DD22D5468525711E00456026&taxOC=SSEPGG&MD=2014/07/11%2009:07:15&sid=)

	Question

	This technote describes how to use the GET_DBSIZE_INFO procedure to calculate the size and maximum capacity of a database in DB2® for Linux®, UNIX® and Windows®.
	Answer

	If you want to calculate the size and maximum capacity of your database, you can use the procedureGET_DBSIZE_INFO.
	To execute this procedure you should follow these three steps:

	    Connect to the database for which you want to know the size and maximum capacity.
	    Execute the procedure GET_DBSIZE_INFO.
	    Close the connection.


	For the second step, you should take into account the syntax of the procedure:
	db2 call GET_DBSIZE_INFO (?,?,?, refresh-window )

	where the first 3 parameters are output parameters, and the refresh-window is an input parameter of type INTEGER that specifies the number of minutes until the cached values for database size and capacity are to be refreshed.

	Furthermore, to valid the above data, you can use db2pd -tablespaces output, by adding up all the Tablespace Statistics: UsedPgs for all the containers

	Refer to the documentation links below for examples of the output from this procedure in DB2 UDB . 


	
---

