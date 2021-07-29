SQL> startup nomount

SQL> create pfile='/tmp/cdbm061_20210312_1712.ora' from spfile;

File created.

SQL> alter system set sga_max_size = 48G scope=spfile sid='*';

System altered.

SQL> alter system set sga_target = 48G scope=spfile sid='*';

System altered.

SQL> shu immediate;


The initialization parameter PGA_AGGREGATE_LIMIT has been introduced since Oracle Database 12.1.0.1.

http://dbaparadise.com/2020/09/things-to-know-about-pga_aggregate_limit/

PGA_AGGREGATE_TARGET = soft limit => more memory can be allocated

PGA_AGGREGATE_LIMIT = hard limit => no more memory can be allocated.

https://www.vitalsofttech.com/limiting-pga-with-pga_aggregate_limit/

When the PGA_AGGREGATE_LIMIT value is over its limit, the sessions or processes using the most PGA memory will be terminated. The error below will be written to the alert log.

PGA memory used by the instance exceeds PGA_AGGREGATE_LIMIT of 3072 MB
Immediate Kill Session#: 41, Serial#: 397
Immediate Kill Session: sess: 0xc13a5066  OS pid: 5233

PGA_AGGREGATE_LIMIT is a dynamic parameter and its value can be changed during run time. The Database restart is not required.

PGA_AGGREGATE_LIMIT is a dynamic parameter and its value can be changed during run time. The Database restart is not required.
SQL> alter system set pga_aggregate_limit=4096M scope=both;
System Altered.
Now we can check verify the change.
SQL> show parameter pga_agg
NAME                 TYPE VALUE
-------------------- ----------- -------
pga_aggregate_limit  big integer 4G
However you cannot decrease the value of pga_aggregate _limit too much. If you try to set it to very low, you will receive the following error.
SQL> alter system set pga_aggregate_limit=100M scope=both;
alter system set pga_aggregate_limit=100M scope=both

*
ERROR at line 1:
ORA-02097: parameter cannot be modified specified value invalid
ORA-00093: pga_aggregate_limit must be between 1694M and 100000G

For DBA’s it is very important to be aware of the behavior when setting the this parameter. When working in 12c and sessions terminate, the DBA should look out for the effect of this parameter.



/*
 * Hugepage を 300GB に設定
 */

========================================
300 (GB) * 1024 / 2 (M) = 153600
    300 : 設定する値 (GB単位)
      2 : 現在の PageSize => 2048(KB)
※1024 と 2 は変更しなくてもよいはず...
========================================

--現在の設定を確認
[root@hotarudb02 ~]# grep Huge /proc/meminfo

★現在の設定値確認忘れ... (以下の　sysctl.conf の値のように小さいはず...)


[root@hotarudb02 ~]# grep huge /etc/sysctl.conf
vm.nr_overcommit_hugepages=13
vm.nr_hugepages=13813                               ←★現在の設定値は小さい

--上記の算出ロジックで HugePage の値を設定
[root@hotarudb02 ~]# vi /etc/sysctl.conf
[root@hotarudb02 ~]# grep huge /etc/sysctl.conf
vm.nr_overcommit_hugepages=13
#vm.nr_hugepages=13813
vm.nr_hugepages=153600                              ←★今回の設定値 (300GB)

--変更の反映
[root@hotarudb02 ~]# sysctl -p
kernel.shmmax = 459790993408
kernel.shmall = 112253660
kernel.randomize_va_space = 2
kernel.sysrq = 1
kernel.panic = 60
kernel.softlockup_panic = 1
kernel.unknown_nmi_panic = 1
kernel.nmi_watchdog = 0
kernel.core_uses_pid = 1
kernel.watchdog_thresh = 30
kernel.printk = 4 4 1 7
vm.max_map_count = 250000
vm.nr_overcommit_hugepages = 13
kernel.msgmni = 2878
kernel.msgmax = 8192
kernel.msgmnb = 65536
kernel.shmmni = 4096
fs.file-max = 13631488
fs.aio-max-nr = 3145728
net.core.rmem_default = 4194304
net.core.wmem_default = 262144
net.core.rmem_max = 4194304
net.core.wmem_max = 2097152
kernel.pid_max = 400000
kernel.sem = 1024 60000 1024 256
vm.min_free_kbytes = 524288
net.core.somaxconn = 1024
net.ipv4.ip_local_port_range = 9000 65500
net.ipv4.ip_forward = 0
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.send_redirects = 0
net.ipv4.conf.default.secure_redirects = 0
net.ipv4.conf.all.secure_redirects = 0
net.ipv4.tcp_max_syn_backlog = 1280
net.ipv4.conf.default.accept_source_route = 0
net.ipv4.conf.all.accept_source_route = 0
net.ipv4.conf.all.log_martians = 1
net.ipv4.conf.default.log_martians = 1
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.icmp_ignore_bogus_error_responses = 1
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_timestamps = 0
net.ipv6.conf.default.autoconf = 0
net.ipv6.conf.all.forwarding = 0
net.ipv6.conf.default.forwarding = 0
net.ipv6.conf.default.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
net.ipv6.conf.default.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0
net.ipv6.conf.default.router_solicitations = 3
net.ipv6.conf.default.accept_ra = 0
net.ipv6.conf.all.accept_ra = 0
net.ipv6.conf.eth0.accept_ra = 0
net.ipv6.conf.eth1.accept_ra = 0
net.ipv6.conf.eth2.accept_ra = 0
net.ipv6.conf.eth3.accept_ra = 0
net.ipv6.conf.eth4.accept_ra = 0
net.ipv6.conf.eth5.accept_ra = 0
net.ipv6.conf.default.dad_transmits = 1
net.ipv6.conf.default.accept_dad = 2
net.ipv6.conf.default.max_addresses = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv4.conf.all.rp_filter = 0
net.ipv4.conf.default.rp_filter = 0
net.ipv4.conf.all.accept_local = 1
net.ipv4.conf.eth0.rp_filter = 1
net.ipv4.conf.eth1.rp_filter = 1
net.ipv4.conf.eth2.rp_filter = 1
net.ipv4.conf.eth3.rp_filter = 1
net.ipv4.conf.eth4.rp_filter = 1
net.ipv4.conf.eth5.rp_filter = 1
net.ipv4.conf.all.rp_filter = 0
net.ipv4.conf.ib0.rp_filter = 0
net.ipv4.conf.ib1.rp_filter = 0
net.ipv4.neigh.ib0.locktime = 0
net.ipv4.conf.ib0.arp_ignore = 1
net.ipv4.conf.ib0.arp_accept = 1
net.ipv4.neigh.ib0.base_reachable_time_ms = 10000
net.ipv4.neigh.ib0.delay_first_probe_time = 1
net.ipv4.neigh.ib1.locktime = 0
net.ipv4.conf.ib1.arp_ignore = 1
net.ipv4.conf.ib1.arp_accept = 1
net.ipv4.neigh.ib1.base_reachable_time_ms = 10000
net.ipv4.neigh.ib1.delay_first_probe_time = 1
net.ipv4.conf.ib0.accept_local = 1
net.ipv4.conf.ib1.accept_local = 1
vm.nr_hugepages = 153600                            ←★変更が反映されている

--HugePages の値を確認
[root@hotarudb02 ~]# grep Huge /proc/meminfo
AnonHugePages:         0 kB
HugePages_Total:   153600                           ←★変更が反映されている
HugePages_Free:    152068
HugePages_Rsvd:        1
HugePages_Surp:        0
Hugepagesize:       2048 kB

[root@hotarudb02 ~]# 



