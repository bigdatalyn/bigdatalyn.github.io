---
layout: post
title: "Oracle 19c TDE Tips"
category: Oracle
tags: Oracle 19c TDE Tips
---

* content
{:toc}

Oracle 19c TDE Tips

TDE(Transparent Data Encryption) as the name suggest transparently encrypts data at rest in Oracle Databases. It stops unauthorized attempts from the operating system to access database data stored in files, without impacting how applications access the data using SQL. So we dont have any impact to Business. If the malicious user tries to open file using a HEX editor (like UltraEdit),then only non-printable characters will be present. TDE can encrypt entire application tablespaces or specific sensitive columns.

- Oracle TDE is available by default in Oracle RDBMS Enteprise Edition (not in SE or SE2 Edition), but you have to purchase an Oracle Advanced Security license to use it.
- TDE is part of the Oracle Advanced Security, which also includes Data Redaction.







### Test Steps

``` sql
-- WALLET_ROOT is a static parameter used to specify the base location of wallet.
SYS@cdb1> show pdbs

    CON_ID CON_NAME                       OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
         2 PDB$SEED                       READ ONLY  NO
         3 PDB1                           READ WRITE NO
SYS@cdb1> show parameter wallet_

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
wallet_root                          string
SYS@cdb1> alter system set wallet_root='$ORACLE_HOME/admin/cdb1/wallet' scope=spfile;

System altered.

SYS@cdb1> shu immediate;
Database closed.
Database dismounted.
ORACLE instance shut down.
SYS@cdb1> startup
ORACLE instance started.

Total System Global Area 1577055352 bytes
Fixed Size                  9135224 bytes
Variable Size             704643072 bytes
Database Buffers          855638016 bytes
Redo Buffers                7639040 bytes
Database mounted.
Database opened.
SYS@cdb1> show parameter wallet_

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
wallet_root                          string      /u01/app/oracle/product/19.0.0
                                                 /dbhome_1/admin/cdb1/wallet
SYS@cdb1> 

-- tde_configuration is a dynamic parameter, no need to restart the database.
SYS@cdb1> show parameter tde_confi

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
tde_configuration                    string
SYS@cdb1> alter system set tde_configuration='KEYSTORE_CONFIGURATION=FILE' scope=both;

System altered.

SYS@cdb1> show parameter tde_confi

NAME                                 TYPE        VALUE
------------------------------------ ----------- ------------------------------
tde_configuration                    string      KEYSTORE_CONFIGURATION=FILE
SYS@cdb1> 


-- Create Password-Protected Keystore
SYS@cdb1> administer key management create keystore identified by oracle;

keystore altered.

SYS@cdb1> 

-- Create Auto-Login Keystore
SYS@cdb1> administer key management create auto_login keystore from keystore identified by oracle;

keystore altered.

SYS@cdb1> 

-- Check Keystore Files
[oracle@ol8-19c ~]$ ls -tlr /u01/app/oracle/product/19.0.0/dbhome_1/admin/cdb1/wallet
total 0
drwxr-x--- 2 oracle oinstall 44 Aug 18 09:46 tde
[oracle@ol8-19c ~]$ ls -tlr /u01/app/oracle/product/19.0.0/dbhome_1/admin/cdb1/wallet/tde
total 8
-rw------- 1 oracle oinstall 2555 Aug 18 09:45 ewallet.p12
-rw------- 1 oracle oinstall 2600 Aug 18 09:46 cwallet.sso
[oracle@ol8-19c ~]$ 

-- Open Keystore
-- To open password-protected keystore, we should use FORCE KEYSTORE clause, no matter which container you're in.
SYS@cdb1> administer key management set keystore open force keystore identified by oracle container=all;

keystore altered.

SYS@cdb1> 
-- there's nothing in the keystore. So next, let's set a TDE master key in the keystore.
SYS@cdb1> select con_id, wallet_type, status from v$encryption_wallet;

    CON_ID WALLET_TYPE          STATUS
---------- -------------------- ------------------------------
         1 PASSWORD             OPEN_NO_MASTER_KEY
         2 PASSWORD             OPEN_NO_MASTER_KEY
         3 PASSWORD             OPEN_NO_MASTER_KEY

SYS@cdb1> 

-- use the master key in all container and additionally backup the old keystore.
SYS@cdb1> administer key management set key force keystore identified by oracle with backup container=all;

keystore altered.

SYS@cdb1> 

-- There is backup for the old password-protected keystore.--> ewallet_2021081801495192.p12
[oracle@ol8-19c ~]$ ls -tlr /u01/app/oracle/product/19.0.0/dbhome_1/admin/cdb1/wallet/tde
total 20
-rw------- 1 oracle oinstall 2555 Aug 18 09:49 ewallet_2021081801495192.p12
-rw------- 1 oracle oinstall 5467 Aug 18 09:49 ewallet.p12
-rw------- 1 oracle oinstall 5512 Aug 18 09:49 cwallet.sso
[oracle@ol8-19c ~]$ 


SYS@cdb1> select con_id, wallet_type, status from v$encryption_wallet;

    CON_ID WALLET_TYPE          STATUS
---------- -------------------- ------------------------------
         1 PASSWORD             OPEN
         2 PASSWORD             OPEN
         3 PASSWORD             OPEN

SYS@cdb1> 

-- To start using the auto-login keystore, we should close the password-protected keystore.

SYS@cdb1> select con_id, wallet_type, status from v$encryption_wallet;

    CON_ID WALLET_TYPE          STATUS
---------- -------------------- ------------------------------
         1 PASSWORD             OPEN
         2 PASSWORD             OPEN
         3 PASSWORD             OPEN

SYS@cdb1> administer key management set keystore close identified by oracle container=all;

keystore altered.

SYS@cdb1> select con_id, wallet_type, status from v$encryption_wallet;

    CON_ID WALLET_TYPE          STATUS
---------- -------------------- ------------------------------
         1 AUTOLOGIN            OPEN
         2 AUTOLOGIN            OPEN
         3 AUTOLOGIN            OPEN

SYS@cdb1> 

SYS@cdb1>  SELECT * FROM v$encryption_wallet;

WRL_TYPE WRL_PARAMETER                                                  STATUS WALLET_TYPE          WALLET_OR KEYSTORE FULLY_BAC  CON_ID
-------- -------------------------------------------------------------- ------ -------------------- --------- -------- --------- -------
FILE     /u01/app/oracle/product/19.0.0/dbhome_1/admin/cdb1/wallet/tde/ OPEN   AUTOLOGIN            SINGLE    NONE     NO              1
FILE                                                                    OPEN   AUTOLOGIN            SINGLE    UNITED   NO              2
FILE                                                                    OPEN   AUTOLOGIN            SINGLE    UNITED   NO              3

SYS@cdb1>

-- if RAC, need create wallet/tde folder and copy cwallet.sso/ewallet.p12 file to this folder.

-- TEST create tde tablespace

[oracle@ol8-19c ~]$ sqlplus sys/SysPassword1@pdb1 as sysdba

SQL*Plus: Release 19.0.0.0.0 - Production on Wed Aug 18 09:56:14 2021
Version 19.10.0.0.0

Copyright (c) 1982, 2020, Oracle.  All rights reserved.


Connected to:
Oracle Database 19c Enterprise Edition Release 19.0.0.0.0 - Production
Version 19.10.0.0.0

SYS@pdb1> show pdbs

    CON_ID CON_NAME                       OPEN MODE  RESTRICTED
---------- ------------------------------ ---------- ----------
         3 PDB1                           READ WRITE NO
SYS@pdb1> select name from v$datafile;

NAME
--------------------------------------------------------------------------------
/u02/oradata/CDB1/pdb1/system01.dbf
/u02/oradata/CDB1/pdb1/sysaux01.dbf
/u02/oradata/CDB1/pdb1/undotbs01.dbf
/u02/oradata/CDB1/pdb1/users01.dbf
/u02/oradata/CDB1/pdb1/sample01.dbf
/u02/oradata/CDB1/pdb1/test01.dbf

6 rows selected.

SYS@pdb1> create tablespace no_encry_tbs datafile '/u02/oradata/CDB1/pdb1/no_encry_tbs01.dbf' size 10m autoextend on;

Tablespace created.

SYS@pdb1> 

SYS@pdb1> create tablespace encry_tbs datafile '/u02/oradata/CDB1/pdb1/encry_tbs01.dbf' size 10m autoextend on encryption encrypt;

Tablespace created.

SYS@pdb1> select name from v$datafile;

NAME
--------------------------------------------------------------------------------
/u02/oradata/CDB1/pdb1/system01.dbf
/u02/oradata/CDB1/pdb1/sysaux01.dbf
/u02/oradata/CDB1/pdb1/undotbs01.dbf
/u02/oradata/CDB1/pdb1/users01.dbf
/u02/oradata/CDB1/pdb1/sample01.dbf
/u02/oradata/CDB1/pdb1/test01.dbf
/u02/oradata/CDB1/pdb1/no_encry_tbs01.dbf
/u02/oradata/CDB1/pdb1/encry_tbs01.dbf

8 rows selected.

SYS@pdb1> 

SYS@cdb1> select TABLESPACE_NAME, ENCRYPTED from dba_tablespaces;

TABLESPACE_NAME                ENC
------------------------------ ---
SYSTEM                         NO
SYSAUX                         NO
UNDOTBS1                       NO
TEMP                           NO
USERS                          NO
SAMPLE                         NO
TEST                           NO
NO_ENCRY_TBS                   NO
ENCRY_TBS                      YES

9 rows selected.

SYS@cdb1> 

```

### Ref

[Configuring Transparent Data Encryption (TDE) with Oracle 12c](http://glennpaulley.ca/database/2015/07/configuring-transparent-data-encryption-tde-with-oracle-12c/)

Have a good work&life! 2021/08 via LinHong
