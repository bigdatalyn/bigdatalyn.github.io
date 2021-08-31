D:\vagrant-master>cd rac

D:\vagrant-master\rac>dir
 Volume in drive D is 软件
 Volume Serial Number is 10FE-0EBB

 Directory of D:\vagrant-master\rac

2021/08/27  17:30    <DIR>          .
2021/08/27  17:30    <DIR>          ..
2021/08/27  17:30    <DIR>          ol7_121
2021/08/27  17:30    <DIR>          ol7_122
2021/08/27  17:30    <DIR>          ol7_183
2021/08/27  17:30    <DIR>          ol7_19
2021/08/27  17:30    <DIR>          ol7_21
2021/08/27  17:30    <DIR>          ol8_19
2021/08/27  17:30    <DIR>          ol8_21
2021/08/27  01:01               250 README.md
               1 File(s)            250 bytes
               9 Dir(s)  393,722,683,392 bytes free

D:\vagrant-master\rac>cd ol8_21

D:\vagrant-master\rac\ol8_21>dir
 Volume in drive D is 软件
 Volume Serial Number is 10FE-0EBB

 Directory of D:\vagrant-master\rac\ol8_21

2021/08/27  17:30    <DIR>          .
2021/08/27  17:30    <DIR>          ..
2021/08/27  17:30    <DIR>          config
2021/08/27  17:30    <DIR>          dns
2021/08/27  17:30    <DIR>          node1
2021/08/27  17:30    <DIR>          node2
2021/08/27  01:01             7,503 README.md
2021/08/27  17:30    <DIR>          shared_scripts
2021/08/27  17:30    <DIR>          software
               1 File(s)          7,503 bytes
               8 Dir(s)  393,722,683,392 bytes free

D:\vagrant-master\rac\ol8_21>cd dns

D:\vagrant-master\rac\ol8_21\dns>vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Box 'oraclebase/oracle-8' could not be found. Attempting to find and install...
    default: Box Provider: virtualbox
    default: Box Version: >= 0
==> default: Loading metadata for box 'oraclebase/oracle-8'
    default: URL: https://vagrantcloud.com/oraclebase/oracle-8
==> default: Adding box 'oraclebase/oracle-8' (v2021.07.29) for provider: virtualbox
    default: Downloading: https://vagrantcloud.com/oraclebase/boxes/oracle-8/versions/2021.07.29/providers/virtualbox.box
    default:
    default: Calculating and comparing box checksum...
==> default: Successfully added box 'oraclebase/oracle-8' (v2021.07.29) for 'virtualbox'!
==> default: Importing base box 'oraclebase/oracle-8'...
==> default: Matching MAC address for NAT networking...
==> default: Checking if box 'oraclebase/oracle-8' version '2021.07.29' is up to date...
==> default: Setting the name of the VM: ol8_21_dns
Vagrant is currently configured to create VirtualBox synced folders with
the `SharedFoldersEnableSymlinksCreate` option enabled. If the Vagrant
guest is not trusted, you may want to disable this option. For more
information on this option, please refer to the VirtualBox manual:

  https://www.virtualbox.org/manual/ch04.html#sharedfolders

This option can be disabled globally with an environment variable:

  VAGRANT_DISABLE_VBOXSYMLINKCREATE=1

or on a per folder basis within the Vagrantfile:

  config.vm.synced_folder '/host/path', '/guest/path', SharedFoldersEnableSymlinksCreate: false
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
    default: Adapter 1: nat
    default: Adapter 2: hostonly
==> default: Forwarding ports...
    default: 22 (guest) => 2222 (host) (adapter 1)
==> default: Running 'pre-boot' VM customizations...
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2222
    default: SSH username: vagrant
    default: SSH auth method: private key
    default:
    default: Vagrant insecure key detected. Vagrant will automatically replace
    default: this with a newly generated keypair for better security.
    default:
    default: Inserting generated public key within guest...
    default: Removing insecure key from the guest if it's present...
    default: Key inserted! Disconnecting and reconnecting using new SSH key...
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
==> default: Configuring and enabling network interfaces...
==> default: Mounting shared folders...
    default: /vagrant => D:/vagrant-master/rac/ol8_21/dns
    default: /vagrant_config => D:/vagrant-master/rac/ol8_21/config
    default: /vagrant_scripts => D:/vagrant-master/rac/ol8_21/shared_scripts
==> default: Running provisioner: shell...
    default: Running: inline script
    default: ******************************************************************************
    default: Setup Start. Fri Aug 27 09:41:45 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: /vagrant_config/install.env: line 64: -1: substring expression < 0
    default: Set root password and configure networking. Fri Aug 27 09:41:45 UTC 2021
    default: ******************************************************************************
    default: Changing password for user root.
    default: passwd: all authentication tokens updated successfully.
    default: ******************************************************************************
    default: Amend hosts file with public, private and virtual IPs. Fri Aug 27 09:41:45 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Amend hosts file with SCAN IPs. Fri Aug 27 09:41:45 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Firewall. Fri Aug 27 09:41:45 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Install dnsmasq. Fri Aug 27 09:41:45 UTC 2021
    default: ******************************************************************************
    default: Oracle Linux 8 BaseOS Latest (x86_64)           5.0 MB/s |  34 MB     00:06
    default: Oracle Linux 8 Application Stream (x86_64)      4.4 MB/s |  26 MB     00:06
    default: Latest Unbreakable Enterprise Kernel Release 6  5.3 MB/s |  27 MB     00:05
    default: Last metadata expiration check: 0:00:03 ago on Fri 27 Aug 2021 09:42:18 AM UTC.
    default: Dependencies resolved.
    default: ================================================================================
    default:  Package         Architecture   Version             Repository             Size
    default: ================================================================================
    default: Installing:
    default:  dnsmasq         x86_64         2.79-15.el8         ol8_appstream         318 k
    default:
    default: Transaction Summary
    default: ================================================================================
    default: Install  1 Package
    default:
    default: Total download size: 318 k
    default: Installed size: 647 k
    default: Downloading Packages:
    default: dnsmasq-2.79-15.el8.x86_64.rpm                  535 kB/s | 318 kB     00:00
    default: --------------------------------------------------------------------------------
    default: Total                                           533 kB/s | 318 kB     00:00
    default: Running transaction check
    default: Transaction check succeeded.
    default: Running transaction test
    default: Transaction test succeeded.
    default: Running transaction
    default:   Preparing        :                                                        1/1
    default:   Running scriptlet: dnsmasq-2.79-15.el8.x86_64                             1/1
    default:   Installing       : dnsmasq-2.79-15.el8.x86_64                             1/1
    default:   Running scriptlet: dnsmasq-2.79-15.el8.x86_64                             1/1
    default: /sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
    default:
    default:   Verifying        : dnsmasq-2.79-15.el8.x86_64                             1/1
    default:
    default: Installed:
    default:   dnsmasq-2.79-15.el8.x86_64
    default:
    default: Complete!
    default: New password: Retype new password: Created symlink /etc/systemd/system/multi-user.target.wants/dnsmasq.service → /usr/lib/systemd/system/dnsmasq.service.
    default: ******************************************************************************
    default: Setup End. Fri Aug 27 09:42:54 UTC 2021
    default: ******************************************************************************

