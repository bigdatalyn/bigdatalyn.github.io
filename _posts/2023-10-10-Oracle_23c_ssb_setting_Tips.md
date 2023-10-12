---
layout: post
title: "Oracle 23c SSB setting Tips"
category: Oracle
tags: Oracle Tips
---

* content
{:toc}

Oracle 23c SSB setting Tips

A small data pump export file for the SSB schema that can be used on a laptop






### SSB schema

Commands tips:
```
git clone https://github.com/AndyRivenes/SSB-Schema.git
cd SSB-Schema/
ls -ltr

for file in `ls ssbdp_??.dmp.gz`
do
 gunzip $file
done

sqlplus system/oracle@pdb

create tablespace ts_data datafile 
size 100m autoextend on next 100m maxsize 1500m;

create user ssb identified by ssb
default tablespace ts_data
quota unlimited on ts_data;

grant connect, dba to ssb;
grant alter session to ssb;
grant select any table to ssb;
grant select any dictionary to ssb;

create directory dpdir as '/acfs01/ssb/SSB-Schema';

cat impdp_ssb-parfile.txt
cp impdp_ssb-parfile.txt impdp.par
vi impdp.par
diff impdp_ssb-parfile.txt impdp.par
impdp parfile=impdp.par

sqlplus ssb/ssb@pdb
col segment_name for a20
select segment_name, segment_type, bytes/1024/1024 from user_segments;
```

Load steps:
```
[oracle@hong23c SSB-Schema]$ cp impdp_ssb-parfile.txt impdp.par
[oracle@hong23c SSB-Schema]$ vi impdp.par
[oracle@hong23c SSB-Schema]$ diff impdp_ssb-parfile.txt impdp.par
9c9
< #parallel=4
---
> parallel=4
[oracle@hong23c SSB-Schema]$ impdp parfile=impdp.par

Import: Release 23.0.0.0.0 - Production on Wed Oct 11 10:58:08 2023
Version 23.3.0.23.09

Copyright (c) 1982, 2023, Oracle and/or its affiliates.  All rights reserved.

Username: sys/oracle@pdb as sysdba

Connected to: Oracle Database 23c EE High Perf Release 23.0.0.0.0 - Production
Master table "SYS"."SSB_T1" successfully loaded/unloaded
import done in AL32UTF8 character set and AL16UTF16 NCHAR character set
export done in WE8DEC character set and AL16UTF16 NCHAR character set
Warning: possible data loss in character set conversions
Starting "SYS"."SSB_T1":  sys/********@pdb AS SYSDBA parfile=impdp.par 
Processing object type SCHEMA_EXPORT/USER
ORA-31684: Object type USER:"SSB" already exists

Processing object type SCHEMA_EXPORT/SYSTEM_GRANT
Processing object type SCHEMA_EXPORT/ROLE_GRANT
Processing object type SCHEMA_EXPORT/DEFAULT_ROLE
Processing object type SCHEMA_EXPORT/TABLESPACE_QUOTA
Processing object type SCHEMA_EXPORT/TABLE/TABLE
Processing object type SCHEMA_EXPORT/TABLE/TABLE_DATA
. . imported "SSB"."LINEORDER"                           1.107 GB 11997996 rows
. . imported "SSB"."CUSTOMER"                            6.352 MB   60000 rows
. . imported "SSB"."SUPPLIER"                            421.5 KB    4000 rows
. . imported "SSB"."DATE_DIM"                            270.7 KB    2556 rows
. . imported "SSB"."PART"                                34.35 MB  400000 rows
Processing object type SCHEMA_EXPORT/TABLE/INDEX/INDEX
Processing object type SCHEMA_EXPORT/TABLE/INDEX/STATISTICS/INDEX_STATISTICS
Processing object type SCHEMA_EXPORT/TABLE/STATISTICS/TABLE_STATISTICS
Job "SYS"."SSB_T1" completed with 1 error(s) at Wed Oct 11 10:59:26 2023 elapsed 0 00:00:55

[oracle@hong23c SSB-Schema]$ 
[oracle@hong23c SSB-Schema]$ sqlplus ssb/ssb@pdb

SQL*Plus: Release 23.0.0.0.0 - Production on Wed Oct 11 11:02:13 2023
Version 23.3.0.23.09

Copyright (c) 1982, 2023, Oracle.  All rights reserved.

Last Successful login time: Wed Oct 11 2023 11:02:01 +08:00

Connected to:
Oracle Database 23c EE High Perf Release 23.0.0.0.0 - Production
Version 23.3.0.23.09

SSB@pdb> col segment_name for a20
SSB@pdb> select segment_name, segment_type, bytes/1024/1024 from user_segments;

SEGMENT_NAME	     SEGMENT_TYPE	BYTES/1024/1024
-------------------- ------------------ ---------------
CUSTOMER	     TABLE			     64
DATE_DIM	     TABLE			     64
LINEORDER	     TABLE		       782.8125
PART		     TABLE			     64
STEP3_3 	     INDEX			    252
SUPPLIER	     TABLE			     64

6 rows selected.

SSB@pdb> exit
Disconnected from Oracle Database 23c EE High Perf Release 23.0.0.0.0 - Production
Version 23.3.0.23.09
[oracle@hong23c SSB-Schema]$ 

```
### Referece

[Oracle Setting up the Star Schema Benchmark (SSB) Tips](http://www.bigdatalyn.com/2018/09/28/Oracle_SSB_Tips/)

[Git SSB-Schema](https://github.com/AndyRivenes/SSB-Schema)

Have a good work&life! 2023/10 via LinHong


