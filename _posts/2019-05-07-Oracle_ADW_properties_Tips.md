---
layout: post
title: "Oracle ADW database_properties Tips"
category: Oracle
tags: Oracle ADW Tips
---

* content
{:toc}

Oracle ADW database_properties Tips

Oracle ADW 数据库属性 Tips










### ADW database_properties

Oracle 19c 的output


	SYS> col PROPERTY_NAME for a40
	SYS> col DESCRIPTION for a100
	SYS> select PROPERTY_NAME,DESCRIPTION from database_properties order by 1;

	PROPERTY_NAME				 DESCRIPTION
	---------------------------------------- ----------------------------------------------------------------------------------------------------
	DBTIMEZONE				 DB time zone
	DEFAULT_EDITION 			 Name of the database default edition
	DEFAULT_PERMANENT_TABLESPACE		 Name of default permanent tablespace
	DEFAULT_TBS_TYPE			 Default tablespace type
	DEFAULT_TEMP_TABLESPACE 		 Name of default temporary tablespace
	DICT.BASE				 dictionary base tables version #
	DICTIONARY_ENDIAN_TYPE			 Endian type of the data dictionary
	DST_PRIMARY_TT_VERSION			 Version of primary timezone data file
	DST_SECONDARY_TT_VERSION		 Version of secondary timezone data file
	DST_UPGRADE_STATE			 State of Day Light Saving Time Upgrade
	EXPORT_VIEWS_VERSION			 Export views revision #
	Flashback Timestamp TimeZone		 Flashback timestamp created in GMT
	GLOBAL_DB_NAME				 Global database name
	MAX_PDB_SNAPSHOTS			 maximum number of snapshots for a given PDB
	MAX_STRING_SIZE 			 MAX_STRING_SIZE parameter used for dictionary metadata
	NLS_CALENDAR				 Calendar system
	NLS_CHARACTERSET			 Character set
	NLS_COMP				 NLS comparison
	NLS_CURRENCY				 Local currency
	NLS_DATE_FORMAT 			 Date format
	NLS_DATE_LANGUAGE			 Date language
	NLS_DUAL_CURRENCY			 Dual currency symbol
	NLS_ISO_CURRENCY			 ISO currency
	NLS_LANGUAGE				 Language
	NLS_LENGTH_SEMANTICS			 NLS length semantics
	NLS_NCHAR_CHARACTERSET			 NCHAR Character set
	NLS_NCHAR_CONV_EXCP			 NLS conversion exception
	NLS_NUMERIC_CHARACTERS			 Numeric characters
	NLS_RDBMS_VERSION			 RDBMS version for NLS parameters
	NLS_SORT				 Linguistic definition
	NLS_TERRITORY				 Territory
	NLS_TIMESTAMP_FORMAT			 Time stamp format
	NLS_TIMESTAMP_TZ_FORMAT 		 Timestamp with timezone format
	NLS_TIME_FORMAT 			 Time format
	NLS_TIME_TZ_FORMAT			 Time with timezone format
	NO_USERID_VERIFIER_SALT 		 Per database random key for computing faux salt
	TDE_MASTER_KEY_ID
	WORKLOAD_CAPTURE_MODE			 CAPTURE implies workload capture is in progress
	WORKLOAD_REPLAY_MODE			 PREPARE implies external replay clients can connect; REPLAY implies workload replay is in progress

	39 rows selected.

	SYS> 

