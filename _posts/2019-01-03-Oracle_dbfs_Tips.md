---
layout: post
title: "Oracle dbfs共享文件系统 Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}




dbfs共享文件系统 Tips

11g: exadata 不支持acfs 通过这方法创建共享文件系统
12c: 可以直接创建acfs(可以创建63个快照)

因为是数据库层面的内容，可以restore到之前某个时间点,性能不占优势








大概步骤如下：



### 1.oracle加入到fuse组
配置文件 /etc/fuse.conf 添加user_allow_other
chmod 644 /etc/fuse.conf

### 2.创建bigfile表空间dbfs
创建dbfs用户并赋予权限默认dbfs表空间，且是无限配额
注意：dbfs_role
	create session,resource,dbfs_role
	
### 3.创建dbfs目录

### 4.跑脚本
	cd $ORACLE_HOME/rdbms/admin
	sqlplus dbfs/oracle
	@dbfs_create_filesystem dbfs mydbfs
	把dbfs表空间格式化 dbfs的store（mydbfs表存放dbfs的对象内容）

	SQL> @dbfs_create_filesystem dbfs mydbfs
	SQL> Rem
	SQL> Rem $Header: rdbms/admin/dbfs_create_filesystem.sql /main/5 2010/10/21 10:48:12 xihua Exp $
	SQL> Rem
	SQL> Rem dbfs_create_filesystem.sql
	SQL> Rem
	SQL> Rem Copyright (c) 2009, 2010, Oracle and/or its affiliates.
	SQL> Rem All rights reserved.
	SQL> Rem
	SQL> Rem    NAME
	SQL> Rem         dbfs_create_filesystem.sql - DBFS create filesystem
	SQL> Rem
	SQL> Rem    DESCRIPTION
	SQL> Rem         DBFS create filesystem script
	SQL> Rem         Usage: sqlplus <dbfs_user> @dbfs_create_filesystem.sql
	SQL> Rem             <tablespace_name> <table_name>
	SQL> Rem
	SQL> Rem    NOTES
	SQL> Rem
	SQL> Rem    MODIFIED   (MM/DD/YY)
	SQL> Rem    xihua       14/10/10 - Bug 10104462: Improved method to drop filesystems
	SQL> Rem    nmukherj    05/30/10 - changing default to non-partitioned SF segment
	SQL> Rem    weizhang    03/11/10 - bug 9220947: tidy up
	SQL> Rem    weizhang    04/06/09 - Created
	SQL> Rem
	SQL>
	SQL> SET ECHO OFF
	No errors.
	--------
	CREATE STORE:
	begin dbms_dbfs_sfs.createFilesystem(store_name => 'mydbfs', tbl_name =>
	'mydbfs', tbl_tbs => 'dbfs', lob_tbs => 'dbfs', do_partition => false,
	partition_key => 1, do_compress => false, compression => '', do_dedup => false,
	do_encrypt => false); end;
	--------
	REGISTER STORE:
	begin dbms_dbfs_content.registerStore(store_name=> 'mydbfs', provider_name =>
	'sample1', provider_package => 'dbms_dbfs_sfs'); end;
	--------
	MOUNT STORE:
	begin dbms_dbfs_content.mountStore(store_name=>'mydbfs', store_mount=>'mydbfs');
	end;
	--------
	CHMOD STORE:
	declare m integer; begin m := dbms_fuse.fs_chmod('/mydbfs', 16895); end;
	No errors.
	SQL>

