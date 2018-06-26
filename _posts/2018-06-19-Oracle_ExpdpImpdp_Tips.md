---
layout: post
title: "Oracle Recovery 05 - How to use BBED to recovery miss-archivelog file?"
category: Oracle
tags: Oracle dump controlfile 
---

* content
{:toc}


Oracle Recovery 05 - How to use BBED to recovery miss-archivelog file?

Use bbed to skip the miss archivelog file to recover database.







### Database env

Linux: OEL7.3 x86-64

	[oracle@databasevm001 ~]$ cat /etc/redhat-release 
	Red Hat Enterprise Linux Server release 7.3 (Maipo)
	[oracle@databasevm001 ~]$ uname -a
	Linux databasevm001 4.1.12-61.1.28.el7uek.x86_64 #2 SMP Thu Feb 23 19:55:12 PST 2017 x86_64 x86_64 x86_64 GNU/Linux
	[oracle@databasevm001 ~]$ 

	SYS@orcl11g> select * from v$version;

Database: 11.2.0.4

	BANNER
	--------------------------------------------------------------------------------
	Oracle Database 11g Enterprise Edition Release 11.2.0.4.0 - Production
	PL/SQL Release 11.2.0.4.0 - Production
	CORE    11.2.0.4.0      Production
	TNS for Linux: Version 11.2.0.4.0 - Production
	NLSRTL Version 11.2.0.4.0 - Production

	SYS@orcl11g> 

### Prepare Test Scenario

Archive log mode and set path/size for db_recovery_file_dest.

	SYS@orcl11g> archive log list
	SYS@orcl11g> show parameter recovery

Create tablespace and insert data.

	SYS@orcl11g> create tablespace arch_test datafile '/u01/app/oracle/oradata/orcl11g/arch_test01.dbf' size 100m;
	SYS@orcl11g> create user test01 identified by oracle default tablespace arch_test;
	SYS@orcl11g> grant dba to test01;
	SYS@orcl11g> conn test01/oracle
	TEST01@orcl11g> create table t1(id int, name varchar2(20));
	TEST01@orcl11g> insert into t1 values(1,'aaaaaaaaa');
	TEST01@orcl11g> insert into t1 values(2,'bbbbbbbbb');
	TEST01@orcl11g> commit;

Backup the tablespace.

	SYS@orcl11g> conn / as sysdba
	SYS@orcl11g> col file_name for a60
	SYS@orcl11g> select file_id,file_name from dba_data_files order by 1;
         9 /u01/app/oracle/oradata/orcl11g/arch_test01.dbf

	[oracle@databasevm001 ~]$ rman target /
	RMAN> backup datafile 9 format '/home/oracle/backup/tbs09_%U';

Switch log files by multi times.

	SYS@orcl11g> select sequence#,status from v$archived_log order by 1 desc;
	SYS@orcl11g> alter system switch logfile;
	SYS@orcl11g> alter system switch logfile;
	SYS@orcl11g> /
	SYS@orcl11g> /
	.....

	[oracle@databasevm001 2018_06_18]$ pwd
	/u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_06_18
	[oracle@databasevm001 2018_06_18]$ ls 
	o1_mf_1_19_fljyfdkw_.arc  o1_mf_1_21_flk0w8g7_.arc  o1_mf_1_23_flk0wgsg_.arc  o1_mf_1_25_flk11fxl_.arc
	o1_mf_1_20_flk0w5cb_.arc  o1_mf_1_22_flk0wdvw_.arc  o1_mf_1_24_flk11dpt_.arc  o1_mf_1_26_flk11m3h_.arc
	[oracle@databasevm001 2018_06_18]$ 


	SYS@orcl11g> select sequence#,status from v$archived_log order by 1 desc;
	SEQUENCE# S
	---------- -
			62 D
			29 A
			28 A
			27 A
			26 A
			25 A
	......

Delete the No.27 and No.28 archivelog files.

	[oracle@databasevm001 2018_06_18]$ pwd
	/u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_06_18
	[oracle@databasevm001 2018_06_18]$ rm o1_mf_1_27_flk13ox4_.arc o1_mf_1_28_flk13ppf_.arc
	[oracle@databasevm001 2018_06_18]$ 