ADW 18c 的 output

	ADMIN@adwdemo01_high> col PROPERTY_NAME for a40
	ADMIN@adwdemo01_high> col DESCRIPTION for a100
	ADMIN@adwdemo01_high> select PROPERTY_NAME,DESCRIPTION from database_properties order by 1;
	AUTOMATIC_TABLESPACE_CALLOUT             PL/SQL function for automatic tablespace assignment during DDLs
	DBTIMEZONE                               DB time zone
	DEFAULT_EDITION                          Name of the database default edition
	DEFAULT_PERMANENT_TABLESPACE             Name of default permanent tablespace
	DEFAULT_TBS_TYPE                         Default tablespace type
	DEFAULT_TEMP_TABLESPACE                  Name of default temporary tablespace
	DICT.BASE                                dictionary base tables version #
	DICTIONARY_ENDIAN_TYPE                   Endian type of the data dictionary
	DST_PRIMARY_TT_VERSION                   Version of primary timezone data file
	DST_SECONDARY_TT_VERSION                 Version of secondary timezone data file
	DST_UPGRADE_STATE                        State of Day Light Saving Time Upgrade
	EXPORT_VIEWS_VERSION                     Export views revision #
	Flashback Timestamp TimeZone             Flashback timestamp created in GMT
	GLOBAL_DB_NAME                           Global database name
	LOCAL_UNDO_ENABLED                       true if local undo is enabled
	MAX_PDB_SNAPSHOTS                        maximum number of snapshots for a given PDB
	MAX_PDB_STORAGE                          Maximum Space Usage of Datafiles and Local Tempfiles in Container
	MAX_STRING_SIZE                          MAX_STRING_SIZE parameter used for dictionary metadata
	NLS_CALENDAR                             Calendar system
	NLS_CHARACTERSET                         Character set
	NLS_COMP                                 NLS comparison
	NLS_CURRENCY                             Local currency
	NLS_DATE_FORMAT                          Date format
	NLS_DATE_LANGUAGE                        Date language
	NLS_DUAL_CURRENCY                        Dual currency symbol
	NLS_ISO_CURRENCY                         ISO currency
	NLS_LANGUAGE                             Language
	NLS_LENGTH_SEMANTICS                     NLS length semantics
	NLS_NCHAR_CHARACTERSET                   NCHAR Character set
	NLS_NCHAR_CONV_EXCP                      NLS conversion exception
	NLS_NUMERIC_CHARACTERS                   Numeric characters
	NLS_RDBMS_VERSION                        RDBMS version for NLS parameters
	NLS_SORT                                 Linguistic definition
	NLS_TERRITORY                            Territory
	NLS_TIMESTAMP_FORMAT                     Time stamp format
	NLS_TIMESTAMP_TZ_FORMAT                  Timestamp with timezone format
	NLS_TIME_FORMAT                          Time format
	NLS_TIME_TZ_FORMAT                       Time with timezone format
	NO_USERID_VERIFIER_SALT
	NO_USERID_VERIFIER_SALT_COPY
	OLS_OID_STATUS                           OLS OID Status used for Label Security
	PATH_PREFIX                              All paths for objects such as directories are relative to this
	PDB_AUTO_UPGRADE                         upgrade a PDB on PDB open
	PDB_UPGRADE_SYNC                         upgrade a PDB using sync
	SSL_WALLET                               Location of SSL Wallet
	SYNC_ERROR_HANDLER                       schema.package.function of handler called by Application Sync
	TDE_MASTER_KEY_ID
	WORKLOAD_CAPTURE_MODE                    CAPTURE implies workload capture is in progress
	WORKLOAD_REPLAY_MODE                     PREPARE implies external replay clients can connect; REPLAY implies workload replay is in progress

	49 rows selected.

	ADMIN@adwdemo01_high>

区别：相差10个参数

	[oracle@inst01 ~]$ diff oracle_adw18c_db_properties.txt oracle_19c_db_properties.txt
	< AUTOMATIC_TABLESPACE_CALLOUT             PL/SQL function for automatic tablespace assignment during DDLs
	< LOCAL_UNDO_ENABLED                       true if local undo is enabled
	< MAX_PDB_STORAGE                          Maximum Space Usage of Datafiles and Local Tempfiles in Container
	< NO_USERID_VERIFIER_SALT_COPY
	< OLS_OID_STATUS                           OLS OID Status used for Label Security
	< PATH_PREFIX                              All paths for objects such as directories are relative to this
	< PDB_AUTO_UPGRADE                         upgrade a PDB on PDB open
	< PDB_UPGRADE_SYNC                         upgrade a PDB using sync
	< SSL_WALLET                               Location of SSL Wallet
	< SYNC_ERROR_HANDLER                       schema.package.function of handler called by Application Sync
	[oracle@inst01 ~]$


	
Have a good work&life! 2019/05 via LinHong



