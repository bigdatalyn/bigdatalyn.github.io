Oracle 一次ORA-00600[kdsgrp1]

报错语句:

select * from zx_wonder.TB_LIS_REPORT t where bgrq>'20210101'
出现:
ORA-00600: 内部错误代码, 参数: [kdsgrp1], [], [], [], [], [], [], [], [], [], [], []

观察trace:
[oracle@ETL trace]$ more /oracle/diag/rdbms/etl/ETL/trace/ETL_ora_25565.trc

出现:
* kdsgrp1-1: *************************************************
            row 0x21469b10.ce continuation at
            0x21469b10.ce file# 133 block# 432912 slot 206 not found

select file_name from dba_data_files where file_id=133;
FILE_NAME
--------------------------------------------------------------------------------
/oradata/ETL/users05.dbf

第一次DBV校验:

[oracle@ETL trace]$ dbv userid=system/oracle file=/oradata/ETL/users05.dbf blocksize=8192
DBVERIFY: Release 11.2.0.4.0 - Production on Tue Feb 23 15:47:43 2021
Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.
DBVERIFY - Verification starting : FILE = /oradata/ETL/users05.dbf
DBVERIFY - Verification complete
Total Pages Examined         : 4063232
Total Pages Processed (Data) : 1598860
Total Pages Failing   (Data) : 0
Total Pages Processed (Index): 2357442
Total Pages Failing   (Index): 0
Total Pages Processed (Other): 84730
Total Pages Processed (Seg)  : 2
Total Pages Failing   (Seg)  : 0
Total Pages Empty            : 22198
Total Pages Marked Corrupt   : 0
Total Pages Influx           : 0
Total Pages Encrypted        : 0
Highest block SCN            : 1673673828 (3983.1673673828)

查询该视图状态:
select object_name,status from dba_objects where object_name='TB_LIS_REPORT' and owner='ZX_WONDER';
正常且重新编译有效.


获取该视图创建语句:
create or replace view tb_ris_report as
select "ODS_INSERT_TIME","ODS_UPDATE_TIME","MCHZSTATUS","STUDYUID","YLJGDM","JZLSH","MZZYBZ","KH","KLX","BRXM","BRXB","PATIENTID","JCXMDM","SQDH","KDSJ","JYSJ","EXAMTYPE","SBBM","YGBM","SQKS","SQRGH","SQRXM","JCKS","JCYS","JCYSGH","BGRQ","BGSJ","BGRGH","BGRXM","SHRGH","SHRXM","JCBW","BWACR","JCMC","YYS","BGLCZD","YXBX","YXZD","BZHJY","SFYYY","XGBZ","MJ","YQBM","YLYL1","YLYL2" 
from ZX_VJK.TB_RIS_REPORT;


视图引用的其他视图:
ZX_VJK.TB_RIS_REPORT


select object_name,object_type,owner,status from dba_objects where  object_name='TB_RIS_REPORT' and owner='ZX_VJK';
OBJECT_NAME   OBJECT_TYPE	    OWNER			   STATUS
------------- ----------------- ------------------------------ -------
TB_RIS_REPORT VIEW		        ZX_VJK			   VALID

该视图创建语句过长.

尝试10046跟踪:
跟踪:
SQL> select userenv('sid') from dual;
USERENV('SID')
--------------------
4242

查询出OS进程ID:
select spid  from v$process where addr in (select paddr from v$session where sid=4242);
SPID
------------------------
15069

SQL> oradebug setospid 15069;
Oracle pid: 585, Unix process pid: 15069, image: oracle@ETL (TNS V1-V3)

SQL> oradebug unlimit;
Statement processed.
SQL> oradebug tracefile_name
/oracle/diag/rdbms/etl/ETL/trace/ETL_ora_15069.trc

SQL> select * from ZX_VJK.TB_RIS_REPORT where bgrq>'20210101';
select * from ZX_VJK.TB_RIS_REPORT where bgrq>'20210101'
                     *
ERROR at line 1:
ORA-00600: internal error code, arguments: [kdsgrp1], [], [], [], [], [], [],
[], [], [], [], []

SQL> oradebug event 10046 trace name context off;
Statement processed.

从中看出:(不同的文件,不同的块)
file# 125 block# 3255575 slot 92 not found

确认文件进行检验:
select file_name from dba_data_Files where file_id=125;
FILE_NAME
--------------------------------------------------------------------------------
/oradata/ETL/users03.dbf

