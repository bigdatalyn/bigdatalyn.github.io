---
layout: post
title: "Oracle 21c RAC Linux 8 Install Tips"
category: Oracle
tags: Oracle 21c RAC Tips
---

* content
{:toc}

Oracle 21c RAC Linux 8 Install Tips

[Tim](https://oracle-base.com/) had prepared the detail install tips regarding oracle 21c RAC.

Very convenient and efficient!

I changed VM memory size 800MB/5GB/5GB and change the DB's size to 800MB for my mac's limited memeory.

![mac_memory]({{ "/files/Oracle/21c/rac_mac_memory.png"}})


![database21c]({{ "/files/Oracle/21c/RAC_21c.png"}})








### Oracle 21c RAC


```
SQL> set linesize 80
SQL> select banner_full from v$version;

BANNER_FULL
--------------------------------------------------------------------------------
Oracle Database 21c Enterprise Edition Release 21.0.0.0.0 - Production
Version 21.3.0.0.0


SQL> set lines 500 pages 150
SQL> col HOST_NAME for a35
SQL> SELECT INSTANCE_NAME, TO_CHAR(STARTUP_TIME,'YYYY/MM/DD HH24:MI:SS') "STARTUP", DATABASE_ROLE, OPEN_MODE from GV$INSTANCE, V$DATABASE order by 2;

INSTANCE_NAME    STARTUP             DATABASE_ROLE    OPEN_MODE
---------------- ------------------- ---------------- --------------------
cdbrac2          2021/08/31 02:30:13 PRIMARY          READ WRITE
cdbrac1          2021/08/31 02:31:15 PRIMARY          READ WRITE

SQL> 
```


```
[oracle@ol8-21-rac1 ~]$ source scripts/setEnv.sh 
[oracle@ol8-21-rac1 ~]$ source scripts/db_env 
[oracle@ol8-21-rac1 ~]$ srvctl status database -d cdbrac
Instance cdbrac1 is running on node ol8-21-rac1
Instance cdbrac2 is running on node ol8-21-rac2
[oracle@ol8-21-rac1 ~]$ source scripts/grid_env 
[oracle@ol8-21-rac1 ~]$ crsctl status res -t
--------------------------------------------------------------------------------
Name           Target  State        Server                   State details       
--------------------------------------------------------------------------------
Local Resources
--------------------------------------------------------------------------------
ora.LISTENER.lsnr
               ONLINE  ONLINE       ol8-21-rac1              STABLE
               ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.chad
               ONLINE  ONLINE       ol8-21-rac1              STABLE
               ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.net1.network
               ONLINE  ONLINE       ol8-21-rac1              STABLE
               ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.ons
               ONLINE  ONLINE       ol8-21-rac1              STABLE
               ONLINE  ONLINE       ol8-21-rac2              STABLE
--------------------------------------------------------------------------------
Cluster Resources
--------------------------------------------------------------------------------
ora.ASMNET1LSNR_ASM.lsnr(ora.asmgroup)
      1        ONLINE  ONLINE       ol8-21-rac1              STABLE
      2        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.CRS.dg(ora.asmgroup)
      1        ONLINE  ONLINE       ol8-21-rac1              STABLE
      2        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.DATA.dg(ora.asmgroup)
      1        ONLINE  ONLINE       ol8-21-rac1              STABLE
      2        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.LISTENER_SCAN1.lsnr
      1        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.LISTENER_SCAN2.lsnr
      1        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.LISTENER_SCAN3.lsnr
      1        ONLINE  ONLINE       ol8-21-rac1              STABLE
ora.RECO.dg(ora.asmgroup)
      1        ONLINE  ONLINE       ol8-21-rac1              STABLE
      2        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.asm(ora.asmgroup)
      1        ONLINE  ONLINE       ol8-21-rac1              Started,STABLE
      2        ONLINE  ONLINE       ol8-21-rac2              Started,STABLE
ora.asmnet1.asmnetwork(ora.asmgroup)
      1        ONLINE  ONLINE       ol8-21-rac1              STABLE
      2        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.cdbrac.db
      1        ONLINE  ONLINE       ol8-21-rac2              Open,HOME=/u01/app/o
                                                             racle/product/21.0.0
                                                             /dbhome_1,STABLE
      2        ONLINE  ONLINE       ol8-21-rac1              Open,HOME=/u01/app/o
                                                             racle/product/21.0.0
                                                             /dbhome_1,STABLE
ora.cdbrac.pdb1.pdb
      1        ONLINE  ONLINE       ol8-21-rac1              STABLE
      2        OFFLINE OFFLINE                               STABLE
ora.cdp1.cdp
      1        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.cdp2.cdp
      1        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.cdp3.cdp
      1        ONLINE  ONLINE       ol8-21-rac1              STABLE
ora.cvu
      1        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.ol8-21-rac1.vip
      1        ONLINE  ONLINE       ol8-21-rac1              STABLE
ora.ol8-21-rac2.vip
      1        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.qosmserver
      1        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.scan1.vip
      1        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.scan2.vip
      1        ONLINE  ONLINE       ol8-21-rac2              STABLE
ora.scan3.vip
      1        ONLINE  ONLINE       ol8-21-rac1              STABLE
--------------------------------------------------------------------------------
[oracle@ol8-21-rac1 ~]$ 
```


### vagrant up start log

```
lin@lin-mac dns % cd ../node2
lin@lin-mac node2 % vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Checking if box 'oraclebase/oracle-8' version '2021.07.29' is up to date...
==> default: Clearing any previously set forwarded ports...
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
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
==> default: Configuring and enabling network interfaces...
==> default: Mounting shared folders...
    default: /vagrant => /Users/lin/oracle21c/vagrant/rac/ol8_21/node2
    default: /vagrant_config => /Users/lin/oracle21c/vagrant/rac/ol8_21/config
    default: /vagrant_scripts => /Users/lin/oracle21c/vagrant/rac/ol8_21/shared_scripts
    default: /vagrant_software => /Users/lin/oracle21c/vagrant/rac/ol8_21/software
==> default: Machine already provisioned. Run `vagrant provision` or use the `--provision`
==> default: flag to force provisioning. Provisioners marked to run always will still run.
lin@lin-mac node2 %
lin@lin-mac node2 % cd ../node1
lin@lin-mac node1 % vagrant up
Bringing machine 'default' up with 'virtualbox' provider...
==> default: Checking if box 'oraclebase/oracle-8' version '2021.07.29' is up to date...
==> default: Clearing any previously set forwarded ports...
==> default: Fixed port collision for 22 => 2222. Now on port 2201.
==> default: Clearing any previously set network interfaces...
==> default: Preparing network interfaces based on configuration...
    default: Adapter 1: nat
    default: Adapter 2: hostonly
    default: Adapter 3: intnet
==> default: Forwarding ports...
    default: 1521 (guest) => 1521 (host) (adapter 1)
    default: 5500 (guest) => 5500 (host) (adapter 1)
    default: 22 (guest) => 2201 (host) (adapter 1)
==> default: Running 'pre-boot' VM customizations...
==> default: Booting VM...
==> default: Waiting for machine to boot. This may take a few minutes...
    default: SSH address: 127.0.0.1:2201
    default: SSH username: vagrant
    default: SSH auth method: private key
==> default: Machine booted and ready!
==> default: Checking for guest additions in VM...
==> default: Configuring and enabling network interfaces...
==> default: Mounting shared folders...
    default: /vagrant => /Users/lin/oracle21c/vagrant/rac/ol8_21/node1
    default: /vagrant_config => /Users/lin/oracle21c/vagrant/rac/ol8_21/config
    default: /vagrant_scripts => /Users/lin/oracle21c/vagrant/rac/ol8_21/shared_scripts
    default: /vagrant_software => /Users/lin/oracle21c/vagrant/rac/ol8_21/software
==> default: Machine already provisioned. Run `vagrant provision` or use the `--provision`
==> default: flag to force provisioning. Provisioners marked to run always will still run.
lin@lin-mac node1 %
```

### Ref

[Oracle Database 21c RAC On Oracle Linux 8 Using VirtualBox and Vagrant](https://oracle-base.com/articles/21c/oracle-db-21c-rac-installation-on-oracle-linux-8-using-virtualbox)


Have a good work&life! 2021/08 via LinHong
