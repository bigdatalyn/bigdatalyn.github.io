### 数据库发展 

1980 商业 EF IBM/Oracle/SysBase
1990 开源 Mysql/PG
2000 互联网 MySql/2006 大数据 Hadoop
2010 移动互联网 Aurora/TiDB/Spanner
2020 HTAP 在线处理和在线分析融合

驱动力：
业务发展 -》 数据容量：数据存储量/吞吐量/读写QPS
场景创新 -》 数据模型与交互效率：查询语言/计算模型/数据模型/读写延迟
硬件与云计算发展 -》数据架构的变迁：读写分离/一体机/云原生

数据容量

单节点-》共享状态 RAC -》 分布式

水平扩展
数据类型变化： NoSQL 非结构化数据 不支持事务 -》 NewSQL


### 分布式数据库

发展的内部原因

原理理论

明确NewSQL定义

1965年 Moore 摩尔定律 18个月：计算系统承载计算量的增长大于摩尔定律

需要分成若干个小块


2006/
GFS 存储
Google BigTable Hash分布
Google MapReduce 计算存储分布

最大程度的分治
全局一致
故障容错
不可靠的网络分区

CAP理论

一致性：同一时间 全部分区数据的一致性（副本一致性）
可用性：服务在响应时间内响应
分区容忍性：分区节点发生故障或者网络发生故障不能用是，整体依旧对外提供服务

DBengineer
72% RDBMS

事务：ACID
原子性：事务包含的操作是一个不可分割的整体，要么全做，要么不做
一致性：事务前后保持一致性状态，不能违反数据一致性的检测（事务一致性）
隔离性：各个事务相互影响的程度，多个事务对同一数据进行处理的行为，脏读/可重复度/幻读
持久性：事务一旦完成，需要存下来，包括副本


NewSQL：分布式系统+SQL+事务


### TiDB

分布式关系系统


2012 Spanner/F1/Raft

横向扩展云原生数据库

开放源码
开放态度
开发社群

2015 年开源

### 需要什么样的数据库

扩展性：scall up 弹性 集群/分表/

强一致性高可用 多数派

RTO足够小

标准SQL-》支持ACID事务

云原生

HTAP：数据服务（海量OLAP/OLTP，资源隔离

主流生态协议






