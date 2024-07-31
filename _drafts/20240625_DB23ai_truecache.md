Oracle True Cache User's Guide
https://docs.oracle.com/en/database/oracle/oracle-database/23/odbtc/overview-oracle-true-cache.html

1. Delete the database in True Cache system

Run following command as oracle user on True Cache system

$ORACLE_HOME/bin/dbca -deleteDatabase -sourceDB <SID> -forceArchiveLogDeletion -silent

Example:
$ORACLE_HOME/bin/dbca -deleteDatabase -sourceDB cdb02 -forceArchiveLogDeletion  -silent


[oracle@db23ai02 ~]$ echo $ORACLE_SID
cdb02
[oracle@db23ai02 ~]$ ps -efl | grep smon
0 S oracle   14791     1  0  80   0 - 8127548 do_sem 14:28 ?      00:00:00 ora_smon_cdb02
0 S oracle   56372 56109  0  80   0 -  3053 pipe_w 15:26 pts/0    00:00:00 grep --color=auto smon
[oracle@db23ai02 ~]$ $ORACLE_HOME/bin/dbca -deleteDatabase -sourceDB cdb02 -forceArchiveLogDeletion  -silent
Enter SYS user password: 

[WARNING] [DBT-19202] The Database Configuration Assistant will delete the Oracle instances and datafiles for your database. All information in the database will be destroyed.
Prepare for db operation
32% complete
Connecting to database
35% complete
39% complete
42% complete
45% complete
48% complete
52% complete
65% complete
Updating network configuration files
68% complete
Deleting instance and datafiles
84% complete
100% complete
Database deletion completed.
Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/cdb02_zdn_kix/cdb02_zdn_kix0.log" for further details.
[oracle@db23ai02 ~]$ 



2. Prepare True Cache blob file on Primary Database system

Run following command as oracle user on Primary DB System

$ORACLE_HOME/bin/dbca -configureDatabase -prepareTrueCacheConfigFile -sourceDB <dbuniqename or SID> -trueCacheBlobLocation <location> -silent
Example:

$ORACLE_HOME/bin/dbca -configureDatabase -prepareTrueCacheConfigFile -sourceDB db23ai01 -trueCacheBlobLocation /tmp -silent


[oracle@basedb23ai ~]$ echo $ORACLE_SID
db23ai01
[oracle@basedb23ai ~]$ ps -efl | grep smon
0 S grid      7781     1  0  80   0 - 618532 -     14:25 ?        00:00:00 asm_smon_+ASM1
4 S root      8137     1  0  30   - - 403709 -     14:25 ?        00:00:28 /u01/app/23.0.0.0/grid/bin/osysmond.bin
0 S oracle   17618     1  0  80   0 - 4007459 -    14:26 ?        00:00:00 ora_smon_db23ai01
0 S oracle   64661 62314  0  80   0 -  3053 pipe_w 15:27 pts/0    00:00:00 grep --color=auto smon
[oracle@basedb23ai ~]$ $ORACLE_HOME/bin/dbca -configureDatabase -prepareTrueCacheConfigFile -sourceDB db23ai01 -trueCacheBlobLocation /tmp -silent
Enter password for the TDE wallet: 

Session ID of the current execution is: 1
Log file location: /u01/app/oracle/cfgtoollogs/dbca/db23ai01_tkb_kix/trace.log_2024-06-25_03-27-44PM_64774
-----------------
Running Initialization job
Completed Initialization job
33% complete
-----------------
Running Validate_dataguard job
Skipping. Job is detected as not applicable.
40% complete
-----------------
Running Validate_db_version job
Completed Validate_db_version job
47% complete
-----------------
Running Validate_tde_credentials job
Completed Validate_tde_credentials job
53% complete
-----------------
Running Validate_true_cache_instance job
Completed Validate_true_cache_instance job
60% complete
-----------------
Running Validate_archive_log_mode job
Completed Validate_archive_log_mode job
67% complete
-----------------
Running Prepare_blob job
Completed Prepare_blob job
100% complete
---------- PLUGIN NOTES ----------
Successfully created blob file: /tmp/blob_2024-06-25_03-27-44PM.tar.gz
---------- END OF PLUGIN NOTES ----------
Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/db23ai01_tkb_kix/db23ai01_tkb_kix0.log" for further details.
[oracle@basedb23ai ~]$ ls -tlr /tmp/blob_2024-06-25_03-27-44PM.tar.gz
-rw-r----- 1 oracle oinstall 5519 Jun 25 15:28 /tmp/blob_2024-06-25_03-27-44PM.tar.gz
[oracle@basedb23ai ~]$ 