Offline the tablespace:arch_test(No.9).

	select FILE#, CREATION_CHANGE#,CHECKPOINT_CHANGE#,UNRECOVERABLE_CHANGE#,LAST_CHANGE#,OFFLINE_CHANGE#,STATUS from v$datafile order by 1;

		FILE# CREATION_CHANGE# CHECKPOINT_CHANGE# UNRECOVERABLE_CHANGE# LAST_CHANGE# OFFLINE_CHANGE# STATUS
	---------- ---------------- ------------------ --------------------- ------------ --------------- -------
			1                7            1648231                     0                            0 SYSTEM
			2             1834            1648231                     0                            0 ONLINE
			3          1411137            1648231                     0                            0 ONLINE
			4            16009            1648231               1509949                            0 ONLINE
			5          1097396            1648231                     0                            0 ONLINE
			6          1435242            1648231                     0                            0 ONLINE
			7          1466248            1648231                     0                            0 ONLINE
			8          1435242            1443325               1467922      1443325               0 ONLINE
			9          1647340            1648231                     0                            0 ONLINE


	In the archivelog mode, the "stop scn" of the datafile header will be updated. the datafile's "stop scn" in controlfile is also updated, and the "offline scn" is the same. The "offline scn" = The "stop scn".

	archivelog模式下，当数据文件offline时，其对应的数据文件头stop scn会更新，同时controlfile中该datafile的stop scn信息也会更新，此时也会更新offline scn，并且offline scn等于stop scn。