dbv userid=system/oracle file=/oradata/ETL/users03.dbf blocksize=8192
DBVERIFY: Release 11.2.0.4.0 - Production on Tue Feb 23 20:48:02 2021
Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.
DBVERIFY - Verification starting : FILE = /oradata/ETL/users03.dbf
DBVERIFY - Verification complete
Total Pages Examined         : 3932160
Total Pages Processed (Data) : 1912608
Total Pages Failing   (Data) : 0
Total Pages Processed (Index): 1993096
Total Pages Failing   (Index): 0
Total Pages Processed (Other): 17034
Total Pages Processed (Seg)  : 210
Total Pages Failing   (Seg)  : 0
Total Pages Empty            : 9212
Total Pages Marked Corrupt   : 0
Total Pages Influx           : 0
Total Pages Encrypted        : 0
Highest block SCN            : 1682948021 (3983.1682948021)

定位对象:
SQL> select tablespace_name,segment_type,owner,segment_name from dba_extents where file_id=125 and 3255575 between block_id AND block_id + blocks - 1;

TABLESPACE_NAME  SEGMENT_TYPE	      OWNER     SEGMENT_NAME
----------- ------------------ ------------------------------
USERS			       TABLE		  ZX_VJK    MV_ZXLIS_KH


根据Mos解决办法进行分析:
Causes and Solutions for ora-600 [kdsgrp1] (Doc ID 1332252.1)

仅单独Analyze表没问题:
Analyze table ZX_VJK.MV_ZXLIS_KH validate structure

级联分析该表:
SQL> Analyze table ZX_VJK.MV_ZXLIS_KH validate structure cascade online;
Analyze table ZX_VJK.MV_ZXLIS_KH validate structure cascade online
*
ERROR at line 1:
ORA-01499: table/index cross reference failure - see trace file

看来索引果然有问题.


考虑会不会是执行计划走索引的问题:
尝试其他方式查询也都可以 :
SQL>select count(*) from ZX_VJK.MV_ZXLIS_KH;
  COUNT(*)
----------
   3659140

SQL>select * from ZX_VJK.MV_ZXLIS_KH;
...
...

SQL>select count(*) from ZX_VJK.TB_RIS_REPORT where bgrq>'20210101';
  COUNT(*)
----------
     52554


分析该用户下所有索引:
SET PAGESIZE 50000 ;
SELECT 'ANALYZE INDEX  ' || OWNER || '.' || INDEX_NAME|| ' VALIDATE STRUCTURE;' FROM DBA_INDEXES  where  owner='ZX_VJK';

ANALYZE INDEX  ZX_VJK.I_SNAP$_MV_ZX_ZGXX VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.ZXVJKYGDM VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.ZXVJKYGYGXM VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.ZX_VJK_KH VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.ZX_VJK_RIS_GLH VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.ZX_VJK_MZZYBZ VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.SYS_IL0001302589C00013$$ VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.ZX_VJK1PATIENTID VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.ZX_VJK2BRID VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.ZX_VJK2KH VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.SYS_IL0001507698C00004$$ VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.JZXH4332 VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.KSSJDF VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.MZHMEWFRQ VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.IDX_EDMZZB VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.IDX_EDMIENTID VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.IDX_EDMZZBRID VALIDATE STRUCTURE;
ANALYZE INDEX  ZX_VJK.IDX_EDMZZYB VALIDATE STRUCTURE;    

