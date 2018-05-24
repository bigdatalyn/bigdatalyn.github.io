---
layout: post
title: "Oracle Recovery 01 - BBED"
category: Oracle
tags: Oracle BBED
---

* content
{:toc}


Oracle - Recovery 01 - BBED

BBED stands for **B**lock **B**rower and **ED**itor
BBED is a tool just like ultraEdit.
After we understand the Block format in Oracle, we can use BBED to test a lot of casestudies！









### Prepare the BBED tool 

We should use the following files to make bbed tool before using bbed tool in 11g version.

	[oracle@databasevm001 ~]$ unzip bbed.zip
	Archive:  bbed.zip
	creating: bbed/
	creating: bbed/bbed_windows_win32/
	creating: bbed/bbed_linux_x86/
	creating: bbed/bbed_linux_x64/
	creating: bbed/bbed_linux_x86/msgtmp/
	creating: bbed/bbed_linux_x86/libtmp/
	inflating: bbed/bbed_windows_win32/bbed_win.rar  
	inflating: bbed/bbed_linux_x64/ssbbded.o  
	inflating: bbed/bbed_linux_x64/sbbdpt.o  
	inflating: bbed/bbed_linux_x64/bbedus.msb  
	inflating: bbed/bbed_linux_x86/msgtmp/bbedus.msg  
	inflating: bbed/bbed_linux_x86/msgtmp/bbedus.msb  
	inflating: bbed/bbed_linux_x86/libtmp/ssbbded.o  
	inflating: bbed/bbed_linux_x86/libtmp/sbbdpt.o  
	[oracle@databasevm001 ~]$

and copy them to the right directory in $ORACLE_HOME.

	$ORACLE_HOME/rdbms/lib/sbbdpt.o
	$ORACLE_HOME/rdbms/lib/ssbbded.o
	$ORACLE_HOME/rdbms/mesg/bbedus.msb
	$ORACLE_HOME/rdbms/mesg/bbedus.msg

If you can NOT find the files, use the folloing url to download them.

	[原创]Oracle BBED测试使用
	http://www.bigdatalyn.com/2017/02/27/OracleBBED/

	[BBED](/files/Images/Oracle/bbed.zip)

Example:

	[oracle@databasevm001 bbed]$ cd bbed_linux_x86
	[oracle@databasevm001 bbed_linux_x86]$ ls -ltr
	total 0
	drwxrwxr-x. 2 oracle oinstall 40 Mar 26  2014 msgtmp
	drwxrwxr-x. 2 oracle oinstall 37 Mar 26  2014 libtmp
	[oracle@databasevm001 bbed_linux_x86]$ cd libtmp/
	[oracle@databasevm001 libtmp]$ cp s* $ORACLE_HOME/rdbms/lib/
	[oracle@databasevm001 libtmp]$ cd ..
	[oracle@databasevm001 msgtmp]$ cp b* $ORACLE_HOME/rdbms/mesg/

Make the files in $ORACLE_HOME/rdbms/lib directory.

	[oracle@databasevm001 msgtmp]$ make -f $ORACLE_HOME/rdbms/lib/ins_rdbms.mk BBED=$ORACLE_HOME/bin/bbed $ORACLE_HOME/bin/bbed

	Linking BBED utility (bbed)
	rm -f /u01/app/oracle/product/11.2.0.4/dbhome_1/bin/bbed
	/usr/bin/gcc -m32  -o /u01/app/oracle/product/11.2.0.4/dbhome_1/bin/bbed -m32 -z noexecstack -L/u01/app/oracle/product/11.2.0.4/dbhome_1/rdbms/lib/ -L/u01/app/oracle/product/11.2.0.4/dbhome_1/lib/ -L/u01/app/oracle/product/11.2.0.4/dbhome_1/lib/stubs/ -L/u01/app/oracle/product/11.2.0.4/dbhome_1/lib/ -lirc -lipgo   /u01/app/oracle/product/11.2.0.4/dbhome_1/lib/s0main.o /u01/app/oracle/product/11.2.0.4/dbhome_1/rdbms/lib/ssbbded.o /u01/app/oracle/product/11.2.0.4/dbhome_1/rdbms/lib/sbbdpt.o `cat /u01/app/oracle/product/11.2.0.4/dbhome_1/lib/ldflags`    -lncrypt11 -lnsgr11 -lnzjs11 -ln11 -lnl11 -ldbtools11 -lclntsh  `cat /u01/app/oracle/product/11.2.0.4/dbhome_1/lib/ldflags`    -lncrypt11 -lnsgr11 -lnzjs11 -ln11 -lnl11 -lnro11 `cat /u01/app/oracle/product/11.2.0.4/dbhome_1/lib/ldflags`    -lncrypt11 -lnsgr11 -lnzjs11 -ln11 -lnl11 -lnnz11 -lzt11 -lztkg11 -lztkg11 -lclient11 -lnnetd11  -lvsn11 -lcommon11 -lgeneric11 -lmm -lsnls11 -lnls11  -lcore11 -lsnls11 -lnls11 -lcore11 -lsnls11 -lnls11 -lxml11 -lcore11 -lunls11 -lsnls11 -lnls11 -lcore11 -lnls11 `cat /u01/app/oracle/product/11.2.0.4/dbhome_1/lib/ldflags`    -lncrypt11 -lnsgr11 -lnzjs11 -ln11 -lnl11 -lnro11 `cat /u01/app/oracle/product/11.2.0.4/dbhome_1/lib/ldflags`    -lncrypt11 -lnsgr11 -lnzjs11 -ln11 -lnl11 -lclient11 -lnnetd11  -lvsn11 -lcommon11 -lgeneric11   -lsnls11 -lnls11  -lcore11 -lsnls11 -lnls11 -lcore11 -lsnls11 -lnls11 -lxml11 -lcore11 -lunls11 -lsnls11 -lnls11 -lcore11 -lnls11 -lclient11 -lnnetd11  -lvsn11 -lcommon11 -lgeneric11 -lsnls11 -lnls11  -lcore11 -lsnls11 -lnls11 -lcore11 -lsnls11 -lnls11 -lxml11 -lcore11 -lunls11 -lsnls11 -lnls11 -lcore11 -lnls11   `cat /u01/app/oracle/product/11.2.0.4/dbhome_1/lib/sysliblist` -Wl,-rpath,/u01/app/oracle/product/11.2.0.4/dbhome_1/lib -lm    `cat /u01/app/oracle/product/11.2.0.4/dbhome_1/lib/sysliblist` -ldl -lm   -L/u01/app/oracle/product/11.2.0.4/dbhome_1/lib
	[oracle@databasevm001 msgtmp]$ 
	[oracle@databasevm001 ~]$ which bbed
	/u01/app/oracle/product/11.2.0.4/dbhome_1/bin/bbed
	[oracle@databasevm001 ~]$ 

