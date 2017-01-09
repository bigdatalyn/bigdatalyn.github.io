---
layout: post
title: "DB2中常用清空大表的方法"
date:   2016-08-22 11:42:00
category: DB2
tags: DB2 
---

* content
{:toc}


DB2中常用清空大表数据的方法有哪些？通过测试总结有...





### 1.delete语句

	delete from <Table Name>;

	delete from <Table Name> where XXXX;

delete需要注意的活动日志需要提前估算，会不会log 满的问题，变通方法是通过where条件去批量删除，这种方法删除是记日志的，出问题restore和前滚操作都是支持的。

truncate和delete大量数据的速度好像差不多.

truncate 在V9.7之后增加了这语句，turncate和delete的区别在于：

	The TRUNCATE statement can provide the following advantages over a　DELETE statement:
	    The TRUNCATE statement can ignore delete triggers
	    The TRUNCATE statement can perform an immediate commit
	    The TRUNCATE statement can keep storage allocated for the table


[DB2 日常维护技巧，第 4 部分 ](http://www.ibm.com/developerworks/cn/data/library/techarticles/dm-0812chengy2/)
	如何快速清空一个大表中的所有数据
	在 DB2 数据库中，如果想快速清空一张大表（类似在 ORACLE 中使用 TRUNCATE TABLE 快速清空一张大表），有两种方法：
	1.使用 “ ALTER TABLE 表名 ACTIVATE NOT LOGGED INITIALLY WITH EMPTY TABLE ” 命令。
	2.使用空文件为数据文件导入并替换表中数据。
	在 windows 平台，可以先使用 EXPORT 导出一个空文件，再使用 IMPORT 命令从空文件中导入并替换该表中数据，比如：
	export to test.ixf of ixf messages log.txt select * from test where 1=2
	import from test.ixf of ixf messages log1.txt replace into test
	在 UNIX 平台，除了使用 A 方法以外，还可以使用从空（NULL）中导入并替换该表数据，比如：
	import from /home/null of del replace into test
	如果使用“ DELETE TABLE ”命令删除整个大表中的数据，由于这个命令采用逐条删除，并把该操作记入活动的交易日志，将会耗费大量的活动日志空间，有可能造成数据库交易日志已满错 误，另外，这样删除大表数据耗费的时间也很长。对于属于 DMS 表空间的表来说，删除命令逐条扫描记录，所占的记录空间仍标记为该表所用，而不立即释放空间，需要用 REORG 命令才可以释放剩余空间。
	使用以上两种方法快速清空一张大表，将使 DB2 交易日志只记录该条命令，并立即释放所占用的空间，而不会像删除命令一样逐条扫描记录，从而节省大量的数据库交易日志和处理时间。用 LOAD 命令加 REPLACE 参数可以达到类似 IMPORT 命令加 REPLACE 的效果，但是由于 LOAD 本身不记日志，所以对于可恢复的数据库，LOAD 完成后建议马上做一下联机备份的，相比之下，IMPORT 命令加 REPLACE 操作上比较简单一些。 

### 2. alter table <Table Name>  activate not logged initially with empty table;

不计日志，速度最快，前提是需要设置表为：activate not logged initially 

	db2inst2:/dbhome/db2inst2$ db2 "create table test03 (id int not null primary key,name varchar(20)) not logged initially"
	DB20000I  The SQL command completed successfully.
	db2inst2:/dbhome/db2inst2$ db2 "insert into test03 values (1,'test03')";
	DB20000I  The SQL command completed successfully.
	db2inst2:/dbhome/db2inst2$ db2 commit;
	DB20000I  The SQL command completed successfully.
	db2inst2:/dbhome/db2inst2$ db2 "select * from test03";

	ID          NAME                
	----------- --------------------
		  1 test03              

	  1 record(s) selected.

	db2inst2:/dbhome/db2inst2$ db2 alter table test03 activate not logged initially with empty table;
	DB20000I  The SQL command completed successfully.
	db2inst2:/dbhome/db2inst2$ db2 "select * from test03"

	ID          NAME                
	----------- --------------------

	  0 record(s) selected.

	db2inst2:/dbhome/db2inst2$ 



	
### 3.load/import 

load from /dev/null of del replace into <Table Name> nonrecoverable;

import from /dev/null of del replace into <Table Name>;

测试如下：

	db2inst1:/dblogs/db2dump/db2inst1$ db2 list tablespaces | grep -ip user
	表スペース ID = 2
	名前 = USERSPACE1
	タイプ = データベース管理スペース
	内容 = すべての永続データ。 LARGE 表スペース。
	状態 = 0x0000
	詳しい説明:
	正常

	db2inst1:/dblogs/db2dump/db2inst1$ db2 "insert into test01 values (1,'test01')";
	DB20000I SQL コマンドが正常に完了しました。
	db2inst1:/dblogs/db2dump/db2inst1$ db2 "insert into test01 values (2,'test01')";
	DB20000I SQL コマンドが正常に完了しました。
	db2inst1:/dblogs/db2dump/db2inst1$ db2 commit;
	DB20000I SQL コマンドが正常に完了しました。
	db2inst1:/dblogs/db2dump/db2inst1$ db2 "select * from test01";

	ID NAME 
	----------- ----------
	1 test01 
	2 test01 

	2 レコードが選択されました。

	db2inst1:/dblogs/db2dump/db2inst1$ db2 load from /dev/null of del replace into test01;　　　　　　---------------  nonrecoverableを使用しない場合
	SQL3039W DATA BUFFER の LOAD で使用できるメモリーは全 LOAD
	並列処理を禁止します。 "3" のロード並列処理が使用されます。

	SQL3109N ユーティリティーが、ファイル "/dev/null"
	からデータのロードを開始しています。

	SQL3500W ユーティリティーが "2016-08-24 11:37:48.952083" に "LOAD"
	フェーズを開始しています。

	SQL3519W ロード整合点が開始されました。 入力レコード・カウント = "0"

	SQL3520W ロード整合点が成功しました。

	SQL3110N ユーティリティーが処理を完了しました。 "0"
	行が、入力ファイルから読み取られました。

	SQL3519W ロード整合点が開始されました。 入力レコード・カウント = "0"

	SQL3520W ロード整合点が成功しました。

	SQL3515W ユーティリティーは、"2016-08-24 11:37:48.984827" に "LOAD"
	フェーズを完了しました。

	SQL3500W ユーティリティーが "2016-08-24 11:37:48.987031" に "BUILD"
	フェーズを開始しています。

	SQL3213I 索引付けモードは "REBUILD" です。

	SQL3515W ユーティリティーは、"2016-08-24 11:37:49.053678" に "BUILD"
	フェーズを完了しました。


	読み込まれた行数 = 0
	スキップされた行数 = 0
	ロードされた行数 = 0
	拒否された行数 = 0
	削除された行数 = 0
	コミットされた行数 = 0

	db2inst1:/dblogs/db2dump/db2inst1$ db2 "select * from test01"

	ID NAME 
	----------- ----------

	0 レコードが選択されました。

	db2inst1:/dblogs/db2dump/db2inst1$ db2 list tablespaces | grep -ip user;
	表スペース ID = 2
	名前 = USERSPACE1
	タイプ = データベース管理スペース
	内容 = すべての永続データ。 LARGE 表スペース。
	状態 = 0x0020
	詳しい説明:
	バックアップ・ペンディング     ---------------------------------------- テーブルスペースが不正常、Backup Pendingとなり、強制バックアップしないと使用できない状態です。

	db2inst1:/dblogs/db2dump/db2inst1$ db2 "insert into test01 values (2,'test01')"; 
	DB21034E コマンドが、有効なコマンド行プロセッサー・コマンドでないため、 SQL
	ステートメントとして処理されました。 SQL 処理中に、次のエラーが返されました。
	SQL0290N 表スペース・アクセスが許されていません。 SQLSTATE=55039
	db2inst1:/dblogs/db2dump/db2inst1$   
	db2inst1:/dblogs/db2dump/db2inst1$ db2 "insert into staff values (121,'lin',84,'clerk',5,40000,188.00)";
	DB21034E コマンドが、有効なコマンド行プロセッサー・コマンドでないため、 SQL
	ステートメントとして処理されました。 SQL 処理中に、次のエラーが返されました。
	SQL0290N 表スペース・アクセスが許されていません。 SQLSTATE=55039
	db2inst1:/dblogs/db2dump/db2inst1$  


	db2inst1:/dblogs/db2dump/db2inst1$ db2 "backup db sample tablespace(userspace1) online to /dbhome/db2inst1/";

	バックアップは成功しました。 このバックアップ・イメージのタイム・スタンプは
	20160824114408 です。

	db2inst1:/dblogs/db2dump/db2inst1$ db2 connect to sample

	データベース接続情報

	データベース・サーバー = DB2/AIX64 10.1.5
	SQL 許可 ID = DB2INST1
	ローカル・データベース別名 = SAMPLE

	db2inst1:/dblogs/db2dump/db2inst1$ db2 list tablespaces | grep -ip user 
	表スペース ID = 2
	名前 = USERSPACE1
	タイプ = データベース管理スペース
	内容 = すべての永続データ。 LARGE 表スペース。
	状態 = 0x0000
	詳しい説明:
	正常

	db2inst1:/dblogs/db2dump/db2inst1$ db2 "insert into staff values (121,'lin',84,'clerk',5,40000,188.00)";
	DB20000I SQL コマンドが正常に完了しました。
	db2inst1:/dblogs/db2dump/db2inst1$ db2 commit;
	DB20000I SQL コマンドが正常に完了しました。
	db2inst1:/dblogs/db2dump/db2inst1$ db2 "insert into test01 values (2,'test01')"; 
	DB20000I SQL コマンドが正常に完了しました。
	db2inst1:/dblogs/db2dump/db2inst1$ db2 commit;
	DB20000I SQL コマンドが正常に完了しました。
	db2inst1:/dblogs/db2dump/db2inst1$ 
	db2inst1:/dblogs/db2dump/db2inst1$ db2 list tablespaces | grep -ip user
	表スペース ID = 2
	名前 = USERSPACE1
	タイプ = データベース管理スペース
	内容 = すべての永続データ。 LARGE 表スペース。
	状態 = 0x0000
	詳しい説明:
	正常

	db2inst1:/dblogs/db2dump/db2inst1$ db2 load from /dev/null of del replace into test01 nonrecoverable;　　　　　　---------------  nonrecoverableを使用する場合
	SQL3039W DATA BUFFER の LOAD で使用できるメモリーは全 LOAD
	並列処理を禁止します。 "3" のロード並列処理が使用されます。

	SQL3109N ユーティリティーが、ファイル "/dev/null"
	からデータのロードを開始しています。

	SQL3500W ユーティリティーが "2016-08-24 11:49:32.217711" に "LOAD"
	フェーズを開始しています。

	SQL3519W ロード整合点が開始されました。 入力レコード・カウント = "0"

	SQL3520W ロード整合点が成功しました。

	SQL3110N ユーティリティーが処理を完了しました。 "0"
	行が、入力ファイルから読み取られました。

	SQL3519W ロード整合点が開始されました。 入力レコード・カウント = "0"

	SQL3520W ロード整合点が成功しました。

	SQL3515W ユーティリティーは、"2016-08-24 11:49:32.269968" に "LOAD"
	フェーズを完了しました。

	SQL3500W ユーティリティーが "2016-08-24 11:49:32.272314" に "BUILD"
	フェーズを開始しています。

	SQL3213I 索引付けモードは "REBUILD" です。

	SQL3515W ユーティリティーは、"2016-08-24 11:49:32.346863" に "BUILD"
	フェーズを完了しました。


	読み込まれた行数 = 0
	スキップされた行数 = 0
	ロードされた行数 = 0
	拒否された行数 = 0
	削除された行数 = 0
	コミットされた行数 = 0

	db2inst1:/dblogs/db2dump/db2inst1$ db2 list tablespaces | grep -ip user 
	表スペース ID = 2
	名前 = USERSPACE1
	タイプ = データベース管理スペース
	内容 = すべての永続データ。 LARGE 表スペース。
	状態 = 0x0000
	詳しい説明:
	正常

	db2inst1:/dblogs/db2dump/db2inst1$  
	db2inst1:/dblogs/db2dump/db2inst1$ db2 "select * from test01";

	ID NAME 
	----------- ----------

	0 レコードが選択されました。

	db2inst1:/dblogs/db2dump/db2inst1$ db2 "insert into test01 values (2,'test01')"; 
	DB20000I SQL コマンドが正常に完了しました。
	db2inst1:/dblogs/db2dump/db2inst1$  
	db2inst1:/dblogs/db2dump/db2inst1$ db2 "insert into staff values (122,'lin',84,'clerk',5,40000,188.00)";
	DB20000I SQL コマンドが正常に完了しました。
	db2inst1:/dblogs/db2dump/db2inst1$ db2 commit;
	DB20000I SQL コマンドが正常に完了しました。
	db2inst1:/dblogs/db2dump/db2inst1$ 


	LOAD command
	http://www.ibm.com/support/knowledgecenter/en/SSEPGG_10.1.0/com.ibm.db2.luw.admin.cmd.doc/doc/r0008305.html

需要注意的是copy no/nonrecoverable的场合是否是业务支持，不支持前滚恢复，所以用这方法执行后做一次表空间的备份，影响业务。

copy no的场合会导致表空间处于backup pending，所在表空间的全部表不能就行更新操作，需要强制做一次表空间级别以上的备份才行，会影响业务。


而import语句：	

	db2inst2:/dbhome/db2inst2$ db2 "create table testa like syscat.columns"
	DB20000I  The SQL command completed successfully.
	db2inst2:/dbhome/db2inst2$ db2 "insert into testa select * from syscat.columns";
	DB20000I  The SQL command completed successfully.
	db2inst2:/dbhome/db2inst2$
	db2inst2:/dbhome/db2inst2$ db2 "select count(*) from testa";

	1          
	-----------
	       6097

	  1 record(s) selected.

	db2inst2:/dbhome/db2inst2$
	db2inst2:/dbhome/db2inst2$ db2 "import from /dev/null of del replace into testa";
	SQL3109N  The utility is beginning to load data from file "/dev/null".

	SQL3110N  The utility has completed processing.  "0" rows were read from the 
	input file.

	SQL3221W  ...Begin COMMIT WORK. Input Record Count = "0".

	SQL3222W  ...COMMIT of any database changes was successful.

	SQL3149N  "0" rows were processed from the input file.  "0" rows were 
	successfully inserted into the table.  "0" rows were rejected.


	Number of rows read         = 0
	Number of rows skipped      = 0
	Number of rows inserted     = 0
	Number of rows updated      = 0
	Number of rows rejected     = 0
	Number of rows committed    = 0

	db2inst2:/dbhome/db2inst2$ 
	db2inst2:/dbhome/db2inst2$ db2 "select count(*) from testa";

	1          
	-----------
		  0

	  1 record(s) selected.

	db2inst2:/dbhome/db2inst2$ 
	db2inst2:/dbhome/db2inst2$ db2 runstats on table testa WITH DISTRIBUTION AND DETAILED INDEXES ALL;
	DB20000I  The RUNSTATS command completed successfully.
	db2inst2:/dbhome/db2inst2$
	db2inst2:/dbhome/db2inst2$ db2 reorg table testa;
	DB20000I  The REORG command completed successfully.
	db2inst2:/dbhome/db2inst2$ 
	db2inst2:/dbhome/db2inst2$ db2 runstats on table testa WITH DISTRIBUTION AND DETAILED INDEXES ALL;
	DB20000I  The RUNSTATS command completed successfully.
	db2inst2:/dbhome/db2inst2$


另外import之后做regorg/runstats需要注意

[[DB2 LUW] IMPORT/EXPORT における文字化けおよび文字の切捨ての回避方法](http://www-01.ibm.com/support/docview.wss?uid=swg21504151)


[Deadlocks can occur when running RUNSTATS with ALLOW READ or ALLOW WRITE ACCESS](http://www-01.ibm.com/support/docview.wss?rs=608&uid=swg21188578)



### 4.Drop/Create Table语句：

	db2look -d <DB> -t <TableName> -e -o

	db2 drop table <TableName>

	db2 create table <TableName> 







