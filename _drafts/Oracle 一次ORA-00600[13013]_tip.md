
Oracle 一次ORA-00600[13013]

ORA-00600: , : [13013], [5001], [126801], [109382409], [101], [109382437], [17], [], [], [], [], []
Incident details in: /opt/app/oracle/diag/rdbms/jcd/jcd/incident/incdir_99948/jcd_ora_23550_i99948.trc
Non critical error ORA-48113 caught while writing to trace file "/opt/app/oracle/diag/rdbms/jcd/jcd/incident/incdir_99948/jcd_ora_23550_i99948.trc"
ORA-00600: , : [13013], [5001], [126801], [109382408], [102], [109382433], [17], [], [], [], [], []
Incident details in: /opt/app/oracle/diag/rdbms/jcd/jcd/incident/incdir_99980/jcd_ora_445_i99980.trc
ORA-00600: , : [13013], [5001], [126801], [109382409], [123], [109382437], [17], [], [], [], [], []
Incident details in: /opt/app/oracle/diag/rdbms/jcd/jcd/incident/incdir_101652/jcd_ora_8586_i101652.trc
ORA-00600: , : [13013], [5001], [126801], [109382409], [168], [109382437], [17], [], [], [], [], []
ORA-00600: , : [13013], [5001], [126801], [109382406], [99], [109382433], [17], [], [], [], [], []
ORA-00600: , : [13013], [5001], [126801], [109382405], [152], [109382433], [17], [], [], [], [], []

该600错误号可以拆分:
ORA-600 [13013]
Format: ORA-600 [13013] [a] [b] [c] [d] [e] [f]
This format relates to Oracle Server 8.0.3 and above
    Arg [a] Passcount
    Arg [b] Data Object number
    Arg [c] Tablespace Decimal Relative DBA (RDBA) of block containing the row to be updated
    Arg [d] Row Slot number
    Arg [e] Decimal RDBA of block being updated (Typically same as [c])
    Arg [f] Code

ORA-00600: internal error code, arguments: [13013], [5001], [268], [8457615], [5], [8457615], [17], [], [], [], [], []


根据报错信息确定相对文件号与相对块号:

select dbms_utility.data_block_address_file(109382409) rfile,
    dbms_utility.data_block_address_block(109382409) rblocks
     from dual;
     RFILE    RBLOCKS
---------- ----------
        26     330505

select dbms_utility.data_block_address_file(109382408) rfile,
    dbms_utility.data_block_address_block(109382408) rblocks
     from dual;       

     RFILE    RBLOCKS
---------- ----------
        26     330504

select dbms_utility.data_block_address_file(109382406) rfile,
    dbms_utility.data_block_address_block(109382406) rblocks
     from dual;      
     RFILE    RBLOCKS
---------- ----------
        26     330502

select dbms_utility.data_block_address_file(109382405) rfile,
    dbms_utility.data_block_address_block(109382405) rblocks
     from dual;          

   RFILE    RBLOCKS
---------- ----------
        26     330501

确认对象:

SQL> set linesize 999 pagesize 9999
SQL> select owner,segment_name,segment_type,tablespace_name from dba_extents 
    where file_id =26
    and 330505 between block_id and block_id + blocks -1;        

OWNER      SEGMENT_NAME    SEGMENT_TYPE TABLESPACE_NAME
---------- ----------    ----------   --------------------
XHSD_JCD   JCD_PUB_YHBMB    TABLE      TS_PUB_DATA

同时dbv校验26号文件:
无物理坏块!

尝试执行分析:
analyze table XHSD_JCD.JCD_PUB_YHBMB validate structure cascade online;
ERROR at line 1:
ORA-08104: this index object 130036 is being online built or rebuilt

确认130036索引:
OBJECT_NAME   OBJECT_TYPE
---------------------------------------------------------
PK_JCD_PUB_YHBMB   INDEX

//与客户沟通,此时正在重建索引.无法进行分析.
客户重建索引后仍无法继续分析:（经反馈其创建索引会话被杀掉.）

analyze table XHSD_JCD.JCD_PUB_YHBMB validate structure cascade online;
ERROR at line 1:
ORA-08104: this index object 130036 is being online built or rebuilt

执行清理索引创建操作:
SQL> DECLARE
    isClean BOOLEAN;
    BEGIN
    isClean := DBMS_REPAIR.ONLINE_INDEX_CLEAN(130036);
    END;
    /

再次手动进行rebulid:
alter index XHSD_JCD.PK_JCD_PUB_YHBMB rebuild

