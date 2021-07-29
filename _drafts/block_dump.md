Oracle数据块深入分析总结
http://czmmiao.iteye.com/blog/1495332
最近在研究块的内部结构，把文档简单整理了一下，和大家分享一下。该篇文章借助dump和BBED对数据
库内部结构进行了分析，最后附加了一个用BBED解决ORA-1200错误的小例子。在总结的过程中参考了
《Disassembling the Oracle Data Block》以及网上的翻译版本。 
dump说明 
创建表空间和测试表： 
create tablespace testblock datafile '/opt/oracle/oradata/oradb/testblock01.dbf' size 100M; 
create table testblock( 
id number, 
name varchar(4) 
) tablespace testblock; 
插入3条数据然后提交： 
SQL> insert into testblock values(1,'a'); 
SQL> insert into testblock values(2,'b'); 
SQL> insert into testblock values(3,'c'); 
SQL> commit; 
SQL> select * from testblock; 
        ID NAME 
---------- -------- 
         1 a 
         2 b 
         3 c 
SQL> select rowid,dbms_rowid.rowid_relative_fno(rowid) rel_fno,dbms_rowid.rowid_block_number(rowid) 
blockno from testblock; 
ROWID                 REL_FNO    BLOCKNO 
------------------         ----------        ---------- 
AAANK4AAFAAAAAQAAA          5         16 
AAANK4AAFAAAAAQAAB          5         16 
AAANK4AAFAAAAAQAAC          5         16 
我们看到这3行数据都在5号数据文件的第16个块 
执行数据块dump: 
SQL> alter system dump datafile 5 block 16; 
以下是该数据块的完整dump结果： 
Start dump data blocks tsn: 7 file#: 5 minblk 16 maxblk 16 
buffer tsn: 7 rdba: 0x01400010 (5/16) 
scn: 0x0000.001732d3 seq: 0x01 flg: 0x04 tail: 0x32d30601 
frmt: 0x02 chkval: 0x84cb type: 0x06=trans data 
Hex dump of block: st=0, typ_found=1 
Dump of memory from 0x0CEB6400 to 0x0CEB8400 
CEB6400 0000A206 01400010 001732D3 04010000  [......@..2......] 
CEB6410 000084CB 00000001 0000D2B8 001732D3  [.............2..] 
CEB6420 00000000 00320002 01400009 00200006  [......2...@... .] 
CEB6430 00000271 00800205 00130257 00008000  [q.......W.......] 
CEB6440 001732C4 00060008 00000279 00800351  [.2......y...Q...] 
CEB6450 00150278 00000001 00000000 00000000  [x...............] 
CEB6460 00000000 00030100 0018FFFF 1F651F5E  [............^.e.] 
CEB6470 00001F65 1F5E0003 1F801F66 00000000  [e.....^.f.......] 
CEB6480 00000000 00000000 00000000 00000000  [................] 
        Repeat 499 times 
CEB83C0 022C0000 02C10202 002C6101 03C10202  [..,......a,.....] 
CEB83D0 012C6201 03C10202 2C626202 C1020200  [.b,......bb,....] 
CEB83E0 61610202 0202002C 630104C1 0202002C  [..aa,......c,...] 
CEB83F0 620103C1 0202002C 610102C1 32D30601  [...b,......a...2] 
Block header dump:  0x01400010 
 Object id on Block? Y 
 seg/obj: 0xd2b8  csc: 0x00.1732d3  itc: 2  flg: E  typ: 1 - DATA 
     brn: 0  bdba: 0x1400009 ver: 0x01 opc: 0 
     inc: 0  exflg: 0 
  
 Itl           Xid                  Uba         Flag  Lck        Scn/Fsc 
0x01   0x0006.020.00000271  0x00800205.0257.13  C---    0  scn 0x0000.001732c4 
0x02   0x0008.006.00000279  0x00800351.0278.15  ----    1  fsc 0x0000.00000000 
  
data_block_dump,data header at 0xceb6464 
=============== 
tsiz: 0x1f98 
hsiz: 0x18 
pbl: 0x0ceb6464 
bdba: 0x01400010 
     76543210 