3. Transfer the blob file from Primary DB system to True Cache system and update the ownership of the file to oracle user


[oracle@basedb23ai ~]$ scp /tmp/blob_2024-06-25_03-27-44PM.tar.gz oracle@217.142.230.180:/tmp
The authenticity of host '217.142.230.180 (217.142.230.180)' can't be established.
ECDSA key fingerprint is SHA256:xhv7dh0KF+f3GUuPJS3oD8i7qTJXV0fwx23tvZSo7CU.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added '217.142.230.180' (ECDSA) to the list of known hosts.
oracle@217.142.230.180's password: 
blob_2024-06-25_03-27-44PM.tar.gz                                                                                                 100% 5519    16.6MB/s   00:00    
[oracle@basedb23ai ~]$ 

[oracle@db23ai02 tmp]$ chmod 775 blob_2024-06-25_03-27-44PM.tar.gz 
[oracle@db23ai02 tmp]$ 

4. Create True Cache instance on True Cache system


[oracle@db23ai02 tmp]$ sqlplus system@140.83.59.0:1521/db23ai01_tkb_kix.sub01030811150.dbvcn.oraclevcn.com

SQL*Plus: Release 23.0.0.0.0 - Production on Tue Jun 25 15:38:16 2024
Version 23.4.0.24.05

Copyright (c) 1982, 2024, Oracle.  All rights reserved.

Enter password: 
Last Successful login time: Thu Jun 20 2024 13:53:13 +08:00

Connected to:
Oracle Database 23ai EE High Perf Release 23.0.0.0.0 - Production
Version 23.4.0.24.05

SQL> exit
Disconnected from Oracle Database 23ai EE High Perf Release 23.0.0.0.0 - Production
Version 23.4.0.24.05
[oracle@db23ai02 tmp]$ 


[oracle@db23ai02 ~]$ sqlplus sys@140.83.59.0:1521/db23ai01_tkb_kix.sub01030811150.dbvcn.oraclevcn.com as sysdba

SQL*Plus: Release 23.0.0.0.0 - Production on Tue Jun 25 15:45:53 2024
Version 23.4.0.24.05

Copyright (c) 1982, 2024, Oracle.  All rights reserved.

Enter password: 

Connected to:
Oracle Database 23ai EE High Perf Release 23.0.0.0.0 - Production
Version 23.4.0.24.05

SQL> show pdbs

    CON_ID CON_NAME			  OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
	 2 PDB$SEED			  READ ONLY  NO
	 3 CDB19C			  READ WRITE NO
SQL> 


[oracle@db23ai02 ~]$ free -m
              total        used        free      shared  buff/cache   available
Mem:          63779       34491       22613           1        6673       27413
Swap:         10239           0       10239
[oracle@db23ai02 ~]$ 

$ORACLE_HOME/bin/dbca -configureDatabase -prepareTrueCacheConfigFile -sourceDB db23ai01 -trueCacheBlobLocation /tmp -silent


Run following command as oracle user.
$ORACLE_HOME/bin/dbca -createTrueCache -gdbName db23ai01 -sid db23ai01true -sourceDBConnectionString 140.83.59.0:1521/db23ai01_tkb_kix.sub01030811150.dbvcn.oraclevcn.com -trueCacheBlobFromSourceDB /tmp/blob_2024-06-25_03-27-44PM.tar.gz -sgaTargetInMB 10240 -pgaAggregateTargetInMB 4096 -tdeWalletLoginType AUTO_LOGIN -silent -listeners LISTENER

Example:

$ORACLE_HOME/bin/dbca -createTrueCache -gdbName tcdb2 -sid tcdb2 -sourceDBConnectionString 10.1.2.3:1521/DBD_psk_iad.rusn.releasevcn.oraclevcn.com -trueCacheBlobFromSourceDB /tmp/blob_2024-04-26_04-26-09AM.tar.gz -sgaTargetInMB 10000 -pgaAggregateTargetInMB 3000 -silent -listeners LISTENER



