---
layout: post
title: "[原创]Oracle BBED测试使用"
category: Oracle
tags: Oracle BBED
---

* content
{:toc}

#### BBED

BBED(Oracle Block Browerand EDitor Tool)，用来直接查看和修改数据文件数据的一个工具，是Oracle一款内部工具，可以直接修改Oracle数据文件块的内容，在一些极端恢复场景下比较有用。

该工具不受Oracle支持，所以默认是没有生成可执行文件的，在使用前需要重新连接。







#### 下载&SCP上传

bbed在11g中需要的相关文件
包含有32/64 windows和linux


![BBED_11g]({{ "/files/Images/Oracle/bbed.zip"}})

原因是11g中缺失几个相关文件，我们可以从10g拷贝相关文件到11g对应目录下

	$ORACLE_HOME/rdbms/lib/sbbdpt.o
	$ORACLE_HOME/rdbms/lib/ssbbded.o
	$ORACLE_HOME/rdbms/mesg/bbedus.msb
	$ORACLE_HOME/rdbms/mesg/bbedus.msg


SCP上传

	[hong@TC Downloads]$ scp bbed.zip oracle@192.0.2.11:/home/oracle
	oracle@192.0.2.11's password: 
	bbed.zip                                      100% 7322KB   7.2MB/s   00:00    
	[hong@TC Downloads]$ 

#### 解压和CP到对应目录


	[oracle@tc_hong01 ~]$ pwd
	/home/oracle
	[oracle@tc_hong01 ~]$ ls -ltr |tail -1
	-rw-r--r-- 1 oracle oinstall 7497492 Mar  3 14:36 bbed.zip
	[oracle@tc_hong01 ~]$ unzip bbed.zip 
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
	[oracle@tc_hong01 ~]$ cd bbed
	[oracle@tc_hong01 bbed]$ pwd
	/home/oracle/bbed
	[oracle@tc_hong01 bbed]$ ls -ltr
	total 12
	drwxrwxr-x 2 oracle oinstall 4096 Mar 26  2014 bbed_windows_win32
	drwxrwxr-x 4 oracle oinstall 4096 Mar 26  2014 bbed_linux_x86
	drwxrwxr-x 2 oracle oinstall 4096 Mar 26  2014 bbed_linux_x64
	[oracle@tc_hong01 bbed]$ 
	[oracle@tc_hong01 bbed]$ cd bbed_linux_x86
	[oracle@tc_hong01 bbed_linux_x86]$ pwd
	/home/oracle/bbed/bbed_linux_x86
	[oracle@tc_hong01 bbed_linux_x86]$ ls -ltr
	total 8
	drwxrwxr-x 2 oracle oinstall 4096 Mar 26  2014 msgtmp
	drwxrwxr-x 2 oracle oinstall 4096 Mar 26  2014 libtmp
	[oracle@tc_hong01 bbed_linux_x86]$ cd libtmp
	[oracle@tc_hong01 libtmp]$ 
	[oracle@tc_hong01 libtmp]$ pwd
	/home/oracle/bbed/bbed_linux_x86/libtmp
	[oracle@tc_hong01 libtmp]$ ls -ltr
	total 8
	-rw-rw-r-- 1 oracle oinstall 2721 Aug 14  2012 ssbbded.o
	-rw-rw-r-- 1 oracle oinstall 3043 Aug 14  2012 sbbdpt.o
	[oracle@tc_hong01 libtmp]$ cp s* $ORACLE_HOME/rdbms/lib/
	[oracle@tc_hong01 libtmp]$ cd ..
	[oracle@tc_hong01 bbed_linux_x86]$ cd msgtmp/
	[oracle@tc_hong01 msgtmp]$ ls -l
	total 24
	-rw-rw-r-- 1 oracle oinstall  8704 Aug 14  2012 bbedus.msb
	-rw-rw-r-- 1 oracle oinstall 10270 Aug 14  2012 bbedus.msg
	[oracle@tc_hong01 msgtmp]$ cp b* $ORACLE_HOME/rdbms/mesg/
	[oracle@tc_hong01 msgtmp]$ 


#### 编译&使用


`make -f $ORACLE_HOME/rdbms/lib/ins_rdbms.mk BBED=$ORACLE_HOME/bin/bbed $ORACLE_HOME/bin/bbed`

成功编译的结果如下：(如果之前有bbed，重命名$ORACLE_HOME/bin/bbed之后再编译)

	[oracle@tc_hong01 lib]$ pwd
	/u01/app/oracle/product/11.2.0/dbhome_1/rdbms/lib
	[oracle@tc_hong01 lib]$ 
	[oracle@tc_hong01 lib]$ make -f ins_rdbms.mk BBED=$ORACLE_HOME/bin/bbed $ORACLE_HOME/bin/bbed

	Linking BBED utility (bbed)
	rm -f /u01/app/oracle/product/11.2.0/dbhome_1/bin/bbed
	/usr/bin/gcc -m32  -o /u01/app/oracle/product/11.2.0/dbhome_1/bin/bbed -m32 -L/u01/app/oracle/product/11.2.0/dbhome_1/rdbms/lib/ -L/u01/app/oracle/product/11.2.0/dbhome_1/lib/ -L/u01/app/oracle/product/11.2.0/dbhome_1/lib/stubs/ -L/u01/app/oracle/product/11.2.0/dbhome_1/lib/ -lirc -lipgo   /u01/app/oracle/product/11.2.0/dbhome_1/lib/s0main.o /u01/app/oracle/product/11.2.0/dbhome_1/rdbms/lib/ssbbded.o /u01/app/oracle/product/11.2.0/dbhome_1/rdbms/lib/sbbdpt.o `cat /u01/app/oracle/product/11.2.0/dbhome_1/lib/ldflags`    -lncrypt11 -lnsgr11 -lnzjs11 -ln11 -lnl11 -ldbtools11 -lclntsh  `cat /u01/app/oracle/product/11.2.0/dbhome_1/lib/ldflags`    -lncrypt11 -lnsgr11 -lnzjs11 -ln11 -lnl11 -lnro11 `cat /u01/app/oracle/product/11.2.0/dbhome_1/lib/ldflags`    -lncrypt11 -lnsgr11 -lnzjs11 -ln11 -lnl11 -lnnz11 -lzt11 -lztkg11 -lztkg11 -lclient11 -lnnetd11  -lvsn11 -lcommon11 -lgeneric11 -lmm -lsnls11 -lnls11  -lcore11 -lsnls11 -lnls11 -lcore11 -lsnls11 -lnls11 -lxml11 -lcore11 -lunls11 -lsnls11 -lnls11 -lcore11 -lnls11 `cat /u01/app/oracle/product/11.2.0/dbhome_1/lib/ldflags`    -lncrypt11 -lnsgr11 -lnzjs11 -ln11 -lnl11 -lnro11 `cat /u01/app/oracle/product/11.2.0/dbhome_1/lib/ldflags`    -lncrypt11 -lnsgr11 -lnzjs11 -ln11 -lnl11 -lclient11 -lnnetd11  -lvsn11 -lcommon11 -lgeneric11   -lsnls11 -lnls11  -lcore11 -lsnls11 -lnls11 -lcore11 -lsnls11 -lnls11 -lxml11 -lcore11 -lunls11 -lsnls11 -lnls11 -lcore11 -lnls11 -lclient11 -lnnetd11  -lvsn11 -lcommon11 -lgeneric11 -lsnls11 -lnls11  -lcore11 -lsnls11 -lnls11 -lcore11 -lsnls11 -lnls11 -lxml11 -lcore11 -lunls11 -lsnls11 -lnls11 -lcore11 -lnls11   `cat /u01/app/oracle/product/11.2.0/dbhome_1/lib/sysliblist` -Wl,-rpath,/u01/app/oracle/product/11.2.0/dbhome_1/lib -lm    `cat /u01/app/oracle/product/11.2.0/dbhome_1/lib/sysliblist` -ldl -lm   -L/u01/app/oracle/product/11.2.0/dbhome_1/lib
	[oracle@tc_hong01 lib]$ 
 
