[oracle@ol8-19c ~]$ dbca -silent -deleteDatabase -sourceDB cdb1
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
Look at the log file "/u01/app/oracle/cfgtoollogs/dbca/cdb1/cdb12.log" for further details.
[oracle@ol8-19c ~]$




dbca -silent -createDatabase                                                   \
     -templateName General_Purpose.dbc                                         \
     -gdbname cdb1 -sid cdb1 -responseFile NO_VALUE         \
     -characterSet AL32UTF8                                                    \
     -sysPassword Oracle123                                                 \
     -systemPassword Oracle123                                              \
     -createAsContainerDatabase true                                           \
     -numberOfPDBs 1                                                           \
     -pdbName PDB1                                                      \
     -pdbAdminPassword PdbPassword1                                            \
     -databaseType MULTIPURPOSE                                                \
     -memoryMgmtType auto_sga                                                  \
     -totalMemory 2000                                                         \
     -storageType FS                                                           \
     -datafileDestination "/u02/oradata"                                        \
     -redoLogFileSize 50                                                       \
     -emConfiguration NONE                                                     \
     -ignorePreReqs




dbca -silent -createDatabase                                                   \
     -templateName General_Purpose.dbc                                         \
     -gdbname cdb1 -sid  cdb1 -responseFile NO_VALUE         \
     -characterSet AL32UTF8                                                    \
     -sysPassword welcome1                                                 \
     -systemPassword welcome1                                              \
     -createAsContainerDatabase true                                           \
     -numberOfPDBs 1                                                           \
     -pdbName pdb01                                                      \
     -pdbAdminPassword PdbPassword1                                            \
     -databaseType MULTIPURPOSE                                                \
     -memoryMgmtType auto_sga                                                  \
     -totalMemory 2000                                                         \
     -storageType FS                                                           \
     -datafileDestination "/u02/oradata"                                        \
     -redoLogFileSize 50                                                       \
     -emConfiguration NONE                                                     \
     -ignorePreReqs

dbca -silent -createDatabase -responseFile $script_dir/dbca.rsp



dbca -silent -deleteDatabase -sourceDB cdb2 -sysDBAUserName SysPassword1 -sysDBAPassword SysPassword1

dbca -silent -deleteDatabase -sourceDB cdb1 -sysDBAUserName SysPassword1 -sysDBAPassword SysPassword1

dbca -silent -createDatabase \
 -templateName General_Purpose.dbc \
 -gdbname cdb2 -sid cdb2 -responseFile NO_VALUE \
 -characterSet AL32UTF8 \
 -sysPassword oracle \
 -systemPassword oracle \
 -createAsContainerDatabase true \
 -numberOfPDBs 1 \
 -pdbName pdb1 \
 -pdbAdminPassword oracle \
 -databaseType MULTIPURPOSE \
 -memoryMgmtType auto_sga \
 -totalMemory 2000 \
 -storageType FS \
 -datafileDestination "/u02/oradata/" \
 -redoLogFileSize 50 \
 -emConfiguration NONE \
 -ignorePreReqs

dbca -silent -deleteDatabase -sourceDB cdb2 -sysDBAUserName oracle -sysDBAPassword oracle

[oracle@ol8-19c dbhome_1]$ cat /u01/app/oracle/cfgtoollogs/dbca/cdb2/cdb21.log
[ 2022-01-21 10:00:18.615 CST ] [WARNING] [DBT-06208] The 'SYS' password entered does not conform to the Oracle recommended standards.
[ 2022-01-21 10:00:18.615 CST ] [WARNING] [DBT-06208] The 'PDBADMIN' password entered does not conform to the Oracle recommended standards.
[ 2022-01-21 10:00:20.143 CST ] Prepare for db operation
DBCA_PROGRESS : 8%
[ 2022-01-21 10:00:20.313 CST ] Copying database files
DBCA_PROGRESS : 31%
[ 2022-01-21 10:02:19.050 CST ] Creating and starting Oracle instance
DBCA_PROGRESS : 32%
DBCA_PROGRESS : 36%
DBCA_PROGRESS : 46%
DBCA_PROGRESS : 100%
[ 2022-01-21 10:03:07.024 CST ] [FATAL] Error while restoring PDB backup piece
DBCA_PROGRESS : 31%
DBCA_PROGRESS : 8%
DBCA_PROGRESS : 0%
[oracle@ol8-19c dbhome_1]$


dbca -silent -createDatabase \
 -templateName General_Purpose.dbc \
 -gdbname cdb3 -sid cdb3 -responseFile NO_VALUE \
 -characterSet AL32UTF8 \
 -sysPassword Oracle123 \
 -systemPassword Oracle123 \
 -createAsContainerDatabase true \
 -numberOfPDBs 1 \
 -pdbName pdb1 \
 -pdbAdminPassword Oracle123 \
 -databaseType MULTIPURPOSE \
 -memoryMgmtType auto_sga \
 -totalMemory 2000 \
 -storageType FS \
 -datafileDestination "/u02/oradata/" \
 -redoLogFileSize 50 \
 -emConfiguration NONE \
 -ignorePreReqs



