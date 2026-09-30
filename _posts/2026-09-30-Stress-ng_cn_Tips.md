---
layout: post
title: "stress-ng 调查与实验手册 Tips"
category: Linux
tags: stress-ng Tips
---

* content
{:toc}
stress-ng 调查与实验手册 Tips (AI 汇总)

## 目录

1. [工具定位与适用边界](#1-工具定位与适用边界)
2. [平台选择与安装](#2-平台选择与安装)
3. [核心概念与参数速查](#3-核心概念与参数速查)
4. [安全准备与停止方法](#4-安全准备与停止方法)
5. [实验前基线与监控](#5-实验前基线与监控)
6. [分级实验清单](#6-分级实验清单)
7. [如何阅读结果](#7-如何阅读结果)
8. [可复现实验与日志保存](#8-可复现实验与日志保存)
9. [故障定位速查](#9-故障定位速查)
10. [实验记录模板](#10-实验记录模板)
11. [官方资料与后续方向](#11-官方资料与后续方向)













## 1. 工具定位与适用边界

`stress-ng`（stress next generation）是 Colin Ian King 主导开发的开源系统压力测试工具，许可证为 GPL-2.0-or-later。它是对传统 `stress` 的独立重实现和扩展，不是两者完全兼容的替换品。

官方 README 在本次调查版本中列出 **390+ stress tests**；这不代表每台机器都能运行全部测试。实际能力取决于操作系统、CPU 指令集、内核、编译选项、依赖库和权限。

### 1.1 适合做什么

| 目标 | 用法 | 重点观察 |
| --- | --- | --- |
| 硬件稳定性初筛 | CPU、内存、缓存持续负载 | 温度、降频、计算校验失败、机器重启、硬件错误日志 |
| 内核与系统接口验证 | 内存映射、调度、IPC、文件系统、socket 等 stressor | syscall 错误、hung task、内核告警、资源回收 |
| 压力下的应用行为 | 在受控资源范围内加载，同时运行真实业务 | 延迟分位数、吞吐、超时率、错误率 |
| 配置或版本变化观察 | 固定命令、版本和资源配额，重复 A/B 实验 | 同类 stressor 指标变化及系统监控差异 |
| 容器资源限制验证 | 配合 cgroup / 容器限制 | throttling、OOM、资源上限、宿主机影响 |

### 1.2 不应当用来证明什么

- **不是精密基准测试套件**：官方明确反对将 bogo ops 当作可靠的性能跑分。
- 不能把不同 stressor 的 bogo ops/s 横向比较，也不能直接解释为 FLOPS、IOPS 或 MB/s。
- 一次测试成功不能证明“硬件绝对可靠”；VM 测试也不能保证覆盖所有物理内存。
- 本机 socket 压力不等于真实网络链路带宽或远端服务容量。
- 通用合成负载不能替代数据库、HTTP 服务或真实业务负载测试。

| 工具 | 与 stress-ng 的分工 |
| --- | --- |
| `stress` | 简单 CPU、内存、I/O 压力；选项与 stress-ng 不宜混用 |
| `fio` | 存储 IOPS、带宽、延迟分布与可控 I/O 模型 |
| `iperf3` | 两端网络吞吐测量 |
| `sysbench` | 部分通用基准与数据库工作负载 |
| Memtest86 / Memtest86+ | 启动环境下更系统的物理内存检查，支持平台需另行确认 |
| `perf`、`vmstat`、`iostat` | 观测工具，与 stress-ng 配合分析瓶颈 |

## 2. 平台选择与安装

### 2.1 选择实验平台

| 平台 | 建议 | 边界 |
| --- | --- | --- |
| 原生 Linux 测试机 | 首选，尤其是内核、cgroup、NUMA、I/O 实验 | 仍受内核版本、权限与依赖影响 |
| Linux 虚拟机 | 适合学习命令、验证流程和资源限制 | 结果包含虚拟化影响；不能直接归因于物理硬件 |
| macOS 原生 | 适合支持的 CPU、内存等基础实验 | Linux 专用 stressor、`/proc`、cgroup、`perf` 等不可照搬 |
| macOS 上的 Docker | 可练习 Linux 用户态测试 | Docker Desktop 通常通过 Linux VM 运行，测的是 VM / 容器及其配额 |
| Linux 容器 | 适合隔离实验、验证 cgroup 行为 | 与宿主机共享内核；容器不是硬件安全隔离边界 |

Apple Silicon 有不同性能特性的核心。macOS 调度与 Linux 的 CPU 编号、亲和性机制也不同，不要把 Linux `--taskset` 实验直接搬到 macOS。

### 2.2 包管理器安装

以下为安装示例，不需要为普通测试使用 root；`sudo` 仅用于软件安装。

**Debian / Ubuntu：**

```bash
sudo apt update
sudo apt install stress-ng
```

需要外部监控时，可另装 `sysstat`（提供 `iostat`、`mpstat`）、`lm-sensors`（视硬件提供温度读数）。使用发行版仓库通常比直接添加第三方源更容易管理。

**Fedora / 支持相应仓库的 RHEL 系发行版：**

```bash
sudo dnf install stress-ng
```

RHEL 系发行版可能需要组织允许的额外仓库；包不存在时先查仓库，不要默认启用未知软件源。

**macOS / Homebrew：**

```bash
brew install stress-ng
```

本次查询的 Homebrew stable 版本为 `0.22.01`，提供 ARM64 bottle。实际安装版本与可用平台以公式页面为准。

**安装后确认：**

```bash
stress-ng --version
stress-ng --help
stress-ng --stressors
stress-ng --verifiable
man stress-ng
```

`--stressors` 是测试名称清单，不是“这些测试都可在当前环境成功运行”的保证。

### 2.3 源码构建：需要固定版本时使用

Linux 上先安装 Git、make、C/C++ 编译器；Debian / Ubuntu 的基础依赖可使用：

```bash
sudo apt install git build-essential
git clone --branch V0.22.01 --depth 1 https://github.com/ColinIanKing/stress-ng.git stress-ng-src
cd stress-ng-src
make -j2
./stress-ng --version
```

macOS 需要 Xcode Command Line Tools；上游给出的构建方式为 `make clean`、`make`。源码目录更新后应重新 `make clean`，避免使用过期的特性探测结果。

依赖库不齐全时，上游构建通常会禁用相应功能，不代表完整功能构建。追求覆盖面时，按官方 README 的平台依赖清单补齐，并记录 `--buildinfo` 与 `--config` 输出。可直接使用 `./stress-ng`，不必安装到系统目录。

### 2.4 容器入口：先只查看帮助

```bash
docker run --rm ghcr.io/colinianking/stress-ng --help
```

这是官方 README 提供的滚动镜像入口，**不是固定的 V0.22.01 镜像**。正式复现时记录镜像 digest，并使用 digest 固定镜像。

首次压力实验应显式设置 CPU / 内存限制；先执行容器内 `--dry-run`。不要一上来加入 `--privileged`、宿主机设备映射或可写业务目录挂载。容器 CPU 限额不一定改变程序探测到的 CPU 数量，因此不要用 `--cpu 0` 代替显式 worker 数。

## 3. 核心概念与参数速查

### 3.1 stressor、worker、method、class

- **stressor**：一种压力生成器，如 `cpu`、`vm`、`hdd`、`sock`。
- **worker**：该 stressor 的并发实例。某些实例还会创建额外子进程或线程，因此 `--sock 1` 不等于只有一个进程。
- **method**：stressor 内部算法，如 `--cpu-method sqrt`、`--vm-method write64`。
- **class**：类别标签，如 `cpu`、`memory`、`filesystem`、`network`、`scheduler`。一个 stressor 可属于多个类别。

基础结构：

```bash
stress-ng --cpu 2 --cpu-method sqrt --timeout 30s --verify --metrics-brief
```

同时指定多个 stressor 时，默认并发运行：

```bash
stress-ng --cpu 1 --vm 1 --vm-bytes 128M --timeout 30s --metrics-brief
```

### 3.2 关键参数

| 参数 | 含义 | 使用提醒 |
| --- | --- | --- |
| `--cpu N`、`--vm N`、`--hdd N` | 启动指定数量的对应 worker | 初次用 `1`，不要凭逻辑 CPU 数给所有测试开满 |
| worker 数 `0` | 使用系统配置的 CPU 数；无法确定时回退在线 CPU 数 | 不是“零个 worker”，也不是 cgroup 限额 |
| worker 数负值 | 使用在线 CPU 数 | Linux 亲和性、容器限额与在线 CPU 数是不同概念 |
| `--timeout 30s` | 请求运行时长，可用 `s`、`m`、`h` 等单位 | 默认 24 小时；`0` 表示无超时；清理或阻塞可延迟结束 |
| `--cpu-method sqrt` | 固定 CPU 算法 | 默认 `all` 会轮换方法，不利于算法级对比 |
| `--cpu-load 50` | CPU worker 的目标忙闲比例 | 只作用于 `cpu` stressor，不控制 `matrix` 等其他测试 |
| `--vm-bytes 256M` | 内存压力容量 | V0.22.01 为所有 vm worker 的总量，见下节 |
| `--vm-keep` | 保留映射、反复改写 | 不等于锁定物理内存；无此选项时更侧重映射/解映射 |
| `--hdd-bytes 128M` | 每个 hdd worker 的文件写入规模 | 不是整个测试的累计写入上限 |
| `--temp-path PATH` | 临时目录根路径 | 默认当前工作目录；必须显式选择可写测试目录 |
| `--verify` | 对支持的测试执行结果校验 | 不是所有 stressor 都支持，也不是完整硬件诊断 |
| `--abort` | 一个 stressor 发生失败时终止其余测试 | 不是温度或容量保护机制 |
| `--metrics` / `--metrics-brief` | 输出汇总指标 / 简版指标 | 指标需要按 stressor 解释 |
| `--log-file FILE` | 保存工具日志 | 不包含外部监控，文件名应避免重复 |
| `--yaml FILE` | 输出 YAML 统计 | 不能替代退出码与完整日志 |
| `--seed 42` | 固定伪随机初始种子 | 不能固定线程调度、物理页分配与系统背景噪声 |
| `--dry-run` | 解析参数但不运行压力 | 不能验证实际资源是否足够或硬件是否支持 |
| `--sequential N --with LIST` | 对指定 stressor 逐项运行 N 个实例 | `--timeout` 对每一项生效，不是总时长 |
| `--class 'memory?'` | 查询某类 stressor | 引号避免 shell 将 `?` 当通配符；仅列出清单 |
| `--taskset LIST` | 限定运行 CPU 集合 | 按平台支持和可用 CPU 集合确认；不宜机械指定 CPU 0 |

### 3.3 特别注意容量语义与版本差异

**V0.22.01 的 `--vm-bytes` 是总量，分摊给 vm workers。** 官方 man page 写明 “mmap N bytes in total”，源码实际采用 `vm_total / args->instances`，另有最小值和页对齐处理：

```bash
stress-ng --vm 2 --vm-bytes 256M --timeout 30s
```

在该版本中，每个 vm worker 的目标映射约为 `128M`，不是每个 `256M`。历史版本/旧教程可能采用“每 worker”描述；不能跨版本套用。首次实验统一用 `--vm 1` 和绝对容量，以规避歧义。

内存映射量不等于 RSS：实际驻留量、附加进程开销、页表、缓存、swap 和内存回收均会影响观测。`--vm-bytes 80%` 这类写法并不是“最多使用容器内存上限的 80%”的可靠保证，应优先使用根据宿主机与 cgroup 余量计算的绝对值。

**`--hdd-bytes` 按 hdd worker 计算。** `--hdd 2 --hdd-bytes 128M` 需为约 `256M` 的文件数据以及元数据等额外开销预留空间。它会循环写读，累计写入可远大于 `256M`。

## 4. 安全准备与停止方法

### 4.1 开始前检查

- 使用独立测试机、可回滚 VM 或专用测试容器；避免在生产主机和正在进行重要工作的桌面上运行。
- 保存工作，确认有备份、空闲磁盘空间、健康散热和稳定供电。
- 初次使用普通用户，显式指定 **1 个 worker、10–30 秒、小容量**，先 `--dry-run`。
- 为内存实验预留操作系统、业务与监控所需余量；不要仅依据总物理内存决定容量。
- 为磁盘实验选择独立目录/测试卷；`/tmp` 在某些 Linux 上是 tmpfs，实际产生的是内存压力。
- 在另一终端开启监控。远程实验保留第二个 SSH 会话，必要时准备带外管理。
- 确定停止条件：出现业务超时、持续 swap、温度接近厂商限制、明显降频、内核错误、容量不足时立即停止。

不要设置一个适用于所有硬件的固定温度阈值，应参考 CPU/设备规格和现场基线。

### 4.2 初学阶段避免的选项和测试

不要直接使用 `--all 0`、不加筛选的 `--sequential 0`、`--maximize`、`--aggressive`、`--thrash`，也不要启动无资源上限的 `bigheap`、大量 `fork` 或其他可能耗尽资源的组合。

特别注意：`io` stressor 会反复调用 `sync()`，可能影响共享系统上的其他文件写回；`iomix` 是多种 I/O 活动组合，也不是低风险的磁盘带宽测试。初次存储实验优先使用有明确目录和容量的 `hdd`。

官方提醒：root 运行会涉及 Linux OOM 分数调整，使低内存时的行为更具侵扰性。`--no-oom-adjust` 可禁用其 OOM 分数调整，但不构成隔离；`--oom-avoid` 也只是尽力避免 OOM，不能代替资源预算和 cgroup 限制。

### 4.3 停止实验

1. 前台运行时先按 `Ctrl+C`。工具收到 SIGINT 会尝试终止 worker 并清理临时文件和共享内存。
2. 必要时定位自己启动的父进程，发送 SIGINT：

```bash
pgrep -a stress-ng
kill -INT "${STRESS_NG_PID:?请先设置本次实验的父进程 PID}"
```

先将变量 `STRESS_NG_PID` 设置为确认过的本次实验父进程 PID，再执行 `kill`；未设置时上面的命令会拒绝执行。`pgrep -a` 示例适用于 Linux，macOS 可用 `pgrep -fl stress-ng` 查看。

3. 不要一开始就 `kill -9` 或批量杀掉其他人的实验。强杀可能留下临时文件，丢失汇总结果。
4. 如果进程处于不可中断 I/O 等待，超时和信号都可能不能立即生效。`--timeout` 不是硬性运行时上限。

## 5. 实验前基线与监控

### 5.1 Linux 基线

```bash
date -Is
stress-ng --version
uname -a
lscpu
free -h
swapon --show
df -h . /tmp
ulimit -a
```

额外记录：内核/BIOS 版本、电源模式、CPU governor、NUMA 拓扑、文件系统/挂载参数、容器配额、其他业务负载。cgroup v2 下检查目标 cgroup 的 `cpu.max`、`memory.max`、`memory.current`、`memory.events`；路径随部署而变，不要默认根 cgroup 就是目标。

### 5.2 Linux 监控：另开终端

```bash
vmstat 1
```

```bash
iostat -xz 1
```

```bash
mpstat -P ALL 1
```

```bash
watch -n 1 sensors
```

这些是独立监控方式，按实验选择，不需要全部同时开启。`iostat`、`mpstat` 来自 `sysstat`；`sensors` 取决于传感器与配置；第一条 `vmstat` 和默认 `iostat` 首份报告常含自启动以来统计，应主要关注后续采样。

| 观察项 | 重点 |
| --- | --- |
| CPU | 每核利用率、运行队列、频率、热降频；不要只看总 CPU 百分比 |
| 内存 | available、RSS、swap in/out、major fault、PSI 与 OOM 事件 |
| 存储 | 读写吞吐、`await`、队列深度、空间余量；NVMe 上 `%util` 不等于简单饱和判据 |
| 调度 | context switches、run queue、真实业务延迟 |
| 系统日志 | OOM、I/O error、hung task、MCE/EDAC；读取可能需要权限 |
| 应用 | p50/p95/p99 延迟、错误率、连接失败；需另行收集 |

Linux 上可按权限查看 `dmesg` 或 `journalctl -k`。若环境支持，`/proc/pressure/cpu`、`/proc/pressure/memory`、`/proc/pressure/io` 可反映资源等待压力。

### 5.3 macOS 基线与监控

```bash
sw_vers
uname -m
sysctl hw.logicalcpu hw.physicalcpu hw.memsize
vm_stat
df -h .
```

使用“活动监视器”观察 CPU、内存压力、swap 和磁盘；需要命令行时可分别使用 `top`、`vm_stat 1`、`iostat 1`。macOS 的工具输出与 Linux 不同，不能照搬 Linux 字段解释。温度/功耗采集需另选支持当前 macOS 和芯片的工具，不假设 `sensors` 或 `/sys/class/thermal` 可用。

## 6. 分级实验清单

> 下面所有命令均为待执行示例，不是已测结果。默认使用普通用户。
> 除标注 Linux 的项目外，也须先确认当前平台支持。先低负载、单变量，再逐级提高；不要一次复制运行整个章节。

### E0：最小冒烟测试

先检查参数，再只启动一个半负载 CPU worker：

```bash
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 50 --timeout 10s --verify --metrics-brief --dry-run
```

```bash
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 50 --timeout 10s --verify --metrics-brief
```

观察：程序能启动、输出指标、无校验错误、按预期结束、机器仍可交互。单 worker 50% 负载不等于整机 50% 利用率。

### E1：CPU 忙闲比例对比

```bash
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 25 --timeout 30s --verify --metrics-brief
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 50 --timeout 30s --verify --metrics-brief
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 100 --timeout 30s --verify --metrics-brief
```

每次测试之间等待温度与后台活动恢复基线；上面的三条不建议无间隔批量执行。

观察：每核利用率、频率与温度。`--cpu-load` 是忙/睡比例目标，调度与频率变化会使实际值不同；bogo ops 也不保证与设定负载线性变化。

### E2：CPU worker 数量对比

```bash
stress-ng --cpu 1 --cpu-method sqrt --timeout 30s --verify --metrics-brief
stress-ng --cpu 2 --cpu-method sqrt --timeout 30s --verify --metrics-brief
```

确认资源足够后再加到 `4`，不要默认满核。记录吞吐、单实例 CPU 使用率、温度、频率与业务延迟。增加 worker 后收益变小，可能来自配额、SMT、缓存、热限制或调度，并非一定是 CPU 故障。

Linux 需要绑核时，先检查当前允许集合：

```bash
taskset -pc $$
```

再选择该集合内的 CPU 编号配置 `--taskset`。不要假设容器允许 CPU 0，也不要把 worker 数与 CPU 亲和性混为一谈。

### E3：另一种计算模型——矩阵

```bash
stress-ng --matrix 1 --matrix-size 64 --timeout 30s --verify --metrics-brief
```

观察计算与缓存行为差异。`--cpu-load 50` 不会限速此测试；需要限制资源时使用系统配额，而非 CPU stressor 专用参数。矩阵结果不能与 `cpu sqrt` 的 bogo ops 直接比较。

### E4：内存保留映射与反复映射

有足够余量时，先运行保留映射版本：

```bash
stress-ng --vm 1 --vm-bytes 128M --vm-method write64 --vm-keep --timeout 30s --verify --metrics-brief
```

再比较不保留映射的版本：

```bash
stress-ng --vm 1 --vm-bytes 128M --vm-method write64 --timeout 30s --verify --metrics-brief
```

观察 RSS、page faults、system CPU、swap 和内存压力。`write64` 固定写模式；默认 `all` 会遍历方法。先比较相同容量与单 worker，再根据 **available 和 cgroup 余量**决定是否升到 `256M` / `512M`。

停止条件：明显交互卡顿、持续 swap 或 OOM；不要为了“看满内存”盲目提高容量。

### E5：缓存压力——进阶

```bash
stress-ng --cache 1 --timeout 15s --metrics-brief
```

先查当前版本缓存参数、默认分配量和平台支持。此类测试可能同时带来内存与带宽压力，不是纯 CPU 算术，也不是精确缓存带宽测量；资源紧张环境可跳过。

### E6：文件系统顺序与随机读写

先在确认有空间的测试卷上创建目录。下面使用 `$HOME`，如需测试其他设备，请改为对应专用目录：

```bash
export LAB_DISK_DIR="$HOME/stress-ng-lab-files"
mkdir -p "$LAB_DISK_DIR"
df -h "$LAB_DISK_DIR"
```

顺序读写：

```bash
stress-ng --hdd 1 --hdd-bytes 128M --hdd-opts wr-seq,rd-seq --temp-path "$LAB_DISK_DIR" --timeout 30s --metrics-brief
```

随机读写：

```bash
stress-ng --hdd 1 --hdd-bytes 128M --hdd-opts wr-rnd,rd-rnd --temp-path "$LAB_DISK_DIR" --timeout 30s --metrics-brief
```

观察吞吐、延迟、队列、缓存与 system CPU。小文件可能主要命中页缓存，不能据此得出磁盘物理带宽。此测试反复写入，SSD 累计写入和寿命风险与持续时间相关。

### E7：同步写入——进阶存储实验

```bash
stress-ng --hdd 1 --hdd-bytes 64M --hdd-opts wr-seq,fsync --temp-path "$LAB_DISK_DIR" --timeout 15s --metrics-brief
```

沿用 E6 的目录变量。`fsync` 增加每次写入后的显式同步，适合观察写回路径和延迟，不是数据库事务持久性的完整模拟。它可能干扰同设备的其他业务，需在独立测试卷上进行。

需要减少页缓存影响时，可研究 `direct`；其支持受平台、文件系统、对齐要求影响。**direct 不等于保证持久化**，上游说明若需同步 I/O 还应考虑 `sync`。不要通过全局 drop caches 给共享机器制造额外扰动。

### E8：IPC 与调度

```bash
stress-ng --pipe 1 --timeout 30s --metrics-brief
```

```bash
stress-ng --switch 1 --timeout 30s --metrics-brief
```

分别运行，观察 context switches、system CPU 和调度等待。此类模型不应只用 CPU 占用衡量有效压力，亦不能直接推导真实应用的上下文切换成本。

### E9：本机 socket

```bash
stress-ng --sock 1 --sock-domain ipv4 --sock-port 19000 --timeout 30s --metrics-brief
```

先确认端口未被占用。该 stressor 在本机执行连接、发送、接收与断开；适合观察 socket 与内核协议栈压力，不证明外部 NIC、交换机或远端服务能力。增加到 N 个 worker 会使用从指定端口开始的一段端口。

容器网络隔离和资源限制会影响结果；macOS 与 Linux 的 socket 行为可能不同。

### E10：小规模混合负载

只有 E1、E4、E6 单项测试正常后再执行：

```bash
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 50 --vm 1 --vm-bytes 128M --vm-keep --hdd 1 --hdd-bytes 64M --temp-path "$LAB_DISK_DIR" --timeout 30s --verify --abort --metrics-brief
```

这里三个 stressor 并发运行。观察业务延迟、CPU/内存/存储互相影响；`--verify` 仅对支持校验的部分生效。混合结果若异常，应退回单项模型定位，而非直接加大压力。

### E11：有限清单的顺序测试

```bash
stress-ng --sequential 1 --with cpu,vm --cpu-method sqrt --vm-bytes 128M --timeout 15s --verify --metrics-brief
```

两个 stressor 逐项运行，目标负载时间约 `2 × 15s`，还需加上启动和清理时间。类查询可用于选型：

```bash
stress-ng --class 'memory?'
stress-ng --class 'filesystem?'
```

不要看到类别清单后立即运行该类别全部测试。不同测试可能创建大量进程、文件或消耗大块内存，应先逐项审查，再用 `--with` 构造白名单。

### 建议执行顺序

| 阶段 | 选择 | 升级前条件 |
| --- | --- | --- |
| 初次使用 | E0 → E1 → E2 | 可正常停止、无错误、监控完整 |
| 内存方向 | E4，再考虑 E5 | 有明确内存预算，无持续 swap |
| 存储方向 | E6，再考虑 E7 | 测试卷独立，空间充足，无业务干扰 |
| 系统接口 | E8 → E9 | 清楚进程/端口限制，平台支持 |
| 综合稳定性 | E10 / E11 | 单项已验证，具备恢复与日志方案 |
| 延长运行 | 30s → 2m → 10m，按需更长 | 每一级恢复基线，无热/资源异常 |

## 7. 如何阅读结果

### 7.1 指标含义

| 常见列 | 含义 | 容易误解的点 |
| --- | --- | --- |
| `bogo ops` | stressor 定义的工作迭代计数 | 每种测试计数单位不同 |
| `real time` | 同类 worker 的平均墙钟运行时长 | 不是所有 worker 时长相加 |
| `usr time` | 同类 worker 累计用户态 CPU 时间 | 多核并发时可大于墙钟时间 |
| `sys time` | 同类 worker 累计内核态 CPU 时间 | 高值可能符合 syscall / I/O 模型，并非一定异常 |
| `bogo ops/s (real time)` | 总迭代数 / 墙钟时长 | 可观察同一配置趋势，不是标准吞吐单位 |
| `bogo ops/s (usr+sys time)` | 总迭代数 / 累计 CPU 时间 | 与 wall-time 指标分母不同 |
| `CPU used per instance` | 平均每实例 CPU 使用率 | 有多线程/子进程的测试可能超过 100%；简版可能省略 |
| `RSS Max` | 驻留内存相关的最大值统计 | 不能代替整机或 cgroup 内存峰值 |

某些 stressor 会额外报告具有明确单位的专用指标，仍需查该测试定义。比较时固定版本、method、worker 数、容量、配额、时长和电源状态。

### 7.2 状态与退出码

V0.22.01 官方 man page 给出的退出码：

| 退出码 | 含义 | 排查方向 |
| --- | --- | --- |
| `0` | 成功 | 仍需检查是否跳过目标测试、是否达到预期负载 |
| `1` | 参数错误或 harness 致命资源问题 | 命令、权限、内存等 |
| `2` | 一个或多个 stressor 失败 | 保存 fail 日志，单项复现 |
| `3` | 因资源或接口不足而初始化失败 | ENOMEM、ENOSPC、缺失/未实现 syscall 等 |
| `4` | 架构或操作系统未实现某些 stressor | 查看平台支持，不等于硬件损坏 |
| `5` | stressor 被非预期信号杀死 | OOM、外部终止、异常信号 |
| `6` | stressor 非预期退出，未收集到时间指标 | 日志与平台异常 |
| `7` | bogo ops 指标可能不可信 | 中断计数更新、OOM 或计数状态异常 |

解释退出码时同时看完整日志、shell/容器退出状态和系统事件；外层运行器可能改变最终状态值。不要将“成功退出”理解为“所有目标测试都完整通过”或“硬件认证通过”。

### 7.3 简单验收标准

对初次小规模实验，可将以下作为操作性验收标准：目标 stressor 实际运行、退出状态符合预期、没有校验 fail 或内核错误、无意外 OOM、温度可控、资源峰值在预算内，停止后进程与测试资源正常回收。

这些标准只说明本次模型和时段内未见异常，不提供长期可靠性或性能 SLA 保证。

## 8. 可复现实验与日志保存

### 8.1 保存一次 CPU 实验

下面是 **Bash 示例**，不要将 `${PIPESTATUS[...]}` 与 zsh 的数组规则混用。未使用管道，直接保存 stress-ng 的实际退出码：

```bash
run_dir="runs/$(date +%Y%m%d-%H%M%S)-cpu"
mkdir -p "$run_dir"
stress-ng --version > "$run_dir/version.txt" 2>&1
uname -a > "$run_dir/system.txt"
stress-ng --buildinfo > "$run_dir/buildinfo.txt" 2>&1
stress-ng --cpu 1 --cpu-method sqrt --timeout 10s --seed 42 --verify --metrics-brief --dry-run > "$run_dir/dry-run.txt" 2>&1
if [ "$?" -eq 0 ]; then
    printf '%s\n' 'stress-ng --cpu 1 --cpu-method sqrt --timeout 10s --seed 42 --verify --metrics-brief' > "$run_dir/command.txt"
    if stress-ng --cpu 1 --cpu-method sqrt --timeout 10s --seed 42 --verify --metrics-brief --log-file "$run_dir/stress-ng.log" --yaml "$run_dir/metrics.yaml" > "$run_dir/console.txt" 2>&1; then
        result_code=0
    else
        result_code=$?
    fi
    printf '%s\n' "$result_code" > "$run_dir/exit-code.txt"
else
    printf '%s\n' 'dry-run failed; stress test not started' >&2
fi
```

该示例会产生真实负载，只有确认安全后才执行。运行目录的秒级命名通常足够手动实验；自动化并发运行时应改用唯一目录，避免覆盖。另行保存监控和应用指标。

同一配置建议重复 3–5 次，预先约定预热和冷却方式，记录中位数及波动；出现异常时保留异常样本，不要只挑最好的结果。固定随机种子不等于完全确定性执行。

### 8.2 Jobfile：复用测试配方

将下面内容保存为 `cpu-smoke.job`。这是 stress-ng 配置格式，不是 shell 脚本，也不是 YAML：

```text
run parallel
cpu 1
cpu-method sqrt
cpu-load 50
timeout 10s
seed 42
verify
metrics-brief
```

```bash
stress-ng --job cpu-smoke.job --dry-run
stress-ng --job cpu-smoke.job --log-file cpu-smoke.log --yaml cpu-smoke.yaml
```

Jobfile 每行写一个选项，去掉开头的 `--`。正式实验中为输出文件使用唯一名称，并同时保存 jobfile、版本、监控和退出码。它不提供资源隔离。

## 9. 故障定位速查

| 现象 | 可能原因 | 下一步 |
| --- | --- | --- |
| `unrecognized option` / method 不存在 | 软件包较旧、参数拼写、平台差异 | 查本机 help/man/version，不先盲目升级 |
| stressor skipped / not implemented | syscall、指令集、依赖库或权限不足 | 保存日志、确认编译配置；不默认加 root |
| CPU 占用没有预期高 | worker 数少、CPU 配额、亲和性、`cpu-load`、I/O 等待 | 查每核、配额和允许 CPU 集合 |
| worker 增加但结果下降 | 缓存/内存带宽争用、配额、热降频 | 退回固定 method 和单项实验，查频率与 PSI |
| 内存实验被杀 | 触及 cgroup 上限或宿主机 OOM | 查 `memory.events` 与内核日志，缩小绝对容量 |
| VM 实际内存与教程不符 | `--vm-bytes` 的版本语义、RSS 与映射差异 | 查该版本 man/source 和实际监控 |
| 磁盘结果“异常快” | 小数据命中页缓存、tmpfs、虚拟磁盘 | 确认挂载、设备、缓存和持久化路径 |
| `ENOSPC` / `ENOMEM` | 空间、inode 或内存耗尽 | 停止后查看目录、`df -h` / `df -i`、可用内存 |
| socket 启动失败 | 端口冲突、沙箱/网络策略 | 改用确认空闲的端口，查环境限制 |
| 超时后仍在运行 | 清理、不可中断 syscall、系统严重 thrashing | 查进程状态，先温和停止，勿重复启动更多压力 |
| 温度升高后吞吐下降 | 热降频或功耗限制 | 停止、冷却、确认散热与电源状态 |
| `--verify` fail | 硬件问题、内核/工具 bug 或环境异常 | 保存原始证据，降低压力单项复现，不立即判定硬件损坏 |

## 10. 实验记录模板

复制本节，每次实验填写一份；不要把未执行命令记成测试结论。

### 基本信息

| 项目 | 记录 |
| --- | --- |
| 实验编号 / 时间 / 操作者 | 待填写 |
| 目的与假设 | 待填写，例如“观察固定 CPU 配额下增加 worker 的影响” |
| 主机 / VM / 容器 | 待填写 |
| CPU、逻辑/物理核心、内存 | 待填写 |
| 系统 / 内核 / stress-ng 版本 | 待填写 |
| 编译信息 / 镜像 digest | 待填写 |
| 电源模式、频率策略、初始温度 | 待填写 |
| cgroup / 容器限额与亲和性 | 待填写 |
| 存储设备、文件系统、测试目录 | 待填写 |
| 后台业务与空闲资源基线 | 待填写 |
| 完整命令 / jobfile / 随机种子 | 待填写 |
| 停止条件与恢复方案 | 待填写 |

### 执行结果

| 项目 | 记录 |
| --- | --- |
| 目标 stressor 是否实际运行 / 是否跳过 | 待填写 |
| 开始、结束、实际运行时长 | 待填写 |
| 退出码、fail / warn / skip 日志 | 待填写 |
| bogo ops 与该 stressor 的专用指标 | 待填写，注明单位 |
| CPU、频率、温度、功耗峰值 | 待填写 |
| 内存峰值、swap、PSI、OOM | 待填写 |
| I/O 吞吐、延迟、队列、空间变化 | 待填写 |
| 应用吞吐、p95/p99、错误率 | 待填写；未采集则写未采集 |
| 监控和原始日志路径 | 待填写 |
| 重复次数、结果中位数与波动 | 待填写 |
| 停止后的资源清理情况 | 待填写 |
| 结论、局限与下一步 | 待填写，避免从合成负载直接推出业务容量 |

## 11. 官方资料与后续方向

### 11.1 本次调查来源

以下内容于 2026-09-30 查询；固定版本链接用于避免 master 后续变化带来的歧义。

1. [官方仓库](https://github.com/ColinIanKing/stress-ng)：源码、维护者、问题反馈与版本。
2. [V0.22.01 Release](https://github.com/ColinIanKing/stress-ng/releases/tag/V0.22.01)：本次稳定版本基线；发布日期也通过 GitHub Releases API 核对。
3. [V0.22.01 README](https://github.com/ColinIanKing/stress-ng/blob/V0.22.01/README.md)：工具定位、平台、构建依赖、容器入口与安全提醒。
4. [V0.22.01 官方 man page 源文件](https://github.com/ColinIanKing/stress-ng/blob/V0.22.01/stress-ng.1)：参数、容量语义、指标、退出码和信号清理行为。安装后使用 `man stress-ng` 阅读本机版本。
5. [V0.22.01 vm stressor 源码](https://github.com/ColinIanKing/stress-ng/blob/V0.22.01/stress-vm.c)：核对 `vm_total / args->instances`，确认本版本的总量分摊行为。
6. [Homebrew stress-ng 公式](https://formulae.brew.sh/formula/stress-ng)：macOS 安装、版本和 bottle 支持；本次也查询了公式 JSON API。
7. [Ubuntu Kernel stress-ng 参考页](https://wiki.ubuntu.com/Kernel/Reference/stress-ng)：进一步了解内核测试使用场景；历史例子需要与当前版本核对。

### 11.2 后续实验方向

- **Linux 调度 / cgroup**：固定资源配额、CPU 集合，比较同一个 stressor 的不同 worker 数。
- **内存管理**：在隔离环境研究 page faults、THP、NUMA 与 PSI，不在共享主机盲目切换全局策略。
- **存储路径**：用 stress-ng 产生受控压力，再结合 fio、设备统计与真实应用延迟分析。
- **业务抗压**：保持同一业务压测模型，逐项加入 CPU / 内存 / I/O 背景压力，建立资源压力与业务退化的对应关系。

**起步建议：安装 → 记录版本 → E0 → E1/E4 → 根据目标选择 E6 或 E8/E9 → 最后做 E10。先确认模型和监控，再扩大负载。**


### Good Day

Have a good work&life! 2026/08 via LinHong
