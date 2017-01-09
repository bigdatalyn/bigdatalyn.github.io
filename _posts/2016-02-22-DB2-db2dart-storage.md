---
layout: post
title: "[原创]DB2 存储结构（db2dart分析）"
date:   2016-02-22 20:28:25
category: DB2
tags: DB2 db2dart 原创
---

* content
{:toc}

"通过db2dart数据块/索引块,了解DB2存储结构"




#### 摘要

通过db2dart数据块/索引块,了解DB2存储结构

测试环境：AIX7.1 64bit/DB2 V10.1FP5/db2inst1/sample

---

#### 1.表结构，表数量，表所在的表空间和表ID,表存储信息的获取

>1.1 表结构和数量

*当前schema是db2inst1（以下都省略）

`db2 describe table DEPARTMENT`

	db2inst1:/dbhome/db2inst1$ db2 describe table DEPARTMENT

									Data type                     Column
	Column name                     schema    Data type name      Length     Scale Nulls
	------------------------------- --------- ------------------- ---------- ----- ------
	DEPTNO                          SYSIBM    CHARACTER                    3     0 No    
	DEPTNAME                        SYSIBM    VARCHAR                     36     0 No    
	MGRNO                           SYSIBM    CHARACTER                    6     0 Yes   
	ADMRDEPT                        SYSIBM    CHARACTER                    3     0 No    
	LOCATION                        SYSIBM    CHARACTER                   16     0 Yes   

	  5 record(s) selected.

	db2inst1:/dbhome/db2inst1$ db2 "select count(*) from department"

	1          
	-----------
			 14

	  1 record(s) selected.

	db2inst1:/dbhome/db2inst1$ 

>1.2 表所在的表空间id和表id

`db2 "select tableid,tbspaceid from syscat.tables where tabname='DEPARTMENT'"`

	db2inst1:/dbhome/db2inst1$ db2 "select tableid,tbspaceid from syscat.tables where tabname='DEPARTMENT'"

	TABLEID TBSPACEID
	------- ---------
		  5         2

	  1 record(s) selected.

	db2inst1:/dbhome/db2inst1$ 

>1.3 表存储的信息

`db2dart $Database /demp /tsi 2 /oi 5`	


	db2inst1:/dbhome/db2inst1/testdir$ db2dart sample /demp /tsi 2 /oi 5

			 The requested DB2DART processing has completed successfully!
					  Complete DB2DART report found in: SAMPLE.RPT
	db2inst1:/dbhome/db2inst1/testdir$ ls -ltr
	total 72
	-rw-r-----    1 db2inst1 db2inst1      13709 Feb 23 23:59 SAMPLE.BAK
	-rw-------    1 db2inst1 db2inst1       1145 Feb 24 00:01 DART.INF
	-rw-r-----    1 db2inst1 db2inst1      13484 Feb 24 00:01 SAMPLE.RPT
	db2inst1:/dbhome/db2inst1/testdir$ 


备注：db2dart最好在offline情况下使用，保证数据一致性（online情况会不一致或者执行不了）

[DB2 LUW] db2dart 実行手順 (Linux/UNIX 版)

