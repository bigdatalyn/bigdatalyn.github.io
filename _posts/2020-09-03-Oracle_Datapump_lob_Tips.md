---
layout: post
title: "Oracle Datapump lob table Tips"
category: Oracle
tags: Oracle Datapump Tips 
---

* content
{:toc}

Oracle Datapump lob table Tips










### Datapump export the lob table.

expdp TB lob table will met ORA-01555 problem.

Common solution is the following.

```sql
alter system set undo_retention=10800 scope=both;
alter table lob_table_name MODIFY LOB(col_name)(retention);
```

Another method is using datapump to export/import lob table individually.


#### The lob table is partition table.

Use table partition.

Sample part_export.par
```
userid=' / as sysdba'
directory=DMP
dumpfile=export01.dmp
logfile=export01.log
CONTENT=DATA_ONLY
COMPRESSION=DATA_ONLY
tables=(
owner.table_name:part_name
)
```

#### The table column is evenly distributed.

Use query where

Sample part_export.par
```
userid=' / as sysdba'
directory=DMP
dumpfile=export01.dmp
logfile=export01.log
CONTENT=DATA_ONLY
COMPRESSION=DATA_ONLY
QUERY="WHERE column_name > 5000000
```

#### Other.

Use rowid

ROWID_BLOCK_NUMBER Function

	This function returns the database block number for the input ROWID.

Sample part_export.par
```
userid=' / as sysdba'
directory=DMP
dumpfile=export01.dmp
logfile=export01.log
CONTENT=DATA_ONLY
COMPRESSION=DATA_ONLY
tables=owner.table_name
QUERY="wheremod(dbms_rowid.rowid_block_number(rowid),10)=1"
```

#### parameter tips

```
Content=DATA_ONLY：   only export the data to speed up. later fix the index if there are indexes.
COMPRESSION=DATA_ONLY：   data size is too big and the transaction in network will wasted time.
Query="……"：   filter the data if data size is too big.
```


### Reference


[143 DBMS_ROWID/143.4 DBMS_ROWID Operational Notes](https://docs.oracle.com/en/database/oracle/oracle-database/19/arpls/DBMS_ROWID.html#GUID-BEBBE522-9559-4433-9278-9F37C4917E02)





Have a good work&life! 2020/09 via LinHong