...
...
SQL> ANALYZE INDEX  ZX_VJK.ZX_VJK_MZZYBZ VALIDATE STRUCTURE
*
ERROR at line 1:
ORA-01578: ORACLE data block corrupted (file # 24, block # 3219345)
ORA-01110: data file 24: '/oradata/ETL/users02.dbf'
...
...
果不其然有坏块出现.


dbv检验该文件:
[oracle@ETL ~]$ dbv userid=system/oracle file=/oradata/ETL/users02.dbf blocksize=8192
DBVERIFY: Release 11.2.0.4.0 - Production on Tue Feb 23 20:34:43 2021
Copyright (c) 1982, 2011, Oracle and/or its affiliates.  All rights reserved.
DBVERIFY - Verification starting : FILE = /oradata/ETL/users02.dbf
DBV-00200: Block, DBA 103882641, already marked corrupt
csc(0x0f8f.59ae1b77) higher than block scn(0x0000.00000000)
Page 3219345 failed with check code 6054
DBVERIFY - Verification complete
Total Pages Examined         : 3545024
Total Pages Processed (Data) : 1486661
Total Pages Failing   (Data) : 0
Total Pages Processed (Index): 2039651
Total Pages Failing   (Index): 1
Total Pages Processed (Other): 17642
Total Pages Processed (Seg)  : 327
Total Pages Failing   (Seg)  : 0
Total Pages Empty            : 743
Total Pages Marked Corrupt   : 1
Total Pages Influx           : 0
Total Pages Encrypted        : 0
Highest block SCN            : 1682863694 (3983.1682863694)

select tablespace_name,segment_type,owner,segment_name from dba_extents where file_id=24 and 3219345 between block_id AND block_id + blocks - 1;
TABLESPACE_NAME  SEGMENT_TYPE	  OWNER    SEGMENT_NAME
--------------- ------------------ ------------------------------
USERS			       INDEX	  ZX_VJK   ZX_VJK_MZZYBZ

尝试重建:
alter index ZX_VJK.ZX_VJK_MZZYBZ rebuild

再次校验:
SQL> ANALYZE INDEX  ZX_VJK.ZX_VJK_MZZYBZ VALIDATE STRUCTURE
Index analyzed.

再次尝试校验这个:
SQL> Analyze table ZX_VJK.MV_ZXLIS_KH validate structure cascade online;
Analyze table ZX_VJK.MV_ZXLIS_KH validate structure cascade online
*
ERROR at line 1:
ORA-01499: table/index cross reference failure - see trace file


尝试跟踪Analyze table语句:
第一次跟踪:
trace内容如下:
*** 2021-02-23 22:06:00.851
row not found in index tsn: 4 rdba: 0x013a5a72
env [0x7fffb14a9360]: (scn: 0x0f8f.647066be  xid: 0x008d.00e.00009bf9  uba: 0x00000000.0000.00  statement num=0  parent xid: 0x0000.000.00000000  st-scn: 0x0000.00000000  hi-scn: 0x0000.00000000  ma-scn: 0x0f8f.63be8489  flg: 0x00000060)
col 0; len 18; (18):  33 33 30 35 32 33 31 39 38 37 30 38 30 39 32 38 32 33
col 1; len 6; (6):  01 37 ce f3 00 db
Block header dump:  0x0137cef3
 Object id on Block? Y
 seg/obj: 0x16a328  csc: 0xf8f.59ba6438  itc: 3  flg: E  typ: 1 - DATA
     brn: 0  bdba: 0x137cef0 ver: 0x01 opc: 0
     inc: 0  exflg: 0

看问题是索引与表中行不匹配.

根据rdba确认索引:
SELECT owner, segment_name, segment_type, partition_name
FROM   DBA_SEGMENTS
WHERE  header_file = (SELECT file# FROM   v$datafile WHERE  rfile# = dbms_utility.data_block_address_file(to_number('013a5a72','XXXXXXXX')) 
 AND  ts#= 4)
 AND header_block = dbms_utility.data_block_address_block(to_number('013a5a72','XXXXXXXX'));

 OWNER  SEGMENT_NAME  SEGMENT_TYPE
------------------------------
ZX_VJK   ZX_VJK2KH    INDEX

进行重建:
alter index ZX_VJK.ZX_VJK2KH rebuild

再次尝试校验:
SQL> Analyze table ZX_VJK.MV_ZXLIS_KH validate structure cascade;
Analyze table ZX_VJK.MV_ZXLIS_KH validate structure cascade
*
ERROR at line 1:
ORA-01499: table/index cross reference failure - see trace file


二次跟踪Analyze table:
trace内容如下:(rdba发生变化)
row not found in index tsn: 4 rdba: 0x0638acf2
env [0x7fffbe600aa0]: (scn: 0x0f8f.6586e402  xid: 0x00be.00a.0000abfd  uba: 0x00000000.0000.00  statement num=0  parent xid: 0x0000.000.00000000  st-scn: 0x0000.00000000  hi-scn: 0x0000.00000000  ma-scn: 0x0f8f.63be8489  flg: 0x00000060)


根据rdba确认索引:
SELECT owner, segment_name, segment_type, partition_name
FROM   DBA_SEGMENTS
WHERE  header_file = (SELECT file# FROM   v$datafile WHERE  rfile# = dbms_utility.data_block_address_file(to_number('0638acf2','XXXXXXXX')) 
 AND  ts#= 4)
 AND header_block = dbms_utility.data_block_address_block(to_number('0638acf2','XXXXXXXX'));

OWNER     SEGMENT_NAME     SEGMENT_TYPE
------------------------------
ZX_VJK    ZX_VJK2BRID      INDEX

最后也对该索引进行重建.
alter index ZX_VJK.ZX_VJK2BRID rebuild

再次分析无异常:
Analyze table ZX_VJK.MV_ZXLIS_KH validate structure cascade;


再次执行该SQL也已无600错误:
select * from zx_wonder.TB_LIS_REPORT t where bgrq>'20210101';

相关文档:
Causes and Solutions for ora-600 [kdsgrp1] (Doc ID 1332252.1)
ORA-01499: Table/index Cross Reference Failure - See Trace File (Doc ID 1952256.1)
1952256.1说明:
The ORA-00600 [kdsgrp1] and the ORA-1499 indicate are usually raised when an inconsistency in an index is detected. This is most likely due a lost write ( hardware/OS) condition.
得知ORA-00600 [kdsgrp1]与ORA-1499错误存在关联.