### Restore datafile

	SYS@orcl11g> shu immediate;
	Database closed.
	Database dismounted.
	ORACLE instance shut down.
	SYS@orcl11g> startup mount;

	[oracle@databasevm001 ~]$ rman target /
	RMAN> restore datafile 9;

	channel ORA_DISK_1: restoring datafile 00009 to /u01/app/oracle/oradata/orcl11g/arch_test01.dbf
	channel ORA_DISK_1: reading from backup piece /home/oracle/backup/tbs09_0mt5qcoa_1_1
	channel ORA_DISK_1: piece handle=/home/oracle/backup/tbs09_0mt5qcoa_1_1 tag=TAG20180619T041402
	channel ORA_DISK_1: restored backup piece 1
	channel ORA_DISK_1: restore complete, elapsed time: 00:00:03

	SYS@orcl11g> select open_mode from v$database;
	OPEN_MODE
	--------------------
	MOUNTED
	SYS@orcl11g> alter database open;
	alter database open
	*
	ERROR at line 1:
	ORA-01113: file 9 needs media recovery
	ORA-01110: data file 9: '/u01/app/oracle/oradata/orcl11g/arch_test01.dbf'
	SYS@orcl11g> 


	SYS@orcl11g> recover datafile 9;

	ORA-00308: cannot open archived log '/u01/app/oracle/fast_recovery_area/ORCL11G/archivelog/2018_06_19/o1_mf_1_27_flk13ox4_.arc'
	ORA-27037: unable to obtain file status
	Linux Error: 2: No such file or directory
	Additional information: 3

	#### The archivelog file No.27&No.28 are missed. The recovery should be from No.50.
	SYS@orcl11g> select to_char(SEQUENCE#,'xxxxxxxxxxx') seq,to_char(FIRST_CHANGE#,'xxxxxxxxxxx') scn from v$archived_log where SEQUENCE#=29; 
	SEQ          SCN
	------------ ------------
			1d       192664   ######## -> 64261900
	SYS@orcl11g> 

	## The list files in BBED tools
	SYS@orcl11g> select file#||chr(9)||name||chr(9)||bytes from v$datafile;

Use BBED to modify the datafile's header

	BBED> info
	File#  Name                                                        Size(blks)
	-----  ----                                                        ----------
		1  /u01/app/oracle/oradata/orcl11g/system01.dbf                     97280
		2  /u01/app/oracle/oradata/orcl11g/sysaux01.dbf                     79360
		3  /u01/app/oracle/oradata/orcl11g/undotbs01.dbf                    12800
		4  /u01/app/oracle/oradata/orcl11g/users01.dbf                     102400
		5  /u01/app/oracle/oradata/orcl11g/data01.dbf                       12800
		6  /u01/app/oracle/oradata/orcl11g/rec_tbs01.dbf                    12800
		7  /u01/app/oracle/oradata/orcl11g/rec_tbs_temp001.dbf              12800
		8  /home/oracle/backup_tts/rec_tbs01.dbf                            12800
		9  /u01/app/oracle/oradata/orcl11g/arch_test01.dbf                  12800

	BBED> 
	BBED> set file 9 block 1
			FILE#           9
			BLOCK#          1

	BBED> 
	BBED> map /v
	File: /u01/app/oracle/oradata/orcl11g/arch_test01.dbf (9)
	Block: 1                                     Dba:0x02400001
	------------------------------------------------------------
	Data File Header

	struct kcvfh, 860 bytes                    @0       
		struct kcvfhbfh, 20 bytes               @0       
		struct kcvfhhdr, 76 bytes               @20      
		ub4 kcvfhrdb                            @96      
		struct kcvfhcrs, 8 bytes                @100     
		ub4 kcvfhcrt                            @108     
		ub4 kcvfhrlc                            @112     
		struct kcvfhrls, 8 bytes                @116     
		ub4 kcvfhbti                            @124     
		struct kcvfhbsc, 8 bytes                @128     
		ub2 kcvfhbth                            @136     
		ub2 kcvfhsta                            @138     
		struct kcvfhckp, 36 bytes               @484     ### ---->
		ub4 kcvfhcpc                            @140     
		ub4 kcvfhrts                            @144     

	BBED> p kcvfhckp
	struct kcvfhckp, 36 bytes                   @484     
	struct kcvcpscn, 8 bytes                 @484      ### ----> SCN
		ub4 kscnbas                           @484      0x00192638
		ub2 kscnwrp                           @488      0x0000
	ub4 kcvcptim                             @492      0x3a5d3433
	ub2 kcvcpthr                             @496      0x0001
	union u, 12 bytes                        @500     
		struct kcvcprba, 12 bytes             @500     
			ub4 kcrbaseq                       @500      0x0000001b ### ----> SEQ
			ub4 kcrbabno                       @504      0x00000002
			ub2 kcrbabof                       @508      0x0000
	ub1 kcvcpetb[0]                          @512      0x02
	ub1 kcvcpetb[1]                          @513      0x00
	ub1 kcvcpetb[2]                          @514      0x00
	ub1 kcvcpetb[3]                          @515      0x00
	ub1 kcvcpetb[4]                          @516      0x00
	ub1 kcvcpetb[5]                          @517      0x00
	ub1 kcvcpetb[6]                          @518      0x00
	ub1 kcvcpetb[7]                          @519      0x00

	BBED> 
	BBED> dump /v offset 484 count 32
	File: /u01/app/oracle/oradata/orcl11g/arch_test01.dbf (9)
	Block: 1       Offsets:  484 to  515  Dba:0x02400001
	-------------------------------------------------------
	38261900 00001000 33345d3a 01000000 l 8&......34]:....
	1b000000 02000000 00000000 02000000 l ................

	<16 bytes per line>

	BBED> 

	## ->>>>64261900    Modify to this value for SCN 

	BBED> dump /v offset 484 count 32
	File: /u01/app/oracle/oradata/orcl11g/arch_test01.dbf (9)
	Block: 1       Offsets:  484 to  515  Dba:0x02400001
	-------------------------------------------------------
	38261900 00001000 33345d3a 01000000 l 8&......34]:....
	1b000000 02000000 00000000 02000000 l ................

	<16 bytes per line>

	BBED> 
	BBED> modify /x 64 offset 484
	File: /u01/app/oracle/oradata/orcl11g/arch_test01.dbf (9)
	Block: 1                Offsets:  484 to  515           Dba:0x02400001
	------------------------------------------------------------------------
	64261900 00001000 33345d3a 01000000 1b000000 02000000 00000000 02000000 

	<32 bytes per line>

	BBED> modify /x 261900 offset 485
	File: /u01/app/oracle/oradata/orcl11g/arch_test01.dbf (9)
	Block: 1                Offsets:  485 to  516           Dba:0x02400001
	------------------------------------------------------------------------
	26190000 00100033 345d3a01 0000001b 00000002 00000000 00000002 00000000 

	<32 bytes per line>

	BBED> dump /v offset 484 count 32
	File: /u01/app/oracle/oradata/orcl11g/arch_test01.dbf (9)
	Block: 1       Offsets:  484 to  515  Dba:0x02400001
	-------------------------------------------------------
	64261900 00001000 33345d3a 01000000 l d&......34]:....
	1b000000 02000000 00000000 02000000 l ................

	<16 bytes per line>

	BBED> sum apply
	Check value for File 9, Block 1:
	current = 0xc920, required = 0xc920

	BBED> 

	## Current SCN is the following value.

	SYS@orcl11g> select to_number('1d','xxxxxxxxxxxxxxxxx') from dual;
	TO_NUMBER('1D','XXXXXXXXXXXXXXXXX')
	-----------------------------------
									29
	SYS@orcl11g> 

	## The value SCN in datafile is the following value.

	SYS@orcl11g> select to_number('1b','xxxxxxxxxxxxxxxxx') from dual;
	TO_NUMBER('1B','XXXXXXXXXXXXXXXXX')
	-----------------------------------
									27
	SYS@orcl11g> 

	## Modifiy the SCN 27 to SCN 29.

	BBED> dump /v offset 500
	File: /u01/app/oracle/oradata/orcl11g/arch_test01.dbf (9)
	Block: 1       Offsets:  500 to  531  Dba:0x02400001
	-------------------------------------------------------
	1b000000 02000000 00000000 02000000 l ................
	00000000 00000000 00000000 00000000 l ................

	<16 bytes per line>

	BBED> modify /x 1d offset 500
	File: /u01/app/oracle/oradata/orcl11g/arch_test01.dbf (9)
	Block: 1                Offsets:  500 to  531           Dba:0x02400001
	------------------------------------------------------------------------
	1d000000 02000000 00000000 02000000 00000000 00000000 00000000 00000000 

	<32 bytes per line>

	BBED> dump /v offset 504
	File: /u01/app/oracle/oradata/orcl11g/arch_test01.dbf (9)
	Block: 1       Offsets:  504 to  535  Dba:0x02400001
	-------------------------------------------------------
	02000000 00000000 02000000 00000000 l ................
	00000000 00000000 00000000 00000000 l ................

	<16 bytes per line>

	BBED> modify /x 0100 offset 504
	File: /u01/app/oracle/oradata/orcl11g/arch_test01.dbf (9)
	Block: 1                Offsets:  504 to  535           Dba:0x02400001
	------------------------------------------------------------------------
	01000000 00000000 02000000 00000000 00000000 00000000 00000000 00000000 

	<32 bytes per line>

	BBED> sum apply
	Check value for File 9, Block 1:
	current = 0xc925, required = 0xc925

	BBED> 