再次进行分析资源被占用,对象被hang住sql占用:
analyze table XHSD_JCD.JCD_PUB_YHBMB validate structure cascade online;
analyze table XHSD_JCD.JCD_PUB_YHBMB validate structure
ANALYZE INDEX  XHSD_JCD.PK_JCD_PUB_YHBMB VALIDATE STRUCTURE;


确定锁定对象会话:
 select l.session_id,o.owner,o.object_name 
 from v$locked_object l,dba_objects o where l.object_id=o.object_id;   
SESSION_ID OWNER      OBJECT_NAME
---------- ---------- --------------------
       780 XHSD_JCD   JCD_PUB_YHBMB
       627 XHSD_JCD   JCD_PUB_YHBMB
      1152 XHSD_JCD   JCDMS_DZTSYCCL


操作系统层面杀锁:
select a.spid,b.sid,b.serial#,b.username from v$process a,v$session b where a.addr=b.paddr and b.sid=780;
select a.spid,b.sid,b.serial#,b.username from v$process a,v$session b where a.addr=b.paddr and b.sid=627;
select a.spid,b.sid,b.serial#,b.username from v$process a,v$session b where a.addr=b.paddr and b.sid=1152;

kill -9进行操作系统层面杀锁

再次执行分析成功:
analyze table XHSD_JCD.JCD_PUB_YHBMB validate structure cascade online;
analyze table XHSD_JCD.JCD_PUB_YHBMB validate structure
ANALYZE INDEX  XHSD_JCD.PK_JCD_PUB_YHBMB VALIDATE STRUCTURE;

此时客户给出问题SQL,执行SQL 会话hang住

UPDATE XHSD_JCD.PUB_YHBMB SET DLBZ = '1' WHERE DLH='00560';

后台出现:
ORA-07445: exception encountered: core dump [kduudm()+1798] [SIGSEGV] [ADDR:0x1E1000000] [PC:0x4BCB2A2] [Address not mapped to object] []
//对于该错误代码,Mos并无相关记录.
--------------
Wed Mar 03 11:49:46 2021
Exception [type: SIGSEGV, Address not mapped to object] [ADDR:0x1E1000000] [PC:0x4BCB2A2, kduudm()+1798] [flags: 0x0, count: 1]
Errors in file /opt/app/oracle/diag/rdbms/jcd/jcd/trace/jcd_ora_9960.trc  (incident=100772):
ORA-07445: exception encountered: core dump [kduudm()+1798] [SIGSEGV] [ADDR:0x1E1000000] [PC:0x4BCB2A2] [Address not mapped to object] []
Incident details in: /opt/app/oracle/diag/rdbms/jcd/jcd/incident/incdir_100772/jcd_ora_9960_i100772.trc
Use ADRCI or Support Workbench to package the incident.
See Note 411.1 at My Oracle Support for error and packaging details.
Wed Mar 03 11:49:48 2021
Dumping diagnostic data in directory=[cdmp_20210303114948], requested by (instance=1, osid=9960), summary=[incident=100772].
Wed Mar 03 11:49:49 2021
Sweep [inc][100772]: completed
Sweep [inc2][100772]: completed
--------------

询问客户视图创建SQL:

create or replace view pub_yhbmb as
select DLH,BM,YHM,KL,SYBZ,QYRQ,ZZRQ,DLBZ,SM
    from jcd_PUB_YHBMB;

对原表执行delete也hang住: 
delete from  jcd_pub_yhbmb  WHERE DLH='00560';

select语句数据获取正常:
select * from XHSD_JCD.jcd_pub_yhbmb

尝试跟踪delete以及update语句,但sql_trace以及10046无输出.

最终尝试手动通过CTS创建一张测试表进行DML测试可以执行:
create table XHSD_JCD.test as select * from XHSD_JCD.jcd_PUB_YHBMB;
delete from  XHSD_JCD.test  WHERE DLH='00560';

最终使用CTS重建业务表业务正常.


记录排查过程.
相关Mos:
How to Use DBMS_REPAIR.ONLINE_INDEX_CLEAN For The Cleanup Of Online Index Failing With ORA-08104?(文档 ID 1378173.1)
How to Cleanup and Rebuild an Interrupted Online Index Rebuild - ORA-8104 , ORA-8106 (文档 ID 272735.1)
Session Was Killed During The Rebuild Of Index ORA-08104 (文档 ID 375856.1)
————————————————
版权声明：本文为CSDN博主「DBhanG」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/baoyuhang0/article/details/114951685
















