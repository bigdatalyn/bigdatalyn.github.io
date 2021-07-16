///////////////////////////////////////////////////////

位图索引

物理存储结构跟B树物理存储结构类似，按照索引键值有序存储

不是： 索引键 + rowid
rowid分了三部分： 索引键 + rowid 下限 + rowid下限 + 位图段（被压缩存储的，变成0/1二进制）

没有行锁概念，要锁就锁整个位图段（多个数据行对于1个位图段）
锁的颗粒度比较粗，不适合高并发的OLTP（影响并发，可能产生死锁）

即使是单键位图索引可以存NULL

优点：
1.压缩-》节省空间（distinct 值少，对比B树索引，会显著节省存储空间）如：sex性别列 bitmap索引只有两个索引行而B树索引跟表行数相关rowid对应
BTree index LEAF_BLOCKS: 183 blocks   
Bitmap index LEAF_BLOCKS: 3 blocks    

2.联合索引的情况更节省空间

3.快速处理 AND/OR 查询条件的sql（按位运算的原因）

///////////////////////////////////////////////////////



ONG@pdb1> truncate table employee;

Table truncated.

begin
  2  for i in 1..50000 loop
insert into employee values ('F',i);
  4  end loop;
  5  commit;
  6  end;
  7  /

PL/SQL procedure successfully completed.

begin
  2  for i in 1..50000 loop
insert into employee values ('M',i);
  4  end loop;
  5  commit;
  6  end;
  7  /

PL/SQL procedure successfully completed.

HONG@pdb1> drop index idx_employee_gender;

Index dropped.

HONG@pdb1> create index idx_employee_gender on employee(gender);

Index created.

HONG@pdb1>

INDEX_NAME		       UNI VI	  T_ROWS     I_ROWS DISTINCT_KEYS  BLV LEAF_BLOCKS COLUMN_NAME		POS D N NUM_DISTINCT  NUM_NULLS
------------------------------ --- -- ---------- ---------- ------------- ---- ----------- -------------------- --- - - ------------ ----------
IDX_EMPLOYEE_GENDER	       N   Y	    1000     100000		2    1	       182 GENDER		  1   Y 	   2	      0

OWNER		SEGMENT_NAME		       PARTITION_NAME	    SEGMENT_TYPE       TABLESPACE_NAME	       SIZE_MB
--------------- ------------------------------ -------------------- ------------------ -------------------- ----------
HONG		IDX_EMPLOYEE_GENDER				    INDEX	       USERS			     2


HONG@pdb1> drop index idx_employee_gender;

Index dropped.

HONG@pdb1> create bitmap index idx_bitmap_employee_gender on employee(gender);

Index created.

HONG@pdb1>

INDEX_NAME		       UNI VI	  T_ROWS     I_ROWS DISTINCT_KEYS  BLV LEAF_BLOCKS COLUMN_NAME		POS D N NUM_DISTINCT  NUM_NULLS
------------------------------ --- -- ---------- ---------- ------------- ---- ----------- -------------------- --- - - ------------ ----------
IDX_BITMAP_EMPLOYEE_GENDER     N   Y	    1000	  6		2    1		 3 GENDER		  1   Y 	   2	      0

OWNER		SEGMENT_NAME		       PARTITION_NAME	    SEGMENT_TYPE       TABLESPACE_NAME	       SIZE_MB
--------------- ------------------------------ -------------------- ------------------ -------------------- ----------
HONG		IDX_BITMAP_EMPLOYEE_GENDER			    INDEX	       USERS			     0

