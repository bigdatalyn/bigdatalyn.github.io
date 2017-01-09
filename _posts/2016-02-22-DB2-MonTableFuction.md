---
layout: post
title: "[原创]DB2 监控表的使用"
date:   2016-02-22 15:28:25
description: "DB2 v10之后增加了很多MON_GET_TABLE等监控函数的使用，总共有上百个监控函数，对于这些函数如果不常使用，除了查看informaction center之后，很难全部记住并加以使用。本文汇总了通过sql来汇总有哪些监控函数和每个函数能返回的结果集有哪些，不必全部记住这些函数或者查看information center即可使用"
category: DB2
excerpt: 
code: true
tags: DB2 MON_GET 原创
---

* content
{:toc}


#### 摘要

DB2 v10之后增加了很多MON_GET_TABLE等监控函数的使用，总共有上百个监控函数，对于这些函数如果不常使用，除了查看informaction center之后，很难全部记住并加以使用。本文汇总了通过sql来汇总有哪些监控函数和每个函数能返回的结果集有哪些，不必全部记住这些函数或者查看information center即可使用


---



#### 有哪些monitoring functions？

通过下面的sql语句即可查看

	db2 "select
	  substr(rout.ROUTINENAME,1,48) as ROUTINENAME,
	  substr(rout.SPECIFICNAME,1,48) as SPECIFICNAME
	from sysibm.sysroutines rout
	where 
	  rout.function_type='T'
	  and substr(rout.ROUTINENAME,1,4) in ('SNAP','MON_','ENV_','COMP')
	  and substrb(rout.SPECIFICNAME,-3,3) not in ('V91', 'V95', 'V97', '_AP')
	order by rout.ROUTINESCHEMA,rout.ROUTINENAME,rout.SPECIFICNAME";


DB2 v10.1fp5结果如下(117行)：
	
		ROUTINENAME                                      SPECIFICNAME                                    
	------------------------------------------------ ------------------------------------------------
	COMPILATION_ENV                                  COMPILATION_ENV                                 
	ENV_GET_CF_SYS_RESOURCES                         ENV_GET_CF_SYS_RESOURCES                        
	ENV_GET_DB2_SYSTEM_RESOURCES                     ENV_GET_DB2_SYSTEM_RESOURCES                    
	ENV_GET_FEATURE_INFO                             ENV_GET_FEATURE_INFO                            
	ENV_GET_INST_INFO                                ENV_GET_INST_INFO                               
	ENV_GET_NETWORK_RESOURCES                        ENV_GET_NETWORK_RESOURCES                       
	ENV_GET_PROD_INFO                                ENV_GET_PROD_INFO                               
	ENV_GET_REG_VARIABLES                            ENV_GET_REG_VARIABLES          
	......
	SNAP_GET_TBSP_QUIESCER                           SNAP_GET_TBSP_QUIESCER                          
	SNAP_GET_TBSP_RANGE                              SNAP_GET_TBSP_RANGE                             
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                   
	SNAP_GET_UTIL_PROGRESS                           SNAP_GET_UTIL_PROGRESS                          

	  117 record(s) selected.

	db2inst1:/dbhome/db2inst1$ 


#### 查看某个monitoring functions的结果集？

如果我想查看某个monitoring functions的返回结果集合有哪些？如何查看呢？

只要把ROUTINENAME更改为你上面想要的某个监控函数名。



	db2 "select
	  substr(P.ROUTINENAME,1,48) as ROUTINENAME,
	  substr(P.SPECIFICNAME,1,48) as SPECIFICNAME,
	  case when P.ROWTYPE in ('B','O','P') then CHAR('IN',3) else CHAR('OUT',3) end as IN_OUT,
	  cast(p.ORDINAL as char(3)) as ORD,
	  substr(P.PARMNAME,1,40) as PARMNAME,
	  substr(P.TYPENAME,1,16) as TYPE
	from sysibm.sysroutines r,  sysibm.sysroutineparms p
	where p.routineschema=r.routineschema
	  and p.routinename=r.routinename
	  and p.specificname=r.specificname
	  and r.function_type='T'
	  and r.ROUTINENAME='SNAP_GET_UTIL'
	order by P.ROUTINESCHEMA,P.ROUTINENAME,P.SPECIFICNAME,IN_OUT,P.ORDINAL";

