---
layout: post
title: "Oracle Setting up the Star Schema Benchmark (SSB) Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}





Setting up the Star Schema Benchmark (SSB) in Oracle Tips

A related test system called the Star Schema Benchmark (SSB) from Pat O’Neil, Betty O’Neil, 

and Xuedong Chen at the University of Massachusetts at Boston alters the TPC-H structures to create a warehousing data model. 

[Files:dbgen](http://www.cs.umb.edu/~poneil/dbgen.zip)

[SSB Documents](http://www.cs.umb.edu/~poneil/StarSchemaB.PDF)

[StarSchemaBenchmark-master](https://github.com/lemire/StarSchemaBenchmark)

[LabGuide900_inmemory.md](https://github.com/oracle/learning-library/blob/master/workshops/journey2-new-data-lake/LabGuide900_inmemory.md)









Download the dbgen file and make file.

	$ cd dbgen
	$ cp makefile.suite makefile
	$ vi makefile

	CC = gcc
	DATABASE= SQLSERVER
	MACHINE = LINUX
	WORKLOAD = SSBM

These several warnings can be ignored.

	[root@database18c dbgen]# make
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o build.o build.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o driver.o driver.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o bm_utils.o bm_utils.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o rnd.o rnd.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o print.o print.c
	print.c: In function dbg_print:
	print.c:138:27: warning: cast from pointer to integer of different size [-Wpointer-to-int-cast]
		fprintf(target, "%c ", (char)data);
							   ^
	print.c:140:26: warning: cast from pointer to integer of different size [-Wpointer-to-int-cast]
		fprintf(target, "%c", (char)data);
							  ^
	In file included from print.c:18:0:
	print.c: In function pr_line:
	dss.h:510:48: warning: cast to pointer from integer of different size [-Wint-to-pointer-cast]
	 #define PR_INT(f, str)    dbg_print(DT_INT, f, (void *)str, 0, 1)
													^
	print.c:265:9: note: in expansion of macro PR_INT
			 PR_INT(fp_l, o->lineorders[i].linenumber);
			 ^
	print.c: In function pr_date:
	dss.h:510:48: warning: cast to pointer from integer of different size [-Wint-to-pointer-cast]
	 #define PR_INT(f, str)    dbg_print(DT_INT, f, (void *)str, 0, 1)
													^
	print.c:663:5: note: in expansion of macro PR_INT
		 PR_INT(d_fp, d->year);
		 ^
	dss.h:510:48: warning: cast to pointer from integer of different size [-Wint-to-pointer-cast]
	 #define PR_INT(f, str)    dbg_print(DT_INT, f, (void *)str, 0, 1)
													^
	print.c:664:5: note: in expansion of macro PR_INT
		 PR_INT(d_fp, d->yearmonthnum);
		 ^
	dss.h:510:48: warning: cast to pointer from integer of different size [-Wint-to-pointer-cast]
	 #define PR_INT(f, str)    dbg_print(DT_INT, f, (void *)str, 0, 1)
													^
	print.c:666:5: note: in expansion of macro PR_INT
		 PR_INT(d_fp, d->daynuminweek);
		 ^
	dss.h:510:48: warning: cast to pointer from integer of different size [-Wint-to-pointer-cast]
	 #define PR_INT(f, str)    dbg_print(DT_INT, f, (void *)str, 0, 1)
													^
	print.c:667:5: note: in expansion of macro PR_INT
		 PR_INT(d_fp, d->daynuminmonth);
		 ^
	dss.h:510:48: warning: cast to pointer from integer of different size [-Wint-to-pointer-cast]
	 #define PR_INT(f, str)    dbg_print(DT_INT, f, (void *)str, 0, 1)
													^
	print.c:668:5: note: in expansion of macro PR_INT
		 PR_INT(d_fp, d->daynuminyear);
		 ^
	dss.h:510:48: warning: cast to pointer from integer of different size [-Wint-to-pointer-cast]
	 #define PR_INT(f, str)    dbg_print(DT_INT, f, (void *)str, 0, 1)
													^
	print.c:669:5: note: in expansion of macro PR_INT
		 PR_INT(d_fp, d->monthnuminyear);
		 ^
	dss.h:510:48: warning: cast to pointer from integer of different size [-Wint-to-pointer-cast]
	 #define PR_INT(f, str)    dbg_print(DT_INT, f, (void *)str, 0, 1)
													^
	print.c:670:5: note: in expansion of macro PR_INT
		 PR_INT(d_fp, d->weeknuminyear);
		 ^
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o load_stub.o load_stub.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o bcd2.o bcd2.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o speed_seed.o speed_seed.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o text.o text.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o permute.o permute.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM -O -o dbgen build.o driver.o bm_utils.o rnd.o print.o load_stub.o bcd2.o speed_seed.o text.o permute.o -lm
	bm_utils.o: In function `yes_no':
	bm_utils.c:(.text+0x3c): warning: the `gets' function is dangerous and should not be used.
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o qgen.o qgen.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM   -c -o varsub.o varsub.c
	gcc -O -DDBNAME=\"dss\" -DLINUX -DSQLSERVER -DSSBM -O -o qgen build.o bm_utils.o qgen.o rnd.o varsub.o text.o bcd2.o permute.o speed_seed.o -lm
	bm_utils.o: In function `yes_no':
	bm_utils.c:(.text+0x3c): warning: the `gets' function is dangerous and should not be used.
	[root@database18c dbgen]# 
	[root@database18c dbgen]# 
	[root@database18c dbgen]# 
	[root@database18c dbgen]# 
	[root@database18c dbgen]# ls -ltr
	total 713
	-rwxrwxrwx. 1 vagrant vagrant  5688 Feb 28  2010 bcd2.c
	-rwxrwxrwx. 1 vagrant vagrant  5179 Feb 28  2010 config.h
	-rwxrwxrwx. 1 vagrant vagrant   769 Feb 28  2010 CHANGES
	-rwxrwxrwx. 1 vagrant vagrant 20182 Feb 28  2010 build.c
	-rwxrwxrwx. 1 vagrant vagrant 27733 Feb 28  2010 BUGS
	-rwxrwxrwx. 1 vagrant vagrant 13464 Feb 28  2010 bm_utils.c
	-rwxrwxrwx. 1 vagrant vagrant   493 Feb 28  2010 bcd2.h
	-rwxrwxrwx. 1 vagrant vagrant  2072 Feb 28  2010 dss.ri
	-rwxrwxrwx. 1 vagrant vagrant 16189 Feb 28  2010 dss.h
	-rwxrwxrwx. 1 vagrant vagrant  3875 Feb 28  2010 dss.ddl
	-rwxrwxrwx. 1 vagrant vagrant 28538 Feb 28  2010 driver.c
	-rwxrwxrwx. 1 vagrant vagrant 11439 Feb 28  2010 dists.dss
	-rwxrwxrwx. 1 vagrant vagrant 36864 Feb 28  2010 debug.txt
	-rwxrwxrwx. 1 vagrant vagrant  3016 Feb 28  2010 makefile_win
	-rwxrwxrwx. 1 vagrant vagrant  4095 Feb 28  2010 makefile.suite
	-rwxrwxrwx. 1 vagrant vagrant  4126 Feb 28  2010 load_stub.c
	-rwxrwxrwx. 1 vagrant vagrant 25982 Feb 28  2010 history.html
	-rwxrwxrwx. 1 vagrant vagrant 23726 Feb 28  2010 HISTORY
	-rwxrwxrwx. 1 vagrant vagrant  7960 Feb 28  2010 dsstypes.h
	-rwxrwxrwx. 1 vagrant vagrant  6848 Feb 28  2010 rnd.c
	-rwxrwxrwx. 1 vagrant vagrant  2974 Feb 28  2010 README
	-rwxrwxrwx. 1 vagrant vagrant 13904 Feb 28  2010 qgen.c
	-rwxrwxrwx. 1 vagrant vagrant 22260 Feb 28  2010 print.c
	-rwxrwxrwx. 1 vagrant vagrant  9178 Feb 28  2010 PORTING.NOTES
	-rwxrwxrwx. 1 vagrant vagrant  2974 Feb 28  2010 permute.h
	-rwxrwxrwx. 1 vagrant vagrant  3296 Feb 28  2010 permute.c
	-rwxrwxrwx. 1 vagrant vagrant  9898 Feb 28  2010 varsub.c
	-rwxrwxrwx. 1 vagrant vagrant 17256 Feb 28  2010 TPCH_README
	-rwxrwxrwx. 1 vagrant vagrant  3079 Feb 28  2010 tpcd.h
	-rwxrwxrwx. 1 vagrant vagrant  6478 Feb 28  2010 text.c
	-rwxrwxrwx. 1 vagrant vagrant  7835 Feb 28  2010 speed_seed.c
	-rwxrwxrwx. 1 vagrant vagrant  2739 Feb 28  2010 shared.h
	-rwxrwxrwx. 1 vagrant vagrant  4117 Feb 28  2010 rnd.h
	-rwxrwxrwx. 1 vagrant vagrant  4110 Sep 28 06:04 makefile.back
	-rwxrwxrwx. 1 vagrant vagrant  4116 Sep 28 06:05 makefile
	-rwxrwxrwx. 1 vagrant vagrant 15456 Sep 28 06:33 build.o
	-rwxrwxrwx. 1 vagrant vagrant 37680 Sep 28 06:33 driver.o
	-rwxrwxrwx. 1 vagrant vagrant 10720 Sep 28 06:33 bm_utils.o
	-rwxrwxrwx. 1 vagrant vagrant  5776 Sep 28 06:33 rnd.o
	-rwxrwxrwx. 1 vagrant vagrant 18712 Sep 28 06:33 print.o
	-rwxrwxrwx. 1 vagrant vagrant  6088 Sep 28 06:33 load_stub.o
	-rwxrwxrwx. 1 vagrant vagrant  4000 Sep 28 06:33 bcd2.o
	-rwxrwxrwx. 1 vagrant vagrant  7296 Sep 28 06:33 speed_seed.o
	-rwxrwxrwx. 1 vagrant vagrant  3976 Sep 28 06:33 text.o
	-rwxrwxrwx. 1 vagrant vagrant  3184 Sep 28 06:33 permute.o
	-rwxrwxrwx. 1 vagrant vagrant 61968 Sep 28 06:33 dbgen
	-rwxrwxrwx. 1 vagrant vagrant 32000 Sep 28 06:33 qgen.o
	-rwxrwxrwx. 1 vagrant vagrant 17208 Sep 28 06:33 varsub.o
	-rwxrwxrwx. 1 vagrant vagrant 57680 Sep 28 06:33 qgen
	[root@database18c dbgen]# ls -ltr dbgen 
	-rwxrwxrwx. 1 vagrant vagrant 61968 Sep 28 06:33 dbgen
	[root@database18c dbgen]# 

Generate a small, approximately 4GB, set of test data.

	$ ./dbgen -s 4 -T c
	$ ./dbgen -s 4 -T p
	$ ./dbgen -s 4 -T s
	$ ./dbgen -s 4 -T d
	$ ./dbgen -s 4 -T l
	$ mv *.tbl /home/oracle/ssb

Sample:

	[root@database18c dbgen]# ./dbgen -s 1 -T l
	SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
	Copyright Transaction Processing Performance Council 1994 - 2000
	[root@database18c dbgen]# 
	[root@database18c dbgen]# ./dbgen -s 4 -T a
	SSBM (Star Schema Benchmark) Population Generator (Version 1.0.0)
	Copyright Transaction Processing Performance Council 1994 - 2000
	Segmentation fault
	[root@database18c dbgen]# su - oracle
	[oracle@database18c ~]$ cd ssb
	[oracle@database18c ssb]$ ls -ltr
	total 62432
	-rwxrwxrwx. 1 vagrant vagrant   229376 Sep 28 06:43 date.tbl
	-rwxrwxrwx. 1 vagrant vagrant   667648 Sep 28 06:43 supplier.tbl
	-rwxrwxrwx. 1 vagrant vagrant 11395072 Sep 28 06:43 customer.tbl
	-rwxrwxrwx. 1 vagrant vagrant 51638272 Sep 28 06:43 part.tbl
	-rwxrwxrwx. 1 vagrant vagrant  594313001 Sep 28 07:07 lineorder.tbl
	[oracle@database18c ssb]$ 

Create table ddl:
	
	CREATE USER ssb IDENTIFIED BY ssb;

	GRANT CREATE SESSION,
		  CREATE TABLE,
		  CREATE ANY DIRECTORY,
		  UNLIMITED TABLESPACE
		TO ssb;

	CREATE OR REPLACE DIRECTORY ssb_dir AS '/home/oracle/ssb';

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

Now load the data. As you scale up into larger volumes, these steps are still valid; but you may want to split the loads into separate steps and alter the LINEORDER external table to read multiple files in parallel and use parallel dml on insert in order to speed up the process. The truncate lines aren’t necessary for the first time data load; but are included for future reloads of the dbgen data with other scaling.

	TRUNCATE TABLE ssb.lineorder;
	TRUNCATE TABLE ssb.part;
	TRUNCATE TABLE ssb.supplier;
	TRUNCATE TABLE ssb.customer;
	TRUNCATE TABLE ssb.date_dim;

	ALTER TABLE ssb.lineorder PARALLEL 4;
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

	And finally, add the constraints and indexes.

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

	
Or use sqlloader to import data into the tables just like the following blog.

[Steps to load the Star Schema Benchmark (SSB) into an Oracle Database](https://jorgebarbablog.wordpress.com/2016/03/21/how-to-load-the-ssb-schema-into-an-oracle-database/)

	load_customer.ctl:
	---------------------- START ---------------
	load data
	INFILE 'customer.tbl'
	INTO TABLE CUSTOMER
	APPEND
	FIELDS TERMINATED BY '|'
	(C_CUSTKEY,
	 C_NAME,
	 C_ADDRESS,
	 C_CITY,
	 C_NATION,
	 C_REGION,
	 C_PHONE,
	 C_MKTSEGMENT)
	----------------------- END ---------------
	load_part.ctl:
	---------------------- START ---------------
	load data
	INFILE 'part.tbl'
	INTO TABLE PART
	APPEND
	FIELDS TERMINATED BY '|'
	( P_PARTKEY,
	 P_NAME,
	 P_MFGR,
	 P_CATEGORY,
	 P_BRAND1,
	 P_COLOR,
	 P_TYPE,
	 P_SIZE,
	 P_CONTAINER)
	----------------------- END ---------------
	load_supplier.ctl:
	---------------------- START ---------------
	load data
	INFILE 'supplier.tbl'
	INTO TABLE SUPPLIER
	APPEND
	FIELDS TERMINATED BY '|'
	( S_SUPPKEY,
	 S_NAME,
	 S_ADDRESS,
	 S_CITY,
	 S_NATION,
	 S_REGION,
	 S_PHONE)
	----------------------- END ---------------
	load_date_table.ctl:
	---------------------- START ---------------
	load data
	INFILE 'date.tbl'
	INTO TABLE DATE_TABLE
	APPEND
	FIELDS TERMINATED BY '|'
	( D_DATEKEY,
	 D_DATE,
	 D_DAYOFWEEK,
	 D_MONTH,
	 D_YEAR,
	 D_YEARMONTHNUM,
	 D_YEARMONTH ,
	 D_DAYNUMINWEEK,
	 D_DAYNUMINMONTH,
	 D_DAYNUMINYEAR,
	 D_MONTHNUMINYEAR,
	 D_WEEKNUMINYEAR,
	 D_SELLINGSEASON,
	 D_LASTDAYINWEEKFL,
	 D_LASTDAYINMONTHFL,
	 D_HOLIDAYFL,
	 D_WEEKDAYFL)
	----------------------- END ---------------
	load_lineorder.ctl:
	---------------------- START ---------------
	load data
	INFILE 'lineorder.tbl'
	INTO TABLE LINEORDER
	APPEND
	FIELDS TERMINATED BY '|'
	( LO_ORDERKEY,
	 LO_LINENUMBER,
	 LO_CUSTKEY,
	 LO_PARTKEY,
	 LO_SUPPKEY,
	 LO_ORDERDATE,
	 LO_ORDERPRIORITY,
	 LO_SHIPPRIORITY,
	 LO_QUANTITY,
	 LO_EXTENDEDPRICE,
	 LO_ORDTOTALPRICE,
	 LO_DISCOUNT,
	 LO_REVENUE,
	 LO_SUPPLYCOST,
	 LO_TAX,
	 LO_COMMITDATE,
	 LO_SHIPMODE)
	----------------------- END ---------------

	select file_name,tablespace_name from dba_data_files;
	create tablespace ssb datafile '/u01/app/oracle/oradata/ORCLCDB/pdb1/ssb01.dbf' size 8G autoextend on next 500m;
	CREATE USER ssb IDENTIFIED BY ssb;
	GRANT CREATE SESSION,
		  CREATE TABLE,
		  CREATE ANY DIRECTORY,
		  UNLIMITED TABLESPACE
		TO ssb;
	grant connect, resource to ssb identified by ssb;
	alter user ssb default tablespace ssb;
	conn ssb/ssb
	host sqlldr userid=ssb/ssb control=load_customer.ctl log=loader_customer.log
	host sqlldr userid=ssb/ssb control=load_part.ctl log=loader_part.log
	host sqlldr userid=ssb/ssb control=load_supplier.ctl log=loader_supplier.log
	host sqlldr userid=ssb/ssb control=load_date_table.ctl log=loader_date_table.log
	host sqlldr userid=ssb/ssb control=load_lineorder.ctl log=loader_lineorder.log
		
	clearup:
	
	conn ssb/ssb
	DROP TABLE CUSTOMER;
	DROP TABLE PART;
	DROP TABLE SUPPLIER;
	DROP TABLE DATE_TABLE;
	DROP TABLE LINEORDER;
	host rm customer.tbl part.tbl supplier.tbl date.tbl lineorder.tbl
	conn / as sysdba
	DROP TABLESPACE ssb INCLUDING CONTENTS AND DATAFILES;
	exit


Sample Star Schema Benchmark (SSB) Queries and Analytic Views
[Star Schema Benchmark Queries](https://docs.oracle.com/en/cloud/paas/autonomous-data-warehouse-cloud/user/sample-queries.html#GUID-7FA5DC45-610C-4B8A-B22F-82D9F5E01979)

	select sum(lo_extendedprice*lo_discount) as revenue
	from ssb.lineorder, ssb.date_dim
	where lo_orderdate = d_datekey
	and d_yearmonthnum = 199401
	and lo_discount between 4 and 6
	and lo_quantity between 26 and 35;

	select sum(lo_extendedprice*lo_discount) as revenue
	from ssb.lineorder, ssb.date_dim
	where lo_orderdate = d_datekey
	and d_year = 1993
	and lo_discount between 1 and 3
	and lo_quantity < 25;

	select sum(lo_extendedprice*lo_discount) as revenue
	from ssb.lineorder, ssb.date_dim
	where lo_orderdate = d_datekey
	and d_yearmonthnum = 199401
	and lo_discount between 4 and 6
	and lo_quantity between 26 and 35;

	select sum(lo_extendedprice*lo_discount) as revenue
	from ssb.lineorder, ssb.date_dim
	where lo_orderdate = d_datekey
	and d_weeknuminyear = 6
	and d_year = 1994
	and lo_discount between 5 and 7
	and lo_quantity between 26 and 35;

	select sum(lo_revenue), d_year, p_brand1
	from ssb.lineorder, ssb.date_dim, ssb.part, ssb.supplier
	where lo_orderdate = d_datekey
	and lo_partkey = p_partkey
	and lo_suppkey = s_suppkey
	and p_category = 'MFGR#12'
	and s_region = 'AMERICA'
	group by d_year, p_brand1
	order by d_year, p_brand1;

	select sum(lo_revenue), d_year, p_brand1
	from ssb.lineorder, ssb.date_dim, ssb.part, ssb.supplier
	where lo_orderdate = d_datekey
	and lo_partkey = p_partkey
	and lo_suppkey = s_suppkey
	and p_brand1 between 'MFGR#2221' and 'MFGR#2228'
	and s_region = 'ASIA'
	group by d_year, p_brand1
	order by d_year, p_brand1;

	select sum(lo_revenue), d_year, p_brand1
	from ssb.lineorder, ssb.date_dim, ssb.part, ssb.supplier
	where lo_orderdate = d_datekey
	and lo_partkey = p_partkey
	and lo_suppkey = s_suppkey
	and p_brand1 = 'MFGR#2221'
	and s_region = 'EUROPE'
	group by d_year, p_brand1
	order by d_year, p_brand1;

	select c_nation, s_nation, d_year, sum(lo_revenue) as revenue
	from ssb.customer, ssb.lineorder, ssb.supplier, ssb.date_dim
	where lo_custkey = c_custkey
	and lo_suppkey = s_suppkey
	and lo_orderdate = d_datekey
	and c_region = 'ASIA' and s_region = 'ASIA'
	and d_year >= 1992 and d_year <= 1997
	group by c_nation, s_nation, d_year
	order by d_year asc, revenue desc;

	select c_city, s_city, d_year, sum(lo_revenue) as revenue
	from ssb.customer, ssb.lineorder, ssb.supplier, ssb.date_dim
	where lo_custkey = c_custkey
	and lo_suppkey = s_suppkey
	and lo_orderdate = d_datekey
	and c_nation = 'UNITED STATES'
	and s_nation = 'UNITED STATES'
	and d_year >= 1992 and d_year <= 1997
	group by c_city, s_city, d_year
	order by d_year asc, revenue desc;

	select c_city, s_city, d_year, sum(lo_revenue) as revenue
	from ssb.customer, ssb.lineorder, ssb.supplier, ssb.date_dim
	where lo_custkey = c_custkey
	and lo_suppkey = s_suppkey
	and lo_orderdate = d_datekey
	and (c_city='UNITED KI1' or c_city='UNITED KI5')
	and (s_city='UNITED KI1' or s_city='UNITED KI5')
	and d_year >= 1992 and d_year <= 1997
	group by c_city, s_city, d_year
	order by d_year asc, revenue desc;

	select c_city, s_city, d_year, sum(lo_revenue) as revenue
	from ssb.customer, ssb.lineorder, ssb.supplier, ssb.date_dim
	where lo_custkey = c_custkey
	and lo_suppkey = s_suppkey
	and lo_orderdate = d_datekey
	and (c_city='UNITED KI1' or c_city='UNITED KI5')
	and (s_city='UNITED KI1' or s_city='UNITED KI5')
	and d_yearmonth = 'Dec1997'
	group by c_city, s_city, d_year
	order by d_year asc, revenue desc;

	select d_year, c_nation, sum(lo_revenue - lo_supplycost) as profit
	from ssb.date_dim, ssb.customer, ssb.supplier, ssb.part, ssb.lineorder
	where lo_custkey = c_custkey
	 and lo_suppkey = s_suppkey
	 and lo_partkey = p_partkey
	 and lo_orderdate = d_datekey
	 and c_region = 'AMERICA'
	 and s_region = 'AMERICA'
	 and (p_mfgr = 'MFGR#1' or p_mfgr = 'MFGR#2')
	group by d_year, c_nation
	order by d_year, c_nation;

	select d_year, s_nation, p_category, sum(lo_revenue - lo_supplycost) as profit
	from ssb.date_dim, ssb.customer, ssb.supplier, ssb.part, ssb.lineorder
	where lo_custkey = c_custkey
	and lo_suppkey = s_suppkey
	and lo_partkey = p_partkey
	and lo_orderdate = d_datekey
	and c_region = 'AMERICA'
	and s_region = 'AMERICA'
	and (d_year = 1997 or d_year = 1998)
	and (p_mfgr = 'MFGR#1'
	or p_mfgr = 'MFGR#2')
	group by d_year, s_nation, p_category order by d_year, s_nation, p_category;

	select d_year, s_city, p_brand1, sum(lo_revenue - lo_supplycost) as profit
	from ssb.date_dim, ssb.customer, ssb.supplier, ssb.part, ssb.lineorder
	where lo_custkey = c_custkey
	and lo_suppkey = s_suppkey
	and lo_partkey = p_partkey
	and lo_orderdate = d_datekey
	and c_region = 'AMERICA'
	and s_nation = 'UNITED STATES'
	and (d_year = 1997 or d_year = 1998)
	and p_category = 'MFGR#14'
	group by d_year, s_city, p_brand1 order by d_year, s_city, p_brand1;




Have a good life! 2018/09 via LinHong