flag=-------- 
ntab=1 
nrow=3 
frre=-1 
fsbo=0x18 
fseo=0x1f5e 
avsp=0x1f65 
tosp=0x1f65 
0xe:pti[0]      nrow=3  offs=0 
0x12:pri[0]     offs=0x1f5e 
0x14:pri[1]     offs=0x1f66 
0x16:pri[2]     offs=0x1f80 
block_row_dump: 
tab 0, row 0, @0x1f5e 
tl: 8 fb: --H-FL-- lb: 0x2  cc: 2 
col  0: [ 2]  c1 02 
col  1: [ 1]  61 
tab 0, row 1, @0x1f66 
tl: 8 fb: --H-FL-- lb: 0x0  cc: 2 
col  0: [ 2]  c1 03 
col  1: [ 1]  62 
tab 0, row 2, @0x1f80 
tl: 8 fb: --H-FL-- lb: 0x0  cc: 2 
col  0: [ 2]  c1 04 
col  1: [ 1]  63 
end_of_block_dump 
End dump data blocks tsn: 7 file#: 5 minblk 16 maxblk 16 
头信息区 
这个区包括数据块的地址，数据块类型，检查点信息，scn信息等信息。 
--------- 
Start dump data blocks tsn: 7 file#: 5 minblk 16 maxblk 16 
buffer tsn: 7 rdba: 0x01400010 (5/16) 
scn: 0x0000.001732d3 seq: 0x01 flg: 0x04 tail: 0x32d30601 
frmt: 0x02 chkval: 0x84cb type: 0x06=trans data 
--------- 
buffer tsn:7  --该块对应的表空间号，这里是7号表空间。 
rdba: 0x01400010 (5/16)  --相对数据块地址，表示该块为5号数据文件第16个块，用4个字节32位来表示，前10位为相对数据文件号，后22位为块号。01400010=0000 0001 0100 0000 0000 0000 0001 0000（二进制）
我们看到前10位转换成十进制就是5，后22位转换成十进制就是16。rdba在数据块中的offset是4，即rdba存在于数据块中的第5-9字节中（offset从0开始算），数据块中的每个部分在数据块中的偏移量后边会通过BBED展
示，这里可以先不关心。 
scn: 0x0000.001732d3  --数据块头部SCN，总共占用6个字节，前2个字节表示SCN Wrap，后4个字节表示SCN 
Base。如果SCN Base达到了4个字节表示的最大值，SCN Wrap+1，SCN Base清0。在数据块中的offset是8 
seq: 0x01  --Sequence number, incremented for every change made to the block at the same SCN。这里可以理解为数据块的版本。在数据块中的offset是14. 
flg: 0x04  --Flag: 0x01 New block/0x02 Delayed Logging Change advanced SCN/seq 0x04 Check value/saved - block XOR‘s to zero/0x08 Temporary block 。在数据块中的offset是15 
tail: 0x32d30601  --即tail check，存放于数据块的最后4个字节，用于数据块一致性检查。tail check的组成：
SCN Base的低2个字节+type+seq。即tail: 0x32d30601=32d3+06+01 
frmt: 0x02  -- 块格式。01表示Oracle 7， 02表示Oracle 8+  
chkval: 0x84cb  --块检查值。我们知道如果参数DB_BLOCK_CHECKSUM=TRUE，那么数据块在读入buffer和写回数据文件之前都要做检查计算，如果计算值和数据块中记录的计算值不匹配就会标记该块是坏块。 
type: 0x06=trans data  --块类型，参考一下表格： 
Header Block Types  
ID  Type  
01  Undo segment header  
02  Undo data block  
03  Save undo header  
04  Save undo data block  
05  Data segment header (temp, index, data and so on)  
06  KTB managed data block (with ITL)  
07  Temp table data block (no ITL)  
08  Sort Key  
09  Sort Run  
10  Segment free list block  
11  Data file header  
数据区、空闲区 
数据区是真正存储数据的地方 ； 空闲区是目前块内部空闲空间
Dump of memory from 0x0CEB6400 to 0x0CEB8400 
CEB6400 0000A206 01400010 001732D3 04010000  [......@..2......] 
CEB6410 000084CB 00000001 0000D2B8 001732D3  [.............2..] 
CEB6420 00000000 00320002 01400009 00200006  [......2...@... .] 
CEB6430 00000271 00800205 00130257 00008000  [q.......W.......] 
CEB6440 001732C4 00060008 00000279 00800351  [.2......y...Q...] 
CEB6450 00150278 00000001 00000000 00000000  [x...............] 
CEB6460 00000000 00030100 0018FFFF 1F651F5E  [............^.e.] 
CEB6470 00001F65 1F5E0003 1F801F66 00000000  [e.....^.f.......] 
CEB6480 00000000 00000000 00000000 00000000  [................] 
        Repeat 499 times 
