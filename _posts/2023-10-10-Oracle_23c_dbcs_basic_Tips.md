---
layout: post
title: "Oracle 23c dbcs basic Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 23c dbcs basic Tips

Some info









### 23c basic info

```
SQL> @basic
"==================== v$instance/v$database/CHARACTERSET ===================="

INSTANCE_NUMBER INSTANCE_NAME	 HOST_NAME	      VERSION		STATUS		THREAD# INSTANCE_ROLE	   DATABASE_TYPE
--------------- ---------------- -------------------- ----------------- ------------ ---------- ------------------ ---------------
	      1 cdb23c		 hong23c	      23.0.0.0.0	OPEN		      1 PRIMARY_INSTANCE   SINGLE


      DBID CDB NAME	 DB_UNIQUE_NAME 		   INST_ID LOG_MODE	FLASHBACK_ON	   PROTECTION_MODE
---------- --- --------- ------------------------------ ---------- ------------ ------------------ --------------------
1215079766 YES CDB23C	 cdb23c_zgh_kix 			 1 ARCHIVELOG	NO		   MAXIMUM PERFORMANCE


PARAMETER		       VALUE
------------------------------ ------------------------------
NLS_NCHAR_CHARACTERSET	       AL16UTF16
NLS_CHARACTERSET	       AL32UTF8

"==================== Data Files/REDO Member/Group ===================="

TABLESPACE   Size(MB) FILE_NAME 										 Aut Auto_Extent_Size(MB) MAX_SIZE(MB) BLOCK_SIZE BIG
---------- ---------- ------------------------------------------------------------------------------------------ --- -------------------- ------------ ---------- ---
SYSAUX		  810 +DATA/CDB23C_ZGH_KIX/DATAFILE/sysaux.268.1149786217					 YES		       10	32,768	     8192 NO
SYSTEM		 1070 +DATA/CDB23C_ZGH_KIX/DATAFILE/system.261.1149786233					 YES		       10	32,768	     8192 NO
TEMP		   20 +DATA/CDB23C_ZGH_KIX/TEMPFILE/temp.263.1149786271 					 YES		       64	32,768	     8192 NO
UNDOTBS1	  100 +DATA/CDB23C_ZGH_KIX/DATAFILE/undotbs1.260.1149786253					 YES			5	32,768	     8192 NO
USERS		    5 +DATA/CDB23C_ZGH_KIX/DATAFILE/users.269.1149786523					 YES		     1.25	32,768	     8192 NO


   THREAD#    MEMBERS	  GROUP#  SEQUENCE# MEMBER							  Bytes(MB) TYPE    STATUS	     ARC
---------- ---------- ---------- ---------- ------------------------------------------------------------ ---------- ------- ---------------- ---
	 1	    1	       1	  1 +RECO/CDB23C_ZGH_KIX/ONLINELOG/group_1.257.1149786007	       1024 ONLINE  INACTIVE	     YES
	 1	    1	       2	  2 +RECO/CDB23C_ZGH_KIX/ONLINELOG/group_2.258.1149786007	       1024 ONLINE  CURRENT	     NO
	 1	    1	       3	  0 +RECO/CDB23C_ZGH_KIX/ONLINELOG/group_3.259.1149786007	       1024 ONLINE  UNUSED	     YES

"==================== Block change tracking ===================="

FILENAME						     STATUS	     BYTES
------------------------------------------------------------ ---------- ----------
							     DISABLED

"==================== User ===================="

USERNAME		  PASSWORD   ACCOUNT_STATUS		      PROFILE
------------------------- ---------- -------------------------------- ----------
SYS				     OPEN			      DEFAULT
SYSTEM				     OPEN			      DEFAULT
SYSRAC				     OPEN			      DEFAULT
XS$NULL 			     LOCKED			      DEFAULT
LBACSYS 			     LOCKED			      DEFAULT
OUTLN				     LOCKED			      DEFAULT
DBSNMP				     LOCKED			      DEFAULT
APPQOSSYS			     LOCKED			      DEFAULT
DBSFWUSER			     LOCKED			      DEFAULT
GGSYS				     LOCKED			      DEFAULT
ANONYMOUS			     LOCKED			      DEFAULT
CTXSYS				     LOCKED			      DEFAULT
DVF				     LOCKED			      DEFAULT
DVSYS				     LOCKED			      DEFAULT
AUDSYS				     LOCKED			      DEFAULT
GSMADMIN_INTERNAL		     LOCKED			      DEFAULT
GGSHAREDCAP			     LOCKED			      DEFAULT
OLAPSYS 			     LOCKED			      DEFAULT
MDSYS				     LOCKED			      DEFAULT
XDB				     LOCKED			      DEFAULT
WMSYS				     LOCKED			      DEFAULT
GSMCATUSER			     LOCKED			      DEFAULT
MDDATA				     LOCKED			      DEFAULT
REMOTE_SCHEDULER_AGENT		     LOCKED			      DEFAULT
SYSBACKUP			     LOCKED			      DEFAULT
GSMUSER 			     LOCKED			      DEFAULT
GSMROOTUSER			     LOCKED			      DEFAULT
OJVMSYS 			     LOCKED			      DEFAULT
DIP				     LOCKED			      DEFAULT
DGPDB_INT			     LOCKED			      DEFAULT
SYSKM				     LOCKED			      DEFAULT
SYS$UMF 			     LOCKED			      DEFAULT
SYSDG				     LOCKED			      DEFAULT

33 rows selected.

SQL> 

```

