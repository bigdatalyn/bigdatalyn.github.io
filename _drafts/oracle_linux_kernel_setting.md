


Oracle Database 用 Red Hat Enterprise Linux のカーネル・パラメーター設定を比較する

https://qiita.com/plusultra/items/c0989f5f960760b8718c


推奨されるカーネル・パラメーター
最小限変更が必要なパラメーター以外にいくつかのパラメーター変更が推奨されています。推奨値として参考になる情報は以下の３つです。

Tuned Profile for Oracle
　Oracle Database 用の Tuned Profile は Red Hat Enterprise Linux に同梱されている tuned-profiles-oracle-2.19.0-1.el8.noarch.rpm になります。このプロファイルを適用することでカーネル・パラメーターの設定を変更します。/usr/lib/tuned/oracle/tuned.conf ファイルが実体です。

Oracle Preinstallation RPM
　Oracle Preinstallation RPM は Oracle が提供する RPM パッケージです。
検証では oracle-database-preinstall-23c-1.0-0.5.el8.x86_64.rpm を使っています。カーネル・パラメーターの設定以外に、ユーザーの作成やその他の OS 設定も自動的に行ってくれます。

ORAchk ユーティリティ
ORAchk ユーティリティは Oracle が提供するツールで、稼働中の Oracle Database や OS 設定をチェックしてベストプラクティスと比較しレポートを出力するツールです。カーネル・パラメーターだけでなく、Oracle Database の初期化パラメーター、NIC のボンディング設定有無まで非常に広い範囲のチェックを行うことができます。
　ただし ORAchk ユーティリティは設定変更までは行いません。今回は最新の ORAchk 23.3 を使ってチェックしました。

Red Hat Enterprise Linux 8 Update 7 に対してこれら３つのツールを導入し、チェックを行った結果、以下のような値になりました。