CEB83C0 022C0000 02C10202 002C6101 03C10202  [..,......a,.....] 
CEB83D0 012C6201 03C10202 2C626202 C1020200  [.b,......bb,....] 
CEB83E0 61610202 0202002C 630104C1 0202002C  [..aa,......c,...] 
CEB83F0 620103C1 0202002C 610102C1 32D30601  [...b,......a...2] 
事物列表区 
事务列表区包括了在这个数据块内的事务，也就是我们知道的ITL(interested transaction list),从中我们可以知道XID（transaction id）,UBA(undo block address)等信息。
事物列表区分析： 
-------------- 
Block header dump:  0x01400010  --rdba 
 Object id on Block? Y   --该块是否属于某个对象 
 seg/obj: 0xd2b8  csc: 0x00.1732d3  itc: 2  flg: E  typ: 1 - DATA 
     brn: 0  bdba: 0x1400009 ver: 0x01 opc: 0 
     inc: 0  exflg: 0 
  
 Itl           Xid                         Uba                          Flag   Lck        Scn/Fsc 
0x01   0x0006.020.00000271  0x00800205.0257.13  C---     0         scn 0x0000.001732c4 
0x02   0x0008.006.00000279  0x00800351.0278.15  ----      1         fsc 0x0000.00000000 
--------------- 
seg/obj: 0xd2b8  --该数据块中对象的object_id。前面我们dump的是表testblock,下边来验证一下： 
SQL> select to_number('d2b8','xxxxxx') from dual; 
TO_NUMBER('D2B8','XXXXXX') 
------------------------------ 
                     53944 
SQL> select object_name,object_type from dba_objects where object_id=53944; 
OBJECT_NAME                    OBJECT_TYPE 
------------------------------ -------------------- 
TESTBLOCK                      TABLE 
csc: 0x00.1732d3  --SCN at last Block CleanOut，表示最后一次块清除(Block CleanOut)时候的SCN。 
itc: 2  --块中ITL slot的数量，我们看下边的ITL，的确只有2个slot。 
flg: E  --flg: 0 表示此块被放置在自由列表（freelist）中。 
typ: 1 - DATA  --类型1表示数据，类型2表示索引 
bdba  --Block relative data block address(RDBA) 
下边我们重点看一下ITL事物槽。Oracle的每个数据块中都有一个或者多个事务槽，每一个对数据块的并发访问
事务都会占用一个事务槽。 
每个事物都会ITL事物槽由槽位号、XID、Uba、Flag、Lck、Scn/Fsc几部分组成。 
 Itl           Xid                         Uba                          Flag   Lck        Scn/Fsc 
0x01   0x0006.020.00000271  0x00800205.0257.13  C---     0         scn 0x0000.001732c4 
0x02   0x0008.006.00000279  0x00800351.0278.15  ----      1         fsc 0x0000.00000000 
Xid：事务id，在回滚段事务表中有一条记录和这个事务对应。Xid组成：Undo Segment Number +Transaction 
Table Slot Number+ Wrap 
Uba：回滚段地址，该事务对应的回滚段地址。Uba组成：回滚块地址(undo文件号和数据块号)+回滚序列号+
回滚记录号 
SQL> select xidusn,xidslot,xidsqn,ubafil,ubablk,ubasqn,ubarec from v$transaction; 
    XIDUSN    XIDSLOT     XIDSQN     UBAFIL     UBABLK     UBASQN     UBAREC 
    ---------- ---------- ---------- ---------- ---------- ---------- ---------- 
         8          6            633               2          849          632           21 
Flag：事务标志位。这个标志位就记录了这个事务的操作状态，各个标志的含义分别是： 
C = transaction has been committed and locks cleaned out   --事物已经提交，锁已经被清除 
B = this undo record contains the undo for this ITL entry 
U = transaction committed (maybe long ago); SCN is an upper bound  --事物已经提交，但是锁还没有清除 
 这个地方应该是错误的，U表示快速提交，本人在测试过程中没有提交的事务，对应的状态为U 。。。