Error in DBCA (create a CDB) - "Error while restoring PDB backup piece" is met during the "Creating and starting Oracle Instance" step (Doc ID 2831203.1)	

CAUSE
Upon running "opatch lsinventory -detail", it was found that opatch lsinventory is not running. When checking the physical path of file, the inventory file was not present.
 
SOLUTION
Recreate the central inventory and registered the Oracle database home. Then run DBCA once again.
This should resolve this issue.


Steps To Recreate Central Inventory(oraInventory) In RDBMS Homes (Doc ID 556834.1)	


Recreate the central inventory


[oracle@ol8-19c bin]$ cat /etc/oraInst.loc
inventory_loc=/u01/app/oraInventory
inst_group=oinstall
[oracle@ol8-19c bin]$ ls -tlr /u01/app/oraInventory
total 8
-rwxrwx--- 1 oracle oinstall 1617 Jul  8  2021 orainstRoot.sh
-rw-rw---- 1 oracle oinstall   56 Jul  8  2021 oraInst.loc
drwxrwx--- 3 oracle oinstall  205 Jul 19  2021 logs
drwxrwx--- 2 oracle oinstall   81 Jul 19  2021 ContentsXML
[oracle@ol8-19c bin]$ cd /u01/app/
[oracle@ol8-19c app]$ ls -tlr
total 0
drwxrwxr-x. 9 oracle oinstall 112 Jan 21 09:48 oracle
drwxrwx---  4 oracle oinstall  78 Jan 21 10:15 oraInventory
[oracle@ol8-19c app]$ mv oraInventory oraInventory_orig
[oracle@ol8-19c app]$ ls -tlr
total 0
drwxrwxr-x. 9 oracle oinstall 112 Jan 21 09:48 oracle
drwxrwx---  4 oracle oinstall  78 Jan 21 10:15 oraInventory_orig
[oracle@ol8-19c app]$ pwd
/u01/app
[oracle@ol8-19c app]$ cd $ORACLE_HOME/oui/bin
[oracle@ol8-19c bin]$ echo $ORACLE_HOME
/u01/app/oracle/product/19.0.0/dbhome_1
[oracle@ol8-19c bin]$ ./runInstaller -silent -ignoreSysPrereqs -attachHome ORACLE_HOME="/u01/app/oracle/product/19.0.0/dbhome_1" ORACLE_HOME_NAME="OraDb19c_home1"
Starting Oracle Universal Installer...

Checking swap space: must be greater than 500 MB.   Actual 4053 MB    Passed
The inventory pointer is located at /etc/oraInst.loc
You can find the log of this install session at:
 /u01/app/oraInventory/logs/AttachHome2022-01-21_10-21-14AM.log
'AttachHome' was successful.
[oracle@ol8-19c bin]$
[oracle@ol8-19c bin]$ ls -tlr /u01/app/oraInventory
total 0
drwxrwx--- 2 oracle oinstall 135 Jan 21 10:21 logs
drwxrwx--- 2 oracle oinstall  60 Jan 21 10:21 ContentsXML
[oracle@ol8-19c bin]$




DBCA fails with Error: ORA-04062: signature of package "SYS.DBMS_BACKUP_RESTORE" has been changed

[Thread-68] [ 2022-01-21 10:43:50.874 CST ] [RMANUtil$RMANUtilErrorListener.handleError:1386]  ERROR=channel ORA_DISK_1: SID=29 device type=DISK
[Thread-68] [ 2022-01-21 10:43:50.874 CST ] [RMANUtil$RMANUtilErrorListener.handleError:1386]  ERROR=RMAN-00571: ===================================================
========
[Thread-68] [ 2022-01-21 10:43:50.874 CST ] [RMANUtil$RMANUtilErrorListener.handleError:1386]  ERROR=RMAN-00569: =============== ERROR MESSAGE STACK FOLLOWS =======
========
[Thread-68] [ 2022-01-21 10:43:50.874 CST ] [RMANUtil$RMANUtilErrorListener.handleError:1386]  ERROR=RMAN-00571: ===================================================
========
[Thread-68] [ 2022-01-21 10:43:50.874 CST ] [RMANUtil$RMANUtilErrorListener.handleError:1386]  ERROR=RMAN-03002: failure of restore command at 01/21/2022 10:43:50
[Thread-68] [ 2022-01-21 10:43:50.874 CST ] [RMANUtil$RMANUtilErrorListener.handleError:1386]  ERROR=ORA-04062: signature of package "SYS.DBMS_BACKUP_RESTORE" has b
een changed
[Thread-68] [ 2022-01-21 10:43:50.874 CST ] [RMANUtil$RMANUtilErrorListener.handleError:1386]  ERROR=RMAN>



dbca -silent -createDatabase -templateName General_Purpose.dbc -createAsContainerDatabase true -numberOfPDBs 1 -pdbName orclpdb -gdbname oradb.example.com -sid oradb -sysPassword oracle -systemPassword oracle -pdbAdminPassword oracle -characterSet AL32UTF8 -memoryPercentage 50 -responseFile NO_VALUE -emConfiguration LOCAL