http://www-01.ibm.com/support/docview.wss?uid=swg21617135

	db2inst1:/dbhome/db2inst1$ db2dart sample /demp /tsi 2 /oi 5

	FYI: An active connection to the database has been detected.
		 False errors may be reported.  
		 Deactivate all connections and re-run to verify.

	Warning: The database state is not consistent.
			 False errors may be reported.

	Warning: Errors reported about reorg rows may be due to the inconsistent state of the database.
					  DB2DART Processing completed with warning(s)!
					  Complete DB2DART report found in: SAMPLE.RPT
	db2inst1:/dbhome/db2inst1$ 	

	
	
	db2inst1:/dbhome/db2inst1/testdir$ cat SAMPLE.RPT

	______________________________________________________________________________



			_______                    DART                   _______ 

	   D a t a b a s e   A n a l y s i s   a n d   R e p o r t i n g   T o o l

							   IBM    DB2    6000





	______________________________________________________________________________

	DART (V10.1)  Report:
	2016-02-24-00.01.35.342688

				Database Name: SAMPLE
				Report name: SAMPLE.RPT
				Old report back-up: SAMPLE.BAK
				Database Subdirectory: /db/db2inst1/db2inst1/NODE0000/SQL00002/MEMBER0000
				Operational Mode: Database Inspection Only (INSPECT)

	______________________________________________________________________________
	------------------------------------------------------------------------------


	Action option: DEMP 
	Table-object-ID: 5; Tablespace-ID: 2

	Creating the agent environment...

	DART formatted EMP page dump:
	-----------------------------


	   Traversing extent map for:
	   Object ID: 5
	   Table space: 2

	   Pool specific info:
	   -------------------
	   Name             =   USERSPACE1
	   Pool extent size =   32   	----------------------- `extend size 32`
	   # of containers  =   1

	   Container names:
		  /db/db2inst1/db2inst1/NODE0000/SAMPLE/T0000002/C0000000.LRG


	   Object specific mapping info:
	   -----------------------------
	   DAT extent anchor: 160
	   Traversing extent map for object type: 0
		  Tablespace ID: 2, Tablespace Seed: 2, Object: 5 EMP page class: 64,
		  EMP pool page: 160, # entries: 1
		  Page LSN = 0000000000FA3E74
		  Pool relative page #'s :
			192 					----------------------- `160+32`
		  Tablespace ID: 2, Tablespace Seed: 2, Object: 5 EMP page class: 64,
		  EMP pool page: 161, # entries: 0
		  Page LSN = 0000000000FA3E28
	......
		  Tablespace ID: 2, Tablespace Seed: 2, Object: 5 EMP page class: 64,
		  EMP pool page: 191, # entries: 0
		  Page LSN = 0000000000FA3E28
		  Pool relative page #'s :

	   INX extent anchor: 224
	   Traversing extent map for object type: 1
		  Tablespace ID: 2, Tablespace Seed: 2, Object: 5 EMP page class: 65,
		  EMP pool page: 224, # entries: 1
		  Page LSN = 0000000000FA57F7
		  Pool relative page #'s :
			256 				----------------------- `224+32`
		  Tablespace ID: 2, Tablespace Seed: 2, Object: 5 EMP page class: 65,
		  EMP pool page: 225, # entries: 0
		  Page LSN = 0000000000FA57AB
	....
		  Pool relative page #'s :
		  Tablespace ID: 2, Tablespace Seed: 2, Object: 5 EMP page class: 65,
		  EMP pool page: 255, # entries: 0
		  Page LSN = 0000000000FA57AB
		  Pool relative page #'s :

	   XDA extent anchor: 0

	   LF extent anchor: 0

	   LOB extent anchor: 0

	   LOBA extent anchor: 0

	   BKM extent anchor: 0



						 ______________________________________

			 The requested DB2DART processing has completed successfully!
						 All operation completed without error;
					   no problems were detected in the database.
						 ______________________________________

					  Complete DB2DART report found in: SAMPLE.RPT

		_______    D A R T    P R O C E S S I N G    C O M P L E T E    _______
	db2inst1:/dbhome/db2inst1/testdir$ 
	

题外话题：

db2 INSPECT CHECK TABLESPACE NAME USERSPACE1 RESULTS KEEP inspect_userspace1.insf

db2inspf /dblogs/db2dump/db2inst1/inspect_userspace1.insf inspect_userspace1.format

INSPECT文件在 DIAGPATH 目录下(db2 get dbm cfg | grep -i DIAGPATH)。

/dblogs/db2dump/db2inst1/inspect_userspace1.insf

---
	
#### 2.导出对象表的数据（/DDEL选项）

/DDEL选项说明

/DDEL  Dumps formatted table data in delimited ASCII format.         

根据1的结果 department的信息是：

Table ID or name, 5 or DEPARTMENT

tablespace ID, 2

first page,  0

num of pages: 99999999 (尽可能大的数据)





#### 参考资料

	
#### 参考资料

