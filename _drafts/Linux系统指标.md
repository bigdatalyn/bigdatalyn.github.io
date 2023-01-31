

### Top
top - 15:41:47 up  5:35,  1 user,  load average: 0.00, 0.00, 0.00
Tasks: 100 total,   1 running,  99 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni, 95.9 id,  0.0 wa,  3.8 hi,  0.3 si,  0.0 st
MiB Mem :   1972.8 total,    443.0 free,    566.9 used,    962.8 buff/cache
MiB Swap:   4096.0 total,   4096.0 free,      0.0 used.   1246.2 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                                                                                                       
   6628 root      20   0 1354548 530924  35276 S   1.3  26.3   2:42.44 mysqld                                                                                                                        
   6981 root      20   0       0      0      0 I   0.3   0.0   0:00.35 kworker/0:1-events                                                                                                            
      1 root      20   0  172340  10588   8192 S   0.0   0.5   0:01.47 systemd                                                                                                                       
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.00 kthreadd      

第一行
top - 15:41:47：当前系统时间

up 5 days：自上一次系统启动后到现在的运行天数

4 users：登录到系统的用户数

load average：过去1分钟、5分钟、15分钟，系统负载的平均值

第二行
total：系统进程总数

running：处于运行状态的进程数

sleeping：处于休眠状态的进程数

stopped：处于被停止状态的进程数

zombie：处于僵尸状态进程数

第三行
us：用户进程占用CPU的百分比

sy：系统进程占用CPU的百分比

ni：优先级被改变过的进程占用CPU的百分比

id：空闲CPU占用的百分比

wa：IO等待占用CPU的百分比

hi：硬件中断占用CPU的百分比

si：软件中断占用CPU的百分比

st：虚拟化环境占用CPU的百分比

需要重点关注CPU的使用率，当us值较高时，说明用户进程消耗CPU时间较多，如果长时间超过50%时，应尽快优化应用服务。
当sy值较高时，说明系统进程消耗CPU时间较多，比如可能是操作系统配置不合理或者出现操作系统的Bug。
当wa值较高时，说明系统IO等待比较严重，比如可能是发生了大量的随机IO访问，IO带宽出现瓶颈。

第四行
total：物理内存总大小，单位为M

free：空闲的内存大小

used：已使用的内存大小

buff/cache：已缓存的内存大小

第五行
total：Swap大小

free：空闲的Swap大小

used：已使用的Swap大小

avail Mem：已缓存的Swap大小

进程列表
PID：进程的id

USER：进程的拥有者

PR：进程的优先级，值越小越优先执行

NI：进程nice值，正值表示降低进程优先级，负值表示提高进程优先级，nice取值范围为(-20,19)，默认情况下，进程的nice值为0

VIRT：进程占用的虚拟内存大小

RES：进程占用的物理内存大小

SHR：进程占用的共享内存大小

S：进程状态，其中S表示休眠，R表示正在运行，Z表示僵死状态，N表示该进程优先值为负数

%CPU：进程CPU使用率

%MEM：进程内存使用率

TIME+：进程启动后占用CPU的总时间，即占用CPU使用时间的累加值

COMMAND：进程启动命令名称

### vmstat

vmstat是Virtual Memory Statistics的缩写，可以监控操作系统的进程、虚拟内存、系统IO、CPU等，返回结果示例如下


[root@ol8mysql01 ~]# vmstat 1 3
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0      0 453392   4204 981740    0    0    44    15  147  321  0  3 97  0  0
 0  0      0 453384   4204 981740    0    0     0     0  204  362  0  4 96  0  0
 0  0      0 453384   4204 981740    0    0     0     0  171  347  0  5 95  0  0
[root@ol8mysql01 ~]# 


r：运行队列中的进程数
b：等待IO的进程数
swpd：使用虚拟内存大小，单位KB
free：空闲的内存大小
buff：用作缓冲的内存大小
cache：用作缓存的内存大小，如果cache的值越大，说明cache的文件数越多，如果频繁访问到的文件都能被cache，那么磁盘的读IO bi会非常小
si：每秒从Swap写到内存的大小，由磁盘调入内存
so：每秒写入Swap的内存大小，由内存调入磁盘（si和so这两个取值越大，说明系统在进行换页）
bi：每秒读入的块数
bo：每秒写入的块数（bi和bo这两个取值越大，说明系统的IO越繁忙）
in：每秒被中断的次数
cs：每秒上下文的切换次数（in和cs这两个取值越大，说明系统与接口设备的通信越繁忙）
us：用户进程占用CPU的百分比
sy：系统进程占用CPU的百分比
id：空闲CPU占用的百分比
wa：IO等待占用CPU的百分比
st：虚拟化环境占用CPU的百分比

### free

[root@ol8mysql01 ~]# free 
              total        used        free      shared  buff/cache   available
Mem:        2020128      580768      453392       16788      985968     1275848
Swap:       4194300           0     4194300
[root@ol8mysql01 ~]# free -g
              total        used        free      shared  buff/cache   available