### 5.配置密码和执行共享dbfs

	echo oracle > passwd.txt

	[oracle@qr01dbadm01 ~]$ nohup /u01/app/oracle/product/12.1.0.2/dbhome_1/bin/dbfs_client dbfs@dbm -o allow_other,direct_io /home/oracle/DBFS < passwd.txt &
	[1] 36428
	[oracle@qr01dbadm01 ~]$ nohup: appending output to `nohup.out'

	[oracle@qr01dbadm01 ~]$ ps -ef | grep nohup
	oracle    36590  36239  0 13:33 pts/0    00:00:00 grep nohup
	[oracle@qr01dbadm01 ~]$ ps -ef | grep dbfs_cl
	oracle    36428  36239  0 13:33 pts/0    00:00:00 /u01/app/oracle/product/12.1.0.2/dbhome_1/bin/dbfs_client dbfs@dbm -o allow_other,direct_io /home/oracle/DBFS
	oracle    36613  36239  0 13:33 pts/0    00:00:00 grep dbfs_cl
	[oracle@qr01dbadm01 ~]$ df
	Filesystem      1K-blocks     Used Available Use% Mounted on
	/dev/xvda2       40770368 27705048  10994444  72% /
	tmpfs             3082588   640700   2441888  21% /dev/shm
	/dev/xvda1         516040    68428    421400  14% /boot
	dbfs-dbfs@dbm:/    198592      160    198432   1% /home/oracle/DBFS
	[oracle@qr01dbadm01 ~]$ 
	[oracle@qr01dbadm01 ~]$ cat nohup.out
	fuse: failed to exec fusermount: Permission denied
	[oracle@qr01dbadm01 ~]$ 

报错,需要用root用户赋予权限
	[oracle@qr01dbadm01 ~]$ su - root
	Password:
	[root@qr01dbadm01 ~]# ls -tlr /bin/fusermount
	-rwsr-x---. 1 root fuse 32336 May 25  2013 /bin/fusermount
	[root@qr01dbadm01 ~]# chmod +x /bin/fusermount
	[root@qr01dbadm01 ~]#

这个dbfs其实是创建了BLOB对象存储dbfs对象

	SQL> show user;
	USER is "SYS"
	SQL> desc dbfs.mydbfs
	 Name                                      Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 VOLID                                     NOT NULL NUMBER
	 CSNAP#                                    NOT NULL NUMBER
	 LSNAP#                                             NUMBER
	 PATHNAME                                  NOT NULL VARCHAR2(1024)
	 ITEM                                      NOT NULL VARCHAR2(256)
	 PATHTYPE                                  NOT NULL NUMBER(38)
	 FILEDATA                                           BLOB
	 POSIX_NLINK                                        NUMBER(38)
	 POSIX_MODE                                         NUMBER(38)
	 POSIX_UID                                          NUMBER(38)
	 POSIX_GID                                          NUMBER(38)
	 STD_ACCESS_TIME                           NOT NULL TIMESTAMP(6)
	 STD_ACL                                            VARCHAR2(1024)
	 STD_CHANGE_TIME                           NOT NULL TIMESTAMP(6)
	 STD_CONTENT_TYPE                                   VARCHAR2(1024)
	 STD_CREATION_TIME                         NOT NULL TIMESTAMP(6)
	 STD_DELETED                               NOT NULL NUMBER(38)
	 STD_GUID                                  NOT NULL NUMBER(38)
	 STD_MODIFICATION_TIME                     NOT NULL TIMESTAMP(6)
	 STD_OWNER                                          VARCHAR2(32)
	 STD_PARENT_GUID                           NOT NULL NUMBER(38)
	 STD_REFERENT                                       VARCHAR2(1024)
	 OPT_HASH_TYPE                                      VARCHAR2(32)
	 OPT_HASH_VALUE                                     VARCHAR2(128)
	 OPT_LOCK_COUNT                                     NUMBER(38)
	 OPT_LOCK_DATA                                      VARCHAR2(128)
	 OPT_LOCK_STATUS                                    NUMBER(38)

	SQL>
	

### 另外节点添加dbfs(mount)

	[root@qr01dbadm02 ~]# usermod -a -G fuse oracle
	[root@qr01dbadm02 ~]# echo user_allow_other > /etc/fuse.conf
	[root@qr01dbadm02 ~]# chmod 644 /etc/fuse.conf
	[root@qr01dbadm02 ~]# chmod +x /bin/fusermount
	[root@qr01dbadm02 ~]# su - oracle
	[oracle@qr01dbadm02 ~]$ mkdir DBFS
	[oracle@qr01dbadm02 ~]$ echo oracle > passwd.txt
	[oracle@qr01dbadm02 ~]$


	[oracle@qr01dbadm02 ~]$ . oraenv
	ORACLE_SID = [oracle] ? dbm
	The Oracle base has been set to /u01/app/oracle
	[oracle@qr01dbadm02 ~]$
	[oracle@qr01dbadm02 ~]$ nohup $ORACLE_HOME/bin/dbfs_client dbfs@dbm -o allow_other,direct_io /home/oracle/DBFS < passwd.txt &
	[1] 5295
	[oracle@qr01dbadm02 ~]$ nohup: appending output to `nohup.out'
	[oracle@qr01dbadm02 ~]$ df -h
	Filesystem       Size  Used Avail Use% Mounted on
	/dev/xvda2        39G   25G   13G  66% /
	tmpfs            3.0G  626M  2.4G  21% /dev/shm
	/dev/xvda1       504M   67M  412M  14% /boot
	dbfs-dbfs@dbm:/  194M  8.0M  186M   5% /home/oracle/DBFS
	[oracle@qr01dbadm02 ~]$

### Others

bigfile 40亿块
支持大小: 40亿*8k(块大小)

#### umount dbfs

	[oracle@qr01dbadm02 ~]$ fusermount -u /home/oracle/DBFS
	[1]+  Done                    nohup $ORACLE_HOME/bin/dbfs_client dbfs@dbm -o allow_other,direct_io /home/oracle/DBFS < passwd.txt
	[oracle@qr01dbadm02 ~]$








Have a good work&life! 2019/01 via LinHong



