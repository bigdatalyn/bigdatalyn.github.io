---
layout: post
title: "Oracle 23c New features - Encryption of Tablespaces in an Oracle Data Guard  Tips"
category: Oracle
tags: Oracle 23c Features Tips
---

* content
{:toc}

Oracle 23c New features - sql_transpiler Tips

![ocw-23c-announcement]({{ "/files/Oracle/23c/ocw-23c-announcement.png"}})	

About the Encryption of Tablespaces in an Oracle Data Guard Environment








### TABLESPACE_ENCRYPTION initialization parameter

Note the following about using the TABLESPACE_ENCRYPTION parameter:

- Redo decryption takes place at the redo transport level.
- The Advanced Security Option (ASO) is no longer required to configure tablespace encryption. However, Oracle still recommends the ASO as a best practice for security reasons. TABLESPACE_ENCRYPTION enables you to decide if you want to encrypt a new tablespace or not.
- If the ENCRYPT_NEW_TABLESPACES setting that you choose conflicts with the TABLESPACE_ENCRYPTION setting, then TABLESPACE_ENCRYPTION takes precedence.
    Note:Starting in Oracle Database 23c, the ENCRYPT_NEW_TABLESPACES initialization parameter is deprecated.
    Oracle recommends that you use the initialization parameter TABLESPACE_ENCRYPTION, which is new for Oracle Database 23c.
- You must set TABLESPACE_ENCRYPTION in the CDB root, not in any PDBs.
- The default TABLESPACE_ENCRYPTION setting for OCI databases is AUTO_ENABLE. The setting is mandatory, and any changes to it are ignored.
- The default TABLESPACE_ENCRYPTION setting for on-premises databases is MANUAL_ENABLE.

In an Oracle Data Guard environment that uses on-premises databases and Oracle Base Database Service or Oracle Exadata Cloud (ExaCS), you can configure tablespace encryption in either of the following scenarios:

- Encrypt the tablespace in the Cloud standby database but not in the on-premises primary database
- Encrypt the tablespace in the Cloud primary database but not in the on-premises standby database

```
SYS@cdb1> show parameter tablespace

NAME				     TYPE	 VALUE
------------------------------------ ----------- ------------------------------
encrypt_new_tablespaces 	     string	 CLOUD_ONLY
tablespace_encryption		     string	 MANUAL_ENABLE
tablespace_encryption_default_algori string	 AES256
thm
undo_tablespace 		     string	 UNDOTBS1
SYS@cdb1> 
```

tablespace_encryption
```
AUTO_ENABLE encrypts all new tablespaces if the database is licensed for Oracle Advanced Security. This is the default setting for Cloud databases.
DECRYPT_ONLY prevents new tablespaces from being encrypted. Use this setting if you do not want any encrypted tablespaces in your on-premises database. This setting is designed for sites that do not have the Advanced Security Option.
MANUAL_ENABLE enables you to selectively encrypt tablespaces if the database is licensed for Oracle Advanced Security. This is the default for both on-premises primary and standby databases and it uses the same behavior as in previous Oracle Database releases.
```

### Reference 

[11.2.3 Encryption of Tablespaces in an Oracle Data Guard Environment](https://docs-stage.oracle.com/en/database/oracle/oracle-database/23/asoag/using-transparent-data-encryption-with-other-oracle-features.html#GUID-68EE178A-6B6C-497A-B720-052FB23B5794)

Refer:

![23c-help]({{ "/files/Oracle/23c/23c-help.png"}})


Have a good work&life! 2022/12 via LinHong