### BBED's prepare work

BBED's test:

	[oracle@databasevm001 ~]$ bbed
	Password: blockedit ---------------------------------> default password: blockedit

	BBED: Release 2.0.0.0.0 - Limited Production on Wed May 23 14:54:47 2018

	Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.

	************* !!! For Oracle Internal Use only !!! ***************

	BBED> exit

	[oracle@databasevm001 ~]$ 


Database's datafile are the following via the sql's execution.

	SYS@orcl11g> select file#||chr(9)||name||chr(9)||bytes from v$datafile;

Edit the par file regarding the datafile list.

	[oracle@databasevm001 ~]$ vi par.txt
	[oracle@databasevm001 ~]$ vi filelist.txt
	[oracle@databasevm001 ~]$ cat par.txt
	blocksize=8192
	listfile=filelist.txt
	mode=edit
	[oracle@databasevm001 ~]$ cat filelist.txt  ---------------> the list is from the sql's execution result.
	1       /u01/app/oracle/oradata/orcl11g/system01.dbf    796917760
	2       /u01/app/oracle/oradata/orcl11g/sysaux01.dbf    650117120
	3       /u01/app/oracle/oradata/orcl11g/undotbs01.dbf   314572800
	4       /u01/app/oracle/oradata/orcl11g/users01.dbf     10072883200
	5       /u01/app/oracle/oradata/orcl11g/data01.dbf      104857600
	[oracle@databasevm001 ~]$ 


Alias the bbed's command

	echo "alias bbed='rlwrap bbed parfile=par.txt password=blockedit'" >> /home/oracle/.bash_profile

The prepare work is done.

	[oracle@databasevm001 ~]$ echo "alias bbed='rlwrap bbed parfile=par.txt password=blockedit'" >> /home/oracle/.bash_profile
	[oracle@databasevm001 ~]$ which bbed
	/u01/app/oracle/product/11.2.0.4/dbhome_1/bin/bbed
	[oracle@databasevm001 ~]$ source /home/oracle/.bash_profile
	[oracle@databasevm001 ~]$ which bbed
	alias bbed='rlwrap bbed parfile=par.txt password=blockedit'
			/bin/rlwrap
	[oracle@databasevm001 ~]$ 
	[oracle@databasevm001 ~]$ bbed

	BBED: Release 2.0.0.0.0 - Limited Production on Wed May 23 15:03:31 2018

	Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.

	************* !!! For Oracle Internal Use only !!! ***************

	BBED> 


### BBED's commands


	BBED> info
	File#  Name                                                        Size(blks)
	-----  ----                                                        ----------
		1  /u01/app/oracle/oradata/orcl11g/system01.dbf                     97280
		2  /u01/app/oracle/oradata/orcl11g/sysaux01.dbf                     79360
		3  /u01/app/oracle/oradata/orcl11g/undotbs01.dbf                    38400
		4  /u01/app/oracle/oradata/orcl11g/users01.dbf                     524287
		5  /u01/app/oracle/oradata/orcl11g/data01.dbf                       12800

	BBED> 


	set file 5 block 1 # 访问5号文件的1号块
	set dba 0x01000020
	set offset 0       # 0表示第一个字节开始
	set block 1        # 1表示第一个块开始
	set count 8192     # 默认是显示512字节

	find /x 05d67g     # 查指定的字符串在指定数据块中的具体位置
					# f --find的简写，表示继续从当前位置开始往下查询字符串05d67g
	dump               # 十六进制查看block
	dump /v            # 查看十六进制内容的同时以文本方式“翻译”十六进制显示的内容，相当于对当前block执行strings命令

	modify /x d43      # 修改指定block,指定offset的数据块块内记录的内容
	sum apply          # 计算修改后的数据块的checksum值，然后写入数据块的offset为16-17的位置

	map /v             # 查看块结构



Have a good day! 2018/05 via LinHong
	






