


[DataPump] TRACE パラメータについて (Data Pump の診断方法) (1)(KROWN:136411) (Doc ID 1746736.1)

▼Doc ID 1746736.1　より抜粋
...
========================================================================
2. Data Pump トレースファイルを作成する方法 (TRACE パラメータ)
========================================================================
...
TRACE を使用する際に、もし Data Pump ジョブが非特権ユーザで実行されると、
以下のようなエラーが発生する可能性があります。

------------------------------------------------------------------------
% expdp scott/tiger DIRECTORY=my_dir DUMPFILE=expdp_s.dmp \
LOGFILE=expdp_s.log TABLES=emp TRACE=480300

Export: Release 10.2.0.3.0 - Production on Friday, 19 October, 2007 13:46:33
Copyright (c) 2003, 2005, Oracle. All rights reserved.
Connected to: Oracle Database 10g Enterprise Edition Release 10.2.0.3.0 - Production
With the Partitioning, Oracle Label Security, OLAP and Data Mining Scoring Engine options
ORA-31631: privileges are required　　　　　★
------------------------------------------------------------------------

この問題を解決する方法:
Export Data Pump または Import Data Pump ユーティリティでデータベースに
接続するユーザが、特権ユーザであることを確認してください。
(すなわち DBA ロール、EXP_FULL_DATABASE ロール、IMP_FULL_DATABASE ロール
を持っているユーザ)

例:
/--++--++--++--++--++--++--++--++--++--++--++--++--++--++--++--++--++--/
/
/ -- 特権ユーザとして、この Data Pump ジョブを実行してください:
/
/ % expdp system/manager DIRECTORY=my_dir DUMPFILE=expdp_s.dmp \
/ LOGFILE=expdp_s.log TABLES=scott.emp TRACE=480300
/
/ -- または:
/
/ -- SCOTT ユーザを特権ユーザにしてください:
/
/ CONNECT / AS SYSDBA
/ GRANT exp_full_database TO scott;
/
/ % expdp scott/tiger DIRECTORY=my_dir DUMPFILE=expdp_s.dmp \
/ LOGFILE=expdp_s.log TABLES=emp TRACE=480300
/
/--++--++--++--++--++--++--++--++--++--++--++--++--++--++--++--++--++--/




https://docs.oracle.com/cd/E82638_01/SUTIL/oracle-data-pump-export-utility.htm#GUID-A697AD50-B366-4989-AA40-151D7089E810

Oracle® Databaseユーティリティ
12c リリース2 (12.2)
E81328-02

　=> 2 データ・ポンプ・エクスポート

　　　=> 2.4.46 TRANSPORTABLE

デフォルト: NEVER

用途

表モード・エクスポート(TABLESパラメータで指定)または全体モード・エクスポート(FULLパラメータで指定)中にトランスポータブル・オプションを使用する必要があるかどうかを指定します。

構文および説明

TRANSPORTABLE = [ALWAYS | NEVER]

使用可能な値の定義は、次のとおりです。

ALWAYS - エクスポート・ジョブでトランスポータブル・オプションを使用するように指定します。トランスポータブルが使用できない場合、ジョブは失敗します。

表モード・エクスポートでトランスポータブル・オプションを使用すると、指定した表、パーティションまたはサブパーティションのメタデータのみがエクスポートされるトランスポータブル表領域エクスポートになります。

全体モード・エクスポートでトランスポータブル・オプションを使用すると、データベースの完全なコピーを作成するために必要なすべてのオブジェクトおよびデータがエクスポートされる全体トランスポータブル・エクスポートになります。

NEVER: エクスポート・ジョブでトランスポータブル・オプションではなくダイレクト・パスまたは外部表による方法を使用してデータをアンロードするように指定します。これはデフォルトです。

注意:

トランスポータブル・モードで表領域全体をエクスポートするには、TRANSPORT_TABLESPACESパラメータを使用します。

表のパーティションの一部のみをエクスポートし、TRANSPORTABLE=ALWAYSパラメータを使用すると、インポート時にそれぞれのパーティションが非パーティション表になります。

表のパーティションのサブセットのみをエクスポートし、TRANSPORTABLEパラメータを使用しない場合、またはそのパラメータがNEVERに設定されている場合(デフォルト)は、インポート時に次のようになります。

PARTITION_OPTIONS=DEPARTITIONを使用している場合は、ダンプ・ファイル・セットに含まれるそれぞれのパーティションが、非パーティション表として作成されます。

PARTITION_OPTIONSを使用していない場合は、完全な表が作成されます。つまり、完全な表内のすべてのメタデータが、ソース上での表定義と同じになるようにターゲット・システム上に存在します。
ただし、指定されたパーティション用にエクスポートされたデータのみが表に挿入されます。　　　　　　★★★

制限事項

TRANSPORTABLEパラメータは、表モード・エクスポートおよび全体モード・エクスポートでのみ有効です。

TRANSPORTABLEパラメータを使用するには、COMPATIBLE初期化パラメータを11.0.0以上に設定する必要があります。

FULLパラメータをTRANSPORTABLE (全体トランスポータブル・エクスポートの実行)と組み合せて使用するには、データ・ポンプのVERSION
　　パラメータを12.0以上に設定する必要があります。VERSIONパラメータを指定しない場合、COMPATIBLEデータベース初期化パラメータを12.0以上に設定する必要があります。

トランスポータブル・エクスポートを実行するユーザーには、DATAPUMP_EXP_FULL_DATABASE権限が必要です。

表、パーティションおよびサブパーティションに関連付けられている表領域は読取り専用である必要があります。

全体トランスポータブル・エクスポートでは、データ移動方法の組合せが使用されます。トランスポータブル表領域に存在するオブジェクトは、
　そのメタデータのみがアンロードされ、データはデータ・ファイルがソース・システムからターゲット・システムにコピーされるときにコピーされます。
　コピーする必要のあるデータ・ファイルは、エクスポート操作のログ・ファイルの最後に表示されます。非トランスポータブル表領域に存在する
　オブジェクト(SYSTEMやSYSAUXなど)は、そのメタデータとデータの両方がダンプ・ファイル・セットにアンロードされます。
　(全体トランスポータブル・エクスポートの実行の詳細は、『Oracle Database管理者ガイド』を参照してください。)

エクスポートを実行するユーザーのデフォルトの表領域を、転送対象となっている表領域のいずれかに設定することはできません。

例

次の例では、shユーザーがDATAPUMP_EXP_FULL_DATABASEロールを持ち、表sales2がパーティション化されて表領域tbs2内に格納されているとします。
(tbs2表領域はソース・データベースで読取り専用に設定する必要があります。)

> expdp sh DIRECTORY=dpump_dir1 DUMPFILE=tto1.dmp
TABLES=sh.sales2 TRANSPORTABLE=ALWAYS

エクスポートが正常に完了した後は、データ・ファイルをターゲット・データベース領域にコピーする必要があります。
次に、PARTITION_OPTIONSとREMAP_SCHEMAの各パラメータを使用してインポート操作を実行し、sales2の各パーティションを固有の表にします。

> impdp system PARTITION_OPTIONS=DEPARTITION
TRANSPORT_DATAFILES=oracle/dbs/tbs2 DIRECTORY=dpump_dir1
DUMPFILE=tto1.dmp REMAP_SCHEMA=sh:dp