使用：(默认密码是：blockedit)


	[oracle@tc_hong01 ~]$ which bbed
	/u01/app/oracle/product/11.2.0/dbhome_1/bin/bbed
	[oracle@tc_hong01 ~]$ 
	[oracle@tc_hong01 ~]$ bbed
	Password: --输入默认密码:blockedit

	BBED: Release 2.0.0.0.0 - Limited Production on Fri Mar 3 14:48:28 2017

	Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.

	************* !!! For Oracle Internal Use only !!! ***************

	BBED> help all;
	SET DBA [ dba | file#, block# ]
	SET FILENAME 'filename'
	SET FILE file#
	SET BLOCK [+/-]block#
	SET OFFSET [ [+/-]byte offset | symbol | *symbol ]
	SET BLOCKSIZE bytes
	SET LIST[FILE] 'filename'
	SET WIDTH character_count
	SET COUNT bytes_to_display
	SET IBASE [ HEX | OCT | DEC ]
	SET OBASE [ HEX | OCT | DEC ]
	SET MODE  [ BROWSE | EDIT ]
	SET SPOOL [ Y | N ]
	SHOW [ <SET parameter> | ALL ]
	INFO
	MAP[/v] [ DBA | FILENAME | FILE | BLOCK ]
	DUMP[/v] [ DBA | FILENAME | FILE | BLOCK | OFFSET | COUNT ]
	PRINT[/x|d|u|o|c] [ DBA | FILE | FILENAME | BLOCK | OFFSET | symbol | *symbol ]
	EXAMINE[/Nuf] [ DBA | FILE | FILENAME | BLOCK | OFFSET | symbol | *symbol ]
	</Nuf>:
	N - a number which specifies a repeat count.
	u - a letter which specifies a unit size:
	  b - b1, ub1 (byte)
	  h - b2, ub2 (half-word)
	  w - b4, ub4(word)
	  r - Oracle table/index row
	f - a letter which specifies a display format:
	  x - hexadecimal
	  d - decimal
	  u - unsigned decimal
	  o - octal
	  c - character (native)
	  n - Oracle number
	  t - Oracle date
	  i - Oracle rowid
	FIND[/x|d|u|o|c] numeric/character string [ TOP | CURR ]
	COPY [ DBA | FILE | FILENAME | BLOCK ] TO [ DBA | FILE | FILENAME | BLOCK ]
	MODIFY[/x|d|u|o|c] numeric/character string
	      [ DBA | FILE | FILENAME | BLOCK | OFFSET | symbol | *symbol ]
	ASSIGN[/x|d|u|o] <target spec>=<source spec>
	<target spec> : [ DBA | FILE | FILENAME | BLOCK | OFFSET | symbol | *symbol ]
	<source spec> : [ value | <target spec options> ]
	SUM [ DBA | FILE | FILENAME | BLOCK ] [ APPLY ]
	PUSH [ DBA | FILE | FILENAME | BLOCK | OFFSET ]
	POP [ALL]
	REVERT [ DBA | FILE | FILENAME | BLOCK ]
	UNDO
	HELP [ <bbed command> | ALL ]
	VERIFY [ DBA | FILE | FILENAME | BLOCK ]
	CORRUPT [ DBA | FILE | FILENAME | BLOCK ]

	BBED> 

	BBED> show
		FILE#          	0
		BLOCK#         	1
		OFFSET         	0
		DBA            	0x00000000 (0 0,1)
		FILENAME       	
		BIFILE         	bifile.bbd
		LISTFILE       	
		BLOCKSIZE      	8192
		MODE           	Browse
		EDIT           	Unrecoverable
		IBASE          	Dec
		OBASE          	Dec
		WIDTH          	80
		COUNT          	512
		LOGFILE        	log.bbd
		SPOOL          	No

	BBED> 

#### PARFILE和listfile文件


PARFILE：参数文件记录以下参数：
	
	BLOCKSIZE:数据库的标准块大小
	MODE： BBED的运行模式：browse或者edit
	SILENT:控制操作的输出(Y/N)
	SPOOL：将输出内容spool到 bbed.log (Y/N)
	LISTFILE:被编辑的文件列表的名字
	CMDFILE：执行命令的集合的文件名 
	BIFILE ：undo 文件的名称
	LOGFILE：用户日志文件默认为：log.bbd

一般使用的参数：

	BLOCKSIZE=8192
	LISTFILE=/home/oracle/prod1_list.txt
	MODE=edit


LISTFILE 文件中的格式为：文件号  路径名称  大小，用sql语句可以得到listfile的内容：


	[oracle@tc_hong01 ~]$ export ORACLE_SID=PROD1;sqlplus / as sysdba

	SQL*Plus: Release 11.2.0.3.0 Production on Fri Mar 3 15:02:52 2017

	Copyright (c) 1982, 2011, Oracle.  All rights reserved.


	Connected to:
	Oracle Database 11g Enterprise Edition Release 11.2.0.3.0 - Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options

	SYS> select file#||' '||name||' '||bytes from v$datafile;

	FILE#||''||NAME||''||BYTES
	--------------------------------------------------------------------------------
	1 /u01/app/oracle/oradata/PROD1/system01.dbf 807403520
	2 /u01/app/oracle/oradata/PROD1/sysaux01.dbf 618659840
	3 /u01/app/oracle/oradata/PROD1/undotbs01.dbf 99614720
	4 /u01/app/oracle/oradata/PROD1/users01.dbf 123207680
	5 /u01/app/oracle/oradata/PROD1/example01.dbf 362414080

	SYS> 


如：

	[oracle@tc_hong01 ~]$ cat bbed.par
	BLOCKSIZE=8192
	LISTFILE=/home/oracle/prod1_list.txt
	MODE=edit
	[oracle@tc_hong01 ~]$ cat /home/oracle/prod1_list.txt
	1 /u01/app/oracle/oradata/PROD1/system01.dbf 807403520
	2 /u01/app/oracle/oradata/PROD1/sysaux01.dbf 618659840
	3 /u01/app/oracle/oradata/PROD1/undotbs01.dbf 99614720
	4 /u01/app/oracle/oradata/PROD1/users01.dbf 123207680
	5 /u01/app/oracle/oradata/PROD1/example01.dbf 362414080
	[oracle@tc_hong01 ~]$ 


	[oracle@tc_hong01 ~]$ bbed parfile=bbed.par
	Password: 

	BBED: Release 2.0.0.0.0 - Limited Production on Fri Mar 3 15:07:41 2017

	Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.

	************* !!! For Oracle Internal Use only !!! ***************

	BBED> show
		FILE#          	1
		BLOCK#         	1
		OFFSET         	0
		DBA            	0x00400001 (4194305 1,1)
		FILENAME       	/u01/app/oracle/oradata/PROD1/system01.dbf
		BIFILE         	bifile.bbd
		LISTFILE       	/home/oracle/prod1_list.txt
		BLOCKSIZE      	8192
		MODE           	Edit
		EDIT           	Unrecoverable
		IBASE          	Dec
		OBASE          	Dec
		WIDTH          	80
		COUNT          	512
		LOGFILE        	log.bbd
		SPOOL          	No

	BBED> 

#### 常用命令

	set 设定当前的环境。

	show 查看当前的环境参数，跟sqlplus的同名命令类似。

	dump 列出指定block的内容

	find 在指定的block中查找指定的字符串，结果是显示出字符串，及其偏移量--offset，偏移量就是在block中的字节数

	modify 修改指定block的指定偏移量的值，可以在线修改。

	copy 把一个block的内容copy到另一个block中

	verify 检查当前环境是否有坏块

	sum 计算block的checksum，modify之后block就被标识为坏块，current checksum与reqired checksum不一致，sum命令可以计算出新的checksum并应用到当前块。

	undo 回滚当前的修改操作，如果手误做错了，undo一下就ok了，回到原来的状态。

	revert 回滚所有之前的修改操作，意思就是 undo all


#### 通过bbed修改某张表的数据

创建测试表test01：

	HR> conn scott/oracle
	Connected.
	SCOTT> desc emp;
	 Name					   Null?    Type
	 ----------------------------------------- -------- ----------------------------
	 EMPNO					   NOT NULL NUMBER(4)
	 ENAME						    VARCHAR2(10)
	 JOB						    VARCHAR2(9)
	 MGR						    NUMBER(4)
	 HIREDATE					    DATE
	 SAL						    NUMBER(7,2)
	 COMM						    NUMBER(7,2)
	 DEPTNO 					    NUMBER(2)

	SCOTT>
	SCOTT> set linesize 1000
	SCOTT> select * from test01;

	     EMPNO ENAME      JOB	       MGR HIREDATE	    SAL       COMM     DEPTNO
	---------- ---------- --------- ---------- --------- ---------- ---------- ----------
	      7369 SMITH      CLERK	      7902 17-DEC-80	    800 		   20
	      7499 ALLEN      SALESMAN	      7698 20-FEB-81	   1600        300	   30
	      7521 WARD       SALESMAN	      7698 22-FEB-81	   1250        500	   30
	      7566 JONES      MANAGER	      7839 02-APR-81	   2975 		   20
	      7654 MARTIN     SALESMAN	      7698 28-SEP-81	   1250       1400	   30
	      7698 BLAKE      MANAGER	      7839 01-MAY-81	   2850 		   30
	      7782 CLARK      MANAGER	      7839 09-JUN-81	   2450 		   10
	      7788 SCOTT      ANALYST	      7566 19-APR-87	   3000 		   20
	      7839 KING       PRESIDENT 	   17-NOV-81	   5000 		   10
	      7844 TURNER     SALESMAN	      7698 08-SEP-81	   1500 	 0	   30
	      7876 ADAMS      CLERK	      7788 23-MAY-87	   1100 		   20

	     EMPNO ENAME      JOB	       MGR HIREDATE	    SAL       COMM     DEPTNO
	---------- ---------- --------- ---------- --------- ---------- ---------- ----------
	      7900 JAMES      CLERK	      7698 03-DEC-81	    950 		   30
	      7902 FORD       ANALYST	      7566 03-DEC-81	   3000 		   20
	      7934 MILLER     CLERK	      7782 23-JAN-82	   1300 		   10

	14 rows selected.

	SCOTT> 


查看allen：7499员工的位置

	SCOTT> select dbms_rowid.ROWID_OBJECT(rowid) data_object_id#,dbms_rowid.ROWID_RELATIVE_FNO(rowid) rfile#,dbms_rowid.ROWID_BLOCK_NUMBER(rowid) block#,dbms_rowid.ROWID_ROW_NUMBER(rowid) row#,rowid from test01 where empno=7499;

	DATA_OBJECT_ID#     RFILE#     BLOCK#	    ROW# ROWID
	--------------- ---------- ---------- ---------- ------------------
		  77707 	 4	13171	       1 AAAS+LAAEAAADNzAAB

	SCOTT> 

记录在数据块中的地址：dba 4，13171

停库：

	SCOTT> conn / as sysdba
	Connected.
	SYS> alter system flush shared_pool;

	System altered.

	SYS> alter system flush buffer_cache;

	System altered.

	SYS> shu immediate;
	Database closed.
	Database dismounted.
	ORACLE instance shut down.
	SYS> 

BBED设置DBA，然后查找 ALLEN的内容



	BBED> set dba 4,13171
		DBA            	0x01003373 (16790387 4,13171)

	BBED> show
		FILE#          	4
		BLOCK#         	13171
		OFFSET         	0
		DBA            	0x01003373 (16790387 4,13171)
		FILENAME       	/u01/app/oracle/oradata/PROD1/users01.dbf
		BIFILE         	bifile.bbd
		LISTFILE       	/home/oracle/prod1_list.txt
		BLOCKSIZE      	8192
		MODE           	Edit
		EDIT           	Unrecoverable
		IBASE          	Dec
		OBASE          	Dec
		WIDTH          	80
		COUNT          	512
		LOGFILE        	log.bbd
		SPOOL          	No

	BBED>

	BBED> find /c ALLEN
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171            Offsets: 8115 to 8191           Dba:0x01003373
	------------------------------------------------------------------------
	 414c4c45 4e085341 4c45534d 414e03c2 4d630777 b5021401 010102c2 1102c204 
	 02c11f2c 000803c2 4a460553 4d495448 05434c45 524b03c2 50030777 b40c1101 
	 010102c2 09ff02c1 15020618 b3 

	 <32 bytes per line>

	BBED> modify /c hong dba 4,13171 offset 8115
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171            Offsets: 8115 to 8191           Dba:0x01003373
	------------------------------------------------------------------------
	 686f6e67 4e085341 4c45534d 414e03c2 4d630777 b5021401 010102c2 1102c204 
	 02c11f2c 000803c2 4a460553 4d495448 05434c45 524b03c2 50030777 b40c1101 
	 010102c2 09ff02c1 15020618 b3 

	 <32 bytes per line>

	BBED> 
	BBED> dump /v dba 4,13171 offset 8115
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171   Offsets: 8115 to 8191  Dba:0x01003373
	-------------------------------------------------------
	 686f6e67 4e085341 4c45534d 414e03c2 l hongN.SALESMAN.
	 4d630777 b5021401 010102c2 1102c204 l Mc.w�......�..�.
	 02c11f2c 000803c2 4a460553 4d495448 l .�.,...�JF.SMITH
	 05434c45 524b03c2 50030777 b40c1101 l .CLERK.�P..w�...
	 010102c2 09ff02c1 15020618 b3       l ...�...�....�

	 <16 bytes per line>

	BBED> 

	通过dba,offset定位到allen的位置之后，修改为hong
	最后dump确认内容

sum校验：


	BBED> sum dba 4,13171
	Check value for File 4, Block 13171:
	current = 0xc578, required = 0xce79

	BBED> sum dba 4,13171 apply
	Check value for File 4, Block 13171:
	current = 0xce79, required = 0xce79

	BBED> 

起库查看：

	SYS> startup
	ORACLE instance started.

	Total System Global Area  418484224 bytes
	Fixed Size		    1345352 bytes
	Variable Size		  301992120 bytes
	Database Buffers	  109051904 bytes
	Redo Buffers		    6094848 bytes
	Database mounted.
	Database opened.
	SYS> conn scott/oracle
	Connected.
	SCOTT> select * from test01;

	     EMPNO ENAME      JOB	       MGR HIREDATE	    SAL       COMM     DEPTNO
	---------- ---------- --------- ---------- --------- ---------- ---------- ----------
	      7369 SMITH      CLERK	      7902 17-DEC-80	    800 		   20
	      7499 hongN      SALESMAN	      7698 20-FEB-81	   1600        300	   30
	      7521 WARD       SALESMAN	      7698 22-FEB-81	   1250        500	   30
	      7566 JONES      MANAGER	      7839 02-APR-81	   2975 		   20
	      7654 MARTIN     SALESMAN	      7698 28-SEP-81	   1250       1400	   30
	      7698 BLAKE      MANAGER	      7839 01-MAY-81	   2850 		   30
	      7782 CLARK      MANAGER	      7839 09-JUN-81	   2450 		   10
	      7788 SCOTT      ANALYST	      7566 19-APR-87	   3000 		   20
	      7839 KING       PRESIDENT 	   17-NOV-81	   5000 		   10
	      7844 TURNER     SALESMAN	      7698 08-SEP-81	   1500 	 0	   30
	      7876 ADAMS      CLERK	      7788 23-MAY-87	   1100 		   20

	     EMPNO ENAME      JOB	       MGR HIREDATE	    SAL       COMM     DEPTNO
	---------- ---------- --------- ---------- --------- ---------- ---------- ----------
	      7900 JAMES      CLERK	      7698 03-DEC-81	    950 		   30
	      7902 FORD       ANALYST	      7566 03-DEC-81	   3000 		   20
	      7934 MILLER     CLERK	      7782 23-JAN-82	   1300 		   10

	14 rows selected.

	SCOTT> 

	allen变为了hongN了

	      7499 hongN      SALESMAN	      7698 20-FEB-81	   1600        300	   30

重新停库修改一下：

	BBED> modify /c 'hong ' dba 4,13171 offset 8115
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171            Offsets: 8115 to 8191           Dba:0x01003373
	------------------------------------------------------------------------
	 686f6e67 20085341 4c45534d 414e03c2 4d630777 b5021401 010102c2 1102c204 
	 02c11f2c 000803c2 4a460553 4d495448 05434c45 524b03c2 50030777 b40c1101 
	 010102c2 09ff02c1 15020618 b3 

	 <32 bytes per line>

	BBED> dump /v dba 4,13171 offset 8115
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171   Offsets: 8115 to 8191  Dba:0x01003373
	-------------------------------------------------------
	 686f6e67 20085341 4c45534d 414e03c2 l hong .SALESMAN.
	 4d630777 b5021401 010102c2 1102c204 l Mc.w�......�..�.
	 02c11f2c 000803c2 4a460553 4d495448 l .�.,...�JF.SMITH
	 05434c45 524b03c2 50030777 b40c1101 l .CLERK.�P..w�...
	 010102c2 09ff02c1 15020618 b3       l ...�...�....�

	 <16 bytes per line>

	BBED> sum dba 4,13171
	Check value for File 4, Block 13171:
	current = 0xce79, required = 0xa079

	BBED> sum dba 4,13171 apply
	Check value for File 4, Block 13171:
	current = 0xa079, required = 0xa079

	BBED> 

	SYS> startup
	ORACLE instance started.

	Total System Global Area  418484224 bytes
	Fixed Size		    1345352 bytes
	Variable Size		  301992120 bytes
	Database Buffers	  109051904 bytes
	Redo Buffers		    6094848 bytes
	Database mounted.
	Database opened.
	SYS> select * from scott.test01;

	     EMPNO ENAME      JOB	       MGR HIREDATE	    SAL       COMM     DEPTNO
	---------- ---------- --------- ---------- --------- ---------- ---------- ----------
	      7369 SMITH      CLERK	      7902 17-DEC-80	    800 		   20
	      7499 hong       SALESMAN	      7698 20-FEB-81	   1600        300	   30
	      7521 WARD       SALESMAN	      7698 22-FEB-81	   1250        500	   30
	      7566 JONES      MANAGER	      7839 02-APR-81	   2975 		   20
	      7654 MARTIN     SALESMAN	      7698 28-SEP-81	   1250       1400	   30
	      7698 BLAKE      MANAGER	      7839 01-MAY-81	   2850 		   30
	      7782 CLARK      MANAGER	      7839 09-JUN-81	   2450 		   10
	      7788 SCOTT      ANALYST	      7566 19-APR-87	   3000 		   20
	      7839 KING       PRESIDENT 	   17-NOV-81	   5000 		   10
	      7844 TURNER     SALESMAN	      7698 08-SEP-81	   1500 	 0	   30
	      7876 ADAMS      CLERK	      7788 23-MAY-87	   1100 		   20

	     EMPNO ENAME      JOB	       MGR HIREDATE	    SAL       COMM     DEPTNO
	---------- ---------- --------- ---------- --------- ---------- ---------- ----------
	      7900 JAMES      CLERK	      7698 03-DEC-81	    950 		   30
	      7902 FORD       ANALYST	      7566 03-DEC-81	   3000 		   20
	      7934 MILLER     CLERK	      7782 23-JAN-82	   1300 		   10

	14 rows selected.

	SYS> 

#### 通过bbed恢复delete的一行数据

需要说明的是：一条记录如果被删除的话，实际ORACLE在数据块中并没有立马把这条记录清除，而是在行头中将该条记录标记为删除。

Oracle中表的数据块由块头、事务槽、行字典、行数据等多种结构组成。 行数据(rowdata)实际是由许多row piece 行片组成的，每一条row piece的头部都有flag、locks、cols(cc)三个标志位。
其中flag标记了该row piece的类型，该flag位占用一个字节，其不同的bit位代表不同的含义，见下表：

	ROW_CLUSTER_KEY = 0x80;              KDRHFK
	ROW_CTABLE_NUMBER = 0x40;            KDRHFC
	ROW_HEAD_PIECE = 0x20;               KDRHFH
	ROW_DELETED_ROW = 0x10;              KDRHFD
	ROW_FIRST_PIECE = 0x08;              KDRHFF
	ROW_LAST_PIECE = 0x04;               KDRHFL
	ROW_FROM_PREVIOUS = 0x02;            KDRHFP
	ROW_CONTINUE_NEXT = 0x01;            KDRHFN

一般来说最普通的一条row piece是普通堆表(heap table)的未被删除的且无行迁移/链接的，普通row的flag一般为：

	Single Row = ROW_HEAD_PIECE + ROW_FIRST_PIECE + ROW_LAST_PIECE= 0x20 + 0x08 + 0x04= 0x2c

cluster key的flag一般为：

	Cluster Key =
	ROW_CLUSTER_KEY + ROW_HEAD_PIECE + ROW_FIRST_PIECE + ROW_LAST_PIECE=
	KDRHFL, KDRHFF, KDRHFH, KDRHFK =0x80 + 0x2c =  0xac

操作：

	SYS> select  dbms_rowid.rowid_relative_fno(rowid) file#,dbms_rowid.rowid_block_number(rowid) block# from scott.test01;

	     FILE#     BLOCK#
	---------- ----------
		 4	13171
		 4	13171
		 4	13171
		 4	13171
		 4	13171
		 4	13171
		 4	13171
		 4	13171
		 4	13171
		 4	13171
		 4	13171

	     FILE#     BLOCK#
	---------- ----------
		 4	13171
		 4	13171
		 4	13171

	14 rows selected.

	SYS> 


	BBED> show        
		FILE#          	4
		BLOCK#         	13171
		OFFSET         	8115
		DBA            	0x01003373 (16790387 4,13171)
		FILENAME       	/u01/app/oracle/oradata/PROD1/users01.dbf
		BIFILE         	bifile.bbd
		LISTFILE       	/home/oracle/prod1_list.txt
		BLOCKSIZE      	8192
		MODE           	Edit
		EDIT           	Unrecoverable
		IBASE          	Dec
		OBASE          	Dec
		WIDTH          	80
		COUNT          	512
		LOGFILE        	log.bbd
		SPOOL          	No

	BBED> map /v
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171                                 Dba:0x01003373
	------------------------------------------------------------
	 KTB Data Block (Table/Cluster)

	 struct kcbh, 20 bytes                      @0       
	    ub1 type_kcbh                           @0       
	    ub1 frmt_kcbh                           @1       
	    ub1 spare1_kcbh                         @2       
	    ub1 spare2_kcbh                         @3       
	    ub4 rdba_kcbh                           @4       
	    ub4 bas_kcbh                            @8       
	    ub2 wrp_kcbh                            @12      
	    ub1 seq_kcbh                            @14      
	    ub1 flg_kcbh                            @15      
	    ub2 chkval_kcbh                         @16      
	    ub2 spare3_kcbh                         @18      

	 struct ktbbh, 96 bytes                     @20      
	    ub1 ktbbhtyp                            @20      
	    union ktbbhsid, 4 bytes                 @24      
	    struct ktbbhcsc, 8 bytes                @28      
	    sb2 ktbbhict                            @36      
	    ub1 ktbbhflg                            @38      
	    ub1 ktbbhfsl                            @39      
	    ub4 ktbbhfnx                            @40      
	    struct ktbbhitl[3], 72 bytes            @44      

	 struct kdbh, 14 bytes                      @124     
	    ub1 kdbhflag                            @124     
	    sb1 kdbhntab                            @125     
	    sb2 kdbhnrow                            @126     
	    sb2 kdbhfrre                            @128     
	    sb2 kdbhfsbo                            @130     
	    sb2 kdbhfseo                            @132     
	    sb2 kdbhavsp                            @134     
	    sb2 kdbhtosp                            @136     

	 struct kdbt[1], 4 bytes                    @138     
	    sb2 kdbtoffs                            @138     
	    sb2 kdbtnrow                            @140     

	 sb2 kdbr[14]                               @142     

	 ub1 freespace[7451]                        @170     

	 ub1 rowdata[567]                           @7621    

	 ub4 tailchk                                @8188    


	BBED> 

	BBED> p kdbr
	sb2 kdbr[0]                                 @142      8026
	sb2 kdbr[1]                                 @144      7983
	sb2 kdbr[2]                                 @146      7940
	sb2 kdbr[3]                                 @148      7899
	sb2 kdbr[4]                                 @150      7854
	sb2 kdbr[5]                                 @152      7813
	sb2 kdbr[6]                                 @154      7772
	sb2 kdbr[7]                                 @156      7732
	sb2 kdbr[8]                                 @158      7694
	sb2 kdbr[9]                                 @160      7651
	sb2 kdbr[10]                                @162      7613
	sb2 kdbr[11]                                @164      7575
	sb2 kdbr[12]                                @166      7536
	sb2 kdbr[13]                                @168      7497

	BBED> p *kdbr[0]
	rowdata[529]
	------------
	ub1 rowdata[529]                            @8150     0x2c

	BBED> 

	BBED> p *kdbr[1]
	rowdata[486]
	------------
	ub1 rowdata[486]                            @8107     0x2c

	BBED> 


kdbr[0]-kdb4[13]表示有14条记录 ,记录1的偏移量是8150,记录2的偏移量是8107
0x2c 就是对应偏移量中的值，也就是行头的FLAG值 (Single Row = ROW_HEAD_PIECE + ROW_FIRST_PIECE + ROW_LAST_PIECE= 0x20 + 0x08 + 0x04= 0x2c)。

删除记录看这偏移量值是多少：

	SYS> delete from scott.test01;

	14 rows deleted.

	SYS> commit;

	Commit complete.

	SYS> alter system checkpoint;

	System altered.

	SYS> select * from scott.test01;

	no rows selected

	SYS> alter system flush shared_pool;

	System altered.

	SYS> alter system flush buffer_cache;

	System altered.

	SYS> shu immediate;
	Database closed.
	Database dismounted.
	ORACLE instance shut down.
	SYS> 

查看kdbr内容

	BBED> set filename '/u01/app/oracle/oradata/PROD1/users01.dbf';
		FILENAME       	/u01/app/oracle/oradata/PROD1/users01.dbf

	BBED> set block 13171
		BLOCK#         	13171

	BBED> p kdbr
	sb2 kdbr[0]                                 @142      8026
	sb2 kdbr[1]                                 @144      7983
	sb2 kdbr[2]                                 @146      7940
	sb2 kdbr[3]                                 @148      7899
	sb2 kdbr[4]                                 @150      7854
	sb2 kdbr[5]                                 @152      7813
	sb2 kdbr[6]                                 @154      7772
	sb2 kdbr[7]                                 @156      7732
	sb2 kdbr[8]                                 @158      7694
	sb2 kdbr[9]                                 @160      7651
	sb2 kdbr[10]                                @162      7613
	sb2 kdbr[11]                                @164      7575
	sb2 kdbr[12]                                @166      7536
	sb2 kdbr[13]                                @168      7497

	BBED> p *kdbr[0]
	rowdata[529]
	------------
	ub1 rowdata[529]                            @8150     0x3c

	BBED> p *kdbr[1]
	rowdata[486]
	------------
	ub1 rowdata[486]                            @8107     0x3c

	BBED> p *kdbr[13]
	rowdata[0]
	----------
	ub1 rowdata[0]                              @7621     0x3c

	BBED> 

上面可以发现:标志位也变为了0x3c，也就是DELETE标志位被设置为了1。(dump中也可以看到是3c开头的内容)

把部分行的状态从0x3c修改会0x2c

	BBED> set offset 8150
		OFFSET         	8150

	BBED> dump /v count 13171
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171   Offsets: 8150 to 8191  Dba:0x01003373
	-------------------------------------------------------
	 3c020803 c24a4605 534d4954 4805434c l <...�JF.SMITH.CL
	 45524b03 c2500307 77b40c11 01010102 l ERK.�P..w�......
	 c209ff02 c1150106 f2c0              l �...�...�

	 <16 bytes per line>

	BBED> modify /x 2c
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171            Offsets: 8150 to 8191           Dba:0x01003373
	------------------------------------------------------------------------
	 2c020803 c24a4605 534d4954 4805434c 45524b03 c2500307 77b40c11 01010102 
	 c209ff02 c1150106 f2c0 

	 <32 bytes per line>

	BBED> set mode edit
		MODE           	Edit

	BBED> modify /x 2c
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171            Offsets: 8150 to 8191           Dba:0x01003373
	------------------------------------------------------------------------
	 2c020803 c24a4605 534d4954 4805434c 45524b03 c2500307 77b40c11 01010102 
	 c209ff02 c1150106 f2c0 

	 <32 bytes per line>

	BBED> set offset 8107
		OFFSET         	8107

	BBED> dump /v count 13171
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171   Offsets: 8107 to 8191  Dba:0x01003373
	-------------------------------------------------------
	 3c020803 c24b6405 686f6e67 20085341 l <...�Kd.hong .SA
	 4c45534d 414e03c2 4d630777 b5021401 l LESMAN.�Mc.w�...
	 010102c2 1102c204 02c11f2c 020803c2 l ...�..�..�.,...
	 4a460553 4d495448 05434c45 524b03c2 l JF.SMITH.CLERK.
	 50030777 b40c1101 010102c2 09ff02c1 l P..w�......�...
	 150106f2 c0                         l ...�

	 <16 bytes per line>

	BBED> modify /x 2c
	 File: /u01/app/oracle/oradata/PROD1/users01.dbf (4)
	 Block: 13171            Offsets: 8107 to 8191           Dba:0x01003373
	------------------------------------------------------------------------
	 2c020803 c24b6405 686f6e67 20085341 4c45534d 414e03c2 4d630777 b5021401 
	 010102c2 1102c204 02c11f2c 020803c2 4a460553 4d495448 05434c45 524b03c2 
	 50030777 b40c1101 010102c2 09ff02c1 150106f2 c0 

	 <32 bytes per line>

	BBED> sum dba 4,13171 
	Check value for File 4, Block 13171:
	current = 0x5159, required = 0x4149

	BBED> sum dba 4,13171 apply
	Check value for File 4, Block 13171:
	current = 0x4149, required = 0x4149

	BBED> verify
	DBVERIFY - Verification starting
	FILE = /u01/app/oracle/oradata/PROD1/users01.dbf
	BLOCK = 13171

	Block Checking: DBA = 16790387, Block Type = KTB-managed data block
	data header at 0x3c627c
	kdbchk: the amount of space used is not equal to block size
		used=151 fsc=539 avsp=7451 dtl=8064
	Block 13171 failed with check code 6110

	DBVERIFY - Verification complete

	Total Blocks Examined         : 1
	Total Blocks Processed (Data) : 1
	Total Blocks Failing   (Data) : 1
	Total Blocks Processed (Index): 0
	Total Blocks Failing   (Index): 0
	Total Blocks Empty            : 0
	Total Blocks Marked Corrupt   : 0
	Total Blocks Influx           : 0
	Message 531 not found;  product=RDBMS; facility=BBED


	BBED> p kdbr[0]
	sb2 kdbr[0]                                 @142      8026

	BBED> p *kdbr[0]
	rowdata[529]
	------------
	ub1 rowdata[529]                            @8150     0x2c

	BBED> p *kdbr[1]
	rowdata[486]
	------------
	ub1 rowdata[486]                            @8107     0x2c

	BBED> p *kdbr[2]
	rowdata[443]
	------------
	ub1 rowdata[443]                            @8064     0x3c

	BBED> x /rncc offset 8150
	rowdata[529]                                @8150    
	------------
	flag@8150: 0x2c (KDRHFL, KDRHFF, KDRHFH)
	lock@8151: 0x02
	cols@8152:    8

	col    0[3] @8153: 7369 
	col    1[5] @8157: SMITH
	col    2[5] @8163: CLERK
	col    3[3] @8169: �P.
	col    4[7] @8173: w�.....
	col    5[2] @8181: �.
	col    6[0] @8184: *NULL*
	col    7[2] @8185: �.


	BBED> 

通过sqlplus重启后查看，已经有两行数据恢复回来了

	SYS> startup
	ORACLE instance started.

	Total System Global Area  418484224 bytes
	Fixed Size		    1345352 bytes
	Variable Size		  301992120 bytes
	Database Buffers	  109051904 bytes
	Redo Buffers		    6094848 bytes
	Database mounted.
	Database opened.
	SYS> select * from scott.test01;

	     EMPNO ENAME      JOB	       MGR HIREDATE	    SAL       COMM     DEPTNO
	---------- ---------- --------- ---------- --------- ---------- ---------- ----------
	      7369 SMITH      CLERK	      7902 17-DEC-80	    800 		   20
	      7499 hong       SALESMAN	      7698 20-FEB-81	   1600        300	   30

	SYS> 



#### 其他


##### get_rowid 函数

get_rowid 函数的实现,用于获得row_id的详信息，实现如下：

	create or replace function get_rowid
	(l_rowid in varchar2)
	return varchar2
	is
	ls_my_rowid varchar2(200);
	rowid_type number;
	object_number number;
	relative_fno number;
	block_number number;
	row_number number;
	begin
	 dbms_rowid.rowid_info(l_rowid,rowid_type,object_number,relative_fno,block_number,row_number);
	 ls_my_rowid := 'Object# is      :'||to_char(object_number)||chr(10)|| 'Relative_fno is :'||to_char(relative_fno)||chr(10)|| 'Block number is :'||to_char(block_number)||chr(10)|| 'Row number is   :'||to_char(row_number);
	 return ls_my_rowid;
	end;
	/

测试：

	SYS> 	create or replace function get_rowid
	(l_rowid in varchar2)
	return varchar2
	is
	ls_my_rowid varchar2(200);
	rowid_type number;
	object_number number;
	relative_fno number;
	block_number number;
	row_number number;
	begin
	 dbms_rowid.rowid_info(l_rowid,rowid_type,object_number,relative_fno,block_number,row_number);
	 ls_my_rowid := 'Object# is      :'||to_char(object_number)||chr(10)|| 'Relative_fno is :'||to_char(relative_fno)||chr(10)|| 'Block number is :'||to_char(block_number)||chr(10)|| 'Row number is   :'||to_char(row_number);
	 return ls_my_rowid;
	end;
	/  2    3    4    5    6    7    8    9   10   11   12   13   14   15   16  

	Function created.

	SYS> select rowid,test01.* from scott.test01;

	ROWID			EMPNO ENAME	 JOB		  MGR HIREDATE	       SAL	 COMM	  DEPTNO
	------------------ ---------- ---------- --------- ---------- --------- ---------- ---------- ----------
	AAAS+LAAEAAADNzAAA	 7369 SMITH	 CLERK		 7902 17-DEC-80        800		      20
	AAAS+LAAEAAADNzAAB	 7499 hong	 SALESMAN	 7698 20-FEB-81       1600	  300	      30

	SYS> select get_rowid('AAAS+LAAEAAADNzAAA') from dual;

	GET_ROWID('AAAS+LAAEAAADNZAAA')
	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Object# is	:77707
	Relative_fno is :4
	Block number is :13171
	Row number is	:0


	SYS> 

	SYS> select get_rowid('AAAS+LAAEAAADNzAAB') from dual;

	GET_ROWID('AAAS+LAAEAAADNZAAB')
	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	Object# is	:77707
	Relative_fno is :4
	Block number is :13171
	Row number is	:1


	SYS> 



##### DB(Data Block)/DBA（Data Block Address）/RDBA（Tablespace relative database block address）


+++ DB(Data Block)

	SYS> select dbms_rowid.rowid_relative_fno(rowid) REL_FNO, dbms_rowid.rowid_block_number(rowid) BLOCKNO, dbms_rowid.rowid_row_number(rowid) ROWNO,EMPNO,ENAME from scott.test01;

	   REL_FNO    BLOCKNO	   ROWNO      EMPNO ENAME
	---------- ---------- ---------- ---------- ----------
		 4	13171	       0       7369 SMITH
		 4	13171	       1       7499 hong

	SYS> 

	SYS> show parameter dump

	NAME				     TYPE	 VALUE
	------------------------------------ ----------- ------------------------------
	background_core_dump		     string	 partial
	background_dump_dest		     string	 /u01/app/oracle/diag/rdbms/pro
							 d1/PROD1/trace
	core_dump_dest			     string	 /u01/app/oracle/diag/rdbms/pro
							 d1/PROD1/cdump
	max_dump_file_size		     string	 unlimited
	shadow_core_dump		     string	 partial
	user_dump_dest			     string	 /u01/app/oracle/diag/rdbms/pro
							 d1/PROD1/trace
	SYS> !ls /u01/app/oracle/diag/rdbms/prod1/PROD1/trace

	SYS> oradebug setmypid;
	Statement processed.
	SYS>  oradebug tracefile_name
	/u01/app/oracle/diag/rdbms/prod1/PROD1/trace/PROD1_ora_22266.trc
	SYS> !cat /u01/app/oracle/diag/rdbms/prod1/PROD1/trace/PROD1_ora_22266.trc


	[oracle@tc_hong01 trace]$ cat PROD1_ora_22266.trc
	Trace file /u01/app/oracle/diag/rdbms/prod1/PROD1/trace/PROD1_ora_22266.trc
	Oracle Database 11g Enterprise Edition Release 11.2.0.3.0 - Production
	With the Partitioning, OLAP, Data Mining and Real Application Testing options
	ORACLE_HOME = /u01/app/oracle/product/11.2.0/dbhome_1
	System name:	Linux
	Node name:	tc_hong01
	Release:	2.6.18-164.el5PAE
	Version:	#1 SMP Thu Sep 3 02:28:20 EDT 2009
	Machine:	i686
	VM name:	VMWare Version: 6
	Instance name: PROD1
	Redo thread mounted by this instance: 1
	Oracle process number: 30
	Unix process pid: 22266, image: oracle@tc_hong01 (TNS V1-V3)


	*** 2017-03-03 16:23:05.103
	*** SESSION ID:(9.3) 2017-03-03 16:23:05.103
	*** CLIENT ID:() 2017-03-03 16:23:05.103
	*** SERVICE NAME:(SYS$USERS) 2017-03-03 16:23:05.103
	*** MODULE NAME:(sqlplus@tc_hong01 (TNS V1-V3)) 2017-03-03 16:23:05.103
	*** ACTION NAME:() 2017-03-03 16:23:05.103
	 
	kwqmnich: current time::  8: 23:  4: 0
	kwqmnich: instance no 0 repartition flag 1 
	kwqmnich: initialized job cache structure 
	kwqinfy: Call kwqrNondurSubInstTsk 
	Start dump data blocks tsn: 4 file#:4 minblk 13171 maxblk 13171

	*** 2017-03-03 17:00:32.804
	Block dump from cache:
	Dump of buffer cache at level 4 for tsn=4 rdba=16790387
	BH (0x2d7e57bc) file#: 4 rdba: 0x01003373 (4/13171) class: 1 ba: 0x2d486000
	  set: 5 pool: 3 bsz: 8192 bsi: 0 sflg: 2 pwc: 199,19
	  dbwrid: 0 obj: 77707 objn: 77707 tsn: 4 afn: 4 hint: f
	  hash: [0x378f0960,0x2b7fb304] lru: [0x2d7e5944,0x2d7e5794]
	  ckptq: [NULL] fileq: [NULL] objq: [0x350e35f8,0x350e35f8] objaq: [0x350e35f0,0x350e35f0]
	  st: XCURRENT md: NULL fpin: 'kdswh11: kdst_fetch' tch: 4
	  flags: only_sequential_access
	  LRBA: [0x0.0.0] LSCN: [0x0.0] HSCN: [0xffff.ffffffff] HSUB: [65535]
	Block dump from disk:
	buffer tsn: 4 rdba: 0x01003373 (4/13171)
	scn: 0x0000.001cc0f2 seq: 0x01 flg: 0x06 tail: 0xc0f20601
	frmt: 0x02 chkval: 0x4149 type: 0x06=trans data
	Hex dump of block: st=0, typ_found=1
	Dump of memory from 0x00BD2000 to 0x00BD4000
	BD2000 0000A206 01003373 001CC0F2 06010000  [....s3..........]
	BD2010 00004149 00000001 00012F8B 001CB316  [IA......./......]
	BD2020 00000000 00320003 01003370 0000FFFF  [......2.p3......]
	BD2030 00000000 00000000 00000000 00008000  [................]
	BD2040 001CB316 00170006 000003E9 00C003D6  [................]
	BD2050 00270149 021B200E 001CC0F2 00000000  [I.'.. ..........]
	BD2060 00000000 00000000 00000000 00000000  [................]
	BD2070 00000000 00000000 00000000 000E0100  [................]
	BD2080 002EFFFF 1D1B1D49 00001F52 1F5A000E  [....I...R.....Z.]
	BD2090 1F041F2F 1EAE1EDB 1E5C1E85 1E0E1E34  [/.........\.4...]
	BD20A0 1DBD1DE3 1D701D97 00001D49 00000000  [......p.I.......]
	BD20B0 00000000 00000000 00000000 00000000  [................]
		Repeat 464 times
	BD3DC0 00000000 08023C00 2350C203 4C494D06  [.....<....P#.MIL]
	BD3DD0 0552454C 52454C43 4EC2034B B6770753  [LER.CLERK..NS.w.]
	BD3DE0 01011701 0EC20201 0BC102FF 0308023C  [............<...]
	BD3DF0 040350C2 44524F46 414E4107 5453594C  [.P..FORD.ANALYST]
	BD3E00 434CC203 0CB57707 01010103 FF1FC202  [..LC.w..........]
	BD3E10 3C15C102 C2020802 414A0550 0553454D  [...<....P.JAMES.]
	BD3E20 52454C43 4DC2034B B5770763 0101030C  [CLERK..Mc.w.....]
	BD3E30 0AC20301 C102FF33 08023C1F 4D4FC203  [....3....<....OM]
	BD3E40 41444105 4305534D 4B52454C 594EC203  [.ADAMS.CLERK..NY]
	BD3E50 05BB7707 01010117 FF0CC202 3C15C102  [.w.............<]
	BD3E60 C2030802 54062D4F 454E5255 41530852  [....O-.TURNER.SA]
	BD3E70 4D53454C C2034E41 7707634D 010809B5  [LESMAN..Mc.w....]
	BD3E80 C2020101 02800110 023C1FC1 4FC20308  [..........<....O]
	BD3E90 494B0428 5009474E 49534552 544E4544  [(.KING.PRESIDENT]
	BD3EA0 B57707FF 0101110B 33C20201 0BC102FF  [..w........3....]
	BD3EB0 0308023C 05594EC2 544F4353 4E410754  [<....NY.SCOTT.AN]
	BD3EC0 53594C41 4CC20354 BB770743 01011304  [ALYST..LC.w.....]
	BD3ED0 1FC20201 15C102FF 0308023C 05534EC2  [........<....NS.]
	BD3EE0 52414C43 414D074B 4547414E 4FC20352  [CLARK.MANAGER..O]
	BD3EF0 B5770728 01010906 19C20301 C102FF33  [(.w.........3...]
	BD3F00 08023C0B 634DC203 414C4205 4D07454B  [.<....Mc.BLAKE.M]
	BD3F10 47414E41 C2035245 7707284F 010105B5  [ANAGER..O(.w....]
	BD3F20 C2030101 02FF331D 023C1FC1 4DC20308  [.....3....<....M]
	BD3F30 414D0637 4E495452 4C415308 414D5345  [7.MARTIN.SALESMA]
	BD3F40 4DC2034E B5770763 01011C09 0DC20301  [N..Mc.w.........]
	BD3F50 0FC20233 3C1FC102 C2030802 4A05434C  [3......<....LC.J]
	BD3F60 53454E4F 4E414D07 52454741 284FC203  [ONES.MANAGER..O(]
	BD3F70 04B57707 01010102 4C1EC203 15C102FF  [.w.........L....]
	BD3F80 0308023C 04164CC2 44524157 4C415308  [<....L..WARD.SAL]
	BD3F90 414D5345 4DC2034E B5770763 01011602  [ESMAN..Mc.w.....]
	BD3FA0 0DC20301 06C20233 2C1FC102 C2030802  [....3......,....]
	BD3FB0 6805644B 20676E6F 4C415308 414D5345  [Kd.hong .SALESMA]
	BD3FC0 4DC2034E B5770763 01011402 11C20201  [N..Mc.w.........]
	BD3FD0 0204C202 022C1FC1 4AC20308 4D530546  [......,....JF.SM]
	BD3FE0 05485449 52454C43 50C2034B B4770703  [ITH.CLERK..P..w.]
	BD3FF0 0101110C 09C20201 15C102FF C0F20601  [................]
	Block header dump:  0x01003373
	 Object id on Block? Y
	 seg/obj: 0x12f8b  csc: 0x00.1cb316  itc: 3  flg: E  typ: 1 - DATA
	     brn: 0  bdba: 0x1003370 ver: 0x01 opc: 0
	     inc: 0  exflg: 0
	 
	 Itl           Xid                  Uba         Flag  Lck        Scn/Fsc
	0x01   0xffff.000.00000000  0x00000000.0000.00  C---    0  scn 0x0000.001cb316
	0x02   0x0006.017.000003e9  0x00c003d6.0149.27  --U-   14  fsc 0x021b.001cc0f2
	0x03   0x0000.000.00000000  0x00000000.0000.00  ----    0  fsc 0x0000.00000000
	bdba: 0x01003373
	data_block_dump,data header at 0xbd207c
	===============
	tsiz: 0x1f80
	hsiz: 0x2e
	pbl: 0x00bd207c
	     76543210
	flag=--------
	ntab=1
	nrow=14
	frre=-1
	fsbo=0x2e
	fseo=0x1d49
	avsp=0x1d1b
	tosp=0x1f52
	0xe:pti[0]	nrow=14	offs=0
	0x12:pri[0]	offs=0x1f5a
	0x14:pri[1]	offs=0x1f2f
	0x16:pri[2]	offs=0x1f04
	0x18:pri[3]	offs=0x1edb
	0x1a:pri[4]	offs=0x1eae
	0x1c:pri[5]	offs=0x1e85
	0x1e:pri[6]	offs=0x1e5c
	0x20:pri[7]	offs=0x1e34
	0x22:pri[8]	offs=0x1e0e
	0x24:pri[9]	offs=0x1de3
	0x26:pri[10]	offs=0x1dbd
	0x28:pri[11]	offs=0x1d97
	0x2a:pri[12]	offs=0x1d70
	0x2c:pri[13]	offs=0x1d49
	block_row_dump:
	tab 0, row 0, @0x1f5a
	tl: 38 fb: --H-FL-- lb: 0x2  cc: 8
	col  0: [ 3]  c2 4a 46
	col  1: [ 5]  53 4d 49 54 48
	col  2: [ 5]  43 4c 45 52 4b
	col  3: [ 3]  c2 50 03
	col  4: [ 7]  77 b4 0c 11 01 01 01
	col  5: [ 2]  c2 09
	col  6: *NULL*
	col  7: [ 2]  c1 15
	tab 0, row 1, @0x1f2f
	tl: 43 fb: --H-FL-- lb: 0x2  cc: 8
	col  0: [ 3]  c2 4b 64
	col  1: [ 5]  68 6f 6e 67 20
	col  2: [ 8]  53 41 4c 45 53 4d 41 4e
	col  3: [ 3]  c2 4d 63
	col  4: [ 7]  77 b5 02 14 01 01 01
	col  5: [ 2]  c2 11
	col  6: [ 2]  c2 04
	col  7: [ 2]  c1 1f
	tab 0, row 2, @0x1f04
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 3, @0x1edb
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 4, @0x1eae
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 5, @0x1e85
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 6, @0x1e5c
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 7, @0x1e34
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 8, @0x1e0e
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 9, @0x1de3
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 10, @0x1dbd
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 11, @0x1d97
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 12, @0x1d70
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 13, @0x1d49
	tl: 2 fb: --HDFL-- lb: 0x2 
	end_of_block_dump
	End dump data blocks tsn: 4 file#: 4 minblk 13171 maxblk 13171
	[oracle@tc_hong01 trace]$ 

其中：block row dump

	block_row_dump:
	tab 0, row 0, @0x1f5a
	tl: 38 fb: --H-FL-- lb: 0x2  cc: 8
	col  0: [ 3]  c2 4a 46
	col  1: [ 5]  53 4d 49 54 48
	col  2: [ 5]  43 4c 45 52 4b
	col  3: [ 3]  c2 50 03
	col  4: [ 7]  77 b4 0c 11 01 01 01
	col  5: [ 2]  c2 09
	col  6: *NULL*
	col  7: [ 2]  c1 15
	tab 0, row 1, @0x1f2f
	tl: 43 fb: --H-FL-- lb: 0x2  cc: 8
	col  0: [ 3]  c2 4b 64
	col  1: [ 5]  68 6f 6e 67 20
	col  2: [ 8]  53 41 4c 45 53 4d 41 4e
	col  3: [ 3]  c2 4d 63
	col  4: [ 7]  77 b5 02 14 01 01 01
	col  5: [ 2]  c2 11
	col  6: [ 2]  c2 04
	col  7: [ 2]  c1 1f
	tab 0, row 2, @0x1f04
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 3, @0x1edb
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 4, @0x1eae
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 5, @0x1e85
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 6, @0x1e5c
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 7, @0x1e34
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 8, @0x1e0e
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 9, @0x1de3
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 10, @0x1dbd
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 11, @0x1d97
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 12, @0x1d70
	tl: 2 fb: --HDFL-- lb: 0x2 
	tab 0, row 13, @0x1d49
	tl: 2 fb: --HDFL-- lb: 0x2 
	end_of_block_dump
	End dump data blocks tsn: 4 file#: 4 minblk 13171 maxblk 13171

从上面dump出来值转为表中的值：

number类型：

`select utl_raw.cast_to_number(replace('c2,4a,46',',')) value from dual;`

varchar2类型：

`select utl_raw.cast_to_varchar2(replace('53,4d,49,54,48',',')) value from dual;`

	SYS> select * from scott.test01;

	     EMPNO ENAME      JOB	       MGR HIREDATE	    SAL       COMM     DEPTNO
	---------- ---------- --------- ---------- --------- ---------- ---------- ----------
	      7369 SMITH      CLERK	      7902 17-DEC-80	    800 		   20
	      7499 hong       SALESMAN	      7698 20-FEB-81	   1600        300	   30

	SYS> 

	SYS> select utl_raw.cast_to_number(replace('c2,4a,46',',')) value from dual;

	     VALUE
	----------
	      7369

	SYS> 

	SYS> select utl_raw.cast_to_varchar2(replace('53,4d,49,54,48',',')) value from dual;

	VALUE
	----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	SMITH

	SYS> 

其他类型使用desc utl_raw其他函数转换

另外dump多个block内容的话可以使用如下语法：

	ALTER SYSTEM dump datafile <file_id> block min <block_id> block max <block_id+blocks-1>;

+++ DBA（Data Block Address）

DBA一般指绝对数据块地址. rowid用来表示一行的物理地址，一行唯一确定一个rowid。在rowid 中，就有一段是来表示DBA的。

	SYS> select rowid,dbms_rowid.rowid_relative_fno(rowid) REL_FNO, dbms_rowid.rowid_block_number(rowid) BLOCKNO, dbms_rowid.rowid_row_number(rowid) ROWNO,EMPNO,ENAME from scott.test01;

	ROWID		      REL_FNO	 BLOCKNO      ROWNO	 EMPNO ENAME
	------------------ ---------- ---------- ---------- ---------- ----------
	AAAS+LAAEAAADNzAAA	    4	   13171	  0	  7369 SMITH
	AAAS+LAAEAAADNzAAB	    4	   13171	  1	  7499 hong

	SYS> 

将file number和block number转换成DBA：


	SYS> variable dba varchar2(30)
	SYS> exec :dba :=dbms_utility.make_data_block_address(4,13171);

	PL/SQL procedure successfully completed.

	SYS> print dba

	DBA
	--------------------------------------------------------------------------------------------------------------------------------
	16790387

	SYS> 

在dump文件中有下rdba:16790387 是一致的

	Dump of buffer cache at level 4 for tsn=4 rdba=16790387


将DBA转换成file number和block number：


	SYS> select dbms_utility.data_block_address_block(16790387) "BLOCK", dbms_utility.data_block_address_file(16790387) "FILE" from dual;

	     BLOCK	 FILE
	---------- ----------
	     13171	    4

	SYS> 

另外：RDBA（Tablespace relative database block address） RDBA是相对数据块地址，是数据字典(表空间及一些对象定义)所在块的地址。oracle 8以后，rowid的存储空间扩大到了10个字节(32bit object#+10bit rfile#+22bit block#+16bit row#)。rdba就是rowid中的rfile#+block#。


	Dump of buffer cache at level 4 for tsn=4 rdba=16790387
	BH (0x2d7e57bc) file#: 4 rdba: 0x01003373 (4/13171) --rdba的值 class: 1 ba: 0x2d486000


	data_block_dump,data header at 0xbd207c 

	0xe:pti[0]	nrow=14	offs=0 -该块中保存了14条记录。

通过：bdba: 0x01003373 定位数据文件号和block

	 Itl           Xid                  Uba         Flag  Lck        Scn/Fsc
	0x01   0xffff.000.00000000  0x00000000.0000.00  C---    0  scn 0x0000.001cb316
	0x02   0x0006.017.000003e9  0x00c003d6.0149.27  --U-   14  fsc 0x021b.001cc0f2
	0x03   0x0000.000.00000000  0x00000000.0000.00  ----    0  fsc 0x0000.00000000
	bdba: 0x01003373 ----》
	data_block_dump,data header at 0xbd207c



	SYS> select dbms_utility.data_block_address_file(to_number(ltrim('0x01003373','0x'),'xxxxxxxx')) as file_no,dbms_utility.data_block_address_block(to_number(ltrim('0x01003373','0x'),'xxxxxxxx')) as block_no from dual;

	   FILE_NO   BLOCK_NO
	---------- ----------
		 4	13171

	SYS> 


#### 参考：

[【BBED】使用bbed恢复已经删除的行数据 ](https://yq.aliyun.com/articles/28312)


[DBA Scripts:转换RDBA的文件和数据块地址](http://www.eygle.com/archives/2007/07/function_rdba_convert.html)