例如：

	db2inst1:/dbhome/db2inst1$ db2 "select
	>   substr(P.ROUTINENAME,1,48) as ROUTINENAME,
	>   substr(P.SPECIFICNAME,1,48) as SPECIFICNAME,
	>   case when P.ROWTYPE in ('B','O','P') then CHAR('IN',3) else CHAR('OUT',3) end as IN_OUT,
	>   cast(p.ORDINAL as char(3)) as ORD,
	>   substr(P.PARMNAME,1,40) as PARMNAME,
	>   substr(P.TYPENAME,1,16) as TYPE
	> from sysibm.sysroutines r,  sysibm.sysroutineparms p
	> where p.routineschema=r.routineschema
	>   and p.routinename=r.routinename
	>   and p.specificname=r.specificname
	>   and r.function_type='T'
	>   and r.ROUTINENAME='SNAP_GET_UTIL'
	> order by P.ROUTINESCHEMA,P.ROUTINENAME,P.SPECIFICNAME,IN_OUT,P.ORDINAL";

	ROUTINENAME                                      SPECIFICNAME                                     IN_OUT ORD PARMNAME                                 TYPE            
	------------------------------------------------ ------------------------------------------------ ------ --- ---------------------------------------- ----------------
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    IN     1   MEMBER                                   INTEGER         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    1   SNAPSHOT_TIMESTAMP                       TIMESTAMP       
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    2   UTILITY_ID                               INTEGER         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    3   UTILITY_TYPE                             VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    4   UTILITY_PRIORITY                         INTEGER         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    5   UTILITY_DESCRIPTION                      VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    6   UTILITY_DBNAME                           VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    7   UTILITY_START_TIME                       TIMESTAMP       
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    8   UTILITY_STATE                            VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    9   UTILITY_INVOKER_TYPE                     VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    10  DBPARTITIONNUM                           SMALLINT        
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    11  PROGRESS_LIST_ATTR                       VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    12  PROGRESS_LIST_CUR_SEQ_NUM                INTEGER         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL                                    OUT    13  MEMBER                                   SMALLINT        
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    1   SNAPSHOT_TIMESTAMP                       TIMESTAMP       
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    2   UTILITY_ID                               INTEGER         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    3   UTILITY_TYPE                             VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    4   UTILITY_PRIORITY                         INTEGER         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    5   UTILITY_DESCRIPTION                      VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    6   UTILITY_DBNAME                           VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    7   UTILITY_START_TIME                       TIMESTAMP       
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    8   UTILITY_STATE                            VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    9   UTILITY_INVOKER_TYPE                     VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    10  DBPARTITIONNUM                           SMALLINT        
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    11  PROGRESS_LIST_ATTR                       VARCHAR         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    12  PROGRESS_LIST_CUR_SEQ_NUM                INTEGER         
	SNAP_GET_UTIL                                    SNAP_GET_UTIL_AP                                 OUT    13  MEMBER                                   SMALLINT        

	  27 record(s) selected.

	db2inst1:/dbhome/db2inst1$

或：


	db2 "select
	  substr(P.ROUTINENAME,1,48) as ROUTINENAME,
	  substr(P.SPECIFICNAME,1,48) as SPECIFICNAME,
	  case when P.ROWTYPE in ('B','O','P') then CHAR('IN',3) else CHAR('OUT',3) end as IN_OUT,
	  cast(p.ORDINAL as char(3)) as ORD,
	  substr(P.PARMNAME,1,40) as PARMNAME,
	  substr(P.TYPENAME,1,16) as TYPE
	from sysibm.sysroutines r,  sysibm.sysroutineparms p
	where p.routineschema=r.routineschema
	  and p.routinename=r.routinename
	  and p.specificname=r.specificname
	  and r.function_type='T'
	  and p.parmname='ROWS_RETURNED'
	order by P.ROUTINESCHEMA,P.ROUTINENAME,P.SPECIFICNAME,IN_OUT,P.ORDINAL";

	
	