Recover the database again and online the datafile.

	SYS@orcl11g> recover datafile 6;
	ORA-00283: recovery session canceled due to errors
	ORA-00264: no recovery required
	SYS@orcl11g> alter database datafile 9 online;
	Database altered.
	SYS@orcl11g> 

The recovery will skip the No.27/No.28 archivelog file!

### The datafile's status

The status list of datafile is the following.

	KCCFEFDB 0x0001 /* file read-only, plugged from foreign DB */
	KCCFEONL 0x0002 /* file is ONLine */
	KCCFERDE 0x0004 /* ReaDing is Enabled */
	KCCFECGE 0x0008 /* ChanGing is Enabled */
	KCCFEMRR 0x0010 /* Media Recovery Required */
	KCCFEGEM 0x0020 /* Generate End hot backup Marker at next open */
	KCCFECKD 0x0040 /* File record generated by check dictionary */
	KCCFESOR 0x0080 /* Save Offline scn Range at next checkpoint */
	KCCFERMF 0x0100 /* Renamed Missing File */
	KCCFEGOI 0x0200 /* Generate Off-line Immediate marker */
	KCCFECUV 0x0400 /* Checkpoint by instance where UnVerified */
	KCCFEDRP 0x0800 /* offline to be DRoPped */
	KCCFEODC 0x2000 /* Online at Dictionary Check if read/only tblspc */
	KCCFEDBR 0x4000 /* entry created by DBMS_BACKUP_RESTORE */
	KCCFETRO 0x8000 /* Transition Read Only */define KCCFEWCC 0x1000 /*

Dump the datafile header.


	SYS@orcl11g> alter session set events 'immediate trace name file_hdrs level 10';

	-####level <n>
	level 1: control file's data file entry
	level 2 & 4 : level 1 + generic file header
	level 3 or higher: level 2 + data file header
	level 10: Most commonly used, It provides the same output as level 3.

	SYS@orcl11g> select * from v$diag_info where NAME='Default Trace File'; 

	File Type:
	KCCTYPCF 1 /* control file */
	KCCTYPRL 2 /* redo log file */
	KCCTYPDF 3 /* vanilla db file */
	KCCTYPBC 4 /* backup control file */
	KCCTYPBP 5 /* backup piece */
	KCCTYPTF 6 /* temporary db file */
	KCCTYPCT 7 /* change tracking file */
	KCCTYPFL 8 /* flashback database log file */
	KCCTYPAL 9 /* archivelog file */
	KCCTYPDC 10 /* datafile copy file */
	KCCTYPIR 11 /* incompletely restored db file */
	KCCTYPEL 12 /* foreign archivelog file */
	KCCTYPLB 13 /* LOB */

To be continue....

Have a good life! 2018/06 via LinHong
	