[oracle@db23ai02 ~]$ $ORACLE_HOME/bin/dbca -createTrueCache -gdbName db23ai01 -sid db23ai01true -sourceDBConnectionString 140.83.59.0:1521/db23ai01_tkb_kix.sub01030811150.dbvcn.oraclevcn.com -trueCacheBlobFromSourceDB /tmp/blob_2024-06-25_03-27-44PM.tar.gz -sgaTargetInMB 10240 -pgaAggregateTargetInMB 4096 -tdeWalletLoginType AUTO_LOGIN -silent -listeners LISTENER
Enter Remote DB SYS user password:

Enter password for the source database TDE wallet: 

Session ID of the current execution is: 1
Log file location: /u01/app/oracle/cfgtoollogs/dbca/db23ai01/trace.log_2024-06-25_03-50-26PM_69450
-----------------
Running Extract_password_file_from_blob_file job
Completed Extract_password_file_from_blob_file job
25% complete
-----------------
Running Create_static_listener job
Skipping. Job is detected as not applicable.
38% complete
-----------------
Running Register_listener job
Completed Register_listener job
50% complete
-----------------
Running Extract_tde_wallet_from_blob_file job
Completed Extract_tde_wallet_from_blob_file job
54% complete
-----------------
Running Setup_required_directories job
Completed Setup_required_directories job
57% complete
-----------------
Running Create_pfile job
Completed Create_pfile job
61% complete
-----------------
Running Start_nomount_instance job
Completed Start_nomount_instance job
64% complete
-----------------
Running Create_TDE_wallet job
Completed Create_TDE_wallet job
68% complete
-----------------
Running Create_truecache_instance job
Completed Create_truecache_instance job
71% complete
-----------------
Running Add_oratab_entry job
Completed Add_oratab_entry job
75% complete
-----------------
Running Reopen_wallet job
Completed Reopen_wallet job
100% complete
Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/db23ai01/db23ai01.log" for further details.
[oracle@db23ai02 ~]$ 


[oracle@basedb23ai ~]$ tail -40 /u01/app/oracle/diag/rdbms/db23ai01_tkb_kix/db23ai01/trace/alert_db23ai01.log 
TABLE SYS.WRP$_REPORTS_DETAILS: ADDED AUTOLIST FRAGMENT SYS_P771 (4) VALUES (( 35828049, TO_DATE(' 2024-06-24 00:00:00', 'syyyy-mm-dd hh24:mi:ss', 'nls_calendar=gregorian') ))
TABLE SYS.WRP$_REPORTS_TIME_BANDS: ADDED AUTOLIST FRAGMENT SYS_P774 (4) VALUES (( 35828049, TO_DATE(' 2024-06-24 00:00:00', 'syyyy-mm-dd hh24:mi:ss', 'nls_calendar=gregorian') ))
2024-06-25T14:34:58.170007+08:00
Resize operation completed for file# 3, fname +DATA/DB23AI01_TKB_KIX/DATAFILE/sysaux.271.1172152399, old size 808960K, new size 819200K
2024-06-25T14:44:58.184895+08:00
CDB19C(3):Resize operation completed for file# 9, fname +DATA/DB23AI01_TKB_KIX/1B4CF67C49716B6FE0634D00000A08A6/DATAFILE/sysaux.273.1172152555, old size 419840K, new size 430080K
2024-06-25T15:51:48.976096+08:00
ALTER SYSTEM SET log_archive_dest_state_2='DEFER' SCOPE=MEMORY SID='db23ai01';
2024-06-25T15:51:48.977161+08:00
ALTER SYSTEM SET log_archive_dest_2='service=','"db23ai02.sub01030811150.dbvcn.oraclevcn.com:1521/db23ai01.sub01030811150.dbvcn.oraclevcn.com"','LGWR ASYNC NET_TIMEOUT=30 VALID_FOR=(ONLINE_LOGFILE,PRIMARY_ROLE) DB_UNIQUE_NAME="db23ai01" REOPEN=15 MAX_FAILURE=20 ROLE="TRUE_CACHE"' SCOPE=MEMORY SID='db23ai01';
2024-06-25T15:51:49.002173+08:00
ALTER SYSTEM SET log_archive_dest_state_2='ENABLE' SCOPE=MEMORY SID='db23ai01';
2024-06-25T15:51:49.728646+08:00
Thread 1 advanced to log sequence 4 (LGWR switch),  current SCN: 2352080
  Current log# 1 seq# 4 mem# 0: +RECO/DB23AI01_TKB_KIX/ONLINELOG/group_1.257.1172152211
