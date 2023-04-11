---
layout: post
title: "Oracle 23c Free rpm install Tips"
category: Oracle
tags: Oracle 23c Tips
---

* content
{:toc}

Oracle 23c Free rpm install Tips





### Vagrant Install

```
% git clone https://github.com/shakiyam/vagrant-oracle-database-23c-free.git
 Download rpm
vagrant up
```


Download : [oracle-database-free-23c-1.0-1.el8.x86_64.rpm](https://download.oracle.com/otn-pub/otn_software/db-free/oracle-database-free-23c-1.0-1.el8.x86_64.rpm?AuthParam=1681181743_17a540bc3922bea8b00f2f2b47fa6a54)


Logs
```
honglin@honglin-mac vagrant-oracle-database-23c-free % vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Importing base box 'oraclelinux/8'...
==> default: Matching MAC address for NAT networking...
==> default: Checking if box 'oraclelinux/8' version '8.6.359' is up to date...
==> default: A newer version of the box 'oraclelinux/8' for provider 'virtualbox' is
==> default: available! You currently have version '8.6.359'. The latest is version
==> default: '8.7.411'. Run `vagrant box update` to update.
==> default: Setting the name of the VM: vagrant-oracle-database-23c-free_default_1681181964246_59400
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
    default: Adapter 1: nat
==> default: Forwarding ports...
    default: 1521 (guest) => 1521 (host) (adapter 1)
    default: 22 (guest) => 2222 (host) (adapter 1)
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2222
    default: SSH username: vagrant
    default: SSH auth method: private key
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
    default: The guest additions on this VM do not match the installed version of
    default: VirtualBox! In most cases this is fine, but in rare cases it can
    default: prevent things such as shared folders from working properly. If you see
    default: shared folder errors, please make sure the guest additions within the
    default: virtual machine match the version of VirtualBox you have installed on
    default: your host and reload your VM.
    default: 
    default: Guest Additions Version: 6.1.34 r150636
    default: VirtualBox Version: 7.0
==> default: Mounting shared folders...
    default: /vagrant => /Users/honglin/01_VMs/vagrant-oracle-database-23c-free
==> default: Running provisioner: shell...
    default: Running: /var/folders/lk/1hs380qn16b5tlrcys4zdqw80000gn/T/vagrant-shell20230411-39979-1uf1hmy.sh
    default: Environment file .env not found. Therefore, dotenv.sample will be used.
    default: /vagrant/oracle-database-free-23c-1.0-1.el8.x86_64.rpm: OK
    default: Oracle Linux 8 BaseOS Latest (x86_64)            16 MB/s |  57 MB     00:03
    default: Oracle Linux 8 Application Stream (x86_64)       13 MB/s |  43 MB     00:03
    default: Latest Unbreakable Enterprise Kernel Release 6   17 MB/s |  65 MB     00:03
    default: Last metadata expiration check: 0:00:10 ago on Tue 11 Apr 2023 03:00:37 AM UTC.
    default: Dependencies resolved.
    default: ================================================================================
    default:  Package                            Arch    Version    Repository          Size
    default: ================================================================================
    default: Installing:
    default:  oraclelinux-developer-release-el8  x86_64  1.0-7.el8  ol8_baseos_latest   16 k
    default: 
    default: Transaction Summary
    default: ================================================================================
    default: Install  1 Package
    default: 
    default: Total download size: 16 k
    default: Installed size: 18 k
    default: Downloading Packages:
    default: oraclelinux-developer-release-el8-1.0-7.el8.x86  37 kB/s |  16 kB     00:00
    default: --------------------------------------------------------------------------------
    default: Total                                            37 kB/s |  16 kB     00:00
    default: Running transaction check
    default: Transaction check succeeded.
    default: Running transaction test
    default: Transaction test succeeded.
    default: Running transaction
    default:   Preparing        :                                                        1/1
    default:   Installing       : oraclelinux-developer-release-el8-1.0-7.el8.x86_64     1/1
    default:   Verifying        : oraclelinux-developer-release-el8-1.0-7.el8.x86_64     1/1
    default: 
    default: Installed:
    default:   oraclelinux-developer-release-el8-1.0-7.el8.x86_64
    default: 
    default: Complete!
    default: Oracle Linux 8 Development Packages (x86_64)     16 MB/s |  80 MB     00:04
    default: Last metadata expiration check: 0:00:24 ago on Tue 11 Apr 2023 03:00:57 AM UTC.
    default: Dependencies resolved.
    default: ==================================================================================================
    default:  Package                          Arch    Version                         Repository          Size
    default: ==================================================================================================
    default: Installing:
    default:  oracle-database-free-23c         x86_64  1.0-1                           @commandline       1.6 G
    default: Installing dependencies:
    default:  bc                               x86_64  1.07.1-5.el8                    ol8_baseos_latest  129 k
    default:  bind-libs                        x86_64  32:9.11.36-5.el8_7.2            ol8_appstream      175 k
    default:  bind-libs-lite                   x86_64  32:9.11.36-5.el8_7.2            ol8_appstream      1.2 M
    default:  bind-license                     noarch  32:9.11.36-5.el8_7.2            ol8_appstream      104 k
    default:  bind-utils                       x86_64  32:9.11.36-5.el8_7.2            ol8_appstream      452 k
    default:  checkpolicy                      x86_64  2.9-1.el8                       ol8_baseos_latest  346 k
    default:  compat-openssl10                 x86_64  1:1.0.2o-4.el8_6                ol8_appstream      1.1 M
    default:  fstrm                            x86_64  0.6.1-3.el8                     ol8_appstream       29 k
    default:  gssproxy                         x86_64  0.8.0-21.el8                    ol8_baseos_latest  119 k
    default:  keyutils                         x86_64  1.5.10-9.el8                    ol8_baseos_latest   66 k
    default:  ksh                              x86_64  20120801-257.0.1.el8            ol8_appstream      929 k
    default:  libICE                           x86_64  1.0.9-15.el8                    ol8_appstream       74 k
    default:  libSM                            x86_64  1.2.3-1.el8                     ol8_appstream       47 k
    default:  libX11                           x86_64  1.6.8-5.el8                     ol8_appstream      611 k
    default:  libX11-common                    noarch  1.6.8-5.el8                     ol8_appstream      158 k
    default:  libX11-xcb                       x86_64  1.6.8-5.el8                     ol8_appstream       14 k
    default:  libXau                           x86_64  1.0.9-3.el8                     ol8_appstream       37 k
    default:  libXcomposite                    x86_64  0.4.4-14.el8                    ol8_appstream       28 k
    default:  libXext                          x86_64  1.3.4-1.el8                     ol8_appstream       45 k
    default:  libXi                            x86_64  1.7.10-1.el8                    ol8_appstream       49 k
    default:  libXinerama                      x86_64  1.1.4-1.el8                     ol8_appstream       15 k
    default:  libXmu                           x86_64  1.1.3-1.el8                     ol8_appstream       75 k
    default:  libXrandr                        x86_64  1.5.2-1.el8                     ol8_appstream       34 k
    default:  libXrender                       x86_64  0.9.10-7.el8                    ol8_appstream       33 k
    default:  libXt                            x86_64  1.1.5-12.el8                    ol8_appstream      185 k
    default:  libXtst                          x86_64  1.2.3-7.el8                     ol8_appstream       22 k
    default:  libXv                            x86_64  1.0.11-7.el8                    ol8_appstream       20 k
    default:  libXxf86dga                      x86_64  1.1.5-1.el8                     ol8_appstream       26 k
    default:  libXxf86misc                     x86_64  1.0.4-1.el8                     ol8_appstream       23 k
    default:  libXxf86vm                       x86_64  1.1.4-9.el8                     ol8_appstream       19 k
    default:  libbasicobjects                  x86_64  0.1.1-40.el8                    ol8_baseos_latest   31 k
    default:  libcollection                    x86_64  0.7.0-40.el8                    ol8_baseos_latest   48 k
    default:  libdmx                           x86_64  1.1.4-3.el8                     ol8_appstream       22 k
    default:  libini_config                    x86_64  1.3.1-40.el8                    ol8_baseos_latest   70 k
    default:  libmaxminddb                     x86_64  1.2.0-10.el8                    ol8_appstream       33 k
    default:  libnfsidmap                      x86_64  1:2.3.3-57.el8_7.1              ol8_baseos_latest  122 k
    default:  libnsl                           x86_64  2.28-189.5.0.1.el8_6            ol8_baseos_latest  103 k
    default:  libpath_utils                    x86_64  0.2.1-40.el8                    ol8_baseos_latest   34 k
    default:  libref_array                     x86_64  0.1.5-40.el8                    ol8_baseos_latest   33 k
    default:  libverto-libevent                x86_64  0.3.0-5.el8                     ol8_baseos_latest   16 k
    default:  libxcb                           x86_64  1.13.1-1.el8                    ol8_appstream      231 k
    default:  lm_sensors-libs                  x86_64  3.4.0-23.20180522git70f7e08.el8 ol8_baseos_latest   59 k
    default:  net-tools                        x86_64  2.0-0.52.20160912git.el8        ol8_baseos_latest  322 k
    default:  nfs-utils                        x86_64  1:2.3.3-57.el8_7.1              ol8_baseos_latest  515 k
    default:  oracle-database-preinstall-23c   x86_64  1.0-0.5.el8                     ol8_developer       30 k
    default:  policycoreutils-python-utils     noarch  2.9-19.0.1.el8                  ol8_baseos_latest  253 k
    default:  protobuf-c                       x86_64  1.3.0-6.el8                     ol8_appstream       37 k
    default:  python3-audit                    x86_64  3.0.7-2.el8.2                   ol8_baseos_latest   87 k
    default:  python3-bind                     noarch  32:9.11.36-5.el8_7.2            ol8_appstream      151 k
    default:  python3-libsemanage              x86_64  2.9-8.el8                       ol8_baseos_latest  128 k
    default:  python3-ply                      noarch  3.9-9.el8                       ol8_baseos_latest  111 k
    default:  python3-policycoreutils          noarch  2.9-19.0.1.el8                  ol8_baseos_latest  2.2 M
    default:  python3-pyyaml                   x86_64  5.4.1-1.0.1.el8                 ol8_developer      205 k
    default:  python3-setools                  x86_64  4.3.0-3.el8                     ol8_baseos_latest  624 k
    default:  quota                            x86_64  1:4.04-14.el8                   ol8_baseos_latest  214 k
    default:  quota-nls                        noarch  1:4.04-14.el8                   ol8_baseos_latest   95 k
    default:  rpcbind                          x86_64  1.2.5-10.el8                    ol8_baseos_latest   70 k
    default:  smartmontools                    x86_64  1:7.1-1.el8                     ol8_baseos_latest  544 k
    default:  sysstat                          x86_64  11.7.3-7.0.1.el8_7.1            ol8_appstream      426 k
    default:  unzip                            x86_64  6.0-46.0.1.el8                  ol8_baseos_latest  196 k
    default:  xorg-x11-utils                   x86_64  7.5-28.el8                      ol8_appstream      136 k
    default:  xorg-x11-xauth                   x86_64  1:1.0.9-12.el8                  ol8_appstream       39 k
    default: Installing weak dependencies:
    default:  geolite2-city                    noarch  20180605-1.el8                  ol8_appstream       19 M
    default:  geolite2-country                 noarch  20180605-1.el8                  ol8_appstream      1.0 M
    default: 
    default: Transaction Summary
    default: ==================================================================================================
    default: Install  65 Packages
    default: 
    default: Total size: 1.7 G
    default: Total download size: 33 M
    default: Installed size: 5.3 G
    default: Downloading Packages:
    default: (1/64): bc-1.07.1-5.el8.x86_64.rpm              234 kB/s | 129 kB     00:00
    default: (2/64): gssproxy-0.8.0-21.el8.x86_64.rpm        209 kB/s | 119 kB     00:00
    default: (3/64): keyutils-1.5.10-9.el8.x86_64.rpm        904 kB/s |  66 kB     00:00
    default: (4/64): checkpolicy-2.9-1.el8.x86_64.rpm        540 kB/s | 346 kB     00:00
    default: (5/64): libbasicobjects-0.1.1-40.el8.x86_64.rpm 433 kB/s |  31 kB     00:00
    default: (6/64): libcollection-0.7.0-40.el8.x86_64.rpm   656 kB/s |  48 kB     00:00
    default: (7/64): libini_config-1.3.1-40.el8.x86_64.rpm   978 kB/s |  70 kB     00:00
    default: (8/64): libnsl-2.28-189.5.0.1.el8_6.x86_64.rpm  1.3 MB/s | 103 kB     00:00
    default: (9/64): libnfsidmap-2.3.3-57.el8_7.1.x86_64.rpm 890 kB/s | 122 kB     00:00
    default: (10/64): libpath_utils-0.2.1-40.el8.x86_64.rpm  481 kB/s |  34 kB     00:00
    default: (11/64): libref_array-0.1.5-40.el8.x86_64.rpm   431 kB/s |  33 kB     00:00
    default: (12/64): lm_sensors-libs-3.4.0-23.20180522git70 778 kB/s |  59 kB     00:00
    default: (13/64): libverto-libevent-0.3.0-5.el8.x86_64.r 166 kB/s |  16 kB     00:00
    default: (14/64): net-tools-2.0-0.52.20160912git.el8.x86 2.2 MB/s | 322 kB     00:00
    default: (15/64): nfs-utils-2.3.3-57.el8_7.1.x86_64.rpm  3.3 MB/s | 515 kB     00:00
    default: (16/64): policycoreutils-python-utils-2.9-19.0. 1.7 MB/s | 253 kB     00:00
    default: (17/64): python3-audit-3.0.7-2.el8.2.x86_64.rpm 1.1 MB/s |  87 kB     00:00
    default: (18/64): python3-libsemanage-2.9-8.el8.x86_64.r 1.7 MB/s | 128 kB     00:00
    default: (19/64): python3-ply-3.9-9.el8.noarch.rpm       1.4 MB/s | 111 kB     00:00
    default: (20/64): python3-setools-4.3.0-3.el8.x86_64.rpm 5.9 MB/s | 624 kB     00:00
    default: (21/64): quota-4.04-14.el8.x86_64.rpm           2.0 MB/s | 214 kB     00:00
    default: (22/64): quota-nls-4.04-14.el8.noarch.rpm       1.3 MB/s |  95 kB     00:00
    default: (23/64): rpcbind-1.2.5-10.el8.x86_64.rpm        977 kB/s |  70 kB     00:00
    default: (24/64): python3-policycoreutils-2.9-19.0.1.el8 9.0 MB/s | 2.2 MB     00:00
    default: (25/64): smartmontools-7.1-1.el8.x86_64.rpm     5.3 MB/s | 544 kB     00:00
    default: (26/64): bind-libs-9.11.36-5.el8_7.2.x86_64.rpm 2.3 MB/s | 175 kB     00:00
    default: (27/64): unzip-6.0-46.0.1.el8.x86_64.rpm        1.1 MB/s | 196 kB     00:00
    default: (28/64): bind-libs-lite-9.11.36-5.el8_7.2.x86_6  11 MB/s | 1.2 MB     00:00
    default: (29/64): bind-license-9.11.36-5.el8_7.2.noarch. 1.2 MB/s | 104 kB     00:00
    default: (30/64): bind-utils-9.11.36-5.el8_7.2.x86_64.rp 5.1 MB/s | 452 kB     00:00
    default: (31/64): fstrm-0.6.1-3.el8.x86_64.rpm           345 kB/s |  29 kB     00:00
    default: (32/64): compat-openssl10-1.0.2o-4.el8_6.x86_64 9.5 MB/s | 1.1 MB     00:00
    default: (33/64): geolite2-country-20180605-1.el8.noarch 8.5 MB/s | 1.0 MB     00:00
    default: (34/64): ksh-20120801-257.0.1.el8.x86_64.rpm    5.5 MB/s | 929 kB     00:00
    default: (35/64): libICE-1.0.9-15.el8.x86_64.rpm         596 kB/s |  74 kB     00:00
    default: (36/64): libSM-1.2.3-1.el8.x86_64.rpm           460 kB/s |  47 kB     00:00
    default: (37/64): libX11-1.6.8-5.el8.x86_64.rpm          3.9 MB/s | 611 kB     00:00
    default: (38/64): libX11-common-1.6.8-5.el8.noarch.rpm   1.3 MB/s | 158 kB     00:00
    default: (39/64): libX11-xcb-1.6.8-5.el8.x86_64.rpm      138 kB/s |  14 kB     00:00
    default: (40/64): libXau-1.0.9-3.el8.x86_64.rpm          385 kB/s |  37 kB     00:00
    default: (41/64): libXcomposite-0.4.4-14.el8.x86_64.rpm  228 kB/s |  28 kB     00:00
    default: (42/64): libXext-1.3.4-1.el8.x86_64.rpm         414 kB/s |  45 kB     00:00
    default: (43/64): libXi-1.7.10-1.el8.x86_64.rpm          554 kB/s |  49 kB     00:00
    default: (44/64): libXinerama-1.1.4-1.el8.x86_64.rpm     179 kB/s |  15 kB     00:00
    default: (45/64): libXmu-1.1.3-1.el8.x86_64.rpm          680 kB/s |  75 kB     00:00
    default: (46/64): libXrandr-1.5.2-1.el8.x86_64.rpm       302 kB/s |  34 kB     00:00
    default: (47/64): geolite2-city-20180605-1.el8.noarch.rp  19 MB/s |  19 MB     00:01
    default: (48/64): libXrender-0.9.10-7.el8.x86_64.rpm     215 kB/s |  33 kB     00:00
    default: (49/64): libXt-1.1.5-12.el8.x86_64.rpm          1.2 MB/s | 185 kB     00:00
    default: (50/64): libXtst-1.2.3-7.el8.x86_64.rpm         307 kB/s |  22 kB     00:00
    default: (51/64): libXv-1.0.11-7.el8.x86_64.rpm          268 kB/s |  20 kB     00:00
    default: (52/64): libXxf86dga-1.1.5-1.el8.x86_64.rpm     356 kB/s |  26 kB     00:00
    default: (53/64): libXxf86misc-1.0.4-1.el8.x86_64.rpm    322 kB/s |  23 kB     00:00
    default: (54/64): libXxf86vm-1.1.4-9.el8.x86_64.rpm      273 kB/s |  19 kB     00:00
    default: (55/64): libdmx-1.1.4-3.el8.x86_64.rpm          308 kB/s |  22 kB     00:00
    default: (56/64): libmaxminddb-1.2.0-10.el8.x86_64.rpm   433 kB/s |  33 kB     00:00
    default: (57/64): libxcb-1.13.1-1.el8.x86_64.rpm         2.9 MB/s | 231 kB     00:00
    default: (58/64): protobuf-c-1.3.0-6.el8.x86_64.rpm      499 kB/s |  37 kB     00:00
    default: (59/64): python3-bind-9.11.36-5.el8_7.2.noarch. 1.9 MB/s | 151 kB     00:00
    default: (60/64): sysstat-11.7.3-7.0.1.el8_7.1.x86_64.rp 4.4 MB/s | 426 kB     00:00
    default: (61/64): xorg-x11-utils-7.5-28.el8.x86_64.rpm   1.4 MB/s | 136 kB     00:00
    default: (62/64): xorg-x11-xauth-1.0.9-12.el8.x86_64.rpm 488 kB/s |  39 kB     00:00
    default: (63/64): oracle-database-preinstall-23c-1.0-0.5 412 kB/s |  30 kB     00:00
    default: (64/64): python3-pyyaml-5.4.1-1.0.1.el8.x86_64. 2.6 MB/s | 205 kB     00:00
    default: --------------------------------------------------------------------------------
    default: Total                                            11 MB/s |  33 MB     00:02
    default: Running transaction check
    default: Transaction check succeeded.
    default: Running transaction test
    default: Transaction test succeeded.
    default: Running transaction
    default:   Preparing        :                                                        1/1
    default:   Installing       : protobuf-c-1.3.0-6.el8.x86_64                         1/65
    default:   Installing       : fstrm-0.6.1-3.el8.x86_64                              2/65
    default:   Installing       : bind-license-32:9.11.36-5.el8_7.2.noarch              3/65
    default:   Installing       : libXau-1.0.9-3.el8.x86_64                             4/65
    default:   Installing       : libxcb-1.13.1-1.el8.x86_64                            5/65
    default:   Installing       : libICE-1.0.9-15.el8.x86_64                            6/65
    default:   Installing       : net-tools-2.0-0.52.20160912git.el8.x86_64             7/65
    default:   Running scriptlet: net-tools-2.0-0.52.20160912git.el8.x86_64             7/65
    default:   Installing       : libref_array-0.1.5-40.el8.x86_64                      8/65
    default:   Installing       : libcollection-0.7.0-40.el8.x86_64                     9/65
    default:   Installing       : libbasicobjects-0.1.1-40.el8.x86_64                  10/65
    default:   Installing       : libSM-1.2.3-1.el8.x86_64                             11/65
    default:   Installing       : python3-pyyaml-5.4.1-1.0.1.el8.x86_64                12/65
    default:   Installing       : libX11-xcb-1.6.8-5.el8.x86_64                        13/65
    default:   Installing       : libX11-common-1.6.8-5.el8.noarch                     14/65
    default:   Installing       : libX11-1.6.8-5.el8.x86_64                            15/65
    default:   Installing       : libXext-1.3.4-1.el8.x86_64                           16/65
    default:   Installing       : libXi-1.7.10-1.el8.x86_64                            17/65
    default:   Installing       : libXrender-0.9.10-7.el8.x86_64                       18/65
    default:   Installing       : libXrandr-1.5.2-1.el8.x86_64                         19/65
    default:   Installing       : libXtst-1.2.3-7.el8.x86_64                           20/65
    default:   Installing       : libXinerama-1.1.4-1.el8.x86_64                       21/65
    default:   Installing       : libXv-1.0.11-7.el8.x86_64                            22/65
    default:   Installing       : libXxf86dga-1.1.5-1.el8.x86_64                       23/65
    default:   Installing       : libXxf86misc-1.0.4-1.el8.x86_64                      24/65
    default:   Installing       : libXxf86vm-1.1.4-9.el8.x86_64                        25/65
    default:   Installing       : libdmx-1.1.4-3.el8.x86_64                            26/65
    default:   Installing       : libXcomposite-0.4.4-14.el8.x86_64                    27/65
    default:   Installing       : xorg-x11-utils-7.5-28.el8.x86_64                     28/65
    default:   Installing       : libXt-1.1.5-12.el8.x86_64                            29/65
    default:   Installing       : libXmu-1.1.3-1.el8.x86_64                            30/65
    default:   Installing       : xorg-x11-xauth-1:1.0.9-12.el8.x86_64                 31/65
    default:   Installing       : ksh-20120801-257.0.1.el8.x86_64                      32/65
    default:   Running scriptlet: ksh-20120801-257.0.1.el8.x86_64                      32/65
    default:   Installing       : geolite2-country-20180605-1.el8.noarch               33/65
    default:   Installing       : geolite2-city-20180605-1.el8.noarch                  34/65
    default:   Installing       : libmaxminddb-1.2.0-10.el8.x86_64                     35/65
    default:   Running scriptlet: libmaxminddb-1.2.0-10.el8.x86_64                     35/65
    default:   Installing       : bind-libs-lite-32:9.11.36-5.el8_7.2.x86_64           36/65
    default:   Installing       : bind-libs-32:9.11.36-5.el8_7.2.x86_64                37/65
    default:   Installing       : compat-openssl10-1:1.0.2o-4.el8_6.x86_64             38/65
    default:   Running scriptlet: compat-openssl10-1:1.0.2o-4.el8_6.x86_64             38/65
    default:   Installing       : unzip-6.0-46.0.1.el8.x86_64                          39/65
    default:   Running scriptlet: smartmontools-1:7.1-1.el8.x86_64                     40/65
    default:   Installing       : smartmontools-1:7.1-1.el8.x86_64                     40/65
    default:   Running scriptlet: smartmontools-1:7.1-1.el8.x86_64                     40/65
    default:   Running scriptlet: rpcbind-1.2.5-10.el8.x86_64                          41/65
    default:   Installing       : rpcbind-1.2.5-10.el8.x86_64                          41/65
    default:   Running scriptlet: rpcbind-1.2.5-10.el8.x86_64                          41/65
    default:   Installing       : quota-nls-1:4.04-14.el8.noarch                       42/65
    default:   Installing       : quota-1:4.04-14.el8.x86_64                           43/65
    default:   Installing       : python3-setools-4.3.0-3.el8.x86_64                   44/65
    default:   Installing       : python3-ply-3.9-9.el8.noarch                         45/65
    default:   Installing       : python3-bind-32:9.11.36-5.el8_7.2.noarch             46/65
    default:   Installing       : bind-utils-32:9.11.36-5.el8_7.2.x86_64               47/65
    default:   Installing       : python3-libsemanage-2.9-8.el8.x86_64                 48/65
    default:   Installing       : python3-audit-3.0.7-2.el8.2.x86_64                   49/65
    default:   Installing       : lm_sensors-libs-3.4.0-23.20180522git70f7e08.el8.x8   50/65
    default:   Running scriptlet: lm_sensors-libs-3.4.0-23.20180522git70f7e08.el8.x8   50/65
    default:   Installing       : sysstat-11.7.3-7.0.1.el8_7.1.x86_64                  51/65
    default:   Running scriptlet: sysstat-11.7.3-7.0.1.el8_7.1.x86_64                  51/65
    default:   Installing       : libverto-libevent-0.3.0-5.el8.x86_64                 52/65
    default:   Installing       : libpath_utils-0.2.1-40.el8.x86_64                    53/65
    default:   Installing       : libini_config-1.3.1-40.el8.x86_64                    54/65
    default:   Installing       : gssproxy-0.8.0-21.el8.x86_64                         55/65
    default:   Running scriptlet: gssproxy-0.8.0-21.el8.x86_64                         55/65
    default:   Installing       : libnsl-2.28-189.5.0.1.el8_6.x86_64                   56/65
    default:   Installing       : libnfsidmap-1:2.3.3-57.el8_7.1.x86_64                57/65
    default:   Installing       : keyutils-1.5.10-9.el8.x86_64                         58/65
    default:   Running scriptlet: nfs-utils-1:2.3.3-57.el8_7.1.x86_64                  59/65
    default:   Installing       : nfs-utils-1:2.3.3-57.el8_7.1.x86_64                  59/65
    default:   Running scriptlet: nfs-utils-1:2.3.3-57.el8_7.1.x86_64                  59/65
    default:   Installing       : checkpolicy-2.9-1.el8.x86_64                         60/65
    default:   Installing       : python3-policycoreutils-2.9-19.0.1.el8.noarch        61/65
    default:   Installing       : policycoreutils-python-utils-2.9-19.0.1.el8.noarch   62/65
    default:   Installing       : bc-1.07.1-5.el8.x86_64                               63/65
    default:   Running scriptlet: bc-1.07.1-5.el8.x86_64                               63/65
    default:   Installing       : oracle-database-preinstall-23c-1.0-0.5.el8.x86_64    64/65
    default:   Verifying        : oracle-database-free-23c-1.0-1.x86_64                65/65
    default: 
    default: Installed:
    default:   bc-1.07.1-5.el8.x86_64
    default:   bind-libs-32:9.11.36-5.el8_7.2.x86_64
    default:   bind-libs-lite-32:9.11.36-5.el8_7.2.x86_64
    default:   bind-license-32:9.11.36-5.el8_7.2.noarch
    default:   bind-utils-32:9.11.36-5.el8_7.2.x86_64
    default:   checkpolicy-2.9-1.el8.x86_64
    default:   compat-openssl10-1:1.0.2o-4.el8_6.x86_64
    default:   fstrm-0.6.1-3.el8.x86_64
    default:   geolite2-city-20180605-1.el8.noarch
    default:   geolite2-country-20180605-1.el8.noarch
    default:   gssproxy-0.8.0-21.el8.x86_64
    default:   keyutils-1.5.10-9.el8.x86_64
    default:   ksh-20120801-257.0.1.el8.x86_64
    default:   libICE-1.0.9-15.el8.x86_64
    default:   libSM-1.2.3-1.el8.x86_64
    default:   libX11-1.6.8-5.el8.x86_64
    default:   libX11-common-1.6.8-5.el8.noarch
    default:   libX11-xcb-1.6.8-5.el8.x86_64
    default:   libXau-1.0.9-3.el8.x86_64
    default:   libXcomposite-0.4.4-14.el8.x86_64
    default:   libXext-1.3.4-1.el8.x86_64
    default:   libXi-1.7.10-1.el8.x86_64
    default:   libXinerama-1.1.4-1.el8.x86_64
    default:   libXmu-1.1.3-1.el8.x86_64
    default:   libXrandr-1.5.2-1.el8.x86_64
    default:   libXrender-0.9.10-7.el8.x86_64
    default:   libXt-1.1.5-12.el8.x86_64
    default:   libXtst-1.2.3-7.el8.x86_64
    default:   libXv-1.0.11-7.el8.x86_64
    default:   libXxf86dga-1.1.5-1.el8.x86_64
    default:   libXxf86misc-1.0.4-1.el8.x86_64
    default:   libXxf86vm-1.1.4-9.el8.x86_64
    default:   libbasicobjects-0.1.1-40.el8.x86_64
    default:   libcollection-0.7.0-40.el8.x86_64
    default:   libdmx-1.1.4-3.el8.x86_64
    default:   libini_config-1.3.1-40.el8.x86_64
    default:   libmaxminddb-1.2.0-10.el8.x86_64
    default:   libnfsidmap-1:2.3.3-57.el8_7.1.x86_64
    default:   libnsl-2.28-189.5.0.1.el8_6.x86_64
    default:   libpath_utils-0.2.1-40.el8.x86_64
    default:   libref_array-0.1.5-40.el8.x86_64
    default:   libverto-libevent-0.3.0-5.el8.x86_64
    default:   libxcb-1.13.1-1.el8.x86_64
    default:   lm_sensors-libs-3.4.0-23.20180522git70f7e08.el8.x86_64
    default:   net-tools-2.0-0.52.20160912git.el8.x86_64
    default:   nfs-utils-1:2.3.3-57.el8_7.1.x86_64
    default:   oracle-database-free-23c-1.0-1.x86_64
    default:   oracle-database-preinstall-23c-1.0-0.5.el8.x86_64
    default:   policycoreutils-python-utils-2.9-19.0.1.el8.noarch
    default:   protobuf-c-1.3.0-6.el8.x86_64
    default:   python3-audit-3.0.7-2.el8.2.x86_64
    default:   python3-bind-32:9.11.36-5.el8_7.2.noarch
    default:   python3-libsemanage-2.9-8.el8.x86_64
    default:   python3-ply-3.9-9.el8.noarch
    default:   python3-policycoreutils-2.9-19.0.1.el8.noarch
    default:   python3-pyyaml-5.4.1-1.0.1.el8.x86_64
    default:   python3-setools-4.3.0-3.el8.x86_64
    default:   quota-1:4.04-14.el8.x86_64
    default:   quota-nls-1:4.04-14.el8.noarch
    default:   rpcbind-1.2.5-10.el8.x86_64
    default:   smartmontools-1:7.1-1.el8.x86_64
    default:   sysstat-11.7.3-7.0.1.el8_7.1.x86_64
    default:   unzip-6.0-46.0.1.el8.x86_64
    default:   xorg-x11-utils-7.5-28.el8.x86_64
    default:   xorg-x11-xauth-1:1.0.9-12.el8.x86_64
    default: 
    default: Complete!
    default: Configuring Oracle Listener.
    default: Listener configuration succeeded.
    default: Configuring Oracle Database FREE.
    default: Enter SYS user password:
    default: ***** 
    default: Enter SYSTEM user password:
    default: ******
    default: Enter PDBADMIN User Password:
    default: *******
    default: Prepare for db operation
    default: 7% complete
    default: Copying database files
    default: 29% complete
    default: Creating and starting Oracle instance
    default: 30% complete
    default: 33% complete
    default: 36% complete
    default: 39% complete
    default: 43% complete
    default: Completing Database Creation
    default: 47% complete
    default: 49% complete
    default: 50% complete
    default: Creating Pluggable Databases
    default: 54% complete
    default: 71% complete
    default: Executing Post Configuration Actions
    default: 93% complete
    default: Running Custom Scripts
    default: 100% complete
    default: Database creation complete. For details check the logfiles at:
    default:  /opt/oracle/cfgtoollogs/dbca/FREE.
    default: Database Information:
    default: Global Database Name:FREE
    default: System Identifier(SID):FREE
    default: Look at the log file "/opt/oracle/cfgtoollogs/dbca/FREE/FREE.log" for further details.
    default: 
    default: Connect to Oracle Database using one of the connect strings:
    default:      Pluggable database: localhost.localdomain/FREEPDB1
    default:      Multitenant container database: localhost.localdomain
    default: Last metadata expiration check: 0:12:17 ago on Tue 11 Apr 2023 03:00:57 AM UTC.
    default: Dependencies resolved.
    default: ================================================================================
    default:  Package                  Arch    Version              Repository          Size
    default: ================================================================================
    default: Installing:
    default:  oracle-epel-release-el8  x86_64  1.0-5.el8            ol8_baseos_latest   15 k
    default: Installing dependencies:
    default:  yum-utils                noarch  4.0.21-11.0.1.el8    ol8_baseos_latest   74 k
    default: 
    default: Transaction Summary
    default: ================================================================================
    default: Install  2 Packages
    default: 
    default: Total download size: 89 k
    default: Installed size: 41 k
    default: Downloading Packages:
    default: (1/2): oracle-epel-release-el8-1.0-5.el8.x86_64  40 kB/s |  15 kB     00:00
    default: (2/2): yum-utils-4.0.21-11.0.1.el8.noarch.rpm    46 kB/s |  74 kB     00:01
    default: --------------------------------------------------------------------------------
    default: Total                                            56 kB/s |  89 kB     00:01
    default: Running transaction check
    default: Transaction check succeeded.
    default: Running transaction test
    default: Transaction test succeeded.
    default: Running transaction
    default:   Preparing        :                                                        1/1
    default:   Installing       : yum-utils-4.0.21-11.0.1.el8.noarch                     1/2
    default:   Installing       : oracle-epel-release-el8-1.0-5.el8.x86_64               2/2
    default:   Running scriptlet: oracle-epel-release-el8-1.0-5.el8.x86_64               2/2
    default:   Verifying        : oracle-epel-release-el8-1.0-5.el8.x86_64               1/2
    default:   Verifying        : yum-utils-4.0.21-11.0.1.el8.noarch                     2/2
    default: 
    default: Installed:
    default:   oracle-epel-release-el8-1.0-5.el8.x86_64  yum-utils-4.0.21-11.0.1.el8.noarch
    default: 
    default: Complete!
    default: Oracle Linux 8 EPEL Packages for Development (x  14 MB/s |  44 MB     00:03
    default: Oracle Linux 8 EPEL Modular Packages for Develo 355 kB/s | 322 kB     00:00
    default: Dependencies resolved.
    default: ===================================================================================================
    default:  Package                  Arch    Version                                 Repository           Size
    default: ===================================================================================================
    default: Installing:
    default:  rlwrap                   x86_64  0.46.1-1.el8                            ol8_developer_EPEL  140 k
    default: Installing dependencies:
    default:  perl-Carp                noarch  1.42-396.el8                            ol8_baseos_latest    30 k
    default:  perl-Data-Dumper         x86_64  2.167-399.el8                           ol8_baseos_latest    58 k
    default:  perl-Digest              noarch  1.17-395.el8                            ol8_appstream        27 k
    default:  perl-Digest-MD5          x86_64  2.55-396.el8                            ol8_appstream        37 k
    default:  perl-Encode              x86_64  4:2.97-3.el8                            ol8_baseos_latest   1.5 M
    default:  perl-Errno               x86_64  1.28-421.el8                            ol8_baseos_latest    76 k
    default:  perl-Exporter            noarch  5.72-396.el8                            ol8_baseos_latest    34 k
    default:  perl-File-Path           noarch  2.15-2.el8                              ol8_baseos_latest    38 k
    default:  perl-File-Slurp          noarch  9999.19-19.el8                          ol8_appstream        47 k
    default:  perl-File-Temp           noarch  0.230.600-1.el8                         ol8_baseos_latest    63 k
    default:  perl-Getopt-Long         noarch  1:2.50-4.el8                            ol8_baseos_latest    63 k
    default:  perl-HTTP-Tiny           noarch  0.074-1.el8                             ol8_baseos_latest    58 k
    default:  perl-IO                  x86_64  1.38-421.el8                            ol8_baseos_latest   142 k
    default:  perl-MIME-Base64         x86_64  3.15-396.el8                            ol8_baseos_latest    31 k
    default:  perl-Net-SSLeay          x86_64  1.88-2.module+el8.6.0+20623+f0897f98    ol8_appstream       379 k
    default:  perl-PathTools           x86_64  3.74-1.el8                              ol8_baseos_latest    90 k
    default:  perl-Pod-Escapes         noarch  1:1.07-395.el8                          ol8_baseos_latest    20 k
    default:  perl-Pod-Perldoc         noarch  3.28-396.el8                            ol8_baseos_latest    88 k
    default:  perl-Pod-Simple          noarch  1:3.35-395.el8                          ol8_baseos_latest   213 k
    default:  perl-Pod-Usage           noarch  4:1.69-395.el8                          ol8_baseos_latest    34 k
    default:  perl-Scalar-List-Utils   x86_64  3:1.49-2.el8                            ol8_baseos_latest    68 k
    default:  perl-Socket              x86_64  4:2.027-3.el8                           ol8_baseos_latest    59 k
    default:  perl-Storable            x86_64  1:3.11-3.el8                            ol8_baseos_latest    98 k
    default:  perl-Term-ANSIColor      noarch  4.06-396.el8                            ol8_baseos_latest    46 k
    default:  perl-Term-Cap            noarch  1.17-395.el8                            ol8_baseos_latest    23 k
    default:  perl-Text-ParseWords     noarch  3.30-395.el8                            ol8_baseos_latest    18 k
    default:  perl-Text-Tabs+Wrap      noarch  2013.0523-395.el8                       ol8_baseos_latest    24 k
    default:  perl-Time-Local          noarch  1:1.280-1.el8                           ol8_baseos_latest    33 k
    default:  perl-URI                 noarch  1.73-3.el8                              ol8_appstream       116 k
    default:  perl-Unicode-Normalize   x86_64  1.25-396.el8                            ol8_baseos_latest    82 k
    default:  perl-constant            noarch  1.33-396.el8                            ol8_baseos_latest    25 k
    default:  perl-interpreter         x86_64  4:5.26.3-421.el8                        ol8_baseos_latest   6.3 M
    default:  perl-libnet              noarch  3.11-3.el8                              ol8_appstream       121 k
    default:  perl-libs                x86_64  4:5.26.3-421.el8                        ol8_baseos_latest   1.6 M
    default:  perl-macros              x86_64  4:5.26.3-421.el8                        ol8_baseos_latest    72 k
    default:  perl-parent              noarch  1:0.237-1.el8                           ol8_baseos_latest    20 k
    default:  perl-podlators           noarch  4.11-1.el8                              ol8_baseos_latest   118 k
    default:  perl-threads             x86_64  1:2.21-2.el8                            ol8_baseos_latest    61 k
    default:  perl-threads-shared      x86_64  1.58-2.el8                              ol8_baseos_latest    48 k
    default:  python3-pip              noarch  9.0.3-22.el8                            ol8_appstream        20 k
    default:  python3-setuptools       noarch  39.2.0-6.el8                            ol8_baseos_latest   163 k
    default:  python36                 x86_64  3.6.8-38.module+el8.5.0+20329+5c5719bc  ol8_appstream        19 k
    default: Installing weak dependencies:
    default:  perl-IO-Socket-IP        noarch  0.39-5.el8                              ol8_appstream        47 k
    default:  perl-IO-Socket-SSL       noarch  2.066-4.module+el8.6.0+20623+f0897f98   ol8_appstream       298 k
    default:  perl-Mozilla-CA          noarch  20160104-7.module+el8.3.0+7692+542c56f9 ol8_appstream        15 k
    default: Enabling module streams:
    default:  perl                             5.26
    default:  perl-IO-Socket-SSL               2.066
    default:  perl-libwww-perl                 6.34
    default:  python36                         3.6
    default: 
    default: Transaction Summary
    default: ===================================================================================================
    default: Install  46 Packages
    default: 
    default: Total download size: 13 M
    default: Installed size: 36 M
    default: Downloading Packages:
    default: (1/46): perl-Carp-1.42-396.el8.noarch.rpm        74 kB/s |  30 kB     00:00
    default: (2/46): perl-Data-Dumper-2.167-399.el8.x86_64.r 122 kB/s |  58 kB     00:00
    default: (3/46): rlwrap-0.46.1-1.el8.x86_64.rpm          270 kB/s | 140 kB     00:00
    default: (4/46): perl-Exporter-5.72-396.el8.noarch.rpm   486 kB/s |  34 kB     00:00
    default: (5/46): perl-Errno-1.28-421.el8.x86_64.rpm      554 kB/s |  76 kB     00:00
    default: (6/46): perl-File-Path-2.15-2.el8.noarch.rpm    506 kB/s |  38 kB     00:00
    default: (7/46): perl-File-Temp-0.230.600-1.el8.noarch.r 875 kB/s |  63 kB     00:00
    default: (8/46): perl-Getopt-Long-2.50-4.el8.noarch.rpm  857 kB/s |  63 kB     00:00
    default: (9/46): perl-HTTP-Tiny-0.074-1.el8.noarch.rpm   777 kB/s |  58 kB     00:00
    default: (10/46): perl-Encode-2.97-3.el8.x86_64.rpm      3.7 MB/s | 1.5 MB     00:00
    default: (11/46): perl-IO-1.38-421.el8.x86_64.rpm        1.8 MB/s | 142 kB     00:00
    default: (12/46): perl-MIME-Base64-3.15-396.el8.x86_64.r 436 kB/s |  31 kB     00:00
    default: (13/46): perl-PathTools-3.74-1.el8.x86_64.rpm   1.2 MB/s |  90 kB     00:00
    default: (14/46): perl-Pod-Escapes-1.07-395.el8.noarch.r 294 kB/s |  20 kB     00:00
    default: (15/46): perl-Pod-Perldoc-3.28-396.el8.noarch.r 1.1 MB/s |  88 kB     00:00
    default: (16/46): perl-Pod-Simple-3.35-395.el8.noarch.rp 2.6 MB/s | 213 kB     00:00
    default: (17/46): perl-Pod-Usage-1.69-395.el8.noarch.rpm 430 kB/s |  34 kB     00:00
    default: (18/46): perl-Scalar-List-Utils-1.49-2.el8.x86_ 928 kB/s |  68 kB     00:00
    default: (19/46): perl-Socket-2.027-3.el8.x86_64.rpm     778 kB/s |  59 kB     00:00
    default: (20/46): perl-Storable-3.11-3.el8.x86_64.rpm    1.2 MB/s |  98 kB     00:00
    default: (21/46): perl-Term-ANSIColor-4.06-396.el8.noarc 663 kB/s |  46 kB     00:00
    default: (22/46): perl-Term-Cap-1.17-395.el8.noarch.rpm  329 kB/s |  23 kB     00:00
    default: (23/46): perl-Text-ParseWords-3.30-395.el8.noar 265 kB/s |  18 kB     00:00
    default: (24/46): perl-Text-Tabs+Wrap-2013.0523-395.el8. 344 kB/s |  24 kB     00:00
    default: (25/46): perl-Time-Local-1.280-1.el8.noarch.rpm 443 kB/s |  33 kB     00:00
    default: (26/46): perl-Unicode-Normalize-1.25-396.el8.x8 1.1 MB/s |  82 kB     00:00
    default: (27/46): perl-constant-1.33-396.el8.noarch.rpm  338 kB/s |  25 kB     00:00
    default: (28/46): perl-macros-5.26.3-421.el8.x86_64.rpm  712 kB/s |  72 kB     00:00
    default: (29/46): perl-parent-0.237-1.el8.noarch.rpm     168 kB/s |  20 kB     00:00
    default: (30/46): perl-podlators-4.11-1.el8.noarch.rpm   834 kB/s | 118 kB     00:00
    default: (31/46): perl-libs-5.26.3-421.el8.x86_64.rpm    3.7 MB/s | 1.6 MB     00:00
    default: (32/46): perl-interpreter-5.26.3-421.el8.x86_64  13 MB/s | 6.3 MB     00:00
    default: (33/46): perl-threads-2.21-2.el8.x86_64.rpm     683 kB/s |  61 kB     00:00
    default: (34/46): perl-threads-shared-1.58-2.el8.x86_64. 664 kB/s |  48 kB     00:00
    default: (35/46): python3-setuptools-39.2.0-6.el8.noarch 2.0 MB/s | 163 kB     00:00
    default: (36/46): perl-Digest-1.17-395.el8.noarch.rpm    340 kB/s |  27 kB     00:00
    default: (37/46): perl-Digest-MD5-2.55-396.el8.x86_64.rp 465 kB/s |  37 kB     00:00
    default: (38/46): perl-IO-Socket-IP-0.39-5.el8.noarch.rp 605 kB/s |  47 kB     00:00
    default: (39/46): perl-File-Slurp-9999.19-19.el8.noarch. 567 kB/s |  47 kB     00:00
    default: (40/46): perl-IO-Socket-SSL-2.066-4.module+el8. 3.5 MB/s | 298 kB     00:00
    default: (41/46): perl-Mozilla-CA-20160104-7.module+el8. 228 kB/s |  15 kB     00:00
    default: (42/46): perl-URI-1.73-3.el8.noarch.rpm         1.6 MB/s | 116 kB     00:00
    default: (43/46): perl-Net-SSLeay-1.88-2.module+el8.6.0+ 2.7 MB/s | 379 kB     00:00
    default: (44/46): perl-libnet-3.11-3.el8.noarch.rpm      1.5 MB/s | 121 kB     00:00
    default: (45/46): python3-pip-9.0.3-22.el8.noarch.rpm    291 kB/s |  20 kB     00:00
    default: (46/46): python36-3.6.8-38.module+el8.5.0+20329  84 kB/s |  19 kB     00:00
    default: --------------------------------------------------------------------------------
    default: Total                                           5.6 MB/s |  13 MB     00:02
    default: Running transaction check
    default: Transaction check succeeded.
    default: Running transaction test
    default: Transaction test succeeded.
    default: Running transaction
    default:   Preparing        :                                                        1/1
    default:   Installing       : perl-Digest-1.17-395.el8.noarch                       1/46
    default:   Installing       : perl-Digest-MD5-2.55-396.el8.x86_64                   2/46
    default:   Installing       : perl-Data-Dumper-2.167-399.el8.x86_64                 3/46
    default:   Installing       : perl-libnet-3.11-3.el8.noarch                         4/46
    default:   Installing       : perl-Net-SSLeay-1.88-2.module+el8.6.0+20623+f0897f    5/46
    default:   Installing       : perl-URI-1.73-3.el8.noarch                            6/46
    default:   Installing       : perl-Pod-Escapes-1:1.07-395.el8.noarch                7/46
    default:   Installing       : perl-Time-Local-1:1.280-1.el8.noarch                  8/46
    default:   Installing       : perl-IO-Socket-IP-0.39-5.el8.noarch                   9/46
    default:   Installing       : perl-Mozilla-CA-20160104-7.module+el8.3.0+7692+542   10/46
    default:   Installing       : perl-IO-Socket-SSL-2.066-4.module+el8.6.0+20623+f0   11/46
    default:   Installing       : perl-Term-ANSIColor-4.06-396.el8.noarch              12/46
    default:   Installing       : perl-Term-Cap-1.17-395.el8.noarch                    13/46
    default:   Installing       : perl-File-Temp-0.230.600-1.el8.noarch                14/46
    default:   Installing       : perl-Pod-Simple-1:3.35-395.el8.noarch                15/46
    default:   Installing       : perl-HTTP-Tiny-0.074-1.el8.noarch                    16/46
    default:   Installing       : perl-podlators-4.11-1.el8.noarch                     17/46
    default:   Installing       : perl-Pod-Perldoc-3.28-396.el8.noarch                 18/46
    default:   Installing       : perl-Text-ParseWords-3.30-395.el8.noarch             19/46
    default:   Installing       : perl-Pod-Usage-4:1.69-395.el8.noarch                 20/46
    default:   Installing       : perl-MIME-Base64-3.15-396.el8.x86_64                 21/46
    default:   Installing       : perl-Storable-1:3.11-3.el8.x86_64                    22/46
    default:   Installing       : perl-Getopt-Long-1:2.50-4.el8.noarch                 23/46
    default:   Installing       : perl-Errno-1.28-421.el8.x86_64                       24/46
    default:   Installing       : perl-Socket-4:2.027-3.el8.x86_64                     25/46
    default:   Installing       : perl-Encode-4:2.97-3.el8.x86_64                      26/46
    default:   Installing       : perl-Exporter-5.72-396.el8.noarch                    27/46
    default:   Installing       : perl-Scalar-List-Utils-3:1.49-2.el8.x86_64           28/46
    default:   Installing       : perl-macros-4:5.26.3-421.el8.x86_64                  29/46
    default:   Installing       : perl-parent-1:0.237-1.el8.noarch                     30/46
    default:   Installing       : perl-Text-Tabs+Wrap-2013.0523-395.el8.noarch         31/46
    default:   Installing       : perl-Unicode-Normalize-1.25-396.el8.x86_64           32/46
    default:   Installing       : perl-File-Path-2.15-2.el8.noarch                     33/46
    default:   Installing       : perl-IO-1.38-421.el8.x86_64                          34/46
    default:   Installing       : perl-PathTools-3.74-1.el8.x86_64                     35/46
    default:   Installing       : perl-constant-1.33-396.el8.noarch                    36/46
    default:   Installing       : perl-threads-1:2.21-2.el8.x86_64                     37/46
    default:   Installing       : perl-threads-shared-1.58-2.el8.x86_64                38/46
    default:   Installing       : perl-libs-4:5.26.3-421.el8.x86_64                    39/46
    default:   Installing       : perl-Carp-1.42-396.el8.noarch                        40/46
    default:   Installing       : perl-interpreter-4:5.26.3-421.el8.x86_64             41/46
    default:   Installing       : perl-File-Slurp-9999.19-19.el8.noarch                42/46
    default:   Installing       : python3-setuptools-39.2.0-6.el8.noarch               43/46
    default:   Installing       : python3-pip-9.0.3-22.el8.noarch                      44/46
    default:   Installing       : python36-3.6.8-38.module+el8.5.0+20329+5c5719bc.x8   45/46
    default:   Running scriptlet: python36-3.6.8-38.module+el8.5.0+20329+5c5719bc.x8   45/46
    default:   Installing       : rlwrap-0.46.1-1.el8.x86_64                           46/46
    default:   Running scriptlet: rlwrap-0.46.1-1.el8.x86_64                           46/46
    default:   Verifying        : rlwrap-0.46.1-1.el8.x86_64                            1/46
    default:   Verifying        : perl-Carp-1.42-396.el8.noarch                         2/46
    default:   Verifying        : perl-Data-Dumper-2.167-399.el8.x86_64                 3/46
    default:   Verifying        : perl-Encode-4:2.97-3.el8.x86_64                       4/46
    default:   Verifying        : perl-Errno-1.28-421.el8.x86_64                        5/46
    default:   Verifying        : perl-Exporter-5.72-396.el8.noarch                     6/46
    default:   Verifying        : perl-File-Path-2.15-2.el8.noarch                      7/46
    default:   Verifying        : perl-File-Temp-0.230.600-1.el8.noarch                 8/46
    default:   Verifying        : perl-Getopt-Long-1:2.50-4.el8.noarch                  9/46
    default:   Verifying        : perl-HTTP-Tiny-0.074-1.el8.noarch                    10/46
    default:   Verifying        : perl-IO-1.38-421.el8.x86_64                          11/46
    default:   Verifying        : perl-MIME-Base64-3.15-396.el8.x86_64                 12/46
    default:   Verifying        : perl-PathTools-3.74-1.el8.x86_64                     13/46
    default:   Verifying        : perl-Pod-Escapes-1:1.07-395.el8.noarch               14/46
    default:   Verifying        : perl-Pod-Perldoc-3.28-396.el8.noarch                 15/46
    default:   Verifying        : perl-Pod-Simple-1:3.35-395.el8.noarch                16/46
    default:   Verifying        : perl-Pod-Usage-4:1.69-395.el8.noarch                 17/46
    default:   Verifying        : perl-Scalar-List-Utils-3:1.49-2.el8.x86_64           18/46
    default:   Verifying        : perl-Socket-4:2.027-3.el8.x86_64                     19/46
    default:   Verifying        : perl-Storable-1:3.11-3.el8.x86_64                    20/46
    default:   Verifying        : perl-Term-ANSIColor-4.06-396.el8.noarch              21/46
    default:   Verifying        : perl-Term-Cap-1.17-395.el8.noarch                    22/46
    default:   Verifying        : perl-Text-ParseWords-3.30-395.el8.noarch             23/46
    default:   Verifying        : perl-Text-Tabs+Wrap-2013.0523-395.el8.noarch         24/46
    default:   Verifying        : perl-Time-Local-1:1.280-1.el8.noarch                 25/46
    default:   Verifying        : perl-Unicode-Normalize-1.25-396.el8.x86_64           26/46
    default:   Verifying        : perl-constant-1.33-396.el8.noarch                    27/46
    default:   Verifying        : perl-interpreter-4:5.26.3-421.el8.x86_64             28/46
    default:   Verifying        : perl-libs-4:5.26.3-421.el8.x86_64                    29/46
    default:   Verifying        : perl-macros-4:5.26.3-421.el8.x86_64                  30/46
    default:   Verifying        : perl-parent-1:0.237-1.el8.noarch                     31/46
    default:   Verifying        : perl-podlators-4.11-1.el8.noarch                     32/46
    default:   Verifying        : perl-threads-1:2.21-2.el8.x86_64                     33/46
    default:   Verifying        : perl-threads-shared-1.58-2.el8.x86_64                34/46
    default:   Verifying        : python3-setuptools-39.2.0-6.el8.noarch               35/46
    default:   Verifying        : perl-Digest-1.17-395.el8.noarch                      36/46
    default:   Verifying        : perl-Digest-MD5-2.55-396.el8.x86_64                  37/46
    default:   Verifying        : perl-File-Slurp-9999.19-19.el8.noarch                38/46
    default:   Verifying        : perl-IO-Socket-IP-0.39-5.el8.noarch                  39/46
    default:   Verifying        : perl-IO-Socket-SSL-2.066-4.module+el8.6.0+20623+f0   40/46
    default:   Verifying        : perl-Mozilla-CA-20160104-7.module+el8.3.0+7692+542   41/46
    default:   Verifying        : perl-Net-SSLeay-1.88-2.module+el8.6.0+20623+f0897f   42/46
    default:   Verifying        : perl-URI-1.73-3.el8.noarch                           43/46
    default:   Verifying        : perl-libnet-3.11-3.el8.noarch                        44/46
    default:   Verifying        : python3-pip-9.0.3-22.el8.noarch                      45/46
    default:   Verifying        : python36-3.6.8-38.module+el8.5.0+20329+5c5719bc.x8   46/46
    default: 
    default: Installed:
    default:   perl-Carp-1.42-396.el8.noarch
    default:   perl-Data-Dumper-2.167-399.el8.x86_64
    default:   perl-Digest-1.17-395.el8.noarch
    default:   perl-Digest-MD5-2.55-396.el8.x86_64
    default:   perl-Encode-4:2.97-3.el8.x86_64
    default:   perl-Errno-1.28-421.el8.x86_64
    default:   perl-Exporter-5.72-396.el8.noarch
    default:   perl-File-Path-2.15-2.el8.noarch
    default:   perl-File-Slurp-9999.19-19.el8.noarch
    default:   perl-File-Temp-0.230.600-1.el8.noarch
    default:   perl-Getopt-Long-1:2.50-4.el8.noarch
    default:   perl-HTTP-Tiny-0.074-1.el8.noarch
    default:   perl-IO-1.38-421.el8.x86_64
    default:   perl-IO-Socket-IP-0.39-5.el8.noarch
    default:   perl-IO-Socket-SSL-2.066-4.module+el8.6.0+20623+f0897f98.noarch
    default:   perl-MIME-Base64-3.15-396.el8.x86_64
    default:   perl-Mozilla-CA-20160104-7.module+el8.3.0+7692+542c56f9.noarch
    default:   perl-Net-SSLeay-1.88-2.module+el8.6.0+20623+f0897f98.x86_64
    default:   perl-PathTools-3.74-1.el8.x86_64
    default:   perl-Pod-Escapes-1:1.07-395.el8.noarch
    default:   perl-Pod-Perldoc-3.28-396.el8.noarch
    default:   perl-Pod-Simple-1:3.35-395.el8.noarch
    default:   perl-Pod-Usage-4:1.69-395.el8.noarch
    default:   perl-Scalar-List-Utils-3:1.49-2.el8.x86_64
    default:   perl-Socket-4:2.027-3.el8.x86_64
    default:   perl-Storable-1:3.11-3.el8.x86_64
    default:   perl-Term-ANSIColor-4.06-396.el8.noarch
    default:   perl-Term-Cap-1.17-395.el8.noarch
    default:   perl-Text-ParseWords-3.30-395.el8.noarch
    default:   perl-Text-Tabs+Wrap-2013.0523-395.el8.noarch
    default:   perl-Time-Local-1:1.280-1.el8.noarch
    default:   perl-URI-1.73-3.el8.noarch
    default:   perl-Unicode-Normalize-1.25-396.el8.x86_64
    default:   perl-constant-1.33-396.el8.noarch
    default:   perl-interpreter-4:5.26.3-421.el8.x86_64
    default:   perl-libnet-3.11-3.el8.noarch
    default:   perl-libs-4:5.26.3-421.el8.x86_64
    default:   perl-macros-4:5.26.3-421.el8.x86_64
    default:   perl-parent-1:0.237-1.el8.noarch
    default:   perl-podlators-4.11-1.el8.noarch
    default:   perl-threads-1:2.21-2.el8.x86_64
    default:   perl-threads-shared-1.58-2.el8.x86_64
    default:   python3-pip-9.0.3-22.el8.noarch
    default:   python3-setuptools-39.2.0-6.el8.noarch
    default:   python36-3.6.8-38.module+el8.5.0+20329+5c5719bc.x86_64
    default:   rlwrap-0.46.1-1.el8.x86_64
    default: 
    default: Complete!
    default: oracle-free-23c.service is not a native service, redirecting to systemd-sysv-install.
    default: Executing: /usr/lib/systemd/systemd-sysv-install enable oracle-free-23c
                                                #    -#O=- #    #                          
       #   #   #     #                                                  -=O=-              
    default: 
    default: SQL*Plus: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:14:13 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle.  All rights reserved.
    default: 
    default: Last Successful login time: Tue Apr 11 2023 03:09:06 +00:00
    default: 
    default: Connected to:
    default: Oracle Database 23c Free, Release 23.0.0.0.0 - Developer-Release
    default: Version 23.2.0.0.0
    default: 
    default: SQL>
    default: specify password for SYSTEM as parameter 1:
    default: 
    default: specify password for SYS as parameter 2:
    default: 
    default: specify password for HR as parameter 3:
    default: 
    default: specify password for OE as parameter 4:
    default: 
    default: specify password for PM as parameter 5:
    default: 
    default: specify password for IX as parameter 6:
    default: 
    default: specify password for  SH as parameter 7:
    default: 
    default: specify password for  BI as parameter 8:
    default: 
    default: specify default tablespace as parameter 9:
    default: 
    default: specify temporary tablespace as parameter 10:
    default: 
    default: specify log file directory (including trailing delimiter) as parameter 11:
    default: 
    default: specify connect string as parameter 12:
    default: 
    default: Sample Schemas are being created ...
    default: 
    default: 
    default: Connected.
    default: DROP USER hr CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'HR' does not exist
    default: 
    default: 
    default: DROP USER oe CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'OE' does not exist
    default: 
    default: 
    default: DROP USER pm CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'PM' does not exist
    default: 
    default: 
    default: DROP USER ix CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'IX' does not exist
    default: 
    default: 
    default: DROP USER sh CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'SH' does not exist
    default: 
    default: 
    default: DROP USER bi CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'BI' does not exist
    default: 
    default: 
    default: Connected.
    default: 
    default: specify password for HR as parameter 1:
    default: 
    default: specify default tablespeace for HR as parameter 2:
    default: 
    default: specify temporary tablespace for HR as parameter 3:
    default: 
    default: specify password for SYS as parameter 4:
    default: 
    default: specify log path as parameter 5:
    default: 
    default: specify connect string as parameter 6:
    default: 
    default: DROP USER hr CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'HR' does not exist
    default: 
    default: 
    default: 
    default: User created.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: 
    default: Session altered.
    default: 
    default: 
    default: Session altered.
    default: 
    default: ******  Creating REGIONS table ....
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: ******  Creating COUNTRIES table ....
    default: 
    default: Table created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: ******  Creating LOCATIONS table ....
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Sequence created.
    default: 
    default: ******  Creating DEPARTMENTS table ....
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Sequence created.
    default: 
    default: ******  Creating JOBS table ....
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: ******  Creating EMPLOYEES table ....
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Sequence created.
    default: 
    default: ******  Creating JOB_HISTORY table ....
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: ******  Creating EMP_DETAILS_VIEW view ...
    default: 
    default: View created.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: Session altered.
    default: 
    default: ******  Populating REGIONS table ....
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: ******  Populating COUNTIRES table ....
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: ******  Populating LOCATIONS table ....
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: ******  Populating DEPARTMENTS table ....
    default: 
    default: Table altered.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: ******  Populating JOBS table ....
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: ******  Populating EMPLOYEES table ....
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: ******  Populating JOB_HISTORY table ....
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: Procedure created.
    default: 
    default: 
    default: Trigger created.
    default: 
    default: 
    default: Trigger altered.
    default: 
    default: 
    default: Procedure created.
    default: 
    default: 
    default: Trigger created.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: Connected.
    default: 
    default: specify password for OE as parameter 1:
    default: 
    default: specify default tablespeace for OE as parameter 2:
    default: 
    default: specify temporary tablespace for OE as parameter 3:
    default: 
    default: specify password for HR as parameter 4:
    default: 
    default: specify password for SYS as parameter 5:
    default: 
    default: specify directory path for the data files as parameter 6:
    default: 
    default: writeable directory path for the log files as parameter 7:
    default: 
    default: specify version as parameter 8:
    default: 
    default: specify connect string as parameter 9:
    default: 
    default: DROP USER oe CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'OE' does not exist
    default: 
    default: 
    default: 
    default: User created.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: 
    default: Session altered.
    default: 
    default: 
    default: Session altered.
    default: 
    default: 
    default: specify Sample Schema version as parameter 1:
    default: 
    default: specify password for OE as parameter 2:
    default: 
    default: PROMPT password for SYS as parameter 3:
    default: 
    default: specify connect string as parameter 4:
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Trigger created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Sequence created.
    default: 
    default: 
    default: specify password for OE as parameter 1:
    default: 
    default: PROMPT password for SYS as parameter 2:
    default: 
    default: specify connect string as parameter 3:
    default: 
    default: Connected.
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Session altered.
    default: 
    default: 
    default: Package created.
    default: 
    default: 
    default: Warning: Package Body created with compilation errors.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: Package altered.
    default: 
    default: 
    default: View altered.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Trigger created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Call completed.
    default: 
    default: 
    default: Session altered.
    default: 
    default: 
    default: Session altered.
    default: 
    default: 
    default: Package created.
    default: 
    default: 
    default: no rows selected
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Package created.
    default: 
    default: 
    default: no rows selected
    default: 
    default: 
    default: Package body created.
    default: 
    default: 
    default: no rows selected
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Package created.
    default: 
    default: 
    default: no rows selected
    default: 
    default: 
    default: Package body created.
    default: 
    default: 
    default: no rows selected
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Package created.
    default: 
    default: 
    default: no rows selected
    default: 
    default: 
    default: Package body created.
    default: 
    default: 
    default: no rows selected
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: specify password for OE as parameter 1:
    default: 
    default: PROMPT password for SYS as parameter 2:
    default: 
    default: specify connect string as parameter 3:
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: Connected.
    default: DROP DIRECTORY SS_OE_XMLDIR
    default: *
    default: ERROR at line 1:
    default: ORA-04043: Object SS_OE_XMLDIR does not exist.
    default: 
    default: 
    default: 
    default: Directory created.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: Connected.
    default: 
    default: Revoke succeeded.
    default: 
    default: Connected.
    default: Connected.
    default: 
    default: Session altered.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: Call completed.
    default: 
    default: 
    default: Call completed.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: Connected.
    default: 
    default: Revoke succeeded.
    default: 
    default: Connected.
    default: Connected.
    default: 
    default: Revoke succeeded.
    default: 
    default: 
    default: Revoke succeeded.
    default: 
    default: 
    default: Revoke succeeded.
    default: 
    default: 
    default: Package dropped.
    default: 
    default: 
    default: Package dropped.
    default: 
    default: 
    default: Package dropped.
    default: 
    default: 
    default: Package dropped.
    default: 
    default: 
    default: Package dropped.
    default: 
    default: 
    default: Trigger dropped.
    default: 
    default: 
    default: View dropped.
    default: 
    default: Connected.
    default: 
    default: Commit complete.
    default: 
    default: 
    default: specify Sample Schema version as parameter 1:
    default: 
    default: specify location for data and control files as parameter 2:
    default: 
    default: specify location for log files as parameter 3:
    default: 
    default: specify password for oe as parameter 4:
    default: 
    default: Setting FEEDBACK OFF for inserts
    default: 
    default: Setting FEEDBACK ON
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Session altered.
    default: 
    default: 
    default: Session altered.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: Function created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Session altered.
    default: 
    default: ...creating subschema OC in OE
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type body created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type body created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type body created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: Trigger created.
    default: 
    default: 
    default: Trigger created.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: 1 row created.
    default: 
    default: 
    default: Type altered.
    default: 
    default: 
    default: 3 rows updated.
    default: 
    default: 
    default: 8 rows updated.
    default: 
    default: 
    default: 6 rows updated.
    default: 
    default: 
    default: 4 rows updated.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: Type body altered.
    default: 
    default: 
    default: Type body altered.
    default: 
    default: 
    default: Type body altered.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: Connected.
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: Connected.
    default: 
    default: specify password for PM as parameter 1:
    default: 
    default: specify default tablespeace for PM as parameter 2:
    default: 
    default: specify temporary tablespace for PM as parameter 3:
    default: 
    default: specify password for OE as parameter 4:
    default: 
    default: specify password for SYS as parameter 5:
    default: 
    default: specify directory path for the PM data files as parameter 6:
    default: 
    default: specify directory path for the PM load log files as parameter 7:
    default: 
    default: specify work directory path as parameter 8:
    default: 
    default: specify connect string as parameter 9:
    default: 
    default: DROP USER pm CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'PM' does not exist
    default: 
    default: 
    default: 
    default: User created.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Directory created.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: 
    default: Session altered.
    default: 
    default: 
    default: Session altered.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Type created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: SQL*Loader: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:16:45 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
    default: 
    default: Path used:      Conventional
    default: Commit point reached - logical record count 15
    default: Commit point reached - logical record count 16
    default: 
    default: Table PRINT_MEDIA:
    default:   4 Rows successfully loaded.
    default: 
    default: Table TEXTDOCS_NESTEDTAB:
    default:   12 Rows successfully loaded.
    default: 
    default: Check the log file:
    default:   /tmp/tmp.vA7KvKRnru/log/pm_p_lob.log
    default: for more information about the load.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: Connected.
    default: 
    default: specify password for IX as parameter 1:
    default: 
    default: specify default tablespeace for IX as parameter 2:
    default: 
    default: specify temporary tablespace for IX as parameter 3:
    default: 
    default: specify password for SYS as parameter 4:
    default: 
    default: specify path for log files as parameter 5:
    default: 
    default: specify version as parameter 6:
    default: 
    default: specify connect string as parameter 7:
    default: 
    default: dropping user ...
    default: DROP USER ix CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'IX' does not exist
    default: 
    default: 
    default: creating user ...
    default: 
    default: 
    default: User created.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: Granting Streams privileges, vrs=v3 ...
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: setting job_queue_processes and aq_tm_processes ...
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: Connected.
    default: 
    default: Type created.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: Connected.
    default: 
    default: Session altered.
    default: 
    default: 
    default: Session altered.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: QUEUE           MSG_STATE       CONSUMER_NAME   USER_DATA(ORDER_ID, PRODUCT_ID, CUSTOMER_ID, CUST_FIRST_NAME
    default: --------------- --------------- --------------- ------------------------------------------------------------
    default: ORDERS_QUEUE    READY           BILLING         ORDER_EVENT_TYP(2458, 3117, 101, 'Constantin', 'Welles', 0,
    default:                                                 '12-DEC-02')
    default: 
    default: ORDERS_QUEUE    READY           SHIPPING        ORDER_EVENT_TYP(2458, 3117, 101, 'Constantin', 'Welles', 0,
    default:                                                 '12-DEC-02')
    default: 
    default: 
    default: 2 rows selected.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: QUEUE           MSG_STATE       CONSUMER_NAME   USER_DATA(ORDER_ID, PRODUCT_ID, CUSTOMER_ID, CUST_FIRST_NAME
    default: --------------- --------------- --------------- ------------------------------------------------------------
    default: ORDERS_QUEUE    READY           BILLING         ORDER_EVENT_TYP(2458, 3117, 101, 'Constantin', 'Welles', 0,
    default:                                                 '12-DEC-02')
    default: 
    default: ORDERS_QUEUE    PROCESSED       SHIPPING        ORDER_EVENT_TYP(2458, 3117, 101, 'Constantin', 'Welles', 0,
    default:                                                 '12-DEC-02')
    default: 
    default: 
    default: 2 rows selected.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: QUEUE           MSG_STATE       CONSUMER_NAME   USER_DATA(ORDER_ID, PRODUCT_ID, CUSTOMER_ID, CUST_FIRST_NAME
    default: --------------- --------------- --------------- ------------------------------------------------------------
    default: ORDERS_QUEUE    PROCESSED       BILLING         ORDER_EVENT_TYP(2458, 3117, 101, 'Constantin', 'Welles', 0,
    default:                                                 '12-DEC-02')
    default: 
    default: ORDERS_QUEUE    PROCESSED       SHIPPING        ORDER_EVENT_TYP(2458, 3117, 101, 'Constantin', 'Welles', 0,
    default:                                                 '12-DEC-02')
    default: 
    default: 
    default: 2 rows selected.
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: 
    default: OBJECT_TYPE          OBJECT_NAME                    STATUS
    default: -------------------- ------------------------------ -------
    default: EVALUATION CONTEXT   AQ$_ORDERS_QUEUETABLE_V        VALID
    default: EVALUATION CONTEXT   AQ$_STREAMS_QUEUE_TABLE_V      VALID
    default: INDEX                AQ$_STREAMS_QUEUE_TABLE_Y      VALID
    default: INDEX                SYS_C008303                    VALID
    default: INDEX                SYS_C008306                    VALID
    default: INDEX                SYS_C008315                    VALID
    default: INDEX                SYS_C008318                    VALID
    default: INDEX                SYS_IL0000078086C00036$$       VALID
    default: INDEX                SYS_IL0000078113C00028$$       VALID
    default: INDEX                SYS_IL0000078113C00029$$       VALID
    default: INDEX                SYS_IOT_TOP_78095              VALID
    default: INDEX                SYS_IOT_TOP_78097              VALID
    default: INDEX                SYS_IOT_TOP_78100              VALID
    default: INDEX                SYS_IOT_TOP_78103              VALID
    default: INDEX                SYS_IOT_TOP_78124              VALID
    default: INDEX                SYS_IOT_TOP_78126              VALID
    default: INDEX                SYS_IOT_TOP_78129              VALID
    default: INDEX                SYS_IOT_TOP_78132              VALID
    default: INDEX                SYS_IOT_TOP_78134              VALID
    default: LOB                  SYS_LOB0000078086C00036$$      VALID
    default: LOB                  SYS_LOB0000078113C00028$$      VALID
    default: LOB                  SYS_LOB0000078113C00029$$      VALID
    default: QUEUE                AQ$_ORDERS_QUEUETABLE_E        VALID
    default: QUEUE                AQ$_STREAMS_QUEUE_TABLE_E      VALID
    default: QUEUE                ORDERS_QUEUE                   VALID
    default: QUEUE                STREAMS_QUEUE                  VALID
    default: RULE SET             ORDERS_QUEUE_N                 VALID
    default: RULE SET             ORDERS_QUEUE_R                 VALID
    default: RULE SET             STREAMS_QUEUE_N                VALID
    default: RULE SET             STREAMS_QUEUE_R                VALID
    default: SEQUENCE             AQ$_ORDERS_QUEUETABLE_N        VALID
    default: SEQUENCE             AQ$_STREAMS_QUEUE_TABLE_N      VALID
    default: TABLE                AQ$_ORDERS_QUEUETABLE_G        VALID
    default: TABLE                AQ$_ORDERS_QUEUETABLE_H        VALID
    default: TABLE                AQ$_ORDERS_QUEUETABLE_I        VALID
    default: TABLE                AQ$_ORDERS_QUEUETABLE_L        VALID
    default: TABLE                AQ$_ORDERS_QUEUETABLE_S        VALID
    default: TABLE                AQ$_ORDERS_QUEUETABLE_T        VALID
    default: TABLE                AQ$_STREAMS_QUEUE_TABLE_C      VALID
    default: TABLE                AQ$_STREAMS_QUEUE_TABLE_G      VALID
    default: TABLE                AQ$_STREAMS_QUEUE_TABLE_H      VALID
    default: TABLE                AQ$_STREAMS_QUEUE_TABLE_I      VALID
    default: TABLE                AQ$_STREAMS_QUEUE_TABLE_L      VALID
    default: TABLE                AQ$_STREAMS_QUEUE_TABLE_S      VALID
    default: TABLE                AQ$_STREAMS_QUEUE_TABLE_T      VALID
    default: TABLE                ORDERS_QUEUETABLE              VALID
    default: TABLE                STREAMS_QUEUE_TABLE            VALID
    default: TABLE                SYS_IOT_OVER_78100             VALID
    default: TABLE                SYS_IOT_OVER_78129             VALID
    default: TYPE                 ORDER_EVENT_TYP                VALID
    default: VIEW                 AQ$ORDERS_QUEUETABLE           VALID
    default: VIEW                 AQ$ORDERS_QUEUETABLE_R         VALID
    default: VIEW                 AQ$ORDERS_QUEUETABLE_S         VALID
    default: VIEW                 AQ$STREAMS_QUEUE_TABLE         VALID
    default: VIEW                 AQ$STREAMS_QUEUE_TABLE_R       VALID
    default: VIEW                 AQ$STREAMS_QUEUE_TABLE_S       VALID
    default: VIEW                 AQ$_ORDERS_QUEUETABLE_F        VALID
    default: VIEW                 AQ$_STREAMS_QUEUE_TABLE_F      VALID
    default: 
    default: 58 rows selected.
    default: 
    default: 
    default: OBJECT_TYPE          STATUS    COUNT(*)
    default: -------------------- ------- ----------
    default: EVALUATION CONTEXT   VALID            2
    default: INDEX                VALID           17
    default: LOB                  VALID            3
    default: QUEUE                VALID            4
    default: RULE SET             VALID            4
    default: SEQUENCE             VALID            2
    default: TABLE                VALID           17
    default: TYPE                 VALID            1
    default: VIEW                 VALID            8
    default: 
    default: 9 rows selected.
    default: 
    default: Connected.
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: Connected.
    default: 
    default: specify password for SH as parameter 1:
    default: 
    default: specify default tablespace for SH as parameter 2:
    default: 
    default: specify temporary tablespace for SH as parameter 3:
    default: 
    default: specify password for SYS as parameter 4:
    default: 
    default: specify directory path for the data files as parameter 5:
    default: 
    default: writeable directory path for the log files as parameter 6:
    default: 
    default: specify version as parameter 7:
    default: 
    default: specify connect string as parameter 8:
    default: 
    default: 
    default: Session altered.
    default: 
    default: DROP USER sh CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'SH' does not exist
    default: 
    default: 
    default: 
    default: User created.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Directory created.
    default: 
    default: 
    default: Directory created.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: Connected.
    default: 
    default: Session altered.
    default: 
    default: 
    default: Session altered.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Creating constraints ...
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: specify password for SH as parameter 1:
    default: 
    default: specify path for data files as parameter 2:
    default: 
    default: specify path for log files as parameter 3:
    default: 
    default: specify version as parameter 4:
    default: 
    default: specify connect string as parameter 5:
    default: 
    default: Looking for indexes that could slow down load ...
    default: 
    default: no rows selected
    default: 
    default: 
    default: loading TIMES using:
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/time_v3.ctl
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/time_v3.dat
    default: /tmp/tmp.vA7KvKRnru/log/time_v3.log
    default: 
    default: SQL*Loader: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:17:04 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
    default: 
    default: Path used:      Direct
    default: Save data point reached - logical record count 1000.
    default: 
    default: Load completed - logical record count 1826.
    default: 
    default: Table TIMES:
    default:   1826 Rows successfully loaded.
    default: 
    default: Check the log file:
    default:   /tmp/tmp.vA7KvKRnru/log/time_v3.log
    default: for more information about the load.
    default: 
    default: 
    default: loading COUNTRIES using:
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/coun_v3.ctl
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/coun_v3.dat
    default: /tmp/tmp.vA7KvKRnru/log/coun_v3.log
    default: 
    default: SQL*Loader: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:17:06 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
    default: 
    default: Path used:      Direct
    default: 
    default: Load completed - logical record count 23.
    default: 
    default: Table COUNTRIES:
    default:   23 Rows successfully loaded.
    default: 
    default: Check the log file:
    default:   /tmp/tmp.vA7KvKRnru/log/coun_v3.log
    default: for more information about the load.
    default: 
    default: 
    default: loading CUSTOMERS using:
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/cust_v3.ctl
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/cust1v3.dat
    default: /tmp/tmp.vA7KvKRnru/log/cust1v3.log
    default: 
    default: SQL*Loader: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:17:09 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
    default: 
    default: Path used:      Direct
    default: Save data point reached - logical record count 10000.
    default: Save data point reached - logical record count 20000.
    default: Save data point reached - logical record count 30000.
    default: Save data point reached - logical record count 40000.
    default: Save data point reached - logical record count 50000.
    default: 
    default: Load completed - logical record count 55500.
    default: 
    default: Table CUSTOMERS:
    default:   55500 Rows successfully loaded.
    default: 
    default: Check the log file:
    default:   /tmp/tmp.vA7KvKRnru/log/cust1v3.log
    default: for more information about the load.
    default: 
    default: 
    default: loading PRODUCTS  using:
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/prod_v3.ctl
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/prod1v3.dat
    default: /tmp/tmp.vA7KvKRnru/log/prod1v3.log
    default: 
    default: SQL*Loader: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:17:11 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
    default: 
    default: Path used:      Direct
    default: 
    default: Load completed - logical record count 72.
    default: 
    default: Table PRODUCTS:
    default:   72 Rows successfully loaded.
    default: 
    default: Check the log file:
    default:   /tmp/tmp.vA7KvKRnru/log/prod1v3.log
    default: for more information about the load.
    default: 
    default: 
    default: loading PROMOTIONS  using:
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/prom_v3.ctl
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/prom1v3.dat
    default: /tmp/tmp.vA7KvKRnru/log/prom1v3.log
    default: 
    default: SQL*Loader: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:17:14 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
    default: 
    default: Path used:      Direct
    default: Save data point reached - logical record count 10.
    default: Save data point reached - logical record count 20.
    default: Save data point reached - logical record count 30.
    default: Save data point reached - logical record count 40.
    default: Save data point reached - logical record count 50.
    default: Save data point reached - logical record count 60.
    default: Save data point reached - logical record count 70.
    default: Save data point reached - logical record count 80.
    default: Save data point reached - logical record count 90.
    default: Save data point reached - logical record count 100.
    default: Save data point reached - logical record count 110.
    default: Save data point reached - logical record count 120.
    default: Save data point reached - logical record count 130.
    default: Save data point reached - logical record count 140.
    default: Save data point reached - logical record count 150.
    default: Save data point reached - logical record count 160.
    default: Save data point reached - logical record count 170.
    default: Save data point reached - logical record count 180.
    default: Save data point reached - logical record count 190.
    default: Save data point reached - logical record count 200.
    default: Save data point reached - logical record count 210.
    default: Save data point reached - logical record count 220.
    default: Save data point reached - logical record count 230.
    default: Save data point reached - logical record count 240.
    default: Save data point reached - logical record count 250.
    default: Save data point reached - logical record count 260.
    default: Save data point reached - logical record count 270.
    default: Save data point reached - logical record count 280.
    default: Save data point reached - logical record count 290.
    default: Save data point reached - logical record count 300.
    default: Save data point reached - logical record count 310.
    default: Save data point reached - logical record count 320.
    default: Save data point reached - logical record count 330.
    default: Save data point reached - logical record count 340.
    default: Save data point reached - logical record count 350.
    default: Save data point reached - logical record count 360.
    default: Save data point reached - logical record count 370.
    default: Save data point reached - logical record count 380.
    default: Save data point reached - logical record count 390.
    default: Save data point reached - logical record count 400.
    default: Save data point reached - logical record count 410.
    default: Save data point reached - logical record count 420.
    default: Save data point reached - logical record count 430.
    default: Save data point reached - logical record count 440.
    default: Save data point reached - logical record count 450.
    default: Save data point reached - logical record count 460.
    default: Save data point reached - logical record count 470.
    default: Save data point reached - logical record count 480.
    default: Save data point reached - logical record count 490.
    default: Save data point reached - logical record count 500.
    default: 
    default: Load completed - logical record count 503.
    default: 
    default: Table PROMOTIONS:
    default:   503 Rows successfully loaded.
    default: 
    default: Check the log file:
    default:   /tmp/tmp.vA7KvKRnru/log/prom1v3.log
    default: for more information about the load.
    default: 
    default: 
    default: loading CHANNELS using:
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/chan_v3.ctl
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/chan_v3.dat
    default: /tmp/tmp.vA7KvKRnru/log/chan_v3.log
    default: 
    default: SQL*Loader: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:17:16 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
    default: 
    default: Path used:      Direct
    default: 
    default: Load completed - logical record count 5.
    default: 
    default: Table CHANNELS:
    default:   5 Rows successfully loaded.
    default: 
    default: Check the log file:
    default:   /tmp/tmp.vA7KvKRnru/log/chan_v3.log
    default: for more information about the load.
    default: 
    default: 
    default: loading SALES  using:
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/sale_v3.ctl
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/sale1v3.dat
    default: /tmp/tmp.vA7KvKRnru/log/sale1v3.log
    default: 
    default: SQL*Loader: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:17:18 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
    default: 
    default: Path used:      Direct
    default: Save data point reached - logical record count 100000.
    default: Save data point reached - logical record count 200000.
    default: Save data point reached - logical record count 300000.
    default: Save data point reached - logical record count 400000.
    default: Save data point reached - logical record count 500000.
    default: Save data point reached - logical record count 600000.
    default: Save data point reached - logical record count 700000.
    default: Save data point reached - logical record count 800000.
    default: Save data point reached - logical record count 900000.
    default: 
    default: Load completed - logical record count 916039.
    default: 
    default: Table SALES:
    default:   916039 Rows successfully loaded.
    default: 
    default: Check the log file:
    default:   /tmp/tmp.vA7KvKRnru/log/sale1v3.log
    default: for more information about the load.
    default: 
    default: 
    default: loading COSTS using external table
    default: 
    default: 
    default: Table created.
    default: 
    default: INSERT /*+ append */ INTO costs
    default: *
    default: ERROR at line 1:
    default: ORA-29913: error while processing ODCIEXTTABLEOPEN routine
    default: ORA-29400: data cartridge error
    default: KUP-04005: error while accessing file /tmp/tmp.vA7KvKRnru/log/ext_1v3.log
    default: 
    default: 
    default: 
    default: loading additonal SALES using:
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/dmsal_v3.ctl
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/dmsal_v3.dat
    default: /tmp/tmp.vA7KvKRnru/log/dmsal_v3.log
    default: 
    default: SQL*Loader: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:17:26 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
    default: 
    default: Path used:      Direct
    default: Save data point reached - logical record count 100.
    default: Save data point reached - logical record count 200.
    default: Save data point reached - logical record count 300.
    default: Save data point reached - logical record count 400.
    default: Save data point reached - logical record count 500.
    default: Save data point reached - logical record count 600.
    default: Save data point reached - logical record count 700.
    default: Save data point reached - logical record count 800.
    default: Save data point reached - logical record count 900.
    default: Save data point reached - logical record count 1000.
    default: Save data point reached - logical record count 1100.
    default: Save data point reached - logical record count 1200.
    default: Save data point reached - logical record count 1300.
    default: Save data point reached - logical record count 1400.
    default: Save data point reached - logical record count 1500.
    default: Save data point reached - logical record count 1600.
    default: Save data point reached - logical record count 1700.
    default: Save data point reached - logical record count 1800.
    default: Save data point reached - logical record count 1900.
    default: Save data point reached - logical record count 2000.
    default: Save data point reached - logical record count 2100.
    default: Save data point reached - logical record count 2200.
    default: Save data point reached - logical record count 2300.
    default: Save data point reached - logical record count 2400.
    default: Save data point reached - logical record count 2500.
    default: Save data point reached - logical record count 2600.
    default: Save data point reached - logical record count 2700.
    default: Save data point reached - logical record count 2800.
    default: 
    default: Load completed - logical record count 2804.
    default: 
    default: Table SALES:
    default:   2804 Rows successfully loaded.
    default: 
    default: Check the log file:
    default:   /tmp/tmp.vA7KvKRnru/log/dmsal_v3.log
    default: for more information about the load.
    default: 
    default: 
    default: loading SUPPLEMENTARY DEMOGRAPHICS using:
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/dem_v3.ctl
    default: /tmp/tmp.vA7KvKRnru/db-sample-schemas-21.1/sales_history/dem1v3.dat
    default: /tmp/tmp.vA7KvKRnru/log/dem1v3.log
    default: 
    default: SQL*Loader: Release 23.0.0.0.0 - Developer-Release on Tue Apr 11 03:17:30 2023
    default: Version 23.2.0.0.0
    default: 
    default: Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.
    default: 
    default: Path used:      Direct
    default: Save data point reached - logical record count 10.
    default: Save data point reached - logical record count 20.
    default: Save data point reached - logical record count 30.
    default: Save data point reached - logical record count 40.
    default: Save data point reached - logical record count 50.
    default: Save data point reached - logical record count 60.
    default: Save data point reached - logical record count 70.
    default: Save data point reached - logical record count 80.
    default: Save data point reached - logical record count 90.
    default: Save data point reached - logical record count 100.
    default: Save data point reached - logical record count 110.
    default: Save data point reached - logical record count 120.
    default: Save data point reached - logical record count 130.
    default: Save data point reached - logical record count 140.
    default: Save data point reached - logical record count 150.
    default: Save data point reached - logical record count 160.
    default: Save data point reached - logical record count 170.
    default: Save data point reached - logical record count 180.
    default: Save data point reached - logical record count 190.
    default: Save data point reached - logical record count 200.
    default: Save data point reached - logical record count 210.
    default: Save data point reached - logical record count 220.
    default: Save data point reached - logical record count 230.
    default: Save data point reached - logical record count 240.
    default: Save data point reached - logical record count 250.
    default: Save data point reached - logical record count 260.
    default: Save data point reached - logical record count 270.
    default: Save data point reached - logical record count 280.
    default: Save data point reached - logical record count 290.
    default: Save data point reached - logical record count 300.
    default: Save data point reached - logical record count 310.
    default: Save data point reached - logical record count 320.
    default: Save data point reached - logical record count 330.
    default: Save data point reached - logical record count 340.
    default: Save data point reached - logical record count 350.
    default: Save data point reached - logical record count 360.
    default: Save data point reached - logical record count 370.
    default: Save data point reached - logical record count 380.
    default: Save data point reached - logical record count 390.
    default: Save data point reached - logical record count 400.
    default: Save data point reached - logical record count 410.
    default: Save data point reached - logical record count 420.
    default: Save data point reached - logical record count 430.
    default: Save data point reached - logical record count 440.
    default: Save data point reached - logical record count 450.
    default: Save data point reached - logical record count 460.
    default: Save data point reached - logical record count 470.
    default: Save data point reached - logical record count 480.
    default: Save data point reached - logical record count 490.
    default: Save data point reached - logical record count 500.
    default: Save data point reached - logical record count 510.
    default: Save data point reached - logical record count 520.
    default: Save data point reached - logical record count 530.
    default: Save data point reached - logical record count 540.
    default: Save data point reached - logical record count 550.
    default: Save data point reached - logical record count 560.
    default: Save data point reached - logical record count 570.
    default: Save data point reached - logical record count 580.
    default: Save data point reached - logical record count 590.
    default: Save data point reached - logical record count 600.
    default: Save data point reached - logical record count 610.
    default: Save data point reached - logical record count 620.
    default: Save data point reached - logical record count 630.
    default: Save data point reached - logical record count 640.
    default: Save data point reached - logical record count 650.
    default: Save data point reached - logical record count 660.
    default: Save data point reached - logical record count 670.
    default: Save data point reached - logical record count 680.
    default: Save data point reached - logical record count 690.
    default: Save data point reached - logical record count 700.
    default: Save data point reached - logical record count 710.
    default: Save data point reached - logical record count 720.
    default: Save data point reached - logical record count 730.
    default: Save data point reached - logical record count 740.
    default: Save data point reached - logical record count 750.
    default: Save data point reached - logical record count 760.
    default: Save data point reached - logical record count 770.
    default: Save data point reached - logical record count 780.
    default: Save data point reached - logical record count 790.
    default: Save data point reached - logical record count 800.
    default: Save data point reached - logical record count 810.
    default: Save data point reached - logical record count 820.
    default: Save data point reached - logical record count 830.
    default: Save data point reached - logical record count 840.
    default: Save data point reached - logical record count 850.
    default: Save data point reached - logical record count 860.
    default: Save data point reached - logical record count 870.
    default: Save data point reached - logical record count 880.
    default: Save data point reached - logical record count 890.
    default: Save data point reached - logical record count 900.
    default: Save data point reached - logical record count 910.
    default: Save data point reached - logical record count 920.
    default: Save data point reached - logical record count 930.
    default: Save data point reached - logical record count 940.
    default: Save data point reached - logical record count 950.
    default: Save data point reached - logical record count 960.
    default: Save data point reached - logical record count 970.
    default: Save data point reached - logical record count 980.
    default: Save data point reached - logical record count 990.
    default: Save data point reached - logical record count 1000.
    default: Save data point reached - logical record count 1010.
    default: Save data point reached - logical record count 1020.
    default: Save data point reached - logical record count 1030.
    default: Save data point reached - logical record count 1040.
    default: Save data point reached - logical record count 1050.
    default: Save data point reached - logical record count 1060.
    default: Save data point reached - logical record count 1070.
    default: Save data point reached - logical record count 1080.
    default: Save data point reached - logical record count 1090.
    default: Save data point reached - logical record count 1100.
    default: Save data point reached - logical record count 1110.
    default: Save data point reached - logical record count 1120.
    default: Save data point reached - logical record count 1130.
    default: Save data point reached - logical record count 1140.
    default: Save data point reached - logical record count 1150.
    default: Save data point reached - logical record count 1160.
    default: Save data point reached - logical record count 1170.
    default: Save data point reached - logical record count 1180.
    default: Save data point reached - logical record count 1190.
    default: Save data point reached - logical record count 1200.
    default: Save data point reached - logical record count 1210.
    default: Save data point reached - logical record count 1220.
    default: Save data point reached - logical record count 1230.
    default: Save data point reached - logical record count 1240.
    default: Save data point reached - logical record count 1250.
    default: Save data point reached - logical record count 1260.
    default: Save data point reached - logical record count 1270.
    default: Save data point reached - logical record count 1280.
    default: Save data point reached - logical record count 1290.
    default: Save data point reached - logical record count 1300.
    default: Save data point reached - logical record count 1310.
    default: Save data point reached - logical record count 1320.
    default: Save data point reached - logical record count 1330.
    default: Save data point reached - logical record count 1340.
    default: Save data point reached - logical record count 1350.
    default: Save data point reached - logical record count 1360.
    default: Save data point reached - logical record count 1370.
    default: Save data point reached - logical record count 1380.
    default: Save data point reached - logical record count 1390.
    default: Save data point reached - logical record count 1400.
    default: Save data point reached - logical record count 1410.
    default: Save data point reached - logical record count 1420.
    default: Save data point reached - logical record count 1430.
    default: Save data point reached - logical record count 1440.
    default: Save data point reached - logical record count 1450.
    default: Save data point reached - logical record count 1460.
    default: Save data point reached - logical record count 1470.
    default: Save data point reached - logical record count 1480.
    default: Save data point reached - logical record count 1490.
    default: Save data point reached - logical record count 1500.
    default: Save data point reached - logical record count 1510.
    default: Save data point reached - logical record count 1520.
    default: Save data point reached - logical record count 1530.
    default: Save data point reached - logical record count 1540.
    default: Save data point reached - logical record count 1550.
    default: Save data point reached - logical record count 1560.
    default: Save data point reached - logical record count 1570.
    default: Save data point reached - logical record count 1580.
    default: Save data point reached - logical record count 1590.
    default: Save data point reached - logical record count 1600.
    default: Save data point reached - logical record count 1610.
    default: Save data point reached - logical record count 1620.
    default: Save data point reached - logical record count 1630.
    default: Save data point reached - logical record count 1640.
    default: Save data point reached - logical record count 1650.
    default: Save data point reached - logical record count 1660.
    default: Save data point reached - logical record count 1670.
    default: Save data point reached - logical record count 1680.
    default: Save data point reached - logical record count 1690.
    default: Save data point reached - logical record count 1700.
    default: Save data point reached - logical record count 1710.
    default: Save data point reached - logical record count 1720.
    default: Save data point reached - logical record count 1730.
    default: Save data point reached - logical record count 1740.
    default: Save data point reached - logical record count 1750.
    default: Save data point reached - logical record count 1760.
    default: Save data point reached - logical record count 1770.
    default: Save data point reached - logical record count 1780.
    default: Save data point reached - logical record count 1790.
    default: Save data point reached - logical record count 1800.
    default: Save data point reached - logical record count 1810.
    default: Save data point reached - logical record count 1820.
    default: Save data point reached - logical record count 1830.
    default: Save data point reached - logical record count 1840.
    default: Save data point reached - logical record count 1850.
    default: Save data point reached - logical record count 1860.
    default: Save data point reached - logical record count 1870.
    default: Save data point reached - logical record count 1880.
    default: Save data point reached - logical record count 1890.
    default: Save data point reached - logical record count 1900.
    default: Save data point reached - logical record count 1910.
    default: Save data point reached - logical record count 1920.
    default: Save data point reached - logical record count 1930.
    default: Save data point reached - logical record count 1940.
    default: Save data point reached - logical record count 1950.
    default: Save data point reached - logical record count 1960.
    default: Save data point reached - logical record count 1970.
    default: Save data point reached - logical record count 1980.
    default: Save data point reached - logical record count 1990.
    default: Save data point reached - logical record count 2000.
    default: Save data point reached - logical record count 2010.
    default: Save data point reached - logical record count 2020.
    default: Save data point reached - logical record count 2030.
    default: Save data point reached - logical record count 2040.
    default: Save data point reached - logical record count 2050.
    default: Save data point reached - logical record count 2060.
    default: Save data point reached - logical record count 2070.
    default: Save data point reached - logical record count 2080.
    default: Save data point reached - logical record count 2090.
    default: Save data point reached - logical record count 2100.
    default: Save data point reached - logical record count 2110.
    default: Save data point reached - logical record count 2120.
    default: Save data point reached - logical record count 2130.
    default: Save data point reached - logical record count 2140.
    default: Save data point reached - logical record count 2150.
    default: Save data point reached - logical record count 2160.
    default: Save data point reached - logical record count 2170.
    default: Save data point reached - logical record count 2180.
    default: Save data point reached - logical record count 2190.
    default: Save data point reached - logical record count 2200.
    default: Save data point reached - logical record count 2210.
    default: Save data point reached - logical record count 2220.
    default: Save data point reached - logical record count 2230.
    default: Save data point reached - logical record count 2240.
    default: Save data point reached - logical record count 2250.
    default: Save data point reached - logical record count 2260.
    default: Save data point reached - logical record count 2270.
    default: Save data point reached - logical record count 2280.
    default: Save data point reached - logical record count 2290.
    default: Save data point reached - logical record count 2300.
    default: Save data point reached - logical record count 2310.
    default: Save data point reached - logical record count 2320.
    default: Save data point reached - logical record count 2330.
    default: Save data point reached - logical record count 2340.
    default: Save data point reached - logical record count 2350.
    default: Save data point reached - logical record count 2360.
    default: Save data point reached - logical record count 2370.
    default: Save data point reached - logical record count 2380.
    default: Save data point reached - logical record count 2390.
    default: Save data point reached - logical record count 2400.
    default: Save data point reached - logical record count 2410.
    default: Save data point reached - logical record count 2420.
    default: Save data point reached - logical record count 2430.
    default: Save data point reached - logical record count 2440.
    default: Save data point reached - logical record count 2450.
    default: Save data point reached - logical record count 2460.
    default: Save data point reached - logical record count 2470.
    default: Save data point reached - logical record count 2480.
    default: Save data point reached - logical record count 2490.
    default: Save data point reached - logical record count 2500.
    default: Save data point reached - logical record count 2510.
    default: Save data point reached - logical record count 2520.
    default: Save data point reached - logical record count 2530.
    default: Save data point reached - logical record count 2540.
    default: Save data point reached - logical record count 2550.
    default: Save data point reached - logical record count 2560.
    default: Save data point reached - logical record count 2570.
    default: Save data point reached - logical record count 2580.
    default: Save data point reached - logical record count 2590.
    default: Save data point reached - logical record count 2600.
    default: Save data point reached - logical record count 2610.
    default: Save data point reached - logical record count 2620.
    default: Save data point reached - logical record count 2630.
    default: Save data point reached - logical record count 2640.
    default: Save data point reached - logical record count 2650.
    default: Save data point reached - logical record count 2660.
    default: Save data point reached - logical record count 2670.
    default: Save data point reached - logical record count 2680.
    default: Save data point reached - logical record count 2690.
    default: Save data point reached - logical record count 2700.
    default: Save data point reached - logical record count 2710.
    default: Save data point reached - logical record count 2720.
    default: Save data point reached - logical record count 2730.
    default: Save data point reached - logical record count 2740.
    default: Save data point reached - logical record count 2750.
    default: Save data point reached - logical record count 2760.
    default: Save data point reached - logical record count 2770.
    default: Save data point reached - logical record count 2780.
    default: Save data point reached - logical record count 2790.
    default: Save data point reached - logical record count 2800.
    default: Save data point reached - logical record count 2810.
    default: Save data point reached - logical record count 2820.
    default: Save data point reached - logical record count 2830.
    default: Save data point reached - logical record count 2840.
    default: Save data point reached - logical record count 2850.
    default: Save data point reached - logical record count 2860.
    default: Save data point reached - logical record count 2870.
    default: Save data point reached - logical record count 2880.
    default: Save data point reached - logical record count 2890.
    default: Save data point reached - logical record count 2900.
    default: Save data point reached - logical record count 2910.
    default: Save data point reached - logical record count 2920.
    default: Save data point reached - logical record count 2930.
    default: Save data point reached - logical record count 2940.
    default: Save data point reached - logical record count 2950.
    default: Save data point reached - logical record count 2960.
    default: Save data point reached - logical record count 2970.
    default: Save data point reached - logical record count 2980.
    default: Save data point reached - logical record count 2990.
    default: Save data point reached - logical record count 3000.
    default: Save data point reached - logical record count 3010.
    default: Save data point reached - logical record count 3020.
    default: Save data point reached - logical record count 3030.
    default: Save data point reached - logical record count 3040.
    default: Save data point reached - logical record count 3050.
    default: Save data point reached - logical record count 3060.
    default: Save data point reached - logical record count 3070.
    default: Save data point reached - logical record count 3080.
    default: Save data point reached - logical record count 3090.
    default: Save data point reached - logical record count 3100.
    default: Save data point reached - logical record count 3110.
    default: Save data point reached - logical record count 3120.
    default: Save data point reached - logical record count 3130.
    default: Save data point reached - logical record count 3140.
    default: Save data point reached - logical record count 3150.
    default: Save data point reached - logical record count 3160.
    default: Save data point reached - logical record count 3170.
    default: Save data point reached - logical record count 3180.
    default: Save data point reached - logical record count 3190.
    default: Save data point reached - logical record count 3200.
    default: Save data point reached - logical record count 3210.
    default: Save data point reached - logical record count 3220.
    default: Save data point reached - logical record count 3230.
    default: Save data point reached - logical record count 3240.
    default: Save data point reached - logical record count 3250.
    default: Save data point reached - logical record count 3260.
    default: Save data point reached - logical record count 3270.
    default: Save data point reached - logical record count 3280.
    default: Save data point reached - logical record count 3290.
    default: Save data point reached - logical record count 3300.
    default: Save data point reached - logical record count 3310.
    default: Save data point reached - logical record count 3320.
    default: Save data point reached - logical record count 3330.
    default: Save data point reached - logical record count 3340.
    default: Save data point reached - logical record count 3350.
    default: Save data point reached - logical record count 3360.
    default: Save data point reached - logical record count 3370.
    default: Save data point reached - logical record count 3380.
    default: Save data point reached - logical record count 3390.
    default: Save data point reached - logical record count 3400.
    default: Save data point reached - logical record count 3410.
    default: Save data point reached - logical record count 3420.
    default: Save data point reached - logical record count 3430.
    default: Save data point reached - logical record count 3440.
    default: Save data point reached - logical record count 3450.
    default: Save data point reached - logical record count 3460.
    default: Save data point reached - logical record count 3470.
    default: Save data point reached - logical record count 3480.
    default: Save data point reached - logical record count 3490.
    default: Save data point reached - logical record count 3500.
    default: Save data point reached - logical record count 3510.
    default: Save data point reached - logical record count 3520.
    default: Save data point reached - logical record count 3530.
    default: Save data point reached - logical record count 3540.
    default: Save data point reached - logical record count 3550.
    default: Save data point reached - logical record count 3560.
    default: Save data point reached - logical record count 3570.
    default: Save data point reached - logical record count 3580.
    default: Save data point reached - logical record count 3590.
    default: Save data point reached - logical record count 3600.
    default: Save data point reached - logical record count 3610.
    default: Save data point reached - logical record count 3620.
    default: Save data point reached - logical record count 3630.
    default: Save data point reached - logical record count 3640.
    default: Save data point reached - logical record count 3650.
    default: Save data point reached - logical record count 3660.
    default: Save data point reached - logical record count 3670.
    default: Save data point reached - logical record count 3680.
    default: Save data point reached - logical record count 3690.
    default: Save data point reached - logical record count 3700.
    default: Save data point reached - logical record count 3710.
    default: Save data point reached - logical record count 3720.
    default: Save data point reached - logical record count 3730.
    default: Save data point reached - logical record count 3740.
    default: Save data point reached - logical record count 3750.
    default: Save data point reached - logical record count 3760.
    default: Save data point reached - logical record count 3770.
    default: Save data point reached - logical record count 3780.
    default: Save data point reached - logical record count 3790.
    default: Save data point reached - logical record count 3800.
    default: Save data point reached - logical record count 3810.
    default: Save data point reached - logical record count 3820.
    default: Save data point reached - logical record count 3830.
    default: Save data point reached - logical record count 3840.
    default: Save data point reached - logical record count 3850.
    default: Save data point reached - logical record count 3860.
    default: Save data point reached - logical record count 3870.
    default: Save data point reached - logical record count 3880.
    default: Save data point reached - logical record count 3890.
    default: Save data point reached - logical record count 3900.
    default: Save data point reached - logical record count 3910.
    default: Save data point reached - logical record count 3920.
    default: Save data point reached - logical record count 3930.
    default: Save data point reached - logical record count 3940.
    default: Save data point reached - logical record count 3950.
    default: Save data point reached - logical record count 3960.
    default: Save data point reached - logical record count 3970.
    default: Save data point reached - logical record count 3980.
    default: Save data point reached - logical record count 3990.
    default: Save data point reached - logical record count 4000.
    default: Save data point reached - logical record count 4010.
    default: Save data point reached - logical record count 4020.
    default: Save data point reached - logical record count 4030.
    default: Save data point reached - logical record count 4040.
    default: Save data point reached - logical record count 4050.
    default: Save data point reached - logical record count 4060.
    default: Save data point reached - logical record count 4070.
    default: Save data point reached - logical record count 4080.
    default: Save data point reached - logical record count 4090.
    default: Save data point reached - logical record count 4100.
    default: Save data point reached - logical record count 4110.
    default: Save data point reached - logical record count 4120.
    default: Save data point reached - logical record count 4130.
    default: Save data point reached - logical record count 4140.
    default: Save data point reached - logical record count 4150.
    default: Save data point reached - logical record count 4160.
    default: Save data point reached - logical record count 4170.
    default: Save data point reached - logical record count 4180.
    default: Save data point reached - logical record count 4190.
    default: Save data point reached - logical record count 4200.
    default: Save data point reached - logical record count 4210.
    default: Save data point reached - logical record count 4220.
    default: Save data point reached - logical record count 4230.
    default: Save data point reached - logical record count 4240.
    default: Save data point reached - logical record count 4250.
    default: Save data point reached - logical record count 4260.
    default: Save data point reached - logical record count 4270.
    default: Save data point reached - logical record count 4280.
    default: Save data point reached - logical record count 4290.
    default: Save data point reached - logical record count 4300.
    default: Save data point reached - logical record count 4310.
    default: Save data point reached - logical record count 4320.
    default: Save data point reached - logical record count 4330.
    default: Save data point reached - logical record count 4340.
    default: Save data point reached - logical record count 4350.
    default: Save data point reached - logical record count 4360.
    default: Save data point reached - logical record count 4370.
    default: Save data point reached - logical record count 4380.
    default: Save data point reached - logical record count 4390.
    default: Save data point reached - logical record count 4400.
    default: Save data point reached - logical record count 4410.
    default: Save data point reached - logical record count 4420.
    default: Save data point reached - logical record count 4430.
    default: Save data point reached - logical record count 4440.
    default: Save data point reached - logical record count 4450.
    default: Save data point reached - logical record count 4460.
    default: Save data point reached - logical record count 4470.
    default: Save data point reached - logical record count 4480.
    default: Save data point reached - logical record count 4490.
    default: Save data point reached - logical record count 4500.
    default: 
    default: Load completed - logical record count 4500.
    default: 
    default: Table SUPPLEMENTARY_DEMOGRAPHICS:
    default:   4500 Rows successfully loaded.
    default: 
    default: Check the log file:
    default:   /tmp/tmp.vA7KvKRnru/log/dem1v3.log
    default: for more information about the load.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: Enabling constraints ...
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Table altered.
    default: 
    default: 
    default: Creating additional indexes ...
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Create dimensions ...
    default: 
    default: Dimension created.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: Dimension created.
    default: 
    default: 
    default: Dimension created.
    default: 
    default: 
    default: Dimension created.
    default: 
    default: 
    default: Dimension created.
    default: 
    default: Creating MVs as tables ...
    default: 
    default: 
    default: View created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Table created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: 
    default: Index created.
    default: 
    default: Creating materialized views ...
    default: 
    default: 
    default: Materialized view created.
    default: 
    default: 
    default: Materialized view created.
    default: 
    default: 
    default: Creating comments ...
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: Comment created.
    default: 
    default: 
    default: gathering statistics ...
    default: BEGIN dbms_stats.gather_table_stats(          ownname          => 'SH'                     ,          tabname          => 'SALES_TRANSACTIONS_EXT' ,          partname         => NULL                     ,          estimate_percent => NULL                     ,          block_sample     => TRUE                     ,          method_opt       => 'FOR ALL COLUMNS SIZE 1' ,          degree           => NULL                     ,          granularity      => 'ALL'                    ,          cascade          => TRUE                     ,          stattab          => NULL                     ,          statid           => NULL                     ,          statown          => NULL                     ); END;
    default: 
    default: *
    default: ERROR at line 1:
    default: ORA-29913: error while processing ODCIEXTTABLEOPEN routine
    default: ORA-06512: at "SYS.DBMS_STATS", line 41931
    default: ORA-06512: at "SYS.DBMS_STATS", line 41216
    default: ORA-06512: at "SYS.DBMS_STATS", line 40881
    default: ORA-06512: at "SYS.DBMS_STATS", line 39991
    default: ORA-06512: at "SYS.DBMS_STATS", line 38092
    default: ORA-06512: at "SYS.DBMS_STATS", line 30833
    default: ORA-29400: data cartridge error
    default: KUP-04005: error while accessing file /tmp/tmp.vA7KvKRnru/log/ext_1v3.log
    default: ORA-06512: at "SYS.DBMS_SQL", line 1806
    default: ORA-06512: at "SYS.DBMS_STATS", line 30741
    default: ORA-06512: at "SYS.DBMS_STATS", line 37820
    default: ORA-06512: at "SYS.DBMS_STATS", line 39813
    default: ORA-06512: at "SYS.DBMS_STATS", line 40861
    default: ORA-06512: at "SYS.DBMS_STATS", line 41364
    default: ORA-06512: at "SYS.DBMS_STATS", line 41912
    default: ORA-06512: at line 1
    default: 
    default: 
    default: 
    default: PL/SQL procedure successfully completed.
    default: 
    default: Connected.
    default: 
    default: specify password for BI as parameter 1:
    default: 
    default: specify default tablespeace for BI as parameter 2:
    default: 
    default: specify temporary tablespace for BI as parameter 3:
    default: 
    default: specify password for SYS as parameter 4:
    default: 
    default: specify password for OE as parameter 5:
    default: 
    default: specify password for SH as parameter 6:
    default: 
    default: specify log path as parameter 7:
    default: 
    default: specify version as parameter 8:
    default: 
    default: specify connect string as parameter 9:
    default: 
    default: Connected.
    default: DROP USER bi CASCADE
    default:           *
    default: ERROR at line 1:
    default: ORA-01918: user 'BI' does not exist
    default: 
    default: 
    default: 
    default: User created.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: User altered.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: specify password for oe as parameter 1:
    default: 
    default: specify connect string as parameter 2:
    default: 
    default: Connected.
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: specify password for SH as parameter 1:
    default: 
    default: specify connect string as parameter 2:
    default: 
    default: Connected.
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Grant succeeded.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: 
    default: specify password for BI as parameter 1:
    default: 
    default: specify connect string as parameter 2:
    default: 
    default: Connected.
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Synonym created.
    default: 
    default: 
    default: Commit complete.
    default: 
    default: SQL> COLUMN TABLE_NAME FORMAT A25
    default: SQL> COLUMN COLUMN_NAME FORMAT A30
    default: SQL>
    default: SQL> CONNECT bi/&pwd_bi@&connect_string;
    default: Connected.
    default: SQL>
    default: SQL> SELECT COUNT(*) FROM customers;
    default: 
    default:   COUNT(*)
    default: ----------
    default:      55500
    default: 
    default: 1 row selected.
    default: 
    default: SQL> SELECT COUNT(*) FROM products;
    default: 
    default:   COUNT(*)
    default: ----------
    default:         72
    default: 
    default: 1 row selected.
    default: 
    default: SQL> SELECT COUNT(*) FROM promotions;
    default: 
    default:   COUNT(*)
    default: ----------
    default:        503
    default: 
    default: 1 row selected.
    default: 
    default: SQL> SELECT COUNT(*) FROM sales;
    default: 
    default:   COUNT(*)
    default: ----------
    default:     918843
    default: 
    default: 1 row selected.
    default: 
    default: SQL> SELECT COUNT(*) FROM costs;
    default: 
    default:   COUNT(*)
    default: ----------
    default:          0
    default: 
    default: 1 row selected.
    default: 
    default: SQL>
    default: SQL> SELECT COUNT(*) FROM sh.cal_month_sales_mv;
    default: 
    default:   COUNT(*)
    default: ----------
    default:         48
    default: 
    default: 1 row selected.
    default: 
    default: SQL> SELECT COUNT(*) FROM sh.fweek_pscat_sales_mv;
    default: 
    default:   COUNT(*)
    default: ----------
    default:      11266
    default: 
    default: 1 row selected.
    default: 
    default: SQL>
    default: SQL> SELECT COUNT(*) FROM channels;
    default: 
    default:   COUNT(*)
    default: ----------
    default:          5
    default: 
    default: 1 row selected.
    default: 
    default: SQL> SELECT COUNT(*) FROM countries;
    default: 
    default:   COUNT(*)
    default: ----------
    default:         23
    default: 
    default: 1 row selected.
    default: 
    default: SQL> SELECT COUNT(*) FROM times;
    default: 
    default:   COUNT(*)
    default: ----------
    default:       1826
    default: 
    default: 1 row selected.
    default: 
    default: SQL>
    default: SQL> SET ECHO OFF
    default: Connected.
    default: 
    default: specify password for SYSTEM as parameter 1:
    default: 
    default: specify spool filename as parameter 2:
    default: 
    default: specify connect string as parameter 3:
    default: 
    default: Connected.
    default: 
    default: Table analyzed.
    default: 
    default: 
    default: Table analyzed.
    default: 
    default: 
    default: Table analyzed.
    default: 
    default: 
    default: Table analyzed.
    default: 
    default: 
    default: Table analyzed.
    default: 
    default: 
    default: All named objects and stati
    default: 
    default: OWNER  OBJECT_TYPE          OBJECT_NAME                    SUBOBJECT_NAME   STATUS
    default: ------ -------------------- ------------------------------ ---------------- --------
    default: BI     SYNONYM              CHANNELS                                        VALID
    default: BI     SYNONYM              COSTS                                           VALID
    default: BI     SYNONYM              COUNTRIES                                       VALID
    default: BI     SYNONYM              CUSTOMERS                                       VALID
    default: BI     SYNONYM              PRODUCTS                                        VALID
    default: BI     SYNONYM              PROMOTIONS                                      VALID
    default: BI     SYNONYM              SALES                                           VALID
    default: BI     SYNONYM              TIMES                                           VALID
    default: HR     INDEX                COUNTRY_C_ID_PK                                 VALID
    default: HR     INDEX                DEPT_ID_PK                                      VALID
    default: HR     INDEX                DEPT_LOCATION_IX                                VALID
    default: HR     INDEX                EMP_DEPARTMENT_IX                               VALID
    default: HR     INDEX                EMP_EMAIL_UK                                    VALID
    default: HR     INDEX                EMP_EMP_ID_PK                                   VALID
    default: HR     INDEX                EMP_JOB_IX                                      VALID
    default: HR     INDEX                EMP_MANAGER_IX                                  VALID
    default: HR     INDEX                EMP_NAME_IX                                     VALID
    default: HR     INDEX                JHIST_DEPARTMENT_IX                             VALID
    default: HR     INDEX                JHIST_EMPLOYEE_IX                               VALID
    default: HR     INDEX                JHIST_EMP_ID_ST_DATE_PK                         VALID
    default: HR     INDEX                JHIST_JOB_IX                                    VALID
    default: HR     INDEX                JOB_ID_PK                                       VALID
    default: HR     INDEX                LOC_CITY_IX                                     VALID
    default: HR     INDEX                LOC_COUNTRY_IX                                  VALID
    default: HR     INDEX                LOC_ID_PK                                       VALID
    default: HR     INDEX                LOC_STATE_PROVINCE_IX                           VALID
    default: HR     INDEX                REG_ID_PK                                       VALID
    default: HR     PROCEDURE            ADD_JOB_HISTORY                                 VALID
    default: HR     PROCEDURE            SECURE_DML                                      VALID
    default: HR     SEQUENCE             DEPARTMENTS_SEQ                                 VALID
    default: HR     SEQUENCE             EMPLOYEES_SEQ                                   VALID
    default: HR     SEQUENCE             LOCATIONS_SEQ                                   VALID
    default: HR     TABLE                COUNTRIES                                       VALID
    default: HR     TABLE                DEPARTMENTS                                     VALID
    default: HR     TABLE                EMPLOYEES                                       VALID
    default: HR     TABLE                JOBS                                            VALID
    default: HR     TABLE                JOB_HISTORY                                     VALID
    default: HR     TABLE                LOCATIONS                                       VALID
    default: HR     TABLE                REGIONS                                         VALID
    default: HR     TRIGGER              SECURE_EMPLOYEES                                VALID
    default: HR     TRIGGER              UPDATE_JOB_HISTORY                              VALID
    default: HR     VIEW                 EMP_DETAILS_VIEW                                VALID
    default: IX     EVALUATION CONTEXT   AQ$_ORDERS_QUEUETABLE_V                         VALID
    default: IX     EVALUATION CONTEXT   AQ$_STREAMS_QUEUE_TABLE_V                       VALID
    default: IX     INDEX                AQ$_STREAMS_QUEUE_TABLE_Y                       VALID
    default: IX     QUEUE                AQ$_ORDERS_QUEUETABLE_E                         VALID
    default: IX     QUEUE                AQ$_STREAMS_QUEUE_TABLE_E                       VALID
    default: IX     QUEUE                ORDERS_QUEUE                                    VALID
    default: IX     QUEUE                STREAMS_QUEUE                                   VALID
    default: IX     RULE SET             ORDERS_QUEUE_N                                  VALID
    default: IX     RULE SET             ORDERS_QUEUE_R                                  VALID
    default: IX     RULE SET             STREAMS_QUEUE_N                                 VALID
    default: IX     RULE SET             STREAMS_QUEUE_R                                 VALID
    default: IX     SEQUENCE             AQ$_ORDERS_QUEUETABLE_N                         VALID
    default: IX     SEQUENCE             AQ$_STREAMS_QUEUE_TABLE_N                       VALID
    default: IX     TABLE                AQ$_ORDERS_QUEUETABLE_G                         VALID
    default: IX     TABLE                AQ$_ORDERS_QUEUETABLE_H                         VALID
    default: IX     TABLE                AQ$_ORDERS_QUEUETABLE_I                         VALID
    default: IX     TABLE                AQ$_ORDERS_QUEUETABLE_L                         VALID
    default: IX     TABLE                AQ$_ORDERS_QUEUETABLE_S                         VALID
    default: IX     TABLE                AQ$_ORDERS_QUEUETABLE_T                         VALID
    default: IX     TABLE                AQ$_STREAMS_QUEUE_TABLE_C                       VALID
    default: IX     TABLE                AQ$_STREAMS_QUEUE_TABLE_G                       VALID
    default: IX     TABLE                AQ$_STREAMS_QUEUE_TABLE_H                       VALID
    default: IX     TABLE                AQ$_STREAMS_QUEUE_TABLE_I                       VALID
    default: IX     TABLE                AQ$_STREAMS_QUEUE_TABLE_L                       VALID
    default: IX     TABLE                AQ$_STREAMS_QUEUE_TABLE_S                       VALID
    default: IX     TABLE                AQ$_STREAMS_QUEUE_TABLE_T                       VALID
    default: IX     TABLE                ORDERS_QUEUETABLE                               VALID
    default: IX     TABLE                STREAMS_QUEUE_TABLE                             VALID
    default: IX     TYPE                 ORDER_EVENT_TYP                                 VALID
    default: IX     VIEW                 AQ$ORDERS_QUEUETABLE                            VALID
    default: IX     VIEW                 AQ$ORDERS_QUEUETABLE_R                          VALID
    default: IX     VIEW                 AQ$ORDERS_QUEUETABLE_S                          VALID
    default: IX     VIEW                 AQ$STREAMS_QUEUE_TABLE                          VALID
    default: IX     VIEW                 AQ$STREAMS_QUEUE_TABLE_R                        VALID
    default: IX     VIEW                 AQ$STREAMS_QUEUE_TABLE_S                        VALID
    default: IX     VIEW                 AQ$_ORDERS_QUEUETABLE_F                         VALID
    default: IX     VIEW                 AQ$_STREAMS_QUEUE_TABLE_F                       VALID
    default: OE     FUNCTION             GET_PHONE_NUMBER_F                              VALID
    default: OE     INDEX                ACTION_TABLE_MEMBERS                            VALID
    default: OE     INDEX                CUSTOMERS_PK                                    VALID
    default: OE     INDEX                CUST_ACCOUNT_MANAGER_IX                         VALID
    default: OE     INDEX                CUST_EMAIL_IX                                   VALID
    default: OE     INDEX                CUST_LNAME_IX                                   VALID
    default: OE     INDEX                CUST_UPPER_NAME_IX                              VALID
    default: OE     INDEX                INVENTORY_IX                                    VALID
    default: OE     INDEX                INV_PRODUCT_IX                                  VALID
    default: OE     INDEX                ITEM_ORDER_IX                                   VALID
    default: OE     INDEX                ITEM_PRODUCT_IX                                 VALID
    default: OE     INDEX                LINEITEM_TABLE_MEMBERS                          VALID
    default: OE     INDEX                ORDER_ITEMS_PK                                  VALID
    default: OE     INDEX                ORDER_ITEMS_UK                                  VALID
    default: OE     INDEX                ORDER_PK                                        VALID
    default: OE     INDEX                ORD_CUSTOMER_IX                                 VALID
    default: OE     INDEX                ORD_ORDER_DATE_IX                               VALID
    default: OE     INDEX                ORD_SALES_REP_IX                                VALID
    default: OE     INDEX                PRD_DESC_PK                                     VALID
    default: OE     INDEX                PRODUCT_INFORMATION_PK                          VALID
    default: OE     INDEX                PROD_NAME_IX                                    VALID
    default: OE     INDEX                PROD_SUPPLIER_IX                                VALID
    default: OE     INDEX                PROMO_ID_PK                                     VALID
    default: OE     INDEX                WAREHOUSES_PK                                   VALID
    default: OE     INDEX                WHS_LOCATION_IX                                 VALID
    default: OE     LOB                  EXTRADATA26_L                                   VALID
    default: OE     LOB                  NAMESPACES27_L                                  VALID
    default: OE     SEQUENCE             ORDERS_SEQ                                      VALID
    default: OE     SYNONYM              COUNTRIES                                       VALID
    default: OE     SYNONYM              DEPARTMENTS                                     VALID
    default: OE     SYNONYM              EMPLOYEES                                       VALID
    default: OE     SYNONYM              JOBS                                            VALID
    default: OE     SYNONYM              JOB_HISTORY                                     VALID
    default: OE     SYNONYM              LOCATIONS                                       VALID
    default: OE     TABLE                ACTION_TABLE                                    VALID
    default: OE     TABLE                CATEGORIES_TAB                                  VALID
    default: OE     TABLE                CUSTOMERS                                       VALID
    default: OE     TABLE                INVENTORIES                                     VALID
    default: OE     TABLE                LINEITEM_TABLE                                  VALID
    default: OE     TABLE                ORDERS                                          VALID
    default: OE     TABLE                ORDER_ITEMS                                     VALID
    default: OE     TABLE                PRODUCT_DESCRIPTIONS                            VALID
    default: OE     TABLE                PRODUCT_INFORMATION                             VALID
    default: OE     TABLE                PRODUCT_REF_LIST_NESTEDTAB                      VALID
    default: OE     TABLE                PROMOTIONS                                      VALID
    default: OE     TABLE                PURCHASEORDER                                   VALID
    default: OE     TABLE                SUBCATEGORY_REF_LIST_NESTEDTAB                  VALID
    default: OE     TABLE                WAREHOUSES                                      VALID
    default: OE     TRIGGER              INSERT_ORD_LINE                                 VALID
    default: OE     TRIGGER              ORDERS_ITEMS_TRG                                VALID
    default: OE     TRIGGER              ORDERS_TRG                                      VALID
    default: OE     TRIGGER              PURCHASEORDER$xd                                VALID
    default: OE     TYPE                 ACTIONS_T                                       VALID
    default: OE     TYPE                 ACTION_T                                        VALID
    default: OE     TYPE                 ACTION_V                                        VALID
    default: OE     TYPE                 CATALOG_TYP                    $VSN_1           VALID
    default: OE     TYPE                 CATALOG_TYP                                     VALID
    default: OE     TYPE                 CATEGORY_TYP                   $VSN_1           VALID
    default: OE     TYPE                 CATEGORY_TYP                                    VALID
    default: OE     TYPE                 COMPOSITE_CATEGORY_TYP         $VSN_1           VALID
    default: OE     TYPE                 COMPOSITE_CATEGORY_TYP                          VALID
    default: OE     TYPE                 CORPORATE_CUSTOMER_TYP                          VALID
    default: OE     TYPE                 CUSTOMER_TYP                                    VALID
    default: OE     TYPE                 CUST_ADDRESS_TYP                                VALID
    default: OE     TYPE                 INVENTORY_LIST_TYP                              VALID
    default: OE     TYPE                 INVENTORY_TYP                                   VALID
    default: OE     TYPE                 LEAF_CATEGORY_TYP              $VSN_1           VALID
    default: OE     TYPE                 LEAF_CATEGORY_TYP                               VALID
    default: OE     TYPE                 LINEITEMS_T                                     VALID
    default: OE     TYPE                 LINEITEM_T                                      VALID
    default: OE     TYPE                 LINEITEM_V                                      VALID
    default: OE     TYPE                 ORDER_ITEM_LIST_TYP                             VALID
    default: OE     TYPE                 ORDER_ITEM_TYP                                  VALID
    default: OE     TYPE                 ORDER_LIST_TYP                                  VALID
    default: OE     TYPE                 ORDER_TYP                                       VALID
    default: OE     TYPE                 PART_T                                          VALID
    default: OE     TYPE                 PHONE_LIST_TYP                                  VALID
    default: OE     TYPE                 PRODUCT_INFORMATION_TYP                         VALID
    default: OE     TYPE                 PRODUCT_REF_LIST_TYP                            VALID
    default: OE     TYPE                 PURCHASEORDER_T                                 VALID
    default: OE     TYPE                 REJECTION_T                                     VALID
    default: OE     TYPE                 SHIPPING_INSTRUCTIONS_T                         VALID
    default: OE     TYPE                 SUBCATEGORY_REF_LIST_TYP                        VALID
    default: OE     TYPE                 WAREHOUSE_TYP                                   VALID
    default: OE     TYPE BODY            CATALOG_TYP                                     VALID
    default: OE     TYPE BODY            COMPOSITE_CATEGORY_TYP                          VALID
    default: OE     TYPE BODY            LEAF_CATEGORY_TYP                               VALID
    default: OE     VIEW                 ACCOUNT_MANAGERS                                VALID
    default: OE     VIEW                 BOMBAY_INVENTORY                                VALID
    default: OE     VIEW                 CUSTOMERS_VIEW                                  VALID
    default: OE     VIEW                 OC_CORPORATE_CUSTOMERS                          VALID
    default: OE     VIEW                 OC_CUSTOMERS                                    VALID
    default: OE     VIEW                 OC_INVENTORIES                                  VALID
    default: OE     VIEW                 OC_ORDERS                                       VALID
    default: OE     VIEW                 OC_PRODUCT_INFORMATION                          VALID
    default: OE     VIEW                 ORDERS_VIEW                                     VALID
    default: OE     VIEW                 PRODUCTS                                        VALID
    default: OE     VIEW                 PRODUCT_PRICES                                  VALID
    default: OE     VIEW                 SYDNEY_INVENTORY                                VALID
    default: OE     VIEW                 TORONTO_INVENTORY                               VALID
    default: PM     INDEX                PRINTMEDIA_PK                                   VALID
    default: PM     TABLE                PRINT_MEDIA                                     VALID
    default: PM     TABLE                TEXTDOCS_NESTEDTAB                              VALID
    default: PM     TYPE                 ADHEADER_TYP                                    VALID
    default: PM     TYPE                 TEXTDOC_TAB                                     VALID
    default: PM     TYPE                 TEXTDOC_TYP                                     VALID
    default: SH     DIMENSION            CHANNELS_DIM                                    VALID
    default: SH     DIMENSION            CUSTOMERS_DIM                                   VALID
    default: SH     DIMENSION            PRODUCTS_DIM                                    VALID
    default: SH     DIMENSION            PROMOTIONS_DIM                                  VALID
    default: SH     DIMENSION            TIMES_DIM                                       VALID
    default: SH     INDEX                CHANNELS_PK                                     VALID
    default: SH     INDEX                COSTS_PROD_BIX                                  VALID
    default: SH     INDEX                COSTS_TIME_BIX                                  VALID
    default: SH     INDEX                COUNTRIES_PK                                    VALID
    default: SH     INDEX                CUSTOMERS_GENDER_BIX                            VALID
    default: SH     INDEX                CUSTOMERS_MARITAL_BIX                           VALID
    default: SH     INDEX                CUSTOMERS_PK                                    VALID
    default: SH     INDEX                CUSTOMERS_YOB_BIX                               VALID
    default: SH     INDEX                DR$SUP_TEXT_IDX$KD                              VALID
    default: SH     INDEX                DR$SUP_TEXT_IDX$KR                              VALID
    default: SH     INDEX                DR$SUP_TEXT_IDX$X                               VALID
    default: SH     INDEX                FW_PSC_S_MV_CHAN_BIX                            VALID
    default: SH     INDEX                FW_PSC_S_MV_PROMO_BIX                           VALID
    default: SH     INDEX                FW_PSC_S_MV_SUBCAT_BIX                          VALID
    default: SH     INDEX                FW_PSC_S_MV_WD_BIX                              VALID
    default: SH     INDEX                PRODUCTS_PK                                     VALID
    default: SH     INDEX                PRODUCTS_PROD_CAT_IX                            VALID
    default: SH     INDEX                PRODUCTS_PROD_STATUS_BIX                        VALID
    default: SH     INDEX                PRODUCTS_PROD_SUBCAT_IX                         VALID
    default: SH     INDEX                PROMO_PK                                        VALID
    default: SH     INDEX                SALES_CHANNEL_BIX                               VALID
    default: SH     INDEX                SALES_CUST_BIX                                  VALID
    default: SH     INDEX                SALES_PROD_BIX                                  VALID
    default: SH     INDEX                SALES_PROMO_BIX                                 VALID
    default: SH     INDEX                SALES_TIME_BIX                                  VALID
    default: SH     INDEX                SUP_TEXT_IDX                                    VALID
    default: SH     INDEX                TIMES_PK                                        VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_1995       VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_1996       VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_H1_1997    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_H2_1997    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q1_1998    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q1_1999    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q1_2000    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q1_2001    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q1_2002    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q1_2003    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q2_1998    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q2_1999    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q2_2000    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q2_2001    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q2_2002    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q2_2003    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q3_1998    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q3_1999    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q3_2000    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q3_2001    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q3_2002    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q3_2003    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q4_1998    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q4_1999    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q4_2000    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q4_2001    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q4_2002    VALID
    default: SH     INDEX PARTITION      COSTS_PROD_BIX                 COSTS_Q4_2003    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_1995       VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_1996       VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_H1_1997    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_H2_1997    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q1_1998    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q1_1999    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q1_2000    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q1_2001    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q1_2002    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q1_2003    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q2_1998    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q2_1999    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q2_2000    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q2_2001    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q2_2002    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q2_2003    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q3_1998    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q3_1999    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q3_2000    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q3_2001    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q3_2002    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q3_2003    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q4_1998    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q4_1999    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q4_2000    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q4_2001    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q4_2002    VALID
    default: SH     INDEX PARTITION      COSTS_TIME_BIX                 COSTS_Q4_2003    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_1995       VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_1996       VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_H1_1997    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_H2_1997    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q1_1998    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q1_1999    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q1_2000    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q1_2001    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q1_2002    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q1_2003    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q2_1998    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q2_1999    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q2_2000    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q2_2001    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q2_2002    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q2_2003    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q3_1998    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q3_1999    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q3_2000    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q3_2001    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q3_2002    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q3_2003    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q4_1998    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q4_1999    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q4_2000    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q4_2001    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q4_2002    VALID
    default: SH     INDEX PARTITION      SALES_CHANNEL_BIX              SALES_Q4_2003    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_1995       VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_1996       VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_H1_1997    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_H2_1997    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q1_1998    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q1_1999    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q1_2000    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q1_2001    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q1_2002    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q1_2003    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q2_1998    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q2_1999    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q2_2000    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q2_2001    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q2_2002    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q2_2003    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q3_1998    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q3_1999    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q3_2000    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q3_2001    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q3_2002    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q3_2003    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q4_1998    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q4_1999    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q4_2000    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q4_2001    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q4_2002    VALID
    default: SH     INDEX PARTITION      SALES_CUST_BIX                 SALES_Q4_2003    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_1995       VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_1996       VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_H1_1997    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_H2_1997    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q1_1998    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q1_1999    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q1_2000    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q1_2001    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q1_2002    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q1_2003    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q2_1998    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q2_1999    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q2_2000    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q2_2001    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q2_2002    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q2_2003    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q3_1998    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q3_1999    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q3_2000    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q3_2001    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q3_2002    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q3_2003    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q4_1998    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q4_1999    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q4_2000    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q4_2001    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q4_2002    VALID
    default: SH     INDEX PARTITION      SALES_PROD_BIX                 SALES_Q4_2003    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_1995       VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_1996       VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_H1_1997    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_H2_1997    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q1_1998    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q1_1999    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q1_2000    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q1_2001    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q1_2002    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q1_2003    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q2_1998    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q2_1999    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q2_2000    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q2_2001    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q2_2002    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q2_2003    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q3_1998    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q3_1999    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q3_2000    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q3_2001    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q3_2002    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q3_2003    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q4_1998    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q4_1999    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q4_2000    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q4_2001    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q4_2002    VALID
    default: SH     INDEX PARTITION      SALES_PROMO_BIX                SALES_Q4_2003    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_1995       VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_1996       VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_H1_1997    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_H2_1997    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q1_1998    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q1_1999    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q1_2000    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q1_2001    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q1_2002    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q1_2003    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q2_1998    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q2_1999    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q2_2000    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q2_2001    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q2_2002    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q2_2003    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q3_1998    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q3_1999    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q3_2000    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q3_2001    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q3_2002    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q3_2003    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q4_1998    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q4_1999    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q4_2000    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q4_2001    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q4_2002    VALID
    default: SH     INDEX PARTITION      SALES_TIME_BIX                 SALES_Q4_2003    VALID
    default: SH     MATERIALIZED VIEW    CAL_MONTH_SALES_MV                              VALID
    default: SH     MATERIALIZED VIEW    FWEEK_PSCAT_SALES_MV                            VALID
    default: SH     TABLE                CAL_MONTH_SALES_MV                              VALID
    default: SH     TABLE                CHANNELS                                        VALID
    default: SH     TABLE                COSTS                                           VALID
    default: SH     TABLE                COUNTRIES                                       VALID
    default: SH     TABLE                CUSTOMERS                                       VALID
    default: SH     TABLE                DR$SUP_TEXT_IDX$B                               VALID
    default: SH     TABLE                DR$SUP_TEXT_IDX$C                               VALID
    default: SH     TABLE                DR$SUP_TEXT_IDX$I                               VALID
    default: SH     TABLE                DR$SUP_TEXT_IDX$K                               VALID
    default: SH     TABLE                DR$SUP_TEXT_IDX$N                               VALID
    default: SH     TABLE                DR$SUP_TEXT_IDX$Q                               VALID
    default: SH     TABLE                DR$SUP_TEXT_IDX$U                               VALID
    default: SH     TABLE                FWEEK_PSCAT_SALES_MV                            VALID
    default: SH     TABLE                PRODUCTS                                        VALID
    default: SH     TABLE                PROMOTIONS                                      VALID
    default: SH     TABLE                SALES                                           VALID
    default: SH     TABLE                SALES_TRANSACTIONS_EXT                          VALID
    default: SH     TABLE                SUPPLEMENTARY_DEMOGRAPHICS                      VALID
    default: SH     TABLE                TIMES                                           VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_1995       VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_1996       VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_H1_1997    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_H2_1997    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q1_1998    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q1_1999    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q1_2000    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q1_2001    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q1_2002    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q1_2003    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q2_1998    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q2_1999    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q2_2000    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q2_2001    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q2_2002    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q2_2003    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q3_1998    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q3_1999    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q3_2000    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q3_2001    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q3_2002    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q3_2003    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q4_1998    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q4_1999    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q4_2000    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q4_2001    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q4_2002    VALID
    default: SH     TABLE PARTITION      COSTS                          COSTS_Q4_2003    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_1995       VALID
    default: SH     TABLE PARTITION      SALES                          SALES_1996       VALID
    default: SH     TABLE PARTITION      SALES                          SALES_H1_1997    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_H2_1997    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q1_1998    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q1_1999    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q1_2000    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q1_2001    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q1_2002    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q1_2003    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q2_1998    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q2_1999    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q2_2000    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q2_2001    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q2_2002    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q2_2003    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q3_1998    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q3_1999    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q3_2000    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q3_2001    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q3_2002    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q3_2003    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q4_1998    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q4_1999    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q4_2000    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q4_2001    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q4_2002    VALID
    default: SH     TABLE PARTITION      SALES                          SALES_Q4_2003    VALID
    default: SH     VIEW                 PROFITS                                         VALID
    default: 
    default: 491 rows selected.
    default: 
    default: 
    default: Data types used
    default: 
    default: OWNER  DATA_TYPE                           DATA_TYPE_OWNER  DAT   COUNT(*)
    default: ------ ----------------------------------- ---------------- --- ----------
    default: PM     ADHEADER_TYP                        PM                            1
    default: IX     ANYDATA                             SYS                           7
    default: IX     AQ$_SIG_PROP                        SYS                           4
    default: PM     BFILE                                                             1
    default: PM     BLOB                                                              2
    default: SH     BLOB                                                              1
    default: HR     CHAR                                                              3
    default: IX     CHAR                                                              2
    default: OE     CHAR                                                              2
    default: SH     CHAR                                                              5
    default: IX     CLOB                                                              2
    default: PM     CLOB                                                              2
    default: OE     CUSTOMER_TYP                        OE               REF          1
    default: OE     CUST_ADDRESS_TYP                    OE                            3
    default: HR     DATE                                                              3
    default: IX     DATE                                                              6
    default: OE     DATE                                                              2
    default: SH     DATE                                                             19
    default: OE     INTERVAL YEAR(2) TO MONTH                                         3
    default: OE     INVENTORY_LIST_TYP                  OE                            1
    default: PM     NCLOB                                                             1
    default: HR     NUMBER                                                           21
    default: IX     NUMBER                                                          107
    default: OE     NUMBER                                                           80
    default: PM     NUMBER                                                            2
    default: SH     NUMBER                                                          108
    default: OE     NVARCHAR2                                                         7
    default: IX     ORDER_EVENT_TYP                     IX                            3
    default: OE     ORDER_ITEM_LIST_TYP                 OE                            1
    default: OE     ORDER_LIST_TYP                      OE                            2
    default: OE     PHONE_LIST_TYP                      OE                            3
    default: IX     RAW                                                              32
    default: IX     ROWID                                                             6
    default: SH     ROWID                                                             4
    default: OE     SDO_GEOMETRY                        MDSYS                         2
    default: PM     TEXTDOC_TAB                         PM                            1
    default: IX     TIMESTAMP(6)                                                     25
    default: OE     TIMESTAMP(6) WITH LOCAL TIME ZONE                                 1
    default: IX     TIMESTAMP(6) WITH TIME ZONE                                       8
    default: IX     TIMESTAMP(9)                                                      2
    default: HR     VARCHAR2                                                         24
    default: IX     VARCHAR2                                                        128
    default: OE     VARCHAR2                                                         53
    default: SH     VARCHAR2                                                         47
    default: OE     WAREHOUSE_TYP                       OE                            1
    default: OE     XMLTYPE                             SYS                           2
    default: 
    default: 46 rows selected.
    default: 
    default: 
    default: XML tables
    default: 
    default: OWNER  TABLE_NAME                     SCHEMA_OWNER     STORAGE_TYPE
    default: ------ ------------------------------ ---------------- --------------------
    default: OE     PURCHASEORDER                  OE               OBJECT-RELATIONAL
    default: 
    default: 1 row selected.
    default: 
    default: 
    default: All objects named 'SYS%' (LOBs etc)
    default: 
    default: OWNER  OBJECT_TYPE          STATUS     COUNT(*)
    default: ------ -------------------- -------- ----------
    default: IX     INDEX                VALID            16
    default: OE     INDEX                VALID            24
    default: PM     INDEX                VALID             9
    default: SH     INDEX                VALID             3
    default: IX     LOB                  VALID             3
    default: OE     LOB                  VALID            13
    default: PM     LOB                  VALID             7
    default: SH     LOB                  VALID             1
    default: IX     TABLE                VALID             2
    default: OE     TYPE                 VALID             5
    default: 
    default: 10 rows selected.
    default: 
    default: 
    default: All constraints
    default: 
    default: OWNER  CONSTRAINT_TYPE      STATUS   VALIDATED        GENERATED          COUNT(*)
    default: ------ -------------------- -------- ---------------- ---------------- ----------
    default: IX     Check or Not Null    ENABLED  VALIDATED        GENERATED NAME            4
    default: OE     Check or Not Null    ENABLED  VALIDATED        GENERATED NAME            2
    default: SH     Check or Not Null    ENABLED  VALIDATED        GENERATED NAME          121
    default: HR     Check or Not Null    ENABLED  VALIDATED        USER NAME                15
    default: OE     Check or Not Null    ENABLED  VALIDATED        USER NAME                13
    default: SH     Foreign key          DISABLED NOT VALIDATED    USER NAME                 2
    default: OE     Foreign key          ENABLED  NOT VALIDATED    USER NAME                 2
    default: SH     Foreign key          ENABLED  NOT VALIDATED    USER NAME                 8
    default: HR     Foreign key          ENABLED  VALIDATED        USER NAME                10
    default: OE     Foreign key          ENABLED  VALIDATED        USER NAME                 7
    default: PM     Foreign key          ENABLED  VALIDATED        USER NAME                 1
    default: SH     Primary key          DISABLED NOT VALIDATED    USER NAME                 1
    default: SH     Primary key          ENABLED  NOT VALIDATED    USER NAME                 6
    default: IX     Primary key          ENABLED  VALIDATED        GENERATED NAME           13
    default: OE     Primary key          ENABLED  VALIDATED        GENERATED NAME            3
    default: SH     Primary key          ENABLED  VALIDATED        GENERATED NAME            2
    default: HR     Primary key          ENABLED  VALIDATED        USER NAME                 7
    default: OE     Primary key          ENABLED  VALIDATED        USER NAME                 8
    default: PM     Primary key          ENABLED  VALIDATED        USER NAME                 1
    default: HR     Read only view       ENABLED  NOT VALIDATED    GENERATED NAME            1
    default: IX     Read only view       ENABLED  NOT VALIDATED    GENERATED NAME            8
    default: OE     Unique key           ENABLED  VALIDATED        GENERATED NAME            6
    default: PM     Unique key           ENABLED  VALIDATED        GENERATED NAME            1
    default: HR     Unique key           ENABLED  VALIDATED        USER NAME                 1
    default: 
    default: 24 rows selected.
    default: 
    default: 
    default: All dimensions
    default: 
    default: OWNER  DIMENSION_NAME       I COMPILE_STATE
    default: ------ -------------------- - -------------
    default: SH     CHANNELS_DIM         N VALID
    default: SH     CUSTOMERS_DIM        N VALID
    default: SH     PRODUCTS_DIM         N VALID
    default: SH     PROMOTIONS_DIM       N VALID
    default: SH     TIMES_DIM            N VALID
    default: 
    default: 5 rows selected.
    default: 
    default: 
    default: All granted roles
    default: 
    default: GRANTED_ROLE              GRANTEE
    default: ------------------------- -------
    default: AQ_ADMINISTRATOR_ROLE     IX
    default: AQ_USER_ROLE              IX
    default: CONNECT                   IX
    default: CONNECT                   PM
    default: RESOURCE                  BI
    default: RESOURCE                  HR
    default: RESOURCE                  IX
    default: RESOURCE                  OE
    default: RESOURCE                  PM
    default: RESOURCE                  SH
    default: SELECT_CATALOG_ROLE       IX
    default: SELECT_CATALOG_ROLE       SH
    default: XDBADMIN                  OE
    default: 
    default: 13 rows selected.
    default: 
    default: 
    default: All granted system privileges
    default: 
    default: PRIVILEGE                 GRANTEE
    default: ------------------------- -------
    default: ALTER SESSION             BI
    default: ALTER SESSION             HR
    default: ALTER SESSION             IX
    default: ALTER SESSION             SH
    default: CREATE CLUSTER            BI
    default: CREATE CLUSTER            IX
    default: CREATE CLUSTER            SH
    default: CREATE DATABASE LINK      BI
    default: CREATE DATABASE LINK      HR
    default: CREATE DATABASE LINK      IX
    default: CREATE DATABASE LINK      OE
    default: CREATE DATABASE LINK      SH
    default: CREATE DIMENSION          SH
    default: CREATE INDEXTYPE          IX
    default: CREATE MATERIALIZED VIEW  OE
    default: CREATE MATERIALIZED VIEW  SH
    default: CREATE OPERATOR           IX
    default: CREATE PROCEDURE          IX
    default: CREATE RULE               IX
    default: CREATE RULE SET           IX
    default: CREATE SEQUENCE           BI
    default: CREATE SEQUENCE           HR
    default: CREATE SEQUENCE           IX
    default: CREATE SEQUENCE           SH
    default: CREATE SESSION            BI
    default: CREATE SESSION            HR
    default: CREATE SESSION            IX
    default: CREATE SESSION            OE
    default: CREATE SESSION            SH
    default: CREATE SYNONYM            BI
    default: CREATE SYNONYM            HR
    default: CREATE SYNONYM            IX
    default: CREATE SYNONYM            OE
    default: CREATE SYNONYM            SH
    default: CREATE TABLE              BI
    default: CREATE TABLE              IX
    default: CREATE TABLE              SH
    default: CREATE TRIGGER            IX
    default: CREATE TYPE               IX
    default: CREATE VIEW               BI
    default: CREATE VIEW               HR
    default: CREATE VIEW               IX
    default: CREATE VIEW               OE
    default: CREATE VIEW               SH
    default: QUERY REWRITE             OE
    default: QUERY REWRITE             SH
    default: SELECT ANY DICTIONARY     IX
    default: UNLIMITED TABLESPACE      BI
    default: UNLIMITED TABLESPACE      HR
    default: UNLIMITED TABLESPACE      IX
    default: UNLIMITED TABLESPACE      OE
    default: UNLIMITED TABLESPACE      PM
    default: UNLIMITED TABLESPACE      SH
    default: 
    default: 53 rows selected.
    default: 
    default: 
    default: All granted object privileges
    default: 
    default: OWNER  TABLE_NAME                     PRIVILEGE                 GRANTEE
    default: ------ ------------------------------ ------------------------- -------
    default: HR     COUNTRIES                      REFERENCES                OE
    default: HR     COUNTRIES                      SELECT                    OE
    default: HR     DEPARTMENTS                    SELECT                    OE
    default: HR     EMPLOYEES                      REFERENCES                OE
    default: HR     EMPLOYEES                      SELECT                    OE
    default: HR     JOBS                           SELECT                    OE
    default: HR     JOB_HISTORY                    SELECT                    OE
    default: HR     LOCATIONS                      REFERENCES                OE
    default: HR     LOCATIONS                      SELECT                    OE
    default: OE     BOMBAY_INVENTORY               SELECT                    BI
    default: OE     CUSTOMERS                      SELECT                    BI
    default: OE     CUSTOMERS                      SELECT                    PM
    default: OE     INVENTORIES                    SELECT                    BI
    default: OE     INVENTORIES                    SELECT                    PM
    default: OE     ORDERS                         SELECT                    BI
    default: OE     ORDERS                         SELECT                    PM
    default: OE     ORDER_ITEMS                    SELECT                    BI
    default: OE     ORDER_ITEMS                    SELECT                    PM
    default: OE     PRODUCTS                       SELECT                    BI
    default: OE     PRODUCT_DESCRIPTIONS           SELECT                    BI
    default: OE     PRODUCT_DESCRIPTIONS           SELECT                    PM
    default: OE     PRODUCT_INFORMATION            REFERENCES                PM
    default: OE     PRODUCT_INFORMATION            SELECT                    BI
    default: OE     PRODUCT_INFORMATION            SELECT                    PM
    default: OE     PRODUCT_PRICES                 SELECT                    BI
    default: OE     PROMOTIONS                     SELECT                    BI
    default: OE     SYDNEY_INVENTORY               SELECT                    BI
    default: OE     TORONTO_INVENTORY              SELECT                    BI
    default: OE     WAREHOUSES                     SELECT                    BI
    default: OE     WAREHOUSES                     SELECT                    PM
    default: SH     CAL_MONTH_SALES_MV             SELECT                    BI
    default: SH     CHANNELS                       SELECT                    BI
    default: SH     COSTS                          SELECT                    BI
    default: SH     COUNTRIES                      SELECT                    BI
    default: SH     CUSTOMERS                      SELECT                    BI
    default: SH     FWEEK_PSCAT_SALES_MV           SELECT                    BI
    default: SH     PRODUCTS                       SELECT                    BI
    default: SH     PROMOTIONS                     SELECT                    BI
    default: SH     SALES                          SELECT                    BI
    default: SH     TIMES                          SELECT                    BI
    default: SYS    AQ$_UNFLUSHED_DEQUEUES         SELECT                    IX
    default: SYS    DATA_FILE_DIR                  READ                      SH
    default: SYS    DBMS_APPLY_ADM                 EXECUTE                   IX
    default: SYS    DBMS_AQ                        EXECUTE                   IX
    default: SYS    DBMS_AQADM                     EXECUTE                   IX
    default: SYS    DBMS_AQ_BQVIEW                 EXECUTE                   IX
    default: SYS    DBMS_CAPTURE_ADM               EXECUTE                   IX
    default: SYS    DBMS_FLASHBACK                 EXECUTE                   IX
    default: SYS    DBMS_PROPAGATION_ADM           EXECUTE                   IX
    default: SYS    DBMS_STATS                     EXECUTE                   HR
    default: SYS    DBMS_STATS                     EXECUTE                   IX
    default: SYS    DBMS_STATS                     EXECUTE                   OE
    default: SYS    DBMS_STATS                     EXECUTE                   PM
    default: SYS    DBMS_STATS                     EXECUTE                   SH
    default: SYS    DBMS_STREAMS_ADM               EXECUTE                   IX
    default: SYS    LOG_FILE_DIR                   READ                      SH
    default: SYS    LOG_FILE_DIR                   WRITE                     SH
    default: SYS    MEDIA_DIR                      READ                      PM
    default: SYS    QT78086_BUFFER                 SELECT                    IX
    default: SYS    QT78113_BUFFER                 SELECT                    IX
    default: SYS    SS_OE_XMLDIR                   READ                      OE
    default: SYS    SS_OE_XMLDIR                   WRITE                     OE
    default: SYS    SUBDIR                         READ                      OE
    default: SYS    SUBDIR                         WRITE                     OE
    default: 
    default: 64 rows selected.
    default: 
    default: 
    default: Space usage
    default: 
    default: OWNER  SEGMENT_TYPE         SUM(BYTES)
    default: ------ -------------------- ----------
    default: HR     TABLE                    393216
    default: HR     INDEX                   1245184
    default: OE     TABLE                   3932160
    default: OE     LOBINDEX                 983040
    default: OE     LOBSEGMENT              3932160
    default: OE     INDEX                   3014656
    default: OE     NESTED TABLE             589824
    default: PM     TABLE                     65536
    default: PM     NESTED TABLE              65536
    default: PM     INDEX                    196608
    default: PM     LOBINDEX                 458752
    default: PM     LOBSEGMENT              6225920
    default: IX     TABLE                    524288
    default: IX     INDEX                    917504
    default: IX     LOBINDEX                 196608
    default: IX     LOBSEGMENT               786432
    default: SH     TABLE PARTITION       134217728
    default: SH     TABLE                  20054016
    default: SH     INDEX                   2555904
    default: SH     INDEX PARTITION         9043968
    default: SH     LOBINDEX                  65536
    default: SH     LOBSEGMENT               262144
    default: HR                             1638400
    default: OE                            12451840
    default: PM                             7012352
    default: IX                             2424832
    default: SH                           166199296
    default:                              189726720
    default: 
    default: 28 rows selected.
    default: 
    default: 
    default: Table cardinality relational and object tables
    default: 
    default: OWNER  TABLE_NAME                       NUM_ROWS
    default: ------ ------------------------------ ----------
    default: HR     COUNTRIES                              25
    default: HR     DEPARTMENTS                            27
    default: HR     EMPLOYEES                             107
    default: HR     JOBS                                   19
    default: HR     JOB_HISTORY                            10
    default: HR     LOCATIONS                              23
    default: HR     REGIONS                                 4
    default: IX     AQ$_ORDERS_QUEUETABLE_G                 0
    default: IX     AQ$_ORDERS_QUEUETABLE_H                 2
    default: IX     AQ$_ORDERS_QUEUETABLE_I                 2
    default: IX     AQ$_ORDERS_QUEUETABLE_L                 2
    default: IX     AQ$_ORDERS_QUEUETABLE_S                 4
    default: IX     AQ$_ORDERS_QUEUETABLE_T                 0
    default: IX     AQ$_STREAMS_QUEUE_TABLE_C               0
    default: IX     AQ$_STREAMS_QUEUE_TABLE_G               0
    default: IX     AQ$_STREAMS_QUEUE_TABLE_H               0
    default: IX     AQ$_STREAMS_QUEUE_TABLE_I               0
    default: IX     AQ$_STREAMS_QUEUE_TABLE_L               0
    default: IX     AQ$_STREAMS_QUEUE_TABLE_S               1
    default: IX     AQ$_STREAMS_QUEUE_TABLE_T               0
    default: IX     ORDERS_QUEUETABLE                       1
    default: IX     STREAMS_QUEUE_TABLE                     0
    default: IX     SYS_IOT_OVER_78100                      0
    default: IX     SYS_IOT_OVER_78129                      0
    default: OE     ACTION_TABLE                          132
    default: OE     CATEGORIES_TAB                         22
    default: OE     CUSTOMERS                             319
    default: OE     INVENTORIES                          1112
    default: OE     LINEITEM_TABLE                       2232
    default: OE     ORDERS                                105
    default: OE     ORDER_ITEMS                           665
    default: OE     PRODUCT_DESCRIPTIONS                 8640
    default: OE     PRODUCT_INFORMATION                   288
    default: OE     PRODUCT_REF_LIST_NESTEDTAB            288
    default: OE     PROMOTIONS                              2
    default: OE     PURCHASEORDER                         132
    default: OE     SUBCATEGORY_REF_LIST_NESTEDTAB         21
    default: OE     WAREHOUSES                              9
    default: PM     PRINT_MEDIA                             4
    default: PM     TEXTDOCS_NESTEDTAB                     12
    default: SH     CAL_MONTH_SALES_MV                     48
    default: SH     CHANNELS                                5
    default: SH     COSTS                                   0
    default: SH     COUNTRIES                              23
    default: SH     CUSTOMERS                           55500
    default: SH     DR$SUP_TEXT_IDX$B
    default: SH     DR$SUP_TEXT_IDX$C
    default: SH     DR$SUP_TEXT_IDX$I
    default: SH     DR$SUP_TEXT_IDX$K
    default: SH     DR$SUP_TEXT_IDX$N
    default: SH     DR$SUP_TEXT_IDX$Q
    default: SH     DR$SUP_TEXT_IDX$U
    default: SH     FWEEK_PSCAT_SALES_MV                11266
    default: SH     PRODUCTS                               72
    default: SH     PROMOTIONS                            503
    default: SH     SALES                              918843
    default: SH     SALES_TRANSACTIONS_EXT
    default: SH     SUPPLEMENTARY_DEMOGRAPHICS           4500
    default: SH     TIMES                                1826
    default: 
    default: 59 rows selected.
    default: 
    default: 
    default: Index cardinality (without  LOB indexes)
    default: 
    default: OWNER  INDEX_NAME                DISTINCT_KEYS   NUM_ROWS
    default: ------ ------------------------- ------------- ----------
    default: HR     COUNTRY_C_ID_PK                      25         25
    default: HR     DEPT_ID_PK                           27         27
    default: HR     DEPT_LOCATION_IX                      7         27
    default: HR     EMP_DEPARTMENT_IX                    11        106
    default: HR     EMP_EMAIL_UK                        107        107
    default: HR     EMP_EMP_ID_PK                       107        107
    default: HR     EMP_JOB_IX                           19        107
    default: HR     EMP_MANAGER_IX                       18        106
    default: HR     EMP_NAME_IX                         107        107
    default: HR     JHIST_DEPARTMENT_IX                   6         10
    default: HR     JHIST_EMPLOYEE_IX                     7         10
    default: HR     JHIST_EMP_ID_ST_DATE_PK              10         10
    default: HR     JHIST_JOB_IX                          8         10
    default: HR     JOB_ID_PK                            19         19
    default: HR     LOC_CITY_IX                          23         23
    default: HR     LOC_COUNTRY_IX                       14         23
    default: HR     LOC_ID_PK                            23         23
    default: HR     LOC_STATE_PROVINCE_IX                17         17
    default: HR     REG_ID_PK                             4          4
    default: IX     AQ$_STREAMS_QUEUE_TABLE_Y             0          0
    default: OE     ACTION_TABLE_MEMBERS                132        132
    default: OE     CUSTOMERS_PK                        319        319
    default: OE     CUST_ACCOUNT_MANAGER_IX               4        319
    default: OE     CUST_EMAIL_IX                       319        319
    default: OE     CUST_LNAME_IX                       176        319
    default: OE     CUST_UPPER_NAME_IX                  319        319
    default: OE     INVENTORY_IX                       1112       1112
    default: OE     INV_PRODUCT_IX                      208       1112
    default: OE     ITEM_ORDER_IX                       105        665
    default: OE     ITEM_PRODUCT_IX                     185        665
    default: OE     LINEITEM_TABLE_MEMBERS              132        132
    default: OE     ORDER_ITEMS_PK                      665        665
    default: OE     ORDER_ITEMS_UK                      665        665
    default: OE     ORDER_PK                            105        105
    default: OE     ORD_CUSTOMER_IX                      47        105
    default: OE     ORD_ORDER_DATE_IX                   105        105
    default: OE     ORD_SALES_REP_IX                      9         70
    default: OE     PRD_DESC_PK                        8640       8640
    default: OE     PRODUCT_INFORMATION_PK              288        288
    default: OE     PROD_NAME_IX                       3727       8640
    default: OE     PROD_SUPPLIER_IX                     62        288
    default: OE     PROMO_ID_PK                           2          2
    default: OE     WAREHOUSES_PK                         9          9
    default: OE     WHS_LOCATION_IX                       9          9
    default: PM     PRINTMEDIA_PK                         4          4
    default: SH     CHANNELS_PK                           5          5
    default: SH     COSTS_PROD_BIX                        0          0
    default: SH     COSTS_TIME_BIX                        0          0
    default: SH     COUNTRIES_PK                         23         23
    default: SH     CUSTOMERS_GENDER_BIX                  2          5
    default: SH     CUSTOMERS_MARITAL_BIX                11         18
    default: SH     CUSTOMERS_PK                      55500      55500
    default: SH     CUSTOMERS_YOB_BIX                    75         75
    default: SH     DR$SUP_TEXT_IDX$KD                    0          0
    default: SH     DR$SUP_TEXT_IDX$KR                    0          0
    default: SH     DR$SUP_TEXT_IDX$X                     0          0
    default: SH     FW_PSC_S_MV_CHAN_BIX                  4          4
    default: SH     FW_PSC_S_MV_PROMO_BIX                 4          4
    default: SH     FW_PSC_S_MV_SUBCAT_BIX               21         21
    default: SH     FW_PSC_S_MV_WD_BIX                  210        210
    default: SH     PRODUCTS_PK                          72         72
    default: SH     PRODUCTS_PROD_CAT_IX                  5         72
    default: SH     PRODUCTS_PROD_STATUS_BIX              1          1
    default: SH     PRODUCTS_PROD_SUBCAT_IX              21         72
    default: SH     PROMO_PK                            503        503
    default: SH     SALES_CHANNEL_BIX                     4         92
    default: SH     SALES_CUST_BIX                     7059      35808
    default: SH     SALES_PROD_BIX                       72       1074
    default: SH     SALES_PROMO_BIX                       4         54
    default: SH     SALES_TIME_BIX                     1460       1460
    default: SH     SUP_TEXT_IDX
    default: SH     TIMES_PK                           1826       1826
    default: 
    default: 72 rows selected.
    default: 
    default: SQL> Disconnected from Oracle Database 23c Free, Release 23.0.0.0.0 - Developer-Release
    default: Version 23.2.0.0.0
honglin@honglin-mac vagrant-oracle-database-23c-free % 
```

### Referece

参考:

[Oracle Database 23c Freeの簡易セットアップ](https://qiita.com/shakiyam/items/3dd28eee4c2d20fe66a6)

[vagrant-oracle-database-23c-free](https://github.com/shakiyam/vagrant-oracle-database-23c-free)


Have a good work&life! 2023/03 via LinHong