Mem:              1           0           0           0           0           1
Swap:             3           0           3
[root@ol8mysql01 ~]# 

total：物理内存总大小，total = used + free + buff/cache
used：已使用的内存大小
free：空闲的内存大小
shared：共享内存大小
buff/cache：缓存内存大小
available：可用物理内存大小，available = free + buff/cache


### iostat

iostat命令返回结果示例如下：

[root@ol8mysql01 ~]# iostat -x 1 3
Linux 5.4.17-2136.309.4.el8uek.x86_64 (ol8mysql01) 	01/31/2023 	_x86_64_	(1 CPU)

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.01    0.01    2.65    0.02    0.00   97.31

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
sda              1.03    0.32     42.80     14.69     0.00     0.04   0.01  10.50    0.73    2.56   0.00    41.67    45.83   1.02   0.14
dm-0             0.98    0.35     42.12     14.82     0.00     0.00   0.00   0.00    1.04    1.97   0.00    42.83    42.48   1.02   0.14
dm-1             0.00    0.00      0.11      0.00     0.00     0.00   0.00   0.00    0.79    0.00   0.00    22.65     0.00   0.87   0.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.00    0.00    4.17    0.00    0.00   95.83

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
sda              0.00    0.00      0.00      0.00     0.00     0.00   0.00   0.00    0.00    0.00   0.00     0.00     0.00   0.00   0.00
dm-0             0.00    0.00      0.00      0.00     0.00     0.00   0.00   0.00    0.00    0.00   0.00     0.00     0.00   0.00   0.00
dm-1             0.00    0.00      0.00      0.00     0.00     0.00   0.00   0.00    0.00    0.00   0.00     0.00     0.00   0.00   0.00

avg-cpu:  %user   %nice %system %iowait  %steal   %idle
           0.00    0.00    3.09    0.00    0.00   96.91

Device            r/s     w/s     rkB/s     wkB/s   rrqm/s   wrqm/s  %rrqm  %wrqm r_await w_await aqu-sz rareq-sz wareq-sz  svctm  %util
sda              0.00    0.00      0.00      0.00     0.00     0.00   0.00   0.00    0.00    0.00   0.00     0.00     0.00   0.00   0.00
dm-0             0.00    0.00      0.00      0.00     0.00     0.00   0.00   0.00    0.00    0.00   0.00     0.00     0.00   0.00   0.00
dm-1             0.00    0.00      0.00      0.00     0.00     0.00   0.00   0.00    0.00    0.00   0.00     0.00     0.00   0.00   0.00

[root@ol8mysql01 ~]# 


rrqm/s: 每秒进行IO合并的读操作数
wrqm/s: 每秒进行IO合并的写操作数
r/s：每秒读IO次数
w/s：每秒写IO次数
rkB/s：每秒读K字节数
wkB/s：每秒写K字节数
avgrq-sz：平均每次IO请求大小，单位为扇区（512B）
avgqu-sz：平均IO队列长度
await：平均IO等待的响应时间
r_await：每次读操作IO响应时间
w_await：每次写操作IO响应时间
svctm：平均IO服务的响应时间
%util：IO请求的百分比（CPU使用率）

iostat 关注下这列: aqu-sz 和 %util
aqu-sz 高 说明io负荷高 需要io排队
%util 高 说明io负荷高，使用率高


### netstat

Linux OSWbb v8.1.2
zzz ***Mon Mar 11 18:00:18 JST 2019
Kernel Interface table
Iface       MTU Met    RX-OK RX-ERR RX-DRP RX-OVR    TX-OK TX-ERR TX-DRP TX-OVR Flg
eth0       1500   0 20299824258      0      0      0 21574598739      0      0      0 BMRU
eth1       1500   0 5577513914      0      0      0 1083433344      0      0      0 BMRU
eth2       1500   0        0      0      0      0        0      0      0      0 BM
eth3       1500   0 212635793546      0      0      0 249174294071      0      0      0 BMRU
eth4       1500   0        0      0      0      0        0      0      0      0 BM
eth5       1500   0        0      0      0      0        0      0      0      0 BM
eth6       1500   0        0      0      0      0        0      0      0      0 BM
eth7       1500   0        0      0      0      0        0      0      0      0 BM
eth8       1500   0        0      0      0      0        0      0      0      0 BM
eth9       1500   0        0      0      0      0        0      0      0      0 BM
lo        65536   0 307224845      0      0      0 307224845      0      0      0 LRU


Iface：网卡的名称
MTU：最大传输单元，默认是1500
OK：正确的数据包
ERR：错误的数据包
DRP：丢弃的数据包
OVR：超限的数据包
Flg标志位的含义

B：已经设置了一个广播地址
L：该接口是一个loopback设备
M：接收所有的数据包
R：接口正在运行
U：接口处于活动状态
注：RX表示接收，TX表示发送