2024-06-25T15:51:49.884128+08:00
ARC2 (PID:17999): Archived Log entry 2 added for B-1172152211.T-1.S-3 LOS:0x000000000023bb1b NXS:0x000000000023e3d0 NAB:56929 ID 0x2226051 LAD:1 [krse.c:4872]
2024-06-25T15:51:50.110798+08:00
ALTER SYSTEM SET log_archive_dest_state_2='ENABLE' SCOPE=MEMORY SID='db23ai01';
2024-06-25T15:51:55.097343+08:00
*** 2024-06-25T15:51:55.097242+08:00
[kradcm.c:1217] kradcm_start_dsndr_from_primary: True Cache: RCVR primary data request receiver process (rmi PID:83060) for True Cache DGID:4076091599 started for DEST_ID:2 by FCH (PID:71554)
2024-06-25T15:51:55.113259+08:00
*** 2024-06-25T15:51:55.113124+08:00
[kradcm.c:2906] kradcm_dsndr_main: True Cache: DSNDR primary data block sender process (TT04 PID:83062) for True Cache DGID:4076091599 started for DEST_ID:2
*** 2024-06-25T15:51:55.117613+08:00
[kradcm.c:406] kradcm_connect_to_adc: True Cache DSNDR (PID:83062): Establishing connection to True Cache DGID:4076091599 CONNECTION:db23ai02.sub01030811150.dbvcn.oraclevcn.com:1521/db23ai01.sub01030811150.dbvcn.oraclevcn.com
2024-06-25T15:51:55.125016+08:00
*** 2024-06-25T15:51:55.124933+08:00
[kradcm.c:2906] kradcm_dsndr_main: True Cache: DSNDR primary data block sender process (TT06 PID:83064) for True Cache DGID:4076091599 started for DEST_ID:2
*** 2024-06-25T15:51:55.127894+08:00
[kradcm.c:406] kradcm_connect_to_adc: True Cache DSNDR (PID:83064): Establishing connection to True Cache DGID:4076091599 CONNECTION:db23ai02.sub01030811150.dbvcn.oraclevcn.com:1521/db23ai01.sub01030811150.dbvcn.oraclevcn.com
*** 2024-06-25T15:51:55.154801+08:00
[kradcm.c:483] kradcm_connect_to_adc: True Cache DSNDR (PID:83062): Successfully connected to True Cache DGID:4076091599 CONNECTION:db23ai02.sub01030811150.dbvcn.oraclevcn.com:1521/db23ai01.sub01030811150.dbvcn.oraclevcn.com
*** 2024-06-25T15:51:55.156145+08:00
[kradcm.c:3025] kradcm_dsndr_main: True Cache: DTS data block receiver process started on True Cache DGID:4076091599 PID:71558
*** 2024-06-25T15:51:55.163489+08:00
[kradcm.c:483] kradcm_connect_to_adc: True Cache DSNDR (PID:83064): Successfully connected to True Cache DGID:4076091599 CONNECTION:db23ai02.sub01030811150.dbvcn.oraclevcn.com:1521/db23ai01.sub01030811150.dbvcn.oraclevcn.com
*** 2024-06-25T15:51:55.164588+08:00
[kradcm.c:3025] kradcm_dsndr_main: True Cache: DTS data block receiver process started on True Cache DGID:4076091599 PID:71560
[oracle@basedb23ai ~]$ 

[oracle@basedb23ai ~]$ sql / as sysdba


SQLcl: Release 24.1 Production on Tue Jun 25 15:57:09 2024

Copyright (c) 1982, 2024, Oracle.  All rights reserved.

Connected to:
Oracle Database 23ai EE High Perf Release 23.0.0.0.0 - Production
Version 23.4.0.24.05

SQL> select name,role from v$dataguard_process;

NAME    ROLE                               
_______ __________________________________ 
LGWR    log writer                         
TMON    redo transport monitor             
TT00    gap manager                        
TT01    redo transport timer               
TT02    heartbeat redo informer            
ARC0    archive local                      
ARC1    archive redo                       
ARC2    archive redo                       
ARC3    archive redo                       
TT03    async ORL multi                    
TT05    controlfile update                 
rmi     True Cache data request receive    
TT04    True Cache data block send         
TT06    True Cache data block send         
rmi     True Cache control                 

