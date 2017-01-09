---
layout: post
title: "[原创]db2look生成测试数据库"
date:   2016-05-21 14:35:00
category: DB2
tags: DB2 db2look
---

* content
{:toc}

如果能够创建结构类似另一数据库的数据库，有时会非常有利。
例如，在生产环境系统上，sql性能出现问题，调查需要调整之后性能的比较，可以创建结构类似生产数据库的数据库，这样非常的便利和没有风险。




### db2look生成测试数据库

如果能够创建结构类似另一数据库的数据库，有时会非常有利。

例如，在生产环境系统上，sql性能出现问题，调查需要调整之后性能的比较，可以创建结构类似生产数据库的数据库，这样非常的便利和没有风险。

首先 db2look 工具来抽取必需的 DDL 语句，通过这 DDL 语句在一个数据库中再现另一个数据库中的数据库对象所需的对象。

再通过 db2look 生成将统计信息从一个数据库复制到另一个数据库所需的 SQL 语句，以及复制数据库配置、数据库管理器配置和注册表变量所需的语句。

所以在新数据库可能未包含与原始数据库完全相同的一组数据，但您仍然要对两个系统选择相同的访问计划，是不是很方便的对新的数据库进行测试呢？

通过如下步骤，可以很简单的实现我们想要的结果：


#### 1.创建TEST数据库和用db2look -h查看语法

	[db2inst1@oc6748481478 ~]$ db2 list db directory

	 System Database Directory

	 Number of entries in the directory = 1

	Database 1 entry:

	 Database alias                       = SAMPLE
	 Database name                        = SAMPLE
	 Local database directory             = /dbhome/db2inst1
	 Database release level               = 10.00
	 Comment                              =
	 Directory entry type                 = Indirect
	 Catalog database partition number    = 0
	 Alternate server hostname            =
	 Alternate server port number         =

	[db2inst1@oc6748481478 ~]$ db2 create database TEST

	DB20000I  The CREATE DATABASE command completed successfully.
	[db2inst1@oc6748481478 ~]$ 
	[db2inst1@oc6748481478 ~]$ db2look -h
	db2look: Generates DDLs to recreate the objects defined in a database

	Syntax: db2look -d DBname [-e] [-xs] [-xdir Path] [-u Creator] [-z Schema]

	～

	 -- This generates DDL statements for all tables created by user WALID
	 -- DDLs for all federated objects created by user WALID that apply to the server S1 will also be generated
	 -- The db2look output is sent to a file called db2look.sql 

	[db2inst1@oc6748481478 ~]$ 

#### 2.db2look 抽取数据库中的表DDL

通过-e来抽取DDL,解释如下：

        -e: Extract DDL file needed to duplicate database
            This option generates a script containing DDL statements
            This script can be ran against another database to recreate database objects
            This option can be used in conjunction with the -m option

在生产环境的数据库执行：

	[db2inst1@oc6748481478 ~]$ db2look -d sample -e > test.ddl
	-- No userid was specified, db2look tries to use Environment variable USER
	-- USER is: DB2INST1
	-- Creating DDL for table(s)
	[db2inst1@oc6748481478 ~]$ 

注： 如果还想对用户定义的空间、数据库分区组和缓冲池生成 DDL，那么在上述命令中 -e 的后面添加 -l 标志。将不会抽取缺省数据库分区组、缓冲池和表空间。这是因为在缺省情况下它们已经存在于每个数据库中。如果希望模拟它们，那么必须手动对其进行更改。

编辑 test.ddl ，把连接的对象数据库改为测试数据库名TEST，如下：

	[db2inst1@oc6748481478 ~]$ cat test.ddl | more
	-- This CLP file was created using DB2LOOK Version "10.5" 
	-- Timestamp: Wed 25 May 2016 02:54:35 PM CST
	-- Database Name: SAMPLE         
	-- Database Manager Version: DB2/LINUXX8664 Version 10.5.5 
	-- Database Codepage: 1208
	-- Database Collating Sequence is: IDENTITY
	-- Alternate collating sequence(alt_collate): null
	-- varchar2 compatibility(varchar2_compat): OFF


	--CONNECT TO SAMPLE;
	CONNECT TO TEST;

	------------------------------------------------
	-- DDL Statements for Schemas
	------------------------------------------------

