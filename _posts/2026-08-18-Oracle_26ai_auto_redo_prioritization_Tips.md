---
layout: post
title: "Oracle 26ai Auto Redo Prioritization Tips"
category: Oracle
tags: Oracle 26ai Tips
---

* content
{:toc}
Oracle 26ai Auto Redo Prioritization



### 一、概述

在业务关键型应用中，可预测的数据库响应时间以及通过 Data Guard 最小化数据丢失风险的保护是必不可少的。当 Redo 生成量突然激增时，主数据库可能发生**日志缓冲区空间不足**，从而影响面向客户的会话。此外，异步备用数据库的传输延迟可能增加，从而影响目标恢复要求。

为了自动应对此类情况，**Oracle AI Database 26ai Release Update 23.26.3** 引入了 **Auto Redo Prioritization** 功能。

---

### 二、核心机制

Oracle AI Database 26ai 在问题状态持续期间，通过**减少表现出批处理行为的会话的 Redo 生成量**来进行 Redo 优先级排序。

- **OLTP 会话不会受到此优先级控制的直接影响**
- 批处理产生的 Redo 生成量减少，OLTP 会话的性能最终可能作为附带效果得到改善

---

### 三、为何需要此功能

现有的 Resource Manager 功能允许管理员根据定义的工作负载分类和策略来控制工作负载行为。但是，它**无法根据变化的 Redo 生成情况自动适应**。

在许多企业环境中，OLTP、批处理、数据摄取、维护处理等会共享相同的服务或数据库用户，事先明确分离工作负载是不现实的。

Auto Redo Prioritization 正是为这种**混合多种类型且情况不断变化的工作负载**而设计的：
- 管理员无需事先识别和分类所有 Redo 生成源
- 根据当前的 Redo 状况运行
- 仅在需要时应用 Redo 优先级控制

---

### 四、场景一：日志缓冲区空间不足时保护 OLTP 响应性

当会话开始等待 `log buffer space wait` 事件时，可能会影响 OLTP 应用程序的响应时间。

启用针对日志缓冲区空间的 Redo Prioritization 后：
- Oracle AI Database 持续监控 Redo 日志缓冲区的使用情况
- 当空闲空间低于阈值时，应用 Redo Prioritization
- 使 OLTP 工作负载更容易使用 Redo 相关资源

**潜在好处**：提高 OLTP 吞吐量和更可预测的响应时间。

#### 配置方式

```sql
ALTER SYSTEM SET LOG_REDO_PRIORITIZATION = TRUE;
```

| 属性 | 说明 |
|------|------|
| 默认值 | `FALSE` |
| 是否需重启 | **否**，动态参数 |
| RAC 环境 | 可为每个实例单独设置 |

> ⚠️ **注意**：Auto Redo Prioritization **不能替代正常的 Redo 调优**。Redo 日志大小、存储性能、日志缓冲区配置、工作负载设计等仍然很重要。此功能是作为混合工作负载中发生临时日志缓冲区竞争时可用的**额外保护机制**。

---

### 五、场景二：使异步备用数据库保持接近主数据库的状态

异步 Redo 传输通常是在需要确保主数据库性能不受与远程备用数据库通信延迟影响时的合适选择。但是，当 Redo 生成量突然增加时，可能会暂时超过 Redo 传输的吞吐量，导致：
- 传输延迟增加
- 备用数据库状态进一步落后于主数据库
- **潜在数据丢失风险增加**

#### 工作原理

为异步物理备用目标定义**阈值传输延迟**。当传输延迟超过该阈值时：
1. REDO 传输通知 Resource Manager
2. Resource Manager 应用 Redo 优先级
3. 自动降低批处理会话的 Redo 生成速率

#### 配置方式

**方式一：直接设置 LOG_ARCHIVE_DEST_n**

```sql
ALTER SYSTEM SET LOG_ARCHIVE_DEST_3 =
  'SERVICE=boston ASYNC NOAFFIRM
   VALID_FOR=(ONLINE_LOGFILES,PRIMARY_ROLE)
   DB_UNIQUE_NAME=boston
   REDO_PRIORITIZATION_WHEN_TRANSPORT_LAGS_BY_SEC=20';
```

- 指定**非零值**启用此功能
- 默认值 `0` 表示禁用

**方式二：Data Guard Broker 配置**

```sql
EDIT DATABASE newyork SET PROPERTY
   AdditionalLadAttributes='REDO_PRIORITIZATION_WHEN_TRANSPORT_LAGS_BY_SEC=20';
```

#### 与 Fast-Start Failover 配合

在使用传输延迟作为 `FastStartFailoverLagLimit` 的 FSFO 环境中，建议将 Auto Redo Prioritization 的传输延迟阈值设置为**低于 FSFO Lag Limit** 的值。这样可在传输延迟达到 FSFO Limit 之前，主数据库就有机会减少 Redo 生成量。

> ⚠️ **重要**：Auto Redo Prioritization 不会影响表现出 OLTP 行为的会话，而只会影响表现出批处理行为的会话。因此，由 OLTP 会话引起的 REDO 激增仍可能增加传输延迟。

---


| 项目 | 说明 |
|------|------|
| **适用版本** | Oracle AI Database 26ai RU 23.26.3+ |
| **核心思想** | 资源紧张时，自动降低批处理类会话的 Redo 生成速率，优先保障 OLTP 和 Data Guard 同步 |
| **作用对象** | 仅影响"批处理行为"的会话，**不影响 OLTP 会话** |
| **两大场景** | ① 日志缓冲区空间不足 → 保护 OLTP 响应时间；② 异步备库传输延迟超标 → 减少备库 lag |
| **配置参数** | `LOG_REDO_PRIORITIZATION=TRUE`（动态参数）；`REDO_PRIORITIZATION_WHEN_TRANSPORT_LAGS_BY_SEC=秒数` |
| **与 Resource Manager 的区别** | 无需管理员预先对工作负载做分类和策略定义，**全自动根据当前 Redo 状况自适应** |
| **注意事项** | 不能替代 Redo 调优，只是临时竞争的兜底保护机制；OLTP 自身产生的 Redo 激增不会受此功能抑制 |


### Ref


[Auto Redo Prioritization: helping manage redo generation spikes](https://blogs.oracle.com/oracle4engineer/ja-auto-redo-prioritization-helping-manage-redo-generation-spikes)  


### Good Day

Have a good work&life! 2026/08 via LinHong