15 rows selected. 

SQL> select * from v$true_cache;

    MY_DG_ID    REMOTE_DG_ID    DEST_ID TRUE_CACHE_NAME    PRIMARY_NAME        STATUS     REMOTE_VERSION       CON_ID 
____________ _______________ __________ __________________ ___________________ __________ _________________ _________ 
   864152228      4076091599          2 db23ai01           db23ai01_tkb_kix    HEALTHY    23.0.0.0.0                0 

SQL> 



[oracle@db23ai02 ~]$ ps -ef | grep smon
oracle   70813     1  0 15:51 ?        00:00:00 ora_smon_db23ai01true
oracle   75215 61501  0 15:57 pts/0    00:00:00 grep --color=auto smon
[oracle@db23ai02 ~]$ echo $ORACLE_SID
cdb02
[oracle@db23ai02 ~]$ export ORACLE_SID=db23ai01true
[oracle@db23ai02 ~]$ sql / as sysdba


SQLcl: Release 24.1 Production on Tue Jun 25 15:58:03 2024

Copyright (c) 1982, 2024, Oracle.  All rights reserved.

Connected to:
Oracle Database 23ai EE High Perf Release 23.0.0.0.0 - Production
Version 23.4.0.24.05

SQL> select name,role from v$dataguard_process;

NAME    ROLE                             
_______ ________________________________ 
LGWR    log writer                       
TMON    redo transport monitor           
TT00    gap manager                      
TT01    redo transport timer             
ARC0    archive local                    
ARC1    archive redo                     
ARC2    archive redo                     
ARC3    archive redo                     
MRP0    managed recovery PSBY BG         
rfs     RFS ping                         
rfs     RFS async                        
PR00    recovery logmerger               
PR01    recovery applier                 
PR02    recovery applier                 
PR03    recovery applier                 
PR04    recovery applier                 
PR05    recovery applier                 
PR06    recovery applier                 
PR07    recovery applier                 
PR08    recovery applier                 
TT02    True Cache data request send     
rmi     True Cache data block receive    
rmi     True Cache data block receive    

23 rows selected. 

SQL> select * from v$true_cache;

     MY_DG_ID    REMOTE_DG_ID    DEST_ID TRUE_CACHE_NAME    PRIMARY_NAME        STATUS     REMOTE_VERSION       CON_ID 
_____________ _______________ __________ __________________ ___________________ __________ _________________ _________ 
   4076091599       864152228          0 db23ai01           db23ai01_tkb_kix    HEALTHY    23.0.0.0.0                0 

SQL> 



5. Setup True Cache Service for specific Primary database service

Configure the remote listener.
Note: Check to see if Valid Node Checking for Registration (VNCR) is configured for the listener. If so, add True Cache to the REGISTRATION_INVITED_NODES_LISTENER parameter in the listener.ora file of the remote listener.

If the primary database service doesn't exist, create the service on primary database either using srvctl (for RAC databases) or DBMS_SERVICE.CREATE_SERVICE() procedure. Then run the following command to setup True Cache service.
Run following command as oracle user.
$ORACLE_HOME/bin/dbca -configureDatabase -configureTrueCacheInstanceService -sourceDB <dbuniqename or SID> -trueCacheConnectString  <True Cache EZ connect string> -trueCacheServiceName <True Cache service name> -serviceName <Existing service name> -silent -pdbName <pdb name of the service>
Example:

$ORACLE_HOME/bin/dbca -configureDatabase -configureTrueCacheInstanceService -sourceDB DBD -trueCacheConnectString  av14090426.rusn.releasevcn.oraclevcn.com:1521/tcdb2.rusn.releasevcn.oraclevcn.com -trueCacheServiceName PDBSALESOLD_TC -serviceName PDBSALESOLD -silent -pdbName PDBP1



https://fatdba.com/2022/02/07/part-4-how-to-generate-an-awr-report-for-a-data-guard-physical-standby-database/

select username,common,account_status from dba_users where username ='SYS$UMF';
alter system set "_umf_remote_enabled"=TRUE scope=BOTH;