T  = transaction was still active at block cleanout SCN   --块清除的SCN被记录时，该事务仍然是活动的，块
上如果有已经提交的事务，那么在clean ount的时候，块会被进行清除，但是这个块里面的事务不会被清除。
Lck：表示这个事务所影响的行数。我们看到01号事物槽Lck为0，因为该事物槽中的事物Flag为C，证明该事物
已经提交，锁也被清楚掉了，该事物槽可以被重用了。02号事物槽Lck为1，是因为我对第一行做了一个更新，
并且没有提交，Flag为----说明该事物是活动的。 
Scn/Fsc：Commit SCN或者快速提交（Fast Commit Fsc）的SCN。 
每条记录中的行级锁对应Itl条目lb，对应于Itl列表中的序号，即那个事务在该记录上产生的锁。
对于Oracle来说，对于一个事务，可以是快速提交、也可以是延迟提交，目的都是为了提高提交的速度。提交以后，oracle需要对ITL事务槽、每一行的锁定标记进行清除。如果是快速提交，那么在提交的时候，会将事务表和每一个数据块的ITL槽进行清除。但是锁定标记可能没有清除，等下次用到的时候再进行清除。如果是延迟提交，那么在提交的时候，只是将事务表进行清除，并没有对ITL事务槽进行清除，每一行的锁定标记也没有清除。因此C和U的情况特别多。块清除的过程并不包括每个行的锁定标记的清除，主要指的是ITL的清除。 
注意： 
1、事务槽中首先记录的是Xid和Uba，只有在提交以后，当对这个数据块进行cleanout的时候，才会更新Flag和Scn。因此Oracle总是以事务表中对这个数据块的Scn以及Flag为准。 
2、一个事务开始以后，在一个数据块上得到一个事务槽，那么在这个事务提交以前，这个事务槽会一直占用，直到这个事务提交释放这个事务槽。 
3、只有在已经提交以后，这个itl事务槽中的scn才会有数值。 
4、事务是否已经提交、事务对应的SCN，这些信息都是以回滚段事务表中的为主，事务槽中的不准确 
5、事务槽中的事务id和uba地址是准确的 
6、事务槽1中的事务id和回滚段中的事务id肯定不是一样的，不同回滚段中的事务id也一定不一样。 
尾区 
尾区储存着数据块的描述信息 
data_block_dump,data header at 0xceb6464 
=============== 
tsiz: 0x1f98    --Total Data Area Size（数据区的大小 ） 
hsiz: 0x18      --Data Header Size(数据块头大小) 
pbl: 0x0ceb6464   --ptr to buffer holding the block（指向这个数据块在内存中映象的指针） 
bdba: 0x01400010   --block dba / rdba（数据块地址） 
     76543210 
flag=-------- 
ntab=1   --number of tables (>1 is a cluster) 
nrow=3   --number of rows 
frre=-1   --first free row index entry, -1=you have to add one(没有创建索引) 
fsbo=0x18   --free space begin offset(空闲空间起始位置) 
fseo=0x1f5e   --free space end offset（空闲空间结束位置） 
avsp=0x1f65   --available space in the block（可用空间） 
tosp=0x1f65   --total available space when all txs commit 
0xe:pti[0]      nrow=3  offs=0  --该块有3条记录 
0x12:pri[0]     offs=0x1f5e     --第1条记录在偏移量为0x1f5e的地方，下边两行以此类推。 
0x14:pri[1]     offs=0x1f66 
0x16:pri[2]     offs=0x1f80 
tab 0, row 0, @0x1f5e 
tl: 8 fb: --H-FL-- lb: 0x2  cc: 2   --lb: 0x2说明事物在该数据行上的锁还没清除，并且该锁指向02号事物槽。（此前对改行进行了更新，并且未提交） 
col  0: [ 2]  c1 02 
col  1: [ 1]  61 
tab 0, row 1, @0x1f66 
tl: 8 fb: --H-FL-- lb: 0x0  cc: 2  --lb: 0x0说明事物在该数据行上的锁已经被清除。（此前对该行进行了更新，并且已经提交）       
col  1: [ 1]  62 
tab 0, row 2, @0x1f80 
tl: 8 fb: --H-FL-- lb: 0x0  cc: 2 
col  0: [ 2]  c1 04 
col  1: [ 1]  63  
――――――――――――― 
tl   --表示Row Size(number of bytes plus data) 
fb  --Flag Byte 
    K- Cluster key 
    H- head of row piece 
    D- Deleted row 
    F- first data piece   
    L- last data piece   
    P- First column cintinues from previous row 
N- Last column cintinues in next piece    
当我们delete一行数据的时候，数据并不是物理的被删除，而是把该行标记为删除，这个时候fb应该是--HDFL-- 而不是原来的--H-FL-- 。把第3行数据删除后提交，重新dump一下： 
tab 0, row 2, @0x1f80 
tl: 8 fb: --HDFL-- lb: 0x0  cc: 2 
col  0: [ 2]  c1 04 
col  1: [ 1]  63 
Lb  --表示lock byte,表示锁定该行的这个事务在itl的入口 
Cc  --表示number of columns in this Row piece。 关于行中的数据，我们以第一行来说明一下 ，我们知道表的第一行为(1,'a')，我们验证一下： 
col  0: [ 2]  c1 02 
col  1: [ 1]  61 
SQL> select dump(1,16) from dual; 
DUMP(1,16) 
----------------- 
Typ=2 Len=2: c1,2 
SQL> select dump('a',16) from dual; 
DUMP('A',16) 
---------------- 
Typ=96 Len=1: 61 
--------------------- 