#### 查看某个MON_GET的参数列表？
	
如何查看某个MON_GET的参数列表呢？我们知道查用类似的如table(MON_GET_TABLE('','',-2))来使用MON_GET函数或者table(MON_GET_TABLESPACE('',-2))。

但如何查看必须的参数呢？

可以参考如下SQL问来确认（MON_GET_TABLE可以替换成你想要的函数名）：

	db2 "select
	  substr(P.ROUTINENAME,1,48) as ROUTINENAME,
	  substr(P.SPECIFICNAME,1,48) as SPECIFICNAME,
	  'IN' as IN_OUT,
	  cast(p.ORDINAL as char(3)) as ORD,
	  substr(P.PARMNAME,1,40) as PARMNAME,
	  substr(P.TYPENAME,1,16) as TYPE
	from sysibm.sysroutines r,  sysibm.sysroutineparms p
	where p.routineschema=r.routineschema
	  and p.routinename=r.routinename
	  and p.specificname=r.specificname
	  and r.function_type='T'
	  and r.ROUTINENAME='MON_GET_TABLE'
	  and P.ROWTYPE in ('B','O','P')
	order by P.ROUTINESCHEMA,P.ROUTINENAME,P.SPECIFICNAME,IN_OUT,P.ORDINAL";


如下例（MON_GET_LOCKS）：


	db2inst1:/dbhome/db2inst1$         db2 "select
	>           substr(P.ROUTINENAME,1,48) as ROUTINENAME,                            
	>           substr(P.SPECIFICNAME,1,48) as SPECIFICNAME,
	>           'IN' as IN_OUT,                             
	>           cast(p.ORDINAL as char(3)) as ORD,
	>           substr(P.PARMNAME,1,40) as PARMNAME,
	>           substr(P.TYPENAME,1,16) as TYPE     
	>         from sysibm.sysroutines r,  sysibm.sysroutineparms p
	>         where p.routineschema=r.routineschema               
	>           and p.routinename=r.routinename    
	>           and p.specificname=r.specificname
	>           and r.function_type='T'          
	>           and r.ROUTINENAME='MON_GET_LOCKS'
	>           and P.ROWTYPE in ('B','O','P')   
	>         order by P.ROUTINESCHEMA,P.ROUTINENAME,P.SPECIFICNAME,IN_OUT,P.ORDINAL";

	ROUTINENAME                                      SPECIFICNAME                                     IN_OUT ORD PARMNAME                                 TYPE            
	------------------------------------------------ ------------------------------------------------ ------ --- ---------------------------------------- ----------------
	MON_GET_LOCKS                                    MON_GET_LOCKS                                    IN     1   SEARCH_ARGS                              CLOB            
	MON_GET_LOCKS                                    MON_GET_LOCKS                                    IN     2   MEMBER                                   INTEGER         

	  2 record(s) selected.

	db2inst1:/dbhome/db2inst1$ 


#### 应用

查看sales表的情况，可用下面sql语句
	
	
	db2 "select * from table(mon_get_table('DB2INST1','SALES', -2)) as mgt with ur"

	
或者：	
	
	
	db2 "select * from table(mon_get_table('','', -2)) as mgt where tabschema='DB2INST1' and tabname='SALES' with ur"
	
#### 参考资料

	
DB2 V10.5的资料如下：

[Monitor procedures and functions](http://www-01.ibm.com/support/knowledgecenter/SSEPGG_10.5.0/com.ibm.db2.luw.sql.rtn.doc/doc/c0053963.html?lang=en)	

---