D:\vagrant-master\rac\ol8_21\dns>
D:\vagrant-master\rac\ol8_21\dns>
D:\vagrant-master\rac\ol8_21\dns>cd ../node2

D:\vagrant-master\rac\ol8_21\node2>vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Importing base box 'oraclebase/oracle-8'...
==> default: Matching MAC address for NAT networking...
==> default: Checking if box 'oraclebase/oracle-8' version '2021.07.29' is up to date...
==> default: Setting the name of the VM: ol8_21_rac2
==> default: Fixed port collision for 22 => 2222. Now on port 2200.
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
    default: Adapter 1: nat
    default: Adapter 2: hostonly
    default: Adapter 3: intnet
==> default: Forwarding ports...
    default: 1521 (guest) => 1522 (host) (adapter 1)
    default: 5500 (guest) => 5502 (host) (adapter 1)
    default: 22 (guest) => 2200 (host) (adapter 1)
==> default: Running 'pre-boot' VM customizations...
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2200
    default: SSH username: vagrant
    default: SSH auth method: private key
    default:
    default: Vagrant insecure key detected. Vagrant will automatically replace
    default: this with a newly generated keypair for better security.
    default:
    default: Inserting generated public key within guest...
    default: Removing insecure key from the guest if it's present...
    default: Key inserted! Disconnecting and reconnecting using new SSH key...
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
==> default: Configuring and enabling network interfaces...
==> default: Mounting shared folders...
    default: /vagrant => D:/vagrant-master/rac/ol8_21/node2
    default: /vagrant_config => D:/vagrant-master/rac/ol8_21/config
    default: /vagrant_scripts => D:/vagrant-master/rac/ol8_21/shared_scripts
    default: /vagrant_software => D:/vagrant-master/rac/ol8_21/software