db2dart -h


  Inspect actions:                                                       
    /DB    (default) Inspects entire database.                           
    /T     Inspects one or more tables. (See notes 1, 3, 13)             
    /TSF   Inspects only the table space files and containers.           
    /TSC   Inspects the table space constructs of one or more            
           table spaces (but does not inspect tables).                   
    /TS    Inspects one or more table spaces and their tables.           
           (/TSC and /TS require a table space ID or a list of table     
           space IDs to be specified.  See notes 1 and 2.)               
    /ATSC  Inspects constructs of all table spaces (but not their tables).

  Data format actions:                                                  
    /DD    Dumps formatted table data.  (See notes 1, 4, 13, 15)        
    /DM    Dumps formatted block map data. (See notes 1, 4, 13, 15)     
    /DI    Dumps formatted index data.  (See notes 1, 4, 12, 15)        
    /DXA   Dumps formatted xda data in ASCII.  (See notes 1, 4, 13, 15) 
    /DXH   Dumps formatted xda data in Hex.  (See notes 1, 4, 13, 15)   
    /DP    Dumps pages in hex format.   (See notes 1, 6, 13)            
    /DTSF  Dumps formatted table space file information.                
    /DEMP  Dumps formatted EMP information for a DMS table.             
           (See notes 1, 3, 13)                                         
    /DDEL  Dumps formatted table data in delimited ASCII format.        
           (See note 13, 15)                                            
    /DHWM  Dumps high water mark information.  (See notes 1, 2, 14)     
    /LHWM  Suggests ways of lowering high water mark.                   
           (See notes 1, 7, 14)                        
		   
  Repair actions:                                                       
  Make sure the database is offline for these actions.                  
    /MI    Marks index object as invalid.                               
           (Database must be offline. See notes 1, 5)                   
    /ETS   Extends the table limit in a 4K DMS table space, if possible.
           (This action requires a table space id. See notes 1, 2)      
    /RHWM  Reduces high water mark through empty SMP extents.           
           (See notes 1, 2)                                             

  Change state actions:                                                 
  Make sure the database is offline for this action.                    
    /CHST  Change a state of the database.     

  Input value options:                                                       
    /OI object-id        Specifies the object ID.                            
                         For the /T, a comma-separated list of up to 64      
                         object IDs can be specified. If the corresponding   
                         /TSI parameter contains more than one input ID,     
                         only the first ID is used. Duplicate IDs are        
                         skipped. Logical ID can be specified for the        
                         /T parameter.                                       
    /TN table-name       Specifies the table name.                           
    /TSI tablespace-id   Specifies the table space ID.                       
                         For the /TS and /TSC, a comma-separated list of     
                         up to 64 physical table space IDs can be specified. 
                         Duplicate IDs are skipped.                          
    /ROW sum             Identifies whether L/F descriptors, LOB descriptors 
                         and control information should be checked.          
                         (1) Checks control information in rows.             
                         (2) Checks long field and LOB descriptors.          
                         (see note 8)                                        
    /PS number           Specifies the page number to start with.            
                         (When using the /DP action or working with a        
                          pool-relative tablespace, you may suffix           
                          the page number with 'p' for pool relative.)       
    /NP number           Specifies the number of pages.                      
    /V Y/N               Specifies whether or not to use verbose option.     
                         (Y) Verbose.                                        
                         (N) No verbose.
    /RPT path            The path to place report output file (optional).  
    /RPTN file-name      The name of the report file (optional).           
    /SCR Y/M/N           Specifies the type of screen output, if any.      
                         (Y) Produces normal screen output.                
                         (M) Produces minimal screen output.               
                         (N) Produces no screen output.                    
    /RPTF Y/E/N          Specifies the type of report file output, if any. 
                         (Y) Produces normal output.                       
                         (E) Sends only error information to report file.  
                         (N) Produces no report file output.               
    /ERR Y/N/E           Specifies the type of log to produce in DART.INF, 
                         if any.                                           
                         (Y) Produces a normal log in DART.INF file.       
                             (default)                                     
                         (N) Minimizes output to log DART.INF file.        
                         (E) Minimizes DART.INF file and screen output.    
                             Only error information is logged.
    /WHAT DBBP OFF/ON    Specifies the database backup pending state.        
                         (OFF) Off state.                                    
                         (ON)  On state.                                     
    /QCK [sum]           Specifies a quick option.                           
                         The default /QCK value is 1, the same as when       
                         you specify /QCK 1. (see note 8)                    
                         Valid values are:                                   
                         (1) Applies only to the /DB, /T, and /TS actions.   
                             Inspects only page 0 of the DAT objects         
                             and partially inspects the index objects        
                             (does not inspect BMP, LOB, LF objects and      
                             does not traverse the entirety of the DAT       
                             or INX objects).                                
                         (2) Applies only to the /DB, /T, /TS, /DD, /DI,     
                             /DM, /DEMP, /DDEL, /DXA, and /DXH actions.      
                             Skips system catalog table look up on           
                             non-partitioned database environments and on    
                             the catalog partition of partitioned database   
                             environments. This option has no effect on      
                             non-catalog partitions of partitioned database  
                             environments. Not applies to the applicable     
                             actions above when /TN with a table name is     
                             specified, or if /OI and /TSI with logical IDs  
                             are specified.                                  
                         (4) Applies only to the /T, /TS, and /TSC actions.  
                             For /TS, /TSC, skips inspection of the special  
                             system catalog tables. For /T, skips inspection 
                             of the system catalog table space constructs.   
                         (8) Applies only to /T and /TS actions.             
                             For /T, skips inspection of all container files.
                             For /TS, inspects only container files that     
                             are associated with the specified table space.  
    /TYP                 Specifies the type of object. Valid values are:     
                         (DAT) Object type is DAT.                           
                         (INX) Object type is INDEX.                         
                         (BKM) Object type is BMP.  		   
		   
