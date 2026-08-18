# バックアップなしで削除してしまったデータを復旧する：Oracle Flashback Query を試してみた

# はじめに

## 何ができる機能か

「`WHERE` 句を付け忘れたまま `DELETE` を実行して、しかも `COMMIT` してしまった」というのは、データベースに携わる人間なら一度は肝を冷やす場面です。通常であれば、バックアップからのリストアやポイントインタイムリカバリ（PITR）を検討することになりますが、これらはデータベース全体の停止を伴ううえ、復旧作業そのものに数時間かかることも珍しくありません。

**Oracle Flashback Query** は、こうした場面でバックアップを一切使わずに、データベースをオンラインのまま「過去のある時点のデータ」を参照できる機能です。仕組みとしては、Oracle が読み取り一貫性のために常時保持している **UNDO データ**（UNDO 表領域内の情報）を再利用しています。つまり、リカバリ専用の特別な仕掛けを事前に用意しておく必要はなく、自動 UNDO 管理（AUM）が有効なデータベースであれば、そのまま `SELECT ... AS OF` という SQL 構文だけで過去のデータにアクセスできます。

ただし万能ではありません。参照できるのは **UNDO データが保持されている期間内**（`UNDO_RETENTION` で指定された期間、およびシステムが自動チューニングした期間）に限られます。したがって Flashback Query は「事故に気付いてすぐに使う」ことが前提の機能であり、時間が経つほど復旧できる可能性は下がります。この「時間との勝負」という性質を理解しておくことが、実際の運用では最も重要です。

Oracle のフラッシュバック機能には複数の種類があり、それぞれ復旧できる対象が異なります。

| 機能 | 構文・インタフェース | 復旧・参照できる対象 | 依存するデータ |
|------|---------------------|---------------------|---------------|
| Flashback Query | `SELECT ... AS OF TIMESTAMP / SCN` | 過去のある時点における行の内容 | UNDO データ |
| Flashback Version Query | `SELECT ... VERSIONS BETWEEN` | ある期間内に発生した行のすべてのバージョン（変更履歴） | UNDO データ |
| Flashback Transaction Query | `FLASHBACK_TRANSACTION_QUERY` ビュー | トランザクション単位のメタデータと取り消し SQL（`UNDO_SQL`） | UNDO データ + 補足ロギング |
| Flashback Table | `FLASHBACK TABLE ... TO SCN / TIMESTAMP` | テーブル全体を過去の時点に巻き戻す | UNDO データ |
| Flashback Drop | `FLASHBACK TABLE ... TO BEFORE DROP` | `DROP TABLE` されたテーブル | リサイクルビン |
| Flashback Database | `FLASHBACK DATABASE TO ...` | データベース全体を過去の時点に巻き戻す | フラッシュバックログ |
| Flashback Time Travel | `FLASHBACK ARCHIVE` | 長期間（数か月〜数年）の変更履歴 | フラッシュバック・アーカイブ |

本記事では、このうち **行レベルの誤削除からの復旧に直接使える Flashback Query（`AS OF`）を主役として検証** します。あわせて、原因調査に役立つ Flashback Version Query と Flashback Transaction Query も応用編として扱います。Flashback Database や Flashback Time Travel は事前設定が必要な別の機能であるため、本記事の検証スコープには含めません。

## どんなアウトプットが出来るか

Flashback Query を使った復旧は、以下の流れで進みます。特別なツールは不要で、SQL クライアント（SQL*Plus、SQL Developer、Database Actions など）から SQL を実行するだけです。

1. 誤って `DELETE` を実行し、`COMMIT` してしまったことに気付きます
2. 削除が起きる「直前」のタイムスタンプ、または SCN（システム変更番号）を特定します
3. `SELECT ... AS OF` でその時点のデータが本当に見えるかを確認します
4. 確認できたデータを `INSERT ... SELECT` で元のテーブルに書き戻します
5. 件数と内容を照合して、復旧が完了したことを検証します

実際に実行する SQL は、最終的には次の 2 文に集約されます。

```sql
-- (1) 削除直前の時点のデータが参照できるかを確認する
SELECT * FROM <テーブル名>
AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '10' MINUTE)
WHERE <削除してしまった行を特定する条件>;

-- (2) 確認できたデータを元のテーブルに書き戻す
INSERT INTO <テーブル名>
SELECT * FROM <テーブル名>
AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '10' MINUTE)
WHERE <削除してしまった行を特定する条件>;

COMMIT;
```

たった数行の SQL で、バックアップに一切触れることなく、しかもデータベースを停止させることなく削除データが戻ってきます。これが Flashback Query の最大の価値です。

---

# 事前準備

## 前提条件