执行db2 -tvf test.ddl 导入ddl

	[db2inst1@oc6748481478 ~]$ db2 -tvf test.ddl
	CONNECT TO TEST

	   Database Connection Information

	 Database server        = DB2/LINUXX8664 10.5.5
	 SQL authorization ID   = DB2INST1
	 Local database alias   = TEST


	CREATE SCHEMA "DB2INST1"
	DB20000I  The SQL command completed successfully.

	～省略～


如果是部分表的话也是可以，参考如下：

	db2look -d sample -e -t staff org > staff_org.ddl

#### 3.db2look 抽取数据库中的统计信息

使用 db2look 来从生产数据库收集统计信息并将它们放在测试数据库中。通过对可更新的目录表的 SYSSTAT 集合创建 UPDATE 语句并对所有表创建 RUNSTATS 命令来执行此操作。

db2look的模仿方式（指定 -m 选项） 解释如下：

        -m: Run the db2look utility in mimic mode
            This option generates a script containing SQL UPDATE statements
            These SQL UPDATE statements capture all the statistics
            This script can be run against another database to replicate the original one
            When the -m option is specified, the -p,-g and -s options are ignored
            -c: Do not generate COMMIT statements for mimic
                This option will be ignored unless -m or -e is specified
                CONNECT and CONNECT RESET statements will not be generated as well
                COMMIT is omitted. Explicit commit is required after executing the script.
            -r: Do not generate RUNSTATS statements for mimic
                The default is RUNSTATS. This option is only valid when -m is specified

注意-c和-r的内容，是否需要考虑生成多的日志，或者是不需要runstats的语句？

如果比较清楚涉及的对象表，是否可以加-z $SCHEMA -t $TABLE 来指定schema和table呢？

执行如下,保存到stats.dml文件：

	[db2inst1@oc6748481478 ~]$ db2look -d sample -m > stats.dml
	-- No userid was specified, db2look tries to use Environment variable USER
	-- USER is: DB2INST1
	-- Running db2look in mimic mode
	[db2inst1@oc6748481478 ~]$ ls -ltr stats.dml
	-rw-------. 1 db2inst1 db2inst1 2846694 May 25 15:03 stats.dml
	[db2inst1@oc6748481478 ~]$ 
	[db2inst1@oc6748481478 ~]$ head -40 stats.dml 
	-- This CLP file was created using DB2LOOK Version "10.5" 
	-- Timestamp: Wed 25 May 2016 03:03:34 PM CST
	-- Database Name: SAMPLE         
	-- Database Manager Version: DB2/LINUXX8664 Version 10.5.5 
	-- Database Codepage: 1208
	-- Database Collating Sequence is: IDENTITY
	-- Alternate collating sequence(alt_collate): null
	-- varchar2 compatibility(varchar2_compat): OFF


	CONNECT TO SAMPLE;

	---------------------------------------------

	-- Mimic Tables, Columns, Indexes and Column Distribution

	---------------------------------------------

	-- Mimic table ACT 

	RUNSTATS ON TABLE "DB2INST1"."ACT" 
		WITH DISTRIBUTION ON COLUMNS (
			"ACTDESC" NUM_FREQVALUES 10 NUM_QUANTILES 18,
			"ACTKWD" NUM_FREQVALUES 10 NUM_QUANTILES 18,
			"ACTNO" NUM_FREQVALUES 10 NUM_QUANTILES 18);

	UPDATE SYSSTAT.INDEXES
	SET NLEAF=-1,
	    NLEVELS=-1,
	    FIRSTKEYCARD=-1,
	    FIRST2KEYCARD=-1,
	    FIRST3KEYCARD=-1,
	    FIRST4KEYCARD=-1,
	    FULLKEYCARD=-1,
	    CLUSTERFACTOR=-1,
	    CLUSTERRATIO=-1,
	    SEQUENTIAL_PAGES=-1,
	    PAGE_FETCH_PAIRS='',
	    DENSITY=-1,
	    AVERAGE_SEQUENCE_GAP=-1,
	[db2inst1@oc6748481478 ~]$ 


修改stats.dml的数据库对象名然后执行 db2 -tvf stats.dml

如果数据库大的话，统计信息也是比较大，执行也比较花时间！

#### 4.db2look 抽取配置参数和环境变量

优化器根据统计信息、配置参数、注册表变量和环境变量来选择计划。可将统计信息与 db2look 一起使用来生成必需的配置更新和设置语句。此操作使用 -f 选项完成。

db2look -d sample -f > config.txt

