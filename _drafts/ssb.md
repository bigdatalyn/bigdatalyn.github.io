


[Linux fdisk add disk](http://www.bigdatalyn.com/2022/10/28/Oracle_23c_beta_Install_Tips/#fdisk-new-disk)

[Setting up the Star Schema Benchmark (SSB) in Oracle](https://seanstuber.com/2017/06/14/setting-up-the-star-schema-benchmark-ssb-in-oracle/)

```
[oracle@ol8-23c ssb-dbgen-master]$ ls -l dbgen
-rwxr-xr-x. 1 oracle oinstall 71448 Dec 22 18:50 dbgen
[oracle@ol8-23c ssb-dbgen-master]$ ./dbgen -h
SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
Copyright Transaction Processing Performance Council 1994 - 2000
USAGE:
dbgen [-{vfFD}] [-O {fhmsv}][-T {pcsdla}]
	[-s <scale>][-C <procs>][-S <step>]
dbgen [-v] [-O {dfhmr}] [-s <scale>] [-U <updates>] [-r <percent>]

-b <s> -- load distributions for <s>
-C <n> -- use <n> processes to generate data
          [Under DOS, must be used with -S]
-D     -- do database load in line
-d <n> -- split deletes between <n> files
-f     -- force. Overwrite existing files
-F     -- generate flat files output
-h     -- display this message
-i <n> -- split inserts between <n> files
-n <s> -- inline load into database <s>
-O d   -- generate SQL syntax for deletes
-O f   -- over-ride default output file names
-O h   -- output files with headers
-O m   -- produce columnar output
-O r   -- generate key ranges for deletes.
-O v   -- Verify data set without generating it.
-q     -- enable QUIET mode
-r <n> -- updates refresh (n/100)% of the
          data set
-s <n> -- set Scale Factor (SF) to  <n> 
-S <n> -- build the <n>th step of the data/update set
-T c   -- generate cutomers dimension table ONLY
-T p   -- generate parts dimension table ONLY
-T s   -- generate suppliers dimension table ONLY
-T d   -- generate date dimension table ONLY
-T l   -- generate lineorder fact table ONLY
-U <s> -- generate <s> update sets
-v     -- enable VERBOSE mode

To generate the SF=1 (1GB), validation database population, use:
	dbgen -vfF -s 1

To generate updates for a SF=1 (1GB), use:
	dbgen -v -U 1 -s 1
[oracle@ol8-23c ssb-dbgen-master]$ cp makefile.suite makefile
[oracle@ol8-23c ssb-dbgen-master]$ vi makefile

CC = gcc
DATABASE = oracle
MACHINE = LINUX
WORKLOAD = SSBM

[oracle@ol8-23c ssb-dbgen-master]$ ./dbgen -s 4 -T p
SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
Copyright Transaction Processing Performance Council 1994 - 2000
[oracle@ol8-23c ssb-dbgen-master]$ ./dbgen -s 4 -T s
SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
Copyright Transaction Processing Performance Council 1994 - 2000
[oracle@ol8-23c ssb-dbgen-master]$ ./dbgen -s 4 -T d
SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
Copyright Transaction Processing Performance Council 1994 - 2000
[oracle@ol8-23c ssb-dbgen-master]$ ./dbgen -s 4 -T l
SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
Copyright Transaction Processing Performance Council 1994 - 2000
[oracle@ol8-23c ssb-dbgen-master]$ mv *.tbl /u02/oradata/ssb/
[oracle@ol8-23c ssb-dbgen-master]$ du -sm /u02/oradata/ssb/
2370	/u02/oradata/ssb/
[oracle@ol8-23c ssb-dbgen-master]$ ls -tlr /u02/oradata/ssb/
total 2426804
-rw-r--r--. 1 oracle oinstall   11399031 Dec 22 18:56 customer.tbl
-rw-r--r--. 1 oracle oinstall   51639483 Dec 22 18:56 part.tbl
-rw-r--r--. 1 oracle oinstall     669999 Dec 22 18:56 supplier.tbl
-rw-r--r--. 1 oracle oinstall     229965 Dec 22 18:56 date.tbl
-rw-r--r--. 1 oracle oinstall 2421099998 Dec 22 18:57 lineorder.tbl
[oracle@ol8-23c ssb-dbgen-master]$ 
```

create ssb pluggable database in /u02 path.
```
SYS@cdb1> create pluggable database ssb admin user pdbadmin identified by oracle roles=(DBA) file_name_convert=('/u01/oradata/CDB1/pdbseed','/u02/oradata/CDB1/ssb');

Pluggable database created.

SYS@cdb1> 
```

```
[oracle@ol8-23c ssb]$ pwd
/u02/oradata/ssb
[oracle@ol8-23c ssb]$ ls -tlr
total 2426804
-rwxr-xr-x. 1 oracle oinstall   11399031 Dec 22 18:56 customer.tbl
-rwxr-xr-x. 1 oracle oinstall   51639483 Dec 22 18:56 part.tbl
-rwxr-xr-x. 1 oracle oinstall     669999 Dec 22 18:56 supplier.tbl
-rwxr-xr-x. 1 oracle oinstall     229965 Dec 22 18:56 date.tbl
-rwxr-xr-x. 1 oracle oinstall 2421099998 Dec 22 18:57 lineorder.tbl
[oracle@ol8-23c ssb]$ 

all.sql

conn system/oracle@ssb

drop user ssb cascade;

drop table if exists ssb.ext_lineorder purge;
drop table if exists ssb.lineorder purge;
drop table if exists ssb.ext_part purge;
drop table if exists ssb.part purge;
drop table if exists ssb.ext_supplier purge;
drop table if exists ssb.supplier purge;
drop table if exists ssb.ext_customer purge;
drop table if exists ssb.customer purge;
drop table if exists ssb.ext_date_dim purge;
drop table if exists ssb.date_dim purge;

CREATE USER ssb IDENTIFIED BY ssb;

GRANT CREATE SESSION,
      CREATE TABLE,
      CREATE ANY DIRECTORY,
      UNLIMITED TABLESPACE
    TO ssb;

CREATE OR REPLACE DIRECTORY ssb_dir AS '/u02/oradata/ssb';

GRANT READ, WRITE ON DIRECTORY ssb_dir TO ssb;

CREATE TABLE ssb.ext_lineorder
(
    lo_orderkey        INTEGER,
    lo_linenumber      NUMBER(1, 0),
    lo_custkey         INTEGER,
    lo_partkey         INTEGER,
    lo_suppkey         INTEGER,
    lo_orderdate       INTEGER,
    lo_orderpriority   CHAR(15),
    lo_shippriority    CHAR(1),
    lo_quantity        NUMBER(2, 0),
    lo_extendedprice   NUMBER,
    lo_ordtotalprice   NUMBER,
    lo_discount        NUMBER(2, 0),
    lo_revenue         NUMBER,
    lo_supplycost      NUMBER,
    --lo_ordsupplycost   NUMBER, -- this is mentioned in 2.2 Notes(c) but isn't in the layout or sample queries, so not needed?
    lo_tax             NUMBER(1, 0),
    lo_commitdate      INTEGER,
    lo_shipmode        CHAR(10)
)
ORGANIZATION EXTERNAL
    (TYPE oracle_loader
          DEFAULT DIRECTORY ssb_dir
              ACCESS PARAMETERS (
                  FIELDS
                      TERMINATED BY '|'
                  MISSING FIELD VALUES ARE NULL
              )
          LOCATION('lineorder.tbl*'))
          PARALLEL 4;

CREATE TABLE ssb.lineorder
(
    lo_orderkey        INTEGER NOT NULL,
    lo_linenumber      NUMBER(1, 0) NOT NULL,
    lo_custkey         INTEGER NOT NULL,
    lo_partkey         INTEGER NOT NULL,
    lo_suppkey         INTEGER NOT NULL,
    lo_orderdate       NUMBER(8,0) NOT NULL,
    lo_orderpriority   CHAR(15) NOT NULL,
    lo_shippriority    CHAR(1) NOT NULL,
    lo_quantity        NUMBER(2, 0) NOT NULL,
    lo_extendedprice   NUMBER NOT NULL,
    lo_ordtotalprice   NUMBER NOT NULL,
    lo_discount        NUMBER(2, 0) NOT NULL,
    lo_revenue         NUMBER NOT NULL,
    lo_supplycost      NUMBER NOT NULL,
    --lo_ordsupplycost   NUMBER not null, -- this is mentioned in 2.2 Notes(c) but isn't in the layout or sample queries, so not needed?
    lo_tax             NUMBER(1, 0) NOT NULL,
    lo_commitdate      NUMBER(8,0) NOT NULL,
    lo_shipmode        CHAR(10) NOT NULL
);

CREATE TABLE ssb.ext_part
(
    p_partkey     INTEGER,
    p_name        VARCHAR2(22),
    p_mfgr        CHAR(6),
    p_category    CHAR(7),
    p_brand1      CHAR(9),
    p_color       VARCHAR2(11),
    p_type        VARCHAR2(25),
    p_size        NUMBER(2, 0),
    p_container   CHAR(10)
)
ORGANIZATION EXTERNAL
    (TYPE oracle_loader
          DEFAULT DIRECTORY ssb_dir
              ACCESS PARAMETERS (
                  FIELDS
                      TERMINATED BY '|'
                  MISSING FIELD VALUES ARE NULL
              )
          LOCATION('part.tbl'));

CREATE TABLE ssb.part
(
    p_partkey     INTEGER NOT NULL,
    p_name        VARCHAR2(22) NOT NULL,
    p_mfgr        CHAR(6) NOT NULL,
    p_category    CHAR(7) NOT NULL,
    p_brand1      CHAR(9) NOT NULL,
    p_color       VARCHAR2(11) NOT NULL,
    p_type        VARCHAR2(25) NOT NULL,
    p_size        NUMBER(2, 0) NOT NULL,
    p_container   CHAR(10) NOT NULL
);

CREATE TABLE ssb.ext_supplier
(
    s_suppkey   INTEGER,
    s_name      CHAR(25),
    s_address   VARCHAR2(25),
    s_city      CHAR(10),
    s_nation    CHAR(15),
    s_region    CHAR(12),
    s_phone     CHAR(15)
)
ORGANIZATION EXTERNAL
    (TYPE oracle_loader
          DEFAULT DIRECTORY ssb_dir
              ACCESS PARAMETERS (
                  FIELDS
                      TERMINATED BY '|'
                  MISSING FIELD VALUES ARE NULL
              )
          LOCATION('supplier.tbl'));

CREATE TABLE ssb.supplier
(
    s_suppkey   INTEGER NOT NULL,
    s_name      CHAR(25) NOT NULL,
    s_address   VARCHAR2(25) NOT NULL,
    s_city      CHAR(10) NOT NULL,
    s_nation    CHAR(15) NOT NULL,
    s_region    CHAR(12) NOT NULL,
    s_phone     CHAR(15) NOT NULL
);

CREATE TABLE ssb.ext_customer
(
    c_custkey      INTEGER,
    c_name         VARCHAR2(25),
    c_address      VARCHAR2(25),
    c_city         CHAR(10),
    c_nation       CHAR(15),
    c_region       CHAR(12),
    c_phone        CHAR(15),
    c_mktsegment   CHAR(10)
)
ORGANIZATION EXTERNAL
    (TYPE oracle_loader
          DEFAULT DIRECTORY ssb_dir
              ACCESS PARAMETERS (
                  FIELDS
                      TERMINATED BY '|'
                  MISSING FIELD VALUES ARE NULL
              )
          LOCATION('customer.tbl'));

CREATE TABLE ssb.customer
(
    c_custkey      INTEGER NOT NULL,
    c_name         VARCHAR2(25) NOT NULL,
    c_address      VARCHAR2(25) NOT NULL,
    c_city         CHAR(10) NOT NULL,
    c_nation       CHAR(15) NOT NULL,
    c_region       CHAR(12) NOT NULL,
    c_phone        CHAR(15) NOT NULL,
    c_mktsegment   CHAR(10) NOT NULL
);

CREATE TABLE ssb.ext_date_dim
(
    d_datekey            NUMBER(8,0),
    d_date               CHAR(18),
    d_dayofweek          CHAR(9),    -- defined in Section 2.6 as Size 8, but Wednesday is 9 letters
    d_month              CHAR(9),
    d_year               NUMBER(4, 0),
    d_yearmonthnum       NUMBER(6, 0),
    d_yearmonth          CHAR(7),
    d_daynuminweek       NUMBER(1, 0),
    d_daynuminmonth      NUMBER(2, 0),
    d_daynuminyear       NUMBER(3, 0),
    d_monthnuminyear     NUMBER(2, 0),
    d_weeknuminyear      NUMBER(2, 0),
    d_sellingseason      CHAR(12),
    d_lastdayinweekfl    NUMBER(1, 0),
    d_lastdayinmonthfl   NUMBER(1, 0),
    d_holidayfl          NUMBER(1, 0),
    d_weekdayfl          NUMBER(1, 0)
)
ORGANIZATION EXTERNAL
    (TYPE oracle_loader
          DEFAULT DIRECTORY ssb_dir
              ACCESS PARAMETERS (
                  FIELDS
                      TERMINATED BY '|'
                  MISSING FIELD VALUES ARE NULL
              )
          LOCATION('date.tbl'));

CREATE TABLE ssb.date_dim
(
    d_datekey            NUMBER(8,0) NOT NULL,
    d_date               CHAR(18) NOT NULL,
    d_dayofweek          CHAR(9) NOT NULL,    -- defined in Section 2.6 as Size 8, but Wednesday is 9 letters
    d_month              CHAR(9) NOT NULL,
    d_year               NUMBER(4, 0) NOT NULL,
    d_yearmonthnum       NUMBER(6, 0) NOT NULL,
    d_yearmonth          CHAR(7) NOT NULL,
    d_daynuminweek       NUMBER(1, 0) NOT NULL,
    d_daynuminmonth      NUMBER(2, 0) NOT NULL,
    d_daynuminyear       NUMBER(3, 0) NOT NULL,
    d_monthnuminyear     NUMBER(2, 0) NOT NULL,
    d_weeknuminyear      NUMBER(2, 0) NOT NULL,
    d_sellingseason      CHAR(12) NOT NULL,
    d_lastdayinweekfl    NUMBER(1, 0) NOT NULL,
    d_lastdayinmonthfl   NUMBER(1, 0) NOT NULL,
    d_holidayfl          NUMBER(1, 0) NOT NULL,
    d_weekdayfl          NUMBER(1, 0) NOT NULL
);



select /*+ parallel */ count(1) from ssb.ext_lineorder ;
select /*+ parallel */ count(1) from ssb.ext_part      ;
select /*+ parallel */ count(1) from ssb.ext_supplier  ;
select /*+ parallel */ count(1) from ssb.ext_customer  ;
select /*+ parallel */ count(1) from ssb.ext_date_dim  ;

select /*+ parallel */ count(1) from ssb.lineorder ;
select /*+ parallel */ count(1) from ssb.part      ;
select /*+ parallel */ count(1) from ssb.supplier  ;
select /*+ parallel */ count(1) from ssb.customer  ;
select /*+ parallel */ count(1) from ssb.date_dim  ;





  COUNT(1)
----------
  23996604

SYSTEM@ssb> 
  COUNT(1)
----------
    600000

SYSTEM@ssb> 
  COUNT(1)
----------
      8000

SYSTEM@ssb> 
  COUNT(1)
----------
    120000

SYSTEM@ssb> 
  COUNT(1)
----------
      2556


-- insert:

-- TRUNCATE TABLE ssb.lineorder;
-- TRUNCATE TABLE ssb.part;
-- TRUNCATE TABLE ssb.supplier;
-- TRUNCATE TABLE ssb.customer;
-- TRUNCATE TABLE ssb.date_dim;


ALTER SESSION FORCE PARALLEL QUERY;
ALTER SESSION FORCE PARALLEL DDL;
ALTER SESSION FORCE PARALLEL DML;
ALTER SESSION ENABLE PARALLEL DML;

INSERT /*+ APPEND */ INTO  ssb.part      SELECT * FROM ssb.ext_part;
commit;
INSERT /*+ APPEND */ INTO  ssb.supplier  SELECT * FROM ssb.ext_supplier;
commit;
INSERT /*+ APPEND */ INTO  ssb.customer  SELECT * FROM ssb.ext_customer;
commit;
INSERT /*+ APPEND */ INTO  ssb.date_dim  SELECT * FROM ssb.ext_date_dim;
commit;
INSERT /*+ APPEND */ INTO  ssb.lineorder SELECT * FROM ssb.ext_lineorder;
commit;
```

```

ALTER TABLE ssb.lineorder
    ADD CONSTRAINT pk_lineorder PRIMARY KEY(lo_orderkey, lo_linenumber);

ALTER TABLE ssb.part
    ADD CONSTRAINT pk_part PRIMARY KEY(p_partkey);

ALTER TABLE ssb.supplier
    ADD CONSTRAINT pk_supplier PRIMARY KEY(s_suppkey);

ALTER TABLE ssb.customer
    ADD CONSTRAINT pk_customer PRIMARY KEY(c_custkey);

ALTER TABLE ssb.date_dim
    ADD CONSTRAINT pk_date_dim PRIMARY KEY(d_datekey);

---

ALTER TABLE ssb.lineorder
    ADD CONSTRAINT fk_lineitem_customer FOREIGN KEY(lo_custkey) REFERENCES ssb.customer(c_custkey);

ALTER TABLE ssb.lineorder
    ADD CONSTRAINT fk_lineitem_part FOREIGN KEY(lo_partkey) REFERENCES ssb.part(p_partkey);

ALTER TABLE ssb.lineorder
    ADD CONSTRAINT fk_lineitem_supplier FOREIGN KEY(lo_suppkey) REFERENCES ssb.supplier(s_suppkey);

ALTER TABLE ssb.lineorder
    ADD CONSTRAINT fk_lineitem_orderdate FOREIGN KEY(lo_orderdate) REFERENCES ssb.date_dim(d_datekey);

ALTER TABLE ssb.lineorder
    ADD CONSTRAINT fk_lineitem_commitdate FOREIGN KEY(lo_commitdate) REFERENCES ssb.date_dim(d_datekey);
```



SELECT NUM_ROWS, --表中的记录数
BLOCKS, --表中数据所占的数据块数
EMPTY_BLOCKS, --表中的空块数
AVG_SPACE, --数据块中平均的使用空间
CHAIN_CNT, --表中行连接和行迁移的数量
AVG_ROW_LEN --每条记录的平均长度
FROM USER_TABLES;


SELECT BLEVEL, --索引的层数
LEAF_BLOCKS, --叶子结点的个数
DISTINCT_KEYS, --唯一值的个数
AVG_LEAF_BLOCKS_PER_KEY, --每个KEY的平均叶块个数 
AVG_DATA_BLOCKS_PER_KEY, --每个KEY的平均数据块个数
CLUSTERING_FACTOR --群集因子
FROM USER_INDEXES;

SELECT NUM_DISTINCT, --唯一值的个数
LOW_VALUE, --列上的最小值
HIGH_VALUE, --列上的最大值
DENSITY, --选择率因子（密度）
NUM_NULLS, --空值的个数
NUM_BUCKETS, --直方图的BUCKET个数
HISTOGRAM --直方图的类型
FROM USER_TAB_COLUMNS;


alter session set NLS_DATE_FORMAT='YYYY-MM-DD HH24:MI:SS';  

select table_name,num_rows,blocks,last_analyzed from user_tables where table_name in ('PART');

select table_name,index_name,t.blevel,t.num_rows,t.leaf_blocks,t.last_analyzed from user_indexes t where table_name in ('T1','T2');  

说明：
-- table_name：展示表名 --num_rows：最后一次统计时的行数 --blocks：非当前块数，最后一次统计时的块数 --last_analyzed ：最后一次统计的时间 
--上述字段为null说明未统计


手动收集统计信息，并再次查看：
exec dbms_stats.gather_table_stats(ownname=>'META',tabname=>'EMP',estimate_percent=>10,method_opt=>'for all indexed columns');

手动收集统计信息

收集表统计信息

exec dbms_stats.gather_table_stats(ownname => 'USER',tabname => 'TEST',estimate_percent => 10,method_opt=> 'for all indexed columns');  
  
exec dbms_stats.gather_table_stats(ownname => 'USER',tabname => 'TAB_NAME',CASCADE=>TURE);  
收集分区表的某个分区统计信息

exec dbms_stats.gather_table_stats(ownname => 'USER',tabname => 'RANGE_PART_TAB',partname => 'p_201312',estimate_percent => 10,method_opt=> 'for all indexed columns',cascade=>TRUE);  
收集索引统计信息

exec dbms_stats.gather_index_stats(ownname => 'USER',indname => 'IDX_OBJECT_ID',estimate_percent => '10',degree => '4');  
收集表和索引统计信息 

exec dbms_stats.gather_table_stats(ownname => 'USER',tabname => 'TEST',estimate_percent => 10,method_opt=> 'for all indexed columns',cascade=>TRUE);  
收集某个用户的统计信息

exec dbms_stats.gather_schema_stats(ownname=>'CS',estimate_percent=>10,degree=>8,cascade=>true,granularity=>'ALL');  
收集整个数据库的统计信息

exec dbms_stats.gather_database_stats(estimate_percent=>10,degree=>8,cascade=>true,granularity=>'ALL');  