本記事の検証には、以下の環境と権限が必要です。

- Oracle Database 10g 以降（本記事では Oracle Database 23ai / 26ai 世代を想定しています）
  - Autonomous Database（Serverless / Dedicated）、Base Database Service、オンプレミス環境のいずれでも動作します
- **自動 UNDO 管理（AUM）が有効であること**（`UNDO_MANAGEMENT = AUTO`）
  - Flashback Query は UNDO データに依存するため、これがすべての前提になります
  - Autonomous Database では Oracle 側で有効に構成済みです
- 復旧対象テーブルに対する以下の権限
  - `SELECT`（または `READ`）権限
  - `FLASHBACK` 権限（他ユーザーのテーブルを対象にする場合は `FLASHBACK ANY TABLE`）
- SCN の取得に `DBMS_FLASHBACK` パッケージを使う場合は `EXECUTE ON DBMS_FLASHBACK` 権限
- 応用編の Flashback Transaction Query を実行する場合は `SELECT ANY TRANSACTION` 権限
- 構成確認のために `V$DATABASE` や `V$UNDOSTAT` などの動的パフォーマンスビューを参照できること
  - Autonomous Database では `ADMIN` ユーザーで参照できます
- **UNDO データが保持されている期間内に作業できること**
  - これが最も重要な前提条件です。既定の `UNDO_RETENTION` は 900 秒（15 分）です

必要な権限は、以下の SQL で付与できます。

```sql
-- 特定のテーブルだけを対象にする場合
GRANT SELECT, FLASHBACK ON <スキーマ名>.<テーブル名> TO <ユーザー名>;

-- すべてのテーブルを対象にする場合
GRANT FLASHBACK ANY TABLE TO <ユーザー名>;

-- SCN の取得や DBMS_FLASHBACK の利用に必要
GRANT EXECUTE ON DBMS_FLASHBACK TO <ユーザー名>;

-- 応用編（Flashback Transaction Query）に必要
GRANT SELECT ANY TRANSACTION TO <ユーザー名>;
```

## この記事には書いていない作業

以下の作業は本記事ではカバーしていません。必要に応じて公式ドキュメントを参照してください。

- データベースインスタンスの作成とネットワーク設定
  - 参考: [Oracle Autonomous Database の作成](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/autonomous-provision.html)
- SQL クライアント（SQL Developer / SQL*Plus / Database Actions）の接続設定
  - 参考: [Autonomous Database への接続](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/autonomous-connect.html)
