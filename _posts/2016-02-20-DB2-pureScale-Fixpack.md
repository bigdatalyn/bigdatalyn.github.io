---
layout: post
title: "[原创]pureScale在线打Fixpack"
category: DB2
excerpt: "将联机修订包更新安装到 DB2 pureScale 实例上更高的代码级别，
一次对一个成员和集群高速缓存设施 (CF) 安装联机修订包更新以在 DB2® pureScale® 实例始终可用时将其更新到具有更高代码级别的修订包或特殊构建"
tags: DB2 pureScale 原创
---

* content
{:toc}


#### 摘要

将联机修订包更新安装到 DB2 pureScale 实例上更高的代码级别

一次对一个成员和集群高速缓存设施 (CF) 安装联机修订包更新以在 DB2® pureScale® 实例始终可用时将其更新到具有更高代码级别的修订包或特殊构建





>英语版：

http://www-01.ibm.com/support/knowledgecenter/SSEPGG_10.5.0/com.ibm.db2.luw.qb.server.doc/doc/t0061194.html


>日语版：
46250 694 760

※以下インスタンスが起動した状態で実施

1)既存のpureScale環境と適用するFixpack間で、オンライン・フィックスパック更新をサポートしているか確認します。

# ./installFixPack -show_level_info

   →「Supports online update = Yes」

2)メンバーサーバーに1台ずつオンライン・フィックスパック更新をインストールします。

# ./installFixPack -p <FixPackのインストール先パス> -c <解凍したnlpackの絶対PATH>  -I db2inst1 -online -l /tmp/db2_installFixPack_1.log -t /tmp/db2_installFixPack_1.trc

（注意）

必須オプションの<FixPackのインストールパス>には既存のインストールディレクトリ（例: /opt/IBM/db2/V10.5）を指定できない。

別途インストール先を用意する必要があり、また、そのパスは全メンバーから見て同一パスである必要があります。


3)インスタンスユーザーにスイッチし、下記コマンドを実行します。

$ db2pd -ruStatus

→　コード・レベルがバージョン 10.5 フィックスパック 3 に変更されたことを確認します。

4)2 次 CFサーバー にオンライン・フィックスパック更新をインストールします。

# ./installFixPack -p <FixPackのインストール先パス> -c <解凍したnlpackの絶対PATH>  -I db2inst1 -online -l /tmp/db2_installFixPack_1.log -t /tmp/db2_installFixPack_1.trc


5)インスタンスユーザーにスイッチし、下記コマンドを実行します。

$ db2pd -ruStatus

→　コード・レベルがバージョン 10.5 フィックスパック 3 に変更されたことを確認します。

6)インスタンスユーザーにスイッチし、DB2 pureScale インスタンスの 2次CF が PEER 状態であることを確認します。

$ db2instance -list


7)rootユーザーで、1 次 CF サーバーにオンライン・フィックスパック更新をインストールします。

# ./installFixPack -p <FixPackのインストール先パス> -c <解凍したnlpackの絶対PATH>  -I db2inst1 -online -l /tmp/db2_installFixPack_1.log -t /tmp/db2_installFixPack_1.trc


8)インスタンスユーザーにスイッチし、下記コマンドを実行します。

$ db2pd -ruStatus

→　コード・レベルがバージョン 10.5 フィックスパック 3 に変更されたことを確認します。


9)すべてのメンバーおよび CF でオンライン・フィックスパック更新が正常に実行されたかどうか確認します。

# ./installFixPack -check_commit -p <FixPackのインストール先パス> -I db2inst1-l /tmp/checkcommit.log

→　オンライン更新が正常に実行されたこと、およびすべてのメンバーと CFがフィックスパック更新のコミットを実行する準備ができていることが出力されていることを確認します。


10)DB2 pureScale インスタンスが新しいフィックスパック・レベルに更新されるように、オンライン・フィックスパック更新をコミットするため、次のコマンドを実行します。

# ./installFixPack -commit_level -I db2inst1 -l

/tmp/db2_installFixPack_2.log -t /tmp/db2_installFixPack_2.trc
→　コミットが正常に実行されたことを確認します。


11)インスタンスユーザーにスイッチして、新たにコミットしたフィックスパック・レベルがインスタンスおよびデータベースに適用されていることを確認します。

$ db2pd -ruStatus

→　インスタンス、メンバー、および CF の新たにコミットされたコード・レベルとアーキテクチャー・レベルが同じであることを確認します。

→　Code Level、Architecture Level 、CECL の出力が一致していることを確認します。

12)フィックスパックに固有の機能を使用するため、データベース内のシステム・カタログ・オブジェクトを更新します。

$ db2updv105 -d db-name



---


#### 参考资料

APAR IT01041
=============================================
	Abstract
	INSTALLFIXPACK COMMAND FAILS WHEN -C OPTION IS SPECIFIED.

	Error Description
	------------------------------------------------------------------------
	The following command fails with DBI1571E, but the -c option should be
	valid.

	./installFixPack -p /opt/IBM/db2/V10.5FP3 -c <nlpack_location_path> -I
	db2inst1 -offline -l /tmp/db2_installFixPack_1.log

	DBI1571E
	The command failed because the instance is a DB2 pureScale
	instance but a parameter was specified with the command that is
	not valid in DB2 pureScale environments. Command name:
	installFixPack. Specified parameter: -c.

	Explanation:
	For many DB2 database manager utility commands, some parameter are valid
	in only certain conditions.
	This message is returned
	when a command is called in a DB2 pureScale environment with a parameter
	that is not valid for DB2 pureScale environments.

	User response:
	Call the command again without specifying parameters that are not valid
	for DB2 pureScale environments.


---