### 23c pfile

```
[oracle@hong23c ~]$ sqlplus / as sysdba

SQL*Plus: Release 23.0.0.0.0 - Production on Tue Oct 10 14:38:21 2023
Version 23.3.0.23.09

Copyright (c) 1982, 2023, Oracle.  All rights reserved.


Connected to:
Oracle Database 23c EE High Perf Release 23.0.0.0.0 - Production
Version 23.3.0.23.09

SQL> create pfile='/tmp/cdb23c_pfile.ora' from spfile;

File created.

SQL> !cat /tmp/cdb23c_pfile.ora
cdb23c.__data_transfer_cache_size=0
cdb23c.__db_cache_size=28454158336
cdb23c.__inmemory_ext_roarea=0
cdb23c.__inmemory_ext_rwarea=0
cdb23c.__inmemory_size=0
cdb23c.__java_pool_size=134217728
cdb23c.__large_pool_size=201326592
cdb23c.__oracle_base='/u01/app/oracle'#ORACLE_BASE set from environment
cdb23c.__pga_aggregate_target=8187281408
cdb23c.__sga_target=32749125632
cdb23c.__shared_io_pool_size=134217728
cdb23c.__shared_pool_size=3556769792
cdb23c.__streams_pool_size=0
cdb23c.__unified_pga_pool_size=0
*._datafile_write_errors_crash_instance=false
*._db_writer_coalesce_area_size=16777216
*._disable_interface_checking=TRUE
*._enable_numa_support=FALSE
*._file_size_increase_increment=2143289344
*._fix_control='18960760:on'
*._gc_policy_time=20
*._gc_undo_affinity=TRUE
*.compatible='23.0.0.0'
*.control_files='+RECO/CDB23C_ZGH_KIX/CONTROLFILE/current.256.1149786007'
*.control_management_pack_access='DIAGNOSTIC+TUNING'
*.cpu_count='0'
*.cursor_sharing='EXACT'
*.db_block_checking='OFF'
*.db_block_checksum='TYPICAL'
*.db_block_size=8192
*.db_create_file_dest='+DATA'
*.db_create_online_log_dest_1='+RECO'
*.db_domain='sub01030811150.dbvcn.oraclevcn.com'
*.db_files=1024
*.db_lost_write_protect='TYPICAL'
*.db_name='cdb23c'
*.db_recovery_file_dest='+RECO'
*.db_recovery_file_dest_size=255g
*.db_unique_name='cdb23c_zgh_kix'
*.diagnostic_dest='/u01/app/oracle'
*.dispatchers='(PROTOCOL=TCP) (SERVICE=cdb23cXDB)'
*.enable_ddl_logging=TRUE
*.enable_pluggable_database=true
*.fast_start_mttr_target=300
*.filesystemio_options='setall'
*.global_names=TRUE
*.local_listener='LISTENER_CDB23C'
*.log_archive_format='%t_%s_%r.dbf'
*.log_buffer=134217728
*.nls_language='AMERICAN'
*.nls_territory='AMERICA'
*.open_cursors=1000
*.os_authent_prefix='ops$'
*.parallel_execution_message_size=16384
*.parallel_threads_per_cpu=2
*.pga_aggregate_limit=15616m
*.pga_aggregate_target=7808m
*.processes=800
*.remote_login_passwordfile='EXCLUSIVE'
*.session_cached_cursors=100
*.sga_target=31232m
*.spatial_vector_acceleration=TRUE
*.sql92_security=TRUE
*.tde_configuration='keystore_configuration=FILE'
*.undo_retention=900
*.undo_tablespace='UNDOTBS1'
*.use_large_pages='only'
*.wallet_root='/opt/oracle/dcs/commonstore/wallets/cdb23c_zgh_kix'

SQL> 
```

### Referece




Have a good work&life! 2023/10 via LinHong


