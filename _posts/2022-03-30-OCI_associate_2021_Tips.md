---
layout: post
title: "Oracle Architect Associate 1Z0-1072-21 Tips"
category: OCI
tags: OCI Tips
---

* content
{:toc}

Oracle Architect Associate Summary




### Japanese Summary

```
OCI Introduction
OCI Architecture
Region：遅延などの基準となる物理的なデータセンターの位置
Availability Domains(AD) : Regionに建てられた独立的なデータセンター
Fault Domains(FD) : 各ADには三つのFDが存在する。FDは論理的な区画でハードウェアを共有しないが、AD自体が地震などで破壊された場合は同時に故障する可能性がある。
IAM
Identity Concepts
Users, principals またはGroupsに　
Compartmentsに属するResourcesに対しての　
Actionを許可するPolicyを作る。

即ち、Policyがないすべての行動はデフォルトで禁止されている。

AuthN(Authentication)
Users, Principals
Resourcesと相互作用する主体。PrincipalsはOCIインスタンスなどの人ではないIAM entityを意味する。

Users - Group
Principals - Dynamic Group
認証方法
IAM Authentication - User name, Password。
API Signing Key - RSA key pair(PEM)。CLIなどで使用
Auth Tokens - Token string。Third party APIなどで使用
AuthZ(authorization) - Policy
形式：Allow Subjects to Actions in Placement where Condition

Subjects Clause - 誰に
group, dynamic-group, service - id, ocid, nameで指定
any-user : tenancy内のすべてのユーザー
Actions Clause - 何を
verb : inspect, read, use, manage
resource : Any-resource、またはリソースの種類を指定。Individual resource typeをまとめたAggregate resource typeも存在する（例：object-family = buckets + objects)
Placement Clause - 何処の
Compartmentを指定する。即ち、PolicyはCompartmentに対するアクセスを制御する。
Compartmentは論理的な区画なのでRegionを跨ぐことができる。
Nested Compartment(最大6段階）の場合、Policyも継承する。

Condition Clause
request条件 : request.region='phx'
target条件 : target.compartment.id='ocid'
Tag-based Access Control
Condition ClauseにTagを使えばany-usersやdynamic-groupの範囲を限定する事ができる。

Networking
VCN(Virtual Cloud Network)
Networkを管理するための論理的な区画
リージョンを跨ぐことはできない
重複されないCIDRブロックで一つ以上のサブネットを持つ事ができる
サブネット
VNICはサブネットの中に存在する。
一つ以上のVNICを持つ。
Security
Security List(SL)
サブネットに出入りするパケットをコントロール（ファイアウォール）
Network Security Group(NSG)
VNICのグループを作りグループに対するSecurity Listを作る感じ。
SLと同時に使う事ができる。SLとNSGの和集合がVNICレベルで適用される。
Bastion
外部からprivate IPに接続できるようにしてくれる中継サーバ

接続
Public Internet
一般の方法

VPN(IPsec)
on-premissサーバとOCIサーバを繋ぐとき使える。
実際はPublic Internet＋VPN

FastConnect
Oracle専用回線。プロバイダーのサポートが必要。専用回線なのでSLAもある。

Gateways
Gatewayは言葉通りただの関所。パケットを流すにはルートテーブルを操作する必要がある。

Internet Gateway
外部のネットワークと繋げる。両方向。

NAT Gateway
内部から外部のネットワークに一方的に繋げる。

Service Gateway
OCIの他のサービスに繋げる。

Dynamic Routing Gateway（DRG)
Service Gateway＋NAT Gatewayの感じ。VPNで繋いだ自分のon-premissサーバやOCIに作った他のVCNなど、自分が管理するOCI内部のネットワークの間を繋ぐことができる。

Local peering：本来はDRGの領分ではなかったがアップグレードされてDRGで繋ぐ方が便利みたい
Remote Peering
DNS
普通のDNSサービス

Traffic management
DNSに接近したユーザーにロードバランサーのように違うIPを返すことができるサービス

ロードバランサー
普通のロードバランサー

Layer4 TCP
Layer7 HTTP
Network Visualizer
ネットワークの要素達を視覚化してくれる。

Compute
インスタンスの種類
Virtual Machine(VM):共有モデル
Bare metal,Dedicated VM(bare metal+VM)：資源を独り占めする。オートスケール出来ない。
Preemptible VM：安いけど時々止まるVM。仕様変更はできない。インスタンスを止めることも出来ない。
Brustable VM：一時的に速くなることができるVM。AWSのEC２みたいな？
Shapes
インスタンスの仕様

Fixed shapes：指定される仕様のインスタンス使う
Flexible shapes : CPU、Memoryを調節可能。VMだけ選択可能
Image Sources
Oracle-provided
Oracle Linux, Oracle Windows

Custom images
自分のインスタンスをイメージ化して使う

Marketplace
サードパーティのイメージ

Bring your own image
on-premissのイメージをアップロードして使う

Autoscaling
インスタンスからConfigを作り、Configを用いってPoolを作る。PoolにAutoscalingを適用するとConfig化したインスタンスがオートスケールされる。

Metric-based Autoscaling：CPUの占有率などを基準にオートスケールする
Schedule-based Autoscaling：特定の時間にcron式を使うことができる。scale-outとscale-inを分けて設定する必要がある。
OS Management
OSのアップデートなどを管理してくれる。

Migration
Live Migration
Reboot Migration
Manual Migration
Storage
Blockストレージ, Objectストレージ, Fileストレージは耐久性があるストレージサービス

Block Storage
NVMe SSD
50GB - 32TB
Paravirtualization or iSCSI
最大３２個のブロックストレージをマウントできる。
容量を上げることができるが下げることはできない
一つのブロックストレージを最大８個のインスタンスで共有することができる。しかし競合は自己責任。
Object Storage
AWSのS3に該当する。バケットにオブジェクトを保管する。Auto-tieringを使えば自動にアクセスパターンを解析して安いストレージにオブジェクトを送ってくれる。しかし、ストレージ自体にティア変更はできない。

Standard Storage Tier(Hot)
普通のオブジェクトストレージ
Archive Storage Tierにダウングレードできない
Infrequent Access Storage Tier(Cool)
取り出しにコストがかかる
最低で３１日間保管しなければいけない
Archive Storage Tier(Cold)
復元（取り出し）にコストがかかる
復元（取り出し）におよそ１時間待たなければいけない
最低で９０日間保管しなければいけない
File Storage
NFSv3でマウントして使う
Linux, Windowsを含む殆どのOSとhypervisorで使用可能
10,000個のスナップショット
OCIで提供するツールを使えば通信を暗号化できる
Database
Autonomous database
OCIで管理してくれるデータベース。とにかく自動。共有モデル、占有モデル、会社内に設置してOCIと繋ぐ＠CUSTOMERモデルがある。

オプション
Standard Edition 2
Enterprise Edition：Data Guard（standby backup)
Enterprise Edition High Performance
Enterprise Edition Extreme Performance：Active Data Guard（active backup), Oracle RAC(Real Application Cluster)
仕様
VM : 最大24個のOCPU、最大320GBメモリー、最大40TBブロックストレージ
RAC on VM : 最大48個のOCPU、最大640GBメモリー、最大40TBブロックストレージ
Bare metal：最大52個のOCPU、最大768GBメモリー、最大16TBブロックストレージ
MySQL
兎に角、自動。HeatWaveというインメモリー・クエリ・アクセラレーターがあるのが特徴的

NoSQL
普通のNoSQL

Security
Cloud Guard
誤って外部に公開したリソースなどを探して教えてくれる

Security Zone ＆ Security Advisor
Compartmentに強いセキュリティ制限をかける。Security Advisorはどうやったらセキュリティ制限を破らないで作業できるか教えてくれる。

Vulnerability Scanning
インスタンスなどをスキャンしてオープンされているポートなどを発見してくれる。

Vault
名前の通りの暗号化サービス。OCIの中の様々なサービスでValutを使う

AES, RSA, ECDASを使える
Envelope Encryption
Vaultにはマスターキーだけが保管される。
ユーザーのデータキーとVaultの中のマスターキーかけてEnvelope Encryptionを実現する
Web Application Firewall(WAF)
名前の通りアプリケーションレベルのファイアウォール

CAPTCHA
Cross-Site Scripting (XSS)
SQL Injection
などを防ぐ

Observability and Management
Monitoring
インスタンスなのどリソースのメトリックを集めて見せてくれる。

Alarm
メトリックが設定した値を超えるとAlarmを鳴らす。具体的にはOCI Notificationをトリガーする

Notification
Alarmを受けてtopicにメッセージを流す。

topic
メールやSlackにNotificationを送るための通信チャネルを指す。

Event
OCIのリソースが変化するときにイベント（一種のシグナル）が発生する。

Action
Eventが発生するときにファイヤーすることができる。

Functions
Notification
Streaming(AssociateではカバーされないがApache Kafkaみたいなサービス）
```

### Reference

[OCI Architect 2021 Associate [1Z0-1072-21] のまとめ](https://qiita.com/syo0901/items/0c089e4cbb06f37ad49a)



Have a good work&life! 2022/03 via LinHong