然后修改connect to 的数据库名

	[db2inst1@oc6748481478 ~]$ db2look -d sample -f > config.txt
	-- No userid was specified, db2look tries to use Environment variable USER
	-- USER is: DB2INST1
	[db2inst1@oc6748481478 ~]$ 
	[db2inst1@oc6748481478 ~]$ vi config.txt
	[db2inst1@oc6748481478 ~]$ cat config.txt 
	-- This CLP file was created using DB2LOOK Version "10.5" 
	-- Timestamp: Wed 25 May 2016 03:15:49 PM CST
	-- Database Name: SAMPLE         
	-- Database Manager Version: DB2/LINUXX8664 Version 10.5.5 
	-- Database Codepage: 1208
	-- Database Collating Sequence is: IDENTITY
	-- Alternate collating sequence(alt_collate): null
	-- varchar2 compatibility(varchar2_compat): OFF

	-- CONNECT TO SAMPLE;
	CONNECT TO TEST;

	--------------------------------------------------------
	-- Database and Database Manager configuration parameters
	--------------------------------------------------------

	UPDATE DBM CFG USING cpuspeed 3.306409e-07;
	UPDATE DBM CFG USING intra_parallel NO;
	UPDATE DBM CFG USING federated NO;
	UPDATE DBM CFG USING fed_noauth NO;

	UPDATE DB CFG FOR SAMPLE USING locklist 4096;
	UPDATE DB CFG FOR SAMPLE USING dft_degree 1;
	UPDATE DB CFG FOR SAMPLE USING maxlocks 10;
	UPDATE DB CFG FOR SAMPLE USING avg_appls 1;
	UPDATE DB CFG FOR SAMPLE USING stmtheap 8192;
	UPDATE DB CFG FOR SAMPLE USING dft_queryopt 5;
	UPDATE DB CFG FOR SAMPLE USING cur_commit ON;

	---------------------------------
	-- Environment Variables settings
	---------------------------------


	COMMIT WORK;

	CONNECT RESET;

	TERMINATE;

	[db2inst1@oc6748481478 ~]$ 
	[db2inst1@oc6748481478 ~]$ db2 -tvf config.txt
	CONNECT TO TEST

	   Database Connection Information

	 Database server        = DB2/LINUXX8664 10.5.5
	 SQL authorization ID   = DB2INST1
	 Local database alias   = TEST


	UPDATE DBM CFG USING cpuspeed 3.306409e-07
	DB20000I  The UPDATE DATABASE MANAGER CONFIGURATION command completed 
	successfully.

	UPDATE DBM CFG USING intra_parallel NO
	DB20000I  The UPDATE DATABASE MANAGER CONFIGURATION command completed 
	successfully.

	UPDATE DBM CFG USING federated NO
	DB20000I  The UPDATE DATABASE MANAGER CONFIGURATION command completed 
	successfully.

	UPDATE DBM CFG USING fed_noauth NO
	DB20000I  The UPDATE DATABASE MANAGER CONFIGURATION command completed 
	successfully.

	UPDATE DB CFG FOR SAMPLE USING locklist 4096
	DB20000I  The UPDATE DATABASE CONFIGURATION command completed successfully.

	UPDATE DB CFG FOR SAMPLE USING dft_degree 1
	DB20000I  The UPDATE DATABASE CONFIGURATION command completed successfully.

	UPDATE DB CFG FOR SAMPLE USING maxlocks 10
	DB20000I  The UPDATE DATABASE CONFIGURATION command completed successfully.

	UPDATE DB CFG FOR SAMPLE USING avg_appls 1
	DB20000I  The UPDATE DATABASE CONFIGURATION command completed successfully.

	UPDATE DB CFG FOR SAMPLE USING stmtheap 8192
	DB20000I  The UPDATE DATABASE CONFIGURATION command completed successfully.

	UPDATE DB CFG FOR SAMPLE USING dft_queryopt 5
	DB20000I  The UPDATE DATABASE CONFIGURATION command completed successfully.

	UPDATE DB CFG FOR SAMPLE USING cur_commit ON
	DB20000I  The UPDATE DATABASE CONFIGURATION command completed successfully.

	COMMIT WORK
	DB20000I  The SQL command completed successfully.

	CONNECT RESET
	DB20000I  The SQL command completed successfully.

	TERMINATE
	DB20000I  The TERMINATE command completed successfully.

	[db2inst1@oc6748481478 ~]$ 


	
---