==> default: Running provisioner: shell...
    default: Running: inline script
    default: ******************************************************************************
    default: Setup Start. Fri Aug 27 09:59:52 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Prepare /u01 disk. Fri Aug 27 09:59:52 UTC 2021
    default: ******************************************************************************
    default:
    default: Welcome to fdisk (util-linux 2.32.1).
    default: Changes will remain in memory only, until you decide to write them.
    default: Be careful before using the write command.
    default:
    default: Device does not contain a recognized partition table.
    default: Created a new DOS disklabel with disk identifier 0xf64e5882.
    default:
    default: Command (m for help): Partition type
    default:    p   primary (0 primary, 0 extended, 4 free)
    default:    e   extended (container for logical partitions)
    default: Select (default p): Partition number (1-4, default 1): First sector (2048-209715199, default 2048): Last sector, +sectors or +size{K,M,G,T,P} (2048-209715199, default 209715199):
    default: Created a new partition 1 of type 'Linux' and of size 100 GiB.
    default:
    default: Command (m for help): The partition table has been altered.
    default: Calling ioctl() to re-read partition table.
    default: Syncing disks.
    default:
    default: meta-data=/dev/sdb1              isize=512    agcount=4, agsize=6553536 blks
    default:          =                       sectsz=512   attr=2, projid32bit=1
    default:          =                       crc=1        finobt=1, sparse=1, rmapbt=0
    default:          =                       reflink=1
    default: data     =                       bsize=4096   blocks=26214144, imaxpct=25
    default:          =                       sunit=0      swidth=0 blks
    default: naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
    default: log      =internal log           bsize=4096   blocks=12799, version=2
    default:          =                       sectsz=512   sunit=0 blks, lazy-count=1
    default: realtime =none                   extsz=4096   blocks=0, rtextents=0
    default: ******************************************************************************
    default: Prepare yum repos and install base packages. Fri Aug 27 09:59:54 UTC 2021
    default: ******************************************************************************
    default: Oracle Linux 8 BaseOS Latest (x86_64)           5.8 MB/s |  34 MB     00:05
    default: Oracle Linux 8 Application Stream (x86_64)      4.8 MB/s |  26 MB     00:05
    default: Latest Unbreakable Enterprise Kernel Release 6  5.4 MB/s |  27 MB     00:04
    default: Last metadata expiration check: 0:00:03 ago on Fri 27 Aug 2021 10:00:27 AM UTC.
    default: Package yum-utils-4.0.18-4.el8.noarch is already installed.
    default: Package zip-3.0-23.el8.x86_64 is already installed.
    default: Package unzip-6.0-45.el8_4.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:00:06 ago on Fri 27 Aug 2021 10:00:27 AM UTC.
    default: Dependencies resolved.
    default: ================================================================================
    default:  Package                    Arch      Version        Repository            Size
    default: ================================================================================
    default: Installing:
    default:  oracle-epel-release-el8    x86_64    1.0-3.el8      ol8_baseos_latest     15 k
    default:
    default: Transaction Summary
    default: ================================================================================
    default: Install  1 Package
    default:
    default: Total download size: 15 k
    default: Installed size: 18 k
    default: Downloading Packages:
    default: oracle-epel-release-el8-1.0-3.el8.x86_64.rpm     52 kB/s |  15 kB     00:00
    default: --------------------------------------------------------------------------------
    default: Total                                            51 kB/s |  15 kB     00:00
    default: Running transaction check
    default: Transaction check succeeded.
    default: Running transaction test
    default: Transaction test succeeded.
    default: Running transaction
    default:   Preparing        :                                                        1/1
    default:   Installing       : oracle-epel-release-el8-1.0-3.el8.x86_64               1/1
    default:   Verifying        : oracle-epel-release-el8-1.0-3.el8.x86_64               1/1
    default:
    default: Installed:
    default:   oracle-epel-release-el8-1.0-3.el8.x86_64
    default:
    default: Complete!
    default: Oracle Linux 8 EPEL Packages for Development (x 5.8 MB/s |  19 MB     00:03
    default: Last metadata expiration check: 0:00:05 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Dependencies resolved.
    default: ================================================================================
    default:  Package        Architecture  Version           Repository                 Size
    default: ================================================================================
    default: Installing:
    default:  sshpass        x86_64        1.06-9.el8        ol8_developer_EPEL         28 k
    default:
    default: Transaction Summary
    default: ================================================================================
    default: Install  1 Package
    default:
    default: Total download size: 28 k
    default: Installed size: 40 k
    default: Downloading Packages:
    default: sshpass-1.06-9.el8.x86_64.rpm                    15 kB/s |  28 kB     00:01
    default: --------------------------------------------------------------------------------
    default: Total                                            15 kB/s |  28 kB     00:01
    default: Running transaction check
    default: Transaction check succeeded.
    default: Running transaction test
    default: Transaction test succeeded.
    default: Running transaction
    default:   Preparing        :                                                        1/1
    default:   Installing       : sshpass-1.06-9.el8.x86_64                              1/1
    default:   Running scriptlet: sshpass-1.06-9.el8.x86_64                              1/1
    default: /sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
    default:
    default:   Verifying        : sshpass-1.06-9.el8.x86_64                              1/1
    default:
    default: Installed:
    default:   sshpass-1.06-9.el8.x86_64
    default:
    default: Complete!
    default: Last metadata expiration check: 0:00:12 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Dependencies resolved.
    default: ==================================================================================================
    default:  Package                          Arch    Version                         Repository          Size
    default: ==================================================================================================
    default: Installing:
    default:  oracle-database-preinstall-21c   x86_64  1.0-1.el8                       ol8_appstream       30 k
    default: Installing dependencies:
    default:  bind-libs                        x86_64  32:9.11.26-4.el8_4              ol8_appstream      174 k
    default:  bind-libs-lite                   x86_64  32:9.11.26-4.el8_4              ol8_appstream      1.2 M
    default:  bind-license                     noarch  32:9.11.26-4.el8_4              ol8_appstream      102 k
    default:  bind-utils                       x86_64  32:9.11.26-4.el8_4              ol8_appstream      451 k
    default:  compat-openssl10                 x86_64  1:1.0.2o-3.el8                  ol8_appstream      1.1 M
    default:  fstrm                            x86_64  0.6.0-3.el8.1                   ol8_appstream       29 k
    default:  ksh                              x86_64  20120801-254.0.1.el8            ol8_appstream      927 k
    default:  libICE                           x86_64  1.0.9-15.el8                    ol8_appstream       74 k
    default:  libSM                            x86_64  1.2.3-1.el8                     ol8_appstream       47 k
    default:  libX11                           x86_64  1.6.8-4.el8                     ol8_appstream      611 k
    default:  libX11-common                    noarch  1.6.8-4.el8                     ol8_appstream      158 k
    default:  libX11-xcb                       x86_64  1.6.8-4.el8                     ol8_appstream       14 k
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
    default:  libaio                           x86_64  0.3.112-1.el8                   ol8_baseos_latest   33 k
    default:  libdmx                           x86_64  1.1.4-3.el8                     ol8_appstream       22 k
    default:  libnsl                           x86_64  2.28-151.0.1.el8                ol8_baseos_latest  102 k
    default:  libxcb                           x86_64  1.13.1-1.el8                    ol8_appstream      231 k
    default:  lm_sensors-libs                  x86_64  3.4.0-22.20180522git70f7e08.el8 ol8_baseos_latest   59 k
    default:  protobuf-c                       x86_64  1.3.0-6.el8                     ol8_appstream       37 k
    default:  python3-bind                     noarch  32:9.11.26-4.el8_4              ol8_appstream      149 k
    default:  smartmontools                    x86_64  1:7.1-1.el8                     ol8_baseos_latest  544 k
    default:  sysstat                          x86_64  11.7.3-5.0.1.el8                ol8_appstream      425 k
    default:  xorg-x11-utils                   x86_64  7.5-28.el8                      ol8_appstream      136 k
    default:  xorg-x11-xauth                   x86_64  1:1.0.9-12.el8                  ol8_appstream       39 k
    default:
    default: Transaction Summary
    default: ==================================================================================================
    default: Install  38 Packages
    default:
    default: Total download size: 7.2 M
    default: Installed size: 21 M
    default: Downloading Packages:
    default: (1/38): libaio-0.3.112-1.el8.x86_64.rpm          83 kB/s |  33 kB     00:00
    default: (2/38): lm_sensors-libs-3.4.0-22.20180522git70f 142 kB/s |  59 kB     00:00
    default: (3/38): libnsl-2.28-151.0.1.el8.x86_64.rpm      215 kB/s | 102 kB     00:00
    default: (4/38): bind-libs-9.11.26-4.el8_4.x86_64.rpm    634 kB/s | 174 kB     00:00
    default: (5/38): bind-license-9.11.26-4.el8_4.noarch.rpm 766 kB/s | 102 kB     00:00
    default: (6/38): smartmontools-7.1-1.el8.x86_64.rpm      1.1 MB/s | 544 kB     00:00
    default: (7/38): bind-libs-lite-9.11.26-4.el8_4.x86_64.r 2.7 MB/s | 1.2 MB     00:00
    default: (8/38): fstrm-0.6.0-3.el8.1.x86_64.rpm          259 kB/s |  29 kB     00:00
    default: (9/38): bind-utils-9.11.26-4.el8_4.x86_64.rpm   1.5 MB/s | 451 kB     00:00
    default: (10/38): compat-openssl10-1.0.2o-3.el8.x86_64.r 3.4 MB/s | 1.1 MB     00:00
    default: (11/38): ksh-20120801-254.0.1.el8.x86_64.rpm    4.0 MB/s | 927 kB     00:00
    default: (12/38): libSM-1.2.3-1.el8.x86_64.rpm           449 kB/s |  47 kB     00:00
    default: (13/38): libICE-1.0.9-15.el8.x86_64.rpm         362 kB/s |  74 kB     00:00
    default: (14/38): libX11-xcb-1.6.8-4.el8.x86_64.rpm      145 kB/s |  14 kB     00:00
    default: (15/38): libX11-common-1.6.8-4.el8.noarch.rpm   1.5 MB/s | 158 kB     00:00
    default: (16/38): libX11-1.6.8-4.el8.x86_64.rpm          3.4 MB/s | 611 kB     00:00
    default: (17/38): libXau-1.0.9-3.el8.x86_64.rpm          427 kB/s |  37 kB     00:00
    default: (18/38): libXext-1.3.4-1.el8.x86_64.rpm         542 kB/s |  45 kB     00:00
    default: (19/38): libXcomposite-0.4.4-14.el8.x86_64.rpm  239 kB/s |  28 kB     00:00
    default: (20/38): libXi-1.7.10-1.el8.x86_64.rpm          491 kB/s |  49 kB     00:00
    default: (21/38): libXinerama-1.1.4-1.el8.x86_64.rpm     160 kB/s |  15 kB     00:00
    default: (22/38): libXmu-1.1.3-1.el8.x86_64.rpm          502 kB/s |  75 kB     00:00
    default: (23/38): libXrandr-1.5.2-1.el8.x86_64.rpm       342 kB/s |  34 kB     00:00
    default: (24/38): libXrender-0.9.10-7.el8.x86_64.rpm     359 kB/s |  33 kB     00:00
    default: (25/38): libXt-1.1.5-12.el8.x86_64.rpm          1.7 MB/s | 185 kB     00:00
    default: (26/38): libXtst-1.2.3-7.el8.x86_64.rpm         212 kB/s |  22 kB     00:00
    default: (27/38): libXv-1.0.11-7.el8.x86_64.rpm          202 kB/s |  20 kB     00:00
    default: (28/38): libXxf86vm-1.1.4-9.el8.x86_64.rpm      221 kB/s |  19 kB     00:00
    default: (29/38): libXxf86dga-1.1.5-1.el8.x86_64.rpm     271 kB/s |  26 kB     00:00
    default: (30/38): libXxf86misc-1.0.4-1.el8.x86_64.rpm    236 kB/s |  23 kB     00:00
    default: (31/38): libdmx-1.1.4-3.el8.x86_64.rpm          254 kB/s |  22 kB     00:00
    default: (32/38): oracle-database-preinstall-21c-1.0-1.e 322 kB/s |  30 kB     00:00
    default: (33/38): libxcb-1.13.1-1.el8.x86_64.rpm         2.0 MB/s | 231 kB     00:00
    default: (34/38): protobuf-c-1.3.0-6.el8.x86_64.rpm      408 kB/s |  37 kB     00:00
    default: (35/38): python3-bind-9.11.26-4.el8_4.noarch.rp 1.2 MB/s | 149 kB     00:00
    default: (36/38): sysstat-11.7.3-5.0.1.el8.x86_64.rpm    2.5 MB/s | 425 kB     00:00
    default: (37/38): xorg-x11-utils-7.5-28.el8.x86_64.rpm   939 kB/s | 136 kB     00:00
    default: (38/38): xorg-x11-xauth-1.0.9-12.el8.x86_64.rpm 389 kB/s |  39 kB     00:00
    default: --------------------------------------------------------------------------------
    default: Total                                           3.2 MB/s | 7.2 MB     00:02
    default: Running transaction check
    default: Transaction check succeeded.
    default: Running transaction test
    default: Transaction test succeeded.
    default: Running transaction
    default:   Preparing        :                                                        1/1
    default:   Installing       : protobuf-c-1.3.0-6.el8.x86_64                         1/38
    default:   Installing       : fstrm-0.6.0-3.el8.1.x86_64                            2/38
    default:   Installing       : bind-license-32:9.11.26-4.el8_4.noarch                3/38
    default:   Installing       : bind-libs-lite-32:9.11.26-4.el8_4.x86_64              4/38
    default:   Installing       : libXau-1.0.9-3.el8.x86_64                             5/38
    default:   Installing       : libxcb-1.13.1-1.el8.x86_64                            6/38
    default:   Installing       : libICE-1.0.9-15.el8.x86_64                            7/38
    default:   Installing       : libSM-1.2.3-1.el8.x86_64                              8/38
    default:   Installing       : bind-libs-32:9.11.26-4.el8_4.x86_64                   9/38
    default:   Installing       : python3-bind-32:9.11.26-4.el8_4.noarch               10/38
    default:   Installing       : bind-utils-32:9.11.26-4.el8_4.x86_64                 11/38
    default:   Installing       : libX11-xcb-1.6.8-4.el8.x86_64                        12/38
    default:   Installing       : libX11-common-1.6.8-4.el8.noarch                     13/38
    default:   Installing       : libX11-1.6.8-4.el8.x86_64                            14/38
    default:   Installing       : libXext-1.3.4-1.el8.x86_64                           15/38
    default:   Installing       : libXi-1.7.10-1.el8.x86_64                            16/38
    default:   Installing       : libXrender-0.9.10-7.el8.x86_64                       17/38
    default:   Installing       : libXrandr-1.5.2-1.el8.x86_64                         18/38
    default:   Installing       : libXtst-1.2.3-7.el8.x86_64                           19/38
    default:   Installing       : libXinerama-1.1.4-1.el8.x86_64                       20/38
    default:   Installing       : libXv-1.0.11-7.el8.x86_64                            21/38
    default:   Installing       : libXxf86dga-1.1.5-1.el8.x86_64                       22/38
    default:   Installing       : libXxf86misc-1.0.4-1.el8.x86_64                      23/38
    default:   Installing       : libXxf86vm-1.1.4-9.el8.x86_64                        24/38
    default:   Installing       : libdmx-1.1.4-3.el8.x86_64                            25/38
    default:   Installing       : libXcomposite-0.4.4-14.el8.x86_64                    26/38
    default:   Installing       : xorg-x11-utils-7.5-28.el8.x86_64                     27/38
    default:   Installing       : libXt-1.1.5-12.el8.x86_64                            28/38
    default:   Installing       : libXmu-1.1.3-1.el8.x86_64                            29/38
    default:   Installing       : xorg-x11-xauth-1:1.0.9-12.el8.x86_64                 30/38
    default:   Installing       : ksh-20120801-254.0.1.el8.x86_64                      31/38
    default:   Running scriptlet: ksh-20120801-254.0.1.el8.x86_64                      31/38
    default:   Installing       : compat-openssl10-1:1.0.2o-3.el8.x86_64               32/38
    default:   Running scriptlet: compat-openssl10-1:1.0.2o-3.el8.x86_64               32/38
    default: /sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
    default:
    default:   Running scriptlet: smartmontools-1:7.1-1.el8.x86_64                     33/38
    default:   Installing       : smartmontools-1:7.1-1.el8.x86_64                     33/38
    default:   Running scriptlet: smartmontools-1:7.1-1.el8.x86_64                     33/38
    default:   Installing       : lm_sensors-libs-3.4.0-22.20180522git70f7e08.el8.x8   34/38
    default:   Running scriptlet: lm_sensors-libs-3.4.0-22.20180522git70f7e08.el8.x8   34/38
    default: /sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
    default:
    default:   Installing       : sysstat-11.7.3-5.0.1.el8.x86_64                      35/38
    default:   Running scriptlet: sysstat-11.7.3-5.0.1.el8.x86_64                      35/38
    default:   Installing       : libnsl-2.28-151.0.1.el8.x86_64                       36/38
    default:   Installing       : libaio-0.3.112-1.el8.x86_64                          37/38
    default:   Installing       : oracle-database-preinstall-21c-1.0-1.el8.x86_64      38/38
    default:   Running scriptlet: oracle-database-preinstall-21c-1.0-1.el8.x86_64      38/38
    default: /sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
    default:
    default:   Verifying        : libaio-0.3.112-1.el8.x86_64                           1/38
    default:   Verifying        : libnsl-2.28-151.0.1.el8.x86_64                        2/38
    default:   Verifying        : lm_sensors-libs-3.4.0-22.20180522git70f7e08.el8.x8    3/38
    default:   Verifying        : smartmontools-1:7.1-1.el8.x86_64                      4/38
    default:   Verifying        : bind-libs-32:9.11.26-4.el8_4.x86_64                   5/38
    default:   Verifying        : bind-libs-lite-32:9.11.26-4.el8_4.x86_64              6/38
    default:   Verifying        : bind-license-32:9.11.26-4.el8_4.noarch                7/38
    default:   Verifying        : bind-utils-32:9.11.26-4.el8_4.x86_64                  8/38
    default:   Verifying        : compat-openssl10-1:1.0.2o-3.el8.x86_64                9/38
    default:   Verifying        : fstrm-0.6.0-3.el8.1.x86_64                           10/38
    default:   Verifying        : ksh-20120801-254.0.1.el8.x86_64                      11/38
    default:   Verifying        : libICE-1.0.9-15.el8.x86_64                           12/38
    default:   Verifying        : libSM-1.2.3-1.el8.x86_64                             13/38
    default:   Verifying        : libX11-1.6.8-4.el8.x86_64                            14/38
    default:   Verifying        : libX11-common-1.6.8-4.el8.noarch                     15/38
    default:   Verifying        : libX11-xcb-1.6.8-4.el8.x86_64                        16/38
    default:   Verifying        : libXau-1.0.9-3.el8.x86_64                            17/38
    default:   Verifying        : libXcomposite-0.4.4-14.el8.x86_64                    18/38
    default:   Verifying        : libXext-1.3.4-1.el8.x86_64                           19/38
    default:   Verifying        : libXi-1.7.10-1.el8.x86_64                            20/38
    default:   Verifying        : libXinerama-1.1.4-1.el8.x86_64                       21/38
    default:   Verifying        : libXmu-1.1.3-1.el8.x86_64                            22/38
    default:   Verifying        : libXrandr-1.5.2-1.el8.x86_64                         23/38
    default:   Verifying        : libXrender-0.9.10-7.el8.x86_64                       24/38
    default:   Verifying        : libXt-1.1.5-12.el8.x86_64                            25/38
    default:   Verifying        : libXtst-1.2.3-7.el8.x86_64                           26/38
    default:   Verifying        : libXv-1.0.11-7.el8.x86_64                            27/38
    default:   Verifying        : libXxf86dga-1.1.5-1.el8.x86_64                       28/38
    default:   Verifying        : libXxf86misc-1.0.4-1.el8.x86_64                      29/38
    default:   Verifying        : libXxf86vm-1.1.4-9.el8.x86_64                        30/38
    default:   Verifying        : libdmx-1.1.4-3.el8.x86_64                            31/38
    default:   Verifying        : libxcb-1.13.1-1.el8.x86_64                           32/38
    default:   Verifying        : oracle-database-preinstall-21c-1.0-1.el8.x86_64      33/38
    default:   Verifying        : protobuf-c-1.3.0-6.el8.x86_64                        34/38
    default:   Verifying        : python3-bind-32:9.11.26-4.el8_4.noarch               35/38
    default:   Verifying        : sysstat-11.7.3-5.0.1.el8.x86_64                      36/38
    default:   Verifying        : xorg-x11-utils-7.5-28.el8.x86_64                     37/38
    default:   Verifying        : xorg-x11-xauth-1:1.0.9-12.el8.x86_64                 38/38
    default:
    default: Installed:
    default:   bind-libs-32:9.11.26-4.el8_4.x86_64
    default:   bind-libs-lite-32:9.11.26-4.el8_4.x86_64
    default:   bind-license-32:9.11.26-4.el8_4.noarch
    default:   bind-utils-32:9.11.26-4.el8_4.x86_64
    default:   compat-openssl10-1:1.0.2o-3.el8.x86_64
    default:   fstrm-0.6.0-3.el8.1.x86_64
    default:   ksh-20120801-254.0.1.el8.x86_64
    default:   libICE-1.0.9-15.el8.x86_64
    default:   libSM-1.2.3-1.el8.x86_64
    default:   libX11-1.6.8-4.el8.x86_64
    default:   libX11-common-1.6.8-4.el8.noarch
    default:   libX11-xcb-1.6.8-4.el8.x86_64
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
    default:   libaio-0.3.112-1.el8.x86_64
    default:   libdmx-1.1.4-3.el8.x86_64
    default:   libnsl-2.28-151.0.1.el8.x86_64
    default:   libxcb-1.13.1-1.el8.x86_64
    default:   lm_sensors-libs-3.4.0-22.20180522git70f7e08.el8.x86_64
    default:   oracle-database-preinstall-21c-1.0-1.el8.x86_64
    default:   protobuf-c-1.3.0-6.el8.x86_64
    default:   python3-bind-32:9.11.26-4.el8_4.noarch
    default:   smartmontools-1:7.1-1.el8.x86_64
    default:   sysstat-11.7.3-5.0.1.el8.x86_64
    default:   xorg-x11-utils-7.5-28.el8.x86_64
    default:   xorg-x11-xauth-1:1.0.9-12.el8.x86_64
    default:
    default: Complete!
    default: ******************************************************************************
    default: Add extra OS packages. Most should be present. Fri Aug 27 10:01:19 UTC 2021
    default: ******************************************************************************
    default: Last metadata expiration check: 0:00:40 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package bc-1.07.1-5.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:00:43 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package binutils-2.30-93.0.2.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:00:45 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package compat-openssl10-1:1.0.2o-3.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:00:48 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package elfutils-libelf-0.182-3.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:00:50 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package glibc-2.28-151.0.1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:00:52 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package glibc-devel-2.28-151.0.1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:00:55 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package ksh-20120801-254.0.1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:00:57 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libaio-0.3.112-1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:00:59 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libXrender-0.9.10-7.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:02 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libX11-1.6.8-4.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:04 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libXau-1.0.9-3.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:06 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libXi-1.7.10-1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:09 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libXtst-1.2.3-7.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:11 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libgcc-8.4.1-1.0.1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:14 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libnsl-2.28-151.0.1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:16 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libstdc++-8.4.1-1.0.1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:19 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libxcb-1.13.1-1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:21 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libibverbs-32.0-4.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:23 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package make-1:4.2.1-10.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:25 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package policycoreutils-2.9-14.0.1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:28 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package policycoreutils-python-utils-2.9-14.0.1.el8.noarch is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:30 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package smartmontools-1:7.1-1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:33 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package sysstat-11.7.3-5.0.1.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:35 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package libnsl2-1.2.0-2.20180605git4a062cf.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:37 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: No match for argument: libnsl2-devel
    default: Error: Unable to find a match: libnsl2-devel
    default: Last metadata expiration check: 0:01:39 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package net-tools-2.0-0.52.20160912git.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: Nothing to do.
    default: Complete!
    default: Last metadata expiration check: 0:01:41 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Package nfs-utils-1:2.3.3-41.el8.x86_64 is already installed.
    default: Dependencies resolved.
    default: ================================================================================
    default:  Package       Arch       Version                   Repository             Size
    default: ================================================================================
    default: Upgrading:
    default:  nfs-utils     x86_64     1:2.3.3-41.el8_4.2        ol8_baseos_latest     498 k
    default:
    default: Transaction Summary
    default: ================================================================================
    default: Upgrade  1 Package
    default:
    default: Total download size: 498 k
    default: Downloading Packages:
    default: nfs-utils-2.3.3-41.el8_4.2.x86_64.rpm           684 kB/s | 498 kB     00:00
    default: --------------------------------------------------------------------------------
    default: Total                                           682 kB/s | 498 kB     00:00
    default: Running transaction check
    default: Transaction check succeeded.
    default: Running transaction test
    default: Transaction test succeeded.
    default: Running transaction
    default:   Preparing        :                                                        1/1
    default:   Running scriptlet: nfs-utils-1:2.3.3-41.el8_4.2.x86_64                    1/1
    default:   Running scriptlet: nfs-utils-1:2.3.3-41.el8_4.2.x86_64                    1/2
    default:   Upgrading        : nfs-utils-1:2.3.3-41.el8_4.2.x86_64                    1/2
    default:   Running scriptlet: nfs-utils-1:2.3.3-41.el8_4.2.x86_64                    1/2
    default:   Running scriptlet: nfs-utils-1:2.3.3-41.el8.x86_64                        2/2
    default:   Cleanup          : nfs-utils-1:2.3.3-41.el8.x86_64                        2/2
    default:   Running scriptlet: nfs-utils-1:2.3.3-41.el8.x86_64                        2/2
    default: /sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
    default:
    default: /sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
    default:
    default:   Verifying        : nfs-utils-1:2.3.3-41.el8_4.2.x86_64                    1/2
    default:   Verifying        : nfs-utils-1:2.3.3-41.el8.x86_64                        2/2
    default:
    default: Upgraded:
    default:   nfs-utils-1:2.3.3-41.el8_4.2.x86_64
    default:
    default: Complete!
    default: Last metadata expiration check: 0:01:46 ago on Fri 27 Aug 2021 10:00:39 AM UTC.
    default: Dependencies resolved.
    default: ================================================================================
    default:  Package           Arch        Version             Repository              Size
    default: ================================================================================
    default: Installing:
    default:  unixODBC          x86_64      2.3.7-1.el8         ol8_appstream          458 k
    default: Installing dependencies:
    default:  libtool-ltdl      x86_64      2.4.6-25.el8        ol8_baseos_latest       58 k
    default:
    default: Transaction Summary
    default: ================================================================================
    default: Install  2 Packages
    default:
    default: Total download size: 516 k
    default: Installed size: 1.6 M
    default: Downloading Packages:
    default: (1/2): libtool-ltdl-2.4.6-25.el8.x86_64.rpm     156 kB/s |  58 kB     00:00
    default: (2/2): unixODBC-2.3.7-1.el8.x86_64.rpm          709 kB/s | 458 kB     00:00
    default: --------------------------------------------------------------------------------
    default: Total                                           795 kB/s | 516 kB     00:00
    default: Running transaction check
    default: Transaction check succeeded.
    default: Running transaction test
    default: Transaction test succeeded.
    default: Running transaction
    default:   Preparing        :                                                        1/1
    default:   Installing       : libtool-ltdl-2.4.6-25.el8.x86_64                       1/2
    default:   Running scriptlet: libtool-ltdl-2.4.6-25.el8.x86_64                       1/2
    default: /sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
    default:
    default:   Installing       : unixODBC-2.3.7-1.el8.x86_64                            2/2
    default:   Running scriptlet: unixODBC-2.3.7-1.el8.x86_64                            2/2
    default: /sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
    default:
    default: /sbin/ldconfig: /etc/ld.so.conf.d/kernel-5.4.17-2102.201.3.el8uek.x86_64.conf:6: hwcap directive ignored
    default:
    default:   Verifying        : libtool-ltdl-2.4.6-25.el8.x86_64                       1/2
    default:   Verifying        : unixODBC-2.3.7-1.el8.x86_64                            2/2
    default:
    default: Installed:
    default:   libtool-ltdl-2.4.6-25.el8.x86_64          unixODBC-2.3.7-1.el8.x86_64
    default:
    default: Complete!
    default: ******************************************************************************
    default: Firewall. Fri Aug 27 10:02:29 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: SELinux. Fri Aug 27 10:02:29 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Set root and oracle password and change ownership of /u01. Fri Aug 27 10:02:29 UTC 2021
    default: ******************************************************************************
    default: Changing password for user root.
    default: passwd: all authentication tokens updated successfully.
    default: Changing password for user oracle.
    default: passwd: all authentication tokens updated successfully.
    default: ******************************************************************************
    default: Amend hosts file with public, private and virtual IPs. Fri Aug 27 10:02:30 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Enable chronyd service. Fri Aug 27 10:02:30 UTC 2021
    default: ******************************************************************************
    default: 503 No such source
    default: 200 OK
    default: ******************************************************************************
    default: Configure shared disks. Fri Aug 27 10:02:30 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Partition disks. Fri Aug 27 10:02:30 UTC 2021
    default: ******************************************************************************
    default:
    default: Welcome to fdisk (util-linux 2.32.1).
    default: Changes will remain in memory only, until you decide to write them.
    default: Be careful before using the write command.
    default:
    default: Device does not contain a recognized partition table.
    default: Created a new DOS disklabel with disk identifier 0x80d05a99.
    default:
    default: Command (m for help): Partition type
    default:    p   primary (0 primary, 0 extended, 4 free)
    default:    e   extended (container for logical partitions)
    default: Select (default p): Partition number (1-4, default 1): First sector (2048-4194303, default 2048): Last sector, +sectors or +size{K,M,G,T,P} (2048-4194303, default 4194303):
    default: Created a new partition 1 of type 'Linux' and of size 2 GiB.
    default:
    default: Command (m for help): The partition table has been altered.
    default: Calling ioctl() to re-read partition table.
    default: Syncing disks.
    default:
    default:
    default: Welcome to fdisk (util-linux 2.32.1).
    default: Changes will remain in memory only, until you decide to write them.
    default: Be careful before using the write command.
    default:
    default: Device does not contain a recognized partition table.
    default: Created a new DOS disklabel with disk identifier 0x41646ce6.
    default:
    default: Command (m for help): Partition type
    default:    p   primary (0 primary, 0 extended, 4 free)
    default:    e   extended (container for logical partitions)
    default: Select (default p): Partition number (1-4, default 1): First sector (2048-4194303, default 2048): Last sector, +sectors or +size{K,M,G,T,P} (2048-4194303, default 4194303):
    default: Created a new partition 1 of type 'Linux' and of size 2 GiB.
    default:
    default: Command (m for help): The partition table has been altered.
    default: Calling ioctl() to re-read partition table.
    default: Syncing disks.
    default:
    default:
    default: Welcome to fdisk (util-linux 2.32.1).
    default: Changes will remain in memory only, until you decide to write them.
    default: Be careful before using the write command.
    default:
    default: Device does not contain a recognized partition table.
    default: Created a new DOS disklabel with disk identifier 0xc6814bcf.
    default:
    default: Command (m for help): Partition type
    default:    p   primary (0 primary, 0 extended, 4 free)
    default:    e   extended (container for logical partitions)
    default: Select (default p): Partition number (1-4, default 1): First sector (2048-4194303, default 2048): Last sector, +sectors or +size{K,M,G,T,P} (2048-4194303, default 4194303):
    default: Created a new partition 1 of type 'Linux' and of size 2 GiB.
    default:
    default: Command (m for help): The partition table has been altered.
    default: Calling ioctl() to re-read partition table.
    default: Syncing disks.
    default:
    default:
    default: Welcome to fdisk (util-linux 2.32.1).
    default: Changes will remain in memory only, until you decide to write them.
    default: Be careful before using the write command.
    default:
    default: Device does not contain a recognized partition table.
    default: Created a new DOS disklabel with disk identifier 0x45873a7d.
    default:
    default: Command (m for help): Partition type
    default:    p   primary (0 primary, 0 extended, 4 free)
    default:    e   extended (container for logical partitions)
    default: Select (default p): Partition number (1-4, default 1): First sector (2048-83886079, default 2048): Last sector, +sectors or +size{K,M,G,T,P} (2048-83886079, default 83886079):
    default: Created a new partition 1 of type 'Linux' and of size 40 GiB.
    default:
    default: Command (m for help): The partition table has been altered.
    default: Calling ioctl() to re-read partition table.
    default: Syncing disks.
    default:
    default:
    default: Welcome to fdisk (util-linux 2.32.1).
    default: Changes will remain in memory only, until you decide to write them.
    default: Be careful before using the write command.
    default:
    default: Device does not contain a recognized partition table.
    default: Created a new DOS disklabel with disk identifier 0xf148a44d.
    default:
    default: Command (m for help): Partition type
    default:    p   primary (0 primary, 0 extended, 4 free)
    default:    e   extended (container for logical partitions)
    default: Select (default p): Partition number (1-4, default 1): First sector (2048-41943039, default 2048): Last sector, +sectors or +size{K,M,G,T,P} (2048-41943039, default 41943039):
    default: Created a new partition 1 of type 'Linux' and of size 20 GiB.
    default:
    default: Command (m for help): The partition table has been altered.
    default: Calling ioctl() to re-read partition table.
    default: Syncing disks.
    default:
    default: /dev/sda
    default: /dev/sda1
    default: /dev/sda2
    default: /dev/sda3
    default: /dev/sdb
    default: /dev/sdb1
    default: /dev/sdc
    default: /dev/sdc1
    default: /dev/sdd
    default: /dev/sdd1
    default: /dev/sde
    default: /dev/sde1
    default: /dev/sdf
    default: /dev/sdf1
    default: /dev/sdg
    default: /dev/sdg1
    default: ******************************************************************************
    default: Configure udev. Fri Aug 27 10:02:32 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Reload UDEV Rules. Fri Aug 27 10:02:32 UTC 2021
    default: ******************************************************************************
    default: brw-rw----. 1 root disk 8,  1 Aug 27 09:59 /dev/sda1
    default: brw-rw----. 1 root disk 8, 17 Aug 27 09:59 /dev/sdb1
    default: brw-rw----. 1 root disk 8, 33 Aug 27 10:02 /dev/sdc1
    default: brw-rw----. 1 root disk 8, 49 Aug 27 10:02 /dev/sdd1
    default: brw-rw----. 1 root disk 8, 65 Aug 27 10:02 /dev/sde1
    default: brw-------. 1 root root 8, 81 Aug 27 10:02 /dev/sdf1
    default: brw-------. 1 root root 8, 97 Aug 27 10:02 /dev/sdg1
    default: lrwxrwxrwx. 1 root root 7 Aug 27 10:03 /dev/oracleasm/asm-crs-disk1 -> ../sdc1
    default: lrwxrwxrwx. 1 root root 7 Aug 27 10:03 /dev/oracleasm/asm-crs-disk2 -> ../sdd1
    default: lrwxrwxrwx. 1 root root 7 Aug 27 10:03 /dev/oracleasm/asm-crs-disk3 -> ../sde1
    default: lrwxrwxrwx. 1 root root 7 Aug 27 10:03 /dev/oracleasm/asm-data-disk1 -> ../sdf1
    default: lrwxrwxrwx. 1 root root 7 Aug 27 10:03 /dev/oracleasm/asm-reco-disk1 -> ../sdg1
    default: ******************************************************************************
    default: Set Hostname. Fri Aug 27 10:03:23 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Create environment scripts. Fri Aug 27 10:03:23 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Create directories. Fri Aug 27 10:03:23 UTC 2021
    default: ******************************************************************************
    default: ******************************************************************************
    default: Passwordless SSH Setup for oracle. Fri Aug 27 10:03:23 UTC 2021
    default: ******************************************************************************
    default: New password: Retype new password: New password: Retype new password: # ol8-21-rac2:22 SSH-2.0-OpenSSH_8.0
    default: # ol8-21-rac2:22 SSH-2.0-OpenSSH_8.0
    default: # ol8-21-rac2:22 SSH-2.0-OpenSSH_8.0
    default: # ol8-21-rac2.localdomain:22 SSH-2.0-OpenSSH_8.0
    default: # ol8-21-rac2.localdomain:22 SSH-2.0-OpenSSH_8.0
    default: # ol8-21-rac2.localdomain:22 SSH-2.0-OpenSSH_8.0
    default: # 192.168.56.102:22 SSH-2.0-OpenSSH_8.0
    default: # 192.168.56.102:22 SSH-2.0-OpenSSH_8.0
    default: # 192.168.56.102:22 SSH-2.0-OpenSSH_8.0
    default: # localhost:22 SSH-2.0-OpenSSH_8.0
    default: # localhost:22 SSH-2.0-OpenSSH_8.0
    default: # localhost:22 SSH-2.0-OpenSSH_8.0
    default: Fri Aug 27 10:03:24 UTC 2021
    default: ******************************************************************************
    default: Passwordless SSH Setup for root. Fri Aug 27 10:03:24 UTC 2021
    default: ******************************************************************************
    default: # ol8-21-rac2:22 SSH-2.0-OpenSSH_8.0
    default: # ol8-21-rac2:22 SSH-2.0-OpenSSH_8.0
    default: # ol8-21-rac2:22 SSH-2.0-OpenSSH_8.0
    default: # ol8-21-rac2.localdomain:22 SSH-2.0-OpenSSH_8.0
    default: # ol8-21-rac2.localdomain:22 SSH-2.0-OpenSSH_8.0
    default: # ol8-21-rac2.localdomain:22 SSH-2.0-OpenSSH_8.0
    default: # 192.168.56.102:22 SSH-2.0-OpenSSH_8.0
    default: # 192.168.56.102:22 SSH-2.0-OpenSSH_8.0
    default: # 192.168.56.102:22 SSH-2.0-OpenSSH_8.0
    default: # localhost:22 SSH-2.0-OpenSSH_8.0
    default: # localhost:22 SSH-2.0-OpenSSH_8.0
    default: # localhost:22 SSH-2.0-OpenSSH_8.0
    default: Fri Aug 27 10:03:24 UTC 2021
    default: ******************************************************************************
    default: Setup End. Fri Aug 27 10:03:24 UTC 2021
    default: ******************************************************************************

D:\vagrant-master\rac\ol8_21\node2>
D:\vagrant-master\rac\ol8_21\node2>