SQL> alter user sys$umf identified by WElcome#1234_ account unlock;

User SYS$UMF altered.

SQL> 

CREATE DATABASE LINK "PRIMARY_TO_STANDBY_DBLINK" CONNECT TO "SYS$UMF" IDENTIFIED BY VALUES 'sysumf' USING 'DB23AI01_PRI';

CREATE DATABASE LINK "STANDBY_TO_PRIMARY_DBLINK" CONNECT TO "SYS$UMF" IDENTIFIED BY VALUES "sysumf" USING 'DB23AI01_TC';


https://docs.oracle.com/en/database/oracle/oracle-database/23/odbtc/oracle-true-cache-users-guide.pdf

alter session set container = CDB$ROOT;
BEGIN
 dbms_workload_repository.enable_snapshot_service(
 dbid => NULL,
 snap_type => 'WORKLOAD',
 snap_action => 'CREATE');
END;
/


[oracle@db23ai02 ~]$ echo $ORACLE_SID
db23ai01true
[oracle@db23ai02 ~]$ sql / as sysdba


SQLcl: Release 24.1 Production on Tue Jun 25 16:57:30 2024

Copyright (c) 1982, 2024, Oracle.  All rights reserved.

Connected to:
Oracle Database 23ai EE High Perf Release 23.0.0.0.0 - Production
Version 23.4.0.24.05

SQL> alter session set container = CDB$ROOT;

Session altered.

SQL> BEGIN
  2   dbms_workload_repository.enable_snapshot_service(
  3   dbid => NULL,
  4   snap_type => 'WORKLOAD',
  5   snap_action => 'CREATE');
  6  END;
  7* /

PL/SQL procedure successfully completed.

SQL> BEGIN
  2   dbms_workload_repository.enable_snapshot_service(
  3   dbid => NULL,
  4   snap_type => 'WORKLOAD',
  5   snap_action => 'CREATE');
  6  END;
  7* /

PL/SQL procedure successfully completed.

SQL> 
SQL> @?/rdbms/admin/awrrpti.sql


Specify the Report Type
~~~~~~~~~~~~~~~~~~~~~~~
AWR reports can be generated in the following formats.  Please enter the
name of the format at the prompt. Default value is 'html'.

   'html'          HTML format (default)
   'text'          Text format
   'active-html'   Includes Performance Hub active report
  

Enter value for report_type: html



Type Specified: html

Error starting at line : 58 File @ /u01/app/oracle/product/23.0.0/dbhome_1/rdbms/admin/awrinput.sql
In command -
repfooter off
Error report -
Unknown Command

SP2-0158: unknown SET option "1"


Instances in this Workload Repository schema
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  DB Id      Inst Num   DB Name      Instance     Host        
------------ ---------- ---------    ----------   ------      
  35828049       1      DB23AI01     db23ai01     basedb23ai  
  4076091599     1      DB23AI01     db23ai01true db23ai02    


Enter value for dbid: 4076091599
Using 4076091599 for database Id
Enter value for inst_num: 1
Using 1 for instance number


Specify the number of days of snapshots to choose from
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Entering the number of days (n) will result in the most recent
(n) days of snapshots being listed.  Pressing <return> without
specifying a number lists all completed snapshots.


Enter value for num_days: 7

Listing the last 7 days of Completed Snapshots 
Instance     DB Name      Snap Id       Snap Started    Snap Level
------------ ------------ ---------- ------------------ ----------
 
db23ai01true DB23AI01             1  25 Jun 2024 16:14     1      
                                  2  25 Jun 2024 16:14     1      
                                  3  25 Jun 2024 16:14     1      
                                  4  25 Jun 2024 16:58     1      



Specify the Begin and End Snapshot Ids
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Enter value for begin_snap: 3
Begin Snapshot Id specified: 3

Enter value for end_snap: 4
End   Snapshot Id specified: 4




AWAIT_COL    
____________ 
true         

Specify the Report Name
~~~~~~~~~~~~~~~~~~~~~~~
The default report file name is awrrpt_1_3_4.html.  To use this name,
press <return> to continue, otherwise enter an alternative.

Enter value for report_name: 

Using the report name awrrpt_1_3_4.html 





https://oracle-livelabs.github.io/database/truecache/workshops/tenancy/

Exadata/ODA 标准功能，不需要 DataGuard Option