- RMAN によるバックアップの取得とリストア手順
  - 参考: [Oracle Database Backup and Recovery User's Guide](https://docs.oracle.com/en/database/oracle/oracle-database/23/bradv/index.html)
- Flashback Database（データベース全体の巻き戻し）の設定と実行
  - 参考: [Performing Flashback and Database Point-in-Time Recovery](https://docs.oracle.com/en/database/oracle/oracle-database/23/bradv/rman-performing-flashback-dbpitr.html)
- Flashback Time Travel（フラッシュバック・アーカイブ）による長期履歴管理の設定
  - 参考: [Using Flashback Time Travel on Autonomous Database](https://docs.oracle.com/en-us/iaas/autonomous-database-serverless/doc/flashback-time-travel-autononomous.html)
- 補足ロギング（Supplemental Logging）の詳細な設計

---

# 手順

## Step 1: フラッシュバック・データベースの構成を確認する

まず、対象のデータベースが現在どのような状態にあるかを確認します。ここで見るのは `V$DATABASE` ビューです。

```sql
SELECT name,
       log_mode,
       flashback_on,
       open_mode,
       database_role
FROM   v$database;
```

<!-- TODO: スクリーンショットを挿入（V$DATABASE の問い合わせ結果） -->

`FLASHBACK_ON` 列が `YES` であれば Flashback Database（データベース全体の巻き戻し）が有効ですが、**この列が `NO` でも Flashback Query は問題なく使えます**。ここを混同しやすいので注意してください。

> **注意**: `FLASHBACK_ON` は Flashback **Database** の有効・無効を示す列です。Flashback **Query** は UNDO データだけで動作するため、`FLASHBACK_ON` が `NO` であっても利用できます。逆に言えば、`FLASHBACK_ON = NO` だからといって「もう復旧手段がない」と諦める必要はありません。

## Step 2: リサイクルビンの状態を確認する

次に、リサイクルビン（Flashback Drop）でデータを取り戻せないかを確認します。

```sql
-- リサイクルビンが有効かどうかを確認する
SHOW PARAMETER recyclebin

-- 動的ビューから確認する場合
SELECT name, value
FROM   v$parameter
WHERE  name = 'recyclebin';

-- リサイクルビンの中身を確認する
SELECT object_name,
       original_name,
       operation,
       type,
       droptime
FROM   user_recyclebin
ORDER  BY droptime DESC;
```

<!-- TODO: スクリーンショットを挿入（USER_RECYCLEBIN の問い合わせ結果） -->

ここで重要なのは、**リサイクルビンは今回のケースでは役に立たない**という点です。リサイクルビンが保持するのは `DROP TABLE` されたテーブルそのものであり、`DELETE` で消えた「行」は一切記録されません。行レベルの誤削除では `USER_RECYCLEBIN` は空のままです。

> **注意**: リサイクルビンで復旧できるのは `DROP TABLE` のみです。`DELETE` や `TRUNCATE TABLE` は対象外です。この違いを理解しておくと、事故発生時にどの機能を使うべきかを素早く判断できます。

## Step 3: リストアポイントとバックアップの有無を確認する

Flashback Query に進む前に、従来型の復旧手段が使えるかどうかも確認しておきます。

```sql
-- リストアポイントの有無を確認する
SELECT name,
       scn,
       time,
       storage_size,
       guarantee_flashback_database
FROM   v$restore_point;
```

RMAN が利用できる環境であれば、バックアップの有無も確認します。

```bash
rman target /
```

```
RMAN> LIST BACKUP SUMMARY;
RMAN> LIST ARCHIVELOG ALL;
```

<!-- TODO: スクリーンショットを挿入（V$RESTORE_POINT および RMAN LIST BACKUP SUMMARY の結果） -->

> **注意**: Autonomous Database では RMAN を直接利用できません。バックアップは OCI コンソールまたは `DBMS_CLOUD_ADMIN` 経由で管理されます。この Step は Base Database Service やオンプレミス環境を想定した確認手順です。

リストアポイントもバックアップも存在しない、あるいは存在してもリストアに時間がかかりすぎる——という状況こそが、Flashback Query の出番です。

## Step 4: ARCHIVELOG モードと UNDO 保持期間を確認する

ここが実質的に最も重要な事前確認です。Flashback Query が成功するかどうかは、**UNDO データがまだ残っているか**の一点にかかっています。

```sql
-- ARCHIVELOG モードを確認する
SELECT log_mode FROM v$database;

-- UNDO 関連の初期化パラメータを確認する
SELECT name, value
FROM   v$parameter
WHERE  name IN ('undo_management', 'undo_tablespace', 'undo_retention');

-- UNDO 表領域の RETENTION 設定を確認する
SELECT tablespace_name, retention
FROM   dba_tablespaces
WHERE  contents = 'UNDO';

-- システムが自動チューニングした実際の UNDO 保持期間を確認する（秒）
SELECT MAX(tuned_undoretention) AS tuned_undoretention_sec
FROM   v$undostat;
```

<!-- TODO: スクリーンショットを挿入（UNDO パラメータおよび TUNED_UNDORETENTION の確認結果） -->

`UNDO_RETENTION` の既定値は **900 秒（15 分）** です。ただし Oracle は問い合わせの要件に応じてこの値を自動的に延長するため、実際の保持期間は `V$UNDOSTAT.TUNED_UNDORETENTION` で確認する必要があります。

フラッシュバック機能を本格的に運用に組み込むのであれば、保持期間を延ばし、さらに保持を保証しておくことをおすすめします。

```sql
-- UNDO の保持期間を 1 時間に延長する
ALTER SYSTEM SET undo_retention = 3600 SCOPE = BOTH;

-- 未期限の UNDO が上書きされないよう保持を保証する
ALTER TABLESPACE <UNDO表領域名> RETENTION GUARANTEE;
```

> **注意**: `UNDO_RETENTION` を設定しただけでは保持は保証されません。アクティブなトランザクションが UNDO 領域を必要とし、かつ空き領域が不足した場合、Oracle は未期限（unexpired）の UNDO を再利用します。確実に保持したい場合は `RETENTION GUARANTEE` を指定してください。ただし、この設定は「UNDO 領域が枯渇したときに新しいトランザクションを失敗させる」ことを意味するため、UNDO 表領域のサイズ設計とセットで検討する必要があります。

> **注意**: Autonomous Database では UNDO 表領域および UNDO 関連パラメータは Oracle が自動的に管理しており、ユーザーによる `ALTER SYSTEM` / `ALTER TABLESPACE` での変更は想定されていません。上記のチューニングは Base Database Service やオンプレミス環境向けの手順です。<!-- TODO: 確認が必要（Autonomous Database Serverless で UNDO_RETENTION が変更可能かを実機で確認する） -->

## Step 5: 検証用テーブルを作成し、データ損失をシミュレートする

ここから実際の検証に入ります。まず検証用のテーブルを作成し、データを投入します。

```sql
-- 検証用テーブルを作成する
CREATE TABLE fb_employees (
  employee_id   NUMBER(6)    PRIMARY KEY,
  first_name    VARCHAR2(20),
  last_name     VARCHAR2(25) NOT NULL,
  department_id NUMBER(4),
  salary        NUMBER(8,2),
  updated_at    TIMESTAMP DEFAULT SYSTIMESTAMP
);

-- 検証用データを投入する
INSERT INTO fb_employees (employee_id, first_name, last_name, department_id, salary)
VALUES (101, 'Taro',   'Yamada',    10, 500000);

INSERT INTO fb_employees (employee_id, first_name, last_name, department_id, salary)
VALUES (102, 'Hanako', 'Suzuki',    10, 480000);

INSERT INTO fb_employees (employee_id, first_name, last_name, department_id, salary)
VALUES (103, 'Jiro',   'Tanaka',    20, 520000);

INSERT INTO fb_employees (employee_id, first_name, last_name, department_id, salary)
VALUES (104, 'Yuki',   'Watanabe',  20, 495000);

INSERT INTO fb_employees (employee_id, first_name, last_name, department_id, salary)
VALUES (105, 'Kenji',  'Ito',       30, 610000);

COMMIT;

-- 投入結果を確認する
SELECT COUNT(*) AS row_count FROM fb_employees;
SELECT * FROM fb_employees ORDER BY employee_id;
```

<!-- TODO: スクリーンショットを挿入（5 件のデータが投入された状態） -->

次に、**削除前の時点を記録** します。実際の事故ではこの記録は残っていませんが、検証では正解の値を持っておくと後の照合が容易になります。

```sql
-- 削除前の現在時刻と SCN を記録しておく
SELECT SYSTIMESTAMP                                AS before_delete_time,
       DBMS_FLASHBACK.GET_SYSTEM_CHANGE_NUMBER     AS before_delete_scn
FROM   dual;
```

> **注意**: UNDO データが確実に生成され、タイムスタンプと SCN のマッピングが安定するように、ここで数秒〜十数秒ほど間隔を空けてから次の `DELETE` を実行してください。SCN とタイムスタンプの対応付けは約 3 秒の粒度で記録されるため、間隔が短すぎると削除前後を区別できなくなります。

そして、事故を再現します。ここでは「部門 10 の従業員を削除するつもりが、そのまま `COMMIT` してしまった」という想定です。

```sql
-- 【事故の再現】部門 10 の従業員を削除してコミットしてしまう
DELETE FROM fb_employees WHERE department_id = 10;

COMMIT;

-- 2 件が失われたことを確認する
SELECT COUNT(*) AS row_count FROM fb_employees;
SELECT * FROM fb_employees ORDER BY employee_id;
```

<!-- TODO: スクリーンショットを挿入（DELETE 後、3 件に減った状態） -->

`COMMIT` を実行してしまったため、`ROLLBACK` は使えません。ここから Flashback Query による復旧を行います。

## Step 6: 復旧ポイント（タイムスタンプ / SCN）を特定する

復旧のためには「削除が起きる直前」の時点を特定する必要があります。実際の事故では正確な時刻が分からないことが多いため、いくつかの調べ方を組み合わせます。

### 現在の SCN を取得する

```sql
SELECT DBMS_FLASHBACK.GET_SYSTEM_CHANGE_NUMBER AS current_scn FROM dual;
```

### タイムスタンプと SCN を相互変換する

```sql
-- タイムスタンプから SCN を求める
SELECT TIMESTAMP_TO_SCN(SYSTIMESTAMP - INTERVAL '10' MINUTE) AS scn_10min_ago
FROM   dual;

-- SCN からタイムスタンプを求める
SELECT SCN_TO_TIMESTAMP(<調べたいSCN>) AS scn_time
FROM   dual;
```

> **注意**: `SCN_TO_TIMESTAMP` および `TIMESTAMP_TO_SCN` の精度は約 3 秒です。また、SCN とタイムスタンプの対応付けが保持される期間は「自動チューニングされた UNDO 保持期間と、すべてのフラッシュバック・アーカイブの保持期間の最大値」であり、**最低でも 120 時間** です。古すぎる SCN を指定すると `ORA-08181: specified number is not a valid system change number` が発生します。

### 残っている行の最終変更 SCN から当たりをつける

`ORA_ROWSCN` 疑似列を使うと、その行が最後に変更された SCN が分かります。

```sql
SELECT employee_id,
       last_name,
       ORA_ROWSCN                       AS row_scn,
       SCN_TO_TIMESTAMP(ORA_ROWSCN)     AS row_change_time
FROM   fb_employees
ORDER  BY employee_id;
```

### 時点を少しずつ遡って探索する

最も実践的なのは、`AS OF` で件数を確認しながら二分探索的に遡る方法です。

```sql
-- 1 分前の時点の件数
SELECT COUNT(*) AS row_count
FROM   fb_employees AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '1' MINUTE);

-- 5 分前の時点の件数
SELECT COUNT(*) AS row_count
FROM   fb_employees AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '5' MINUTE);

-- 10 分前の時点の件数
SELECT COUNT(*) AS row_count
FROM   fb_employees AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '10' MINUTE);
```

<!-- TODO: スクリーンショットを挿入（時点ごとの件数の違いが分かる結果） -->

件数が 5 件に戻る最も新しい時点が、探している「削除直前」です。

## Step 7: Flashback Query で削除されたデータを取得する

復旧ポイントが決まったら、いよいよ Flashback Query を実行します。**まずは `SELECT` で内容を確認し、正しいデータであることを検証してから書き戻す**——この順序を必ず守ってください。

### タイムスタンプを指定して参照する

```sql
SELECT *
FROM   fb_employees
AS OF TIMESTAMP TO_TIMESTAMP('<YYYY-MM-DD HH24:MI:SS 形式の削除直前の時刻>', 'YYYY-MM-DD HH24:MI:SS')
WHERE  department_id = 10;
```

### 相対時間で指定して参照する

```sql
SELECT *
FROM   fb_employees
AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '10' MINUTE)
WHERE  department_id = 10;
```

### SCN を指定して参照する（推奨）

```sql
SELECT *
FROM   fb_employees
AS OF SCN <Step 5 で記録した削除直前の SCN>
WHERE  department_id = 10;
```

<!-- TODO: スクリーンショットを挿入（AS OF SCN で削除された 2 件が表示されている結果） -->

> **注意**: タイムスタンプ指定には最大約 3 秒の誤差があります。正確な復旧が求められる場面では、可能な限り **SCN を指定** してください。SCN は単調増加する内部的な変更番号であり、時刻のような曖昧さがありません。

削除された 2 件（`employee_id` = 101, 102）が表示されれば、UNDO データがまだ残っており復旧可能であることが確認できました。

### 削除されたデータをテーブルに書き戻す

内容を確認できたら、`INSERT ... SELECT` で元のテーブルに戻します。

```sql
INSERT INTO fb_employees
SELECT *
FROM   fb_employees
AS OF SCN <Step 5 で記録した削除直前の SCN>
WHERE  department_id = 10;

COMMIT;
```

対象範囲が広く、どの行が失われたのか正確に分からない場合は、`MINUS` を使って「過去には存在したが現在は存在しない行」だけを抽出すると、主キー重複を避けながら安全に書き戻せます。

```sql
INSERT INTO fb_employees
  (SELECT * FROM fb_employees AS OF SCN <削除直前の SCN>
   MINUS
   SELECT * FROM fb_employees);

COMMIT;
```

### （代替手段）テーブル全体を過去の時点に巻き戻す

削除以外の変更も含めてテーブル全体を巻き戻したい場合は、`FLASHBACK TABLE` を使う方法もあります。こちらは行移動（row movement）の有効化が必要です。

```sql
-- 行移動を有効にする（FLASHBACK TABLE の前提条件）
ALTER TABLE fb_employees ENABLE ROW MOVEMENT;

-- テーブル全体を指定 SCN の時点に巻き戻す
FLASHBACK TABLE fb_employees TO SCN <削除直前の SCN>;

-- タイムスタンプで指定する場合
FLASHBACK TABLE fb_employees
  TO TIMESTAMP TO_TIMESTAMP('<YYYY-MM-DD HH24:MI:SS>', 'YYYY-MM-DD HH24:MI:SS');
```

> **注意**: `FLASHBACK TABLE` はテーブル全体を巻き戻すため、**復旧したい削除以降に行われた正当な更新も一緒に取り消されます**。他の業務が並行して同じテーブルを更新している本番環境では、影響範囲を必ず確認してから実行してください。影響を限定したい場合は、前述の `INSERT ... SELECT` による部分復旧のほうが安全です。

## Step 8: 復旧結果を検証する

書き戻しが完了したら、データが正しく復元されたことを検証します。

```sql
-- 件数が元の 5 件に戻っていることを確認する
SELECT COUNT(*) AS row_count FROM fb_employees;

-- 全件の内容を確認する
SELECT * FROM fb_employees ORDER BY employee_id;
```

さらに確実な検証として、「削除直前の状態」と「現在の状態」の差分がゼロであることを確認します。

```sql
-- 削除直前には存在したが、現在は存在しない行（0 件であるべき）
SELECT * FROM fb_employees AS OF SCN <削除直前の SCN>
MINUS
SELECT * FROM fb_employees;

-- 現在は存在するが、削除直前には存在しなかった行（0 件であるべき）
SELECT * FROM fb_employees
MINUS
SELECT * FROM fb_employees AS OF SCN <削除直前の SCN>;
```

<!-- TODO: スクリーンショットを挿入（件数が 5 件に戻り、MINUS の結果が 0 件である状態） -->

両方の `MINUS` が 0 件を返せば、削除直前の状態と完全に一致しており、復旧は成功です。

## Step 9: （応用）Flashback Version Query で変更履歴を追跡する

Flashback Query は「ある一点の状態」を返しますが、**Flashback Version Query** を使うと「ある期間内に行がどう変化したか」をすべて追跡できます。事故の原因調査に非常に有効です。

```sql
SELECT versions_startscn,
       versions_starttime,
       versions_endscn,
       versions_endtime,
       versions_xid,
       versions_operation,
       employee_id,
       last_name,
       salary
FROM   fb_employees
VERSIONS BETWEEN SCN <調査開始 SCN> AND <調査終了 SCN>
WHERE  employee_id = 101
ORDER  BY versions_startscn;
```

タイムスタンプで期間を指定することもできます。

```sql
SELECT versions_startscn,
       versions_starttime,
       versions_endscn,
       versions_endtime,
       versions_xid,
       versions_operation,
       employee_id,
       last_name,
       salary
FROM   fb_employees
VERSIONS BETWEEN TIMESTAMP
    TO_TIMESTAMP('<開始日時>', 'YYYY-MM-DD HH24:MI:SS')
AND TO_TIMESTAMP('<終了日時>', 'YYYY-MM-DD HH24:MI:SS')
WHERE  employee_id = 101
ORDER  BY versions_startscn;
```

<!-- TODO: スクリーンショットを挿入（VERSIONS BETWEEN の結果、VERSIONS_OPERATION に I / D が表示されている状態） -->

返される疑似列の意味は以下のとおりです。

| 疑似列 | 内容 |
|--------|------|
| `VERSIONS_STARTSCN` | その行バージョンが作成された SCN。期間開始より前に作成された場合は `NULL` |
| `VERSIONS_STARTTIME` | その行バージョンが作成された日時 |
| `VERSIONS_ENDSCN` | その行バージョンが失効した SCN。現在も有効な場合、または削除された場合は `NULL` |
| `VERSIONS_ENDTIME` | その行バージョンが失効した日時 |
| `VERSIONS_XID` | その行バージョンを作成したトランザクション ID |
| `VERSIONS_OPERATION` | 操作種別（`I` = INSERT、`U` = UPDATE、`D` = DELETE） |

行バージョンの有効期間は `VERSIONS_START* <= t < VERSIONS_END*` の半開区間である点に注意してください。

> **注意**: `CREATE TABLE` の直後にコミットされたトランザクションは Flashback Version Query に反映されないことがあります。テーブル作成後は 15 秒以上待ってから DML をコミットすることが推奨されています。また、パフォーマンス上の理由から、`VERSIONS` 問い合わせの中で `versions_starttime` / `versions_endtime` / `scn_to_timestamp` を多用することは避けるべきとされています。

## Step 10: （応用）Flashback Transaction Query で取り消し SQL を取得する

Step 9 で得られた `VERSIONS_XID`（トランザクション ID）を使うと、**そのトランザクションを取り消すための SQL** を直接取得できます。

この機能を使うには、事前に補足ロギングが有効になっている必要があります。

```sql
-- 補足ロギングを有効にする（管理者権限が必要）
ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
ALTER DATABASE ADD SUPPLEMENTAL LOG DATA (PRIMARY KEY) COLUMNS;
```

そのうえで、`FLASHBACK_TRANSACTION_QUERY` ビューを問い合わせます。

```sql
SELECT xid,
       operation,
       start_scn,
       commit_scn,
       logon_user,
       table_name,
       undo_sql
FROM   flashback_transaction_query
WHERE  xid = HEXTORAW('<Step 9 で取得した VERSIONS_XID の値>');
```

Flashback Version Query と組み合わせて、対象トランザクションを一度に絞り込むこともできます。

```sql
SELECT xid, logon_user, operation, undo_sql
FROM   flashback_transaction_query
WHERE  xid IN (
         SELECT versions_xid
         FROM   fb_employees
         VERSIONS BETWEEN SCN <調査開始 SCN> AND <調査終了 SCN>
       );
```

<!-- TODO: スクリーンショットを挿入（UNDO_SQL 列に INSERT 文が生成されている結果） -->

`UNDO_SQL` 列には、実行された DML と論理的に逆の SQL が格納されています。今回の例では `DELETE` の逆である `INSERT` 文が生成されているはずです。

> **注意**: `WHERE` 句に `XID` を指定せずに `FLASHBACK_TRANSACTION_QUERY` を問い合わせると、無関係な大量の行がスキャンされ、パフォーマンスが著しく低下します。必ず `XID` で絞り込んでください。

> **注意**: `UNDO_SQL` が生成する `INSERT` は、元の行と同じ ROWID に挿入されるとは限りません。ROWID に依存した処理がある場合は注意が必要です。

## Step 11: クリーンアップ（作成リソースの削除）

検証が完了したら、作成したリソースを削除します。

```sql
-- 検証用テーブルを削除する（リサイクルビンにも残さない）
DROP TABLE fb_employees PURGE;
```

Step 4 で UNDO の設定を変更した場合は、元に戻します。

```sql
-- UNDO 保持期間を既定値に戻す
ALTER SYSTEM SET undo_retention = 900 SCOPE = BOTH;

-- 保持の保証を解除する
ALTER TABLESPACE <UNDO表領域名> RETENTION NOGUARANTEE;
```

Step 10 で補足ロギングを有効にした場合、不要であれば解除します。

```sql
-- 補足ロギングを解除する
ALTER DATABASE DROP SUPPLEMENTAL LOG DATA (PRIMARY KEY) COLUMNS;
ALTER DATABASE DROP SUPPLEMENTAL LOG DATA;
```

> **注意**: 補足ロギングは GoldenGate や LogMiner など他の機能でも使用されます。共有環境では、他の用途で使われていないことを確認してから解除してください。

---

# 制限事項

Flashback Query は強力ですが、万能ではありません。復旧できる対象とできない対象を正確に把握しておくことが重要です。

## 復旧できるもの・できないもの

| 操作・事象 | Flashback Query で復旧できるか | 代替手段 |
|-----------|------------------------------|---------|
| `DELETE`（コミット済み） | できます | — |
| `UPDATE`（誤った更新） | できます | — |
| `INSERT`（誤った挿入の取り消し） | できます | — |
| `MERGE` | できます | — |
| `DROP TABLE` | **できません** | Flashback Drop（リサイクルビン） |
| `TRUNCATE TABLE` | **できません** | バックアップからのリストア、Flashback Database |
| DDL による構造変更（列の削除・変更など） | **できません** | バックアップからのリストア |
| 物理的なデータ破損 | **できません** | RMAN によるブロックメディアリカバリ |
| UNDO 保持期間を過ぎたデータ | **できません** | バックアップからのリストア、Flashback Time Travel |

## その他の技術的な制約

| 制限事項 | 詳細 |
|---------|------|
| UNDO 保持期間への依存 | UNDO データが上書きされた時点で復旧不能になります。既定の `UNDO_RETENTION` は 900 秒です |
| タイムスタンプの精度 | `AS OF TIMESTAMP` には最大約 3 秒の誤差があります。精度が必要な場合は `AS OF SCN` を使用します |
| SCN とタイムスタンプの対応保持期間 | 最低 120 時間。それより古い SCN を指定すると `ORA-08181` が発生します |
| DDL 実行後の参照不可 | 列の削除・変更、パーティションの削除、`TRUNCATE`、制約の追加などを行うと、それ以前の時点への Flashback Query は `ORA-01466` で失敗します |
| 動的パフォーマンスビュー | `V$` ビューに対しては `AS OF` を使用できません（常に現在の値を返します） |
| UNDO 領域不足 | 未期限の UNDO が再利用されると `ORA-01555: snapshot too old` が発生します |
| セッション設定の適用 | 過去のデータを参照する際も、NLS 設定やキャラクタセットは**現在のセッション設定**が適用されます（当時の設定ではありません） |
| Version Query のアクセスパス | インデックスのみのアクセスは索引構成表（IOT）でのみ可能で、索引高速全走査は使用できません |
| Flashback Transaction Query の要件 | 補足ロギングの有効化と `SELECT ANY TRANSACTION` 権限が必要です |
| LOB 型のサポート | `DBMS_FLASHBACK.TRANSACTION_BACKOUT` は BFILE / BLOB / CLOB / NCLOB をサポートしません |

> **注意**: 最も見落とされやすいのが `ORA-01466: unable to read data - table definition has changed` です。復旧対象のテーブルに対して、事故発生後に何らかの DDL を実行してしまうと、その時点より前へは遡れなくなります。**事故に気付いたら、まず対象テーブルへの DDL を一切行わない** ことを徹底してください。

---

# おわりに

今回の検証で確認できたポイントは以下のとおりです。

- Flashback Query は `SELECT ... AS OF TIMESTAMP / SCN` という SQL 構文だけで動作し、バックアップもデータベースの停止も一切必要ありません。UNDO データが残ってさえいれば、数行の SQL で削除データを取り戻せます。
- `V$DATABASE.FLASHBACK_ON` が `NO` であっても Flashback Query は利用できます。これは Flashback **Database** の設定であり、Flashback **Query** とは別物です。
- 復旧の成否は `UNDO_RETENTION` と `V$UNDOSTAT.TUNED_UNDORETENTION` が示す保持期間に完全に依存します。既定値は 900 秒（15 分）と短いため、フラッシュバックを運用に組み込むなら保持期間の延長と `RETENTION GUARANTEE` の検討が必要です。
- タイムスタンプ指定には約 3 秒の誤差があるため、正確性が求められる復旧では `AS OF SCN` を使うべきです。`DBMS_FLASHBACK.GET_SYSTEM_CHANGE_NUMBER` で定期的に SCN を記録しておくと、いざというときの復旧精度が上がります。
- 復旧作業は「`SELECT` で確認してから `INSERT ... SELECT` で書き戻す」という二段構えが安全です。テーブル全体を巻き戻す `FLASHBACK TABLE` は、並行する正当な更新まで取り消してしまうリスクがあります。
- `DROP TABLE` や `TRUNCATE TABLE`、DDL 実行後の時点への遡りは Flashback Query では復旧できません。事故発生後に対象テーブルへ DDL を実行すると `ORA-01466` で復旧不能になるため、まず何もしないことが重要です。

Flashback Query は、開発環境や検証環境でのオペレーションミスからの復旧はもちろん、本番環境での「アプリケーションのバグによる意図しない一括更新」といった場面でも即座に効果を発揮します。特に、バックアップからのリストアでは数時間のダウンタイムが発生してしまうようなミッションクリティカルなシステムを運用しているエンジニアにとって、覚えておく価値の高い機能です。UNDO 保持期間という時間制限がある以上、実際に事故が起きてから調べ始めるのでは手遅れになりかねません。平常時のうちに検証環境で一度手を動かしておくことを強くおすすめします。

---

# 参考情報

- [Recovering Deleted Data Without a Backup Using Oracle Flashback Query（本記事のもとにした記事）](https://medium.com/@engr.khanmustafa/recovering-deleted-data-without-a-backup-using-oracle-flashback-query-1b6fa54bb903)
- [Using Oracle Flashback Technology - Oracle Database Development Guide 23ai](https://docs.oracle.com/en/database/oracle/oracle-database/23/adfns/flashback.html)
- [UNDO_RETENTION - Oracle Database Reference](https://docs.oracle.com/en/database/oracle/oracle-database/23/refrn/UNDO_RETENTION.html)
- [SCN_TO_TIMESTAMP - Oracle Database SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/SCN_TO_TIMESTAMP.html)
- [TIMESTAMP_TO_SCN - Oracle Database SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/TIMESTAMP_TO_SCN.html)
- [FLASHBACK TABLE - Oracle Database SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/23/sqlrf/FLASHBACK-TABLE.html)
- [Managing Undo - Oracle Database Administrator's Guide](https://docs.oracle.com/en/database/oracle/oracle-database/23/admin/managing-undo.html)
- [Using Flashback Time Travel on Autonomous Database Serverless](https://docs.oracle.com/en-us/iaas/autonomous-database-serverless/doc/flashback-time-travel-autononomous.html)
- [DBMS_FLASHBACK パッケージ リファレンス](https://docs.oracle.com/en/database/oracle/oracle-database/23/arpls/DBMS_FLASHBACK.html)
- [DBMS_FLASHBACK_ARCHIVE パッケージ リファレンス](https://docs.oracle.com/en/database/oracle/oracle-database/23/arpls/DBMS_FLASHBACK_ARCHIVE.html)
- [DBMS_CLOUD_ADMIN パッケージ リファレンス（Autonomous Database）](https://docs.oracle.com/en-us/iaas/autonomous-database-serverless/doc/dbms-cloud-admin-package.html)
- [V$UNDOSTAT ビュー リファレンス](https://docs.oracle.com/en/database/oracle/oracle-database/23/refrn/V-UNDOSTAT.html)
- [V$DATABASE ビュー リファレンス](https://docs.oracle.com/en/database/oracle/oracle-database/23/refrn/V-DATABASE.html)