Notes:                                                                       
1- For actions that require additional input values for identifying the data 
   to act on, the input values can be specified as arguments along with the  
   action. If values are not specified you will be prompted for input values.
   This does not apply for actions /DDEL. For this, you will be prompted for 
   the required input values.                                                
2- Actions /TSC, /TS, /ETS, /DHWM and /RHWM require 1 input value - the      
   table space ID.                                                           
   /TSC and /TS can also take a list of table space IDs as input.            
3- Actions /T and /DEMP require two input values consisting of               
   table space ID, and either of table object ID or table name.              
   /T can also take a list of table object IDs as input.                     
4- Actions /DD, /DM, /DXA, DXH and /DI require five input values consisting  
   of either table object ID or table name, table space ID, page number to   
   start with, number of pages, and verbose choice.                          
5- Action /MI requires two input values consisting of table space ID (/TSI)  
   and index object ID (/OI). These values can be found in syscat.indexes as 
   tbspaceid and index_objectid unless the index is partitioned.             
   For partitioned indexes, the /MI action uses indpartitionobjectid and     
   indpartitiontbspaceid from syscat.indexpartitions as the input to the     
   index object ID (/OI) and table space ID (/TSI) for a specific partition. 
6- For DMS table spaces, action /DP requires three input values consisting of
   table space ID, page number to start with, and number of pages.           
   For SMS table spaces, action /DP requires five input values consisting of 
   table space ID, object ID, page number to start with, number of pages,    
   and object type.                                                          
7- Action /LHWM requires a table space ID and the number of pages for the    
   desired high water mark after lowering it.
8- For value options where unique values identify different choices for    
   the option, sum up the values to get the combination of choices.        
9- Default location for report output file is the current directory in a   
   non-MPP environment, and in the diagnostic directory in a MPP environment.
10- The scope of db2dart is single node.                                    
11- In a MPP environment, you can use db2_all to invoke db2dart at all DB2  
    logical nodes in a single invocation.                                   
12- For nonpartitioned indexes on a partitioned table, the /DI action uses   
    index_objectid and tbspaceid from syscat.indexes as the input to the     
    index object ID (/OI) and table space ID (/TSI). For partitioned indexes 
    it uses partitionobjectid and tbspaceid from syscat.datapartitions as    
    the input to /OI and /TSI for indexes on a specific partition.           
13- For partitioned tables, the /DD, /DM, /DEMP, /DDEL, /DP, /DXA, /DXH      
    actions use partitionobjectid and tbspaceid from syscat.datapartitions   
    as the input to the table object ID (/OI) and table space ID (/TSI)      
    for a specific partition. The table name option (/TN) is not supported   
    for these actions. The /T action supports the table name or logical table
    object ID when use with logical table space ID to check the entire table,
    and also supports using partitionobjectid and tbspaceid from             
    syscat.datapartitions as the input to /OI and /TSI to check a specific   
    partition.                                                               
14- In general, db2dart requests to be run when the database is offline.     
    However for /DHWM and /LHWM actions, this request is not strict.         
    The report can be generated without database being offline, but results  
    will vary depending on how much write/update activity has occurred       
    recently (less activity implies more reliable results).                  
15- Starting with DB2 v9.7, new tablespaces use reclaimable storage, and     
    thus may only be accessed in an object-relative manner. As a result,     
    the 'p' suffix for the /PS option can only be used with the /DP action   
    for these tablespaces.   		   

	
DB2 V10.5的资料如下：


---

