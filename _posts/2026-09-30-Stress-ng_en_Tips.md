---
layout: post
title: "stress-ng Research and Lab Guide Tips"
category: Linux
tags: stress-ng Tips
---

* content
{:toc}
stress-ng Research and Lab Guide Tips (AI)

## Contents

1. [Purpose and Limitations](#1-purpose-and-limitations)
2. [Platform Selection and Installation](#2-platform-selection-and-installation)
3. [Core Concepts and Parameter Reference](#3-core-concepts-and-parameter-reference)
4. [Safety Preparation and Stopping Tests](#4-safety-preparation-and-stopping-tests)
5. [Baseline Collection and Monitoring](#5-baseline-collection-and-monitoring)
6. [Progressive Lab Exercises](#6-progressive-lab-exercises)
7. [Interpreting Results](#7-interpreting-results)
8. [Reproducibility and Log Capture](#8-reproducibility-and-log-capture)
9. [Troubleshooting Reference](#9-troubleshooting-reference)
10. [Experiment Record Template](#10-experiment-record-template)
11. [Official References and Further Experiments](#11-official-references-and-further-experiments)











## 1. Purpose and Limitations

`stress-ng` (stress next generation) is an open-source system stress-testing tool led by Colin Ian King, licensed under GPL-2.0-or-later. It is an independent reimplementation and extension of the original `stress`, not a fully compatible drop-in replacement.

The official README for the researched version lists **390+ stress tests**. This does not mean every machine can run all of them. Actual capabilities depend on the operating system, CPU instruction set, kernel, build options, libraries, and permissions.

### 1.1 Suitable Uses

| Goal | Approach | What to Observe |
| --- | --- | --- |
| Initial hardware stability screening | Sustained CPU, memory, and cache workloads | Temperature, throttling, verification failures, reboots, hardware error logs |
| Kernel and system interface testing | Memory mapping, scheduling, IPC, filesystem, and socket stressors | System call errors, hung tasks, kernel warnings, resource cleanup |
| Application behavior under pressure | Apply controlled resource pressure while running real workloads | Latency percentiles, throughput, timeout rates, error rates |
| Configuration or version comparisons | Repeat A/B experiments with fixed commands, versions, and resource quotas | Changes in the same stressor's metrics and system monitoring |
| Container resource-limit testing | Combine stressors with cgroup or container limits | Throttling, OOM events, resource ceilings, host impact |

### 1.2 What It Cannot Establish

- **It is not a precision benchmark suite.** Upstream explicitly warns against treating bogo ops as reliable performance scores.
- Do not compare bogo ops/s across different stressors or interpret them directly as FLOPS, IOPS, or MB/s.
- A successful run does not prove that hardware is completely reliable. VM stress tests do not guarantee coverage of all physical memory.
- Local socket stress does not establish external network bandwidth or remote service capacity.
- Generic synthetic workloads do not replace database, HTTP service, or real application load tests.

| Tool | Complementary Role |
| --- | --- |
| `stress` | Basic CPU, memory, and I/O stress; do not mix its options with stress-ng options |
| `fio` | Storage IOPS, bandwidth, latency distributions, and controlled I/O models |
| `iperf3` | Network throughput measurement between two endpoints |
| `sysbench` | Selected general benchmarks and database workloads |
| Memtest86 / Memtest86+ | More systematic physical memory checks from a boot environment; verify platform support separately |
| `perf`, `vmstat`, `iostat` | Observation tools to use alongside stress-ng for bottleneck analysis |

## 2. Platform Selection and Installation

### 2.1 Choosing a Lab Platform

| Platform | Recommendation | Limitations |
| --- | --- | --- |
| Native Linux test machine | Preferred, especially for kernel, cgroup, NUMA, and I/O experiments | Still depends on kernel version, permissions, and libraries |
| Linux virtual machine | Good for learning commands, validating procedures, and testing resource limits | Results include virtualization effects and cannot be attributed directly to physical hardware |
| Native macOS | Suitable for supported basic CPU and memory experiments | Linux-only stressors, `/proc`, cgroups, and `perf` cannot be assumed available |
| Docker on macOS | Useful for practicing Linux userspace tests | Docker Desktop typically runs through a Linux VM; results describe the VM/container and its quotas |
| Linux container | Useful for separating experiments and testing cgroup behavior | Shares the host kernel; a container is not a hardware safety boundary |

Apple Silicon has cores with different performance characteristics. macOS scheduling also differs from Linux CPU numbering and affinity mechanisms. Do not transfer Linux `--taskset` experiments directly to macOS.

### 2.2 Package Manager Installation

These are installation examples. Ordinary tests do not require root; `sudo` below is used only to install software.

**Debian / Ubuntu:**

```bash
sudo apt update
sudo apt install stress-ng
```

For external monitoring, optionally install `sysstat` (provides `iostat` and `mpstat`) and `lm-sensors` (temperature readings where supported by the hardware). Distribution repositories are generally easier to manage than adding third-party sources directly.

**Fedora / RHEL-family distributions with suitable repositories:**

```bash
sudo dnf install stress-ng
```

RHEL-family distributions may need additional repositories approved by your organization. If the package is unavailable, investigate repository availability rather than enabling unknown sources by default.

**macOS / Homebrew:**

```bash
brew install stress-ng
```

At the time of research, Homebrew's stable version was `0.22.01`, with ARM64 bottles available. Consult the formula page for the current version and supported platforms.

**Verify the installation:**

```bash
stress-ng --version
stress-ng --help
stress-ng --stressors
stress-ng --verifiable
man stress-ng
```

`--stressors` lists test names; it does not guarantee that every listed test can run successfully in the current environment.

### 2.3 Building from Source for a Fixed Version

On Linux, install Git, make, and C/C++ compilers first. Basic dependencies on Debian / Ubuntu can be installed as follows:

```bash
sudo apt install git build-essential
git clone --branch V0.22.01 --depth 1 https://github.com/ColinIanKing/stress-ng.git stress-ng-src
cd stress-ng-src
make -j2
./stress-ng --version
```

macOS requires Xcode Command Line Tools. Upstream documents `make clean` followed by `make` as the build procedure. After updating the source directory, run `make clean` again to avoid stale feature-detection results.

When libraries are missing, the upstream build usually disables the corresponding functionality; a successful build therefore does not imply full feature coverage. For broader coverage, follow the official README's platform dependency list and record `--buildinfo` and `--config` output. You can use `./stress-ng` directly without installing it system-wide.

### 2.4 Container Entry Point: View Help First

```bash
docker run --rm ghcr.io/colinianking/stress-ng --help
```

This is the rolling image entry point provided in the official README, **not an image pinned to V0.22.01**. For reproducible experiments, record the image digest and pin the image by digest.

For initial stress experiments, explicitly set CPU and memory limits and perform an in-container `--dry-run` first. Do not immediately add `--privileged`, host device mappings, or writable mounts of application data directories. Container CPU quotas do not necessarily change the CPU count detected by the program, so do not use `--cpu 0` instead of an explicit worker count.

## 3. Core Concepts and Parameter Reference

### 3.1 Stressor, Worker, Method, and Class

- **Stressor:** a type of stress generator, such as `cpu`, `vm`, `hdd`, or `sock`.
- **Worker:** a concurrent instance of a stressor. Some instances create additional child processes or threads, so `--sock 1` does not imply exactly one process.
- **Method:** an algorithm within a stressor, such as `--cpu-method sqrt` or `--vm-method write64`.
- **Class:** a category label, such as `cpu`, `memory`, `filesystem`, `network`, or `scheduler`. A stressor may belong to multiple classes.

Basic command structure:

```bash
stress-ng --cpu 2 --cpu-method sqrt --timeout 30s --verify --metrics-brief
```

When multiple stressors are specified, they run concurrently by default:

```bash
stress-ng --cpu 1 --vm 1 --vm-bytes 128M --timeout 30s --metrics-brief
```

### 3.2 Key Parameters

| Parameter | Meaning | Usage Notes |
| --- | --- | --- |
| `--cpu N`, `--vm N`, `--hdd N` | Start N workers of the corresponding stressor | Start with `1`; do not give every test the full logical CPU count |
| Worker count `0` | Use the configured CPU count, falling back to online CPUs if unavailable | Does not mean zero workers or the cgroup quota |
| Negative worker count | Use the online CPU count | Linux affinity, container quotas, and online CPU counts are different concepts |
| `--timeout 30s` | Request a duration; units include `s`, `m`, and `h` | Default is 24 hours; `0` means no timeout; cleanup or blocking may delay termination |
| `--cpu-method sqrt` | Fix the CPU algorithm | Default `all` rotates through methods and is less suitable for algorithm-level comparisons |
| `--cpu-load 50` | Target busy/idle ratio for CPU workers | Applies only to the `cpu` stressor, not to tests such as `matrix` |
| `--vm-bytes 256M` | Memory stress allocation size | In V0.22.01, this is the total across vm workers; see below |
| `--vm-keep` | Keep mappings and rewrite them repeatedly | Does not lock physical memory; omitting it emphasizes mapping/unmapping activity |
| `--hdd-bytes 128M` | File-writing size per hdd worker | Not a limit on cumulative bytes written throughout the test |
| `--temp-path PATH` | Root path for temporary files and directories | Defaults to the current directory; explicitly choose a writable test directory |
| `--verify` | Verify results for supported tests | Not supported by every stressor and not a complete hardware diagnosis |
| `--abort` | Stop other tests when a stressor fails | Not a temperature or capacity protection mechanism |
| `--metrics` / `--metrics-brief` | Print full / brief summary metrics | Interpret metrics in the context of the specific stressor |
| `--log-file FILE` | Save tool logs | Does not capture external monitoring; use unique filenames |
| `--yaml FILE` | Write YAML statistics | Does not replace the exit code or complete logs |
| `--seed 42` | Fix the initial pseudorandom seed | Does not fix scheduling, physical page allocation, or background noise |
| `--dry-run` | Parse options without executing stress workloads | Cannot establish that resources are sufficient or hardware features are supported |
| `--sequential N --with LIST` | Run N instances of each selected stressor, one stressor at a time | `--timeout` applies to each stressor, not the entire sequence |
| `--class 'memory?'` | List stressors in a class | Quotes prevent the shell from treating `?` as a wildcard; this only lists tests |
| `--taskset LIST` | Restrict execution to a CPU set | Confirm platform support and allowed CPUs; do not blindly select CPU 0 |

### 3.3 Allocation Semantics and Version Differences

**In V0.22.01, `--vm-bytes` specifies a total allocation shared across vm workers.** The official man page says “mmap N bytes in total”; the source uses `vm_total / args->instances`, with additional minimum-size and page-alignment handling:

```bash
stress-ng --vm 2 --vm-bytes 256M --timeout 30s
```

In this version, the target mapping per vm worker is approximately `128M`, not `256M` each. Historical versions or older tutorials may describe a per-worker allocation; do not transfer assumptions between versions. For initial experiments, use `--vm 1` and an absolute allocation size to avoid ambiguity.

Mapped memory is not the same as RSS. Actual residency, additional process overhead, page tables, caches, swap, and memory reclamation affect observations. A setting such as `--vm-bytes 80%` does not reliably guarantee use of at most 80% of a container's memory limit. Prefer absolute sizes calculated from host and cgroup headroom.

**`--hdd-bytes` is per hdd worker.** With `--hdd 2 --hdd-bytes 128M`, reserve space for approximately `256M` of file data plus metadata and other overhead. The stressor repeatedly writes and reads, so cumulative writes can greatly exceed `256M`.

## 4. Safety Preparation and Stopping Tests

### 4.1 Preflight Checklist

- Use a dedicated test machine, a rollback-capable VM, or a dedicated test container. Avoid production hosts and desktops where important work is in progress.
- Save your work and confirm backups, free disk space, healthy cooling, and stable power.
- Begin as an ordinary user with **one worker, 10–30 seconds, and a small allocation**. Perform a `--dry-run` first.
- Reserve memory for the OS, applications, and monitoring. Do not choose allocation sizes from total physical memory alone.
- Select a dedicated directory or volume for storage tests. On some Linux systems, `/tmp` is tmpfs and generates memory pressure instead of disk pressure.
- Run monitoring in another terminal. For remote experiments, keep a second SSH session open and prepare out-of-band management if needed.
- Define stop conditions: application timeouts, sustained swapping, temperatures approaching vendor limits, noticeable throttling, kernel errors, or insufficient space.

Do not apply a universal temperature threshold to all hardware. Use CPU/device specifications and the local baseline.

### 4.2 Options and Tests to Avoid Initially

Do not immediately use `--all 0`, unrestricted `--sequential 0`, `--maximize`, `--aggressive`, or `--thrash`. Avoid unbounded `bigheap`, large numbers of `fork` workers, or combinations likely to exhaust resources.

In particular, the `io` stressor repeatedly calls `sync()` and can affect writeback from other workloads on a shared system. `iomix` combines several I/O activities and is not a low-risk disk bandwidth test either. For initial storage experiments, prefer `hdd` with an explicit directory and allocation size.

Upstream warns that root execution involves Linux OOM score adjustments, making low-memory behavior more intrusive. `--no-oom-adjust` disables those adjustments but does not provide isolation. `--oom-avoid` is only a best-effort attempt to avoid OOM; it does not replace resource budgeting or cgroup limits.

### 4.3 Stopping an Experiment

1. For a foreground run, press `Ctrl+C` first. On SIGINT, the tool attempts to terminate workers and clean up temporary files and shared memory.
2. If necessary, locate the parent process of your own experiment and send SIGINT:

```bash
pgrep -a stress-ng
kill -INT "${STRESS_NG_PID:?Set the parent PID of this experiment first}"
```

Set `STRESS_NG_PID` to the confirmed parent PID of your experiment before running `kill`. The command above refuses to execute if the variable is unset or empty. The `pgrep -a` example is for Linux; on macOS, use `pgrep -fl stress-ng` to inspect processes.

3. Do not start with `kill -9` or terminate other users' experiments in bulk. Forced termination may leave temporary files and lose summary results.
4. If a process is in uninterruptible I/O wait, neither a timeout nor a signal may take effect immediately. `--timeout` is not a hard runtime ceiling.

## 5. Baseline Collection and Monitoring

### 5.1 Linux Baseline

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

Also record kernel/BIOS versions, power mode, CPU governor, NUMA topology, filesystem and mount settings, container quotas, and background workloads. Under cgroup v2, inspect the target cgroup's `cpu.max`, `memory.max`, `memory.current`, and `memory.events`. Paths depend on deployment; do not assume the root cgroup is the target.

### 5.2 Linux Monitoring in Separate Terminals

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

These are independent monitoring options; choose those relevant to your experiment rather than running everything at once. `iostat` and `mpstat` come from `sysstat`; `sensors` depends on sensor support and configuration. The first `vmstat` report and the default initial `iostat` report often contain statistics since boot, so focus on subsequent samples.

| Observation | What to Watch |
| --- | --- |
| CPU | Per-core utilization, run queues, frequency, thermal throttling; not just total CPU percentage |
| Memory | Available memory, RSS, swap in/out, major faults, PSI, OOM events |
| Storage | Read/write throughput, `await`, queue depth, free space; NVMe `%util` is not a simple saturation indicator |
| Scheduling | Context switches, run queues, real application latency |
| System logs | OOM, I/O errors, hung tasks, MCE/EDAC; access may require permissions |
| Application | p50/p95/p99 latency, error rates, connection failures; collect separately |

On Linux, inspect `dmesg` or `journalctl -k` as permissions allow. Where supported, `/proc/pressure/cpu`, `/proc/pressure/memory`, and `/proc/pressure/io` show resource-wait pressure.

### 5.3 macOS Baseline and Monitoring

```bash
sw_vers
uname -m
sysctl hw.logicalcpu hw.physicalcpu hw.memsize
vm_stat
df -h .
```

Use Activity Monitor to observe CPU, memory pressure, swap, and disk activity. Command-line alternatives include `top`, `vm_stat 1`, and `iostat 1`. macOS output differs from Linux; do not transfer Linux field interpretations directly. For temperature and power readings, choose a tool compatible with your macOS version and chip rather than assuming `sensors` or `/sys/class/thermal` is available.

## 6. Progressive Lab Exercises

> All commands below are examples for future execution, not measured results. Run as an ordinary user by default.
> Confirm platform support even for exercises not explicitly labeled Linux-only. Begin with low load and one variable, then increase gradually. Do not copy and execute this entire section at once.

### E0: Minimal Smoke Test

Check options first, then start one CPU worker at half load:

```bash
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 50 --timeout 10s --verify --metrics-brief --dry-run
```

```bash
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 50 --timeout 10s --verify --metrics-brief
```

Check that the program starts, reports metrics, produces no verification errors, finishes as expected, and leaves the machine responsive. One worker at 50% load does not mean 50% utilization of the entire machine.

### E1: Comparing CPU Busy/Idle Ratios

```bash
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 25 --timeout 30s --verify --metrics-brief
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 50 --timeout 30s --verify --metrics-brief
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 100 --timeout 30s --verify --metrics-brief
```

Between runs, wait for temperature and background activity to return to baseline. Do not batch these three commands without a recovery interval.

Observe per-core utilization, frequency, and temperature. `--cpu-load` targets a busy/sleep ratio; scheduling and frequency changes affect actual utilization. Bogo ops are not guaranteed to scale linearly with the requested load.

### E2: Comparing CPU Worker Counts

```bash
stress-ng --cpu 1 --cpu-method sqrt --timeout 30s --verify --metrics-brief
stress-ng --cpu 2 --cpu-method sqrt --timeout 30s --verify --metrics-brief
```

Increase to `4` only after confirming sufficient resources; do not default to all cores. Record throughput, per-instance CPU usage, temperature, frequency, and application latency. Diminishing gains may result from quotas, SMT, caches, thermal limits, or scheduling, not necessarily a CPU fault.

For Linux affinity experiments, inspect the current allowed CPU set first:

```bash
taskset -pc $$
```

Select CPU IDs from that set when configuring `--taskset`. Do not assume a container allows CPU 0, and do not confuse worker count with CPU affinity.

### E3: A Different Compute Model: Matrix Operations

```bash
stress-ng --matrix 1 --matrix-size 64 --timeout 30s --verify --metrics-brief
```

Observe differences in computation and cache behavior. `--cpu-load 50` does not throttle this test; use system resource quotas when limits are needed, rather than CPU-stressor-specific options. Matrix bogo ops cannot be compared directly with `cpu sqrt` bogo ops.

### E4: Retained Memory Mappings Versus Repeated Mapping

With sufficient headroom, begin with retained mappings:

```bash
stress-ng --vm 1 --vm-bytes 128M --vm-method write64 --vm-keep --timeout 30s --verify --metrics-brief
```

Then compare a run without retained mappings:

```bash
stress-ng --vm 1 --vm-bytes 128M --vm-method write64 --timeout 30s --verify --metrics-brief
```

Observe RSS, page faults, system CPU time, swap, and memory pressure. `write64` fixes the write method; default `all` cycles through methods. First compare equal allocations with one worker, then decide whether to increase to `256M` or `512M` based on **available memory and cgroup headroom**.

Stop if the machine becomes noticeably unresponsive, swapping persists, or OOM occurs. Do not blindly increase allocations just to fill memory.

### E5: Cache Pressure: Advanced

```bash
stress-ng --cache 1 --timeout 15s --metrics-brief
```

Check the installed version's cache parameters, default allocation, and platform support first. This test may also impose memory and bandwidth pressure; it is neither pure CPU arithmetic nor a precise cache bandwidth measurement. Skip it in resource-constrained environments if necessary.

### E6: Sequential and Random Filesystem I/O

Create a directory on a test volume with confirmed free space. This example uses `$HOME`; change it to a dedicated directory on the intended device if needed:

```bash
export LAB_DISK_DIR="$HOME/stress-ng-lab-files"
mkdir -p "$LAB_DISK_DIR"
df -h "$LAB_DISK_DIR"
```

Sequential reads and writes:

```bash
stress-ng --hdd 1 --hdd-bytes 128M --hdd-opts wr-seq,rd-seq --temp-path "$LAB_DISK_DIR" --timeout 30s --metrics-brief
```

Random reads and writes:

```bash
stress-ng --hdd 1 --hdd-bytes 128M --hdd-opts wr-rnd,rd-rnd --temp-path "$LAB_DISK_DIR" --timeout 30s --metrics-brief
```

Observe throughput, latency, queues, caching, and system CPU time. Small files may mostly hit the page cache, so results do not establish physical disk bandwidth. Repeated writes mean cumulative SSD writes and wear risk depend on test duration.

### E7: Synchronous Writes: Advanced Storage Exercise

```bash
stress-ng --hdd 1 --hdd-bytes 64M --hdd-opts wr-seq,fsync --temp-path "$LAB_DISK_DIR" --timeout 15s --metrics-brief
```

Reuse the directory variable from E6. `fsync` adds explicit synchronization after each write, useful for observing writeback paths and latency. It does not fully simulate database transaction durability. Run it on a dedicated test volume because it may interfere with other workloads on the same device.

To reduce page-cache effects, investigate `direct`; support depends on the platform, filesystem, and alignment requirements. **Direct I/O does not guarantee persistence.** Upstream notes that `sync` should also be considered when synchronous I/O is required. Do not disturb a shared machine by globally dropping caches.

### E8: IPC and Scheduling

```bash
stress-ng --pipe 1 --timeout 30s --metrics-brief
```

```bash
stress-ng --switch 1 --timeout 30s --metrics-brief
```

Run separately and observe context switches, system CPU time, and scheduling waits. CPU utilization alone is not a sufficient measure of effective pressure, and these results do not directly establish context-switch costs for real applications.

### E9: Local Sockets

```bash
stress-ng --sock 1 --sock-domain ipv4 --sock-port 19000 --timeout 30s --metrics-brief
```

Confirm that the port is unused first. This stressor performs local connects, sends, receives, and disconnects. It is useful for socket and kernel protocol-stack pressure, not for proving external NIC, switch, or remote service capacity. N workers use a range of ports beginning at the specified port.

Container network isolation and resource limits affect results; macOS and Linux socket behavior may differ.

### E10: Small Mixed Workload

Run only after the individual E1, E4, and E6 tests behave normally:

```bash
stress-ng --cpu 1 --cpu-method sqrt --cpu-load 50 --vm 1 --vm-bytes 128M --vm-keep --hdd 1 --hdd-bytes 64M --temp-path "$LAB_DISK_DIR" --timeout 30s --verify --abort --metrics-brief
```

The three stressors run concurrently. Observe application latency and interactions among CPU, memory, and storage pressure. `--verify` applies only where verification is supported. If mixed results are abnormal, return to individual stressors for diagnosis rather than increasing pressure immediately.

### E11: Sequential Tests with a Limited List

```bash
stress-ng --sequential 1 --with cpu,vm --cpu-method sqrt --vm-bytes 128M --timeout 15s --verify --metrics-brief
```

The two stressors run one at a time. Target workload duration is approximately `2 × 15s`, plus startup and cleanup. Use class queries to help select tests:

```bash
stress-ng --class 'memory?'
stress-ng --class 'filesystem?'
```

Do not immediately run every test in a class after listing it. Different tests may create many processes or files or consume large amounts of memory. Review them individually and build an explicit allowlist with `--with`.

### Recommended Progression

| Stage | Exercises | Conditions Before Increasing Load |
| --- | --- | --- |
| First use | E0 → E1 → E2 | Clean termination, no errors, complete monitoring |
| Memory focus | E4, then consider E5 | Explicit memory budget, no sustained swapping |
| Storage focus | E6, then consider E7 | Dedicated test volume, sufficient space, no application interference |
| System interfaces | E8 → E9 | Known process/port limits and platform support |
| Combined stability | E10 / E11 | Individual tests validated; recovery and logging prepared |
| Longer runs | 30s → 2m → 10m, longer if needed | Baseline restored between stages; no thermal or resource anomalies |

## 7. Interpreting Results

### 7.1 Metric Definitions

| Common Column | Meaning | Common Pitfall |
| --- | --- | --- |
| `bogo ops` | Work-iteration count defined by the stressor | Counting units differ between tests |
| `real time` | Average wall-clock duration of workers of the same stressor | Not the sum of all worker durations |
| `usr time` | Cumulative userspace CPU time for workers of the same stressor | Can exceed wall-clock time with multicore concurrency |
| `sys time` | Cumulative kernel CPU time for workers of the same stressor | A high value may be expected for syscall/I/O workloads |
| `bogo ops/s (real time)` | Total iterations divided by wall-clock duration | Useful for same-configuration trends, not a standard throughput unit |
| `bogo ops/s (usr+sys time)` | Total iterations divided by cumulative CPU time | Uses a different denominator from the wall-time metric |
| `CPU used per instance` | Average CPU usage per instance | Multithreaded/child-process tests may exceed 100%; brief output may omit it |
| `RSS Max` | Maximum resident-memory-related statistic | Does not replace host or cgroup peak-memory measurements |

Some stressors report additional specialized metrics with explicit units. Consult the test's definition before interpreting them. For comparisons, fix the version, method, worker count, allocation, quota, duration, and power state.

### 7.2 Status and Exit Codes

The V0.22.01 official man page defines these exit codes:

| Exit Code | Meaning | Investigation |
| --- | --- | --- |
| `0` | Success | Still check for skipped target tests and whether the expected load was reached |
| `1` | Invalid options or a fatal resource problem in the harness | Command, permissions, memory, and related issues |
| `2` | One or more stressors failed | Preserve fail logs and reproduce with a single stressor |
| `3` | Initialization failed because of resource or interface limitations | ENOMEM, ENOSPC, missing/unimplemented system calls, etc. |
| `4` | Some stressors are not implemented for the architecture or OS | Check platform support; this does not imply hardware damage |
| `5` | A stressor was killed by an unexpected signal | OOM, external termination, abnormal signals |
| `6` | A stressor exited unexpectedly and timing metrics could not be collected | Logs and platform anomalies |
| `7` | Bogo ops metrics may be untrustworthy | Interrupted counter updates, OOM, or abnormal counter state |

Interpret exit codes together with complete logs, shell/container status, and system events. An outer runner may change the final status. Successful exit does not mean every target test ran completely or that the hardware has passed certification.

### 7.3 Basic Acceptance Criteria

For initial small-scale experiments, operational acceptance criteria can include: the intended stressor actually ran; exit status was expected; no verification failures or kernel errors occurred; no unexpected OOM occurred; temperatures remained controlled; resource peaks stayed within budget; and processes and test resources were cleaned up afterward.

These criteria only indicate that no anomaly was observed for this workload and period. They do not guarantee long-term reliability or a performance SLA.

## 8. Reproducibility and Log Capture

### 8.1 Saving One CPU Experiment

This is a **Bash example**. Do not mix `${PIPESTATUS[...]}` with zsh array rules. No pipeline is used, so the actual stress-ng exit code is captured directly:

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

This example generates real load; execute it only after confirming safety. Second-resolution directory names are usually adequate for manual experiments. For concurrent automation, use unique directories to avoid overwriting results. Save monitoring and application metrics separately.

Repeat the same configuration 3–5 times where practical. Define warm-up and cooldown procedures in advance, record the median and variability, and retain anomalous samples rather than selecting only the best results. A fixed random seed does not make execution fully deterministic.

### 8.2 Jobfiles: Reusable Test Recipes

Save the following as `cpu-smoke.job`. This is the stress-ng configuration format, not a shell script or YAML:

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

Write one option per line, omitting the leading `--`. For formal experiments, use unique output filenames and preserve the jobfile, version, monitoring, and exit code together. A jobfile does not provide resource isolation.

## 9. Troubleshooting Reference

| Symptom | Possible Cause | Next Step |
| --- | --- | --- |
| `unrecognized option` or missing method | Older package, misspelling, platform difference | Check local help/man/version before upgrading blindly |
| Stressor skipped / not implemented | Missing syscall, instruction set, library, or permission | Preserve logs and inspect build configuration; do not default to root |
| CPU usage lower than expected | Few workers, CPU quota, affinity, `cpu-load`, I/O wait | Inspect per-core usage, quotas, and allowed CPUs |
| More workers produce lower results | Cache/memory bandwidth contention, quotas, thermal throttling | Return to a fixed method and single stressor; inspect frequency and PSI |
| Memory test killed | cgroup limit or host OOM | Inspect `memory.events` and kernel logs; reduce absolute allocation |
| VM memory differs from a tutorial | Version-specific `--vm-bytes` semantics, RSS versus mapping | Check that version's man/source and actual monitoring |
| Disk results seem unusually fast | Small dataset in page cache, tmpfs, virtual disk | Confirm mount, device, caching, and persistence path |
| `ENOSPC` / `ENOMEM` | Exhausted space, inodes, or memory | After stopping, inspect directories, `df -h` / `df -i`, and available memory |
| Socket startup failure | Port conflict, sandbox or network policy | Choose a confirmed free port and inspect environment restrictions |
| Still running after timeout | Cleanup, uninterruptible syscall, severe thrashing | Inspect process state, stop gently first, and do not add more stress runs |
| Throughput falls as temperature rises | Thermal throttling or power limits | Stop, cool down, and check cooling and power state |
| `--verify` failure | Hardware issue, kernel/tool bug, or environmental anomaly | Preserve evidence and reproduce at lower pressure with one stressor; do not immediately diagnose hardware damage |

## 10. Experiment Record Template

Copy this section for each experiment. Do not record unexecuted commands as test findings.

### Basic Information

| Item | Record |
| --- | --- |
| Experiment ID / time / operator | To be filled in |
| Goal and hypothesis | To be filled in, e.g. “Observe the effect of increasing workers under a fixed CPU quota” |
| Host / VM / container | To be filled in |
| CPU, logical/physical cores, memory | To be filled in |
| OS / kernel / stress-ng version | To be filled in |
| Build information / image digest | To be filled in |
| Power mode, frequency policy, initial temperature | To be filled in |
| cgroup / container limits and affinity | To be filled in |
| Storage device, filesystem, test directory | To be filled in |
| Background workloads and available-resource baseline | To be filled in |
| Complete command / jobfile / random seed | To be filled in |
| Stop conditions and recovery plan | To be filled in |

### Execution Results

| Item | Record |
| --- | --- |
| Whether target stressors ran / were skipped | To be filled in |
| Start, finish, actual duration | To be filled in |
| Exit code and fail / warn / skip logs | To be filled in |
| Bogo ops and stressor-specific metrics | To be filled in; include units |
| CPU, frequency, temperature, peak power | To be filled in |
| Peak memory, swap, PSI, OOM | To be filled in |
| I/O throughput, latency, queues, space changes | To be filled in |
| Application throughput, p95/p99, error rates | To be filled in; state “not collected” if unavailable |
| Monitoring and raw log paths | To be filled in |
| Repeat count, median, and variability | To be filled in |
| Resource cleanup after stopping | To be filled in |
| Conclusions, limitations, and next steps | To be filled in; do not infer application capacity directly from synthetic load |

## 11. Official References and Further Experiments

### 11.1 Research Sources

These sources were consulted on 2026-09-30. Version-pinned links avoid ambiguity caused by subsequent changes to master.

1. [Official repository](https://github.com/ColinIanKing/stress-ng): source, maintainers, issue tracking, and releases.
2. [V0.22.01 release](https://github.com/ColinIanKing/stress-ng/releases/tag/V0.22.01): stable baseline for this research; publication date was also checked through the GitHub Releases API.
3. [V0.22.01 README](https://github.com/ColinIanKing/stress-ng/blob/V0.22.01/README.md): purpose, platforms, build dependencies, container entry points, and safety warnings.
4. [V0.22.01 official man page source](https://github.com/ColinIanKing/stress-ng/blob/V0.22.01/stress-ng.1): parameters, allocation semantics, metrics, exit codes, and signal-driven cleanup. After installation, use `man stress-ng` for your local version.
5. [V0.22.01 vm stressor source](https://github.com/ColinIanKing/stress-ng/blob/V0.22.01/stress-vm.c): checked `vm_total / args->instances` to confirm total-allocation sharing in this version.
6. [Homebrew stress-ng formula](https://formulae.brew.sh/formula/stress-ng): macOS installation, versions, and bottle support; the formula JSON API was also consulted.
7. [Ubuntu Kernel stress-ng reference](https://wiki.ubuntu.com/Kernel/Reference/stress-ng): additional kernel-testing context; check historical examples against the current version.

### 11.2 Further Experiments

- **Linux scheduling / cgroups:** fix quotas and CPU sets, then compare worker counts for the same stressor.
- **Memory management:** investigate page faults, THP, NUMA, and PSI in an isolated environment; do not blindly change global policies on shared hosts.
- **Storage paths:** use stress-ng for controlled pressure, then combine fio, device statistics, and real application latency analysis.
- **Application resilience:** keep the application load model fixed and add CPU, memory, or I/O background pressure individually to relate resource pressure to application degradation.

**Suggested starting path: install → record the version → E0 → E1/E4 → choose E6 or E8/E9 for your goal → E10 last. Validate the model and monitoring before increasing load.**


### Good Day

Have a good work&life! 2026/08 via LinHong
